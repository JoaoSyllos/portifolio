import { site } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>© {site.year}</span>
      <span>{site.tagline}</span>
    </footer>
  );
}
