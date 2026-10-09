import { pad } from "@/lib/format";
import styles from "./Section.module.css";

type Props = {
  id?: string;
  title?: string;
  /** quantidade de itens, exibida ao lado do título */
  count?: number;
  className?: string;
  children: React.ReactNode;
};

export default function Section({
  id,
  title,
  count,
  className,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={[styles.section, className].filter(Boolean).join(" ")}
    >
      {title && (
        <h2 className={styles.title} data-reveal>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
