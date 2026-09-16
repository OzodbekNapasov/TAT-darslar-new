'use client';

import React from 'react';
import { Keyboard, Info, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import { KeyboardMap } from './keyboard-map';
import { KeyDetector } from './key-detector';

export function TabKeyboard() {
  return (
    <div className="space-y-8">
      {/* 1. Main Overview Section */}
      <section className="rounded-3xl border border-line bg-surface p-6 sm:p-9 shadow-card">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-tint text-blue-ink">
            <Keyboard className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-fg tracking-tight">
              Klaviatura — kompyuterning asosiy kiritish qurilmasi
            </h2>
            <p className="text-xs font-semibold text-fg-subtle">
              1-qism: Klaviatura tuzilishi, guruhlar va rejimlar
            </p>
          </div>
        </div>

        {/* Info callout */}
        <div className="mt-6 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
          <strong>Klaviatura</strong> — matn, raqam va buyruqlarni kompyuterga kiritish uchun xizmat qiladigan
          qurilma. Standart klaviaturada <strong>101–105 ta klavisha</strong> bo‘lib, ular vazifasiga ko‘ra{' '}
          <strong>6 ta guruhga</strong> bo‘linadi. Professional ishlash — bu barcha klavishalarni yod olish emas,
          balki <strong>har bir guruh nima uchun kerakligini bilish</strong> va qo‘lni klaviaturadan uzmasdan ishlashdir.
        </div>

        {/* Interactive Keyboard Map */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg">
            Klaviatura xaritasi — klavishalar ranglar bo‘yicha guruhlangan
          </h3>
          <p className="mt-1 text-sm text-fg-muted">
            Quyidagi ranglardan birini bosing — o‘sha guruh ajralib qoladi, qolganlari xiralashadi.{' '}
            <strong>Klaviaturadagi istalgan tugmani bossangiz, u sxemada sariq rangda yonadi</strong>{' '}
            (avval sxemani sichqoncha bilan bosing).
          </p>

          <KeyboardMap />
        </div>

        {/* Table 1: Groups */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-fg mb-3">Klavishalar guruhlari</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Guruh</th>
                  <th className="p-3.5 sm:px-4">Klavishalar</th>
                  <th className="p-3.5 sm:px-4">Vazifasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Alfavit-raqamli</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">A–Z</span> <span className="kbd">0–9</span> <span className="kbd">, . ; :</span>
                  </td>
                  <td className="p-3.5 sm:px-4">Harf, raqam va tinish belgilarini kiritish. Klaviaturaning markaziy, eng katta qismi.</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Funksional</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">F1</span> … <span className="kbd">F12</span>
                  </td>
                  <td className="p-3.5 sm:px-4">
                    Dasturga qarab turli buyruqlarni bajaradi: <span className="kbd">F1</span> — yordam,{' '}
                    <span className="kbd">F2</span> — nomini o‘zgartirish, <span className="kbd">F5</span> — yangilash,{' '}
                    <span className="kbd">F11</span> — to‘liq ekran.
                  </td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Boshqaruv (modifikator)</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">Ctrl</span> <span className="kbd">Alt</span> <span className="kbd">Shift</span> <span className="kbd">Win</span>
                  </td>
                  <td className="p-3.5 sm:px-4">
                    Yolg‘iz ishlatilmaydi — boshqa klavisha bilan <strong>birga</strong> bosilib, qisqartma (shortcut) hosil qiladi.
                  </td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Kursor boshqaruvi</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">↑</span> <span className="kbd">↓</span> <span className="kbd">←</span> <span className="kbd">→</span>{' '}
                    <span className="kbd">Home</span> <span className="kbd">End</span> <span className="kbd">PgUp</span> <span className="kbd">PgDn</span>
                  </td>
                  <td className="p-3.5 sm:px-4">
                    Kursorni matn ichida va sahifada harakatlantirish. <span className="kbd">Home</span> — qator boshiga,{' '}
                    <span className="kbd">End</span> — qator oxiriga.
                  </td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Raqamli blok (NumPad)</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">0–9</span> <span className="kbd">+ − × ÷</span> <span className="kbd">Enter</span>
                  </td>
                  <td className="p-3.5 sm:px-4">
                    Katta hajmdagi raqamlarni tez kiritish uchun (kalkulyator kabi). <span className="kbd">Num Lock</span> yoqiq bo‘lishi shart.
                  </td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Maxsus (xizmat)</td>
                  <td className="p-3.5 sm:px-4">
                    <span className="kbd">Esc</span> <span className="kbd">Tab</span> <span className="kbd">Enter</span>{' '}
                    <span className="kbd">Backspace</span> <span className="kbd">Delete</span> <span className="kbd">Space</span>
                  </td>
                  <td className="p-3.5 sm:px-4">
                    Amalni bekor qilish, tasdiqlash, o‘chirish va bo‘sh joy qo‘yish.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Most used keys */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-3">Eng ko‘p ishlatiladigan klavishalar va ularning aniq vazifasi</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Klavisha</th>
                  <th className="p-3.5 sm:px-4">Vazifasi</th>
                  <th className="p-3.5 sm:px-4">Amaliy misol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Enter</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Tasdiqlash yoki yangi qatorga o‘tish</td>
                  <td className="p-3.5 sm:px-4">Word‘da yangi abzats boshlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Esc</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Amalni bekor qilish, oynani yopish</td>
                  <td className="p-3.5 sm:px-4">Ochilgan menyuni yopish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Tab</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Keyingi maydonga o‘tish, abzats tashlash</td>
                  <td className="p-3.5 sm:px-4">Saytda login‘dan parol maydoniga o‘tish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Backspace</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Kursordan <strong>chapdagi</strong> belgini o‘chiradi</td>
                  <td className="p-3.5 sm:px-4">Xato yozilgan harfni o‘chirish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Delete</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Kursordan <strong>o‘ngdagi</strong> belgini yoki tanlangan faylni o‘chiradi</td>
                  <td className="p-3.5 sm:px-4">Faylni savatga tashlash</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Space</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Bo‘sh joy qo‘yish</td>
                  <td className="p-3.5 sm:px-4">So‘zlar orasini ajratish</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Shift</span> + harf</td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Bitta harfni bosh harf qilib yozadi</td>
                  <td className="p-3.5 sm:px-4"><em>Toshkent</em> so‘zining bosh harfi</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Insert</span></td>
                  <td className="p-3.5 sm:px-4 font-medium text-fg">Kiritish/almashtirish rejimini almashtiradi</td>
                  <td className="p-3.5 sm:px-4">Yoqilganda yangi harf eskisining ustiga yoziladi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 3: Indicator keys */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-fg mb-3">Rejim klavishalari va indikator chiroqchalari</h3>
          <div className="overflow-x-auto rounded-2xl border border-line shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-subtle text-fg border-b border-line font-bold">
                <tr>
                  <th className="p-3.5 sm:px-4">Klavisha</th>
                  <th className="p-3.5 sm:px-4">Yoqilganda nima bo‘ladi</th>
                  <th className="p-3.5 sm:px-4">Tez-tez uchraydigan muammo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-fg-muted">
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Caps Lock</span></td>
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Barcha harflar <strong>BOSH HARF</strong> bilan yoziladi</td>
                  <td className="p-3.5 sm:px-4">Parol qabul qilinmayapti? Ko‘pincha Caps Lock yoqiq qolgan bo‘ladi.</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Num Lock</span></td>
                  <td className="p-3.5 sm:px-4 font-bold text-fg">O‘ng tomondagi raqamli blok ishlaydi</td>
                  <td className="p-3.5 sm:px-4">O‘chiq bo‘lsa, raqam o‘rniga kursor harakatlanadi.</td>
                </tr>
                <tr className="hover:bg-subtle/50 transition-colors">
                  <td className="p-3.5 sm:px-4"><span className="kbd">Scroll Lock</span></td>
                  <td className="p-3.5 sm:px-4 font-bold text-fg">Excel‘da strelkalar kursorni emas, butun jadvalni suradi</td>
                  <td className="p-3.5 sm:px-4">Excel‘da katakdan katakka o‘tolmayapsizmi — Scroll Lock‘ni o‘chiring.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Language alert */}
        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-500/10 p-5 text-sm sm:text-base leading-relaxed text-amber-900 dark:text-amber-200">
          <strong>Alifbo va til almashtirish:</strong> <span className="kbd">Alt</span> + <span className="kbd">Shift</span>{' '}
          yoki <span className="kbd">Win</span> + <span className="kbd">Space</span>. O‘zbek tili uchun kompyuterda{' '}
          <strong>lotin</strong> va <strong>kirill</strong> tartiblari alohida qo‘shiladi:{' '}
          <em>Sozlamalar → Vaqt va til → Til va mintaqa</em>. <span className="kbd">ʻ</span> (tutuq belgisi) — apostrof
          klavishasi, u <strong>o‘</strong> va <strong>g‘</strong> harflarini yozishda kerak bo‘ladi.
        </div>

        {/* Section: Shortcuts explanation */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xl font-bold text-fg tracking-tight">
            Tezkor klaviaturalar nima uchun kerak?
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg-muted">
            Yuqoridagi jadvalda <strong>boshqaruv (modifikator) klavishalari</strong> —{' '}
            <span className="kbd">Ctrl</span>, <span className="kbd">Alt</span>, <span className="kbd">Shift</span>,{' '}
            <span className="kbd">Win</span> — yolg‘iz o‘zi hech qanday belgi yozmasligini ko‘rdik. Ularning
            butun vazifasi — <strong>boshqa klavishaning ma’nosini o‘zgartirish</strong>. Masalan,{' '}
            <span className="kbd">S</span> klavishasi oddiy holatda “s” harfini yozadi, ammo <span className="kbd">Ctrl</span> bilan
            birga bosilsa — hujjatni <em>saqlash</em> buyrug‘iga aylanadi. Ana shu birikma{' '}
            <strong>tezkor klaviatura</strong> (qisqartma, ing. <em>shortcut</em>) deb ataladi.
          </p>

          <div className="mt-5 rounded-2xl border-l-4 border-blue-500 bg-blue-tint p-5 text-sm sm:text-base leading-relaxed text-blue-950 dark:text-blue-100">
            <strong>Qanday bosiladi?</strong> <span className="kbd">Ctrl</span> + <span className="kbd">S</span> yozuvi
            “ikkalasini navbat bilan bosing” degani emas. Avval <span className="kbd">Ctrl</span> ni{' '}
            <strong>bosib ushlab turasiz</strong>, ushlab turgan holda <span className="kbd">S</span> ni bosib qo‘yib
            yuborasiz, keyin <span className="kbd">Ctrl</span> ni qo‘yib yuborasiz. Uch klavishali birikmalarda
            (masalan, <span className="kbd">Ctrl</span> + <span className="kbd">Shift</span> + <span className="kbd">Esc</span>)
            ham xuddi shu tartib: avval ikkita boshqaruv klavishasi ushlanadi, oxirgisi bosiladi.
          </div>

          <p className="mt-6 text-sm font-bold text-fg">
            Tezkor klaviaturalar quyidagi sabablarga ko‘ra professional ishlashning asosi hisoblanadi:
          </p>

          <ol className="mt-3 space-y-2.5 text-sm sm:text-base leading-relaxed text-fg-muted list-decimal pl-5">
            <li>
              <strong className="text-fg">Vaqtni tejaydi.</strong> Sichqoncha bilan menyudan buyruq topish 2–3 soniya vaqt oladi:
              qo‘lni klaviaturadan uzish, sichqonchani ushlash, kursorni nishonga olib borish, bosish, yana
              qo‘lni klaviaturaga qaytarish. Tezkor klaviatura esa bir soniyaga ham yetmaydi. Bir kunda
              yuzlab marta takrorlansa, bu <strong>soatlab tejalgan vaqt</strong> demakdir.
            </li>
            <li>
              <strong className="text-fg">Diqqatni bo‘lmaydi.</strong> Qo‘l klaviaturada qolgani uchun yozish ritmi buzilmaydi.
              Sichqonchaga har safar o‘tish esa fikrni uzadi va matn yozish sur’atini pasaytiradi.
            </li>
            <li>
              <strong className="text-fg">Universal.</strong> <span className="kbd">Ctrl</span> + <span className="kbd">C</span> /{' '}
              <span className="kbd">V</span> / <span className="kbd">Z</span> deyarli <strong>barcha dasturlarda bir xil</strong>{' '}
              ishlaydi — Word’da ham, brauzerda ham, fayllar oynasida ham. Bir marta o‘rgansangiz, umrbod asqotadi.
            </li>
            <li>
              <strong className="text-fg">Ba’zi buyruqlarni faqat shu yo‘l bilan bajarish mumkin.</strong> Masalan, dastur qotib qolganda
              Vazifalar dispetcherini ochish yoki kompyuterni tez qulflab qo‘yish menyudan qidirishdan ancha tez.
            </li>
            <li>
              <strong className="text-fg">Zaxira imkoniyat.</strong> Sichqoncha buzilsa yoki batareyasi tugasa, faqat klaviatura bilan ham
              ishni davom ettira olasiz: <span className="kbd">Tab</span> bilan maydonlar orasida yurish,{' '}
              <span className="kbd">Enter</span> bilan tasdiqlash, <span className="kbd">Alt</span> + <span className="kbd">Tab</span> bilan
              oynani almashtirish.
            </li>
            <li>
              <strong className="text-fg">Sog‘liq uchun foydali.</strong> Kun bo‘yi sichqonchani ushlab turish bilak va yelka bo‘g‘imini
              zo‘riqtiradi. Qo‘l klaviaturada turgani charchoqni kamaytiradi.
            </li>
          </ol>

          <div className="mt-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-500/10 p-5 text-sm sm:text-base leading-relaxed text-emerald-950 dark:text-emerald-100">
            <strong>Qanday o‘rganish kerak?</strong> Hammasini birdan yodlashga urinmang — bu foyda bermaydi.
            Bir haftada <strong>atigi 4 tasini</strong> oling va ularni <em>faqat</em> klaviatura orqali bajarishga
            o‘zingizni majbur qiling. Boshlash uchun eng foydalilari:{' '}
            <span className="kbd">Ctrl</span>+<span className="kbd">S</span> (saqlash),{' '}
            <span className="kbd">Ctrl</span>+<span className="kbd">Z</span> (bekor qilish),{' '}
            <span className="kbd">Alt</span>+<span className="kbd">Tab</span> (oyna almashtirish) va{' '}
            <span className="kbd">Win</span>+<span className="kbd">L</span> (kompyuterni qulflash).
            Keyingi haftada yana 4 tasini qo‘shasiz. Bir oyda ular ongsiz ravishda, o‘ylab o‘tirmasdan bajariladigan
            ko‘nikmaga aylanadi. <strong>3-bo‘limdagi viktorina</strong> orqali o‘zingizni sinab ko‘rishingiz mumkin.
          </div>
        </div>

        {/* Live Key Detector */}
        <div className="mt-10 border-t border-line pt-8">
          <h3 className="text-xl font-bold text-fg tracking-tight mb-2">
            Amaliy mashq — jonli klavisha detektori
          </h3>
          <p className="text-sm text-fg-muted mb-5">
            Quyidagi qora maydonni bosing (u yoritiladi), so‘ng istalgan klavishani bosing. Ekranda uning nomi,
            texnik kodi va bosilgan boshqaruv klavishalari ko‘rinadi. Proyektorda ko‘rsatish uchun qulay.
          </p>

          <KeyDetector />
        </div>
      </section>
    </div>
  );
}
