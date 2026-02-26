import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BeyondChess\u2122 \u00d7 CHIMERA',
  description: 'See your creature breathe.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <header
          className="px-4 py-3 lg:px-8"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <h1 className="text-lg font-bold tracking-tight">
                <span style={{ color: '#c8956c' }}>BeyondChess&trade;</span>
                <span className="mx-1.5" style={{ color: '#555' }}>
                  &times;
                </span>
                <span>CHIMERA</span>
              </h1>
              <span className="text-xs hidden sm:inline" style={{ color: '#555' }}>
                See your creature breathe.
              </span>
            </div>
            <div className="w-full sm:w-auto">
              <Nav />
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
