const fs = require('fs');
const files = fs.readdirSync('design').filter(f=>f.endsWith('.jsx'));
const tokens = new Set();
const assets = new Map();
let valid=0;
for(const f of files){
 const s=fs.readFileSync('design/'+f,'utf8');
 if(!s.includes('export default'))continue;
 valid++;
 for(const m of s.matchAll(/className="([^"]*)"/g)) m[1].split(/\s+(?![^\[]*\])/).forEach(t=>tokens.add(t));
 for(const m of s.matchAll(/https:\/\/www\.figma\.com\/api\/mcp\/asset\/([\w-]+\.(?:png|svg|jpg|jpeg|webp))/g))assets.set(m[1],m[0]);
}
fs.writeFileSync('design/class-tokens.json',JSON.stringify([...tokens].sort(),null,2));
fs.writeFileSync('design/downloads.json',JSON.stringify([...assets].map(([file,url])=>({file,url})),null,2));
console.log({valid,assets:assets.size});
