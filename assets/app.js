window.__D=(function(){try{return JSON.parse(document.getElementById("k360i").textContent)}catch(e){return{}}})();function _t(x){var d=window.__D;return(d&&d[x])||x}
window.__hv=true;window.__rs={};window.__RF=function(k,f){if(window.__hv&&!document.documentElement.hasAttribute("data-calm"))window[k]=requestAnimationFrame(f);else window.__rs[k]=f};
(function(){var h=document.querySelector(".hero");if(!h||!("IntersectionObserver" in window))return;new IntersectionObserver(function(es){window.__hv=es[0].isIntersecting;if(window.__hv){for(var k in window.__rs){var f=window.__rs[k];delete window.__rs[k];window[k]=requestAnimationFrame(f)}}},{threshold:0}).observe(h)})();
(function(){
  var C = window.K360, $ = function(id){return document.getElementById(id)};
  // mobil menü
  var mn = $("mnav"), bg = $("burger");
  var bm=$("barMenu"); if(bm&&mn) bm.addEventListener("click",function(){mn.classList.add("open")});
  if(mn && bg){
    bg.addEventListener("click", function(){ mn.classList.add("open"); });
    mn.addEventListener("click", function(e){ if(e.target.closest("a") || e.target.closest(".x")) mn.classList.remove("open"); });
  }
  // reveal
  var rv = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.1});
    rv.forEach(function(el){io.observe(el)});
  } else rv.forEach(function(el){el.classList.add("in")});
  // hero sahnesi: dar ekranda motoru çerçevele
  var sc = document.querySelectorAll(".scene");
  if(sc.length){
    var set = function(){
      var narrow = window.innerWidth < 760;
      sc.forEach(function(s){s.setAttribute("viewBox", narrow ? "500 150 640 660" : "0 0 1200 700");
      s.setAttribute("preserveAspectRatio", narrow ? "xMidYMax meet" : "xMidYMax slice");});
    };
    set(); window.addEventListener("resize", set);
  }
  if(window.matchMedia && matchMedia("(hover:hover) and (prefers-reduced-motion: no-preference)").matches){
    document.querySelectorAll(".card").forEach(function(c){
      c.addEventListener("pointermove", function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform="perspective(800px) rotateY("+(x*7)+"deg) rotateX("+(-y*7)+"deg)"});
      c.addEventListener("pointerleave", function(){c.style.transform=""});
    });
  }
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest("[data-ev]");
    if(a && typeof window.gtag === "function") window.gtag("event", a.getAttribute("data-ev"));
  });

  // fiyat hesaplayıcı
  var from = $("from"), to = $("to"), kg = $("kg"), svcsel=$("svcsel");
  if(!from || !C) return;
  var names = Object.keys(C.D).sort(function(a,b){return a.localeCompare(b,"tr")});
  var f0 = from.getAttribute("data-def") || "", t0 = to.getAttribute("data-def") || "";
  function nz(s){return s.toLocaleLowerCase("tr").replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").replace(/i̇/g,"i")}
  var items=[];names.forEach(function(n){items.push({k:nz(n),l:n+(n==="Gebze"?"":", İstanbul"),t:_t("İlçe"),d:n,r:0})});
  (C.SEM||[]).forEach(function(s){items.push({k:nz(s[0]),l:s[0]+", "+s[1],t:"Mahalle",d:s[1],r:1})});
  var ILM=null,ilmLoading=false;
  function addILM(J){ILM=J;J.c.forEach(function(cc){var code=cc[0],nm=cc[1];if(code!=="34")items.push({k:nz(nm),l:nm,t:_t("Şehirler arası · il"),d:"CITY:"+code,r:2,c:code});
    (J.d[code]||[]).forEach(function(ic){var ilce=ic[0];
      if(code==="34"){if(!C.D[ilce])return;ic[1].forEach(function(m){items.push({k:nz(m[0]),l:m[0]+", "+ilce,t:_t("Mahalle · ")+m[1],d:ilce,r:1})});return}
      if(code==="41"&&ilce==="Gebze"){ic[1].forEach(function(m){items.push({k:nz(m[0]),l:m[0]+", Gebze",t:_t("Mahalle · ")+m[1],d:"Gebze",r:1})});return}
      var il=ilce+", "+nm;items.push({k:nz(ilce),l:il,t:_t("İlçe"),d:"CITY:"+code,r:3,c:code,i:ilce});
      ic[1].forEach(function(m){items.push({k:nz(m[0]),l:m[0]+", "+il,t:_t("Mahalle · ")+m[1],d:"CITY:"+code,r:4,c:code,i:ilce})})})});
    var ae=document.activeElement;if(ae&&(ae===from||ae===to)&&ae.value&&!ae.dataset.d)ae.dispatchEvent(new Event("input"))}
  function loadILM(){if(ILM||ilmLoading)return;if(window.__ILM){addILM(window.__ILM);return}ilmLoading=true;fetch("/assets/data/ilmah.json").then(function(r){return r.json()}).then(addILM).catch(function(){ilmLoading=false})}
  [from,to].forEach(function(el){el.addEventListener("focus",loadILM);el.addEventListener("input",loadILM)});
  function val(el){return el.dataset.d||""}
  function setSel(el,d){var it=items.filter(function(x){return x.d===d&&x.r===0})[0];el.value=it?it.l:d;el.dataset.d=d}
  function ac(el){
    var box=el.parentNode.querySelector(".acl"),cur=-1,list=[];
    function show(){var q=nz(el.value.trim());box.innerHTML="";list=[];if(q.length<1){box.style.display="none";return}
      var seen={};function add(x){var key=x.l;if(!seen[key]){seen[key]=1;list.push({x:x})}}
      items.forEach(function(x){if(x.r===0&&x.k.indexOf(q)===0){add(x);items.forEach(function(y){if(y.r===1&&y.d===x.d)add(y)})}});
      items.forEach(function(x){if(x.r===1&&x.k.indexOf(q)===0)add(x)});
      items.forEach(function(x){if(x.r===1&&x.k.indexOf(q)>0)add(x)});
      items.forEach(function(x){if(x.r===2&&x.k.indexOf(q)===0){add(x);items.forEach(function(y){if(y.r===3&&y.c===x.c)add(y)})}});
      items.forEach(function(x){if(x.r===3&&x.k.indexOf(q)===0){add(x);items.forEach(function(y){if(y.r===4&&y.c===x.c&&y.i===x.i)add(y)})}});
      items.forEach(function(x){if(x.r===4&&x.k.indexOf(q)===0)add(x)});
      items.forEach(function(x){if(x.r>=2&&x.k.indexOf(q)>0)add(x)});
      list=list.slice(0,14);(geoRes[el.id]||[]).forEach(function(g){if(g.q===q)list.push({x:{l:g.l,t:g.t,pt:g.pt,r:5}})});
      if(q.length>=3)geoAsk(q);
      if(!list.length){box.innerHTML='<li class="none">Sonuç bulunamadı. Yakın bir ilçe adı yazmayı deneyin.</li>';box.style.display="block";return}
      list.forEach(function(o,idx){var li=document.createElement("li");li.setAttribute("role","option");li.innerHTML="<span></span><em></em>";li.firstChild.textContent=o.x.l;li.lastChild.textContent=o.x.t;if(o.x.r===1||o.x.r===4)li.className="sub";if(o.x.pt)li.className="adr";
        li.addEventListener("mousedown",function(e){e.preventDefault();pick(o.x)});box.appendChild(li)});
      box.style.display="block";cur=-1}
    var geoRes={},gT;
    function geoAsk(q){clearTimeout(gT);gT=setTimeout(function(){var raw=el.value.trim();geocode(raw,function(out){if(nz(el.value.trim())!==q)return;geoRes[el.id]=out.map(function(o){o.q=q;return o});show()})},450)}
    function pick(x){box.style.display="none";if(x.pt){if(!setPt(el,x.pt[0],x.pt[1],x.l)){el.value=x.l;el.dataset.d=""}return}el.value=x.l;el.dataset.d=x.d;delete el.dataset.ll;reset()}
    el.addEventListener("input",function(){el.dataset.d="";delete el.dataset.ll;geoRes[el.id]=[];show();reset()});
    el.addEventListener("focus",function(){if(el.value&&!el.dataset.d)show()});
    el.addEventListener("blur",function(){setTimeout(function(){box.style.display="none"},120);if(!el.dataset.d){var q=nz(el.value.trim());var m=items.filter(function(x){return x.r===0&&x.k===q})[0];if(m){pick(m)}}});
    el.addEventListener("keydown",function(e){var lis=box.querySelectorAll("li[role=option]");if(!lis.length)return;
      if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();cur=(cur+(e.key==="ArrowDown"?1:-1)+lis.length)%lis.length;lis.forEach(function(l,i){l.classList.toggle("on",i===cur)})}
      else if(e.key==="Enter"&&cur>=0){e.preventDefault();pick(list[cur].x)}else if(e.key==="Escape"){box.style.display="none"}})}
  // ---- sokak/adres arama + haritadan seçme
  function hav(a,b,c,d){var r=Math.PI/180,x=Math.sin((c-a)*r/2),y=Math.sin((d-b)*r/2),h=x*x+Math.cos(a*r)*Math.cos(c*r)*y*y;return 12742*Math.asin(Math.sqrt(h))}
  function nearD(lat,lon){var bn=null,bk=1e9;Object.keys(C.D).forEach(function(n){var d=C.D[n],k=hav(lat,lon,d.lat,d.lon);if(k<bk){bk=k;bn=n}});return{n:bn,km:bk}}
  function setPt(el,lat,lon,label){var nd=nearD(lat,lon);if(nd.km>45){errEl.textContent=_t("Bu nokta İstanbul hizmet bölgesi dışında. Şehirler arası için listeden il veya ilçe seçin.");return false}
    errEl.textContent="";el.value=label;el.dataset.d=nd.n;el.dataset.ll=lat.toFixed(5)+","+lon.toFixed(5);reset();return true}
  function ptOf(el){var s=el.dataset.ll;if(!s||!C.D[el.dataset.d])return null;var p=s.split(",");return{lat:+p[0],lon:+p[1],side:C.D[el.dataset.d].side}}
  var gcache={};
  function lbl(p){var a=[];var st=p.name||p.street||"";if(p.name&&p.street&&p.name!==p.street)st=p.street+" "+(p.housenumber||"");else if(p.housenumber)st+=" No:"+p.housenumber;
    [st,p.locality||p.suburb||p.district,p.district&&(p.locality||p.suburb)?p.district:"",p.city||p.county||p.state].forEach(function(x){x=(x||"").trim();if(x&&a.indexOf(x)<0)a.push(x)});return a.join(", ")}
  function geocode(q,cb){if(gcache[q])return cb(gcache[q]);
    fetch("https://photon.komoot.io/api/?limit=8&lat=41.03&lon=29.0&bbox=27.9,40.6,30.1,41.6&q="+encodeURIComponent(q)).then(function(r){return r.json()}).then(function(j){
      var out=[];(j.features||[]).forEach(function(f){var p=f.properties||{};if(p.countrycode&&p.countrycode!=="TR")return;var c=f.geometry.coordinates;out.push({l:lbl(p),t:_t("Adres · ")+(p.postcode||"harita"),pt:[c[1],c[0]]})});
      gcache[q]=out;cb(out)}).catch(function(){cb([])})}
  function revgeo(lat,lon,cb){var fb=_t("Seçilen konum (")+lat.toFixed(4)+", "+lon.toFixed(4)+")";
    fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=18&accept-language=tr&lat="+lat+"&lon="+lon).then(function(r){return r.json()}).then(function(j){var a=j.address||{};
      var parts=[(a.road||"")+(a.house_number?" No:"+a.house_number:""),a.neighbourhood||a.suburb||a.quarter||"",a.city_district||a.town||a.county||"",a.province||a.state||a.city||""].filter(function(x,i,s){return x&&s.indexOf(x)===i});cb(parts.length?parts.join(", "):fb)}).catch(function(){cb(fb)})}
  var LF=null;function loadLeaflet(cb){if(window.L)return cb();if(LF)return LF.push(cb);LF=[cb];
    var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";s.onload=function(){LF.forEach(function(f){f()});LF=null};document.head.appendChild(s)}
  function openMap(){
    var ov=document.createElement("div");ov.className="mpov";
    ov.innerHTML='<div class="mph"><div class="mpt"><button type="button" data-w="0" class="on">📍 Alım noktası</button><button type="button" data-w="1">🏁 Teslim noktası</button></div><button type="button" class="mpx" aria-label="Kapat">✕</button></div><div class="mpm"><div class="mpl">Harita yükleniyor…</div></div><div class="mpf"><div class="mpa">Haritaya dokunun veya iğneyi basılı tutup sürükleyin. Sokağa kadar yakınlaştırabilirsiniz.</div><div class="mpb"><button type="button" class="btn mpg">📡 Konumum</button><button type="button" class="btn btn-main mpo">Seçimi Kullan</button></div></div>';
    document.body.appendChild(ov);document.body.classList.add("mapping");
    var act=0,pts=[null,null],mk=[null,null],lab=["",""],map,els=[from,to];
    function close(){document.body.classList.remove("mapping");if(map)map.remove();ov.remove()}
    ov.querySelector(".mpx").onclick=close;
    var msg=ov.querySelector(".mpa");
    loadLeaflet(function(){
      var m=ov.querySelector(".mpm");m.innerHTML="";var el=document.createElement("div");el.style.cssText="position:absolute;inset:0";m.appendChild(el);
      map=L.map(el,{zoomControl:true}).setView([41.03,29.0],11);
      var tl1=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap"}).addTo(map),fails=0,blobMode=false;
      var BL=L.GridLayer.extend({createTile:function(c,done){var t=document.createElement("img"),u="https://tile.openstreetmap.org/"+c.z+"/"+c.x+"/"+c.y+".png";
        fetch(u).then(function(r){if(!r.ok)throw 0;return r.blob()}).then(function(b){t.onload=function(){done(null,t)};t.src=URL.createObjectURL(b)}).catch(function(){done(1,t);tfail()});return t}});
      function tfail(){fails++;if(fails===3)msg.textContent=_t("Harita görüntüsü yüklenemedi (bu ortamda engelli olabilir). İğne yine de yerleştirilebilir; adresi yukarıdaki kutuya yazarak da seçebilirsiniz.")}
      tl1.on("tileerror",function(){if(!blobMode){blobMode=true;map.removeLayer(tl1);new BL({maxZoom:19,attribution:"© OpenStreetMap"}).addTo(map)}});
      
      function icon(w){return L.divIcon({className:"mpin",html:'<span class="mpin'+w+'">'+(w?"🏁":"📍")+"</span>",iconSize:[40,40],iconAnchor:[20,38]})}
      function place(w,ll,doRev){pts[w]=ll;if(!mk[w]){mk[w]=L.marker(ll,{draggable:true,icon:icon(w)}).addTo(map);mk[w].on("dragend",function(){var p=mk[w].getLatLng();place(w,[p.lat,p.lng],true)})}else mk[w].setLatLng(ll);
        if(doRev){lab[w]="";msg.textContent=_t("Adres aranıyor…");revgeo(ll[0],ll[1],function(t){lab[w]=t;if(act===w)msg.textContent=(w?"Teslim: ":_t("Alım: "))+t})}}
      [0,1].forEach(function(w){var e=els[w],p=ptOf(e);if(p){place(w,[p.lat,p.lon],false);lab[w]=e.value}else if(C.D[e.dataset.d||""]){var d=C.D[e.dataset.d];pts[w]=null;map.setView([d.lat,d.lon],13)}});
      if(mk[0]||mk[1]){var g=L.featureGroup(mk.filter(Boolean));map.fitBounds(g.getBounds().pad(.6),{maxZoom:15})}
      map.on("click",function(e){place(act,[e.latlng.lat,e.latlng.lng],true)});
      ov.querySelectorAll(".mpt button").forEach(function(b){b.onclick=function(){act=+b.dataset.w;ov.querySelectorAll(".mpt button").forEach(function(x){x.classList.toggle("on",x===b)});if(lab[act])msg.textContent=(act?"Teslim: ":_t("Alım: "))+lab[act];else if(pts[act])map.panTo(pts[act]);else msg.textContent="Haritaya dokunarak "+(act?"teslim":"alım")+" noktasını işaretleyin."}});
      ov.querySelector(".mpg").onclick=function(){if(!navigator.geolocation){msg.textContent=_t("Konum bu cihazda kullanılamıyor.");return}navigator.geolocation.getCurrentPosition(function(p){var ll=[p.coords.latitude,p.coords.longitude];map.setView(ll,17);place(act,ll,true)},function(){msg.textContent=_t("Konum izni verilmedi.")},{enableHighAccuracy:true,timeout:10000})};
      ov.querySelector(".mpo").onclick=function(){var ok=true,any=false;[0,1].forEach(function(w){if(pts[w]){any=true;if(!setPt(els[w],pts[w][0],pts[w][1],lab[w]||_t("Seçilen konum (")+pts[w][0].toFixed(4)+", "+pts[w][1].toFixed(4)+")"))ok=false}});
        if(!any){msg.textContent=_t("Önce haritaya dokunarak bir nokta işaretleyin.");return}if(!ok){msg.textContent=_t("Bir nokta İstanbul hizmet bölgesi dışında kaldı. İğneyi İstanbul içine taşıyın.");return}close()};
    })}
  var mb=document.getElementById("mapPick");if(mb)mb.addEventListener("click",openMap);
  ac(from);ac(to);
  if(f0)setSel(from,f0);if(t0)setSel(to,t0);
  // hizmet seçici
  var SV=[
   {k:"motor-kurye",l:_t("🏍️ Moto kurye"),t:"calc",size:1,kg:1},
   {k:"evrak-kurye",l:_t("📄 Evrak gönderi"),t:"calc",size:0,kg:0},
   {k:"paket-servis-kurye",l:_t("🍔 Paket servis (restoran)"),t:"calc",size:1,kg:0},
   {k:"eczane-kurye",l:_t("💊 Eczane (ilaç teslimi)"),t:"calc",size:0,kg:0,tm:0,np:1,tv:_t("90 dakika (Express teslim)")},
   {k:"express-kurye",l:_t("⚡ Express kurye"),t:"calc",size:1,kg:1,tm:0,tv:_t("90 dakika (Express teslim)")},
   {k:"aracli-kurye",l:_t("🚚 Araçlı kurye"),t:"calc",size:0,kg:0,mult:C.ARAC_MULT||2.5},
   {k:"vip-kurye",l:_t("👑 VIP kurye"),t:"calc",size:1,kg:1,tm:0,tv:_t("60 dakika (VIP teslim)")},
   {k:"sofor-vale",l:_t("🔑 Vale / şoför hizmeti"),t:"calc",size:0,kg:0,mult:C.ARAC_MULT||2.5},
   {k:"ucak-kargo-teslim",l:_t("✈️ Uçak kargo teslim"),t:"calc",size:1,kg:1},
   {k:"otobus-kargo-teslim",l:_t("🚌 Otobüs kargo teslim"),t:"calc",size:1,kg:1}];
  var tmb=document.querySelectorAll("#tm button"),tmcW=$("tmcWrap"),tmc=$("tmc"),tmv=_t("Gün içi teslim (2,5–3 saat)");
  function setTm(v){tmv=v;tmb.forEach(function(x){x.setAttribute("aria-pressed",x.getAttribute("data-t")===v?"true":"false")});if(tmcW)tmcW.style.display=v==="custom"?"block":"none"}
  tmb.forEach(function(b){b.addEventListener("click",function(){setTm(b.getAttribute("data-t"));reset()})});if(tmc)tmc.addEventListener("input",reset);
  var lastTx=0;
  function tmExtra(base){var m;if(cur&&cur.np)return lastTx=0;if(tmv==="custom"){if(!(tmc&&tmc.value))return lastTx=0;var h=tmc.value.split(":"),n=new Date(),tgt=new Date();tgt.setHours(+h[0],+h[1],0,0);m=(tgt-n)/60000;if(m<0)return lastTx=0}
    else m=tmv.indexOf(_t("60 dakika"))===0?60:tmv.indexOf(_t("90 dakika"))===0?90:tmv===_t("2 saat")?120:999;
    var f=m<=60?(C.TF_VIP||.2):m<=90?0:m<=120?-(C.TF_2H||.1):-(C.TF_DAY||.2);
    return lastTx=Math.round((base||0)*f/50)*50}
  function txs(x){return x>0?"+"+tl(x):x<0?"−"+tl(-x):tl(0)}
  function txn(){if(cur&&cur.np)return _t("Eczane teslimi standart fiyattır.");return lastTx>0?_t("Hızlı teslim farkı: ")+txs(lastTx)+".":lastTx<0?_t("Geç teslim indirimi: ")+txs(lastTx)+".":_t("Express (90 dk) standart fiyat.")}
  function tmText(){if(cur&&cur.np)return _t("30–45 dakika (hava şartlarına bağlı)");return tmv==="custom"?(tmc&&tmc.value?_t("Saat ")+tmc.value+" (belirli saat)":""):tmv}
  var cur=null,size=-1,sizeName="",raf=0,shown=0;
  var res=$("result"),errEl=$("cerr");
  function reset(){if(res)res.style.display="none";if(errEl)errEl.textContent="";stage()}
  function stage(){if(typeof from==="undefined"||!from||!to)return;var s1=true,s2=true,s3=!!cur&&!!val(from)&&!!val(to);
    [[from.closest(".field"),s1],[to.closest(".field"),s2],[$("rowSize"),s3],[$("rowKg"),s3],[$("rowTm"),s3],[$("moreopt"),s3],[$("calcBtn"),s3]].forEach(function(m){var e=m[0];if(!e)return;var hid=e.classList.contains("stg-hide");if(m[1]&&hid){e.classList.remove("stg-hide");e.classList.add("stg-in")}else if(!m[1]&&!hid)e.classList.add("stg-hide")})}
  setTimeout(stage,0);setTimeout(stage,400);
  function applySvc(s){cur=s;if(s&&tmb.length){if(s.k==="vip-kurye")setTm(_t("60 dakika (VIP teslim)"));else if(s.k==="express-kurye")setTm(_t("90 dakika (Express teslim)"));else if(tmv===_t("60 dakika (VIP teslim)")||tmv===_t("90 dakika (Express teslim)"))setTm(_t("Gün içi teslim (2,5–3 saat)"))}svcsel.value=s?s.l:"";var r1=$("rowSize"),r2=$("rowKg");if(r1)r1.style.display=s&&s.size?"":"none";if(r2)r2.style.display=s&&s.kg?"":"none";
    var rt=$("rowTm"),d=$("moreopt"),noTm=!!(s&&s.tm===0);if(noTm)setTm(s.tv);if(rt)rt.style.display=noTm?"none":"";
    if(d){var any=!noTm||!!(s&&(s.size||s.kg));d.style.display=any?"":"none";var sm=d.querySelector("summary");if(sm&&sm.firstChild){var p=[];if(!noTm)p.push(_t("süre"));if(s&&s.size)p.push(_t("koli"));if(s&&s.kg)p.push(_t("ağırlık"));var lb=p.length>1?p.slice(0,-1).join(", ")+_t(" ve ")+p[p.length-1]:p[0]||"";sm.firstChild.nodeValue=(noTm?"📦 ":"⏱️ ")+(p.length===1&&!noTm?"Teslim süresini seçin ":lb.charAt(0).toUpperCase()+lb.slice(1)+_t(" seçenekleri "))}d.open=any}
    reset()}
  (function(){var box=svcsel.parentNode.querySelector(".acl");
    function open(){box.innerHTML="";SV.forEach(function(s){var li=document.createElement("li");li.setAttribute("role","option");li.innerHTML="<span></span>";li.firstChild.textContent=s.l;li.addEventListener("mousedown",function(e){e.preventDefault();applySvc(s);box.style.display="none"});box.appendChild(li)});box.style.display="block"}
    svcsel.addEventListener("click",open);svcsel.addEventListener("focus",open);svcsel.addEventListener("blur",function(){setTimeout(function(){box.style.display="none"},120)})})();
  var d0=svcsel.getAttribute("data-def");if(d0){var f=SV.filter(function(s){return s.k===d0})[0];if(f)applySvc(f)}
  var btns=document.querySelectorAll("#svc button");
  btns.forEach(function(b){b.addEventListener("click",function(){btns.forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");sizeName=b.getAttribute("data-s");size=+b.getAttribute("data-x");reset()})});
  kg.addEventListener("input",reset);
  function tl(n){return "₺" + n.toLocaleString("tr-TR")}
  function air(a, b){var R=6371,rad=Math.PI/180,dLat=(b.lat-a.lat)*rad,dLon=(b.lon-a.lon)*rad;var h=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dLon/2)*Math.sin(dLon/2);return 2*R*Math.asin(Math.sqrt(h))}
  function tarife(km,A){A=A||C.ANCHORS;var i;if(km<=A[0][0])return A[0][1];for(i=1;i<A.length;i++){if(km<=A[i][0])return A[i-1][1]+(A[i][1]-A[i-1][1])*(km-A[i-1][0])/(A[i][0]-A[i-1][0]);}var u=A[A.length-2],l=A[A.length-1];return l[1]+(l[1]-u[1])/(l[0]-u[0])*(km-l[0])}
  function compute(){
    var missing=[];if(!cur)missing.push(_t("hizmet"));if(!val(from))missing.push(_t("alım noktası"));if(!val(to))missing.push(_t("teslim noktası"));if(cur&&cur.size&&size<0)missing.push(_t("gönderi boyutu"));if(tmv==="custom"&&!(tmc&&tmc.value))missing.push(_t("teslim saati"));
    if(missing.length){errEl.textContent=_t("Lütfen seçin: ")+missing.join(", ")+".";res.style.display="none";if(window.__bad){if(!cur)window.__bad(svcsel,_t("Hizmet seçin"));if(!val(from))window.__bad(from,_t("Alım noktasını seçin"));if(!val(to))window.__bad(to,_t("Teslim noktasını seçin"));if(tmv==="custom"&&!(tmc&&tmc.value))window.__bad(tmc,_t("Saat seçin"));if(cur&&cur.size&&size<0)window.__bad(document.getElementById("svc"),_t("Gönderi boyutunu seçin"));window.__goBad(document.querySelector("#hesapla .bad"))}return}
    errEl.textContent="";
    var fa=val(from),tb=val(to);
    var w=0,wx=0,sx=cur.size&&size>=0?C.SIZE_EXTRA[size]:0;if(cur.kg){w=parseFloat(String(kg.value).replace(",","."));if(!(w>=0))w=0;wx=w>C.FREE_KG?Math.ceil((w-C.FREE_KG)/C.KG_STEP)*C.KG_FEE:0}
    function xnote(){var a=[];if(cur.size&&sizeName)a.push(sx?_t("Koli ebat farkı: +")+tl(sx):_t("Evrak / küçük: ek ücret yok"));if(cur.kg)a.push(wx?_t("5 kg üzeri: +")+tl(wx)+" ("+Math.ceil(w-C.FREE_KG)+" kg × "+tl(C.KG_FEE)+")":_t("5 kg'a kadar ek ücret yok"));return a.join(" · ")}
    if(/^CITY:/.test(fa)||/^CITY:/.test(tb)){
      function ica(km){var A=C.ICA;if(km<=A[0][0])return A[0][1];for(var i=1;i<A.length;i++)if(km<=A[i][0])return A[i-1][1]+(A[i][1]-A[i-1][1])*(km-A[i-1][0])/(A[i][0]-A[i-1][0]);return A[A.length-1][1]}
      var codeOf=function(v){return /^CITY:/.test(v)?v.slice(5):(C.D[v]?"34":null)};
      var ca=codeOf(fa),cb=codeOf(tb),mm=(ILM&&ILM.m)||{},ikm,ip;
      if(ca===cb){ikm=15;ip=800}else{ikm=(mm[ca]&&mm[ca][cb])||300;var oth=ca==="34"?cb:(cb==="34"?ca:null);ip=(oth&&C.PXC&&C.PXC[oth])||ica(ikm)}
      ip=Math.round(ip/500)*500;var tx2=tmExtra(ip);ip+=tx2+sx+wx;
      var hl2=cur.l.replace(/^\S+\s/,"");$("route").textContent=from.value+" → "+to.value;$("km").textContent=_t("Şehirler arası · yaklaşık ")+Math.round(ikm/10)*10+_t(" km (karayolu, tahmini)");$("svcname").textContent=cur.l;$("detail").textContent=_t("Teslim: ")+tmText();$("kgnote").textContent="";
      var pe2=$("price");cancelAnimationFrame(raf);pe2.className="price";pe2.textContent=tl(ip);var reqM=tmv==="custom"?(function(){if(!(tmc&&tmc.value))return 999;var h=tmc.value.split(":"),tg=new Date();tg.setHours(+h[0],+h[1],0,0);var mm=(tg-new Date())/60000;return mm<0?999:mm})():(tmv.indexOf(_t("60 dakika"))===0?60:tmv.indexOf(_t("90 dakika"))===0?90:tmv===_t("2 saat")?120:999);
      var needM=ikm/85*60;$("kgnote").textContent=(xnote()?xnote()+". ":"")+txn();
      $("pnote").textContent=_t("Şehirler arası tahmini fiyattır; araç cinsine, yüke ve güzergâha göre kesin fiyat WhatsApp'ta netleşir.")+(reqM<needM?_t(" Seçtiğiniz süre bu mesafe için çok kısa olabilir (yolculuk yaklaşık ")+Math.round(needM/30)/2+" saat); uygunluğu WhatsApp'ta netleştiririz.":"");
      var m2="Merhaba, kuryetex.com.tr üzerinden şehirler arası gönderi için sipariş vermek istiyorum.\n\nHizmet: "+hl2+"\nAlım noktası: "+from.value+"\nTeslim noktası: "+to.value;
      if(cur.size&&sizeName)m2+="\nGönderi boyutu: "+sizeName;if(cur.kg)m2+="\nAğırlık: "+(parseFloat(String(kg.value).replace(",","."))||0)+" kg";
      m2+="\nTeslim süresi: "+tmText()+"\nTahmini mesafe: ~"+Math.round(ikm/10)*10+" km\nSistemdeki fiyat: "+tl(ip)+" (şehirler arası tahmini"+(tx2?", teslim süresi farkı "+txs(tx2):"")+")";
      $("waBtn").href="https://wa.me/"+C.PHONE+"?text="+encodeURIComponent(m2);res.style.display="block";res.scrollIntoView({behavior:"smooth",block:"nearest"});return}
    var pa=ptOf(from),pb=ptOf(to),a=pa||C.D[fa],b=pb||C.D[tb],km,raw,ar=air(a,b);
    if(fa===tb&&!pa&&!pb){km=3;raw=0}else if(a.side==="B"&&b.side==="B"){km=Math.max(3,ar*1.15);raw=tarife(ar,C.ANCHORS_E)}else{km=Math.max(3,ar*C.ROAD+(a.side!==b.side?C.BRIDGE_KM:0));raw=tarife(km)}
    if(!(fa===tb&&!pa&&!pb)&&C.FAR&&(C.FAR.indexOf(fa)>-1||C.FAR.indexOf(tb)>-1))raw=Math.max(raw,km*C.FAR_RATE);raw=Math.max(raw,C.MINP[C.ZONE[fa]],C.MINP[C.ZONE[tb]]);
    var p=null;
    if(cur.t==="calc"){var base=Math.round(raw/C.ROUND)*C.ROUND;p=cur.mult?Math.round(base*cur.mult/C.ROUND)*C.ROUND:base+(cur.add||0);p+=tmExtra(p);p+=sx+wx}
    var hl=cur.l.replace(/^\S+\s/,"");
    $("route").textContent=from.value+" → "+to.value;
    $("km").textContent=_t("Mesafe: ")+km.toFixed(1).replace(".",",")+_t(" km (tahmini)");
    $("svcname").textContent=cur.l;
    var det=[];if(cur.size&&sizeName)det.push(sizeName);if(cur.kg)det.push((w||0)+" kg");det.push(_t("Teslim: ")+tmText());$("detail").textContent=det.join(" · ");
    $("kgnote").textContent=(xnote()?xnote()+". ":"")+txn();
    var pe=$("price");
    if(p!==null){pe.className="price";cancelAnimationFrame(raf);var s0=0,t0=performance.now();(function step(now){var t=Math.min(1,(now-t0)/500);pe.textContent=tl(Math.round(s0+(p-s0)*(1-Math.pow(1-t,3))));if(t<1)raf=requestAnimationFrame(step)})(t0);$("pnote").textContent=_t("Tahmini fiyattır. Kesin fiyat sipariş sırasında netleşir.")}
    else{pe.className="price ask";pe.textContent=_t("Fiyat WhatsApp'ta netleşir");$("pnote").textContent=_t("Bu hizmetin fiyatı mesafe, saat ve gönderiye göre belirlenir. Bilgileriniz hazır mesajla bize ulaşacak.")}
    var msg="Merhaba, kuryetex.com.tr üzerinden sipariş vermek istiyorum.\n\nHizmet: "+hl+"\nAlım noktası: "+from.value+"\nTeslim noktası: "+to.value;if(pa)msg+="\nAlım konumu: https://maps.google.com/?q="+from.dataset.ll;if(pb)msg+="\nTeslim konumu: https://maps.google.com/?q="+to.dataset.ll;
    if(cur.size&&sizeName)msg+="\nGönderi boyutu: "+sizeName;if(cur.kg)msg+="\nAğırlık: "+(w||0)+" kg";
    msg+="\nTeslim süresi: "+tmText()+(sx?"\nKoli ebat farkı: +"+tl(sx):"")+(wx?"\nAğırlık farkı: +"+tl(wx):"")+"\nTahmini mesafe: "+km.toFixed(1).replace(".",",")+" km\nSistemdeki fiyat: "+(p!==null?tl(p):_t("WhatsApp'ta netleşecek"));
    $("waBtn").href="https://wa.me/"+C.PHONE+"?text="+encodeURIComponent(msg);
    res.style.display="block";res.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
  var cb=$("calcBtn");if(cb)cb.addEventListener("click",compute);
  document.querySelectorAll("[data-pick]").forEach(function(a){a.addEventListener("click",function(){setSel(to,a.getAttribute("data-pick"));reset()})});
})();
(function(){document.querySelectorAll(".ofm").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();var d=new FormData(f);var m="Merhaba, "+f.getAttribute("data-svc")+" siparişi vermek istiyorum.\nAlım adresi: "+d.get("a")+"\nTeslim adresi: "+d.get("t")+(d.get("p")?"\nTelefon: "+d.get("p"):"")+(d.get("n")?"\nNot: "+d.get("n"):"");window.open("https://wa.me/"+window.K360.PHONE+"?text="+encodeURIComponent(m),"_blank")})})})();
(function(){document.querySelectorAll(".cform").forEach(function(f){var msg=f.querySelector(".cmsg");f.addEventListener("submit",function(e){e.preventDefault();
 var fd=new FormData(f);if(fd.get("_honey"))return;if(!fd.get("Firma")||!fd.get("Yetkili")||!fd.get("Telefon")){msg.className="cmsg err";msg.textContent=_t("Lütfen firma adı, yetkili adı ve telefon alanlarını doldurun.");return}
 var btn=f.querySelector("button");btn.disabled=true;btn.textContent=_t("Gönderiliyor…");fd.set("_subject","Kuryetex kurumsal üyelik başvurusu: "+fd.get("Firma"));fd.set("_captcha","false");fd.set("_template","table");
 var text="Kurumsal üyelik başvurusu\n";fd.forEach(function(v,k){if(k.charAt(0)!=="_"&&v)text+=k+": "+v+"\n"});
 function fallback(){msg.className="cmsg err";msg.innerHTML="Başvuru otomatik gönderilemedi. Lütfen <a href=\"https://wa.me/"+window.K360.PHONE+"?text="+encodeURIComponent(text)+"\" target=\"_blank\" rel=\"noopener\">WhatsApp ile gönderin</a> veya <a href=\"mailto:kuryetex@gmail.com?subject="+encodeURIComponent("Kurumsal üyelik başvurusu")+"&body="+encodeURIComponent(text)+"\">e-posta ile iletin</a>.";btn.disabled=false;btn.textContent=_t("Başvuruyu Gönder")}
 fetch("https://formsubmit.co/ajax/kuryetex@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd}).then(function(r){return r.json()}).then(function(d){
  if(d&&(d.success===true||d.success==="true")){msg.className="cmsg ok";msg.textContent=_t("Başvurunuz alındı. En kısa sürede size dönüş yapacağız.");f.reset();btn.disabled=false;btn.textContent=_t("Başvuruyu Gönder")}else fallback()}).catch(fallback)})})})();
(function(){
  var cols=["#ff7a3d","#ffd23f","#14b8a6","#ffffff","#ff5a36","#7bd99a"];
  window.__boom=boom;
  function boom(v,x,y){
    for(var i=0;i<22;i++){
      var s=document.createElement("i");s.className="spk";
      var a=Math.random()*Math.PI*2,d=34+Math.random()*70;
      s.style.left=x+"px";s.style.top=y+"px";
      s.style.setProperty("--dx",Math.cos(a)*d+"px");s.style.setProperty("--dy",(Math.sin(a)*d-18)+"px");
      s.style.background=cols[i%cols.length];s.style.width=s.style.height=(4+Math.random()*6)+"px";
      if(i%3===0){s.className="spk star";s.textContent="✦";s.style.background="none";s.style.color=cols[i%cols.length];s.style.fontSize=(10+Math.random()*10)+"px";s.style.width=s.style.height="auto"}
      document.body.appendChild(s);setTimeout(function(el){return function(){el.remove()}}(s),900);
    }
    var r=document.createElement("i");r.className="spk ring";r.style.left=x+"px";r.style.top=y+"px";document.body.appendChild(r);setTimeout(function(){r.remove()},600);
    v.classList.add("boom");setTimeout(function(){v.classList.remove("boom")},1600);
  }
  document.querySelectorAll(".lane .v").forEach(function(v){
    var lane=v.parentNode,st=null,raf=0,dragged=false;
    v.style.touchAction="none";
    v.addEventListener("click",function(e){if(dragged){dragged=false;return}var r=v.getBoundingClientRect();boom(v,r.left+r.width/2,r.top+r.height/2)});
    function put(x,y){v.style.transform="translate3d("+x+"px,"+y+"px,0)"}
    function stop(){cancelAnimationFrame(raf);raf=0}
    function finish(){stop();v.style.animation="";v.style.animationDelay="0s";v.style.transform="";if(!document.querySelector(".lane .v.tossed"))lane.classList.remove("tossing");v.classList.remove("tossed");v.classList.remove("grab")}
    v.addEventListener("pointerdown",function(e){
      var m=new DOMMatrix(getComputedStyle(v).transform);
      st={sx:e.clientX,sy:e.clientY,ox:m.m41,oy:m.m42||0,x:m.m41,y:0,moved:false,vx:0,vy:0,lt:performance.now(),lx:e.clientX,ly:e.clientY,dur:parseFloat(getComputedStyle(v).animationDuration)||12};
      try{v.setPointerCapture(e.pointerId)}catch(x){}
    });
    v.addEventListener("pointermove",function(e){
      if(!st)return;var dx=e.clientX-st.sx,dy=e.clientY-st.sy;
      if(!st.moved){if(Math.abs(dx)+Math.abs(dy)<4)return;st.moved=true;dragged=true;stop();v.style.animation="none";lane.classList.add("tossing");v.classList.add("tossed","grab");if(window.__hv)0}
      var now=performance.now(),dt=Math.max(1,now-st.lt)/1000;
      st.vx=.6*st.vx+.4*((e.clientX-st.lx)/dt);st.vy=.6*st.vy+.4*((e.clientY-st.ly)/dt);st.lt=now;st.lx=e.clientX;st.ly=e.clientY;
      st.x=st.ox+dx;st.y=Math.max(-90,Math.min(0,dy));put(st.x,st.y);
    });
    function up(){
      if(!st)return;var s=st;st=null;v.classList.remove("grab");if(!s.moved)return;
      var w=v.offsetWidth,W=window.innerWidth,x=s.x,y=s.y,vx=Math.max(-2600,Math.min(2600,s.vx)),vy=Math.max(-1800,Math.min(1800,s.vy)),lt=performance.now(),rest=0,drive=false,spd=(W+100)/s.dur;
      function f(t){
        var dt=Math.min(.04,(t-lt)/1000);lt=t;
        if(drive){x+=spd*dt;put(x,0);if(x>W+10){finish();return}raf=requestAnimationFrame(f);return}
        vy+=2600*dt;y+=vy*dt;
        if(y>=0){y=0;if(vy>240){vy=-vy*.32;if(window.__fx){window.__fx.snd("bounce");window.__fx.vib(10)}}else vy=0;vx*=.88}
        if(y===0)vx*=Math.pow(.05,dt);
        x+=vx*dt;
        if(x<0){x=0;vx=-vx*.55}else if(x>W-w){x=W-w;vx=-vx*.55}
        put(x,y);
        if(y===0&&Math.abs(vx)<30&&Math.abs(vy)<5){rest+=dt;if(rest>.5)drive=true}else rest=0;
        raf=requestAnimationFrame(f);
      }
      raf=requestAnimationFrame(f);
    }
    v.addEventListener("pointerup",up);v.addEventListener("pointercancel",up);
  });
})();

(function(){
  if(window.__hb)cancelAnimationFrame(window.__hb);
  var bikes=[].slice.call(document.querySelectorAll(".rbike"));if(!bikes.length)return;
  var hint=document.querySelector(".scene .hint");
  var B=bikes.map(function(g){var n=g.getAttribute("data-p").match(/-?\d+\.?\d*/g).map(Number);return{g:g,p:n,d:+g.getAttribute("data-d")*1000,ph:(+g.getAttribute("data-t"))*1000,drag:false}});
  function pos(p,t){var u=1-t;return[u*u*p[0]+2*u*t*p[2]+t*t*p[4],u*u*p[1]+2*u*t*p[3]+t*t*p[5]]}
  function place(b,x,y){b.g.setAttribute("transform","translate("+x.toFixed(1)+" "+y.toFixed(1)+")")}
  function svgPt(b,e){var s=b.g.ownerSVGElement,pt=s.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(b.g.parentNode.getScreenCTM().inverse())}
  B.forEach(function(b){
    b.g.addEventListener("pointerdown",function(e){b.drag=true;b.g.classList.add("drag");try{b.g.setPointerCapture(e.pointerId)}catch(x){}if(hint)hint.classList.add("gone");e.preventDefault()});
    b.g.addEventListener("pointermove",function(e){if(!b.drag)return;var q=svgPt(b,e);place(b,q.x,q.y+14)});
    function up(e){if(!b.drag)return;b.drag=false;b.g.classList.remove("drag");var q=svgPt(b,e),best=0,bd=1e9;for(var i=0;i<=80;i++){var t=i/80,r=pos(b.p,t),dd=(r[0]-q.x)*(r[0]-q.x)+(r[1]-q.y)*(r[1]-q.y);if(dd<bd){bd=dd;best=t}}b.ph=best*b.d-performance.now()}
    b.g.addEventListener("pointerup",up);b.g.addEventListener("pointercancel",up);
  });
  function tick(now){B.forEach(function(b){if(b.drag)return;var t=((now+b.ph)%b.d)/b.d;if(t<0)t+=1;var r=pos(b.p,t);place(b,r[0],r[1])});__RF("__hb",tick)}
  __RF("__hb",tick);
})();

(function(){
  if(window.__tilt)cancelAnimationFrame(window.__tilt);
  var d=document.querySelector("svg.dio");if(!d)return;
  var reduce=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ry=0,rx=0,tx=0,ty=0,dragging=false,sx=0,sy=0,bx=0,by=0,last=0;
  d.addEventListener("pointerdown",function(e){if(e.target.closest&&e.target.closest(".rbike"))return;dragging=true;sx=e.clientX;sy=e.clientY;bx=tx;by=ty;try{d.setPointerCapture(e.pointerId)}catch(x){}var h=document.querySelector(".scene .hint");if(h)h.classList.add("gone")});
  d.addEventListener("pointermove",function(e){if(!dragging)return;tx=Math.max(-38,Math.min(38,bx+(e.clientX-sx)*.3));ty=Math.max(-22,Math.min(22,by-(e.clientY-sy)*.2))});
  function up(){dragging=false}
  d.addEventListener("pointerup",up);d.addEventListener("pointercancel",up);
  function tick(now){
    if(!dragging){tx*=.94;ty*=.94;if(!reduce){tx+=Math.sin(now/2600)*.12;ty+=Math.cos(now/3300)*.06}}
    ry+=(tx-ry)*.18;rx+=(ty-rx)*.18;
    d.style.transform="perspective(1300px) rotateY("+ry.toFixed(2)+"deg) rotateX("+rx.toFixed(2)+"deg)";
    __RF("__tilt",tick)}
  __RF("__tilt",tick);
})();

(function(){
  if(window.__globe)cancelAnimationFrame(window.__globe);
  var cv=document.querySelector("canvas.globe");if(!cv)return;
  var ctx=cv.getContext("2d");if(!ctx)return;
  var D=Math.PI/180,Rw=0,Rh=0;
  var LAND=[
   [[-168,66],[-162,70],[-140,70],[-125,70],[-95,72],[-82,70],[-80,63],[-93,58],[-85,55],[-80,52],[-78,58],[-65,60],[-62,55],[-56,52],[-66,45],[-70,42],[-76,38],[-76,34],[-81,31],[-80,26],[-82,29],[-86,30],[-90,29],[-97,27],[-97,21],[-92,18],[-88,21],[-87,16],[-83,15],[-83,10],[-78,8],[-80,8],[-86,12],[-92,15],[-97,16],[-105,20],[-106,23],[-112,29],[-110,23],[-115,30],[-118,34],[-122,37],[-124,43],[-124,48],[-130,54],[-137,58],[-148,60],[-155,58],[-165,55],[-158,58],[-165,63]],
   [[-55,60],[-45,60],[-20,70],[-18,78],[-30,83],[-60,82],[-72,78],[-58,70]],
   [[-78,8],[-72,12],[-62,10],[-52,5],[-50,0],[-35,-5],[-35,-10],[-39,-18],[-41,-22],[-48,-26],[-54,-34],[-58,-38],[-62,-40],[-65,-45],[-68,-52],[-70,-54],[-74,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0]],
   [[-17,21],[-16,28],[-10,32],[-6,36],[10,37],[11,33],[20,31],[32,31],[34,28],[38,20],[43,12],[51,12],[48,5],[40,-3],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[17,-30],[12,-17],[13,-8],[9,-1],[9,4],[5,5],[-4,5],[-8,4],[-13,8],[-17,14]],
   [[5,59],[5,62],[14,67],[22,70],[30,70],[28,66],[25,65],[22,63],[18,60],[16,56],[12,56],[10,59]],
   [[-9,37],[-9,43],[-1,44],[-4,48],[2,51],[8,54],[9,57],[11,54],[20,55],[24,59],[30,60],[34,66],[41,67],[44,68],[60,69],[68,73],[80,73],[105,78],[113,74],[140,72],[160,70],[180,68],[180,65],[177,62],[163,60],[156,51],[155,58],[143,59],[137,54],[141,50],[135,43],[130,42],[129,36],[126,35],[126,38],[125,40],[121,40],[118,38],[122,37],[120,34],[122,30],[120,26],[113,22],[108,21],[106,18],[109,12],[105,9],[100,13],[100,7],[103,2],[98,8],[98,16],[94,17],[92,22],[88,22],[80,15],[78,8],[73,16],[72,21],[67,24],[62,25],[57,26],[56,27],[51,28],[48,30],[50,26],[52,24],[56,25],[59,22],[52,16],[44,12],[43,15],[39,21],[35,28],[34,31],[36,34],[36,36],[30,36.5],[27,37],[26,38.5],[26,40],[23,40],[24,38],[22,36.5],[21,38],[19.5,41],[18,42.5],[15,45],[13,45.7],[12.3,44],[16,41],[18,40],[16,38],[15.7,38],[16,40],[12,42],[10,44],[7,43.5],[3,43],[3,42],[0,39],[-1,37],[-5,36]],
   [[131,31],[135,34],[140,36],[142,40],[141,45],[144,43],[140,41],[139,36],[135,33]],
   [[113,-22],[130,-12],[137,-12],[142,-11],[146,-19],[153,-27],[150,-37],[141,-38],[135,-34],[115,-34]],
   [[-6,50],[2,53],[-3,58],[-6,56],[-5,52]]
  ];
  var WATER=[[[28,41.2],[28,43],[30,45.5],[33,46],[35,45],[38,47],[40,43],[41.5,41.5],[37,41],[32,42],[29,41.2]],[[47,45],[50,46],[54,45],[53,40],[54,37],[50,37],[49,40],[47,43]],[[26.2,40.2],[26.8,40.55],[27.6,40.95],[28.5,41.0],[29.1,40.95],[29.9,40.75],[28.8,40.45],[27.6,40.3]]];
  var TR=[[26.0,41.7],[28.0,41.95],[29.1,41.25],[31,41.1],[33,42],[35,42],[36.5,41.3],[38,41],[41.5,41.5],[43.5,41.1],[44.8,39.7],[44,37.2],[42,37.1],[38,36.8],[36.7,36.8],[36.1,36],[35.5,36.6],[34.5,36.7],[32.5,36.1],[30.6,36.8],[29,36.5],[27.5,37],[27.2,38.4],[26.3,39.3],[26.1,40],[26,40.7]];
  
  
  var DETW=[
   [[27.5,40.97],[28.0,41.0],[28.25,41.07],[28.58,41.02],[28.77,40.99],[28.82,40.965],[28.87,40.97],[28.9,40.99],[28.95,41.0],[28.985,41.0155],[29.0,41.0],[29.02,40.99],[29.04,40.97],[29.09,40.95],[29.13,40.92],[29.185,40.89],[29.23,40.87],[29.3,40.82],[29.37,40.77],[29.5,40.76],[29.6,40.5],[28.0,40.3],[27.5,40.5]],
   [[27.6,42.0],[30.3,42.0],[30.3,41.22],[29.6,41.17],[29.3,41.2],[29.15,41.215],[29.113,41.237],[29.03,41.25],[28.67,41.34],[28.3,41.5],[27.6,41.7]],
   [[29.112,41.237],[29.103,41.205],[29.082,41.183],[29.058,41.168],[29.057,41.137],[29.067,41.108],[29.057,41.085],[29.043,41.077],[29.027,41.05],[29.007,41.043],[28.992,41.033],[28.975,41.022],[28.985,41.0155],[29.0,41.0],[29.005,41.015],[29.015,41.028],[29.06,41.053],[29.064,41.1],[29.1,41.13],[29.085,41.175],[29.14,41.2],[29.15,41.215]],
   [[28.985,41.0155],[28.968,41.024],[28.945,41.037],[28.93,41.055],[28.925,41.062],[28.936,41.062],[28.952,41.047],[28.975,41.031],[28.992,41.02]]
  ];
  var ISL=[[[29.105,40.87],[29.13,40.885],[29.145,40.865],[29.12,40.852]],[[29.085,40.882],[29.1,40.89],[29.105,40.876],[29.09,40.872]]];
  var GREEN=[[[28.92,41.2],[29.0,41.215],[29.02,41.16],[28.95,41.13]],[[29.2,40.99],[29.3,41.02],[29.32,40.95],[29.24,40.93]]];
  var DIST=[["Esenyurt",28.67,41.03,-1],["Bakırköy",28.87,40.975,1],["Eminönü",28.972,41.017,1],["Şişli",28.99,41.075,-1],["Kadıköy",29.03,40.99,1],["Ataşehir",29.12,40.995,-1],["Pendik",29.23,40.875,1],["Gebze",29.43,40.8,1]];
  function dpt(n){for(var i=0;i<DIST.length;i++)if(DIST[i][0]==n)return[DIST[i][1],DIST[i][2]];for(i=0;i<SEMTS.length;i++)if(SEMTS[i][0]==n)return[SEMTS[i][1],SEMTS[i][2]];var g=GEO[n];return g?[g.lon,g.lat]:null}
  var E5=[[28.6,41.0],[28.72,40.985],[28.85,40.99],[28.93,41.01],[28.96,41.045],[28.99,41.067],[29.0345,41.0475],[29.0405,41.0425],[29.05,41.025],[29.1,40.985],[29.18,40.9],[29.23,40.875],[29.3,40.825],[29.43,40.8]];
  var TEM=[[28.62,41.1],[28.78,41.075],[28.93,41.075],[29.0,41.09],[29.0625,41.092],[29.075,41.095],[29.14,41.05],[29.2,41.0],[29.3,40.9],[29.4,40.82]];
  var YSS=[[28.7,41.22],[28.95,41.2],[29.114,41.205],[29.135,41.2],[29.25,41.12],[29.38,41.0],[29.45,40.85]];
  var GAL=[[28.972,41.0172],[28.9755,41.0238]];
  var ROADS=[E5,TEM,YSS];
  var BRIDGES=[["15 Temmuz Şehitler Köprüsü",29.0375,41.045,1],["Fatih Sultan Mehmet Köprüsü",29.069,41.093,1],["Yavuz Sultan Selim Köprüsü",29.125,41.203,-1],["Galata Köprüsü",28.974,41.0205,-1]];
  var VEH=["🚗","🚕","🚌","🚚"];
  var CARS=[];ROADS.forEach(function(r,i){for(var k=0;k<2;k++)CARS.push({r:r,t:(k/2+i*.2)%1,sp:.000026+.000006*i,e:VEH[(i*2+k)%VEH.length],d:k?1:-1})});
  var BOATS=[{p:[[29.1,41.2],[29.06,41.12],[29.0,41.01]],t:0,sp:.00002,e:"⛴️"},{p:[[28.3,40.93],[28.8,40.9],[29.15,40.8]],t:.3,sp:.000015,e:"⛵"}];
  function along(P,t){var L=[0],i;for(i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));var d=Math.max(0,Math.min(1,t))*L[L.length-1];for(i=1;i<P.length;i++)if(d<=L[i]){var u=(d-L[i-1])/(L[i]-L[i-1]||1);return[P[i-1][0]+(P[i][0]-P[i-1][0])*u,P[i-1][1]+(P[i][1]-P[i-1][1])*u,P[i][0]-P[i-1][0]]}return[P[P.length-1][0],P[P.length-1][1],1]}
  var BK=[
   {p:[[28.67,41.03],[28.8,41.05],[28.93,41.075],[28.99,41.075]],T:12000,off:0},
   {p:[[28.99,41.075],[29.0,41.06],[29.0345,41.0475],[29.0405,41.0425],[29.06,41.03],[29.12,40.995]],T:13500,off:4000},
   {p:[[29.03,40.99],[29.1,40.978],[29.2,40.9],[29.3,40.83],[29.43,40.8]],T:15000,off:2500},
   {p:[[28.87,40.975],[28.94,41.005],[28.972,41.0172],[28.9755,41.0238],[28.99,41.05],[28.99,41.075]],T:11000,off:5000}];
  var SEMTS=[["Taksim",28.985,41.037],["Levent",29.01,41.082],["Maslak",29.02,41.112],["Nişantaşı",28.995,41.05],["Sultanahmet",28.977,41.006],["Ortaköy",29.027,41.047],["Bebek",29.043,41.077],["Altunizade",29.04,41.022],["Moda",29.025,40.978],["Kozyatağı",29.09,40.975],["Bostancı",29.095,40.953],["Suadiye",29.07,40.96]];
  var MSG0=[["Kadıköy",_t("Aa, ne çabuk geldiniz! 😍")],["Gebze",_t("Teslim edildi Dilek Hanım ✅")],["Sarıyer",_t("Murat Bey: Tam zamanında geldi, çok teşekkür ederim 🙏")],["Şişli",_t("Teslim edildi Ayşe Hanım ✅")],["Ataşehir",_t("Teşekkürler, eline sağlık 🙏")],["Bakırköy",_t("Paketiniz yolda 🛵")],["Esenyurt",_t("Harika hizmet, sağ olun 👏")],["Beşiktaş",_t("Teslim edildi Kemal Bey ✅")],["Üsküdar",_t("Zehra Hanım: Çok hızlıydı, sağ olun 😊")],["Pendik",_t("Teslim edildi Selin Hanım ✅")],["Maltepe",_t("Siparişiniz alındı, kurye yola çıktı 🏍️")],["Ümraniye",_t("Tam zamanında, teşekkürler! 🙌")],["Fatih",_t("Evrak elimde, teşekkürler 📄")],["Kağıthane",_t("Teslim edildi Elif Hanım ✅")],["Beykoz",_t("İlaçlar ulaştı, çok sağ olun 💊")],["Kartal",_t("Teslim edildi Hasan Bey ✅")],["Tuzla",_t("Teslim edildi Murat Bey ✅")],["Zeytinburnu",_t("Kurye yola çıktı 🛵")],["Beyoğlu",_t("Hızlı ve güleryüzlü, tavsiye ederim 👍")],["Levent",_t("Ofise tam saatinde ulaştı, sağ olun 👏")]];
  var MSG=MSG0.slice().sort(function(){return Math.random()-.5});
  var GEO=(window.K360&&window.K360.D)||{};
  var PAL=["#8fb8c9","#a6c4d0","#9bb0d6","#b7c9d4","#88a9bd"];var BLD=[];
  [[29.012,41.080,7],[29.018,41.086,5],[29.006,41.076,5],[29.022,41.074,4],[29.02,41.108,5],[29.027,41.113,4],[29.013,41.111,4],[29.11,40.99,5],[29.118,40.995,6],[29.124,40.988,4],[29.13,40.995,4],[29.09,40.972,3],[28.99,41.063,3],[28.996,41.068,4],[29.03,40.99,2],[28.875,40.978,2],[29.0,41.045,2],[29.04,41.02,2]].forEach(function(c,i){for(var k=0;k<c[2];k++){var hh=Math.abs(Math.sin((i*7+k)*12.9898)*43758.5453)%1;BLD.push([c[0]+(k%3)*.0055-.005+(hh-.5)*.002,c[1]+Math.floor(k/3)*.0045+(hh-.5)*.002,8+Math.floor(hh*4),12+Math.floor(hh*16),PAL[(i+k)%PAL.length]])}});
  var IST=[29.1,40.97];
  var tgt=null,CIT=(window.K360&&window.K360.CITIES)||[],ARCN=["Ankara","Izmir","Bursa","Sakarya","Tekirdag","Edirne","Antalya","Samsun","Konya","Mugla"],zf=1,zt=1,PTS={},pd0=0,R0=1,PXD=700,Z=1,lam=IST[0],phi=IST[1],drag=false,bd=null,lx=0,ly=0,W=0,H=0,R=0,Rd=0,cx=0,cy=0,dpr=1,hint=true,mx=0,my=0;
  function size(){var r=cv.getBoundingClientRect();dpr=Math.min(r.width<760?1.1:2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;var m=W<760;Rd=R0=Math.min(W,H)*(m?.42:.37);PXD=m?720:1000;cx=W*(m?.5:.745);cy=H*(m?.5:.54);Rw=m?W/2-8:Math.min(W*.24,Rd*1.55);Rh=Rd*(m?1.12:1.05);Z=PXD*57.2958/R0;R=PXD*57.2958*zf;if(typeof place==="function")place()}
  size();window.addEventListener("resize",size);
  function pr(lo,la){var l=(lo-lam)*D,f=la*D,p0=phi*D,c=Math.sin(p0)*Math.sin(f)+Math.cos(p0)*Math.cos(f)*Math.cos(l);return[cx+R*Math.cos(f)*Math.sin(l),cy-R*(Math.cos(p0)*Math.sin(f)-Math.sin(p0)*Math.cos(f)*Math.cos(l)),c]}
  function poly(P,fill,stroke,lw){ctx.beginPath();P.forEach(function(q,i){var a=pr(q[0],q[1]);i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1])});ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lw||1.2;ctx.lineJoin="round";ctx.stroke()}}
  function line(P,w,col){ctx.beginPath();P.forEach(function(q,i){var a=pr(q[0],q[1]);i?ctx.lineTo(a[0],a[1]):ctx.moveTo(a[0],a[1])});ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineJoin="round";ctx.lineCap="round";ctx.stroke()}
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
  function halo(t,x,y,f){ctx.font="700 "+f+"px Inter,system-ui,sans-serif";ctx.lineWidth=3;ctx.strokeStyle="rgba(255,255,255,.95)";ctx.strokeText(t,x,y);ctx.fillStyle="#0f3d3e";ctx.fillText(t,x,y)}
  function bpos(b,t){var q=along(b.p,t),a=pr(q[0],q[1]);return[a[0],a[1],q[2]]}
  function local(e){var r=cv.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]}
  function zbtn(){var x=cx-Rw+30,y=cy-Rh+38;return[[x,y,1],[x,y+44,-1],[x,y+88,0]]}
  function zstep(d){zt=Math.max(.03,Math.min(3.5,zt*(d>0?1.5:1/1.5)))}
  
  function down(e){var p=local(e);hint=false;PTS[e.pointerId]=p;var nz=Object.keys(PTS).length;if(nz==2){var k=Object.keys(PTS),a=PTS[k[0]],b2=PTS[k[1]];pd0=Math.hypot(a[0]-b2[0],a[1]-b2[1]);drag=false;bd=null;return}
    var zb=zbtn();for(var zi=0;zi<3;zi++)if(Math.hypot(p[0]-zb[zi][0],p[1]-zb[zi][1])<22){if(zb[zi][2]===0){if(zt>.2){tgt=[35.2,39.3];zt=.034}else{tgt=[IST[0],IST[1]];zt=1}}else zstep(zb[zi][2]);return}
    bd=null;for(var i=0;i<BK.length;i++){var b=BK[i];if(b.sx!=null&&Math.hypot(b.sx-p[0],b.sy-p[1])<36){bd=b;break}}
    if(bd){bd.drag=true;mx=p[0];my=p[1];e.preventDefault()}else{drag=true;lx=e.clientX;ly=e.clientY}try{e.currentTarget.setPointerCapture(e.pointerId)}catch(x){}}
  function move(e){var p=local(e);if(PTS[e.pointerId])PTS[e.pointerId]=p;var ks=Object.keys(PTS);if(ks.length==2){var a=PTS[ks[0]],b2=PTS[ks[1]],d=Math.hypot(a[0]-b2[0],a[1]-b2[1]);if(pd0>0&&d>0){zt=Math.max(.03,Math.min(3.5,zt*d/pd0));pd0=d}return}
    if(bd){mx=p[0];my=p[1];return}if(!drag)return;var dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;var k=57.2958/R;lam=Math.max(23,Math.min(47,lam-dx*k/Math.cos(phi*D)));phi=Math.max(34,Math.min(43,phi+dy*k));tgt=null}
  function up(e){if(e&&e.pointerId!=null){delete PTS[e.pointerId];pd0=0}if(bd){var b=bd,best=0,bdist=1e9;for(var i=0;i<=120;i++){var t=i/120,q=bpos(b,t),dd=Math.hypot(q[0]-mx,q[1]-my);if(dd<bdist){bdist=dd;best=t}}b.off=best*b.T-performance.now();b.drag=false;bd=null}drag=false}
  var gh=null,gb=null;function out(x,y,m){return Math.abs(x-cx)>Rw-m||Math.abs(y-cy)>Rh-m}
  function place(){if(!gh)return;var ox=cv.offsetLeft,oy=cv.offsetTop;gh.style.cssText="position:absolute;z-index:2;touch-action:none;cursor:grab;border-radius:26px;left:"+(ox+cx-Rw)+"px;top:"+(oy+cy-Rh)+"px;width:"+(Rw*2)+"px;height:"+(Rh*2)+"px;-webkit-tap-highlight-color:transparent";
    var zb=zbtn();gb.style.cssText="position:absolute;z-index:2;touch-action:none;left:"+(ox+zb[0][0]-24)+"px;top:"+(oy+zb[0][1]-24)+"px;width:48px;height:"+(zb[2][1]-zb[0][1]+48)+"px"}
  gh=document.createElement("div");gb=document.createElement("div");gh.className="gh";gb.className="gb";cv.parentNode.insertBefore(gh,cv.nextSibling);cv.parentNode.insertBefore(gb,gh.nextSibling);
  [gh,gb].forEach(function(el){el.addEventListener("pointerdown",down);el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up);el.addEventListener("wheel",function(e){e.preventDefault();zt=Math.max(.03,Math.min(3.5,zt*(e.deltaY<0?1.15:1/1.15)))},{passive:false})});
  place();window.addEventListener("resize",place);
  var gt=0;
  var gvis=true,glast=0,low=(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=6),gint=low?48:34;
  if("IntersectionObserver" in window)new IntersectionObserver(function(e){gvis=e[0].isIntersecting},{threshold:0}).observe(cv);
  function frame(now){
    if(!gvis||(now-glast<gint&&!drag&&!bd)){__RF("__globe",frame);return}glast=now;
    var dt=Math.min(100,now-(gt||now));gt=now;if(tgt){var e2=1-Math.exp(-dt/260);lam+=(tgt[0]-lam)*e2;phi+=(tgt[1]-phi)*e2}zf+=(zt-zf)*(1-Math.exp(-dt/140));R=PXD*57.2958*zf;
    
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,W,H);
    ctx.save();rr(cx-Rw-5,cy-Rh-5,Rw*2+10,Rh*2+10,31);ctx.fillStyle="rgba(255,255,255,.85)";ctx.fill();ctx.restore();
    ctx.save();rr(cx-Rw,cy-Rh,Rw*2,Rh*2,26);ctx.clip();
    ctx.fillStyle="#7fd3c6";ctx.fillRect(0,0,W,H);var far=zf<.4;if(zf<.4){LAND.forEach(function(P){poly(P,"#fdebd0","rgba(255,255,255,.9)",1)});WATER.slice(0,2).forEach(function(P){poly(P,"#7fd3c6","rgba(255,255,255,.9)",1)})}
    poly(TR,"#fdebd0",far?"#ff8a3d":null,1.6);
    GREEN.forEach(function(P){poly(P,"rgba(150,205,140,.55)")});
    DETW.forEach(function(P){poly(P,"#7fd3c6")});
    DETW.forEach(function(P,i){if(i>0||true)poly(P,null,"rgba(255,255,255,.9)",1.6)});
    ISL.forEach(function(P){poly(P,"#fdebd0","rgba(255,255,255,.9)",1.4)});
    if(!far){ROADS.forEach(function(r){line(r,8,"#f3c38f");line(r,5,"#fffaf0")});
    line(GAL,7,"#f3c38f");line(GAL,4,"#fffaf0")}
    ctx.textAlign="center";
    ctx.font="italic 600 13px Inter,system-ui,sans-serif";ctx.fillStyle="rgba(255,255,255,.85)";
    var kk=pr(29.35,41.3);ctx.fillText("Karadeniz",kk[0],kk[1]);var mm=pr(28.7,40.78);ctx.fillText("Marmara Denizi",mm[0],mm[1]);
    var sh=ctx.createRadialGradient(cx-Rd*.3,cy-Rd*.35,Rd*.2,cx,cy,Rd*1.05);sh.addColorStop(0,"rgba(255,255,255,.1)");sh.addColorStop(.75,"rgba(255,255,255,0)");sh.addColorStop(1,"rgba(10,60,70,.22)");ctx.fillStyle=sh;ctx.fillRect(0,0,W,H);
    var fs=Math.max(11,Math.min(Rd*.045,13));
    if(!far){
    BK.forEach(function(b){ctx.setLineDash([6,6]);line(b.p,2.2,"rgba(255,122,40,.9)");ctx.setLineDash([])});
    ctx.textBaseline="middle";ctx.font="17px 'Noto Color Emoji',sans-serif";
    CARS.forEach(function(c){var u=((now*c.sp+c.t)%1+1)%1;if(c.d<0)u=1-u;var q=along(c.r,u),a=pr(q[0],q[1]);ctx.save();ctx.translate(a[0],a[1]);ctx.scale((q[2]*c.d)>0?-1:1,1);ctx.fillText(c.e,0,0);ctx.restore()});
    ctx.font="24px 'Noto Color Emoji',sans-serif";BOATS.forEach(function(c){var u=(now*c.sp+c.t)%2;u=u>1?2-u:u;var q=along(c.p,u),a=pr(q[0],q[1]);ctx.fillText(c.e,a[0],a[1])});ctx.textBaseline="alphabetic";
    var BIG={Esenyurt:1,Bakırköy:1,Şişli:1,Kadıköy:1,Ataşehir:1,Pendik:1,Gebze:1};
    ctx.textAlign="center";
    BLD.forEach(function(c){var a=pr(c[0],c[1]);c.sy=a[1]});
    BLD.slice().sort(function(x,y){return x.sy-y.sy}).forEach(function(c){var a=pr(c[0],c[1]),w=c[2],h=c[3],x=a[0]-w/2,y=a[1]-h;ctx.fillStyle=c[4];ctx.fillRect(x,y,w,h);ctx.fillStyle="rgba(0,0,0,.18)";ctx.beginPath();ctx.moveTo(x+w,y);ctx.lineTo(x+w+5,y-3);ctx.lineTo(x+w+5,y+h-3);ctx.lineTo(x+w,y+h);ctx.fill();ctx.fillStyle="rgba(255,255,255,.55)";ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+5,y-3);ctx.lineTo(x+w+5,y-3);ctx.lineTo(x+w,y);ctx.fill();ctx.fillStyle="rgba(255,255,255,.55)";for(var wy=y+4;wy<y+h-3;wy+=5)ctx.fillRect(x+2,wy,w-4,1.4)});
    ctx.font="800 9px Inter,system-ui,sans-serif";
    for(var gn in GEO){if(BIG[gn])continue;var g2=GEO[gn],ga=pr(g2.lon,g2.lat);if(out(ga[0],ga[1],10))continue;ctx.fillStyle="#ff8a3d";ctx.beginPath();ctx.arc(ga[0],ga[1],2.2,0,7);ctx.fill();ctx.lineWidth=2.6;ctx.strokeStyle="rgba(255,255,255,.95)";ctx.strokeText(gn,ga[0],ga[1]+11);ctx.fillStyle="#34585a";ctx.fillText(gn,ga[0],ga[1]+11)}
    ctx.font="600 8px Inter,system-ui,sans-serif";
    SEMTS.forEach(function(t){var ga=pr(t[1],t[2]);if(out(ga[0],ga[1],10))return;ctx.lineWidth=2.4;ctx.strokeStyle="rgba(255,255,255,.9)";ctx.strokeText(t[0],ga[0],ga[1]+9);ctx.fillStyle="#6b8584";ctx.fillText(t[0],ga[0],ga[1]+9)});
    ctx.textBaseline="middle";ctx.font="20px 'Noto Color Emoji',sans-serif";[["🕌",28.977,41.0045],["🗼",28.9742,41.0262],["🏰",29.0041,41.0212]].forEach(function(l){var a=pr(l[1],l[2]);ctx.fillText(l[0],a[0],a[1]-8)});ctx.textBaseline="alphabetic";
    if(W>=760)BRIDGES.forEach(function(b){var a=pr(b[1],b[2]);ctx.textAlign=b[3]>0?"left":"right";halo(b[0],a[0]+b[3]*10,a[1]+(b[0][0]=="G"?18:4),fs-1)});ctx.textAlign="center";
    DIST.forEach(function(c){var q=pr(c[1],c[2]);ctx.fillStyle="#0f3d3e";ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(q[0],q[1],4.5,0,7);ctx.fill();ctx.stroke();ctx.font="800 "+fs+"px Inter,system-ui,sans-serif";var tw=ctx.measureText(c[0]).width+12;var oy=c[3]>0?8:-8-(fs+7);ctx.fillStyle="rgba(255,255,255,.93)";rr(q[0]-tw/2,q[1]+oy,tw,fs+7,(fs+7)/2);ctx.fill();ctx.fillStyle="#0f3d3e";ctx.fillText(c[0],q[0],q[1]+oy+fs+.5)});
    BK.forEach(function(b){var q;if(b.drag){q=[mx,my-14,1];b.fw=true}else{var u=((now+b.off)%(b.T*2)+b.T*2)%(b.T*2)/b.T,fw=u<1,t=fw?u:2-u;q=bpos(b,t);b.fw=fw}
      b.sx=q[0];b.sy=q[1];var dir=q[2]*(b.fw===false?-1:1);
      ctx.save();ctx.translate(q[0],q[1]-14);ctx.scale(dir>0?-1:1,1);if(b.drag){ctx.shadowColor="rgba(0,0,0,.35)";ctx.shadowBlur=12}ctx.font="38px 'Noto Color Emoji',sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText("🏍️",0,0);ctx.restore()});
    var step=Math.floor(now/4500),ph=(now%4500)/4500,al=ph<.1?ph/.1:ph>.88?(1-ph)/.12:1,mg=null,q3=null;
    for(var tr=0;tr<MSG.length;tr++){var m1=MSG[(step+tr)%MSG.length],pp=dpt(m1[0]);if(!pp)continue;var qq=pr(pp[0],pp[1]);if(!out(qq[0],qq[1],28)){mg=m1;q3=qq;break}}
    if(mg&&al>0){ctx.globalAlpha=al;ctx.font="700 "+fs+"px Inter,system-ui,sans-serif";ctx.textAlign="center";ctx.textBaseline="alphabetic";var tw2=ctx.measureText(mg[1]).width+22,bh=fs+16,bx=Math.min(Math.max(q3[0]-tw2/2,cx-Rw+8),cx+Rw-tw2-8),by=q3[1]-bh-26-ph*6;ctx.strokeStyle="#0d9488";ctx.fillStyle="#0d9488";ctx.beginPath();ctx.moveTo(q3[0],q3[1]-4);ctx.lineTo(q3[0]-6,by+bh-1);ctx.lineTo(q3[0]+6,by+bh-1);ctx.fill();ctx.fillStyle="#fff";ctx.lineWidth=2;rr(bx,by,tw2,bh,bh/2);ctx.fill();ctx.stroke();ctx.fillStyle="#0f3d3e";ctx.fillText(mg[1],bx+tw2/2,by+bh/2+4);ctx.globalAlpha=1}
    }else{
      BK.forEach(function(b){b.sx=null});
      var A0=pr(IST[0],IST[1]);ctx.textAlign="center";
      ARCN.forEach(function(id,i){var c=null;CIT.forEach(function(x){if(x[0]==id)c=x});if(!c)return;var B0=pr(c[2],c[3]),dd=Math.hypot(B0[0]-A0[0],B0[1]-A0[1]),lf=dd*.22;
        function ap(t){return[A0[0]+(B0[0]-A0[0])*t,A0[1]+(B0[1]-A0[1])*t-Math.sin(t*Math.PI)*lf]}
        ctx.setLineDash([5,5]);ctx.strokeStyle="rgba(255,122,40,.9)";ctx.lineWidth=1.8;ctx.beginPath();for(var k2=0;k2<=24;k2++){var q=ap(k2/24);k2?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])}ctx.stroke();ctx.setLineDash([]);
        var TT=16000+i*1700,u=((now+i*2300)%(TT*2))/TT,fw=u<1,t2=fw?u:2-u,q2=ap(t2),q3=ap(Math.min(1,t2+.01)),dx2=(q3[0]-q2[0])*(fw?1:-1);
        ctx.save();ctx.translate(q2[0],q2[1]-8);ctx.scale(dx2>0?-1:1,1);ctx.font="22px 'Noto Color Emoji',sans-serif";ctx.textBaseline="middle";ctx.fillText("🏍️",0,0);ctx.restore();ctx.textBaseline="alphabetic"});
      ctx.font="800 10px Inter,system-ui,sans-serif";
      CIT.forEach(function(c){var a=pr(c[2],c[3]);if(out(a[0],a[1],6))return;ctx.fillStyle="#0f3d3e";ctx.strokeStyle="#fff";ctx.lineWidth=2;ctx.beginPath();ctx.arc(a[0],a[1],3.6,0,7);ctx.fill();ctx.stroke();var nm=c[1].split(" (")[0];ctx.lineWidth=3;ctx.strokeStyle="rgba(255,255,255,.95)";ctx.strokeText(nm,a[0],a[1]+13);ctx.fillStyle="#0f3d3e";ctx.fillText(nm,a[0],a[1]+13)});
      ctx.fillStyle="#ff6a1a";ctx.strokeStyle="#fff";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(A0[0],A0[1],6,0,7);ctx.fill();ctx.stroke();ctx.font="800 12px Inter,system-ui,sans-serif";var iw=ctx.measureText("İstanbul").width+14;ctx.fillStyle="#0f3d3e";rr(A0[0]-iw/2,A0[1]-30,iw,20,10);ctx.fill();ctx.fillStyle="#fff";ctx.fillText("İstanbul",A0[0],A0[1]-16);
    }
    ctx.restore();
    ctx.strokeStyle="rgba(255,255,255,.95)";ctx.lineWidth=3;rr(cx-Rw,cy-Rh,Rw*2,Rh*2,26);ctx.stroke();
    zbtn().forEach(function(z){ctx.fillStyle="#fff";ctx.strokeStyle="#0d9488";ctx.lineWidth=2;ctx.beginPath();ctx.arc(z[0],z[1],19,0,7);ctx.fill();ctx.stroke();ctx.strokeStyle="#0f3d3e";ctx.lineWidth=3;ctx.lineCap="round";ctx.beginPath();if(z[2]===0){ctx.fillStyle="#0f3d3e";ctx.font="800 11px Inter,system-ui,sans-serif";ctx.textAlign="center";ctx.fillText(zt>.2?"TR":"İST",z[0],z[1]+4)}else{ctx.moveTo(z[0]-7,z[1]);ctx.lineTo(z[0]+7,z[1]);if(z[2]>0){ctx.moveTo(z[0],z[1]-7);ctx.lineTo(z[0],z[1]+7)}ctx.stroke()}});
    
    __RF("__globe",frame);
  }
  __RF("__globe",frame);
})();

(function(){
  var calc=document.querySelector(".calc");if(!calc)return;var b=document.body,t=0;
  function on(){clearTimeout(t);b.classList.add("calcing")}
  function off(){clearTimeout(t);t=setTimeout(function(){if(!calc.contains(document.activeElement))b.classList.remove("calcing")},250)}
  calc.addEventListener("focusin",function(e){if(!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)||b.classList.contains("lane-gone"))return;var vs=document.querySelectorAll(".lane .v");if(!vs.length||!window.__boom){b.classList.add("lane-gone");return}
    vs.forEach(function(v,i){var r=v.getBoundingClientRect();if(r.right<0||r.left>innerWidth)return;setTimeout(function(){window.__boom(v,r.left+r.width/2,r.top+r.height/2)},i*70)});
    setTimeout(function(){b.classList.add("lane-gone")},560)});
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(e){if(!e[0].isIntersecting){b.classList.remove("lane-gone");b.classList.remove("calcing")}},{threshold:0}).observe(calc);
    var hero=document.querySelector(".hero.full");if(hero)new IntersectionObserver(function(e){b.classList.toggle("inhero",e[0].intersectionRatio>.25)},{threshold:[0,.25,.5]}).observe(hero)}
})();

;(function(){var tcs=document.querySelectorAll(".trust .tc");if(!tcs.length)return;
 tcs.forEach(function(a){var h=a.querySelector("i"),sx=0,max=1,on=false,p=0,done=false;
  function go(){done=true;a.style.setProperty("--p",1);a.style.setProperty("--x",max+"px");var u=a.getAttribute("href");setTimeout(function(){a.click();setTimeout(function(){done=false;a.style.setProperty("--p",0);a.style.setProperty("--x","0px")},700)},180)}
  a.addEventListener("pointerdown",function(e){if(done)return;a.classList.add("used");on=true;sx=e.clientX;max=Math.max(1,a.clientWidth-h.offsetWidth-11);p=0;a.classList.add("drag");try{a.setPointerCapture(e.pointerId)}catch(_){}});
  a.addEventListener("pointermove",function(e){if(!on)return;var dx=Math.max(0,Math.min(max,e.clientX-sx));p=dx/max;a.style.setProperty("--x",dx+"px");a.style.setProperty("--p",(dx+h.offsetWidth)/a.clientWidth)});
  function end(){if(!on)return;on=false;a.classList.remove("drag");if(p>.82){go()}else{a.style.setProperty("--x","0px");a.style.setProperty("--p",0)}}
  a.addEventListener("pointerup",end);a.addEventListener("pointercancel",end);
  a.addEventListener("click",function(e){if(e.detail===0)return;e.preventDefault();if(p<=.82&&!done){a.classList.remove("hint");void a.offsetWidth;a.classList.add("hint")}});
  a.addEventListener("dragstart",function(e){e.preventDefault()});
 })})();
;(function(){var t,B=document.body;function isF(e){return e&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName)&&!/^(button|submit|checkbox|radio|range)$/.test(e.type||"")}
 document.addEventListener("focusin",function(e){if(isF(e.target)){clearTimeout(t);B.classList.add("typing")}});
 document.addEventListener("focusout",function(){clearTimeout(t);t=setTimeout(function(){if(!isF(document.activeElement)){B.classList.remove("typing");B.classList.remove("lane-gone")}},250)})})();
;(function(){var v=document.querySelectorAll("svg.xvid");if(!v.length)return;
 if(!("IntersectionObserver" in window)){v.forEach(function(e){e.classList.add("play")});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("play",e.isIntersecting&&e.intersectionRatio>=.55)})},{threshold:[0,.55,1]});
 v.forEach(function(e){io.observe(e)})})();
;(function(){var q=document.querySelectorAll(".scene,.pic,.trust,.tick,.abone-strip,.stat,.feat");if(!q.length)return;
 if(!("IntersectionObserver" in window))return;
 var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("vis",e.isIntersecting)})},{threshold:0.05,rootMargin:"40px"});
 q.forEach(function(e){e.setAttribute("data-g","");io.observe(e)})})();
;(function(){var b=document.getElementById("calcBtn"),d=document.getElementById("moreopt");if(!b||!d)return;
 b.addEventListener("click",function(){setTimeout(function(){var e=document.getElementById("cerr");if(e&&e.textContent.trim())d.open=true},60)})})();

;(function(){var calc=document.querySelector(".calc"),res=document.getElementById("result");if(!calc||!res)return;var B=document.body;
 function busy(on){B.classList.toggle("busy",on)}
 function isIn(e){return e&&/^(INPUT|TEXTAREA)$/.test(e.tagName)&&e.type!=="button"}
 calc.addEventListener("focusin",function(e){if(isIn(e.target)&&!e.target.closest("#result"))busy(true)});
 document.addEventListener("pointerdown",function(e){if(!calc.contains(e.target))busy(false)},true);
 if("MutationObserver" in window)new MutationObserver(function(){if(res.style.display==="block")busy(false)}).observe(res,{attributes:true,attributeFilter:["style"]});
 if("IntersectionObserver" in window)new IntersectionObserver(function(e){if(!e[0].isIntersecting)busy(false)},{threshold:0}).observe(calc)})();

/* ===== FX: tema, ses, titreşim ===== */
(function(){
  if(!window.__fx){
    var on=true,t="light",ac=null;
    try{on=localStorage.getItem("k360fx")!=="0";t=localStorage.getItem("k360th")||"light"}catch(e){}
    var fx={};
    fx.label=function(){var a=document.getElementById("fxTheme"),b=document.getElementById("fxSound");if(a)a.textContent=t==="dark"?"☀️ Aydınlık mod":_t("🌙 Karanlık mod");if(b)b.textContent=on?"🔊 Ses ve titreşim: Açık":_t("🔇 Ses ve titreşim: Kapalı")};
    fx.theme=function(){document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name=theme-color]');if(m)m.content=t==="dark"?"#178f8a":"#21b3ad";fx.label()};
    fx.set=function(v){t=v;try{localStorage.setItem("k360th",t)}catch(e){}fx.theme()};
    fx.vib=function(n){if(on&&navigator.vibrate)try{navigator.vibrate(n||8)}catch(e){}};
    fx.snd=function(k){if(!on)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();var q={tap:[[660,.05]],ok:[[660,.08],[880,.14]],bounce:[[200,.07]],pop:[[520,.05],[720,.08]],bad:[[180,.16]]}[k]||[],t0=ac.currentTime;q.forEach(function(s,i){var o=ac.createOscillator(),g=ac.createGain(),st=t0+i*.09;o.type="sine";o.frequency.value=s[0];g.gain.setValueAtTime(.0001,st);g.gain.exponentialRampToValueAtTime(.07,st+.012);g.gain.exponentialRampToValueAtTime(.0001,st+s[1]);o.connect(g);g.connect(ac.destination);o.start(st);o.stop(st+s[1]+.03)})}catch(e){}};
    document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest("#fxTheme,#fxSound");
      if(el){if(el.id==="fxTheme"){t=t==="dark"?"light":"dark";try{localStorage.setItem("k360th",t)}catch(x){}fx.theme()}else{on=!on;try{localStorage.setItem("k360fx",on?"1":"0")}catch(x){}fx.label();if(on){fx.vib(15);fx.snd("pop")}}return}
      var b=e.target.closest&&e.target.closest("button,.btn,.mt,.mp,.bar a,.fab");
      if(b){fx.vib(8);if(b.id==="calcBtn")setTimeout(function(){fx.snd("ok")},400);else if(/wa\.me/.test(b.href||""))fx.snd("pop")}
    },true);
    window.__fx=fx;
  }
  window.__fx.theme();
})();

/* ===== Kendiliğinden oynayan tanıtım ===== */
(function(){
  var s=document.querySelector("[data-story]");if(!s)return;
  var path=s.querySelector(".sp"),dn=s.querySelector(".spd"),moto=s.querySelector(".smoto"),nodes=[].slice.call(s.querySelectorAll(".sn")),dots=[].slice.call(s.querySelectorAll(".sdots i")),sx=s.querySelector(".sx"),
  L=path.getTotalLength(),ST=JSON.parse(s.getAttribute("data-steps")),N=nodes.length,HOLD=2600,MOVE=1100,cur=-1,raf=0,pos=0,from=0,to=0,tm=0,pause=0;
  nodes.forEach(function(n,i){var p=path.getPointAtLength(L*i/(N-1));n.setAttribute("transform","translate("+p.x.toFixed(1)+" "+p.y.toFixed(1)+")");n.style.cursor="pointer";n.addEventListener("click",function(){go(i,true)})});
  dn.style.strokeDasharray=L;
  function draw(p){var pt=path.getPointAtLength(L*p);moto.setAttribute("transform","translate("+(pt.x-16).toFixed(1)+" "+(pt.y+10).toFixed(1)+")");dn.style.strokeDashoffset=L*(1-p)}
  function text(i){sx.classList.add("sw");setTimeout(function(){sx.innerHTML="<b>"+ST[i][0]+"</b><p>"+ST[i][1]+"</p>";sx.classList.remove("sw")},160)}
  function mark(i){nodes.forEach(function(n,j){n.classList.toggle("on",j<=i)});dots.forEach(function(d,j){d.classList.toggle("on",j<=i)})}
  function go(i,user){from=pos;to=i/(N-1);if(i===0&&from>0.5)from=to=0;cur=i;tm=performance.now();mark(i);text(i);if(user)pause=performance.now()+5000;if(window.__fx&&i>0)window.__fx.vib(6)}
  function frame(now){
    if(!s.isConnected)return;
    var k=Math.min(1,(now-tm)/MOVE),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pos=from+(to-from)*e;draw(pos);
    if(k>=1&&now-tm>MOVE+HOLD&&now>pause)go((cur+1)%N,false);
    raf=requestAnimationFrame(frame)}
  sx.innerHTML="<b>"+ST[0][0]+"</b><p>"+ST[0][1]+"</p>";mark(0);cur=0;pos=0;from=to=0;tm=performance.now();draw(0);
  var red=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
  if(!red&&"IntersectionObserver" in window){new IntersectionObserver(function(en){if(en[0].isIntersecting){if(!raf){tm=performance.now()-MOVE;raf=requestAnimationFrame(frame)}}else{cancelAnimationFrame(raf);raf=0}}).observe(s)}
})();

/* ===== 3B koli ===== */
(function(){
  var sec=document.querySelector("[data-box]");if(!sec)return;
  var st=sec.querySelector(".bx-stage"),bx=sec.querySelector(".bx"),btns=[].slice.call(sec.querySelectorAll(".bx-btns button")),info=sec.querySelector(".bx-info"),C=window.K360||{},
  SZ=[[120,26,90,_t("Evrak / küçük paket"),_t("Ek ücret yok")],[130,100,110,_t("Orta koli"),null],[170,140,140,_t("Büyük koli"),null]],
  rx=-22,ry=32,drag=false,lx=0,ly=0,spin=true,raf=0;
  function tlf(n){return "₺"+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".")}
  function build(i){var w=SZ[i][0],h=SZ[i][1],d=SZ[i][2];bx.style.width=w+"px";bx.style.height=h+"px";bx.innerHTML="";
    [["f",w,h,"translateZ("+d/2+"px)","Kuryetex"],["b",w,h,"rotateY(180deg) translateZ("+d/2+"px)",""],["r",d,h,"rotateY(90deg) translateZ("+w/2+"px)",""],["l",d,h,"rotateY(-90deg) translateZ("+w/2+"px)",""],["tp",w,d,"rotateX(90deg) translateZ("+h/2+"px)",""],["bt",w,d,"rotateX(-90deg) translateZ("+h/2+"px)",""]].forEach(function(f){var e=document.createElement("i");e.className=f[0];e.style.width=f[1]+"px";e.style.height=f[2]+"px";e.style.left="50%";e.style.top="50%";e.style.marginLeft=-f[1]/2+"px";e.style.marginTop=-f[2]/2+"px";e.style.transform=f[3];e.textContent=f[4];bx.appendChild(e)});
    var ex=i===0?"Ek ücret yok":"+"+tlf((C.SIZE_EXTRA||[0,75,100])[i])+_t(" ek ücret");info.innerHTML="<b>"+SZ[i][3]+"</b> · "+ex+"<br><small>Görsel boyutlar yaklaşıktır; emin değilseniz WhatsApp'tan fotoğrafını gönderin.</small>"}
  function paint(){bx.style.transform="rotateX("+rx+"deg) rotateY("+ry+"deg)"}
  function loop(){if(!bx.isConnected)return;if(spin&&!drag)ry+=.45;paint();raf=requestAnimationFrame(loop)}
  btns.forEach(function(b,i){b.addEventListener("click",function(){btns.forEach(function(x){x.setAttribute("aria-pressed","false")});b.setAttribute("aria-pressed","true");build(i)})});
  st.addEventListener("pointerdown",function(e){drag=true;spin=false;lx=e.clientX;ly=e.clientY;st.classList.add("g");try{st.setPointerCapture(e.pointerId)}catch(x){}});
  st.addEventListener("pointermove",function(e){if(!drag)return;ry+=(e.clientX-lx)*.6;rx=Math.max(-80,Math.min(80,rx-(e.clientY-ly)*.5));lx=e.clientX;ly=e.clientY});
  var up=function(){drag=false;st.classList.remove("g")};st.addEventListener("pointerup",up);st.addEventListener("pointercancel",up);
  build(1);btns[1].setAttribute("aria-pressed","true");
  if("IntersectionObserver" in window){new IntersectionObserver(function(en){if(en[0].isIntersecting){if(!raf)raf=requestAnimationFrame(loop)}else{cancelAnimationFrame(raf);raf=0}}).observe(st)}else loop();
})();

/* ===== Mini oyun ===== */
(function(){
  var g=document.querySelector("[data-game]");if(!g)return;
  var D=["Kadıköy","Beşiktaş","Şişli","Üsküdar","Bakırköy","Ataşehir","Fatih","Maltepe","Sarıyer","Pendik"],E=["🏠","🏢","🏥","🏬","🏡"],
  tm=g.querySelector(".g-time"),sc=g.querySelector(".g-score"),hs=g.querySelector(".g-houses"),area=g.querySelector(".g-area"),end=g.querySelector(".g-end"),play=g.querySelector(".g-play"),
  score=0,left=30,timer=0,target="",box=null,run=false,best=0;
  try{best=+localStorage.getItem("k360best")||0}catch(e){}
  function fx(k,v){if(window.__fx){if(k)window.__fx.snd(k);if(v)window.__fx.vib(v)}}
  function round(){var pool=D.slice().sort(function(){return Math.random()-.5}).slice(0,3);target=pool[Math.floor(Math.random()*3)];
    hs.innerHTML=pool.map(function(n,i){return '<div class="g-h" data-n="'+n+'"><i>'+E[(i+score)%E.length]+"</i>"+n+"</div>"}).join("");
    area.innerHTML='<div class="g-box">📦 → '+target+"</div>";box=area.firstChild;bind()}
  function under(x,y){var l=document.elementsFromPoint(x,y);for(var i=0;i<l.length;i++){if(l[i].classList&&l[i].classList.contains("g-h"))return l[i]}return null}
  function bind(){var ox=0,oy=0,dr=false;
    box.addEventListener("pointerdown",function(e){if(!run)return;dr=true;ox=e.clientX;oy=e.clientY;box.classList.add("d");try{box.setPointerCapture(e.pointerId)}catch(x){}fx("tap",8)});
    box.addEventListener("pointermove",function(e){if(!dr)return;box.style.transform="translate("+(e.clientX-ox)+"px,"+(e.clientY-oy)+"px) rotate("+((e.clientX-ox)/18)+"deg)";[].forEach.call(hs.children,function(h){h.classList.remove("hot")});var h=under(e.clientX,e.clientY);if(h)h.classList.add("hot")});
    function up(e){if(!dr)return;dr=false;box.classList.remove("d");var h=under(e.clientX,e.clientY);[].forEach.call(hs.children,function(x){x.classList.remove("hot")});
      if(!h){box.style.transition="transform .25s";box.style.transform="";setTimeout(function(){box.style.transition=""},260);return}
      if(h.getAttribute("data-n")===target){score++;sc.textContent=score;h.classList.add("ok");fx("ok",[15,30,15]);setTimeout(function(){if(run)round()},260)}
      else{h.classList.add("no");fx("bad",[40,40,40]);setTimeout(function(){h.classList.remove("no")},400);box.style.transition="transform .25s";box.style.transform="";setTimeout(function(){box.style.transition=""},260)}}
    box.addEventListener("pointerup",up);box.addEventListener("pointercancel",up)}
  function finish(){run=false;clearInterval(timer);if(score>best){best=score;try{localStorage.setItem("k360best",best)}catch(e){}}
    area.innerHTML="";hs.innerHTML="";end.style.display="block";end.querySelector(".g-res").innerHTML="Süre doldu! <b>"+score+"</b> paket teslim ettin."+(best?" En iyi skorun: <b>"+best+"</b>.":"");fx("ok",[20,40,20]);play.style.display="none"}
  play.addEventListener("click",function(){score=0;left=30;sc.textContent=0;tm.textContent=left;end.style.display="none";run=true;play.style.display="none";round();timer=setInterval(function(){left--;tm.textContent=left;if(left<=0)finish()},1000)});
  end.querySelector(".g-again").addEventListener("click",function(){end.style.display="none";play.style.display="";play.click()});
})();
;(function(){if(window.__hs)return;window.__hs=1;function go(){var e=document.getElementById("basvuru");if(!e)return;var y=e.getBoundingClientRect().top+(window.pageYOffset||0)-132;window.scrollTo({top:y,behavior:"instant"})}
function multi(){[0,150,400,900,1800].forEach(function(t){setTimeout(go,t)})}
document.addEventListener("click",function(ev){var a=ev.target.closest&&ev.target.closest('a[href*="#basvuru"]');if(a)multi()},true);
window.addEventListener("load",function(){if(location.hash==="#basvuru")multi()})})();
;(function(){if(window.__bad)return;window.__goBad=function(el){if(!el)return;var g=function(){var y=el.getBoundingClientRect().top+(window.pageYOffset||0)-Math.round(window.innerHeight*.3);window.scrollTo({top:Math.max(0,y),behavior:"instant"})};g();setTimeout(g,120);setTimeout(g,400)};
window.__bad=function(el,txt){if(!el)return;el.classList.remove("bad");void el.offsetWidth;el.classList.add("bad");
 var n=el.nextElementSibling;if(!(n&&n.classList.contains("ferr"))){n=document.createElement("span");n.className="ferr";n.setAttribute("role","alert");n.id="e"+Math.random().toString(36).slice(2,8);el.parentNode.insertBefore(n,el.nextSibling)}n.textContent=txt||_t("Bu alan zorunlu");el.setAttribute("aria-invalid","true");el.setAttribute("aria-describedby",n.id);
 if(window.__fx){try{window.__fx.snd&&window.__fx.snd("bad");navigator.vibrate&&navigator.vibrate([30,40,30])}catch(e){}}
 var c=function(){el.classList.remove("bad");el.removeAttribute("aria-invalid");el.removeAttribute("aria-describedby");var x=el.nextElementSibling;if(x&&x.classList.contains("ferr"))x.remove();el.removeEventListener("input",c);el.removeEventListener("change",c)};el.addEventListener("input",c);el.addEventListener("change",c)};
document.addEventListener("submit",function(e){var f=e.target;if(!f.matches||!f.matches(".cform,.ofm"))return;f.setAttribute("novalidate","");
 var bad=[].slice.call(f.querySelectorAll("[required]")).filter(function(i){return !i.value.trim()});
 var em=f.querySelector('input[type=email]');if(em&&em.value&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em.value))bad.push(em);
 if(!bad.length)return;e.preventDefault();e.stopImmediatePropagation();
 bad.forEach(function(i){window.__bad(i,i.type==="email"?"Geçerli bir e-posta yazın":i.type==="tel"?"Telefon numarası gerekli":_t("Bu alan zorunlu"))});
 var m=f.querySelector(".cmsg");if(m){m.className="cmsg err";m.textContent=_t("Kırmızı ile işaretli alanları doldurun.")}
 window.__goBad(bad[0]);try{bad[0].focus({preventScroll:true})}catch(x){}},true)})();
;(function(){var d=document.documentElement;
function auto(){try{var c=localStorage.getItem("k360calm");if(c===null){var n=navigator,cn=n.connection||{};if((n.deviceMemory&&n.deviceMemory<=2)||(n.hardwareConcurrency&&n.hardwareConcurrency<=3)||cn.saveData||/2g|3g/.test(cn.effectiveType||""))c="1"}return c==="1"}catch(e){return false}}
window.__calm=function(on,save){if(on)d.setAttribute("data-calm","1");else d.removeAttribute("data-calm");if(save){try{localStorage.setItem("k360calm",on?"1":"0")}catch(e){}}
 [].forEach.call(document.querySelectorAll("svg"),function(s){if(s.closest&&s.closest(".xpl,#hizmetler"))return;try{on?s.pauseAnimations():s.unpauseAnimations()}catch(e){}});
 var b=document.getElementById("fxCalm");if(b)b.setAttribute("aria-pressed",on?"true":"false");
 if(save&&window.__fx&&window.__fx.set){try{if(on){localStorage.setItem("k360pre",d.getAttribute("data-theme")||"light");window.__fx.set("dark")}else{window.__fx.set(localStorage.getItem("k360pre")||"light")}}catch(e){}}
 if(save){var o=document.querySelector(".ecot");if(o)o.remove();var t=document.createElement("div");t.className="ecot";t.setAttribute("role","status");t.textContent=on?_t("🔋 Tasarruf modu: Açık"):_t("🔋 Tasarruf modu: Kapalı");document.body.appendChild(t);setTimeout(function(){t.remove()},3200)}};
if(!window.__calmInit){window.__calmInit=1;window.__calmAuto=auto();document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#fxCalm");if(b)window.__calm(!d.hasAttribute("data-calm"),true)},true)}
window.__calm(d.hasAttribute("data-calm")||window.__calmAuto,false)})();

;(function(){
  var vs=document.querySelectorAll(".roam .rv"),hd=document.querySelector("header.top"),pks=document.querySelectorAll(".roam .pt");
  function pos(){if(hd&&pks.length){var b=hd.getBoundingClientRect().bottom;pks.forEach(function(p){p.style.top=(b-2)+"px"})}}
  pos();window.addEventListener("resize",pos);
  vs.forEach(function(v){
    var st=null,raf=0,dragged=false,home=v.className;
    function put(x,y){v.style.transform="translate3d("+x+"px,"+y+"px,0)"}
    function reset(){cancelAnimationFrame(raf);raf=0;v.classList.remove("grab");v.style.left="";v.style.right="";v.style.top="";v.style.transform="";v.style.animation="";v.style.animationDelay="-"+Math.floor(Math.random()*8)+"s"}
    v.addEventListener("click",function(e){if(dragged){dragged=false;return}if(window.__boom){var r=v.getBoundingClientRect();window.__boom(v,r.left+r.width/2,r.top+r.height/2);v.classList.add("gone");setTimeout(function(){v.classList.remove("gone");reset()},5000)}});
    v.addEventListener("pointerdown",function(e){
      var r=v.getBoundingClientRect();st={sx:e.clientX,sy:e.clientY,ox:r.left+r.width/2-15,oy:r.top+r.height/2-15,x:0,y:0,moved:false,vx:0,vy:0,lt:performance.now(),lx:e.clientX,ly:e.clientY};
      try{v.setPointerCapture(e.pointerId)}catch(x){}
    });
    v.addEventListener("pointermove",function(e){
      if(!st)return;var dx=e.clientX-st.sx,dy=e.clientY-st.sy;
      if(!st.moved){if(Math.abs(dx)+Math.abs(dy)<4)return;st.moved=true;dragged=true;cancelAnimationFrame(raf);v.classList.add("grab");v.style.animation="none";v.style.left="0";v.style.right="auto";v.style.top="0"}
      var now=performance.now(),dt=Math.max(1,now-st.lt)/1000;
      st.vx=.6*st.vx+.4*((e.clientX-st.lx)/dt);st.vy=.6*st.vy+.4*((e.clientY-st.ly)/dt);st.lt=now;st.lx=e.clientX;st.ly=e.clientY;
      st.x=st.ox+dx;st.y=st.oy+dy;put(st.x,st.y)});
    function up(){
      if(!st)return;var s=st;st=null;v.classList.remove("grab");if(!s.moved)return;
      var W=window.innerWidth,fl=window.innerHeight-90,x=s.x,y=s.y,vx=Math.max(-2600,Math.min(2600,s.vx)),vy=Math.max(-2200,Math.min(2200,s.vy)),lt=performance.now(),rest=0;
      v.classList.add("grab");
      function f(t){
        var dt=Math.min(.04,(t-lt)/1000);lt=t;
        vy+=2400*dt;y+=vy*dt;x+=vx*dt;
        if(y>=fl){y=fl;if(vy>240){vy=-vy*.35;if(window.__fx){window.__fx.snd("bounce");window.__fx.vib(10)}}else vy=0;vx*=.9}
        if(y<0){y=0;vy=-vy*.4}
        if(x<0){x=0;vx=-vx*.55}else if(x>W-30){x=W-30;vx=-vx*.55}
        put(x,y);
        if(y>=fl&&Math.abs(vx)<30&&Math.abs(vy)<5){rest+=dt;if(rest>.6){v.classList.remove("grab");reset();return}}else rest=0;
        raf=requestAnimationFrame(f)}
      raf=requestAnimationFrame(f)}
    v.addEventListener("pointerup",up);v.addEventListener("pointercancel",up)});
})();

;(function(){
  var W={pt:["Hoş geldiniz!","Hızlı kurye burada 🏍️","Kapınıza kadar geliriz!"],pl:["Merhaba! 👋","Selam, ben Kuryetex!","Bir paket mi var? 📦"],pr:["İyi günler dileriz 😊","Her an yanınızdayız!","Bizi seçtiğiniz için sağ olun!"]};
  document.querySelectorAll(".roam .pk").forEach(function(pk){
    var k=pk.classList.contains("pt")?"pt":pk.classList.contains("pl")?"pl":"pr",n=Math.floor(Math.random()*3),cb=pk.querySelector(".cb");if(!cb)return;
    function setT(){cb.textContent=_t(W[k][n%3]);n++}
    setT();pk.addEventListener("animationiteration",function(e){if(e.target===pk)setT()})});
})();

;(function(){if(window.__goneInit)return;window.__goneInit=1;
var SEL=".roam .pk,.scene .cu,.scene .bub,.scene .ferry";
document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest(SEL);if(!el)return;el.classList.add("gone");try{if(window.__boom)window.__boom(el,e.clientX,e.clientY)}catch(x){}setTimeout(function(){el.classList.remove("gone")},5000)},true)})();
/* === 3B giriş: 360 derece dünya === */
(function(){var el=document.getElementById("h3d");if(window.__h3d&&window.__h3d.el!==el){try{window.__h3d.kill()}catch(e){}window.__h3d=null}
if(!el||el.__ok)return;el.__ok=1;
function go(){if(!window.THREE||!document.body.contains(el))return;try{window.__h3d=build(el)}catch(e){console.warn(e)}}
if(window.THREE)go();else if(!window.__h3dL){window.__h3dL=1;var s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";s.async=true;s.onload=function(){var e2=document.getElementById("h3d");if(e2){el=e2;go()}};document.head.appendChild(s)}else{var iv=setInterval(function(){if(window.THREE){clearInterval(iv);go()}},200)}
function build(el){var T=THREE,PI=Math.PI,H=document.documentElement,MOB=Math.min(innerWidth,innerHeight)<720,LAND=[[[-168,66],[-162,70],[-140,70],[-125,70],[-95,72],[-82,70],[-80,63],[-93,58],[-85,55],[-80,52],[-78,58],[-65,60],[-62,55],[-56,52],[-66,45],[-70,42],[-76,38],[-76,34],[-81,31],[-80,26],[-82,29],[-86,30],[-90,29],[-97,27],[-97,21],[-92,18],[-88,21],[-87,16],[-83,15],[-83,10],[-78,8],[-80,8],[-86,12],[-92,15],[-97,16],[-105,20],[-106,23],[-112,29],[-110,23],[-115,30],[-118,34],[-122,37],[-124,43],[-124,48],[-130,54],[-137,58],[-148,60],[-155,58],[-165,55],[-158,58],[-165,63]],[[-55,60],[-45,60],[-20,70],[-18,78],[-30,83],[-60,82],[-72,78],[-58,70]],[[-78,8],[-72,12],[-62,10],[-52,5],[-50,0],[-35,-5],[-35,-10],[-39,-18],[-41,-22],[-48,-26],[-54,-34],[-58,-38],[-62,-40],[-65,-45],[-68,-52],[-70,-54],[-74,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-5],[-80,0]],[[-17,21],[-16,28],[-10,32],[-6,36],[10,37],[11,33],[20,31],[32,31],[34,28],[38,20],[43,12],[51,12],[48,5],[40,-3],[40,-15],[35,-24],[32,-29],[27,-34],[20,-35],[17,-30],[12,-17],[13,-8],[9,-1],[9,4],[5,5],[-4,5],[-8,4],[-13,8],[-17,14]],[[5,59],[5,62],[14,67],[22,70],[30,70],[28,66],[25,65],[22,63],[18,60],[16,56],[12,56],[10,59]],[[-9,37],[-9,43],[-1,44],[-4,48],[2,51],[8,54],[9,57],[11,54],[20,55],[24,59],[30,60],[34,66],[41,67],[44,68],[60,69],[68,73],[80,73],[105,78],[113,74],[140,72],[160,70],[180,68],[180,65],[177,62],[163,60],[156,51],[155,58],[143,59],[137,54],[141,50],[135,43],[130,42],[129,36],[126,35],[126,38],[125,40],[121,40],[118,38],[122,37],[120,34],[122,30],[120,26],[113,22],[108,21],[106,18],[109,12],[105,9],[100,13],[100,7],[103,2],[98,8],[98,16],[94,17],[92,22],[88,22],[80,15],[78,8],[73,16],[72,21],[67,24],[62,25],[57,26],[56,27],[51,28],[48,30],[50,26],[52,24],[56,25],[59,22],[52,16],[44,12],[43,15],[39,21],[35,28],[34,31],[36,34],[36,36],[30,36.5],[27,37],[26,38.5],[26,40],[23,40],[24,38],[22,36.5],[21,38],[19.5,41],[18,42.5],[15,45],[13,45.7],[12.3,44],[16,41],[18,40],[16,38],[15.7,38],[16,40],[12,42],[10,44],[7,43.5],[3,43],[3,42],[0,39],[-1,37],[-5,36]],[[131,31],[135,34],[140,36],[142,40],[141,45],[144,43],[140,41],[139,36],[135,33]],[[113,-22],[130,-12],[137,-12],[142,-11],[146,-19],[153,-27],[150,-37],[141,-38],[135,-34],[115,-34]],[[-6,50],[2,53],[-3,58],[-6,56],[-5,52]],[[-5.7,50],[1.7,51],[1.5,53],[-0.5,54.5],[-3,58.6],[-6,58],[-5,55],[-3,54],[-4.5,52],[-5.7,50]],[[-10,52],[-6,52],[-6,55],[-10,54]],[[130,31],[132,33],[135,34],[140,35],[141,38],[142,41],[140,41.5],[139,38],[136,36],[133,35],[130,33.5]],[[141,42],[145,43.5],[145,45],[141.5,45.5]],[[95,5.5],[98,4],[104,-3],[106,-6],[102,-5],[98,0]],[[109,1],[111,-3],[116,-4],[119,1],[117,7],[113,4]],[[106,-6],[114,-7],[115,-8.5],[106,-7.5]],[[120,-1],[125,1.5],[123,-5],[120,-5]],[[131,-1],[141,-2.5],[150,-6],[147,-10],[141,-9],[137,-5],[132,-4]],[[166,-46],[171,-44],[174,-41],[178,-38],[175,-37],[173,-41],[168,-46.5]],[[44,-13],[50,-15],[50,-25],[45,-25],[43.5,-20]],[[-180,-70],[-120,-73],[-60,-64],[-40,-78],[0,-70],[60,-67],[120,-66],[180,-70],[180,-90],[-180,-90]],[[120,22],[122,25],[121,22]],[[80,6],[82,7.5],[81,9.5],[79.7,8]],[[-24,64],[-14,64.5],[-14,66],[-22,66.5]],[[-80,23],[-74,20],[-78,20],[-85,22]],[[118,7],[126,7],[126,13],[122,18],[120,14]]];
 var cv=document.createElement("canvas");el.appendChild(cv);var r=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true,powerPreference:"high-performance"});r.setPixelRatio(Math.min(devicePixelRatio||1,MOB?1.25:1.75));r.setClearColor(0,0);
 function ct(w,h,f){var c=document.createElement("canvas");c.width=w;c.height=h;f(c.getContext("2d"),w,h);var t=new T.CanvasTexture(c);t.anisotropy=4;return t}
 function rnd(s){return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}}
 var TW=MOB?1024:2048,TH=TW/2,PX=function(lo){return(lo+180)/360*TW},PY=function(la){return(90-la)/180*TH};
 function landPath(x){x.beginPath();LAND.forEach(function(p){p.forEach(function(q,i){i?x.lineTo(PX(q[0]),PY(q[1])):x.moveTo(PX(q[0]),PY(q[1]))});x.closePath()})}
 var MAP=ct(TW,TH,function(x,w,h){var g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,"#1d4f8a");g.addColorStop(.25,"#1f63a8");g.addColorStop(.5,"#2373b8");g.addColorStop(.75,"#1f63a8");g.addColorStop(1,"#1d4f8a");x.fillStyle=g;x.fillRect(0,0,w,h);
  x.save();landPath(x);x.strokeStyle="rgba(110,180,225,.35)";x.lineWidth=w/220;x.lineJoin="round";x.stroke();x.restore();
  x.save();landPath(x);x.clip();var lg=x.createLinearGradient(0,0,0,h);[[0,"#eef2f4"],[.1,"#dfe7e3"],[.17,"#6f8f5a"],[.27,"#5d8a45"],[.33,"#7e9a52"],[.37,"#c9b27a"],[.43,"#d9c08a"],[.47,"#6f9a48"],[.53,"#4f8a3a"],[.58,"#88a25a"],[.63,"#c6ad78"],[.68,"#8ea35c"],[.8,"#7d9a63"],[.86,"#e4ebee"],[1,"#f4f7f9"]].forEach(function(s){lg.addColorStop(s[0],s[1])});x.fillStyle=lg;x.fillRect(0,0,w,h);
  var R=rnd(7);for(var i=0;i<1400;i++){var cx=R()*w,cy=R()*h,rr=w/400+R()*w/90;x.fillStyle=R()<.5?"rgba(40,70,30,.10)":"rgba(255,240,200,.08)";x.beginPath();x.arc(cx,cy,rr,0,PI*2);x.fill()}x.restore();
  x.fillStyle="#f3f6f8";x.fillRect(0,0,w,h*.045);x.fillRect(0,h*.95,w,h*.05)});
 var SPEC=ct(TW/2,TH/2,function(x,w,h){x.fillStyle="#555";x.fillRect(0,0,w,h);x.scale(.5,.5);landPath(x);x.fillStyle="#000";x.fill()});
 var CLD=ct(1024,512,function(x,w,h){var R=rnd(31);for(var i=0;i<150;i++){var cx=R()*w,cy=h*.08+R()*h*.84,n=3+Math.floor(R()*5);for(var k=0;k<n;k++){var rr=6+R()*26,g=x.createRadialGradient(cx,cy,0,cx,cy,rr);g.addColorStop(0,"rgba(255,255,255,.42)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.beginPath();x.arc(cx,cy,rr,0,PI*2);x.fill();cx+=(R()-.3)*30;cy+=(R()-.5)*10}}});
 var GL=ct(128,128,function(x){var g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.25,"rgba(255,255,255,.6)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,128,128)});
 var BX=ct(128,128,function(x){x.fillStyle="#ff7a1a";x.fillRect(0,0,128,128);x.fillStyle="#fff";x.textAlign="center";x.textBaseline="middle";x.font="900 54px Arial Black,Arial";x.fillText("360",64,62)});
 function M(c,o){var m=new T.MeshStandardMaterial({color:c,roughness:.5,metalness:.15,flatShading:false});for(var k in o)m[k]=o[k];return m}
 function moto(col){var g=new T.Group(),tire=M(0x1b1f27,{roughness:.9}),pt=M(col,{roughness:.35,metalness:.3});
  [-.62,.62].forEach(function(x){var w=new T.Mesh(new T.TorusGeometry(.27,.11,6,14),tire);w.position.set(x,.38,0);g.add(w)});
  var a=new T.Mesh(new T.BoxGeometry(.95,.3,.36),pt);a.position.set(0,.64,0);g.add(a);var fr=new T.Mesh(new T.BoxGeometry(.2,.55,.32),pt);fr.position.set(.5,.82,0);fr.rotation.z=-.35;g.add(fr);
  var to=new T.Mesh(new T.BoxGeometry(.34,.52,.38),M(0x16314b));to.position.set(.02,1.16,0);to.rotation.z=-.3;g.add(to);
  var he=new T.Mesh(new T.SphereGeometry(.18,12,10),M(0xffffff,{roughness:.25}));he.position.set(.1,1.55,0);g.add(he);
  var b=new T.Mesh(new T.BoxGeometry(.52,.5,.5),new T.MeshStandardMaterial({map:BX,roughness:.55}));b.position.set(-.42,1.18,0);g.add(b);
  var lp=new T.Mesh(new T.SphereGeometry(.08,8,6),new T.MeshBasicMaterial({color:0xfff3c4}));lp.position.set(.7,.98,0);g.add(lp);return g}
 function lbl(t,o){var c=document.createElement("canvas"),x=c.getContext("2d"),f=(o.w||800)+" "+o.s+"px "+(o.f||"Inter,Arial");x.font=f;var w=Math.ceil(x.measureText(t).width+o.s*.9);c.width=w;c.height=Math.ceil(o.s*1.6);var tx=new T.CanvasTexture(c);
  function draw(col,sh){x.clearRect(0,0,c.width,c.height);x.font=f;x.textAlign="center";x.textBaseline="middle";if(sh){x.shadowColor=sh;x.shadowBlur=o.s*.18;x.shadowOffsetY=o.s*.04;x.lineWidth=o.s*.07;x.strokeStyle=sh;x.strokeText(t,w/2,c.height/2)}x.shadowColor="transparent";x.fillStyle=col;x.fillText(t,w/2,c.height/2);tx.needsUpdate=true}
  var sp=new T.Sprite(new T.SpriteMaterial({map:tx,transparent:true,depthTest:false,depthWrite:false}));sp.renderOrder=10;sp.scale.set(o.k*w/c.height,o.k,1);sp.userData.draw=draw;return sp}
 var S=new T.Scene(),cam=new T.PerspectiveCamera(40,1.6,.05,300);var hemi=new T.HemisphereLight(0xffffff,0x8aa2bd,.55);S.add(hemi);var sun=new T.DirectionalLight(0xffffff,1.05);sun.position.set(-12,8,14);S.add(sun);
 var G=new T.Group();S.add(G);var Rg=6;
 var atm=new T.Sprite(new T.SpriteMaterial({map:GL,color:0x8fcaff,transparent:true,opacity:.75,depthWrite:false}));atm.scale.set(Rg*3,Rg*3,1);atm.position.z=-1;G.add(atm);
 var W=new T.Group();G.add(W);W.rotation.x=.38;var E=new T.Group();W.add(E);
 var earth=new T.Mesh(new T.SphereGeometry(Rg,MOB?48:72,MOB?36:54),new T.MeshPhongMaterial({map:MAP,specularMap:SPEC,specular:new T.Color(0x6b8db5),shininess:22}));E.add(earth);
 var clouds=new T.Mesh(new T.SphereGeometry(Rg*1.018,MOB?40:60,MOB?30:44),new T.MeshLambertMaterial({map:CLD,transparent:true,depthWrite:false,opacity:.7}));E.add(clouds);
 function ll(lo,la,h){var ph=(90-la)*PI/180,th=(lo+180)*PI/180;return new T.Vector3(-h*Math.sin(ph)*Math.cos(th),h*Math.cos(ph),h*Math.sin(ph)*Math.sin(th))}
 var ist=ll(28.98,41.01,Rg);var pinM=new T.MeshBasicMaterial({color:0xff7a1a});var pin=new T.Group();var pc=new T.Mesh(new T.ConeGeometry(.16,.5,14),pinM);pc.rotation.x=PI;pc.position.y=.25;var ph2=new T.Mesh(new T.SphereGeometry(.2,14,10),pinM);ph2.position.y=.58;pin.add(pc,ph2);pin.position.copy(ist);pin.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),ist.clone().normalize());E.add(pin);
 var ringM=new T.MeshBasicMaterial({color:0xff7a1a,transparent:true,side:T.DoubleSide,depthWrite:false}),pr=new T.Mesh(new T.RingGeometry(.18,.26,32),ringM);pr.position.copy(ist.clone().multiplyScalar(1.004));pr.lookAt(ist.clone().multiplyScalar(2));E.add(pr);
 /* İstanbul yakın plan katmanları */
 var L0=27.85,L1=30.05,A0=40.55,A1=41.62,KX=1/Math.cos(41*PI/180),IW=MOB?1024:2048,IH=IW/2;
 var IX=function(lo){return(lo-L0)/(L1-L0)*IW},IY=function(la){return(A1-la)/(A1-A0)*IH};
 var EU_M=[[27.85,40.98],[28.05,41.02],[28.25,41.07],[28.42,41.05],[28.58,41.02],[28.68,40.99],[28.76,40.98],[28.82,40.96],[28.9,40.985],[28.95,41.0],[28.985,41.015]];
 var EU_B=[[28.985,41.015],[29.0,41.04],[29.03,41.05],[29.045,41.08],[29.057,41.085],[29.06,41.11],[29.06,41.135],[29.06,41.17],[29.08,41.185],[29.11,41.232]];
 var EU_N=[[29.11,41.232],[29.03,41.25],[28.9,41.29],[28.68,41.35],[28.5,41.42],[28.3,41.5],[28.1,41.57],[27.85,41.62]];
 var AS_N=[[30.05,41.13],[29.8,41.16],[29.61,41.18],[29.4,41.2],[29.25,41.23],[29.15,41.215]];
 var AS_B=[[29.15,41.215],[29.09,41.175],[29.08,41.15],[29.1,41.13],[29.07,41.09],[29.06,41.075],[29.045,41.045],[29.025,41.03],[29.01,41.02],[29.01,41.0]];
 var AS_M=[[29.01,41.0],[29.02,40.99],[29.035,40.975],[29.07,40.96],[29.1,40.95],[29.13,40.93],[29.19,40.89],[29.25,40.87],[29.3,40.82],[29.42,40.79],[29.6,40.77],[29.8,40.76],[30.05,40.765]];
 var SOUTH=[[30.05,40.72],[29.8,40.71],[29.55,40.68],[29.3,40.66],[29.05,40.6],[28.9,40.55]];
 function poly(x,pts,mv){pts.forEach(function(q,i){(i||!mv?x.lineTo:x.moveTo).call(x,IX(q[0]),IY(q[1]))})}
 function waterPath(x){x.beginPath();x.moveTo(IX(27.85),IY(40.55));poly(x,EU_M);poly(x,EU_B);poly(x,EU_N);x.lineTo(IX(27.85),IY(41.7));x.lineTo(IX(30.1),IY(41.7));poly(x,AS_N);poly(x,AS_B);poly(x,AS_M);poly(x,SOUTH);x.closePath()}
 var DS={"Beşiktaş":[29.007,41.043],"Şişli":[28.987,41.062],"Beyoğlu":[28.975,41.034],"Fatih":[28.95,41.013],"Kadıköy":[29.035,40.99],"Üsküdar":[29.022,41.024],"Bakırköy":[28.87,40.98],"Ataşehir":[29.12,40.99],"Maltepe":[29.13,40.935],"Kartal":[29.19,40.9],"Pendik":[29.24,40.88],"Sarıyer":[29.045,41.168],"Esenyurt":[28.67,41.03],"Başakşehir":[28.8,41.095],"Beylikdüzü":[28.64,40.995],"Ümraniye":[29.12,41.025],"Tuzla":[29.3,40.825],"Silivri":[28.25,41.075],"Beykoz":[29.1,41.13],"Arnavutköy":[28.74,41.185],"Çekmeköy":[29.18,41.035],"Sancaktepe":[29.23,41.0],"Eyüpsultan":[28.93,41.05],"Kağıthane":[28.97,41.08],"Bağcılar":[28.85,41.04],"Avcılar":[28.72,40.98],"Zeytinburnu":[28.9,40.995],"Şile":[29.61,41.175],"Çatalca":[28.46,41.14],"Büyükçekmece":[28.58,41.03],"Sultangazi":[28.87,41.105],"Esenler":[28.88,41.045]};
 var MAJ=["Beşiktaş","Şişli","Beyoğlu","Fatih","Kadıköy","Üsküdar","Bakırköy","Ataşehir","Maltepe","Kartal","Pendik","Sarıyer","Esenyurt","Başakşehir","Beylikdüzü","Ümraniye","Tuzla","Silivri","Beykoz","Arnavutköy","Şile","Çatalca","Eyüpsultan","Avcılar"];
 function feather(x,w,h,m){x.globalCompositeOperation="destination-in";var g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(m,"#000");g.addColorStop(1-m,"#000");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,w,h);g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(m*2,"#000");g.addColorStop(1-m*2,"#000");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,w,h);x.globalCompositeOperation="source-over"}
 var TA=ct(IW,IH,function(x,w,h){x.fillStyle="#e7e2d3";x.fillRect(0,0,w,h);
  var g=x.createLinearGradient(0,0,0,IY(41.0));g.addColorStop(0,"#b9d3a6");g.addColorStop(1,"rgba(185,211,166,0)");x.fillStyle=g;x.fillRect(0,0,w,IY(41.0));
  for(var n in DS){var d=DS[n],rr=w*.022;var gg=x.createRadialGradient(IX(d[0]),IY(d[1]),0,IX(d[0]),IY(d[1]),rr*2.2);gg.addColorStop(0,"rgba(205,196,182,.95)");gg.addColorStop(1,"rgba(205,196,182,0)");x.fillStyle=gg;x.beginPath();x.ellipse(IX(d[0]),IY(d[1]),rr*2.2,rr*1.6,0,0,PI*2);x.fill()}
  x.strokeStyle="rgba(255,255,255,.9)";x.lineWidth=w/420;x.lineCap="round";x.lineJoin="round";[[[28.2,41.08],[28.6,41.03],[28.8,41.0],[28.95,41.02],[29.03,41.045],[29.1,41.0],[29.2,40.93],[29.4,40.83]],[[28.3,41.12],[28.7,41.07],[28.9,41.07],[29.06,41.09],[29.15,41.04],[29.3,40.95],[29.5,40.85]],[[28.62,41.25],[28.85,41.2],[29.06,41.2],[29.2,41.15],[29.4,41.0]]].forEach(function(r){x.beginPath();poly(x,r,1);x.stroke()});
  waterPath(x);var wg=x.createLinearGradient(0,0,0,h);wg.addColorStop(0,"#5d9fd0");wg.addColorStop(.5,"#7db8df");wg.addColorStop(1,"#5d9fd0");x.fillStyle=wg;x.fill();x.strokeStyle="rgba(255,255,255,.75)";x.lineWidth=w/520;x.stroke();
  x.beginPath();poly(x,[[28.975,41.02],[28.96,41.035],[28.945,41.045],[28.935,41.05],[28.94,41.055],[28.955,41.045],[28.98,41.03]],1);x.fill();
  [[28.62,41.04,.035,.012],[28.77,40.995,.025,.01]].forEach(function(l){x.beginPath();x.ellipse(IX(l[0]),IY(l[1]),l[2]/(L1-L0)*w,l[3]/(A1-A0)*h,0,0,PI*2);x.fill()});
  x.fillStyle="#d8d2c2";[[29.12,40.87,.012],[29.09,40.875,.007],[29.06,40.88,.005],[29.03,40.885,.004]].forEach(function(l){x.beginPath();x.ellipse(IX(l[0]),IY(l[1]),l[2]/(L1-L0)*w,l[2]*.6/(A1-A0)*h,0,0,PI*2);x.fill()});
  x.strokeStyle="#3d4a5c";x.lineWidth=w/700;[[[29.02,41.047],[29.04,41.043]],[[29.055,41.09],[29.065,41.09]],[[29.07,41.2],[29.12,41.2]]].forEach(function(b){x.beginPath();poly(x,b,1);x.stroke()});
  feather(x,w,h,.12)});
 var TB=ct(IW,IH,function(x,w,h){var fs=Math.round(w/125);x.textBaseline="middle";for(var n in DS){if(MAJ.indexOf(n)<0)continue;var d=DS[n],X=IX(d[0]),Y=IY(d[1]);x.fillStyle="#fff";x.strokeStyle="#16314b";x.lineWidth=w/900;x.beginPath();x.ellipse(X,Y,fs*.28*KX,fs*.28,0,0,PI*2);x.fill();x.stroke();x.save();x.translate(X+fs*.55,Y);x.scale(KX,1);x.font="800 "+fs+"px Inter,Arial";x.lineWidth=fs*.28;x.strokeStyle="rgba(255,255,255,.9)";x.lineJoin="round";x.strokeText(n,0,0);x.fillStyle="#16314b";x.fillText(n,0,0);x.restore()}feather(x,w,h,.06)});
 var RT=[["Beşiktaş","Kadıköy"],["Şişli","Bakırköy"],["Üsküdar","Ataşehir"],["Kağıthane","Sarıyer"],["Esenyurt","Başakşehir"],["Maltepe","Pendik"],["Fatih","Beyoğlu"]].map(function(p,i){var a=DS[p[0]],b=DS[p[1]],c=[(a[0]+b[0])/2+(b[1]-a[1])*.35*(i%2?1:-1),(a[1]+b[1])/2-(b[0]-a[0])*.25*(i%2?1:-1)];return{a:a,b:b,c:c,u:i*.27,s:.045+(i%3)*.012}});
 function qp(R,u){var v=1-u;return[v*v*R.a[0]+2*v*u*R.c[0]+u*u*R.b[0],v*v*R.a[1]+2*v*u*R.c[1]+u*u*R.b[1]]}
 var TC=ct(IW,IH,function(x,w,h){x.lineCap="round";RT.forEach(function(R){x.strokeStyle="rgba(255,122,26,.95)";x.lineWidth=w/520;x.setLineDash([w/260,w/300]);x.beginPath();x.moveTo(IX(R.a[0]),IY(R.a[1]));x.quadraticCurveTo(IX(R.c[0]),IY(R.c[1]),IX(R.b[0]),IY(R.b[1]));x.stroke()});x.setLineDash([]);RT.forEach(function(R){var X=IX(R.b[0]),Y=IY(R.b[1]),rr=w/230;x.fillStyle="#ff7a1a";x.beginPath();x.ellipse(X,Y,rr*KX,rr,0,0,PI*2);x.fill();x.fillStyle="#fff";x.beginPath();x.ellipse(X,Y,rr*.45*KX,rr*.45,0,0,PI*2);x.fill()})});
 function patch(tex,rad,ro,bb){bb=bb||[L0,L1,A0,A1];var nx=MOB?28:44,ny=MOB?16:24,pos=[],uv=[],idx=[];for(var j=0;j<=ny;j++)for(var i=0;i<=nx;i++){var lo=bb[0]+(bb[1]-bb[0])*i/nx,la=bb[3]-(bb[3]-bb[2])*j/ny,v=ll(lo,la,rad);pos.push(v.x,v.y,v.z);uv.push(i/nx,1-j/ny);if(i<nx&&j<ny){var a=j*(nx+1)+i;idx.push(a,a+nx+1,a+1,a+1,a+nx+1,a+nx+2)}}var g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("uv",new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();var m=new T.Mesh(g,new T.MeshBasicMaterial({map:tex,transparent:true,opacity:0,depthWrite:false,side:T.DoubleSide}));m.renderOrder=ro;m.visible=false;E.add(m);return m}
 var PA=patch(TA,Rg*1.0004,2),PB=patch(TB,Rg*1.0006,4),PC=patch(TC,Rg*1.0005,3);
 var tiny=[],tcols=[0xc8442a,0x2f6a9e,0xff7a1a,0x16314b];RT.forEach(function(R,i){var m=moto(tcols[i%4]);m.scale.setScalar(.0042);m.visible=false;E.add(m);var pn=new T.Group(),pmm=new T.MeshBasicMaterial({color:0xff7a1a}),c1=new T.Mesh(new T.ConeGeometry(.9,2.4,12),pmm);c1.rotation.x=PI;c1.position.y=1.2;var h1=new T.Mesh(new T.SphereGeometry(1,12,10),pmm);h1.position.y=2.7;var dt1=new T.Mesh(new T.SphereGeometry(.42,10,8),new T.MeshBasicMaterial({color:0xffffff}));dt1.position.set(0,2.7,.75);pn.add(c1,h1,dt1);pn.scale.setScalar(.0026);var bp=ll(R.b[0],R.b[1],Rg*1.0006);pn.position.copy(bp);pn.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bp.clone().normalize());pn.visible=false;E.add(pn);tiny.push({m:m,p:pn,R:R})});
 /* İnce detay katmanı (merkez İstanbul) */
 var FB=[28.78,29.27,40.92,41.16],FW=MOB?1536:2048,FH=FW/2;
 var FX=function(lo){return(lo-FB[0])/(FB[1]-FB[0])*FW},FY=function(la){return(FB[3]-la)/(FB[3]-FB[2])*FH};
 function fpoly(x,pts,mv){pts.forEach(function(q,i){(i||!mv?x.lineTo:x.moveTo).call(x,FX(q[0]),FY(q[1]))})}
 function fwater(x){x.beginPath();x.moveTo(FX(27.85),FY(40.55));fpoly(x,EU_M);fpoly(x,EU_B);fpoly(x,EU_N);x.lineTo(FX(27.85),FY(41.7));x.lineTo(FX(30.1),FY(41.7));fpoly(x,AS_N);fpoly(x,AS_B);fpoly(x,AS_M);fpoly(x,SOUTH);x.closePath()}
 var NB={"Taksim":[28.985,41.037],"Karaköy":[28.977,41.023],"Eminönü":[28.972,41.017],"Ortaköy":[29.027,41.047],"Bebek":[29.043,41.077],"Levent":[29.012,41.08],"Mecidiyeköy":[28.995,41.067],"Nişantaşı":[28.993,41.051],"Moda":[29.025,40.982],"Bostancı":[29.095,40.955],"Kozyatağı":[29.1,40.975],"Acıbadem":[29.045,41.0],"Altunizade":[29.045,41.022],"Etiler":[29.03,41.08],"Maslak":[29.02,41.11],"Göztepe":[29.06,40.975],"Yeşilköy":[28.82,40.96],"Ataköy":[28.85,40.98],"Merter":[28.885,41.01],"Kumkapı":[28.965,41.005],"Balat":[28.948,41.03],"Cihangir":[28.983,41.031],"Kuzguncuk":[29.03,41.035],"Çengelköy":[29.05,41.05],"Kandilli":[29.06,41.075],"Fenerbahçe":[29.04,40.968],"Suadiye":[29.08,40.96],"Halkalı":[28.79,41.035],"Gayrettepe":[29.008,41.068],"Fulya":[28.999,41.058]};
 var FTA=ct(FW,FH,function(x,w,h){x.fillStyle="#e9e4d6";x.fillRect(0,0,w,h);var R=rnd(99);
  for(var i=0;i<(MOB?5000:9000);i++){var lo=FB[0]+R()*(FB[1]-FB[0]),la=FB[2]+R()*(FB[3]-FB[2]),X=FX(lo),Y=FY(la),bw=w/400+R()*w/260,bh=bw*(.5+R());x.fillStyle=["#d9d1c1","#ddd6c8","#d2cab9","#e2dccf","#cfc7b6"][Math.floor(R()*5)];x.fillRect(X,Y,bw,bh)}
  x.strokeStyle="rgba(255,255,255,.95)";x.lineCap="round";
  for(var k=0;k<(MOB?260:420);k++){var lo2=FB[0]+R()*(FB[1]-FB[0]),la2=FB[2]+R()*(FB[3]-FB[2]),a=R()*PI,L=w/40+R()*w/16;x.lineWidth=w/1400+R()*w/1600;x.beginPath();x.moveTo(FX(lo2),FY(la2));x.lineTo(FX(lo2)+Math.cos(a)*L,FY(la2)+Math.sin(a)*L);x.stroke()}
  x.fillStyle="#b7d3a0";[[29.01,41.05,.008],[28.982,41.013,.004],[29.04,40.968,.005],[29.055,41.105,.006],[28.995,41.044,.003],[29.03,41.12,.012],[28.86,41.09,.01]].forEach(function(p){x.beginPath();x.ellipse(FX(p[0]),FY(p[1]),p[2]/(FB[1]-FB[0])*w,p[2]*.8/(FB[3]-FB[2])*h,0,0,PI*2);x.fill()});
  x.strokeStyle="#ffffff";x.lineWidth=w/300;[[[28.78,41.0],[28.85,40.99],[28.9,41.01],[28.95,41.025],[28.99,41.06],[29.01,41.07],[29.03,41.045],[29.06,41.03],[29.1,41.0],[29.15,40.97],[29.27,40.92]],[[28.78,41.07],[28.88,41.07],[28.96,41.08],[29.06,41.09],[29.1,41.07],[29.15,41.04],[29.27,40.99]],[[28.97,41.04],[28.99,41.07],[29.0,41.1],[29.02,41.13]],[[29.02,41.0],[29.06,41.0],[29.1,40.98],[29.15,40.95]]].forEach(function(r){x.strokeStyle="#f7d8a8";x.lineWidth=w/260;x.beginPath();fpoly(x,r,1);x.stroke();x.strokeStyle="#fff";x.lineWidth=w/520;x.beginPath();fpoly(x,r,1);x.stroke()});
  fwater(x);var wg=x.createLinearGradient(0,0,0,h);wg.addColorStop(0,"#6aaad8");wg.addColorStop(1,"#5d9fd0");x.fillStyle=wg;x.fill();x.strokeStyle="rgba(255,255,255,.85)";x.lineWidth=w/700;x.stroke();
  x.fillStyle="#6aaad8";x.beginPath();fpoly(x,[[28.975,41.02],[28.96,41.035],[28.945,41.045],[28.935,41.05],[28.94,41.055],[28.955,41.045],[28.98,41.03]],1);x.fill();
  x.strokeStyle="#3d4a5c";x.lineWidth=w/420;[[[29.02,41.047],[29.04,41.043]],[[29.055,41.09],[29.065,41.09]],[[28.972,41.019],[28.976,41.025]],[[28.966,41.024],[28.971,41.03]]].forEach(function(b){x.beginPath();fpoly(x,b,1);x.stroke()});
  feather(x,w,h,.1)});
 var FTB=ct(FW,FH,function(x,w,h){x.lineCap="round";RT.forEach(function(R){x.strokeStyle="rgba(255,122,26,.95)";x.lineWidth=w/700;x.setLineDash([w/300,w/380]);x.beginPath();x.moveTo(FX(R.a[0]),FY(R.a[1]));x.quadraticCurveTo(FX(R.c[0]),FY(R.c[1]),FX(R.b[0]),FY(R.b[1]));x.stroke()});x.setLineDash([]);
  RT.forEach(function(R){var X=FX(R.b[0]),Y=FY(R.b[1]),rr=w/330;x.fillStyle="#ff7a1a";x.beginPath();x.ellipse(X,Y,rr*KX,rr,0,0,PI*2);x.fill();x.fillStyle="#fff";x.beginPath();x.ellipse(X,Y,rr*.45*KX,rr*.45,0,0,PI*2);x.fill()});
  function tx(n,d,fs,col,wt){var X=FX(d[0]),Y=FY(d[1]);x.save();x.translate(X,Y);x.scale(KX,1);x.font=wt+" "+fs+"px Inter,Arial";x.textAlign="center";x.textBaseline="middle";x.lineJoin="round";x.lineWidth=fs*.3;x.strokeStyle="rgba(255,255,255,.92)";x.strokeText(n,0,0);x.fillStyle=col;x.fillText(n,0,0);x.restore()}
  for(var n in NB)tx(n,NB[n],Math.round(w/120),"#4f6076",700);
  for(var m in DS){var d=DS[m];if(d[0]<FB[0]||d[0]>FB[1]||d[1]<FB[2]||d[1]>FB[3])continue;tx(m.toLocaleUpperCase("tr"),[d[0],d[1]-.004],Math.round(w/85),"#16314b",900)}
  feather(x,w,h,.06)});
 var mxA=r.capabilities.getMaxAnisotropy();[FTA,FTB,TA,TB,TC].forEach(function(t){t.anisotropy=mxA});
 var FPA=patch(FTA,Rg*1.00045,5,FB),FPB=patch(FTB,Rg*1.00065,6,FB);
 var mB=new T.Matrix4(),vF=new T.Vector3(),vU=new T.Vector3(),vS=new T.Vector3();
 function placeTiny(o,u){var p=qp(o.R,u),q=qp(o.R,Math.min(1,u+.01)),a=ll(p[0],p[1],Rg*1.0007),b=ll(q[0],q[1],Rg*1.0007);vU.copy(a).normalize();vF.copy(b).sub(a);vF.addScaledVector(vU,-vF.dot(vU));if(vF.lengthSq()<1e-12)return;vF.normalize();vS.crossVectors(vF,vU);mB.makeBasis(vF,vU,vS);o.m.quaternion.setFromRotationMatrix(mB);o.m.position.copy(a)}
 function ss(a,b,x){var t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}

 var base0=-Math.atan2(ist.x,ist.z);E.rotation.y=base0;
 var mots=[],cols=[0xc8442a,0x2f6a9e,0xff7a1a,0x16314b];for(var i=0;i<4;i++){var o=new T.Group();o.rotation.set(i*.9+.3,i*1.3,i*.7);var p=new T.Group();o.add(p);var mm=moto(cols[i]);mm.scale.setScalar(.46);mm.position.y=Rg*1.005;p.add(mm);W.add(o);mots.push({p:p,m:mm,w:(.22+i*.05)*(i%2?-1:1),a:i*1.7,hide:0,pop:1});if(i%2)mm.rotation.y=PI}
 var L1=lbl("360°",{s:130,k:3.1,f:"Archivo Black,Arial Black,Arial",w:900}),L2=lbl("İSTANBUL MOTO KURYE",{s:44,k:.8});L1.position.set(0,.2,Rg+.5);L2.position.set(0,-Rg-1.3,0);
 var dark=null;function pal(){var d=H.getAttribute("data-theme")==="dark";if(d===dark)return;dark=d;hemi.intensity=d?.45:.55}pal();
 var tag=el.querySelector(".h3tag"),tagDirty=1,Wd=0,Hh=0,px=0,py=0,tx=0,ty=0;var CB=-1,fc=0,tagPx=null;function size(){var w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;if(w<=h*1.15&&(fc++%30===0)){var cp=el.parentNode&&el.parentNode.querySelector(".hero-copy");if(cp){var cb2=Math.round(cp.getBoundingClientRect().bottom-el.getBoundingClientRect().top);if(cb2!==CB){CB=cb2;Wd=0}}}if(w===Wd&&h===Hh)return;Wd=w;Hh=h;tagDirty=1;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
  var hw=Math.tan(20*PI/180)*24*cam.aspect,hh=Math.tan(20*PI/180)*24;if(cam.aspect>1.15){G.scale.setScalar(Math.min(.6,hw*.3/8));G.position.set(hw*.47,-.4,0)}else{var wpp=2*hh/h,top=Math.max(0,CB)+14,D2=Math.min(w*.6,320),cy=top+D2/2;var hs=el.parentNode;if(hs){var need=Math.round(cy+D2/2+78);if(Math.abs((parseInt(hs.style.minHeight)||0)-need)>2)hs.style.minHeight=need+"px"}G.scale.setScalar(D2/2*wpp/(Rg*1.02));G.position.set(0,(h/2-cy)*wpp,0);tagPx=[w/2,cy+D2/2+30]}}
 var spin=0,vspin=0,tilt=0,vtilt=0,D=null,rc=new T.Raycaster(),nv=new T.Vector2();
 function hit(e){var b=cv.getBoundingClientRect();nv.set((e.clientX-b.left)/b.width*2-1,-(e.clientY-b.top)/b.height*2+1);rc.setFromCamera(nv,cam);return rc}
 function onEarth(e){hit(e);return rc.intersectObject(earth).length>0}
 function whichMoto(e){hit(e);for(var i=0;i<mots.length;i++){if(mots[i].m.visible&&rc.intersectObject(mots[i].m,true).length)return mots[i]}return null}
 function mv(e){var b=el.getBoundingClientRect();tx=((e.clientX-b.left)/b.width-.5)*2;ty=((e.clientY-b.top)/b.height-.5)*2;if(ptrs[e.pointerId])ptrs[e.pointerId]=[e.clientX,e.clientY];if(pinch){var ks=Object.keys(ptrs);if(ks.length===2){var a=ptrs[ks[0]],c=ptrs[ks[1]];setZ(pinch.z+(Math.hypot(a[0]-c[0],a[1]-c[1])/pinch.d-1)*.9,1)}return}if(D&&D.pan){var px1=e.clientX-D.x,py1=e.clientY-D.y,kk=.728*HHc/Math.max(1,Hh)*57.2958/Rg;PX=Math.max(-.95,Math.min(.95,PX-px1*kk/Math.cos(41*PI/180)));PY=Math.max(-.42,Math.min(.5,PY+py1*kk));D.x=e.clientX;D.y=e.clientY;D.mv+=Math.abs(px1)+Math.abs(py1);lastU=performance.now();loop();return}if(D){var dx=e.clientX-D.x,now=performance.now();vspin=vspin*.5+(dx/Math.max(8,now-D.t))*.5*.006*16;spin+=dx*.006;var dy=e.clientY-D.y;vtilt=vtilt*.5+(dy/Math.max(8,now-D.t))*.5*.005*16;tilt=Math.max(-1.35,Math.min(1.35,tilt+dy*.005));D.x=e.clientX;D.y=e.clientY;D.t=now;D.mv+=Math.abs(dx)+Math.abs(dy);loop()}}
 addEventListener("pointermove",mv,{passive:true});
 function down(e){ptrs[e.pointerId]=[e.clientX,e.clientY];dn={t:performance.now(),x:e.clientX,y:e.clientY};var ks=Object.keys(ptrs);if(ks.length===2){var a=ptrs[ks[0]],c=ptrs[ks[1]];pinch={d:Math.hypot(a[0]-c[0],a[1]-c[1]),z:ZT};D=null;return}if(Z>.05){lastU=performance.now();auto=0;D={pan:1,x:e.clientX,y:e.clientY,t:performance.now(),mv:0};el.classList.add("grab");try{cv.setPointerCapture(e.pointerId)}catch(_){}loop();return}var mo=whichMoto(e);if(mo||onEarth(e)){D={x:e.clientX,y:e.clientY,t:performance.now(),mv:0,mo:mo};vspin=0;vtilt=0;el.classList.add("grab");try{cv.setPointerCapture(e.pointerId)}catch(_){}loop()}}
 function up(e){if(e&&e.pointerId!=null)delete ptrs[e.pointerId];if(Object.keys(ptrs).length<2)pinch=0;if(e&&dn&&e.type==="pointerup"){var nw2=performance.now(),still=Math.hypot(e.clientX-dn.x,e.clientY-dn.y)<12&&nw2-dn.t<350;if(still){if(lt2&&nw2-lt2.t<380&&Math.hypot(e.clientX-lt2.x,e.clientY-lt2.y)<40){lt2=null;if(ZT>.5){setZ(0,1)}else{PX=PY=0;setZ(.9,1)}}else lt2={t:nw2,x:e.clientX,y:e.clientY}}dn=null}if(!D)return;if(D.mo&&D.mv<6){D.mo.m.visible=false;D.mo.hide=performance.now()+5000}D=null;el.classList.remove("grab");loop()}
 cv.addEventListener("pointerdown",down);cv.addEventListener("touchstart",function(e){if(e.touches.length===1&&Z<=.05){var t=e.touches[0];if(onEarth({clientX:t.clientX,clientY:t.clientY}))e.preventDefault()}},{passive:false});cv.addEventListener("wheel",function(e){if(Z>.01||ZT>0||e.ctrlKey||onEarth(e)&&e.deltaY<0&&e.shiftKey){e.preventDefault();setZ(ZT-e.deltaY*(e.ctrlKey?.01:.0016),1)}},{passive:false});
 var zb=el.querySelectorAll("[data-z]");for(var zi=0;zi<zb.length;zi++)zb[zi].addEventListener("click",function(e){e.stopPropagation();setZ(ZT+(+this.getAttribute("data-z"))*.2,1)});
addEventListener("pointerup",up);addEventListener("pointercancel",up);
 cv.addEventListener("mousemove",function(e){if(!D)cv.style.cursor=whichMoto(e)?"pointer":(onEarth(e)?"grab":"")});
 var vis=true,io=new IntersectionObserver(function(es){vis=es[0].isIntersecting;loop()});io.observe(el);
 var mob=new MutationObserver(function(){pal();loop()});mob.observe(H,{attributes:true,attributeFilter:["data-theme","data-calm"]});
 var t0=performance.now()/1000,tc=0,last=0,lt=0,raf=0,dead=false,Z=0,ZT=0,lastU=performance.now(),auto=0,nextA=performance.now()+16000,ptrs={},pinch=0;
 var PX=0,PY=0,HHc=1,dn=null,lt2=null;function setZ(v,u){ZT=Math.max(0,Math.min(1,v));if(u){lastU=performance.now();auto=0}loop()}

 function frame(t,dt){size();dt=Math.min(dt||0,.05);if(!D){spin+=vspin*dt*60;vspin*=Math.pow(.92,dt*60);tilt=Math.max(-1.35,Math.min(1.35,tilt+vtilt*dt*60));vtilt*=Math.pow(.9,dt*60)}
  if(dt)Z+=(ZT-Z)*Math.min(1,dt*1.3);else if(H.hasAttribute("data-calm"))Z=ZT;var zf=Z*Z*(3-2*Z),zs=ss(0,.2,Z);
  if(ZT>0||Z>.002){var k2=Math.round(spin/(2*PI))*2*PI;spin+=(k2-spin)*Math.min(1,dt*2.5);vspin*=.8;tilt*=1-Math.min(1,dt*2)}
  E.rotation.y=base0+Math.sin(t*.12)*.45*(1-zs)+spin;clouds.rotation.y=t*.012;W.rotation.x=.38+tilt;
  px+=(tx-px)*.04;py+=(ty-py)*.04;G.rotation.y=px*.12*(1-zs);G.rotation.x=py*.06*(1-zs);
  cam.position.set(0,.8,24);cam.lookAt(0,0,0);cam.near=.05;cam.clearViewOffset();cam.updateProjectionMatrix();cam.updateMatrixWorld();
  if(tag&&tagDirty&&Z<.01&&tagPx&&cam.aspect<=1.15){tagDirty=0;tag.style.left=tagPx[0]+"px";tag.style.top=tagPx[1]+"px"}if(tag&&tagDirty&&Z<.01){tagDirty=0;G.updateMatrixWorld();var tv=new T.Vector3(0,cam.aspect>1.15?-Rg*1.2:-Rg*1.2,Rg*.35).applyMatrix4(G.matrixWorld).project(cam);tag.style.left=((tv.x+1)/2*100)+"%";tag.style.top=((1-tv.y)/2*100)+"%"}
  var hh=99;if(Z>.0005){G.updateMatrixWorld(true);var iw=ll(28.98+PX,41.01+PY,Rg).applyMatrix4(E.matrixWorld),gc=new T.Vector3().setFromMatrixPosition(E.matrixWorld),nw=iw.clone().sub(gc).normalize(),sc=G.scale.x,cb=new T.Vector3(0,.8,24),d0=cb.distanceTo(iw),d1=(MOB?.04:.03)*sc,d=Math.exp(Math.log(d0)+(Math.log(d1)-Math.log(d0))*zf),dir=cb.clone().sub(iw).normalize().lerp(nw,Math.min(1,zf*2.2)).normalize();
   cam.position.copy(iw).addScaledVector(dir,d);if(Wd){var vz=Math.min(1,zf*1.6);if(cam.aspect>1.15)cam.setViewOffset(Wd,Hh,-Wd*.2*vz,0,Wd,Hh);else cam.setViewOffset(Wd,Hh,0,-Hh*.17*vz,Wd,Hh)}cam.lookAt(new T.Vector3().lerp(iw,Math.min(1,zf*3)));cam.near=Math.max(.004,d*.06);cam.updateProjectionMatrix();hh=d/sc}
  var sA=ss(14,6,hh),sF=ss(.16,.075,hh),sB=ss(.9,.45,hh)*(1-sF),sC=ss(.5,.24,hh)*(1-sF);PA.visible=sA>0;PA.material.opacity=sA;PB.visible=sB>0;PB.material.opacity=sB;PC.visible=sC>0;PC.material.opacity=sC;FPA.visible=FPB.visible=sF>0;FPA.material.opacity=FPB.material.opacity=sF;var sM=Math.max(sC,sF);
  clouds.material.opacity=.7*(1-ss(10,4,hh));var gm=1-ss(3,1.6,hh);pin.visible=pr.visible=hh>9;
  tiny.forEach(function(o){o.m.visible=sM>.02;o.p.visible=false;if(sM>.02){o.R.u=(o.R.u+o.R.s*dt)%1;placeTiny(o,o.R.u);o.m.scale.setScalar(.0024*sM*Math.max(.32,Math.min(1,hh/.11)));o.p.scale.setScalar(.0026*sC*(1+Math.abs(Math.sin(t*3+o.R.s*99))*.15))}});
  if(tag)tag.classList.toggle("zm",Z>.05);HHc=hh;if(Z<.02&&!(D&&D.pan)){PX*=.85;PY*=.85}var ta=Z>.05?"none":"pan-y";if(cv.style.touchAction!==ta)cv.style.touchAction=ta;
  var now=performance.now();mots.forEach(function(o){o.a+=o.w*dt;o.p.rotation.z=-o.a;if(!o.m.visible&&o.hide&&now>o.hide){o.m.visible=true;o.hide=0;o.pop=0}if(o.pop<1){o.pop=Math.min(1,o.pop+dt*3)}o.m.scale.setScalar(.46*(1-Math.pow(1-o.pop,3))*gm+1e-4)});
  var f=(t*.6)%1;pr.scale.setScalar(1+f*3);ringM.opacity=1-f;pin.position.copy(ist).multiplyScalar(1+Math.abs(Math.sin(t*2))*.02);
  r.render(S,cam)}
 function tick(ms){raf=0;if(dead)return;var calm=H.hasAttribute("data-calm"),pn=performance.now();if(!calm&&vis&&!document.hidden){if(auto&&pn>auto){auto=0;ZT=0;nextA=pn+60000}else if(!auto&&ZT===0&&Z<.01&&pn>nextA&&pn-lastU>8000){ZT=.7;PX=PY=0;auto=pn+12500}else if(!auto&&ZT>0&&pn-lastU>25000){ZT=0;nextA=pn+60000}}var busy=Math.abs(ZT-Z)>.002||D||Math.abs(vspin)>.0005||Math.abs(vtilt)>.0005||mots.some(function(o){return!o.m.visible||o.pop<1});if(!vis||document.hidden||(calm&&!busy)){if(calm)frame(tc,0);return}var now=ms/1000;if(MOB&&now-last<1/30){raf=requestAnimationFrame(tick);return}var dt=lt?now-lt:0;lt=now;last=now;if(!calm)tc=now-t0;frame(tc,dt);raf=requestAnimationFrame(tick)}
 function loop(){if(!raf&&!dead){lt=0;raf=requestAnimationFrame(tick)}}
 document.addEventListener("visibilitychange",loop);frame(0,0);el.classList.add("on");loop();
 return{el:el,st:function(){return[Z,ZT,PX,PY,tilt,spin]},pos:function(i){var v=new T.Vector3();mots[i||0].m.children[2].getWorldPosition(v);var z=v.z;v.project(cam);var b=cv.getBoundingClientRect();return[b.left+(v.x+1)/2*b.width,b.top+(1-v.y)/2*b.height,mots[i||0].m.visible,z]},kill:function(){dead=true;cancelAnimationFrame(raf);io.disconnect();mob.disconnect();removeEventListener("pointermove",mv);removeEventListener("pointerup",up);removeEventListener("pointercancel",up);document.removeEventListener("visibilitychange",loop);r.dispose();r.forceContextLoss()}}}
})();
/* === Form odak modu: kutuya tıklanınca yüzen ikonlar gizlenir === */
;(function(){if(window.__focInit)return;window.__focInit=1;var H=document.documentElement,B=document.body,tm=0;
var CTRL="input,textarea,select,button,label,option,a,[role=option],[role=listbox],.clrx,.clrw,.adr,summary";
function isBox(e){return e&&/^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName)&&!/^(button|submit|checkbox|radio|hidden|range)$/i.test(e.type||"")}
function clr(){H.classList.remove("focusing");B.classList.remove("typing","busy","lane-gone","calcing")}
function hide(){clearTimeout(tm);tm=0;H.classList.add("focusing")}
function back(d){clearTimeout(tm);tm=setTimeout(function(){tm=0;if(isBox(document.activeElement))return;clr()},d==null?3000:d)}
document.addEventListener("focusin",function(e){if(isBox(e.target))hide()},true);
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("#calcBtn,form button[type=submit],form [type=submit],#basvuru button,#basvuru .btn");if(b&&H.classList.contains("focusing")){var a=document.activeElement;if(isBox(a))try{a.blur()}catch(_){}back()}},true);
document.addEventListener("submit",function(){if(H.classList.contains("focusing"))back()},true);
document.addEventListener("pointerdown",function(e){if(!H.classList.contains("focusing")&&!B.classList.contains("typing"))return;var t=e.target;if(t&&t.closest&&t.closest(CTRL))return;var a=document.activeElement;if(isBox(a))try{a.blur()}catch(_){}back()},true);})();
/* === Yazı kutularına temizle (×) düğmesi === */
;(function(){var L=(document.documentElement.lang||"tr").slice(0,2),lab=L==="en"?"Clear":L==="ar"?"مسح":"Temizle";
var ins=document.querySelectorAll("input,textarea");
for(var i=0;i<ins.length;i++){var el=ins[i];if(el.__clr)continue;var t=(el.type||"").toLowerCase();if(/^(hidden|checkbox|radio|submit|button|range|time|date|file|color)$/.test(t)||el.name==="_honey"||el.style.display==="none")continue;el.__clr=1;
 var host=el.parentNode;if(!(host.classList&&host.classList.contains("ac"))){var w=document.createElement("span");w.className="clrw";host.insertBefore(w,el);w.appendChild(el);host=w}
 el.classList.add("clrin");var b=document.createElement("button");b.type="button";b.className="clrx";b.setAttribute("aria-label",lab);b.title=lab;b.tabIndex=-1;b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';host.appendChild(b);b.__in=el;
 b.addEventListener("pointerdown",function(e){e.preventDefault()});
 b.addEventListener("click",function(e){e.preventDefault();e.stopPropagation();var x=this.__in;x.value="";x.dispatchEvent(new Event("input",{bubbles:true}));x.dispatchEvent(new Event("change",{bubbles:true}));upd(x);try{x.focus()}catch(_){}})}
function upd(x){var b=x.parentNode.querySelector(".clrx");if(b&&b.__in===x)b.classList.toggle("on",!!x.value)}
if(!window.__clrInit){window.__clrInit=1;document.addEventListener("input",function(e){if(e.target.__clr)upd(e.target)},true);setInterval(function(){var a=document.querySelectorAll(".clrin");for(var k=0;k<a.length;k++)upd(a[k])},600)}
for(var j=0;j<ins.length;j++)if(ins[j].__clr)upd(ins[j]);})();
/* === Üst şerit renk döngüsü (8 renk, 4 sn) === */
;(function(){if(window.__lbInit)return;window.__lbInit=1;
var P=[["#21b3ad","#f27aae"],["#ff9a3d","#e0563f"],["#7b5cff","#ff6fb5"],["#2f80ed","#2ec4b6"],["#1fae6e","#e8b931"],["#4f6bed","#c06ff2"],["#ff6b6b","#ffa95c"],["#0ea5e9","#7cc41a"]],i=0,H=document.documentElement;
function set(){var lb=document.querySelector(".langbar");if(lb){lb.style.setProperty("--lb1",P[i][0]);lb.style.setProperty("--lb2",P[i][1])}var m=document.querySelector('meta[name=theme-color]');if(m)m.content=P[i][0]}
set();setInterval(function(){if(document.hidden||H.hasAttribute("data-calm"))return;i=(i+1)%P.length;set()},4000);
new MutationObserver(function(){var lb=document.querySelector(".langbar");if(lb&&!lb.style.getPropertyValue("--lb1"))set()}).observe(document.body,{childList:true,subtree:false});})();
/* === Sağdaki ikonlar: sürükle-at, yere düşsün, yerinde kalsın === */
;(function(){if(window.__flyInit)return;window.__flyInit=1;var K="k360fly",S={};try{S=JSON.parse(localStorage.getItem(K)||"{}")||{}}catch(e){}
function key(el){return el.classList.contains("ecob")?"eco":el.classList.contains("fabc")?"call":"wa"}
function setP(el,x,y){["left","top"].forEach(function(p,i){el.style.setProperty(p,(i?y:x)+"px","important")});el.style.setProperty("right","auto","important");el.style.setProperty("bottom","auto","important")}
function floor(el){var b=document.querySelector(".bar"),h=el.offsetHeight,f=innerHeight;if(b){var r=b.getBoundingClientRect();if(r.height&&getComputedStyle(b).display!=="none")f=r.top}return f-h-6}
function clampXY(el,x,y){var w=el.offsetWidth;return[Math.max(4,Math.min(innerWidth-w-4,x)),Math.max(70,Math.min(floor(el),y))]}
function apply(){document.querySelectorAll(".fab,.ecob").forEach(function(el){el.classList.add("lf");var s=S[key(el)];if(s){var p=clampXY(el,s[0]*innerWidth,s[1]*innerHeight);setP(el,p[0],p[1])}})}
function save(el){var r=el.getBoundingClientRect();S[key(el)]=[r.left/innerWidth,r.top/innerHeight];try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
var cur=null;
document.addEventListener("pointerdown",function(e){var el=e.target.closest&&e.target.closest(".fab,.ecob");if(!el||e.button>0)return;var r=el.getBoundingClientRect();cur={el:el,sx:e.clientX,sy:e.clientY,ox:e.clientX-r.left,oy:e.clientY-r.top,mv:false,pts:[[e.clientX,e.clientY,performance.now()]],id:e.pointerId};if(el.__raf){cancelAnimationFrame(el.__raf);el.__raf=0}},true);
document.addEventListener("pointermove",function(e){if(!cur||e.pointerId!==cur.id)return;var el=cur.el;if(!cur.mv){if(Math.hypot(e.clientX-cur.sx,e.clientY-cur.sy)<9)return;cur.mv=true;el.classList.add("drg");try{el.setPointerCapture(e.pointerId)}catch(_){}}
 e.preventDefault();var x=e.clientX-cur.ox,y=e.clientY-cur.oy;x=Math.max(0,Math.min(innerWidth-el.offsetWidth,x));y=Math.max(0,Math.min(innerHeight-el.offsetHeight,y));setP(el,x,y);cur.pts.push([e.clientX,e.clientY,performance.now()]);if(cur.pts.length>6)cur.pts.shift()},{passive:false});
function clr(el){["left","top","right","bottom","transition"].forEach(function(p){el.style.removeProperty(p)})}
function home(el){var sv={};["left","top","right","bottom"].forEach(function(p){sv[p]=[el.style.getPropertyValue(p),el.style.getPropertyPriority(p)];el.style.removeProperty(p)});var r=el.getBoundingClientRect();["left","top","right","bottom"].forEach(function(p){if(sv[p][0])el.style.setProperty(p,sv[p][0],sv[p][1])});return r}
function near(el){var h=home(el),r=el.getBoundingClientRect();return Math.hypot((r.left+r.width/2)-(h.left+h.width/2),(r.top+r.height/2)-(h.top+h.height/2))<90||(r.left+r.width/2>innerWidth-70&&Math.abs((r.top+r.height/2)-(h.top+h.height/2))<160)}
function snap(el){var h=home(el);el.classList.remove("drg");el.style.setProperty("transition","left .35s cubic-bezier(.3,1.4,.5,1),top .35s cubic-bezier(.3,1.4,.5,1)","important");setP(el,h.left,h.top);delete S[key(el)];try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}setTimeout(function(){clr(el)},400)}
function end(e){if(!cur||e.pointerId!==cur.id)return;var c=cur;cur=null;if(!c.mv)return;var el=c.el;el.__nc=1;setTimeout(function(){el.__nc=0},350);if(near(el)){snap(el);return}
 var a=c.pts[0],b=c.pts[c.pts.length-1],dt=Math.max(16,b[2]-a[2]),vx=(b[0]-a[0])/dt*16,vy=(b[1]-a[1])/dt*16;vx=Math.max(-40,Math.min(40,vx));vy=Math.max(-40,Math.min(40,vy));
 var r=el.getBoundingClientRect(),x=r.left,y=r.top,w=el.offsetWidth,lt=performance.now();
 function step(t){var k=Math.min(2.5,(t-lt)/16);lt=t;vy+=1.1*k;vx*=Math.pow(.985,k);x+=vx*k;y+=vy*k;var fl=floor(el);
  if(x<4){x=4;vx=-vx*.3}if(x>innerWidth-w-4){x=innerWidth-w-4;vx=-vx*.3}if(y<70){y=70;vy=-vy*.4}
  var done=false;if(y>=fl){y=fl;if(Math.abs(vy)<3){vy=0;vx*=.55;if(Math.abs(vx)<.5)done=true}else{vy=-vy*.35;vx*=.6}}
  setP(el,x,y);if(done){el.__raf=0;el.classList.remove("drg");if(near(el))snap(el);else save(el)}else el.__raf=requestAnimationFrame(step)}
 el.__raf=requestAnimationFrame(step)}
document.addEventListener("pointerup",end,true);document.addEventListener("pointercancel",end,true);
document.addEventListener("click",function(e){var el=e.target.closest&&e.target.closest(".fab,.ecob");if(el&&el.__nc){e.preventDefault();e.stopImmediatePropagation()}},true);
document.addEventListener("dragstart",function(e){if(e.target.closest&&e.target.closest(".fab,.ecob"))e.preventDefault()},true);
apply();if("MutationObserver" in window)new MutationObserver(function(m){for(var i=0;i<m.length;i++)if(m[i].addedNodes.length){apply();break}}).observe(document.body,{childList:true,subtree:false});
var app=document.getElementById("app");if(app&&"MutationObserver" in window)new MutationObserver(apply).observe(app,{childList:true});
addEventListener("resize",function(){document.querySelectorAll(".fab,.ecob").forEach(function(el){if(!S[key(el)])return;var r=el.getBoundingClientRect(),p=clampXY(el,r.left,r.top);setP(el,p[0],p[1])})})})();
