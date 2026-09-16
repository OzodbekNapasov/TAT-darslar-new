/**
 * The same pages are shipped two ways:
 *   - online : a normal Next.js server / static host, routes look like "/4-dars"
 *   - offline: a static export opened straight from disk, where the browser
 *              needs a real relative file name ("./4-dars.html")
 *
 * NEXT_PUBLIC_OFFLINE is baked in at build time by `npm run build:offline`,
 * so one component tree produces correct links for both targets.
 */
export const IS_OFFLINE = process.env.NEXT_PUBLIC_OFFLINE === '1';

export function href(path: string): string {
  if (!IS_OFFLINE) return path;
  if (path === '/') return '../../index.html';
  return `.${path}.html`;
}

export const SITE = {
  college: 'Shahrisabz Tibbiyot Texnikumi',
  subject: 'Tibbiyotda axborot texnologiyalari',
  program: 'Hamshiralik ishi',
} as const;

const MONTHS_UZ = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
];

const WEEKDAYS_UZ = [
  'Yakshanba',
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba',
];

/**
 * Must only be called from the client (an effect), never during render:
 * these pages are prerendered, so a build-time date would freeze into the
 * HTML and then disagree with the browser on every later day.
 */
export function formatUzbekDate(now: Date = new Date()): string {
  return `${now.getFullYear()}-yil ${now.getDate()}-${
    MONTHS_UZ[now.getMonth()]
  }, ${WEEKDAYS_UZ[now.getDay()]}`;
}
