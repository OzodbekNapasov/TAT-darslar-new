'use client';

import {useState} from 'react';
import {ClipboardList, Lock, Save, ShieldAlert} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

type Fields = {
  fio: string;
  birth: string;
  bp: string;
  temp: string;
  allergy: string;
  done: boolean;
};

const EMPTY: Fields = {
  fio: 'Karimov Anvar Saidovich',
  birth: '1978',
  bp: '',
  temp: '',
  allergy: '',
  done: false,
};

const FIELD_LABELS: Record<string, string> = {
  bp: 'Qon bosimi',
  temp: 'Tana harorati',
  allergy: 'Allergiya',
};

export function EhrForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [log, setLog] = useState<string[]>([]);
  const [problems, setProblems] = useState<string[] | null>(null);
  const [locked, setLocked] = useState(false);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) =>
    setF((prev) => ({...prev, [k]: v}));

  const save = () => {
    const missing = (['bp', 'temp', 'allergy'] as const)
      .filter((k) => !f[k].trim())
      .map((k) => FIELD_LABELS[k]);

    if (missing.length) {
      setProblems(missing);
      return;
    }

    setProblems([]);
    const time = new Date().toLocaleTimeString('uz-UZ', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setLog((prev) =>
      [
        `[${time}] ${f.fio}: qon bosimi ${f.bp}, harorat ${f.temp} °C. ` +
          `Allergiya: ${f.allergy}. Tayinlov: ${f.done ? 'bajarildi' : 'BAJARILMAGAN'}. ` +
          'Kim kiritdi: hamshira (login: h.navbatchi)',
        ...prev,
      ].slice(0, 5),
    );
  };

  return (
    <PracticeCard
      n={3}
      Icon={ClipboardList}
      title="Elektron kartani to‘ldirish va saqlash"
      lead="Kompyuterda shakl (forma) to‘ldirishni mashq qilamiz. Bo‘sh qatorlar qolsa, dastur saqlashga ruxsat bermaydi."
    >
      <div className="overflow-hidden rounded-2xl border-2 border-teal-edge bg-surface">
        {/* oyna sarlavhasi */}
        <div className="flex items-center justify-between gap-3 border-b border-teal-edge bg-teal-tint px-4 py-2.5">
          <span className="text-sm font-black text-teal-ink">
            Elektron tibbiy karta № 10427
          </span>
          <span className="rounded-md border border-teal-edge bg-surface px-2 py-0.5 text-[11px] font-bold text-teal-ink">
            {locked ? 'Ekran bloklangan' : 'Seans ochiq'}
          </span>
        </div>

        <div className={`p-4 sm:p-5 ${locked ? 'pointer-events-none blur-sm select-none' : ''}`}>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-fg-subtle">
                F.I.Sh.
              </span>
              <input
                value={f.fio}
                onChange={(e) => set('fio', e.target.value)}
                className="w-full rounded-lg border border-line bg-subtle px-3 py-2 text-sm text-fg outline-none focus:border-teal-500"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-fg-subtle">
                Tug‘ilgan yili
              </span>
              <input
                value={f.birth}
                onChange={(e) => set('birth', e.target.value)}
                className="w-full rounded-lg border border-line bg-subtle px-3 py-2 text-sm text-fg outline-none focus:border-teal-500"
              />
            </label>

            {(
              [
                ['bp', 'Qon bosimi (mm sim. ust.)', '120/80'],
                ['temp', 'Tana harorati (°C)', '36.6'],
              ] as const
            ).map(([key, label, ph]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-fg-subtle">
                  {label}
                </span>
                <input
                  value={f[key]}
                  placeholder={ph}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full rounded-lg border border-line bg-subtle px-3 py-2 font-mono text-sm text-fg outline-none focus:border-teal-500"
                />
              </label>
            ))}

            <label className="block sm:col-span-2">
              <span className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-ink">
                <ShieldAlert className="h-3.5 w-3.5" />
                Dorilarga allergiya (majburiy)
              </span>
              <input
                value={f.allergy}
                placeholder="masalan: penitsillin — bor / yo‘q"
                onChange={(e) => set('allergy', e.target.value)}
                className="w-full rounded-lg border-2 border-rose-edge bg-rose-tint/50 px-3 py-2 text-sm text-fg outline-none focus:border-rose-500"
              />
            </label>
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2.5 rounded-xl border border-line bg-subtle px-4 py-3">
            <input
              type="checkbox"
              checked={f.done}
              onChange={(e) => set('done', e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-teal-600"
            />
            <span className="text-sm font-bold text-fg">
              Shifokor tayinlovi bajarildi
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={locked}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          Kartaga saqlash
        </button>
        <button
          type="button"
          onClick={() => setLocked((v) => !v)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-5 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:bg-surface"
        >
          <Lock className="h-4 w-4" />
          {locked ? 'Seansni ochish' : 'Ekranni bloklash (Win+L)'}
        </button>
      </div>

      {problems && problems.length > 0 && (
        <Explain title="Tizim saqlashga ruxsat bermadi" tone="rose">
          <p>
            To‘ldirilmagan majburiy qatorlar:{' '}
            <strong>{problems.join(', ')}</strong>. Ayniqsa{' '}
            <strong>allergiya</strong> qatori bo‘sh qolsa, tizim dori
            tayinlanganda ogohlantira olmaydi — bu bemor hayoti uchun bevosita
            xavf.
          </p>
        </Explain>
      )}

      {problems && problems.length === 0 && (
        <Explain title="Yozuv kartaga tushdi" tone="emerald">
          <p>
            E’tibor bering: yozuv bilan birga <strong>vaqt va muallif</strong> ham
            saqlandi. Tayinlovni «bajarildi» deb belgilamasangiz, keyingi smena
            uni bajarilmagan deb hisoblab, dorini takroran berib yuborishi
            mumkin.
          </p>
        </Explain>
      )}

      {locked && (
        <Explain title="Ekran bloklandi" tone="amber">
          <p>
            Ish o‘rnidan bir daqiqaga chiqsangiz ham ekran bloklanadi. Monitorni
            o‘chirish yetarli emas — seans ochiq qoladi va begona odam sizning
            nomingizdan yozuv kiritishi mumkin.
          </p>
        </Explain>
      )}

      {log.length > 0 && (
        <div className="mt-4 rounded-2xl border border-line bg-subtle p-4">
          <p className="mb-2.5 text-xs font-black uppercase tracking-wider text-fg-subtle">
            Karta jurnali (oxirgi yozuvlar)
          </p>
          <ul className="space-y-2">
            {log.map((line, i) => (
              <li
                key={i}
                className="rounded-lg border border-line bg-surface px-3 py-2 font-mono text-xs leading-relaxed text-fg-muted"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PracticeCard>
  );
}
