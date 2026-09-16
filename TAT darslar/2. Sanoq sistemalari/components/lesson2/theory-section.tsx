'use client';

import {
  Binary,
  Calendar,
  Eye,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Hand,
  Hash,
  Ear,
  ShieldAlert,
} from 'lucide-react';
import {formatUzbekDate} from '@/lib/site';
import {useClientValue} from '@/lib/use-client-value';
import {InfoTypeExercise} from './info-type-exercise';
import {SafetyRulesSection} from './safety-rules-section';

const BY_FORM = [
  {
    Icon: FileText,
    title: 'Matnli',
    ex: 'Hamshiralik kundaligi, epikriz, shifokor buyrug‘i',
    ext: '.docx .txt .pdf',
    tone: 'blue',
  },
  {
    Icon: Hash,
    title: 'Raqamli',
    ex: 'Qon bosimi 120/80, puls 74, harorat 36.6 °C',
    ext: '.xlsx .csv',
    tone: 'emerald',
  },
  {
    Icon: FileImage,
    title: 'Tasviriy',
    ex: 'Rentgen, UTT, KT, MRT suratlari hamda EKG grafigi',
    ext: '.jpg .png .dcm .pdf',
    tone: 'purple',
  },
  {
    Icon: FileAudio,
    title: 'Ovozli',
    ex: 'Fonendoskop yozuvi, yurak tonlari va nafas shovqini',
    ext: '.mp3 .wav',
    tone: 'amber',
  },
  {
    Icon: FileVideo,
    title: 'Video',
    ex: 'Amaliyot yozuvi, laparoskopiya va endoskopiya videosi',
    ext: '.mp4 .avi',
    tone: 'rose',
  },
];

const TONES = {
  blue: 'border-blue-edge bg-blue-tint text-blue-ink',
  emerald: 'border-emerald-edge bg-emerald-tint text-emerald-ink',
  purple: 'border-purple-edge bg-purple-tint text-purple-ink',
  amber: 'border-amber-edge bg-amber-tint text-amber-ink',
  rose: 'border-rose-edge bg-rose-tint text-rose-ink',
} as const;

const BY_SENSE = [
  {Icon: Eye, t: 'Ko‘rish', p: '80–90%', d: 'Monitor, tahlil blankasi, rentgen surati'},
  {Icon: Ear, t: 'Eshitish', p: '~10%', d: 'Fonendoskop, apparat signali, shifokor buyrug‘i'},
  {Icon: Hand, t: 'Sezish', p: '~2%', d: 'Puls paypaslash, teri harorati'},
];

const BIN = [
  {d: 0, b: '0000'},
  {d: 1, b: '0001'},
  {d: 2, b: '0010'},
  {d: 3, b: '0011'},
  {d: 4, b: '0100'},
  {d: 5, b: '0101'},
  {d: 6, b: '0110'},
  {d: 7, b: '0111'},
  {d: 8, b: '1000'},
];

function Block({
  n,
  Icon,
  title,
  children,
}: {
  n: string;
  Icon: typeof Binary;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-purple-ink">
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
      {/* TOP HERO BANNER: Katta mavzu sarlavhasi va Dinamik bugungi sana (1-darsdagidek) */}
      <div className="on-dark bg-gradient-to-r from-purple-950 via-purple-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border-2 border-purple-700/50 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-purple-700/60 mb-5">
          <div className="flex items-center gap-3">
            <span className="bg-purple-500/30 text-purple-200 text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-xl border border-purple-400/40 uppercase tracking-wider">
              2-DARS NAZARIYASI
            </span>
            <span className="text-purple-200/80 text-xs sm:text-sm font-medium">
              Hamshiralik ishi • Shahrisabz Tibbiyot Texnikumi
            </span>
          </div>

          {/* Dinamik bugungi sana ko'rsatkichi */}
          <div className="on-dark flex items-center gap-2.5 bg-purple-950/80 border border-purple-500/40 px-4 py-2 rounded-2xl w-fit">
            <Calendar className="w-5 h-5 text-purple-300 shrink-0 animate-pulse" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-purple-300/80 font-bold block leading-none">
                Bugungi sana:
              </span>
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {todayDate || 'Bugun'}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
            Mavzu: Axborot turlari va sanoq sistemalari. Texnika xavfsizligi.
          </h2>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed font-medium">
            Tibbiyotda axborot shakllari, sanoq sistemasi tushunchasi (2 lik va 10 lik) hamda tibbiy texnika xavfsizligi qoidalari bilan tanishing.
          </p>
        </div>
      </div>

      {/* 1. axborot turlari */}
      <Block n="1-mavzu" Icon={FileText} title="Axborot turlari">
        <p className="mb-5 text-sm leading-relaxed text-fg-muted sm:text-base">
          Axborot ikki xil belgiga ko‘ra turlarga ajratiladi: <strong>qanday
          shaklda ifodalangani</strong> va <strong>qaysi sezgi organi orqali
          qabul qilinishi</strong> bo‘yicha.
        </p>

        <h4 className="mb-3 text-sm font-black uppercase tracking-wider text-fg-subtle">
          Ifodalanish shakli bo‘yicha
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BY_FORM.map((f) => (
            <div
              key={f.title}
              className={`rounded-xl border-2 p-4 ${TONES[f.tone as keyof typeof TONES]}`}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <f.Icon className="h-5 w-5 shrink-0" />
                <span className="text-base font-bold">{f.title}</span>
              </div>
              <p className="text-sm leading-relaxed text-fg-muted">{f.ex}</p>
              <p className="mt-2 font-mono text-xs font-bold">{f.ext}</p>
            </div>
          ))}
        </div>

        <h4 className="mb-3 mt-6 text-sm font-black uppercase tracking-wider text-fg-subtle">
          Qabul qilish organi bo‘yicha
        </h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {BY_SENSE.map((s) => (
            <div key={s.t} className="rounded-xl border border-line bg-subtle p-4">
              <div className="mb-2 flex items-center justify-between">
                <s.Icon className="h-5 w-5 text-purple-ink" />
                <span className="rounded-md bg-purple-tint-strong px-2 py-0.5 font-mono text-xs font-black text-purple-ink">
                  {s.p}
                </span>
              </div>
              <p className="text-base font-bold text-fg">{s.t}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* 3-Bo'lim: Axborot turlarini aniqlash mashqi */}
      <InfoTypeExercise />

      {/* 2. sanoq sistemalari */}
      <Block n="2-mavzu" Icon={Binary} title="Sanoq sistemalari tushunchasi">
        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-fg-muted">
          <p>
            <strong className="text-fg">Sanoq sistemasi</strong> — sonlarni maxsus belgilar (raqamlar) yordamida yozish, nomlash va ular ustida amallar bajarish qoidalari majmuidir.
          </p>
          <p>
            Tarixan sanoq sistemalari ikki guruhga bo‘linadi: <strong className="text-fg">pozitsion</strong> (raqamning qiymati egallagan o‘rniga bog‘liq, masalan 10 lik) va <strong className="text-fg">nopozitsion</strong> (raqam qiymati o‘rniga bog‘liq emas, masalan Rim raqamlari: I, V, X).
          </p>
        </div>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-blue-edge bg-blue-tint p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-2xl font-black text-blue-ink">10 lik</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">Insonlar tili</span>
            </div>
            <p className="text-sm font-bold text-fg">O‘nlik sanoq sistemasi</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Ishlatiladigan raqamlar: <strong className="font-mono text-fg">0, 1, 2, 3, 4, 5, 6, 7, 8, 9</strong>. Biz kundalik hayotda, tibbiy hisob-kitoblarda, dori dozalari va bemor ko‘rsatkichlarini yozishda aynan 10 lik sistemadan foydalanamiz.
            </p>
          </div>

          <div className="rounded-xl border-2 border-emerald-edge bg-emerald-tint p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-2xl font-black text-emerald-ink">2 lik</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Kompyuter tili</span>
            </div>
            <p className="text-sm font-bold text-fg">Ikkilik sanoq sistemasi</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Ishlatiladigan raqamlar: <strong className="font-mono text-fg">0 va 1</strong>. Kompyuter mikrosxemalari va tibbiy raqamli texnikalar ichki elektr signallari asosida (elektr toki bor = 1, elektr toki yo‘q = 0) faqat ikkilik sistemada ishlaydi.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-purple-edge bg-purple-tint/60 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-sm">
            <Binary className="h-5 w-5" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-fg mb-0.5">O‘qituvchi eslatmasi</h5>
            <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
              10 lik va 2 lik sanoq sistemalari o‘rtasida sonlarni o‘tkazish qoidalari va amaliy misollar dars jarayonida auditoriya doskasida o‘qituvchi tomonidan ko‘rsatib beriladi.
            </p>
          </div>
        </div>
      </Block>

      {/* 3. xavfsizlik asoslari */}
      <Block
        n="3-mavzu"
        Icon={ShieldAlert}
        title="Texnika xavfsizligi va gigiena asoslari"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border-2 border-emerald-edge bg-emerald-tint p-5">
            <p className="mb-3 text-sm font-black uppercase tracking-wider text-emerald-ink">
              Shart bo‘lgan qoidalar
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
              {[
                'Qurilmalarga faqat quruq qo‘l bilan tegish',
                'Ekran ko‘zdan 50–70 sm, yuqori qirrasi ko‘z sathida',
                'Har 45 daqiqada 10–15 daqiqa tanaffus va ko‘z mashqi',
                'Simlar devor bo‘ylab, yurish yo‘lidan tashqarida',
                'Umumiy klaviatura smena oxirida dezinfeksiyalanadi',
                'Tutun yoki kuygan hidda — darhol tarmoqdan uzish',
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
              Qat’iyan man etiladi
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-fg-muted">
              {[
                'Ho‘l qo‘l bilan rozetka yoki simga tegish',
                'Klaviatura yonida choy, suv yoki ovqat saqlash',
                'Bitta uzatgichga ko‘p quvvatli qurilmalarni ulash',
                'Ishlab turgan qurilmaning qopqog‘ini ochish',
                'Yonayotgan texnikani suv bilan o‘chirishga urinish',
                'Fleshkani xavfsiz uzmasdan tortib olish',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="on-dark mt-4 rounded-xl border-2 border-slate-700 bg-slate-900 p-5 text-white">
          <p className="mb-2 text-sm font-black uppercase tracking-wider text-rose-300">
            Elektr toki urganda — 4 qadam
          </p>
          <ol className="grid gap-2 text-sm leading-relaxed text-slate-300 sm:grid-cols-2">
            {[
              'Jabrlanuvchiga tegmang — avval tokni uzing (rozetkani yoki avtomatni)',
              'Tokni uzolmasangiz, quruq yog‘och yoki plastmassa bilan simni uzoqlashtiring',
              'Shifokorni chaqiring, nafas va pulsni tekshiring',
              'Nafas yo‘q bo‘lsa — yurak-o‘pka reanimatsiyasini boshlang',
            ].map((t, i) => (
              <li key={t} className="flex gap-2.5">
                {/* rose-600, not rose-500: white on 500 is only 3.75:1 */}
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-rose-600 text-[11px] font-black text-white">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </Block>

      {/* 7-Bo'lim: Texnika xavfsizligi qoidalari & 8-Bo'lim: Interaktiv mashq */}
      <SafetyRulesSection />
    </div>
  );
}
