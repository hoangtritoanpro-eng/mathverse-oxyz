/* MATHVERSE OXYZ — lớp học LAN, Node.js >=18; không dùng gói ngoài */
'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const os=require('node:os');
const PORT=Number(process.env.PORT||3000);
const LAN_IP=Object.values(os.networkInterfaces()).flat().find(x=>x&&x.family==='IPv4'&&!x.internal)?.address||'localhost';
const ROOT=__dirname, PUBLIC=path.join(ROOT,'public'), DATA=path.join(ROOT,'data','rooms.json');
const TEAM_POOL=[
 {name:'Rồng Xanh',avatar:'🐉',color:'#36C6E8'},
 {name:'Tia Chớp',avatar:'⚡',color:'#FFC857'},
 {name:'Phượng Hoàng',avatar:'🔥',color:'#FF758F'},
 {name:'Ngôi Sao',avatar:'🌟',color:'#AB8CFF'},
 {name:'Cáo Thông Thái',avatar:'🦊',color:'#FF9B57'},
 {name:'Mặt Trăng',avatar:'🌙',color:'#9DC4FF'},
 {name:'Kỳ Lân',avatar:'🦄',color:'#FF8CE5'},
 {name:'Tên Lửa',avatar:'🚀',color:'#55E0B9'}
];
const {STAGES,TOKEN_WORDS,MESSAGE_OPTIONS}=require('./stages');
let ROOMS={};
try{if(fs.existsSync(DATA)){ROOMS=JSON.parse(fs.readFileSync(DATA,'utf8')); console.log('Đã nạp',Object.keys(ROOMS).length,'phòng học');}}catch(e){console.error('Không thể nạp dữ liệu phòng:',e.message);}
function persist(){fs.mkdirSync(path.dirname(DATA),{recursive:true});const temp=DATA+'.tmp';fs.writeFileSync(temp,JSON.stringify(ROOMS,null,2));fs.renameSync(temp,DATA);}
function rnd(n=24){return crypto.randomBytes(n).toString('hex');}
function seedDefaultRoom(){
 if(ROOMS['123456'])return;
 ROOMS['123456']={
  id:'123456',
  teacherToken:'DEMO_GV',
  createdAt:new Date().toISOString(),
  paused:false,
  clock:{minutes:45,remainingMs:45*60*1000,running:false,startedAt:0},
  teams:TEAM_POOL.slice(0,6).map((t,i)=>({
   ...t,
   id:'doi-'+(i+1),
   code:String(i+1).repeat(4),
   token:'DEMO_DOI_'+(i+1),
   stage:0,round:0,health:3,wrong:0,score:0,bonus:0,
   gold:120,heroLevel:1,upgrades:{damage:1,speed:1,hp:1,regen:1},
   completed:false,finishedAt:null,
   attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[]
  })),
  events:[{at:new Date().toISOString(),text:'NOVA đã mở sẵn phòng 123456 (6 đội, mã PIN 1111 → 6666).'}]
 };
 persist();
}
seedDefaultRoom();
function ensureTeamFields(t){
 if(t.gold===undefined)t.gold=120;
 if(t.heroLevel===undefined)t.heroLevel=1;
 if(t.streak===undefined)t.streak=0;
 if(!t.upgrades)t.upgrades={damage:1,speed:1,hp:1,regen:1};
 return t;
}
function publicStage(s,round,team){
 const isBoss=Boolean(s.bossChallenge&&team&&team.bossReady);
 const q=isBoss?s.bossChallenge:(s.challenges[round]||s.challenges[s.challenges.length-1]);
 return {id:s.id,title:s.title,subtitle:s.subtitle||'',place:s.place,icon:s.icon,tag:s.tag,time:s.time,
  biomeColor:s.biomeColor||'#3b82f6',item:s.item||'',visual3D:s.visual3D||null,
  story:s.story,groupTask:s.groupTask,gameType:s.gameType,defaultMode:s.defaultMode||(s.id===2||s.id===5?'defense':'hunt'),
  teamRoles:s.teamRoles||[],huntMap:s.huntMap||null,defenseConfig:s.defenseConfig||null,
  cipher:s.cipher||null,cipherHint:s.cipherHint||null,cipherLetters:s.cipherLetters||null,
  cipherReady:Boolean(team&&(team.cipherReady||round>=s.challenges.length)),
  bossReady:Boolean(team&&team.bossReady),
  allRounds:s.challenges.map((c,i)=>({index:i,label:c.label,keyBadge:c.keyBadge||`Mảnh ${i+1}`,cipherPiece:c.cipherPiece||null,targetGrid:c.targetGrid||null,monster:c.monster||{icon:'👾',name:'Quái Vật',hp:100}})),
  round:Math.min(round,s.challenges.length),totalRounds:s.challenges.length,isBoss,
  challenge:{label:q.label,prompt:q.prompt,options:q.options,roleAssign:q.roleAssign||'',highlightAxis:q.highlightAxis||'all',monster:q.monster||{icon:'👾',name:'Quái Vật Trạm',hp:120,type:'golem'},keyBadge:q.keyBadge||'',cipherPiece:q.cipherPiece||null,targetGrid:q.targetGrid||null,hasShortAnswer:Boolean(q.shortAnswer)}};
}
function teacherStage(s){return {...s,challenges:s.challenges.map(q=>({...q,answer:String.fromCharCode(65+q.correct)}))};}
function roomState(room,token){
 const teacher=token===room.teacherToken;
 const team=room.teams.find(t=>t.token===token);
 if(!teacher&&!team)throw error('Mã truy cập không hợp lệ.',403);
 room.teams.forEach(ensureTeamFields);
 const teams=room.teams.map(t=>({id:t.id,name:t.name,avatar:t.avatar,color:t.color,
  stage:t.stage,round:t.round,score:t.score,bonus:t.bonus,health:t.health,wrong:t.wrong,
  gold:t.gold,heroLevel:t.heroLevel,streak:t.streak||0,upgrades:t.upgrades,
  cipherReady:Boolean(t.cipherReady),bossReady:Boolean(t.bossReady),
  completed:t.completed,finishedAt:t.finishedAt,attempts:teacher?t.attempts:undefined,
  hintsUsed:teacher?t.hintsUsed:undefined,digits:teacher?t.digits:undefined}));
 const elapsed=room.clock.running?Date.now()-room.clock.startedAt:0;
 const clock={running:room.clock.running,remainingMs:Math.max(0,room.clock.remainingMs-elapsed),minutes:room.clock.minutes};
 const base={room:room.id,role:teacher?'teacher':'student',teams,paused:room.paused,clock,
  stages:STAGES.map(x=>({id:x.id,title:x.title,subtitle:x.subtitle||'',place:x.place,icon:x.icon,tag:x.tag,time:x.time,biomeColor:x.biomeColor||'#3b82f6',item:x.item||'',gameType:x.gameType,defaultMode:x.defaultMode,totalRounds:x.challenges.length})),
  messageOptions:MESSAGE_OPTIONS,lastEvent:room.events.slice(-15).reverse(),
  createdAt:room.createdAt,joinBaseURL:`http://${LAN_IP}:${PORT}`};
 if(teacher)return {...base,teamCodes:Object.fromEntries(room.teams.map(t=>[t.id,t.code])),
   teacherToken:room.teacherToken,missions:STAGES.map(teacherStage),cipher:'30524',cipherWords:TOKEN_WORDS};
 const cur=STAGES[team.stage];return {...base,me:{id:team.id,name:team.name,avatar:team.avatar,color:team.color,
  stage:team.stage,round:team.round,health:team.health,wrong:team.wrong,score:team.score,bonus:team.bonus,
  gold:team.gold,heroLevel:team.heroLevel,streak:team.streak||0,upgrades:team.upgrades,
  cipherReady:Boolean(team.cipherReady),bossReady:Boolean(team.bossReady),
  completed:team.completed,attempts:team.attempts,hintsUsed:team.hintsUsed,digits:team.digits,finishedAt:team.finishedAt},
  current:cur?publicStage(cur,team.round,team):null,cipherWords:team.stage>=5?TOKEN_WORDS:null};
}
function error(message,status=400){const e=new Error(message);e.status=status;return e;}
function getRoom(data){const r=ROOMS[String(data.room||'').toUpperCase()];if(!r)throw error('Không tìm thấy mã phòng. Hãy kiểm tra lại.',404);return r;}
function requireTeacher(r,token){if(token!==r.teacherToken)throw error('Chỉ giáo viên được phép thao tác này.',403);}
function requireTeam(r,token){const team=r.teams.find(t=>t.token===token);if(!team)throw error('Mã đội không hợp lệ. Hãy đăng nhập lại.',403);return ensureTeamFields(team);}
function emit(r,content){r.events.push({at:new Date().toISOString(),text:content});if(r.events.length>200)r.events.shift();}
function clockPause(r){if(!r.clock.running)return;r.clock.remainingMs=Math.max(0,r.clock.remainingMs-(Date.now()-r.clock.startedAt));r.clock.running=false;r.clock.startedAt=0;}
function normAns(s){return String(s??'').trim().replace(/\u2212/g,'-').replace(/\s+/g,'').toUpperCase();}
function processAction(endpoint,d){
 if(endpoint==='/api/create'){
  let size=Number(d.teamCount||6);if(!Number.isInteger(size)||size<4||size>8)throw error('Chọn 4–8 đội.');
  let roomId;do{roomId=String(100000+crypto.randomInt(900000));}while(ROOMS[roomId]);
  const r={id:roomId,teacherToken:rnd(),createdAt:new Date().toISOString(),paused:false,
    clock:{minutes:45,remainingMs:45*60*1000,running:false,startedAt:0},
    teams:TEAM_POOL.slice(0,size).map((t,i)=>({...t,id:'doi-'+(i+1),code:String(1000+crypto.randomInt(9000)),token:rnd(16),stage:0,round:0,health:3,wrong:0,score:0,bonus:0,gold:100,heroLevel:1,upgrades:{damage:1,speed:1,hp:1,regen:1},completed:false,finishedAt:null,attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[]})),events:[]};
  emit(r,'NOVA đã tạo phòng '+roomId+' với '+size+' đội.');ROOMS[roomId]=r;persist();return{room:roomId,teacherToken:r.teacherToken};
 }
 const r=getRoom(d);
 if(endpoint==='/api/join'){
  const t=r.teams.find(t=>t.id===d.team&&t.code===String(d.code||'').trim());
  if(!t)throw error('Sai mã đội hoặc mã phòng. Hãy hỏi giáo viên.',403);
  ensureTeamFields(t);
  return{token:t.token,room:r.id,team:t.id};
 }
 if(endpoint==='/api/state')return roomState(r,d.token);
 if(endpoint==='/api/demoJump'){
  const t=requireTeam(r,d.token);
  const stg=Math.max(0,Math.min(5,Number(d.stage)||0));
  t.stage=stg;t.round=0;t.health=3;t.completed=false;
  t.cipherReady=false;t.bossReady=false;
  t.digits=STAGES.slice(0,stg).map((s,idx)=>({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item}));
  t.score=stg*20;
  persist();return{ok:true};
 }
 if(endpoint==='/api/answer'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.completed||t.stage>=5)throw error('Đội đã vượt qua 5 trạm, hãy giải mật thư cuối.');
  const idx=t.stage,s=STAGES[idx];
  const isBoss=Boolean(s.bossChallenge&&t.bossReady);
  const round=isBoss?s.challenges.length:t.round;
  const q=isBoss?s.bossChallenge:s.challenges[round];
  if(!isBoss&&(Number(d.stage)!==idx||Number(d.round)!==round))throw error('Nhiệm vụ vừa thay đổi, hãy nạp lại màn hình để tiếp tục.');
  let isCorrect=false;
  if(d.shortText!==undefined&&String(d.shortText).trim()!==''){
   const given=normAns(d.shortText);
   const targetShort=normAns(q.shortAnswer);
   const targetOpt=normAns(q.options[q.correct]);
   const targetLetter=String.fromCharCode(65+q.correct);
   isCorrect=(targetShort&&given===targetShort)||given===targetOpt||given===targetLetter;
  }else{
   const choice=Number(d.choice);
   if(!Number.isInteger(choice)||choice<0||choice>3)throw error('Vui lòng chọn một đáp án hoặc nhập câu trả lời.');
   isCorrect=(choice===q.correct);
  }
  if(isCorrect){
   t.streak=(t.streak||0)+1;
   const comboBonus=Math.min(4,t.streak-1)*30;
   if(isBoss){
    const pts=t.attempts[idx]===0&&!t.hintsUsed[idx]?25:15;
    t.stage++;t.round=0;t.bossReady=false;t.health=3;t.score+=pts;t.gold+=150;
    t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
    const digit=s.digit;
    t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
    emit(r,`🏆 ${t.avatar} ${t.name} đã bắn Đại Pháo Laser tiêu diệt BOSS BÓNG ĐEN LÃNG QUÊN! THÀNH TRÌ ĐÃ ĐƯỢC BẢO VỆ! +${pts} XP.`);
    persist();
    return{correct:true,points:pts,goldEarned:150,comboBonus,streak:t.streak,gold:t.gold,heroLevel:t.heroLevel,explain:q.explain,bossDefeated:true,stageFinished:true,digit,digitRule:s.digitRule,item:s.item,nextRound:0,nextStage:t.stage,health:t.health,score:t.score};
   }
   t.round++;let pts=0,digit=null,goldEarned=120+comboBonus;
   t.gold=(t.gold||100)+goldEarned;
   const cipherPiece=q.cipherPiece||null;
   if(t.round>=s.challenges.length){
    if(s.cipher){
     t.cipherReady=true;
     emit(r,`📜 ${t.avatar} ${t.name} đã thu thập đủ 5 mảnh mật thư tại ${s.place}! Hãy mở Sổ Mật Thư để giải mã!`);
     persist();
     return{correct:true,points:0,goldEarned,comboBonus,streak:t.streak,gold:t.gold,heroLevel:t.heroLevel,explain:q.explain,keyBadge:q.keyBadge,cipherPiece,roundFinished:true,cipherReady:true,stageFinished:false,nextRound:t.round,nextStage:t.stage,health:t.health,score:t.score};
    }else{
     pts=t.attempts[idx]===0&&!t.hintsUsed[idx]?20:t.attempts[idx]<=2?12:8;
     t.stage++;t.round=0;t.health=3;t.score+=pts;t.gold+=80;
     t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
     digit=s.digit;
     t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
     emit(r,`${t.avatar} ${t.name} đã VƯỢT CHẶNG ${idx+1}: ${s.place} (Combo x${t.streak}). +${pts} XP, +${goldEarned+80} Vàng và mảnh mã ${digit}.`);
    }
   }else{
    emit(r,`${t.avatar} ${t.name} đã hạ mục tiêu lượt ${round+1}/${s.challenges.length} tại ${s.place} (Combo x${t.streak}, +${goldEarned} Vàng).`);
   }
   persist();return{correct:true,points:pts,goldEarned,comboBonus,streak:t.streak,gold:t.gold,heroLevel:t.heroLevel,explain:q.explain,keyBadge:q.keyBadge,cipherPiece,roundFinished:true,stageFinished:digit!==null,
     digit,digitRule:digit!==null?s.digitRule:undefined,item:digit!==null?s.item:undefined,
     nextRound:t.round,nextStage:t.stage,health:t.health,score:t.score};
  }
  t.streak=0;
  t.attempts[idx]++;t.wrong++;t.health=Math.max(0,t.health-1);
  const attempt=t.attempts[idx];const hint=q.hints[Math.min(attempt-1,q.hints.length-1)];
  emit(r,`${t.avatar} ${t.name} trả lời chưa đúng lượt ${round+1} ở ${s.place}; còn ${t.health} khiên.`);
  persist();return{correct:false,streak:0,hint,tries:attempt,health:t.health,gold:t.gold};
 }
 if(endpoint==='/api/cipher'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  const idx=t.stage,s=STAGES[idx];
  if(!s||!s.cipher)throw error('Chặng này không yêu cầu giải mật thư.');
  const submitted=String(d.cipher||'').trim().toUpperCase().replace(/[\s-]/g,'');
  if(submitted!==s.cipher){
   return{correct:false,hint:s.cipherHint||'Hãy sắp xếp các ký tự thu thập được theo đúng thứ tự!'};
  }
  if(s.id===3){
   const pts=t.attempts[idx]===0&&!t.hintsUsed[idx]?20:t.attempts[idx]<=2?12:8;
   t.stage++;t.round=0;t.cipherReady=false;t.health=3;t.score+=pts;t.gold+=100;
   t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
   const digit=s.digit;
   t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
   emit(r,`💠 ${t.avatar} ${t.name} đã giải mã thành công PHALE và mở cổng Tháp Pha Lê (+${pts} XP)!`);
   persist();
   return{correct:true,points:pts,stageFinished:true,digit,digitRule:s.digitRule,item:s.item,nextRound:0,nextStage:t.stage,health:t.health,score:t.score,message:'THÁP PHA LÊ ĐÃ ĐƯỢC MỞ CỔNG PHONG ẤN THÀNH CÔNG!'};
  }
  if(s.id===4){
   const pts=t.attempts[idx]===0&&!t.hintsUsed[idx]?20:t.attempts[idx]<=2?12:8;
   t.stage++;t.round=0;t.cipherReady=false;t.health=3;t.score+=pts;t.gold+=100;
   t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
   const digit=s.digit;
   t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
   emit(r,`🌀 ${t.avatar} ${t.name} đã giải mã thành công TRUNG và mở Phòng Kho Báu Trung Tâm (+${pts} XP)!`);
   persist();
   return{correct:true,points:pts,stageFinished:true,digit,digitRule:s.digitRule,item:s.item,nextRound:0,nextStage:t.stage,health:t.health,score:t.score,message:'CĂN PHÒNG KHO BÁU TRUNG TÂM ĐÃ ĐƯỢC MỞ KHÓA!'};
  }
  if(s.id===5){
   t.cipherReady=false;t.bossReady=true;t.gold+=50;
   emit(r,`🛡️ ${t.avatar} ${t.name} đã ghép BAOVE kích hoạt Lá Chắn Thành Trì! ĐẠI BOSS BÓNG ĐEN XUẤT HIỆN!`);
   persist();
   return{correct:true,bossReady:true,message:'LÁ CHẮN THÀNH TRÌ ĐÃ ĐƯỢC KÍCH HOẠT! ĐẠI BOSS BÓNG ĐEN ĐANG TỔNG TẤN CÔNG!'};
  }
 }
 if(endpoint==='/api/upgrade'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  const key=String(d.upgrade||'');
  if(!['damage','speed','hp','regen'].includes(key))throw error('Loại nâng cấp không hợp lệ.');
  const curLv=t.upgrades[key]||1;
  if(curLv>=5)throw error('Chỉ số này đã đạt cấp tối đa (Lv.5)!');
  const cost=60+curLv*40;
  if((t.gold||0)<cost)throw error(`Không đủ Vàng! Cần ${cost} Vàng (hiện có ${t.gold||0} Vàng). Hãy trả lời câu hỏi để nhận thêm Vàng.`);
  t.gold-=cost;t.upgrades[key]=curLv+1;
  if(key==='hp'||key==='regen')t.health=Math.min(3,t.health+1);
  const names={damage:'Sát thương Anh Hùng',speed:'Tốc độ bắn',hp:'Máu & Giáp Đội Quân',regen:'Hồi phục Thành Trì'};
  emit(r,`${t.avatar} ${t.name} nâng cấp ${names[key]} lên Lv.${t.upgrades[key]}.`);
  persist();return{ok:true,gold:t.gold,upgrades:t.upgrades,health:t.health,cost,level:t.upgrades[key]};
 }
 if(endpoint==='/api/hint'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage>=5)throw error('Đã hoàn thành năm trạm.');
  const i=t.stage,s=STAGES[i];
  const isBoss=Boolean(s.bossChallenge&&t.bossReady);
  const round=isBoss?s.challenges.length:t.round;
  const q=isBoss?s.bossChallenge:s.challenges[round];
  t.hintsUsed[i]=true;
  const level=Number(d.level)||1;
  const hintIndex=Math.max(0,Math.min(level-1,q.hints.length-1));
  emit(r,`${t.avatar} ${t.name} xin gợi ý cấp ${hintIndex+1} ở chặng ${i+1}.`);persist();
  return{hint:q.hints[hintIndex],level:hintIndex+1,totalLevels:q.hints.length,cost:'Gợi ý cấp '+(hintIndex+1)+'/'+q.hints.length};
 }
 if(endpoint==='/api/final'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage!==5)throw error('Hãy thu đủ năm mảnh mật mã trước.');
  if(t.completed)throw error('Đội đã mở kho báu rồi!');
  const code=String(d.code||'').replace(/\s/g,'');const choice=Number(d.choice);
  if(code!=='30524'||choice!==0){emit(r,`${t.avatar} ${t.name} đang giải mật thư cuối.`);persist();return{correct:false,hint:code!=='30524'?'Đọc các chữ số theo thứ tự chặng 1 → 5.':'Ghép các mảnh từ ngữ theo thứ tự chữ số trong mã.'};}
  t.completed=true;t.finishedAt=new Date().toISOString();t.score+=20;
  emit(r,`🏆 ${t.name} đã mở Lõi Tri Thức! +20 điểm giải mã.`);persist();return{correct:true,points:20,message:MESSAGE_OPTIONS[0],score:t.score};
 }
 if(endpoint==='/api/teacher'){
  requireTeacher(r,d.token);const action=String(d.action||'');
  if(action==='bonus'){
    const t=r.teams.find(t=>t.id===d.team);const b=Number(d.value);
    if(!t||!Number.isInteger(b)||b<0||b>10)throw error('Điểm hợp tác phải là số nguyên từ 0 đến 10.');
    t.score+=b-t.bonus;t.bonus=b;emit(r,`GV ghi nhận ${t.name}: ${b} điểm hợp tác.`);
  }else if(action==='pause'){
    r.paused=!r.paused;if(r.paused)clockPause(r);emit(r,r.paused?'Giáo viên đã tạm dừng nhiệm vụ.':'Các nhiệm vụ tiếp tục hoạt động.');
  }else if(action==='timer'){
    if(d.value==='start'){if(!r.clock.running){r.clock.startedAt=Date.now();r.clock.running=true;}}
    else if(d.value==='pause'){clockPause(r);}
    else if(d.value==='reset'){r.clock.running=false;r.clock.remainingMs=r.clock.minutes*60*1000;r.clock.startedAt=0;}
    else if(Number.isInteger(Number(d.value))&&[35,40,45,50].includes(Number(d.value))){clockPause(r);r.clock.minutes=Number(d.value);r.clock.remainingMs=r.clock.minutes*60*1000;}
    else throw error('Tác vụ đồng hồ không hợp lệ.');
  }else if(action==='broadcast'){
    const msg=String(d.message||'').trim();
    if(!msg)throw error('Nội dung nhắn gửi không được để trống.');
    emit(r,`📢 THÔNG BÁO TỪ GV: ${msg}`);
  }else if(action==='healAll'){
    r.teams.forEach(t=>{ t.health=3; });
    emit(r,`💖 GIÁO VIÊN ĐÃ HỒI ĐẦY 3 KHIÊN CHO TẤT CẢ CÁC ĐỘI!`);
  }else if(action==='bonusAll'){
    r.teams.forEach(t=>{ t.score+=5; t.gold=(t.gold||120)+50; });
    emit(r,`✨ GIÁO VIÊN THƯỞNG NÓNG +5 XP VÀ +50 VÀNG CHO TOÀN BỘ CÁC ĐỘI!`);
  }else if(action==='resetTeam'){
    const t=r.teams.find(t=>t.id===d.team);if(!t)throw error('Không tìm thấy đội.');
    t.stage=0;t.round=0;t.health=3;t.wrong=0;t.score=0;t.bonus=0;t.gold=100;t.heroLevel=1;t.upgrades={damage:1,speed:1,hp:1,regen:1};t.completed=false;t.finishedAt=null;t.attempts=[0,0,0,0,0];t.hintsUsed=[false,false,false,false,false];t.digits=[];
    emit(r,`GV đã khởi động lại hành trình của ${t.name}.`);
  }else throw error('Tác vụ không được hỗ trợ.');
  persist();return{ok:true};
 }
 throw error('Đường dẫn API không tồn tại.',404);
}
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.mp3':'audio/mpeg','.wav':'audio/wav'};
function send(res,status,data,type='application/json; charset=utf-8'){
 res.writeHead(status,{'Content-Type':type,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY'});
 res.end(typeof data==='string'||Buffer.isBuffer(data)?data:JSON.stringify(data));
}
const server=http.createServer((req,res)=>{
 let pathname;
 try{pathname=new URL(req.url,'http://localhost').pathname;}catch(e){return send(res,400,{error:'Địa chỉ không hợp lệ.'});}
 if(pathname==='/health')return send(res,200,{ok:true,rooms:Object.keys(ROOMS).length});
 if(pathname.startsWith('/api/')){
  if(req.method!=='POST')return send(res,405,{error:'Chỉ hỗ trợ POST.'});
  let content='';req.on('data',b=>{content+=b;if(content.length>32000)req.destroy();});
  req.on('end',()=>{try{const d=JSON.parse(content||'{}');const result=processAction(pathname,d);send(res,200,result);}catch(e){send(res,e.status||400,{error:e.message||'Đã có lỗi xảy ra.'});}});return;
 }
 if(req.method!=='GET')return send(res,405,'Method not allowed','text/plain');
 if(pathname.startsWith('/images/') || pathname.startsWith('/sounds/')){
  const safeRel=path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '').replace(/^[\\\/]+/, '');
  const filePath=path.join(PUBLIC,safeRel);
  fs.readFile(filePath,(err,buf)=>{
   if(err)return send(res,404,'Không tìm thấy','text/plain; charset=utf-8');
   send(res,200,buf,MIME[path.extname(filePath)]||'application/octet-stream');
  });
  return;
 }
 const allowed={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js','/icon.svg':'icon.svg'};
 const name=allowed[pathname];if(!name)return send(res,404,'Không tìm thấy','text/plain; charset=utf-8');
 const file=path.join(PUBLIC,name);
 fs.readFile(file,(err,buf)=>{if(err)return send(res,404,'Không tìm thấy','text/plain; charset=utf-8');send(res,200,buf,MIME[path.extname(file)]);});
});
server.listen(PORT,'0.0.0.0',()=>{
 console.log('\n================ MATHVERSE OXYZ ================');
 console.log(`Giáo viên mở: http://localhost:${PORT}`);
 for(const iface of Object.values(os.networkInterfaces()).flat())if(iface&&iface.family==='IPv4'&&!iface.internal)console.log(`Học sinh cùng Wi-Fi mở: http://${iface.address}:${PORT}`);
 console.log('Giữ cửa sổ này mở trong khi chơi. Nhấn Ctrl+C để kết thúc.');
 console.log('Phòng học sẽ được lưu tại data/rooms.json\n');
});
