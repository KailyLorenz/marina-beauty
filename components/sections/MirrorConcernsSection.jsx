'use client';

import { motion, useReducedMotion } from 'motion/react';
import '../../styles/mirror-concerns.css';

// The wording of the four cards and heading is kept exactly as in Marina's reference.
const concerns = [
  'Появились носогубные складки, опустились уголки губ',
  'Кожа стала дряблой, лицо осунулось',
  'Отёчность под глазами',
  'Уставшее и «поплывшее» вниз лицо',
];

export default function MirrorConcernsSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mc-recognition" id="recognition" aria-labelledby="mc-recognition-title">
      <div className="mc-recognition__shell">
        <div className="mc-recognition__top">
          <div className="mc-recognition__copy">
            {/* No decorative dash/chip before “Знакомо?” as requested. */}
            <span className="mc-recognition__eyebrow">Знакомо?</span>
            <h2 id="mc-recognition-title">
              Отражение в зеркале <em>больше не радует?</em>
            </h2>
          </div>

          <motion.figure
            className="mc-recognition__visual"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/images/mirror-concerns-portrait.jpg"
              alt="Женщина рассматривает своё отражение в зеркале"
              width="1024"
              height="1280"
              loading="lazy"
              decoding="async"
            />
          </motion.figure>
        </div>

        <div className="mc-recognition__cards" role="list" aria-label="Знакомые изменения во внешности">
          {concerns.map((text, index) => (
            <motion.div
              role="listitem"
              className="mc-recognition__card"
              key={text}
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.52, delay: index * 0.055 }}
            >
              <span className="mc-recognition__number">{String(index + 1).padStart(2, '0')}</span>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
