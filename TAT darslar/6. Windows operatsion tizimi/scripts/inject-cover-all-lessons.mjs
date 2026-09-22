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

const coverCss = `<style id="tat-topic-cover-style">
.tat-topic-cover {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  background-image: url('./cover_bg.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  overflow: hidden;
  z-index: 50;
}
.tat-topic-cover::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(7, 9, 14, 0.65);
}
.tat-topic-cover-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem 1.5rem;
  max-width: 920px;
  width: 100%;
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
</style>`;

function buildCoverHtml(titleHtml) {
  return `<!-- TAT FULLSCREEN TOPIC COVER -->
<div class="tat-topic-cover" id="tat-topic-cover" onclick="window.scrollTo({top: window.innerHeight, behavior: 'smooth'})">
  <div class="tat-topic-cover-inner">
    <h1 class="tat-topic-cover-title">${titleHtml}</h1>
    <p class="tat-topic-cover-date" id="tat-topic-cover-date">Bugun</p>
  </div>
</div>
<script id="tat-topic-cover-script">
(function(){
  var now = new Date();
  var months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentyabr','oktyabr','noyabr','dekabr'];
  var days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
  var str = now.getFullYear() + '-yil ' + now.getDate() + '-' + months[now.getMonth()] + ', ' + days[now.getDay()];
  var el = document.getElementById('tat-topic-cover-date');
  if (el) el.textContent = str;
})();
</script>`;
}

for (const lesson of lessons) {
  if (fs.existsSync(lesson.bgDestDir)) {
    fs.cpSync(bgSource, path.join(lesson.bgDestDir, 'cover_bg.jpg'));
  }
  for (const file of lesson.files) {
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');

    // Remove previous cover if re-running
    html = html.replace(/<style id="tat-topic-cover-style">[\s\S]*?<\/style>/g, '');
    html = html.replace(/<!-- TAT FULLSCREEN TOPIC COVER -->[\s\S]*?<\/script>/g, '');

    // Also if 5-dars already had an old #splash overlay, replace or remove it
    html = html.replace(/<!-- SPLASH OVERLAY -->[\s\S]*?<div class="splash-overlay"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');

    // Inject CSS before </head>
    html = html.replace('</head>', `${coverCss}\n</head>`);

    // Inject Cover HTML right after <body...>
    html = html.replace(/(<body[^>]*>)/i, `$1\n${buildCoverHtml(lesson.titleHtml)}\n`);

    fs.writeFileSync(file, html, 'utf8');
    console.log('Injected 100vh Topic+Date cover into:', file);
  }
}
