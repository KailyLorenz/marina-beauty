"use client";

import ThemeSwitcher from "../ui/ThemeSwitcher";
import "../../styles/footer.css";

const nav = [
  ["Методика", "#approach"],
  ["Результаты", "#results"],
  ["Программа", "#program"],
  ["О Марине", "#author"],
  ["Стоимость", "#price"],
  ["Вопросы", "#faq"],
];

export default function Footer({ openDialog }) {
  return (
    <footer className="ed-footer">
      <div className="ed-footer__wrap">
        <div className="ed-footer__grid">
          <div className="ed-footer__identity ed-footer__identity--symbol">
            <a
              href="#top"
              className="ed-footer__brand ed-footer__brand--symbol"
              aria-label="Марина Карпер — вернуться наверх"
            >
              <img
                className="ed-footer__brand-image"
                src="/images/marina-facial-symbol.png"
                alt=""
                aria-hidden="true"
                width="560"
                height="539"
                loading="lazy"
              />
            </a>
            <p>Естественная красота — через внимание к себе, лицу и осанке.</p>
          </div>

          <div>
            <h3>Навигация</h3>
            <nav aria-label="Навигация футера">
              {nav.map(([label, href]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </nav>
          </div>

          <div>
            <h3>Связаться</h3>
            <button type="button" onClick={() => openDialog?.("MAX")}>MAX ↗</button>
            <button type="button" onClick={() => openDialog?.("Telegram")}>Telegram ↗</button>
            <button type="button" onClick={() => openDialog?.("ВКонтакте")}>ВКонтакте ↗</button>
          </div>

          <div>
            <h3>Информация</h3>
            <button type="button" onClick={() => openDialog?.("contra")}>Противопоказания ↗</button>
            <a href="#price">Условия участия</a>
            <a href="#top">Наверх ↑</a>
          </div>
        </div>

        <ThemeSwitcher />

        <div className="ed-footer__bottom">
          <span>© Марина Карпер · 2026</span>
          <span>Создано с заботой и вниманием к деталям</span>
        </div>
      </div>
    </footer>
  );
}
