# Vercel'ga joylash

Sayt statik — hech qanday build qilinmaydi. Vercel repozitoriyadagi tayyor
HTML fayllarni shundayligicha tarqatadi.

## Bir marta qilinadigan sozlash

1. [vercel.com](https://vercel.com) ga GitHub akkaunti bilan kiring.
2. **Add New → Project** → `TAT-darslar-new` repozitoriyasini **Import** qiling.
3. Sozlash oynasida:

   | Maydon | Qiymat |
   | --- | --- |
   | Framework Preset | **Other** |
   | Root Directory | `./` (o'zgartirmang) |
   | Build Command | **bo'sh qoldiring** |
   | Output Directory | **bo'sh qoldiring** |
   | Install Command | **bo'sh qoldiring** |

   Bu qiymatlar `vercel.json` da ham yozilgan, shuning uchun odatda Vercel
   o'zi to'g'ri tanlaydi. Agar u "Next.js" deb topib qolsa, qo'lda **Other**
   ga o'zgartiring — aks holda build xato beradi.

4. **Deploy** tugmasini bosing. Bir daqiqada sayt tayyor bo'ladi.

Shundan keyin `main` tarmog'iga har bir push avtomatik yangi deploy qiladi.

## Qisqa havolalar

`vercel.json` da qisqa manzillar sozlangan. Talabalarga shu qisqalarini
yuborsangiz bo'ladi:

| Qisqa havola | Nimani ochadi |
| --- | --- |
| `/` | Mundarija (rol tanlash ekrani) |
| `/mundarija` | Mundarija |
| `/1-dars` | Axborot haqida tushuncha |
| `/2-dars` | Sanoq sistemalari |
| `/3-dars` | Avtomatlashtirilgan ishchi o'rinlar |
| `/4-dars` | Klaviatura va sichqoncha |
| `/5-dars` | Kompyuter va uning qurilmalari |
| `/5-test` | 5-dars testi |

Masalan: `https://<loyiha-nomi>.vercel.app/3-dars`

Qisqa havola **redirect** qilib ishlaydi: brauzer darsning haqiqiy uzun
manziliga o'tadi. Bu ataylab shunday — dars sahifalari o'z CSS va JS fayllariga
nisbiy yo'l bilan murojaat qiladi, shuning uchun ular o'z papkasida ochilishi
shart. Uzun manzillar ham avvalgidek ishlayveradi.

## Nimalarni o'zgartirish mumkin

| Nima | Qayerda |
| --- | --- |
| O'qituvchi PIN kodi | `TAT darslar/index.html` → `var TEACHER_PIN = '...'` |
| Nazorat testlari havolalari | `TAT darslar/nazorat-testlari.js` |
| Qisqa havolalar | `vercel.json` → `redirects` |

Faylni tahrirlab, GitHub'ga push qilsangiz Vercel o'zi yangilaydi.

## Darsni qayta yig'ish

1–4-darslar Next.js loyihasi. Ularning matnini o'zgartirsangiz, o'sha dars
papkasida quyidagini bajaring va natijani push qiling:

```bash
npm install          # faqat birinchi marta
npm run build:offline
```

Bu `offline/` papkasini qaytadan yasaydi — saytda aynan shu papka ochiladi.

5-dars oddiy HTML, uni to'g'ridan-to'g'ri tahrirlash mumkin.

## GitHub Pages

Avvalgi GitHub Pages deploy'i o'chirilgan
(`.github/workflows/deploy.yml` faqat qo'lda ishga tushadi). Qaytarish
kerak bo'lsa, o'sha fayldagi izohga qarang.
