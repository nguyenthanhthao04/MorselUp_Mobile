const {spawnSync}=require('child_process');
const steps=[
 [process.execPath,['scripts/verify-android.cjs','--resume']],
 [process.execPath,['scripts/audit-navigation.cjs','--resume']],
 [process.execPath,['scripts/verify-manual-overlays.cjs']],
 ['python',['-X','utf8','scripts/compare-all.py']],
 [process.execPath,['scripts/audit-assets.cjs']],
 [process.execPath,['scripts/audit-svg-cache.cjs']],
 [process.execPath,['scripts/summarize-verification.cjs']],
 [process.execPath,['scripts/write-audit-report.cjs']],
];
let failed=false;
for(const [command,args] of steps){
 console.log('Running',args.join(' '));
 const result=spawnSync(command,args,{stdio:'inherit'});
 if(result.status!==0){failed=true;if(args[0]==='scripts/verify-android.cjs')break;}
}
if(failed)process.exitCode=1;
