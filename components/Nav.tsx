import { navItems, site } from '@/data/content';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.brand}>
        {site.brand}
      </a>
      <ul className={styles.links}>
        {navItems.map(({ id, label }) => (
          <li key={id}>
            {/* aria-current é marcado pelo <ScrollEffects> */}
            <a href={`#${id}`} className={styles.link}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <span className={styles.progress} aria-hidden />
    </nav>
  );
}
