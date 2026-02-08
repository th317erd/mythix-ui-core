# DynamicProperty

`DynamicProperty` is a reactive value wrapper that automatically triggers updates when its value changes. It's the foundation of Mythix UI's reactivity system, enabling automatic UI updates when data changes.

```javascript
import { DynamicProperty } from 'mythix-ui-core';
```

## Overview

DynamicProperty extends `EventTarget` and uses a Proxy to provide transparent access to the underlying value. When the value changes, it dispatches an `update` event that template bindings listen to for re-rendering.

## Creating Dynamic Properties

### Direct Construction

```javascript
const counter = new DynamicProperty(0);
const user = new DynamicProperty({ name: 'John', age: 30 });
const items = new DynamicProperty([]);
```

### Within Components

```javascript
class MyComponent extends MythixUIComponent {
  constructor() {
    super();
    // Creates a property accessible as this.count
    this.defineDynamicProp('count', 0);
    this.defineDynamicProp('items', []);
  }
}
```

## Setting Values

### Using the `DynamicProperty.set` Symbol

```javascript
const prop = new DynamicProperty('initial');

// Set a new value (triggers update event)
prop[DynamicProperty.set]('new value');

// Or use the static getter
prop[DynamicProperty.set]('another value');
```

### Component Property Assignment

When using `defineDynamicProp`, you can assign directly:

```javascript
// These are equivalent
this.count = 5;
this.count[DynamicProperty.set](5);
```

## Getting Values

### Using `valueOf()`

Since DynamicProperty is Proxy-wrapped, access the raw value with `valueOf()`:

```javascript
const prop = new DynamicProperty(42);
console.log(prop.valueOf()); // 42

// For objects
const user = new DynamicProperty({ name: 'John' });
console.log(user.valueOf()); // { name: 'John' }
```

### Direct Property Access

The Proxy forwards property access to the underlying value:

```javascript
const user = new DynamicProperty({ name: 'John', age: 30 });
console.log(user.name); // 'John' (via Proxy)
console.log(user.age);  // 30 (via Proxy)
```

### String Coercion

DynamicProperty implements `toString()` for string contexts:

```javascript
const greeting = new DynamicProperty('Hello');
console.log(`${greeting}`);  // 'Hello'
console.log('' + greeting);  // 'Hello'
```

## Listening for Changes

### Adding Event Listeners

```javascript
const counter = new DynamicProperty(0);

counter.addEventListener('update', (event) => {
  console.log(`Changed from ${event.oldValue} to ${event.value}`);
});

counter[DynamicProperty.set](1);
// Logs: "Changed from 0 to 1"
```

### Event Details

The `update` event includes:
- `event.value` - The new value
- `event.oldValue` - The previous value

```javascript
prop.addEventListener('update', (event) => {
  const { value, oldValue } = event;
  console.log('Old:', oldValue);
  console.log('New:', value);
});
```

### Removing Listeners

```javascript
const handler = (event) => console.log(event.value);
prop.addEventListener('update', handler);

// Later...
prop.removeEventListener('update', handler);
```

## Type Checking

### Using `instanceof`

```javascript
if (value instanceof DynamicProperty) {
  // It's a DynamicProperty
}
```

### Using `isType`

```javascript
import { BaseUtils, DynamicProperty } from 'mythix-ui-core';

if (BaseUtils.isType(value, DynamicProperty)) {
  // It's a DynamicProperty
}
```

### Using Symbols

```javascript
import { MYTHIX_TYPE, DYNAMIC_PROPERTY_TYPE } from 'mythix-ui-core';

if (value[MYTHIX_TYPE] === DYNAMIC_PROPERTY_TYPE) {
  // It's a DynamicProperty
}
```

## Static Properties

### `DynamicProperty.set`

Symbol used to set the value:

```javascript
const prop = new DynamicProperty('value');
prop[DynamicProperty.set]('new value');
```

### `DynamicProperty.TYPE`

The type identifier symbol:

```javascript
console.log(prop[DynamicProperty.TYPE]); // Symbol(@mythix/...)
```

## Cyclic Update Prevention

DynamicProperty automatically prevents cyclic updates:

```javascript
const a = new DynamicProperty(1);
const b = new DynamicProperty(2);

a.addEventListener('update', (e) => {
  b[DynamicProperty.set](e.value * 2);
});

b.addEventListener('update', (e) => {
  // This won't cause infinite loop
  a[DynamicProperty.set](e.value / 2);
});

a[DynamicProperty.set](5); // Safe - no infinite loop
```

## Working with Objects and Arrays

### Objects

```javascript
const user = new DynamicProperty({ name: 'John', age: 30 });

// Access properties
console.log(user.name); // 'John'

// Update entire object (triggers update)
user[DynamicProperty.set]({ name: 'Jane', age: 25 });

// Mutating the object directly does NOT trigger updates!
// BAD: user.valueOf().name = 'Jane'; // No update event
// GOOD: user[DynamicProperty.set]({ ...user.valueOf(), name: 'Jane' });
```

### Arrays

```javascript
const items = new DynamicProperty(['a', 'b', 'c']);

// Access array methods
console.log(items.length); // 3
console.log(items[0]); // 'a'

// Update array (triggers update)
items[DynamicProperty.set]([...items.valueOf(), 'd']);

// IMPORTANT: Direct mutation does NOT trigger updates!
// BAD: items.valueOf().push('d'); // No update event
// GOOD: items[DynamicProperty.set]([...items.valueOf(), 'd']);
```

### Immutable Update Pattern

Always create new references when updating objects/arrays:

```javascript
// For arrays
const addItem = (prop, item) => {
  prop[DynamicProperty.set]([...prop.valueOf(), item]);
};

const removeItem = (prop, index) => {
  const arr = prop.valueOf();
  prop[DynamicProperty.set]([...arr.slice(0, index), ...arr.slice(index + 1)]);
};

// For objects
const updateField = (prop, field, value) => {
  prop[DynamicProperty.set]({ ...prop.valueOf(), [field]: value });
};
```

## Template Integration

DynamicProperty integrates automatically with the template engine:

```html
<template data-for="my-component">
  <!-- Automatically updates when count changes -->
  <p>Count: @@count@@</p>

  <!-- Expressions work too -->
  <p>Double: @@count * 2@@</p>

  <!-- Object properties -->
  <p>User: @@user.name@@</p>
</template>
```

```javascript
class MyComponent extends MythixUIComponent {
  static tagName = 'my-component';

  constructor() {
    super();
    this.defineDynamicProp('count', 0);
    this.defineDynamicProp('user', { name: 'John' });
  }

  mounted() {
    // These updates will automatically reflect in the UI
    setInterval(() => {
      this.count = this.count.valueOf() + 1;
    }, 1000);
  }
}
```

## Global Dynamic Properties

### Using `dynamicPropID`

Create or retrieve globally shared dynamic properties:

```javascript
import { Utils } from 'mythix-ui-core';

// Get or create a global dynamic property
const theme = Utils.dynamicPropID('currentTheme', 'light');

// Access from anywhere
theme.addEventListener('update', (e) => {
  document.body.className = e.value;
});

// Set from anywhere
Utils.dynamicPropID('currentTheme')[DynamicProperty.set]('dark');
```

### Template Syntax for Global Props

```html
<!-- Reference by ID with % prefix -->
<div class="%currentTheme">Content</div>
```

## Computed Properties

DynamicProperty doesn't have built-in computed properties, but you can create derived properties:

```javascript
class ShoppingCart extends MythixUIComponent {
  constructor() {
    super();
    this.defineDynamicProp('items', []);
    this.defineDynamicProp('total', 0);

    // Update total when items change
    this.items.addEventListener('update', () => {
      const sum = this.items.valueOf().reduce(
        (acc, item) => acc + item.price,
        0
      );
      this.total = sum;
    });
  }
}
```

## Performance Tips

1. **Batch updates** - Combine multiple property updates when possible
2. **Avoid unnecessary updates** - Check if the value actually changed
3. **Use shallow comparisons** - Don't update if values are equal

```javascript
// Only update if value changed
set attr$dataCount([ newValue, oldValue ]) {
  if (newValue !== oldValue) {
    this.count = parseInt(newValue, 10);
  }
}
```

## Example: Todo List with DynamicProperty

```javascript
import { MythixUIComponent, DynamicProperty } from 'mythix-ui-core';

class TodoList extends MythixUIComponent {
  static tagName = 'todo-list';

  constructor() {
    super();
    this.defineDynamicProp('todos', []);
    this.defineDynamicProp('filter', 'all');
    this.defineDynamicProp('filteredTodos', []);

    // Update filtered list when todos or filter changes
    const updateFiltered = () => {
      const todos = this.todos.valueOf();
      const filter = this.filter.valueOf();

      let filtered;
      switch (filter) {
        case 'active':
          filtered = todos.filter(t => !t.done);
          break;
        case 'done':
          filtered = todos.filter(t => t.done);
          break;
        default:
          filtered = todos;
      }
      this.filteredTodos = filtered;
    };

    this.todos.addEventListener('update', updateFiltered);
    this.filter.addEventListener('update', updateFiltered);
  }

  addTodo(text) {
    const todos = this.todos.valueOf();
    this.todos = [...todos, { id: Date.now(), text, done: false }];
  }

  toggleTodo(id) {
    const todos = this.todos.valueOf().map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    this.todos = todos;
  }

  removeTodo(id) {
    const todos = this.todos.valueOf().filter(t => t.id !== id);
    this.todos = todos;
  }
}

TodoList.register();
```

## See Also

- [MythixUIComponent](./mythix-ui-component.md) - Using `defineDynamicProp`
- [Template Engine](./template-engine.md) - Binding to templates
- [Utils](./utils.md) - `dynamicPropID` for global properties
