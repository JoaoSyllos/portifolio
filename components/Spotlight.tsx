'use client';

import { useEffect, useRef } from 'react';
import styles from './Spotlight.module.css';

/** Acende o grid do elemento pai em volta do ponteiro. */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const area = el?.parentElement;
    if (!el || !area) return;
    const move = (e: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--y', `${e.clientY - rect.top}px`);
      el.dataset.active = 'true';
    };
    const leave = () => {
      el.dataset.active = 'false';
    };
    area.addEventListener('pointermove', move);
    area.addEventListener('pointerleave', leave);
    return () => {
      area.removeEventListener('pointermove', move);
      area.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div ref={ref} className={styles.spotlight} aria-hidden />;
}
