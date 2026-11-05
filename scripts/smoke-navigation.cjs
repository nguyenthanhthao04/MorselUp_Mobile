const WebSocket=require('ws');
const {execFileSync}=require('child_process');
const fs=require('fs');
const adb=process.env.ADB_PATH||'C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const base='http://127.0.0.1:8084',pages=await(await fetch(base+'/json/list')).json();
 const ws=new WebSocket(pages[0].webSocketDebuggerUrl,{origin:base});
 await new Promise((r,j)=>{ws.once('open',r);ws.once('error',j)});
 let id=0;const pending=new Map();ws.on('message',raw=>{const m=JSON.parse(String(raw));if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}});
 const evaluate=expression=>new Promise(resolve=>{const seq=++id;pending.set(seq,m=>resolve(m.result?.result?.value));ws.send(JSON.stringify({id:seq,method:'Runtime.evaluate',params:{expression,returnByValue:true}}));});
 const current=()=>evaluate('globalThis.__morselupReview.current');
 const results=[];
 await evaluate('globalThis.__morselupReview.selectScreen("16:15184")');await sleep(1800);
 async function tap(label,x,y,expected){execFileSync(adb,['shell','input','tap',String(x),String(y)]);await sleep(1000);const actual=await current();results.push({label,expected,actual,passed:actual===expected});}
 await tap('Nhận ngay',214,623,'16:16691');
 await tap('Gửi yêu cầu nhận',214,865,'16:16946');
 await tap('Về Trang Chủ',214,649,'16:15184');
 // Restore the main screen regardless of test outcome.
 await evaluate('globalThis.__morselupReview.selectScreen("16:15184")');await sleep(1800);
 fs.writeFileSync('verification/navigation-smoke.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));ws.close();if(results.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});

