(function(){
var R=[
{n:"Billy Bob",l:"fr",t:"Service impeccable, livraison sans probleme"},
{n:"Engin Karadas",t:"Fikitepede bulanan firmam için Beyazıt’tan çok acil evrak getirmem gerekiyordu bu firma yakınlarımda çıktı ulaşım sağladım istediğim sürede bana ulaştırdılar kendilerine teşekkür ediyorum çok memnun kaldım tavsiye ederim"},
{n:"Luay Salim",e:1,t:"Harika bir deneyimdi ve çok profesyonel bir hizmet! WhatsApp üzerinden yanıtları çok hızlıydı, en başından itibaren fiyatlar tamamen net ve şeffaftı. Kurye çok kısa sürede teslimatı gerçekleştirdi ve ilaçlarla birlikte resmi eczane fişini eksiksiz teslim etti. Hızlı geri dönüşleri ve güvenilir hizmetleri için çok teşekkür ederim, kesinlikle tavsiye ederim."},
{n:"Vildan Demirbaş",t:"Avcılardan aldırmam gereken bi dosya vardı yapay zeka önerisi ile bu firmayı buldum belirttiğim süreden daha kısa bir sürede küçük çamlıca iş adresime ulaştırdılar çok teşekkür ediyorum 🙏"},
{n:"Mustafa Kilic",t:"Kadikoy suadiye adresime maslak 42 ofiste unuttuğum leptopu 45 dk gibi bir sürede yetiştirdikleri için kendilerine çok teşekkür ediyorum. 🙏🙏🙏"},
{n:"SEMİH Örgev",t:"Bağcılarda anneme hediye gönderecektim yapay zekadan buldum hemen yardımcı oldular üsküdardan istediğim ürünü alıp istediğim adrese götürdüler gerçekten çok hızlı aksiyon alıyorlar tavsiye ederim.."},
{n:"Gökhan Arı",t:"Kadıköy Hasanpaşa dan çok acil motor parçası aldırmam gerekiyordu sağolsunlar yarım saatte Ataşehire getirdiler çok teşekkür ediyorum."},
{n:"Velin Kolev",l:"en",e:1,t:"Because I missed the pharmacies' operating hours, I started looking for ones that were open late. All the ones I found were kilometers away, and given my condition, it really wasn't advisable for me to try and get to one. However, while searching for an open pharmacy, I came across this service. I hadn't even imagined that something like this existed! I sent a message via WhatsApp, and within 5 minutes, the operator and I had sorted out the price, delivery time, and the medications I needed. Excellent service! The medicines arrived ahead of the scheduled time! This service could be a live saver!"},
{n:"Ayla Dumcel",t:"İstanbul’daki teyzeme bir hediye gönderecektim, kendim Bursa’da olduğum için İstanbul’da nasıl hallederim diye düşünüyordum. ChatGPT’ye İstanbul’da kurye önerisi sordum, Kuryetex’i önerdi. Sitesine baktım, fiyatları da gayet makul geldi. Teyzeme göndereceğim paketi ayarladım, en azından bu iş için ayrıca uğraşmak zorunda kalmadım. Emeği geçenlere teşekkürler ne diyim 😊"},
{n:"Burcu SAKA",e:1,t:"Hasta olan bir yakınıma ilaç ulaştırmam gerekiyordu. Bu uygulama sayesinde kolayca mümkün oldu. Tşk ederim."},
{n:"Efe Demir Özdemir",e:1,t:"Gerçekten harika bir hizmet! 💊🚀 İlaçlarımızı inanılmaz hızlı bir şekilde, sorunsuzca teslim ettiler. Özellikle böyle önemli ve acil durumlarda gösterdikleri hız ve özen gerçekten çok kıymetli. 🥹🙏🏻 İletişimleri, ilgileri ve profesyonel yaklaşımlarıyla bizi çok memnun ettiler. Gönül rahatlığıyla tavsiye ediyorum. Emeği geçen herkese çok teşekkürler! 💙✨"},
{n:"Buse Kılıç",t:"İşlerin gayet iyiyler destekleri için sonsuz teşekkürler"},
{n:"Sibel Çetin",t:"İstediğim ürünü hızlı bir şekilde bulup getirdiler, teşekkür ederim"},
{n:"Cömert Suölmez",t:"Muazzam ilgili, kibar bir işletme. Güvenle kuryetexi kullanabilirsiniz."},
{n:"Dilmurod Shamatov",t:"Akşam 2 olmasına rağmen Çok hızlı teslimat yaptılar teşekkür ederim"},
{n:"Seyhan Gökçe",t:"Paketimi zamanında ve sorunsuz yetiştirdiğiniz için teşekkür ederim 🙏🏼🙏🏼"},
{n:"Seher Erbil",t:"Gece otogardan otobüsü karşılayıp eşyalarımı alıp güvenli bir şekilde getirdiler. Planlama bilgi verme çok başarılı tavsiye ederim"},
{n:"Ahmet Karaduman",e:1,t:"kurye hizmetinden son derece memnun kaldık. İhtiyacımız olan ilacı çok kısa bir süre içerisinde temin ederek adresimize ulaştırdı. Kurye arkadaşımız son derece güler yüzlü, ilgili ve nazikti. Hem hızlı hem de güvenilir bir hizmet aldık. Özellikle ihtiyaç duyduğumuz bir anda bu kadar pratik ve sorunsuz bir şekilde hizmet alabilmek gerçekten çok değerli. Emeği geçen herkese ve özellikle kurye arkadaşımıza teşekkür ederiz. Kesinlikle tavsiye ediyoruz. Bundan sonra ihtiyaç duyduğumuzda gönül rahatlığıyla tercih edeceğimiz bir hizmet. 🙏"},
{n:"Nur Akata",t:"Mükemmel bir hizmet teşekkürler çok hızlı şekilde yardımcı oldular"},
{n:"Gamze Mulkut",e:1,t:"Evden çıkacak durumda, değilken ilaçlarımın bana ulaşması, muhteşem bir hizmet. Teşekkürler 🙏"},
{n:"Furkan OLEROĞLU",t:"Ümraniyede anneme anahtarı götürmem gerekiyordu tavsiye üzerine söylediler Kadıköy’den ümraniyeye o kadar hızlı ulaştırdılar ki sağolsunlar"},
{n:"Аigerim Seitmukhametova",t:"Kargo sürecinden çok memnun kaldım. İlgilenen kişi çok yardımcı oldu ve sürekli bilgi verdi. Paketim güvenli bir şekilde gönderildi ve tüm süreç boyunca benimle iletişim halinde oldular. Herhangi bir sorun yaşamadım. İlginiz ve yardımınız için çok teşekkür ederim. Kesinlikle tavsiye ederim. ⭐️"},
{n:"Onur Gündüz",t:"Sizin gibi güzel insanlarla çalışmaktan onur duyarım hızlı ve güvenilir hizmet emeğinize saglik tez zamanda yetiştiniz"},
{n:"Cansu Toker",t:"Böyle bir uygulama olduğunu ilk defa öğrendim ve inanılmaz memnun kaldım hemen getirdiler her şey için çok teşekkür ederiz"},
{n:"Selim Karaman",t:"Bi cihaz aldırdım dediğim vakitten daha hızlı geldi teşekkür ederim çok hızlı"},
{n:"Ferda Can",t:"Güler yüzlü, nazik ve oldukça ilgili bir kurye. Siparişimi özenle ve zamanında teslim etti. İşini severek yaptığı belli, kendisine güler yüzü ve güzel davranışları için teşekkür ederim. Böyle çalışanların sayısı artsın, kesinlikle tavsiye ederim. 🌸👏"},
{n:"Beytullah Soydaş",t:"Güvenilir bir firma ve ürünü zamanında teslim etti teşekkürler"},
{n:"Ugur Cabar",t:"Fikirtepede bulunan giyim üzerine olan işletmem için yeni anlaşma sağladık ürünleri laleli depomuzdan buraya anında ulaştırıyorlar kendileri içinde çok başarılı emeklerine sağlık teşekkür ediyorum"},
{n:"Hüseyin Bülbül",t:"Kalite ve dikkatli zamanında teslimat için teşekkür ederim"},
{n:"CraZyBuGuS",t:"Çok kaliteli ve öz verili hızlı teslimat başarıların devamını dilerim 😇"},
{n:"Bilal Ceylan",t:"Acil bir kargom vardı nasıl göndereceğimi düşünürken bi anda karşıma çıktı gerçekten çok güzel bir işletme çok teşekkürler"},
{n:"Mustafa Erdogan",t:"Çok hızlı ve güvenilir teslimat teşekkürler"},
{n:"Samet Şinik",t:"gayet güvenilir bir işletme gece anahtarımı başka konumdan getirdiler çok sağolsunlar"},
{n:"Ruveyda Deniz",t:"kaliteli hizmet ihtiyacım olduğu zamanda yardımcı oldular teşekkürler"},
{n:"sayit esen",t:"Güzel iletişim ile teslimatımı sorunsuz halletiler"},
{n:"Muhammed Isa",g:"Yerel Rehber",l:"en",t:"Absolutely amazing service! I chose Kuryetex to send a package in Istanbul and everything was handled smoothly and professionally in just 2 hours! Super fast, reliable and efficient. Extremely satisfied. Highly recommend!"},
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
var list=ecz?R.filter(function(r){return r.e}):R.slice().sort(function(a,b){return ecz?((b.e?1:0)-(a.e?1:0)):((a.e?1:0)-(b.e?1:0))});
var D={"Ruveyda Deniz":"2026-10-10","sayit esen":"2026-10-10","Ferit Engin":"2026-10-13","Samet Şinik":"2026-10-13","Mustafa Erdogan":"2026-10-25","Fatih Tosunoğlu":"2026-10-26","Cemre can Uyar":"2026-10-26","Hüseyin Bülbül":"2026-10-26","CraZyBuGuS":"2026-10-26","Muhammet Tosunoğlu":"2026-10-26","Bilal Ceylan":"2026-10-26","Tuğba Ertaş":"2026-10-27","Fırat Can":"2026-10-27","Gulasal Hudayarova":"2026-10-28","Selim Karaman":"2026-10-29","Ferda Can":"2026-10-29","Beytullah Soydaş":"2026-10-29","Samet Yavuz":"2026-10-29","Ugur Cabar":"2026-10-29","ahmet yavuz":"2026-10-29","Mehmet Akyel":"2026-10-29","Berre Şahin":"2026-10-29","yaren karaketir":"2026-10-29","Çagri Ozture":"2026-10-30","Onur Gündüz":"2026-10-30","Cansu Toker":"2026-10-30","Hakan Keçeli":"2026-10-30","Sena Peker":"2026-11-01","Yunus turnagöl":"2026-11-01","İrem Tetik":"2026-11-03","Gökçe GÜRPINAR":"2026-11-03","Nur Akata":"2026-11-04","Gamze Mulkut":"2026-11-04","Furkan OLEROĞLU":"2026-11-04","Аigerim Seitmukhametova":"2026-11-04","Ahmet Karaduman":"2026-11-05","Oğuz Özvarlık":"2026-11-06","Seyhan Gökçe":"2026-11-06","Seher Erbil":"2026-11-06","Cüneyt Varup":"2026-11-07","Sıla Selma Başer":"2026-11-08","Hasan Hatipoglu":"2026-11-08","Erkut Tahtali":"2026-11-08","Armiiies Arman":"2026-11-08","Cömert Suölmez":"2026-11-09","Muhammed Isa":"2026-11-09","Dilmurod Shamatov":"2026-11-09","Buse Kılıç":"2026-11-12","Sibel Çetin":"2026-11-12","Efe Demir Özdemir":"2026-11-13","Burcu SAKA":"2026-11-18","Ayla Dumcel":"2026-11-19","SEMİH Örgev":"2026-11-20","Gökhan Arı":"2026-11-20","Velin Kolev":"2026-11-20","Vildan Demirbaş":"2026-11-21","Mustafa Kilic":"2026-11-21","Billy Bob":"2026-11-22","Engin Karadas":"2026-11-22","Luay Salim":"2026-11-22"};
var M={tr:{more:"Devamını oku",less:"Daha az göster",g:"Google'da yazıldı"},en:{more:"Read more",less:"Show less",g:"Posted on Google"},ar:{more:"اقرأ المزيد",less:"عرض أقل",g:"نُشر على Google"}}[lang]||{more:"Devamını oku",less:"Daha az göster",g:"Google'da yazıldı"};
var GL='<svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.8c4.3-4 6.9-9.9 6.9-17.2z"/><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.8c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z"/></svg>';
var css=".kxrv{margin-top:10px;direction:ltr;position:relative}.kxrv-hd{display:flex;align-items:center;gap:10px;margin:0 0 12px;background:#fff;border:1px solid #e6eaf0;border-radius:12px;padding:10px 14px}.kxrv-hd svg{width:30px;height:30px;flex:0 0 30px}.kxrv-hd b{display:block;font-size:16px;color:#202124}.kxrv-hd small{display:block;color:#5f6368;font-size:13px}.kxrv-hs{color:#fbbc04;font-size:17px;letter-spacing:1px;margin-left:auto;white-space:nowrap}.kxrv-w{position:relative}.kxrv-tr{display:flex;align-items:flex-start;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 10px;-webkit-overflow-scrolling:touch;scrollbar-width:none}.kxrv-tr::-webkit-scrollbar{display:none}.kxrv-c{flex:0 0 84%;max-width:340px;scroll-snap-align:start;background:#fff;border:1px solid #e6eaf0;border-radius:12px;padding:14px 16px 12px;box-sizing:border-box;box-shadow:0 1px 3px rgba(32,33,36,.08);position:relative}@media(min-width:720px){.kxrv-c{flex-basis:calc(33.333% - 8px)}}.kxrv-u{display:flex;align-items:center;gap:10px;padding-right:24px}.kxrv-u svg{position:absolute;top:14px;right:14px}.kxrv-a{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:17px;flex:0 0 40px}.kxrv-n{font-weight:700;color:#202124;font-size:15px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}.kxrv-dt{font-size:12.5px;color:#70757a;margin-top:1px}.kxrv-s{display:flex;align-items:center;gap:6px;margin:10px 0 4px}.kxrv-s span{color:#fbbc04;font-size:17px;letter-spacing:1px;line-height:1}.kxrv-s i{width:15px;height:15px;border-radius:50%;background:#1a73e8;color:#fff;font-size:10px;font-style:normal;display:inline-flex;align-items:center;justify-content:center}.kxrv-t{margin:0;font-size:14.5px;line-height:1.5;color:#3c4043;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;min-height:108px}.kxrv-c.op .kxrv-t{-webkit-line-clamp:unset;display:block}.kxrv-m{background:none;border:0;padding:4px 0 0;color:#1a73e8;font-size:13.5px;font-weight:600;cursor:pointer}.kxrv-nv{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:2px}.kxrv-ar{width:36px;height:36px;border-radius:50%;border:1px solid #dadce0;background:#fff;color:#3c4043;font-size:20px;line-height:1;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12)}.kxrv-ct{font-size:13px;color:#70757a;min-width:56px;text-align:center}";
var colors=["#1557b0","#0b7a43","#b4470a","#7b1fa2","#ad1457","#00695c","#5d4037","#3949ab"];
function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function fd(s){try{return new Date(s+"T12:00:00").toLocaleDateString(lang==="ar"?"ar":lang==="en"?"en-GB":"tr-TR",{day:"numeric",month:"long",year:"numeric"})}catch(e){return s}}
function init(){var E=((window.__kxAyar||{}).yorumlar||[]).filter(function(x){return x&&x.n&&x.t}).map(function(x){return{n:x.n,t:x.t,e:x.e,d:x.d}});if(ecz)E=E.filter(function(x){return x.e||/ila[cç]|eczane|nöbetçi|pharmac|medic|دواء|صيدل/i.test(x.t)});if(E.length&&!init.m){init.m=1;list=E.concat(list)}
var box=document.getElementById("kxReviews");if(!box)return;
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
var h='<div class="kxrv" aria-label="'+esc(L.h)+'"><div class="kxrv-hd">'+GL+'<div><b>'+esc(L.h)+'</b><small>'+esc(M.g)+'</small></div></div><div class="kxrv-w"><div class="kxrv-tr" tabindex="0">';
list.forEach(function(r,i){var c=colors[i%colors.length],d=r.d||D[r.n];
h+='<article class="kxrv-c"><div class="kxrv-u"><span class="kxrv-a" style="background:'+c+'" aria-hidden="true">'+esc(r.n.charAt(0).toLocaleUpperCase("tr"))+'</span><div><div class="kxrv-n">'+esc(r.n)+'</div>'+(d?'<div class="kxrv-dt">'+esc(fd(d))+'</div>':'')+'</div>'+GL+'</div><div class="kxrv-s"><span aria-label="5/5">★★★★★</span><i aria-hidden="true">✓</i></div><p class="kxrv-t" lang="'+(r.l||"tr")+'">'+esc(r.t)+'</p><button type="button" class="kxrv-m" style="visibility:hidden">'+esc(M.more)+'</button></article>';});
h+='</div></div><div class="kxrv-nv"><button type="button" class="kxrv-ar p" aria-label="'+esc(L.p)+'">‹</button><span class="kxrv-ct" aria-live="polite"></span><button type="button" class="kxrv-ar x" aria-label="'+esc(L.x)+'">›</button></div></div>';
box.innerHTML=h;
var tr=box.querySelector(".kxrv-tr"),cards=tr.children,ct=box.querySelector(".kxrv-ct"),n=cards.length,cur=0,paused=false;
[].forEach.call(cards,function(c){var p=c.querySelector(".kxrv-t"),b=c.querySelector(".kxrv-m");if(p.scrollHeight>p.clientHeight+4){b.style.visibility="visible";b.onclick=function(){paused=true;var o=c.classList.toggle("op");b.textContent=o?M.less:M.more}}});
function step(){return cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:tr.clientWidth}
function go(k){cur=(k+n)%n;tr.scrollTo({left:cur*step(),behavior:"smooth"});}
function mark(){var s=step();cur=Math.round(tr.scrollLeft/(s||1));ct.textContent=(cur+1)+" / "+n}
tr.addEventListener("scroll",function(){clearTimeout(tr._t);tr._t=setTimeout(mark,80)},{passive:true});
box.querySelector(".kxrv-ar.p").onclick=function(){paused=true;go(cur-1)};
box.querySelector(".kxrv-ar.x").onclick=function(){paused=true;go(cur+1)};
["touchstart","pointerdown","mouseenter","focusin"].forEach(function(ev){tr.addEventListener(ev,function(){paused=true},{passive:true})});
mark();
var rm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!rm){setInterval(function(){if(!paused&&!document.hidden){var vis=tr.getBoundingClientRect();if(vis.bottom>0&&vis.top<innerHeight){var maxi=Math.round((tr.scrollWidth-tr.clientWidth)/(step()||1));go(cur>=maxi?0:cur+1);}}},5000);}
}
function wa(f){if(window.__kxAyar)return f();var d=0,g=function(){if(!d){d=1;f()}};document.addEventListener("kxayar",g);setTimeout(g,1500)}
function lazy(){var b=document.getElementById("kxReviews");if(!b)return;if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();wa(init)}},{rootMargin:"500px 0px"});io.observe(b)}else wa(init)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",lazy);else lazy();
})();
