import Section from './Section';
import LeadDialog from './LeadDialog';
import { contacts, sections, whatsapp } from '@/data/content';
import { stagger } from '@/lib/motion';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <Section id={sections.contato.id} className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.line} data-reveal>
          Vamos
        </span>{' '}
        <span className={styles.line} data-reveal style={stagger(1)}>
          construir
        </span>{' '}
        <span className={`${styles.line} ${styles.accent}`} data-reveal style={stagger(2)}>
          algo real.
        </span>
      </h2>

      <div className={styles.actions} data-reveal style={stagger(3)}>
        <LeadDialog className={styles.cta}>
          {whatsapp.label}
          <span className={styles.arrow} aria-hidden>↗</span>
        </LeadDialog>

        <div className={styles.alt}>
          <span className={styles.altLabel}>ou, se preferir:</span>
          <ul className={styles.links}>
            {contacts.map(({ label, href }) => {
              const external = href.startsWith('http');
              return (
                <li key={label}>
                  <a
                    href={href}
                    className={styles.link}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {label}
                    <span className={styles.arrow} aria-hidden>↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
