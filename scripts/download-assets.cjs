const fs=require('fs');
const {spawn}=require('child_process');
const assets=JSON.parse(fs.readFileSync('design/downloads.json','utf8'));
fs.mkdirSync('assets/figma',{recursive:true});
let cursor=0, complete=0;
const failed=[];
async function worker(){
 while(cursor<assets.length){
  const a=assets[cursor++], path='assets/figma/'+a.file;
  if(fs.existsSync(path)&&fs.statSync(path).size>0){complete++;continue;}
  const code=await new Promise(resolve=>{const p=spawn('curl.exe',['-f','-L','--silent','--show-error','--retry','2','-o',path,a.url],{stdio:['ignore','ignore','pipe']}); let err='';p.stderr.on('data',d=>err+=d);p.on('exit',code=>{if(code)console.error(a.file,err.trim());resolve(code)});});
  if(code)failed.push(a.file);else complete++;
  if(complete%100===0)console.log('Downloaded',complete,'/',assets.length);
 }
}
Promise.all(Array.from({length:8},worker)).then(()=>{console.log({complete,failed});if(failed.length)process.exitCode=1;});
