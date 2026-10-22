'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionChip from '../ui/SectionChip';
import { formats } from '../../data/content';
import '../../styles/format.css';

const details = [
  { num: '01', title: formats[0][0], detail: formats[0][1] },
  { num: '02', title: formats[1][0], detail: formats[1][1] },
  { num: '03', title: formats[2][0], detail: formats[2][1] },
  { num: '04', title: formats[3][0], detail: 'Вопросы можно задать в общем чате во время интенсива.' },
];

export default function FormatSection({ openDialog }) {
  const reduce = useReducedMotion();

  return (
    <section className="ed-format ed-format--cards" id="format" aria-labelledby="ed-format-title">
      <div className="ed-format__wrap">
        <div className="ed-format__head">
          <SectionChip>Формат</SectionChip>
          <h2 id="ed-format-title">Как проходит интенсив</h2>
        </div>

        <div className="ed-format__grid">
          {/* Портрет без рамки внутри: пропорции контейнера повторяют исходное фото. */}
          <motion.figure
            className="ed-format__visual"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.17 }}
            transition={{ duration: 0.65 }}
          >
            <img
              src="/images/marina-format.jpg"
              alt="Марина Карпер в полный рост"
              width="1365"
              height="2048"
              loading="lazy"
              decoding="async"
            />
          </motion.figure>

          {/* Карточки + кнопка составляют одну правую колонку. */}
          <div className="ed-format__right">
            <div className="ed-format__cards">
              {details.map((item, index) => (
                <motion.article
                  key={item.num}
                  className="ed-format__card"
                  initial={reduce ? false : { opacity: 0, y: 19 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.52, delay: index * 0.07 }}
                >
                  <span>{item.num} / 04</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </motion.article>
              ))}
            </div>

            <div className="ed-format__cta-wrap">
              <button
                className="ed-format__cta"
                type="button"
                onClick={() => openDialog?.('payment')}
              >
                <span>Принять участие</span>
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
