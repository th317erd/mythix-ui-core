# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-02-08

### Added

- **New Event System**: `data-event-on{eventName}` attribute pattern for event binding
  - `createScanningProxy(element)` - Creates a proxy that scans up the DOM for method resolution
  - `mythixEventWrapper(event)` - Generic event handler for data-event attributes
  - `bindDataEventAttribute(element, eventName)` - Binds a single event attribute
  - `bindAllDataEventAttributes(element)` - Binds all data-event-on* attributes on an element
- Comprehensive test suite for event system (20+ new tests)
- Full documentation with examples in `docs/template-engine.md` and `docs/utils.md`

### Changed

- **Breaking**: Event binding now uses `data-event-on{eventName}` instead of modifying standard `on{eventName}` HTML attributes
- Event handlers now use a scanning proxy that traverses up the DOM to find methods
- Simple method references (without parentheses) are auto-invoked with the event object

### Deprecated

- `getAllEventNamesForElement(element)` - Use `data-event-on{eventName}` attributes instead
- `bindEventToElement(element, eventName, callback)` - Use `bindDataEventAttribute` instead

### Removed

- Legacy `on{eventName}` attribute processing from `build()` and `processElements()`

### Migration Guide

Update your templates from:
```html
<button onclick="handleClick">Click</button>
```

To:
```html
<button data-event-onclick="handleClick">Click</button>
```

The new pattern:
- Is explicit about framework-processed attributes
- Doesn't modify standard HTML attribute behavior
- Supports method scanning up the DOM tree
- Auto-invokes simple method references with the event object

## [1.1.0] - 2025-02-07

### Added

- Enhanced error classes: `TemplateError`, `ComponentError`, `DynamicPropertyError`
- `StyleSheetManager` for constructable stylesheets
- i18n enhancements: pluralization, date/number formatting, RTL support, fallback chains
- JSDoc comments for IDE support
- TypeScript definitions (`lib/index.d.ts`)
- DynamicProperty fallback registry for cross-platform support

### Fixed

- Resource loading cache issues
