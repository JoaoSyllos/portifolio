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
              <div>
                <h3 className={styles.name}>{p.title}</h3>
                <span className={styles.stack}>{p.stack}</span>
              </div>
              <p className={styles.desc}>{p.description}</p>
              <span className={styles.arrow} aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
