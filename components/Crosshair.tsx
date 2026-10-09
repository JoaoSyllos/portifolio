import type { CSSProperties } from 'react';
import styles from './Crosshair.module.css';

type Props = { style: CSSProperties; className?: string };

export default function Crosshair({ style, className }: Props) {
  return (
    <span
      className={[styles.cross, className].filter(Boolean).join(' ')}
      style={style}
      aria-hidden
    />
  );
}
