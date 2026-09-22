'use client';

import React, { useEffect, useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Shuffle } from 'lucide-react';

export const HOTKEYS_QUIZ = [
  { q: 'Matnni nusxalash uchun qaysi qisqartma ishlatiladi?', o: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'], a: 0 },
  { q: 'Hujjatni saqlash uchun?', o: ['Ctrl + P', 'Ctrl + S', 'Ctrl + A', 'F5'], a: 1 },
  { q: 'Oxirgi amalni bekor qilish uchun?', o: ['Ctrl + Y', 'Ctrl + B', 'Ctrl + Z', 'Alt + F4'], a: 2 },
  { q: 'Ochiq oynalar orasida almashish uchun?', o: ['Alt + Tab', 'Ctrl + Tab', 'Win + Tab', 'Shift + Tab'], a: 0 },
  { q: 'Kompyuterni qulflab, joyingizdan turmoqchisiz. Qaysi qisqartma?', o: ['Win + D', 'Win + E', 'Win + L', 'Alt + F4'], a: 2 },
  { q: 'Kursordan O‘NGDAGI belgini qaysi klavisha o‘chiradi?', o: ['Backspace', 'Delete', 'Esc', 'Insert'], a: 1 },
  { q: 'Sahifani yangilash (yangidan yuklash) uchun?', o: ['F2', 'F5', 'F11', 'F1'], a: 1 },
  { q: 'Fayl nomini o‘zgartirish uchun qaysi funksional klavisha?', o: ['F2', 'F4', 'F8', 'F12'], a: 0 },
  { q: 'Hujjatdagi butun matnni belgilash uchun?', o: ['Ctrl + A', 'Ctrl + F', 'Ctrl + T', 'Shift + End'], a: 0 },
  { q: 'Dastur qotib qolganda Vazifalar dispetcherini ochish uchun?', o: ['Ctrl + Alt + Del', 'Ctrl + Shift + Esc', 'Alt + Esc', 'Win + R'], a: 1 },
  { q: 'Fayllar oynasini (Explorer) ochish uchun?', o: ['Win + D', 'Win + E', 'Win + S', 'Win + P'], a: 1 },
  { q: 'Bir nechta TARQOQ faylni birdan tanlash uchun sichqoncha bilan birga nima bosiladi?', o: ['Shift', 'Ctrl', 'Alt', 'Tab'], a: 1 }
];

/* -------------------------------------------------------------------------- */
/*  Aralashtirish: savollar tartibi ham, javob variantlari ham                  */
/* -------------------------------------------------------------------------- */

/** Bitta topshiriq rejasi: qaysi savol va uning variantlari qaysi tartibda. */
type Plan = { qi: number; order: number[] }[];

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  // Fisher-Yates
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * `doShuffle: false` - tabiiy tartib. Sahifa oldindan render qilinadi, shuning
 * uchun birinchi chizishda aynan shu tartib turishi kerak; haqiqiy
 * aralashtirish mountdan keyin effektda beriladi.
 */
function buildPlan(doShuffle: boolean): Plan {
  const questionOrder = doShuffle
    ? shuffled(HOTKEYS_QUIZ.length)
    : HOTKEYS_QUIZ.map((_, i) => i);

  return questionOrder.map((qi) => ({
    qi,
    order: doShuffle
      ? shuffled(HOTKEYS_QUIZ[qi].o.length)
      : HOTKEYS_QUIZ[qi].o.map((_, i) => i),
  }));
}

export function HotkeysQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const [plan, setPlan] = useState<Plan>(() => buildPlan(false));
  useEffect(() => setPlan(buildPlan(true)), []);

  const step = plan[currentIdx];
  const currentQ = HOTKEYS_QUIZ[step.qi];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOpt(idx);
    if (idx === currentQ.a) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < HOTKEYS_QUIZ.length - 1) {
      setCurrentIdx((i) => i + 1);
      setAnswered(false);
      setSelectedOpt(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setPlan(buildPlan(true));
    setCurrentIdx(0);
    setScore(0);
    setAnswered(false);
    setSelectedOpt(null);
    setIsCompleted(false);
  };

  const percent = Math.round((score / HOTKEYS_QUIZ.length) * 100);
  const feedbackMsg =
    percent >= 85
      ? 'A’lo! Qisqartmalarni juda yaxshi bilasiz.'
      : percent >= 60
      ? 'Yaxshi. Xato qilgan qisqartmalarni jadvaldan yana bir bor takrorlang.'
      : 'Jadvalni yana bir bor ko‘rib chiqing va viktorinani qayta ishlab o‘rganing.';

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-6">
        <div className="flex items-center gap-2.5 font-bold text-fg text-lg">
          <HelpCircle className="h-5 w-5 text-blue-ink" />
          <span>Viktorina — 12 ta savol</span>
        </div>
        <div className="rounded-xl border border-blue-edge bg-blue-tint px-3 py-1 text-xs font-black tracking-wide text-blue-ink">
          Ball: {score} / {HOTKEYS_QUIZ.length}
        </div>
      </div>

      {!isCompleted ? (
        <div>
          <p className="mb-5 flex items-start gap-2.5 rounded-xl border border-amber-edge bg-amber-tint p-3 text-xs leading-relaxed text-amber-ink">
            <Shuffle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Savollar ham, javob variantlari ham har safar aralashib chiqadi.
            </span>
          </p>

          {/* Question */}
          <div className="text-lg sm:text-xl font-bold text-fg leading-snug">
            <span className="text-blue-ink mr-2">{currentIdx + 1}.</span>
            {currentQ.q}
          </div>

          {/* Options Grid */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {step.order.map((i, pos) => {
              const opt = currentQ.o[i];
              const isCorrect = i === currentQ.a;
              const isPicked = i === selectedOpt;
              // harf ekrandagi o'ringa qarab beriladi, asl indeksga emas
              const letter = String.fromCharCode(65 + pos);

              let btnStyle = 'border-line bg-subtle text-fg hover:border-blue-edge hover:bg-surface';
              let badgeStyle = 'border-line bg-surface text-fg-muted';
              if (answered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/20';
                  badgeStyle = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';
                } else if (isPicked) {
                  btnStyle = 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold';
                  badgeStyle = 'border-rose-500/50 bg-rose-500/15 text-rose-700 dark:text-rose-300';
                } else {
                  btnStyle = 'border-line bg-subtle text-fg-subtle opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(i)}
                  disabled={answered}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition-all duration-150 ${btnStyle}`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[11px] font-black ${badgeStyle}`}
                    >
                      {letter}
                    </span>
                    <span>{opt}</span>
                  </span>
                  {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 ml-2" />}
                  {answered && isPicked && !isCorrect && <XCircle className="h-5 w-5 text-rose-500 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
            <span className="text-xs font-semibold text-fg-subtle">
              Savol {currentIdx + 1} / {HOTKEYS_QUIZ.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-subtle px-3 py-2 text-xs font-bold text-fg hover:bg-surface transition-all shadow-sm"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Qayta boshlash
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!answered}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <span>{currentIdx === HOTKEYS_QUIZ.length - 1 ? 'Natijani ko‘rish' : 'Keyingi savol'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="inline-grid h-16 w-16 place-items-center rounded-3xl bg-blue-tint text-blue-ink mb-4">
            <Award className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-fg">Viktorina yakunlandi!</h3>
          <p className="mt-2 text-sm text-fg-muted">
            Siz 12 ta savoldan <span className="font-bold text-blue-ink">{score}</span> tasiga to‘g‘ri javob berdingiz ({percent}%).
          </p>

          <div className="mt-5 max-w-md mx-auto rounded-2xl border border-blue-edge bg-blue-tint p-4 text-sm font-semibold text-blue-ink">
            {feedbackMsg}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Viktorinani qaytadan topshirish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
