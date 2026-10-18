'use client';

import { siteConfig } from '../../config/site';
import { useCountdown } from '../../hooks/useCountdown';
import { Countdown } from '../ui/Countdown';
import { rub } from '../../data/media';
import '../../styles/price.css';

// Agreed selling price. Keep your checkout/payment settings aligned with this value.
const COURSE_PRICE = Number(siteConfig.promoPrice) || 12700;

const benefits = [
  '5 недель занятий по видеозаписям',
  'Обучающие эфиры Марины в записи',
  'Поддержка куратора и общий чат',
  'Доступ к материалам на 3 месяца',
];

export default function PriceSection({ openDialog }) {
  const countdown = useCountdown();
  const formerPrice = Number(siteConfig?.regularPrice);
  const hasRealDiscount = countdown.ready && countdown.active && Number.isFinite(formerPrice) && formerPrice > COURSE_PRICE;
  const savings = hasRealDiscount ? formerPrice - COURSE_PRICE : 0;
  const discountPercent = hasRealDiscount ? Math.round((savings / formerPrice) * 100) : 0;

  return (
    <section className="mk-price" id="price" aria-labelledby="mk-price-heading">
      <div className="mk-price__shell">
        <div className="mk-price__intro">
          <p className="mk-price__eyebrow">08 / ВРЕМЯ ДЛЯ СЕБЯ</p>
          <h2 id="mk-price-heading">Время <em>для себя.</em></h2>
          <p className="mk-price__lead">Пять недель практики для лица, шеи и осанки — в удобном для вас ритме.</p>
          <div className="mk-price__rule" aria-hidden="true" />
          <p className="mk-price__aside">Начните с малого.<br />Уделите себе 15 минут в день.</p>
          <span className="mk-price__signature" aria-hidden="true">Marina Carper</span>
        </div>

        <div className="mk-price__card">
          <div className="mk-price__card-head">
            <span>УЧАСТИЕ В ИНТЕНСИВЕ</span>
            <span className="mk-price__edition">5 НЕДЕЛЬ</span>
          </div>
          <h3>Лицо. Шея. Осанка.</h3>
          <p className="mk-price__card-subtitle">Полная программа с уроками и поддержкой</p>

          <div className="mk-price__price-block">
            {hasRealDiscount && (
              <span className="mk-price__old-price">{rub(formerPrice)} ₽</span>
            )}
            <div className="mk-price__amount">{rub(COURSE_PRICE)} <span>₽</span></div>
            {hasRealDiscount && (
              <p className="mk-price__savings">Экономия {rub(savings)} ₽ · −{discountPercent}%</p>
            )}
          </div>

          {hasRealDiscount && (
            <div className="mk-price__countdown"><Countdown countdown={countdown} /></div>
          )}

          <div className="mk-price__includes-title">В программу входит</div>
          <ul className="mk-price__benefits">
            {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>

          <button
            className="mk-price__cta"
            type="button"
            onClick={() => openDialog?.('payment')}
          >
            <span>Принять участие</span><span aria-hidden="true">↗</span>
          </button>
          <p className="mk-price__footer">Онлайн-обучение на платформе GetCourse</p>
        </div>
      </div>
    </section>
  );
}
