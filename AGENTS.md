# TAT Darslar — Loyiha Qoidalari va Standartlari (Project Rules)

Ushbu repozitoriy Shahrisabz Tibbiyot Texnikumi uchun "Tibbiyotda axborot texnologiyalari" (TAT) fanidan interaktiv elektron qo'llanma hisoblanadi.

GitHub repozitoriy: https://github.com/OzodbekNapasov/TAT-darslar-new (Branch: `main`)

---

## 1. Avtomatik GitHub Push Qoidasi (Majburiy)
* Har bir qilingan o'zgarishdan (yangi dars qo'shish, mavjud sahifani tahrirlash, tuzatish, testlar yangilanishi va hokazo) so'ng barcha o'zgarishlar zudlik bilan Git orqali GitHub'ga push qilinishi shart:
  ```bash
  git add .
  git commit -m "<aniq va lo'nda tushuntirish>"
  git push origin main
  ```
* Hech bir o'zgarish faqat lokalda qolib ketmasligi, GitHub bilan doimiy to'liq sinxron holatda turishi lozim.

---

## 2. 0 Emoji Qoidasi (Qat'iy taqiq)
* Loyihadagi hech qanday faylda (HTML, JS, CSS, JSON, Markdown) emojilardan (masalan: 📚, 🚀, 💻, 💡 va boshqalar) FOYDALANILMASIN.
* Barcha vizual belgilar faqat toza, inline SVG piktogrammalar ko'rinishida berilishi shart.

---

## 3. Terminologiya va Imlo Qoidalari
* "Anakart" so'zi umuman ishlatilmasin — faqat **"Ona plata"** deb yozilsin.
* "Periferik qurilmalar" o'rniga — faqat **"Qo'shimcha qurilmalar"** iborasi ishlatilsin.
* Ruscha burchakli qo'shtirnoqlar («...») ishlatilmasin — faqat standart qo'shtirnoqlar ("..." yoki '...') ishlatilsin.

---

## 4. Darslar Tuzilishi va Ketma-ketligi
* Qurilmalarni tushuntirishda pedagogik ketma-ketlik:
  1. **1-guruh:** Tashqi qurilmalar (Monitor, Klaviatura, Sichqoncha, Printer, Skaner va h.k.) avval tushuntiriladi.
  2. **2-guruh:** Ichki qurilmalar (Tizim bloki, Ona plata, Protsessor, RAM, Videokarta, HDD/SSD, Quvvat bloki va h.k.) keyin tushuntiriladi.
* Har bir qurilma tushuntirilganda:
  - Qurilma nomi va vazifasi
  - Hayotiy misol (analogi)
  - Yaxshiroq (kuchliroq) bo'lsa nima berishi (afzalligi)
  - Interaktiv konspekt va test savollari bo'lishi lozim.

---

## 5. 100% Offline Ishlash va Yengil Repozitoriy
* Barcha darslar kompyuterda internetsiz (offline) rejimda to'liq ishlashi shart.
* Tashqi CDN kutubxonalariga bog'lanib qolmaslik, barcha skript va stillar lokal yoki inline bo'lishi ta'minlansin.
* Og'ir `node_modules/`, `.next/`, `.cache/` va build keshlar `.gitignore` da saqlansin, repozitoriy doimo yengil (5-15 MB atrofida) bo'lishi shart.
