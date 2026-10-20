'use client';

import { useEffect, useRef } from 'react';

/**
 * A small scroll-linked editorial parallax, deliberately independent of Lenis.
 * Content stays visible at all times; no entrance opacity that can get stuck.
 */
export default function EditorialQuote() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 700px)');
    let animationFrame = 0;

    const clearMotion = () => {
      section.style.removeProperty('--quote-first-y');
      section.style.removeProperty('--quote-second-y');
      section.style.removeProperty('--quote-star-y');
      section.style.removeProperty('--quote-star-rotate');
      section.style.removeProperty('--quote-glow-y');
    };

    const update = () => {
      animationFrame = 0;
      if (reduceMotion.matches) {
        clearMotion();
        return;
      }

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.top >= vh || rect.bottom <= 0) return;

      // From entering the bottom edge to leaving through the top edge.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const centeredProgress = progress - 0.5;
      const mobile = smallScreen.matches;

      // Intentionally restrained: this is a poetic transition, not another hero.
const firstY = centeredProgress * (mobile ? -18 : -28);
const secondY = centeredProgress * (mobile ? -32 : -52);
const starY = centeredProgress * (mobile ? -30 : -66);
      const starRotate = centeredProgress * 48;
      const glowY = centeredProgress * (mobile ? 44 : 100);

      section.style.setProperty('--quote-first-y', `${firstY.toFixed(2)}px`);
      section.style.setProperty('--quote-second-y', `${secondY.toFixed(2)}px`);
      section.style.setProperty('--quote-star-y', `${starY.toFixed(2)}px`);
      section.style.setProperty('--quote-star-rotate', `${starRotate.toFixed(2)}deg`);
      section.style.setProperty('--quote-glow-y', `${glowY.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reduceMotion.addEventListener?.('change', requestUpdate);
    smallScreen.addEventListener?.('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reduceMotion.removeEventListener?.('change', requestUpdate);
      smallScreen.removeEventListener?.('change', requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      clearMotion();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="editorial-quote"
      aria-label="Философия программы"
    >
      <div className="editorial-quote__glow" aria-hidden="true" />
      <div className="editorial-quote__inner">
        <span className="quote-star" aria-hidden="true">✳</span>

        <p className="editorial-quote__text">
          <span className="editorial-quote__line editorial-quote__line--first">
            Красота — это не борьба с возрастом.
          </span>
          <span className="editorial-quote__line editorial-quote__line--second">
            <em>Это внимание к себе.</em>
          </span>
        </p>

        <span className="quote-mark">МЕТОД МАРИНЫ КАРПЕР</span>
      </div>
    </section>
  );
}
