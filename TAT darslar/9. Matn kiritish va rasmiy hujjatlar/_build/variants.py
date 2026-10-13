# -*- coding: utf-8 -*-
"""
Word 2-dars amaliy ishi: 6 ta variant (rasmiy hujjat namunalari).

Har bir hujjat bloklar ro'yxatidan iborat:
  ('right', [qatorlar])  — o'ngga tekislangan qatorlar ("kimga / kimdan" qismi)
  ('gap',)               — bitta bo'sh qator (bitta Enter)
  ('title', matn)        — sarlavha: qalin, markazda
  ('sub', matn)          — sarlavha ostidagi izoh: markazda, oddiy
  ('p', matn)            — asosiy matn abzatsi: ikki tomonga, xatboshi 1,25 sm
  ('left', matn)         — chapga tekislangan qator (sana, joy)
  ('sign', [qatorlar])   — o'ngga tekislangan imzo qatori (qatorlari)

Matnlar texnikum va shifoxona hayotidan olingan, ism-familiyalar to'qima.
Hajmi variantlarda deyarli bir xil: jami 85–105 so'z (asosiy matn 65–85 so'z).
"""

TEXNIKUM = 'Shahrisabz Tibbiyot Texnikumi'

VARIANTS = [
    dict(
        n=1, name='Ariza', title='Ariza yozish',
        about='O‘quv amaliyotini yashash joyidagi poliklinikada o‘tash uchun ruxsat so‘rab ariza.',
        interval=1.5,
        blocks=[
            ('right', ['Shahrisabz Tibbiyot Texnikumi',
                       'direktori nomiga',
                       '“Hamshiralik ishi” yo‘nalishi',
                       'Hi-26-02 guruh talabasi',
                       'Rahimova Dilnoza Baxtiyor qizidan']),
            ('gap',),
            ('title', 'ARIZA'),
            ('gap',),
            ('p', 'Men, Rahimova Dilnoza Baxtiyor qizi, 2026–2027 o‘quv yilida “Hamshiralik ishi asoslari” '
                  'fanidan o‘quv amaliyotini yashash joyim bo‘yicha Kitob tumani 3-sonli oilaviy poliklinikasida '
                  '(Kitob shahri, Mustaqillik ko‘chasi, 14-uy) o‘tashimga ruxsat berishingizni so‘rayman.'),
            ('p', 'Poliklinika rahbariyatining roziligi olingan, amaliyot rahbari — katta hamshira Z. Hamroyeva. '
                  'Amaliyot davomida kundalikni har kuni '
                  'to‘ldirib borishga, hisobotni esa belgilangan muddatda topshirishga va’da beraman.'),
            ('p', 'Ilova: poliklinika bosh shifokorining roziligi to‘g‘risidagi xat (1 varaq).'),
            ('gap',),
            ('left', '13.10.2026 y.'),
            ('sign', ['__________ (imzo) D. Rahimova']),
        ]),
    dict(
        n=2, name='Tushuntirish xati', title='Tushuntirish xati yozish',
        about='Darsga kechikib kelish sababi haqida bo‘lim mudiriga tushuntirish xati.',
        interval=1.0,
        blocks=[
            ('right', ['“Hamshiralik ishi” bo‘limi',
                       'mudiri X. Toshpo‘latovaga',
                       'Hi-26-01 guruh talabasi',
                       'Qodirov Jasur Alisher o‘g‘lidan']),
            ('gap',),
            ('title', 'TUSHUNTIRISH XATI'),
            ('gap',),
            ('p', 'Men, Qodirov Jasur Alisher o‘g‘li, 2026-yil 12-oktabr kuni 1-juftlikdagi “Tibbiyotda '
                  'axborot texnologiyalari” darsiga 25 daqiqa kechikib keldim. Bunga quyidagi sabab bo‘ldi: '
                  'Yakkabog‘ tumanidan Shahrisabz shahriga qatnaydigan 112-yo‘nalish avtobusi yo‘lda buzilib '
                  'qoldi va yo‘lovchilar boshqa transportni 40 daqiqa kutishga majbur bo‘ldi.'),
            ('p', 'Bu haqda guruh rahbari N. Ergashevaga telefon orqali xabar berganman. Kelgusida darslarga '
                  'o‘z vaqtida kelish uchun uydan ertaroq (soat 7:00 da) chiqishga va’da beraman.'),
            ('p', 'O‘tkazib yuborilgan mavzuni (“Word’da matn kiritish qoidalari”) mustaqil o‘rganib, amaliy '
                  'topshiriqni belgilangan muddatda topshiraman.'),
            ('gap',),
            ('left', '12.10.2026 y.'),
            ('sign', ['__________ (imzo) J. Qodirov']),
        ]),
    dict(
        n=3, name='Bildirishnoma', title='Bildirishnoma yozish',
        about='Bo‘limda tibbiy buyumlar zaxirasi kamayganini bosh hamshiraga ma’lum qilish.',
        interval=1.5,
        blocks=[
            ('right', ['Shahrisabz tuman tibbiyot birlashmasi',
                       'bosh hamshirasi M. Yo‘ldoshevaga',
                       'terapiya bo‘limi katta hamshirasi',
                       'S. Murodovadan']),
            ('gap',),
            ('title', 'BILDIRISHNOMA'),
            ('gap',),
            ('p', 'Sizga ma’lum qilamanki, 2026-yil 10-oktabr holatiga ko‘ra terapiya bo‘limida (40 o‘rinli) '
                  'quyidagi tibbiy buyumlarning zaxirasi kamayib qoldi: steril bint — 15 o‘ram, bir martalik '
                  'shprits (5 ml) — 120 dona, tibbiy qo‘lqop — 6 quti.'),
            ('p', 'Bo‘limda har kuni o‘rtacha 35–40 nafar bemorga muolaja qilinadi. Mavjud zaxira atigi '
                  '3–4 kunga yetadi. Shuningdek, bir martalik tibbiy niqoblar ham tugab bormoqda.'),
            ('p', 'Yuqoridagilarni inobatga olib, bo‘limga zarur tibbiy buyumlarni 2026-yil 15-oktabrgacha '
                  'yetkazib berishingizni so‘rayman.'),
            ('gap',),
            ('left', '10.10.2026 y.'),
            ('sign', ['__________ (imzo) S. Murodova']),
        ]),
    dict(
        n=4, name='Tavsifnoma', title='Tavsifnoma yozish',
        about='Guruh rahbari tomonidan talabaga beriladigan tavsifnoma.',
        interval=1.0,
        blocks=[
            ('title', 'TAVSIFNOMA'),
            ('gap',),
            ('p', 'Ismoilova Madina Akmal qizi 2009-yilda Qashqadaryo viloyati Shahrisabz tumanida tug‘ilgan. '
                  '2026-yildan buyon Shahrisabz Tibbiyot Texnikumining “Hamshiralik ishi” yo‘nalishida '
                  '(Hi-26-03 guruh) kunduzgi ta’lim shaklida tahsil olmoqda.'),
            ('p', 'O‘qish davomida o‘zini intizomli, mas’uliyatli va mehnatsevar talaba sifatida ko‘rsatdi. '
                  'Fanlarni “yaxshi” va “a’lo” baholarga o‘zlashtirmoqda. Ayniqsa, “Hamshiralik ishi asoslari” '
                  'va “Anatomiya” fanlariga qiziqishi yuqori.'),
            ('p', 'Guruhdoshlari va o‘qituvchilar bilan muomalasi yaxshi, jamoat ishlarida faol qatnashadi. '
                  'Texnikumning “Sog‘lom turmush tarzi” to‘garagi a’zosi.'),
            ('p', 'Tavsifnoma talab qilingan joyga taqdim etish uchun berildi.'),
            ('gap',),
            ('left', '13.10.2026 y.'),
            ('sign', ['Guruh rahbari: __________ (imzo) N. Ergasheva']),
        ]),
    dict(
        n=5, name='Dalolatnoma', title='Dalolatnoma yozish',
        about='Bo‘limga yetkazib berilgan tibbiy jihozlarni qabul qilish to‘g‘risida dalolatnoma.',
        interval=1.5,
        blocks=[
            ('title', 'DALOLATNOMA'),
            ('sub', 'tibbiy jihozlarni qabul qilish to‘g‘risida'),
            ('gap',),
            ('left', '2026-yil 13-oktabr, Shahrisabz shahri'),
            ('gap',),
            ('p', 'Biz, quyida imzo chekuvchilar: komissiya raisi — bosh hamshira M. Yo‘ldosheva, a’zolar — '
                  'katta hamshira S. Murodova va omborchi B. Xolmatov, ushbu dalolatnomani quyidagilar haqida tuzdik.'),
            ('p', '2026-yil 13-oktabr kuni “Medtexnika” MChJ terapiya bo‘limiga quyidagi tibbiy jihozlarni '
                  'yetkazib berdi: raqamli tonometr — 4 dona, elektron termometr — 10 dona, pulsoksimetr — 3 dona.'),
            ('p', 'Jihozlar ko‘zdan kechirildi: soni hujjatga mos, tashqi ko‘rinishi butun, barchasi ishlaydi '
                  '(sinovdan o‘tkazildi). Jihozlar bo‘lim katta hamshirasi S. Murodovaga hisobga topshirildi.'),
            ('gap',),
            ('sign', ['Komissiya raisi: __________ M. Yo‘ldosheva',
                      'A’zolar: __________ S. Murodova',
                      '__________ B. Xolmatov']),
        ]),
    dict(
        n=6, name='Navbatchilik hisoboti', title='Navbatchilik hisobotini yozish',
        about='Tungi navbatchilik yakunida bo‘lim mudiriga yoziladigan hisobot.',
        interval=1.0,
        blocks=[
            ('right', ['Jarrohlik bo‘limi mudiri',
                       'A. Normatovga',
                       'navbatchi hamshira',
                       'G. Saidovadan']),
            ('gap',),
            ('title', 'HISOBOT'),
            ('sub', '2026-yil 12–13-oktabr kungi tungi navbatchilik haqida'),
            ('gap',),
            ('p', 'Navbatchilik soat 20:00 da qabul qilinib, ertasi kuni soat 08:00 da topshirildi. Navbatchilik '
                  'boshida bo‘limda 28 nafar bemor bor edi, tunda qabul bo‘limidan yana 2 nafar bemor '
                  'yotqizildi (jami 30 nafar).'),
            ('p', 'Shifokor tayinlagan barcha muolajalar o‘z vaqtida bajarildi. 5-palatadagi bemor R. Karimovning '
                  '(68 yosh) qon bosimi soat 02:30 da 170/100 mm sim. ust. gacha ko‘tarildi. Navbatchi shifokor '
                  'chaqirildi, tayinlangan dori berildi, soat 04:00 da bosim 135/85 gacha tushdi.'),
            ('p', 'Bo‘limda favqulodda holatlar bo‘lmadi. Dori vositalari va tibbiy buyumlar navbatdagi '
                  'hamshiraga ro‘yxat bo‘yicha topshirildi.'),
            ('gap',),
            ('left', '13.10.2026 y.'),
            ('sign', ['__________ (imzo) G. Saidova']),
        ]),
]

# Baholash mezonlari: 10 ta mezon x 0,5 ball = 5 ball
CRITERIA = [
    ('Sahifa maydonlari', 'chap 3 sm, o‘ng 1,5 sm, yuqori va pastki 2 sm'),
    ('Shrift', 'butun hujjatda Times New Roman, 14 pt'),
    ('Matn to‘liq', 'birorta so‘z, raqam yoki qator tushib qolmagan'),
    ('Imlo', 'xato yo‘q; o‘ va g‘ harflari belgi bilan yozilgan (o‘, g‘ — “o`” yoki “o” emas)'),
    ('Enter', 'faqat abzats oxirida; ortiqcha bo‘sh qator yo‘q (¶ bilan tekshiriladi)'),
    ('Probel', 'so‘zlar orasida bitta; matn probel bilan surilmagan (¶)'),
    ('Tinish belgilari', 'oldidan probel yo‘q, keyin bor; qavs va qo‘shtirnoq ichida chetga probel yo‘q'),
    ('Sarlavha va tekislash', 'sarlavha qalin va markazda; “kimga”, sana va imzo namunadagidek'),
    ('Asosiy matn', 'ikki tomonga tekislangan, xatboshi 1,25 sm'),
    ('Interval va fayl', 'qatorlar oralig‘i variantdagidek; Familiya_V№.docx nomi bilan saqlangan'),
]

GRADES = [('4,5–5', '5 (a’lo)'), ('3,5–4', '4 (yaxshi)'), ('2,5–3', '3 (qoniqarli)'), ('2,5 dan kam', '2 (qoniqarsiz)')]


def interval_str(v):
    return '1,5' if v == 1.5 else '1,0'


def interval_key(v):
    return '5' if v == 1.5 else '1'


def word_count(V):
    n = 0
    for b in V['blocks']:
        if b[0] in ('p',):
            n += len(b[1].split())
    return n
