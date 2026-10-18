'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { photos, num } from '../../data/media';
import '../../styles/results.css';

const stories = [
  {
    title: 'Более свежий взгляд и мягче область под глазами',
    note: 'Сравните нижнюю треть лица, зону под глазами и общее ощущение от овала лица.',
  },
  {
    title: 'Лицо выглядит более собранным',
    note: 'Обратите внимание на щёки, линию подбородка и то, как меняется общее впечатление.',
  },
  {
    title: 'Мягче носогубная зона и нижняя часть лица',
    note: 'Контур лица выглядит иначе, но освещение и поза на фотографиях могут отличаться.',
  },
  {
    title: 'Менее заметна тяжесть вокруг рта',
    note: 'Смотрите на область носогубок, уголки губ и общий тонус лица.',
  },
  {
    title: 'Ровнее очертания щёк и овала',
    note: 'Иногда эффект хорошо видно именно по общему силуэту лица, а не по одной точке.',
  },
  {
    title: 'Более лёгкое впечатление в средней части лица',
    note: 'На фото могут влиять свет, мимика и ракурс, поэтому сравнивайте образ целиком.',
  },
  {
    title: 'Чётче линия нижней челюсти',
    note: 'Сравните переход от щеки к подбородку и выраженность нижней линии лица.',
  },
  {
    title: 'Изменения заметны в щёках и подбородке',
    note: 'У разных участниц динамика выглядит по-разному — здесь важно смотреть на форму лица.',
  },
  {
    title: 'Более спокойное, собранное лицо',
    note: 'Свет и макияж могут отличаться, но общий визуальный образ всё равно даёт хороший ориентир.',
  },
  {
    title: 'Иначе читается контур лица',
    note: 'Сравнивайте не только детали, но и общее впечатление от портрета целиком.',
  },
  {
    title: 'Более ровный контур щёк и овала',
    note: 'Обратите внимание на нижнюю треть лица и на то, как выглядит лицо в целом.',
  },
];

export default function ResultsSection() {
  const [index, setIndex] = useState(0);
  const thumbnailsRef = useRef(null);
  const reduced = useReducedMotion();
  const photosList = photos.results;

  const setPhoto = (next) => {
    const ix = (next + photosList.length) % photosList.length;
    setIndex(ix);
    const track = thumbnailsRef.current;
    const thumb = track?.querySelector(`[data-index="${ix}"]`);
    if (track && thumb) {
      track.scrollTo({
        left: thumb.offsetLeft - track.offsetLeft - track.clientWidth / 2 + thumb.clientWidth / 2,
        behavior: reduced ? 'auto' : 'smooth',
      });
    }
  };

  const story = stories[index] || stories[0];

  return (
    <section className="ed-results" id="results" aria-labelledby="ed-results-title">
      <div className="ed-results__wrap">
        <div className="ed-results__heading">
          <p className="ed-kicker">04 / РЕЗУЛЬТАТЫ УЧАСТНИЦ</p>
          <h2 id="ed-results-title">Истории <em>в фотографиях.</em></h2>
          <p>Реальные сравнительные снимки участниц. Листайте истории и рассматривайте детали в каждом сравнении.</p>
        </div>

        <div className="ed-results__gallery">
          <div className="ed-results__stage">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={index}
                src={photosList[index]}
                alt={`Сравнительные фотографии до и после, история ${index + 1} из ${photosList.length}`}
                width="1280"
                height="1280"
                initial={reduced ? false : { opacity: 0, scale: 1.015 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.36 }}
              />
            </AnimatePresence>

            <div className="ed-results__overlay ed-results__overlay--top">
              <span>ФОТО {num(index + 1)} / {num(photosList.length)}</span>
            </div>

            <div className="ed-results__overlay ed-results__overlay--bottom" aria-live="polite">
              <p className="ed-results__overlay-kicker">Что замечаем</p>
              <h3>{story.title}</h3>
              <p>{story.note}</p>
            </div>
          </div>

          <aside className="ed-results__aside">
            <div className="ed-results__aside-top">
              <p className="ed-kicker">ВИЗУАЛЬНОЕ СРАВНЕНИЕ</p>
              <h3>Выберите <em>историю.</em></h3>
              <p className="ed-results__observation">Можно листать стрелками или выбрать миниатюру ниже.</p>
            </div>

            <div className="ed-results__controls">
              <span>{num(index + 1)} <span>/ {num(photosList.length)}</span></span>
              <div>
                <button type="button" onClick={() => setPhoto(index - 1)} aria-label="Предыдущая фотография">←</button>
                <button type="button" onClick={() => setPhoto(index + 1)} aria-label="Следующая фотография">→</button>
              </div>
            </div>

            <div className="ed-results__thumbs" ref={thumbnailsRef} aria-label="Выбор фотографии результата">
              {photosList.map((src, i) => (
                <button
                  data-index={i}
                  className={index === i ? 'is-selected' : ''}
                  key={src}
                  type="button"
                  aria-label={`Показать историю ${i + 1}`}
                  aria-pressed={index === i}
                  onClick={() => setPhoto(i)}
                >
                  <img src={src} alt="" width="128" height="128" loading="lazy" />
                </button>
              ))}
            </div>

            <a href="#price" className="ed-results__cta">Узнать об участии <span aria-hidden="true">↗</span></a>
          </aside>
        </div>

        <div className="ed-results__foot">
          <p>Фотографии предоставлены для иллюстрации личного опыта участниц. Освещение, ракурс, мимика и качество снимков могут отличаться.</p>
        </div>
      </div>
    </section>
  );
}
