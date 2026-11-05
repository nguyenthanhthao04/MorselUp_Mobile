from PIL import Image, ImageDraw
from pathlib import Path
import json

report=json.loads(Path('verification/android-results.json').read_text(encoding='utf-8'))
results=report['results']
for page in range((len(results)+11)//12):
    canvas=Image.new('RGB',(856,1497),'#dce3d8')
    draw=ImageDraw.Draw(canvas)
    for j,item in enumerate(results[page*12:page*12+12]):
        x=(j%4)*214;y=(j//4)*499
        im=Image.open(item['output']).convert('RGB').resize((214,463),Image.Resampling.LANCZOS)
        canvas.paste(im,(x,y+36))
        draw.text((x+5,y+5),item['id'],fill='#203c30')
        draw.text((x+5,y+20),item['name'][:30],fill='#203c30')
    canvas.save(f'verification/contact-{page+1}.jpg',quality=90)
print(f'{len(results)} screens, {(len(results)+11)//12} contact sheets')
