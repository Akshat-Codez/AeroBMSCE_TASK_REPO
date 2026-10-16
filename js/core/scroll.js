/**
 * js/core/scroll.js — Lenis smooth scroll and ScrollTrigger synchronization
 * Depends on: js/core/device.js, js/config.js (NAVBAR_HEIGHT)
 * Touches: window.Lenis, window.gsap, window.ScrollTrigger, history.scrollRestoration
 */

import { prefersReducedMotion } from './device.js';
import { NAVBAR_HEIGHT } from '../config.js';
import { log, warn } from './logger.js';

let lenisInstance = null;

/**
 * Get active Lenis instance or null
 * @returns {any}
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Initialize smooth scroll engine
 */
export function initScrollEngine() {
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Register ScrollTrigger with GSAP if available
  if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
    try {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.clearScrollMemory('manual');
    } catch (e) {
      warn('ScrollEngine', 'ScrollTrigger registration issue:', e);
    }
  }

  // Lenis for all devices unless user prefers reduced motion
  if (!prefersReducedMotion && window.Lenis) {
    try {
      lenisInstance = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        syncTouch: false,
        touchMultiplier: 1.0,
      });

      if (window.ScrollTrigger) {
        lenisInstance.on('scroll', window.ScrollTrigger.update);
      }

      if (window.gsap && window.gsap.ticker) {
        window.gsap.ticker.add((time) => {
          if (lenisInstance) {
            lenisInstance.raf(time * 1000);
          }
        });
        window.gsap.ticker.lagSmoothing(0);
      }
      log('ScrollEngine', 'Lenis initialized.');
    } catch (e) {
      warn('ScrollEngine', 'Lenis initialization failed, falling back to native scroll:', e);
      lenisInstance = null;
    }
  } else {
    log('ScrollEngine', 'Native scrolling active (prefers-reduced-motion).');
  }

  // Handle resize and bfcache refresh
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      refreshScroll();
    }, 200);
  }, { passive: true });

  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      refreshScroll();
    }
  });
}

/**
 * Refresh ScrollTrigger safely
 */
export function refreshScroll() {
  if (typeof window !== 'undefined' && window.ScrollTrigger) {
    try {
      window.ScrollTrigger.refresh();
    } catch (e) {
      warn('ScrollEngine', 'Refresh error:', e);
    }
  }
}

/**
 * Smoothly scroll to a selector, element, or pixel offset
 * @param {string|HTMLElement|number} target
 */
export function smoothScrollTo(target) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: -NAVBAR_HEIGHT, duration: 1.2 });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
      return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
