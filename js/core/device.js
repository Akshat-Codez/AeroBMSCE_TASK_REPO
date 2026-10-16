/**
 * js/core/device.js - Accessibility profiling
 * Depends on: None
 * Touches: window.matchMedia
 *
 * Laptop-first: device detection and low-end branches removed in Prompt 5B.
 * Only prefers-reduced-motion is retained (accessibility requirement).
 */

export const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
