import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <header className="px-4 py-5 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1
              className="text-sm font-medium tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
            >
              <span style={{ color: '#c8956c' }}>BeyondChess</span>
              <span className="mx-1" style={{ color: '#333' }}>/</span>
              <span style={{ color: '#666' }}>CHIMERA</span>
            </h1>
            <Nav />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
