'use client';

import { siteConfig } from '../../config/site';
import SectionChip from '../ui/SectionChip';
import { useCountdown } from '../../hooks/useCountdown';
import { Countdown } from '../ui/Countdown';
import { rub } from '../../data/media';
import '../../styles/price.css';

const benefits = [
  '5 недель занятий по видеозаписям',
  'Обучающие эфиры Марины в записи',
  'Поддержка куратора и общий чат',
  'Доступ к материалам на 3 месяца',
];

export default function PriceSection({ openDialog }) {
  const countdown = useCountdown();
  const regularPrice = Number(siteConfig.regularPrice);
  const promoPrice = Number(siteConfig.promoPrice);
  const hasConfiguredOffer = Boolean(
    siteConfig.promoEndsAt &&
    Number.isFinite(regularPrice) &&
    Number.isFinite(promoPrice) &&
    regularPrice > promoPrice &&
    promoPrice > 0
  );

  // Before hydration the offer is rendered using static, deterministic values.
  // After hydration the clock decides whether the promotion is still valid.
  const offerActive = hasConfiguredOffer && (!countdown.ready || countdown.active);
  const actualPrice = offerActive ? promoPrice : regularPrice;
  const savings = regularPrice - promoPrice;
  const percent = Math.round((savings / regularPrice) * 100);

  return (
    <section className="mk-price" id="price" aria-labelledby="mk-price-heading">
      <div className="mk-price__heading">
        <SectionChip>Участие</SectionChip>
        <h2 id="mk-price-heading">Время <em>для себя.</em></h2>
      </div>
      <div className="mk-price__shell">
        <div className="mk-price__intro">
          <figure className="mk-price__portrait">
            <img
              src="/images/marina-author-natural.png"
              width="1365"
              height="2048"
              loading="lazy"
              decoding="async"
              alt="Марина в светлой студии"
            />
          </figure>
          <p className="mk-price__lead">
            Пять недель практики для лица, шеи и осанки — в удобном для вас ритме.
          </p>
          <div className="mk-price__rule" aria-hidden="true" />
          <p className="mk-price__aside">Начните с малого.<br />Уделите себе 15 минут в день.</p>
        </div>

        <div className="mk-price__card">
          <div className="mk-price__card-head">
            <span>УЧАСТИЕ В ИНТЕНСИВЕ</span>
            <span className="mk-price__edition">5 НЕДЕЛЬ</span>
          </div>

          <h3>Лицо. Шея. Осанка.</h3>
          <p className="mk-price__card-subtitle">Полная программа с уроками и поддержкой</p>

          <div className="mk-price__price-block">
            {offerActive && (
              <div className="mk-price__offer-label">
                <span className="mk-price__offer-dot" aria-hidden="true" />
                Специальная стоимость участия
              </div>
            )}

            {offerActive && (
              <div className="mk-price__old-price-row">
                <span className="mk-price__old-caption">Обычная цена</span>
                <del className="mk-price__old-price">{rub(regularPrice)} ₽</del>
              </div>
            )}

            <div className="mk-price__amount" aria-live="polite" suppressHydrationWarning>
              {rub(actualPrice)} <span>₽</span>
            </div>

            {offerActive && (
              <p className="mk-price__savings">Экономия {rub(savings)} ₽ <span>−{percent}%</span></p>
            )}
            {!offerActive && countdown.ready && hasConfiguredOffer && (
              <p className="mk-price__offer-ended">Срок специального предложения завершился.</p>
            )}
          </div>

          {offerActive && (
            <div className="mk-price__countdown" aria-live="off">
              <Countdown countdown={countdown} />
            </div>
          )}

          <div className="mk-price__includes-title">В программу входит</div>
          <ul className="mk-price__benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>

          <button className="mk-price__cta" type="button" onClick={() => openDialog?.('payment')}>
            <span>Принять участие</span><span aria-hidden="true">↗</span>
          </button>
          <p className="mk-price__footer">Онлайн-обучение на платформе GetCourse</p>
        </div>
      </div>
    </section>
  );
}
