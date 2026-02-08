# BaseUtils

The `BaseUtils` namespace provides foundational utility functions for type checking, ID generation, string manipulation, and primitive operations.

```javascript
import { BaseUtils } from 'mythix-ui-core';
```

## Type Checking

### `typeOf(value)`

Returns a string representing the type of the value. More robust than `typeof`.

```javascript
BaseUtils.typeOf(null);           // ''
BaseUtils.typeOf(undefined);      // ''
BaseUtils.typeOf(NaN);            // ''
BaseUtils.typeOf(42);             // '::Number'
BaseUtils.typeOf('hello');        // '::String'
BaseUtils.typeOf(true);           // '::Boolean'
BaseUtils.typeOf([]);             // '::Array'
BaseUtils.typeOf({});             // '::Object'
BaseUtils.typeOf(new Map());      // '::Map'
BaseUtils.typeOf(new Set());      // '::Set'
BaseUtils.typeOf(() => {});       // '::Function'
BaseUtils.typeOf(Symbol('x'));    // '::Symbol'
BaseUtils.typeOf(BigInt(42));     // '::BigInt'
BaseUtils.typeOf(Infinity);       // '::Number'
```

**Type naming conventions:**
- `::TypeName` - Built-in JavaScript types (e.g., `::String`, `::Array`)
- `TypeName` - Custom/user-defined types (e.g., `MyClass`)
- `[Class ::TypeName]` - Built-in constructors (e.g., `[Class ::Map]`)
- `[Class TypeName]` - Custom constructors (e.g., `[Class MyClass]`)

### `isType(value, ...types)`

Check if a value matches any of the provided types. More robust than `instanceof`.

```javascript
// Type name strings
BaseUtils.isType([], '::Array');           // true
BaseUtils.isType('hello', '::String');     // true
BaseUtils.isType(42, '::Number');          // true

// Constructor functions
BaseUtils.isType([], Array);               // true
BaseUtils.isType(new Map(), Map);          // true

// Multiple types
BaseUtils.isType(value, '::String', '::Number'); // true if either
```

### `isPlainObject(value)`

Check if a value is a plain object (created via `{}` or `Object.create(null)`).

```javascript
BaseUtils.isPlainObject({});                    // true
BaseUtils.isPlainObject(new Object());          // true
BaseUtils.isPlainObject(Object.create(null));   // true
BaseUtils.isPlainObject([]);                    // false
BaseUtils.isPlainObject(new Map());             // false
BaseUtils.isPlainObject(new MyClass());         // false
```

### `isPrimitive(value)`

Check if a value is a JavaScript primitive.

```javascript
BaseUtils.isPrimitive('hello');     // true
BaseUtils.isPrimitive(42);          // true
BaseUtils.isPrimitive(true);        // true
BaseUtils.isPrimitive(Symbol('x')); // true
BaseUtils.isPrimitive(BigInt(1));   // true
BaseUtils.isPrimitive(null);        // false
BaseUtils.isPrimitive(undefined);   // false
BaseUtils.isPrimitive(NaN);         // false
BaseUtils.isPrimitive({});          // false
```

### `isValidNumber(value)`

Check if a value is a finite number (not `NaN`, `Infinity`, or `-Infinity`).

```javascript
BaseUtils.isValidNumber(42);        // true
BaseUtils.isValidNumber(3.14);      // true
BaseUtils.isValidNumber(-100);      // true
BaseUtils.isValidNumber(NaN);       // false
BaseUtils.isValidNumber(Infinity);  // false
BaseUtils.isValidNumber(-Infinity); // false
BaseUtils.isValidNumber('42');      // false (string)
```

### `isCollectable(value)`

Check if a value can be used as a WeakMap key (is garbage-collectable).

```javascript
BaseUtils.isCollectable({});           // true
BaseUtils.isCollectable([]);           // true
BaseUtils.isCollectable(function(){}); // true
BaseUtils.isCollectable('string');     // false (primitive)
BaseUtils.isCollectable(42);           // false (primitive)
BaseUtils.isCollectable(null);         // false
BaseUtils.isCollectable(Symbol());     // false
```

## Empty Value Checking

### `isNOE(value)`

Check if a value is **N**ull **O**r **E**mpty.

```javascript
BaseUtils.isNOE(null);         // true
BaseUtils.isNOE(undefined);    // true
BaseUtils.isNOE('');           // true
BaseUtils.isNOE('   ');        // true (whitespace only)
BaseUtils.isNOE([]);           // true (empty array)
BaseUtils.isNOE({});           // true (empty plain object)
BaseUtils.isNOE(NaN);          // true
BaseUtils.isNOE(0);            // false (zero is not empty)
BaseUtils.isNOE(false);        // false (boolean is not empty)
BaseUtils.isNOE('text');       // false
BaseUtils.isNOE([1, 2]);       // false
```

### `isNotNOE(value)`

Inverse of `isNOE()`.

```javascript
BaseUtils.isNotNOE('hello');   // true
BaseUtils.isNotNOE([1, 2]);    // true
BaseUtils.isNotNOE(null);      // false
BaseUtils.isNotNOE('');        // false
```

## ID Generation

### `generateID()`

Generate a unique ID string.

```javascript
const id = BaseUtils.generateID();
// Returns: 'ID17041430271790000000000000000007'
```

Format: `ID` + `Date.now()` + zero-padded BigInt counter (19 digits)

### `getObjectID(value)`

Get a unique ID for any garbage-collectable object. Returns the same ID for the same object.

```javascript
const obj = { name: 'test' };
const id1 = BaseUtils.getObjectID(obj); // 'ID17041430271790000000000000000008'
const id2 = BaseUtils.getObjectID(obj); // Same ID
const id3 = BaseUtils.getObjectID({}); // Different ID
```

Uses a WeakMap internally, so IDs are garbage-collected with their objects.

## String Manipulation

### `toCamelCase(value)`

Convert a string to camelCase.

```javascript
BaseUtils.toCamelCase('hello-world');      // 'helloWorld'
BaseUtils.toCamelCase('hello_world');      // 'helloWorld'
BaseUtils.toCamelCase('HelloWorld');       // 'helloWorld'
BaseUtils.toCamelCase('--foo-bar--');      // 'fooBar'
BaseUtils.toCamelCase('some_value_here');  // 'someValueHere'
```

### `toSnakeCase(value)`

Convert a string to snake_case.

```javascript
BaseUtils.toSnakeCase('helloWorld');       // 'hello_world'
BaseUtils.toSnakeCase('HelloWorld');       // 'hello_world'
BaseUtils.toSnakeCase('helloWorldTest');   // 'hello_world_test'
BaseUtils.toSnakeCase('XMLParser');        // 'xml_parser'
```

### `toKebabCase(value)`

Convert a string to kebab-case.

```javascript
BaseUtils.toKebabCase('helloWorld');       // 'hello-world'
BaseUtils.toKebabCase('HelloWorld');       // 'hello-world'
BaseUtils.toKebabCase('XMLParser');        // 'xml-parser'
BaseUtils.toKebabCase('someValueHere');    // 'some-value-here'
```

## Value Coercion

### `coerce(value)`

Coerce a string to its most likely underlying type.

```javascript
BaseUtils.coerce('null');       // null
BaseUtils.coerce('undefined');  // undefined
BaseUtils.coerce('NaN');        // NaN
BaseUtils.coerce('Infinity');   // Infinity
BaseUtils.coerce('-Infinity');  // -Infinity
BaseUtils.coerce('true');       // true
BaseUtils.coerce('false');      // false
BaseUtils.coerce('42');         // 42 (number)
BaseUtils.coerce('3.14');       // 3.14 (number)
BaseUtils.coerce('1e10');       // 10000000000 (number)
BaseUtils.coerce('hello');      // 'hello' (unchanged)
```

## Async Utilities

### `createResolvable()`

Create a Promise that can be resolved/rejected externally.

```javascript
const promise = BaseUtils.createResolvable();

// Properties:
promise.resolve(value);  // Resolve the promise
promise.reject(error);   // Reject the promise
promise.status();        // 'pending', 'fulfilled', or 'rejected'
promise.id;              // Unique ID for this promise

// Usage:
async function example() {
  const done = BaseUtils.createResolvable();

  setTimeout(() => done.resolve('finished!'), 1000);

  const result = await done;
  console.log(result); // 'finished!'
}
```

### `nextTick(callback)`

Schedule a callback to run as soon as possible (like Node's `process.nextTick`).

```javascript
BaseUtils.nextTick(() => {
  console.log('Runs soon');
});
console.log('Runs first');

// Output:
// 'Runs first'
// 'Runs soon'
```

Uses `process.nextTick` (Node.js), `requestAnimationFrame` (browser), or Promise-based fallback.

## Hashing

### `SHA256(input)`

Compute SHA256 hash of a string.

```javascript
const hash = BaseUtils.SHA256('hello world');
// Returns: 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
```

## Example: Form Validation Utilities

```javascript
import { BaseUtils } from 'mythix-ui-core';

function validateForm(data) {
  const errors = {};

  // Check required fields
  if (BaseUtils.isNOE(data.name)) {
    errors.name = 'Name is required';
  }

  if (BaseUtils.isNOE(data.email)) {
    errors.email = 'Email is required';
  }

  // Validate number field
  const age = BaseUtils.coerce(data.age);
  if (!BaseUtils.isValidNumber(age)) {
    errors.age = 'Age must be a valid number';
  } else if (age < 0 || age > 150) {
    errors.age = 'Age must be between 0 and 150';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function normalizeConfig(config) {
  // Ensure we have a plain object
  if (!BaseUtils.isPlainObject(config)) {
    throw new Error('Config must be a plain object');
  }

  // Normalize keys to camelCase
  const normalized = {};
  for (const [key, value] of Object.entries(config)) {
    normalized[BaseUtils.toCamelCase(key)] = value;
  }

  return normalized;
}
```

## Example: Type Guards

```javascript
import { BaseUtils } from 'mythix-ui-core';

function processInput(input) {
  if (BaseUtils.isType(input, '::Array')) {
    return input.map(item => processInput(item));
  }

  if (BaseUtils.isType(input, '::String')) {
    return input.trim().toLowerCase();
  }

  if (BaseUtils.isType(input, '::Number')) {
    return Math.round(input * 100) / 100;
  }

  if (BaseUtils.isPlainObject(input)) {
    const result = {};
    for (const [key, value] of Object.entries(input)) {
      result[key] = processInput(value);
    }
    return result;
  }

  return input;
}
```

## See Also

- [Utils](./utils.md) - Higher-level utility functions
- [DynamicProperty](./dynamic-property.md) - Uses `isType` for type checking
- [MythixUIComponent](./mythix-ui-component.md) - Uses various BaseUtils internally
