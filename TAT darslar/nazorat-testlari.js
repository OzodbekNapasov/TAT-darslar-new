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
    izoh: 'F.I.O va guruh bilan; 30 talik bankdan tasodifiy 20 ta savol. Natija Telegram botga keladi.'
  },
  {
    dars: '8-dars',
    nom: 'Microsoft Office dasturlari — Darslik (1-mavzu)',
    havola: './8. MS Office va Word/office.html',
    izoh: 'Office paketi tarkibi, versiyalar, umumiy oyna, “Qaysi dasturni tanlaysiz?” mashqi va 15 ta nazorat savoli.'
  },
  {
    dars: '8-dars',
    nom: 'Word matn muharriri bilan tanishuv — Darslik (2-mavzu)',
    havola: './8. MS Office va Word/dars.html',
    izoh: 'Word oynasi simulyatori, formatlash trenajyori, amaliy topshiriq va 19 ta nazorat savoli.'
  },
  {
    dars: 'Word amaliyoti',
    nom: 'MS Word — 6 ta amaliy mashg‘ulot va tarqatmalar',
    havola: './WORD 6 darsi/index.html',
    izoh: 'Ariza, jadval, rasm, ro‘yxat, ustunlar, PDF/chop etish. Har bir darsga A4 tarqatma PDF; barchasi bitta PDF da ham bor.'
  }
];
