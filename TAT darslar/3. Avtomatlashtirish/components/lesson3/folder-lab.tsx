'use client';

import {useState} from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Folder,
  FolderPlus,
  Pencil,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

interface Node {
  id: string;
  name: string;
  children: Node[];
}

let seq = 0;
const newId = () => `f${++seq}`;

/** Ish stoli - daraxtning ildizi. */
const ROOT = (): Node => ({id: 'root', name: 'Ish stoli', children: []});

/** Berilgan id bo'yicha tugunni topadi (ildizni ham qaytaradi). */
function find(node: Node, id: string): Node | null {
  if (node.id === id) return node;
  for (const c of node.children) {
    const hit = find(c, id);
    if (hit) return hit;
  }
  return null;
}

/** Windows kabi: "Yangi papka", "Yangi papka (2)" ... */
function freeName(siblings: Node[]): string {
  const base = 'Yangi papka';
  if (!siblings.some((s) => s.name === base)) return base;
  let i = 2;
  while (siblings.some((s) => s.name === `${base} (${i})`)) i++;
  return `${base} (${i})`;
}

export function FolderLab() {
  const [root, setRoot] = useState<Node>(ROOT);
  const [path, setPath] = useState<string[]>(['root']);
  const [selected, setSelected] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [bin, setBin] = useState<string[]>([]);
  const [hint, setHint] = useState<string | null>(null);

  const currentId = path[path.length - 1];
  const current = find(root, currentId) ?? root;

  /** Daraxtni nusxalab o'zgartiradi - React holatini to'g'ri yangilash uchun. */
  const mutate = (fn: (r: Node) => void) =>
    setRoot((prev) => {
      const copy: Node = structuredClone(prev);
      fn(copy);
      return copy;
    });

  const createFolder = () => {
    const name = freeName(current.children);
    const id = newId();
    mutate((r) => {
      find(r, currentId)!.children.push({id, name, children: []});
    });
    setSelected(id);
    setRenaming(id);
    setDraft(name);
    setHint(null);
  };

  const commitRename = () => {
    const name = draft.trim();
    if (!renaming) return;
    if (!name) {
      setHint('Papka nomi bo‘sh bo‘lishi mumkin emas.');
      return;
    }
    if (/[\\/:*?"<>|]/.test(name)) {
      setHint('Windows bu belgilarga ruxsat bermaydi:  \\ / : * ? " < > |');
      return;
    }
    mutate((r) => {
      const node = find(r, renaming);
      if (node) node.name = name;
    });
    setRenaming(null);
    setHint(null);
  };

  const remove = () => {
    if (!selected) return;
    const node = find(root, selected);
    if (!node) return;
    mutate((r) => {
      const parent = find(r, path[path.length - 1])!;
      parent.children = parent.children.filter((c) => c.id !== selected);
    });
    setBin((prev) => [...prev, node.name]);
    setSelected(null);
  };

  const reset = () => {
    setRoot(ROOT());
    setPath(['root']);
    setSelected(null);
    setRenaming(null);
    setBin([]);
    setHint(null);
  };

  /* ------------------------------------------------------------- vazifalar */
  const desktop = root.children;
  const aio = desktop.find((d) => /^AIO_.+/i.test(d.name));

  const tasks = [
    {
      t: 'Ish stolida «AIO_Familiya» papkasini yarating',
      done: Boolean(aio),
    },
    {
      t: 'Uning ichida «Bemorlar» papkasini yarating',
      done: Boolean(aio?.children.some((c) => c.name.toLowerCase() === 'bemorlar')),
    },
    {
      t: 'Yana «Hisobotlar» papkasini yarating',
      done: Boolean(aio?.children.some((c) => c.name.toLowerCase() === 'hisobotlar')),
    },
    {
      t: 'Keraksiz papkani o‘chiring — u Savatchaga tushadi',
      done: bin.length > 0,
    },
  ];
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <PracticeCard
      n={1}
      Icon={FolderPlus}
      title="Windows: papka yaratish va nom berish"
      lead="Ish o‘rnini tartibga solish kompyuterdagi ishning birinchi qadami. Quyidagi oyna haqiqiy Windows papkalari kabi ishlaydi — to‘rt vazifani bajaring."
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-fg-subtle">Bajarilgan vazifa</p>
        <StepPill done={doneCount} total={tasks.length} />
      </div>

      {/* vazifalar ro'yxati */}
      <ul className="mb-4 space-y-1.5">
        {tasks.map((t, i) => (
          <li
            key={t.t}
            className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm ${
              t.done
                ? 'border-emerald-edge bg-emerald-tint text-emerald-ink font-bold'
                : 'border-line bg-subtle text-fg-muted'
            }`}
          >
            {t.done ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <span className="grid h-4 w-4 shrink-0 place-items-center rounded border border-line text-[10px] font-black">
                {i + 1}
              </span>
            )}
            {t.t}
          </li>
        ))}
      </ul>

      {/* ===================== soxta Windows oynasi ===================== */}
      <div className="overflow-hidden rounded-2xl border-2 border-line bg-surface">
        {/* sarlavha */}
        <div className="flex items-center gap-2 border-b border-line bg-subtle px-4 py-2.5">
          <Folder className="h-4 w-4 text-amber-ink" />
          <span className="text-sm font-bold text-fg">{current.name}</span>
        </div>

        {/* asboblar paneli */}
        <div className="flex flex-wrap gap-2 border-b border-line bg-surface px-3 py-2.5">
          <button
            type="button"
            onClick={createFolder}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-teal-edge bg-teal-tint px-3 py-1.5 text-xs font-bold text-teal-ink transition-colors hover:bg-teal-tint-strong"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            Yangi papka
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={() => {
              const node = find(root, selected!);
              setRenaming(selected);
              setDraft(node?.name ?? '');
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg-muted transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pencil className="h-3.5 w-3.5" />
            Nomini o‘zgartirish
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={remove}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-rose-edge bg-rose-tint px-3 py-1.5 text-xs font-bold text-rose-ink transition-colors hover:bg-rose-tint-strong disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            O‘chirish
          </button>
        </div>

        {/* manzil qatori */}
        <div className="flex flex-wrap items-center gap-1 border-b border-line bg-subtle px-4 py-2 text-xs font-bold text-fg-muted">
          {path.map((id, i) => {
            const node = find(root, id);
            return (
              <span key={id} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 text-fg-subtle" />}
                <button
                  type="button"
                  onClick={() => {
                    setPath(path.slice(0, i + 1));
                    setSelected(null);
                  }}
                  className="cursor-pointer rounded px-1 py-0.5 transition-colors hover:bg-surface hover:text-teal-ink"
                >
                  {node?.name}
                </button>
              </span>
            );
          })}
        </div>

        {/* papka ichi */}
        <div className="min-h-[150px] p-4">
          {current.children.length === 0 ? (
            <p className="py-10 text-center text-sm text-fg-subtle">
              Bu papka bo‘sh. «Yangi papka» tugmasini bosing.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {current.children.map((c) => {
                const isSel = selected === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    onDoubleClick={() => {
                      setPath([...path, c.id]);
                      setSelected(null);
                    }}
                    className={`cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                      isSel
                        ? 'border-teal-500 bg-teal-tint'
                        : 'border-transparent hover:border-line hover:bg-subtle'
                    }`}
                  >
                    <Folder className="mx-auto h-9 w-9 text-amber-ink" />
                    {renaming === c.id ? (
                      <input
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onBlur={commitRename}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') commitRename();
                          if (e.key === 'Escape') setRenaming(null);
                        }}
                        className="mt-2 w-full rounded border border-teal-500 bg-surface px-1.5 py-1 text-center text-xs text-fg outline-none"
                      />
                    ) : (
                      <p className="mt-2 break-words text-xs font-bold text-fg">
                        {c.name}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* savatcha */}
        <div className="flex items-center gap-2 border-t border-line bg-subtle px-4 py-2.5 text-xs font-bold text-fg-muted">
          <Trash2 className="h-3.5 w-3.5" />
          Savatcha: {bin.length === 0 ? 'bo‘sh' : bin.join(', ')}
        </div>
      </div>

      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-5 py-2.5 text-sm font-bold text-fg-muted transition-colors hover:bg-surface"
      >
        <RotateCcw className="h-4 w-4" />
        Boshidan
      </button>

      {hint && (
        <Explain title="Windows ruxsat bermadi" tone="rose">
          <p>{hint}</p>
        </Explain>
      )}

      {doneCount === tasks.length ? (
        <Explain title="Barcha vazifalar bajarildi" tone="emerald">
          <p>
            Xuddi shu tartibda haqiqiy kompyuterda ham ishlaysiz: bo‘sh joyda
            o‘ng tugma → «Yaratish» → «Papka», so‘ng nom yoziladi. Papkani ochish
            uchun chap tugma ikki marta bosiladi. O‘chirilgan papka avval
            Savatchaga tushadi — u yerdan qaytarish mumkin.
          </p>
        </Explain>
      ) : (
        <Explain title="Qanday ishlaydi" tone="amber">
          <p>
            <strong>Yangi papka</strong> tugmasi papka yaratadi va darhol nom
            so‘raydi (Enter bilan tasdiqlanadi). Papkani <strong>bir marta</strong>{' '}
            bosish — tanlaydi, <strong>ikki marta</strong> bosish — ichiga
            kiritadi. Yuqoridagi manzil qatoridan orqaga qaytasiz.
          </p>
        </Explain>
      )}
    </PracticeCard>
  );
}
