'use client';

import {useState} from 'react';
import {FileAudio, FileImage, FileText, FileVideo, HardDrive} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

interface Sample {
  id: string;
  name: string;
  ext: string;
  /** size in kilobytes, so the arithmetic below stays in one unit */
  kb: number;
  pretty: string;
  kind: string;
  Icon: typeof FileText;
  tone: 'blue' | 'purple' | 'amber' | 'rose';
  note: string;
}

const SAMPLES: Sample[] = [
  {
    id: 'docx',
    name: 'Kundalik',
    ext: '.docx',
    kb: 48,
    pretty: '48 KB',
    kind: 'Matnli axborot',
    Icon: FileText,
    tone: 'blue',
    note: 'Hamshiralik kundaligi — harflar va so‘zlardan iborat. Matn juda kam joy egallaydi.',
  },
  {
    id: 'jpg',
    name: 'Rentgen',
    ext: '.jpg',
    kb: 8 * 1024,
    pretty: '8 MB',
    kind: 'Tasviriy axborot',
    Icon: FileImage,
    tone: 'purple',
    note: 'Rentgen surati — tasvir. Bitta surat mingta matn sahifasidan ham og‘ir bo‘lishi mumkin.',
  },
  {
    id: 'mp3',
    name: 'Yurak toni',
    ext: '.mp3',
    kb: 3 * 1024,
    pretty: '3 MB',
    kind: 'Ovozli axborot',
    Icon: FileAudio,
    tone: 'amber',
    note: 'Fonendoskop yozuvi — tovush. Auskultatsiya natijasini saqlash va shifokorga yuborish mumkin.',
  },
  {
    id: 'mp4',
    name: 'Amaliyot darsi',
    ext: '.mp4',
    kb: 700 * 1024,
    pretty: '700 MB',
    kind: 'Video axborot',
    Icon: FileVideo,
    tone: 'rose',
    note: 'Video — tasvir va ovoz birga. Shuning uchun eng ko‘p joy egallaydigan tur.',
  },
];

const DRIVES = [
  {label: '8 GB fleshka', kb: 8 * 1024 * 1024},
  {label: '16 GB fleshka', kb: 16 * 1024 * 1024},
  {label: '32 GB fleshka', kb: 32 * 1024 * 1024},
];

const LADDER = [
  {unit: '1 bit', text: '0 yoki 1 — eng kichik birlik'},
  {unit: '1 bayt', text: '8 bit — bitta harf'},
  {unit: '1 KB', text: '1024 bayt — yarim sahifa matn'},
  {unit: '1 MB', text: '1024 KB — bitta surat'},
  {unit: '1 GB', text: '1024 MB — yuzlab suratlar'},
];

export function FileTypes() {
  const [pickId, setPickId] = useState('jpg');
  const [driveIx, setDriveIx] = useState(1);

  const pick = SAMPLES.find((s) => s.id === pickId)!;
  const drive = DRIVES[driveIx];
  const fits = Math.floor(drive.kb / pick.kb);

  return (
    <PracticeCard
      n={4}
      Icon={HardDrive}
      title="Fayl turlari va ularning hajmi"
      lead="Faylning oxiridagi nuqtadan keyingi harflar (kengaytma) uning qanday axborot ekanini bildiradi. Fayl tanlang va uning turi hamda hajmini ko‘ring."
    >
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {SAMPLES.map((s) => {
          const on = s.id === pickId;
          const tones = {
            blue: 'border-blue-500 bg-blue-tint text-blue-ink',
            purple: 'border-purple-500 bg-purple-tint text-purple-ink',
            amber: 'border-amber-500 bg-amber-tint text-amber-ink',
            rose: 'border-rose-500 bg-rose-tint text-rose-ink',
          } as const;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setPickId(s.id)}
              className={`flex cursor-pointer flex-col items-start gap-2 rounded-xl border-2 p-3.5 text-left transition-all ${
                on ? tones[s.tone] : 'border-line bg-subtle text-fg-muted hover:border-blue-edge'
              }`}
            >
              <s.Icon className="h-6 w-6" />
              <span className="w-full">
                <span className="block truncate text-sm font-bold text-fg">
                  {s.name}
                  <span className="font-mono text-xs">{s.ext}</span>
                </span>
                <span className="block text-xs font-bold">{s.pretty}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* unit ladder */}
      <div className="mt-5 rounded-2xl border border-line bg-subtle p-4">
        <p className="mb-3 text-xs font-black uppercase tracking-wider text-fg-subtle">
          O‘lchov birliklari narvoni
        </p>
        <div className="flex flex-wrap items-stretch gap-2">
          {LADDER.map((l, i) => (
            <div
              key={l.unit}
              className="flex min-w-[124px] flex-1 flex-col rounded-xl border border-line bg-surface px-3 py-2.5"
            >
              <span className="font-mono text-sm font-black text-blue-ink">
                {l.unit}
              </span>
              <span className="mt-0.5 text-[11px] leading-snug text-fg-muted">
                {l.text}
              </span>
              {i < LADDER.length - 1 && (
                <span className="mt-1 text-[10px] font-bold text-fg-subtle">×1024 ↓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* capacity calculator */}
      <div className="mt-4 rounded-2xl border-2 border-blue-edge bg-blue-tint p-4 sm:p-5">
        <p className="mb-3 text-xs font-black uppercase tracking-wider text-blue-ink">
          Hisoblab ko‘ring: fleshkaga nechta sig‘adi?
        </p>
        <div className="flex flex-wrap gap-2">
          {DRIVES.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDriveIx(i)}
              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
                i === driveIx
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-blue-edge bg-surface text-blue-ink hover:bg-blue-tint-strong'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-base leading-relaxed text-fg sm:text-lg">
          <span className="font-bold">{drive.label}</span>ga{' '}
          <span className="font-mono font-bold">
            {pick.name}
            {pick.ext}
          </span>{' '}
          ({pick.pretty}) fayldan{' '}
          <span className="rounded-lg bg-blue-600 px-2.5 py-0.5 font-mono text-lg font-black text-white">
            {fits.toLocaleString('uz-UZ')}
          </span>{' '}
          ta sig‘adi.
        </p>
      </div>

      <Explain title={`${pick.name}${pick.ext} — ${pick.kind}`} tone={pick.tone}>
        <p>{pick.note}</p>
      </Explain>
    </PracticeCard>
  );
}
