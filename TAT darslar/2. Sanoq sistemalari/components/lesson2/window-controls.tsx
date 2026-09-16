'use client';

import {useState} from 'react';
import {AppWindow, Minus, RotateCcw, Square, X} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

type WinState = 'normal' | 'minimized' | 'maximized' | 'closed';

const NOTES: Record<
  Exclude<WinState, 'normal'> | 'normal',
  {title: string; text: string; tone: 'blue' | 'emerald' | 'amber' | 'rose'}
> = {
  normal: {
    title: 'Oyna odatdagi holatda',
    text:
      'Dastur oynasi ekranning bir qismini egallab turibdi. Yuqori o‘ng burchakdagi uchta tugmani bosib, ularning farqini ko‘ring.',
    tone: 'blue',
  },
  minimized: {
    title: 'Yig‘ish (Minimize) — “—” tugmasi',
    text:
      'Oyna yopilmadi! U masalalar paneliga tushib turibdi va ishlashda davom etmoqda. Kiritilgan ma’lumotlar joyida qoladi. Masalalar panelidan bosib qaytarasiz.',
    tone: 'blue',
  },
  maximized: {
    title: 'Kattalashtirish (Maximize) — “▢” tugmasi',
    text:
      'Oyna butun ekranni egalladi. Bemor kartasidagi uzun jadval va tahlil natijalarini ko‘rish uchun eng qulay holat. Yana bossangiz, oldingi o‘lchamiga qaytadi.',
    tone: 'emerald',
  },
  closed: {
    title: 'Yopish (Close) — “✕” tugmasi',
    text:
      'Dastur butunlay yopildi. Agar kiritgan ma’lumotingizni saqlamagan bo‘lsangiz, u yo‘qoladi. Shuning uchun yopishdan oldin doim saqlash kerak.',
    tone: 'rose',
  },
};

export function WindowControls() {
  const [state, setState] = useState<WinState>('normal');
  const [tried, setTried] = useState<Set<WinState>>(new Set());

  function act(next: WinState) {
    setState(next);
    setTried((prev) => (prev.has(next) ? prev : new Set(prev).add(next)));
  }

  const note = NOTES[state];

  return (
    <PracticeCard
      n={2}
      Icon={AppWindow}
      title="Oyna tugmalari: yig‘ish, kattalashtirish, yopish"
      lead="Har bir dastur oyna ichida ochiladi. Uchta kichik tugmani chalkashtirish — talabalar eng ko‘p yo‘l qo‘yadigan xato. Bosib, farqini ko‘ring."
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-fg-subtle">Sinab ko‘rilgan:</span>
        {(['minimized', 'maximized', 'closed'] as const).map((k) => (
          <span
            key={k}
            className={`rounded-md border px-2 py-1 text-xs font-bold ${
              tried.has(k)
                ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                : 'border-line bg-subtle text-fg-subtle'
            }`}
          >
            {k === 'minimized' ? 'Yig‘ish' : k === 'maximized' ? 'Kattalashtirish' : 'Yopish'}
          </span>
        ))}
      </div>

      {/* simulated screen */}
      <div className="on-dark mt-4 rounded-2xl border-2 border-slate-700 bg-slate-900 p-2 shadow-md">
        <div className="relative flex aspect-[16/10] w-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 p-2 sm:p-3">
          {state === 'closed' ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <X className="h-8 w-8 text-rose-400" />
              <p className="text-sm font-bold text-slate-200">Oyna yopildi</p>
              <p className="max-w-xs text-xs leading-relaxed text-slate-400">
                Saqlanmagan ma’lumot yo‘qoldi. Dasturni qaytadan ochish kerak.
              </p>
            </div>
          ) : state === 'minimized' ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
              <Minus className="h-8 w-8 text-blue-300" />
              <p className="text-sm font-bold text-slate-200">
                Oyna masalalar paneliga yig‘ildi
              </p>
              <p className="max-w-xs text-xs leading-relaxed text-slate-400">
                Dastur yopilmadi — pastdagi paneldan bosib qaytarish mumkin.
              </p>
            </div>
          ) : (
            <div
              className={`flex flex-col overflow-hidden rounded-lg border border-slate-600 bg-slate-800 shadow-lg transition-all duration-300 ${
                state === 'maximized'
                  ? 'h-full w-full'
                  : 'mx-auto h-[78%] w-[76%] sm:w-[68%]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-600 bg-slate-700 px-2.5 py-1.5">
                <span className="truncate text-[11px] font-bold text-slate-100">
                  Bemor kartasi — Karimov Anvar
                </span>
                <span className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Yig‘ish"
                    onClick={() => act('minimized')}
                    className="grid h-5 w-6 cursor-pointer place-items-center rounded text-slate-200 transition-colors hover:bg-slate-600"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    aria-label="Kattalashtirish"
                    onClick={() => act(state === 'maximized' ? 'normal' : 'maximized')}
                    className="grid h-5 w-6 cursor-pointer place-items-center rounded text-slate-200 transition-colors hover:bg-slate-600"
                  >
                    <Square className="h-2.5 w-2.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Yopish"
                    onClick={() => act('closed')}
                    className="grid h-5 w-6 cursor-pointer place-items-center rounded text-slate-200 transition-colors hover:bg-rose-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </div>

              <div className="flex-1 space-y-1.5 p-3">
                <div className="h-2 w-2/5 rounded bg-slate-600" />
                <div className="h-2 w-4/5 rounded bg-slate-700" />
                <div className="h-2 w-3/5 rounded bg-slate-700" />
                <div className="h-2 w-3/4 rounded bg-slate-700" />
              </div>
            </div>
          )}

          {/* taskbar shows the window even when minimized */}
          <div className="mt-2 flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-slate-700 bg-slate-950/80 px-1.5">
            <button
              type="button"
              onClick={() => act('normal')}
              className={`flex cursor-pointer items-center gap-1.5 rounded border px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                state === 'closed'
                  ? 'border-slate-700 text-slate-500'
                  : 'border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  state === 'closed' ? 'bg-slate-600' : 'bg-emerald-400'
                }`}
              />
              Bemor kartasi
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => act('normal')}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-blue-edge bg-blue-tint px-4 py-2 text-sm font-bold text-blue-ink transition-colors hover:bg-blue-tint-strong"
        >
          <RotateCcw className="h-4 w-4" />
          Oynani qaytarish
        </button>
      </div>

      <Explain title={note.title} tone={note.tone}>
        <p>{note.text}</p>
      </Explain>
    </PracticeCard>
  );
}
