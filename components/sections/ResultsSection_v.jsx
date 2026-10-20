'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { photos, num } from '../../data/media';
import '../../styles/results.css';

const SLIDE_MS = 6800;

// Описания относятся к реальным сравнительным фото из data/media.js.
// Не обещаем медицинских результатов: освещение и ракурс могут отличаться.
const stories = [
  { title: 'Более свежий взгляд', note: 'Обратите внимание на область под глазами и общее впечатление от лица.' },
  { title: 'Более собранный контур', note: 'Сравните линию подбородка и очертания щёк.' },
  { title: 'Мягче выражены складки', note: 'Посмотрите на носогубную зону и нижнюю часть лица.' },
  { title: 'Изменения вокруг рта', note: 'Сравните носогубные складки и уголки губ.' },
  { title: 'Иная линия овала лица', note: 'Обратите внимание на очертания щёк и подбородка.' },
  { title: 'Средняя часть лица', note: 'Сравните область щёк и под глазами.' },
  { title: 'Чётче нижняя линия лица', note: 'Посмотрите на область нижней челюсти.' },
  { title: 'Контур щёк и подбородка', note: 'Здесь различия лучше видны при сравнении лица целиком.' },
  { title: 'Другое общее впечатление', note: 'Условия освещения и выражение лица на снимках могут различаться.' },
  { title: 'Изменения в силуэте лица', note: 'Обратите внимание на ракурс и форму нижней части лица.' },
  { title: 'Более ровный контур', note: 'Сравните щёки, подбородок и овал лица.' },
];

export default function ResultsSection() {
  const images = photos.results;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [restartId, setRestartId] = useState(0);
  const rootRef = useRef(null);
  const touchRef = useRef(null);
  const remainingRef = useRef(SLIDE_MS);
  const resetRequestedRef = useRef(false);
  const reduced = Boolean(useReducedMotion());
  const isPlaying = inView && tabVisible && !paused && !hovered && !focused && !reduced;
  const story = stories[index] || stories[0];

  useEffect(() => {
    const target = rootRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Сохраняем оставшееся время при hover/focus; кнопка «Пауза» действительно
  // замораживает и таймер, и индикатор прогресса.
  useEffect(() => {
    if (!isPlaying) return undefined;
    resetRequestedRef.current = false;
    let completed = false;
    const duration = remainingRef.current;
    const startedAt = performance.now();
    const timeoutId = window.setTimeout(() => {
      completed = true;
      remainingRef.current = SLIDE_MS;
      setIndex((current) => (current + 1) % images.length);
    }, duration);
    return () => {
      window.clearTimeout(timeoutId);
      if (!completed && !resetRequestedRef.current) {
        remainingRef.current = Math.max(1, duration - (performance.now() - startedAt));
      }
      resetRequestedRef.current = false;
    };
  }, [isPlaying, index, restartId, images.length]);

  useEffect(() => {
    // Предварительно загружаем следующий снимок, чтобы переход не мигал.
    if (!inView) return undefined;
    const preloader = new Image();
    preloader.src = images[(index + 1) % images.length];
    return undefined;
  }, [index, inView, images]);

  function choose(next) {
    const selected = (next + images.length) % images.length;
    remainingRef.current = SLIDE_MS;
    resetRequestedRef.current = true;
    setPaused(true); // после ручного выбора даём спокойно рассмотреть снимок
    if (selected === index) setRestartId((id) => id + 1);
    else setIndex(selected);
  }

  function onTouchStart(event) {
    const touch = event.touches[0];
    touchRef.current = { x: touch.clientX, y: touch.clientY };
    if (!event.target.closest('button')) setPaused(true); // касание фото останавливает автопоказ
  }

  function onTouchEnd(event) {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || !event.changedTouches[0]) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      choose(index + (dx < 0 ? 1 : -1));
    }
  }

  return (
    <section className="ed-results" id="results" aria-labelledby="ed-results-title">
      <div className="ed-results__wrap">
        <div className="ed-results__heading">
          <p className="ed-kicker">04 / РЕЗУЛЬТАТЫ УЧАСТНИЦ</p>
          <h2 id="ed-results-title">Истории <em>в фотографиях.</em></h2>
          <p>Реальные сравнения «до / после». Каждую историю можно остановить и рассмотреть подробнее.</p>
        </div>

        <div
          className="ed-results__carousel"
          ref={rootRef}
          onPointerEnter={(event) => { if (event.pointerType === 'mouse') setHovered(true); }}
          onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHovered(false); }}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="карусель"
          aria-label="Результаты участниц — фотографии до и после"
        >
          <div className="ed-results__card">
            <div className="ed-results__photo">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`Фото до и после: история ${index + 1} из ${images.length}`}
                  width="1280"
                  height="1280"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  initial={reduced ? false : { opacity: 0, scale: 1.017 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: .994 }}
                  transition={{ duration: reduced ? 0 : .44, ease: [0.22, 1, 0.36, 1] }}
                />
              </AnimatePresence>
              <span className="ed-results__photo-tag">ДО / ПОСЛЕ</span>
            </div>

            <div className="ed-results__progress" aria-label={`История ${index + 1} из ${images.length}`}>
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  className={`ed-results__segment${i < index ? ' is-complete' : ''}${i === index ? ' is-current' : ''}`}
                  onClick={() => choose(i)}
                  aria-label={`Посмотреть историю ${i + 1}`}
                  aria-current={i === index ? 'step' : undefined}
                >
                  <span
                    key={`${index}-${restartId}-${i}`}
                    className="ed-results__segment-fill"
                    style={i === index ? {
                      animationDuration: `${SLIDE_MS}ms`,
                      animationPlayState: isPlaying ? 'running' : 'paused',
                    } : undefined}
                  />
                </button>
              ))}
            </div>

            <div className="ed-results__story" aria-live={isPlaying ? 'off' : 'polite'}>
              <div className="ed-results__story-heading">
                <span>ИСТОРИЯ {num(index + 1)} / {num(images.length)}</span>
                <span className="ed-results__status">{paused ? 'На паузе' : 'Реальные фотографии'}</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={reduced ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -5 }}
                  transition={{ duration: reduced ? 0 : .24 }}
                >
                  <h3>{story.title}</h3>
                  <p>{story.note}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="ed-results__controls">
            <button type="button" aria-label="Предыдущая история" onClick={() => choose(index - 1)}>
              <span aria-hidden="true">←</span>
            </button>
            {!reduced && (
              <button
                type="button"
                className="ed-results__pause"
                aria-label={paused ? 'Возобновить автоматическое переключение' : 'Приостановить автоматическое переключение'}
                aria-pressed={paused}
                onClick={() => { setPaused((value) => !value); setFocused(false); }}
              >
                <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
                <span>{paused ? 'Продолжить' : 'Пауза'}</span>
              </button>
            )}
            <button type="button" aria-label="Следующая история" onClick={() => choose(index + 1)}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <p className="ed-results__disclaimer">
          Освещение, мимика, ракурс и качество снимков могут различаться. Результаты индивидуальны.
        </p>
      </div>
    </section>
  );
}
