const fs=require('fs'),WebSocket=require('ws'),{execFileSync}=require('child_process');
const adb=process.env.ADB_PATH||'C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const base='http://127.0.0.1:8084';let pages=[];
 for(let i=0;i<30;i++){pages=await(await fetch(base+'/json/list')).json();if(pages.length)break;await sleep(500);}
 if(!pages.length)throw new Error('App is not running');
 const ws=new WebSocket(pages[0].webSocketDebuggerUrl,{origin:base});await new Promise((r,j)=>{ws.once('open',r);ws.once('error',j)});
 let seq=0;const pending=new Map(),errors=[];
 ws.on('message',raw=>{const m=JSON.parse(String(raw));if(pending.has(m.id)){const p=pending.get(m.id);clearTimeout(p.timer);p.resolve(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(new Error('Runtime stopped responding'));},10000);pending.set(id,{resolve,timer});ws.send(JSON.stringify({id,method,params}));});
 const ev=async expression=>{const m=await send('Runtime.evaluate',{expression,returnByValue:true});if(m.result?.exceptionDetails)throw new Error(JSON.stringify(m.result.exceptionDetails));return m.result?.result?.value;};
 await send('Runtime.enable');
 for(let i=0;i<100;i++){if(await ev('Boolean(globalThis.__morselupReview?.scale===1&&globalThis.__morselupReview?.height===926)'))break;await sleep(100);}
 const all=JSON.parse(fs.readFileSync('design/frames.json','utf8')).map(f=>f.id);
 const cycle=['16:15184','16:17298','16:13768','16:13390','16:17045','16:19555'];
 const ids=[...all,...Array.from({length:10},()=>cycle).flat()],samples=[];
 const memory=()=>{const s=execFileSync(adb,['shell','dumpsys','meminfo','host.exp.exponent'],{encoding:'utf8'});return {pid:execFileSync(adb,['shell','pidof','host.exp.exponent'],{encoding:'utf8'}).trim(),pssKb:Number(s.match(/TOTAL PSS:\s*(\d+)/)?.[1]),rssKb:Number(s.match(/TOTAL RSS:\s*(\d+)/)?.[1])};};
 const initial=memory();
 for(let i=0;i<ids.length;i++){
  await ev(`globalThis.__morselupReview.selectScreen(${JSON.stringify(ids[i])})`);await sleep(450);
  for(let attempt=0;attempt<20;attempt++){if(await ev('globalThis.__morselupReview.current')===ids[i])break;await sleep(100);}
  if(await ev('globalThis.__morselupReview.current')!==ids[i])throw new Error('Wrong active frame');
  if((i+1)%20===0){const sample={transitions:i+1,...memory()};samples.push(sample);console.log(sample);}
 }
 await ev('globalThis.__morselupReview.selectScreen("16:15184")');await sleep(1000);
 const final=memory(),report={transitions:ids.length,initial,final,samples,runtimeExceptions:errors,processSurvived:initial.pid===final.pid};
 fs.writeFileSync('verification/memory-stress.json',JSON.stringify(report,null,2));console.log(report);ws.close();if(errors.length||!report.processSurvived)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
