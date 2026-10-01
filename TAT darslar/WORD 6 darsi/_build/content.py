# -*- coding: utf-8 -*-
"""
MS Word: 6 ta amaliy mashg'ulot — mazmun.
Manba: ../MS_Word_6_Darslik_Amaliy_Dastur.docx (tuzatilgan va tibbiyot texnikumiga moslashtirilgan).

Belgilash:  [[Ctrl]]  -> tugma ko'rinishi (key-cap)
Har bir dars: maqsad, amallar (1-qism), tezkor tugmalar (2-qism), amaliy vazifa va namuna (3-qism).
"""

TEXNIKUM = "Shahrisabz Tibbiyot Texnikumi"
GURUH = "Hi-26-02"

LESSONS = [
    # ==================================================================
    # 1-DARS
    # ==================================================================
    dict(
        n=1,
        short="Varaq sozlamalari va formatlash",
        title="Varaq sozlamalari, matn terish va asosiy formatlash",
        goal="Bo‘sh hujjat bilan ishlashni boshlashdan oldin standart talablarni o‘rnatish, shrift bilan to‘g‘ri ishlash va hujjatni yo‘qotmaslik uchun saqlash madaniyatini shakllantirish.",
        search="varaq a4 kitob albom maydonlar поля shrift times new roman 14 tekislash qizil qator abzats interval saqlash ctrl s ariza",
        actions=[
            dict(t="Varaq o‘lchami va yo‘nalishi",
                 path="Макет → Размер → A4 &nbsp;•&nbsp; Макет → Ориентация",
                 en="Layout → Size / Orientation",
                 steps=["<b>Макет</b> (Layout) yorlig‘ini oching.",
                        "<b>Размер</b> (Size) → <b>A4</b> ni tanlang.",
                        "<b>Ориентация</b> (Orientation) → <b>Книжная</b> (kitob — tik) yoki <b>Альбомная</b> (albom — yotiq)."],
                 note=("", "Rasmiy hujjatlar (ariza, ma’lumotnoma, hisobot) doim <b>A4, kitob</b> yo‘nalishida bo‘ladi.")),
            dict(t="Sahifa maydonlari (Поля)",
                 path="Макет → Поля → Настраиваемые поля…",
                 en="Layout → Margins → Custom Margins",
                 steps=["<b>Макет</b> → <b>Поля</b> → eng pastdagi <b>Настраиваемые поля…</b>",
                        "<b>Верхнее</b> (yuqori) — 2 sm, <b>Нижнее</b> (pastki) — 2 sm.",
                        "<b>Левое</b> (chap) — 3 sm, <b>Правое</b> (o‘ng) — 1,5 sm.",
                        "<b>OK</b> tugmasini bosing."],
                 note=("warn", "<b>Maydon</b> (Поля) — matn bilan varaq cheti orasidagi bo‘sh joy. Uni <b>chegara</b> (Границы — chiziq, ramka) bilan adashtirmang.")),
            dict(t="Shrift: Times New Roman, 14 pt, qora",
                 path="Главная → Шрифт",
                 en="Home → Font",
                 steps=["Shrift ro‘yxatidan <b>Times New Roman</b> ni tanlang.",
                        "O‘lcham maydoniga <b>14</b> ni tanlang yoki yozib [[Enter]] bosing.",
                        "Matn rangi — <b>Авто</b> (qora).",
                        "Har safar o‘zgartirmaslik uchun: [[Ctrl]] + [[D]] → <b>Шрифт</b> oynasi → shrift va o‘lchamni tanlab → <b>По умолчанию</b> → «всех документов» → OK."],
                 note=None),
            dict(t="Matnni tekislash",
                 path="Главная → Абзац → tekislash tugmalari",
                 en="Home → Paragraph → Align",
                 steps=["Chapga — [[Ctrl]] + [[L]] (oddiy matn).",
                        "O‘rtaga — [[Ctrl]] + [[E]] (sarlavha: «ARIZA»).",
                        "O‘ngga — [[Ctrl]] + [[R]] (arizaning «kimga» qismi).",
                        "Kenglik bo‘yicha — [[Ctrl]] + [[J]] (asosiy matn: ikki cheti tekis)."],
                 note=("danger", "Matnni <b>probel</b> (bo‘shliq) bosib surmang! Printerda va boshqa kompyuterda u albatta qiyshayib ketadi.")),
            dict(t="Qizil qator (xatboshi) — 1,25 sm",
                 path="Главная → Абзац (↘) → Первая строка: Отступ 1,25 см",
                 en="Home → Paragraph → Special: First line 1.25 cm",
                 steps=["<b>1-usul (tez):</b> abzats boshida bir marta [[Tab]] bosing — matn 1,25 sm ichkariga suriladi.",
                        "<b>2-usul (eng to‘g‘ri):</b> <b>Абзац</b> guruhining burchagidagi kichik strelkani (↘) bosing → <b>Первая строка</b> → <b>Отступ</b> → <b>1,25 см</b> → OK. Endi har bir yangi abzats o‘zi qizil qatordan boshlanadi."],
                 note=("danger", "Qizil qatorni hech qachon 5–6 marta probel bosib qilmang.")),
            dict(t="Qatorlar oralig‘i (Междустрочный интервал)",
                 path="Главная → Абзац → Интервал",
                 en="Home → Paragraph → Line Spacing",
                 steps=["Matnni belgilang ([[Ctrl]] + [[A]] — hammasi).",
                        "<b>Интервал</b> tugmasi (↕ strelkali chiziqlar) → <b>1,15</b> yoki <b>1,5</b>.",
                        "Tezkor: [[Ctrl]] + [[1]] — birlik, [[Ctrl]] + [[5]] — 1,5 interval."],
                 note=None),
            dict(t="Hujjatni to‘g‘ri saqlash",
                 path="Файл → Сохранить как → Обзор",
                 en="File → Save As → Browse",
                 steps=["[[Ctrl]] + [[S]] bosing → <b>Обзор</b> (Browse).",
                        "O‘z papkangizni tanlang (masalan, <code>D:\\Hi-26-02\\Karimov</code>).",
                        "Fayl nomi: <code>Familiya_Ariza</code> → <b>Сохранить</b>.",
                        "Shundan keyin har 5 daqiqada [[Ctrl]] + [[S]] bosib turing."],
                 note=("good", "Fayl nomida familiya va topshiriq nomi bo‘lsin — o‘qituvchi ishingizni bir zumda topadi.")),
        ],
        keys=[
            ("[[Ctrl]] + [[S]]", "Saqlash", "Hujjatni darhol saqlash. Dars davomida tez-tez bosiladi."),
            ("[[Ctrl]] + [[Z]]", "Bekor qilish", "Oxirgi xato amalni bekor qilish."),
            ("[[Ctrl]] + [[Y]]", "Qaytarish", "Bekor qilingan amalni yana qaytarish."),
            ("[[Ctrl]] + [[B]]", "Qalin (Жирный)", "Belgilangan matnni qalin qilish."),
            ("[[Ctrl]] + [[I]]", "Kursiv (Курсив)", "Belgilangan matnni qiya qilish."),
            ("[[Ctrl]] + [[E]]", "O‘rtaga tekislash", "Sarlavhani varaq o‘rtasiga keltirish."),
            ("[[Ctrl]] + [[R]]", "O‘ngga tekislash", "Arizaning «kimga» qismi uchun."),
            ("[[Ctrl]] + [[J]]", "Kenglik bo‘yicha", "Asosiy matnning ikki chetini tekislash."),
            ("[[Tab]]", "Qizil qator", "Abzats boshida bir bosish — 1,25 sm chekinish."),
        ],
        task=dict(
            title="Rasmiy ariza yozish",
            steps=[
                "Word’ni oching → <b>Новый документ</b> (yangi hujjat).",
                "<span class=\"path\">Макет → Размер</span>: <b>A4</b>; <span class=\"path\">Ориентация</span>: <b>Книжная</b>.",
                "<span class=\"path\">Макет → Поля → Настраиваемые поля</span>: yuqori 2, pastki 2, chap 3, o‘ng 1,5 sm.",
                "Shrift: <b>Times New Roman, 14 pt</b>; interval: <b>1,15</b>.",
                "«Kimga» qismining 5 ta qatorini tering va belgilab [[Ctrl]] + [[R]] bosing.",
                "Bitta bo‘sh qator → «ARIZA» so‘zini yozing → [[Ctrl]] + [[E]] va [[Ctrl]] + [[B]].",
                "Asosiy matnni [[Tab]] (qizil qator) bilan boshlang va [[Ctrl]] + [[J]] bilan tekislang.",
                "Sanani chapda, imzo va familiyani keyingi qatorda o‘ngda ([[Ctrl]] + [[R]]) yozing.",
                "[[Ctrl]] + [[S]] → nom: <code>Familiya_Ariza</code>.",
            ],
            reqs=[("Varaq", "A4, kitob"), ("Maydonlar", "yuqori 2, pastki 2, chap 3, o‘ng 1,5 sm"), ("Shrift", "Times New Roman, 14 pt"),
                  ("Interval", "1,15"), ("Qizil qator", "1,25 sm"), ("Fayl nomi", "Familiya_Ariza")],
            checks=["Varaq A4 va maydonlar to‘g‘ri", "«Kimga» qismi o‘ngda", "«ARIZA» o‘rtada va qalin",
                    "Matn kenglik bo‘yicha, qizil qatorli", "Hech qayerda probel bilan surilmagan", "Fayl saqlangan"],
            sample_class="ls115",
            sample=[
                f"""
<p class="r">{TEXNIKUM}</p>
<p class="r">direktori nomiga</p>
<p class="r">“Hamshiralik ishi” yo‘nalishi</p>
<p class="r">{GURUH} guruh talabasi</p>
<p class="r">Karimov Anvar Saidovichdan</p>
<div class="gap"></div>
<p class="c b">ARIZA</p>
<div class="gap"></div>
<p class="j ind">Men, Karimov Anvar Saidovich, 2026-yil 12-oktabrdan 16-oktabrgacha o‘tkaziladigan talabalar o‘rtasidagi “Tibbiyotda axborot texnologiyalari” respublika fan olimpiadasida ishtirok etishim sababli, shu kunlarda dars mashg‘ulotlaridan ozod qilishingizni so‘rayman.</p>
<div class="gap"></div>
<div class="gap"></div>
<p>02.10.2026 y.</p>
<p class="r">__________ (imzo) &nbsp;A. Karimov</p>
"""],
        ),
        fixes=[
            "Shablon universitet (rektor, IT fakulteti) o‘rniga texnikum direktori, “Hamshiralik ishi” yo‘nalishi va Hi-26-02 guruhiga moslashtirildi.",
            "“Hoshiyalar (Поля)” → “maydonlar (Поля)”. “Hoshiya/chegara” — bu Границы (chiziq, ramka), 2- va 5-darslarda alohida o‘rgatiladi.",
            "Qizil qatorning to‘g‘ri usuli qo‘shildi: Абзац → Первая строка → Отступ 1,25 см. Tab — tezkor usul sifatida qoldirildi.",
            "Tezkor tugmalar jadvaliga topshiriqda ishlatiladigan Ctrl + E va Ctrl + R qo‘shildi (asl jadvalda yo‘q edi).",
            "Namunadagi sana va imzo probellar bilan surilgan edi — endi sana chapda, imzo keyingi qatorda Ctrl + R bilan o‘ngda.",
            "Ariza matni tahrir qilindi: “ruxsat berishingizni” → “ozod qilishingizni so‘rayman”; sana “02.10.2026 y.” ko‘rinishiga keltirildi.",
        ],
    ),

    # ==================================================================
    # 2-DARS
    # ==================================================================
    dict(
        n=2,
        short="Jadvallar bilan ishlash",
        title="Jadvallar bilan ishlash (Таблица)",
        goal="Ma’lumotlarni tartibli jadval ko‘rinishiga keltirish, ustun va qatorlarni boshqarish, kataklarni birlashtirish va jadvalni bezashni o‘rganish.",
        search="jadval tablitsa таблица ustun qator katak birlashtirish объединить ajratish zalivka границы tab dars jadvali",
        actions=[
            dict(t="Jadval qo‘yish",
                 path="Вставка → Таблица",
                 en="Insert → Table",
                 steps=["Kursorni jadval turadigan joyga qo‘ying.",
                        "<b>Вставка</b> → <b>Таблица</b> → sichqonchani kataklar ustida yurgizib <b>5×6</b> ni bosing.",
                        "Yoki <b>Вставить таблицу…</b> → <b>Число столбцов</b>: 5, <b>Число строк</b>: 6 → OK."],
                 note=None),
            dict(t="Qator va ustun qo‘shish, o‘chirish",
                 path="o‘ng tugma → Вставить / Удалить",
                 en="right-click → Insert / Delete",
                 steps=["Qo‘shish: katak ichida o‘ng tugma → <b>Вставить</b> → <b>Вставить строки снизу</b> (pastga qator) yoki <b>Вставить столбцы справа</b> (o‘ngga ustun).",
                        "Eng oxirgi katakda [[Tab]] bossangiz, pastda yangi qator o‘zi qo‘shiladi.",
                        "O‘chirish: qatorni belgilab o‘ng tugma → <b>Удалить строки</b> (ustun uchun — <b>Удалить столбцы</b>)."],
                 note=("warn", "[[Delete]] tugmasi qatorni emas, faqat <b>ichidagi yozuvni</b> o‘chiradi. Butun qatorni o‘chirish uchun uni belgilab [[Backspace]] bosing yoki menyudan foydalaning.")),
            dict(t="Kataklarni birlashtirish va bo‘lish",
                 path="o‘ng tugma → Объединить ячейки / Разделить ячейки",
                 en="Merge Cells / Split Cells",
                 steps=["Birlashtiriladigan kataklarni sichqoncha bilan belgilang.",
                        "O‘ng tugma → <b>Объединить ячейки</b> — ular bitta katakka aylanadi.",
                        "Bo‘lish: katak ichida o‘ng tugma → <b>Разделить ячейки</b> → ustun va qator sonini yozing → OK."],
                 note=None),
            dict(t="Katak ichida tekislash",
                 path="Макет (jadval) → Выравнивание",
                 en="Table Layout → Alignment",
                 steps=["Jadvalni bosganingizda lentada jadval uchun <b>Конструктор</b> va <b>Макет</b> yorliqlari paydo bo‘ladi.",
                        "Kataklarni belgilang → <b>Макет</b> → <b>Выравнивание</b> guruhidagi 9 ta tugmadan <b>o‘rtadagisini</b> bosing — yozuv katakning ham gorizontal, ham vertikal markaziga keladi.",
                        "[[Ctrl]] + [[E]] faqat gorizontal (chap-o‘ng) markazlaydi."],
                 note=None),
            dict(t="Ustun kengligi va qator balandligi",
                 path="Макет (jadval) → Размер ячейки",
                 en="Table Layout → Cell Size",
                 steps=["Ustunlar orasidagi chiziqni sichqoncha bilan ushlab chapga yoki o‘ngga suring.",
                        "Aniq o‘lcham: <b>Макет</b> → <b>Высота</b> va <b>Ширина</b> maydonlariga sm da yozing.",
                        "<b>Автоподбор</b> → <b>по содержимому</b> — ustunlar yozuvga qarab o‘zi moslashadi."],
                 note=None),
            dict(t="Katakni bo‘yash va chegaralar",
                 path="Конструктор (jadval) → Заливка / Границы",
                 en="Table Design → Shading / Borders",
                 steps=["Kataklarni belgilang → <b>Конструктор</b> → <b>Заливка</b> → rang (masalan, kulrang).",
                        "<b>Толщина пера</b> → 1,5 pt (chiziq qalinligi) → <b>Границы</b> → <b>Внешние границы</b> yoki <b>Все границы</b>."],
                 note=("", "<b>Chegara</b> (Границы) — jadval chiziqlari. Uni varaq <b>maydonlari</b> (Поля) bilan adashtirmang.")),
        ],
        keys=[
            ("[[Tab]]", "Keyingi katak", "O‘ngdagi katakka o‘tish; oxirgi katakda yangi qator ochadi."),
            ("[[Shift]] + [[Tab]]", "Oldingi katak", "Chapdagi katakka qaytish."),
            ("[[Ctrl]] + [[E]]", "Markazga", "Katakdagi yozuvni gorizontal markazga tekislash."),
            ("[[Ctrl]] + [[B]]", "Qalin", "Sarlavha va ustun nomlarini ajratish."),
            ("[[Ctrl]] + [[C]]", "Nusxalash", "Belgilangan katak yoki yozuvdan nusxa olish."),
            ("[[Ctrl]] + [[V]]", "Qo‘yish", "Nusxani boshqa katakka joylash."),
        ],
        task=dict(
            title="Guruh dars jadvalini tuzish",
            steps=[
                "<span class=\"path\">Вставка → Таблица</span>: <b>5 ustun, 6 qator</b>.",
                "1-qatordagi 5 ta katakni belgilang → o‘ng tugma → <b>Объединить ячейки</b>.",
                "Unga sarlavhani yozing, [[Ctrl]] + [[B]]; <span class=\"path\">Конструктор → Заливка</span> → kulrang.",
                "2-qatorga ustun nomlarini yozing va qalin qiling.",
                "3–6-qatorlarni to‘ldiring: kataklar orasida [[Tab]] bilan o‘ting.",
                "Butun jadvalni belgilang → <span class=\"path\">Макет → Выравнивание</span> → o‘rtadagi tugma.",
                "Jadval matni: <b>Times New Roman, 12 pt</b>. Ustun kengliklarini moslang.",
                "[[Ctrl]] + [[S]] → nom: <code>Familiya_Jadval</code>.",
            ],
            reqs=[("Jadval", "5 ustun × 6 qator"), ("1-qator", "birlashtirilgan, kulrang, qalin"),
                  ("Yozuvlar", "katak markazida"), ("Shrift", "Times New Roman, 12 pt"), ("Fayl nomi", "Familiya_Jadval")],
            checks=["Jadval 5×6", "Sarlavha qatori birlashtirilgan va kulrang", "Ustun nomlari qalin",
                    "Hamma yozuv markazda", "Bo‘sh ortiqcha qator yo‘q", "Fayl saqlangan"],
            sample_class="",
            sample=[
                f"""
<table class="w-table">
  <tr><td class="w-head" colspan="5">HAFTALIK DARS VA MASHG‘ULOTLAR JADVALI ({GURUH} GURUH)</td></tr>
  <tr class="w-cols"><td>T/r</td><td>Hafta kuni</td><td>Mashg‘ulot vaqti</td><td>Fan nomi</td><td>Auditoriya</td></tr>
  <tr><td>1</td><td>Dushanba</td><td>08:30 – 09:50</td><td>Tibbiyotda axborot texnologiyalari</td><td>204-kompyuter xonasi</td></tr>
  <tr><td>2</td><td>Dushanba</td><td>10:00 – 11:20</td><td>Odam anatomiyasi va fiziologiyasi</td><td>312-xona</td></tr>
  <tr><td>3</td><td>Seshanba</td><td>08:30 – 09:50</td><td>Hamshiralik ishi asoslari</td><td>108-simulyatsiya xonasi</td></tr>
  <tr><td>4</td><td>Seshanba</td><td>10:00 – 11:20</td><td>Lotin tili va tibbiy terminologiya</td><td>402-xona</td></tr>
</table>
"""],
        ),
        fixes=[
            "Fanlar (dasturlash, kiberxavfsizlik, xorijiy til) tibbiyot texnikumi fanlariga almashtirildi, guruh 101 → Hi-26-02.",
            "“Jadval hoshiyalari (Границы)” → “chegaralar (Границы)” — 1-darsdagi “maydonlar (Поля)” bilan adashmasligi uchun.",
            "Katakning vertikal markazi uchun aniq yo‘l qo‘shildi: Макет → Выравнивание (Ctrl + E faqat gorizontal markazlaydi).",
            "Delete va Backspace farqi haqida ogohlantirish qo‘shildi (Delete qatorni emas, yozuvni o‘chiradi).",
            "Jadval shrifti aniq ko‘rsatildi: Times New Roman 12 pt (asl ishlanmada ko‘rsatilmagan).",
        ],
    ),

    # ==================================================================
    # 3-DARS
    # ==================================================================
    dict(
        n=3,
        short="Shakllar va rasmlar",
        title="Shakllar va rasmlar bilan ishlash",
        goal="Hujjatga rasm qo‘yishdagi eng ko‘p uchraydigan muammo — rasm “qotib qolishi” va matnning surilib ketishini hal qilish, shakllar chizish va bezashni o‘rganish.",
        search="rasm shakl фигуры рисунки обтекание текстом квадрат перед текстом obrezat crop e'lon zalivka",
        actions=[
            dict(t="Rasm qo‘yish",
                 path="Вставка → Рисунки → Это устройство…",
                 en="Insert → Pictures → This Device",
                 steps=["Kursorni rasm turadigan joyga qo‘ying.",
                        "<b>Вставка</b> → <b>Рисунки</b> → <b>Это устройство…</b>",
                        "Rasm faylini tanlang → <b>Вставить</b>."],
                 note=None),
            dict(t="Eng muhimi: Обтекание текстом (matn bilan o‘rash)",
                 path="rasmni bosing → Формат рисунка → Обтекание текстом",
                 en="Picture Format → Wrap Text",
                 steps=["Yangi qo‘yilgan rasm <b>В тексте</b> rejimida bo‘ladi: u katta harf kabi qatorga “yopishadi”, shuning uchun surilmaydi va matnni itarib yuboradi.",
                        "Rasmni bosing → yonida chiqadigan kichik tugma (<b>Параметры разметки</b>) yoki <b>Формат</b> → <b>Обтекание текстом</b>.",
                        "<b>Квадрат</b> — matn rasm atrofidan aylanib o‘tadi (e’lon, referat uchun).",
                        "<b>Перед текстом</b> — rasm matn ustida, istalgan joyga erkin suriladi."],
                 note=("good", "Rasm “qotib qoldi” yoki “matn sakrab ketdi” — demak <b>Обтекание текстом</b> ni o‘zgartirish kerak.")),
            dict(t="O‘lchamni o‘zgartirish va qirqish",
                 path="Формат → Размер / Обрезать",
                 en="Picture Format → Size / Crop",
                 steps=["Rasmni <b>burchakdagi</b> doirachadan ushlab torting — proporsiya buzilmaydi.",
                        "Tomonlar o‘rtasidagi doirachadan tortsangiz, rasm cho‘zilib, buziladi.",
                        "Aniq o‘lcham: <b>Формат</b> → <b>Высота</b> / <b>Ширина</b> (masalan, 5 sm).",
                        "Qirqish: <b>Формат</b> → <b>Обрезать</b> → qora chiziqlarni ichkariga suring → [[Esc]] yoki bo‘sh joyni bosing."],
                 note=None),
            dict(t="Shakl chizish",
                 path="Вставка → Фигуры",
                 en="Insert → Shapes",
                 steps=["<b>Вставка</b> → <b>Фигуры</b> → to‘rtburchak, oval yoki strelkani tanlang.",
                        "Sichqoncha kursori “+” bo‘ladi: varaqda bosib turib torting.",
                        "[[Shift]] bosib turib chizsangiz — tekis kvadrat yoki aylana chiqadi."],
                 note=None),
            dict(t="Shakl ichiga matn yozish va bezash",
                 path="Формат фигуры → Заливка / Контур",
                 en="Shape Format → Fill / Outline",
                 steps=["Shaklni bosing va yozishni boshlang — matn shakl ichiga yoziladi.",
                        "<b>Формат</b> → <b>Заливка фигуры</b> — shakl ichining rangi.",
                        "<b>Контур фигуры</b> — chegarasining rangi va qalinligi.",
                        "Matn rangini <b>Главная</b> → <b>Цвет текста</b> (A harfi) orqali oq qiling."],
                 note=None),
        ],
        keys=[
            ("[[Shift]] + sichqoncha", "Tekis shakl", "Chizishda bosib turilsa — kvadrat yoki aylana."),
            ("[[Ctrl]] + sudrash", "Nusxa yaratish", "Shaklni Ctrl bosib turib sudrasangiz, uning nusxasi paydo bo‘ladi."),
            ("Strelkalar", "Aniq surish", "Belgilangan shakl yoki rasmni ozgina surish."),
            ("[[Delete]]", "O‘chirish", "Belgilangan rasm yoki shaklni o‘chirish."),
            ("[[Ctrl]] + [[Shift]] + [[C]]", "Formatni nusxalash", "Matn formatini (shrift, rang) nusxalab olish."),
            ("[[Ctrl]] + [[Shift]] + [[V]]", "Formatni qo‘llash", "Nusxalangan formatni boshqa matnga qo‘llash."),
        ],
        task=dict(
            title="Rasmli e’lon tayyorlash",
            steps=[
                "<span class=\"path\">Вставка → Фигуры → Прямоугольник</span>: varaqning yuqorisiga eni bo‘ylab to‘rtburchak chizing.",
                "<span class=\"path\">Заливка фигуры</span> → to‘q ko‘k.",
                "Shakl ichiga yozing: <b>DIQQAT: MUHIM E’LON!</b> — oq rang, qalin, 20 pt.",
                "Shakl ostida e’lon matnini tering: Times New Roman 14, [[Ctrl]] + [[J]].",
                "O‘qituvchi bergan rasmni qo‘ying: <span class=\"path\">Вставка → Рисунки</span>.",
                "<span class=\"path\">Обтекание текстом → Квадрат</span>; o‘lcham 5 × 5 sm; rasmni matnning chap tomoniga suring.",
                "Kerak bo‘lsa, rasmning ortiqcha qismini <span class=\"path\">Обрезать</span> bilan qirqing.",
                "[[Ctrl]] + [[S]] → nom: <code>Familiya_Elon</code>.",
            ],
            reqs=[("Sarlavha", "ko‘k to‘rtburchak, oq qalin 20 pt"), ("Rasm", "5 × 5 sm, Квадрат, chapda"),
                  ("Matn", "Times New Roman 14, kenglik bo‘yicha"), ("Fayl nomi", "Familiya_Elon")],
            checks=["To‘rtburchak sahifa eni bo‘ylab", "Sarlavha oq va o‘rtada", "Rasm 5 × 5 sm, cho‘zilmagan",
                    "Matn rasm atrofidan aylanib o‘tgan", "Fayl saqlangan"],
            sample_class="",
            sample=[
                """
<div class="w-shape">DIQQAT: MUHIM E’LON!</div>
<div class="w-pic">
  <svg width="70" height="70" viewBox="0 0 64 64" fill="none" stroke="#1f3864" stroke-width="2.4" stroke-linejoin="round"><path d="M8 14c8-3 16-3 24 2v36c-8-5-16-5-24-2z" fill="#ffffff"/><path d="M56 14c-8-3-16-3-24 2v36c8-5 16-5 24-2z" fill="#ffffff"/><rect x="38" y="22" width="12" height="12" rx="1" fill="#e2443b" stroke="none"/><rect x="42.2" y="24" width="3.6" height="8" fill="#fff" stroke="none"/><rect x="40" y="26.2" width="8" height="3.6" fill="#fff" stroke="none"/></svg>
  <span>RASM (5 × 5 sm)</span>
</div>
<p class="j ind">Texnikumimiz axborot-resurs markaziga hamshiralik ishi, odam anatomiyasi, farmakologiya va tibbiyotda axborot texnologiyalariga oid eng so‘nggi darsliklar va o‘quv qo‘llanmalar keltirildi.</p>
<p class="j ind">Barcha qiziquvchi talabalar har kuni soat 09:00 dan 18:00 gacha axborot-resurs markazining o‘quv zaliga kelib, yangi kitoblar bilan bepul tanishishlari va ulardan foydalanishlari mumkin.</p>
<p class="j ind">Kitobni uyga olib ketish uchun talabalik guvohnomasi bo‘lishi shart.</p>
"""],
        ),
        fixes=[
            "Ctrl + D shakl nusxasi sifatida berilgan edi — bu PowerPoint tugmasi, Word’da Ctrl + D “Шрифт” oynasini ochadi. O‘rniga “Ctrl + sudrash” berildi.",
            "Ctrl + Shift + C / V matn formatini nusxalash uchun ekani aniqlashtirildi.",
            "Topshiriq va namunadagi sarlavha bir xil qilindi: “DIQQAT: MUHIM E’LON!”.",
            "E’lon matni fakultet va dasturlash kitoblari o‘rniga texnikumning tibbiy adabiyotlariga moslashtirildi.",
            "Rasm “В тексте” rejimida nega qotib qolishi tushuntirildi. Rasm faylini o‘qituvchi oldindan kompyuterlarga tarqatishi kerakligi qo‘shildi.",
        ],
    ),

    # ==================================================================
    # 4-DARS
    # ==================================================================
    dict(
        n=4,
        short="Ro‘yxatlar, qidirish va sahifa uzish",
        title="Ro‘yxatlar, qidirish-almashtirish va sahifani uzish",
        goal="Tartibli ro‘yxatlar tuzish, ko‘p betli matnda so‘zlarni bir zumda topish va almashtirish hamda yangi betga Enter bosib o‘tish xatosidan qutulishni o‘rganish.",
        search="ro'yxat marker numeratsiya нумерация маркер razryv stranitsy ctrl enter найти заменить ctrl h ctrl f simvol shift f3",
        actions=[
            dict(t="Nuqtali va raqamli ro‘yxatlar",
                 path="Главная → Абзац → Маркеры / Нумерация",
                 en="Home → Paragraph → Bullets / Numbering",
                 steps=["Ro‘yxat qatorlarini belgilang.",
                        "<b>Маркеры</b> (•) — nuqtali ro‘yxat; <b>Нумерация</b> (1, 2, 3) — raqamli ro‘yxat.",
                        "Ichki daraja: ro‘yxat qatori boshida [[Tab]]; orqaga qaytish — [[Shift]] + [[Tab]].",
                        "Ro‘yxatni tugatish: bo‘sh ro‘yxat qatorida yana [[Enter]] bosing."],
                 note=("", "Qator boshida <b>1.</b> yoki <b>*</b> yozib probel bossangiz, Word ro‘yxatni o‘zi boshlaydi.")),
            dict(t="Yangi sahifaga to‘g‘ri o‘tish (Разрыв страницы)",
                 path="Вставка → Разрыв страницы",
                 en="Insert → Page Break",
                 steps=["Kursorni matn oxiriga qo‘ying.",
                        "[[Ctrl]] + [[Enter]] bosing — kursor darhol keyingi sahifaning boshiga o‘tadi.",
                        "Uzilishni ko‘rish: <b>Главная</b> → <b>¶</b> tugmasi."],
                 note=("danger", "20 marta [[Enter]] bosib keyingi betga o‘tmang: yuqoridagi matn o‘zgarsa, hamma narsa surilib ketadi.")),
            dict(t="So‘zni qidirish (Найти)",
                 path="Главная → Найти",
                 en="Home → Find",
                 steps=["[[Ctrl]] + [[F]] — chapda <b>Навигация</b> paneli ochiladi.",
                        "Qidiruv maydoniga so‘zni yozing — topilganlar matnda sariq rang bilan belgilanadi.",
                        "Paneldagi strelkalar bilan keyingisiga o‘ting."],
                 note=None),
            dict(t="So‘zni almashtirish (Заменить)",
                 path="Главная → Заменить",
                 en="Home → Replace",
                 steps=["[[Ctrl]] + [[H]] bosing.",
                        "<b>Найти</b>: eski so‘z (<code>xona</code>); <b>Заменить на</b>: yangi so‘z (<code>auditoriya</code>).",
                        "<b>Заменить все</b> — Word nechta almashtirganini xabar qiladi."],
                 note=("warn", "Ehtiyot bo‘ling: so‘z boshqa so‘zning ichida ham almashadi (<code>dorixona</code> → <code>doriauditoriya</code>). Buning oldini olish: <b>Больше &gt;&gt;</b> → <b>Только слово целиком</b>.")),
            dict(t="Maxsus belgilar (Символ)",
                 path="Вставка → Символ → Другие символы",
                 en="Insert → Symbol",
                 steps=["<b>Вставка</b> → <b>Символ</b> → kerakli belgini tanlang: © ® ° § €.",
                        "Ro‘yxatda bo‘lmasa: <b>Другие символы…</b>",
                        "Tez yo‘l: [[Alt]] bosib turib raqamlar blokida terish — 0176 → °, 0169 → ©, 0167 → §."],
                 note=None),
        ],
        keys=[
            ("[[Ctrl]] + [[Enter]]", "Sahifani uzish", "Darhol yangi toza sahifaga o‘tish."),
            ("[[Ctrl]] + [[F]]", "Qidirish", "Matndan so‘z yoki iborani topish."),
            ("[[Ctrl]] + [[H]]", "Almashtirish", "So‘zni topib, bittada yangisiga almashtirish."),
            ("[[Ctrl]] + [[A]]", "Hammasini belgilash", "Hujjatdagi butun matn va obyektlar."),
            ("[[Shift]] + [[F3]]", "Registr", "Belgilangan matn: kichik → Bosh harfli → KATTA."),
            ("[[Tab]] / [[Shift]] + [[Tab]]", "Ro‘yxat darajasi", "Ro‘yxatda ichki darajaga tushish / qaytish."),
        ],
        task=dict(
            title="Qoidalar ro‘yxati va so‘zlarni almashtirish",
            steps=[
                "Sarlavhani yozing: qalin, [[Ctrl]] + [[E]].",
                "Ikki bo‘lim nomini yozib, <span class=\"path\">Нумерация</span> bilan raqamli ro‘yxat qiling (1., 2.).",
                "Har bo‘lim ostidagi qoidalarni yozing, [[Tab]] bilan ichki darajaga tushiring va <span class=\"path\">Маркеры</span> (•) qiling.",
                "[[Ctrl]] + [[H]]: <code>xona</code> → <code>auditoriya</code> → <b>Заменить все</b>. Word 2 ta almashtirish haqida xabar beradi.",
                "Matn oxirida [[Ctrl]] + [[Enter]] → 2-sahifaga F.I.O. va guruhingizni yozing.",
                "<b>¶</b> tugmasi bilan ortiqcha Enter va probellarni tekshiring.",
                "[[Ctrl]] + [[S]] → nom: <code>Familiya_Qoidalar</code>.",
            ],
            reqs=[("Shrift", "Times New Roman, 14 pt"), ("Ro‘yxat", "raqamli + ichida nuqtali"),
                  ("Almashtirish", "xona → auditoriya (2 ta)"), ("2-sahifa", "Ctrl + Enter bilan"), ("Fayl nomi", "Familiya_Qoidalar")],
            checks=["Ro‘yxat Word tugmalari bilan qilingan (qo‘lda emas)", "Ikki daraja to‘g‘ri", "Matnda “xona” qolmagan",
                    "2-sahifa Ctrl + Enter bilan ochilgan", "Fayl saqlangan"],
            sample_class="",
            sample=[
                """
<p class="c b">KOMPYUTER AUDITORIYASI ICHKI TARTIB QOIDALARI</p>
<div class="gap"></div>
<ol class="w-num">
  <li><span>Mashg‘ulot jarayoniga oid talablar:</span>
    <ul class="w-bul">
      <li>Kompyuter xonasiga dars boshlanishidan 5 daqiqa oldin kirish shart;</li>
      <li>Dars vaqtida begona vositalar va ovozli o‘yinlardan foydalanish man etiladi;</li>
      <li>Texnikani o‘qituvchi ruxsatisiz qayta yuklash yoki o‘chirish taqiqlanadi.</li>
    </ul>
  </li>
  <li><span>Xavfsizlik va ozodalik qoidalari:</span>
    <ul class="w-bul">
      <li>Kompyuter xonasida elektr kabellari va uzaytirgichlarga teginish qat’iyan man etiladi;</li>
      <li>Ish yakunida har bir talaba o‘z ish o‘rnini tartibga keltirishi zarur.</li>
    </ul>
  </li>
</ol>
<span class="page-tag">1-sahifa</span>
""",
                f"""
<p>Bajardi: {GURUH} guruh talabasi</p>
<p>____________________________ (F.I.O.)</p>
<span class="page-tag">2-sahifa (Ctrl + Enter bilan ochilgan)</span>
"""],
        ),
        fixes=[
            "So‘z almashtirishda so‘z bo‘lagi ham almashishi (dorixona → doriauditoriya) haqida ogohlantirish va “Только слово целиком” sozlamasi qo‘shildi.",
            "Ro‘yxatda ichki darajaga o‘tish (Tab / Shift + Tab) va ro‘yxatni tugatish qo‘shildi — topshiriq ikki darajali ro‘yxatni talab qiladi.",
            "Maxsus belgilarning Alt-kodlari qo‘shildi (°, ©, §).",
            "“Uzatgich” → “uzaytirgich” (to‘g‘ri atama).",
            "Namuna sahifa uzilishini ko‘rsatish uchun 2 betli qilindi.",
        ],
    ),

    # ==================================================================
    # 5-DARS
    # ==================================================================
    dict(
        n=5,
        short="Ustunlar, WordArt va ramka",
        title="Matn ustunlari, WordArt va sahifa ramkasi",
        goal="Matnni gazeta yoki broshyura uslubida ustunlarga bo‘lish, bezakli sarlavha yaratish va sahifani ramka bilan o‘rashni o‘rganish.",
        search="ustun kolonki колонки razdelitel wordart ramka границы страниц axborotnoma broshyura",
        actions=[
            dict(t="Matnni ustunlarga bo‘lish",
                 path="Макет → Колонки → Две",
                 en="Layout → Columns → Two",
                 steps=["Ustunlarga bo‘linadigan matnni belgilang (belgilamasangiz — butun hujjat bo‘linadi).",
                        "<b>Макет</b> → <b>Колонки</b> → <b>Две</b> (ikki) yoki <b>Три</b> (uch)."],
                 note=("", "Word 2007–2010 da bu yorliq <b>Разметка страницы</b> deb ataladi.")),
            dict(t="Ustunlar orasiga chiziq",
                 path="Колонки → Другие колонки…",
                 en="Columns → More Columns",
                 steps=["<b>Колонки</b> → <b>Другие колонки…</b>",
                        "<b>Разделитель</b> belgisini qo‘ying.",
                        "Shu oynada ustunlar soni, kengligi va orasidagi masofani ham o‘zgartirish mumkin → OK."],
                 note=None),
            dict(t="WordArt sarlavha",
                 path="Вставка → WordArt",
                 en="Insert → WordArt",
                 steps=["<b>Вставка</b> → <b>WordArt</b> → bezak uslubini tanlang.",
                        "Paydo bo‘lgan yozuv o‘rniga sarlavhani yozing.",
                        "Kattalashtirish: yozuvni belgilab [[Ctrl]] + [[Shift]] + [[&gt;]].",
                        "Joylashuv: <b>Обтекание текстом</b> → <b>Сверху и снизу</b>; varaq o‘rtasiga: <b>Формат</b> → <b>Выровнять</b> → <b>Выровнять по центру</b>."],
                 note=None),
            dict(t="Sahifa ramkasi",
                 path="Дизайн → Границы страниц → Рамка",
                 en="Design → Page Borders → Box",
                 steps=["<b>Дизайн</b> (ba’zi versiyalarda <b>Конструктор</b>) → <b>Границы страниц</b>.",
                        "Chapda <b>Рамка</b> ni tanlang.",
                        "<b>Тип</b> — chiziq turi, <b>Цвет</b> — rang, <b>Ширина</b> — qalinlik (masalan, 1,5 pt) → OK."],
                 note=("", "<b>Рисунок</b> ro‘yxatidan bezakli (rasmli) ramka ham tanlash mumkin, lekin rasmiy hujjatga oddiy chiziq mos.")),
        ],
        keys=[
            ("[[Ctrl]] + [[Shift]] + [[&gt;]]", "Shriftni kattalashtirish", "Sarlavhani tez kattalashtirish."),
            ("[[Ctrl]] + [[Shift]] + [[&lt;]]", "Shriftni kichraytirish", "Matnni tez kichraytirish."),
            ("[[Ctrl]] + [[Alt]] + [[C]]", "© belgisi", "Mualliflik huquqi belgisini qo‘yish."),
            ("[[Ctrl]] + [[E]]", "O‘rtaga", "Oddiy sarlavha yoki WordArt ichidagi yozuvni o‘rtaga tekislash."),
            ("[[Ctrl]] + [[J]]", "Kenglik bo‘yicha", "Ustunlardagi matnning ikki chetini tekislash."),
        ],
        task=dict(
            title="Ramkali va 2 ustunli axborotnoma",
            steps=[
                "<span class=\"path\">Дизайн → Границы страниц → Рамка</span>: to‘q ko‘k, <b>1,5 pt</b>.",
                "<span class=\"path\">Вставка → WordArt</span>: <b>TIBBIYOTDA KOMPYUTERNING AHAMIYATI</b>.",
                "WordArt’ni <span class=\"path\">Обтекание → Сверху и снизу</span> qiling va varaq o‘rtasiga keltiring.",
                "Ostiga ikki abzats matnni tering: Times New Roman 14, [[Ctrl]] + [[J]], qizil qator.",
                "Ikkala abzatsni belgilang → <span class=\"path\">Макет → Колонки → Две</span>.",
                "<span class=\"path\">Другие колонки</span> → <b>Разделитель</b> → OK.",
                "Oxirida o‘ngga: [[Ctrl]] + [[Alt]] + [[C]] → <b>© 2026, Hi-26-02 guruh</b>.",
                "[[Ctrl]] + [[S]] → nom: <code>Familiya_Axborotnoma</code>.",
            ],
            reqs=[("Ramka", "to‘q ko‘k, 1,5 pt"), ("Sarlavha", "WordArt, o‘rtada"), ("Matn", "2 ustun, ajratuvchi chiziq"),
                  ("Shrift", "Times New Roman, 14 pt"), ("Fayl nomi", "Familiya_Axborotnoma")],
            checks=["Butun sahifada ramka bor", "WordArt o‘rtada, matnni yopmagan", "Matn 2 ustunga bo‘lingan",
                    "Ustunlar orasida chiziq bor", "© belgisi qo‘yilgan", "Fayl saqlangan"],
            sample_class="",
            sample=[
                f"""
<div class="w-frame"></div>
<div class="w-art">TIBBIYOTDA KOMPYUTERNING<br>AHAMIYATI</div>
<div class="w-cols2">
  <p>Axborot texnologiyalari davrida tibbiy hujjatlarni sifatli va standart asosida shakllantirish har bir hamshiradan talab etiladi. Bu bemorga ko‘rsatiladigan xizmat sifatini va ish unumdorligini oshiradi.</p>
  <p>Microsoft Word dasturi orqali yo‘llanmalar, arizalar, ma’lumotnomalar va hisobotlar xatosiz hamda tez tayyorlanadi va chop etiladi. Elektron hujjatni saqlash, izlab topish va hamkasblarga yuborish ham ancha oson.</p>
</div>
<div class="gap"></div>
<p class="r">© 2026, {GURUH} guruh</p>
"""],
        ),
        fixes=[
            "Yorliq nomlari yangilandi: Word 2013+ da “Колонки” — Макет yorlig‘ida, “Границы страниц” — Дизайн (Конструктор) yorlig‘ida. Eski nom (Разметка страницы) izoh sifatida qoldirildi.",
            "Ctrl + E WordArt’ni varaq o‘rtasiga emas, uning ichidagi yozuvni tekislaydi — WordArt’ni o‘rtaga keltirish uchun Формат → Выровнять → по центру qo‘shildi.",
            "Sarlavha va matn tibbiyotga moslashtirildi (“Tibbiyotda kompyuterning ahamiyati”).",
            "Ctrl + Alt + C (©) tugmasi topshiriqqa ham kiritildi, Ctrl + J qo‘shildi.",
        ],
    ),

    # ==================================================================
    # 6-DARS
    # ==================================================================
    dict(
        n=6,
        short="Tekshirish, PDF va chop etish",
        title="Hujjatni tekshirish, PDF ga saqlash va chop etish",
        goal="Tayyor hujjatdagi xatolarni tuzatish, boshqa kompyuterda formati buzilmasligi uchun PDF ga o‘tkazish va printerdan chiqarish sozlamalarini amalda o‘rganish.",
        search="imlo f7 xato pdf eksport f12 chop etish pechat ctrl p printer nusxa sahifalar albom 2 sahifa varaqqa",
        actions=[
            dict(t="Imlo xatolarini tuzatish",
                 path="Рецензирование → Правописание (F7)",
                 en="Review → Spelling & Grammar",
                 steps=["<b>Qizil</b> to‘lqinli chiziq — imlo xatosi, <b>ko‘k</b> (yoki yashil) — grammatik xato.",
                        "So‘z ustida sichqonchaning <b>o‘ng</b> tugmasi → taklif qilingan to‘g‘ri variantni tanlang.",
                        "[[F7]] — butun hujjatni ketma-ket tekshirish paneli."],
                 note=("warn", "Word <b>o‘zbek tilini</b> to‘liq tekshira olmaydi: o‘zbek matnda chiziq bo‘lmasa ham xato bo‘lishi, yoki to‘g‘ri so‘z ham qizil bo‘lishi mumkin. Matnni albatta <b>o‘zingiz o‘qib</b> tekshiring.")),
            dict(t="PDF formatida saqlash",
                 path="Файл → Экспорт → Создать PDF/XPS  yoki  F12",
                 en="File → Export → Create PDF/XPS",
                 steps=["[[F12]] bosing (<b>Сохранить как</b> oynasi).",
                        "<b>Тип файла</b> → <b>PDF (*.pdf)</b>.",
                        "Fayl nomi: <code>Familiya.pdf</code> → <b>Сохранить</b>."],
                 note=("good", "PDF hujjat har qanday kompyuter va telefonda bir xil ko‘rinadi, shrift va joylashuv buzilmaydi.")),
            dict(t="Chop etish oynasi",
                 path="Файл → Печать  ( Ctrl + P )",
                 en="File → Print",
                 steps=["[[Ctrl]] + [[P]] bosing.",
                        "Chapda — sozlamalar, o‘ngda — varaq qanday chiqishining <b>oldindan ko‘rinishi</b>.",
                        "<b>Принтер</b> — kerakli printerni tanlang.",
                        "<b>Копии</b> — nusxalar soni."],
                 note=None),
            dict(t="Qaysi sahifalarni chiqarish",
                 path="Печать → Настраиваемая печать → Страницы",
                 en="Print → Custom Print → Pages",
                 steps=["<b>Напечатать все страницы</b> o‘rniga <b>Настраиваемая печать</b>.",
                        "<b>Страницы</b> maydoniga yozing: <code>1</code> — faqat 1-bet; <code>1-3</code> — 1 dan 3 gacha; <code>2,5</code> — 2- va 5-betlar."],
                 note=None),
            dict(t="Yo‘nalish va bitta varaqqa bir necha sahifa",
                 path="Печать → Ориентация / Страниц на листе",
                 en="Print → Orientation / Pages per Sheet",
                 steps=["<b>Книжная ориентация</b> → <b>Альбомная ориентация</b> — varaqni yotiq qilish.",
                        "Oxirgi sozlama <b>1 страница на листе</b> → <b>2 страницы на листе</b> (yoki 4) — qog‘ozni tejash uchun."],
                 note=None),
        ],
        keys=[
            ("[[Ctrl]] + [[P]]", "Chop etish", "Chop etish oynasini ochish."),
            ("[[F12]]", "Boshqacha saqlash", "PDF ga saqlashning eng tez yo‘li."),
            ("[[F7]]", "Imlo tekshirish", "Imlo va grammatika panelini ochish."),
            ("[[Ctrl]] + [[O]]", "Ochish", "Kompyuterdagi faylni ochish."),
            ("[[Ctrl]] + [[W]]", "Hujjatni yopish", "Saqlanmagan bo‘lsa, Word “Saqlaysizmi?” deb so‘raydi — Сохранить ni bosing."),
        ],
        task=dict(
            title="Yakuniy sinov: tuzatish, PDF va printer sozlamalari",
            steps=[
                "Namunadagi matnni Word’da xuddi o‘zidek (xatolari bilan) tering yoki o‘qituvchi bergan faylni oching.",
                "Xatolarni toping va tuzating: o‘ng tugma takliflari va o‘zingiz o‘qib tekshirish. Matnda <b>8 ta</b> imlo xatosi bor.",
                "[[F12]] → <b>Тип файла: PDF</b> → nom: <code>Familiya.pdf</code> → Сохранить.",
                "[[Ctrl]] + [[P]] oynasida o‘qituvchiga 3 ta sozlamani ko‘rsating:",
                "&nbsp;&nbsp;a) faqat 1-sahifani chiqarish (<b>Страницы: 1</b>);",
                "&nbsp;&nbsp;b) bitta varaqqa 2 sahifa (<b>2 страницы на листе</b>);",
                "&nbsp;&nbsp;c) albom yo‘nalishi (<b>Альбомная ориентация</b>).",
            ],
            reqs=[("Xatolar", "8 ta, hammasi tuzatilgan"), ("PDF", "Familiya.pdf"), ("Printer", "3 ta sozlama ko‘rsatiladi")],
            checks=["Barcha 8 ta xato tuzatilgan", "PDF fayl yaratilgan va ochiladi", "“Faqat 1-sahifa” ko‘rsatildi",
                    "“2 sahifa varaqqa” ko‘rsatildi", "“Albom” ko‘rsatildi"],
            sample_class="",
            sample=[
                """
<p class="c b">YAKUNIY TEKSHIRUV MATNI</p>
<p class="c">(xatolarni toping va tuzating)</p>
<div class="gap"></div>
<p class="j ind">Kompuyuter texnalogiyalarini urgangan mutaxasis kelajakda samarali faoliyat olib boradi.</p>
<p class="j ind">Hamshira bemorlarning malumotlarini elektiron shaklda saqlaydi.</p>
<p class="j ind">Ofis dasturlari ichida Word dasturi matinlar bilan ishlashda eng qulay vosita hisoblanad.</p>
"""],
            answer=[
                ("Kompuyuter", "Kompyuter"), ("texnalogiyalarini", "texnologiyalarini"), ("urgangan", "o‘rgangan"),
                ("mutaxasis", "mutaxassis"), ("malumotlarini", "ma’lumotlarini"), ("elektiron", "elektron"),
                ("matinlar", "matnlar"), ("hisoblanad", "hisoblanadi"),
            ],
            answer_text="Kompyuter texnologiyalarini o‘rgangan mutaxassis kelajakda samarali faoliyat olib boradi. Hamshira bemorlarning ma’lumotlarini elektron shaklda saqlaydi. Ofis dasturlari ichida Word dasturi matnlar bilan ishlashda eng qulay vosita hisoblanadi.",
        ),
        fixes=[
            "Ctrl + W “saqlab yopadi” deyilgan edi — noto‘g‘ri: u faqat yopadi, saqlanmagan bo‘lsa so‘raydi.",
            "Word o‘zbek tilini to‘liq tekshira olmasligi haqida ogohlantirish qo‘shildi — aks holda talabalar “chiziq yo‘q, demak xato yo‘q” deb o‘ylaydi.",
            "Tekshiruv matnidagi xatolar 4 tadan 8 taga oshirildi (ikkinchi gapda xato yo‘q edi), tibbiyotga oid gap qo‘shildi. O‘qituvchi uchun javoblar kaliti tayyorlandi.",
            "Sahifalar oralig‘ini yozish tartibi aniqlashtirildi: “1-3” va “2,5”.",
        ],
    ),
]


# ----------------------------------------------------------------------
# Har bir darsning o'z rangi va muqovadagi mavzuga mos rasmi
# (rasm — chiziqli SVG, 400x300 maydonda; rangi avtomatik qo'yiladi)
# ----------------------------------------------------------------------
THEMES = {
    # 1: ariza varag'i — o'ngdagi "kimga" qatorlari, sarlavha, matn
    1: dict(acc="#3b82f6", light="#93c5fd", name="ko‘k",
            motif='<rect x="120" y="20" width="170" height="240" rx="6"/>'
                  '<line x1="215" y1="50" x2="270" y2="50"/><line x1="200" y1="62" x2="270" y2="62"/><line x1="225" y1="74" x2="270" y2="74"/>'
                  '<line x1="185" y1="100" x2="225" y2="100" stroke-width="5"/>'
                  '<line x1="155" y1="125" x2="270" y2="125"/><line x1="140" y1="137" x2="270" y2="137"/><line x1="140" y1="149" x2="270" y2="149"/><line x1="140" y1="161" x2="230" y2="161"/>'
                  '<line x1="140" y1="215" x2="175" y2="215"/><path d="M215 220c10-14 18 8 28-4s14 2 24-6"/>'),
    # 2: jadval
    2: dict(acc="#10b981", light="#6ee7b7", name="yashil",
            motif='<rect x="60" y="50" width="280" height="200" rx="4"/>'
                  '<rect x="60" y="50" width="280" height="34" fill-opacity="0.35"/>'
                  '<line x1="60" y1="84" x2="340" y2="84"/><line x1="60" y1="117" x2="340" y2="117"/><line x1="60" y1="150" x2="340" y2="150"/>'
                  '<line x1="60" y1="183" x2="340" y2="183"/><line x1="60" y1="216" x2="340" y2="216"/>'
                  '<line x1="95" y1="84" x2="95" y2="250"/><line x1="160" y1="84" x2="160" y2="250"/><line x1="225" y1="84" x2="225" y2="250"/><line x1="290" y1="84" x2="290" y2="250"/>'),
    # 3: shakllar va rasm
    3: dict(acc="#f97316", light="#fdba74", name="to‘q sariq",
            motif='<rect x="50" y="40" width="300" height="50" rx="4" fill-opacity="0.3"/>'
                  '<rect x="50" y="115" width="120" height="120" rx="4"/><circle cx="85" cy="150" r="14"/><path d="M50 225l45-50 30 30 20-20 25 30"/>'
                  '<circle cx="250" cy="160" r="45"/><path d="M200 250h110l-18-14m18 14l-18 14"/>'),
    # 4: ro'yxat
    4: dict(acc="#8b5cf6", light="#c4b5fd", name="binafsha",
            motif='<text x="70" y="78" font-size="30" font-weight="900" stroke="none" fill-opacity="0.9">1.</text>'
                  '<line x1="115" y1="68" x2="320" y2="68" stroke-width="5"/>'
                  '<circle cx="128" cy="105" r="5"/><line x1="145" y1="105" x2="330" y2="105"/>'
                  '<circle cx="128" cy="135" r="5"/><line x1="145" y1="135" x2="300" y2="135"/>'
                  '<text x="70" y="190" font-size="30" font-weight="900" stroke="none" fill-opacity="0.9">2.</text>'
                  '<line x1="115" y1="180" x2="300" y2="180" stroke-width="5"/>'
                  '<circle cx="128" cy="217" r="5"/><line x1="145" y1="217" x2="330" y2="217"/>'
                  '<circle cx="128" cy="247" r="5"/><line x1="145" y1="247" x2="280" y2="247"/>'),
    # 5: ramka, WordArt, ikki ustun
    5: dict(acc="#06b6d4", light="#67e8f9", name="moviy",
            motif='<rect x="80" y="20" width="240" height="260" rx="4"/><rect x="92" y="32" width="216" height="236" rx="2" stroke-dasharray="4 5"/>'
                  '<line x1="130" y1="65" x2="270" y2="65" stroke-width="10"/>'
                  '<line x1="200" y1="95" x2="200" y2="245"/>'
                  '<line x1="110" y1="100" x2="188" y2="100"/><line x1="110" y1="115" x2="188" y2="115"/><line x1="110" y1="130" x2="188" y2="130"/><line x1="110" y1="145" x2="188" y2="145"/><line x1="110" y1="160" x2="170" y2="160"/>'
                  '<line x1="212" y1="100" x2="290" y2="100"/><line x1="212" y1="115" x2="290" y2="115"/><line x1="212" y1="130" x2="290" y2="130"/><line x1="212" y1="145" x2="290" y2="145"/><line x1="212" y1="160" x2="290" y2="160"/><line x1="212" y1="175" x2="260" y2="175"/>'),
    # 6: printer va PDF
    6: dict(acc="#e11d48", light="#fda4af", name="qizil",
            motif='<rect x="60" y="120" width="190" height="90" rx="10"/><rect x="95" y="60" width="120" height="60"/>'
                  '<rect x="95" y="180" width="120" height="85" fill-opacity="0.25"/><line x1="115" y1="205" x2="195" y2="205"/><line x1="115" y1="225" x2="195" y2="225"/><line x1="115" y1="245" x2="170" y2="245"/>'
                  '<circle cx="225" cy="145" r="6"/>'
                  '<path d="M280 40h60l25 25v110h-85z"/><path d="M340 40v25h25"/>'
                  '<text x="292" y="135" font-size="26" font-weight="900" stroke="none" fill-opacity="0.9">PDF</text>'),
}
