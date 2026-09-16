/**
 * Builds the offline copy of the site.
 *
 * It is the SAME Next.js app as the online build - same components, same CSS,
 * same interactions - exported as static files whose links and assets are all
 * relative, so it works when opened straight from disk (file://).
 *
 * Output: offline/
 *   index.html      mundarija
 *   1-dars.html     lesson pages, one flat file per route
 *   _next/          css + js
 *   start.bat       double-click launcher
 *
 * The whole offline/ folder is the thing you hand out (USB, network share).
 */

import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXPORT_DIR = join(root, '.next-offline');
const OUT_DIR = join(root, 'offline');

// ---------------------------------------------------------------- 1. build --
console.log('> building static export (OFFLINE=1)');

// call Next's binary through node directly: no shell quoting problems, and it
// behaves the same on Windows and POSIX
const nextBin = join(root, 'node_modules', 'next', 'dist', 'bin', 'next');

const res = spawnSync(process.execPath, [nextBin, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {...process.env, OFFLINE: '1', NEXT_PUBLIC_OFFLINE: '1'},
});

if (res.error) {
  console.error('\nCould not start the build:', res.error.message);
  process.exit(1);
}

if (res.status !== 0) {
  console.error('\nBuild failed - offline/ was not touched.');
  process.exit(res.status ?? 1);
}

if (!existsSync(join(EXPORT_DIR, 'index.html'))) {
  console.error(`\nExpected ${join(EXPORT_DIR, 'index.html')} to exist.`);
  process.exit(1);
}

// ----------------------------------------------------------------- 2. copy --
rmSync(OUT_DIR, {recursive: true, force: true});
mkdirSync(OUT_DIR, {recursive: true});

for (const entry of readdirSync(EXPORT_DIR)) {
  // RSC payloads + build metadata: only used for client-side navigation,
  // which the offline copy does not do (every link is a full page load)
  if (entry.startsWith('.') || entry.endsWith('.txt')) continue;
  cpSync(join(EXPORT_DIR, entry), join(OUT_DIR, entry), {recursive: true});
}

// -------------------------------------------------------------- 3. launcher --
const START_BAT = `@echo off
chcp 65001 > nul
title Tibbiyotda axborot texnologiyalari - Shahrisabz Tibbiyot Texnikumi

echo ======================================================================
echo   Shahrisabz Tibbiyot Texnikumi
echo   3-Dars: Tibbiyotda avtomatlashtirilgan ishchi o'rinlar
echo ======================================================================
echo.
echo Mundarija brauzeringizda ochilmoqda...
echo Internet talab qilinmaydi.
echo.

if exist "%~dp0index.html" (
    start "" "%~dp0index.html"
) else (
    echo Xatolik: index.html topilmadi!
    echo Loyiha papkasida "npm run build:offline" buyrugini bajaring.
    pause
    exit /b 1
)

timeout /t 2 > nul
exit
`;

writeFileSync(join(OUT_DIR, 'start.bat'), START_BAT, 'utf8');

const READ_ME = `Shahrisabz Tibbiyot Texnikumi
3-Dars: Tibbiyotda ishchi o'rinlarini avtomatlashtirishda va tibbiy
masalalarni yechishda axborot texnologiyalari

ISHGA TUSHIRISH
---------------
"start.bat" faylini 2 marta bosing. Mundarija brauzerda ochiladi,
u yerdan kerakli darsni tanlaysiz.

Internet talab qilinmaydi. Bu nusxa serverdagi versiya bilan bir xil:
barcha interaktiv sxemalar, simulyator, test va vizual effektlar ishlaydi.

Yorug' / tungi rejim o'ng yuqoridagi tugmalar orqali almashtiriladi,
tanlov brauzerda saqlanib qoladi.

KO'CHIRISH
----------
Bu papkani butun holda ko'chiring (USB, tarmoq diski, arxiv).
Faqat index.html ni alohida ko'chirsangiz, dizayn yuklanmaydi -
u "_next" papkasidagi fayllarga tayanadi.
`;

writeFileSync(join(OUT_DIR, "O'QISH.txt"), READ_ME, 'utf8');

const pages = readdirSync(OUT_DIR).filter((f) => f.endsWith('.html'));
console.log(`\n✓ offline/ tayyor - ${pages.length} sahifa: ${pages.join(', ')}`);
console.log('  offline/start.bat faylini 2 marta bosing.');
