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
/*  NAZARIY TEST - AIO, elektron karta va axborot o‘lchov birliklari           */
/* ========================================================================== */

const THEORY: QuizQuestion[] = [
  {
    id: 101,
    question:
      'Avtomatlashtirilgan ishchi o‘rin (AIO) deb nimaga aytiladi?',
    options: [
      'Mutaxassisning kasbiy vazifalarini bajarishga moslashtirilgan texnik va dasturiy vositalar majmuiga',
      'Faqat shifoxonaga o‘rnatilgan bitta printerga',
      'Bemorlar navbat kutadigan xonaga',
      'Internetga ulangan har qanday telefonga',
    ],
    correctIndex: 0,
    explanation:
      'AIO — mutaxassis (hamshira, shifokor, laborant) o‘z kasbiy vazifalarini bajarishi uchun maxsus jihozlangan ish o‘rni: kompyuter, periferiya qurilmalari, maxsus dastur va axborot bazasi birgalikda.',
  },
  {
    id: 102,
    question:
      'AIO ning texnik ta’minotiga quyidagilardan qaysi biri kiradi?',
    options: [
      'Kompyuter, printer, shtrix-kod skaneri va uzluksiz quvvat manbai (UPS)',
      'Bemorning kasallik tarixi matni',
      'Xodimlarning lavozim yo‘riqnomasi',
      'Operatsion tizim va antivirus dasturi',
    ],
    correctIndex: 0,
    explanation:
      'Texnik ta’minot — qo‘l bilan ushlab ko‘rish mumkin bo‘lgan qurilmalar: kompyuter, monitor, printer, skaner, tarmoq jihozi, UPS. Dasturlar — dasturiy ta’minot, ma’lumotlar — axborot ta’minoti, yo‘riqnomalar esa tashkiliy ta’minotga kiradi.',
  },
  {
    id: 103,
    question:
      'Shifoxonadagi barcha kompyuterlar bitta bazaga ulangani nima beradi?',
    options: [
      'Ma’lumot bir marta kiritiladi va barcha bo‘limlarda ko‘rinadi',
      'Kompyuterlar tezroq ishlaydi',
      'Elektr energiyasi tejaladi',
      'Printerga qog‘oz kam ketadi',
    ],
    correctIndex: 0,
    explanation:
      'Registratura kiritgan ma’lumot shifokorda ham, hamshirada ham darhol ko‘rinadi. Shuning uchun bir xil ma’lumotni har bo‘limda qaytadan yozib o‘tirishga hojat qolmaydi.',
  },
  {
    id: 104,
    question:
      'Elektron tibbiy karta (ETK) qog‘oz kartadan qaysi jihati bilan ustun?',
    options: [
      'Bir vaqtda bir necha mutaxassisga ochiladi, yo‘qolmaydi va tez qidiriladi',
      'Uni faqat bitta xona ichida ko‘rish mumkin',
      'Har safar qaytadan qo‘lda ko‘chirib yozish kerak',
      'Unga faqat bitta yozuv sig‘adi',
    ],
    correctIndex: 0,
    explanation:
      'ETK bir nusxada saqlanadi, lekin unga huquqi bo‘lgan bir necha xodim bir vaqtda murojaat qila oladi. Qidiruv soniyalarda bajariladi, yozuvlar yo‘qolmaydi va o‘qilmas qo‘lyozma muammosi yo‘qoladi.',
  },
  {
    id: 105,
    question: 'Bitta bayt nechta bitdan tashkil topgan?',
    options: [
      '8 bit',
      '4 bit',
      '16 bit',
      '1024 bit',
    ],
    correctIndex: 0,
    explanation:
      "1 bayt = 8 bit. Aynan 8 bit bitta harfni, belgini yoki bemorning bitta qon guruhini kompyuterda kodlash uchun yetarli bo'ladi.",
  },
  {
    id: 106,
    question: 'Axborotning eng kichik o‘lchov birligi qaysi?',
    options: [
      'Bit',
      'Bayt',
      'Megabayt',
      'Kilobayt',
    ],
    correctIndex: 0,
    explanation:
      "Bit — axborotning eng kichik o‘lchov birligi. U faqat ikkita qiymatni qabul qiladi: 0 yoki 1 (bor yoki yo‘q).",
  },
  {
    id: 107,
    question: 'Bitta kilobayt (KB) necha baytga teng?',
    options: [
      '1024 bayt',
      '100 bayt',
      '512 bayt',
      '1000 bayt',
    ],
    correctIndex: 0,
    explanation:
      "1 KB = 1024 bayt. Kompyuter ikkilik tizimda ishlagani uchun o‘lchov birliklari 1000 emas, 1024 ga (2 ning 10-darajasi) ko‘paytiriladi.",
  },
  {
    id: 108,
    question: 'Bitta gigabayt (GB) necha megabaytga (MB) teng?',
    options: [
      '1024 MB',
      '10 MB',
      '100 MB',
      '1 000 000 MB',
    ],
    correctIndex: 0,
    explanation:
      "1 GB = 1024 MB. Masalan, shifoxonaning bir oylik rentgen va laboratoriya tahlillari gigabaytlab xotira egallaydi.",
  },
  {
    id: 109,
    question: 'Elektron tibbiy kartada nimalar saqlanadi?',
    options: [
      'Bemorning F.I.Sh., tashxisi, tahlillari, tayinlovlari va ko‘rsatkichlari',
      'Faqat bemorning telefon raqami',
      'Faqat shifoxona binosining rasmlari',
      'Faqat xodimlarning ish haqi',
    ],
    correctIndex: 0,
    explanation:
      'Elektron karta — qog‘oz kartaning kompyuterdagi ko‘rinishi. Bemorga oid barcha yozuv bir joyda turadi va kerak bo‘lganda darhol topiladi.',
  },
  {
    id: 110,
    question:
      'Tibbiy axborot tizimida har bir xodimga alohida login va parol berilishining sababi nima?',
    options: [
      'Har kim faqat o‘z vazifasiga tegishli ma’lumotni ko‘rsin va har bir yozuv kim tomonidan kiritilgani qayd etilsin',
      'Kompyuter tezroq ishlashi uchun',
      'Elektr energiyasini tejash uchun',
      'Printerga qog‘oz kam ketishi uchun',
    ],
    correctIndex: 0,
    explanation:
      'Login va parol ikki vazifani bajaradi: kirish huquqini chegaralaydi (maxfiylik) va har bir amalni muallifiga bog‘laydi — tizim jurnalida kim, qachon, nimani o‘zgartirgani ko‘rinadi.',
  },
];

/* ========================================================================== */
/*  AMALIY TEST - Windows'da ishlash, fayl saqlash, elektron karta, maxfiylik  */
/* ========================================================================== */

const PRACTICE: QuizQuestion[] = [
  {
    id: 201,
    question:
      'Bemor poliklinikaga birinchi marta keldi. Ish qaysi tartibda boshlanadi?',
    options: [
      'Registratura ro‘yxatga oladi va elektron karta ochadi → shifokor ko‘rikdan o‘tkazadi → tayinlov beriladi',
      'Avval laboratoriya tahlil oladi → keyin ro‘yxatga olinadi',
      'Avval epikriz yoziladi → keyin bemor ko‘rikka kiradi',
      'Avval dori beriladi → keyin karta ochiladi',
    ],
    correctIndex: 0,
    explanation:
      'Bemor oqimi har doim ro‘yxatga olishdan boshlanadi: elektron karta ochilmasa, keyingi bosqichlarda (ko‘rik, tahlil, tayinlov) yozuvlarni bog‘laydigan joy bo‘lmaydi.',
  },
  {
    id: 202,
    question:
      'Hamshira elektron kartaga bemor ko‘rsatkichlarini kiritmoqda. Qaysi qator to‘ldirilmasa, bu bemor hayoti uchun bevosita xavf tug‘diradi?',
    options: [
      'Dorilarga allergiya haqidagi qator',
      'Bemorning sevimli mashg‘uloti',
      'Palataning devor rangi',
      'Qabulga kelgan vaqti daqiqasigacha',
    ],
    correctIndex: 0,
    explanation:
      'Allergiya qatori bo‘sh qolsa, tizim dori tayinlashda ogohlantira olmaydi. Bu — elektron kartaning eng muhim xavfsizlik maydonlaridan biri.',
  },
  {
    id: 203,
    question: 'Tanlangan papka yoki fayl nomini o‘zgartirish uchun qaysi tugma bosiladi?',
    options: ['F2', 'F5', 'Esc', 'Caps Lock'],
    correctIndex: 0,
    explanation:
      'F2 — nomni o‘zgartirish. Nom yozilgach Enter bosiladi. Xuddi shu amalni o‘ng tugma → «Nomini o‘zgartirish» orqali ham bajarish mumkin.',
  },
  {
    id: 204,
    question:
      'Hujjatni saqlayotganda birinchi navbatda nimalarga e’tibor beriladi?',
    options: [
      'Qaysi papkaga saqlanayotganiga va fayl nomi tushunarli ekaniga',
      'Monitor yorqinligiga',
      'Klaviatura rangiga',
      'Sichqoncha simining uzunligiga',
    ],
    correctIndex: 0,
    explanation:
      'Saqlash oynasida ikki narsa hal qiluvchi: joy (papka) va nom. «Hujjat1» deb ish stoliga saqlangan fayl bir haftadan keyin topilmaydi.',
  },
  {
    id: 205,
    question: 'Fayl nomida qaysi belgilardan foydalanish mumkin emas?',
    options: [
      '\\  /  :  *  ?  "  <  >  |',
      'Harflar va raqamlar',
      'Pastki chiziq _ va tire -',
      'Bo‘sh joy (probel)',
    ],
    correctIndex: 0,
    explanation:
      'Windows bu belgilarni fayl nomida qabul qilmaydi, chunki ular tizimda boshqa vazifani bajaradi. Harf, raqam, tire va pastki chiziqdan bemalol foydalanish mumkin.',
  },
  {
    id: 206,
    question:
      'Hamshira ish o‘rnidan bir necha daqiqaga chiqmoqchi. Elektron karta ochiq turibdi. To‘g‘ri harakat qaysi?',
    options: [
      'Ekranni bloklash (Win+L) yoki tizimdan chiqish',
      'Monitorni o‘chirib qo‘yish, dastur ochiq qolaveradi',
      'Hech narsa qilmaslik — xona baribir yopiq',
      'Parolni qog‘ozga yozib, monitor chetiga yopishtirib qo‘yish',
    ],
    correctIndex: 0,
    explanation:
      'Ochiq qolgan seansda begona odam bemor ma’lumotini ko‘rishi yoki sizning nomingizdan yozuv kiritishi mumkin. Monitorni o‘chirish seansni yopmaydi — ekran bloklanadi yoki tizimdan chiqiladi.',
  },
  {
    id: 207,
    question:
      'Qo‘shni bo‘lim hamshirasi «qiziqib» boshqa bo‘limdagi tanishining kasallik tarixini ochib ko‘rmoqchi. Bu qanday baholanadi?',
    options: [
      'Tibbiy sirni buzish — o‘z vazifasiga taalluqli bo‘lmagan ma’lumotga kirish taqiqlanadi',
      'Oddiy hol, chunki hamshira tibbiyot xodimi',
      'Ruxsat etiladi, agar hech kimga aytmasa',
      'Ruxsat etiladi, chunki tizim baribir yozib qo‘yadi',
    ],
    correctIndex: 0,
    explanation:
      'Kirish huquqi vazifaga qarab beriladi. Kasbiy zaruratsiz ochilgan karta — tibbiy sirning buzilishi; tizim jurnali esa buni aniq qayd etadi va xodim javobgar bo‘ladi.',
  },
  {
    id: 208,
    question:
      'Hamshira tayinlovni bajardi, lekin uni tizimda «bajarildi» deb belgilamadi. Oqibati qanday bo‘ladi?',
    options: [
      'Keyingi smena muolaja bajarilmagan deb hisoblab, dorini takroran berib yuborishi mumkin',
      'Hech qanday oqibat bo‘lmaydi',
      'Tizim buni o‘zi sezib, avtomatik belgilab qo‘yadi',
      'Bemor kartasi o‘chib ketadi',
    ],
    correctIndex: 0,
    explanation:
      'Elektron kartada belgilanmagan amal — bajarilmagan amal. Bu takroriy doza yoki tashlab ketilgan muolaja xavfini tug‘diradi, shuning uchun belgilash muolaja bilan bir vaqtda bajariladi.',
  },
  {
    id: 209,
    question:
      'Hamshira ish o‘rnida «AIO_Familiya» papkasini ochib, ichida «Bemorlar» va «Hisobotlar» papkalarini yaratdi. Bu nima uchun kerak?',
    options: [
      'Fayllar tartibda tursin va keraklisi tez topilsin',
      'Kompyuter tezroq ishlashi uchun',
      'Diskda joy ko‘payishi uchun',
      'Internet tezligi oshishi uchun',
    ],
    correctIndex: 0,
    explanation:
      'Papka ichida papka — bu tartib. Hamma fayl ish stoliga to‘kilib yotsa, kerakli hujjatni topish uzoq vaqt oladi va fayl adashib o‘chib ketishi mumkin.',
  },
  {
    id: 210,
    question:
      'Ish kuni oxirida bemorlar bazasi bilan ishlashni yakunlashning to‘g‘ri tartibi qaysi?',
    options: [
      'Yozuvlarni saqlash → dasturdan chiqish → tizimdan chiqish → kompyuterni to‘g‘ri o‘chirish',
      'Elektr vilkasini rozetkadan sug‘urib olish',
      'Faqat monitorni o‘chirish, qolgani ochiq qolsin',
      'Quvvat tugmasini uzoq bosib ushlab turish',
    ],
    correctIndex: 0,
    explanation:
      'Baza bilan ishlaganda saqlanmagan yozuv yo‘qoladi, to‘satdan uzilish esa ma’lumotlar bazasini shikastlashi mumkin. Tartib: saqlash → dasturdan chiqish → seansni yopish → tizimni o‘chirish.',
  },
];

export const QUIZ_BANKS: QuizBank[] = [
  {
    key: 'theory',
    label: 'Nazariy test',
    short: 'Nazariya',
    description:
      'Avtomatlashtirilgan ishchi o‘rin, elektron tibbiy karta, axborot o‘lchov birliklari (bit, bayt, KB, MB, GB) va tibbiy maxfiylik bo‘yicha savollar.',
    questions: THEORY,
  },
  {
    key: 'practice',
    label: 'Amaliy test',
    short: 'Amaliyot',
    description:
      'Kompyuterda ishlash: papka va fayl bilan amallar, hujjatni to‘g‘ri saqlash, elektron kartani to‘ldirish va ish o‘rni xavfsizligi.',
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
 * Bu darsda variantlar harfsiz saqlanadi (tartib aralashgani uchun harf
 * ma'nosini yo'qotadi), lekin funksiya 1- va 2-darslardagi "A) ..." ko'rinishi
 * bilan ham mos ishlaydi: harf bo'lsa olib tashlanadi.
 */
export function optionText(option: string): string {
  return option.replace(/^[A-Z]\)\s*/, '');
}
