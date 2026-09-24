/* ==========================================================================
   NAZORAT TESTLARI — faqat O'QITUVCHI rolida ko'rinadigan yashirin havolalar.

   Bu yerga talabalarga tarqatiladigan test havolalarini yozib boring.
   Faylni oddiy "Bloknot" (Notepad) bilan ham ochib tahrirlash mumkin.

   Har bir yozuv quyidagi ko'rinishda bo'ladi (vergullarni o'chirib qo'ymang):

     {
       dars:   '4-dars',                        // qaysi darsga tegishli
       nom:    'Nazorat testi',                 // havola nomi
       havola: 'https://forms.gle/...',         // havolaning o'zi
       izoh:   'Yakuniy nazorat, 20 ta savol'   // qisqacha izoh
     },

   Yangi havola qo'shish: oxirgi } dan keyin vergul qo'yib, yuqoridagi
   namunani nusxalab qo'ying. Saqlagach sahifani yangilasangiz ko'rinadi.
   ========================================================================== */

window.NAZORAT_TESTLARI = [
  {
    dars: '3-dars',
    nom: 'Talaba platformasi',
    havola: 'https://ozodbeknapasov.github.io/3-dars-uchun/',
    izoh: 'Talabalarga beriladigan havola: nazariya, amaliyot va test tizimi.'
  },
  {
    dars: '3-dars',
    nom: 'O‘qituvchi boshqaruv paneli',
    havola: 'https://ozodbeknapasov.github.io/3-dars-uchun/admin',
    izoh: 'Guruhlar statistikasi va talaba natijalarini nazorat qilish.'
  },
  {
    dars: '6-dars',
    nom: 'Windows OT — Interaktiv Darslik (Talaba & O‘qituvchi)',
    havola: './6. Windows operatsion tizimi/dars.html',
    izoh: 'Windows operatsion tizimi, dasturlar tasnifi, Start menyu va Windows 11 trenajyori.'
  },
  {
    dars: '6-dars',
    nom: 'Windows OT — Bilimni sinash testi (20 ta savol)',
    havola: './6. Windows operatsion tizimi/test.html',
    izoh: 'Talabalar va o‘qituvchi uchun lokal 20 talik test (50/70/85/100 baholash mezoni bilan).'
  },
  {
    dars: '7-dars',
    nom: 'Fayllar, papkalar va arxivlash — Darslik',
    havola: './7. Fayllar va arxivlash/dars.html',
    izoh: 'Papka yaratish va tezkor tugmalar, arxivlash usullari, 25 ta nazorat savoli javoblari bilan.'
  },
  {
    dars: '7-dars',
    nom: 'Fayllar, papkalar va arxivlash — Test (20 ta savol)',
    havola: './7. Fayllar va arxivlash/test.html',
    izoh: 'Lokal 20 talik test, har bir savolga to‘g‘ri javob va izoh bilan.'
  }
];
