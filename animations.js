gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// self.direction do ScrollTrigger reflete a direção do valor JÁ SUAVIZADO
// pela smoother (que fica atrasado até 1s atrás do input real, por causa do
// `smooth: 1` abaixo) — não a direção que o usuário está de fato aplicando
// agora. Se ele desce rápido, solta e inverte pra subir bem perto do "end",
// o valor suavizado ainda está subindo (alcançando o alvo antigo) quando o
// onLeave dispara, e self.direction lê 1 mesmo o usuário já estando
// scrollando pra cima. Por isso rastreamos a direção real do wheel/touch à
// parte, e exigimos as duas concordarem antes de forçar o scroll pro .c2.
let scrollingDown = false;

window.addEventListener(
  "wheel",
  (e) => {
    scrollingDown = e.deltaY > 0;
  },
  { passive: true },
);

let lastTouchY = null;
window.addEventListener(
  "touchstart",
  (e) => {
    lastTouchY = e.touches[0].clientY;
  },
  { passive: true },
);
window.addEventListener(
  "touchmove",
  (e) => {
    const y = e.touches[0].clientY;
    if (lastTouchY !== null) scrollingDown = y < lastTouchY;
    lastTouchY = y;
  },
  { passive: true },
);

const smoother = ScrollSmoother.create({
  smooth: 1, // how long (in sesconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: false, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

gsap.from("[data-hero-item]", {
  opacity: 0,
  y: 16,
  filter: "blur(14px)",
  duration: 1,
});

gsap.to(".c1", {
  scrollTrigger: {
    trigger: ".c1",
    start: "-30% top",
    end: "+=2600",
    scrub: true,
    // markers: true,
    pin: true,
    pinSpacing: true,
    anticipatePin: 1,
    onLeave: (self) => {
      if (self.direction === 1 && scrollingDown) {
        // Pausa a smoother antes de scrollar: enquanto ela está rodando, o
        // próprio loop de smoothing (ou a inércia do wheel/touch) sobrescreve
        // o alvo do scrollTo a cada frame, e o scroll até .c2 nunca chega a
        // acontecer visivelmente.
        smoother.paused(true);
        smoother.scrollTo(".c2", true, "center center");
        // Só precisa segurar o tempo suficiente pra vencer a inércia residual
        // do scroll que acabou de acontecer — 1s deixava a página travada
        // por um tempo perceptível depois do pulo.
        gsap.delayedCall(0.1, () => smoother.paused(false));
      }
    },
  },
  y: -180,
});
