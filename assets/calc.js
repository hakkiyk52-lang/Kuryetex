window.__D=(function(){try{return JSON.parse(document.getElementById("k360i").textContent)}catch(e){return{}}})();function _t(x){var d=window.__D;return(d&&d[x])||x}
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
  (function(){var sw=document.getElementById("swapBtn");if(!sw)return;sw.addEventListener("click",function(){var a={v:from.value,d:from.dataset.d,l:from.dataset.ll},b={v:to.value,d:to.dataset.d,l:to.dataset.ll};function put(el,o){el.value=o.v||"";if(o.d)el.dataset.d=o.d;else el.dataset.d="";if(o.l)el.dataset.ll=o.l;else delete el.dataset.ll;var x=el.parentNode.querySelector(".clrx");if(x)x.classList.toggle("on",!!el.value)}put(from,b);put(to,a);sw.classList.toggle("spin");reset()})})();
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
      var m2="Merhaba, kuryetex.com üzerinden şehirler arası gönderi için sipariş vermek istiyorum.\n\nHizmet: "+hl2+"\nAlım noktası: "+from.value+"\nTeslim noktası: "+to.value;
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
    var msg="Merhaba, kuryetex.com üzerinden sipariş vermek istiyorum.\n\nHizmet: "+hl+"\nAlım noktası: "+from.value+"\nTeslim noktası: "+to.value;if(pa)msg+="\nAlım konumu: https://maps.google.com/?q="+from.dataset.ll;if(pb)msg+="\nTeslim konumu: https://maps.google.com/?q="+to.dataset.ll;
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
 var btn=f.querySelector("button");btn.disabled=true;btn.textContent=_t("Gönderiliyor…");fd.set("_subject","Kuryetex.com kurumsal başvuru: "+fd.get("Firma"));fd.set("_captcha","false");fd.set("_template","table");
 var text="Kurumsal üyelik başvurusu\n";fd.forEach(function(v,k){if(k.charAt(0)!=="_"&&v)text+=k+": "+v+"\n"});
 function fallback(){msg.className="cmsg err";msg.innerHTML="Başvuru otomatik gönderilemedi. Lütfen <a href=\"https://wa.me/"+window.K360.PHONE+"?text="+encodeURIComponent(text)+"\" target=\"_blank\" rel=\"noopener\">WhatsApp ile gönderin</a> veya <a href=\"mailto:kuryetex@gmail.com?subject="+encodeURIComponent("Kurumsal üyelik başvurusu")+"&body="+encodeURIComponent(text)+"\">e-posta ile iletin</a>.";btn.disabled=false;btn.textContent=_t("Başvuruyu Gönder")}
 fetch("https://formsubmit.co/ajax/kuryetex@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd}).then(function(r){return r.json()}).then(function(d){
  if(d&&(d.success===true||d.success==="true")){msg.className="cmsg ok";msg.textContent=_t("Başvurunuz alındı. En kısa sürede size dönüş yapacağız.");f.reset();btn.disabled=false;btn.textContent=_t("Başvuruyu Gönder")}else fallback()}).catch(fallback)})})})();
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