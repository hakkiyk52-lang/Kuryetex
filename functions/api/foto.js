// Cloudflare Pages Function: /api/foto
// Panelden yüklenen teslimat görselleri (KV: AYAR). Görsel tarayıcıda küçültülüp webp olarak gelir.
// GET  /api/foto?sayfa=/besiktas-kurye/  -> [{id,sayfa,a,w,h,t}]   (o sayfanın görselleri)
// GET  /api/foto?liste=1                 -> tüm görseller (panel için)
// GET  /api/foto?id=xxx                  -> görselin kendisi (image/webp)
// POST /api/foto {sifre, islem:"ekle", sayfa, a, w, h, data(base64)} | {sifre, islem:"sil", id}
const IDX = "foto_liste";
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra } });
const temiz = (s, n) => String(s || "").replace(/[<>"]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
const yol = s => { s = "/" + String(s || "").replace(/^https?:\/\/[^/]+/, "").replace(/^\/+|\/+$/g, ""); return s === "/" ? "/" : s + "/"; };

async function liste(env) {
  try { return JSON.parse(await env.AYAR.get(IDX) || "[]"); } catch (e) { return []; }
}

export async function onRequestGet({ request, env }) {
  if (!env.AYAR) return json([]);
  const u = new URL(request.url), id = u.searchParams.get("id");
  if (id) {
    const v = await env.AYAR.get("foto:" + id.replace(/[^a-z0-9]/g, ""), "arrayBuffer");
    if (!v) return new Response("Yok", { status: 404 });
    const b0 = new Uint8Array(v.slice(0, 4)), tip = b0[0] === 0xff ? "image/jpeg" : b0[0] === 0x89 ? "image/png" : "image/webp";
    return new Response(v, { headers: { "Content-Type": tip, "Cache-Control": "public, max-age=31536000, immutable" } });
  }
  const L = await liste(env);
  if (u.searchParams.get("liste")) return json(L);
  const s = yol(u.searchParams.get("sayfa") || "/");
  return json(L.filter(x => x.sayfa === s), 200, { "Cache-Control": "public, max-age=60" });
}

export async function onRequestPost({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) { return json({ hata: "Dosya okunamadı (çok büyük olabilir)." }, 200); }
  if (!env.YONETIM_SIFRE || !env.AYAR) return json({ hata: "Kurulum eksik: AYAR (KV) ve YONETIM_SIFRE ayarlanmalı." }, 200);
  if (String(b.sifre || "") !== String(env.YONETIM_SIFRE)) {
    await new Promise(r => setTimeout(r, 800));
    return json({ hata: "Şifre yanlış." }, 401);
  }
  let L = await liste(env);
  if (b.islem === "sil") {
    const id = String(b.id || "").replace(/[^a-z0-9]/g, "");
    L = L.filter(x => x.id !== id);
    await env.AYAR.put(IDX, JSON.stringify(L));
    await env.AYAR.delete("foto:" + id);
    return json({ ok: true, liste: L });
  }
  if (b.islem !== "ekle") return json({ hata: "Bilinmeyen işlem." }, 200);
  const data = String(b.data || "").replace(/^data:image\/\w+;base64,/, "");
  if (!data) return json({ hata: "Görsel seçilmedi." }, 200);
  const bin = Uint8Array.from(atob(data), c => c.charCodeAt(0));
  if (bin.length > 1500000) return json({ hata: "Görsel çok büyük (en fazla 1,5 MB)." }, 200);
  const sayfa = yol(b.sayfa);
  const a = temiz(b.a, 160);
  if (!a) return json({ hata: "Kısa bir açıklama yazın (ör. Beşiktaş → Maslak içecek teslimi)." }, 200);
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  await env.AYAR.put("foto:" + id, bin);
  L.unshift({ id, sayfa, a, w: +b.w || 1200, h: +b.h || 900, t: Date.now() });
  L = L.slice(0, 300);
  await env.AYAR.put(IDX, JSON.stringify(L));
  return json({ ok: true, liste: L });
}
