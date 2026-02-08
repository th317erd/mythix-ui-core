// Global setup that runs before any specs are loaded
// This sets up the minimal browser environment needed for module loading

import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);

globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.Node = dom.window.Node;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Element = dom.window.Element;
globalThis.DocumentFragment = dom.window.DocumentFragment;
globalThis.Event = dom.window.Event;
globalThis.CustomEvent = dom.window.CustomEvent;
globalThis.MutationObserver = dom.window.MutationObserver;
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.customElements = {
  define: () => {},
  get: () => undefined,
  whenDefined: () => Promise.resolve(),
};
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
