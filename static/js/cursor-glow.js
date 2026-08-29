/* global gsap */
"use strict";

/**
 * Brilho azulado que segue o cursor com atraso suave.
 * Equivalente ao componente CursorGlow do projeto React.
 */
window.initCursorGlow = function initCursorGlow() {
  const glow = document.getElementById("cursor-glow");
  if (!glow) return;

  const mm = gsap.matchMedia();

  mm.add(
    "(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)",
    () => {
      gsap.set(glow, {
        xPercent: -50,
        yPercent: -50,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const xTo = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3" });
      const yTo = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3" });

      let initialized = false;

      function handleMove(event) {
        if (!initialized) {
          gsap.set(glow, { x: event.clientX, y: event.clientY });
          initialized = true;
          return;
        }

        xTo(event.clientX);
        yTo(event.clientY);
      }

      window.addEventListener("pointermove", handleMove);

      return () => window.removeEventListener("pointermove", handleMove);
    },
  );
};
