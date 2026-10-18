import '../styles/theme.css';
import '../styles/globals.css';
import '../styles/experience.css';
import '../styles/concerns.css';
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY } from '../config/themes';
// import '../styles/program.css';

export const metadata = {
  title: 'Марина Карпер — 5 недель для лица, шеи и осанки',
  description: 'Пошаговая программа для лица, шеи и осанки: 5 недель практик с Мариной Карпер, видеоуроки и поддержка куратора.',
  robots: {index: false, follow: false}, // Демо: включить индексацию после согласования цен, текста и ссылок.
};

// Sets a saved theme before the page paints, preventing a flash of default colors.
// All theme IDs are local constants; no user input is interpolated as code.
const themeBoot = `(function(){try{var s=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(THEMES.map(t=>t.id))}.indexOf(s)!==-1){document.documentElement.setAttribute('data-theme',s);}}catch(e){}})();`;

export default function RootLayout({children}){
  return <html lang="ru" data-theme={DEFAULT_THEME} suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{__html:themeBoot}} /></head>
    <body>{children}</body>
  </html>;
}
