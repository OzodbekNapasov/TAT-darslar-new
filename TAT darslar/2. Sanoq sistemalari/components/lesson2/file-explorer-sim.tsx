'use client';

import {useState} from 'react';
import {
  ChevronRight,
  ClipboardPaste,
  Copy,
  FileText,
  FolderClosed,
  FolderPlus,
  Home,
  Image as ImageIcon,
  RotateCcw,
  Trash2,
  Undo2,
} from 'lucide-react';
import {Explain, PracticeCard, StepPill} from './ui';

type Kind = 'folder' | 'doc' | 'img';

interface Node {
  id: string;
  name: string;
  kind: Kind;
  size: string;
  /** 'root' | folder id | 'trash' */
  parent: string;
  /** where it came from, so Savatcha can put it back */
  origin?: string;
}

const START: Node[] = [
  {id: 'f-lab', name: 'Laboratoriya', kind: 'folder', size: '—', parent: 'root'},
  {id: 'd-kundalik', name: 'Kundalik.docx', kind: 'doc', size: '48 KB', parent: 'root'},
  {id: 'd-epikriz', name: 'Epikriz.docx', kind: 'doc', size: '62 KB', parent: 'root'},
  {id: 'i-rentgen', name: 'Rentgen.jpg', kind: 'img', size: '8 MB', parent: 'root'},
  {id: 'd-eski', name: 'Eski qoralama.txt', kind: 'doc', size: '2 KB', parent: 'root'},
];

const ICONS: Record<Kind, typeof FileText> = {
  folder: FolderClosed,
  doc: FileText,
  img: ImageIcon,
};

const TASKS = [
  '“Bemorlar” nomli yangi papka yarating',
  '“Kundalik.docx” faylidan nusxa olib, “Bemorlar” papkasiga joylashtiring',
  '“Eski qoralama.txt” faylini o‘chiring (Savatchaga tushadi)',
  'Savatchaga kirib, o‘chirilgan faylni qaytaring',
];

/** Defined at module level so it is not remounted on every parent render. */
function Btn({
  onClick,
  Icon,
  children,
}: {
  onClick: () => void;
  Icon: typeof Copy;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg-muted transition-all hover:border-blue-edge hover:bg-blue-tint hover:text-blue-ink sm:text-[13px]"
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </button>
  );
}

export function FileExplorerSim() {
  const [nodes, setNodes] = useState<Node[]>(START);
  const [cwd, setCwd] = useState('root');
  const [selected, setSelected] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState<string | null>(null);
  const [msg, setMsg] = useState(
    'Fayl ustiga bir marta bosib tanlang, so‘ng yuqoridagi buyruqlardan foydalaning.',
  );
  const [tone, setTone] = useState<'blue' | 'emerald' | 'amber' | 'rose'>('blue');
  const [done, setDone] = useState<boolean[]>([false, false, false, false]);

  const visible = nodes.filter((n) => n.parent === cwd);
  const sel = nodes.find((n) => n.id === selected && n.parent === cwd) ?? null;
  const inTrash = cwd === 'trash';
  const folderName =
    cwd === 'root'
      ? 'Hujjatlar'
      : cwd === 'trash'
        ? 'Savatcha'
        : (nodes.find((n) => n.id === cwd)?.name ?? '—');

  const mark = (i: number) =>
    setDone((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));

  const say = (t: string, k: typeof tone = 'blue') => {
    setMsg(t);
    setTone(k);
  };

  function newFolder() {
    if (inTrash) return say('Savatcha ichida papka yaratib bo‘lmaydi.', 'amber');
    if (nodes.some((n) => n.name === 'Bemorlar' && n.parent === cwd)) {
      return say('“Bemorlar” papkasi bu yerda allaqachon mavjud.', 'amber');
    }
    setNodes((p) => [
      ...p,
      {id: `f-${Date.now()}`, name: 'Bemorlar', kind: 'folder', size: '—', parent: cwd},
    ]);
    mark(0);
    say(
      'Papka yaratildi. Haqiqiy kompyuterda: bo‘sh joyda o‘ng tugma → “Создать / New” → “Папка / Folder”, so‘ng nom yoziladi.',
      'emerald',
    );
  }

  function copy() {
    if (!sel) return say('Avval nusxa olinadigan faylni tanlang.', 'amber');
    if (sel.kind === 'folder') return say('Bu mashqda faqat fayldan nusxa olamiz.', 'amber');
    setClipboard(sel.id);
    say(`“${sel.name}” nusxa olindi (Ctrl+C). Endi papkaga kirib, joylashtiring.`, 'blue');
  }

  function paste() {
    if (!clipboard) return say('Avval biror fayldan nusxa oling.', 'amber');
    const src = nodes.find((n) => n.id === clipboard);
    if (!src) return;
    if (src.parent === cwd) {
      return say('Fayl allaqachon shu papkada. Boshqa papkaga kiring.', 'amber');
    }
    setNodes((p) => [...p, {...src, id: `${src.id}-c${Date.now()}`, parent: cwd}]);
    if (folderName === 'Bemorlar' && src.id === 'd-kundalik') mark(1);
    say(
      `“${src.name}” shu papkaga joylashtirildi (Ctrl+V). Asl nusxa joyida qoldi — bu ko‘chirish emas, nusxalash.`,
      'emerald',
    );
  }

  function remove() {
    if (!sel) return say('Avval o‘chiriladigan faylni tanlang.', 'amber');
    if (inTrash) return say('Savatchadagi faylni qaytarish uchun “Qaytarish” tugmasi bor.', 'amber');
    setNodes((p) =>
      p.map((n) => (n.id === sel.id ? {...n, parent: 'trash', origin: n.parent} : n)),
    );
    setSelected(null);
    if (sel.id === 'd-eski') mark(2);
    say(
      `“${sel.name}” Savatchaga tushdi. U hali butunlay o‘chmagan — kerak bo‘lsa qaytarish mumkin.`,
      'rose',
    );
  }

  function restore() {
    if (!sel) return say('Savatchada qaytariladigan faylni tanlang.', 'amber');
    setNodes((p) =>
      p.map((n) => (n.id === sel.id ? {...n, parent: n.origin ?? 'root', origin: undefined} : n)),
    );
    setSelected(null);
    mark(3);
    say(`“${sel.name}” o‘z joyiga qaytarildi. Shuning uchun Savatchani o‘ylamay tozalash xavfli.`, 'emerald');
  }

  function reset() {
    setNodes(START);
    setCwd('root');
    setSelected(null);
    setClipboard(null);
    setDone([false, false, false, false]);
    say('Mashq boshidan boshlandi.', 'blue');
  }

  return (
    <PracticeCard
      n={3}
      Icon={FolderClosed}
      title="Fayl va papkalar bilan ishlash"
      lead="Bemor hujjatlari tartibsiz yotmasligi uchun ularni papkalarga joylash kerak. Quyidagi 4 ta vazifani bajaring — bu haqiqiy kompyuterdagi amallarning aynan o‘zi."
    >
      {/* task list */}
      <ol className="mb-4 space-y-2">
        {TASKS.map((t, i) => (
          <li
            key={t}
            className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 text-sm ${
              done[i]
                ? 'border-emerald-edge bg-emerald-tint text-emerald-ink'
                : 'border-line bg-subtle text-fg-muted'
            }`}
          >
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md text-[11px] font-black ${
                done[i]
                  ? 'bg-emerald-ink text-white'
                  : 'border border-line bg-surface text-fg-subtle'
              }`}
            >
              {done[i] ? '✓' : i + 1}
            </span>
            <span className={done[i] ? 'font-bold' : ''}>{t}</span>
          </li>
        ))}
      </ol>

      {/* explorer window */}
      <div className="overflow-hidden rounded-2xl border-2 border-line-strong bg-surface shadow-sm">
        {/* path bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-line bg-subtle px-3 py-2.5">
          <button
            type="button"
            onClick={() => {
              setCwd('root');
              setSelected(null);
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold text-fg-muted transition-colors hover:bg-blue-tint hover:text-blue-ink"
          >
            <Home className="h-3.5 w-3.5" />
            Hujjatlar
          </button>
          {cwd !== 'root' && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-fg-subtle" />
              <span className="rounded-md bg-blue-tint-strong px-2 py-1 text-xs font-bold text-blue-ink">
                {folderName}
              </span>
            </>
          )}
          <span className="ml-auto flex items-center gap-2">
            <StepPill done={done.filter(Boolean).length} total={4} />
          </span>
        </div>

        {/* toolbar */}
        <div className="flex flex-wrap gap-2 border-b border-line px-3 py-2.5">
          <Btn onClick={newFolder} Icon={FolderPlus}>
            Yangi papka
          </Btn>
          <Btn onClick={copy} Icon={Copy}>
            Nusxalash
          </Btn>
          <Btn onClick={paste} Icon={ClipboardPaste}>
            Joylashtirish
          </Btn>
          <Btn onClick={remove} Icon={Trash2}>
            O‘chirish
          </Btn>
          <button
            type="button"
            onClick={() => {
              setCwd('trash');
              setSelected(null);
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-rose-edge bg-rose-tint px-3 py-1.5 text-xs font-bold text-rose-ink transition-colors hover:bg-rose-tint-strong sm:text-[13px]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Savatcha ({nodes.filter((n) => n.parent === 'trash').length})
          </button>
          {inTrash && (
            <Btn onClick={restore} Icon={Undo2}>
              Qaytarish
            </Btn>
          )}
        </div>

        {/* file list */}
        <div className="min-h-[188px] p-3">
          {visible.length === 0 ? (
            <p className="py-12 text-center text-sm font-medium text-fg-subtle">
              {inTrash ? 'Savatcha bo‘sh' : 'Bu papka bo‘sh'}
            </p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {visible.map((n) => {
                const Icon = ICONS[n.kind];
                const isSel = selected === n.id;
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(n.id)}
                      onDoubleClick={() => {
                        if (n.kind === 'folder') {
                          setCwd(n.id);
                          setSelected(null);
                          say(
                            `“${n.name}” papkasi ochildi. Papka ikki marta bosish orqali ochiladi.`,
                            'blue',
                          );
                        }
                      }}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition-all ${
                        isSel
                          ? 'border-blue-500 bg-blue-tint'
                          : 'border-transparent bg-subtle hover:border-blue-edge'
                      }`}
                    >
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                          n.kind === 'folder'
                            ? 'bg-amber-tint-strong text-amber-ink'
                            : n.kind === 'img'
                              ? 'bg-purple-tint-strong text-purple-ink'
                              : 'bg-blue-tint-strong text-blue-ink'
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-fg">
                          {n.name}
                        </span>
                        <span className="block text-xs font-semibold text-fg-subtle">
                          {n.kind === 'folder' ? 'Papka — ochish uchun 2 marta bosing' : n.size}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-subtle px-4 py-2 text-sm font-bold text-fg-muted transition-colors hover:border-blue-edge hover:text-blue-ink"
        >
          <RotateCcw className="h-4 w-4" />
          Boshidan
        </button>
        {sel && (
          <span className="text-xs font-bold text-fg-subtle">
            Tanlangan: <span className="text-blue-ink">{sel.name}</span>
          </span>
        )}
      </div>

      <Explain title="Nima sodir bo‘ldi" tone={tone}>
        <p>{msg}</p>
        {done.every(Boolean) && (
          <p className="mt-2 font-bold">
            Barcha 4 ta vazifa bajarildi — endi bemor hujjatlarini kompyuterda
            tartibli saqlashni bilasiz.
          </p>
        )}
      </Explain>
    </PracticeCard>
  );
}
