
/**
 * Marina Karper — Premium Theme Registry
 * Только светлые темы.
 *
 * Для каждой темы должны существовать
 * соответствующие CSS-переменные в styles/theme.css.
 */

export const DEFAULT_THEME = 'ice';

export const THEMES = [
  {
    id: 'ice',
    label: 'Ледяная бирюза',
    description: 'Свежая, контрастная',
    swatches: ['#f7f8f7', '#34393c', '#237985'],
  },
  {
    id: 'graphite',
    label: 'Жемчужный графит',
    description: 'Сдержанная, строгая',
    swatches: ['#f8f8f9', '#333640', '#525f7b'],
  },
  {
    id: 'orchid',
    label: 'Ледяная орхидея',
    description: 'Мягкая, утончённая',
    swatches: ['#faf9fb', '#36323b', '#806888'],
  },
  {
    id: 'taupe',
    label: 'Cool Taupe Luxury',
    description: 'Холодный беж, эспрессо и мягкий taupe',
    swatches: ['#f7f5f5', '#393239', '#75676f'],
  },
  {
    id: 'sea-glass',
    label: 'Sea Glass Atelier',
    description: 'Жемчужный морской туман и бирюза',
    swatches: ['#f2f9f8', '#263d3e', '#2d898d'],
  },
  {
    id: 'azure',
    label: 'Azure Pearl',
    description: 'Холодный голубой и ледяной жемчуг',
    swatches: ['#f3f8fc', '#263b4b', '#328eb5'],
  },
  {
    id: 'cocoa-silk',
    label: 'Cocoa Silk',
    description: 'Кремовый шёлк и холодный шоколад',
    swatches: ['#f8f4f0', '#352a28', '#896b5d'],
  },
  {
    id: 'rosewood',
    label: 'Rosewood Atelier',
    description: 'Жемчужный беж и благородный бордо',
    swatches: ['#f9f4f3', '#403039', '#864d5b'],
  },
];

export const THEME_STORAGE_KEY = 'marina-karper-theme';
