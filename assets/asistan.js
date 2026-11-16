/* Kuryetex müşteri asistanı: hesaplayıcı altında sohbet kutusu + tam ekran sohbet */
(function(){
if(window.__kxAs)return;window.__kxAs=1;
var demo=/^(onizleme\.|localhost|127\.)/.test(location.hostname);
function idle(f){var run=function(){("requestIdleCallback" in window)?requestIdleCallback(f,{timeout:4000}):setTimeout(f,2500)};if(document.readyState==="complete")run();else addEventListener("load",run)}
if(demo)idle(go);else fetch("/api/asistan").then(function(r){return r.json()}).then(function(j){if(j&&j.on)go()}).catch(function(){});
function go(){
var WA="905515315234",msgs=[],busy=false,views=[];
var css=".kxas-b{position:fixed;left:14px;bottom:96px;z-index:58;opacity:1!important;visibility:visible!important;border:0;border-radius:999px;background:#1f3c88;color:#fff;font:600 14px system-ui,sans-serif;padding:12px 16px;min-height:44px;box-shadow:0 8px 24px -8px rgba(0,0,0,.4);cursor:pointer}"+
".kxas-p{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(15,23,42,.55)}.kxas-card{width:100%;max-width:420px;max-height:min(80vh,640px);display:flex;flex-direction:column;margin-top:0!important;box-shadow:0 24px 60px -12px rgba(0,0,0,.5)!important}.kxas-card .kxas-m{flex:1;max-height:none!important;overflow:auto}.kxas-card .kxas-x{margin-left:auto;color:#fff;background:rgba(255,255,255,.12)}"+
".kxas-p[hidden]{display:none!important}"+
".kxas-p,.kxas-in{font:16px/1.6 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#1f1e1d}"+
".kxas-h{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #e8e6dc}.kxas-h b{font-size:16px;font-weight:600}.kxas-h small{display:block;color:#73726c;font-size:12px}"+
".kxas-x{background:none;border:0;color:#1f1e1d;font-size:26px;min-width:44px;min-height:44px;border-radius:10px;cursor:pointer}"+
".kxas-m{flex:1;overflow:auto;padding:16px;max-width:760px;width:100%;margin:0 auto;box-sizing:border-box}"+
".kxas-u{margin:12px 0 12px auto;max-width:85%;width:fit-content;background:#efede6;border-radius:18px;padding:9px 14px;white-space:pre-wrap;word-wrap:break-word}"+
".kxas-a{margin:12px 0;white-space:pre-wrap;word-wrap:break-word}"+
".kxas-w{display:inline-flex;align-items:center;min-height:44px;margin:2px 0 10px;padding:0 16px;border-radius:12px;background:#1fbf5b;color:#fff!important;text-decoration:none;font-weight:600}"+
".kxas-f{padding:8px 12px calc(12px + env(safe-area-inset-bottom));max-width:760px;width:100%;margin:0 auto;box-sizing:border-box}"+
".kxas-box{display:flex;align-items:flex-end;gap:8px;background:#fff;border:1px solid #dedcd1;border-radius:22px;padding:8px 8px 8px 16px;box-shadow:0 2px 10px rgba(0,0,0,.05)}"+
".kxas-box textarea{flex:1;border:0!important;outline:0;resize:none;background:transparent!important;box-shadow:none!important;font:inherit;color:inherit;max-height:160px;min-height:28px;padding:6px 0!important;margin:0;line-height:1.5}"+
".kxas-s{flex:none;width:40px;height:40px;min-height:40px;border:0;border-radius:12px;background:#e8620a;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}.kxas-s:disabled{background:#e8c9b3;cursor:default}"+
".kxas-n{font-size:12px;color:#73726c;text-align:center;margin-top:6px}"+
".kxas-in{margin-top:16px;background:#fff;border:2px solid #1f3c88;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px -14px rgba(31,60,136,.5)}"+
".kxas-in .kxas-h{background:#1f3c88;color:#fff;border:0;padding:14px 16px;justify-content:flex-start;gap:12px}.kxas-in .kxas-h b{font-size:17px;font-weight:700;color:#fff}.kxas-in .kxas-h small{color:#dbe4f7;font-size:13px}"+
".kxas-ic{flex:none;width:44px;height:44px;border-radius:14px;background:#e8620a;display:flex;align-items:center;justify-content:center;font-size:24px}"+
".kxas-dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#22c55e;margin-right:6px;animation:kxp 1.6s infinite}@keyframes kxp{0%{box-shadow:0 0 0 0 rgba(34,197,94,.6)}70%{box-shadow:0 0 0 8px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}"+
".kxas-in .kxas-m{max-height:340px;padding:4px 14px}.kxas-in .kxas-a{background:#eef2fb;color:#1f3c88;border-radius:16px;padding:10px 13px;width:fit-content;max-width:92%}.kxas-in .kxas-f{padding:10px 12px 12px}.kxas-in .kxas-box{border:1.5px solid #c7d2ea}"+
".kxas-c{display:flex;flex-wrap:wrap;gap:7px;padding:4px 14px 0}.kxas-c button{border:1.5px solid #e8620a;background:#fff7f0;color:#b4470a;border-radius:999px;padding:7px 12px;min-height:38px;font:600 14px system-ui,sans-serif;cursor:pointer}"+
".kxas-in:not(.kxas-card) .kxas-h{padding:10px 12px;gap:10px}.kxas-in:not(.kxas-card) .kxas-ic{width:34px;height:34px;border-radius:10px;font-size:18px}.kxas-in:not(.kxas-card) .kxas-h b{font-size:15.5px}.kxas-in:not(.kxas-card) .kxas-h small{font-size:12px}"+
".kxas-in:not(.kxas-card) .kxas-m{padding:2px 12px}.kxas-in:not(.kxas-card) .kxas-a,.kxas-in:not(.kxas-card) .kxas-u{font-size:14.5px;padding:8px 11px;margin:8px 0}"+
".kxas-in:not(.kxas-card) .kxas-c{flex-wrap:nowrap;overflow-x:auto;padding:2px 12px 2px;scrollbar-width:none}.kxas-in:not(.kxas-card) .kxas-c::-webkit-scrollbar{display:none}.kxas-in:not(.kxas-card) .kxas-c button{flex:none;font-size:13px;min-height:34px;padding:5px 11px}"+
".kxas-in:not(.kxas-card) .kxas-f{padding:8px 10px 10px}.kxas-in:not(.kxas-card) .kxas-box{padding:5px 5px 5px 14px}.kxas-in:not(.kxas-card) .kxas-s{width:36px;height:36px;min-height:36px}.kxas-in:not(.kxas-card) .kxas-box textarea{min-height:24px;padding:4px 0!important}.kxas-in:not(.kxas-card) .kxas-n{font-size:11px;margin-top:4px}"+
".kxas-dots span{display:inline-block;width:7px;height:7px;margin-right:4px;border-radius:50%;background:#b4470a;animation:kxd 1s infinite}.kxas-dots span:nth-child(2){animation-delay:.15s}.kxas-dots span:nth-child(3){animation-delay:.3s}@keyframes kxd{0%,80%{opacity:.25}40%{opacity:1}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var ecz=/eczane|ilac|nobetci/.test(location.pathname);
var HELLO=ecz?"Merhaba! İlaç siparişiyle ilgili aklınıza takılanı sorun. 👋":"Merhaba! Aklınıza takılanı hemen sorun. 👋";
var CHIPS=ecz?["İlaç fiyatını öğrenebilir miyim?","Ödemeyi nasıl yapıyorum?","Gece ilaç getirir misiniz?"]:["Fiyat neye göre değişir?","Ne kadar sürede gelir?","Ödeme nasıl yapılır?"];
var FORM='<form class="kxas-f"><div class="kxas-box"><textarea rows="1" placeholder="Bir şey sorun…" aria-label="Mesajınız" maxlength="800"></textarea><button type="submit" class="kxas-s" aria-label="Gönder" disabled>↑</button></div><div class="kxas-n">Acil sağlık durumunda 112\'yi arayın.</div></form>';

function view(root){
  var M=root.querySelector(".kxas-m"),F=root.querySelector("form"),I=F.querySelector("textarea"),S=F.querySelector(".kxas-s");I.__clr=1;
  var v={M:M,I:I,S:S};views.push(v);
  function grow(){I.style.height="auto";I.style.height=Math.min(160,I.scrollHeight)+"px";S.disabled=!I.value.trim()||busy}
  v.grow=grow;I.addEventListener("input",grow);
  I.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey&&!/Android|iPhone|iPad/i.test(navigator.userAgent)){e.preventDefault();send(I.value,v)}});
  F.addEventListener("submit",function(e){e.preventDefault();send(I.value,v)});
  var ch=root.querySelector(".kxas-c");if(ch)ch.addEventListener("click",function(e){var t=e.target.closest("button");if(t)send(t.textContent,v);ch.hidden=true});
  return v}
function add(v,t,c,html){var d=document.createElement("div");d.className=c;if(html)d.innerHTML=html;else d.textContent=t;v.M.appendChild(d);v.M.scrollTop=v.M.scrollHeight;return d}
function wa(v,s){var a=document.createElement("a");a.className="kxas-w";a.target="_blank";a.rel="noopener";a.href="https://wa.me/"+WA+"?text="+encodeURIComponent("Merhaba, asistan üzerinden sipariş:\n"+s);a.textContent="WhatsApp'tan siparişi gönder ›";v.M.appendChild(a);v.M.scrollTop=v.M.scrollHeight}
function send(t,v){t=(t||"").trim();if(!t||busy)return;v.I.value="";if(!v.M.childNodes.length)add(v,HELLO,"kxas-a");add(v,t,"kxas-u");msgs.push({role:"user",content:t});busy=true;
  var w=add(v,"","kxas-a",'<span class="kxas-dots"><span></span><span></span><span></span></span>');views.forEach(function(x){x.grow()});
  fetch("/api/asistan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:msgs})}).then(function(r){return r.json()}).then(function(d){
   if(d.off){w.textContent="Asistan çok yakında aktif olacak. Şimdilik fiyatı hesaplayıcıdan görebilir, WhatsApp'tan yazabilirsiniz: 0551 531 52 34";msgs.pop();return}
   w.textContent=d.text||"Şu an cevap veremiyorum. WhatsApp: 0551 531 52 34";msgs.push({role:"assistant",content:w.textContent});if(d.siparis)wa(v,d.siparis)
  }).catch(function(){w.textContent="Bağlantı hatası. WhatsApp: 0551 531 52 34";msgs.pop()}).then(function(){busy=false;views.forEach(function(x){x.grow()})})}

/* 1) Hesaplayıcının altındaki sohbet kutusu */
var res=document.getElementById("result");
if(res&&res.parentNode){
  var box=document.createElement("div");box.className="kxas-in";
  box.innerHTML='<div class="kxas-h"><div class="kxas-ic" aria-hidden="true">🤖</div><div><b>Yapay zekâ asistanımıza sorun</b><small><span class="kxas-dot"></span>Kuryetex asistanı · anında cevap</small></div></div><div class="kxas-m" aria-live="polite"></div><div class="kxas-c">'+CHIPS.map(function(c){return'<button type="button">'+c+'</button>'}).join("")+'</div>'+FORM;
  res.parentNode.insertBefore(box,res.nextSibling);var bv=view(box);add(bv,HELLO,"kxas-a");
}
/* 2) Her sayfada yüzen buton + tam ekran sohbet */
{
  var b=document.createElement("button");b.type="button";b.className="kxas-b";b.textContent="💬 Asistana sor";b.setAttribute("aria-label","Kuryetex asistanına soru sor");document.body.appendChild(b);
  var p=document.createElement("div");p.className="kxas-p";p.hidden=true;
  p.innerHTML='<div class="kxas-in kxas-card" role="dialog" aria-label="Kuryetex asistanı"><div class="kxas-h"><div class="kxas-ic" aria-hidden="true">🤖</div><div><b>Yapay zekâ asistanımıza sorun</b><small><span class="kxas-dot"></span>Kuryetex asistanı · anında cevap</small></div><button type="button" class="kxas-x" aria-label="Kapat">×</button></div><div class="kxas-m" aria-live="polite"></div><div class="kxas-c">'+CHIPS.map(function(c){return'<button type="button">'+c+'</button>'}).join("")+'</div>'+FORM+'</div>';
  document.body.appendChild(p);var pv=view(p);
  function kapat(){p.hidden=true;document.documentElement.style.overflow=""}
  b.onclick=function(){p.hidden=false;document.documentElement.style.overflow="hidden";if(!pv.M.childNodes.length)add(pv,HELLO,"kxas-a")};
  p.querySelector(".kxas-x").onclick=kapat;
  p.addEventListener("click",function(e){if(e.target===p)kapat()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!p.hidden)kapat()});
}
}
})();
