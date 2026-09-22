import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const EXPORT_DIR = join(root, '.next-offline');
const OUT_DIR = join(root, 'offline');

console.log('> building static export (OFFLINE=1)');

const nextBin = join(root, 'node_modules', 'next', 'dist', 'bin', 'next');

const res = spawnSync(process.execPath, [nextBin, 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {...process.env, OFFLINE: '1', NEXT_PUBLIC_OFFLINE: '1'},
});

if (res.error || res.status !== 0) {
  console.error('\nBuild failed - offline/ was not touched.');
  process.exit(res.status ?? 1);
}

rmSync(OUT_DIR, {recursive: true, force: true});
mkdirSync(OUT_DIR, {recursive: true});

for (const entry of readdirSync(EXPORT_DIR)) {
  if (entry.startsWith('.') || entry.endsWith('.txt')) continue;
  cpSync(join(EXPORT_DIR, entry), join(OUT_DIR, entry), {recursive: true});
}

// Ensure 6-dars.html and test.html are also present at the top level of offline/
if (existsSync(join(root, 'dars.html'))) {
  cpSync(join(root, 'dars.html'), join(OUT_DIR, '6-dars.html'));
  cpSync(join(root, 'dars.html'), join(OUT_DIR, 'index.html'));
}
if (existsSync(join(root, 'test.html'))) {
  cpSync(join(root, 'test.html'), join(OUT_DIR, 'test.html'));
}
if (existsSync(join(root, 'images'))) {
  cpSync(join(root, 'images'), join(OUT_DIR, 'images'), {recursive: true});
}

const START_BAT = `@echo off
chcp 65001 > nul
title 6-Dars: Windows Operatsion Tizimi - Shahrisabz Tibbiyot Texnikumi
if exist "%~dp0index.html" (
    start "" "%~dp0index.html"
)
exit
`;

writeFileSync(join(OUT_DIR, 'start.bat'), START_BAT, 'utf8');
console.log('\n✓ offline/ tayyor!');
