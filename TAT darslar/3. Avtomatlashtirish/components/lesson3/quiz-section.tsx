'use client';

import {Award, BookOpen, CheckCircle2, Laptop, RotateCcw, Shuffle, XCircle} from 'lucide-react';
import {
  QUIZ_BANKS,
  TOTAL_QUESTIONS,
  grade,
  optionText,
  type OrderMap,
  type QuizBank,
} from '@/lib/quiz-3-dars';

export type BankKey = QuizBank['key'];
export type AnswerMap = Record<BankKey, Record<number, number>>;

export function QuizSection({
  quizSet,
  setQuizSet,
  answers,
  orders,
  onAnswer,
  onReset,
}: {
  quizSet: BankKey;
  setQuizSet: (k: BankKey) => void;
  answers: AnswerMap;
  /** savol id -> variantlarning ko'rsatiladigan tartibi */
  orders: OrderMap;
  onAnswer: (bank: BankKey, questionId: number, optionIndex: number) => void;
  onReset: (bank: BankKey) => void;
}) {
  const bank = QUIZ_BANKS.find((b) => b.key === quizSet)!;
  const given = answers[quizSet];
  const total = bank.questions.length;
  const answered = Object.keys(given).length;
  const correct = bank.questions.reduce(
    (n, q) => (given[q.id] === q.correctIndex ? n + 1 : n),
    0,
  );
  const percent = Math.round((correct / total) * 100);
  const answeredAll =
    Object.keys(answers.theory).length + Object.keys(answers.practice).length;
  const otherBank = QUIZ_BANKS.find((b) => b.key !== quizSet);

  return (
    <div className="space-y-8">
      {/* header + bank switcher */}
      <div className="space-y-6 rounded-2xl border-2 border-teal-edge bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-teal-ink sm:text-sm">
              <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-teal-500" />
              Shahrisabz Tibbiyot Texnikumi • Bilimni sinash
            </div>
            <h2 className="text-xl font-black leading-tight text-fg sm:text-2xl">
              3-Dars bo‘yicha test sinovlari
            </h2>
            <p className="mt-1 text-sm text-fg-muted sm:text-base">
              Nazariy va amaliy testlar alohida baholanadi. Har bir savoldan
              keyin to‘g‘ri javob va izohi darhol ko‘rsatiladi.
            </p>
          </div>

          <div className="flex w-full shrink-0 items-center justify-between gap-4 rounded-xl border border-line bg-subtle p-4 md:w-auto md:justify-start">
            <div>
              <span className="block text-xs font-bold uppercase text-fg-subtle">
                Jami yechilgan
              </span>
              <span className="text-xl font-black text-teal-ink">
                {answeredAll} / {TOTAL_QUESTIONS}
              </span>
            </div>
            {answered > 0 && (
              <button
                type="button"
                onClick={() => onReset(quizSet)}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-edge bg-teal-tint px-4 py-2 text-xs font-bold text-teal-ink transition-all hover:bg-teal-tint-strong"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Qaytadan</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl border border-line bg-subtle p-1.5 sm:grid-cols-2">
          {QUIZ_BANKS.map((b) => {
            const isOpen = quizSet === b.key;
            const done = Object.keys(answers[b.key]).length;
            const Icon = b.key === 'theory' ? BookOpen : Laptop;
            return (
              <button
                key={b.key}
                type="button"
                aria-current={isOpen ? 'page' : undefined}
                onClick={() => setQuizSet(b.key)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition-all duration-200 sm:text-base ${
                  isOpen
                    ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25'
                    : 'text-fg-muted hover:bg-surface hover:text-fg'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Icon
                    className={`h-5 w-5 shrink-0 ${isOpen ? 'text-white' : 'text-fg-subtle'}`}
                  />
                  <span className="truncate">{b.label}</span>
                </span>
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-bold ${
                    isOpen
                      ? 'bg-white/20 text-white'
                      : 'border border-teal-edge bg-teal-tint-strong text-teal-ink'
                  }`}
                >
                  {done}/{b.questions.length}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-sm leading-relaxed text-fg-muted">{bank.description}</p>

        <p className="flex items-start gap-2.5 rounded-xl border border-amber-edge bg-amber-tint p-3.5 text-sm leading-relaxed text-amber-ink">
          <Shuffle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Javob variantlari har safar tasodifiy tartibda chiqadi — javobni
            harfiga emas, mazmuniga qarab tanlang. «Qaytadan» bosilsa, tartib
            yana o‘zgaradi.
          </span>
        </p>
      </div>

      {/* questions */}
      <div className="space-y-5">
        {bank.questions.map((q, qIndex) => {
          const selected = given[q.id];
          const isAnswered = selected !== undefined;
          const isCorrect = isAnswered && selected === q.correctIndex;
          const order = orders[quizSet][q.id] ?? q.options.map((_, i) => i);

          return (
            <div
              key={q.id}
              className={`rounded-2xl border-2 bg-surface p-6 shadow-sm transition-all sm:p-7 ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-400 ring-2 ring-emerald-edge'
                    : 'border-rose-400 ring-2 ring-rose-edge'
                  : 'border-line hover:border-teal-edge'
              }`}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-teal-edge bg-teal-tint-strong text-sm font-bold text-teal-ink">
                    {qIndex + 1}
                  </span>
                  <h4 className="text-base font-bold leading-snug text-fg sm:text-lg">
                    {q.question}
                  </h4>
                </div>

                {isAnswered && (
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      isCorrect
                        ? 'border border-emerald-edge bg-emerald-tint-strong text-emerald-ink'
                        : 'border border-rose-edge bg-rose-tint-strong text-rose-ink'
                    }`}
                  >
                    {isCorrect ? "To'g'ri" : "Noto'g'ri"}
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-3 pl-0 sm:pl-11">
                {order.map((optIdx, pos) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;
                  // harf ekrandagi o'ringa qarab beriladi, asl indeksga emas
                  const letter = String.fromCharCode(65 + pos);

                  let optClass =
                    'border-line bg-subtle hover:bg-teal-tint/50 hover:border-teal-edge text-fg';
                  let badgeClass = 'border-line bg-surface text-fg-muted';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      optClass =
                        'border-emerald-500 bg-emerald-tint text-emerald-ink font-bold';
                      badgeClass =
                        'border-emerald-edge bg-emerald-tint-strong text-emerald-ink';
                    } else if (isThisSelected) {
                      optClass = 'border-rose-500 bg-rose-tint text-rose-ink font-bold';
                      badgeClass = 'border-rose-edge bg-rose-tint-strong text-rose-ink';
                    } else {
                      // de-emphasised, but still readable: students re-read the
                      // other options after answering
                      optClass = 'border-line bg-subtle/50 text-fg-muted opacity-90';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => onAnswer(quizSet, q.id, optIdx)}
                      className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-2 p-4 text-left text-sm transition-all sm:text-base ${optClass}`}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-xs font-black ${badgeClass}`}
                        >
                          {letter}
                        </span>
                        <span>{optionText(q.options[optIdx])}</span>
                      </span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-ink" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="h-5 w-5 shrink-0 text-rose-ink" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed sm:ml-11 sm:text-base ${
                    isCorrect
                      ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                      : 'border-rose-edge bg-rose-tint text-rose-ink'
                  }`}
                >
                  <strong className="mb-1 block font-bold">Izoh va xulosa:</strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* result card */}
      {answered === total && (
        <div className="space-y-5 rounded-3xl border-2 border-teal-600 bg-surface p-6 text-center shadow-md sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-edge bg-teal-tint-strong text-teal-ink">
            <Award className="h-9 w-9" />
          </div>

          <div>
            <span className="rounded-full border border-teal-edge bg-teal-tint-strong px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-ink">
              Shahrisabz Tibbiyot Texnikumi • {bank.label}
            </span>
            <h3 className="mt-3 text-2xl font-black text-fg sm:text-3xl">
              {bank.label} yakunlandi!
            </h3>
            <p className="mt-1 text-sm text-fg-muted sm:text-base">
              Fan: Tibbiyotda axborot texnologiyalari • Hamshiralik ishi
            </p>
          </div>

          <div className="mx-auto grid max-w-lg grid-cols-3 gap-4 rounded-2xl border border-line bg-subtle p-5">
            <div>
              <div className="text-xs font-bold uppercase text-fg-subtle">To‘g‘ri</div>
              <div className="text-2xl font-black text-emerald-ink">
                {correct} / {total}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-fg-subtle">Foiz</div>
              <div className="text-2xl font-black text-teal-ink">{percent}%</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-fg-subtle">Baho</div>
              <div className="text-2xl font-black text-fg">{grade(percent)}</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onReset(quizSet)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm transition-colors hover:bg-teal-700"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Bu testni qaytadan yechish</span>
            </button>
            {otherBank &&
              Object.keys(answers[otherBank.key]).length <
                otherBank.questions.length && (
                <button
                  type="button"
                  onClick={() => {
                    setQuizSet(otherBank.key);
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-teal-edge bg-subtle px-6 py-3 text-base font-bold text-teal-ink transition-colors hover:bg-teal-tint"
                >
                  <span>{otherBank.label}ga o‘tish</span>
                </button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
