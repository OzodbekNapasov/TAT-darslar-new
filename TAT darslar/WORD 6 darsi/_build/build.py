# -*- coding: utf-8 -*-
"""
MS Word 6 ta amaliy mashg'ulot: dars sahifalari va tarqatma PDF'larni yaratadi.

Ishga tushirish (shu papkada):  python build.py
Natija:
  ../index.html, ../1-dars.html ... ../6-dars.html
  ../tarqatma/N-dars-tarqatma.pdf, ../tarqatma/barcha-tarqatmalar.pdf
Mazmunni o'zgartirish uchun content.py ni tahrirlang va qayta ishga tushiring.
"""
import os
import re
import subprocess
import sys
from urllib.parse import quote

from content import LESSONS, TEXNIKUM, THEMES

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT_HTML = os.path.join(HERE, 'out')
PDF_DIR = os.path.join(ROOT, 'tarqatma')
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'


def read(name):
    with open(os.path.join(HERE, name), encoding='utf8') as f:
        return f.read()


BASE_CSS = read('base.css')
SHEET_CSS = read('sheet.css')
LESSON_CSS = read('lesson.css')


def keys(s):
    """[[Ctrl]] + [[S]] -> tugmalar ko'rinishi."""
    s = s.replace(' + ', '<span class="plus">+</span>')
    return re.sub(r'\[\[(.+?)\]\]', r'<span class="key-cap">\1</span>', s)


def keys_inline(s):
    return re.sub(r'\[\[(.+?)\]\]', r'<span class="key-cap">\1</span>', s)


def plain(s):
    return re.sub(r'<[^>]+>', '', s)


ICON = {
    '': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    'warn': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    'danger': '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    'good': '<polyline points="20 6 9 17 4 12"/>',
}


def callout(kind, html):
    return ('<div class="callout %s"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">%s</svg><span>%s</span></div>'
            % (kind, ICON[kind], keys_inline(html)))


def sheets_html(L, label=True):
    """Namuna varaq(lar)i — haqiqiy A4 o'lchamida."""
    out = []
    for i, body in enumerate(L['task']['sample']):
        lab = '<span class="sheet-label">Namuna • %d-dars%s</span>' % (L['n'], (' • %d-bet' % (i + 1)) if len(L['task']['sample']) > 1 else '') if label else ''
        out.append('<div class="sheet doc">%s%s</div>' % (lab, body))
    return out


# ----------------------------------------------------------------------------
# DARS SAHIFASI
# ----------------------------------------------------------------------------
CHEV = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">'


def rgb(hexc):
    h = hexc.lstrip('#')
    return '%d, %d, %d' % (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))


def motif_uri(th):
    """Muqovadagi mavzu rasmi (SVG) — CSS uchun data URI."""
    body = th['motif'].replace('<text ', '<text fill="%s" ' % th['light'])
    def add_fill(m):
        return m.group(0) if 'fill=' in m.group(0) else m.group(0).replace('fill-opacity', 'fill="%s" fill-opacity' % th['acc'], 1)
    body = re.sub(r'<(?:rect|circle|path)[^>]*fill-opacity[^>]*>', add_fill, body)
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="%s" stroke-width="3" '
           'stroke-linecap="round" stroke-linejoin="round" opacity="0.6" font-family="Arial, sans-serif">%s</svg>' % (th['acc'], body))
    return 'url("data:image/svg+xml,%s")' % quote(svg)


def theme_css(n):
    """Har bir darsning o'z rangi va muqovasi."""
    th = THEMES[n]
    a, l, c = th['acc'], th['light'], rgb(th['acc'])
    return '''
    /* ====================================================================== */
    /* %(n)d-DARS MAVZUSI: %(name)s rang va muqova                              */
    /* ====================================================================== */
    :root { --acc: %(a)s; --acc-light: %(l)s; --word: %(l)s; }

    body {
      background-image:
        radial-gradient(circle at 50%% 0%%, rgba(%(c)s, 0.16) 0%%, transparent 50%%),
        radial-gradient(circle at 10%% 30%%, rgba(%(c)s, 0.07) 0%%, transparent 40%%);
    }

    .splash-overlay {
      background-color: #07090e;
      background-image:
        %(motif)s,
        radial-gradient(circle at 78%% 30%%, rgba(%(c)s, 0.45) 0%%, transparent 45%%),
        radial-gradient(circle at 12%% 88%%, rgba(%(c)s, 0.22) 0%%, transparent 45%%),
        radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1.5px);
      background-size: min(44vw, 620px) auto, 100%% 100%%, 100%% 100%%, 22px 22px;
      background-position: 94%% 50%%, center, center, center;
      align-items: flex-start;
      padding-left: 6vw;
      background-repeat: no-repeat, no-repeat, no-repeat, repeat;
      background-attachment: scroll;
      border-bottom-color: rgba(%(c)s, 0.4);
    }

    .splash-overlay::before {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: linear-gradient(90deg, rgba(7, 9, 14, 0.7) 0%%, rgba(7, 9, 14, 0.2) 65%%, rgba(7, 9, 14, 0.05) 100%%);
    }

    .splash-content { text-align: left; max-width: 50vw; padding-left: 0; }
    .splash-title { text-shadow: 0 2px 18px rgba(7, 9, 14, 0.8); }

    .splash-overlay::after {
      content: "%(num)s";
      position: absolute;
      left: 2vw;
      bottom: -7vw;
      font-size: 34vw;
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.05em;
      color: rgba(%(c)s, 0.1);
      pointer-events: none;
    }

    .top-nav { box-shadow: inset 0 -2px 0 rgba(%(c)s, 0.45); }
    .nav-logo-box { background: rgba(%(c)s, 0.16); border-color: rgba(%(c)s, 0.45); }
    .nav-btn-primary { background: %(a)s; border-color: %(a)s; box-shadow: 0 4px 14px rgba(%(c)s, 0.35); }
    .nav-btn-primary:hover { background: %(a)s; filter: brightness(0.9); }
    .hero-badge { background: rgba(%(c)s, 0.16); color: %(l)s; border-color: rgba(%(c)s, 0.4); }
    .hero-title span, .section-num { color: %(l)s; }
    .act-num { background: rgba(%(c)s, 0.2); color: %(l)s; }
    .act-steps li::marker { color: %(l)s; }
    .lesson-nav a span { color: %(l)s; }

    @media (max-width: 768px) {
      .splash-overlay {
        background-size: 92vw auto, 100%% 100%%, 100%% 100%%, 22px 22px;
        background-position: center 85%%, center, center, center;
        align-items: center;
        padding-left: 1rem;
      }
      .splash-content { text-align: center; max-width: none; }
      .splash-overlay::before { background: rgba(7, 9, 14, 0.45); }
      .splash-overlay::after { font-size: 60vw; bottom: auto; top: 4vh; }
    }
''' % dict(n=n, name=th['name'], a=a, l=l, c=c, motif=motif_uri(th), num='%02d' % n)


def head(title, desc, extra_css=''):
    return '''<!DOCTYPE html>
<html lang="uz" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>%s — Tibbiyotda Axborot Texnologiyalari</title>
  <meta name="description" content="%s">
  <link rel="icon" type="image/svg+xml" href="./images/word.svg">
  <script>
    // Rol mundarijadagi tanlovdan olinadi: faqat o'qituvchida tuzatishlar va javoblar ochiladi
    try {
      if (localStorage.getItem('tat-role') === 'teacher') {
        document.documentElement.setAttribute('data-role', 'teacher');
      }
    } catch (e) {}
  </script>
  <style>
%s%s%s%s  </style>
</head>
''' % (title, desc, BASE_CSS, SHEET_CSS, LESSON_CSS, extra_css)


def common_js():
    return '''
    // Jonli sana (hero va muqova)
    (function () {
      var now = new Date();
      var months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentyabr','oktyabr','noyabr','dekabr'];
      var days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
      var str = now.getFullYear() + '-yil ' + now.getDate() + '-' + months[now.getMonth()] + ', ' + days[now.getDay()];
      var ids = ['hero-live-date', 'splash-date-text'];
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el) el.textContent = str;
      }
    })();

    // Muqovadan darsga o'tish
    function scrollToLesson() {
      var target = document.getElementById('lesson-start');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
'''


def lesson_page(L):
    n = L['n']
    T = L['task']
    prev_l = next((x for x in LESSONS if x['n'] == n - 1), None)
    next_l = next((x for x in LESSONS if x['n'] == n + 1), None)
    pdf = './tarqatma/%d-dars-tarqatma.pdf' % n

    acts = []
    for i, a in enumerate(L['actions'], 1):
        steps = ''.join('<li>%s</li>' % keys_inline(s) for s in a['steps'])
        note = callout(a['note'][0], a['note'][1]) if a.get('note') else ''
        acts.append('''          <div class="act-card">
            <div class="act-head"><span class="act-num">%d</span><h4>%s</h4></div>
            <div class="act-path"><span class="lbl">Qayerda</span><b>%s</b><small>%s</small></div>
            <ol class="act-steps">%s</ol>
            %s
          </div>''' % (i, a['t'], a['path'], a['en'], steps, note))

    kcards = ''.join('<div class="sc-card"><span class="keys">%s</span><span class="sc-name">%s</span><span class="sc-when">%s</span></div>'
                     % (keys(k), nm, ds) for k, nm, ds in L['keys'])

    tsteps = ''.join('<li><label class="task-step"><input type="checkbox"><span class="task-body">%s</span></label></li>' % keys_inline(s)
                     for s in T['steps'])
    reqs = ''.join('<tr><td>%s</td><td><strong>%s</strong></td></tr>' % r for r in T['reqs'])
    checks = ''.join('<li>%s</li>' % c for c in T['checks'])

    papers = sheets_html(L)
    paper_html = ''.join('<div><div class="paper-wrap">%s</div>%s</div>'
                         % (p, ('<div class="paper-cap">%d-sahifa</div>' % (i + 1)) if len(papers) > 1 else '')
                         for i, p in enumerate(papers))

    fixes = ''.join('<li>%s</li>' % f for f in L['fixes'])
    answer = ''
    if T.get('answer'):
        rows = ''.join('<tr><td>%s</td><td>%s</td></tr>' % r for r in T['answer'])
        answer = '''
        <h3 class="sub-title">Javoblar kaliti (%d ta xato)</h3>
        <div class="grid-2">
          <div class="table-container" style="margin-top:0"><table class="ext-table ans-table req-table"><thead><tr><th>Xato</th><th>To‘g‘ri</th></tr></thead><tbody>%s</tbody></table></div>
          <div class="concept-card"><h3>To‘g‘ri matn</h3><p style="color:#cbd5e1">%s</p></div>
        </div>''' % (len(T['answer']), rows, T['answer_text'])

    nav = ''
    if prev_l:
        nav += '<a href="./%d-dars.html" class="prev"><span>← %d-dars</span>%s</a>' % (prev_l['n'], prev_l['n'], prev_l['short'])
    if next_l:
        nav += '<a href="./%d-dars.html" class="next"><span>%d-dars →</span>%s</a>' % (next_l['n'], next_l['n'], next_l['short'])

    html = head('Word %d-dars: %s' % (n, L['title']), plain(L['goal']), theme_css(n))
    html += '''<body>

  <!-- MUQOVA -->
  <div class="splash-overlay" id="splash" onclick="scrollToLesson()">
    <div class="splash-content">
      <p class="splash-date" style="margin-bottom:0.6rem;">MS Word • %(n)d-amaliy mashg‘ulot</p>
      <h1 class="splash-title">%(title)s</h1>
      <p class="splash-date" id="splash-date-text">Bugun</p>
    </div>
  </div>

  <!-- YUQORI MENYU -->
  <header class="top-nav" id="lesson-start">
    <div class="container">
      <div class="nav-inner">
        <a href="./index.html" class="nav-brand" title="Word darslari ro‘yxati">
          <div class="nav-logo-box"><img src="./images/word.svg" alt=""></div>
          <div class="nav-title-block">
            <h1>Word %(n)d-dars: %(short)s</h1>
            <p>MS Word amaliy mashg‘ulotlari • Hamshiralik ishi</p>
          </div>
        </a>
        <div class="nav-actions">
          <a href="./index.html" class="nav-btn">%(chev)s<polyline points="15 18 9 12 15 6"/></svg><span>Darslar</span></a>
          <a href="%(pdf)s" class="nav-btn nav-btn-primary" download><span>Tarqatma PDF</span>%(chev)s<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></a>
        </div>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <div class="hero">
    <div class="container">
      <div class="hero-badge-row">
        <span class="hero-badge"><img src="./images/word.svg" alt="" width="13" height="13"> MS Word • %(n)d-amaliy mashg‘ulot</span>
        <span class="hero-date" id="hero-live-date">Bugun</span>
      </div>
      <h1 class="hero-title"><span>%(n)d-dars.</span> %(title)s</h1>
      <p class="hero-desc"><strong>Dars maqsadi:</strong> %(goal)s</p>
      <div class="hero-quick-links">
        <a href="#sec-actions" class="hero-chip">1. Asosiy amallar</a>
        <a href="#sec-keys" class="hero-chip">2. Tezkor tugmalar</a>
        <a href="#sec-task" class="hero-chip chip-practice">3. Amaliy vazifa</a>
        <a href="%(pdf)s" class="hero-chip chip-pdf" download>Tarqatma (PDF)</a>
        <a href="#sec-teacher" class="hero-chip teacher-only">O‘qituvchi uchun</a>
      </div>
    </div>
  </div>

  <main>
    <div class="container">

      <!-- 1-QISM: AMALLAR -->
      <section id="sec-actions" class="section-block">
        <div class="section-head">
          <span class="section-num">1-Qism</span>
          <h2 class="section-title">Ushbu darsda o‘rganiladigan amallar</h2>
          <p class="section-desc">Har bir amalda avval buyruq <strong>qayerda</strong> joylashgani (rus tilidagi Word, qavsda — ingliz tilidagisi), so‘ng uni bajarish <strong>qadamlari</strong> berilgan.</p>
        </div>
        <div class="grid-2">
%(acts)s
        </div>
      </section>

      <!-- 2-QISM: TEZKOR TUGMALAR -->
      <section id="sec-keys" class="section-block">
        <div class="section-head">
          <span class="section-num">2-Qism</span>
          <h2 class="section-title">Darsda qo‘llanadigan va yodlanadigan tezkor tugmalar</h2>
          <p class="section-desc">Avval birinchi tugma (<span class="key-cap">Ctrl</span>, <span class="key-cap">Shift</span>) bosib turiladi, so‘ng qolgani bosiladi.</p>
        </div>
        <div class="sc-grid">%(kcards)s</div>
      </section>

      <!-- 3-QISM: AMALIY VAZIFA -->
      <section id="sec-task" class="section-block">
        <div class="section-head">
          <span class="section-num">3-Qism • Amaliy vazifa</span>
          <h2 class="section-title">%(n)d-amaliy vazifa: %(ttitle)s</h2>
          <p class="section-desc">Topshiriqni Word’da bajaring va har bir qadamni belgilab boring. Pastdagi <strong>namuna</strong> — hujjatingiz oxirida qanday ko‘rinishi kerakligi (haqiqiy A4 varaq).</p>
        </div>

        <div class="grid-2">
          <div>
            <div class="task-progress-row">
              <div class="goal-progress"><i id="task-bar"></i></div>
              <span id="task-count">0 / %(nsteps)d</span>
            </div>
            <ol class="task-steps" id="task-steps">%(tsteps)s</ol>
          </div>
          <div>
            <div class="table-container" style="margin-top:0">
              <table class="ext-table req-table"><thead><tr><th>Talab</th><th>Qiymat</th></tr></thead><tbody>%(reqs)s</tbody></table>
            </div>
            <div class="concept-card" style="margin-top:1rem;">
              <h3>O‘zingizni tekshiring</h3>
              <ul class="check-list">%(checks)s</ul>
            </div>
          </div>
        </div>

        <h3 class="sub-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Namuna: Word’da xuddi shunday ko‘rinishda tering
        </h3>
        <div class="dl-row">
          <a href="%(pdf)s" class="nav-btn pdf" download>%(chev)s<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Tarqatmani yuklab olish (PDF)</span></a>
          <a href="%(pdf)s" class="nav-btn" target="_blank" rel="noopener">%(chev)s<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span>Ochib ko‘rish / chop etish</span></a>
        </div>
        <div class="paper-row%(two)s">%(papers)s</div>
      </section>

      <!-- O'QITUVCHI UCHUN -->
      <section id="sec-teacher" class="section-block teacher-only" style="margin-bottom: 1rem;">
        <div class="section-head">
          <span class="section-num">Faqat o‘qituvchi</span>
          <h2 class="section-title">Asl ishlanmaga kiritilgan tuzatishlar</h2>
          <p class="section-desc">“MS_Word_6_Darslik_Amaliy_Dastur.docx” ishlanmasidagi %(n)d-dars bilan solishtirganda nimalar o‘zgartirildi.</p>
        </div>
        <div class="concept-card"><ul class="check-list">%(fixes)s</ul></div>
        %(answer)s
      </section>

      <nav class="lesson-nav">%(nav)s</nav>

    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-inner">
        <div><strong>%(tex)s</strong> — Tibbiyotda axborot texnologiyalari fani</div>
        <div><span>MS Word • %(n)d-dars</span> • <a href="./index.html">Word darslari</a> • <a href="../index.html">Mundarija</a></div>
      </div>
    </div>
  </footer>

  <script>%(common)s
    // Namuna varaqlarini ekran kengligiga moslash (asl o'lcham 21 x 29,7 sm)
    (function () {
      function fit() {
        var wraps = document.querySelectorAll('.paper-wrap');
        for (var i = 0; i < wraps.length; i++) {
          var sheet = wraps[i].querySelector('.sheet');
          if (!sheet) continue;
          sheet.style.transform = 'scale(' + (wraps[i].clientWidth / sheet.offsetWidth) + ')';
        }
      }
      fit();
      window.addEventListener('resize', fit);
    })();

    // Amaliy vazifa qadamlari (belgilar shu brauzerda eslab qolinadi)
    (function () {
      var KEY = 'tat-word-%(n)d-vazifa';
      var list = document.getElementById('task-steps');
      if (!list) return;
      var boxes = list.querySelectorAll('input[type="checkbox"]');
      var bar = document.getElementById('task-bar');
      var count = document.getElementById('task-count');
      var saved = [];
      try { saved = JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { saved = []; }

      function update() {
        var done = 0, arr = [];
        for (var i = 0; i < boxes.length; i++) {
          var on = boxes[i].checked;
          if (on) done++;
          arr.push(on ? 1 : 0);
          boxes[i].closest('.task-step').classList.toggle('done', on);
        }
        bar.style.width = Math.round(done / boxes.length * 100) + '%%';
        count.textContent = done + ' / ' + boxes.length;
        try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) {}
      }

      for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = !!saved[i];
        boxes[i].addEventListener('change', update);
      }
      update();
    })();
  </script>
</body>
</html>
''' % dict(n=n, title=L['title'], short=L['short'], goal=L['goal'], pdf=pdf, chev=CHEV,
           acts='\n'.join(acts), kcards=kcards, ttitle=T['title'], nsteps=len(T['steps']), tsteps=tsteps,
           reqs=reqs, checks=checks, papers=paper_html, two=' two' if len(papers) > 1 else '',
           fixes=fixes, answer=answer, nav=nav, tex=TEXNIKUM, common=common_js())
    return html


# ----------------------------------------------------------------------------
# DARSLAR RO'YXATI (HUB)
# ----------------------------------------------------------------------------
def hub_page():
    cards = []
    for L in LESSONS:
        th = THEMES[L['n']]
        cards.append('''          <div class="ls-card" style="--acc: %s; --acc-light: %s;">
            <div class="ls-top"><span class="ls-num">%02d</span><div><small>%d-amaliy mashg‘ulot</small><h3>%s</h3></div></div>
            <p>%s</p>
            <div class="ls-task"><b>Amaliy vazifa:</b> %s</div>
            <div class="ls-actions">
              <a href="./%d-dars.html" class="nav-btn nav-btn-primary"><span>Darsni ochish</span></a>
              <a href="./tarqatma/%d-dars-tarqatma.pdf" class="nav-btn pdf" download><span>Tarqatma PDF</span></a>
            </div>
          </div>''' % (th['acc'], th['light'], L['n'], L['n'], L['title'], L['goal'], L['task']['title'], L['n'], L['n']))

    html = head('MS Word amaliy mashg‘ulotlari (6 ta dars)',
                'Microsoft Word bo‘yicha 6 ta amaliy mashg‘ulot: varaq sozlamalari, jadvallar, rasmlar, ro‘yxatlar, ustunlar, PDF va chop etish. Har bir darsga tarqatma PDF.')
    html += '''<body>

  <div class="splash-overlay" id="splash" onclick="scrollToLesson()">
    <div class="splash-content">
      <h1 class="splash-title">Microsoft Word<br>amaliy mashg‘ulotlari</h1>
      <p class="splash-date" id="splash-date-text">Bugun</p>
    </div>
  </div>

  <header class="top-nav" id="lesson-start">
    <div class="container">
      <div class="nav-inner">
        <a href="../index.html" class="nav-brand" title="Bosh Mundarijaga qaytish">
          <div class="nav-logo-box"><img src="./images/word.svg" alt=""></div>
          <div class="nav-title-block">
            <h1>MS Word amaliy mashg‘ulotlari</h1>
            <p>6 ta dars • Hamshiralik ishi</p>
          </div>
        </a>
        <div class="nav-actions">
          <a href="../index.html" class="nav-btn">%(chev)s<polyline points="15 18 9 12 15 6"/></svg><span>Mundarija</span></a>
          <a href="./1-dars.html" class="nav-btn nav-btn-primary"><span>1-dars</span>%(chev)s<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
        </div>
      </div>
    </div>
  </header>

  <div class="hero">
    <div class="container">
      <div class="hero-badge-row">
        <span class="hero-badge"><img src="./images/word.svg" alt="" width="13" height="13"> 6 ta amaliy mashg‘ulot</span>
        <span class="hero-date" id="hero-live-date">Bugun</span>
      </div>
      <h1 class="hero-title"><span>Microsoft Word</span> amaliy mashg‘ulotlari</h1>
      <p class="hero-desc">Har bir dars 3 qismdan iborat: <strong>o‘rganiladigan amallar</strong>, <strong>yodlanadigan tezkor tugmalar</strong> va <strong>amaliy vazifa</strong>. Har bir darsga chop etishga tayyor tarqatma bor: 1-betida topshiriq, keyingi betida esa haqiqiy A4 o‘lchamidagi namuna. Talaba namunani Word’da xuddi shunday qilib teradi.</p>
      <div class="hero-quick-links">
        <a href="./tarqatma/barcha-tarqatmalar.pdf" class="hero-chip chip-pdf" download>Barcha tarqatmalar — bitta PDF</a>
        <a href="./1-dars.html" class="hero-chip chip-practice">1-darsdan boshlash</a>
      </div>
    </div>
  </div>

  <main>
    <div class="container">
      <section class="section-block">
        <div class="ls-grid">
%(cards)s
        </div>
        <div class="callout teacher-only">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span><strong>O‘qituvchi uchun:</strong> tarqatmani chop etishda printer sozlamasida <strong>“Фактический размер” (100%%)</strong> ni tanlang — shunda namuna varag‘i Word’dagi bilan bir xil o‘lchamda chiqadi. 3-dars uchun rasm faylini kompyuterlarga oldindan tarqating. Har bir dars sahifasining oxirida (faqat o‘qituvchi rolida) asl ishlanmaga kiritilgan tuzatishlar ro‘yxati bor.</span>
        </div>
      </section>
    </div>
  </main>

  <footer>
    <div class="container">
      <div class="footer-inner">
        <div><strong>%(tex)s</strong> — Tibbiyotda axborot texnologiyalari fani</div>
        <div><span>MS Word amaliy mashg‘ulotlari</span> • <a href="../index.html">Mundarija</a></div>
      </div>
    </div>
  </footer>

  <script>%(common)s  </script>
</body>
</html>
''' % dict(chev=CHEV, cards='\n'.join(cards), tex=TEXNIKUM, common=common_js())
    return html


# ----------------------------------------------------------------------------
# TARQATMA (PDF)
# ----------------------------------------------------------------------------
def info_sheet(L):
    T = L['task']
    steps = ''.join('<li>%s</li>' % keys_inline(s) for s in T['steps'] if not s.startswith('&nbsp;'))
    # 6-darsdagi a), b), c) bandlarini oldingi qadamga qo'shamiz
    if any(s.startswith('&nbsp;') for s in T['steps']):
        sub = '<br>'.join(keys_inline(s.replace('&nbsp;', '')) for s in T['steps'] if s.startswith('&nbsp;'))
        steps = steps[:-5] + '<br>' + sub + '</li>'
    reqs = ''.join('<tr><td>%s</td><td><b>%s</b></td></tr>' % r for r in T['reqs'])
    kt = ''.join('<tr><td>%s</td><td>%s</td></tr>' % (keys_inline(k).replace(' + ', '+'), nm) for k, nm, _ in L['keys'])
    checks = ''.join('<li>%s</li>' % c for c in T['checks'])
    return '''<div class="sheet info">
  <div class="info-top"><div><b>Tibbiyotda axborot texnologiyalari</b><br>MS Word amaliy mashg‘ulotlari • Hamshiralik ishi</div><span class="info-num">%d-dars</span></div>
  <div class="info-fio"><span>F.I.O.:</span><span>Guruh:</span><span>Sana:</span></div>
  <h1>%d-amaliy vazifa: %s</h1>
  <p class="info-goal"><b>Maqsad:</b> %s</p>
  <h2>Topshiriq sharti</h2>
  <ol class="steps">%s</ol>
  <div class="info-grid">
    <div><h2>Hujjat talablari</h2><table class="kt">%s</table></div>
    <div><h2>Yodlang: tezkor tugmalar</h2><table class="kt">%s</table></div>
  </div>
  <h2>O‘zingizni tekshiring</h2>
  <ul class="checks" style="columns:2;column-gap:0.6cm">%s</ul>
  <div class="info-note"><b>Namuna keyingi sahifada.</b> U haqiqiy A4 o‘lchamida: Word’dagi hujjatingiz xuddi shunday ko‘rinishi kerak. Ishingizni chop etib, namuna bilan solishtiring.</div>
  <div class="info-foot"><span>%s</span><span>1-bet: topshiriq • keyingi bet: namuna</span></div>
</div>''' % (L['n'], L['n'], T['title'], L['goal'], steps, reqs, kt, checks, TEXNIKUM)


def print_doc(sheets, title):
    return '''<!DOCTYPE html>
<html lang="uz"><head><meta charset="UTF-8"><title>%s</title>
<style>
  @page { size: A4; margin: 0; }
  html, body { margin: 0; padding: 0; background: #ffffff; }
  .sheet { page-break-after: always; break-after: page; }
  .sheet:last-child { page-break-after: auto; break-after: auto; }
%s%s</style></head><body>
%s
</body></html>''' % (title, SHEET_CSS, '''
  .sheet-label { position: absolute; top: 0.35cm; right: 1.5cm; font-family: Arial, Helvetica, sans-serif; font-size: 8pt; color: #a6a6a6; letter-spacing: 0.05em; text-transform: uppercase; }
''', '\n'.join(sheets))


def to_pdf(html_path, pdf_path):
    subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
                    '--print-to-pdf=' + pdf_path, 'file:///' + html_path.replace('\\', '/')],
                   check=True, capture_output=True)
    with open(pdf_path, 'rb') as f:
        return len(re.findall(rb'/Type\s*/Page[^s]', f.read()))


def main():
    os.makedirs(OUT_HTML, exist_ok=True)
    os.makedirs(PDF_DIR, exist_ok=True)

    def write(path, text):
        with open(path, 'w', encoding='utf8', newline='\n') as f:
            f.write(text)

    write(os.path.join(ROOT, 'index.html'), hub_page())
    all_sheets = []
    ok = True
    for L in LESSONS:
        write(os.path.join(ROOT, '%d-dars.html' % L['n']), lesson_page(L))
        sheets = [info_sheet(L)] + sheets_html(L)
        all_sheets += sheets
        src = os.path.join(OUT_HTML, '%d-dars-tarqatma.html' % L['n'])
        write(src, print_doc(sheets, '%d-dars tarqatma' % L['n']))
        pages = to_pdf(src, os.path.join(PDF_DIR, '%d-dars-tarqatma.pdf' % L['n']))
        flag = 'OK' if pages == len(sheets) else 'DIQQAT: kutilgan %d bet' % len(sheets)
        if pages != len(sheets):
            ok = False
        print('%d-dars: %d bet  %s' % (L['n'], pages, flag))

    src = os.path.join(OUT_HTML, 'barcha-tarqatmalar.html')
    write(src, print_doc(all_sheets, 'MS Word: barcha tarqatmalar'))
    pages = to_pdf(src, os.path.join(PDF_DIR, 'barcha-tarqatmalar.pdf'))
    print('Barchasi: %d bet (kutilgan %d)' % (pages, len(all_sheets)))
    if not ok or pages != len(all_sheets):
        sys.exit(1)


if __name__ == '__main__':
    main()
