/**
 * Illustrations shown inside quiz questions.
 *
 * Inline SVG on purpose: no image files to lose when the offline folder is
 * copied, and they read the same design tokens as the rest of the page, so
 * they adapt to light/dark without a second copy.
 */

const C = {
  plate: 'var(--subtle)',
  surface: 'var(--surface)',
  line: 'var(--line-strong)',
  fg: 'var(--fg)',
  muted: 'var(--fg-muted)',
  subtle: 'var(--fg-subtle)',
  blue: 'var(--blue-ink)',
  blueFill: 'var(--blue-tint-strong)',
  blueEdge: 'var(--blue-edge)',
  emerald: 'var(--emerald-ink)',
  emeraldFill: 'var(--emerald-tint-strong)',
  emeraldEdge: 'var(--emerald-edge)',
  amber: 'var(--amber-ink)',
  amberFill: 'var(--amber-tint-strong)',
  amberEdge: 'var(--amber-edge)',
  rose: 'var(--rose-ink)',
  roseFill: 'var(--rose-tint-strong)',
  roseEdge: 'var(--rose-edge)',
  purple: 'var(--purple-ink)',
  purpleFill: 'var(--purple-tint-strong)',
  purpleEdge: 'var(--purple-edge)',
} as const;

const MONO =
  'ui-monospace, "Cascadia Code", "Segoe UI Mono", Consolas, monospace';

function Frame({
  label,
  children,
  viewBox = '0 0 320 120',
}: {
  label: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className="h-auto w-full max-w-md select-none"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/* ----------------------------------------------- 1. o'lchov birliklari ---- */
function UnitLadder() {
  const steps = [
    {u: 'bit', d: '0/1'},
    {u: 'bayt', d: '8 bit'},
    {u: 'KB', d: '1024 b'},
    {u: 'MB', d: '1024 KB'},
    {u: 'GB', d: '1024 MB'},
  ];
  return (
    <Frame label="O'lchov birliklari: bit, bayt, kilobayt, megabayt, gigabayt" viewBox="0 0 320 110">
      {steps.map((s, i) => {
        const x = 6 + i * 63;
        const h = 30 + i * 12;
        return (
          <g key={s.u}>
            <rect x={x} y={92 - h} width={54} height={h} rx={8} fill={C.blueFill} stroke={C.blue} strokeWidth={1.6} />
            <text x={x + 27} y={92 - h + 18} textAnchor="middle" fill={C.blue} fontSize={13} fontWeight={800} fontFamily={MONO}>
              {s.u}
            </text>
            <text x={x + 27} y={104} textAnchor="middle" fill={C.subtle} fontSize={9.5} fontWeight={700}>
              {s.d}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* --------------------------------------------------------- 2. bir bayt ---- */
function ByteBits() {
  const bits = [0, 1, 0, 0, 0, 0, 0, 1];
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  return (
    <Frame label="Bir bayt: sakkizta bit va ularning og'irliklari" viewBox="0 0 320 110">
      {bits.map((b, i) => {
        const x = 8 + i * 38;
        const on = b === 1;
        return (
          <g key={i}>
            <rect x={x} y={22} width={32} height={38} rx={7} fill={on ? C.blue : C.plate} stroke={on ? C.blue : C.line} strokeWidth={1.8} />
            <text x={x + 16} y={48} textAnchor="middle" fill={on ? C.surface : C.subtle} fontSize={17} fontWeight={800} fontFamily={MONO}>
              {b}
            </text>
            <text x={x + 16} y={74} textAnchor="middle" fill={C.subtle} fontSize={9.5} fontWeight={700} fontFamily={MONO}>
              {weights[i]}
            </text>
          </g>
        );
      })}
      <text x={160} y={98} textAnchor="middle" fill={C.muted} fontSize={11} fontWeight={700}>
        {"8 bit = 1 bayt = 1 harf"}
      </text>
      <text x={160} y={14} textAnchor="middle" fill={C.blue} fontSize={11} fontWeight={800} fontFamily={MONO}>
        {"01000001 = 65 = A"}
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------- 3. fayl turlari */
function FileKinds() {
  const items = [
    {e: '.docx', t: 'Matn', c: C.blue, f: C.blueFill, ed: C.blueEdge},
    {e: '.jpg', t: 'Tasvir', c: C.purple, f: C.purpleFill, ed: C.purpleEdge},
    {e: '.mp3', t: 'Ovoz', c: C.amber, f: C.amberFill, ed: C.amberEdge},
    {e: '.mp4', t: 'Video', c: C.rose, f: C.roseFill, ed: C.roseEdge},
  ];
  return (
    <Frame label="Fayl kengaytmalari va ular bildiradigan axborot turlari" viewBox="0 0 320 105">
      {items.map((it, i) => {
        const x = 8 + i * 78;
        return (
          <g key={it.e}>
            <path
              d={`M${x + 12} 16 h30 l14 14 v44 a6 6 0 0 1 -6 6 h-38 a6 6 0 0 1 -6 -6 v-52 a6 6 0 0 1 6 -6 z`}
              fill={it.f}
              stroke={it.c}
              strokeWidth={1.8}
              strokeLinejoin="round"
            />
            <path d={`M${x + 42} 16 v14 h14`} fill="none" stroke={it.c} strokeWidth={1.8} strokeLinejoin="round" />
            <text x={x + 34} y={58} textAnchor="middle" fill={it.c} fontSize={11} fontWeight={800} fontFamily={MONO}>
              {it.e}
            </text>
            <text x={x + 34} y={96} textAnchor="middle" fill={it.c} fontSize={11.5} fontWeight={800}>
              {it.t}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------ 4. oyna tugmalari */
function WindowButtons() {
  return (
    <Frame label="Oyna tugmalari: yig'ish, kattalashtirish va yopish" viewBox="0 0 320 120">
      <rect x={30} y={14} width={260} height={92} rx={10} fill={C.plate} stroke={C.line} strokeWidth={2} />
      <rect x={30} y={14} width={260} height={26} rx={10} fill={C.blueFill} stroke={C.blue} strokeWidth={1.6} />
      <rect x={30} y={30} width={260} height={10} fill={C.blueFill} />
      <text x={44} y={32} fill={C.blue} fontSize={11} fontWeight={800}>Bemor kartasi</text>

      {/* minimize */}
      <rect x={206} y={19} width={22} height={16} rx={4} fill={C.surface} stroke={C.blueEdge} strokeWidth={1.2} />
      <line x1={212} y1={27} x2={222} y2={27} stroke={C.blue} strokeWidth={2} strokeLinecap="round" />
      {/* maximize */}
      <rect x={232} y={19} width={22} height={16} rx={4} fill={C.surface} stroke={C.blueEdge} strokeWidth={1.2} />
      <rect x={238} y={23} width={10} height={8} fill="none" stroke={C.blue} strokeWidth={1.8} />
      {/* close */}
      <rect x={258} y={19} width={22} height={16} rx={4} fill={C.roseFill} stroke={C.rose} strokeWidth={1.2} />
      <path d="M264 23 l10 8 M274 23 l-10 8" stroke={C.rose} strokeWidth={2} strokeLinecap="round" />

      <rect x={44} y={54} width={100} height={7} rx={3.5} fill={C.line} />
      <rect x={44} y={68} width={180} height={7} rx={3.5} fill={C.line} />
      <rect x={44} y={82} width={140} height={7} rx={3.5} fill={C.line} />

      <text x={217} y={116} textAnchor="middle" fill={C.subtle} fontSize={9.5} fontWeight={700}>{"yig'ish"}</text>
      <text x={243} y={116} textAnchor="middle" fill={C.subtle} fontSize={9.5} fontWeight={700}>katta</text>
      <text x={269} y={116} textAnchor="middle" fill={C.rose} fontSize={9.5} fontWeight={800}>yopish</text>
    </Frame>
  );
}

/* --------------------------------------------------- 5. papka tuzilmasi -- */
function FolderTree() {
  return (
    <Frame label="Papka ichida papka va fayllar joylashuvi" viewBox="0 0 320 120">
      <path d="M14 20 h26 l8 8 h44 a6 6 0 0 1 6 6 v22 a6 6 0 0 1 -6 6 h-78 a6 6 0 0 1 -6 -6 v-30 a6 6 0 0 1 6 -6 z" fill={C.amberFill} stroke={C.amber} strokeWidth={1.8} strokeLinejoin="round" />
      <text x={56} y={50} textAnchor="middle" fill={C.amber} fontSize={11} fontWeight={800}>Hujjatlar</text>

      <path d="M100 46 h22 v-14" fill="none" stroke={C.line} strokeWidth={1.8} />
      <path d="M100 46 h22 v22" fill="none" stroke={C.line} strokeWidth={1.8} />

      <path d="M128 14 h20 l6 6 h34 a5 5 0 0 1 5 5 v16 a5 5 0 0 1 -5 5 h-60 a5 5 0 0 1 -5 -5 v-22 a5 5 0 0 1 5 -5 z" fill={C.amberFill} stroke={C.amber} strokeWidth={1.6} strokeLinejoin="round" />
      <text x={158} y={34} textAnchor="middle" fill={C.amber} fontSize={10} fontWeight={800}>Bemorlar</text>

      <path d="M132 58 h20 l8 8 v22 a5 5 0 0 1 -5 5 h-23 a5 5 0 0 1 -5 -5 v-25 a5 5 0 0 1 5 -5 z" fill={C.blueFill} stroke={C.blue} strokeWidth={1.6} strokeLinejoin="round" />
      <text x={146} y={102} textAnchor="middle" fill={C.blue} fontSize={9} fontWeight={800} fontFamily={MONO}>.docx</text>

      <path d="M196 46 h24" fill="none" stroke={C.line} strokeWidth={1.8} />
      <path d="M226 26 h18 l7 7 v22 a5 5 0 0 1 -5 5 h-20 a5 5 0 0 1 -5 -5 v-24 a5 5 0 0 1 5 -5 z" fill={C.purpleFill} stroke={C.purple} strokeWidth={1.6} strokeLinejoin="round" />
      <text x={239} y={72} textAnchor="middle" fill={C.purple} fontSize={9} fontWeight={800} fontFamily={MONO}>.jpg</text>
    </Frame>
  );
}

/* ------------------------------------------------------ 6. xavfsiz uzish - */
function SafeEject() {
  return (
    <Frame label="Fleshkani xavfsiz uzish belgisi" viewBox="0 0 320 110">
      <rect x={6} y={62} width={308} height={42} rx={8} fill={C.plate} stroke={C.line} strokeWidth={1.6} />
      <rect x={196} y={70} width={110} height={26} rx={7} fill={C.emeraldFill} stroke={C.emerald} strokeWidth={2} />
      <path d="M212 76 v10 a4 4 0 0 0 4 4 h4" fill="none" stroke={C.emerald} strokeWidth={2.2} strokeLinecap="round" />
      <circle cx={212} cy={74} r={3} fill={C.emerald} />
      <text x={258} y={87} textAnchor="middle" fill={C.emerald} fontSize={10} fontWeight={800}>Xavfsiz uzish</text>
      <text x={40} y={87} fill={C.subtle} fontSize={10} fontWeight={700} fontFamily={MONO}>08:30</text>

      <rect x={92} y={14} width={110} height={34} rx={8} fill={C.blueFill} stroke={C.blue} strokeWidth={1.8} />
      <rect x={100} y={24} width={16} height={14} rx={3} fill={C.blue} />
      <text x={158} y={36} textAnchor="middle" fill={C.blue} fontSize={11} fontWeight={800}>Fleshka 16 GB</text>
      <path d="M147 52 v6 l-4 -3 m4 3 l4 -3" fill="none" stroke={C.subtle} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

/* --------------------------------------------------------- 7. ergonomika - */
function Ergonomics() {
  return (
    <Frame label="To'g'ri o'tirish holati va ekrangacha bo'lgan masofa" viewBox="0 0 320 130">
      {/* desk */}
      <rect x={12} y={96} width={296} height={7} rx={3} fill={C.line} />
      {/* monitor */}
      <rect x={196} y={26} width={92} height={58} rx={7} fill={C.blueFill} stroke={C.blue} strokeWidth={2} />
      <rect x={236} y={84} width={12} height={10} fill={C.line} />
      <rect x={222} y={92} width={40} height={5} rx={2.5} fill={C.line} />
      {/* eye level line */}
      <line x1={96} y1={32} x2={288} y2={32} stroke={C.emerald} strokeWidth={1.6} strokeDasharray="5 4" />
      <text x={192} y={22} textAnchor="middle" fill={C.emerald} fontSize={9.5} fontWeight={800}>
        {"monitor yuqori qirrasi = ko'z sathi"}
      </text>
      {/* person */}
      <circle cx={92} cy={40} r={13} fill={C.plate} stroke={C.muted} strokeWidth={2} />
      <path d="M92 53 v30 M92 66 h26" fill="none" stroke={C.muted} strokeWidth={2.4} strokeLinecap="round" />
      <path d="M92 83 h-22 v20" fill="none" stroke={C.muted} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      <text x={70} y={118} textAnchor="middle" fill={C.subtle} fontSize={9} fontWeight={700}>{"tizza 90°"}</text>
      {/* distance */}
      <path d="M108 62 h82 m0 0 l-6 -4 m6 4 l-6 4 M108 62 l6 -4 m-6 4 l6 4" fill="none" stroke={C.amber} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <text x={149} y={56} textAnchor="middle" fill={C.amber} fontSize={11} fontWeight={800}>50–70 sm</text>
    </Frame>
  );
}

/* ------------------------------------------------------------- 8. xavf --- */
function Hazard() {
  return (
    <Frame label="Ho'l qo'l bilan rozetkaga tegish - elektr toki urishi xavfi" viewBox="0 0 320 120">
      <rect x={6} y={10} width={308} height={100} rx={12} fill={C.roseFill} stroke={C.rose} strokeWidth={2} />
      {/* socket */}
      <rect x={40} y={34} width={56} height={56} rx={10} fill={C.surface} stroke={C.rose} strokeWidth={2.2} />
      <circle cx={56} cy={58} r={5} fill={C.rose} />
      <circle cx={80} cy={58} r={5} fill={C.rose} />
      <path d="M56 74 h24" stroke={C.rose} strokeWidth={2.4} strokeLinecap="round" />
      {/* hand with drops */}
      <path d="M150 88 v-22 a5 5 0 0 1 10 0 v-12 a5 5 0 0 1 10 0 v12 a5 5 0 0 1 10 0 v22 a12 12 0 0 1 -12 12 h-6 a12 12 0 0 1 -12 -12 z" fill={C.surface} stroke={C.rose} strokeWidth={2.2} strokeLinejoin="round" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${196 + i * 16} ${44 + i * 8} q4 7 0 10 q-4 -3 0 -10 z`} fill={C.rose} />
      ))}
      {/* warning */}
      <path d="M266 40 l22 38 h-44 z" fill={C.surface} stroke={C.rose} strokeWidth={2.4} strokeLinejoin="round" />
      <path d="M266 54 v10" stroke={C.rose} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={266} cy={70} r={2} fill={C.rose} />
      <text x={160} y={26} textAnchor="middle" fill={C.rose} fontSize={11} fontWeight={800}>
        {"Ho'l qo'l + rozetka"}
      </text>
    </Frame>
  );
}

export const QUIZ_FIGURES = {
  unitLadder: UnitLadder,
  byteBits: ByteBits,
  fileKinds: FileKinds,
  windowButtons: WindowButtons,
  folderTree: FolderTree,
  safeEject: SafeEject,
  ergonomics: Ergonomics,
  hazard: Hazard,
} as const;

export type FigureKey = keyof typeof QUIZ_FIGURES;

export function QuizFigure({name}: {name?: FigureKey}) {
  return null;
}
