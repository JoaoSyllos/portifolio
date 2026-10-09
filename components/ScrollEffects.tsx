'use client';

import { useEffect } from 'react';

/** Marca na nav o link da seção que está no meio da tela. */
export default function ScrollEffects() {
  useEffect(() => {
    const links = new Map<string, Element>();
    document.querySelectorAll('nav a[href^="#"]').forEach((a) => {
      const id = a.getAttribute('href')!.slice(1);
      if (id) links.set(id, a);
    });
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const link = links.get(entry.target.id);
          if (entry.isIntersecting) link?.setAttribute('aria-current', 'location');
          else link?.removeAttribute('aria-current');
        }
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );
    links.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
    return () => spy.disconnect();
  }, []);

  return null;
}
