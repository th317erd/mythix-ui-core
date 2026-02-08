/**
 * TypeScript definitions for mythix-ui-core
 */

// ============================================================================
// Base Utilities
// ============================================================================

export namespace BaseUtils {
  /**
   * Check if a value is null, undefined, or empty string.
   */
  export function isNOE(value: any): boolean;

  /**
   * Convert a string to camelCase.
   */
  export function toCamelCase(str: string): string;

  /**
   * Convert a string to kebab-case.
   */
  export function toKebabCase(str: string): string;

  /**
   * Check if a value is of a specific type.
   */
  export function isType(value: any, typeString: string): boolean;

  /**
   * Coerce a string value to its appropriate type.
   */
  export function coerce(value: string): any;

  /**
   * Generate a SHA256 hash of a string.
   */
  export function SHA256(str: string): string;
}

// ============================================================================
// Utils
// ============================================================================

export namespace Utils {
  /**
   * Create a scope object for template evaluation.
   */
  export function createScope(...sources: object[]): object;

  /**
   * Get a value at a path in an object.
   */
  export function fetchPath(obj: object, path: string): any;

  /**
   * Set a value at a path in an object.
   */
  export function setPath(obj: object, path: string, value: any): void;

  /**
   * Global store for reactive data.
   */
  export const globalStore: Record<string, any>;

  /**
   * Global store with DynamicProperty values.
   */
  export const globalStoreDynamic: Record<string, DynamicProperty<any>>;

  /**
   * Check if a value is a template string.
   */
  export function isTemplate(value: string): boolean;

  /**
   * Format a node value using template syntax.
   */
  export function formatNodeValue(node: Node, options?: { scope?: object; disallowHTML?: boolean }): string;

  /**
   * Store/retrieve metadata on an element.
   */
  export function metadata<T>(element: Element, key: symbol, value?: T): T | undefined;
}

// ============================================================================
// DynamicProperty
// ============================================================================

/**
 * A reactive property that extends EventTarget.
 * Dispatches 'update' events when the value changes.
 */
export class DynamicProperty<T = any> extends EventTarget {
  /**
   * Symbol for getting the raw value.
   */
  static get: unique symbol;

  /**
   * Symbol for setting the value.
   */
  static set: unique symbol;

  /**
   * Symbol for accessing the raw value.
   */
  static value: unique symbol;

  constructor(initialValue?: T);

  /**
   * Get the underlying raw value.
   */
  valueOf(): T;

  /**
   * Convert the value to a string.
   */
  toString(): string;

  /**
   * Add an event listener for value changes.
   */
  addEventListener(
    type: 'update',
    handler: (event: DynamicPropertyUpdateEvent<T>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * Remove an event listener.
   */
  removeEventListener(
    type: 'update',
    handler: (event: DynamicPropertyUpdateEvent<T>) => void,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    handler: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

/**
 * Event dispatched when a DynamicProperty value changes.
 */
export interface DynamicPropertyUpdateEvent<T = any> extends CustomEvent {
  detail: {
    oldValue: T;
    newValue: T;
    target: DynamicProperty<T>;
  };
}

// ============================================================================
// Errors
// ============================================================================

export namespace Errors {
  /**
   * Base error class for Mythix UI errors.
   */
  export class MythixError extends Error {
    context: Record<string, any>;
    constructor(message: string, context?: Record<string, any>);
  }

  /**
   * Error thrown during template parsing or compilation.
   */
  export class TemplateError extends MythixError {
    expression: string | null;
    scopeVariables: string[];
    position: { start: number; end: number } | null;
    constructor(message: string, context?: {
      expression?: string;
      scopeVariables?: string[];
      position?: { start: number; end: number };
      suggestion?: string;
    });
  }

  /**
   * Error thrown during component lifecycle operations.
   */
  export class ComponentError extends MythixError {
    tagName: string;
    phase: string | null;
    outerHTML: string | null;
    constructor(message: string, context?: {
      tagName?: string;
      phase?: string;
      outerHTML?: string;
      suggestion?: string;
    });
  }

  /**
   * Error thrown when accessing or modifying DynamicProperty values incorrectly.
   */
  export class DynamicPropertyError extends MythixError {
    propertyPath: string | null;
    currentValue: any;
    attemptedValue: any;
    constructor(message: string, context?: {
      propertyPath?: string;
      currentValue?: any;
      attemptedValue?: any;
      suggestion?: string;
    });
  }

  /**
   * Check if debug mode is enabled.
   */
  export function isDebugMode(): boolean;

  /**
   * Log a debug message (only when MYTHIX_DEBUG is enabled).
   */
  export function debugLog(message: string, data?: any): void;

  /**
   * Log a warning message (only when MYTHIX_DEBUG is enabled).
   */
  export function debugWarn(message: string, data?: any): void;

  /**
   * Create a context object for component error reporting.
   */
  export function formatComponentContext(component: HTMLElement, phase: string): {
    tagName: string;
    phase: string;
    outerHTML: string;
  };

  /**
   * Extract available variable names from a scope object.
   */
  export function formatScopeVariables(scope: object): string[];
}

// ============================================================================
// StyleSheetManager
// ============================================================================

export namespace StyleSheetManager {
  /**
   * Check if Constructable Stylesheets are supported.
   */
  export function isSupported(): boolean;

  /**
   * Register a stylesheet by name for later adoption.
   */
  export function register(
    name: string,
    cssText: string,
    options?: { replace?: boolean }
  ): CSSStyleSheet | null;

  /**
   * Get a registered stylesheet by name.
   */
  export function get(name: string): CSSStyleSheet | undefined;

  /**
   * Check if a stylesheet is registered.
   */
  export function has(name: string): boolean;

  /**
   * Unregister a stylesheet by name.
   */
  export function unregister(name: string): boolean;

  /**
   * Adopt registered stylesheets into a shadow root or document.
   */
  export function adopt(
    target: ShadowRoot | Document,
    names: string[],
    options?: {
      prepend?: boolean;
      fallbackStyles?: Record<string, string>;
    }
  ): boolean;

  /**
   * Create a CSSStyleSheet from CSS text without registering it.
   */
  export function createFromText(cssText: string): CSSStyleSheet | null;

  /**
   * Create and immediately adopt a stylesheet from CSS text.
   */
  export function adoptFromText(
    target: ShadowRoot | Document,
    cssText: string,
    options?: { prepend?: boolean }
  ): CSSStyleSheet | HTMLStyleElement | null;

  /**
   * Clear all registered stylesheets.
   */
  export function clear(): void;

  /**
   * Get the names of all registered stylesheets.
   */
  export function getRegisteredNames(): string[];
}

// ============================================================================
// ComponentUtils
// ============================================================================

export namespace ComponentUtils {
  /**
   * Resolve a URL relative to a base location.
   */
  export function resolveURL(rootLocation: URL | string, urlish: string | URL): URL | undefined;

  /**
   * Load a resource from a URL with caching support.
   */
  export function require(
    urlOrName: string | URL,
    options?: {
      magic?: boolean;
      ownerDocument?: Document;
      fetchOptions?: RequestInit;
    }
  ): Promise<{
    url: URL;
    response: Response;
    ownerDocument: Document;
    cached: boolean;
  }>;

  /**
   * Load HTML content into an element.
   */
  export function loadPartialIntoElement(
    this: HTMLElement,
    src: string,
    options?: { scope?: object }
  ): Promise<void>;

  /**
   * Create an IntersectionObserver for visibility detection.
   */
  export function visibilityObserver(
    callback: (data: {
      wasVisible: boolean;
      ratioVisible: number;
      visibility: boolean;
      previousVisibility: boolean;
      entry: IntersectionObserverEntry;
      element: Element;
      index: number;
      disconnect: () => void;
    }) => void,
    options?: IntersectionObserverInit & { elements?: Element[] }
  ): IntersectionObserver;

  /**
   * Get the largest tabindex in a document.
   */
  export function getLargestDocumentTabIndex(ownerDocument?: Document): number;

  /**
   * Insert a script element into the document head.
   */
  export function insertScriptIntoHead(
    url: string | URL,
    options?: {
      attributes?: Record<string, string>;
      ownerDocument?: Document;
    }
  ): HTMLScriptElement;
}

// ============================================================================
// MythixUIComponent
// ============================================================================

/**
 * Options for createShadowDOM.
 */
export interface ShadowDOMOptions extends ShadowRootInit {
  mode?: 'open' | 'closed';
}

/**
 * Base class for all Mythix UI components.
 */
export class MythixUIComponent extends HTMLElement {
  /**
   * Symbol to identify Mythix components.
   */
  static isMythixComponent: unique symbol;

  /**
   * Shared stylesheets to adopt in the shadow DOM.
   */
  static sharedStyles?: string[];

  /**
   * Whether to create a shadow DOM (default: true).
   */
  static shadow?: boolean;

  /**
   * Attributes to observe for changes.
   */
  static observedAttributes?: string[];

  /**
   * The component's shadow root.
   */
  shadow: ShadowRoot | null;

  /**
   * The component's template ID.
   */
  templateID?: string;

  /**
   * The component's tag name in lowercase.
   */
  sensitiveTagName: string;

  /**
   * Create the shadow DOM for this component.
   */
  createShadowDOM(options?: ShadowDOMOptions): ShadowRoot | null;

  /**
   * Called when the component is connected to the DOM.
   */
  connectedCallback(): void;

  /**
   * Called when the component is disconnected from the DOM.
   */
  disconnectedCallback(): void;

  /**
   * Called when an observed attribute changes.
   */
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;

  /**
   * Lifecycle hook called after the component is mounted.
   */
  mounted(): void | Promise<void>;

  /**
   * Lifecycle hook called after the component is unmounted.
   */
  unmounted(): void | Promise<void>;

  /**
   * Get the template element for this component.
   */
  getComponentTemplate(nameOrID?: string | Node): HTMLTemplateElement | Node | undefined;

  /**
   * Select elements within the component's shadow DOM.
   */
  select<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  select<E extends Element = Element>(selector: string): E | null;

  /**
   * Select all elements matching a selector within the shadow DOM.
   */
  selectAll<K extends keyof HTMLElementTagNameMap>(selector: K): NodeListOf<HTMLElementTagNameMap[K]>;
  selectAll<E extends Element = Element>(selector: string): NodeListOf<E>;

  /**
   * Define a dynamic property attribute.
   */
  dynamicProp<T>(name: string, initialValue?: T): DynamicProperty<T>;
}

// ============================================================================
// MythixUILanguageProvider
// ============================================================================

/**
 * Language provider component for i18n support.
 */
export class MythixUILanguageProvider extends MythixUIComponent {
  /**
   * Get the current locale.
   */
  getCurrentLocale(): string;

  /**
   * Set the current locale.
   */
  setLocale(locale: string): void;

  /**
   * Translate a key with optional interpolation and pluralization.
   */
  t(key: string, options?: Record<string, any>, defaultValue?: string): string;

  /**
   * Get the ICU plural category for a count.
   */
  getPluralCategory(count: number): 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

  /**
   * Format a date according to the current locale.
   */
  formatDate(date: Date | number | string, style?: 'short' | 'medium' | 'long' | 'full' | 'time' | Intl.DateTimeFormatOptions): string;

  /**
   * Format a date relative to now.
   */
  formatRelativeTime(date: Date | number | string, options?: Intl.RelativeTimeFormatOptions): string;

  /**
   * Format a number according to the current locale.
   */
  formatNumber(number: number, style?: 'decimal' | 'percent' | 'compact' | 'scientific' | Intl.NumberFormatOptions): string;

  /**
   * Format a currency amount according to the current locale.
   */
  formatCurrency(amount: number, currency: string, options?: Intl.NumberFormatOptions): string;

  /**
   * Check if the current language is RTL.
   */
  isRTL(): boolean;

  /**
   * Get the fallback chain for a locale.
   */
  getFallbackChain(locale?: string): string[];

  /**
   * The language pack terms.
   */
  terms: Record<string, any>;
}

// ============================================================================
// Mythix Elements
// ============================================================================

export namespace MythixElements {
  /**
   * Component for loading external resources.
   */
  export class MythixUIRequire extends MythixUIComponent {
    static registerHandler(pattern: RegExp, callback: (data: {
      src: string;
      url: URL;
      index: number;
      ownerDocument: Document;
      fetchOptions: RequestInit;
    }) => Promise<boolean>): void;
  }

  /**
   * Language pack component.
   */
  export class MythixUILanguagePack extends MythixUIComponent {}

  /**
   * Language provider component.
   */
  export const MythixUILanguageProvider: typeof import('./index').MythixUILanguageProvider;

  /**
   * Loading spinner component.
   */
  export class MythixUISpinner extends MythixUIComponent {}

  /**
   * Dynamic style component.
   */
  export class MythixUIDynamicStyle extends MythixUIComponent {}
}

// ============================================================================
// Query Engine
// ============================================================================

/**
 * Enhanced query engine for DOM selection.
 */
export class QueryEngine {
  constructor(root: Element | ShadowRoot | Document);

  /**
   * Select a single element.
   */
  select<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  select<E extends Element = Element>(selector: string): E | null;

  /**
   * Select all elements matching a selector.
   */
  selectAll<K extends keyof HTMLElementTagNameMap>(selector: K): NodeListOf<HTMLElementTagNameMap[K]>;
  selectAll<E extends Element = Element>(selector: string): NodeListOf<E>;
}

// ============================================================================
// Global Declarations
// ============================================================================

declare global {
  interface Window {
    mythixUI: {
      globalScope: {
        url: URL;
        globalStore: Record<string, any>;
        globalStoreDynamic: Record<string, DynamicProperty<any>>;
        dynamicPropID(id: string): string;
      };
      BaseUtils: typeof BaseUtils;
      Utils: typeof Utils;
      ComponentUtils: typeof ComponentUtils;
      Elements: Record<string, any>;
      MythixUIRequire: typeof MythixElements.MythixUIRequire;
      urlResolver?: (context: { src: string | URL; url: URL; path: string; fileName: string }) => string | URL | false;
      documentMutationObserver?: MutationObserver;
    };
    MYTHIX_DEBUG?: boolean;
    onmythixready: ((event: Event) => void) | null;
    $: typeof document.querySelector;
    $$: typeof document.querySelectorAll;
  }

  /**
   * Global shortcut for document.querySelector.
   */
  function $<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
  function $<E extends Element = Element>(selector: string): E | null;

  /**
   * Global shortcut for document.querySelectorAll.
   */
  function $$<K extends keyof HTMLElementTagNameMap>(selector: K): NodeListOf<HTMLElementTagNameMap[K]>;
  function $$<E extends Element = Element>(selector: string): NodeListOf<E>;
}

export {};
