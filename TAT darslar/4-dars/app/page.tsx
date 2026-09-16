import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FlaskConical,
  HeartPulse,
  Layers,
  ListChecks,
  ShieldCheck,
  Keyboard,
  Mouse,
  Zap,
} from 'lucide-react';

import {SiteFooter} from '@/components/site-footer';
import {SiteHeader} from '@/components/site-header';
import {LESSONS, TOTALS, type Lesson} from '@/lib/lessons';
import {href, SITE} from '@/lib/site';

export const metadata = {
  title: '4-Dars: Klaviatura va sichqoncha asoslari',
  description: `${SITE.college} — ${SITE.subject} fani bo‘yicha 4-dars elektron qo‘llanmasi.`,
};

const STATS = [
  {Icon: BookOpen, value: TOTALS.lessons, label: 'Tayyor dars'},
  {Icon: Clock, value: TOTALS.minutes, label: 'Daqiqa material'},
  {Icon: ListChecks, value: TOTALS.questions, label: 'Test savoli'},
];

const FEATURES = [
  {
    Icon: Keyboard,
    title: 'Klaviatura zonalari & Jonli detektor',
    text: '5 ta funksional zona, F va J tayanch bo‘rtiqlari, jonli tugma detektori va ergonomika qoidalari.',
  },
  {
    Icon: Zap,
    title: '10 barmoq trenajyori (TezType)',
    text: '60 soniyali interaktiv matn yozish trenajyori, WPM tezlik va aniqlik hisoblagichi.',
  },
  {
    Icon: Mouse,
    title: 'Sichqoncha & Kursor laboratoriyasi',
    text: 'DPI, sensor turlari, sichqoncha amallari va barcha kursor holatlarini jonli sinash maydonchasi.',
  },
];

function LessonCard({lesson}: {lesson: Lesson}) {
  return (
    <a
      href={href(lesson.slug)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue-edge hover:shadow-lift sm:p-7"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-tint-strong opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
          <Keyboard className="h-6 w-6" />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-edge bg-emerald-tint px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-ink">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Tayyor
        </span>
      </div>

      <div className="relative mt-5">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-ink">
          {lesson.label}
        </p>
        <h2 className="mt-1.5 text-xl font-bold leading-snug text-fg sm:text-2xl">
          {lesson.title}
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">
          {lesson.summary}
        </p>
      </div>

      <ul className="relative mt-5 grid gap-2">
        {lesson.sections.map((s, i) => (
          <li
            key={s.title}
            className="flex items-start gap-2.5 rounded-xl border border-line bg-subtle px-3 py-2"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-blue-tint-strong text-[11px] font-black text-blue-ink">
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-bold text-fg">
                {s.title}
              </span>
              <span className="block text-xs leading-relaxed text-fg-subtle">
                {s.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex items-center justify-between border-t border-line pt-4">
        <div className="flex items-center gap-3 text-xs font-semibold text-fg-subtle">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-blue-ink" />
            {lesson.minutes} daqiqa
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ListChecks className="h-3.5 w-3.5 text-blue-ink" />
            {lesson.quizCount} test
          </span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-ink transition-transform group-hover:translate-x-1">
          Darsni boshlash
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased selection:bg-blue-tint-strong">
      <SiteHeader
        eyebrow="Tibbiyotda AT"
        title="4-Dars: Klaviatura va sichqoncha asoslari"
        subtitle="Klaviatura zonalari, tez yozish va sichqoncha"
        back={{label: 'Bosh Mundarijaga qaytish', to: '/'}}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 shadow-card sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-edge bg-blue-tint px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-ink">
              <Keyboard className="h-3.5 w-3.5" />
              Shahrisabz Tibbiyot Texnikumi
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-fg sm:text-4xl">
              Klaviatura va sichqoncha bilan professional ishlash asoslari
            </h1>
            <p className="mt-3 text-base leading-relaxed text-fg-muted sm:text-lg">
              Hamshiralik ishi va tibbiyot xodimlari uchun 10 barmoq bilan ko‘r-ko‘rona tez yozish,
              muhim klaviatura birikmalari (Hotkeys) va sichqoncha aniqligini oshirishga
              mo‘ljallangan interaktiv elektron qo‘llanma.
            </p>

            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
              {STATS.map((s) => {
                const Icon = s.Icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-subtle px-4 py-2.5"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-tint text-blue-ink">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-mono text-lg font-black text-fg">
                        {s.value}
                      </div>
                      <div className="text-[11px] font-semibold text-fg-subtle">
                        {s.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.Icon;
            return (
              <div
                key={f.title}
                className="rounded-3xl border border-line bg-surface p-6 shadow-card"
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-500/10 text-blue-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-fg">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                  {f.text}
                </p>
              </div>
            );
          })}
        </section>

        {/* Lesson Card */}
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-fg">Dars materiallari</h2>
            <span className="text-xs font-semibold text-fg-subtle">
              1 ta dars mavjud
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {LESSONS.map((l) => (
              <LessonCard key={l.slug} lesson={l} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
