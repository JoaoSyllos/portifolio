/* global gsap, ScrollTrigger, ScrollSmoother */
"use strict";

/**
 * Ponto de entrada: registra os plugins, cria a smooth scroller e inicializa
 * cada seção. Substitui o app/layout.jsx + app/page.jsx do projeto React.
 */
(function bootstrap() {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // A ScrollSmoother precisa existir antes dos ScrollTriggers que dependem
  // dela (o pin da seção Skills), então é criada primeiro.
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!reduceMotion) {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });
  }

  window.initNeedleField();
  window.initCursorGlow();
  window.initHero();
  window.initSkills();
})();
