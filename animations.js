// /* global gsap, ScrollTrigger, ScrollSmoother */
// "use strict";

// /**
//  * Portifolio — animações de conteúdo (hero + skills).
//  *
//  * Depende do GSAP + ScrollTrigger + ScrollSmoother, carregados via CDN no
//  * index.html antes deste arquivo. O fundo do site (shader de agulhas +
//  * brilho do cursor) fica à parte, em background.js — não usa scroll.
//  */
// (function () {
//   const DESKTOP_MOTION =
//     "(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)";

//   /* ======================================================================
//      Entrada dos elementos do hero, em cascata
//      ====================================================================== */

//   function initHero() {
//     // Ordem do DOM: badge, título, descrição, ações e o label do Github.
//     // Com prefers-reduced-motion: reduce, o CSS (style.css) já deixa esses
//     // elementos com opacity:1 direto, então não precisa de branch aqui pra
//     // isso — só roda a entrada em cascata mesmo.
//     const targets = document.querySelectorAll("[data-hero-item]");
//     if (!targets.length) return;

//     gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
//       gsap.fromTo(
//         targets,
//         { autoAlpha: 0, y: 16, filter: "blur(14px)" },
//         {
//           autoAlpha: 1,
//           y: 0,
//           filter: "blur(0px)",
//           duration: 0.9,
//           ease: "power2.out",
//           stagger: 0.1,
//         },
//       );
//     });
//   }

//   /* ======================================================================
//      Skills: o .c1 fica pinado e "flutua" só enquanto o site desce;
//      ao sair da seção, força o scroll até o .c2
//      ====================================================================== */

//   function initSkills() {
//     const contents = document.getElementById("skills-contents");
//     const c1 = document.getElementById("skills-c1");
//     const c2 = document.getElementById("skills-c2");
//     if (!contents || !c1 || !c2) return;

//     gsap.matchMedia().add(DESKTOP_MOTION, () => {
//       // Trava o progresso no maior valor já alcançado descendo, então
//       // scrollar pra cima nunca reverte o float — só volta a avançar quando
//       // o scroll (pra baixo) ultrapassar esse pico de novo, sem pulo visual
//       // no meio do caminho.
//       //
//       // Não dá pra fazer isso com `scrub`: o tween de lag que o scrub cria
//       // internamente continua renderizando sozinho a cada frame do ticker,
//       // independente de quando o onUpdate do ScrollTrigger dispara — então
//       // sobrescrever o valor dentro do onUpdate perde a corrida e o float
//       // acaba revertendo de qualquer jeito. Por isso aqui é um ScrollTrigger
//       // manual (sem `animation` anexada/sem scrub) que só reposiciona o alvo
//       // (via quickTo, que lida bem com ser chamado várias vezes por segundo)
//       // quando o progresso avança.
//       let maxProgress = 0;
//       const floatTo = gsap.quickTo(c1, "y", {
//         duration: 0.5,
//         ease: "power2.out",
//       });

//       ScrollTrigger.create({
//         trigger: contents,
//         start: "top top",
//         end: "+=2500",
//         pin: true,
//         pinSpacing: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           if (self.progress > maxProgress) {
//             maxProgress = self.progress;
//             floatTo(maxProgress * -180);
//           }
//         },
//         onLeave: (self) => {
//           if (self.direction === 1) {
//             gsap.delayedCall(0.05, () => {
//               const smoother = ScrollSmoother.get();
//               if (smoother) {
//                 // Pausa a smoother antes de scrollar: enquanto ela está
//                 // rodando, o próprio loop de smoothing (ou inércia do
//                 // wheel/touch) sobrescreve o alvo do scrollTo a cada frame,
//                 // então o scroll para o .c2 nunca chega a acontecer
//                 // visivelmente.
//                 smoother.paused(true);
//                 smoother.scrollTo(c2, true, "center center");
//                 gsap.delayedCall(1, () => smoother.paused(false));
//               } else {
//                 c2.scrollIntoView({ behavior: "smooth", block: "center" });
//               }
//             });
//           }
//         },
//       });
//     });
//   }

//   /* ======================================================================
//      Bootstrap
//      ====================================================================== */

//   gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

//   // A ScrollSmoother precisa existir antes dos ScrollTriggers que dependem
//   // dela (o pin da seção Skills), então é criada primeiro.
//   const reduceMotion = window.matchMedia(
//     "(prefers-reduced-motion: reduce)",
//   ).matches;

//   if (!reduceMotion) {
//     ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1,
//       effects: true,
//       smoothTouch: 0.1,
//     });
//   }

//   initHero();
//   initSkills();
// })();

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, scrollToPlugin);

const targets = document.querySelectorAll("[data-hero-item]");
gsap.from(targets, {
  autoAlpha: 0,
  y: 16,
  filter: "blur(14px)",
});
