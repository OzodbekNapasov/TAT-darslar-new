'use client';

import {useState} from 'react';
import {MousePointer, Move, Ban, Clock, Crosshair, Hand, ZoomIn, Type} from 'lucide-react';

const CURSORS = [
  {
    id: 'default',
    title: 'Standart (Arrow)',
    css: 'cursor-default',
    icon: MousePointer,
    desc: 'Obyektlarni ko‘rsatish va odatiy navigatsiya holati.',
    medicalUse: 'Ekrandagi ma’lumotlarni ko‘zdan kechirish va umumiy boshqaruv.',
  },
  {
    id: 'pointer',
    title: 'Havola (Pointer / Qo‘lcha)',
    css: 'cursor-pointer',
    icon: Hand,
    desc: 'Bosish mumkin bo‘lgan tugma, havola yoki buyruq belgisi.',
    medicalUse: 'Bemor anketasini ochish, "Saqlash" yoki "Chop etish" tugmasini bosish.',
  },
  {
    id: 'text',
    title: 'Matn kiritish (I-Beam)',
    css: 'cursor-text',
    icon: Type,
    desc: 'Matn yozish yoki tahrirlash maydoniga tushganda paydo bo‘ladi.',
    medicalUse: 'Diagnoz matni, bemor shikoyatlari yoki dori dozasini yozish maydonlari.',
  },
  {
    id: 'crosshair',
    title: 'Nishon (Crosshair)',
    css: 'cursor-crosshair',
    icon: Crosshair,
    desc: 'Aniq pikselli koordinata tanlash yoki chizma chizish.',
    medicalUse: 'Rentgen, MRT va UTT tasvirlarida o‘lchov chiziqlarini tortish.',
  },
  {
    id: 'move',
    title: 'Ko‘chirish (Move)',
    css: 'cursor-move',
    icon: Move,
    desc: 'Obyektni bir joydan ikkinchi joyga sudrab o‘tkazish (Drag & Drop).',
    medicalUse: 'Shifokor jadvalini surish yoki hujjatlarni boshqa papkaga ko‘chirish.',
  },
  {
    id: 'not-allowed',
    title: 'Taqiqlangan (Not Allowed)',
    css: 'cursor-not-allowed',
    icon: Ban,
    desc: 'Ushbu amalni bajarishga ruxsat yo‘q yoki maydon nofaol.',
    medicalUse: 'Yopilgan bemor kasallik tarixini tahrirlash huquqi bo‘lmaganda.',
  },
  {
    id: 'wait',
    title: 'Kutish / Band (Wait)',
    css: 'cursor-wait',
    icon: Clock,
    desc: 'Tizim ma’lumotlarni yuklamoqda yoki tahlil qilmoqda.',
    medicalUse: 'Laboratoriya tahlillari bazadan yuklanayotgan paytdagi holat.',
  },
  {
    id: 'zoom-in',
    title: 'Kattalashtirish (Zoom In)',
    css: 'cursor-zoom-in',
    icon: ZoomIn,
    desc: 'Tasvirni yaqinlashtirish va mikroskopik ko‘rish.',
    medicalUse: 'EKG tishchalari yoki qon tahlili mikro-suratlarini kattalashtirish.',
  },
];

export function CursorLab() {
  const [activeCursor, setActiveCursor] = useState(CURSORS[0]);

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-7">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-cyan-edge bg-cyan-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-ink">
            Sichqoncha Amaliyoti
          </span>
          <span className="text-xs font-semibold text-fg-muted">Kursor holatlari laboratoriyasi</span>
        </div>
        <h3 className="text-lg font-bold text-fg">Kursor laboratoriyasi & Holatlar tahlili</h3>
        <p className="text-xs text-fg-muted">
          Quyidagi kartochkalar ustiga sichqonchani olib boring va kursor qanday o‘zgarishini ko‘ring:
        </p>
      </div>

      <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {CURSORS.map((c) => {
          const Icon = c.icon;
          const isSelected = activeCursor.id === c.id;
          return (
            <div
              key={c.id}
              onMouseEnter={() => setActiveCursor(c)}
              className={`${c.css} group relative flex flex-col rounded-2xl border p-4 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-ink bg-blue-tint/50 shadow-md ring-2 ring-blue-500/20'
                  : 'border-line bg-subtle hover:border-blue-edge hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-fg">{c.title}</span>
                <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-ink' : 'text-fg-subtle'}`} />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-fg-muted">{c.desc}</p>
              <div className="mt-3 rounded-lg border border-line bg-canvas px-2.5 py-1 text-[10px] font-medium text-fg-subtle">
                🏥 <span className="font-semibold text-fg">Tibbiyotda:</span> {c.medicalUse}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-blue-edge bg-blue-tint p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-ink">
          <MousePointer className="h-4 w-4" />
          <span>Faol kursor: {activeCursor.title}</span>
        </div>
        <p className="mt-1 text-xs text-fg-muted">
          {activeCursor.desc} — Tibbiy dasturlarda: {activeCursor.medicalUse}
        </p>
      </div>
    </div>
  );
}
