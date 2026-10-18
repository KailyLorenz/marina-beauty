"use client";
import {useRef, useState} from 'react';
import {siteConfig} from '../config/site';
import {useScrollReveal} from '../hooks/useScrollReveal';
import Header from '../components/layout/Header';
import SmoothScroll from '../components/ui/SmoothScroll';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import ConcernsSection from '../components/sections/ConcernsSection';
import FloatingConcerns from '../components/sections/FloatingConcerns';
import ReasonsSection from '../components/sections/ReasonsSection';
import EditorialQuote from '../components/sections/EditorialQuote';
import ApproachSection from '../components/sections/ApproachSection';
import ResultsSection from '../components/sections/ResultsSection';
import ProgramSection from '../components/sections/ProgramSection';
import AuthorSection from '../components/sections/AuthorSection';
import FormatSection from '../components/sections/FormatSection';
import PriceSection from '../components/sections/PriceSection';
import FaqSection from '../components/sections/FaqSection';
import FinalCtaSection from '../components/sections/FinalCtaSection';
import SiteDialog from '../components/ui/SiteDialog';

export default function Home() {
  const dialogRef = useRef(null);
  const [modal, setModal] = useState({title: '', text: ''});
  useScrollReveal();
  function openDialog(type){
    if(type==='payment' && siteConfig.checkoutUrl){window.open(siteConfig.checkoutUrl,'_blank','noopener,noreferrer');return;}
    const channels={MAX:['MAX',siteConfig.maxUrl],Telegram:['Telegram',siteConfig.telegramUrl],ВКонтакте:['ВКонтакте',siteConfig.vkUrl]};
    if(channels[type]?.[1]){window.open(channels[type][1],'_blank','noopener,noreferrer');return;}
    const data=type==='payment'
        ? {title:'Запись на интенсив',text:'Это демоверсия сайта. Перед публикацией подключите ссылку на оплату GetCourse в config/site.js. Стоимость на сайте не является ссылкой на оплату. Уточните действующую цену и добавьте ссылку GetCourse.'}
        : type==='contra'
            ? {title:'Противопоказания',text:siteConfig.contraindications||'Перед запуском сюда необходимо добавить полный согласованный с Мариной список противопоказаний. Без этого публиковать программу не рекомендуется.'}
            : {title:`Написать в ${type}`,text:`Добавьте ссылку на ${type} в config/site.js — после этого кнопка откроет чат.`};
    setModal(data);
    dialogRef.current?.showModal();
  }
  return <>
    <SmoothScroll />
    <Header />
    <main>
      <HeroSection />
      <div className="ribbon"><span>ЛИЦО</span><i>✳</i><span>ШЕЯ</span><i>✳</i><span>ОСАНКА</span><i>✳</i><span>ВНИМАНИЕ К СЕБЕ</span></div>
      <ConcernsSection />
      <div className="mc-float-shell"><FloatingConcerns /></div>
      <ReasonsSection />
      <EditorialQuote />
      <ApproachSection />
      <ResultsSection />
      <ProgramSection />
      <AuthorSection />
      <FormatSection />
      <PriceSection openDialog={openDialog} />
      <FaqSection openDialog={openDialog} />
      <FinalCtaSection openDialog={openDialog} />
    </main>
    <Footer openDialog={openDialog} />
    <SiteDialog dialogRef={dialogRef} modal={modal} />
  </>;
}
