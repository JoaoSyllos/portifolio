import { site } from '@/data/content';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        © {site.year} {site.name}
      </span>
      <span>{site.signature}</span>
    </footer>
  );
}
