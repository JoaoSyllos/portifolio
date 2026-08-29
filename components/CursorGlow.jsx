"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./CursorGlow.module.css";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
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
      }
    );

    return () => mm.revert();
  }, []);

  return <div ref={glowRef} className={styles.glow} />;
}
