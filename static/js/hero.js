/* global gsap */
"use strict";

/**
 * Entrada dos elementos do hero, em cascata (stagger).
 * Equivalente ao componente Hero do projeto React.
 */
window.initHero = function initHero() {
  // No React eram 5 refs; aqui o data-attribute mantém a mesma ordem do DOM:
  // badge, título, descrição, ações e o label do Github.
  const targets = document.querySelectorAll("[data-hero-item]");
  if (!targets.length) return;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 16, filter: "blur(14px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
      },
    );
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
  });
};
