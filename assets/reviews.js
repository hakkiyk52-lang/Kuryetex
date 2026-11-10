(function(){
var R=[
{n:"Muhammed Isa",g:"Yurt dışından müşteri · İngilizce yorumdan çeviri",t:"Kesinlikle muhteşem bir hizmet! İstanbul'da Kuryetex'i paket göndermek için seçtim ve her şey sadece 2 saat içinde sorunsuz ve profesyonelce halledildi! Süper hızlı, güvenilir ve verimli. Son derece memnun kaldım. Şiddetle tavsiye ederim!"},
{n:"Cüneyt Varup",g:"Yerel Rehber · 12 yorum",t:"Cok hizli bir sekilde iletisim kurup istedigim teslimati gerceklestirdiler. İletişimleri muazzamdı. Paket kusursuz bir sekilde elime ulasti."},
{n:"Oğuz Özvarlık",g:"Yerel Rehber · 73 yorum",e:1,t:"Gaziantep ten İstanbul iş gezisi için geldim. Gece alerjim tuttu. Firmadan ilaç istedim 30 dk gibi bir sürede getirdiler."},
{n:"Armiiies Arman",g:"İstanbul bölgesinde 10 yorum",e:1,t:"Çok profesyonel ve hızlı çalışıyorlar. Kuryede çok kibardı ilaçların fişinin fotosunu bile çekip atıyorlar."},
{n:"Sıla Selma Başer",t:"Kapıda ödeme yaptım, güvenilir ve çok anlayışlı insanlardı. Sistem için teşekkürler"},
{n:"Erkut Tahtali",g:"Yerel Rehber · 54 yorum",t:"Çok iyi. Hemen istediğim sipariş 10 dakika sürmeden elime geçti."},
{n:"Hasan Hatipoglu",g:"İstanbul bölgesinde 17 yorum",t:"10 numara 5 yıldız"},
{n:"Sena Peker",g:"Yerel Rehber · 69 yorum",e:1,t:"Hemen yardımcı oldular, Nöbetçi Eczaneden Bakırköy ev adresine yarım saat içerisinde teslim ettiler çok teşekkür ederim önemli bir eksiğe çare olmuşlar"},
{n:"Berre Şahin",e:1,t:"Annem için acil ilaç gerekiyordu sağolsun arkadaşlar hemen ilgilenip ilacımızı getirdiler. Çok teşekkür ederiz çok memnun kaldık"},
{n:"Çagri Ozture",e:1,t:"İlginiz alakanız için çok teşekkür ederim.Gece vakti hızır gibi yetişip ihtiyacım olan ilaçları bana 20 dakikada getirdiniz.Çok sağolun.İyi çalışmalar"},
{n:"Yunus turnagöl",e:1,t:"İlaçlarımı çok hızlı bir şekilde ilettiler çok kibar ve Güler yüzlüydüler gerçekten de beş yıldız hak eden bir hizmet tebrik ediyorum"},
{n:"İrem Tetik",e:1,t:"Acil ilaç ihtiyacıma hemen çare oldular. Çok teşekkürlerrr"},
{n:"Mehmet Akyel",e:1,t:"Eczane için hizmet aldım mükemmeldi teşekkürler."},
{n:"Samet Yavuz",g:"Yerel Rehber · 13 yorum",t:"Unuttuğum iş evrağımı hızlı ve hasarsız getirdiğiniz için çok teşekkür ederim"},
{n:"Ferit Engin",g:"İstanbul bölgesinde 11 yorum",t:"Acil elektronik bir parça lazım di hızlı ve güvenilir bir şekilde teslimatı gercekletirler..."},
{n:"Gökçe GÜRPINAR",t:"Bu yağmurda, bu trafikte bu kadar hız beni şaşırttı."},
{n:"yaren karaketir",t:"internetten denk geldim çok hızlı şekilde yardımcı oldular acil arkadaşıma göndermem gereken anahtarı 45 dk da teslim ettiler cok teşekkür ederim 😊"},
{n:"Fırat Can",t:"Acil bir kargo vermem gerekiyordu ancak zamanım yoktu internetten bu firmayı buldum kargomu sorunsuz teslim ettiler iyi çok ilgili davrandılar teşekkür ediyorum."},
{n:"ahmet yavuz",t:"Teşekkürler kuryetex güvenilirliği ayrı hızı ayrı taşıyan arkadaş ayrı gerçekten süper hızlı güvenilir bir firma tavsiye ederim"},
{n:"Cemre can Uyar",t:"Dakikliği ve güvenilirliğiyle gönderilerimi her zaman tam zamanında, sorunsuzca teslim eden hakki beye tesekkuru bir borc bilirim.."},
{n:"Muhammet Tosunoğlu",t:"Tesadüfen buldum böyle bi hizmetten haberim yoktu kafede unuttuğum gözlüğümü hemen alıp getirdiler teşekkkürler"},
{n:"Tuğba Ertaş",t:"Evde unuttuğum kişisel eşyamı güven içinde teslim aldım güvenilir bi hizmet teşekkür ederim"},
{n:"Hakan Keçeli",t:"istanbul içi kargo için çok pratik ve hızlı çözüm oldu. İhtiyacı olana tavsiye ederim."},
{n:"Fatih Tosunoğlu",g:"Yerel Rehber · 10 yorum",t:"İnsanın ne zaman ihtiyac duyacagi belli olmuyor. Teşekkürler"}
];
var lang=(document.documentElement.lang||"tr").slice(0,2);
var L={tr:{h:"Teslimattan sonra yazılanlar",s:"Son yorumlardan bir seçki",p:"Önceki",x:"Sonraki"},
en:{h:"Written after delivery",s:"A selection of recent reviews (in Turkish)",p:"Previous",x:"Next"},
ar:{h:"كُتبت بعد التسليم",s:"مختارات من أحدث التقييمات (بالتركية)",p:"السابق",x:"التالي"}}[lang]||null;
L=L||{h:"Teslimattan sonra yazılanlar",s:"Son yorumlardan bir seçki",p:"Önceki",x:"Sonraki"};
var ecz=/eczane|ilac|pharmacy/i.test(location.pathname);
var list=R.slice().sort(function(a,b){return ecz?((b.e?1:0)-(a.e?1:0)):((a.e?1:0)-(b.e?1:0))});
var css=".kxrv{margin-top:10px;direction:ltr}.kxrv-hd{display:flex;align-items:center;gap:10px;margin:0 0 10px}.kxrv-st{color:#f5b301;font-size:18px;letter-spacing:1px}.kxrv-hd b{font-size:16px;color:var(--navy,#14293f)}.kxrv-hd small{display:block;color:var(--mute,#4f6076);font-size:13px}.kxrv-tr{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:2px 2px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none}.kxrv-tr::-webkit-scrollbar{display:none}.kxrv-c{flex:0 0 86%;max-width:360px;scroll-snap-align:start;background:var(--card,#fff);border:1px solid var(--line,#dbe4ee);border-radius:16px;padding:14px 16px;box-sizing:border-box}@media(min-width:720px){.kxrv-c{flex-basis:calc(33.333% - 8px)}}.kxrv-u{display:flex;align-items:center;gap:10px;margin-bottom:6px}.kxrv-a{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;flex:0 0 38px}.kxrv-n{font-weight:700;color:var(--navy,#14293f);font-size:15px;line-height:1.2}.kxrv-g{font-size:12px;color:var(--mute,#4f6076)}.kxrv-g:before{content:'★ ';color:#e8620a}.kxrv-c .kxrv-st{font-size:15px}.kxrv-t{margin:6px 0 0;font-size:15px;line-height:1.5;color:var(--tx,#14293f)}.kxrv-gl{float:right;font-size:12px;font-weight:700;color:#4285f4}.kxrv-nv{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:4px}.kxrv-nv button{width:34px;height:34px;border-radius:50%;border:1px solid var(--line,#dbe4ee);background:var(--card,#fff);color:var(--navy,#14293f);font-size:18px;cursor:pointer;line-height:1}.kxrv-d{display:flex;gap:5px}.kxrv-d i{width:7px;height:7px;border-radius:50%;background:var(--line,#dbe4ee)}.kxrv-d i.on{background:var(--acc,#ff7a1a)}";
var colors=["#1a73e8","#0f9d58","#e8620a","#7b1fa2","#c2185b","#00796b","#5d4037","#3949ab"];
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function init(){var E=((window.__kxAyar||{}).yorumlar||[]).filter(function(x){return x&&x.n&&x.t&&(!ecz||x.e||1)}).map(function(x){return{n:x.n,t:x.t,e:x.e,g:"Google yorumu"}});if(E.length&&!init.m){init.m=1;list=E.concat(list)}

var box=document.getElementById("kxReviews");if(!box)return;
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var h='<div class="kxrv" aria-label="'+esc(L.h)+'"><div class="kxrv-hd"><div><b>'+esc(L.h)+'</b><small>'+esc(L.s)+'</small></div></div><div class="kxrv-tr" tabindex="0">';
list.forEach(function(r,i){var c=colors[i%colors.length];
h+='<article class="kxrv-c"><div class="kxrv-u"><span class="kxrv-a" style="background:'+c+'" aria-hidden="true">'+esc(r.n.charAt(0).toLocaleUpperCase("tr"))+'</span><div><div class="kxrv-n">'+esc(r.n)+'</div>'+(r.g?'<div class="kxrv-g">'+esc(r.g)+'</div>':'')+'</div></div><span class="kxrv-gl">Google</span><span class="kxrv-st" aria-label="5/5">★★★★★</span><p class="kxrv-t" lang="tr">'+esc(r.t)+'</p></article>';});
h+='</div><div class="kxrv-nv"><button type="button" class="kxrv-p" aria-label="'+esc(L.p)+'">‹</button><div class="kxrv-d"></div><button type="button" class="kxrv-x" aria-label="'+esc(L.x)+'">›</button></div></div>';
box.innerHTML=h;
var tr=box.querySelector(".kxrv-tr"),cards=tr.children,dots=box.querySelector(".kxrv-d"),n=cards.length,cur=0,paused=false;
for(var i=0;i<n;i++){dots.appendChild(document.createElement("i"));}
function step(){return cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:tr.clientWidth}
function go(k){cur=(k+n)%n;tr.scrollTo({left:cur*step(),behavior:"smooth"});}
function mark(){var s=step();cur=Math.round(tr.scrollLeft/(s||1));[].forEach.call(dots.children,function(d,j){d.className=j===cur?"on":""});}
tr.addEventListener("scroll",function(){clearTimeout(tr._t);tr._t=setTimeout(mark,80)},{passive:true});
box.querySelector(".kxrv-p").onclick=function(){paused=true;go(cur-1)};
box.querySelector(".kxrv-x").onclick=function(){paused=true;go(cur+1)};
["touchstart","pointerdown","mouseenter","focusin"].forEach(function(ev){tr.addEventListener(ev,function(){paused=true},{passive:true})});
mark();
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!rm){setInterval(function(){if(!paused&&!document.hidden){var vis=tr.getBoundingClientRect();if(vis.bottom>0&&vis.top<innerHeight){var maxi=Math.round((tr.scrollWidth-tr.clientWidth)/(step()||1));go(cur>=maxi?0:cur+1);}}},4500);}
}
function wa(f){if(window.__kxAyar)return f();var d=0,g=function(){if(!d){d=1;f()}};document.addEventListener("kxayar",g);setTimeout(g,1500)}
function lazy(){var b=document.getElementById("kxReviews");if(!b)return;if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();wa(init)}},{rootMargin:"500px 0px"});io.observe(b)}else wa(init)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",lazy);else lazy();
})();
