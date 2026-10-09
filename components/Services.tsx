import Section from './Section';
import { sections, services } from '@/data/content';
import { stagger } from '@/lib/motion';
import styles from './Services.module.css';

export default function Services() {
  return (
    <Section id={sections.servicos.id} title="O que eu faço" className={styles.section}>
      <ul className={styles.list}>
        {services.map(({ title, text, ideal }, i) => (
          <li key={title} className={styles.card} data-reveal style={stagger(i)}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
            <p className={styles.ideal}>
              <span className={styles.label}>Ideal para</span>
              {ideal}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
