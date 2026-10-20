'use client';
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { weeks } from '../../data/content';
import '../../styles/program.css';

const images = [
  '/images/marina-approach-01.webp',
  '/images/marina-approach-02.webp',
  '/images/marina-approach-03.webp',
  '/images/marina-approach-04.webp',
  '/images/course-08.webp',
];

export default function ProgramSection() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const reduced = useReducedMotion();
  const total = weeks.length;
  function onKeyDown(event, index) {
    if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? total - 1 :
      (index + (['ArrowRight','ArrowDown'].includes(event.key) ? 1 : -1) + total) % total;
    setActive(next);
    refs.current[next]?.focus();
  }
  return (
    <section className="ed-program" id="program" aria-labelledby="ed-program-title">
      <div className="ed-program__wrap">
        <div className="ed-program__heading">
          <p className="ed-kicker">05 / ПРОГРАММА</p>
          <h2 id="ed-program-title">Пять недель <em>для себя</em></h2>
          <p>От знакомства с приёмами до самостоятельной практики. Выбирайте неделю и узнавайте, чему она посвящена.</p>
        </div>
        <div className="ed-program__layout">
          <div className="ed-program__tabs" role="tablist" aria-label="Программа интенсива по неделям" aria-orientation="vertical">
            {weeks.map(([name],index)=>(
              <button key={name} ref={node=>{refs.current[index]=node;}}
                className={`ed-program__tab${index===active?' is-selected':''}`}
                type="button" role="tab" aria-selected={index===active}
                aria-controls="ed-program-panel" id={`ed-program-tab-${index}`}
                tabIndex={index===active?0:-1}
                onClick={()=>setActive(index)} onKeyDown={event=>onKeyDown(event,index)}>
                <span className="ed-program__tab-index">{String(index+1).padStart(2,'0')}</span>
                <span>{name}</span>
                <span className="ed-program__tab-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="ed-program__panel" role="tabpanel" id="ed-program-panel" aria-labelledby={`ed-program-tab-${active}`} tabIndex={0}>
            <div className="ed-program__image-frame">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img key={active} src={images[active]} alt={`Практика и материалы курса — неделя ${active+1}`}
                  width="1280" height="850" loading="lazy"
                  initial={reduced?false:{opacity:0,scale:1.035}} animate={{opacity:1,scale:1}}
                  exit={reduced?undefined:{opacity:0}} transition={{duration:reduced?0:.45}}/>
              </AnimatePresence>
              <span className="ed-program__image-tag">НЕДЕЛЯ {String(active+1).padStart(2,'0')} / 05</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} className="ed-program__details"
                initial={reduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}}
                exit={reduced?undefined:{opacity:0,y:-6}} transition={{duration:reduced?0:.3}}>
                <div>
                  <h3>{weeks[active][0]}</h3>
                  <p>{weeks[active][1]}</p>
                </div>
                <a href="#price" className="ed-program__link">Участвовать <span aria-hidden="true">↗</span></a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
