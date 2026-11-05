// Exact byte matches share the same native asset URI and decoded-image cache.
// All original downloaded files and every design slot are preserved.
const fs=require('fs'),crypto=require('crypto');
const downloads=JSON.parse(fs.readFileSync('design/downloads.json','utf8'));
const previous=fs.readFileSync('src/assets.ts','utf8'),metadata={};
for(const m of previous.matchAll(/^\s*(a\d+): \{.*svg: (true|false), width: ([^,]+), height: ([^ }]+) \},$/gm))metadata[m[1]]={svg:m[2],width:m[3],height:m[4]};
if(Object.keys(metadata).length!==downloads.length)throw new Error('Asset metadata is incomplete');
const byHash=new Map(),aliases=[],lines=[];
for(let i=0;i<downloads.length;i++){
 const file=downloads[i].file,key='a'+i,m=metadata[key],hash=crypto.createHash('sha256').update(fs.readFileSync('assets/figma/'+file)).digest('hex');
 const canonical=byHash.get(hash)??file;byHash.set(hash,canonical);
 const runtimeFile=canonical.endsWith('.svg')?canonical+'data':canonical;
 aliases.push({key,file,canonical,sha256:hash});
 lines.push(` ${key}: { source: require(${JSON.stringify('../assets/figma/'+runtimeFile)}), svg: ${m.svg}, width: ${m.width}, height: ${m.height} },`);
}
fs.writeFileSync('src/assets.ts','// Original Figma assets. Exact byte matches share a native URI; dimensions remain original.\nexport const assets: Record<string, {source:number;svg:boolean;width?:number;height?:number}> = {\n'+lines.join('\n')+'\n};\n');
fs.writeFileSync('design/asset-aliases.json',JSON.stringify(aliases,null,2));
console.log('Original asset slots:',downloads.length,'unique byte-identical sources:',byHash.size,'aliases:',downloads.length-byHash.size);
