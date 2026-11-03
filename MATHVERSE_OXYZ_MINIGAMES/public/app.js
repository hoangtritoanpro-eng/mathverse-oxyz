/* MATHVERSE OXYZ — Hệ thống Game Tương Tác Nhóm (Săn Kho Báu 2D, Bảo Vệ Thành Trì & Mô hình 3D Oxyz) */
'use strict';
const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app=$('#app');
const qs=new URLSearchParams(location.search);
let session=null, world=null, modal=null, busy=false, showAward=false, soundEnabled=true;
let lastSignature='', lastStudentKey='', clockBase=null, tickBase=0;
let activePlayMode=null; // 'hunt' | 'defense'
window.IS_DEMO_MODE=true;

/* ─── TRẠNG THÁI MÔ HÌNH HÌNH HỌC 3D OXYZ HOLOGRAM ─── */
const oxyz3D={
 yaw:38,       // góc xoay ngang (độ)
 pitch:24,     // góc nghiêng dọc (độ)
 showProj:true, // hiện đường gióng tọa độ (x,y,0)
 open:true     // hiện/ẩn hộp 3D
};

const missionMeta=[
 {icon:'🏝️',place:'Rừng Vectơ Khởi Nguyên',sub:'Tọa độ vectơ AB',biome:'#10b981',mode:'🗺️ Săn Kho Báu'},
 {icon:'🏰',place:'Pháo Đài Góc Vuông',sub:'Tích vô hướng u·v',biome:'#3b82f6',mode:'🏰 Thủ Thành'},
 {icon:'💠',place:'Tháp Pha Lê Khoảng Cách',sub:'Độ dài & Khoảng cách',biome:'#a855f7',mode:'🗺️ Săn Kho Báu'},
 {icon:'🌀',place:'Mê Cung Trung Điểm',sub:'Trung điểm & Trọng tâm',biome:'#14b8a6',mode:'🗺️ Săn Kho Báu'},
 {icon:'🐲',place:'Thành Trì Lõi Trí Tuệ',sub:'Cùng phương & Tổng hợp',biome:'#ef4444',mode:'🏰 Thủ Thành'}
];
const labels=['A','B','C','D'];
const initialRoom=(qs.get('room')||'').trim().toUpperCase();
const initialTeam=qs.get('team')||'';
const initialView=qs.get('view')||'';

/* ─── TRẠNG THÁI ENGINE 1: SĂN KHO BÁU 2D (HUNT MAP) ─── */
const huntState={
 stageId:-1,
 x:14, y:50,
 targetX:null, targetY:null,
 keysPressed:new Set(),
 moving:false,
 battleOpen:false,
 selectedChoice:null,
 shortText:'',
 monsterDefeated:false,
 rewardBadge:null,
 lastAutoStation:-1
};

/* ─── TRẠNG THÁI ENGINE 2: BẢO VỆ THÀNH TRÌ (CASTLE DEFENSE) ─── */
const cdState={
 stageId:-1,
 castleHp:300,
 castleMaxHp:300,
 shieldUntil:0,
 slowUntil:0,
 laserUntil:0,
 shakeUntil:0,
 enemies:[],
 projectiles:[],
 effects:[],
 lastSpawnAt:0,
 lastHeroShot:[0,0,0],
 lastRegenAt:0,
 seq:0,
 skillCd:{arrowRain:0,iceVolley:0,groupHeal:0,castleShield:0},
 shortText:''
};

function cacheKey(role,room,id=''){return 'mathverse_oyxz_'+role+'_'+room+(id?'_'+id:'');}
function saveSession(d){
 session=d;
 try{localStorage.setItem(cacheKey(d.role,d.room,d.teamId),d.token);}catch(e){}
 const par=new URLSearchParams({room:d.room,...(d.role==='teacher'?{view:'teacher'}:{team:d.teamId})});
 try{history.replaceState({},'',location.pathname+'?'+par.toString());}catch(e){}
}
function restoreSession(){
 if(!initialRoom)return null;
 if(initialView==='teacher'){const token=localStorage.getItem(cacheKey('teacher',initialRoom));if(token)return{role:'teacher',room:initialRoom,token};}
 if(initialTeam){const token=localStorage.getItem(cacheKey('student',initialRoom,initialTeam));if(token)return{role:'student',room:initialRoom,teamId:initialTeam,token};}
 return null;
}
async function api(route,payload){
 let r;
 try{r=await fetch(route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})});}
 catch(e){throw new Error('Không kết nối được máy giáo viên. Hãy kiểm tra Wi-Fi hoặc máy chủ.');}
 let d=await r.json();
 if(!r.ok)throw new Error(d.error||'Đã xảy ra lỗi.');
 return d;
}
function btn(text,action,cls='primary',attr=''){return `<button type="button" class="button ${cls}" data-action="${action}" ${attr}>${esc(text)}</button>`;}
function layout(content){
 return `<nav class="navbar"><div class="brand"><span class="brand-mark">✦</span><span>MATHVERSE <span style="color:#15b9b8">OXYZ</span></span></div><div class="pills"><span class="pill">📐 TOÁN 12 (GDPT 2018)</span><span class="pill gold">🗺️ SĂN KHO BÁU 2D · 🏰 THỦ THÀNH · 🧊 3D OXYZ</span><button class="button sm gray" data-action="toggleFullscreen" title="Phóng to toàn màn hình">⛶ Toàn màn hình</button><button class="button sm gray" data-action="toggleSound">${soundEnabled?'🔊 Âm thanh: Bật':'🔇 Âm thanh: Tắt'}</button>${session?`<button class="button sm gray" data-action="home">⌂ Đổi màn hình</button>`:''}</div></nav>${content}<div class="footer">MathVerse Oxyz – Hệ thống Game Tương Tác Nhóm & Mô phỏng 3D Không Gian Oxyz • Trường THPT Số 1 Phan Chu Trinh</div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MÔ HÌNH HÌNH HỌC KHÔNG GIAN 3D OXYZ HOLOGRAM (INTERACTIVE 3D VIEWER)
   ═══════════════════════════════════════════════════════════════════════════ */
function project3DPoint(x,y,z,cx=195,cy=112,scale=19){
 const radYaw=oxyz3D.yaw*Math.PI/180;
 const radPitch=oxyz3D.pitch*Math.PI/180;
 // Hệ trục chuẩn Toán THPT: Ox hướng về phía trước-trái, Oy hướng sang phải, Oz hướng thẳng đứng lên
 const rx = -x*Math.sin(radYaw) + y*Math.cos(radYaw);
 const ry = -x*Math.cos(radYaw)*Math.sin(radPitch) - y*Math.sin(radYaw)*Math.sin(radPitch) + z*Math.cos(radPitch);
 return {
  sx: +(cx + rx*scale).toFixed(1),
  sy: +(cy - ry*scale).toFixed(1)
 };
}

function renderOxyz3D(m){
 const v3=m.visual3D||{
  title:'Mô hình Hệ trục tọa độ Oxyz',
  formula:'\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)',
  points:[{label:'A',coords:[1,2,3],color:'#38bdf8'},{label:'B',coords:[4,-2,3],color:'#facc15'}],
  vectors:[{from:[1,2,3],to:[4,-2,3],color:'#4ade80',label:'AB'}]
 };
 const hlAxis=m.challenge?.highlightAxis||'all';
 if(!oxyz3D.open){
  return `<div style="padding:8px 18px;background:#0f172a;border-bottom:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center">
   <span style="font-size:12px;font-weight:900;color:#7dd3fc">🧊 MÔ HÌNH KHÔNG GIAN 3D OXYZ: ${esc(v3.title)}</span>
   <button type="button" class="oxyz-btn" data-action="toggle3DPanel">👁️ Mở Mô hình 3D Oxyz</button>
  </div>`;
 }
 const O=project3DPoint(0,0,0);
 const X=project3DPoint(4.6,0,0);
 const Y=project3DPoint(0,4.6,0);
 const Z=project3DPoint(0,0,4.2);

 // Vẽ lưới mặt phẳng đáy Oxy (z=0)
 let gridLines='';
 for(let g=-3;g<=4;g++){
  const p1=project3DPoint(g,-3,0), p2=project3DPoint(g,4,0);
  const p3=project3DPoint(-3,g,0), p4=project3DPoint(4,g,0);
  gridLines+=`<line x1="${p1.sx}" y1="${p1.sy}" x2="${p2.sx}" y2="${p2.sy}" stroke="rgba(148,163,184,0.14)" stroke-width="1"/>`;
  gridLines+=`<line x1="${p3.sx}" y1="${p3.sy}" x2="${p4.sx}" y2="${p4.sy}" stroke="rgba(148,163,184,0.14)" stroke-width="1"/>`;
 }

 // Vẽ đường gióng tọa độ của các điểm xuống mặt phẳng Oxy
 let projLines='';
 if(oxyz3D.showProj){
  (v3.points||[]).forEach(pt=>{
   const [px,py,pz]=pt.coords;
   const P=project3DPoint(px,py,pz);
   const Pxy=project3DPoint(px,py,0);
   const Px=project3DPoint(px,0,0);
   const Py=project3DPoint(0,py,0);
   projLines+=`
    <line x1="${P.sx}" y1="${P.sy}" x2="${Pxy.sx}" y2="${Pxy.sy}" stroke="${pt.color}" stroke-width="1.3" stroke-dasharray="3 3" opacity="0.75"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Px.sx}" y2="${Px.sy}" stroke="rgba(239,68,68,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Py.sx}" y2="${Py.sy}" stroke="rgba(16,185,129,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <circle cx="${Pxy.sx}" cy="${Pxy.sy}" r="2.5" fill="${pt.color}" opacity="0.6"/>`;
  });
 }

 // Vẽ các Vectơ trong không gian 3D
 const vecSvg=(v3.vectors||[]).map(v=>{
  const pFrom=project3DPoint(...v.from);
  const pTo=project3DPoint(...v.to);
  const mx=((pFrom.sx+pTo.sx)/2).toFixed(1);
  const my=((pFrom.sy+pTo.sy)/2-7).toFixed(1);
  return `<g>
   <line x1="${pFrom.sx}" y1="${pFrom.sy}" x2="${pTo.sx}" y2="${pTo.sy}" stroke="${v.color||'#4ade80'}" stroke-width="3.2" marker-end="url(#arrow3d)"/>
   <text x="${mx}" y="${my}" fill="${v.color||'#4ade80'}" font-size="11" font-weight="900" text-anchor="middle" style="text-shadow:0 2px 4px #000">→${esc(v.label)}</text>
  </g>`;
 }).join('');

 // Vẽ các Điểm trong không gian 3D
 const ptsSvg=(v3.points||[]).map(pt=>{
  const P=project3DPoint(...pt.coords);
  const coordStr=`(${pt.coords.join(';')})`;
  return `<g>
   <circle cx="${P.sx}" cy="${P.sy}" r="5.5" fill="${pt.color||'#facc15'}" stroke="#fff" stroke-width="1.8"/>
   <text x="${P.sx+7}" y="${P.sy-6}" fill="#ffffff" font-size="11" font-weight="900" style="text-shadow:0 2px 4px #000">${esc(pt.label)}${esc(coordStr)}</text>
  </g>`;
 }).join('');

 const wOx=hlAxis==='x'||hlAxis==='all'?3.2:1.8;
 const wOy=hlAxis==='y'||hlAxis==='all'?3.2:1.8;
 const wOz=hlAxis==='z'||hlAxis==='all'?3.2:1.8;

 return `<div style="padding:10px 16px;background:#090f1d;border-bottom:1px solid #1e293b">
  <div class="oxyz-hologram-box">
   <div class="oxyz-hologram-head">
    <div class="oxyz-hologram-title">🧊 MÔ HÌNH HÌNH HỌC 3D OXYZ TRỰC QUAN: ${esc(v3.title)}</div>
    <div class="oxyz-controls">
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="left" title="Xoay góc nhìn sang trái">↺ Xoay Trái</button>
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="right" title="Xoay góc nhìn sang phải">↻ Xoay Phải</button>
     <button type="button" class="oxyz-btn" data-action="rot3D" data-dir="pitch" title="Đổi góc nhìn cao/thấp">📐 Góc nghiêng</button>
     <button type="button" class="oxyz-btn" data-action="toggle3DProj">${oxyz3D.showProj?'📏 Ẩn đường gióng':'📏 Hiện đường gióng'}</button>
     <button type="button" class="oxyz-btn" data-action="toggle3DPanel">▲ Thu gọn</button>
    </div>
   </div>
   <div class="oxyz-canvas-wrap">
    <svg class="oxyz-svg" viewBox="0 0 400 195" preserveAspectRatio="xMidYMid meet">
     <defs>
      <marker id="arrow3d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#fde047"/>
      </marker>
      <marker id="axisX" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#ef4444"/>
      </marker>
      <marker id="axisY" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981"/>
      </marker>
      <marker id="axisZ" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
       <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8"/>
      </marker>
     </defs>
     ${gridLines}
     <!-- 3 Trục tọa độ Ox, Oy, Oz -->
     <line x1="${O.sx}" y1="${O.sy}" x2="${X.sx}" y2="${X.sy}" stroke="#ef4444" stroke-width="${wOx}" marker-end="url(#axisX)"/>
     <text x="${X.sx-10}" y="${X.sy+14}" fill="#f87171" font-size="12" font-weight="900">Ox</text>
     <line x1="${O.sx}" y1="${O.sy}" x2="${Y.sx}" y2="${Y.sy}" stroke="#10b981" stroke-width="${wOy}" marker-end="url(#axisY)"/>
     <text x="${Y.sx+6}" y="${Y.sy+4}" fill="#34d399" font-size="12" font-weight="900">Oy</text>
     <line x1="${O.sx}" y1="${O.sy}" x2="${Z.sx}" y2="${Z.sy}" stroke="#38bdf8" stroke-width="${wOz}" marker-end="url(#axisZ)"/>
     <text x="${Z.sx+6}" y="${Z.sy+4}" fill="#7dd3fc" font-size="12" font-weight="900">Oz</text>
     <circle cx="${O.sx}" cy="${O.sy}" r="3.2" fill="#ffffff"/>
     <text x="${O.sx-12}" y="${O.sy+12}" fill="#cbd5e1" font-size="10" font-weight="800">O</text>
     ${projLines}
     ${vecSvg}
     ${ptsSvg}
    </svg>
    <div class="oxyz-formula-card">
     <b>📐 Công thức Trọng tâm Chặng ${m.id}:</b>
     <div style="color:#e0f2fe;font-weight:800;background:rgba(255,255,255,.06);padding:6px 8px;border-radius:8px;margin:4px 0;font-family:monospace;font-size:12px">${esc(v3.formula)}</div>
     <div class="oxyz-legend">
      <span><i class="oxyz-dot" style="background:#ef4444"></i>Trục Ox (Hoành)</span>
      <span><i class="oxyz-dot" style="background:#10b981"></i>Trục Oy (Tung)</span>
      <span><i class="oxyz-dot" style="background:#38bdf8"></i>Trục Oz (Cao)</span>
     </div>
     <div style="margin-top:6px;font-size:11px;color:#93c5fd">💡 Bấm <b>Xoay Trái/Phải</b> để quan sát hình chiếu tọa độ trong không gian 3 chiều!</div>
    </div>
   </div>
  </div>
 </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ĐỒ HỌA VECTOR SVG CHO QUÁI VẬT, LÂU ĐÀI & ĐỊA HÌNH 2D
   ═══════════════════════════════════════════════════════════════════════════ */
function renderMonsterSVG(type,fallbackIcon='👹'){
 const palettes={
  golem:['#10b981','#047857','#fef08a'],
  croc:['#06b6d4','#0e7490','#fde047'],
  hawk:['#f59e0b','#b45309','#fffbeb'],
  knight:['#60a5fa','#1d4ed8','#f87171'],
  gargoyle:['#a855f7','#6b21a8','#fde047'],
  titan:['#ef4444','#991b1b','#fef08a'],
  prism:['#38bdf8','#0284c7','#e0f2fe'],
  lich:['#c084fc','#581c87','#4ade80'],
  phoenix:['#fb923c','#c2410c','#fef08a'],
  minotaur:['#f87171','#7f1d1d','#fde047'],
  sphinx:['#facc15','#a16207','#38bdf8'],
  guardian:['#2dd4bf','#0f766e','#fef08a'],
  cerberus:['#f43f5e','#881337','#fde047'],
  wyvern:['#a78bfa','#4c1d95','#f43f5e'],
  overlord:['#ec4899','#831843','#facc15']
 };
 const [c1,c2,eye]=palettes[type]||['#f97316','#9a3412','#fef08a'];
 return `<svg viewBox="0 0 140 140" width="150" height="150" style="overflow:visible;filter:drop-shadow(0 12px 18px rgba(0,0,0,.65))">
  <defs>
   <radialGradient id="mg_${type}" cx="35%" cy="30%" r="70%">
    <stop offset="0%" stop-color="${c1}"/>
    <stop offset="100%" stop-color="${c2}"/>
   </radialGradient>
  </defs>
  <!-- Hào quang năng lượng dưới chân Boss -->
  <ellipse cx="70" cy="124" rx="48" ry="11" fill="rgba(0,0,0,0.45)" stroke="${c1}" stroke-width="2" stroke-dasharray="6 4"/>
  <!-- Sừng / Cánh năng lượng -->
  <path d="M 22 58 Q 8 24 38 36 Z" fill="${c1}" stroke="#fff" stroke-width="1.5"/>
  <path d="M 118 58 Q 132 24 102 36 Z" fill="${c1}" stroke="#fff" stroke-width="1.5"/>
  <!-- Thân giáp Boss -->
  <path d="M 34 52 C 34 26, 106 26, 106 52 L 112 98 C 112 114, 28 114, 28 98 Z" fill="url(#mg_${type})" stroke="#fde68a" stroke-width="3"/>
  <!-- Mắt phát sáng -->
  <polygon points="46,58 62,64 48,70" fill="${eye}"/>
  <polygon points="94,58 78,64 92,70" fill="${eye}"/>
  <!-- Lõi Tinh Thể Oxyz trước ngực -->
  <polygon points="70,74 82,88 70,102 58,88" fill="${eye}" stroke="#fff" stroke-width="1.5"/>
  <!-- Icon đặc trưng ở đỉnh đầu -->
  <text x="70" y="34" text-anchor="middle" font-size="26">${fallbackIcon}</text>
 </svg>`;
}

function renderCastleSVG(){
 return `<svg class="cd-castle-art" viewBox="0 0 120 145">
  <defs>
   <linearGradient id="castleWall" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#94a3b8"/>
    <stop offset="50%" stop-color="#475569"/>
    <stop offset="100%" stop-color="#1e293b"/>
   </linearGradient>
   <linearGradient id="castleGold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fde047"/>
    <stop offset="100%" stop-color="#ca8a04"/>
   </linearGradient>
  </defs>
  <!-- Tháp trái & phải -->
  <rect x="8" y="42" width="26" height="95" rx="3" fill="url(#castleWall)" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="86" y="42" width="26" height="95" rx="3" fill="url(#castleWall)" stroke="#cbd5e1" stroke-width="2"/>
  <polygon points="4,42 21,16 38,42" fill="#2563eb" stroke="#fde047" stroke-width="2"/>
  <polygon points="82,42 99,16 116,42" fill="#2563eb" stroke="#fde047" stroke-width="2"/>
  <!-- Thân chính Thành Trì -->
  <rect x="26" y="54" width="68" height="83" rx="4" fill="url(#castleWall)" stroke="#fde047" stroke-width="2.5"/>
  <!-- Tháp Đại Bác Laser Oxyz ở giữa -->
  <rect x="44" y="26" width="32" height="34" rx="4" fill="#334155" stroke="#38bdf8" stroke-width="2"/>
  <circle cx="60" cy="43" r="10" fill="#0284c7" stroke="#bae6fd" stroke-width="2.5"/>
  <circle cx="60" cy="43" r="4" fill="#fef08a"/>
  <!-- Cổng vòm Thành Trì -->
  <path d="M 44 137 L 44 102 C 44 86, 76 86, 76 102 L 76 137 Z" fill="#451a03" stroke="url(#castleGold)" stroke-width="3"/>
  <!-- Cờ hiệu Oxyz -->
  <line x1="60" y1="26" x2="60" y2="4" stroke="#fde047" stroke-width="2.5"/>
  <polygon points="60,5 86,12 60,19" fill="#ef4444"/>
 </svg>`;
}

function getTerrainSVG(theme,pathPts){
 let bgShapes='';
 if(theme==='forest'){
  bgShapes=`
   <!-- Dòng sông cổ uốn lượn & Cầu gỗ -->
   <path d="M 480 0 C 430 250, 560 520, 460 820" fill="none" stroke="rgba(56,189,248,0.28)" stroke-width="58" stroke-linecap="round"/>
   <path d="M 480 0 C 430 250, 560 520, 460 820" fill="none" stroke="rgba(186,230,253,0.35)" stroke-width="32" stroke-dasharray="22 18"/>
   <rect x="440" y="210" width="76" height="34" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="3"/>
   <rect x="470" y="545" width="76" height="34" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="3"/>`;
 }else if(theme==='crystal'){
  bgShapes=`
   <polygon points="320,120 350,60 380,120" fill="rgba(56,189,248,0.28)" stroke="#7dd3fc" stroke-width="2"/>
   <polygon points="680,680 715,610 750,680" fill="rgba(192,132,252,0.28)" stroke="#e9d5ff" stroke-width="2"/>
   <circle cx="600" cy="410" r="110" fill="rgba(56,189,248,0.1)" stroke="rgba(125,211,252,0.3)" stroke-width="2" stroke-dasharray="10 8"/>`;
 }else if(theme==='maze'){
  bgShapes=`
   <circle cx="600" cy="410" r="190" fill="none" stroke="rgba(45,212,191,0.22)" stroke-width="18"/>
   <circle cx="600" cy="410" r="110" fill="none" stroke="rgba(45,212,191,0.22)" stroke-width="14" stroke-dasharray="40 20"/>`;
 }else{
  bgShapes=`
   <path d="M 280 80 Q 600 400 920 720" fill="none" stroke="rgba(249,115,22,0.24)" stroke-width="36" stroke-linecap="round"/>
   <circle cx="620" cy="410" r="95" fill="rgba(239,68,68,0.14)" stroke="rgba(252,165,165,0.28)" stroke-width="3"/>`;
 }
 return `<svg class="hw-path-svg" viewBox="0 0 1200 820" preserveAspectRatio="none">
  ${bgShapes}
  <!-- Đường mòn chính dẫn qua các Trạm -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <polyline points="${pathPts}" fill="none" stroke="rgba(250,204,21,0.52)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="18 14"/>
 </svg>`;
}

function startScreen(msg=''){
 const fRoom=esc(initialRoom),fTeam=esc(initialTeam);
 const demoBar=window.IS_DEMO_MODE?`<div class="demo-banner"><strong>🎮 CHẾ ĐỘ CHƠI THỬ & TRÌNH CHIẾU 1 MÁY:</strong> ${btn('▶ VÀO ĐỘI RỒNG XANH (CHƠI NGAY)','demoPlay','teal')} ${btn('👩‍🏫 XEM MÀN HÌNH GIÁO VIÊN','demoTeacher','gold')}<small>Phòng mẫu 123456 · Mã PIN Đội 1: 1111 · Đội 2: 2222 · Đội 3: 3333 · Đội 4: 4444</small></div>`:'';
 app.innerHTML=layout(`<header class="hero"><div class="eyebrow">HÀNH TRÌNH GIẢI MẬT THƯ • TOÁN LỚP 12 (CT GDPT 2018)</div><h1>MATHVERSE OXYZ<br/>SĂN KHO BÁU & BẢO VỆ THÀNH TRÌ</h1><p class="subtitle">Hệ thống 5 Chặng Game Tương Tác Nhóm kết hợp <b>Mô hình Không gian 3D Oxyz trực quan</b>: Điều khiển nhân vật Săn Kho Báu trên bản đồ 2D & Chỉ huy 3 Anh Hùng Bảo Vệ Thành Trì thời gian thực!</p><div class="hero-character">🧭</div></header>
 ${demoBar}
 <div class="tabs"><button class="active" data-action="switch-tab" data-tab="teacher">👩‍🏫 Tạo phòng – Giáo viên</button><button data-action="switch-tab" data-tab="student">🧑‍🚀 Vào đội – Học sinh</button></div>
 ${msg?`<div class="notice error">${esc(msg)}</div>`:''}
 <section class="setup grid grid-2" id="entry"><div class="panel" data-tabbox="teacher"><div class="section-title"><h2>🎓 Phòng điều khiển Giáo viên</h2></div><p>Giáo viên tạo mã phòng, phát mã PIN cho 4–8 nhóm học sinh, chiếu Bản đồ Lục địa 5 Chặng Oxyz và theo dõi điểm XP, Vàng, Combo, Khiên theo thời gian thực.</p><div class="form-field"><label>Số đội tham gia</label><select id="teamCount"><option value="4">4 đội</option><option value="5">5 đội</option><option value="6" selected>6 đội</option><option value="7">7 đội</option><option value="8">8 đội</option></select></div>${btn('✨ TẠO PHÒNG MATHVERSE','create','primary block')}<p class="muted" style="margin-top:13px;font-size:12px">Khuyến nghị 4–6 học sinh/đội (phân vai tính trục Ox, Oy, Oz và Đội trưởng điều khiển).</p></div>
 <div class="panel" data-tabbox="student"><div class="section-title"><h2>🚀 Đăng nhập Đội Thám Hiểm</h2></div><p>Nhận mã phòng và mã PIN đội từ giáo viên. Cả nhóm cùng thảo luận công thức trên Mô hình 3D Oxyz để điều khiển nhân vật và bảo vệ thành trì!</p><div class="form-field"><label>Mã phòng 6 chữ số</label><input id="roomInput" type="text" inputmode="numeric" maxlength="6" class="mono" value="${fRoom}" placeholder="VD: 123456" /></div><div class="form-field"><label>Đội thám hiểm</label><select id="teamSelect">${Array.from({length:8},(_,i)=>`<option value="doi-${i+1}" ${fTeam===`doi-${i+1}`?'selected':''}>Đội ${i+1}</option>`).join('')}</select></div><div class="form-field"><label>Mã đội 4 chữ số</label><input id="teamCode" type="password" inputmode="numeric" maxlength="4" placeholder="Mã PIN của đội" /></div>${btn('🗝️ VÀO HÀNH TRÌNH NGAY','join','teal block')}</div></section>
 <div class="panel" style="margin-top:20px"><h3>📜 Bản Đồ 5 Chặng Hành Trình Lục Địa Oxyz</h3>${mapTrack(0)}</div>`);
}

function mapTrack(stage){
 const curRound=world?.me?.round||0;
 return `<div class="world-journey-map">${missionMeta.map((m,i)=>{
  const state=stage===-1?'current':i<stage?'done':i===stage?'current':'locked';
  const stars=stage===-1?'⭐⭐⭐':i<stage?'⭐⭐⭐':i===stage?('⭐'.repeat(curRound)+'☆'.repeat(3-curRound)):'☆☆☆';
  const clickAttr=window.IS_DEMO_MODE&&session?.role==='student'?`data-action="demoJumpStage" data-stage="${i}" title="Nhấn để chuyển nhanh tới Chặng ${i+1}"`:'';
  return `<div class="island-card ${state}" style="--biome:${m.biome}" ${clickAttr}>
   <div class="island-orb">
    <span>${i<stage?'✅':m.icon}</span>
    <span class="island-badge">Chặng ${i+1}</span>
   </div>
   <div class="island-stars">${stars}</div>
   <div class="island-title">${esc(m.place)}</div>
   <div class="island-sub">${esc(m.sub)}</div>
   <span class="island-mode-tag">${esc(m.mode)}</span>
  </div>`;
 }).join('')}</div>`;
}

function teacherMap(teams){
 return `<div class="big-map"><div class="screen-tag">🗺️ BẢN ĐỒ LỤC ĐỊA 5 CHẶNG & ĐƯỜNG ĐUA TRỰC TIẾP CỦA CÁC ĐỘI</div>${mapTrack(-1)}${teams.map(t=>`<div class="map-lane"><div class="map-name"><span class="team-avatar">${t.avatar}</span><span>${esc(t.name)}</span></div><div class="track"><div class="filled" style="width:${Math.max(2,(t.stage*3+t.round)/15*100)}%"></div><div class="ticks">${[0,1,2,3,4,5].map(()=>'<i></i>').join('')}</div><span class="pawn" style="--pos:calc(5% + ${(t.stage*3+(t.stage<5?t.round:0))/15} * 90%)">${t.avatar}</span></div><div class="lane-score">${t.score} XP · 🪙${t.gold??120}<br/><small>${t.stage<5?`Chặng ${t.stage+1} (${t.round+1}/3) · 🔥x${t.streak||0}`:'🔓 Đủ 5 mảnh'}</small></div></div>`).join('')}</div>`;
}

function standings(teams,compact=false){
 const list=[...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||(b.round-a.round)||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 if(compact)return list.map((t,i)=>`<div class="mini-rank"><span>${i===0?'🥇':i===1?'🥈':i===2?'🥉':'🏅'} ${t.avatar} ${esc(t.name)}</span><strong>${t.score} XP</strong></div>`).join('');
 return `<table class="result-table"><thead><tr><th>Hạng</th><th>Đội</th><th>Tiến độ Chặng</th><th>Vàng · Cấp · Combo</th><th>Điểm XP</th><th>Trạng thái</th></tr></thead><tbody>${list.map((t,i)=>`<tr><td>${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td><td>${t.avatar} <strong>${esc(t.name)}</strong></td><td><div class="mini-progress"><span style="width:${(t.stage*3+(t.stage<5?t.round:0))/15*100}%"></span></div><small>Chặng ${t.stage}/5 • ${t.stage<5?`lượt ${t.round+1}/3`:'Hoàn tất 5 chặng'}</small></td><td>🪙 ${t.gold??120} · Lv.${t.heroLevel??1} ${(t.streak||0)>=2?`<span class="pill pink">🔥x${t.streak}</span>`:''}</td><td><strong>${t.score} XP</strong></td><td>${t.completed?'<span class="pill green">🏆 Đã mở kho báu</span>':t.stage===5?'<span class="pill gold">🔐 Đang giải mật mã</span>':'⚔️ Đang chiến đấu'}</td></tr>`).join('')}</tbody></table>`;
}

function teacherScreen(){
 const teams=world.teams,done=teams.filter(t=>t.completed).length;
 const joinBase=world.joinBaseURL||location.origin;const baseUrl=joinBase+location.pathname;
 const winners=[...teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const helper=[...teams].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="dashboard-head"><div><span class="screen-tag">👩‍🏫 MÀN HÌNH ĐIỀU HÀNH GIÁO VIÊN</span><h2>Mã Phòng Học: <span class="room-number">${esc(world.room)}</span></h2><p class="muted">Học sinh tham gia theo nhóm qua 2 cơ chế: <b>Săn Kho Báu 2D</b> & <b>Bảo Vệ Thành Trì</b> kết hợp <b>Mô hình Không gian 3D Oxyz</b>.</p></div><div class="panel" style="text-align:center;padding:15px 20px"><span class="screen-tag">ĐỒNG HỒ TIẾT HỌC</span><div class="clock" id="clock">45:00</div><div class="controls">${btn(world.clock.running?'⏸ Dừng giờ':'▶ Bắt đầu','timerToggle','sm teal')}${btn('↻','timerReset','sm gray')}<select id="clockMinutes" aria-label="Thời lượng tiết học"><option value="35" ${world.clock.minutes===35?'selected':''}>35 phút</option><option value="40" ${world.clock.minutes===40?'selected':''}>40 phút</option><option value="45" ${world.clock.minutes===45?'selected':''}>45 phút</option><option value="50" ${world.clock.minutes===50?'selected':''}>50 phút</option></select></div></div></div>
 <div class="top-numbers"><div class="metric"><b>${teams.length}</b><small>ĐỘI THÁM HIỂM</small></div><div class="metric"><b>${done}</b><small>ĐÃ MỞ KHO BÁU</small></div><div class="metric"><b>${teams.filter(t=>t.stage>=5).length}</b><small>ĐỦ 5 MẢNH MÃ</small></div><div class="metric"><b>${teams.reduce((a,t)=>a+t.score,0)}</b><small>TỔNG XP LỚP</small></div></div>
 <div class="controls" style="margin-bottom:16px">${window.IS_DEMO_MODE?btn('▶ Vào Đội Rồng Xanh (Trải nghiệm Game)','demoPlay','teal'):''}${btn(world.paused?'▶ Tiếp tục game':'⏸ Tạm dừng lớp học','pauseGame',world.paused?'teal':'gold')}${btn('🏆 Công bố giải thưởng','awards','primary')}${btn('📥 Xuất CSV minh chứng','exportCSV','gray')}${btn('🖨️ In bảng kết quả','print','gray')}<span class="pill ${world.paused?'pink':'green'}">${world.paused?'🔒 Đang tạm dừng để GV giảng bài':'🟢 Học sinh đang làm nhiệm vụ'}</span></div>
 <div class="teacher-main"><div><section class="panel"><div class="section-title"><h2>🗺️ Tiến độ trực tiếp qua 5 chặng Oxyz</h2><span class="pill">Tự cập nhật ~2 giây</span></div>${teacherMap(teams)}</section><section class="panel"><div class="section-title"><h2>🏅 Bảng xếp hạng các đội</h2><small>Tính theo XP, sau đó thời điểm hoàn thành</small></div>${standings(teams)}</section><section class="panel"><h2>🎊 Tổng kết và vinh danh</h2>${showAward?`<div class="champion" style="margin-top:14px"><span class="star">🏆</span><strong>QUÁN QUÂN MATHVERSE: ${winners[0].avatar} ${esc(winners[0].name)}</strong><p>${winners[0].score} XP · ${winners[0].completed?'Đã giải mã Lõi Trí Tuệ':'Đang trên hành trình'}</p></div><div class="grid grid-2" style="margin-top:12px"><div class="notice good">🥈 Á quân: ${winners[1]?esc(winners[1].name):'—'}</div><div class="notice good">🥉 Giải ba: ${winners[2]?esc(winners[2].name):'—'}</div><div class="notice">🤝 Giải hợp tác xuất sắc: ${helper&&helper.bonus>0?esc(helper.name):'GV lựa chọn'}</div><div class="notice">🔐 Mở kho báu: ${done}/${teams.length} đội</div></div>`:`<p class="muted" style="margin:10px 0">Khi kết thúc hoạt động, nhấn “Công bố giải thưởng” để chiếu sân khấu vinh danh 3 đội dẫn đầu và giải hợp tác.</p>`}</section></div>
 <aside><section class="panel"><div class="section-title"><h3>🔑 Mã PIN đăng nhập từng đội</h3><span class="teacher-only">CHỈ GV XEM</span></div><div class="notice" style="margin-bottom:12px">Học sinh cùng Wi-Fi mở <strong>${esc(joinBase)}</strong>, nhập mã phòng <strong>${esc(world.room)}</strong> và mã PIN đội:</div>${teams.map(t=>`<div class="team-join"><div class="team-emoji">${t.avatar}</div><div class="team-details"><b>${esc(t.name)}</b><small>Đội ${t.id.split('-')[1]} · PIN: <span class="code">${esc(world.teamCodes[t.id])}</span></small></div><button class="button sm gray" data-action="copy" data-url="${esc(baseUrl+'?room='+world.room+'&team='+t.id)}" title="Sao chép liên kết đội">⧉ Link</button></div>`).join('')}</section>
 <section class="panel"><h3>✨ Cộng điểm hợp tác nhóm (0–10 XP)</h3><div class="form-field"><label>Chọn đội</label><select id="bonusTeam">${teams.map(t=>`<option value="${t.id}">${t.avatar} ${esc(t.name)} (hiện +${t.bonus})</option>`).join('')}</select></div><div class="form-field"><label>Điểm thưởng hợp tác</label><select id="bonusValue">${Array.from({length:11},(_,n)=>`<option value="${n}">${n} XP</option>`).join('')}</select></div>${btn('Lưu điểm hợp tác','setBonus','sm primary block')}</section>
 <section class="panel"><h3>📡 Nhật ký hoạt động trực tiếp</h3><div class="events" style="margin-top:10px">${world.lastEvent.length?world.lastEvent.map(e=>`<div class="event"><time>${new Date(e.at).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}</time><span>${esc(e.text)}</span></div>`).join(''):'Chưa có hoạt động nào.'}</div></section>
 <section class="panel"><div class="section-title"><h3>📚 Bảng đáp án & Gợi ý sư phạm</h3><span class="teacher-only">ẨN KHỎI HS</span></div>${world.missions.map(m=>`<details class="teacher-answer"><summary>${m.icon} Chặng ${m.id}: ${esc(m.title)}</summary>${m.challenges.map((q,i)=>`<div class="answer-round"><p><b>Lượt ${i+1}: ${esc(q.prompt)}</b></p><p class="correct">Đáp án ${esc(q.answer)} – ${esc(q.options[q.correct])}</p><p>${esc(q.explain)}</p></div>`).join('')}<p class="notice good">Mảnh mã: <b>${m.digit}</b> · ${esc(m.digitRule)}</p></details>`).join('')}<p class="notice good">Mã kho báu: <b>30524</b> → <b>TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU</b></p></section>
 <section class="panel"><h3>🧹 Khôi phục đội chơi</h3><div class="form-field"><select id="resetTeam">${teams.map(t=>`<option value="${t.id}">${t.avatar} ${esc(t.name)}</option>`).join('')}</select></div>${btn('↺ Đặt lại đội được chọn','resetTeam','sm red block')}</section>
 </aside></div>`;
}

function inv(digits){
 const d=Object.fromEntries((digits||[]).map(v=>[v.stage,v.digit]));
 return `<div class="inventory">${[1,2,3,4,5].map(i=>`<div class="digit ${d[i]===undefined?'empty':''}"><small>Chặng ${i}</small><strong>${d[i]===undefined?'?':esc(d[i])}</strong></div>`).join('')}</div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 1: SĂN KHO BÁU 2D MAP (SCAVENGER HUNT RPG)
   ═══════════════════════════════════════════════════════════════════════════ */
function initHuntForStage(m){
 const hm=m.huntMap||{theme:'forest',spawn:{x:14,y:50},chest:{x:86,y:50,name:'Rương Kho Báu'},stations:[{x:34,y:28,name:'Trạm I',monsterIcon:'👹',monsterName:'Quái Trạm 1',badge:'I'},{x:54,y:72,name:'Trạm II',monsterIcon:'🐊',monsterName:'Quái Trạm 2',badge:'II'},{x:73,y:32,name:'Trạm III',monsterIcon:'🦅',monsterName:'Quái Trạm 3',badge:'III'}]};
 if(huntState.stageId!==m.id){
  huntState.stageId=m.id;
  huntState.x=hm.spawn.x;
  huntState.y=hm.spawn.y;
  huntState.targetX=null;
  huntState.targetY=null;
  huntState.battleOpen=false;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  huntState.lastAutoStation=-1;
 }
 return hm;
}

function getMapDecorations(theme){
 const fireflies=`
  <div class="hw-firefly" style="left:28%;top:35%;animation-delay:.2s"></div>
  <div class="hw-firefly" style="left:52%;top:48%;animation-delay:1.1s"></div>
  <div class="hw-firefly" style="left:68%;top:25%;animation-delay:.7s"></div>
  <div class="hw-firefly" style="left:75%;top:68%;animation-delay:1.6s"></div>`;
 if(theme==='maze'){
  return fireflies+`
   <div class="hw-wall-block" style="left:21%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:41%;top:38%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:63%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-obstacle" style="left:16%;top:22%">🗿</div>
   <div class="hw-obstacle" style="left:48%;top:18%">🕯️</div>
   <div class="hw-obstacle" style="left:82%;top:76%">🏛️</div>`;
 }
 if(theme==='crystal'){
  return fireflies+`
   <div class="hw-wall-block" style="left:22%;top:58%;width:12%;height:6%"></div>
   <div class="hw-wall-block" style="left:42%;top:22%;width:12%;height:6%"></div>
   <div class="hw-obstacle" style="left:18%;top:22%">💎</div>
   <div class="hw-obstacle" style="left:45%;top:48%">🔮</div>
   <div class="hw-obstacle" style="left:64%;top:75%">🔷</div>
   <div class="hw-obstacle" style="left:82%;top:22%">✨</div>`;
 }
 if(theme==='fortress'||theme==='citadel'){
  return fireflies+`
   <div class="hw-wall-block" style="left:23%;top:14%;width:4%;height:26%"></div>
   <div class="hw-wall-block" style="left:62%;top:56%;width:4%;height:28%"></div>
   <div class="hw-obstacle" style="left:18%;top:75%">🔥</div>
   <div class="hw-obstacle" style="left:45%;top:20%">⚔️</div>
   <div class="hw-obstacle" style="left:66%;top:18%">🌋</div>
   <div class="hw-obstacle" style="left:82%;top:74%">🛡️</div>`;
 }
 return fireflies+`
  <div class="hw-obstacle" style="left:18%;top:22%">🌲</div>
  <div class="hw-obstacle" style="left:25%;top:72%">🌳</div>
  <div class="hw-obstacle" style="left:44%;top:46%">🪨</div>
  <div class="hw-obstacle" style="left:46%;top:18%">🌴</div>
  <div class="hw-obstacle" style="left:64%;top:62%">🌲</div>
  <div class="hw-obstacle" style="left:82%;top:24%">🌳</div>
  <div class="hw-obstacle" style="left:80%;top:76%">⛺</div>`;
}

function renderHuntGame(m){
 const hm=initHuntForStage(m);
 const r=m.round;
 const q=m.challenge;
 const stList=hm.stations||[];
 const roundsMeta=m.allRounds||[];
 const keySlots=[0,1,2].map(i=>{
  const badge=roundsMeta[i]?.keyBadge||stList[i]?.badge||`Mảnh ${i+1}`;
  if(i<r)return `<div class="hw-key-slot earned">🔑 Trạm ${i+1}: <b>${esc(badge)}</b> ✅</div>`;
  if(i===r)return `<div class="hw-key-slot current">⚔️ Trạm ${i+1}: Đang mở</div>`;
  return `<div class="hw-key-slot">🔒 Trạm ${i+1}: Khóa</div>`;
 }).join('');

 const quickBtns=[0,1,2].map(i=>{
  const cls=i<r?'done':i===r?'active':'';
  return `<button type="button" class="hw-quick-btn ${cls}" data-action="walkToStation" data-idx="${i}">${i<r?'✅':i===r?'🏃 Đi tới':'🔒'} Trạm ${i+1}</button>`;
 }).join('');

 const pathPts=[hm.spawn,...stList,hm.chest].map(p=>`${Math.round(p.x*12)},${Math.round(p.y*8.2)}`).join(' ');

 const stationsHtml=stList.map((st,i)=>{
  const state=i<r?'passed':i===r?'active':'locked';
  return `<div class="hw-station ${state}" style="left:${st.x}%;top:${st.y}%" data-action="clickStation" data-idx="${i}">
   <div class="hw-ring"></div>
   <div class="hw-station-core">${i<r?'✅':st.monsterIcon||'👾'}</div>
   <div class="hw-station-label">${i<r?`Đã vượt (${esc(st.badge)})`:esc(st.name)}</div>
  </div>`;
 }).join('');

 const curStation=stList[r]||{x:50,y:50,name:q.label,monsterIcon:q.monster?.icon||'👾',monsterName:q.monster?.name||'Quái Vật Trạm'};
 const dx=curStation.x-huntState.x, dy=curStation.y-huntState.y;
 const dist=Math.hypot(dx,dy);
 const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
 const nearStation=dist<=10.5;

 // Mini-map dots
 const miniDots=stList.map((st,i)=>{
  const cls=i<r?'st-done':i===r?'st-active':'st-lock';
  return `<span class="hw-minimap-dot ${cls}" style="left:${st.x}%;top:${st.y}%"></span>`;
 }).join('')+`<span class="hw-minimap-dot chest" style="left:${hm.chest.x}%;top:${hm.chest.y}%"></span>`;

 return `<div class="hw-wrapper">
  <div class="hw-hud-top">
   <div class="hw-hud-keys">${keySlots}<div class="hw-key-slot ${r>=3?'earned':''}">🎁 Vật phẩm: <b>${esc(m.item||'Mảnh mật mã')}</b></div></div>
   <div class="hw-quick-nav">${quickBtns}</div>
  </div>
  <div class="hw-viewport" id="hwViewport">
   <!-- La bàn định hướng Trạm mục tiêu -->
   <div class="hw-compass">
    <span class="hw-compass-arrow" id="hwCompassArrow" style="transform:rotate(${angleDeg}deg)">➤</span>
    <div>
     <div style="font-size:10px;color:#7dd3fc">MỤC TIÊU HIỆN TẠI:</div>
     <strong id="hwCompassText">${esc(curStation.name)} (${Math.round(dist*1.5)}m)</strong>
    </div>
   </div>
   <!-- Mini-Map Radar góc phải -->
   <div class="hw-minimap">
    <span class="hw-minimap-title">📡 RADAR OXYZ</span>
    ${miniDots}
    <span class="hw-minimap-player" id="hwMiniPlayer" style="left:${huntState.x}%;top:${huntState.y}%"></span>
   </div>
   <div class="hw-world theme-${esc(hm.theme||'forest')}" id="hwWorld">
    ${getTerrainSVG(hm.theme||'forest',pathPts)}
    ${getMapDecorations(hm.theme)}
    ${stationsHtml}
    <div class="hw-chest ${r<3?'locked':''}" style="left:${hm.chest.x}%;top:${hm.chest.y}%" data-action="clickChest">
     <div class="hw-chest-box">🧰</div>
     <div class="hw-station-label">${esc(hm.chest.name||'Rương Mật Mã')}</div>
    </div>
    <div class="hw-player ${huntState.moving?'moving':''}" id="hwPlayer" style="left:${huntState.x}%;top:${huntState.y}%">
     <div class="hw-player-torch"></div>
     <div class="hw-player-avatar">${world.me.avatar}</div>
     <div class="hw-player-name">${esc(world.me.name)}</div>
    </div>
   </div>
   <div class="hw-controls-overlay">
    <div class="hw-dpad">
     <span></span><button type="button" data-dpad="up" title="Đi lên (W / ↑)">▲</button><span></span>
     <button type="button" data-dpad="left" title="Qua trái (A / ←)">◀</button>
     <button type="button" data-dpad="down" title="Đi xuống (S / ↓)">▼</button>
     <button type="button" data-dpad="right" title="Qua phải (D / →)">▶</button>
    </div>
    <div class="hw-action-panel">
     <button type="button" class="hw-attack-station-btn" data-action="openHuntBattle">⚔️ ${nearStation?'MỞ CUỘN GIẤY CHIẾN ĐẤU NGAY!':'ĐI TỚI & MỞ TRẠM '+(r+1)}</button>
     <div class="hw-hint-pill">💡 Chạm lên bản đồ, dùng phím WASD/Mũi tên hoặc bấm "Đi tới Trạm ${r+1}"</div>
    </div>
   </div>
  </div>
  ${huntState.battleOpen?renderHuntBattleModal(m):''}
 </div>`;
}

function renderHuntBattleModal(m){
 const q=m.challenge;
 const monster=q.monster||{icon:'👹',name:'Quái Vật Canh Trạm',hp:120,type:'golem'};
 const sel=huntState.selectedChoice;
 return `<div class="hw-battle-backdrop">
  <div class="hw-battle-modal">
   ${huntState.rewardBadge?`<div class="hw-letter-reward-overlay">
     <div style="font-size:56px">🎉</div>
     <h2>ĐÁNH BẠI ${esc(monster.name.toUpperCase())}!</h2>
     <div class="hw-letter-card">${esc(huntState.rewardBadge)}</div>
     <p style="max-width:440px;color:#dcfce7;font-weight:700">${esc(huntState.rewardExplain||'')}</p>
     <button type="button" class="button gold" data-action="finishHuntReward">Tiếp tục hành trình trên bản đồ →</button>
    </div>`:''}
   <div class="hw-battle-scroll">
    <div>
     <div class="hw-scroll-kicker">📜 TRẠM ${m.round+1} / ${m.totalRounds} · ${esc(q.label)}</div>
     <div class="hw-scroll-role">🤝 <b>Phân công nhóm:</b> ${esc(q.roleAssign||m.groupTask)}</div>
     <div class="hw-scroll-question">🧩 ${esc(q.prompt)}</div>
     <div class="hw-scroll-options">
      ${q.options.map((opt,i)=>`<button type="button" class="hw-opt-btn ${sel===i?'selected':''}" data-action="selectHuntOpt" data-choice="${i}">
       <span class="opt-letter">${labels[i]}</span>
       <span>${esc(opt)}</span>
      </button>`).join('')}
     </div>
     <div class="hw-short-box">
      <span style="font-size:12px;font-weight:900;color:#6b4d28">✍️ Hoặc nhập nhanh đáp án:</span>
      <input type="text" id="huntShortInput" value="${esc(huntState.shortText)}" placeholder="Nhập kết quả số (VD: 3, -2, 0...)" />
     </div>
    </div>
    <div class="hw-scroll-footer">
     <div style="display:flex;gap:8px">
      <button type="button" class="hw-btn-flee" data-action="closeHuntBattle">🏃 Rút lui ra bản đồ</button>
      <button type="button" class="hw-btn-flee" data-action="hint">💡 NOVA gợi ý</button>
     </div>
     <button type="button" class="hw-btn-attack" data-action="attackHuntMonster">⚔️ TUNG ĐÒN TẤN CÔNG!</button>
    </div>
   </div>
   <div class="hw-monster-stage">
    <span class="pill gold" style="margin-bottom:8px">🛡️ KHIÊN ĐỘI: ${'🛡️'.repeat(world.me.health)||'0'}</span>
    <div class="hw-monster-hp"><i style="width:${huntState.monsterDefeated?0:100}%"></i></div>
    <small style="color:#fde68a;font-weight:900">${esc(monster.name)} · HP: ${huntState.monsterDefeated?0:monster.hp}/${monster.hp}</small>
    <div class="hw-monster-art-wrap ${huntState.monsterDefeated?'defeated':''}">
     ${renderMonsterSVG(monster.type||'golem',monster.icon)}
    </div>
    ${huntState.monsterDefeated?'<div class="hw-monster-impact">💥</div>':''}
    <p style="font-size:12px;color:#cbd5e1;margin-top:6px">Chọn đáp án đúng hoặc nhập kết quả rồi nhấn <b>⚔️ Tung đòn tấn công</b> để tiêu diệt Boss và thu hồi chìa khóa tọa độ!</p>
   </div>
  </div>
 </div>`;
}

function updateHuntCamera(){
 const vp=$('#hwViewport'), wd=$('#hwWorld'), pl=$('#hwPlayer');
 if(!vp||!wd||!pl)return;
 pl.style.left=huntState.x+'%';
 pl.style.top=huntState.y+'%';
 pl.classList.toggle('moving',huntState.moving);
 const miniPl=$('#hwMiniPlayer');
 if(miniPl){miniPl.style.left=huntState.x+'%';miniPl.style.top=huntState.y+'%';}
 const m=world?.current;
 const curSt=m?.huntMap?.stations?.[m.round];
 if(curSt){
  const dx=curSt.x-huntState.x, dy=curSt.y-huntState.y;
  const dist=Math.hypot(dx,dy);
  const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
  const arr=$('#hwCompassArrow'), txt=$('#hwCompassText');
  if(arr)arr.style.transform=`rotate(${angleDeg}deg)`;
  if(txt)txt.textContent=`${curSt.name} (${Math.round(dist*1.5)}m)`;
 }
 const vw=vp.clientWidth||800, vh=vp.clientHeight||485;
 const ww=1200, wh=820;
 const px=huntState.x/100*ww, py=huntState.y/100*wh;
 const tx=Math.min(0,Math.max(vw-ww,vw/2-px));
 const ty=Math.min(0,Math.max(vh-wh,vh/2-py));
 wd.style.transform=`translate3d(${Math.round(tx)}px,${Math.round(ty)}px,0)`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 2: BẢO VỆ THÀNH TRÌ (CASTLE DEFENSE REAL-TIME)
   ═══════════════════════════════════════════════════════════════════════════ */
function initCastleForStage(m){
 const up=world?.me?.upgrades||{damage:1,speed:1,hp:1,regen:1};
 const maxHp=260+up.hp*40;
 cdState.castleMaxHp=maxHp;
 if(cdState.stageId!==m.id){
  cdState.stageId=m.id;
  cdState.castleHp=maxHp;
  cdState.enemies=[];
  cdState.projectiles=[];
  cdState.effects=[];
  cdState.lastSpawnAt=0;
  spawnCastleWaveEnemies(m);
 }
}

function spawnCastleWaveEnemies(m){
 if(!m||!m.defenseConfig)return;
 const w=m.defenseConfig.waves?.[m.round]||{name:'Đợt tấn công',enemies:['goblin','bat','skeleton'],boss:'👹'};
 const list=w.enemies||['goblin','bat','skeleton'];
 const spriteMap={goblin:'👺',bat:'🦇',skeleton:'💀',orc:'👹'};
 list.forEach((kind,idx)=>{
  const hp=75+m.id*20+m.round*15;
  cdState.enemies.push({
   id:'en-'+(++cdState.seq),
   lane:idx%3,
   x:84+idx*5,
   hp, maxHp:hp,
   speed:2.1+(idx%2)*0.4,
   sprite:spriteMap[kind]||'👺',
   isBoss:false
  });
 });
 const bossHp=160+m.id*35+m.round*25;
 cdState.enemies.push({
  id:'boss-'+(++cdState.seq),
  lane:1,
  x:94,
  hp:bossHp, maxHp:bossHp,
  speed:1.45,
  sprite:w.boss||m.challenge?.monster?.icon||'👹',
  isBoss:true
 });
}

function renderCastleDefenseGame(m){
 initCastleForStage(m);
 const me=world.me;
 const up=me.upgrades||{damage:1,speed:1,hp:1,regen:1};
 const q=m.challenge;
 const cfg=m.defenseConfig||{castleName:'Thành Trì Oxyz'};
 const now=performance.now();
 const shieldActive=cdState.shieldUntil>now;
 const shakeActive=cdState.shakeUntil>now;
 const hpPct=Math.max(0,Math.min(100,Math.round(cdState.castleHp/cdState.castleMaxHp*100)));

 const skills=[
  {key:'arrowRain',icon:'🌧️',name:'Mưa Tên',cd:12000},
  {key:'iceVolley',icon:'❄️',name:'Băng Giá',cd:14000},
  {key:'groupHeal',icon:'💚',name:'Hồi Máu',cd:15000},
  {key:'castleShield',icon:'🛡️',name:'Khiên Thành',cd:16000}
 ];

 const upgradeItems=[
  {key:'damage',icon:'⚔️',name:'Sát thương Anh Hùng',lv:up.damage||1,desc:`Đạn bắn mạnh hơn (${22+(up.damage||1)*10} DMG)`},
  {key:'speed',icon:'⚡',name:'Tốc độ bắn',lv:up.speed||1,desc:'Anh hùng nạp tên & phép nhanh hơn'},
  {key:'hp',icon:'❤️',name:'Máu & Giáp Thành Trì',lv:up.hp||1,desc:`Tăng máu tối đa (${cdState.castleMaxHp} HP) & +1 Khiên`},
  {key:'regen',icon:'🔧',name:'Kỹ sư Hồi phục Thành',lv:up.regen||1,desc:`Tự hồi +${(up.regen||1)*3} HP mỗi giây`}
 ];

 return `<div class="cd-game ${shakeActive?'shake':''}" id="cdGameRoot">
  <div class="cd-hud">
   <div class="cd-hud-stats">
    <div class="cd-stat">
     <span class="cd-stat-icon">🏰</span>
     <div style="flex:1">
      <small>MÁU THÀNH TRÌ</small>
      <strong id="cdHudHp">${Math.round(cdState.castleHp)} / ${cdState.castleMaxHp}</strong>
      <div class="cd-bar hp"><i id="cdHudHpBar" style="width:${hpPct}%"></i></div>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🌊</span>
     <div>
      <small>ĐỢT QUÁI VẬT</small>
      <strong>Đợt ${m.round+1} / ${m.totalRounds}</strong>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">⭐</span>
     <div style="flex:1">
      <small>CẤP ĐỘI QUÂN</small>
      <strong>Lv.${me.heroLevel||1} · ${me.score} XP</strong>
      <div class="cd-bar xp"><i style="width:${Math.min(100,(me.round+1)/3*100)}%"></i></div>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🪙</span>
     <div>
      <small>KHO VÀNG ĐỘI</small>
      <strong id="cdHudGold">${me.gold??120} Vàng</strong>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🔥</span>
     <div>
      <small>CHUỖI COMBO</small>
      <strong>x${me.streak||0} (+${Math.min(4,Math.max(0,(me.streak||0)))*30}🪙)</strong>
     </div>
    </div>
   </div>
  </div>

  <div class="cd-layout">
   <div class="cd-main-col">
    <div class="cd-battlefield" id="cdBattlefield">
     <div class="cd-sky-decor">⚔️ ${esc(cfg.castleName.toUpperCase())} · ${esc(q.label)}</div>
     <div class="cd-lane-guide cd-lane-0"></div>
     <div class="cd-lane-guide cd-lane-1"></div>
     <div class="cd-lane-guide cd-lane-2"></div>

     <div class="cd-skill-dock">
      ${skills.map(sk=>{
       const rem=Math.max(0,Math.ceil(((cdState.skillCd[sk.key]||0)-now)/1000));
       return `<button type="button" class="cd-skill-btn ${rem>0?'cooldown':''}" data-action="useSkill" data-skill="${sk.key}" title="Kỹ năng ${sk.name}">
        <span>${sk.icon}</span>
        <small>${sk.name}</small>
        ${rem>0?`<span class="cd-skill-cd">${rem}s</span>`:''}
       </button>`;
      }).join('')}
     </div>

     <div class="cd-castle">
      <div class="cd-castle-shield" id="cdCastleShield" style="display:${shieldActive?'block':'none'}"></div>
      ${renderCastleSVG()}
      <span class="cd-castle-tag">${esc(me.name)}</span>
     </div>

     <div class="cd-hero" style="top:44%"><div class="cd-hero-sprite">🏹</div><span class="cd-hero-label">Cung Thủ Ox</span></div>
     <div class="cd-hero" style="top:65%"><div class="cd-hero-sprite">🧙‍♂️</div><span class="cd-hero-label">Pháp Sư Oy</span></div>
     <div class="cd-hero" style="top:86%"><div class="cd-hero-sprite">🛡️</div><span class="cd-hero-label">Hiệp Sĩ Oz</span></div>

     <div id="cdDynamicLayer"></div>
    </div>

    <div class="cd-question-dock">
     <div class="cd-q-header">
      <span class="cd-q-badge">🎯 ĐẠI BÁC LASER ĐỢT ${m.round+1}/${m.totalRounds}: ${esc(q.label)}</span>
      <span class="cd-q-reward">🎁 Giải đúng: +120 Vàng (+Combo) · 💥 Bắn Tia Laser Oxyz Quét Sạch Quái!</span>
     </div>
     <div style="font-size:12.5px;font-weight:800;color:#6b4214;margin-bottom:6px">🤝 Phân công: ${esc(q.roleAssign||m.groupTask)}</div>
     <div class="cd-q-prompt">🧩 ${esc(q.prompt)}</div>
     <div class="cd-answers">
      ${q.options.map((opt,i)=>`<button type="button" class="cd-ans-btn" data-action="answer" data-choice="${i}" ${world.paused?'disabled':''}>
       <span class="ans-letter">${labels[i]}</span>
       <strong>${esc(opt)}</strong>
      </button>`).join('')}
     </div>
     <div class="cd-q-InputRow">
      <input type="text" id="cdShortInput" placeholder="✍️ Hoặc nhập trực tiếp đáp án số rồi bấm Khai Hỏa Laser..." />
      ${btn('💥 KHAI HỎA LASER','submitShortCastle','gold sm')}
      ${btn('💡 NOVA gợi ý','hint','gray sm')}
     </div>
    </div>
   </div>

   <aside class="cd-upgrade-panel">
    <div>
     <div class="cd-up-title">🛠️ NÂNG CẤP ĐỘI QUÂN (VÀNG)</div>
     <p style="font-size:11.5px;color:#d6bfa0;margin-bottom:10px">Giải đúng câu hỏi Toán Oxyz để nhận <b>+120 Vàng</b> (cộng thưởng Combo) và nâng cấp sức mạnh cho 3 Anh Hùng!</p>
     <div class="cd-up-list">
      ${upgradeItems.map(u=>{
       const cost=60+u.lv*40;
       const maxed=u.lv>=5;
       return `<div class="cd-up-item">
        <div class="cd-up-info">
         <b>${u.icon} ${esc(u.name)} (Lv.${u.lv})</b>
         <small>${esc(u.desc)}</small>
        </div>
        <button type="button" class="cd-up-buy" data-action="buyUpgrade" data-upgrade="${u.key}" ${maxed||(me.gold||0)<cost?'disabled':''}>
         ${maxed?'TỐI ĐA':`🪙 ${cost}`}
        </button>
       </div>`;
      }).join('')}
     </div>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid #6e4215;border-radius:12px;padding:10px;font-size:11.5px;color:#fde68a">
     <b>⚡ Mẹo chiến thuật nhóm:</b>
     <div style="margin-top:4px;color:#e7cfa1">• Bấm 4 nút Kỹ năng ở góc trên phải chiến trường (Mưa Tên, Băng Giá, Hồi Máu, Khiên Thành) để hỗ trợ Anh Hùng!<br/>• Trả lời đúng liên tiếp để tích <b>🔥 Chuỗi Combo</b> nhận thêm tới +120 Vàng mỗi lượt!</div>
    </div>
   </aside>
  </div>
 </div>`;
}

function stageContent(m){
 const mode=activePlayMode||m.defaultMode||(m.id===2||m.id===5?'defense':'hunt');
 const roles=m.teamRoles||[];
 const streak=world.me?.streak||0;
 return `<div class="question-card">
  <header class="quest-top">
   <div class="flex-between">
    <span class="tag">${m.icon} CHẶNG ${m.id} / 05 · ${esc(m.tag)}</span>
    <div style="display:flex;gap:8px;align-items:center">
     ${streak>=2?`<span class="combo-pill">🔥 COMBO x${streak}</span>`:''}
     <span class="pill gold">Lượt ${m.round+1} / ${m.totalRounds} · Vật phẩm: ${esc(m.item||'Mảnh mật mã')}</span>
    </div>
   </div>
   <h2>${esc(m.title)} – ${esc(m.place)}</h2>
   <p>${esc(m.story)}</p>
  </header>
  <div class="mode-bar">
   <div class="mode-bar-left">
    <span class="mode-bar-title">🎮 CHẾ ĐỘ CHƠI:</span>
    <div class="mode-switcher">
     <button type="button" class="mode-btn ${mode==='hunt'?'active':''}" data-action="setMode" data-mode="hunt">🗺️ Săn Kho Báu 2D (Map)</button>
     <button type="button" class="mode-btn ${mode==='defense'?'active':''}" data-action="setMode" data-mode="defense">🏰 Bảo Vệ Thành Trì (Real-time)</button>
    </div>
   </div>
   <div style="display:flex;align-items:center;gap:10px">
    <span style="font-size:12px;color:#bae6fd;font-weight:800">🪙 Vàng: <b id="topGoldBadge">${world.me.gold??120}</b> · 🛡️ Khiên: <b>${world.me.health}/3</b></span>
   </div>
  </div>
  ${roles.length?`<div class="role-strip">${roles.map((r,idx)=>`<div class="role-chip ${idx===m.round?'active-role':''}">${esc(r)}</div>`).join('')}</div>`:''}
  ${renderOxyz3D(m)}
  ${mode==='hunt'?renderHuntGame(m):renderCastleDefenseGame(m)}
 </div>`;
}

function finalContent(){
 const words=Object.entries(world.cipherWords||{});
 return `<div class="final-wrap"><div class="panel"><div class="section-title"><h2>🔐 MỞ RƯƠNG LÕI TRÍ TUỆ OXYZ</h2><span class="pill gold">TRẠM CUỐI</span></div><p>Chúc mừng! Cả đội đã chinh phục đủ 5 chặng Lục địa Oxyz. Hãy đọc 5 chữ số mật mã theo thứ tự Chặng 1 → 5, nhập mật mã mở kho báu và chọn thông điệp chiến thắng!</p>${inv(world.me.digits)}<div class="form-field"><label>Nhập mật mã 5 chữ số (theo thứ tự Chặng 1 → 5)</label><input id="finalCode" type="text" class="mono" placeholder="? ? ? ? ?" inputmode="numeric" maxlength="5" autocomplete="off" /></div><h3 style="margin:18px 0 8px">Bảng giải mã từ ngữ</h3><div class="words">${words.map(([k,v])=>`<span class="word-chip">Số ${esc(k)} = ${esc(v)}</span>`).join('')}</div><h3 style="margin:18px 0 8px">Chọn thông điệp nhận được</h3>${world.messageOptions.map((msg,i)=>`<label class="final-option"><input type="radio" name="message" value="${i}" ${i===0?'checked':''}/> ${labels[i]}. ${esc(msg)}</label>`).join('')}${btn('🔓 MỞ RƯƠNG KHO BÁU TRI THỨC','final','gold block')}</div></div>`;
}

function studentScreen(){
 const me=world.me,rank=[...world.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
 const demoStageBar=window.IS_DEMO_MODE?`<div class="demo-banner" style="margin:10px 0;padding:10px 14px"><strong>⚡ Chuyển nhanh Chặng (Bản Demo):</strong> ${[0,1,2,3,4].map(idx=>`<button type="button" class="button sm ${me.stage===idx?'primary':'gray'}" data-action="demoJumpStage" data-stage="${idx}">Chặng ${idx+1}</button>`).join('')} <button type="button" class="button sm gold" data-action="demoJumpStage" data-stage="5">🔐 Trạm Giải Mã</button> ${btn('👩‍🏫 Sang Màn Hình GV','demoTeacher','sm teal')}</div>`:'';
 return `<div class="mission-hero"><div class="mission-hero-left"><div class="avatar">${me.avatar}</div><div><div class="eyebrow" style="color:#f7ce71">BIỆT ĐỘI ${esc(me.name).toUpperCase()} • PHÒNG ${world.room}</div><h2>${me.completed?'KHO BÁU ĐÃ ĐƯỢC MỞ!':me.stage===5?'ĐÃ THU ĐỦ 5 MẢNH MẬT MÃ!':'HÀNH TRÌNH GIẢI CỨU LỤC ĐỊA OXYZ'}</h2><p>${me.completed?'Hãy theo dõi bảng xếp hạng và phần vinh danh của giáo viên.':me.stage===5?'Hãy ghép 5 chữ số mật mã để mở Rương Lõi Trí Tuệ!':'Quan sát Mô hình Không gian 3D Oxyz, điều khiển nhân vật trên Bản đồ 2D hoặc Chỉ huy Thành Trì!'}</p></div></div><div style="text-align:right"><span class="pill gold">🪙 ${me.gold??120} Vàng · Lv.${me.heroLevel??1}</span></div></div>
 ${demoStageBar}
 <div class="panel" style="padding:14px 18px"><div class="flex-between"><h3>🗺️ Bản Đồ Hành Trình 5 Chặng Lục Địa Oxyz (${esc(me.name)})</h3><span class="pill ${me.stage===5?'green':'gold'}">Đã vượt ${me.stage}/5 chặng · Nhấn vào đảo bất kỳ để chuyển chặng</span></div>${mapTrack(me.stage)}</div>
 ${world.paused?'<div class="notice error" style="margin:14px 0"><b>⏸ Giáo viên đang tạm dừng trò chơi để hướng dẫn.</b> Cả nhóm hãy lắng nghe nhé!</div>':''}
 <div class="mission-wrapper"><div>${me.completed?`<div class="panel champion"><span class="star">🏆</span><h2>ĐỘI ${esc(me.name).toUpperCase()} ĐÃ CHIẾN THẮNG!</h2><p style="margin-top:9px;font-size:19px;font-weight:850;color:#8e5b18">“TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU”</p><div class="top-numbers" style="justify-content:center"><div class="metric"><b>${me.score} XP</b><small>TỔNG ĐIỂM ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>THỨ HẠNG HIỆN TẠI</small></div></div></div>`:me.stage>=5?finalContent():stageContent(world.current)}</div>
 <aside class="team-sidebar"><div class="panel"><h3>🎒 Túi Mật Mã (5 Chặng)</h3><p class="muted" style="font-size:12px;margin-top:4px">Thu thập đủ 5 chữ số từ 5 chặng để mở Rương Kho Báu.</p>${inv(me.digits)}<div class="top-numbers" id="studentSidebarMetrics"><div class="metric"><b>${me.score}</b><small>XP CỦA ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>HẠNG TẠM THỜI</small></div></div></div><div class="panel"><h3>🏅 Bảng xếp hạng lớp</h3><div style="margin-top:10px" id="studentSidebarRanks">${standings(world.teams,true)}</div></div><div class="panel"><h3>🧑‍🤝‍🧑 Cẩm nang Chiến thuật</h3><p style="font-size:12.5px;margin-top:6px">• <b>🧊 Mô hình 3D Oxyz:</b> Xoay góc nhìn 3D để kiểm tra tọa độ điểm và vectơ.<br/>• <b>🗺️ Săn Kho Báu 2D:</b> Theo dõi La bàn & Radar để dẫn đội tới Trạm I, II, III.<br/>• <b>🏰 Bảo Vệ Thành Trì:</b> Giải đúng liên tiếp để kích hoạt <b>Đại Bác Laser Oxyz</b> & nhận thưởng Combo Vàng!</p></div></aside></div>`;
}

function render(){
 if(!session)return startScreen();
 if(!world){app.innerHTML='<div class="loading">Đang lấy dữ liệu phòng học…</div>';return;}
 app.innerHTML=layout(session.role==='teacher'?teacherScreen():studentScreen());
 updateClock();
 updateHuntCamera();
 $('.award-backdrop')?.remove();
 if(showAward&&session.role==='teacher'){
  const aw=document.createElement('div');aw.innerHTML=awardScreen();document.body.appendChild(aw.firstElementChild);
 }
 if(modal)showModal();
}

function showModal(){
 if(!modal)return;
 const old=$('.modal-backdrop');if(old)old.remove();
 let good=modal.good;
 const el=document.createElement('div');
 el.className='modal-backdrop';
 el.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="modal-icon">${good?'🎉':'🧩'}</div><h2 class="${good?'success':'failure'}">${esc(modal.title)}</h2><p>${esc(modal.message)}</p>${modal.explain?`<p class="notice good">${esc(modal.explain)}</p>`:''}${modal.digit!==undefined&&modal.digit!==null?`<div class="reward">🔑 MẢNH MẬT MÃ CHẶNG: ${esc(modal.digit)}</div>`:''}${modal.points?`<div class="reward">⭐ +${modal.points} XP</div>`:''}${modal.goldEarned?`<div class="reward">🪙 +${modal.goldEarned} Vàng</div>`:''}${modal.streak>=2?`<div class="reward">🔥 Combo x${modal.streak}</div>`:''}${btn(modal.button||'Tiếp tục hành trình','closeModal',good?'teal block':'primary block')}</div>`;
 document.body.appendChild(el);
}
function notice(title,message,good=false,extra={}){modal={title,message,good,...extra};showModal();sound(good);}
function sound(good){
 if(!soundEnabled)return;
 try{
  const actx=new(window.AudioContext||window.webkitAudioContext)();
  let base=good?520:230;
  [0,.11,.22].forEach((offset,i)=>{
   const osc=actx.createOscillator(),gain=actx.createGain();
   osc.type='sine';osc.frequency.value=base+(good?i*170:-i*35);
   gain.gain.setValueAtTime(.0001,actx.currentTime+offset);
   gain.gain.exponentialRampToValueAtTime(.07,actx.currentTime+offset+.012);
   gain.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+offset+.13);
   osc.connect(gain).connect(actx.destination);
   osc.start(actx.currentTime+offset);osc.stop(actx.currentTime+offset+.14);
  });
  setTimeout(()=>actx.close(),700);
 }catch(e){}
}

function setClock(){clockBase=world?.clock||null;tickBase=Date.now();updateClock();}
function updateClock(){
 if(!clockBase)return;
 const node=$('#clock');if(!node)return;
 let remaining=clockBase.remainingMs-(clockBase.running?Date.now()-tickBase:0);
 remaining=Math.max(0,remaining);
 const sec=Math.floor(remaining/1000);
 node.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
 node.classList.toggle('warn',sec<=300);
}

async function refresh(force=false){
 if(!session||busy)return;
 try{
  const d=await api('/api/state',{room:session.room,token:session.token});
  world=d;setClock();
  if(session.role==='student'&&!force){
   const me=d.me||{};
   const studentKey=`${me.stage}_${me.round}_${me.completed}_${d.paused}`;
   if(studentKey===lastStudentKey){
    const ranksEl=$('#studentSidebarRanks');
    if(ranksEl)ranksEl.innerHTML=standings(d.teams,true);
    const rank=[...d.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
    const metricsEl=$('#studentSidebarMetrics');
    if(metricsEl)metricsEl.innerHTML=`<div class="metric"><b>${me.score}</b><small>XP CỦA ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>HẠNG TẠM THỜI</small></div>`;
    return;
   }
   lastStudentKey=studentKey;
  }
  if(session.role==='student'&&d.me){
   lastStudentKey=`${d.me.stage}_${d.me.round}_${d.me.completed}_${d.paused}`;
  }
  let slim={...d,clock:{...d.clock,remainingMs:0}};
  const sig=JSON.stringify(slim);
  if(force||sig!==lastSignature){
   lastSignature=sig;
   const focused=document.activeElement?.matches('input,select,textarea');
   if(modal||focused||huntState.battleOpen)return;
   render();
  }
 }catch(e){
  if(force){session=null;world=null;startScreen(e.message);}
 }
}

async function submit(route,payload){
 if(busy)return;
 busy=true;
 try{return await api(route,{room:session.room,token:session.token,...payload});}
 finally{busy=false;}
}
function updateAfterAction(){lastSignature='';lastStudentKey='';setTimeout(()=>refresh(true),150);}

async function submitStageAnswer(payload){
 if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);
 const curMode=activePlayMode||world.current?.defaultMode||'hunt';
 const result=await submit('/api/answer',{stage:world.me.stage,round:world.me.round,...payload});
 if(result.correct){
  sound(true);
  const now=performance.now();
  if(curMode==='defense'){
   cdState.laserUntil=now+750;
   cdState.shakeUntil=now+500;
   cdState.enemies.forEach(en=>{
    cdState.effects.push({id:++cdState.seq,x:en.x,lane:en.lane,text:'💥 LASER OXYZ -999!',cls:'crit',until:now+950});
   });
   cdState.enemies=[];
  }
  if(result.stageFinished){
   huntState.battleOpen=false;
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   activePlayMode=null;
   notice('🏆 CHINH PHỤC CHẶNG THÀNH CÔNG!',`Đội đã thu hồi vật phẩm "${result.item}"! Quy tắc mật mã: ${result.digitRule}`,true,
    {explain:result.explain,digit:result.digit,points:result.points,goldEarned:result.goldEarned,streak:result.streak,button:result.nextStage===5?'Tiến tới Mở Rương Lõi Trí Tuệ →':'Bước sang Chặng tiếp theo →'});
   updateAfterAction();
  }else if(curMode==='hunt'&&huntState.battleOpen){
   huntState.monsterDefeated=true;
   huntState.rewardBadge=result.keyBadge||`Lượt ${result.nextRound}`;
   huntState.rewardExplain=result.explain;
   render();
  }else{
   notice('💥 ĐẠI BÁC LASER OXYZ KHAI HỎA!',`Đợt quái vật thứ ${world.me.round+1} đã bị tia Laser Oxyz quét sạch! Đội nhận +${result.goldEarned||120} Vàng.`,true,
    {explain:result.explain,goldEarned:result.goldEarned||120,streak:result.streak,button:`Tiếp tục Đợt ${result.nextRound+1}/3 →`});
   updateAfterAction();
  }
 }else{
  sound(false);
  cdState.shakeUntil=performance.now()+450;
  const x=result.health===0?'Đội đã cạn khiên nhưng NOVA đã sạc lại năng lượng để đội thử tiếp! ':'';
  notice('🛡️ CHƯA CHÍNH XÁC – HÃY QUAN SÁT MÔ HÌNH 3D!',x+'Gợi ý từ NOVA: '+result.hint,false,{button:'↺ Thử lại ngay'});
  updateAfterAction();
 }
}

async function handle(action,el){
 try{
  if(action==='toggleFullscreen'){
   if(!document.fullscreenElement){document.documentElement.requestFullscreen?.();}
   else{document.exitFullscreen?.();}
   return;
  }
  if(action==='rot3D'){
   const dir=el.dataset.dir;
   if(dir==='left')oxyz3D.yaw=(oxyz3D.yaw-18)%360;
   else if(dir==='right')oxyz3D.yaw=(oxyz3D.yaw+18)%360;
   else if(dir==='pitch')oxyz3D.pitch=oxyz3D.pitch===24?42:oxyz3D.pitch===42?10:24;
   render();
   return;
  }
  if(action==='toggle3DProj'){oxyz3D.showProj=!oxyz3D.showProj;render();return;}
  if(action==='toggle3DPanel'){oxyz3D.open=!oxyz3D.open;render();return;}

  if(action==='demoPlay'){saveSession({role:'student',room:'123456',teamId:'doi-1',token:'DEMO_DOI_1'});activePlayMode=null;await refresh(true);return;}
  if(action==='demoTeacher'){saveSession({role:'teacher',room:'123456',token:'DEMO_GV'});await refresh(true);return;}
  if(action==='demoJumpStage'){
   const stg=Number(el.dataset.stage);
   await submit('/api/demoJump',{stage:stg});
   activePlayMode=null;
   huntState.battleOpen=false;
   huntState.stageId=-1;
   cdState.stageId=-1;
   await refresh(true);
   return;
  }
  if(action==='toggleSound'){soundEnabled=!soundEnabled;render();return;}
  if(action==='switch-tab'){$('.tabs .active')?.classList.remove('active');el.classList.add('active');$('[data-tabbox="'+el.dataset.tab+'"]')?.scrollIntoView({behavior:'smooth',block:'center'});return;}
  if(action==='create'){el.disabled=true;const count=Number($('#teamCount').value);const r=await api('/api/create',{teamCount:count});saveSession({role:'teacher',room:r.room,token:r.teacherToken});await refresh(true);return;}
  if(action==='join'){el.disabled=true;const room=$('#roomInput').value.trim(),team=$('#teamSelect').value,code=$('#teamCode').value.trim();const r=await api('/api/join',{room,team,code});saveSession({role:'student',room:r.room,teamId:r.team,token:r.token});await refresh(true);return;}
  if(action==='home'){const yes=confirm('Quay về màn hình đăng nhập? Tiến độ của đội vẫn được lưu an toàn.');if(yes){session=null;world=null;history.replaceState({},'',location.pathname);startScreen();}return;}
  if(action==='setMode'){
   activePlayMode=el.dataset.mode;
   huntState.battleOpen=false;
   render();
   return;
  }
  /* ─── ACTIONS CHO SĂN KHO BÁU 2D ─── */
  if(action==='walkToStation'||action==='clickStation'){
   const idx=Number(el.dataset.idx);
   const m=world?.current;if(!m)return;
   const st=m.huntMap?.stations?.[idx];
   if(!st)return;
   if(idx>m.round){
    return notice('🔒 Trạm đang khóa',`Hãy vượt qua Trạm ${m.round+1} trước khi tiến tới Trạm ${idx+1}!`,false);
   }
   if(idx<m.round){
    return notice('✅ Trạm đã hoàn thành',`Đội đã thu hồi chìa khóa ở Trạm ${idx+1} rồi. Hãy tiến tới Trạm ${m.round+1}!`,true);
   }
   huntState.targetX=st.x;
   huntState.targetY=st.y;
   huntState.lastAutoStation=-1;
   return;
  }
  if(action==='clickChest'){
   const m=world?.current;if(!m)return;
   if(m.round<3){
    const st=m.huntMap?.stations?.[m.round];
    if(st){huntState.targetX=st.x;huntState.targetY=st.y;}
    return notice('🧰 Rương đang khóa','Hãy đánh bại đủ 3 Trạm Quái Vật (I, II, III) trên bản đồ để mở Rương Mật Mã của chặng!',false);
   }
   return;
  }
  if(action==='openHuntBattle'){
   const m=world?.current;if(!m)return;
   const st=m.huntMap?.stations?.[m.round];
   if(st){huntState.x=st.x;huntState.y=st.y;huntState.targetX=null;huntState.targetY=null;}
   huntState.battleOpen=true;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   render();
   return;
  }
  if(action==='closeHuntBattle'){
   huntState.battleOpen=false;
   render();
   return;
  }
  if(action==='selectHuntOpt'){
   huntState.selectedChoice=Number(el.dataset.choice);
   $$('.hw-opt-btn').forEach((b,i)=>b.classList.toggle('selected',i===huntState.selectedChoice));
   return;
  }
  if(action==='attackHuntMonster'){
   const shortVal=$('#huntShortInput')?.value?.trim()||'';
   huntState.shortText=shortVal;
   if(shortVal!==''){
    await submitStageAnswer({shortText:shortVal});
    return;
   }
   if(huntState.selectedChoice===null){
    return notice('Chưa chọn đòn tấn công','Hãy chọn một đáp án A, B, C, D hoặc nhập kết quả vào ô trống trước khi bấm Tấn công!',false);
   }
   await submitStageAnswer({choice:huntState.selectedChoice});
   return;
  }
  if(action==='finishHuntReward'){
   huntState.battleOpen=false;
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   huntState.selectedChoice=null;
   huntState.shortText='';
   await refresh(true);
   const m=world?.current;
   const nextSt=m?.huntMap?.stations?.[m.round];
   if(nextSt){huntState.targetX=nextSt.x;huntState.targetY=nextSt.y;}
   return;
  }

  /* ─── ACTIONS CHO BẢO VỆ THÀNH TRÌ ─── */
  if(action==='answer'){
   await submitStageAnswer({choice:Number(el.dataset.choice)});
   return;
  }
  if(action==='submitShortCastle'){
   const val=$('#cdShortInput')?.value?.trim()||'';
   if(!val)return notice('Chưa nhập đáp án','Hãy nhập kết quả tính toán vào ô trống hoặc chọn đáp án A, B, C, D!',false);
   await submitStageAnswer({shortText:val});
   return;
  }
  if(action==='buyUpgrade'){
   const key=el.dataset.upgrade;
   const r=await submit('/api/upgrade',{upgrade:key});
   if(r.ok){
    world.me.gold=r.gold;
    world.me.upgrades=r.upgrades;
    world.me.health=r.health;
    cdState.castleMaxHp=260+(r.upgrades.hp||1)*40;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+45);
    sound(true);
    render();
   }
   return;
  }
  if(action==='useSkill'){
   const sk=el.dataset.skill;
   const now=performance.now();
   if((cdState.skillCd[sk]||0)>now)return;
   sound(true);
   if(sk==='arrowRain'){
    cdState.skillCd.arrowRain=now+12000;
    for(let i=0;i<12;i++){
     cdState.projectiles.push({id:++cdState.seq,lane:i%3,x:18+(i*5),speed:58,dmg:48,icon:'🏹'});
    }
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'🌧️ MƯA TÊN VECTƠ!',cls:'crit',until:now+950});
   }else if(sk==='iceVolley'){
    cdState.skillCd.iceVolley=now+14000;
    cdState.slowUntil=now+6000;
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'❄️ BÃO TUYẾT ĐÓNG BĂNG 6 GIÂY!',cls:'crit',until:now+950});
   }else if(sk==='groupHeal'){
    cdState.skillCd.groupHeal=now+15000;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+95);
    cdState.effects.push({id:++cdState.seq,x:20,lane:1,text:'💚 +95 HP THÀNH TRÌ!',cls:'crit',until:now+950});
   }else if(sk==='castleShield'){
    cdState.skillCd.castleShield=now+16000;
    cdState.shieldUntil=now+7000;
    cdState.effects.push({id:++cdState.seq,x:18,lane:1,text:'🛡️ BẬT KHIÊN LỤC GIÁC 7 GIÂY!',cls:'crit',until:now+950});
   }
   render();
   return;
  }

  /* ─── ACTIONS CHUNG ─── */
  if(action==='hint'){
   if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);
   const result=await submit('/api/hint',{stage:world.me.stage,round:world.me.round});
   notice('💡 GỢI Ý TỪ TRỢ LÝ NOVA',result.hint+' ('+result.cost+')',false,{button:'Quay lại nhiệm vụ'});
   return;
  }
  if(action==='final'){
   const code=$('#finalCode').value.trim();
   const selected=$('input[name="message"]:checked');
   if(!selected)return notice('Thiếu thông điệp','Hãy chọn một trong ba thông điệp từ mật mã.',false);
   const r=await submit('/api/final',{code,choice:Number(selected.value)});
   if(r.correct)notice('🏆 GIẢI CỨU THÀNH PHỐ OXYZ THÀNH CÔNG!','Lõi Trí Tuệ đã được khôi phục: '+r.message,true,{points:r.points,button:'Xem bảng vinh danh →'});
   else notice('MẬT THƯ CHƯA ĐƯỢC MỞ','NOVA gợi ý: '+r.hint,false,{button:'Thử giải mã lại'});
   updateAfterAction();return;
  }
  if(action==='closeModal'){modal=null;$('.modal-backdrop')?.remove();await refresh(true);return;}
  if(action==='pauseGame'){await submit('/api/teacher',{action:'pause'});updateAfterAction();return;}
  if(action==='timerToggle'){await submit('/api/teacher',{action:'timer',value:world.clock.running?'pause':'start'});updateAfterAction();return;}
  if(action==='timerReset'){await submit('/api/teacher',{action:'timer',value:'reset'});updateAfterAction();return;}
  if(action==='setBonus'){const team=$('#bonusTeam').value,value=Number($('#bonusValue').value);await submit('/api/teacher',{action:'bonus',team,value});updateAfterAction();return;}
  if(action==='awards'){showAward=!showAward;render();return;}
  if(action==='print'){window.print();return;}
  if(action==='exportCSV'){exportCSV();return;}
  if(action==='resetTeam'){const team=$('#resetTeam').value;const name=world.teams.find(t=>t.id===team)?.name;if(!confirm('Đặt lại từ đầu toàn bộ nhiệm vụ và điểm của '+name+'?'))return;await submit('/api/teacher',{action:'resetTeam',team});updateAfterAction();return;}
  if(action==='copy'){const url=el.dataset.url;try{await navigator.clipboard.writeText(url);notice('ĐÃ SAO CHÉP LIÊN KẾT',url,true);}catch(e){notice('LIÊN KẾT ĐỘI',url,true);}return;}
 }catch(e){
  notice('THÔNG BÁO',e.message||'Có lỗi xảy ra.',false);
  if(el)el.disabled=false;
 }
}

/* ─── XỬ LÝ SỰ KIỆN BÀN PHÍM, CHUỘT & D-PAD CHO BẢN ĐỒ 2D ─── */
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-action]');
 if(el){e.preventDefault();handle(el.dataset.action,el);return;}
 const vp=e.target.closest('#hwViewport');
 if(vp&&!e.target.closest('.hw-controls-overlay')&&!e.target.closest('.hw-station')&&!e.target.closest('.hw-chest')){
  const wd=$('#hwWorld');if(!wd)return;
  const rect=wd.getBoundingClientRect();
  if(rect.width>0&&rect.height>0){
   const tx=Math.max(6,Math.min(94,(e.clientX-rect.left)/rect.width*100));
   const ty=Math.max(8,Math.min(92,(e.clientY-rect.top)/rect.height*100));
   huntState.targetX=tx;
   huntState.targetY=ty;
   huntState.lastAutoStation=-1;
   const rip=document.createElement('div');
   rip.className='hw-ripple';
   rip.style.left=tx+'%';rip.style.top=ty+'%';
   wd.appendChild(rip);
   setTimeout(()=>rip.remove(),550);
  }
 }
});

document.addEventListener('pointerdown',e=>{
 const dbtn=e.target.closest('[data-dpad]');
 if(dbtn){
  e.preventDefault();
  huntState.keysPressed.add(dbtn.dataset.dpad);
  huntState.targetX=null;huntState.targetY=null;
 }
});
document.addEventListener('pointerup',()=>{
 ['up','down','left','right'].forEach(k=>huntState.keysPressed.delete(k));
});

const keyMap={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',KeyW:'up',KeyS:'down',KeyA:'left',KeyD:'right'};
window.addEventListener('keydown',e=>{
 if(document.activeElement?.matches('input,select,textarea')){
  if(e.key==='Enter'){
   if(document.activeElement.id==='huntShortInput')handle('attackHuntMonster');
   else if(document.activeElement.id==='cdShortInput')handle('submitShortCastle');
   else if(!session)$('#entry [data-action="join"]')?.click();
  }
  return;
 }
 const dir=keyMap[e.code];
 if(dir&&session?.role==='student'&&!huntState.battleOpen){
  e.preventDefault();
  huntState.keysPressed.add(dir);
  huntState.targetX=null;huntState.targetY=null;
 }
});
window.addEventListener('keyup',e=>{
 const dir=keyMap[e.code];
 if(dir)huntState.keysPressed.delete(dir);
});

document.addEventListener('change',e=>{
 if(e.target.id==='clockMinutes'&&session?.role==='teacher'){
  submit('/api/teacher',{action:'timer',value:Number(e.target.value)}).then(updateAfterAction).catch(err=>notice('Lỗi đồng hồ',err.message,false));
 }
});

/* ─── VÒNG LẶP GAME 60FPS CHO CẢ 2 ENGINE (HUNT 2D & CASTLE DEFENSE) ─── */
let lastFrameTs=performance.now();
function gameLoop(now){
 const dt=Math.min(0.08,(now-lastFrameTs)/1000);
 lastFrameTs=now;

 if(session?.role==='student'&&world?.current&&!world.paused&&!world.me?.completed&&world.me?.stage<5){
  const m=world.current;
  const mode=activePlayMode||m.defaultMode||(m.id===2||m.id===5?'defense':'hunt');

  if(mode==='hunt'&&!huntState.battleOpen&&$('#hwViewport')){
   let vx=0,vy=0;
   if(huntState.keysPressed.has('left'))vx-=1;
   if(huntState.keysPressed.has('right'))vx+=1;
   if(huntState.keysPressed.has('up'))vy-=1;
   if(huntState.keysPressed.has('down'))vy+=1;

   if(vx!==0||vy!==0){
    const len=Math.hypot(vx,vy);
    huntState.x=Math.max(6,Math.min(94,huntState.x+(vx/len)*24*dt));
    huntState.y=Math.max(8,Math.min(92,huntState.y+(vy/len)*24*dt));
    huntState.moving=true;
   }else if(huntState.targetX!==null&&huntState.targetY!==null){
    const dx=huntState.targetX-huntState.x, dy=huntState.targetY-huntState.y;
    const dist=Math.hypot(dx,dy);
    if(dist<0.8){
     huntState.x=huntState.targetX;huntState.y=huntState.targetY;
     huntState.targetX=null;huntState.targetY=null;
     huntState.moving=false;
    }else{
     huntState.x+=(dx/dist)*28*dt;
     huntState.y+=(dy/dist)*28*dt;
     huntState.moving=true;
    }
   }else{
    huntState.moving=false;
   }
   updateHuntCamera();

   const curSt=m.huntMap?.stations?.[m.round];
   if(curSt){
    const dSt=Math.hypot(huntState.x-curSt.x,huntState.y-curSt.y);
    if(dSt<=4.2&&huntState.lastAutoStation!==m.round){
     huntState.lastAutoStation=m.round;
     huntState.targetX=null;huntState.targetY=null;huntState.moving=false;
     huntState.battleOpen=true;
     huntState.selectedChoice=null;
     huntState.shortText='';
     huntState.monsterDefeated=false;
     huntState.rewardBadge=null;
     render();
    }else if(dSt>7){
     huntState.lastAutoStation=-1;
    }
   }
  }

  if(mode==='defense'&&$('#cdBattlefield')){
   const up=world.me.upgrades||{damage:1,speed:1,hp:1,regen:1};
   if(now-cdState.lastRegenAt>1000){
    cdState.lastRegenAt=now;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+(up.regen||1)*2);
   }
   if(cdState.enemies.length<4&&now-cdState.lastSpawnAt>3200){
    cdState.lastSpawnAt=now;
    const kinds=['👺','🦇','💀','👹'];
    const lane=Math.floor(Math.random()*3);
    const hp=70+m.id*18+m.round*15;
    cdState.enemies.push({
     id:'en-'+(++cdState.seq),
     lane, x:92,
     hp, maxHp:hp,
     speed:2.0+Math.random()*0.7,
     sprite:kinds[(m.round+lane)%kinds.length],
     isBoss:false
    });
   }
   const slowed=cdState.slowUntil>now;
   const shieldOn=cdState.shieldUntil>now;
   for(let i=cdState.enemies.length-1;i>=0;i--){
    const en=cdState.enemies[i];
    en.x-=en.speed*(slowed?0.35:1)*dt;
    if(en.x<=15){
     const dmg=shieldOn?0:(en.isBoss?22:12);
     cdState.castleHp=Math.max(25,cdState.castleHp-dmg);
     cdState.effects.push({
      id:++cdState.seq,x:15,lane:en.lane,
      text:shieldOn?'🛡️ KHIÊN CHẶN!':`-${dmg} HP`,
      cls:'hit-castle',until:now+700
     });
     if(en.isBoss){
      en.x=78;
     }else{
      cdState.enemies.splice(i,1);
     }
    }
   }
   const fireInterval=Math.max(450,1350-(up.speed||1)*180);
   const heroIcons=['🏹','🔮','⚡'];
   for(let lane=0;lane<3;lane++){
    if(now-cdState.lastHeroShot[lane]>=fireInterval){
     const hasTarget=cdState.enemies.some(e=>e.lane===lane&&e.x>16);
     if(hasTarget){
      cdState.lastHeroShot[lane]=now;
      cdState.projectiles.push({
       id:++cdState.seq,lane,x:17,
       speed:46,
       dmg:20+(up.damage||1)*9,
       icon:heroIcons[lane]
      });
     }
    }
   }
   for(let i=cdState.projectiles.length-1;i>=0;i--){
    const p=cdState.projectiles[i];
    p.x+=p.speed*dt;
    const hitIdx=cdState.enemies.findIndex(e=>e.lane===p.lane&&Math.abs(e.x-p.x)<=3.5);
    if(hitIdx!==-1){
     const target=cdState.enemies[hitIdx];
     target.hp-=p.dmg;
     cdState.effects.push({id:++cdState.seq,x:target.x,lane:target.lane,text:`-${p.dmg}`,cls:'',until:now+550});
     cdState.projectiles.splice(i,1);
     if(target.hp<=0){
      if(target.isBoss){
       target.hp=Math.round(target.maxHp*0.35);
       cdState.effects.push({id:++cdState.seq,x:target.x,lane:target.lane,text:'🎯 GIẢI TOÁN ĐỂ BẮN LASER DIỆT BOSS!',cls:'crit',until:now+900});
      }else{
       cdState.enemies.splice(hitIdx,1);
       world.me.gold=(world.me.gold||120)+5;
      }
     }
    }else if(p.x>98){
     cdState.projectiles.splice(i,1);
    }
   }
   cdState.effects=cdState.effects.filter(fx=>fx.until>now);
   renderCastleDynamicNodes(now);
  }
 }
 requestAnimationFrame(gameLoop);
}

function renderCastleDynamicNodes(now){
 const layer=$('#cdDynamicLayer');if(!layer)return;
 const laneTops=[44,65,86];
 const slowed=cdState.slowUntil>now;
 const laserOn=cdState.laserUntil>now;
 const shieldEl=$('#cdCastleShield');
 if(shieldEl)shieldEl.style.display=cdState.shieldUntil>now?'block':'none';
 const gameRoot=$('#cdGameRoot');
 if(gameRoot)gameRoot.classList.toggle('shake',cdState.shakeUntil>now);
 const hpEl=$('#cdHudHp'), hpBar=$('#cdHudHpBar'), goldEl=$('#cdHudGold'), topGold=$('#topGoldBadge');
 if(hpEl)hpEl.textContent=`${Math.round(cdState.castleHp)} / ${cdState.castleMaxHp}`;
 if(hpBar)hpBar.style.width=`${Math.max(0,Math.min(100,Math.round(cdState.castleHp/cdState.castleMaxHp*100)))}%`;
 if(goldEl&&world?.me)goldEl.textContent=`${world.me.gold??120} Vàng`;
 if(topGold&&world?.me)topGold.textContent=world.me.gold??120;

 const weatherHtml=(slowed?'<div class="cd-weather-freeze"></div>':'')+(laserOn?'<div class="cd-laser-beam"></div>':'');
 const enemiesHtml=cdState.enemies.map(en=>`<div class="cd-enemy ${en.isBoss?'is-boss':''} ${slowed?'is-slowed':''}" style="left:${en.x.toFixed(1)}%;top:${laneTops[en.lane]}%">
  <div class="cd-enemy-hp"><i style="width:${Math.max(0,Math.round(en.hp/en.maxHp*100))}%"></i></div>
  <div class="cd-enemy-sprite">${en.sprite}</div>
 </div>`).join('');

 const projHtml=cdState.projectiles.map(p=>`<div class="cd-proj" style="left:${p.x.toFixed(1)}%;top:${laneTops[p.lane]}%">${p.icon}</div>`).join('');
 const fxHtml=cdState.effects.map(fx=>`<div class="cd-fx ${fx.cls||''}" style="left:${fx.x.toFixed(1)}%;top:${laneTops[fx.lane]-6}%">${esc(fx.text)}</div>`).join('');
 layer.innerHTML=weatherHtml+enemiesHtml+projHtml+fxHtml;
}

function awardScreen(){
 if(!world||world.role!=='teacher')return '';
 const ts=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const finished=ts.filter(t=>t.completed).length;
 const bestCoop=[...ts].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="award-backdrop"><div class="award-panel">
 <div class="stars">✦ ✧ ★ ✦ ★</div><div class="eyebrow">MATHVERSE OXYZ • LỄ VINH DANH</div>
 <h1>${finished>0?'GIẢI CỨU THÀNH PHỐ OXYZ THÀNH CÔNG!':'BẢNG XẾP HẠNG TẠM THỜI'}</h1>
 <p>${finished>0?'Lõi Trí Tuệ đã được khôi phục. Xin chúc mừng các biệt đội Toán học!':'Các đội đang nỗ lực vượt qua 5 chặng thử thách!'}</p>
 <div class="podium">${ts.slice(0,3).map((t,i)=>`<div class="podium-item ${i===0?'gold-podium':''}">
 <div style="font-size:35px">${i===0?'🥇':i===1?'🥈':'🥉'}</div><div class="podium-avatar">${t.avatar}</div>
 <b>${esc(t.name)}</b><strong>${t.score} XP</strong><small>${t.completed?'🔓 Mở kho báu':'Chặng '+t.stage+'/5'}</small></div>`).join('')}</div>
 <div class="winner-bottom">🤝 Giải hợp tác: <b>${bestCoop.bonus>0?esc(bestCoop.name):'Giáo viên công bố'}</b> · 🔐 Đã giải mã: <b>${finished} đội</b></div>
 <div class="controls" style="justify-content:center">${btn('⬅ Quay về màn hình giáo viên','awards','gray')}${btn('📥 Tải bảng điểm CSV','exportCSV','gold')}</div>
 </div></div>`;
}

function exportCSV(){
 const columns=['Thứ hạng','Tên đội','Nhân vật','Số trạm qua','Lượt trong trạm','Số câu sai','Số khiên còn','Vàng tích lũy','Cấp Anh Hùng','Chuỗi Combo','Điểm nhiệm vụ','Điểm hợp tác','Tổng XP','Đã giải mã','Thời điểm hoàn thành'];
 const ordered=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const rows=ordered.map((t,i)=>[i+1,t.name,t.avatar,t.stage,t.round,t.wrong,t.health,t.gold??120,t.heroLevel??1,t.streak||0,t.score-t.bonus,t.bonus,t.score,t.completed?'Có':'Chưa',t.finishedAt?new Date(t.finishedAt).toLocaleString('vi-VN'):'']);
 const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
 const csv='\ufeff'+[columns,...rows].map(r=>r.map(quote).join(',')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
 const link=URL.createObjectURL(blob);const a=document.createElement('a');a.href=link;a.download='MATHVERSE_OXYZ_KET_QUA_'+world.room+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(link),1500);
}

session=restoreSession();
if(session){refresh(true);}else{startScreen();}
setInterval(()=>{if(session&&!document.hidden)refresh(false);},2500);
setInterval(updateClock,400);
requestAnimationFrame(gameLoop);
