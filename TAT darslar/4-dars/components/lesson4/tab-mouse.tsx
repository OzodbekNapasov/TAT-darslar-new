'use client';

import React from 'react';
import { Mouse, ExternalLink, Info, CheckCircle2, AlertTriangle, Crosshair } from 'lucide-react';
import { MouseDiagram } from './mouse-diagram';
import { CursorGrid } from './cursor-grid';

const MOUSE_PRACTICE_LINKS = [
  {
    title: 'Mouse Accuracy',
    url: 'mouseaccuracy.com',
    href: 'https://mouseaccuracy.com/',
    desc: 'Ekranda paydo bo‘ladigan nishonlarni bosish. Oxirida aniqlik foizi va o‘rtacha reaksiya vaqti chiqadi. Qiyinlik darajasi sozlanadi.',
  },
  {
    title: 'Human Benchmark — Aim',
    url: 'humanbenchmark.com/tests/aim',
    href: 'https://humanbenchmark.com/tests/aim',
    desc: '30 ta nishonni imkon qadar tez bosish. Natija — bitta nishonga sarflangan o‘rtacha millisoniya.',
  },
  {
    title: 'Reaksiya vaqti testi',
    url: 'humanbenchmark.com/tests/reactiontime',
    href: 'https://humanbenchmark.com/tests/reactiontime',
    desc: 'Rang o‘zgarishi bilan bosish. Ko‘z va qo‘l muvofiqligini o‘lchaydi.',
  },
  {
    title: 'Aim Trainer',
    url: 'aimtrainer.io',
    href: 'https://www.aimtrainer.io/',
    desc: 'Turli rejimlar: harakatlanuvchi nishonlar, tezkor bosish. Sezgirlikni (DPI) tanlash uchun qulay.',
  },
];

export function TabMouse() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-card">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
            <Mouse className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-fg tracking-tight">
              Sichqoncha bilan tez va aniq ishlash
            </h2>
            <p className="text-xs font-semibold text-fg-subtle">
              4-qism: Sichqoncha anatomiyasi, amallari, kursorlar va aniqlik mashqlari
            </p>
          </div>
        </div>

        {/* Info callout */}
        <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
          <strong>Sichqoncha (mouse)</strong> — ekrandagi kursorni boshqaruvchi manipulyator qurilma.
          U <strong>1968-yilda</strong> Duglas Engelbart tomonidan yaratilgan. Sichqoncha bilan ishlashda
          asosiy mahorat — <strong>tezlik emas, aniqlik</strong>: nishonga bir urinishda tushish.
        </div>

        {/* Diagram with callouts */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-1">Sichqoncha qismlari — chizmada</h3>
          <MouseDiagram />
        </div>

        {/* Table 1: Parts and Functions */}
        <div className="mt-8">
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Qismi</th>
                  <th className="p-3.5 sm:px-4">Vazifasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Chap tugma</td>
                  <td className="p-3.5 sm:px-4">Asosiy tugma: tanlash, ochish, tasdiqlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">O‘ng tugma</td>
                  <td className="p-3.5 sm:px-4">Kontekst menyusini (qo‘shimcha buyruqlar ro‘yxati) ochadi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">G‘ildirak (scroll)</td>
                  <td className="p-3.5 sm:px-4">Sahifani yuqoriga-pastga surish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">G‘ildirakni bosish (o‘rta tugma)</td>
                  <td className="p-3.5 sm:px-4">Havolani yangi varaqda ochish; varaqni yopish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Yon tugmalar</td>
                  <td className="p-3.5 sm:px-4">Ko‘pincha “Orqaga / Oldinga” (brauzerda). Hamma sichqonchada bo‘lmaydi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Sensor (optik ko‘z)</td>
                  <td className="p-3.5 sm:px-4">Pastdagi nur — harakatni o‘qiydi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">DPI</td>
                  <td className="p-3.5 sm:px-4">Sezgirlik: 1 sm harakatga kursor qancha piksel siljishi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Actions */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-fg mb-3">Sichqoncha amallari</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Amal</th>
                  <th className="p-3.5 sm:px-4">Natijasi</th>
                  <th className="p-3.5 sm:px-4">Misol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Bir marta bosish (chap)</td>
                  <td className="p-3.5 sm:px-4">Obyektni tanlaydi</td>
                  <td className="p-3.5 sm:px-4">Faylni belgilash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Ikki marta bosish</td>
                  <td className="p-3.5 sm:px-4">Obyektni ochadi</td>
                  <td className="p-3.5 sm:px-4">Papkani ochish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">O‘ng tugma</td>
                  <td className="p-3.5 sm:px-4">Kontekst menyu</td>
                  <td className="p-3.5 sm:px-4">“Nusxa olish / Nomini o‘zgartirish”</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Ushlab sudrash (drag & drop)</td>
                  <td className="p-3.5 sm:px-4">Obyektni ko‘chiradi</td>
                  <td className="p-3.5 sm:px-4">Faylni boshqa papkaga tashlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Ramka bilan tanlash</td>
                  <td className="p-3.5 sm:px-4">Bir nechta obyektni birdan belgilaydi</td>
                  <td className="p-3.5 sm:px-4">Bo‘sh joydan bosib, ushlab ramka chizish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg"><span className="kbd">Ctrl</span> + bosish</td>
                  <td className="p-3.5 sm:px-4">Tarqoq obyektlarni birma-bir qo‘shib tanlaydi</td>
                  <td className="p-3.5 sm:px-4">3 ta turli faylni tanlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg"><span className="kbd">Shift</span> + bosish</td>
                  <td className="p-3.5 sm:px-4">Birinchidan oxirgigacha <strong>hammasini</strong> tanlaydi</td>
                  <td className="p-3.5 sm:px-4">20 ta faylni ketma-ket tanlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg"><span className="kbd">Ctrl</span> + g‘ildirak</td>
                  <td className="p-3.5 sm:px-4">Masshtabni kattalashtirish/kichiklashtirish</td>
                  <td className="p-3.5 sm:px-4">Sahifa yozuvini kattalashtirish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg"><span className="kbd">Shift</span> + g‘ildirak</td>
                  <td className="p-3.5 sm:px-4">Gorizontal (yon tomonga) surish</td>
                  <td className="p-3.5 sm:px-4">Keng Excel jadvalida</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Cursor Shapes */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-fg mb-3">Kursor ko‘rinishi nimani bildiradi?</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Ko‘rinishi</th>
                  <th className="p-3.5 sm:px-4">Ma’nosi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Oddiy strelka</td>
                  <td className="p-3.5 sm:px-4">Tanlash mumkin, tizim tayyor</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Vertikal chiziq (I-shakl)</td>
                  <td className="p-3.5 sm:px-4">Bu yerga matn yozish mumkin</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Qo‘l (barmoq)</td>
                  <td className="p-3.5 sm:px-4">Havola — bosilsa boshqa sahifaga o‘tadi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Aylanuvchi doira / soat</td>
                  <td className="p-3.5 sm:px-4">Tizim band, kuting</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Ikki tomonlama strelka</td>
                  <td className="p-3.5 sm:px-4">Chegarani ushlab o‘lchamni o‘zgartirish mumkin</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">To‘rt tomonlama strelka</td>
                  <td className="p-3.5 sm:px-4">Obyektni sudrab ko‘chirish mumkin</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Man etish belgisi (⊘)</td>
                  <td className="p-3.5 sm:px-4">Bu joyga qo‘yib bo‘lmaydi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Cursor Grid */}
        <div className="mt-8">
          <div className="rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 p-5 text-sm sm:text-base leading-relaxed text-emerald-950 dark:text-emerald-100">
            <strong>Sinab ko‘ring:</strong> quyidagi kataklar ustiga sichqonchani olib boring — kursor
            real ravishda o‘sha ko‘rinishga o‘zgaradi. Bu talabaga kursor shakli nimani anglatishini
            eng tez tushuntiradigan usul.
          </div>

          <CursorGrid />
        </div>

        {/* Advice list */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xl font-bold text-fg tracking-tight mb-3">
            Aniqlikni oshirish bo‘yicha maslahatlar
          </h3>
          <ul className="space-y-2.5 text-sm sm:text-base leading-relaxed text-fg-muted list-disc pl-5">
            <li>
              <strong className="text-fg">Sezgirlikni sozlang:</strong> <em>Sozlamalar → Bluetooth va qurilmalar → Sichqoncha</em>.
              Juda tez kursor aniqlikni buzadi, juda sekin — vaqtni oladi. Ekranning bir chetidan ikkinchisiga{' '}
              <strong>bilakni siljitmasdan</strong> yetib borsangiz — tezlik to‘g‘ri sozlangan.
            </li>
            <li>
              <strong className="text-fg">Sichqonchani panja bilan emas, butun bilak bilan boshqaring</strong> — uzoq masofada aniqlik ortadi.
            </li>
            <li>
              <strong className="text-fg">Gilamcha (mousepad) ishlating.</strong> Yaltiroq yoki shishali stolda optik sensor adashadi.
            </li>
            <li>
              <strong className="text-fg">Ko‘tarib qayta qo‘yish</strong> odati: sichqoncha stol chetiga yetsa, uni ko‘taring va
              markazga qaytaring — kursor joyida qoladi.
            </li>
            <li>
              <strong className="text-fg">Sensorni tozalab turing:</strong> chang bosgan “ko‘z” kursorni sakratadi.
            </li>
            <li>
              <strong className="text-fg">Ikki marta bosish tezligini</strong> ham sozlash mumkin — agar papka ochilmasa, tezlikni pasaytiring.
            </li>
            <li>
              <strong className="text-fg">Imkon boricha qisqartmadan foydalaning:</strong> eng aniq sichqoncha — umuman ishlatilmagan sichqoncha.
            </li>
          </ul>
        </div>

        {/* Practice Links */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xl font-bold text-fg tracking-tight mb-1">
            Mashq uchun onlayn saytlar
          </h3>
          <p className="text-sm text-fg-muted mb-5">
            Sichqoncha aniqligini o‘lchaydigan bepul saytlar (barchasi brauzerda ishlaydi, ro‘yxatdan o‘tish talab qilinmaydi):
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {MOUSE_PRACTICE_LINKS.map((link) => (
              <a
                key={link.title}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-line bg-subtle p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-edge hover:bg-surface hover:shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-fg group-hover:text-blue-ink transition-colors">
                      {link.title}
                    </h4>
                    <ExternalLink className="h-4 w-4 text-fg-subtle group-hover:text-blue-ink transition-colors" />
                  </div>
                  <div className="font-mono text-xs font-semibold text-blue-ink mt-0.5">
                    {link.url}
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-fg-muted">
                    {link.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-5 text-sm sm:text-base leading-relaxed text-amber-900 dark:text-amber-200">
            <strong>Darsdagi topshiriq:</strong> <span className="font-mono font-bold text-blue-ink">mouseaccuracy.com</span> saytida
            o‘rtacha darajada 1 daqiqalik mashqni bajaring va <strong>aniqlik foizini</strong> daftaringizga yozing.
            So‘ng sichqoncha sezgirligini bir pog‘ona o‘zgartirib, mashqni takrorlang — natija yaxshilandimi?
          </div>
        </div>
      </section>
    </div>
  );
}
