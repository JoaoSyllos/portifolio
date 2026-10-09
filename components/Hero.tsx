import Image from "next/image";
import Spotlight from "./Spotlight";
import { sections, site } from "@/data/content";
import { stagger } from "@/lib/motion";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Spotlight />

      <div className={styles.main}>
        <span className={styles.eyebrow}>Design e desenvolvimento web</span>
        <h1 className={styles.title}>
          <span className={styles.line} style={stagger(0)}>
            <span>Sites feitos</span>
          </span>{" "}
          <span className={`${styles.line} ${styles.accent}`} style={stagger(1)}>
            <span>para vender.</span>
          </span>
        </h1>
      </div>

      <div className={styles.aside}>
        <div className={styles.me}>
          <Image
            src={site.photo}
            alt={`Foto de ${site.name}`}
            width={1169}
            height={1345}
            sizes="72px"
            priority
            className={styles.photo}
          />
          <p className={styles.name}>
            {site.name}
            <span className={styles.role}>Freelancer</span>
          </p>
        </div>
        <p className={styles.lead}>
          Crio sites sob medida para negócios e profissionais. Você aprova o
          visual antes de eu programar e recebe o site no ar, no seu domínio.
        </p>
        <a href={`#${sections.contato.id}`} className={styles.cta}>
          Pedir orçamento
          <span className={styles.ctaArrow} aria-hidden>
            <span>↓</span>
          </span>
        </a>
      </div>
    </section>
  );
}
