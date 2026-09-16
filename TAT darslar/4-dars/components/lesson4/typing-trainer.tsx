'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, RefreshCw, Shuffle, Trophy, CheckCircle, AlertCircle } from 'lucide-react';

const TYPING_TEXTS = [
  'Kompyuter klaviaturasi axborotni kiritishning eng asosiy vositasi hisoblanadi.',
  'Tez yozishni o‘rganish uchun har kuni kamida o‘n besh daqiqa mashq qilish kerak.',
  'Sichqoncha yordamida ekrandagi kursor boshqariladi va obyektlar tanlanadi.',
  'Simsiz qurilmalar batareya bilan ishlaydi, simli qurilmalar esa kabeldan quvvat oladi.',
  'Avval aniqlik, keyin tezlik — bu tez yozishning eng muhim qoidasidir.',
  'Tibbiyot texnikumi talabalari axborot texnologiyalari fanini puxta o‘zlashtirmoqda.',
];

const DURATION = 60;

export function TypingTrainer() {
  const [textIndex, setTextIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 100, errors: 0 });

  const currentText = TYPING_TEXTS[textIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const calculateStats = (typed: string, elapsedSec: number) => {
    let correct = 0;
    let errors = 0;

    for (let i = 0; i < typed.length; i++) {
      if (i < currentText.length && typed[i] === currentText[i]) {
        correct++;
      } else {
        errors++;
      }
    }

    const minutes = elapsedSec / 60;
    const wpm = elapsedSec >= 1 ? Math.round((correct / 5) / minutes) : 0;
    const accuracy = typed.length > 0 ? Math.round((correct / typed.length) * 100) : 100;

    return { wpm, accuracy, errors };
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isFinished) return;
    const val = e.target.value;

    if (!isActive && val.length > 0) {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    setInputVal(val);

    const elapsed = startTimeRef.current ? Math.max(1, (Date.now() - startTimeRef.current) / 1000) : 1;
    const newStats = calculateStats(val, elapsed);
    setStats(newStats);

    if (val.length >= currentText.length) {
      finishTest(newStats);
    }
  };

  const finishTest = (finalStats?: { wpm: number; accuracy: number; errors: number }) => {
    setIsFinished(true);
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (finalStats) setStats(finalStats);
  };

  useEffect(() => {
    if (isActive && !isFinished) {
      timerRef.current = setInterval(() => {
        if (!startTimeRef.current) return;
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const remaining = Math.max(0, DURATION - Math.floor(elapsed));
        setTimeLeft(remaining);

        setStats(calculateStats(inputRef.current?.value || '', elapsed));

        if (remaining <= 0) {
          finishTest();
        }
      }, 250);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isFinished]);

  const resetTrainer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(false);
    setInputVal('');
    setTimeLeft(DURATION);
    startTimeRef.current = null;
    setStats({ wpm: 0, accuracy: 100, errors: 0 });
    inputRef.current?.focus();
  };

  const nextText = () => {
    setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
    resetTrainer();
  };

  const getEvaluationMessage = () => {
    const { wpm, accuracy, errors } = stats;
    let level = 'Boshlang‘ich daraja — har kuni 15 daqiqa mashq qiling.';
    if (wpm >= 60) level = 'Professional daraja — juda a’lo!';
    else if (wpm >= 40) level = 'Yaxshi daraja — maqsadga erishdingiz!';
    else if (wpm >= 20) level = 'O‘rta daraja — mashqni davom ettiring.';

    const accNote = accuracy >= 95 ? 'Aniqlik a’lo.' : 'Aniqlik 95% dan past — biroz sekinroq yozib ko‘ring.';

    return { level, accNote, wpm, accuracy, errors };
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7 shadow-card">
      {/* Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 mb-5">
        <div className="flex items-center gap-2 font-bold text-fg text-base sm:text-lg">
          <Clock className="h-5 w-5 text-blue-ink" />
          <span>Oflayn yozuv trenajyori — 60 soniya</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={nextText}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg hover:border-blue-edge hover:bg-surface transition-all shadow-sm"
          >
            <Shuffle className="h-3.5 w-3.5 text-blue-ink" />
            Boshqa matn
          </button>
          <button
            type="button"
            onClick={resetTrainer}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-sm active:scale-95"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Qayta boshlash
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5">
        <div className="rounded-2xl border border-line bg-subtle p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">Qolgan vaqt</div>
          <div className="mt-1 font-mono text-2xl font-black text-fg">{timeLeft}s</div>
        </div>
        <div className="rounded-2xl border border-line bg-subtle p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">Tezlik</div>
          <div className="mt-1 font-mono text-2xl font-black text-blue-ink">
            {stats.wpm} <span className="text-xs font-semibold text-fg-muted">WPM</span>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-subtle p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">Aniqlik</div>
          <div className="mt-1 font-mono text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.accuracy}%
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-subtle p-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-fg-subtle">Xatolar</div>
          <div className="mt-1 font-mono text-2xl font-black text-rose-500">{stats.errors}</div>
        </div>
      </div>

      {/* Text preview with char coloring */}
      <div className="rounded-2xl border border-line bg-subtle/80 p-4 sm:p-5 font-mono text-base sm:text-lg leading-relaxed select-none min-h-[90px] text-fg-muted">
        {currentText.split('').map((char, i) => {
          let stateClass = '';
          if (i < inputVal.length) {
            stateClass =
              inputVal[i] === char
                ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-[2px]'
                : 'text-rose-700 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 rounded-[2px]';
          } else if (i === inputVal.length) {
            stateClass = 'bg-blue-300 dark:bg-blue-800 text-fg rounded-[2px] animate-pulse';
          }
          return (
            <span key={i} className={stateClass}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Input textarea */}
      <div className="mt-4">
        <textarea
          ref={inputRef}
          value={inputVal}
          onChange={handleInput}
          disabled={isFinished}
          placeholder="Yuqoridagi matnni shu yerga ko‘chirib yozing…"
          spellCheck={false}
          autoComplete="off"
          className="w-full min-h-[100px] resize-y rounded-2xl border border-line bg-surface p-4 font-mono text-base text-fg placeholder:text-fg-subtle outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-subtle disabled:opacity-75 shadow-inner"
        />
      </div>

      {/* Result box */}
      {isFinished && (
        <div className="mt-5 rounded-2xl border border-emerald-edge bg-emerald-tint p-5 text-emerald-ink">
          <div className="flex items-center gap-2 font-bold text-base">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span>Natija: {stats.wpm} WPM, aniqlik {stats.accuracy}%, xatolar {stats.errors}.</span>
          </div>
          <p className="mt-1 text-sm leading-relaxed opacity-90">
            {getEvaluationMessage().level} {getEvaluationMessage().accNote}
          </p>
        </div>
      )}
    </div>
  );
}
