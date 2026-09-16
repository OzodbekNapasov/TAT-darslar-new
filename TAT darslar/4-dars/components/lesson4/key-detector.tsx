'use client';

import React, { useState, useRef } from 'react';
import { Keyboard, RotateCcw } from 'lucide-react';

const NAMES: Record<string, string> = {
  ' ': 'Space (bo‘sh joy)',
  Escape: 'Esc',
  ArrowUp: '↑ Yuqoriga',
  ArrowDown: '↓ Pastga',
  ArrowLeft: '← Chapga',
  ArrowRight: '→ O‘ngga',
  Control: 'Ctrl',
  Meta: 'Win',
  PageUp: 'PgUp',
  PageDown: 'PgDn',
  CapsLock: 'Caps Lock',
  NumLock: 'Num Lock',
  ScrollLock: 'Scroll Lock',
  Backspace: 'Backspace',
  Delete: 'Delete',
  Enter: 'Enter',
};

export function KeyDetector() {
  const [keyName, setKeyName] = useState('⌨');
  const [keyCode, setKeyCode] = useState('');
  const [hint, setHint] = useState('Bu yerni bosing, keyin klaviaturadagi istalgan tugmani bosing');
  const [mods, setMods] = useState({ ctrl: false, alt: false, shift: false, meta: false });
  const [focused, setFocused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const name = NAMES[e.key] || e.key;
    setKeyName(name);
    const loc = e.location === 1 ? ' (chap)' : e.location === 2 ? ' (o‘ng)' : '';
    setKeyCode(`kod: ${e.code || e.key}${loc}`);
    setHint('Bosilgan klavisha:');
    setMods({
      ctrl: e.ctrlKey,
      alt: e.altKey,
      shift: e.shiftKey,
      meta: e.metaKey,
    });
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMods({
      ctrl: e.ctrlKey,
      alt: e.altKey,
      shift: e.shiftKey,
      meta: e.metaKey,
    });
  };

  const reset = () => {
    setKeyName('⌨');
    setKeyCode('');
    setHint('Bu yerni bosing, keyin klaviaturadagi istalgan tugmani bosing');
    setMods({ ctrl: false, alt: false, shift: false, meta: false });
    stageRef.current?.focus();
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-blue-edge bg-subtle p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-base font-bold text-fg">
          <Keyboard className="h-5 w-5 text-blue-ink" />
          <span>Klavisha detektori</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-line bg-surface px-3 py-1.5 text-xs font-bold text-fg transition-all hover:bg-subtle hover:text-blue-ink active:scale-95 shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Tozalash
        </button>
      </div>

      <div
        ref={stageRef}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 p-6 text-center outline-none transition-all duration-200 select-none ${
          focused
            ? 'border-cyan-400 bg-slate-900 shadow-[0_0_0_4px_rgba(6,182,212,0.18)]'
            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
        }`}
      >
        <div className="text-xs font-semibold tracking-wide text-slate-400">
          {hint}
        </div>
        <div className="my-2 font-mono text-4xl sm:text-5xl font-black text-white tracking-tight word-break">
          {keyName}
        </div>
        <div className="h-5 font-mono text-xs font-bold text-cyan-300">
          {keyCode || ' '}
        </div>

        {/* Modifiers */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
              mods.ctrl
                ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            Ctrl
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
              mods.alt
                ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            Alt
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
              mods.shift
                ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            Shift
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-bold transition-all ${
              mods.meta
                ? 'border-emerald-500 bg-emerald-500 text-slate-950 shadow-sm'
                : 'border-white/10 bg-white/5 text-slate-400'
            }`}
          >
            Win
          </span>
        </div>
      </div>
    </div>
  );
}
