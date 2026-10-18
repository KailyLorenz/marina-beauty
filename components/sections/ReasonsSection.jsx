'use client';

import { motion, useReducedMotion } from 'motion/react';
import '../../styles/reasons.css';

/** The three existing educational illustrations from the source project. */
const reasons = [
  {
    image: '/images/course-02.webp',
    alt: 'Иллюстрация жевательных мышц и направления работы с мягкими тканями лица',
    title: 'Жевательные мышцы и напряжение',
    description: 'Повышенное напряжение в жевательных мышцах может влиять на ощущения в лице и на то, как воспринимается его рельеф.',
  },
  {
    image: '/images/course-03.webp',
    alt: 'Иллюстрация средней и нижней части лица с отмеченными мышечными зонами',
    title: 'Средняя и нижняя части лица',
    description: 'Мы обращаем внимание на мышцы и привычные паттерны напряжения в области щёк, рта и нижней трети лица.',
  },
  {
    image: '/images/course-04.webp',
    alt: 'Иллюстрация положения головы, шеи и плеч в профиль',
    title: 'Положение головы, шея и осанка',
    description: 'Положение головы, подвижность шеи и привычная осанка — ещё одна часть комплексной работы.',
  },
];

export default function ReasonsSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="ed-reasons" id="reasons" aria-labelledby="ed-reasons-title">
      <div className="ed-reasons__wrap">
        <div className="ed-reasons__head">
          <p className="ed-kicker">02 / ПОНИМАЕМ ПРИЧИНЫ</p>
          <h2 id="ed-reasons-title">Всё <em>взаимосвязано.</em></h2>
          <p>Не только кожа, но и работа мышц, положение головы и привычки тела могут влиять на внешний вид лица.</p>
        </div>
        <div className="ed-reasons__cards">
          {reasons.map(({ image, alt, title, description }, index) => (
            <motion.article
              className="ed-reasons__card"
              key={title}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <div className="ed-reasons__image">
                <img src={image} alt={alt} width="1254" height="1254" loading="lazy" decoding="async" />
              </div>
              <div className="ed-reasons__card-copy">
                <div className="ed-reasons__counter"><span>{String(index + 1).padStart(2, '0')} / 03</span><span aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="ed-reasons__summary">
          <div><span className="ed-reasons__summary-label">ПОЭТОМУ МЫ СМОТРИМ ШИРЕ</span><p>Лицо, шея и осанка — <em>одна система практик.</em></p></div>
          <a href="#approach">Посмотреть методику <span aria-hidden="true">↗</span></a>
        </div>
        <p className="ed-reasons__disclaimer">Иллюстрации схематические и не являются медицинской диагностикой. Причины изменений внешности индивидуальны.</p>
      </div>
    </section>
  );
}
