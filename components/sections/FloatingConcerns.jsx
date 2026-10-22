"use client";

import { motion, useReducedMotion } from 'motion/react';
import '../../styles/floating-concerns.css';

const signs = [
  'Появились носогубные складки, опустились уголки губ',
  'Кожа стала дряблой, лицо осунулось',
  'Отёчность под глазами',
  'Уставшее и «поплывшее» вниз лицо',
];

export default function FloatingConcerns() {
  const reduce = useReducedMotion();
  return (
    <section className="mc-mirror mc-mirror--editorial" aria-labelledby="mc-mirror-title">
      <div className="mc-mirror__top">
        <div className="mc-mirror__intro">
          <p className="mc-mirror__eyebrow">Знакомо?</p>
          <h2 id="mc-mirror-title">Отражение в зеркале <em>больше не радует?</em></h2>
        </div>
        <motion.figure className="mc-mirror__photo"
          initial={reduce ? false : {opacity:0, y:18}}
          whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}
          transition={{duration:.65}}>
          <img src="/images/mature-mirror-reference.png" alt="Женщина смотрит на своё отражение в зеркале" loading="lazy" />
        </motion.figure>
      </div>
      <div className="mc-mirror__signs" aria-label="Знакомые изменения лица">
        {signs.map((sign,i) => (
          <div key={sign} className="mc-mirror__sign">
            <span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
            <p>{sign}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
