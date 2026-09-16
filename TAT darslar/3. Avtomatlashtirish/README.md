# 3-dars: Tibbiyotda avtomatlashtirilgan ishchi o‘rinlar

Mavzu: **Tibbiyotda ishchi o‘rinlarini avtomatlashtirishda va tibbiy
masalalarni yechishda axborot texnologiyalari.**

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

## Offline nusxa

```bash
npm run build:offline
```

Natijada `offline/` papkasi hosil bo‘ladi:

```
offline/
  index.html     mundarija
  3-dars.html    har bir dars - alohida fayl
  _next/         css va js
  start.bat      2 marta bosiladigan ishga tushirgich
  O'QISH.txt
```

Talabalarga **`offline/` papkasini butun holda** bering (USB, tarmoq diski).
Loyiha papkasidagi `start.bat` ham shu `offline/index.html` ni ochadi.

> **Daraja:** ataylab sodda. Mavzu nomi og‘ir ko‘rinsa ham, dars 1-kurs
> talabasi tushunadigan tilda yozilgan — formulalar, telemeditsina va tizim
> jurnali kabi og‘ir bo‘limlar olib tashlangan.

## Bu darsning nazariy qismi

`components/lesson3/theory-section.tsx` ichida qisqa xulosa («3 ta gap») va
4 ta mavzu:

1. Avtomatlashtirilgan ishchi o‘rin (AIO) nima va nimalardan tashkil topadi
2. Shifoxonada AIO qayerda bor (registratura, shifokor, hamshira, laboratoriya)
3. Elektron tibbiy karta; qog‘oz karta bilan taqqoslash jadvali
4. Parol va tibbiy sir

## Bu darsning amaliy qismi

Amaliyot — **kompyuter savodxonligi**: Windows’da papka va fayl bilan ishlash.
`components/lesson3/` ichida 5 ta blok:

| Fayl | Nima o‘rgatadi |
| --- | --- |
| `folder-lab.tsx` | Ishlaydigan Windows oynasi: papka yaratish, nom berish, o‘chirish, Savatcha |
| `file-save.tsx` | «Saqlash» oynasi: to‘g‘ri papka, tushunarli nom, to‘g‘ri fayl turi |
| `ehr-form.tsx` | Kompyuterda shakl to‘ldirish; bo‘sh maydon bo‘lsa saqlanmaydi; Win+L |
| `access-roles.tsx` | 5 ta holat: ruxsat etiladimi yoki tibbiy sirning buzilishimi |
| `homework.tsx` | Kompyuterda bajarib topshiriladigan 4 ta amaliy topshiriq (chop etsa bo‘ladi) |

## Test

Savollar banki `lib/quiz-3-dars.ts` da (10 nazariy + 10 amaliy), savol rasmlari
esa `components/quiz-figures.tsx` da inline SVG ko‘rinishida.

**Javob variantlari aralashtiriladi.** Har safar sahifa ochilganda va
«Qaytadan» bosilganda variantlar tasodifiy tartibda chiqadi (Fisher–Yates),
harflar esa ekrandagi o‘ringa qarab qaytadan qo‘yiladi. Sahifa oldindan
render qilingani uchun birinchi chizishda tabiiy tartib turadi, aralashtirish
mountdan keyin effektda beriladi — shunda hydration mos keladi. Mantiq
`lib/quiz-3-dars.ts` dagi `buildOrders` / `reshuffleBank` funksiyalarida.

## Dizayn tizimi

Ranglar [`app/globals.css`](app/globals.css) dagi semantik tokenlar orqali
beriladi. Bu darsning urg‘u rangi — **teal** (`text-teal-ink`, `bg-teal-tint`,
`border-teal-edge`). Yorug‘/tungi rejim shu tokenlarni almashtiradi, markup
o‘zgarmaydi.

## Papkalar

```
app/            sahifalar (/ = mundarija, /3-dars = 3-dars)
components/     umumiy header, footer, mavzu almashtirgich, quiz rasmlari
components/lesson3/  shu darsning nazariya, amaliyot va test bloklari
lib/            darslar ro'yxati, savollar banki, tokenlar bilan bog'liq mantiq
scripts/        build-offline.mjs
offline/        yig'ilgan offline nusxa (git ga tushmaydi)
```
