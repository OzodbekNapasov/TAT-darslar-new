'use client';

import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';
import { HotkeysQuiz } from './hotkeys-quiz';

export function TabHotkeys() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-card">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-fg tracking-tight">
              Tezkor klaviaturalar — amaliyot
            </h2>
            <p className="text-xs font-semibold text-fg-subtle">
              3-qism: Muhim kombinatsiyalar va bilimlarni sinash viktorinasi
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
          Tezkor klaviaturalar nima uchun kerakligi va ular qanday ishlashi <strong>1-bo‘limda</strong>{' '}
          batafsil tushuntirilgan. Bu yerda esa bilimingizni amalda sinab ko‘ramiz: quyidagi
          viktorinada har bir savolga to‘g‘ri kombinatsiyani tanlang. Javob bergach, to‘g‘ri variant
          yashil rangda ko‘rinadi va ball avtomatik hisoblanadi.
        </div>

        <div className="mt-8">
          <HotkeysQuiz />
        </div>
      </section>
    </div>
  );
}
