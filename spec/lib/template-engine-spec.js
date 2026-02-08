/* eslint-disable no-magic-numbers */

import * as _TestHelpers from '../support/test-helpers.js';

import { Utils, DynamicProperty } from '../../lib/index.js';

describe('Template Engine', () => {
  describe('isTemplate', () => {
    it('detects template syntax', () => {
      expect(Utils.isTemplate('Hello @@name@@')).toBe(true);
      expect(Utils.isTemplate('@@value@@')).toBe(true);
      expect(Utils.isTemplate('Multiple @@a@@ and @@b@@')).toBe(true);
    });

    it('returns false for non-template strings', () => {
      expect(Utils.isTemplate('Hello world')).toBe(false);
      expect(Utils.isTemplate('No templates here')).toBe(false);
      expect(Utils.isTemplate('')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(Utils.isTemplate('@single@')).toBe(false);
      expect(Utils.isTemplate('@@@@')).toBe(true); // Empty expression
      expect(Utils.isTemplate('text@@expr@@text')).toBe(true);
    });
  });

  describe('parseTemplateParts', () => {
    it('parses simple template', () => {
      const scope = { name: 'World' };
      const parts = Utils.parseTemplateParts('Hello @@name@@!', { scope: Utils.createScope(scope) });

      expect(parts.length).toBe(3);
      expect(parts[0].type).toBe('literal');
      expect(parts[0].source).toBe('Hello ');
      expect(parts[1].type).toBe('macro');
      expect(parts[1].source).toBe('@@name@@');
      expect(parts[2].type).toBe('literal');
      expect(parts[2].source).toBe('!');
    });

    it('parses template with only expression', () => {
      const scope = { value: 42 };
      const parts = Utils.parseTemplateParts('@@value@@', { scope: Utils.createScope(scope) });

      expect(parts.length).toBe(1);
      expect(parts[0].type).toBe('macro');
    });

    it('parses template with multiple expressions', () => {
      const scope = { a: 1, b: 2 };
      const parts = Utils.parseTemplateParts('@@a@@ + @@b@@', { scope: Utils.createScope(scope) });

      expect(parts.length).toBe(3);
      expect(parts[0].type).toBe('macro');
      expect(parts[1].type).toBe('literal');
      expect(parts[1].source).toBe(' + ');
      expect(parts[2].type).toBe('macro');
    });

    it('handles plain text (no templates)', () => {
      const parts = Utils.parseTemplateParts('Just plain text', { scope: Utils.createScope({}) });

      expect(parts.length).toBe(1);
      expect(parts[0].type).toBe('literal');
      expect(parts[0].source).toBe('Just plain text');
    });
  });

  describe('compileTemplateFromParts', () => {
    it('compiles simple template', () => {
      const scope = { name: 'World' };
      const parts = Utils.parseTemplateParts('Hello @@name@@!', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);

      expect(result).toBe('Hello World!');
    });

    it('compiles template with expressions', () => {
      const scope = { x: 5, y: 3 };
      const parts = Utils.parseTemplateParts('Result: @@x + y@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);

      expect(result).toBe('Result: 8');
    });

    it('compiles template with nested property access', () => {
      const scope = { user: { name: 'John' } };
      const parts = Utils.parseTemplateParts('User: @@user.name@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);

      expect(result).toBe('User: John');
    });

    it('compiles template with ternary operator', () => {
      const scopeTrue = { active: true };
      const scopeFalse = { active: false };

      const partsTrue = Utils.parseTemplateParts('@@active ? "Yes" : "No"@@', { scope: Utils.createScope(scopeTrue) });
      const partsFalse = Utils.parseTemplateParts('@@active ? "Yes" : "No"@@', { scope: Utils.createScope(scopeFalse) });

      expect(Utils.compileTemplateFromParts(partsTrue)).toBe('Yes');
      expect(Utils.compileTemplateFromParts(partsFalse)).toBe('No');
    });
  });

  describe('createTemplateMacro', () => {
    it('creates callable macro from expression', () => {
      const scope = { count: 10 };
      const macro = Utils.createTemplateMacro({
        body: 'count * 2',
        scope: Utils.createScope(scope),
      });

      expect(typeof macro).toBe('function');
      expect(macro()).toBe(20);
    });

    it('macro can access scope variables', () => {
      const scope = { name: 'Test', value: 42 };
      const macro = Utils.createTemplateMacro({
        body: 'name + ": " + value',
        scope: Utils.createScope(scope),
      });

      expect(macro()).toBe('Test: 42');
    });

    it('macro handles function calls', () => {
      const scope = {
        items: [1, 2, 3],
        sum: (arr) => arr.reduce((a, b) => a + b, 0),
      };
      const macro = Utils.createTemplateMacro({
        body: 'sum(items)',
        scope: Utils.createScope(scope),
      });

      expect(macro()).toBe(6);
    });
  });

  describe('createScope', () => {
    it('creates scope from single target', () => {
      const data = { name: 'John', age: 30 };
      const scope = Utils.createScope(data);

      expect(scope.name).toBe('John');
      expect(scope.age).toBe(30);
    });

    it('creates scope from multiple targets', () => {
      const local = { item: 'foo' };
      const parent = { name: 'bar' };
      const scope = Utils.createScope(local, parent);

      expect(scope.item).toBe('foo');
      expect(scope.name).toBe('bar');
    });

    it('prioritizes earlier targets', () => {
      const local = { value: 'local' };
      const parent = { value: 'parent' };
      const scope = Utils.createScope(local, parent);

      expect(scope.value).toBe('local');
    });

    it('handles undefined properties', () => {
      const data = { defined: true };
      const scope = Utils.createScope(data);

      expect(scope.defined).toBe(true);
      expect(scope.undefined).toBe(undefined);
    });
  });

  describe('complex nested expressions', () => {
    it('handles deeply nested property access', () => {
      const scope = {
        item: {
          nested: {
            deep: {
              property: 'found it',
            },
          },
        },
      };
      const parts = Utils.parseTemplateParts('@@item.nested.deep.property@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);

      expect(result).toBe('found it');
    });

    it('handles three levels of nesting', () => {
      const scope = {
        user: {
          profile: {
            settings: {
              theme: 'dark',
              notifications: {
                email: true,
              },
            },
          },
        },
      };
      const parts = Utils.parseTemplateParts('@@user.profile.settings.theme@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('dark');
    });

    it('handles nested objects within arrays', () => {
      const scope = {
        users: [
          { name: 'Alice', address: { city: 'NYC' } },
          { name: 'Bob', address: { city: 'LA' } },
        ],
      };
      const parts = Utils.parseTemplateParts('@@users[0].address.city@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('NYC');
    });
  });

  describe('array index access', () => {
    it('accesses array elements by index', () => {
      const scope = { items: ['first', 'second', 'third'] };
      const parts = Utils.parseTemplateParts('@@items[0]@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('first');
    });

    it('accesses nested properties of array elements', () => {
      const scope = {
        items: [
          { name: 'Item 1', price: 10 },
          { name: 'Item 2', price: 20 },
        ],
      };
      const parts = Utils.parseTemplateParts('@@items[1].name@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Item 2');
    });

    it('accesses array elements using dynamic index', () => {
      const scope = { items: ['a', 'b', 'c'], index: 2 };
      const parts = Utils.parseTemplateParts('@@items[index]@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('c');
    });

    it('handles computed index expressions', () => {
      const scope = { items: ['zero', 'one', 'two'], offset: 1 };
      const parts = Utils.parseTemplateParts('@@items[offset + 1]@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('two');
    });

    it('accesses last element using length', () => {
      const scope = { items: ['first', 'middle', 'last'] };
      const parts = Utils.parseTemplateParts('@@items[items.length - 1]@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('last');
    });
  });

  describe('arithmetic expressions', () => {
    it('performs addition', () => {
      const scope = { count: 5 };
      const parts = Utils.parseTemplateParts('@@count + 1@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(6);
    });

    it('performs addition with text context', () => {
      const scope = { count: 5 };
      const parts = Utils.parseTemplateParts('Count: @@count + 1@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Count: 6');
    });

    it('performs multiplication', () => {
      const scope = { price: 10, quantity: 3 };
      const parts = Utils.parseTemplateParts('@@price * quantity@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(30);
    });

    it('performs division', () => {
      const scope = { total: 100, count: 4 };
      const parts = Utils.parseTemplateParts('@@total / count@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(25);
    });

    it('performs subtraction', () => {
      const scope = { balance: 1000, spent: 250 };
      const parts = Utils.parseTemplateParts('@@balance - spent@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(750);
    });

    it('respects operator precedence', () => {
      const scope = { a: 2, b: 3, c: 4 };
      const parts = Utils.parseTemplateParts('@@a + b * c@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(14);
    });

    it('handles parentheses for grouping', () => {
      const scope = { a: 2, b: 3, c: 4 };
      const parts = Utils.parseTemplateParts('@@(a + b) * c@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(20);
    });

    it('performs modulo operation', () => {
      const scope = { value: 17, divisor: 5 };
      const parts = Utils.parseTemplateParts('@@value % divisor@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(2);
    });
  });

  describe('ternary expressions', () => {
    it('evaluates truthy condition', () => {
      const scope = { active: true };
      const parts = Utils.parseTemplateParts('@@active ? "yes" : "no"@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('yes');
    });

    it('evaluates falsy condition', () => {
      const scope = { active: false };
      const parts = Utils.parseTemplateParts('@@active ? "yes" : "no"@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('no');
    });

    it('evaluates comparison in condition', () => {
      const scope = { count: 15 };
      const parts = Utils.parseTemplateParts('@@count > 10 ? "many" : "few"@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('many');
    });

    it('handles nested ternary expressions', () => {
      const scope = { value: 5 };
      const parts = Utils.parseTemplateParts('@@value < 0 ? "negative" : (value === 0 ? "zero" : "positive")@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('positive');
    });

    it('returns dynamic values from ternary', () => {
      const scope = { useFirst: true, first: 'Alpha', second: 'Beta' };
      const parts = Utils.parseTemplateParts('@@useFirst ? first : second@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Alpha');
    });
  });

  describe('function calls in expressions', () => {
    it('calls simple function', () => {
      const scope = {
        formatDate: (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        date: new Date(2026, 1, 7),
      };
      const parts = Utils.parseTemplateParts('@@formatDate(date)@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('2026-2-7');
    });

    it('calls method on object', () => {
      const scope = { text: 'hello world' };
      const parts = Utils.parseTemplateParts('@@text.toUpperCase()@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('HELLO WORLD');
    });

    it('chains method calls', () => {
      const scope = { text: '  hello world  ' };
      const parts = Utils.parseTemplateParts('@@text.trim().toUpperCase()@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('HELLO WORLD');
    });

    it('calls function with multiple arguments', () => {
      const scope = {
        add: (a, b, c) => a + b + c,
        x: 1,
        y: 2,
        z: 3,
      };
      const parts = Utils.parseTemplateParts('@@add(x, y, z)@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(6);
    });

    it('calls array methods', () => {
      const scope = { items: [1, 2, 3, 4, 5] };
      const parts = Utils.parseTemplateParts('@@items.filter((x) => x > 2).length@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(3);
    });

    it('calls nested object method', () => {
      const scope = {
        item: {
          date: new Date(2026, 0, 15),
        },
      };
      const parts = Utils.parseTemplateParts('@@item.date.getFullYear()@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(2026);
    });
  });

  describe('undefined and null handling', () => {
    it('returns original source for missing property (error caught internally)', () => {
      const scope = {};
      const originalConsoleError = console.error;
      console.error = () => {};

      const parts = Utils.parseTemplateParts('@@missing@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      // Errors are caught and part.source is returned
      expect(result).toBe('@@missing@@');

      console.error = originalConsoleError;
    });

    it('handles null value in scope by filtering it out', () => {
      const scope = { value: null };
      const parts = Utils.parseTemplateParts('@@value@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      // null gets filtered out by .filter((item) => (item != null && item !== ''))
      expect(result).toBeUndefined();
    });

    it('handles null in nested access gracefully with optional chaining', () => {
      const scope = { user: null };
      const parts = Utils.parseTemplateParts('@@user?.name@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      // Optional chaining returns undefined which gets filtered
      expect(result).toBeUndefined();
    });

    it('handles undefined nested property with optional chaining', () => {
      const scope = { user: {} };
      const parts = Utils.parseTemplateParts('@@user?.profile?.name@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      expect(result).toBeUndefined();
    });

    it('provides fallback via nullish coalescing', () => {
      const scope = { value: null };
      const parts = Utils.parseTemplateParts('@@value ?? "default"@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('default');
    });

    it('provides fallback via OR operator', () => {
      const scope = { value: '' };
      const parts = Utils.parseTemplateParts('@@value || "fallback"@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('fallback');
    });
  });

  describe('DynamicProperty in templates', () => {
    it('extracts value from DynamicProperty via proxy', () => {
      const prop = new DynamicProperty('dynamic value');
      const scope = { dynamicProp: prop };
      const parts = Utils.parseTemplateParts('@@dynamicProp@@', { scope: Utils.createScope(scope) });
      // DynamicProperty is accessed via Proxy - returns the proxy itself
      const result = Utils.compileTemplateFromParts(parts);
      // Check that we get the DynamicProperty or its value
      expect(result instanceof DynamicProperty || result === 'dynamic value').toBe(true);
    });

    it('accesses valueOf on DynamicProperty', () => {
      const prop = new DynamicProperty('dynamic value');
      const scope = { dynamicProp: prop };
      const parts = Utils.parseTemplateParts('@@dynamicProp.valueOf()@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('dynamic value');
    });

    it('accesses nested DynamicProperty values', () => {
      const prop = new DynamicProperty({ name: 'John', age: 30 });
      const scope = { user: prop };
      const parts = Utils.parseTemplateParts('@@user.name@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('John');
    });

    it('performs arithmetic on DynamicProperty numeric values', () => {
      const prop = new DynamicProperty(10);
      const scope = { count: prop };
      const parts = Utils.parseTemplateParts('@@count + 5@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(15);
    });

    it('works with DynamicProperty in text context', () => {
      const prop = new DynamicProperty(10);
      const scope = { count: prop };
      const parts = Utils.parseTemplateParts('Count: @@count + 5@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Count: 15');
    });
  });

  describe('multiple expressions in one string', () => {
    it('handles two expressions', () => {
      const scope = { first: 'Hello', second: 'World' };
      const parts = Utils.parseTemplateParts('@@first@@ @@second@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Hello World');
    });

    it('handles three expressions with text between', () => {
      const scope = { name: 'John', age: 30, city: 'NYC' };
      const parts = Utils.parseTemplateParts('@@name@@ is @@age@@ years old from @@city@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('John is 30 years old from NYC');
    });

    it('handles expressions with different types', () => {
      const scope = { str: 'text', num: 42, bool: true };
      const parts = Utils.parseTemplateParts('@@str@@ | @@num@@ | @@bool@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('text | 42 | true');
    });

    it('handles adjacent expressions without separator', () => {
      const scope = { a: 'Hello', b: 'World' };
      const parts = Utils.parseTemplateParts('@@a@@@@b@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('HelloWorld');
    });
  });

  describe('edge cases', () => {
    it('treats empty expression as literal (requires at least one character)', () => {
      // The regex requires .+? which means at least one character between @@ and @@
      const parts = Utils.parseTemplateParts('@@@@', { scope: Utils.createScope({}) });
      expect(parts.length).toBe(1);
      expect(parts[0].type).toBe('literal');
      expect(parts[0].source).toBe('@@@@');
    });

    it('handles whitespace in expression', () => {
      const scope = { value: 'test' };
      const parts = Utils.parseTemplateParts('@@  value  @@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('test');
    });

    it('does not handle newlines within expressions (regex limitation)', () => {
      // Newlines break the regex pattern, so expression is not matched
      const scope = { a: 1, b: 2 };
      const parts = Utils.parseTemplateParts('@@a\n+\nb@@', { scope: Utils.createScope(scope) });
      // Returns literal since regex uses .+? which does not match newlines
      expect(parts[0].type).toBe('literal');
    });

    it('handles expression with only whitespace', () => {
      const scope = {};
      const parts = Utils.parseTemplateParts('@@   @@', { scope: Utils.createScope(scope) });
      // Whitespace is valid - creates a macro that evaluates whitespace
      expect(parts.length).toBe(1);
      expect(parts[0].type).toBe('macro');
    });

    it('handles single @ symbols without matching', () => {
      expect(Utils.isTemplate('Hello @ world')).toBe(false);
      expect(Utils.isTemplate('@single@')).toBe(false);
    });

    it('handles escaped quotes in strings', () => {
      const scope = {};
      const parts = Utils.parseTemplateParts('@@"hello \\"world\\""@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('hello "world"');
    });

    it('handles template literals in expression', () => {
      const scope = { name: 'John' };
      const parts = Utils.parseTemplateParts('@@`Hello ${name}`@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Hello John');
    });
  });

  describe('error handling', () => {
    it('throws syntax errors during macro creation (parseTemplateParts)', () => {
      const scope = {};
      const originalConsoleError = console.error;
      console.error = () => {};

      // Syntax errors are thrown when creating the macro (new Function)
      // during parseTemplateParts, not during compileTemplateFromParts
      expect(() => {
        Utils.parseTemplateParts('@@invalid syntax here@@', { scope: Utils.createScope(scope) });
      }).toThrow();

      console.error = originalConsoleError;
    });

    it('catches reference errors and returns original source', () => {
      const scope = {};
      const originalConsoleError = console.error;
      console.error = () => {};

      const parts = Utils.parseTemplateParts('@@undefinedVariable@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      expect(result).toBe('@@undefinedVariable@@');

      console.error = originalConsoleError;
    });

    it('catches type errors and returns original source', () => {
      const scope = { value: null };
      const originalConsoleError = console.error;
      console.error = () => {};

      const parts = Utils.parseTemplateParts('@@value.property@@', { scope: Utils.createScope(scope) });
      const result = Utils.compileTemplateFromParts(parts);
      expect(result).toBe('@@value.property@@');

      console.error = originalConsoleError;
    });

    it('logs error details when macro fails', () => {
      const scope = {};
      let errorLogged = false;
      const originalConsoleError = console.error;
      console.error = () => {
        errorLogged = true;
      };

      const parts = Utils.parseTemplateParts('@@badExpression@@', { scope: Utils.createScope(scope) });
      Utils.compileTemplateFromParts(parts);

      console.error = originalConsoleError;
      expect(errorLogged).toBe(true);
    });
  });

  describe('scope resolution priority', () => {
    it('local scope takes priority over parent scope', () => {
      const local = { value: 'local' };
      const parent = { value: 'parent', other: 'fromParent' };
      const scope = Utils.createScope(local, parent);

      const parts1 = Utils.parseTemplateParts('@@value@@', { scope });
      expect(Utils.compileTemplateFromParts(parts1)).toBe('local');

      const parts2 = Utils.parseTemplateParts('@@other@@', { scope });
      expect(Utils.compileTemplateFromParts(parts2)).toBe('fromParent');
    });

    it('accesses parent scope when local does not have property', () => {
      const local = { localOnly: 'here' };
      const parent = { parentOnly: 'there' };
      const scope = Utils.createScope(local, parent);

      const parts = Utils.parseTemplateParts('@@parentOnly@@', { scope });
      expect(Utils.compileTemplateFromParts(parts)).toBe('there');
    });

    it('handles three levels of scope', () => {
      const innermost = { a: 1 };
      const middle = { b: 2 };
      const outermost = { c: 3 };
      const scope = Utils.createScope(innermost, middle, outermost);

      expect(scope.a).toBe(1);
      expect(scope.b).toBe(2);
      expect(scope.c).toBe(3);
    });

    it('first scope wins for shadowed properties', () => {
      const first = { x: 'first' };
      const second = { x: 'second' };
      const third = { x: 'third' };
      const scope = Utils.createScope(first, second, third);

      const parts = Utils.parseTemplateParts('@@x@@', { scope });
      expect(Utils.compileTemplateFromParts(parts)).toBe('first');
    });
  });

  describe('comparison and logical operators', () => {
    it('handles equality comparison', () => {
      const scope = { a: 5, b: 5 };
      const parts = Utils.parseTemplateParts('@@a === b@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('handles inequality comparison', () => {
      const scope = { a: 5, b: 10 };
      const parts = Utils.parseTemplateParts('@@a !== b@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('handles logical AND', () => {
      const scope = { a: true, b: true };
      const parts = Utils.parseTemplateParts('@@a && b@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('handles logical OR', () => {
      const scope = { a: false, b: true };
      const parts = Utils.parseTemplateParts('@@a || b@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('handles logical NOT', () => {
      const scope = { active: false };
      const parts = Utils.parseTemplateParts('@@!active@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('handles greater than / less than', () => {
      const scope = { x: 10, y: 5 };
      const partsGt = Utils.parseTemplateParts('@@x > y@@', { scope: Utils.createScope(scope) });
      const partsLt = Utils.parseTemplateParts('@@x < y@@', { scope: Utils.createScope(scope) });

      expect(Utils.compileTemplateFromParts(partsGt)).toBe(true);
      expect(Utils.compileTemplateFromParts(partsLt)).toBe(false);
    });

    it('handles compound conditions', () => {
      const scope = { age: 25 };
      const parts = Utils.parseTemplateParts('@@age >= 18 && age < 65@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });

    it('stringifies boolean when mixed with text', () => {
      const scope = { active: true };
      const parts = Utils.parseTemplateParts('Status: @@active@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Status: true');
    });
  });

  describe('string operations', () => {
    it('concatenates strings', () => {
      const scope = { first: 'Hello', last: 'World' };
      const parts = Utils.parseTemplateParts('@@first + " " + last@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Hello World');
    });

    it('accesses string length', () => {
      const scope = { text: 'Hello' };
      const parts = Utils.parseTemplateParts('@@text.length@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(5);
    });

    it('uses string methods', () => {
      const scope = { text: 'Hello World' };
      const parts = Utils.parseTemplateParts('@@text.split(" ").join("-")@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Hello-World');
    });

    it('uses substring', () => {
      const scope = { text: 'Hello World' };
      const parts = Utils.parseTemplateParts('@@text.substring(0, 5)@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe('Hello');
    });

    it('uses includes', () => {
      const scope = { text: 'Hello World' };
      const parts = Utils.parseTemplateParts('@@text.includes("World")@@', { scope: Utils.createScope(scope) });
      expect(Utils.compileTemplateFromParts(parts)).toBe(true);
    });
  });
});
