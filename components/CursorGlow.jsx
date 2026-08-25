"use client";

import { useEffect, useRef } from "react";
import styles from "./CursorGlow.module.css";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const isTouchOrSmall = window.matchMedia(
      "(pointer: coarse), (max-width: 768px)",
    ).matches;
    if (isTouchOrSmall) return;

    function handleMove(event) {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      if (!initialized.current) {
        current.current.x = event.clientX;
        current.current.y = event.clientY;
        initialized.current = true;
      }
    }

    window.addEventListener("pointermove", handleMove);

    const ease = 0.06;
    let frameId;

    function animate() {
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      glow.style.left = `${current.current.x}px`;
      glow.style.top = `${current.current.y}px`;

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={glowRef} className={styles.glow} />;
}
