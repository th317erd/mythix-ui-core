'use strict';

/**
 * type: Namespace
 * name: Errors
 * groupName: Errors
 * desc: |
 *   `import { Errors } from 'mythix-ui-core@1.0';`
 *
 *   Custom error classes for Mythix UI that provide contextual, actionable error messages.
 */

/**
 * type: Class
 * name: MythixError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Base error class for all Mythix UI errors. Provides consistent error formatting
 *   and context attachment capabilities.
 */

/**
 * Base error class for all Mythix UI errors.
 * @extends Error
 */
export class MythixError extends Error {
  /**
   * Create a MythixError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   */
  constructor(message, context = {}) {
    super(message);
    /** @type {string} */
    this.name = 'MythixError';
    /** @type {Object} */
    this.context = context;
  }

  /**
   * type: Function
   * name: toString
   * groupName: Errors
   * parent: MythixError
   * desc: |
   *   Format the error message with context for developer-friendly output.
   * return: |
   *   @types string; The formatted error message.
   */
  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (Object.keys(this.context).length > 0)
      parts.push(`\nContext: ${JSON.stringify(this.context, null, 2)}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: TemplateError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown during template parsing or compilation. Includes the failing expression,
 *   available scope variables, and source context for debugging.
 * examples:
 *   - |
 *     ```javascript
 *     throw new TemplateError('Failed to evaluate expression', {
 *       expression: 'user.name',
 *       scopeVariables: ['count', 'items'],
 *       componentTagName: 'my-component',
 *     });
 *     ```
 */

/**
 * Error thrown during template parsing or compilation.
 * @extends MythixError
 */
export class TemplateError extends MythixError {
  /**
   * Create a TemplateError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.expression] - The failing template expression.
   * @param {string[]} [context.scopeVariables] - Available scope variables.
   * @param {{start: number, end: number}} [context.position] - Position in source.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'TemplateError';
    /** @type {string|null} */
    this.expression = context.expression || null;
    /** @type {string[]} */
    this.scopeVariables = context.scopeVariables || [];
    /** @type {{start: number, end: number}|null} */
    this.position = context.position || null;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (this.expression)
      parts.push(`\n  Expression: @@${this.expression}@@`);

    if (this.position)
      parts.push(`\n  Position: ${this.position.start}-${this.position.end}`);

    if (this.scopeVariables.length > 0)
      parts.push(`\n  Available variables: ${this.scopeVariables.join(', ')}`);

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: ComponentError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown during component lifecycle operations. Includes the component tag name,
 *   lifecycle phase, and truncated outerHTML for context.
 * examples:
 *   - |
 *     ```javascript
 *     throw new ComponentError('Error in mounted() callback', {
 *       tagName: 'my-component',
 *       phase: 'mounted',
 *       outerHTML: '<my-component attr="value">...</my-component>',
 *     });
 *     ```
 */

/**
 * Error thrown during component lifecycle operations.
 * @extends MythixError
 */
export class ComponentError extends MythixError {
  /**
   * Create a ComponentError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.tagName] - The component's tag name.
   * @param {string} [context.phase] - The lifecycle phase ('mounted', 'unmounted', etc.).
   * @param {string} [context.outerHTML] - The component's outerHTML.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'ComponentError';
    /** @type {string} */
    this.tagName = context.tagName || 'unknown';
    /** @type {string|null} */
    this.phase = context.phase || null;
    /** @type {string|null} */
    this.outerHTML = context.outerHTML || null;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    parts.push(`\n  Component: <${this.tagName}>`);

    if (this.phase)
      parts.push(`\n  Lifecycle phase: ${this.phase}`);

    if (this.outerHTML) {
      let truncated = this.outerHTML.length > 200
        ? this.outerHTML.substring(0, 200) + '...'
        : this.outerHTML;
      parts.push(`\n  Element: ${truncated}`);
    }

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: DynamicPropertyError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown when accessing or modifying DynamicProperty values incorrectly.
 */

/**
 * Error thrown when accessing or modifying DynamicProperty values incorrectly.
 * @extends MythixError
 */
export class DynamicPropertyError extends MythixError {
  /**
   * Create a DynamicPropertyError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.propertyPath] - The property path being accessed.
   * @param {*} [context.currentValue] - The current value of the property.
   * @param {*} [context.attemptedValue] - The value that was attempted to be set.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'DynamicPropertyError';
    /** @type {string|null} */
    this.propertyPath = context.propertyPath || null;
    /** @type {*} */
    this.currentValue = context.currentValue;
    /** @type {*} */
    this.attemptedValue = context.attemptedValue;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (this.propertyPath)
      parts.push(`\n  Property path: ${this.propertyPath}`);

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Constant
 * name: MYTHIX_DEBUG
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Flag to enable verbose debug logging. Set `globalThis.MYTHIX_DEBUG = true` to enable.
 */

/**
 * Check if debug mode is enabled.
 * Set `globalThis.MYTHIX_DEBUG = true` to enable verbose logging.
 * @returns {boolean} True if debug mode is enabled.
 */
export const isDebugMode = () => {
  return globalThis.MYTHIX_DEBUG === true;
};

/**
 * type: Function
 * name: debugLog
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Log a message only when MYTHIX_DEBUG is enabled.
 * arguments:
 *   - name: message
 *     dataType: string
 *     desc: The message to log.
 *   - name: data
 *     dataType: any
 *     optional: true
 *     desc: Additional data to include in the log.
 */

/**
 * Log a debug message (only when MYTHIX_DEBUG is enabled).
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to include in the log.
 * @returns {void}
 */
export const debugLog = (message, data) => {
  if (!isDebugMode())
    return;

  if (data !== undefined)
    console.debug(`[MythixUI Debug] ${message}`, data);
  else
    console.debug(`[MythixUI Debug] ${message}`);
};

/**
 * type: Function
 * name: debugWarn
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Log a warning only when MYTHIX_DEBUG is enabled.
 * arguments:
 *   - name: message
 *     dataType: string
 *     desc: The warning message.
 *   - name: data
 *     dataType: any
 *     optional: true
 *     desc: Additional data to include.
 */

/**
 * Log a warning message (only when MYTHIX_DEBUG is enabled).
 * @param {string} message - The warning message.
 * @param {*} [data] - Additional data to include.
 * @returns {void}
 */
export const debugWarn = (message, data) => {
  if (!isDebugMode())
    return;

  if (data !== undefined)
    console.warn(`[MythixUI Warning] ${message}`, data);
  else
    console.warn(`[MythixUI Warning] ${message}`);
};

/**
 * type: Function
 * name: formatComponentContext
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Create a context object for component error reporting.
 * arguments:
 *   - name: component
 *     dataType: HTMLElement
 *     desc: The component instance.
 *   - name: phase
 *     dataType: string
 *     desc: The lifecycle phase (e.g., 'mounted', 'unmounted').
 * return: |
 *   @types object; Context object suitable for ComponentError.
 */

/**
 * Create a context object for component error reporting.
 * @param {HTMLElement} component - The component instance.
 * @param {string} phase - The lifecycle phase ('mounted', 'unmounted', etc.).
 * @returns {{tagName: string, phase: string, outerHTML: string}} Context object suitable for ComponentError.
 */
export const formatComponentContext = (component, phase) => {
  let outerHTML = '';

  try {
    outerHTML = component.outerHTML || '';
  } catch (error) {
    outerHTML = `<${component.tagName?.toLowerCase() || 'unknown'}>`;
  }

  return {
    tagName:   component.tagName?.toLowerCase() || 'unknown',
    phase:     phase,
    outerHTML: outerHTML,
  };
};

/**
 * type: Function
 * name: formatScopeVariables
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Extract available variable names from a scope object for error context.
 * arguments:
 *   - name: scope
 *     dataType: object
 *     desc: The scope object to inspect.
 * return: |
 *   @types Array<string>; List of variable names available in scope.
 */

/**
 * Extract available variable names from a scope object for error context.
 * @param {Object} scope - The scope object to inspect.
 * @returns {string[]} List of variable names available in scope.
 */
export const formatScopeVariables = (scope) => {
  if (!scope)
    return [];

  let variables = [];

  try {
    // Get own properties
    variables = Object.keys(scope);

    // Also check prototype chain for scope proxies
    let proto = Object.getPrototypeOf(scope);
    while (proto && proto !== Object.prototype) {
      for (let key of Object.getOwnPropertyNames(proto)) {
        if (!variables.includes(key) && key !== 'constructor')
          variables.push(key);
      }
      proto = Object.getPrototypeOf(proto);
    }
  } catch (error) {
    // Ignore errors from proxy traps
  }

  return variables.filter((v) => !v.startsWith('_'));
};
