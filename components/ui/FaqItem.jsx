'use client';
import { useState } from 'react';
export function FaqItem({item,index,onContra}){
 const [open,setOpen]=useState(index===0);
 return <div className={`ed-faq__item${open?' is-open':''}`}>
   <h3><button className="ed-faq__trigger" type="button" aria-expanded={open} aria-controls={`ed-faq-answer-${index}`} id={`ed-faq-question-${index}`} onClick={()=>setOpen(v=>!v)}>
     <span>{item[0]}</span><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d={open?'M4 12l6-6 6 6':'M4 8l6 6 6-6'} stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
   </button></h3>
   <div className="ed-faq__answer" id={`ed-faq-answer-${index}`} role="region" aria-labelledby={`ed-faq-question-${index}`} hidden={!open}>
     <div onClick={event=>{if(event.target.closest('[data-dialog="contra"]'))onContra?.();}} dangerouslySetInnerHTML={{__html:item[1]}} />
   </div>
 </div>;
}
