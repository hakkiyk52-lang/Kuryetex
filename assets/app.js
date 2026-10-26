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
    var p=null,ezp=(cur.np&&window.__ekZonePrice)?window.__ekZonePrice(to):null;
    if(cur.t==="calc"){var base=Math.round(raw/C.ROUND)*C.ROUND;p=cur.mult?Math.round(base*cur.mult/C.ROUND)*C.ROUND:base+(cur.add||0);p+=tmExtra(p);p+=sx+wx}
    if(ezp)p=ezp;
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
  function place(){if(!gh)return;var ox=cv.offsetLeft,oy=cv.offsetTop;gh.style.cssText="position:absolute;z-index:2;touch-action:pan-y;cursor:grab;border-radius:26px;left:"+(ox+cx-Rw)+"px;top:"+(oy+cy-Rh)+"px;width:"+(Rw*2)+"px;height:"+(Rh*2)+"px;-webkit-tap-highlight-color:transparent";
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
/* === Giriş görseli: İstanbul silueti (sakin modda durur) === */
;(function(){var v=document.querySelector(".kxv .kxsky");if(!v||!v.pauseAnimations)return;var H=document.documentElement,rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,vis=true;
function upd(){try{if(rm||H.hasAttribute("data-calm")||!vis||document.hidden)v.pauseAnimations();else v.unpauseAnimations()}catch(e){}}
new MutationObserver(upd).observe(H,{attributes:true,attributeFilter:["data-calm"]});document.addEventListener("visibilitychange",upd);
if("IntersectionObserver" in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;upd()}).observe(v);upd()})();
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
/* === Üst şerit ve kayan yazı bandı: renk tekerleği sırasıyla, fark ettirmeden yavaş geçiş === */
;(function(){if(window.__lbInit)return;window.__lbInit=1;
var P=[["#21b3ad","#2ec4b6"],["#2ec4b6","#0ea5e9"],["#0ea5e9","#2f80ed"],["#2f80ed","#4f6bed"],["#4f6bed","#7b5cff"],["#7b5cff","#c06ff2"],["#c06ff2","#f27aae"],["#f27aae","#ff6b6b"],["#ff6b6b","#ff9a3d"],["#ff9a3d","#e8b931"],["#e8b931","#1fae6e"],["#1fae6e","#21b3ad"]];
var Q=[["#ffb15c","#ff8a3d"],["#ffc857","#ffb15c"],["#ffd27a","#ffc857"],["#c9e27a","#ffd27a"],["#8fdcc0","#c9e27a"],["#86cdf0","#8fdcc0"],["#b8acf5","#86cdf0"],["#f3a9d2","#b8acf5"],["#ff9f8f","#f3a9d2"],["#ff8a3d","#ff9f8f"]];
var i=0,j=0,H=document.documentElement,STEP=16000;
function set(){var lb=document.querySelector(".langbar"),tk=document.querySelector(".tick");if(lb){lb.style.setProperty("--lb1",P[i][0]);lb.style.setProperty("--lb2",P[i][1])}if(tk){tk.style.setProperty("--tk1",Q[j][0]);tk.style.setProperty("--tk2",Q[j][1])}var m=document.querySelector('meta[name=theme-color]');if(m)m.content=P[i][0]}
set();setInterval(function(){if(document.hidden||H.hasAttribute("data-calm"))return;i=(i+1)%P.length;j=(j+1)%Q.length;set()},STEP);
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
/* === Ekran kenarında dolaşan araçlar: tek döngü, birbirini iten (ters mıknatıs), sürükle-fırlat === */
;(function(){if(window.__kxTraffic)return;window.__kxTraffic=1;
var R=document.querySelector(".roam");if(!R)return;var H=document.documentElement;
[].forEach.call(document.querySelectorAll(".roam .rv,.lane"),function(e){e.parentNode&&e.parentNode.removeChild(e)});
var EM=["🏍️","🚗","🚚"],SP=[22,18,15],V=[],L=1,x0=0,x1=0,y0=0,y1=0,GAP=64,RAD=150,lt=0,raf=0;
function geo(){var W=innerWidth,Hh=innerHeight,hd=document.querySelector("header.top"),br=document.querySelector(".bar"),t=hd?hd.getBoundingClientRect().bottom:0,b=Hh;if(br){var rb=br.getBoundingClientRect();if(rb.height&&rb.top>Hh*.5)b=rb.top}
 x0=6;x1=W-34;y0=Math.max(8,t+8);y1=Math.max(y0+120,b-34);var nl=2*((x1-x0)+(y1-y0));
 if(!V.inited){V.inited=1;V.forEach(function(o,i){o.s=nl*i/V.length;o.v=o.b})}else V.forEach(function(o){o.s=o.s/L*nl});L=nl}
function at(s){s=((s%L)+L)%L;var a=x1-x0,c=y1-y0;
 if(s<a)return[x0+s,y1,"scaleX(-1)"];s-=a;
 if(s<c)return[x1,y1-s,"rotate(-90deg) scaleX(-1)"];s-=c;
 if(s<a)return[x1-s,y0,"scaleY(-1)"];s-=a;
 return[x0,y0+s,"rotate(90deg) scaleX(-1)"]}
function put(o,x,y,r){o.e.style.transform="translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,0) "+(r||"")}
EM.forEach(function(em,i){var e=document.createElement("span");e.className="rv kxcar";e.textContent=em;e.setAttribute("aria-hidden","true");R.appendChild(e);
 var o={e:e,s:0,v:0,b:SP[i],hid:0,free:null};V.push(o);
 e.addEventListener("pointerdown",function(ev){var P=o.free||{};var cur=o.free?[P.x,P.y]:at(o.s);o.free={x:cur[0],y:cur[1],vx:0,vy:0,drag:1,sx:ev.clientX,sy:ev.clientY,ox:cur[0],oy:cur[1],mv:0,lx:ev.clientX,ly:ev.clientY,lt:performance.now(),rest:0};e.classList.add("grab");try{e.setPointerCapture(ev.pointerId)}catch(_){}go()});
 e.addEventListener("pointermove",function(ev){var f=o.free;if(!f||!f.drag)return;var now=performance.now(),dt=Math.max(1,now-f.lt)/1000;f.vx=.6*f.vx+.4*(ev.clientX-f.lx)/dt;f.vy=.6*f.vy+.4*(ev.clientY-f.ly)/dt;f.lx=ev.clientX;f.ly=ev.clientY;f.lt=now;f.mv+=Math.abs(ev.movementX||0)+Math.abs(ev.movementY||0)+0;f.x=f.ox+ev.clientX-f.sx;f.y=f.oy+ev.clientY-f.sy;f.mv=Math.max(f.mv,Math.hypot(ev.clientX-f.sx,ev.clientY-f.sy));put(o,f.x,f.y);go()});
 function up(){var f=o.free;if(!f||!f.drag)return;f.drag=0;e.classList.remove("grab");if(f.mv<6){o.free=null;var r=e.getBoundingClientRect();if(window.__boom)try{window.__boom(e,r.left+r.width/2,r.top+r.height/2)}catch(_){}o.hid=performance.now()+5000;e.style.visibility="hidden";return}f.vx=Math.max(-2600,Math.min(2600,f.vx));f.vy=Math.max(-2200,Math.min(2200,f.vy));go()}
 e.addEventListener("pointerup",up);e.addEventListener("pointercancel",up)});
function phys(o,dt){var f=o.free;if(f.drag)return;f.vy+=2400*dt;f.x+=f.vx*dt;f.y+=f.vy*dt;
 if(f.y>=y1){f.y=y1;if(f.vy>240){f.vy=-f.vy*.35;if(window.__fx)try{window.__fx.snd("bounce");window.__fx.vib(10)}catch(_){}}else f.vy=0;f.vx*=.9}
 if(f.y<y0){f.y=y0;f.vy=-f.vy*.4}if(f.x<x0){f.x=x0;f.vx=-f.vx*.55}else if(f.x>x1){f.x=x1;f.vx=-f.vx*.55}
 if(f.y>=y1)f.vx*=Math.pow(.05,dt);
 if(f.y>=y1&&Math.abs(f.vx)<30&&Math.abs(f.vy)<5){f.rest+=dt;if(f.rest>.6){o.s=f.x-x0;o.v=o.b;o.free=null}}else f.rest=0;
 if(o.free)put(o,f.x,f.y,"scaleX(-1)")}
function step(dt){var now=performance.now();
 V.forEach(function(o){if(o.hid&&now>o.hid){o.hid=0;o.e.style.visibility=""}if(o.free)phys(o,dt)});
 var A=V.filter(function(o){return!o.hid&&!o.free});
 A.forEach(function(o){o.v+=(o.b-o.v)*Math.min(1,dt*.8)});
 if(A.length>1){A.sort(function(p,q){return((p.s%L)+L)%L-((q.s%L)+L)%L});
  for(var i=0;i<A.length;i++){var a=A[i],b=A[(i+1)%A.length],g=((b.s-a.s)%L+L)%L;if(g<RAD){var fz=260*(1/Math.max(g,8)-1/RAD);b.v+=fz*dt*60;a.v-=fz*dt*60}}}
 A.forEach(function(o){o.v=Math.max(4,Math.min(48,o.v));o.s+=o.v*dt});
 if(A.length>1)for(var k=0;k<3;k++)for(var j=0;j<A.length;j++){var p=A[j],q=A[(j+1)%A.length],gg=((q.s-p.s)%L+L)%L;if(gg<GAP){var d=(GAP-gg)/2;q.s+=d;p.s-=d}}
 A.forEach(function(o){var P=at(o.s);put(o,P[0],P[1],P[2])})}
function off(){return document.hidden||H.hasAttribute("data-calm")||H.classList.contains("focusing")||getComputedStyle(R).display==="none"}
function tick(ms){raf=0;if(off()){lt=0;return}var dt=lt?Math.min(.05,(ms-lt)/1000):0;lt=ms;step(dt);raf=requestAnimationFrame(tick)}
function go(){if(!raf){lt=0;raf=requestAnimationFrame(tick)}}
geo();step(0);go();addEventListener("resize",function(){geo();step(0)});document.addEventListener("visibilitychange",go);
new MutationObserver(go).observe(H,{attributes:true,attributeFilter:["data-calm","class"]});setInterval(function(){geo();go()},2000)})();
/* === Tema seçici: yalnızca önizleme sitesinde (pages.dev) ya da ?tema ile görünür === */
;(function(){var H=document.documentElement,K="kxtema",T=[
["1 · Lacivert & bordo çift çıta","#13235a","linear-gradient(90deg,#e53935,#b71c1c 60%,#7f1d1d)","both","#ff5247","#ff5247","#ff8a2a"],
["2 · Lacivert & kırmızı çıta","#13235a","linear-gradient(90deg,#e53935,#b71c1c 60%,#7f1d1d)","in","#ffffff","#ffffff","#ff8a2a"],
["3 · Gece laciverti & turuncu","#0f1f3d","linear-gradient(90deg,#ff9a3d,#ff7a1a 35%,#e8620a 65%,#d62828)","in","#ffffff","#ffffff","#ff8a2a"],
["4 · Gece laciverti & ince kırmızı","#0f1f3d","#d62828","in","#ffffff","#ff5247","#ff8a2a"],
["5 · Koyu lacivert & altın","#0b1630","linear-gradient(90deg,#f5c84c,#e8b931 50%,#c9961a)","in","#ffffff","#f5c84c","#f5c84c"],
["6 · Kraliyet laciverti & turuncu ikon","#1a2b6b","#ff7a1a","in","#ff9a3d","#ff9a3d","#ff9a3d"],
["7 · Demir mavisi & turuncu (önceki)","#14293f","linear-gradient(90deg,#ff9a3d,#ff7a1a 35%,#e8620a 65%,#d62828)","in","#ffffff","#ffffff","#ff8a2a"],
["8 · Sade lacivert, çıtasız","#13235a","none","none","#ffffff","#ffffff","#ff8a2a"],
["9 · Parlament mavisi & turuncu","#1f3c88","linear-gradient(90deg,#ff9a3d,#ff7a1a 35%,#e8620a 65%,#d62828)","in","#ffffff","#ffffff","#ff8a2a"],
["10 · Parlament mavisi & kırmızı çift çıta","#1f3c88","linear-gradient(90deg,#e53935,#b71c1c 60%,#7f1d1d)","both","#ffffff","#ff6b5e","#ff8a2a"]];
function ap(i,tk){var t=T[i];if(!t)return;var s=H.style;s.setProperty("--kxbar",t[1]);s.setProperty("--kxline",t[2]);H.setAttribute("data-st",t[3]);s.setProperty("--kxico",t[4]);s.setProperty("--kxburg",t[5]);s.setProperty("--kxtex",t[6]);if(tk)H.setAttribute("data-tk","fix");else H.removeAttribute("data-tk")}
var on=/pages\.dev$/.test(location.hostname)||/[?&]tema/.test(location.search);if(!on)return;
var st={i:0,tk:0};try{st=JSON.parse(localStorage.getItem(K))||st}catch(e){}ap(st.i,st.tk);
function save(){try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}}
function ui(){var b=document.createElement("button");b.className="kxtp-b";b.type="button";b.textContent="🎨 Tema";document.body.appendChild(b);
 var p=document.createElement("div");p.className="kxtp";var h='<button class="x" type="button" aria-label="Kapat">×</button><h3>Renk kombinasyonu seç</h3><p>Dokun, site anında değişsin. Beğendiğinin numarasını yazman yeterli. (Sadece önizlemede görünür.)</p><div class="g">';
 T.forEach(function(t,i){var line=t[3]=="none"?"":'<i style="background:'+t[2]+';'+(t[3]=="out"?"top:0":"bottom:0")+'"></i>'+(t[3]=="both"?'<i style="background:'+t[2]+';top:0"></i>':"");h+='<button class="t" type="button" data-i="'+i+'"><span class="pv" style="display:block;background:'+t[1]+'">'+line+'<em>Kurye<span style="color:'+t[6]+'">TEX</span></em><u style="color:'+t[5]+'"></u></span><span class="nm">'+t[0]+'</span></button>'});
 h+='</div><div class="row"><button type="button" data-tk="0">Kayan bant: renkli</button><button type="button" data-tk="1">Kayan bant: turuncu</button></div>';p.innerHTML=h;document.body.appendChild(p);
 function mark(){[].forEach.call(p.querySelectorAll("button.t"),function(x){x.classList.toggle("sel",+x.getAttribute("data-i")===st.i)});[].forEach.call(p.querySelectorAll("[data-tk]"),function(x){x.classList.toggle("on",+x.getAttribute("data-tk")===st.tk)})}
 b.onclick=function(){p.classList.add("on");mark()};p.querySelector(".x").onclick=function(){p.classList.remove("on")};
 p.addEventListener("click",function(e){var t=e.target.closest("button.t");if(t){st.i=+t.getAttribute("data-i");ap(st.i,st.tk);save();mark()}var k=e.target.closest("[data-tk]");if(k){st.tk=+k.getAttribute("data-tk");ap(st.i,st.tk);save();mark()}});mark()}
if(document.body)ui();else document.addEventListener("DOMContentLoaded",ui)})();
