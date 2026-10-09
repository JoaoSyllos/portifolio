import Section from './Section';
import { contacts, sections } from '@/data/content';
import { stagger } from '@/lib/motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <Section id={sections.contato.id} className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.line} data-reveal>
          VAMOS
        </span>{' '}
        <span className={styles.line} data-reveal style={stagger(1)}>
          CONSTRUIR
        </span>{' '}
        <span className={`${styles.line} ${styles.accent}`} data-reveal style={stagger(2)}>
          ALGO REAL.
        </span>
      </h2>
      <ul className={styles.links}>
        {contacts.map(({ label, href, primary }, i) => (
          <li key={label} data-reveal style={stagger(i + 3)}>
            <a href={href} className={primary ? styles.primary : styles.link}>
              {label}
              <span className={styles.arrow} aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
