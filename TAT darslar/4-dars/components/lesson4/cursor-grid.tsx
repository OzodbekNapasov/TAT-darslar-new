'use client';

import React from 'react';

const CURSORS = [
  { name: 'Strelka', desc: 'Tizim tayyor', cursor: 'default' },
  { name: 'Matn kursori', desc: 'Bu yerga yozish mumkin', cursor: 'text' },
  { name: 'Qo‘l', desc: 'Havola — bosiladi', cursor: 'pointer' },
  { name: 'Kutish', desc: 'Tizim band', cursor: 'wait' },
  { name: 'Ikki tomonlama', desc: 'O‘lchamni o‘zgartirish', cursor: 'ns-resize' },
  { name: 'To‘rt tomonlama', desc: 'Sudrab ko‘chirish', cursor: 'move' },
  { name: 'Man etish', desc: 'Bu yerga qo‘yib bo‘lmaydi', cursor: 'not-allowed' },
  { name: 'Ushlash', desc: 'Ushlab surish mumkin', cursor: 'grab' },
];

export function CursorGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
      {CURSORS.map((c) => (
        <div
          key={c.cursor}
          style={{ cursor: c.cursor }}
          className="group rounded-2xl border border-line bg-subtle p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-blue-edge hover:bg-surface hover:shadow-card select-none"
        >
          <div className="font-bold text-sm text-fg group-hover:text-blue-ink transition-colors">
            {c.name}
          </div>
          <div className="text-xs text-fg-muted mt-1">
            {c.desc}
          </div>
          <div className="mt-2.5 inline-block font-mono text-[10px] text-fg-subtle bg-canvas px-2 py-0.5 rounded-md border border-line">
            cursor: {c.cursor}
          </div>
        </div>
      ))}
    </div>
  );
}
