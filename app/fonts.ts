/* =====================================================================
   CONJUNTOS DE FONTES
   ---------------------------------------------------------------------
   Para trocar as fontes do site, mude `fontSet` em data/theme.ts.

   Cada conjunto tem duas fontes:
     display  títulos (h1, h2, h3: hero, títulos de seção, nomes de projeto)
     body     todo o resto (textos, rótulos, navegação, botões)
   e, opcionalmente:
     displayScale  multiplica o tamanho dos títulos gigantes (hero e contato).
                   Use abaixo de 1 em fontes largas ou num visual mais sóbrio.
     weight        peso dos títulos (padrão 900)
     uppercase     títulos em caixa alta (padrão true)

   Para criar um conjunto novo:
     1. importe a fonte de 'next/font/google' (nomes com _ no lugar de espaço)
     2. declare-a abaixo com o mesmo padrão das outras
     3. adicione o conjunto em `fontSets` e o nome na lista em data/theme.ts

   As fontes são baixadas do Google uma vez e servidas pelo próprio site.
   O navegador só baixa as fontes do conjunto em uso.
   ===================================================================== */

import {
  Archivo,
  Fira_Code,
  Fraunces,
  Geist_Mono,
  IBM_Plex_Mono,
  Inter,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Space_Mono,
  Unbounded,
} from 'next/font/google';
import type { FontSet } from '@/data/theme';

// O next/font exige as opções escritas por extenso em cada fonte.
// preload: false porque, com vários conjuntos declarados, pré-carregar todos
// faria o navegador baixar fontes que a página nem usa.

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', preload: false });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', preload: false });
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', preload: false });
const fraunces = Fraunces({ subsets: ['latin'], display: 'swap', preload: false });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '600', '700'], subsets: ['latin'], display: 'swap', preload: false });
const archivo = Archivo({ subsets: ['latin'], display: 'swap', preload: false });
const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap', preload: false });
const unbounded = Unbounded({ subsets: ['latin'], display: 'swap', preload: false });
const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap', preload: false });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', preload: false });
const inter = Inter({ subsets: ['latin'], display: 'swap', preload: false });

type FontPair = {
  display: string;
  body: string;
  displayScale?: number;
  weight?: number;
  uppercase?: boolean;
};
type LoadedFont = { style: { fontFamily: string } };
type Options = Pick<FontPair, 'displayScale' | 'weight' | 'uppercase'>;
const pair = (display: LoadedFont, body: LoadedFont, options: Options = {}): FontPair => ({
  display: display.style.fontFamily,
  body: body.style.fontFamily,
  ...options,
});

export const fontSets: Record<FontSet, FontPair> = {
  /** O visual original: monoespaçada em tudo */
  mono: pair(jetbrainsMono, jetbrainsMono),
  /** Títulos geométricos e texto mono com cara de máquina de escrever */
  grotesk: pair(spaceGrotesk, spaceMono),
  /** Serifa expressiva nos títulos e mono técnica no texto */
  editorial: pair(fraunces, ibmPlexMono),
  /** Títulos pesados e condensados, texto mono limpo */
  brutal: pair(archivo, geistMono),
  /** Títulos largos e arredondados, texto em fonte de código */
  largo: pair(unbounded, firaCode, { displayScale: 0.78 }),
  /** Sem serifa e sóbrio: títulos sem caixa alta, menores e menos pesados */
  moderno: pair(plusJakarta, inter, { displayScale: 0.7, weight: 700, uppercase: false }),
  /** Sem download: usa as fontes instaladas no aparelho do visitante */
  sistema: {
    display: "'SF Mono', 'JetBrains Mono', Consolas, monospace",
    body: "'SF Mono', 'JetBrains Mono', Consolas, monospace",
  },
};
