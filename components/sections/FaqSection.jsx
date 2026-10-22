'use client';
import { faqs } from '../../data/content';
import SectionChip from '../ui/SectionChip';
import { FaqItem } from '../ui/FaqItem';
import '../../styles/faq.css';
export default function FaqSection({openDialog}){
 return <section className="ed-faq" id="faq" aria-labelledby="ed-faq-title">
  <div className="ed-faq__wrap">
   <div className="ed-faq__head"><SectionChip>Вопросы</SectionChip><h2 id="ed-faq-title">Остались <em>вопросы?</em></h2><p>Всё, что важно знать до начала интенсива.</p></div>
   <div className="ed-faq__list">{faqs.map((item,index)=><FaqItem key={`${index}-${item[0]}`} item={item} index={index} onContra={()=>openDialog?.('contra')}/>)}</div>

  </div>
 </section>
}
