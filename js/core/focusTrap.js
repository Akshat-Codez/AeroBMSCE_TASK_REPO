/**
 * js/core/focusTrap.js — Keyboard focus trap for modal overlays
 * Purpose: Trap tab/shift+tab focus within a container element while a modal is open.
 *          Restores focus to the element that was focused before the modal opened.
 * Dependencies: None
 * Used by: js/features/lightbox.js, js/features/commandPalette/paletteUI.js
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Creates a focus trap bound to a container element.
 * @param {HTMLElement} container
 * @returns {{ activate: () => void, deactivate: () => void }}
 */
export function createFocusTrap(container) {
  let previouslyFocused = null;
  let handleKeyDown = null;

  function activate() {
    previouslyFocused = document.activeElement;

    // Focus first focusable element inside container
    const first = container.querySelector(FOCUSABLE);
    if (first) first.focus();

    handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const focusable = [...container.querySelectorAll(FOCUSABLE)];
      if (focusable.length === 0) { e.preventDefault(); return; }

      const firstEl = focusable[0];
      const lastEl  = focusable[focusable.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: wrap from first to last
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        // Tab: wrap from last to first
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
  }

  function deactivate() {
    if (handleKeyDown) {
      container.removeEventListener('keydown', handleKeyDown);
      handleKeyDown = null;
    }
    // Restore focus to previously focused element
    if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
      previouslyFocused.focus();
    }
    previouslyFocused = null;
  }

  return { activate, deactivate };
}
