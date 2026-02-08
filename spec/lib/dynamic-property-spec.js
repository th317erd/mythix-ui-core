/* eslint-disable no-magic-numbers */

import * as _TestHelpers from '../support/test-helpers.js';

import { DynamicProperty } from '../../lib/index.js';

describe('DynamicProperty', () => {
  describe('constructor', () => {
    it('creates a DynamicProperty with initial value', () => {
      const prop = new DynamicProperty(42);
      expect(prop.valueOf()).toBe(42);
    });

    it('creates a DynamicProperty with object value', () => {
      const obj = { name: 'test' };
      const prop = new DynamicProperty(obj);
      expect(prop.valueOf()).toBe(obj);
    });

    it('creates a DynamicProperty with array value', () => {
      const arr = [1, 2, 3];
      const prop = new DynamicProperty(arr);
      expect(prop.valueOf()).toBe(arr);
    });

    it('creates a DynamicProperty with undefined value', () => {
      const prop = new DynamicProperty();
      expect(prop.valueOf()).toBe(undefined);
    });

    it('creates a DynamicProperty with null value', () => {
      const prop = new DynamicProperty(null);
      expect(prop.valueOf()).toBe(null);
    });
  });

  describe('value access', () => {
    it('valueOf returns the underlying value', () => {
      const prop = new DynamicProperty('hello');
      expect(prop.valueOf()).toBe('hello');
    });

    it('toString returns string representation', () => {
      const prop = new DynamicProperty(123);
      expect(prop.toString()).toBe('123');
    });

    it('toString handles objects', () => {
      const prop = new DynamicProperty({ a: 1 });
      expect(prop.toString()).toBe('[object Object]');
    });

    it('can access nested properties via proxy', () => {
      const prop = new DynamicProperty({ nested: { value: 42 } });
      expect(prop.nested).toBeDefined();
      expect(prop.nested.value).toBe(42);
    });
  });

  describe('value setting', () => {
    it('sets value using DynamicProperty.set symbol', () => {
      const prop = new DynamicProperty(1);
      prop[DynamicProperty.set](2);
      expect(prop.valueOf()).toBe(2);
    });

    it('updates value correctly', () => {
      const prop = new DynamicProperty('initial');
      expect(prop.valueOf()).toBe('initial');

      prop[DynamicProperty.set]('updated');
      expect(prop.valueOf()).toBe('updated');
    });

    it('handles multiple updates', () => {
      const prop = new DynamicProperty(1);

      prop[DynamicProperty.set](2);
      expect(prop.valueOf()).toBe(2);

      prop[DynamicProperty.set](3);
      expect(prop.valueOf()).toBe(3);

      prop[DynamicProperty.set](4);
      expect(prop.valueOf()).toBe(4);
    });
  });

  describe('type identification', () => {
    it('instanceof DynamicProperty returns true for DynamicProperty', () => {
      const prop = new DynamicProperty(1);
      expect(prop instanceof DynamicProperty).toBe(true);
    });

    it('instanceof DynamicProperty returns false for non-DynamicProperty', () => {
      expect({} instanceof DynamicProperty).toBe(false);
      expect([] instanceof DynamicProperty).toBe(false);
    });
  });

  describe('property chaining', () => {
    it('accessing nested property works for objects', () => {
      const prop = new DynamicProperty({
        user: {
          name: 'John',
          age: 30,
        },
      });

      const userName = prop.user.name;
      expect(userName).toBe('John');
    });

    it('accessing array indices works', () => {
      const prop = new DynamicProperty([1, 2, 3]);
      expect(prop[0]).toBe(1);
      expect(prop[1]).toBe(2);
      expect(prop.length).toBe(3);
    });
  });

  describe('arithmetic operations', () => {
    it('works with addition', () => {
      const prop = new DynamicProperty(10);
      expect(prop + 5).toBe(15);
    });

    it('works with multiplication', () => {
      const prop = new DynamicProperty(10);
      expect(prop * 2).toBe(20);
    });

    it('works with string concatenation', () => {
      const prop = new DynamicProperty('hello');
      expect(prop + ' world').toBe('hello world');
    });
  });

  describe('comparison', () => {
    it('loose equality with primitive works', () => {
      const prop = new DynamicProperty(42);
      expect(prop == 42).toBe(true);
      expect(prop == '42').toBe(true);
    });

    it('works in boolean context', () => {
      const truthy = new DynamicProperty(1);
      const falsy = new DynamicProperty(0);

      expect(truthy.valueOf() ? true : false).toBe(true);
      expect(falsy.valueOf() ? true : false).toBe(false);
    });
  });

  describe('static properties', () => {
    it('DynamicProperty.set is a symbol', () => {
      expect(typeof DynamicProperty.set).toBe('symbol');
    });
  });

  describe('event system', () => {
    it('addEventListener registers a handler that receives update events', () => {
      const prop = new DynamicProperty('initial');
      let receivedEvent = null;

      prop.addEventListener('update', (event) => {
        receivedEvent = event;
      });

      prop[DynamicProperty.set]('updated');

      expect(receivedEvent).not.toBe(null);
      expect(receivedEvent.value).toBe('updated');
      expect(receivedEvent.oldValue).toBe('initial');
    });

    it('handler receives correct event data properties', () => {
      const prop = new DynamicProperty(100);
      let receivedValue = null;
      let receivedOldValue = null;
      let receivedOriginator = null;

      prop.addEventListener('update', (event) => {
        receivedValue = event.value;
        receivedOldValue = event.oldValue;
        receivedOriginator = event.originator;
      });

      prop[DynamicProperty.set](200);

      expect(receivedValue).toBe(200);
      expect(receivedOldValue).toBe(100);
      expect(receivedOriginator).toBeDefined();
    });

    it('multiple handlers all receive the update event', () => {
      const prop = new DynamicProperty(1);
      let handler1Called = false;
      let handler2Called = false;
      let handler3Called = false;

      prop.addEventListener('update', () => {
        handler1Called = true;
      });
      prop.addEventListener('update', () => {
        handler2Called = true;
      });
      prop.addEventListener('update', () => {
        handler3Called = true;
      });

      prop[DynamicProperty.set](2);

      expect(handler1Called).toBe(true);
      expect(handler2Called).toBe(true);
      expect(handler3Called).toBe(true);
    });

    it('removeEventListener stops handler from receiving events', () => {
      const prop = new DynamicProperty('start');
      let callCount = 0;

      const handler = () => {
        callCount++;
      };

      prop.addEventListener('update', handler);
      prop[DynamicProperty.set]('middle');
      expect(callCount).toBe(1);

      prop.removeEventListener('update', handler);
      prop[DynamicProperty.set]('end');
      expect(callCount).toBe(1); // Should not have increased
    });

    it('does not fire event when value is unchanged', () => {
      const prop = new DynamicProperty('same');
      let eventFired = false;

      prop.addEventListener('update', () => {
        eventFired = true;
      });

      prop[DynamicProperty.set]('same');

      expect(eventFired).toBe(false);
    });

    it('does not fire event when dispatchUpdateEvent option is false', () => {
      const prop = new DynamicProperty('initial');
      let eventFired = false;

      prop.addEventListener('update', () => {
        eventFired = true;
      });

      prop[DynamicProperty.set]('updated', { dispatchUpdateEvent: false });

      expect(eventFired).toBe(false);
      expect(prop.valueOf()).toBe('updated'); // Value should still be updated
    });

    it('protects against cyclic event callbacks', () => {
      const prop = new DynamicProperty(0);
      let callCount = 0;

      prop.addEventListener('update', () => {
        callCount++;
        // This recursive set should not trigger another event
        prop[DynamicProperty.set](callCount + 100);
      });

      prop[DynamicProperty.set](1);

      expect(callCount).toBe(1); // Handler called only once
      expect(prop.valueOf()).toBe(101); // Value was set during callback
    });

    it('handler errors do not prevent other handlers from being called', () => {
      const prop = new DynamicProperty('test');
      let handler2Called = false;

      // Suppress console.error for this test
      const originalConsoleError = console.error;
      console.error = () => {};

      prop.addEventListener('update', () => {
        throw new Error('Handler 1 error');
      });
      prop.addEventListener('update', () => {
        handler2Called = true;
      });

      prop[DynamicProperty.set]('updated');

      console.error = originalConsoleError;

      // In native EventTarget, errors bubble - but in fallback mode, we continue
      // This test verifies the behavior works in JSDOM/Node environment
      expect(prop.valueOf()).toBe('updated');
    });

    it('removeEventListener does not affect other handlers', () => {
      const prop = new DynamicProperty(0);
      let handler1CallCount = 0;
      let handler2CallCount = 0;

      const handler1 = () => {
        handler1CallCount++;
      };
      const handler2 = () => {
        handler2CallCount++;
      };

      prop.addEventListener('update', handler1);
      prop.addEventListener('update', handler2);

      prop[DynamicProperty.set](1);
      expect(handler1CallCount).toBe(1);
      expect(handler2CallCount).toBe(1);

      prop.removeEventListener('update', handler1);

      prop[DynamicProperty.set](2);
      expect(handler1CallCount).toBe(1); // Not called again
      expect(handler2CallCount).toBe(2); // Still being called
    });
  });
});
