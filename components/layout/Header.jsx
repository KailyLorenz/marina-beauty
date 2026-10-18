"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["Методика", "#approach"],
  ["Результаты", "#results"],
  ["Программа", "#program"],
  ["О Марине", "#author"],
  ["Стоимость", "#price"],
];

export default function ExperienceHeader() {
  const [compact, setCompact] = useState(false);
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateScroll = () => {
      frame = 0;
      const scrollY = window.scrollY;
      // The backdrop fades in gradually over the first 130px of scrolling.
      // At scrollY === 0 the header is completely transparent, with no blur.
      const progress = Math.min(Math.max(scrollY / 130, 0), 1);
      headerRef.current?.style.setProperty("--exp-scroll-progress", String(progress));
      setCompact(scrollY > 32);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    const previous = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
      <>
        <header ref={headerRef} className={`exp-header ${compact ? "exp-header--compact" : ""} ${menuOpen ? "exp-header--open" : ""}`}>
          <a className="exp-header__brand" href="#top" onClick={close} aria-label="Marina Karper — на главную">
            <span>Marina Karper</span>
          </a>

          <button
              type="button"
              className={`exp-header__menu-toggle ${menuOpen ? "is-active" : ""}`}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              aria-controls="exp-fullscreen-menu"
              onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="exp-header__menu-label">Меню</span>
            <span className="exp-header__menu-lines" aria-hidden="true"><i/><i/></span>
          </button>
        </header>

        <div className={`exp-menu ${menuOpen ? "exp-menu--open" : ""}`} id="exp-fullscreen-menu" aria-hidden={!menuOpen}>
          <div className="exp-menu__inner">
            <p className="exp-menu__eyebrow">НАВИГАЦИЯ</p>
            <nav aria-label="Разделы сайта" inert={!menuOpen}>
              {links.map(([name, href], index) => (
                  <a href={href} key={href} onClick={close} tabIndex={menuOpen ? 0 : -1}>
                    <small>{String(index + 1).padStart(2, "0")}</small>{name}
                  </a>
              ))}
            </nav>
          </div>
        </div>
      </>
  );
}
