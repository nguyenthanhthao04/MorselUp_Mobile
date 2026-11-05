from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
files=sorted(Path('verification/figma').glob('*.png'))
for page in range((len(files)+11)//12):
    canvas=Image.new('RGB',(856,1497),'#dce3d8')
    draw=ImageDraw.Draw(canvas)
    for j,path in enumerate(files[page*12:page*12+12]):
        x=(j%4)*214;y=(j//4)*499
        im=Image.open(path).convert('RGB')
        thumb=ImageOps.contain(im,(214,463),Image.Resampling.LANCZOS)
        canvas.paste(thumb,(x+(214-thumb.width)//2,y+36))
        draw.text((x+5,y+8),path.stem,fill='#203c30')
    canvas.save(f'verification/figma-reference-{page+1}.jpg',quality=90)
print(f'{len(files)} Figma reference frames')
