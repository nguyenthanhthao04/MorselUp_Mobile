// Compile the high-fidelity Figma responses to native view descriptions.
// Source JSX is provenance only; the app renders React Native primitives.
const fs=require('fs');
const parser=require('@babel/parser');
const frames=JSON.parse(fs.readFileSync('design/frames.json','utf8'));
const bounds=JSON.parse(fs.readFileSync('design/node-bounds.json','utf8'));
const parents=JSON.parse(fs.readFileSync('design/node-parents.json','utf8'));
const visualBounds=JSON.parse(fs.readFileSync('design/node-visual-bounds.json','utf8'));
const nativeTextLayout=JSON.parse(fs.readFileSync('design/native-text-layout.json','utf8'));
const excludedNodes=new Set(Object.keys(JSON.parse(fs.readFileSync('design/excluded-nodes.json','utf8'))));
const assets=JSON.parse(fs.readFileSync('design/downloads.json','utf8'));
const manifest=Object.fromEntries(assets.map((a,i)=>[a.file,{key:'a'+i,file:a.file}]));
// Keep shared icon updates durable without changing the original Figma exports.
const iconOverrides=JSON.parse(fs.readFileSync('design/icon-asset-overrides.json','utf8'));
for(const [original,replacement] of Object.entries(iconOverrides)){
 if(!manifest[original]||!manifest[replacement])throw new Error('Unknown icon override: '+original+' -> '+replacement);
 manifest[original]=manifest[replacement];
}
const fontNames={Extra_Light:'Inter_200ExtraLight',Light:'Inter_300Light',Regular:'Inter_400Regular',Medium:'Inter_500Medium',Semi_Bold:'Inter_600SemiBold',Bold:'Inter_700Bold',Extra_Bold:'Inter_800ExtraBold',Black:'Inter_900Black',Italic:'Inter_400Regular_Italic'};
const unsupported=new Set();
function value(raw){
 if(raw.startsWith('['))raw=raw.slice(1,-1);
 raw=raw.replaceAll('_',' ');
 if(raw.startsWith('color:'))raw=raw.slice(6);
 if(raw.startsWith('var('))raw=raw.slice(raw.lastIndexOf(',')+1,-1);
 if(raw==='full')return '100%';if(raw==='px')return 1;
 if(raw==='1/2')return '50%';if(raw==='1/4')return '25%';
 if(/^[-\d.]+px$/.test(raw))return parseFloat(raw);
 if(/^[-\d.]+$/.test(raw))return Number(raw)*4;
 return raw;
}
function styles(cls){
 const s={};const text={};const extra={};let line;
 for(const t of cls.split(/\s+(?![^\[]*\])/)){
  let m;
  if(['absolute','relative'].includes(t)){s.position=t;continue;}
  if(t==='flex'||t==='inline-grid'){s.flexDirection='row';if(t==='inline-grid'){s.flexDirection='column';extra.grid=true;}continue;}
  if(t==='flex-col'){s.flexDirection='column';continue;}
  if(t==='flex-row'){s.flexDirection='row';continue;}
  if(t==='contents'){extra.contents=true;continue;}
  if(t==='flex-wrap'){s.flexWrap='wrap';continue;}
  if(t==='flex-none'||t==='shrink-0'){s.flexShrink=0;continue;}
  if(t==='flex-[1_0_0]'){s.flexGrow=1;s.flexShrink=0;s.flexBasis=0;continue;}
  if(t==='grow'){s.flexGrow=1;continue;}
  if(t==='overflow-clip'||t==='overflow-hidden'){s.overflow='hidden';continue;}
  if(t==='overflow-x-clip')continue;
  if(t==='overflow-y-auto'||t==='overflow-auto'){extra.scroll=true;continue;}
  if(t==='self-stretch'){s.alignSelf='stretch';continue;}
  if(t==='min-h-px'){s.minHeight=1;continue;}
  if(t==='opacity-70'){s.opacity=0.7;continue;}
  if(t==='opacity-0'){s.opacity=0;continue;}
  if(t==='scale-y-94'){s.transform??=[];s.transform.push({scaleY:0.94});continue;}
  if((m=t.match(/^skew-x-\[([^\]]+)\]$/))){s.transform??=[];s.transform.push({skewX:m[1]});continue;}
  if(t==='cursor-pointer'){extra.interactive=true;continue;}
  if(t==='size-full'){s.width='100%';s.height='100%';continue;}
  if((m=t.match(/^(w|h|size|min-w|max-w|min-h)-(.+)$/))){const v=value(m[2]);const k={w:'width',h:'height','min-w':'minWidth','max-w':'maxWidth','min-h':'minHeight'}[m[1]];if(m[1]==='size'){s.width=v;s.height=v;}else if(!['min-content','none'].includes(v))s[k]=v;continue;}
  if((m=t.match(/^(top|left|bottom|right)-(.+)$/))){const v=value(m[2]);if(typeof v==='string'&&v.startsWith('calc(')){const c=v.match(/calc\(([-\d.]+)%([+-][\d.]+)px\)/);if(c){s[m[1]]=c[1]+'%';s[{top:'marginTop',left:'marginLeft',right:'marginRight',bottom:'marginBottom'}[m[1]]]=+c[2];}}else s[m[1]]=v;continue;}
  if((m=t.match(/^inset-(.+)$/))){const vs=(m[1].startsWith('[')?m[1].slice(1,-1):m[1]).split('_').map(x=>value('['+x+']'));s.top=vs[0];s.right=vs[1]??vs[0];s.bottom=vs[2]??vs[0];s.left=vs[3]??vs[1]??vs[0];continue;}
  if((m=t.match(/^([mp])([xytrbl]?)-(.+)$/))){const prefix=m[1]==='p'?'padding':'margin',v=value(m[3]);const dirs={x:['Left','Right'],y:['Top','Bottom'],t:['Top'],r:['Right'],b:['Bottom'],l:['Left'],'':['']};for(const d of dirs[m[2]])s[prefix+d]=v;continue;}
  if((m=t.match(/^gap(?:-(x|y))?-(.+)$/))){const raw=m[2].replace(/^\[|\]$/g,'').split('_');s[m[1]==='x'?'columnGap':m[1]==='y'?'rowGap':'gap']=value('['+raw[0]+']');if(raw.length>1){s.rowGap=value('['+raw[0]+']');s.columnGap=value('['+raw[1]+']');delete s.gap;}continue;}
  if((m=t.match(/^items-(start|end|center|stretch)$/))){s.alignItems={start:'flex-start',end:'flex-end',center:'center',stretch:'stretch'}[m[1]];continue;}
  if((m=t.match(/^justify-(start|end|center|between)$/))){s.justifyContent={start:'flex-start',end:'flex-end',center:'center',between:'space-between'}[m[1]];continue;}
  if((m=t.match(/^bg-(.+)$/))){if(t==='bg-gradient-to-b'){extra.gradient=true;continue;}if(t==='bg-clip-padding')continue;s.backgroundColor=value(m[1]);continue;}
  if((m=t.match(/^(from|via|to)-(.+)$/))){continue;}
  if((m=t.match(/^rounded(?:-([tlbr]{1,2}))?-(.+)$/))){let v=m[2]==='full'?999:value(m[2]);if(m[2]==='none')v=0;if(!m[1])s.borderRadius=v;else {const corner={tl:'TopLeft',tr:'TopRight',bl:'BottomLeft',br:'BottomRight'}[m[1]];if(corner)s['border'+corner+'Radius']=v;}continue;}
  if(t==='border'){s.borderWidth=1;continue;}
  if(t==='border-b'){s.borderBottomWidth=1;continue;}if(t==='border-t'){s.borderTopWidth=1;continue;}
  if((m=t.match(/^border-([ltrb])(?:-(\d+|\[[\d.]+px\]))?$/))){s[{l:'borderLeftWidth',t:'borderTopWidth',r:'borderRightWidth',b:'borderBottomWidth'}[m[1]]]=m[2]?.startsWith('[')?value(m[2]):Number(m[2]??1);continue;}
  if(t==='border-solid'){s.borderStyle='solid';continue;}
  if(t==='border-dashed'){s.borderStyle='dashed';continue;}
  if((m=t.match(/^border-(.+)$/))){const v=/^\d+$/.test(m[1])?Number(m[1]):value(m[1]);if(typeof v==='number')s.borderWidth=v;else s.borderColor=v;continue;}
  if((m=t.match(/^font-\['Inter:([^']+)'\]$/))){text.fontFamily=fontNames[m[1]];continue;}
  if((m=t.match(/^font-\['Sour_Gummy:(Regular|Bold)'\]$/))){text.fontFamily=m[1]==='Bold'?'SourGummy_700Bold':'SourGummy_400Regular';continue;}
  if(t.startsWith('font-')||t==='not-italic')continue;
  if((m=t.match(/^text-(.+)$/))){const v=value(m[1]);if(['center','left','right'].includes(v))text.textAlign=v;else if(typeof v==='number')text.fontSize=v;else text.color=v;continue;}
  if((m=t.match(/^leading-\[(.+)\]$/))){line=m[1];continue;}
  if((m=t.match(/^tracking-\[(.+)\]$/))){text.letterSpacing=parseFloat(m[1]);continue;}
  if(t==='underline'){text.textDecorationLine='underline';continue;}
  if(t==='uppercase'){text.textTransform='uppercase';continue;}
  if(t==='italic'){text.fontStyle='italic';continue;}
  if(t==='whitespace-nowrap'||t==='whitespace-pre'){extra.nowrap=true;continue;}
  if(t==='whitespace-pre-wrap'||t.startsWith('decoration-')||t.startsWith('[text-')||t==='[word-break:break-word]')continue;
  if((m=t.match(/^(-?)translate-([xy])-(.+)$/))){const v=m[3]==='1/2'?'50%':m[3]==='full'?'100%':value(m[3]);s.transform??=[];s.transform.push({[m[2]==='x'?'translateX':'translateY']:typeof v==='number'?(m[1]?-v:v):(m[1]?'-':'')+v});continue;}
  if((m=t.match(/^(-?)rotate-(.+)$/))){s.transform??=[];const degrees=m[2].replace(/^\[|\]$/g,'').replace(/deg$/,'');s.transform.push({rotate:(m[1]?'-':'')+degrees+'deg'});continue;}
  if(t==='-scale-y-100'){s.transform??=[];s.transform.push({scaleY:-1});continue;}
  if(t==='object-cover'){extra.fit='cover';continue;}
  if(t==='object-contain'){extra.fit='contain';continue;}
  if(t==='pointer-events-none'){extra.pointerEvents='none';continue;}
  if(['block','content-stretch','content-start','content-center','content-end','col-1','row-1','place-items-start','grid-cols-[max-content]','grid-rows-[max-content]','leading-[0]'].includes(t))continue;
  if(t.startsWith('shadow-[')){s.boxShadow=t.slice(8,-1).replaceAll('_',' ');continue;}
  if(t.startsWith('shadow-')){s.boxShadow='0px 2px 8px rgba(0,0,0,0.12)';continue;}
  if(t.startsWith('drop-shadow-[')){
   const css=t.slice(13,-1).replaceAll('_',' ');
   // CSS filter drop-shadow uses standard deviation; box-shadow uses twice it.
   s.boxShadow=css.replace(/^([-\d.]+px\s+[-\d.]+px\s+)([\d.]+)px/,(_,xy,blur)=>xy+(Number(blur)*2)+'px');continue;
  }
  if((m=t.match(/^blur-\[([\d.]+)px\]$/))){s.filter=[{blur:Number(m[1])}];continue;}
  if((m=t.match(/^backdrop-blur-\[([\d.]+)px\]$/))){extra.backdropBlur=Number(m[1]);continue;}
  if(t==='')continue;
  unsupported.add(t);
 }
 if(line&&line!=='0')extra.line=line;
 return {style:s,textStyle:text,...extra};
}
function literal(n,vars={}){if(!n)return '';if(n.type==='StringLiteral'||n.type==='NumericLiteral')return n.value;if(n.type==='TemplateLiteral')return n.quasis.map(q=>q.value.cooked).join('');if(n.type==='Identifier')return vars[n.name]??'';if(n.type==='LogicalExpression')return literal(n.left,vars)||literal(n.right,vars);return '';}
function convert(n,vars){
 if(n.type==='JSXText'){const v=n.value.replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(Boolean).join(' ');return v||null;}
 if(n.type==='JSXExpressionContainer')return String(literal(n.expression));
 if(n.type!=='JSXElement')return null;
 const tag=n.openingElement.name.name,attrs={};for(const a of n.openingElement.attributes){if(a.type==='JSXAttribute')attrs[a.name.name]=a.value?.type==='JSXExpressionContainer'?literal(a.value.expression,vars):a.value?.value??true;}
 if(excludedNodes.has(attrs['data-node-id']))return null;
 if(vars.__components?.[tag])return convert(vars.__components[tag],{...vars,...attrs});
 const cls=attrs.className??'';
 const result={tag,id:attrs['data-node-id'],name:attrs['data-name'],...styles(cls),children:n.children.map(c=>convert(c,vars)).filter(c=>c!==null&&c!=='')};
 if((tag==='p'||tag==='span')&&result.nowrap&&result.style.width===undefined&&bounds[result.id])result.style.width=bounds[result.id].width+0.25;
 // CSS resolves 100% children inside intrinsic containers using the content
 // size; Yoga needs the Figma container's measured dimensions explicitly.
 if(!['p','span','img'].includes(tag)&&!result.contents&&bounds[result.id]){
  if(result.style.width===undefined&&!result.style.flexGrow)result.style.width=bounds[result.id].width;
  if(result.style.height===undefined&&!result.style.flexGrow)result.style.height=bounds[result.id].height;
 }
 // Figma exports overlapping single-cell CSS grids. Native layout uses a
 // measured container with children at their original offsets in that cell.
 if(result.grid)for(const child of result.children)if(typeof child==='object'){
  child.style.position='absolute';child.style.left=child.style.marginLeft??0;child.style.top=child.style.marginTop??0;
  delete child.style.marginLeft;delete child.style.marginTop;
 }
 if(tag==='a'||tag==='button')result.interactive=true;
 if(/^[A-Z]/.test(tag))result.props=attrs;
 if(tag==='img'){const file=String(attrs.src).split('/').pop();result.asset=manifest[file]?.key;result.alt=attrs.alt;result.children=[];}
 return result;
}
const screens=[],missing=[];
for(const frame of frames){
 const path='design/'+frame.id.replace(':','-')+'.jsx';
 if(!fs.existsSync(path)||!fs.readFileSync(path,'utf8').includes('export default')){missing.push(frame);continue;}
 const code=fs.readFileSync(path,'utf8');let ast;try{ast=parser.parse(code,{sourceType:'module',plugins:['jsx','typescript']});}catch(e){throw new Error(path+': '+e.message);}const vars={};let root;
 vars.__components={};
 for(const n of ast.program.body){if(n.type==='VariableDeclaration')for(const d of n.declarations)vars[d.id.name]=literal(d.init);if(n.type==='FunctionDeclaration')vars.__components[n.id.name]=n.body.body.find(n=>n.type==='ReturnStatement')?.argument;if(n.type==='ExportDefaultDeclaration')root=n.declaration.body.body.find(n=>n.type==='ReturnStatement')?.argument;}
 if(!root){missing.push(frame);continue;}
 const nativeRoot=convert(root,vars);
 function assignSlots(node,path='root',parent){
  if(typeof node!=='object')return;
  node.slot=path;
  const b=bounds[node.id];
  // Figma groups exported as display:contents still define the coordinate
  // system for their original children. Keep that system in native views.
  if(b&&node.contents){node.contents=false;Object.assign(node.style,{width:b.width,height:b.height});}
  // Use the original Figma layer coordinates when the exported JSX preserves
  // its parent. This avoids Yoga rounding and intrinsic text-width drift.
  if(b&&parent?.id&&parents[node.id]===parent.id&&!node.contents){
   for(const k of ['right','bottom','margin','marginTop','marginBottom','marginLeft','marginRight','flexGrow','flexBasis'])delete node.style[k];
   const v=visualBounds[node.id];
   Object.assign(node.style,{position:'absolute',left:v?.[0]??b.x,top:v?.[1]??b.y,width:b.width,height:b.height});
   if(node.style.transform)node.style.transform=node.style.transform.filter(t=>!('translateX'in t)&&!('translateY'in t));
  }
  const correction=nativeTextLayout[node.id];
  if(correction){Object.assign(node.style,correction.style);Object.assign(node.textStyle,correction.textStyle);}
  node.children.forEach((child,i)=>assignSlots(child,path+'/'+i,node));
 }
 assignSlots(nativeRoot);
 screens.push({...frame,root:nativeRoot});
}
fs.mkdirSync('src/generated',{recursive:true});
for(const asset of assets)if(asset.file.endsWith('.svg'))fs.copyFileSync('assets/figma/'+asset.file,'assets/figma/'+asset.file+'data');
fs.writeFileSync('src/generated/screens.json',JSON.stringify(screens));
fs.writeFileSync('design/missing-frames.json',JSON.stringify(missing,null,2));
const assetCode=assets.map((a,i)=>{const p='assets/figma/'+a.file;let width,height;if(a.file.endsWith('.svg')&&fs.existsSync(p)){const root=fs.readFileSync(p,'utf8').match(/<svg\b[^>]*>/)?.[0]??'';width=Number(root.match(/\bwidth="([\d.]+)"/)?.[1]);height=Number(root.match(/\bheight="([\d.]+)"/)?.[1]);}return `  a${i}: { source: require('../assets/figma/${a.file.endsWith('.svg')?a.file+'data':a.file}'), svg: ${a.file.endsWith('.svg')}, width: ${width||'undefined'}, height: ${height||'undefined'} },`;}).join('\n');
fs.writeFileSync('src/assets.ts',`// Local original Figma assets. SVG dimensions preserve each asset's root size.\nexport const assets: Record<string, {source:number;svg:boolean;width?:number;height?:number}> = {\n${assetCode}\n};\n`);
fs.writeFileSync('design/unsupported-classes.json',JSON.stringify([...unsupported],null,2));
console.log({screens:screens.length,missing:missing.length,unsupported:[...unsupported]});

