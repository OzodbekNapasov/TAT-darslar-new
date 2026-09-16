'use client';

import React from 'react';
import { Zap, Play, ExternalLink, Award, CheckCircle, AlertTriangle } from 'lucide-react';
import { TypingTrainer } from './typing-trainer';

export function TabTyping() {
  return (
    <div className="space-y-8">
      {/* 1. Theory & Rules */}
      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-card">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-fg tracking-tight">
              Tez va xatosiz yozishni o‘rganish
            </h2>
            <p className="text-xs font-semibold text-fg-subtle">
              2-qism: Yozuv tezligi, WPM ko‘rsatkichi va qoidalar
            </p>
          </div>
        </div>

        {/* Info callout */}
        <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
          <strong>Asosiy qoida: avval ANIQLIK, keyin TEZLIK.</strong> Xato bilan yozilgan matnni tuzatish
          uni sekin, ammo to‘g‘ri yozishdan ko‘ra ko‘proq vaqt oladi. Tezlik — aniqlikning tabiiy natijasi:
          kundalik 10–15 daqiqalik mashq 2–3 haftada natijani sezilarli oshiradi.
        </div>

        {/* Measurement stats cards */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-4">
            Yozuv tezligi qanday o‘lchanadi?
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-subtle p-5">
              <div className="text-xs font-black uppercase tracking-wider text-fg-subtle">WPM</div>
              <div className="mt-1 text-2xl font-black text-blue-ink">so‘z / daqiqa</div>
              <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                Words Per Minute. Har 5 ta belgi 1 ta “so‘z” deb hisoblanadi.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-subtle p-5">
              <div className="text-xs font-black uppercase tracking-wider text-fg-subtle">CPM</div>
              <div className="mt-1 text-2xl font-black text-indigo-600 dark:text-indigo-400">belgi / daqiqa</div>
              <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                Characters Per Minute. CPM ≈ WPM × 5.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-subtle p-5">
              <div className="text-xs font-black uppercase tracking-wider text-fg-subtle">Aniqlik</div>
              <div className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">%</div>
              <p className="mt-2 text-xs leading-relaxed text-fg-muted">
                To‘g‘ri yozilgan belgilar ulushi. 95% dan past bo‘lsa — tezlikni kamaytiring.
              </p>
            </div>
          </div>
        </div>

        {/* Levels table */}
        <div className="mt-8">
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Daraja</th>
                  <th className="p-3.5 sm:px-4">Tezlik (WPM)</th>
                  <th className="p-3.5 sm:px-4">Izoh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Boshlang‘ich</td>
                  <td className="p-3.5 sm:px-4 font-mono font-bold">0 – 20</td>
                  <td className="p-3.5 sm:px-4">Klavishalarni ko‘z bilan qidiradi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">O‘rta</td>
                  <td className="p-3.5 sm:px-4 font-mono font-bold">20 – 40</td>
                  <td className="p-3.5 sm:px-4">Ko‘p klavishalar yodda, ba’zan qaraydi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors bg-blue-tint/30">
                  <td className="p-3.5 sm:px-4 font-bold text-blue-ink">Yaxshi</td>
                  <td className="p-3.5 sm:px-4 font-mono font-bold text-blue-ink">40 – 60</td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Klaviaturaga deyarli qaramaydi — <strong>bizning maqsad</strong></td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Professional</td>
                  <td className="p-3.5 sm:px-4 font-mono font-bold">60 dan yuqori</td>
                  <td className="p-3.5 sm:px-4">Kotib, dasturchi, operator darajasi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 7 rules */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-3">Tez yozishning 7 ta qoidasi</h3>
          <ol className="space-y-2.5 text-sm sm:text-base leading-relaxed text-fg-muted list-decimal pl-5">
            <li>
              <strong className="text-fg">Klaviaturaga emas, ekranga qarang.</strong> Boshda sekin bo‘ladi, lekin faqat shu yo‘l bilan tezlik ortadi.
            </li>
            <li>
              <strong className="text-fg">Har bir xatoni darrov tuzatishga shoshilmang.</strong> Avval bir jumlani oxirigacha yozing.
            </li>
            <li>
              <strong className="text-fg">Bir maromda (ritm bilan) yozing.</strong> Notekis “portlash” tezligi xatolarni ko‘paytiradi.
            </li>
            <li>
              <strong className="text-fg">Bo‘sh joyni katta barmoq bilan bosing</strong> — qo‘lni siljitish shart emas.
            </li>
            <li>
              <strong className="text-fg">Qisqartmalardan foydalaning:</strong> matnni sichqoncha bilan emas, <span className="kbd">Shift</span> + strelka bilan belgilang (3-tabga qarang).
            </li>
            <li>
              <strong className="text-fg">Har 20–25 daqiqada 2 daqiqa tanaffus</strong> — barmoq va bilak charchamasligi uchun.
            </li>
            <li>
              <strong className="text-fg">To‘g‘ri o‘tirish:</strong> tirsak ~90°, bilak stolda, monitor ko‘z balandligida, orqa tik.
            </li>
          </ol>
        </div>

        {/* Important note */}
        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-5 text-sm sm:text-base leading-relaxed text-amber-900 dark:text-amber-200">
          <strong>Muhim eslatma:</strong> bu darsda barmoqlarni klavishalarga qanday joylashtirish (10 barmoq usuli)
          o‘rgatilmaydi. Maqsad — <strong>o‘zingizga qulay tarzda, lekin klaviaturaga qaramasdan</strong>, tez va
          xatosiz yozishga o‘tish.
        </div>
      </section>

      {/* 2. Platform: teztype.uz */}
      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-card">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
            <Play className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-fg tracking-tight">
              Mashq platformasi: teztype.uz
            </h2>
            <p className="text-xs font-semibold text-fg-subtle">
              O‘zbek tili uchun yaratilgan bepul yozuv tezligi platformasi
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
          <strong>TezType</strong> (<span className="font-mono font-bold">teztype.uz</span>) — o‘zbek tili uchun yaratilgan
          bepul yozuv tezligi mashq platformasi. Shiori: <em>“Avval aniqlik, keyin tezlik”</em>.{' '}
          <strong>Ro‘yxatdan o‘tish shart emas</strong> — saytga kirib darrov mashqni boshlash mumkin
          (natijalarni saqlab borish uchungina hisob ochiladi).
        </div>

        <div className="mt-6">
          <a
            href="https://www.teztype.uz/play"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition-all hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>teztype.uz/play — mashqni boshlash</span>
            <ExternalLink className="h-4 w-4 opacity-75 ml-1" />
          </a>
        </div>

        {/* Modes table */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-3">Saytdagi rejimlar</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Rejim</th>
                  <th className="p-3.5 sm:px-4">Nima qilinadi</th>
                  <th className="p-3.5 sm:px-4">Qachon ishlatiladi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Tezlik testi</td>
                  <td className="p-3.5 sm:px-4">
                    Tasodifiy so‘zlarni <strong>15 / 30 / 60 / 120 soniya</strong> davomida yozish, oxirida WPM va aniqlik chiqadi
                  </td>
                  <td className="p-3.5 sm:px-4 font-medium text-blue-ink">Asosiy o‘lchov — darsda va har mashqdan keyin</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">So‘z yomg‘iri</td>
                  <td className="p-3.5 sm:px-4">Yuqoridan tushayotgan so‘zlarni pastga yetguncha yozib ulgurish (o‘yin ko‘rinishida)</td>
                  <td className="p-3.5 sm:px-4">Zerikmasdan mashq qilish, reaksiyani tezlashtirish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Ghost Race (poyga)</td>
                  <td className="p-3.5 sm:px-4">O‘zingizning oldingi natijangiz yoki raqib bilan poyga</td>
                  <td className="p-3.5 sm:px-4">Shaxsiy rekordni yangilash uchun</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">O‘z matning</td>
                  <td className="p-3.5 sm:px-4">O‘zingiz kiritgan matn ustida mashq (masalan, dars konspekti yoki tibbiy atamalar)</td>
                  <td className="p-3.5 sm:px-4">Kasbiy atamalarni yozishni mashq qilish</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 p-5 text-sm sm:text-base leading-relaxed text-emerald-950 dark:text-emerald-100">
          <strong>Klaviatura tartibini tanlang:</strong> sayt <strong>lotin</strong>, <strong>kirill</strong>,{' '}
          <strong>ingliz</strong> va <strong>rus</strong> tartiblarini qo‘llab-quvvatlaydi. Mashqni o‘zingiz
          kundalik ishlatadigan tartibda qiling — aks holda ko‘nikma boshqa tartibga o‘tmaydi.
        </div>

        {/* Task */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-3">Darsdagi topshiriq</h3>
          <ol className="space-y-2 text-sm sm:text-base leading-relaxed text-fg-muted list-decimal pl-5">
            <li><span className="font-mono font-bold text-blue-ink">teztype.uz/play</span> ni oching va <strong>lotin</strong> tartibini tanlang.</li>
            <li><strong>60 soniyalik</strong> tezlik testini <strong>3 marta</strong> bajaring.</li>
            <li>Har safar WPM va aniqlik foizini quyidagi jadvalga yozib boring.</li>
            <li>Uchala urinishni solishtiring: tezlik oshdimi yoki aniqlik tushdimi?</li>
          </ol>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Urinish</th>
                  <th className="p-3.5 sm:px-4">WPM (so‘z/daq)</th>
                  <th className="p-3.5 sm:px-4">Aniqlik (%)</th>
                  <th className="p-3.5 sm:px-4">Xato soni</th>
                  <th className="p-3.5 sm:px-4">Xulosa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted font-medium">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">1-urinish</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">2-urinish</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">3-urinish</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                  <td className="p-3.5 sm:px-4">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Offline typing trainer */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xl font-bold text-fg tracking-tight mb-2">
            Zaxira variant — sahifadagi yozuv trenajyori
          </h3>
          <p className="text-sm text-fg-muted mb-5">
            Agar internet uzilib qolsa yoki sayt ochilmasa, mashqni shu yerdayoq bajarish mumkin.
            Pastdagi maydonga yozishni boshlang — taymer avtomatik ishga tushadi.
          </p>

          <TypingTrainer />
        </div>
      </section>
    </div>
  );
}
