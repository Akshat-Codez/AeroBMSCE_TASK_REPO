/**
 * js/animations/counters.js — Scroll-triggered incremental counter animations
 * Depends on: js/core/device.js, window.gsap, window.ScrollTrigger
 * Touches: .stat-item, .counter, data-target
 */

import { prefersReducedMotion } from '../core/device.js';
import { qsa } from '../core/dom.js';

export function initCounters() {
  const statItems = qsa('.stat-item');
  if (!statItems.length) return;

  const hasGsap = Boolean(window.gsap && window.ScrollTrigger);

  if (prefersReducedMotion || !hasGsap) {
    statItems.forEach(item => {
      item.style.opacity = '1';
      item.style.transform = 'none';
      const c = item.querySelector('.counter');
      if (c && c.dataset.target) {
        c.textContent = c.dataset.target;
      }
    });
    return;
  }

  const { gsap, ScrollTrigger } = window;

  ScrollTrigger.batch('.stat-item', {
    start: 'top 90%',
    once: true,
    onEnter: batch => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });

      batch.forEach((item, i) => {
        const counter = item.querySelector('.counter');
        if (!counter || !counter.dataset.target) return;
        const target = parseInt(counter.dataset.target, 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay: i * 0.08 + 0.15,
          ease: 'expo.out',
          onUpdate: () => {
            counter.textContent = Math.round(obj.val);
          },
          onComplete: () => {
            counter.textContent = target;
          },
        });
      });
    },
  });
}

export default initCounters;
