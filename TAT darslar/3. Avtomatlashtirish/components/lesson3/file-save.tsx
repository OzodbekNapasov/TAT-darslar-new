'use client';

import {useState} from 'react';
import {CheckCircle2, FileText, RotateCcw, Save} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

const FOLDERS = [
  {id: 'desktop', label: 'Ish stoli', indent: 0},
  {id: 'aio', label: 'AIO_Familiya', indent: 1},
  {id: 'patients', label: 'Bemorlar', indent: 2},
  {id: 'reports', label: 'Hisobotlar', indent: 2},
  {id: 'downloads', label: 'Yuklamalar', indent: 0},
];

const TYPES = ['.docx', '.xlsx', '.jpg'];

export function FileSave() {
  const [folder, setFolder] = useState('desktop');
  const [name, setName] = useState('Hujjat1');
  const [type, setType] = useState('.docx');
  const [saved, setSaved] = useState<{ok: boolean; msg: string} | null>(null);

  const save = () => {
    const n = name.trim();

    if (!n) {
      setSaved({ok: false, msg: 'Fayl nomi bo‘sh. Nom yozmasdan saqlab bo‘lmaydi.'});
      return;
    }
    if (/[\\/:*?"<>|]/.test(n)) {
      setSaved({
        ok: false,
        msg: 'Fayl nomida  \\ / : * ? " < > |  belgilari bo‘lishi mumkin emas — Windows ularni qabul qilmaydi.',
      });
      return;
    }
    if (/^(hujjat|документ|document)\s*\d*$/i.test(n)) {
      setSaved({
        ok: false,
        msg: 'Fayl «Hujjat1» deb saqlandi. Bunday nom bilan ertaga uni topa olmaysiz — mazmunini bildiruvchi nom yozing.',
      });
      return;
    }
    if (folder !== 'patients') {
      const where = FOLDERS.find((f) => f.id === folder)!.label;
      setSaved({
        ok: false,
        msg: `Fayl «${where}» papkasiga tushdi. Kundalik bemorlarga tegishli — u «Bemorlar» papkasida turishi kerak.`,
      });
      return;
    }
    if (type !== '.docx') {
      setSaved({
        ok: false,
        msg: `Matnli hujjat ${type} turida saqlanmaydi. Word hujjati uchun .docx tanlanadi.`,
      });
      return;
    }

    setSaved({
      ok: true,
      msg: `Fayl saqlandi: Ish stoli → AIO_Familiya → Bemorlar → ${n}${type}`,
    });
  };

  return (
    <PracticeCard
      n={2}
      Icon={Save}
      title="Windows: faylni to‘g‘ri joyga saqlash"
      lead="Word’da hamshiralik kundaligini yozdingiz. Endi uni saqlash kerak. Vazifa: faylni mazmunli nom bilan «Bemorlar» papkasiga .docx turida saqlang."
    >
      {/* ===================== soxta "Saqlash" oynasi ===================== */}
      <div className="overflow-hidden rounded-2xl border-2 border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2.5">
          <Save className="h-4 w-4 text-teal-ink" />
          <span className="text-sm font-bold text-fg">Saqlash</span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[190px_1fr]">
          {/* chap: papkalar */}
          <div className="border-b border-line p-3 sm:border-b-0 sm:border-r">
            <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-fg-subtle">
              Papkalar
            </p>
            <ul className="space-y-0.5">
              {FOLDERS.map((f) => (
                <li key={f.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setFolder(f.id);
                      setSaved(null);
                    }}
                    style={{paddingLeft: `${8 + f.indent * 14}px`}}
                    className={`flex w-full cursor-pointer items-center gap-1.5 rounded-lg py-1.5 pr-2 text-left text-xs font-bold transition-colors ${
                      folder === f.id
                        ? 'bg-teal-tint text-teal-ink'
                        : 'text-fg-muted hover:bg-subtle'
                    }`}
                  >
                    <span className="text-amber-ink">📁</span>
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* o'ng: nom va tur */}
          <div className="p-4">
            <div className="mb-4 flex min-h-[70px] items-center gap-2.5 rounded-xl border border-line bg-subtle px-4 py-3 text-sm text-fg-muted">
              <FileText className="h-5 w-5 shrink-0 text-fg-subtle" />
              <span>
                Saqlanadigan joy:{' '}
                <strong className="text-fg">
                  {FOLDERS.find((f) => f.id === folder)!.label}
                </strong>
              </span>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-fg-subtle">
                Fayl nomi
              </span>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSaved(null);
                }}
                className="w-full rounded-lg border border-line bg-subtle px-3 py-2 text-sm text-fg outline-none focus:border-teal-500"
              />
            </label>

            <div className="mt-3">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-fg-subtle">
                Fayl turi
              </span>
              <div className="flex gap-2">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setType(t);
                      setSaved(null);
                    }}
                    className={`cursor-pointer rounded-lg border-2 px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                      type === t
                        ? 'border-teal-500 bg-teal-tint text-teal-ink'
                        : 'border-line bg-subtle text-fg-muted hover:bg-surface'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2.5">
              <button
                type="button"
                onClick={save}
                className="cursor-pointer rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                Saqlash
              </button>
              <button
                type="button"
                onClick={() => {
                  setFolder('desktop');
                  setName('Hujjat1');
                  setType('.docx');
                  setSaved(null);
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-5 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:bg-surface"
              >
                <RotateCcw className="h-4 w-4" />
                Boshidan
              </button>
            </div>
          </div>
        </div>
      </div>

      {saved && (
        <Explain
          title={saved.ok ? 'To‘g‘ri saqlandi' : 'Diqqat'}
          tone={saved.ok ? 'emerald' : 'rose'}
        >
          <p className="flex items-start gap-2">
            {saved.ok && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
            <span>{saved.msg}</span>
          </p>
        </Explain>
      )}

      {!saved && (
        <Explain title="Saqlashda 3 ta narsaga qaraladi" tone="amber">
          <p>
            <strong>1.</strong> Qaysi papkaga tushmoqda? <strong>2.</strong> Nomi
            mazmunli va tushunarlimi? <strong>3.</strong> Fayl turi to‘g‘rimi?
            «Hujjat1» degan nom bilan ish stoliga saqlangan fayl bir haftadan
            keyin topilmaydi.
          </p>
        </Explain>
      )}
    </PracticeCard>
  );
}
