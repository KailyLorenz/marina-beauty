'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY } from '../../config/themes';
import '../../styles/theme-switcher.css';

/**
 * Tiny client-side preview tool for Marina and the designer.
 * The whole site changes instantly via <html data-theme="...">.
 * The visitor's choice is stored in localStorage; no backend required.
 */
export default function ThemeSwitcher() {
  const [selected, setSelected] = useState(DEFAULT_THEME);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      const valid = THEMES.some((theme) => theme.id === saved);
      const themeId = valid ? saved : DEFAULT_THEME;
      document.documentElement.dataset.theme = themeId;
      setSelected(themeId);
    } catch {
      document.documentElement.dataset.theme = DEFAULT_THEME;
    }
  }, []);

  function chooseTheme(id) {
    if (!THEMES.some((theme) => theme.id === id)) return;
    document.documentElement.dataset.theme = id;
    setSelected(id);
    try { window.localStorage.setItem(THEME_STORAGE_KEY, id); } catch { /* Optional persistence. */ }
  }

  return (
    <div className="mk-theme-switcher" aria-label="Выберите оформление сайта">
      <div className="mk-theme-switcher__heading">
        <span>ЦВЕТОВАЯ ТЕМА</span>
        <p>Выберите вариант оформления</p>
      </div>
      <div className="mk-theme-switcher__options" role="group" aria-label="Цветовые темы">
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className={`mk-theme-switcher__option${selected === theme.id ? ' is-selected' : ''}`}
            aria-pressed={selected === theme.id}
            onClick={() => chooseTheme(theme.id)}
            title={theme.description}
          >
            <span className="mk-theme-switcher__swatches" aria-hidden="true">
              {theme.swatches.map((color, i) => <span key={i} style={{ backgroundColor: color }} />)}
            </span>
            <span className="mk-theme-switcher__name">{theme.label}</span>
            <span className="mk-theme-switcher__indicator" aria-hidden="true">{selected === theme.id ? '✓' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
