'use client';

import React, { useState } from 'react';
import { HelpCircle, FileText, Check, XCircle, RotateCcw, CheckCircle2 } from 'lucide-react';

interface QuestionItem {
  id: number;
  badge: string;
  question: string;
  correct: string;
}

const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    badge: '1-misol',
    question: "Bemor tizza bo'g'imining ultratovush (UTT/UZI) va magnit-rezonans (MRT) tekshiruvi surati",
    correct: 'Tasviriy',
  },
  {
    id: 2,
    badge: '2-misol',
    question: "Elektron kardiomonitordagi puls (82 ur/daq) va qondagi kislorod to'yinishi (SpO2 98%) ko'rsatkichlari",
    correct: 'Raqamli',
  },
  {
    id: 3,
    badge: '3-misol',
    question: "Auskultatsiya jarayonida bemor o'pkasida eshitilayotgan xirillashlar va nafas shovqini",
    correct: 'Ovozli',
  },
  {
    id: 4,
    badge: '4-misol',
    question: "Bemorning kasallik tarixiga shifokor tomonidan kiritilgan epikriz va qabul qilish tavsiyalari matni",
    correct: 'Matnli',
  },
  {
    id: 5,
    badge: '5-misol',
    question: "Laparoskopik operatsiya jarayoni hamda oshqozon endoskopiyasi tekshiruvining jonli video yozuvi",
    correct: 'Video',
  },
];

const OPTIONS = ['Matnli', 'Raqamli', 'Tasviriy', 'Ovozli', 'Video'];

export function InfoTypeExercise() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (id: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
  };

  const handleReset = () => {
    setAnswers({});
  };

  const isAllAnswered = Object.keys(answers).length === QUESTIONS.length;
  const isAllCorrect =
    isAllAnswered && QUESTIONS.every((q) => answers[q.id] === q.correct);

  return (
    <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between flex-wrap gap-2">
        <h3 className="flex items-center gap-3 text-xl font-bold text-fg sm:text-2xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-sm">
            <HelpCircle className="h-6 w-6" />
          </div>
          <span>{"3-Bo'lim. Axborot turlarini aniqlash mashqi"}</span>
        </h3>
        <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400">
          {"Interaktiv mashq"}
        </span>
      </div>

      <div className="mb-4 h-1 w-16 rounded-full bg-cyan-400" />

      <p className="mb-6 text-sm leading-relaxed text-fg-muted sm:text-base">
        {"Quyida berilgan har bir tibbiy misol uchun eng to'g'ri keladigan axborot turini tanlang. Barcha javoblarni belgilab, o'z bilimingizni sinab ko'ring:"}
      </p>

      {/* Questions list */}
      <div className="space-y-4">
        {QUESTIONS.map((item) => {
          const selected = answers[item.id];
          const isCorrect = selected === item.correct;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all sm:p-5 ${
                selected
                  ? isCorrect
                    ? 'border-emerald-500/50 bg-emerald-500/10'
                    : 'border-rose-500/50 bg-rose-500/10'
                  : 'border-line bg-subtle/70 hover:border-cyan-500/40'
              }`}
            >
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div className="flex-1 space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/20 px-2.5 py-1 text-xs font-bold text-cyan-300">
                    <FileText className="h-3.5 w-3.5" />
                    {item.badge}
                  </span>
                  <p className="text-sm font-semibold text-fg sm:text-base">
                    {item.question}
                  </p>
                </div>

                {/* Option buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {OPTIONS.map((opt) => {
                    const isThisSelected = selected === opt;
                    const isThisCorrect = opt === item.correct;
                    let btnStyle =
                      'bg-surface hover:bg-subtle text-fg border-line hover:border-cyan-500/50';

                    if (selected) {
                      if (isThisSelected) {
                        btnStyle = isCorrect
                          ? 'bg-emerald-500/25 border-emerald-500 text-emerald-300 font-bold shadow-xs'
                          : 'bg-rose-500/25 border-rose-500 text-rose-300 font-bold shadow-xs';
                      } else if (isThisCorrect) {
                        btnStyle =
                          'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-medium';
                      } else {
                        btnStyle =
                          'bg-surface/50 text-fg-muted/50 border-line/40 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(item.id, opt)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${btnStyle}`}
                      >
                        {isThisSelected && isCorrect && (
                          <Check className="h-4 w-4 text-emerald-400" />
                        )}
                        {isThisSelected && !isCorrect && (
                          <XCircle className="h-4 w-4 text-rose-400" />
                        )}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback text */}
              {selected && (
                <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                  <span
                    className={
                      isCorrect
                        ? 'font-semibold text-emerald-400'
                        : 'font-semibold text-rose-400'
                    }
                  >
                    {isCorrect
                      ? "✓ To'g'ri tanlandi!"
                      : `✗ Noto'g'ri. To'g'ri javob: ${item.correct}`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset Button & Celebration */}
      <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={handleReset}
          className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-cyan-500/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-bold text-cyan-400 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{"Mashqni tozalash"}</span>
        </button>

        {isAllCorrect && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 sm:text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>
              {"Ajoyib! Barcha 5 ta tibbiy axborot turini xatosiz aniqladingiz!"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
