'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import '../../styles/author.css';

const credentials = [
  'Коррекция осанки и сколиоза — дипломированная подготовка',
  'Восстановление женского тела — профильное обучение',
  'Создаю программы для лица, шеи и осанки',
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
  const statsRef = useRef(null);
  // Observe the counters themselves: the full author section can be taller
  // than the viewport, in which case section-based thresholds never fire.
  const statsInView = useInView(statsRef, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const noMotion = Boolean(reducedMotion);
  const appear = (delay = 0) => ({
    initial: noMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: noMotion ? 0 : 0.75, delay: noMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="mk-author" id="author" aria-labelledby="mk-author-title">
      <div className="mk-author__heading">
        <motion.h2 id="mk-author-title" {...appear(0.10)}>Обо <em>мне.</em></motion.h2>
      </div>
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
        </motion.figure>

        <div className="mk-author__content">
          <motion.p className="mk-author__lead" {...appear(0.17)}>
            Я помогаю женщинам бережно работать с лицом, шеей и осанкой — через внимание к телу и регулярную практику.
          </motion.p>

          <ul className="mk-author__credentials">
            {credentials.map((credential, index) => (
              <motion.li key={credential} {...appear(0.23 + index * 0.09)}>
                <span className="mk-author__check" aria-hidden="true">↗</span>
                <span>{credential}</span>
              </motion.li>
            ))}
          </ul>

          <div ref={statsRef} className="mk-author__statistics" aria-label="Опыт и результаты Марины">
            <motion.div className="mk-author__stat" {...appear(0.36)}>
              <strong aria-label="Более семи лет">
                <AnimatedNumber value={7} started={statsInView || noMotion} reducedMotion={noMotion} />
                <span>+</span>
              </strong>
              <p>лет практики<br />в работе с лицом и осанкой</p>
            </motion.div>
            <motion.div className="mk-author__stat" {...appear(0.44)}>
              <strong aria-label="Более двух тысяч женщин">
                <AnimatedNumber value={2000} started={statsInView || noMotion} reducedMotion={noMotion} duration={2} />
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
