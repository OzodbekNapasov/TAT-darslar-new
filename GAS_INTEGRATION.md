# Google Sheets va Telegram Bot To'liq Integratsiyasi (Bot Tugmalari, Alifbo Tartibi, PDF va Excel Export)

Ushbu tizim Shahrisabz Tibbiyot Texnikumi "Tibbiyotda axborot texnologiyalari" (TAT) fani uchun maxsus ishlab chiqilgan.

---

## 1. Yangi Tizim Imkoniyatlari

1. **Doimiy Bot Tugmalari (ReplyKeyboardMarkup):**
   - Telegram chat oynasining pastki qismida doimiy boshqaruv paneli turadi:
     - Guruhlar tugmalari: `26-01 guruhi`, `26-02 guruhi`, `26-03 guruhi`, `26-04 guruhi`, `26-05 guruhi`, `26-06 guruhi`, `26-07 guruhi`
     - Hisobot yuklab olish: `PDF hisobot yuklab olish`, `Excel (.xlsx) yuklab olish`
     - Umumiy reyting: `Barcha natijalar (Umumiy reyting)`
2. **Guruhlar Bo'yicha To'liq Alifbo Tartibi (A dan Z gacha):**
   - Istalgan guruh tugmasi bosilganda (masalan, `26-01 guruhi`), bot Google Sheets bazasidan ushbu guruh talabalarini oladi va ularning **F.I.SH bo'yicha alifbo tartibida (A dan Z gacha)** to'liq ro'yxati, to'plagan bali, foizi va bahosini ko'rsatadi.
3. **Bitta Bosishda PDF va Excel Yuklab Olish:**
   - `PDF hisobot yuklab olish` tugmasi bosilganda Google Sheets jadvalining tayyor A4 formatdagi gorizontal PDF hisobotini yuklab olish havolasini beradi.
   - `Excel (.xlsx) yuklab olish` bosilganda kompyuterga to'liq elektron jadval yuklanadi.
4. **Kompyuter Raqami Hisobi (Yangi):**
   - Sayt formasida talaba familiyasi, ismi, guruhi va **kompyuter raqami** alohida maydonlarda majburiy to'ldiriladi.
   - Kompyuter raqami Google Sheets jadvalining **11-ustuniga** ("Kompyuter raqami") yoziladi va Telegram xabarida ham ko'rsatiladi.
   - `ensurePcColumn` funksiyasi ilgari yaratilgan 10 ustunli jadvalga ushbu ustunni avtomatik qo'shadi, eski natijalar joyidan siljimaydi.
5. **Xatoliklar va Qayta Yuborishdan 100% Himoya:**
   - `HtmlService` orqali to'g'ridan-to'g'ri 200 OK beriladi.
   - `undefined` yoki bo'sh xabarlar botga umuman tushmaydi.
   - Faqat haqiqiy talaba test topshirgandagina o'qituvchiga natija boradi.

---

## 2. Tasdiqlangan Aniq Ma'lumotlaringiz

- **Google Sheets jadvali:** [https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit)
- **Telegram Bot nomi:** `Mavzu testlari` (@test_results111111111111_bot)
- **Telegram Bot Token:** `8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM`
- **Tasdiqlangan Shaxsiy Telegram Chat ID:** `8135594558`

---

## 3. Google Sheets Apps Script Kodini Yangilash (Qadamma-qadam)

1. [Google Sheets jadvalingizni](https://docs.google.com/spreadsheets/d/1_2j9f1Gf4xrTK8W6QUT0c66KL_7bl2fP0aNOoCeIIQU/edit) brauzeringizda oching.
2. Yuqori menyudan: **Extensions (Kengaytmalar) -> Apps Script** bo'limiga kiring.
3. U yerdagi barcha eski kodni to'liq o'chirib, quyidagi **yangi to'liq kodni** nusxalab joylashtiring:

```javascript
// ======================================================================
// TAT DARSLAR — GOOGLE SHEETS VA TELEGRAM BOT BOSHQARUV TIZIMI
// Shahrisabz Tibbiyot Texnikumi
// ======================================================================

const TELEGRAM_BOT_TOKEN = "8964237407:AAGE0yIVRZMfJVorRm_zLN8lZvQEglp9fvM";
const TEACHER_CHAT_ID = "8135594558";

// Jadvaldagi ustunlar soni (11-ustun — Kompyuter raqami)
const TOTAL_COLUMNS = 11;

// Apps Script veb-ilovasining joriy manzili (Deploy -> Web app URL)
// Bu manzil Telegram botga "xabarlarni shu yerga yubor" deb ko'rsatish uchun kerak.
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwlnNlpNGLWH3hs_pUXXias8x-uSYMj3kC5Ildf4bFuyySJO9ihVaGFMUU2A_FUqeys/exec";

// Doimiy pastki boshqaruv tugmalari (ReplyKeyboardMarkup)
const BOT_KEYBOARD = {
  keyboard: [
    [{ text: "26-01 guruhi" }, { text: "26-02 guruhi" }, { text: "26-03 guruhi" }],
    [{ text: "26-04 guruhi" }, { text: "26-05 guruhi" }, { text: "26-06 guruhi" }, { text: "26-07 guruhi" }],
    [{ text: "PDF hisobot yuklab olish" }, { text: "Excel (.xlsx) yuklab olish" }],
    [{ text: "Barcha natijalar (Umumiy reyting)" }]
  ],
  resize_keyboard: true,
  is_persistent: true
};

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return HtmlService.createHtmlOutput("OK");
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return HtmlService.createHtmlOutput("OK");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // ==================================================================
    // 1-HOLAT: TELEGRAM BOTDAN BUYRUQ / TUGMA BOSILISHI
    // ==================================================================
    if (data.message && data.message.chat) {
      const chatId = data.message.chat.id.toString();
      const userText = (data.message.text || "").trim();

      handleTelegramUserCommand(ss, chatId, userText);
      return HtmlService.createHtmlOutput("OK");
    }

    // ==================================================================
    // 2-HOLAT: SAYTDAN TEST NATIJASI TOPSHIRILISHI
    // Qat'iy tekshiruv: faqat talaba ismi mavjud bo'lsagina ishlaydi!
    // ==================================================================
    if (data.studentName && data.studentName.toString().trim() !== "" && data.studentName !== "Noma'lum") {
      let sheetSuccess = false;
      let sheetName = "5-Dars";

      try {
        sheetName = getSafeSheetName(data.lesson);
        const sheet = getOrCreateSheet(ss, sheetName);
        ensurePcColumn(sheet);

        const rowNumber = sheet.getLastRow();
        sheet.appendRow([
          rowNumber,
          data.date || new Date().toLocaleString("uz-UZ"),
          data.studentName.toString().trim(),
          data.group || "-",
          data.lesson || "5-Dars",
          data.correctCount !== undefined ? data.correctCount : 0,
          data.totalQuestions !== undefined ? data.totalQuestions : 20,
          (data.percent !== undefined ? data.percent : 0) + "%",
          (data.grade || 2) + " (" + (data.gradeLabel || "") + ")",
          data.timeSpent || "-",
          data.pcNumber ? data.pcNumber.toString().trim() : "-"
        ]);

        const lastRow = sheet.getLastRow();
        const rowRange = sheet.getRange(lastRow, 1, 1, TOTAL_COLUMNS);
        rowRange.setVerticalAlignment("middle");
        sheet.getRange(lastRow, 1).setHorizontalAlignment("center");
        sheet.getRange(lastRow, 6, 1, 6).setHorizontalAlignment("center");

        sheetSuccess = true;
      } catch (sheetErr) {
        console.error("Sheets xatosi:", sheetErr);
      }

      // Faqat haqiqiy talaba topshirgandagina o'qituvchiga bildirishnoma yuboriladi
      try {
        const alertText = 
          "<b>YANGI TEST TOPSHIRILDI</b>\n" +
          "-----------------------------------\n" +
          "Talaba: <b>" + escapeHtml(data.studentName) + "</b>\n" +
          "Guruhi: <b>" + escapeHtml(data.group) + "</b>\n" +
          "Kompyuter raqami: <b>" + escapeHtml(data.pcNumber || "-") + "</b>\n" +
          "Mavzu: <b>" + escapeHtml(sheetName) + "</b>\n" +
          "Natija: <b>" + data.correctCount + " / " + data.totalQuestions + " (" + data.percent + "%)</b>\n" +
          "Bahosi: <b>" + data.grade + " (" + escapeHtml(data.gradeLabel) + ")</b>\n" +
          "Sarflangan vaqt: " + escapeHtml(data.timeSpent) + "\n" +
          "Vaqti: " + escapeHtml(data.date) + "\n" +
          "-----------------------------------\n" +
          "Guruh natijalarini ko'rish uchun quyidagi guruh tugmasini bosing.";

        sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, TEACHER_CHAT_ID, alertText, BOT_KEYBOARD);
      } catch (tgErr) {
        console.error("Telegram xabari xatosi:", tgErr);
      }

      return HtmlService.createHtmlOutput("OK");
    }

    return HtmlService.createHtmlOutput("OK");

  } catch (globalErr) {
    return HtmlService.createHtmlOutput("OK");
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput("TAT Darslar Test Integratsiya API faol ishlamoqda");
}

// ----------------------------------------------------------------------
// TELEGRAM FOYDALANUVCHISI BUYRUQLARINI QAYTA ISHLASH
// ----------------------------------------------------------------------
function handleTelegramUserCommand(ss, chatId, text) {
  // 1. Guruh natijalarini olish (26-01 dan 26-07 gacha)
  if (text.indexOf("26-0") !== -1 || text.indexOf("guruhi") !== -1) {
    const groupMatch = text.match(/26-0[1-7]/);
    const targetGroup = groupMatch ? groupMatch[0] : text.replace("guruhi", "").trim();
    sendGroupResultsAlphabetical(ss, chatId, targetGroup);
    return;
  }

  // 2. PDF hisobot yuklab olish
  if (text.indexOf("PDF") !== -1) {
    sendPdfExportLink(ss, chatId);
    return;
  }

  // 3. Excel (.xlsx) hisobot yuklab olish
  if (text.indexOf("Excel") !== -1 || text.indexOf(".xlsx") !== -1) {
    sendExcelExportLink(ss, chatId);
    return;
  }

  // 4. Barcha natijalar (Umumiy reyting)
  if (text.indexOf("Barcha natijalar") !== -1 || text.indexOf("reyting") !== -1) {
    sendAllResultsSummary(ss, chatId);
    return;
  }

  // 5. /start yoki boshqa matn
  const welcomeText = 
    "<b>TAT Darslar — O'qituvchi Boshqaruv Paneli</b>\n" +
    "-----------------------------------\n" +
    "Kerakli guruh natijalarini <b>alifbo tartibida</b> olish uchun quyidagi guruh tugmasini bosing.\n\n" +
    "Shuningdek, umumiy hisobotni <b>PDF</b> yoki <b>Excel</b> formatida bitta bosishda yuklab olishingiz mumkin.";

  sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, welcomeText, BOT_KEYBOARD);
}

// ----------------------------------------------------------------------
// GURUH TALABALARINI ALIFBO TARTIBIDA CHIQARISH (A dan Z gacha)
// ----------------------------------------------------------------------
function sendGroupResultsAlphabetical(ss, chatId, groupCode) {
  const sheet = ss.getSheetByName("5-Dars") || ss.getSheets()[0];
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, "Hozircha jadvalda hech qanday test natijalari mavjud emas.", BOT_KEYBOARD);
    return;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, TOTAL_COLUMNS).getValues();

  // Guruh bo'yicha filtrlash
  const groupStudents = values.filter(row => {
    const grp = (row[3] || "").toString().trim();
    return grp.indexOf(groupCode) !== -1;
  });

  if (groupStudents.length === 0) {
    const emptyMsg = 
      "<b>" + escapeHtml(groupCode) + " GURUHI NATIJALARI</b>\n" +
      "-----------------------------------\n" +
      "Ushbu guruhdan hozircha hech kim test topshirmagan.";
    sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, emptyMsg, BOT_KEYBOARD);
    return;
  }

  // F.I.SH BO'YICHA ALIFBO TARTIBIDA SARALASH (A dan Z gacha)
  groupStudents.sort((a, b) => {
    const nameA = (a[2] || "").toString().trim();
    const nameB = (b[2] || "").toString().trim();
    return nameA.localeCompare(nameB, "uz", { sensitivity: "base" });
  });

  // Guruh statistikasi
  let sumScore = 0;
  let gradeCounts = { "5": 0, "4": 0, "3": 0, "2": 0 };

  groupStudents.forEach(row => {
    const p = parseInt(row[7]);
    if (!isNaN(p)) sumScore += p;
    const g = (row[8] || "").toString().charAt(0);
    if (gradeCounts[g] !== undefined) gradeCounts[g]++;
  });

  const avgScore = Math.round(sumScore / groupStudents.length);

  let message = 
    "<b>" + escapeHtml(groupCode) + " GURUHI NATIJALARI (ALIFBO TARTIBIDA)</b>\n" +
    "-----------------------------------\n" +
    "Jami talabalar: <b>" + groupStudents.length + " nafar</b>\n" +
    "O'rtacha o'zlashtirish: <b>" + avgScore + "%</b>\n" +
    "Baholar statistikasi: 5: " + gradeCounts["5"] + " ta | 4: " + gradeCounts["4"] + " ta | 3: " + gradeCounts["3"] + " ta\n" +
    "-----------------------------------\n\n";

  groupStudents.forEach((row, idx) => {
    const tR = idx + 1;
    const name = row[2] || "Noma'lum";
    const result = row[5] + "/" + row[6] + " (" + row[7] + ")";
    const grade = row[8] || "-";
    const timeSpent = row[9] || "-";
    const pcNumber = row[10] || "-";
    const date = row[1] || "-";

    message += 
      "<b>" + tR + ". " + escapeHtml(name) + "</b>\n" +
      "   Natija: <b>" + result + "</b> | Baho: <b>" + escapeHtml(grade) + "</b>\n" +
      "   Kompyuter: <b>" + escapeHtml(pcNumber) + "</b> | Vaqt: " + escapeHtml(timeSpent) + "\n" +
      "   Sana: " + escapeHtml(date) + "\n\n";
  });

  message += "-----------------------------------\n";
  message += "<i>Shahrisabz Tibbiyot Texnikumi — TAT</i>";

  sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, message, BOT_KEYBOARD);
}

// ----------------------------------------------------------------------
// PDF EKSPORT HAVOLASI
// ----------------------------------------------------------------------
function sendPdfExportLink(ss, chatId) {
  const ssId = ss.getId();
  const pdfUrl = "https://docs.google.com/spreadsheets/d/" + ssId + "/export?format=pdf&portrait=false&size=a4&gridlines=true";

  const msg = 
    "<b>PDF FORMATIDA HISOBOT YUKLAB OLISH</b>\n" +
    "-----------------------------------\n" +
    "Google Sheets jadvalidagi barcha guruhlar natijalarini to'liq A4 formatdagi PDF hujjati ko'rinishida yuklab olishingiz mumkin:\n\n" +
    pdfUrl + "\n\n" +
    "-----------------------------------\n" +
    "Yuqoridagi havolani bosing va brauzer orqali PDF faylni saqlab oling.";

  sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, msg, BOT_KEYBOARD);
}

// ----------------------------------------------------------------------
// EXCEL (.XLSX) EKSPORT HAVOLASI
// ----------------------------------------------------------------------
function sendExcelExportLink(ss, chatId) {
  const ssId = ss.getId();
  const xlsxUrl = "https://docs.google.com/spreadsheets/d/" + ssId + "/export?format=xlsx";

  const msg = 
    "<b>EXCEL (.XLSX) FORMATIDA YUKLAB OLISH</b>\n" +
    "-----------------------------------\n" +
    "Barcha guruhlar va natijalarni Microsoft Excel elektron jadvali formatida yuklab olishingiz mumkin:\n\n" +
    xlsxUrl + "\n\n" +
    "-----------------------------------\n" +
    "Yuqoridagi havolani bosganingizda Excel fayli avtomatik yuklanadi.";

  sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, msg, BOT_KEYBOARD);
}

// ----------------------------------------------------------------------
// BARCHA NATIJALAR (UMUMIY REYTING)
// ----------------------------------------------------------------------
function sendAllResultsSummary(ss, chatId) {
  const sheet = ss.getSheetByName("5-Dars") || ss.getSheets()[0];
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, "Hozircha natijalar mavjud emas.", BOT_KEYBOARD);
    return;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, TOTAL_COLUMNS).getValues();
  const total = values.length;

  let sum = 0;
  values.forEach(r => {
    const p = parseInt(r[7]);
    if (!isNaN(p)) sum += p;
  });
  const avg = Math.round(sum / total);

  // Top-10 reyting (ball bo'yicha)
  const sorted = values.slice().sort((a, b) => {
    return (parseInt(b[5]) || 0) - (parseInt(a[5]) || 0);
  });

  const top10 = sorted.slice(0, 10);
  let rankText = "";
  top10.forEach((r, idx) => {
    rankText += 
      (idx + 1) + ". <b>" + escapeHtml(r[2]) + "</b> (" + escapeHtml(r[3]) + ")\n" +
      "   Natija: " + r[5] + "/" + r[6] + " (" + r[7] + ") — Baho: " + escapeHtml(r[8]) + "\n\n";
  });

  const msg = 
    "<b>BARCHA GURUHLAR BO'YICHA UMUMIY REYTING</b>\n" +
    "-----------------------------------\n" +
    "Jami topshirganlar: <b>" + total + " nafar</b>\n" +
    "O'rtacha o'zlashtirish: <b>" + avg + "%</b>\n" +
    "-----------------------------------\n" +
    "<b>ENG YUQORI TOP-10 NATIJA:</b>\n\n" +
    rankText +
    "-----------------------------------\n" +
    "Bitta guruh bo'yicha alifbo tartibidagi ro'yxatni ko'rish uchun pastdagi tegishli guruh tugmasini bosing.";

  sendTelegramWithKeyboard(TELEGRAM_BOT_TOKEN, chatId, msg, BOT_KEYBOARD);
}

// ----------------------------------------------------------------------
// VARAQLAR (SHEETS) BOSHQARISH
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
      "To'g'ri javob", "Jami savol", "Foiz", "Baho", "Sarflangan vaqt",
      "Kompyuter raqami"
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
    sheet.setColumnWidth(11, 130);
  }
  return sheet;
}

// ----------------------------------------------------------------------
// ESKI JADVALGA "KOMPYUTER RAQAMI" USTUNINI AVTOMATIK QO'SHISH
// (Ilgari yaratilgan 10 ustunli jadvallar uchun bir martalik moslashtirish)
// ----------------------------------------------------------------------
function ensurePcColumn(sheet) {
  try {
    if (sheet.getMaxColumns() < TOTAL_COLUMNS) {
      sheet.insertColumnsAfter(sheet.getMaxColumns(), TOTAL_COLUMNS - sheet.getMaxColumns());
    }

    const headerCell = sheet.getRange(1, TOTAL_COLUMNS);
    if (headerCell.getValue().toString().trim() === "") {
      headerCell.setValue("Kompyuter raqami");
      headerCell.setFontWeight("bold");
      headerCell.setBackground("#4f46e5");
      headerCell.setFontColor("#ffffff");
      headerCell.setHorizontalAlignment("center");
      headerCell.setVerticalAlignment("middle");
      sheet.setColumnWidth(TOTAL_COLUMNS, 130);
    }
  } catch (err) {
    console.error("ensurePcColumn xatosi:", err);
  }
}

// ----------------------------------------------------------------------
// TELEGRAM BOTGA XABAR VA TUGMALAR YUBORISH
// ----------------------------------------------------------------------
function sendTelegramWithKeyboard(token, chatId, text, keyboard) {
  try {
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        reply_markup: keyboard
      }),
      muteHttpExceptions: true
    });
  } catch (e) {
    console.error("sendTelegramWithKeyboard xatosi:", e);
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ======================================================================
// TELEGRAM WEBHOOK BOSHQARUVI
// ENG MUHIM: bot tugmalari ishlashi uchun shu funksiya BIR MARTA
// Apps Script tahrirchisida qo'lda ishga tushirilishi shart!
// (Yuqoridagi funksiyalar ro'yxatidan setupTelegramWebhook ni tanlab, Run bosing)
// ======================================================================
function setupTelegramWebhook() {
  const url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN +
              "/setWebhook?url=" + encodeURIComponent(WEB_APP_URL) +
              "&drop_pending_updates=true";

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const result = response.getContentText();

  console.log("setWebhook natijasi: " + result);

  // Natijani o'qituvchining Telegramiga ham yuborish
  sendTelegramWithKeyboard(
    TELEGRAM_BOT_TOKEN,
    TEACHER_CHAT_ID,
    "<b>BOT ULANDI</b>\n-----------------------------------\n" +
    "Webhook muvaffaqiyatli o'rnatildi. Endi pastdagi tugmalar ishlaydi.\n\n" +
    "Texnik javob: " + escapeHtml(result),
    BOT_KEYBOARD
  );

  return result;
}

// Webhook holatini tekshirish (Run bosib, Execution log dan ko'ring)
function checkTelegramWebhook() {
  const url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/getWebhookInfo";
  const result = UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText();
  console.log("getWebhookInfo: " + result);
  return result;
}

// Webhook ni o'chirish (kerak bo'lganda)
function deleteTelegramWebhook() {
  const url = "https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/deleteWebhook";
  const result = UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText();
  console.log("deleteWebhook: " + result);
  return result;
}
```

---

## 4. Jadval Ustunlari Tartibi

| Ustun | Nomi |
|---|---|
| 1 | T/r |
| 2 | Sana va vaqt |
| 3 | Talaba F.I.SH (Familiya Ism) |
| 4 | Guruhi |
| 5 | Mavzu |
| 6 | To'g'ri javob |
| 7 | Jami savol |
| 8 | Foiz |
| 9 | Baho |
| 10 | Sarflangan vaqt |
| 11 | **Kompyuter raqami** (yangi) |

Kompyuter raqami ataylab oxirgi ustunga qo'yildi — shu sababli jadvalda allaqachon mavjud eski natijalar o'z ustunlarida o'zgarishsiz qoladi.

---

## 5. Bot Tugmalarini Ishga Tushirish (Webhook) — MAJBURIY QADAM

Agar botga `/start` yozganingizda yoki tugmalarni bosganingizda **hech qanday javob kelmasa**, sabab bitta:
Telegram botga "kelgan xabarlarni qayerga yuborish" kerakligi ko'rsatilmagan (webhook o'rnatilmagan).
Bunda barcha bosilgan tugmalar Telegram serverida navbatda turib qoladi va Apps Script'ga umuman yetib bormaydi.

Buni hal qilish uchun:

1. Apps Script tahrirchisida yangi kodni saqlang (`Ctrl + S`).
2. Avval veb-ilovani joylashtiring (6-bo'limga qarang) va **Web app URL** manzilini nusxalang.
3. Kod boshidagi `WEB_APP_URL` qatoriga o'sha manzilni qo'ying (agar u allaqachon to'g'ri bo'lsa, tegmang).
4. Tahrirchining yuqori qismidagi funksiyalar ro'yxatidan **`setupTelegramWebhook`** ni tanlang.
5. **Run (Ishga tushirish)** tugmasini bosing.
6. Birinchi marta Google ruxsat so'raydi: **Review permissions -> hisobingizni tanlang -> Advanced -> Go to (loyiha nomi) -> Allow**.
7. Pastdagi **Execution log** da `{"ok":true,"result":true,...}` javobini ko'rasiz va Telegramingizga "BOT ULANDI" xabari keladi.

Shundan so'ng botga `/start` yozing — pastki tugmalar paneli chiqadi va guruh natijalari ishlaydi.

**Tekshirish uchun:** funksiyalar ro'yxatidan `checkTelegramWebhook` ni tanlab Run bosing.
Execution log dagi javobda `"url"` maydoni bo'sh bo'lmasligi kerak:

- `"url":""` — webhook o'rnatilmagan, bot javob bermaydi (yuqoridagi qadamlarni bajaring).
- `"url":"https://script.google.com/macros/s/.../exec"` — hammasi joyida.

**Diqqat:** Veb-ilovani qayta joylashtirganingizda (Deploy) manzil o'zgarsa, `WEB_APP_URL` ni yangilab,
`setupTelegramWebhook` ni qaytadan bir marta ishga tushirish kerak.

---

## 6. O'rnatishdan So'ng Saqlash va Qayta Joylashtirish (ENG MUHIM QADAM)

Kodni Apps Script tahrirchisiga qo'yganingizdan so'ng:

1. **Save (Saqlash)** tugmasini (yoki `Ctrl + S`) bosing.
2. Yuqori o'ng burchakdagi ko'k **Deploy (Joylashtirish)** tugmasini bosing:
   - **Manage deployments (Joylashtirishlarni boshqarish)** bandini tanlang.
   - Chap tomondagi faol veb-ilovani tanlang va yuqoridagi **Qalamcha (Edit / Tahrirlash)** belgisini bosing.
   - **Version (Versiya)** qatoridan **"New version" (Yangi versiya)** ni tanlang.
   - **Who has access (Kirish huquqi)** qatorida **"Anyone" (Hamma / Lyuboy)** tanlanganligini tekshiring!
   - Pastdagi **Deploy (Joylashtirish)** tugmasini bosing.

3. Joylashtirish oynasidagi **Web app URL** manzilini nusxalab, kod boshidagi `WEB_APP_URL` qatoriga qo'ying va `Ctrl + S` bilan saqlang.
4. So'ngra 5-bo'limdagi **`setupTelegramWebhook`** funksiyasini bir marta Run qiling — busiz bot tugmalari ishlamaydi.

Tayyor! Endi Google va Telegram o'rtasida hech qanday qayta takrorlanish (302 redirect) bo'lmaydi va xabarlar faqat aniq natijalar bilan keladi.

---

## 7. Tez-tez Uchraydigan Muammolar

| Belgi | Sababi | Yechimi |
|---|---|---|
| Botga `/start` yozilsa javob yo'q, tugmalar ishlamaydi | Webhook o'rnatilmagan (`"url":""`) | 5-bo'lim: `setupTelegramWebhook` ni Run qiling |
| Test natijasi Telegramga kelmaydi, lekin bot tugmalari ishlaydi | Saytdagi `BACKEND_API_URL` eski joylashtirish manzilini ko'rsatmoqda | `test-5.html` dagi manzilni yangi **Web app URL** ga almashtiring |
| Bot javob beradi, lekin guruh ro'yxati bo'sh | Ushbu guruhdan hali hech kim test topshirmagan | Bitta sinov testi topshirib ko'ring |
| Deploy'dan keyin bot yana jim bo'lib qoldi | Yangi joylashtirishda manzil o'zgargan | `WEB_APP_URL` ni yangilab, `setupTelegramWebhook` ni qayta Run qiling |
| `Who has access` — `Anyone` emas | Telegram Apps Script'ga POST yubora olmaydi | Deploy sozlamasida `Anyone` ni tanlang |
