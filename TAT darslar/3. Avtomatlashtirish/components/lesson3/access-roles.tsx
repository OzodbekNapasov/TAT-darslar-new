'use client';

import {useState} from 'react';
import {CheckCircle2, RotateCcw, ShieldCheck, XCircle} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

type Verdict = 'allowed' | 'forbidden';

const CASES: {id: number; text: string; answer: Verdict; why: string}[] = [
  {
    id: 1,
    text: 'Hamshira o‘z bo‘limidagi bemorning kartasini ochib, tayinlovni tekshiradi.',
    answer: 'allowed',
    why: 'Bu bevosita kasbiy vazifa. Kirish huquqi aynan shu ish uchun berilgan.',
  },
  {
    id: 2,
    text: 'Hamshira boshqa bo‘limdagi tanishining kasallik tarixini qiziqib ochadi.',
    answer: 'forbidden',
    why: 'Kasbiy zaruratsiz ochilgan karta — tibbiy sirning buzilishi. Tizim jurnali kim ochganini aniq qayd etadi.',
  },
  {
    id: 3,
    text: 'Xodim ish o‘rnidan chiqishdan oldin ekranni bloklaydi (Win+L).',
    answer: 'allowed',
    why: 'To‘g‘ri odat: ochiq qolgan seansda begona odam sizning nomingizdan yozuv kiritishi mumkin.',
  },
  {
    id: 4,
    text: 'Hamshira parolini hamkasbiga aytadi — «shoshilinch kerak bo‘lsa kirib turasan».',
    answer: 'forbidden',
    why: 'Parol shaxsiy. Baham ko‘rilgan parolda tizim amalni sizning nomingizga yozadi, javobgarlik ham sizda qoladi.',
  },
  {
    id: 5,
    text: 'Xodim bemor hujjatini shaxsiy telefoniga suratga oladi.',
    answer: 'forbidden',
    why: 'Tibbiy ma’lumot muassasa tizimidan tashqariga chiqarilmaydi. Telefon yo‘qolsa yoki nusxa tarqalsa, javobgarlik xodimda.',
  },
];

export function AccessRoles() {
  const [given, setGiven] = useState<Record<number, Verdict>>({});

  const answer = (id: number, v: Verdict) =>
    setGiven((prev) => (prev[id] !== undefined ? prev : {...prev, [id]: v}));

  const done = Object.keys(given).length;
  const correct = CASES.reduce((n, c) => (given[c.id] === c.answer ? n + 1 : n), 0);

  return (
    <PracticeCard
      n={4}
      Icon={ShieldCheck}
      title="Parol va tibbiy sir: to‘g‘rimi yoki noto‘g‘ri?"
      lead="Beshta holat berilgan. Har birini o‘qing va u ruxsat etiladimi yoki man etiladimi — belgilang. Javobdan keyin izoh chiqadi."
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-fg-subtle">To‘g‘ri baholangan holat</p>
        <StepPill done={correct} total={CASES.length} />
      </div>

      <div className="space-y-3">
        {CASES.map((c) => {
          const g = given[c.id];
          const isAnswered = g !== undefined;
          const ok = isAnswered && g === c.answer;

          return (
            <div
              key={c.id}
              className={`rounded-2xl border-2 bg-surface p-4 transition-all sm:p-5 ${
                isAnswered
                  ? ok
                    ? 'border-emerald-400'
                    : 'border-rose-400'
                  : 'border-line'
              }`}
            >
              <p className="text-sm leading-relaxed text-fg sm:text-base">{c.text}</p>

              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {(
                  [
                    ['allowed', 'Ruxsat etiladi'],
                    ['forbidden', 'Man etiladi'],
                  ] as const
                ).map(([verdict, label]) => {
                  const chosen = g === verdict;
                  const isRight = verdict === c.answer;

                  let cls =
                    'border-line bg-subtle text-fg hover:border-teal-edge hover:bg-teal-tint/50';
                  if (isAnswered) {
                    if (isRight)
                      cls = 'border-emerald-500 bg-emerald-tint text-emerald-ink font-bold';
                    else if (chosen)
                      cls = 'border-rose-500 bg-rose-tint text-rose-ink font-bold';
                    else cls = 'border-line bg-subtle/50 text-fg-muted opacity-90';
                  }

                  return (
                    <button
                      key={verdict}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => answer(c.id, verdict)}
                      className={`flex cursor-pointer items-center justify-between gap-2.5 rounded-xl border-2 px-4 py-3 text-left text-sm font-bold transition-all ${cls}`}
                    >
                      <span>{label}</span>
                      {isAnswered && isRight && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-ink" />
                      )}
                      {isAnswered && chosen && !isRight && (
                        <XCircle className="h-5 w-5 shrink-0 text-rose-ink" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div
                  className={`mt-3 rounded-xl border p-3.5 text-sm leading-relaxed ${
                    ok
                      ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                      : 'border-rose-edge bg-rose-tint text-rose-ink'
                  }`}
                >
                  {c.why}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {done === CASES.length && (
        <>
          <Explain
            title={`Natija: ${correct} / ${CASES.length}`}
            tone={correct === CASES.length ? 'emerald' : 'amber'}
          >
            <p>
              Qoida sodda: <strong>ish uchun kerakmi?</strong> Kerak bo‘lsa —
              ruxsat, kerak bo‘lmasa — yo‘q. Kompyuter esa har bir amalni kim
              qilganini yozib boradi.
            </p>
          </Explain>

          <button
            type="button"
            onClick={() => setGiven({})}
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-5 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:bg-surface"
          >
            <RotateCcw className="h-4 w-4" />
            Qaytadan
          </button>
        </>
      )}
    </PracticeCard>
  );
}
