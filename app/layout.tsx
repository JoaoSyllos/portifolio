import type { Metadata } from 'next';
import ScrollEffects from '@/components/ScrollEffects';
import { site } from '@/data/content';
import { fontSet, palette } from '@/data/theme';
import { fontSets } from './fonts';
import './palettes.css';
import './globals.css';

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description:
    'Sites sob medida para negócios e profissionais: você aprova o visual antes da programação e recebe o site no ar, no seu domínio.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-palette={palette}
      style={
        {
          '--font-display': fontSets[fontSet].display,
          '--font-body': fontSets[fontSet].body,
          '--display-scale': fontSets[fontSet].displayScale ?? 1,
          '--display-weight': fontSets[fontSet].weight ?? 900,
          '--display-case': fontSets[fontSet].uppercase === false ? 'none' : 'uppercase',
        } as React.CSSProperties
      }
    >
      <body>
        <ScrollEffects />
        {children}
      </body>
    </html>
  );
}
