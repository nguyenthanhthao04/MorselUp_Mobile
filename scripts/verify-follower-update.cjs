const fs=require('fs'),WebSocket=require('ws'),{execFileSync}=require('child_process');
const adb='C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe',sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const base='http://127.0.0.1:8084',pages=await(await fetch(base+'/json/list')).json(),ws=new WebSocket(pages.at(-1).webSocketDebuggerUrl,{origin:base});await new Promise(r=>ws.once('open',r));
 let seq=0;const pending=new Map();ws.on('message',raw=>{const m=JSON.parse(String(raw));if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}});
 const ev=expression=>new Promise(resolve=>{const id=++seq;pending.set(id,m=>resolve(m.result?.result?.value));ws.send(JSON.stringify({id,method:'Runtime.evaluate',params:{expression,returnByValue:true}}));});
 const results=[];
 for(const profile of ['16:15600','16:15772'])for(const c of [
  {route:'16:16061',x:212,back:'16:16066',name:'followers'},
  {route:'16:16194',x:348,back:'16:16199',name:'following'},
 ]){
  await ev(`globalThis.__morselupReview.selectScreen(${JSON.stringify(profile)})`);await sleep(400);
  const density=await ev('globalThis.__morselupReview.pixelRatio');
  execFileSync(adb,['shell','input','tap',String(c.x*density),String(254*density)]);await sleep(450);
  const entered=await ev('globalThis.__morselupReview.current');
  results.push({profile,kind:c.name,expected:c.route,actual:entered,passed:entered===c.route});
  if(profile==='16:15600'){
   execFileSync(adb,['shell','input','swipe',String(214*density),String(800*density),String(214*density),String(300*density),'600']);await sleep(350);
   fs.writeFileSync('verification/'+c.name+'-scrolled.png',execFileSync(adb,['exec-out','screencap','-p']));
  }
  execFileSync(adb,['shell','input','tap',String(23*density),String(87*density)]);await sleep(350);
  const actual=JSON.parse(await ev('JSON.stringify({current:globalThis.__morselupReview.current,last:globalThis.__morselupLastInteraction})'));
  results.push({kind:'back',expected:profile,actual,passed:actual.current===profile&&actual.last?.node===c.back});
 }
 await ev('globalThis.__morselupReview.selectScreen("16:16061")');
 ws.close();fs.writeFileSync('verification/follow-lists-navigation.json',JSON.stringify(results,null,2));
 console.log({checks:results.length,failed:results.filter(x=>!x.passed).length});if(results.some(x=>!x.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
