'use client';

import { motion, useReducedMotion } from 'motion/react';
import SectionChip from '../ui/SectionChip';
import '../../styles/reasons.css';

/** The three existing educational illustrations from the source project. */
const reasons = [
  {
    image: '/images/course-02.webp',
    alt: 'Иллюстрация жевательных мышц и направления работы с мягкими тканями лица',
    title: 'Жевательные мышцы становятся жёсткими и укороченными',
    description: 'Они стягивают ткани к центру и вниз — носогубки становятся глубже, средняя часть лица тяжелее.',
  },
  {
    image: '/images/course-03.webp',
    alt: 'Иллюстрация средней и нижней части лица с отмеченными мышечными зонами',
    title: 'Мышцы средней и нижней части лица постоянно напряжены',
    description: 'Появляются носогубные валики, усиливаются отёки и мешки под глазами, уголки рта опускаются, ткани тянутся вниз.',
  },
  {
    image: '/images/course-04.webp',
    alt: 'Иллюстрация положения головы, шеи и плеч в профиль',
    title: 'Напряжение в шее и нарушение осанки',
    description: 'Усиливают отёчность и тяжесть лица. Ткани «плывут» вниз, кожа выглядит более дряблой, лицо — уставшим.',
  },
];

export default function ReasonsSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="ed-reasons" id="reasons" aria-labelledby="ed-reasons-title">
      <div className="ed-reasons__wrap">
        <div className="ed-reasons__head">
          <SectionChip>Причины</SectionChip>
          <h2 id="ed-reasons-title">Почему лицо выглядит уставшим <em>и «плывёт» вниз?</em></h2>
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
          <div><span className="ed-reasons__summary-label">ПОЭТОМУ Я СМОТРЮ ШИРЕ</span><p>Лицо, шея и осанка — <em>одна система практик.</em></p></div>
          <a href="#approach">Посмотреть методику <span aria-hidden="true">↗</span></a>
        </div>
        <p className="ed-reasons__disclaimer">Иллюстрации схематические и не являются медицинской диагностикой. Причины изменений внешности индивидуальны.</p>
      </div>
    </section>
  );
}
