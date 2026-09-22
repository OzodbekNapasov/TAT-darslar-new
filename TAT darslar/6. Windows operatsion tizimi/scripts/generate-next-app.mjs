import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const repoRoot = path.join(root, '..', '..');

// 1. Read dars.html and test.html
const darsHtml = fs.readFileSync(path.join(root, 'dars.html'), 'utf8');
const testHtml = fs.readFileSync(path.join(root, 'test.html'), 'utf8');

// Extract <style> from dars.html and test.html
const darsStyleMatch = darsHtml.match(/<style>([\s\S]*?)<\/style>/);
const testStyleMatch = testHtml.match(/<style>([\s\S]*?)<\/style>/);

const darsCss = darsStyleMatch ? darsStyleMatch[1] : '';
const testCss = testStyleMatch ? testStyleMatch[1] : '';

// Write app/globals.css
const globalsCss = `/* =========================================================================
   6-DARS: WINDOWS OPERATSION TIZIMI VA UNDA ISHLASH ASOSLARI (NEXT.JS CSS)
   Permanent Dark Mode • Zero Text Gradients • Authentic Brand Logos
   ========================================================================= */
${darsCss}

/* =========================================================================
   STANDALONE QUIZ STYLES (/test)
   ========================================================================= */
${testCss}
`;

fs.mkdirSync(path.join(root, 'app'), { recursive: true });
fs.writeFileSync(path.join(root, 'app', 'globals.css'), globalsCss, 'utf8');

// Extract body inner HTML between <body> and <script> in dars.html
const bodyStart = darsHtml.indexOf('<body>') + '<body>'.length;
const scriptStart = darsHtml.lastIndexOf('<script>');
const darsBodyContent = darsHtml.slice(bodyStart, scriptStart).trim();

// Create app/page.tsx as a full interactive Next.js React component
const pageTsx = `'use client';

import React, { useEffect } from 'react';

const LESSON_HTML = ${JSON.stringify(darsBodyContent)};

export default function LessonSixPage() {
  useEffect(() => {
    // 1. Live Date on 100vh Scrollable Splash Cover
    const now = new Date();
    const months = ['yanvar','fevral','mart','aprel','may','iyun','iyul','avgust','sentyabr','oktyabr','noyabr','dekabr'];
    const days = ['Yakshanba','Dushanba','Seshanba','Chorshanba','Payshanba','Juma','Shanba'];
    const str = now.getFullYear() + '-yil ' + now.getDate() + '-' + months[now.getMonth()] + ', ' + days[now.getDay()];
    const dateEl = document.getElementById('splash-date-text');
    if (dateEl) dateEl.textContent = str;

    // 2. Scroll to lesson when clicking the splash cover
    (window as any).scrollToLesson = function () {
      const target = document.getElementById('lesson-start');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // 3. Interactive Windows 11 Desktop Simulator State & Handlers
    let simStep = 1;
    let folderCreated = false;

    function updateClock() {
      const n = new Date();
      const h = String(n.getHours()).padStart(2, '0');
      const m = String(n.getMinutes()).padStart(2, '0');
      const clk = document.getElementById('sim-clock');
      if (clk) clk.textContent = h + ':' + m;
    }
    updateClock();
    const clockInterval = setInterval(updateClock, 15000);

    function closeContextMenu() {
      const menu = document.getElementById('sim-context-menu');
      if (menu) menu.classList.remove('active');
    }

    function updateSimProgress(taskText: string, badgeText: string) {
      const taskEl = document.getElementById('sim-task-text');
      const progEl = document.getElementById('sim-progress');
      if (taskEl) {
        taskEl.innerHTML =
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span><strong>' +
          taskText +
          '</strong></span>';
      }
      if (progEl) progEl.textContent = badgeText;
    }

    (window as any).closeContextMenu = closeContextMenu;

    (window as any).handleDesktopRightClick = function (e: MouseEvent) {
      e.preventDefault();
      const menu = document.getElementById('sim-context-menu');
      const screen = document.getElementById('sim-desktop');
      if (!menu || !screen) return;
      const rect = screen.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      if (x + 210 > rect.width) x = rect.width - 215;
      if (y + 160 > rect.height) y = rect.height - 165;
      menu.style.left = Math.max(8, x) + 'px';
      menu.style.top = Math.max(8, y) + 'px';
      menu.classList.add('active');
    };

    (window as any).createNewFolder = function () {
      closeContextMenu();
      if (simStep === 1) {
        const folder = document.getElementById('sim-user-folder');
        if (folder) folder.style.display = 'flex';
        folderCreated = true;
        simStep = 2;
        updateSimProgress(
          "2-Topshiriq: Yangi papka ustida o‘ng tugmani bosing (yoki mobil paneldan) 'Nomini o‘zgartirish'ni tanlang",
          'Bosqich: 2 / 3'
        );
      }
    };

    (window as any).renameFolderAction = function () {
      closeContextMenu();
      if (simStep === 2 && folderCreated) {
        const label = document.getElementById('folder-name-label');
        const input = document.getElementById('folder-name-input') as HTMLInputElement | null;
        if (label && input) {
          label.style.display = 'none';
          input.style.display = 'block';
          input.focus();
          input.select();
        }
      }
    };

    (window as any).handleRenameKey = function (e: KeyboardEvent) {
      if (e.key === 'Enter') {
        const label = document.getElementById('folder-name-label');
        const input = document.getElementById('folder-name-input') as HTMLInputElement | null;
        if (label && input) {
          label.textContent = input.value.trim() || 'Bemorlar_2026';
          label.style.display = 'block';
          input.style.display = 'none';
          simStep = 3;
          updateSimProgress("3-Topshiriq: Ushbu papkani o‘chiring (Savatga tashlash)", 'Bosqich: 3 / 3');
        }
      }
    };

    (window as any).deleteFolderAction = function () {
      closeContextMenu();
      if (simStep === 3 && folderCreated) {
        const folder = document.getElementById('sim-user-folder');
        const congrats = document.getElementById('sim-congrats');
        if (folder) folder.style.display = 'none';
        if (congrats) congrats.style.display = 'flex';
        updateSimProgress("Topshiriqlar a'lo darajada bajarildi!", '100% Bajarildi');
      }
    };

    (window as any).resetSim = function () {
      simStep = 1;
      folderCreated = false;
      const folder = document.getElementById('sim-user-folder');
      const label = document.getElementById('folder-name-label');
      const input = document.getElementById('folder-name-input');
      const congrats = document.getElementById('sim-congrats');
      if (folder) folder.style.display = 'none';
      if (label) {
        label.textContent = 'Yangi papka';
        label.style.display = 'block';
      }
      if (input) input.style.display = 'none';
      if (congrats) congrats.style.display = 'none';
      updateSimProgress(
        "1-Topshiriq: Ish stolida sichqonchaning o‘ng tugmasini bosing va 'Yangi papka' oching.",
        'Bosqich: 1 / 3'
      );
    };

    return () => clearInterval(clockInterval);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: LESSON_HTML }} />;
}
`;

fs.writeFileSync(path.join(root, 'app', 'page.tsx'), pageTsx, 'utf8');

// Also create app/6-dars/page.tsx
fs.mkdirSync(path.join(root, 'app', '6-dars'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'app', '6-dars', 'page.tsx'),
  `export { default } from '../page';\n`,
  'utf8'
);

// Extract body from test.html and create app/test/page.tsx
const testBodyStart = testHtml.indexOf('<body>') + '<body>'.length;
const testScriptStart = testHtml.lastIndexOf('<script>');
const testBodyContent = testHtml.slice(testBodyStart, testScriptStart).trim();
const testScriptContent = testHtml.slice(testScriptStart + '<script>'.length, testHtml.lastIndexOf('</script>')).trim();

const testPageTsx = `'use client';

import React, { useEffect } from 'react';

const TEST_HTML = ${JSON.stringify(testBodyContent)};
const TEST_SCRIPT = ${JSON.stringify(testScriptContent)};

export default function TestPage() {
  useEffect(() => {
    try {
      const fn = new Function(TEST_SCRIPT);
      fn();
    } catch (err) {
      console.error('Quiz script error:', err);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: TEST_HTML }} />;
}
`;

fs.mkdirSync(path.join(root, 'app', 'test'), { recursive: true });
fs.writeFileSync(path.join(root, 'app', 'test', 'page.tsx'), testPageTsx, 'utf8');

// Copy images/ to public/images/ and offline/images/
fs.mkdirSync(path.join(root, 'public', 'images'), { recursive: true });
fs.cpSync(path.join(root, 'images'), path.join(root, 'public', 'images'), { recursive: true });

fs.mkdirSync(path.join(root, 'offline', 'images'), { recursive: true });
fs.cpSync(path.join(root, 'images'), path.join(root, 'offline', 'images'), { recursive: true });

// Copy dars.html and test.html to offline/ and repoRoot
fs.cpSync(path.join(root, 'dars.html'), path.join(root, 'offline', 'index.html'));
fs.cpSync(path.join(root, 'dars.html'), path.join(root, 'offline', '6-dars.html'));
fs.cpSync(path.join(root, 'test.html'), path.join(root, 'offline', 'test.html'));

console.log('Successfully generated Next.js app (app/page.tsx, app/6-dars/page.tsx, app/test/page.tsx, app/globals.css, public/images, offline/)!');

