// Cloudflare Pages Function: /api/ayar
// Yönetim panelinden değiştirilen ayarlar (KV: AYAR). Şifre: YONETIM_SIFRE
// GET  /api/ayar  -> { tatil:{on,ad,until}, duyuru:{on,metin,tur,until}, yorumlar:[{id,n,t,e,y}] }  (herkese açık)
// POST /api/ayar  {sifre, islem:"oku"|"tatil"|"duyuru"|"yorum_ekle"|"yorum_sil", ...}
const KEY = "ayar2";
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra } });
const temiz = (s, n) => String(s || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, n);

async function ham(env) {
  let s = null;
  try { s = JSON.parse(await env.AYAR.get(KEY) || "null"); } catch (e) {}
  s = s || {};
  s.tatil = s.tatil || { on: false, ad: "Resmî tatil", until: 0 };
  s.duyuru = s.duyuru || { on: false, metin: "", tur: "bilgi", until: 0 };
  s.yorumlar = s.yorumlar || [];
  return s;
}
function acik(s) {
  const now = Date.now(), o = JSON.parse(JSON.stringify(s));
  if (o.tatil.on && o.tatil.until && now > o.tatil.until) o.tatil.on = false;
  if (o.duyuru.on && o.duyuru.until && now > o.duyuru.until) o.duyuru.on = false;
  return o;
}

export async function onRequestGet({ env }) {
  if (!env.AYAR) return json({ tatil: { on: false }, duyuru: { on: false }, yorumlar: [] });
  return json(acik(await ham(env)), 200, { "Cache-Control": "public, max-age=30" });
}

export async function onRequestPost({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (!env.YONETIM_SIFRE || !env.AYAR) return json({ hata: "Kurulum eksik: AYAR (KV) ve YONETIM_SIFRE ayarlanmalı." }, 200);
  if (String(b.sifre || "") !== String(env.YONETIM_SIFRE)) {
    await new Promise(r => setTimeout(r, 800));
    return json({ hata: "Şifre yanlış." }, 401);
  }
  const s = await ham(env);
  const saatSonra = h => (h > 0 ? Date.now() + Math.min(240, h) * 3600e3 : 0);
  if (b.islem === "tatil") {
    s.tatil = { on: !!b.on, ad: temiz(b.ad, 40) || "Resmî tatil", pct: [15, 20, 25].indexOf(+b.pct) > -1 ? +b.pct : 15, until: b.on ? saatSonra(+b.saat || 0) : 0 };
  } else if (b.islem === "duyuru") {
    const metin = temiz(b.metin, 220);
    if (b.on && !metin) return json({ hata: "Duyuru metni boş olamaz." }, 200);
    s.duyuru = { on: !!b.on && !!metin, metin, tur: b.tur === "uyari" ? "uyari" : "bilgi", until: b.on ? saatSonra(+b.saat || 0) : 0 };
  } else if (b.islem === "yorum_ekle") {
    const n = temiz(b.n, 60), t = temiz(b.t, 900);
    if (!n || !t) return json({ hata: "Ad ve yorum metni gerekli." }, 200);
    s.yorumlar.unshift({ id: Date.now().toString(36), n, t, e: b.e ? 1 : 0, y: 5 });
    s.yorumlar = s.yorumlar.slice(0, 60);
  } else if (b.islem === "yorum_sil") {
    s.yorumlar = s.yorumlar.filter(x => x.id !== b.id);
  } else if (b.islem !== "oku") {
    return json({ hata: "Bilinmeyen işlem." }, 200);
  }
  if (b.islem !== "oku") await env.AYAR.put(KEY, JSON.stringify(s));
  return json(acik(s));
}
