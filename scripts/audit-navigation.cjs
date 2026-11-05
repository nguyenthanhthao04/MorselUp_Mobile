const fs=require('fs');
const {execFileSync}=require('child_process');
const WebSocket=require('ws');
const data=JSON.parse(fs.readFileSync('design/prototype.json','utf8'));
const frames=Object.fromEntries(data.frames.map(f=>[f.id,f]));
const screens=JSON.parse(fs.readFileSync('src/generated/screens.json','utf8'));
const nested=JSON.parse(fs.readFileSync('src/generated/nested-hotspots.json','utf8'));
const executable=i=>i.reactions.some(r=>r.trigger.type==='ON_CLICK'&&r.actions.some(a=>a.type==='BACK'||a.type==='CLOSE'||a.type==='NODE'&&a.destinationId));
const hasNav=id=>screens.find(s=>s.id===id).root.children.some(n=>n.name==='bottom nav');
const adb=process.env.ADB_PATH||'C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const incoming={};
for(const f of data.frames)for(const i of f.interactions)for(const r of i.reactions)for(const a of r.actions)if(a.navigation==='OVERLAY'&&a.destinationId&&!incoming[a.destinationId])incoming[a.destinationId]={frame:f.id,node:i.id,action:a,b:i.b};
function placement(f,source){
 const p=f.overlayPositionType,r=source?.action.overlayRelativePosition;
 return {x:p==='MANUAL'?(r?.x??0)+(source?.b?.x??0):p.endsWith('LEFT')?0:p.endsWith('RIGHT')?428-f.width:(428-f.width)/2,
 y:p==='MANUAL'?(r?.y??0)+(source?.b?.y??0):p.startsWith('TOP')?0:p.startsWith('BOTTOM')?926-f.height:(926-f.height)/2};
}
function pointFor(f,i){
 const later=f.interactions.slice(f.interactions.indexOf(i)+1).filter(n=>n.b&&executable(n));
 const b=i.b;if(!b||b.width<1||b.height<1)return null;
 for(const fy of [.5,.2,.8,.05,.95])for(const fx of [.5,.2,.8,.05,.95]){
  const p={x:b.x+b.width*fx,y:b.y+b.height*fy};
  if(!later.some(n=>p.x>=n.b.x&&p.x<n.b.x+n.b.width&&p.y>=n.b.y&&p.y<n.b.y+n.b.height))return p;
 }
 return null;
}
(async()=>{
 const base='http://127.0.0.1:8084',pages=await(await fetch(base+'/json/list')).json();
 const ws=new WebSocket(pages[0].webSocketDebuggerUrl,{origin:base});await new Promise((r,j)=>{ws.once('open',r);ws.once('error',j)});
 let seq=0;const pending=new Map(),errors=[];
 ws.on('message',raw=>{const m=JSON.parse(String(raw));if(pending.has(m.id)){const p=pending.get(m.id);clearTimeout(p.timer);p.resolve(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params);});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout'))},10000);pending.set(id,{resolve,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const m=await send('Runtime.evaluate',{expression,returnByValue:true});if(m.result?.exceptionDetails)throw new Error(JSON.stringify(m.result.exceptionDetails));return m.result?.result?.value;};
 const waitForFrame=async id=>{for(let attempt=0;attempt<100;attempt++){if(await evaluate('globalThis.__morselupReview.current')===id){await sleep(150);return;}await sleep(50);}throw new Error('Frame did not become active: '+id);};
 await send('Runtime.enable');
 const args=process.argv.slice(2),resume=args.includes('--resume');
 const previous=resume&&fs.existsSync('verification/navigation-audit.json')?JSON.parse(fs.readFileSync('verification/navigation-audit.json','utf8')):{};
 const results=(previous.results??[]).filter(r=>r.passed&&frames[r.frame].interactions.some(i=>i.id===r.node&&executable(i))),occluded=[],outside=[],dismissals=[];
 const unwired=data.frames.flatMap(f=>f.interactions.flatMap(i=>i.reactions.filter(r=>!r.actions.length||r.actions.every(a=>a.type==='NODE'&&!a.destinationId)).map(r=>({frame:f.id,node:i.id,name:i.name,trigger:r.trigger.type,reason:r.actions.length?'Destination is null in Figma':'Action list is empty in Figma',hasAnotherValidReaction:i.reactions.some(other=>other!==r&&other.actions.some(a=>a.type!=='NODE'||a.destinationId))}))));
 const completed=new Set(results.map(r=>r.frame+':'+r.node));
 const selected=args.filter(a=>a!=='--resume');
 const density=await evaluate('globalThis.__morselupReview.pixelRatio');
 for(const f of data.frames.filter(f=>!selected.length||selected.includes(f.id))){
  for(const i of f.interactions){
   if(completed.has(f.id+':'+i.id))continue;
   const reactions=i.reactions.filter(r=>r.trigger.type==='ON_CLICK');
   if(!executable(i))continue;
   const actions=reactions.flatMap(r=>r.actions);
   const actionable=actions.filter(a=>a.type!=='NODE'||a.destinationId);
   const point=pointFor(f,i);if(!point){occluded.push({frame:f.id,node:i.id});continue;}
   const previous=f.id==='16:13885'?'16:13942':'16:13885';
   const origin=incoming[f.id];
   let expectedHistory=[previous,origin?.frame??f.id],expectedOverlays=origin?[f.id]:[];
   await evaluate(`globalThis.__morselupReview.selectScreen(${JSON.stringify(origin?.frame??f.id)},${JSON.stringify(previous)});globalThis.__morselupLastInteraction=null`);
   await waitForFrame(origin?.frame??f.id);
   if(origin){await evaluate(`globalThis.__morselupReview.fireInteraction(${JSON.stringify(origin.node)})`);await sleep(1000);}
   await waitForFrame(f.id);
   await evaluate(`globalThis.__morselupScroll?.[${JSON.stringify(f.id)}]?.(0);for(const id of ${JSON.stringify(Object.keys(nested[f.id]??{}))})globalThis.__morselupNestedScroll?.[id]?.(0);globalThis.__morselupLastInteraction=null`);await sleep(100);
   const small=f.width<428||f.height<926,position=small?(origin?placement(f,origin):{x:(428-f.width)/2,y:(926-f.height)/2}):{x:0,y:0};
   const fixed=hasNav(f.id)&&point.y>=f.height-80;
   let offset=0,innerOffset=0;
   const inner=Object.entries(nested[f.id]??{}).find(([,s])=>s.interactionIds.includes(i.id));
   if(inner){const [id,s]=inner,visible=Math.min(s.height,(hasNav(f.id)?846:926)-s.origin.y),relative=point.y-s.origin.y;
    if(relative>visible-30||relative<20)innerOffset=Math.max(0,Math.min(s.contentHeight-s.height,relative-visible/2));
    await evaluate(`globalThis.__morselupNestedScroll[${JSON.stringify(id)}](${innerOffset})`);await sleep(200);
   }
   if(!small&&!fixed&&point.y-innerOffset>790){offset=Math.max(0,Math.min(f.height-926,point.y-innerOffset-450));await evaluate(`globalThis.__morselupScroll[${JSON.stringify(f.id)}](${offset})`);await sleep(100);}
   const x=point.x+position.x,y=(fixed?point.y-(f.height-80)+846:point.y-innerOffset-offset)+position.y;
   if(x<0||x>=428||y<0||y>=926){outside.push({frame:f.id,node:i.id,x,y});continue;}
   execFileSync(adb,['shell','input','tap',String(Math.round(x*density)),String(Math.round(y*density))]);
   await sleep(220);
   for(const a of actions){
    if(a.type==='CLOSE'){if(expectedOverlays.length)expectedOverlays.pop();}
    else if(a.type==='BACK'){if(expectedOverlays.length)expectedOverlays.pop();else if(expectedHistory.length>1)expectedHistory.pop();}
    else if(a.type==='NODE'&&a.destinationId){if(a.navigation==='OVERLAY')expectedOverlays.push(a.destinationId);else if(a.navigation==='NAVIGATE'){expectedHistory.push(a.destinationId);expectedOverlays=[];}}
   }
   const actual=JSON.parse(await evaluate('JSON.stringify({current:globalThis.__morselupReview.current,state:globalThis.__morselupReview.state,last:globalThis.__morselupLastInteraction})'));
   const expected=expectedOverlays.at(-1)??expectedHistory.at(-1);
   const passed=actual.current===expected&&actual.last?.node===i.id&&JSON.stringify(actual.state.overlays.map(o=>o.id))===JSON.stringify(expectedOverlays);
   results.push({frame:f.id,node:i.id,name:i.name,tap:{x,y,density},expected,actual:actual.current,expectedOverlays,actualOverlays:actual.state.overlays.map(o=>o.id),hit:actual.last?.node,passed});
   fs.writeFileSync('verification/navigation-audit.json',JSON.stringify({results,unwired,occluded,outside,errors},null,2));
   if(!passed)console.log('FAIL',f.id,i.id,i.name,expected,actual.current,actual.last?.node);
  }
  console.log(f.id,'tested',results.length,'failed',results.filter(r=>!r.passed).length);
 }
 for(const [id,origin] of Object.entries(incoming)){
  if(frames[id].overlayBackgroundInteraction!=='CLOSE_ON_CLICK_OUTSIDE')continue;
  await evaluate(`globalThis.__morselupReview.selectScreen(${JSON.stringify(origin.frame)})`);await waitForFrame(origin.frame);
  await evaluate(`globalThis.__morselupReview.fireInteraction(${JSON.stringify(origin.node)})`);await sleep(1000);
  await waitForFrame(id);
  const density=await evaluate('globalThis.__morselupReview.pixelRatio');
  execFileSync(adb,['shell','input','tap',String(density),String(density)]);await sleep(180);
  const current=await evaluate('globalThis.__morselupReview.current');dismissals.push({overlay:id,method:'outside tap',expected:origin.frame,actual:current,passed:current===origin.frame});
 }
 await evaluate('globalThis.__morselupReview.selectScreen("16:15184")');await waitForFrame('16:15184');
 await evaluate('globalThis.__morselupReview.fireInteraction("16:15197")');await waitForFrame('16:17621');await sleep(500);
 execFileSync(adb,['shell','input','keyevent','4']);await waitForFrame('16:15184').catch(()=>{});
 const afterBack=await evaluate('globalThis.__morselupReview.current');dismissals.push({overlay:'16:17621',method:'Android hardware back',expected:'16:15184',actual:afterBack,passed:afterBack==='16:15184'});
 await evaluate('globalThis.__morselupReview.selectScreen("16:15184")');
 const report={fileKey:data.fileKey,totalFigmaReactions:data.frames.reduce((n,f)=>n+f.interactions.reduce((n,i)=>n+i.reactions.length,0),0),executableHotspots:data.frames.reduce((n,f)=>n+f.interactions.filter(executable).length,0),tested:results.length,passed:results.filter(r=>r.passed).length,failed:results.filter(r=>!r.passed).length,results,unwired,occluded,outside,dismissals,errors};
 fs.writeFileSync('verification/navigation-audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify({...report,results:undefined},null,2));ws.close();if(report.failed||errors.length||dismissals.some(r=>!r.passed))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
