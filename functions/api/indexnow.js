// Cloudflare Pages Function: POST /api/indexnow {sifre}
// Sitemap'teki tüm sayfaları IndexNow ile Bing/Yandex'e bildirir (ChatGPT ve Copilot Bing verisini kullanır).
const KEY = "a8fe793a7e759e68d5c6a3998f3c7a02";
const HOST = "kuryetex.com.tr";
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export async function onRequestPost(ctx) {
  try { return await calis(ctx); }
  catch (e) { return json({ hata: "Sunucu hatası: " + (e && e.message || e) }, 500); }
}

async function calis({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (!env.YONETIM_SIFRE || b.sifre !== env.YONETIM_SIFRE) return json({ hata: "Şifre yanlış" }, 401);
  // Site haritasını sitenin kendi dosyalarından oku (kendi alan adına istek atmak Cloudflare'de takılabiliyor)
  const smUrl = new URL("/sitemap.xml", request.url);
  const sm = env.ASSETS ? await env.ASSETS.fetch(smUrl) : await fetch(smUrl);
  if (!sm.ok) return json({ hata: "Site haritası okunamadı" }, 502);
  const urls = [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim()).slice(0, 10000);
  if (!urls.length) return json({ hata: "Site haritasında sayfa yok" }, 502);
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: "https://" + HOST + "/" + KEY + ".txt", urlList: urls }) });
  if (r.status === 200 || r.status === 202) return json({ ok: true, adet: urls.length });
  const t = (await r.text()).slice(0, 200);
  return json({ hata: "Bing yanıtı: " + r.status + " " + t }, 502);
}
