/* MATHVERSE OXYZ — Hệ thống Game Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì) */
'use strict';
const $=sel=>document.querySelector(sel);
const $$=sel=>Array.from(document.querySelectorAll(sel));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app=$('#app');
const qs=new URLSearchParams(location.search);
let session=null, world=null, modal=null, busy=false, showAward=false, soundEnabled=true;
let lastSignature='', lastStudentKey='', clockBase=null, tickBase=0;
let activePlayMode=null; // 'hunt' | 'defense'

const missionMeta=[['🏝️','Rừng Vectơ'],['🏰','Pháo Đài Vuông Góc'],['💠','Tháp Pha Lê'],['🌀','Mê Cung'],['🐲','Thành Trì Cuối']];
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
 return `<nav class="navbar"><div class="brand"><span class="brand-mark">✦</span><span>MATHVERSE <span style="color:#15b9b8">OXYZ</span></span></div><div class="pills"><span class="pill">📐 TOÁN 12 (GDPT 2018)</span><span class="pill gold">🗺️ SĂN KHO BÁU 2D & 🏰 THỦ THÀNH</span><button class="button sm gray" data-action="toggleSound">${soundEnabled?'🔊 Âm thanh: Bật':'🔇 Âm thanh: Tắt'}</button>${session?`<button class="button sm gray" data-action="home">⌂ Đổi màn hình</button>`:''}</div></nav>${content}<div class="footer">MathVerse Oxyz – Hệ thống Game Tương Tác Nhóm (Săn Kho Báu 2D & Bảo Vệ Thành Trì) • Trường THPT Số 1 Phan Chu Trinh</div>`;
}

function startScreen(msg=''){
 const fRoom=esc(initialRoom),fTeam=esc(initialTeam);
 const demoBar=window.IS_DEMO_MODE?`<div class="demo-banner"><strong>🎮 CHẾ ĐỘ CHƠI THỬ & TRÌNH CHIẾU 1 MÁY:</strong> ${btn('▶ VÀO ĐỘI RỒNG XANH (CHƠI NGAY)','demoPlay','teal')} ${btn('👩‍🏫 XEM MÀN HÌNH GIÁO VIÊN','demoTeacher','gold')}<small>Phòng mẫu 123456 · Mã PIN Đội 1: 1111 · Đội 2: 2222 · Đội 3: 3333 · Đội 4: 4444</small></div>`:'';
 app.innerHTML=layout(`<header class="hero"><div class="eyebrow">HÀNH TRÌNH GIẢI MẬT THƯ • TOÁN LỚP 12</div><h1>MATHVERSE OXYZ<br/>SĂN KHO BÁU & BẢO VỆ THÀNH TRÌ</h1><p class="subtitle">Hệ thống 5 Chặng Game Tương Tác Nhóm: Điều khiển nhân vật Săn Kho Báu trên bản đồ 2D & Chỉ huy 3 Anh Hùng Bảo Vệ Thành Trì thời gian thực!</p><div class="hero-character">🧭</div></header>
 ${demoBar}
 <div class="tabs"><button class="active" data-action="switch-tab" data-tab="teacher">👩‍🏫 Tạo phòng – Giáo viên</button><button data-action="switch-tab" data-tab="student">🧑‍🚀 Vào đội – Học sinh</button></div>
 ${msg?`<div class="notice error">${esc(msg)}</div>`:''}
 <section class="setup grid grid-2" id="entry"><div class="panel" data-tabbox="teacher"><div class="section-title"><h2>🎓 Phòng điều khiển Giáo viên</h2></div><p>Giáo viên tạo mã phòng, phát mã PIN cho 4–8 nhóm học sinh, chiếu bản đồ hành trình và theo dõi điểm XP, Vàng, Khiên theo thời gian thực.</p><div class="form-field"><label>Số đội tham gia</label><select id="teamCount"><option value="4">4 đội</option><option value="5">5 đội</option><option value="6" selected>6 đội</option><option value="7">7 đội</option><option value="8">8 đội</option></select></div>${btn('✨ TẠO PHÒNG MATHVERSE','create','primary block')}<p class="muted" style="margin-top:13px;font-size:12px">Khuyến nghị 4–6 học sinh/đội (phân vai tính trục Ox, Oy, Oz và Đội trưởng điều khiển).</p></div>
 <div class="panel" data-tabbox="student"><div class="section-title"><h2>🚀 Đăng nhập Đội Thám Hiểm</h2></div><p>Nhận mã phòng và mã PIN đội từ giáo viên. Cả nhóm cùng thảo luận công thức để điều khiển nhân vật và bảo vệ thành trì!</p><div class="form-field"><label>Mã phòng 6 chữ số</label><input id="roomInput" type="text" inputmode="numeric" maxlength="6" class="mono" value="${fRoom}" placeholder="VD: 123456" /></div><div class="form-field"><label>Đội thám hiểm</label><select id="teamSelect">${Array.from({length:8},(_,i)=>`<option value="doi-${i+1}" ${fTeam===`doi-${i+1}`?'selected':''}>Đội ${i+1}</option>`).join('')}</select></div><div class="form-field"><label>Mã đội 4 chữ số</label><input id="teamCode" type="password" inputmode="numeric" maxlength="4" placeholder="Mã PIN của đội" /></div>${btn('🗝️ VÀO HÀNH TRÌNH NGAY','join','teal block')}</div></section>
 <div class="panel" style="margin-top:20px"><h3>📜 Cốt truyện & Hai cơ chế Game Tương Tác Nhóm</h3><p style="margin-top:8px">“Bóng Đen Lãng Quên đã chia Lõi Trí Tuệ của Thành phố Oxyz thành 5 mảnh mật mã. Ở mỗi chặng, các đội có thể trải nghiệm <b>🗺️ Săn Kho Báu 2D</b> (điều khiển nhân vật đi trên bản đồ tìm các trạm quái vật, mở cuộn giấy giải toán) và <b>🏰 Bảo Vệ Thành Trì</b> (chỉ huy 3 Anh Hùng bắn hạ các đợt quái vật trên 3 làn đường, dùng Vàng nâng cấp vũ khí và tung 4 Kỹ năng đặc biệt)!”</p></div>`);
}

function mapTrack(stage){
 return `<div class="stage-track">${missionMeta.map((a,i)=>`<div class="station ${i<stage?'done':i===stage?'current':''}"><div class="emoji">${i<stage?'✅':a[0]}</div><span>Chặng ${i+1}: ${esc(a[1])}</span></div>`).join('')}</div>`;
}
function teacherMap(teams){
 return `<div class="big-map"><div class="screen-tag">🗺️ BẢN ĐỒ DI CHUYỂN TRỰC TIẾP CỦA CÁC ĐỘI</div>${mapTrack(-1)}${teams.map(t=>`<div class="map-lane"><div class="map-name"><span class="team-avatar">${t.avatar}</span><span>${esc(t.name)}</span></div><div class="track"><div class="filled" style="width:${Math.max(2,(t.stage*3+t.round)/15*100)}%"></div><div class="ticks">${[0,1,2,3,4,5].map(()=>'<i></i>').join('')}</div><span class="pawn" style="--pos:calc(5% + ${(t.stage*3+(t.stage<5?t.round:0))/15} * 90%)">${t.avatar}</span></div><div class="lane-score">${t.score} XP · 🪙${t.gold??100}<br/><small>${t.stage<5?`Chặng ${t.stage+1} (${t.round+1}/3) · 🛡️${t.health}`:'🔓 Đủ 5 mảnh'}</small></div></div>`).join('')}</div>`;
}
function standings(teams,compact=false){
 const list=[...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||(b.round-a.round)||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 if(compact)return list.map((t,i)=>`<div class="mini-rank"><span>${i===0?'🥇':i===1?'🥈':i===2?'🥉':'🏅'} ${t.avatar} ${esc(t.name)}</span><strong>${t.score} XP</strong></div>`).join('');
 return `<table class="result-table"><thead><tr><th>Hạng</th><th>Đội</th><th>Tiến độ Chặng</th><th>Vàng & Cấp</th><th>Điểm XP</th><th>Trạng thái</th></tr></thead><tbody>${list.map((t,i)=>`<tr><td>${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td><td>${t.avatar} <strong>${esc(t.name)}</strong></td><td><div class="mini-progress"><span style="width:${(t.stage*3+(t.stage<5?t.round:0))/15*100}%"></span></div><small>Chặng ${t.stage}/5 • ${t.stage<5?`lượt ${t.round+1}/3`:'Hoàn tất 5 chặng'}</small></td><td>🪙 ${t.gold??100} · Lv.${t.heroLevel??1}</td><td><strong>${t.score} XP</strong></td><td>${t.completed?'<span class="pill green">🏆 Đã mở kho báu</span>':t.stage===5?'<span class="pill gold">🔐 Đang giải mật mã</span>':'⚔️ Đang chiến đấu'}</td></tr>`).join('')}</tbody></table>`;
}

function teacherScreen(){
 const teams=world.teams,done=teams.filter(t=>t.completed).length;
 const joinBase=world.joinBaseURL||location.origin;const baseUrl=joinBase+location.pathname;
 const winners=[...teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const helper=[...teams].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="dashboard-head"><div><span class="screen-tag">👩‍🏫 MÀN HÌNH ĐIỀU HÀNH GIÁO VIÊN</span><h2>Mã Phòng Học: <span class="room-number">${esc(world.room)}</span></h2><p class="muted">Học sinh tham gia theo nhóm qua 2 cơ chế: <b>Săn Kho Báu 2D</b> & <b>Bảo Vệ Thành Trì</b>. Bản đồ cập nhật tự động theo thời gian thực.</p></div><div class="panel" style="text-align:center;padding:15px 20px"><span class="screen-tag">ĐỒNG HỒ TIẾT HỌC</span><div class="clock" id="clock">45:00</div><div class="controls">${btn(world.clock.running?'⏸ Dừng giờ':'▶ Bắt đầu','timerToggle','sm teal')}${btn('↻','timerReset','sm gray')}<select id="clockMinutes" aria-label="Thời lượng tiết học"><option value="35" ${world.clock.minutes===35?'selected':''}>35 phút</option><option value="40" ${world.clock.minutes===40?'selected':''}>40 phút</option><option value="45" ${world.clock.minutes===45?'selected':''}>45 phút</option><option value="50" ${world.clock.minutes===50?'selected':''}>50 phút</option></select></div></div></div>
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
   RENDER ENGINE 1: SĂN KHO BÁU 2D MAP (SCAVENGER HUNT)
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
 if(theme==='maze'){
  return `
   <div class="hw-wall-block" style="left:21%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:41%;top:38%;width:3.5%;height:52%"></div>
   <div class="hw-wall-block" style="left:63%;top:10%;width:3.5%;height:52%"></div>
   <div class="hw-obstacle" style="left:16%;top:22%">🗿</div>
   <div class="hw-obstacle" style="left:48%;top:18%">🕯️</div>
   <div class="hw-obstacle" style="left:82%;top:76%">🏛️</div>`;
 }
 if(theme==='crystal'){
  return `
   <div class="hw-wall-block" style="left:22%;top:58%;width:12%;height:6%"></div>
   <div class="hw-wall-block" style="left:42%;top:22%;width:12%;height:6%"></div>
   <div class="hw-obstacle" style="left:18%;top:22%">💎</div>
   <div class="hw-obstacle" style="left:45%;top:48%">🔮</div>
   <div class="hw-obstacle" style="left:64%;top:75%">🔷</div>
   <div class="hw-obstacle" style="left:82%;top:22%">✨</div>`;
 }
 if(theme==='fortress'||theme==='citadel'){
  return `
   <div class="hw-wall-block" style="left:23%;top:14%;width:4%;height:26%"></div>
   <div class="hw-wall-block" style="left:62%;top:56%;width:4%;height:28%"></div>
   <div class="hw-obstacle" style="left:18%;top:75%">🔥</div>
   <div class="hw-obstacle" style="left:45%;top:20%">⚔️</div>
   <div class="hw-obstacle" style="left:66%;top:18%">🌋</div>
   <div class="hw-obstacle" style="left:82%;top:74%">🛡️</div>`;
 }
 return `
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
  const st=stList[i]||{x:35+i*20,y:40,name:'Trạm '+(i+1)};
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
 const dist=Math.hypot(huntState.x-curStation.x,huntState.y-curStation.y);
 const nearStation=dist<=10.5;

 return `<div class="hw-wrapper">
  <div class="hw-hud-top">
   <div class="hw-hud-keys">${keySlots}<div class="hw-key-slot ${r>=3?'earned':''}">🎁 Mảnh chặng: <b>${r>=3?esc(m.digit):'?'}</b></div></div>
   <div class="hw-quick-nav">${quickBtns}</div>
  </div>
  <div class="hw-viewport" id="hwViewport">
   <div class="hw-world theme-${esc(hm.theme||'forest')}" id="hwWorld">
    <svg class="hw-path-svg" viewBox="0 0 1200 820" preserveAspectRatio="none">
     <polyline points="${pathPts}" fill="none" stroke="rgba(250,204,21,0.38)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="18 14" />
    </svg>
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
 const monster=q.monster||{icon:'👹',name:'Quái Vật Canh Trạm',hp:120};
 const sel=huntState.selectedChoice;
 return `<div class="hw-battle-backdrop">
  <div class="hw-battle-modal">
   ${huntState.rewardBadge?`<div class="hw-letter-reward-overlay">
     <div style="font-size:56px">🎉</div>
     <h2>ĐÁNH BẠI QUÁI VẬT TRẠM ${m.round+1}!</h2>
     <div class="hw-letter-card">${esc(huntState.rewardBadge)}</div>
     <p style="max-width:420px;color:#dcfce7;font-weight:700">${esc(huntState.rewardExplain||'')}</p>
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
     <button type="button" class="hw-btn-attack" data-action="attackHuntMonster">⚔️ TẤN CÔNG QUÁI VẬT!</button>
    </div>
   </div>
   <div class="hw-monster-stage">
    <span class="pill gold" style="margin-bottom:8px">🛡️ KHIÊN ĐỘI: ${'🛡️'.repeat(world.me.health)||'0'}</span>
    <div class="hw-monster-hp"><i style="width:${huntState.monsterDefeated?0:100}%"></i></div>
    <small style="color:#fde68a;font-weight:800">${esc(monster.name)} · HP: ${huntState.monsterDefeated?0:monster.hp}/${monster.hp}</small>
    <div class="hw-monster-sprite ${huntState.monsterDefeated?'defeated':''}">${monster.icon}</div>
    ${huntState.monsterDefeated?'<div class="hw-monster-impact">💥</div>':''}
    <p style="font-size:12.5px;color:#cbd5e1;margin-top:8px">Chọn đáp án đúng hoặc nhập kết quả rồi nhấn <b>⚔️ Tấn công</b> để tiêu diệt quái vật và thu hồi chìa khóa tọa độ!</p>
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
 const vw=vp.clientWidth||800, vh=vp.clientHeight||470;
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
 // Thêm Thủ lĩnh của Đợt
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

 return `<div class="cd-game">
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
      <strong id="cdHudGold">${me.gold??100} Vàng</strong>
     </div>
    </div>
    <div class="cd-stat">
     <span class="cd-stat-icon">🛡️</span>
     <div>
      <small>KHIÊN BẢO VỆ</small>
      <strong>${'🛡️'.repeat(me.health)||'0'} (${me.health}/3)</strong>
     </div>
    </div>
   </div>
  </div>

  <div class="cd-layout">
   <div class="cd-main-col">
    <div class="cd-battlefield" id="cdBattlefield">
     <div class="cd-sky-decor">⚔️ CHIẾN TRƯỜNG: ${esc(cfg.castleName.toUpperCase())} · ${esc(q.label)}</div>
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
      <div class="cd-castle-art">🏰</div>
      <span class="cd-castle-tag">${esc(me.name)}</span>
     </div>

     <div class="cd-hero" style="top:43%"><div class="cd-hero-sprite">🏹</div><span class="cd-hero-label">Cung Thủ Ox</span></div>
     <div class="cd-hero" style="top:64%"><div class="cd-hero-sprite">🧙‍♂️</div><span class="cd-hero-label">Pháp Sư Oy</span></div>
     <div class="cd-hero" style="top:85%"><div class="cd-hero-sprite">🛡️</div><span class="cd-hero-label">Hiệp Sĩ Oz</span></div>

     <div id="cdDynamicLayer"></div>
    </div>

    <div class="cd-question-dock">
     <div class="cd-q-header">
      <span class="cd-q-badge">🎯 NHIỆM VỤ PHÁO KÍCH ĐỢT ${m.round+1}/${m.totalRounds}: ${esc(q.label)}</span>
      <span class="cd-q-reward">🎁 Giải đúng: +120 Vàng · 💥 Pháo Kích Diệt Đợt Quái!</span>
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
      <input type="text" id="cdShortInput" placeholder="✍️ Hoặc nhập trực tiếp đáp án số rồi bấm Khai Hỏa..." />
      ${btn('💥 KHAI HỎA','submitShortCastle','gold sm')}
      ${btn('💡 NOVA gợi ý','hint','gray sm')}
     </div>
    </div>
   </div>

   <aside class="cd-upgrade-panel">
    <div>
     <div class="cd-up-title">🛠️ NÂNG CẤP ĐỘI QUÂN (VÀNG)</div>
     <p style="font-size:11.5px;color:#d6bfa0;margin-bottom:10px">Giải đúng câu hỏi Toán Oxyz để nhận <b>+120 Vàng</b> và nâng cấp sức mạnh cho 3 Anh Hùng!</p>
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
     <div style="margin-top:4px;color:#e7cfa1">• Bấm 4 nút Kỹ năng ở góc trên phải chiến trường (Mưa Tên, Băng Giá, Hồi Máu, Khiên Thành) để hỗ trợ Anh Hùng!<br/>• Trả lời đúng câu hỏi Toán sẽ gọi Pháo Kích quét sạch đợt quái ngay lập tức!</div>
    </div>
   </aside>
  </div>
 </div>`;
}

function stageContent(m){
 const mode=activePlayMode||m.defaultMode||(m.id===2||m.id===5?'defense':'hunt');
 const roles=m.teamRoles||[];
 return `<div class="question-card">
  <header class="quest-top">
   <div class="flex-between">
    <span class="tag">${m.icon} CHẶNG ${m.id} / 05 · ${esc(m.tag)}</span>
    <span class="pill gold">Lượt ${m.round+1} / ${m.totalRounds} · Mảnh mật mã chặng: ?</span>
   </div>
   <h2>${esc(m.title)} – ${esc(m.place)}</h2>
   <p>${esc(m.story)}</p>
  </header>
  <div class="mode-bar">
   <div class="mode-bar-left">
    <span class="mode-bar-title">🎮 CHẾ ĐỘ GAME TƯƠNG TÁC NHÓM:</span>
    <div class="mode-switcher">
     <button type="button" class="mode-btn ${mode==='hunt'?'active':''}" data-action="setMode" data-mode="hunt">🗺️ Săn Kho Báu 2D (Map)</button>
     <button type="button" class="mode-btn ${mode==='defense'?'active':''}" data-action="setMode" data-mode="defense">🏰 Bảo Vệ Thành Trì (Real-time)</button>
    </div>
   </div>
   <span style="font-size:12px;color:#bae6fd;font-weight:800">🪙 Vàng đội: <b id="topGoldBadge">${world.me.gold??100}</b> · 🛡️ Khiên: <b>${world.me.health}/3</b></span>
  </div>
  ${roles.length?`<div class="role-strip">${roles.map((r,idx)=>`<div class="role-chip ${idx===m.round?'active-role':''}">${esc(r)}</div>`).join('')}</div>`:''}
  ${mode==='hunt'?renderHuntGame(m):renderCastleDefenseGame(m)}
 </div>`;
}

function finalContent(){
 const words=Object.entries(world.cipherWords||{});
 return `<div class="final-wrap"><div class="panel"><div class="section-title"><h2>🔐 MỞ RƯƠNG LÕI TRÍ TUỆ OXYZ</h2><span class="pill gold">TRẠM CUỐI</span></div><p>Chúc mừng! Cả đội đã chinh phục đủ 5 chặng. Hãy đọc 5 chữ số mật mã theo thứ tự Chặng 1 → 5, nhập mật mã mở kho báu và chọn thông điệp chiến thắng!</p>${inv(world.me.digits)}<div class="form-field"><label>Nhập mật mã 5 chữ số (theo thứ tự Chặng 1 → 5)</label><input id="finalCode" type="text" class="mono" placeholder="? ? ? ? ?" inputmode="numeric" maxlength="5" autocomplete="off" /></div><h3 style="margin:18px 0 8px">Bảng giải mã từ ngữ</h3><div class="words">${words.map(([k,v])=>`<span class="word-chip">Số ${esc(k)} = ${esc(v)}</span>`).join('')}</div><h3 style="margin:18px 0 8px">Chọn thông điệp nhận được</h3>${world.messageOptions.map((msg,i)=>`<label class="final-option"><input type="radio" name="message" value="${i}" ${i===0?'checked':''}/> ${labels[i]}. ${esc(msg)}</label>`).join('')}${btn('🔓 MỞ RƯƠNG KHO BÁU TRI THỨC','final','gold block')}</div></div>`;
}

function studentScreen(){
 const me=world.me,rank=[...world.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
 const demoStageBar=window.IS_DEMO_MODE?`<div class="demo-banner" style="margin:10px 0;padding:10px 14px"><strong>⚡ Chuyển nhanh Chặng (Bản Demo):</strong> ${[0,1,2,3,4].map(idx=>`<button type="button" class="button sm ${me.stage===idx?'primary':'gray'}" data-action="demoJumpStage" data-stage="${idx}">Chặng ${idx+1}</button>`).join('')} <button type="button" class="button sm gold" data-action="demoJumpStage" data-stage="5">🔐 Trạm Giải Mã</button> ${btn('👩‍🏫 Sang Màn Hình GV','demoTeacher','sm teal')}</div>`:'';
 return `<div class="mission-hero"><div class="avatar">${me.avatar}</div><div><div class="eyebrow" style="color:#f7ce71">BIỆT ĐỘI ${esc(me.name).toUpperCase()} • PHÒNG ${world.room}</div><h2>${me.completed?'KHO BÁU ĐÃ ĐƯỢC MỞ!':me.stage===5?'ĐÃ THU ĐỦ 5 MẢNH MẬT MÃ!':'HÀNH TRÌNH GIẢI CỨU THÀNH PHỐ OXYZ'}</h2><p>${me.completed?'Hãy theo dõi bảng xếp hạng và phần vinh danh của giáo viên.':me.stage===5?'Hãy ghép 5 chữ số mật mã để mở Rương Lõi Trí Tuệ!':'Cả nhóm hãy phối hợp giải Toán trên Bản đồ Săn Kho Báu 2D hoặc Chiến trường Bảo Vệ Thành Trì!'}</p></div></div>
 ${demoStageBar}
 <div class="panel" style="padding:14px 18px"><div class="flex-between"><h3>🗺️ Tiến trình 5 Chặng của Đội ${esc(me.name)}</h3><span class="pill ${me.stage===5?'green':'gold'}"> Đã vượt ${me.stage}/5 chặng</span></div>${mapTrack(me.stage)}</div>
 ${world.paused?'<div class="notice error" style="margin:14px 0"><b>⏸ Giáo viên đang tạm dừng trò chơi để hướng dẫn.</b> Cả nhóm hãy lắng nghe nhé!</div>':''}
 <div class="mission-wrapper"><div>${me.completed?`<div class="panel champion"><span class="star">🏆</span><h2>ĐỘI ${esc(me.name).toUpperCase()} ĐÃ CHIẾN THẮNG!</h2><p style="margin-top:9px;font-size:19px;font-weight:850;color:#8e5b18">“TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU”</p><div class="top-numbers" style="justify-content:center"><div class="metric"><b>${me.score} XP</b><small>TỔNG ĐIỂM ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>THỨ HẠNG HIỆN TẠI</small></div></div></div>`:me.stage>=5?finalContent():stageContent(world.current)}</div>
 <aside class="team-sidebar"><div class="panel"><h3>🎒 Túi Mật Mã (5 Chặng)</h3><p class="muted" style="font-size:12px;margin-top:4px">Thu thập đủ 5 chữ số từ 5 chặng để mở Rương Kho Báu.</p>${inv(me.digits)}<div class="top-numbers" id="studentSidebarMetrics"><div class="metric"><b>${me.score}</b><small>XP CỦA ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>HẠNG TẠM THỜI</small></div></div></div><div class="panel"><h3>🏅 Bảng xếp hạng lớp</h3><div style="margin-top:10px" id="studentSidebarRanks">${standings(world.teams,true)}</div></div><div class="panel"><h3>🧑‍🤝‍🧑 Phối hợp nhóm</h3><p style="font-size:12.5px;margin-top:6px">• <b>Chế độ Săn Kho Báu 2D:</b> Điều khiển nhân vật tới từng Trạm I, II, III để mở cuộn giấy giải toán.<br/>• <b>Chế độ Bảo Vệ Thành Trì:</b> Giải toán nhận Vàng, nâng cấp 3 Anh Hùng và bấm 4 Kỹ năng diệt quái!</p></div></aside></div>`;
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
 el.innerHTML=`<div class="modal" role="dialog" aria-modal="true"><div class="modal-icon">${good?'🎉':'🧩'}</div><h2 class="${good?'success':'failure'}">${esc(modal.title)}</h2><p>${esc(modal.message)}</p>${modal.explain?`<p class="notice good">${esc(modal.explain)}</p>`:''}${modal.digit!==undefined&&modal.digit!==null?`<div class="reward">🔑 MẢNH MẬT MÃ CHẶNG: ${esc(modal.digit)}</div>`:''}${modal.points?`<div class="reward">⭐ +${modal.points} XP</div>`:''}${modal.goldEarned?`<div class="reward">🪙 +${modal.goldEarned} Vàng</div>`:''}${btn(modal.button||'Tiếp tục hành trình','closeModal',good?'teal block':'primary block')}</div>`;
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
    // Chỉ cập nhật bảng xếp hạng bên cạnh để không làm gián đoạn bản đồ 2D hoặc chiến trường Thủ Thành
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
  // Nếu đang ở chế độ Bảo Vệ Thành Trì: kích hoạt Pháo Kích Tọa Độ diệt toàn bộ quái trên màn hình!
  if(curMode==='defense'){
   cdState.enemies.forEach(en=>{
    cdState.effects.push({id:++cdState.seq,x:en.x,lane:en.lane,text:'💥 PHÁO KÍCH -999!',cls:'crit',until:performance.now()+900});
   });
   cdState.enemies=[];
  }
  if(result.stageFinished){
   huntState.battleOpen=false;
   huntState.monsterDefeated=false;
   huntState.rewardBadge=null;
   activePlayMode=null; // Để chặng mới tự chọn defaultMode của chặng đó
   notice('🏆 CHINH PHỤC CHẶNG THÀNH CÔNG!',`Đội đã thu hồi vật phẩm "${result.item}"! Quy tắc mật mã: ${result.digitRule}`,true,
    {explain:result.explain,digit:result.digit,points:result.points,goldEarned:result.goldEarned,button:result.nextStage===5?'Tiến tới Mở Rương Lõi Trí Tuệ →':'Bước sang Chặng tiếp theo →'});
   updateAfterAction();
  }else if(curMode==='hunt'&&huntState.battleOpen){
   // Hiện hiệu ứng nổ Quái vật & bay Mảnh Chìa Khóa ngay trong Battle Modal giống hunt-preview
   huntState.monsterDefeated=true;
   huntState.rewardBadge=result.keyBadge||`Lượt ${result.nextRound}`;
   huntState.rewardExplain=result.explain;
   render();
  }else{
   notice('💥 PHÁO KÍCH CHÍNH XÁC!',`Đợt quái vật thứ ${world.me.round+1} đã bị tiêu diệt hoàn toàn! Đội nhận thêm +${result.goldEarned||120} Vàng.`,true,
    {explain:result.explain,goldEarned:result.goldEarned||120,button:`Tiếp tục Đợt ${result.nextRound+1}/3 →`});
   updateAfterAction();
  }
 }else{
  sound(false);
  const x=result.health===0?'Đội đã cạn khiên nhưng NOVA đã sạc lại năng lượng để đội thử tiếp! ':'';
  notice('🛡️ CHƯA CHÍNH XÁC – HÃY TÍNH LẠI!',x+'Gợi ý từ NOVA: '+result.hint,false,{button:'↺ Thử lại ngay'});
  updateAfterAction();
 }
}

async function handle(action,el){
 try{
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
   // Tự động hướng nhân vật về phía trạm tiếp theo
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
    for(let i=0;i<9;i++){
     cdState.projectiles.push({id:++cdState.seq,lane:i%3,x:18+(i*6),speed:55,dmg:45,icon:'🏹'});
    }
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'🌧️ MƯA TÊN VECTƠ!',cls:'crit',until:now+900});
   }else if(sk==='iceVolley'){
    cdState.skillCd.iceVolley=now+14000;
    cdState.slowUntil=now+6000;
    cdState.effects.push({id:++cdState.seq,x:55,lane:1,text:'❄️ ĐÓNG BĂNG QUÁI 6 GIÂY!',cls:'crit',until:now+950});
   }else if(sk==='groupHeal'){
    cdState.skillCd.groupHeal=now+15000;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+90);
    cdState.effects.push({id:++cdState.seq,x:20,lane:1,text:'💚 +90 HP THÀNH TRÌ!',cls:'crit',until:now+950});
   }else if(sk==='castleShield'){
    cdState.skillCd.castleShield=now+16000;
    cdState.shieldUntil=now+7000;
    cdState.effects.push({id:++cdState.seq,x:18,lane:1,text:'🛡️ BẬT KHIÊN BẤT TỬ 7 GIÂY!',cls:'crit',until:now+950});
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
 // Click trực tiếp lên bản đồ Săn Kho Báu để di chuyển nhân vật
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

   // Kiểm tra nếu nhân vật vừa chạm vào Trạm đang mở -> tự động bật Cuộn Giấy Chiến Đấu
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
   // Hồi máu Thành Trì định kỳ
   if(now-cdState.lastRegenAt>1000){
    cdState.lastRegenAt=now;
    cdState.castleHp=Math.min(cdState.castleMaxHp,cdState.castleHp+(up.regen||1)*2);
   }
   // Sinh thêm quái vật nếu chiến trường vắng
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
   // Di chuyển Quái vật
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
      en.x=78; // Boss lùi lại tiếp tục áp sát cho tới khi học sinh giải đúng toán
     }else{
      cdState.enemies.splice(i,1);
     }
    }
   }
   // 3 Anh Hùng tự động bắn đạn trên 3 làn
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
   // Di chuyển Đạn & Tính va chạm
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
       target.hp=Math.round(target.maxHp*0.35); // Boss chỉ bị tiêu diệt hoàn toàn khi học sinh giải đúng câu hỏi Toán!
       cdState.effects.push({id:++cdState.seq,x:target.x,lane:target.lane,text:'🎯 GIẢI TOÁN ĐỂ KẾT LIỄU BOSS!',cls:'crit',until:now+900});
      }else{
       cdState.enemies.splice(hitIdx,1);
       world.me.gold=(world.me.gold||100)+5;
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
 const laneTops=[43,64,85];
 const slowed=cdState.slowUntil>now;
 const shieldEl=$('#cdCastleShield');
 if(shieldEl)shieldEl.style.display=cdState.shieldUntil>now?'block':'none';
 const hpEl=$('#cdHudHp'), hpBar=$('#cdHudHpBar'), goldEl=$('#cdHudGold'), topGold=$('#topGoldBadge');
 if(hpEl)hpEl.textContent=`${Math.round(cdState.castleHp)} / ${cdState.castleMaxHp}`;
 if(hpBar)hpBar.style.width=`${Math.max(0,Math.min(100,Math.round(cdState.castleHp/cdState.castleMaxHp*100)))}%`;
 if(goldEl&&world?.me)goldEl.textContent=`${world.me.gold??100} Vàng`;
 if(topGold&&world?.me)topGold.textContent=world.me.gold??100;

 const enemiesHtml=cdState.enemies.map(en=>`<div class="cd-enemy ${en.isBoss?'is-boss':''} ${slowed?'is-slowed':''}" style="left:${en.x.toFixed(1)}%;top:${laneTops[en.lane]}%">
  <div class="cd-enemy-hp"><i style="width:${Math.max(0,Math.round(en.hp/en.maxHp*100))}%"></i></div>
  <div class="cd-enemy-sprite">${en.sprite}</div>
 </div>`).join('');

 const projHtml=cdState.projectiles.map(p=>`<div class="cd-proj" style="left:${p.x.toFixed(1)}%;top:${laneTops[p.lane]}%">${p.icon}</div>`).join('');
 const fxHtml=cdState.effects.map(fx=>`<div class="cd-fx ${fx.cls||''}" style="left:${fx.x.toFixed(1)}%;top:${laneTops[fx.lane]-6}%">${esc(fx.text)}</div>`).join('');
 layer.innerHTML=enemiesHtml+projHtml+fxHtml;
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
 const columns=['Thứ hạng','Tên đội','Nhân vật','Số trạm qua','Lượt trong trạm','Số câu sai','Số khiên còn','Vàng tích lũy','Cấp Anh Hùng','Điểm nhiệm vụ','Điểm hợp tác','Tổng XP','Đã giải mã','Thời điểm hoàn thành'];
 const ordered=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const rows=ordered.map((t,i)=>[i+1,t.name,t.avatar,t.stage,t.round,t.wrong,t.health,t.gold??100,t.heroLevel??1,t.score-t.bonus,t.bonus,t.score,t.completed?'Có':'Chưa',t.finishedAt?new Date(t.finishedAt).toLocaleString('vi-VN'):'']);
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
