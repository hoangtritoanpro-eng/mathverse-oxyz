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
function publicStage(s,round){
 const q=s.challenges[round];
 return {id:s.id,title:s.title,place:s.place,icon:s.icon,tag:s.tag,time:s.time,
  story:s.story,groupTask:s.groupTask,gameType:s.gameType,
  round,totalRounds:s.challenges.length,challenge:{label:q.label,prompt:q.prompt,options:q.options}};
}
function teacherStage(s){return {...s,challenges:s.challenges.map(q=>({...q,answer:String.fromCharCode(65+q.correct)}))};}
function roomState(room,token){
 const teacher=token===room.teacherToken;
 const team=room.teams.find(t=>t.token===token);
 if(!teacher&&!team)throw error('Mã truy cập không hợp lệ.',403);
 const teams=room.teams.map(t=>({id:t.id,name:t.name,avatar:t.avatar,color:t.color,
  stage:t.stage,round:t.round,score:t.score,bonus:t.bonus,health:t.health,wrong:t.wrong,
  completed:t.completed,finishedAt:t.finishedAt,attempts:teacher?t.attempts:undefined,
  hintsUsed:teacher?t.hintsUsed:undefined,digits:teacher?t.digits:undefined}));
 const elapsed=room.clock.running?Date.now()-room.clock.startedAt:0;
 const clock={running:room.clock.running,remainingMs:Math.max(0,room.clock.remainingMs-elapsed),minutes:room.clock.minutes};
 const base={room:room.id,role:teacher?'teacher':'student',teams,paused:room.paused,clock,
  stages:STAGES.map(x=>({id:x.id,title:x.title,place:x.place,icon:x.icon,tag:x.tag,time:x.time,gameType:x.gameType,totalRounds:x.challenges.length})),
  messageOptions:MESSAGE_OPTIONS,lastEvent:room.events.slice(-15).reverse(),
  createdAt:room.createdAt,joinBaseURL:`http://${LAN_IP}:${PORT}`};
 if(teacher)return {...base,teamCodes:Object.fromEntries(room.teams.map(t=>[t.id,t.code])),
   teacherToken:room.teacherToken,missions:STAGES.map(teacherStage),cipher:'30524',cipherWords:TOKEN_WORDS};
 const cur=STAGES[team.stage];return {...base,me:{id:team.id,name:team.name,avatar:team.avatar,color:team.color,
  stage:team.stage,round:team.round,health:team.health,wrong:team.wrong,score:team.score,bonus:team.bonus,
  completed:team.completed,attempts:team.attempts,hintsUsed:team.hintsUsed,digits:team.digits,finishedAt:team.finishedAt},
  current:cur?publicStage(cur,team.round):null,cipherWords:team.stage>=5?TOKEN_WORDS:null};
}
function error(message,status=400){const e=new Error(message);e.status=status;return e;}
function getRoom(data){const r=ROOMS[String(data.room||'').toUpperCase()];if(!r)throw error('Không tìm thấy mã phòng. Hãy kiểm tra lại.',404);return r;}
function requireTeacher(r,token){if(token!==r.teacherToken)throw error('Chỉ giáo viên được phép thao tác này.',403);}
function requireTeam(r,token){const team=r.teams.find(t=>t.token===token);if(!team)throw error('Mã đội không hợp lệ. Hãy đăng nhập lại.',403);return team;}
function emit(r,content){r.events.push({at:new Date().toISOString(),text:content});if(r.events.length>200)r.events.shift();}
function clockPause(r){if(!r.clock.running)return;r.clock.remainingMs=Math.max(0,r.clock.remainingMs-(Date.now()-r.clock.startedAt));r.clock.running=false;r.clock.startedAt=0;}
function processAction(endpoint,d){
 if(endpoint==='/api/create'){
  let size=Number(d.teamCount||6);if(!Number.isInteger(size)||size<4||size>8)throw error('Chọn 4–8 đội.');
  let roomId;do{roomId=String(100000+crypto.randomInt(900000));}while(ROOMS[roomId]);
  const r={id:roomId,teacherToken:rnd(),createdAt:new Date().toISOString(),paused:false,
    clock:{minutes:45,remainingMs:45*60*1000,running:false,startedAt:0},
    teams:TEAM_POOL.slice(0,size).map((t,i)=>({...t,id:'doi-'+(i+1),code:String(1000+crypto.randomInt(9000)),token:rnd(16),stage:0,round:0,health:3,wrong:0,score:0,bonus:0,completed:false,finishedAt:null,attempts:[0,0,0,0,0],hintsUsed:[false,false,false,false,false],digits:[]})),events:[]};
  emit(r,'NOVA đã tạo phòng '+roomId+' với '+size+' đội.');ROOMS[roomId]=r;persist();return{room:roomId,teacherToken:r.teacherToken};
 }
 const r=getRoom(d);
 if(endpoint==='/api/join'){
  const t=r.teams.find(t=>t.id===d.team&&t.code===String(d.code||'').trim());
  if(!t)throw error('Sai mã đội hoặc mã phòng. Hãy hỏi giáo viên.',403);
  return{token:t.token,room:r.id,team:t.id};
 }
 if(endpoint==='/api/state')return roomState(r,d.token);
 if(endpoint==='/api/answer'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.completed||t.stage>=5)throw error('Đội đã vượt qua 5 trạm, hãy giải mật thư cuối.');
  const idx=t.stage,s=STAGES[idx],round=t.round,q=s.challenges[round],choice=Number(d.choice);
  if(Number(d.stage)!==idx||Number(d.round)!==round)throw error('Nhiệm vụ vừa thay đổi, hãy nạp lại màn hình để tiếp tục.');
  if(!Number.isInteger(choice)||choice<0||choice>3)throw error('Vui lòng chọn một trong bốn lựa chọn.');
  if(choice===q.correct){
   t.round++;let pts=0,digit=null;
   if(t.round>=s.challenges.length){
    pts=t.attempts[idx]===0&&!t.hintsUsed[idx]?20:t.attempts[idx]<=2?12:8;
    t.stage++;t.round=0;t.health=3;t.score+=pts;
    digit=s.digit;
    t.digits.push({stage:idx+1,digit:s.digit,rule:s.digitRule,item:s.item});
    emit(r,`${t.avatar} ${t.name} đã VƯỢT CHẶNG ${idx+1}: ${s.place}. +${pts} XP và mảnh mã ${digit}.`);
   }else{
    emit(r,`${t.avatar} ${t.name} đã vượt lượt ${round+1}/${s.challenges.length} tại ${s.place}.`);
   }
   persist();return{correct:true,points:pts,explain:q.explain,roundFinished:true,stageFinished:digit!==null,
     digit,digitRule:digit!==null?s.digitRule:undefined,item:digit!==null?s.item:undefined,
     nextRound:t.round,nextStage:t.stage,health:t.health,score:t.score};
  }
  t.attempts[idx]++;t.wrong++;t.health=Math.max(0,t.health-1);
  const attempt=t.attempts[idx];const hint=q.hints[Math.min(attempt-1,q.hints.length-1)];
  // Thành trì không bị khóa vĩnh viễn: sau khi cạn giáp sẽ được tiếp tục thử.
  emit(r,`${t.avatar} ${t.name} thử lại lượt ${round+1} ở ${s.place}; còn ${t.health} khiên.`);
  persist();return{correct:false,hint,tries:attempt,health:t.health};
 }
 if(endpoint==='/api/hint'){
  const t=requireTeam(r,d.token);if(r.paused)throw error('Giáo viên đang tạm dừng trò chơi.');
  if(t.stage>=5)throw error('Đã hoàn thành năm trạm.');
  const i=t.stage;if(Number(d.stage)!==i||Number(d.round)!==t.round)throw error('Nhiệm vụ đã thay đổi, hãy tải lại.');
  t.hintsUsed[i]=true;
  const q=STAGES[i].challenges[t.round];
  emit(r,`${t.avatar} ${t.name} xin gợi ý ở chặng ${i+1} · lượt ${t.round+1}.`);persist();
  return{hint:q.hints[0],cost:'Điểm chặng sẽ tính theo số lượt sai và việc dùng gợi ý.'};
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
  }else if(action==='resetTeam'){
    const t=r.teams.find(t=>t.id===d.team);if(!t)throw error('Không tìm thấy đội.');
    t.stage=0;t.round=0;t.health=3;t.wrong=0;t.score=0;t.bonus=0;t.completed=false;t.finishedAt=null;t.attempts=[0,0,0,0,0];t.hintsUsed=[false,false,false,false,false];t.digits=[];
    emit(r,`GV đã khởi động lại hành trình của ${t.name}.`);
  }else throw error('Tác vụ không được hỗ trợ.');
  persist();return{ok:true};
 }
 throw error('Đường dẫn API không tồn tại.',404);
}
const MIME={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};
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
