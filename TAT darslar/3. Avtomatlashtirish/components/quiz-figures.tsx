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
  teal: 'var(--teal-ink)',
  tealFill: 'var(--teal-tint-strong)',
  tealEdge: 'var(--teal-edge)',
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

/* ------------------------------------------- 1. avtomatlashtirilgan o'rin -- */
function ArmDesk() {
  return (
    <Frame
      label="Hamshiraning avtomatlashtirilgan ishchi o'rni: kompyuter, printer, skaner, UPS"
      viewBox="0 0 320 130"
    >
      {/* stol */}
      <rect x={10} y={96} width={300} height={7} rx={3.5} fill={C.line} />

      {/* monitor */}
      <rect x={104} y={20} width={104} height={62} rx={8} fill={C.tealFill} stroke={C.teal} strokeWidth={2} />
      <rect x={114} y={30} width={58} height={6} rx={3} fill={C.teal} opacity={0.75} />
      <rect x={114} y={42} width={80} height={5} rx={2.5} fill={C.teal} opacity={0.45} />
      <rect x={114} y={53} width={70} height={5} rx={2.5} fill={C.teal} opacity={0.45} />
      <rect x={114} y={64} width={44} height={5} rx={2.5} fill={C.teal} opacity={0.45} />
      <rect x={150} y={82} width={12} height={10} fill={C.line} />
      <rect x={134} y={90} width={44} height={6} rx={3} fill={C.line} />
      <text x={156} y={14} textAnchor="middle" fill={C.teal} fontSize={10} fontWeight={800}>
        Elektron tibbiy karta
      </text>

      {/* printer */}
      <rect x={222} y={56} width={68} height={30} rx={6} fill={C.blueFill} stroke={C.blue} strokeWidth={1.8} />
      <rect x={238} y={40} width={36} height={16} rx={2} fill={C.surface} stroke={C.blue} strokeWidth={1.4} />
      <rect x={238} y={78} width={36} height={4} rx={2} fill={C.blue} />
      <text x={256} y={100} textAnchor="middle" fill={C.blue} fontSize={9.5} fontWeight={800}>
        printer
      </text>

      {/* shtrix-kod skaneri */}
      <rect x={18} y={54} width={62} height={26} rx={6} fill={C.purpleFill} stroke={C.purple} strokeWidth={1.8} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={28 + i * 8} y={60} width={i % 2 ? 2 : 3.5} height={14} fill={C.purple} />
      ))}
      <text x={49} y={100} textAnchor="middle" fill={C.purple} fontSize={9.5} fontWeight={800}>
        skaner
      </text>

      {/* UPS */}
      <rect x={286} y={104} width={24} height={22} rx={4} fill={C.amberFill} stroke={C.amber} strokeWidth={1.6} />
      <path d="M299 108 l-5 8 h5 l-2 7" fill="none" stroke={C.amber} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <text x={252} y={120} textAnchor="end" fill={C.subtle} fontSize={9} fontWeight={700}>
        UPS (uzluksiz quvvat)
      </text>
    </Frame>
  );
}

/* -------------------------------------------------- 2. bemor ma'lumot oqimi */
function DataFlow() {
  const nodes = [
    {t: 'Registratura', c: C.blue, f: C.blueFill},
    {t: 'Shifokor', c: C.teal, f: C.tealFill},
    {t: 'Laboratoriya', c: C.purple, f: C.purpleFill},
    {t: 'Hamshira', c: C.emerald, f: C.emeraldFill},
  ];
  return (
    <Frame
      label="Bemor ma'lumoti yagona bazada: registratura, shifokor, laboratoriya, hamshira"
      viewBox="0 0 320 120"
    >
      {nodes.map((n, i) => {
        const x = 6 + i * 79;
        return (
          <g key={n.t}>
            <rect x={x} y={16} width={68} height={34} rx={8} fill={n.f} stroke={n.c} strokeWidth={1.8} />
            <text x={x + 34} y={37} textAnchor="middle" fill={n.c} fontSize={9.5} fontWeight={800}>
              {n.t}
            </text>
            <path d={`M${x + 34} 50 v18`} stroke={C.line} strokeWidth={1.8} />
            {i < nodes.length - 1 && (
              <path
                d={`M${x + 70} 33 h7 m0 0 l-4 -3 m4 3 l-4 3`}
                fill="none"
                stroke={C.subtle}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </g>
        );
      })}

      {/* yagona baza */}
      <rect x={40} y={68} width={240} height={34} rx={9} fill={C.plate} stroke={C.teal} strokeWidth={2} />
      <ellipse cx={68} cy={78} rx={13} ry={5} fill={C.tealFill} stroke={C.teal} strokeWidth={1.5} />
      <path d="M55 78 v10 a13 5 0 0 0 26 0 v-10" fill="none" stroke={C.teal} strokeWidth={1.5} />
      <text x={180} y={90} textAnchor="middle" fill={C.teal} fontSize={11} fontWeight={800}>
        Yagona tibbiy axborot bazasi
      </text>
    </Frame>
  );
}

/* ---------------------------------------------- 3. qog'oz va elektron karta */
function PaperVsDigital() {
  return (
    <Frame label="Qog'oz arxiv va elektron tibbiy karta taqqoslamasi" viewBox="0 0 320 120">
      {/* qog'oz */}
      <rect x={8} y={12} width={140} height={96} rx={10} fill={C.roseFill} stroke={C.rose} strokeWidth={1.8} />
      <text x={78} y={30} textAnchor="middle" fill={C.rose} fontSize={10.5} fontWeight={800}>
        Qog‘oz arxiv
      </text>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={22 + c * 28}
            y={40 + r * 20}
            width={22}
            height={15}
            rx={2}
            fill={C.surface}
            stroke={C.rose}
            strokeWidth={1.2}
          />
        )),
      )}
      <text x={78} y={104} textAnchor="middle" fill={C.rose} fontSize={9} fontWeight={700}>
        qidirish uzoq • yo‘qoladi
      </text>

      {/* elektron */}
      <rect x={172} y={12} width={140} height={96} rx={10} fill={C.emeraldFill} stroke={C.emerald} strokeWidth={1.8} />
      <text x={242} y={30} textAnchor="middle" fill={C.emerald} fontSize={10.5} fontWeight={800}>
        Elektron karta
      </text>
      <rect x={192} y={40} width={100} height={38} rx={6} fill={C.surface} stroke={C.emerald} strokeWidth={1.4} />
      <circle cx={206} cy={52} r={5} fill="none" stroke={C.emerald} strokeWidth={1.8} />
      <path d="M210 56 l6 6" stroke={C.emerald} strokeWidth={1.8} strokeLinecap="round" />
      <rect x={222} y={48} width={58} height={5} rx={2.5} fill={C.emerald} opacity={0.5} />
      <rect x={200} y={64} width={80} height={5} rx={2.5} fill={C.emerald} opacity={0.35} />
      <text x={242} y={104} textAnchor="middle" fill={C.emerald} fontSize={9} fontWeight={700}>
        soniyada topiladi • nusxasi bor
      </text>
    </Frame>
  );
}

/* --------------------------------------------------- 4. papka tuzilmasi --- */
function FolderTree() {
  return (
    <Frame label="Papka ichida papka: AIO_Familiya, Bemorlar, Hisobotlar" viewBox="0 0 320 120">
      {/* ota papka */}
      <path
        d="M14 22 h30 l8 8 h56 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-94 a6 6 0 0 1 -6 -6 v-34 a6 6 0 0 1 6 -6 z"
        fill={C.amberFill}
        stroke={C.amber}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <text x={61} y={53} textAnchor="middle" fill={C.amber} fontSize={10.5} fontWeight={800}>
        AIO_Familiya
      </text>

      {/* shoxlar */}
      <path d="M120 51 h20 v-16" fill="none" stroke={C.line} strokeWidth={1.8} />
      <path d="M120 51 h20 v28" fill="none" stroke={C.line} strokeWidth={1.8} />

      {/* ichki papka 1 */}
      <path
        d="M146 18 h22 l6 6 h48 a5 5 0 0 1 5 5 v18 a5 5 0 0 1 -5 5 h-76 a5 5 0 0 1 -5 -5 v-24 a5 5 0 0 1 5 -5 z"
        fill={C.tealFill}
        stroke={C.teal}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <text x={184} y={40} textAnchor="middle" fill={C.teal} fontSize={10} fontWeight={800}>
        Bemorlar
      </text>

      {/* ichki papka 2 */}
      <path
        d="M146 62 h22 l6 6 h48 a5 5 0 0 1 5 5 v18 a5 5 0 0 1 -5 5 h-76 a5 5 0 0 1 -5 -5 v-24 a5 5 0 0 1 5 -5 z"
        fill={C.purpleFill}
        stroke={C.purple}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <text x={184} y={84} textAnchor="middle" fill={C.purple} fontSize={10} fontWeight={800}>
        Hisobotlar
      </text>

      {/* ichidagi fayl */}
      <path d="M232 40 h18" fill="none" stroke={C.line} strokeWidth={1.8} />
      <path
        d="M254 22 h16 l7 7 v22 a5 5 0 0 1 -5 5 h-18 a5 5 0 0 1 -5 -5 v-24 a5 5 0 0 1 5 -5 z"
        fill={C.blueFill}
        stroke={C.blue}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <text x={265} y={68} textAnchor="middle" fill={C.blue} fontSize={8.5} fontWeight={800} fontFamily={MONO}>
        .docx
      </text>

      <text x={160} y={112} textAnchor="middle" fill={C.subtle} fontSize={9.5} fontWeight={700}>
        {'tartib = keraklisini tez topish'}
      </text>
    </Frame>
  );
}

/* -------------------------------------------------- 4b. saqlash oynasi ---- */
function SaveDialog() {
  return (
    <Frame label="Saqlash oynasi: papka, fayl nomi va fayl turi" viewBox="0 0 320 125">
      <rect x={8} y={8} width={304} height={108} rx={10} fill={C.plate} stroke={C.line} strokeWidth={2} />
      <rect x={8} y={8} width={304} height={22} rx={10} fill={C.tealFill} stroke={C.teal} strokeWidth={1.4} />
      <rect x={8} y={22} width={304} height={8} fill={C.tealFill} />
      <text x={22} y={24} fill={C.teal} fontSize={10} fontWeight={800}>
        Saqlash
      </text>

      {/* chap: papkalar */}
      <rect x={18} y={38} width={92} height={68} rx={6} fill={C.surface} stroke={C.line} strokeWidth={1.2} />
      {['Ish stoli', 'AIO_Familiya', 'Bemorlar'].map((t, i) => (
        <g key={t}>
          {i === 2 && (
            <rect x={22} y={70 + 0} width={84} height={14} rx={3} fill={C.tealFill} />
          )}
          <text
            x={28 + i * 8}
            y={54 + i * 16}
            fill={i === 2 ? C.teal : C.muted}
            fontSize={8.5}
            fontWeight={i === 2 ? 800 : 700}
          >
            {t}
          </text>
        </g>
      ))}

      {/* o'ng: nom va tur */}
      <text x={124} y={52} fill={C.subtle} fontSize={8.5} fontWeight={800}>
        Fayl nomi
      </text>
      <rect x={124} y={56} width={172} height={16} rx={4} fill={C.surface} stroke={C.teal} strokeWidth={1.4} />
      <text x={131} y={67} fill={C.fg} fontSize={9} fontWeight={700} fontFamily={MONO}>
        Kundalik_Familiya
      </text>

      <text x={124} y={86} fill={C.subtle} fontSize={8.5} fontWeight={800}>
        Fayl turi
      </text>
      <rect x={124} y={90} width={56} height={16} rx={4} fill={C.surface} stroke={C.line} strokeWidth={1.2} />
      <text x={131} y={101} fill={C.blue} fontSize={9} fontWeight={800} fontFamily={MONO}>
        .docx
      </text>

      <rect x={240} y={90} width={56} height={16} rx={5} fill={C.teal} />
      <text x={268} y={101} textAnchor="middle" fill={C.surface} fontSize={9} fontWeight={800}>
        Saqlash
      </text>
    </Frame>
  );
}

/* ---------------------------------------------------- 5. kirish huquqlari -- */
function AccessRoles() {
  const rows = [
    {r: 'Shifokor', a: 'tashxis, tayinlov', c: C.teal, f: C.tealFill},
    {r: 'Hamshira', a: 'ko‘rsatkich, muolaja', c: C.emerald, f: C.emeraldFill},
    {r: 'Registrator', a: 'faqat shaxsiy ma’lumot', c: C.blue, f: C.blueFill},
  ];
  return (
    <Frame label="Har bir xodim faqat o'z vazifasiga tegishli ma'lumotni ko'radi" viewBox="0 0 320 120">
      {/* qulf */}
      <rect x={8} y={40} width={44} height={36} rx={7} fill={C.amberFill} stroke={C.amber} strokeWidth={2} />
      <path d="M20 40 v-8 a10 10 0 0 1 20 0 v8" fill="none" stroke={C.amber} strokeWidth={2.4} />
      <circle cx={30} cy={56} r={4} fill={C.amber} />
      <path d="M30 60 v7" stroke={C.amber} strokeWidth={2.2} strokeLinecap="round" />
      <text x={30} y={92} textAnchor="middle" fill={C.amber} fontSize={9} fontWeight={800}>
        login / parol
      </text>

      {rows.map((row, i) => {
        const y = 12 + i * 34;
        return (
          <g key={row.r}>
            <path d={`M56 58 C 74 58, 74 ${y + 15}, 92 ${y + 15}`} fill="none" stroke={C.line} strokeWidth={1.6} />
            <rect x={92} y={y} width={220} height={28} rx={7} fill={row.f} stroke={row.c} strokeWidth={1.6} />
            <text x={104} y={y + 18} fill={row.c} fontSize={10.5} fontWeight={800}>
              {row.r}
            </text>
            <text x={302} y={y + 18} textAnchor="end" fill={row.c} fontSize={9.5} fontWeight={700}>
              {row.a}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

/* -------------------------------------------------- 6. elektron tibbiy karta */
function EhrCard() {
  return (
    <Frame label="Elektron tibbiy karta oynasi va allergiya qatori" viewBox="0 0 320 130">
      <rect x={8} y={10} width={304} height={110} rx={10} fill={C.plate} stroke={C.line} strokeWidth={2} />
      <rect x={8} y={10} width={304} height={24} rx={10} fill={C.tealFill} stroke={C.teal} strokeWidth={1.5} />
      <rect x={8} y={26} width={304} height={8} fill={C.tealFill} />
      <text x={22} y={27} fill={C.teal} fontSize={10.5} fontWeight={800}>
        Elektron tibbiy karta № 10427
      </text>

      {[
        {l: 'F.I.Sh.', v: 'Karimov A. S.'},
        {l: 'Tug‘ilgan sana', v: '1978'},
        {l: 'Qon bosimi', v: '120/80'},
      ].map((row, i) => (
        <g key={row.l}>
          <text x={22} y={52 + i * 17} fill={C.subtle} fontSize={9.5} fontWeight={700}>
            {row.l}
          </text>
          <rect x={110} y={42 + i * 17} width={190} height={13} rx={3} fill={C.surface} stroke={C.line} strokeWidth={1} />
          <text x={118} y={52 + i * 17} fill={C.fg} fontSize={9.5} fontWeight={700} fontFamily={MONO}>
            {row.v}
          </text>
        </g>
      ))}

      {/* allergiya - bo'sh va ogohlantirilgan */}
      <text x={22} y={103} fill={C.rose} fontSize={9.5} fontWeight={800}>
        Allergiya
      </text>
      <rect x={110} y={93} width={190} height={13} rx={3} fill={C.roseFill} stroke={C.rose} strokeWidth={1.4} />
      <text x={118} y={103} fill={C.rose} fontSize={9} fontWeight={800}>
        to‘ldirilmagan!
      </text>
      <path d="M295 96 v5" stroke={C.rose} strokeWidth={2} strokeLinecap="round" />
      <circle cx={295} cy={104} r={1.6} fill={C.rose} />
    </Frame>
  );
}

export const QUIZ_FIGURES = {
  armDesk: ArmDesk,
  dataFlow: DataFlow,
  paperVsDigital: PaperVsDigital,
  folderTree: FolderTree,
  saveDialog: SaveDialog,
  accessRoles: AccessRoles,
  ehrCard: EhrCard,
} as const;

export type FigureKey = keyof typeof QUIZ_FIGURES;

export function QuizFigure({name}: {name?: FigureKey}) {
  return null;
}
