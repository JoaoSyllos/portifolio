import { marquee } from '@/data/content';
import styles from './Marquee.module.css';

/** Faixa decorativa em loop; a segunda cópia fecha a emenda. */
export default function Marquee() {
  return (
    <div className={styles.marquee} aria-hidden>
      {[0, 1].map((copy) => (
        <div key={copy} className={styles.track}>
          {marquee.map((item) => (
            <span key={item} className={styles.item}>
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
