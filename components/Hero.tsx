import Crosshair from "./Crosshair";
import Spotlight from "./Spotlight";
import { sections } from "@/data/content";
import { stagger } from "@/lib/motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Spotlight />

      <div className={styles.decor} aria-hidden>
        <Crosshair style={{ left: "var(--gutter)", bottom: 20 }} />
        <Crosshair style={{ right: "var(--gutter)", bottom: 20, animationDelay: "-2s" }} />
        <Crosshair className={styles.crossTop} style={{ right: "var(--gutter)", top: 45, animationDelay: "-4s" }} />
        <span className={styles.ring} />
        <span className={styles.build}>BUILD 2026.10</span>
        <span className={styles.vertical}>ESCRITO À MÃO — LINHA POR LINHA</span>
      </div>

      <div className={styles.main}>
        <span className={styles.eyebrow}>Desenvolvo</span>
        <h1 className={styles.title}>
          <span className={styles.line} style={stagger(0)}>
            <span>CÓDIGO</span>
          </span>{" "}
          <span className={`${styles.line} ${styles.accent}`} style={stagger(1)}>
            <span>PENSADO,</span>
          </span>{" "}
          <span className={styles.line} style={stagger(2)}>
            <span>
              NÃO GERADO<span className={styles.caret}>_</span>
            </span>
          </span>
        </h1>
      </div>

      <div className={styles.aside}>
        <p className={styles.lead}>
          Eu escrevo cada linha, desenho a arquitetura e reviso os detalhes
          antes de publicar.
        </p>
        <a href={`#${sections.projetos.id}`} className={styles.cta}>
          Ver projetos
          <span className={styles.ctaArrow} aria-hidden>
            <span>↓</span>
          </span>
        </a>
      </div>
    </section>
  );
}
