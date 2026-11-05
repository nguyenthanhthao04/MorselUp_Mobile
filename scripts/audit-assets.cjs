const fs=require('fs');
const screens=JSON.parse(fs.readFileSync('src/generated/screens.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('design/downloads.json','utf8'));
const slots=[];const errors=[];
function walk(node,screen,path){
 if(typeof node==='string')return;
 const next=[...path,node.name||node.id||node.tag];
 if(node.tag==='img'){
  const index=Number(node.asset?.slice(1)),asset=manifest[index];
  if(!asset){errors.push(`${screen.id}: no asset for ${node.id}`);return;}
  const local='assets/figma/'+asset.file,bytes=fs.existsSync(local)?fs.statSync(local).size:0;
  if(!bytes)errors.push(`${screen.id}: empty ${local}`);
  slots.push({screen:screen.id,layer:node.id,slot:node.slot,path:next.join(' / '),file:local,bytes,geometry:node.style});
 }
 node.children.forEach(child=>walk(child,screen,next));
}
screens.forEach(s=>walk(s.root,s,[]));
fs.mkdirSync('verification',{recursive:true});
fs.writeFileSync('verification/asset-slots.json',JSON.stringify(slots,null,2));
console.log({screens:screens.length,localFiles:manifest.length,renderedAssetSlots:slots.length,errors});
if(errors.length)process.exitCode=1;
