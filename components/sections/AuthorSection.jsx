'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import '../../styles/author.css';

const credentials = [
  'Дипломированный специалист по коррекции осанки и сколиоза',
  'Дипломированный специалист по восстановлению женского тела',
  'Автор программ по омоложению лица и коррекции осанки',
];

function AnimatedNumber({ value, started, reducedMotion, duration = 1.7 }) {
  const [number, setNumber] = useState(started && reducedMotion ? value : 0);

  useEffect(() => {
    if (!started) return undefined;
    if (reducedMotion) {
      setNumber(value);
      return undefined;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setNumber(Math.round(latest)),
    });
    return () => controls.stop();
  }, [started, value, duration, reducedMotion]);

  return <>{number.toLocaleString('ru-RU')}</>;
}

export default function AuthorSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.22 });
  const reducedMotion = useReducedMotion();
  const noMotion = Boolean(reducedMotion);
  const appear = (delay = 0) => ({
    initial: noMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: noMotion ? 0 : 0.75, delay: noMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section ref={sectionRef} className="mk-author" id="author" aria-labelledby="mk-author-title">
      <div className="mk-author__layout">
        <motion.figure className="mk-author__visual" {...appear(0)}>
          <img
            src="/images/marina-author-smile.png"
            alt="Марина Карпер — автор программы"
            width="853"
            height="1280"
            loading="lazy"
            decoding="async"
          />
          {/*<figcaption>Марина Карпер <span aria-hidden="true">/</span> автор программы</figcaption>*/}
        </motion.figure>

        <div className="mk-author__content">
          <motion.p className="mk-author__eyebrow" {...appear(0.06)}>06 / ЗНАКОМСТВО</motion.p>
          <motion.p className="mk-author__kicker" {...appear(0.1)}>Автор программы</motion.p>
          <motion.h2 id="mk-author-title" {...appear(0.14)}>
            Марина <em>Cарпер</em>
          </motion.h2>
          <motion.div className="mk-author__signature" aria-hidden="true" {...appear(0.18)}>
            <span className="mk-author__signature-rule" />
            <span className="mk-author__signature-name">Marina Carper</span>
          </motion.div>
          <motion.h3 className="mk-author__subtitle" {...appear(0.2)}>
            Эксперт по естественному омоложению лица, шеи и осанки
          </motion.h3>

          <ul className="mk-author__credentials">
            {credentials.map((credential, index) => (
              <motion.li key={credential} {...appear(0.23 + index * 0.09)}>
                <span className="mk-author__check" aria-hidden="true">↗</span>
                <span>{credential}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mk-author__statistics" aria-label="Опыт и результаты Марины">
            <motion.div className="mk-author__stat" {...appear(0.36)}>
              <strong aria-label="Более семи лет">
                <AnimatedNumber value={7} started={isInView} reducedMotion={noMotion} />
                <span>+</span>
              </strong>
              <p>лет практики<br />в работе с лицом и осанкой</p>
            </motion.div>
            <motion.div className="mk-author__stat" {...appear(0.44)}>
              <strong aria-label="Более двух тысяч женщин">
                <AnimatedNumber value={2000} started={isInView} reducedMotion={noMotion} duration={2} />
                <span>+</span>
              </strong>
              <p>женщин прошли программы<br />и получили результаты</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
