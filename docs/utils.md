# Utils

The `Utils` namespace provides higher-level utility functions for metadata storage, scope management, template processing, and global state.

```javascript
import { Utils } from 'mythix-ui-core';
```

## Metadata Storage

### `metadata(target, key?, value?)`

Store and retrieve metadata on any garbage-collectable object using a WeakMap.

```javascript
const element = document.createElement('div');

// Set metadata
Utils.metadata(element, 'customData', { foo: 'bar' });

// Get metadata
const data = Utils.metadata(element, 'customData');
console.log(data); // { foo: 'bar' }

// Get all metadata for an object
const allMeta = Utils.metadata(element);
console.log(allMeta); // Map { 'customData' => { foo: 'bar' } }
```

**Behavior by argument count:**
- 1 arg: Get all metadata as a Map
- 2 args: Get specific key value
- 3+ args: Set value, return target

## Scope Management

### `createScope(...targets)`

Create a Proxy that searches multiple targets for property access. Used by the template engine for variable resolution.

```javascript
const component = { name: 'test', value: 42 };
const localData = { item: 'foo', index: 0 };

const scope = Utils.createScope(localData, component);

console.log(scope.item);   // 'foo' (from localData)
console.log(scope.name);   // 'test' (from component)
console.log(scope.value);  // 42 (from component)
```

**Search order:**
1. Provided targets (in order)
2. Parent DOM nodes (if target is an Element)
3. `globalThis.mythixUI.globalScope`

**Special fallback values:**
- `globalScope` - The global Mythix UI scope
- `i18n` - The i18n lookup function
- `dynamicPropID` - The dynamic property ID function

### `getParentNode(element)`

Get the parent node, crossing Shadow DOM boundaries for Mythix components.

```javascript
const parent = Utils.getParentNode(element);
// Returns parent, even if element is in Shadow DOM
```

## Template Processing

### `parseTemplateParts(text, options)`

Parse a template string into parts.

```javascript
const parts = Utils.parseTemplateParts('Hello @@name@@!', { scope });
// Returns:
// [
//   { type: 'literal', source: 'Hello ', start: 0, end: 6 },
//   { type: 'macro', source: '@@name@@', macro: Function, start: 6, end: 14 },
//   { type: 'literal', source: '!', start: 14, end: 15 },
// ]
```

### `compileTemplateFromParts(parts)`

Compile parsed template parts into a result.

```javascript
const result = Utils.compileTemplateFromParts(parts);
// Returns: 'Hello John!' (if name is 'John')
```

### `createTemplateMacro({ body, scope, prefix? })`

Create a function from template expression body.

```javascript
const macro = Utils.createTemplateMacro({
  body: 'count * 2',
  scope: componentScope,
});

const result = macro(); // Returns evaluated expression
```

### `formatNodeValue(node, options)`

Format a text or attribute node's value, processing template expressions.

```javascript
const formattedValue = Utils.formatNodeValue(textNode, {
  scope: componentScope,
  bindToDynamicProperties: true,
});
```

### `isTemplate(value)`

Check if a string contains template syntax.

```javascript
Utils.isTemplate('Hello @@name@@'); // true
Utils.isTemplate('Hello world');     // false
```

## Event Handling

Mythix UI uses the `data-event-on{eventName}` attribute pattern for event binding.

### `bindDataEventAttribute(element, eventName)`

Bind a `data-event-on{eventName}` attribute to an element. The element must have the corresponding attribute set.

```javascript
// HTML: <button data-event-onclick="handleClick">Click</button>
Utils.bindDataEventAttribute(button, 'click');
```

### `bindAllDataEventAttributes(element)`

Detect and bind all `data-event-on*` attributes on an element.

```javascript
// HTML: <input data-event-oninput="handleInput" data-event-onfocus="handleFocus">
Utils.bindAllDataEventAttributes(inputElement);
```

### `createScanningProxy(startElement)`

Create a proxy that scans the DOM for property lookups. Starts from the element and scans up via `parentElement`, crossing Shadow DOM boundaries, stopping at MythixComponent boundaries.

```javascript
const proxy = Utils.createScanningProxy(element);
// Accessing proxy.myMethod will scan up the DOM to find 'myMethod'
```

### `mythixEventWrapper(event)`

Generic event wrapper function for `data-event-on{eventName}` attributes. Called with `this` bound to the element with the attribute.

```javascript
// Typically bound automatically, but can be used manually:
element.addEventListener('click', Utils.mythixEventWrapper.bind(element));
```

### `bindEventToElement(element, eventName, callback)` *(Deprecated)*

> **Deprecated:** Use `data-event-on{eventName}` attributes with `bindDataEventAttribute` instead.

### `getAllEventNamesForElement(element)` *(Deprecated)*

> **Deprecated:** Use `data-event-on{eventName}` attributes instead of detecting standard `on*` attributes.

## Property Path Access

### `fetchPath(obj, key, defaultValue)`

Access nested properties by dot-separated path.

```javascript
const user = { profile: { name: 'John', address: { city: 'NYC' } } };

Utils.fetchPath(user, 'profile.name', 'Unknown');         // 'John'
Utils.fetchPath(user, 'profile.address.city', 'Unknown'); // 'NYC'
Utils.fetchPath(user, 'profile.missing', 'Unknown');      // 'Unknown'
```

### `getAllPropertyNames(obj)`

Get all property names from an object and its prototype chain.

```javascript
const names = Utils.getAllPropertyNames(myObject);
// Returns: ['prop1', 'prop2', 'method1', ...]
```

## Dynamic Properties

### `defineDynamicProp(name, defaultValue, setter?)`

Define a dynamic property on `this`.

```javascript
// Called with component as `this`
Utils.defineDynamicProp.call(this, 'count', 0);

// With custom setter
Utils.defineDynamicProp.call(this, 'items', [], (newValue) => {
  return Array.isArray(newValue) ? newValue : [newValue];
});
```

### `dynamicPropID(id, setValue?)`

Get or create a globally shared dynamic property by ID.

```javascript
// Get or create
const theme = Utils.dynamicPropID('currentTheme', 'light');

// Just get (create if needed)
const theme2 = Utils.dynamicPropID('currentTheme');

// Set value
Utils.dynamicPropID('currentTheme')[DynamicProperty.set]('dark');
```

### `getDynamicPropertyForPath(keyPath, defaultValue)`

Get a dynamic property for a specific path (used by i18n).

```javascript
const prop = Utils.getDynamicPropertyForPath.call(this, 'global.i18n.greeting', 'Hello');
```

## Global Store

### `globalStore(...args)`

Store a value in the global Mythix UI scope.

```javascript
// With explicit name
Utils.globalStore.call(this, 'myComponent', componentInstance);

// Using component identifier
Utils.globalStore.call(this, componentInstance);
```

### `globalStoreDynamic(...args)`

Store a value as a dynamic property in the global scope.

```javascript
Utils.globalStoreDynamic.call(this, 'currentUser', { name: 'John' });
// Accessible as: globalThis.mythixUI.globalScope.currentUser
```

### `globalStoreNameValuePairHelper(target, name, value)`

Helper for associating name-value pairs with objects for global storage.

```javascript
const element = Utils.globalStoreNameValuePairHelper(someElement, 'myKey', myValue);
Utils.globalStore.call(component, element); // Uses 'myKey' as the storage key
```

## DOM Utilities

### `specialClosest(node, selector)`

Find closest ancestor matching selector, crossing Shadow DOM boundaries.

```javascript
const provider = Utils.specialClosest(element, 'mythix-language-provider');
```

### `getDisableTemplateEngineSelector()`

Get the selector for elements that disable template processing.

```javascript
const selector = Utils.getDisableTemplateEngineSelector();
// Returns: '[data-templates-disable],mythix-for-each,...'
```

### `registerDisableTemplateEngineSelector(selector)`

Register a selector to disable template processing.

```javascript
Utils.registerDisableTemplateEngineSelector('my-code-block');
```

### `unregisterDisableTemplateEngineSelector(selector)`

Remove a registered disable selector.

```javascript
Utils.unregisterDisableTemplateEngineSelector('my-code-block');
```

## Storage

### `storage`

Persistent storage helper for localStorage/sessionStorage.

```javascript
// Set a value
Utils.storage.set('localStorage', 'user', 'preferences', { theme: 'dark' });

// Get a value
const prefs = Utils.storage.get('localStorage', 'user', 'preferences');

// Delete a value
Utils.storage.set('localStorage', 'user', 'preferences', undefined);

// Get metadata
const meta = Utils.storage.getMeta('localStorage', 'user', 'preferences');
// Returns: { operation, parentScope, scope }
```

**Storage structure:**
- Values are wrapped in `StorageItem` with created/updated timestamps
- Stored under the key `'mythix-ui'` in the storage engine
- Supports nested paths

## Async Utilities

### `sleep(ms)`

Promise-based sleep function.

```javascript
await Utils.sleep(1000); // Wait 1 second
await Utils.sleep();     // Yield (0ms)
```

## Method Binding

### `bindMethods(proto, skipProtos?)`

Bind all methods in a prototype chain to `this`.

```javascript
Utils.bindMethods.call(this, MyClass.prototype);
```

### `getDescriptorFromPrototypeChain(proto, name)`

Find a property descriptor in the prototype chain.

```javascript
const { prototype, descriptor } = Utils.getDescriptorFromPrototypeChain(
  Object.getPrototypeOf(this),
  'someMethod'
);
```

## Example: Custom Scope for Iteration

```javascript
import { Utils } from 'mythix-ui-core';

class ItemList extends MythixUIComponent {
  renderItems() {
    const items = this.items.valueOf();

    items.forEach((item, index) => {
      // Create a scope with iteration variables
      const itemScope = Utils.createScope(
        { item, index },
        this.$$ // Component scope
      );

      // Process template with this scope
      const template = this.getItemTemplate();
      const content = this.processTemplateWithScope(template, itemScope);
      this.shadow.appendChild(content);
    });
  }
}
```

## Example: Nested Property Access

```javascript
import { Utils } from 'mythix-ui-core';

class ConfigManager extends MythixUIComponent {
  getConfig(path, defaultValue) {
    return Utils.fetchPath(this.config.valueOf(), path, defaultValue);
  }

  setConfig(path, value) {
    const config = { ...this.config.valueOf() };
    const parts = path.split('.');
    let current = config;

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }

    current[parts[parts.length - 1]] = value;
    this.config = config;
  }
}

// Usage
manager.setConfig('ui.theme.primary', '#007bff');
manager.getConfig('ui.theme.primary', '#000'); // '#007bff'
```

## See Also

- [BaseUtils](./base-utils.md) - Lower-level utility functions
- [DynamicProperty](./dynamic-property.md) - Reactive values
- [Template Engine](./template-engine.md) - Template processing
- [MythixUIComponent](./mythix-ui-component.md) - Component utilities
