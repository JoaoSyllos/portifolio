import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.copy}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Aberto para novos projetos
          </span>
          <h1 className={styles.title}>
            Construo interfaces <br />
            com extremo cuidado,
            <br />
            <span className={styles.highlight}>feitas para durar.</span>
          </h1>
          <p className={styles.description}>
            Experiências criadas, projetadas para serem bonitas e construídas
            para durar. Cada decisão de design passa pela minha mão, do rascunho
            ao pixel final.
          </p>
          <div className={styles.actions}>
            <a href="#contato" className={styles.primary}>
              Vamos conversar
            </a>
            <a href="#projetos" className={styles.secondary}>
              Ver projetos
            </a>
          </div>
        </div>
      </div>
      <span className={styles.labelLink}>
        Me encontre no{" "}
        <Link
          href="https://github.com/JoaoSyllos"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          Github
        </Link>
      </span>
    </section>
  );
}
