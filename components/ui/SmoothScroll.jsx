'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Smooth wheel scrolling across the site. Native scrolling stays untouched
 * on touchscreens and for visitors who prefer reduced motion.
 * Dialogs and separately scrollable UI remain independent of page scrolling.
 *
 * To make the effect stronger/weaker, adjust lerp (0.08 slower, 0.15 faster).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis;

    const syncPreference = () => {
      if (media.matches) {
        lenis?.destroy();
        lenis = undefined;
        return;
      }
      if (lenis) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.095,
        smoothWheel: true,
        syncTouch: false, // Keep natural touch scrolling on phones.
        anchors: { offset: -76 }, // Keep section titles below fixed navigation.
        prevent: (node) => Boolean(node.closest('dialog, [data-lenis-prevent]')),
      });
    };

    syncPreference();
    if (media.addEventListener) media.addEventListener('change', syncPreference);
    else media.addListener(syncPreference);

    return () => {
      if (media.removeEventListener) media.removeEventListener('change', syncPreference);
      else media.removeListener(syncPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
