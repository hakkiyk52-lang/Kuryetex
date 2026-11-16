/* Kuryetex müşteri asistanı (önizleme) */
(function(){
if(window.__kxAs)return;window.__kxAs=1;
var WA="905515315234",msgs=[],busy=false,open=false;
var css=".kxas-b{position:fixed;left:14px;bottom:96px;z-index:60;border:0;border-radius:999px;background:#1f3c88;color:#fff;font:700 14px system-ui,sans-serif;padding:12px 16px;min-height:44px;box-shadow:0 8px 24px -8px rgba(0,0,0,.4);cursor:pointer}"+
".kxas-p{position:fixed;left:10px;right:10px;bottom:92px;z-index:61;max-width:400px;max-height:70vh;display:flex;flex-direction:column;background:#fff;border-radius:16px;box-shadow:0 18px 50px -12px rgba(0,0,0,.45);overflow:hidden;font:15px/1.5 system-ui,sans-serif;color:#1f2937}"+
".kxas-h{background:#1f3c88;color:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center}.kxas-h b{font-size:15px}.kxas-h small{display:block;opacity:.85;font-size:12px}.kxas-x{background:none;border:0;color:#fff;font-size:22px;min-width:44px;min-height:44px;cursor:pointer}"+
".kxas-m{flex:1;overflow:auto;padding:12px;background:#f6f8fb}.kxas-m div{margin:6px 0;padding:9px 12px;border-radius:12px;max-width:88%;white-space:pre-wrap;word-wrap:break-word}.kxas-u{background:#ffe8d6;margin-left:auto!important}.kxas-a{background:#fff;border:1px solid #e3e8ef}"+
".kxas-f{display:flex;gap:8px;padding:10px;border-top:1px solid #e3e8ef}.kxas-f input{flex:1;min-height:44px;border:1px solid #cfd8e3;border-radius:10px;padding:0 12px;font:inherit}.kxas-f button,.kxas-w{min-height:44px;border:0;border-radius:10px;background:#b4470a;color:#fff;font-weight:700;padding:0 14px;cursor:pointer}.kxas-w{display:block;margin:6px 0;background:#1fbf5b;text-align:center;line-height:44px;text-decoration:none;color:#fff}"+
".kxas-p[hidden]{display:none!important}"+
"@media(min-width:760px){.kxas-p{left:20px;right:auto;width:380px;bottom:100px}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var b=document.createElement("button");b.type="button";b.className="kxas-b";b.textContent="💬 Asistana sor";b.setAttribute("aria-label","Kuryetex asistanına soru sor");document.body.appendChild(b);
var p=document.createElement("div");p.className="kxas-p";p.hidden=true;p.setAttribute("role","dialog");p.setAttribute("aria-label","Kuryetex asistanı");
p.innerHTML='<div class="kxas-h"><div><b>Kuryetex Asistanı</b><small>Yapay zekâ destekli · fiyat için hesaplayıcıyı kullanır</small></div><button type="button" class="kxas-x" aria-label="Kapat">×</button></div><div class="kxas-m" aria-live="polite"></div><form class="kxas-f"><input type="text" placeholder="Sorunuzu yazın…" aria-label="Mesajınız" maxlength="500"><button type="submit">Gönder</button></form>';
document.body.appendChild(p);
var M=p.querySelector(".kxas-m"),F=p.querySelector("form"),I=F.querySelector("input");
function add(t,c,html){var d=document.createElement("div");d.className=c;if(html)d.innerHTML=html;else d.textContent=t;M.appendChild(d);M.scrollTop=M.scrollHeight;return d}
function wa(s){var a=document.createElement("a");a.className="kxas-w";a.target="_blank";a.rel="noopener";a.href="https://wa.me/"+WA+"?text="+encodeURIComponent("Merhaba, asistan üzerinden sipariş:\n"+s);a.textContent="WhatsApp'tan siparişi gönder";M.appendChild(a);M.scrollTop=M.scrollHeight}
b.onclick=function(){open=!open;p.hidden=!open;if(open&&!M.childNodes.length)add("Merhaba! Kurye, eczane ve fiyat hesaplama hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olayım?","kxas-a");if(open)I.focus()};
p.querySelector(".kxas-x").onclick=function(){open=false;p.hidden=true};
F.onsubmit=function(e){e.preventDefault();var t=I.value.trim();if(!t||busy)return;I.value="";add(t,"kxas-u");msgs.push({role:"user",content:t});busy=true;var w=add("…","kxas-a");
 fetch("/api/asistan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs})}).then(function(r){return r.json()}).then(function(d){
  if(d.off){w.textContent="Asistan çok yakında aktif olacak. Şimdilik fiyatı hesaplayıcıdan görebilir, WhatsApp'tan yazabilirsiniz: 0551 531 52 34";msgs.pop();return}
  w.textContent=d.text||"Şu an cevap veremiyorum. WhatsApp: 0551 531 52 34";msgs.push({role:"assistant",content:w.textContent});if(d.siparis)wa(d.siparis)
 }).catch(function(){w.textContent="Bağlantı hatası. WhatsApp: 0551 531 52 34";msgs.pop()}).then(function(){busy=false})};
})();
