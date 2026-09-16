'use client';

import {useState} from 'react';
import {
  FileText,
  FolderClosed,
  HeartPulse,
  LayoutGrid,
  Monitor,
  Trash2,
  Volume2,
  Wifi,
} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

type PartKey = 'icons' | 'start' | 'taskbar' | 'tray' | 'wallpaper';

const PARTS: Record<
  PartKey,
  {name: string; text: string; tip: string}
> = {
  icons: {
    name: 'Yorliqlar (ikonkalar)',
    text:
      "Ish stolidagi kichik rasmchalar — dastur va papkalarga tez kirish yo‘li. Yorliqni ochish uchun ustiga sichqonchaning chap tugmasi bilan tez ikki marta bosiladi.",
    tip: "Yorliqni o‘chirsangiz dastur o‘chmaydi — faqat unga olib boradigan yo‘l o‘chadi.",
  },
  start: {
    name: '“Boshlash” tugmasi (Start)',
    text:
      "Ekranning chap pastki burchagidagi asosiy tugma. Undan barcha o‘rnatilgan dasturlar ro‘yxati ochiladi va aynan shu menyu orqali kompyuter xavfsiz o‘chiriladi.",
    tip: "Ish kuni oxirida: Boshlash → Tizimni o‘chirish. Quvvat tugmasini bosib ushlab turish mumkin emas.",
  },
  taskbar: {
    name: 'Masalalar paneli (Taskbar)',
    text:
      "Ekranning pastki qatori. Hozir ochiq turgan barcha dasturlar shu yerda ko‘rinadi — ular orasida bosish orqali tez almashish mumkin.",
    tip: "Bemor kartasi va laboratoriya dasturi bir vaqtda ochiq bo‘lsa, shu paneldan bir bosishda o‘tasiz.",
  },
  tray: {
    name: 'Bildirishnomalar sohasi va soat',
    text:
      "O‘ng pastki burchak: tarmoq (internet) holati, ovoz balandligi, sana va vaqt. Fleshkani xavfsiz uzish belgisi ham aynan shu yerda joylashgan.",
    tip: "Hujjatga vaqt yozayotganda shu yerdagi tizim soatiga qarang — qayd vaqti aniq bo‘lishi shart.",
  },
  wallpaper: {
    name: 'Ish stoli foni (Desktop)',
    text:
      "Butun ekranni egallagan asosiy sath. Bo‘sh joyida o‘ng tugmani bossangiz, yangi papka yaratish va ko‘rinishni sozlash buyruqlari chiqadi.",
    tip: "Ish stolini bemor hujjatlari bilan to‘ldirmang — ular papkalarda saqlanishi kerak.",
  },
};

const HOT =
  'absolute cursor-pointer rounded-lg transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-ink';

export function DesktopAnatomy() {
  const [part, setPart] = useState<PartKey>('icons');
  const [seen, setSeen] = useState<Set<PartKey>>(new Set(['icons']));

  function pick(k: PartKey) {
    setPart(k);
    setSeen((prev) => (prev.has(k) ? prev : new Set(prev).add(k)));
  }

  const active = PARTS[part];
  const ring = (k: PartKey) =>
    part === k ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-transparent' : '';

  return (
    <PracticeCard
      n={1}
      Icon={Monitor}
      title="Ish stoli (Desktop) anatomiyasi"
      lead="Kompyuter yoqilgach birinchi ko‘radigan ekraningiz — ish stoli. Quyidagi maketda 5 ta qismni bosib, ularning vazifasini o‘rganing."
    >
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(PARTS) as PartKey[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => pick(k)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              part === k
                ? 'border-blue-edge bg-blue-tint-strong text-blue-ink'
                : seen.has(k)
                  ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                  : 'border-line bg-subtle text-fg-muted hover:border-blue-edge'
            }`}
          >
            {PARTS[k].name}
          </button>
        ))}
        <span className="ml-auto text-xs font-bold text-fg-subtle">
          O‘rganildi: {seen.size} / 5
        </span>
      </div>

      {/* simulated desktop */}
      <div className="on-dark mt-4 overflow-hidden rounded-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-md">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950">
          {/* wallpaper hotspot sits underneath everything else */}
          <button
            type="button"
            aria-label={PARTS.wallpaper.name}
            onClick={() => pick('wallpaper')}
            className={`${HOT} inset-0 ${ring('wallpaper')}`}
          />

          {/* desktop icons */}
          <button
            type="button"
            aria-label={PARTS.icons.name}
            onClick={() => pick('icons')}
            className={`${HOT} left-3 top-3 flex w-[92px] flex-col gap-3 p-2 sm:w-[104px] ${ring('icons')}`}
          >
            {[
              {Icon: HeartPulse, label: 'Bemorlar bazasi'},
              {Icon: FolderClosed, label: 'Hujjatlar'},
              {Icon: FileText, label: 'Kundalik.docx'},
              {Icon: Trash2, label: 'Savatcha'},
            ].map(({Icon, label}) => (
              <span key={label} className="flex flex-col items-center gap-1">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600/90 text-white sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="w-full truncate text-center text-[9px] font-semibold leading-tight text-slate-200 sm:text-[10px]">
                  {label}
                </span>
              </span>
            ))}
          </button>

          {/* taskbar */}
          <div className="absolute inset-x-0 bottom-0 flex h-10 items-center gap-1 border-t border-slate-700 bg-slate-950/85 px-1.5 backdrop-blur sm:h-12">
            <button
              type="button"
              aria-label={PARTS.start.name}
              onClick={() => pick('start')}
              className={`${HOT} static grid h-8 w-9 place-items-center bg-blue-600 text-white sm:h-9 sm:w-11 ${ring('start')}`}
            >
              <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <button
              type="button"
              aria-label={PARTS.taskbar.name}
              onClick={() => pick('taskbar')}
              className={`${HOT} static flex h-8 flex-1 items-center gap-1.5 px-1.5 sm:h-9 ${ring('taskbar')}`}
            >
              {['Bemorlar bazasi', 'Laboratoriya'].map((t) => (
                <span
                  key={t}
                  className="flex max-w-[46%] items-center gap-1.5 truncate rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-200 sm:text-[11px]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {t}
                </span>
              ))}
            </button>

            <button
              type="button"
              aria-label={PARTS.tray.name}
              onClick={() => pick('tray')}
              className={`${HOT} static flex h-8 items-center gap-2 px-2 text-slate-200 sm:h-9 ${ring('tray')}`}
            >
              <Wifi className="h-3.5 w-3.5" />
              <Volume2 className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold leading-none sm:text-[11px]">
                08:30
              </span>
            </button>
          </div>
        </div>
      </div>

      <Explain title={active.name}>
        <p>{active.text}</p>
        <p className="mt-2 text-fg-muted">
          <strong className="font-bold">Hamshira uchun:</strong> {active.tip}
        </p>
      </Explain>
    </PracticeCard>
  );
}
