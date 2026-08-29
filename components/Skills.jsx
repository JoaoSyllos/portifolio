"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import styles from "./Skills.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

const GROUPS = [
  {
    title: "Desenvolvimento de sites",
    description:
      "Com ferramentas como o Figma, consigo transformar uma ideia em um web design com precisão milimétrica, cada detalhe pensado para entregar uma experiência visual impecável, pixel por pixel.",
  },
  {
    title: "Desenvolvimento web",
    description:
      "Sou um web designer e freelancer com foco em criar soluções e designs criativos e modernos, unindo estética e funcionalidade para transformar cada projeto em uma experiência única e memorável.",
  },
];

export default function Skills() {
  const contentsRef = useRef(null);
  const c1Ref = useRef(null);
  const c2Ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(hover: hover) and (pointer: fine) and (min-width: 769px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Trava o progresso no maior valor já alcançado descendo, então
        // scrollar pra cima nunca reverte o float — só volta a avançar
        // quando o scroll (pra baixo) ultrapassar esse pico de novo, sem
        // pulo visual no meio do caminho.
        //
        // Não dá pra fazer isso com `scrub` (como antes): o tween de lag
        // que o scrub cria internamente continua renderizando sozinho a
        // cada frame do ticker, independente de quando o onUpdate do
        // ScrollTrigger dispara — então sobrescrever o valor dentro do
        // onUpdate perde a corrida e o float acaba revertendo de qualquer
        // jeito. Por isso aqui é um ScrollTrigger manual (sem `animation`
        // anexada/sem scrub) que só reposiciona o alvo (via quickTo, que
        // lida bem com ser chamado várias vezes por segundo) quando o
        // progresso avança.
        let maxProgress = 0;
        const floatTo = gsap.quickTo(c1Ref.current, "y", {
          duration: 0.5,
          ease: "power2.out",
        });

        ScrollTrigger.create({
          trigger: contentsRef.current,
          start: "top top",
          end: "+=2500",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: true,
          onUpdate: (self) => {
            if (self.progress > maxProgress) {
              maxProgress = self.progress;
              floatTo(maxProgress * -180);
            }
          },
          onLeave: (self) => {
            if (self.direction === 1) {
              gsap.delayedCall(0.05, () => {
                const smoother = ScrollSmoother.get();
                if (smoother) {
                  // Pausa a smoother antes de scrollar: enquanto ela está
                  // rodando, o próprio loop de smoothing (ou inércia do
                  // wheel/touch) sobrescreve o alvo do scrollTo a cada
                  // frame, então o scroll para o .c2 nunca chega a
                  // acontecer visivelmente.
                  smoother.paused(true);
                  smoother.scrollTo(c2Ref.current, true, "center center");
                  gsap.delayedCall(1, () => smoother.paused(false));
                } else {
                  c2Ref.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              });
            }
          },
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.skills}>
      <div className={styles.contents} ref={contentsRef}>
        <div className={styles.c1} ref={c1Ref}>
          <h2 className={styles.groupTitle}>{GROUPS[0].title}</h2>
          <p className={styles.groupDescription}>{GROUPS[0].description}</p>
        </div>
        <div className={styles.c2} ref={c2Ref}>
          <h2 className={styles.groupTitle}>{GROUPS[1].title}</h2>
          <p className={styles.groupDescription}>{GROUPS[1].description}</p>
        </div>
      </div>
    </section>
  );
}
