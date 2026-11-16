// Cloudflare Pages Function: /api/uye  — Kuryetex üyelik (1. aşama: kayıt / giriş / hesabım)
// Depolama: KV "AYAR" (anahtar: "uye:<telefon>"). Gizli anahtar: UYE_GIZLI (yoksa KV'de kendiliğinden üretilir).
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
async function gizliAl(env) {
  if (env.UYE_GIZLI) return env.UYE_GIZLI;
  let g = await env.AYAR.get("uye_gizli");
  if (!g) { g = crypto.randomUUID() + crypto.randomUUID(); await env.AYAR.put("uye_gizli", g); }
  return g;
}
async function imza(env, veri) {
  const gizli = await gizliAl(env);
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
function ayKey(d) { return d.toISOString().slice(0, 7); }
function oncekiAy() { const d = new Date(); d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() - 1); return ayKey(d); }
// Ay değiştiyse sayaçları kaydır: geçen ayın sayısı "gecenAy"a geçer.
function ayDevir(u) {
  const ay = ayKey(new Date());
  if (u.ay !== ay) { u.gecenAy = u.ay === oncekiAy() ? (u.ayGonderi || 0) : 0; u.ay = ay; u.ayGonderi = 0; }
  return u;
}
function disaAc(u) {
  ayDevir(u);
  const buAy = u.ayGonderi || 0;
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

// ---- Yönetim paneli işlemleri (şifre: YONETIM_SIFRE) ----
async function yonetim(env, b) {
  if (!env.YONETIM_SIFRE || String(b.sifre || "") !== String(env.YONETIM_SIFRE)) {
    await new Promise(r => setTimeout(r, 800));
    return json({ ok: false, hata: "Şifre yanlış." }, 401);
  }
  const liste = JSON.parse(await env.AYAR.get("uyeler") || "[]");
  if (b.islem === "admin_liste") {
    const uyeler = [];
    for (const tel of liste.slice(0, 300)) {
      const u = JSON.parse(await env.AYAR.get("uye:" + tel) || "null");
      if (u) uyeler.push(Object.assign(disaAc(u), { eposta: u.eposta || "", ilce: u.ilce || "", vkn: u.vkn || "", vd: u.vd || "", adres: u.adres || "", hacim: u.hacim || "", odeme: u.odeme || "", elleOran: u.oran || 0 }));
    }
    return json({ ok: true, uyeler });
  }
  const tel = String(b.tel || "").replace(/\D/g, "");
  const anahtar = "uye:" + tel;
  const u = JSON.parse(await env.AYAR.get(anahtar) || "null");
  if (!u) return json({ ok: false, hata: "Üye bulunamadı." });
  ayDevir(u);
  if (b.islem === "admin_onay") u.durum = b.on === false ? "bekliyor" : "onayli";
  else if (b.islem === "admin_gonderi") {
    const n = Math.max(-5, Math.min(20, Math.round(+b.adet) || 1));
    u.ayGonderi = Math.max(0, (u.ayGonderi || 0) + n); u.toplam = Math.max(0, (u.toplam || 0) + n);
  } else if (b.islem === "admin_oran") u.oran = Math.max(0, Math.min(50, Math.round(+b.oran) || 0));
  else if (b.islem === "admin_sil") {
    await env.AYAR.delete(anahtar);
    if (u.eposta) await env.AYAR.delete("uyeep:" + String(u.eposta).toLowerCase());
    await env.AYAR.put("uyeler", JSON.stringify(liste.filter(x => x !== tel)));
    return json({ ok: true, silindi: true });
  } else return json({ ok: false, hata: "Bilinmeyen işlem." });
  await env.AYAR.put(anahtar, JSON.stringify(u));
  return json({ ok: true, uye: Object.assign(disaAc(u), { elleOran: u.oran || 0 }) });
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
  if (!env.AYAR) return json({ ok: false, hata: "Üyelik sistemi şu an kapalı." });
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (String(b.islem || "").startsWith("admin_")) return yonetim(env, b);
  // Girişte telefon yerine e-posta da yazılabilir
  if (b.islem === "giris" && String(b.tel || "").includes("@")) {
    const ep = String(b.tel).trim().toLowerCase();
    let t = await env.AYAR.get("uyeep:" + ep);
    if (!t) {
      const l = JSON.parse(await env.AYAR.get("uyeler") || "[]");
      for (const x of l.slice(0, 500)) { const u = JSON.parse(await env.AYAR.get("uye:" + x) || "null"); if (u && String(u.eposta || "").toLowerCase() === ep) { t = x; break; } }
    }
    if (!t) { await new Promise(r => setTimeout(r, 700)); return json({ ok: false, hata: "Telefon/e-posta veya şifre hatalı." }); }
    b.tel = t;
  }
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
    const ep = temiz(b.eposta, 80).toLowerCase();
    if (ep && await env.AYAR.get("uyeep:" + ep)) return json({ ok: false, hata: "Bu e-postayla zaten üyelik var. Giriş yapın." });
    const tuz = crypto.randomUUID();
    const u = {
      tel, ad, tur, durum: "bekliyor", kayit: new Date().toISOString(),
      eposta: temiz(b.eposta, 80), firma: temiz(b.firma, 80), vkn: temiz(b.vkn, 20), vd: temiz(b.vd, 50),
      adres: temiz(b.adres, 200), ilce: temiz(b.ilce, 40), hacim: temiz(b.hacim, 40), odeme: temiz(b.odeme, 40),
      tuz, hash: await hashle(sifre, tuz), toplam: 0, ay: "", ayGonderi: 0, gecenAy: 0, oran: 0
    };
    await env.AYAR.put(anahtar, JSON.stringify(u));
    if (ep) await env.AYAR.put("uyeep:" + ep, tel);
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
      return json({ ok: false, hata: "Telefon/e-posta veya şifre hatalı." });
    }
    return json({ ok: true, token: await tokenVer(env, tel), uye: disaAc(u) });
  }
  return json({ ok: false, hata: "Bilinmeyen işlem." });
}
