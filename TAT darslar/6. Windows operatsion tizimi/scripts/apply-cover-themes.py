# -*- coding: utf-8 -*-
"""
Har bir darsning muqovasiga o'z rangi va mavzusiga mos chiziqli rasm beradi.
Matn qo'shilmaydi — faqat fon (rang, nur, nuqtali to'r va SVG rasm) o'zgaradi.

Ishga tushirish:  python apply-cover-themes.py
Har bir sahifada </head> oldidan TAT_COVER_THEME bloki qo'yiladi (qayta ishga
tushirilsa, eski blok almashtiriladi). Selektorlar ID bilan yozilgan, shuning
uchun inject-cover-all-lessons.mjs qayta ishga tushirilsa ham bu fon ustun turadi.
"""
import os
import re
from urllib.parse import quote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
START, END = '<!-- TAT_COVER_THEME_START -->', '<!-- TAT_COVER_THEME_END -->'

# Muqova turi: "tat" — #tat-topic-cover (1–5-darslar), "splash" — #splash (6–8-darslar)
PAGES = [
    (1, 'tat', ['1. Axborot/offline/1-dars.html', '1. Axborot/offline/index.html']),
    (2, 'tat', ['2. Sanoq sistemalari/offline/2-dars.html', '2. Sanoq sistemalari/offline/index.html']),
    (3, 'tat', ['3. Avtomatlashtirish/offline/3-dars.html', '3. Avtomatlashtirish/offline/index.html']),
    (4, 'tat', ['4-dars/offline/4-dars.html', '4-dars/offline/index.html',
                '4. Klaviatura va sichqoncha/offline/4-dars.html', '4. Klaviatura va sichqoncha/offline/index.html']),
    (5, 'tat', ['5. Kompyuter va uning qurilmalari/dars.html', '5. Kompyuter va uning qurilmalari/5-dars.html']),
    (6, 'splash', ['6. Windows operatsion tizimi/dars.html']),
    (7, 'splash', ['7. Fayllar va arxivlash/dars.html']),
    ('8o', 'splash', ['8. MS Office va Word/office.html']),
    ('8w', 'splash', ['8. MS Office va Word/dars.html']),
]

# Ranglar mundarijadagi dars kartalariga mos. Rasmlar 400x300 maydonda, matnsiz.
THEMES = {
    # 1-dars: axborot — markaziy tugun va undan tarqaladigan aloqalar, to'lqin, hujjat
    1: dict(acc='#38bdf8', motif=(
        '<circle cx="200" cy="150" r="34"/><circle cx="200" cy="150" r="12" fill-opacity="0.5"/>'
        '<line x1="226" y1="128" x2="292" y2="72"/><line x1="232" y1="160" x2="320" y2="190"/>'
        '<line x1="174" y1="128" x2="108" y2="70"/><line x1="170" y1="164" x2="90" y2="210"/><line x1="200" y1="184" x2="200" y2="252"/>'
        '<circle cx="306" cy="60" r="18"/><circle cx="336" cy="196" r="18"/><circle cx="94" cy="58" r="18"/>'
        '<circle cx="78" cy="218" r="18"/><circle cx="200" cy="270" r="18"/>'
        '<path d="M298 60l5-7 5 14 5-7"/><path d="M86 52h16M86 58h16M86 64h10"/>'
        '<rect x="70" y="210" width="16" height="16" rx="2"/><path d="M326 196q5-10 10 0t10 0"/>')),
    # 2-dars: sanoq sistemalari — ikkilik "0/1" nuqtalar to'ri va xavfsizlik qalqoni
    2: dict(acc='#c084fc', motif=(
        ''.join('<circle cx="%d" cy="%d" r="9"%s/>' % (60 + c * 34, 60 + r * 34, ' fill-opacity="0.6"' if (r * 3 + c * 5) % 3 == 0 else '')
                for r in range(6) for c in range(6))
        + '<path d="M310 70l50 18v48c0 40-26 66-50 76-24-10-50-36-50-76V88z"/><path d="M288 140l16 16 30-34"/>')),
    # 3-dars: ish o'rnini avtomatlashtirish — monitor, tibbiy xoch, EKG chizig'i, ma'lumotlar bazasi
    3: dict(acc='#34d399', motif=(
        '<rect x="40" y="50" width="230" height="150" rx="10"/><line x1="155" y1="200" x2="155" y2="235"/><line x1="110" y1="238" x2="200" y2="238"/>'
        '<path d="M60 135h50l14-36 18 70 16-50 10 16h58"/>'
        '<rect x="78" y="70" width="34" height="34" rx="4" fill-opacity="0.35"/><path d="M95 78v18M86 87h18"/>'
        '<ellipse cx="330" cy="95" rx="40" ry="14"/><path d="M290 95v100c0 8 18 14 40 14s40-6 40-14V95"/>'
        '<path d="M290 130c0 8 18 14 40 14s40-6 40-14M290 165c0 8 18 14 40 14s40-6 40-14"/>')),
    # 4-dars: klaviatura va sichqoncha
    4: dict(acc='#22d3ee', motif=(
        '<rect x="20" y="110" width="270" height="120" rx="10"/>'
        + ''.join('<rect x="%d" y="%d" width="%d" height="20" rx="3"%s/>' % (34 + c * 25 + (r * 8), 124 + r * 25, 19, ' fill-opacity="0.35"' if (r, c) in ((1, 4), (2, 3)) else '')
                  for r in range(3) for c in range(9 - (1 if r else 0)))
        + '<rect x="80" y="200" width="150" height="18" rx="3"/>'
        + '<rect x="315" y="95" width="62" height="100" rx="31"/><line x1="346" y1="95" x2="346" y2="135"/><line x1="315" y1="135" x2="377" y2="135"/>'
          '<rect x="342" y="108" width="8" height="16" rx="4" fill-opacity="0.6"/><path d="M346 95c0-30 20-40 30-60"/>')),
    # 5-dars: kompyuter qurilmalari — tizim bloki, monitor va protsessor
    5: dict(acc='#fb923c', motif=(
        '<rect x="30" y="60" width="200" height="130" rx="8"/><line x1="130" y1="190" x2="130" y2="222"/><line x1="90" y1="226" x2="170" y2="226"/>'
        '<rect x="250" y="40" width="80" height="190" rx="8"/><line x1="265" y1="70" x2="315" y2="70"/><line x1="265" y1="85" x2="315" y2="85"/>'
        '<circle cx="290" cy="200" r="9"/>'
        '<rect x="85" y="95" width="60" height="60" rx="5" fill-opacity="0.3"/><rect x="100" y="110" width="30" height="30" rx="2"/>'
        + ''.join('<line x1="%d" y1="88" x2="%d" y2="95"/><line x1="%d" y1="155" x2="%d" y2="162"/>' % (x, x, x, x) for x in (97, 109, 121, 133))
        + ''.join('<line x1="78" y1="%d" x2="85" y2="%d"/><line x1="145" y1="%d" x2="152" y2="%d"/>' % (y, y, y, y) for y in (107, 119, 131, 143))
        + '<rect x="345" y="160" width="40" height="70" rx="20"/><line x1="365" y1="160" x2="365" y2="185"/>')),
    # 6-dars: Windows OT — ustma-ust oynalar va vazifalar paneli
    6: dict(acc='#818cf8', motif=(
        '<rect x="40" y="40" width="200" height="140" rx="8"/><line x1="40" y1="66" x2="240" y2="66"/>'
        '<circle cx="212" cy="53" r="4"/><circle cx="226" cy="53" r="4"/>'
        '<rect x="150" y="100" width="210" height="140" rx="8" fill-opacity="0.12"/><line x1="150" y1="126" x2="360" y2="126"/>'
        '<circle cx="332" cy="113" r="4"/><circle cx="346" cy="113" r="4"/>'
        '<rect x="172" y="146" width="56" height="44" rx="4"/><rect x="240" y="146" width="98" height="10" rx="3"/><rect x="240" y="166" width="70" height="10" rx="3"/>'
        '<rect x="20" y="262" width="360" height="26" rx="8"/><rect x="186" y="268" width="14" height="14" rx="2" fill-opacity="0.5"/>'
        '<rect x="206" y="268" width="14" height="14" rx="2"/><rect x="226" y="268" width="14" height="14" rx="2"/>')),
    # 7-dars: fayllar va arxivlash — papkalar va zanjirli arxiv
    7: dict(acc='#fbbf24', motif=(
        '<path d="M30 80h70l16 18h104v120H30z"/><path d="M60 60h70l16 18h104v120"/>'
        '<path d="M30 118h190"/>'
        '<rect x="270" y="70" width="100" height="150" rx="8" fill-opacity="0.15"/>'
        + ''.join('<rect x="%d" y="%d" width="12" height="9" rx="1"/>' % (312 if i % 2 == 0 else 320, 76 + i * 12) for i in range(8))
        + '<rect x="306" y="176" width="28" height="30" rx="4"/><line x1="320" y1="182" x2="320" y2="196"/>')),
    # 8-dars, 1-mavzu: Office paketi — to'rtta dastur kafeli (hujjat, jadval, taqdimot, pochta)
    '8o': dict(acc='#f472b6', motif=(
        '<rect x="70" y="30" width="120" height="110" rx="16"/><rect x="210" y="30" width="120" height="110" rx="16"/>'
        '<rect x="70" y="160" width="120" height="110" rx="16"/><rect x="210" y="160" width="120" height="110" rx="16"/>'
        '<line x1="95" y1="62" x2="165" y2="62"/><line x1="95" y1="82" x2="165" y2="82"/><line x1="95" y1="102" x2="145" y2="102"/>'
        '<rect x="232" y="52" width="76" height="66" rx="2"/><line x1="232" y1="74" x2="308" y2="74"/><line x1="232" y1="96" x2="308" y2="96"/><line x1="257" y1="52" x2="257" y2="118"/><line x1="282" y1="52" x2="282" y2="118"/>'
        '<rect x="92" y="182" width="76" height="52" rx="3"/><rect x="104" y="208" width="10" height="16" fill-opacity="0.6"/><rect x="122" y="198" width="10" height="26" fill-opacity="0.6"/><rect x="140" y="190" width="10" height="34" fill-opacity="0.6"/>'
        '<line x1="130" y1="234" x2="130" y2="250"/>'
        '<rect x="232" y="186" width="76" height="56" rx="4"/><path d="M232 190l38 30 38-30"/>')),
    # 8-dars, 2-mavzu: Word — lentali oyna, matn qatorlari va kursor
    '8w': dict(acc='#60a5fa', motif=(
        '<rect x="50" y="30" width="300" height="240" rx="10"/><line x1="50" y1="58" x2="350" y2="58"/>'
        '<rect x="50" y="58" width="300" height="34" fill-opacity="0.18"/>'
        '<rect x="64" y="66" width="18" height="18" rx="3"/><rect x="88" y="66" width="18" height="18" rx="3"/><rect x="118" y="66" width="50" height="18" rx="3"/><rect x="176" y="66" width="18" height="18" rx="3"/>'
        '<rect x="110" y="106" width="180" height="150" fill-opacity="0.08"/>'
        '<line x1="160" y1="124" x2="240" y2="124" stroke-width="5"/>'
        '<line x1="128" y1="146" x2="272" y2="146"/><line x1="128" y1="162" x2="272" y2="162"/><line x1="128" y1="178" x2="272" y2="178"/>'
        '<line x1="128" y1="194" x2="272" y2="194"/><line x1="128" y1="210" x2="220" y2="210"/>'
        '<path d="M226 202v16M221 202h10M221 218h10"/>')),
}


def rgb(hexc):
    h = hexc.lstrip('#')
    return '%d, %d, %d' % (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def motif_uri(th):
    def add_fill(m):
        return m.group(0).replace('fill-opacity', 'fill="%s" fill-opacity' % th['acc'], 1)
    body = re.sub(r'<(?:rect|circle|path|ellipse)[^>]*fill-opacity[^>]*>', add_fill, th['motif'])
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="%s" stroke-width="3" '
           'stroke-linecap="round" stroke-linejoin="round" opacity="0.6">%s</svg>' % (th['acc'], body))
    return 'url("data:image/svg+xml,%s")' % quote(svg)


def block(key, kind):
    th = THEMES[key]
    c = rgb(th['acc'])
    sel, inner = ('#tat-topic-cover.tat-topic-cover', '#tat-topic-cover .tat-topic-cover-inner') if kind == 'tat' \
        else ('#splash.splash-overlay', '#splash .splash-content')
    imp = ' !important'
    css = '''
%(sel)s {
  background-color: #07090e%(i)s;
  background-image:
    %(motif)s,
    radial-gradient(circle at 78%% 30%%, rgba(%(c)s, 0.42) 0%%, transparent 45%%),
    radial-gradient(circle at 12%% 88%%, rgba(%(c)s, 0.2) 0%%, transparent 45%%),
    radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1.5px)%(i)s;
  background-size: min(44vw, 620px) auto, 100%% 100%%, 100%% 100%%, 22px 22px%(i)s;
  background-position: 94%% 50%%, center, center, center%(i)s;
  background-repeat: no-repeat, no-repeat, no-repeat, repeat%(i)s;
  background-attachment: scroll%(i)s;
  border-bottom-color: rgba(%(c)s, 0.4)%(i)s;
  align-items: flex-start%(i)s;
  padding-left: 6vw%(i)s;
}
%(sel)s::before {
  backdrop-filter: none%(i)s;
  -webkit-backdrop-filter: none%(i)s;
  background: linear-gradient(90deg, rgba(7, 9, 14, 0.7) 0%%, rgba(7, 9, 14, 0.2) 65%%, rgba(7, 9, 14, 0.05) 100%%)%(i)s;
}
%(inner)s { text-align: left%(i)s; max-width: 52vw%(i)s; padding-left: 0%(i)s; }
%(inner)s h1 { text-shadow: 0 2px 18px rgba(7, 9, 14, 0.8)%(i)s; }
@media (max-width: 768px) {
  %(sel)s {
    background-size: 92vw auto, 100%% 100%%, 100%% 100%%, 22px 22px%(i)s;
    background-position: center 85%%, center, center, center%(i)s;
    align-items: center%(i)s;
    padding-left: 1rem%(i)s;
  }
  %(sel)s::before { background: rgba(7, 9, 14, 0.45)%(i)s; }
  %(inner)s { text-align: center%(i)s; max-width: none%(i)s; padding-left: %(mpad)s%(i)s; }
}
''' % dict(sel=sel, inner=inner, motif=motif_uri(th), c=c, i=imp, mpad='0.5rem' if kind == 'tat' else '0.85rem')
    return '%s\n<style id="tat-cover-theme">%s</style>\n%s\n' % (START, css, END)


def main():
    for key, kind, files in PAGES:
        for rel in files:
            path = os.path.join(ROOT, rel)
            if not os.path.exists(path):
                print('YO‘Q:', rel)
                continue
            with open(path, encoding='utf8', newline='') as f:
                html = f.read()
            html = re.sub(re.escape(START) + r'.*?' + re.escape(END) + r'\r?\n?', '', html, flags=re.S)
            i = html.lower().rfind('</head>')
            if i < 0:
                print('</head> topilmadi:', rel)
                continue
            html = html[:i] + block(key, kind) + html[i:]
            with open(path, 'w', encoding='utf8', newline='') as f:
                f.write(html)
            print('OK', key, rel)


if __name__ == '__main__':
    main()
