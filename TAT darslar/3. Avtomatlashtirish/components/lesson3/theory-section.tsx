'use client';

import {Calendar, Cpu, FileText, HardDrive, Lock, Stethoscope} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {formatUzbekDate} from '@/lib/site';
import {useClientValue} from '@/lib/use-client-value';

/* ------------------------------------------------------------ AIO ta'minoti */
const SUPPLY = [
  {
    title: 'Texnik',
    text: 'Kompyuter, printer, skaner — ushlab ko‘riladigan qurilmalar.',
    tone: 'blue',
  },
  {
    title: 'Dasturiy',
    text: 'Windows va tibbiy dastur — kompyuterdagi dasturlar.',
    tone: 'teal',
  },
  {
    title: 'Axborot',
    text: 'Bemorlar bazasi va elektron kartalar — saqlanadigan ma’lumot.',
    tone: 'purple',
  },
  {
    title: 'Tashkiliy',
    text: 'Ish tartibi va xodimning parol bilan kirish huquqi.',
    tone: 'amber',
  },
] as const;

const TONES = {
  blue: 'border-blue-edge bg-blue-tint text-blue-ink',
  purple: 'border-purple-edge bg-purple-tint text-purple-ink',
  amber: 'border-amber-edge bg-amber-tint text-amber-ink',
  teal: 'border-teal-edge bg-teal-tint text-teal-ink',
} as const;

/* ------------------------------------------------------- tibbiyotdagi AIOlar */
const WORKSTATIONS = [
  {t: 'Registratura', d: 'Bemorni ro‘yxatga oladi va elektron karta ochadi.'},
  {t: 'Shifokor', d: 'Ko‘rik natijasi va tashxisni kartaga yozadi.'},
  {t: 'Hamshira', d: 'Ko‘rsatkichlarni kiritadi, tayinlovni belgilaydi.'},
  {t: 'Laboratoriya', d: 'Tahlil natijasini kiritadi, u kartaga tushadi.'},
];

/* ------------------------------------------------------- qog'oz va elektron */
const COMPARE: [string, string, string][] = [
  ['Kerakli yozuvni topish', 'javondan qidiriladi', 'qidiruvda darhol topiladi'],
  ['O‘qilishi', 'qo‘lyozma tushunarsiz bo‘lishi mumkin', 'matn aniq o‘qiladi'],
  ['Yo‘qolish xavfi', 'yo‘qolsa, tiklab bo‘lmaydi', 'nusxasidan tiklanadi'],
];

/* ------------------------------------------------------- o'lchov birliklari */
const UNITS_TABLE = [
  ['1 bit', '0 yoki 1', 'Eng kichik birlik: mantiqiy holat (“bor / yo‘q”, “erkak / ayol”)'],
  ['1 bayt', '8 bit', 'Bitta harf yoki belgi (masalan “A”, “1”)'],
  ['1 KB (Kilobayt)', '1024 bayt', 'Qisqa epikriz yoki bitta tahlil matni'],
  ['1 MB (Megabayt)', '1024 KB', 'Fonendoskop ovoz yozuvi yoki bitta tibbiy surat'],
  ['1 GB (Gigabayt)', '1024 MB', 'Bo‘limning bir kunlik barcha tahlil va suratlari'],
  ['1 TB (Terabayt)', '1024 GB', 'Butun shifoxonaning ko‘p yillik raqamli server arxivi'],
];

const SIZES = [
  {what: '1 ta belgi / qon guruhi', size: '1 bayt', bar: 2},
  {what: 'Qon tahlili javob blankasi (.pdf)', size: '≈ 45 KB', bar: 8},
  {what: 'Bemorning EKG kardiogrammasi', size: '≈ 250 KB', bar: 18},
  {what: 'Raqamli rentgen surati', size: '≈ 8–15 MB', bar: 45},
  {what: 'KT / MRT tekshiruv seriyasi (DICOM)', size: '≈ 350 MB', bar: 75},
  {what: 'Bo‘limning yillik elektron bazasi', size: '≈ 120 GB', bar: 100},
];

function Block({
  n,
  Icon,
  title,
  children,
}: {
  n: string;
  Icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-ink">
            {n}
          </p>
          <h3 className="mt-0.5 text-lg font-bold leading-snug text-fg sm:text-xl">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </section>
  );
}

export function TheorySection() {
  const todayDate = useClientValue(() => formatUzbekDate(), '');

  return (
    <div className="space-y-8">
      {/* hero */}
      <div className="on-dark relative overflow-hidden rounded-3xl border-2 border-teal-700/50 bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 p-6 text-white shadow-md sm:p-8">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-teal-700/60 pb-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-teal-400/40 bg-teal-500/30 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-teal-100 sm:text-sm">
              3-DARS NAZARIYASI
            </span>
            <span className="text-xs font-medium text-teal-200/80 sm:text-sm">
              Hamshiralik ishi • Shahrisabz Tibbiyot Texnikumi
            </span>
          </div>

          <div className="on-dark flex w-fit items-center gap-2.5 rounded-2xl border border-teal-500/40 bg-teal-950/80 px-4 py-2">
            <Calendar className="h-5 w-5 shrink-0 animate-pulse text-teal-300" />
            <div>
              <span className="block text-[10px] font-bold uppercase leading-none tracking-widest text-teal-300/80">
                Bugungi sana:
              </span>
              <span className="text-xs font-bold tracking-wide text-white sm:text-sm">
                {todayDate || 'Bugun'}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="mb-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
            Mavzu: Tibbiyotda ishchi o‘rinlarini avtomatlashtirishda va tibbiy
            masalalarni yechishda axborot texnologiyalari.
          </h2>
          <p className="text-sm font-medium leading-relaxed text-teal-100 sm:text-base">
            Shifoxonada qog‘oz daftar o‘rniga kompyuterda ishlash, elektron tibbiy karta, axborot o‘lchov birliklari (bit, bayt, KB, MB, GB, TB) hamda tibbiy ma’lumotlar xavfsizligi.
          </p>
        </div>
      </div>

      {/* eng muhimi - bir qarashda */}
      <section className="rounded-2xl border-2 border-teal-edge bg-teal-tint/50 p-6 sm:p-8">
        <h3 className="mb-4 text-base font-black uppercase tracking-wider text-teal-ink sm:text-lg">
          Darsning eng muhimi — 4 ta gap
        </h3>
        <ol className="space-y-2.5">
          {[
            'AIO — bu kompyuter qo‘yilgan ish o‘rni. Hamshira ish qog‘ozini emas, kompyuterni to‘ldiradi.',
            'Bemor haqidagi yozuv elektron kartada saqlanadi: yo‘qolmaydi va soniyalarda topiladi.',
            'Axborot o‘lchov birliklari (bit, bayt, KB, MB, GB, TB) elektron karta, rentgen va arxivlar hajmini hisoblashda ishlatiladi.',
            'Har bir xodim o‘z paroli bilan kiradi va faqat o‘ziga kerakli ma’lumotni ko‘radi.',
          ].map((t, i) => (
            <li key={t} className="flex gap-3 text-sm leading-relaxed text-fg sm:text-base">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-teal-600 text-xs font-black text-white">
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ol>
      </section>

      {/* 1 */}
      <Block n="1-mavzu" Icon={Cpu} title="Avtomatlashtirilgan ishchi o‘rin (AIO) nima?">
        <div className="space-y-3 text-sm leading-relaxed text-fg-muted sm:text-base">
          <p>
            <strong className="text-fg">AIO</strong> — xodimning ishiga
            moslashtirilgan, kompyuter qo‘yilgan ish o‘rni. Hamshira uchun bu:
            kompyuter, tibbiy dastur va bemorlar bazasi bir joyda.
          </p>
          <p>
            Maqsad — hamshirani almashtirish emas. Maqsad — qo‘lda ko‘chirib
            yozish va javondan qidirishga ketadigan vaqtni tejab,{' '}
            <strong className="text-fg">bemorga ko‘proq vaqt qoldirish</strong>.
          </p>
        </div>

        <h4 className="mb-3 mt-6 text-sm font-black uppercase tracking-wider text-fg-subtle">
          AIO nimalardan tashkil topadi
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {SUPPLY.map((s) => (
            <div key={s.title} className={`rounded-xl border-2 p-4 ${TONES[s.tone]}`}>
              <p className="text-base font-bold">{s.title} ta’minot</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* 2 */}
      <Block n="2-mavzu" Icon={Stethoscope} title="Shifoxonada AIO qayerda bor?">
        <p className="mb-4 text-sm leading-relaxed text-fg-muted sm:text-base">
          Har bir bo‘limda o‘z kompyuteri bor va ularning hammasi bitta bazaga
          ulangan. Shuning uchun ma’lumot{' '}
          <strong className="text-fg">bir marta kiritiladi</strong>, keyin
          hamma bo‘limda ko‘rinadi.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {WORKSTATIONS.map((w, i) => (
            <div
              key={w.t}
              className="flex items-start gap-3 rounded-xl border border-line bg-subtle p-4"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-teal-600 text-xs font-black text-white">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-fg">{w.t}</span>
                <span className="mt-0.5 block text-sm leading-relaxed text-fg-muted">
                  {w.d}
                </span>
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* 3 */}
      <Block n="3-mavzu" Icon={FileText} title="Elektron tibbiy karta">
        <p className="mb-4 text-sm leading-relaxed text-fg-muted sm:text-base">
          <strong className="text-fg">Elektron tibbiy karta</strong> — bemorning
          qog‘oz kartasi o‘rniga kompyuterdagi yozuvi. Ichida: F.I.Sh., tashxis,
          tahlillar, tayinlovlar va ko‘rsatkichlar.
        </p>

        {/* Telefonda: har bir qator alohida kartochka (yonga surish shart emas) */}
        <div className="space-y-3 sm:hidden">
          {COMPARE.map(([task, paper, digital]) => (
            <div key={task} className="rounded-xl border border-line bg-subtle p-4">
              <p className="text-sm font-bold text-fg">{task}</p>
              <div className="mt-2.5 space-y-2">
                <div className="rounded-lg border border-rose-edge bg-rose-tint p-2.5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-rose-ink">
                    Qog‘oz karta
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{paper}</p>
                </div>
                <div className="rounded-lg border border-emerald-edge bg-emerald-tint p-2.5">
                  <p className="text-[11px] font-black uppercase tracking-wider text-emerald-ink">
                    Elektron karta
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{digital}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kengroq ekranda: oddiy jadval */}
        <div className="hidden rounded-xl border border-line sm:block">
          <table className="w-full border-collapse text-left">
            <thead className="bg-subtle">
              <tr>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  Vazifa
                </th>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-rose-ink">
                  Qog‘oz karta
                </th>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-emerald-ink">
                  Elektron karta
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([task, paper, digital]) => (
                <tr key={task} className="border-t border-line">
                  <td className="px-4 py-2.5 text-sm font-bold text-fg">{task}</td>
                  <td className="px-4 py-2.5 text-sm text-fg-muted">{paper}</td>
                  <td className="px-4 py-2.5 text-sm text-fg-muted">{digital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border-2 border-amber-edge bg-amber-tint p-4 text-sm leading-relaxed text-fg-muted sm:text-base">
          <strong className="text-fg">Eslatma:</strong> kartaga kiritilmagan
          ko‘rsatkich — tizim uchun «bo‘lmagan» hisoblanadi. Shuning uchun yozuv
          o‘z vaqtida va to‘liq kiritiladi.
        </div>
      </Block>

      {/* 4 */}
      <Block n="4-mavzu" Icon={HardDrive} title="Axborot o‘lchov birliklari va tibbiyotda ma’lumot hajmi">
        <p className="mb-5 text-sm leading-relaxed text-fg-muted sm:text-base">
          Suyuqlik litrda, dori dozasi milligrammda o‘lchangani kabi, kompyuter xotirasidagi ma’lumotlar ham o‘z o‘lchov birliklariga ega. Eng kichik birlik — <strong className="text-fg">bit</strong> (0 yoki 1). 8 ta bit bitta <strong className="text-fg">baytni</strong> hosil qiladi — bu bitta belgi yoki harfni saqlashga yetadi.
        </p>

        {/* Telefonda: har bir birlik alohida kartochka */}
        <div className="mb-6 space-y-2.5 sm:hidden">
          {UNITS_TABLE.map(([u, e, m]) => (
            <div key={u} className="rounded-xl border border-line bg-subtle p-4">
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="font-mono text-base font-black text-teal-ink">{u}</span>
                <span className="font-mono text-sm font-bold text-fg">= {e}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{m}</p>
            </div>
          ))}
        </div>

        {/* Kengroq ekranda: oddiy jadval */}
        <div className="mb-6 hidden rounded-xl border border-line sm:block">
          <table className="w-full border-collapse text-left">
            <thead className="bg-subtle">
              <tr>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  Birlik
                </th>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  Nechaga teng
                </th>
                <th className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  Tibbiyotdagi amaliy misol
                </th>
              </tr>
            </thead>
            <tbody>
              {UNITS_TABLE.map(([u, e, m]) => (
                <tr key={u} className="border-t border-line">
                  <td className="px-4 py-2.5 font-mono text-sm font-black text-teal-ink">
                    {u}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-sm font-bold text-fg">
                    {e}
                  </td>
                  <td className="px-4 py-2.5 text-sm text-fg-muted">{m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-fg-subtle">
          Tibbiy fayllar va elektron arxiv hajmlari
        </h4>
        <div className="space-y-2.5">
          {SIZES.map((s) => (
            <div key={s.what} className="flex items-center gap-3">
              <span className="w-[50%] shrink-0 text-sm text-fg-muted sm:w-[40%]">
                {s.what}
              </span>
              <span className="h-6 flex-1 overflow-hidden rounded-md bg-subtle">
                <span
                  className="block h-full rounded-md bg-gradient-to-r from-teal-500 to-emerald-500"
                  style={{width: `${s.bar}%`}}
                />
              </span>
              <span className="w-[84px] shrink-0 text-right font-mono text-xs font-black text-teal-ink">
                {s.size}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* 5 */}
      <Block n="5-mavzu" Icon={Lock} title="Parol va tibbiy sir">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-emerald-edge bg-emerald-tint p-5">
            <p className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-ink">
              Shunday qilinadi
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
              {[
                'Faqat o‘z login va parolingiz bilan kiring',
                'Ish o‘rnidan chiqsangiz — Win+L bilan ekranni bloklang',
                'Faqat o‘zingizga kerakli bemor kartasini oching',
                'Ish oxirida yozuvni saqlab, dasturdan chiqing',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-2 border-rose-edge bg-rose-tint p-5">
            <p className="mb-3 text-sm font-black uppercase tracking-wider text-rose-ink">
              Shunday qilinmaydi
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
              {[
                'Parolni hamkasbga aytish yoki monitorga yozib qo‘yish',
                'Qiziqish uchun begona bemor kartasini ochish',
                'Bemor hujjatini telefonga suratga olish',
                'Seansni ochiq qoldirib ketish',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-fg-muted sm:text-base">
          Kompyuter har bir amalni yozib boradi: kim kirdi, qaysi kartani ochdi,
          nima yozdi. Shuning uchun «hech kim bilmaydi» degani ishlamaydi.
        </p>
      </Block>
    </div>
  );
}
