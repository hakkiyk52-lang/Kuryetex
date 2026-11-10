// Yönetim panelinden gelenler: duyuru şeridi ve panelden yüklenen teslimat görselleri
(function(){
  if(window.__kxPanel)return;window.__kxPanel=1;
  var path=location.pathname.replace(/index\.html$/,"");if(!/\/$/.test(path))path+="/";
  function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

  // duyuru şeridi
  fetch("/api/ayar").then(function(r){return r.json()}).then(function(j){
    window.__kxAyar=j;try{document.dispatchEvent(new Event("kxayar"))}catch(e){}
    var d=j&&j.duyuru;if(!d||!d.on||!d.metin)return;
    var k="kxdy_"+d.metin.length+"_"+d.metin.slice(0,12);try{if(sessionStorage.getItem(k))return}catch(e){}
    var u=d.tur==="uyari",b=document.createElement("div");b.className="kxdy";b.setAttribute("role","status");
    b.style.cssText="position:relative;z-index:60;background:"+(u?"#f07c1b":"#0b2f6b")+";color:#fff;font:600 15px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:10px 44px 10px 16px;text-align:center";
    b.innerHTML=(u?"⚠️ ":"📢 ")+esc(d.metin)+'<button type="button" aria-label="Kapat" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:4px 8px">×</button>';
    b.querySelector("button").onclick=function(){b.remove();try{sessionStorage.setItem(k,"1")}catch(e){}};
    document.body.insertBefore(b,document.body.firstChild);
  }).catch(function(){});

  // panelden yüklenen teslimat görselleri
  if(/^\/(yonetim)\//.test(path))return;
  fetch("/api/foto?sayfa="+encodeURIComponent(path)).then(function(r){return r.json()}).then(function(L){
    if(!L||!L.length)return;
    function fig(x,cls){return'<figure'+(cls?' class="'+cls+'"':'')+'><img src="/api/foto?id='+x.id+'" width="'+x.w+'" height="'+x.h+'" loading="lazy" decoding="async" alt="'+esc(x.a)+'"><figcaption>'+esc(x.a)+'</figcaption></figure>'}
    var gal=document.querySelector("main .gal");
    if(gal){gal.insertAdjacentHTML("afterbegin",L.map(function(x){return fig(x,"")}).join(""));return}
    var h=[].slice.call(document.querySelectorAll("main h2")).filter(function(e){return/Son teslimatlarımızdan/.test(e.textContent)})[0];
    var html=L.map(function(x){return fig(x,"kxfig")}).join("");
    if(h){h.insertAdjacentHTML("afterend",html);return}
    var p=document.querySelector("main .wrap.prose")||document.querySelector("main .wrap");
    if(p)p.insertAdjacentHTML("afterbegin","<h2>Son teslimatlarımızdan</h2>"+html);
  }).catch(function(){});
})();
