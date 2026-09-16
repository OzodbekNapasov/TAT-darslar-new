# Google Sheets va Telegram Bot To'liq Integratsiyasi (Kafolatlangan Tizim)

Ushbu tizim:
1. Google Sheets jadvalingizda har bir dars mavzusi bo'yicha alohida yangi varaq (list/tab) ochib, natijalarni chiroyli tartibda saqlaydi;
2. Telegram botingizda har bir talaba test topshirganda bitta xabarni **jonli ravishda yangilab (edit qilib)**, Top-10 talabalar reytingi va umumiy statistikasini ko'rsatib boradi;
3. Har bir topshirilgan test haqida o'qituvchiga lahzali qisqa bildirishnoma yetkazadi;
4. **100% Xatoliklarga chidamli:** Agar Telegramda uzilish bo'lsa ham, Google Sheets'ga yozish hech qachon to'xtamaydi. Talaba interneti uzilsa, natija kompyuter xotirasida saqlanadi va internet paydo bo'lishi bilan avtomatik qayta yuboriladi!

---

## Sizning Aniq Ma'lumotlaringiz

- **Google Sheets jadvali:** [https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit)
- **Telegram Bot nomi:** `Mavzu testlari`
- **Telegram Bot username:** `@test_results111111111111_bot`
- **Telegram Bot Token:** `8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM`
- **Sizning Tasdiqlangan Shaxsiy Chat ID:** `8135594558`

---

## Google Sheets ichidagi Apps Script kodini yangilash (1 daqiqa)

1. [Google Sheets jadvalingizni](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit) oching.
2. Menyudan: **Extensions (Kengaytmalar) -> Apps Script** bo'limiga kiring.
3. U yerdagi kodni o'chirib, quyidagi **to'liq sozlangan va kafolatlangan kodni** qo'ying:

```javascript
// ======================================================================
// TAT DARSLAR — GOOGLE SHEETS VA TELEGRAM KAFOLATLANGAN INTEGRATSIYASI
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

    // 1. GOOGLE SHEETS GA YOZISH (Eng asosiy bosqich — Telegramdan mustaqil)
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

    // 2. TELEGRAM BOTGA XABAR YUBORISH (Alohida blok — xato bo'lsa ham jadvalga ta'sir qilmaydi)
    try {
      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        if (sheet && sheetSuccess) {
          updateLiveTelegramLeaderboard(sheet, sheetName, data, TELEGRAM_CHAT_ID);
        }

        const alertText = 
          "<b>Yangi topshiriq:</b> " + escapeHtml(data.studentName) + " (" + escapeHtml(data.group) + ")\n" +
          "<b>Mavzu:</b> " + escapeHtml(sheetName) + "\n" +
          "<b>Natija:</b> " + data.correctCount + " / " + data.totalQuestions + " (" + data.percent + "%) — <b>Baho: " + data.grade + "</b>";
        
        sendTelegramMessage(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, alertText);
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

// GET so'rovlari uchun zaxira (Redirect va tekshiruvlar uchun)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    status: "ok", 
    message: "TAT Test Integratsiya API faol ishlamoqda" 
  })).setMimeType(ContentService.MimeType.JSON);
}

// ----------------------------------------------------------------------
// VARAQLARNI (SHEETS) BOSHQARISH FUNKSIYALARI
// ----------------------------------------------------------------------
function getSafeSheetName(lesson) {
  if (!lesson) return "5-Dars";
  if (lesson.indexOf("1-") !== -1 || lesson.indexOf("1.") !== -1) return "1-Dars";
  if (lesson.indexOf("2-") !== -1 || lesson.indexOf("2.") !== -1) return "2-Dars";
  if (lesson.indexOf("3-") !== -1 || lesson.indexOf("3.") !== -1) return "3-Dars";
  if (lesson.indexOf("4-") !== -1 || lesson.indexOf("4.") !== -1) return "4-Dars";
  if (lesson.indexOf("5-") !== -1 || lesson.indexOf("5.") !== -1) return "5-Dars";
  if (lesson.indexOf("6-") !== -1 || lesson.indexOf("6.") !== -1) return "6-Dars";

  // Taqiqlangan belgilarni tozalash ( [ ] * ? : / \ )
  let clean = lesson.split(":")[0].replace(/[\[\]\*?\:\/\\]/g, "").trim();
  return clean.substring(0, 30) || "Test Natijalari";
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
// TELEGRAM JONLI REYTING VA XABAR FUNKSIYALARI
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
    "<b>O'rtacha ko'rsatkich:</b> " + avgPercent + "%\n\n" +
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

function escapeHtml(text) {
  if (!text) return "";
  return text.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
```

4. Kodni qo'ygach, yuqoridagi **Save (Saqlash / disketa)** belgisini bosing.
5. So'ngra: **Deploy -> Manage deployments (O'rnatishlarni boshqarish)** bo'limiga kiring:
   - Qalamcha (Tahrirlash) belgisini bosing;
   - **Version:** "New version" (Yangi versiya) ni tanlang;
   - **Deploy** tugmasini bosing!
