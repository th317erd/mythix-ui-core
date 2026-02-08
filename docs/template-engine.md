# Template Engine

The Mythix UI Template Engine enables dynamic content binding in HTML templates using the `@@expression@@` syntax. It provides reactive updates, scope-based variable resolution, and integration with DynamicProperty for automatic UI synchronization.

## Overview

Templates are standard HTML `<template>` elements linked to components via the `data-for` attribute. The template engine processes `@@expression@@` placeholders and binds them to DynamicProperty instances for reactive updates.

```html
<template data-for="my-component">
  <style>
    :host { display: block; }
  </style>
  <h1>@@title@@</h1>
  <p>Count: @@count@@</p>
</template>
```

## Expression Syntax

### Basic Property Access

Reference component properties directly:

```html
<p>@@userName@@</p>
<span>@@status@@</span>
```

### JavaScript Expressions

Any valid JavaScript expression works:

```html
<!-- Math operations -->
<p>Total: @@price * quantity@@</p>

<!-- String operations -->
<p>@@firstName.toUpperCase()@@</p>

<!-- Ternary expressions -->
<span class="@@isActive ? 'active' : 'inactive'@@">Status</span>

<!-- Array methods -->
<p>Count: @@items.length@@</p>

<!-- Comparisons -->
<div class="@@count > 10 ? 'many' : 'few'@@">Items</div>
```

### Method Calls

Call component methods:

```html
<p>@@formatDate(createdAt)@@</p>
<span>@@calculateTotal(items)@@</span>
```

### Object Property Access

Access nested properties:

```html
<p>@@user.name@@</p>
<p>@@user.address.city@@</p>
<p>@@config.settings.theme@@</p>
```

### Array Access

Access array elements:

```html
<p>First: @@items[0]@@</p>
<p>Last: @@items[items.length - 1]@@</p>
```

## Escaping

To output literal `@@`:

```html
<p>\@@This is not an expression@@</p>
<!-- Renders: @@This is not an expression@@ -->
```

## Attribute Bindings

### Static Attributes with Expressions

```html
<div class="@@dynamicClass@@">Content</div>
<input value="@@inputValue@@">
<a href="@@linkUrl@@">Link</a>
<img src="@@imageSource@@" alt="@@imageAlt@@">
```

### Mixed Content

Combine static and dynamic content:

```html
<div class="card @@isSelected ? 'selected' : ''@@">
  Content
</div>
<a href="/users/@@userId@@/profile">Profile</a>
```

### Boolean Attributes

```html
<button disabled="@@isDisabled@@">Submit</button>
<input readonly="@@isReadOnly@@">
```

## Event Bindings

Mythix UI uses the `data-event-on{eventName}` attribute pattern for event binding. This pattern is explicit about which attributes are processed by the framework (rather than modifying standard HTML event attributes).

### Method Reference

Reference a component method by name. The framework automatically scans up the DOM to find the method:

```html
<button data-event-onclick="handleClick">Click Me</button>
<input data-event-oninput="handleInput">
<form data-event-onsubmit="handleSubmit">
```

### Inline Expressions

Use `this` to reference the component:

```html
<button data-event-onclick="this.handleClick(event)">Click</button>
<button data-event-onclick="this.count = this.count.valueOf() + 1">Increment</button>
```

### Passing Arguments

```html
<button data-event-onclick="handleItemClick(item.id)">Select</button>
<li data-event-onclick="selectItem(index)">@@item.name@@</li>
```

### Event Object Access

The `event` variable is automatically available. For simple method references without parentheses, the method is auto-invoked with the event as the first argument:

```html
<!-- Auto-invoked with event -->
<button data-event-onclick="this.handleClick">Click</button>

<!-- Explicit event access -->
<input data-event-oninput="this.search = event.target.value">
<button data-event-onclick="console.log(event.target)">Log Target</button>
```

### How Method Lookup Works

When an event is triggered, the framework creates a "scanning proxy" that:

1. Starts from the element with the `data-event-on*` attribute
2. Scans up the DOM via `parentElement`
3. Crosses Shadow DOM boundaries via `getRootNode().host`
4. Stops at the first MythixComponent/WebComponent boundary
5. Returns the first matching property found

This allows methods defined on parent components to be referenced from child elements naturally.

## Scope Resolution

The template engine uses a hierarchical scope resolution:

1. **Component instance** - `this` properties and methods
2. **Local scope** - Variables from `mythix-for-each` iterations
3. **Parent elements** - Properties from ancestor elements
4. **Global scope** - `globalThis.mythixUI.globalScope`

### Component Scope

```javascript
class MyComponent extends MythixUIComponent {
  constructor() {
    super();
    this.defineDynamicProp('title', 'Hello');
  }

  formatName(name) {
    return name.toUpperCase();
  }
}
```

```html
<template data-for="my-component">
  <h1>@@title@@</h1>
  <p>@@formatName('john')@@</p>
</template>
```

### Iteration Scope

With `mythix-for-each`, iteration variables are scoped:

```html
<mythix-for-each items="@@users@@">
  <!-- 'item' and 'index' are scoped variables -->
  <div>@@index@@: @@item.name@@</div>
</mythix-for-each>
```

### Global Scope

Access global values:

```javascript
// Set globally
globalThis.mythixUI.globalScope.appVersion = '1.0.0';
```

```html
<footer>Version: @@appVersion@@</footer>
```

## Dynamic Property Integration

When a template expression references a `DynamicProperty`, the template automatically subscribes to updates:

```javascript
class Counter extends MythixUIComponent {
  constructor() {
    super();
    this.defineDynamicProp('count', 0);
  }

  increment() {
    this.count = this.count.valueOf() + 1;
    // Template automatically updates!
  }
}
```

```html
<template data-for="counter-component">
  <p>Count: @@count@@</p>
  <button data-event-onclick="increment">+1</button>
</template>
```

## Global Dynamic Properties

Reference globally registered dynamic properties with `%`:

```javascript
// Register global property
import { Utils } from 'mythix-ui-core';
Utils.dynamicPropID('currentTheme', 'light');
```

```html
<div class="%currentTheme">Content styled by theme</div>
```

## i18n Integration

Use the `i18n` function for internationalization:

```html
<p>@@i18n('greeting.hello', 'Hello')@@</p>
<button>@@i18n('buttons.submit', 'Submit')@@</button>
```

The second argument is the default value if the key isn't found.

## Special Variables

These are automatically available in template scope:

| Variable | Description |
|----------|-------------|
| `this` | The component instance |
| `$$` | The scope proxy |
| `i18n` | i18n lookup function |
| `dynamicPropID` | Global dynamic property accessor |
| `attributes` | Component attributes object |
| `classList` | Component classList |
| `event` | Event object (in event handlers) |

## Disabling Template Processing

### Per Element

Prevent processing children of an element:

```html
<div data-templates-disable>
  <!-- @@expressions@@ are NOT processed here -->
  <code>Use @@expression@@ syntax</code>
</div>
```

### For Custom Components

Components can register themselves as template-processing blockers:

```javascript
import { Utils } from 'mythix-ui-core';
Utils.registerDisableTemplateEngineSelector('my-custom-code');
```

## Template Parsing Internals

### `parseTemplateParts(text, options)`

Parse a template string into parts:

```javascript
import { Utils } from 'mythix-ui-core';

const parts = Utils.parseTemplateParts('Hello @@name@@!', { scope: this.$$ });
// Returns:
// [
//   { type: 'literal', source: 'Hello ', start: 0, end: 6 },
//   { type: 'macro', source: '@@name@@', macro: Function, start: 6, end: 14 },
//   { type: 'literal', source: '!', start: 14, end: 15 },
// ]
```

### `compileTemplateFromParts(parts)`

Compile parsed parts into a result:

```javascript
const result = Utils.compileTemplateFromParts(parts);
// Returns: 'Hello John!' (if name is 'John')
```

### `formatNodeValue(node, options)`

Format a text or attribute node's value:

```javascript
const formatted = Utils.formatNodeValue(textNode, { scope: this.$$ });
```

## Error Handling

Template expressions that throw errors are caught and logged:

```html
<!-- If 'undefined.property' throws, the error is logged -->
<p>@@undefined.property@@</p>
```

Error messages include the original expression for debugging.

## Performance Considerations

1. **Expression Complexity** - Keep expressions simple; move complex logic to methods
2. **Frequent Updates** - DynamicProperty updates trigger re-evaluation
3. **Deep Nesting** - Deeply nested property access requires more lookups

### Optimization Tips

```javascript
// Instead of complex template expressions:
// BAD: @@items.filter(i => i.active).map(i => i.name).join(', ')@@

// Use a computed property:
class MyComponent extends MythixUIComponent {
  get activeNames() {
    return this.items.valueOf()
      .filter(i => i.active)
      .map(i => i.name)
      .join(', ');
  }
}
// GOOD: @@activeNames@@
```

## Example: Dynamic Form

```html
<template data-for="dynamic-form">
  <style>
    .field { margin-bottom: 1rem; }
    .error { color: red; }
    .valid { color: green; }
  </style>

  <form data-event-onsubmit="handleSubmit">
    <div class="field">
      <label>Username</label>
      <input
        type="text"
        value="@@username@@"
        data-event-oninput="username = event.target.value"
        class="@@usernameError ? 'error' : ''@@"
      >
      <span class="error">@@usernameError@@</span>
    </div>

    <div class="field">
      <label>Email</label>
      <input
        type="email"
        value="@@email@@"
        data-event-oninput="email = event.target.value"
        class="@@emailError ? 'error' : ''@@"
      >
      <span class="error">@@emailError@@</span>
    </div>

    <div class="field">
      <p>Characters: @@username.length@@ / 20</p>
      <p class="@@isValid ? 'valid' : 'error'@@">
        @@isValid ? 'Form is valid' : 'Please fix errors'@@
      </p>
    </div>

    <button type="submit" disabled="@@!isValid@@">
      @@isSubmitting ? 'Submitting...' : 'Submit'@@
    </button>
  </form>
</template>
```

```javascript
class DynamicForm extends MythixUIComponent {
  static tagName = 'dynamic-form';

  constructor() {
    super();
    this.defineDynamicProp('username', '');
    this.defineDynamicProp('email', '');
    this.defineDynamicProp('usernameError', '');
    this.defineDynamicProp('emailError', '');
    this.defineDynamicProp('isSubmitting', false);

    // Validate on changes
    this.username.addEventListener('update', () => this.validateUsername());
    this.email.addEventListener('update', () => this.validateEmail());
  }

  get isValid() {
    return !this.usernameError.valueOf() && !this.emailError.valueOf()
      && this.username.valueOf() && this.email.valueOf();
  }

  validateUsername() {
    const value = this.username.valueOf();
    if (!value) {
      this.usernameError = 'Username is required';
    } else if (value.length < 3) {
      this.usernameError = 'Username must be at least 3 characters';
    } else if (value.length > 20) {
      this.usernameError = 'Username must be at most 20 characters';
    } else {
      this.usernameError = '';
    }
  }

  validateEmail() {
    const value = this.email.valueOf();
    if (!value) {
      this.emailError = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      this.emailError = 'Invalid email format';
    } else {
      this.emailError = '';
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (!this.isValid) return;

    this.isSubmitting = true;
    try {
      await this.submitForm();
    } finally {
      this.isSubmitting = false;
    }
  }

  async submitForm() {
    // Submit logic here
  }
}

DynamicForm.register();
```

## See Also

- [MythixUIComponent](./mythix-ui-component.md) - Component templates
- [DynamicProperty](./dynamic-property.md) - Reactive bindings
- [Utils](./utils.md) - Template parsing utilities
- [Components: mythix-for-each](./components/mythix-for-each.md) - List iteration
