'use client';

import {useState} from 'react';
import {ClipboardCheck, Printer} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

const TASKS: {
  id: number;
  title: string;
  steps: string[];
  result: string;
}[] = [
  {
    id: 1,
    title: 'Ish o‘rningizni tartibga soling',
    steps: [
      'Ish stolida «AIO_Familiya» nomli papka yarating.',
      'Uning ichida «Bemorlar» va «Hisobotlar» papkalarini oching.',
      'Ish o‘rningizdan chiqishni bir marta mashq qiling: Win+L bosing va qayta kiring.',
    ],
    result: 'Ikki ichki papkali bitta papka va bloklab-ochilgan seans.',
  },
  {
    id: 2,
    title: 'Word’da jadval tuzib, to‘g‘ri joyga saqlang',
    steps: [
      'Word’da 5 ustunli jadval yarating: F.I.Sh., sana, qon bosimi, harorat, allergiya.',
      '3 ta shartli bemorni to‘ldiring.',
      'Faylni «Kundalik_Familiya» nomi bilan «Bemorlar» papkasiga saqlang.',
    ],
    result: '3 qatorli jadval, to‘g‘ri papkada va tushunarli nom bilan saqlangan fayl.',
  },
  {
    id: 3,
    title: 'Faylni nusxalang va nomini o‘zgartiring',
    steps: [
      'Kundalik faylini tanlab, Ctrl+C bosing.',
      '«Hisobotlar» papkasini ochib, Ctrl+V bilan joylashtiring.',
      'Nusxaning nomini «Kundalik_nusxa» ga o‘zgartiring (F2 tugmasi).',
    ],
    result: 'Ikki papkada ikkita fayl: asli «Bemorlar» da, nusxasi «Hisobotlar» da.',
  },
  {
    id: 4,
    title: 'Parol va maxfiylik qoidalarini yozing',
    steps: [
      'Daftarga «Men shunday qilaman» va «Men bunday qilmayman» ustunlarini chizing.',
      'Har biriga 3 tadan qoida yozing (nazariyaning 4-mavzusidan).',
      'Kompyuterda Win+L ni bosib, ekranni bloklashni bir marta ko‘rsating.',
    ],
    result: 'Ikki ustunli, 6 qoidali ro‘yxat va bloklab-ochilgan ekran.',
  },
];

export function Homework() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (id: number) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <PracticeCard
      n={5}
      Icon={ClipboardCheck}
      title="Amaliy topshiriqlar (kompyuterda bajariladi)"
      lead="Bu to‘rt topshiriq haqiqiy kompyuterda bajariladi va o‘qituvchiga topshiriladi. Bajarganingizni belgilab boring."
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-fg-subtle">Bajarilgan topshiriq</p>
        <StepPill done={done.length} total={TASKS.length} />
      </div>

      <div className="space-y-3">
        {TASKS.map((t) => {
          const isDone = done.includes(t.id);
          return (
            <div
              key={t.id}
              className={`rounded-2xl border-2 p-4 transition-all sm:p-5 ${
                isDone ? 'border-emerald-400 bg-emerald-tint/50' : 'border-line bg-surface'
              }`}
            >
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => toggle(t.id)}
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-teal-600"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-black uppercase tracking-wider text-teal-ink">
                    {t.id}-topshiriq
                  </span>
                  <span className="mt-0.5 block text-base font-bold text-fg">
                    {t.title}
                  </span>
                </span>
              </label>

              <ol className="mt-3 space-y-1.5 pl-7">
                {t.steps.map((s, i) => (
                  <li key={s} className="flex gap-2.5 text-sm leading-relaxed text-fg-muted">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md border border-line bg-subtle text-[11px] font-black text-fg-subtle">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>

              <p className="mt-3 ml-7 rounded-lg border border-line bg-subtle px-3 py-2 text-sm leading-relaxed text-fg-muted">
                <strong className="text-fg">Topshiriladigan natija:</strong> {t.result}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-teal-edge bg-teal-tint px-5 py-2.5 text-sm font-bold text-teal-ink transition-colors hover:bg-teal-tint-strong"
        >
          <Printer className="h-4 w-4" />
          Topshiriqlarni chop etish
        </button>
        <button
          type="button"
          onClick={() => setDone([])}
          className="cursor-pointer rounded-xl border border-line bg-subtle px-5 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:bg-surface"
        >
          Belgilarni tozalash
        </button>
      </div>

      {done.length === TASKS.length ? (
        <Explain title="Barcha topshiriqlar bajarildi" tone="emerald">
          <p>
            Endi «AIO_Familiya» papkasini o‘qituvchiga ko‘rsating: ichida
            «Bemorlar» va «Hisobotlar» papkalari, kundalik fayli va uning nusxasi
            bo‘lishi kerak.
          </p>
        </Explain>
      ) : (
        <Explain title="Baholash mezoni" tone="amber">
          <p>
            Har bir topshiriq 1 ballgacha baholanadi: amal to‘g‘ri bajarilganmi,
            fayl to‘g‘ri papkada va tushunarli nom bilan saqlanganmi. Saqlanmagan
            yoki «Hujjat1» deb nomlangan fayl uchun ball tushiriladi.
          </p>
        </Explain>
      )}
    </PracticeCard>
  );
}
