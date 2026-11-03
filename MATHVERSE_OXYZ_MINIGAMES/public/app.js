/* MATHVERSE OXYZ — Hệ thống Game Tương Tác Nhóm (Săn Kho Báu 2D, Bảo Vệ Thành Trì & Mô hình 3D Oxyz) */
'use strict';
const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function formatMath(str){
 if(!str)return '';
 return esc(str)
   .replace(/\\vec\{([A-Za-z0-9]+)\}/g, '<span class="math-vec">$1<i>→</i></span>')
   .replace(/\\vec\s*([A-Za-z0-9]+)/g, '<span class="math-vec">$1<i>→</i></span>')
   .replace(/\\cdot/g, '<span class="math-sym">·</span>')
   .replace(/\\perp/g, '<span class="math-sym">⊥</span>')
   .replace(/\\sqrt\{([^}]+)\}/g, '<span class="math-sym">√</span>($1)')
   .replace(/\\approx/g, '≈')
   .replace(/\\pi/g, 'π')
   .replace(/\\text\{([^}]+)\}/g, '$1')
   .replace(/\^2/g, '²')
   .replace(/\^3/g, '³');
}
const app=$('#app');
const qs=new URLSearchParams(location.search);
let session=null, world=null, modal=null, busy=false, showAward=false, soundEnabled=true;
let lastSignature='', lastStudentKey='', clockBase=null, tickBase=0;
let activePlayMode=null; // 'hunt' | 'defense'
let teacherPreviewStage=0;
window.IS_DEMO_MODE=Boolean(typeof demoApi==='function');

/* ─── TRẠNG THÁI MÔ HÌNH HÌNH HỌC 3D OXYZ HOLOGRAM ─── */
const oxyz3D={
 yaw:38,       // góc xoay ngang (độ)
 pitch:24,     // góc nghiêng dọc (độ)
 showProj:true, // hiện đường gióng tọa độ (x,y,0)
 open:false    // mặc định thu gọn để ưu tiên toàn màn hình cho game chạy tìm trạm
};

const missionMeta=[
 {icon:'🏝️',place:'Rừng Vectơ Khởi Nguyên',sub:'Tọa độ vectơ AB',biome:'#10b981',mode:'🗺️ Săn Kho Báu 2D'},
 {icon:'🏰',place:'Pháo Đài Góc Vuông',sub:'Tích vô hướng u·v',biome:'#3b82f6',mode:'🏰 Thủ Thành 3 Làn'},
 {icon:'💠',place:'Tháp Pha Lê Khoảng Cách',sub:'Độ dài & Khoảng cách',biome:'#a855f7',mode:'🧟 Chặn Zombie 4 Làn'},
 {icon:'🌀',place:'Mê Cung Trung Điểm',sub:'Trung điểm & Trọng tâm',biome:'#14b8a6',mode:'🌀 Mê Cung Tọa Độ'},
 {icon:'🐲',place:'Thành Trì Lõi Trí Tuệ',sub:'Cùng phương & Tổng hợp',biome:'#ef4444',mode:'🐲 Đấu Trường Boss'}
];
const labels=['A','B','C','D'];
const initialRoom=(qs.get('room')||'').trim().toUpperCase();
const initialTeam=qs.get('team')||'';
const initialView=qs.get('view')||'';

/* ─── TRẠNG THÁI ENGINE 1: SĂN KHO BÁU 2D (HUNT MAP) ─── */
const cipherState = {
 open: false,
 slots: [null, null, null, null, null],
 error: null,
 successMsg: null,
 solving: false
};
let showRolesModal = false;
let questDialogue = null;
let currentHintLevel = 0;


/* ─── TRẠNG THÁI ENGINE 4: MÊ CUNG TỌA ĐỘ Ô VUÔNG (GRID MAZE) ─── */
const mazeState = {
 x: 0,
 y: 0,
 walls: new Set(['1,1', '1,2', '1,4', '2,4', '3,1', '3,5', '4,2', '4,4', '5,1', '5,3', '6,3', '6,5', '7,2', '7,4']),
 waypoints: [
  {x: 4, y: 3, label: 'M(4; 3)', badge: 'Mảnh T'},
  {x: 3, y: 3, label: 'G(3; 3)', badge: 'Mảnh R'},
  {x: 4, y: 1, label: 'D(4; -2)', badge: 'Mảnh U'},
  {x: 2, y: 1, label: 'G₂(2; 1)', badge: 'Mảnh N'},
  {x: 3, y: 2, label: 'K(3; 1)', badge: 'Mảnh G'}
 ]
};
function isMazeWall(x, y){
 return mazeState.walls.has(x + ',' + y);
}


/* ─── TRẠNG THÁI ENGINE 3: CHẶN ZOMBIE 4 LÀN (ZOMBIE DEFENSE) ─── */

function playZdSound(type){
 try{
  const src = type==='hit' ? '/sounds/sfx/correct.mp3' : (type==='miss' ? '/sounds/sfx/incorrect.mp3' : null);
  if(src){
   const a = new Audio(src);
   a.volume = 0.85;
   a.play().catch(()=>{});
  }
 }catch(e){}
 sound(type==='hit' ? 'laser' : 'wrong');
}





/* ─── TRẠNG THÁI ENGINE 5: DÒ MÌN GIAOVIENDOIMOI (EXACT RUNNING SOLDIER & DIRECTION) ─── */
const msState = {
  aimedPad: 0,
  walking: false,
  shaking: false,
  wobble: false,
  lastChoice: null,
  resultType: null,
  posX: 50,
  posY: 82,
  blastX: null,
  blastY: null,
  direction: 'up',
  frame: 0,
  animTimer: null,
  explodedMines: []
};

function playMsSound(type){
  try{
    const src = type==='safe' ? '/sounds/sfx/correct.mp3' : (type==='mine' ? '/sounds/sfx/explosion.mp3' : null);
    if(src){
      const a = new Audio(src);
      a.volume = 0.85;
      a.play().catch(()=>{});
    }
  }catch(e){}
  sound(type==='safe' ? 'laser' : 'wrong');
}

function startSoldierRunning(dir, durationMs){
  msState.walking = true;
  msState.direction = dir;
  msState.frame = 0;
  if(msState.animTimer) clearInterval(msState.animTimer);
  msState.animTimer = setInterval(()=>{
    msState.frame = (msState.frame === 0 ? 1 : 0);
    render();
  }, 110);
  setTimeout(()=>{
    if(msState.animTimer) clearInterval(msState.animTimer);
    msState.animTimer = null;
    msState.walking = false;
    msState.frame = 0;
    render();
  }, durationMs);
}

function getSoldierSprite(){
  if(msState.wobble){
    return '/images/minesweeper/soldier-down-1.png';
  }
  if(!msState.walking){
    return '/images/minesweeper/soldier-up-1.png';
  }
  const f = msState.frame + 1; // 1 hoặc 2
  if(msState.direction === 'left') return `/images/minesweeper/soldier-left-${f}.png`;
  if(msState.direction === 'right') return `/images/minesweeper/soldier-right-${f}.png`;
  if(msState.direction === 'down') return `/images/minesweeper/soldier-down-${f}.png`;
  return `/images/minesweeper/soldier-up-${f}.png`;
}

/* ─── TRẠNG THÁI ENGINE 3: CHẶN ZOMBIE 4 LÀN (ZOMBIE DEFENSE) ─── */

function playZdSound(type){
 try{
  const src = type==='hit' ? '/sounds/sfx/correct.mp3' : (type==='miss' ? '/sounds/sfx/incorrect.mp3' : null);
  if(src){
   const a = new Audio(src);
   a.volume = 0.85;
   a.play().catch(()=>{});
  }
 }catch(e){}
 sound(type==='hit' ? 'laser' : 'wrong');
}




/* ─── TRẠNG THÁI ENGINE 5: DÒ MÌN GIAOVIENDOIMOI (EXACT MATCHING SCREENSHOT) ─── */




/* ─── TRẠNG THÁI ENGINE 3: CHẶN ZOMBIE 4 LÀN (ZOMBIE DEFENSE) ─── */

function playZdSound(type){
 try{
  const src = type==='hit' ? '/sounds/sfx/correct.mp3' : (type==='miss' ? '/sounds/sfx/incorrect.mp3' : null);
  if(src){
   const a = new Audio(src);
   a.volume = 0.85;
   a.play().catch(()=>{});
  }
 }catch(e){}
 sound(type==='hit' ? 'laser' : 'wrong');
}



/* ─── TRẠNG THÁI ENGINE 5: DÒ MÌN BÃI ĐÁ RỪNG THẦN (MINESWEEPER GIAOVIENDOIMOI) ─── */




/* ─── TRẠNG THÁI ENGINE 3: CHẶN ZOMBIE 4 LÀN (ZOMBIE DEFENSE) ─── */

function playZdSound(type){
 try{
  const src = type==='hit' ? '/sounds/sfx/correct.mp3' : (type==='miss' ? '/sounds/sfx/incorrect.mp3' : null);
  if(src){
   const a = new Audio(src);
   a.volume = 0.85;
   a.play().catch(()=>{});
  }
 }catch(e){}
 sound(type==='hit' ? 'laser' : 'wrong');
}


/* ─── TRẠNG THÁI ENGINE 5: DÒ MÌN BÃI ĐÁ RỪNG THẦN (MINESWEEPER GIAOVIENDOIMOI) ─── */




const zdState = {
 lane: 0,
 shooting: false,
 hitLane: null,
 hitType: null
};

const huntState={
 stageId:-1,
 x:14, y:50,
 targetX:null, targetY:null,
 keysPressed:new Set(),
 moving:false,
 facing:'right',
 isSprinting:false,
 battleOpen:false,
 selectedChoice:null,
 shortText:'',
 monsterDefeated:false,
 rewardBadge:null,
 lastAutoStation:-1,
 lastStepSfxAt:0,
 collectibles:[],
 popups:[]
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
 if(typeof demoApi==='function')return demoApi(route,payload);
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

function renderOxyz3D(m, forceOpen=false){
 const v3=m.visual3D||{
  title:'Mô hình Hệ trục tọa độ Oxyz',
  formula:'\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)',
  points:[{label:'A',coords:[1,2,3],color:'#38bdf8'},{label:'B',coords:[4,-2,3],color:'#facc15'}],
  vectors:[{from:[1,2,3],to:[4,-2,3],color:'#4ade80',label:'AB'}]
 };
 const hlAxis=m.challenge?.highlightAxis||'all';
 if(!oxyz3D.open && !forceOpen){
  return `<div class="oxyz-compact-bar">
   <div style="display:flex;align-items:center;gap:8px">
    <span class="oxyz-compact-tag">🧊 3D OXYZ</span>
    <span style="font-size:12.5px;font-weight:900;color:#e0f2fe">${esc(v3.title)} · <b style="color:#fde047">${esc(v3.formula||'')}</b></span>
   </div>
   <button type="button" class="oxyz-btn" data-action="toggle3DPanel">👁️ Mở Mô hình 3D Oxyz Tra Cứu</button>
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
   const coords = Array.isArray(pt.coords) ? pt.coords : [Number(pt.x||0), Number(pt.y||0), Number(pt.z||0)];
   const [px,py,pz]=coords;
   const P=project3DPoint(px,py,pz);
   const Pxy=project3DPoint(px,py,0);
   const Px=project3DPoint(px,0,0);
   const Py=project3DPoint(0,py,0);
   projLines+=`
    <line x1="${P.sx}" y1="${P.sy}" x2="${Pxy.sx}" y2="${Pxy.sy}" stroke="${pt.color||'#38bdf8'}" stroke-width="1.3" stroke-dasharray="3 3" opacity="0.75"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Px.sx}" y2="${Px.sy}" stroke="rgba(239,68,68,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <line x1="${Pxy.sx}" y1="${Pxy.sy}" x2="${Py.sx}" y2="${Py.sy}" stroke="rgba(16,185,129,0.5)" stroke-width="1.1" stroke-dasharray="2 3"/>
    <circle cx="${Pxy.sx}" cy="${Pxy.sy}" r="2.5" fill="${pt.color||'#38bdf8'}" opacity="0.6"/>`;
  });
 }

 // Vẽ các Vectơ trong không gian 3D
 const vecSvg=(v3.vectors||[]).map(v=>{
  const vFrom = Array.isArray(v.from) ? v.from : [0, 0, 0];
  const vTo = Array.isArray(v.to) ? v.to : [0, 0, 0];
  const pFrom=project3DPoint(...vFrom);
  const pTo=project3DPoint(...vTo);
  const mx=((pFrom.sx+pTo.sx)/2).toFixed(1);
  const my=((pFrom.sy+pTo.sy)/2-7).toFixed(1);
  return `<g>
   <line x1="${pFrom.sx}" y1="${pFrom.sy}" x2="${pTo.sx}" y2="${pTo.sy}" stroke="${v.color||'#4ade80'}" stroke-width="3.2" marker-end="url(#arrow3d)"/>
   <text x="${mx}" y="${my}" fill="${v.color||'#4ade80'}" font-size="11" font-weight="900" text-anchor="middle" style="text-shadow:0 2px 4px #000">→${esc(v.label)}</text>
  </g>`;
 }).join('');

 // Vẽ các Điểm trong không gian 3D
 const ptsSvg=(v3.points||[]).map(pt=>{
  const coords = Array.isArray(pt.coords) ? pt.coords : [Number(pt.x||0), Number(pt.y||0), Number(pt.z||0)];
  const P=project3DPoint(...coords);
  const coordStr=`(${coords.join(';')})`;
  const rawLabel=String(pt.label||'');
  const displayLabel=rawLabel.includes('(')?rawLabel:`${rawLabel}${coordStr}`;
  return `<g>
   <circle cx="${P.sx}" cy="${P.sy}" r="5.5" fill="${pt.color||'#facc15'}" stroke="#fff" stroke-width="1.8"/>
   <text x="${P.sx+7}" y="${P.sy-6}" fill="#ffffff" font-size="11" font-weight="900" style="text-shadow:0 2px 4px #000">${esc(displayLabel)}</text>
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
 const defs=`
  <defs>
   <linearGradient id="riverWater" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#0284c7"/>
    <stop offset="50%" stop-color="#38bdf8"/>
    <stop offset="100%" stop-color="#0369a1"/>
   </linearGradient>
   <linearGradient id="lavaRiver" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#991b1b"/>
    <stop offset="35%" stop-color="#dc2626"/>
    <stop offset="70%" stop-color="#f97316"/>
    <stop offset="100%" stop-color="#facc15"/>
   </linearGradient>
   <linearGradient id="manaStream" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#6366f1"/>
    <stop offset="50%" stop-color="#a855f7"/>
    <stop offset="100%" stop-color="#38bdf8"/>
   </linearGradient>
   <linearGradient id="bridgePlankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#451a03"/>
    <stop offset="30%" stop-color="#78350f"/>
    <stop offset="70%" stop-color="#92400e"/>
    <stop offset="100%" stop-color="#451a03"/>
   </linearGradient>
  </defs>`;

 if(theme==='forest'){
  bgShapes=`
   ${defs}
   <!-- DÒNG SÔNG CỔ TỰ NHIÊN UỐN LƯỢN QUA LỤC ĐỊA -->
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="#14532d" stroke-width="90" stroke-linecap="round"/>
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="#b45309" stroke-width="78" stroke-opacity="0.32" stroke-linecap="round"/>
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="url(#riverWater)" stroke-width="62" stroke-linecap="round"/>
   <!-- Gợn sóng chuyển động lăn tăn -->
   <path d="M 510 0 C 535 180, 495 300, 516 410 C 538 520, 485 640, 520 820" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="4.5" stroke-dasharray="16 26" class="hw-river-flow" stroke-linecap="round"/>
   <!-- Nhánh suối nhỏ phía Đông -->
   <path d="M 516 410 Q 640 430 762 422 T 950 460" fill="none" stroke="#0284c7" stroke-width="26" stroke-opacity="0.65" stroke-linecap="round"/>
   <!-- Bụi hoa súng ven sông -->
   <circle cx="496" cy="180" r="9" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
   <circle cx="538" cy="630" r="11" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
   <!-- CẦU GỖ CỔ TÍCH CHÍNH TẠI ĐIỂM GIAO ĐƯỜNG MÒN (x=516, y=410, xoay 57 độ theo góc đường) -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-62" y="-30" width="20" height="60" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <rect x="42" y="-30" width="20" height="60" rx="5" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <rect x="-48" y="-26" width="96" height="52" rx="4" fill="url(#bridgePlankGrad)" stroke="#b45309" stroke-width="3" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.45))"/>
    <line x1="-38" y1="-26" x2="-38" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-26" y1="-26" x2="-26" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-14" y1="-26" x2="-14" y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="-2"  y1="-26" x2="-2"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="10"  y1="-26" x2="10"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="22"  y1="-26" x2="22"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <line x1="34"  y1="-26" x2="34"  y2="26" stroke="#261005" stroke-width="2.5"/>
    <!-- Lan can gỗ bảo vệ và đèn lồng mạ vàng -->
    <rect x="-50" y="-28" width="100" height="6" rx="2" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
    <rect x="-50" y="22"  width="100" height="6" rx="2" fill="#d97706" stroke="#451a03" stroke-width="1.5"/>
    <circle cx="-42" cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="0"   cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="42"  cy="-25" r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="-42" cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="0"   cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
    <circle cx="42"  cy="25"  r="3.5" fill="#facc15" stroke="#78350f" stroke-width="1"/>
   </g>
   <!-- CẦU ĐÁ PHỤ TẠI NHÁNH SUỐI ĐÔNG (x=762, y=422, xoay -60 độ) -->
   <g transform="translate(762, 422) rotate(-60)">
    <rect x="-35" y="-20" width="70" height="40" rx="6" fill="#475569" stroke="#94a3b8" stroke-width="2.5"/>
    <rect x="-28" y="-16" width="56" height="32" rx="3" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
    <circle cx="-25" cy="-18" r="3" fill="#38bdf8"/>
    <circle cx="25"  cy="-18" r="3" fill="#38bdf8"/>
    <circle cx="-25" cy="18"  r="3" fill="#38bdf8"/>
    <circle cx="25"  cy="18"  r="3" fill="#38bdf8"/>
   </g>`;
 }else if(theme==='fortress'){
  bgShapes=`
   ${defs}
   <!-- SÔNG DUNG NHAM NÚI LỬA NÓNG CHẢY -->
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="#0f172a" stroke-width="96" stroke-linecap="round"/>
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="#dc2626" stroke-width="82" stroke-opacity="0.45" stroke-linecap="round"/>
   <path d="M 510 0 C 490 200, 540 320, 516 410 C 490 510, 530 650, 510 820" fill="none" stroke="url(#lavaRiver)" stroke-width="64" stroke-linecap="round"/>
   <!-- Bọt lửa sôi sục -->
   <circle cx="505" cy="220" r="7" fill="#fef08a" opacity="0.9"/>
   <circle cx="530" cy="580" r="9" fill="#fef08a" opacity="0.9"/>
   <!-- CẦU THÉP NÚI LỬA CHỐNG NHIỆT OXYZ -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-60" y="-28" width="120" height="56" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="3" filter="drop-shadow(0 6px 12px rgba(249,115,22,0.35))"/>
    <line x1="-40" y1="-28" x2="40" y2="28" stroke="#facc15" stroke-width="2"/>
    <line x1="-40" y1="28" x2="40" y2="-28" stroke="#facc15" stroke-width="2"/>
    <circle cx="-45" cy="0" r="5" fill="#ef4444"/>
    <circle cx="45" cy="0" r="5" fill="#ef4444"/>
   </g>`;
 }else if(theme==='crystal'){
  bgShapes=`
   ${defs}
   <!-- DÒNG SÔNG NĂNG LƯỢNG ÁNH SÁNG TỰ NHIÊN -->
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#1e1b4b" stroke-width="86" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="url(#manaStream)" stroke-width="58" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#bae6fd" stroke-width="3" stroke-dasharray="14 24" class="hw-river-flow"/>
   <!-- CẦU PHA LÊ NĂNG LƯỢNG NGỌC BÍCH -->
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-56" y="-26" width="112" height="52" rx="8" fill="rgba(30,27,75,0.85)" stroke="#38bdf8" stroke-width="3" filter="drop-shadow(0 0 16px rgba(56,189,248,0.5))"/>
    <polygon points="-40,-18 -20,-18 -30,-8" fill="#a855f7"/>
    <polygon points="20,-18 40,-18 30,-8" fill="#a855f7"/>
    <polygon points="-40,18 -20,18 -30,8" fill="#38bdf8"/>
    <polygon points="20,18 40,18 30,8" fill="#38bdf8"/>
   </g>`;
 }else if(theme==='maze'){
  bgShapes=`
   ${defs}
   <!-- HỆ THỐNG KÊNH NƯỚC CỔ MÊ CUNG HY LẠP -->
   <path d="M 516 0 L 516 820" fill="none" stroke="#042f2e" stroke-width="84"/>
   <path d="M 516 0 L 516 820" fill="none" stroke="#0d9488" stroke-width="56"/>
   <path d="M 516 0 L 516 820" fill="none" stroke="#5eead4" stroke-width="4" stroke-dasharray="24 20" class="hw-river-flow"/>
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-55" y="-26" width="110" height="52" rx="4" fill="#134e4a" stroke="#2dd4bf" stroke-width="3"/>
    <circle cx="-42" cy="-20" r="4" fill="#99f6e4"/>
    <circle cx="42" cy="-20" r="4" fill="#99f6e4"/>
    <circle cx="-42" cy="20" r="4" fill="#99f6e4"/>
    <circle cx="42" cy="20" r="4" fill="#99f6e4"/>
   </g>`;
 }else{
  bgShapes=`
   ${defs}
   <!-- HÀO NƯỚC HOÀNG GIA BAO QUANH ĐIỆN THỜ -->
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#2e1065" stroke-width="84" stroke-linecap="round"/>
   <path d="M 510 0 C 530 200, 490 320, 516 410 C 540 520, 480 640, 515 820" fill="none" stroke="#7c3aed" stroke-width="56" stroke-linecap="round"/>
   <g transform="translate(516, 410) rotate(57)">
    <rect x="-60" y="-28" width="120" height="56" rx="6" fill="#4c1d95" stroke="#facc15" stroke-width="3" filter="drop-shadow(0 6px 14px rgba(250,204,21,0.4))"/>
    <circle cx="-45" cy="0" r="6" fill="#facc15"/>
    <circle cx="45" cy="0" r="6" fill="#facc15"/>
   </g>`;
 }

 return `<svg class="hw-path-svg" viewBox="0 0 1200 820" preserveAspectRatio="none">
  ${bgShapes}
  <!-- NỀN ĐƯỜNG ĐẤT NỆN RỘNG RÃI -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(15,23,42,0.85)" stroke-width="52" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- LỚP ĐÁ CUỘI LÁT ĐƯỜNG PHIÊU LƯU (COBBLESTONE TRAIL) -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(113,113,122,0.72)" stroke-width="40" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- VIỀN CỎ VÀ HOA DẠI DỌC LỀ ĐƯỜNG -->
  <polyline points="${pathPts}" fill="none" stroke="rgba(63,63,70,0.52)" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- VẠCH CHỈ HƯỚNG DẠ QUANG VÀNG KIM CHÍNH GIỮA -->
  <polyline points="${pathPts}" fill="none" stroke="#facc15" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="16 16"/>
  <!-- ĐỐM NĂNG LƯỢNG OXYZ PHÁT SÁNG -->
  <polyline points="${pathPts}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4 32"/>
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
  const totalR = (world?.stages?.[i]?.totalRounds) || 3;
  const filledStars = Math.max(0, Math.min(3, Math.round((curRound / totalR) * 3)));
  const emptyStars = Math.max(0, 3 - filledStars);
  const stars = stage === -1 ? '⭐⭐⭐' : (i < stage ? '⭐⭐⭐' : (i === stage ? ('⭐'.repeat(Math.max(0, Math.min(3, Math.floor(filledStars) || 0))) + '☆'.repeat(Math.max(0, Math.min(3, Math.floor(emptyStars) || 0)))) : '☆☆☆'));
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
 <div class="controls" style="margin-bottom:16px">${window.IS_DEMO_MODE?btn('▶ Vào Đội Rồng Xanh (Trải nghiệm Game)','demoPlay','teal'):''}${btn('📢 Nhắn gửi toàn lớp','teacherBroadcast','teal')}${btn('💖 Hồi 3 khiên cả lớp','teacherHealAll','gold')}${btn('✨ Thưởng +5 XP cả lớp','teacherBonusAll','primary')}${btn(world.paused?'▶ Tiếp tục game':'⏸ Tạm dừng lớp học','pauseGame',world.paused?'teal':'gold')}${btn('🏆 Công bố giải thưởng','awards','primary')}${btn('📥 Xuất CSV minh chứng','exportCSV','gray')}${btn('🖨️ In bảng kết quả','print','gray')}<span class="pill ${world.paused?'pink':'green'}">${world.paused?'🔒 Đang tạm dừng để GV giảng bài':'🟢 Học sinh đang làm nhiệm vụ'}</span></div>
 <section class="panel" style="margin-bottom:16px">
  <div class="section-title">
   <h2>🧊 Chiếu Mô Hình Không Gian 3D Oxyz Lên Bảng Giảng</h2>
   <div class="controls">
    ${[0,1,2,3,4].map(idx=>`<button type="button" class="button sm ${teacherPreviewStage===idx?'primary':'gray'}" data-action="preview3DStage" data-stage="${idx}">Chặng ${idx+1}: ${esc(missionMeta[idx]?.place||'')}</button>`).join('')}
   </div>
  </div>
  ${renderOxyz3D(world.missions[teacherPreviewStage]||world.stages[teacherPreviewStage], true)}
 </section>
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
  huntState.moving=false;
  huntState.facing='right';
  huntState.isSprinting=false;
  huntState.battleOpen=false;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  huntState.lastAutoStation=-1;
  huntState.lastStepSfxAt=0;
  // Bố trí 6 Tinh thể & Vật phẩm có thể nhặt được trên đường đi khám phá
  huntState.collectibles=[
   {id:'c1',x:22,y:38,type:'gold',val:25,icon:'🪙',label:'+25 Vàng',collected:false},
   {id:'c2',x:44,y:24,type:'xp',  val:5, icon:'💎',label:'+5 XP',   collected:false},
   {id:'c3',x:49,y:55,type:'gold',val:30,icon:'🪙',label:'+30 Vàng',collected:false},
   {id:'c4',x:63,y:60,type:'xp',  val:5, icon:'💎',label:'+5 XP',   collected:false},
   {id:'c5',x:82,y:38,type:'gold',val:35,icon:'🪙',label:'+35 Vàng',collected:false},
   {id:'c6',x:38,y:68,type:'shield',val:1,icon:'🛡️',label:'+1 Khiên',collected:false}
  ];
  huntState.popups=[];
 }
 return hm;
}

function getMapDecorations(theme){
 const fireflies=`
  <div class="hw-firefly" style="left:28%;top:35%;animation-delay:.2s"></div>
  <div class="hw-firefly" style="left:52%;top:48%;animation-delay:1.1s"></div>
  <div class="hw-firefly" style="left:68%;top:25%;animation-delay:.7s"></div>
  <div class="hw-firefly" style="left:75%;top:68%;animation-delay:1.6s"></div>
  <div class="hw-firefly" style="left:42%;top:78%;animation-delay:2.1s"></div>`;

 if(theme==='maze'){
  return fireflies+`
   <div class="hw-wall-block" style="left:21%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:41%;top:38%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:63%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-monument" style="left:16%;top:20%" title="Bia đá Trục Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:58%;top:65%" title="Bia đá Trục Oy"><span class="hw-monument-rune">Oy</span></div>
   <div class="hw-monument" style="left:80%;top:18%" title="Bia đá Trục Oz"><span class="hw-monument-rune">Oz</span></div>
   <div class="hw-obstacle" style="left:16%;top:22%">🗿</div>
   <div class="hw-obstacle" style="left:48%;top:18%">🕯️</div>
   <div class="hw-obstacle" style="left:82%;top:76%">🏛️</div>`;
 }
 if(theme==='crystal'){
  return fireflies+`
   <div class="hw-wall-block" style="left:22%;top:58%;width:12%;height:6%"></div>
   <div class="hw-wall-block" style="left:42%;top:22%;width:12%;height:6%"></div>
   <div class="hw-crystal-spire" style="left:24%;top:20%">💎</div>
   <div class="hw-crystal-spire" style="left:45%;top:48%">🔮</div>
   <div class="hw-crystal-spire" style="left:64%;top:75%">🔷</div>
   <div class="hw-crystal-spire" style="left:82%;top:22%">✨</div>
   <div class="hw-monument" style="left:38%;top:16%" title="Trục Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:78%;top:72%" title="Trục Oy"><span class="hw-monument-rune">Oy</span></div>`;
 }
 if(theme==='fortress'||theme==='citadel'){
  return fireflies+`
   <div class="hw-wall-block" style="left:23%;top:14%;width:4%;height:26%"></div>
   <div class="hw-wall-block" style="left:62%;top:56%;width:4%;height:28%"></div>
   <div class="hw-monument" style="left:20%;top:68%" title="Pháp trận Ox"><span class="hw-monument-rune">Ox</span></div>
   <div class="hw-monument" style="left:70%;top:18%" title="Pháp trận Oy"><span class="hw-monument-rune">Oy</span></div>
   <div class="hw-monument" style="left:84%;top:68%" title="Pháp trận Oz"><span class="hw-monument-rune">Oz</span></div>
   <div class="hw-obstacle" style="left:18%;top:75%">🔥</div>
   <div class="hw-obstacle" style="left:45%;top:20%">⚔️</div>
   <div class="hw-obstacle" style="left:66%;top:18%">🌋</div>
   <div class="hw-obstacle" style="left:82%;top:74%">🛡️</div>`;
 }
 return fireflies+`
  <!-- CÂY CỐI ĐA TẦNG CÓ BÓNG ĐỔ VÀ CHI TIẾT LÁ XANH -->
  <div class="hw-nature-tree" style="left:16%;top:20%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown oak">🌳</div></div>
  <div class="hw-nature-tree" style="left:26%;top:72%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown pine">🌲</div></div>
  <div class="hw-nature-tree" style="left:44%;top:16%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown palm">🌴</div></div>
  <div class="hw-nature-tree" style="left:64%;top:62%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown oak">🌳</div></div>
  <div class="hw-nature-tree" style="left:82%;top:20%"><div class="hw-tree-shadow"></div><div class="hw-tree-crown pine">🌲</div></div>
  <!-- BIA ĐÁ KHẮC HỆ TRỤC TỌA ĐỘ OXYZ CỔ ĐẠI -->
  <div class="hw-monument" style="left:21%;top:46%" title="Cột mốc O(0;0;0)"><span class="hw-monument-rune">O</span></div>
  <div class="hw-monument" style="left:38%;top:18%" title="Cột mốc Trục Hoành Ox"><span class="hw-monument-rune">Ox</span></div>
  <div class="hw-monument" style="left:60%;top:78%" title="Cột mốc Trục Tung Oy"><span class="hw-monument-rune">Oy</span></div>
  <div class="hw-monument" style="left:78%;top:22%" title="Cột mốc Trục Cao Oz"><span class="hw-monument-rune">Oz</span></div>
  <!-- TẢNG ĐÁ & HOA DẠI RỰC RỠ -->
  <div class="hw-obstacle" style="left:45%;top:47%">🪨</div>
  <div class="hw-obstacle" style="left:82%;top:74%">⛺</div>`;
}

function renderCipherNotebookModal(m){
 const cipherLetters = m.cipherLetters || (m.cipher ? m.cipher.split('') : ['P','H','A','L','E']);
 const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
 const earnedLetters = isReady ? [...cipherLetters] : (m.allRounds || []).slice(0, m.round).map(r => r.cipherPiece).filter(Boolean);
 
 const placedLetters = cipherState.slots.filter(Boolean);
 const availableChips = [...earnedLetters];
 placedLetters.forEach(ch => {
  const idx = availableChips.indexOf(ch);
  if (idx !== -1) availableChips.splice(idx, 1);
 });
 
 const slotsHtml = [0, 1, 2, 3, 4].map(idx => {
  const val = cipherState.slots[idx];
  if (val) {
   return `<div class="hw-cipher-slot filled" data-action="removeCipherSlot" data-slot="${idx}" title="Chạm để gỡ chữ">
    <span class="hw-cipher-slot-num">${idx + 1}</span>
    <span class="hw-cipher-slot-letter">${esc(val)}</span>
    <span class="hw-slot-remove-btn">×</span>
   </div>`;
  }
  return `<div class="hw-cipher-slot empty" title="Ô ký tự ${idx + 1}">
   <span class="hw-cipher-slot-num">${idx + 1}</span>
   <span class="hw-cipher-slot-placeholder">?</span>
  </div>`;
 }).join('');
 
 const chipsHtml = availableChips.length ? availableChips.map(ch => `
  <button type="button" class="hw-cipher-chip" data-action="placeCipherChip" data-char="${esc(ch)}" title="Chạm để xếp vào ô tiếp theo">
   ${esc(ch)}
  </button>
 `).join('') : `<span style="color:#94a3b8;font-size:12.5px;font-style:italic">Đã xếp hết các mảnh ký tự vào ô phía trên.</span>`;

 return `<div class="hw-cipher-backdrop">
  <div class="hw-cipher-modal">
   <div class="hw-cipher-header">
    <div>
     <h3 style="margin:0;font-size:16px;font-weight:900">📜 SỔ MẬT THƯ CỔ ĐẠI · ${esc(m.title)}</h3>
     <p style="margin:4px 0 0;font-size:12px;color:#cbd5e1">${esc(m.cipherHint || 'Ghép 5 ký tự cổ thu thập được từ các trạm để mở phong ấn tối thượng!')}</p>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeCipherNotebook" title="Đóng">✕</button>
   </div>
   <div class="hw-cipher-body">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
     <span style="font-size:12px;font-weight:900;color:#fde047">
      🗝️ TIẾN ĐỘ THU THẬP: ${earnedLetters.length}/${cipherLetters.length} MẢNH RUNE
     </span>
     <span class="pill ${isReady?'green':'gold'}" style="font-size:11px">
      ${isReady ? '✨ ĐỦ 5 MẢNH – SẴN SÀNG GIẢI MÃ' : 'Đang thu thập mảnh từ các trạm'}
     </span>
    </div>
    <div class="hw-cipher-slots">${slotsHtml}</div>
    <div style="font-size:12px;font-weight:800;color:#94a3b8;margin:12px 0 6px">
     MẢNH RUNE KHẢ DỤNG (CHẠM VÀO ĐỂ ĐẶT VÀO Ô TRỐNG):
    </div>
    <div class="hw-cipher-tray">${chipsHtml}</div>
    ${cipherState.error ? `<div class="hw-cipher-error">⚠️ ${esc(cipherState.error)}</div>` : ''}
    ${cipherState.successMsg ? `<div class="hw-cipher-success">🎉 ${esc(cipherState.successMsg)}</div>` : ''}
   </div>
   <div class="hw-cipher-footer">
    <div style="display:flex;gap:8px">
     <button type="button" class="button gray sm" data-action="resetCipherSlots">↺ Xếp lại từ đầu</button>
     <button type="button" class="button gray sm" data-action="closeCipherNotebook">Đóng sổ</button>
    </div>
    <button type="button" class="button gold" data-action="submitCipherNotebook" ${placedLetters.length < 5 ? 'disabled' : ''}>
     🔓 GIẢI MÃ MẬT THƯ (${placedLetters.length}/5)
    </button>
   </div>
  </div>
 </div>`;
}

function renderTeamRolesModal(m){
 const defaultRoles = [
  '🧭 TV1 (Dẫn đường & Thám hiểm): Quan sát bản đồ Oxyz, xác định vị trí trạm và mỏ tinh thể.',
  '📐 TV2 (Nhà Toán học): Nhận diện dạng toán và áp dụng công thức chuẩn GDPT 2018.',
  '⚡ TV3 (Chuyên gia Vectơ & Tọa độ): Thực hiện phép tính từng trục Ox, Oy, Oz cẩn thận dấu âm.',
  '📜 TV4 (Nhà Giải Mật mã): Ghi chép ký tự rune cổ và sắp xếp mật thư.',
  '👑 Đội trưởng (Chỉ huy & Điều khiển): Điều khiển nhân vật di chuyển (WASD / D-Pad), nhấn phím E tương tác và chốt đáp án.'
 ];
 const roles = (m.teamRoles && m.teamRoles.length) ? m.teamRoles : defaultRoles;
 return `<div class="hw-roles-backdrop">
  <div class="hw-roles-modal">
   <div class="hw-roles-head">
    <div>
     <h3 style="margin:0;font-size:16px;font-weight:900">🤝 PHÂN VAI HỢP TÁC NHÓM 5 THÀNH VIÊN</h3>
     <small style="color:#bae6fd">${esc(m.title)} · Phân chia nhiệm vụ theo chuẩn GDPT 2018</small>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeTeamRoles" title="Đóng">✕</button>
   </div>
   <div class="hw-roles-list">
    ${roles.map((r, idx) => `<div class="hw-role-card" style="border-left-color:${idx === m.round ? '#facc15' : '#38bdf8'}">
     <b>${esc(r.split(':')[0] || ('Vai trò ' + (idx + 1)))}</b>
     <div style="color:#cbd5e1;margin-top:2px">${esc(r.split(':').slice(1).join(':') || r)}</div>
    </div>`).join('')}
    <div style="background:rgba(250,204,21,.1);border:1.5px solid #facc15;border-radius:12px;padding:10px 14px;color:#fef08a;font-size:12px">
     💡 <b>Gợi ý phối hợp:</b> Sau mỗi trạm, các thành viên hãy luân phiên đảm nhận vai trò điều khiển nhân vật và tính toán để cả nhóm cùng tiến bộ!
    </div>
   </div>
   <div style="background:#0b1120;padding:12px 20px;text-align:right;border-top:1px solid #1e293b">
    <button type="button" class="button primary sm" data-action="closeTeamRoles">Đã Rõ Phân Vai – Tiếp Tục Nhiệm Vụ →</button>
   </div>
  </div>
 </div>`;
}

function renderQuestDialogueModal(){
 if (!questDialogue) return '';
 return `<div class="hw-roles-backdrop">
  <div class="hw-roles-modal" style="max-width:500px">
   <div class="hw-roles-head" style="background:linear-gradient(90deg,#581c87,#3b0764)">
    <div style="display:flex;align-items:center;gap:10px">
     <span style="font-size:28px">${questDialogue.avatar || '🧙‍♂️'}</span>
     <div>
      <h3 style="margin:0;font-size:15px;font-weight:900">${esc(questDialogue.name || 'NPC Giao Nhiệm Vụ')}</h3>
      <small style="color:#e9d5ff">${esc(questDialogue.role || 'Cố vấn thám hiểm')}</small>
     </div>
    </div>
    <button type="button" class="hw-btn-flee" data-action="closeQuestDialogue">✕</button>
   </div>
   <div style="padding:18px;font-size:13.5px;line-height:1.55;color:#e2e8f0">
    ${questDialogue.text}
   </div>
   <div style="background:#0b1120;padding:12px 18px;text-align:right;border-top:1px solid #1e293b">
    <button type="button" class="button gold sm" data-action="closeQuestDialogue">Đã rõ nhiệm vụ – Lên đường ngay! →</button>
   </div>
  </div>
 </div>`;
}

function renderGridOverlay(m){
 if (m.id !== 4) return '';
 let lines = '';
 for (let x = 0; x <= 8; x++) {
  const px = 14 + (x / 8) * 72;
  lines += `<div class="hw-grid-line-x" style="position:absolute;left:${px}%;top:18%;bottom:18%;width:1px;background:rgba(45,212,191,0.22);pointer-events:none"></div>`;
  lines += `<div class="hw-grid-label-x" style="position:absolute;left:${px}%;bottom:14%;transform:translateX(-50%);font-size:10px;font-weight:900;color:#2dd4bf;pointer-events:none">${x}</div>`;
 }
 for (let y = 0; y <= 6; y++) {
  const py = 80 - (y / 6) * 62;
  lines += `<div class="hw-grid-line-y" style="position:absolute;left:14%;right:14%;top:${py}%;height:1px;background:rgba(45,212,191,0.22);pointer-events:none"></div>`;
  lines += `<div class="hw-grid-label-y" style="position:absolute;left:10%;top:${py}%;transform:translateY(-50%);font-size:10px;font-weight:900;color:#2dd4bf;pointer-events:none">${y}</div>`;
 }
 return `<div class="hw-grid-overlay">${lines}
  <div style="position:absolute;left:10%;bottom:14%;font-size:11px;font-weight:900;color:#facc15;pointer-events:none">O(0;0)</div>
  <div style="position:absolute;right:10%;bottom:14%;font-size:11px;font-weight:900;color:#2dd4bf;pointer-events:none">Trục Ox ➔</div>
  <div style="position:absolute;left:10%;top:14%;font-size:11px;font-weight:900;color:#2dd4bf;pointer-events:none">Trục Oy ⬆</div>
 </div>`;
}


/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 3: LÒ RÈN TINH THỂ & THÁP PHA LÊ (CHẶNG 3 - CRYSTAL FORGE)
   ═══════════════════════════════════════════════════════════════════════════ */

function renderZombieShooterSVG(){
 return `<svg viewBox="0 0 100 120" width="68" height="82" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
  <ellipse cx="45" cy="112" rx="28" ry="7" fill="rgba(0,0,0,0.3)"/>
  <rect x="32" y="80" width="10" height="26" rx="4" fill="#854d0e"/>
  <rect x="48" y="80" width="10" height="26" rx="4" fill="#713f12"/>
  <path d="M28 102 h16 v10 h-18 z" fill="#3f2305"/>
  <path d="M46 102 h16 v10 h-18 z" fill="#2d1904"/>
  <rect x="28" y="48" width="34" height="34" rx="8" fill="#2563eb"/>
  <rect x="30" y="76" width="30" height="6" fill="#1e293b"/>
  <rect x="42" y="75" width="6" height="8" fill="#facc15" rx="1"/>
  <path d="M48 54 l24 8 l-4 10 l-22 -6 z" fill="#3b82f6"/>
  <circle cx="70" cy="62" r="5" fill="#fbcfe8"/>
  <rect x="62" y="56" width="28" height="12" rx="3" fill="#ea580c"/>
  <rect x="66" y="52" width="14" height="6" rx="2" fill="#38bdf8"/>
  <rect x="88" y="59" width="8" height="6" rx="1" fill="#facc15"/>
  <circle cx="94" cy="62" r="3" fill="#ef4444"/>
  <circle cx="44" cy="34" r="16" fill="#fed7aa"/>
  <ellipse cx="48" cy="34" rx="3.5" ry="4.5" fill="#1e293b"/>
  <circle cx="49.5" cy="32.5" r="1.5" fill="#fff"/>
  <path d="M44 42 q4 3 8 0" stroke="#9a3412" stroke-width="2" fill="none"/>
  <path d="M24 30 q20 -24 40 0 c2 4 -4 8 -8 7 q-12 -6 -24 0 c-4 1 -10 -3 -8 -7 z" fill="#15803d"/>
  <rect x="25" y="28" width="38" height="4" rx="2" fill="#166534"/>
  <polygon points="44,20 45.5,24 50,24 46.5,26.5 48,31 44,28 40,31 41.5,26.5 38,24 42.5,24" fill="#facc15"/>
 </svg>`;
}

function renderZombieWalkingSVG(){
 return `<svg viewBox="0 0 100 120" width="64" height="78" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3))">
  <ellipse cx="48" cy="112" rx="26" ry="6" fill="rgba(0,0,0,0.25)"/>
  <rect x="34" y="78" width="11" height="28" rx="4" fill="#334155"/>
  <rect x="49" y="80" width="11" height="26" rx="4" fill="#1e293b"/>
  <circle cx="39" cy="108" r="5" fill="#475569"/>
  <circle cx="54" cy="108" r="5" fill="#334155"/>
  <rect x="28" y="46" width="34" height="34" rx="6" fill="#e2e8f0"/>
  <path d="M28 66 l8 8 l8 -6 l8 8 l10 -6 v14 h-34 z" fill="#64748b"/>
  <path d="M40 52 l-22 10 l3 8 l20 -8 z" fill="#86efac"/>
  <circle cx="18" cy="62" r="5" fill="#4ade80"/>
  <circle cx="48" cy="30" r="18" fill="#86efac"/>
  <path d="M34 18 l4 -8 l6 6 l6 -8 l6 8 l4 -6 l4 8 z" fill="#334155"/>
  <circle cx="42" cy="28" r="6" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <circle cx="43" cy="28" r="2.5" fill="#dc2626"/>
  <circle cx="54" cy="27" r="5" fill="#fff" stroke="#1e293b" stroke-width="1.5"/>
  <circle cx="53" cy="27" r="2" fill="#1e293b"/>
  <path d="M40 38 q8 6 16 0 z" fill="#450a0a"/>
  <rect x="44" y="38" width="3" height="4" fill="#fff"/>
 </svg>`;
}


/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 3: CHẶN ZOMBIE 4 LÀN (CHẶNG 3 - GIAOVIENDOIMOI STYLE)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 3: CHẶN ZOMBIE 4 LÀN (EXACT GIAOVIENDOIMOI REA ASSETS)
   ═══════════════════════════════════════════════════════════════════════════ */
async function shootZombieLane(laneIdx){
 if(zdState.shooting || busy) return;
 zdState.lane = laneIdx;
 zdState.shooting = true;
 sound('laser');
 render();
 
 try{
  const res = await submitStageAnswer({choice: laneIdx});
  zdState.hitLane = laneIdx;
  zdState.hitType = res?.correct ? 'hit' : 'miss';
  playZdSound(zdState.hitType);
 }catch(err){
  zdState.hitLane = laneIdx;
  zdState.hitType = 'miss';
  playZdSound('miss');
 }finally{
  setTimeout(()=>{
   zdState.shooting = false;
   zdState.hitLane = null;
   zdState.hitType = null;
   render();
  }, 480);
 }
}

function renderZombieDefenseGame(m){
 const r = m.round;
 const q = m.challenge;
 const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
 const laneLabels = ['A', 'B', 'C', 'D'];
 const opts = q.options || ['?', '?', '?', '?'];

 const lanesHtml = [0, 1, 2, 3].map(i => {
  const isAimed = (zdState.lane === i);
  const isHit = (zdState.hitLane === i);
  const hitClass = isHit ? (zdState.hitType === 'hit' ? 'dying' : 'dying-wrong') : '';

  return `<div class="zd-lane ${i%2 ? 'odd' : 'even'} ${isAimed ? 'aimed' : ''}" style="top:${i*25}%;" data-action="shootZombieLane" data-lane="${i}">
   <span class="zd-lane-key">${laneLabels[i]}</span>
   
   <div class="zd-unit ${hitClass}" data-action="shootZombieLane" data-lane="${i}" title="Bắn Zombie ${laneLabels[i]}">
    <div class="zd-zombie"></div>
    <div class="zd-flag">
     <div class="zd-flag-rope"></div>
     <div class="zd-flag-cloth">
      <div class="zd-flag-inner">
       <div class="zd-flag-key">${laneLabels[i]}</div>
       <div class="zd-flag-content">
        <span class="zd-flag-text">${formatMath(opts[i])}</span>
       </div>
      </div>
     </div>
    </div>
    ${isHit ? `
     <div class="zd-pop ${zdState.hitType==='hit'?'hit':'miss'}">
      ${zdState.hitType==='hit' ? '💥 CHÍNH XÁC! +XP' : '❌ CHƯA ĐÚNG!'}
     </div>
    ` : ''}
   </div>
  </div>`;
 }).join('');

 return `<div class="zd-player-wrap">
  <div class="zd-hud">
   <div class="zd-hud-title">
    <span class="tag" style="background:#7c3aed;border-color:#c084fc">🧟 CHẶN ZOMBIE · CHẶNG 3</span>
    <b>THÁP PHA LÊ KHOẢNG CÁCH</b>
   </div>
   <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
    <span class="zd-hud-score">⭐ ${world.me?.score||0} XP</span>
    <span class="pill purple" style="font-size:12px">Lượt ${r+1}/${m.totalRounds}</span>
    <button type="button" class="hw-btn-hud ${isReady?'alert':''}" data-action="openCipherNotebook">
     📜 SỔ MẬT THƯ (${isReady?'SẴN SÀNG':'XEM MẢNH'})
    </button>
    <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
     🤝 PHÂN VAI
    </button>
    <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý (2 Cấp)</button>
   </div>
  </div>

  <div class="zd-field">
   <div class="zd-header-band">
    <div class="zd-card">
     <span class="zd-card-num">CÂU ${r+1} / ${m.totalRounds} · ${esc(q.label)}</span>
     <div class="zd-card-text">🧩 ${formatMath(q.prompt)}</div>
    </div>
   </div>

   <div class="zd-lanes-board">
    <div class="zd-fence"></div>

    <div class="zd-gunner" style="top:calc(${zdState.lane * 25}% + 12px);">
     <img src="/images/zombie-defense/gunner.png" alt="Gunner" class="zd-gunner-img ${zdState.shooting ? 'recoil' : ''}">
     ${zdState.shooting ? '<div class="zd-g-muzzle"></div>' : ''}
    </div>

    ${zdState.shooting ? `
     <div class="zd-bullet" style="top:calc(${zdState.lane * 25}% + 44px);"></div>
    ` : ''}

    ${lanesHtml}
   </div>
  </div>

  <div class="zd-botbar">
   <div>
    ⌨️ <b>Điều khiển:</b> Phím <b>W / S</b> hoặc <b>↑ / ↓</b>: Chọn làn · <b>Space / Enter</b>: Bắn Blaster · Bấm trực tiếp vào Zombie để bắn nhanh!
   </div>
   <div>
    ${isReady ? `
     <button type="button" class="button gold pulse-urgent" data-action="openCipherNotebook">
      🔓 ĐỦ 5 MẢNH – GIẢI MÃ PHALE MỞ THÁP!
     </button>
    ` : `
     <span style="color:#e9d5ff;font-weight:700">Mảnh rune đã thu thập: ${r}/5 (P - H - A - L - E)</span>
    `}
   </div>
  </div>

  ${cipherState.open ? renderCipherNotebookModal(m) : ''}
  ${showRolesModal ? renderTeamRolesModal(m) : ''}
 </div>`;
}

function renderCrystalForgeGame(m){
 const r = m.round;
 const roundsMeta = m.allRounds || [];
 const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
 const gemIcons = ['🔷', '🔮', '💎', '💖', '👑'];
 const gemNames = ['Pha Lê Lam (P)', 'Pha Lê Lục (H)', 'Hoàng Kim (A)', 'Hồng Ngọc (L)', 'Lõi Tối Thượng (E)'];
 const gemMath = ['Δx = 3', '|u| = 3', 'MN = 2√2', 'AB = 7', 'CD = 13'];

 const anvilsHtml = [0, 1, 2, 3, 4].map(idx => {
  const isForged = idx < r;
  const isActive = idx === r;
  const isLocked = idx > r;
  const cls = isForged ? 'forged' : (isActive ? 'active' : 'locked');
  return `<div class="hw-anvil-card ${cls}" data-action="${isActive?'openHuntBattle':'clickAnvilInfo'}" data-idx="${idx}" title="${gemNames[idx]}">
   <span class="hw-anvil-icon">${gemIcons[idx]}</span>
   <div style="font-size:11px;font-weight:900;color:${isForged?'#86efac':(isActive?'#fde047':'#94a3b8')}">
    ${isForged ? ('✅ ' + gemMath[idx]) : (isActive ? '🔥 ĐANG RÈN' : '🔒 Khóa')}
   </div>
   <div style="font-size:10px;color:#e2e8f0;margin-top:2px">${gemNames[idx]}</div>
   ${isActive ? '<button type="button" class="button gold sm" style="margin-top:6px;padding:3px 8px;font-size:10px" data-action="openHuntBattle">⚔️ ĐÚC NGAY</button>' : ''}
  </div>`;
 }).join('');

 return `<div class="hw-forge-wrapper">
  <div class="hw-forge-head">
   <div>
    <span class="tag" style="background:#581c87;border-color:#c084fc">🔮 LÒ RÈN TINH THỂ OXYZ · CHẶNG 3</span>
    <h3 style="margin:4px 0 0;font-size:17px;font-weight:900">VẠC NĂNG LƯỢNG PITAGO & THÁP PHA LÊ KHÔNG GIAN</h3>
    <p style="margin:2px 0 0;font-size:12px;color:#e9d5ff">Tính toán độ dài và khoảng cách trong Oxyz để đúc 5 viên tinh thể, thu thập 5 mảnh rune P-H-A-L-E giải mã mở tháp!</p>
   </div>
   <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <button type="button" class="hw-btn-hud ${isReady?'alert':''}" data-action="openCipherNotebook">
     📜 SỔ MẬT THƯ (${isReady?'SẴN SÀNG':'XEM MẢNH'})
    </button>
    <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
     🤝 PHÂN VAI NHÓM
    </button>
   </div>
  </div>

  <div class="hw-forge-layout">
   <div class="hw-forge-chamber">
    <div style="font-size:12px;font-weight:900;color:#c084fc;letter-spacing:1px;text-transform:uppercase">
     ⚡ VẠC NĂNG LƯỢNG PITAGO: AB = √(Δx² + Δy² + Δz²)
    </div>
    <div class="hw-cauldron-art">
     <div class="hw-cauldron-glow"></div>
     <div class="hw-cauldron-rays"></div>
     <div class="hw-cauldron-pot">⚗️</div>
    </div>
    <span class="pill gold" style="font-size:11.5px">
     TIẾN ĐỘ LÒ RÈN: ĐÃ ĐÚC ${Math.min(5, r)}/5 TINH THỂ NĂNG LƯỢNG
    </span>
    <div class="hw-anvils-row">
     ${anvilsHtml}
    </div>
   </div>

   <div class="hw-spire-panel">
    <div style="font-size:12px;font-weight:900;color:#fde047;margin-bottom:8px">THÁP PHA LÊ CỔ ĐẠI</div>
    <div style="position:relative;width:100px;height:120px;display:grid;place-items:center;margin:8px 0">
     <div class="hw-crystal-barrier ${isReady?'unlocked':''}"></div>
     <div style="font-size:56px;filter:drop-shadow(0 0 20px ${isReady?'#4ade80':'#c084fc'});animation:float 3s infinite">💠</div>
    </div>
    <div style="font-size:12px;color:#e2e8f0;margin:6px 0;line-height:1.4">
     ${isReady ? '✨ Toàn bộ 5 tinh thể đã nạp đầy năng lượng! Hãy mở Sổ Mật Thư và ghép "PHALE" để mở cổng!' : ('Cần đúc thêm ' + (5 - r) + ' tinh thể để kích hoạt Bàn Giải Mã Trung Tâm.')}
    </div>
    ${isReady ? `
     <button type="button" class="button gold block pulse-urgent" data-action="openCipherNotebook" style="margin-top:10px">
      🔓 GIẢI MÃ PHALE MỞ THÁP!
     </button>
    ` : `
     <button type="button" class="button primary block" data-action="clickNPC" style="margin-top:10px;font-size:12px">
      🧙‍♂️ Lời khuyên Vệ Binh Hang
     </button>
    `}
   </div>
  </div>

  ${huntState.battleOpen ? renderHuntBattleModal(m) : ''}
  ${cipherState.open ? renderCipherNotebookModal(m) : ''}
  ${showRolesModal ? renderTeamRolesModal(m) : ''}
  ${questDialogue ? renderQuestDialogueModal() : ''}
 </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 4: MÊ CUNG TỌA ĐỘ Ô VUÔNG (CHẶNG 4 - GRID MAZE)
   ═══════════════════════════════════════════════════════════════════════════ */
function renderGridMazeGame(m){
 const r = m.round;
 const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
 const curTarget = mazeState.waypoints[Math.min(r, 4)] || {x: 4, y: 3, label: 'M(4; 3)'};
 const isNearPad = (mazeState.x === curTarget.x && mazeState.y === curTarget.y);

 // Build 9x7 cells (x = 0..8, y = 0..6)
 let cellsHtml = '';
 for (let y = 6; y >= 0; y--) {
  for (let x = 0; x <= 8; x++) {
   const isWall = isMazeWall(x, y);
   const isPlayer = (mazeState.x === x && mazeState.y === y);
   const wpIdx = mazeState.waypoints.findIndex(w => w.x === x && w.y === y);
   const isPad = wpIdx !== -1;
   const isClearedPad = isPad && wpIdx < r;
   const isActivePad = isPad && wpIdx === r;
   const isChest = (x === 8 && y === 5);

   let cellContent = '';
   if (isPlayer) {
    cellContent = `<div class="hw-maze-player">${world.me.avatar}</div>`;
   } else if (isChest) {
    cellContent = isReady ? '👑' : '🔒';
   } else if (isActivePad) {
    cellContent = '🎯';
   } else if (isClearedPad) {
    cellContent = '🏛️';
   }

   const cellCls = isWall ? 'wall' : (isChest ? 'chest-cell' : (isActivePad ? 'pad' : (isClearedPad ? 'pad cleared' : '')));
   cellsHtml += `<div class="hw-grid-cell ${cellCls}" data-action="clickMazeCell" data-x="${x}" data-y="${y}" title="Ô (${x}; ${y})">
    ${cellContent}
   </div>`;
  }
 }

 return `<div class="hw-maze-wrapper">
  <div class="hw-forge-head">
   <div>
    <span class="tag" style="background:#0f766e;border-color:#2dd4bf">🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG · CHẶNG 4</span>
    <h3 style="margin:4px 0 0;font-size:17px;font-weight:900">BÀN CỜ MÊ CUNG OXY & CỔNG DỊCH CHUYỂN TRUNG ĐIỂM</h3>
    <p style="margin:2px 0 0;font-size:12px;color:#99f6e4">Dùng phím WASD / Mũi tên hoặc chạm ô để dẫn đường cho nhân vật đến đúng tọa độ trung điểm/trọng tâm đã tính toán!</p>
   </div>
   <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <button type="button" class="hw-btn-hud ${isReady?'alert':''}" data-action="openCipherNotebook">
     📜 SỔ MẬT THƯ (${isReady?'SẴN SÀNG':'XEM MẢNH'})
    </button>
    <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
     🤝 PHÂN VAI NHÓM
    </button>
   </div>
  </div>

  <div class="hw-maze-board-container">
   <div class="hw-maze-grid-board">
    ${cellsHtml}
   </div>
   <div class="hw-maze-axis-x">
    <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
   </div>
   <div class="hw-maze-axis-y">
    <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
   </div>
  </div>

  <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-top:10px">
   <div style="display:flex;align-items:center;gap:10px">
    <div style="background:rgba(15,118,110,.4);border:1.5px solid #2dd4bf;border-radius:12px;padding:8px 14px">
     <div style="font-size:10.5px;color:#99f6e4">TỌA ĐỘ HIỆN TẠI CỦA ĐỘI:</div>
     <b style="font-size:14px;color:#fde047">(${mazeState.x}; ${mazeState.y})</b>
    </div>
    <div style="background:rgba(250,204,21,.15);border:1.5px solid #facc15;border-radius:12px;padding:8px 14px">
     <div style="font-size:10.5px;color:#fde047">MỤC TIÊU TRẠM ${Math.min(5, r+1)}:</div>
     <b style="font-size:14px;color:#fff">${curTarget.label}</b>
    </div>
   </div>

   <div style="display:flex;gap:8px;align-items:center">
    ${isNearPad ? `
     <button type="button" class="button gold pulse-urgent" data-action="openHuntBattle">
      ⚔️ ĐÃ ĐẾN Ô ${curTarget.label} – BẤM MỞ BÀI TOÁN! (Space/E)
     </button>
    ` : `
     <button type="button" class="button gray sm" data-action="autoStepToMazeTarget">
      🧭 Chỉ đường đến ${curTarget.label}
     </button>
    `}
    ${isReady ? `
     <button type="button" class="button teal pulse-urgent" data-action="openCipherNotebook">
      👑 MỞ PHÒNG KHO BÁU (GHÉP MÃ TRUNG)
     </button>
    ` : ''}
   </div>
  </div>

  ${huntState.battleOpen ? renderHuntBattleModal(m) : ''}
  ${cipherState.open ? renderCipherNotebookModal(m) : ''}
  ${showRolesModal ? renderTeamRolesModal(m) : ''}
 </div>`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: ĐẤU TRƯỜNG DIỆT BOSS TỐI THƯỢNG (CHẶNG 5 - BOSS RAID)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: DÒ MÌN BÃI ĐÁ RỪNG THẦN (CHẶNG 5 - GIAOVIENDOIMOI REA)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: DÒ MÌN BÃI ĐÁ RỪNG THẦN - DI CHUYỂN BƯỚC ĐÁ THỰC TẾ
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: DÒ MÌN GIAOVIENDOIMOI - BẢO MẬT & HIỆU ỨNG BOOM QUAY VỀ GỐC
   ═══════════════════════════════════════════════════════════════════════════ */
const MS_CHOICE_COORDS_4 = [
  { x: 18, y: 52 }, // A (Bên trái)
  { x: 39, y: 25 }, // B (Phía trên bên trái)
  { x: 61, y: 25 }, // C (Phía trên bên phải)
  { x: 82, y: 52 }  // D (Bên phải)
];

const MS_CHOICE_COORDS_3 = [
  { x: 24, y: 52 }, // A (Bên trái)
  { x: 50, y: 24 }, // B (Chính giữa trên)
  { x: 76, y: 52 }  // C (Bên phải)
];


/* ═══════════════════════════════════════════════════════════════════════════
   RENDER ENGINE 5: DÒ MÌN GIAOVIENDOIMOI - CHÚ LÍNH CHẠY BỘ ĐA HƯỚNG & NỔ BOOM
   ═══════════════════════════════════════════════════════════════════════════ */





async function stepMinesweeperPad(choiceIdx){
  if(msState.walking || busy) return;
  if(msState.explodedMines && msState.explodedMines.includes(choiceIdx)) return;

  const totalOpts = (world?.current?.challenge?.options?.length || 4);
  const coords = (totalOpts === 3) ? MS_CHOICE_COORDS_3 : MS_CHOICE_COORDS_4;
  const target = coords[choiceIdx] || { x: 50, y: 50 };

  // Tính hướng di chuyển theo góc vectơ
  const dx = target.x - msState.posX;
  const dy = target.y - msState.posY;
  let dir = 'up';
  if(Math.abs(dx) > Math.abs(dy)){
    dir = dx < 0 ? 'left' : 'right';
  }else{
    dir = dy < 0 ? 'up' : 'down';
  }

  // 1. Chú lính bắt đầu chạy bộ về phía đáp án
  msState.lastChoice = choiceIdx;
  startSoldierRunning(dir, 550);
  msState.posX = target.x;
  msState.posY = target.y + 6;
  sound('step');
  render();

  try{
    // Chờ chú lính chạy tới gần đáp án (~500ms)
    await new Promise(r => setTimeout(r, 480));
    const res = await submitStageAnswer({choice: choiceIdx});

    if(res && res.correct){
      // ĐÚNG: Đậu lại an toàn trên bãi cỏ, phát hiệu ứng chúc mừng
      msState.resultType = 'correct';
      msState.walking = false;
      playMsSound('safe');
      render();

      setTimeout(()=>{
        // Đặt lại nhân vật về vị trí ban đầu cho câu hỏi kế tiếp
        msState.posX = 50;
        msState.posY = 82;
        msState.lastChoice = null;
        msState.resultType = null;
        msState.direction = 'up';
        msState.explodedMines = [];
        updateAfterAction();
      }, 820);
    }else{
      // SAI: ĐẠP PHẢI MÌN!
      msState.resultType = 'wrong';
      msState.blastX = target.x;
      msState.blastY = target.y;
      msState.shaking = true;
      msState.wobble = true;
      if(!msState.explodedMines.includes(choiceIdx)){
        msState.explodedMines.push(choiceIdx);
      }
      if(world?.me){
        world.me.health = Math.max(0, (world.me.health ?? 3) - 1);
      }
      playMsSound('mine');
      render();

      // BÙM NỔ: Chú lính bị hất văng và chạy lùi lại vị trí ban đầu (50%, 82%)
      setTimeout(()=>{
        startSoldierRunning('down', 420);
        msState.posX = 50;
        msState.posY = 82;
        render();
      }, 350);

      setTimeout(()=>{
        msState.walking = false;
        msState.shaking = false;
        msState.wobble = false;
        msState.lastChoice = null;
        msState.resultType = null;
        msState.blastX = null;
        msState.blastY = null;
        msState.direction = 'up';
        render();
      }, 820);
    }
  }catch(err){
    msState.resultType = 'wrong';
    msState.blastX = target.x;
    msState.blastY = target.y;
    msState.shaking = true;
    msState.wobble = true;
    if(!msState.explodedMines.includes(choiceIdx)){
      msState.explodedMines.push(choiceIdx);
    }
    playMsSound('mine');
    render();
    setTimeout(()=>{
      startSoldierRunning('down', 420);
      msState.posX = 50;
      msState.posY = 82;
      render();
    }, 350);
    setTimeout(()=>{
      msState.walking = false;
      msState.shaking = false;
      msState.wobble = false;
      msState.lastChoice = null;
      msState.resultType = null;
      msState.blastX = null;
      msState.blastY = null;
      msState.direction = 'up';
      render();
    }, 820);
  }
}

function renderMinesweeperGame(m){
  if(m.isBoss){
    return renderBossRaidGame(m);
  }

  const r = m.round;
  const q = m.challenge;
  const isReady = Boolean(m.cipherReady || world.me?.cipherReady);
  const laneLabels = ['A', 'B', 'C', 'D'];
  const opts = q.options || ['?', '?', '?', '?'];
  const health = Math.max(0, Math.min(3, world.me?.health ?? 3));
  const progressPct = Math.round(((r) / m.totalRounds) * 100);

  const coords = (opts.length === 3) ? MS_CHOICE_COORDS_3 : MS_CHOICE_COORDS_4;

  // Render các phương án xuất hiện trực tiếp trên bãi cỏ theo giao diện giaoviendoimoi.com
  const choicesHtml = opts.map((optText, i) => {
    const pos = coords[i] || { x: 25 + i * 20, y: 40 };
    const isAimed = (msState.aimedPad === i);
    const isExploded = msState.explodedMines && msState.explodedMines.includes(i);

    return `<div class="ms-field-choice ${isAimed ? 'aimed' : ''} ${isExploded ? 'exploded' : ''}" 
                 style="left:${pos.x}%; top:${pos.y}%;"
                 data-action="stepMinesweeperPad" 
                 data-pad="${i}" 
                 title="${isExploded ? 'Mìn đã nổ!' : 'Bấm để chú lính chạy đến đáp án ' + laneLabels[i]}">
      <div class="ms-choice-badge">${isExploded ? '💥' : laneLabels[i]}</div>
      <div class="ms-choice-text">${formatMath(optText)}</div>
    </div>`;
  }).join('');

  const spriteSrc = getSoldierSprite();

  return `<div class="ms-container-wrap ${msState.shaking ? 'shake' : ''}">
    <!-- CỘT TRÁI: BẢNG CÂU HỎI TRẮNG THANH LỊCH CHUẨN GIAOVIENDOIMOI -->
    <div class="ms-left-sidebar">
      <div class="ms-side-qnum">CÂU ${r+1} / ${m.totalRounds} · ${esc(q.label || 'VECTƠ OXYZ')}</div>
      <div class="ms-side-qtext">
        ${formatMath(q.prompt)}
      </div>

      <div class="ms-side-footer">
        <button type="button" class="button gray sm" data-action="hint">💡 Gợi ý (2 Cấp)</button>
        <button type="button" class="hw-btn-hud" data-action="openTeamRoles">🤝 PHÂN VAI NHÓM</button>
        ${isReady ? `
          <button type="button" class="button gold pulse-urgent" data-action="openCipherNotebook">
            🔓 GIẢI MÃ BAOVE MỞ THÀNH!
          </button>
        ` : `
          <button type="button" class="hw-btn-hud" data-action="openCipherNotebook">
            📜 SỔ MẬT THƯ (${r}/5 MẢNH)
          </button>
        `}
      </div>
    </div>

    <!-- CỘT PHẢI: CHIẾN TRƯỜNG BÃI CỎ DÒ MÌN CHÂN THẬT -->
    <div class="ms-right-arena">
      <div class="ms-arena-ground"></div>

      <!-- TOP MINI HUD -->
      <div class="ms-mini-hud">
        <div style="font-size:12px;font-weight:800;color:#fef08a;background:rgba(0,0,0,0.5);padding:5px 12px;border-radius:14px;border:1px solid rgba(255,255,255,0.2)">
          🏰 THÀNH TRÌ LỜI TRÍ TUỆ
        </div>

        <div class="ms-hud-pills-center">
          <span style="color:#fde047;font-weight:900;font-size:14px">⭐ ${world.me?.score||0} XP</span>
          <div class="ms-hud-lives" title="Khiên sinh mệnh">
            <span class="${health<1?'lost':''}">💖</span>
            <span class="${health<2?'lost':''}">💖</span>
            <span class="${health<3?'lost':''}">💖</span>
          </div>
          <span style="font-size:12px;font-weight:800;color:#bbf7d0">CÂU ${r+1}/${m.totalRounds}</span>
          <div style="width:65px;height:7px;background:rgba(255,255,255,0.25);border-radius:4px;overflow:hidden">
            <div style="width:${progressPct}%;height:100%;background:#4ade80"></div>
          </div>
        </div>

        <div style="display:flex;gap:6px">
          <button type="button" class="hw-btn-hud" style="font-size:11.5px;padding:4px 10px" data-action="soundToggle">🔊 Âm thanh</button>
        </div>
      </div>

      <!-- CÁC ĐÁP ÁN TRÊN BÃI CỎ -->
      ${choicesHtml}

      <!-- HIỆU ỨNG VỤ NỔ BOOM NẾU ĐẠP PHẢI MÌN -->
      ${msState.blastX !== null ? `
        <div class="ms-blast-overlay" style="left:${msState.blastX}%; top:${msState.blastY}%;"></div>
        <div class="ms-blast-toast wrong" style="left:${msState.blastX}%; top:${msState.blastY}%;">
          💥 BÙM! ĐẠP PHẢI MÌN! VĂNG VỀ VỊ TRÍ BAN ĐẦU!
        </div>
      ` : ''}

      <!-- HIỆU ỨNG TIẾP ĐẤT AN TOÀN NẾU ĐÚNG -->
      ${(msState.resultType === 'correct' && msState.lastChoice !== null) ? `
        <div class="ms-blast-toast correct" style="left:${coords[msState.lastChoice]?.x||50}%; top:${coords[msState.lastChoice]?.y||50}%;">
          💎 CHÍNH XÁC! +20 XP
        </div>
      ` : ''}

      <!-- CHÚ LÍNH XẠ THỦ TỰ DO CHẠY ĐẾN ĐÁP ÁN -->
      <div class="ms-soldier-actor ${msState.walking ? 'walking' : ''} ${msState.wobble ? 'wobble' : ''}" 
           style="left:${msState.posX}%; top:${msState.posY}%;">
        <img src="${spriteSrc}" alt="Soldier" class="ms-soldier-img">
      </div>

      <!-- THANH ĐIỀU HƯỚNG BÊN DƯỚI -->
      <div class="ms-footer-bar">
        <div>
          🎯 <b>Cách chơi:</b> Bấm chuột lên đáp án (A / B / C / D) để chú lính chạy đến. Nếu đạp phải mìn nổ sẽ bị hất văng quay lại vị trí ban đầu!
        </div>
        <div style="font-weight:700;color:#fef08a">
          Mảnh cổ ngữ: ${r}/5 (B - A - O - V - E)
        </div>
      </div>
    </div>

    ${cipherState.open ? renderCipherNotebookModal(m) : ''}
    ${showRolesModal ? renderTeamRolesModal(m) : ''}
  </div>`;
}


function renderBossRaidGame(m){
 const r = m.round;
 const isBoss = Boolean(m.isBoss || world.me?.bossReady);
 const isShieldOn = Boolean(m.bossReady || world.me?.bossReady);
 const pylonNames = ['Trụ I · Cổ ngữ B', 'Trụ II · Cổ ngữ A', 'Trụ III · Cổ ngữ O', 'Trụ IV · Cổ ngữ V', 'Trụ V · Cổ ngữ E'];
 const pylonMath = ['u = kv (k=-2)', 'w = u + v', 'Ngược hướng', 'D(5; 3; -1)', 'm = 3'];

 const pylonsHtml = [0, 1, 2, 3, 4].map(idx => {
  const isCharged = idx < r;
  const isActive = idx === r;
  const cls = isCharged ? 'charged' : (isActive ? 'active' : '');
  return `<div class="hw-pylon-box ${cls}" data-action="${isActive?'openHuntBattle':'clickPylonInfo'}" data-idx="${idx}" title="${pylonNames[idx]}">
   <div style="font-size:24px">${isCharged?'⚡':'🛡️'}</div>
   <b style="font-size:11px;color:${isCharged?'#fde047':(isActive?'#38bdf8':'#94a3b8')};display:block;margin-top:2px">
    ${isCharged ? ('✅ ' + pylonMath[idx]) : (isActive ? '⚡ CẦN SẠC' : '🔒 Khóa')}
   </b>
   <small style="font-size:10px;color:#cbd5e1">${pylonNames[idx]}</small>
   ${isActive ? '<button type="button" class="button primary sm" style="margin-top:4px;padding:2px 6px;font-size:9.5px" data-action="openHuntBattle">⚔️ SẠC TRỤ</button>' : ''}
  </div>`;
 }).join('');

 return `<div class="hw-raid-wrapper">
  <div class="hw-forge-head">
   <div>
    <span class="tag" style="background:#7f1d1d;border-color:#ef4444">🐲 ĐẤU TRƯỜNG DIỆT BOSS · CHẶNG 5</span>
    <h3 style="margin:4px 0 0;font-size:17px;font-weight:900">ĐẠI CHIẾN BOSS BÓNG ĐEN LÃNG QUÊN & ĐẠI PHÁO LASER OXYZ</h3>
    <p style="margin:2px 0 0;font-size:12px;color:#fca5a5">Giải 5 bài toán vectơ cùng phương để sạc 5 Trụ Phép, kích hoạt Khiên BAOVE và khai hỏa Laser diệt Boss!</p>
   </div>
   <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <button type="button" class="hw-btn-hud ${m.cipherReady?'alert':''}" data-action="openCipherNotebook">
     📜 SỔ MẬT THƯ (${m.cipherReady?'SẴN SÀNG':'XEM MẢNH'})
    </button>
    <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
     🤝 PHÂN VAI NHÓM
    </button>
   </div>
  </div>

  <div class="hw-raid-arena-stage">
   <div class="hw-boss-hud" style="width:100%;max-width:440px">
    <div class="flex-between" style="width:100%">
     <span class="hw-boss-name">🐲 BOSS BÓNG ĐEN LÃNG QUÊN</span>
     <span class="pill red" style="font-size:10px">CẤP ĐỘ: BOSS TỐI THƯỢNG</span>
    </div>
    <div class="hw-boss-hp-bar" style="width:100%">
     <div class="hw-boss-hp-fill" style="width:${huntState.monsterDefeated?0:100}%"></div>
    </div>
    <small style="color:#fca5a5;font-weight:900;margin-top:3px">
     HP: ${huntState.monsterDefeated?0:500}/500 · ${isShieldOn ? '🛡️ Lá chắn BAOVE đã kích hoạt! Bấm nghênh chiến Boss!' : 'Phong ấn bởi 5 Trụ Phép'}
    </small>
   </div>

   <div class="hw-raid-boss-center">
    ${isShieldOn ? '<div class="hw-shield-dome"></div>' : ''}
    <div class="hw-raid-boss-sprite">${huntState.monsterDefeated?'💥':'🐲'}</div>
    ${huntState.monsterDefeated ? `
     <div style="background:rgba(16,185,129,.9);color:#fff;padding:8px 18px;border-radius:12px;font-weight:900;font-size:16px;box-shadow:0 0 25px #10b981;margin-top:10px">
      🎉 THÀNH TRÌ ĐÃ ĐƯỢC BẢO VỆ!
     </div>
    ` : (isShieldOn ? `
     <button type="button" class="hw-btn-attack pulse-urgent" data-action="openBossBattle" style="margin-top:12px">
      ⚔️ NGHÊNH CHIẾN BOSS CUỐI (Space/E)
     </button>
    ` : (m.cipherReady ? `
     <button type="button" class="button gold pulse-urgent" data-action="openCipherNotebook" style="margin-top:12px">
      🛡️ GHÉP BAOVE KÍCH HOẠT LÁ CHẮN THÀNH TRÌ!
     </button>
    ` : `
     <div style="font-size:12px;color:#fca5a5;margin-top:8px">
      ⚡ Hãy sạc đủ 5 Trụ Phép để dựng Màng Chắn Năng Lượng trước khi nghênh chiến Boss!
     </div>
    `))}
   </div>

   <div class="hw-raid-pylons-circle">
    ${pylonsHtml}
   </div>
  </div>

  ${huntState.battleOpen ? renderHuntBattleModal(m) : ''}
  ${cipherState.open ? renderCipherNotebookModal(m) : ''}
  ${showRolesModal ? renderTeamRolesModal(m) : ''}
 </div>`;
}

function renderHuntGame(m){
 const hm=initHuntForStage(m);
 const r=m.round;
 const q=m.challenge;
 const stList=hm.stations||[];
 const roundsMeta=m.allRounds||[];
 const isBoss=Boolean(m.isBoss||world.me?.bossReady);
 
 const keySlots=Array.from({length:m.totalRounds}, (_,i)=>{
  const badge=roundsMeta[i]?.keyBadge||stList[i]?.badge||('Trạm '+(i+1));
  if(i<r)return `<div class="hw-key-slot earned">🔑 Trạm ${i+1}: <b>${esc(badge)}</b> ✅</div>`;
  if(i===r)return `<div class="hw-key-slot current">⚔️ Trạm ${i+1}: Đang mở</div>`;
  return `<div class="hw-key-slot">🔒 Trạm ${i+1}: Khóa</div>`;
 }).join('');

 const trackerBadges=Array.from({length:m.totalRounds}, (_,i)=>{
  const cls=i<r?'done':i===r?'active':'locked';
  const label=i<r?`✅ Trạm ${i+1}: Xong`:(i===r?`🧭 Tìm Trạm ${i+1}`:`🔒 Trạm ${i+1}`);
  return `<span class="hw-tracker-pill ${cls}">${label}</span>`;
 }).join('');

 const pathPts=[hm.spawn,...stList,hm.chest].map(p=>`${Math.round(p.x*12)},${Math.round(p.y*8.2)}`).join(' ');

 const stationsHtml=stList.map((st,i)=>{
  const state=i<r?'passed':i===r?'active':'locked';
  const isPylon = m.id === 5;
  return `<div class="hw-station ${state} ${isPylon?'hw-citadel-pylon':''}" style="left:${st.x}%;top:${st.y}%" data-action="clickStation" data-idx="${i}">
   <div class="hw-shrine-base"></div>
   <div class="hw-shrine-pillars"><span class="hw-pillar left"></span><span class="hw-pillar right"></span></div>
   <div class="hw-ring"></div>
   ${state==='active'?'<div class="hw-beacon-beam"></div>':''}
   <div class="hw-station-core">
    <div class="hw-station-glyph">${i<r?'🏛️':(st.monsterIcon||'👾')}</div>
    ${i<r?'<div class="hw-cleared-badge">✅</div>':''}
   </div>
   <div class="hw-station-info">
    <div class="hw-station-label">${i<r?('✅ ĐÃ VƯỢT ('+esc(st.badge)+')'):esc(st.name)}</div>
    ${state==='active'?'<div class="hw-station-action-hint">⚡ CHẠM ĐỂ CHIẾN ĐẤU (E)</div>':''}
   </div>
  </div>`;
 }).join('');

 const curStation=stList[r]||{x:50,y:50,name:q.label,monsterIcon:q.monster?.icon||'👾',monsterName:q.monster?.name||'Quái Vật Trạm'};
 const dx=curStation.x-huntState.x, dy=curStation.y-huntState.y;
 const dist=Math.hypot(dx,dy);
 const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
 const nearStation=dist<=10.5;

 const miniDots=stList.map((st,i)=>{
  const cls=i<r?'st-done':i===r?'st-active':'st-lock';
  return `<span class="hw-minimap-dot ${cls}" style="left:${st.x}%;top:${st.y}%"></span>`;
 }).join('')+`<span class="hw-minimap-dot chest" style="left:${hm.chest.x}%;top:${hm.chest.y}%"></span>`;

 const collectiblesHtml=(huntState.collectibles||[]).filter(c=>!c.collected).map(c=>`
  <div class="hw-collectible ${c.type}" id="collectible-${c.id}" style="left:${c.x}%;top:${c.y}%" title="${c.label}">
   <div class="hw-collectible-glow"></div>
   <div class="hw-collectible-icon">${c.icon}</div>
   <span class="hw-collectible-tag">${c.label}</span>
  </div>`).join('');

 const popupsHtml=(huntState.popups||[]).map(p=>`
  <div class="hw-float-popup" style="left:${p.x}%;top:${p.y}%;color:${p.color}">${esc(p.text)}</div>`).join('');

 const targetBeaconHtml=(huntState.targetX!==null&&huntState.targetY!==null)?`
  <div class="hw-target-beacon" id="hwTargetBeacon" style="left:${huntState.targetX}%;top:${huntState.targetY}%">
   <div class="hw-target-beacon-sonar"></div>
   <div class="hw-target-beacon-ring"></div>
   <div class="hw-target-beacon-pin">📍</div>
   <div class="hw-target-beacon-label">${Math.round(Math.hypot(huntState.targetX-huntState.x,huntState.targetY-huntState.y)*1.5)}m</div>
  </div>`:'' ;

 // Stage 3: NPC & Tháp Pha Lê Cổ
 let stage3Extra = '';
 if (m.id === 3) {
  stage3Extra = `
   <div class="hw-npc-wrap" style="position:absolute;left:14%;top:52%;transform:translate(-50%,-50%);cursor:pointer;z-index:6" data-action="clickNPC" title="Vệ Binh Hang Pha Lê (Chạm để nhận nhiệm vụ)">
    <div style="width:52px;height:52px;border-radius:50%;background:rgba(168,85,247,.25);border:2px dashed #c084fc;animation:spinSlow 8s linear infinite;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
    <div style="font-size:38px;text-align:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,.5))">🧙‍♂️</div>
    <div style="background:rgba(15,23,42,.9);border:1.5px solid #c084fc;color:#f3e8ff;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:900;white-space:nowrap;margin-top:2px">💬 Vệ Binh Hang (E)</div>
   </div>
   <div class="hw-crystal-altar" style="left:88%;top:50%" data-action="clickCrystalAltar" title="Bàn Giải Mã Tháp Pha Lê (PHALE)">
    <div class="hw-crystal-barrier ${m.cipherReady?'unlocked':''}"></div>
    <div class="hw-crystal-tower-art">
     <div class="hw-crystal-spire">💠</div>
    </div>
    <div style="background:rgba(15,23,42,.92);border:1.5px solid ${m.cipherReady?'#4ade80':'#c084fc'};color:#fff;padding:4px 10px;border-radius:10px;font-size:11px;font-weight:900;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.6)">
     ${m.cipherReady ? '✨ BÀN GIẢI MÃ SẴN SÀNG (E)' : '🔒 THÁP PHA LÊ (PHONG ẤN)'}
    </div>
   </div>`;
 }

 // Stage 4: Target grid beacon
 let stage4Extra = '';
 if (m.id === 4 && q.targetGrid) {
  const gx = q.targetGrid[0], gy = q.targetGrid[1];
  const px = 14 + (gx / 8) * 72;
  const py = 80 - (gy / 6) * 62;
  stage4Extra = `
   <div class="hw-grid-beacon" style="left:${px}%;top:${py}%" data-action="clickTargetBeacon" data-gx="${gx}" data-gy="${gy}" title="Tọa độ mục tiêu (${gx}; ${gy})">
    <div class="hw-grid-beacon-ring"></div>
    <div class="hw-grid-beacon-icon">🎯</div>
    <div class="hw-grid-beacon-tag">Tọa độ mục tiêu: (${gx}; ${gy})</div>
   </div>`;
 }

 // Stage 5: Citadel Core, Shield Dome, Boss Arena
 let stage5Extra = '';
 if (m.id === 5) {
  const hasShield = Boolean(m.bossReady || world.me?.bossReady);
  stage5Extra = `
   <div class="hw-citadel-core" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;text-align:center" data-action="clickCitadelCore" title="Lõi Năng Lượng Thành Trì (BAOVE)">
    ${hasShield ? '<div class="hw-shield-dome"></div>' : ''}
    <div style="font-size:48px;filter:drop-shadow(0 0 20px #38bdf8)">🏰</div>
    <div style="background:rgba(15,23,42,.92);border:1.5px solid #38bdf8;color:#bae6fd;padding:3px 8px;border-radius:8px;font-size:11px;font-weight:900">
     ${hasShield ? '🛡️ LÁ CHẮN BAOVE ĐÃ BẬT' : '⚡ LÕI THÀNH TRÌ (BAOVE)'}
    </div>
   </div>
   ${hasShield ? `
    <div class="hw-boss-arena" data-action="openBossBattle" title="Đại Chiến Boss Bóng Đen (Bấm để nghênh chiến!)">
     <div class="hw-boss-hud">
      <div class="hw-boss-name">🐲 BOSS BÓNG ĐEN LÃNG QUÊN</div>
      <div class="hw-boss-hp-bar"><div class="hw-boss-hp-fill" style="width:${huntState.monsterDefeated?0:100}%"></div></div>
      <small style="color:#fca5a5;font-weight:900;font-size:10.5px">HP: ${huntState.monsterDefeated?0:500}/500 · Bấm để nghênh chiến!</small>
     </div>
     <div class="hw-boss-dragon">🐲</div>
    </div>` : ''}`;
 }

 return `<div class="hw-wrapper">
  <div class="hw-hud-top">
   <div class="hw-hud-keys">
    ${keySlots}
    <div class="hw-key-slot ${r>=m.totalRounds?'earned':''}">🎁 Vật phẩm: <b>${esc(m.item||'Mảnh mật mã')}</b></div>
   </div>
   <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
    <button type="button" class="hw-btn-hud ${m.cipherReady?'alert':''}" data-action="openCipherNotebook">
     📜 SỔ MẬT THƯ (${m.cipherReady?'SẴN SÀNG':'XEM MẢNH'})
    </button>
    <button type="button" class="hw-btn-hud" data-action="openTeamRoles">
     🤝 PHÂN VAI NHÓM
    </button>
   </div>
   <div class="hw-quick-nav">${trackerBadges}</div>
  </div>
  <div class="hw-viewport" id="hwViewport">
   <div class="hw-compass">
    <span class="hw-compass-arrow" id="hwCompassArrow" style="transform:rotate(${angleDeg}deg)">➤</span>
    <div>
     <div style="font-size:10px;color:#7dd3fc">${isBoss ? 'MỤC TIÊU: BOSS BÓNG ĐEN' : 'MỤC TIÊU HIỆN TẠI:'}</div>
     <strong id="hwCompassText">${isBoss ? '🐲 Boss Bóng Đen Lãng Quên' : (esc(curStation.name) + ' (' + Math.round(dist*1.5) + 'm)')}</strong>
    </div>
   </div>
   <div class="hw-minimap">
    <span class="hw-minimap-title">📡 RADAR OXYZ</span>
    ${miniDots}
    <span class="hw-minimap-player" id="hwMiniPlayer" style="left:${huntState.x}%;top:${huntState.y}%"></span>
   </div>
   <div class="hw-world theme-${esc(hm.theme||'forest')}" id="hwWorld">
    ${getTerrainSVG(hm.theme||'forest',pathPts)}
    ${getMapDecorations(hm.theme)}
    ${renderGridOverlay(m)}
    ${stage3Extra}
    ${stage4Extra}
    ${stage5Extra}
    ${collectiblesHtml}
    ${popupsHtml}
    ${targetBeaconHtml}
    ${stationsHtml}
    <div class="hw-chest ${r<m.totalRounds?'locked':'ready'}" style="left:${hm.chest.x}%;top:${hm.chest.y}%" data-action="clickChest">
     <div class="hw-chest-pedestal"></div>
     <div class="hw-chest-box">${r<m.totalRounds?'🧰':'🎁'}</div>
     <div class="hw-station-label">${r<m.totalRounds?esc(hm.chest.name||'Rương Mật Mã'):'✨ MỞ RƯƠNG KHO BÁU!'}</div>
    </div>
    <div class="hw-player ${huntState.moving?'moving':''} facing-${huntState.facing||'right'} ${huntState.isSprinting?'sprinting':''}" id="hwPlayer" style="left:${huntState.x}%;top:${huntState.y}%">
     <div class="hw-player-torch"></div>
     <div class="hw-player-aura-ring"></div>
     <div class="hw-player-shadow"></div>
     <div class="hw-hero-chassis">
      <div class="hw-player-avatar">${world.me.avatar}</div>
      <div class="hw-hero-crown">${(world.me.streak||0)>=2?'🔥':'⭐'}</div>
     </div>
     <div class="hw-player-tag">
      <span class="hw-player-name">${esc(world.me.name)}</span>
      <span class="hw-player-role">Cấp ${world.me.heroLevel||1} · Đội trưởng</span>
     </div>
     <div class="hw-footstep-sparks"></div>
    </div>
   </div>
   <div class="hw-controls-overlay">
    <div class="hw-dpad-wrap">
     <div class="hw-dpad">
      <span></span><button type="button" data-dpad="up" title="Đi lên (W / ↑)">▲</button><span></span>
      <button type="button" data-dpad="left" title="Qua trái (A / ←)">◀</button>
      <button type="button" data-dpad="down" title="Đi xuống (S / ↓)">▼</button>
      <button type="button" data-dpad="right" title="Qua phải (D / →)">▶</button>
     </div>
     <button type="button" class="hw-sprint-btn ${huntState.isSprinting?'active':''}" data-action="toggleSprint" title="Bật/Tắt chạy nhanh (Shift)">⚡ ${huntState.isSprinting?'ĐANG CHẠY NHANH':'TĂNG TỐC'}</button>
    </div>
    <div class="hw-action-panel">
     <button type="button" class="hw-attack-station-btn ${nearStation?'pulse-urgent':''}" data-action="openHuntBattle" style="${nearStation?'display:inline-flex':'display:none'}">⚔️ ĐÃ TỚI TRẠM ${r+1}! BẤM MỞ BÀI TOÁN (Space / E)</button>
     <button type="button" class="hw-interact-btn" data-action="interactNearObject" style="display:inline-flex" title="Nhấn E để tương tác">✋ TƯƠNG TÁC (Phím E)</button>
     <div class="hw-exploring-pill" style="${nearStation?'display:none':'display:flex'}">
      <span class="hw-exploring-icon">🧭</span>
      <div>
       <div style="font-size:12px;font-weight:900;color:#fde047">Đang tự lái tìm Trạm ${r+1} · <span class="hw-exploring-dist">Còn ${Math.round(dist*1.5)}m</span></div>
       <div style="font-size:10.5px;color:#bae6fd">Dùng WASD / Mũi tên hoặc chạm bản đồ để chạy đến Trạm!</div>
      </div>
     </div>
     <div class="hw-hint-pill">💡 Lái nhân vật nhặt Vàng 🪙 và Tinh thể Oxyz 💎 trên đường chạy!</div>
    </div>
   </div>
  </div>
  ${huntState.battleOpen?renderHuntBattleModal(m):''}
  ${cipherState.open?renderCipherNotebookModal(m):''}
  ${showRolesModal?renderTeamRolesModal(m):''}
  ${questDialogue?renderQuestDialogueModal():''}
 </div>`;
}

function renderHuntBattleModal(m){
 const isBoss=Boolean(m.isBoss||world.me?.bossReady);
 const q=m.challenge;
 const monster=q.monster||(isBoss?{icon:'🐲',name:'Boss Bóng Đen Lãng Quên',hp:500,type:'dragon_boss'}:{icon:'👹',name:'Quái Vật Canh Trạm',hp:120,type:'golem'});
 const sel=huntState.selectedChoice;
 return `<div class="hw-battle-backdrop">
  <div class="hw-battle-modal">
   ${huntState.rewardBadge?`<div class="hw-letter-reward-overlay">
     <div style="font-size:56px">🎉</div>
     <h2>ĐÁNH BẠI ${esc(monster.name.toUpperCase())}!</h2>
     <div class="hw-letter-card">${esc(huntState.rewardBadge)}</div>
     <p style="max-width:440px;color:#dcfce7;font-weight:700">${esc(huntState.rewardExplain||'')}</p>
     <button type="button" class="button gold" data-action="finishHuntReward">🗺️ Trở lại bản đồ & Tự lái nhân vật tiếp tục →</button>
    </div>`:''}
   <div class="hw-battle-scroll">
    <div>
     <div class="hw-scroll-kicker">${isBoss?'🐲 ĐẠI CHIẾN BOSS CUỐI CÙNG':('📜 TRẠM '+(m.round+1)+' / '+m.totalRounds+' · '+esc(q.label))}</div>
     <div class="hw-scroll-role">🤝 <b>Phân công nhóm:</b> ${esc(q.roleAssign||m.groupTask)}</div>
     <div class="hw-scroll-question">🧩 ${formatMath(q.prompt)}</div>
     <div class="hw-scroll-options">
      ${q.options.map((opt,i)=>`<button type="button" class="hw-opt-btn ${sel===i?'selected':''}" data-action="selectHuntOpt" data-choice="${i}">
       <span class="opt-letter">${labels[i]}</span>
       <span>${formatMath(opt)}</span>
      </button>`).join('')}
     </div>
     <div class="hw-short-box">
      <span style="font-size:12px;font-weight:900;color:#6b4d28">✍️ Hoặc nhập nhanh đáp án:</span>
      <input type="text" id="huntShortInput" value="${esc(huntState.shortText)}" placeholder="Nhập kết quả số hoặc biểu thức (VD: 3, 2√2, √33...)" />
     </div>
    </div>
    <div class="hw-scroll-footer">
     <div style="display:flex;gap:8px">
      <button type="button" class="hw-btn-flee" data-action="closeHuntBattle">🏃 Rút lui ra bản đồ</button>
      <button type="button" class="hw-btn-flee" data-action="hint">💡 NOVA gợi ý (2 Cấp)</button>
     </div>
     <button type="button" class="hw-btn-attack" data-action="attackHuntMonster">${isBoss?'⚔️ BẮN ĐẠI PHÁO LASER DIỆT BOSS!':'⚔️ TUNG ĐÒN TẤN CÔNG!'}</button>
    </div>
   </div>
   <div class="hw-monster-stage">
    <span class="pill gold" style="margin-bottom:8px">🛡️ KHIÊN ĐỘI: ${'🛡️'.repeat(Math.max(0, Math.min(3, Math.floor(world.me?.health || 0)))) || '0'}</span>
    <div class="hw-monster-hp"><i style="width:${huntState.monsterDefeated?0:100}%"></i></div>
    <small style="color:#fde68a;font-weight:900">${esc(monster.name)} · HP: ${huntState.monsterDefeated?0:monster.hp}/${monster.hp}</small>
    <div class="hw-monster-art-wrap ${huntState.monsterDefeated?'defeated':''}">
     ${renderMonsterSVG(monster.type||'golem',monster.icon)}
    </div>
    ${huntState.monsterDefeated?'<div class="hw-monster-impact">💥</div>':''}
    <p style="font-size:12px;color:#cbd5e1;margin-top:6px">${isBoss?'Hợp sức tính độ dài vectơ w = 2u + v để kích hoạt Laser kết liễu Boss!':'Chọn đáp án đúng hoặc nhập kết quả rồi nhấn <b>⚔️ Tung đòn tấn công</b> để tiêu diệt quái và thu hồi cổ ngữ!'}</p>
   </div>
  </div>
 </div>`;
}

function interactNearObject(){
 const m=world?.current;
 if(!m||huntState.battleOpen||cipherState.open)return;
 
 if((m.bossReady||world.me?.bossReady)&&Math.hypot(huntState.x-50,huntState.y-18)<=18){
  huntState.battleOpen=true;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  sound('boss_roar');
  render();
  return;
 }
 
 const curSt=m.huntMap?.stations?.[m.round];
 if(curSt&&Math.hypot(huntState.x-curSt.x,huntState.y-curSt.y)<=12){
  huntState.battleOpen=true;
  huntState.selectedChoice=null;
  huntState.shortText='';
  huntState.monsterDefeated=false;
  huntState.rewardBadge=null;
  render();
  return;
 }
 
 if(m.id===3&&Math.hypot(huntState.x-14,huntState.y-52)<=14){
  questDialogue={
   avatar:'🧙‍♂️',
   name:'Vệ Binh Hang Pha Lê Oxyz',
   role:'Người Canh Cổng Tháp Cổ',
   text:`<p>Chào các chiến binh Toán học! Tòa <b>Tháp Pha Lê Khoảng Cách</b> đang bị phong ấn bởi một kết giới cổ xưa gồm 5 ổ khóa năng lượng.</p>
   <p style="margin-top:8px">Nhiệm vụ của các em: Hãy điều khiển nhân vật khám phá 5 mỏ tinh thể, giải đúng 5 bài toán <b>Độ dài vectơ & Khoảng cách giữa hai điểm trong không gian Oxyz</b> để thu thập 5 mảnh cổ tự <b>P - H - A - L - E</b>.</p>
   <p style="margin-top:8px;color:#fde047">Sau khi thu thập đủ, hãy tới <b>Bàn Giải Mã Trung Tâm</b> tại cuối thung lũng, mở Sổ Mật Thư và ghép chính xác từ khóa <b>PHALE</b> để khai mở cổng tháp!</p>`
  };
  sound('magic');
  render();
  return;
 }
 
 if(m.id===3&&Math.hypot(huntState.x-88,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('crystal');
  render();
  return;
 }
 
 if(m.id===4&&Math.hypot(huntState.x-89,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('portal');
  render();
  return;
 }
 
 const q=m.challenge;
 if(m.id===4&&q?.targetGrid){
  const gx=q.targetGrid[0], gy=q.targetGrid[1];
  const px=14+(gx/8)*72, py=80-(gy/6)*62;
  if(Math.hypot(huntState.x-px,huntState.y-py)<=12){
   sound('gem');
   huntState.popups.push({
    id:Date.now(),
    x:px,
    y:py-4,
    text:`🎯 Tọa độ M(${gx}; ${gy}) kích hoạt!`,
    color:'#2dd4bf',
    createdAt:performance.now()
   });
   render();
   return;
  }
 }
 
 if(m.id===5&&Math.hypot(huntState.x-50,huntState.y-50)<=15){
  cipherState.open=true;
  cipherState.error=null;
  sound('energy');
  render();
  return;
 }
}
function updateHuntCamera(){
 const vp=$('#hwViewport'), wd=$('#hwWorld'), pl=$('#hwPlayer');
 if(!vp||!wd||!pl)return;
 pl.style.left=huntState.x+'%';
 pl.style.top=huntState.y+'%';
 pl.classList.toggle('moving',huntState.moving);
 pl.classList.toggle('sprinting',huntState.isSprinting);
 pl.classList.toggle('facing-left',huntState.facing==='left');
 pl.classList.toggle('facing-right',huntState.facing==='right');

 const miniPl=$('#hwMiniPlayer');
 if(miniPl){miniPl.style.left=huntState.x+'%';miniPl.style.top=huntState.y+'%';}

 const targetBeacon=$('#hwTargetBeacon');
 if(targetBeacon){
  if(huntState.targetX!==null&&huntState.targetY!==null){
   targetBeacon.style.display='block';
   targetBeacon.style.left=huntState.targetX+'%';
   targetBeacon.style.top=huntState.targetY+'%';
   const dToTarget=Math.hypot(huntState.targetX-huntState.x,huntState.targetY-huntState.y);
   const lbl=targetBeacon.querySelector('.hw-target-beacon-label');
   if(lbl)lbl.textContent=`${Math.round(dToTarget*1.5)}m`;
  }else{
   targetBeacon.style.display='none';
  }
 }

 const m=world?.current;
 const curSt=m?.huntMap?.stations?.[m.round];
 if(curSt){
  const dx=curSt.x-huntState.x, dy=curSt.y-huntState.y;
  const dist=Math.hypot(dx,dy);
  const angleDeg=Math.round(Math.atan2(dy,dx)*180/Math.PI);
  const arr=$('#hwCompassArrow'), txt=$('#hwCompassText');
  if(arr)arr.style.transform=`rotate(${angleDeg}deg)`;
  if(txt)txt.textContent=`${curSt.name} (${Math.round(dist*1.5)}m)`;

  const atkBtn=$('.hw-attack-station-btn');
  const expPill=$('.hw-exploring-pill');
  const isNear=dist<=10.5;
  if(atkBtn){
   if(isNear){
    atkBtn.style.display='inline-flex';
    atkBtn.innerHTML=`⚔️ ĐÃ TỚI ĐỀN ${m.round+1}! BẤM MỞ BÀI TOÁN (Space)`;
    atkBtn.classList.add('pulse-urgent');
    if(expPill)expPill.style.display='none';
   }else{
    atkBtn.style.display='none';
    if(expPill){
     expPill.style.display='flex';
     const dLabel=expPill.querySelector('.hw-exploring-dist');
     if(dLabel)dLabel.textContent=`Còn ${Math.round(dist*1.5)}m`;
    }
   }
  }
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
     <div class="cd-q-prompt">🧩 ${formatMath(q.prompt)}</div>
     <div class="cd-answers">
      ${q.options.map((opt,i)=>`<button type="button" class="cd-ans-btn" data-action="answer" data-choice="${i}" ${world.paused?'disabled':''}>
       <span class="ans-letter">${labels[i]}</span>
       <strong>${formatMath(opt)}</strong>
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


function getGameModeBadge(m){
 if (m.id === 1) return '🗺️ SĂN KHO BÁU 2D (Tự Lái Tìm Đền)';
 if (m.id === 2) return '🏰 THỦ THÀNH CHIẾN THUẬT (3 Làn Real-time)';
 if (m.id === 3) return '🧟 CHẶN ZOMBIE 4 LÀN (Ngắm Bắn Đáp Án Đúng)';
 if (m.id === 4) return '🌀 MÊ CUNG TỌA ĐỘ Ô VUÔNG (Lưới Oxy & Cổng Dịch Chuyển)';
 if (m.id === 5) return '💣 DÒ MÌN BÃI ĐÁ RỪNG THẦN (Phiêu Lưu & Diệt Boss)';
 return '🎮 Game Tương Tác Oxyz';
}

function renderStageGame(m){
 if (m.id === 1) return renderHuntGame(m);
 if (m.id === 2) return renderCastleDefenseGame(m);
 if (m.id === 3) return renderZombieDefenseGame(m);
 if (m.id === 4) return renderGridMazeGame(m);
 if (m.id === 5) return renderMinesweeperGame(m);
 return renderHuntGame(m);
}

function stageContent(m){
 if(m.id === 5 && !m.isBoss){
   return `<div class="ms-wrapper-outer" style="margin-bottom:16px">
     ${renderMinesweeperGame(m)}
     ${renderOxyz3D(m)}
   </div>`;
 }
 if(m.id === 3){
   return `<div class="zd-wrapper-outer" style="margin-bottom:16px">
     ${renderZombieDefenseGame(m)}
     ${renderOxyz3D(m)}
   </div>`;
 }
 const mode=activePlayMode||m.defaultMode||(m.id===2?'defense':'hunt');
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
     <button type="button" class="mode-btn ${mode==='hunt'?'active':''}" data-action="setMode" data-mode="hunt">🗺️ Săn Kho Báu 2D (Tự Lái Tìm Đền)</button>
     <button type="button" class="mode-btn ${mode==='defense'?'active':''}" data-action="setMode" data-mode="defense">🏰 Bảo Vệ Thành Trì (Real-time)</button>
    </div>
   </div>
   <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
    <button type="button" class="oxyz-toggle-btn" data-action="toggle3DPanel">🧊 ${oxyz3D.open?'▲ Đóng 3D Oxyz':'▼ Mở 3D Oxyz & Công thức'}</button>
    <span style="font-size:12px;color:#bae6fd;font-weight:800">🪙 Vàng: <b id="topGoldBadge">${world.me.gold??120}</b> · 🛡️ Khiên: <b>${world.me.health}/3</b></span>
   </div>
  </div>
  ${roles.length?`<div class="role-strip">${roles.map((r,idx)=>`<div class="role-chip ${idx===m.round?'active-role':''}"><span class="role-num">${idx+1}</span> ${esc(r)}</div>`).join('')}</div>`:''}
  ${renderStageGame(m)}
  ${renderOxyz3D(m)}
 </div>`;
}

function finalContent(){
 const words=Object.entries(world.cipherWords||{});
 return `<div class="final-wrap"><div class="panel"><div class="section-title"><h2>🔐 MỞ RƯƠNG LÕI TRÍ TUỆ OXYZ</h2><span class="pill gold">TRẠM CUỐI</span></div><p>Chúc mừng! Cả đội đã chinh phục đủ 5 chặng Lục địa Oxyz. Hãy đọc 5 chữ số mật mã theo thứ tự Chặng 1 → 5, nhập mật mã mở kho báu và chọn thông điệp chiến thắng!</p>${inv(world.me.digits)}<div class="form-field"><label>Nhập mật mã 5 chữ số (theo thứ tự Chặng 1 → 5)</label><input id="finalCode" type="text" class="mono" placeholder="? ? ? ? ?" inputmode="numeric" maxlength="5" autocomplete="off" /></div><h3 style="margin:18px 0 8px">Bảng giải mã từ ngữ</h3><div class="words">${words.map(([k,v])=>`<span class="word-chip">Số ${esc(k)} = ${esc(v)}</span>`).join('')}</div><h3 style="margin:18px 0 8px">Chọn thông điệp nhận được</h3>${world.messageOptions.map((msg,i)=>`<label class="final-option"><input type="radio" name="message" value="${i}" ${i===0?'checked':''}/> ${labels[i]}. ${esc(msg)}</label>`).join('')}${btn('🔓 MỞ RƯƠNG KHO BÁU TRI THỨC','final','gold block')}</div></div>`;
}

function studentScreen(){
 const me=world.me,rank=[...world.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
 const activeBroadcast=(world.lastEvent||[]).find(e=>e.text.includes('📢'));
 const broadcastHtml=activeBroadcast?`<div class="teacher-broadcast-bar">${esc(activeBroadcast.text)}</div>`:'';
 const demoStageBar=window.IS_DEMO_MODE?`<div class="demo-banner" style="margin:10px 0;padding:10px 14px"><strong>⚡ Chuyển nhanh Chặng (Bản Demo):</strong> ${[0,1,2,3,4].map(idx=>`<button type="button" class="button sm ${me.stage===idx?'primary':'gray'}" data-action="demoJumpStage" data-stage="${idx}">Chặng ${idx+1}</button>`).join('')} <button type="button" class="button sm gold" data-action="demoJumpStage" data-stage="5">🔐 Trạm Giải Mã</button> ${btn('👩‍🏫 Sang Màn Hình GV','demoTeacher','sm teal')}</div>`:'';
 return `<div class="mission-hero"><div class="mission-hero-left"><div class="avatar">${me.avatar}</div><div><div class="eyebrow" style="color:#f7ce71">BIỆT ĐỘI ${esc(me.name).toUpperCase()} • PHÒNG ${world.room}</div><h2>${me.completed?'KHO BÁU ĐÃ ĐƯỢC MỞ!':me.stage===5?'ĐÃ THU ĐỦ 5 MẢNH MẬT MÃ!':'HÀNH TRÌNH GIẢI CỨU LỤC ĐỊA OXYZ'}</h2><p>${me.completed?'Hãy theo dõi bảng xếp hạng và phần vinh danh của giáo viên.':me.stage===5?'Hãy ghép 5 chữ số mật mã để mở Rương Lõi Trí Tuệ!':'Quan sát Mô hình Không gian 3D Oxyz, điều khiển nhân vật trên Bản đồ 2D hoặc Chỉ huy Thành Trì!'}</p></div></div><div style="text-align:right"><span class="pill gold">🪙 ${me.gold??120} Vàng · Lv.${me.heroLevel??1}</span></div></div>
 ${broadcastHtml}
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
function notice(title,message,good=false,extra={}){modal={title,message,good,...extra};showModal();sound(good?'correct':'wrong');}
function triggerConfetti(duration=2600){
 const canvas=document.createElement('canvas');
 canvas.className='confetti-canvas';
 document.body.appendChild(canvas);
 const ctx=canvas.getContext('2d');
 const w=canvas.width=window.innerWidth, h=canvas.height=window.innerHeight;
 const colors=['#f59e0b','#ef4444','#10b981','#3b82f6','#a855f7','#ec4899','#facc15'];
 const pieces=Array.from({length:75},()=>({
  x:Math.random()*w,
  y:Math.random()*-h*0.5,
  w:Math.random()*10+6,
  h:Math.random()*6+4,
  color:colors[Math.floor(Math.random()*colors.length)],
  vx:(Math.random()-0.5)*3.5,
  vy:Math.random()*4+2.5,
  rot:Math.random()*360,
  vRot:(Math.random()-0.5)*12
 }));
 const start=performance.now();
 function anim(now){
  ctx.clearRect(0,0,w,h);
  pieces.forEach(p=>{
   p.x+=p.vx; p.y+=p.vy; p.rot+=p.vRot;
   ctx.save();
   ctx.translate(p.x,p.y);
   ctx.rotate(p.rot*Math.PI/180);
   ctx.fillStyle=p.color;
   ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
   ctx.restore();
  });
  if(now-start<duration){
   requestAnimationFrame(anim);
  }else{
   canvas.remove();
  }
 }
 requestAnimationFrame(anim);
}

function sound(type){
 if(!soundEnabled)return;
 try{
  const actx=new(window.AudioContext||window.webkitAudioContext)();
  const now=actx.currentTime;
  if(type===true||type==='correct'){
   [523.25, 659.25, 783.99, 1046.50].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='triangle'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.08);
    gain.gain.exponentialRampToValueAtTime(0.09, now + i*0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.08 + 0.18);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.08); osc.stop(now + i*0.08 + 0.2);
   });
  }else if(type==='laser'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(880, now);
   osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);
   gain.gain.setValueAtTime(0.12, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.36);
  }else if(type==='crystal'||type==='magic'){
   [523.25, 659.25, 783.99, 1046.50, 1567.98].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.07);
    gain.gain.exponentialRampToValueAtTime(0.09, now + i*0.07 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.07 + 0.28);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.07); osc.stop(now + i*0.07 + 0.3);
   });
  }else if(type==='boss_roar'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(160, now);
   osc.frequency.exponentialRampToValueAtTime(45, now + 0.55);
   gain.gain.setValueAtTime(0.14, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.56);
  }else if(type==='energy'||type==='shield'||type==='portal'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(220, now);
   osc.frequency.linearRampToValueAtTime(440, now + 0.2);
   osc.frequency.linearRampToValueAtTime(330, now + 0.4);
   gain.gain.setValueAtTime(0.08, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.46);
  }else if(type==='win'||type==='fanfare'){
   [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='triangle'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.11);
    gain.gain.exponentialRampToValueAtTime(0.11, now + i*0.11 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.11 + 0.32);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.11); osc.stop(now + i*0.11 + 0.35);
   });
  }else if(type==='slash'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(440, now);
   osc.frequency.exponentialRampToValueAtTime(220, now + 0.18);
   gain.gain.setValueAtTime(0.1, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.19);
  }else if(type==='coin'||type==='gem'){
   [880, 1318.51].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sine'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.0001, now + i*0.06);
    gain.gain.exponentialRampToValueAtTime(0.08, now + i*0.06 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.06 + 0.18);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.06); osc.stop(now + i*0.06 + 0.2);
   });
  }else if(type==='step'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='triangle';
   osc.frequency.setValueAtTime(140, now);
   osc.frequency.exponentialRampToValueAtTime(70, now + 0.05);
   gain.gain.setValueAtTime(0.025, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.06);
  }else if(type==='target'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(587.33, now);
   osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
   gain.gain.setValueAtTime(0.05, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.13);
  }else if(type==='boost'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sawtooth';
   osc.frequency.setValueAtTime(260, now);
   osc.frequency.exponentialRampToValueAtTime(640, now + 0.2);
   gain.gain.setValueAtTime(0.06, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.22);
  }else if(type==='skill'){
   const osc=actx.createOscillator(), gain=actx.createGain();
   osc.type='sine';
   osc.frequency.setValueAtTime(320, now);
   osc.frequency.exponentialRampToValueAtTime(960, now + 0.25);
   gain.gain.setValueAtTime(0.08, now);
   gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
   osc.connect(gain).connect(actx.destination);
   osc.start(now); osc.stop(now + 0.26);
  }else{
   [220, 180].forEach((freq, i)=>{
    const osc=actx.createOscillator(), gain=actx.createGain();
    osc.type='sawtooth'; osc.frequency.value=freq;
    gain.gain.setValueAtTime(0.07, now + i*0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i*0.1 + 0.12);
    osc.connect(gain).connect(actx.destination);
    osc.start(now + i*0.1); osc.stop(now + i*0.1 + 0.13);
   });
  }
  setTimeout(()=>actx.close(), 1200);
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
 const isMinesweeper = (world.me?.stage === 4 || world.current?.gameType === 'minesweeper');
 const result=await submit('/api/answer',{stage:world.me.stage,round:world.me.round,...payload});
 if(!result) return null;

 if(result.correct){
  const now=performance.now();
  if(curMode==='defense'){
   sound('laser');
   cdState.laserUntil=now+750;
   cdState.shakeUntil=now+500;
   cdState.enemies.forEach(en=>{
    cdState.effects.push({id:++cdState.seq,x:en.x,lane:en.lane,text:'💥 LASER OXYZ -999!',cls:'crit',until:now+950});
   });
   cdState.enemies=[];
  }
  if(result.stageFinished){
   sound('win');
   triggerConfetti(3200);
   huntState.battleOpen=false;
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   activePlayMode=null;
   notice('🏆 CHINH PHỤC CHẶNG THÀNH CÔNG!', 'Đội đã thu hồi vật phẩm "' + (result.item||'Cổ ngữ') + '"! Quy tắc mật mã: ' + (result.digitRule||''), true,
    {explain:result.explain,digit:result.digit,points:result.points,goldEarned:result.goldEarned,streak:result.streak,button:result.nextStage===5?'Tiến tới Mở Rương Lõi Trí Tuệ →':'Bước sang Chặng tiếp theo →'});
   updateAfterAction();
  }else if(isMinesweeper){
   // Dò mìn Chặng 5: Để engine tự xử lý hiệu ứng tiếp đất an toàn và nhận mảnh cổ ngữ
   return result;
  }else if(curMode==='hunt'&&huntState.battleOpen){
   sound('slash');
   triggerConfetti(1600);
   huntState.monsterDefeated=true;
   huntState.rewardBadge=result.keyBadge||('Lượt ' + result.nextRound);
   huntState.rewardExplain=result.explain;
   render();
  }else{
   sound('correct');
   notice('💥 ĐẠI BÁC LASER OXYZ KHAI HỎA!', 'Đợt quái vật thứ ' + (world.me.round+1) + ' đã bị tia Laser Oxyz quét sạch! Đội nhận +' + (result.goldEarned||120) + ' Vàng.', true,
    {explain:result.explain,goldEarned:result.goldEarned||120,streak:result.streak,button:'Tiếp tục Đợt ' + (result.nextRound+1) + '/3 →'});
   updateAfterAction();
  }
 }else{
  sound('wrong');
  cdState.shakeUntil=performance.now()+450;
  if(isMinesweeper){
   // Dò mìn: KHÔNG hiện modal che màn hình, để bãi mìn nổ boom và chú lính văng về gốc!
   return result;
  }
  const x=result.health===0?'Đội đã cạn khiên nhưng NOVA đã sạc lại năng lượng để đội thử tiếp! ':'';
  notice('🛡️ CHƯA CHÍNH XÁC – HÃY QUAN SÁT MÔ HÌNH 3D!',x+'Gợi ý từ NOVA: '+result.hint,false,{button:'↺ Thử lại ngay'});
  updateAfterAction();
 }
 return result;
}

async function submitCipherNotebook(){
 const m=world?.current;
 if(!m)return;
 const word=cipherState.slots.join('').toUpperCase();
 if(word.length<5){
  cipherState.error='Vui lòng điền đủ 5 ký tự vào 5 ô mật mã.';
  render();
  return;
 }
 cipherState.solving=true;
 cipherState.error=null;
 render();
 try{
  const res=await submit('/api/cipher',{cipher:word});
  if(res.correct){
   sound('crystal');
   sound('win');
   triggerConfetti(3500);
   cipherState.successMsg=res.message||'GIẢI MÃ THÀNH CÔNG!';
   cipherState.error=null;
   render();
   setTimeout(()=>{
    cipherState.open=false;
    cipherState.slots=[null,null,null,null,null];
    cipherState.successMsg=null;
    if(res.bossReady){
     world.me.bossReady=true;
     notice('🛡️ LÁ CHẮN THÀNH TRÌ ĐÃ KÍCH HOẠT!','Đại Boss Bóng Đen Lãng Quên đang tiến vào! Hãy tiến lên phía trên để nghênh chiến!',true,{button:'Tiến lên nghênh chiến!'});
    }else if(res.stageFinished){
     notice('🏆 KHAI MỞ PHONG ẤN THÀNH CÔNG!',`Đội đã mở khóa ${m.place}! Nhận mảnh số mật mã "${res.digit}" (${res.digitRule})`,true,{digit:res.digit,points:res.points,button:res.nextStage===5?'Tiến tới Mở Rương Lõi Trí Tuệ →':'Bước sang Chặng tiếp theo →'});
    }
    updateAfterAction();
   },1200);
  }else{
   sound('wrong');
   cipherState.error=res.hint||'Mật mã chưa chính xác. Hãy sắp xếp lại các ký tự theo gợi ý!';
   cipherState.solving=false;
   render();
  }
 }catch(err){
  sound('wrong');
  cipherState.error=err.message||'Lỗi khi gửi mật mã. Hãy thử lại.';
  cipherState.solving=false;
  render();
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
  if(action==='toggleSprint'){
   huntState.isSprinting=!huntState.isSprinting;
   if(huntState.isSprinting)sound('boost');
   updateHuntCamera();
   const btn=$('.hw-sprint-btn');
   if(btn){
    btn.classList.toggle('active',huntState.isSprinting);
    btn.innerHTML=`⚡ ${huntState.isSprinting?'ĐANG CHẠY NHANH':'TĂNG TỐC'}`;
   }
   return;
  }
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
    return notice('🧰 Rương đang khóa','Hãy tự điều khiển nhân vật tìm và vượt qua đủ 3 Đền thờ trên bản đồ để mở Rương Mật Mã!',false);
   }
   return;
  }
  if(action==='openHuntBattle'){
   const m=world?.current;if(!m)return;
   const st=m.huntMap?.stations?.[m.round];
   if(st){
    const d=Math.hypot(st.x-huntState.x, st.y-huntState.y);
    if(d > 12){
     return notice('🧭 Chưa tới Đền', `Đội đang cách Đền ${m.round+1} khoảng ${Math.round(d*1.5)}m. Hãy dùng phím mũi tên / WASD hoặc chạm vào đường mòn để tự lái nhân vật chạy tới Đền nhé!`, false);
    }
   }
   huntState.battleOpen=true;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   render();
   return;
  }
  
  
  
  
  if(action==='aimMsPadPrev'){
    msState.aimedPad = Math.max(0, msState.aimedPad - 1);
    sound('step');
    render();
    return;
  }
  if(action==='aimMsPadNext'){
    msState.aimedPad = Math.min(3, msState.aimedPad + 1);
    sound('step');
    render();
    return;
  }
  if(action==='jumpMsPadAimed'){
    await stepMinesweeperPad(msState.aimedPad);
    return;
  }

  if(action==='stepMinesweeperPad'){
    const p = Number(el.dataset.pad);
    if(!isNaN(p)) await stepMinesweeperPad(p);
    return;
  }

  if(action==='shootZombieLane'){
   const l = Number(el.dataset.lane);
   if(!isNaN(l)) await shootZombieLane(l);
   return;
  }

  if(action==='clickMazeCell'){
   const cx = Number(el.dataset.x), cy = Number(el.dataset.y);
   if(!isNaN(cx) && !isNaN(cy) && !isMazeWall(cx, cy)){
    mazeState.x = cx; mazeState.y = cy;
    sound('step');
    const curWp = mazeState.waypoints[Math.min(world.current.round, 4)];
    if(curWp && cx === curWp.x && cy === curWp.y){
     sound('gem');
     huntState.battleOpen = true;
     huntState.selectedChoice = null;
     huntState.shortText = '';
     huntState.monsterDefeated = false;
     huntState.rewardBadge = null;
    }
    render();
   }
   return;
  }
  if(action==='autoStepToMazeTarget'){
   const curWp = mazeState.waypoints[Math.min(world.current.round, 4)];
   if(curWp){
    mazeState.x = curWp.x; mazeState.y = curWp.y;
    sound('gem');
    huntState.battleOpen = true;
    huntState.selectedChoice = null;
    huntState.shortText = '';
    huntState.monsterDefeated = false;
    huntState.rewardBadge = null;
    render();
   }
   return;
  }
  if(action==='clickAnvilInfo'){
   sound('step');
   const idx = Number(el.dataset.idx);
   notice('🔮 BỆ RÈN TINH THỂ', `Đây là Bệ rèn số ${idx+1}. Hãy hoàn thành các lượt trước để kích hoạt bệ rèn này!`, false);
   return;
  }
  if(action==='clickPylonInfo'){
   sound('step');
   const idx = Number(el.dataset.idx);
   notice('⚡ TRỤ PHÉP THÀNH TRÌ', `Trụ phép số ${idx+1} đang bảo vệ kết giới. Hãy giải lần lượt từng trụ theo thứ tự!`, false);
   return;
  }

  if(action==='openCipherNotebook'){
   cipherState.open=true;cipherState.error=null;render();return;
  }
  if(action==='closeCipherNotebook'){
   cipherState.open=false;render();return;
  }
  if(action==='placeCipherChip'){
   const ch=el.dataset.char;
   const emptyIdx=cipherState.slots.indexOf(null);
   if(emptyIdx!==-1){
    cipherState.slots[emptyIdx]=ch;
    sound('step');
    render();
   }
   return;
  }
  if(action==='removeCipherSlot'){
   const slotIdx=Number(el.dataset.slot);
   if(!isNaN(slotIdx)){
    cipherState.slots[slotIdx]=null;
    sound('step');
    render();
   }
   return;
  }
  if(action==='resetCipherSlots'){
   cipherState.slots=[null,null,null,null,null];
   cipherState.error=null;
   render();
   return;
  }
  if(action==='submitCipherNotebook'){
   await submitCipherNotebook();
   return;
  }
  if(action==='openTeamRoles'){
   showRolesModal=true;render();return;
  }
  if(action==='closeTeamRoles'){
   showRolesModal=false;render();return;
  }
  if(action==='clickNPC'){
   interactNearObject();return;
  }
  if(action==='closeQuestDialogue'){
   questDialogue=null;render();return;
  }
  if(action==='clickCrystalAltar'){
   cipherState.open=true;cipherState.error=null;sound('crystal');render();return;
  }
  if(action==='clickMazeChest'){
   cipherState.open=true;cipherState.error=null;sound('portal');render();return;
  }
  if(action==='clickCitadelCore'){
   cipherState.open=true;cipherState.error=null;sound('energy');render();return;
  }
  if(action==='clickTargetBeacon'){
   sound('gem');
   notice('🎯 TỌA ĐỘ BÍ MẬT!',`Đội đã tìm thấy vị trí tọa độ (${el.dataset.gx}; ${el.dataset.gy}) trên bản đồ Mê Cung!`,true,{button:'Tuyệt vời'});
   return;
  }
  if(action==='openBossBattle'){
   huntState.battleOpen=true;
   huntState.selectedChoice=null;
   huntState.shortText='';
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   sound('boss_roar');
   render();
   return;
  }
  if(action==='interactNearObject'){
   interactNearObject();
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
   huntState.targetX=null;
   huntState.targetY=null;
   huntState.moving=false;
   huntState.lastAutoStation=-1;
   await refresh(true);
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
   sound('skill');
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

  /* ─── ACTIONS CHUNG & GIÁO VIÊN ─── */
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
   if(r.correct){
    sound('win');
    triggerConfetti(4500);
    notice('🏆 GIẢI CỨU THÀNH PHỐ OXYZ THÀNH CÔNG!','Lõi Trí Tuệ đã được khôi phục: '+r.message,true,{points:r.points,button:'Xem bảng vinh danh →'});
   }else{
    notice('MẬT THƯ CHƯA ĐƯỢC MỞ','NOVA gợi ý: '+r.hint,false,{button:'Thử giải mã lại'});
   }
   updateAfterAction();return;
  }
  if(action==='closeModal'){modal=null;$('.modal-backdrop')?.remove();await refresh(true);return;}
  if(action==='pauseGame'){await submit('/api/teacher',{action:'pause'});updateAfterAction();return;}
  if(action==='timerToggle'){await submit('/api/teacher',{action:'timer',value:world.clock.running?'pause':'start'});updateAfterAction();return;}
  if(action==='timerReset'){await submit('/api/teacher',{action:'timer',value:'reset'});updateAfterAction();return;}
  if(action==='setBonus'){const team=$('#bonusTeam').value,value=Number($('#bonusValue').value);await submit('/api/teacher',{action:'bonus',team,value});updateAfterAction();return;}
  if(action==='teacherBroadcast'){
   const msg=prompt('Nhập nội dung nhắc nhở/gợi ý gửi tới toàn bộ học sinh trong lớp:');
   if(msg&&msg.trim()){
    await submit('/api/teacher',{action:'broadcast',message:msg.trim()});
    notice('ĐÃ GỬI THÔNG BÁO','Thông điệp đã được gửi tới toàn thể các đội thám hiểm!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='teacherHealAll'){
   if(confirm('Nạp đầy 3 khiên bảo vệ cho tất cả các đội trong lớp?')){
    await submit('/api/teacher',{action:'healAll'});
    sound('skill');
    notice('ĐÃ HỒI PHỤC KHIÊN','Tất cả các đội đã được sạc đầy 3 khiên năng lượng!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='teacherBonusAll'){
   if(confirm('Thưởng nóng +5 XP và +50 Vàng cho tất cả các đội vì tinh thần học tập tích cực?')){
    await submit('/api/teacher',{action:'bonusAll'});
    sound('correct');
    triggerConfetti(2200);
    notice('ĐÃ THƯỞNG NÓNG','Đã cộng +5 XP và +50 Vàng cho toàn thể các đội!',true);
    updateAfterAction();
   }
   return;
  }
  if(action==='preview3DStage'){
   teacherPreviewStage=Number(el.dataset.stage);
   render();
   return;
  }
  if(action==='awards'){
   showAward=!showAward;
   if(showAward){sound('fanfare');triggerConfetti(3500);}
   render();
   return;
  }
  if(action==='print'){window.print();return;}
  if(action==='exportCSV'){exportCSV();return;}
  if(action==='resetTeam'){const team=$('#resetTeam').value;const name=world.teams.find(t=>t.id===team)?.name;if(!confirm('Đặt lại từ đầu toàn bộ nhiệm vụ và điểm của '+name+'?'))return;await submit('/api/teacher',{action:'resetTeam',team});updateAfterAction();return;}
  if(action==='copy'){const url=el.dataset.url;try{await navigator.clipboard.writeText(url);notice('ĐÃ SAO CHÉP LIÊN KẾT',url,true);}catch(e){notice('LIÊN KẾT ĐỘI',url,true);}return;}
 }catch(e){
  notice('THÔNG BÁO',e.message||'Có lỗi xảy ra.',false);
  if(el)el.disabled=false;
 }
}

/* ─── XỬ LÝ SỰ KIỆN BÀN PHÍM, CHUỘT, CHẠM & D-PAD CHO BẢN ĐỒ 2D ─── */
let isPointerDraggingMap=false;

function updateTargetFromPointer(e){
 const wd=$('#hwWorld');if(!wd)return;
 const rect=wd.getBoundingClientRect();
 if(rect.width>0&&rect.height>0){
  const tx=Math.max(6,Math.min(94,(e.clientX-rect.left)/rect.width*100));
  const ty=Math.max(8,Math.min(92,(e.clientY-rect.top)/rect.height*100));
  huntState.targetX=tx;
  huntState.targetY=ty;
  huntState.lastAutoStation=-1;
  updateHuntCamera();
 }
}

document.addEventListener('click',e=>{
 const el=e.target.closest('[data-action]');
 if(el){e.preventDefault();handle(el.dataset.action,el);return;}
});

document.addEventListener('pointerdown',e=>{
 const dbtn=e.target.closest('[data-dpad]');
 if(dbtn){
  e.preventDefault();
  huntState.keysPressed.add(dbtn.dataset.dpad);
  huntState.targetX=null;huntState.targetY=null;
  return;
 }
 const vp=e.target.closest('#hwViewport');
 if(vp&&!e.target.closest('.hw-controls-overlay')&&!e.target.closest('.hw-station')&&!e.target.closest('.hw-chest')&&!e.target.closest('.hw-hud-top')&&!e.target.closest('.hw-compass')&&!e.target.closest('.hw-minimap')){
  isPointerDraggingMap=true;
  updateTargetFromPointer(e);
  sound('target');
 }
});

document.addEventListener('pointermove',e=>{
 if(isPointerDraggingMap){
  updateTargetFromPointer(e);
 }
});

document.addEventListener('pointerup',()=>{
 isPointerDraggingMap=false;
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
 if(e.code==='Space'&&session?.role==='student'&&!huntState.battleOpen){
  const m=world?.current;
  if(m&&m.huntMap?.stations?.[m.round]){
   const curSt=m.huntMap.stations[m.round];
   const dist=Math.hypot(curSt.x-huntState.x, curSt.y-huntState.y);
   if(dist<=12){
    e.preventDefault();
    handle('openHuntBattle');
    return;
   }
  }
 }
 if((e.key==='Shift'||e.code==='ShiftLeft'||e.code==='ShiftRight')&&session?.role==='student'){
  huntState.isSprinting=true;
  updateHuntCamera();
 }
 let dir=keyMap[e.code];
 if(!dir&&e.key){
  const k=e.key.toLowerCase();
  if(k==='w'||k==='arrowup')dir='up';
  else if(k==='s'||k==='arrowdown')dir='down';
  else if(k==='a'||k==='arrowleft')dir='left';
  else if(k==='d'||k==='arrowright')dir='right';
 }
 if(dir&&session?.role==='student'&&!huntState.battleOpen){
  e.preventDefault();
  huntState.keysPressed.add(dir);
  huntState.targetX=null;huntState.targetY=null;
 }
});

window.addEventListener('keyup',e=>{
 if(e.key==='Shift'||e.code==='ShiftLeft'||e.code==='ShiftRight'){
  huntState.isSprinting=false;
  updateHuntCamera();
 }
 let dir=keyMap[e.code];
 if(!dir&&e.key){
  const k=e.key.toLowerCase();
  if(k==='w'||k==='arrowup')dir='up';
  else if(k==='s'||k==='arrowdown')dir='down';
  else if(k==='a'||k==='arrowleft')dir='left';
  else if(k==='d'||k==='arrowright')dir='right';
 }
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

   const speed=(huntState.isSprinting?40:24);

   if(vx!==0||vy!==0){
    const len=Math.hypot(vx,vy);
    huntState.x=Math.max(6,Math.min(94,huntState.x+(vx/len)*speed*dt));
    huntState.y=Math.max(8,Math.min(92,huntState.y+(vy/len)*speed*dt));
    huntState.moving=true;
    if(vx>0.05)huntState.facing='right';
    else if(vx<-0.05)huntState.facing='left';
   }else if(huntState.targetX!==null&&huntState.targetY!==null){
    const dx=huntState.targetX-huntState.x, dy=huntState.targetY-huntState.y;
    const dist=Math.hypot(dx,dy);
    if(dist<0.8){
     huntState.x=huntState.targetX;huntState.y=huntState.targetY;
     huntState.targetX=null;huntState.targetY=null;
     huntState.moving=false;
    }else{
     huntState.x+=(dx/dist)*speed*dt;
     huntState.y+=(dy/dist)*speed*dt;
     huntState.moving=true;
     if(dx>0.05)huntState.facing='right';
     else if(dx<-0.05)huntState.facing='left';
    }
   }else{
    huntState.moving=false;
   }

   // Bước chân âm thanh Web Audio
   if(huntState.moving&&now-huntState.lastStepSfxAt>(huntState.isSprinting?200:320)){
    huntState.lastStepSfxAt=now;
    sound('step');
   }

   // Kiểm tra nhặt tinh thể & quà tặng
   if(huntState.collectibles?.length){
    huntState.collectibles.forEach(c=>{
     if(!c.collected&&Math.hypot(huntState.x-c.x,huntState.y-c.y)<4.2){
      c.collected=true;
      sound('coin');
      if(c.type==='gold')world.me.gold=(world.me.gold||0)+c.val;
      if(c.type==='xp')world.me.score=(world.me.score||0)+c.val;
      if(c.type==='shield')world.me.health=Math.min(3,(world.me.health||3)+c.val);
      huntState.popups.push({id:Date.now()+Math.random(),x:c.x,y:c.y,text:c.label,color:c.type==='xp'?'#38bdf8':'#fde047',createdAt:now});
      const el=document.getElementById('collectible-'+c.id);
      if(el)el.style.display='none';
     }
    });
   }
   // Dọn dẹp popup cũ sau 1.2s
   if(huntState.popups?.length){
    huntState.popups=huntState.popups.filter(p=>now-p.createdAt<1200);
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
