'use client';

import {useState} from 'react';
import {CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, BookOpen, Laptop, Shuffle} from 'lucide-react';
import {
  THEORY_QUESTIONS,
  PRACTICE_QUESTIONS,
  type BankKey,
  type OrderMap,
} from '@/lib/quiz-4-dars';

export type AnswerMap = {
  [bank in BankKey]: {[questionId: number]: number};
};

export function QuizSection({
  bank,
  onBankChange,
  answers,
  orders,
  onAnswer,
  onReset,
}: {
  bank: BankKey;
  onBankChange: (b: BankKey) => void;
  answers: AnswerMap;
  orders: OrderMap;
  onAnswer: (bank: BankKey, questionId: number, optionIndex: number) => void;
  onReset: (bank: BankKey) => void;
}) {
  const questions = bank === 'theory' ? THEORY_QUESTIONS : PRACTICE_QUESTIONS;
  const currentAnswers = answers[bank];

  const answeredCount = Object.keys(currentAnswers).length;
  let correctCount = 0;
  for (const q of questions) {
    if (currentAnswers[q.id] === q.answer) {
      correctCount++;
    }
  }

  const scorePercent = answeredCount > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Sub-tabs for switching between Theory and Practice Quiz Banks */}
      <div className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6 shadow-card">
        <div className="inline-flex rounded-2xl border border-line bg-subtle p-1.5">
          <button
            onClick={() => onBankChange('theory')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              bank === 'theory'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Nazariy test (10 ta)
          </button>
          <button
            onClick={() => onBankChange('practice')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              bank === 'practice'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-fg-muted hover:text-fg'
            }`}
          >
            <Laptop className="h-4 w-4" />
            Amaliy test / Hotkeys (10 ta)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg">
            Ball: <span className="font-mono text-blue-ink">{correctCount} / {questions.length}</span> ({scorePercent}%)
          </div>
          <button
            onClick={() => onReset(bank)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg hover:border-blue-edge hover:bg-blue-tint hover:text-blue-ink transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Qayta boshlash
          </button>
        </div>
      </div>

      <p className="flex items-start gap-2.5 rounded-2xl border border-amber-edge bg-amber-tint p-3.5 text-xs leading-relaxed text-amber-ink sm:text-sm">
        <Shuffle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Javob variantlari har safar tasodifiy tartibda chiqadi — javobni
          harfiga emas, mazmuniga qarab tanlang. «Qayta boshlash» bosilsa,
          tartib yana o‘zgaradi.
        </span>
      </p>

      {/* Questions list */}
      <div className="space-y-4">
        {questions.map((q, qIndex) => {
          const pickedOriginal = currentAnswers[q.id];
          const isAnswered = pickedOriginal !== undefined;
          const order = orders[bank][q.id] || q.options.map((_, i) => i);

          return (
            <div
              key={q.id}
              className="rounded-3xl border border-line bg-surface p-6 shadow-card transition-all sm:p-7"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-blue-tint text-xs font-black text-blue-ink">
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-fg leading-relaxed sm:text-base">
                    {q.text}
                  </h3>

                  {/* Options */}
                  <div className="mt-4 grid gap-2.5">
                    {order.map((origIndex, pos) => {
                      const optionText = q.options[origIndex];
                      const isSelected = pickedOriginal === origIndex;
                      const isCorrect = origIndex === q.answer;
                      // harf ekrandagi o'ringa qarab beriladi, asl indeksga emas
                      const letter = String.fromCharCode(65 + pos);

                      let btnStyle = 'border-line bg-subtle text-fg hover:border-blue-edge hover:bg-surface';
                      let badgeStyle = 'border-line bg-surface text-fg-muted';
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold';
                          badgeStyle = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300';
                        } else if (isSelected) {
                          btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-bold';
                          badgeStyle = 'border-rose-500/50 bg-rose-500/15 text-rose-700 dark:text-rose-300';
                        } else {
                          btnStyle = 'border-line/60 bg-subtle/50 text-fg-subtle opacity-60';
                        }
                      }

                      return (
                        <button
                          key={origIndex}
                          disabled={isAnswered}
                          onClick={() => onAnswer(bank, q.id, origIndex)}
                          className={`flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs sm:text-sm transition-all ${btnStyle}`}
                        >
                          <span className="flex min-w-0 items-start gap-2.5">
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border text-[11px] font-black ${badgeStyle}`}
                            >
                              {letter}
                            </span>
                            <span className="leading-snug">{optionText}</span>
                          </span>
                          {isAnswered && isCorrect && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after answer */}
                  {isAnswered && (
                    <div
                      className={`mt-4 rounded-2xl border p-4 text-xs leading-relaxed animate-fade-in ${
                        pickedOriginal === q.answer
                          ? 'border-emerald-edge bg-emerald-tint/70 text-emerald-ink'
                          : 'border-rose-edge bg-rose-tint/70 text-rose-ink'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <HelpCircle className="h-4 w-4" />
                        <span>
                          {pickedOriginal === q.answer ? "To‘g‘ri javob!" : "Noto‘g‘ri javob."}
                        </span>
                      </div>
                      <p className="opacity-95">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion summary */}
      {answeredCount === questions.length && (
        <div className="rounded-3xl border border-blue-edge bg-gradient-to-br from-blue-500/10 via-teal-500/5 to-indigo-500/10 p-6 sm:p-8 text-center shadow-lift">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
            <Award className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-fg">
            Ushbu test banki to‘liq yakunlandi!
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            To‘plagan balingiz: <strong className="text-blue-ink">{correctCount} / {questions.length}</strong> ({scorePercent}%)
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={() => onReset(bank)}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-edge bg-blue-tint px-4 py-2 text-xs font-bold text-blue-ink hover:bg-blue-tint-strong transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Savollarni aralashtirib qayta topshirish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
