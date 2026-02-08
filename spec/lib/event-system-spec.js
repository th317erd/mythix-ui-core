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
});
