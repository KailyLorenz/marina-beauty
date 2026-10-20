"use client";

import { useRef, useState } from "react";
import SectionChip from '../ui/SectionChip';
import { motion, useInView, useReducedMotion } from "motion/react";
import "../../styles/floating-concerns.css";

const words = [
  { label: "Носогубные складки", position: "one", x: 7, y: -8, duration: 8.2 },
  { label: "Потеря упругости", position: "two", x: -8, y: 8, duration: 9.4 },
  { label: "Отёчность под глазами", position: "three", x: 6, y: 7, duration: 7.8 },
  { label: "Уставший овал лица", position: "four", x: -6, y: -9, duration: 10.2 },
];

const easeOut = [0.22, 1, 0.36, 1];

function FloatingWord({ word, index, visible, reduceMotion }) {
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(false);
  const canFloat = visible && entered && !reduceMotion && !hovered;

  return (
    <li className={`mc-float__position mc-float__position--${word.position}`}>
      <motion.div
        className="mc-float__reveal"
        initial={reduceMotion ? false : { opacity: 0, y: 22, scale: 0.97, filter: "blur(5px)" }}
        animate={visible || reduceMotion
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 22, scale: 0.97, filter: "blur(5px)" }}
        transition={{ duration: 0.78, delay: reduceMotion ? 0 : 0.15 + index * 0.2, ease: easeOut }}
        onAnimationComplete={() => { if (visible) setEntered(true); }}
      >
        <motion.div
          className="mc-float__drift"
          animate={canFloat ? { x: [0, word.x, 0], y: [0, word.y, 0] } : { x: 0, y: 0 }}
          transition={canFloat
            ? { duration: word.duration, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            : { duration: 0.5, ease: "easeOut" }}
        >
          <motion.span
            className="mc-float__pill"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={reduceMotion ? undefined : { scale: 1.035, y: -3 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            {word.label}
          </motion.span>
        </motion.div>
      </motion.div>
    </li>
  );
}

export default function FloatingConcerns() {
  // Track the WORD FIELD rather than the whole section. The animation begins
  // only after most of the field has entered the central area of the viewport.
  const fieldRef = useRef(null);
  const visible = useInView(fieldRef, {
    once: true,
    amount: 0.6,
    margin: "0px 0px -20% 0px",
  });
  const reduceMotion = useReducedMotion();

  return (
    <section className="mc-float" aria-labelledby="mc-float-title">
      <div className="mc-float__intro">
        <motion.div
          className="mc-float__chip"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={visible || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <SectionChip>Знакомо?</SectionChip>
        </motion.div>
        <motion.h3
          id="mc-float-title"
          className="mc-float__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 25, filter: "blur(5px)" }}
          animate={visible || reduceMotion
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 25, filter: "blur(5px)" }}
          transition={{ duration: 0.85, delay: reduceMotion ? 0 : 0.08, ease: easeOut }}
        >
          Иногда отражение говорит <em>больше, чем слова.</em>
        </motion.h3>
      </div>

      <ul ref={fieldRef} className="mc-float__field" aria-label="Какие изменения вы можете замечать">
        {words.map((word, index) => (
          <FloatingWord
            key={word.position}
            word={word}
            index={index}
            visible={visible}
            reduceMotion={reduceMotion}
          />
        ))}
      </ul>

      <motion.p
        className="mc-float__closing"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={visible || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.8, delay: reduceMotion ? 0 : 1.05, ease: easeOut }}
      >
        Изменения приходят постепенно. Но заметить их — уже первый шаг.
      </motion.p>
    </section>
  );
}
