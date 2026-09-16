/**
 * Single source of truth for 4-Dars metadata and navigation.
 */

export type LessonStatus = 'ready' | 'draft';

export type Accent = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'teal' | 'cyan';

export interface LessonSection {
  title: string;
  detail: string;
}

export interface Lesson {
  n: number;
  slug: string;
  label: string;
  title: string;
  topic: string;
  summary: string;
  status: LessonStatus;
  accent: Accent;
  minutes: number;
  quizCount: number;
  sections: LessonSection[];
}

export const LESSONS: Lesson[] = [
  {
    n: 4,
    slug: '/4-dars',
    label: '4-dars',
    title: 'Klaviatura va sichqoncha asoslari',
    topic: 'Klaviatura zonalari, 10 barmoq bilan tez yozish (TezType), tezkor tugmalar (Hotkeys) va sichqoncha texnikasi.',
    summary:
      'Tibbiyot xodimlari uchun klaviatura zonalari, barmoqlar ergonomikasi va to‘g‘ri joylashuvi, F va J tayanchlari, 60 soniyali tez yozish trenajyori, Windows va tibbiy axborot tizimlaridagi eng muhim tezkor tugmalar (Hotkeys) hamda sichqoncha kursor laboratoriyasi.',
    status: 'ready',
    accent: 'blue',
    minutes: 80,
    quizCount: 20,
    sections: [
      {
        title: 'Nazariya',
        detail:
          'Klaviatura anatomiyasi (5 ta asosiy zona, indikatorlar), ergonomika va gigiyena, sichqoncha tuzilishi, sensor turlari (optik/lazer), DPI va tibbiy diagnostikadagi o‘rni',
      },
      {
        title: 'Amaliyot & Trenajyorlar',
        detail:
          'Jonli klaviatura detektori, 10 barmoq tez yozish trenajyori (WPM va aniqlik hisobi), kursor laboratoriyasi (hover/grab/wait/pointer holatlari)',
      },
      {
        title: 'Bilimni sinash (Test)',
        detail:
          'Nazariy test (10 savol) va amaliy hotkeys testi (10 savol) — aralashtiriladigan variantlar, tushuntirish va yakuniy ball',
      },
    ],
  },
];

export const READY_LESSONS = LESSONS.filter((l) => l.status === 'ready');

export function getLesson(slug: string): Lesson | undefined {
  return LESSONS.find((l) => l.slug === slug);
}

export const TOTALS = {
  lessons: READY_LESSONS.length,
  minutes: READY_LESSONS.reduce((s, l) => s + l.minutes, 0),
  questions: READY_LESSONS.reduce((s, l) => s + l.quizCount, 0),
};
