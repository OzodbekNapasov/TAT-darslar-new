export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  figure?: string;
}

export interface QuizBank {
  key: 'theory' | 'practice';
  label: string;
  short: string;
  description: string;
  questions: QuizQuestion[];
}

/* ========================================================================== */
/*  NAZARIY TEST - axborot turlari va sanoq sistemalari                       */
/* ========================================================================== */

const THEORY: QuizQuestion[] = [
  {
    id: 101,
    question: 'Rim raqamlari (I, V, X, L, C, D, M) qaysi turdagi sanoq sistemasiga misol bo‘ladi?',
    options: [
      'A) Nopozitsion sanoq sistemasi',
      'B) Pozitsion sanoq sistemasi',
      'C) Ikkilik sanoq sistemasi',
      'D) O‘nlik sanoq sistemasi',
    ],
    correctIndex: 0,
    explanation:
      "Rim raqamlari nopozitsion sanoq sistemasiga kiradi, chunki raqamning qiymati uning qaysi o‘rinda turganiga bog‘liq emas (masalan, X har doim 10 ni bildiradi).",
  },
  {
    id: 102,
    question: 'O‘nlik (10 lik) sanoq sistemasining asosi nechaga teng va unda qaysi raqamlar qatnashadi?',
    options: [
      'A) Asosi 10 ga teng, 0 dan 9 gacha bo‘lgan 10 ta raqam',
      'B) Asosi 9 ga teng, 1 dan 9 gacha sonlar',
      'C) Asosi 2 ga teng, faqat 0 va 1 raqamlari',
      'D) Asosi 16 ga teng, harflar va raqamlar',
    ],
    correctIndex: 0,
    explanation:
      "O‘nlik sanoq sistemasining asosi 10 ga teng va unda 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 raqamlari ishlatiladi. Tibbiyotda dori dozalari va ko‘rsatkichlar shu sistemada yoziladi.",
  },
  {
    id: 103,
    question: 'Kompyuter va raqamli tibbiyot texnikasi nima sababli aynan 2 lik sanoq sistemasida ishlaydi?',
    options: [
      'A) Mikrosxemalardagi elektr signallari ikki holatga ega: signal bor (1) yoki yo‘q (0)',
      'B) 2 lik sistemada faqat lotin harflari saqlangani uchun',
      'C) Monitor faqat ikkita rangni ko‘rsata olgani uchun',
      'D) 10 lik sistemani kompyuterga kiritish qonunan taqiqlangani uchun',
    ],
    correctIndex: 0,
    explanation:
      "Kompyuter elektron mikrosxemalardan tuzilgan. Ularda elektr signali bor (1) yoki yo‘q (0) holatida bo‘ladi. Shuning uchun kompyuter faqat 0 va 1 (2 lik sistema) bilan ishlaydi.",
  },
  {
    id: 104,
    question:
      'Kompyuter matn, surat va ovozni xotirasida qanday ko‘rinishda saqlaydi?',
    options: [
      'A) Rasm va harflar ko‘rinishida',
      'B) Faqat 0 dan 9 gacha raqamlar bilan',
      'C) Ovoz to‘lqinlari ko‘rinishida',
      'D) Faqat 0 va 1 raqamlari ketma-ketligi sifatida (ikkilik sistema)',
    ],
    correctIndex: 3,
    explanation:
      "Kompyuterning barcha xotirasi elektr signalining ikki holatiga asoslangan: bor (1) va yo'q (0). Shuning uchun har qanday axborot ikkilik (2 lik) sanoq sistemasiga aylantiriladi.",
  },
  {
    id: 105,
    question: 'Pozitsion sanoq sistemasining nopozitsion sistemadan asosiy farqi nimada?',
    options: [
      'A) Raqamning qiymati uning son ichidagi egallagan o‘rniga (xonasiga) bog‘liq bo‘ladi',
      'B) Pozitsion sistemada hech qachon 0 raqami ishlatilmaydi',
      'C) Pozitsion sistema faqat qog‘ozda ishlatiladi, kompyuterda ishlamaydi',
      'D) Raqamning qiymati har doim o‘zgarmas bir xil bo‘lib qolaveradi',
    ],
    correctIndex: 0,
    explanation:
      "Pozitsion sistemada (masalan 10 likda) raqam turgan o‘rni muhim: 25 sonida 2 raqami yigirmatani bildirsa, 52 sonida 2 raqami ikkitani bildiradi.",
  },
  {
    id: 106,
    question: 'Rentgen tekshiruvi natijasi qaysi axborot turiga kiradi?',
    options: [
      'A) Ovozli axborot',
      'B) Tasviriy axborot',
      'C) Matnli axborot',
      'D) Raqamli axborot',
    ],
    correctIndex: 1,
    explanation:
      "Rentgen, UTT va KT natijalari surat ko'rinishida bo'lgani uchun tasviriy axborot hisoblanadi. Kompyuterda ular odatda .jpg yoki .dcm kengaytmasi bilan saqlanadi.",
  },
  {
    id: 107,
    question:
      'Fonendoskop yozuvi kompyuterga “.mp3” kengaytmasi bilan saqlandi. Bu qaysi axborot turi?',
    options: [
      'A) Tasviriy axborot',
      'B) Matnli axborot',
      'C) Ovozli axborot',
      'D) Video axborot',
    ],
    correctIndex: 2,
    explanation:
      "Fayl kengaytmasi uning turini bildiradi: .mp3 - ovoz, .jpg - tasvir, .docx - matn, .mp4 - video.",
  },
  {
    id: 108,
    question:
      'Ikkilik (binar) sanoq sistemasida qaysi raqamlar ishlatiladi?',
    options: [
      'A) 0 dan 9 gacha barcha raqamlar',
      'B) Faqat 1 va 2 raqamlari',
      'C) 1 dan 10 gacha sonlar',
      'D) Faqat 0 va 1 raqamlari',
    ],
    correctIndex: 3,
    explanation:
      "Ikkilik (2 lik) sanoq sistemasida faqat ikkita belgi — 0 va 1 raqamlari ishlatiladi. Kompyuter elektr signali bor (1) yoki yo'q (0) holatida ishlaydi.",
  },
  {
    id: 109,
    question:
      "Quyidagi fayllardan qaysi biri odatda eng ko'p xotira egallaydi?",
    options: [
      'A) Video yozuv (.mp4)',
      'B) Matnli hujjat (.docx)',
      'C) Ovoz yozuvi (.mp3)',
      'D) Bitta surat (.jpg)',
    ],
    correctIndex: 0,
    explanation:
      "Video - bu ketma-ket kelayotgan minglab suratlar va ovoz birgalikda. Shuning uchun uning hajmi matn, ovoz va bitta suratdan ancha katta bo'ladi.",
  },
  {
    id: 110,
    question: 'Sanoq sistemasi deb nimaga aytiladi?',
    options: [
      'A) Kompyuterni yoqish tartibiga',
      'B) Sonlarni yozish va nomlash usullari hamda qoidalari majmuiga',
      'C) Fayllarni papkalarga joylash usuliga',
      'D) Klaviaturadagi tugmalar joylashuviga',
    ],
    correctIndex: 1,
    explanation:
      "Sanoq sistemasi - sonlarni belgilar yordamida yozish va o'qish qoidalari. Kundalik hayotda 10 lik, kompyuterda esa 2 lik sanoq sistemasi ishlatiladi.",
  },
  {
    id: 111,
    question: "Bemor o'pkasining rentgen tasviri (snimkasi) axborotning qaysi shakliga kiradi?",
    options: [
      'A) Grafik va tasviriy axborot',
      'B) Matnli axborot',
      'C) Audio axborot',
      'D) Faqat sonli axborot',
    ],
    correctIndex: 0,
    explanation:
      "Rentgen snimkalari, MRT va UTT tasvirlari bemor ichki a'zolarining vizual tasvirini beruvchi grafik va tasviriy axborotdir.",
  },
  {
    id: 112,
    question: "Hamshira bemor qonidagi gemoglobin miqdori (145 g/l ko'rsatkichi)ni kiritdi. Bu qanday axborot turidir?",
    options: [
      'A) Sonli (raqamli) axborot',
      'B) Video axborot',
      'C) Matnli axborot',
      'D) Ovozli axborot',
    ],
    correctIndex: 0,
    explanation:
      "Qondagi moddalar miqdori, gemoglobin va laboratoriya ko'rsatkichlari aniq raqamlar bilan ifodalangan sonli axborot hisoblanadi.",
  },
  {
    id: 113,
    question: "Bemorning raqamli kasallik varaqasidagi klinik tashxis matni qaysi axborot turiga mansub?",
    options: [
      'A) Video axborot',
      'B) Matnli axborot',
      'C) Grafik axborot',
      'D) Ovozli axborot',
    ],
    correctIndex: 1,
    explanation:
      "So'zlar, jumlalar va tibbiy atamalar orqali ifodalangan tashxis va epikrizlar matnli axborot turiga kiradi.",
  },
  {
    id: 114,
    question: "Fonendoskop orqali eshitilgan yurak urish tovushlari qaysi axborot turiga kiradi?",
    options: [
      'A) Matnli axborot',
      'B) Sonli axborot',
      'C) Ovozli (audio) axborot',
      'D) Tasviriy axborot',
    ],
    correctIndex: 2,
    explanation:
      "Fonendoskop orqali eshitiladigan yurak tonlari va nafas shovqinlari eshitish organi orqali qabul qilinadigan ovozli (audio) axborotdir.",
  },
  {
    id: 115,
    question: "Inson ko'zi salomatligini saqlash uchun kompyuterda har 20-30 daqiqada nima qilish tavsiya etiladi?",
    options: [
      'A) Monitordan ko\'zni uzib, uzoqroq masofaga 20 soniya qarab turish va ko\'p pirpiratish',
      'B) Tanaffussiz 4 soat ishlash',
      'C) Monitor yorug\'ligini maksimumga qo\'yish',
      'D) Ko\'zni pirpiratmasdan turish',
    ],
    correctIndex: 0,
    explanation:
      "Har 20-30 daqiqada ko'zni ekrandan uzib, uzoq masofaga 20 soniya qarab turish (20-20-20 qoidasi) ko'z qurishi va toliqishining oldini oladi.",
  },
];

/* ========================================================================== */
/*  AMALIY TEST - kompyuterda ishlash, fayllar, xavfsizlik                     */
/* ========================================================================== */

const PRACTICE: QuizQuestion[] = [
  {
    id: 201,
    question:
      "Bemor kartasi ochiq turibdi, lekin hamshiraga vaqtincha boshqa dastur kerak. Oynani yopmasdan vaqtincha olib qo'yish uchun qaysi tugma bosiladi?",
    options: [
      'A) “✕” (yopish) tugmasi',
      'B) “▢” (kattalashtirish) tugmasi',
      'C) “—” (yig‘ish) tugmasi',
      'D) Quvvat tugmasi',
    ],
    correctIndex: 2,
    explanation:
      "“—” tugmasi oynani masalalar paneliga yig'adi: dastur yopilmaydi, kiritilgan ma'lumotlar saqlanib qoladi. “✕” esa dasturni butunlay yopadi.",
  },
  {
    id: 202,
    question: "Kompyuterda o'chirilgan fayl birinchi navbatda qayerga tushadi?",
    options: [
      'A) Butunlay yo‘qoladi',
      'B) Fleshkaga',
      'C) Ish stoliga',
      'D) Savatchaga (Korzina)',
    ],
    correctIndex: 3,
    explanation:
      "O'chirilgan fayl avval Savatchaga tushadi va u yerdan qaytarish mumkin. Faqat Savatcha tozalangandan keyin fayl butunlay yo'qoladi.",
  },
  {
    id: 203,
    question: 'Papkani ochish uchun sichqoncha bilan nima qilinadi?',
    options: [
      'A) Chap tugmani tez ikki marta bosish (double click)',
      'B) O‘ng tugmani bir marta bosish',
      'C) G‘ildirakni aylantirish',
      'D) Ustiga kursorni olib borish yetarli',
    ],
    correctIndex: 0,
    explanation:
      "Papka ham, dastur ham chap tugmani tez ikki marta bosish (double click) orqali ochiladi. Bir marta bosish esa faqat tanlaydi.",
  },
  {
    id: 204,
    question:
      'Faylni nusxalash va boshqa papkaga joylashtirish uchun qaysi klaviatura kombinatsiyalari ishlatiladi?',
    options: [
      'A) Ctrl+A va Ctrl+Z',
      'B) Ctrl+C va Ctrl+V',
      'C) Alt+F4 va Enter',
      'D) Caps Lock va Num Lock',
    ],
    correctIndex: 1,
    explanation:
      "Ctrl+C - nusxa olish, Ctrl+V - joylashtirish. Nusxalashda asl fayl o'z joyida qoladi, ko'chirishda (Ctrl+X) esa yo'qoladi.",
  },
  {
    id: 205,
    question:
      'Bemor hujjatini fleshkaga nusxalab bo‘lgach, fleshkani chiqarishdan oldin nima qilish shart?',
    options: [
      'A) Kompyuter o‘chiriladi',
      'B) Darhol tortib olinadi',
      'C) “Qurilmani xavfsiz uzish” belgisi bosiladi va ruxsat kutiladi',
      'D) Monitor o‘chiriladi',
    ],
    correctIndex: 2,
    explanation:
      "Xavfsiz uzish tizimga fayl yozishni yakunlash imkonini beradi. Ruxsat berilgandan keyingina fleshkani chiqarish mumkin.",
  },
  {
    id: 206,
    question:
      'Fayl nusxalanayotgan paytda fleshka tortib olinsa, nima sodir bo‘ladi?',
    options: [
      'A) Hech narsa bo‘lmaydi',
      'B) Fayl avtomatik qaytadan yoziladi',
      'C) Kompyuter o‘chib qoladi',
      'D) Fayl yarim yozilib buziladi va ochilmaydi',
    ],
    correctIndex: 3,
    explanation:
      "Yozish jarayoni to'xtab qolgani uchun fayl to'liq bo'lmaydi va ochilmaydi. Bemor hujjati bo'lsa - ma'lumot yo'qoladi.",
  },
  {
    id: 207,
    question: 'Monitor ekrani ko‘zdan qanday masofada turishi kerak?',
    options: [
      'A) 50–70 sm',
      'B) 10–20 sm',
      'C) 100–150 sm',
      'D) Masofaning ahamiyati yo‘q',
    ],
    correctIndex: 0,
    explanation:
      "Ekran 50-70 sm masofada, yuqori qirrasi ko'z sathida bo'lishi kerak. Bu ko'z charchashi va bo'yin og'rig'ining oldini oladi.",
  },
  {
    id: 208,
    question: 'Nima uchun ho‘l qo‘l bilan rozetka yoki simga tegish mumkin emas?',
    options: [
      'A) Qo‘l iflos bo‘ladi',
      'B) Suv tokni o‘tkazadi va elektr toki urishi xavfi tug‘iladi',
      'C) Rozetka zanglaydi',
      'D) Kompyuter sekin ishlaydi',
    ],
    correctIndex: 1,
    explanation:
      "Suv elektr tokini yaxshi o'tkazadi, shuning uchun ho'l qo'l bilan tegish tok urishiga olib keladi. Elektr qurilmalari bilan faqat quruq qo'lda ishlanadi.",
  },
  {
    id: 209,
    question: 'Ish stolida yangi papka qanday yaratiladi?',
    options: [
      'A) Enter tugmasini bosib',
      'B) Monitorni o‘chirib-yoqib',
      'C) Bo‘sh joyda o‘ng tugma → “Yaratish” → “Papka”',
      'D) Fleshkani ulash orqali',
    ],
    correctIndex: 2,
    explanation:
      "Bo'sh joyda o'ng tugma kontekst menyuni ochadi, undan “Yaratish → Papka” tanlanadi va papkaga nom beriladi.",
  },
  {
    id: 210,
    question:
      'Bir necha hamshira foydalanadigan umumiy klaviatura va sichqoncha bilan nima qilish kerak?',
    options: [
      'A) Suv bilan yuvish',
      'B) Har kuni almashtirish',
      'C) Hech narsa qilish shart emas',
      'D) Smena oxirida antiseptik bilan artib, dezinfeksiya qilish',
    ],
    correctIndex: 3,
    explanation:
      "Umumiy klaviatura - infeksiya tarqalish yo'li. U antiseptik salfetka bilan artiladi; suv bilan yuvish qurilmani ishdan chiqaradi.",
  },
  {
    id: 211,
    question: "Kompyuterda to'g'ri o'tirish qoidasiga ko'ra tirsaklar va tizzalar taxminan qanday burchak ostida bukilishi kerak?",
    options: [
      'A) 90 gradus burchak ostida',
      'B) 30 gradus',
      'C) 180 gradus',
      'D) O\'tirish burchagining ahamiyati yo\'q',
    ],
    correctIndex: 0,
    explanation:
      "Tirsaklar va tizzalar taxminan 90 gradus burchakda turishi, oyoqlar polga tekis tegishi umurtqa pog'onasiga tushadigan og'irlikni kamaytiradi.",
  },
  {
    id: 212,
    question: "Kompyuter klaviaturasi yonida suv yoki boshqa suyuqlik solingan ochiq stakanni qo'yib ishlash nima sababli xavfli?",
    options: [
      'A) Suyuqlik to\'kilsa qisqa tutashuv va jihozning ishdan chiqishiga sabab bo\'ladi',
      'B) Ekranning rangi o\'zgaradi',
      'C) Internet uzilib qoladi',
      'D) Faqat klaviatura harflari o\'chib ketadi',
    ],
    correctIndex: 0,
    explanation:
      "Elektr qurilmalari yonida suyuqlik saqlash qat'iyan taqiqlanadi. To'kilgan suv klaviatura va tizim blokini kuydirishi va tok urishiga olib kelishi mumkin.",
  },
  {
    id: 213,
    question: "Tok simi qizib ketganda unga ho'l lattani bosib sovutish mumkinmi?",
    options: [
      'A) Yo\'q, suv elektr tokini o\'tkazishi sababli kuchli elektr toki urishi va yong\'inga olib keladi',
      'B) Ha, tez va xavfsiz sovutadi',
      'C) Faqat kompyuter yoqiq paytda mumkin',
      'D) Bu qoidaning farqi yo\'q',
    ],
    correctIndex: 0,
    explanation:
      "Suv tok o'tkazgich hisoblanadi. Tok ostidagi qizigan simga ho'l latta tekkizish hayot uchun xavfli bo'lgan elektr toki urishini keltirib chiqaradi.",
  },
  {
    id: 214,
    question: "Kompyuterdan yoki monitordan g'alati ovoz, tutun yoxud hid chiqsa birinchi navbatda nima qilish shart?",
    options: [
      'A) Darhol ishni to\'xtatish, kompyuterni tarmoqdan uzish va o\'qituvchiga xabar berish',
      'B) Suv sepib o\'chirishga urinish',
      'C) Ishni davom ettirib o\'tirish',
      'D) Monitorni tez-tez o\'chirib yoqish',
    ],
    correctIndex: 0,
    explanation:
      "Favqulodda holatda birinchi navbatda kompyuter quvvati uziladi va o'qituvchi yoki texnik xodimga darhol xabar beriladi.",
  },
  {
    id: 215,
    question: "Tizim blokining orqa paneli simlarini tarmoqdan uzmasdan sudrab tortish qanday oqibatga olib keladi?",
    options: [
      'A) Portlar sinishi, qisqa tutashuv va elektr xavfi keltirib chiqaradi',
      'B) Kompyuter tezroq ishlay boshlaydi',
      'C) Barcha dasturlar yangilanadi',
      'D) Hech qanday xavf yo\'q',
    ],
    correctIndex: 0,
    explanation:
      "Kuchlanish ostidagi simlarni tortish simlar izolyatsiyasini buzadi, portlarni sindiradi va qisqa tutashuv xavfini tug'diradi.",
  },
];

export const QUIZ_BANKS: QuizBank[] = [
  {
    key: 'theory',
    label: 'Nazariy test',
    short: 'Nazariya',
    description:
      "Axborot shakllari va turlari, 2 lik va 10 lik sanoq sistemalari qoidalari bo'yicha savollar.",
    questions: THEORY,
  },
  {
    key: 'practice',
    label: 'Amaliy test',
    short: 'Amaliyot',
    description:
      'Kompyuterda ishlash: oynalar, fayl va papkalar, fleshka, texnika xavfsizligi va gigiena bo‘yicha savollar.',
    questions: PRACTICE,
  },
];

export const TOTAL_QUESTIONS = QUIZ_BANKS.reduce(
  (n, b) => n + b.questions.length,
  0,
);

/** 86 / 71 / 55 chegaralari - texnikumning 5 ballik tizimiga mos. */
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
