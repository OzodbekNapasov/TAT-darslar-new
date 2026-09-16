/**
 * 4-Dars: Klaviatura va sichqoncha asoslari
 * Test savollari banki: 10 ta nazariya + 10 ta amaliyot (jami 20 ta).
 * Javob variantlari har doim tasodifiy tartibda aralashtiriladi.
 */

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  /** correct index in the original unshuffled options array */
  answer: number;
  explanation: string;
}

export type BankKey = 'theory' | 'practice';

export const THEORY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: 'Standart zamonaviy kompyuter klaviaturasi nechta asosiy funksional zonaga bo‘linadi?',
    options: ['5 ta zonaga', '3 ta zonaga', '7 ta zonaga', '2 ta zonaga'],
    answer: 0,
    explanation:
      'Klaviatura 5 ta asosiy zonadan iborat: 1) Alfavit-raqamli zona, 2) Funksional klavishlar (F1-F12), 3) Kursor boshqaruvi va tahrir, 4) Maxsus/modifikator klavishlar, 5) Raqamli blok (Numpad).',
  },
  {
    id: 2,
    text: '10 barmoq bilan ko‘r-ko‘rona (klaviaturaga qaramay) yozishda "F" va "J" harflaridagi kichik bo‘rtiqlar (chiziqchalar) nima uchun xizmat qiladi?',
    options: [
      'Ko‘rsatkich barmoqlar uchun asosiy tayanch pozitsiyasini his qilish uchun',
      'Faqat bosh barmoqlarni joylashtirish uchun',
      'Klaviaturaning zavod markirovkasi sifatida',
      'Kichik barmoqlar (jimjiloq) joyini belgilash uchun',
    ],
    answer: 0,
    explanation:
      'Chap qo‘l ko‘rsatkich barmog‘i "F", o‘ng qo‘l ko‘rsatkich barmog‘i "J" klavishidagi bo‘rtiq ustiga qo‘yiladi. Bu foydalanuvchiga klaviaturaga qaramasdan qo‘llarni tayanch holatga (ASDF - JKL;) qaytarish imkonini beradi.',
  },
  {
    id: 3,
    text: 'Klaviaturadagi "Caps Lock" LED indikatorining yoniq turishi nimani anglatadi?',
    options: [
      'Barcha kiritilayotgan harflar KATTA (bosh) harflar bilan yozilishini',
      'Raqamli blok (Numpad) faollashganini',
      'Klaviatura kompyuterdan uzilganini',
      'Sahifani pastga aylantirish bloklanganini',
    ],
    answer: 0,
    explanation:
      'Caps Lock indikatori yoniq bo‘lsa, harf klavishlari avtomatik ravishda bosh harflarni (Capital Letters) kiritadi.',
  },
  {
    id: 4,
    text: 'Tibbiyot muassasalarida va laboratoriyalarda ko‘p ishlatiladigan "Membranali klaviatura"ning asosiy afzalligi nima?',
    options: [
      'Jimgina ishlashi, arzonligi va chang/suyuqlikdan himoyalanish darajasi yuqoriligi',
      'Tugmalarining har biri alohida mexanik prujinaga egaligi',
      'Klaviaturani umuman tozalash shart emasligi',
      'Elektr quvvatisiz ishlashi',
    ],
    answer: 0,
    explanation:
      'Membranali klaviaturalar elastik silikon qatlam orqali ishlaydi, shuning uchun ular deyarli shovqinsiz, nisbatan arzon va gigiyenik tozalashga qulaydir.',
  },
  {
    id: 5,
    text: 'Kompyuterda klaviatura va sichqoncha bilan ishlaganda tirsak va bilak burchagi qanday holatda bo‘lishi maqsadga muvofiq?',
    options: [
      'Taxminan 90–100 daraja to‘g‘ri burchakda, bilaklar havoda osilib qolmasdan',
      '45 daraja o‘tkir burchakda, tirsak doimo pastga osilib turishi kerak',
      'Qo‘llar to‘liq yozilgan (180 daraja) holatda',
      'Burchakning ahamiyati yo‘q, eng muhimi monitor balandligi',
    ],
    answer: 0,
    explanation:
      'Ergonomika qoidalariga ko‘ra, tirsak 90–100 daraja burchak ostida turganda va bilak stolga to‘g‘ri tayanganda tunnel sindromi (karpal kanal kasalligi) xavfi keskin kamayadi.',
  },
  {
    id: 6,
    text: 'Tarixdagi birinchi kompyuter sichqonchasi 1964-yilda kim tomonidan yog‘och korpusda yaratilgan?',
    options: ['Duglas Engelbart', 'Stiv Jobs', 'Bill Geyts', 'Alan Tyuring'],
    answer: 0,
    explanation:
      'Amerikalik muhandis va ixtirochi Duglas Engelbart 1964-yilda Stenford ilmiy-tadqiqot institutida yog‘ochdan yasalgan birinchi manipulyator-sichqonchani ixtiro qilgan.',
  },
  {
    id: 7,
    text: 'Sichqonchaning texnik xususiyatlarida ko‘rsatiladigan "DPI" (yoki CPI) parametri nimani anglatadi?',
    options: [
      'Sichqonchaning sezgirligi va 1 dyuym masofadagi nuqtalar soni (aniqlik ko‘rsatkichi)',
      'Sichqoncha simining maksimal uzunligini',
      'Bir daqiqada bosish mumkin bo‘lgan maksimal marta sonini',
      'Sichqonchaning batareya quvvati sig‘imini',
    ],
    answer: 0,
    explanation:
      'DPI (Dots Per Inch) — sichqonchaning jismonan 1 dyuym (2.54 sm) harakatlanganda kursorning ekranda necha piksel siljishini belgilaydi. Tibbiy rentgen yoki UTT tahlilida yuqori DPI kursor aniqligini ta’minlaydi.',
  },
  {
    id: 8,
    text: 'Optik va lazerli sichqonchalarning ishlash prinsipidagi asosiy farq nimada?',
    options: [
      'Optik sichqoncha LED yorug‘lik diodi bilan, lazerli sichqoncha esa ingichka lazer nuri bilan sirtni skanerlaydi',
      'Optik sichqoncha simsiz ishlaydi, lazerli esa faqat simli bo‘ladi',
      'Optik sichqonchada koptokcha bo‘ladi, lazerlida esa yo‘q',
      'Lazerli sichqoncha faqat matn yozishda ishlatiladi',
    ],
    answer: 0,
    explanation:
      'Optik sichqonchalar qizil yoki ko‘k LED diod orqali yuzani yoritadi; lazerli sichqonchalar esa nozik lazer nuri yordamida hatto shisha va yaltiroq yuzalarda ham o‘ta aniq ishlay oladi.',
  },
  {
    id: 9,
    text: 'Hamshira bemorning elektron tibbiy kartasini (EMK) to‘ldirishda 10 barmoq bilan tez yozish texnikasini egallasa, uning asosiy afzalligi nimada bo‘ladi?',
    options: [
      'Hujjatlashtirish vaqti 2-3 barobar qisqaradi va bemorga ko‘proq e’tibor qaratiladi',
      'Kompyuter kamroq elektr toki sarflaydi',
      'Klaviaturaning xizmat muddati tugamaydi',
      'Test natijalari o‘z-o‘zidan tuzalib qoladi',
    ],
    answer: 0,
    explanation:
      'Tez yozish ko‘nikmasi hamshira va shifokorlarga kiritish tezligini oshirish, xatolarni kamaytirish va bemorni tekshirishga ko‘proq klinik vaqt ajratish imkonini beradi.',
  },
  {
    id: 10,
    text: 'Sichqonchaning O‘NG tugmasi (Right Click) bosilganda operatsion tizimda odatda nima sodir bo‘ladi?',
    options: [
      'Tanlangan obyekt yoki maydonga mos Kontekst menyu (amallar ro‘yxati) ochiladi',
      'Fayl darhol o‘chib ketadi',
      'Kompyuter qayta ishga tushadi',
      'Kursor ekranning o‘rtasiga sakrab o‘tadi',
    ],
    answer: 0,
    explanation:
      'Sichqonchaning o‘ng tugmasi aynan o‘sha obyektga tegishli kontekst menyuni (Nusxalash, Nomini o‘zgartirish, Xususiyatlar, Saqlash va h.k.) ochadi.',
  },
];

export const PRACTICE_QUESTIONS: QuizQuestion[] = [
  {
    id: 11,
    text: 'Matn yoki faylni tezkor nusxalash (Copy) uchun qaysi klaviatura birikmasi qo‘llaniladi?',
    options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
    answer: 0,
    explanation:
      'Ctrl + C birikmasi belgilangan har qanday obyektni tezkor xotiraga (buferga) nusxalaydi.',
  },
  {
    id: 12,
    text: 'Nusxalangan yoki qirqib olingan tibbiy ma’lumotni kerakli joyga joylashtirish (Paste) qaysi birikma bilan bajariladi?',
    options: ['Ctrl + V', 'Ctrl + P', 'Ctrl + N', 'Ctrl + B'],
    answer: 0,
    explanation:
      'Ctrl + V birikmasi xotiradagi (buferdagi) ma’lumotni kursordan keyingi joyga qo‘yadi.',
  },
  {
    id: 13,
    text: 'Shifokor xulosasi yoki tahlil matnini xatolik tufayli noto‘g‘ri o‘chirib yuborganda, oxirgi amalni bekor qilish (Undo) uchun nima bosiladi?',
    options: ['Ctrl + Z', 'Ctrl + Y', 'Alt + F4', 'Ctrl + W'],
    answer: 0,
    explanation:
      'Ctrl + Z oxirgi bajarilgan xato amalni darhol orqaga qaytaradi (bekor qiladi).',
  },
  {
    id: 14,
    text: 'Hujjat ustida ishlab bo‘lgach, uni to‘satdan elektr uzilishidan saqlash uchun qaysi tezkor tugma bosiladi?',
    options: ['Ctrl + S', 'Ctrl + P', 'Ctrl + O', 'F5'],
    answer: 0,
    explanation:
      'Ctrl + S barcha dasturlarda (Word, Excel, tibbiy tizimlar) joriy faylni darhol xotiraga saqlaydi.',
  },
  {
    id: 15,
    text: 'Ochiq turgan barcha dasturlar va oynalar o‘rtasida sichqonchasiz tezkor almashish uchun qaysi birikma bosiladi?',
    options: ['Alt + Tab', 'Ctrl + Tab', 'Win + Tab', 'Shift + Tab'],
    answer: 0,
    explanation:
      'Alt + Tab tugmalari bir vaqtning o‘zida ochiq ilovalar ro‘yxatini ko‘rsatib, ular o‘rtasida bir zumda o‘tish imkonini beradi.',
  },
  {
    id: 16,
    text: 'Tibbiyot xodimi ish joyidan vaqtincha uzoqlashganda, bemor ma’lumotlari boshqalarga ko‘rinmasligi uchun kompyuterni bir zumda qulflash (Lock):',
    options: ['Win + L', 'Win + D', 'Ctrl + L', 'Alt + L'],
    answer: 0,
    explanation:
      'Win + L (Lock) darhol tizimni blokirovka qiladi va parol kiritish ekraniga o‘tkazadi. Bu tibbiy maxfiylik talabidir.',
  },
  {
    id: 17,
    text: 'Fayl yoki papkaning nomini tezkor o‘zgartirish (Rename) uchun qaysi funksional klavisha bosiladi?',
    options: ['F2', 'F4', 'F5', 'F12'],
    answer: 0,
    explanation:
      'F2 tugmasi belgilangan fayl yoki papka nomini tahrirlash rejimiga o‘tkazadi.',
  },
  {
    id: 18,
    text: 'Dastur qotib qolganda uni to‘xtatish uchun Vazifalar dispetcherini (Task Manager) to‘g‘ridan-to‘g‘ri ochuvchi birikma qaysi?',
    options: ['Ctrl + Shift + Esc', 'Ctrl + Alt + Del', 'Alt + F4', 'Win + R'],
    answer: 0,
    explanation:
      'Ctrl + Shift + Esc birikmasi Task Manager dasturini hech qanday oraliq menyusiz to‘g‘ridan-to‘g‘ri ekranga chiqaradi.',
  },
  {
    id: 19,
    text: 'Hujjatdagi yoki papkadagi barcha ma’lumotlarni birato‘la to‘liq belgilash (Select All) qaysi birikma orqali qilinadi?',
    options: ['Ctrl + A', 'Ctrl + All', 'Shift + End', 'Ctrl + Shift + A'],
    answer: 0,
    explanation:
      'Ctrl + A (All) joriy oyna yoki hujjatdagi barcha obyektlarni to‘liq tanlab beradi.',
  },
  {
    id: 20,
    text: 'Bir papkadagi bir-biriga qo‘shni bo‘lmagan (tarqoq) bir nechta fayllarni sichqoncha bilan tanlash uchun qaysi klavisha bosib turiladi?',
    options: ['Ctrl', 'Shift', 'Alt', 'Tab'],
    answer: 0,
    explanation:
      'Ctrl tugmasini bosib turib sichqonchaning chap tugmasi bilan fayllar bosilsa, faqat tanlangan tarqoq fayllar belgilanadi. Shift esa oraliqdagi barcha fayllarni birin-ketin belgilaydi.',
  },
];

export const TOTAL_QUESTIONS = THEORY_QUESTIONS.length + PRACTICE_QUESTIONS.length;

export type OrderMap = {
  [bank in BankKey]: {[questionId: number]: number[]};
};

function shuffle(array: number[]): number[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildOrders(doShuffle: boolean): OrderMap {
  const map: OrderMap = {theory: {}, practice: {}};
  for (const q of THEORY_QUESTIONS) {
    map.theory[q.id] = doShuffle
      ? shuffle(q.options.map((_, i) => i))
      : q.options.map((_, i) => i);
  }
  for (const q of PRACTICE_QUESTIONS) {
    map.practice[q.id] = doShuffle
      ? shuffle(q.options.map((_, i) => i))
      : q.options.map((_, i) => i);
  }
  return map;
}

export function reshuffleBank(current: OrderMap, bank: BankKey): OrderMap {
  const questions = bank === 'theory' ? THEORY_QUESTIONS : PRACTICE_QUESTIONS;
  const updated: {[qId: number]: number[]} = {};
  for (const q of questions) {
    updated[q.id] = shuffle(q.options.map((_, i) => i));
  }
  return {...current, [bank]: updated};
}
