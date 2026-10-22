"use client";
import { useState } from 'react';
import SectionChip from '../ui/SectionChip';
import { weeks } from '../../data/content';
import '../../styles/program.css';

// Старый дизайн оставлен в ProgramSection.legacy.jsx и НЕ подключён к странице.
// Один аккордеон вместо прежних табов с большой фотографией.
export default function ProgramSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="ed-program ed-program--accordion" id="program" aria-labelledby="ed-program-title">
      <div className="ed-program__wrap">
        <div className="ed-program__heading">
          <SectionChip>Программа</SectionChip>
          <h2 id="ed-program-title">Программа <em>интенсива</em></h2>
        </div>
        <div className="mk-weeks">
          {weeks.map(([title,description], i) => (
            <div className={`mk-weeks__item${open === i ? ' is-open' : ''}`} key={title}>
              <h3 className="mk-weeks__question">
                <button type="button" aria-expanded={open===i} aria-controls={`week-panel-${i}`}
                  onClick={() => setOpen(open===i ? -1 : i)}>
                  <span>Неделя {i+1}. <strong>{title}</strong></span>
                  <span className="mk-weeks__symbol" aria-hidden="true">{open===i ? '−' : '+'}</span>
                </button>
              </h3>
              <div className="mk-weeks__answer" id={`week-panel-${i}`} role="region" aria-label={`Неделя ${i+1}`} hidden={open!==i}>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
