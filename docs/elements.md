# Elements

The Elements module provides utilities for programmatically creating DOM elements using a fluent builder API. It includes `ElementDefinition` for defining element structures and `ElementGenerator` for generating elements with a declarative syntax.

```javascript
import { Elements } from 'mythix-ui-core';
```

## ElementGenerator

The `ElementGenerator` provides a Proxy-based API where property access creates element builders for any HTML tag.

### Basic Usage

```javascript
this.build(({ DIV, SPAN, P, A, BUTTON }) => {
  return DIV.class('container')(
    P.class('text')('Hello, World!'),
    A.href('/about')('About'),
    BUTTON.onClick(this.handleClick)('Click Me'),
  );
});
```

### How It Works

1. Access a property like `DIV` returns an `ElementDefinition` for `<div>`
2. Chain attribute setters (`.class()`, `.id()`, `.onClick()`, etc.)
3. Call the definition as a function with children to complete it
4. Build the definition into actual DOM elements

### Available Tags

Any valid HTML or SVG tag name works. Common examples:

```javascript
// HTML elements
DIV, SPAN, P, A, BUTTON, INPUT, FORM, TABLE, TR, TD, UL, LI,
HEADER, FOOTER, NAV, SECTION, ARTICLE, ASIDE, MAIN,
H1, H2, H3, H4, H5, H6, IMG, VIDEO, AUDIO, CANVAS,
LABEL, SELECT, OPTION, TEXTAREA, TEMPLATE

// SVG elements (same pattern)
SVG, CIRCLE, RECT, PATH, G, TEXT, LINE, POLYGON
```

## ElementDefinition

`ElementDefinition` represents an element before it's created. It stores the tag name, attributes, and children.

### Setting Attributes

#### Standard Attributes

```javascript
DIV.id('myId')           // id="myId"
DIV.class('foo bar')     // class="foo bar"
DIV.title('Tooltip')     // title="Tooltip"
INPUT.type('text')       // type="text"
INPUT.placeholder('...')  // placeholder="..."
A.href('/path')          // href="/path"
IMG.src('/image.png')    // src="/image.png"
```

#### Data Attributes

Prefix with `data` in camelCase:

```javascript
DIV.dataId('123')        // data-id="123"
DIV.dataUserName('john') // data-user-name="john"
```

#### Event Handlers

Prefix with `on`:

```javascript
BUTTON.onClick(handler)    // onclick event
INPUT.onInput(handler)     // oninput event
FORM.onSubmit(handler)     // onsubmit event
DIV.onMouseEnter(handler)  // onmouseenter event
```

#### Boolean Attributes

```javascript
INPUT.disabled(true)     // disabled="true" (renders as disabled)
INPUT.required(true)     // required="true"
INPUT.readonly(true)     // readonly="true"
OPTION.selected(true)    // selected="true"
```

#### Custom Attributes

Use `attr()` for any attribute:

```javascript
DIV.attr('aria-label', 'Description')
DIV.attr('role', 'button')
```

#### Dynamic Properties

Use `prop$` prefix to set JavaScript properties:

```javascript
INPUT.prop$value('initial')    // Sets element.value
CHECKBOX.prop$checked(true)    // Sets element.checked
DIV.prop$innerHTML('<b>Bold</b>')
```

### Adding Children

Pass children when calling the definition:

```javascript
DIV.class('parent')(
  SPAN('First child'),
  SPAN('Second child'),
  'Text node child',
)
```

Children can be:
- Other `ElementDefinition` instances
- `QueryEngine` instances
- Strings (become text nodes)
- Arrays of the above
- DOM elements

### Chaining

All attribute methods return the `ElementDefinition` for chaining:

```javascript
BUTTON
  .class('btn btn-primary')
  .id('submit-btn')
  .type('submit')
  .onClick(this.handleSubmit)
  .disabled(false)
  ('Submit Form')
```

## Building Elements

### Component `$build` Method

Returns a `QueryEngine` that can be directly appended:

```javascript
// Build and append in one chain
this.$build(({ DIV, BUTTON }) =>
  DIV.class('controls')(
    BUTTON.onClick(() => this.doAction())('Action'),
  )
).appendTo(this.shadow);
```

### Component `build` Method

Returns the `ElementDefinition` for manual building:

```javascript
const definition = this.build(({ DIV }) => DIV.class('item')('Content'));

// Build with options
const element = definition.build(document, {
  scope: this.$$,
  processMarkup: true,
});

this.shadow.appendChild(element);
```

### Building Options

```javascript
const element = definition.build(ownerDocument, {
  scope: scopeProxy,        // Template expression scope
  processMarkup: true,      // Process @@expressions@@
  forComponent: component,  // Owner component reference
});
```

## SVG Elements

SVG elements are created in the SVG namespace:

```javascript
this.build(({ SVG, CIRCLE, RECT, PATH }) =>
  SVG.width('100').height('100').viewBox('0 0 100 100')(
    CIRCLE.cx('50').cy('50').r('40').fill('red')(),
    RECT.x('10').y('10').width('30').height('30').fill('blue')(),
  )
);
```

## Template Processing

When building, template expressions are processed:

```javascript
// In constructor
this.defineDynamicProp('userName', 'John');

// In mounted
this.$build(({ DIV, SPAN }) =>
  DIV.class('greeting')(
    SPAN()('Hello, @@userName@@!'),  // Will show "Hello, John!"
  )
).appendTo(this.shadow);
```

## Conditional Rendering

Use JavaScript to conditionally include elements:

```javascript
this.build(({ DIV, SPAN, BUTTON }) =>
  DIV.class('container')(
    SPAN('Always shown'),
    this.isAdmin && BUTTON('Admin Only'),
    this.items.length > 0 && DIV('Has items'),
  )
);
```

## List Rendering

Map over arrays to create lists:

```javascript
this.build(({ UL, LI }) =>
  UL.class('item-list')(
    ...this.items.map((item, index) =>
      LI.class('item').dataIndex(index)(item.name)
    )
  )
);
```

## Advanced Patterns

### Fragments (Multiple Root Elements)

Return an array from build:

```javascript
this.$build(({ SPAN }) => [
  SPAN.class('first')('One'),
  SPAN.class('second')('Two'),
  SPAN.class('third')('Three'),
]).appendTo(container);
```

### Nested Components

Include custom elements:

```javascript
const { DIV } = Elements;

// Custom element names work too
const { 'MY-WIDGET': MY_WIDGET } = Elements;

// Or use any valid identifier
this.build(({ DIV }) =>
  DIV.class('wrapper')(
    // Use createElement style for custom elements
    Elements.createGenerator()['my-widget'].dataConfig('{}')(),
  )
);
```

### Reusable Definitions

Store definitions for reuse:

```javascript
class MyComponent extends MythixUIComponent {
  createButton(text, handler) {
    return this.build(({ BUTTON }) =>
      BUTTON
        .class('btn')
        .onClick(handler)
        (text)
    );
  }

  mounted() {
    this.$build(({ DIV }) =>
      DIV.class('buttons')(
        this.createButton('Save', this.handleSave),
        this.createButton('Cancel', this.handleCancel),
      )
    ).appendTo(this.shadow);
  }
}
```

### Template Slots

Work with Shadow DOM slots:

```javascript
this.build(({ DIV, SLOT }) =>
  DIV.class('card')(
    DIV.class('card-header')(
      SLOT.name('header')(),
    ),
    DIV.class('card-body')(
      SLOT()(), // Default slot
    ),
    DIV.class('card-footer')(
      SLOT.name('footer')(),
    ),
  )
);
```

## Elements Namespace Functions

### `processElements(element, options)`

Process an element tree, handling template expressions and events:

```javascript
import { Elements } from 'mythix-ui-core';

const processed = Elements.processElements.call(
  this,
  rawElement,
  { scope: this.$$ }
);
```

### `mergeChildren(target, ...sources)`

Merge child elements from sources into target:

```javascript
Elements.mergeChildren(container, element1, element2);
```

## Type Checking

```javascript
import { MYTHIX_TYPE, ELEMENT_DEFINITION_TYPE } from 'mythix-ui-core';

if (value[MYTHIX_TYPE] === ELEMENT_DEFINITION_TYPE) {
  // It's an ElementDefinition
}
```

## Example: Form Builder

```javascript
class FormBuilder extends MythixUIComponent {
  static tagName = 'form-builder';

  buildForm(fields) {
    return this.build(({ FORM, DIV, LABEL, INPUT, SELECT, OPTION, BUTTON }) =>
      FORM.class('dynamic-form').onSubmit(this.handleSubmit)(
        ...fields.map(field => this.buildField(field)),
        DIV.class('form-actions')(
          BUTTON.type('submit').class('btn-primary')('Submit'),
          BUTTON.type('button').onClick(this.handleReset)('Reset'),
        ),
      )
    );
  }

  buildField(field) {
    const { LABEL, INPUT, SELECT, OPTION, DIV } = this.build.generators;

    return DIV.class('form-field')(
      LABEL.for(field.id)(field.label),
      field.type === 'select'
        ? SELECT.id(field.id).name(field.name)(
            ...field.options.map(opt =>
              OPTION.value(opt.value)(opt.label)
            )
          )
        : INPUT
            .id(field.id)
            .type(field.type)
            .name(field.name)
            .placeholder(field.placeholder)(),
    );
  }

  mounted() {
    const fields = [
      { id: 'name', label: 'Name', type: 'text', name: 'name', placeholder: 'Enter name' },
      { id: 'email', label: 'Email', type: 'email', name: 'email', placeholder: 'Enter email' },
      { id: 'role', label: 'Role', type: 'select', name: 'role', options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ]},
    ];

    const form = this.buildForm(fields);
    form.appendTo(this.shadow);
  }

  handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
  }

  handleReset() {
    // Handle form reset
  }
}

FormBuilder.register();
```

## See Also

- [MythixUIComponent](./mythix-ui-component.md) - `build()` and `$build()` methods
- [QueryEngine](./query-engine.md) - Appending built elements
- [Template Engine](./template-engine.md) - Expression syntax in elements
