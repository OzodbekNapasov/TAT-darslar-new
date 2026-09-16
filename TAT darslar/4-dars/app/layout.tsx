import type {Metadata, Viewport} from 'next';
import './globals.css';

const TITLE = 'Tibbiyotda Axborot Texnologiyalari — Interaktiv qo‘llanma';
const DESCRIPTION =
  'Shahrisabz Tibbiyot Texnikumi, hamshiralik ishi yo‘nalishi uchun "Tibbiyotda axborot texnologiyalari" fanidan interaktiv elektron qo‘llanma, amaliy simulyator va test tizimi.';

export const metadata: Metadata = {
  title: {default: TITLE, template: '%s — Tibbiyotda AT'},
  description: DESCRIPTION,
  applicationName: 'Tibbiyotda AT',
  openGraph: {title: TITLE, description: DESCRIPTION, type: 'website'},
  twitter: {card: 'summary_large_image', title: TITLE, description: DESCRIPTION},
};

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: '#f3f6fb'},
    {media: '(prefers-color-scheme: dark)', color: '#060b15'},
  ],
};

/**
 * Runs before first paint so the page never flashes the wrong theme.
 * It always resolves to a concrete light/dark value, which is why
 * globals.css only needs a [data-theme="dark"] block and no media query.
 */
const THEME_BOOT = `(function(){try{var m=localStorage.getItem('tat-theme');if(m!=='light'&&m!=='dark'&&m!=='system'){m='system'}var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.dataset.theme=d?'dark':'light';r.dataset.themeMode=m}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{__html: THEME_BOOT}} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
