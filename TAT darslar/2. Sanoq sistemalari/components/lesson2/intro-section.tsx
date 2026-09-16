'use client';

import {
  AlertTriangle,
  FolderClosed,
  HardDrive,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const PILLARS = [
  {
    Icon: Search,
    n: '1-ustun',
    title: 'Kerakli hujjatni tez topish',
    text:
      "Minglab fayl orasidan bemor kartasini soniyalarda topish — faqat ular tartibli papkalarda saqlansagina mumkin. Tartibsiz ish stoli — yo'qolgan vaqt va yo'qolgan ma'lumot.",
  },
  {
    Icon: HardDrive,
    n: '2-ustun',
    title: 'Joyni to‘g‘ri baholash',
    text:
      "Bitta rentgen surati mingta matn sahifasidan og'ir. Fleshkaga nima sig'ishini, tahlilni yuborish qancha vaqt olishini bilish uchun o'lchov birliklarini tushunish kerak.",
  },
  {
    Icon: ShieldCheck,
    n: '3-ustun',
    title: 'Ma’lumotni yo‘qotmaslik',
    text:
      "Fleshkani noto'g'ri sug'urib olish, saqlamasdan yopish, Savatchani o'ylamay tozalash — bemor hujjati yo'qolishining eng keng tarqalgan uchta sababi.",
  },
  {
    Icon: AlertTriangle,
    n: '4-ustun',
    title: 'O‘zini va texnikani asrash',
    text:
      "Ho'l qo'l, oyoq ostidagi simlar, klaviatura yonidagi choy — bular hazil emas. Texnika xavfsizligi qoidalari hamshiraning o'z sog'lig'ini ham himoya qiladi.",
  },
];

export function IntroSection() {
  return (
    <div className="space-y-8">
      {/* hero */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-purple-ink">
          <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-purple-500" />
          Bo‘lajak hamshiralar uchun kirish so‘zi
        </div>

        <h2 className="mb-4 text-2xl font-black leading-tight tracking-tight text-fg sm:text-3xl">
          Kompyuterda ishlash — bu tugmalarni bosish emas, bemor ma’lumotini
          asrash san’ati
        </h2>

        <p className="mb-6 text-base leading-relaxed text-fg-muted sm:text-lg">
          Birinchi darsda siz kompyuterni yoqish, sichqoncha va klaviatura bilan
          ishlashni o‘rgandingiz. Endi navbat eng muhim savolga: kiritilgan
          ma’lumot <strong className="font-bold text-fg">qayerda saqlanadi</strong>,{' '}
          <strong className="font-bold text-fg">qancha joy egallaydi</strong> va
          uni <strong className="font-bold text-fg">qanday yo‘qotib qo‘ymaslik</strong>{' '}
          mumkin.
        </p>

        <div className="flex items-start gap-4 rounded-xl border-2 border-purple-edge bg-purple-tint p-5 text-base leading-relaxed text-fg shadow-xs sm:text-lg">
          <Sparkles className="mt-0.5 h-8 w-8 shrink-0 text-purple-ink" />
          <div>
            <strong className="mb-1 block text-base font-bold text-purple-ink sm:text-lg">
              Bir daqiqalik xato — bir oylik mehnat:
            </strong>
            Nusxalash tugamasdan sug‘urib olingan fleshka, saqlanmasdan yopilgan
            oyna yoki o‘ylamay tozalangan Savatcha — bemorning butun kasallik
            tarixini o‘chirib yuborishi mumkin. Bu darsdagi har bir mashq aynan
            shuning oldini olishga qaratilgan.
          </div>
        </div>

        {/* real-life comparison */}
        <div className="on-dark mt-6 rounded-2xl border-2 border-slate-700 bg-gradient-to-br from-slate-800 via-slate-900 to-purple-950 p-6 text-white shadow-md">
          <span className="inline-block rounded-md bg-purple-500/20 px-2.5 py-1 text-xs font-black uppercase tracking-wider text-purple-200">
            Hayotiy misol
          </span>
          <h3 className="mt-3 text-xl font-black leading-snug sm:text-2xl">
            Bitta fleshka — butun bo‘limning bir kunlik ishi
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
            16 GB fleshkaga taxminan 2000 ta rentgen surati yoki 350 000 ta
            hamshiralik kundaligi sig‘adi. Uni noto‘g‘ri uzsangiz — o‘sha
            ma’lumotlarning bir qismi ochilmay qoladi.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              {v: '8 bit', l: '1 bayt'},
              {v: '1024 B', l: '1 kilobayt'},
              {v: '1024 KB', l: '1 megabayt'},
              {v: '1024 MB', l: '1 gigabayt'},
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-slate-600 bg-slate-800/70 px-3 py-2.5"
              >
                <p className="font-mono text-base font-black text-purple-200">
                  {s.v}
                </p>
                <p className="text-[11px] font-bold text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* four pillars */}
      <div>
        <h3 className="mb-4 flex items-center gap-2.5 text-lg font-black text-fg sm:text-xl">
          <span className="h-6 w-1.5 rounded-full bg-purple-500" />
          Bu dars nima beradi: 4 ta amaliy ustun
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {PILLARS.map(({Icon, n, title, text}) => (
            <div
              key={n}
              className="rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-purple-edge"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-tint-strong text-purple-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-md border border-purple-edge bg-purple-tint px-2.5 py-1 text-xs font-black uppercase tracking-wider text-purple-ink">
                  {n}
                </span>
              </div>
              <h4 className="mb-2 text-base font-bold leading-snug text-fg sm:text-lg">
                {title}
              </h4>
              <p className="text-sm leading-relaxed text-fg-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* what you will do */}
      <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <h3 className="mb-4 flex items-center gap-2.5 text-lg font-black text-fg sm:text-xl">
          <FolderClosed className="h-5 w-5 text-purple-ink" />
          Amaliy qismda o‘z qo‘lingiz bilan bajarasiz
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {[
            'Ish stolining 5 ta qismini tanib olasiz',
            'Oyna tugmalarining farqini sinab ko‘rasiz',
            'Papka yaratib, fayl nusxalab, Savatchadan tiklaysiz',
            'Fayl turlari va hajmini solishtirasiz',
            'Fleshkani xavfsiz uzishni mashq qilasiz',
            'Harfning 0 va 1 dagi kodini ko‘rasiz',
            'Ish o‘rnidagi 8 ta xavfsizlik holatini baholaysiz',
          ].map((t, i) => (
            <li
              key={t}
              className="flex items-start gap-2.5 rounded-xl border border-line bg-subtle px-3.5 py-2.5"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-purple-tint-strong text-[11px] font-black text-purple-ink">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-fg-muted">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
