'use client';

import {
  Zap,
  ExternalLink,
  Laptop,
  CheckCircle2,
  Copy,
  Bookmark,
  Keyboard,
  MousePointer,
  Sparkles,
} from 'lucide-react';
import {TypingTrainer} from './typing-trainer';
import {CursorLab} from './cursor-lab';

const HOTKEYS = [
  {keys: 'Ctrl + C', action: 'Nusxalash (Copy)', desc: 'Belgilangan matn yoki faylni tezkor xotiraga nusxalaydi.'},
  {keys: 'Ctrl + V', action: 'Qo‘yish (Paste)', desc: 'Nusxalangan obyektni kursor turgan joyga joylashtiradi.'},
  {keys: 'Ctrl + X', action: 'Qirqib olish (Cut)', desc: 'Obyektni asl joyidan o‘chirib xotiraga oladi.'},
  {keys: 'Ctrl + Z', action: 'Bekor qilish (Undo)', desc: 'Oxirgi noto‘g‘ri qilingan amalni bir zumda orqaga qaytaradi.'},
  {keys: 'Ctrl + S', action: 'Saqlash (Save)', desc: 'Hujjatni darhol qattiq diskka yoki bazaga saqlaydi.'},
  {keys: 'Ctrl + A', action: 'Barchasini belgilash', desc: 'Joriy sahifa yoki papkadagi hamma ma’lumotni birato‘la tanlaydi.'},
  {keys: 'Ctrl + F', action: 'Qidirish (Find)', desc: 'Matn yoki bemorlar bazasidan kerakli so‘z/familiyani topish.'},
  {keys: 'Alt + Tab', action: 'Dasturlar almashinuvi', desc: 'Ochiq turgan barcha oynalar o‘rtasida sichqonchasiz tezkor o‘tish.'},
  {keys: 'Win + L', action: 'Kompyuterni qulflash (Lock)', desc: 'O‘rindan turishda tizimni begonalardan bir zumda blokirovka qilish.'},
  {keys: 'Ctrl + Shift + Esc', action: 'Vazifalar dispetcheri', desc: 'Qotib qolgan dasturlarni to‘xtatish uchun Task Managerni ochadi.'},
  {keys: 'F2', action: 'Nomni o‘zgartirish (Rename)', desc: 'Fayl yoki papka nomini sichqonchaning o‘ng tugmasisiz o‘zgartirish.'},
  {keys: 'F5', action: 'Yangilash (Refresh)', desc: 'Veb-sahifa yoki papka ichidagi ma’lumotlarni yangilaydi.'},
];

export function PracticeSection() {
  return (
    <div className="space-y-8">
      {/* 1. Tez yozish trenajyori */}
      <TypingTrainer />

      {/* 2. Tezkor tugmalar (Hotkeys) jadvali */}
      <section className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-purple-edge bg-purple-tint-strong px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-purple-ink">
                Tezkor Tugmalar
              </span>
              <span className="text-xs font-semibold text-fg-muted">Windows va Tibbiy IT</span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-fg">Eng muhim klaviatura birikmalari (Hotkeys)</h3>
          </div>
          <span className="text-xs font-semibold text-fg-subtle">
            Jami 12 ta asosiy kombinatsiya
          </span>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-fg-muted">
          Ushbu tugmalar birikmasini yodlash tibbiyot xodimiga vaqtni tejash va sichqonchaga kamroq chalg‘ib, diqqatni bemorga qaratishga yordam beradi:
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HOTKEYS.map((hk) => (
            <div
              key={hk.keys}
              className="flex flex-col justify-between rounded-2xl border border-line bg-subtle p-4 transition-all hover:border-line-strong hover:bg-surface"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-xl border border-line-strong bg-canvas px-3 py-1 font-mono text-xs font-black text-blue-ink shadow-sm">
                    {hk.keys}
                  </span>
                  <span className="text-[11px] font-bold text-fg">{hk.action}</span>
                </div>
                <p className="mt-2.5 text-xs text-fg-muted leading-relaxed">{hk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Kursor Laboratoriyasi */}
      <CursorLab />

      {/* 4. Foydali Tashqi Trenajyorlar */}
      <section className="rounded-3xl border border-line bg-gradient-to-r from-blue-950/20 via-slate-900/10 to-indigo-950/20 p-6 sm:p-7">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-ink" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-fg">Tavsiya etiladigan onlayn trenajyorlar</h4>
        </div>
        <p className="mt-2 text-xs text-fg-muted">
          Darsdan tashqari vaqtlarda tez terish va sichqoncha chaqqonligini mustaqil ravishda oshirib borish uchun:
        </p>

        <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
          <a
            href="https://teztype.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-4 shadow-sm transition-all hover:border-blue-edge hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-ink group-hover:scale-110 transition-transform">
                <Keyboard className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-fg">TezType.uz</span>
                  <ExternalLink className="h-3.5 w-3.5 text-blue-ink opacity-60 group-hover:opacity-100" />
                </div>
                <p className="text-xs text-fg-muted">O‘zbekcha matnlarda 10 barmoq bilan tez yozish trenajyori</p>
              </div>
            </div>
          </a>

          <a
            href="https://mouseaccuracy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-4 shadow-sm transition-all hover:border-cyan-edge hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/10 text-cyan-ink group-hover:scale-110 transition-transform">
                <MousePointer className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-fg">MouseAccuracy.com</span>
                  <ExternalLink className="h-3.5 w-3.5 text-cyan-ink opacity-60 group-hover:opacity-100" />
                </div>
                <p className="text-xs text-fg-muted">Sichqoncha bilan nishonga aniq va tez bosish trenajyori</p>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
