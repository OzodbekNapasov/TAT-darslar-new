'use client';

import {useEffect, useState} from 'react';
import type {LucideIcon} from 'lucide-react';
import {Award, BookOpen, CheckCircle2, Laptop, Sparkles, ExternalLink, GraduationCap, ShieldCheck} from 'lucide-react';

import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {PracticeSection} from '@/components/lesson3/practice-section';
import {TheorySection} from '@/components/lesson3/theory-section';
import {
  QuizSection,
  type AnswerMap,
  type BankKey,
} from '@/components/lesson3/quiz-section';
import {getLesson} from '@/lib/lessons';
import {
  TOTAL_QUESTIONS,
  buildOrders,
  reshuffleBank,
  type OrderMap,
} from '@/lib/quiz-3-dars';

type TabId = 'theory' | 'practice' | 'quiz';

const TABS: {id: TabId; label: string; Icon: LucideIcon}[] = [
  {id: 'theory', label: '1. NAZARIYA', Icon: BookOpen},
  {id: 'practice', label: '2. AMALIYOT (KOMPYUTERDA ISH)', Icon: Laptop},
  {id: 'quiz', label: '3. BILIMNI SINASH (TEST)', Icon: CheckCircle2},
];

const LESSON = getLesson('/3-dars')!;

export default function Lesson3Page() {
  const [activeTab, setActiveTab] = useState<TabId>('theory');

  // the two quiz banks are scored independently
  const [quizSet, setQuizSet] = useState<BankKey>('theory');
  const [answers, setAnswers] = useState<AnswerMap>({theory: {}, practice: {}});

  // Javob variantlari har safar boshqa tartibda chiqadi. Birinchi (prerender
  // qilingan) chizishda tabiiy tartib turadi, aralashtirish mountdan keyin
  // beriladi - shunda serverdagi HTML bilan brauzernikida farq bo'lmaydi.
  const [orders, setOrders] = useState<OrderMap>(() => buildOrders(false));
  useEffect(() => setOrders(buildOrders(true)), []);

  // answers are final: the first click on a question locks it in
  const handleAnswer = (bank: BankKey, questionId: number, optionIndex: number) =>
    setAnswers((prev) =>
      prev[bank][questionId] !== undefined
        ? prev
        : {...prev, [bank]: {...prev[bank], [questionId]: optionIndex}},
    );

  const handleReset = (bank: BankKey) => {
    setAnswers((prev) => ({...prev, [bank]: {}}));
    setOrders((prev) => reshuffleBank(prev, bank));
  };

  const answeredCount =
    Object.keys(answers.theory).length + Object.keys(answers.practice).length;

  let overallProgress = 33;
  if (activeTab === 'theory') overallProgress = 33;
  if (activeTab === 'practice') overallProgress = 66;
  if (activeTab === 'quiz') {
    overallProgress = Math.min(
      100,
      Math.round(66 + (answeredCount / TOTAL_QUESTIONS) * 34),
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased selection:bg-teal-tint-strong">
      <SiteHeader
        eyebrow={LESSON.label}
        title={LESSON.title}
        subtitle={LESSON.topic}
        back={{label: 'Mundarijaga qaytish', to: '/'}}
      />

      {/* ===================== ONLAYN PLATFORMA BANNERI ===================== */}
      <div className="border-b border-line bg-gradient-to-r from-teal-950/40 via-slate-900/60 to-indigo-950/40 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/20 text-teal-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-teal-400">
                  3-Dars Onlayn Tizimi
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  Faol
                </span>
              </div>
              <p className="text-xs text-fg-muted">
                O‘quv va test platformasiga to‘g‘ridan-to‘g‘ri kiring:
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2.5 md:w-auto">
            <a
              href="https://ozodbeknapasov.github.io/3-dars-uchun/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] sm:text-sm md:flex-initial"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Talaba profili</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>

            <a
              href="https://ozodbeknapasov.github.io/3-dars-uchun/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] sm:text-sm md:flex-initial"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin profili</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>
          </div>
        </div>
      </div>

      {/* ===================== LESSON SECTION TABS ===================== */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-8">
          <nav
            aria-label="Dars bo'limlari"
            className="grid w-full grid-cols-1 gap-1.5 rounded-2xl border border-line bg-subtle p-1.5 sm:grid-cols-3"
          >
            {TABS.map(({id, label, Icon}) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  id={`tab-${id}-btn`}
                  type="button"
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setActiveTab(id)}
                  className={`flex cursor-pointer items-center justify-center gap-2.5 rounded-xl px-3 py-3 text-center text-sm font-bold transition-all duration-200 sm:px-4 sm:py-3.5 sm:text-[15px] ${
                    active
                      ? 'bg-gradient-to-br from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-500/25'
                      : 'text-fg-muted hover:bg-surface hover:text-fg'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-fg-subtle'}`}
                  />
                  <span className="truncate">{label}</span>
                  {id === 'quiz' && answeredCount > 0 ? (
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'border border-teal-edge bg-teal-tint-strong text-teal-ink'
                      }`}
                    >
                      {answeredCount}/{TOTAL_QUESTIONS}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 p-4 sm:p-6 lg:p-8">
        <div className="flex w-full flex-col gap-8">
          {activeTab === 'theory' && <TheorySection />}
          {activeTab === 'practice' && <PracticeSection />}
          {activeTab === 'quiz' && (
            <QuizSection
              quizSet={quizSet}
              setQuizSet={setQuizSet}
              answers={answers}
              orders={orders}
              onAnswer={handleAnswer}
              onReset={handleReset}
            />
          )}
        </div>

        {/* ============= METHODOLOGY / GLOSSARY / PROGRESS ============== */}
        <section className="grid grid-cols-1 gap-6 border-t-2 border-line pt-6 md:grid-cols-3">
          <div className="on-dark flex flex-col justify-between rounded-2xl bg-teal-900 p-6 text-white shadow-sm">
            <div>
              <h3 className="mb-2.5 flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-teal-300" />
                Metodik tavsiya
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-teal-100 sm:text-base">
                Hurmatli talaba! Nazariyani o‘qib chiqing, lekin asosiy vaqtni
                amaliyotga sarflang: papka yarating, faylni to‘g‘ri joyga
                saqlang, shaklni to‘ldiring. Bu ko‘nikmalar keyingi barcha
                darslarda kerak bo‘ladi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (activeTab === 'theory') setActiveTab('practice');
                else if (activeTab === 'practice') setActiveTab('quiz');
                else setActiveTab('theory');
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
              className="cursor-pointer self-start rounded-xl bg-surface px-5 py-2.5 text-sm font-bold text-teal-ink shadow-sm transition-colors hover:bg-teal-tint"
            >
              {activeTab === 'theory'
                ? "Amaliyotga o'tish"
                : activeTab === 'practice'
                  ? 'Testni topshirish'
                  : 'Nazariyaga qaytish'}
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-fg">
                <BookOpen className="h-4 w-4 text-teal-ink" />
                Muhim atamalar
              </h3>
              <div className="space-y-3">
                {[
                  {
                    t: 'AIO',
                    d: 'Avtomatlashtirilgan ishchi o‘rin — mutaxassis vazifasiga moslangan texnik va dasturiy vositalar majmui.',
                  },
                  {
                    t: 'TAT',
                    d: 'Tibbiy axborot tizimi — muassasadagi barcha AIO larni bitta bazaga birlashtiruvchi dastur.',
                  },
                  {
                    t: 'ETK',
                    d: 'Elektron tibbiy karta — bemor haqidagi barcha yozuvlar saqlanadigan raqamli hujjat.',
                  },
                ].map((g) => (
                  <div key={g.t} className="border-l-3 border-teal-500 pl-3">
                    <p className="text-sm font-bold text-fg">{g.t}</p>
                    <p className="text-xs leading-relaxed text-fg-muted">{g.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-fg">
                <Award className="h-4 w-4 text-teal-ink" />
                Darsdagi faollik
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold tracking-wider text-fg-subtle">
                  O‘ZLASHTIRISH DARAJASI
                </p>
                <p className="text-base font-bold text-teal-ink">
                  {overallProgress}%
                </p>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300"
                  style={{width: `${overallProgress}%`}}
                />
              </div>

              <p className="mt-4 text-sm font-medium leading-relaxed text-fg-muted">
                {overallProgress < 50
                  ? 'Siz nazariy tushunchalarni o‘zlashtirmoqdasiz.'
                  : answeredCount === TOTAL_QUESTIONS
                    ? 'Tabriklaymiz! 3-darsni to‘liq yakunladingiz.'
                    : 'Siz amaliyot va test bosqichidasiz.'}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-4 text-xs font-bold text-fg-subtle">
              <span>Mavzu: 3-Dars</span>
              <span className="text-teal-ink">Hamshiralik ishi</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter note={`${LESSON.label}: ${LESSON.title}`} />
    </div>
  );
}
