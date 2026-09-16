'use client';

import {
  Keyboard,
  Mouse,
  ShieldAlert,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Sliders,
  Eye,
  Activity,
  Maximize2,
} from 'lucide-react';
import {KeyDetector} from './key-detector';

const ZONES = [
  {
    num: '1',
    name: 'Alfavit-raqamli zona (Alphanumeric)',
    color: 'border-blue-edge bg-blue-tint/40 text-blue-ink',
    badge: 'Asosiy terish maydoni',
    desc: 'Lotin/Kirill harflari, 0–9 raqamlar, tinish belgilari (! ? , . ; :), Enter, Space, Backspace, Tab.',
    role: 'Bemor kasallik tarixi, shifokor ko‘rsatmalari va tibbiy epikrizlarni yozishda asosiy vosita.',
  },
  {
    num: '2',
    name: 'Funksional klavishlar (F1–F12)',
    color: 'border-purple-edge bg-purple-tint/40 text-purple-ink',
    badge: 'Tezkor buyruqlar',
    desc: 'F1 (Yordam / Help), F2 (Nomni o‘zgartirish), F5 (Sahifani yangilash), F11 (To‘liq ekran rejimi).',
    role: 'Tibbiy dastur oynalarini tez yangilash, to‘liq ekranga yoyish va qo‘llanmalarni ochish.',
  },
  {
    num: '3',
    name: 'Kursor boshqaruvi va tahrir',
    color: 'border-emerald-edge bg-emerald-tint/40 text-emerald-ink',
    badge: 'Navigatsiya & Tahrir',
    desc: 'Strelkalar (← ↑ ↓ →), Home (qator boshi), End (qator oxiri), Page Up, Page Down, Delete, Insert.',
    role: 'Katta jadvallar va bemorlar ro‘yxati bo‘ylab sichqonchasiz tez va aniq harakatlanish.',
  },
  {
    num: '4',
    name: 'Maxsus va modifikator klavishlar',
    color: 'border-amber-edge bg-amber-tint/40 text-amber-ink',
    badge: 'Kombinatsiyalar',
    desc: 'Ctrl, Alt, Shift, Windows (Win), Esc (Chiqish), Caps Lock, Num Lock.',
    role: 'Boshqa klavishlar bilan qo‘shilib tezkor birikmalar (Hotkeys) hosil qiladi (Ctrl+C, Ctrl+V).',
  },
  {
    num: '5',
    name: 'Raqamli blok (Numpad)',
    color: 'border-teal-edge bg-teal-tint/40 text-teal-ink',
    badge: 'Kalkulyator bloki',
    desc: 'Klaviaturaning o‘ng qismidagi raqamlar (0–9), arifmetik amallar (+, -, *, /) va Enter tugmasi.',
    role: 'Harorat, bosim, dori dozalari va laboratoriya raqamli ko‘rsatkichlarini tezkor kiritish.',
  },
];

export function TheorySection() {
  return (
    <div className="space-y-8">
      {/* 1. Klaviatura Zonalari */}
      <section className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Keyboard className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-blue-edge bg-blue-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-ink">
                1-Mavzu
              </span>
              <span className="text-xs font-semibold text-fg-muted">Klaviatura anatomiyasi</span>
            </div>
            <h2 className="mt-0.5 text-xl font-bold text-fg sm:text-2xl">
              Klaviaturaning 5 ta asosiy funksional zonasi
            </h2>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-fg-muted">
          Standart kompyuter klaviaturasi (104/105 ta tugma) axborotni kiritish va kompyuterni boshqarishning asosiy
          kirish qurilmasi hisoblanadi. U ergonomik va funksional jihatdan quyidagi 5 zonaga ajratilgan:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZONES.map((z) => (
            <div
              key={z.num}
              className="flex flex-col justify-between rounded-2xl border border-line bg-subtle p-5 transition-all hover:border-line-strong hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-black ${z.color}`}>
                    {z.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fg-subtle">
                    {z.badge}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-fg">{z.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">{z.desc}</p>
              </div>
              <div className="mt-4 border-t border-line/60 pt-3">
                <p className="text-[11px] text-fg-subtle">
                  🏥 <strong className="text-fg">Tibbiyotda:</strong> {z.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LED Indikatorlar */}
        <div className="mt-6 rounded-2xl border border-line bg-canvas p-5">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-fg">
            <Sliders className="h-4 w-4 text-blue-ink" />
            Klaviaturaning 3 ta asosiy LED indikatori
          </h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
            <div className="rounded-xl border border-line bg-surface p-3">
              <span className="font-bold text-blue-ink font-mono">1. Num Lock</span>
              <p className="mt-1 text-fg-muted text-[11px]">
                Yoniq bo‘lsa, o‘ng tarafdagi Numpad raqam yozadi; o‘chiq bo‘lsa, kursor harakatlanadi (Home, End, strelka).
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <span className="font-bold text-emerald-ink font-mono">2. Caps Lock</span>
              <p className="mt-1 text-fg-muted text-[11px]">
                Barcha kiritiladigan harflarni doimiy KATTA (bosh) harf rejimiga o‘tkazadi. Parol kiritishda ehtiyot bo‘ling.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-3">
              <span className="font-bold text-purple-ink font-mono">3. Scroll Lock</span>
              <p className="mt-1 text-fg-muted text-[11px]">
                Excel va jadvallarda kursor o‘rnini o‘zgartirmasdan butun varaqni surish rejimini yoqadi yoki o‘chiradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Jonli Klaviatura Detektori */}
      <KeyDetector />

      {/* 3. Sichqoncha texnikasi & Sensorlar */}
      <section className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Mouse className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-teal-edge bg-teal-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-teal-ink">
                2-Mavzu
              </span>
              <span className="text-xs font-semibold text-fg-muted">Manipulyatorlar texnologiyasi</span>
            </div>
            <h2 className="mt-0.5 text-xl font-bold text-fg sm:text-2xl">
              Sichqoncha anatomiyasi, sensorlar va DPI ko‘rsatkichi
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Sichqoncha tugmalari */}
          <div className="space-y-3 rounded-2xl border border-line bg-subtle p-5">
            <h3 className="text-sm font-bold text-fg">Sichqonchaning asosiy amallari:</h3>
            <ul className="space-y-2.5 text-xs text-fg-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" />
                <span>
                  <strong className="text-fg">Chap tugma (LMB):</strong> Obyektni tanlash (bir klik), dastur yoki faylni ochish (ikki marta tez bosish), obyektlarni sudrash (Drag & Drop).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" />
                <span>
                  <strong className="text-fg">O‘ng tugma (RMB):</strong> Obyektning kontekst menyusini ochish (xususiyatlar, nusxa olish, o‘chirish, qayta nomlash).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-ink" />
                <span>
                  <strong className="text-fg">G‘ildirakcha (Scroll Wheel):</strong> Katta tibbiy hujjatlar va jadvallarni yuqoriga-pastga surish hamda bosilganda 3-tugma vazifasi.
                </span>
              </li>
            </ul>
          </div>

          {/* Sensorlar va DPI */}
          <div className="space-y-3 rounded-2xl border border-line bg-subtle p-5">
            <h3 className="text-sm font-bold text-fg">Sensorlar va DPI tushunchasi:</h3>
            <p className="text-xs leading-relaxed text-fg-muted">
              <strong className="text-fg">DPI (Dots Per Inch)</strong> — sichqoncha jismonan 1 dyuym siljiganida kursor ekranda necha piksel harakatlanishini belgilovchi sezgirlik ko‘rsatkichidir.
            </p>
            <div className="rounded-xl border border-teal-edge bg-teal-tint/50 p-3 text-xs text-teal-ink">
              🏥 <strong className="text-teal-900 dark:text-teal-200">Tibbiy amaliyotda:</strong> Rentgen, kompyuter tomografiyasi (KT) va MRT tasvirlarini tahlil qilishda yuqori DPI (1600–3200) mikroskopik o‘choqlarni xatosiz belgilash uchun juda muhimdir.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ergonomika va Mehnat gigiyenasi */}
      <section className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-amber-edge bg-amber-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-ink">
                3-Mavzu
              </span>
              <span className="text-xs font-semibold text-fg-muted">Salomatlik va mehnat gigiyenasi</span>
            </div>
            <h2 className="mt-0.5 text-xl font-bold text-fg sm:text-2xl">
              Ergonomika: Karpal tunnel sindromining oldini olish
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-subtle p-4">
            <span className="text-xs font-bold text-amber-ink">1. Tirsak burchagi (90°)</span>
            <p className="mt-1.5 text-xs text-fg-muted">
              Qo‘llar stolga osilib turmasligi, tirsak 90–100 daraja burchakda turishi va bilak tekis yotishi kerak.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-subtle p-4">
            <span className="text-xs font-bold text-emerald-ink">2. 20-20-20 Ko‘z qoidasi</span>
            <p className="mt-1.5 text-xs text-fg-muted">
              Har 20 daqiqa ishlagach, 20 soniya davomida kamida 20 fut (6 metr) uzoqlikdagi obyektga qarab ko‘z mushaklarini bo‘shashtiring.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-subtle p-4">
            <span className="text-xs font-bold text-blue-ink">3. Klaviatura tozaligi</span>
            <p className="mt-1.5 text-xs text-fg-muted">
              Tibbiyot xonasidagi klaviatura va sichqoncha har smenada 70% izopropil spirtli salfetka bilan dezinfeksiya qilinadi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
