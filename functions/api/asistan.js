// Cloudflare Pages Function: POST /api/asistan  { messages:[{role,content}], dil }
// Kuryetex müşteri asistanı. Gerekli ayarlar (Cloudflare > Pages > Settings > Variables):
//   ANTHROPIC_API_KEY  : Claude API anahtarı (yoksa asistan kapalı döner)
//   TG_TOKEN, TG_CHAT  : (isteğe bağlı) gece siparişlerinde Telegram bildirimi
//   AYAR (KV)          : günlük mesaj sınırı için (zaten bağlı)
const MODEL = "claude-haiku-5-5";
const GUNLUK_KISI = 30, GUNLUK_TOPLAM = 400;

const SYSTEM = `Sen Kuryetex'in (kuryetex.com.tr) müşteri asistanısın. Müşteri hangi dilde yazarsa o dilde (Türkçe, İngilizce, Arapça vb.) kısa, kibar ve net cevap ver.

FİRMA BİLGİLERİ
- İstanbul'da moto kurye, eczane kurye (eczaneden ilaç alıp getirme) ve araçlı kurye. Eczane hizmeti yalnızca İstanbul'da.
- Adres: Fikirtepe, Yıldırım Sk. 2CD, 34720 Kadıköy/İstanbul. Telefon/WhatsApp: 0551 531 52 34.
- Ulaştırma ve Altyapı Bakanlığı kurye yetki belgeli. Her teslimatta fotoğraf çekilir. Paket alındığı andan teslime kadar sorumluluk Kuryetex'tedir. Isı yalıtımlı çantalar var.
- Teslim süresi genellikle 30–45 dakika; kesin süre sipariş sırasında netleşir. "7/24", "canlı takip", "20 dakikada kapınızda" gibi ifadeler kullanma.
- Ödeme: teslimden sonra kapıda nakit veya havale. Kapıda kart şu an yok.
- Eczane: müşteri ilaç bilgisini, adresini ve konumunu WhatsApp'tan gönderir; açık ya da nöbetçi eczaneyi Kuryetex bulur, ilacı alır, kapalı paketle elden teslim eder. İlaç bedeli + kurye ücreti kapıda birlikte ödenir. İlaç bulunamazsa hiçbir ücret alınmaz. İlaç eczaneden alındıktan sonra sipariş iptal edilemez. Yakınlar adına sipariş verilebilir.

FİYAT
- Kurye ücretini ASLA kendin söyleme veya tahmin etme. Fiyat mesafeye, paket boyutuna ve teslim süresine göre sitedeki hesaplayıcıda KDV dahil görünür. Müşteriyi "Fiyatı hesapla" bölümüne yönlendir: https://kuryetex.com.tr/#hesapla (eczane için https://kuryetex.com.tr/eczane-kurye/#hesapla).
- İlaç fiyatı söyleme. "İlaç bedelini eczane belirler; ilaç ve kurye ücretini kapıda birlikte ödersiniz." de.
- İndirim, kampanya, pazarlık sözü verme; telefona yönlendir.

İLAÇ KURALLARI
- Biz eczane değiliz, sadece aracıyız. İlaç önermeyiz, ilacı değiştirmeyiz, alternatif sunmayız.
- Doz, yan etki, tedavi gibi tıbbi sorulara cevap verme: "Bunun için doktorunuza veya eczacınıza danışın." de.
- Reçeteli ilaç sorulursa: "Reçeteli ilaçlar için lütfen bize WhatsApp'tan yazın: 0551 531 52 34" de; süreci kendin anlatma.
- Acil bir sağlık durumu belirtilirse hemen 112'yi aramasını söyle.

SİPARİŞ
- Müşteri sipariş vermek isterse alım adresi, teslim adresi ve gönderi/ilaç bilgisini topla, kısa bir özet çıkar ve en sona tek satır olarak şunu yaz: [[SIPARIS: <özet>]]. Telefon numarası, kart numarası veya şifre isteme.

SINIRLAR
- Bilmediğin konuda tahmin yürütme; 0551 531 52 34 numarasına yönlendir.
- Kurye hizmetiyle ilgisi olmayan konularda (siyaset, kod yazma, genel sohbet) nazikçe konuya dön.`;

const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8" } });

function trSaat() { return new Date(Date.now() + 3 * 3600e3).getUTCHours(); }

async function sinir(env, ip) {
  if (!env.AYAR) return true;
  const g = new Date(Date.now() + 3 * 3600e3).toISOString().slice(0, 10);
  const k1 = "as:" + g + ":" + ip, k2 = "as:" + g + ":toplam";
  const [a, b] = await Promise.all([env.AYAR.get(k1), env.AYAR.get(k2)]);
  if ((+a || 0) >= GUNLUK_KISI || (+b || 0) >= GUNLUK_TOPLAM) return false;
  await Promise.all([env.AYAR.put(k1, String((+a || 0) + 1), { expirationTtl: 90000 }), env.AYAR.put(k2, String((+b || 0) + 1), { expirationTtl: 90000 })]);
  return true;
}

async function telegram(env, metin) {
  if (!env.TG_TOKEN || !env.TG_CHAT) return;
  try {
    await fetch("https://api.telegram.org/bot" + env.TG_TOKEN + "/sendMessage", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: env.TG_CHAT, text: metin.slice(0, 3500) })
    });
  } catch (e) {}
}

export async function onRequestGet({ env }) { return json({ on: !!env.ANTHROPIC_API_KEY }); }

export async function onRequestPost({ request, env }) {
  if (!env.ANTHROPIC_API_KEY) return json({ off: true });
  let body; try { body = await request.json(); } catch (e) { return json({ err: "bad" }, 400); }
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
    .filter(m => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return json({ err: "bad" }, 400);
  const ip = request.headers.get("CF-Connecting-IP") || "x";
  if (!(await sinir(env, ip))) return json({ text: "Bugünlük mesaj sınırına ulaşıldı. Lütfen WhatsApp'tan yazın: 0551 531 52 34" });

  const h = trSaat(), gece = h >= 2 && h < 9;
  const ek = gece ? "\n\nŞU AN GECE (02:00–09:00). Kurye şu an müsait olmayabilir. Sipariş isteyen müşteriye dürüstçe şunu söyle: 'Şu an gece saatlerinde kuryemiz müsait olmayabilir; talebinizi ilettik, mümkünse dönüş yapacağız, değilse sabah 09:00'dan itibaren hemen dönüyoruz. Acil ilaç ihtiyacınız varsa en yakın nöbetçi eczaneye başvurabilirsiniz; acil sağlık durumunda 112'yi arayın.' Teknik arıza gibi gerçek olmayan bir sebep söyleme." : "";

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 500, system: SYSTEM + ek, messages: msgs })
  });
  if (!r.ok) return json({ text: "Şu an cevap veremiyorum. Lütfen WhatsApp'tan yazın: 0551 531 52 34" });
  const d = await r.json();
  let text = (d.content || []).filter(c => c.type === "text").map(c => c.text).join("\n").trim();
  let siparis = null;
  const m = text.match(/\[\[SIPARIS:\s*([\s\S]*?)\]\]/);
  if (m) { siparis = m[1].trim(); text = text.replace(m[0], "").trim(); if (gece) await telegram(env, "🌙 Gece sipariş isteği (asistan):\n" + siparis); }
  return json({ text, siparis, gece });
}
