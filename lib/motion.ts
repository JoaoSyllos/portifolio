import type { CSSProperties } from 'react';

/** Posição na sequência de entrada; o CSS multiplica --i pelo atraso base. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
