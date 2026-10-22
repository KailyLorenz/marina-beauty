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

        </div>

        <div className="mk-price__card">
          <h2 className="mk-price__product-title" id="mk-price-heading">5-недельный интенсив <em>«Носогубные складки»</em></h2>
          <div className="mk-price__price-block">
            {offerActive && (
              <div className="mk-price__offer-label">
                <span className="mk-price__offer-dot" aria-hidden="true" />
                Специальная стоимость действует до 1 ноября 2026
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

          <button className="mk-price__cta" type="button" onClick={() => openDialog?.('payment')}>
            <span>Принять участие</span><span aria-hidden="true">↗</span>
          </button>
          <p className="mk-price__footer">Доступ к программе — 3 месяца · Обучение на GetCourse</p>
        </div>
      </div>
    </section>
  );
}
