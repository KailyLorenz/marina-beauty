"use client";
import '../../styles/final-cta.css';

export default function FinalCtaSection({ openDialog }) {
  return (
    <section id="contact" className="mk-final mk-final--simple" aria-labelledby="mk-final-title">
      <div className="mk-final__inner">
        {/* Сразу после FAQ — короткий выбор канала для вопросов. */}
        <div className="mk-final__contacts" aria-label="Связаться с Мариной">
          <p>Остались вопросы? Напишите нам</p>
          <div className="mk-final__channels">
            <button type="button" onClick={() => openDialog?.('MAX')}>MAX ↗</button>
            <button type="button" onClick={() => openDialog?.('Telegram')}>Telegram ↗</button>
            <button type="button" onClick={() => openDialog?.('ВКонтакте')}>ВКонтакте ↗</button>
          </div>
        </div>
        {/* Финальная CTA-кнопка, без прежнего длинного приглашения. */}
        <div className="mk-final__copy">
          <h2 id="mk-final-title">Готовы <em>присоединиться?</em></h2>
          <a className="mk-final__cta" href="#price">Принять участие <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
