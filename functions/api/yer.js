// Cloudflare Pages Function: GET /api/yer?q=zorlu
// Ücretsiz OpenStreetMap araması (Photon, olmazsa Nominatim). Yalnızca İstanbul ve çevresi.
// Yanıt: [{ad, alt, lat, lon}]  — 1 gün önbellekte tutulur.
const BBOX = [27.95, 40.78, 29.95, 41.6]; // minLon, minLat, maxLon, maxLat
const UA = "KuryetexSite/1.0 (kuryetex.com.tr; kuryetex@gmail.com)";
const json = (o, extra = {}) => new Response(JSON.stringify(o), {
  headers: { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*", ...extra } });
const icinde = (lat, lon) => lon >= BBOX[0] && lon <= BBOX[2] && lat >= BBOX[1] && lat <= BBOX[3];
const uniq = a => { const s = new Set(); return a.filter(x => { const k = x.ad + "|" + x.alt; if (s.has(k)) return false; s.add(k); return true; }); };

async function photon(q) {
  const u = "https://photon.komoot.io/api/?limit=10&lat=41.03&lon=28.98&bbox=" + BBOX.join(",") + "&q=" + encodeURIComponent(q);
  const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) throw new Error("photon " + r.status);
  const j = await r.json();
  return (j.features || []).map(f => {
    const p = f.properties || {}, c = (f.geometry || {}).coordinates || [];
    const alt = [p.street, p.district || p.locality, p.county || p.city].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(", ");
    return { ad: p.name || p.street || "", alt, lat: +c[1], lon: +c[0] };
  }).filter(x => x.ad && icinde(x.lat, x.lon));
}

async function nominatim(q) {
  const u = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=10&countrycodes=tr&bounded=1&accept-language=tr&viewbox=" +
    [BBOX[0], BBOX[3], BBOX[2], BBOX[1]].join(",") + "&q=" + encodeURIComponent(q);
  const r = await fetch(u, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) throw new Error("nominatim " + r.status);
  const j = await r.json();
  return (j || []).map(x => {
    const parts = String(x.display_name || "").split(",").map(s => s.trim());
    return { ad: x.name || parts[0] || "", alt: parts.slice(1, 4).join(", "), lat: +x.lat, lon: +x.lon };
  }).filter(x => x.ad && icinde(x.lat, x.lon));
}

export async function onRequestGet({ request, waitUntil }) {
  const url = new URL(request.url);
  const q = String(url.searchParams.get("q") || "").trim().slice(0, 80);
  if (q.length < 3) return json([]);
  const cache = caches.default, key = new Request("https://kxyer.cache/" + encodeURIComponent(q.toLocaleLowerCase("tr")));
  const hit = await cache.match(key);
  if (hit) return hit;
  let out = [];
  try { out = await photon(q); } catch (e) {}
  if (!out.length) { try { out = await nominatim(q); } catch (e) {} }
  const res = json(uniq(out).slice(0, 8), { "Cache-Control": "public, max-age=86400" });
  if (out.length) waitUntil(cache.put(key, res.clone()));
  return res;
}
