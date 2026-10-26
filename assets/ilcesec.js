// Kuryetex hesaplayıcısı: "Nereden / Nereye" için ilçe seçimi + mahalle listesi (Eczane Kuryem'deki gibi)
// Var olan #from / #to alanlarını gizli tutar; seçim yapılınca onların value ve data-d değerlerini doldurur,
// böylece fiyat hesabı aynı şekilde çalışır. "Şehir dışı / adres yaz" ile eski arama alanı açılır.
(function(){
  if(window.__ipInit){if(window.__ipInit2)window.__ipInit2();return}window.__ipInit=1;
  function nz(s){return(s||"").toLocaleLowerCase("tr").replace(/[çğıöşüâîû]/g,function(c){return{"ç":"c","ğ":"g","ı":"i","ö":"o","ş":"s","ü":"u","â":"a","î":"i","û":"u"}[c]}).replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim()}
  var ILM=null,wait=[];
  // Eczane hizmeti: teslim adresinin mahallesine göre sabit bölge fiyatı (Eczane Kuryem ile aynı tarife)
  window.__ekZonePrice=function(el){var Z=window.EKZ;if(!Z||!el)return null;var d=el.dataset.d;if(!d||!Z.d[d])return null;
    var r=Z.d[d],z=r[0],v=nz((el.value||"").split(",")[0].replace(/ Mah$/,""));
    r[1].forEach(function(x){var p=x.split("|");if(nz(p[0])===v)z=p[1]||r[0]});
    (Z.a||[]).forEach(function(a){if(a[1]===d&&nz(a[0])===v)z=a[3]});
    return Z.p[z]||null};
  function ilm(cb){if(ILM)return cb(ILM);if(window.__ILM){ILM=window.__ILM;return cb(ILM)}wait.push(cb);if(wait.length>1)return;
    fetch("/assets/data/ilmah.json").then(function(r){return r.json()}).then(function(j){ILM=window.__ILM=j;wait.forEach(function(f){f(j)});wait=[]}).catch(function(){})}
  function mahs(il,J){var code=il==="Gebze"?"41":"34",L=(J.d[code]||[]).filter(function(x){return x[0]===il})[0];return L?L[1].map(function(m){return m[0]}):[]}
  function lbl(m){return m.replace(/ Mah$/,"").replace(/\s+/g," ").trim()}
  function enhance(el,word){
    if(!el||el.__ip)return;el.__ip=1;var C=window.K360||{},D=C.D||{};
    var names=Object.keys(D).sort(function(a,b){return nz(a).localeCompare(nz(b))});if(!names.length)return;
    var acWrap=el.closest(".ac")||el.parentNode,field=el.closest(".field")||acWrap.parentNode,lab=field.querySelector("label[for="+el.id+"]");
    var w=document.createElement("div");w.className="ip";
    w.innerHTML='<div class="ip-r"><select class="ip-il" id="'+el.id+'Il" aria-label="'+word+' ilçe"><option value="">İlçe seçin</option>'+names.map(function(n){return'<option>'+n+'</option>'}).join("")+'</select>'+
      '<div class="ac ip-ac"><input type="text" class="ip-mh" id="'+el.id+'Mh" disabled autocomplete="off" spellcheck="false" placeholder="Önce ilçe seçin" aria-label="'+word+' mahalle" role="combobox" aria-expanded="false"><ul class="acl" role="listbox"></ul></div></div>'+
      '<button type="button" class="ip-alt">Şehir dışı, sokak adresi ya da haritadan seçmek için tıklayın</button>';
    acWrap.parentNode.insertBefore(w,acWrap);acWrap.classList.add("ip-hide");if(lab)lab.setAttribute("for",el.id+"Il");
    var sel=w.querySelector(".ip-il"),inp=w.querySelector(".ip-mh"),box=w.querySelector(".acl"),alt=w.querySelector(".ip-alt"),list=[],cur=[],hi=-1,il="";
    function stale(){var r=document.getElementById("result");if(r)r.style.display="none";var e=document.getElementById("cerr");if(e)e.textContent="";
      var t=document.getElementById("tmc");if(t)t.dispatchEvent(new Event("input"))} // hesaplayıcının adım görünürlüğünü günceller
    function setOrig(v,d){if(el.__prefix&&v&&v.indexOf(el.__prefix)!==0)v=el.__prefix+", "+v;el.value=v;el.dataset.d=d;delete el.dataset.ll;stale();el.classList.remove("bad");field.classList.remove("bad");sel.classList.remove("bad")}
    function show(){if(!il){box.style.display="none";return}var q=nz(inp.value);hi=-1;
      cur=list.filter(function(m){var k=nz(m);return!q||k.indexOf(q)===0||k.indexOf(" "+q)>-1});
      box.innerHTML=cur.length?cur.map(function(m,i){return'<li role="option" data-i="'+i+'"><span>'+lbl(m)+'</span><em>'+il+'</em></li>'}).join(""):'<li class="none">Bu ilçede böyle bir mahalle yok.</li>';
      box.style.display="block";inp.setAttribute("aria-expanded","true")}
    function hide(){box.style.display="none";inp.setAttribute("aria-expanded","false")}
    function choose(m){inp.value=lbl(m);hide();setOrig(m+", "+il,il)}
    sel.addEventListener("change",function(){il=sel.value;inp.value="";list=[];
      if(!il){inp.disabled=true;inp.placeholder="Önce ilçe seçin";setOrig("","");return}
      setOrig(il,il);inp.disabled=false;inp.placeholder="Mahalle seçin (isteğe bağlı)";
      ilm(function(J){list=mahs(il,J);if(document.activeElement===inp)show()})});
    inp.addEventListener("focus",show);inp.addEventListener("input",function(){if(il)setOrig(il,il);show()});
    inp.addEventListener("keydown",function(e){var li=box.querySelectorAll("li[data-i]");
      if(e.key==="ArrowDown"||e.key==="ArrowUp"){if(!li.length)return;e.preventDefault();hi=(hi+(e.key==="ArrowDown"?1:-1)+li.length)%li.length;li.forEach(function(x,i){x.classList.toggle("on",i===hi)});li[hi].scrollIntoView({block:"nearest"})}
      else if(e.key==="Enter"){e.preventDefault();if(hi>=0&&cur[hi])choose(cur[hi]);else if(cur.length)choose(cur[0])}else if(e.key==="Escape")hide()});
    box.addEventListener("mousedown",function(e){e.preventDefault()});
    box.addEventListener("click",function(e){var li=e.target.closest("li[data-i]");if(li)choose(cur[+li.getAttribute("data-i")])});
    inp.addEventListener("blur",function(){setTimeout(hide,150)});
    alt.addEventListener("click",function(){var open=acWrap.classList.toggle("ip-hide")===false;w.querySelector(".ip-r").hidden=open;
      alt.textContent=open?"İlçe ve mahalle listesinden seçmek için tıklayın":"Şehir dışı, sokak adresi ya da haritadan seçmek için tıklayın";
      if(open){el.value="";el.dataset.d="";stale();el.focus()}else{sel.value="";sel.dispatchEvent(new Event("change"))}});
    // dışarıdan (eczane seçimi) ilçe + etiket atama
    el.__ipSet=function(d,label,shown){if(!D[d])return false;if(!acWrap.classList.contains("ip-hide"))alt.click();
      sel.value=d;il=d;inp.disabled=false;ilm(function(J){list=mahs(il,J)});inp.value=shown||"";setOrig(label,d);return true};
    el.__ipNear=function(lat,lon){var bn=null,bk=1e9;Object.keys(D).forEach(function(n){var p=D[n];if(p&&p.lat!=null){var k=Math.hypot(p.lat-lat,(p.lon-lon)*.76);if(k<bk){bk=k;bn=n}}});return bn};
    // sayfa önceden bir ilçe seçtiyse (ilçe sayfaları) listeye yansıt
    function sync(){var d=el.dataset.d||"";if(d&&D[d]&&sel.value!==d){sel.value=d;il=d;inp.disabled=false;inp.placeholder="Mahalle seçin (isteğe bağlı)";ilm(function(J){list=mahs(il,J)})}}
    sync();setTimeout(sync,400);setTimeout(sync,1500);
  }
  // ---- eczane hizmeti seçilince: eczane seçimi (yakındaki açık / nöbetçi eczaneler)
  function ecz(){
    var svc=document.getElementById("svcsel"),from=document.getElementById("from");if(!svc||!from||svc.__ez)return;svc.__ez=1;
    var f=from.closest(".field"),lab=f&&f.querySelector("label"),lab0=lab?lab.innerHTML:"";
    var w=document.createElement("div");w.className="kx-ez";w.hidden=true;
    w.innerHTML='<p class="kx-ez-t">💊 İlacı hangi eczaneden alalım?</p><p class="ez-def">Yakınınızdaki eczaneyi seçin ya da eczanenin ilçesini aşağıdan girin.</p>'+
      '<div class="ez-sel" hidden><span>Seçilen eczane: <b></b></span><button type="button">Değiştir</button></div>'+
      '<div class="nb-2"><button type="button" class="nb-go">📍 Yakınımdaki eczaneler</button><button type="button" class="nb-go2">Farklı bir isteğim var</button></div>'+

      '<div class="nbl" hidden><div class="nb-body" aria-live="polite"></div></div><p class="kx-ez-h" hidden></p>';
    f.parentNode.insertBefore(w,f);
    var ot=document.createElement("div");ot.className="kx-other";ot.hidden=true;
    ot.innerHTML='<p class="kx-other-t">Farklı bir isteğiniz mi var?</p><p>İlacınız başka bir şehirde mi, birden fazla eczaneden alım mı gerekiyor, ya da başka bir şey mi istiyorsunuz? WhatsApp\'tan yazın, size hemen yardımcı olalım.</p>'+
      '<a class="kx-other-wa" href="https://wa.me/905515315234?text='+encodeURIComponent("Merhaba, eczane siparişi için farklı bir isteğim var: ")+'" target="_blank" rel="noopener" data-ev="wa_other">WhatsApp\'tan yazın</a>'+
      '<button type="button" class="kx-other-back">← Fiyat hesaplamaya dön</button>';
    w.parentNode.insertBefore(ot,w);var calcBox=svc.closest(".calc")||w.parentNode;
    var near=w.querySelector(".nb-go"),own=w.querySelector(".nb-go2"),nbl=w.querySelector(".nbl"),selBox=w.querySelector(".ez-sel"),btns=w.querySelector(".nb-2"),def=w.querySelector(".ez-def"),chosen=null;
    if(window.__ekNearLabel)near.textContent=window.__ekNearLabel();
    function state(){selBox.hidden=!chosen;btns.hidden=!!chosen;def.hidden=!!chosen;if(chosen)selBox.querySelector("b").textContent=chosen}
    function pick(x){var d=x.district&&from.__ipSet&&Object.keys((window.K360||{}).D||{}).filter(function(n){return nz(n)===nz(x.district)})[0];
      if(!d&&x.lat&&from.__ipNear)d=from.__ipNear(+x.lat,+x.lon);
      if(!d&&window.__ekPos&&from.__ipNear)d=from.__ipNear(window.__ekPos[0],window.__ekPos[1]);
      if(d&&from.__ipSet)from.__ipSet(d,x.name+", "+d,x.name);
      chosen=x.name;from.__prefix="";nbl.hidden=true;state()}
    var to=document.getElementById("to");
    function onPos(lat,lon){if(!to||to.dataset.d||!window.__ekNearestMah)return;window.__ekNearestMah(lat,lon).then(function(r){
      if(r&&!to.dataset.d&&to.__ipSet&&to.__ipSet(r.il,r.mah+" Mah, "+r.il,r.mah)){var h=w.querySelector(".kx-ez-h");h.textContent="📍 Teslim adresi konumunuza göre seçildi: "+r.mah+", "+r.il+". Farklıysa aşağıdan değiştirin.";h.hidden=false}})}
    near.onclick=function(){window.__ekNear&&window.__ekNear(nbl,{pick:pick,max:5,ilce:from.dataset.d||"",onPos:onPos})};
    function other(on){calcBox.classList.toggle("kx-is-other",on);ot.hidden=!on;if(on)ot.scrollIntoView({block:"nearest"})}
    own.onclick=function(){other(true)};ot.querySelector(".kx-other-back").onclick=function(){other(false)};
    selBox.querySelector("button").onclick=function(){chosen=null;from.__prefix="";if(from.dataset.d)from.value=from.value.replace(/^[^,]*,\s*/,"");state()};
    var last="";setInterval(function(){var v=svc.value||"";if(v===last)return;last=v;var on=/eczane|ilaç|ilac/i.test(v);w.hidden=!on;if(!on)other(false);
      if(lab)lab.innerHTML=on?lab0.replace(/Nereden alınacak\?/,"Eczane nerede? (ilçe / mahalle)"):lab0},400);
  }
  function init(){enhance(document.getElementById("from"),"Alım");enhance(document.getElementById("to"),"Teslim");ecz()}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(init,0)});else setTimeout(init,0);
  window.__ipInit2=init;
})();
