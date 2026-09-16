/**
 * Illustrations shown inside quiz questions.
 *
 * They are inline SVG on purpose: no image files to lose when the offline
 * folder is copied, and they read the same design tokens as the rest of the
 * page, so they adapt to light/dark without a second copy.
 */

const C = {
  plate: 'var(--subtle)',
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
  viewBox = '0 0 320 150',
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

/* -------------------------------------------------- 1. raqamli ko'rsatkich */
function Vitals() {
  const tiles = [
    {x: 8, w: 96, top: '120/80', sub: 'mm sim. ust.', c: C.rose, f: C.roseFill, e: C.roseEdge},
    {x: 112, w: 92, top: '74', sub: 'urish/daq', c: C.blue, f: C.blueFill, e: C.blueEdge},
    {x: 212, w: 100, top: '36.6 °C', sub: 'harorat', c: C.emerald, f: C.emeraldFill, e: C.emeraldEdge},
  ];
  return (
    <Frame label="Bemor ko'rsatkichlari: qon bosimi, puls va tana harorati raqamlar bilan" viewBox="0 0 320 110">
      {tiles.map((t) => (
        <g key={t.top}>
          <rect x={t.x} y={14} width={t.w} height={74} rx={12} fill={t.f} stroke={t.e} strokeWidth={1.5} />
          <text x={t.x + t.w / 2} y={52} textAnchor="middle" fill={t.c} fontSize={22} fontWeight={800} fontFamily={MONO}>
            {t.top}
          </text>
          <text x={t.x + t.w / 2} y={72} textAnchor="middle" fill={C.subtle} fontSize={11} fontWeight={700}>
            {t.sub}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------- 2. kardiogramma */
function Ecg() {
  return (
    <Frame label="Kardiogramma: yurak ritmining grafik tasviri" viewBox="0 0 320 110">
      <rect x={6} y={8} width={308} height={94} rx={12} fill={C.plate} stroke={C.line} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1={22 + i * 38} y1={16} x2={22 + i * 38} y2={94} stroke={C.line} strokeWidth={0.8} opacity={0.5} />
      ))}
      <path
        d="M14 58 H48 l8-4 6 22 8-48 7 34 8-4 h30 l8-4 6 22 8-48 7 34 8-4 h30 l8-4 6 22 8-48 7 34 8-4 H306"
        fill="none"
        stroke={C.emerald}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  );
}

/* ---------------------------------------------------------- 3. sichqoncha */
function Mouse() {
  return (
    <Frame label="Kompyuter sichqonchasi: chap tugma, o'ng tugma va g'ildirak" viewBox="0 0 320 170">
      <rect x={104} y={12} width={112} height={146} rx={54} fill={C.plate} stroke={C.line} strokeWidth={2.5} />
      {/* left button */}
      <path d="M104 66 V50 a54 54 0 0 1 52 -38 v54 z" fill={C.blueFill} stroke={C.blue} strokeWidth={2} />
      {/* right button */}
      <path d="M216 66 V50 a54 54 0 0 0 -52 -38 v54 z" fill={C.plate} stroke={C.line} strokeWidth={2} />
      <line x1={160} y1={12} x2={160} y2={66} stroke={C.line} strokeWidth={2} />
      <line x1={104} y1={66} x2={216} y2={66} stroke={C.line} strokeWidth={2} />
      {/* wheel */}
      <rect x={152} y={26} width={16} height={30} rx={8} fill={C.amberFill} stroke={C.amber} strokeWidth={2} />

      <text x={96} y={44} textAnchor="end" fill={C.blue} fontSize={13} fontWeight={800}>Chap</text>
      <text x={96} y={60} textAnchor="end" fill={C.subtle} fontSize={11} fontWeight={700}>tanlash</text>
      <text x={224} y={44} fill={C.muted} fontSize={13} fontWeight={800}>{"O'ng"}</text>
      <text x={224} y={60} fill={C.subtle} fontSize={11} fontWeight={700}>menyu</text>
      <text x={160} y={92} textAnchor="middle" fill={C.amber} fontSize={12} fontWeight={800}>{"G'ildirak"}</text>
      <text x={160} y={108} textAnchor="middle" fill={C.subtle} fontSize={11} fontWeight={700}>varaqlash</text>
    </Frame>
  );
}

/* ----------------------------------------------------- 4. klaviatura zonalari */
function KeyboardZones() {
  const keys = (x0: number, y0: number, cols: number, rows: number, w = 15, gap = 3) =>
    Array.from({length: cols * rows}, (_, i) => (
      <rect
        key={`${x0}-${y0}-${i}`}
        x={x0 + (i % cols) * (w + gap)}
        y={y0 + Math.floor(i / cols) * (w + gap)}
        width={w}
        height={w}
        rx={3}
        fill={C.plate}
        stroke={C.line}
        strokeWidth={1}
      />
    ));

  return (
    <Frame label="Klaviatura: o'ng tomonda raqamli blok (Numpad) ajratilgan" viewBox="0 0 320 140">
      <rect x={6} y={10} width={308} height={106} rx={12} fill={C.plate} stroke={C.line} strokeWidth={2} />
      {/* alpha block */}
      {keys(18, 24, 12, 4)}
      {/* numpad highlight */}
      <rect x={240} y={18} width={66} height={90} rx={9} fill={C.blueFill} stroke={C.blue} strokeWidth={2} />
      {Array.from({length: 12}, (_, i) => (
        <rect
          key={`np-${i}`}
          x={248 + (i % 3) * 18}
          y={26 + Math.floor(i / 3) * 18}
          width={14}
          height={14}
          rx={3}
          fill="var(--surface)"
          stroke={C.blueEdge}
          strokeWidth={1}
        />
      ))}
      <text x={273} y={132} textAnchor="middle" fill={C.blue} fontSize={12} fontWeight={800}>
        Numpad
      </text>
      <text x={110} y={132} textAnchor="middle" fill={C.subtle} fontSize={12} fontWeight={700}>
        Harflar hududi
      </text>
    </Frame>
  );
}

/* --------------------------------------------------------- 5. indikatorlar */
function Leds({on = 'num'}: {on?: 'num' | 'caps' | 'scroll'}) {
  const lamps = [
    {k: 'num', label: 'Num Lock', x: 26},
    {k: 'caps', label: 'Caps Lock', x: 124},
    {k: 'scroll', label: 'Scroll Lock', x: 222},
  ] as const;

  return (
    <Frame label="Klaviatura indikator chiroqlari: Num Lock, Caps Lock, Scroll Lock" viewBox="0 0 320 110">
      <rect x={6} y={8} width={308} height={94} rx={12} fill={C.plate} stroke={C.line} strokeWidth={1.5} />
      {lamps.map((l) => {
        const lit = l.k === on;
        return (
          <g key={l.k}>
            <rect
              x={l.x - 12}
              y={24}
              width={84}
              height={62}
              rx={10}
              fill={lit ? C.emeraldFill : 'var(--surface)'}
              stroke={lit ? C.emerald : C.line}
              strokeWidth={lit ? 2 : 1.2}
            />
            <circle cx={l.x + 30} cy={46} r={9} fill={lit ? C.emerald : C.line} />
            {lit && <circle cx={l.x + 30} cy={46} r={14} fill={C.emerald} opacity={0.22} />}
            <text
              x={l.x + 30}
              y={74}
              textAnchor="middle"
              fill={lit ? C.emerald : C.subtle}
              fontSize={11}
              fontWeight={800}
            >
              {l.label}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------ 6. qurilmalar */
function Devices() {
  return (
    <Frame label="Kompyuter qurilmalari: monitor, tizim bloki, klaviatura va sichqoncha" viewBox="0 0 320 150">
      {/* monitor */}
      <rect x={16} y={12} width={150} height={94} rx={10} fill={C.plate} stroke={C.line} strokeWidth={2.5} />
      <rect x={26} y={22} width={130} height={74} rx={6} fill={C.blueFill} stroke={C.blueEdge} strokeWidth={1.5} />
      <rect x={78} y={106} width={26} height={14} fill={C.line} />
      <rect x={56} y={120} width={70} height={7} rx={3.5} fill={C.line} />
      <text x={91} y={64} textAnchor="middle" fill={C.blue} fontSize={12} fontWeight={800}>Monitor</text>
      <text x={91} y={80} textAnchor="middle" fill={C.subtle} fontSize={10} fontWeight={700}>chiqarish</text>

      {/* system unit */}
      <rect x={184} y={12} width={54} height={115} rx={9} fill={C.plate} stroke={C.line} strokeWidth={2.5} />
      <circle cx={211} cy={30} r={6} fill={C.emerald} />
      <rect x={194} y={46} width={34} height={5} rx={2.5} fill={C.line} />
      <rect x={194} y={58} width={34} height={5} rx={2.5} fill={C.line} />
      <text x={211} y={144} textAnchor="middle" fill={C.subtle} fontSize={10} fontWeight={700}>Tizim bloki</text>

      {/* keyboard + mouse */}
      <rect x={252} y={78} width={56} height={30} rx={6} fill={C.plate} stroke={C.line} strokeWidth={2} />
      {Array.from({length: 12}, (_, i) => (
        <rect key={i} x={257 + (i % 6) * 8} y={84 + Math.floor(i / 6) * 9} width={6} height={6} rx={1.5} fill={C.line} />
      ))}
      <rect x={272} y={116} width={16} height={22} rx={8} fill={C.plate} stroke={C.line} strokeWidth={2} />
      <text x={280} y={70} textAnchor="middle" fill={C.subtle} fontSize={10} fontWeight={700}>kiritish</text>
    </Frame>
  );
}

/* ------------------------------------------------------- 7. idrok a'zolari */
function Senses() {
  return (
    <Frame label="Axborotni qabul qilish: ko'rish, eshitish va sezish" viewBox="0 0 320 120">
      {/* eye */}
      <g>
        <rect x={10} y={12} width={92} height={92} rx={14} fill={C.blueFill} stroke={C.blue} strokeWidth={2} />
        <path d="M28 54 q28 -24 56 0 q-28 24 -56 0 z" fill="var(--surface)" stroke={C.blue} strokeWidth={2.4} />
        <circle cx={56} cy={54} r={10} fill={C.blue} />
        <text x={56} y={88} textAnchor="middle" fill={C.blue} fontSize={12} fontWeight={800}>{"Ko'rish"}</text>
      </g>
      {/* ear */}
      <g>
        <rect x={114} y={12} width={92} height={92} rx={14} fill={C.plate} stroke={C.line} strokeWidth={2} />
        <path d="M148 76 q-10 -8 -10 -24 a22 22 0 0 1 44 0 q0 14 -12 18 q-8 3 -8 12" fill="none" stroke={C.muted} strokeWidth={3} strokeLinecap="round" />
        <circle cx={162} cy={82} r={3.4} fill={C.muted} />
        <text x={160} y={98} textAnchor="middle" fill={C.muted} fontSize={12} fontWeight={800}>Eshitish</text>
      </g>
      {/* touch */}
      <g>
        <rect x={218} y={12} width={92} height={92} rx={14} fill={C.plate} stroke={C.line} strokeWidth={2} />
        <path d="M250 84 v-26 a6 6 0 0 1 12 0 v-14 a6 6 0 0 1 12 0 v14 a6 6 0 0 1 12 0 v26 a14 14 0 0 1 -14 14 h-8 a14 14 0 0 1 -14 -14 z" fill="none" stroke={C.muted} strokeWidth={2.6} strokeLinejoin="round" />
        <text x={264} y={30} textAnchor="middle" fill={C.muted} fontSize={12} fontWeight={800}>Sezish</text>
      </g>
    </Frame>
  );
}

/* ------------------------------------------------- 8. xavfsiz o'chirish yo'li */
function Shutdown() {
  const steps = [
    {n: '1', t: 'Saqlash', c: C.emerald, f: C.emeraldFill, e: C.emeraldEdge},
    {n: '2', t: 'Dasturlarni yopish', c: C.amber, f: C.amberFill, e: C.amberEdge},
    {n: '3', t: "Boshlash → O'chirish", c: C.blue, f: C.blueFill, e: C.blueEdge},
  ];
  return (
    <Frame label="Kompyuterni xavfsiz o'chirish tartibi: saqlash, dasturlarni yopish, tizimni o'chirish" viewBox="0 0 320 100">
      {steps.map((s, i) => {
        const x = 6 + i * 104;
        return (
          <g key={s.n}>
            <rect x={x} y={16} width={92} height={62} rx={11} fill={s.f} stroke={s.e} strokeWidth={1.6} />
            <circle cx={x + 18} cy={34} r={10} fill={s.c} />
            <text x={x + 18} y={38} textAnchor="middle" fill="var(--surface)" fontSize={11} fontWeight={800}>{s.n}</text>
            <text x={x + 46} y={62} textAnchor="middle" fill={s.c} fontSize={10.5} fontWeight={800}>{s.t}</text>
            {i < 2 && (
              <path d={`M${x + 96} 47 h6 l-3 -4 m3 4 l-3 4`} fill="none" stroke={C.subtle} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/* ----------------------------------------------------------- 9. tibbiy sir */
function MedicalSecret() {
  return (
    <Frame label="Bemor ma'lumotlari qulf bilan himoyalangan tibbiy sir" viewBox="0 0 320 120">
      <rect x={16} y={14} width={180} height={92} rx={12} fill={C.plate} stroke={C.line} strokeWidth={2} />
      <rect x={30} y={30} width={104} height={8} rx={4} fill={C.line} />
      <rect x={30} y={48} width={140} height={7} rx={3.5} fill={C.line} />
      <rect x={30} y={64} width={122} height={7} rx={3.5} fill={C.line} />
      <rect x={30} y={80} width={86} height={7} rx={3.5} fill={C.line} />
      <text x={30} y={26} fill={C.subtle} fontSize={9} fontWeight={800}>KASALLIK TARIXI</text>

      <g>
        <rect x={214} y={20} width={92} height={80} rx={14} fill={C.roseFill} stroke={C.rose} strokeWidth={2} />
        <path d="M246 56 v-9 a14 14 0 0 1 28 0 v9" fill="none" stroke={C.rose} strokeWidth={3.4} strokeLinecap="round" />
        <rect x={242} y={56} width={36} height={26} rx={6} fill={C.rose} />
        <circle cx={260} cy={68} r={3.6} fill={C.roseFill} />
        <text x={260} y={96} textAnchor="middle" fill={C.rose} fontSize={10} fontWeight={800}>Maxfiy</text>
      </g>
    </Frame>
  );
}

/* --------------------------------------------------- 10. axborot shakllari */
function InfoForms() {
  const items = [
    {t: 'Matn', d: 'Aa', c: C.blue, f: C.blueFill, e: C.blueEdge},
    {t: 'Raqam', d: '36.6', c: C.emerald, f: C.emeraldFill, e: C.emeraldEdge},
    {t: 'Tasvir', d: '▣', c: C.purple, f: C.purpleFill, e: C.purpleEdge},
    {t: 'Ovoz', d: '♪', c: C.amber, f: C.amberFill, e: C.amberEdge},
  ];
  return (
    <Frame label="Axborot shakllari: matn, raqam, tasvir va ovoz" viewBox="0 0 320 100">
      {items.map((it, i) => {
        const x = 8 + i * 78;
        return (
          <g key={it.t}>
            <rect x={x} y={14} width={68} height={66} rx={12} fill={it.f} stroke={it.e} strokeWidth={1.6} />
            <text x={x + 34} y={50} textAnchor="middle" fill={it.c} fontSize={20} fontWeight={800} fontFamily={MONO}>
              {it.d}
            </text>
            <text x={x + 34} y={70} textAnchor="middle" fill={it.c} fontSize={11} fontWeight={800}>
              {it.t}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ------------------------------------------------------------ 11. Enter key */
function EnterKey() {
  return (
    <Frame label="Klaviaturadagi Enter tugmasi" viewBox="0 0 320 100">
      <rect x={6} y={10} width={308} height={80} rx={12} fill={C.plate} stroke={C.line} strokeWidth={1.5} />
      {Array.from({length: 10}, (_, i) => (
        <rect key={i} x={20 + (i % 5) * 30} y={24 + Math.floor(i / 5) * 30} width={24} height={24} rx={5} fill="var(--surface)" stroke={C.line} strokeWidth={1.2} />
      ))}
      <rect x={182} y={24} width={116} height={54} rx={9} fill={C.emeraldFill} stroke={C.emerald} strokeWidth={2.4} />
      <path d="M270 40 v12 a5 5 0 0 1 -5 5 h-42 m0 0 l10 -8 m-10 8 l10 8" fill="none" stroke={C.emerald} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <text x={240} y={72} textAnchor="middle" fill={C.emerald} fontSize={12} fontWeight={800}>Enter</text>
    </Frame>
  );
}

export const QUIZ_FIGURES = {
  vitals: Vitals,
  ecg: Ecg,
  mouse: Mouse,
  keyboardZones: KeyboardZones,
  ledsNum: () => <Leds on="num" />,
  ledsCaps: () => <Leds on="caps" />,
  devices: Devices,
  senses: Senses,
  shutdown: Shutdown,
  medicalSecret: MedicalSecret,
  infoForms: InfoForms,
  enterKey: EnterKey,
} as const;

export type FigureKey = keyof typeof QUIZ_FIGURES;

export function QuizFigure({name}: {name?: FigureKey}) {
  return null;
}
