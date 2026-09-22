import type {Metadata, Viewport} from 'next';
import './globals.css';

const TITLE = '6-Dars: Windows operatsion tizimi va unda ishlash asoslari — Tibbiyotda AT';
const DESCRIPTION =
  'Shahrisabz Tibbiyot Texnikumi uchun "Windows operatsion tizimi va unda ishlash asoslari" mavzusida interaktiv elektron darslik, Windows 11 trenajyori va lokal bilimni sinash testi.';

export const metadata: Metadata = {
  title: {default: TITLE, template: '%s — Tibbiyotda AT'},
  description: DESCRIPTION,
  applicationName: 'Tibbiyotda AT — 6-Dars',
  openGraph: {title: TITLE, description: DESCRIPTION, type: 'website'},
};

export const viewport: Viewport = {
  themeColor: '#07090e',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="uz" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
