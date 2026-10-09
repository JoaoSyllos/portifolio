import Section from './Section';
import { pad } from '@/lib/format';
import { stagger } from '@/lib/motion';
import styles from './Process.module.css';

/* Textos da seção: edite aqui. */
const steps = [
  {
    title: 'Conversa',
    text: 'Você me conta o que precisa, por WhatsApp ou chamada, sem compromisso.',
  },
  {
    title: 'Design',
    text: 'Crio o visual do seu site e ajustamos juntos até você aprovar.',
  },
  {
    title: 'Desenvolvimento',
    text: 'Só começo a programar depois da sua aprovação.',
  },
  {
    title: 'Entrega',
    text: 'Seu site no ar, no seu domínio.',
  },
];

const note = 'Pagamento em duas partes: metade no início, metade na entrega.';

export default function Process() {
  return (
    <Section id="como-funciona" title="Como funciona" className={styles.section}>
      <ol className={styles.steps}>
        {steps.map(({ title, text }, i) => (
          <li key={title} className={styles.step} data-reveal style={stagger(i)}>
            {/* a ordem já vem do <ol>; o número é só visual */}
            <span className={styles.num} aria-hidden>
              {pad(i + 1)}
            </span>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{text}</p>
          </li>
        ))}
      </ol>

      <p className={styles.note} data-reveal style={stagger(steps.length)}>
        {note}
      </p>
    </Section>
  );
}
