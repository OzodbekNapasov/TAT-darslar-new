# 2-dars: Axborot turlari. Sanoq sistemalari. Texnika xavfsizligi

Shahrisabz Tibbiyot Texnikumi, hamshiralik ishi yo‘nalishi uchun interaktiv
elektron qo‘llanma: nazariya, amaliy simulyatorlar va o‘z-o‘zini baholash testi.

Bitta kod bazasi ikki xil chiqariladi — **online** (server) va **offline**
(diskdan ochiladigan nusxa). Ikkalasi ham bir xil komponentlar, bir xil CSS va
bir xil interaktivlikdan foydalanadi, shuning uchun ko‘rinishi ham aynan bir xil.

## Talab

Node.js 18+

```bash
npm install
```

## Ishlatish

| Buyruq | Nima qiladi |
| --- | --- |
| `npm run dev` | Ishlab chiqish serveri (http://localhost:3000) |
| `npm run build` | Online (server) uchun yig‘ish |
| `npm start` | Yig‘ilgan online versiyani ishga tushirish |
| `npm run build:offline` | **Offline nusxani yig‘ish → `offline/` papkasi** |
| `npm run typecheck` | TypeScript tekshiruvi |
| `npm run lint` | ESLint |

> `next.config.ts` da `output: 'standalone'` ishlatilgani uchun, online build'ni
> ba'zi hostinglarda `node .next/standalone/server.js` orqali ishga tushirish
> kerak bo‘ladi.

## Offline nusxa

```bash
npm run build:offline
```

Natijada `offline/` papkasi hosil bo‘ladi:

```
offline/
  index.html     mundarija
  2-dars.html    har bir dars - alohida fayl
  _next/         css va js
  start.bat      2 marta bosiladigan ishga tushirgich
  O'QISH.txt
```

Talabalarga **`offline/` papkasini butun holda** bering (USB, tarmoq diski).
`start.bat` bosiladi → mundarija ochiladi → dars tanlanadi. Internet kerak emas.

Loyiha papkasidagi `start.bat` ham shu `offline/index.html` ni ochadi.

Nima uchun bu ishlaydi: sahifalar to‘liq statik eksport qilinadi, barcha
havolalar va resurslar nisbiy (`./1-dars.html`, `./_next/...`), va sahifa ish
vaqtida hech qanday `fetch` qilmaydi — shuning uchun `file://` protokolida ham
xuddi serverdagidek ishlaydi.

## Yangi dars qo‘shish

1. `app/<slug>/page.tsx` yarating (masalan `app/3-dars/page.tsx`).
2. [`lib/lessons.ts`](lib/lessons.ts) ga yozuv qo‘shing.

Mundarija, darslar soni va statistikalar shu ro‘yxatdan olinadi — qo‘lda
yangilash shart emas.

## Dizayn tizimi

Ranglar [`app/globals.css`](app/globals.css) dagi semantik tokenlar orqali
beriladi (`bg-surface`, `text-fg-muted`, `border-line`, `text-blue-ink` …).
Yorug‘/tungi rejim shu tokenlarni almashtiradi, markup o‘zgarmaydi.

- Rejim tanlovi `localStorage` da saqlanadi va tizim sozlamasiga ergashadi
  (`lib/theme.ts`), sahifa yuklanishida ko‘z qamashishi bo‘lmasligi uchun
  `app/layout.tsx` dagi kichik skript rangni birinchi chizishdan oldin qo‘yadi.
- Ataylab qora panellar (terminal, monitor ekrani, klaviatura) `on-dark`
  klassi bilan belgilangan — ular ikkala rejimda ham qora qoladi.

## Papkalar

```
app/            sahifalar (/ = mundarija, /1-dars = 1-dars)
components/     umumiy header, footer, mavzu almashtirgich
lib/            darslar ro'yxati, tokenlar bilan bog'liq mantiq, yordamchilar
scripts/        build-offline.mjs
offline/        yig'ilgan offline nusxa (git ga tushmaydi)
_arxiv/         eski qo'lda yozilgan offline nusxa - o'chirsa bo'ladi
```

## Bu darsning amaliy qismi

`components/lesson2/` ichida 7 ta mustaqil interaktiv blok:

| Fayl | Nima o‘rgatadi |
| --- | --- |
| `desktop-anatomy.tsx` | Ish stolining 5 qismi: yorliqlar, Boshlash, masalalar paneli, soat, fon |
| `window-controls.tsx` | Oyna tugmalari: yig‘ish / kattalashtirish / yopish farqi |
| `file-explorer-sim.tsx` | Papka yaratish, nusxalash, o‘chirish, Savatchadan tiklash (4 vazifa) |
| `file-types.tsx` | Fayl kengaytmasi → axborot turi, hajmi va fleshkaga nechta sig‘ishi |
| `usb-safe-eject.tsx` | Fleshkani xavfsiz uzish; nusxalash paytida tortib olish oqibati |
| `binary-lab.tsx` | Harf → ASCII → ikkilik kod; 8 ta bitni yoqib son yig‘ish |
| `safety-sort.tsx` | 8 ta holat: to‘g‘ri amaliyotmi yoki qoida buzilishimi |

Savollar banki `lib/quiz-2-dars.ts` da (10 nazariy + 10 amaliy), savol rasmlari
esa `components/quiz-figures.tsx` da inline SVG ko‘rinishida.
