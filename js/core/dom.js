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
 * Create an element with optional attributes and children
 * @param {string} tag
 * @param {Record<string, string|number|boolean>} [attrs={}]
 * @param  {...(string|Node)} children
 * @returns {HTMLElement}
 */
export function create(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className' || key === 'class') {
      el.className = String(value);
    } else if (key.startsWith('data-')) {
      el.setAttribute(key, String(value));
    } else if (key === 'html') {
      el.innerHTML = String(value);
    } else if (key === 'text') {
      el.textContent = String(value);
    } else {
      el.setAttribute(key, String(value));
    }
  }
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      el.appendChild(child);
    }
  }
  return el;
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
