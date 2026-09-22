import fs from 'node:fs';
import path from 'node:path';

const tatRoot = 'c:\\Users\\SAVITAR\\Desktop\\TAT darslari\\TAT darslar';
const bgSource = path.join(tatRoot, '6. Windows operatsion tizimi', 'images', 'win11_bg.jpg');

const lessons = [
  {
    files: [
      path.join(tatRoot, '1. Axborot', 'offline', '1-dars.html'),
      path.join(tatRoot, '1. Axborot', 'offline', 'index.html'),
    ],
    bgDestDir: path.join(tatRoot, '1. Axborot', 'offline'),
    titleHtml: 'Axborot haqida tushuncha<br>va axborot texnologiyalari',
  },
  {
    files: [
      path.join(tatRoot, '2. Sanoq sistemalari', 'offline', '2-dars.html'),
      path.join(tatRoot, '2. Sanoq sistemalari', 'offline', 'index.html'),
    ],
    bgDestDir: path.join(tatRoot, '2. Sanoq sistemalari', 'offline'),
    titleHtml: 'Axborot turlari, sanoq sistemalari<br>va texnika xavfsizligi',
  },
  {
    files: [
      path.join(tatRoot, '3. Avtomatlashtirish', 'offline', '3-dars.html'),
      path.join(tatRoot, '3. Avtomatlashtirish', 'offline', 'index.html'),
    ],
    bgDestDir: path.join(tatRoot, '3. Avtomatlashtirish', 'offline'),
    titleHtml: 'Tibbiyotda ishchi o‘rinlarini avtomatlashtirish<br>va axborot o‘lchov birliklari',
  },
  {
    files: [
      path.join(tatRoot, '4-dars', 'offline', '4-dars.html'),
      path.join(tatRoot, '4-dars', 'offline', 'index.html'),
    ],
    bgDestDir: path.join(tatRoot, '4-dars', 'offline'),
    titleHtml: 'Klaviatura va sichqoncha qurilmalari<br>bilan ishlash asoslari',
  },
  {
    files: [
      path.join(tatRoot, '4. Klaviatura va sichqoncha', 'offline', '4-dars.html'),
      path.join(tatRoot, '4. Klaviatura va sichqoncha', 'offline', 'index.html'),
    ],
    bgDestDir: path.join(tatRoot, '4. Klaviatura va sichqoncha', 'offline'),
    titleHtml: 'Klaviatura va sichqoncha qurilmalari<br>bilan ishlash asoslari',
  },
  {
    files: [
      path.join(tatRoot, '5. Kompyuter va uning qurilmalari', 'dars.html'),
      path.join(tatRoot, '5. Kompyuter va uning qurilmalari', '5-dars.html'),
    ],
    bgDestDir: path.join(tatRoot, '5. Kompyuter va uning qurilmalari'),
    titleHtml: 'Kompyuter va uning qurilmalari',
  },
];

function buildHeadInjection(titleHtml) {
  return `<!-- TAT_COVER_HEAD_START -->
<script>(function(){try{localStorage.setItem('tat-theme','dark');localStorage.setItem('tat_theme','dark');var r=document.documentElement;r.dataset.theme='dark';r.dataset.themeMode='dark';r.classList.add('dark')}catch(e){}})()</script>
<style id="tat-topic-cover-style">
:root,[data-theme],html,body{color-scheme:dark !important;}
button[aria-label*="rejim"],button[title*="rejim"],button[aria-label*="rejimga"],.theme-toggle-btn{display:none !important;}
body {
  position: relative !important;
  padding-top: 100vh !important;
  padding-top: 100dvh !important;
}
.tat-topic-cover {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 100vh !important;
  height: 100dvh !important;
  width: 100% !important;
  background-image: url('./cover_bg.jpg') !important;
  background-size: cover !important;
  background-position: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  border-bottom: 1px solid rgba(59, 130, 246, 0.3) !important;
  overflow: hidden !important;
  z-index: 45 !important;
}
.tat-topic-cover::before {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  background: rgba(7, 9, 14, 0.65) !important;
}
.tat-topic-cover-inner {
  position: relative !important;
  z-index: 2 !important;
  text-align: center !important;
  padding: 2rem 1.5rem !important;
  max-width: 920px !important;
  width: 100% !important;
}
.tat-topic-cover-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  font-size: clamp(1.85rem, 5.2vw, 3.5rem) !important;
  font-weight: 900 !important;
  letter-spacing: -0.03em !important;
  line-height: 1.16 !important;
  color: #ffffff !important;
  margin: 0 0 1.1rem 0 !important;
  background: none !important;
  -webkit-text-fill-color: #ffffff !important;
}
.tat-topic-cover-date {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
  font-size: clamp(0.95rem, 2.5vw, 1.15rem) !important;
  font-weight: 600 !important;
  color: rgba(255, 255, 255, 0.8) !important;
  margin: 0 !important;
}
</style>
<script id="tat-topic-cover-script">
(function(){
  var TITLE_HTML = ${JSON.stringify(titleHtml)};
  function getDateStr() {
    var now = new Date();
    var months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentyabr','oktyabr','noyabr','dekabr'];
    var days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
    return now.getFullYear() + '-yil ' + now.getDate() + '-' + months[now.getMonth()] + ', ' + days[now.getDay()];
  }
  function ensureCover() {
    if (!document.body) return;
    var existing = document.getElementById('tat-topic-cover');
    if (!existing) {
      var div = document.createElement('div');
      div.id = 'tat-topic-cover';
      div.className = 'tat-topic-cover';
      div.onclick = function() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      };
      div.innerHTML =
        '<div class="tat-topic-cover-inner">' +
          '<h1 class="tat-topic-cover-title">' + TITLE_HTML + '</h1>' +
          '<p class="tat-topic-cover-date" id="tat-topic-cover-date">' + getDateStr() + '</p>' +
        '</div>';
      // Append at the END of document.body so we NEVER disturb React 19's firstChild hydration cursor!
      document.body.appendChild(div);
    } else {
      var dateEl = document.getElementById('tat-topic-cover-date');
      if (dateEl && dateEl.textContent === 'Bugun') {
        dateEl.textContent = getDateStr();
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureCover);
  } else {
    ensureCover();
  }
  setInterval(ensureCover, 250);
})();
</script>
<!-- TAT_COVER_HEAD_END -->`;
}

function buildBodyEndCoverHtml(titleHtml) {
  return `<!-- TAT_COVER_BODY_START --><div class="tat-topic-cover" id="tat-topic-cover" onclick="window.scrollTo({top: window.innerHeight, behavior: 'smooth'})"><div class="tat-topic-cover-inner"><h1 class="tat-topic-cover-title">${titleHtml}</h1><p class="tat-topic-cover-date" id="tat-topic-cover-date">Bugun</p></div></div><!-- TAT_COVER_BODY_END -->`;
}

for (const lesson of lessons) {
  if (fs.existsSync(lesson.bgDestDir)) {
    fs.cpSync(bgSource, path.join(lesson.bgDestDir, 'cover_bg.jpg'));
  }
  for (const file of lesson.files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Safely strip only our own bounded markers if re-run
    html = html.replace(/<!-- TAT_COVER_HEAD_START -->[\s\S]*?<!-- TAT_COVER_HEAD_END -->/g, '');
    html = html.replace(/<!-- TAT_COVER_BODY_START -->[\s\S]*?<!-- TAT_COVER_BODY_END -->/g, '');

    // Inject head block before </head>
    html = html.replace('</head>', `${buildHeadInjection(lesson.titleHtml)}</head>`);

    // Inject cover at the VERY END of </body> (before </body>) so React SSR firstChild is 100% untouched!
    html = html.replace('</body>', `${buildBodyEndCoverHtml(lesson.titleHtml)}</body>`);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected non-destructive absolute-top 100vh cover into:', file, 'Size:', html.length);
  }
}
