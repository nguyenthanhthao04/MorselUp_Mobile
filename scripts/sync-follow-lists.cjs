// Two distinct source frames, mapped to the two existing app routes.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8')),write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2));
const configs=[
 {reference:'1138:13438',route:'16:16061',back:'1138:13443',backRoute:'16:16066',card:'1534:658',list:'1138:13446',name:'Người theo dõi',scroll:'native:followers-scroll'},
 {reference:'1138:13632',route:'16:16194',back:'1138:13637',backRoute:'16:16199',card:'1534:701',list:'1138:13640',name:'Đang theo dõi',scroll:'native:following-scroll'},
];
const downloads=read('design/downloads.json'),bounds=read('design/node-bounds.json'),parents=read('design/node-parents.json'),visual=read('design/node-visual-bounds.json'),frames=read('design/frames.json'),prototype=read('design/prototype.json');
for(const c of configs){
 const prefix='design/reference-'+c.reference.replace(':','-'),source=fs.readFileSync(prefix+'.jsx','utf8'),geometry=read(prefix+'-geometry.json');
 const remap=id=>id===c.reference?c.route:id===c.back?c.backRoute:'ref-rsAx:'+id;
 for(const m of source.matchAll(/const \w+ = "(https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^\"]+)"/g)){
  const url=m[1],file=path.basename(url),target='assets/figma/'+file;
  if(!fs.existsSync(target))execFileSync('curl.exe',['-f','-L','--silent','--show-error','--retry','2','-o',target,url]);
  if(!downloads.some(a=>a.file===file))downloads.push({file,url});
 }
 for(const n of geometry){const id=remap(n.id);bounds[id]={x:n.x,y:n.y,width:n.width,height:n.height};parents[id]=remap(n.parent);visual[id]=n.visual;}
 // The fixed outer card draws the outline; only this inner native view scrolls.
 bounds[c.scroll]={x:0,y:0,width:340,height:670};parents[c.scroll]=remap(c.card);visual[c.scroll]=[0,0,340,670];parents[remap(c.list)]=c.scroll;
 const adapted=source.replace('overflow-x-clip overflow-y-auto','overflow-clip')
  .replace('data-node-id="'+c.card+'">','data-node-id="'+c.card+'"><div className="absolute left-0 top-0 size-full overflow-y-auto" data-node-id="'+c.scroll+'">')
  .replace('      <div className="-translate-x-1/2 absolute h-[51px]','      </div>\n      <div className="-translate-x-1/2 absolute h-[51px]');
 fs.writeFileSync('design/'+c.route.replace(':','-')+'.jsx',adapted.replace(/data-node-id="([^"]+)"/g,(_,id)=>'data-node-id="'+(id===c.scroll?id:remap(id))+'"'));
 for(const f of [frames.find(f=>f.id===c.route),prototype.frames.find(f=>f.id===c.route)]){f.height=926;f.name=c.name;}
 console.log(c.name,c.reference,'->',c.route,geometry.length,'layers');
}
write('design/downloads.json',downloads);write('design/node-bounds.json',bounds);write('design/node-parents.json',parents);write('design/node-visual-bounds.json',visual);write('design/frames.json',frames);write('design/prototype.json',prototype);
