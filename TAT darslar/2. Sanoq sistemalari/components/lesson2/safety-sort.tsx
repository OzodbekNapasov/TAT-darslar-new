'use client';

import {useState} from 'react';
import {CheckCircle2, RotateCcw, ShieldAlert, XCircle} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

interface Rule {
  id: number;
  text: string;
  /** true = correct practice, false = violation */
  ok: boolean;
  why: string;
}

const RULES: Rule[] = [
  {
    id: 1,
    text: 'Monitor ekrani ko‘zdan 50–70 sm masofada, yuqori qirrasi ko‘z sathida turadi',
    ok: true,
    why: 'Bu masofa ko‘z charchashini va bo‘yin og‘rig‘ini kamaytiradi. Ekran pastda bo‘lsa bo‘yin, yuqorida bo‘lsa ko‘z zo‘riqadi.',
  },
  {
    id: 2,
    text: 'Klaviatura yonida choy yoki suv stakani turadi',
    ok: false,
    why: 'To‘kilgan suyuqlik klaviatura va tizim blokini ishdan chiqaradi, elektr toki urishi xavfini tug‘diradi. Ichimlik alohida stolda turishi kerak.',
  },
  {
    id: 3,
    text: 'Har 45 daqiqada 10–15 daqiqa tanaffus qilinadi, ko‘z uchun mashq bajariladi',
    ok: true,
    why: 'Uzluksiz ishlash ko‘z quruqshashi va charchoqqa olib keladi. Tanaffusda uzoqqa qarash va yelka mashqlari tavsiya etiladi.',
  },
  {
    id: 4,
    text: 'Ho‘l qo‘l bilan rozetka yoki simga tegiladi',
    ok: false,
    why: 'Suv tokni yaxshi o‘tkazadi — bu elektr toki urishining eng keng tarqalgan sababi. Qo‘l doim quruq bo‘lishi shart.',
  },
  {
    id: 5,
    text: 'Bir uzatgichga (udlinitel) ko‘p quvvatli qurilmalar ketma-ket ulangan',
    ok: false,
    why: 'Ortiqcha yuklanish simning qizishiga va yong‘inga olib keladi. Har bir qurilma o‘z quvvatiga mos ulanishi kerak.',
  },
  {
    id: 6,
    text: 'Umumiy klaviatura va sichqoncha smena oxirida dezinfeksiyalanadi',
    ok: true,
    why: 'Bir necha hamshira ishlatadigan klaviatura — infeksiya tarqalish yo‘li. Antiseptik salfetka bilan artish infeksiya nazoratining bir qismi.',
  },
  {
    id: 7,
    text: 'Simlar oyoq ostidan, yurish yo‘lakchasi bo‘ylab tortilgan',
    ok: false,
    why: 'Qoqilib yiqilish va simning uzilishi xavfi. Simlar devor bo‘ylab, maxsus kanalda yotishi kerak.',
  },
  {
    id: 8,
    text: 'Tutun yoki kuygan hid sezilsa, qurilma darhol tarmoqdan uziladi va xabar beriladi',
    ok: true,
    why: 'Birinchi navbatda quvvat uziladi, so‘ng texnik xizmatga xabar beriladi. Yonayotgan qurilmani suv bilan o‘chirish mumkin emas.',
  },
];

export function SafetySort() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState<number | null>(null);

  const answered = Object.keys(answers).length;
  const correct = RULES.filter((r) => answers[r.id] === r.ok).length;
  const shown = RULES.find((r) => r.id === open);

  function judge(r: Rule, choice: boolean) {
    if (answers[r.id] !== undefined) return;
    setAnswers((p) => ({...p, [r.id]: choice}));
    setOpen(r.id);
  }

  return (
    <PracticeCard
      n={7}
      Icon={ShieldAlert}
      title="Ish o‘rni: texnika xavfsizligi va gigiena qoidalari"
      lead="Quyidagi 8 ta holatni ko‘rib chiqing va har biri to‘g‘ri amaliyotmi yoki qoida buzilishimi — belgilang."
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-fg-muted">
          To‘g‘ri baholandi: <span className="text-emerald-ink">{correct}</span> / {RULES.length}
        </span>
        <StepPill done={answered} total={RULES.length} />
      </div>

      <ul className="space-y-2.5">
        {RULES.map((r) => {
          const given = answers[r.id];
          const isAnswered = given !== undefined;
          const right = given === r.ok;

          return (
            <li
              key={r.id}
              className={`rounded-xl border-2 p-3.5 transition-all ${
                !isAnswered
                  ? 'border-line bg-subtle'
                  : right
                    ? 'border-emerald-400 bg-emerald-tint'
                    : 'border-rose-400 bg-rose-tint'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p
                  className={`text-sm leading-relaxed sm:text-[15px] ${
                    isAnswered ? 'font-bold text-fg' : 'text-fg-muted'
                  }`}
                >
                  {r.text}
                </p>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => judge(r, true)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-all ${
                      isAnswered
                        ? r.ok
                          ? 'border-emerald-500 bg-emerald-tint-strong text-emerald-ink'
                          : 'cursor-not-allowed border-line bg-subtle text-fg-subtle opacity-70'
                        : 'cursor-pointer border-emerald-edge bg-surface text-emerald-ink hover:bg-emerald-tint'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    To‘g‘ri
                  </button>
                  <button
                    type="button"
                    disabled={isAnswered}
                    onClick={() => judge(r, false)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold transition-all ${
                      isAnswered
                        ? !r.ok
                          ? 'border-rose-500 bg-rose-tint-strong text-rose-ink'
                          : 'cursor-not-allowed border-line bg-subtle text-fg-subtle opacity-70'
                        : 'cursor-pointer border-rose-edge bg-surface text-rose-ink hover:bg-rose-tint'
                    }`}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    Buzilish
                  </button>
                </div>
              </div>

              {isAnswered && (
                <p className="mt-3 border-t border-line pt-3 text-sm leading-relaxed text-fg-muted">
                  <strong className={right ? 'text-emerald-ink' : 'text-rose-ink'}>
                    {right ? 'To‘g‘ri baholadingiz. ' : 'Xato baholadingiz. '}
                  </strong>
                  {r.why}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          setAnswers({});
          setOpen(null);
        }}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-4 py-2 text-sm font-bold text-fg-muted transition-colors hover:border-blue-edge hover:text-blue-ink"
      >
        <RotateCcw className="h-4 w-4" />
        Boshidan
      </button>

      {answered === RULES.length && (
        <Explain
          title={`Yakun: ${correct} / ${RULES.length} to‘g‘ri`}
          tone={correct === RULES.length ? 'emerald' : 'amber'}
        >
          <p>
            {correct === RULES.length
              ? 'Barcha holatlarni to‘g‘ri baholadingiz — ish o‘rni xavfsizligi qoidalarini o‘zlashtirdingiz.'
              : 'Xato belgilangan holatlarning izohini qayta o‘qing: ularning har biri haqiqiy shifoxonada uchraydigan xavf.'}
          </p>
        </Explain>
      )}

      {shown && answered < RULES.length && (
        <Explain
          title={shown.ok ? 'To‘g‘ri amaliyot' : 'Qoida buzilishi'}
          tone={shown.ok ? 'emerald' : 'rose'}
        >
          <p>{shown.why}</p>
        </Explain>
      )}
    </PracticeCard>
  );
}
