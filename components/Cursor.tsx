'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const INTERACTIVE = 'a, button, [data-cursor="grow"]';

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // fração da distância percorrida por frame; 1 = sem atraso
    const follow = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.25;
    let x = 0, y = 0, targetX = 0, targetY = 0, frame = 0;

    const render = () => {
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };
    const move = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (el.dataset.visible !== 'true') {
        x = targetX;
        y = targetY;
        el.dataset.visible = 'true';
      }
      if (!frame) frame = requestAnimationFrame(render);
    };
    const over = (e: PointerEvent) => {
      el.dataset.grow = String(!!(e.target as Element).closest?.(INTERACTIVE));
    };
    const press = (e: PointerEvent) => {
      el.dataset.press = String(e.type === 'pointerdown');
    };
    const leave = () => {
      el.dataset.visible = 'false';
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', press);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', press);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden>
      <span className={styles.dot} />
    </div>
  );
}
