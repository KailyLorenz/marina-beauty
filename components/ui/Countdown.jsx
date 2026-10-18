import { num } from '../../data/media';

export function Countdown({countdown}) {
  if(!countdown.ready) return <div className="offer-ended">Проверяем актуальную стоимость…</div>;
  if(!countdown.active) return <div className="offer-ended">Предложение по специальной цене завершилось</div>;
  return <div className="countdown" aria-label="До окончания предложения">
    <div className="countdown-top"><span className="countdown-pulse"/> До окончания специального предложения</div>
    <div className="countdown-units">
      {['дней','часов','минут','секунд'].map((label,i)=><div className="countdown-unit" key={label}>
        <strong suppressHydrationWarning>{countdown.ready?num(countdown.parts[i]):'—'}</strong>
        <span>{label}</span>
      </div>)}
    </div>
  </div>;
}
