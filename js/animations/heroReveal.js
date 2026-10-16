/**
 * js/animations/heroReveal.js — Typography reveals for the hero section
 * Depends on: js/core/device.js, window.gsap
 * Touches: #heroHeadline, #heroTag, #heroSub, #heroCta
 */

import { prefersReducedMotion } from '../core/device.js';

export function initHeroReveal() {
  const elements = ['#heroHeadline', '#heroTag', '#heroSub', '#heroCta'];
  const targets = elements.filter(sel => document.querySelector(sel));

  if (!targets.length) return;

  if (prefersReducedMotion || !window.gsap) {
    if (window.gsap) {
      window.gsap.set(targets, { y: 0, opacity: 1 });
    } else {
      targets.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }
    return;
  }

  const tl = window.gsap.timeline({ delay: 0.35 });
  tl.to('#heroHeadline', { y: 0, duration: 0.8, ease: 'expo.out' })
    .to('#heroTag', { y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.5')
    .to('#heroSub', { y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.45')
    .to('#heroCta', {
      y: 0,
      duration: 0.5,
      ease: 'expo.out',
      onComplete: () => {
        const mask = document.querySelector('#heroCta')?.closest('.hero-line-mask');
        if (mask) mask.style.overflow = 'visible';
      }
    }, '-=0.4');
}

export default initHeroReveal;
