'use client';

import {useEffect, useState} from 'react';
import type {LucideIcon} from 'lucide-react';
import {Award, BookOpen, CheckCircle2, Laptop, Sparkles} from 'lucide-react';

import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {PracticeSection} from '@/components/lesson2/practice-section';
import {TheorySection} from '@/components/lesson2/theory-section';
import {
  QuizSection,
  type AnswerMap,
  type BankKey,
} from '@/components/lesson2/quiz-section';
import {getLesson} from '@/lib/lessons';
import {
  TOTAL_QUESTIONS,
  buildOrders,
  reshuffleBank,
  type OrderMap,
} from '@/lib/quiz-2-dars';

type TabId = 'theory' | 'practice' | 'quiz';

const TABS: {id: TabId; label: string; Icon: LucideIcon}[] = [
  {id: 'theory', label: '1. NAZARIYA', Icon: BookOpen},
  {id: 'practice', label: '2. AMALIYOT (KOMPYUTERDA ISH)', Icon: Laptop},
  {id: 'quiz', label: '3. BILIMNI SINASH (TEST)', Icon: CheckCircle2},
];

const LESSON = getLesson('/2-dars')!;

export default function Lesson2Page() {
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
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased selection:bg-purple-tint-strong">
      <SiteHeader
        eyebrow={LESSON.label}
        title={LESSON.title}
        subtitle={LESSON.topic}
        back={{label: 'Mundarijaga qaytish', to: '/'}}
      />

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
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
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
                          : 'border border-purple-edge bg-purple-tint-strong text-purple-ink'
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
                Hurmatli talaba! Bu darsning eng qimmatli qismi — amaliyot.
                Nazariyani o‘qib chiqqach, har bir mashqni albatta o‘z qo‘lingiz
                bilan bosib ko‘ring: fayl yarating, nusxalang, o‘chiring va
                qaytaring. Shundagina bilim ko‘nikmaga aylanadi.
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
              className="cursor-pointer self-start rounded-xl bg-surface px-5 py-2.5 text-sm font-bold text-purple-ink shadow-sm transition-colors hover:bg-purple-tint"
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
                <BookOpen className="h-4 w-4 text-purple-ink" />
                Muhim atamalar
              </h3>
              <div className="space-y-3">
                {[
                  {
                    t: 'Bit va bayt',
                    d: 'Bit — 0 yoki 1. Sakkiz bit bir baytni, ya’ni bitta harfni tashkil qiladi.',
                  },
                  {
                    t: 'Fayl kengaytmasi',
                    d: 'Nuqtadan keyingi harflar (.docx, .jpg) — faylda qanday axborot borligini bildiradi.',
                  },
                  {
                    t: 'Xavfsiz uzish',
                    d: 'Fleshkani chiqarishdan oldin tizimga yozishni yakunlash imkonini beruvchi amal.',
                  },
                ].map((g) => (
                  <div key={g.t} className="border-l-3 border-purple-500 pl-3">
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
                <Award className="h-4 w-4 text-purple-ink" />
                Darsdagi faollik
              </h3>

              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold tracking-wider text-fg-subtle">
                  O‘ZLASHTIRISH DARAJASI
                </p>
                <p className="text-base font-bold text-purple-ink">
                  {overallProgress}%
                </p>
              </div>

              <div className="h-3 w-full overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                  style={{width: `${overallProgress}%`}}
                />
              </div>

              <p className="mt-4 text-sm font-medium leading-relaxed text-fg-muted">
                {overallProgress < 50
                  ? 'Siz nazariy tushunchalarni o‘zlashtirmoqdasiz.'
                  : answeredCount === TOTAL_QUESTIONS
                    ? 'Tabriklaymiz! 2-darsni to‘liq yakunladingiz.'
                    : 'Siz amaliyot va test bosqichidasiz.'}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-4 text-xs font-bold text-fg-subtle">
              <span>Mavzu: 2-Dars</span>
              <span className="text-purple-ink">Hamshiralik ishi</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter note={`${LESSON.label}: ${LESSON.title}`} />
    </div>
  );
}
