import Section from "./Section";
import { projects, sections } from "@/data/content";
import { pad } from "@/lib/format";
import { stagger } from "@/lib/motion";
import styles from "./Projects.module.css";

export default function Projects() {
  const { id, label } = sections.projetos;
  return (
    <Section
      id={id}
      title={label}
      count={projects.length}
      className={styles.section}
    >
      <ul className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.title} data-reveal style={stagger(i)}>
            <a href={p.href} className={styles.item}>
              <span className={styles.num}>{pad(i + 1)}</span>
              <div className={styles.info}>
                <h3 className={styles.name}>{p.title}</h3>
                <span className={styles.stack}>{p.stack}</span>
              </div>
              <p className={styles.desc}>{p.description}</p>
              {/* SVG em vez do caractere ↗: o desenho da seta varia de fonte para fonte e sai do centro */}
              <span className={styles.arrow} aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
