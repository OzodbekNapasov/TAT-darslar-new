'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Power,
  Zap,
  Armchair,
  Eye,
  Glasses,
  Flame,
  Check,
  XCircle,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface SafetyScenario {
  id: number;
  text: string;
  correct: 'xavfsiz' | 'xavfli';
  explanation: string;
}

const SAFETY_SCENARIOS: SafetyScenario[] = [
  {
    id: 1,
    text: "1. Kompyuter klaviaturasi yoniga suv solingan stakanni qo'yib ishlash",
    correct: 'xavfli',
    explanation:
      "Suyuqlik to'kilsa klaviatura qisqa tutashuv beradi yoki ishdan chiqadi.",
  },
  {
    id: 2,
    text: "2. Ekrandan ko'zgacha bo'lgan masofani 60 cm atrofida saqlash",
    correct: 'xavfsiz',
    explanation:
      'Tavsiya etilgan xavfsiz masofa 50-70 sm (bir cho‘zilgan qo‘l) oralig‘ida.',
  },
  {
    id: 3,
    text: "3. Tok simi qizib ketganda, unga ho'l lattani bosib sovutish",
    correct: 'xavfli',
    explanation:
      'Suv elektr tokini o‘tkazadi va kuchli elektr toki urishiga yoki yong‘inga sabab bo‘ladi!',
  },
  {
    id: 4,
    text: "4. Har 30 daqiqa kompyuterda ishlagandan so'ng ko'zlar mashqini bajarish",
    correct: 'xavfsiz',
    explanation:
      'Ko‘z toliqishi va quruqlashishining oldini olish uchun har 20-30 daqiqada tanaffus qilish lozim.',
  },
  {
    id: 5,
    text: '5. Tizim blokining orqa paneli simlarini tarmoqdan uzmasdan sudrab tortish',
    correct: 'xavfli',
    explanation:
      'Kuchlanish ostidagi simlarni tortish rozetka va portlarni buzadi hamda elektr xavfini keltirib chiqaradi.',
  },
];

export function SafetyRulesSection() {
  const [exerciseAnswers, setExerciseAnswers] = useState<
    Record<number, 'xavfsiz' | 'xavfli'>
  >({});

  const handleSelectAnswer = (id: number, val: 'xavfsiz' | 'xavfli') => {
    setExerciseAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleResetExercise = () => {
    setExerciseAnswers({});
  };

  const isAllAnswered =
    Object.keys(exerciseAnswers).length === SAFETY_SCENARIOS.length;
  const isAllCorrect =
    isAllAnswered &&
    SAFETY_SCENARIOS.every((s) => exerciseAnswers[s.id] === s.correct);

  return (
    <div className="space-y-8">
      {/* ========================================================= */}
      {/* 7-BO'LIM: TEXNIKA XAVFSIZLIGI QOIDALARI (IMAGE 1)         */}
      {/* ========================================================= */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
          <h3 className="flex items-center gap-3 text-xl font-bold text-fg sm:text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span>{"7-Bo'lim. Texnika xavfsizligi qoidalari"}</span>
          </h3>
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400">
            {"Xavfsizlik talablari"}
          </span>
        </div>

        <div className="mb-4 h-1 w-16 rounded-full bg-cyan-400" />

        <p className="mb-6 text-sm leading-relaxed text-fg-muted sm:text-base">
          {"Kompyuter xonasida to'g'ri ishlash sog'ligingizni saqlash hamda texnik jihozlar buzilishining oldini olish uchun juda muhimdir. Quyidagi oltita asosiy qoidaga doimo amal qiling:"}
        </p>

        {/* 6 Security Cards Grid (Matching media_1788589116445.png) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* 1. Yoqish va o'chirish */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-cyan-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400">
                <Power className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"Yoqish va o'chirish"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Kompyuterni o'chirishdan oldin barcha dasturlarni yopish, tizimni "}
                <strong className="text-cyan-400">
                  {"*Завершение работы* (Shutdown)"}
                </strong>
                {" orqali to'g'ri o'chirish lozim. Tokdan birdan uzib qo'yish tizim buzilishiga sabab bo'ladi."}
              </p>
            </div>
          </div>

          {/* 2. Elektr xavfsizligi */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-cyan-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"Elektr xavfsizligi"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Tok simlari va rozetkalarga, drayver/blok orqa qismiga tegmaslik. Nam qo'l bilan kompyuter qismlariga tegish qat'iyan taqiqlanadi. Qisqa tutashuv yong'inga olib kelishi mumkin."}
              </p>
            </div>
          </div>

          {/* 3. To'g'ri o'tirish */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-cyan-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400">
                <Armchair className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"To'g'ri o'tirish"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Orqa suyanib, bo'yinni tik ushlab o'tiring. Oyoqlar polda tekis tursin. Tirsaklar va tizzalar taxminan "}
                <strong className="text-cyan-400">{"90 gradus"}</strong>
                {" burchak ostida bukilishi umurtqa pog'onasi charchashini oldini oladi."}
              </p>
            </div>
          </div>

          {/* 4. Monitor masofasi */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-cyan-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400">
                <Eye className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"Monitor masofasi"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Ko'zlardan monitor ekranigacha bo'lgan masofa kamida "}
                <strong className="text-cyan-400">{"50-70 cm"}</strong>
                {" (bir cho'zilgan qo'l uzunligi) bo'lishi kerak. Ekranning ustki qismi ko'z darajasidan bir oz pastroq joylashishi lozim."}
              </p>
            </div>
          </div>

          {/* 5. Ko'z salomatligi */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-cyan-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400">
                <Glasses className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"Ko'z salomatligi"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Har "}
                <strong className="text-cyan-400">{"20-30 daqiqada"}</strong>
                {" kompyuterdan ko'zni uzib, uzoqroq masofadagi narsalarga qarab 20 soniya turing. Ko'zlarni ko'p pirpiratish ularning qurib qolishidan va toliqishidan saqlaydi."}
              </p>
            </div>
          </div>

          {/* 6. Favqulodda holatlar */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-subtle/80 p-5 transition-all hover:border-rose-500/40 hover:bg-subtle">
            <div>
              <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/15 text-rose-400">
                <Flame className="h-6 w-6" />
              </div>
              <h4 className="mb-2 text-base font-bold text-fg sm:text-lg">
                {"Favqulodda holatlar"}
              </h4>
              <p className="text-xs leading-relaxed text-fg-muted sm:text-sm">
                {"Kompyuter yoki monitoridan g'alati ovoz, tutun yoki hid chiqsa, zudlik bilan ishni to'xtating, kompyuterni tarmoqdan uzing va o'qituvchiga xabar bering."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8-BO'LIM: XAVFSIZLIK QOIDALARI BO'YICHA MASHQ (IMAGE 3)    */}
      {/* ========================================================= */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
          <h3 className="flex items-center gap-3 text-xl font-bold text-fg sm:text-2xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-400 shadow-sm">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <span>{"8-Bo'lim. Xavfsizlik qoidalari bo'yicha interaktiv mashq"}</span>
          </h3>
          <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400">
            {"Xavfsiz / Xavfli"}
          </span>
        </div>

        <div className="mb-4 h-1 w-16 rounded-full bg-cyan-400" />

        <p className="mb-6 text-sm leading-relaxed text-fg-muted sm:text-base">
          {'Kompyuter xonasida bajariladigan quyidagi harakatlarni "Xavfsiz" (To\'g\'ri) yoki "Xavfli" (Noto\'g\'ri) toifalarga ajrating:'}
        </p>

        {/* Safety scenarios items */}
        <div className="space-y-3.5">
          {SAFETY_SCENARIOS.map((item) => {
            const selected = exerciseAnswers[item.id];
            const isCorrect = selected === item.correct;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between gap-4 rounded-2xl border p-4 transition-all sm:flex-row sm:items-center sm:p-5 ${
                  selected
                    ? isCorrect
                      ? 'border-emerald-500/50 bg-emerald-500/10'
                      : 'border-rose-500/50 bg-rose-500/10'
                    : 'border-line bg-subtle/70 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-fg sm:text-base">
                    {item.text}
                  </p>
                  {selected && (
                    <p
                      className={`mt-1.5 text-xs font-medium ${
                        isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isCorrect ? "✓ To'g'ri: " : "✗ Noto'g'ri: "}
                      <span className="text-fg-muted">{item.explanation}</span>
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex shrink-0 items-center gap-2">
                  {(['xavfsiz', 'xavfli'] as const).map((type) => {
                    const isThisSelected = selected === type;
                    const isThisCorrect = type === item.correct;
                    let btnStyle =
                      'bg-surface hover:bg-subtle text-fg-muted hover:text-fg border-line hover:border-cyan-500/50';

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
                        key={type}
                        type="button"
                        onClick={() => handleSelectAnswer(item.id, type)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold capitalize transition-all sm:text-sm ${btnStyle}`}
                      >
                        {isThisSelected && isCorrect && (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        {isThisSelected && !isCorrect && (
                          <XCircle className="h-3.5 w-3.5 text-rose-400" />
                        )}
                        <span>{type === 'xavfsiz' ? 'Xavfsiz' : 'Xavfli'}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset button & Success feedback */}
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handleResetExercise}
            className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-cyan-500/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-bold text-cyan-400 shadow-sm transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{"Mashqni tozalash"}</span>
          </button>

          {isAllCorrect && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-300 sm:text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>
                {"Ajoyib natija! Texnika xavfsizligi qoidalarini to'liq o'zlashtirdingiz!"}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
