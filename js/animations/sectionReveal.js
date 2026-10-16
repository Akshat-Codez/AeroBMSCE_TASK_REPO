/**
 * js/animations/sectionReveal.js — Batched scroll-triggered reveals for sections and blocks
 * Depends on: js/core/device.js, window.gsap, window.ScrollTrigger
 * Touches: .section-header, .sec-number, .sec-title, .body-block, .gallery-item
 */

import { prefersReducedMotion } from '../core/device.js';
import { qsa } from '../core/dom.js';

export function initSectionReveal() {
  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

  if (prefersReducedMotion || !hasGsap) {
    qsa('.sec-number, .sec-title, .body-block, .gallery-item').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
      if ('webkitClipPath' in el.style) el.style.webkitClipPath = 'none';
    });
    return;
  }

  const { gsap, ScrollTrigger } = window;

  // Section Headers
  qsa('.section-header').forEach(header => {
    const num = header.querySelector('.sec-number');
    const title = header.querySelector('.sec-title');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 90%',
        once: true,
      },
    });

    if (num) tl.to(num, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
    if (title) tl.to(title, { y: 0, opacity: 1, duration: 0.5, ease: 'expo.out' }, '-=0.4');
  });

  // Body Blocks
  ScrollTrigger.batch('.body-block', {
    start: 'top 92%',
    once: true,
    onEnter: batch => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    },
  });

  // Gallery items clip-path reveal
  ScrollTrigger.batch('.gallery-item', {
    start: 'top 92%',
    once: true,
    onEnter: batch => {
      gsap.to(batch, {
        clipPath: 'inset(0 0% 0 0)',
        webkitClipPath: 'inset(0 0% 0 0)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.inOut',
      });
      batch.forEach((item, i) => {
        const img = item.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1,
            duration: 1.0,
            delay: i * 0.1,
            ease: 'expo.out',
          });
        }
      });
    },
  });
}

export default initSectionReveal;
