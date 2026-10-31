# Flair Studio — versions allégées des images (WebP, plusieurs largeurs).
#
# À lancer depuis le dossier du site, après avoir ajouté ou remplacé une image :
#     python outils/images.py
#
# 1. Pour chaque photo .jpg utilisée par une vignette (<img class="img ...">) ou par un projet (js/projects.js),
#    crée des copies WebP de 480, 800, 1200 et 1600 px de large (assets/img/480/nom.webp, ...)
#    et une copie WebP à la taille d'origine (assets/img/nom.webp). Le .jpg d'origine reste la référence.
# 2. Écrit js/images.js : les largeurs disponibles pour chaque photo (utilisé par la page projet).
# 3. Met à jour l'attribut srcset des vignettes dans les pages .html. L'attribut sizes (largeur affichée)
#    est gardé ; une nouvelle vignette reçoit une valeur par défaut, à ajuster si elle est plus grande qu'une carte.
# Les fichiers déjà à jour ne sont pas recréés. Nécessite Pillow (pip install pillow).
import glob, json, os, re
from PIL import Image

WIDTHS = (480, 800, 1200, 1600)
QUALITY = 80
DEFAULT_SIZES = '(max-width: 760px) 100vw, 25vw'
IMG_TAG = re.compile(r'<img\b[^>]*\bclass="(?:[^"]* )?img(?: [^"]*)?"[^>]*>')

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))

def name(src): return os.path.splitext(os.path.basename(src))[0]

# photos utilisées : vignettes des pages et images des projets (hors aperçus de vidéo)
pages = sorted(glob.glob('*.html'))
used = set()
for f in pages:
    for tag in IMG_TAG.findall(open(f, encoding='utf8').read()):
        src = re.search(r'\ssrc="([^"]+)"', tag).group(1)
        if src.startswith('assets/img/') and src.endswith('.jpg'): used.add(src)
data = open('js/projects.js', encoding='utf8').read()
for p in json.loads(data[data.index('['):data.rindex(']') + 1]):
    for im in p['images']:
        if not im.get('video'): used.add(im['src'])

def save(im, w, dst, mtime):
    if os.path.exists(dst) and os.path.getmtime(dst) >= mtime: return
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    h = round(im.height * w / im.width)
    out = im if w == im.width else im.resize((w, h), Image.LANCZOS)
    out.save(dst, 'WEBP', quality=QUALITY, method=6, icc_profile=im.info.get('icc_profile'))

manifest, made = {}, 0
for src in sorted(used):
    im = Image.open(src); im.load(); im = im.convert('RGB') if im.mode not in ('RGB',) else im
    W, mtime = im.width, os.path.getmtime(src)
    widths = [w for w in WIDTHS if w < W * 0.9] + [W]
    for w in widths:
        dst = 'assets/img/%s.webp' % name(src) if w == W else 'assets/img/%d/%s.webp' % (w, name(src))
        before = os.path.exists(dst) and os.path.getmtime(dst) >= mtime
        save(im, w, dst, mtime); made += not before
    manifest[name(src)] = widths

def srcset(src):
    ws = manifest[name(src)]
    return ', '.join(('assets/img/%s.webp %dw' % (name(src), w)) if w == ws[-1] else ('assets/img/%d/%s.webp %dw' % (w, name(src), w)) for w in ws)

with open('js/images.js', 'w', encoding='utf8', newline='\n') as f:
    f.write('/* Flair Studio — fichier créé par outils/images.py, ne pas modifier à la main.\n'
            '   Largeurs disponibles (en px) des versions WebP de chaque photo ; la dernière est la taille d\'origine. */\n')
    f.write('window.FLAIR_IMG = ' + json.dumps(manifest, separators=(',', ':')) + ';\n')

for f in pages:
    html = open(f, encoding='utf8').read()
    def fix(m):
        tag = m.group(0)
        src = re.search(r'\ssrc="([^"]+)"', tag).group(1)
        if name(src) not in manifest or not src.endswith('.jpg'): return tag
        tag = re.sub(r'\s(srcset|sizes)="[^"]*"', '', tag) if 'sizes=' not in tag else re.sub(r'\ssrcset="[^"]*"', '', tag)
        sizes = '' if 'sizes=' in tag else ' sizes="%s"' % DEFAULT_SIZES
        return tag.replace(' src="%s"' % src, ' src="%s" srcset="%s"%s' % (src, srcset(src), sizes), 1)
    new = IMG_TAG.sub(fix, html)
    if new != html: open(f, 'w', encoding='utf8', newline='').write(new)

print('%d photos, %d fichiers WebP créés ou mis à jour, js/images.js écrit.' % (len(manifest), made))
