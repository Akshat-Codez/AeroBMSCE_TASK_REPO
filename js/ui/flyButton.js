/**
 * js/ui/flyButton.js — Flight takeoff animation for .fly-btn interactive buttons
 * Plays the takeoff before scrolling to or opening the destination.
 */

import { smoothScrollTo } from '../core/scroll.js';
import { prefersReducedMotion } from '../core/device.js';

export function initFlyButtons() {
  const flyButtons = document.querySelectorAll('.fly-btn');
  if (!flyButtons.length) return;

  flyButtons.forEach((btn) => {
    const plane = btn.querySelector('.plane');
    if (!plane) return;
    const flightDuration = btn.id === 'heroCta' ? 1100 : 1000;

    btn.addEventListener('click', (e) => {
      // Prevent the anchor jump so the hero flight is visible before scrolling.
      if (btn.tagName === 'A') {
        e.preventDefault();
      }

      if (btn.classList.contains('flying')) return;

      btn.classList.add('flying');
      btn.setAttribute('aria-busy', 'true');
      if (btn.tagName === 'BUTTON') {
        btn.disabled = true;
      }

      const finishFlight = () => {
        // Navigate or smooth scroll only after the plane animation has finished.
        const target = btn.getAttribute('href') || btn.dataset.target || '#about';
        if (target && target.startsWith('#')) {
          smoothScrollTo(target);
        } else if (target) {
          window.location.href = target;
        }

        btn.classList.remove('flying');
        btn.removeAttribute('aria-busy');
        if (btn.tagName === 'BUTTON') {
          btn.disabled = false;
        }
      };

      // Reduced-motion users go directly to the destination; others see the full flight.
      if (prefersReducedMotion) finishFlight();
      else window.setTimeout(finishFlight, flightDuration);
    });
  });
}

export default initFlyButtons;
