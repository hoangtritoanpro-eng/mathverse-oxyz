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
 if(s.fixedChallenges&&s.fixedChallenges.length)return s.fixedChallenges;
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
 const now=Date.now();
 ROOMS['123456']={
  id:'123456',
  teacherToken:'DEMO_GV',
  createdAt:new Date().toISOString(),
  paused:false,
  ended:false,
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
   correctCount:0,
   answerLog:[],
   stage1:{pillars:[],cluesFound:0,maxClues:2,cipherSolved:false,bridgeOpened:false,wrongAttempts:0,completedTimeSec:null,chestOpened:false,controllerRoleIdx:0,spawnVariant:i%3},
   lastActiveAt:now,
   stageEnteredAt:now
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
 if(!Array.isArray(t.answerLog))t.answerLog=[];
 if(!t.lastActiveAt)t.lastActiveAt=Date.now();
 if(!t.stageEnteredAt)t.stageEnteredAt=Date.now();
 if(!t.upgrades)t.upgrades={damage:1,speed:1,hp:1,regen:1};
 if(!t.stagePicks||!Array.isArray(t.stagePicks)||t.stagePicks.length<5){
  t.stagePicks=rollStagePicks();
 }
 if(!t.stage1||typeof t.stage1!=='object'){
  t.stage1={pillars:[],cluesFound:0,maxClues:4,cipherSolved:false,bridgeOpened:false,wrongAttempts:0,completedTimeSec:null,chestOpened:false,controllerRoleIdx:0,spawnVariant:0};
 }
 if(!Array.isArray(t.stage1.pillars))t.stage1.pillars=[];
 t.stage1.maxClues=4;
 if(t.stage1.wrongAttempts===undefined)t.stage1.wrongAttempts=0;
 if(t.stage1.completedTimeSec===undefined)t.stage1.completedTimeSec=null;
 if(t.stage1.chestOpened===undefined)t.stage1.chestOpened=false;
 if(t.stage1.controllerRoleIdx===undefined)t.stage1.controllerRoleIdx=0;
 if(t.stage1.spawnVariant===undefined)t.stage1.spawnVariant=0;
 if(t.stage>=1||t.completed){
  t.stage1.pillars=['1','2','3','4'];
  t.stage1.cluesFound=4;
  t.stage1.cipherSolved=true;
  t.stage1.bridgeOpened=true;
 }else if(t.stage===0){
  if(t.round>=1){
   t.stage1.pillars=['1','2','3','4'];
   t.stage1.cluesFound=4;
  }
  if(t.round>=2){
   t.stage1.cipherSolved=true;
  }
 }
 if(!t.stage2||typeof t.stage2!=='object'){
  t.stage2={solvedCount:0,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:false,completedTimeSec:null};
 }
 t.stage2.totalCount=6;
 if(t.stage2.solvedCount===undefined)t.stage2.solvedCount=0;
 if(t.stage2.shields===undefined)t.stage2.shields=3;
 if(t.stage2.wrongAttempts===undefined)t.stage2.wrongAttempts=0;
 if(t.stage2.controllerRoleIdx===undefined)t.stage2.controllerRoleIdx=0;
 if(t.stage2.gateOpened===undefined)t.stage2.gateOpened=false;
 if(t.stage2.completedTimeSec===undefined)t.stage2.completedTimeSec=null;
 if(t.stage>=2||t.completed){
  t.stage2.solvedCount=6;
  t.stage2.gateOpened=true;
 }
 if(!t.stage4||typeof t.stage4!=='object'){
  t.stage4={modePairs:6,matchedPairs:[],matchedCount:0,totalPairs:6,flipCount:0,wrongMatches:0,hintsUsedCount:0,controllerRoleIdx:0,deckOrder:[],gateOpened:false,completedTimeSec:null};
 }
 if(!Array.isArray(t.stage4.matchedPairs))t.stage4.matchedPairs=[];
 if(!Array.isArray(t.stage4.deckOrder))t.stage4.deckOrder=[];
 if(t.stage4.modePairs!==4&&t.stage4.modePairs!==6)t.stage4.modePairs=6;
 t.stage4.totalPairs=t.stage4.modePairs;
 if(t.stage4.matchedCount===undefined)t.stage4.matchedCount=t.stage4.matchedPairs.length;
 if(t.stage4.flipCount===undefined)t.stage4.flipCount=0;
 if(t.stage4.wrongMatches===undefined)t.stage4.wrongMatches=0;
 if(t.stage4.hintsUsedCount===undefined)t.stage4.hintsUsedCount=0;
 if(t.stage4.controllerRoleIdx===undefined)t.stage4.controllerRoleIdx=0;
 if(t.stage4.gateOpened===undefined)t.stage4.gateOpened=false;
 if(t.stage4.completedTimeSec===undefined)t.stage4.completedTimeSec=null;
 if(t.stage>=4||t.completed){
  t.stage4.matchedCount=t.stage4.totalPairs;
  t.stage4.gateOpened=true;
 }
 const curStgPos=t.completed?5:Math.min(5,t.stage||0);
 if(!t.dragon||typeof t.dragon!=='object'){
  t.dragon={state:'PLAYING',fromStage:curStgPos,toStage:curStgPos,moveMode:'IDLE',transitionId:0,startedAt:Date.now(),durationMs:3400};
 }
 if(t.dragon.state!=='PLAYING'&&t.dragon.state!=='IDLE'){
  const elapsedMove=Date.now()-(t.dragon.startedAt||0);
  if(elapsedMove>(t.dragon.durationMs||3800)+1200){
   t.dragon.state='PLAYING';
   t.dragon.fromStage=curStgPos;
   t.dragon.toStage=curStgPos;
   t.dragon.moveMode='IDLE';
  }
 }else{
  t.dragon.fromStage=curStgPos;
  t.dragon.toStage=curStgPos;
 }
 return t;
}

function computePedagogicalStats(room){
 let nbCorrect=0,nbTotal=0,thCorrect=0,thTotal=0;
 const qMap={};
 STAGES.forEach(s=>{
  (s.questionBank||[]).forEach(q=>{
   qMap[q.id]={id:q.id,stage:s.id,level:s.id<=3?'NHẬN BIẾT':'THÔNG HIỂU',prompt:q.prompt,correctCount:0,totalCount:0,pct:null};
  });
 });
 (room.teams||[]).forEach(t=>{
  (t.answerLog||[]).forEach(entry=>{
   if(entry.stage<=3){
    nbTotal++;
    if(entry.correct)nbCorrect++;
   }else{
    thTotal++;
    if(entry.correct)thCorrect++;
   }
   if(entry.qId&&qMap[entry.qId]){
    qMap[entry.qId].totalCount++;
    if(entry.correct)qMap[entry.qId].correctCount++;
   }
  });
 });
 const byQuestion=Object.values(qMap).map(q=>({
  ...q,
  pct:q.totalCount>0?Math.round((q.correctCount/q.totalCount)*100):null
 }));
 return {
  nhanBiet:{correct:nbCorrect,total:nbTotal,pct:nbTotal>0?Math.round((nbCorrect/nbTotal)*100):0},
  thongHieu:{correct:thCorrect,total:thTotal,pct:thTotal>0?Math.round((thCorrect/thTotal)*100):0},
  byQuestion
 };
}

function publicStage(s,round,team){
 const chList=getTeamChallenges(s,team);
 const isBoss=Boolean(s.bossChallenge&&team&&team.bossReady);
 const q=isBoss?s.bossChallenge:(chList[round]||chList[chList.length-1]);
 return {
  id:s.id,isCipherBridgeQuest:Boolean(s.isCipherBridgeQuest),
  title:s.title,subtitle:s.subtitle||'',shortName:s.shortName||s.place,
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
  allRounds:chList.map((c,i)=>({index:i,id:c.id||`${s.id}.${i}`,stepType:c.stepType||null,isInteractive:Boolean(c.isInteractive),level:c.level||s.levelBadge,label:c.label,keyBadge:c.keyBadge||`Khóa ${i+1}/3`})),
  round:Math.min(round,chList.length),totalRounds:chList.length,isBoss,
  challenge:{
   id:q.id||`${s.id}.${round}`,
   stepType:q.stepType||null,
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
 const isDisplay=token==='DISPLAY';
 const team=room.teams.find(t=>t.token===token);
 if(!teacher&&!isDisplay&&!team)throw error('Mã truy cập không hợp lệ.',403);
 room.teams.forEach(ensureTeamFields);
 const now=Date.now();
 const teams=room.teams.map(t=>({id:t.id,name:t.name,avatar:t.avatar,color:t.color,
  stage:t.stage,round:t.round,score:t.score,bonus:t.bonus,health:t.health,wrong:t.wrong,
  gold:t.gold,heroLevel:t.heroLevel,streak:t.streak||0,correctCount:t.correctCount||0,upgrades:t.upgrades,
  cipherReady:Boolean(t.cipherReady),bossReady:Boolean(t.bossReady),
  completed:t.completed,finishedAt:t.finishedAt,
  stage1:t.stage1||{pillars:[],cluesFound:0,cipherSolved:false,bridgeOpened:false},
  stage2:t.stage2||{solvedCount:0,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:false,completedTimeSec:null},
  stage4:{
   modePairs:t.stage4?.modePairs||6,
   matchedCount:t.stage4?.matchedCount||0,
   totalPairs:t.stage4?.totalPairs||6,
   flipCount:t.stage4?.flipCount||0,
   wrongMatches:t.stage4?.wrongMatches||0,
   hintsUsedCount:t.stage4?.hintsUsedCount||0,
   controllerRoleIdx:t.stage4?.controllerRoleIdx||0,
   gateOpened:Boolean(t.stage4?.gateOpened),
   completedTimeSec:t.stage4?.completedTimeSec??null
  },
  dragon:t.dragon||{state:'PLAYING',fromStage:t.stage,toStage:t.stage,moveMode:'IDLE',transitionId:0},
  online:Boolean((now-(t.lastActiveAt||0))<15*60*1000),
  stuckSec:Math.floor((now-(t.stageEnteredAt||now))/1000),
  attempts:teacher?t.attempts:undefined,
  hintsUsed:teacher?t.hintsUsed:undefined,
  digits:teacher?t.digits:undefined,
  answerLog:teacher?(t.answerLog||[]):undefined}));
 const elapsed=room.clock.running?Date.now()-room.clock.startedAt:0;
 const clock={running:room.clock.running,remainingMs:Math.max(0,room.clock.remainingMs-elapsed),minutes:room.clock.minutes};
 const base={room:room.id,role:teacher?'teacher':(isDisplay?'display':'student'),teams,paused:room.paused,ended:Boolean(room.ended),clock,
  stages:STAGES.map(x=>({id:x.id,isCipherBridgeQuest:Boolean(x.isCipherBridgeQuest),title:x.title,subtitle:x.subtitle||'',shortName:x.shortName||x.place,place:x.place,icon:x.icon,sealIcon:x.sealIcon||'💠',levelBadge:x.levelBadge,timeSeconds:x.timeSeconds||60,tag:x.tag,time:x.time,biomeColor:x.biomeColor||'#3b82f6',item:x.item||'',gameType:x.gameType,defaultMode:x.defaultMode,totalRounds:3})),
  messageOptions:MESSAGE_OPTIONS,lastEvent:room.events.slice(-15).reverse(),
  createdAt:room.createdAt,joinBaseURL:`http://${LAN_IP}:${PORT}`};
 if(isDisplay)return base;
 if(teacher)return {...base,teamCodes:Object.fromEntries(room.teams.map(t=>[t.id,t.code])),
   teacherToken:room.teacherToken,missions:STAGES.map(teacherStage),
   pedagogicalStats:computePedagogicalStats(room),
   cipher:'30524',cipherWords:TOKEN_WORDS};
 team.lastActiveAt=now;
 const cur=STAGES[team.stage];return {...base,me:{id:team.id,name:team.name,avatar:team.avatar,color:team.color,
  stage:team.stage,round:team.round,health:team.health,wrong:team.wrong,score:team.score,bonus:team.bonus,
  gold:team.gold,heroLevel:team.heroLevel,streak:team.streak||0,correctCount:team.correctCount||0,upgrades:team.upgrades,
  cipherReady:Boolean(team.cipherReady),bossReady:Boolean(team.bossReady),
  stage1:team.stage1||{pillars:[],cluesFound:0,cipherSolved:false,bridgeOpened:false},
  stage2:team.stage2||{solvedCount:0,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:false,completedTimeSec:null},
  stage4:team.stage4||{modePairs:6,matchedPairs:[],matchedCount:0,totalPairs:6,flipCount:0,wrongMatches:0,hintsUsedCount:0,controllerRoleIdx:0,deckOrder:[],gateOpened:false,completedTimeSec:null},
  dragon:team.dragon||{state:'PLAYING',fromStage:team.stage,toStage:team.stage,moveMode:'IDLE',transitionId:0},
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
  const now=Date.now();
  const r={id:roomId,teacherToken:rnd(),createdAt:new Date().toISOString(),paused:false,ended:false,
    clock:{minutes:6,remainingMs:6*60*1000,running:false,startedAt:0},
    teams:TEAM_POOL.slice(0,size).map((t,i)=>({...t,id:'doi-'+(i+1),code:String(1000+crypto.randomInt(9000)),token:rnd(16),stage:0,round:0,health:3,wrong:0,score:0,bonus:0,gold:120,heroLevel:1,upgrades:{damage:1,speed:1,hp:1,regen:1},completed:false,finishedAt:null,attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[],stagePicks:rollStagePicks(),correctCount:0,answerLog:[],stage1:{pillars:[],cluesFound:0,maxClues:4,cipherSolved:false,bridgeOpened:false,wrongAttempts:0,completedTimeSec:null,chestOpened:false,controllerRoleIdx:0,spawnVariant:crypto.randomInt(3)},lastActiveAt:now,stageEnteredAt:now})),events:[]};
  emit(r,'Rồng Xanh đã tạo phòng '+roomId+' (6 phút) với '+size+' đội.');ROOMS[roomId]=r;persist();return{room:roomId,teacherToken:r.teacherToken};
 }
 const r=getRoom(d);
 if(endpoint==='/api/join'){
  const t=r.teams.find(t=>t.id===d.team&&t.code===String(d.code||'').trim());
  if(!t)throw error('Sai mã đội hoặc mã phòng. Hãy hỏi giáo viên.',403);
  ensureTeamFields(t);
  t.lastActiveAt=Date.now();
  return{token:t.token,room:r.id,team:t.id};
 }
 if(endpoint==='/api/state')return roomState(r,d.token);
 if(endpoint==='/api/stage1Progress'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  t.lastActiveAt=Date.now();
  if(d.controllerRoleIdx!==undefined){
   t.stage1.controllerRoleIdx=Math.max(0,Math.min(3,Number(d.controllerRoleIdx)||0));
   persist();
  }
  if(d.secretChest&&!t.stage1.chestOpened){
   t.stage1.chestOpened=true;
   t.score+=5;
   t.gold=(t.gold||120)+25;
   emit(r,`🎁 ${t.avatar} ${t.name} đã tìm thấy Rương Bí Mật trong Rừng Vectơ (+5 XP, +25 Vàng)!`);
   persist();
  }
  const pillar=String(d.pillar||'').trim().toUpperCase();
  if(['1','2','3','4','A','B','C'].includes(pillar)){
   if(!t.stage1.pillars.includes(pillar)){
    t.stage1.pillars.push(pillar);
    t.stage1.cluesFound=Math.min(4,t.stage1.pillars.length);
    emit(r,`📜 ${t.avatar} ${t.name} đã thu thập mảnh mật thư #${pillar} (${t.stage1.cluesFound}/4)!`);
    persist();
   }
  }
  return{ok:true,stage1:t.stage1,score:t.score,gold:t.gold};
 }
 if(endpoint==='/api/stage2Progress'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  t.lastActiveAt=Date.now();
  if(d.controllerRoleIdx!==undefined){
   t.stage2.controllerRoleIdx=Math.max(0,Math.min(3,Number(d.controllerRoleIdx)||0));
  }
  if(d.resetShields){
   t.stage2.shields=3;
   t.health=3;
  }
  if(d.correctZone){
   const qIdx=Math.max(0,Math.min(5,Number(d.questionIdx)||0));
   const qId=String(d.qId||`2.${qIdx+1}`);
   const vec=String(d.chosenVec||'AC').trim();
   if(qIdx>=t.stage2.solvedCount && t.stage2.solvedCount<6){
    t.stage2.solvedCount=Math.min(6,qIdx+1);
    t.score+=5;
    t.gold=(t.gold||120)+30;
    t.correctCount=(t.correctCount||0)+1;
    t.streak=(t.streak||0)+1;
    t.answerLog.push({
     stage:2,
     qId,
     questionId:qId,
     isQuiz:true,
     level:'NHẬN BIẾT',
     choice:0,
     chosenText:`Hóa giải Mật Trận ${t.stage2.solvedCount}/6: Vectơ ${vec}`,
     correct:true,
     at:new Date().toISOString()
    });
    emit(r,`✨ ${t.avatar} ${t.name} đã hóa giải Mật Trận ${t.stage2.solvedCount}/6 (Vectơ ${vec}) tại Pháo Đài Góc Vuông (+5 XP)!`);
   }
  }
  if(d.wrongZone){
   const qIdx=Math.max(0,Math.min(5,Number(d.questionIdx)||0));
   const qId=String(d.qId||`2.${qIdx+1}`);
   const vec=String(d.chosenVec||'').trim();
   t.stage2.wrongAttempts=(t.stage2.wrongAttempts||0)+1;
   t.stage2.shields=Math.max(0,(t.stage2.shields??3)-1);
   t.wrong=(t.wrong||0)+1;
   t.attempts[1]=(t.attempts[1]||0)+1;
   t.health=Math.max(1,t.stage2.shields||1);
   t.streak=0;
   t.answerLog.push({
    stage:2,
    qId,
    questionId:qId,
    isQuiz:true,
    level:'NHẬN BIẾT',
    choice:1,
    chosenText:`Dẫm bẫy phép thuật: Vectơ ${vec}`,
    correct:false,
    at:new Date().toISOString()
   });
   emit(r,`⚠️ ${t.avatar} ${t.name} kích hoạt bẫy phép thuật (Vectơ ${vec}) tại Pháo Đài Góc Vuông (Còn ${t.stage2.shields}/3 khiên)!`);
  }
  persist();
  return{ok:true,stage2:t.stage2,score:t.score,gold:t.gold,health:t.health,wrong:t.wrong};
 }
 if(endpoint==='/api/stage4Progress'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  t.lastActiveAt=Date.now();
  if(d.initDeck && Array.isArray(d.deckOrder)){
   const modePairs=Number(d.modePairs)===4?4:6;
   if(!t.stage4.deckOrder.length || d.forceNewDeck || t.stage4.modePairs!==modePairs){
    t.stage4.modePairs=modePairs;
    t.stage4.totalPairs=modePairs;
    t.stage4.deckOrder=d.deckOrder.slice(0,12).map(x=>String(x));
    if(d.forceNewDeck){
     t.stage4.matchedPairs=[];
     t.stage4.matchedCount=0;
     t.stage4.flipCount=0;
     t.stage4.wrongMatches=0;
     t.stage4.gateOpened=false;
    }
   }
  }
  if(d.controllerRoleIdx!==undefined){
   t.stage4.controllerRoleIdx=Math.max(0,Math.min(4,Number(d.controllerRoleIdx)||0));
  }
  if(d.useHint){
   t.stage4.hintsUsedCount=(t.stage4.hintsUsedCount||0)+1;
   t.hintsUsed[3]=true;
   emit(r,`💡 ${t.avatar} ${t.name} đã sử dụng gợi ý cặp thẻ tại Mê Cung Trung Điểm (Lần ${t.stage4.hintsUsedCount}).`);
  }
  if(d.matchedPair){
   const pairId=String(d.pairId||'P1').trim().toUpperCase();
   const qId=String(d.qId||'4.1').trim();
   const pairLabel=String(d.pairLabel||pairId).trim();
   t.stage4.flipCount=(t.stage4.flipCount||0)+1;
   if(!t.stage4.matchedPairs.includes(pairId)){
    t.stage4.matchedPairs.push(pairId);
    t.stage4.matchedCount=Math.min(t.stage4.totalPairs,t.stage4.matchedPairs.length);
    t.score+=5;
    t.gold=(t.gold||120)+35;
    t.correctCount=(t.correctCount||0)+1;
    t.streak=(t.streak||0)+1;
    t.answerLog.push({
     stage:4,
     qId,
     questionId:qId,
     isQuiz:true,
     level:'THÔNG HIỂU',
     choice:0,
     chosenText:`Ghép đúng thẻ trung điểm: ${pairLabel}`,
     correct:true,
     at:new Date().toISOString()
    });
    emit(r,`🃏 ${t.avatar} ${t.name} đã ghép đúng cặp thẻ [${pairLabel}] (${t.stage4.matchedCount}/${t.stage4.totalPairs}) tại Mê Cung Trung Điểm (+5 XP)!`);
   }
  }
  if(d.wrongMatch){
   const qId=String(d.qId||'4.1').trim();
   const pairDesc=String(d.pairDesc||'2 thẻ chưa khớp').trim();
   t.stage4.flipCount=(t.stage4.flipCount||0)+1;
   t.stage4.wrongMatches=(t.stage4.wrongMatches||0)+1;
   t.wrong=(t.wrong||0)+1;
   t.attempts[3]=(t.attempts[3]||0)+1;
   t.streak=0;
   t.answerLog.push({
    stage:4,
    qId,
    questionId:qId,
    isQuiz:true,
    level:'THÔNG HIỂU',
    choice:1,
    chosenText:`Lật 2 thẻ chưa tương ứng (${pairDesc})`,
    correct:false,
    at:new Date().toISOString()
   });
  }
  persist();
  return{ok:true,stage4:t.stage4,score:t.score,gold:t.gold,wrong:t.wrong};
 }
 if(endpoint==='/api/dragonState'){
  const t=requireTeam(r,d.token);
  t.lastActiveAt=Date.now();
  const validStates=['IDLE','PLAYING','STAGE_COMPLETED','REWARD','CELEBRATING','MOVING','ARRIVING','STAGE_UNLOCKED'];
  const validModes=['IDLE','RUN','FLY','LAND','CELEBRATE','TALK'];
  if(d.state && validStates.includes(d.state)) t.dragon.state=d.state;
  if(d.moveMode && validModes.includes(d.moveMode)) t.dragon.moveMode=d.moveMode;
  if(d.fromStage!==undefined) t.dragon.fromStage=Number(d.fromStage);
  if(d.toStage!==undefined) t.dragon.toStage=Number(d.toStage);
  if(d.state==='PLAYING'||d.state==='IDLE'){
   const curPos=t.completed?5:Math.min(5,t.stage||0);
   t.dragon.fromStage=curPos;
   t.dragon.toStage=curPos;
  }
  persist();
  return{ok:true,dragon:t.dragon};
 }
 if(endpoint==='/api/demoJump'){
  const t=requireTeam(r,d.token);
  const stg=Math.max(0,Math.min(5,Number(d.stage)||0));
  const prevPos=Math.min(5,t.stage||0);
  t.stage=stg;t.round=0;t.health=3;t.completed=false;
  t.cipherReady=false;t.bossReady=false;
  t.stageEnteredAt=Date.now();
  t.stage1=stg>=1?{pillars:['1','2','3','4'],cluesFound:4,maxClues:4,cipherSolved:true,bridgeOpened:true,wrongAttempts:0,completedTimeSec:35,chestOpened:false,controllerRoleIdx:0,spawnVariant:0}:{pillars:[],cluesFound:0,maxClues:4,cipherSolved:false,bridgeOpened:false,wrongAttempts:0,completedTimeSec:null,chestOpened:false,controllerRoleIdx:0,spawnVariant:crypto.randomInt(3)};
  t.stage2=stg>=2?{solvedCount:6,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:true,completedTimeSec:42}:{solvedCount:0,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:false,completedTimeSec:null};
  t.stage4=stg>=4?{modePairs:6,matchedPairs:['P1','P2','P3','P4','P5','P6'],matchedCount:6,totalPairs:6,flipCount:8,wrongMatches:2,hintsUsedCount:0,controllerRoleIdx:0,deckOrder:[],gateOpened:true,completedTimeSec:48}:{modePairs:6,matchedPairs:[],matchedCount:0,totalPairs:6,flipCount:0,wrongMatches:0,hintsUsedCount:0,controllerRoleIdx:0,deckOrder:[],gateOpened:false,completedTimeSec:null};
  t.digits=STAGES.slice(0,stg).map((s,idx)=>({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item}));
  t.score=stg*20;
  const nextPos=Math.min(5,stg);
  t.dragon={
   state:prevPos!==nextPos?'MOVING':'PLAYING',
   fromStage:prevPos,
   toStage:nextPos,
   moveMode:prevPos!==nextPos?'RUN':'IDLE',
   transitionId:(t.dragon?.transitionId||0)+1,
   startedAt:Date.now(),
   durationMs:prevPos!==nextPos?3200:0
  };
  persist();return{ok:true,dragon:t.dragon};
 }
 if(endpoint==='/api/stageTimeout'){
  const t=requireTeam(r,d.token);
  if(t.stage<5&&!r.paused&&!r.ended){
   const prevStageIdx=t.stage;
   const s=STAGES[t.stage];
   emit(r,`⏱️ ${t.avatar} ${t.name} đã hết thời gian tại Chặng ${t.stage+1} (${s.place}), Rồng Xanh đưa đội di chuyển sang chặng tiếp theo.`);
   t.stage++;t.round=0;t.health=3;t.stageEnteredAt=Date.now();
   if(t.stage>=5)t.completed=true;
   t.dragon={
    state:'MOVING',
    fromStage:prevStageIdx,
    toStage:Math.min(5,t.stage),
    moveMode:'FLY',
    transitionId:(t.dragon?.transitionId||0)+1,
    startedAt:Date.now(),
    durationMs:3400
   };
   persist();
  }
  return{ok:true,nextStage:t.stage,dragon:t.dragon};
 }
 if(endpoint==='/api/answer'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.completed||t.stage>=5)throw error('Đội đã vượt qua 5 chặng, hãy khôi phục Tâm Thạch Vectơ.');
  const idx=t.stage,s=STAGES[idx];
  const chList=getTeamChallenges(s,t);
  const round=t.round;
  const q=chList[round]||chList[chList.length-1];
  if(!d.stage2MatrixCompleted && !d.stage4MemoryCompleted && (Number(d.stage)!==idx||Number(d.round)!==round))throw error('Nhiệm vụ vừa thay đổi, hãy nạp lại màn hình để tiếp tục.');
  t.lastActiveAt=Date.now();
  let isCorrect=false;
  let customWrongHint=null;
  let chosenLogText=null;
  if(idx===1 && d.stage2MatrixCompleted){
   isCorrect=true;
   t.stage2.solvedCount=6;
   t.stage2.gateOpened=true;
   if(!t.stage2.completedTimeSec){
    t.stage2.completedTimeSec=Math.max(1,Math.min(60,Math.round((Date.now()-(t.stageEnteredAt||Date.now()))/1000)));
   }
   chosenLogText='Hóa giải hoàn tất 6/6 Mật Trận Vectơ – Mở cổng Pháo Đài Góc Vuông';
  }else if(idx===3 && d.stage4MemoryCompleted){
   isCorrect=true;
   t.stage4.matchedCount=t.stage4.totalPairs||6;
   t.stage4.gateOpened=true;
   if(!t.stage4.completedTimeSec){
    t.stage4.completedTimeSec=Math.max(1,Math.min(65,Math.round((Date.now()-(t.stageEnteredAt||Date.now()))/1000)));
   }
   chosenLogText=`Ghép hoàn tất ${t.stage4.matchedCount}/${t.stage4.totalPairs} cặp thẻ phép thuật – Mở cổng Mê Cung Trung Điểm`;
  }else if(idx===0 && q.stepType==='find_pillars'){
   isCorrect=Boolean(d.interactiveDone || (Array.isArray(d.pillars)&&d.pillars.length>=2) || d.choice===0);
   if(isCorrect){
    t.stage1.pillars=['1','2','3','4'];
    t.stage1.cluesFound=4;
   }
  }else if(idx===0 && q.stepType==='assemble_cipher'){
   if(d.cipherOrder!==undefined){
    const rawOrder=Array.isArray(d.cipherOrder)?d.cipherOrder.join(''):d.cipherOrder;
    const ord=normAns(rawOrder);
    isCorrect=(ord==='AB-AC'||ord==='VECTƠAB-VECTƠAC'||ord==='AB-AC=?'||ord==='BC'||ord==='CB');
    chosenLogText=`Mở cuộn giấy mật mã: ${d.cipherOrder}`;
    if(!isCorrect){
     customWrongHint='Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ: vectơ AB − vectơ AC = ?';
    }
   }else if(d.shortText!==undefined&&String(d.shortText).trim()!==''){
    const ord=normAns(d.shortText);
    isCorrect=(ord==='AB-AC'||ord==='A'||ord==='BC'||ord==='CB');
    chosenLogText=`Mở cuộn giấy mật mã: ${d.shortText}`;
   }else{
    isCorrect=(Number(d.choice)===0 || Boolean(d.interactiveDone));
    chosenLogText=isCorrect?'Mở cuộn giấy: AB − AC = ?':'Chưa mở cuộn giấy';
   }
   if(isCorrect){
    t.stage1.pillars=['1','2','3','4'];
    t.stage1.cluesFound=4;
    t.stage1.cipherSolved=true;
   }
  }else if(idx===0 && q.stepType==='draw_vector_cb'){
   if(d.vectorFrom!==undefined||d.vectorTo!==undefined){
    const fromPt=String(d.vectorFrom||'C').trim().toUpperCase();
    const toPt=String(d.vectorTo||'').trim().toUpperCase();
    isCorrect=(fromPt==='C'&&toPt==='B');
    chosenLogText=`Mở khóa Cầu Ánh Sáng: Vectơ ${fromPt}${toPt} (từ ${fromPt} → ${toPt})`;
    if(!isCorrect){
     t.stage1.wrongAttempts=(t.stage1.wrongAttempts||0)+1;
     if(t.stage1.wrongAttempts===1){
      customWrongHint='Hãy quan sát điểm đầu và điểm cuối của mỗi vectơ: vectơ AB − vectơ AC có điểm đầu là C, điểm cuối là B.';
     }else{
      customWrongHint='Khi trừ hai vectơ cùng điểm đầu A, vectơ hiệu nối từ C đến B: vectơ CB!';
     }
    }
   }else if(d.shortText!==undefined&&String(d.shortText).trim()!==''){
    const given=normAns(d.shortText);
    isCorrect=(given==='CB'||given==='VECTƠCB');
    chosenLogText=`Vectơ ${d.shortText}`;
    if(!isCorrect)t.stage1.wrongAttempts=(t.stage1.wrongAttempts||0)+1;
   }else{
    isCorrect=(Number(d.choice)===0);
    chosenLogText=isCorrect?'Mở khóa Cầu Ánh Sáng (vectơ CB)':'Chọn sai mật mã';
    if(!isCorrect)t.stage1.wrongAttempts=(t.stage1.wrongAttempts||0)+1;
   }
   if(isCorrect){
    t.stage1.pillars=['1','2','3','4'];
    t.stage1.cluesFound=4;
    t.stage1.cipherSolved=true;
    t.stage1.bridgeOpened=true;
    if(!t.stage1.completedTimeSec){
     t.stage1.completedTimeSec=Math.max(1,Math.min(60,Math.round((Date.now()-(t.stageEnteredAt||Date.now()))/1000)));
    }
   }
  }else if(d.zombieTargetCleared){
   isCorrect=true;
   chosenLogText=`Tiêu diệt zombie mang vectơ ${d.targetVec||'AC'} (${d.kills||5}/5)`;
  }else if(q.isInteractive && d.interactiveDone){
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
  if(!q.isInteractive){
   t.answerLog.push({
    stage:idx+1,
    qId:q.id||`${idx+1}.${round}`,
    questionId:q.id||`${idx+1}.${round}`,
    isQuiz:true,
    level:idx<3?'NHẬN BIẾT':'THÔNG HIỂU',
    choice:Number.isInteger(Number(d.choice))?Number(d.choice):0,
    chosenText:chosenLogText||(q.options&&Number.isInteger(Number(d.choice))?q.options[Number(d.choice)]:undefined),
    correct:isCorrect,
    at:new Date().toISOString()
   });
  }
  if(isCorrect){
   t.streak=(t.streak||0)+1;
   if(!q.isInteractive)t.correctCount=(t.correctCount||0)+1;
   const comboBonus=Math.min(4,t.streak-1)*30;
   if(d.stage2MatrixCompleted || d.stage4MemoryCompleted){
    t.round=chList.length;
   }else{
    t.round++;
   }
   let pts=10,digit=null,goldEarned=100+comboBonus;
   t.gold=(t.gold||120)+goldEarned;
   t.score+=pts;
   if(t.round>=chList.length){
    const alreadyRewarded=t.digits.some(dg=>dg.stage===idx+1);
    const stageBonus=alreadyRewarded?0:(t.attempts[idx]===0&&!t.hintsUsed[idx]?20:10);
    pts+=stageBonus;
    t.score+=stageBonus;
    const prevStageIdx=idx;
    t.stage++;t.round=0;t.health=3;
    if(!alreadyRewarded) t.gold+=100;
    t.stageEnteredAt=Date.now();
    t.heroLevel=Math.min(6,(t.heroLevel||1)+1);
    digit=s.digit;
    if(!alreadyRewarded){
     t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
    }
    const nextStageIdx=Math.min(5,t.stage);
    t.dragon={
     state:'CELEBRATING',
     fromStage:prevStageIdx,
     toStage:nextStageIdx,
     moveMode:'CELEBRATE',
     transitionId:(t.dragon?.transitionId||0)+1,
     startedAt:Date.now(),
     durationMs:3800
    };
    if(idx===0){
     emit(r,`🌉 ${t.avatar} ${t.name} đã giải mã vectơ CB, khôi phục Cây Cầu Ánh Sáng, nhận [${s.item}] và cùng Rồng Xanh di chuyển sang Chặng 2! (+${pts} XP)`);
    }else if(idx===1){
     emit(r,`🏰 ${t.avatar} ${t.name} đã hóa giải 6/6 Mật Trận Vectơ, mở cổng Pháo Đài Góc Vuông, nhận [${s.item}] và cùng Rồng Xanh tiến sang Chặng 3! (+${pts} XP)`);
    }else if(idx===3){
     emit(r,`🌀 ${t.avatar} ${t.name} đã ghép đủ ${t.stage4.matchedCount}/${t.stage4.totalPairs} cặp thẻ Trung Điểm, mở cổng Mê Cung, nhận [${s.item}] và cùng Rồng Xanh bay sang Chặng 5! (+${pts} XP)`);
    }else if(t.stage>=5){
     emit(r,`👑 ${t.avatar} ${t.name} đã thu hồi đủ 5 Ấn Vectơ tại ${s.place} và đang bay tới Tâm Thạch Vectơ! (+${pts} XP)`);
    }else{
     emit(r,`🏅 ${t.avatar} ${t.name} đã thu hồi [${s.item}] tại ${s.place} và đang cùng Rồng Xanh di chuyển sang Chặng ${t.stage+1}! (+${pts} XP)`);
    }
   }else{
    if(idx===0 && t.round===1){
     emit(r,`📜 ${t.avatar} ${t.name} đã thu thập đủ 2/2 mảnh mật thư tại cột B và cột C (+${pts} XP).`);
    }else if(idx===0 && t.round===2){
     emit(r,`🧩 ${t.avatar} ${t.name} đã mở cuộn giấy mật mã Chặng 1: vectơ AB − vectơ AC = ? (+${pts} XP).`);
    }else{
     emit(r,`🔑 ${t.avatar} ${t.name} nhận Mảnh chìa khóa ${t.round}/3 tại ${s.place} (+${pts} XP).`);
    }
   }
   persist();
   return{
    correct:true,points:pts,goldEarned,comboBonus,streak:t.streak,gold:t.gold,heroLevel:t.heroLevel,
    explain:q.explain,dragonWin:t.round===0?s.dragonWin:null,
    keyBadge:q.keyBadge||`Khóa ${t.round}/3`,
    roundFinished:true,stageFinished:digit!==null,
    digit,digitRule:digit!==null?s.digitRule:undefined,item:digit!==null?s.item:undefined,
    nextRound:t.round,nextStage:t.stage,health:t.health,score:t.score,
    stage1:t.stage1,stage2:t.stage2,stage4:t.stage4,dragon:t.dragon
   };
  }
  t.streak=0;
  t.attempts[idx]++;t.wrong++;t.health=Math.max(1,t.health-1);
  const attempt=t.attempts[idx];
  const hint=customWrongHint||(q.hints&&q.hints[Math.min(attempt-1,q.hints.length-1)])||'Hãy quan sát kỹ chiều mũi tên và điểm đầu, điểm cuối của các vectơ!';
  emit(r,`${t.avatar} ${t.name} đang thử lại tại ${s.place}.`);
  persist();
  return{correct:false,streak:0,hint,tries:attempt,health:t.health,gold:t.gold,stage1:t.stage1,stage2:t.stage2,stage4:t.stage4};
 }
 if(endpoint==='/api/hint'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage>=5)throw error('Đã hoàn thành năm chặng.');
  const i=t.stage,s=STAGES[i];
  const chList=getTeamChallenges(s,t);
  const q=chList[t.round]||chList[0];
  t.hintsUsed[i]=true;
  t.lastActiveAt=Date.now();
  const level=Number(d.level)||1;
  const hintIndex=Math.max(0,Math.min(level-1,(q.hints||[]).length-1));
  emit(r,`${t.avatar} ${t.name} nhận gợi ý từ Rồng Xanh ở chặng ${i+1}.`);persist();
  return{hint:(q.hints&&q.hints[hintIndex])||s.dragonIntro,level:hintIndex+1,totalLevels:(q.hints||[]).length||1};
 }
 if(endpoint==='/api/final'){
  const t=requireTeam(r,d.token);
  if(r.ended)throw error('Lượt thi đã kết thúc.');
  if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
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
  }else if(action==='startContest'){
    r.ended=false;r.paused=false;
    if(!r.clock.running){
     if(r.clock.remainingMs<=0)r.clock.remainingMs=r.clock.minutes*60*1000;
     r.clock.startedAt=Date.now();
     r.clock.running=true;
    }
    emit(r,'🚀 Giáo viên đã BẮT ĐẦU lượt thi Hành Trình Giải Cứu Lục Địa OXYZ (6 phút)!');
  }else if(action==='pauseContest'){
    r.paused=true;clockPause(r);
    emit(r,'⏸ Giáo viên đã TẠM DỪNG lượt thi và đóng băng đồng hồ chủ.');
  }else if(action==='resumeContest'){
    r.ended=false;r.paused=false;
    if(!r.clock.running&&r.clock.remainingMs>0){
     r.clock.startedAt=Date.now();
     r.clock.running=true;
    }
    emit(r,'▶ Giáo viên đã TIẾP TỤC lượt thi.');
  }else if(action==='endContest'){
    r.ended=true;r.paused=false;clockPause(r);
    emit(r,'🏁 Giáo viên đã KẾT THÚC lượt thi và công bố bảng tổng kết!');
  }else if(action==='timer'){
    if(d.value==='start'){r.ended=false;r.paused=false;if(!r.clock.running){r.clock.startedAt=Date.now();r.clock.running=true;}}
    else if(d.value==='pause'){clockPause(r);}
    else if(d.value==='reset'){r.ended=false;r.paused=false;r.clock.running=false;r.clock.remainingMs=r.clock.minutes*60*1000;r.clock.startedAt=0;}
    else if(Number.isInteger(Number(d.value))&&[6,10,15,35,40,45,50].includes(Number(d.value))){clockPause(r);r.clock.minutes=Number(d.value);r.clock.remainingMs=r.clock.minutes*60*1000;}
    else throw error('Tác vụ đồng hồ không hợp lệ.');
  }else if(action==='broadcast'){
    const msg=String(d.message||'').trim();
    if(!msg)throw error('Nội dung nhắn gửi không được để trống.');
    emit(r,`📢 THÔNG BÁO TỪ GV: ${msg}`);
  }else if(action==='healAll'){
    r.teams.forEach(t=>{ t.health=3; if(t.stage2) t.stage2.shields=3; });
    emit(r,`💖 GIÁO VIÊN ĐÃ HỒI ĐẦY 3 KHIÊN CHO TẤT CẢ CÁC ĐỘI!`);
  }else if(action==='bonusAll'){
    r.teams.forEach(t=>{ t.score+=5; t.gold=(t.gold||120)+50; });
    emit(r,`✨ GIÁO VIÊN THƯỞNG NÓNG +5 XP VÀ +50 VÀNG CHO TOÀN BỘ CÁC ĐỘI!`);
  }else if(action==='resetTeam'){
    const t=r.teams.find(t=>t.id===d.team);if(!t)throw error('Không tìm thấy đội.');
    const now=Date.now();
    t.stage=0;t.round=0;t.health=3;t.wrong=0;t.score=0;t.bonus=0;t.gold=120;t.heroLevel=1;t.completed=false;t.finishedAt=null;t.attempts=[0,0,0,0,0];t.hintsUsed=[false,false,false,false,false];t.digits=[];t.stagePicks=rollStagePicks();t.correctCount=0;t.answerLog=[];t.stage1={pillars:[],cluesFound:0,maxClues:2,cipherSolved:false,bridgeOpened:false,wrongAttempts:0,completedTimeSec:null,chestOpened:false,controllerRoleIdx:0,spawnVariant:crypto.randomInt(3)};t.stage2={solvedCount:0,totalCount:6,shields:3,wrongAttempts:0,controllerRoleIdx:0,gateOpened:false,completedTimeSec:null};t.stage4={modePairs:6,matchedPairs:[],matchedCount:0,totalPairs:6,flipCount:0,wrongMatches:0,hintsUsedCount:0,controllerRoleIdx:0,deckOrder:[],gateOpened:false,completedTimeSec:null};t.lastActiveAt=now;t.stageEnteredAt=now;
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
 if(pathname.startsWith('/images/') || pathname.startsWith('/sounds/') || pathname.startsWith('/assets/')){
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
