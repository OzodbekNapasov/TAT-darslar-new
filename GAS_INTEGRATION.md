# Google Sheets va Telegram Bot Integratsiyasi Qo'llanmasi

Ushbu qo'llanma orqali "TAT darslar" test tizimidan topshirilgan barcha test natijalarini real vaqtda **Google Sheets** elektron jadvaliga avtomatik yozish va shaxsiy **Telegram Bot**ingizga (yoki Telegram guruhga) hisobot xabari tushishini 5 daqiqada sozlashingiz mumkin.

---

## 1-Qadam: Telegram Bot yaratish va Chat ID olish (2 daqiqa)

1. Telegram dasturida **[@BotFather](https://t.me/BotFather)** botini oching va `/start` bosing.
2. Yangi bot ochish uchun `/newbot` buyrug'ini yuboring.
3. Botingizga nom bering (masalan: `TAT Test Natijalari`).
4. Botingizga username bering (masalan: `tat_natijalar_bot` — oxiri `bot` bilan tugashi shart).
5. **BotFather** sizga maxsus **HTTP API Token** beradi. Uni nusxalab oling:
   - *Misol token:* `7123456789:AAFlmQ7J...`
6. O'zingiz ochgan yangi botga kirib **"Start"** tugmasini bosib qo'ying (bu bot sizga xabar yubora olishi uchun shart).
7. Shaxsiy **Chat ID** raqamingizni bilish uchun Telegram'da **[@userinfobot](https://t.me/userinfobot)** ga kiring va `/start` bosing. U sizga `Id: 123456789` raqamingizni ko'rsatadi.
   *(Agar natijalar Telegram guruhga tushishini istasangiz, botingizni o'sha guruhga qo'shing va admin qiling).*

---

## 2-Qadam: Google Sheets jadvalini ochish (1 daqiqa)

1. Brauzerda yangi Google jadval oching: **[https://sheets.new](https://sheets.new)**
2. Jadval nomini o'zgartiring (masalan: `TAT 5-Dars Test Natijalari`).
3. Jadvalning birinchi qatoriga ustun nomlarini quyidagicha yozib chiqing:
   - **A1:** `Sana va vaqt`
   - **B1:** `Talaba F.I.SH`
   - **C1:** `Guruhi`
   - **D1:** `Mavzu / Dars`
   - **E1:** `To'g'ri javoblar`
   - **F1:** `Jami savollar`
   - **G1:** `Foiz`
   - **H1:** `Baho`
   - **I1:** `Sarflangan vaqt`

---

## 3-Qadam: Google Apps Script kodini kiritish (2 daqiqa)

1. Google Sheets jadvali menyusidan: **Extensions (Kengaytmalar) -> Apps Script** bo'limini oching.
2. Ochilgan kod tahrirchisidagi mavjud kodni o'chirib, quyidagi tayyor kodni to'liq nusxalab qo'ying:

```javascript
// ======================================================================
// TELEGRAM BOT VA GOOGLE SHEETS INTEGRATSIYASI (TAT DARSLAR)
// ======================================================================

// 1-qadamda olgan Bot Tokeningiz va Chat ID raqamingizni shu yerga yozing:
const TELEGRAM_BOT_TOKEN = "SIZNING_BOT_TOKENINGIZ";
const TELEGRAM_CHAT_ID = "SIZNING_CHAT_IDINGIZ";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Google Sheets jadvaliga yangi qator qo'shish
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      data.date || new Date().toLocaleString("uz-UZ"),
      data.studentName,
      data.group,
      data.lesson,
      data.correctCount,
      data.totalQuestions,
      data.percent + "%",
      data.grade + " (" + data.gradeLabel + ")",
      data.timeSpent
    ]);
    
    // 2. Telegram bot orqali bildirishnoma yuborish
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID && TELEGRAM_BOT_TOKEN !== "SIZNING_BOT_TOKENINGIZ") {
      const msg = 
        "<b>TAT Darslik — Yangi Test Natijasi</b>\n\n" +
        "<b>Talaba:</b> " + escapeHtml(data.studentName) + "\n" +
        "<b>Guruh:</b> " + escapeHtml(data.group) + "\n" +
        "<b>Mavzu:</b> " + escapeHtml(data.lesson) + "\n" +
        "-------------------------------------\n" +
        "<b>Natija:</b> " + data.correctCount + " / " + data.totalQuestions + " (" + data.percent + "%)\n" +
        "<b>Baho:</b> " + data.grade + " (" + escapeHtml(data.gradeLabel) + ")\n" +
        "<b>Ketgan vaqt:</b> " + escapeHtml(data.timeSpent) + "\n" +
        "<b>Sana:</b> " + escapeHtml(data.date) + "\n\n" +
        "<i>Shahrisabz Tibbiyot Texnikumi</i>";
        
      sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, msg);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTelegramMessage(token, chatId, text) {
  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML"
  };
  
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(url, options);
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
```

3. Kodning boshidagi `SIZNING_BOT_TOKENINGIZ` va `SIZNING_CHAT_IDINGIZ` o'rniga o'zingizning ma'lumotlaringizni qo'ying.
4. Yuqoridagi **Save (Saqlash)** tugmasini bosing.

---

## 4-Qadam: Web App sifatida e'lon qilish (Deploy)

1. Apps Script oynasining yuqori o'ng burchagidagi ko'k **Deploy (O'rnatish) -> New deployment (Yangi o'rnatish)** tugmasini bosing.
2. Chap tomondagi tishli g'ildirakcha (Select type) orqali **Web app** ni tanlang.
3. Sozlamalarni quyidagicha belgilang:
   - **Description:** `TAT Test API`
   - **Execute as:** `Me` (Mening hisobimdan)
   - **Who has access:** `Anyone` (Hamma / Har kim) — *bu parametr juda muhim, talabalar loginsiz natija yubora olishi uchun shart!*
4. **Deploy** tugmasini bosing.
5. Google bir marta xavfsizlik ruxsatini so'raydi:
   - **Authorize access** ni bosing;
   - O'z Google profilingizni tanlang;
   - Agar *"Google hasn't verified this app"* chiqsa: pastdagi **Advanced** -> **Go to Untitled project (unsafe)** havolasini bosing va **Allow** tugmasini bosing.
6. E'lon tugagach sizga **Web app URL** manzili beriladi (masalan: `https://script.google.com/macros/s/AKfycb.../exec`). Uni nusxalab oling!

---

## 5-Qadam: Test sahifasiga ulash

1. `test-5.html` sahifasiga kiring.
2. Yuqori o'ng burchakdagi **Sozlamalar** (tishli g'ildirakcha) belgisini bosing.
3. 4-qadamda olgan **Web app URL** manzilingizni qo'yib **"Sozlamani Saqlash"** tugmasini bosing.

Tayyor! Endi har qanday talaba ushbu sahifaga kirib test topshirishi bilan:
- **Telegram botingizga** darhol talabaning ismi, guruhi, to'plagan balli va bahosi haqida chiroyli bildirishnoma keladi.
- **Google Sheets jadvalingizga** yangi qator bo'lib avtomatik saqlanib boradi.
