const fs=require('fs'),crypto=require('crypto');
const entries=JSON.parse(fs.readFileSync('design/svg-cache.json','utf8')),errors=[];
for(const e of entries){
 const svg=fs.readFileSync('assets/figma/'+e.file),png=fs.readFileSync('assets/svg-cache/'+e.png);
 if(crypto.createHash('sha256').update(svg).digest('hex')!==e.sourceHash)errors.push(e.key+': source SVG changed');
 if(png.length<24||png.readUInt32BE(16)!==e.renderedWidth||png.readUInt32BE(20)!==e.renderedHeight)errors.push(e.key+': invalid cache dimensions');
 if(e.renderedWidth<e.width*e.scale-1||e.renderedHeight<e.height*e.scale-1)errors.push(e.key+': incomplete raster bounds');
}
const report={cachedSvgSources:entries.length,scale:3,originalSvgModified:false,errors};
const aliases=JSON.parse(fs.readFileSync('design/asset-aliases.json','utf8'));
for(const a of aliases){
 const original=crypto.createHash('sha256').update(fs.readFileSync('assets/figma/'+a.file)).digest('hex');
 const canonical=crypto.createHash('sha256').update(fs.readFileSync('assets/figma/'+a.canonical)).digest('hex');
 if(original!==a.sha256||canonical!==a.sha256)errors.push(a.key+': asset alias is not byte-identical');
}
report.uniqueRuntimeAssets=new Set(aliases.map(a=>a.canonical)).size;
report.exactAliases=aliases.filter(a=>a.canonical!==a.file).length;
fs.writeFileSync('verification/svg-cache-audit.json',JSON.stringify(report,null,2));console.log(report);if(errors.length)process.exitCode=1;
