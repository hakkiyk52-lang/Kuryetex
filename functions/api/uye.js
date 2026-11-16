// Cloudflare Pages Function: /api/uye  — Kuryetex üyelik (1. aşama: kayıt / giriş / hesabım)
// Depolama: KV "AYAR" (anahtar: "uye:<telefon>"). Gizli anahtar: UYE_GIZLI (yoksa YONETIM_SIFRE).
// POST {islem:"kayit", ad, tel, sifre, tur:"bireysel"|"isletme"|"restoran", eposta?, firma?, vkn?, vd?, adres?, ilce?, kvkk:true}
// POST {islem:"giris", tel, sifre}        -> {ok, token, uye}
// GET  /api/uye  (Authorization: Bearer <token>) -> {ok, uye}
// Not: Yeni üye "bekliyor" durumunda açılır; indirim, yönetici onayından sonra (3. aşama: panel) geçerli olur.

const TURLER = { bireysel: "Bireysel", isletme: "İşletme", restoran: "Restoran" };
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
const temiz = (s, n) => String(s || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, n);
const enc = new TextEncoder();
const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

function telNorm(t) {
  let d = String(t || "").replace(/\D/g, "");
  if (d.startsWith("0090")) d = d.slice(4);
  if (d.startsWith("90") && d.length === 12) d = d.slice(2);
  if (d.startsWith("0")) d = d.slice(1);
  return /^5\d{9}$/.test(d) ? "90" + d : "";
}
async function hashle(sifre, tuz) {
  const k = await crypto.subtle.importKey("raw", enc.encode(sifre), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: enc.encode(tuz), iterations: 100000 }, k, 256);
  return b64(bits);
}
async function imza(env, veri) {
  const gizli = env.UYE_GIZLI || ("uye|" + (env.YONETIM_SIFRE || ""));
  const k = await crypto.subtle.importKey("raw", enc.encode(gizli), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(await crypto.subtle.sign("HMAC", k, enc.encode(veri)));
}
async function tokenVer(env, tel) {
  const veri = tel + "." + (Date.now() + 90 * 864e5);
  return veri + "." + await imza(env, veri);
}
async function tokenCoz(env, tok) {
  const p = String(tok || "").split(".");
  if (p.length !== 3) return "";
  const veri = p[0] + "." + p[1];
  if (+p[1] < Date.now()) return "";
  return (await imza(env, veri)) === p[2] ? p[0] : "";
}
// Gönderi kademesi (işletme): geçen ay ile bu aydan büyük olan belirler.
function kademe(n) { return n >= 30 ? 25 : n >= 20 ? 20 : n >= 10 ? 15 : 10; }
function disaAc(u) {
  const ay = new Date().toISOString().slice(0, 7);
  const buAy = (u.ay === ay ? u.ayGonderi : 0) || 0;
  let oran = 0;
  if (u.durum === "onayli") {
    if (u.oran) oran = u.oran;                                   // yöneticinin elle verdiği oran
    else if (u.tur === "isletme") oran = kademe(Math.max(buAy, u.gecenAy || 0));
    else if (u.tur === "restoran") oran = 25;
    else if (u.tur === "bireysel") oran = (u.toplam || 0) >= 5 ? 10 : 0;
  }
  return { ad: u.ad, tel: u.tel, tur: u.tur, turAd: TURLER[u.tur], firma: u.firma || "", durum: u.durum,
    oran, buAy, gecenAy: u.gecenAy || 0, toplam: u.toplam || 0, kayit: u.kayit };
}

export async function onRequestGet({ request, env }) {
  if (!env.AYAR) return json({ ok: false, hata: "Üyelik sistemi şu an kapalı." });
  const tel = await tokenCoz(env, (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, ""));
  if (!tel) return json({ ok: false, hata: "Oturum süresi doldu, tekrar giriş yapın." }, 401);
  const u = JSON.parse(await env.AYAR.get("uye:" + tel) || "null");
  if (!u) return json({ ok: false, hata: "Üyelik bulunamadı." }, 404);
  return json({ ok: true, uye: disaAc(u) });
}

export async function onRequestPost({ request, env }) {
  if (!env.AYAR || !(env.UYE_GIZLI || env.YONETIM_SIFRE)) return json({ ok: false, hata: "Üyelik sistemi şu an kapalı." });
  let b = {};
  try { b = await request.json(); } catch (e) {}
  const tel = telNorm(b.tel);
  const sifre = String(b.sifre || "");
  if (!tel) return json({ ok: false, hata: "Geçerli bir cep telefonu yazın (05xx xxx xx xx)." });
  if (sifre.length < 6 || sifre.length > 64) return json({ ok: false, hata: "Şifre en az 6 karakter olmalı." });
  const anahtar = "uye:" + tel;

  if (b.islem === "kayit") {
    const tur = TURLER[b.tur] ? b.tur : "";
    const ad = temiz(b.ad, 60);
    if (!ad) return json({ ok: false, hata: "Ad soyad gerekli." });
    if (!tur) return json({ ok: false, hata: "Üyelik türünü seçin." });
    if (!b.kvkk) return json({ ok: false, hata: "KVKK onayı gerekli." });
    if (tur !== "bireysel" && !temiz(b.firma, 80)) return json({ ok: false, hata: "Firma / işletme adı gerekli." });
    if (await env.AYAR.get(anahtar)) return json({ ok: false, hata: "Bu numarayla zaten üyelik var. Giriş yapın." });
    const tuz = crypto.randomUUID();
    const u = {
      tel, ad, tur, durum: "bekliyor", kayit: new Date().toISOString(),
      eposta: temiz(b.eposta, 80), firma: temiz(b.firma, 80), vkn: temiz(b.vkn, 20), vd: temiz(b.vd, 50),
      adres: temiz(b.adres, 200), ilce: temiz(b.ilce, 40),
      tuz, hash: await hashle(sifre, tuz), toplam: 0, ay: "", ayGonderi: 0, gecenAy: 0, oran: 0
    };
    await env.AYAR.put(anahtar, JSON.stringify(u));
    // Yönetim paneli için üye listesi (yalnızca telefon numaraları)
    try {
      const l = JSON.parse(await env.AYAR.get("uyeler") || "[]");
      if (!l.includes(tel)) { l.unshift(tel); await env.AYAR.put("uyeler", JSON.stringify(l.slice(0, 5000))); }
    } catch (e) {}
    return json({ ok: true, token: await tokenVer(env, tel), uye: disaAc(u) });
  }

  if (b.islem === "giris") {
    const u = JSON.parse(await env.AYAR.get(anahtar) || "null");
    if (!u || (await hashle(sifre, u.tuz)) !== u.hash) {
      await new Promise(r => setTimeout(r, 700));
      return json({ ok: false, hata: "Telefon veya şifre hatalı." });
    }
    return json({ ok: true, token: await tokenVer(env, tel), uye: disaAc(u) });
  }
  return json({ ok: false, hata: "Bilinmeyen işlem." });
}
