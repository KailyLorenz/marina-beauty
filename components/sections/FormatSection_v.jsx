'use client';
import { motion, useReducedMotion } from 'motion/react';
import { formats } from '../../data/content';
import '../../styles/format.css';
const details = [
  {num:'01',title:formats[0][0],detail:formats[0][1]},
  {num:'02',title:formats[1][0],detail:formats[1][1]},
  {num:'03',title:formats[2][0],detail:formats[2][1]},
  {num:'04',title:formats[3][0],detail:'Вопросы можно задать в общем чате во время интенсива.'},
];
export default function FormatSection(){
 const reduce=useReducedMotion();
 return <section className="ed-format" id="format" aria-labelledby="ed-format-title">
   <div className="ed-format__wrap">
     <div className="ed-format__head">
       <p className="ed-kicker">07 / КАК ПРОХОДИТ ОБУЧЕНИЕ</p>
       <h2 id="ed-format-title">Практика в <em>вашем ритме.</em></h2>
       <p>Около 15 минут в день — понятные занятия без спешки и сложного расписания.</p>
     </div>
     <div className="ed-format__grid">
       <motion.figure className="ed-format__visual" initial={reduce?false:{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.17}} transition={{duration:.65}}>
         <img src="/images/marina-format.jpg" alt="Марина Карпер — автор программы" width="853" height="1280" loading="lazy" />
         <figcaption>Удобно. Последовательно. С поддержкой.</figcaption>
       </motion.figure>
       <div className="ed-format__cards">
         {details.map((d,i)=><motion.article key={d.num} className="ed-format__card" initial={reduce?false:{opacity:0,y:19}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.52,delay:i*.07}}>
           <span>{d.num} / 04</span><h3>{d.title}</h3><p>{d.detail}</p>
         </motion.article>)}
       </div>
     </div>
     <div className="ed-format__facts" aria-label="Факты об интенсиве">
       <span><strong>5</strong> недель</span><span><strong>6</strong> занятий в неделю</span><span><strong>≈15</strong> минут в день</span><span><strong>3</strong> месяца доступа</span>
     </div>
     <p className="ed-format__platform">Материалы доступны на GetCourse · Дополнительные занятия — по желанию</p>
   </div>
 </section>
}
