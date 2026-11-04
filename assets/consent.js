(function(){
var K="kxck";
function get(){try{return localStorage.getItem(K)}catch(e){return null}}
function set(v){try{localStorage.setItem(K,v)}catch(e){}}
if(get()==="1"||get()==="0")return;
var lang=(document.documentElement.lang||"tr").slice(0,2);
var L={
tr:{t:"Sitemizde deneyiminizi iyileştirmek ve reklam ölçümü için çerezler kullanıyoruz.",p:"Çerez Politikası",u:"/cerez-politikasi/",a:"Kabul et",r:"Reddet"},
en:{t:"We use cookies to improve your experience and to measure our ads.",p:"Cookie Policy",u:"/cerez-politikasi/",a:"Accept",r:"Reject"},
ar:{t:"نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس إعلاناتنا.",p:"سياسة ملفات الارتباط",u:"/cerez-politikasi/",a:"قبول",r:"رفض"}
}[lang]||null;
L=L||{t:"Sitemizde deneyiminizi iyileştirmek ve reklam ölçümü için çerezler kullanıyoruz.",p:"Çerez Politikası",u:"/cerez-politikasi/",a:"Kabul et",r:"Reddet"};
var css=".kxck{position:fixed;z-index:59;left:10px;right:10px;bottom:calc(74px + env(safe-area-inset-bottom));background:#fff;color:#14293f;border:1px solid #dbe4ee;border-radius:14px;box-shadow:0 8px 28px -10px rgba(19,42,107,.35);padding:10px 12px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;font-size:13px;line-height:1.4;max-width:560px;margin:0 auto}.kxck p{margin:0;flex:1 1 220px}.kxck a{color:#1f3c88;text-decoration:underline}.kxck-b{display:flex;gap:8px;flex:0 0 auto}.kxck button{min-width:92px;height:36px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;border:2px solid #14293f;background:#fff;color:#14293f}.kxck button.kxck-a{background:#14293f;color:#fff}@media(min-width:900px){.kxck{bottom:16px}}";
function show(){
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var d=document.createElement("div");d.className="kxck";d.setAttribute("role","region");d.setAttribute("aria-label",L.p);
d.innerHTML='<p>'+L.t+' <a href="'+L.u+'">'+L.p+'</a></p><div class="kxck-b"><button type="button" class="kxck-r">'+L.r+'</button><button type="button" class="kxck-a">'+L.a+'</button></div>';
document.body.appendChild(d);
d.querySelector(".kxck-a").onclick=function(){set("1");if(window.gtag)gtag("consent","update",{ad_storage:"granted",analytics_storage:"granted",ad_user_data:"granted",ad_personalization:"granted"});if(window.__kxClarity)window.__kxClarity();d.remove()};
d.querySelector(".kxck-r").onclick=function(){set("0");d.remove()};
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",show);else show();
})();
