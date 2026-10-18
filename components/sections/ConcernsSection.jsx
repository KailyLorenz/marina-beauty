'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Editorial introduction: no private "before" portrait of Marina.
 * The real model demonstration is loaded only when someone chooses to watch.
 */
export default function ConcernsSection() {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  function openVideo() {
    if (!dialogRef.current) return;
    setVideoOpen(true);
    if (!dialogRef.current.open) dialogRef.current.showModal();
  }

  function closeVideo() {
    videoRef.current?.pause();
    dialogRef.current?.close();
    setVideoOpen(false);
  }

  return (
    <section className="mc-explain" id="concerns" aria-labelledby="mc-explain-title">
      <div className="mc-explain__container">
        <motion.div
          className="mc-explain__copy"
          initial={reducedMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mc-explain__eyebrow">01 / ОБЪЯСНЯЕМ НА ПРИМЕРЕ</p>
          <h2 id="mc-explain-title">Что влияет на <em>внешний вид лица?</em></h2>
          <p className="mc-explain__lead">
            Иногда изменения заметны в области носогубных складок, щёк или линии нижней челюсти.
            На коротком видео Марина показывает на модели зоны лица и объясняет, на что обращает внимание в своей практике.
          </p>
          <div className="mc-explain__note">
            <span className="mc-explain__note-line" aria-hidden="true" />
            <p>Здесь важен не один участок, а взаимосвязь лица, шеи и осанки.</p>
          </div>
          <a className="mc-explain__learn" href="#reasons">Посмотреть схему причин <span aria-hidden="true">↗</span></a>
        </motion.div>

        <motion.div
          className="mc-explain__video-col"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <button type="button" className="mc-explain__video-cover" onClick={openVideo} aria-label="Смотреть объяснение Марины на модели">
            <img
              src="/images/marina-model-explainer-poster.jpg"
              width="720"
              height="1280"
              alt="Модель в обучающем видео о лице и носогубной зоне"
              loading="lazy"
            />
            <span className="mc-explain__video-shade" aria-hidden="true" />
            <span className="mc-explain__glass-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="m8 5 11 7-11 7V5Z" /></svg>
            </span>
            <span className="mc-explain__video-top">ВИДЕО / РАЗБОР НА МОДЕЛИ</span>
            <span className="mc-explain__video-caption">Почему меняется лицо? <small>Смотреть объяснение ↗</small></span>
          </button>
          <p className="mc-explain__video-footnote">Реальный фрагмент занятия с объяснением — без постановочной фотографии Марины.</p>
        </motion.div>
      </div>

      <dialog
        ref={dialogRef}
        className="mc-explain__dialog"
        aria-label="Объяснение Марины на модели"
        onClose={() => { videoRef.current?.pause(); setVideoOpen(false); }}
        onClick={(event) => { if (event.target === dialogRef.current) closeVideo(); }}
      >
        <div className="mc-explain__dialog-inner">
          <div className="mc-explain__dialog-head">
            <p>Разбор на модели</p>
            <button type="button" onClick={closeVideo} aria-label="Закрыть видео">×</button>
          </div>
          {videoOpen && (
            <video
              ref={videoRef}
              src="/videos/marina-practice-05.mp4"
              poster="/images/marina-model-explainer-poster.jpg"
              controls
              playsInline
              autoPlay
              preload="none"
            >
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          )}
        </div>
      </dialog>
    </section>
  );
}
