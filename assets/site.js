(function(){
  var hd=document.getElementById("hd");
  function sc(){if(hd)hd.classList.toggle("sc",scrollY>8)}addEventListener("scroll",sc,{passive:true});sc();
  // çekmece menü
  var dr=document.getElementById("drawer"),mb=document.getElementById("menuB"),bb=document.getElementById("bbMenu");
  function openDr(){if(!dr)return;dr.classList.add("open");document.body.classList.add("dr-open");if(mb)mb.setAttribute("aria-expanded","true")}
  function closeDr(){dr=document.getElementById("drawer");mb=document.getElementById("menuB");if(!dr)return;dr.classList.remove("open");document.body.classList.remove("dr-open");if(mb)mb.setAttribute("aria-expanded","false")}
  window.__closeDr=closeDr;
  if(mb)mb.addEventListener("click",openDr);if(bb)bb.addEventListener("click",function(){dr&&dr.classList.contains("open")?closeDr():openDr()});
  if(dr){dr.addEventListener("click",function(e){if(e.target.closest("[data-close]")||e.target.closest("a"))closeDr()})}
  addEventListener("keydown",function(e){if(e.key==="Escape")closeDr()});
  // masaüstü açılır menü: dokunmatikte ilk dokunuş açar
  document.querySelectorAll(".dd>a").forEach(function(a){a.addEventListener("click",function(e){if(matchMedia("(hover:none)").matches){var d=a.parentNode;if(!d.classList.contains("open")){e.preventDefault();d.classList.add("open")}}})});
  document.addEventListener("click",function(e){document.querySelectorAll(".dd.open").forEach(function(d){if(!d.contains(e.target))d.classList.remove("open")})});
  // görünme animasyonu
  var rv=document.querySelectorAll(".reveal:not(.in)");
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.06,rootMargin:"0px 0px -30px 0px"});rv.forEach(function(el){io.observe(el)})}
  else rv.forEach(function(el){el.classList.add("in")});
  setTimeout(function(){document.querySelectorAll(".hero .reveal,.phero .reveal").forEach(function(el){el.classList.add("in")})},60);
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)document.querySelectorAll("svg.map").forEach(function(s){try{s.pauseAnimations()}catch(e){}});
  // SSS: bir tane açıkken diğerlerini kapat
  document.querySelectorAll(".faq").forEach(function(f){f.addEventListener("toggle",function(e){if(e.target.open)f.querySelectorAll("details[open]").forEach(function(d){if(d!==e.target)d.open=false})},true)});
  // dönüşüm olayları (gtag eklendiğinde)
  document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-ev]");if(a&&typeof window.gtag==="function")window.gtag("event",a.getAttribute("data-ev"))});
})();
// ---- güç tasarruf modu
(function(){
  if(window.__kxSaver)return;window.__kxSaver=1;
  var d=document.documentElement;
  function get(){try{return localStorage.getItem("kx-saver")}catch(e){return null}}
  function paint(){var on=d.classList.contains("saver");document.querySelectorAll("[data-saver]").forEach(function(b){b.setAttribute("aria-pressed",on?"true":"false");var e=b.querySelector("em");if(e)e.textContent=on?"Açık":"Kapalı"});
    document.querySelectorAll("svg").forEach(function(s){try{on?s.pauseAnimations():s.unpauseAnimations()}catch(e){}})}
  function toast(t){var o=document.querySelector(".kx-toast");if(o)o.remove();var x=document.createElement("div");x.className="kx-toast";x.setAttribute("role","status");x.textContent=t;document.body.appendChild(x);setTimeout(function(){x.remove()},3000)}
  function set(on,msg){d.classList.toggle("saver",on);try{localStorage.setItem("kx-saver",on?"1":"0")}catch(e){}paint();toast(msg||(on?"🌙 Güç tasarruf modu açık: karanlık tema, animasyonlar kapalı":"Güç tasarruf modu kapalı"))}
  window.__kxPaint=paint;
  document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-saver]");if(b){e.preventDefault();set(!d.classList.contains("saver"))}});
  paint();
  // kullanıcı seçim yapmadıysa: pil %20 altında ve şarjda değilse otomatik aç
  if(get()===null&&navigator.getBattery){navigator.getBattery().then(function(bt){function chk(){if(get()===null&&!bt.charging&&bt.level<=.2&&!d.classList.contains("saver")){d.classList.add("saver");paint();toast("🔋 Pil düşük: güç tasarruf modu (karanlık tema) açıldı")}}chk();bt.addEventListener("levelchange",chk);bt.addEventListener("chargingchange",chk)}).catch(function(){})}
})();
