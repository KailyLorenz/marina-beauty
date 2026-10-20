'use client';
import { faqs } from '../../data/content';
import { FaqItem } from '../ui/FaqItem';
import '../../styles/faq.css';
export default function FaqSection({openDialog}){
 return <section className="ed-faq" id="faq" aria-labelledby="ed-faq-title">
  <div className="ed-faq__wrap">
   <div className="ed-faq__head"><p className="ed-kicker">09 / ВАЖНО ЗНАТЬ</p><h2 id="ed-faq-title">Остались <em>вопросы?</em></h2><p>Всё, что важно знать до начала интенсива.</p></div>
   <div className="ed-faq__list">{faqs.map((item,index)=><FaqItem key={`${index}-${item[0]}`} item={item} index={index} onContra={()=>openDialog?.('contra')}/>)}</div>
   <p className="ed-faq__bottom">Не нашли ответ? <a href="#contact">Свяжитесь с нами ↗</a></p>
  </div>
 </section>
}
