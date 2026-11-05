from pathlib import Path
from PIL import Image, ImageChops, ImageDraw
import numpy as np
from skimage.metrics import structural_similarity
import json
import math

frames=json.loads(Path('design/frames.json').read_text(encoding='utf-8'))
screens=json.loads(Path('src/generated/screens.json').read_text(encoding='utf-8'))
by_id={s['id']:s for s in screens}
effect_bounds={f['id']:f for f in json.loads(Path('design/frame-render-bounds.json').read_text(encoding='utf-8'))}
results=[]
verified={r['id']:r for r in json.loads(Path('verification/android-results.json').read_text(encoding='utf-8'))['results'] if 'tiles' in r}
out=Path('verification/comparison');out.mkdir(exist_ok=True)
for f in frames:
    if f['id'] not in verified:continue
    key=f['id'].replace(':','-')
    refpath=Path(f'verification/figma-1x/{key}.png')
    actualpath=Path(f'verification/android/{key}.png')
    if not refpath.exists() or not actualpath.exists():continue
    ref=Image.open(refpath).convert('RGBA')
    background=Image.new('RGBA',ref.size,'#faf9f3');background.alpha_composite(ref);ref=background.convert('RGB')
    raw=Image.open(actualpath).convert('RGB')
    actual=raw.resize((428,926),Image.Resampling.LANCZOS)
    small=f['width']<428 or f['height']<926
    if small:
        effect=effect_bounds[f['id']];b=effect['bounds'];r=effect['renderBounds']
        left=(428-f['width'])/2+r['x']-b['x'];top=(926-f['height'])/2+r['y']-b['y'];density=raw.width/428
        # Yoga rounds half pixels upward. Python round() uses bankers' rounding
        # and crops odd-size centered overlays one physical pixel too far left/up.
        px=math.floor(left*density+0.5);py=math.floor(top*density+0.5)
        actual=raw.crop((px,py,px+round(ref.width*density),py+round(ref.height*density))).resize(ref.size,Image.Resampling.LANCZOS)
        tools=(round(354-left),round(10-top),round(418-left),round(102-top))
    else:
        nav=any(isinstance(n,dict) and n.get('name')=='bottom nav' for n in by_id[f['id']]['root']['children'])
        if ref.height>926:
            stitched=Image.new('RGB',ref.size,'#faf9f3')
            tiles=verified[f['id']]['tiles']
            for j,tile in enumerate(tiles):
                im=Image.open(tile['output']).convert('RGB').resize((428,926),Image.Resampling.LANCZOS)
                first=0 if j==0 else 105
                last=846 if nav else 926
                stitched.paste(im.crop((0,first,428,last)),(0,round(tile['offset'])+first))
            if nav:stitched.paste(im.crop((0,846,428,926)),(0,ref.height-80))
            actual=stitched
        tools=(354,10,418,102)
    a=np.array(ref);b=np.array(actual)
    mask=np.ones(a.shape[:2],dtype=bool)
    x1,y1,x2,y2=tools
    mask[max(0,y1):max(0,min(y2,a.shape[0])),max(0,x1):max(0,min(x2,a.shape[1]))]=False
    # Use the SSIM map and a mask, without replacing reference pixels with actual pixels.
    _,sim=structural_similarity(a,b,channel_axis=2,data_range=255,full=True)
    score=float(sim.mean(axis=2)[mask].mean())
    mae=float(np.abs(a.astype(float)-b)[mask].mean())
    passed=score>=.98
    results.append({'id':f['id'],'ssim':score,'mean_absolute_channel_error':mae,'passes_98_ssim':passed,'reference_size':list(Image.open(refpath).size),'compared_size':list(ref.size),'scope':'entire frame; long content stitched from overlapping scroll captures' if f['height']>926 else 'entire frame'})
    delta=ImageChops.difference(ref,actual)
    canvas=Image.new('RGB',(ref.width*3,ref.height+26),'#e9e9e9');draw=ImageDraw.Draw(canvas)
    for i,(title,im) in enumerate([('Figma 1x',ref),('Android at 428x926 dp',actual),('Absolute difference',delta)]):
        canvas.paste(im,(i*ref.width,26));draw.text((i*ref.width+8,8),title,fill='black')
    canvas.save(out/f'{key}.png')
report={'metric':'SSIM, RGB, 7x7 window; pass requires each frame >=0.98','excluded':'Expo Go Tools button and tooltip rectangle only (64x92 logical px); transparent reference pixels composited over app background','reference_count':len(list(Path('verification/figma-1x').glob('*.png'))),'compared':len(results),'passed':sum(r['passes_98_ssim'] for r in results),'minimum_ssim':min((r['ssim'] for r in results),default=0),'mean_ssim':float(np.mean([r['ssim'] for r in results])) if results else 0,'all_frames_pass':len(results)==142 and all(r['passes_98_ssim'] for r in results),'results':results}
Path('verification/visual-audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='results'},indent=2))
print('Lowest:',[(r['id'],round(r['ssim'],4)) for r in sorted(results,key=lambda r:r['ssim'])[:12]])
