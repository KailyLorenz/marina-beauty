'use client';

import { motion, useReducedMotion } from 'motion/react';
import '../../styles/final-cta.css';

const contactChannels = [
  { label: 'MAX', dialog: 'MAX' },
  { label: 'Telegram', dialog: 'Telegram' },
  { label: 'ВКонтакте', dialog: 'ВКонтакте' },
];

export default function FinalCtaSection({ openDialog }) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contact" className="mk-final" aria-labelledby="mk-final-title">
      <div className="mk-final__glow" aria-hidden="true" />
      <div className="mk-final__inner">
        <motion.div
          className="mk-final__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mk-final__eyebrow">МАЛЕНЬКИЕ ШАГИ. ВНИМАНИЕ К СЕБЕ.</p>
          <h2 id="mk-final-title">Встречаемся <em>на интенсиве?</em></h2>
          <p className="mk-final__lead">Пять недель, которые можно посвятить себе — в собственном ритме, с понятными практиками и поддержкой.</p>
          <a className="mk-final__cta" href="#price">
            <span>Принять участие</span>
            <span className="mk-final__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </motion.div>
        <div className="mk-final__contacts">
          <p>Остались вопросы? Напишите нам</p>
          <div className="mk-final__channels">
            {contactChannels.map(({ label, dialog }) => (
              <button type="button" key={dialog} onClick={() => openDialog?.(dialog)}>
                {label}<span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
