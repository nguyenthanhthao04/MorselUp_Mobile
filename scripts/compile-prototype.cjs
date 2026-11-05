const fs=require('fs');
const screens=JSON.parse(fs.readFileSync('src/generated/screens.json','utf8'));
const prototype=JSON.parse(fs.readFileSync('design/prototype.json','utf8'));
const parents=JSON.parse(fs.readFileSync('design/node-parents.json','utf8'));
const bounds=JSON.parse(fs.readFileSync('design/node-visual-bounds.json','utf8'));
const output={};
for(const screen of screens){
 const scrolls={};
 function walk(n){
  if(typeof n!=='object')return;
  const height=typeof n.style.height==='number'?n.style.height:0;
  const contentHeight=Math.max(height,...n.children.filter(c=>typeof c==='object').map(c=>(typeof c.style.top==='number'?c.style.top:0)+(typeof c.style.height==='number'?c.style.height:0)));
  if(n.id&&n.scroll&&height&&contentHeight>height+1){
   let x=0,y=0,id=n.id;
   while(id&&id!==screen.id){const b=bounds[id];if(!b)throw new Error('Missing bounds: '+id);x+=b[0];y+=b[1];id=parents[id];}
   scrolls[n.id]={origin:{x,y},height,contentHeight,interactionIds:[]};
  }
  n.children.forEach(walk);
 }
 walk(screen.root);
 for(const i of prototype.frames.find(f=>f.id===screen.id).interactions){
  let p=parents[i.id];
  while(p&&p!==screen.id){if(scrolls[p]){scrolls[p].interactionIds.push(i.id);break;}p=parents[p];}
 }
 if(Object.keys(scrolls).length)output[screen.id]=scrolls;
}
fs.writeFileSync('src/generated/nested-hotspots.json',JSON.stringify(output,null,2));
console.log('Nested prototype hotspots:',Object.keys(output).length,'frames.');
