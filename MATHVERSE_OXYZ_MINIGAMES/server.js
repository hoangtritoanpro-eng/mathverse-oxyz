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

function rollStagePicks(){
 return STAGES.map(s=>{
  const len=(s.questionBank||[]).length||3;
  const indices=Array.from({length:len},(_,i)=>i);
  for(let i=indices.length-1;i>0;i--){
   const j=crypto.randomInt(i+1);
   const tmp=indices[i];indices[i]=indices[j];indices[j]=tmp;
  }
  return indices.slice(0,2);
 });
}

function getTeamChallenges(s,team){
 if(!s.questionBank||!s.interactiveChallenge)return s.challenges||[];
 const idx=s.id-1;
 const picks=(team&&team.stagePicks&&Array.isArray(team.stagePicks[idx])&&team.stagePicks[idx].length>=2)
  ?team.stagePicks[idx]:[0,1];
 const q1=s.questionBank[picks[0]]||s.questionBank[0];
 const q2=s.questionBank[picks[1]]||s.questionBank[1];
 return [
  s.interactiveChallenge,
  {...q1,keyBadge:'Khóa 2/3'},
  {...q2,keyBadge:'Khóa 3/3'}
 ];
}

function seedDefaultRoom(){
 ROOMS['123456']={
  id:'123456',
  teacherToken:'DEMO_GV',
  createdAt:new Date().toISOString(),
  paused:false,
  clock:{minutes:6,remainingMs:6*60*1000,running:false,startedAt:0},
  teams:TEAM_POOL.slice(0,6).map((t,i)=>({
   ...t,
   id:'doi-'+(i+1),
   code:String(i+1).repeat(4),
   token:'DEMO_DOI_'+(i+1),
   stage:0,round:0,health:3,wrong:0,score:0,bonus:0,
   gold:120,heroLevel:1,upgrades:{damage:1,speed:1,hp:1,regen:1},
   completed:false,finishedAt:null,
   attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[],
   stagePicks:rollStagePicks(),
   correctCount:0
  })),
  events:[{at:new Date().toISOString(),text:'Rồng Xanh đã mở sẵn phòng 123456 (Thời lượng 6 phút, 6 đội, mã PIN 1111 → 6666).'}]
 };
 persist();
}
seedDefaultRoom();

function ensureTeamFields(t){
 if(t.gold===undefined)t.gold=120;
 if(t.heroLevel===undefined)t.heroLevel=1;
 if(t.streak===undefined)t.streak=0;
 if(t.correctCount===undefined)t.correctCount=0;
 if(!t.upgrades)t.upgrades={damage:1,speed:1,hp:1,regen:1};
 if(!t.stagePicks||!Array.isArray(t.stagePicks)||t.stagePicks.length<5){
  t.stagePicks=rollStagePicks();
 }
 return t;
}

function publicStage(s,round,team){
 const chList=getTeamChallenges(s,team);
 const isBoss=Boolean(s.bossChallenge&&team&&team.bossReady);
 const q=isBoss?s.bossChallenge:(chList[round]||chList[chList.length-1]);
 return {
  id:s.id,title:s.title,subtitle:s.subtitle||'',shortName:s.shortName||s.place,
  place:s.place,icon:s.icon,sealIcon:s.sealIcon||'💠',
  levelBadge:s.levelBadge||(s.id<=3?'NHẬN BIẾT':'THÔNG HIỂU'),
  timeSeconds:s.timeSeconds||60,tag:s.tag,time:s.time,
  biomeColor:s.biomeColor||'#3b82f6',item:s.item||'',visual3D:s.visual3D||null,
  story:s.story,dragonIntro:s.dragonIntro||'',dragonWin:s.dragonWin||'',shadowIntro:s.shadowIntro||'',
  groupTask:s.groupTask,gameType:s.gameType||'vector_adventure',
  defaultMode:s.defaultMode||'hunt',
  teamRoles:s.teamRoles||[],
  interactiveTask:s.interactiveTask||null,
  huntMap:s.huntMap||null,defenseConfig:s.defenseConfig||null,
  cipher:s.cipher||null,cipherHint:s.cipherHint||null,cipherLetters:s.cipherLetters||null,
  cipherReady:Boolean(team&&(team.cipherReady||round>=chList.length)),
  bossReady:Boolean(team&&team.bossReady),
  allRounds:chList.map((c,i)=>({index:i,id:c.id||`${s.id}.${i}`,isInteractive:Boolean(c.isInteractive),level:c.level||s.levelBadge,label:c.label,keyBadge:c.keyBadge||`Khóa ${i+1}/3`})),
  round:Math.min(round,chList.length),totalRounds:chList.length,isBoss,
  challenge:{
   id:q.id||`${s.id}.${round}`,
   isInteractive:Boolean(q.isInteractive),
   level:q.level||s.levelBadge,
   label:q.label,prompt:q.prompt,options:q.options,
   roleAssign:q.roleAssign||'',highlightAxis:q.highlightAxis||'all',
   keyBadge:q.keyBadge||`Khóa ${round+1}/3`,
   hasShortAnswer:Boolean(q.shortAnswer)
  }
 };
}

function teacherStage(s){
 const bank=s.questionBank||s.challenges||[];
 return {...s,challenges:bank.map(q=>({...q,answer:String.fromCharCode(65+q.correct)}))};
}

function roomState(room,token){
 const teacher=token===room.teacherToken;
 const team=room.teams.find(t=>t.token===token);
 if(!teacher&&!team)throw error('Mã truy cập không hợp lệ.',403);
 room.teams.forEach(ensureTeamFields);
 const teams=room.teams.map(t=>({id:t.id,name:t.name,avatar:t.avatar,color:t.color,
  stage:t.stage,round:t.round,score:t.score,bonus:t.bonus,health:t.health,wrong:t.wrong,
  gold:t.gold,heroLevel:t.heroLevel,streak:t.streak||0,correctCount:t.correctCount||0,upgrades:t.upgrades,
  cipherReady:Boolean(t.cipherReady),bossReady:Boolean(t.bossReady),
  completed:t.completed,finishedAt:t.finishedAt,attempts:teacher?t.attempts:undefined,
  hintsUsed:teacher?t.hintsUsed:undefined,digits:teacher?t.digits:undefined}));
 const elapsed=room.clock.running?Date.now()-room.clock.startedAt:0;
 const clock={running:room.clock.running,remainingMs:Math.max(0,room.clock.remainingMs-elapsed),minutes:room.clock.minutes};
 const base={room:room.id,role:teacher?'teacher':'student',teams,paused:room.paused,clock,
  stages:STAGES.map(x=>({id:x.id,title:x.title,subtitle:x.subtitle||'',shortName:x.shortName||x.place,place:x.place,icon:x.icon,sealIcon:x.sealIcon||'💠',levelBadge:x.levelBadge,timeSeconds:x.timeSeconds||60,tag:x.tag,time:x.time,biomeColor:x.biomeColor||'#3b82f6',item:x.item||'',gameType:x.gameType,defaultMode:x.defaultMode,totalRounds:3})),
  messageOptions:MESSAGE_OPTIONS,lastEvent:room.events.slice(-15).reverse(),
  createdAt:room.createdAt,joinBaseURL:`http://${LAN_IP}:${PORT}`};
 if(teacher)return {...base,teamCodes:Object.fromEntries(room.teams.map(t=>[t.id,t.code])),
   teacherToken:room.teacherToken,missions:STAGES.map(teacherStage),cipher:'30524',cipherWords:TOKEN_WORDS};
 const cur=STAGES[team.stage];return {...base,me:{id:team.id,name:team.name,avatar:team.avatar,color:team.color,
  stage:team.stage,round:team.round,health:team.health,wrong:team.wrong,score:team.score,bonus:team.bonus,
  gold:team.gold,heroLevel:team.heroLevel,streak:team.streak||0,correctCount:team.correctCount||0,upgrades:team.upgrades,
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
    clock:{minutes:6,remainingMs:6*60*1000,running:false,startedAt:0},
    teams:TEAM_POOL.slice(0,size).map((t,i)=>({...t,id:'doi-'+(i+1),code:String(1000+crypto.randomInt(9000)),token:rnd(16),stage:0,round:0,health:3,wrong:0,score:0,bonus:0,gold:120,heroLevel:1,upgrades:{damage:1,speed:1,hp:1,regen:1},completed:false,finishedAt:null,attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[],stagePicks:rollStagePicks(),correctCount:0})),events:[]};
  emit(r,'Rồng Xanh đã tạo phòng '+roomId+' (6 phút) với '+size+' đội.');ROOMS[roomId]=r;persist();return{room:roomId,teacherToken:r.teacherToken};
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
 if(endpoint==='/api/stageTimeout'){
  const t=requireTeam(r,d.token);
  if(t.stage<5){
   const s=STAGES[t.stage];
   emit(r,`⏱️ ${t.avatar} ${t.name} đã hết thời gian tại Chặng ${t.stage+1} (${s.place}), tự động chuyển sang chặng tiếp theo.`);
   t.stage++;t.round=0;t.health=3;
   if(t.stage>=5)t.completed=true;
   persist();
  }
  return{ok:true,nextStage:t.stage};
 }
 if(endpoint==='/api/answer'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.completed||t.stage>=5)throw error('Đội đã vượt qua 5 chặng, hãy khôi phục Tâm Thạch Vectơ.');
  const idx=t.stage,s=STAGES[idx];
  const chList=getTeamChallenges(s,t);
  const round=t.round;
  const q=chList[round]||chList[chList.length-1];
  if(Number(d.stage)!==idx||Number(d.round)!==round)throw error('Nhiệm vụ vừa thay đổi, hãy nạp lại màn hình để tiếp tục.');
  let isCorrect=false;
  if(q.isInteractive && d.interactiveDone){
   isCorrect=true;
  }else if(d.shortText!==undefined&&String(d.shortText).trim()!==''){
   const given=normAns(d.shortText);
   const targetShort=normAns(q.shortAnswer);
   const targetOpt=normAns(q.options[q.correct]);
   const targetLetter=String.fromCharCode(65+q.correct);
   isCorrect=(targetShort&&given===targetShort)||given===targetOpt||given===targetLetter;
  }else{
   const choice=Number(d.choice);
   if(!Number.isInteger(choice)||choice<0||choice>3)throw error('Vui lòng chọn một đáp án rồi nhấn Xác nhận.');
   isCorrect=(choice===q.correct);
  }
  if(isCorrect){
   t.streak=(t.streak||0)+1;
   if(!q.isInteractive)t.correctCount=(t.correctCount||0)+1;
   const comboBonus=Math.min(4,t.streak-1)*30;
   t.round++;
   let pts=10,digit=null,goldEarned=100+comboBonus;
   t.gold=(t.gold||120)+goldEarned;
   t.score+=pts;
   if(t.round>=chList.length){
    const stageBonus=t.attempts[idx]===0&&!t.hintsUsed[idx]?20:10;
    pts+=stageBonus;
    t.score+=stageBonus;
    t.stage++;t.round=0;t.health=3;t.gold+=100;
    t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
    digit=s.digit;
    t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
    emit(r,`🏅 ${t.avatar} ${t.name} đã thu hồi [${s.item}] tại ${s.place}! (+${pts} XP)`);
   }else{
    emit(r,`🔑 ${t.avatar} ${t.name} nhận Mảnh chìa khóa ${t.round}/3 tại ${s.place} (+${pts} XP).`);
   }
   persist();
   return{
    correct:true,points:pts,goldEarned,comboBonus,streak:t.streak,gold:t.gold,heroLevel:t.heroLevel,
    explain:q.explain,dragonWin:t.round===0?s.dragonWin:null,
    keyBadge:q.keyBadge||`Khóa ${t.round}/3`,
    roundFinished:true,stageFinished:digit!==null,
    digit,digitRule:digit!==null?s.digitRule:undefined,item:digit!==null?s.item:undefined,
    nextRound:t.round,nextStage:t.stage,health:t.health,score:t.score
   };
  }
  t.streak=0;
  t.attempts[idx]++;t.wrong++;t.health=Math.max(1,t.health-1);
  const attempt=t.attempts[idx];
  const hint=(q.hints&&q.hints[Math.min(attempt-1,q.hints.length-1)])||'Hãy quan sát kỹ chiều mũi tên và điểm đầu, điểm cuối của các vectơ!';
  emit(r,`${t.avatar} ${t.name} đang thử lại câu hỏi tại ${s.place}.`);
  persist();
  return{correct:false,streak:0,hint,tries:attempt,health:t.health,gold:t.gold};
 }
 if(endpoint==='/api/hint'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage>=5)throw error('Đã hoàn thành năm chặng.');
  const i=t.stage,s=STAGES[i];
  const chList=getTeamChallenges(s,t);
  const q=chList[t.round]||chList[0];
  t.hintsUsed[i]=true;
  const level=Number(d.level)||1;
  const hintIndex=Math.max(0,Math.min(level-1,(q.hints||[]).length-1));
  emit(r,`${t.avatar} ${t.name} nhận gợi ý từ Rồng Xanh ở chặng ${i+1}.`);persist();
  return{hint:(q.hints&&q.hints[hintIndex])||s.dragonIntro,level:hintIndex+1,totalLevels:(q.hints||[]).length||1};
 }
 if(endpoint==='/api/final'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage<5)throw error('Hãy hoàn thành 5 chặng trước.');
  if(t.completed)throw error('Đội đã khôi phục Tâm Thạch Vectơ rồi!');
  const code=String(d.code||'30524').replace(/\s/g,'');const choice=Number(d.choice??0);
  if(code!=='30524'||choice!==0){
   emit(r,`${t.avatar} ${t.name} đang ghép 5 Ấn Vectơ khôi phục Tâm Thạch.`);persist();
   return{correct:false,hint:code!=='30524'?'Nhập mã 5 Ấn Vectơ theo thứ tự Chặng 1 → 5: 30524.':'Chọn thông điệp: TƯ DUY VÀ HỢP TÁC MỞ KHO BÁU.'};
  }
  t.completed=true;t.finishedAt=new Date().toISOString();t.score+=20;
  emit(r,`🏆 ${t.name} đã khôi phục TÂM THẠCH VECTƠ thành công! +20 XP.`);persist();
  return{correct:true,points:20,message:MESSAGE_OPTIONS[0],score:t.score};
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
    else if(Number.isInteger(Number(d.value))&&[6,10,15,35,40,45,50].includes(Number(d.value))){clockPause(r);r.clock.minutes=Number(d.value);r.clock.remainingMs=r.clock.minutes*60*1000;}
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
    t.stage=0;t.round=0;t.health=3;t.wrong=0;t.score=0;t.bonus=0;t.gold=120;t.heroLevel=1;t.completed=false;t.finishedAt=null;t.attempts=[0,0,0,0,0];t.hintsUsed=[false,false,false,false,false];t.digits=[];t.stagePicks=rollStagePicks();t.correctCount=0;
    emit(r,`GV đã khởi động lại hành trình của ${t.name} (chọn ngẫu nhiên bộ câu hỏi mới).`);
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
