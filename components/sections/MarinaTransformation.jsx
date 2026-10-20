'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import '../../styles/marina-transformation.css';

const WAIT_MS = 5000;
const REVEAL_MS = 2600;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smooth = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Marina's first-person story. A real before portrait dissolves into the real
 * mirror photograph when the image enters view. No library/WebGL dependency:
 * the wave uses a CSS mask and the light specks are drawn in a small canvas.
 */
export default function MarinaTransformation() {
  const rootRef = useRef(null);
  const pictureRef = useRef(null);
  const canvasRef = useRef(null);
  const statusRef = useRef(null);
  const progressRef = useRef(null);
  const rafRef = useRef(0);
  const clockRef = useRef({ phase: 'before', waiting: 0, revealing: 0, last: 0 });
  const visibleRef = useRef(false);
  const pausedRef = useRef(false);
  const hoverRef = useRef(false);
  const manualRevealRef = useRef(false);
  const reducedRef = useRef(false);
  const [phase, setPhase] = useState('before');
  const [paused, setPaused] = useState(false);

  const particlesRef = useRef([]);
  if (!particlesRef.current.length) {
    // Deterministic seed — no random output changes between server and client.
    let seed = 69107;
    const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    particlesRef.current = Array.from({ length: 115 }, () => ({
      x: rand(), y: rand(), size: .45 + rand() * 1.45,
      lift: 15 + rand() * 55, side: (rand() - .5) * 24,
      offset: (rand() - .5) * .13, life: .09 + rand() * .13,
      bright: rand() > .72,
    }));
  }

  const clearDust = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (context) context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  }, []);

  const drawDust = useCallback((p) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    if (p <= 0 || p >= 1) return;

    context.globalCompositeOperation = 'screen';
    for (const particle of particlesRef.current) {
      const born = (particle.x + .28) / 1.55 + particle.offset;
      const age = (p - born) / particle.life;
      if (age <= 0 || age >= 1) continue;
      const alpha = Math.sin(Math.PI * age) * (particle.bright ? .78 : .43);
      const x = particle.x * width + particle.side * age;
      const y = particle.y * height - particle.lift * age;
      context.beginPath();
      context.arc(x, y, particle.size * (1 + age * .4), 0, Math.PI * 2);
      context.fillStyle = particle.bright ? `rgba(255,255,248,${alpha})` : `rgba(213,246,241,${alpha})`;
      context.shadowColor = 'rgba(244,255,248,.92)';
      context.shadowBlur = particle.bright ? 11 : 6;
      context.fill();
    }
    context.shadowBlur = 0;
    context.globalCompositeOperation = 'source-over';
  }, []);

  const renderTransition = useCallback((t) => {
    const el = pictureRef.current;
    if (!el) return;
    const p = smooth(clamp(t));
    const shine = Math.pow(Math.max(0, Math.sin(Math.PI * p)), .55);
    el.style.setProperty('--mk-light-edge', `${-34 + 169 * p}%`);
    el.style.setProperty('--mk-light-beam', `${-24 + 151 * p}%`);
    el.style.setProperty('--mk-light-strength', (shine * .92).toFixed(3));
    el.style.setProperty('--mk-wash-strength', (shine * .76).toFixed(3));
    el.style.setProperty('--mk-before-blur', `${(2.2 * Math.sin(Math.PI * p)).toFixed(2)}px`);
    if (progressRef.current) progressRef.current.style.width = '100%';
    drawDust(p);
  }, [drawDust]);

  const finish = useCallback(() => {
    const clock = clockRef.current;
    clock.phase = 'after';
    manualRevealRef.current = false;
    clock.revealing = REVEAL_MS;
    const picture = pictureRef.current;
    if (picture) {
      picture.style.setProperty('--mk-light-edge', '135%');
      picture.style.setProperty('--mk-light-strength', '0');
      picture.style.setProperty('--mk-wash-strength', '0');
    }
    clearDust();
    setPhase('after');
    pausedRef.current = false;
    setPaused(false);
    if (statusRef.current) statusRef.current.textContent = 'Открыто моё отражение сейчас';
    if (progressRef.current) progressRef.current.style.width = '100%';
  }, [clearDust]);

  const reveal = useCallback((manual = false) => {
    if (clockRef.current.phase !== 'before') return;
    manualRevealRef.current = manual;
    if (reducedRef.current) { finish(); return; }
    clockRef.current.phase = 'revealing';
    clockRef.current.revealing = 0;
    clockRef.current.last = 0;
    pausedRef.current = false;
    setPaused(false);
    setPhase('revealing');
    if (statusRef.current) statusRef.current.textContent = 'Свет открывает моё отражение…';
  }, [finish]);

  const reset = useCallback(() => {
    manualRevealRef.current = false;
    clockRef.current = { phase: 'before', waiting: 0, revealing: 0, last: 0 };
    pausedRef.current = false;
    setPaused(false);
    setPhase('before');
    const picture = pictureRef.current;
    if (picture) {
      picture.style.setProperty('--mk-light-edge', '-34%');
      picture.style.setProperty('--mk-light-beam', '-24%');
      picture.style.setProperty('--mk-light-strength', '0');
      picture.style.setProperty('--mk-wash-strength', '0');
      picture.style.setProperty('--mk-before-blur', '0px');
    }
    if (progressRef.current) progressRef.current.style.width = '0%';
    if (statusRef.current) statusRef.current.textContent = 'Моё фото тогда · переход через 5 секунд';
    clearDust();
  }, [clearDust]);

  const showBefore = useCallback(() => {
    reset();
    pausedRef.current = true;
    setPaused(true);
    if (statusRef.current) statusRef.current.textContent = 'Фото «Тогда» выбрано вручную';
  }, [reset]);

  const showAfter = useCallback(() => reveal(true), [reveal]);
  const replay = useCallback(() => {
    reset();
    reveal(true);
  }, [reset, reveal]);

  const togglePause = useCallback(() => {
    if (clockRef.current.phase === 'after') return;
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    clockRef.current.last = 0;
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    const picture = pictureRef.current;
    const canvas = canvasRef.current;
    if (!element || !picture || !canvas) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changeMotion = () => { reducedRef.current = media.matches; };
    changeMotion();
    media.addEventListener?.('change', changeMotion);

    const resize = () => {
      const context = canvas.getContext('2d');
      if (!context) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(picture);
    resize();

    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      clockRef.current.last = 0;
    }, { threshold: .45 }) : null;
    if (observer) observer.observe(picture);
    else visibleRef.current = true;

    const tick = (now) => {
      rafRef.current = requestAnimationFrame(tick);
      const clock = clockRef.current;
      const elapsed = clock.last ? Math.min(now - clock.last, 65) : 0;
      clock.last = now;
      // A direct click on «Сейчас» must work even while the pointer is over the photo.
      const hoverPauses = hoverRef.current && !(clock.phase === 'revealing' && manualRevealRef.current);
      if (!visibleRef.current || document.hidden || pausedRef.current || hoverPauses) return;
      if (clock.phase === 'before') {
        clock.waiting += elapsed;
        if (progressRef.current) progressRef.current.style.width = `${Math.round(clamp(clock.waiting / WAIT_MS) * 100)}%`;
        if (clock.waiting >= WAIT_MS) reveal();
      } else if (clock.phase === 'revealing') {
        clock.revealing += elapsed;
        if (clock.revealing >= REVEAL_MS) finish();
        else renderTransition(clock.revealing / REVEAL_MS);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      observer?.disconnect();
      resizeObserver?.disconnect();
      media.removeEventListener?.('change', changeMotion);
    };
  }, [finish, reveal, renderTransition]);

  const current = phase === 'after';
  const afterSelected = phase !== 'before';
  return (
    <section className="mk-story" id="my-story" aria-labelledby="mk-story-title" ref={rootRef}>
      <div className="mk-story__heading">
        <h2 id="mk-story-title">Однажды я увидела <em>другое отражение.</em></h2>
      </div>
      <div className="mk-story__inner">
        <div className="mk-story__copy">
          <p className="mk-story__lead">Я заметила, как меняется моё лицо. И вместо того, чтобы просто смириться с этим, мне захотелось разобраться — что происходит и как я могу себе помочь.</p>
          <p className="mk-story__body">Так начался мой путь к бережной работе с лицом, шеей и осанкой. Сегодня я делюсь тем, что узнала и продолжаю практиковать сама.</p>
        </div>

        <figure className="mk-story__visual">
          <div className="mk-story__frame">
            <button
              type="button"
              ref={pictureRef}
              className={`mk-story__picture mk-story__picture--${phase}`}
              onClick={current ? showBefore : showAfter}
              onPointerEnter={(event) => { if (event.pointerType === 'mouse') hoverRef.current = true; }}
              onPointerLeave={(event) => { if (event.pointerType === 'mouse') { hoverRef.current = false; clockRef.current.last = 0; } }}
              aria-label={current ? 'Сейчас: Марина у зеркала. Нажмите, чтобы вернуться к фотографии Тогда.' : 'Тогда: портрет Марины. Нажмите, чтобы открыть фото Сейчас.'}
            >
              <img className="mk-story__photo mk-story__photo--after" src="/images/marina-mirror-scene.jpg" width="853" height="1280" alt="" loading="lazy" />
              <img className="mk-story__photo mk-story__photo--before" src="/images/marina-face-before.jpg" width="481" height="869" alt="" loading="lazy" />
              <span className="mk-story__wash" aria-hidden="true" />
              <span className="mk-story__beam" aria-hidden="true" />
              <canvas className="mk-story__dust" ref={canvasRef} aria-hidden="true" />
              <span className="mk-story__scrim" aria-hidden="true" />
              <span className="mk-story__photo-label">{current ? 'Сейчас' : 'Тогда'}</span>
              <span className="mk-story__photo-caption"><small>МОЁ ОТРАЖЕНИЕ</small><span>{current ? 'И я увидела себя иначе.' : 'У каждой истории есть продолжение.'}</span><i className="mk-story__progress" aria-hidden="true"><i ref={progressRef} /></i></span>
            </button>
            <div className="mk-story__controls" role="group" aria-label="Выбрать фотографию">
              <div className="mk-story__switch" role="group" aria-label="Тогда или сейчас">
                <button
                  type="button"
                  className={afterSelected ? '' : 'is-active'}
                  onClick={showBefore}
                  aria-pressed={!afterSelected}
                >
                  Тогда
                </button>
                <button
                  type="button"
                  className={afterSelected ? 'is-active' : ''}
                  onClick={showAfter}
                  aria-pressed={afterSelected}
                  disabled={afterSelected}
                >
                  Сейчас
                </button>
              </div>
              <button
                type="button"
                className="mk-story__control-action"
                onClick={current ? replay : togglePause}
                aria-label={current ? 'Повторить световой переход' : paused ? 'Продолжить автоматический показ' : 'Остановить автоматический показ'}
              >
                <span aria-hidden="true">{current ? '↻' : paused ? '▶' : 'Ⅱ'}</span>
                {current ? 'Повторить' : paused ? 'Продолжить' : 'Пауза'}
              </button>
            </div>
          </div>
          <figcaption className="mk-story__meta">
            <span ref={statusRef} role="status" aria-live="polite">Моё фото тогда · переход через 5 секунд</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
