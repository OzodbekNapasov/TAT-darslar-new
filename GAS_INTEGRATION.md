# Google Sheets va Telegram Bot To'liq Integratsiyasi (Jonli Natijalar, PDF & Excel Export)

Ushbu tizim:
1. **Google Sheets jadvali:** Har bir dars mavzusi bo'yicha alohida yangi varaq (list/tab) ochib, natijalarni chiroyli tartibda saqlaydi;
2. **Telegram Botda Jonli Reyting (Doimiy Edit bo'lib turadi):** Bitta umumiy reyting xabari har bir yangi natijada joyida yangilanadi. Unda:
   - Jami topshirganlar soni va o'rtacha o'zlashtirish foizi;
   - Top-10 talabalar ro'yxati: **Guruhi (26-01, 26-02...), F.I.SH va Bahosi (5, 4, 3)** katta va aniq ko'rinadi;
   - Eng so'nggi topshirgan talaba haqidagi ma'lumotlar;
3. **Eksport Tugmalari (Tugmalar orqali yuklab olish):** Xabar ostida avtomatik ravishda:
   - **[PDF formatda yuklab olish]** — bitta bosishda Google Sheets jadvalining tayyor chiroyli A4 PDF formatini yuklab beradi;
   - **[Excel (.xlsx) yuklab olish]** — kompyuterga Excel fayli ko'rinishida yuklaydi;
   - **[Google Sheets jadvalini ochish]** — to'g'ridan-to'g'ri elektron jadvalga o'tish;
4. **Lahzali Xabar:** Har bir topshirilgan test haqida o'qituvchiga qisqa bildirishnoma ham yetib turadi.

---

## Tasdiqlangan Aniq Sozlamalaringiz

- **Google Sheets jadvali:** [https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit)
- **Telegram Bot nomi:** `Mavzu testlari` (@test_results111111111111_bot)
- **Telegram Bot Token:** `8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM`
- **Sizning Tasdiqlangan Shaxsiy Chat ID:** `8135594558`

---

## Google Sheets ichidagi Apps Script kodini yangilash (1 daqiqa)

1. [Google Sheets jadvalingizni](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit) oching.
2. Menyudan: **Extensions (Kengaytmalar) -> Apps Script** bo'limiga kiring.
3. U yerdagi kodni to'liq o'chirib, quyidagi **yangilangan to'liq kodni** nusxalab joylashtiring:

```javascript
// ======================================================================
// TAT DARSLAR — GOOGLE SHEETS VA TELEGRAM JONLI INTEGRATSIYASI
// Shahrisabz Tibbiyot Texnikumi
// ======================================================================

const TELEGRAM_BOT_TOKEN = "8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM";
const TELEGRAM_CHAT_ID = "8135594558";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "empty" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. GOOGLE SHEETS GA YOZISH (Telegramdan to'liq mustaqil)
    let sheetSuccess = false;
    let sheet = null;
    let sheetName = "5-Dars";

    try {
      sheetName = getSafeSheetName(data.lesson);
      sheet = getOrCreateSheet(ss, sheetName);

      const rowNumber = sheet.getLastRow();
      sheet.appendRow([
        rowNumber,
        data.date || new Date().toLocaleString("uz-UZ"),
        data.studentName || "Noma'lum",
        data.group || "-",
        data.lesson || "5-Dars",
        data.correctCount !== undefined ? data.correctCount : 0,
        data.totalQuestions !== undefined ? data.totalQuestions : 20,
        (data.percent !== undefined ? data.percent : 0) + "%",
        (data.grade || 2) + " (" + (data.gradeLabel || "") + ")",
        data.timeSpent || "-"
      ]);

      const lastRow = sheet.getLastRow();
      const rowRange = sheet.getRange(lastRow, 1, 1, 10);
      rowRange.setVerticalAlignment("middle");
      sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
      sheet.getRange(lastRow, 6, 1, 5).setHorizontalAlignment("center");

      sheetSuccess = true;
    } catch (sheetErr) {
      console.error("Sheets xatosi:", sheetErr);
    }

    // 2. TELEGRAM BOTGA JONLI XABAR (EDIT) VA TUGMALAR
    try {
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        if (sheet && sheetSuccess) {
          updateLiveTelegramLeaderboard(ss, sheet, sheetName, data, TELEGRAM_CHAT_ID);
        }

        // Qisqa lahzali xabar
        const alertText = 
          "<b>Yangi topshiriq:</b> " + escapeHtml(data.studentName) + "\n" +
          "<b>Guruh:</b> " + escapeHtml(data.group) + " | <b>Mavzu:</b> " + escapeHtml(sheetName) + "\n" +
          "<b>Natija:</b> " + data.correctCount + " / " + data.totalQuestions + " (" + data.percent + "%) — <b>Baho: " + data.grade + " (" + escapeHtml(data.gradeLabel) + ")</b>";
        
        sendTelegramSimpleMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, alertText);
      }
    } catch (tgErr) {
      console.error("Telegram xatosi:", tgErr);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", sheet: sheetSuccess }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (globalErr) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: globalErr.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "ok", 
    message: "TAT Test Integratsiya API faol ishlamoqda" 
  })).setMimeType(ContentService.MimeType.JSON);
}

// ----------------------------------------------------------------------
// VARAQLARNI (SHEETS) BOSHQARISH
// ----------------------------------------------------------------------
function getSafeSheetName(lesson) {
  if (!lesson) return "5-Dars";
  if (lesson.indexOf("1-") !== -1 || lesson.indexOf("1.") !== -1) return "1-Dars";
  if (lesson.indexOf("2-") !== -1 || lesson.indexOf("2.") !== -1) return "2-Dars";
  if (lesson.indexOf("3-") !== -1 || lesson.indexOf("3.") !== -1) return "3-Dars";
  if (lesson.indexOf("4-") !== -1 || lesson.indexOf("4.") !== -1) return "4-Dars";
  if (lesson.indexOf("5-") !== -1 || lesson.indexOf("5.") !== -1) return "5-Dars";
  if (lesson.indexOf("6-") !== -1 || lesson.indexOf("6.") !== -1) return "6-Dars";

  let clean = lesson.split(":")[0].replace(/[\[\]\*?\:\/\\]/g, "").trim();
  return clean.substring(0, 30) || "Test Natijalari";
}

function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    const headers = [
      "T/r", "Sana va vaqt", "Talaba F.I.SH", "Guruhi", "Mavzu",
      "To'g'ri javob", "Jami savol", "Foiz", "Baho", "Sarflangan vaqt"
    ];
    sheet.appendRow(headers);
    
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
// TELEGRAM JONLI REYTING (LIVE LEADERBOARD VA EKSPORT TUGMALARI)
// ----------------------------------------------------------------------
function updateLiveTelegramLeaderboard(ss, sheet, sheetName, lastData, chatId) {
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
    rankingText += 
      num + " <b>" + escapeHtml(r[2]) + "</b>\n" +
      "   Guruh: <b>" + escapeHtml(r[3]) + "</b> | Natija: " + r[5] + "/" + r[6] + " (" + r[7] + ")\n" +
      "   Baho: <b>" + escapeHtml(r[8]) + "</b> | Vaqt: " + escapeHtml(r[9]) + "\n\n";
  });

  const nowStr = new Date().toLocaleTimeString("uz-UZ");

  const liveMessageText = 
    "<b>===================================</b>\n" +
    "<b>JONLI TEST NATIJALARI VA REYTINGI</b>\n" +
    "<b>===================================</b>\n" +
    "<b>Mavzu:</b> " + escapeHtml(sheetName) + "\n" +
    "<b>Jami topshirganlar:</b> " + totalSubmissions + " nafar\n" +
    "<b>O'rtacha o'zlashtirish:</b> " + avgPercent + "%\n\n" +
    "<b>TOP-10 TALABALAR REYTINGI:</b>\n\n" +
    rankingText +
    "<b>-----------------------------------</b>\n" +
    "<b>SO'NGGI TOPSHIRGAN TALABA:</b>\n" +
    "• F.I.SH: <b>" + escapeHtml(lastData.studentName) + "</b>\n" +
    "• Guruhi: <b>" + escapeHtml(lastData.group) + "</b>\n" +
    "• Natijasi: <b>" + lastData.correctCount + " / " + lastData.totalQuestions + " (" + lastData.percent + "%)</b>\n" +
    "• Bahosi: <b>" + lastData.grade + " (" + escapeHtml(lastData.gradeLabel) + ")</b>\n" +
    "• Vaqti: " + escapeHtml(lastData.date) + "\n" +
    "<b>-----------------------------------</b>\n" +
    "<i>Jonli yangilandi: " + nowStr + "</i>\n" +
    "<i>Shahrisabz Tibbiyot Texnikumi</i>";

  // Eksport tugmalari (PDF, Excel, Google Sheets)
  const ssId = ss.getId();
  const pdfUrl = "https://docs.google.com/spreadsheets/d/" + ssId + "/export?format=pdf&portrait=false&size=a4&gridlines=true";
  const xlsxUrl = "https://docs.google.com/spreadsheets/d/" + ssId + "/export?format=xlsx";
  const sheetUrl = "https://docs.google.com/spreadsheets/d/" + ssId + "/edit";

  const keyboard = {
    inline_keyboard: [
      [
        { text: "PDF formatda yuklab olish", url: pdfUrl },
        { text: "Excel (.xlsx) yuklab olish", url: xlsxUrl }
      ],
      [
        { text: "Google Sheets jadvalini ochish", url: sheetUrl }
      ]
    ]
  };

  const props = PropertiesService.getScriptProperties();
  const propKey = "LIVE_MSG_ID_" + sheetName.replace(/[^a-zA-Z0-9]/g, "_");
  const existingMsgId = props.getProperty(propKey);

  let edited = false;
  if (existingMsgId) {
    edited = editTelegramMessageWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, existingMsgId, liveMessageText, keyboard);
  }

  if (!edited) {
    const newMsgId = sendTelegramMessageWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, liveMessageText, keyboard);
    if (newMsgId) {
      props.setProperty(propKey, String(newMsgId));
    }
  }
}

function sendTelegramMessageWithKeyboard(token, chatId, text, keyboard) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    const res = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML", reply_markup: keyboard }),
      muteHttpExceptions: true
    });
    const json = JSON.parse(res.getContentText());
    return json.ok ? json.result.message_id : null;
  } catch (e) {
    return null;
  }
}

function editTelegramMessageWithKeyboard(token, chatId, messageId, text, keyboard) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/editMessageText";
    const res = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: chatId, message_id: messageId, text: text, parse_mode: "HTML", reply_markup: keyboard }),
      muteHttpExceptions: true
    });
    const json = JSON.parse(res.getContentText());
    return json.ok;
  } catch (e) {
    return false;
  }
}

function sendTelegramSimpleMessage(token, chatId, text) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "HTML" }),
      muteHttpExceptions: true
    });
  } catch (e) {}
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
```

4. Yuqoridagi **Save (Saqlash)** tugmasini bosing.
5. So'ngra: **Deploy -> Manage deployments** bo'limiga kirib:
   - Qalamcha (**Edit**) ni bosing;
   - **Version:** "New version" (Yangi versiya) ni tanlang;
   - **Deploy** tugmasini bosing!
