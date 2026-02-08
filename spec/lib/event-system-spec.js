/* eslint-disable max-classes-per-file */
/* eslint-disable no-magic-numbers */

import * as _TestHelpers from '../support/test-helpers.js';

import {
  Utils,
} from '../../lib/index.js';

describe('Event System', () => {
  describe('createScanningProxy', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should find properties on the start element', () => {
      const element = document.createElement('div');
      element.myMethod = () => 'found';
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect(proxy.myMethod()).toBe('found');
    });

    it('should find properties on parent elements', () => {
      const parent = document.createElement('div');
      parent.parentMethod = () => 'parent found';
      const child = document.createElement('div');
      parent.appendChild(child);
      container.appendChild(parent);

      const proxy = Utils.createScanningProxy(child);
      expect(proxy.parentMethod()).toBe('parent found');
    });

    it('should return undefined for non-existent properties', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect(proxy.nonExistentProperty).toBe(undefined);
    });

    it('should allow global access (console, window, etc.)', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect(proxy.console).toBe(console);
      expect(proxy.JSON).toBe(JSON);
      expect(proxy.Math).toBe(Math);
      expect(proxy.parseInt).toBe(parseInt);
    });

    it('should bind methods to the element they were found on', () => {
      const parent = document.createElement('div');
      parent.id = 'parent';
      parent.getMyId = function() { return this.id; };

      const child = document.createElement('div');
      child.id = 'child';
      parent.appendChild(child);
      container.appendChild(parent);

      const proxy = Utils.createScanningProxy(child);
      // Method found on parent should be bound to parent
      expect(proxy.getMyId()).toBe('parent');
    });

    it('should support setting properties', () => {
      const element = document.createElement('div');
      element.myValue = 10;
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      proxy.myValue = 20;
      expect(element.myValue).toBe(20);
    });

    it('should find first match when scanning up', () => {
      const grandparent = document.createElement('div');
      grandparent.sharedMethod = () => 'grandparent';

      const parent = document.createElement('div');
      parent.sharedMethod = () => 'parent';
      grandparent.appendChild(parent);

      const child = document.createElement('div');
      parent.appendChild(child);
      container.appendChild(grandparent);

      const proxy = Utils.createScanningProxy(child);
      // Should find parent's method first (closest match)
      expect(proxy.sharedMethod()).toBe('parent');
    });
  });

  describe('mythixEventWrapper', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should call method on parent element with bare method name', () => {
      const parent = document.createElement('div');
      let called = false;
      parent.handleClick = () => { called = true; };

      const child = document.createElement('button');
      child.setAttribute('data-event-onclick', 'handleClick');
      parent.appendChild(child);
      container.appendChild(parent);

      // Simulate the event wrapper
      const event = new Event('click');
      Utils.mythixEventWrapper.call(child, event);

      expect(called).toBe(true);
    });

    it('should call method with this. prefix', () => {
      const element = document.createElement('button');
      let called = false;
      element.myHandler = () => { called = true; };
      element.setAttribute('data-event-onclick', 'this.myHandler');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(called).toBe(true);
    });

    it('should call method with arguments', () => {
      const element = document.createElement('button');
      let receivedArg = null;
      element.handleClick = (arg) => { receivedArg = arg; };
      element.setAttribute('data-event-onclick', "this.handleClick('foo')");
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(receivedArg).toBe('foo');
    });

    it('should auto-invoke simple refs with event', () => {
      const element = document.createElement('button');
      let receivedEvent = null;
      element.handleClick = (ev) => { receivedEvent = ev; };
      element.setAttribute('data-event-onclick', 'this.handleClick');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(receivedEvent).toBe(event);
    });

    it('should handle property access expressions', () => {
      const element = document.createElement('button');
      element.count = 5;
      element.setAttribute('data-event-onclick', 'this.count++');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(element.count).toBe(6);
    });

    it('should handle global access (console.log)', () => {
      const element = document.createElement('button');
      element.setAttribute('data-event-onclick', "console.log('test')");
      container.appendChild(element);

      // Just verify it doesn't throw
      const event = new Event('click');
      expect(() => {
        Utils.mythixEventWrapper.call(element, event);
      }).not.toThrow();
    });

    it('should handle nested property access', () => {
      const element = document.createElement('button');
      let called = false;
      element.state = {
        handler: () => { called = true; },
      };
      element.setAttribute('data-event-onclick', 'this.state.handler');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(called).toBe(true);
    });

    it('should return result from expression', () => {
      const element = document.createElement('button');
      element.getValue = () => 42;
      element.setAttribute('data-event-onclick', 'this.getValue');
      container.appendChild(element);

      const event = new Event('click');
      const result = Utils.mythixEventWrapper.call(element, event);

      expect(result).toBe(42);
    });

    it('should handle missing attribute gracefully', () => {
      const element = document.createElement('button');
      container.appendChild(element);

      const event = new Event('click');
      expect(() => {
        Utils.mythixEventWrapper.call(element, event);
      }).not.toThrow();
    });
  });

  describe('bindDataEventAttribute', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should bind event listener to element', () => {
      const element = document.createElement('button');
      let called = false;
      element.handleClick = () => { called = true; };
      element.setAttribute('data-event-onclick', 'handleClick');
      container.appendChild(element);

      Utils.bindDataEventAttribute(element, 'click');

      element.dispatchEvent(new Event('click'));
      expect(called).toBe(true);
    });
  });

  describe('bindAllDataEventAttributes', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should bind all data-event-on* attributes', () => {
      const element = document.createElement('input');
      let clickCalled = false;
      let inputCalled = false;

      element.handleClick = () => { clickCalled = true; };
      element.handleInput = () => { inputCalled = true; };

      element.setAttribute('data-event-onclick', 'handleClick');
      element.setAttribute('data-event-oninput', 'handleInput');
      container.appendChild(element);

      Utils.bindAllDataEventAttributes(element);

      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('input'));

      expect(clickCalled).toBe(true);
      expect(inputCalled).toBe(true);
    });

    it('should handle elements without event attributes', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      expect(() => {
        Utils.bindAllDataEventAttributes(element);
      }).not.toThrow();
    });

    it('should handle null/undefined gracefully', () => {
      expect(() => {
        Utils.bindAllDataEventAttributes(null);
        Utils.bindAllDataEventAttributes(undefined);
      }).not.toThrow();
    });
  });

  describe('createScanningProxy - advanced cases', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should handle "has" trap correctly', () => {
      const element = document.createElement('div');
      element.existingProp = 'value';
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect('existingProp' in proxy).toBe(true);
      expect('nonExistentProp' in proxy).toBe(false);
      expect('console' in proxy).toBe(true); // global
    });

    it('should set new property on start element when not found', () => {
      const element = document.createElement('div');
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      proxy.newProperty = 'new value';
      expect(element.newProperty).toBe('new value');
    });

    it('should handle deeply nested elements', () => {
      const level1 = document.createElement('div');
      level1.level1Method = () => 'level1';

      const level2 = document.createElement('div');
      level1.appendChild(level2);

      const level3 = document.createElement('div');
      level2.appendChild(level3);

      const level4 = document.createElement('div');
      level3.appendChild(level4);

      container.appendChild(level1);

      const proxy = Utils.createScanningProxy(level4);
      expect(proxy.level1Method()).toBe('level1');
    });

    it('should return real objects (shallow proxy)', () => {
      const element = document.createElement('div');
      element.state = { nested: { value: 42 } };
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      // After first lookup, should return real object
      const state = proxy.state;
      expect(state.nested.value).toBe(42);
    });

    it('should handle arrow function properties', () => {
      const element = document.createElement('div');
      element.arrowMethod = () => 'arrow result';
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect(proxy.arrowMethod()).toBe('arrow result');
    });

    it('should handle getter properties', () => {
      const element = document.createElement('div');
      Object.defineProperty(element, 'computedProp', {
        get: () => 'computed value',
        configurable: true,
      });
      container.appendChild(element);

      const proxy = Utils.createScanningProxy(element);
      expect(proxy.computedProp).toBe('computed value');
    });
  });

  describe('mythixEventWrapper - advanced cases', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    it('should handle multiple arguments in expression', () => {
      const element = document.createElement('button');
      let receivedArgs = [];
      element.handleClick = (a, b, c) => { receivedArgs = [a, b, c]; };
      element.setAttribute('data-event-onclick', "this.handleClick('foo', 42, true)");
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(receivedArgs).toEqual(['foo', 42, true]);
    });

    it('should handle ternary expressions', () => {
      const element = document.createElement('button');
      element.isActive = true;
      element.setAttribute('data-event-onclick', 'this.isActive ? this.isActive = false : this.isActive = true');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(element.isActive).toBe(false);
    });

    it('should handle different event types', () => {
      const element = document.createElement('input');
      let eventTypes = [];

      element.handleEvent = (evt) => { eventTypes.push(evt.type); };
      element.setAttribute('data-event-onfocus', 'handleEvent');
      element.setAttribute('data-event-onblur', 'handleEvent');
      element.setAttribute('data-event-oninput', 'handleEvent');
      container.appendChild(element);

      Utils.bindAllDataEventAttributes(element);

      element.dispatchEvent(new Event('focus'));
      element.dispatchEvent(new Event('blur'));
      element.dispatchEvent(new Event('input'));

      expect(eventTypes).toEqual(['focus', 'blur', 'input']);
    });

    it('should handle assignment expressions', () => {
      const element = document.createElement('button');
      element.value = 'initial';
      element.setAttribute('data-event-onclick', "this.value = 'updated'");
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(element.value).toBe('updated');
    });

    it('should handle compound assignment expressions', () => {
      const element = document.createElement('button');
      element.count = 10;
      element.setAttribute('data-event-onclick', 'this.count += 5');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(element.count).toBe(15);
    });

    it('should handle method chaining', () => {
      const element = document.createElement('button');
      element.items = ['a', 'b', 'c'];
      element.setAttribute('data-event-onclick', "this.result = this.items.join('-')");
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(element.result).toBe('a-b-c');
    });

    it('should pass event to auto-invoked nested method', () => {
      const element = document.createElement('button');
      let receivedEvent = null;
      element.handlers = {
        onClick: (evt) => { receivedEvent = evt; },
      };
      element.setAttribute('data-event-onclick', 'this.handlers.onClick');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      expect(receivedEvent).toBe(event);
    });

    it('should not auto-invoke when parentheses are present', () => {
      const element = document.createElement('button');
      let callCount = 0;
      element.handleClick = () => { callCount++; return 'result'; };
      element.setAttribute('data-event-onclick', 'this.handleClick()');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      // Should only be called once (not auto-invoked again)
      expect(callCount).toBe(1);
    });
  });

  describe('deprecated functions', () => {
    let originalWarn;
    let warnCalls;

    beforeEach(() => {
      originalWarn = console.warn;
      warnCalls = [];
      console.warn = (...args) => { warnCalls.push(args); };
    });

    afterEach(() => {
      console.warn = originalWarn;
    });

    it('getAllEventNamesForElement should emit deprecation warning', () => {
      const element = document.createElement('button');
      Utils.getAllEventNamesForElement(element);

      expect(warnCalls.length).toBe(1);
      expect(warnCalls[0][0]).toContain('deprecated');
    });

    it('bindEventToElement should emit deprecation warning', () => {
      const element = document.createElement('button');
      const callback = () => {};
      Utils.bindEventToElement.call({}, element, 'click', callback);

      expect(warnCalls.length).toBe(1);
      expect(warnCalls[0][0]).toContain('deprecated');
    });
  });

  describe('error handling', () => {
    let container;
    let originalError;
    let errorCalls;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
      originalError = console.error;
      errorCalls = [];
      console.error = (...args) => { errorCalls.push(args); };
    });

    afterEach(() => {
      container.remove();
      console.error = originalError;
    });

    it('should log error for invalid expression', () => {
      const element = document.createElement('button');
      element.setAttribute('data-event-onclick', 'this.nonExistent.method()');
      container.appendChild(element);

      const event = new Event('click');
      Utils.mythixEventWrapper.call(element, event);

      // Should have logged an error
      expect(errorCalls.length).toBeGreaterThan(0);
    });

    it('should not throw for syntax errors in expression', () => {
      const element = document.createElement('button');
      element.setAttribute('data-event-onclick', 'this.{invalid}syntax');
      container.appendChild(element);

      const event = new Event('click');
      expect(() => {
        Utils.mythixEventWrapper.call(element, event);
      }).not.toThrow();
    });
  });
});
