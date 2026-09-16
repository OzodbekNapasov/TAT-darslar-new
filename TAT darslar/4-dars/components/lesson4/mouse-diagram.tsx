'use client';

import React from 'react';

const CALLOUTS = [
  { n: 1, title: 'Chap tugma', desc: 'asosiy tugma: tanlash, ochish, tasdiqlash. Barcha ishning ~90% shu tugmada.' },
  { n: 2, title: 'O‘ng tugma', desc: 'kontekst menyusini ochadi (“Nusxa olish”, “Nomini o‘zgartirish”, “O‘chirish”).' },
  { n: 3, title: 'G‘ildirak (scroll)', desc: 'sahifani suradi. Bosilsa — o‘rta tugma: havolani yangi varaqda ochadi.' },
  { n: 4, title: 'Yon tugmalar', desc: 'odatda “Orqaga / Oldinga”. Hamma sichqonchada bo‘lmaydi.' },
  { n: 5, title: 'Korpus', desc: 'kaft tayanadigan joy. Qo‘lga mos bo‘lishi charchashni kamaytiradi.' },
  { n: 6, title: 'Sensor (optik “ko‘z”)', desc: 'pastki tomonda. Harakatni o‘qiydi. Sezgirligi DPI bilan o‘lchanadi.' },
];

export function MouseDiagram() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-card my-5">
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] items-center gap-8">
        {/* SVG illustration */}
        <div className="flex flex-col items-center">
          <svg
            viewBox="40 -6 184 314"
            className="w-full max-w-[220px] drop-shadow-md select-none"
            role="img"
            aria-label="Sichqoncha tuzilishi chizmasi"
          >
            {/* korpus */}
            <path
              d="M150 18 C104 18 88 62 86 112 C83 178 96 300 150 300 C204 300 217 178 214 112 C212 62 196 18 150 18 Z"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* tugmalar chegarasi */}
            <path d="M88 128 C110 136 190 136 212 128" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <line x1="150" y1="19" x2="150" y2="60" stroke="#64748b" strokeWidth="2.5" />
            <line x1="150" y1="98" x2="150" y2="132" stroke="#64748b" strokeWidth="2.5" />
            
            {/* chap tugma yoritilgan (ko'k) */}
            <path
              d="M150 20 C112 21 94 64 92 112 C91.4 118 91.2 124 91.2 129 C110 135 130 131 150 131 Z"
              fill="#3b82f6"
              opacity="0.55"
            />
            
            {/* g'ildirak */}
            <rect x="141" y="58" width="18" height="42" rx="9" fill="#334155" stroke="#64748b" strokeWidth="1" />
            <line x1="145" y1="68" x2="155" y2="68" stroke="#94a3b8" strokeWidth="2" />
            <line x1="145" y1="79" x2="155" y2="79" stroke="#94a3b8" strokeWidth="2" />
            <line x1="145" y1="90" x2="155" y2="90" stroke="#94a3b8" strokeWidth="2" />
            
            {/* yon tugmalar */}
            <rect x="80" y="150" width="12" height="26" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1" />
            <rect x="80" y="182" width="12" height="26" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1" />
            
            {/* sensor (pastdan) */}
            <ellipse cx="150" cy="252" rx="20" ry="14" fill="#fee2e2" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="150" cy="252" r="6" fill="#e11d48" />
            
            {/* kabel */}
            <path d="M150 18 C150 8 150 6 150 2" stroke="#475569" strokeWidth="6" fill="none" strokeLinecap="round" />
            
            {/* raqam doiralari va matnlari */}
            <circle cx="112" cy="78" r="12" fill="#2563eb" />
            <text x="112" y="82" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">1</text>
            
            <circle cx="188" cy="78" r="12" fill="#2563eb" />
            <text x="188" y="82" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">2</text>
            
            <circle cx="150" cy="38" r="12" fill="#2563eb" />
            <text x="150" y="42" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3</text>
            
            <circle cx="62" cy="168" r="12" fill="#2563eb" />
            <text x="62" y="172" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">4</text>
            
            <circle cx="150" cy="186" r="12" fill="#2563eb" />
            <text x="150" y="190" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">5</text>
            
            <circle cx="196" cy="252" r="12" fill="#e11d48" />
            <text x="196" y="256" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">6</text>
            
            {/* ko'rsatkich chiziqlari */}
            <line x1="74" y1="168" x2="62" y2="168" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="170" y1="252" x2="184" y2="252" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>

          <span className="mt-3 text-xs italic text-fg-subtle text-center">
            Sichqoncha tuzilishi (ko‘k — chap tugma, qizil punktir — pastdagi sensor)
          </span>
        </div>

        {/* Callout list */}
        <div className="space-y-3">
          {CALLOUTS.map((c) => (
            <div key={c.n} className="flex items-start gap-3 rounded-xl border border-line bg-subtle p-3 transition-all hover:bg-surface hover:shadow-sm">
              <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-black text-white ${
                c.n === 6 ? 'bg-rose-600' : 'bg-blue-600'
              }`}>
                {c.n}
              </span>
              <div className="text-sm leading-relaxed text-fg">
                <strong className="text-fg font-bold">{c.title}</strong> — {c.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
