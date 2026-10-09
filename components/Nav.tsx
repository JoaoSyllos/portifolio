import { navItems, site } from '@/data/content';
import styles from './Nav.module.css';

export default function Nav() {
  const [first, ...rest] = site.name.split(' ');
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.brand}>
        {first}
        {rest.length > 0 && <span className={styles.surname}> {rest.join(' ')}</span>}.
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
