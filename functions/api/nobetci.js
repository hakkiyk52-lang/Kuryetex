// Cloudflare Pages Function: GET /api/nobetci?ilce=Ataşehir
// Bugünün nöbetçi eczanelerini eczaneler.org API'sinden alır, sadeleştirir ve 30 dk önbellekler.
// Gerekli ortam değişkeni (Cloudflare Pages > Settings > Environment variables): ECZANE_API_KEY
const API = "https://api.eczaneler.org/api/v2";
const TR = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u", "İ": "i" };
const slug = s => s.replace(/[çğıöşüâîûİ]/g, c => TR[c] || c).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", ...extra } });
const pick = (o, ks) => { for (const k of ks) { if (o && o[k] != null && o[k] !== "") return o[k]; } return null; };

function norm(x) {
  return {
    name: pick(x, ["name", "pharmacy_name", "eczane_adi", "title"]),
    address: pick(x, ["address", "full_address", "adres", "addr"]),
    area: pick(x, ["neighborhood", "mahalle", "area", "town"]),
    district: pick(x, ["district", "district_name", "ilce"]),
    phone: pick(x, ["phone", "telefon", "phone_number", "tel"]),
    lat: pick(x, ["latitude", "lat"]),
    lon: pick(x, ["longitude", "lon", "lng"]),
    hours: pick(x, ["sentry_hours", "duty_hours", "working_hours", "hours"]) ||
      ((pick(x, ["start_time", "sentry_start", "start"]) && pick(x, ["end_time", "sentry_end", "end"])) ?
        String(pick(x, ["start_time", "sentry_start", "start"])).slice(0, 5) + " – " + String(pick(x, ["end_time", "sentry_end", "end"])).slice(0, 5) : null),
  };
}

async function call(path, key) {
  const r = await fetch(API + path, { headers: { Accept: "application/json", "X-Api-Key": key }, cf: { cacheTtl: 0 } });
  if (!r.ok) return { status: r.status, data: [] };
  const d = await r.json();
  return { status: 200, data: Array.isArray(d) ? d : (d.data || []), pagination: d.pagination };
}

function hav(a, b, c, d) {
  const r = Math.PI / 180, x = Math.sin((c - a) * r / 2), y = Math.sin((d - b) * r / 2);
  return 12742 * Math.asin(Math.sqrt(x * x + Math.cos(a * r) * Math.cos(c * r) * y * y));
}

// Konuma göre: GET /api/nobetci?lat=41.0&lon=29.0[&tum=1]  (tum=1: nöbetçi olmayanlar dahil tüm eczaneler)
async function nearby(url, env, waitUntil) {
  const lat = parseFloat(url.searchParams.get("lat")), lon = parseFloat(url.searchParams.get("lon"));
  const all = url.searchParams.get("tum") === "1";
  if (!(lat > 35 && lat < 43 && lon > 25 && lon < 45)) return json({ ok: false, error: "konum geçersiz", items: [] }, 400);
  const hour = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 13);
  const cacheKey = new Request(`${url.origin}/__near/${lat.toFixed(2)}/${lon.toFixed(2)}/${all ? 1 : 0}/${hour}`);
  const hit = await caches.default.match(cacheKey);
  if (hit) return hit;
  let items = [];
  try {
    const r = await fetch(API + "/pharmacies/pharmacies-nearby", {
      method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json", "X-Api-Key": env.ECZANE_API_KEY },
      body: JSON.stringify({ lat, lon, is_sentry: all ? 0 : 1, limit: 12 }) });
    if (r.ok) { const d = await r.json(); items = (Array.isArray(d) ? d : (d.data || [])).map(x => {
      const n = norm(x), k = pick(x, ["distance_km", "distance", "km"]);
      n.km = k != null ? parseFloat(k) : (n.lat && n.lon ? hav(lat, lon, +n.lat, +n.lon) : null);
      if (n.km != null && n.km > 200) n.km = n.km / 1000; // metre gelirse
      return n; }).filter(x => x.name).sort((a, b) => (a.km ?? 99) - (b.km ?? 99)); }
  } catch (e) { return json({ ok: false, reason: "upstream", items: [] }, 200, { "Cache-Control": "no-store" }); }
  const res = json({ ok: true, items, all, source: "eczaneler.org" }, 200, { "Cache-Control": "public, max-age=900" });
  if (items.length) waitUntil(caches.default.put(cacheKey, res.clone()));
  return res;
}

export async function onRequestGet({ request, env, waitUntil }) {
  const url = new URL(request.url);
  if (url.searchParams.has("lat")) {
    if (!env.ECZANE_API_KEY) return json({ ok: false, reason: "no_key", items: [] });
    return nearby(url, env, waitUntil);
  }
  const ilce = (url.searchParams.get("ilce") || "").trim();
  if (!ilce || ilce.length > 40) return json({ ok: false, error: "ilce gerekli", items: [] }, 400);
  if (!env.ECZANE_API_KEY) return json({ ok: false, reason: "no_key", items: [] });

  const s = slug(ilce);
  const hour = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 13); // İstanbul saatiyle saat dilimi
  const cacheKey = new Request(`${url.origin}/__nobet/${s}/${hour}`);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  let items = [];
  try {
    let r = await call(`/pharmacies/sentry-district-list/istanbul/${encodeURIComponent(s)}?limit=50`, env.ECZANE_API_KEY);
    items = r.data.map(norm);
    if (!items.length && r.status !== 401 && r.status !== 429) {
      // ilçe adı eşleşmezse il listesini çekip ilçeye göre süz
      for (let page = 1; page <= 10; page++) {
        const c = await call(`/pharmacies/sentry-city-list/istanbul?limit=50${page > 1 ? "&page=" + page : ""}`, env.ECZANE_API_KEY);
        items.push(...c.data.map(norm).filter(x => x.district && slug(String(x.district)) === s));
        if (c.data.length < 50) break;
      }
    }
  } catch (e) {
    return json({ ok: false, reason: "upstream", items: [] }, 200, { "Cache-Control": "no-store" });
  }
  items = items.filter(x => x.name);
  const res = json({ ok: true, ilce, items, updated: new Date().toISOString(), source: "eczaneler.org" }, 200,
    { "Cache-Control": "public, max-age=1800" });
  if (items.length) waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}
