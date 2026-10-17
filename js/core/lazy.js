/**
 * js/core/lazy.js — Lazy module loader via IntersectionObserver
 * Depends on: js/core/logger.js
 * Touches: IntersectionObserver
 */

import { warn } from './logger.js';

/**
 * Dynamically import and initialize a module when a DOM element nears the viewport
 * @param {string} selector - CSS selector of trigger container
 * @param {() => Promise<{ default?: () => void, init?: () => void }>} importFn
 * @param {string} [rootMargin='300px']
 */
export function lazyInit(selector, importFn, rootMargin = '300px') {
  const target = document.querySelector(selector);

  if (!target) return;

  const loadModule = async () => {
    try {
      const module = await importFn();
      if (module) {
        if (typeof module.init === 'function') {
          module.init();
        } else if (typeof module.default === 'function') {
          module.default();
        }
      }
    } catch (err) {
      warn('LazyLoader', `Failed loading module for ${selector}:`, err);
    }
  };

  if (!('IntersectionObserver' in window)) {
    // Immediate fallback if IntersectionObserver unsupported
    loadModule();
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        obs.disconnect();
        loadModule();
      }
    });
  }, { rootMargin, threshold: 0.01 });

  observer.observe(target);
}
