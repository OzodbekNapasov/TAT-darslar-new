const crypto = require('crypto');

// In-memory brute-force protection per IP
const attemptsMap = new Map();

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function safeCompare(a, b) {
  const bufA = Buffer.from(String(a || ''), 'utf8');
  const bufB = Buffer.from(String(b || ''), 'utf8');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function createSignedToken(secret) {
  const payload = JSON.stringify({
    role: 'teacher',
    iat: Date.now(),
    exp: Date.now() + 12 * 60 * 60 * 1000, // 12 hours
  });
  const base64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(base64Payload)
    .digest('base64url');
  return `${base64Payload}.${signature}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'TAT Teacher Auth API',
      envConfigured: {
        TEACHER_PIN: Boolean(process.env.TEACHER_PIN),
        TEACHER_SECRET_KEY: Boolean(process.env.TEACHER_SECRET_KEY),
        TEACHER_MAX_ATTEMPTS: Boolean(process.env.TEACHER_MAX_ATTEMPTS),
        TEACHER_BLOCK_MINUTES: Boolean(process.env.TEACHER_BLOCK_MINUTES),
        LESSON3_ADMIN_URL: Boolean(process.env.LESSON3_ADMIN_URL),
        TELEGRAM_BOT_TOKEN: Boolean(process.env.TELEGRAM_BOT_TOKEN),
        TELEGRAM_CHAT_ID: Boolean(process.env.TELEGRAM_CHAT_ID),
        GOOGLE_SCRIPT_URL: Boolean(process.env.GOOGLE_SCRIPT_URL),
      },
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const ip = getClientIp(req);
  const maxAttempts = parseInt(process.env.TEACHER_MAX_ATTEMPTS || '5', 10);
  const blockMinutes = parseInt(process.env.TEACHER_BLOCK_MINUTES || '15', 10);
  const blockMs = blockMinutes * 60 * 1000;

  const now = Date.now();
  const record = attemptsMap.get(ip) || { count: 0, blockedUntil: 0 };

  if (record.blockedUntil > now) {
    const remainingMin = Math.ceil((record.blockedUntil - now) / 60000);
    return res.status(429).json({
      ok: false,
      locked: true,
      error: `Ko‘p marta xato kod kiritildi. ${remainingMin} daqiqadan so‘ng urinib ko‘ring.`,
    });
  }

  const submittedPin = String(req.body?.pin || '').trim();
  const expectedPin = process.env.TEACHER_PIN || '12072005';
  const secretKey = process.env.TEACHER_SECRET_KEY || 'tat_shahrisabz_secret_2026_x9k2m8p4q7w1z5';

  if (!safeCompare(submittedPin, expectedPin)) {
    record.count += 1;
    if (record.count >= maxAttempts) {
      record.blockedUntil = now + blockMs;
      record.count = 0;
    }
    attemptsMap.set(ip, record);

    const left = Math.max(0, maxAttempts - record.count);
    return res.status(401).json({
      ok: false,
      error: record.blockedUntil > now
        ? `Xavfsizlik blokirovkasi: ${blockMinutes} daqiqa kuting.`
        : `PIN-kod noto‘g‘ri! Qolgan urinishlar: ${left} ta.`,
    });
  }

  // Reset failed attempts on success
  attemptsMap.delete(ip);

  const token = createSignedToken(secretKey);
  const adminUrl = process.env.LESSON3_ADMIN_URL || 'https://ozodbeknapasov.github.io/3-dars-uchun/admin';

  return res.status(200).json({
    ok: true,
    role: 'teacher',
    token,
    adminUrl,
    links: [
      {
        dars: '3-dars',
        nom: 'Talaba platformasi',
        havola: 'https://ozodbeknapasov.github.io/3-dars-uchun/',
        izoh: 'Talabalarga beriladigan havola: nazariya, amaliyot va test tizimi.',
      },
      {
        dars: '3-dars',
        nom: 'O‘qituvchi boshqaruv paneli (Maxfiy Admin)',
        havola: adminUrl,
        izoh: 'Guruhlar statistikasi va talaba natijalarini nazorat qilish.',
      },
      {
        dars: '5-dars',
        nom: 'Kompyuter va uning qurilmalari — Nazorat testi',
        havola: './5. Kompyuter va uning qurilmalari/test-5.html',
        izoh: '5-dars bo‘yicha 20 talik nazorat testi.',
      },
      {
        dars: '6-dars',
        nom: 'Windows OT — Interaktiv Darslik (Talaba & O‘qituvchi)',
        havola: './6. Windows operatsion tizimi/dars.html',
        izoh: 'Windows operatsion tizimi, dasturlar tasnifi, Start menyu va Windows 11 trenajyori.',
      },
      {
        dars: '6-dars',
        nom: 'Windows OT — Bilimni sinash testi (20 ta savol)',
        havola: './6. Windows operatsion tizimi/test.html',
        izoh: 'Talabalar va o‘qituvchi uchun lokal 20 talik test (50/70/85/100 baholash mezoni bilan).',
      },
    ],
  });
};
