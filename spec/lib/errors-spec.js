/* eslint-disable no-magic-numbers */

import * as _TestHelpers from '../support/test-helpers.js';

import {
  MythixError,
  TemplateError,
  ComponentError,
  DynamicPropertyError,
  isDebugMode,
  debugLog,
  debugWarn,
  formatComponentContext,
  formatScopeVariables,
} from '../../lib/errors.js';

describe('Errors', () => {
  describe('MythixError', () => {
    it('creates an error with message', () => {
      const error = new MythixError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('MythixError');
    });

    it('stores context', () => {
      const error = new MythixError('Test error', { foo: 'bar' });
      expect(error.context.foo).toBe('bar');
    });

    it('formats toString with context', () => {
      const error = new MythixError('Test error', { key: 'value' });
      const str = error.toString();
      expect(str).toContain('MythixError: Test error');
      expect(str).toContain('Context:');
      expect(str).toContain('key');
    });
  });

  describe('TemplateError', () => {
    it('creates a template error with expression', () => {
      const error = new TemplateError('Failed to evaluate', {
        expression: 'user.name',
      });
      expect(error.name).toBe('TemplateError');
      expect(error.expression).toBe('user.name');
    });

    it('includes scope variables', () => {
      const error = new TemplateError('Failed', {
        expression:      'unknown',
        scopeVariables:  [ 'count', 'items' ],
      });
      expect(error.scopeVariables).toContain('count');
      expect(error.scopeVariables).toContain('items');
    });

    it('formats toString with all details', () => {
      const error = new TemplateError('Undefined variable', {
        expression:      'badVar',
        scopeVariables:  [ 'count', 'name' ],
        position:        { start: 10, end: 20 },
        suggestion:      'Did you mean "count"?',
      });
      const str = error.toString();
      expect(str).toContain('TemplateError: Undefined variable');
      expect(str).toContain('@@badVar@@');
      expect(str).toContain('Position: 10-20');
      expect(str).toContain('count, name');
      expect(str).toContain('Did you mean');
    });
  });

  describe('ComponentError', () => {
    it('creates a component error with tag name', () => {
      const error = new ComponentError('Error in lifecycle', {
        tagName: 'my-component',
        phase:   'mounted',
      });
      expect(error.name).toBe('ComponentError');
      expect(error.tagName).toBe('my-component');
      expect(error.phase).toBe('mounted');
    });

    it('truncates long outerHTML', () => {
      const longHTML = '<my-component>' + 'a'.repeat(300) + '</my-component>';
      const error = new ComponentError('Error', {
        tagName:   'my-component',
        outerHTML: longHTML,
      });
      const str = error.toString();
      expect(str).toContain('...');
      expect(str.length).toBeLessThan(longHTML.length + 100);
    });

    it('formats toString with all details', () => {
      const error = new ComponentError('mounted() failed', {
        tagName:    'my-component',
        phase:      'mounted',
        outerHTML:  '<my-component foo="bar"></my-component>',
        suggestion: 'Check for missing dependencies',
      });
      const str = error.toString();
      expect(str).toContain('ComponentError: mounted() failed');
      expect(str).toContain('<my-component>');
      expect(str).toContain('Lifecycle phase: mounted');
      expect(str).toContain('Element:');
      expect(str).toContain('Check for missing dependencies');
    });
  });

  describe('DynamicPropertyError', () => {
    it('creates a dynamic property error', () => {
      const error = new DynamicPropertyError('Cannot access nested property', {
        propertyPath: 'user.profile.name',
      });
      expect(error.name).toBe('DynamicPropertyError');
      expect(error.propertyPath).toBe('user.profile.name');
    });

    it('formats toString with property path', () => {
      const error = new DynamicPropertyError('Property undefined', {
        propertyPath: 'data.items[0]',
        suggestion:   'Use optional chaining: data?.items?.[0]',
      });
      const str = error.toString();
      expect(str).toContain('DynamicPropertyError');
      expect(str).toContain('data.items[0]');
      expect(str).toContain('optional chaining');
    });
  });

  describe('isDebugMode', () => {
    it('returns false when MYTHIX_DEBUG is not set', () => {
      delete globalThis.MYTHIX_DEBUG;
      expect(isDebugMode()).toBe(false);
    });

    it('returns true when MYTHIX_DEBUG is true', () => {
      globalThis.MYTHIX_DEBUG = true;
      expect(isDebugMode()).toBe(true);
      delete globalThis.MYTHIX_DEBUG;
    });

    it('returns false when MYTHIX_DEBUG is truthy but not true', () => {
      globalThis.MYTHIX_DEBUG = 'yes';
      expect(isDebugMode()).toBe(false);
      delete globalThis.MYTHIX_DEBUG;
    });
  });

  describe('debugLog and debugWarn', () => {
    let originalConsoleDebug;
    let originalConsoleWarn;
    let debugCalls;
    let warnCalls;

    beforeEach(() => {
      originalConsoleDebug = console.debug;
      originalConsoleWarn = console.warn;
      debugCalls = [];
      warnCalls = [];
      console.debug = (...args) => debugCalls.push(args);
      console.warn = (...args) => warnCalls.push(args);
    });

    afterEach(() => {
      console.debug = originalConsoleDebug;
      console.warn = originalConsoleWarn;
      delete globalThis.MYTHIX_DEBUG;
    });

    it('debugLog does nothing when debug mode is off', () => {
      delete globalThis.MYTHIX_DEBUG;
      debugLog('test message');
      expect(debugCalls.length).toBe(0);
    });

    it('debugLog logs when debug mode is on', () => {
      globalThis.MYTHIX_DEBUG = true;
      debugLog('test message');
      expect(debugCalls.length).toBe(1);
      expect(debugCalls[0][0]).toContain('test message');
    });

    it('debugLog includes data when provided', () => {
      globalThis.MYTHIX_DEBUG = true;
      debugLog('test message', { foo: 'bar' });
      expect(debugCalls.length).toBe(1);
      expect(debugCalls[0][1]).toEqual({ foo: 'bar' });
    });

    it('debugWarn does nothing when debug mode is off', () => {
      delete globalThis.MYTHIX_DEBUG;
      debugWarn('test warning');
      expect(warnCalls.length).toBe(0);
    });

    it('debugWarn logs when debug mode is on', () => {
      globalThis.MYTHIX_DEBUG = true;
      debugWarn('test warning');
      expect(warnCalls.length).toBe(1);
      expect(warnCalls[0][0]).toContain('test warning');
    });
  });

  describe('formatComponentContext', () => {
    it('extracts component info', () => {
      const mockComponent = {
        tagName:   'MY-COMPONENT',
        outerHTML: '<my-component attr="value"></my-component>',
      };
      const context = formatComponentContext(mockComponent, 'mounted');
      expect(context.tagName).toBe('my-component');
      expect(context.phase).toBe('mounted');
      expect(context.outerHTML).toContain('attr="value"');
    });

    it('handles missing properties gracefully', () => {
      const context = formatComponentContext({}, 'unmounted');
      expect(context.tagName).toBe('unknown');
      expect(context.phase).toBe('unmounted');
    });
  });

  describe('formatScopeVariables', () => {
    it('extracts variable names from scope', () => {
      const scope = { count: 1, name: 'test', items: [] };
      const variables = formatScopeVariables(scope);
      expect(variables).toContain('count');
      expect(variables).toContain('name');
      expect(variables).toContain('items');
    });

    it('filters out private variables', () => {
      const scope = { count: 1, _private: 'hidden', __internal: 'also hidden' };
      const variables = formatScopeVariables(scope);
      expect(variables).toContain('count');
      expect(variables).not.toContain('_private');
      expect(variables).not.toContain('__internal');
    });

    it('returns empty array for null scope', () => {
      expect(formatScopeVariables(null)).toEqual([]);
      expect(formatScopeVariables(undefined)).toEqual([]);
    });
  });
});
