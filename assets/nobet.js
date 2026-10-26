// Yakındaki açık / nöbetçi eczaneler — Eczane Kuryem ve Kuryetex siteleri için ortak, sade bileşen
// Gündüz (09:00–19:00, Pazar hariç) yakındaki açık eczaneler; akşam 19:00'dan sonra, gece ve pazar nöbetçi eczaneler.
// Veri: /api/nobetci (Cloudflare Pages Function). Önizlemede window.EK_DEMO / EK_DEMO_NEAR örnek veri verir.
(function(){
  if(window.__ekNobetInit){if(window.__ekNobetAuto)window.__ekNobetAuto();return}window.__ekNobetInit=1;
  var WA="905515315234",IEO="https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/",CACHE={};
  var ILCELER=["Adalar","Arnavutköy","Ataşehir","Avcılar","Bağcılar","Bahçelievler","Bakırköy","Başakşehir","Bayrampaşa","Beşiktaş","Beykoz","Beylikdüzü","Beyoğlu","Büyükçekmece","Çatalca","Çekmeköy","Esenler","Esenyurt","Eyüpsultan","Fatih","Gaziosmanpaşa","Güngören","Kadıköy","Kağıthane","Kartal","Küçükçekmece","Maltepe","Pendik","Sancaktepe","Sarıyer","Silivri","Sultanbeyli","Sultangazi","Şile","Şişli","Tuzla","Ümraniye","Üsküdar","Zeytinburnu"];
  function now(){try{var p=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Istanbul",hour:"2-digit",hour12:false,weekday:"short"}).formatToParts(new Date()),h=0,w="";p.forEach(function(x){if(x.type==="hour")h=+x.value;if(x.type==="weekday")w=x.value});return{h:h%24,sun:w==="Sun"}}catch(e){var d=new Date();return{h:d.getHours(),sun:d.getDay()===0}}}
  function nobetSaati(){var n=now();return n.sun||n.h>=19||n.h<9}
  window.__ekNobetSaati=nobetSaati;
  function loc(n){var v=(n.toLocaleLowerCase("tr").match(/[aıoueiöü]/g)||["e"]).pop(),h="fstkçşhp".indexOf(n.slice(-1).toLocaleLowerCase("tr"))>-1;return n+"'"+(h?"t":"d")+("aıou".indexOf(v)>-1?"a":"e")}
  function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function api(q){return fetch("/api/nobetci?"+q,{headers:{Accept:"application/json"}}).then(function(r){return r.ok?r.json():{ok:false,items:[]}}).catch(function(){return{ok:false,items:[]}})}
  function byIlce(il){if(!CACHE[il])CACHE[il]=window.EK_DEMO?Promise.resolve(window.EK_DEMO(il)):api("ilce="+encodeURIComponent(il));return CACHE[il]}
  function near(lat,lon,all){return window.EK_DEMO_NEAR?Promise.resolve(window.EK_DEMO_NEAR(all)):api("lat="+lat.toFixed(4)+"&lon="+lon.toFixed(4)+(all?"&tum=1":""))}
  function km(k){return k==null?"":(k<1?Math.round(k*1000)+" m":String(Math.round(k*10)/10).replace(".",",")+" km")}
  function wa(it){return"https://wa.me/"+WA+"?text="+encodeURIComponent("Merhaba, "+it.name+(it.district?" ("+it.district+")":"")+" eczanesinden ilaç teslimatı istiyorum.\nTeslim adresim: ")}
  function maps(it){return it.lat&&it.lon?"https://www.google.com/maps/search/?api=1&query="+it.lat+","+it.lon:"https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(it.name+" "+(it.address||""))}
  function label(){return nobetSaati()?"📍 Yakınımdaki nöbetçi eczaneler":"📍 Yakınımdaki açık eczaneler"}
  window.__ekNearLabel=label;
  // Konuma en yakın mahalle (teslim adresini otomatik doldurmak için)
  var MC=null;
  function mc(){if(window.EK_MC)return Promise.resolve(window.EK_MC);if(!MC)MC=fetch("/assets/data/mahcoord.json").then(function(r){return r.json()}).catch(function(){MC=null;return null});return MC}
  window.__ekNearestMah=function(lat,lon){return mc().then(function(C){if(!C)return null;var best=null,bk=1e9;
    Object.keys(C).forEach(function(il){var ms=C[il];Object.keys(ms).forEach(function(m){var p=ms[m],dy=(p[0]-lat)*111,dx=(p[1]-lon)*84,k=dx*dx+dy*dy;if(k<bk){bk=k;best={il:il,mah:m,km:Math.sqrt(k)}}})});
    return best&&best.km<6?best:null})};
  function body(el){return el.querySelector(".nb-body")||el}
  function msg(el,t){body(el).innerHTML='<p class="nb-st">'+t+'</p>'}
  function list(el,d,title){
    var o=el.__opts||{},it=(d&&d.items)||[],max=o.max||5,h=(d&&d.demo?'<p class="nb-demo">Önizleme: örnek veri. Sitede gerçek eczaneler çıkar.</p>':'')+
      '<p class="nb-h"><b>'+title+'</b></p><ul class="nb-l">';
    it.forEach(function(x,i){h+='<li'+(i>=max?' class="nb-more" hidden':'')+'><div class="nb-n"><b>'+esc(x.name)+'</b>'+(x.km!=null?'<em class="nb-km">'+km(x.km)+'</em>':'')+'</div>'+
      '<p class="nb-a">'+esc([x.address||x.area,x.hours?"Nöbet: "+x.hours:""].filter(Boolean).join(", "))+'</p><div class="nb-b">'+
      (o.pick?'<button type="button" class="nb-pick" data-i="'+i+'">Bunu seç</button>':'<a class="nb-pick" href="'+wa(x)+'" target="_blank" rel="noopener" data-ev="wa_nobet_item">Buradan getir</a>')+
      (x.phone?'<a href="tel:'+esc(String(x.phone).replace(/[^0-9+]/g,""))+'">Ara</a>':'')+'<a href="'+maps(x)+'" target="_blank" rel="noopener">Yol tarifi</a></div></li>'});
    h+='</ul>'+(it.length>max?'<button type="button" class="nb-all">Tümünü göster ('+it.length+')</button>':'');
    var b=body(el);b.innerHTML=h;
    var all=b.querySelector(".nb-all");if(all)all.onclick=function(){b.querySelectorAll(".nb-more").forEach(function(x){x.hidden=false});all.remove()};
    if(o.pick)b.querySelectorAll("button.nb-pick").forEach(function(btn){btn.onclick=function(){o.pick(it[+btn.getAttribute("data-i")])}});
  }
  function showIlce(el,il,my){
    msg(el,esc(loc(il))+" bugünkü nöbetçi eczaneler yükleniyor…");
    byIlce(il).then(function(d){if(el.__req!==my)return;
      if(!d||!d.items||!d.items.length){msg(el,'Liste şu an alınamadı. <a href="'+IEO+'" target="_blank" rel="noopener">Resmî nöbet listesine</a> bakabilir ya da bize yazabilirsiniz; en yakın eczaneyi biz buluruz.');return}
      list(el,d,"Bugün "+esc(loc(il))+" nöbetçi eczaneler")})}
  // Yakındaki eczaneler: konum alınamazsa (gece) seçili ilçenin nöbet listesine düşer
  window.__ekNear=function(el,opts){
    el.__opts=opts||el.__opts||{};el.hidden=false;var my=el.__req=(el.__req||0)+1,night=nobetSaati(),il=el.__opts.ilce||"";
    function run(lat,lon){msg(el,"Size en yakın "+(night?"nöbetçi":"açık")+" eczaneler aranıyor…");
      near(lat,lon,!night).then(function(d){if(el.__req!==my)return;
        if(!d||!d.items||!d.items.length){if(night&&il)return showIlce(el,il,my);msg(el,"Yakınınızdaki eczane bilgisine şu an ulaşamadık. Bize yazın, en yakın eczaneyi biz bulalım.");return}
        list(el,d,"Size en yakın "+(night?"nöbetçi":"açık")+" eczaneler")})}
    function fail(t){if(night&&il)return showIlce(el,il,my);msg(el,t+(night?' <a href="'+IEO+'" target="_blank" rel="noopener">Resmî nöbet listesi</a>':""))}
    if(window.EK_DEMO_NEAR){if(el.__opts.onPos)el.__opts.onPos(40.9935,29.0371);return run(40.9935,29.0371)}
    if(el.__pos)return run(el.__pos[0],el.__pos[1]);
    if(!navigator.geolocation)return fail("Bu cihazda konum kullanılamıyor.");
    msg(el,"Konum izni isteniyor… Konumunuz sadece yakın eczaneleri bulmak için kullanılır, saklanmaz.");
    navigator.geolocation.getCurrentPosition(function(p){el.__pos=[p.coords.latitude,p.coords.longitude];window.__ekPos=el.__pos;if(el.__opts.onPos)el.__opts.onPos(el.__pos[0],el.__pos[1]);if(el.__req===my)run(el.__pos[0],el.__pos[1])},
      function(){if(el.__req===my)fail("Konum izni verilmedi.")},{enableHighAccuracy:false,timeout:12000,maximumAge:600000});
  };
  window.__ekIlceNobet=function(el,il,opts){el.__opts=opts||el.__opts||{};el.hidden=false;var my=el.__req=(el.__req||0)+1;showIlce(el,il,my)};
  // Sayfa kutuları: <div data-nobet="İlçe">  — en fazla 2 düğme
  function box(el){
    var il=el.getAttribute("data-nobet")||"",night=nobetSaati();
    el.innerHTML='<p class="nb-now">'+(night?"🌙 Şu an nöbet saati (19:00–09:00): açık olan nöbetçi eczanelerdir.":"☀️ Şu an eczaneler açık. Akşam 19:00'dan sonra nöbetçi eczaneler gösterilir.")+'</p>'+
      '<div class="nb-2"><button type="button" class="nb-go" data-a="near">'+label()+'</button>'+
      (night?(il?'<button type="button" class="nb-go2" data-a="ilce">'+esc(loc(il))+' nöbetçiler</button>':'<select class="nb-go2" aria-label="İlçedeki nöbetçi eczaneler"><option value="">İlçedeki nöbetçiler…</option>'+ILCELER.map(function(x){return"<option>"+x+"</option>"}).join("")+'</select>'):'')+'</div>'+
      '<div class="nb-body" aria-live="polite"></div>';
    el.__opts={ilce:il,max:5};
    el.querySelector('[data-a=near]').onclick=function(){window.__ekNear(el,el.__opts)};
    var b2=el.querySelector('[data-a=ilce]');if(b2)b2.onclick=function(){window.__ekIlceNobet(el,il)};
    var s=el.querySelector('select.nb-go2');if(s)s.onchange=function(){if(s.value){el.__opts.ilce=s.value;window.__ekIlceNobet(el,s.value)}};
    if(night&&il)window.__ekIlceNobet(el,il);
  }
  function auto(){document.querySelectorAll("[data-nobet]").forEach(function(el){if(el.__auto)return;el.__auto=1;box(el)})}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",auto);else auto();
  window.__ekNobetAuto=auto;
})();
