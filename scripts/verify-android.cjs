const fs=require('fs');
const crypto=require('crypto');
const {execFileSync}=require('child_process');
const WebSocket=require('ws');
const adb=process.env.ADB_PATH||'C:/Users/LENOVO/AppData/Local/Android/Sdk/platform-tools/adb.exe';
const base='http://127.0.0.1:8084';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 let pages=[];
 for(let attempt=0;attempt<30;attempt++){pages=await(await fetch(base+'/json/list')).json();if(pages.length)break;await sleep(1000);}
 if(!pages.length)throw new Error('No React Native debugger is connected. Open the project in Expo Go first.');
 const target=process.env.RN_DEBUGGER_PAGE_ID?pages.find(p=>p.id===process.env.RN_DEBUGGER_PAGE_ID):pages.at(-1);
 if(!target)throw new Error('Requested React Native debugger context was not found.');
 const ws=new WebSocket(target.webSocketDebuggerUrl,{origin:base});await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Debugger websocket timeout')),10000);ws.addEventListener('open',()=>{clearTimeout(timeout);resolve();},{once:true});ws.addEventListener('error',e=>{clearTimeout(timeout);reject(new Error('Debugger websocket failed: '+e.message));},{once:true});});
 let seq=0;const pending=new Map(),errors=[];
 ws.addEventListener('message',e=>{const m=JSON.parse(String(e.data));if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params);});
 const send=(method,params={})=>new Promise(resolve=>{const id=++seq;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true});if(r.result?.exceptionDetails)throw new Error(JSON.stringify(r.result.exceptionDetails));return r.result?.result?.value;};
 await send('Runtime.enable');
 for(let attempt=0;attempt<100;attempt++){if(await evaluate('Boolean(globalThis.__morselupReview)'))break;await sleep(200);}
 if(!await evaluate('Boolean(globalThis.__morselupReview)')){ws.close();throw new Error('App did not initialize its review interface. Check the Android screen for a bundling error.');}
 console.log('Runtime',await evaluate('JSON.stringify({current:globalThis.__morselupReview?.current,width:globalThis.__morselupReview?.width,height:globalThis.__morselupReview?.height,scale:globalThis.__morselupReview?.scale})'));
 const screens=JSON.parse(fs.readFileSync('src/generated/screens.json','utf8'));
 const args=process.argv.slice(2),resume=args.includes('--resume'),ids=args.filter(a=>a!=='--resume');
 const buildHash=crypto.createHash('sha256').update(['App.tsx','src/NativeDesign.tsx','src/generated/screens.json','src/prototype.ts','design/prototype.json'].map(p=>fs.readFileSync(p,'utf8')).join('\n')).digest('hex');
 const previous=(resume||ids.length)&&fs.existsSync('verification/android-results.json')?JSON.parse(fs.readFileSync('verification/android-results.json','utf8')):{results:[],errors:[]};
 const merged=new Map(previous.buildHash===buildHash?previous.results.map(r=>[r.id,r]):[]);
 const selected=(ids.length?screens.filter(s=>ids.includes(s.id)):screens).filter(s=>{if(!resume)return true;const r=merged.get(s.id);if(!r||r.current!==s.id||r.width!==428||r.height!==926||r.scale!==1)return true;let expected=0;function count(n){if(typeof n!=='object')return;if(n.tag==='img')expected++;n.children.forEach(count);}count(s.root);return r.geometry.length!==expected||r.geometry.some(g=>g.svg&&!r.svgStatus?.[s.id+':'+g.slot]?.loaded);});
 fs.mkdirSync('verification/android',{recursive:true});
 const results=[];
 for(const screen of selected){
  await evaluate(`(()=>{if(globalThis.__morselupReview.current!==${JSON.stringify(screen.id)})for(const name of ['__morselupGeometry','__morselupSvgStatus'])for(const key of Object.keys(globalThis[name]??{}))if(key.startsWith(${JSON.stringify(screen.id+':')}))delete globalThis[name][key];})()`);
  await evaluate(`globalThis.__morselupReview.selectScreen(${JSON.stringify(screen.id)})`);
  await sleep(1800);
  for(let attempt=0;attempt<25;attempt++){
   const loading=await evaluate(`(()=>{const g=Object.values(globalThis.__morselupGeometry??{}).filter(x=>x.screenId===${JSON.stringify(screen.id)}&&x.svg);return g.filter(x=>!globalThis.__morselupSvgStatus?.[x.screenId+':'+x.slot]?.loaded).length})()`);
   if(!loading)break;
   await sleep(200);
  }
  const state=JSON.parse(await evaluate('JSON.stringify({current:globalThis.__morselupReview.current,width:globalThis.__morselupReview.width,height:globalThis.__morselupReview.height,scale:globalThis.__morselupReview.scale})'));
  if(state.current!==screen.id||state.width!==428||state.height!==926||state.scale!==1)throw new Error('Screen or viewport is not ready: '+JSON.stringify(state));
  const output='verification/android/'+screen.id.replace(':','-')+'.png';
  fs.writeFileSync(output,execFileSync(adb,['exec-out','screencap','-p'],{maxBuffer:8*1024*1024}));
  const tiles=[{offset:0,output}];
  if(screen.height>926){
   fs.mkdirSync('verification/android-tiles',{recursive:true});
   const offsets=[];for(let y=740;y<screen.height-926;y+=740)offsets.push(y);offsets.push(screen.height-926);
   for(const offset of offsets){
    await evaluate(`globalThis.__morselupScroll[${JSON.stringify(screen.id)}](${offset})`);await sleep(350);
    const tileOutput='verification/android-tiles/'+screen.id.replace(':','-')+'_'+offset+'.png';
    fs.writeFileSync(tileOutput,execFileSync(adb,['exec-out','screencap','-p'],{maxBuffer:8*1024*1024}));tiles.push({offset,output:tileOutput});
   }
   await evaluate(`globalThis.__morselupScroll[${JSON.stringify(screen.id)}](0)`);await sleep(100);
  }
  const geometry=JSON.parse(await evaluate(`JSON.stringify(Object.values(globalThis.__morselupGeometry??{}).filter(x=>x.screenId===${JSON.stringify(screen.id)}))`));
  let expectedAssets=0;function countAssets(n){if(typeof n!=='object')return;if(n.tag==='img')expectedAssets++;n.children.forEach(countAssets);}countAssets(screen.root);
  if(geometry.length!==expectedAssets)throw new Error(`${screen.id}: expected ${expectedAssets} measured asset slots, got ${geometry.length}`);
  const svgStatus=JSON.parse(await evaluate(`JSON.stringify(Object.fromEntries(Object.entries(globalThis.__morselupSvgStatus??{}).filter(([key])=>key.startsWith(${JSON.stringify(screen.id+':')}))))`));
  results.push({id:screen.id,name:screen.name,output,tiles,...state,geometry,svgStatus});
  merged.set(screen.id,results[results.length-1]);
  fs.writeFileSync('verification/android-results.json',JSON.stringify({buildHash,validationNotes:previous.validationNotes??[],results:[...merged.values()],errors},null,2));
  console.log(screen.id,screen.name,'assets:',geometry.length,'scale:',state.scale);
 }
 fs.writeFileSync('verification/android-results.json',JSON.stringify({buildHash,validationNotes:previous.validationNotes??[],results:[...merged.values()],errors},null,2));
 ws.close();
 console.log('Verified',results.length,'screens. Runtime exceptions:',errors.length);
 if(errors.length||results.some(r=>r.current!==r.id))process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});

