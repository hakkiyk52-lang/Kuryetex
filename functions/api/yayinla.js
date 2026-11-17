// Cloudflare Pages Function: POST /api/yayinla {sifre, islem:"durum"|"yayinla"}
// Önizleme dalındaki son hali canlı (main) dala aynen kopyalar. GITHUB_TOKEN gizli değişkeni gerekir.
const REPO = "hakkiyk52-lang/kuryetex";
const json = (o, status = 200) => new Response(JSON.stringify(o), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

export async function onRequestPost(ctx) {
  try { return await calis(ctx); }
  catch (e) { return json({ hata: "Sunucu hatası: " + (e && e.message || e) }, 200); }
}

async function calis({ request, env }) {
  let b = {};
  try { b = await request.json(); } catch (e) {}
  if (!env.YONETIM_SIFRE || b.sifre !== env.YONETIM_SIFRE) return json({ hata: "Şifre yanlış" }, 401);
  if (!env.GITHUB_TOKEN) return json({ hata: "Kurulum eksik: Cloudflare'de GITHUB_TOKEN tanımlanmalı." }, 200);
  const gh = async (yol, opt = {}) => {
    const r = await fetch("https://api.github.com/repos/" + REPO + yol, Object.assign({}, opt, {
      headers: { "Authorization": "Bearer " + env.GITHUB_TOKEN, "Accept": "application/vnd.github+json",
        "User-Agent": "kuryetex-panel", "Content-Type": "application/json" } }));
    const t = await r.text(); let j = {}; try { j = JSON.parse(t); } catch (e) {}
    if (!r.ok) throw new Error("GitHub " + r.status + ": " + (j.message || t.slice(0, 100)));
    return j;
  };
  const oniz = await gh("/git/ref/heads/onizleme"), canli = await gh("/git/ref/heads/main");
  const oc = await gh("/git/commits/" + oniz.object.sha), cc = await gh("/git/commits/" + canli.object.sha);
  const ayni = oc.tree.sha === cc.tree.sha;
  if (b.islem !== "yayinla") {
    let son = [];
    if (!ayni) { const l = await gh("/commits?sha=onizleme&per_page=6"); son = l.map(c => ({ m: (c.commit.message || "").split("\n")[0], t: c.commit.author && c.commit.author.date })); }
    return json({ ok: true, guncel: ayni, son });
  }
  if (ayni) return json({ ok: true, guncel: true, mesaj: "Canlı site zaten önizlemeyle aynı." });
  const yeni = await gh("/git/commits", { method: "POST", body: JSON.stringify({
    message: "Yönetim panelinden canlıya alındı: " + (oc.message || "").split("\n")[0], tree: oc.tree.sha, parents: [canli.object.sha] }) });
  await gh("/git/refs/heads/main", { method: "PATCH", body: JSON.stringify({ sha: yeni.sha, force: false }) });
  return json({ ok: true, yayinlandi: true });
}
