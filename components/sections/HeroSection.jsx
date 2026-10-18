'use client';

import { useEffect, useRef } from 'react';

// A tiny, scroll-linked parallax that only touches CSS variables.
// No React rerender on scroll and no extra animation dependency.
function useHeroParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 600px)');
    let frame = 0;

    const render = () => {
      frame = 0;

      if (reduceMotion.matches) {
        hero.style.removeProperty('--hero-photo-shift');
        hero.style.removeProperty('--hero-copy-shift');
        hero.style.removeProperty('--hero-copy-opacity');
        hero.style.removeProperty('--hero-benefits-shift');
        return;
      }

      const rect = hero.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      // The effect must be visible BEFORE the hero leaves the viewport.
      // Portrait follows the scroll more slowly; text moves in the opposite direction.
      // Caps also prevent excessive image crops on tall and narrow displays.
      const travelled = Math.max(0, Math.min(-rect.top, rect.height));
      const mobile = smallScreen.matches;

      // Tune only these four numbers to adjust the parallax strength.
      const photoShift = Math.min(mobile ? 58 : 170, travelled * (mobile ? 0.15 : 0.32));
      const copyShift = -Math.min(mobile ? 36 : 108, travelled * (mobile ? 0.09 : 0.20));
      const benefitsShift = -Math.min(mobile ? 12 : 34, travelled * (mobile ? 0.035 : 0.08));
      const copyOpacity = mobile ? 1 : 1 - Math.min(0.18, travelled / Math.max(rect.height, 1) * 0.18);

      hero.style.setProperty('--hero-photo-shift', `${photoShift.toFixed(2)}px`);
      hero.style.setProperty('--hero-copy-shift', `${copyShift.toFixed(2)}px`);
      hero.style.setProperty('--hero-benefits-shift', `${benefitsShift.toFixed(2)}px`);
      hero.style.setProperty('--hero-copy-opacity', copyOpacity.toFixed(3));
    };

    const requestFrame = () => {
      if (frame === 0) frame = window.requestAnimationFrame(render);
    };

    const motionChanged = () => requestFrame();
    render();
    window.addEventListener('scroll', requestFrame, { passive: true });
    window.addEventListener('resize', requestFrame);
    reduceMotion.addEventListener?.('change', motionChanged);

    return () => {
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      reduceMotion.removeEventListener?.('change', motionChanged);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

const benefitItems = [
  { title: '15 минут', detail: 'в день', icon: 'clock' },
  { title: 'Пошаговые', detail: 'видеоуроки', icon: 'play' },
  { title: 'Без уколов', detail: 'и процедур', icon: 'leaf' },
];

function BenefitIcon({ type }) {
  if (type === 'clock') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M12 6.5v6.2l4 2.1"/></svg>;
  if (type === 'play') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.4" y="3.4" width="19.2" height="15.5" rx="1.9"/><path d="m10 8.2 5.5 3.1L10 14.5zM8 21.3h8"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 3.5c-10.8-.6-17.2 5-17.2 11.2a5.8 5.8 0 0 0 5.9 5.8C15.7 20.5 21 12.2 20.5 3.5Z"/><path d="M4.5 21c2.2-5.8 5.8-9.6 11.3-12.9"/></svg>;
}

export default function ExperienceHero() {
  const heroRef = useHeroParallax();

  return (
    <section ref={heroRef} className="exp-hero" id="top" aria-label="Авторский курс Марины Карпер по работе с лицом">
      <div className="exp-hero__light" aria-hidden="true" />
      <div className="exp-hero__portrait" aria-hidden="true">
        <img src="/images/marina-hero-new.jpg" alt="" width="853" height="1280" fetchPriority="high" />
      </div>
      <div className="exp-hero__inner">
        <div className="exp-hero__copy">
          <p className="exp-hero__eyebrow">Авторский курс</p>
          <h1>
            <span className="exp-hero__desktop-line">Носогубные складки,</span>
            <span className="exp-hero__desktop-line">уставшее и «поплывшее»</span>
            <span className="exp-hero__desktop-line">вниз лицо?</span>
            <span className="exp-hero__mobile-line">Носогубные</span>
            <span className="exp-hero__mobile-line">складки?</span>
            <span className="exp-hero__mobile-line">Уставшее и</span>
            <span className="exp-hero__mobile-line">«поплывшее»</span>
            <span className="exp-hero__mobile-line">лицо?</span>
          </h1>
          <p className="exp-hero__description">5-недельная программа для работы<br className="exp-desktop-only" /> со средней частью лица</p>
          <a className="exp-hero__cta" href="#price" aria-label="Принять участие — перейти к стоимости курса">
            <span className="exp-hero__cta-arrow" aria-hidden="true"><svg viewBox="0 0 44 18" focusable="false"><path d="M2 9h36"/><path d="m31 3 9 6-9 6"/></svg></span>
            <span className="exp-hero__cta-face"><svg className="exp-hero__cta-outline" viewBox="0 0 160 160" aria-hidden="true" focusable="false"><circle cx="80" cy="80" r="78"/></svg><span className="exp-hero__cta-label">ПРИНЯТЬ<br/>УЧАСТИЕ</span></span>
          </a>
        </div>
        <ul className="exp-hero__benefits" aria-label="Преимущества программы">
          {benefitItems.map(({ title, detail, icon }) => <li key={icon}><BenefitIcon type={icon}/><span><strong>{title}</strong><small>{detail}</small></span></li>)}
        </ul>
      </div>
    </section>
  );
}
