/**
 * js/core/dom.js — Lightweight DOM query and manipulation utilities
 * Depends on: None
 * Touches: Document and Element nodes
 */

/**
 * Query a single element
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element|null}
 */
export function qs(selector, scope = document) {
  return scope ? scope.querySelector(selector) : null;
}

/**
 * Query all matching elements as an Array
 * @param {string} selector
 * @param {ParentNode} [scope=document]
 * @returns {Element[]}
 */
export function qsa(selector, scope = document) {
  return scope ? Array.from(scope.querySelectorAll(selector)) : [];
}

/**
 * Attach an event listener with passive fallback support
 * @param {EventTarget} target
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {AddEventListenerOptions|boolean} [options={}]
 * @returns {() => void} Unsubscribe function
 */
export function on(target, event, handler, options = {}) {
  if (!target || !target.addEventListener) return () => {};
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}
