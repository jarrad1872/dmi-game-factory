import type { Metadata } from 'next';
import { Fraunces, Halant, Open_Sans } from 'next/font/google';
import './v2-globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const halant = Halant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-halant',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DMI Game Factory - V2',
  description: 'Create arcade games for DMI Tools Corp - Professional Edition',
};

export default function V2RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${halant.variable} ${openSans.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
