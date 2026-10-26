/* KuryeTEX ana sayfa filmi: arenada teslimat, kutuların patlayıp harflere dönüşmesi (three.js r128) */
;(function(){var host=document.querySelector('.kxfilm');if(!host)return;
function go(){if(!window.THREE)return;try{run()}catch(e){console.warn(e)}}
if(window.THREE)go();else{var sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';sc.async=true;sc.onload=go;document.head.appendChild(sc)}
function run(){
var T=THREE,PI=Math.PI,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var NAVY=0x1f3c88,ORG=0xff7a1a,FONT='"Archivo Black","Arial Black",Arial';
var WORD='KURYETEX'.split(''),LCOL=[NAVY,NAVY,NAVY,NAVY,NAVY,ORG,ORG,ORG];
function cl(x){return Math.max(0,Math.min(1,x))}
function ease(x){x=cl(x);return x*x*(3-2*x)}
function seg(t,a,b){return ease((t-a)/(b-a))}
function V(x,y,z){return new T.Vector3(x,y||0,z||0)}
function lerpV(a,b,u){return a.clone().lerp(b,u)}
function arcV(a,b,u,h){var p=lerpV(a,b,u);p.y+=Math.sin(u*PI)*h;return p}
function faceTo(a,b){return Math.atan2(b.x-a.x,b.z-a.z)}
function ct(w,h,f){var c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);var t=new T.CanvasTexture(c);t.anisotropy=4;return t}
function M(c,o){return new T.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:.05},o||{}))}
function hex(c){return '#'+c.toString(16).padStart(6,'0')}
function world(s,a,b,g){s.background=ct(4,256,function(x,w,h){var gr=x.createLinearGradient(0,0,0,h);gr.addColorStop(0,a);gr.addColorStop(1,b);x.fillStyle=gr;x.fillRect(0,0,w,h)});
 s.add(new T.HemisphereLight(0xffffff,0x8aa0b8,.75));var d=new T.DirectionalLight(0xffffff,.7);d.position.set(10,22,14);s.add(d);
 if(g!==false){var gr=new T.Mesh(new T.PlaneGeometry(600,600),M(g||0xbfe0a8,{roughness:1}));gr.rotation.x=-PI/2;gr.position.y=-.02;s.add(gr)}}
function letterTex(ch,col){return ct(256,358,function(x,w,h){x.fillStyle=hex(col);x.fillRect(0,0,w,h);x.fillStyle='#fff';x.font='900 200px '+FONT;x.textAlign='center';x.textBaseline='middle';x.fillText(ch,w/2,h*.62)})}
function letter(ch,col){var g=new T.Group(),side=M(col,{roughness:.4}),tx=new T.MeshStandardMaterial({map:letterTex(ch,col),roughness:.4});
 var body=new T.Mesh(new T.BoxGeometry(1,1.4,.55),[side,side,side,side,tx,tx]);body.position.y=1.15;g.add(body);
 var wm=new T.MeshBasicMaterial({color:0xffffff}),bm=new T.MeshBasicMaterial({color:0x111111}),eyes=new T.Group();
 [-.2,.2].forEach(function(x){var e=new T.Mesh(new T.SphereGeometry(.12,14,10),wm);e.position.set(x,0,0);eyes.add(e);var p=new T.Mesh(new T.SphereGeometry(.06,10,8),bm);p.position.set(x,0,.09);eyes.add(p)});
 eyes.position.set(0,.55,.27);body.add(eyes);
 var lm=M(0x1b2433),legs=[],arms=[];
 [-.22,.22].forEach(function(x){var p=new T.Group();p.position.set(x,.45,0);var l=new T.Mesh(new T.CylinderGeometry(.07,.07,.42,8),lm);l.position.y=-.21;p.add(l);var f=new T.Mesh(new T.BoxGeometry(.18,.08,.28),lm);f.position.set(0,-.43,.06);p.add(f);g.add(p);legs.push(p)});
 [-.56,.56].forEach(function(x){var p=new T.Group();p.position.set(x,1.35,0);var a=new T.Mesh(new T.CylinderGeometry(.06,.06,.45,8),lm);a.position.y=-.22;p.add(a);var hd=new T.Mesh(new T.SphereGeometry(.08,8,6),M(0xffffff));hd.position.y=-.46;p.add(hd);g.add(p);arms.push(p)});
 var sh=new T.Mesh(new T.CircleGeometry(.55,20),new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.16,depthWrite:false}));sh.rotation.x=-PI/2;sh.position.y=.02;g.add(sh);
 var carry=new T.Group();carry.position.set(0,2.08,0);g.add(carry);
 g.userData={legs:legs,arms:arms,carry:carry,body:body,sh:sh};return g}
function run(L,t,k){k=k||0;var a=Math.sin(t*14)*.8*k;var u=L.userData;u.legs[0].rotation.x=a;u.legs[1].rotation.x=-a;u.arms[0].rotation.x=-a;u.arms[1].rotation.x=a;u.body.position.y=1.15+Math.abs(Math.sin(t*14))*.07*k;u.body.rotation.z=0}
function cheer(L,t,k){var u=L.userData;u.arms[0].rotation.z=-2.4*k;u.arms[1].rotation.z=2.4*k}
function sit(L,on){L.userData.legs.forEach(function(l){l.visible=!on});L.userData.sh.visible=!on}
function envelope(){var g=new T.Group();g.add(new T.Mesh(new T.BoxGeometry(.62,.06,.44),M(0xffffff)));var f=new T.Mesh(new T.BoxGeometry(.63,.07,.08),M(ORG));g.add(f);g.rotation.y=.3;return g}
function parcel(s){var g=new T.Group();g.add(new T.Mesh(new T.BoxGeometry(.55,.48,.55),M(0xd9a066)));var tp=new T.Mesh(new T.BoxGeometry(.57,.49,.12),M(0xfff1d6));g.add(tp);g.scale.setScalar(s||1);return g}
function pin(col){var g=new T.Group(),m=M(col||ORG,{roughness:.35,emissive:col||ORG,emissiveIntensity:.15});var c=new T.Mesh(new T.ConeGeometry(.35,.9,20),m);c.rotation.x=PI;c.position.y=.45;var h=new T.Mesh(new T.SphereGeometry(.4,20,14),m);h.position.y=1.05;var d=new T.Mesh(new T.SphereGeometry(.17,12,10),new T.MeshBasicMaterial({color:0xffffff}));d.position.set(0,1.05,.28);g.add(c,h,d);return g}
function wheel(r,w,col){var m=new T.Mesh(new T.CylinderGeometry(r,r,w,18),M(col||0x1b1f27,{roughness:.9}));m.rotation.x=PI/2;var hub=new T.Mesh(new T.CylinderGeometry(r*.45,r*.45,w+.02,12),M(0xd7dde4,{metalness:.5,roughness:.3}));hub.rotation.x=PI/2;var g=new T.Group();g.add(m,hub);return g}
function ring(r,tube,col){var w=new T.Mesh(new T.TorusGeometry(r,tube,8,28),M(col||0x1b1f27,{roughness:.9}));return w}
function confetti(s,origin,T0,n){var cols=[0xff7a1a,0x1f3c88,0xffd23f,0xffffff,0xd62828,0x2ec4b6],g=new T.PlaneGeometry(.18,.1),list=[],rr=rnd(9);
 for(var i=0;i<(n||110);i++){var m=new T.Mesh(g,new T.MeshBasicMaterial({color:cols[i%cols.length],side:T.DoubleSide}));m.visible=false;s.add(m);var a=rr()*PI*2,sp=3+rr()*6;list.push({m:m,v:V(Math.cos(a)*sp*.6,6+rr()*7,Math.sin(a)*sp*.6),r:V(rr()*6,rr()*6,rr()*6)})}
 return function(t){var tau=t-T0;list.forEach(function(o){if(tau<0||tau>3.2){o.m.visible=false;return}o.m.visible=true;o.m.position.set(origin.x+o.v.x*tau,origin.y+o.v.y*tau-4.9*tau*tau*.55,origin.z+o.v.z*tau);if(o.m.position.y<0)o.m.position.y=0;o.m.rotation.set(o.r.x*tau,o.r.y*tau,o.r.z*tau)})}}
function rnd(s){return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}}
function makeLetters(s){var L=WORD.map(function(c,i){var l=letter(c,LCOL[i]);s.add(l);return l});return L}
function FIN(i,cx,cz,y){return V(cx+(i-3.5)*1.32,y||0,cz)}
function finale(L,t,start,end,from,cx,cz,y,face){ // from: array of positions at time start
 L.forEach(function(l,i){var dl=i*.08,u=seg(t,start+dl,end+dl-.3),f=FIN(i,cx,cz,y);var p=arcV(from[i],f,u,1.6*(u>0&&u<1?1:0));l.position.copy(p);
  if(u<1){l.rotation.y=faceTo(from[i],f);run(l,t,u>0?1:0)}else{l.rotation.y=face||0;run(l,t,0);var w=t-end-i*.12;l.position.y=(y||0)+(w>0&&w<.6?Math.sin(w/.6*PI)*.8:0);cheer(l,t,w>0&&w<.6?1:0)}})}
function camLook(cam,p,l){var d=p.clone().sub(l).multiplyScalar(window.__KXK||1);cam.position.copy(l).add(d);cam.lookAt(l)}
function blendCam(cam,t,a,b,A,B,u){camLook(cam,lerpV(A[0],B[0],u),lerpV(A[1],B[1],u))}
function tree(s,x,z,k){var g=new T.Group();var tr=new T.Mesh(new T.CylinderGeometry(.12,.16,.8,6),M(0x8a6a4a));tr.position.y=.4;var c=new T.Mesh(new T.IcosahedronGeometry(.7,0),M(0x6fae5f,{flatShading:true}));c.position.y=1.3;g.add(tr,c);g.position.set(x,0,z);g.scale.setScalar(k||1);s.add(g)}
function house(s,x,z,w,h,d,col,roof){var b=new T.Mesh(new T.BoxGeometry(w,h,d),M(col));b.position.set(x,h/2,z);s.add(b);if(roof){var r=new T.Mesh(new T.ConeGeometry(Math.max(w,d)*.75,1,4),M(roof));r.rotation.y=PI/4;r.position.set(x,h+.5,z);r.scale.set(w/Math.max(w,d),1,d/Math.max(w,d));s.add(r)}return b}

function car(col){var g=new T.Group();var b=new T.Mesh(new T.BoxGeometry(2.4,.55,1.2),M(col,{roughness:.35,metalness:.3}));b.position.y=.6;g.add(b);var c=new T.Mesh(new T.BoxGeometry(1.1,.42,1.05),M(0x9fc3e6,{roughness:.2,metalness:.4}));c.position.set(-.15,1.08,0);g.add(c);var s=new T.Mesh(new T.BoxGeometry(.5,.08,1.25),M(0x222222));s.position.set(-1.25,.98,0);g.add(s);var W=[];[[.8,.6],[.8,-.6],[-.8,.6],[-.8,-.6]].forEach(function(p){var w=wheel(.3,.22);w.position.set(p[0],.32,p[1]);g.add(w);W.push(w)});g.userData={seat:V(-.15,.85,0),W:W,k:.55};return g}
function moto2(col){var g=new T.Group();var W=[];[-.55,.55].forEach(function(x){var w=ring(.3,.1);w.position.set(x,.4,0);g.add(w);W.push(w)});var b=new T.Mesh(new T.BoxGeometry(.95,.28,.3),M(col,{roughness:.3,metalness:.3}));b.position.y=.7;g.add(b);var f=new T.Mesh(new T.BoxGeometry(.18,.5,.26),M(col));f.position.set(.5,.85,0);f.rotation.z=-.35;g.add(f);g.userData={seat:V(-.1,.82,0),W:W,k:.55};return g}
function bike(col){var g=new T.Group();var W=[];[-.6,.6].forEach(function(x){var w=ring(.38,.035,0x222222);w.position.set(x,.42,0);g.add(w);W.push(w)});var fm=M(col,{metalness:.4,roughness:.3});[[0,.6,1.2,0],[-.3,.62,.7,1.1],[.3,.62,.7,-1.1]].forEach(function(a){var c=new T.Mesh(new T.CylinderGeometry(.04,.04,a[2],6),fm);c.position.set(a[0],a[1],0);c.rotation.z=a[3]?a[3]:PI/2;g.add(c)});g.userData={seat:V(-.15,.78,0),W:W,k:.5,legs:true};return g}
function van(col){var g=new T.Group();var cg=new T.Mesh(new T.BoxGeometry(1.9,1.15,1.25),M(0xffffff));cg.position.set(-.45,1,0);g.add(cg);var st=new T.Mesh(new T.BoxGeometry(1.92,.25,1.27),M(col));st.position.set(-.45,.95,0);g.add(st);var cb=new T.Mesh(new T.BoxGeometry(.85,.85,1.2),M(col,{roughness:.35}));cb.position.set(.95,.85,0);g.add(cb);var ws=new T.Mesh(new T.BoxGeometry(.05,.4,1),M(0x9fc3e6,{roughness:.2}));ws.position.set(1.38,1.02,0);g.add(ws);var W=[];[[.95,.62],[.95,-.62],[-.9,.62],[-.9,-.62]].forEach(function(p){var w=wheel(.3,.22);w.position.set(p[0],.32,p[1]);g.add(w);W.push(w)});g.userData={seat:V(-.45,1.58,0),W:W,k:.55,legs:true};return g}
function scooter(col){var g=moto2(col);g.scale.setScalar(.85);g.userData.seat=V(-.1,.75,0);return g}
/* ===== KuryeTEX Logo Filmi: arena teslimatı → arena yarışı → büyüme, kutudan çıkış → dijital logo finali ===== */
var LOOP=21;
function glyphTex(ch,i){return ct(256,320,function(x,w,h){x.clearRect(0,0,w,h);x.save();x.translate(w/2,h*.56);x.transform(1,0,-.22,1,0,0);x.font='900 250px '+FONT;x.textAlign='center';x.textBaseline='middle';
 if(i<5){x.fillStyle='#173a7a'}else{var g=x.createLinearGradient(0,-120,0,120);g.addColorStop(0,'#ffb347');g.addColorStop(.55,'#ff7a1a');g.addColorStop(1,'#e8520a');x.fillStyle=g}
 x.lineWidth=10;x.strokeStyle='rgba(255,255,255,.9)';x.strokeText(ch,0,0);x.fillText(ch,0,0);x.restore()})}
function build(s,cam,fx){
 world(s,'#8fd0f5','#eef8ff',0xd9e8c8);
 var ft=ct(1024,1024,function(x,w,h){x.fillStyle='#f3e8d2';x.fillRect(0,0,w,h);
  x.fillStyle='#6fb8e6';x.beginPath();x.moveTo(470,0);x.bezierCurveTo(560,250,430,520,560,760);x.lineTo(610,1024);x.lineTo(700,1024);x.bezierCurveTo(630,760,700,500,600,250);x.lineTo(565,0);x.fill();
  x.beginPath();x.moveTo(505,420);x.bezierCurveTo(400,410,300,350,180,330);x.lineTo(185,360);x.bezierCurveTo(300,390,400,455,512,470);x.fill();
  x.fillStyle='rgba(31,60,136,.5)';x.font='900 40px '+FONT;x.fillText('AVRUPA',250,600);x.fillText('ANADOLU',600,470);
});
 var fl=new T.Mesh(new T.CircleGeometry(14,72),new T.MeshStandardMaterial({map:ft,roughness:.9}));fl.rotation.x=-PI/2;fl.position.y=.01;s.add(fl);
 var at=ct(1024,128,function(x,w,h){x.fillStyle='#ead7b6';x.fillRect(0,0,w,h);x.fillStyle='#c9ad85';for(var i=0;i<w;i+=64){x.beginPath();x.moveTo(i+12,h);x.lineTo(i+12,50);x.arc(i+32,50,20,PI,0);x.lineTo(i+52,h);x.fill()}x.fillStyle='#d8bf98';x.fillRect(0,0,w,14)});at.wrapS=T.RepeatWrapping;at.repeat.set(4,1);
 var wall=new T.Mesh(new T.CylinderGeometry(14.2,14.2,2.6,72,1,true),new T.MeshStandardMaterial({map:at,side:T.DoubleSide,roughness:.9}));wall.position.y=1.3;s.add(wall);
 [[15.6,4.2,0xe6d2ae],[17.2,5.8,0xdcc59d],[18.8,7.4,0xd2b98f]].forEach(function(a){var c=new T.Mesh(new T.CylinderGeometry(a[0],a[0],a[1],72,1,true),M(a[2],{side:T.DoubleSide}));c.position.y=a[1]/2;s.add(c);var top=new T.Mesh(new T.RingGeometry(a[0]-1.6,a[0],72),M(a[2],{side:T.DoubleSide}));top.rotation.x=-PI/2;top.position.y=a[1];s.add(top)});
 var sp=[],sc=[],rr=rnd(3);for(var i=0;i<800;i++){var a=rr()*PI*2,k=Math.floor(rr()*3),rad=[15,16.6,18.2][k]+rr()*.4,y=[2.7,4.3,5.9][k]+.25;sp.push(Math.cos(a)*rad,y,Math.sin(a)*rad);var c=new T.Color([0xff7a1a,0x1f3c88,0xffffff,0xd62828,0xffd23f][Math.floor(rr()*5)]);sc.push(c.r,c.g,c.b)}
 var sg=new T.BufferGeometry();sg.setAttribute('position',new T.Float32BufferAttribute(sp,3));sg.setAttribute('color',new T.Float32BufferAttribute(sc,3));var fans=new T.Points(sg,new T.PointsMaterial({size:.35,vertexColors:true}));s.add(fans);
 var PA=[.5,2.1,3.7,5.3],PR=7,pins=PA.map(function(a,i){var p=pin(i%2?NAVY:ORG);p.position.set(Math.cos(a)*PR,0,Math.sin(a)*PR);s.add(p);return p});
 // harfler + kırılan kutu panelleri + logo harf yüzleri
 var L=makeLetters(s),env=L.map(function(l){var e=envelope();l.userData.carry.add(e);return e});
 var GL=[],SH=[];L.forEach(function(l,i){var gm=new T.Mesh(new T.PlaneGeometry(1.25,1.56),new T.MeshBasicMaterial({map:glyphTex(WORD[i],i),transparent:true,depthWrite:false}));gm.visible=false;s.add(gm);GL.push(gm);
  var shards=[];var cm=M(LCOL[i],{roughness:.4,side:T.DoubleSide});[[0,0,.28,0],[0,0,-.28,PI],[.5,0,0,PI/2],[-.5,0,0,-PI/2],[0,.7,0,'t'],[0,-.7,0,'b']].forEach(function(f){var g=f[3]==='t'||f[3]==='b'?new T.PlaneGeometry(1,.55):(f[3]===0||f[3]===PI?new T.PlaneGeometry(1,1.4):new T.PlaneGeometry(.55,1.4));var m=new T.Mesh(g,cm);m.visible=false;s.add(m);shards.push({m:m,o:V(f[0],f[1],f[2]),r:f[3]})});SH.push(shards)});
 var pairs=[[0,3],[1,2],[4,5],[6,7]],start=L.map(function(l,i){var a=i/8*PI*2;return V(Math.cos(a)*2.6,0,Math.sin(a)*2.6)});
 var conf=confetti(s,V(0,1,3),10.9,160),conf2=confetti(s,V(0,2,3.2),12.7,180);
 function arenaPos(i,t){var p=pairs.findIndex(function(pr){return pr.indexOf(i)>=0}),side=pairs[p].indexOf(i),pa=PA[p],a0=i/8*PI*2;
  if(t<1.2){var u=seg(t,.1+i*.05,1.1);return{p:arcV(V(0,0,0),start[i],u,2.2),f:faceTo(V(0,0,0),start[i]),run:0,bump:0}}
  var u2=seg(t,1.4,7.4),ang=a0+(pa-a0)*u2,rad=2.6+(PR-1.1-2.6)*u2,bump=Math.exp(-Math.pow((u2-.5)/.06,2));
  var off=(side?1:-1)*(.75-.6*bump);var pos=V(Math.cos(ang)*rad,0,Math.sin(ang)*rad).add(V(-Math.sin(ang),0,Math.cos(ang)).multiplyScalar(off));pos.y+=bump*.4;
  return{p:pos,f:faceTo(pos,V(Math.cos(pa)*PR,0,Math.sin(pa)*PR)),run:u2<1?1:0,bump:bump*(side?-1:1)}}
 return function(t){
  L.forEach(function(l,i){var ud=l.userData;l.visible=t<12.7;ud.body.visible=true;l.scale.setScalar(1);sit(l,false);ud.body.rotation.z=0;cheer(l,t,0);ud.arms.forEach(function(g){g.visible=true});
   if(t<8.6){var A=arenaPos(i,t);l.position.copy(A.p);l.rotation.y=A.f;run(l,t,A.run);ud.body.rotation.z=A.bump*.35;env[i].visible=t<7.5;if(t>7.4){cheer(l,t,1);l.position.y=Math.abs(Math.sin((t-7.4)*PI*2))*.45}}
   else{env[i].visible=false;var from=arenaPos(i,8.59).p,s2=seg(t,11,12.5),sc=1+.3*s2,f=V((i-3.5)*1.32*sc,0,3);var u3=seg(t,8.7+i*.07,10.7);var p3=arcV(from,f,u3,1.8);l.position.copy(p3);l.scale.setScalar(sc);l.rotation.y=u3<1?faceTo(from,f):0;run(l,t,u3>0&&u3<1?1:0);if(u3>=1){var w=t-10.7-i*.08;l.position.y=w>0&&w<.5?Math.sin(w/.5*PI)*.6:0;cheer(l,t,w>0&&w<.5?1:0)}}
  });
  L.forEach(function(l,i){var b=l.userData.body;var on=t>=12.5;b.visible=!on;l.userData.legs.forEach(function(g){g.visible=!on});l.userData.arms.forEach(function(g){g.visible=!on});l.userData.sh.visible=!on;
   var sc=l.scale.x,c=V(l.position.x,l.position.y+1.15*sc,l.position.z);
   SH[i].forEach(function(sd){var w=t-12.5;if(w<0||w>1){sd.m.visible=false;return}sd.m.visible=true;var o=sd.o.clone().multiplyScalar(sc);var dir=sd.o.clone().normalize();sd.m.position.copy(c).add(o).add(dir.multiplyScalar(w*4.5)).add(V(0,-5*w*w+1.5*w,-w*2));sd.m.scale.setScalar(sc*.7*Math.max(0,1-w/.9));
    if(sd.r==='t'||sd.r==='b'){sd.m.rotation.set(-PI/2+w*4,0,w*3)}else sd.m.rotation.set(w*3,sd.r+w*5,w*2)});
   var g=GL[i],w2=t-12.55;g.visible=w2>0;if(g.visible){var tight=seg(t,13.1,13.8),x=(i-3.5)*(1.32*1.3*(1-tight)+1.12*1.45*tight);var tau=Math.max(0,t-14);var wave=Math.sin(tau*3.2-i*.55)*.18*seg(t,14,14.6);
    g.position.set(x,1.75+Math.sin(cl(w2/.5)*PI)*.3+wave,3.2);g.rotation.z=Math.sin(tau*2.2-i*.5)*.06*seg(t,14,14.6);g.rotation.y=Math.sin(tau*1.1)*.25*seg(t,14.6,15.4);var pop=1+Math.max(0,Math.sin((tau-i*.18)*2.6))*.06*seg(t,14,14.6);g.scale.setScalar(1.45*(.9+.1*cl(w2/.3))*pop);g.material.opacity=1}});
  pins.forEach(function(p,i){var w=t-7.35;p.scale.setScalar((1+(w>0&&w<.8?Math.sin(w/.8*PI)*.6:0))*(1-seg(t,9,9.8)));p.visible=t<9.9;p.rotation.y=t*.8});
  conf(t);conf2(t);
  var u;
  if(t<8.6){var ca=.55+t*.08;camLook(cam,V(Math.cos(ca)*22,14,Math.sin(ca)*22),V(0,0,0))}
  else if(t<11){u=seg(t,8.6,10.8);var ca2=.55+8.6*.08;blendCam(cam,t,0,0,[V(Math.cos(ca2)*22,14,Math.sin(ca2)*22),V(0,0,0)],[V(0,4.2,15),V(0,1.2,3)],u)}
  else{u=seg(t,11,12.5);blendCam(cam,t,0,0,[V(0,4.2,15),V(0,1.2,3)],[V(0,2.6,12.6),V(0,1.75,3)],u)}
  fx(t)}}

var cv=host.querySelector('canvas'),fl=host.querySelector('.kxflash'),H=document.documentElement,r;
try{r=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true})}catch(e){return}
r.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));r.setClearColor(0,0);
var sc=new T.Scene(),cam=new T.PerspectiveCamera(45,1,.1,500);
var fx=function(t){var f=0;if(t<.6)f=1-t/.6;else if(t>=12.45&&t<13)f=.85*(1-seg(t,12.5,13));else if(t>=20)f=seg(t,20,20.9);if(fl)fl.style.opacity=f.toFixed(3)};
var up=build(sc,cam,fx);sc.background=null;
var t0=performance.now(),vis=true,raf=0,W=0,Hh=0;
function size(){var w=cv.clientWidth,h=cv.clientHeight;if(!w||!h||(w===W&&h===Hh))return;W=w;Hh=h;r.setSize(w,h,false);var a=w/h;cam.aspect=a;cam.fov=a<1.75?Math.min(80,2*Math.atan(Math.tan(22.5*PI/180)*1.78/a)*180/PI):45;window.__KXK=1;cam.updateProjectionMatrix()}
function still(){return H.hasAttribute('data-calm')||RM}
function frame(){raf=0;if(!vis||document.hidden)return;size();var t=window.__FT!=null?window.__FT:still()?16:((performance.now()-t0)/1000)%LOOP;up(t);r.render(sc,cam);if(!still())raf=requestAnimationFrame(frame)}
function loop(){if(!raf)raf=requestAnimationFrame(frame)}
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;loop()},{threshold:.05}).observe(cv);
document.addEventListener('visibilitychange',loop);new MutationObserver(loop).observe(H,{attributes:true,attributeFilter:['data-calm']});addEventListener('resize',function(){W=0;loop()});
host.classList.add('on');loop()}
})();
