'use client';

import {useState} from 'react';
import {Binary, RotateCcw} from 'lucide-react';
import {Explain, PracticeCard} from './ui';

const BITS = [128, 64, 32, 16, 8, 4, 2, 1];

function toBin(n: number) {
  return n.toString(2).padStart(8, '0');
}

export function BinaryLab() {
  const [text, setText] = useState('ANVAR');
  const [on, setOn] = useState<boolean[]>([false, false, false, true, true, false, false, true]);

  const chars = [...text].slice(0, 8);
  const decimal = BITS.reduce((s, b, i) => s + (on[i] ? b : 0), 0);
  const bytes = new TextEncoder().encode(text).length;

  return (
    <PracticeCard
      n={6}
      Icon={Binary}
      title="Kompyuter tilida: 0 va 1"
      lead="Kompyuter harf ham, raqam ham, surat ham — hammasini faqat 0 va 1 ko‘rinishida saqlaydi. Bu ikkilik (2 lik) sanoq sistemasi. Quyida buni o‘z ko‘zingiz bilan ko‘rasiz."
    >
      {/* text -> binary */}
      <div className="rounded-2xl border border-line bg-subtle p-4 sm:p-5">
        <label
          htmlFor="bin-text"
          className="mb-2 block text-xs font-black uppercase tracking-wider text-fg-subtle"
        >
          Bemor ismini yozing — kompyuter uni qanday saqlashini ko‘ring
        </label>
        <input
          id="bin-text"
          value={text}
          maxLength={8}
          onChange={(e) => setText(e.target.value.toUpperCase())}
          className="w-full rounded-xl border-2 border-line-strong bg-surface px-4 py-2.5 font-mono text-base font-bold text-fg outline-none transition-colors focus:border-blue-500"
          placeholder="Masalan: ANVAR"
        />

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="pb-2 pr-3 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  Harf
                </th>
                <th className="pb-2 pr-3 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  10 lik kod
                </th>
                <th className="pb-2 text-xs font-black uppercase tracking-wider text-fg-subtle">
                  2 lik kod (1 bayt)
                </th>
              </tr>
            </thead>
            <tbody>
              {chars.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-sm text-fg-subtle">
                    Yuqoriga biror harf yozing.
                  </td>
                </tr>
              ) : (
                chars.map((ch, i) => {
                  const code = ch.codePointAt(0) ?? 0;
                  return (
                    <tr key={`${ch}-${i}`} className="border-b border-line last:border-0">
                      <td className="py-2 pr-3">
                        <span className="inline-grid h-8 w-8 place-items-center rounded-lg bg-blue-tint-strong font-mono text-sm font-black text-blue-ink">
                          {ch === ' ' ? '␣' : ch}
                        </span>
                      </td>
                      <td className="py-2 pr-3 font-mono text-sm font-bold text-fg">
                        {code}
                      </td>
                      <td className="py-2 font-mono text-sm font-bold tracking-widest text-emerald-ink">
                        {code < 256 ? toBin(code) : `${code} (1 baytdan katta)`}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          Yozilgan matn xotirada{' '}
          <span className="font-mono font-bold text-blue-ink">{bytes} bayt</span> joy
          egallaydi. Odatda 1 harf = 1 bayt = 8 bit. O‘zbek tilidagi{' '}
          <span className="font-mono">o‘</span>, <span className="font-mono">g‘</span>{' '}
          kabi belgilar 1 baytdan ko‘proq joy oladi.
        </p>
      </div>

      {/* bit toggles */}
      <div className="mt-4 rounded-2xl border-2 border-blue-edge bg-blue-tint p-4 sm:p-5">
        <p className="mb-1 text-xs font-black uppercase tracking-wider text-blue-ink">
          8 ta bitni yoqib-o‘chirib, sonni yig‘ing
        </p>
        <p className="mb-4 text-sm text-fg-muted">
          Har bir bitning o‘z og‘irligi bor. Yoqilgan bitlarning og‘irliklari
          qo‘shiladi — 10 lik sondagi natija shunday hosil bo‘ladi.
        </p>

        <div className="flex flex-wrap gap-2">
          {BITS.map((b, i) => (
            <button
              key={b}
              type="button"
              onClick={() => setOn((p) => p.map((v, j) => (j === i ? !v : v)))}
              className={`flex w-[68px] cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 transition-all ${
                on[i]
                  ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                  : 'border-line bg-surface text-fg-muted hover:border-blue-edge'
              }`}
            >
              <span className="font-mono text-lg font-black">{on[i] ? 1 : 0}</span>
              <span className="text-[10px] font-bold opacity-90">{b}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-blue-edge bg-surface px-4 py-3">
          <span className="font-mono text-sm font-bold tracking-widest text-fg-muted">
            {on.map((v) => (v ? 1 : 0)).join('')}
          </span>
          <span className="text-fg-subtle">=</span>
          <span className="rounded-lg bg-blue-600 px-3 py-1 font-mono text-xl font-black text-white">
            {decimal}
          </span>
          <span className="text-sm font-semibold text-fg-muted">
            (10 lik sanoq sistemasida)
          </span>
          <button
            type="button"
            onClick={() => setOn(Array(8).fill(false))}
            className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-subtle px-3 py-1.5 text-xs font-bold text-fg-muted transition-colors hover:border-blue-edge hover:text-blue-ink"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Tozalash
          </button>
        </div>
      </div>

      <Explain title="Nega buni bilish kerak?">
        <p>
          Tibbiy apparatlar — EKG, monitor, laboratoriya analizatori — o‘lchagan
          har bir ko‘rsatkichni shu 0 va 1 lar ketma-ketligiga aylantirib
          saqlaydi va uzatadi. Fayl hajmi, xotira sig‘imi va tarmoq tezligi ham
          aynan shu birliklarda o‘lchanadi.
        </p>
      </Explain>
    </PracticeCard>
  );
}
