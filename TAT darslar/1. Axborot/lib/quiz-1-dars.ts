import type {FigureKey} from '@/components/quiz-figures';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** optional illustration rendered between the question and the options */
  figure?: FigureKey;
}

export interface QuizBank {
  key: 'theory' | 'practice';
  label: string;
  short: string;
  description: string;
  questions: QuizQuestion[];
}

/* ========================================================================== */
/*  NAZARIY TEST - 2-qism (axborot tushunchasi, shakllari, xususiyatlari)      */
/* ========================================================================== */

const THEORY: QuizQuestion[] = [
  {
    id: 101,
    question:
      "Bemor qon bosimi 120/80 mm sim. ust. va tana harorati 36.6 °C ekanligi haqidagi ma'lumot tibbiyotda qaysi axborot turiga kiradi?",
    options: [
      'A) Raqamli axborot',
      'B) Ovozli axborot',
      'C) Grafik axborot',
      'D) Faqat tasviriy axborot',
    ],
    correctIndex: 0,
    explanation:
      "Qon bosimi, puls, tana harorati va laboratoriya tahlil ko'rsatkichlari aniq raqamli o'lchovlar bilan ifodalangani sababli 'Raqamli axborot' turiga kiradi.",
    figure: 'vitals',
  },
  {
    id: 102,
    question:
      "Hamshira shifokor tomonidan bemorga buyurilgan dori dozasini (masalan, 5 mg o'rniga 50 mg emas) xatosiz kiritishi axborotning qaysi muhim xususiyatiga misol bo'ladi?",
    options: [
      'A) Axborotning ochiqligi',
      "B) Axborotning aniqligi va to'g'riligi",
      "C) Axborotning faqat og'zaki bo'lishi",
      'D) Axborotning qimmatligi',
    ],
    correctIndex: 1,
    explanation:
      "Dori dozasi yoki bemor tahlil ko'rsatkichlarining xatosiz, to'g'ri qayd etilishi axborotning eng asosiy talabi bo'lgan 'Aniqlik' (to'g'rilik) xususiyatidir.",
  },
  {
    id: 103,
    question:
      "Yurak ritmi kardiogramma tasmasida egri chiziq ko'rinishida, rentgen tekshiruvi natijasi esa surat ko'rinishida namoyon bo'ladi. Bu qaysi axborot shakllariga mos keladi?",
    options: [
      'A) Faqat raqamli axborot',
      'B) Faqat matnli axborot',
      'C) Grafik va tasviriy axborot',
      'D) Ovozli axborot',
    ],
    correctIndex: 2,
    explanation:
      "Kardiogrammadagi egri chiziq - grafik axborot, rentgen va ultratovush apparati suratlari esa tasviriy axborot shaklida namoyon bo'ladi.",
    figure: 'ecg',
  },
  {
    id: 104,
    question:
      "Bemorning kasallik tarixi va shaxsiy ma'lumotlarini ruxsatsiz begona kishilarga oshkor qilmaslik axborotning qaysi tamoyiliga to'g'ri keladi?",
    options: [
      'A) Axborotning ommaviyligi',
      'B) Axborotning bepul tarqatilishi',
      "C) Axborotning doimiy o'zgaruvchanligi",
      'D) Axborot maxfiyligi va hamshiralik siri',
    ],
    correctIndex: 3,
    explanation:
      "Bemorning sog'lig'i, tashxisi va davolash rejasiga oid ma'lumotlar qonun bilan himoyalangan 'Tibbiy sir' va maxfiy axborot hisoblanadi.",
    figure: 'medicalSecret',
  },
  {
    id: 105,
    question:
      'Inson atrofdagi axborotning eng katta qismini qaysi idrok (sezgi) organi orqali qabul qiladi?',
    options: [
      "A) Ko'rish organi (ko'z)",
      'B) Eshitish organi (quloq)',
      'C) Hid bilish organi (burun)',
      "D) Ta'm bilish organi (til)",
    ],
    correctIndex: 0,
    explanation:
      "Inson axborotning taxminan 80-90 foizini ko'rish orqali oladi. Shuning uchun tibbiyotda monitor ko'rsatkichlari, tahlil blankalari va rentgen suratlari asosiy axborot manbai hisoblanadi.",
    figure: 'senses',
  },
  {
    id: 106,
    question:
      "Hamshira fonendoskop yordamida bemorning yurak urishi va nafas olish shovqinini tinglamoqda. Bu qaysi shakldagi axborot?",
    options: [
      'A) Matnli axborot',
      'B) Ovozli (tovushli) axborot',
      'C) Raqamli axborot',
      'D) Grafik axborot',
    ],
    correctIndex: 1,
    explanation:
      "Fonendoskop orqali eshitiladigan yurak tonlari va nafas shovqinlari eshitish organi orqali qabul qilinadigan ovozli (tovushli) axborotdir.",
  },
  {
    id: 107,
    question:
      "Hamshiralik kundaligiga yozilgan \"Bemor tunni tinch o'tkazdi, shikoyatlari yo'q\" degan yozuv qaysi axborot shakliga misol?",
    options: [
      'A) Raqamli axborot',
      'B) Tasviriy axborot',
      'C) Matnli axborot',
      'D) Video axborot',
    ],
    correctIndex: 2,
    explanation:
      "Harflar va so'zlar yordamida yozib qoldirilgan har qanday qayd - matnli axborot. Hamshiralik kundaligi, epikriz va shifokor xulosasi shu shaklga kiradi.",
    figure: 'infoForms',
  },
  {
    id: 108,
    question:
      "Shoshilinch operatsiyaga tayyorlanayotgan bemorning qon guruhi tahlili natijasi operatsiya tugagandan keyin yetib keldi. Axborotning qaysi xususiyati buzilgan?",
    options: [
      'A) Maxfiylik',
      'B) Tushunarlilik',
      'C) Ommaviylik',
      "D) O'z vaqtidalik (dolzarblik)",
    ],
    correctIndex: 3,
    explanation:
      "Axborot kerakli paytda yetib kelgandagina qimmatga ega. Kechikkan tahlil natijasi qanchalik aniq bo'lmasin, o'z vaqtidalik xususiyatini yo'qotgani uchun foydasiz bo'lib qoladi.",
  },
  {
    id: 109,
    question: "Axborot texnologiyalari deganda nima tushuniladi?",
    options: [
      "A) Axborotni yig'ish, saqlash, qayta ishlash va uzatish usullari hamda vositalari majmui",
      'B) Faqat kompyuterni tozalash va ta\'mirlash jarayoni',
      "C) Faqat internetdan foydalanish qoidalari",
      'D) Faqat bemor bilan suhbatlashish odobi',
    ],
    correctIndex: 0,
    explanation:
      "Axborot texnologiyalari - bu axborotni yig'ish, saqlash, qayta ishlash, uzatish va himoyalash uchun qo'llaniladigan usullar, dasturlar va texnik vositalar majmuidir.",
  },
  {
    id: 110,
    question:
      "Bemorning elektron kartasida dorilarga allergiyasi haqidagi qator to'ldirilmay qolgan. Axborotning qaysi xususiyati ta'minlanmagan?",
    options: [
      'A) Maxfiylik',
      "B) To'liqlik (yetarlilik)",
      'C) Raqamlilik',
      'D) Ommabopligi',
    ],
    correctIndex: 1,
    explanation:
      "Qaror qabul qilish uchun axborot yetarli va to'liq bo'lishi shart. Allergiya haqidagi ma'lumotning yo'qligi - to'liqlik xususiyatining buzilishi bo'lib, bemor hayoti uchun bevosita xavf tug'diradi.",
  },
  {
    id: 111,
    question:
      "Bemorning barcha klinik ma'lumotlari, tashxislari, tahlil natijalari va retseptlari saqlanadigan yagona raqamli pasport nima deb ataladi?",
    options: [
      'A) Elektron tibbiy karta (EMK / ЭМК)',
      'B) Faqat qog‘oz daftar',
      'C) Rentgen plyonkasi',
      'D) Shifoxona kassa daftari',
    ],
    correctIndex: 0,
    explanation:
      "Elektron tibbiy karta (EMK) - bemorning butun hayoti davomidagi klinik ma'lumotlari, tashxis va muolajalar tarixini saqlaydigan yagona raqamli tizimdir.",
  },
  {
    id: 112,
    question:
      "Uzoq hududlardagi bemorlarni poytaxtdagi yetakchi shifokorlar bilan internet orqali video-konsultatsiya qilish qaysi zamonaviy yo‘nalish hisoblanadi?",
    options: [
      'A) Farmatsevtik ombor',
      'B) Telemeditsina (Masofaviy tibbiy konsultatsiya)',
      'C) Faqat qog‘oz arxivlash',
      'D) Fizioterapiya mashqlari',
    ],
    correctIndex: 1,
    explanation:
      "Telemeditsina zamonaviy axborot-kommunikatsiya kanallari orqali masofadan turib bemorlarga tashxis qo‘yish, konsultatsiya berish va operatsiyalarni kuzatish imkonini beradi.",
  },
  {
    id: 113,
    question:
      "Shifokor yozgan dori retseptining to'g'ridan-to'g'ri dorixonalar markaziy bazasiga elektron tarzda yuklanishi qanday nomlanadi?",
    options: [
      'A) Elektron retsept (E-Prescribing)',
      'B) Qo‘lda yozilgan qog‘oz blanka',
      'C) Kassa cheki',
      'D) Hamshiralik anketasi',
    ],
    correctIndex: 0,
    explanation:
      "Elektron retsept (E-Prescribing) tizimida retsept to‘g‘ridan-to‘g‘ri dorixonalar bazasiga uzatiladi. Bemor pasport kodi yoki elektron ID orqali dorini xatosiz qabul qilib oladi.",
  },
  {
    id: 114,
    question:
      "Sun'iy intellekt (AI Assistant) rentgen va MRT tasvirlari asosida pnevmoniya va o‘pka kasalliklarini qanday aniqlik darajasida avtomatik tahlil qila oladi?",
    options: [
      'A) 30% aniqlikda',
      'B) 98% gacha aniqlikda',
      'C) 5% aniqlikda',
      'D) Sun‘iy intellekt tibbiyotda tasvirlarni tahlil qila olmaydi',
    ],
    correctIndex: 1,
    explanation:
      "Tibbiy neyron tarmoqlar rentgen va MRT suratlarini 98% gacha aniqlikda tahlil qilib, inson ko‘zi ilg‘amas o‘zgarishlarni aniqlaydi va shifokorga hisobot taqdim etadi.",
  },
  {
    id: 115,
    question:
      "Elektron tizimlarga o'tish hisobiga shifoxonada qog'oz sarfi (tejalishi) necha foizni tashkil etadi?",
    options: [
      'A) 10%',
      'B) 25%',
      'C) 85%',
      'D) Qog‘oz umuman tejalmaydi',
    ],
    correctIndex: 2,
    explanation:
      "Elektron kasallik tarixi va laboratoriya bazasiga to‘liq o‘tilishi hisobiga shifoxonadagi qog‘oz sarfi o‘rtacha 85% ga qisqaradi.",
  },
];

/* ========================================================================== */
/*  AMALIY TEST - 3-qism (qurilmalar, sichqoncha, klaviatura, ish tartibi)     */
/* ========================================================================== */

const PRACTICE: QuizQuestion[] = [
  {
    id: 201,
    question:
      "Navbatchi hamshira kompyuterdagi bemorlar ro'yxatidan kerakli bemor ismini tanlash uchun sichqonchaning qaysi amalini bajarishi lozim?",
    options: [
      "A) O'ng tugmani ketma-ket uch marta bosish",
      'B) Kompyuter quvvat tugmasini bosish',
      'C) Chap tugmani bir marta bosish (tanlash)',
      'D) Probel tugmasini bosib turish',
    ],
    correctIndex: 2,
    explanation:
      "Tizim ro'yxatidan kerakli bemorni yoki buyruq katakchasini tanlash uchun sichqonchaning chap tugmasi bir marta bosiladi.",
    figure: 'mouse',
  },
  {
    id: 202,
    question:
      "Hamshira bemorning qon bosimi va puls raqamlarini tez hamda xatosiz kiritmoqchi. Klaviaturaning qaysi qismidan foydalangani eng qulay?",
    options: [
      'A) Funksional tugmalar (F1-F12) qatoridan',
      "B) Yo'naltiruvchi (strelka) tugmalardan",
      'C) Probel tugmasidan',
      "D) O'ng tomondagi raqamli blokdan (Numpad)",
    ],
    correctIndex: 3,
    explanation:
      "Raqamli ko'rsatkichlarni bir qo'l bilan tez va xatosiz terish uchun klaviaturaning o'ng qismidagi raqamli blok (Numpad) eng samarali hisoblanadi.",
    figure: 'keyboardZones',
  },
  {
    id: 203,
    question:
      'Ish kuni yakunida bemorlar bazasi shikastlanmasligi uchun kompyuter qanday tartibda o‘chirilishi kerak?',
    options: [
      "A) Ma'lumotlarni saqlab, dasturlardan chiqib, 'Boshlash' menyusi orqali tizimni o'chirish",
      'B) Elektr vilkasini darhol rozetkadan uzib qo\'yish',
      'C) Faqat monitorni o\'chirib, tizim blokini yoqiq qoldirish',
      'D) Quvvat tugmasini 10 soniya bosib ushlab turish',
    ],
    correctIndex: 0,
    explanation:
      "Avval barcha ma'lumotlar saqlanadi, dasturlar yopiladi va faqat shundan keyin 'Boshlash → Tizimni o'chirish' orqali kompyuter xavfsiz o'chiriladi.",
    figure: 'shutdown',
  },
  {
    id: 204,
    question:
      "Hamshira raqamli blokda 120/80 ni terayotganda ekranga hech qanday raqam chiqmayapti. Eng ehtimoliy sabab nima?",
    options: [
      'A) Monitor ishdan chiqqan',
      "B) Num Lock indikatori o'chiq",
      'C) Sichqoncha ulanmagan',
      'D) Printerda qog\'oz tugagan',
    ],
    correctIndex: 1,
    explanation:
      "Raqamli blok faqat Num Lock chirog'i yoniq bo'lgandagina raqam yozadi. Chiroq o'chiq bo'lsa, o'sha tugmalar kursorni boshqarish rejimida ishlaydi.",
    figure: 'ledsNum',
  },
  {
    id: 205,
    question:
      "Bemor familiyasini yozayotganda barcha harflar BOSH HARFDA chiqmoqda. Buning sababi nima?",
    options: [
      'A) Scroll Lock yoqilgan',
      'B) Klaviatura buzilgan',
      'C) Caps Lock yoqilgan',
      'D) Tizim bloki qizib ketgan',
    ],
    correctIndex: 2,
    explanation:
      "Caps Lock chirog'i yoniq bo'lsa, barcha harflar bosh harf bilan yoziladi. Uni o'chirish uchun Caps Lock tugmasi qayta bosiladi.",
    figure: 'ledsCaps',
  },
  {
    id: 206,
    question:
      "Ish stolidagi bemorlar bazasi dasturini (yorliqni) ochish uchun sichqoncha bilan qanday amal bajariladi?",
    options: [
      "A) O'ng tugmani bir marta bosish",
      "B) G'ildirakni pastga aylantirish",
      'C) Yorliqni ekran chetiga surish',
      'D) Chap tugmani tez ikki marta bosish (double click)',
    ],
    correctIndex: 3,
    explanation:
      "Dastur yoki faylni ochish uchun uning yorlig'i ustida sichqonchaning chap tugmasi tez ikki marta bosiladi (double click).",
  },
  {
    id: 207,
    question:
      "Fayl yoki ish stoli ustida sichqonchaning o'ng tugmasi bosilganda ochiladigan qo'shimcha tezkor buyruqlar menyusi qanday ataladi?",
    options: [
      "A) Kontekst menyu (Context menu)",
      'B) Boshlash menyusi',
      'C) Vazifalar paneli',
      'D) Soat va sana bloki',
    ],
    correctIndex: 0,
    explanation:
      "Sichqonchaning o'ng tugmasi kontekst menyuni ochadi. Bu menyu orqali yangi papka yaratish, nusxalash, tahrirlash kabi amallar tez bajariladi.",
    figure: 'mouse',
  },
  {
    id: 208,
    question:
      "Elektr ta'minoti tekshirilgandan so'ng kompyuter qanday tartibda yoqiladi?",
    options: [
      'A) Avval printer, keyin sichqoncha',
      "B) Avval tizim blokining Power tugmasi, so'ng monitor",
      'C) Avval Enter tugmasi bosiladi',
      "D) Tartibning ahamiyati yo'q, hammasi bir vaqtda",
    ],
    correctIndex: 1,
    explanation:
      "To'g'ri tartib: rozetka va stabilizator tekshiriladi → tizim blokining Power tugmasi bosiladi → monitor yoqiladi → shaxsiy login va parol kiritiladi.",
  },
  {
    id: 209,
    question:
      "Bemor ko'rsatkichlarini maydonga kiritib bo'lgach, uni tasdiqlash yoki keyingi qatorga o'tish uchun qaysi tugma bosiladi?",
    options: [
      'A) Caps Lock',
      'B) Esc',
      'C) Enter',
      'D) Scroll Lock',
    ],
    correctIndex: 2,
    explanation:
      "Enter tugmasi kiritilgan ma'lumotni tasdiqlaydi, buyruqni ishga tushiradi yoki matnda yangi qatorga o'tkazadi.",
    figure: 'enterKey',
  },
  {
    id: 210,
    question:
      'Monitor va printer kompyuterning qanday qurilmalari hisoblanadi?',
    options: [
      'A) Axborotni kiritish qurilmalari',
      'B) Axborotni saqlash qurilmalari',
      'C) Faqat bezak qurilmalari',
      'D) Axborotni chiqarish qurilmalari',
    ],
    correctIndex: 3,
    explanation:
      "Monitor axborotni ekranda ko'rsatadi, printer esa qog'ozga chop etadi - bular ikkalasi ham axborotni inson qabul qiladigan shaklda chiqarish qurilmalaridir.",
  },
  {
    id: 211,
    question:
      "Sichqonchaning o'rtasida joylashgan g'ildirakcha (Колесо мыши / Scroll) asosan nima uchun xizmat qiladi?",
    options: [
      "A) Kompyuter quvvatini o'chirish uchun",
      "B) Uzun reyestrlar, jadvallar va hujjatlarni yuqoriga-pastga varaqlash (prokrutka) uchun",
      "C) Harflarni bosh harfga o'tkazish uchun",
      "D) Faqat ovoz balandligini o'zgartirish uchun",
    ],
    correctIndex: 1,
    explanation:
      "Sichqoncha g'ildirakchasi (Scroll) sahifalarni, elektron bemorlar reyestrini va ko'p sahifali laboratoriya jurnallarini tezkor ravishda yuqoriga yoki pastga aylantirib ko'rish uchun xizmat qiladi.",
  },
  {
    id: 212,
    question:
      "Drag and Drop (Sudrab tashlash) amali qanday bajariladi?",
    options: [
      "A) Faqat klaviaturadagi strelkalarni bosish orqali",
      "B) Sichqonchaning o'ng tugmasini 5 marta bosish orqali",
      "C) Sichqonchaning chap tugmasini obyekt ustida bosib turgan holda kerakli joyga sudrab olib borish va qo'yib yuborish orqali",
      "D) Monitorni burish orqali",
    ],
    correctIndex: 2,
    explanation:
      "Drag and Drop - ob'ekt (masalan, fayl) ustida chap tugmani bosib turib boshqa joyga (masalan, savatga yoki boshqa papkaga) sudrab olib borish va tugmani qo'yib yuborish orqali joylashtirish amalidir.",
  },
  {
    id: 213,
    question:
      "Ish stolida kontekst menyu orqali yangi papka yaratish ketma-ketligi qaysi javobda to'g'ri ko'rsatilgan?",
    options: [
      "A) Ish stolida o'ng tugma → Yaratish (Создать) → Yangi papka (Папка)",
      "B) Chap tugmani ikki marta bosish → O'chirish",
      "C) Klaviatura quvvatini o'chirish",
      "D) Faqat Num Lock tugmasini bosish",
    ],
    correctIndex: 0,
    explanation:
      "Ish stoli bo'sh maydonida o'ng tugma bosiladi, ochilgan kontekst menyudan 'Yaratish' (Создать) va so'ng 'Yangi papka' (Папка) tanlanadi.",
  },
  {
    id: 214,
    question:
      "Keraksiz yoki xato yozilgan tibbiy hujjat faylini Savatga (Корзина) tashlash uchun qaysi sichqoncha usuli eng qulay?",
    options: [
      "A) Faylni sichqoncha chap tugmasi bilan ushlab, savat (Корзина) belgisi ustiga sudrab tashlash (Drag and Drop)",
      "B) Sichqoncha g'ildirakchasini 10 marta aylantirish",
      "C) Monitorni o'chirib yoqish",
      "D) Faqat klaviaturadagi Esc tugmasini bosish",
    ],
    correctIndex: 0,
    explanation:
      "Keraksiz fayllarni savatga tashlashning eng ko'rgazmali usuli - uni sichqoncha chap tugmasi bilan ushlab turib (Drag) to'g'ridan-to'g'ri savat (Корзина) ustiga qo'yib yuborishdir (Drop).",
  },
  {
    id: 215,
    question:
      "Tibbiyot muassasalariga axborot tizimlarining joriy etilishi natijasida hujjatlar aylanmasi tezligi qanchaga oshdi?",
    options: [
      "A) Tezlik o'zgarmadi",
      "B) 10 barobar tezlashdi (10x ko'rsatkich)",
      "C) 2 barobar sekinlashdi",
      "D) Faqat 5 foizga oshdi",
    ],
    correctIndex: 1,
    explanation:
      "Raqamli tizimlarga o'tilishi bilan qog'oz blankalarni qo'lda to'ldirish va bo'limlararo yetkazish vaqti tejalib, hujjatlar aylanmasi 10 barobar tezlashdi.",
  },
];

export const QUIZ_BANKS: QuizBank[] = [
  {
    key: 'theory',
    label: 'Nazariy test',
    short: 'Nazariya',
    description:
      'Axborot tushunchasi, uning 7 ta ko‘rinishi va 5 ta klinik xususiyati bo‘yicha savollar.',
    questions: THEORY,
  },
  {
    key: 'practice',
    label: 'Amaliy test',
    short: 'Amaliyot',
    description:
      'Kompyuter qismlari, sichqoncha, klaviatura (NUM/CAPS/SCROLL) va to‘g‘ri ish tartibi.',
    questions: PRACTICE,
  },
];

export const TOTAL_QUESTIONS = QUIZ_BANKS.reduce(
  (n, b) => n + b.questions.length,
  0,
);

export function grade(percent: number): string {
  if (percent >= 86) return "5 (A'lo)";
  if (percent >= 71) return '4 (Yaxshi)';
  if (percent >= 55) return '3 (Qoniqarli)';
  return '2 (Qoniqarsiz)';
}

/* ========================================================================== */
/*  JAVOB VARIANTLARINI ARALASHTIRISH                                          */
/* ========================================================================== */

/** Bitta savol uchun: ko'rsatiladigan o'rin -> variantning asl indeksi. */
export type OptionOrder = Record<number, number[]>;

export type OrderMap = Record<QuizBank['key'], OptionOrder>;

function permutation(n: number, shuffle: boolean): number[] {
  const a = Array.from({length: n}, (_, i) => i);
  if (!shuffle) return a;
  // Fisher-Yates
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function ordersFor(key: QuizBank['key'], shuffle: boolean): OptionOrder {
  const bank = QUIZ_BANKS.find((b) => b.key === key)!;
  const out: OptionOrder = {};
  for (const q of bank.questions) {
    out[q.id] = permutation(q.options.length, shuffle);
  }
  return out;
}

/**
 * Sahifa oldindan render qilinadi (prerender), shuning uchun birinchi chizishda
 * tartib aralashmagan (tabiiy) bo'lishi shart - aks holda server va brauzer
 * HTML'i mos kelmaydi. Haqiqiy aralashtirish mountdan keyin effektda beriladi.
 */
export function buildOrders(shuffle: boolean): OrderMap {
  return {
    theory: ordersFor('theory', shuffle),
    practice: ordersFor('practice', shuffle),
  };
}

/** "Qaytadan" bosilganda faqat o'sha test qaytadan aralashtiriladi. */
export function reshuffleBank(orders: OrderMap, key: QuizBank['key']): OrderMap {
  return {...orders, [key]: ordersFor(key, true)};
}

/**
 * Variantlar bazada "A) ..." ko'rinishida yozilgan. Tartib aralashgandan keyin
 * o'sha harf noto'g'ri bo'lib qoladi, shuning uchun matndan olib tashlanadi va
 * harf ekrandagi o'ringa qarab qaytadan chiziladi.
 */
export function optionText(option: string): string {
  return option.replace(/^[A-Z]\)\s*/, '');
}
