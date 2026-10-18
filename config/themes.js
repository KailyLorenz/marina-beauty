/**
 * Theme registry for the client-facing palette picker.
 *
 * To add a palette:
 * 1. Add its CSS tokens to styles/theme.css under html[data-theme="your-id"].
 * 2. Add an object below with the SAME id. The preview will appear automatically.
 *
 * To change which palette a new visitor sees, change DEFAULT_THEME only.
 */
export const DEFAULT_THEME = 'ice';

export const THEMES = [
  { id: 'ice', label: 'Ледяная бирюза', description: 'Свежая, контрастная', swatches: ['#f7f8f7', '#34393c', '#237985'] },
  { id: 'graphite', label: 'Жемчужный графит', description: 'Сдержанная, строгая', swatches: ['#f8f8f9', '#333640', '#525f7b'] },
  { id: 'orchid', label: 'Ледяная орхидея', description: 'Мягкая, утончённая', swatches: ['#faf9fb', '#36323b', '#806888'] },
  // Cool beige + taupe; turquoise remains a single brand accent.
  { id: 'taupe', label: 'Cool Taupe Luxury', description: 'Холодный беж, эспрессо и немного бирюзы', swatches: ['#f7f5f5', '#393239', '#75676f'] },
];

export const THEME_STORAGE_KEY = 'marina-karper-theme';
