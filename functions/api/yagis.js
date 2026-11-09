// Cloudflare Pages Function: /api/yagis
// Elle "yağış farkı" anahtarı. Durum Cloudflare KV'de saklanır.
// Gerekli ayarlar (Cloudflare Pages > kuryetex > Settings):
//   - Bindings > KV namespace: değişken adı AYAR (Production ve Preview için)
//   - Variables and Secrets: YONETIM_SIFRE (yönetim sayfası şifresi)
// GET  /api/yagis           -> {on, pct, until}   (herkese açık, site fiyat hesabında kullanır)
// POST /api/yagis {sifre, on, pct, saat} -> durumu değiştirir (yalnızca şifreyle)
const KEY = "yagis";
const json = (o, status = 200, extra = {}) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra } });

async function oku(env) {
  if (!env.AYAR) return { on: false, pct: 13, until: 0, kurulum: false };
  let s = null;
  try { s = JSON.parse(await env.AYAR.get(KEY) || "null"); } catch (e) {}
  s = s || { on: false, pct: 13, until: 0 };
  if (s.on && s.until && Date.now() > s.until) s.on = false; // süresi dolunca kendiliğinden kapanır
  return { on: !!s.on, pct: s.pct === 15 ? 15 : 13, until: s.until || 0, kurulum: true };
}

export async function onRequestGet({ env }) {
  return json(await oku(env), 200, { "Cache-Control": "public, max-age=30" });
}

export async function onRequestPost({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (!env.YONETIM_SIFRE || !env.AYAR) return json({ hata: "Kurulum eksik: AYAR (KV) ve YONETIM_SIFRE ayarlanmalı." }, 500);
  if (String(b.sifre || "") !== String(env.YONETIM_SIFRE)) {
    await new Promise(r => setTimeout(r, 800));
    return json({ hata: "Şifre yanlış." }, 401);
  }
  if (b.sadeceOku) return json(await oku(env));
  const on = !!b.on, pct = +b.pct === 15 ? 15 : 13;
  const saat = Math.min(24, Math.max(0, +b.saat || 0));
  const s = { on, pct, until: on && saat ? Date.now() + saat * 3600e3 : 0, t: Date.now() };
  await env.AYAR.put(KEY, JSON.stringify(s));
  return json(await oku(env));
}
