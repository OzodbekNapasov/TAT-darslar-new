# Google Sheets va Telegram Bot To'liq Integratsiyasi (Jonli Natijalar va Mavzular Bo'yicha Varaqlar)

Ushbu tizim:
1. Google Sheets jadvalingizda har bir dars mavzusi bo'yicha alohida yangi varaq (list/tab) ochib, natijalarni chiroyli tartibda saqlaydi;
2. Telegram botingizda har bir talaba test topshirganda bitta xabarni **jonli ravishda yangilab (edit qilib)**, Top-10 talabalar reytingi va umumiy statistikasini ko'rsatib boradi;
3. Shu bilan birga har bir topshirilgan test haqida qisqa bildirishnoma ham yetkazadi.

---

## Ma'lumotlaringiz

- **Google Sheets jadvali:** [https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit)
- **Telegram Bot nomi:** `Mavzu testlari`
- **Telegram Bot username:** `@test_results111111111111_bot`
- **Telegram Bot Token:** `8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM`

---

## 1-QADAM: Shaxsiy Chat ID raqamingizni olish (30 soniya)

Botingiz xabarlarni aynan sizga (yoki guruhingizga) yuborishi uchun sizning Telegram Chat ID raqamingiz kerak:
1. Telegram dasturida botingizni oching: **[@test_results111111111111_bot](https://t.me/test_results111111111111_bot)**
2. Pastdagi **"Start"** (yoki `/start`) tugmasini bosing.
3. So'ngra Telegram'da **[@userinfobot](https://t.me/userinfobot)** ga kirib `/start` bosing. U sizga shaxsiy `Id: 123456789` raqamingizni yozib beradi. O'sha raqamni nusxalab oling.
   *(Agar natijalar Telegram guruhga tushishini istasangiz, botni o'sha guruhga admin qilib qo'shing va guruh Chat ID sini oling).*

---

## 2-QADAM: Google Sheets ichiga Apps Script kodini qo'yish (2 daqiqa)

1. Google Sheets jadvalingizni oching:
   [Jadvalni ochish](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit)
2. Yuqori menyudan: **Extensions (Kengaytmalar) -> Apps Script** bo'limiga kiring.
3. Ochilgan tahrirchidagi barcha eski matnni o'chirib, quyidagi kodni to'liq nusxalab joylashtiring:

```javascript
// ======================================================================
// TAT DARSLAR — GOOGLE SHEETS VA TELEGRAM JONLI INTEGRATSIYASI
// Shahrisabz Tibbiyot Texnikumi
// ======================================================================

const TELEGRAM_BOT_TOKEN = "8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM";

// 1-qadamda olgan shaxsiy Chat ID raqamingizni quyidagi qo'shtirnoq ichiga yozing:
const TELEGRAM_CHAT_ID = "SIZNING_CHAT_IDINGIZ";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "empty" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Mavzu bo'yicha varaq (tab/list) nomini aniqlash va varaqni topish/yaratish
    const sheetName = getSheetNameFromLesson(data.lesson);
    const sheet = getOrCreateSheet(ss, sheetName);

    // 2. Varaqqa yangi qator qo'shish
    const rowNumber = sheet.getLastRow(); // Tartib raqami
    sheet.appendRow([
      rowNumber,
      data.date || new Date().toLocaleString("uz-UZ"),
      data.studentName,
      data.group,
      data.lesson,
      data.correctCount,
      data.totalQuestions,
      data.percent + "%",
      data.grade + " (" + (data.gradeLabel || "") + ")",
      data.timeSpent
    ]);

    // Formatlash
    const lastRow = sheet.getLastRow();
    const rowRange = sheet.getRange(lastRow, 1, 1, 10);
    rowRange.setVerticalAlignment("middle");
    sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 6, 1, 5).setHorizontalAlignment("center");

    // 3. Telegram Botga jonli xabar (edit) va bildirishnoma yuborish
    const chatId = getEffectiveChatId();
    if (TELEGRAM_BOT_TOKEN && chatId) {
      // Jonli reyting xabarini tahrirlash (editMessageText)
      updateLiveTelegramLeaderboard(sheet, sheetName, data, chatId);

      // Har bir topshiruvchi bo'yicha qisqa lahzali xabar
      const alertText = 
        "<b>Yangi topshiriq:</b> " + escapeHtml(data.studentName) + " (" + escapeHtml(data.group) + ")\n" +
        "<b>Mavzu:</b> " + escapeHtml(sheetName) + "\n" +
        "<b>Natija:</b> " + data.correctCount + " / " + data.totalQuestions + " (" + data.percent + "%) — <b>Baho: " + data.grade + "</b>";
      
      sendTelegramMessage(TELEGRAM_BOT_TOKEN, chatId, alertText);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ----------------------------------------------------------------------
// VARAQLARNI (SHEETS) BOSHQARISH FUNKSIYALARI
// ----------------------------------------------------------------------
function getSheetNameFromLesson(lesson) {
  if (!lesson) return "5-Dars";
  if (lesson.indexOf("1-") !== -1 || lesson.indexOf("1.") !== -1) return "1-Dars";
  if (lesson.indexOf("2-") !== -1 || lesson.indexOf("2.") !== -1) return "2-Dars";
  if (lesson.indexOf("3-") !== -1 || lesson.indexOf("3.") !== -1) return "3-Dars";
  if (lesson.indexOf("4-") !== -1 || lesson.indexOf("4.") !== -1) return "4-Dars";
  if (lesson.indexOf("5-") !== -1 || lesson.indexOf("5.") !== -1) return "5-Dars";
  if (lesson.indexOf("6-") !== -1 || lesson.indexOf("6.") !== -1) return "6-Dars";
  return lesson.split(":")[0].trim().substring(0, 30);
}

function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    const headers = [
      "T/r",
      "Sana va vaqt",
      "Talaba F.I.SH",
      "Guruhi",
      "Mavzu",
      "To'g'ri javob",
      "Jami savol",
      "Foiz",
      "Baho",
      "Sarflangan vaqt"
    ];
    sheet.appendRow(headers);
    
    // Sarlavha bezagi
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#4f46e5");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
    
    sheet.setColumnWidth(1, 45);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(3, 230);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 220);
    sheet.setColumnWidth(6, 110);
    sheet.setColumnWidth(7, 100);
    sheet.setColumnWidth(8, 85);
    sheet.setColumnWidth(9, 110);
    sheet.setColumnWidth(10, 140);
  }
  return sheet;
}

// ----------------------------------------------------------------------
// TELEGRAM JONLI REYTING (LIVE LEADERBOARD)
// ----------------------------------------------------------------------
function updateLiveTelegramLeaderboard(sheet, sheetName, lastData, chatId) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  const values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  const totalSubmissions = values.length;

  let sumPercent = 0;
  values.forEach(row => {
    const p = parseInt(row[7]);
    if (!isNaN(p)) sumPercent += p;
  });
  const avgPercent = Math.round(sumPercent / totalSubmissions);

  // Top-10 reyting saralash
  const sorted = values.slice().sort((a, b) => {
    const scoreA = parseInt(a[5]) || 0;
    const scoreB = parseInt(b[5]) || 0;
    return scoreB - scoreA;
  });

  const top10 = sorted.slice(0, 10);
  let rankingText = "";
  top10.forEach((r, idx) => {
    const num = (idx + 1) + ".";
    rankingText += num + " <b>" + escapeHtml(r[2]) + "</b> (" + escapeHtml(r[3]) + ") — " + r[5] + "/" + r[6] + " (" + r[7] + ") [Baho: " + r[8].toString().split(' ')[0] + "]\n";
  });

  const nowStr = new Date().toLocaleTimeString("uz-UZ");

  const liveMessageText = 
    "<b>JONLI TEST REYTINQI</b>\n" +
    "<b>Mavzu:</b> " + escapeHtml(sheetName) + "\n" +
    "<b>Jami topshirganlar:</b> " + totalSubmissions + " nafar\n" +
    "<b>O'rtacha o'zlashtirish:</b> " + avgPercent + "%\n\n" +
    "<b>Top-10 Reyting:</b>\n" +
    rankingText + "\n" +
    "<b>So'nggi topshirgan:</b> " + escapeHtml(lastData.studentName) + " (" + escapeHtml(lastData.group) + ") — " + lastData.correctCount + "/" + lastData.totalQuestions + " (" + lastData.percent + "%)\n" +
    "<i>Jonli yangilandi: " + nowStr + "</i>\n" +
    "<i>Shahrisabz Tibbiyot Texnikumi</i>";

  const props = PropertiesService.getScriptProperties();
  const propKey = "LIVE_MSG_ID_" + sheetName.replace(/[^a-zA-Z0-9]/g, "_");
  const existingMsgId = props.getProperty(propKey);

  let edited = false;
  if (existingMsgId) {
    edited = editTelegramMessage(TELEGRAM_BOT_TOKEN, chatId, existingMsgId, liveMessageText);
  }

  if (!edited) {
    const newMsgId = sendTelegramMessage(TELEGRAM_BOT_TOKEN, chatId, liveMessageText);
    if (newMsgId) {
      props.setProperty(propKey, String(newMsgId));
    }
  }
}

function sendTelegramMessage(token, chatId, text) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    const res = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" }),
      muteHttpExceptions: true
    });
    const json = JSON.parse(res.getContentText());
    return json.ok ? json.result.message_id : null;
  } catch (e) {
    return null;
  }
}

function editTelegramMessage(token, chatId, messageId, text) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/editMessageText";
    const res = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: chatId, message_id: messageId, text: text, parse_mode: "HTML" }),
      muteHttpExceptions: true
    });
    const json = JSON.parse(res.getContentText());
    return json.ok;
  } catch (e) {
    return false;
  }
}

function getEffectiveChatId() {
  if (TELEGRAM_CHAT_ID && TELEGRAM_CHAT_ID !== "SIZNING_CHAT_IDINGIZ") {
    return TELEGRAM_CHAT_ID;
  }
  return PropertiesService.getScriptProperties().getProperty("TELEGRAM_CHAT_ID");
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
```

4. `const TELEGRAM_CHAT_ID = "SIZNING_CHAT_IDINGIZ";` joyiga o'z Chat ID raqamingizni yozing.
5. Yuqoridagi **Save (Saqlash / disketa)** belgisini bosing.

---

## 3-QADAM: Web App sifatida e'lon qilish (Deploy)

1. Apps Script oynasining yuqori o'ng burchagidagi ko'k **Deploy (O'rnatish) -> New deployment (Yangi o'rnatish)** tugmasini bosing.
2. Tishli g'ildirakchani bosib **Web app** ni tanlang:
   - **Description:** `TAT Test API`
   - **Execute as:** `Me` (Mening hisobimdan)
   - **Who has access:** `Anyone` (Hamma / Har kim) — *talabalar loginsiz test yuborishi uchun shart!*
3. **Deploy** tugmasini bosing.
4. Google ruxsat so'rasa:
   - **Authorize access** ni bosing;
   - O'z Google profilingizni tanlang;
   - Agar ogohlantirish chiqsa: **Advanced** -> **Go to Untitled project (unsafe)** havolasini bosing va **Allow** tugmasini bosing.
5. Chiqqan **Web app URL** manzilini nusxalab oling (masalan: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 4-QADAM: Test sahifasiga ulash

1. [test-5.html](test-5.html) sahifasini brauzerda oching.
2. Yuqoridagi **Sozlamalar** (tishli g'ildirakcha) belgisini bosing.
3. Nusxalab olgan **Web app URL** manzilingizni qo'yib **"Sozlamani Saqlash"** tugmasini bosing.
*(Yoki menga o'sha Web App URL manzilingizni yozib yuborsangiz, uni to'g'ridan-to'g'ri loyiha kodiga biriktirib, GitHub'ga push qilib qo'yaman).*
