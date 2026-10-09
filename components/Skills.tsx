import Section from "./Section";
import { sections, skills } from "@/data/content";
import { pad } from "@/lib/format";
import { stagger } from "@/lib/motion";
import styles from "./Skills.module.css";

export default function Skills() {
  const { id, label } = sections.skills;
  return (
    <Section
      id={id}
      title={label}
      count={skills.length}
      className={styles.section}
    >
      <ul className={styles.list}>
        {skills.map((skill, i) => (
          <li
            key={skill}
            className={styles.tag}
            data-cursor="grow"
            data-reveal
            style={stagger(i)}
          >
            <span className={styles.num}>{pad(i + 1)}</span>
            {skill}
          </li>
        ))}
      </ul>
    </Section>
  );
}
