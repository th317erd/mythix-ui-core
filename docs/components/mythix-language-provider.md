# MythixUILanguageProvider (`<mythix-language-provider>`)

The `<mythix-language-provider>` and `<mythix-language-pack>` elements provide internationalization (i18n) support for Mythix UI applications. They enable real-time language switching with reactive template updates.

```javascript
import { MythixElements } from 'mythix-ui-core';
const { MythixUILanguageProvider, MythixUILanguagePack } = MythixElements;
```

## Basic Usage

```html
<mythix-language-provider lang="en">
  <!-- Language packs define available translations -->
  <mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
  <mythix-language-pack lang="es" src="./lang/es.json"></mythix-language-pack>
  <mythix-language-pack lang="fr" src="./lang/fr.json"></mythix-language-pack>

  <!-- Your app content -->
  <my-app></my-app>
</mythix-language-provider>
```

## MythixUILanguageProvider

The provider element wraps your application and manages language state.

### Attributes

#### `lang`

**Type:** `string`
**Default:** Document's `<html lang="...">` or `"en"`

The current language code. Changing this triggers a language switch.

```html
<mythix-language-provider lang="en">
```

```javascript
// Change language programmatically
document.querySelector('mythix-language-provider').setAttribute('lang', 'es');
```

### Methods

#### `i18n(path, defaultValue)`

Look up a translation by path.

```javascript
const provider = document.querySelector('mythix-language-provider');
const greeting = provider.i18n('messages.welcome', 'Welcome!');
```

#### `getCurrentLocale()`

Get the current language code.

```javascript
const lang = provider.getCurrentLocale(); // 'en'
```

#### `getSourcesForLang(lang)`

Get all language pack elements for a specific language.

```javascript
const packs = provider.getSourcesForLang('en');
```

## MythixUILanguagePack

Defines a translation source for a specific language.

### Attributes

#### `lang`

**Type:** `string`

The language code this pack provides translations for.

```html
<mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
```

#### `src`

**Type:** `string`

URL to the JSON translation file.

```html
<mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
```

## Translation File Format

Translation files are JSON objects with nested keys:

```json
{
  "greeting": {
    "hello": "Hello",
    "goodbye": "Goodbye",
    "welcome": "Welcome, {{name}}!"
  },
  "buttons": {
    "submit": "Submit",
    "cancel": "Cancel",
    "delete": "Delete"
  },
  "errors": {
    "required": "This field is required",
    "invalid_email": "Invalid email address"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "contact": "Contact"
  }
}
```

## Using Translations in Templates

### The `i18n` Function

In templates, use the `i18n()` function:

```html
<template data-for="my-component">
  <h1>@@i18n('greeting.hello', 'Hello')@@</h1>
  <p>@@i18n('greeting.welcome', 'Welcome!')@@</p>
  <button>@@i18n('buttons.submit', 'Submit')@@</button>
</template>
```

### Default Values

The second argument is the fallback if the key isn't found:

```html
<p>@@i18n('missing.key', 'Default Text')@@</p>
<!-- Renders: "Default Text" if key doesn't exist -->
```

### Reactive Updates

When the language changes, all `i18n()` expressions update automatically:

```javascript
// All templates using i18n() will re-render with Spanish translations
document.querySelector('mythix-language-provider').setAttribute('lang', 'es');
```

## Multiple Language Packs

You can have multiple packs for the same language (they're merged):

```html
<mythix-language-provider lang="en">
  <!-- Core translations -->
  <mythix-language-pack lang="en" src="./lang/core.en.json"></mythix-language-pack>

  <!-- Component-specific translations -->
  <mythix-language-pack lang="en" src="./components/modal/modal.en.json"></mythix-language-pack>
  <mythix-language-pack lang="en" src="./components/form/form.en.json"></mythix-language-pack>

  <my-app></my-app>
</mythix-language-provider>
```

Packs are merged using deep merge, so overlapping keys from later packs override earlier ones.

## Language Pack Auto-Registration

When loading components via `<mythix-require>`, embedded language packs are automatically registered:

```html
<!-- my-widget.html -->
<template data-for="my-widget">
  <p>@@i18n('widget.title', 'Widget')@@</p>
</template>

<mythix-language-pack lang="en" src="./my-widget.en.json"></mythix-language-pack>
<mythix-language-pack lang="es" src="./my-widget.es.json"></mythix-language-pack>

<script type="module">
  // Component definition...
</script>
```

When this file is loaded with `<mythix-require>`, the language packs are automatically moved to the nearest `<mythix-language-provider>`.

## Example: Language Switcher Component

```javascript
import { MythixUIComponent } from 'mythix-ui-core';

class LanguageSwitcher extends MythixUIComponent {
  static tagName = 'language-switcher';

  get languages() {
    return [
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
      { code: 'fr', label: 'Français' },
    ];
  }

  getCurrentLang() {
    const provider = this.closest('mythix-language-provider');
    return provider?.getCurrentLocale() || 'en';
  }

  switchLanguage(code) {
    const provider = this.closest('mythix-language-provider');
    if (provider) {
      provider.setAttribute('lang', code);
    }
  }
}

LanguageSwitcher.register();
```

```html
<template data-for="language-switcher">
  <style>
    :host { display: inline-flex; gap: 0.5rem; }
    button { padding: 0.25rem 0.5rem; cursor: pointer; }
    button.active { font-weight: bold; background: #007bff; color: white; }
  </style>
  <mythix-for-each items="@@languages@@">
    <button
      data-event-onclick="switchLanguage(item.code)"
      class="@@getCurrentLang() === item.code ? 'active' : ''@@"
    >
      @@item.label@@
    </button>
  </mythix-for-each>
</template>

<!-- Usage -->
<mythix-language-provider lang="en">
  <mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
  <mythix-language-pack lang="es" src="./lang/es.json"></mythix-language-pack>
  <mythix-language-pack lang="fr" src="./lang/fr.json"></mythix-language-pack>

  <header>
    <language-switcher></language-switcher>
  </header>

  <main>
    <h1>@@i18n('greeting.hello', 'Hello')@@</h1>
    <p>@@i18n('greeting.welcome', 'Welcome!')@@</p>
  </main>
</mythix-language-provider>
```

## Example: Pluralization

Handle plurals with logic in the translation file or template:

```json
{
  "items": {
    "none": "No items",
    "one": "1 item",
    "many": "{{count}} items"
  }
}
```

```html
<p>
  @@count === 0
    ? i18n('items.none', 'No items')
    : count === 1
      ? i18n('items.one', '1 item')
      : i18n('items.many', `${count} items`)
  @@
</p>
```

## Example: RTL Support

Combine language switching with RTL layout:

```html
<mythix-language-provider lang="en">
  <mythix-language-pack lang="en" src="./lang/en.json"></mythix-language-pack>
  <mythix-language-pack lang="ar" src="./lang/ar.json"></mythix-language-pack>
</mythix-language-provider>
```

```javascript
// When switching to RTL language
const provider = document.querySelector('mythix-language-provider');
provider.addEventListener('lang', (e) => {
  const rtlLanguages = ['ar', 'he', 'fa'];
  document.documentElement.dir = rtlLanguages.includes(e.detail.lang) ? 'rtl' : 'ltr';
});
```

## DynamicProperty Integration

Translations are wrapped in DynamicProperty, enabling reactive updates:

```javascript
const provider = document.querySelector('mythix-language-provider');
const greeting = provider.i18n('greeting.hello', 'Hello');

// greeting is a DynamicProperty
greeting.addEventListener('update', (e) => {
  console.log('Greeting updated to:', e.value);
});
```

## Best Practices

1. **Organize by feature** - Structure translation files by feature/component
2. **Use descriptive keys** - `buttons.submit` not `btn1`
3. **Provide defaults** - Always pass a default value to `i18n()`
4. **Handle missing translations** - The default value covers missing keys gracefully
5. **Separate language packs** - Keep each language in its own file
6. **Load lazily** - Use `<mythix-require>` to load component translations on demand

## See Also

- [Template Engine](../template-engine.md) - Using `i18n()` in templates
- [MythixUIRequire](./mythix-require.md) - Auto-registration of language packs
- [DynamicProperty](../dynamic-property.md) - Reactive translation values
