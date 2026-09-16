'use client';

import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Keyboard, Zap, Layers, Mouse, ExternalLink, ArrowRight, Play, Sparkles } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TabKeyboard } from '@/components/lesson4/tab-keyboard';
import { TabTyping } from '@/components/lesson4/tab-typing';
import { TabHotkeys } from '@/components/lesson4/tab-hotkeys';
import { TabMouse } from '@/components/lesson4/tab-mouse';

type TabId = 'keyboard' | 'typing' | 'hotkeys' | 'mouse';

const TABS: { id: TabId; label: string; Icon: LucideIcon }[] = [
  { id: 'keyboard', label: '1. Klaviatura tuzilishi', Icon: Keyboard },
  { id: 'typing', label: '2. Tez yozish', Icon: Zap },
  { id: 'hotkeys', label: '3. Tezkor klaviaturalar', Icon: Layers },
  { id: 'mouse', label: '4. Sichqoncha', Icon: Mouse },
];

export default function Lesson4Page() {
  const [activeTab, setActiveTab] = useState<TabId>('keyboard');

  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans text-fg antialiased selection:bg-blue-tint-strong">
      <SiteHeader
        eyebrow="Axborot Texnologiyalari — 4-Dars"
        title="Klaviatura va sichqoncha bilan professional ishlash"
        subtitle="Tibbiyot Texnikumi 1-Kurs • Klaviatura zonalari, tez yozish va sichqoncha texnikasi"
        back={{ label: 'Mundarijaga qaytish', to: '/' }}
      />

      {/* Top action banner linking to teztype.uz and mouseaccuracy.com */}
      <div className="border-b border-line bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-indigo-950/40 px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20 text-blue-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                  4-Dars Amaliy Platformalari
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  Faol
                </span>
              </div>
              <p className="text-xs text-fg-muted">
                Tez yozish va sichqoncha aniqligini oshirish onlayn trenajyorlari:
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2.5 md:w-auto">
            <a
              href="https://www.teztype.uz/play"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-500/40 bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] sm:text-sm md:flex-initial"
            >
              <Keyboard className="h-4 w-4" />
              <span>teztype.uz — Tez yozish</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>

            <a
              href="https://mouseaccuracy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-teal-500/40 bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-teal-500 hover:scale-[1.02] active:scale-[0.98] sm:text-sm md:flex-initial"
            >
              <Mouse className="h-4 w-4" />
              <span>mouseaccuracy.com — Sichqoncha</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Tabs */}
      <div className="border-b border-line bg-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-8">
          <nav
            aria-label="4-Dars bo'limlari"
            className="grid w-full grid-cols-2 gap-1.5 rounded-2xl border border-line bg-subtle p-1.5 sm:grid-cols-4"
          >
            {TABS.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveTab(id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-2.5 py-3 text-center text-xs font-bold transition-all duration-200 sm:px-4 sm:py-3.5 sm:text-sm ${
                    active
                      ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-fg-muted hover:bg-surface hover:text-fg'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${active ? 'text-white' : 'text-fg-subtle'}`} />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8 sm:py-10">
        {activeTab === 'keyboard' && <TabKeyboard />}
        {activeTab === 'typing' && <TabTyping />}
        {activeTab === 'hotkeys' && <TabHotkeys />}
        {activeTab === 'mouse' && <TabMouse />}

        {/* Bottom CTA Banner matching dars.html */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Mavzuni o‘rgandingizmi?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Endi amaliyot vaqti — <strong className="text-white font-semibold">teztype.uz</strong> (matn terish) va <strong className="text-white font-semibold">mouseaccuracy.com</strong> (sichqoncha aniqligi) platformalarida mashqlarni bajaring va natijangizni sinovdan o‘tkazing.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://www.teztype.uz/play"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-black text-blue-900 shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
            >
              <Keyboard className="h-4 w-4 text-blue-600" />
              <span>teztype.uz (Yozish)</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="https://mouseaccuracy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-2xl bg-teal-500 hover:bg-teal-400 px-5 py-3.5 text-sm font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Mouse className="h-4 w-4" />
              <span>mouseaccuracy.com (Sichqoncha)</span>
              <ExternalLink className="h-4 w-4 opacity-80" />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
