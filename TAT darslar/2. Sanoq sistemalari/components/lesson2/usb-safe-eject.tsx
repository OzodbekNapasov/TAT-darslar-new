'use client';

import {useEffect, useState} from 'react';
import {AlertTriangle, CheckCircle2, RotateCcw, ShieldCheck, Usb} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

/** 'copied' is not a stage: it is derived from `progress` reaching 100. */
type Stage = 'idle' | 'plugged' | 'copying' | 'ejecting' | 'safe' | 'broken';

const STEPS = [
  'Fleshkani USB uyasiga ulang',
  'Bemor hujjatini fleshkaga nusxalang',
  '“Xavfsiz uzish” belgisini bosing',
  'Ruxsat berilgach, fleshkani chiqaring',
];

/** Defined at module level so it is not remounted on every parent render. */
function Action({
  on,
  disabled,
  children,
  danger,
}: {
  on: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={on}
      disabled={disabled}
      className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
        disabled
          ? // no opacity: the label tells the student what comes next, and the
            // muted grey against the solid blue of the active step already
            // reads as disabled
            'cursor-not-allowed border-line bg-subtle text-fg-muted'
          : danger
            ? 'cursor-pointer border-rose-500 bg-rose-tint text-rose-ink hover:bg-rose-tint-strong'
            : 'cursor-pointer border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {children}
    </button>
  );
}

export function UsbSafeEject() {
  const [stage, setStage] = useState<Stage>('idle');
  const [progress, setProgress] = useState(0);

  // The copy advances as a self-driving timeout chain: each new progress value
  // schedules the next step. A plain interval is avoided because the updater
  // must stay pure - it cannot decide when the copy is finished.
  useEffect(() => {
    if (stage !== 'copying' || progress >= 100) return;
    const t = window.setTimeout(
      () => setProgress((p) => Math.min(100, p + 5)),
      90,
    );
    return () => window.clearTimeout(t);
  }, [stage, progress]);

  useEffect(() => {
    if (stage !== 'ejecting') return;
    const t = window.setTimeout(() => setStage('safe'), 700);
    return () => window.clearTimeout(t);
  }, [stage]);

  /** the copy is finished once the bar reaches the end */
  const copied = stage === 'copying' && progress >= 100;

  const stepDone = copied
    ? 2
    : stage === 'idle'
      ? 0
      : stage === 'plugged' || stage === 'copying'
        ? 1
        : stage === 'ejecting'
          ? 3
          : stage === 'safe'
            ? 4
            : 0;

  function reset() {
    setStage('idle');
    setProgress(0);
  }

  const note: {title: string; text: string; tone: 'blue' | 'emerald' | 'amber' | 'rose'} =
    copied
      ? {
          title: 'Nusxalash tugadi',
          text: 'Endi darhol tortmang. Avval o‘ng pastki burchakdagi “Xavfsiz uzish” belgisini bosish kerak.',
          tone: 'blue',
        }
      : stage === 'idle'
        ? {
            title: 'Fleshka ulanmagan',
            text: 'Fleshkani uyaga kuch ishlatmasdan, to‘g‘ri tomoni bilan kiriting. Zo‘rlab kiritish uyani ham, fleshkani ham sindiradi.',
            tone: 'blue',
          }
        : stage === 'plugged'
          ? {
              title: 'Fleshka ulandi',
              text: 'Tizim qurilmani tanidi. Endi kerakli hujjatni fleshkaga nusxalash mumkin.',
              tone: 'blue',
            }
          : stage === 'copying'
            ? {
                title: 'Nusxalash ketmoqda — hozir sug‘urib olmang!',
                text: 'Ayni shu paytda fayl yozilmoqda. Fleshkani tortib olsangiz, fayl yarim yozilib buziladi.',
                tone: 'amber',
              }
            : stage === 'ejecting'
              ? {
                  title: 'Tizim qurilmani to‘xtatmoqda',
                  text: 'Windows fleshka bilan ishlashni yakunlamoqda. Bir necha soniya kuting.',
                  tone: 'blue',
                }
              : stage === 'safe'
                ? {
                    title: 'Endi chiqarish mumkin — to‘g‘ri bajardingiz',
                    text: 'Aynan shu tartib bemor hujjatlarini shikastlanishdan saqlaydi: nusxala → xavfsiz uz → chiqar.',
                    tone: 'emerald',
                  }
                : {
                    title: 'Fayl buzildi!',
                    text: 'Fleshka nusxalash tugamasdan sug‘urib olindi. Bemor hujjati yarim yozilgan va endi ochilmaydi. Haqiqiy ishda bu — yo‘qolgan tahlil natijasi degani.',
                    tone: 'rose',
                  };

  return (
    <PracticeCard
      n={5}
      Icon={Usb}
      title="Fleshka bilan xavfsiz ishlash"
      lead="Fleshkani noto‘g‘ri uzish — bemor hujjatini yo‘qotishning eng keng tarqalgan sababi. To‘g‘ri tartibni bajarib ko‘ring, so‘ng xato yo‘lni ham sinab ko‘ring."
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${
              i < stepDone
                ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                : 'border-line bg-subtle text-fg-subtle'
            }`}
          >
            {i + 1}. {s}
          </span>
        ))}
        <span className="ml-auto">
          <StepPill done={stepDone} total={4} />
        </span>
      </div>

      {/* visual */}
      <div className="on-dark rounded-2xl border-2 border-slate-700 bg-slate-900 p-5">
        <div className="flex items-center justify-center gap-3">
          {/* port */}
          <div className="flex h-16 w-24 items-center justify-end rounded-lg border-2 border-slate-600 bg-slate-800">
            <div className="mr-1 h-8 w-4 rounded-sm bg-slate-950" />
          </div>

          {/* drive */}
          <div
            className={`flex h-12 items-center gap-2 rounded-lg border-2 px-3 transition-all duration-500 ${
              stage === 'idle'
                ? 'translate-x-6 border-slate-600 bg-slate-800'
                : stage === 'broken'
                  ? '-translate-x-2 border-rose-500 bg-rose-950'
                  : 'border-emerald-500 bg-emerald-950'
            }`}
          >
            <Usb
              className={`h-5 w-5 ${
                stage === 'idle'
                  ? 'text-slate-400'
                  : stage === 'broken'
                    ? 'text-rose-400'
                    : 'text-emerald-400'
              }`}
            />
            <span className="text-xs font-bold text-slate-200">Fleshka 16 GB</span>
            {stage !== 'idle' && stage !== 'broken' && (
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            )}
          </div>
        </div>

        {/* copy progress */}
        {stage === 'copying' && (
          <div className="mx-auto mt-5 max-w-sm">
            <div className="mb-1.5 flex justify-between text-[11px] font-bold text-slate-300">
              <span>Epikriz.docx → Fleshka</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-100"
                style={{width: `${progress}%`}}
              />
            </div>
          </div>
        )}

        {/* tray safe-eject icon */}
        {copied && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => setStage('ejecting')}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-100 transition-colors hover:border-emerald-500 hover:bg-slate-700"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Qurilmani xavfsiz uzish
            </button>
          </div>
        )}

        {stage === 'safe' && (
          <p className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            “Qurilmani chiqarish mumkin”
          </p>
        )}

        {stage === 'broken' && (
          <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm font-bold text-rose-400">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            Epikriz.docx buzildi — fayl ochilmaydi
          </p>
        )}
      </div>

      {/* actions */}
      <div className="mt-4 flex flex-wrap gap-2.5">
        <Action on={() => setStage('plugged')} disabled={stage !== 'idle'}>
          1. Fleshkani ulash
        </Action>
        <Action
          on={() => {
            setProgress(0);
            setStage('copying');
          }}
          disabled={stage !== 'plugged'}
        >
          2. Hujjatni nusxalash
        </Action>
        <Action on={() => setStage('ejecting')} disabled={!copied}>
          3. Xavfsiz uzish
        </Action>
        <Action on={reset} disabled={stage !== 'safe' && stage !== 'broken'}>
          4. Chiqarish
        </Action>

        <Action
          on={() => setStage('broken')}
          disabled={stage !== 'copying' || copied}
          danger
        >
          ✕ Nusxalash paytida tortib olish
        </Action>

        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-4 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:border-blue-edge hover:text-blue-ink"
        >
          <RotateCcw className="h-4 w-4" />
          Boshidan
        </button>
      </div>

      <Explain title={note.title} tone={note.tone}>
        <p>{note.text}</p>
      </Explain>
    </PracticeCard>
  );
}
