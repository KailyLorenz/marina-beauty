"use client";

import { useRef, useState } from "react";
import SectionChip from '../ui/SectionChip';
import { motion, useReducedMotion } from "motion/react";
import { methods } from "../../data/content";
import { num } from "../../data/media";
import "../../styles/approach.css";

const practiceItems = [
  {
    title: methods[0][0],
    description: methods[0][1],
    technique: methods[0][2],
    photoDescription: methods[0][3],
    cover: "/images/marina-approach-01.webp",
    video: "/videos/marina-practice-01.mp4",
  },
  {
    title: methods[1][0],
    description: methods[1][1],
    technique: methods[1][2],
    photoDescription: methods[1][3],
    cover: "/images/marina-approach-02.webp",
    video: "/videos/marina-practice-02.mp4",
  },
  {
    title: methods[2][0],
    description: methods[2][1],
    technique: methods[2][2],
    photoDescription: methods[2][3],
    cover: "/images/marina-approach-03.webp",
    video: "/videos/marina-practice-03.mp4",
  },
  {
    title: methods[3][0],
    description: methods[3][1],
    technique: methods[3][2],
    photoDescription: methods[3][3],
    cover: "/images/marina-approach-04.webp",
    video: "/videos/marina-practice-04.mp4",
  }
];

const ease = [0.22, 1, 0.36, 1];

export default function ApproachSection() {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const reduceMotion = useReducedMotion();

  function openVideo(src, title, index) {
    if (!src || !dialogRef.current) return;
    setActiveVideo({ src, title, index });
    if (!dialogRef.current.open) dialogRef.current.showModal();
  }

  function closeVideo() {
    videoRef.current?.pause();
    dialogRef.current?.close();
    setActiveVideo(null);
  }

  return (
    <section className="mk-approach" id="approach" aria-labelledby="mk-approach-heading">
      <div className="mk-approach__container">
        <div className="mk-approach__heading">
          <div>
            <SectionChip>Методика</SectionChip>
            <h2 id="mk-approach-heading">
              Как будем <em>работать с лицом</em>
            </h2>
          </div>
          <p className="mk-approach__intro">
            Четыре направления практики с короткими видеофрагментами. Мой разбор на модели можно посмотреть выше.
          </p>
        </div>

        <div className="mk-approach__list">
          {practiceItems.map((item, index) => (
            <motion.article
              className="mk-approach__item"
              key={`${index}-${item.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
            >
              <div className="mk-approach__visual">
                <img
                  src={item.cover}
                  alt={item.photoDescription || `Практика Марины: ${item.title}`}
                  width="1280"
                  height="850"
                  loading="lazy"
                  decoding="async"
                />

                {item.video && (
                  <button
                    type="button"
                    className="mk-approach__play"
                    onClick={() => openVideo(item.video, item.title, index)}
                    aria-label={`Посмотреть видеофрагмент: ${item.title}`}
                  >
                    <span className="mk-approach__play-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="m8 5 11 7-11 7V5Z" />
                      </svg>
                    </span>
                    <span className="mk-visually-hidden">Смотреть фрагмент</span>
                  </button>
                )}

                <span className="mk-approach__visual-counter" aria-hidden="true">
                  ПРАКТИКА {num(index + 1)}
                </span>
              </div>

              <div className="mk-approach__text">
                <div className="mk-approach__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                  <span> / {String(practiceItems.length).padStart(2, "0")}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="mk-approach__description">{item.description}</p>

                {item.technique && (
                  <div className="mk-approach__technique">
                    <span>КАК РАБОТАЕМ</span>
                    <p>{item.technique}</p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="mk-approach__dialog"
        aria-label={activeVideo ? `Видеофрагмент: ${activeVideo.title}` : "Просмотр видео"}
        onClose={() => {
          videoRef.current?.pause();
          setActiveVideo(null);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeVideo();
        }}
      >
        <div className="mk-approach__dialog-inner">
          <div className="mk-approach__dialog-head">
            <p>{activeVideo?.title}</p>
            <button type="button" onClick={closeVideo} aria-label="Закрыть видео">
              ✕
            </button>
          </div>

          {activeVideo && (
            <video
              ref={videoRef}
              key={activeVideo.src}
              src={activeVideo.src}
              poster={practiceItems[activeVideo.index]?.cover}
              controls
              autoPlay
              playsInline
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
