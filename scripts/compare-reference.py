from PIL import Image, ImageChops, ImageDraw, ImageStat
from pathlib import Path
import json

pairs=[('splash','16-13885'),('home','16-15184'),('profile','16-17298')]
report=[]
for name,node in pairs:
    ref=Image.open(f'verification/reference-{name}.png').convert('RGB')
    if ref.width!=428:
        design_height={'home':1892,'profile':1769}[name]
        ref=ref.resize((428,design_height),Image.Resampling.LANCZOS)
    actual=Image.open(f'verification/android/{node}.png').convert('RGB')
    if ref.height>926:
        expected=Image.new('RGB',(428,926))
        expected.paste(ref.crop((0,0,428,846)),(0,0))
        expected.paste(ref.crop((0,ref.height-80,428,ref.height)),(0,846))
    else:
        expected=ref
    expected.save(f'verification/expected-{name}.png')
    delta=ImageChops.difference(expected,actual)
    canvas=Image.new('RGB',(428*3,956),'#e9e9e9')
    canvas.paste(expected,(0,30));canvas.paste(actual,(428,30));canvas.paste(delta,(856,30))
    d=ImageDraw.Draw(canvas);d.text((12,8),'Figma',fill='black');d.text((440,8),'React Native - Android',fill='black');d.text((868,8),'Absolute difference',fill='black')
    canvas.save(f'verification/compare-{name}.png')
    # Exclude only Expo Go's floating Tools button; it is outside application UI.
    delta.paste((0,0,0),(350,0,428,105))
    stat=ImageStat.Stat(delta)
    report.append({'screen':name,'mean_absolute_channel_error':sum(stat.mean)/3,'note':'Expo Go Tools overlay excluded from metric. No pixel-accuracy pass threshold asserted.'})
Path('verification/pixel-comparison.json').write_text(json.dumps(report,indent=2))
print(json.dumps(report,indent=2))
