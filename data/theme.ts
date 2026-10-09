/** Paletas disponíveis. As cores de cada uma ficam em app/palettes.css. */
export const palettes = [
  "oceano",
  "grafite",
  "floresta",
  "ameixa",
  "brasa",
  "papel",
  "claro",
] as const;

export type Palette = (typeof palettes)[number];

/** Troque aqui para mudar as cores do site inteiro. */
export const palette: Palette = "claro";

/** Conjuntos de fontes disponíveis. As fontes de cada um ficam em app/fonts.ts. */
export const fontSetNames = [
  "mono",
  "grotesk",
  "editorial",
  "brutal",
  "largo",
  "moderno",
  "sistema",
] as const;

export type FontSet = (typeof fontSetNames)[number];

/** Troque aqui para mudar as fontes do site inteiro. */
export const fontSet: FontSet = "moderno";
