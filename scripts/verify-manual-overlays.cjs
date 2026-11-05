const fs=require('fs'),WebSocket=require('ws'),{execFileSync}=require('child_process');
const frames=require('../design/prototype.json').frames,nested=require('../src/generated/nested-hotspots.json');
const adb='C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe',sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const base='http://127.0.0.1:8084',pages=await(await fetch(base+'/json/list')).json(),ws=new WebSocket(pages[0].webSocketDebuggerUrl,{origin:base});await new Promise(r=>ws.once('open',r));
 let seq=0;const p=new Map();ws.on('message',raw=>{const m=JSON.parse(String(raw));if(p.has(m.id)){p.get(m.id)(m);p.delete(m.id);}});
 const ev=expression=>new Promise(resolve=>{const id=++seq;p.set(id,m=>resolve(m.result?.result?.value));ws.send(JSON.stringify({id,method:'Runtime.evaluate',params:{expression,returnByValue:true}}));});
 const results=[];
 for(const id of ['16:19839','16:20096']){
  const f=frames.find(f=>f.id===id),i=f.interactions.find(i=>i.reactions.some(r=>r.actions.some(a=>a.overlayRelativePosition))),a=i.reactions.flatMap(r=>r.actions).find(a=>a.overlayRelativePosition),[scrollId,s]=Object.entries(nested[id])[0];
  for(const offset of [0,Math.min(25,s.contentHeight-s.height)]){
   await ev(`globalThis.__morselupReview.selectScreen(${JSON.stringify(id)})`);await sleep(600);
   await ev(`globalThis.__morselupNestedScroll[${JSON.stringify(scrollId)}](${offset})`);await sleep(350);
   const density=await ev('globalThis.__morselupReview.pixelRatio');
   execFileSync(adb,['shell','input','tap',String(Math.round((i.b.x+i.b.width/2)*density)),String(Math.round((i.b.y+i.b.height/2-offset)*density))]);await sleep(500);
   const actual=JSON.parse(await ev('JSON.stringify({current:globalThis.__morselupReview.current,overlay:globalThis.__morselupReview.state.overlays.at(-1)})'));
   const expected={x:i.b.x+a.overlayRelativePosition.x,y:i.b.y-offset+a.overlayRelativePosition.y};
   const passed=actual.current===a.destinationId&&Math.abs(actual.overlay?.position?.x-expected.x)<1&&Math.abs(actual.overlay?.position?.y-expected.y)<1;
   results.push({frame:id,node:i.id,offset,expected,actual,passed});
  }
 }
 await ev('globalThis.__morselupReview.selectScreen("16:15184")');ws.close();fs.writeFileSync('verification/manual-overlay-scroll.json',JSON.stringify(results,null,2));console.log(results);if(results.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
