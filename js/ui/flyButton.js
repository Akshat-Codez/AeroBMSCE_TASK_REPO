/**
 * js/ui/flyButton.js — Flight takeoff animation for .fly-btn interactive buttons
 * Triggers the diagonal takeoff flight trajectory and smoothly scrolls to destination upon exit
 */

import { smoothScrollTo } from '../core/scroll.js';
import { prefersReducedMotion } from '../core/device.js';

export function initFlyButtons() {
  const flyButtons = document.querySelectorAll('.fly-btn');
  if (!flyButtons.length) return;

  flyButtons.forEach((btn) => {
    const plane = btn.querySelector('.plane');
    if (!plane) return;

    btn.addEventListener('click', (e) => {
      // If clicking an anchor link, prevent instant jump to allow the takeoff animation to play
      if (btn.tagName === 'A') {
        e.preventDefault();
      }

      if (btn.classList.contains('flying')) return;

      btn.classList.add('flying');
      btn.setAttribute('aria-busy', 'true');
      if (btn.tagName === 'BUTTON') {
        btn.disabled = true;
      }

      const onFlightEnd = () => {
        plane.removeEventListener('animationend', onFlightEnd);
        btn.classList.remove('flying');
        btn.removeAttribute('aria-busy');
        if (btn.tagName === 'BUTTON') {
          btn.disabled = false;
        }

        // Navigate or smooth scroll to target
        const target = btn.getAttribute('href') || btn.dataset.target || '#about';
        if (target && target.startsWith('#')) {
          smoothScrollTo(target);
        } else if (target) {
          window.location.href = target;
        }
      };

      if (prefersReducedMotion) {
        onFlightEnd();
      } else {
        plane.addEventListener('animationend', onFlightEnd, { once: true });
      }
    });
  });
}

export default initFlyButtons;
