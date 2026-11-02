/* MATHVERSE OXYZ — client không dùng thư viện ngoài */
'use strict';
const $=sel=>document.querySelector(sel);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const app=$('#app');
const qs=new URLSearchParams(location.search);
let session=null, world=null, modal=null, busy=false, showAward=false, soundEnabled=true, showAnswers=false;
let lastSignature='', clockBase=null, tickBase=0;
const missionMeta=[['🏰','Cổng Vectơ'],['🌉','Cầu Vuông Góc'],['🗼','Tháp Tinh Thể'],['🌀','Mê Cung'],['💎','Pháo Đài']];
const labels=['A','B','C','D'];
const initialRoom=(qs.get('room')||'').trim().toUpperCase();
const initialTeam=qs.get('team')||'';
const initialView=qs.get('view')||'';
function cacheKey(role,room,id=''){return 'mathverse_oyxz_'+role+'_'+room+(id?'_'+id:'');}
function saveSession(d){session=d;localStorage.setItem(cacheKey(d.role,d.room,d.teamId),d.token);const par=new URLSearchParams({room:d.room,...(d.role==='teacher'?{view:'teacher'}:{team:d.teamId})});history.replaceState({},'',location.pathname+'?'+par.toString());}
function restoreSession(){
 if(!initialRoom)return null;
 if(initialView==='teacher'){const token=localStorage.getItem(cacheKey('teacher',initialRoom));if(token)return{role:'teacher',room:initialRoom,token};}
 if(initialTeam){const token=localStorage.getItem(cacheKey('student',initialRoom,initialTeam));if(token)return{role:'student',room:initialRoom,teamId:initialTeam,token};}
 return null;
}
async function api(route,payload){let r;try{r=await fetch(route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload||{})});}catch(e){throw new Error('Không kết nối được máy giáo viên. Hãy kiểm tra Wi-Fi hoặc máy chủ.');}let d=await r.json();if(!r.ok)throw new Error(d.error||'Đã xảy ra lỗi.');return d;}
function btn(text,action,cls='primary',attr=''){return `<button type="button" class="button ${cls}" data-action="${action}" ${attr}>${esc(text)}</button>`;}
function layout(content){return `<nav class="navbar"><div class="brand"><span class="brand-mark">✦</span><span>MATHVERSE <span style="color:#15b9b8">OXYZ</span></span></div><div class="pills"><span class="pill">📐 TOÁN 12</span><span class="pill gold">🎮 PHIÊU LƯU HỘI NHÓM</span>${session?`<button class="button sm gray" data-action="home">⌂ Đổi màn hình</button>`:''}</div></nav>${content}<div class="footer">MathVerse – Giải cứu Thành phố Tri Thức • Game ôn tập Vectơ và hệ trục Oxyz • Dữ liệu chỉ lưu trên máy chủ của lớp</div>`;}
function startScreen(msg=''){
 const fRoom=esc(initialRoom),fTeam=esc(initialTeam);
 app.innerHTML=layout(`<header class="hero"><div class="eyebrow">HÀNH TRÌNH GIẢI MẬT THƯ • TOÁN LỚP 12</div><h1>MATHVERSE<br/>GIẢI CỨU THÀNH PHỐ TRI THỨC</h1><p class="subtitle">5 MINI-GAME KHÁC NHAU • săn kho báu • thủ thành • rèn pha lê • mê cung • đánh boss. Tối đa 8 đội, mỗi đội một nhân vật.</p><div class="hero-character">🧭</div></header>
 <div class="tabs"><button class="active" data-action="switch-tab" data-tab="teacher">👩‍🏫 Tạo phòng – Giáo viên</button><button data-action="switch-tab" data-tab="student">🧑‍🚀 Vào đội – Học sinh</button></div>
 ${msg?`<div class="notice error">${esc(msg)}</div>`:''}
 <section class="setup grid grid-2" id="entry"><div class="panel" data-tabbox="teacher"><div class="section-title"><h2>🎓 Phòng điều khiển</h2></div><p>Giáo viên tạo mã phòng, phát mã đội, chiếu bản đồ và theo dõi học sinh theo thời gian thực.</p><div class="form-field"><label>Số đội tham gia</label><select id="teamCount"><option value="4">4 đội</option><option value="5">5 đội</option><option value="6" selected>6 đội</option><option value="7">7 đội</option><option value="8">8 đội</option></select></div>${btn('✨ TẠO PHÒNG MATHVERSE','create','primary block')}<p class="muted" style="margin-top:13px;font-size:12px">Khuyến nghị 4–6 học sinh/đội. Giáo viên giữ bí mật mã quản trị.</p></div>
 <div class="panel" data-tabbox="student"><div class="section-title"><h2>🚀 Đăng nhập đội</h2></div><p>Nhận mã phòng và mã đội từ giáo viên. Đội trưởng nộp đáp án sau khi cả nhóm thống nhất.</p><div class="form-field"><label>Mã phòng 6 chữ số</label><input id="roomInput" type="text" inputmode="numeric" maxlength="6" class="mono" value="${fRoom}" placeholder="VD: 123456" /></div><div class="form-field"><label>Đội thám hiểm</label><select id="teamSelect">${Array.from({length:8},(_,i)=>`<option value="doi-${i+1}" ${fTeam===`doi-${i+1}`?'selected':''}>Đội ${i+1}</option>`).join('')}</select></div><div class="form-field"><label>Mã đội 4 chữ số</label><input id="teamCode" type="password" inputmode="numeric" maxlength="4" placeholder="Mã đội của em" /></div>${btn('🗝️ VÀO HÀNH TRÌNH','join','teal block')}</div></section>
 <div class="panel" style="margin-top:20px"><h3>📜 Tín hiệu từ NOVA</h3><p style="margin-top:9px">“Bóng Đen Lãng Quên đã đánh cắp Lõi Trí Tuệ. Năm mảnh mật mã bị giấu ở Cổng Vectơ, Cầu Vuông Góc, Tháp Tinh Thể, Mê Cung Trung Điểm và Pháo Đài Cuối. Hãy hợp tác để thu hồi năm chữ số, giải mật thư và giải cứu thế giới Oxyz!”</p></div>`);
 if(fRoom){const teacherPane=$('[data-tabbox="teacher"]'),studentPane=$('[data-tabbox="student"]');studentPane?.scrollIntoView({behavior:'smooth',block:'nearest'});}
}
function mapTrack(stage){return `<div class="stage-track">${missionMeta.map((a,i)=>`<div class="station ${i<stage?'done':i===stage?'current':''}"><div class="emoji">${i<stage?'✅':a[0]}</div><span>${esc(a[1])}</span></div>`).join('')}</div>`;}
function teacherMap(teams){return `<div class="big-map"><div class="screen-tag">🗺️ BẢN ĐỒ DI CHUYỂN CỦA CÁC ĐỘI</div>${mapTrack(-1)}${teams.map(t=>`<div class="map-lane"><div class="map-name"><span class="team-avatar">${t.avatar}</span><span>${esc(t.name)}</span></div><div class="track"><div class="filled" style="width:${Math.max(1,t.stage/5*100)}%"></div><div class="ticks">${[0,1,2,3,4,5].map(()=>'<i></i>').join('')}</div><span class="pawn" style="--pos:calc(5% + ${t.stage} * 18%)">${t.avatar}</span></div><div class="lane-score">${t.score} XP<br/><small>${t.stage<5?`Lượt ${t.round+1}/3 · 🛡️${t.health}`:"Mở mã"}</small></div></div>`).join('')}</div>`;}
function standings(teams,compact=false){const list=[...teams].sort((a,b)=>b.score-a.score||(b.stage-a.stage)||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));if(compact)return list.map((t,i)=>`<div class="mini-rank"><span>${i===0?'🥇':i===1?'🥈':i===2?'🥉':'🏅'} ${t.avatar} ${esc(t.name)}</span><strong>${t.score} XP</strong></div>`).join('');return `<table class="result-table"><thead><tr><th>Hạng</th><th>Đội</th><th>Chặng</th><th>Điểm</th><th>Thành tích</th></tr></thead><tbody>${list.map((t,i)=>`<tr><td>${i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1}</td><td>${t.avatar} <strong>${esc(t.name)}</strong></td><td><div class="mini-progress"><span style="width:${t.stage/5*100}%"></span></div><small>${t.stage}/5 • ${t.stage<5?`lượt ${t.round+1}/3`:"đủ mảnh"}</small></td><td><strong>${t.score} XP</strong></td><td>${t.completed?'<span class="pill green">🏆 Mở kho báu</span>':t.stage===5?'<span class="pill gold">🔐 Giải mật mã</span>':'Đang khám phá'}</td></tr>`).join('')}</tbody></table>`;}
function teacherScreen(){const teams=world.teams,done=teams.filter(t=>t.completed).length;
 const joinBase=world.joinBaseURL||location.origin;const baseUrl=joinBase+location.pathname;
 const winners=[...teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const helper=[...teams].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="dashboard-head"><div><span class="screen-tag">👩‍🏫 MÀN HÌNH ĐIỀU HÀNH GIÁO VIÊN</span><h2>Mật lệnh phòng <span class="room-number">${esc(world.room)}</span></h2><p class="muted">Mỗi đội có mã riêng. Nhân vật tự di chuyển khi đội thắng đủ 3 lượt của mỗi mini-game. Giáo viên quan sát các lượt chơi và mức khiên từng đội.</p></div><div class="panel" style="text-align:center;padding:15px 20px"><span class="screen-tag">ĐỒNG HỒ TIẾT HỌC</span><div class="clock" id="clock">45:00</div><div class="controls">${btn(world.clock.running?'⏸ Dừng giờ':'▶ Bắt đầu','timerToggle','sm teal')}${btn('↻','timerReset','sm gray')}<select id="clockMinutes" aria-label="Thời lượng tiết học"><option value="35" ${world.clock.minutes===35?'selected':''}>35 phút</option><option value="40" ${world.clock.minutes===40?'selected':''}>40 phút</option><option value="45" ${world.clock.minutes===45?'selected':''}>45 phút</option><option value="50" ${world.clock.minutes===50?'selected':''}>50 phút</option></select></div></div></div>
 <div class="top-numbers"><div class="metric"><b>${teams.length}</b><small>ĐỘI THÁM HIỂM</small></div><div class="metric"><b>${done}</b><small>ĐÃ MỞ KHO BÁU</small></div><div class="metric"><b>${teams.filter(t=>t.stage>=5).length}</b><small>ĐỦ 5 MẢNH MÃ</small></div><div class="metric"><b>${teams.reduce((a,t)=>a+t.score,0)}</b><small>XP TOÀN LỚP</small></div></div>
 <div class="controls" style="margin-bottom:16px">${btn(world.paused?'▶ Tiếp tục game':'⏸ Tạm dừng nhiệm vụ','pauseGame',world.paused?'teal':'gold')}${btn('🏆 Công bố giải thưởng','awards','primary')}${btn('📥 Xuất CSV','exportCSV','gray')}${btn('🖨️ In bảng kết quả','print','gray')}<span class="pill ${world.paused?'pink':'green'}">${world.paused?'🔒 Nhiệm vụ đang khóa':'🟢 Nhiệm vụ đang mở'}</span></div>
 <div class="teacher-main"><div><section class="panel"><div class="section-title"><h2>🗺️ Hành trình trực tiếp qua 5 mini-game</h2><span class="pill">Tự cập nhật ~2 giây</span></div>${teacherMap(teams)}</section><section class="panel"><div class="section-title"><h2>🏅 Bảng xếp hạng</h2><small>Tính theo điểm, sau đó thời điểm hoàn thành</small></div>${standings(teams)}</section><section class="panel"><h2>🎊 Kết quả và trao thưởng</h2>${showAward?`<div class="champion" style="margin-top:17px"><span class="star">🏆</span><strong>NHÀ VÔ ĐỊCH MATHVERSE: ${winners[0].avatar} ${esc(winners[0].name)}</strong><p>${winners[0].score} XP · ${winners[0].completed?'Đã giải mật thư':'Chưa mở kho báu'}</p></div><div class="grid grid-2" style="margin-top:13px"><div class="notice good">🥈 Á quân: ${winners[1]?esc(winners[1].name):'—'}</div><div class="notice good">🥉 Giải ba: ${winners[2]?esc(winners[2].name):'—'}</div><div class="notice">🤝 Giải hợp tác: ${helper&&helper.bonus>0?esc(helper.name):'GV lựa chọn'}</div><div class="notice">🔐 Giải mã: ${teams.filter(t=>t.completed).length} đội hoàn thành</div></div>`:`<p class="muted" style="margin:10px 0">Khi học sinh hoàn thành, nhấn “Công bố giải thưởng” để hiện nhà vô địch, á quân và giải hợp tác.</p><div class="notice">Lưu ý: nếu điểm bằng nhau, ưu tiên đội hoàn thành sớm hơn.</div>`}</section></div>
 <aside><section class="panel"><div class="section-title"><h3>🔑 Mã tham gia của từng đội</h3><span class="teacher-only">CHỈ GV XEM</span></div><div class="notice" style="margin-bottom:14px">Học sinh cùng Wi-Fi mở <strong>${esc(joinBase)}</strong>, nhập mã phòng <strong>${esc(world.room)}</strong>, chọn đội và mã đội.</div>${teams.map(t=>`<div class="team-join"><div class="team-emoji">${t.avatar}</div><div class="team-details"><b>${esc(t.name)}</b><small>Đội ${t.id.split('-')[1]} · <span class="code">${esc(world.teamCodes[t.id])}</span></small></div><button class="button sm gray" data-action="copy" data-url="${esc(baseUrl+'?room='+world.room+'&team='+t.id)}" title="Sao chép liên kết đội">⧉</button></div>`).join('')}<p class="muted" style="font-size:12px;margin-top:14px">Không gửi ảnh màn hình giáo viên cho học sinh vì có chứa mã của tất cả đội.</p></section>
 <section class="panel"><h3>✨ Điểm hợp tác (0–10 XP)</h3><p class="muted" style="font-size:12px;margin:6px 0 12px">Chọn đội và số điểm thưởng thêm cho cách phối hợp. Điểm được thay thế, không cộng lặp.</p><div class="form-field"><label>Đội</label><select id="bonusTeam">${teams.map(t=>`<option value="${t.id}">${t.avatar} ${esc(t.name)} (hiện +${t.bonus})</option>`).join('')}</select></div><div class="form-field"><label>Điểm cộng</label><select id="bonusValue">${Array.from({length:11},(_,n)=>`<option value="${n}">${n} XP</option>`).join('')}</select></div>${btn('Lưu điểm hợp tác','setBonus','sm primary block')}</section>
 <section class="panel"><h3>📡 Nhật ký nhiệm vụ</h3><div class="events" style="margin-top:10px">${world.lastEvent.length?world.lastEvent.map(e=>`<div class="event"><time>${new Date(e.at).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}</time><span>${esc(e.text)}</span></div>`).join(''):'Chưa có hoạt động nào.'}</div></section>
 <section class="panel"><div class="section-title"><h3>📚 Đáp án giáo viên</h3><span class="teacher-only">ẨN KHỎI HS</span></div>${world.missions.map(m=>`<details class="teacher-answer"><summary>${m.icon} Chặng ${m.id}: ${esc(m.title)} · ${m.challenges.length} lượt</summary>${m.challenges.map((q,i)=>`<div class="answer-round"><p><b>Lượt ${i+1}: ${esc(q.prompt)}</b></p><p class="correct">Đáp án ${esc(q.answer)} – ${esc(q.options[q.correct])}</p><p>${esc(q.explain)}</p><p><em>Gợi ý: ${esc(q.hints[0])}</em></p></div>`).join('')}<p class="notice good">Mảnh mã: <b>${m.digit}</b> · ${esc(m.digitRule)}</p></details>`).join('')}<p class="notice good">Mã cuối: <b>30524</b> · Thông điệp: <b>TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU</b></p></section>
 <section class="panel"><h3>🧹 Hỗ trợ nếu đội gặp lỗi</h3><p class="muted" style="font-size:12px;margin:8px 0">Chỉ sử dụng khi cần khôi phục đội chơi. Việc đặt lại đội sẽ xóa điểm và tiến độ của đội đó.</p><div class="form-field"><select id="resetTeam">${teams.map(t=>`<option value="${t.id}">${t.avatar} ${esc(t.name)}</option>`).join('')}</select></div>${btn('↺ Đặt lại đội được chọn','resetTeam','sm red block')}</section>
 </aside></div>`;
}
function inv(digits){const d=Object.fromEntries((digits||[]).map(v=>[v.stage,v.digit]));return `<div class="inventory">${[1,2,3,4,5].map(i=>`<div class="digit ${d[i]===undefined?'empty':''}"><small>${i}</small><strong>${d[i]===undefined?'?':esc(d[i])}</strong></div>`).join('')}</div>`;}
/* Mini-game trực tiếp – mỗi chặng có bối cảnh và thao tác riêng. */
function gameBoard(m){
 const r=m.round, q=m.challenge, c=m.gameType;
 const spots=[1,2,3].map((_,i)=>`<div class="mini-step ${i<r?'cleared':i===r?'playing':'locked'}"><span>${i<r?'✅':i===r?'✨':'🔒'}</span><small>${['I','II','III'][i]}</small></div>`).join('');
 const health=Array.from({length:3},(_,i)=>i<world.me.health?'🛡️':'▫️').join('');
 let intro='', scene='';
 if(c==='hunt'){
   intro='🏝️ TRUY TÌM KHO BÁU · MỞ 3 MỐC TỌA ĐỘ';
   scene=`<div class="scene-hunt"><div class="hunt-sky">☀️ &nbsp; ☁️ &nbsp; 🕊️</div><div class="hunt-islands"><div class="hunt-ship">${world.me.avatar}</div>${[0,1,2].map((_,i)=>`<div class="hunt-spot ${i===r?'active':''} ${i<r?'solved':''}">${i<r?'💎':i===r?'🧰':'❔'}<span>${['Trục X','Trục Y','Trục Z'][i]}</span></div>`).join('')}</div><div class="hunt-wave">🌊 ~ ~ 🌊 ~ ~ 🌊</div></div>`;
 } else if(c==='defense'){
   intro='🏰 PHÒNG THỦ THÀNH TRÌ · 3 ĐỢT QUÁI VẬT';
   scene=`<div class="scene-defense"><div class="castle-tower">🏰<span>THÀNH CỦA ${esc(world.me.name)}</span></div><div class="defense-ray">⚡ ━ ━ ➤</div><div class="creep">${['👾','👹','🤖'][r]||'👾'}<span>ĐỢT ${r+1} / 3</span></div><div class="defense-shields">KHIÊN: ${health}</div></div>`;
 } else if(c==='forge'){
   intro='💎 LÒ RÈN PHA LÊ · GHÉP 3 THÀNH PHẦN';
   scene=`<div class="scene-forge"><div class="forge-arch">🔮<span>LÒ RÈN OXYZ</span></div><div class="forge-sockets">${[0,1,2].map((_,i)=>`<div class="forge-socket ${i<=r?'active':''}">${i<r?'💎':i===r?'✨':'◇'}<small>${['Δx','Δy','AB'][i]}</small></div>`).join('')}</div><div class="forge-fire">🔥 🔥 🔥</div></div>`;
 } else if(c==='maze'){
   intro='🌀 MÊ CUNG KHÔNG GIAN · 3 CỬA THOÁT';
   scene=`<div class="scene-maze"><div class="maze-pattern"></div><div class="maze-avatar">${world.me.avatar}<span>VỊ TRÍ ${r+1}/3</span></div><div class="maze-exit">🚪<span>LỐI THOÁT</span></div><div class="maze-route">→ → →</div></div>`;
 } else {
   intro='🐲 BOSS CUỐI · PHÁ 3 LỚP GIÁP';
   scene=`<div class="scene-boss"><div class="boss-hero">${world.me.avatar}<span>ĐỘI THÁM HIỂM</span></div><div class="boss-magic">✦ ⚡ ➤</div><div class="boss-dragon">🐲<span>BÓNG ĐEN LÃNG QUÊN</span></div><div class="boss-hp"><span>GIÁP BOSS</span><div class="boss-bars">${[0,1,2].map((_,i)=>`<i class="${i<3-r?'full':''}"></i>`).join('')}</div></div></div>`;
 }
 const icons={hunt:['🧰','🗝️','🏺','💰'],defense:['🎯','🏹','🔥','⚔️'],forge:['🔷','💠','💎','✨'],maze:['🚪','🚪','🚪','🚪'],boss:['💥','⚡','☄️','🎯']};
 const choiceTitle={hunt:'MỞ RƯƠNG TỌA ĐỘ',defense:'BẮN HẠ MỤC TIÊU',forge:'CHỌN VIÊN PHA LÊ',maze:'CHỌN CÁNH CỬA',boss:'BẮN ĐẠI BÁC TOÁN HỌC'};
 const choices=q.options.map((v,i)=>`<button class="mini-choice ${c}" data-action="answer" data-choice="${i}" ${world.paused?'disabled':''}><span class="choice-icon">${icons[c][i]}</span><b>${labels[i]}</b><strong>${esc(v)}</strong></button>`).join('');
 return `<div class="mini-game mini-${c}"><div class="mini-game-head"><div><span class="mini-kicker">${intro}</span><h3>${esc(q.label)}</h3></div><div class="mini-round-progress">${spots}</div></div>${scene}<div class="mini-prompt">🧩 ${esc(q.prompt)}</div><div class="mini-choice-title">${choiceTitle[c]}</div><div class="mini-choices">${choices}</div><div class="mini-toolbar">${btn('💡 NOVA gợi ý','hint','gray')}<span>${world.me.attempts[world.me.stage]} lần chưa đúng · 20 XP khi hoàn hảo · 12/8 XP khi cần hỗ trợ</span></div></div>`;
}
function stageContent(m){return `<div class="question-card"><header class="quest-top"><span class="tag">${m.icon} CHẶNG ${m.id} / 05 · ${esc(m.tag)}</span><h2>${esc(m.title)}</h2><p>${esc(m.story)}</p><p style="margin-top:10px;font-size:13px;color:#ffe38c">🤝 NHIỆM VỤ NHÓM: ${esc(m.groupTask||'Các em hãy cùng thống nhất lựa chọn.')}</p></header>${gameBoard(m)}</div>`;}
function finalContent(){const words=Object.entries(world.cipherWords||{});return `<div class="final-wrap"><div class="panel"><div class="section-title"><h2>🔐 MỞ LÕI TRI THỨC</h2><span class="pill gold">BOSS CUỐI</span></div><p>Chúc mừng! Cả đội đã hoàn thành 5 trạm. Hãy sắp xếp năm chữ số theo thứ tự trạm 1 → 5, nhập mã mở kho báu rồi giải thông điệp cuối.</p>${inv(world.me.digits)}<div class="form-field"><label>Nhập mật mã 5 chữ số</label><input id="finalCode" type="text" class="mono" placeholder="? ? ? ? ?" inputmode="numeric" maxlength="5" autocomplete="off" /></div><h3 style="margin:18px 0 8px">Bảng giải mã từ ngữ</h3><div class="words">${words.map(([k,v])=>`<span class="word-chip">${esc(k)} = ${esc(v)}</span>`).join('')}</div><h3 style="margin:19px 0 8px">Chọn thông điệp nhận được</h3>${world.messageOptions.map((msg,i)=>`<label class="final-option"><input type="radio" name="message" value="${i}" /> ${labels[i]}. ${esc(msg)}</label>`).join('')}${btn('🔓 GIẢI MÃ KHO BÁU','final','gold block')}</div></div>`;}
function studentScreen(){const me=world.me,rank=[...world.teams].sort((a,b)=>b.score-a.score),mineRank=rank.findIndex(t=>t.id===me.id)+1;
 return `<div class="mission-hero"><div class="avatar">${me.avatar}</div><div><div class="eyebrow" style="color:#f7ce71">BIỆT ĐỘI ${esc(me.name).toUpperCase()} • PHÒNG ${world.room}</div><h2>${me.completed?'KHO BÁU ĐÃ ĐƯỢC MỞ!':me.stage===5?'BẠN ĐÃ THU ĐỦ MẢNH MẬT MÃ!':'HÀNH TRÌNH GIẢI CỨU OXYZ'}</h2><p>${me.completed?'Hãy theo dõi bảng xếp hạng và phần công bố giải thưởng của giáo viên.':me.stage===5?'NOVA đang chờ đội ghép mã và mở Lõi Tri Thức.':'Bóng Đen Lãng Quên đang chờ ở các trạm phía trước. Cả đội hãy hợp tác để vượt thử thách!'}</p></div></div>
 <div class="panel" style="padding:17px 21px"><div class="flex-between"><h3>🗺️ Bản đồ hành trình của ${esc(me.name)}</h3><span class="pill ${me.stage===5?'green':'gold'}">${me.stage}/5 trạm</span></div>${mapTrack(me.stage)}</div>
 ${world.paused?'<div class="notice error" style="margin:17px 0"><b>⏸ Giáo viên đang tạm dừng game.</b> Hãy chuẩn bị, chờ hiệu lệnh tiếp tục.</div>':''}
 <div class="mission-wrapper"><div>${me.completed?`<div class="panel champion"><span class="star">🏆</span><h2>ĐỘI ${esc(me.name).toUpperCase()} ĐÃ CHIẾN THẮNG!</h2><p style="margin-top:9px;font-size:19px;font-weight:850;color:#8e5b18">“TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU”</p><div class="top-numbers" style="justify-content:center"><div class="metric"><b>${me.score}</b><small>ĐIỂM ĐỘI</small></div><div class="metric"><b>${mineRank}</b><small>THỨ HẠNG HIỆN TẠI</small></div></div></div>`:me.stage>=5?finalContent():stageContent(world.current)}</div>
 <aside class="team-sidebar"><div class="panel"><h3>🎒 Túi mật mã</h3><p class="muted" style="font-size:12px;margin-top:4px">Đọc theo thứ tự 1 → 5 để mở kho báu.</p>${inv(me.digits)}<div class="top-numbers"><div class="metric"><b>${me.score}</b><small>XP CỦA ĐỘI</small></div><div class="metric"><b>#${mineRank}</b><small>HẠNG TẠM THỜI</small></div></div></div><div class="panel"><h3>🏅 Bảng xếp hạng</h3><div style="margin-top:10px">${standings(world.teams,true)}</div></div><div class="panel"><h3>🧑‍🤝‍🧑 Luật hợp tác</h3><p style="font-size:13px;margin-top:8px">Một bạn đọc nhiệm vụ, một bạn tính toán, một bạn kiểm tra, đội trưởng chỉ nộp khi nhóm thống nhất.</p><div class="notice" style="margin-top:11px;font-size:12px">Điểm: đúng lần đầu +20; đúng sau gợi ý/lần sai +12; sai nhiều lần +8; mật thư cuối +20; hợp tác tối đa +10.</div></div></aside></div>`;
}
function render(){if(!session)return startScreen();if(!world){app.innerHTML='<div class="loading">Đang lấy dữ liệu phòng học…</div>';return;}
 app.innerHTML=layout(session.role==='teacher'?teacherScreen():studentScreen());updateClock();$('.award-backdrop')?.remove();if(showAward&&session.role==='teacher'){const aw=document.createElement('div');aw.innerHTML=awardScreen();document.body.appendChild(aw.firstElementChild);}if(modal)showModal();}
function showModal(){if(!modal)return;const old=$('.modal-backdrop');if(old)old.remove();let good=modal.good;const el=document.createElement('div');el.className='modal-backdrop';el.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Thông báo trò chơi"><div class="modal-icon">${good?'🎉':'🧩'}</div><h2 class="${good?'success':'failure'}">${esc(modal.title)}</h2><p>${esc(modal.message)}</p>${modal.explain?`<p class="notice good">${esc(modal.explain)}</p>`:''}${modal.digit!==undefined?`<div class="reward">🔑 MẢNH MÃ: ${esc(modal.digit)}</div>`:''}${modal.points!==undefined?`<div class="reward">⭐ +${modal.points} XP</div>`:''}${btn(modal.button||'Tiếp tục hành trình','closeModal',good?'teal block':'primary block')}</div>`;document.body.appendChild(el);}
function notice(title,message,good=false,extra={}){modal={title,message,good,...extra};showModal();sound(good);}
function sound(good){if(!soundEnabled)return;try{const actx=new(window.AudioContext||window.webkitAudioContext)();let base=good?510:230;[0,.11,.22].forEach((offset,i)=>{const osc=actx.createOscillator(),gain=actx.createGain();osc.type='sine';osc.frequency.value=base+(good?i*180:-i*35);gain.gain.setValueAtTime(.0001,actx.currentTime+offset);gain.gain.exponentialRampToValueAtTime(.08,actx.currentTime+offset+.012);gain.gain.exponentialRampToValueAtTime(.0001,actx.currentTime+offset+.13);osc.connect(gain).connect(actx.destination);osc.start(actx.currentTime+offset);osc.stop(actx.currentTime+offset+.14)});setTimeout(()=>actx.close(),750);}catch(e){/* audio optional */}}
function setClock(){clockBase=world?.clock||null;tickBase=Date.now();updateClock();}
function updateClock(){if(!clockBase)return;const node=$('#clock');if(!node)return;let remaining=clockBase.remainingMs-(clockBase.running?Date.now()-tickBase:0);remaining=Math.max(0,remaining);const sec=Math.floor(remaining/1000);node.textContent=`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;node.classList.toggle('warn',sec<=300);}
async function refresh(force=false){if(!session||busy)return;try{const d=await api('/api/state',{room:session.room,token:session.token});world=d;setClock();let slim={...d,clock:{...d.clock,remainingMs:0}};const sig=JSON.stringify(slim);if(force||sig!==lastSignature){lastSignature=sig;const focused=document.activeElement?.matches('input,select,textarea');if(modal||focused){return;}render();}}catch(e){if(force){session=null;world=null;startScreen(e.message);}/* keep previous view during short disconnection */}}
async function submit(route,payload){if(busy)return;busy=true;try{return await api(route,{room:session.room,token:session.token,...payload});}finally{busy=false;}}
function updateAfterAction(){lastSignature='';setTimeout(()=>refresh(true),200);}
async function handle(action,el){try{
 if(action==='switch-tab'){$('.tabs .active')?.classList.remove('active');el.classList.add('active');$('[data-tabbox="'+el.dataset.tab+'"]')?.scrollIntoView({behavior:'smooth',block:'center'});return;}
 if(action==='create'){el.disabled=true;const count=Number($('#teamCount').value);const r=await api('/api/create',{teamCount:count});saveSession({role:'teacher',room:r.room,token:r.teacherToken});await refresh(true);return;}
 if(action==='join'){el.disabled=true;const room=$('#roomInput').value.trim(),team=$('#teamSelect').value,code=$('#teamCode').value.trim();const r=await api('/api/join',{room,team,code});saveSession({role:'student',room:r.room,teamId:r.team,token:r.token});await refresh(true);return;}
 if(action==='home'){const yes=confirm('Quay về màn hình đăng nhập? Tiến độ trên máy chủ không bị xóa.');if(yes){session=null;world=null;history.replaceState({},'',location.pathname);startScreen();}return;}
 if(action==='answer'){
  if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);
  const result=await submit('/api/answer',{choice:Number(el.dataset.choice),stage:world.me.stage,round:world.me.round});
  if(result.correct){
   if(result.stageFinished){
    notice('🏆 VƯỢT CHẶNG THÀNH CÔNG!',`NOVA trao tặng ${result.item}. ${result.digitRule}`,true,
       {explain:result.explain,digit:result.digit,points:result.points,button:result.nextStage===5?'Tiến tới giải mật thư cuối →':'Khám phá mini-game mới →'});
   }else{
    const gameWords={hunt:'Đã đào được một mảnh kho báu!',defense:'Đã đánh bật một đợt quái vật!',forge:'Một viên pha lê đã được rèn!',maze:'Cánh cửa chính xác đã mở!',boss:'Một lớp giáp Boss đã vỡ!'};
    notice('✨ HOÀN THÀNH MỘT LƯỢT!',gameWords[world.current.gameType]||'Chinh phục thành công!',true,
      {explain:result.explain,button:'Tiếp tục lượt '+(result.nextRound+1)+'/3 →'});
   }
  }else{
   const x=result.health===0?'Đội đã hết khiên, nhưng NOVA cho phép học lại và thử tiếp. ':'';
   notice('🛡️ CHƯA CHÍNH XÁC – THỬ LẠI!',x+'Gợi ý: '+result.hint,false,{button:'↺ Thử lại thử thách'});
  }
  updateAfterAction();return;
 }
 if(action==='hint'){if(world.paused)return notice('Tạm dừng','Giáo viên đang tạm dừng nhiệm vụ.',false);const result=await submit('/api/hint',{stage:world.me.stage,round:world.me.round});notice('💡 GỢI Ý TỪ NOVA',result.hint+' ('+result.cost+')',false,{button:'Quay lại nhiệm vụ'});updateAfterAction();return;}
 if(action==='final'){const code=$('#finalCode').value.trim();const selected=$('input[name="message"]:checked');if(!selected)return notice('Thiếu thông điệp','Hãy chọn một trong ba thông điệp từ mật mã.',false);const r=await submit('/api/final',{code,choice:Number(selected.value)});if(r.correct)notice('GIẢI CỨU THÀNH PHỐ THÀNH CÔNG!','Lõi Trí Tuệ đã được khôi phục. '+r.message,true,{points:r.points,button:'Xem thứ hạng và thành tích →'});else notice('MẬT THƯ CHƯA ĐƯỢC MỞ','NOVA gợi ý: '+r.hint,false,{button:'Thử giải mã lại'});updateAfterAction();return;}
 if(action==='closeModal'){modal=null;$('.modal-backdrop')?.remove();await refresh(true);return;}
 if(action==='pauseGame'){await submit('/api/teacher',{action:'pause'});updateAfterAction();return;}
 if(action==='timerToggle'){await submit('/api/teacher',{action:'timer',value:world.clock.running?'pause':'start'});updateAfterAction();return;}
 if(action==='timerReset'){await submit('/api/teacher',{action:'timer',value:'reset'});updateAfterAction();return;}
 if(action==='setBonus'){const team=$('#bonusTeam').value,value=Number($('#bonusValue').value);await submit('/api/teacher',{action:'bonus',team,value});updateAfterAction();return;}
 if(action==='awards'){showAward=!showAward;render();return;}
 if(action==='print'){window.print();return;}
 if(action==='exportCSV'){exportCSV();return;}
 if(action==='resetTeam'){const team=$('#resetTeam').value;const name=world.teams.find(t=>t.id===team)?.name;if(!confirm('Đặt lại từ đầu toàn bộ nhiệm vụ và điểm của '+name+'?'))return;await submit('/api/teacher',{action:'resetTeam',team});updateAfterAction();return;}
 if(action==='copy'){const url=el.dataset.url;try{await navigator.clipboard.writeText(url);notice('ĐÃ SAO CHÉP LIÊN KẾT',url,true);}catch(e){notice('LIÊN KẾT ĐỘI',url+' — hãy sao chép thủ công địa chỉ này.',true);}return;}
 }catch(e){notice('THÔNG BÁO',e.message||'Có lỗi xảy ra.',false);el.disabled=false;}
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-action]');if(el){e.preventDefault();handle(el.dataset.action,el);}});
document.addEventListener('change',e=>{if(e.target.id==='clockMinutes'&&session?.role==='teacher'){submit('/api/teacher',{action:'timer',value:Number(e.target.value)}).then(updateAfterAction).catch(e=>notice('Lỗi đồng hồ',e.message,false));}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&!session){const t=document.activeElement;if(t?.closest('[data-tabbox="student"]'))$('#entry [data-action="join"]')?.click();}});
session=restoreSession();if(session){refresh(true);}else{startScreen();}
setInterval(()=>{if(session&&!document.hidden)refresh(false)},2500);
setInterval(updateClock,400);

function awardScreen(){
 if(!world||world.role!=='teacher')return '';
 const ts=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const finished=ts.filter(t=>t.completed).length;
 const bestCoop=[...ts].sort((a,b)=>b.bonus-a.bonus)[0];
 return `<div class="award-backdrop"><div class="award-panel">
 <div class="stars">✦ ✧ ★ ✦ ★</div><div class="eyebrow">MATHVERSE OXYZ • LỄ VINH DANH</div>
 <h1>${finished>0?'GIẢI CỨU THÀNH PHỐ THÀNH CÔNG!':'BẢNG XẾP HẠNG TẠM THỜI'}</h1>
 <p>${finished>0?'Lõi Trí Tuệ đã được khôi phục. Xin chúc mừng các chiến binh Toán học!':'Chưa có đội hoàn thành mật thư cuối. Hãy tiếp tục hành trình!'}</p>
 <div class="podium">${ts.slice(0,3).map((t,i)=>`<div class="podium-item ${i===0?'gold-podium':''}">
 <div style="font-size:35px">${i===0?'🥇':i===1?'🥈':'🥉'}</div><div class="podium-avatar">${t.avatar}</div>
 <b>${esc(t.name)}</b><strong>${t.score} XP</strong><small>${t.completed?'🔓 Mở kho báu':'Chặng '+t.stage+'/5'}</small></div>`).join('')}</div>
 <div class="winner-bottom">🤝 Giải hợp tác: <b>${bestCoop.bonus>0?esc(bestCoop.name):'Giáo viên công bố'}</b> · 🔐 Đã giải mã: <b>${finished} đội</b></div>
 <div class="controls" style="justify-content:center">${btn('⬅ Quay về màn hình giáo viên','awards','gray')}${btn('📥 Tải bảng điểm CSV','exportCSV','gold')}</div>
 </div></div>`;
}
function exportCSV(){
 const columns=['Thứ hạng','Tên đội','Nhân vật','Số trạm qua','Lượt trong trạm','Số câu sai','Số khiên còn','Điểm nhiệm vụ và mật thư','Điểm hợp tác','Tổng XP','Đã giải mã','Thời điểm hoàn thành'];
 const ordered=[...world.teams].sort((a,b)=>b.score-a.score||((a.finishedAt||'9999').localeCompare(b.finishedAt||'9999')));
 const rows=ordered.map((t,i)=>[i+1,t.name,t.avatar,t.stage,t.round,t.wrong,t.health,t.score-t.bonus,t.bonus,t.score,t.completed?'Có':'Chưa',t.finishedAt?new Date(t.finishedAt).toLocaleString('vi-VN'):'']);
 const quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
 const csv='\ufeff'+[columns,...rows].map(r=>r.map(quote).join(',')).join('\r\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
 const link=URL.createObjectURL(blob);const a=document.createElement('a');a.href=link;a.download='MATHVERSE_OXYZ_KET_QUA_'+world.room+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(link),1500);
}
