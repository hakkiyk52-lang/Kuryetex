// Cloudflare Pages Function: POST /api/indexnow {sifre}
// Sitemap'teki tüm sayfaları IndexNow ile Bing/Yandex'e bildirir (ChatGPT ve Copilot Bing verisini kullanır).
const KEY = "a8fe793a7e759e68d5c6a3998f3c7a02";
const HOST = "kuryetex.com.tr";
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export async function onRequestPost({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (!env.YONETIM_SIFRE || b.sifre !== env.YONETIM_SIFRE) return json({ hata: "Şifre yanlış" }, 401);
  const sm = await fetch("https://" + HOST + "/sitemap.xml", { cf: { cacheTtl: 0 } });
  if (!sm.ok) return json({ hata: "Site haritası okunamadı" }, 502);
  const urls = [...(await sm.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim()).slice(0, 10000);
  if (!urls.length) return json({ hata: "Site haritasında sayfa yok" }, 502);
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: "https://" + HOST + "/" + KEY + ".txt", urlList: urls }) });
  if (r.status === 200 || r.status === 202) return json({ ok: true, adet: urls.length });
  return json({ hata: "Bing yanıtı: " + r.status }, 502);
}
