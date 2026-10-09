import type { Metadata } from 'next';
import Cursor from '@/components/Cursor';
import ScrollEffects from '@/components/ScrollEffects';
import { site } from '@/data/content';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfólio — ' + site.tagline,
  description: site.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Cursor />
        <ScrollEffects />
        {children}
      </body>
    </html>
  );
}
