'use client';

import React, { useState, useEffect, useRef } from 'react';

type KeyGroup = 'alfa' | 'func' | 'mod' | 'nav' | 'num' | 'special';

type KeyDef = [string, string | null, KeyGroup | null, number];

const MAIN: KeyDef[][] = [
  [['Esc','Escape','special',1], ['',null,null,1],
   ['F1','F1','func',1],['F2','F2','func',1],['F3','F3','func',1],['F4','F4','func',1], ['',null,null,0.5],
   ['F5','F5','func',1],['F6','F6','func',1],['F7','F7','func',1],['F8','F8','func',1], ['',null,null,0.5],
   ['F9','F9','func',1],['F10','F10','func',1],['F11','F11','func',1],['F12','F12','func',1]],

  [['~ `','Backquote','alfa',1],['1','Digit1','alfa',1],['2','Digit2','alfa',1],['3','Digit3','alfa',1],
   ['4','Digit4','alfa',1],['5','Digit5','alfa',1],['6','Digit6','alfa',1],['7','Digit7','alfa',1],
   ['8','Digit8','alfa',1],['9','Digit9','alfa',1],['0','Digit0','alfa',1],['−','Minus','alfa',1],
   ['=','Equal','alfa',1],['⟵ Backspace','Backspace','special',2]],

  [['Tab ⇥','Tab','special',1.5],['Q','KeyQ','alfa',1],['W','KeyW','alfa',1],['E','KeyE','alfa',1],
   ['R','KeyR','alfa',1],['T','KeyT','alfa',1],['Y','KeyY','alfa',1],['U','KeyU','alfa',1],
   ['I','KeyI','alfa',1],['O','KeyO','alfa',1],['P','KeyP','alfa',1],['[','BracketLeft','alfa',1],
   [']','BracketRight','alfa',1],['\\','Backslash','alfa',1.5]],

  [['Caps Lock','CapsLock','special',1.75],['A','KeyA','alfa',1],['S','KeyS','alfa',1],['D','KeyD','alfa',1],
   ['F','KeyF','alfa',1],['G','KeyG','alfa',1],['H','KeyH','alfa',1],['J','KeyJ','alfa',1],
   ['K','KeyK','alfa',1],['L','KeyL','alfa',1],[';','Semicolon','alfa',1],["'",'Quote','alfa',1],
   ['Enter ⏎','Enter','special',2.25]],

  [['Shift ⇧','ShiftLeft','mod',2.25],['Z','KeyZ','alfa',1],['X','KeyX','alfa',1],['C','KeyC','alfa',1],
   ['V','KeyV','alfa',1],['B','KeyB','alfa',1],['N','KeyN','alfa',1],['M','KeyM','alfa',1],
   [',','Comma','alfa',1],['.','Period','alfa',1],['/','Slash','alfa',1],['Shift ⇧','ShiftRight','mod',2.75]],

  [['Ctrl','ControlLeft','mod',1.25],['Win','MetaLeft','mod',1.25],['Alt','AltLeft','mod',1.25],
   ['Space (bo‘sh joy)','Space','special',6.25],
   ['Alt','AltRight','mod',1.25],['Win','MetaRight','mod',1.25],['Menu','ContextMenu','mod',1.25],
   ['Ctrl','ControlRight','mod',1.25]]
];

const NAVB: KeyDef[][] = [
  [['PrtScr','PrintScreen','special',1],['ScrLk','ScrollLock','special',1],['Pause','Pause','special',1]],
  [['Insert','Insert','special',1],['Home','Home','nav',1],['PgUp','PageUp','nav',1]],
  [['Delete','Delete','special',1],['End','End','nav',1],['PgDn','PageDown','nav',1]],
  [['',null,null,3]],
  [['',null,null,1],['↑','ArrowUp','nav',1],['',null,null,1]],
  [['←','ArrowLeft','nav',1],['↓','ArrowDown','nav',1],['→','ArrowRight','nav',1]]
];

const NUMB: KeyDef[][] = [
  [['',null,null,4]],
  [['Num Lock','NumLock','num',1],['/','NumpadDivide','num',1],['*','NumpadMultiply','num',1],['−','NumpadSubtract','num',1]],
  [['7','Numpad7','num',1],['8','Numpad8','num',1],['9','Numpad9','num',1],['+','NumpadAdd','num',1]],
  [['4','Numpad4','num',1],['5','Numpad5','num',1],['6','Numpad6','num',1],['',null,null,1]],
  [['1','Numpad1','num',1],['2','Numpad2','num',1],['3','Numpad3','num',1],['Enter','NumpadEnter','num',1]],
  [['0','Numpad0','num',2],['.','NumpadDecimal','num',1],['',null,null,1]]
];

const GROUPS: { id: KeyGroup; label: string; color: string }[] = [
  { id: 'alfa', label: 'Alfavit-raqamli', color: '#4f46e5' },
  { id: 'func', label: 'Funksional', color: '#0891b2' },
  { id: 'mod', label: 'Boshqaruv', color: '#d97706' },
  { id: 'nav', label: 'Kursor boshqaruvi', color: '#059669' },
  { id: 'num', label: 'Raqamli blok', color: '#9333ea' },
  { id: 'special', label: 'Maxsus (xizmat)', color: '#e11d48' },
];

const GROUP_COLORS: Record<KeyGroup, string> = {
  alfa: 'bg-[#4f46e5]',
  func: 'bg-[#0891b2]',
  mod: 'bg-[#d97706]',
  nav: 'bg-[#059669]',
  num: 'bg-[#9333ea]',
  special: 'bg-[#e11d48]',
};

export function KeyboardMap() {
  const [activeGroup, setActiveGroup] = useState<KeyGroup | null>(null);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      setPressedKeys((prev) => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const handleBlur = () => {
      setPressedKeys(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const toggleGroup = (id: KeyGroup) => {
    setActiveGroup((prev) => (prev === id ? null : id));
  };

  const U = 38;
  const GAP = 4;

  const renderBlock = (rows: KeyDef[][]) => (
    <div className="flex flex-col gap-1">
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="flex gap-1 h-[38px]">
          {row.map((k, kIdx) => {
            const [label, code, group, widthFactor] = k;
            const width = widthFactor * U + (widthFactor - 1) * GAP;

            if (code === null) {
              return <div key={kIdx} style={{ width: `${width}px` }} className="h-[38px]" />;
            }

            const isPressed = pressedKeys.has(code);
            const isDimmed = activeGroup !== null && group !== activeGroup;

            return (
              <div
                key={kIdx}
                data-code={code}
                data-group={group}
                style={{ width: `${width}px` }}
                className={`h-[38px] rounded-md border border-white/15 border-b-[3px] border-b-black/35 flex items-center justify-center text-center font-bold text-white px-1 select-none transition-all duration-75 overflow-hidden ${
                  label.length > 7 ? 'text-[9px]' : 'text-[11px]'
                } ${GROUP_COLORS[group!]} ${
                  isDimmed ? 'opacity-20' : 'opacity-100'
                } ${
                  isPressed
                    ? '!bg-amber-400 !text-amber-950 translate-y-0.5 ring-2 ring-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.6)]'
                    : ''
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-4">
      {/* Group buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {GROUPS.map((g) => {
          const isActive = activeGroup === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => toggleGroup(g.id)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold transition-all ${
                isActive
                  ? 'border-fg bg-fg text-canvas shadow-md'
                  : 'border-line bg-surface text-fg hover:border-blue-edge hover:bg-subtle'
              }`}
            >
              <span className="h-3 w-3 rounded-sm shrink-0" style={{ backgroundColor: g.color }} />
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Keyboard canvas */}
      <div
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-4 shadow-inner outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex gap-4 w-max mx-auto">
          {renderBlock(MAIN)}
          {renderBlock(NAVB)}
          {renderBlock(NUMB)}
        </div>
      </div>
      <div className="mt-2 text-center text-xs italic text-fg-subtle">
        104 klavishali standart klaviatura sxemasi. Tor ekranda sxemani yon tomonga surib ko‘ring. Klaviaturadagi tugmalarni bossangiz, u sariq rangda yonadi.
      </div>
    </div>
  );
}
