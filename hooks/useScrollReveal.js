"use client";
import {useEffect} from 'react';
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const selector = '.section-head,.cause,.method,.program-intro,.program-card,.author-grid,.format-main,.format-item,.price-card,.price-intro,.faq-item,.final-cta,.editorial-quote';
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('revealed'); observer.unobserve(entry.target);}
    }), {threshold: 0.07, rootMargin:'0px 0px -30px 0px'});
    elements.forEach((element, index) => {
      if (element.getBoundingClientRect().top > innerHeight) {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 75}ms`);
        element.classList.add('reveal');
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);
}
