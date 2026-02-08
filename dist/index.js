/******/ var __webpack_modules__ = ({

/***/ "./node_modules/deepmerge/dist/cjs.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/cjs.js ***!
  \********************************************/
/***/ ((module) => {



var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return Object.propertyIsEnumerable.call(target, symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "./lib/base-utils.js":
/*!***************************!*\
  !*** ./lib/base-utils.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SHA256: () => (/* reexport safe */ _sha256_js__WEBPACK_IMPORTED_MODULE_0__.SHA256),
/* harmony export */   coerce: () => (/* binding */ coerce),
/* harmony export */   createResolvable: () => (/* binding */ createResolvable),
/* harmony export */   generateID: () => (/* binding */ generateID),
/* harmony export */   getObjectID: () => (/* binding */ getObjectID),
/* harmony export */   isCollectable: () => (/* binding */ isCollectable),
/* harmony export */   isNOE: () => (/* binding */ isNOE),
/* harmony export */   isNotNOE: () => (/* binding */ isNotNOE),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPrimitive: () => (/* binding */ isPrimitive),
/* harmony export */   isType: () => (/* binding */ isType),
/* harmony export */   isValidNumber: () => (/* binding */ isValidNumber),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase),
/* harmony export */   toSnakeCase: () => (/* binding */ toSnakeCase),
/* harmony export */   typeOf: () => (/* binding */ typeOf)
/* harmony export */ });
/* harmony import */ var _sha256_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sha256.js */ "./lib/sha256.js");


globalThis.mythixUI = (globalThis.mythixUI || {});



/**
 * type: Namespace
 * name: BaseUtils
 * groupName: BaseUtils
 * desc: |
 *   `import { BaseUtils } from 'mythix-ui-core@1.0';`
 *
 *   Misc utility functions and global constants are found within this namespace.
 */

function pad(str, count, char = '0') {
  return str.padStart(count, char);
}

const ID_COUNT_LENGTH         = 19;
const IS_CLASS                = (/^class \S+ \{/);
const NATIVE_CLASS_TYPE_NAMES = [
  'AggregateError',
  'Array',
  'ArrayBuffer',
  'BigInt',
  'BigInt64Array',
  'BigUint64Array',
  'Boolean',
  'DataView',
  'Date',
  'DedicatedWorkerGlobalScope',
  'Error',
  'EvalError',
  'FinalizationRegistry',
  'Float32Array',
  'Float64Array',
  'Function',
  'Int16Array',
  'Int32Array',
  'Int8Array',
  'Map',
  'Number',
  'Object',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'RegExp',
  'Set',
  'SharedArrayBuffer',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'Uint16Array',
  'Uint32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'URIError',
  'WeakMap',
  'WeakRef',
  'WeakSet',
];

const NATIVE_CLASS_TYPES_META = NATIVE_CLASS_TYPE_NAMES.map((typeName) => {
  return [ typeName, globalThis[typeName] ];
}).filter((meta) => meta[1]);

const ID_COUNTER_CURRENT_VALUE  = Symbol.for('@mythix/mythix-ui/component/constants/id-counter-current-value');

// eslint-disable-next-line no-magic-numbers
let idCounter = (Object.prototype.hasOwnProperty.call(globalThis.mythixUI, ID_COUNTER_CURRENT_VALUE)) ? globalThis.mythixUI[ID_COUNTER_CURRENT_VALUE] : 0n;

/**
 * groupName: BaseUtils
 * desc: |
 *   Generate a partially random unique ID. The id generated will be a `Date.now()`
 *   value with an incrementing BigInt postfixed to it.
 * return: |
 *   @types string; A unique ID.
 * examples:
 *   - |
 *     ```javascript
 *     import { BaseUtils } from 'mythix-ui-core@1.0';
 *
 *     console.log('ID: ', BaseUtils.generateID());
 *     // output -> 'ID17041430271790000000000000000007'
 *     ```
 */
function generateID() {
  idCounter += BigInt(1);
  globalThis.mythixUI[ID_COUNTER_CURRENT_VALUE] = idCounter;

  return `ID${Date.now()}${pad(idCounter.toString(), ID_COUNT_LENGTH)}`;
}

const OBJECT_ID_STORAGE = Symbol.for('@mythix/mythix-ui/component/constants/object-id-storage');
const OBJECT_ID_WEAKMAP = globalThis.mythixUI[OBJECT_ID_STORAGE] = (globalThis.mythixUI[OBJECT_ID_STORAGE]) ? globalThis.mythixUI[OBJECT_ID_STORAGE] : new WeakMap();

/**
 * groupName: BaseUtils
 * desc: |
 *   Get a unique ID for any garbage-collectable reference.
 *
 *   Unique IDs are generated via @see BaseUtils.generateID;.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Any garbage-collectable reference.
 * return: |
 *   @types string; A unique ID for this reference (as a SHA256 hash).
 * examples:
 *   - |
 *     ```javascript
 *     import { BaseUtils } from 'mythix-ui-core@1.0';
 *
 *     console.log(BaseUtils.getObjectID(divElement));
 *     // output -> '17041430271790000000000000000007'
 *     ```
 */
function getObjectID(value) {
  let id = OBJECT_ID_WEAKMAP.get(value);
  if (id == null) {
    let thisID = generateID();

    OBJECT_ID_WEAKMAP.set(value, thisID);

    return thisID;
  }

  return id;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Create an unresolved specialized Promise instance, with the intent that it will be
 *   resolved later.
 *
 *   The Promise instance is specialized because the following properties are injected into it:
 *   1. `resolve(resultValue)` - When called, resolves the promise with the first provided argument
 *   2. `reject(errorValue)` - When called, rejects the promise with the first provided argument
 *   3. `status()` - When called, will return the fulfillment status of the promise, as a `string`, one of: `"pending", "fulfilled"`, or `"rejected"`
 *   4. `id<string>` - A randomly generated ID for this promise
 * return: |
 *   @types Promise; An unresolved Promise that can be resolved or rejected by calling `promise.resolve(result)` or `promise.reject(error)` respectively.
 */
function createResolvable() {
  let status = 'pending';
  let resolve;
  let reject;

  let promise = new Promise((_resolve, _reject) => {
    resolve = (value) => {
      if (status === 'pending') {
        status = 'fulfilled';
        _resolve(value);
      }

      return promise;
    };

    reject = (value) => {
      if (status === 'pending') {
        status = 'rejected';
        _reject(value);
      }

      return promise;
    };
  });

  Object.defineProperties(promise, {
    'resolve': {
      writable:     false,
      enumerable:   false,
      configurable: false,
      value:        resolve,
    },
    'reject': {
      writable:     false,
      enumerable:   false,
      configurable: false,
      value:        reject,
    },
    'status': {
      writable:     false,
      enumerable:   false,
      configurable: false,
      value:        () => status,
    },
    'id': {
      writable:     false,
      enumerable:   false,
      configurable: false,
      value:        generateID(),
    },
  });

  return promise;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Runtime type reflection helper. This is intended to be a more robust replacement for the `typeof` operator.
 *
 *   This method always returns a name (as a `string` type) of the underlying datatype.
 *   The "datatype" is a little loose for primitive types. For example, a
 *   primitive `typeof x === 'number'` type is returned as its corresponding Object (class) type `'Number'`. For `boolean` it will instead
 *   return `'Boolean'`, and for `'string'`, it will instead return `'String'`. This is true of all underlying primitive types.
 *
 *   For internal datatypes, it will return the real class name prefixed by two colons.
 *   For example, `typeOf(new Map())` will return `'::Map'`.
 *
 *   Non-internal types will not be prefixed, allowing custom types with the same name as internal types to also be detected.
 *   For example, `class Test {}; typeOf(new Test())` will result in the non-prefixed result `'Test'`.
 *
 *   For raw `function` types, `typeOf` will check if they are a constructor or not. If a constructor is detected, then
 *   the format `'[Class ${name}]'` will be returned as the type. For internal types the name will
 *   be prefixed, i.e. `[Class ::${internalName}]`, and for non-internal types will instead be non-prefixed, i.e. `[Class ${name}]` .
 *   For example, `typeOf(Map)` will return `'[Class ::Map]'`, whereas `typeOf(Test)` will result in `'[Class Test]'`.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: The value whose type you wish to discover.
 * return: |
 *   @types string; The name of the provided type, or an empty string `''` if the provided value has no type.
 * notes:
 *   - This method will look for a [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag)
 *     key on the value provided... and if found, will use it to assist with finding the correct type name.
 *   - If the `value` provided is type-less, i.e. `undefined`, `null`, or `NaN`, then an empty type `''` will be returned.
 *   - Use the `typeof` operator if you want to detect if a type is primitive or not.
 */
function typeOf(value) {
  if (value == null || Object.is(value, NaN))
    return '';

  if (Object.is(value, Infinity) || Object.is(value, -Infinity))
    return '::Number';

  let thisType = typeof value;
  if (thisType === 'bigint')
    return '::BigInt';

  if (thisType === 'symbol')
    return '::Symbol';

  if (thisType !== 'object') {
    if (thisType === 'function') {
      let nativeTypeMeta = NATIVE_CLASS_TYPES_META.find((typeMeta) => (value === typeMeta[1]));
      if (nativeTypeMeta)
        return `[Class ::${nativeTypeMeta[0]}]`;

      if (value.prototype && typeof value.prototype.constructor === 'function' && IS_CLASS.test('' + value.prototype.constructor))
        return `[Class ${value.name}]`;

      if (value.prototype && typeof value.prototype[Symbol.toStringTag] === 'function') {
        let result = value.prototype[Symbol.toStringTag]();
        if (result)
          return `[Class ${result}]`;
      }
    }

    return `::${thisType.charAt(0).toUpperCase()}${thisType.substring(1)}`;
  }

  if (Array.isArray(value))
    return '::Array';

  if (value instanceof String)
    return '::String';

  if (value instanceof Number)
    return '::Number';

  if (value instanceof Boolean)
    return '::Boolean';

  let nativeTypeMeta = NATIVE_CLASS_TYPES_META.find((typeMeta) => {
    try {
      return (typeMeta[0] !== 'Object' && value instanceof typeMeta[1]);
    } catch (e) {
      return false;
    }
  });
  if (nativeTypeMeta)
    return `::${nativeTypeMeta[0]}`;

  if (typeof Math !== 'undefined' && value === Math)
    return '::Math';

  if (typeof JSON !== 'undefined' && value === JSON)
    return '::JSON';

  if (typeof Atomics !== 'undefined' && value === Atomics)
    return '::Atomics';

  if (typeof Reflect !== 'undefined' && value === Reflect)
    return '::Reflect';

  if (value[Symbol.toStringTag])
    return (typeof value[Symbol.toStringTag] === 'function') ? value[Symbol.toStringTag]() : value[Symbol.toStringTag];

  if (isPlainObject(value))
    return '::Object';

  return value.constructor.name || 'Object';
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Runtime type reflection helper. This is intended to be a more robust replacement for the `instanceof` operator.
 *
 *   This method will return `true` if the provided `value` is *any* of the provided `types`.
 *
 *   The provided `types` can each either be a real raw type (i.e. `String` class), or the name of a type, as a string,
 *   i.e. `'::String'`.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: The value whose type you wish to compare.
 *   - name: ...types
 *     dataType: Array<any>
 *     desc: All types you wish to check against. String values compare types by name, function values compare types by `instanceof`.
 * return: |
 *   @types boolean;
 *   1. Return `true` if `value` matches any of the provided `types`.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.typeOf;.
 */
function isType(value, ...types) {
  const getInternalTypeName = (type) => {
    let nativeTypeMeta = NATIVE_CLASS_TYPES_META.find((typeMeta) => (type === typeMeta[1]));
    if (nativeTypeMeta)
      return `::${nativeTypeMeta[0]}`;
  };

  let valueType = typeOf(value);
  for (let type of types) {
    try {
      if (typeOf(type, '::String') && valueType === type) {
        return true;
      } else if (typeof type === 'function') {
        if (value instanceof type)
          return true;

        let internalType = getInternalTypeName(type);
        if (internalType && internalType === valueType)
          return true;
      }
    } catch (e) {
      continue;
    }
  }

  return false;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Verify that the provided `value` is a `number` type (or `Number` instance), and that
 *   it **is not** `NaN`, `Infinity`, or `-Infinity`.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `true` if `value` is a `number` (or `Number` instance) and is also **not** `NaN`, `Infinity`, or `-Infinity`. i.e. `(isNumber(value) && isFinite(value))`.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.typeOf;.
 *   - |
 *     :eye: @see BaseUtils.isType;.
 */
function isValidNumber(value) {
  return (isType(value, '::Number') && isFinite(value));
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Verify that the provided `value` is a "plain"/"vanilla" Object instance.
 *
 *   This method is intended to help the caller detect if an object is a "raw plain object",
 *   inheriting from `Object.prototype` (or a `null` prototype).
 *
 *   1. `isPlainObject({})` will return `true`.
 *   2. `isPlainObject(new Object())` will return `true`.
 *   3. `isPlainObject(Object.create(null))` will return `true`.
 *   4. `isPlainObject(new CustomClass())` will return `false`.
 *   5. All other invocations should return `false`.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `true` if `value` is a "raw"/"plain" Object instance.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.typeOf;.
 *   - |
 *     :eye: @see BaseUtils.isType;.
 */
function isPlainObject(value) {
  if (!value)
    return false;

  if (typeof value !== 'object')
    return false;

  if (value.constructor === Object || value.constructor == null)
    return true;

  return false;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Detect if the provided `value` is a javascript primitive type.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `true` if `typeof value` is one of: `string`, `number`, `boolean`, `bigint`, or `symbol`,
 *      *and also* `value` is *not* `NaN`, `Infinity`, `-Infinity`, `undefined`, or `null`.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.typeOf;.
 *   - |
 *     :eye: @see BaseUtils.isType;.
 */
function isPrimitive(value) {
  if (value == null || Object.is(value, NaN))
    return false;

  if (typeof value === 'symbol')
    return true;

  if (Object.is(value, Infinity) || Object.is(value, -Infinity))
    return true;

  return isType(value, '::String', '::Number', '::Boolean', '::BigInt');
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Detect if the provided `value` is garbage collectable.
 *
 *   This method is used to check if any `value` is allowed to be used as a weak reference.
 *
 *   Essentially, this will return `false` for any primitive type, or `null`, `undefined`, `NaN`, `Infinity`, or `-Infinity` values.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `true` if `typeof value` is one of: `string`, `number`, `boolean`, `bigint`, or `symbol`,
 *      *and also* `value` *is not* `NaN`, `Infinity`, `-Infinity`, `undefined`, or `null`.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.typeOf;.
 *   - |
 *     :eye: @see BaseUtils.isType;.
 */
function isCollectable(value) {
  if (value == null || Object.is(value, NaN) || Object.is(Infinity) || Object.is(-Infinity))
    return false;

  if (typeof value === 'symbol')
    return false;

  if (isType(value, '::String', '::Number', '::Boolean', '::BigInt'))
    return false;

  return true;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Detect if the provided `value` is "empty" (is **N**ull **O**r **E**mpty).
 *
 *   A value is considered "empty" if any of the following conditions is met:
 *   1. `value` is `undefined`.
 *   2. `value` is `null`.
 *   3. `value` is `''` (an empty string).
 *   4. `value` is not an empty string, but it contains nothing except whitespace (`\t`, `\r`, `\s`, or `\n`).
 *   5. `value` is `NaN`.
 *   6. `value.length` is a `Number` or `number` type, and is equal to `0`.
 *   7. `value` is a @see BaseUtils.isPlainObject?caption=plain+object; and has no iterable keys.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `true` if any of the "empty" conditions above are true.
 *   2. Otherwise, `false` is returned.
 * notes:
 *   - |
 *     :eye: @see BaseUtils.isNotNOE;.
 */
function isNOE(value) {
  if (value == null)
    return true;

  if (Object.is(value, NaN))
    return true;

  if (value === '')
    return true;

  if (isType(value, '::String') && (/^[\t\s\r\n]*$/).test(value))
    return true;

  if (isType(value.length, '::Number'))
    return (value.length === 0);

  if (isPlainObject(value) && Object.keys(value).length === 0)
    return true;

  return false;
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Detect if the provided `value` is **not** "empty" (is not **N**ull **O**r **E**mpty).
 *
 *   A value is considered "empty" if any of the following conditions is met:
 *   1. `value` is `undefined`.
 *   2. `value` is `null`.
 *   3. `value` is `''` (an empty string).
 *   4. `value` is not an empty string, but it contains nothing except whitespace (`\t`, `\r`, `\s`, or `\n`).
 *   5. `value` is `NaN`.
 *   6. `value.length` is a `Number` or `number` type, and is equal to `0`.
 *   7. `value` is a @see BaseUtils.isPlainObject?caption=plain+object; and has no iterable keys.
 * arguments:
 *   - name: value
 *     dataType: any
 *     desc: Value to check
 * return: |
 *   @types boolean;
 *   1. Return `false` if any of the "empty" conditions above are true.
 *   2. Otherwise, `true` is returned.
 * notes:
 *   - |
 *     :info: This is the exact inverse of @see BaseUtils.isNOE;
 *   - |
 *     :eye: @see BaseUtils.isNOE;.
 */
function isNotNOE(value) {
  return !isNOE(value);
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Convert the provided `string` `value` into [camelCase](https://en.wikipedia.org/wiki/Letter_case#Camel_case).
 *
 *   The process is roughly as follows:
 *   1. Any non-word characters ([a-zA-Z0-9_]) are stripped from the beginning of the string.
 *   2. Any non-word characters ([a-zA-Z0-9_]) are stripped from the end of the string.
 *   3. Each "word" is capitalized.
 *   4. The first letter is always lower-cased.
 * arguments:
 *   - name: value
 *     dataType: string
 *     desc: String to convert into [camelCase](https://en.wikipedia.org/wiki/Letter_case#Camel_case).
 * return: |
 *   @types string; The formatted string in [camelCase](https://en.wikipedia.org/wiki/Letter_case#Camel_case).
 * examples:
 *   - |
 *     ```javascript
 *     import { BaseUtils } from 'mythix-ui-core@1.0';
 *
 *     console.log(BaseUtils.toCamelCase('--test-some_value_@'));
 *     // output -> 'testSomeValue'
 *     ```
 */
function toCamelCase(value) {
  return ('' + value)
    .replace(/^\W/, '')
    .replace(/[\W]+$/, '')
    .replace(/([A-Z]+)/g, '-$1')
    .toLowerCase()
    .replace(/\W+(.)/g, (m, p) => {
      return p.toUpperCase();
    })
    .replace(/^(.)(.*)$/, (m, f, l) => `${f.toLowerCase()}${l}`);
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Convert the provided `string` `value` into [snake_case](https://en.wikipedia.org/wiki/Letter_case#Snake_case).
 *
 *   The process is roughly as follows:
 *   1. Any capitalized character sequence is prefixed by an underscore.
 *   2. More than one sequential underscores are converted into a single underscore.
 * arguments:
 *   - name: value
 *     dataType: string
 *     desc: String to convert into [snake_case](https://en.wikipedia.org/wiki/Letter_case#Snake_case).
 * return: |
 *   @types string; The formatted string in [snake_case](https://en.wikipedia.org/wiki/Letter_case#Snake_case).
 * examples:
 *   - |
 *     ```javascript
 *     import { BaseUtils } from 'mythix-ui-core@1.0';
 *
 *     console.log(BaseUtils.toSnakeCase('ThisIsASentence'));
 *     // output -> 'this_is_a_sentence'
 *     ```
 */
function toSnakeCase(value) {
  return ('' + value)
    .replace(/[A-Z]+/g, (m, offset) => ((offset) ? `_${m.toLowerCase()}` : m.toLowerCase()))
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Convert the provided `string` `value` into [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case).
 *
 *   The process is roughly as follows:
 *   1. Any capitalized character sequence is prefixed by a hyphen.
 *   2. More than one sequential hyphens are converted into a single hyphen.
 * arguments:
 *   - name: value
 *     dataType: string
 *     desc: String to turn into [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case).
 * return: |
 *   @types string; The formatted string in [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Kebab_case).
 * examples:
 *   - |
 *     ```javascript
 *     import { BaseUtils } from 'mythix-ui-core@1.0';
 *
 *     console.log(BaseUtils.toKebabCase('ThisIsASentence'));
 *     // output -> 'this-is-a-sentence'
 *     ```
 */

const IS_LAST_CHAR_UPPERCASE = /[A-Z]$/;
function toKebabCase(value) {
  return ('' + value)
    .replace(/[A-Z][a-z]+|[A-Z]{2,}/g, (m, offset) => {
      if (m.length > 1 && IS_LAST_CHAR_UPPERCASE.test(m))
        return (`${(offset) ? '-' : ''}${m.slice(0, -1)}-${m.slice(-1)}`).toLowerCase();

      return ((offset) ? `-${m.toLowerCase()}` : m.toLowerCase());
    })
    .replace(/-{2,}/g, '-')
    .toLowerCase();
}

/**
 * groupName: BaseUtils
 * desc: |
 *   Do our best to emulate [process.nextTick](https://nodejs.org/en/guides/event-loop-timers-and-nexttick/#processnexttick)
 *   in the browser.
 *
 *   In order to try and emulate `process.nextTick`, this function will use `globalThis.requestAnimationFrame(() => callback())` if available,
 *   otherwise it will fallback to using `Promise.resolve().then(callback)`.
 * arguments:
 *   - name: callback
 *     dataType: function
 *     desc: Callback function to call on "nextTick".
 * notes:
 *   - |
 *     :info: This function will prefer and use `process.nextTick` if it is available (i.e. if running on NodeJS).
 *   - |
 *     :warning: This function is unlikely to actually be the next "tick" of the underlying
 *     javascript engine. This method just does its best to emulate "nextTick". Instead of the
 *     actual "next tick", this will instead be "as fast as possible".
 *   - |
 *     :info: This function deliberately attempts to use `requestAnimationFrame` first--even though it likely doesn't
 *     have the fastest turn-around-time--to save battery power. The idea being that "something needs to be done *soon*".
 */
function nextTick(callback) {
  if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
    process.nextTick(callback);
  } else if (typeof globalThis.requestAnimationFrame === 'function') {
    globalThis.requestAnimationFrame(() => {
      callback();
    });
  } else {
    (new Promise((resolve) => {
      resolve();
    })).then(() => {
      callback();
    });
  }
}

const IS_NUMBER = /^([-+]?)(\d*(?:\.\d+)?)(e[-+]\d+)?$/;
const IS_BOOLEAN = /^(true|false)$/;

/**
 * groupName: BaseUtils
 * desc: |
 *   Coerce a string to its most likely underlying primitive type.
 *
 *   Conversion input and output table:
 *   * `'null'` converts to `null`
 *   * `'undefined'` converts to `undefined`
 *   * `'NaN'` converts to `NaN`
 *   * `'Infinity'` converts to `Infinity`
 *   * `'-Infinity'` converts to `-Infinity`
 *   * `'true'` converts to `true`
 *   * `'false'` converts to `false`
 *   * Any parsable numeric string value (including [E notation](https://en.wikipedia.org/wiki/Scientific_notation#E_notation)) converts to `number`
 *
 * arguments:
 *   - name: value
 *     dataType: string
 *     desc: Value to convert.
 */
function coerce(value) {
  if (value === 'null')
    return null;

  if (value === 'undefined')
    return undefined;

  if (value === 'NaN')
    return NaN;

  if (value === 'Infinity' || value === '+Infinity')
    return Infinity;

  if (value === '-Infinity')
    return -Infinity;

  if (IS_NUMBER.test(value))
    // eslint-disable-next-line no-magic-numbers
    return parseFloat(value, 10);

  if (IS_BOOLEAN.test(value))
    return (value === 'true');

  return value;
}


/***/ }),

/***/ "./lib/component-utils.js":
/*!********************************!*\
  !*** ./lib/component-utils.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getIdentifier: () => (/* binding */ getIdentifier),
/* harmony export */   getLargestDocumentTabIndex: () => (/* binding */ getLargestDocumentTabIndex),
/* harmony export */   getVisibilityMeta: () => (/* binding */ getVisibilityMeta),
/* harmony export */   importIntoDocumentFromSource: () => (/* binding */ importIntoDocumentFromSource),
/* harmony export */   insertScriptIntoHead: () => (/* binding */ insertScriptIntoHead),
/* harmony export */   loadPartialIntoElement: () => (/* binding */ loadPartialIntoElement),
/* harmony export */   require: () => (/* binding */ require),
/* harmony export */   resolveURL: () => (/* binding */ resolveURL),
/* harmony export */   visibilityObserver: () => (/* binding */ visibilityObserver)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements.js */ "./lib/elements.js");






/**
 * type: Namespace
 * name: ComponentUtils
 * groupName: ComponentUtils
 * desc: |
 *   `import { ComponentUtils } from 'mythix-ui-core@1.0';`
 *
 *   Component and framework classes and functionality are found here.
 */

function getIdentifier(target) {
  if (!target)
    return 'undefined';

  if (typeof target.getIdentifier === 'function')
    return target.getIdentifier.call(target);

  if (target instanceof Element)
    return target.getAttribute('id') || target.getAttribute('name') || target.getAttribute('data-name') || _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.toCamelCase(target.localName);

  return 'undefined';
}

function resolveURL(rootLocation, _urlish) {
  let urlish = _urlish;
  if (urlish instanceof URL)
    urlish = urlish.toString();

  if (!urlish)
    urlish = '';

  if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(urlish, '::String'))
    return;

  let url = new URL(urlish, new URL(rootLocation));
  if (typeof globalThis.mythixUI.urlResolver === 'function') {
    let fileName  = '';
    let path      = '/';

    url.pathname.replace(/^(.*\/)([^/]+)$/, (m, first, second) => {
      path = first.replace(/\/+$/, '/');
      if (path.charAt(path.length - 1) !== '/')
        path = `${path}/`;

      fileName = second;
      return m;
    });

    let newSrc = globalThis.mythixUI.urlResolver.call(this, { src: urlish, url, path, fileName });
    if (newSrc === false) {
      console.warn(`"mythix-require": Not loading "${urlish}" because the global "mythixUI.urlResolver" requested I not do so.`);
      return;
    }

    if (newSrc && (newSrc.toString() !== url.toString() && newSrc.toString() !== urlish))
      url = resolveURL.call(this, rootLocation, newSrc);
  }

  return url;
}

const IS_TEMPLATE         = /^(template)$/i;
const IS_SCRIPT           = /^(script)$/i;
const IS_HEAD_TAG         = /^(style|link|meta)$/i;
const SHOULD_IGNORE       = /^(base|noscript|title)$/i;
const REQUIRE_CACHE       = new Map();
const RESOLVE_SRC_ELEMENT = /^script|link|style|mythix-language-pack|mythix-require$/i;

function importIntoDocumentFromSource(ownerDocument, location, _url, sourceString, _options) {
  let options   = _options || {};
  let url       = resolveURL.call(this, location, _url, options.magic);
  let fileName;
  let baseURL   = new URL(`${url.origin}${url.pathname.replace(/[^/]+$/, (m) => {
    fileName = m;
    return '';
  })}${url.search}${url.hash}`);

  let template = ownerDocument.createElement('template');
  template.innerHTML = sourceString;

  let children = Array.from(template.content.children).sort((a, b) => {
    let x = a.tagName;
    let y = b.tagName;

    // eslint-disable-next-line eqeqeq
    if (x == y)
      return 0;

    return (x < y) ? 1 : -1;
  });

  const fileNameToElementName = (fileName) => {
    return fileName.trim().replace(/\..*$/, '').replace(/\b[A-Z]|[^A-Z][A-Z]/g, (_m) => {
      let m = _m.toLowerCase();
      return (m.length < 2) ? `-${m}` : `${m.charAt(0)}-${m.charAt(1)}`;
    }).replace(/-{2,}/g, '-').replace(/^[^a-z]*/, '').replace(/[^a-z]*$/, '');
  };

  let guessedElementName  = fileNameToElementName(fileName);
  let context             = {
    guessedElementName,
    children,
    ownerDocument,
    template,
    url,
    baseURL,
    fileName,
  };

  if (typeof options.preProcess === 'function') {
    template = context.template = options.preProcess.call(this, context);
    children = Array.from(template.content.children);
  }

  let nodeHandler   = options.nodeHandler;
  let templateCount = children.reduce((sum, element) => ((IS_TEMPLATE.test(element.tagName)) ? (sum + 1) : sum), 0);

  context.templateCount = templateCount;

  const resolveElementSrcAttribute = (element, baseURL) => {
    // Resolve "src" attribute, since we are
    // going to be moving the element around
    let src = element.getAttribute('src');
    if (src) {
      src = resolveURL.call(this, baseURL, src, false);
      element.setAttribute('src', src.toString());
    }

    return element;
  };

  for (let child of children) {
    if (options.magic && RESOLVE_SRC_ELEMENT.test(child.localName))
      child = resolveElementSrcAttribute(child, baseURL);

    if (SHOULD_IGNORE.test(child.tagName)) {
      continue;
    } else if (IS_TEMPLATE.test(child.tagName)) { // <template>
      if (templateCount === 1 && child.getAttribute('data-for') == null && child.getAttribute('data-mythix-component-name') == null) {
        console.warn(`${url}: <template> is missing a "data-for" attribute, linking it to its owner component. Guessing "${guessedElementName}".`);
        child.setAttribute('data-for', guessedElementName);
      }

      if (typeof nodeHandler === 'function' && nodeHandler.call(this, child, { ...context, isTemplate: true, isHandled: true }) === false)
        continue;

      // append to body
      let elementName = (child.getAttribute('data-for') || child.getAttribute('data-mythix-component-name'));
      if (!ownerDocument.body.querySelector(`[data-for="${elementName}" i],[data-mythix-component-name="${elementName}" i]`))
        ownerDocument.body.appendChild(child);
    } else if (IS_SCRIPT.test(child.tagName)) { // <script>
      let childClone = ownerDocument.createElement(child.tagName);
      for (let attributeName of child.getAttributeNames()) {
        if (attributeName === 'src')
          continue;

        childClone.setAttribute(attributeName, child.getAttribute(attributeName));
      }

      let src = child.getAttribute('src');
      if (src) {
        src = resolveURL.call(this, baseURL, src, false);
        childClone.setAttribute('src', src.toString());
      } else {
        childClone.setAttribute('type', 'module');
        childClone.innerHTML = child.textContent;
      }

      if (typeof nodeHandler === 'function' && nodeHandler.call(this, childClone, { ...context, isScript: true, isHandled: true }) === false)
        continue;

      let scriptID = childClone.getAttribute('id');
      if (!scriptID) {
        scriptID = `ID${_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.SHA256(`${guessedElementName}:${src || childClone.innerHTML}`)}`;
        childClone.setAttribute('id', scriptID);
      }

      // append to head
      if (!ownerDocument.querySelector(scriptID))
        ownerDocument.head.appendChild(childClone);
    } else if (IS_HEAD_TAG.test(child.tagName)) { // <link> & <style>
      let isStyle = (/^style$/i).test(child.tagName);
      if (typeof nodeHandler === 'function' && nodeHandler.call(this, child, { ...context, isStyle, isLink: !isStyle, isHandled: true }) === false)
        continue;

      let styleID = child.getAttribute('id');
      if (!styleID) {
        styleID = `ID${_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.SHA256(child.outerHTML)}`;
        child.setAttribute('id', styleID);
      }

      // append to head
      if (!ownerDocument.querySelector(`${child.tagName}#${styleID}`))
        ownerDocument.head.appendChild(child);
    } else if ((/^meta$/i).test(child.tagName)) { // <meta>
      if (typeof nodeHandler === 'function')
        nodeHandler.call(this, child, { ...context, isMeta: true, isHandled: true });

      // do nothing with these tags
      continue;
    } else { // Everything else
      let isHandled = false;

      if (child.localName === 'mythix-language-pack') {
        let langPackID = child.getAttribute('id');
        if (!langPackID) {
          langPackID = `ID${_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.SHA256(`${guessedElementName}:${child.outerHTML}`)}`;
          child.setAttribute('id', langPackID);
        }

        let languageProvider = this.closest('mythix-language-provider');
        if (!languageProvider)
          languageProvider = document.querySelector('mythix-language-provider');

        if (languageProvider) {
          if (!languageProvider.querySelector(`mythix-language-pack#${langPackID}`))
            languageProvider.insertBefore(child, languageProvider.firstChild);

          isHandled = true;
        } // else do nothing... let it be dumped into the dom later
      }

      if (typeof nodeHandler === 'function')
        nodeHandler.call(this, child, { ...context, isHandled });
    }
  }

  if (typeof options.postProcess === 'function') {
    template = context.template = options.postProcess.call(this, context);
    children = Array.from(template.content.children);
  }

  return context;
}

/**
 * groupName: ComponentUtils
 * desc: |
 *   Load a resource from a URL with caching support.
 *
 *   By default, uses `cache: 'default'` which respects HTTP caching headers
 *   (Cache-Control, ETag, etc.). The cache mode can be overridden via:
 *   - URL query parameter: `?cache=no-store`
 *   - fetchOptions.cache: `{ fetchOptions: { cache: 'no-cache' } }`
 *
 *   Supported cache values:
 *   - 'default': Browser uses HTTP cache headers (recommended)
 *   - 'no-store': Bypass cache completely
 *   - 'reload': Fetch fresh but update cache
 *   - 'no-cache': Always revalidate with server
 *   - 'force-cache': Use cache if available, even if stale
 */
async function require(urlOrName, _options) {
  let options       = _options || {};
  let ownerDocument = options.ownerDocument || document;
  let url           = resolveURL.call(this, ownerDocument.location, urlOrName, options.magic);
  let cacheKey;

  // Check for cache mode override in URL params
  let urlCacheParam = url.searchParams.get('cache');
  let skipInternalCache = (/^(false|no-store|reload|no-cache)$/).test(urlCacheParam);

  if (!skipInternalCache) {
    if (url.searchParams.get('cacheParams') !== 'true') {
      let cacheKeyURL = new URL(`${url.origin}${url.pathname}`);
      cacheKey = cacheKeyURL.toString();
    } else {
      cacheKey = url.toString();
    }

    let cachedResponse = REQUIRE_CACHE.get(cacheKey);
    if (cachedResponse) {
      cachedResponse = await cachedResponse;
      if (cachedResponse.response && cachedResponse.response.ok)
        return { url, response: cachedResponse.response, ownerDocument, cached: true };
    }
  }

  // Build fetch options with cache support
  // Default to 'default' which respects HTTP caching headers (Cache-Control, ETag, etc.)
  let fetchOptions = {
    cache: 'default',
    ...(options.fetchOptions || {}),
  };

  // URL parameter overrides fetchOptions.cache
  if (urlCacheParam && /^(default|no-store|reload|no-cache|force-cache|only-if-cached)$/.test(urlCacheParam))
    fetchOptions.cache = urlCacheParam;

  let promise = globalThis.fetch(url, fetchOptions).then(
    async (response) => {
      if (!response.ok) {
        if (cacheKey)
          REQUIRE_CACHE.delete(cacheKey);

        let error = new Error(`${response.status} ${response.statusText}`);
        error.url = url;
        throw error;
      }

      let body = await response.text();
      response.text = async () => body;
      response.json = async () => JSON.parse(body);

      return { url, response, ownerDocument, cached: false };
    },
    (error) => {
      console.error('Error from Mythix UI "require": ', error);

      if (cacheKey)
        REQUIRE_CACHE.delete(cacheKey);

      error.url = url;
      throw error;
    },
  );

  REQUIRE_CACHE.set(cacheKey, promise);

  return await promise;
}

async function loadPartialIntoElement(src, _options) {
  let options = _options || {};

  let {
    ownerDocument,
    url,
    response,
  } = await require.call(
    this,
    src,
    {
      ownerDocument: this.ownerDocument || document,
    },
  );

  let body = await response.text();
  while (this.childNodes.length)
    this.removeChild(this.childNodes[0]);

  let scopeData = Object.create(null);
  for (let [ key, value ] of url.searchParams.entries())
    scopeData[key] = _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.coerce(value);

  importIntoDocumentFromSource.call(
    this,
    ownerDocument,
    ownerDocument.location,
    url,
    body,
    {
      nodeHandler: (node, { isHandled, isTemplate }) => {
        if ((isTemplate || !isHandled) && (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE)) {
          this.appendChild(
            _elements_js__WEBPACK_IMPORTED_MODULE_3__.processElements.call(
              this,
              node,
              {
                ...options,
                scope: _utils_js__WEBPACK_IMPORTED_MODULE_2__.createScope(scopeData, options.scope),
              },
            ),
          );
        }
      },
    },
  );
}

function visibilityObserver(callback, _options) {
  const intersectionCallback = (entries) => {
    for (let i = 0, il = entries.length; i < il; i++) {
      let entry   = entries[i];
      let element = entry.target;
      if (!entry.isIntersecting)
        continue;

      let elementObservers = _utils_js__WEBPACK_IMPORTED_MODULE_2__.metadata(element, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_INTERSECTION_OBSERVERS);
      if (!elementObservers) {
        elementObservers = new Map();
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.metadata(element, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_INTERSECTION_OBSERVERS, elementObservers);
      }

      let data = elementObservers.get(observer);
      if (!data) {
        data = { wasVisible: false, ratioVisible: entry.intersectionRatio };
        elementObservers.set(observer, data);
      }

      if (entry.intersectionRatio > data.ratioVisible)
        data.ratioVisible = entry.intersectionRatio;

      data.previousVisibility = (data.visibility === undefined) ? data.visibility : data.visibility;
      data.visibility = (entry.intersectionRatio > 0.0);

      callback({ ...data, entry, element, index: i, disconnect: () => observer.unobserve(element) });

      if (data.visibility && !data.wasVisible)
        data.wasVisible = true;
    }
  };

  let options = {
    root:       null,
    threshold:  0.0,
    ...(_options || {}),
  };

  let observer  = new IntersectionObserver(intersectionCallback, options);
  let elements  = (_options || {}).elements || [];

  for (let i = 0, il = elements.length; i < il; i++)
    observer.observe(elements[i]);

  return observer;
}

const NO_OBSERVER = Object.freeze({
  wasVisible:         false,
  ratioVisible:       0.0,
  visibility:         false,
  previousVisibility: false,
});

function getVisibilityMeta(element, observer) {
  let elementObservers = _utils_js__WEBPACK_IMPORTED_MODULE_2__.metadata(element, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_INTERSECTION_OBSERVERS);
  if (!elementObservers)
    return NO_OBSERVER;

  return elementObservers.get(observer) || NO_OBSERVER;
}

function getLargestDocumentTabIndex(ownerDocument) {
  let largest = -Infinity;

  Array.from((ownerDocument || document).querySelectorAll('[tabindex]')).forEach((element) => {
    let tabIndex = parseInt(element.getAttribute('tabindex'), 10);
    if (!isFinite(tabIndex))
      return;

    if (tabIndex > largest)
      largest = tabIndex;
  });

  return (largest < 0) ? 0 : largest;
}

function insertScriptIntoHead(_url, _options) {
  let options       = _options || {};
  let attributes    = options.attributes || {};
  let ownerDocument = options.ownerDocument || document;
  let scriptElement = ownerDocument.createElement('script');
  let url           = resolveURL.call(this, ownerDocument.location, _url, { magic: true });

  for (let [ attributeName, attributeValue ] of Object.entries(attributes)) {
    if (attributeName === 'src')
      attributeValue = resolveURL.call(this, ownerDocument.location, attributeValue, { magic: true });

    scriptElement.setAttribute(attributeName, attributeValue);
  }

  let scriptID = scriptElement.getAttribute('id');
  if (!scriptID) {
    scriptID = `ID${_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.SHA256(url)}`;
    scriptElement.setAttribute('id', scriptID);
  }

  scriptElement.setAttribute('src', url);

  if (!Object.prototype.hasOwnProperty.call(attributes, 'type'))
    scriptElement.setAttribute('type', 'module');

  // append to head
  if (!ownerDocument.querySelector(scriptID))
    ownerDocument.head.appendChild(scriptElement);

  return scriptElement;
}

/***/ }),

/***/ "./lib/constants.js":
/*!**************************!*\
  !*** ./lib/constants.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DYNAMIC_PROPERTY_IS_SETTING: () => (/* binding */ DYNAMIC_PROPERTY_IS_SETTING),
/* harmony export */   DYNAMIC_PROPERTY_LISTENERS: () => (/* binding */ DYNAMIC_PROPERTY_LISTENERS),
/* harmony export */   DYNAMIC_PROPERTY_SET: () => (/* binding */ DYNAMIC_PROPERTY_SET),
/* harmony export */   DYNAMIC_PROPERTY_TYPE: () => (/* binding */ DYNAMIC_PROPERTY_TYPE),
/* harmony export */   DYNAMIC_PROPERTY_VALUE: () => (/* binding */ DYNAMIC_PROPERTY_VALUE),
/* harmony export */   ELEMENT_DEFINITION_TYPE: () => (/* binding */ ELEMENT_DEFINITION_TYPE),
/* harmony export */   MYTHIX_DOCUMENT_INITIALIZED: () => (/* binding */ MYTHIX_DOCUMENT_INITIALIZED),
/* harmony export */   MYTHIX_INTERSECTION_OBSERVERS: () => (/* binding */ MYTHIX_INTERSECTION_OBSERVERS),
/* harmony export */   MYTHIX_NAME_VALUE_PAIR_HELPER: () => (/* binding */ MYTHIX_NAME_VALUE_PAIR_HELPER),
/* harmony export */   MYTHIX_SHADOW_PARENT: () => (/* binding */ MYTHIX_SHADOW_PARENT),
/* harmony export */   MYTHIX_TYPE: () => (/* binding */ MYTHIX_TYPE),
/* harmony export */   MYTHIX_UI_COMPONENT_TYPE: () => (/* binding */ MYTHIX_UI_COMPONENT_TYPE),
/* harmony export */   QUERY_ENGINE_TYPE: () => (/* binding */ QUERY_ENGINE_TYPE),
/* harmony export */   UNFINISHED_DEFINITION: () => (/* binding */ UNFINISHED_DEFINITION)
/* harmony export */ });
/**
 * type: Namespace
 * name: Constants
 * groupName: Constants
 * desc: |
 *   `import { Constants } from 'mythix-ui-core@1.0';`
 *
 *   Misc global constants are found within this namespace.
 * properties:
 *   - name: MYTHIX_INTERSECTION_OBSERVERS
 *     dataType: symbol
 *     desc: |
 *       This symbol is used as a @see Utils.metadata; key against elements with a `data-src` attribute.
 *       For elements with this attribute, set an [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is setup.
 *       When the intersection observer reports that the element is visible, then the URL specified by `data-src` is fetched, and dumped into
 *       the element as its children. This allows for dynamic "partials" that are loaded at run-time.
 *
 *       The value stored at this @see Utils.metadata; key is a Map of [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
 *       instances. The keys of this map are the intersection observers themselves. The values are raw objects with the shape
 *       `{ wasVisible: boolean, ratioVisible: float, previousVisibility: boolean, visibility: boolean }`.
 *   - name: MYTHIX_NAME_VALUE_PAIR_HELPER
 *     dataType: symbol
 *     desc: |
 *       This is used as a @see Utils.metadata?caption=metadata; key by @see Utils.globalStoreNameValuePairHelper;
 *       to store key/value pairs for a single value.
 *
 *       Mythix UI has global store and fetch helpers for setting and fetching dynamic properties. These
 *       methods only accept a single value by design... but sometimes it is desired that a value be set
 *       with a specific key instead. This `MYTHIX_NAME_VALUE_PAIR_HELPER` property assists with this process,
 *       allowing global helpers to still function with a single value set, while in some cases still passing
 *       a key through to the setter. @sourceRef _mythixNameValuePairHelperUsage;
 *     notes:
 *       - |
 *         :warning: Use at your own risk. This is Mythix UI internal code that might change in the future.
 *   - name: MYTHIX_SHADOW_PARENT
 *     dataType: symbol
 *     desc: |
 *       This is used as a @see Utils.metadata?caption=metadata; key by @see MythixUIComponent; to
 *       store the parent node of a Shadow DOM, so that it can later be traversed by @see Utils.getParentNode;.
 *     notes:
 *       - |
 *         :warning: Use at your own risk. This is Mythix UI internal code that might change in the future.
 *       - |
 *         :eye: @see Utils.getParentNode;.
 *   - name: MYTHIX_TYPE
 *     dataType: symbol
 *     desc: |
 *       This is used for type checking by `instanceof` checks to determine if an instance
 *       is a specific type (even across javascript contexts and library versions). @sourceRef _mythixTypeExample;
 *     notes:
 *       - |
 *         :eye: @see BaseUtils.isType;.
 *   - name: DYNAMIC_PROPERTY_TYPE
 *     dataType: symbol
 *     desc: |
 *       Used for runtime type reflection against @see Utils.DynamicProperty;.
 *     notes:
 *       - |
 *         :eye: @see DynamicProperty;.
 *       - |
 *         :eye: @see BaseUtils.isType;.
 *       - |
 *         :eye: @see Constants.MYTHIX_TYPE;.
 */

// Base
const MYTHIX_NAME_VALUE_PAIR_HELPER  = Symbol.for('@mythix/mythix-ui/constants/name-value-pair-helper'); // @ref:Constants.MYTHIX_NAME_VALUE_PAIR_HELPER
const MYTHIX_SHADOW_PARENT           = Symbol.for('@mythix/mythix-ui/constants/shadow-parent'); // @ref:Constants.MYTHIX_SHADOW_PARENT
const MYTHIX_TYPE                    = Symbol.for('@mythix/mythix-ui/constants/element-definition'); // @ref:Constants.MYTHIX_TYPE
const MYTHIX_INTERSECTION_OBSERVERS  = Symbol.for('@mythix/mythix-ui/component/constants/intersection-observers'); // @ref:Constants.MYTHIX_INTERSECTION_OBSERVERS
const MYTHIX_DOCUMENT_INITIALIZED    = Symbol.for('@mythix/mythix-ui/component/constants/document-initialized'); // @ref:Constants.MYTHIX_DOCUMENT_INITIALIZED

// DynamicProperty
const DYNAMIC_PROPERTY_VALUE         = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/value');
const DYNAMIC_PROPERTY_IS_SETTING    = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/is-setting');
const DYNAMIC_PROPERTY_SET           = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/set');
const DYNAMIC_PROPERTY_LISTENERS     = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/listeners');

// Types
const ELEMENT_DEFINITION_TYPE        = Symbol.for('@mythix/mythix-ui/types/MythixUI::ElementDefinition');
const QUERY_ENGINE_TYPE              = Symbol.for('@mythix/mythix-ui/types/MythixUI::QueryEngine');
const DYNAMIC_PROPERTY_TYPE          = Symbol.for('@mythix/mythix-ui/types/MythixUI::DynamicProperty'); // @ref:Constants.DYNAMIC_PROPERTY_TYPE
const MYTHIX_UI_COMPONENT_TYPE       = Symbol.for('@mythix/mythix-ui/types/MythixUI::MythixUIComponent');

// Elements
const UNFINISHED_DEFINITION          = Symbol.for('@mythix/mythix-ui/constants/unfinished');




/***/ }),

/***/ "./lib/dynamic-property.js":
/*!*********************************!*\
  !*** ./lib/dynamic-property.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DynamicProperty: () => (/* binding */ DynamicProperty)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");




globalThis.mythixUI = (globalThis.mythixUI || {});

/**
 * groupName: DynamicProperty
 * desc: |
 *   `DynamicProperty` is a simple value storage class wrapped in a Proxy.
 *
 *    It will allow the user to store any desired value. The catch however is that
 *    any value stored can only be set through its special `set` method.
 *
 *    This will allow any listeners to receive the `'update'` event when a value is set.
 *
 *    Since `DynamicProperty` instances are also always wrapped in a Proxy, the user may
 *    "directly" access attributes of the stored value. For example, if a `DynamicProperty`
 *    is storing an Array instance, then one would be able to access the `.length` property
 *    "directly", i.e. `dynamicProp.length`.
 *
 *    `DynamicProperty` has a special `set` method, whose name is a `symbol`, to avoid conflicting
 *    namespaces with the underlying datatype (and the wrapping Proxy).
 *    To set a value on a `DynamicProperty` instance, one must do so as follows: `dynamicProperty[DynamicProperty.set](myNewValue)`.
 *    This will update the internal value, and if the set value differs from the stored value, the `'update'` event will be dispatched to
 *    any listeners.
 *
 *    As `DynamicProperty` is an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/EventTarget), one can attach
 *    event listeners to the `'update'` event to listen for updates to the underlying value. The `'update'` event is the only event that is
 *    ever triggered by this class. The received `event` instance in event callbacks will have the following attributes:
 *    1. `updateEvent.originator = this;` - `originator` is the instance of the `DynamicProperty` where the event originated from.
 *    2. `updateEvent.oldValue = currentValue;` - `oldValue` contains the previous value of the `DynamicProperty` before set.
 *    3. `updateEvent.value = newValue;` - `value` contains the current value being set on the `DynamicProperty`.
 *
 *    To retrieve the underlying raw value of a `DynamicProperty`, one may call `valueOf()`: `let rawValue = dynamicProperty.valueOf();`
 * notes:
 *   - |
 *     :warning: `DynamicProperty` instances will internally track when a `set` operation is underway, to prevent
 *     cyclic sets and maximum call stack errors. You are allowed to set the value recursively, however `update` events
 *     will only be dispatched for the first `set` call. Any `set` operation that happens while another `set` operation is
 *     underway will **not** dispatch any `'update'` events.
 *   - |
 *     `'update'` events will be dispatched immediately *after* the internal underlying stored value is updated. Though it is
 *     possible to `stopImmediatePropagation` in an event callback, attempting to "preventDefault" or "stopPropagation" will do nothing.
 * examples:
 *   - |
 *     ```javascript
 *     import { DynamicProperty } from 'mythix-ui-core@1.0';
 *
 *     let dynamicProperty = new DynamicProperty('initial value');
 *
 *     dynamicProperty.addEventListener('update', (event) => {
 *       console.log(`Dynamic Property Updated! New value = '${event.value}', Previous Value = '${event.oldValue}'`);
 *       console.log(`Current Value = '${dynamicProperty.valueOf()}'`);
 *     });
 *
 *     dynamicProperty[DynamicProperty.set]('new value');
 *
 *     // output -> Dynamic Property Updated! New value = 'new value', Old Value = 'initial value'
 *     // output -> Current Value = 'initial value'
 *     ```
 */
class DynamicProperty extends EventTarget {
  static [Symbol.hasInstance](instance) { // @ref:_mythixTypeExample
    try {
      return (instance && instance[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_TYPE);
    } catch (e) {
      return false;
    }
  }

  /**
   * type: Property
   * name: set
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * static: true
   * desc: |
   *   A special `symbol` used to access the `set` method of a `DynamicProperty`.
   * examples:
   *   - |
   *     ```javascript
   *     import { DynamicProperty } from 'mythix-ui-core@1.0';
   *
   *     let dynamicProperty = new DynamicProperty('initial value');
   *
   *     dynamicProperty.addEventListener('update', (event) => {
   *       console.log(`Dynamic Property Updated! New value = '${event.value}', Previous Value = '${event.oldValue}'`);
   *       console.log(`Current Value = '${dynamicProperty.valueOf()}'`);
   *     });
   *
   *     dynamicProperty[DynamicProperty.set]('new value');
   *
   *     // output -> Dynamic Property Updated! New value = 'new value', Old Value = 'initial value'
   *     // output -> Current Value = 'initial value'
   *     ```
   */
  static set = _constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_SET; // @ref:DynamicProperty.set

  /**
   * type: Function
   * name: constructor
   * groupName: DynamicProperty
   * parent: Utils
   * desc: |
   *   Construct a `DynamicProperty`.
   * arguments:
   *   - name: initialValue
   *     dataType: any
   *     desc:
   *       The initial value to store.
   * notes:
   *   - |
   *     :info: This will return a Proxy instance wrapping the `DynamicProperty` instance.
   *   - |
   *     :info: You can not set a `DynamicProperty` to another `DynamicProperty` instance.
   *     If `initialValue` is a `DynamicProperty` instance, it will use the stored value
   *     of that instance instead (by calling @see DynamicProperty.valueOf;).
   */
  constructor(initialValue) {
    super();

    Object.defineProperties(this, {
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        _constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_TYPE,
      },
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(initialValue, DynamicProperty)) ? initialValue.valueOf() : initialValue,
      },
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_IS_SETTING]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        false,
      },
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_LISTENERS]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
    });

    let proxy = new Proxy(this, {
      get:  (target, propName) => {
        if (propName in target) {
          let value = target[propName];
          return (typeof value === 'function') ? value.bind(target) : value;
        }

        let value = target[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE][propName];
        return (value === 'function') ? value.bind(target[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE]) : value;
      },
      set:  (target, propName, value) => {
        if (propName in target)
          target[propName] = value;
        else
          target[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE][propName] = value;

        return true;
      },
    });

    return proxy;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'number')
      return +this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE];
    else if (hint === 'string')
      return this.toString();

    return this.valueOf();
  }

  /**
   * Convert the dynamic property value to a string.
   * @returns {string} The string representation of the value.
   */
  toString() {
    let value = this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE];
    return (value && typeof value.toString === 'function') ? value.toString() : ('' + value);
  }

  /**
   * type: Function
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * desc: |
   *   Fetch the underlying raw value stored by this `DynamicProperty`.
   * return: |
   *   @types: any; The underling raw value.
   */

  /**
   * Get the underlying raw value stored by this DynamicProperty.
   * @returns {*} The underlying raw value.
   */
  valueOf() {
    return this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE];
  }

  /**
   * type: Function
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * desc: |
   *   Internal fallback method to notify listeners directly when native EventTarget
   *   dispatching fails (e.g., due to Event class mismatches in Node.js/JSDOM environments).
   * arguments:
   *   - name: eventType
   *     dataType: string
   *     desc: The event type to dispatch (e.g., 'update').
   *   - name: eventData
   *     dataType: object
   *     desc: An object containing event data to pass to handlers.
   */
  _notifyListeners(eventType, eventData) {
    let listenersMap = this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_LISTENERS];
    let handlers = listenersMap.get(eventType);

    if (!handlers)
      return;

    for (let handler of handlers) {
      try {
        handler(eventData);
      } catch (handlerError) {
        console.error('DynamicProperty: Error in event handler:', handlerError);
      }
    }
  }

  /**
   * type: Function
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * desc: |
   *   Override of EventTarget.addEventListener that also tracks handlers in an internal
   *   registry for cross-platform compatibility fallback.
   * arguments:
   *   - name: type
   *     dataType: string
   *     desc: The event type to listen for.
   *   - name: handler
   *     dataType: function
   *     desc: The callback function to invoke when the event fires.
   *   - name: options
   *     dataType: object | boolean
   *     optional: true
   *     desc: Options passed to the native addEventListener.
   */

  /**
   * Add an event listener for value changes. Also tracks handlers in an internal registry for cross-platform compatibility.
   * @param {string} type - The event type to listen for (e.g., 'update').
   * @param {Function} handler - The callback function to invoke when the event fires.
   * @param {Object|boolean} [options] - Options passed to the native addEventListener.
   * @returns {void}
   */
  addEventListener(type, handler, options) {
    super.addEventListener(type, handler, options);

    let listenersMap = this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_LISTENERS];
    if (!listenersMap.has(type))
      listenersMap.set(type, []);

    let handlers = listenersMap.get(type);
    if (!handlers.includes(handler))
      handlers.push(handler);
  }

  /**
   * type: Function
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * desc: |
   *   Override of EventTarget.removeEventListener that also removes handlers from the
   *   internal registry used for cross-platform compatibility fallback.
   * arguments:
   *   - name: type
   *     dataType: string
   *     desc: The event type to stop listening for.
   *   - name: handler
   *     dataType: function
   *     desc: The callback function to remove.
   *   - name: options
   *     dataType: object | boolean
   *     optional: true
   *     desc: Options passed to the native removeEventListener.
   */

  /**
   * Remove an event listener. Also removes handlers from the internal registry.
   * @param {string} type - The event type to stop listening for.
   * @param {Function} handler - The callback function to remove.
   * @param {Object|boolean} [options] - Options passed to the native removeEventListener.
   * @returns {void}
   */
  removeEventListener(type, handler, options) {
    super.removeEventListener(type, handler, options);

    let listenersMap = this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_LISTENERS];
    let handlers = listenersMap.get(type);

    if (!handlers)
      return;

    let handlerIndex = handlers.indexOf(handler);
    if (handlerIndex !== -1)
      handlers.splice(handlerIndex, 1);
  }

  /**
   * type: Function
   * name: "[DynamicProperty.set]"
   * groupName: DynamicProperty
   * parent: DynamicProperty
   * desc: |
   *   Set the underlying raw value stored by this `DynamicProperty`.
   *
   *   If the current stored value is exactly the same as the provided `value`,
   *   then this method will simply return.
   *
   *   Otherwise, when the underlying value is updated, `this.dispatchEvent` will
   *   be called to dispatch an `'update'` event to notify all listeners that the
   *   underlying value has been changed.
   * arguments:
   *   - name: newValue
   *     dataType: any
   *     desc: |
   *       The new value to set. If this is itself a `DynamicProperty` instance, then
   *       it will be unwrapped to its underlying value, and that will be used as the value instead.
   *   - name: options
   *     optional: true
   *     dataType: object
   *     desc: |
   *       An object to provided options for the operation. The shape of this object is `{ dispatchUpdateEvent: boolean }`.
   *       If `options.dispatchUpdateEvent` equals `false`, then no `'update'` event will be dispatched to listeners.
   * notes:
   *   - |
   *     :info: If the underlying stored value is exactly the same as the value provided,
   *     then nothing will happen, and the method will simply return.
   *   - |
   *     :info: The underlying value is updated *before* dispatching events.
   *   - |
   *     :info: `DynamicProperty` protects against cyclic event callbacks. If an
   *     event callback again sets the underlying `DynamicProperty` value, then
   *     the value will be set, but no event will be dispatched (to prevent event loops).
   *   - |
   *     :info: You can not set a `DynamicProperty` to another `DynamicProperty` instance.
   *     If this method receives a `DynamicProperty` instance, it will use the stored value
   *     of that instance instead (by calling @see DynamicProperty.valueOf;).
   */
  [_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_SET](_newValue, _options) {
    let newValue = _newValue;
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(newValue, DynamicProperty))
      newValue = newValue.valueOf();

    if (this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE] === newValue)
      return;

    if (this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_IS_SETTING]) {
      this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE] = newValue;
      return;
    }

    let options = _options || {};

    try {
      this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_IS_SETTING] = true;

      let oldValue = this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE];
      this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_VALUE] = newValue;

      if (options.dispatchUpdateEvent === false)
        return;

      let eventData = {
        originator: this,
        oldValue:   oldValue,
        value:      newValue,
      };

      try {
        let updateEvent = new Event('update');

        updateEvent.originator = this;
        updateEvent.oldValue = oldValue;
        updateEvent.value = newValue;

        this.dispatchEvent(updateEvent);
      } catch (dispatchError) {
        // Fallback for Node.js/JSDOM environment where Event class mismatches
        // can cause dispatchEvent to fail. Use internal listener notification.
        this._notifyListeners('update', eventData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this[_constants_js__WEBPACK_IMPORTED_MODULE_0__.DYNAMIC_PROPERTY_IS_SETTING] = false;
    }
  }
}

globalThis.mythixUI.DynamicProperty = DynamicProperty;


/***/ }),

/***/ "./lib/elements.js":
/*!*************************!*\
  !*** ./lib/elements.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ElementDefinition: () => (/* binding */ ElementDefinition),
/* harmony export */   ElementGenerator: () => (/* binding */ ElementGenerator),
/* harmony export */   Term: () => (/* binding */ Term),
/* harmony export */   build: () => (/* binding */ build),
/* harmony export */   encodeAttributeValue: () => (/* binding */ encodeAttributeValue),
/* harmony export */   encodeValue: () => (/* binding */ encodeValue),
/* harmony export */   hasChild: () => (/* binding */ hasChild),
/* harmony export */   isSVGElement: () => (/* binding */ isSVGElement),
/* harmony export */   isVoidTag: () => (/* binding */ isVoidTag),
/* harmony export */   mergeChildren: () => (/* binding */ mergeChildren),
/* harmony export */   nodeToElementDefinition: () => (/* binding */ nodeToElementDefinition),
/* harmony export */   processElements: () => (/* binding */ processElements),
/* harmony export */   queryTemplate: () => (/* binding */ queryTemplate)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _dynamic_property_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dynamic-property.js */ "./lib/dynamic-property.js");






const SUBSTITUTE_CHAR_CODE = 26;

/**
 * type: Namespace
 * name: Elements
 * groupName: Elements
 * desc: |
 *   `import { Elements } from 'mythix-ui-core@1.0';`
 *
 *   Utility and element building functions for the DOM.
 */

const IS_PROP_NAME    = /^prop\$/;
const IS_TARGET_PROP  = /^prototype|constructor$/;

class ElementDefinition {
  static [Symbol.hasInstance](instance) {
    try {
      return (instance && instance[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE);
    } catch (e) {
      return false;
    }
  }

  constructor(tagName, attributes, children) {
    Object.defineProperties(this, {
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE,
      },
      'tagName': {
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        tagName,
      },
      'attributes': {
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        attributes || {},
      },
      'children': {
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        children || [],
      },
    });
  }

  toString(_options) {
    let options = _options || {};
    let tagName = this.tagName;
    if (tagName === '#text')
      return this.attributes.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    let attrs = (tagName === '#fragment') ? null : ((attributes) => {
      let parts = [];

      for (let [ attributeName, value ] of Object.entries(attributes)) {
        if (IS_PROP_NAME.test(attributeName))
          continue;

        let name = this.toDOMAttributeName(attributeName);
        if (value == null)
          parts.push(name);
        else
          parts.push(`${name}="${encodeAttributeValue(value)}"`);
      }

      return parts.join(' ');
    })(this.attributes);

    let children = ((children) => {
      return children
        .filter((child) => (child != null && child !== false && !Object.is(child, NaN)))
        .map((child) => ((child && typeof child.toString === 'function') ? child.toString(options) : ('' + child)))
        .join('');
    })(this.children);

    if (tagName === '#fragment')
      return children;

    // this will more commonly look like written html
    tagName = tagName.toLowerCase();

    let elementTagStart = `<${tagName}${(attrs) ? ` ${attrs}` : ''}>`;
    let elementTagEnd   = `</${tagName}>`;

    if (Object.prototype.hasOwnProperty.call(options, 'maskHTML')) {
      let charCode = (typeof options.maskHTML === 'number') ? String.fromCharCode(SUBSTITUTE_CHAR_CODE) : options.maskHTML;
      const wipeBlank = (content) => {
        return content.replace(/./g, charCode);
      };

      elementTagStart = wipeBlank(elementTagStart);
      elementTagEnd = wipeBlank(elementTagEnd);

      if (options.maskChildrenPattern && options.maskChildrenPattern.test(tagName))
        children = wipeBlank(children);
    }

    return `${elementTagStart}${(isVoidTag(tagName)) ? '' : `${children}${elementTagEnd}`}`;
  }

  toDOMAttributeName(attributeName) {
    return attributeName.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

  build(ownerDocument, templateOptions) {
    if (this.tagName === '#fragment')
      return this.children.map((child) => child.build(ownerDocument, templateOptions));

    let attributes    = this.attributes;
    let namespaceURI  = attributes.namespaceURI;
    let options;
    let element;

    if (this.attributes.is)
      options = { is: this.attributes.is };

    if (this.tagName === '#text')
      return processElements.call(this, ownerDocument.createTextNode(attributes.value || ''), templateOptions);

    if (namespaceURI)
      element = ownerDocument.createElementNS(namespaceURI, this.tagName, options);
    else if (isSVGElement(this.tagName))
      element = ownerDocument.createElementNS('http://www.w3.org/2000/svg', this.tagName, options);
    else
      element = ownerDocument.createElement(this.tagName);

    const eventNames = _utils_js__WEBPACK_IMPORTED_MODULE_2__.getAllEventNamesForElement(element);
    const DATA_EVENT_PREFIX = 'data-event-on';
    const handleAttribute = (element, attributeName, _attributeValue) => {
      let attributeValue      = _attributeValue;
      let lowerAttributeName  = attributeName.toLowerCase();

      // New data-event-on* pattern (preferred)
      if (lowerAttributeName.startsWith(DATA_EVENT_PREFIX)) {
        let eventName = lowerAttributeName.substring(DATA_EVENT_PREFIX.length);
        if (eventName) {
          let modifiedAttributeName = this.toDOMAttributeName(attributeName);
          element.setAttribute(modifiedAttributeName, attributeValue);
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindDataEventAttribute(element, eventName);
        }
      // Legacy on* pattern (still supported for backwards compatibility during transition)
      } else if (eventNames.indexOf(lowerAttributeName) >= 0) {
        _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindEventToElement.call(
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.createScope(element, templateOptions.scope), // this
          element,
          lowerAttributeName.substring(2),
          attributeValue,
        );
      } else {
        let modifiedAttributeName = this.toDOMAttributeName(attributeName);
        element.setAttribute(modifiedAttributeName, attributeValue);
      }
    };

    // Dynamic bindings are not allowed for properties
    const handleProperty = (element, propertyName, propertyValue) => {
      let name = propertyName.replace(IS_PROP_NAME, '');
      element[name] = propertyValue;
    };

    let attributeNames = Object.keys(attributes);
    for (let i = 0, il = attributeNames.length; i < il; i++) {
      let attributeName   = attributeNames[i];
      let attributeValue  = attributes[attributeName];

      if (IS_PROP_NAME.test(attributeName))
        handleProperty(element, attributeName, attributeValue);
      else
        handleAttribute(element, attributeName, attributeValue);
    }

    let children = this.children;
    if (children.length > 0) {
      for (let i = 0, il = children.length; i < il; i++) {
        let child         = children[i];
        let childElement  = child.build(ownerDocument, templateOptions);

        if (Array.isArray(childElement))
          childElement.flat(Infinity).forEach((child) => element.appendChild(child));
        else
          element.appendChild(childElement);
      }
    }

    return processElements.call(
      this,
      element,
      {
        ...templateOptions,
        processEventCallbacks: false,
      },
    );
  }
}

const IS_HTML_SAFE_CHARACTER = /^[\sa-zA-Z0-9_-]$/;
function encodeValue(value) {
  return value.replace(/./g, (m) => {
    return (IS_HTML_SAFE_CHARACTER.test(m)) ? m : `&#${m.charCodeAt(0)};`;
  });
}

function encodeAttributeValue(value) {
  return value.replace(/["&]/g, (m) => {
    return `&#${m.charCodeAt(0)};`;
  });
}

const IS_VOID_TAG = /^area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr$/i;
function isVoidTag(tagName) {
  return IS_VOID_TAG.test(tagName.split(':').slice(-1)[0]);
}

function isValidNodeType(item) {
  if (!item)
    return false;

  if (item instanceof Node)
    return true;

  if (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE)
    return true;

  if (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE)
    return true;

  return false;
}

function queryTemplate(ownerDocument, nameOrID) {
  if (nameOrID instanceof Node)
    return nameOrID;

  if (!ownerDocument)
    return;

  let result = ownerDocument.getElementById(nameOrID);
  if (!result)
    result = ownerDocument.querySelector(`template[data-mythix-component-name="${nameOrID}" i],template[data-for="${nameOrID}" i]`);

  if (!result)
    result = ownerDocument.querySelector(nameOrID);

  return result;
}

function filterNodeTree(node, filterFunc) {
  if (!filterFunc.call(this, node))
    return;

  let children = Array.from(node.childNodes);
  for (let childNode of children) {
    let result = filterNodeTree(childNode, filterFunc);
    if (result == null)
      node.removeChild(childNode);
  }

  return node;
}

function compileMergeFragment(ownerDocument, node) {
  let fragment  = ownerDocument.createDocumentFragment();
  let selectors = (node.getAttribute('data-from') || '').split(',').map(((part) => part.trim())).filter(Boolean);

  for (let i = 0, il = selectors.length; i < il; i++) {
    let selector  = selectors[i];
    let element   = queryTemplate(ownerDocument, selector);
    if (element) {
      let clonedNode  = (IS_TEMPLATE.test(element.tagName)) ? element.content.cloneNode(true) : element.cloneNode(true);
      let filter      = node.getAttribute('data-filter');
      if (filter) {
        clonedNode = filterNodeTree.call(this, clonedNode, (node) => {
          return !(typeof node.matches === 'function' && node.matches(filter));
        });
      }

      fragment.appendChild(clonedNode);
    }
  }

  return fragment;
}

const IS_TEMPLATE_MERGE_ELEMENT = /^mythix-merge$/i;
function processElements(_node, _options) {
  let node = _node;
  if (!node)
    return node;

  let options       = _options || {};
  let scope         = options.scope;
  if (!scope) {
    scope = _utils_js__WEBPACK_IMPORTED_MODULE_2__.createScope(node);
    options = { ...options, scope };
  }

  let disableTemplateEngineSelector = (options.forceTemplateEngine === true) ? undefined : options.disableTemplateEngineSelector;
  let children                      = Array.from(node.childNodes);

  if (options.forceTemplateEngine !== true && !disableTemplateEngineSelector) {
    disableTemplateEngineSelector = _utils_js__WEBPACK_IMPORTED_MODULE_2__.getDisableTemplateEngineSelector();
    options = { ...options, disableTemplateEngineSelector };
  }

  let isTemplateEngineDisabled = false;
  if (disableTemplateEngineSelector && _utils_js__WEBPACK_IMPORTED_MODULE_2__.specialClosest(node, disableTemplateEngineSelector))
    isTemplateEngineDisabled = true;

  if (typeof options.helper === 'function') {
    let result = options.helper.call(this, { scope, options, node, children, isTemplateEngineDisabled, disableTemplateEngineSelector });
    if (result instanceof Node)
      node = result;
    else if (result === false)
      return node;
  }

  let ownerDocument = options.ownerDocument || scope.ownerDocument || node.ownerDocument || document;
  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ATTRIBUTE_NODE) {
    if (!isTemplateEngineDisabled) {
      let result = _utils_js__WEBPACK_IMPORTED_MODULE_2__.formatNodeValue(node, options);
      if ((Array.isArray(result) && result.some(isValidNodeType)) || isValidNodeType(result)) {
        if (!Array.isArray(result))
          result = [ result ];

        let fragment = ownerDocument.createDocumentFragment();
        for (let item of result) {
          if (item instanceof Node) {
            fragment.appendChild(item);
          } else if (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE) {
            let elements = item.build(ownerDocument, { scope });
            if (!elements)
              continue;

            if (Array.isArray(elements))
              elements.flat(Infinity).forEach((element) => fragment.appendChild(element));
            else
              fragment.appendChild(elements);
          } else if (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE) {
            item.appendTo(fragment);
          } else {
            let textNode = ownerDocument.createTextNode(('' + item));
            fragment.appendChild(textNode);
          }
        }

        return fragment;
      } else if (result !== node.nodeValue) {
        node.nodeValue =  result;
      }
    }

    return node;
  } else if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_NODE) {
    if (IS_TEMPLATE_MERGE_ELEMENT.test(node.tagName)) {
      let fragment = compileMergeFragment.call(this, ownerDocument, node);
      return processElements.call(this, fragment, { ...options, scope });
    }

    let eventNames      = _utils_js__WEBPACK_IMPORTED_MODULE_2__.getAllEventNamesForElement(node);
    let attributeNames  = node.getAttributeNames();
    const DATA_EVENT_PREFIX = 'data-event-on';

    for (let i = 0, il = attributeNames.length; i < il; i++) {
      let attributeName       = attributeNames[i];
      let lowerAttributeName  = attributeName.toLowerCase();
      let attributeValue      = node.getAttribute(attributeName);

      // New data-event-on* pattern (preferred)
      if (lowerAttributeName.startsWith(DATA_EVENT_PREFIX)) {
        if (options.processEventCallbacks !== false) {
          let eventName = lowerAttributeName.substring(DATA_EVENT_PREFIX.length);
          if (eventName) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindDataEventAttribute(node, eventName);
          }
        }
      // Legacy on* pattern (still supported for backwards compatibility during transition)
      } else if (eventNames.indexOf(lowerAttributeName) >= 0) {
        if (options.processEventCallbacks !== false) {
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindEventToElement.call(
            _utils_js__WEBPACK_IMPORTED_MODULE_2__.createScope(node, scope), // this
            node,
            lowerAttributeName.substring(2),
            attributeValue,
          );

          node.removeAttribute(attributeName);
        }
      } else if (_utils_js__WEBPACK_IMPORTED_MODULE_2__.isTemplate(attributeValue)) {
        let attributeNode = node.getAttributeNode(attributeName);
        if (attributeNode)
          attributeNode.nodeValue = _utils_js__WEBPACK_IMPORTED_MODULE_2__.formatNodeValue(attributeNode, { ...options, disallowHTML: true });
      }
    }
  }

  if (options.processChildren === false)
    return node;

  for (let childNode of children) {
    let result = processElements.call(this, childNode, options);
    if (result instanceof Node && result !== childNode) {
      try {
        node.replaceChild(result, childNode);
      } catch (e) {
        // NOOP
      }
    }
  }

  return node;
}

function hasChild(parentNode, childNode) {
  if (!parentNode || !childNode)
    return false;

  for (let child of Array.from(parentNode.childNodes)) {
    if (child === childNode)
      return true;
  }

  return false;
}

function build(tagName, defaultAttributes, scope) {
  if (!tagName || !_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(tagName, '::String'))
    throw new Error('Can not create an ElementDefinition without a "tagName".');

  const finalizer = (..._children) => {
    const wrangleChildren = (children) => {
      return children.flat(Infinity).map((value) => {
        if (value == null || Object.is(value, NaN))
          return null;

        if (typeof value === 'symbol')
          return null;

        if (value[_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNFINISHED_DEFINITION])
          return value();

        if (value[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE)
          return value;

        if (value[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE)
          return wrangleChildren(value.getUnderlyingArray());

        if (value instanceof Node)
          return nodeToElementDefinition(value);

        if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(value, '::String', _dynamic_property_js__WEBPACK_IMPORTED_MODULE_3__.DynamicProperty))
          return null;

        return new ElementDefinition('#text', { value: ('' + value) });
      }).flat(Infinity).filter(Boolean);
    };

    let children = wrangleChildren(_children || []);
    return new ElementDefinition(tagName, scope, children);
  };

  let rootProxy = new Proxy(finalizer, {
    get: (target, attributeName) => {
      if (attributeName === _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNFINISHED_DEFINITION)
        return true;

      if (typeof attributeName === 'symbol' || IS_TARGET_PROP.test(attributeName))
        return target[attributeName];

      if (!scope) {
        let scopedProxy = build(tagName, defaultAttributes, Object.assign(Object.create(null), defaultAttributes || {}));
        return scopedProxy[attributeName];
      }

      return new Proxy(
        (value) => {
          scope[attributeName] = value;
          return rootProxy;
        },
        {
          get: (target, propName) => {
            if (attributeName === _constants_js__WEBPACK_IMPORTED_MODULE_0__.UNFINISHED_DEFINITION)
              return true;

            if (typeof attributeName === 'symbol' || IS_TARGET_PROP.test(attributeName))
              return target[attributeName];

            scope[attributeName] = true;
            return rootProxy[propName];
          },
        },
      );
    },
  });

  return rootProxy;
}

function nodeToElementDefinition(node) {
  if (node.nodeType === Node.TEXT_NODE)
    return new ElementDefinition('#text', { value: ('' + node.nodeValue) });

  if (node.nodeType !== Node.ELEMENT_NODE && node.nodeType !== Node.DOCUMENT_FRAGMENT_NODE)
    return;

  let attributes = {};

  if (typeof node.getAttributeNames === 'function') {
    for (let attributeName of node.getAttributeNames())
      attributes[attributeName] = node.getAttribute(attributeName);
  }

  let children = Array.from(node.childNodes).map(nodeToElementDefinition);
  return new ElementDefinition((node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) ? '#fragment' : node.tagName, attributes, children);
}

const IS_TEMPLATE = /^(template)$/i;

/**
   * parent: Elements
   * groupName: Elements
   * desc: |
   *   Almost like `Object.assign`, merge all component children into a single node (the `target`).
   *
   *   This is "template intelligent", meaning for `<template>` elements specifically, it will execute
   *   `children = template.content.cloneNode(true).childNodes` to clone all the child nodes, and not
   *   modify the original template. It is also template intelligent by the fact that if the `target` is
   *   a template, it will add the children to `content` properly.
   * arguments:
   *   - name: target
   *     dataTypes: Node
   *     desc: |
   *       The target Node to merge all children into. If this Node is a `<template>` Node, then it will
   *       place all the merged children into `template.content`.
   * notes:
   *   - Any template Node will be cloned, and so the original will not be modified. All other nodes are **NOT**
   *     cloned before the merge, and so will be stripped of their children.
   *   - Make certain you deep clone any element first (except templates) if you don't want the provided elements
   *     to be modified.
   * return: |
   *   @types Node; The provided `target`, with all children merged (added) into it.
   */
function mergeChildren(target, ...others) {
  if (!(target instanceof Node))
    return target;

  let targetIsTemplate = IS_TEMPLATE.test(target.tagName);
  for (let other of others) {
    if (!(other instanceof Node))
      continue;

    let childNodes = (IS_TEMPLATE.test(other.tagName)) ? other.content.cloneNode(true).childNodes : other.childNodes;
    for (let child of Array.from(childNodes)) {
      let content = (IS_TEMPLATE.test(child.tagName)) ? child.content.cloneNode(true) : child;
      if (targetIsTemplate)
        target.content.appendChild(content);
      else
        target.appendChild(content);
    }
  }

  return target;
}

const IS_SVG_ELEMENT_NAME = /^(altglyph|altglyphdef|altglyphitem|animate|animateColor|animateMotion|animateTransform|animation|circle|clipPath|colorProfile|cursor|defs|desc|discard|ellipse|feblend|fecolormatrix|fecomponenttransfer|fecomposite|feconvolvematrix|fediffuselighting|fedisplacementmap|fedistantlight|fedropshadow|feflood|fefunca|fefuncb|fefuncg|fefuncr|fegaussianblur|feimage|femerge|femergenode|femorphology|feoffset|fepointlight|fespecularlighting|fespotlight|fetile|feturbulence|filter|font|fontFace|fontFaceFormat|fontFaceName|fontFaceSrc|fontFaceUri|foreignObject|g|glyph|glyphRef|handler|hKern|image|line|lineargradient|listener|marker|mask|metadata|missingGlyph|mPath|path|pattern|polygon|polyline|prefetch|radialgradient|rect|set|solidColor|stop|svg|switch|symbol|tbreak|text|textpath|tref|tspan|unknown|use|view|vKern)$/i;
function isSVGElement(tagName) {
  return IS_SVG_ELEMENT_NAME.test(tagName);
}

const Term = (value) => new ElementDefinition('#text', { value });
const ElementGenerator = new Proxy(
  {
    Term,
    $TEXT: Term,
  },
  {
    get: function(target, propName) {
      if (propName in target)
        return target[propName];

      if (IS_SVG_ELEMENT_NAME.test(propName)) {
        // SVG elements
        return build(propName, { namespaceURI: 'http://www.w3.org/2000/svg' });
      }

      return build(propName);
    },
    set: function() {
      // NOOP
      return true;
    },
  },
);


/***/ }),

/***/ "./lib/errors.js":
/*!***********************!*\
  !*** ./lib/errors.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComponentError: () => (/* binding */ ComponentError),
/* harmony export */   DynamicPropertyError: () => (/* binding */ DynamicPropertyError),
/* harmony export */   MythixError: () => (/* binding */ MythixError),
/* harmony export */   TemplateError: () => (/* binding */ TemplateError),
/* harmony export */   debugLog: () => (/* binding */ debugLog),
/* harmony export */   debugWarn: () => (/* binding */ debugWarn),
/* harmony export */   formatComponentContext: () => (/* binding */ formatComponentContext),
/* harmony export */   formatScopeVariables: () => (/* binding */ formatScopeVariables),
/* harmony export */   isDebugMode: () => (/* binding */ isDebugMode)
/* harmony export */ });


/**
 * type: Namespace
 * name: Errors
 * groupName: Errors
 * desc: |
 *   `import { Errors } from 'mythix-ui-core@1.0';`
 *
 *   Custom error classes for Mythix UI that provide contextual, actionable error messages.
 */

/**
 * type: Class
 * name: MythixError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Base error class for all Mythix UI errors. Provides consistent error formatting
 *   and context attachment capabilities.
 */

/**
 * Base error class for all Mythix UI errors.
 * @extends Error
 */
class MythixError extends Error {
  /**
   * Create a MythixError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   */
  constructor(message, context = {}) {
    super(message);
    /** @type {string} */
    this.name = 'MythixError';
    /** @type {Object} */
    this.context = context;
  }

  /**
   * type: Function
   * name: toString
   * groupName: Errors
   * parent: MythixError
   * desc: |
   *   Format the error message with context for developer-friendly output.
   * return: |
   *   @types string; The formatted error message.
   */
  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (Object.keys(this.context).length > 0)
      parts.push(`\nContext: ${JSON.stringify(this.context, null, 2)}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: TemplateError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown during template parsing or compilation. Includes the failing expression,
 *   available scope variables, and source context for debugging.
 * examples:
 *   - |
 *     ```javascript
 *     throw new TemplateError('Failed to evaluate expression', {
 *       expression: 'user.name',
 *       scopeVariables: ['count', 'items'],
 *       componentTagName: 'my-component',
 *     });
 *     ```
 */

/**
 * Error thrown during template parsing or compilation.
 * @extends MythixError
 */
class TemplateError extends MythixError {
  /**
   * Create a TemplateError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.expression] - The failing template expression.
   * @param {string[]} [context.scopeVariables] - Available scope variables.
   * @param {{start: number, end: number}} [context.position] - Position in source.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'TemplateError';
    /** @type {string|null} */
    this.expression = context.expression || null;
    /** @type {string[]} */
    this.scopeVariables = context.scopeVariables || [];
    /** @type {{start: number, end: number}|null} */
    this.position = context.position || null;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (this.expression)
      parts.push(`\n  Expression: @@${this.expression}@@`);

    if (this.position)
      parts.push(`\n  Position: ${this.position.start}-${this.position.end}`);

    if (this.scopeVariables.length > 0)
      parts.push(`\n  Available variables: ${this.scopeVariables.join(', ')}`);

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: ComponentError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown during component lifecycle operations. Includes the component tag name,
 *   lifecycle phase, and truncated outerHTML for context.
 * examples:
 *   - |
 *     ```javascript
 *     throw new ComponentError('Error in mounted() callback', {
 *       tagName: 'my-component',
 *       phase: 'mounted',
 *       outerHTML: '<my-component attr="value">...</my-component>',
 *     });
 *     ```
 */

/**
 * Error thrown during component lifecycle operations.
 * @extends MythixError
 */
class ComponentError extends MythixError {
  /**
   * Create a ComponentError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.tagName] - The component's tag name.
   * @param {string} [context.phase] - The lifecycle phase ('mounted', 'unmounted', etc.).
   * @param {string} [context.outerHTML] - The component's outerHTML.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'ComponentError';
    /** @type {string} */
    this.tagName = context.tagName || 'unknown';
    /** @type {string|null} */
    this.phase = context.phase || null;
    /** @type {string|null} */
    this.outerHTML = context.outerHTML || null;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    parts.push(`\n  Component: <${this.tagName}>`);

    if (this.phase)
      parts.push(`\n  Lifecycle phase: ${this.phase}`);

    if (this.outerHTML) {
      let truncated = this.outerHTML.length > 200
        ? this.outerHTML.substring(0, 200) + '...'
        : this.outerHTML;
      parts.push(`\n  Element: ${truncated}`);
    }

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Class
 * name: DynamicPropertyError
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Error thrown when accessing or modifying DynamicProperty values incorrectly.
 */

/**
 * Error thrown when accessing or modifying DynamicProperty values incorrectly.
 * @extends MythixError
 */
class DynamicPropertyError extends MythixError {
  /**
   * Create a DynamicPropertyError.
   * @param {string} message - The error message.
   * @param {Object} [context={}] - Additional context for debugging.
   * @param {string} [context.propertyPath] - The property path being accessed.
   * @param {*} [context.currentValue] - The current value of the property.
   * @param {*} [context.attemptedValue] - The value that was attempted to be set.
   * @param {string} [context.suggestion] - Actionable suggestion for fixing the error.
   */
  constructor(message, context = {}) {
    super(message, context);
    /** @type {string} */
    this.name = 'DynamicPropertyError';
    /** @type {string|null} */
    this.propertyPath = context.propertyPath || null;
    /** @type {*} */
    this.currentValue = context.currentValue;
    /** @type {*} */
    this.attemptedValue = context.attemptedValue;
  }

  toString() {
    let parts = [ `${this.name}: ${this.message}` ];

    if (this.propertyPath)
      parts.push(`\n  Property path: ${this.propertyPath}`);

    if (this.context.suggestion)
      parts.push(`\n  Suggestion: ${this.context.suggestion}`);

    return parts.join('');
  }
}

/**
 * type: Constant
 * name: MYTHIX_DEBUG
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Flag to enable verbose debug logging. Set `globalThis.MYTHIX_DEBUG = true` to enable.
 */

/**
 * Check if debug mode is enabled.
 * Set `globalThis.MYTHIX_DEBUG = true` to enable verbose logging.
 * @returns {boolean} True if debug mode is enabled.
 */
const isDebugMode = () => {
  return globalThis.MYTHIX_DEBUG === true;
};

/**
 * type: Function
 * name: debugLog
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Log a message only when MYTHIX_DEBUG is enabled.
 * arguments:
 *   - name: message
 *     dataType: string
 *     desc: The message to log.
 *   - name: data
 *     dataType: any
 *     optional: true
 *     desc: Additional data to include in the log.
 */

/**
 * Log a debug message (only when MYTHIX_DEBUG is enabled).
 * @param {string} message - The message to log.
 * @param {*} [data] - Additional data to include in the log.
 * @returns {void}
 */
const debugLog = (message, data) => {
  if (!isDebugMode())
    return;

  if (data !== undefined)
    console.debug(`[MythixUI Debug] ${message}`, data);
  else
    console.debug(`[MythixUI Debug] ${message}`);
};

/**
 * type: Function
 * name: debugWarn
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Log a warning only when MYTHIX_DEBUG is enabled.
 * arguments:
 *   - name: message
 *     dataType: string
 *     desc: The warning message.
 *   - name: data
 *     dataType: any
 *     optional: true
 *     desc: Additional data to include.
 */

/**
 * Log a warning message (only when MYTHIX_DEBUG is enabled).
 * @param {string} message - The warning message.
 * @param {*} [data] - Additional data to include.
 * @returns {void}
 */
const debugWarn = (message, data) => {
  if (!isDebugMode())
    return;

  if (data !== undefined)
    console.warn(`[MythixUI Warning] ${message}`, data);
  else
    console.warn(`[MythixUI Warning] ${message}`);
};

/**
 * type: Function
 * name: formatComponentContext
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Create a context object for component error reporting.
 * arguments:
 *   - name: component
 *     dataType: HTMLElement
 *     desc: The component instance.
 *   - name: phase
 *     dataType: string
 *     desc: The lifecycle phase (e.g., 'mounted', 'unmounted').
 * return: |
 *   @types object; Context object suitable for ComponentError.
 */

/**
 * Create a context object for component error reporting.
 * @param {HTMLElement} component - The component instance.
 * @param {string} phase - The lifecycle phase ('mounted', 'unmounted', etc.).
 * @returns {{tagName: string, phase: string, outerHTML: string}} Context object suitable for ComponentError.
 */
const formatComponentContext = (component, phase) => {
  let outerHTML = '';

  try {
    outerHTML = component.outerHTML || '';
  } catch (error) {
    outerHTML = `<${component.tagName?.toLowerCase() || 'unknown'}>`;
  }

  return {
    tagName:   component.tagName?.toLowerCase() || 'unknown',
    phase:     phase,
    outerHTML: outerHTML,
  };
};

/**
 * type: Function
 * name: formatScopeVariables
 * groupName: Errors
 * parent: Errors
 * desc: |
 *   Extract available variable names from a scope object for error context.
 * arguments:
 *   - name: scope
 *     dataType: object
 *     desc: The scope object to inspect.
 * return: |
 *   @types Array<string>; List of variable names available in scope.
 */

/**
 * Extract available variable names from a scope object for error context.
 * @param {Object} scope - The scope object to inspect.
 * @returns {string[]} List of variable names available in scope.
 */
const formatScopeVariables = (scope) => {
  if (!scope)
    return [];

  let variables = [];

  try {
    // Get own properties
    variables = Object.keys(scope);

    // Also check prototype chain for scope proxies
    let proto = Object.getPrototypeOf(scope);
    while (proto && proto !== Object.prototype) {
      for (let key of Object.getOwnPropertyNames(proto)) {
        if (!variables.includes(key) && key !== 'constructor')
          variables.push(key);
      }
      proto = Object.getPrototypeOf(proto);
    }
  } catch (error) {
    // Ignore errors from proxy traps
  }

  return variables.filter((v) => !v.startsWith('_'));
};


/***/ }),

/***/ "./lib/mythix-ui-component.js":
/*!************************************!*\
  !*** ./lib/mythix-ui-component.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MythixUIComponent: () => (/* binding */ MythixUIComponent),
/* harmony export */   isMythixComponent: () => (/* binding */ isMythixComponent)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _component_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component-utils.js */ "./lib/component-utils.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _query_engine_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./query-engine.js */ "./lib/query-engine.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements.js */ "./lib/elements.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./errors.js */ "./lib/errors.js");
/* harmony import */ var _stylesheet_manager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./stylesheet-manager.js */ "./lib/stylesheet-manager.js");










const isMythixComponent = Symbol.for('@mythix/mythix-ui/component/constants/is-mythix-component'); // @ref:MythixUIComponent.isMythixComponent

const IS_ATTR_METHOD_NAME   = /^attr\$(.*)$/;
const REGISTERED_COMPONENTS = new Set();

/***
 * groupName: MythixUIComponent
 * desc: |
 *   This the base class of all Mythix UI components. It inherits
 *   from HTMLElement, and so will end up being a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components).
 *
 *   It is strongly recommended that you fully read up and understand
 *   [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components)
 *   if you don't already fully understand them. The core of Mythix UI is the
 *   [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components) standard,
 *   so you might end up a little confused if you don't already understand the foundation.
 *
 * properties:
 *   - caption: "... HTMLElement Instance Properties"
 *     desc: "All [HTMLElement Instance Properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#instance_properties) are inherited from [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)"
 *     link: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement#instance_properties
 *
 *   - name: isMythixComponent
 *     dataType: boolean
 *     caption: "[static MythixUIComponent.isMythixComponent]"
 *     desc: |
 *       Is `true` for Mythix UI components.
 *   - name: sensitiveTagName
 *     dataType: string
 *     caption: sensitiveTagName
 *     desc: |
 *       Works identically to [Element.tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName) for XML, where case is preserved.
 *       In HTML this works like [Element.tagName](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName), but instead of the result
 *       always being UPPERCASE, the tag name will be returned with the casing preserved.
 *   - name: templateID
 *     dataType: string
 *     caption: templateID
 *     desc: |
 *       This is a convenience property that returns the value of `this.constructor.TEMPLATE_ID`
 *   - name: delayTimers
 *     dataType: "Map&lt;string, Promise&gt;"
 *     caption: delayTimers
 *     desc: |
 *       A Map instance that
 *       retains `setTimeout` ids so that @see MythixUIComponent.debounce; can properly function. Keys are @see MythixUIComponent.debounce;
 *       timer ids (of type `string`). Values are Promise instances.
 *       Each promise instance also has a special key `timerID` that contains a `setTimeout` id of a javascript timer.
 *     notes:
 *       - |
 *         :warning: Use at your own risk. This is Mythix UI internal code that might change in the future.
 *       - |
 *         :eye: @see MythixUIComponent.debounce;
 *   - name: shadow
 *     dataType: "[ShadowRoot](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot)"
 *     caption: shadow
 *     desc: |
 *       The shadow root of this component (or `null` if none).
 *     notes:
 *       - This is the cached result of calling @see MythixUIComponent.createShadowDOM; when
 *         the component is first initialized.
 *   - name: template
 *     dataType: "[template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)"
 *     caption: template
 *     desc: |
 *       The [template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) element for this
 *       component, or `null` if there is no template found for the component.
 *     notes:
 *       - This is the cached result of calling @see MythixUIComponent.getComponentTemplate; when
 *         the component is first initialized.
***/

class MythixUIComponent extends HTMLElement {
  static isMythixComponent = isMythixComponent;

  static [Symbol.hasInstance](instance) {
    try {
      return (instance && instance[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_UI_COMPONENT_TYPE);
    } catch (e) {
      return false;
    }
  }

  // static compileStyleForDocument = compileStyleForDocument;
  static register = function(_name, _Klass) {
    let name = _name || this.tagName || _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase(this.name);

    if (!customElements.get(name)) {
      let Klass = _Klass || this;

      let observedAttributes = Array.from(
        new Set(
          (Klass.observedAttributes || []).concat(Klass.compileAttributeMethods(Klass)),
        ),
      );

      if (observedAttributes.length > 0)
        Klass.observedAttributes = observedAttributes;

      customElements.define(name, Klass);

      let registerEvent = new Event('mythix-component-registered');
      registerEvent.componentName = name;
      registerEvent.component = Klass;

      if (typeof document !== 'undefined')
        document.dispatchEvent(registerEvent);
    }

    return this;
  };

  static compileAttributeMethods = function(Klass) {
    const setupAttributeHandlers = ({ propertyName, attributeName, originalName }) => {
      if (REGISTERED_COMPONENTS.has(Klass))
        return;

      let { descriptor } = _utils_js__WEBPACK_IMPORTED_MODULE_3__.getDescriptorFromPrototypeChain(proto, originalName);
      if (!descriptor)
        return;

      // We don't want to remove this from
      // the prototype, as child classes will
      // want to inherit attribute behavior.
      // delete prototype[originalName];

      // If we have a "value" then the user did it wrong...
      // so just make it the "setter"
      let setter    = descriptor.set || descriptor.value;
      let getter    = descriptor.get;
      let hasSetter = (typeof setter === 'function');
      let hasGetter = (typeof getter === 'function');

      Object.defineProperties(proto, {
        [propertyName]: {
          enumerable:   false,
          configurable: true,
          get:          function() {
            return (hasGetter) ? getter.call(this) : this.attr(attributeName);
          },
          set:          function([ newValue, oldValue ]) {
            this.attr(attributeName, newValue);

            if (hasSetter)
              setter.call(this, [ newValue, oldValue ]);
          },
        },
      });
    };

    let proto           = Klass.prototype;
    let attributeNames  = _utils_js__WEBPACK_IMPORTED_MODULE_3__.getAllPropertyNames(proto)
      .filter((name) => IS_ATTR_METHOD_NAME.test(name))
      .map((originalName) => {
        let propertyName  = originalName.match(IS_ATTR_METHOD_NAME)[1];
        let attributeName = _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.toKebabCase(propertyName);

        setupAttributeHandlers({ propertyName, attributeName, originalName });

        return attributeName;
      });

    REGISTERED_COMPONENTS.add(Klass);

    return Array.from(new Set(attributeNames));
  };

  set attr$dataMythixSrc([ newValue, oldValue ]) {
    this.awaitFetchSrcOnVisible(newValue, oldValue);
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Called when the component is added to the DOM.
   * arguments:
   *   - name: mutationRecord
   *     dataTypes: MutationRecord
   *     desc: |
   *       The MutationRecord instance that that caused this method to be called.
   */
  onMutationAdded() {}

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Called when the component is removed from the DOM.
   * arguments:
   *   - name: mutationRecord
   *     dataTypes: MutationRecord
   *     desc: |
   *       The MutationRecord instance that that caused this method to be called.
   */
  onMutationRemoved() {}

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Called when an element is added as a child.
   * arguments:
   *   - name: node
   *     dataTypes: Element
   *     desc: |
   *       The child element being added.
   *   - name: mutationRecord
   *     dataTypes: MutationRecord
   *     desc: |
   *       The MutationRecord instance that that caused this method to be called.
   */
  onMutationChildAdded() {}

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Called when a child element is removed.
   * arguments:
   *   - name: node
   *     dataTypes: Element
   *     desc: |
   *       The child element being removed.
   *   - name: mutationRecord
   *     dataTypes: MutationRecord
   *     desc: |
   *       The MutationRecord instance that that caused this method to be called.
   */
  onMutationChildRemoved() {}

  constructor() {
    super();

    Object.defineProperties(this, {
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_UI_COMPONENT_TYPE,
      },
      [isMythixComponent]: { // @ref:MythixUIComponent.isMythixComponent
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        isMythixComponent,
      },
    });

    _utils_js__WEBPACK_IMPORTED_MODULE_3__.bindMethods.call(this, this.constructor.prototype /*, [ HTMLElement.prototype ]*/);

    Object.defineProperties(this, {
      'sensitiveTagName': { // @ref:MythixUIComponent.sensitiveTagName
        enumerable:   false,
        configurable: true,
        get:          () => ((this.prefix) ? `${this.prefix}:${this.localName}` : this.localName),
      },
      'templateID': { // @ref:MythixUIComponent.templateID
        writable:     false,
        enumerable:   false,
        configurable: true,
        value:        this.constructor.TEMPLATE_ID,
      },
      'delayTimers': { // @ref:MythixUIComponent.delayTimers
        writable:     false,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
      'documentInitialized': { // @ref:MythixUIComponent.documentInitialized
        enumerable:   false,
        configurable: true,
        get:          () => _utils_js__WEBPACK_IMPORTED_MODULE_3__.metadata(this.constructor, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_DOCUMENT_INITIALIZED),
        set:          (value) => {
          _utils_js__WEBPACK_IMPORTED_MODULE_3__.metadata(this.constructor, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_DOCUMENT_INITIALIZED, !!value);
        },
      },
    });

    Object.defineProperties(this, {
      'shadow': { // @ref:MythixUIComponent.shadow
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        this.createShadowDOM(),
      },
      'template': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        this.getComponentTemplate(),
      },
    });
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   A convenience method for getting and setting attributes. If only one argument is provided
   *   to this method, then it will act as a getter, getting the attribute specified by name.
   *
   *   If however two or more arguments are provided, then this is an attribute setter.
   *
   *   If the provided value is `undefined`, `null`, or `false`, then the attribute will be
   *   removed.
   *
   *   If the provided value is `true`, then the attribute's value will be set to an empty string `''`.
   *
   *   Any other value is converted to a string and set as the attribute's value.
   * arguments:
   *   - name: name
   *     dataTypes: string
   *     desc: |
   *       The name of the attribute to operate on.
   *   - name: value
   *     dataTypes: any
   *     desc: |
   *       If `undefined`, `null`, or `false`, remove the named attribute.
   *       If `true`, set the named attribute's value to an empty string `''`.
   *       For any other value, first convert it into a string, and then set the named attribute's value to the resulting string.
   * return: |
   *   1. @types string; If a single argument is provided, then return the value of the specified named attribute.
   *   2. @types this; If more than one argument is provided, then set the specified attribute to the specified value,
   *      and return `this` (to allow for chaining).
   */
  attr(name, value) {
    if (arguments.length > 1) {
      if (value == null || value === false)
        this.removeAttribute(name);
      else
        this.setAttribute(name, (value === true) ? '' : ('' + value));

      return this;
    }

    return this.getAttribute(name);
  }

  i18n(path, defaultValue) {
    let languageProvider = _utils_js__WEBPACK_IMPORTED_MODULE_3__.specialClosest(this, 'mythix-language-provider');
    if (!languageProvider)
      return defaultValue;

    return languageProvider.i18n(path, defaultValue);
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Inject a new style sheet via a `<style>` element dynamically at run-time.
   *
   *   This method allows the caller to inject dynamic styles at run-time.
   *   It will only inject the styles once, no matter how many times the
   *   method is called--as long as the style content itself doesn't change.
   *
   *   The content is hashed via SHA256, and the hash is used as the style sheet id. This
   *   allows you to call the method inside a component's @see MythixUIComponent.mounted;
   *   method, without needing to worry about duplicating the styles over and over again.
   * arguments:
   *   - name: content
   *     dataTypes: string
   *     desc: |
   *       The CSS stylesheet content to inject into a `<style>` element. This content is
   *       used to generate an `id` for the `<style>` element, so that it only gets added
   *       to the `document` once.
   *   - name: media
   *     dataTypes: string
   *     default: "'screen'"
   *     optional: true
   *     desc: |
   *       What to set the `media` attribute of the created `<style>` element to. Defaults
   *       to `'screen'`.
   * notes:
   *   - |
   *     :warning: It is often better to simply add a `<style>` element to your component's HTML template.
   *     However, sometimes truly dynamic styles are needed, where the content won't be known
   *     until runtime. This is the proper use case for this method.
   *   - |
   *     :warning: Please educated yourself (unlike people who love React) and do not overuse dynamic or inline styles.
   *     While the result of this method is certainly a step above inline styles, this method has
   *     [great potential to cause harm](https://worldofdev.info/6-reasons-why-you-shouldnt-style-inline/)
   *     and spread your own ignorance to others. Use with **CARE**!
   * return: |
   *   @types Element; The `<style>` element for the specified style.
   * examples:
   *   - |
   *     ```javascript
   *     import { MythixUIComponent } from 'mythix-ui-core@1.0';
   *
   *     class MyComponent extends MythixUIComponent {
   *       static tagName = 'my-component';
   *
   *       // ...
   *
   *       mounted() {
   *         let { sidebarWidth } = this.loadUserPreferences();
   *         this.injectStyleSheet(`nav.sidebar { width: ${sidebarWidth}px; }`, 'screen');
   *       }
   *     }
   *
   *     MyComponent.register();
   *     ```
   */
  injectStyleSheet(content, media = 'screen') {
    let styleID       = `IDSTYLE${_base_utils_js__WEBPACK_IMPORTED_MODULE_2__.SHA256(`${this.sensitiveTagName}:${content}:${media}`)}`;
    let ownerDocument = this.ownerDocument || document;
    let styleElement  = ownerDocument.querySelector(`style#${styleID}`);

    if (styleElement)
      return styleElement;

    styleElement = ownerDocument.createElement('style');
    styleElement.setAttribute('data-mythix-for', this.sensitiveTagName);
    styleElement.setAttribute('id', styleID);
    if (media)
      styleElement.setAttribute('media', media);

    styleElement.innerHTML = content;

    document.head.appendChild(styleElement);

    return styleElement;
  }

  processElements(node, _options) {
    let options = _options || {};
    if (!options.scope)
      options = { ...options, scope: this.$$ };

    return _elements_js__WEBPACK_IMPORTED_MODULE_5__.processElements(node, options);
  }

  getChildrenAsFragment(noEmptyResult) {
    let hasContent    = false;
    let ownerDocument = this.ownerDocument || document;
    let template      = ownerDocument.createDocumentFragment();

    if (!this.childNodes.length)
      return (noEmptyResult) ? undefined : template;

    while (this.childNodes.length) {
      let node = this.childNodes[0];
      if (!(node.nodeType === Node.TEXT_NODE && _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.isNOE(node.nodeValue)))
        hasContent = true;

      template.appendChild(node);
    }

    if (noEmptyResult && !hasContent)
      return;

    return template;
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   Get the parent Node of this element.
   *
   * notes:
   *   - |
   *     :warning: Unlike [Node.parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode), this
   *     will also search across Shadow DOM boundaries.
   *   - |
   *     :warning: **Searching across Shadow DOM boundaries only works for Mythix UI components!**
   *   - |
   *     :info: Searching across Shadow DOM boundaries is accomplished via leveraging @see MythixUIComponent.metadata; for
   *     `this` component. When a `null` parent is encountered, `getParentNode` will look for @see MythixUIComponent.metadata?caption=metadata; key @see Constants.MYTHIX_SHADOW_PARENT;
   *     on `this`. If found, the result is considered the [parent Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) of `this` component.
   *   - |
   *     :eye: This is just a wrapper for @see Utils.getParentNode;.
   *
   * return: |
   *   @types Node; The parent node, if there is any, or `null` otherwise.
   */
  getParentNode() {
    return _utils_js__WEBPACK_IMPORTED_MODULE_3__.getParentNode(this);
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   This is a replacement for [Element.attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
   *   with one notable difference: It runs Mythix UI framework specific code after a shadow is attached.
   *
   *   Currently, the method completes the following actions:
   *   1. Call `super.attachShadow(options)` to actually attach a Shadow DOM
   *   2. Assign @see MythixUIComponent.metadata?caption=metadata; to the resulting `shadow`, using the key `Constants.MYTHIX_SHADOW_PARENT`, and value of `this`. @sourceRef _shadowMetadataAssignment; This allows @see getParentNode; to later find the parent of the shadow.
   *   3. `return shadow`
   * arguments:
   *   - name: options
   *     dataTypes: object
   *     desc: |
   *       [options](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#options) for [Element.attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
   * notes:
   *   - This is just a wrapper for [Element.attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) that executes
   *     custom framework functionality after the `super` call.
   * return: |
   *   @types ShadowRoot; The ShadowRoot instance created by [Element.attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow).
   */
  attachShadow(options) {
    // Check environment support
    if (typeof super.attachShadow !== 'function')
      return;

    let shadow = super.attachShadow(options);
    _utils_js__WEBPACK_IMPORTED_MODULE_3__.metadata(shadow, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_SHADOW_PARENT, this); // @ref:_shadowMetadataAssignment

    return shadow;
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   A stub for developers to control the Shadow DOM of the component.
   *
   *   By default, this method will simply call @see MythixUIComponent.attachShadow; in `"open"` `mode`.
   *
   *   Developers can overload this to do nothing (have no Shadow DOM for a specific component for example),
   *   or to do something else, such as specify they would like their component to be in `"closed"` `mode`.
   *
   *   The result of this method is assigned to `this.shadow` inside the `constructor` of the component.
   * arguments:
   *   - name: options
   *     dataTypes: object
   *     desc: |
   *       [options](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow#options) for [Element.attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
   * notes:
   *   - All this does is call `this.attachShadow`. Its purpose is for the developer to control
   *     what happens with the component's Shadow DOM.
   * return: |
   *   @types ShadowRoot; The ShadowRoot instance created by @see MythixUIComponent.attachShadow;.
   */
  createShadowDOM(options) {
    if (this.constructor.shadow === false)
      return null;

    let shadow = this.attachShadow({ mode: 'open', ...(options || {}) });

    // Adopt shared stylesheets if defined on the component class
    let sharedStyles = this.constructor.sharedStyles;
    if (sharedStyles && Array.isArray(sharedStyles) && sharedStyles.length > 0)
      _stylesheet_manager_js__WEBPACK_IMPORTED_MODULE_7__.adopt(shadow, sharedStyles);

    return shadow;
  }

  mergeChildren(target, ...others) {
    return _elements_js__WEBPACK_IMPORTED_MODULE_5__.mergeChildren(target, ...others);
  }

  getComponentTemplate(nameOrID) {
    if (nameOrID instanceof Node)
      return nameOrID;

    if (!this.ownerDocument)
      return;

    if (nameOrID)
      return _elements_js__WEBPACK_IMPORTED_MODULE_5__.queryTemplate(this.ownerDocument || document, nameOrID);

    if (this.templateID)
      return this.ownerDocument.getElementById(this.templateID);

    return this.ownerDocument.querySelector(`template[data-mythix-component-name="${this.sensitiveTagName}" i],template[data-for="${this.sensitiveTagName}" i]`);
  }

  appendExternalToShadowDOM() {
    if (!this.shadow)
      return;

    let ownerDocument = (this.ownerDocument || document);
    let elements      = ownerDocument.head.querySelectorAll('[data-auto-merge]');

    for (let element of Array.from(elements)) {
      let selector = element.getAttribute('data-auto-merge');
      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_2__.isNOE(selector))
        continue;

      if (!this.matches(selector))
        continue;

      this.shadow.appendChild(element.cloneNode(true));
    }
  }

  getProcessedTemplate(_template) {
    let template = this.getComponentTemplate(_template) || this.template;
    if (!template)
      return;

    return this.processElements((template.content) ? template.content.cloneNode(true) : template.cloneNode(true));
  }

  getRawTemplate(_template) {
    let template = this.getComponentTemplate(_template) || this.template;
    if (!template)
      return;

    return template;
  }

  appendTemplateTo(target, _template) {
    if (!target)
      return false;

    let processedTemplate = this.getProcessedTemplate(_template);
    if (processedTemplate) {
      // ensureDocumentStyles.call(this, this.ownerDocument, this.sensitiveTagName, template);

      target.appendChild(processedTemplate);
      return true;
    }

    return false;
  }

  appendTemplateToShadowDOM(_template) {
    return this.appendTemplateTo(this.shadow, _template);
  }

  connectedCallback() {
    this.setAttribute('data-mythix-component-name', this.sensitiveTagName);

    this.appendTemplateToShadowDOM();

    this.processElements(this);

    try {
      (0,_errors_js__WEBPACK_IMPORTED_MODULE_6__.debugLog)(`Calling mounted() for <${this.sensitiveTagName}>`);
      this.mounted();
    } catch (error) {
      let context = (0,_errors_js__WEBPACK_IMPORTED_MODULE_6__.formatComponentContext)(this, 'mounted');
      let componentError = new _errors_js__WEBPACK_IMPORTED_MODULE_6__.ComponentError(
        `Error in mounted() callback: ${error.message}`,
        {
          ...context,
          originalError: error,
          suggestion:    'Check the mounted() method implementation for errors.',
        },
      );
      console.error(componentError.toString());
      console.error('Original error:', error);
    }

    this.appendExternalToShadowDOM();

    this.documentInitialized = true;

    _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.nextTick(() => {
      this.classList.add('mythix-ready');
    });
  }

  disconnectedCallback() {
    try {
      (0,_errors_js__WEBPACK_IMPORTED_MODULE_6__.debugLog)(`Calling unmounted() for <${this.sensitiveTagName}>`);
      this.unmounted();
    } catch (error) {
      let context = (0,_errors_js__WEBPACK_IMPORTED_MODULE_6__.formatComponentContext)(this, 'unmounted');
      let componentError = new _errors_js__WEBPACK_IMPORTED_MODULE_6__.ComponentError(
        `Error in unmounted() callback: ${error.message}`,
        {
          ...context,
          originalError: error,
          suggestion:    'Check the unmounted() method implementation for errors.',
        },
      );
      console.error(componentError.toString());
      console.error('Original error:', error);
    }
  }

  awaitFetchSrcOnVisible(newSrc) {
    if (this.visibilityObserver) {
      this.visibilityObserver.unobserve(this);
      this.visibilityObserver = null;
    }

    if (!newSrc)
      return;

    let observer = _component_utils_js__WEBPACK_IMPORTED_MODULE_1__.visibilityObserver(({ wasVisible, disconnect }) => {
      if (!wasVisible)
        this.fetchSrc(this.getAttribute('data-mythix-src'));

      disconnect();

      this.visibilityObserver = null;
    }, { elements: [ this ] });

    Object.defineProperties(this, {
      'visibilityObserver': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        observer,
      },
    });
  }

  attributeChangedCallback(...args) {
    let [
      attributeName,
      oldValue,
      newValue,
    ] = args;

    if (oldValue !== newValue) {
      // Security: ensure this is actually a handled attribute call!
      // We wouldn't just want to start setting anything on the instance
      // via attributes... that might be bad, i.e: <img valueOf="">

      let propertyName    = _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.toCamelCase(attributeName);
      let magicName       = `attr$${propertyName}`;
      let { descriptor }  = _utils_js__WEBPACK_IMPORTED_MODULE_3__.getDescriptorFromPrototypeChain(this, magicName);
      if (descriptor) {
        // Call setter
        this[propertyName] = [ newValue, oldValue ];
      }
    }

    return this.attributeChanged(...args);
  }

  adoptedCallback(...args) {
    return this.adopted(...args);
  }

  mounted() {}
  unmounted() {}
  attributeChanged() {}
  adopted() {}

  get $$() {
    return _utils_js__WEBPACK_IMPORTED_MODULE_3__.createScope(this);
  }

  select(...args) {
    let argIndex    = 0;
    let options     = (_base_utils_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject(args[argIndex])) ? Object.assign(Object.create(null), args[argIndex++]) : {};
    let queryEngine = _query_engine_js__WEBPACK_IMPORTED_MODULE_4__.QueryEngine.from.call(this, { root: this, ...options, invokeCallbacks: false }, ...args.slice(argIndex));
    let shadowNodes;

    options = queryEngine.getOptions();

    if (options.shadow !== false && options.selector && options.root === this) {
      shadowNodes = Array.from(
        _query_engine_js__WEBPACK_IMPORTED_MODULE_4__.QueryEngine.from.call(
          this,
          { root: this.shadow },
          options.selector,
          options.callback,
        ).values(),
      );
    }

    if (shadowNodes)
      queryEngine = queryEngine.add(shadowNodes);

    if (options.slotted !== true)
      queryEngine = queryEngine.slotted(false);

    if (typeof options.callback === 'function')
      return this.select(queryEngine.map(options.callback));

    return queryEngine;
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   This method will dynamically build elements, or rather, @see ElementDefinition; instances, that
   *   define elements to be created later. @see ElementDefinition; instances are just that, a simple
   *   structure that defines the name, attributes, and children of any given element.
   *
   *   When these are inserted into a document, either through a @see QueryEngine;, or directly by
   *   calling @see ElementDefinition.build; before insert, they are only at this point converted
   *   into real [Elements](https://developer.mozilla.org/en-US/docs/Web/API/Element) and inserted
   *   into the specified DOM (document) at the specified location.
   * arguments:
   *   - name: callback
   *     dataTypes: function
   *     desc: |
   *       A callback that is immediately called and expected to return @see ElementDefinition; instances.
   *       The callback is called with only two arguments. The first arguments, `elements`, is a
   *       @see ElementGenerator; Proxy instance, that will properly generate any element definition requested.
   *       The second argument, `context`, is simply an empty object provided to the callback, allowing the
   *       developer to store contextual based information for the operation, if desired.
   * return: |
   *   * @types ElementDefinition; A single @see ElementDefinition; instance defining
   *     the DOM to generate when inserted. Can be a `#fragment` element definition.
   *   * @types Array<ElementDefinition>; An array of element definition instances
   *     defining the DOM to generate when inserted.
   *   * @types null; If nothing is returned, then no elements will be created.
   * notes:
   *   - |
   *     :info: The difference between this method and @see MythixUIComponent.$build; method is
   *     that this method will return @see ElementDefinition; instances, whereas the
   *     @see MythixUIComponent.$build; method will return a @see QueryEngine; instance containing
   *     all the built @see ElementDefinition; instances.
   * examples:
   *   - |
   *     ```javascript
   *     import {
   *       MythixUIComponent,
   *       Utils,
   *     } from '@cdn/mythix-ui-core@1'; // ensure we lock this to whatever version is important to us
   *
   *     export class DemoNavComponent extends MythixUIComponent {
   *       static tagName = 'demo-nav-component'; // a "something-" prefix is required
   *
   *       mounted() { // called whenever the component is added to another element
   *         let list = [
   *           'Test 1',
   *           'Test 2',
   *           'Lorem Ipsum',
   *         ];
   *
   *         // Dynamically build and append some elements (with attributes and event bindings)
   *         let unorderedListElement = this.build(({ NAV, UL, LI, $TEXT }) => { // any element name can be requested here (even custom ones)
   *           return UL.id('primary-list').class('interactive-list')(
   *             // ...children of UL element
   *             ...list.map((item, index) => {
   *               return LI.class('item-name focusable').dataIndex(index).onClick(this.onItemClick)(
   *                 // ...children of LI element
   *                 $TEXT(item),  // in this case, a single text node
   *               );
   *             }),
   *           );
   *         });
   *
   *         // Create an append elements to this element
   *         this.append(
   *           unorderedListElement.build(
   *             this.ownerDocument,
   *             { scope: Utils.createScope(this) },
   *           ),
   *         );
   *       }
   *
   *       // All class methods are automatically bound to "this" inside the super.constructor
   *       onItemClick(event) {
   *         console.log('Item Clicked!', event.target);
   *       }
   *     }
   *
   *     DemoNavComponent.register();
   *     ```
   */
  build(callback) {
    let result = [ callback.call(this, _elements_js__WEBPACK_IMPORTED_MODULE_5__.ElementGenerator, {}) ].flat(Infinity).map((item) => {
      if (item && item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNFINISHED_DEFINITION])
        return item();

      return item;
    }).filter(Boolean);

    return (result.length < 2) ? result[0] : new _elements_js__WEBPACK_IMPORTED_MODULE_5__.ElementDefinition('#fragment', {}, result);
  }

  $build(callback) {
    return _query_engine_js__WEBPACK_IMPORTED_MODULE_4__.QueryEngine.from.call(this, [ this.build(callback) ].flat(Infinity));
  }

  isAttributeTruthy(name) {
    if (!this.hasAttribute(name))
      return false;

    let value = this.getAttribute(name);
    if (value === '' || value === 'true')
      return true;

    return false;
  }

  getIdentifier() {
    return this.getAttribute('id') || this.getAttribute('name') || this.getAttribute('data-name') || _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.toCamelCase(this.sensitiveTagName);
  }

  metadata(key, value) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_3__.metadata(this, key, value);
  }

  defineDynamicProp(name, defaultValue, setter, _context) {
    return _utils_js__WEBPACK_IMPORTED_MODULE_3__.defineDynamicProp.call(_context || this, name, defaultValue, setter);
  }

  dynamicData(obj) {
    let keys = Object.keys(obj);
    let data = Object.create(null);

    for (let i = 0, il = keys.length; i < il; i++) {
      let key   = keys[i];
      let value = obj[key];
      if (typeof value === 'function')
        continue;

      _utils_js__WEBPACK_IMPORTED_MODULE_3__.defineDynamicProp.call(data, key, value);
    }

    return data;
  }

  /**
   * parent: MythixUIComponent
   * groupName: MythixUIComponent
   * desc: |
   *   A self-resetting timeout. This method expects an `id` argument (or will generate one from the provided
   *   callback method if not provided). It uses this provided `id` to create a timeout. This timeout has a special feature
   *   however that differentiates it from a normal `setTimeout` call: if you call `this.debounce` again with the
   *   same `id` **before** the time runs out, then it will automatically reset the timer. In short, only the last call
   *   to `this.debounce` (given the same id) will take effect (unless the specified timeout is reached between calls).
   * return: |
   *   This method returns a specialized Promise instance. The instance is specialized because the following properties
   *   are injected into it:
   *   1. `resolve(resultValue)` - When called, resolves the promise with the first provided argument
   *   2. `reject(errorValue)` - When called, rejects the promise with the first provided argument
   *   3. `status()` - When called, will return the fulfillment status of the promise, as a `string`, one of: `"pending", "fulfilled"`, or `"rejected"`
   *   4. `id<string>` - A randomly generated ID for this promise
   *
   *   See @see BaseUtils.createResolvable;
   * arguments:
   *   - name: callback
   *     dataTypes: function
   *     desc: |
   *       The method to call when the timeout has been met.
   *   - name: timeMS
   *     dataTypes: number
   *     optional: true
   *     default: 0
   *     desc: |
   *       The number of milliseconds to wait before calling `callback`.
   *   - name: id
   *     dataTypes: string
   *     optional: true
   *     default: "null"
   *     desc: |
   *       The identifier for this debounce timer. If not provided, then one
   *       will be generated for you based on the provided callback.
   * notes:
   *   - Though not required, it is faster and less problematic to provide your own `id` argument
   */
  debounce(callback, timeMS, _id) {
    var id = _id;

    // If we don't get an id from the user, then guess the id by turning the function
    // into a string (raw source) and use that for an id instead
    if (id == null) {
      id = ('' + callback);

      // If this is a transpiled code, then an async generator will be used for async functions
      // This wraps the real function, and so when converting the function into a string
      // it will NOT be unique per call-site. For this reason, if we detect this issue,
      // we will go the "slow" route and create a stack trace, and use that for the unique id
      if (id.match(/asyncGeneratorStep/)) {
        id = (new Error()).stack;
        console.warn('mythix-ui warning: "this.delay" called without a specified "id" parameter. This will result in a performance hit. Please specify and "id" argument for your call: "this.delay(callback, ms, \'some-custom-call-site-id\')"');
      }
    } else {
      id = ('' + id);
    }

    let promise = this.delayTimers.get(id);
    if (promise) {
      if (promise.timerID)
        clearTimeout(promise.timerID);

      promise.reject('cancelled');
    }

    promise = _base_utils_js__WEBPACK_IMPORTED_MODULE_2__.createResolvable();
    this.delayTimers.set(id, promise);

    // Let's not complain about
    // uncaught errors
    promise.catch(() => {});

    promise.timerID = setTimeout(async () => {
      try {
        let result = await callback();
        promise.resolve(result);
      } catch (error) {
        console.error('Error encountered while calling "delay" callback: ', error, callback.toString());
        promise.reject(error);
      }
    }, timeMS || 0);

    return promise;
  }

  clearDebounce(id) {
    let promise = this.delayTimers.get(id);
    if (!promise)
      return;

    if (promise.timerID)
      clearTimeout(promise.timerID);

    promise.reject('cancelled');

    this.delayTimers.delete(id);
  }

  classes(..._args) {
    let args = _args.flat(Infinity).map((item) => {
      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_2__.isType(item, '::String'))
        return item.trim();

      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_2__.isPlainObject(item)) {
        let keys  = Object.keys(item);
        let items = [];

        for (let i = 0, il = keys.length; i < il; i++) {
          let key   = keys[i];
          let value = item[key];
          if (!value)
            continue;

          items.push(key);
        }

        return items;
      }

      return null;
    }).flat(Infinity).filter(Boolean);

    return Array.from(new Set(args)).join(' ');
  }

  async fetchSrc(srcURL) {
    if (!srcURL)
      return;

    try {
      await _component_utils_js__WEBPACK_IMPORTED_MODULE_1__.loadPartialIntoElement.call(this, srcURL);
      this.classList.add('mythix-ready');
    } catch (error) {
      console.error(`"${this.sensitiveTagName}": Failed to load specified resource: ${srcURL} (resolved to: ${error.url})`, error);
    }
  }
}


/***/ }),

/***/ "./lib/mythix-ui-dynamic-style.js":
/*!****************************************!*\
  !*** ./lib/mythix-ui-dynamic-style.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MythixUIDynamicStyle: () => (/* binding */ MythixUIDynamicStyle)
/* harmony export */ });
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _component_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component-utils.js */ "./lib/component-utils.js");
/* harmony import */ var _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mythix-ui-component.js */ "./lib/mythix-ui-component.js");
/* eslint-disable no-magic-numbers */






class MythixUIDynamicStyle extends _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_2__.MythixUIComponent {
  static tagName = 'mythix-dynamic-style';

  set attr$dataEnabled([ newValue ]) {
    this.handleDataEnabledAttributeChange(newValue);
  }

  createStyleNode() {
    let ownerDocument   = this.ownerDocument || document;
    let initialContent  = this.textContent.trim();
    let href            = this.attr('href');
    let styleNode       = ownerDocument.createElement('style');

    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNotNOE(href)) {
      _component_utils_js__WEBPACK_IMPORTED_MODULE_1__.require(href, { ownerDocument }).then(
        async ({ response }) => {
          let content = await response.text();
          styleNode.innerHTML = content;

          this.handleDataEnabledAttributeChange(this.attr('data-enabled'));
        },
        (error) => {
          console.error(`mythix-dynamic-style: Error while attempting to load style "${href}": `, this, error);
        },
      );
    } else if (_base_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNotNOE(initialContent)) {
      if ((/<style[^>]*>/i).test(initialContent)) {
        let tempDiv = ownerDocument.createElement('div');
        tempDiv.innerHTML = initialContent;

        let tempNode = tempDiv.querySelector('style');
        if (tempNode)
          styleNode = tempNode;
        else
          styleNode.innerHTML = initialContent;
      } else {
        styleNode.innerHTML = initialContent;
      }
    }

    return styleNode;
  }

  mounted() {
    super.mounted();

    this.styleNode = this.createStyleNode();

    this.handleDataEnabledAttributeChange(this.attr('data-enabled'));
  }

  handleDataEnabledAttributeChange(enabled) {
    if (!this.styleNode)
      return;

    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_0__.isNOE(this.styleNode.textContent))
      return;

    let isEnabled = (/^(true)$/i).test(enabled);
    if (isEnabled)
      this.appendChild(this.styleNode);
    else if (this.contains(this.styleNode))
      this.removeChild(this.styleNode);
  }
}

MythixUIDynamicStyle.register();

(globalThis.mythixUI = (globalThis.mythixUI || {})).MythixUIDynamicStyle = MythixUIDynamicStyle;


/***/ }),

/***/ "./lib/mythix-ui-language-provider.js":
/*!********************************************!*\
  !*** ./lib/mythix-ui-language-provider.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MythixUILanguagePack: () => (/* binding */ MythixUILanguagePack),
/* harmony export */   MythixUILanguageProvider: () => (/* binding */ MythixUILanguageProvider)
/* harmony export */ });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _component_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component-utils.js */ "./lib/component-utils.js");
/* harmony import */ var _dynamic_property_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dynamic-property.js */ "./lib/dynamic-property.js");
/* harmony import */ var _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mythix-ui-component.js */ "./lib/mythix-ui-component.js");









/**
 * RTL (Right-to-Left) language codes.
 * Includes Arabic, Hebrew, Persian/Farsi, Urdu, and related languages.
 */
const RTL_LANGUAGES = new Set([
  'ar', 'arc', 'arz', 'az-arab', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he',
  'ku-arab', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi',
]);

/**
 * Check if a language code represents an RTL language.
 */
const isRTLLanguage = (lang) => {
  if (!lang)
    return false;

  let normalizedLang = lang.toLowerCase();

  // Check exact match
  if (RTL_LANGUAGES.has(normalizedLang))
    return true;

  // Check base language (e.g., 'ar-SA' -> 'ar')
  let baseLang = normalizedLang.split('-')[0];
  return RTL_LANGUAGES.has(baseLang);
};

/**
 * Default date format presets.
 */
const DATE_FORMAT_PRESETS = {
  short:  { year: 'numeric', month: 'short', day: 'numeric' },
  long:   { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  medium: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' },
  time:   { hour: 'numeric', minute: 'numeric' },
  full:   { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' },
};

/**
 * Default number format presets.
 */
const NUMBER_FORMAT_PRESETS = {
  decimal:    { style: 'decimal' },
  percent:    { style: 'percent' },
  compact:    { notation: 'compact' },
  scientific: { notation: 'scientific' },
};

class MythixUILanguagePack extends _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_5__.MythixUIComponent {
  static tagName = 'mythix-language-pack';

  createShadowDOM() {
    // NOOP
  }

  getComponentTemplate() {
    // NOOP
  }

  set attr$dataMythixSrc([ value ]) {
    // NOOP... Trap this because we
    // don't want to load a partial here
  }

  onMutationAdded(mutation) {
    // When added to the DOM, ensure that we were
    // added to the root of a language provider...
    // If not, then move ourselves to the root
    // of the language provider.
    let parentLanguageProvider = this.closest('mythix-language-provider');
    if (parentLanguageProvider && parentLanguageProvider !== mutation.target)
      _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick(() => parentLanguageProvider.insertBefore(this, parentLanguageProvider.firstChild));
  }
}

const IS_JSON_ENCTYPE                 = /^application\/json/i;
const LANGUAGE_PACK_INSERT_GRACE_TIME = 50;

class MythixUILanguageProvider extends _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_5__.MythixUIComponent {
  static tagName = 'mythix-language-provider';

  /**
   * Observed attributes for reactive updates.
   */
  static observedAttributes = [ 'lang', 'fallback', 'auto-dir' ];

  set attr$lang([ newValue, oldValue ]) {
    this.loadAllLanguagePacksForLanguage(newValue, oldValue);
    this.updateTextDirection();
  }

  set attr$fallback([ _newValue, _oldValue ]) {
    // Fallback chain changed, reload language packs
    this.loadAllLanguagePacksForLanguage(this.getCurrentLocale());
  }

  set attr$autoDir([ newValue ]) {
    if (newValue !== null)
      this.updateTextDirection();
  }

  onMutationChildAdded(node) {
    if (node.localName === 'mythix-language-pack') {
      this.debounce(() => {
        // Reload language packs after additions
        this.loadAllLanguagePacksForLanguage(this.getCurrentLocale());
      }, LANGUAGE_PACK_INSERT_GRACE_TIME, 'reloadLanguagePacks');
    }
  }

  constructor() {
    super();

    Object.defineProperties(this, {
      'terms': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        Object.create(null),
      },
      '_pluralRules': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        null,
      },
      '_dateFormatters': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
      '_numberFormatters': {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        new Map(),
      },
    });
  }

  /**
   * Get the fallback language chain as an array.
   * Returns [currentLang, ...fallbacks] in order of preference.
   */
  getFallbackChain() {
    let currentLang = this.getCurrentLocale();
    let fallback = this.getAttribute('fallback') || '';
    let fallbacks = fallback.split(',').map((l) => l.trim()).filter(Boolean);

    // Build chain: current -> base of current -> explicit fallbacks
    let chain = [ currentLang ];

    // Add base language if current has a region (e.g., 'es-MX' -> 'es')
    if (currentLang.includes('-')) {
      let baseLang = currentLang.split('-')[0];
      if (!chain.includes(baseLang))
        chain.push(baseLang);
    }

    // Add explicit fallbacks
    for (let lang of fallbacks) {
      if (!chain.includes(lang))
        chain.push(lang);
    }

    return chain;
  }

  /**
   * Translate a key with optional interpolation and pluralization support.
   *
   * @param {string} key - The translation key path.
   * @param {object} options - Options including `count` for pluralization and interpolation values.
   * @param {any} defaultValue - Default value if key not found.
   * @returns {string} The translated and interpolated string.
   *
   * @example
   * // Simple translation
   * lang.t('greeting.hello')
   *
   * @example
   * // With pluralization (requires ICU-style plural keys in language pack)
   * lang.t('items', { count: 5 })
   * // Language pack: { "items": { "one": "{{count}} item", "other": "{{count}} items" } }
   *
   * @example
   * // With interpolation
   * lang.t('welcome', { name: 'John' })
   * // Language pack: { "welcome": "Hello, {{name}}!" }
   */
  t(key, options = {}, defaultValue) {
    let path = `global.i18n.${key}`;
    let result = _utils_js__WEBPACK_IMPORTED_MODULE_2__.fetchPath(this.terms, path);

    // Handle pluralization
    if (result && typeof result === 'object' && 'count' in options) {
      let pluralCategory = this.getPluralCategory(options.count);
      result = result[pluralCategory] || result.other || result;
    }

    // Get the raw value if it's a DynamicProperty
    if (result instanceof _dynamic_property_js__WEBPACK_IMPORTED_MODULE_4__.DynamicProperty)
      result = result.valueOf();

    // Use default if no result
    if (result == null)
      result = (defaultValue != null) ? defaultValue : key;

    // Interpolate values
    if (typeof result === 'string' && options) {
      result = result.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return (varName in options) ? options[varName] : match;
      });
    }

    return result;
  }

  /**
   * Get the ICU plural category for a count.
   *
   * @param {number} count - The count to get the plural category for.
   * @returns {string} One of: 'zero', 'one', 'two', 'few', 'many', 'other'.
   */
  getPluralCategory(count) {
    let lang = this.getCurrentLocale();

    // Cache PluralRules per language
    if (!this._pluralRules || this._pluralRules.locale !== lang) {
      this._pluralRules = new Intl.PluralRules(lang);
      this._pluralRules.locale = lang;
    }

    return this._pluralRules.select(count);
  }

  /**
   * Format a date according to the current locale.
   *
   * @param {Date|number|string} date - The date to format.
   * @param {string|object} style - A preset name ('short', 'long', 'medium', 'time', 'full') or Intl.DateTimeFormat options.
   * @returns {string} The formatted date string.
   *
   * @example
   * lang.formatDate(new Date(), 'long')
   * // "February 7, 2026"
   *
   * @example
   * lang.formatDate(date, { year: 'numeric', month: '2-digit', day: '2-digit' })
   */
  formatDate(date, style = 'medium') {
    let lang = this.getCurrentLocale();
    let options = (typeof style === 'string') ? (DATE_FORMAT_PRESETS[style] || DATE_FORMAT_PRESETS.medium) : style;
    let cacheKey = `${lang}-${JSON.stringify(options)}`;

    if (!this._dateFormatters.has(cacheKey))
      this._dateFormatters.set(cacheKey, new Intl.DateTimeFormat(lang, options));

    let dateValue = (date instanceof Date) ? date : new Date(date);
    return this._dateFormatters.get(cacheKey).format(dateValue);
  }

  /**
   * Format a date relative to now (e.g., "2 days ago", "in 3 hours").
   *
   * @param {Date|number|string} date - The date to format.
   * @param {object} options - Intl.RelativeTimeFormat options.
   * @returns {string} The relative time string.
   *
   * @example
   * lang.formatRelativeTime(new Date(Date.now() - 86400000))
   * // "1 day ago"
   */
  formatRelativeTime(date, options = {}) {
    let lang = this.getCurrentLocale();
    let dateValue = (date instanceof Date) ? date : new Date(date);
    let now = Date.now();
    let diffMs = dateValue.getTime() - now;
    let diffSeconds = Math.round(diffMs / 1000);

    // Determine the best unit
    let value;
    let unit;

    const MINUTE = 60;
    const HOUR = 3600;
    const DAY = 86400;
    const WEEK = 604800;
    const MONTH = 2629800; // ~30.44 days
    const YEAR = 31557600; // ~365.25 days

    let absDiff = Math.abs(diffSeconds);

    if (absDiff < MINUTE) {
      value = diffSeconds;
      unit = 'second';
    } else if (absDiff < HOUR) {
      value = Math.round(diffSeconds / MINUTE);
      unit = 'minute';
    } else if (absDiff < DAY) {
      value = Math.round(diffSeconds / HOUR);
      unit = 'hour';
    } else if (absDiff < WEEK) {
      value = Math.round(diffSeconds / DAY);
      unit = 'day';
    } else if (absDiff < MONTH) {
      value = Math.round(diffSeconds / WEEK);
      unit = 'week';
    } else if (absDiff < YEAR) {
      value = Math.round(diffSeconds / MONTH);
      unit = 'month';
    } else {
      value = Math.round(diffSeconds / YEAR);
      unit = 'year';
    }

    let formatter = new Intl.RelativeTimeFormat(lang, { numeric: 'auto', ...options });
    return formatter.format(value, unit);
  }

  /**
   * Format a number according to the current locale.
   *
   * @param {number} number - The number to format.
   * @param {string|object} style - A preset name ('decimal', 'percent', 'compact', 'scientific') or Intl.NumberFormat options.
   * @returns {string} The formatted number string.
   *
   * @example
   * lang.formatNumber(1234.56)
   * // "1,234.56" (in en-US)
   *
   * @example
   * lang.formatNumber(0.42, 'percent')
   * // "42%"
   */
  formatNumber(number, style = 'decimal') {
    let lang = this.getCurrentLocale();
    let options = (typeof style === 'string') ? (NUMBER_FORMAT_PRESETS[style] || NUMBER_FORMAT_PRESETS.decimal) : style;
    let cacheKey = `${lang}-${JSON.stringify(options)}`;

    if (!this._numberFormatters.has(cacheKey))
      this._numberFormatters.set(cacheKey, new Intl.NumberFormat(lang, options));

    return this._numberFormatters.get(cacheKey).format(number);
  }

  /**
   * Format a currency amount according to the current locale.
   *
   * @param {number} amount - The amount to format.
   * @param {string} currency - The ISO 4217 currency code (e.g., 'USD', 'EUR').
   * @param {object} options - Additional Intl.NumberFormat options.
   * @returns {string} The formatted currency string.
   *
   * @example
   * lang.formatCurrency(99.99, 'USD')
   * // "$99.99" (in en-US)
   *
   * @example
   * lang.formatCurrency(1234.56, 'EUR')
   * // "€1,234.56" (in en-US) or "1.234,56 €" (in de-DE)
   */
  formatCurrency(amount, currency, options = {}) {
    return this.formatNumber(amount, {
      style:    'currency',
      currency: currency,
      ...options,
    });
  }

  /**
   * Check if the current language is RTL.
   *
   * @returns {boolean} True if the current language is RTL.
   */
  isRTL() {
    return isRTLLanguage(this.getCurrentLocale());
  }

  /**
   * Update the text direction based on the current language.
   * Only applies when auto-dir attribute is present.
   */
  updateTextDirection() {
    if (!this.hasAttribute('auto-dir'))
      return;

    let direction = this.isRTL() ? 'rtl' : 'ltr';
    let previousDirection = this.getAttribute('dir');

    if (previousDirection === direction)
      return;

    this.setAttribute('dir', direction);

    // Also set on document if this is the root provider
    if (!this.closest('mythix-language-provider:not(:scope)')) {
      let doc = this.ownerDocument || document;
      doc.documentElement.setAttribute('dir', direction);
    }

    // Dispatch direction change event
    let event = new CustomEvent('directionchange', {
      bubbles: true,
      detail:  { direction, language: this.getCurrentLocale() },
    });
    this.dispatchEvent(event);
  }

  i18n(_path, defaultValue) {
    let path    = `global.i18n.${_path}`;
    let result  = _utils_js__WEBPACK_IMPORTED_MODULE_2__.fetchPath(this.terms, path);

    if (result == null)
      return _utils_js__WEBPACK_IMPORTED_MODULE_2__.getDynamicPropertyForPath.call(this, path, (defaultValue == null) ? '' : defaultValue);

    return result;
  }

  getCurrentLocale() {
    // (this.ownerDocument || document).childNodes[1] is the `<html`> tag of the document
    return this.getAttribute('lang') || (this.ownerDocument || document).childNodes[1].getAttribute('lang') || 'en';
  }

  mounted() {
    super.mounted();

    if (!this.getAttribute('lang'))
      this.setAttribute('lang', (this.ownerDocument || document).childNodes[1].getAttribute('lang') || 'en');

    // Apply initial text direction if auto-dir is enabled
    this.updateTextDirection();
  }

  createShadowDOM() {
    // NOOP
  }

  getComponentTemplate() {
    // NOOP
  }

  getSourcesForLang(lang) {
    return this.select(`mythix-language-pack[lang^="${lang.replace(/"/g, '\\"')}"]`);
  }

  loadAllLanguagePacksForLanguage(_lang) {
    let lang = _lang || 'en';
    let fallbackChain = this.getFallbackChain();
    let allSourceElements = [];

    // Collect language packs from all languages in the fallback chain
    for (let fallbackLang of fallbackChain) {
      let sourceElements = this.getSourcesForLang(fallbackLang)
        .filter((sourceElement) => _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isNotNOE(sourceElement.getAttribute('src')));

      for (let sourceElement of sourceElements) {
        if (!allSourceElements.includes(sourceElement))
          allSourceElements.push(sourceElement);
      }
    }

    if (!allSourceElements.length) {
      console.warn(`"mythix-language-provider": No "mythix-language-pack" tag found for languages: ${fallbackChain.join(', ')}`);
      return;
    }

    this.loadAllLanguagePacks(lang, allSourceElements, fallbackChain);
  }

  async loadAllLanguagePacks(lang, sourceElements, fallbackChain = []) {
    try {
      // Load all language packs
      let promises = sourceElements.map((sourceElement) => {
        let packLang = sourceElement.getAttribute('lang') || lang;
        return this.loadLanguagePack(packLang, sourceElement).then((terms) => ({
          lang:  packLang,
          terms: terms,
        }));
      });

      let results = await Promise.allSettled(promises);

      // Group terms by language
      let termsByLang = new Map();
      for (let result of results) {
        if (result.status !== 'fulfilled' || !result.value || !result.value.terms)
          continue;

        let { lang: packLang, terms } = result.value;
        let baseLang = packLang.split('-')[0];

        // Store under both full lang and base lang for fallback matching
        if (!termsByLang.has(packLang))
          termsByLang.set(packLang, []);

        termsByLang.get(packLang).push(terms);
      }

      // Merge terms in fallback order (last in chain gets lowest priority)
      // Reverse the chain so more specific languages override fallbacks
      let mergedTerms = {};
      let reversedChain = [ ...fallbackChain ].reverse();

      for (let fallbackLang of reversedChain) {
        let langTerms = termsByLang.get(fallbackLang) || [];

        // Also check base language
        if (fallbackLang.includes('-')) {
          let baseLang = fallbackLang.split('-')[0];
          let baseTerms = termsByLang.get(baseLang) || [];
          langTerms = [ ...baseTerms, ...langTerms ];
        }

        for (let terms of langTerms) {
          mergedTerms = deepmerge__WEBPACK_IMPORTED_MODULE_0__(mergedTerms, terms);
        }
      }

      let compiledTerms = this.compileLanguageTerms(lang, mergedTerms);
      this.terms = compiledTerms;
    } catch (error) {
      console.error('"mythix-language-provider": Failed to load language packs', error);
    }
  }

  async loadLanguagePack(lang, sourceElement) {
    let src = sourceElement.getAttribute('src');
    if (!src)
      return;

    try {
      let { response }  = await _component_utils_js__WEBPACK_IMPORTED_MODULE_3__.require.call(this, src, { ownerDocument: this.ownerDocument || document });
      let type          = this.getAttribute('enctype') || 'application/json';
      if (IS_JSON_ENCTYPE.test(type)) {
        // Handle JSON
        return response.json();
      } else {
        new TypeError(`Don't know how to load a language pack of type "${type}"`);
      }
    } catch (error) {
      console.error(`"mythix-language-provider": Failed to load specified resource: ${src}`, error);
    }
  }

  compileLanguageTerms(lang, terms) {
    const walkTerms = (terms, rawKeyPath) => {
      let keys      = Object.keys(terms);
      let termsCopy = {};

      for (let i = 0, il = keys.length; i < il; i++) {
        let key         = keys[i];
        let value       = terms[key];
        let newKeyPath  = rawKeyPath.concat(key);

        if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject(value) || Array.isArray(value)) {
          termsCopy[key] = walkTerms(value, newKeyPath);
        } else {
          let property = _utils_js__WEBPACK_IMPORTED_MODULE_2__.getDynamicPropertyForPath.call(this, newKeyPath.join('.'), value);
          termsCopy[key] = property;
          property[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_4__.DynamicProperty.set](value);
        }
      }

      return termsCopy;
    };

    return walkTerms(terms, [ 'global', 'i18n' ]);
  }
}

MythixUILanguagePack.register();
MythixUILanguageProvider.register();

(globalThis.mythixUI = (globalThis.mythixUI || {})).MythixUILanguagePack = MythixUILanguagePack;
globalThis.mythixUI.MythixUILanguageProvider = MythixUILanguageProvider;


/***/ }),

/***/ "./lib/mythix-ui-require.js":
/*!**********************************!*\
  !*** ./lib/mythix-ui-require.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MythixUIRequire: () => (/* binding */ MythixUIRequire)
/* harmony export */ });
/* harmony import */ var _component_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component-utils.js */ "./lib/component-utils.js");
/* harmony import */ var _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mythix-ui-component.js */ "./lib/mythix-ui-component.js");



const IS_TEMPLATE       = /^(template)$/i;
const TEMPLATE_TEMPLATE = /^(\*|\|\*|\*\|)$/;

/**
 * type: MythixElement
 * name: MythixUIRequire
 * groupName: MythixElements
 * desc: |
 *   ```javascript
 *   import { MythixElements } from 'mythix-ui-core@1.0';
 *
 *   const {
 *     MythixUIRequire,
 *   } = MythixElements;
 *   ```
 *
 *   MythixUIRequire is an Element that will load other resources. It is inspired by and named after `require` in Node. It works very similarly as well, so not too much needs to be explained about it.
 *
 *   Except Mythix UI standard component file structure maybe... Yeah, maybe we should discuss that.
 *
 *   The `<mythix-require src="./components/widget.html">` tag allows you to load other resources simply by specifying a path. This path can be relative, or absolute. The path can contain query parameters.
 *
 *   You may have noticed that the tag name doesn't quite match the class name, `MythixUIRequire`, vs `<mythix-require>`. This deviation was chosen by the Mythix development team because Mythix is an entire ecosystem, not just a UI framework. For this reason, and in part to avoid future naming collisions, we have decided that in code, the class name should contain the `UI` part to delimit it from other Mythix technologies. Next, we felt constantly typing `<mythix-ui-require>` in HTML, vs the nicer `<mythix-require>` was kinda silly. Besides, in HTML, you ARE in the UI context, so why repeat ourselves? Anyhow, this is just a little note to keep in mind. The Element class names do not match the Element `tagName` for Mythix UI standard components.
 *
 *   If `<mythix-require>` is used to fetch a JavaScript resource, then it behaves almost identically to a `<script>` tag. If however it is being used to fetch another type of known resource, such as text/html, then it will behave differently.
 *
 *   When an HTML file is fetched by a `<mythix-require>` element, then any internal `<script>`, `<style>`, or other tag that belongs in the `<head>` tag will be placed in the `<head>` tag of the document. Duplicate inserts are prevented by use of tag ids. If a tag in the `<head>` of the document already has the same id as one MythixUIRequire is trying to insert, then MythixUIRequire will abort, and it won't duplicate inserting said element.
 *
 *   Other elements are treated specially as well when encountered in the loaded HTML file. Below is a table of special cases:
 *
 *   | Elements | Notes |
 *   |------|-------|
 *   | `<link>`, `<style>`, `<meta>` | Are appended to the `<head>` of the document. |
 *   | `<script>` | Is appended to the `<head>` of the document after the `src` attribute is fully resolved. |
 *   | `<template>` | Is appended to the bottom of the `<body>` of the document. |
 *   | `<base>`, `<noscript>`, `<title>` | Are deliberately discarded. |
 *   | All others | Are appended to the `<body>` of the document. |
 *
 * notes:
 *   - |
 *     :info: `globalThis.mythixUI.urlResolver: (context: { src: string | URL, url: URL, path: string, fileName: string }) => string | URL` is a method that can be defined by the user. When defined, it will be called every time @see ComponentUtils.resolveURL; is called. `MythixUIRequire` calls @see ComponentUtils.resolveURL; to resolve URLs, including in sub `<script>` tag `src` attributes loaded from resources. It is the intent of this method that it will globally resolve all URLs internal to the Mythix UI framework. Obviously it won't resolve URLs directly from static `import` or dynamic `import()` statements in JavaScript. Those are handled by the [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) you setup, remember?.
 * examples:
 *   - |
 *     Another component can be loaded dynamically--usually by loading its corresponding HTML file (which will generally then load the `<script>` require by the component). In the example below we are loading the standard modal component provided by Mythix UI:
 *     ```html
 *     <mythix-require src="@cdn/mythix-ui-modal@${{majorVersion}}/dist/mythix-ui-modal.html"></mythix-require>
 *     ```
 */

let REQUIRE_HANDLERS = [];

function registerRequireHandler(pattern, callback) {
  REQUIRE_HANDLERS.unshift({
    pattern,
    callback,
  });
}

registerRequireHandler(/\.html$/i, async function({ url, ownerDocument, fetchOptions }) {
  let {
    response,
    cached,
  } = await _component_utils_js__WEBPACK_IMPORTED_MODULE_0__.require.call(
    this,
    url,
    {
      magic:          false,
      ownerDocument:  ownerDocument || document,
      fetchOptions:   fetchOptions,
    },
  );

  if (cached)
    return true;

  let body = await response.text();
  _component_utils_js__WEBPACK_IMPORTED_MODULE_0__.importIntoDocumentFromSource.call(
    this,
    ownerDocument,
    ownerDocument.location,
    url,
    body,
    {
      magic:        true,
      nodeHandler:  (node, { isHandled }) => {
        if (!isHandled && node.nodeType === Node.ELEMENT_NODE)
          document.body.appendChild(node);
      },
      preProcess:   ({ template, children }) => {
        let starTemplate = children.find((child) => {
          let dataFor = child.getAttribute('data-for');
          return (IS_TEMPLATE.test(child.tagName) && TEMPLATE_TEMPLATE.test(dataFor));
        });

        if (!starTemplate)
          return template;

        let dataFor = starTemplate.getAttribute('data-for');
        for (let child of children) {
          if (child === starTemplate)
            continue;

          if (IS_TEMPLATE.test(child.tagName)) { // <template>
            let starClone = starTemplate.content.cloneNode(true);
            if (dataFor === '*|')
              child.content.insertBefore(starClone, child.content.childNodes[0] || null);
            else
              child.content.appendChild(starClone);
          }
        }

        starTemplate.parentNode.removeChild(starTemplate);

        return template;
      },
    },
  );

  return true;
});

registerRequireHandler(/\.js$/i, async function({ url, ownerDocument }) {
  let result = _component_utils_js__WEBPACK_IMPORTED_MODULE_0__.insertScriptIntoHead(url, { ownerDocument });
  console.log({ scriptElement: result });
  return true;
});

class MythixUIRequire extends _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_1__.MythixUIComponent {
  static registerHandler = registerRequireHandler;

  /**
   * Observed attributes including cache mode control.
   */
  static observedAttributes = [ 'src', 'cache' ];

  /**
   * Get the fetch options including cache mode.
   * The `cache` attribute controls HTTP caching behavior:
   * - 'default': Browser uses HTTP cache headers (Cache-Control, ETag, etc.)
   * - 'no-store': Bypass cache completely
   * - 'reload': Fetch fresh but update cache
   * - 'no-cache': Always revalidate with server
   * - 'force-cache': Use cache if available, even if stale
   *
   * @returns {object} Fetch options object.
   */
  getFetchOptions() {
    let cacheMode = this.getAttribute('cache');

    if (cacheMode && /^(default|no-store|reload|no-cache|force-cache|only-if-cached)$/.test(cacheMode))
      return { cache: cacheMode };

    return {};
  }

  async mounted() {
    super.mounted();

    let src = this.getAttribute('src');

    try {
      let ownerDocument = this.ownerDocument || document;
      let url           = _component_utils_js__WEBPACK_IMPORTED_MODULE_0__.resolveURL.call(this, ownerDocument.location, src, { magic: true });
      let fetchOptions  = this.getFetchOptions();

      for (let [ index, handler ] of REQUIRE_HANDLERS.entries()) {
        let {
          pattern,
          callback,
        } = handler;

        if (pattern.test(url)) {
          let result = await callback.call(this, { src, url, index, ownerDocument, fetchOptions });
          if (result === true)
            break;
        }
      }
    } catch (error) {
      console.error(`"mythix-require": Failed to load specified resource: ${src}`, error);
    }
  }

  async fetchSrc() {
    // NOOP
  }
}

(globalThis.mythixUI = (globalThis.mythixUI || {})).MythixUIRequire = MythixUIRequire;

if (typeof customElements !== 'undefined' && !customElements.get('mythix-require'))
  customElements.define('mythix-require', MythixUIRequire);


/***/ }),

/***/ "./lib/mythix-ui-spinner.js":
/*!**********************************!*\
  !*** ./lib/mythix-ui-spinner.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MythixUISpinner: () => (/* binding */ MythixUISpinner)
/* harmony export */ });
/* harmony import */ var _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mythix-ui-component.js */ "./lib/mythix-ui-component.js");
/* eslint-disable no-magic-numbers */



/*
Many thanks to Sagee Conway for the following CSS spinners
https://codepen.io/saconway/pen/vYKYyrx
*/

const STYLE_SHEET =
`
:host {
  --mythix-spinner-size: 1em;
  width: var(--mythix-spinner-size);
  height: var(--mythix-spinner-size);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
}
:host(.small) {
  --mythix-spinner-size: calc(1em * 0.75);
}
:host(.medium) {
  --mythix-spinner-size: calc(1em * 1.5);
}
:host(.large) {
  --mythix-spinner-size: calc(1em * 3);
}
.spinner-item,
.spinner-item::before,
.spinner-item::after {
	box-sizing: border-box;
}
:host([kind="audio"]) .spinner-item {
  width: 11%;
  height: 60%;
  background: var(--mythix-spinner-segment-color);
  animation: mythix-spinner-audio-animation calc(var(--theme-animation-duration, 1000ms) * 1.0) ease-in-out infinite;
}
@keyframes mythix-spinner-audio-animation {
  50% {
    transform: scaleY(0.25);
  }
}
:host([kind="audio"]) .spinner-item:nth-child(1) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
  animation-delay: calc(var(--theme-animation-duration, 1000ms) / 10 * -3);
}
:host([kind="audio"]) .spinner-item:nth-child(2) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  animation-delay: calc(var(--theme-animation-duration, 1000ms) / 10 * -1);
}
:host([kind="audio"]) .spinner-item:nth-child(3) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  animation-delay: calc(var(--theme-animation-duration, 1000ms) / 10 * -2);
}
:host([kind="audio"]) .spinner-item:nth-child(4) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color4, var(--theme-primary-color, #333));
  animation-delay: calc(var(--theme-animation-duration, 1000ms) / 10 * -1);
}
:host([kind="audio"]) .spinner-item:nth-child(5) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color5, var(--theme-primary-color, #333));
  animation-delay: calc(var(--theme-animation-duration, 1000ms) / 10 * -3);
}
:host([kind="circle"]) .spinner-item {
  --mythix-spinner-circle-thickness: calc(var(--mythix-spinner-size) * 0.075);
  position: absolute;
  width: var(--mythix-spinner-item-size);
  height: var(--mythix-spinner-item-size);
  top: calc(50% - var(--mythix-spinner-item-size) / 2);
  left: calc(50% - var(--mythix-spinner-item-size) / 2);
  border: var(--mythix-spinner-circle-thickness) solid transparent;
  border-left: var(--mythix-spinner-circle-thickness) solid var(--mythix-spinner-segment-color);
  border-right: var(--mythix-spinner-circle-thickness) solid var(--mythix-spinner-segment-color);
  border-radius: 50%;
  animation: mythix-spinner-circle-animation calc(var(--theme-animation-duration, 1000ms) * 1.0) linear infinite;
}
@keyframes mythix-spinner-circle-animation {
  to {
    transform: rotate(360deg);
  }
}
:host([kind="circle"]) .spinner-item:nth-of-type(1) {
  --mythix-spinner-item-size: calc(var(--mythix-spinner-size) * 1.0);
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
  border-top: var(--mythix-spinner-circle-thickness) * 0.075) solid var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
  animation: mythix-spinner-circle-animation calc(var(--theme-animation-duration, 1000ms) * 1.0) linear infinite;
}
:host([kind="circle"]) .spinner-item:nth-of-type(2) {
  --mythix-spinner-item-size: calc(var(--mythix-spinner-size) * 0.7);
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  border-bottom: var(--mythix-spinner-circle-thickness) solid var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  animation: mythix-spinner-circle-animation calc(var(--theme-animation-duration, 1000ms) * 0.875) linear infinite;
}
:host([kind="circle"]) .spinner-item:nth-of-type(3) {
  --mythix-spinner-item-size: calc(var(--mythix-spinner-size) * 0.4);
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  border-top: var(--mythix-spinner-circle-thickness) solid var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  animation: mythix-spinner-circle-animation calc(var(--theme-animation-duration, 1000ms) * 0.75) linear infinite;
}
:host([kind="puzzle"]) {
  transform: translate(0, calc(var(--mythix-spinner-size) * 0.1)) rotate(45deg);
}
:host([kind="puzzle"]) .spinner-item {
  --mythix-spinner-item-size: calc(var(--mythix-spinner-size) / 2.5);
  position: absolute;
  width: var(--mythix-spinner-item-size);
  height: var(--mythix-spinner-item-size);
  border: calc(var(--mythix-spinner-size) * 0.1) solid var(--mythix-spinner-segment-color);
}
:host([kind="puzzle"]) .spinner-item:nth-child(1) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
  top: 0;
  left: 0;
  animation: mythix-spinner-puzzle-animation1 calc(var(--theme-animation-duration, 1000ms) * 5.0) linear infinite;
}
@keyframes mythix-spinner-puzzle-animation1 {
  0%, 8.33%, 16.66%, 100% {
    transform: translate(0%, 0%);
  }
  24.99%, 33.32%, 41.65% {
    transform: translate(100%, 0%);
  }
  49.98%, 58.31%, 66.64% {
    transform: translate(100%, 100%);
  }
  74.97%, 83.30%, 91.63% {
    transform: translate(0%, 100%);
  }
}
:host([kind="puzzle"]) .spinner-item:nth-child(2) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  top: 0;
  left: var(--mythix-spinner-item-size);
  animation: mythix-spinner-puzzle-animation2 calc(var(--theme-animation-duration, 1000ms) * 5.0) linear infinite;
}
@keyframes mythix-spinner-puzzle-animation2 {
  0%, 8.33%, 91.63%, 100% {
    transform: translate(0%, 0%);
  }
  16.66%, 24.99%, 33.32% {
    transform: translate(0%, 100%);
  }
  41.65%, 49.98%, 58.31% {
    transform: translate(-100%, 100%);
  }
  66.64%, 74.97%, 83.30% {
    transform: translate(-100%, 0%);
  }
}
:host([kind="puzzle"]) .spinner-item:nth-child(3) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  top: var(--mythix-spinner-item-size);
  left: var(--mythix-spinner-item-size);
  animation: mythix-spinner-puzzle-animation3 calc(var(--theme-animation-duration, 1000ms) * 5.0) linear infinite;
}
@keyframes mythix-spinner-puzzle-animation3 {
  0%, 83.30%, 91.63%, 100% {
    transform: translate(0, 0);
  }
  8.33%, 16.66%, 24.99% {
    transform: translate(-100%, 0);
  }
  33.32%, 41.65%, 49.98% {
    transform: translate(-100%, -100%);
  }
  58.31%, 66.64%, 74.97% {
    transform: translate(0, -100%);
  }
}
:host([kind="wave"]) .spinner-item {
  --mythix-spinner-item-size: calc(var(--mythix-spinner-size) / 4);
  min-width: var(--mythix-spinner-item-size);
  width: var(--mythix-spinner-item-size);
  height: var(--mythix-spinner-item-size);
  border-radius: 50%;
  border: none;
  overflow: hidden;
  background-color: var(--mythix-spinner-segment-color);
  animation: mythix-spinner-wave-animation calc(var(--theme-animation-duration, 1000ms) * 1.15) ease-in-out infinite;
}
@keyframes mythix-spinner-wave-animation {
  0%, 100% {
    transform: translateY(75%);
  }
  50% {
    transform: translateY(-75%);
  }
}
:host([kind="wave"]) .spinner-item:nth-child(1) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 6 * -1);
}
:host([kind="wave"]) .spinner-item:nth-child(2) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 6 * -2);
}
:host([kind="wave"]) .spinner-item:nth-child(3) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 6 * -3);
}
:host([kind="pipe"]) .spinner-item {
  width: 11%;
  height: 40%;
  background-color: var(--mythix-spinner-segment-color);
  animation: mythix-spinner-pipe-animation calc(var(--theme-animation-duration, 1000ms) * 1.15) ease-in-out infinite;
}
@keyframes mythix-spinner-pipe-animation {
  25% {
    transform: scaleY(2);
  }
  50% {
    transform: scaleY(1);
  }
}
:host([kind="pipe"]) .spinner-item:nth-child(1) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
}
:host([kind="pipe"]) .spinner-item:nth-child(2) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 10);
}
:host([kind="pipe"]) .spinner-item:nth-child(3) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color3, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 10 * 2);
}
:host([kind="pipe"]) .spinner-item:nth-child(4) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color4, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 10 * 3);
}
:host([kind="pipe"]) .spinner-item:nth-child(5) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color5, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 1.15) / 10 * 4);
}
:host([kind="dot"]) .spinner-item {
  position: absolute;
  top: calc(50% - var(--mythix-spinner-size) / 2);
  left: calc(50% - var(--mythix-spinner-size) / 2);
  width: var(--mythix-spinner-size);
  height: var(--mythix-spinner-size);
  background: var(--mythix-spinner-segment-color);
  border-radius: 50%;
  animation: mythix-spinner-dot-animation calc(var(--theme-animation-duration, 1000ms) * 3.0) ease-in-out infinite;
}
@keyframes mythix-spinner-dot-animation {
  0%, 100% {
    transform: scale(0.25);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0;
  }
}
:host([kind="dot"]) .spinner-item:nth-of-type(1) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color1, var(--theme-primary-color, #333));
}
:host([kind="dot"]) .spinner-item:nth-of-type(2) {
  --mythix-spinner-segment-color: var(--theme-mythix-spinner-color2, var(--theme-primary-color, #333));
  animation-delay: calc(calc(var(--theme-animation-duration, 1000ms) * 3.0) / -2);
}
`;

const KINDS = {
  'audio':  5,
  'circle': 3,
  'dot':    2,
  'pipe':   5,
  'puzzle': 3,
  'wave':   3,
};

class MythixUISpinner extends _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_0__.MythixUIComponent {
  static tagName = 'mythix-spinner';

  set attr$kind([ newValue ]) {
    this.handleKindAttributeChange(newValue);
  }

  mounted() {
    super.mounted();

    if (!this.documentInitialized) {
      // append template
      let ownerDocument = this.ownerDocument || document;
      this.$build(({ TEMPLATE }) => {
        return TEMPLATE
          .dataFor(this.sensitiveTagName)
          .prop$innerHTML(`<style>${STYLE_SHEET}</style>`);
      }).appendTo(ownerDocument.body);

      let template = this.template = this.getComponentTemplate();
      this.appendTemplateToShadowDOM(template);
    }

    let kind = this.getAttribute('kind');
    if (!kind) {
      kind = 'pipe';
      this.setAttribute('kind', kind);
    }

    this.handleKindAttributeChange(kind);
  }

  handleKindAttributeChange(_kind) {
    let kind        = ('' + _kind).toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(KINDS, kind)) {
      console.warn(`"mythix-spinner" unknown "kind" provided: "${kind}". Supported "kind" attribute values are: "pipe", "audio", "circle", "puzzle", "wave", and "dot".`);
      kind = 'pipe';
    }

    this.changeSpinnerChildren(KINDS[kind]);
  }

  buildSpinnerChildren(count) {
    let children      = new Array(count);
    let ownerDocument = (this.ownerDocument || document);

    for (let i = 0; i < count; i++) {
      let element = ownerDocument.createElement('div');
      element.setAttribute('class', 'spinner-item');

      children[i] = element;
    }

    return this.select(children);
  }

  changeSpinnerChildren(count) {
    this.select('.spinner-item').remove();
    this.buildSpinnerChildren(count).prependTo(this.shadow);

    // Always append style again, so
    // that it is the last child, and
    // doesn't mess with "nth-child"
    // selectors
    this.select('style').appendTo(this.shadow);
  }
}

MythixUISpinner.register();

(globalThis.mythixUI = (globalThis.mythixUI || {})).MythixUIRequire = MythixUISpinner;


/***/ }),

/***/ "./lib/query-engine.js":
/*!*****************************!*\
  !*** ./lib/query-engine.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryEngine: () => (/* binding */ QueryEngine)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./elements.js */ "./lib/elements.js");








const IS_INTEGER = /^\d+$/;

function isElement(value) {
  if (!value)
    return false;

  // We have an Element or a Document
  if (value.nodeType === Node.ELEMENT_NODE || value.nodeType === Node.DOCUMENT_NODE || value.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
    return true;

  return false;
}

function isSlotted(element) {
  if (!element)
    return null;

  return element.closest('slot');
}

function isNotSlotted(element) {
  if (!element)
    return null;

  return !element.closest('slot');
}

function collectClassNames(...args) {
  let classNames = [].concat(...args)
      .flat(Infinity)
      .map((part) => ('' + part).split(/\s+/))
      .flat(Infinity)
      .filter(Boolean);

  return classNames;
}

class QueryEngine {
  static [Symbol.hasInstance](instance) {
    try {
      return (instance && instance[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE);
    } catch (e) {
      return false;
    }
  }

  static isElement    = isElement;
  static isSlotted    = isSlotted;
  static isNotSlotted = isNotSlotted;

  static from = function(...args) {
    if (args.length === 0)
      return new QueryEngine([], { root: (isElement(this)) ? this : document, context: this });

    const getOptions = () => {
      let base = Object.create(null);
      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject(args[argIndex]))
        base = Object.assign(base, args[argIndex++]);

      if (args[argIndex] instanceof QueryEngine)
        base = Object.assign(Object.create(null), args[argIndex].getOptions() || {}, base);

      return base;
    };

    const getRootElement = (optionsRoot) => {
      if (isElement(optionsRoot))
        return optionsRoot;

      if (isElement(this))
        return this;

      return ((this && this.ownerDocument) || document);
    };

    let argIndex  = 0;
    let options   = getOptions();
    let root      = getRootElement(options.root);
    let queryEngine;

    options.root = root;
    options.context = options.context || this;

    if (args[argIndex] instanceof QueryEngine)
      return new QueryEngine(args[argIndex].slice(), options);

    if (Array.isArray(args[argIndex])) {
      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(args[argIndex + 1], '::Function'))
        options.callback = args[1];

      queryEngine = new QueryEngine(args[argIndex], options);
    } else if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(args[argIndex], '::String')) {
      options.selector = args[argIndex++];

      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(args[argIndex], '::Function'))
        options.callback = args[argIndex++];

      queryEngine = new QueryEngine(root.querySelectorAll(options.selector), options);
    } else if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(args[argIndex], '::Function')) {
      options.callback = args[argIndex++];

      let result = options.callback.call(this, _elements_js__WEBPACK_IMPORTED_MODULE_3__.ElementGenerator, options);
      if (!Array.isArray(result))
        result = [ result ];

      queryEngine = new QueryEngine(result, options);
    }

    if (options.invokeCallbacks !== false && typeof options.callback === 'function')
      return queryEngine.map(options.callback);

    return queryEngine;
  };

  getEngineClass() {
    return QueryEngine;
  }

  constructor(elements, _options) {
    let options = _options || {};

    Object.defineProperties(this, {
      [_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE]: {
        writable:     true,
        enumerable:   false,
        configurable: true,
        value:        _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE,
      },
      '_mythixUIOptions': {
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        options,
      },
    });

    Object.defineProperties(this, {
      '_mythixUIElements': {
        writable:     false,
        enumerable:   false,
        configurable: false,
        value:        this.filterAndConstructElements(options.context, elements),
      },
    });

    let rootProxy = new Proxy(this, {
      get: (target, propName) => {
        if (typeof propName === 'symbol') {
          if (propName in target)
            return target[propName];
          else if (propName in target._mythixUIElements)
            return target._mythixUIElements[propName];

          return;
        }

        if (propName === 'length')
          return target._mythixUIElements.length;

        if (propName === 'prototype')
          return target.prototype;

        if (propName === 'constructor')
          return target.constructor;

        // Index lookup
        if (IS_INTEGER.test(propName))
          return target._mythixUIElements[propName];

        if (propName in target)
          return target[propName];

        // Redirect any array methods:
        //
        // "magicPropName" is when the
        // function name begins with "$",
        // i.e. "$filter", or "$map". If
        // this is the case, then the return
        // value will always be coerced into
        // a QueryEngine. Otherwise, it will
        // only be coerced into a QueryEngine
        // if EVERY element in the result is
        // an "elementy" type value.
        let magicPropName = (propName.charAt(0) === '$') ? propName.substring(1) : propName;
        if (typeof Array.prototype[magicPropName] === 'function') {
          return (...args) => {
            let array   = target._mythixUIElements;
            let result  = array[magicPropName](...args);

            if (Array.isArray(result) && (magicPropName !== propName || result.every((item) => _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(item, _elements_js__WEBPACK_IMPORTED_MODULE_3__.ElementDefinition, Node, QueryEngine)))) {
              const EngineClass = target.getEngineClass();
              return new EngineClass(result, target.getOptions());
            }

            return result;
          };
        }

        return target[propName];
      },
    });

    return rootProxy;
  }

  getOptions() {
    return this._mythixUIOptions;
  }

  getContext() {
    let options = this.getOptions();
    return options.context;
  }

  getRoot() {
    let options = this.getOptions();
    return options.root || document;
  }

  getUnderlyingArray() {
    return this._mythixUIElements;
  }

  getOwnerDocument() {
    return this.getRoot().ownerDocument || document;
  }

  filterAndConstructElements(context, elements) {
    let finalElements = Array.from(elements).flat(Infinity).map((_item) => {
      if (!_item)
        return;

      let item = _item;
      if (item instanceof QueryEngine)
        return item.getUnderlyingArray();

      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(item, Node))
        return item;

      if (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.UNFINISHED_DEFINITION])
        item = item();

      if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(item, '::String'))
        item = _elements_js__WEBPACK_IMPORTED_MODULE_3__.Term(item);
      else if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(item, _elements_js__WEBPACK_IMPORTED_MODULE_3__.ElementDefinition))
        return;

      if (!context)
        throw new Error('The "context" option for QueryEngine is required when constructing elements.');

      return item.build(this.getOwnerDocument(), {
        scope: _utils_js__WEBPACK_IMPORTED_MODULE_2__.createScope(context),
      });
    }).flat(Infinity).filter(Boolean);

    return Array.from(new Set(finalElements));
  }

  select(...args) {
    let argIndex  = 0;
    let options   = Object.assign(Object.create(null), this.getOptions(), (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject(args[argIndex])) ? args[argIndex++] : {});

    if (options.context && typeof options.context.$ === 'function')
      return options.context.$.call(options.context, options, ...args.slice(argIndex));

    const EngineClass = this.getEngineClass();
    return EngineClass.from.call(options.context || this, options, ...args.slice(argIndex));
  }

  *entries() {
    let elements = this._mythixUIElements;

    for (let i = 0, il = elements.length; i < il; i++) {
      let element = elements[i];
      yield([i, element]);
    }
  }

  *keys() {
    for (let [ key, _ ] of this.entries())
      yield key;
  }

  *values() {
    for (let [ _, value ] of this.entries())
      yield value;
  }

  *[Symbol.iterator]() {
    return yield *this.values();
  }

  first(count) {
    if (count == null || count === 0 || Object.is(count, NaN) || !_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(count, '::Number'))
      return this.select([ this._mythixUIElements[0] ]);

    return this.select(this._mythixUIElements.slice(Math.abs(count)));
  }

  last(count) {
    if (count == null || count === 0 || Object.is(count, NaN) || !_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(count, '::Number'))
      return this.select([ this._mythixUIElements[this._mythixUIElements.length - 1] ]);

    return this.select(this._mythixUIElements.slice(Math.abs(count) * -1));
  }

  add(...elements) {
    const EngineClass = this.getEngineClass();
    return new EngineClass(this.slice().concat(...elements), this.getOptions());
  }

  subtract(...elements) {
    let set = new Set(elements);

    const EngineClass = this.getEngineClass();
    return new EngineClass(this.filter((item) => {
      return !set.has(item);
    }), this.getOptions());
  }

  on(eventName, callback, options) {
    for (let value of this.values()) {
      if (!isElement(value))
        continue;

      value.addEventListener(eventName, callback, options);
    }

    return this;
  }

  off(eventName, callback, options) {
    for (let value of this.values()) {
      if (!isElement(value))
        continue;

      value.removeEventListener(eventName, callback, options);
    }

    return this;
  }

  appendTo(selectorOrElement) {
    if (!this._mythixUIElements.length)
      return this;

    let element = selectorOrElement;
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(selectorOrElement, '::String'))
      element = this.getRoot().querySelector(selectorOrElement);

    for (let child of this._mythixUIElements)
      element.appendChild(child);
  }

  prependTo(selectorOrElement) {
    if (!this._mythixUIElements.length)
      return this;

    let element = selectorOrElement;
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(selectorOrElement, '::String'))
      element = this.getRoot().querySelector(selectorOrElement);

    let firstChild = element.childNodes[0] || null;
    for (let child of this._mythixUIElements)
      element.insertBefore(child, firstChild);
  }

  insertInto(selectorOrElement, referenceNode) {
    if (!this._mythixUIElements.length)
      return this;

    let element = selectorOrElement;
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(selectorOrElement, '::String'))
      element = this.getRoot().querySelector(selectorOrElement);

    let ownerDocument = this.getOwnerDocument();
    let source        = this;

    if (this._mythixUIElements.length > 1) {
      let fragment = ownerDocument.createDocumentFragment();
      for (let child of this._mythixUIElements)
        fragment.appendChild(child);

      source = [ fragment ];
    }

    element.insert(source[0], referenceNode);

    return this;
  }

  replaceChildrenOf(selectorOrElement) {
    let element = selectorOrElement;
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(selectorOrElement, '::String'))
      element = this.getRoot().querySelector(selectorOrElement);

    while (element.childNodes.length)
      element.removeChild(element.childNodes[0]);

    return this.appendTo(element);
  }

  remove() {
    for (let node of this._mythixUIElements) {
      if (node && node.parentNode)
        node.parentNode.removeChild(node);
    }

    return this;
  }

  classList(operation, ...args) {
    let classNames = collectClassNames(args);
    for (let node of this._mythixUIElements) {
      if (node && node.classList) {
        if (operation === 'toggle')
          classNames.forEach((className) => node.classList.toggle(className));
        else
          node.classList[operation](...classNames);
      }
    }

    return this;
  }

  addClass(...classNames) {
    return this.classList('add', ...classNames);
  }

  removeClass(...classNames) {
    return this.classList('remove', ...classNames);
  }

  toggleClass(...classNames) {
    return this.classList('toggle', ...classNames);
  }

  slotted(yesNo) {
    return this.filter((arguments.length === 0 || yesNo) ? isSlotted : isNotSlotted);
  }

  slot(slotName) {
    return this.filter((element) => {
      if (element && element.slot === slotName)
        return true;

      if (element.closest(`slot[name="${slotName.replace(/"/g, '\\"')}"]`))
        return true;

      return false;
    });
  }
}

(globalThis.mythixUI = (globalThis.mythixUI || {})).QueryEngine = QueryEngine;


/***/ }),

/***/ "./lib/sha256.js":
/*!***********************!*\
  !*** ./lib/sha256.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SHA256: () => (/* binding */ SHA256)
/* harmony export */ });
/* eslint-disable no-magic-numbers */

/*
Many thanks to Geraint Luff for the following

https://github.com/geraintluff/sha256/
*/

/**
 * type: Function
 * name: SHA256
 * groupName: BaseUtils
 * desc: |
 *   SHA256 hashing function
 * arguments:
 *   - name: input
 *     dataType: string
 *     desc: Input string
 * return: |
 *   @types string; The SHA256 hash of the provided `input`.
 * notes:
 *   - |
 *     :warning: This is a custom baked SHA256 hashing function, minimized for size.
 *     It may be incomplete, and it is strongly recommended that you **DO NOT** use this
 *     for anything related to security.
 *   - |
 *     :warning: Read all the notes, and use this method with caution.
 *   - |
 *     :info: This method has been modified slightly from the original to *not* bail when
 *     unicode characters are detected. There is a decent chance that--given certain
 *     input--this method will return an invalid SHA256 hash."
 *   - |
 *     :info: Mythix UI uses this method simply to generate consistent IDs.
 *   - |
 *     :heart: Many thanks to the author [Geraint Luff](https://github.com/geraintluff/sha256/)
 *     for this method!
 */
function SHA256(_input) {
  let input = _input;

  let mathPow = Math.pow;
  let maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i; let j; // Used as a counter across the whole file
  let result = '';

  let words = [];
  let asciiBitLength = input[lengthProperty] * 8;

  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  let hash = SHA256.h = SHA256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  let k = SHA256.k = SHA256.k || [];
  let primeCounter = k[lengthProperty];
  /*/
    let hash = [], k = [];
    let primeCounter = 0;
    //*/

  let isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate)
        isComposite[i] = candidate;

      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  input += '\x80'; // Append Ƈ' bit (plus zero padding)
  while (input[lengthProperty] % 64 - 56)
    input += '\x00'; // More zero padding

  for (i = 0; i < input[lengthProperty]; i++) {
    j = input.charCodeAt(i);
    if (j >> 8)
      return; // ASCII check: only accept characters in range 0-255
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }

  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength);

  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
    let w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
    let oldHash = hash;

    // This is now the undefinedworking hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8);

    for (i = 0; i < 64; i++) {
      // Expand the message into 64 words
      // Used below if
      let w15 = w[i - 15]; let w2 = w[i - 2];

      // Iterate
      let a = hash[0]; let e = hash[4];
      let temp1 = hash[7]
                + (((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))) // S1
                + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                  w[i - 16]
                        + (((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3)) // s0
                        + w[i - 7]
                        + (((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10)) // s1
                ) | 0
                );
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      let temp2 = (((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))) // S0
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

      hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0;
    }

    for (i = 0; i < 8; i++)
      hash[i] = (hash[i] + oldHash[i]) | 0;
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      let b = (hash[i] >> (j * 8)) & 255;
      result += ((b < 16) ? 0 : '') + b.toString(16);
    }
  }

  return result;
}


/***/ }),

/***/ "./lib/stylesheet-manager.js":
/*!***********************************!*\
  !*** ./lib/stylesheet-manager.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StyleSheetManager: () => (/* binding */ StyleSheetManager),
/* harmony export */   adopt: () => (/* binding */ adopt),
/* harmony export */   adoptFromText: () => (/* binding */ adoptFromText),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   createFromText: () => (/* binding */ createFromText),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   getRegisteredNames: () => (/* binding */ getRegisteredNames),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   isSupported: () => (/* binding */ isSupported),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   unregister: () => (/* binding */ unregister)
/* harmony export */ });


/**
 * type: Namespace
 * name: StyleSheetManager
 * groupName: StyleSheetManager
 * desc: |
 *   `import { StyleSheetManager } from 'mythix-ui-core@1.0';`
 *
 *   Utility for managing Constructable Stylesheets across components.
 *   Provides efficient style sharing through the `adoptedStyleSheets` API,
 *   with automatic fallback for older browsers.
 *
 *   Browser Support (Baseline since March 2023):
 *   - Chrome 73+, Firefox 101+, Safari 16.4+, Edge 79+
 *
 * examples:
 *   - |
 *     ```javascript
 *     import { StyleSheetManager } from 'mythix-ui-core';
 *
 *     // Register a shared stylesheet
 *     StyleSheetManager.register('theme', `
 *       :host {
 *         --primary-color: blue;
 *         --secondary-color: green;
 *       }
 *     `);
 *
 *     // Adopt in a shadow root
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme']);
 *     ```
 *   - |
 *     ```javascript
 *     // In a component
 *     class MyComponent extends MythixUIComponent {
 *       static sharedStyles = ['theme', 'typography'];
 *
 *       createShadowDOM() {
 *         let shadow = super.createShadowDOM();
 *         // sharedStyles are automatically adopted
 *         return shadow;
 *       }
 *     }
 *     ```
 */

// Cache for constructed stylesheets by name
const STYLESHEET_CACHE = new Map();

// Cache for stylesheets by content hash (for deduplication)
const CONTENT_HASH_CACHE = new Map();

// Check if Constructable Stylesheets are supported
const supportsConstructableStylesheets = (() => {
  try {
    new CSSStyleSheet();
    return true;
  } catch (error) {
    return false;
  }
})();

/**
 * Simple hash function for stylesheet content deduplication.
 */
const hashContent = (content) => {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    let char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
};

/**
 * type: Function
 * name: isSupported
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Check if Constructable Stylesheets are supported in the current browser.
 * return: |
 *   @types boolean; True if supported.
 */

/**
 * Check if Constructable Stylesheets are supported in the current browser.
 * @returns {boolean} True if Constructable Stylesheets are supported.
 */
const isSupported = () => supportsConstructableStylesheets;

/**
 * type: Function
 * name: register
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Register a stylesheet by name for later adoption.
 *   If the same content has already been registered under a different name,
 *   the same CSSStyleSheet instance will be reused.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The unique name for this stylesheet.
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content of the stylesheet.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: |
 *       Options for registration.
 *       - `replace`: If true, replaces existing registration (default: false).
 * return: |
 *   @types CSSStyleSheet | null; The constructed stylesheet, or null if not supported.
 *
 * examples:
 *   - |
 *     ```javascript
 *     StyleSheetManager.register('theme', `
 *       :host {
 *         --primary-color: #007bff;
 *       }
 *     `);
 *     ```
 */

/**
 * Register a stylesheet by name for later adoption.
 * @param {string} name - The unique name for this stylesheet.
 * @param {string} cssText - The CSS content of the stylesheet.
 * @param {Object} [options={}] - Options for registration.
 * @param {boolean} [options.replace=false] - If true, replaces existing registration.
 * @returns {CSSStyleSheet|null} The constructed stylesheet, or null if not supported.
 */
const register = (name, cssText, options = {}) => {
  if (!supportsConstructableStylesheets)
    return null;

  // Check if already registered (and not replacing)
  if (STYLESHEET_CACHE.has(name) && !options.replace)
    return STYLESHEET_CACHE.get(name);

  // Check for content deduplication
  let contentHash = hashContent(cssText);
  let existingSheet = CONTENT_HASH_CACHE.get(contentHash);

  if (existingSheet) {
    STYLESHEET_CACHE.set(name, existingSheet);
    return existingSheet;
  }

  // Create new stylesheet
  let sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);

  STYLESHEET_CACHE.set(name, sheet);
  CONTENT_HASH_CACHE.set(contentHash, sheet);

  return sheet;
};

/**
 * type: Function
 * name: get
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Get a registered stylesheet by name.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types CSSStyleSheet | undefined; The stylesheet, or undefined if not found.
 */

/**
 * Get a registered stylesheet by name.
 * @param {string} name - The name of the stylesheet.
 * @returns {CSSStyleSheet|undefined} The stylesheet, or undefined if not found.
 */
const get = (name) => {
  return STYLESHEET_CACHE.get(name);
};

/**
 * type: Function
 * name: has
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Check if a stylesheet is registered.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types boolean; True if the stylesheet is registered.
 */

/**
 * Check if a stylesheet is registered.
 * @param {string} name - The name of the stylesheet.
 * @returns {boolean} True if the stylesheet is registered.
 */
const has = (name) => {
  return STYLESHEET_CACHE.has(name);
};

/**
 * type: Function
 * name: unregister
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Unregister a stylesheet by name.
 *   Note: This does not remove the stylesheet from shadow roots that have already adopted it.
 * arguments:
 *   - name: name
 *     dataType: string
 *     desc: The name of the stylesheet.
 * return: |
 *   @types boolean; True if the stylesheet was unregistered.
 */

/**
 * Unregister a stylesheet by name.
 * Note: This does not remove the stylesheet from shadow roots that have already adopted it.
 * @param {string} name - The name of the stylesheet.
 * @returns {boolean} True if the stylesheet was unregistered.
 */
const unregister = (name) => {
  return STYLESHEET_CACHE.delete(name);
};

/**
 * type: Function
 * name: adopt
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Adopt one or more registered stylesheets into a shadow root or document.
 *   Uses the `adoptedStyleSheets` API when available, with fallback to `<style>` injection.
 * arguments:
 *   - name: target
 *     dataType: ShadowRoot | Document
 *     desc: The target to adopt stylesheets into.
 *   - name: names
 *     dataType: Array<string>
 *     desc: Array of stylesheet names to adopt.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: |
 *       Options for adoption.
 *       - `prepend`: If true, stylesheets are added before existing ones (default: false).
 *       - `fallbackStyles`: Object mapping names to CSS text for fallback injection.
 * return: |
 *   @types boolean; True if stylesheets were adopted via adoptedStyleSheets, false if fallback was used.
 *
 * examples:
 *   - |
 *     ```javascript
 *     // Adopt registered stylesheets
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme', 'typography']);
 *
 *     // With fallback for older browsers
 *     StyleSheetManager.adopt(this.shadowRoot, ['theme'], {
 *       fallbackStyles: {
 *         'theme': ':host { --primary-color: blue; }'
 *       }
 *     });
 *     ```
 */

/**
 * Adopt one or more registered stylesheets into a shadow root or document.
 * @param {ShadowRoot|Document} target - The target to adopt stylesheets into.
 * @param {string[]} names - Array of stylesheet names to adopt.
 * @param {Object} [options={}] - Options for adoption.
 * @param {boolean} [options.prepend=false] - If true, stylesheets are added before existing ones.
 * @param {Object<string, string>} [options.fallbackStyles] - Object mapping names to CSS text for fallback injection.
 * @returns {boolean} True if stylesheets were adopted via adoptedStyleSheets, false if fallback was used.
 */
const adopt = (target, names, options = {}) => {
  if (!target)
    return false;

  let sheets = names.map((name) => STYLESHEET_CACHE.get(name)).filter(Boolean);

  // Use adoptedStyleSheets if available and all sheets exist
  if (supportsConstructableStylesheets && target.adoptedStyleSheets !== undefined && sheets.length === names.length) {
    let existingSheets = Array.from(target.adoptedStyleSheets);

    // Filter out sheets that are already adopted
    let newSheets = sheets.filter((sheet) => !existingSheets.includes(sheet));

    if (newSheets.length > 0) {
      if (options.prepend)
        target.adoptedStyleSheets = [ ...newSheets, ...existingSheets ];
      else
        target.adoptedStyleSheets = [ ...existingSheets, ...newSheets ];
    }

    return true;
  }

  // Fallback: inject <style> elements
  if (options.fallbackStyles) {
    for (let name of names) {
      let cssText = options.fallbackStyles[name];

      if (!cssText)
        continue;

      // Check if already injected
      let existingStyle = target.querySelector(`style[data-stylesheet-name="${name}"]`);
      if (existingStyle)
        continue;

      let styleElement = (target.ownerDocument || document).createElement('style');
      styleElement.setAttribute('data-stylesheet-name', name);
      styleElement.textContent = cssText;

      if (options.prepend && target.firstChild)
        target.insertBefore(styleElement, target.firstChild);
      else if (target.appendChild)
        target.appendChild(styleElement);
      else if (target.head)
        target.head.appendChild(styleElement);
    }
  }

  return false;
};

/**
 * type: Function
 * name: createFromText
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Create a CSSStyleSheet from CSS text without registering it.
 *   Useful for component-specific styles that don't need to be shared.
 * arguments:
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content.
 * return: |
 *   @types CSSStyleSheet | null; The constructed stylesheet, or null if not supported.
 */

/**
 * Create a CSSStyleSheet from CSS text without registering it.
 * @param {string} cssText - The CSS content.
 * @returns {CSSStyleSheet|null} The constructed stylesheet, or null if not supported.
 */
const createFromText = (cssText) => {
  if (!supportsConstructableStylesheets)
    return null;

  let sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  return sheet;
};

/**
 * type: Function
 * name: adoptFromText
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Create and immediately adopt a stylesheet from CSS text.
 *   Useful for one-off component styles.
 * arguments:
 *   - name: target
 *     dataType: ShadowRoot | Document
 *     desc: The target to adopt into.
 *   - name: cssText
 *     dataType: string
 *     desc: The CSS content.
 *   - name: options
 *     dataType: object
 *     optional: true
 *     desc: Options for adoption (see `adopt`).
 * return: |
 *   @types CSSStyleSheet | HTMLStyleElement | null; The stylesheet or style element, or null on failure.
 */

/**
 * Create and immediately adopt a stylesheet from CSS text.
 * @param {ShadowRoot|Document} target - The target to adopt into.
 * @param {string} cssText - The CSS content.
 * @param {Object} [options={}] - Options for adoption (see adopt).
 * @param {boolean} [options.prepend=false] - If true, stylesheets are added before existing ones.
 * @returns {CSSStyleSheet|HTMLStyleElement|null} The stylesheet or style element, or null on failure.
 */
const adoptFromText = (target, cssText, options = {}) => {
  if (!target)
    return null;

  if (supportsConstructableStylesheets && target.adoptedStyleSheets !== undefined) {
    let sheet = createFromText(cssText);

    if (sheet) {
      let existingSheets = Array.from(target.adoptedStyleSheets);

      if (options.prepend)
        target.adoptedStyleSheets = [ sheet, ...existingSheets ];
      else
        target.adoptedStyleSheets = [ ...existingSheets, sheet ];

      return sheet;
    }
  }

  // Fallback to <style> element
  let styleElement = (target.ownerDocument || document).createElement('style');
  styleElement.textContent = cssText;

  if (options.prepend && target.firstChild)
    target.insertBefore(styleElement, target.firstChild);
  else if (target.appendChild)
    target.appendChild(styleElement);
  else if (target.head)
    target.head.appendChild(styleElement);

  return styleElement;
};

/**
 * type: Function
 * name: clear
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Clear all registered stylesheets.
 *   Primarily useful for testing.
 */

/**
 * Clear all registered stylesheets. Primarily useful for testing.
 * @returns {void}
 */
const clear = () => {
  STYLESHEET_CACHE.clear();
  CONTENT_HASH_CACHE.clear();
};

/**
 * type: Function
 * name: getRegisteredNames
 * groupName: StyleSheetManager
 * parent: StyleSheetManager
 * desc: |
 *   Get the names of all registered stylesheets.
 * return: |
 *   @types Array<string>; Array of registered stylesheet names.
 */

/**
 * Get the names of all registered stylesheets.
 * @returns {string[]} Array of registered stylesheet names.
 */
const getRegisteredNames = () => {
  return Array.from(STYLESHEET_CACHE.keys());
};

// Export as namespace-like object as well
const StyleSheetManager = {
  isSupported,
  register,
  get,
  has,
  unregister,
  adopt,
  createFromText,
  adoptFromText,
  clear,
  getRegisteredNames,
};


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bindAllDataEventAttributes: () => (/* binding */ bindAllDataEventAttributes),
/* harmony export */   bindDataEventAttribute: () => (/* binding */ bindDataEventAttribute),
/* harmony export */   bindEventToElement: () => (/* binding */ bindEventToElement),
/* harmony export */   bindMethods: () => (/* binding */ bindMethods),
/* harmony export */   compileTemplateFromParts: () => (/* binding */ compileTemplateFromParts),
/* harmony export */   createScanningProxy: () => (/* binding */ createScanningProxy),
/* harmony export */   createScope: () => (/* binding */ createScope),
/* harmony export */   createTemplateMacro: () => (/* binding */ createTemplateMacro),
/* harmony export */   defineDynamicProp: () => (/* binding */ defineDynamicProp),
/* harmony export */   dynamicPropID: () => (/* binding */ dynamicPropID),
/* harmony export */   fetchPath: () => (/* binding */ fetchPath),
/* harmony export */   formatNodeValue: () => (/* binding */ formatNodeValue),
/* harmony export */   getAllEventNamesForElement: () => (/* binding */ getAllEventNamesForElement),
/* harmony export */   getAllPropertyNames: () => (/* binding */ getAllPropertyNames),
/* harmony export */   getDescriptorFromPrototypeChain: () => (/* binding */ getDescriptorFromPrototypeChain),
/* harmony export */   getDisableTemplateEngineSelector: () => (/* binding */ getDisableTemplateEngineSelector),
/* harmony export */   getDynamicPropertyForPath: () => (/* binding */ getDynamicPropertyForPath),
/* harmony export */   getParentNode: () => (/* binding */ getParentNode),
/* harmony export */   globalStore: () => (/* binding */ globalStore),
/* harmony export */   globalStoreDynamic: () => (/* binding */ globalStoreDynamic),
/* harmony export */   globalStoreNameValuePairHelper: () => (/* binding */ globalStoreNameValuePairHelper),
/* harmony export */   isTemplate: () => (/* binding */ isTemplate),
/* harmony export */   metadata: () => (/* binding */ metadata),
/* harmony export */   mythixEventWrapper: () => (/* binding */ mythixEventWrapper),
/* harmony export */   parseTemplateParts: () => (/* binding */ parseTemplateParts),
/* harmony export */   registerDisableTemplateEngineSelector: () => (/* binding */ registerDisableTemplateEngineSelector),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   specialClosest: () => (/* binding */ specialClosest),
/* harmony export */   storage: () => (/* binding */ storage),
/* harmony export */   unregisterDisableTemplateEngineSelector: () => (/* binding */ unregisterDisableTemplateEngineSelector)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-property.js */ "./lib/dynamic-property.js");






/**
 * type: Namespace
 * name: Utils
 * groupName: Utils
 * desc: |
 *   `import { Utils } from 'mythix-ui-core@1.0';`
 *
 *   Misc utility functions are found within this namespace.
 */

function bindMethods(_proto, skipProtos) {
  let proto           = _proto;
  let alreadyVisited  = new Set();

  while (proto) {
    if (proto === Object.prototype)
      return;

    let descriptors = Object.getOwnPropertyDescriptors(proto);
    let keys        = Object.keys(descriptors).concat(Object.getOwnPropertySymbols(descriptors));

    for (let i = 0, il = keys.length; i < il; i++) {
      let key = keys[i];
      if (key === 'constructor' || key === 'prototype')
        continue;

      if (alreadyVisited.has(key))
        continue;

      alreadyVisited.add(key);

      let descriptor = descriptors[key];

      // Can it be changed?
      if (descriptor.configurable === false)
        continue;

      // If is getter, then skip
      if (Object.prototype.hasOwnProperty.call(descriptor, 'get') || Object.prototype.hasOwnProperty.call(descriptor, 'set')) {
        let newDescriptor = { ...descriptor };
        if (newDescriptor.get)
          newDescriptor.get = newDescriptor.get.bind(this);

        if (newDescriptor.set)
          newDescriptor.set = newDescriptor.set.bind(this);

        Object.defineProperty(this, key, newDescriptor);
        continue;
      }

      let value = descriptor.value;

      // Skip prototype of Object
      // eslint-disable-next-line no-prototype-builtins
      if (Object.prototype.hasOwnProperty(key) && Object.prototype[key] === value)
        continue;

      if (typeof value !== 'function')
        continue;

      Object.defineProperty(this, key, { ...descriptor, value: value.bind(this) });
    }

    proto = Object.getPrototypeOf(proto);
    if (proto === Object.prototype)
      break;

    if (skipProtos && skipProtos.indexOf(proto) >= 0)
      break;
  }
}

function getDescriptorFromPrototypeChain(startProto, descriptorName) {
  let thisProto = startProto;
  let descriptor;

  while (thisProto && !(descriptor = Object.getOwnPropertyDescriptor(thisProto, descriptorName)))
    thisProto = Object.getPrototypeOf(thisProto);

  return { prototype: thisProto, descriptor };
}

const METADATA_STORAGE = Symbol.for('@mythix/mythix-ui/component/constants/metadata-storage');
const METADATA_WEAKMAP = globalThis.mythixUI[METADATA_STORAGE] = (globalThis.mythixUI[METADATA_STORAGE]) ? globalThis.mythixUI[METADATA_STORAGE] : new WeakMap();

/**
 * groupName: Utils
 * desc: |
 *   Store and retrieve metadata on any garbage-collectable reference.
 *
 *   This function uses an internal WeakMap to store metadata for any garbage-collectable value.
 *
 *   The number of arguments provided will change the behavior of this function:
 *   1. If only one argument is supplied (a `target`), then a Map of metadata key/value pairs is returned.
 *   2. If only two arguments are supplied, then `metadata` acts as a getter, and the value stored under the specified `key` is returned.
 *   3. If more than two arguments are supplied, then `metadata` acts as a setter, and `target` is returned (for continued chaining).
 * arguments:
 *   - name: target
 *     dataType: any
 *     desc: |
 *       This is the value for which metadata is being stored or retrieved.
 *       This can be any garbage-collectable value (any value that can be used as a key in a WeakMap).
 *   - name: key
 *     dataType: any
 *     optional: true
 *     desc: |
 *       The key used to store or fetch the specified metadata value. This can be any value, as the underlying
 *       storage is a Map.
 *   - name: value
 *     dataType: any
 *     optional: true
 *     desc: |
 *       The value to store on the `target` under the specified `key`.
 * return: |
 *   @types any;
 *   1. If only one argument is provided (a bulk get operation), return a Map containing the metadata for the specified `target`.
 *   2. If two arguments are provided (a get operation), the `target` metadata value stored for the specified `key`.
 *   2. If more than two arguments are provided (a set operation), the provided `target` is returned.
 * examples:
 *   - |
 *     ```javascript
 *     import { Utils } from 'mythix-ui-core@1.0';
 *
 *     // set
 *     Utils.metadata(myElement, 'customCaption', 'Metadata Caption!');
 *
 *     // get
 *     console.log(Utils.metadata(myElement, 'customCaption'));
 *     // output -> 'Metadata Caption!'
 *
 *     // get all
 *     console.log(Utils.metadata(myElement));
 *     // output -> Map(1) { 'customCaption' => 'Metadata Caption!' }
 *     ```
 */
function metadata(target, key, value) {
  let data = METADATA_WEAKMAP.get(target);
  if (!data) {
    if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isCollectable(target))
      throw new Error(`Unable to set metadata on provided object: ${(typeof target === 'symbol') ? target.toString() : target}`);

    data = new Map();
    METADATA_WEAKMAP.set(target, data);
  }

  if (arguments.length === 1)
    return data;

  if (arguments.length === 2)
    return (data) ? data.get(key) : undefined;

  data.set(key, value);

  return target;
}

const VALID_JS_IDENTIFIER = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
const RESERVED_IDENTIFIER = /^(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|false|finally|for|function|if|import|in|instanceof|new|null|return|super|switch|this|throw|true|try|typeof|var|void|while|with|let|static|yield)$/;

function getContextCallArgs(context, ...extraContexts) {
  let contextCallArgs = Array.from(
    new Set(getAllPropertyNames(context).concat(
      Object.keys(globalThis.mythixUI.globalScope || {}),
      [ 'attributes', 'classList', '$$', 'i18n' ],
      ...extraContexts.map((extraContext) => Object.keys(extraContext || {})),
    )),
  ).filter((name) => {
    if (RESERVED_IDENTIFIER.test(name))
      return false;

    return VALID_JS_IDENTIFIER.test(name);
  });

  return `{${contextCallArgs.join(',')}}`;
}

/**
 * groupName: Utils
 * desc: |
 *   Get the parent Node of `element`.
 * arguments:
 *   - name: element
 *     dataType: Node
 *     desc: |
 *       The Node whose parent you wish to find.
 * notes:
 *   - |
 *     :warning: Unlike [Node.parentNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode), this
 *     will also search across Shadow DOM boundaries.
 *   - |
 *     :warning: **Searching across Shadow DOM boundaries only works for Mythix UI components!**
 *   - |
 *     :info: Searching across Shadow DOM boundaries is accomplished via leveraging @see MythixUIComponent.metadata; on
 *     `element`. When a `null` parent is encountered, `getParentNode` will look for @see MythixUIComponent.metadata?caption=metadata; key @see Constants.MYTHIX_SHADOW_PARENT;
 *     on `element`. If found, the result is considered the [parent Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode) of `element`.
 * return: |
 *   @types Node; The parent node, if there is any, or `null` otherwise.
 */
function getParentNode(element) {
  if (!element)
    return null;

  if (element.parentNode && element.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
    return metadata(element.parentNode, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_SHADOW_PARENT) || null;

  if (!element.parentNode && element.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
    return metadata(element, _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_SHADOW_PARENT) || null;

  return element.parentNode;
}

/**
 * groupName: Utils
 * desc: |
 *   Create a Proxy that is essentially (functionally) a multi-prototype `object` instance.
 *
 *   A "scope" in Mythix UI might be better called a "context"... however, "scope"
 *   was chosen because it *is* a scope... or might be better described as "multiple scopes in one".
 *   This is specifically a "DOM scope", in that this method is "DOM aware" and will traverse the
 *   DOM looking for the requested data (if any of the specified `targets` is an Element that is).
 *
 *   The way this works is that the caller will provide at least one "target". These targets are
 *   themselves scopes, elements, or other data objects. When the returned Proxy instance is accessed,
 *   the requested key is searched in all provided `targets`, in the order they were provided.
 *
 *   Aside from searching all targets for the desired key, it will also fallback to other data sources
 *   it searches in as well:
 *   1. If any given `target` it is searching is an Element, then it will also search
 *      for the requested key on the element itself.
 *   2. If step #1 has failed, then move to the parent node of the current Element instance, and
 *      repeat the process, starting from step #1.
 *   3. After steps 1-2 are repeated for every given `target` (and all parent nodes of those `targets`... if any),
 *      then this method will finally fallback to searching `globalThis.mythixUI.globalScope` for the requested key.
 *
 *   We aren't quite finished yet though...
 *
 *   If steps 1-3 above all fail, then this method will still fallback to the fallowing hard-coded key/value pairs:
 *   1. A requested key of `'globalScope'` (if not found on a target) will result in `globalThis.mythixUI.globalScope` being returned.
 *   2. A requested key of `'i18n'` (if not found on a target) will result in the built-in `i18n` language term processor being returned.
 *   3. A requested key of `'dynamicPropID'` (if not found on a target) will result in the built-in `dynamicPropID` dynamic property provided. See @see Utils.dynamicPropID;.
 *
 *   Finally, the returned Proxy will also intercept any value [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set) operation,
 *   to set a value on the first target found.
 *
 *   The Proxy also overloads [ownKeys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys) to list **all** keys across **all** `targets`.
 * arguments:
 *   - name: ...targets
 *     dataTypes:
 *       - Object
 *       - Element
 *       - non-primitive
 *     desc: |
 *       The `targets` to be searched, in the order provided. Targets are searched both for get operations, and set operations (the first target found will be the set target).
 * notes:
 *   - |
 *     :warning: Mythix UI will deliberately never directly access `globalThis` from the template engine (for security reasons).
 *     Because of this, Mythix UI automatically provides its own global scope `globalThis.mythixUI.globalScope`.
 *     If you want data to be "globally" visible to Mythix UI, then you need to add your data to this special global scope.
 *   - |
 *     :info: This method is complex because it is intended to be used to provide a "scope" to the Mythix UI templating engine.
 *     The templating engine needs to be DOM aware, and also needs to have access to specialized, scoped data
 *     (i.e. the `mythix-ui-for-each` component will publish scoped data for each iteration, which needs to be both
 *     DOM-aware, and iteration-aware).
 *   - |
 *     :info: Any provided `target` can also be one of these Proxy scopes returned by this method.
 *   - |
 *     :info: It can help to think of the returned "scope" as an plain Object that has an array of prototypes.
 * return: |
 *   @types Proxy; A proxy instance, that is used to get and set keys across multiple `targets`.
 */
function createScope(..._targets) {
  const findPropNameScope = (target, propName) => {
    if (target == null || Object.is(target, NaN))
      return;

    if (propName in target)
      return target;

    if (!(target instanceof Node))
      return;

    const searchParentNodesForKey = (element) => {
      let currentElement = element;
      if (!currentElement)
        return;

      do {
        if (propName in currentElement)
          return currentElement;

        currentElement = getParentNode(currentElement);
      } while (currentElement);
    };

    return searchParentNodesForKey(target);
  };

  let targets         = _targets.filter(Boolean);
  let firstElement    = targets.find((target) => (target instanceof Node)) || targets[0];
  let baseContext     = {};
  let fallbackContext = {
    globalScope:  (globalThis.mythixUI && globalThis.mythixUI.globalScope),
    i18n:         (path, defaultValue) => {
      let languageProvider = specialClosest(firstElement, 'mythix-language-provider');
      if (!languageProvider)
        return defaultValue;

      return languageProvider.i18n(path, defaultValue);
    },
    dynamicPropID,
  };

  targets = targets.concat(fallbackContext);
  let proxy   = new Proxy(baseContext, {
    ownKeys: () => {
      let allKeys = [];

      for (let target of targets)
        allKeys = allKeys.concat(getAllPropertyNames(target));

      let globalScope = (globalThis.mythixUI && globalThis.mythixUI.globalScope);
      if (globalScope)
        allKeys = allKeys.concat(Object.keys(globalScope));

      return Array.from(new Set(allKeys));
    },
    has: (_, propName) => {
      for (let target of targets) {
        let scope = findPropNameScope(target, propName);
        if (!scope)
          continue;

        return true;
      }

      let globalScope = (globalThis.mythixUI && globalThis.mythixUI.globalScope);
      if (!globalScope)
        return false;

      return (propName in globalScope);
    },
    get: (_, propName) => {
      for (let target of targets) {
        let scope = findPropNameScope(target, propName);
        if (!scope)
          continue;

        return scope[propName];
      }

      let globalScope = (globalThis.mythixUI && globalThis.mythixUI.globalScope);
      if (!globalScope)
        return;

      return globalScope[propName];
    },
    set: (_, propName, value) => {
      const doSet = (scope, propName, value) => {
        if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(scope[propName], _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty))
          scope[propName][_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](value);
        else
          scope[propName] = value;

        return true;
      };

      for (let target of targets) {
        let scope = findPropNameScope(target, propName);
        if (!scope)
          continue;

        return doSet(scope, propName, value);
      }

      let globalScope = (globalThis.mythixUI && globalThis.mythixUI.globalScope);
      if (!globalScope)
        return false;

      return doSet(globalScope, propName, value);
    },
  });

  fallbackContext.$$ = proxy;

  return proxy;
}

const EVENT_ACTION_JUST_NAME = /^%?[\w.$]+$/;

/**
 * groupName: Utils
 * desc: |
 *   **Note:** For event bindings, prefer using the `data-event-on{eventName}` pattern (e.g., `data-event-onclick`)
 *   with `mythixEventWrapper` instead. This legacy function is maintained for backward compatibility.
 *
 *   Create a context-aware function, or "macro", that can be called and used by the template engine.
 *
 *   If you are ever trying to pass methods or dynamic properties across the DOM, then this is the method you want to use, to
 *   properly "parse" and use the attribute value as intended.
 *
 *   This is used for example for event bindings via legacy `on{eventName}` attributes. If you have for example an `onclick="doSomething"`
 *   attribute on an element, then this will be used to create a context-aware "macro" for the method "doSomething".
 *
 *   The term "macro" is used here because there are special formats "understood" by the template engine. For example,
 *   prefixing an attribute value with a percent sign, i.e. `name="%globalDynamicPropName"` will use @see Utils.dynamicPropID;
 *   to globally fetch property of this name. This is important, because due to the async nature of the DOM, you might
 *   be requesting a dynamic property that hasn't yet been loaded/defined. This is the purpose of @see Utils.dynamicPropID;,
 *   and this specialized template format: to provide dynamic props by id, that will be available when needed.
 *
 *   The template engine also will happily accept rogue method names. For example, in a Mythix UI component you are building,
 *   you might have an element like `<button data-event-onclick="onButtonClick">Click Me!<button>`. The templating engine will detect that
 *   this is ONLY an identifier, and so will search for the specified method in the available "scope" (see @see Utils.createScope;),
 *   which includes `this` instance of your component as the first `target`. This pattern is not required, as you can call your
 *   component method directly yourself, as with any attribute event binding in the DOM, i.e: `<button data-event-onclick="this.onButtonClick(event)">Click Me!<button>`.
 *
 *   One last thing to mention is that when these "macro" methods are called by Mythix UI, all enumerable keys of the generated
 *   "scope" (see @see Utils.createScope;) are passed into the macro method as arguments. This means that the keys/values of all scope `targets`
 *   are available directly in your javascript scope. i.e. you can do things like `name="componentInstanceProperty(thisAttribute1, otherAttribute)"` without needing to do
 *   `name="this.componentInstanceProperty(this.thisAttribute1, this.otherAttribute)"`. :warning: It is important to keep in mind that direct reference access like this in a macro
 *   will bypass the "scope" (see @see Utils.createScope;) Proxy, and so if the specified key is not found (passed in as an argument to the macro), then an error will be thrown by javascript.
 *
 *   It is absolutely possible for you to receive and send arguments via these generated "macros". `mythix-ui-search` does this for
 *   example when a "filter" method is passed via an attribute. By default no extra arguments are provided when called directly by the templating engine.
 * arguments:
 *   - name: options
 *     dataType: object
 *     desc: |
 *       An object with the shape `{ body: string; prefix?: string; scope: object; }`.
 *
 *       1. `body` is the actual body of the `new Function`.
 *       2. `scope` is the scope (`this`) that you want to bind to the resulting method.
 *          This would generally be a scope created by @see Utils.createScope;
 *       3. `prefix` an optional prefix for the body of the `new Function`. This prefix is added
 *          before any function body code that Mythix UI generates.
 *          See here @sourceRef _createTemplateMacroPrefixForBindEventToElement; for an example use
 *          of `prefix` (notice how `arguments[1]` is used instead of `arguments[0]`, as `arguments[0]` is always reserved
 *          for local variable names "injected" from the created "scope").
 * notes:
 *   - |
 *     :info: Aside for some behind-the-scene modifications and ease-of-use slickness, this essentially just creates a `new Function` and binds a "scope" (see @see Utils.createScope;) to it.
 *   - |
 *     :info: The provided (and optional) `prefix` can be used as the start of the macro `new Function` body code. i.e. @see Utils.bindEventToElement; does exactly this to allow direct scoped
 *     access to the `event` instance. @sourceRef _createTemplateMacroPrefixForBindEventToElement;
 *   - |
 *     :info: The return method is bound by calling `.bind(scope)`. It is not possible to modify `this` at the call-site.
 * return: |
 *   @types function; A function that is "context aware" by being bound to the provided `scope` (see @see Utils.createScope;).
 */
function createTemplateMacro({ prefix, body, scope }) {
  let functionBody = body;
  if (functionBody.charAt(0) === '%' || EVENT_ACTION_JUST_NAME.test(functionBody)) {
    if (functionBody.charAt(0) === '%') {
      functionBody = `(this.dynamicPropID || globalThis.mythixUI.globalScope.dynamicPropID)('${functionBody.substring(1).trim().replace(/'/g, '\\\'')}')`;
    } else {
      functionBody = `(() => {
        try {
          let ____$ = ${functionBody};
          return (typeof ____$ === 'function') ? ____$.apply(this, Array.from(arguments).slice(1)) : ____$;
        } catch (e) {
          return this.${functionBody.replace(/^\s*this\./, '')}.apply(this, Array.from(arguments).slice(1));
        }
      })();`;
    }
  }

  let contextCallArgs = getContextCallArgs(scope, { '__macroSource': null, '__expandedMacroSource': null });

  functionBody = `try { ${(prefix) ? `${prefix};` : ''}return ${(functionBody || '(void 0)').replace(/^\s*return\s+/, '').trim()}; } catch (error) { console.error(\`Error in macro [\${__macroSource}]:\`, error, __expandedMacroSource); throw error; }`;

  let localScope = Object.create(scope);
  localScope.__macroSource = body;
  localScope.__expandedMacroSource = functionBody;

  return (new Function(contextCallArgs, functionBody)).bind(scope || {}, scope);
}

/**
 * groupName: Utils
 * desc: |
 *   Parse a template, and return its parts. A template "part" is one of two types: `'literal'`, or `'macro'`.
 *
 *   Take for example the following template: `'Hello \@@greeting@@!!!'`. This template would result in three "parts" after parsing:
 *   1. `{ type: 'literal', source: 'Hello ', start: 0, end: 6 }`
 *   2. `{ type: 'macro', source: '\@@greeting@@', macro: <function>, start: 6, end: 18 }`
 *   3. `{ type: 'literal', source: '!!!', start: 18, end: 21 }`
 *
 *   Concatenating all `source` properties together will result in the original input.
 *   Concatenating all `source` properties, along with the result of calling all `macro` functions, will result in the output (i.e. `part[0].source + part[1].macro() + part[2].source`).
 *   The `macro` property is the actual macro function for the parsed template part (i.e. in our example `'\@@greeting@@'`).
 *   `start` and `end` are the offsets from the original `text` where the part can be found.
 * arguments:
 *   - name: text
 *     dataType: string
 *     desc: |
 *       The template string to parse.
 *   - name: options
 *     dataType: object
 *     desc: |
 *       Options for the operation. The shape of this object is `{ prefix?: string, scope: object }`.
 *       `scope` defines the scope for macros created by this method (see @see Utils.createScope;).
 *       `prefix` defines a function body prefix to use while creating macros (see @see Utils.createTemplateMacro;).
 * notes:
 *   - |
 *     :info: To skip parsing a specific template part, prefix with a backslash, i.e. `\\\\@@greeting@@`.
 * return: |
 *   @types Array<TemplatePart>; **TemplatePart**: `{ type: 'literal' | 'macro', source: string, start: number, end: number, macro?: function }`. Return all parsed parts of the template.
 */
function parseTemplateParts(text, _options) {
  let options       = _options || {};
  let parts         = [];
  let currentOffset = 0;

  const addLiteral = (startOffset, endOffset) => {
    let source = text.substring(startOffset, endOffset).replace(/\\@@/g, '@@');
    parts.push({ type: 'literal', source, start: startOffset, end: endOffset });
  };

  text.replace(/(?<!\\)(@@)(.+?)\1/g, (m, _, parsedText, offset) => {
    if (currentOffset < offset)
      addLiteral(currentOffset, offset);

    currentOffset = offset + m.length;

    let macro = createTemplateMacro({ ...options, body: parsedText });
    parts.push({ type: 'macro', source: m, macro, start: offset, end: currentOffset });
  });

  if (currentOffset < text.length)
    addLiteral(currentOffset, text.length);

  return parts;
}

const NOOP = (item) => item;

/**
 * groupName: Utils
 * desc: |
 *   Compile the template parts that were parsed by @see Utils.parseTemplateParts;.
 *
 *   It is also possible to provide this method an array of @see Elements.ElementDefinition; instances,
 *   or @see QueryEngine.QueryEngine; instances (that contain @see Elements.ElementDefinition; instances).
 *   If either of these types are found in the input array (even one), then the entire result is returned
 *   as a raw array.
 *
 *   Or, if any of the resulting parts is **not** a @see Utils.parseTemplateParts?caption=TemplatePart; or a `string`,
 *   then return the resulting value raw.
 *
 *   Otherwise, if all resulting parts are a `string`, then the resulting parts are joined, and a `string` is returned.
 * arguments:
 *   - name: parts
 *     dataTypes:
 *       - Array<TemplatePart>
 *       - Array<ElementDefinition>
 *       - Array<QueryEngine>
 *       - Array<any>
 *     desc: |
 *       The template parts to compile together.
 * return: |
 *   @types Array<any>; @types string; Return the result as a string, or an array of raw values, or a raw value.
 */
function compileTemplateFromParts(parts, callback) {
  let result = parts
    .map((part) => {
      if (!part)
        return part;

      if (part[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE || part[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE)
        return part;

      try {
        if (part.type === 'literal')
          return part.source;
        else if (part.type === 'macro')
          return part.macro();

        return part;
      } catch (e) {
        console.error(e);
        return part.source;
      }
    })
    .map(callback || NOOP)
    .filter((item) => (item != null && item !== ''));

  if (result.some((item) => (item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_DEFINITION_TYPE || item[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.QUERY_ENGINE_TYPE)))
    return result;

  if (result.some((item) => _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(item, '::String')))
    return result.join('');

  return (result.length < 2) ? result[0] : result;
}

const FORMAT_TERM_ALLOWABLE_NODES = [ 3, 2 ]; // TEXT_NODE, ATTRIBUTE_NODE

/**
 * groupName: Utils
 * desc: |
 *   Given a Node, take the `.nodeValue` of that node, and if it is a template,
 *   parse that template using @see Utils.parseTemplateParts;, and then
 *   compile that template using @see Utils.compileTemplateFromParts;. The
 *   resulting template parts are then scanned. If any of the `macro()` calls
 *   result in a @see DynamicProperty?caption=DynamicProperty;, then set up
 *   listeners via `addEventListener('update', ...)` on each to listen for
 *   changes to dynamic properties. When a listener updates, the template parts
 *   are recompiled, and the `.nodeValue` is set again with the new result.
 *
 *   In short, this method formats the value of a Node if the value is a template,
 *   and in doing so binds to dynamic properties for future updates to this node.
 *
 *   If the `.nodeValue` of the Node is detected to **not** be a template, then
 *   the result is a no-operation, and the raw value of the Node is simply returned.
 * arguments:
 *   - name: node
 *     dataType: Node
 *     desc: |
 *       The Node whose value should be formatted. This must be a TEXT_NODE or a ATTRIBUTE_NODE.
 * return: |
 *   @types string; The resulting node value. If a template was successfully compiled, dynamic properties
 *   are also listened to for future updates.
 */
function formatNodeValue(node, _options) {
  if (node.parentNode && (/^(style|script)$/).test(node.parentNode.localName))
    return node.nodeValue;

  if (!node || FORMAT_TERM_ALLOWABLE_NODES.indexOf(node.nodeType) < 0)
    throw new TypeError('"formatNodeValue" unsupported node type provided. Only TEXT_NODE and ATTRIBUTE_NODE types are supported.');

  let options       = _options || {};
  let text          = node.nodeValue;
  let templateParts = parseTemplateParts(text, options);

  // templateParts.forEach(({ type, macro }) => {
  //   if (type !== 'macro')
  //     return;

  //   let result = macro();
  //   if (options.bindToDynamicProperties !== false && isType(result, DynamicProperty)) {
  //     result.addEventListener('update', () => {
  //       let result = ('' + compileTemplateFromParts(templateParts));
  //       if (result !== node.nodeValue)
  //         node.nodeValue = result;
  //     }, { capture: true });
  //   }
  // });

  let result = compileTemplateFromParts(templateParts, (result) => {
    if (result && options.bindToDynamicProperties !== false && _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(result, _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty)) {
      result.addEventListener('update', () => {
        let result = ('' + compileTemplateFromParts(templateParts));
        if (result !== node.nodeValue)
          node.nodeValue = result;
      }, { capture: true });
    }

    return result;
  });

  if (result == null)
    result = '';

  return (options.disallowHTML === true) ? ('' + result) : result;
}

const IS_TEMPLATE = /(?<!\\)@@/;
function isTemplate(value) {
  if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(value, '::String'))
    return false;

  return IS_TEMPLATE.test(value);
}

const IS_EVENT_NAME     = /^on/;
const EVENT_NAME_CACHE  = new Map();

function getAllEventNamesForElement(element) {
  let tagName = (!element.tagName) ? element : element.tagName.toUpperCase();
  let cache   = EVENT_NAME_CACHE.get(tagName);
  if (cache)
    return cache;

  let eventNames = [];

  for (let key in element) {
    if (key.length > 2 && IS_EVENT_NAME.test(key))
      eventNames.push(key.toLowerCase());
  }

  EVENT_NAME_CACHE.set(tagName, eventNames);

  return eventNames;
}

function bindEventToElement(element, eventName, _callback) {
  let options = {};
  let callback;

  if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPlainObject(_callback)) {
    callback  = _callback.callback;
    options   = _callback.options || {};
  } else {
    callback = _callback;
  }

  if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(callback, '::String'))
    callback = createTemplateMacro({ prefix: 'let event=arguments[1]', body: callback, scope: this }); // @ref:_createTemplateMacroPrefixForBindEventToElement

  element.addEventListener(eventName, callback, options);

  return { callback, options };
}

// ============================================================================
// New Event System (data-event-on{eventName} attributes)
// ============================================================================

/**
 * Check if an element is a MythixComponent or WebComponent.
 * @param {Element} element - The element to check.
 * @returns {boolean} True if the element is a MythixComponent or WebComponent.
 */
function isMythixOrWebComponent(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE)
    return false;

  // Check for MythixComponent via MYTHIX_TYPE
  try {
    if (element[_constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_TYPE] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_UI_COMPONENT_TYPE)
      return true;
  } catch (e) {
    // Ignore errors
  }

  // Check for custom element (WebComponent) via hyphenated tag name
  let tagName = element.tagName;
  if (tagName && tagName.includes('-'))
    return true;

  return false;
}

/**
 * Get the parent element, crossing Shadow DOM boundaries.
 * @param {Element} element - The element whose parent to find.
 * @returns {Element|null} The parent element or null if at boundary.
 */
function getEventParentElement(element) {
  if (!element)
    return null;

  // Try regular parentElement first
  if (element.parentElement)
    return element.parentElement;

  // Cross Shadow DOM boundary via getRootNode().host
  let root = element.getRootNode();
  if (root && root !== element && root.host)
    return root.host;

  return null;
}

/**
 * Create a scanning proxy that looks up properties by traversing the DOM.
 * Starts from the bound element, scans up via parentElement,
 * crosses Shadow DOM via getRootNode().host, and stops at MythixComponent/WebComponent.
 *
 * @param {Element} startElement - The element to start scanning from.
 * @returns {Proxy} A proxy that resolves property lookups via DOM traversal.
 */
function createScanningProxy(startElement) {
  const scanForProperty = (propName) => {
    let currentElement = startElement;

    while (currentElement) {
      // Check if property exists on this element
      if (propName in currentElement) {
        let value = currentElement[propName];

        // Bind functions to the element they were found on
        if (typeof value === 'function')
          return { found: true, value: value.bind(currentElement), element: currentElement };

        return { found: true, value, element: currentElement };
      }

      // Check if we've hit a MythixComponent/WebComponent boundary
      if (isMythixOrWebComponent(currentElement)) {
        // We found the boundary but property wasn't on it - stop searching
        break;
      }

      // Move to parent, crossing Shadow DOM if needed
      currentElement = getEventParentElement(currentElement);

      // Check if the parent is a MythixComponent boundary
      if (currentElement && isMythixOrWebComponent(currentElement)) {
        // Check this component for the property before stopping
        if (propName in currentElement) {
          let value = currentElement[propName];
          if (typeof value === 'function')
            return { found: true, value: value.bind(currentElement), element: currentElement };

          return { found: true, value, element: currentElement };
        }
        // Stop at this boundary
        break;
      }
    }

    return { found: false };
  };

  // Create a shallow proxy - return real objects after first lookup
  return new Proxy({}, {
    has: (_, propName) => {
      // Allow global access to pass through
      if (propName === 'console' || propName === 'window' || propName === 'document' ||
          propName === 'globalThis' || propName === 'Math' || propName === 'JSON' ||
          propName === 'Date' || propName === 'Array' || propName === 'Object' ||
          propName === 'String' || propName === 'Number' || propName === 'Boolean' ||
          propName === 'Symbol' || propName === 'undefined' || propName === 'null' ||
          propName === 'Infinity' || propName === 'NaN' || propName === 'parseInt' ||
          propName === 'parseFloat' || propName === 'isNaN' || propName === 'isFinite' ||
          propName === 'encodeURI' || propName === 'decodeURI' ||
          propName === 'encodeURIComponent' || propName === 'decodeURIComponent') {
        return true;
      }

      let result = scanForProperty(propName);
      return result.found;
    },
    get: (_, propName) => {
      // Handle special cases for global access
      if (propName === 'console')
        return console;
      if (propName === 'window')
        return globalThis.window;
      if (propName === 'document')
        return globalThis.document;
      if (propName === 'globalThis')
        return globalThis;
      if (propName === 'Math')
        return Math;
      if (propName === 'JSON')
        return JSON;
      if (propName === 'Date')
        return Date;
      if (propName === 'Array')
        return Array;
      if (propName === 'Object')
        return Object;
      if (propName === 'String')
        return String;
      if (propName === 'Number')
        return Number;
      if (propName === 'Boolean')
        return Boolean;
      if (propName === 'Symbol')
        return Symbol;
      if (propName === 'parseInt')
        return parseInt;
      if (propName === 'parseFloat')
        return parseFloat;
      if (propName === 'isNaN')
        return isNaN;
      if (propName === 'isFinite')
        return isFinite;
      if (propName === 'encodeURI')
        return encodeURI;
      if (propName === 'decodeURI')
        return decodeURI;
      if (propName === 'encodeURIComponent')
        return encodeURIComponent;
      if (propName === 'decodeURIComponent')
        return decodeURIComponent;

      let result = scanForProperty(propName);
      if (result.found)
        return result.value;

      // Return undefined for not found (allows global fallback in Function)
      return undefined;
    },
    set: (_, propName, value) => {
      let result = scanForProperty(propName);
      if (result.found && result.element) {
        result.element[propName] = value;
        return true;
      }

      // If not found, set on the start element
      startElement[propName] = value;
      return true;
    },
  });
}

// Pattern to detect simple property references (e.g., "this.handleClick", "state.handler", "handleClick")
const SIMPLE_REF_PATTERN = /^(\w+\.)*\w+$/;
// Pattern to detect function calls (has parentheses)
const HAS_CALL_PATTERN = /\(/;
// Pattern to detect bare method names (just an identifier with no dots or parens)
const BARE_METHOD_PATTERN = /^\w+$/;

/**
 * Generic event wrapper function for data-event-on{eventName} attributes.
 * This function should be bound to the element with the attribute.
 *
 * @param {Event} event - The DOM event object.
 * @returns {*} The result of the event handler expression.
 */
function mythixEventWrapper(event) {
  // `this` is the element with the data-event-on* attribute
  const eventType = event.type;
  const expression = this.getAttribute('data-event-on' + eventType);

  if (!expression)
    return;

  // Create scanning proxy starting from this element
  const proxy = createScanningProxy(this);

  // Detect if this is a simple reference vs a complex expression
  const isSimpleRef = SIMPLE_REF_PATTERN.test(expression);
  const hasCall = HAS_CALL_PATTERN.test(expression);
  const needsInvoke = (isSimpleRef && !hasCall);

  // Normalize bare method names by prepending "this."
  const normalizedExpr = BARE_METHOD_PATTERN.test(expression)
    ? 'this.' + expression
    : expression;

  try {
    // Create a function that evaluates the expression with the proxy as `this`
    const fn = new Function('event', `
      let _result = ${normalizedExpr};
      if (typeof _result === 'function' && ${needsInvoke}) {
        return _result.call(this, event);
      }
      return _result;
    `);

    return fn.call(proxy, event);
  } catch (error) {
    console.error(`Event handler error for "${expression}":`, { element: this, event, error });
  }
}

/**
 * Bind a data-event-on{eventName} attribute to an element.
 *
 * @param {Element} element - The element to bind the event to.
 * @param {string} eventName - The event name (e.g., "click", "submit").
 */
function bindDataEventAttribute(element, eventName) {
  element.addEventListener(eventName, mythixEventWrapper.bind(element));
}

/**
 * Detect and bind all data-event-on* attributes on an element.
 *
 * @param {Element} element - The element to process.
 */
function bindAllDataEventAttributes(element) {
  if (!element || typeof element.getAttributeNames !== 'function')
    return;

  const DATA_EVENT_PREFIX = 'data-event-on';
  const attributeNames = element.getAttributeNames();

  for (let i = 0, il = attributeNames.length; i < il; i++) {
    let attributeName = attributeNames[i].toLowerCase();
    if (attributeName.startsWith(DATA_EVENT_PREFIX)) {
      let eventName = attributeName.substring(DATA_EVENT_PREFIX.length);
      if (eventName) {
        bindDataEventAttribute(element, eventName);
      }
    }
  }
}

function fetchPath(obj, key, defaultValue) {
  if (obj == null || Object.is(obj, NaN) || Object.is(obj, Infinity) || Object.is(obj, -Infinity))
    return defaultValue;

  if (key == null || Object.is(key, NaN) || Object.is(key, Infinity) || Object.is(key, -Infinity))
    return defaultValue;

  let parts         = key.split(/(?<!\\)\./g).filter(Boolean);
  let currentValue  = obj;

  for (let i = 0, il = parts.length; i < il; i++) {
    let part = parts[i];
    let nextValue = currentValue[part];
    if (nextValue == null)
      return defaultValue;

    currentValue = nextValue;
  }

  if (globalThis.Node && currentValue && currentValue instanceof globalThis.Node && (currentValue.nodeType === Node.TEXT_NODE || currentValue.nodeType === Node.ATTRIBUTE_NODE))
    return currentValue.nodeValue;

  return (currentValue == null) ? defaultValue : currentValue;
}

const CACHED_PROPERTY_NAMES = new WeakMap();
const SKIP_PROTOTYPES       = [
  globalThis.HTMLElement,
  globalThis.Node,
  globalThis.Element,
  globalThis.Object,
  globalThis.Array,
];

function getAllPropertyNames(_obj) {
  if (!_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isCollectable(_obj))
    return [];

  let cachedNames = CACHED_PROPERTY_NAMES.get(_obj);
  if (cachedNames)
    return cachedNames;

  let obj   = _obj;
  let names = new Set();

  while (obj) {
    let objNames = Object.getOwnPropertyNames(obj);
    for (let i = 0, il = objNames.length; i < il; i++)
      names.add(objNames[i]);

    obj = Object.getPrototypeOf(obj);
    if (obj && SKIP_PROTOTYPES.indexOf(obj.constructor) >= 0)
      break;
  }

  let finalNames = Array.from(names);
  CACHED_PROPERTY_NAMES.set(_obj, finalNames);

  return finalNames;
}

const LANG_PROVIDER_DYNAMIC_PROPERTY_CACHE = new WeakMap();
function getDynamicPropertyForPath(keyPath, defaultValue) {
  let instanceCache = LANG_PROVIDER_DYNAMIC_PROPERTY_CACHE.get(this);
  if (!instanceCache) {
    instanceCache = new Map();
    LANG_PROVIDER_DYNAMIC_PROPERTY_CACHE.set(this, instanceCache);
  }

  let property = instanceCache.get(keyPath);
  if (!property) {
    property = new _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty(defaultValue);
    instanceCache.set(keyPath, property);
  }

  return property;
}

function specialClosest(node, selector) {
  if (!node || !selector)
    return;

  let currentNode = node;
  while (currentNode && (typeof currentNode.matches !== 'function' || !currentNode.matches(selector)))
    currentNode = getParentNode(currentNode);

  return currentNode;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms || 0);
  });
}

function defineDynamicProp(name, defaultValue, setter) {
  let dynamicProperty = new _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty(defaultValue);

  Object.defineProperties(this, {
    [name]: {
      enumerable:   true,
      configurable: true,
      get:          () => dynamicProperty,
      set:          (newValue) => {
        if (typeof setter === 'function')
          dynamicProperty[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](setter(newValue));
        else
          dynamicProperty[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](newValue);
      },
    },
  });

  return dynamicProperty;
}

const DYNAMIC_PROP_REGISTRY = new Map();
function dynamicPropID(id, setValue) {
  let prop = DYNAMIC_PROP_REGISTRY.get(id);
  if (prop) {
    if (arguments.length > 1)
      prop[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](setValue);

    return prop;
  }

  prop = new _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty((arguments.length > 1) ? setValue : '');
  DYNAMIC_PROP_REGISTRY.set(id, prop);

  return prop;
}

function globalStoreNameValuePairHelper(target, name, value) {
  metadata(
    target,
    _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_NAME_VALUE_PAIR_HELPER,
    [ name, value ],
  );

  return target;
}

const REGISTERED_DISABLE_TEMPLATE_SELECTORS = new Set([ '[data-templates-disable]', 'mythix-for-each' ]);
function getDisableTemplateEngineSelector() {
  return Array.from(REGISTERED_DISABLE_TEMPLATE_SELECTORS).join(',');
}

function registerDisableTemplateEngineSelector(selector) {
  REGISTERED_DISABLE_TEMPLATE_SELECTORS.add(selector);
}

function unregisterDisableTemplateEngineSelector(selector) {
  REGISTERED_DISABLE_TEMPLATE_SELECTORS.delete(selector);
}

function globalStoreHelper(dynamic, args) {
  if (args.length === 0)
    return;

  const setOnGlobal = (name, value) => {
    let currentValue = globalThis.mythixUI.globalScope[name];
    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(currentValue, _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty)) {
      globalThis.mythixUI.globalScope[name][_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](value);
      return currentValue;
    }

    if (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(value, _dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty)) {
      Object.defineProperties(globalThis.mythixUI.globalScope, {
        [name]: {
          enumerable:   true,
          configurable: true,
          get:          () => value,
          set:          (newValue) => {
            value[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](newValue);
          },
        },
      });

      return value;
    } else if (dynamic) {
      let prop = dynamicPropID(name);
      Object.defineProperties(globalThis.mythixUI.globalScope, {
        [name]: {
          enumerable:   true,
          configurable: true,
          get:          () => prop,
          set:          (newValue) => {
            prop[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](newValue);
          },
        },
      });

      prop[_dynamic_property_js__WEBPACK_IMPORTED_MODULE_2__.DynamicProperty.set](value);

      return prop;
    } else {
      globalThis.mythixUI.globalScope[name] = value;
      return value;
    }
  };

  let nameValuePair = (_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isCollectable(args[0])) ? metadata(
    args[0],                        // context
    _constants_js__WEBPACK_IMPORTED_MODULE_0__.MYTHIX_NAME_VALUE_PAIR_HELPER,  // special key
  ) : null; // @ref:_mythixNameValuePairHelperUsage

  if (nameValuePair) {
    let [ name, value ] = nameValuePair;
    setOnGlobal(name, value);
  } else if (args.length > 1 && _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isType(args[0], '::String')) {
    let name  = args[0];
    let value = args[1];
    setOnGlobal(name, value);
  } else {
    let value = args[0];
    let name  = (typeof this.getIdentifier === 'function') ? this.getIdentifier() : (this.getAttribute('id') || this.getAttribute('name'));
    if (!name)
      throw new Error('"mythixUI.globalStore": "name" is unknown, so unable to store value');

    setOnGlobal(name, value);
  }
}

function globalStore(...args) {
  return globalStoreHelper.call(this, false, args);
}

function globalStoreDynamic(...args) {
  return globalStoreHelper.call(this, true, args);
}

class StorageItem {
  constructor(value) {
    this._c = Date.now();
    this._u = Date.now();
    this._v = value;
  }

  getValue() {
    return this._v;
  }

  setValue(value) {
    this._u = Date.now();
    this._v = value;
  }

  toJSON() {
    return {
      $type:  'StorageItem',
      _c:     this._c,
      _u:     this._u,
      _v:     this._v,
    };
  }
}

class Storage {
  _revive(data, _alreadyVisited) {
    if (!data || _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPrimitive(data))
      return data;

    let alreadyVisited  = _alreadyVisited || new Set();
    let type            = (data && data.$type);

    if (type) {
      if (type === 'StorageItem') {
        let value = data._v;

        return Object.assign(new StorageItem(), {
          _c: data._c,
          _u: data._u,
          _v: (value && !_base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPrimitive(value)) ? this._revive(value, alreadyVisited) : value,
        });
      }
    }

    for (let [ key, value ] of Object.entries(data)) {
      if (!value || _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPrimitive(value))
        continue;

      if (alreadyVisited.has(value))
        continue;

      alreadyVisited.add(value);
      data[key] = this._revive(value, alreadyVisited);
    }

    return data;
  }

  _raw(data, _alreadyVisited) {
    if (!data || _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPrimitive(data))
      return data;

    let alreadyVisited = _alreadyVisited || new Set();
    if (data instanceof StorageItem)
      return this._raw(data.getValue(), alreadyVisited);

    for (let [ key, value ] of Object.entries(data)) {
      if (!value || _base_utils_js__WEBPACK_IMPORTED_MODULE_1__.isPrimitive(value))
        continue;

      if (alreadyVisited.has(value))
        continue;

      alreadyVisited.add(value);
      data[key] = this._raw(value, alreadyVisited);
    }

    return data;
  }

  _getPartsForOperation(type, parts) {
    let pathParts   = (type === 'set') ? parts.slice(0, -1) : parts.slice();
    let path        = pathParts.map((part) => ((typeof part === 'symbol') ? part.toString() : ('' + part)).replace(/\./g, '\\.')).join('.');
    let parsedParts = path.split(/(?<!\\)\./g);
    let storageType = parsedParts[0];
    let data        = (type === 'set') ? parts[parts.length - 1] : undefined;

    // localStorage, or sessionStorage
    let storageEngine = globalThis[storageType];
    if (!storageEngine)
      return;

    let rootData    = {};
    let encodedBase = storageEngine.getItem('mythix-ui');
    if (encodedBase)
      rootData = this._revive(JSON.parse(encodedBase));

    return {
      pathParts,
      path,
      parsedParts,
      storageType,
      data,
      storageEngine,
      encodedBase,
      rootData,
    };
  }

  _getMeta(type, parts) {
    let operation = this._getPartsForOperation(type, parts);
    let {
      parsedParts,
      rootData,
    } = operation;

    let scope        = rootData;
    let parentScope  = null;

    for (let i = 1, il = parsedParts.length; i < il; i++) {
      if (scope instanceof StorageItem) {
        scope = scope.getValue();
        if (!scope)
          break;
      }

      let part = parsedParts[i];
      let subScope = (scope) ? scope[part] : scope;
      if (type === 'set' && !subScope)
        subScope = scope[part] = {};

      if (subScope == null || Object.is(subScope, NaN) || Object.is(subScope, -Infinity) || Object.is(subScope, Infinity))
        break;

      parentScope = scope;
      scope = subScope;
    }

    return {
      operation,
      parentScope,
      scope,
    };
  }

  getMeta(...parts) {
    return this._getMeta('get', parts);
  }

  get(...parts) {
    let { scope } = this._getMeta('get', parts);
    return this._raw(scope);
  }

  set(...parts) {
    let {
      operation,
      parentScope,
      scope,
    } = this._getMeta('set', parts);

    let {
      data,
      parsedParts,
      path,
      rootData,
      storageEngine,
    } = operation;

    if (data === undefined) {
      // Delete
      if (parentScope)
        delete parentScope[parsedParts[parsedParts.length - 1]];
      else
        delete scope[parsedParts[parsedParts.length - 1]];
    } else {
      if (parentScope)
        parentScope[parsedParts[parsedParts.length - 1]] = new StorageItem(data);
      else
        scope[parsedParts[parsedParts.length - 1]] = new StorageItem(data);
    }

    storageEngine.setItem('mythix-ui', JSON.stringify(rootData));

    return path;
  }

}

const storage = new Storage();


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseUtils: () => (/* reexport module object */ _base_utils_js__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   ComponentUtils: () => (/* reexport module object */ _component_utils_js__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   DynamicProperty: () => (/* reexport safe */ _dynamic_property_js__WEBPACK_IMPORTED_MODULE_6__.DynamicProperty),
/* harmony export */   Elements: () => (/* reexport module object */ _elements_js__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   Errors: () => (/* reexport module object */ _errors_js__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   MythixElements: () => (/* binding */ MythixElements),
/* harmony export */   MythixUIComponent: () => (/* reexport safe */ _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent),
/* harmony export */   QueryEngine: () => (/* reexport safe */ _query_engine_js__WEBPACK_IMPORTED_MODULE_7__.QueryEngine),
/* harmony export */   StyleSheetManager: () => (/* reexport module object */ _stylesheet_manager_js__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   Utils: () => (/* reexport module object */ _utils_js__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   isMythixComponent: () => (/* reexport safe */ _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.isMythixComponent)
/* harmony export */ });
/* harmony import */ var _base_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-utils.js */ "./lib/base-utils.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errors.js */ "./lib/errors.js");
/* harmony import */ var _stylesheet_manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stylesheet-manager.js */ "./lib/stylesheet-manager.js");
/* harmony import */ var _component_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component-utils.js */ "./lib/component-utils.js");
/* harmony import */ var _elements_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./elements.js */ "./lib/elements.js");
/* harmony import */ var _dynamic_property_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dynamic-property.js */ "./lib/dynamic-property.js");
/* harmony import */ var _query_engine_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./query-engine.js */ "./lib/query-engine.js");
/* harmony import */ var _mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mythix-ui-component.js */ "./lib/mythix-ui-component.js");
/* harmony import */ var _mythix_ui_require_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mythix-ui-require.js */ "./lib/mythix-ui-require.js");
/* harmony import */ var _mythix_ui_language_provider_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mythix-ui-language-provider.js */ "./lib/mythix-ui-language-provider.js");
/* harmony import */ var _mythix_ui_spinner_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mythix-ui-spinner.js */ "./lib/mythix-ui-spinner.js");
/* harmony import */ var _mythix_ui_dynamic_style_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mythix-ui-dynamic-style.js */ "./lib/mythix-ui-dynamic-style.js");
globalThis.mythixUI = (globalThis.mythixUI || {});
globalThis.mythixUI.globalScope = (globalThis.mythixUI.globalScope || {});

if (typeof document !== 'undefined' && !globalThis.mythixUI.globalScope.url)
  globalThis.mythixUI.globalScope.url = new URL(document.location);






























const MythixElements = {
  MythixUIRequire: _mythix_ui_require_js__WEBPACK_IMPORTED_MODULE_9__.MythixUIRequire,
  MythixUILanguagePack: _mythix_ui_language_provider_js__WEBPACK_IMPORTED_MODULE_10__.MythixUILanguagePack,
  MythixUILanguageProvider: _mythix_ui_language_provider_js__WEBPACK_IMPORTED_MODULE_10__.MythixUILanguageProvider,
  MythixUISpinner: _mythix_ui_spinner_js__WEBPACK_IMPORTED_MODULE_11__.MythixUISpinner,
  MythixUIDynamicStyle: _mythix_ui_dynamic_style_js__WEBPACK_IMPORTED_MODULE_12__.MythixUIDynamicStyle,
};



let _mythixIsReady = false;
Object.defineProperties(globalThis, {
  'onmythixready': {
    enumerable:   false,
    configurable: true,
    get:          () => {
      return null;
    },
    set:          (callback) => {
      if (_mythixIsReady) {
        Promise.resolve().then(() => callback(new Event('mythix-ready')));
        return;
      }

      document.addEventListener('mythix-ready', callback);
    },
  },
});

globalThis.mythixUI.BaseUtils = _base_utils_js__WEBPACK_IMPORTED_MODULE_0__;
globalThis.mythixUI.Utils = _utils_js__WEBPACK_IMPORTED_MODULE_1__;
globalThis.mythixUI.ComponentUtils = _component_utils_js__WEBPACK_IMPORTED_MODULE_4__;
globalThis.mythixUI.Elements = _elements_js__WEBPACK_IMPORTED_MODULE_5__;
globalThis.mythixUI.globalScope.globalStore = _utils_js__WEBPACK_IMPORTED_MODULE_1__.globalStore;
globalThis.mythixUI.globalScope.globalStoreDynamic = _utils_js__WEBPACK_IMPORTED_MODULE_1__.globalStoreDynamic;

globalThis.mythixUI.globalScope.dynamicPropID = function(id) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_1__.dynamicPropID(id);
};

class MythixConnectedEvent extends CustomEvent {
  constructor() {
    super('mythix-connected');
  }
}

class MythixDisconnectedEvent extends CustomEvent {
  constructor() {
    super('mythix-disconnected');
  }
}

if (typeof document !== 'undefined') {
  let didVisibilityObservers = false;

  const onDocumentReady = () => {
    if (!didVisibilityObservers) {
      let elements = Array.from(document.querySelectorAll('[data-mythix-src]'));
      _component_utils_js__WEBPACK_IMPORTED_MODULE_4__.visibilityObserver(({ disconnect, element, wasVisible }) => {
        if (wasVisible)
          return;

        disconnect();

        let src = element.getAttribute('data-mythix-src');
        if (!src)
          return;

        _component_utils_js__WEBPACK_IMPORTED_MODULE_4__.loadPartialIntoElement.call(element, src).then(() => {
          element.classList.add('mythix-ready');
        });
      }, { elements });

      didVisibilityObservers = true;
    }

    document.body.classList.add('mythix-ready');

    if (_mythixIsReady)
      return;

    _mythixIsReady = true;

    document.dispatchEvent(new Event('mythix-ready'));
  };

  Object.defineProperties(globalThis, {
    '$': {
      writable:     true,
      enumerable:   true,
      configurable: true,
      value:        (...args) => document.querySelector(...args),
    },
    '$$': {
      writable:     true,
      enumerable:   true,
      configurable: true,
      value:        (...args) => document.querySelectorAll(...args),
    },
  });

  let documentMutationObserver = globalThis.mythixUI.documentMutationObserver = new MutationObserver((mutations) => {
    let disableTemplateEngineSelectorStr = _utils_js__WEBPACK_IMPORTED_MODULE_1__.getDisableTemplateEngineSelector();
    for (let i = 0, il = mutations.length; i < il; i++) {
      let mutation  = mutations[i];
      let target    = mutation.target;

      if (mutation.type === 'attributes') {
        if (disableTemplateEngineSelectorStr && target.parentNode && typeof target.parentNode.closest === 'function' && target.parentNode.closest(disableTemplateEngineSelectorStr))
          continue;

        let attributeNode = target.getAttributeNode(mutation.attributeName);
        let newValue      = (attributeNode) ? attributeNode.nodeValue : null;
        let oldValue      = mutation.oldValue;

        if (oldValue === newValue)
          continue;

        if (newValue && _utils_js__WEBPACK_IMPORTED_MODULE_1__.isTemplate(newValue))
          attributeNode.nodeValue = _utils_js__WEBPACK_IMPORTED_MODULE_1__.formatNodeValue(attributeNode, { scope: _utils_js__WEBPACK_IMPORTED_MODULE_1__.createScope(target), disallowHTML: true });

        let observedAttributes = target.constructor.observedAttributes;
        if (observedAttributes && observedAttributes.indexOf(mutation.attributeName) < 0) {
          if (target[_mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent.isMythixComponent])
            target.attributeChangedCallback.call(target, mutation.attributeName, oldValue, newValue);
        }
      } else if (mutation.type === 'childList') {
        let disableTemplating = (disableTemplateEngineSelectorStr && target && typeof target.closest === 'function' && target.closest('[data-templates-disable],mythix-for-each'));
        let addedNodes        = mutation.addedNodes;
        for (let j = 0, jl = addedNodes.length; j < jl; j++) {
          let node = addedNodes[j];
          if (node[_mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent.isMythixComponent] && node.onMutationAdded.call(node, mutation) === false)
            continue;

          if (!disableTemplating)
            _elements_js__WEBPACK_IMPORTED_MODULE_5__.processElements(node);

          if (typeof node.dispatchEvent === 'function') {
            let connectedEvent = new MythixConnectedEvent();
            node.dispatchEvent(connectedEvent);
          }

          if (target[_mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent.isMythixComponent])
            target.onMutationChildAdded(node, mutation);
        }

        let removedNodes = mutation.removedNodes;
        for (let j = 0, jl = removedNodes.length; j < jl; j++) {
          let node = removedNodes[j];
          if (node[_mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent.isMythixComponent] && node.onMutationRemoved.call(node, mutation) === false)
            continue;

          if (typeof node.dispatchEvent === 'function') {
            let disconnectedEvent = new MythixDisconnectedEvent();
            node.dispatchEvent(disconnectedEvent);
          }

          if (target[_mythix_ui_component_js__WEBPACK_IMPORTED_MODULE_8__.MythixUIComponent.isMythixComponent])
            target.onMutationChildRemoved(node, mutation);
        }
      }
    }
  });

  documentMutationObserver.observe(document, {
    subtree:            true,
    childList:          true,
    attributes:         true,
    attributeOldValue:  true,
  });

  _elements_js__WEBPACK_IMPORTED_MODULE_5__.processElements(document.head);
  _elements_js__WEBPACK_IMPORTED_MODULE_5__.processElements(document.body);

  const DOCUMENT_CHECK_READY_TIME = 250;

  setTimeout(() => {
    if (document.readyState === 'complete')
      onDocumentReady();
    else
      document.addEventListener('DOMContentLoaded', onDocumentReady);
  }, DOCUMENT_CHECK_READY_TIME);

  window.addEventListener('load', onDocumentReady);
}

})();

var __webpack_exports__BaseUtils = __webpack_exports__.BaseUtils;
var __webpack_exports__ComponentUtils = __webpack_exports__.ComponentUtils;
var __webpack_exports__DynamicProperty = __webpack_exports__.DynamicProperty;
var __webpack_exports__Elements = __webpack_exports__.Elements;
var __webpack_exports__Errors = __webpack_exports__.Errors;
var __webpack_exports__MythixElements = __webpack_exports__.MythixElements;
var __webpack_exports__MythixUIComponent = __webpack_exports__.MythixUIComponent;
var __webpack_exports__QueryEngine = __webpack_exports__.QueryEngine;
var __webpack_exports__StyleSheetManager = __webpack_exports__.StyleSheetManager;
var __webpack_exports__Utils = __webpack_exports__.Utils;
var __webpack_exports__isMythixComponent = __webpack_exports__.isMythixComponent;
export { __webpack_exports__BaseUtils as BaseUtils, __webpack_exports__ComponentUtils as ComponentUtils, __webpack_exports__DynamicProperty as DynamicProperty, __webpack_exports__Elements as Elements, __webpack_exports__Errors as Errors, __webpack_exports__MythixElements as MythixElements, __webpack_exports__MythixUIComponent as MythixUIComponent, __webpack_exports__QueryEngine as QueryEngine, __webpack_exports__StyleSheetManager as StyleSheetManager, __webpack_exports__Utils as Utils, __webpack_exports__isMythixComponent as isMythixComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSXFDOztBQUVyQyxnREFBZ0Q7O0FBSTlDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVksMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUEsY0FBYyxXQUFXLEVBQUUsMkNBQTJDO0FBQ3RFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDLG1DQUFtQyxhQUFhLDRFQUE0RSxLQUFLO0FBQ2pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7O0FBRTdDO0FBQ0EseUJBQXlCLFdBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLGlDQUFpQyxFQUFFLHNCQUFzQjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLGtCQUFrQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUF3Qjs7QUFFMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbm9kZV9tb2R1bGVzL2RlZXBtZXJnZS9kaXN0L2Nqcy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9iYXNlLXV0aWxzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2NvbXBvbmVudC11dGlscy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvZHluYW1pYy1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9lbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvbXl0aGl4LXVpLWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktZHluYW1pYy1zdHlsZS5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktbGFuZ3VhZ2UtcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvbXl0aGl4LXVpLXJlcXVpcmUuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvbXl0aGl4LXVpLXNwaW5uZXIuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvcXVlcnktZW5naW5lLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9zdHlsZXNoZWV0LW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc01lcmdlYWJsZU9iamVjdCA9IGZ1bmN0aW9uIGlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiBpc05vbk51bGxPYmplY3QodmFsdWUpXG5cdFx0JiYgIWlzU3BlY2lhbCh2YWx1ZSlcbn07XG5cbmZ1bmN0aW9uIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzU3BlY2lhbCh2YWx1ZSkge1xuXHR2YXIgc3RyaW5nVmFsdWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdHJldHVybiBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcblx0XHR8fCBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG5cdFx0fHwgaXNSZWFjdEVsZW1lbnQodmFsdWUpXG59XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iNWFjOTYzZmI3OTFkMTI5OGU3ZjM5NjIzNjM4M2JjOTU1ZjkxNmMxL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxLUwyNVxudmFyIGNhblVzZVN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5cbmZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG59XG5cbmZ1bmN0aW9uIGVtcHR5VGFyZ2V0KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gW10gOiB7fVxufVxuXG5mdW5jdGlvbiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh2YWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gKG9wdGlvbnMuY2xvbmUgIT09IGZhbHNlICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodmFsdWUpKVxuXHRcdD8gZGVlcG1lcmdlKGVtcHR5VGFyZ2V0KHZhbHVlKSwgdmFsdWUsIG9wdGlvbnMpXG5cdFx0OiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdGFyZ2V0LmNvbmNhdChzb3VyY2UpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKGVsZW1lbnQsIG9wdGlvbnMpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucy5jdXN0b21NZXJnZSkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2Vcblx0fVxuXHR2YXIgY3VzdG9tTWVyZ2UgPSBvcHRpb25zLmN1c3RvbU1lcmdlKGtleSk7XG5cdHJldHVybiB0eXBlb2YgY3VzdG9tTWVyZ2UgPT09ICdmdW5jdGlvbicgPyBjdXN0b21NZXJnZSA6IGRlZXBtZXJnZVxufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc1xuXHRcdD8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihzeW1ib2wpIHtcblx0XHRcdHJldHVybiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIHN5bWJvbClcblx0XHR9KVxuXHRcdDogW11cbn1cblxuZnVuY3Rpb24gZ2V0S2V5cyh0YXJnZXQpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKHRhcmdldCkuY29uY2F0KGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSlcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlJc09uT2JqZWN0KG9iamVjdCwgcHJvcGVydHkpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gcHJvcGVydHkgaW4gb2JqZWN0XG5cdH0gY2F0Y2goXykge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbi8vIFByb3RlY3RzIGZyb20gcHJvdG90eXBlIHBvaXNvbmluZyBhbmQgdW5leHBlY3RlZCBtZXJnaW5nIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG5mdW5jdGlvbiBwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSB7XG5cdHJldHVybiBwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpIC8vIFByb3BlcnRpZXMgYXJlIHNhZmUgdG8gbWVyZ2UgaWYgdGhleSBkb24ndCBleGlzdCBpbiB0aGUgdGFyZ2V0IHlldCxcblx0XHQmJiAhKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwga2V5KSAvLyB1bnNhZmUgaWYgdGhleSBleGlzdCB1cCB0aGUgcHJvdG90eXBlIGNoYWluLFxuXHRcdFx0JiYgT2JqZWN0LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodGFyZ2V0LCBrZXkpKSAvLyBhbmQgYWxzbyB1bnNhZmUgaWYgdGhleSdyZSBub25lbnVtZXJhYmxlLlxufVxuXG5mdW5jdGlvbiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHR2YXIgZGVzdGluYXRpb24gPSB7fTtcblx0aWYgKG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodGFyZ2V0KSkge1xuXHRcdGdldEtleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHRhcmdldFtrZXldLCBvcHRpb25zKTtcblx0XHR9KTtcblx0fVxuXHRnZXRLZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcblx0XHRpZiAocHJvcGVydHlJc1Vuc2FmZSh0YXJnZXQsIGtleSkpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmIChwcm9wZXJ0eUlzT25PYmplY3QodGFyZ2V0LCBrZXkpICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3Qoc291cmNlW2tleV0pKSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpKHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2Vba2V5XSwgb3B0aW9ucyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGRlc3RpbmF0aW9uXG59XG5cbmZ1bmN0aW9uIGRlZXBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0b3B0aW9ucy5hcnJheU1lcmdlID0gb3B0aW9ucy5hcnJheU1lcmdlIHx8IGRlZmF1bHRBcnJheU1lcmdlO1xuXHRvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0ID0gb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCB8fCBpc01lcmdlYWJsZU9iamVjdDtcblx0Ly8gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgaXMgYWRkZWQgdG8gYG9wdGlvbnNgIHNvIHRoYXQgY3VzdG9tIGFycmF5TWVyZ2UoKVxuXHQvLyBpbXBsZW1lbnRhdGlvbnMgY2FuIHVzZSBpdC4gVGhlIGNhbGxlciBtYXkgbm90IHJlcGxhY2UgaXQuXG5cdG9wdGlvbnMuY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQgPSBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZDtcblxuXHR2YXIgc291cmNlSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoc291cmNlKTtcblx0dmFyIHRhcmdldElzQXJyYXkgPSBBcnJheS5pc0FycmF5KHRhcmdldCk7XG5cdHZhciBzb3VyY2VBbmRUYXJnZXRUeXBlc01hdGNoID0gc291cmNlSXNBcnJheSA9PT0gdGFyZ2V0SXNBcnJheTtcblxuXHRpZiAoIXNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2gpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2UgaWYgKHNvdXJjZUlzQXJyYXkpIHtcblx0XHRyZXR1cm4gb3B0aW9ucy5hcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBtZXJnZU9iamVjdCh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucylcblx0fVxufVxuXG5kZWVwbWVyZ2UuYWxsID0gZnVuY3Rpb24gZGVlcG1lcmdlQWxsKGFycmF5LCBvcHRpb25zKSB7XG5cdGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ZpcnN0IGFyZ3VtZW50IHNob3VsZCBiZSBhbiBhcnJheScpXG5cdH1cblxuXHRyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcblx0XHRyZXR1cm4gZGVlcG1lcmdlKHByZXYsIG5leHQsIG9wdGlvbnMpXG5cdH0sIHt9KVxufTtcblxudmFyIGRlZXBtZXJnZV8xID0gZGVlcG1lcmdlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZXBtZXJnZV8xO1xuIiwiaW1wb3J0IHsgU0hBMjU2IH0gZnJvbSAnLi9zaGEyNTYuanMnO1xuXG5nbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pO1xuXG5leHBvcnQge1xuICBTSEEyNTYsXG59O1xuXG4vKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogQmFzZVV0aWxzXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBNaXNjIHV0aWxpdHkgZnVuY3Rpb25zIGFuZCBnbG9iYWwgY29uc3RhbnRzIGFyZSBmb3VuZCB3aXRoaW4gdGhpcyBuYW1lc3BhY2UuXG4gKi9cblxuZnVuY3Rpb24gcGFkKHN0ciwgY291bnQsIGNoYXIgPSAnMCcpIHtcbiAgcmV0dXJuIHN0ci5wYWRTdGFydChjb3VudCwgY2hhcik7XG59XG5cbmNvbnN0IElEX0NPVU5UX0xFTkdUSCAgICAgICAgID0gMTk7XG5jb25zdCBJU19DTEFTUyAgICAgICAgICAgICAgICA9ICgvXmNsYXNzIFxcUysgXFx7Lyk7XG5jb25zdCBOQVRJVkVfQ0xBU1NfVFlQRV9OQU1FUyA9IFtcbiAgJ0FnZ3JlZ2F0ZUVycm9yJyxcbiAgJ0FycmF5JyxcbiAgJ0FycmF5QnVmZmVyJyxcbiAgJ0JpZ0ludCcsXG4gICdCaWdJbnQ2NEFycmF5JyxcbiAgJ0JpZ1VpbnQ2NEFycmF5JyxcbiAgJ0Jvb2xlYW4nLFxuICAnRGF0YVZpZXcnLFxuICAnRGF0ZScsXG4gICdEZWRpY2F0ZWRXb3JrZXJHbG9iYWxTY29wZScsXG4gICdFcnJvcicsXG4gICdFdmFsRXJyb3InLFxuICAnRmluYWxpemF0aW9uUmVnaXN0cnknLFxuICAnRmxvYXQzMkFycmF5JyxcbiAgJ0Zsb2F0NjRBcnJheScsXG4gICdGdW5jdGlvbicsXG4gICdJbnQxNkFycmF5JyxcbiAgJ0ludDMyQXJyYXknLFxuICAnSW50OEFycmF5JyxcbiAgJ01hcCcsXG4gICdOdW1iZXInLFxuICAnT2JqZWN0JyxcbiAgJ1Byb3h5JyxcbiAgJ1JhbmdlRXJyb3InLFxuICAnUmVmZXJlbmNlRXJyb3InLFxuICAnUmVnRXhwJyxcbiAgJ1NldCcsXG4gICdTaGFyZWRBcnJheUJ1ZmZlcicsXG4gICdTdHJpbmcnLFxuICAnU3ltYm9sJyxcbiAgJ1N5bnRheEVycm9yJyxcbiAgJ1R5cGVFcnJvcicsXG4gICdVaW50MTZBcnJheScsXG4gICdVaW50MzJBcnJheScsXG4gICdVaW50OEFycmF5JyxcbiAgJ1VpbnQ4Q2xhbXBlZEFycmF5JyxcbiAgJ1VSSUVycm9yJyxcbiAgJ1dlYWtNYXAnLFxuICAnV2Vha1JlZicsXG4gICdXZWFrU2V0Jyxcbl07XG5cbmNvbnN0IE5BVElWRV9DTEFTU19UWVBFU19NRVRBID0gTkFUSVZFX0NMQVNTX1RZUEVfTkFNRVMubWFwKCh0eXBlTmFtZSkgPT4ge1xuICByZXR1cm4gWyB0eXBlTmFtZSwgZ2xvYmFsVGhpc1t0eXBlTmFtZV0gXTtcbn0pLmZpbHRlcigobWV0YSkgPT4gbWV0YVsxXSk7XG5cbmNvbnN0IElEX0NPVU5URVJfQ1VSUkVOVF9WQUxVRSAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb21wb25lbnQvY29uc3RhbnRzL2lkLWNvdW50ZXItY3VycmVudC12YWx1ZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xubGV0IGlkQ291bnRlciA9IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZ2xvYmFsVGhpcy5teXRoaXhVSSwgSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFKSkgPyBnbG9iYWxUaGlzLm15dGhpeFVJW0lEX0NPVU5URVJfQ1VSUkVOVF9WQUxVRV0gOiAwbjtcblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBHZW5lcmF0ZSBhIHBhcnRpYWxseSByYW5kb20gdW5pcXVlIElELiBUaGUgaWQgZ2VuZXJhdGVkIHdpbGwgYmUgYSBgRGF0ZS5ub3coKWBcbiAqICAgdmFsdWUgd2l0aCBhbiBpbmNyZW1lbnRpbmcgQmlnSW50IHBvc3RmaXhlZCB0byBpdC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBBIHVuaXF1ZSBJRC5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coJ0lEOiAnLCBCYXNlVXRpbHMuZ2VuZXJhdGVJRCgpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gJ0lEMTcwNDE0MzAyNzE3OTAwMDAwMDAwMDAwMDAwMDAwMDcnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUlEKCkge1xuICBpZENvdW50ZXIgKz0gQmlnSW50KDEpO1xuICBnbG9iYWxUaGlzLm15dGhpeFVJW0lEX0NPVU5URVJfQ1VSUkVOVF9WQUxVRV0gPSBpZENvdW50ZXI7XG5cbiAgcmV0dXJuIGBJRCR7RGF0ZS5ub3coKX0ke3BhZChpZENvdW50ZXIudG9TdHJpbmcoKSwgSURfQ09VTlRfTEVOR1RIKX1gO1xufVxuXG5jb25zdCBPQkpFQ1RfSURfU1RPUkFHRSA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvb2JqZWN0LWlkLXN0b3JhZ2UnKTtcbmNvbnN0IE9CSkVDVF9JRF9XRUFLTUFQID0gZ2xvYmFsVGhpcy5teXRoaXhVSVtPQkpFQ1RfSURfU1RPUkFHRV0gPSAoZ2xvYmFsVGhpcy5teXRoaXhVSVtPQkpFQ1RfSURfU1RPUkFHRV0pID8gZ2xvYmFsVGhpcy5teXRoaXhVSVtPQkpFQ1RfSURfU1RPUkFHRV0gOiBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIEdldCBhIHVuaXF1ZSBJRCBmb3IgYW55IGdhcmJhZ2UtY29sbGVjdGFibGUgcmVmZXJlbmNlLlxuICpcbiAqICAgVW5pcXVlIElEcyBhcmUgZ2VuZXJhdGVkIHZpYSBAc2VlIEJhc2VVdGlscy5nZW5lcmF0ZUlEOy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBBbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSByZWZlcmVuY2UuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgQSB1bmlxdWUgSUQgZm9yIHRoaXMgcmVmZXJlbmNlIChhcyBhIFNIQTI1NiBoYXNoKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLmdldE9iamVjdElEKGRpdkVsZW1lbnQpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gJzE3MDQxNDMwMjcxNzkwMDAwMDAwMDAwMDAwMDAwMDA3J1xuICogICAgIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2JqZWN0SUQodmFsdWUpIHtcbiAgbGV0IGlkID0gT0JKRUNUX0lEX1dFQUtNQVAuZ2V0KHZhbHVlKTtcbiAgaWYgKGlkID09IG51bGwpIHtcbiAgICBsZXQgdGhpc0lEID0gZ2VuZXJhdGVJRCgpO1xuXG4gICAgT0JKRUNUX0lEX1dFQUtNQVAuc2V0KHZhbHVlLCB0aGlzSUQpO1xuXG4gICAgcmV0dXJuIHRoaXNJRDtcbiAgfVxuXG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBDcmVhdGUgYW4gdW5yZXNvbHZlZCBzcGVjaWFsaXplZCBQcm9taXNlIGluc3RhbmNlLCB3aXRoIHRoZSBpbnRlbnQgdGhhdCBpdCB3aWxsIGJlXG4gKiAgIHJlc29sdmVkIGxhdGVyLlxuICpcbiAqICAgVGhlIFByb21pc2UgaW5zdGFuY2UgaXMgc3BlY2lhbGl6ZWQgYmVjYXVzZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMgYXJlIGluamVjdGVkIGludG8gaXQ6XG4gKiAgIDEuIGByZXNvbHZlKHJlc3VsdFZhbHVlKWAgLSBXaGVuIGNhbGxlZCwgcmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCB0aGUgZmlyc3QgcHJvdmlkZWQgYXJndW1lbnRcbiAqICAgMi4gYHJlamVjdChlcnJvclZhbHVlKWAgLSBXaGVuIGNhbGxlZCwgcmVqZWN0cyB0aGUgcHJvbWlzZSB3aXRoIHRoZSBmaXJzdCBwcm92aWRlZCBhcmd1bWVudFxuICogICAzLiBgc3RhdHVzKClgIC0gV2hlbiBjYWxsZWQsIHdpbGwgcmV0dXJuIHRoZSBmdWxmaWxsbWVudCBzdGF0dXMgb2YgdGhlIHByb21pc2UsIGFzIGEgYHN0cmluZ2AsIG9uZSBvZjogYFwicGVuZGluZ1wiLCBcImZ1bGZpbGxlZFwiYCwgb3IgYFwicmVqZWN0ZWRcImBcbiAqICAgNC4gYGlkPHN0cmluZz5gIC0gQSByYW5kb21seSBnZW5lcmF0ZWQgSUQgZm9yIHRoaXMgcHJvbWlzZVxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBQcm9taXNlOyBBbiB1bnJlc29sdmVkIFByb21pc2UgdGhhdCBjYW4gYmUgcmVzb2x2ZWQgb3IgcmVqZWN0ZWQgYnkgY2FsbGluZyBgcHJvbWlzZS5yZXNvbHZlKHJlc3VsdClgIG9yIGBwcm9taXNlLnJlamVjdChlcnJvcilgIHJlc3BlY3RpdmVseS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc29sdmFibGUoKSB7XG4gIGxldCBzdGF0dXMgPSAncGVuZGluZyc7XG4gIGxldCByZXNvbHZlO1xuICBsZXQgcmVqZWN0O1xuXG4gIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCBfcmVqZWN0KSA9PiB7XG4gICAgcmVzb2x2ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgIHN0YXR1cyA9ICdmdWxmaWxsZWQnO1xuICAgICAgICBfcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG5cbiAgICByZWplY3QgPSAodmFsdWUpID0+IHtcbiAgICAgIGlmIChzdGF0dXMgPT09ICdwZW5kaW5nJykge1xuICAgICAgICBzdGF0dXMgPSAncmVqZWN0ZWQnO1xuICAgICAgICBfcmVqZWN0KHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvbWlzZSwge1xuICAgICdyZXNvbHZlJzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICByZXNvbHZlLFxuICAgIH0sXG4gICAgJ3JlamVjdCc6IHtcbiAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiAgICAgICAgcmVqZWN0LFxuICAgIH0sXG4gICAgJ3N0YXR1cyc6IHtcbiAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiAgICAgICAgKCkgPT4gc3RhdHVzLFxuICAgIH0sXG4gICAgJ2lkJzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICBnZW5lcmF0ZUlEKCksXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgUnVudGltZSB0eXBlIHJlZmxlY3Rpb24gaGVscGVyLiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGEgbW9yZSByb2J1c3QgcmVwbGFjZW1lbnQgZm9yIHRoZSBgdHlwZW9mYCBvcGVyYXRvci5cbiAqXG4gKiAgIFRoaXMgbWV0aG9kIGFsd2F5cyByZXR1cm5zIGEgbmFtZSAoYXMgYSBgc3RyaW5nYCB0eXBlKSBvZiB0aGUgdW5kZXJseWluZyBkYXRhdHlwZS5cbiAqICAgVGhlIFwiZGF0YXR5cGVcIiBpcyBhIGxpdHRsZSBsb29zZSBmb3IgcHJpbWl0aXZlIHR5cGVzLiBGb3IgZXhhbXBsZSwgYVxuICogICBwcmltaXRpdmUgYHR5cGVvZiB4ID09PSAnbnVtYmVyJ2AgdHlwZSBpcyByZXR1cm5lZCBhcyBpdHMgY29ycmVzcG9uZGluZyBPYmplY3QgKGNsYXNzKSB0eXBlIGAnTnVtYmVyJ2AuIEZvciBgYm9vbGVhbmAgaXQgd2lsbCBpbnN0ZWFkXG4gKiAgIHJldHVybiBgJ0Jvb2xlYW4nYCwgYW5kIGZvciBgJ3N0cmluZydgLCBpdCB3aWxsIGluc3RlYWQgcmV0dXJuIGAnU3RyaW5nJ2AuIFRoaXMgaXMgdHJ1ZSBvZiBhbGwgdW5kZXJseWluZyBwcmltaXRpdmUgdHlwZXMuXG4gKlxuICogICBGb3IgaW50ZXJuYWwgZGF0YXR5cGVzLCBpdCB3aWxsIHJldHVybiB0aGUgcmVhbCBjbGFzcyBuYW1lIHByZWZpeGVkIGJ5IHR3byBjb2xvbnMuXG4gKiAgIEZvciBleGFtcGxlLCBgdHlwZU9mKG5ldyBNYXAoKSlgIHdpbGwgcmV0dXJuIGAnOjpNYXAnYC5cbiAqXG4gKiAgIE5vbi1pbnRlcm5hbCB0eXBlcyB3aWxsIG5vdCBiZSBwcmVmaXhlZCwgYWxsb3dpbmcgY3VzdG9tIHR5cGVzIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBpbnRlcm5hbCB0eXBlcyB0byBhbHNvIGJlIGRldGVjdGVkLlxuICogICBGb3IgZXhhbXBsZSwgYGNsYXNzIFRlc3Qge307IHR5cGVPZihuZXcgVGVzdCgpKWAgd2lsbCByZXN1bHQgaW4gdGhlIG5vbi1wcmVmaXhlZCByZXN1bHQgYCdUZXN0J2AuXG4gKlxuICogICBGb3IgcmF3IGBmdW5jdGlvbmAgdHlwZXMsIGB0eXBlT2ZgIHdpbGwgY2hlY2sgaWYgdGhleSBhcmUgYSBjb25zdHJ1Y3RvciBvciBub3QuIElmIGEgY29uc3RydWN0b3IgaXMgZGV0ZWN0ZWQsIHRoZW5cbiAqICAgdGhlIGZvcm1hdCBgJ1tDbGFzcyAke25hbWV9XSdgIHdpbGwgYmUgcmV0dXJuZWQgYXMgdGhlIHR5cGUuIEZvciBpbnRlcm5hbCB0eXBlcyB0aGUgbmFtZSB3aWxsXG4gKiAgIGJlIHByZWZpeGVkLCBpLmUuIGBbQ2xhc3MgOjoke2ludGVybmFsTmFtZX1dYCwgYW5kIGZvciBub24taW50ZXJuYWwgdHlwZXMgd2lsbCBpbnN0ZWFkIGJlIG5vbi1wcmVmaXhlZCwgaS5lLiBgW0NsYXNzICR7bmFtZX1dYCAuXG4gKiAgIEZvciBleGFtcGxlLCBgdHlwZU9mKE1hcClgIHdpbGwgcmV0dXJuIGAnW0NsYXNzIDo6TWFwXSdgLCB3aGVyZWFzIGB0eXBlT2YoVGVzdClgIHdpbGwgcmVzdWx0IGluIGAnW0NsYXNzIFRlc3RdJ2AuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVGhlIHZhbHVlIHdob3NlIHR5cGUgeW91IHdpc2ggdG8gZGlzY292ZXIuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIG5hbWUgb2YgdGhlIHByb3ZpZGVkIHR5cGUsIG9yIGFuIGVtcHR5IHN0cmluZyBgJydgIGlmIHRoZSBwcm92aWRlZCB2YWx1ZSBoYXMgbm8gdHlwZS5cbiAqIG5vdGVzOlxuICogICAtIFRoaXMgbWV0aG9kIHdpbGwgbG9vayBmb3IgYSBbU3ltYm9sLnRvU3RyaW5nVGFnXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9TeW1ib2wvdG9TdHJpbmdUYWcpXG4gKiAgICAga2V5IG9uIHRoZSB2YWx1ZSBwcm92aWRlZC4uLiBhbmQgaWYgZm91bmQsIHdpbGwgdXNlIGl0IHRvIGFzc2lzdCB3aXRoIGZpbmRpbmcgdGhlIGNvcnJlY3QgdHlwZSBuYW1lLlxuICogICAtIElmIHRoZSBgdmFsdWVgIHByb3ZpZGVkIGlzIHR5cGUtbGVzcywgaS5lLiBgdW5kZWZpbmVkYCwgYG51bGxgLCBvciBgTmFOYCwgdGhlbiBhbiBlbXB0eSB0eXBlIGAnJ2Agd2lsbCBiZSByZXR1cm5lZC5cbiAqICAgLSBVc2UgdGhlIGB0eXBlb2ZgIG9wZXJhdG9yIGlmIHlvdSB3YW50IHRvIGRldGVjdCBpZiBhIHR5cGUgaXMgcHJpbWl0aXZlIG9yIG5vdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHR5cGVPZih2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgcmV0dXJuICcnO1xuXG4gIGlmIChPYmplY3QuaXModmFsdWUsIEluZmluaXR5KSB8fCBPYmplY3QuaXModmFsdWUsIC1JbmZpbml0eSkpXG4gICAgcmV0dXJuICc6Ok51bWJlcic7XG5cbiAgbGV0IHRoaXNUeXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodGhpc1R5cGUgPT09ICdiaWdpbnQnKVxuICAgIHJldHVybiAnOjpCaWdJbnQnO1xuXG4gIGlmICh0aGlzVHlwZSA9PT0gJ3N5bWJvbCcpXG4gICAgcmV0dXJuICc6OlN5bWJvbCc7XG5cbiAgaWYgKHRoaXNUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgIGlmICh0aGlzVHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IG5hdGl2ZVR5cGVNZXRhID0gTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEuZmluZCgodHlwZU1ldGEpID0+ICh2YWx1ZSA9PT0gdHlwZU1ldGFbMV0pKTtcbiAgICAgIGlmIChuYXRpdmVUeXBlTWV0YSlcbiAgICAgICAgcmV0dXJuIGBbQ2xhc3MgOjoke25hdGl2ZVR5cGVNZXRhWzBdfV1gO1xuXG4gICAgICBpZiAodmFsdWUucHJvdG90eXBlICYmIHR5cGVvZiB2YWx1ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgSVNfQ0xBU1MudGVzdCgnJyArIHZhbHVlLnByb3RvdHlwZS5jb25zdHJ1Y3RvcikpXG4gICAgICAgIHJldHVybiBgW0NsYXNzICR7dmFsdWUubmFtZX1dYDtcblxuICAgICAgaWYgKHZhbHVlLnByb3RvdHlwZSAmJiB0eXBlb2YgdmFsdWUucHJvdG90eXBlW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddKCk7XG4gICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgcmV0dXJuIGBbQ2xhc3MgJHtyZXN1bHR9XWA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGA6OiR7dGhpc1R5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHt0aGlzVHlwZS5zdWJzdHJpbmcoMSl9YDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSlcbiAgICByZXR1cm4gJzo6QXJyYXknO1xuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFN0cmluZylcbiAgICByZXR1cm4gJzo6U3RyaW5nJztcblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBOdW1iZXIpXG4gICAgcmV0dXJuICc6Ok51bWJlcic7XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQm9vbGVhbilcbiAgICByZXR1cm4gJzo6Qm9vbGVhbic7XG5cbiAgbGV0IG5hdGl2ZVR5cGVNZXRhID0gTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEuZmluZCgodHlwZU1ldGEpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuICh0eXBlTWV0YVswXSAhPT0gJ09iamVjdCcgJiYgdmFsdWUgaW5zdGFuY2VvZiB0eXBlTWV0YVsxXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIGlmIChuYXRpdmVUeXBlTWV0YSlcbiAgICByZXR1cm4gYDo6JHtuYXRpdmVUeXBlTWV0YVswXX1gO1xuXG4gIGlmICh0eXBlb2YgTWF0aCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IE1hdGgpXG4gICAgcmV0dXJuICc6Ok1hdGgnO1xuXG4gIGlmICh0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IEpTT04pXG4gICAgcmV0dXJuICc6OkpTT04nO1xuXG4gIGlmICh0eXBlb2YgQXRvbWljcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IEF0b21pY3MpXG4gICAgcmV0dXJuICc6OkF0b21pY3MnO1xuXG4gIGlmICh0eXBlb2YgUmVmbGVjdCAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgPT09IFJlZmxlY3QpXG4gICAgcmV0dXJuICc6OlJlZmxlY3QnO1xuXG4gIGlmICh2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddKVxuICAgIHJldHVybiAodHlwZW9mIHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10gPT09ICdmdW5jdGlvbicpID8gdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIDogdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXTtcblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpXG4gICAgcmV0dXJuICc6Ok9iamVjdCc7XG5cbiAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ09iamVjdCc7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgUnVudGltZSB0eXBlIHJlZmxlY3Rpb24gaGVscGVyLiBUaGlzIGlzIGludGVuZGVkIHRvIGJlIGEgbW9yZSByb2J1c3QgcmVwbGFjZW1lbnQgZm9yIHRoZSBgaW5zdGFuY2VvZmAgb3BlcmF0b3IuXG4gKlxuICogICBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiBgdHJ1ZWAgaWYgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgKmFueSogb2YgdGhlIHByb3ZpZGVkIGB0eXBlc2AuXG4gKlxuICogICBUaGUgcHJvdmlkZWQgYHR5cGVzYCBjYW4gZWFjaCBlaXRoZXIgYmUgYSByZWFsIHJhdyB0eXBlIChpLmUuIGBTdHJpbmdgIGNsYXNzKSwgb3IgdGhlIG5hbWUgb2YgYSB0eXBlLCBhcyBhIHN0cmluZyxcbiAqICAgaS5lLiBgJzo6U3RyaW5nJ2AuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVGhlIHZhbHVlIHdob3NlIHR5cGUgeW91IHdpc2ggdG8gY29tcGFyZS5cbiAqICAgLSBuYW1lOiAuLi50eXBlc1xuICogICAgIGRhdGFUeXBlOiBBcnJheTxhbnk+XG4gKiAgICAgZGVzYzogQWxsIHR5cGVzIHlvdSB3aXNoIHRvIGNoZWNrIGFnYWluc3QuIFN0cmluZyB2YWx1ZXMgY29tcGFyZSB0eXBlcyBieSBuYW1lLCBmdW5jdGlvbiB2YWx1ZXMgY29tcGFyZSB0eXBlcyBieSBgaW5zdGFuY2VvZmAuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47XG4gKiAgIDEuIFJldHVybiBgdHJ1ZWAgaWYgYHZhbHVlYCBtYXRjaGVzIGFueSBvZiB0aGUgcHJvdmlkZWQgYHR5cGVzYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUodmFsdWUsIC4uLnR5cGVzKSB7XG4gIGNvbnN0IGdldEludGVybmFsVHlwZU5hbWUgPSAodHlwZSkgPT4ge1xuICAgIGxldCBuYXRpdmVUeXBlTWV0YSA9IE5BVElWRV9DTEFTU19UWVBFU19NRVRBLmZpbmQoKHR5cGVNZXRhKSA9PiAodHlwZSA9PT0gdHlwZU1ldGFbMV0pKTtcbiAgICBpZiAobmF0aXZlVHlwZU1ldGEpXG4gICAgICByZXR1cm4gYDo6JHtuYXRpdmVUeXBlTWV0YVswXX1gO1xuICB9O1xuXG4gIGxldCB2YWx1ZVR5cGUgPSB0eXBlT2YodmFsdWUpO1xuICBmb3IgKGxldCB0eXBlIG9mIHR5cGVzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0eXBlT2YodHlwZSwgJzo6U3RyaW5nJykgJiYgdmFsdWVUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiB0eXBlKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGxldCBpbnRlcm5hbFR5cGUgPSBnZXRJbnRlcm5hbFR5cGVOYW1lKHR5cGUpO1xuICAgICAgICBpZiAoaW50ZXJuYWxUeXBlICYmIGludGVybmFsVHlwZSA9PT0gdmFsdWVUeXBlKVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBWZXJpZnkgdGhhdCB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyBhIGBudW1iZXJgIHR5cGUgKG9yIGBOdW1iZXJgIGluc3RhbmNlKSwgYW5kIHRoYXRcbiAqICAgaXQgKippcyBub3QqKiBgTmFOYCwgYEluZmluaXR5YCwgb3IgYC1JbmZpbml0eWAuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVmFsdWUgdG8gY2hlY2tcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYG51bWJlcmAgKG9yIGBOdW1iZXJgIGluc3RhbmNlKSBhbmQgaXMgYWxzbyAqKm5vdCoqIGBOYU5gLCBgSW5maW5pdHlgLCBvciBgLUluZmluaXR5YC4gaS5lLiBgKGlzTnVtYmVyKHZhbHVlKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ZhbGlkTnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiAoaXNUeXBlKHZhbHVlLCAnOjpOdW1iZXInKSAmJiBpc0Zpbml0ZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIFZlcmlmeSB0aGF0IHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIGEgXCJwbGFpblwiL1widmFuaWxsYVwiIE9iamVjdCBpbnN0YW5jZS5cbiAqXG4gKiAgIFRoaXMgbWV0aG9kIGlzIGludGVuZGVkIHRvIGhlbHAgdGhlIGNhbGxlciBkZXRlY3QgaWYgYW4gb2JqZWN0IGlzIGEgXCJyYXcgcGxhaW4gb2JqZWN0XCIsXG4gKiAgIGluaGVyaXRpbmcgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAgKG9yIGEgYG51bGxgIHByb3RvdHlwZSkuXG4gKlxuICogICAxLiBgaXNQbGFpbk9iamVjdCh7fSlgIHdpbGwgcmV0dXJuIGB0cnVlYC5cbiAqICAgMi4gYGlzUGxhaW5PYmplY3QobmV3IE9iamVjdCgpKWAgd2lsbCByZXR1cm4gYHRydWVgLlxuICogICAzLiBgaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKWAgd2lsbCByZXR1cm4gYHRydWVgLlxuICogICA0LiBgaXNQbGFpbk9iamVjdChuZXcgQ3VzdG9tQ2xhc3MoKSlgIHdpbGwgcmV0dXJuIGBmYWxzZWAuXG4gKiAgIDUuIEFsbCBvdGhlciBpbnZvY2F0aW9ucyBzaG91bGQgcmV0dXJuIGBmYWxzZWAuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVmFsdWUgdG8gY2hlY2tcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgXCJyYXdcIi9cInBsYWluXCIgT2JqZWN0IGluc3RhbmNlLlxuICogICAyLiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMudHlwZU9mOy5cbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNUeXBlOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0IHx8IHZhbHVlLmNvbnN0cnVjdG9yID09IG51bGwpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIERldGVjdCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyBhIGphdmFzY3JpcHQgcHJpbWl0aXZlIHR5cGUuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVmFsdWUgdG8gY2hlY2tcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdHlwZW9mIHZhbHVlYCBpcyBvbmUgb2Y6IGBzdHJpbmdgLCBgbnVtYmVyYCwgYGJvb2xlYW5gLCBgYmlnaW50YCwgb3IgYHN5bWJvbGAsXG4gKiAgICAgICphbmQgYWxzbyogYHZhbHVlYCBpcyAqbm90KiBgTmFOYCwgYEluZmluaXR5YCwgYC1JbmZpbml0eWAsIGB1bmRlZmluZWRgLCBvciBgbnVsbGAuXG4gKiAgIDIuIE90aGVyd2lzZSwgYGZhbHNlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy50eXBlT2Y7LlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc1R5cGU7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwgfHwgT2JqZWN0LmlzKHZhbHVlLCBOYU4pKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJylcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoT2JqZWN0LmlzKHZhbHVlLCBJbmZpbml0eSkgfHwgT2JqZWN0LmlzKHZhbHVlLCAtSW5maW5pdHkpKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBpc1R5cGUodmFsdWUsICc6OlN0cmluZycsICc6Ok51bWJlcicsICc6OkJvb2xlYW4nLCAnOjpCaWdJbnQnKTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBEZXRlY3QgaWYgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgZ2FyYmFnZSBjb2xsZWN0YWJsZS5cbiAqXG4gKiAgIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gY2hlY2sgaWYgYW55IGB2YWx1ZWAgaXMgYWxsb3dlZCB0byBiZSB1c2VkIGFzIGEgd2VhayByZWZlcmVuY2UuXG4gKlxuICogICBFc3NlbnRpYWxseSwgdGhpcyB3aWxsIHJldHVybiBgZmFsc2VgIGZvciBhbnkgcHJpbWl0aXZlIHR5cGUsIG9yIGBudWxsYCwgYHVuZGVmaW5lZGAsIGBOYU5gLCBgSW5maW5pdHlgLCBvciBgLUluZmluaXR5YCB2YWx1ZXMuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVmFsdWUgdG8gY2hlY2tcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdHlwZW9mIHZhbHVlYCBpcyBvbmUgb2Y6IGBzdHJpbmdgLCBgbnVtYmVyYCwgYGJvb2xlYW5gLCBgYmlnaW50YCwgb3IgYHN5bWJvbGAsXG4gKiAgICAgICphbmQgYWxzbyogYHZhbHVlYCAqaXMgbm90KiBgTmFOYCwgYEluZmluaXR5YCwgYC1JbmZpbml0eWAsIGB1bmRlZmluZWRgLCBvciBgbnVsbGAuXG4gKiAgIDIuIE90aGVyd2lzZSwgYGZhbHNlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy50eXBlT2Y7LlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc1R5cGU7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNDb2xsZWN0YWJsZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBPYmplY3QuaXModmFsdWUsIE5hTikgfHwgT2JqZWN0LmlzKEluZmluaXR5KSB8fCBPYmplY3QuaXMoLUluZmluaXR5KSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCcpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc1R5cGUodmFsdWUsICc6OlN0cmluZycsICc6Ok51bWJlcicsICc6OkJvb2xlYW4nLCAnOjpCaWdJbnQnKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRGV0ZWN0IGlmIHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIFwiZW1wdHlcIiAoaXMgKipOKip1bGwgKipPKipyICoqRSoqbXB0eSkuXG4gKlxuICogICBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgXCJlbXB0eVwiIGlmIGFueSBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgaXMgbWV0OlxuICogICAxLiBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICogICAyLiBgdmFsdWVgIGlzIGBudWxsYC5cbiAqICAgMy4gYHZhbHVlYCBpcyBgJydgIChhbiBlbXB0eSBzdHJpbmcpLlxuICogICA0LiBgdmFsdWVgIGlzIG5vdCBhbiBlbXB0eSBzdHJpbmcsIGJ1dCBpdCBjb250YWlucyBub3RoaW5nIGV4Y2VwdCB3aGl0ZXNwYWNlIChgXFx0YCwgYFxccmAsIGBcXHNgLCBvciBgXFxuYCkuXG4gKiAgIDUuIGB2YWx1ZWAgaXMgYE5hTmAuXG4gKiAgIDYuIGB2YWx1ZS5sZW5ndGhgIGlzIGEgYE51bWJlcmAgb3IgYG51bWJlcmAgdHlwZSwgYW5kIGlzIGVxdWFsIHRvIGAwYC5cbiAqICAgNy4gYHZhbHVlYCBpcyBhIEBzZWUgQmFzZVV0aWxzLmlzUGxhaW5PYmplY3Q/Y2FwdGlvbj1wbGFpbitvYmplY3Q7IGFuZCBoYXMgbm8gaXRlcmFibGUga2V5cy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGFueSBvZiB0aGUgXCJlbXB0eVwiIGNvbmRpdGlvbnMgYWJvdmUgYXJlIHRydWUuXG4gKiAgIDIuIE90aGVyd2lzZSwgYGZhbHNlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc05vdE5PRTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc05PRSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoT2JqZWN0LmlzKHZhbHVlLCBOYU4pKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmICh2YWx1ZSA9PT0gJycpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJykgJiYgKC9eW1xcdFxcc1xcclxcbl0qJC8pLnRlc3QodmFsdWUpKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChpc1R5cGUodmFsdWUubGVuZ3RoLCAnOjpOdW1iZXInKSlcbiAgICByZXR1cm4gKHZhbHVlLmxlbmd0aCA9PT0gMCk7XG5cbiAgaWYgKGlzUGxhaW5PYmplY3QodmFsdWUpICYmIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIERldGVjdCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyAqKm5vdCoqIFwiZW1wdHlcIiAoaXMgbm90ICoqTioqdWxsICoqTyoqciAqKkUqKm1wdHkpLlxuICpcbiAqICAgQSB2YWx1ZSBpcyBjb25zaWRlcmVkIFwiZW1wdHlcIiBpZiBhbnkgb2YgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGlzIG1ldDpcbiAqICAgMS4gYHZhbHVlYCBpcyBgdW5kZWZpbmVkYC5cbiAqICAgMi4gYHZhbHVlYCBpcyBgbnVsbGAuXG4gKiAgIDMuIGB2YWx1ZWAgaXMgYCcnYCAoYW4gZW1wdHkgc3RyaW5nKS5cbiAqICAgNC4gYHZhbHVlYCBpcyBub3QgYW4gZW1wdHkgc3RyaW5nLCBidXQgaXQgY29udGFpbnMgbm90aGluZyBleGNlcHQgd2hpdGVzcGFjZSAoYFxcdGAsIGBcXHJgLCBgXFxzYCwgb3IgYFxcbmApLlxuICogICA1LiBgdmFsdWVgIGlzIGBOYU5gLlxuICogICA2LiBgdmFsdWUubGVuZ3RoYCBpcyBhIGBOdW1iZXJgIG9yIGBudW1iZXJgIHR5cGUsIGFuZCBpcyBlcXVhbCB0byBgMGAuXG4gKiAgIDcuIGB2YWx1ZWAgaXMgYSBAc2VlIEJhc2VVdGlscy5pc1BsYWluT2JqZWN0P2NhcHRpb249cGxhaW4rb2JqZWN0OyBhbmQgaGFzIG5vIGl0ZXJhYmxlIGtleXMuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogVmFsdWUgdG8gY2hlY2tcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGBmYWxzZWAgaWYgYW55IG9mIHRoZSBcImVtcHR5XCIgY29uZGl0aW9ucyBhYm92ZSBhcmUgdHJ1ZS5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgdHJ1ZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgaXMgdGhlIGV4YWN0IGludmVyc2Ugb2YgQHNlZSBCYXNlVXRpbHMuaXNOT0U7XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzTk9FOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTm90Tk9FKHZhbHVlKSB7XG4gIHJldHVybiAhaXNOT0UodmFsdWUpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENvbnZlcnQgdGhlIHByb3ZpZGVkIGBzdHJpbmdgIGB2YWx1ZWAgaW50byBbY2FtZWxDYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNDYW1lbF9jYXNlKS5cbiAqXG4gKiAgIFRoZSBwcm9jZXNzIGlzIHJvdWdobHkgYXMgZm9sbG93czpcbiAqICAgMS4gQW55IG5vbi13b3JkIGNoYXJhY3RlcnMgKFthLXpBLVowLTlfXSkgYXJlIHN0cmlwcGVkIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nLlxuICogICAyLiBBbnkgbm9uLXdvcmQgY2hhcmFjdGVycyAoW2EtekEtWjAtOV9dKSBhcmUgc3RyaXBwZWQgZnJvbSB0aGUgZW5kIG9mIHRoZSBzdHJpbmcuXG4gKiAgIDMuIEVhY2ggXCJ3b3JkXCIgaXMgY2FwaXRhbGl6ZWQuXG4gKiAgIDQuIFRoZSBmaXJzdCBsZXR0ZXIgaXMgYWx3YXlzIGxvd2VyLWNhc2VkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFN0cmluZyB0byBjb252ZXJ0IGludG8gW2NhbWVsQ2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjQ2FtZWxfY2FzZSkuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIGZvcm1hdHRlZCBzdHJpbmcgaW4gW2NhbWVsQ2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjQ2FtZWxfY2FzZSkuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IEJhc2VVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gKlxuICogICAgIGNvbnNvbGUubG9nKEJhc2VVdGlscy50b0NhbWVsQ2FzZSgnLS10ZXN0LXNvbWVfdmFsdWVfQCcpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gJ3Rlc3RTb21lVmFsdWUnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b0NhbWVsQ2FzZSh2YWx1ZSkge1xuICByZXR1cm4gKCcnICsgdmFsdWUpXG4gICAgLnJlcGxhY2UoL15cXFcvLCAnJylcbiAgICAucmVwbGFjZSgvW1xcV10rJC8sICcnKVxuICAgIC5yZXBsYWNlKC8oW0EtWl0rKS9nLCAnLSQxJylcbiAgICAudG9Mb3dlckNhc2UoKVxuICAgIC5yZXBsYWNlKC9cXFcrKC4pL2csIChtLCBwKSA9PiB7XG4gICAgICByZXR1cm4gcC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gICAgLnJlcGxhY2UoL14oLikoLiopJC8sIChtLCBmLCBsKSA9PiBgJHtmLnRvTG93ZXJDYXNlKCl9JHtsfWApO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENvbnZlcnQgdGhlIHByb3ZpZGVkIGBzdHJpbmdgIGB2YWx1ZWAgaW50byBbc25ha2VfY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjU25ha2VfY2FzZSkuXG4gKlxuICogICBUaGUgcHJvY2VzcyBpcyByb3VnaGx5IGFzIGZvbGxvd3M6XG4gKiAgIDEuIEFueSBjYXBpdGFsaXplZCBjaGFyYWN0ZXIgc2VxdWVuY2UgaXMgcHJlZml4ZWQgYnkgYW4gdW5kZXJzY29yZS5cbiAqICAgMi4gTW9yZSB0aGFuIG9uZSBzZXF1ZW50aWFsIHVuZGVyc2NvcmVzIGFyZSBjb252ZXJ0ZWQgaW50byBhIHNpbmdsZSB1bmRlcnNjb3JlLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFN0cmluZyB0byBjb252ZXJ0IGludG8gW3NuYWtlX2Nhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI1NuYWtlX2Nhc2UpLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IFRoZSBmb3JtYXR0ZWQgc3RyaW5nIGluIFtzbmFrZV9jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTbmFrZV9jYXNlKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLnRvU25ha2VDYXNlKCdUaGlzSXNBU2VudGVuY2UnKSk7XG4gKiAgICAgLy8gb3V0cHV0IC0+ICd0aGlzX2lzX2Ffc2VudGVuY2UnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1NuYWtlQ2FzZSh2YWx1ZSkge1xuICByZXR1cm4gKCcnICsgdmFsdWUpXG4gICAgLnJlcGxhY2UoL1tBLVpdKy9nLCAobSwgb2Zmc2V0KSA9PiAoKG9mZnNldCkgPyBgXyR7bS50b0xvd2VyQ2FzZSgpfWAgOiBtLnRvTG93ZXJDYXNlKCkpKVxuICAgIC5yZXBsYWNlKC9fezIsfS9nLCAnXycpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29udmVydCB0aGUgcHJvdmlkZWQgYHN0cmluZ2AgYHZhbHVlYCBpbnRvIFtrZWJhYi1jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNLZWJhYl9jYXNlKS5cbiAqXG4gKiAgIFRoZSBwcm9jZXNzIGlzIHJvdWdobHkgYXMgZm9sbG93czpcbiAqICAgMS4gQW55IGNhcGl0YWxpemVkIGNoYXJhY3RlciBzZXF1ZW5jZSBpcyBwcmVmaXhlZCBieSBhIGh5cGhlbi5cbiAqICAgMi4gTW9yZSB0aGFuIG9uZSBzZXF1ZW50aWFsIGh5cGhlbnMgYXJlIGNvbnZlcnRlZCBpbnRvIGEgc2luZ2xlIGh5cGhlbi5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBTdHJpbmcgdG8gdHVybiBpbnRvIFtrZWJhYi1jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNLZWJhYl9jYXNlKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgZm9ybWF0dGVkIHN0cmluZyBpbiBba2ViYWItY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjS2ViYWJfY2FzZSkuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IEJhc2VVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gKlxuICogICAgIGNvbnNvbGUubG9nKEJhc2VVdGlscy50b0tlYmFiQ2FzZSgnVGhpc0lzQVNlbnRlbmNlJykpO1xuICogICAgIC8vIG91dHB1dCAtPiAndGhpcy1pcy1hLXNlbnRlbmNlJ1xuICogICAgIGBgYFxuICovXG5cbmNvbnN0IElTX0xBU1RfQ0hBUl9VUFBFUkNBU0UgPSAvW0EtWl0kLztcbmV4cG9ydCBmdW5jdGlvbiB0b0tlYmFiQ2FzZSh2YWx1ZSkge1xuICByZXR1cm4gKCcnICsgdmFsdWUpXG4gICAgLnJlcGxhY2UoL1tBLVpdW2Etel0rfFtBLVpdezIsfS9nLCAobSwgb2Zmc2V0KSA9PiB7XG4gICAgICBpZiAobS5sZW5ndGggPiAxICYmIElTX0xBU1RfQ0hBUl9VUFBFUkNBU0UudGVzdChtKSlcbiAgICAgICAgcmV0dXJuIChgJHsob2Zmc2V0KSA/ICctJyA6ICcnfSR7bS5zbGljZSgwLCAtMSl9LSR7bS5zbGljZSgtMSl9YCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgcmV0dXJuICgob2Zmc2V0KSA/IGAtJHttLnRvTG93ZXJDYXNlKCl9YCA6IG0udG9Mb3dlckNhc2UoKSk7XG4gICAgfSlcbiAgICAucmVwbGFjZSgvLXsyLH0vZywgJy0nKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIERvIG91ciBiZXN0IHRvIGVtdWxhdGUgW3Byb2Nlc3MubmV4dFRpY2tdKGh0dHBzOi8vbm9kZWpzLm9yZy9lbi9ndWlkZXMvZXZlbnQtbG9vcC10aW1lcnMtYW5kLW5leHR0aWNrLyNwcm9jZXNzbmV4dHRpY2spXG4gKiAgIGluIHRoZSBicm93c2VyLlxuICpcbiAqICAgSW4gb3JkZXIgdG8gdHJ5IGFuZCBlbXVsYXRlIGBwcm9jZXNzLm5leHRUaWNrYCwgdGhpcyBmdW5jdGlvbiB3aWxsIHVzZSBgZ2xvYmFsVGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gY2FsbGJhY2soKSlgIGlmIGF2YWlsYWJsZSxcbiAqICAgb3RoZXJ3aXNlIGl0IHdpbGwgZmFsbGJhY2sgdG8gdXNpbmcgYFByb21pc2UucmVzb2x2ZSgpLnRoZW4oY2FsbGJhY2spYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBjYWxsYmFja1xuICogICAgIGRhdGFUeXBlOiBmdW5jdGlvblxuICogICAgIGRlc2M6IENhbGxiYWNrIGZ1bmN0aW9uIHRvIGNhbGwgb24gXCJuZXh0VGlja1wiLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUaGlzIGZ1bmN0aW9uIHdpbGwgcHJlZmVyIGFuZCB1c2UgYHByb2Nlc3MubmV4dFRpY2tgIGlmIGl0IGlzIGF2YWlsYWJsZSAoaS5lLiBpZiBydW5uaW5nIG9uIE5vZGVKUykuXG4gKiAgIC0gfFxuICogICAgIDp3YXJuaW5nOiBUaGlzIGZ1bmN0aW9uIGlzIHVubGlrZWx5IHRvIGFjdHVhbGx5IGJlIHRoZSBuZXh0IFwidGlja1wiIG9mIHRoZSB1bmRlcmx5aW5nXG4gKiAgICAgamF2YXNjcmlwdCBlbmdpbmUuIFRoaXMgbWV0aG9kIGp1c3QgZG9lcyBpdHMgYmVzdCB0byBlbXVsYXRlIFwibmV4dFRpY2tcIi4gSW5zdGVhZCBvZiB0aGVcbiAqICAgICBhY3R1YWwgXCJuZXh0IHRpY2tcIiwgdGhpcyB3aWxsIGluc3RlYWQgYmUgXCJhcyBmYXN0IGFzIHBvc3NpYmxlXCIuXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUaGlzIGZ1bmN0aW9uIGRlbGliZXJhdGVseSBhdHRlbXB0cyB0byB1c2UgYHJlcXVlc3RBbmltYXRpb25GcmFtZWAgZmlyc3QtLWV2ZW4gdGhvdWdoIGl0IGxpa2VseSBkb2Vzbid0XG4gKiAgICAgaGF2ZSB0aGUgZmFzdGVzdCB0dXJuLWFyb3VuZC10aW1lLS10byBzYXZlIGJhdHRlcnkgcG93ZXIuIFRoZSBpZGVhIGJlaW5nIHRoYXQgXCJzb21ldGhpbmcgbmVlZHMgdG8gYmUgZG9uZSAqc29vbipcIi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5leHRUaWNrKGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHByb2Nlc3MubmV4dFRpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGNhbGxiYWNrKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBnbG9iYWxUaGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIChuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pKS50aGVuKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgSVNfTlVNQkVSID0gL14oWy0rXT8pKFxcZCooPzpcXC5cXGQrKT8pKGVbLStdXFxkKyk/JC87XG5jb25zdCBJU19CT09MRUFOID0gL14odHJ1ZXxmYWxzZSkkLztcblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBDb2VyY2UgYSBzdHJpbmcgdG8gaXRzIG1vc3QgbGlrZWx5IHVuZGVybHlpbmcgcHJpbWl0aXZlIHR5cGUuXG4gKlxuICogICBDb252ZXJzaW9uIGlucHV0IGFuZCBvdXRwdXQgdGFibGU6XG4gKiAgICogYCdudWxsJ2AgY29udmVydHMgdG8gYG51bGxgXG4gKiAgICogYCd1bmRlZmluZWQnYCBjb252ZXJ0cyB0byBgdW5kZWZpbmVkYFxuICogICAqIGAnTmFOJ2AgY29udmVydHMgdG8gYE5hTmBcbiAqICAgKiBgJ0luZmluaXR5J2AgY29udmVydHMgdG8gYEluZmluaXR5YFxuICogICAqIGAnLUluZmluaXR5J2AgY29udmVydHMgdG8gYC1JbmZpbml0eWBcbiAqICAgKiBgJ3RydWUnYCBjb252ZXJ0cyB0byBgdHJ1ZWBcbiAqICAgKiBgJ2ZhbHNlJ2AgY29udmVydHMgdG8gYGZhbHNlYFxuICogICAqIEFueSBwYXJzYWJsZSBudW1lcmljIHN0cmluZyB2YWx1ZSAoaW5jbHVkaW5nIFtFIG5vdGF0aW9uXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TY2llbnRpZmljX25vdGF0aW9uI0Vfbm90YXRpb24pKSBjb252ZXJ0cyB0byBgbnVtYmVyYFxuICpcbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjb252ZXJ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29lcmNlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gJ251bGwnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcblxuICBpZiAodmFsdWUgPT09ICdOYU4nKVxuICAgIHJldHVybiBOYU47XG5cbiAgaWYgKHZhbHVlID09PSAnSW5maW5pdHknIHx8IHZhbHVlID09PSAnK0luZmluaXR5JylcbiAgICByZXR1cm4gSW5maW5pdHk7XG5cbiAgaWYgKHZhbHVlID09PSAnLUluZmluaXR5JylcbiAgICByZXR1cm4gLUluZmluaXR5O1xuXG4gIGlmIChJU19OVU1CRVIudGVzdCh2YWx1ZSkpXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW1hZ2ljLW51bWJlcnNcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSwgMTApO1xuXG4gIGlmIChJU19CT09MRUFOLnRlc3QodmFsdWUpKVxuICAgIHJldHVybiAodmFsdWUgPT09ICd0cnVlJyk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuIiwiaW1wb3J0IHtcbiAgTVlUSElYX0lOVEVSU0VDVElPTl9PQlNFUlZFUlMsXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0ICogYXMgQmFzZVV0aWxzICAgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzICAgICAgIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgRWxlbWVudHMgICAgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBDb21wb25lbnRVdGlsc1xuICogZ3JvdXBOYW1lOiBDb21wb25lbnRVdGlsc1xuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgQ29tcG9uZW50VXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIENvbXBvbmVudCBhbmQgZnJhbWV3b3JrIGNsYXNzZXMgYW5kIGZ1bmN0aW9uYWxpdHkgYXJlIGZvdW5kIGhlcmUuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aWZpZXIodGFyZ2V0KSB7XG4gIGlmICghdGFyZ2V0KVxuICAgIHJldHVybiAndW5kZWZpbmVkJztcblxuICBpZiAodHlwZW9mIHRhcmdldC5nZXRJZGVudGlmaWVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB0YXJnZXQuZ2V0SWRlbnRpZmllci5jYWxsKHRhcmdldCk7XG5cbiAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQpXG4gICAgcmV0dXJuIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScpIHx8IEJhc2VVdGlscy50b0NhbWVsQ2FzZSh0YXJnZXQubG9jYWxOYW1lKTtcblxuICByZXR1cm4gJ3VuZGVmaW5lZCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVVJMKHJvb3RMb2NhdGlvbiwgX3VybGlzaCkge1xuICBsZXQgdXJsaXNoID0gX3VybGlzaDtcbiAgaWYgKHVybGlzaCBpbnN0YW5jZW9mIFVSTClcbiAgICB1cmxpc2ggPSB1cmxpc2gudG9TdHJpbmcoKTtcblxuICBpZiAoIXVybGlzaClcbiAgICB1cmxpc2ggPSAnJztcblxuICBpZiAoIUJhc2VVdGlscy5pc1R5cGUodXJsaXNoLCAnOjpTdHJpbmcnKSlcbiAgICByZXR1cm47XG5cbiAgbGV0IHVybCA9IG5ldyBVUkwodXJsaXNoLCBuZXcgVVJMKHJvb3RMb2NhdGlvbikpO1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMubXl0aGl4VUkudXJsUmVzb2x2ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsZXQgZmlsZU5hbWUgID0gJyc7XG4gICAgbGV0IHBhdGggICAgICA9ICcvJztcblxuICAgIHVybC5wYXRobmFtZS5yZXBsYWNlKC9eKC4qXFwvKShbXi9dKykkLywgKG0sIGZpcnN0LCBzZWNvbmQpID0+IHtcbiAgICAgIHBhdGggPSBmaXJzdC5yZXBsYWNlKC9cXC8rJC8sICcvJyk7XG4gICAgICBpZiAocGF0aC5jaGFyQXQocGF0aC5sZW5ndGggLSAxKSAhPT0gJy8nKVxuICAgICAgICBwYXRoID0gYCR7cGF0aH0vYDtcblxuICAgICAgZmlsZU5hbWUgPSBzZWNvbmQ7XG4gICAgICByZXR1cm4gbTtcbiAgICB9KTtcblxuICAgIGxldCBuZXdTcmMgPSBnbG9iYWxUaGlzLm15dGhpeFVJLnVybFJlc29sdmVyLmNhbGwodGhpcywgeyBzcmM6IHVybGlzaCwgdXJsLCBwYXRoLCBmaWxlTmFtZSB9KTtcbiAgICBpZiAobmV3U3JjID09PSBmYWxzZSkge1xuICAgICAgY29uc29sZS53YXJuKGBcIm15dGhpeC1yZXF1aXJlXCI6IE5vdCBsb2FkaW5nIFwiJHt1cmxpc2h9XCIgYmVjYXVzZSB0aGUgZ2xvYmFsIFwibXl0aGl4VUkudXJsUmVzb2x2ZXJcIiByZXF1ZXN0ZWQgSSBub3QgZG8gc28uYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG5ld1NyYyAmJiAobmV3U3JjLnRvU3RyaW5nKCkgIT09IHVybC50b1N0cmluZygpICYmIG5ld1NyYy50b1N0cmluZygpICE9PSB1cmxpc2gpKVxuICAgICAgdXJsID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIHJvb3RMb2NhdGlvbiwgbmV3U3JjKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFICAgICAgICAgPSAvXih0ZW1wbGF0ZSkkL2k7XG5jb25zdCBJU19TQ1JJUFQgICAgICAgICAgID0gL14oc2NyaXB0KSQvaTtcbmNvbnN0IElTX0hFQURfVEFHICAgICAgICAgPSAvXihzdHlsZXxsaW5rfG1ldGEpJC9pO1xuY29uc3QgU0hPVUxEX0lHTk9SRSAgICAgICA9IC9eKGJhc2V8bm9zY3JpcHR8dGl0bGUpJC9pO1xuY29uc3QgUkVRVUlSRV9DQUNIRSAgICAgICA9IG5ldyBNYXAoKTtcbmNvbnN0IFJFU09MVkVfU1JDX0VMRU1FTlQgPSAvXnNjcmlwdHxsaW5rfHN0eWxlfG15dGhpeC1sYW5ndWFnZS1wYWNrfG15dGhpeC1yZXF1aXJlJC9pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW1wb3J0SW50b0RvY3VtZW50RnJvbVNvdXJjZShvd25lckRvY3VtZW50LCBsb2NhdGlvbiwgX3VybCwgc291cmNlU3RyaW5nLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCB1cmwgICAgICAgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgbG9jYXRpb24sIF91cmwsIG9wdGlvbnMubWFnaWMpO1xuICBsZXQgZmlsZU5hbWU7XG4gIGxldCBiYXNlVVJMICAgPSBuZXcgVVJMKGAke3VybC5vcmlnaW59JHt1cmwucGF0aG5hbWUucmVwbGFjZSgvW14vXSskLywgKG0pID0+IHtcbiAgICBmaWxlTmFtZSA9IG07XG4gICAgcmV0dXJuICcnO1xuICB9KX0ke3VybC5zZWFyY2h9JHt1cmwuaGFzaH1gKTtcblxuICBsZXQgdGVtcGxhdGUgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gIHRlbXBsYXRlLmlubmVySFRNTCA9IHNvdXJjZVN0cmluZztcblxuICBsZXQgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGRyZW4pLnNvcnQoKGEsIGIpID0+IHtcbiAgICBsZXQgeCA9IGEudGFnTmFtZTtcbiAgICBsZXQgeSA9IGIudGFnTmFtZTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcbiAgICBpZiAoeCA9PSB5KVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICByZXR1cm4gKHggPCB5KSA/IDEgOiAtMTtcbiAgfSk7XG5cbiAgY29uc3QgZmlsZU5hbWVUb0VsZW1lbnROYW1lID0gKGZpbGVOYW1lKSA9PiB7XG4gICAgcmV0dXJuIGZpbGVOYW1lLnRyaW0oKS5yZXBsYWNlKC9cXC4uKiQvLCAnJykucmVwbGFjZSgvXFxiW0EtWl18W15BLVpdW0EtWl0vZywgKF9tKSA9PiB7XG4gICAgICBsZXQgbSA9IF9tLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gKG0ubGVuZ3RoIDwgMikgPyBgLSR7bX1gIDogYCR7bS5jaGFyQXQoMCl9LSR7bS5jaGFyQXQoMSl9YDtcbiAgICB9KS5yZXBsYWNlKC8tezIsfS9nLCAnLScpLnJlcGxhY2UoL15bXmEtel0qLywgJycpLnJlcGxhY2UoL1teYS16XSokLywgJycpO1xuICB9O1xuXG4gIGxldCBndWVzc2VkRWxlbWVudE5hbWUgID0gZmlsZU5hbWVUb0VsZW1lbnROYW1lKGZpbGVOYW1lKTtcbiAgbGV0IGNvbnRleHQgICAgICAgICAgICAgPSB7XG4gICAgZ3Vlc3NlZEVsZW1lbnROYW1lLFxuICAgIGNoaWxkcmVuLFxuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgdGVtcGxhdGUsXG4gICAgdXJsLFxuICAgIGJhc2VVUkwsXG4gICAgZmlsZU5hbWUsXG4gIH07XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLnByZVByb2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0ZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGUgPSBvcHRpb25zLnByZVByb2Nlc3MuY2FsbCh0aGlzLCBjb250ZXh0KTtcbiAgICBjaGlsZHJlbiA9IEFycmF5LmZyb20odGVtcGxhdGUuY29udGVudC5jaGlsZHJlbik7XG4gIH1cblxuICBsZXQgbm9kZUhhbmRsZXIgICA9IG9wdGlvbnMubm9kZUhhbmRsZXI7XG4gIGxldCB0ZW1wbGF0ZUNvdW50ID0gY2hpbGRyZW4ucmVkdWNlKChzdW0sIGVsZW1lbnQpID0+ICgoSVNfVEVNUExBVEUudGVzdChlbGVtZW50LnRhZ05hbWUpKSA/IChzdW0gKyAxKSA6IHN1bSksIDApO1xuXG4gIGNvbnRleHQudGVtcGxhdGVDb3VudCA9IHRlbXBsYXRlQ291bnQ7XG5cbiAgY29uc3QgcmVzb2x2ZUVsZW1lbnRTcmNBdHRyaWJ1dGUgPSAoZWxlbWVudCwgYmFzZVVSTCkgPT4ge1xuICAgIC8vIFJlc29sdmUgXCJzcmNcIiBhdHRyaWJ1dGUsIHNpbmNlIHdlIGFyZVxuICAgIC8vIGdvaW5nIHRvIGJlIG1vdmluZyB0aGUgZWxlbWVudCBhcm91bmRcbiAgICBsZXQgc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmIChzcmMpIHtcbiAgICAgIHNyYyA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBiYXNlVVJMLCBzcmMsIGZhbHNlKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH07XG5cbiAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICBpZiAob3B0aW9ucy5tYWdpYyAmJiBSRVNPTFZFX1NSQ19FTEVNRU5ULnRlc3QoY2hpbGQubG9jYWxOYW1lKSlcbiAgICAgIGNoaWxkID0gcmVzb2x2ZUVsZW1lbnRTcmNBdHRyaWJ1dGUoY2hpbGQsIGJhc2VVUkwpO1xuXG4gICAgaWYgKFNIT1VMRF9JR05PUkUudGVzdChjaGlsZC50YWdOYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfSBlbHNlIGlmIChJU19URU1QTEFURS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDx0ZW1wbGF0ZT5cbiAgICAgIGlmICh0ZW1wbGF0ZUNvdW50ID09PSAxICYmIGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1mb3InKSA9PSBudWxsICYmIGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWUnKSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgJHt1cmx9OiA8dGVtcGxhdGU+IGlzIG1pc3NpbmcgYSBcImRhdGEtZm9yXCIgYXR0cmlidXRlLCBsaW5raW5nIGl0IHRvIGl0cyBvd25lciBjb21wb25lbnQuIEd1ZXNzaW5nIFwiJHtndWVzc2VkRWxlbWVudE5hbWV9XCIuYCk7XG4gICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1mb3InLCBndWVzc2VkRWxlbWVudE5hbWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nICYmIG5vZGVIYW5kbGVyLmNhbGwodGhpcywgY2hpbGQsIHsgLi4uY29udGV4dCwgaXNUZW1wbGF0ZTogdHJ1ZSwgaXNIYW5kbGVkOiB0cnVlIH0pID09PSBmYWxzZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIC8vIGFwcGVuZCB0byBib2R5XG4gICAgICBsZXQgZWxlbWVudE5hbWUgPSAoY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpIHx8IGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWUnKSk7XG4gICAgICBpZiAoIW93bmVyRG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1mb3I9XCIke2VsZW1lbnROYW1lfVwiIGldLFtkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZT1cIiR7ZWxlbWVudE5hbWV9XCIgaV1gKSlcbiAgICAgICAgb3duZXJEb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9IGVsc2UgaWYgKElTX1NDUklQVC50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDxzY3JpcHQ+XG4gICAgICBsZXQgY2hpbGRDbG9uZSA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudChjaGlsZC50YWdOYW1lKTtcbiAgICAgIGZvciAobGV0IGF0dHJpYnV0ZU5hbWUgb2YgY2hpbGQuZ2V0QXR0cmlidXRlTmFtZXMoKSkge1xuICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3NyYycpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgY2hpbGQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNyYyA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIHNyYyA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBiYXNlVVJMLCBzcmMsIGZhbHNlKTtcbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYy50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoaWxkQ2xvbmUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ21vZHVsZScpO1xuICAgICAgICBjaGlsZENsb25lLmlubmVySFRNTCA9IGNoaWxkLnRleHRDb250ZW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nICYmIG5vZGVIYW5kbGVyLmNhbGwodGhpcywgY2hpbGRDbG9uZSwgeyAuLi5jb250ZXh0LCBpc1NjcmlwdDogdHJ1ZSwgaXNIYW5kbGVkOiB0cnVlIH0pID09PSBmYWxzZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzY3JpcHRJRCA9IGNoaWxkQ2xvbmUuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgaWYgKCFzY3JpcHRJRCkge1xuICAgICAgICBzY3JpcHRJRCA9IGBJRCR7QmFzZVV0aWxzLlNIQTI1NihgJHtndWVzc2VkRWxlbWVudE5hbWV9OiR7c3JjIHx8IGNoaWxkQ2xvbmUuaW5uZXJIVE1MfWApfWA7XG4gICAgICAgIGNoaWxkQ2xvbmUuc2V0QXR0cmlidXRlKCdpZCcsIHNjcmlwdElEKTtcbiAgICAgIH1cblxuICAgICAgLy8gYXBwZW5kIHRvIGhlYWRcbiAgICAgIGlmICghb3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNjcmlwdElEKSlcbiAgICAgICAgb3duZXJEb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGNoaWxkQ2xvbmUpO1xuICAgIH0gZWxzZSBpZiAoSVNfSEVBRF9UQUcudGVzdChjaGlsZC50YWdOYW1lKSkgeyAvLyA8bGluaz4gJiA8c3R5bGU+XG4gICAgICBsZXQgaXNTdHlsZSA9ICgvXnN0eWxlJC9pKS50ZXN0KGNoaWxkLnRhZ05hbWUpO1xuICAgICAgaWYgKHR5cGVvZiBub2RlSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJyAmJiBub2RlSGFuZGxlci5jYWxsKHRoaXMsIGNoaWxkLCB7IC4uLmNvbnRleHQsIGlzU3R5bGUsIGlzTGluazogIWlzU3R5bGUsIGlzSGFuZGxlZDogdHJ1ZSB9KSA9PT0gZmFsc2UpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBsZXQgc3R5bGVJRCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgIGlmICghc3R5bGVJRCkge1xuICAgICAgICBzdHlsZUlEID0gYElEJHtCYXNlVXRpbHMuU0hBMjU2KGNoaWxkLm91dGVySFRNTCl9YDtcbiAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCdpZCcsIHN0eWxlSUQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBlbmQgdG8gaGVhZFxuICAgICAgaWYgKCFvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7Y2hpbGQudGFnTmFtZX0jJHtzdHlsZUlEfWApKVxuICAgICAgICBvd25lckRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH0gZWxzZSBpZiAoKC9ebWV0YSQvaSkudGVzdChjaGlsZC50YWdOYW1lKSkgeyAvLyA8bWV0YT5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZUhhbmRsZXIgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIG5vZGVIYW5kbGVyLmNhbGwodGhpcywgY2hpbGQsIHsgLi4uY29udGV4dCwgaXNNZXRhOiB0cnVlLCBpc0hhbmRsZWQ6IHRydWUgfSk7XG5cbiAgICAgIC8vIGRvIG5vdGhpbmcgd2l0aCB0aGVzZSB0YWdzXG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2UgeyAvLyBFdmVyeXRoaW5nIGVsc2VcbiAgICAgIGxldCBpc0hhbmRsZWQgPSBmYWxzZTtcblxuICAgICAgaWYgKGNoaWxkLmxvY2FsTmFtZSA9PT0gJ215dGhpeC1sYW5ndWFnZS1wYWNrJykge1xuICAgICAgICBsZXQgbGFuZ1BhY2tJRCA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgaWYgKCFsYW5nUGFja0lEKSB7XG4gICAgICAgICAgbGFuZ1BhY2tJRCA9IGBJRCR7QmFzZVV0aWxzLlNIQTI1NihgJHtndWVzc2VkRWxlbWVudE5hbWV9OiR7Y2hpbGQub3V0ZXJIVE1MfWApfWA7XG4gICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCdpZCcsIGxhbmdQYWNrSUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxhbmd1YWdlUHJvdmlkZXIgPSB0aGlzLmNsb3Nlc3QoJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuICAgICAgICBpZiAoIWxhbmd1YWdlUHJvdmlkZXIpXG4gICAgICAgICAgbGFuZ3VhZ2VQcm92aWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuXG4gICAgICAgIGlmIChsYW5ndWFnZVByb3ZpZGVyKSB7XG4gICAgICAgICAgaWYgKCFsYW5ndWFnZVByb3ZpZGVyLnF1ZXJ5U2VsZWN0b3IoYG15dGhpeC1sYW5ndWFnZS1wYWNrIyR7bGFuZ1BhY2tJRH1gKSlcbiAgICAgICAgICAgIGxhbmd1YWdlUHJvdmlkZXIuaW5zZXJ0QmVmb3JlKGNoaWxkLCBsYW5ndWFnZVByb3ZpZGVyLmZpcnN0Q2hpbGQpO1xuXG4gICAgICAgICAgaXNIYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgfSAvLyBlbHNlIGRvIG5vdGhpbmcuLi4gbGV0IGl0IGJlIGR1bXBlZCBpbnRvIHRoZSBkb20gbGF0ZXJcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBub2RlSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZCwgeyAuLi5jb250ZXh0LCBpc0hhbmRsZWQgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLnBvc3RQcm9jZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdGVtcGxhdGUgPSBjb250ZXh0LnRlbXBsYXRlID0gb3B0aW9ucy5wb3N0UHJvY2Vzcy5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICAgIGNoaWxkcmVuID0gQXJyYXkuZnJvbSh0ZW1wbGF0ZS5jb250ZW50LmNoaWxkcmVuKTtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQ29tcG9uZW50VXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgTG9hZCBhIHJlc291cmNlIGZyb20gYSBVUkwgd2l0aCBjYWNoaW5nIHN1cHBvcnQuXG4gKlxuICogICBCeSBkZWZhdWx0LCB1c2VzIGBjYWNoZTogJ2RlZmF1bHQnYCB3aGljaCByZXNwZWN0cyBIVFRQIGNhY2hpbmcgaGVhZGVyc1xuICogICAoQ2FjaGUtQ29udHJvbCwgRVRhZywgZXRjLikuIFRoZSBjYWNoZSBtb2RlIGNhbiBiZSBvdmVycmlkZGVuIHZpYTpcbiAqICAgLSBVUkwgcXVlcnkgcGFyYW1ldGVyOiBgP2NhY2hlPW5vLXN0b3JlYFxuICogICAtIGZldGNoT3B0aW9ucy5jYWNoZTogYHsgZmV0Y2hPcHRpb25zOiB7IGNhY2hlOiAnbm8tY2FjaGUnIH0gfWBcbiAqXG4gKiAgIFN1cHBvcnRlZCBjYWNoZSB2YWx1ZXM6XG4gKiAgIC0gJ2RlZmF1bHQnOiBCcm93c2VyIHVzZXMgSFRUUCBjYWNoZSBoZWFkZXJzIChyZWNvbW1lbmRlZClcbiAqICAgLSAnbm8tc3RvcmUnOiBCeXBhc3MgY2FjaGUgY29tcGxldGVseVxuICogICAtICdyZWxvYWQnOiBGZXRjaCBmcmVzaCBidXQgdXBkYXRlIGNhY2hlXG4gKiAgIC0gJ25vLWNhY2hlJzogQWx3YXlzIHJldmFsaWRhdGUgd2l0aCBzZXJ2ZXJcbiAqICAgLSAnZm9yY2UtY2FjaGUnOiBVc2UgY2FjaGUgaWYgYXZhaWxhYmxlLCBldmVuIGlmIHN0YWxlXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlKHVybE9yTmFtZSwgX29wdGlvbnMpIHtcbiAgbGV0IG9wdGlvbnMgICAgICAgPSBfb3B0aW9ucyB8fCB7fTtcbiAgbGV0IG93bmVyRG9jdW1lbnQgPSBvcHRpb25zLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIGxldCB1cmwgICAgICAgICAgID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIG93bmVyRG9jdW1lbnQubG9jYXRpb24sIHVybE9yTmFtZSwgb3B0aW9ucy5tYWdpYyk7XG4gIGxldCBjYWNoZUtleTtcblxuICAvLyBDaGVjayBmb3IgY2FjaGUgbW9kZSBvdmVycmlkZSBpbiBVUkwgcGFyYW1zXG4gIGxldCB1cmxDYWNoZVBhcmFtID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoJ2NhY2hlJyk7XG4gIGxldCBza2lwSW50ZXJuYWxDYWNoZSA9ICgvXihmYWxzZXxuby1zdG9yZXxyZWxvYWR8bm8tY2FjaGUpJC8pLnRlc3QodXJsQ2FjaGVQYXJhbSk7XG5cbiAgaWYgKCFza2lwSW50ZXJuYWxDYWNoZSkge1xuICAgIGlmICh1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2FjaGVQYXJhbXMnKSAhPT0gJ3RydWUnKSB7XG4gICAgICBsZXQgY2FjaGVLZXlVUkwgPSBuZXcgVVJMKGAke3VybC5vcmlnaW59JHt1cmwucGF0aG5hbWV9YCk7XG4gICAgICBjYWNoZUtleSA9IGNhY2hlS2V5VVJMLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlS2V5ID0gdXJsLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGNhY2hlZFJlc3BvbnNlID0gUkVRVUlSRV9DQUNIRS5nZXQoY2FjaGVLZXkpO1xuICAgIGlmIChjYWNoZWRSZXNwb25zZSkge1xuICAgICAgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZWRSZXNwb25zZTtcbiAgICAgIGlmIChjYWNoZWRSZXNwb25zZS5yZXNwb25zZSAmJiBjYWNoZWRSZXNwb25zZS5yZXNwb25zZS5vaylcbiAgICAgICAgcmV0dXJuIHsgdXJsLCByZXNwb25zZTogY2FjaGVkUmVzcG9uc2UucmVzcG9uc2UsIG93bmVyRG9jdW1lbnQsIGNhY2hlZDogdHJ1ZSB9O1xuICAgIH1cbiAgfVxuXG4gIC8vIEJ1aWxkIGZldGNoIG9wdGlvbnMgd2l0aCBjYWNoZSBzdXBwb3J0XG4gIC8vIERlZmF1bHQgdG8gJ2RlZmF1bHQnIHdoaWNoIHJlc3BlY3RzIEhUVFAgY2FjaGluZyBoZWFkZXJzIChDYWNoZS1Db250cm9sLCBFVGFnLCBldGMuKVxuICBsZXQgZmV0Y2hPcHRpb25zID0ge1xuICAgIGNhY2hlOiAnZGVmYXVsdCcsXG4gICAgLi4uKG9wdGlvbnMuZmV0Y2hPcHRpb25zIHx8IHt9KSxcbiAgfTtcblxuICAvLyBVUkwgcGFyYW1ldGVyIG92ZXJyaWRlcyBmZXRjaE9wdGlvbnMuY2FjaGVcbiAgaWYgKHVybENhY2hlUGFyYW0gJiYgL14oZGVmYXVsdHxuby1zdG9yZXxyZWxvYWR8bm8tY2FjaGV8Zm9yY2UtY2FjaGV8b25seS1pZi1jYWNoZWQpJC8udGVzdCh1cmxDYWNoZVBhcmFtKSlcbiAgICBmZXRjaE9wdGlvbnMuY2FjaGUgPSB1cmxDYWNoZVBhcmFtO1xuXG4gIGxldCBwcm9taXNlID0gZ2xvYmFsVGhpcy5mZXRjaCh1cmwsIGZldGNoT3B0aW9ucykudGhlbihcbiAgICBhc3luYyAocmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgaWYgKGNhY2hlS2V5KVxuICAgICAgICAgIFJFUVVJUkVfQ0FDSEUuZGVsZXRlKGNhY2hlS2V5KTtcblxuICAgICAgICBsZXQgZXJyb3IgPSBuZXcgRXJyb3IoYCR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnN0YXR1c1RleHR9YCk7XG4gICAgICAgIGVycm9yLnVybCA9IHVybDtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGxldCBib2R5ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgcmVzcG9uc2UudGV4dCA9IGFzeW5jICgpID0+IGJvZHk7XG4gICAgICByZXNwb25zZS5qc29uID0gYXN5bmMgKCkgPT4gSlNPTi5wYXJzZShib2R5KTtcblxuICAgICAgcmV0dXJuIHsgdXJsLCByZXNwb25zZSwgb3duZXJEb2N1bWVudCwgY2FjaGVkOiBmYWxzZSB9O1xuICAgIH0sXG4gICAgKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmcm9tIE15dGhpeCBVSSBcInJlcXVpcmVcIjogJywgZXJyb3IpO1xuXG4gICAgICBpZiAoY2FjaGVLZXkpXG4gICAgICAgIFJFUVVJUkVfQ0FDSEUuZGVsZXRlKGNhY2hlS2V5KTtcblxuICAgICAgZXJyb3IudXJsID0gdXJsO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSxcbiAgKTtcblxuICBSRVFVSVJFX0NBQ0hFLnNldChjYWNoZUtleSwgcHJvbWlzZSk7XG5cbiAgcmV0dXJuIGF3YWl0IHByb21pc2U7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkUGFydGlhbEludG9FbGVtZW50KHNyYywgX29wdGlvbnMpIHtcbiAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcblxuICBsZXQge1xuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgdXJsLFxuICAgIHJlc3BvbnNlLFxuICB9ID0gYXdhaXQgcmVxdWlyZS5jYWxsKFxuICAgIHRoaXMsXG4gICAgc3JjLFxuICAgIHtcbiAgICAgIG93bmVyRG9jdW1lbnQ6IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCxcbiAgICB9LFxuICApO1xuXG4gIGxldCBib2R5ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICB3aGlsZSAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuY2hpbGROb2Rlc1swXSk7XG5cbiAgbGV0IHNjb3BlRGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGZvciAobGV0IFsga2V5LCB2YWx1ZSBdIG9mIHVybC5zZWFyY2hQYXJhbXMuZW50cmllcygpKVxuICAgIHNjb3BlRGF0YVtrZXldID0gQmFzZVV0aWxzLmNvZXJjZSh2YWx1ZSk7XG5cbiAgaW1wb3J0SW50b0RvY3VtZW50RnJvbVNvdXJjZS5jYWxsKFxuICAgIHRoaXMsXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lckRvY3VtZW50LmxvY2F0aW9uLFxuICAgIHVybCxcbiAgICBib2R5LFxuICAgIHtcbiAgICAgIG5vZGVIYW5kbGVyOiAobm9kZSwgeyBpc0hhbmRsZWQsIGlzVGVtcGxhdGUgfSkgPT4ge1xuICAgICAgICBpZiAoKGlzVGVtcGxhdGUgfHwgIWlzSGFuZGxlZCkgJiYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSkge1xuICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICBFbGVtZW50cy5wcm9jZXNzRWxlbWVudHMuY2FsbChcbiAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgc2NvcGU6IFV0aWxzLmNyZWF0ZVNjb3BlKHNjb3BlRGF0YSwgb3B0aW9ucy5zY29wZSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2liaWxpdHlPYnNlcnZlcihjYWxsYmFjaywgX29wdGlvbnMpIHtcbiAgY29uc3QgaW50ZXJzZWN0aW9uQ2FsbGJhY2sgPSAoZW50cmllcykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGVudHJpZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGV0IGVudHJ5ICAgPSBlbnRyaWVzW2ldO1xuICAgICAgbGV0IGVsZW1lbnQgPSBlbnRyeS50YXJnZXQ7XG4gICAgICBpZiAoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgbGV0IGVsZW1lbnRPYnNlcnZlcnMgPSBVdGlscy5tZXRhZGF0YShlbGVtZW50LCBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUyk7XG4gICAgICBpZiAoIWVsZW1lbnRPYnNlcnZlcnMpIHtcbiAgICAgICAgZWxlbWVudE9ic2VydmVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgVXRpbHMubWV0YWRhdGEoZWxlbWVudCwgTVlUSElYX0lOVEVSU0VDVElPTl9PQlNFUlZFUlMsIGVsZW1lbnRPYnNlcnZlcnMpO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9IGVsZW1lbnRPYnNlcnZlcnMuZ2V0KG9ic2VydmVyKTtcbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0geyB3YXNWaXNpYmxlOiBmYWxzZSwgcmF0aW9WaXNpYmxlOiBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyB9O1xuICAgICAgICBlbGVtZW50T2JzZXJ2ZXJzLnNldChvYnNlcnZlciwgZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IGRhdGEucmF0aW9WaXNpYmxlKVxuICAgICAgICBkYXRhLnJhdGlvVmlzaWJsZSA9IGVudHJ5LmludGVyc2VjdGlvblJhdGlvO1xuXG4gICAgICBkYXRhLnByZXZpb3VzVmlzaWJpbGl0eSA9IChkYXRhLnZpc2liaWxpdHkgPT09IHVuZGVmaW5lZCkgPyBkYXRhLnZpc2liaWxpdHkgOiBkYXRhLnZpc2liaWxpdHk7XG4gICAgICBkYXRhLnZpc2liaWxpdHkgPSAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwLjApO1xuXG4gICAgICBjYWxsYmFjayh7IC4uLmRhdGEsIGVudHJ5LCBlbGVtZW50LCBpbmRleDogaSwgZGlzY29ubmVjdDogKCkgPT4gb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpIH0pO1xuXG4gICAgICBpZiAoZGF0YS52aXNpYmlsaXR5ICYmICFkYXRhLndhc1Zpc2libGUpXG4gICAgICAgIGRhdGEud2FzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIGxldCBvcHRpb25zID0ge1xuICAgIHJvb3Q6ICAgICAgIG51bGwsXG4gICAgdGhyZXNob2xkOiAgMC4wLFxuICAgIC4uLihfb3B0aW9ucyB8fCB7fSksXG4gIH07XG5cbiAgbGV0IG9ic2VydmVyICA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihpbnRlcnNlY3Rpb25DYWxsYmFjaywgb3B0aW9ucyk7XG4gIGxldCBlbGVtZW50cyAgPSAoX29wdGlvbnMgfHwge30pLmVsZW1lbnRzIHx8IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50c1tpXSk7XG5cbiAgcmV0dXJuIG9ic2VydmVyO1xufVxuXG5jb25zdCBOT19PQlNFUlZFUiA9IE9iamVjdC5mcmVlemUoe1xuICB3YXNWaXNpYmxlOiAgICAgICAgIGZhbHNlLFxuICByYXRpb1Zpc2libGU6ICAgICAgIDAuMCxcbiAgdmlzaWJpbGl0eTogICAgICAgICBmYWxzZSxcbiAgcHJldmlvdXNWaXNpYmlsaXR5OiBmYWxzZSxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmlzaWJpbGl0eU1ldGEoZWxlbWVudCwgb2JzZXJ2ZXIpIHtcbiAgbGV0IGVsZW1lbnRPYnNlcnZlcnMgPSBVdGlscy5tZXRhZGF0YShlbGVtZW50LCBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUyk7XG4gIGlmICghZWxlbWVudE9ic2VydmVycylcbiAgICByZXR1cm4gTk9fT0JTRVJWRVI7XG5cbiAgcmV0dXJuIGVsZW1lbnRPYnNlcnZlcnMuZ2V0KG9ic2VydmVyKSB8fCBOT19PQlNFUlZFUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhcmdlc3REb2N1bWVudFRhYkluZGV4KG93bmVyRG9jdW1lbnQpIHtcbiAgbGV0IGxhcmdlc3QgPSAtSW5maW5pdHk7XG5cbiAgQXJyYXkuZnJvbSgob3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCgnW3RhYmluZGV4XScpKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgbGV0IHRhYkluZGV4ID0gcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JyksIDEwKTtcbiAgICBpZiAoIWlzRmluaXRlKHRhYkluZGV4KSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmICh0YWJJbmRleCA+IGxhcmdlc3QpXG4gICAgICBsYXJnZXN0ID0gdGFiSW5kZXg7XG4gIH0pO1xuXG4gIHJldHVybiAobGFyZ2VzdCA8IDApID8gMCA6IGxhcmdlc3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRTY3JpcHRJbnRvSGVhZChfdXJsLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgYXR0cmlidXRlcyAgICA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcbiAgbGV0IG93bmVyRG9jdW1lbnQgPSBvcHRpb25zLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIGxldCBzY3JpcHRFbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgbGV0IHVybCAgICAgICAgICAgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgb3duZXJEb2N1bWVudC5sb2NhdGlvbiwgX3VybCwgeyBtYWdpYzogdHJ1ZSB9KTtcblxuICBmb3IgKGxldCBbIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXMoYXR0cmlidXRlcykpIHtcbiAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3NyYycpXG4gICAgICBhdHRyaWJ1dGVWYWx1ZSA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmxvY2F0aW9uLCBhdHRyaWJ1dGVWYWx1ZSwgeyBtYWdpYzogdHJ1ZSB9KTtcblxuICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgfVxuXG4gIGxldCBzY3JpcHRJRCA9IHNjcmlwdEVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICBpZiAoIXNjcmlwdElEKSB7XG4gICAgc2NyaXB0SUQgPSBgSUQke0Jhc2VVdGlscy5TSEEyNTYodXJsKX1gO1xuICAgIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHNjcmlwdElEKTtcbiAgfVxuXG4gIHNjcmlwdEVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcmMnLCB1cmwpO1xuXG4gIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGF0dHJpYnV0ZXMsICd0eXBlJykpXG4gICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbW9kdWxlJyk7XG5cbiAgLy8gYXBwZW5kIHRvIGhlYWRcbiAgaWYgKCFvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2NyaXB0SUQpKVxuICAgIG93bmVyRG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHRFbGVtZW50KTtcblxuICByZXR1cm4gc2NyaXB0RWxlbWVudDtcbn0iLCIvKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogQ29uc3RhbnRzXG4gKiBncm91cE5hbWU6IENvbnN0YW50c1xuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgQ29uc3RhbnRzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBNaXNjIGdsb2JhbCBjb25zdGFudHMgYXJlIGZvdW5kIHdpdGhpbiB0aGlzIG5hbWVzcGFjZS5cbiAqIHByb3BlcnRpZXM6XG4gKiAgIC0gbmFtZTogTVlUSElYX0lOVEVSU0VDVElPTl9PQlNFUlZFUlNcbiAqICAgICBkYXRhVHlwZTogc3ltYm9sXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBzeW1ib2wgaXMgdXNlZCBhcyBhIEBzZWUgVXRpbHMubWV0YWRhdGE7IGtleSBhZ2FpbnN0IGVsZW1lbnRzIHdpdGggYSBgZGF0YS1zcmNgIGF0dHJpYnV0ZS5cbiAqICAgICAgIEZvciBlbGVtZW50cyB3aXRoIHRoaXMgYXR0cmlidXRlLCBzZXQgYW4gW2ludGVyc2VjdGlvbiBvYnNlcnZlcl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0ludGVyc2VjdGlvbl9PYnNlcnZlcl9BUEkpIGlzIHNldHVwLlxuICogICAgICAgV2hlbiB0aGUgaW50ZXJzZWN0aW9uIG9ic2VydmVyIHJlcG9ydHMgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlLCB0aGVuIHRoZSBVUkwgc3BlY2lmaWVkIGJ5IGBkYXRhLXNyY2AgaXMgZmV0Y2hlZCwgYW5kIGR1bXBlZCBpbnRvXG4gKiAgICAgICB0aGUgZWxlbWVudCBhcyBpdHMgY2hpbGRyZW4uIFRoaXMgYWxsb3dzIGZvciBkeW5hbWljIFwicGFydGlhbHNcIiB0aGF0IGFyZSBsb2FkZWQgYXQgcnVuLXRpbWUuXG4gKlxuICogICAgICAgVGhlIHZhbHVlIHN0b3JlZCBhdCB0aGlzIEBzZWUgVXRpbHMubWV0YWRhdGE7IGtleSBpcyBhIE1hcCBvZiBbaW50ZXJzZWN0aW9uIG9ic2VydmVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW50ZXJzZWN0aW9uT2JzZXJ2ZXIpXG4gKiAgICAgICBpbnN0YW5jZXMuIFRoZSBrZXlzIG9mIHRoaXMgbWFwIGFyZSB0aGUgaW50ZXJzZWN0aW9uIG9ic2VydmVycyB0aGVtc2VsdmVzLiBUaGUgdmFsdWVzIGFyZSByYXcgb2JqZWN0cyB3aXRoIHRoZSBzaGFwZVxuICogICAgICAgYHsgd2FzVmlzaWJsZTogYm9vbGVhbiwgcmF0aW9WaXNpYmxlOiBmbG9hdCwgcHJldmlvdXNWaXNpYmlsaXR5OiBib29sZWFuLCB2aXNpYmlsaXR5OiBib29sZWFuIH1gLlxuICogICAtIG5hbWU6IE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdXNlZCBhcyBhIEBzZWUgVXRpbHMubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsga2V5IGJ5IEBzZWUgVXRpbHMuZ2xvYmFsU3RvcmVOYW1lVmFsdWVQYWlySGVscGVyO1xuICogICAgICAgdG8gc3RvcmUga2V5L3ZhbHVlIHBhaXJzIGZvciBhIHNpbmdsZSB2YWx1ZS5cbiAqXG4gKiAgICAgICBNeXRoaXggVUkgaGFzIGdsb2JhbCBzdG9yZSBhbmQgZmV0Y2ggaGVscGVycyBmb3Igc2V0dGluZyBhbmQgZmV0Y2hpbmcgZHluYW1pYyBwcm9wZXJ0aWVzLiBUaGVzZVxuICogICAgICAgbWV0aG9kcyBvbmx5IGFjY2VwdCBhIHNpbmdsZSB2YWx1ZSBieSBkZXNpZ24uLi4gYnV0IHNvbWV0aW1lcyBpdCBpcyBkZXNpcmVkIHRoYXQgYSB2YWx1ZSBiZSBzZXRcbiAqICAgICAgIHdpdGggYSBzcGVjaWZpYyBrZXkgaW5zdGVhZC4gVGhpcyBgTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVJgIHByb3BlcnR5IGFzc2lzdHMgd2l0aCB0aGlzIHByb2Nlc3MsXG4gKiAgICAgICBhbGxvd2luZyBnbG9iYWwgaGVscGVycyB0byBzdGlsbCBmdW5jdGlvbiB3aXRoIGEgc2luZ2xlIHZhbHVlIHNldCwgd2hpbGUgaW4gc29tZSBjYXNlcyBzdGlsbCBwYXNzaW5nXG4gKiAgICAgICBhIGtleSB0aHJvdWdoIHRvIHRoZSBzZXR0ZXIuIEBzb3VyY2VSZWYgX215dGhpeE5hbWVWYWx1ZVBhaXJIZWxwZXJVc2FnZTtcbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gfFxuICogICAgICAgICA6d2FybmluZzogVXNlIGF0IHlvdXIgb3duIHJpc2suIFRoaXMgaXMgTXl0aGl4IFVJIGludGVybmFsIGNvZGUgdGhhdCBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cbiAqICAgLSBuYW1lOiBNWVRISVhfU0hBRE9XX1BBUkVOVFxuICogICAgIGRhdGFUeXBlOiBzeW1ib2xcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGlzIGlzIHVzZWQgYXMgYSBAc2VlIFV0aWxzLm1ldGFkYXRhP2NhcHRpb249bWV0YWRhdGE7IGtleSBieSBAc2VlIE15dGhpeFVJQ29tcG9uZW50OyB0b1xuICogICAgICAgc3RvcmUgdGhlIHBhcmVudCBub2RlIG9mIGEgU2hhZG93IERPTSwgc28gdGhhdCBpdCBjYW4gbGF0ZXIgYmUgdHJhdmVyc2VkIGJ5IEBzZWUgVXRpbHMuZ2V0UGFyZW50Tm9kZTsuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOndhcm5pbmc6IFVzZSBhdCB5b3VyIG93biByaXNrLiBUaGlzIGlzIE15dGhpeCBVSSBpbnRlcm5hbCBjb2RlIHRoYXQgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBVdGlscy5nZXRQYXJlbnROb2RlOy5cbiAqICAgLSBuYW1lOiBNWVRISVhfVFlQRVxuICogICAgIGRhdGFUeXBlOiBzeW1ib2xcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGlzIGlzIHVzZWQgZm9yIHR5cGUgY2hlY2tpbmcgYnkgYGluc3RhbmNlb2ZgIGNoZWNrcyB0byBkZXRlcm1pbmUgaWYgYW4gaW5zdGFuY2VcbiAqICAgICAgIGlzIGEgc3BlY2lmaWMgdHlwZSAoZXZlbiBhY3Jvc3MgamF2YXNjcmlwdCBjb250ZXh0cyBhbmQgbGlicmFyeSB2ZXJzaW9ucykuIEBzb3VyY2VSZWYgX215dGhpeFR5cGVFeGFtcGxlO1xuICogICAgIG5vdGVzOlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKiAgIC0gbmFtZTogRFlOQU1JQ19QUk9QRVJUWV9UWVBFXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFVzZWQgZm9yIHJ1bnRpbWUgdHlwZSByZWZsZWN0aW9uIGFnYWluc3QgQHNlZSBVdGlscy5EeW5hbWljUHJvcGVydHk7LlxuICogICAgIG5vdGVzOlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgRHluYW1pY1Byb3BlcnR5Oy5cbiAqICAgICAgIC0gfFxuICogICAgICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc1R5cGU7LlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgQ29uc3RhbnRzLk1ZVEhJWF9UWVBFOy5cbiAqL1xuXG4vLyBCYXNlXG5leHBvcnQgY29uc3QgTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVIgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29uc3RhbnRzL25hbWUtdmFsdWUtcGFpci1oZWxwZXInKTsgLy8gQHJlZjpDb25zdGFudHMuTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVJcbmV4cG9ydCBjb25zdCBNWVRISVhfU0hBRE9XX1BBUkVOVCAgICAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb25zdGFudHMvc2hhZG93LXBhcmVudCcpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfU0hBRE9XX1BBUkVOVFxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9UWVBFICAgICAgICAgICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbnN0YW50cy9lbGVtZW50LWRlZmluaXRpb24nKTsgLy8gQHJlZjpDb25zdGFudHMuTVlUSElYX1RZUEVcbmV4cG9ydCBjb25zdCBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUyAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb21wb25lbnQvY29uc3RhbnRzL2ludGVyc2VjdGlvbi1vYnNlcnZlcnMnKTsgLy8gQHJlZjpDb25zdGFudHMuTVlUSElYX0lOVEVSU0VDVElPTl9PQlNFUlZFUlNcbmV4cG9ydCBjb25zdCBNWVRISVhfRE9DVU1FTlRfSU5JVElBTElaRUQgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb21wb25lbnQvY29uc3RhbnRzL2RvY3VtZW50LWluaXRpYWxpemVkJyk7IC8vIEByZWY6Q29uc3RhbnRzLk1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRFxuXG4vLyBEeW5hbWljUHJvcGVydHlcbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BST1BFUlRZX1ZBTFVFICAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9keW5hbWljLXByb3BlcnR5L2NvbnN0YW50cy92YWx1ZScpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfSVNfU0VUVElORyAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL2lzLXNldHRpbmcnKTtcbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BST1BFUlRZX1NFVCAgICAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9keW5hbWljLXByb3BlcnR5L2NvbnN0YW50cy9zZXQnKTtcbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSUyAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9keW5hbWljLXByb3BlcnR5L2NvbnN0YW50cy9saXN0ZW5lcnMnKTtcblxuLy8gVHlwZXNcbmV4cG9ydCBjb25zdCBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS90eXBlcy9NeXRoaXhVSTo6RWxlbWVudERlZmluaXRpb24nKTtcbmV4cG9ydCBjb25zdCBRVUVSWV9FTkdJTkVfVFlQRSAgICAgICAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS90eXBlcy9NeXRoaXhVSTo6UXVlcnlFbmdpbmUnKTtcbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BST1BFUlRZX1RZUEUgICAgICAgICAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS90eXBlcy9NeXRoaXhVSTo6RHluYW1pY1Byb3BlcnR5Jyk7IC8vIEByZWY6Q29uc3RhbnRzLkRZTkFNSUNfUFJPUEVSVFlfVFlQRVxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpNeXRoaXhVSUNvbXBvbmVudCcpO1xuXG4vLyBFbGVtZW50c1xuZXhwb3J0IGNvbnN0IFVORklOSVNIRURfREVGSU5JVElPTiAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbnN0YW50cy91bmZpbmlzaGVkJyk7XG5cblxuIiwiaW1wb3J0IHtcbiAgRFlOQU1JQ19QUk9QRVJUWV9UWVBFLFxuICBEWU5BTUlDX1BST1BFUlRZX1ZBTFVFLFxuICBEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkcsXG4gIERZTkFNSUNfUFJPUEVSVFlfU0VULFxuICBEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSUyxcbiAgTVlUSElYX1RZUEUsXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSk7XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAqIGRlc2M6IHxcbiAqICAgYER5bmFtaWNQcm9wZXJ0eWAgaXMgYSBzaW1wbGUgdmFsdWUgc3RvcmFnZSBjbGFzcyB3cmFwcGVkIGluIGEgUHJveHkuXG4gKlxuICogICAgSXQgd2lsbCBhbGxvdyB0aGUgdXNlciB0byBzdG9yZSBhbnkgZGVzaXJlZCB2YWx1ZS4gVGhlIGNhdGNoIGhvd2V2ZXIgaXMgdGhhdFxuICogICAgYW55IHZhbHVlIHN0b3JlZCBjYW4gb25seSBiZSBzZXQgdGhyb3VnaCBpdHMgc3BlY2lhbCBgc2V0YCBtZXRob2QuXG4gKlxuICogICAgVGhpcyB3aWxsIGFsbG93IGFueSBsaXN0ZW5lcnMgdG8gcmVjZWl2ZSB0aGUgYCd1cGRhdGUnYCBldmVudCB3aGVuIGEgdmFsdWUgaXMgc2V0LlxuICpcbiAqICAgIFNpbmNlIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlcyBhcmUgYWxzbyBhbHdheXMgd3JhcHBlZCBpbiBhIFByb3h5LCB0aGUgdXNlciBtYXlcbiAqICAgIFwiZGlyZWN0bHlcIiBhY2Nlc3MgYXR0cmlidXRlcyBvZiB0aGUgc3RvcmVkIHZhbHVlLiBGb3IgZXhhbXBsZSwgaWYgYSBgRHluYW1pY1Byb3BlcnR5YFxuICogICAgaXMgc3RvcmluZyBhbiBBcnJheSBpbnN0YW5jZSwgdGhlbiBvbmUgd291bGQgYmUgYWJsZSB0byBhY2Nlc3MgdGhlIGAubGVuZ3RoYCBwcm9wZXJ0eVxuICogICAgXCJkaXJlY3RseVwiLCBpLmUuIGBkeW5hbWljUHJvcC5sZW5ndGhgLlxuICpcbiAqICAgIGBEeW5hbWljUHJvcGVydHlgIGhhcyBhIHNwZWNpYWwgYHNldGAgbWV0aG9kLCB3aG9zZSBuYW1lIGlzIGEgYHN5bWJvbGAsIHRvIGF2b2lkIGNvbmZsaWN0aW5nXG4gKiAgICBuYW1lc3BhY2VzIHdpdGggdGhlIHVuZGVybHlpbmcgZGF0YXR5cGUgKGFuZCB0aGUgd3JhcHBpbmcgUHJveHkpLlxuICogICAgVG8gc2V0IGEgdmFsdWUgb24gYSBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZSwgb25lIG11c3QgZG8gc28gYXMgZm9sbG93czogYGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XShteU5ld1ZhbHVlKWAuXG4gKiAgICBUaGlzIHdpbGwgdXBkYXRlIHRoZSBpbnRlcm5hbCB2YWx1ZSwgYW5kIGlmIHRoZSBzZXQgdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBzdG9yZWQgdmFsdWUsIHRoZSBgJ3VwZGF0ZSdgIGV2ZW50IHdpbGwgYmUgZGlzcGF0Y2hlZCB0b1xuICogICAgYW55IGxpc3RlbmVycy5cbiAqXG4gKiAgICBBcyBgRHluYW1pY1Byb3BlcnR5YCBpcyBhbiBbRXZlbnRUYXJnZXRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FdmVudFRhcmdldC9FdmVudFRhcmdldCksIG9uZSBjYW4gYXR0YWNoXG4gKiAgICBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIGAndXBkYXRlJ2AgZXZlbnQgdG8gbGlzdGVuIGZvciB1cGRhdGVzIHRvIHRoZSB1bmRlcmx5aW5nIHZhbHVlLiBUaGUgYCd1cGRhdGUnYCBldmVudCBpcyB0aGUgb25seSBldmVudCB0aGF0IGlzXG4gKiAgICBldmVyIHRyaWdnZXJlZCBieSB0aGlzIGNsYXNzLiBUaGUgcmVjZWl2ZWQgYGV2ZW50YCBpbnN0YW5jZSBpbiBldmVudCBjYWxsYmFja3Mgd2lsbCBoYXZlIHRoZSBmb2xsb3dpbmcgYXR0cmlidXRlczpcbiAqICAgIDEuIGB1cGRhdGVFdmVudC5vcmlnaW5hdG9yID0gdGhpcztgIC0gYG9yaWdpbmF0b3JgIGlzIHRoZSBpbnN0YW5jZSBvZiB0aGUgYER5bmFtaWNQcm9wZXJ0eWAgd2hlcmUgdGhlIGV2ZW50IG9yaWdpbmF0ZWQgZnJvbS5cbiAqICAgIDIuIGB1cGRhdGVFdmVudC5vbGRWYWx1ZSA9IGN1cnJlbnRWYWx1ZTtgIC0gYG9sZFZhbHVlYCBjb250YWlucyB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBEeW5hbWljUHJvcGVydHlgIGJlZm9yZSBzZXQuXG4gKiAgICAzLiBgdXBkYXRlRXZlbnQudmFsdWUgPSBuZXdWYWx1ZTtgIC0gYHZhbHVlYCBjb250YWlucyB0aGUgY3VycmVudCB2YWx1ZSBiZWluZyBzZXQgb24gdGhlIGBEeW5hbWljUHJvcGVydHlgLlxuICpcbiAqICAgIFRvIHJldHJpZXZlIHRoZSB1bmRlcmx5aW5nIHJhdyB2YWx1ZSBvZiBhIGBEeW5hbWljUHJvcGVydHlgLCBvbmUgbWF5IGNhbGwgYHZhbHVlT2YoKWA6IGBsZXQgcmF3VmFsdWUgPSBkeW5hbWljUHJvcGVydHkudmFsdWVPZigpO2BcbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2VzIHdpbGwgaW50ZXJuYWxseSB0cmFjayB3aGVuIGEgYHNldGAgb3BlcmF0aW9uIGlzIHVuZGVyd2F5LCB0byBwcmV2ZW50XG4gKiAgICAgY3ljbGljIHNldHMgYW5kIG1heGltdW0gY2FsbCBzdGFjayBlcnJvcnMuIFlvdSBhcmUgYWxsb3dlZCB0byBzZXQgdGhlIHZhbHVlIHJlY3Vyc2l2ZWx5LCBob3dldmVyIGB1cGRhdGVgIGV2ZW50c1xuICogICAgIHdpbGwgb25seSBiZSBkaXNwYXRjaGVkIGZvciB0aGUgZmlyc3QgYHNldGAgY2FsbC4gQW55IGBzZXRgIG9wZXJhdGlvbiB0aGF0IGhhcHBlbnMgd2hpbGUgYW5vdGhlciBgc2V0YCBvcGVyYXRpb24gaXNcbiAqICAgICB1bmRlcndheSB3aWxsICoqbm90KiogZGlzcGF0Y2ggYW55IGAndXBkYXRlJ2AgZXZlbnRzLlxuICogICAtIHxcbiAqICAgICBgJ3VwZGF0ZSdgIGV2ZW50cyB3aWxsIGJlIGRpc3BhdGNoZWQgaW1tZWRpYXRlbHkgKmFmdGVyKiB0aGUgaW50ZXJuYWwgdW5kZXJseWluZyBzdG9yZWQgdmFsdWUgaXMgdXBkYXRlZC4gVGhvdWdoIGl0IGlzXG4gKiAgICAgcG9zc2libGUgdG8gYHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbmAgaW4gYW4gZXZlbnQgY2FsbGJhY2ssIGF0dGVtcHRpbmcgdG8gXCJwcmV2ZW50RGVmYXVsdFwiIG9yIFwic3RvcFByb3BhZ2F0aW9uXCIgd2lsbCBkbyBub3RoaW5nLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBEeW5hbWljUHJvcGVydHkgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBsZXQgZHluYW1pY1Byb3BlcnR5ID0gbmV3IER5bmFtaWNQcm9wZXJ0eSgnaW5pdGlhbCB2YWx1ZScpO1xuICpcbiAqICAgICBkeW5hbWljUHJvcGVydHkuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgKGV2ZW50KSA9PiB7XG4gKiAgICAgICBjb25zb2xlLmxvZyhgRHluYW1pYyBQcm9wZXJ0eSBVcGRhdGVkISBOZXcgdmFsdWUgPSAnJHtldmVudC52YWx1ZX0nLCBQcmV2aW91cyBWYWx1ZSA9ICcke2V2ZW50Lm9sZFZhbHVlfSdgKTtcbiAqICAgICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IFZhbHVlID0gJyR7ZHluYW1pY1Byb3BlcnR5LnZhbHVlT2YoKX0nYCk7XG4gKiAgICAgfSk7XG4gKlxuICogICAgIGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XSgnbmV3IHZhbHVlJyk7XG4gKlxuICogICAgIC8vIG91dHB1dCAtPiBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICduZXcgdmFsdWUnLCBPbGQgVmFsdWUgPSAnaW5pdGlhbCB2YWx1ZSdcbiAqICAgICAvLyBvdXRwdXQgLT4gQ3VycmVudCBWYWx1ZSA9ICdpbml0aWFsIHZhbHVlJ1xuICogICAgIGBgYFxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY1Byb3BlcnR5IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0oaW5zdGFuY2UpIHsgLy8gQHJlZjpfbXl0aGl4VHlwZUV4YW1wbGVcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChpbnN0YW5jZSAmJiBpbnN0YW5jZVtNWVRISVhfVFlQRV0gPT09IERZTkFNSUNfUFJPUEVSVFlfVFlQRSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBQcm9wZXJ0eVxuICAgKiBuYW1lOiBzZXRcbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogc3RhdGljOiB0cnVlXG4gICAqIGRlc2M6IHxcbiAgICogICBBIHNwZWNpYWwgYHN5bWJvbGAgdXNlZCB0byBhY2Nlc3MgdGhlIGBzZXRgIG1ldGhvZCBvZiBhIGBEeW5hbWljUHJvcGVydHlgLlxuICAgKiBleGFtcGxlczpcbiAgICogICAtIHxcbiAgICogICAgIGBgYGphdmFzY3JpcHRcbiAgICogICAgIGltcG9ydCB7IER5bmFtaWNQcm9wZXJ0eSB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gICAqXG4gICAqICAgICBsZXQgZHluYW1pY1Byb3BlcnR5ID0gbmV3IER5bmFtaWNQcm9wZXJ0eSgnaW5pdGlhbCB2YWx1ZScpO1xuICAgKlxuICAgKiAgICAgZHluYW1pY1Byb3BlcnR5LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIChldmVudCkgPT4ge1xuICAgKiAgICAgICBjb25zb2xlLmxvZyhgRHluYW1pYyBQcm9wZXJ0eSBVcGRhdGVkISBOZXcgdmFsdWUgPSAnJHtldmVudC52YWx1ZX0nLCBQcmV2aW91cyBWYWx1ZSA9ICcke2V2ZW50Lm9sZFZhbHVlfSdgKTtcbiAgICogICAgICAgY29uc29sZS5sb2coYEN1cnJlbnQgVmFsdWUgPSAnJHtkeW5hbWljUHJvcGVydHkudmFsdWVPZigpfSdgKTtcbiAgICogICAgIH0pO1xuICAgKlxuICAgKiAgICAgZHluYW1pY1Byb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKCduZXcgdmFsdWUnKTtcbiAgICpcbiAgICogICAgIC8vIG91dHB1dCAtPiBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICduZXcgdmFsdWUnLCBPbGQgVmFsdWUgPSAnaW5pdGlhbCB2YWx1ZSdcbiAgICogICAgIC8vIG91dHB1dCAtPiBDdXJyZW50IFZhbHVlID0gJ2luaXRpYWwgdmFsdWUnXG4gICAqICAgICBgYGBcbiAgICovXG4gIHN0YXRpYyBzZXQgPSBEWU5BTUlDX1BST1BFUlRZX1NFVDsgLy8gQHJlZjpEeW5hbWljUHJvcGVydHkuc2V0XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIG5hbWU6IGNvbnN0cnVjdG9yXG4gICAqIGdyb3VwTmFtZTogRHluYW1pY1Byb3BlcnR5XG4gICAqIHBhcmVudDogVXRpbHNcbiAgICogZGVzYzogfFxuICAgKiAgIENvbnN0cnVjdCBhIGBEeW5hbWljUHJvcGVydHlgLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBpbml0aWFsVmFsdWVcbiAgICogICAgIGRhdGFUeXBlOiBhbnlcbiAgICogICAgIGRlc2M6XG4gICAqICAgICAgIFRoZSBpbml0aWFsIHZhbHVlIHRvIHN0b3JlLlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBUaGlzIHdpbGwgcmV0dXJuIGEgUHJveHkgaW5zdGFuY2Ugd3JhcHBpbmcgdGhlIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFlvdSBjYW4gbm90IHNldCBhIGBEeW5hbWljUHJvcGVydHlgIHRvIGFub3RoZXIgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UuXG4gICAqICAgICBJZiBgaW5pdGlhbFZhbHVlYCBpcyBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCBpdCB3aWxsIHVzZSB0aGUgc3RvcmVkIHZhbHVlXG4gICAqICAgICBvZiB0aGF0IGluc3RhbmNlIGluc3RlYWQgKGJ5IGNhbGxpbmcgQHNlZSBEeW5hbWljUHJvcGVydHkudmFsdWVPZjspLlxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5pdGlhbFZhbHVlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIFtNWVRISVhfVFlQRV06IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgRFlOQU1JQ19QUk9QRVJUWV9UWVBFLFxuICAgICAgfSxcbiAgICAgIFtEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICAoQmFzZVV0aWxzLmlzVHlwZShpbml0aWFsVmFsdWUsIER5bmFtaWNQcm9wZXJ0eSkpID8gaW5pdGlhbFZhbHVlLnZhbHVlT2YoKSA6IGluaXRpYWxWYWx1ZSxcbiAgICAgIH0sXG4gICAgICBbRFlOQU1JQ19QUk9QRVJUWV9JU19TRVRUSU5HXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBbRFlOQU1JQ19QUk9QRVJUWV9MSVNURU5FUlNdOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG5ldyBNYXAoKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBsZXQgcHJveHkgPSBuZXcgUHJveHkodGhpcywge1xuICAgICAgZ2V0OiAgKHRhcmdldCwgcHJvcE5hbWUpID0+IHtcbiAgICAgICAgaWYgKHByb3BOYW1lIGluIHRhcmdldCkge1xuICAgICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtwcm9wTmFtZV07XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpID8gdmFsdWUuYmluZCh0YXJnZXQpIDogdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmFsdWUgPSB0YXJnZXRbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV1bcHJvcE5hbWVdO1xuICAgICAgICByZXR1cm4gKHZhbHVlID09PSAnZnVuY3Rpb24nKSA/IHZhbHVlLmJpbmQodGFyZ2V0W0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdKSA6IHZhbHVlO1xuICAgICAgfSxcbiAgICAgIHNldDogICh0YXJnZXQsIHByb3BOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICAgIHRhcmdldFtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRhcmdldFtEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXVtwcm9wTmFtZV0gPSB2YWx1ZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJveHk7XG4gIH1cblxuICBbU3ltYm9sLnRvUHJpbWl0aXZlXShoaW50KSB7XG4gICAgaWYgKGhpbnQgPT09ICdudW1iZXInKVxuICAgICAgcmV0dXJuICt0aGlzW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdO1xuICAgIGVsc2UgaWYgKGhpbnQgPT09ICdzdHJpbmcnKVxuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHRoZSBkeW5hbWljIHByb3BlcnR5IHZhbHVlIHRvIGEgc3RyaW5nLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2YWx1ZS5cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCB2YWx1ZSA9IHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV07XG4gICAgcmV0dXJuICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpID8gdmFsdWUudG9TdHJpbmcoKSA6ICgnJyArIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBkZXNjOiB8XG4gICAqICAgRmV0Y2ggdGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlIHN0b3JlZCBieSB0aGlzIGBEeW5hbWljUHJvcGVydHlgLlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXM6IGFueTsgVGhlIHVuZGVybGluZyByYXcgdmFsdWUuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlIHN0b3JlZCBieSB0aGlzIER5bmFtaWNQcm9wZXJ0eS5cbiAgICogQHJldHVybnMgeyp9IFRoZSB1bmRlcmx5aW5nIHJhdyB2YWx1ZS5cbiAgICovXG4gIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV07XG4gIH1cblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIEludGVybmFsIGZhbGxiYWNrIG1ldGhvZCB0byBub3RpZnkgbGlzdGVuZXJzIGRpcmVjdGx5IHdoZW4gbmF0aXZlIEV2ZW50VGFyZ2V0XG4gICAqICAgZGlzcGF0Y2hpbmcgZmFpbHMgKGUuZy4sIGR1ZSB0byBFdmVudCBjbGFzcyBtaXNtYXRjaGVzIGluIE5vZGUuanMvSlNET00gZW52aXJvbm1lbnRzKS5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogZXZlbnRUeXBlXG4gICAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gICAqICAgICBkZXNjOiBUaGUgZXZlbnQgdHlwZSB0byBkaXNwYXRjaCAoZS5nLiwgJ3VwZGF0ZScpLlxuICAgKiAgIC0gbmFtZTogZXZlbnREYXRhXG4gICAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gICAqICAgICBkZXNjOiBBbiBvYmplY3QgY29udGFpbmluZyBldmVudCBkYXRhIHRvIHBhc3MgdG8gaGFuZGxlcnMuXG4gICAqL1xuICBfbm90aWZ5TGlzdGVuZXJzKGV2ZW50VHlwZSwgZXZlbnREYXRhKSB7XG4gICAgbGV0IGxpc3RlbmVyc01hcCA9IHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9MSVNURU5FUlNdO1xuICAgIGxldCBoYW5kbGVycyA9IGxpc3RlbmVyc01hcC5nZXQoZXZlbnRUeXBlKTtcblxuICAgIGlmICghaGFuZGxlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBmb3IgKGxldCBoYW5kbGVyIG9mIGhhbmRsZXJzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBoYW5kbGVyKGV2ZW50RGF0YSk7XG4gICAgICB9IGNhdGNoIChoYW5kbGVyRXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRHluYW1pY1Byb3BlcnR5OiBFcnJvciBpbiBldmVudCBoYW5kbGVyOicsIGhhbmRsZXJFcnJvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIGdyb3VwTmFtZTogRHluYW1pY1Byb3BlcnR5XG4gICAqIHBhcmVudDogRHluYW1pY1Byb3BlcnR5XG4gICAqIGRlc2M6IHxcbiAgICogICBPdmVycmlkZSBvZiBFdmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyIHRoYXQgYWxzbyB0cmFja3MgaGFuZGxlcnMgaW4gYW4gaW50ZXJuYWxcbiAgICogICByZWdpc3RyeSBmb3IgY3Jvc3MtcGxhdGZvcm0gY29tcGF0aWJpbGl0eSBmYWxsYmFjay5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogdHlwZVxuICAgKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICAgKiAgICAgZGVzYzogVGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvci5cbiAgICogICAtIG5hbWU6IGhhbmRsZXJcbiAgICogICAgIGRhdGFUeXBlOiBmdW5jdGlvblxuICAgKiAgICAgZGVzYzogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBldmVudCBmaXJlcy5cbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIGRhdGFUeXBlOiBvYmplY3QgfCBib29sZWFuXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVzYzogT3B0aW9ucyBwYXNzZWQgdG8gdGhlIG5hdGl2ZSBhZGRFdmVudExpc3RlbmVyLlxuICAgKi9cblxuICAvKipcbiAgICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB2YWx1ZSBjaGFuZ2VzLiBBbHNvIHRyYWNrcyBoYW5kbGVycyBpbiBhbiBpbnRlcm5hbCByZWdpc3RyeSBmb3IgY3Jvc3MtcGxhdGZvcm0gY29tcGF0aWJpbGl0eS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yIChlLmcuLCAndXBkYXRlJykuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXIgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGV2ZW50IGZpcmVzLlxuICAgKiBAcGFyYW0ge09iamVjdHxib29sZWFufSBbb3B0aW9uc10gLSBPcHRpb25zIHBhc3NlZCB0byB0aGUgbmF0aXZlIGFkZEV2ZW50TGlzdGVuZXIuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGxldCBsaXN0ZW5lcnNNYXAgPSB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfTElTVEVORVJTXTtcbiAgICBpZiAoIWxpc3RlbmVyc01hcC5oYXModHlwZSkpXG4gICAgICBsaXN0ZW5lcnNNYXAuc2V0KHR5cGUsIFtdKTtcblxuICAgIGxldCBoYW5kbGVycyA9IGxpc3RlbmVyc01hcC5nZXQodHlwZSk7XG4gICAgaWYgKCFoYW5kbGVycy5pbmNsdWRlcyhoYW5kbGVyKSlcbiAgICAgIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIE92ZXJyaWRlIG9mIEV2ZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgdGhhdCBhbHNvIHJlbW92ZXMgaGFuZGxlcnMgZnJvbSB0aGVcbiAgICogICBpbnRlcm5hbCByZWdpc3RyeSB1c2VkIGZvciBjcm9zcy1wbGF0Zm9ybSBjb21wYXRpYmlsaXR5IGZhbGxiYWNrLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiB0eXBlXG4gICAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gICAqICAgICBkZXNjOiBUaGUgZXZlbnQgdHlwZSB0byBzdG9wIGxpc3RlbmluZyBmb3IuXG4gICAqICAgLSBuYW1lOiBoYW5kbGVyXG4gICAqICAgICBkYXRhVHlwZTogZnVuY3Rpb25cbiAgICogICAgIGRlc2M6IFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byByZW1vdmUuXG4gICAqICAgLSBuYW1lOiBvcHRpb25zXG4gICAqICAgICBkYXRhVHlwZTogb2JqZWN0IHwgYm9vbGVhblxuICAgKiAgICAgb3B0aW9uYWw6IHRydWVcbiAgICogICAgIGRlc2M6IE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICovXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lci4gQWxzbyByZW1vdmVzIGhhbmRsZXJzIGZyb20gdGhlIGludGVybmFsIHJlZ2lzdHJ5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIHN0b3AgbGlzdGVuaW5nIGZvci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byByZW1vdmUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fGJvb2xlYW59IFtvcHRpb25zXSAtIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lci5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlci5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGxpc3RlbmVyc01hcCA9IHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9MSVNURU5FUlNdO1xuICAgIGxldCBoYW5kbGVycyA9IGxpc3RlbmVyc01hcC5nZXQodHlwZSk7XG5cbiAgICBpZiAoIWhhbmRsZXJzKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IGhhbmRsZXJJbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGhhbmRsZXJJbmRleCAhPT0gLTEpXG4gICAgICBoYW5kbGVycy5zcGxpY2UoaGFuZGxlckluZGV4LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBuYW1lOiBcIltEeW5hbWljUHJvcGVydHkuc2V0XVwiXG4gICAqIGdyb3VwTmFtZTogRHluYW1pY1Byb3BlcnR5XG4gICAqIHBhcmVudDogRHluYW1pY1Byb3BlcnR5XG4gICAqIGRlc2M6IHxcbiAgICogICBTZXQgdGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlIHN0b3JlZCBieSB0aGlzIGBEeW5hbWljUHJvcGVydHlgLlxuICAgKlxuICAgKiAgIElmIHRoZSBjdXJyZW50IHN0b3JlZCB2YWx1ZSBpcyBleGFjdGx5IHRoZSBzYW1lIGFzIHRoZSBwcm92aWRlZCBgdmFsdWVgLFxuICAgKiAgIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcmV0dXJuLlxuICAgKlxuICAgKiAgIE90aGVyd2lzZSwgd2hlbiB0aGUgdW5kZXJseWluZyB2YWx1ZSBpcyB1cGRhdGVkLCBgdGhpcy5kaXNwYXRjaEV2ZW50YCB3aWxsXG4gICAqICAgYmUgY2FsbGVkIHRvIGRpc3BhdGNoIGFuIGAndXBkYXRlJ2AgZXZlbnQgdG8gbm90aWZ5IGFsbCBsaXN0ZW5lcnMgdGhhdCB0aGVcbiAgICogICB1bmRlcmx5aW5nIHZhbHVlIGhhcyBiZWVuIGNoYW5nZWQuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG5ld1ZhbHVlXG4gICAqICAgICBkYXRhVHlwZTogYW55XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBuZXcgdmFsdWUgdG8gc2V0LiBJZiB0aGlzIGlzIGl0c2VsZiBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCB0aGVuXG4gICAqICAgICAgIGl0IHdpbGwgYmUgdW53cmFwcGVkIHRvIGl0cyB1bmRlcmx5aW5nIHZhbHVlLCBhbmQgdGhhdCB3aWxsIGJlIHVzZWQgYXMgdGhlIHZhbHVlIGluc3RlYWQuXG4gICAqICAgLSBuYW1lOiBvcHRpb25zXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBBbiBvYmplY3QgdG8gcHJvdmlkZWQgb3B0aW9ucyBmb3IgdGhlIG9wZXJhdGlvbi4gVGhlIHNoYXBlIG9mIHRoaXMgb2JqZWN0IGlzIGB7IGRpc3BhdGNoVXBkYXRlRXZlbnQ6IGJvb2xlYW4gfWAuXG4gICAqICAgICAgIElmIGBvcHRpb25zLmRpc3BhdGNoVXBkYXRlRXZlbnRgIGVxdWFscyBgZmFsc2VgLCB0aGVuIG5vIGAndXBkYXRlJ2AgZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIHRvIGxpc3RlbmVycy5cbiAgICogbm90ZXM6XG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogSWYgdGhlIHVuZGVybHlpbmcgc3RvcmVkIHZhbHVlIGlzIGV4YWN0bHkgdGhlIHNhbWUgYXMgdGhlIHZhbHVlIHByb3ZpZGVkLFxuICAgKiAgICAgdGhlbiBub3RoaW5nIHdpbGwgaGFwcGVuLCBhbmQgdGhlIG1ldGhvZCB3aWxsIHNpbXBseSByZXR1cm4uXG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogVGhlIHVuZGVybHlpbmcgdmFsdWUgaXMgdXBkYXRlZCAqYmVmb3JlKiBkaXNwYXRjaGluZyBldmVudHMuXG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogYER5bmFtaWNQcm9wZXJ0eWAgcHJvdGVjdHMgYWdhaW5zdCBjeWNsaWMgZXZlbnQgY2FsbGJhY2tzLiBJZiBhblxuICAgKiAgICAgZXZlbnQgY2FsbGJhY2sgYWdhaW4gc2V0cyB0aGUgdW5kZXJseWluZyBgRHluYW1pY1Byb3BlcnR5YCB2YWx1ZSwgdGhlblxuICAgKiAgICAgdGhlIHZhbHVlIHdpbGwgYmUgc2V0LCBidXQgbm8gZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkICh0byBwcmV2ZW50IGV2ZW50IGxvb3BzKS5cbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBZb3UgY2FuIG5vdCBzZXQgYSBgRHluYW1pY1Byb3BlcnR5YCB0byBhbm90aGVyIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLlxuICAgKiAgICAgSWYgdGhpcyBtZXRob2QgcmVjZWl2ZXMgYSBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZSwgaXQgd2lsbCB1c2UgdGhlIHN0b3JlZCB2YWx1ZVxuICAgKiAgICAgb2YgdGhhdCBpbnN0YW5jZSBpbnN0ZWFkIChieSBjYWxsaW5nIEBzZWUgRHluYW1pY1Byb3BlcnR5LnZhbHVlT2Y7KS5cbiAgICovXG4gIFtEWU5BTUlDX1BST1BFUlRZX1NFVF0oX25ld1ZhbHVlLCBfb3B0aW9ucykge1xuICAgIGxldCBuZXdWYWx1ZSA9IF9uZXdWYWx1ZTtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShuZXdWYWx1ZSwgRHluYW1pY1Byb3BlcnR5KSlcbiAgICAgIG5ld1ZhbHVlID0gbmV3VmFsdWUudmFsdWVPZigpO1xuXG4gICAgaWYgKHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV0gPT09IG5ld1ZhbHVlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9JU19TRVRUSU5HXSkge1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXSA9IG5ld1ZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvcHRpb25zID0gX29wdGlvbnMgfHwge307XG5cbiAgICB0cnkge1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddID0gdHJ1ZTtcblxuICAgICAgbGV0IG9sZFZhbHVlID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXTtcbiAgICAgIHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV0gPSBuZXdWYWx1ZTtcblxuICAgICAgaWYgKG9wdGlvbnMuZGlzcGF0Y2hVcGRhdGVFdmVudCA9PT0gZmFsc2UpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgb3JpZ2luYXRvcjogdGhpcyxcbiAgICAgICAgb2xkVmFsdWU6ICAgb2xkVmFsdWUsXG4gICAgICAgIHZhbHVlOiAgICAgIG5ld1ZhbHVlLFxuICAgICAgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHVwZGF0ZUV2ZW50ID0gbmV3IEV2ZW50KCd1cGRhdGUnKTtcblxuICAgICAgICB1cGRhdGVFdmVudC5vcmlnaW5hdG9yID0gdGhpcztcbiAgICAgICAgdXBkYXRlRXZlbnQub2xkVmFsdWUgPSBvbGRWYWx1ZTtcbiAgICAgICAgdXBkYXRlRXZlbnQudmFsdWUgPSBuZXdWYWx1ZTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodXBkYXRlRXZlbnQpO1xuICAgICAgfSBjYXRjaCAoZGlzcGF0Y2hFcnJvcikge1xuICAgICAgICAvLyBGYWxsYmFjayBmb3IgTm9kZS5qcy9KU0RPTSBlbnZpcm9ubWVudCB3aGVyZSBFdmVudCBjbGFzcyBtaXNtYXRjaGVzXG4gICAgICAgIC8vIGNhbiBjYXVzZSBkaXNwYXRjaEV2ZW50IHRvIGZhaWwuIFVzZSBpbnRlcm5hbCBsaXN0ZW5lciBub3RpZmljYXRpb24uXG4gICAgICAgIHRoaXMuX25vdGlmeUxpc3RlbmVycygndXBkYXRlJywgZXZlbnREYXRhKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9JU19TRVRUSU5HXSA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5nbG9iYWxUaGlzLm15dGhpeFVJLkR5bmFtaWNQcm9wZXJ0eSA9IER5bmFtaWNQcm9wZXJ0eTtcbiIsImltcG9ydCB7XG4gIEVMRU1FTlRfREVGSU5JVElPTl9UWVBFLFxuICBNWVRISVhfVFlQRSxcbiAgUVVFUllfRU5HSU5FX1RZUEUsXG4gIFVORklOSVNIRURfREVGSU5JVElPTixcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnLi9keW5hbWljLXByb3BlcnR5LmpzJztcblxuY29uc3QgU1VCU1RJVFVURV9DSEFSX0NPREUgPSAyNjtcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IEVsZW1lbnRzXG4gKiBncm91cE5hbWU6IEVsZW1lbnRzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgVXRpbGl0eSBhbmQgZWxlbWVudCBidWlsZGluZyBmdW5jdGlvbnMgZm9yIHRoZSBET00uXG4gKi9cblxuY29uc3QgSVNfUFJPUF9OQU1FICAgID0gL15wcm9wXFwkLztcbmNvbnN0IElTX1RBUkdFVF9QUk9QICA9IC9ecHJvdG90eXBlfGNvbnN0cnVjdG9yJC87XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50RGVmaW5pdGlvbiB7XG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGluc3RhbmNlICYmIGluc3RhbmNlW01ZVEhJWF9UWVBFXSA9PT0gRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3Rvcih0YWdOYW1lLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIFtNWVRISVhfVFlQRV06IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUsXG4gICAgICB9LFxuICAgICAgJ3RhZ05hbWUnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAgICAgICAgdGFnTmFtZSxcbiAgICAgIH0sXG4gICAgICAnYXR0cmlidXRlcyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBhdHRyaWJ1dGVzIHx8IHt9LFxuICAgICAgfSxcbiAgICAgICdjaGlsZHJlbic6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBjaGlsZHJlbiB8fCBbXSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICB0b1N0cmluZyhfb3B0aW9ucykge1xuICAgIGxldCBvcHRpb25zID0gX29wdGlvbnMgfHwge307XG4gICAgbGV0IHRhZ05hbWUgPSB0aGlzLnRhZ05hbWU7XG4gICAgaWYgKHRhZ05hbWUgPT09ICcjdGV4dCcpXG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzLnZhbHVlLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG5cbiAgICBsZXQgYXR0cnMgPSAodGFnTmFtZSA9PT0gJyNmcmFnbWVudCcpID8gbnVsbCA6ICgoYXR0cmlidXRlcykgPT4ge1xuICAgICAgbGV0IHBhcnRzID0gW107XG5cbiAgICAgIGZvciAobGV0IFsgYXR0cmlidXRlTmFtZSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xuICAgICAgICBpZiAoSVNfUFJPUF9OQU1FLnRlc3QoYXR0cmlidXRlTmFtZSkpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgbGV0IG5hbWUgPSB0aGlzLnRvRE9NQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgICAgcGFydHMucHVzaChuYW1lKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHBhcnRzLnB1c2goYCR7bmFtZX09XCIke2VuY29kZUF0dHJpYnV0ZVZhbHVlKHZhbHVlKX1cImApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFydHMuam9pbignICcpO1xuICAgIH0pKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgICBsZXQgY2hpbGRyZW4gPSAoKGNoaWxkcmVuKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgLmZpbHRlcigoY2hpbGQpID0+IChjaGlsZCAhPSBudWxsICYmIGNoaWxkICE9PSBmYWxzZSAmJiAhT2JqZWN0LmlzKGNoaWxkLCBOYU4pKSlcbiAgICAgICAgLm1hcCgoY2hpbGQpID0+ICgoY2hpbGQgJiYgdHlwZW9mIGNoaWxkLnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSA/IGNoaWxkLnRvU3RyaW5nKG9wdGlvbnMpIDogKCcnICsgY2hpbGQpKSlcbiAgICAgICAgLmpvaW4oJycpO1xuICAgIH0pKHRoaXMuY2hpbGRyZW4pO1xuXG4gICAgaWYgKHRhZ05hbWUgPT09ICcjZnJhZ21lbnQnKVxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuXG4gICAgLy8gdGhpcyB3aWxsIG1vcmUgY29tbW9ubHkgbG9vayBsaWtlIHdyaXR0ZW4gaHRtbFxuICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBsZXQgZWxlbWVudFRhZ1N0YXJ0ID0gYDwke3RhZ05hbWV9JHsoYXR0cnMpID8gYCAke2F0dHJzfWAgOiAnJ30+YDtcbiAgICBsZXQgZWxlbWVudFRhZ0VuZCAgID0gYDwvJHt0YWdOYW1lfT5gO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCAnbWFza0hUTUwnKSkge1xuICAgICAgbGV0IGNoYXJDb2RlID0gKHR5cGVvZiBvcHRpb25zLm1hc2tIVE1MID09PSAnbnVtYmVyJykgPyBTdHJpbmcuZnJvbUNoYXJDb2RlKFNVQlNUSVRVVEVfQ0hBUl9DT0RFKSA6IG9wdGlvbnMubWFza0hUTUw7XG4gICAgICBjb25zdCB3aXBlQmxhbmsgPSAoY29udGVudCkgPT4ge1xuICAgICAgICByZXR1cm4gY29udGVudC5yZXBsYWNlKC8uL2csIGNoYXJDb2RlKTtcbiAgICAgIH07XG5cbiAgICAgIGVsZW1lbnRUYWdTdGFydCA9IHdpcGVCbGFuayhlbGVtZW50VGFnU3RhcnQpO1xuICAgICAgZWxlbWVudFRhZ0VuZCA9IHdpcGVCbGFuayhlbGVtZW50VGFnRW5kKTtcblxuICAgICAgaWYgKG9wdGlvbnMubWFza0NoaWxkcmVuUGF0dGVybiAmJiBvcHRpb25zLm1hc2tDaGlsZHJlblBhdHRlcm4udGVzdCh0YWdOYW1lKSlcbiAgICAgICAgY2hpbGRyZW4gPSB3aXBlQmxhbmsoY2hpbGRyZW4pO1xuICAgIH1cblxuICAgIHJldHVybiBgJHtlbGVtZW50VGFnU3RhcnR9JHsoaXNWb2lkVGFnKHRhZ05hbWUpKSA/ICcnIDogYCR7Y2hpbGRyZW59JHtlbGVtZW50VGFnRW5kfWB9YDtcbiAgfVxuXG4gIHRvRE9NQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWUucmVwbGFjZSgvKFtBLVpdKS9nLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGJ1aWxkKG93bmVyRG9jdW1lbnQsIHRlbXBsYXRlT3B0aW9ucykge1xuICAgIGlmICh0aGlzLnRhZ05hbWUgPT09ICcjZnJhZ21lbnQnKVxuICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQuYnVpbGQob3duZXJEb2N1bWVudCwgdGVtcGxhdGVPcHRpb25zKSk7XG5cbiAgICBsZXQgYXR0cmlidXRlcyAgICA9IHRoaXMuYXR0cmlidXRlcztcbiAgICBsZXQgbmFtZXNwYWNlVVJJICA9IGF0dHJpYnV0ZXMubmFtZXNwYWNlVVJJO1xuICAgIGxldCBvcHRpb25zO1xuICAgIGxldCBlbGVtZW50O1xuXG4gICAgaWYgKHRoaXMuYXR0cmlidXRlcy5pcylcbiAgICAgIG9wdGlvbnMgPSB7IGlzOiB0aGlzLmF0dHJpYnV0ZXMuaXMgfTtcblxuICAgIGlmICh0aGlzLnRhZ05hbWUgPT09ICcjdGV4dCcpXG4gICAgICByZXR1cm4gcHJvY2Vzc0VsZW1lbnRzLmNhbGwodGhpcywgb3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhdHRyaWJ1dGVzLnZhbHVlIHx8ICcnKSwgdGVtcGxhdGVPcHRpb25zKTtcblxuICAgIGlmIChuYW1lc3BhY2VVUkkpXG4gICAgICBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCB0aGlzLnRhZ05hbWUsIG9wdGlvbnMpO1xuICAgIGVsc2UgaWYgKGlzU1ZHRWxlbWVudCh0aGlzLnRhZ05hbWUpKVxuICAgICAgZWxlbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIHRoaXMudGFnTmFtZSwgb3B0aW9ucyk7XG4gICAgZWxzZVxuICAgICAgZWxlbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZ05hbWUpO1xuXG4gICAgY29uc3QgZXZlbnROYW1lcyA9IFV0aWxzLmdldEFsbEV2ZW50TmFtZXNGb3JFbGVtZW50KGVsZW1lbnQpO1xuICAgIGNvbnN0IERBVEFfRVZFTlRfUFJFRklYID0gJ2RhdGEtZXZlbnQtb24nO1xuICAgIGNvbnN0IGhhbmRsZUF0dHJpYnV0ZSA9IChlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBfYXR0cmlidXRlVmFsdWUpID0+IHtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgICAgID0gX2F0dHJpYnV0ZVZhbHVlO1xuICAgICAgbGV0IGxvd2VyQXR0cmlidXRlTmFtZSAgPSBhdHRyaWJ1dGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIC8vIE5ldyBkYXRhLWV2ZW50LW9uKiBwYXR0ZXJuIChwcmVmZXJyZWQpXG4gICAgICBpZiAobG93ZXJBdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoREFUQV9FVkVOVF9QUkVGSVgpKSB7XG4gICAgICAgIGxldCBldmVudE5hbWUgPSBsb3dlckF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKERBVEFfRVZFTlRfUFJFRklYLmxlbmd0aCk7XG4gICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICBsZXQgbW9kaWZpZWRBdHRyaWJ1dGVOYW1lID0gdGhpcy50b0RPTUF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobW9kaWZpZWRBdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgVXRpbHMuYmluZERhdGFFdmVudEF0dHJpYnV0ZShlbGVtZW50LCBldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAvLyBMZWdhY3kgb24qIHBhdHRlcm4gKHN0aWxsIHN1cHBvcnRlZCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZHVyaW5nIHRyYW5zaXRpb24pXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50TmFtZXMuaW5kZXhPZihsb3dlckF0dHJpYnV0ZU5hbWUpID49IDApIHtcbiAgICAgICAgVXRpbHMuYmluZEV2ZW50VG9FbGVtZW50LmNhbGwoXG4gICAgICAgICAgVXRpbHMuY3JlYXRlU2NvcGUoZWxlbWVudCwgdGVtcGxhdGVPcHRpb25zLnNjb3BlKSwgLy8gdGhpc1xuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgbG93ZXJBdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygyKSxcbiAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtb2RpZmllZEF0dHJpYnV0ZU5hbWUgPSB0aGlzLnRvRE9NQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobW9kaWZpZWRBdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIER5bmFtaWMgYmluZGluZ3MgYXJlIG5vdCBhbGxvd2VkIGZvciBwcm9wZXJ0aWVzXG4gICAgY29uc3QgaGFuZGxlUHJvcGVydHkgPSAoZWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSA9PiB7XG4gICAgICBsZXQgbmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKElTX1BST1BfTkFNRSwgJycpO1xuICAgICAgZWxlbWVudFtuYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgfTtcblxuICAgIGxldCBhdHRyaWJ1dGVOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVOYW1lICAgPSBhdHRyaWJ1dGVOYW1lc1tpXTtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xuXG4gICAgICBpZiAoSVNfUFJPUF9OQU1FLnRlc3QoYXR0cmlidXRlTmFtZSkpXG4gICAgICAgIGhhbmRsZVByb3BlcnR5KGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgaGFuZGxlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGlsZCAgICAgICAgID0gY2hpbGRyZW5baV07XG4gICAgICAgIGxldCBjaGlsZEVsZW1lbnQgID0gY2hpbGQuYnVpbGQob3duZXJEb2N1bWVudCwgdGVtcGxhdGVPcHRpb25zKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZEVsZW1lbnQpKVxuICAgICAgICAgIGNoaWxkRWxlbWVudC5mbGF0KEluZmluaXR5KS5mb3JFYWNoKChjaGlsZCkgPT4gZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICBlbGVtZW50LFxuICAgICAge1xuICAgICAgICAuLi50ZW1wbGF0ZU9wdGlvbnMsXG4gICAgICAgIHByb2Nlc3NFdmVudENhbGxiYWNrczogZmFsc2UsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSVNfSFRNTF9TQUZFX0NIQVJBQ1RFUiA9IC9eW1xcc2EtekEtWjAtOV8tXSQvO1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8uL2csIChtKSA9PiB7XG4gICAgcmV0dXJuIChJU19IVE1MX1NBRkVfQ0hBUkFDVEVSLnRlc3QobSkpID8gbSA6IGAmIyR7bS5jaGFyQ29kZUF0KDApfTtgO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUF0dHJpYnV0ZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXCImXS9nLCAobSkgPT4ge1xuICAgIHJldHVybiBgJiMke20uY2hhckNvZGVBdCgwKX07YDtcbiAgfSk7XG59XG5cbmNvbnN0IElTX1ZPSURfVEFHID0gL15hcmVhfGJhc2V8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrfHdiciQvaTtcbmV4cG9ydCBmdW5jdGlvbiBpc1ZvaWRUYWcodGFnTmFtZSkge1xuICByZXR1cm4gSVNfVk9JRF9UQUcudGVzdCh0YWdOYW1lLnNwbGl0KCc6Jykuc2xpY2UoLTEpWzBdKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE5vZGVUeXBlKGl0ZW0pIHtcbiAgaWYgKCFpdGVtKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXRlbSBpbnN0YW5jZW9mIE5vZGUpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoaXRlbVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5VGVtcGxhdGUob3duZXJEb2N1bWVudCwgbmFtZU9ySUQpIHtcbiAgaWYgKG5hbWVPcklEIGluc3RhbmNlb2YgTm9kZSlcbiAgICByZXR1cm4gbmFtZU9ySUQ7XG5cbiAgaWYgKCFvd25lckRvY3VtZW50KVxuICAgIHJldHVybjtcblxuICBsZXQgcmVzdWx0ID0gb3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lT3JJRCk7XG4gIGlmICghcmVzdWx0KVxuICAgIHJlc3VsdCA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdGVtcGxhdGVbZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWU9XCIke25hbWVPcklEfVwiIGldLHRlbXBsYXRlW2RhdGEtZm9yPVwiJHtuYW1lT3JJRH1cIiBpXWApO1xuXG4gIGlmICghcmVzdWx0KVxuICAgIHJlc3VsdCA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lT3JJRCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmlsdGVyTm9kZVRyZWUobm9kZSwgZmlsdGVyRnVuYykge1xuICBpZiAoIWZpbHRlckZ1bmMuY2FsbCh0aGlzLCBub2RlKSlcbiAgICByZXR1cm47XG5cbiAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpO1xuICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgY2hpbGRyZW4pIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlsdGVyTm9kZVRyZWUoY2hpbGROb2RlLCBmaWx0ZXJGdW5jKTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwpXG4gICAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZU1lcmdlRnJhZ21lbnQob3duZXJEb2N1bWVudCwgbm9kZSkge1xuICBsZXQgZnJhZ21lbnQgID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGxldCBzZWxlY3RvcnMgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJvbScpIHx8ICcnKS5zcGxpdCgnLCcpLm1hcCgoKHBhcnQpID0+IHBhcnQudHJpbSgpKSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IHNlbGVjdG9ycy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgbGV0IHNlbGVjdG9yICA9IHNlbGVjdG9yc1tpXTtcbiAgICBsZXQgZWxlbWVudCAgID0gcXVlcnlUZW1wbGF0ZShvd25lckRvY3VtZW50LCBzZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGxldCBjbG9uZWROb2RlICA9IChJU19URU1QTEFURS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpID8gZWxlbWVudC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSA6IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgbGV0IGZpbHRlciAgICAgID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJyk7XG4gICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgIGNsb25lZE5vZGUgPSBmaWx0ZXJOb2RlVHJlZS5jYWxsKHRoaXMsIGNsb25lZE5vZGUsIChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICEodHlwZW9mIG5vZGUubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBub2RlLm1hdGNoZXMoZmlsdGVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZWROb2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFX01FUkdFX0VMRU1FTlQgPSAvXm15dGhpeC1tZXJnZSQvaTtcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzRWxlbWVudHMoX25vZGUsIF9vcHRpb25zKSB7XG4gIGxldCBub2RlID0gX25vZGU7XG4gIGlmICghbm9kZSlcbiAgICByZXR1cm4gbm9kZTtcblxuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgc2NvcGUgICAgICAgICA9IG9wdGlvbnMuc2NvcGU7XG4gIGlmICghc2NvcGUpIHtcbiAgICBzY29wZSA9IFV0aWxzLmNyZWF0ZVNjb3BlKG5vZGUpO1xuICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMsIHNjb3BlIH07XG4gIH1cblxuICBsZXQgZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IgPSAob3B0aW9ucy5mb3JjZVRlbXBsYXRlRW5naW5lID09PSB0cnVlKSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMuZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3I7XG4gIGxldCBjaGlsZHJlbiAgICAgICAgICAgICAgICAgICAgICA9IEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKTtcblxuICBpZiAob3B0aW9ucy5mb3JjZVRlbXBsYXRlRW5naW5lICE9PSB0cnVlICYmICFkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3Rvcikge1xuICAgIGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yID0gVXRpbHMuZ2V0RGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IoKTtcbiAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCBkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvciB9O1xuICB9XG5cbiAgbGV0IGlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IgJiYgVXRpbHMuc3BlY2lhbENsb3Nlc3Qobm9kZSwgZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IpKVxuICAgIGlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmhlbHBlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCByZXN1bHQgPSBvcHRpb25zLmhlbHBlci5jYWxsKHRoaXMsIHsgc2NvcGUsIG9wdGlvbnMsIG5vZGUsIGNoaWxkcmVuLCBpc1RlbXBsYXRlRW5naW5lRGlzYWJsZWQsIGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yIH0pO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgbm9kZSA9IHJlc3VsdDtcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBzY29wZS5vd25lckRvY3VtZW50IHx8IG5vZGUub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQVRUUklCVVRFX05PREUpIHtcbiAgICBpZiAoIWlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCkge1xuICAgICAgbGV0IHJlc3VsdCA9IFV0aWxzLmZvcm1hdE5vZGVWYWx1ZShub2RlLCBvcHRpb25zKTtcbiAgICAgIGlmICgoQXJyYXkuaXNBcnJheShyZXN1bHQpICYmIHJlc3VsdC5zb21lKGlzVmFsaWROb2RlVHlwZSkpIHx8IGlzVmFsaWROb2RlVHlwZShyZXN1bHQpKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgIHJlc3VsdCA9IFsgcmVzdWx0IF07XG5cbiAgICAgICAgbGV0IGZyYWdtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRzID0gaXRlbS5idWlsZChvd25lckRvY3VtZW50LCB7IHNjb3BlIH0pO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50cylcbiAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnRzKSlcbiAgICAgICAgICAgICAgZWxlbWVudHMuZmxhdChJbmZpbml0eSkuZm9yRWFjaCgoZWxlbWVudCkgPT4gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50cyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpIHtcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kVG8oZnJhZ21lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGV4dE5vZGUgPSBvd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCgnJyArIGl0ZW0pKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCAhPT0gbm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSAgcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkge1xuICAgIGlmIChJU19URU1QTEFURV9NRVJHRV9FTEVNRU5ULnRlc3Qobm9kZS50YWdOYW1lKSkge1xuICAgICAgbGV0IGZyYWdtZW50ID0gY29tcGlsZU1lcmdlRnJhZ21lbnQuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LCBub2RlKTtcbiAgICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbCh0aGlzLCBmcmFnbWVudCwgeyAuLi5vcHRpb25zLCBzY29wZSB9KTtcbiAgICB9XG5cbiAgICBsZXQgZXZlbnROYW1lcyAgICAgID0gVXRpbHMuZ2V0QWxsRXZlbnROYW1lc0ZvckVsZW1lbnQobm9kZSk7XG4gICAgbGV0IGF0dHJpYnV0ZU5hbWVzICA9IG5vZGUuZ2V0QXR0cmlidXRlTmFtZXMoKTtcbiAgICBjb25zdCBEQVRBX0VWRU5UX1BSRUZJWCA9ICdkYXRhLWV2ZW50LW9uJztcblxuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVOYW1lICAgICAgID0gYXR0cmlidXRlTmFtZXNbaV07XG4gICAgICBsZXQgbG93ZXJBdHRyaWJ1dGVOYW1lICA9IGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgICAgID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cbiAgICAgIC8vIE5ldyBkYXRhLWV2ZW50LW9uKiBwYXR0ZXJuIChwcmVmZXJyZWQpXG4gICAgICBpZiAobG93ZXJBdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoREFUQV9FVkVOVF9QUkVGSVgpKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnByb2Nlc3NFdmVudENhbGxiYWNrcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBsZXQgZXZlbnROYW1lID0gbG93ZXJBdHRyaWJ1dGVOYW1lLnN1YnN0cmluZyhEQVRBX0VWRU5UX1BSRUZJWC5sZW5ndGgpO1xuICAgICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIFV0aWxzLmJpbmREYXRhRXZlbnRBdHRyaWJ1dGUobm9kZSwgZXZlbnROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8vIExlZ2FjeSBvbiogcGF0dGVybiAoc3RpbGwgc3VwcG9ydGVkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSBkdXJpbmcgdHJhbnNpdGlvbilcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnROYW1lcy5pbmRleE9mKGxvd2VyQXR0cmlidXRlTmFtZSkgPj0gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5wcm9jZXNzRXZlbnRDYWxsYmFja3MgIT09IGZhbHNlKSB7XG4gICAgICAgICAgVXRpbHMuYmluZEV2ZW50VG9FbGVtZW50LmNhbGwoXG4gICAgICAgICAgICBVdGlscy5jcmVhdGVTY29wZShub2RlLCBzY29wZSksIC8vIHRoaXNcbiAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICBsb3dlckF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKDIpLFxuICAgICAgICAgICAgYXR0cmlidXRlVmFsdWUsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFV0aWxzLmlzVGVtcGxhdGUoYXR0cmlidXRlVmFsdWUpKSB7XG4gICAgICAgIGxldCBhdHRyaWJ1dGVOb2RlID0gbm9kZS5nZXRBdHRyaWJ1dGVOb2RlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAoYXR0cmlidXRlTm9kZSlcbiAgICAgICAgICBhdHRyaWJ1dGVOb2RlLm5vZGVWYWx1ZSA9IFV0aWxzLmZvcm1hdE5vZGVWYWx1ZShhdHRyaWJ1dGVOb2RlLCB7IC4uLm9wdGlvbnMsIGRpc2FsbG93SFRNTDogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAob3B0aW9ucy5wcm9jZXNzQ2hpbGRyZW4gPT09IGZhbHNlKVxuICAgIHJldHVybiBub2RlO1xuXG4gIGZvciAobGV0IGNoaWxkTm9kZSBvZiBjaGlsZHJlbikge1xuICAgIGxldCByZXN1bHQgPSBwcm9jZXNzRWxlbWVudHMuY2FsbCh0aGlzLCBjaGlsZE5vZGUsIG9wdGlvbnMpO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlICYmIHJlc3VsdCAhPT0gY2hpbGROb2RlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBub2RlLnJlcGxhY2VDaGlsZChyZXN1bHQsIGNoaWxkTm9kZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIE5PT1BcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NoaWxkKHBhcmVudE5vZGUsIGNoaWxkTm9kZSkge1xuICBpZiAoIXBhcmVudE5vZGUgfHwgIWNoaWxkTm9kZSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgZm9yIChsZXQgY2hpbGQgb2YgQXJyYXkuZnJvbShwYXJlbnROb2RlLmNoaWxkTm9kZXMpKSB7XG4gICAgaWYgKGNoaWxkID09PSBjaGlsZE5vZGUpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkKHRhZ05hbWUsIGRlZmF1bHRBdHRyaWJ1dGVzLCBzY29wZSkge1xuICBpZiAoIXRhZ05hbWUgfHwgIUJhc2VVdGlscy5pc1R5cGUodGFnTmFtZSwgJzo6U3RyaW5nJykpXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW4gbm90IGNyZWF0ZSBhbiBFbGVtZW50RGVmaW5pdGlvbiB3aXRob3V0IGEgXCJ0YWdOYW1lXCIuJyk7XG5cbiAgY29uc3QgZmluYWxpemVyID0gKC4uLl9jaGlsZHJlbikgPT4ge1xuICAgIGNvbnN0IHdyYW5nbGVDaGlsZHJlbiA9IChjaGlsZHJlbikgPT4ge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuLmZsYXQoSW5maW5pdHkpLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgT2JqZWN0LmlzKHZhbHVlLCBOYU4pKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh2YWx1ZVtVTkZJTklTSEVEX0RFRklOSVRJT05dKVxuICAgICAgICAgIHJldHVybiB2YWx1ZSgpO1xuXG4gICAgICAgIGlmICh2YWx1ZVtNWVRISVhfVFlQRV0gPT09IEVMRU1FTlRfREVGSU5JVElPTl9UWVBFKVxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWVbTVlUSElYX1RZUEVdID09PSBRVUVSWV9FTkdJTkVfVFlQRSlcbiAgICAgICAgICByZXR1cm4gd3JhbmdsZUNoaWxkcmVuKHZhbHVlLmdldFVuZGVybHlpbmdBcnJheSgpKTtcblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgICAgIHJldHVybiBub2RlVG9FbGVtZW50RGVmaW5pdGlvbih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKCFCYXNlVXRpbHMuaXNUeXBlKHZhbHVlLCAnOjpTdHJpbmcnLCBEeW5hbWljUHJvcGVydHkpKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIHJldHVybiBuZXcgRWxlbWVudERlZmluaXRpb24oJyN0ZXh0JywgeyB2YWx1ZTogKCcnICsgdmFsdWUpIH0pO1xuICAgICAgfSkuZmxhdChJbmZpbml0eSkuZmlsdGVyKEJvb2xlYW4pO1xuICAgIH07XG5cbiAgICBsZXQgY2hpbGRyZW4gPSB3cmFuZ2xlQ2hpbGRyZW4oX2NoaWxkcmVuIHx8IFtdKTtcbiAgICByZXR1cm4gbmV3IEVsZW1lbnREZWZpbml0aW9uKHRhZ05hbWUsIHNjb3BlLCBjaGlsZHJlbik7XG4gIH07XG5cbiAgbGV0IHJvb3RQcm94eSA9IG5ldyBQcm94eShmaW5hbGl6ZXIsIHtcbiAgICBnZXQ6ICh0YXJnZXQsIGF0dHJpYnV0ZU5hbWUpID0+IHtcbiAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSBVTkZJTklTSEVEX0RFRklOSVRJT04pXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZU5hbWUgPT09ICdzeW1ib2wnIHx8IElTX1RBUkdFVF9QUk9QLnRlc3QoYXR0cmlidXRlTmFtZSkpXG4gICAgICAgIHJldHVybiB0YXJnZXRbYXR0cmlidXRlTmFtZV07XG5cbiAgICAgIGlmICghc2NvcGUpIHtcbiAgICAgICAgbGV0IHNjb3BlZFByb3h5ID0gYnVpbGQodGFnTmFtZSwgZGVmYXVsdEF0dHJpYnV0ZXMsIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgZGVmYXVsdEF0dHJpYnV0ZXMgfHwge30pKTtcbiAgICAgICAgcmV0dXJuIHNjb3BlZFByb3h5W2F0dHJpYnV0ZU5hbWVdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3h5KFxuICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICBzY29wZVthdHRyaWJ1dGVOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiByb290UHJveHk7XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBnZXQ6ICh0YXJnZXQsIHByb3BOYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gVU5GSU5JU0hFRF9ERUZJTklUSU9OKVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVOYW1lID09PSAnc3ltYm9sJyB8fCBJU19UQVJHRVRfUFJPUC50ZXN0KGF0dHJpYnV0ZU5hbWUpKVxuICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W2F0dHJpYnV0ZU5hbWVdO1xuXG4gICAgICAgICAgICBzY29wZVthdHRyaWJ1dGVOYW1lXSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gcm9vdFByb3h5W3Byb3BOYW1lXTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gcm9vdFByb3h5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZVRvRWxlbWVudERlZmluaXRpb24obm9kZSkge1xuICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpXG4gICAgcmV0dXJuIG5ldyBFbGVtZW50RGVmaW5pdGlvbignI3RleHQnLCB7IHZhbHVlOiAoJycgKyBub2RlLm5vZGVWYWx1ZSkgfSk7XG5cbiAgaWYgKG5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIG5vZGUubm9kZVR5cGUgIT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSlcbiAgICByZXR1cm47XG5cbiAgbGV0IGF0dHJpYnV0ZXMgPSB7fTtcblxuICBpZiAodHlwZW9mIG5vZGUuZ2V0QXR0cmlidXRlTmFtZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBmb3IgKGxldCBhdHRyaWJ1dGVOYW1lIG9mIG5vZGUuZ2V0QXR0cmlidXRlTmFtZXMoKSlcbiAgICAgIGF0dHJpYnV0ZXNbYXR0cmlidXRlTmFtZV0gPSBub2RlLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcbiAgfVxuXG4gIGxldCBjaGlsZHJlbiA9IEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKS5tYXAobm9kZVRvRWxlbWVudERlZmluaXRpb24pO1xuICByZXR1cm4gbmV3IEVsZW1lbnREZWZpbml0aW9uKChub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpID8gJyNmcmFnbWVudCcgOiBub2RlLnRhZ05hbWUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKTtcbn1cblxuY29uc3QgSVNfVEVNUExBVEUgPSAvXih0ZW1wbGF0ZSkkL2k7XG5cbi8qKlxuICAgKiBwYXJlbnQ6IEVsZW1lbnRzXG4gICAqIGdyb3VwTmFtZTogRWxlbWVudHNcbiAgICogZGVzYzogfFxuICAgKiAgIEFsbW9zdCBsaWtlIGBPYmplY3QuYXNzaWduYCwgbWVyZ2UgYWxsIGNvbXBvbmVudCBjaGlsZHJlbiBpbnRvIGEgc2luZ2xlIG5vZGUgKHRoZSBgdGFyZ2V0YCkuXG4gICAqXG4gICAqICAgVGhpcyBpcyBcInRlbXBsYXRlIGludGVsbGlnZW50XCIsIG1lYW5pbmcgZm9yIGA8dGVtcGxhdGU+YCBlbGVtZW50cyBzcGVjaWZpY2FsbHksIGl0IHdpbGwgZXhlY3V0ZVxuICAgKiAgIGBjaGlsZHJlbiA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmNoaWxkTm9kZXNgIHRvIGNsb25lIGFsbCB0aGUgY2hpbGQgbm9kZXMsIGFuZCBub3RcbiAgICogICBtb2RpZnkgdGhlIG9yaWdpbmFsIHRlbXBsYXRlLiBJdCBpcyBhbHNvIHRlbXBsYXRlIGludGVsbGlnZW50IGJ5IHRoZSBmYWN0IHRoYXQgaWYgdGhlIGB0YXJnZXRgIGlzXG4gICAqICAgYSB0ZW1wbGF0ZSwgaXQgd2lsbCBhZGQgdGhlIGNoaWxkcmVuIHRvIGBjb250ZW50YCBwcm9wZXJseS5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogdGFyZ2V0XG4gICAqICAgICBkYXRhVHlwZXM6IE5vZGVcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIHRhcmdldCBOb2RlIHRvIG1lcmdlIGFsbCBjaGlsZHJlbiBpbnRvLiBJZiB0aGlzIE5vZGUgaXMgYSBgPHRlbXBsYXRlPmAgTm9kZSwgdGhlbiBpdCB3aWxsXG4gICAqICAgICAgIHBsYWNlIGFsbCB0aGUgbWVyZ2VkIGNoaWxkcmVuIGludG8gYHRlbXBsYXRlLmNvbnRlbnRgLlxuICAgKiBub3RlczpcbiAgICogICAtIEFueSB0ZW1wbGF0ZSBOb2RlIHdpbGwgYmUgY2xvbmVkLCBhbmQgc28gdGhlIG9yaWdpbmFsIHdpbGwgbm90IGJlIG1vZGlmaWVkLiBBbGwgb3RoZXIgbm9kZXMgYXJlICoqTk9UKipcbiAgICogICAgIGNsb25lZCBiZWZvcmUgdGhlIG1lcmdlLCBhbmQgc28gd2lsbCBiZSBzdHJpcHBlZCBvZiB0aGVpciBjaGlsZHJlbi5cbiAgICogICAtIE1ha2UgY2VydGFpbiB5b3UgZGVlcCBjbG9uZSBhbnkgZWxlbWVudCBmaXJzdCAoZXhjZXB0IHRlbXBsYXRlcykgaWYgeW91IGRvbid0IHdhbnQgdGhlIHByb3ZpZGVkIGVsZW1lbnRzXG4gICAqICAgICB0byBiZSBtb2RpZmllZC5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIE5vZGU7IFRoZSBwcm92aWRlZCBgdGFyZ2V0YCwgd2l0aCBhbGwgY2hpbGRyZW4gbWVyZ2VkIChhZGRlZCkgaW50byBpdC5cbiAgICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VDaGlsZHJlbih0YXJnZXQsIC4uLm90aGVycykge1xuICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSlcbiAgICByZXR1cm4gdGFyZ2V0O1xuXG4gIGxldCB0YXJnZXRJc1RlbXBsYXRlID0gSVNfVEVNUExBVEUudGVzdCh0YXJnZXQudGFnTmFtZSk7XG4gIGZvciAobGV0IG90aGVyIG9mIG90aGVycykge1xuICAgIGlmICghKG90aGVyIGluc3RhbmNlb2YgTm9kZSkpXG4gICAgICBjb250aW51ZTtcblxuICAgIGxldCBjaGlsZE5vZGVzID0gKElTX1RFTVBMQVRFLnRlc3Qob3RoZXIudGFnTmFtZSkpID8gb3RoZXIuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkuY2hpbGROb2RlcyA6IG90aGVyLmNoaWxkTm9kZXM7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgQXJyYXkuZnJvbShjaGlsZE5vZGVzKSkge1xuICAgICAgbGV0IGNvbnRlbnQgPSAoSVNfVEVNUExBVEUudGVzdChjaGlsZC50YWdOYW1lKSkgPyBjaGlsZC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSA6IGNoaWxkO1xuICAgICAgaWYgKHRhcmdldElzVGVtcGxhdGUpXG4gICAgICAgIHRhcmdldC5jb250ZW50LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3QgSVNfU1ZHX0VMRU1FTlRfTkFNRSA9IC9eKGFsdGdseXBofGFsdGdseXBoZGVmfGFsdGdseXBoaXRlbXxhbmltYXRlfGFuaW1hdGVDb2xvcnxhbmltYXRlTW90aW9ufGFuaW1hdGVUcmFuc2Zvcm18YW5pbWF0aW9ufGNpcmNsZXxjbGlwUGF0aHxjb2xvclByb2ZpbGV8Y3Vyc29yfGRlZnN8ZGVzY3xkaXNjYXJkfGVsbGlwc2V8ZmVibGVuZHxmZWNvbG9ybWF0cml4fGZlY29tcG9uZW50dHJhbnNmZXJ8ZmVjb21wb3NpdGV8ZmVjb252b2x2ZW1hdHJpeHxmZWRpZmZ1c2VsaWdodGluZ3xmZWRpc3BsYWNlbWVudG1hcHxmZWRpc3RhbnRsaWdodHxmZWRyb3BzaGFkb3d8ZmVmbG9vZHxmZWZ1bmNhfGZlZnVuY2J8ZmVmdW5jZ3xmZWZ1bmNyfGZlZ2F1c3NpYW5ibHVyfGZlaW1hZ2V8ZmVtZXJnZXxmZW1lcmdlbm9kZXxmZW1vcnBob2xvZ3l8ZmVvZmZzZXR8ZmVwb2ludGxpZ2h0fGZlc3BlY3VsYXJsaWdodGluZ3xmZXNwb3RsaWdodHxmZXRpbGV8ZmV0dXJidWxlbmNlfGZpbHRlcnxmb250fGZvbnRGYWNlfGZvbnRGYWNlRm9ybWF0fGZvbnRGYWNlTmFtZXxmb250RmFjZVNyY3xmb250RmFjZVVyaXxmb3JlaWduT2JqZWN0fGd8Z2x5cGh8Z2x5cGhSZWZ8aGFuZGxlcnxoS2VybnxpbWFnZXxsaW5lfGxpbmVhcmdyYWRpZW50fGxpc3RlbmVyfG1hcmtlcnxtYXNrfG1ldGFkYXRhfG1pc3NpbmdHbHlwaHxtUGF0aHxwYXRofHBhdHRlcm58cG9seWdvbnxwb2x5bGluZXxwcmVmZXRjaHxyYWRpYWxncmFkaWVudHxyZWN0fHNldHxzb2xpZENvbG9yfHN0b3B8c3ZnfHN3aXRjaHxzeW1ib2x8dGJyZWFrfHRleHR8dGV4dHBhdGh8dHJlZnx0c3Bhbnx1bmtub3dufHVzZXx2aWV3fHZLZXJuKSQvaTtcbmV4cG9ydCBmdW5jdGlvbiBpc1NWR0VsZW1lbnQodGFnTmFtZSkge1xuICByZXR1cm4gSVNfU1ZHX0VMRU1FTlRfTkFNRS50ZXN0KHRhZ05hbWUpO1xufVxuXG5leHBvcnQgY29uc3QgVGVybSA9ICh2YWx1ZSkgPT4gbmV3IEVsZW1lbnREZWZpbml0aW9uKCcjdGV4dCcsIHsgdmFsdWUgfSk7XG5leHBvcnQgY29uc3QgRWxlbWVudEdlbmVyYXRvciA9IG5ldyBQcm94eShcbiAge1xuICAgIFRlcm0sXG4gICAgJFRFWFQ6IFRlcm0sXG4gIH0sXG4gIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKHRhcmdldCwgcHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICAgIHJldHVybiB0YXJnZXRbcHJvcE5hbWVdO1xuXG4gICAgICBpZiAoSVNfU1ZHX0VMRU1FTlRfTkFNRS50ZXN0KHByb3BOYW1lKSkge1xuICAgICAgICAvLyBTVkcgZWxlbWVudHNcbiAgICAgICAgcmV0dXJuIGJ1aWxkKHByb3BOYW1lLCB7IG5hbWVzcGFjZVVSSTogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJ1aWxkKHByb3BOYW1lKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBOT09QXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9LFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IEVycm9yc1xuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgYGltcG9ydCB7IEVycm9ycyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgQ3VzdG9tIGVycm9yIGNsYXNzZXMgZm9yIE15dGhpeCBVSSB0aGF0IHByb3ZpZGUgY29udGV4dHVhbCwgYWN0aW9uYWJsZSBlcnJvciBtZXNzYWdlcy5cbiAqL1xuXG4vKipcbiAqIHR5cGU6IENsYXNzXG4gKiBuYW1lOiBNeXRoaXhFcnJvclxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEJhc2UgZXJyb3IgY2xhc3MgZm9yIGFsbCBNeXRoaXggVUkgZXJyb3JzLiBQcm92aWRlcyBjb25zaXN0ZW50IGVycm9yIGZvcm1hdHRpbmdcbiAqICAgYW5kIGNvbnRleHQgYXR0YWNobWVudCBjYXBhYmlsaXRpZXMuXG4gKi9cblxuLyoqXG4gKiBCYXNlIGVycm9yIGNsYXNzIGZvciBhbGwgTXl0aGl4IFVJIGVycm9ycy5cbiAqIEBleHRlbmRzIEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBNeXRoaXhFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIE15dGhpeEVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9e31dIC0gQWRkaXRpb25hbCBjb250ZXh0IGZvciBkZWJ1Z2dpbmcuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb250ZXh0ID0ge30pIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLm5hbWUgPSAnTXl0aGl4RXJyb3InO1xuICAgIC8qKiBAdHlwZSB7T2JqZWN0fSAqL1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogbmFtZTogdG9TdHJpbmdcbiAgICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAgICogcGFyZW50OiBNeXRoaXhFcnJvclxuICAgKiBkZXNjOiB8XG4gICAqICAgRm9ybWF0IHRoZSBlcnJvciBtZXNzYWdlIHdpdGggY29udGV4dCBmb3IgZGV2ZWxvcGVyLWZyaWVuZGx5IG91dHB1dC5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIHN0cmluZzsgVGhlIGZvcm1hdHRlZCBlcnJvciBtZXNzYWdlLlxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHBhcnRzID0gWyBgJHt0aGlzLm5hbWV9OiAke3RoaXMubWVzc2FnZX1gIF07XG5cbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jb250ZXh0KS5sZW5ndGggPiAwKVxuICAgICAgcGFydHMucHVzaChgXFxuQ29udGV4dDogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRleHQsIG51bGwsIDIpfWApO1xuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJycpO1xuICB9XG59XG5cbi8qKlxuICogdHlwZTogQ2xhc3NcbiAqIG5hbWU6IFRlbXBsYXRlRXJyb3JcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBFcnJvciB0aHJvd24gZHVyaW5nIHRlbXBsYXRlIHBhcnNpbmcgb3IgY29tcGlsYXRpb24uIEluY2x1ZGVzIHRoZSBmYWlsaW5nIGV4cHJlc3Npb24sXG4gKiAgIGF2YWlsYWJsZSBzY29wZSB2YXJpYWJsZXMsIGFuZCBzb3VyY2UgY29udGV4dCBmb3IgZGVidWdnaW5nLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICB0aHJvdyBuZXcgVGVtcGxhdGVFcnJvcignRmFpbGVkIHRvIGV2YWx1YXRlIGV4cHJlc3Npb24nLCB7XG4gKiAgICAgICBleHByZXNzaW9uOiAndXNlci5uYW1lJyxcbiAqICAgICAgIHNjb3BlVmFyaWFibGVzOiBbJ2NvdW50JywgJ2l0ZW1zJ10sXG4gKiAgICAgICBjb21wb25lbnRUYWdOYW1lOiAnbXktY29tcG9uZW50JyxcbiAqICAgICB9KTtcbiAqICAgICBgYGBcbiAqL1xuXG4vKipcbiAqIEVycm9yIHRocm93biBkdXJpbmcgdGVtcGxhdGUgcGFyc2luZyBvciBjb21waWxhdGlvbi5cbiAqIEBleHRlbmRzIE15dGhpeEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBUZW1wbGF0ZUVycm9yIGV4dGVuZHMgTXl0aGl4RXJyb3Ige1xuICAvKipcbiAgICogQ3JlYXRlIGEgVGVtcGxhdGVFcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXt9XSAtIEFkZGl0aW9uYWwgY29udGV4dCBmb3IgZGVidWdnaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQuZXhwcmVzc2lvbl0gLSBUaGUgZmFpbGluZyB0ZW1wbGF0ZSBleHByZXNzaW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBbY29udGV4dC5zY29wZVZhcmlhYmxlc10gLSBBdmFpbGFibGUgc2NvcGUgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge3tzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcn19IFtjb250ZXh0LnBvc2l0aW9uXSAtIFBvc2l0aW9uIGluIHNvdXJjZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnN1Z2dlc3Rpb25dIC0gQWN0aW9uYWJsZSBzdWdnZXN0aW9uIGZvciBmaXhpbmcgdGhlIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29udGV4dCA9IHt9KSB7XG4gICAgc3VwZXIobWVzc2FnZSwgY29udGV4dCk7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5uYW1lID0gJ1RlbXBsYXRlRXJyb3InO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bGx9ICovXG4gICAgdGhpcy5leHByZXNzaW9uID0gY29udGV4dC5leHByZXNzaW9uIHx8IG51bGw7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmdbXX0gKi9cbiAgICB0aGlzLnNjb3BlVmFyaWFibGVzID0gY29udGV4dC5zY29wZVZhcmlhYmxlcyB8fCBbXTtcbiAgICAvKiogQHR5cGUge3tzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlcn18bnVsbH0gKi9cbiAgICB0aGlzLnBvc2l0aW9uID0gY29udGV4dC5wb3NpdGlvbiB8fCBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHBhcnRzID0gWyBgJHt0aGlzLm5hbWV9OiAke3RoaXMubWVzc2FnZX1gIF07XG5cbiAgICBpZiAodGhpcy5leHByZXNzaW9uKVxuICAgICAgcGFydHMucHVzaChgXFxuICBFeHByZXNzaW9uOiBAQCR7dGhpcy5leHByZXNzaW9ufUBAYCk7XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbilcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgUG9zaXRpb246ICR7dGhpcy5wb3NpdGlvbi5zdGFydH0tJHt0aGlzLnBvc2l0aW9uLmVuZH1gKTtcblxuICAgIGlmICh0aGlzLnNjb3BlVmFyaWFibGVzLmxlbmd0aCA+IDApXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIEF2YWlsYWJsZSB2YXJpYWJsZXM6ICR7dGhpcy5zY29wZVZhcmlhYmxlcy5qb2luKCcsICcpfWApO1xuXG4gICAgaWYgKHRoaXMuY29udGV4dC5zdWdnZXN0aW9uKVxuICAgICAgcGFydHMucHVzaChgXFxuICBTdWdnZXN0aW9uOiAke3RoaXMuY29udGV4dC5zdWdnZXN0aW9ufWApO1xuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJycpO1xuICB9XG59XG5cbi8qKlxuICogdHlwZTogQ2xhc3NcbiAqIG5hbWU6IENvbXBvbmVudEVycm9yXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgRXJyb3IgdGhyb3duIGR1cmluZyBjb21wb25lbnQgbGlmZWN5Y2xlIG9wZXJhdGlvbnMuIEluY2x1ZGVzIHRoZSBjb21wb25lbnQgdGFnIG5hbWUsXG4gKiAgIGxpZmVjeWNsZSBwaGFzZSwgYW5kIHRydW5jYXRlZCBvdXRlckhUTUwgZm9yIGNvbnRleHQuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIHRocm93IG5ldyBDb21wb25lbnRFcnJvcignRXJyb3IgaW4gbW91bnRlZCgpIGNhbGxiYWNrJywge1xuICogICAgICAgdGFnTmFtZTogJ215LWNvbXBvbmVudCcsXG4gKiAgICAgICBwaGFzZTogJ21vdW50ZWQnLFxuICogICAgICAgb3V0ZXJIVE1MOiAnPG15LWNvbXBvbmVudCBhdHRyPVwidmFsdWVcIj4uLi48L215LWNvbXBvbmVudD4nLFxuICogICAgIH0pO1xuICogICAgIGBgYFxuICovXG5cbi8qKlxuICogRXJyb3IgdGhyb3duIGR1cmluZyBjb21wb25lbnQgbGlmZWN5Y2xlIG9wZXJhdGlvbnMuXG4gKiBAZXh0ZW5kcyBNeXRoaXhFcnJvclxuICovXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50RXJyb3IgZXh0ZW5kcyBNeXRoaXhFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBDb21wb25lbnRFcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXt9XSAtIEFkZGl0aW9uYWwgY29udGV4dCBmb3IgZGVidWdnaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQudGFnTmFtZV0gLSBUaGUgY29tcG9uZW50J3MgdGFnIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5waGFzZV0gLSBUaGUgbGlmZWN5Y2xlIHBoYXNlICgnbW91bnRlZCcsICd1bm1vdW50ZWQnLCBldGMuKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0Lm91dGVySFRNTF0gLSBUaGUgY29tcG9uZW50J3Mgb3V0ZXJIVE1MLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQuc3VnZ2VzdGlvbl0gLSBBY3Rpb25hYmxlIHN1Z2dlc3Rpb24gZm9yIGZpeGluZyB0aGUgZXJyb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb250ZXh0ID0ge30pIHtcbiAgICBzdXBlcihtZXNzYWdlLCBjb250ZXh0KTtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLm5hbWUgPSAnQ29tcG9uZW50RXJyb3InO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMudGFnTmFtZSA9IGNvbnRleHQudGFnTmFtZSB8fCAndW5rbm93bic7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd8bnVsbH0gKi9cbiAgICB0aGlzLnBoYXNlID0gY29udGV4dC5waGFzZSB8fCBudWxsO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bGx9ICovXG4gICAgdGhpcy5vdXRlckhUTUwgPSBjb250ZXh0Lm91dGVySFRNTCB8fCBudWxsO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHBhcnRzID0gWyBgJHt0aGlzLm5hbWV9OiAke3RoaXMubWVzc2FnZX1gIF07XG5cbiAgICBwYXJ0cy5wdXNoKGBcXG4gIENvbXBvbmVudDogPCR7dGhpcy50YWdOYW1lfT5gKTtcblxuICAgIGlmICh0aGlzLnBoYXNlKVxuICAgICAgcGFydHMucHVzaChgXFxuICBMaWZlY3ljbGUgcGhhc2U6ICR7dGhpcy5waGFzZX1gKTtcblxuICAgIGlmICh0aGlzLm91dGVySFRNTCkge1xuICAgICAgbGV0IHRydW5jYXRlZCA9IHRoaXMub3V0ZXJIVE1MLmxlbmd0aCA+IDIwMFxuICAgICAgICA/IHRoaXMub3V0ZXJIVE1MLnN1YnN0cmluZygwLCAyMDApICsgJy4uLidcbiAgICAgICAgOiB0aGlzLm91dGVySFRNTDtcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgRWxlbWVudDogJHt0cnVuY2F0ZWR9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29udGV4dC5zdWdnZXN0aW9uKVxuICAgICAgcGFydHMucHVzaChgXFxuICBTdWdnZXN0aW9uOiAke3RoaXMuY29udGV4dC5zdWdnZXN0aW9ufWApO1xuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJycpO1xuICB9XG59XG5cbi8qKlxuICogdHlwZTogQ2xhc3NcbiAqIG5hbWU6IER5bmFtaWNQcm9wZXJ0eUVycm9yXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgRXJyb3IgdGhyb3duIHdoZW4gYWNjZXNzaW5nIG9yIG1vZGlmeWluZyBEeW5hbWljUHJvcGVydHkgdmFsdWVzIGluY29ycmVjdGx5LlxuICovXG5cbi8qKlxuICogRXJyb3IgdGhyb3duIHdoZW4gYWNjZXNzaW5nIG9yIG1vZGlmeWluZyBEeW5hbWljUHJvcGVydHkgdmFsdWVzIGluY29ycmVjdGx5LlxuICogQGV4dGVuZHMgTXl0aGl4RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIER5bmFtaWNQcm9wZXJ0eUVycm9yIGV4dGVuZHMgTXl0aGl4RXJyb3Ige1xuICAvKipcbiAgICogQ3JlYXRlIGEgRHluYW1pY1Byb3BlcnR5RXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD17fV0gLSBBZGRpdGlvbmFsIGNvbnRleHQgZm9yIGRlYnVnZ2luZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnByb3BlcnR5UGF0aF0gLSBUaGUgcHJvcGVydHkgcGF0aCBiZWluZyBhY2Nlc3NlZC5cbiAgICogQHBhcmFtIHsqfSBbY29udGV4dC5jdXJyZW50VmFsdWVdIC0gVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIHByb3BlcnR5LlxuICAgKiBAcGFyYW0geyp9IFtjb250ZXh0LmF0dGVtcHRlZFZhbHVlXSAtIFRoZSB2YWx1ZSB0aGF0IHdhcyBhdHRlbXB0ZWQgdG8gYmUgc2V0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQuc3VnZ2VzdGlvbl0gLSBBY3Rpb25hYmxlIHN1Z2dlc3Rpb24gZm9yIGZpeGluZyB0aGUgZXJyb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb250ZXh0ID0ge30pIHtcbiAgICBzdXBlcihtZXNzYWdlLCBjb250ZXh0KTtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLm5hbWUgPSAnRHluYW1pY1Byb3BlcnR5RXJyb3InO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bGx9ICovXG4gICAgdGhpcy5wcm9wZXJ0eVBhdGggPSBjb250ZXh0LnByb3BlcnR5UGF0aCB8fCBudWxsO1xuICAgIC8qKiBAdHlwZSB7Kn0gKi9cbiAgICB0aGlzLmN1cnJlbnRWYWx1ZSA9IGNvbnRleHQuY3VycmVudFZhbHVlO1xuICAgIC8qKiBAdHlwZSB7Kn0gKi9cbiAgICB0aGlzLmF0dGVtcHRlZFZhbHVlID0gY29udGV4dC5hdHRlbXB0ZWRWYWx1ZTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBwYXJ0cyA9IFsgYCR7dGhpcy5uYW1lfTogJHt0aGlzLm1lc3NhZ2V9YCBdO1xuXG4gICAgaWYgKHRoaXMucHJvcGVydHlQYXRoKVxuICAgICAgcGFydHMucHVzaChgXFxuICBQcm9wZXJ0eSBwYXRoOiAke3RoaXMucHJvcGVydHlQYXRofWApO1xuXG4gICAgaWYgKHRoaXMuY29udGV4dC5zdWdnZXN0aW9uKVxuICAgICAgcGFydHMucHVzaChgXFxuICBTdWdnZXN0aW9uOiAke3RoaXMuY29udGV4dC5zdWdnZXN0aW9ufWApO1xuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJycpO1xuICB9XG59XG5cbi8qKlxuICogdHlwZTogQ29uc3RhbnRcbiAqIG5hbWU6IE1ZVEhJWF9ERUJVR1xuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEZsYWcgdG8gZW5hYmxlIHZlcmJvc2UgZGVidWcgbG9nZ2luZy4gU2V0IGBnbG9iYWxUaGlzLk1ZVEhJWF9ERUJVRyA9IHRydWVgIHRvIGVuYWJsZS5cbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGRlYnVnIG1vZGUgaXMgZW5hYmxlZC5cbiAqIFNldCBgZ2xvYmFsVGhpcy5NWVRISVhfREVCVUcgPSB0cnVlYCB0byBlbmFibGUgdmVyYm9zZSBsb2dnaW5nLlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgZGVidWcgbW9kZSBpcyBlbmFibGVkLlxuICovXG5leHBvcnQgY29uc3QgaXNEZWJ1Z01vZGUgPSAoKSA9PiB7XG4gIHJldHVybiBnbG9iYWxUaGlzLk1ZVEhJWF9ERUJVRyA9PT0gdHJ1ZTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGRlYnVnTG9nXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgTG9nIGEgbWVzc2FnZSBvbmx5IHdoZW4gTVlUSElYX0RFQlVHIGlzIGVuYWJsZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbWVzc2FnZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgbWVzc2FnZSB0byBsb2cuXG4gKiAgIC0gbmFtZTogZGF0YVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IEFkZGl0aW9uYWwgZGF0YSB0byBpbmNsdWRlIGluIHRoZSBsb2cuXG4gKi9cblxuLyoqXG4gKiBMb2cgYSBkZWJ1ZyBtZXNzYWdlIChvbmx5IHdoZW4gTVlUSElYX0RFQlVHIGlzIGVuYWJsZWQpLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBsb2cuXG4gKiBAcGFyYW0geyp9IFtkYXRhXSAtIEFkZGl0aW9uYWwgZGF0YSB0byBpbmNsdWRlIGluIHRoZSBsb2cuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnTG9nID0gKG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgaWYgKCFpc0RlYnVnTW9kZSgpKVxuICAgIHJldHVybjtcblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgIGNvbnNvbGUuZGVidWcoYFtNeXRoaXhVSSBEZWJ1Z10gJHttZXNzYWdlfWAsIGRhdGEpO1xuICBlbHNlXG4gICAgY29uc29sZS5kZWJ1ZyhgW015dGhpeFVJIERlYnVnXSAke21lc3NhZ2V9YCk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBkZWJ1Z1dhcm5cbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBMb2cgYSB3YXJuaW5nIG9ubHkgd2hlbiBNWVRISVhfREVCVUcgaXMgZW5hYmxlZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBtZXNzYWdlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiAgIC0gbmFtZTogZGF0YVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IEFkZGl0aW9uYWwgZGF0YSB0byBpbmNsdWRlLlxuICovXG5cbi8qKlxuICogTG9nIGEgd2FybmluZyBtZXNzYWdlIChvbmx5IHdoZW4gTVlUSElYX0RFQlVHIGlzIGVuYWJsZWQpLlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHBhcmFtIHsqfSBbZGF0YV0gLSBBZGRpdGlvbmFsIGRhdGEgdG8gaW5jbHVkZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3QgZGVidWdXYXJuID0gKG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgaWYgKCFpc0RlYnVnTW9kZSgpKVxuICAgIHJldHVybjtcblxuICBpZiAoZGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgIGNvbnNvbGUud2FybihgW015dGhpeFVJIFdhcm5pbmddICR7bWVzc2FnZX1gLCBkYXRhKTtcbiAgZWxzZVxuICAgIGNvbnNvbGUud2FybihgW015dGhpeFVJIFdhcm5pbmddICR7bWVzc2FnZX1gKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGZvcm1hdENvbXBvbmVudENvbnRleHRcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBDcmVhdGUgYSBjb250ZXh0IG9iamVjdCBmb3IgY29tcG9uZW50IGVycm9yIHJlcG9ydGluZy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBjb21wb25lbnRcbiAqICAgICBkYXRhVHlwZTogSFRNTEVsZW1lbnRcbiAqICAgICBkZXNjOiBUaGUgY29tcG9uZW50IGluc3RhbmNlLlxuICogICAtIG5hbWU6IHBoYXNlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBsaWZlY3ljbGUgcGhhc2UgKGUuZy4sICdtb3VudGVkJywgJ3VubW91bnRlZCcpLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBvYmplY3Q7IENvbnRleHQgb2JqZWN0IHN1aXRhYmxlIGZvciBDb21wb25lbnRFcnJvci5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIGNvbnRleHQgb2JqZWN0IGZvciBjb21wb25lbnQgZXJyb3IgcmVwb3J0aW5nLlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29tcG9uZW50IC0gVGhlIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwaGFzZSAtIFRoZSBsaWZlY3ljbGUgcGhhc2UgKCdtb3VudGVkJywgJ3VubW91bnRlZCcsIGV0Yy4pLlxuICogQHJldHVybnMge3t0YWdOYW1lOiBzdHJpbmcsIHBoYXNlOiBzdHJpbmcsIG91dGVySFRNTDogc3RyaW5nfX0gQ29udGV4dCBvYmplY3Qgc3VpdGFibGUgZm9yIENvbXBvbmVudEVycm9yLlxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0Q29tcG9uZW50Q29udGV4dCA9IChjb21wb25lbnQsIHBoYXNlKSA9PiB7XG4gIGxldCBvdXRlckhUTUwgPSAnJztcblxuICB0cnkge1xuICAgIG91dGVySFRNTCA9IGNvbXBvbmVudC5vdXRlckhUTUwgfHwgJyc7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgb3V0ZXJIVE1MID0gYDwke2NvbXBvbmVudC50YWdOYW1lPy50b0xvd2VyQ2FzZSgpIHx8ICd1bmtub3duJ30+YDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGFnTmFtZTogICBjb21wb25lbnQudGFnTmFtZT8udG9Mb3dlckNhc2UoKSB8fCAndW5rbm93bicsXG4gICAgcGhhc2U6ICAgICBwaGFzZSxcbiAgICBvdXRlckhUTUw6IG91dGVySFRNTCxcbiAgfTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGZvcm1hdFNjb3BlVmFyaWFibGVzXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgRXh0cmFjdCBhdmFpbGFibGUgdmFyaWFibGUgbmFtZXMgZnJvbSBhIHNjb3BlIG9iamVjdCBmb3IgZXJyb3IgY29udGV4dC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBzY29wZVxuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBkZXNjOiBUaGUgc2NvcGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIEFycmF5PHN0cmluZz47IExpc3Qgb2YgdmFyaWFibGUgbmFtZXMgYXZhaWxhYmxlIGluIHNjb3BlLlxuICovXG5cbi8qKlxuICogRXh0cmFjdCBhdmFpbGFibGUgdmFyaWFibGUgbmFtZXMgZnJvbSBhIHNjb3BlIG9iamVjdCBmb3IgZXJyb3IgY29udGV4dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzY29wZSAtIFRoZSBzY29wZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gTGlzdCBvZiB2YXJpYWJsZSBuYW1lcyBhdmFpbGFibGUgaW4gc2NvcGUuXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRTY29wZVZhcmlhYmxlcyA9IChzY29wZSkgPT4ge1xuICBpZiAoIXNjb3BlKVxuICAgIHJldHVybiBbXTtcblxuICBsZXQgdmFyaWFibGVzID0gW107XG5cbiAgdHJ5IHtcbiAgICAvLyBHZXQgb3duIHByb3BlcnRpZXNcbiAgICB2YXJpYWJsZXMgPSBPYmplY3Qua2V5cyhzY29wZSk7XG5cbiAgICAvLyBBbHNvIGNoZWNrIHByb3RvdHlwZSBjaGFpbiBmb3Igc2NvcGUgcHJveGllc1xuICAgIGxldCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzY29wZSk7XG4gICAgd2hpbGUgKHByb3RvICYmIHByb3RvICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pKSB7XG4gICAgICAgIGlmICghdmFyaWFibGVzLmluY2x1ZGVzKGtleSkgJiYga2V5ICE9PSAnY29uc3RydWN0b3InKVxuICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIElnbm9yZSBlcnJvcnMgZnJvbSBwcm94eSB0cmFwc1xuICB9XG5cbiAgcmV0dXJuIHZhcmlhYmxlcy5maWx0ZXIoKHYpID0+ICF2LnN0YXJ0c1dpdGgoJ18nKSk7XG59O1xuIiwiaW1wb3J0IHtcbiAgTVlUSElYX1RZUEUsXG4gIE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSxcbiAgTVlUSElYX0RPQ1VNRU5UX0lOSVRJQUxJWkVELFxuICBNWVRISVhfU0hBRE9XX1BBUkVOVCxcbiAgVU5GSU5JU0hFRF9ERUZJTklUSU9OLFxufSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbmltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzICBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgICAgICAgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzICAgICAgICAgICBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCB7IFF1ZXJ5RW5naW5lIH0gICAgICBmcm9tICcuL3F1ZXJ5LWVuZ2luZS5qcyc7XG5pbXBvcnQgKiBhcyBFbGVtZW50cyAgICAgICAgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5pbXBvcnQge1xuICBDb21wb25lbnRFcnJvcixcbiAgZm9ybWF0Q29tcG9uZW50Q29udGV4dCxcbiAgZGVidWdMb2csXG59IGZyb20gJy4vZXJyb3JzLmpzJztcbmltcG9ydCAqIGFzIFN0eWxlU2hlZXRNYW5hZ2VyIGZyb20gJy4vc3R5bGVzaGVldC1tYW5hZ2VyLmpzJztcblxuZXhwb3J0IGNvbnN0IGlzTXl0aGl4Q29tcG9uZW50ID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29tcG9uZW50L2NvbnN0YW50cy9pcy1teXRoaXgtY29tcG9uZW50Jyk7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuaXNNeXRoaXhDb21wb25lbnRcblxuY29uc3QgSVNfQVRUUl9NRVRIT0RfTkFNRSAgID0gL15hdHRyXFwkKC4qKSQvO1xuY29uc3QgUkVHSVNURVJFRF9DT01QT05FTlRTID0gbmV3IFNldCgpO1xuXG4vKioqXG4gKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gKiBkZXNjOiB8XG4gKiAgIFRoaXMgdGhlIGJhc2UgY2xhc3Mgb2YgYWxsIE15dGhpeCBVSSBjb21wb25lbnRzLiBJdCBpbmhlcml0c1xuICogICBmcm9tIEhUTUxFbGVtZW50LCBhbmQgc28gd2lsbCBlbmQgdXAgYmVpbmcgYSBbV2ViIENvbXBvbmVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9Db21wb25lbnRzKS5cbiAqXG4gKiAgIEl0IGlzIHN0cm9uZ2x5IHJlY29tbWVuZGVkIHRoYXQgeW91IGZ1bGx5IHJlYWQgdXAgYW5kIHVuZGVyc3RhbmRcbiAqICAgW1dlYiBDb21wb25lbnRzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX0NvbXBvbmVudHMpXG4gKiAgIGlmIHlvdSBkb24ndCBhbHJlYWR5IGZ1bGx5IHVuZGVyc3RhbmQgdGhlbS4gVGhlIGNvcmUgb2YgTXl0aGl4IFVJIGlzIHRoZVxuICogICBbV2ViIENvbXBvbmVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9Db21wb25lbnRzKSBzdGFuZGFyZCxcbiAqICAgc28geW91IG1pZ2h0IGVuZCB1cCBhIGxpdHRsZSBjb25mdXNlZCBpZiB5b3UgZG9uJ3QgYWxyZWFkeSB1bmRlcnN0YW5kIHRoZSBmb3VuZGF0aW9uLlxuICpcbiAqIHByb3BlcnRpZXM6XG4gKiAgIC0gY2FwdGlvbjogXCIuLi4gSFRNTEVsZW1lbnQgSW5zdGFuY2UgUHJvcGVydGllc1wiXG4gKiAgICAgZGVzYzogXCJBbGwgW0hUTUxFbGVtZW50IEluc3RhbmNlIFByb3BlcnRpZXNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudCNpbnN0YW5jZV9wcm9wZXJ0aWVzKSBhcmUgaW5oZXJpdGVkIGZyb20gW0hUTUxFbGVtZW50XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQpXCJcbiAqICAgICBsaW5rOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQjaW5zdGFuY2VfcHJvcGVydGllc1xuICpcbiAqICAgLSBuYW1lOiBpc015dGhpeENvbXBvbmVudFxuICogICAgIGRhdGFUeXBlOiBib29sZWFuXG4gKiAgICAgY2FwdGlvbjogXCJbc3RhdGljIE15dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XVwiXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgSXMgYHRydWVgIGZvciBNeXRoaXggVUkgY29tcG9uZW50cy5cbiAqICAgLSBuYW1lOiBzZW5zaXRpdmVUYWdOYW1lXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGNhcHRpb246IHNlbnNpdGl2ZVRhZ05hbWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBXb3JrcyBpZGVudGljYWxseSB0byBbRWxlbWVudC50YWdOYW1lXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC90YWdOYW1lKSBmb3IgWE1MLCB3aGVyZSBjYXNlIGlzIHByZXNlcnZlZC5cbiAqICAgICAgIEluIEhUTUwgdGhpcyB3b3JrcyBsaWtlIFtFbGVtZW50LnRhZ05hbWVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3RhZ05hbWUpLCBidXQgaW5zdGVhZCBvZiB0aGUgcmVzdWx0XG4gKiAgICAgICBhbHdheXMgYmVpbmcgVVBQRVJDQVNFLCB0aGUgdGFnIG5hbWUgd2lsbCBiZSByZXR1cm5lZCB3aXRoIHRoZSBjYXNpbmcgcHJlc2VydmVkLlxuICogICAtIG5hbWU6IHRlbXBsYXRlSURcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgY2FwdGlvbjogdGVtcGxhdGVJRFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgYSBjb252ZW5pZW5jZSBwcm9wZXJ0eSB0aGF0IHJldHVybnMgdGhlIHZhbHVlIG9mIGB0aGlzLmNvbnN0cnVjdG9yLlRFTVBMQVRFX0lEYFxuICogICAtIG5hbWU6IGRlbGF5VGltZXJzXG4gKiAgICAgZGF0YVR5cGU6IFwiTWFwJmx0O3N0cmluZywgUHJvbWlzZSZndDtcIlxuICogICAgIGNhcHRpb246IGRlbGF5VGltZXJzXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgQSBNYXAgaW5zdGFuY2UgdGhhdFxuICogICAgICAgcmV0YWlucyBgc2V0VGltZW91dGAgaWRzIHNvIHRoYXQgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5kZWJvdW5jZTsgY2FuIHByb3Blcmx5IGZ1bmN0aW9uLiBLZXlzIGFyZSBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmRlYm91bmNlO1xuICogICAgICAgdGltZXIgaWRzIChvZiB0eXBlIGBzdHJpbmdgKS4gVmFsdWVzIGFyZSBQcm9taXNlIGluc3RhbmNlcy5cbiAqICAgICAgIEVhY2ggcHJvbWlzZSBpbnN0YW5jZSBhbHNvIGhhcyBhIHNwZWNpYWwga2V5IGB0aW1lcklEYCB0aGF0IGNvbnRhaW5zIGEgYHNldFRpbWVvdXRgIGlkIG9mIGEgamF2YXNjcmlwdCB0aW1lci5cbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gfFxuICogICAgICAgICA6d2FybmluZzogVXNlIGF0IHlvdXIgb3duIHJpc2suIFRoaXMgaXMgTXl0aGl4IFVJIGludGVybmFsIGNvZGUgdGhhdCBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cbiAqICAgICAgIC0gfFxuICogICAgICAgICA6ZXllOiBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmRlYm91bmNlO1xuICogICAtIG5hbWU6IHNoYWRvd1xuICogICAgIGRhdGFUeXBlOiBcIltTaGFkb3dSb290XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvU2hhZG93Um9vdClcIlxuICogICAgIGNhcHRpb246IHNoYWRvd1xuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSBzaGFkb3cgcm9vdCBvZiB0aGlzIGNvbXBvbmVudCAob3IgYG51bGxgIGlmIG5vbmUpLlxuICogICAgIG5vdGVzOlxuICogICAgICAgLSBUaGlzIGlzIHRoZSBjYWNoZWQgcmVzdWx0IG9mIGNhbGxpbmcgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5jcmVhdGVTaGFkb3dET007IHdoZW5cbiAqICAgICAgICAgdGhlIGNvbXBvbmVudCBpcyBmaXJzdCBpbml0aWFsaXplZC5cbiAqICAgLSBuYW1lOiB0ZW1wbGF0ZVxuICogICAgIGRhdGFUeXBlOiBcIlt0ZW1wbGF0ZSBlbGVtZW50XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvdGVtcGxhdGUpXCJcbiAqICAgICBjYXB0aW9uOiB0ZW1wbGF0ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSBbdGVtcGxhdGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC90ZW1wbGF0ZSkgZWxlbWVudCBmb3IgdGhpc1xuICogICAgICAgY29tcG9uZW50LCBvciBgbnVsbGAgaWYgdGhlcmUgaXMgbm8gdGVtcGxhdGUgZm91bmQgZm9yIHRoZSBjb21wb25lbnQuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIFRoaXMgaXMgdGhlIGNhY2hlZCByZXN1bHQgb2YgY2FsbGluZyBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmdldENvbXBvbmVudFRlbXBsYXRlOyB3aGVuXG4gKiAgICAgICAgIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgaW5pdGlhbGl6ZWQuXG4qKiovXG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSUNvbXBvbmVudCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgc3RhdGljIGlzTXl0aGl4Q29tcG9uZW50ID0gaXNNeXRoaXhDb21wb25lbnQ7XG5cbiAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoaW5zdGFuY2UgJiYgaW5zdGFuY2VbTVlUSElYX1RZUEVdID09PSBNWVRISVhfVUlfQ09NUE9ORU5UX1RZUEUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBzdGF0aWMgY29tcGlsZVN0eWxlRm9yRG9jdW1lbnQgPSBjb21waWxlU3R5bGVGb3JEb2N1bWVudDtcbiAgc3RhdGljIHJlZ2lzdGVyID0gZnVuY3Rpb24oX25hbWUsIF9LbGFzcykge1xuICAgIGxldCBuYW1lID0gX25hbWUgfHwgdGhpcy50YWdOYW1lIHx8IEJhc2VVdGlscy50b0tlYmFiQ2FzZSh0aGlzLm5hbWUpO1xuXG4gICAgaWYgKCFjdXN0b21FbGVtZW50cy5nZXQobmFtZSkpIHtcbiAgICAgIGxldCBLbGFzcyA9IF9LbGFzcyB8fCB0aGlzO1xuXG4gICAgICBsZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgbmV3IFNldChcbiAgICAgICAgICAoS2xhc3Mub2JzZXJ2ZWRBdHRyaWJ1dGVzIHx8IFtdKS5jb25jYXQoS2xhc3MuY29tcGlsZUF0dHJpYnV0ZU1ldGhvZHMoS2xhc3MpKSxcbiAgICAgICAgKSxcbiAgICAgICk7XG5cbiAgICAgIGlmIChvYnNlcnZlZEF0dHJpYnV0ZXMubGVuZ3RoID4gMClcbiAgICAgICAgS2xhc3Mub2JzZXJ2ZWRBdHRyaWJ1dGVzID0gb2JzZXJ2ZWRBdHRyaWJ1dGVzO1xuXG4gICAgICBjdXN0b21FbGVtZW50cy5kZWZpbmUobmFtZSwgS2xhc3MpO1xuXG4gICAgICBsZXQgcmVnaXN0ZXJFdmVudCA9IG5ldyBFdmVudCgnbXl0aGl4LWNvbXBvbmVudC1yZWdpc3RlcmVkJyk7XG4gICAgICByZWdpc3RlckV2ZW50LmNvbXBvbmVudE5hbWUgPSBuYW1lO1xuICAgICAgcmVnaXN0ZXJFdmVudC5jb21wb25lbnQgPSBLbGFzcztcblxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocmVnaXN0ZXJFdmVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgc3RhdGljIGNvbXBpbGVBdHRyaWJ1dGVNZXRob2RzID0gZnVuY3Rpb24oS2xhc3MpIHtcbiAgICBjb25zdCBzZXR1cEF0dHJpYnV0ZUhhbmRsZXJzID0gKHsgcHJvcGVydHlOYW1lLCBhdHRyaWJ1dGVOYW1lLCBvcmlnaW5hbE5hbWUgfSkgPT4ge1xuICAgICAgaWYgKFJFR0lTVEVSRURfQ09NUE9ORU5UUy5oYXMoS2xhc3MpKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGxldCB7IGRlc2NyaXB0b3IgfSA9IFV0aWxzLmdldERlc2NyaXB0b3JGcm9tUHJvdG90eXBlQ2hhaW4ocHJvdG8sIG9yaWdpbmFsTmFtZSk7XG4gICAgICBpZiAoIWRlc2NyaXB0b3IpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgLy8gV2UgZG9uJ3Qgd2FudCB0byByZW1vdmUgdGhpcyBmcm9tXG4gICAgICAvLyB0aGUgcHJvdG90eXBlLCBhcyBjaGlsZCBjbGFzc2VzIHdpbGxcbiAgICAgIC8vIHdhbnQgdG8gaW5oZXJpdCBhdHRyaWJ1dGUgYmVoYXZpb3IuXG4gICAgICAvLyBkZWxldGUgcHJvdG90eXBlW29yaWdpbmFsTmFtZV07XG5cbiAgICAgIC8vIElmIHdlIGhhdmUgYSBcInZhbHVlXCIgdGhlbiB0aGUgdXNlciBkaWQgaXQgd3JvbmcuLi5cbiAgICAgIC8vIHNvIGp1c3QgbWFrZSBpdCB0aGUgXCJzZXR0ZXJcIlxuICAgICAgbGV0IHNldHRlciAgICA9IGRlc2NyaXB0b3Iuc2V0IHx8IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBsZXQgZ2V0dGVyICAgID0gZGVzY3JpcHRvci5nZXQ7XG4gICAgICBsZXQgaGFzU2V0dGVyID0gKHR5cGVvZiBzZXR0ZXIgPT09ICdmdW5jdGlvbicpO1xuICAgICAgbGV0IGhhc0dldHRlciA9ICh0eXBlb2YgZ2V0dGVyID09PSAnZnVuY3Rpb24nKTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMocHJvdG8sIHtcbiAgICAgICAgW3Byb3BlcnR5TmFtZV06IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6ICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIChoYXNHZXR0ZXIpID8gZ2V0dGVyLmNhbGwodGhpcykgOiB0aGlzLmF0dHIoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6ICAgICAgICAgIGZ1bmN0aW9uKFsgbmV3VmFsdWUsIG9sZFZhbHVlIF0pIHtcbiAgICAgICAgICAgIHRoaXMuYXR0cihhdHRyaWJ1dGVOYW1lLCBuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChoYXNTZXR0ZXIpXG4gICAgICAgICAgICAgIHNldHRlci5jYWxsKHRoaXMsIFsgbmV3VmFsdWUsIG9sZFZhbHVlIF0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgbGV0IHByb3RvICAgICAgICAgICA9IEtsYXNzLnByb3RvdHlwZTtcbiAgICBsZXQgYXR0cmlidXRlTmFtZXMgID0gVXRpbHMuZ2V0QWxsUHJvcGVydHlOYW1lcyhwcm90bylcbiAgICAgIC5maWx0ZXIoKG5hbWUpID0+IElTX0FUVFJfTUVUSE9EX05BTUUudGVzdChuYW1lKSlcbiAgICAgIC5tYXAoKG9yaWdpbmFsTmFtZSkgPT4ge1xuICAgICAgICBsZXQgcHJvcGVydHlOYW1lICA9IG9yaWdpbmFsTmFtZS5tYXRjaChJU19BVFRSX01FVEhPRF9OQU1FKVsxXTtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZU5hbWUgPSBCYXNlVXRpbHMudG9LZWJhYkNhc2UocHJvcGVydHlOYW1lKTtcblxuICAgICAgICBzZXR1cEF0dHJpYnV0ZUhhbmRsZXJzKHsgcHJvcGVydHlOYW1lLCBhdHRyaWJ1dGVOYW1lLCBvcmlnaW5hbE5hbWUgfSk7XG5cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWU7XG4gICAgICB9KTtcblxuICAgIFJFR0lTVEVSRURfQ09NUE9ORU5UUy5hZGQoS2xhc3MpO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhdHRyaWJ1dGVOYW1lcykpO1xuICB9O1xuXG4gIHNldCBhdHRyJGRhdGFNeXRoaXhTcmMoWyBuZXdWYWx1ZSwgb2xkVmFsdWUgXSkge1xuICAgIHRoaXMuYXdhaXRGZXRjaFNyY09uVmlzaWJsZShuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQ2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBtdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGF0YVR5cGVzOiBNdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgTXV0YXRpb25SZWNvcmQgaW5zdGFuY2UgdGhhdCB0aGF0IGNhdXNlZCB0aGlzIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gICAqL1xuICBvbk11dGF0aW9uQWRkZWQoKSB7fVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIENhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBET00uXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkYXRhVHlwZXM6IE11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBNdXRhdGlvblJlY29yZCBpbnN0YW5jZSB0aGF0IHRoYXQgY2F1c2VkIHRoaXMgbWV0aG9kIHRvIGJlIGNhbGxlZC5cbiAgICovXG4gIG9uTXV0YXRpb25SZW1vdmVkKCkge31cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBDYWxsZWQgd2hlbiBhbiBlbGVtZW50IGlzIGFkZGVkIGFzIGEgY2hpbGQuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG5vZGVcbiAgICogICAgIGRhdGFUeXBlczogRWxlbWVudFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgY2hpbGQgZWxlbWVudCBiZWluZyBhZGRlZC5cbiAgICogICAtIG5hbWU6IG11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkYXRhVHlwZXM6IE11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBNdXRhdGlvblJlY29yZCBpbnN0YW5jZSB0aGF0IHRoYXQgY2F1c2VkIHRoaXMgbWV0aG9kIHRvIGJlIGNhbGxlZC5cbiAgICovXG4gIG9uTXV0YXRpb25DaGlsZEFkZGVkKCkge31cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBDYWxsZWQgd2hlbiBhIGNoaWxkIGVsZW1lbnQgaXMgcmVtb3ZlZC5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbm9kZVxuICAgKiAgICAgZGF0YVR5cGVzOiBFbGVtZW50XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBjaGlsZCBlbGVtZW50IGJlaW5nIHJlbW92ZWQuXG4gICAqICAgLSBuYW1lOiBtdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGF0YVR5cGVzOiBNdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgTXV0YXRpb25SZWNvcmQgaW5zdGFuY2UgdGhhdCB0aGF0IGNhdXNlZCB0aGlzIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gICAqL1xuICBvbk11dGF0aW9uQ2hpbGRSZW1vdmVkKCkge31cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBNWVRISVhfVUlfQ09NUE9ORU5UX1RZUEUsXG4gICAgICB9LFxuICAgICAgW2lzTXl0aGl4Q29tcG9uZW50XTogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAgICAgICAgaXNNeXRoaXhDb21wb25lbnQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgVXRpbHMuYmluZE1ldGhvZHMuY2FsbCh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSAvKiwgWyBIVE1MRWxlbWVudC5wcm90b3R5cGUgXSovKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICdzZW5zaXRpdmVUYWdOYW1lJzogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LnNlbnNpdGl2ZVRhZ05hbWVcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+ICgodGhpcy5wcmVmaXgpID8gYCR7dGhpcy5wcmVmaXh9OiR7dGhpcy5sb2NhbE5hbWV9YCA6IHRoaXMubG9jYWxOYW1lKSxcbiAgICAgIH0sXG4gICAgICAndGVtcGxhdGVJRCc6IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC50ZW1wbGF0ZUlEXG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLlRFTVBMQVRFX0lELFxuICAgICAgfSxcbiAgICAgICdkZWxheVRpbWVycyc6IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5kZWxheVRpbWVyc1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbmV3IE1hcCgpLFxuICAgICAgfSxcbiAgICAgICdkb2N1bWVudEluaXRpYWxpemVkJzogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LmRvY3VtZW50SW5pdGlhbGl6ZWRcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+IFV0aWxzLm1ldGFkYXRhKHRoaXMuY29uc3RydWN0b3IsIE1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRCksXG4gICAgICAgIHNldDogICAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgVXRpbHMubWV0YWRhdGEodGhpcy5jb25zdHJ1Y3RvciwgTVlUSElYX0RPQ1VNRU5UX0lOSVRJQUxJWkVELCAhIXZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAnc2hhZG93JzogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LnNoYWRvd1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0aGlzLmNyZWF0ZVNoYWRvd0RPTSgpLFxuICAgICAgfSxcbiAgICAgICd0ZW1wbGF0ZSc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgdGhpcy5nZXRDb21wb25lbnRUZW1wbGF0ZSgpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIEEgY29udmVuaWVuY2UgbWV0aG9kIGZvciBnZXR0aW5nIGFuZCBzZXR0aW5nIGF0dHJpYnV0ZXMuIElmIG9ubHkgb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkXG4gICAqICAgdG8gdGhpcyBtZXRob2QsIHRoZW4gaXQgd2lsbCBhY3QgYXMgYSBnZXR0ZXIsIGdldHRpbmcgdGhlIGF0dHJpYnV0ZSBzcGVjaWZpZWQgYnkgbmFtZS5cbiAgICpcbiAgICogICBJZiBob3dldmVyIHR3byBvciBtb3JlIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQsIHRoZW4gdGhpcyBpcyBhbiBhdHRyaWJ1dGUgc2V0dGVyLlxuICAgKlxuICAgKiAgIElmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBgdW5kZWZpbmVkYCwgYG51bGxgLCBvciBgZmFsc2VgLCB0aGVuIHRoZSBhdHRyaWJ1dGUgd2lsbCBiZVxuICAgKiAgIHJlbW92ZWQuXG4gICAqXG4gICAqICAgSWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGB0cnVlYCwgdGhlbiB0aGUgYXR0cmlidXRlJ3MgdmFsdWUgd2lsbCBiZSBzZXQgdG8gYW4gZW1wdHkgc3RyaW5nIGAnJ2AuXG4gICAqXG4gICAqICAgQW55IG90aGVyIHZhbHVlIGlzIGNvbnZlcnRlZCB0byBhIHN0cmluZyBhbmQgc2V0IGFzIHRoZSBhdHRyaWJ1dGUncyB2YWx1ZS5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbmFtZVxuICAgKiAgICAgZGF0YVR5cGVzOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB0byBvcGVyYXRlIG9uLlxuICAgKiAgIC0gbmFtZTogdmFsdWVcbiAgICogICAgIGRhdGFUeXBlczogYW55XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIElmIGB1bmRlZmluZWRgLCBgbnVsbGAsIG9yIGBmYWxzZWAsIHJlbW92ZSB0aGUgbmFtZWQgYXR0cmlidXRlLlxuICAgKiAgICAgICBJZiBgdHJ1ZWAsIHNldCB0aGUgbmFtZWQgYXR0cmlidXRlJ3MgdmFsdWUgdG8gYW4gZW1wdHkgc3RyaW5nIGAnJ2AuXG4gICAqICAgICAgIEZvciBhbnkgb3RoZXIgdmFsdWUsIGZpcnN0IGNvbnZlcnQgaXQgaW50byBhIHN0cmluZywgYW5kIHRoZW4gc2V0IHRoZSBuYW1lZCBhdHRyaWJ1dGUncyB2YWx1ZSB0byB0aGUgcmVzdWx0aW5nIHN0cmluZy5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgMS4gQHR5cGVzIHN0cmluZzsgSWYgYSBzaW5nbGUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIHRoZW4gcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIG5hbWVkIGF0dHJpYnV0ZS5cbiAgICogICAyLiBAdHlwZXMgdGhpczsgSWYgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgdGhlbiBzZXQgdGhlIHNwZWNpZmllZCBhdHRyaWJ1dGUgdG8gdGhlIHNwZWNpZmllZCB2YWx1ZSxcbiAgICogICAgICBhbmQgcmV0dXJuIGB0aGlzYCAodG8gYWxsb3cgZm9yIGNoYWluaW5nKS5cbiAgICovXG4gIGF0dHIobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSBmYWxzZSlcbiAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICBlbHNlXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsICh2YWx1ZSA9PT0gdHJ1ZSkgPyAnJyA6ICgnJyArIHZhbHVlKSk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgfVxuXG4gIGkxOG4ocGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgbGV0IGxhbmd1YWdlUHJvdmlkZXIgPSBVdGlscy5zcGVjaWFsQ2xvc2VzdCh0aGlzLCAnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG4gICAgaWYgKCFsYW5ndWFnZVByb3ZpZGVyKVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgIHJldHVybiBsYW5ndWFnZVByb3ZpZGVyLmkxOG4ocGF0aCwgZGVmYXVsdFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIEluamVjdCBhIG5ldyBzdHlsZSBzaGVldCB2aWEgYSBgPHN0eWxlPmAgZWxlbWVudCBkeW5hbWljYWxseSBhdCBydW4tdGltZS5cbiAgICpcbiAgICogICBUaGlzIG1ldGhvZCBhbGxvd3MgdGhlIGNhbGxlciB0byBpbmplY3QgZHluYW1pYyBzdHlsZXMgYXQgcnVuLXRpbWUuXG4gICAqICAgSXQgd2lsbCBvbmx5IGluamVjdCB0aGUgc3R5bGVzIG9uY2UsIG5vIG1hdHRlciBob3cgbWFueSB0aW1lcyB0aGVcbiAgICogICBtZXRob2QgaXMgY2FsbGVkLS1hcyBsb25nIGFzIHRoZSBzdHlsZSBjb250ZW50IGl0c2VsZiBkb2Vzbid0IGNoYW5nZS5cbiAgICpcbiAgICogICBUaGUgY29udGVudCBpcyBoYXNoZWQgdmlhIFNIQTI1NiwgYW5kIHRoZSBoYXNoIGlzIHVzZWQgYXMgdGhlIHN0eWxlIHNoZWV0IGlkLiBUaGlzXG4gICAqICAgYWxsb3dzIHlvdSB0byBjYWxsIHRoZSBtZXRob2QgaW5zaWRlIGEgY29tcG9uZW50J3MgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tb3VudGVkO1xuICAgKiAgIG1ldGhvZCwgd2l0aG91dCBuZWVkaW5nIHRvIHdvcnJ5IGFib3V0IGR1cGxpY2F0aW5nIHRoZSBzdHlsZXMgb3ZlciBhbmQgb3ZlciBhZ2Fpbi5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogY29udGVudFxuICAgKiAgICAgZGF0YVR5cGVzOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIENTUyBzdHlsZXNoZWV0IGNvbnRlbnQgdG8gaW5qZWN0IGludG8gYSBgPHN0eWxlPmAgZWxlbWVudC4gVGhpcyBjb250ZW50IGlzXG4gICAqICAgICAgIHVzZWQgdG8gZ2VuZXJhdGUgYW4gYGlkYCBmb3IgdGhlIGA8c3R5bGU+YCBlbGVtZW50LCBzbyB0aGF0IGl0IG9ubHkgZ2V0cyBhZGRlZFxuICAgKiAgICAgICB0byB0aGUgYGRvY3VtZW50YCBvbmNlLlxuICAgKiAgIC0gbmFtZTogbWVkaWFcbiAgICogICAgIGRhdGFUeXBlczogc3RyaW5nXG4gICAqICAgICBkZWZhdWx0OiBcIidzY3JlZW4nXCJcbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFdoYXQgdG8gc2V0IHRoZSBgbWVkaWFgIGF0dHJpYnV0ZSBvZiB0aGUgY3JlYXRlZCBgPHN0eWxlPmAgZWxlbWVudCB0by4gRGVmYXVsdHNcbiAgICogICAgICAgdG8gYCdzY3JlZW4nYC5cbiAgICogbm90ZXM6XG4gICAqICAgLSB8XG4gICAqICAgICA6d2FybmluZzogSXQgaXMgb2Z0ZW4gYmV0dGVyIHRvIHNpbXBseSBhZGQgYSBgPHN0eWxlPmAgZWxlbWVudCB0byB5b3VyIGNvbXBvbmVudCdzIEhUTUwgdGVtcGxhdGUuXG4gICAqICAgICBIb3dldmVyLCBzb21ldGltZXMgdHJ1bHkgZHluYW1pYyBzdHlsZXMgYXJlIG5lZWRlZCwgd2hlcmUgdGhlIGNvbnRlbnQgd29uJ3QgYmUga25vd25cbiAgICogICAgIHVudGlsIHJ1bnRpbWUuIFRoaXMgaXMgdGhlIHByb3BlciB1c2UgY2FzZSBmb3IgdGhpcyBtZXRob2QuXG4gICAqICAgLSB8XG4gICAqICAgICA6d2FybmluZzogUGxlYXNlIGVkdWNhdGVkIHlvdXJzZWxmICh1bmxpa2UgcGVvcGxlIHdobyBsb3ZlIFJlYWN0KSBhbmQgZG8gbm90IG92ZXJ1c2UgZHluYW1pYyBvciBpbmxpbmUgc3R5bGVzLlxuICAgKiAgICAgV2hpbGUgdGhlIHJlc3VsdCBvZiB0aGlzIG1ldGhvZCBpcyBjZXJ0YWlubHkgYSBzdGVwIGFib3ZlIGlubGluZSBzdHlsZXMsIHRoaXMgbWV0aG9kIGhhc1xuICAgKiAgICAgW2dyZWF0IHBvdGVudGlhbCB0byBjYXVzZSBoYXJtXShodHRwczovL3dvcmxkb2ZkZXYuaW5mby82LXJlYXNvbnMtd2h5LXlvdS1zaG91bGRudC1zdHlsZS1pbmxpbmUvKVxuICAgKiAgICAgYW5kIHNwcmVhZCB5b3VyIG93biBpZ25vcmFuY2UgdG8gb3RoZXJzLiBVc2Ugd2l0aCAqKkNBUkUqKiFcbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIEVsZW1lbnQ7IFRoZSBgPHN0eWxlPmAgZWxlbWVudCBmb3IgdGhlIHNwZWNpZmllZCBzdHlsZS5cbiAgICogZXhhbXBsZXM6XG4gICAqICAgLSB8XG4gICAqICAgICBgYGBqYXZhc2NyaXB0XG4gICAqICAgICBpbXBvcnQgeyBNeXRoaXhVSUNvbXBvbmVudCB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gICAqXG4gICAqICAgICBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgICogICAgICAgc3RhdGljIHRhZ05hbWUgPSAnbXktY29tcG9uZW50JztcbiAgICpcbiAgICogICAgICAgLy8gLi4uXG4gICAqXG4gICAqICAgICAgIG1vdW50ZWQoKSB7XG4gICAqICAgICAgICAgbGV0IHsgc2lkZWJhcldpZHRoIH0gPSB0aGlzLmxvYWRVc2VyUHJlZmVyZW5jZXMoKTtcbiAgICogICAgICAgICB0aGlzLmluamVjdFN0eWxlU2hlZXQoYG5hdi5zaWRlYmFyIHsgd2lkdGg6ICR7c2lkZWJhcldpZHRofXB4OyB9YCwgJ3NjcmVlbicpO1xuICAgKiAgICAgICB9XG4gICAqICAgICB9XG4gICAqXG4gICAqICAgICBNeUNvbXBvbmVudC5yZWdpc3RlcigpO1xuICAgKiAgICAgYGBgXG4gICAqL1xuICBpbmplY3RTdHlsZVNoZWV0KGNvbnRlbnQsIG1lZGlhID0gJ3NjcmVlbicpIHtcbiAgICBsZXQgc3R5bGVJRCAgICAgICA9IGBJRFNUWUxFJHtCYXNlVXRpbHMuU0hBMjU2KGAke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX06JHtjb250ZW50fToke21lZGlhfWApfWA7XG4gICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgbGV0IHN0eWxlRWxlbWVudCAgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHN0eWxlIyR7c3R5bGVJRH1gKTtcblxuICAgIGlmIChzdHlsZUVsZW1lbnQpXG4gICAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuXG4gICAgc3R5bGVFbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbXl0aGl4LWZvcicsIHRoaXMuc2Vuc2l0aXZlVGFnTmFtZSk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBzdHlsZUlEKTtcbiAgICBpZiAobWVkaWEpXG4gICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcblxuICAgIHN0eWxlRWxlbWVudC5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbiAgfVxuXG4gIHByb2Nlc3NFbGVtZW50cyhub2RlLCBfb3B0aW9ucykge1xuICAgIGxldCBvcHRpb25zID0gX29wdGlvbnMgfHwge307XG4gICAgaWYgKCFvcHRpb25zLnNjb3BlKVxuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgc2NvcGU6IHRoaXMuJCQgfTtcblxuICAgIHJldHVybiBFbGVtZW50cy5wcm9jZXNzRWxlbWVudHMobm9kZSwgb3B0aW9ucyk7XG4gIH1cblxuICBnZXRDaGlsZHJlbkFzRnJhZ21lbnQobm9FbXB0eVJlc3VsdCkge1xuICAgIGxldCBoYXNDb250ZW50ICAgID0gZmFsc2U7XG4gICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgbGV0IHRlbXBsYXRlICAgICAgPSBvd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICAgIGlmICghdGhpcy5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgIHJldHVybiAobm9FbXB0eVJlc3VsdCkgPyB1bmRlZmluZWQgOiB0ZW1wbGF0ZTtcblxuICAgIHdoaWxlICh0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMuY2hpbGROb2Rlc1swXTtcbiAgICAgIGlmICghKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIEJhc2VVdGlscy5pc05PRShub2RlLm5vZGVWYWx1ZSkpKVxuICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgdGVtcGxhdGUuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKG5vRW1wdHlSZXN1bHQgJiYgIWhhc0NvbnRlbnQpXG4gICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBHZXQgdGhlIHBhcmVudCBOb2RlIG9mIHRoaXMgZWxlbWVudC5cbiAgICpcbiAgICogbm90ZXM6XG4gICAqICAgLSB8XG4gICAqICAgICA6d2FybmluZzogVW5saWtlIFtOb2RlLnBhcmVudE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpLCB0aGlzXG4gICAqICAgICB3aWxsIGFsc28gc2VhcmNoIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMuXG4gICAqICAgLSB8XG4gICAqICAgICA6d2FybmluZzogKipTZWFyY2hpbmcgYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcyBvbmx5IHdvcmtzIGZvciBNeXRoaXggVUkgY29tcG9uZW50cyEqKlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFNlYXJjaGluZyBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzIGlzIGFjY29tcGxpc2hlZCB2aWEgbGV2ZXJhZ2luZyBAc2VlIE15dGhpeFVJQ29tcG9uZW50Lm1ldGFkYXRhOyBmb3JcbiAgICogICAgIGB0aGlzYCBjb21wb25lbnQuIFdoZW4gYSBgbnVsbGAgcGFyZW50IGlzIGVuY291bnRlcmVkLCBgZ2V0UGFyZW50Tm9kZWAgd2lsbCBsb29rIGZvciBAc2VlIE15dGhpeFVJQ29tcG9uZW50Lm1ldGFkYXRhP2NhcHRpb249bWV0YWRhdGE7IGtleSBAc2VlIENvbnN0YW50cy5NWVRISVhfU0hBRE9XX1BBUkVOVDtcbiAgICogICAgIG9uIGB0aGlzYC4gSWYgZm91bmQsIHRoZSByZXN1bHQgaXMgY29uc2lkZXJlZCB0aGUgW3BhcmVudCBOb2RlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9wYXJlbnROb2RlKSBvZiBgdGhpc2AgY29tcG9uZW50LlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmV5ZTogVGhpcyBpcyBqdXN0IGEgd3JhcHBlciBmb3IgQHNlZSBVdGlscy5nZXRQYXJlbnROb2RlOy5cbiAgICpcbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIE5vZGU7IFRoZSBwYXJlbnQgbm9kZSwgaWYgdGhlcmUgaXMgYW55LCBvciBgbnVsbGAgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZ2V0UGFyZW50Tm9kZSgpIHtcbiAgICByZXR1cm4gVXRpbHMuZ2V0UGFyZW50Tm9kZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgW0VsZW1lbnQuYXR0YWNoU2hhZG93XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cpXG4gICAqICAgd2l0aCBvbmUgbm90YWJsZSBkaWZmZXJlbmNlOiBJdCBydW5zIE15dGhpeCBVSSBmcmFtZXdvcmsgc3BlY2lmaWMgY29kZSBhZnRlciBhIHNoYWRvdyBpcyBhdHRhY2hlZC5cbiAgICpcbiAgICogICBDdXJyZW50bHksIHRoZSBtZXRob2QgY29tcGxldGVzIHRoZSBmb2xsb3dpbmcgYWN0aW9uczpcbiAgICogICAxLiBDYWxsIGBzdXBlci5hdHRhY2hTaGFkb3cob3B0aW9ucylgIHRvIGFjdHVhbGx5IGF0dGFjaCBhIFNoYWRvdyBET01cbiAgICogICAyLiBBc3NpZ24gQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyB0byB0aGUgcmVzdWx0aW5nIGBzaGFkb3dgLCB1c2luZyB0aGUga2V5IGBDb25zdGFudHMuTVlUSElYX1NIQURPV19QQVJFTlRgLCBhbmQgdmFsdWUgb2YgYHRoaXNgLiBAc291cmNlUmVmIF9zaGFkb3dNZXRhZGF0YUFzc2lnbm1lbnQ7IFRoaXMgYWxsb3dzIEBzZWUgZ2V0UGFyZW50Tm9kZTsgdG8gbGF0ZXIgZmluZCB0aGUgcGFyZW50IG9mIHRoZSBzaGFkb3cuXG4gICAqICAgMy4gYHJldHVybiBzaGFkb3dgXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIGRhdGFUeXBlczogb2JqZWN0XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFtvcHRpb25zXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cjb3B0aW9ucykgZm9yIFtFbGVtZW50LmF0dGFjaFNoYWRvd10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93KVxuICAgKiBub3RlczpcbiAgICogICAtIFRoaXMgaXMganVzdCBhIHdyYXBwZXIgZm9yIFtFbGVtZW50LmF0dGFjaFNoYWRvd10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93KSB0aGF0IGV4ZWN1dGVzXG4gICAqICAgICBjdXN0b20gZnJhbWV3b3JrIGZ1bmN0aW9uYWxpdHkgYWZ0ZXIgdGhlIGBzdXBlcmAgY2FsbC5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIFNoYWRvd1Jvb3Q7IFRoZSBTaGFkb3dSb290IGluc3RhbmNlIGNyZWF0ZWQgYnkgW0VsZW1lbnQuYXR0YWNoU2hhZG93XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cpLlxuICAgKi9cbiAgYXR0YWNoU2hhZG93KG9wdGlvbnMpIHtcbiAgICAvLyBDaGVjayBlbnZpcm9ubWVudCBzdXBwb3J0XG4gICAgaWYgKHR5cGVvZiBzdXBlci5hdHRhY2hTaGFkb3cgIT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgc2hhZG93ID0gc3VwZXIuYXR0YWNoU2hhZG93KG9wdGlvbnMpO1xuICAgIFV0aWxzLm1ldGFkYXRhKHNoYWRvdywgTVlUSElYX1NIQURPV19QQVJFTlQsIHRoaXMpOyAvLyBAcmVmOl9zaGFkb3dNZXRhZGF0YUFzc2lnbm1lbnRcblxuICAgIHJldHVybiBzaGFkb3c7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBBIHN0dWIgZm9yIGRldmVsb3BlcnMgdG8gY29udHJvbCB0aGUgU2hhZG93IERPTSBvZiB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiAgIEJ5IGRlZmF1bHQsIHRoaXMgbWV0aG9kIHdpbGwgc2ltcGx5IGNhbGwgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5hdHRhY2hTaGFkb3c7IGluIGBcIm9wZW5cImAgYG1vZGVgLlxuICAgKlxuICAgKiAgIERldmVsb3BlcnMgY2FuIG92ZXJsb2FkIHRoaXMgdG8gZG8gbm90aGluZyAoaGF2ZSBubyBTaGFkb3cgRE9NIGZvciBhIHNwZWNpZmljIGNvbXBvbmVudCBmb3IgZXhhbXBsZSksXG4gICAqICAgb3IgdG8gZG8gc29tZXRoaW5nIGVsc2UsIHN1Y2ggYXMgc3BlY2lmeSB0aGV5IHdvdWxkIGxpa2UgdGhlaXIgY29tcG9uZW50IHRvIGJlIGluIGBcImNsb3NlZFwiYCBgbW9kZWAuXG4gICAqXG4gICAqICAgVGhlIHJlc3VsdCBvZiB0aGlzIG1ldGhvZCBpcyBhc3NpZ25lZCB0byBgdGhpcy5zaGFkb3dgIGluc2lkZSB0aGUgYGNvbnN0cnVjdG9yYCBvZiB0aGUgY29tcG9uZW50LlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBvcHRpb25zXG4gICAqICAgICBkYXRhVHlwZXM6IG9iamVjdFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBbb3B0aW9uc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93I29wdGlvbnMpIGZvciBbRWxlbWVudC5hdHRhY2hTaGFkb3ddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdylcbiAgICogbm90ZXM6XG4gICAqICAgLSBBbGwgdGhpcyBkb2VzIGlzIGNhbGwgYHRoaXMuYXR0YWNoU2hhZG93YC4gSXRzIHB1cnBvc2UgaXMgZm9yIHRoZSBkZXZlbG9wZXIgdG8gY29udHJvbFxuICAgKiAgICAgd2hhdCBoYXBwZW5zIHdpdGggdGhlIGNvbXBvbmVudCdzIFNoYWRvdyBET00uXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBTaGFkb3dSb290OyBUaGUgU2hhZG93Um9vdCBpbnN0YW5jZSBjcmVhdGVkIGJ5IEBzZWUgTXl0aGl4VUlDb21wb25lbnQuYXR0YWNoU2hhZG93Oy5cbiAgICovXG4gIGNyZWF0ZVNoYWRvd0RPTShvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3Iuc2hhZG93ID09PSBmYWxzZSlcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgbGV0IHNoYWRvdyA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZTogJ29wZW4nLCAuLi4ob3B0aW9ucyB8fCB7fSkgfSk7XG5cbiAgICAvLyBBZG9wdCBzaGFyZWQgc3R5bGVzaGVldHMgaWYgZGVmaW5lZCBvbiB0aGUgY29tcG9uZW50IGNsYXNzXG4gICAgbGV0IHNoYXJlZFN0eWxlcyA9IHRoaXMuY29uc3RydWN0b3Iuc2hhcmVkU3R5bGVzO1xuICAgIGlmIChzaGFyZWRTdHlsZXMgJiYgQXJyYXkuaXNBcnJheShzaGFyZWRTdHlsZXMpICYmIHNoYXJlZFN0eWxlcy5sZW5ndGggPiAwKVxuICAgICAgU3R5bGVTaGVldE1hbmFnZXIuYWRvcHQoc2hhZG93LCBzaGFyZWRTdHlsZXMpO1xuXG4gICAgcmV0dXJuIHNoYWRvdztcbiAgfVxuXG4gIG1lcmdlQ2hpbGRyZW4odGFyZ2V0LCAuLi5vdGhlcnMpIHtcbiAgICByZXR1cm4gRWxlbWVudHMubWVyZ2VDaGlsZHJlbih0YXJnZXQsIC4uLm90aGVycyk7XG4gIH1cblxuICBnZXRDb21wb25lbnRUZW1wbGF0ZShuYW1lT3JJRCkge1xuICAgIGlmIChuYW1lT3JJRCBpbnN0YW5jZW9mIE5vZGUpXG4gICAgICByZXR1cm4gbmFtZU9ySUQ7XG5cbiAgICBpZiAoIXRoaXMub3duZXJEb2N1bWVudClcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChuYW1lT3JJRClcbiAgICAgIHJldHVybiBFbGVtZW50cy5xdWVyeVRlbXBsYXRlKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCwgbmFtZU9ySUQpO1xuXG4gICAgaWYgKHRoaXMudGVtcGxhdGVJRClcbiAgICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy50ZW1wbGF0ZUlEKTtcblxuICAgIHJldHVybiB0aGlzLm93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdGVtcGxhdGVbZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWU9XCIke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX1cIiBpXSx0ZW1wbGF0ZVtkYXRhLWZvcj1cIiR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfVwiIGldYCk7XG4gIH1cblxuICBhcHBlbmRFeHRlcm5hbFRvU2hhZG93RE9NKCkge1xuICAgIGlmICghdGhpcy5zaGFkb3cpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgb3duZXJEb2N1bWVudCA9ICh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpO1xuICAgIGxldCBlbGVtZW50cyAgICAgID0gb3duZXJEb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWF1dG8tbWVyZ2VdJyk7XG5cbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIEFycmF5LmZyb20oZWxlbWVudHMpKSB7XG4gICAgICBsZXQgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1hdXRvLW1lcmdlJyk7XG4gICAgICBpZiAoQmFzZVV0aWxzLmlzTk9FKHNlbGVjdG9yKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmICghdGhpcy5tYXRjaGVzKHNlbGVjdG9yKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHRoaXMuc2hhZG93LmFwcGVuZENoaWxkKGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm9jZXNzZWRUZW1wbGF0ZShfdGVtcGxhdGUpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLmdldENvbXBvbmVudFRlbXBsYXRlKF90ZW1wbGF0ZSkgfHwgdGhpcy50ZW1wbGF0ZTtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc0VsZW1lbnRzKCh0ZW1wbGF0ZS5jb250ZW50KSA/IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpIDogdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxuXG4gIGdldFJhd1RlbXBsYXRlKF90ZW1wbGF0ZSkge1xuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50VGVtcGxhdGUoX3RlbXBsYXRlKSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgIGlmICghdGVtcGxhdGUpXG4gICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBhcHBlbmRUZW1wbGF0ZVRvKHRhcmdldCwgX3RlbXBsYXRlKSB7XG4gICAgaWYgKCF0YXJnZXQpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgcHJvY2Vzc2VkVGVtcGxhdGUgPSB0aGlzLmdldFByb2Nlc3NlZFRlbXBsYXRlKF90ZW1wbGF0ZSk7XG4gICAgaWYgKHByb2Nlc3NlZFRlbXBsYXRlKSB7XG4gICAgICAvLyBlbnN1cmVEb2N1bWVudFN0eWxlcy5jYWxsKHRoaXMsIHRoaXMub3duZXJEb2N1bWVudCwgdGhpcy5zZW5zaXRpdmVUYWdOYW1lLCB0ZW1wbGF0ZSk7XG5cbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChwcm9jZXNzZWRUZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhcHBlbmRUZW1wbGF0ZVRvU2hhZG93RE9NKF90ZW1wbGF0ZSkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZFRlbXBsYXRlVG8odGhpcy5zaGFkb3csIF90ZW1wbGF0ZSk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWUnLCB0aGlzLnNlbnNpdGl2ZVRhZ05hbWUpO1xuXG4gICAgdGhpcy5hcHBlbmRUZW1wbGF0ZVRvU2hhZG93RE9NKCk7XG5cbiAgICB0aGlzLnByb2Nlc3NFbGVtZW50cyh0aGlzKTtcblxuICAgIHRyeSB7XG4gICAgICBkZWJ1Z0xvZyhgQ2FsbGluZyBtb3VudGVkKCkgZm9yIDwke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX0+YCk7XG4gICAgICB0aGlzLm1vdW50ZWQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbGV0IGNvbnRleHQgPSBmb3JtYXRDb21wb25lbnRDb250ZXh0KHRoaXMsICdtb3VudGVkJyk7XG4gICAgICBsZXQgY29tcG9uZW50RXJyb3IgPSBuZXcgQ29tcG9uZW50RXJyb3IoXG4gICAgICAgIGBFcnJvciBpbiBtb3VudGVkKCkgY2FsbGJhY2s6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICB7XG4gICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICBvcmlnaW5hbEVycm9yOiBlcnJvcixcbiAgICAgICAgICBzdWdnZXN0aW9uOiAgICAnQ2hlY2sgdGhlIG1vdW50ZWQoKSBtZXRob2QgaW1wbGVtZW50YXRpb24gZm9yIGVycm9ycy4nLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29tcG9uZW50RXJyb3IudG9TdHJpbmcoKSk7XG4gICAgICBjb25zb2xlLmVycm9yKCdPcmlnaW5hbCBlcnJvcjonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBlbmRFeHRlcm5hbFRvU2hhZG93RE9NKCk7XG5cbiAgICB0aGlzLmRvY3VtZW50SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgQmFzZVV0aWxzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbXl0aGl4LXJlYWR5Jyk7XG4gICAgfSk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB0cnkge1xuICAgICAgZGVidWdMb2coYENhbGxpbmcgdW5tb3VudGVkKCkgZm9yIDwke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX0+YCk7XG4gICAgICB0aGlzLnVubW91bnRlZCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsZXQgY29udGV4dCA9IGZvcm1hdENvbXBvbmVudENvbnRleHQodGhpcywgJ3VubW91bnRlZCcpO1xuICAgICAgbGV0IGNvbXBvbmVudEVycm9yID0gbmV3IENvbXBvbmVudEVycm9yKFxuICAgICAgICBgRXJyb3IgaW4gdW5tb3VudGVkKCkgY2FsbGJhY2s6ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgICB7XG4gICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICBvcmlnaW5hbEVycm9yOiBlcnJvcixcbiAgICAgICAgICBzdWdnZXN0aW9uOiAgICAnQ2hlY2sgdGhlIHVubW91bnRlZCgpIG1ldGhvZCBpbXBsZW1lbnRhdGlvbiBmb3IgZXJyb3JzLicsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgY29uc29sZS5lcnJvcihjb21wb25lbnRFcnJvci50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ09yaWdpbmFsIGVycm9yOicsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhd2FpdEZldGNoU3JjT25WaXNpYmxlKG5ld1NyYykge1xuICAgIGlmICh0aGlzLnZpc2liaWxpdHlPYnNlcnZlcikge1xuICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMpO1xuICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICghbmV3U3JjKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG9ic2VydmVyID0gQ29tcG9uZW50VXRpbHMudmlzaWJpbGl0eU9ic2VydmVyKCh7IHdhc1Zpc2libGUsIGRpc2Nvbm5lY3QgfSkgPT4ge1xuICAgICAgaWYgKCF3YXNWaXNpYmxlKVxuICAgICAgICB0aGlzLmZldGNoU3JjKHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1zcmMnKSk7XG5cbiAgICAgIGRpc2Nvbm5lY3QoKTtcblxuICAgICAgdGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIgPSBudWxsO1xuICAgIH0sIHsgZWxlbWVudHM6IFsgdGhpcyBdIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgJ3Zpc2liaWxpdHlPYnNlcnZlcic6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgb2JzZXJ2ZXIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKC4uLmFyZ3MpIHtcbiAgICBsZXQgW1xuICAgICAgYXR0cmlidXRlTmFtZSxcbiAgICAgIG9sZFZhbHVlLFxuICAgICAgbmV3VmFsdWUsXG4gICAgXSA9IGFyZ3M7XG5cbiAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAvLyBTZWN1cml0eTogZW5zdXJlIHRoaXMgaXMgYWN0dWFsbHkgYSBoYW5kbGVkIGF0dHJpYnV0ZSBjYWxsIVxuICAgICAgLy8gV2Ugd291bGRuJ3QganVzdCB3YW50IHRvIHN0YXJ0IHNldHRpbmcgYW55dGhpbmcgb24gdGhlIGluc3RhbmNlXG4gICAgICAvLyB2aWEgYXR0cmlidXRlcy4uLiB0aGF0IG1pZ2h0IGJlIGJhZCwgaS5lOiA8aW1nIHZhbHVlT2Y9XCJcIj5cblxuICAgICAgbGV0IHByb3BlcnR5TmFtZSAgICA9IEJhc2VVdGlscy50b0NhbWVsQ2FzZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgIGxldCBtYWdpY05hbWUgICAgICAgPSBgYXR0ciQke3Byb3BlcnR5TmFtZX1gO1xuICAgICAgbGV0IHsgZGVzY3JpcHRvciB9ICA9IFV0aWxzLmdldERlc2NyaXB0b3JGcm9tUHJvdG90eXBlQ2hhaW4odGhpcywgbWFnaWNOYW1lKTtcbiAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgIC8vIENhbGwgc2V0dGVyXG4gICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IFsgbmV3VmFsdWUsIG9sZFZhbHVlIF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlQ2hhbmdlZCguLi5hcmdzKTtcbiAgfVxuXG4gIGFkb3B0ZWRDYWxsYmFjayguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRvcHRlZCguLi5hcmdzKTtcbiAgfVxuXG4gIG1vdW50ZWQoKSB7fVxuICB1bm1vdW50ZWQoKSB7fVxuICBhdHRyaWJ1dGVDaGFuZ2VkKCkge31cbiAgYWRvcHRlZCgpIHt9XG5cbiAgZ2V0ICQkKCkge1xuICAgIHJldHVybiBVdGlscy5jcmVhdGVTY29wZSh0aGlzKTtcbiAgfVxuXG4gIHNlbGVjdCguLi5hcmdzKSB7XG4gICAgbGV0IGFyZ0luZGV4ICAgID0gMDtcbiAgICBsZXQgb3B0aW9ucyAgICAgPSAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoYXJnc1thcmdJbmRleF0pKSA/IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgYXJnc1thcmdJbmRleCsrXSkgOiB7fTtcbiAgICBsZXQgcXVlcnlFbmdpbmUgPSBRdWVyeUVuZ2luZS5mcm9tLmNhbGwodGhpcywgeyByb290OiB0aGlzLCAuLi5vcHRpb25zLCBpbnZva2VDYWxsYmFja3M6IGZhbHNlIH0sIC4uLmFyZ3Muc2xpY2UoYXJnSW5kZXgpKTtcbiAgICBsZXQgc2hhZG93Tm9kZXM7XG5cbiAgICBvcHRpb25zID0gcXVlcnlFbmdpbmUuZ2V0T3B0aW9ucygpO1xuXG4gICAgaWYgKG9wdGlvbnMuc2hhZG93ICE9PSBmYWxzZSAmJiBvcHRpb25zLnNlbGVjdG9yICYmIG9wdGlvbnMucm9vdCA9PT0gdGhpcykge1xuICAgICAgc2hhZG93Tm9kZXMgPSBBcnJheS5mcm9tKFxuICAgICAgICBRdWVyeUVuZ2luZS5mcm9tLmNhbGwoXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICB7IHJvb3Q6IHRoaXMuc2hhZG93IH0sXG4gICAgICAgICAgb3B0aW9ucy5zZWxlY3RvcixcbiAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrLFxuICAgICAgICApLnZhbHVlcygpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc2hhZG93Tm9kZXMpXG4gICAgICBxdWVyeUVuZ2luZSA9IHF1ZXJ5RW5naW5lLmFkZChzaGFkb3dOb2Rlcyk7XG5cbiAgICBpZiAob3B0aW9ucy5zbG90dGVkICE9PSB0cnVlKVxuICAgICAgcXVlcnlFbmdpbmUgPSBxdWVyeUVuZ2luZS5zbG90dGVkKGZhbHNlKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdChxdWVyeUVuZ2luZS5tYXAob3B0aW9ucy5jYWxsYmFjaykpO1xuXG4gICAgcmV0dXJuIHF1ZXJ5RW5naW5lO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgVGhpcyBtZXRob2Qgd2lsbCBkeW5hbWljYWxseSBidWlsZCBlbGVtZW50cywgb3IgcmF0aGVyLCBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMsIHRoYXRcbiAgICogICBkZWZpbmUgZWxlbWVudHMgdG8gYmUgY3JlYXRlZCBsYXRlci4gQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzIGFyZSBqdXN0IHRoYXQsIGEgc2ltcGxlXG4gICAqICAgc3RydWN0dXJlIHRoYXQgZGVmaW5lcyB0aGUgbmFtZSwgYXR0cmlidXRlcywgYW5kIGNoaWxkcmVuIG9mIGFueSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiAgIFdoZW4gdGhlc2UgYXJlIGluc2VydGVkIGludG8gYSBkb2N1bWVudCwgZWl0aGVyIHRocm91Z2ggYSBAc2VlIFF1ZXJ5RW5naW5lOywgb3IgZGlyZWN0bHkgYnlcbiAgICogICBjYWxsaW5nIEBzZWUgRWxlbWVudERlZmluaXRpb24uYnVpbGQ7IGJlZm9yZSBpbnNlcnQsIHRoZXkgYXJlIG9ubHkgYXQgdGhpcyBwb2ludCBjb252ZXJ0ZWRcbiAgICogICBpbnRvIHJlYWwgW0VsZW1lbnRzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudCkgYW5kIGluc2VydGVkXG4gICAqICAgaW50byB0aGUgc3BlY2lmaWVkIERPTSAoZG9jdW1lbnQpIGF0IHRoZSBzcGVjaWZpZWQgbG9jYXRpb24uXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IGNhbGxiYWNrXG4gICAqICAgICBkYXRhVHlwZXM6IGZ1bmN0aW9uXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIEEgY2FsbGJhY2sgdGhhdCBpcyBpbW1lZGlhdGVseSBjYWxsZWQgYW5kIGV4cGVjdGVkIHRvIHJldHVybiBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMuXG4gICAqICAgICAgIFRoZSBjYWxsYmFjayBpcyBjYWxsZWQgd2l0aCBvbmx5IHR3byBhcmd1bWVudHMuIFRoZSBmaXJzdCBhcmd1bWVudHMsIGBlbGVtZW50c2AsIGlzIGFcbiAgICogICAgICAgQHNlZSBFbGVtZW50R2VuZXJhdG9yOyBQcm94eSBpbnN0YW5jZSwgdGhhdCB3aWxsIHByb3Blcmx5IGdlbmVyYXRlIGFueSBlbGVtZW50IGRlZmluaXRpb24gcmVxdWVzdGVkLlxuICAgKiAgICAgICBUaGUgc2Vjb25kIGFyZ3VtZW50LCBgY29udGV4dGAsIGlzIHNpbXBseSBhbiBlbXB0eSBvYmplY3QgcHJvdmlkZWQgdG8gdGhlIGNhbGxiYWNrLCBhbGxvd2luZyB0aGVcbiAgICogICAgICAgZGV2ZWxvcGVyIHRvIHN0b3JlIGNvbnRleHR1YWwgYmFzZWQgaW5mb3JtYXRpb24gZm9yIHRoZSBvcGVyYXRpb24sIGlmIGRlc2lyZWQuXG4gICAqIHJldHVybjogfFxuICAgKiAgICogQHR5cGVzIEVsZW1lbnREZWZpbml0aW9uOyBBIHNpbmdsZSBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZSBkZWZpbmluZ1xuICAgKiAgICAgdGhlIERPTSB0byBnZW5lcmF0ZSB3aGVuIGluc2VydGVkLiBDYW4gYmUgYSBgI2ZyYWdtZW50YCBlbGVtZW50IGRlZmluaXRpb24uXG4gICAqICAgKiBAdHlwZXMgQXJyYXk8RWxlbWVudERlZmluaXRpb24+OyBBbiBhcnJheSBvZiBlbGVtZW50IGRlZmluaXRpb24gaW5zdGFuY2VzXG4gICAqICAgICBkZWZpbmluZyB0aGUgRE9NIHRvIGdlbmVyYXRlIHdoZW4gaW5zZXJ0ZWQuXG4gICAqICAgKiBAdHlwZXMgbnVsbDsgSWYgbm90aGluZyBpcyByZXR1cm5lZCwgdGhlbiBubyBlbGVtZW50cyB3aWxsIGJlIGNyZWF0ZWQuXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhpcyBtZXRob2QgYW5kIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuJGJ1aWxkOyBtZXRob2QgaXNcbiAgICogICAgIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLCB3aGVyZWFzIHRoZVxuICAgKiAgICAgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC4kYnVpbGQ7IG1ldGhvZCB3aWxsIHJldHVybiBhIEBzZWUgUXVlcnlFbmdpbmU7IGluc3RhbmNlIGNvbnRhaW5pbmdcbiAgICogICAgIGFsbCB0aGUgYnVpbHQgQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLlxuICAgKiBleGFtcGxlczpcbiAgICogICAtIHxcbiAgICogICAgIGBgYGphdmFzY3JpcHRcbiAgICogICAgIGltcG9ydCB7XG4gICAqICAgICAgIE15dGhpeFVJQ29tcG9uZW50LFxuICAgKiAgICAgICBVdGlscyxcbiAgICogICAgIH0gZnJvbSAnQGNkbi9teXRoaXgtdWktY29yZUAxJzsgLy8gZW5zdXJlIHdlIGxvY2sgdGhpcyB0byB3aGF0ZXZlciB2ZXJzaW9uIGlzIGltcG9ydGFudCB0byB1c1xuICAgKlxuICAgKiAgICAgZXhwb3J0IGNsYXNzIERlbW9OYXZDb21wb25lbnQgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gICAqICAgICAgIHN0YXRpYyB0YWdOYW1lID0gJ2RlbW8tbmF2LWNvbXBvbmVudCc7IC8vIGEgXCJzb21ldGhpbmctXCIgcHJlZml4IGlzIHJlcXVpcmVkXG4gICAqXG4gICAqICAgICAgIG1vdW50ZWQoKSB7IC8vIGNhbGxlZCB3aGVuZXZlciB0aGUgY29tcG9uZW50IGlzIGFkZGVkIHRvIGFub3RoZXIgZWxlbWVudFxuICAgKiAgICAgICAgIGxldCBsaXN0ID0gW1xuICAgKiAgICAgICAgICAgJ1Rlc3QgMScsXG4gICAqICAgICAgICAgICAnVGVzdCAyJyxcbiAgICogICAgICAgICAgICdMb3JlbSBJcHN1bScsXG4gICAqICAgICAgICAgXTtcbiAgICpcbiAgICogICAgICAgICAvLyBEeW5hbWljYWxseSBidWlsZCBhbmQgYXBwZW5kIHNvbWUgZWxlbWVudHMgKHdpdGggYXR0cmlidXRlcyBhbmQgZXZlbnQgYmluZGluZ3MpXG4gICAqICAgICAgICAgbGV0IHVub3JkZXJlZExpc3RFbGVtZW50ID0gdGhpcy5idWlsZCgoeyBOQVYsIFVMLCBMSSwgJFRFWFQgfSkgPT4geyAvLyBhbnkgZWxlbWVudCBuYW1lIGNhbiBiZSByZXF1ZXN0ZWQgaGVyZSAoZXZlbiBjdXN0b20gb25lcylcbiAgICogICAgICAgICAgIHJldHVybiBVTC5pZCgncHJpbWFyeS1saXN0JykuY2xhc3MoJ2ludGVyYWN0aXZlLWxpc3QnKShcbiAgICogICAgICAgICAgICAgLy8gLi4uY2hpbGRyZW4gb2YgVUwgZWxlbWVudFxuICAgKiAgICAgICAgICAgICAuLi5saXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICogICAgICAgICAgICAgICByZXR1cm4gTEkuY2xhc3MoJ2l0ZW0tbmFtZSBmb2N1c2FibGUnKS5kYXRhSW5kZXgoaW5kZXgpLm9uQ2xpY2sodGhpcy5vbkl0ZW1DbGljaykoXG4gICAqICAgICAgICAgICAgICAgICAvLyAuLi5jaGlsZHJlbiBvZiBMSSBlbGVtZW50XG4gICAqICAgICAgICAgICAgICAgICAkVEVYVChpdGVtKSwgIC8vIGluIHRoaXMgY2FzZSwgYSBzaW5nbGUgdGV4dCBub2RlXG4gICAqICAgICAgICAgICAgICAgKTtcbiAgICogICAgICAgICAgICAgfSksXG4gICAqICAgICAgICAgICApO1xuICAgKiAgICAgICAgIH0pO1xuICAgKlxuICAgKiAgICAgICAgIC8vIENyZWF0ZSBhbiBhcHBlbmQgZWxlbWVudHMgdG8gdGhpcyBlbGVtZW50XG4gICAqICAgICAgICAgdGhpcy5hcHBlbmQoXG4gICAqICAgICAgICAgICB1bm9yZGVyZWRMaXN0RWxlbWVudC5idWlsZChcbiAgICogICAgICAgICAgICAgdGhpcy5vd25lckRvY3VtZW50LFxuICAgKiAgICAgICAgICAgICB7IHNjb3BlOiBVdGlscy5jcmVhdGVTY29wZSh0aGlzKSB9LFxuICAgKiAgICAgICAgICAgKSxcbiAgICogICAgICAgICApO1xuICAgKiAgICAgICB9XG4gICAqXG4gICAqICAgICAgIC8vIEFsbCBjbGFzcyBtZXRob2RzIGFyZSBhdXRvbWF0aWNhbGx5IGJvdW5kIHRvIFwidGhpc1wiIGluc2lkZSB0aGUgc3VwZXIuY29uc3RydWN0b3JcbiAgICogICAgICAgb25JdGVtQ2xpY2soZXZlbnQpIHtcbiAgICogICAgICAgICBjb25zb2xlLmxvZygnSXRlbSBDbGlja2VkIScsIGV2ZW50LnRhcmdldCk7XG4gICAqICAgICAgIH1cbiAgICogICAgIH1cbiAgICpcbiAgICogICAgIERlbW9OYXZDb21wb25lbnQucmVnaXN0ZXIoKTtcbiAgICogICAgIGBgYFxuICAgKi9cbiAgYnVpbGQoY2FsbGJhY2spIHtcbiAgICBsZXQgcmVzdWx0ID0gWyBjYWxsYmFjay5jYWxsKHRoaXMsIEVsZW1lbnRzLkVsZW1lbnRHZW5lcmF0b3IsIHt9KSBdLmZsYXQoSW5maW5pdHkpLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0gJiYgaXRlbVtVTkZJTklTSEVEX0RFRklOSVRJT05dKVxuICAgICAgICByZXR1cm4gaXRlbSgpO1xuXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9KS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPCAyKSA/IHJlc3VsdFswXSA6IG5ldyBFbGVtZW50cy5FbGVtZW50RGVmaW5pdGlvbignI2ZyYWdtZW50Jywge30sIHJlc3VsdCk7XG4gIH1cblxuICAkYnVpbGQoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gUXVlcnlFbmdpbmUuZnJvbS5jYWxsKHRoaXMsIFsgdGhpcy5idWlsZChjYWxsYmFjaykgXS5mbGF0KEluZmluaXR5KSk7XG4gIH1cblxuICBpc0F0dHJpYnV0ZVRydXRoeShuYW1lKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZShuYW1lKSlcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCB2YWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIGlmICh2YWx1ZSA9PT0gJycgfHwgdmFsdWUgPT09ICd0cnVlJylcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0SWRlbnRpZmllcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoJ25hbWUnKSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJykgfHwgQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKHRoaXMuc2Vuc2l0aXZlVGFnTmFtZSk7XG4gIH1cblxuICBtZXRhZGF0YShrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIFV0aWxzLm1ldGFkYXRhKHRoaXMsIGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZGVmaW5lRHluYW1pY1Byb3AobmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXIsIF9jb250ZXh0KSB7XG4gICAgcmV0dXJuIFV0aWxzLmRlZmluZUR5bmFtaWNQcm9wLmNhbGwoX2NvbnRleHQgfHwgdGhpcywgbmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXIpO1xuICB9XG5cbiAgZHluYW1pY0RhdGEob2JqKSB7XG4gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIGxldCBkYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGV0IGtleSAgID0ga2V5c1tpXTtcbiAgICAgIGxldCB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIFV0aWxzLmRlZmluZUR5bmFtaWNQcm9wLmNhbGwoZGF0YSwga2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBBIHNlbGYtcmVzZXR0aW5nIHRpbWVvdXQuIFRoaXMgbWV0aG9kIGV4cGVjdHMgYW4gYGlkYCBhcmd1bWVudCAob3Igd2lsbCBnZW5lcmF0ZSBvbmUgZnJvbSB0aGUgcHJvdmlkZWRcbiAgICogICBjYWxsYmFjayBtZXRob2QgaWYgbm90IHByb3ZpZGVkKS4gSXQgdXNlcyB0aGlzIHByb3ZpZGVkIGBpZGAgdG8gY3JlYXRlIGEgdGltZW91dC4gVGhpcyB0aW1lb3V0IGhhcyBhIHNwZWNpYWwgZmVhdHVyZVxuICAgKiAgIGhvd2V2ZXIgdGhhdCBkaWZmZXJlbnRpYXRlcyBpdCBmcm9tIGEgbm9ybWFsIGBzZXRUaW1lb3V0YCBjYWxsOiBpZiB5b3UgY2FsbCBgdGhpcy5kZWJvdW5jZWAgYWdhaW4gd2l0aCB0aGVcbiAgICogICBzYW1lIGBpZGAgKipiZWZvcmUqKiB0aGUgdGltZSBydW5zIG91dCwgdGhlbiBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgcmVzZXQgdGhlIHRpbWVyLiBJbiBzaG9ydCwgb25seSB0aGUgbGFzdCBjYWxsXG4gICAqICAgdG8gYHRoaXMuZGVib3VuY2VgIChnaXZlbiB0aGUgc2FtZSBpZCkgd2lsbCB0YWtlIGVmZmVjdCAodW5sZXNzIHRoZSBzcGVjaWZpZWQgdGltZW91dCBpcyByZWFjaGVkIGJldHdlZW4gY2FsbHMpLlxuICAgKiByZXR1cm46IHxcbiAgICogICBUaGlzIG1ldGhvZCByZXR1cm5zIGEgc3BlY2lhbGl6ZWQgUHJvbWlzZSBpbnN0YW5jZS4gVGhlIGluc3RhbmNlIGlzIHNwZWNpYWxpemVkIGJlY2F1c2UgdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzXG4gICAqICAgYXJlIGluamVjdGVkIGludG8gaXQ6XG4gICAqICAgMS4gYHJlc29sdmUocmVzdWx0VmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIHRoZSBmaXJzdCBwcm92aWRlZCBhcmd1bWVudFxuICAgKiAgIDIuIGByZWplY3QoZXJyb3JWYWx1ZSlgIC0gV2hlbiBjYWxsZWQsIHJlamVjdHMgdGhlIHByb21pc2Ugd2l0aCB0aGUgZmlyc3QgcHJvdmlkZWQgYXJndW1lbnRcbiAgICogICAzLiBgc3RhdHVzKClgIC0gV2hlbiBjYWxsZWQsIHdpbGwgcmV0dXJuIHRoZSBmdWxmaWxsbWVudCBzdGF0dXMgb2YgdGhlIHByb21pc2UsIGFzIGEgYHN0cmluZ2AsIG9uZSBvZjogYFwicGVuZGluZ1wiLCBcImZ1bGZpbGxlZFwiYCwgb3IgYFwicmVqZWN0ZWRcImBcbiAgICogICA0LiBgaWQ8c3RyaW5nPmAgLSBBIHJhbmRvbWx5IGdlbmVyYXRlZCBJRCBmb3IgdGhpcyBwcm9taXNlXG4gICAqXG4gICAqICAgU2VlIEBzZWUgQmFzZVV0aWxzLmNyZWF0ZVJlc29sdmFibGU7XG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IGNhbGxiYWNrXG4gICAqICAgICBkYXRhVHlwZXM6IGZ1bmN0aW9uXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIHRoZSB0aW1lb3V0IGhhcyBiZWVuIG1ldC5cbiAgICogICAtIG5hbWU6IHRpbWVNU1xuICAgKiAgICAgZGF0YVR5cGVzOiBudW1iZXJcbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkZWZhdWx0OiAwXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGNhbGxpbmcgYGNhbGxiYWNrYC5cbiAgICogICAtIG5hbWU6IGlkXG4gICAqICAgICBkYXRhVHlwZXM6IHN0cmluZ1xuICAgKiAgICAgb3B0aW9uYWw6IHRydWVcbiAgICogICAgIGRlZmF1bHQ6IFwibnVsbFwiXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBpZGVudGlmaWVyIGZvciB0aGlzIGRlYm91bmNlIHRpbWVyLiBJZiBub3QgcHJvdmlkZWQsIHRoZW4gb25lXG4gICAqICAgICAgIHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB5b3UgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGNhbGxiYWNrLlxuICAgKiBub3RlczpcbiAgICogICAtIFRob3VnaCBub3QgcmVxdWlyZWQsIGl0IGlzIGZhc3RlciBhbmQgbGVzcyBwcm9ibGVtYXRpYyB0byBwcm92aWRlIHlvdXIgb3duIGBpZGAgYXJndW1lbnRcbiAgICovXG4gIGRlYm91bmNlKGNhbGxiYWNrLCB0aW1lTVMsIF9pZCkge1xuICAgIHZhciBpZCA9IF9pZDtcblxuICAgIC8vIElmIHdlIGRvbid0IGdldCBhbiBpZCBmcm9tIHRoZSB1c2VyLCB0aGVuIGd1ZXNzIHRoZSBpZCBieSB0dXJuaW5nIHRoZSBmdW5jdGlvblxuICAgIC8vIGludG8gYSBzdHJpbmcgKHJhdyBzb3VyY2UpIGFuZCB1c2UgdGhhdCBmb3IgYW4gaWQgaW5zdGVhZFxuICAgIGlmIChpZCA9PSBudWxsKSB7XG4gICAgICBpZCA9ICgnJyArIGNhbGxiYWNrKTtcblxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHRyYW5zcGlsZWQgY29kZSwgdGhlbiBhbiBhc3luYyBnZW5lcmF0b3Igd2lsbCBiZSB1c2VkIGZvciBhc3luYyBmdW5jdGlvbnNcbiAgICAgIC8vIFRoaXMgd3JhcHMgdGhlIHJlYWwgZnVuY3Rpb24sIGFuZCBzbyB3aGVuIGNvbnZlcnRpbmcgdGhlIGZ1bmN0aW9uIGludG8gYSBzdHJpbmdcbiAgICAgIC8vIGl0IHdpbGwgTk9UIGJlIHVuaXF1ZSBwZXIgY2FsbC1zaXRlLiBGb3IgdGhpcyByZWFzb24sIGlmIHdlIGRldGVjdCB0aGlzIGlzc3VlLFxuICAgICAgLy8gd2Ugd2lsbCBnbyB0aGUgXCJzbG93XCIgcm91dGUgYW5kIGNyZWF0ZSBhIHN0YWNrIHRyYWNlLCBhbmQgdXNlIHRoYXQgZm9yIHRoZSB1bmlxdWUgaWRcbiAgICAgIGlmIChpZC5tYXRjaCgvYXN5bmNHZW5lcmF0b3JTdGVwLykpIHtcbiAgICAgICAgaWQgPSAobmV3IEVycm9yKCkpLnN0YWNrO1xuICAgICAgICBjb25zb2xlLndhcm4oJ215dGhpeC11aSB3YXJuaW5nOiBcInRoaXMuZGVsYXlcIiBjYWxsZWQgd2l0aG91dCBhIHNwZWNpZmllZCBcImlkXCIgcGFyYW1ldGVyLiBUaGlzIHdpbGwgcmVzdWx0IGluIGEgcGVyZm9ybWFuY2UgaGl0LiBQbGVhc2Ugc3BlY2lmeSBhbmQgXCJpZFwiIGFyZ3VtZW50IGZvciB5b3VyIGNhbGw6IFwidGhpcy5kZWxheShjYWxsYmFjaywgbXMsIFxcJ3NvbWUtY3VzdG9tLWNhbGwtc2l0ZS1pZFxcJylcIicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZCA9ICgnJyArIGlkKTtcbiAgICB9XG5cbiAgICBsZXQgcHJvbWlzZSA9IHRoaXMuZGVsYXlUaW1lcnMuZ2V0KGlkKTtcbiAgICBpZiAocHJvbWlzZSkge1xuICAgICAgaWYgKHByb21pc2UudGltZXJJRClcbiAgICAgICAgY2xlYXJUaW1lb3V0KHByb21pc2UudGltZXJJRCk7XG5cbiAgICAgIHByb21pc2UucmVqZWN0KCdjYW5jZWxsZWQnKTtcbiAgICB9XG5cbiAgICBwcm9taXNlID0gQmFzZVV0aWxzLmNyZWF0ZVJlc29sdmFibGUoKTtcbiAgICB0aGlzLmRlbGF5VGltZXJzLnNldChpZCwgcHJvbWlzZSk7XG5cbiAgICAvLyBMZXQncyBub3QgY29tcGxhaW4gYWJvdXRcbiAgICAvLyB1bmNhdWdodCBlcnJvcnNcbiAgICBwcm9taXNlLmNhdGNoKCgpID0+IHt9KTtcblxuICAgIHByb21pc2UudGltZXJJRCA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNhbGxiYWNrKCk7XG4gICAgICAgIHByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZW5jb3VudGVyZWQgd2hpbGUgY2FsbGluZyBcImRlbGF5XCIgY2FsbGJhY2s6ICcsIGVycm9yLCBjYWxsYmFjay50b1N0cmluZygpKTtcbiAgICAgICAgcHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgfVxuICAgIH0sIHRpbWVNUyB8fCAwKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgY2xlYXJEZWJvdW5jZShpZCkge1xuICAgIGxldCBwcm9taXNlID0gdGhpcy5kZWxheVRpbWVycy5nZXQoaWQpO1xuICAgIGlmICghcHJvbWlzZSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChwcm9taXNlLnRpbWVySUQpXG4gICAgICBjbGVhclRpbWVvdXQocHJvbWlzZS50aW1lcklEKTtcblxuICAgIHByb21pc2UucmVqZWN0KCdjYW5jZWxsZWQnKTtcblxuICAgIHRoaXMuZGVsYXlUaW1lcnMuZGVsZXRlKGlkKTtcbiAgfVxuXG4gIGNsYXNzZXMoLi4uX2FyZ3MpIHtcbiAgICBsZXQgYXJncyA9IF9hcmdzLmZsYXQoSW5maW5pdHkpLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoaXRlbSwgJzo6U3RyaW5nJykpXG4gICAgICAgIHJldHVybiBpdGVtLnRyaW0oKTtcblxuICAgICAgaWYgKEJhc2VVdGlscy5pc1BsYWluT2JqZWN0KGl0ZW0pKSB7XG4gICAgICAgIGxldCBrZXlzICA9IE9iamVjdC5rZXlzKGl0ZW0pO1xuICAgICAgICBsZXQgaXRlbXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgICBsZXQga2V5ICAgPSBrZXlzW2ldO1xuICAgICAgICAgIGxldCB2YWx1ZSA9IGl0ZW1ba2V5XTtcbiAgICAgICAgICBpZiAoIXZhbHVlKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pLmZsYXQoSW5maW5pdHkpLmZpbHRlcihCb29sZWFuKTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXJncykpLmpvaW4oJyAnKTtcbiAgfVxuXG4gIGFzeW5jIGZldGNoU3JjKHNyY1VSTCkge1xuICAgIGlmICghc3JjVVJMKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IENvbXBvbmVudFV0aWxzLmxvYWRQYXJ0aWFsSW50b0VsZW1lbnQuY2FsbCh0aGlzLCBzcmNVUkwpO1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdteXRoaXgtcmVhZHknKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXCIke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX1cIjogRmFpbGVkIHRvIGxvYWQgc3BlY2lmaWVkIHJlc291cmNlOiAke3NyY1VSTH0gKHJlc29sdmVkIHRvOiAke2Vycm9yLnVybH0pYCwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbWFnaWMtbnVtYmVycyAqL1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcblxuaW1wb3J0IHtcbiAgTXl0aGl4VUlDb21wb25lbnQsXG59IGZyb20gJy4vbXl0aGl4LXVpLWNvbXBvbmVudC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSUR5bmFtaWNTdHlsZSBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSAnbXl0aGl4LWR5bmFtaWMtc3R5bGUnO1xuXG4gIHNldCBhdHRyJGRhdGFFbmFibGVkKFsgbmV3VmFsdWUgXSkge1xuICAgIHRoaXMuaGFuZGxlRGF0YUVuYWJsZWRBdHRyaWJ1dGVDaGFuZ2UobmV3VmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlU3R5bGVOb2RlKCkge1xuICAgIGxldCBvd25lckRvY3VtZW50ICAgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgbGV0IGluaXRpYWxDb250ZW50ICA9IHRoaXMudGV4dENvbnRlbnQudHJpbSgpO1xuICAgIGxldCBocmVmICAgICAgICAgICAgPSB0aGlzLmF0dHIoJ2hyZWYnKTtcbiAgICBsZXQgc3R5bGVOb2RlICAgICAgID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgaWYgKEJhc2VVdGlscy5pc05vdE5PRShocmVmKSkge1xuICAgICAgQ29tcG9uZW50VXRpbHMucmVxdWlyZShocmVmLCB7IG93bmVyRG9jdW1lbnQgfSkudGhlbihcbiAgICAgICAgYXN5bmMgKHsgcmVzcG9uc2UgfSkgPT4ge1xuICAgICAgICAgIGxldCBjb250ZW50ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgIHN0eWxlTm9kZS5pbm5lckhUTUwgPSBjb250ZW50O1xuXG4gICAgICAgICAgdGhpcy5oYW5kbGVEYXRhRW5hYmxlZEF0dHJpYnV0ZUNoYW5nZSh0aGlzLmF0dHIoJ2RhdGEtZW5hYmxlZCcpKTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgbXl0aGl4LWR5bmFtaWMtc3R5bGU6IEVycm9yIHdoaWxlIGF0dGVtcHRpbmcgdG8gbG9hZCBzdHlsZSBcIiR7aHJlZn1cIjogYCwgdGhpcywgZXJyb3IpO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKEJhc2VVdGlscy5pc05vdE5PRShpbml0aWFsQ29udGVudCkpIHtcbiAgICAgIGlmICgoLzxzdHlsZVtePl0qPi9pKS50ZXN0KGluaXRpYWxDb250ZW50KSkge1xuICAgICAgICBsZXQgdGVtcERpdiA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gaW5pdGlhbENvbnRlbnQ7XG5cbiAgICAgICAgbGV0IHRlbXBOb2RlID0gdGVtcERpdi5xdWVyeVNlbGVjdG9yKCdzdHlsZScpO1xuICAgICAgICBpZiAodGVtcE5vZGUpXG4gICAgICAgICAgc3R5bGVOb2RlID0gdGVtcE5vZGU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBzdHlsZU5vZGUuaW5uZXJIVE1MID0gaW5pdGlhbENvbnRlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZU5vZGUuaW5uZXJIVE1MID0gaW5pdGlhbENvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0eWxlTm9kZTtcbiAgfVxuXG4gIG1vdW50ZWQoKSB7XG4gICAgc3VwZXIubW91bnRlZCgpO1xuXG4gICAgdGhpcy5zdHlsZU5vZGUgPSB0aGlzLmNyZWF0ZVN0eWxlTm9kZSgpO1xuXG4gICAgdGhpcy5oYW5kbGVEYXRhRW5hYmxlZEF0dHJpYnV0ZUNoYW5nZSh0aGlzLmF0dHIoJ2RhdGEtZW5hYmxlZCcpKTtcbiAgfVxuXG4gIGhhbmRsZURhdGFFbmFibGVkQXR0cmlidXRlQ2hhbmdlKGVuYWJsZWQpIHtcbiAgICBpZiAoIXRoaXMuc3R5bGVOb2RlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKEJhc2VVdGlscy5pc05PRSh0aGlzLnN0eWxlTm9kZS50ZXh0Q29udGVudCkpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgaXNFbmFibGVkID0gKC9eKHRydWUpJC9pKS50ZXN0KGVuYWJsZWQpO1xuICAgIGlmIChpc0VuYWJsZWQpXG4gICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuc3R5bGVOb2RlKTtcbiAgICBlbHNlIGlmICh0aGlzLmNvbnRhaW5zKHRoaXMuc3R5bGVOb2RlKSlcbiAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5zdHlsZU5vZGUpO1xuICB9XG59XG5cbk15dGhpeFVJRHluYW1pY1N0eWxlLnJlZ2lzdGVyKCk7XG5cbihnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pKS5NeXRoaXhVSUR5bmFtaWNTdHlsZSA9IE15dGhpeFVJRHluYW1pY1N0eWxlO1xuIiwiaW1wb3J0IGRlZXBNZXJnZSBmcm9tICdkZWVwbWVyZ2UnO1xuaW1wb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcblxuaW1wb3J0IHtcbiAgRHluYW1pY1Byb3BlcnR5LFxufSBmcm9tICcuL2R5bmFtaWMtcHJvcGVydHkuanMnO1xuXG5pbXBvcnQge1xuICBNeXRoaXhVSUNvbXBvbmVudCxcbn0gZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuLyoqXG4gKiBSVEwgKFJpZ2h0LXRvLUxlZnQpIGxhbmd1YWdlIGNvZGVzLlxuICogSW5jbHVkZXMgQXJhYmljLCBIZWJyZXcsIFBlcnNpYW4vRmFyc2ksIFVyZHUsIGFuZCByZWxhdGVkIGxhbmd1YWdlcy5cbiAqL1xuY29uc3QgUlRMX0xBTkdVQUdFUyA9IG5ldyBTZXQoW1xuICAnYXInLCAnYXJjJywgJ2FyeicsICdhei1hcmFiJywgJ2JxaScsICdja2InLCAnZHYnLCAnZmEnLCAnZ2xrJywgJ2hlJyxcbiAgJ2t1LWFyYWInLCAnbXpuJywgJ25xbycsICdwbmInLCAncHMnLCAnc2QnLCAndWcnLCAndXInLCAneWknLFxuXSk7XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBsYW5ndWFnZSBjb2RlIHJlcHJlc2VudHMgYW4gUlRMIGxhbmd1YWdlLlxuICovXG5jb25zdCBpc1JUTExhbmd1YWdlID0gKGxhbmcpID0+IHtcbiAgaWYgKCFsYW5nKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBsZXQgbm9ybWFsaXplZExhbmcgPSBsYW5nLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gQ2hlY2sgZXhhY3QgbWF0Y2hcbiAgaWYgKFJUTF9MQU5HVUFHRVMuaGFzKG5vcm1hbGl6ZWRMYW5nKSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICAvLyBDaGVjayBiYXNlIGxhbmd1YWdlIChlLmcuLCAnYXItU0EnIC0+ICdhcicpXG4gIGxldCBiYXNlTGFuZyA9IG5vcm1hbGl6ZWRMYW5nLnNwbGl0KCctJylbMF07XG4gIHJldHVybiBSVExfTEFOR1VBR0VTLmhhcyhiYXNlTGFuZyk7XG59O1xuXG4vKipcbiAqIERlZmF1bHQgZGF0ZSBmb3JtYXQgcHJlc2V0cy5cbiAqL1xuY29uc3QgREFURV9GT1JNQVRfUFJFU0VUUyA9IHtcbiAgc2hvcnQ6ICB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnIH0sXG4gIGxvbmc6ICAgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCB3ZWVrZGF5OiAnbG9uZycgfSxcbiAgbWVkaXVtOiB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdzaG9ydCcsIGRheTogJ251bWVyaWMnLCB3ZWVrZGF5OiAnc2hvcnQnIH0sXG4gIHRpbWU6ICAgeyBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnIH0sXG4gIGZ1bGw6ICAgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnLCB3ZWVrZGF5OiAnbG9uZycsIGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycgfSxcbn07XG5cbi8qKlxuICogRGVmYXVsdCBudW1iZXIgZm9ybWF0IHByZXNldHMuXG4gKi9cbmNvbnN0IE5VTUJFUl9GT1JNQVRfUFJFU0VUUyA9IHtcbiAgZGVjaW1hbDogICAgeyBzdHlsZTogJ2RlY2ltYWwnIH0sXG4gIHBlcmNlbnQ6ICAgIHsgc3R5bGU6ICdwZXJjZW50JyB9LFxuICBjb21wYWN0OiAgICB7IG5vdGF0aW9uOiAnY29tcGFjdCcgfSxcbiAgc2NpZW50aWZpYzogeyBub3RhdGlvbjogJ3NjaWVudGlmaWMnIH0sXG59O1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlMYW5ndWFnZVBhY2sgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gIHN0YXRpYyB0YWdOYW1lID0gJ215dGhpeC1sYW5ndWFnZS1wYWNrJztcblxuICBjcmVhdGVTaGFkb3dET00oKSB7XG4gICAgLy8gTk9PUFxuICB9XG5cbiAgZ2V0Q29tcG9uZW50VGVtcGxhdGUoKSB7XG4gICAgLy8gTk9PUFxuICB9XG5cbiAgc2V0IGF0dHIkZGF0YU15dGhpeFNyYyhbIHZhbHVlIF0pIHtcbiAgICAvLyBOT09QLi4uIFRyYXAgdGhpcyBiZWNhdXNlIHdlXG4gICAgLy8gZG9uJ3Qgd2FudCB0byBsb2FkIGEgcGFydGlhbCBoZXJlXG4gIH1cblxuICBvbk11dGF0aW9uQWRkZWQobXV0YXRpb24pIHtcbiAgICAvLyBXaGVuIGFkZGVkIHRvIHRoZSBET00sIGVuc3VyZSB0aGF0IHdlIHdlcmVcbiAgICAvLyBhZGRlZCB0byB0aGUgcm9vdCBvZiBhIGxhbmd1YWdlIHByb3ZpZGVyLi4uXG4gICAgLy8gSWYgbm90LCB0aGVuIG1vdmUgb3Vyc2VsdmVzIHRvIHRoZSByb290XG4gICAgLy8gb2YgdGhlIGxhbmd1YWdlIHByb3ZpZGVyLlxuICAgIGxldCBwYXJlbnRMYW5ndWFnZVByb3ZpZGVyID0gdGhpcy5jbG9zZXN0KCdteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXInKTtcbiAgICBpZiAocGFyZW50TGFuZ3VhZ2VQcm92aWRlciAmJiBwYXJlbnRMYW5ndWFnZVByb3ZpZGVyICE9PSBtdXRhdGlvbi50YXJnZXQpXG4gICAgICBCYXNlVXRpbHMubmV4dFRpY2soKCkgPT4gcGFyZW50TGFuZ3VhZ2VQcm92aWRlci5pbnNlcnRCZWZvcmUodGhpcywgcGFyZW50TGFuZ3VhZ2VQcm92aWRlci5maXJzdENoaWxkKSk7XG4gIH1cbn1cblxuY29uc3QgSVNfSlNPTl9FTkNUWVBFICAgICAgICAgICAgICAgICA9IC9eYXBwbGljYXRpb25cXC9qc29uL2k7XG5jb25zdCBMQU5HVUFHRV9QQUNLX0lOU0VSVF9HUkFDRV9USU1FID0gNTA7XG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXIgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gIHN0YXRpYyB0YWdOYW1lID0gJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcic7XG5cbiAgLyoqXG4gICAqIE9ic2VydmVkIGF0dHJpYnV0ZXMgZm9yIHJlYWN0aXZlIHVwZGF0ZXMuXG4gICAqL1xuICBzdGF0aWMgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gWyAnbGFuZycsICdmYWxsYmFjaycsICdhdXRvLWRpcicgXTtcblxuICBzZXQgYXR0ciRsYW5nKFsgbmV3VmFsdWUsIG9sZFZhbHVlIF0pIHtcbiAgICB0aGlzLmxvYWRBbGxMYW5ndWFnZVBhY2tzRm9yTGFuZ3VhZ2UobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICB0aGlzLnVwZGF0ZVRleHREaXJlY3Rpb24oKTtcbiAgfVxuXG4gIHNldCBhdHRyJGZhbGxiYWNrKFsgX25ld1ZhbHVlLCBfb2xkVmFsdWUgXSkge1xuICAgIC8vIEZhbGxiYWNrIGNoYWluIGNoYW5nZWQsIHJlbG9hZCBsYW5ndWFnZSBwYWNrc1xuICAgIHRoaXMubG9hZEFsbExhbmd1YWdlUGFja3NGb3JMYW5ndWFnZSh0aGlzLmdldEN1cnJlbnRMb2NhbGUoKSk7XG4gIH1cblxuICBzZXQgYXR0ciRhdXRvRGlyKFsgbmV3VmFsdWUgXSkge1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gbnVsbClcbiAgICAgIHRoaXMudXBkYXRlVGV4dERpcmVjdGlvbigpO1xuICB9XG5cbiAgb25NdXRhdGlvbkNoaWxkQWRkZWQobm9kZSkge1xuICAgIGlmIChub2RlLmxvY2FsTmFtZSA9PT0gJ215dGhpeC1sYW5ndWFnZS1wYWNrJykge1xuICAgICAgdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgIC8vIFJlbG9hZCBsYW5ndWFnZSBwYWNrcyBhZnRlciBhZGRpdGlvbnNcbiAgICAgICAgdGhpcy5sb2FkQWxsTGFuZ3VhZ2VQYWNrc0Zvckxhbmd1YWdlKHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpKTtcbiAgICAgIH0sIExBTkdVQUdFX1BBQ0tfSU5TRVJUX0dSQUNFX1RJTUUsICdyZWxvYWRMYW5ndWFnZVBhY2tzJyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICd0ZXJtcyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIH0sXG4gICAgICAnX3BsdXJhbFJ1bGVzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBudWxsLFxuICAgICAgfSxcbiAgICAgICdfZGF0ZUZvcm1hdHRlcnMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG5ldyBNYXAoKSxcbiAgICAgIH0sXG4gICAgICAnX251bWJlckZvcm1hdHRlcnMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG5ldyBNYXAoKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBmYWxsYmFjayBsYW5ndWFnZSBjaGFpbiBhcyBhbiBhcnJheS5cbiAgICogUmV0dXJucyBbY3VycmVudExhbmcsIC4uLmZhbGxiYWNrc10gaW4gb3JkZXIgb2YgcHJlZmVyZW5jZS5cbiAgICovXG4gIGdldEZhbGxiYWNrQ2hhaW4oKSB7XG4gICAgbGV0IGN1cnJlbnRMYW5nID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKCk7XG4gICAgbGV0IGZhbGxiYWNrID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZhbGxiYWNrJykgfHwgJyc7XG4gICAgbGV0IGZhbGxiYWNrcyA9IGZhbGxiYWNrLnNwbGl0KCcsJykubWFwKChsKSA9PiBsLnRyaW0oKSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgLy8gQnVpbGQgY2hhaW46IGN1cnJlbnQgLT4gYmFzZSBvZiBjdXJyZW50IC0+IGV4cGxpY2l0IGZhbGxiYWNrc1xuICAgIGxldCBjaGFpbiA9IFsgY3VycmVudExhbmcgXTtcblxuICAgIC8vIEFkZCBiYXNlIGxhbmd1YWdlIGlmIGN1cnJlbnQgaGFzIGEgcmVnaW9uIChlLmcuLCAnZXMtTVgnIC0+ICdlcycpXG4gICAgaWYgKGN1cnJlbnRMYW5nLmluY2x1ZGVzKCctJykpIHtcbiAgICAgIGxldCBiYXNlTGFuZyA9IGN1cnJlbnRMYW5nLnNwbGl0KCctJylbMF07XG4gICAgICBpZiAoIWNoYWluLmluY2x1ZGVzKGJhc2VMYW5nKSlcbiAgICAgICAgY2hhaW4ucHVzaChiYXNlTGFuZyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGV4cGxpY2l0IGZhbGxiYWNrc1xuICAgIGZvciAobGV0IGxhbmcgb2YgZmFsbGJhY2tzKSB7XG4gICAgICBpZiAoIWNoYWluLmluY2x1ZGVzKGxhbmcpKVxuICAgICAgICBjaGFpbi5wdXNoKGxhbmcpO1xuICAgIH1cblxuICAgIHJldHVybiBjaGFpbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgYSBrZXkgd2l0aCBvcHRpb25hbCBpbnRlcnBvbGF0aW9uIGFuZCBwbHVyYWxpemF0aW9uIHN1cHBvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUgdHJhbnNsYXRpb24ga2V5IHBhdGguXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBpbmNsdWRpbmcgYGNvdW50YCBmb3IgcGx1cmFsaXphdGlvbiBhbmQgaW50ZXJwb2xhdGlvbiB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7YW55fSBkZWZhdWx0VmFsdWUgLSBEZWZhdWx0IHZhbHVlIGlmIGtleSBub3QgZm91bmQuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB0cmFuc2xhdGVkIGFuZCBpbnRlcnBvbGF0ZWQgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBTaW1wbGUgdHJhbnNsYXRpb25cbiAgICogbGFuZy50KCdncmVldGluZy5oZWxsbycpXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFdpdGggcGx1cmFsaXphdGlvbiAocmVxdWlyZXMgSUNVLXN0eWxlIHBsdXJhbCBrZXlzIGluIGxhbmd1YWdlIHBhY2spXG4gICAqIGxhbmcudCgnaXRlbXMnLCB7IGNvdW50OiA1IH0pXG4gICAqIC8vIExhbmd1YWdlIHBhY2s6IHsgXCJpdGVtc1wiOiB7IFwib25lXCI6IFwie3tjb3VudH19IGl0ZW1cIiwgXCJvdGhlclwiOiBcInt7Y291bnR9fSBpdGVtc1wiIH0gfVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBXaXRoIGludGVycG9sYXRpb25cbiAgICogbGFuZy50KCd3ZWxjb21lJywgeyBuYW1lOiAnSm9obicgfSlcbiAgICogLy8gTGFuZ3VhZ2UgcGFjazogeyBcIndlbGNvbWVcIjogXCJIZWxsbywge3tuYW1lfX0hXCIgfVxuICAgKi9cbiAgdChrZXksIG9wdGlvbnMgPSB7fSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgbGV0IHBhdGggPSBgZ2xvYmFsLmkxOG4uJHtrZXl9YDtcbiAgICBsZXQgcmVzdWx0ID0gVXRpbHMuZmV0Y2hQYXRoKHRoaXMudGVybXMsIHBhdGgpO1xuXG4gICAgLy8gSGFuZGxlIHBsdXJhbGl6YXRpb25cbiAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnICYmICdjb3VudCcgaW4gb3B0aW9ucykge1xuICAgICAgbGV0IHBsdXJhbENhdGVnb3J5ID0gdGhpcy5nZXRQbHVyYWxDYXRlZ29yeShvcHRpb25zLmNvdW50KTtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdFtwbHVyYWxDYXRlZ29yeV0gfHwgcmVzdWx0Lm90aGVyIHx8IHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHJhdyB2YWx1ZSBpZiBpdCdzIGEgRHluYW1pY1Byb3BlcnR5XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIER5bmFtaWNQcm9wZXJ0eSlcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC52YWx1ZU9mKCk7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBpZiBubyByZXN1bHRcbiAgICBpZiAocmVzdWx0ID09IG51bGwpXG4gICAgICByZXN1bHQgPSAoZGVmYXVsdFZhbHVlICE9IG51bGwpID8gZGVmYXVsdFZhbHVlIDoga2V5O1xuXG4gICAgLy8gSW50ZXJwb2xhdGUgdmFsdWVzXG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXHtcXHsoXFx3KylcXH1cXH0vZywgKG1hdGNoLCB2YXJOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAodmFyTmFtZSBpbiBvcHRpb25zKSA/IG9wdGlvbnNbdmFyTmFtZV0gOiBtYXRjaDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBJQ1UgcGx1cmFsIGNhdGVnb3J5IGZvciBhIGNvdW50LlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gY291bnQgLSBUaGUgY291bnQgdG8gZ2V0IHRoZSBwbHVyYWwgY2F0ZWdvcnkgZm9yLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBPbmUgb2Y6ICd6ZXJvJywgJ29uZScsICd0d28nLCAnZmV3JywgJ21hbnknLCAnb3RoZXInLlxuICAgKi9cbiAgZ2V0UGx1cmFsQ2F0ZWdvcnkoY291bnQpIHtcbiAgICBsZXQgbGFuZyA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpO1xuXG4gICAgLy8gQ2FjaGUgUGx1cmFsUnVsZXMgcGVyIGxhbmd1YWdlXG4gICAgaWYgKCF0aGlzLl9wbHVyYWxSdWxlcyB8fCB0aGlzLl9wbHVyYWxSdWxlcy5sb2NhbGUgIT09IGxhbmcpIHtcbiAgICAgIHRoaXMuX3BsdXJhbFJ1bGVzID0gbmV3IEludGwuUGx1cmFsUnVsZXMobGFuZyk7XG4gICAgICB0aGlzLl9wbHVyYWxSdWxlcy5sb2NhbGUgPSBsYW5nO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9wbHVyYWxSdWxlcy5zZWxlY3QoY291bnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGRhdGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICpcbiAgICogQHBhcmFtIHtEYXRlfG51bWJlcnxzdHJpbmd9IGRhdGUgLSBUaGUgZGF0ZSB0byBmb3JtYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gc3R5bGUgLSBBIHByZXNldCBuYW1lICgnc2hvcnQnLCAnbG9uZycsICdtZWRpdW0nLCAndGltZScsICdmdWxsJykgb3IgSW50bC5EYXRlVGltZUZvcm1hdCBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdERhdGUobmV3IERhdGUoKSwgJ2xvbmcnKVxuICAgKiAvLyBcIkZlYnJ1YXJ5IDcsIDIwMjZcIlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdERhdGUoZGF0ZSwgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnMi1kaWdpdCcsIGRheTogJzItZGlnaXQnIH0pXG4gICAqL1xuICBmb3JtYXREYXRlKGRhdGUsIHN0eWxlID0gJ21lZGl1bScpIHtcbiAgICBsZXQgbGFuZyA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpO1xuICAgIGxldCBvcHRpb25zID0gKHR5cGVvZiBzdHlsZSA9PT0gJ3N0cmluZycpID8gKERBVEVfRk9STUFUX1BSRVNFVFNbc3R5bGVdIHx8IERBVEVfRk9STUFUX1BSRVNFVFMubWVkaXVtKSA6IHN0eWxlO1xuICAgIGxldCBjYWNoZUtleSA9IGAke2xhbmd9LSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YDtcblxuICAgIGlmICghdGhpcy5fZGF0ZUZvcm1hdHRlcnMuaGFzKGNhY2hlS2V5KSlcbiAgICAgIHRoaXMuX2RhdGVGb3JtYXR0ZXJzLnNldChjYWNoZUtleSwgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobGFuZywgb3B0aW9ucykpO1xuXG4gICAgbGV0IGRhdGVWYWx1ZSA9IChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgPyBkYXRlIDogbmV3IERhdGUoZGF0ZSk7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGVGb3JtYXR0ZXJzLmdldChjYWNoZUtleSkuZm9ybWF0KGRhdGVWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgZGF0ZSByZWxhdGl2ZSB0byBub3cgKGUuZy4sIFwiMiBkYXlzIGFnb1wiLCBcImluIDMgaG91cnNcIikuXG4gICAqXG4gICAqIEBwYXJhbSB7RGF0ZXxudW1iZXJ8c3RyaW5nfSBkYXRlIC0gVGhlIGRhdGUgdG8gZm9ybWF0LlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIEludGwuUmVsYXRpdmVUaW1lRm9ybWF0IG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSByZWxhdGl2ZSB0aW1lIHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXRSZWxhdGl2ZVRpbWUobmV3IERhdGUoRGF0ZS5ub3coKSAtIDg2NDAwMDAwKSlcbiAgICogLy8gXCIxIGRheSBhZ29cIlxuICAgKi9cbiAgZm9ybWF0UmVsYXRpdmVUaW1lKGRhdGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIGxldCBsYW5nID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKCk7XG4gICAgbGV0IGRhdGVWYWx1ZSA9IChkYXRlIGluc3RhbmNlb2YgRGF0ZSkgPyBkYXRlIDogbmV3IERhdGUoZGF0ZSk7XG4gICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgbGV0IGRpZmZNcyA9IGRhdGVWYWx1ZS5nZXRUaW1lKCkgLSBub3c7XG4gICAgbGV0IGRpZmZTZWNvbmRzID0gTWF0aC5yb3VuZChkaWZmTXMgLyAxMDAwKTtcblxuICAgIC8vIERldGVybWluZSB0aGUgYmVzdCB1bml0XG4gICAgbGV0IHZhbHVlO1xuICAgIGxldCB1bml0O1xuXG4gICAgY29uc3QgTUlOVVRFID0gNjA7XG4gICAgY29uc3QgSE9VUiA9IDM2MDA7XG4gICAgY29uc3QgREFZID0gODY0MDA7XG4gICAgY29uc3QgV0VFSyA9IDYwNDgwMDtcbiAgICBjb25zdCBNT05USCA9IDI2Mjk4MDA7IC8vIH4zMC40NCBkYXlzXG4gICAgY29uc3QgWUVBUiA9IDMxNTU3NjAwOyAvLyB+MzY1LjI1IGRheXNcblxuICAgIGxldCBhYnNEaWZmID0gTWF0aC5hYnMoZGlmZlNlY29uZHMpO1xuXG4gICAgaWYgKGFic0RpZmYgPCBNSU5VVEUpIHtcbiAgICAgIHZhbHVlID0gZGlmZlNlY29uZHM7XG4gICAgICB1bml0ID0gJ3NlY29uZCc7XG4gICAgfSBlbHNlIGlmIChhYnNEaWZmIDwgSE9VUikge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gTUlOVVRFKTtcbiAgICAgIHVuaXQgPSAnbWludXRlJztcbiAgICB9IGVsc2UgaWYgKGFic0RpZmYgPCBEQVkpIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIEhPVVIpO1xuICAgICAgdW5pdCA9ICdob3VyJztcbiAgICB9IGVsc2UgaWYgKGFic0RpZmYgPCBXRUVLKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBEQVkpO1xuICAgICAgdW5pdCA9ICdkYXknO1xuICAgIH0gZWxzZSBpZiAoYWJzRGlmZiA8IE1PTlRIKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBXRUVLKTtcbiAgICAgIHVuaXQgPSAnd2Vlayc7XG4gICAgfSBlbHNlIGlmIChhYnNEaWZmIDwgWUVBUikge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gTU9OVEgpO1xuICAgICAgdW5pdCA9ICdtb250aCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIFlFQVIpO1xuICAgICAgdW5pdCA9ICd5ZWFyJztcbiAgICB9XG5cbiAgICBsZXQgZm9ybWF0dGVyID0gbmV3IEludGwuUmVsYXRpdmVUaW1lRm9ybWF0KGxhbmcsIHsgbnVtZXJpYzogJ2F1dG8nLCAuLi5vcHRpb25zIH0pO1xuICAgIHJldHVybiBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlLCB1bml0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBudW1iZXIgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIFRoZSBudW1iZXIgdG8gZm9ybWF0LlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHN0eWxlIC0gQSBwcmVzZXQgbmFtZSAoJ2RlY2ltYWwnLCAncGVyY2VudCcsICdjb21wYWN0JywgJ3NjaWVudGlmaWMnKSBvciBJbnRsLk51bWJlckZvcm1hdCBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIG51bWJlciBzdHJpbmcuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0TnVtYmVyKDEyMzQuNTYpXG4gICAqIC8vIFwiMSwyMzQuNTZcIiAoaW4gZW4tVVMpXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0TnVtYmVyKDAuNDIsICdwZXJjZW50JylcbiAgICogLy8gXCI0MiVcIlxuICAgKi9cbiAgZm9ybWF0TnVtYmVyKG51bWJlciwgc3R5bGUgPSAnZGVjaW1hbCcpIHtcbiAgICBsZXQgbGFuZyA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpO1xuICAgIGxldCBvcHRpb25zID0gKHR5cGVvZiBzdHlsZSA9PT0gJ3N0cmluZycpID8gKE5VTUJFUl9GT1JNQVRfUFJFU0VUU1tzdHlsZV0gfHwgTlVNQkVSX0ZPUk1BVF9QUkVTRVRTLmRlY2ltYWwpIDogc3R5bGU7XG4gICAgbGV0IGNhY2hlS2V5ID0gYCR7bGFuZ30tJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gO1xuXG4gICAgaWYgKCF0aGlzLl9udW1iZXJGb3JtYXR0ZXJzLmhhcyhjYWNoZUtleSkpXG4gICAgICB0aGlzLl9udW1iZXJGb3JtYXR0ZXJzLnNldChjYWNoZUtleSwgbmV3IEludGwuTnVtYmVyRm9ybWF0KGxhbmcsIG9wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzLl9udW1iZXJGb3JtYXR0ZXJzLmdldChjYWNoZUtleSkuZm9ybWF0KG51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgY3VycmVuY3kgYW1vdW50IGFjY29yZGluZyB0byB0aGUgY3VycmVudCBsb2NhbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbW91bnQgLSBUaGUgYW1vdW50IHRvIGZvcm1hdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbmN5IC0gVGhlIElTTyA0MjE3IGN1cnJlbmN5IGNvZGUgKGUuZy4sICdVU0QnLCAnRVVSJykuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQWRkaXRpb25hbCBJbnRsLk51bWJlckZvcm1hdCBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIGN1cnJlbmN5IHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXRDdXJyZW5jeSg5OS45OSwgJ1VTRCcpXG4gICAqIC8vIFwiJDk5Ljk5XCIgKGluIGVuLVVTKVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdEN1cnJlbmN5KDEyMzQuNTYsICdFVVInKVxuICAgKiAvLyBcIuKCrDEsMjM0LjU2XCIgKGluIGVuLVVTKSBvciBcIjEuMjM0LDU2IOKCrFwiIChpbiBkZS1ERSlcbiAgICovXG4gIGZvcm1hdEN1cnJlbmN5KGFtb3VudCwgY3VycmVuY3ksIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmZvcm1hdE51bWJlcihhbW91bnQsIHtcbiAgICAgIHN0eWxlOiAgICAnY3VycmVuY3knLFxuICAgICAgY3VycmVuY3k6IGN1cnJlbmN5LFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgY3VycmVudCBsYW5ndWFnZSBpcyBSVEwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBjdXJyZW50IGxhbmd1YWdlIGlzIFJUTC5cbiAgICovXG4gIGlzUlRMKCkge1xuICAgIHJldHVybiBpc1JUTExhbmd1YWdlKHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRleHQgZGlyZWN0aW9uIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxhbmd1YWdlLlxuICAgKiBPbmx5IGFwcGxpZXMgd2hlbiBhdXRvLWRpciBhdHRyaWJ1dGUgaXMgcHJlc2VudC5cbiAgICovXG4gIHVwZGF0ZVRleHREaXJlY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0by1kaXInKSlcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBkaXJlY3Rpb24gPSB0aGlzLmlzUlRMKCkgPyAncnRsJyA6ICdsdHInO1xuICAgIGxldCBwcmV2aW91c0RpcmVjdGlvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkaXInKTtcblxuICAgIGlmIChwcmV2aW91c0RpcmVjdGlvbiA9PT0gZGlyZWN0aW9uKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RpcicsIGRpcmVjdGlvbik7XG5cbiAgICAvLyBBbHNvIHNldCBvbiBkb2N1bWVudCBpZiB0aGlzIGlzIHRoZSByb290IHByb3ZpZGVyXG4gICAgaWYgKCF0aGlzLmNsb3Nlc3QoJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcjpub3QoOnNjb3BlKScpKSB7XG4gICAgICBsZXQgZG9jID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgZG9jLmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RpcicsIGRpcmVjdGlvbik7XG4gICAgfVxuXG4gICAgLy8gRGlzcGF0Y2ggZGlyZWN0aW9uIGNoYW5nZSBldmVudFxuICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnZGlyZWN0aW9uY2hhbmdlJywge1xuICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgIGRldGFpbDogIHsgZGlyZWN0aW9uLCBsYW5ndWFnZTogdGhpcy5nZXRDdXJyZW50TG9jYWxlKCkgfSxcbiAgICB9KTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgaTE4bihfcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gICAgbGV0IHBhdGggICAgPSBgZ2xvYmFsLmkxOG4uJHtfcGF0aH1gO1xuICAgIGxldCByZXN1bHQgID0gVXRpbHMuZmV0Y2hQYXRoKHRoaXMudGVybXMsIHBhdGgpO1xuXG4gICAgaWYgKHJlc3VsdCA9PSBudWxsKVxuICAgICAgcmV0dXJuIFV0aWxzLmdldER5bmFtaWNQcm9wZXJ0eUZvclBhdGguY2FsbCh0aGlzLCBwYXRoLCAoZGVmYXVsdFZhbHVlID09IG51bGwpID8gJycgOiBkZWZhdWx0VmFsdWUpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGdldEN1cnJlbnRMb2NhbGUoKSB7XG4gICAgLy8gKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkuY2hpbGROb2Rlc1sxXSBpcyB0aGUgYDxodG1sYD4gdGFnIG9mIHRoZSBkb2N1bWVudFxuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGFuZycpIHx8ICh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNoaWxkTm9kZXNbMV0uZ2V0QXR0cmlidXRlKCdsYW5nJykgfHwgJ2VuJztcbiAgfVxuXG4gIG1vdW50ZWQoKSB7XG4gICAgc3VwZXIubW91bnRlZCgpO1xuXG4gICAgaWYgKCF0aGlzLmdldEF0dHJpYnV0ZSgnbGFuZycpKVxuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xhbmcnLCAodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5jaGlsZE5vZGVzWzFdLmdldEF0dHJpYnV0ZSgnbGFuZycpIHx8ICdlbicpO1xuXG4gICAgLy8gQXBwbHkgaW5pdGlhbCB0ZXh0IGRpcmVjdGlvbiBpZiBhdXRvLWRpciBpcyBlbmFibGVkXG4gICAgdGhpcy51cGRhdGVUZXh0RGlyZWN0aW9uKCk7XG4gIH1cblxuICBjcmVhdGVTaGFkb3dET00oKSB7XG4gICAgLy8gTk9PUFxuICB9XG5cbiAgZ2V0Q29tcG9uZW50VGVtcGxhdGUoKSB7XG4gICAgLy8gTk9PUFxuICB9XG5cbiAgZ2V0U291cmNlc0ZvckxhbmcobGFuZykge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdChgbXl0aGl4LWxhbmd1YWdlLXBhY2tbbGFuZ149XCIke2xhbmcucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpfVwiXWApO1xuICB9XG5cbiAgbG9hZEFsbExhbmd1YWdlUGFja3NGb3JMYW5ndWFnZShfbGFuZykge1xuICAgIGxldCBsYW5nID0gX2xhbmcgfHwgJ2VuJztcbiAgICBsZXQgZmFsbGJhY2tDaGFpbiA9IHRoaXMuZ2V0RmFsbGJhY2tDaGFpbigpO1xuICAgIGxldCBhbGxTb3VyY2VFbGVtZW50cyA9IFtdO1xuXG4gICAgLy8gQ29sbGVjdCBsYW5ndWFnZSBwYWNrcyBmcm9tIGFsbCBsYW5ndWFnZXMgaW4gdGhlIGZhbGxiYWNrIGNoYWluXG4gICAgZm9yIChsZXQgZmFsbGJhY2tMYW5nIG9mIGZhbGxiYWNrQ2hhaW4pIHtcbiAgICAgIGxldCBzb3VyY2VFbGVtZW50cyA9IHRoaXMuZ2V0U291cmNlc0ZvckxhbmcoZmFsbGJhY2tMYW5nKVxuICAgICAgICAuZmlsdGVyKChzb3VyY2VFbGVtZW50KSA9PiBCYXNlVXRpbHMuaXNOb3ROT0Uoc291cmNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSk7XG5cbiAgICAgIGZvciAobGV0IHNvdXJjZUVsZW1lbnQgb2Ygc291cmNlRWxlbWVudHMpIHtcbiAgICAgICAgaWYgKCFhbGxTb3VyY2VFbGVtZW50cy5pbmNsdWRlcyhzb3VyY2VFbGVtZW50KSlcbiAgICAgICAgICBhbGxTb3VyY2VFbGVtZW50cy5wdXNoKHNvdXJjZUVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghYWxsU291cmNlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFwibXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyXCI6IE5vIFwibXl0aGl4LWxhbmd1YWdlLXBhY2tcIiB0YWcgZm91bmQgZm9yIGxhbmd1YWdlczogJHtmYWxsYmFja0NoYWluLmpvaW4oJywgJyl9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sb2FkQWxsTGFuZ3VhZ2VQYWNrcyhsYW5nLCBhbGxTb3VyY2VFbGVtZW50cywgZmFsbGJhY2tDaGFpbik7XG4gIH1cblxuICBhc3luYyBsb2FkQWxsTGFuZ3VhZ2VQYWNrcyhsYW5nLCBzb3VyY2VFbGVtZW50cywgZmFsbGJhY2tDaGFpbiA9IFtdKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIExvYWQgYWxsIGxhbmd1YWdlIHBhY2tzXG4gICAgICBsZXQgcHJvbWlzZXMgPSBzb3VyY2VFbGVtZW50cy5tYXAoKHNvdXJjZUVsZW1lbnQpID0+IHtcbiAgICAgICAgbGV0IHBhY2tMYW5nID0gc291cmNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2xhbmcnKSB8fCBsYW5nO1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkTGFuZ3VhZ2VQYWNrKHBhY2tMYW5nLCBzb3VyY2VFbGVtZW50KS50aGVuKCh0ZXJtcykgPT4gKHtcbiAgICAgICAgICBsYW5nOiAgcGFja0xhbmcsXG4gICAgICAgICAgdGVybXM6IHRlcm1zLFxuICAgICAgICB9KSk7XG4gICAgICB9KTtcblxuICAgICAgbGV0IHJlc3VsdHMgPSBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQocHJvbWlzZXMpO1xuXG4gICAgICAvLyBHcm91cCB0ZXJtcyBieSBsYW5ndWFnZVxuICAgICAgbGV0IHRlcm1zQnlMYW5nID0gbmV3IE1hcCgpO1xuICAgICAgZm9yIChsZXQgcmVzdWx0IG9mIHJlc3VsdHMpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgIT09ICdmdWxmaWxsZWQnIHx8ICFyZXN1bHQudmFsdWUgfHwgIXJlc3VsdC52YWx1ZS50ZXJtcylcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBsZXQgeyBsYW5nOiBwYWNrTGFuZywgdGVybXMgfSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgbGV0IGJhc2VMYW5nID0gcGFja0xhbmcuc3BsaXQoJy0nKVswXTtcblxuICAgICAgICAvLyBTdG9yZSB1bmRlciBib3RoIGZ1bGwgbGFuZyBhbmQgYmFzZSBsYW5nIGZvciBmYWxsYmFjayBtYXRjaGluZ1xuICAgICAgICBpZiAoIXRlcm1zQnlMYW5nLmhhcyhwYWNrTGFuZykpXG4gICAgICAgICAgdGVybXNCeUxhbmcuc2V0KHBhY2tMYW5nLCBbXSk7XG5cbiAgICAgICAgdGVybXNCeUxhbmcuZ2V0KHBhY2tMYW5nKS5wdXNoKHRlcm1zKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWVyZ2UgdGVybXMgaW4gZmFsbGJhY2sgb3JkZXIgKGxhc3QgaW4gY2hhaW4gZ2V0cyBsb3dlc3QgcHJpb3JpdHkpXG4gICAgICAvLyBSZXZlcnNlIHRoZSBjaGFpbiBzbyBtb3JlIHNwZWNpZmljIGxhbmd1YWdlcyBvdmVycmlkZSBmYWxsYmFja3NcbiAgICAgIGxldCBtZXJnZWRUZXJtcyA9IHt9O1xuICAgICAgbGV0IHJldmVyc2VkQ2hhaW4gPSBbIC4uLmZhbGxiYWNrQ2hhaW4gXS5yZXZlcnNlKCk7XG5cbiAgICAgIGZvciAobGV0IGZhbGxiYWNrTGFuZyBvZiByZXZlcnNlZENoYWluKSB7XG4gICAgICAgIGxldCBsYW5nVGVybXMgPSB0ZXJtc0J5TGFuZy5nZXQoZmFsbGJhY2tMYW5nKSB8fCBbXTtcblxuICAgICAgICAvLyBBbHNvIGNoZWNrIGJhc2UgbGFuZ3VhZ2VcbiAgICAgICAgaWYgKGZhbGxiYWNrTGFuZy5pbmNsdWRlcygnLScpKSB7XG4gICAgICAgICAgbGV0IGJhc2VMYW5nID0gZmFsbGJhY2tMYW5nLnNwbGl0KCctJylbMF07XG4gICAgICAgICAgbGV0IGJhc2VUZXJtcyA9IHRlcm1zQnlMYW5nLmdldChiYXNlTGFuZykgfHwgW107XG4gICAgICAgICAgbGFuZ1Rlcm1zID0gWyAuLi5iYXNlVGVybXMsIC4uLmxhbmdUZXJtcyBdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgdGVybXMgb2YgbGFuZ1Rlcm1zKSB7XG4gICAgICAgICAgbWVyZ2VkVGVybXMgPSBkZWVwTWVyZ2UobWVyZ2VkVGVybXMsIHRlcm1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY29tcGlsZWRUZXJtcyA9IHRoaXMuY29tcGlsZUxhbmd1YWdlVGVybXMobGFuZywgbWVyZ2VkVGVybXMpO1xuICAgICAgdGhpcy50ZXJtcyA9IGNvbXBpbGVkVGVybXM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1wibXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyXCI6IEZhaWxlZCB0byBsb2FkIGxhbmd1YWdlIHBhY2tzJywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRMYW5ndWFnZVBhY2sobGFuZywgc291cmNlRWxlbWVudCkge1xuICAgIGxldCBzcmMgPSBzb3VyY2VFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKCFzcmMpXG4gICAgICByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHsgcmVzcG9uc2UgfSAgPSBhd2FpdCBDb21wb25lbnRVdGlscy5yZXF1aXJlLmNhbGwodGhpcywgc3JjLCB7IG93bmVyRG9jdW1lbnQ6IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCB9KTtcbiAgICAgIGxldCB0eXBlICAgICAgICAgID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2VuY3R5cGUnKSB8fCAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICBpZiAoSVNfSlNPTl9FTkNUWVBFLnRlc3QodHlwZSkpIHtcbiAgICAgICAgLy8gSGFuZGxlIEpTT05cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ldyBUeXBlRXJyb3IoYERvbid0IGtub3cgaG93IHRvIGxvYWQgYSBsYW5ndWFnZSBwYWNrIG9mIHR5cGUgXCIke3R5cGV9XCJgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXCJteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXJcIjogRmFpbGVkIHRvIGxvYWQgc3BlY2lmaWVkIHJlc291cmNlOiAke3NyY31gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgY29tcGlsZUxhbmd1YWdlVGVybXMobGFuZywgdGVybXMpIHtcbiAgICBjb25zdCB3YWxrVGVybXMgPSAodGVybXMsIHJhd0tleVBhdGgpID0+IHtcbiAgICAgIGxldCBrZXlzICAgICAgPSBPYmplY3Qua2V5cyh0ZXJtcyk7XG4gICAgICBsZXQgdGVybXNDb3B5ID0ge307XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsZXQga2V5ICAgICAgICAgPSBrZXlzW2ldO1xuICAgICAgICBsZXQgdmFsdWUgICAgICAgPSB0ZXJtc1trZXldO1xuICAgICAgICBsZXQgbmV3S2V5UGF0aCAgPSByYXdLZXlQYXRoLmNvbmNhdChrZXkpO1xuXG4gICAgICAgIGlmIChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdCh2YWx1ZSkgfHwgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB0ZXJtc0NvcHlba2V5XSA9IHdhbGtUZXJtcyh2YWx1ZSwgbmV3S2V5UGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHByb3BlcnR5ID0gVXRpbHMuZ2V0RHluYW1pY1Byb3BlcnR5Rm9yUGF0aC5jYWxsKHRoaXMsIG5ld0tleVBhdGguam9pbignLicpLCB2YWx1ZSk7XG4gICAgICAgICAgdGVybXNDb3B5W2tleV0gPSBwcm9wZXJ0eTtcbiAgICAgICAgICBwcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRlcm1zQ29weTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHdhbGtUZXJtcyh0ZXJtcywgWyAnZ2xvYmFsJywgJ2kxOG4nIF0pO1xuICB9XG59XG5cbk15dGhpeFVJTGFuZ3VhZ2VQYWNrLnJlZ2lzdGVyKCk7XG5NeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXIucmVnaXN0ZXIoKTtcblxuKGdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSkpLk15dGhpeFVJTGFuZ3VhZ2VQYWNrID0gTXl0aGl4VUlMYW5ndWFnZVBhY2s7XG5nbG9iYWxUaGlzLm15dGhpeFVJLk15dGhpeFVJTGFuZ3VhZ2VQcm92aWRlciA9IE15dGhpeFVJTGFuZ3VhZ2VQcm92aWRlcjtcbiIsImltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmltcG9ydCB7IE15dGhpeFVJQ29tcG9uZW50IH0gZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuY29uc3QgSVNfVEVNUExBVEUgICAgICAgPSAvXih0ZW1wbGF0ZSkkL2k7XG5jb25zdCBURU1QTEFURV9URU1QTEFURSA9IC9eKFxcKnxcXHxcXCp8XFwqXFx8KSQvO1xuXG4vKipcbiAqIHR5cGU6IE15dGhpeEVsZW1lbnRcbiAqIG5hbWU6IE15dGhpeFVJUmVxdWlyZVxuICogZ3JvdXBOYW1lOiBNeXRoaXhFbGVtZW50c1xuICogZGVzYzogfFxuICogICBgYGBqYXZhc2NyaXB0XG4gKiAgIGltcG9ydCB7IE15dGhpeEVsZW1lbnRzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgIGNvbnN0IHtcbiAqICAgICBNeXRoaXhVSVJlcXVpcmUsXG4gKiAgIH0gPSBNeXRoaXhFbGVtZW50cztcbiAqICAgYGBgXG4gKlxuICogICBNeXRoaXhVSVJlcXVpcmUgaXMgYW4gRWxlbWVudCB0aGF0IHdpbGwgbG9hZCBvdGhlciByZXNvdXJjZXMuIEl0IGlzIGluc3BpcmVkIGJ5IGFuZCBuYW1lZCBhZnRlciBgcmVxdWlyZWAgaW4gTm9kZS4gSXQgd29ya3MgdmVyeSBzaW1pbGFybHkgYXMgd2VsbCwgc28gbm90IHRvbyBtdWNoIG5lZWRzIHRvIGJlIGV4cGxhaW5lZCBhYm91dCBpdC5cbiAqXG4gKiAgIEV4Y2VwdCBNeXRoaXggVUkgc3RhbmRhcmQgY29tcG9uZW50IGZpbGUgc3RydWN0dXJlIG1heWJlLi4uIFllYWgsIG1heWJlIHdlIHNob3VsZCBkaXNjdXNzIHRoYXQuXG4gKlxuICogICBUaGUgYDxteXRoaXgtcmVxdWlyZSBzcmM9XCIuL2NvbXBvbmVudHMvd2lkZ2V0Lmh0bWxcIj5gIHRhZyBhbGxvd3MgeW91IHRvIGxvYWQgb3RoZXIgcmVzb3VyY2VzIHNpbXBseSBieSBzcGVjaWZ5aW5nIGEgcGF0aC4gVGhpcyBwYXRoIGNhbiBiZSByZWxhdGl2ZSwgb3IgYWJzb2x1dGUuIFRoZSBwYXRoIGNhbiBjb250YWluIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gKlxuICogICBZb3UgbWF5IGhhdmUgbm90aWNlZCB0aGF0IHRoZSB0YWcgbmFtZSBkb2Vzbid0IHF1aXRlIG1hdGNoIHRoZSBjbGFzcyBuYW1lLCBgTXl0aGl4VUlSZXF1aXJlYCwgdnMgYDxteXRoaXgtcmVxdWlyZT5gLiBUaGlzIGRldmlhdGlvbiB3YXMgY2hvc2VuIGJ5IHRoZSBNeXRoaXggZGV2ZWxvcG1lbnQgdGVhbSBiZWNhdXNlIE15dGhpeCBpcyBhbiBlbnRpcmUgZWNvc3lzdGVtLCBub3QganVzdCBhIFVJIGZyYW1ld29yay4gRm9yIHRoaXMgcmVhc29uLCBhbmQgaW4gcGFydCB0byBhdm9pZCBmdXR1cmUgbmFtaW5nIGNvbGxpc2lvbnMsIHdlIGhhdmUgZGVjaWRlZCB0aGF0IGluIGNvZGUsIHRoZSBjbGFzcyBuYW1lIHNob3VsZCBjb250YWluIHRoZSBgVUlgIHBhcnQgdG8gZGVsaW1pdCBpdCBmcm9tIG90aGVyIE15dGhpeCB0ZWNobm9sb2dpZXMuIE5leHQsIHdlIGZlbHQgY29uc3RhbnRseSB0eXBpbmcgYDxteXRoaXgtdWktcmVxdWlyZT5gIGluIEhUTUwsIHZzIHRoZSBuaWNlciBgPG15dGhpeC1yZXF1aXJlPmAgd2FzIGtpbmRhIHNpbGx5LiBCZXNpZGVzLCBpbiBIVE1MLCB5b3UgQVJFIGluIHRoZSBVSSBjb250ZXh0LCBzbyB3aHkgcmVwZWF0IG91cnNlbHZlcz8gQW55aG93LCB0aGlzIGlzIGp1c3QgYSBsaXR0bGUgbm90ZSB0byBrZWVwIGluIG1pbmQuIFRoZSBFbGVtZW50IGNsYXNzIG5hbWVzIGRvIG5vdCBtYXRjaCB0aGUgRWxlbWVudCBgdGFnTmFtZWAgZm9yIE15dGhpeCBVSSBzdGFuZGFyZCBjb21wb25lbnRzLlxuICpcbiAqICAgSWYgYDxteXRoaXgtcmVxdWlyZT5gIGlzIHVzZWQgdG8gZmV0Y2ggYSBKYXZhU2NyaXB0IHJlc291cmNlLCB0aGVuIGl0IGJlaGF2ZXMgYWxtb3N0IGlkZW50aWNhbGx5IHRvIGEgYDxzY3JpcHQ+YCB0YWcuIElmIGhvd2V2ZXIgaXQgaXMgYmVpbmcgdXNlZCB0byBmZXRjaCBhbm90aGVyIHR5cGUgb2Yga25vd24gcmVzb3VyY2UsIHN1Y2ggYXMgdGV4dC9odG1sLCB0aGVuIGl0IHdpbGwgYmVoYXZlIGRpZmZlcmVudGx5LlxuICpcbiAqICAgV2hlbiBhbiBIVE1MIGZpbGUgaXMgZmV0Y2hlZCBieSBhIGA8bXl0aGl4LXJlcXVpcmU+YCBlbGVtZW50LCB0aGVuIGFueSBpbnRlcm5hbCBgPHNjcmlwdD5gLCBgPHN0eWxlPmAsIG9yIG90aGVyIHRhZyB0aGF0IGJlbG9uZ3MgaW4gdGhlIGA8aGVhZD5gIHRhZyB3aWxsIGJlIHBsYWNlZCBpbiB0aGUgYDxoZWFkPmAgdGFnIG9mIHRoZSBkb2N1bWVudC4gRHVwbGljYXRlIGluc2VydHMgYXJlIHByZXZlbnRlZCBieSB1c2Ugb2YgdGFnIGlkcy4gSWYgYSB0YWcgaW4gdGhlIGA8aGVhZD5gIG9mIHRoZSBkb2N1bWVudCBhbHJlYWR5IGhhcyB0aGUgc2FtZSBpZCBhcyBvbmUgTXl0aGl4VUlSZXF1aXJlIGlzIHRyeWluZyB0byBpbnNlcnQsIHRoZW4gTXl0aGl4VUlSZXF1aXJlIHdpbGwgYWJvcnQsIGFuZCBpdCB3b24ndCBkdXBsaWNhdGUgaW5zZXJ0aW5nIHNhaWQgZWxlbWVudC5cbiAqXG4gKiAgIE90aGVyIGVsZW1lbnRzIGFyZSB0cmVhdGVkIHNwZWNpYWxseSBhcyB3ZWxsIHdoZW4gZW5jb3VudGVyZWQgaW4gdGhlIGxvYWRlZCBIVE1MIGZpbGUuIEJlbG93IGlzIGEgdGFibGUgb2Ygc3BlY2lhbCBjYXNlczpcbiAqXG4gKiAgIHwgRWxlbWVudHMgfCBOb3RlcyB8XG4gKiAgIHwtLS0tLS18LS0tLS0tLXxcbiAqICAgfCBgPGxpbms+YCwgYDxzdHlsZT5gLCBgPG1ldGE+YCB8IEFyZSBhcHBlbmRlZCB0byB0aGUgYDxoZWFkPmAgb2YgdGhlIGRvY3VtZW50LiB8XG4gKiAgIHwgYDxzY3JpcHQ+YCB8IElzIGFwcGVuZGVkIHRvIHRoZSBgPGhlYWQ+YCBvZiB0aGUgZG9jdW1lbnQgYWZ0ZXIgdGhlIGBzcmNgIGF0dHJpYnV0ZSBpcyBmdWxseSByZXNvbHZlZC4gfFxuICogICB8IGA8dGVtcGxhdGU+YCB8IElzIGFwcGVuZGVkIHRvIHRoZSBib3R0b20gb2YgdGhlIGA8Ym9keT5gIG9mIHRoZSBkb2N1bWVudC4gfFxuICogICB8IGA8YmFzZT5gLCBgPG5vc2NyaXB0PmAsIGA8dGl0bGU+YCB8IEFyZSBkZWxpYmVyYXRlbHkgZGlzY2FyZGVkLiB8XG4gKiAgIHwgQWxsIG90aGVycyB8IEFyZSBhcHBlbmRlZCB0byB0aGUgYDxib2R5PmAgb2YgdGhlIGRvY3VtZW50LiB8XG4gKlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBgZ2xvYmFsVGhpcy5teXRoaXhVSS51cmxSZXNvbHZlcjogKGNvbnRleHQ6IHsgc3JjOiBzdHJpbmcgfCBVUkwsIHVybDogVVJMLCBwYXRoOiBzdHJpbmcsIGZpbGVOYW1lOiBzdHJpbmcgfSkgPT4gc3RyaW5nIHwgVVJMYCBpcyBhIG1ldGhvZCB0aGF0IGNhbiBiZSBkZWZpbmVkIGJ5IHRoZSB1c2VyLiBXaGVuIGRlZmluZWQsIGl0IHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgQHNlZSBDb21wb25lbnRVdGlscy5yZXNvbHZlVVJMOyBpcyBjYWxsZWQuIGBNeXRoaXhVSVJlcXVpcmVgIGNhbGxzIEBzZWUgQ29tcG9uZW50VXRpbHMucmVzb2x2ZVVSTDsgdG8gcmVzb2x2ZSBVUkxzLCBpbmNsdWRpbmcgaW4gc3ViIGA8c2NyaXB0PmAgdGFnIGBzcmNgIGF0dHJpYnV0ZXMgbG9hZGVkIGZyb20gcmVzb3VyY2VzLiBJdCBpcyB0aGUgaW50ZW50IG9mIHRoaXMgbWV0aG9kIHRoYXQgaXQgd2lsbCBnbG9iYWxseSByZXNvbHZlIGFsbCBVUkxzIGludGVybmFsIHRvIHRoZSBNeXRoaXggVUkgZnJhbWV3b3JrLiBPYnZpb3VzbHkgaXQgd29uJ3QgcmVzb2x2ZSBVUkxzIGRpcmVjdGx5IGZyb20gc3RhdGljIGBpbXBvcnRgIG9yIGR5bmFtaWMgYGltcG9ydCgpYCBzdGF0ZW1lbnRzIGluIEphdmFTY3JpcHQuIFRob3NlIGFyZSBoYW5kbGVkIGJ5IHRoZSBbaW1wb3J0bWFwXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvc2NyaXB0L3R5cGUvaW1wb3J0bWFwKSB5b3Ugc2V0dXAsIHJlbWVtYmVyPy5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBBbm90aGVyIGNvbXBvbmVudCBjYW4gYmUgbG9hZGVkIGR5bmFtaWNhbGx5LS11c3VhbGx5IGJ5IGxvYWRpbmcgaXRzIGNvcnJlc3BvbmRpbmcgSFRNTCBmaWxlICh3aGljaCB3aWxsIGdlbmVyYWxseSB0aGVuIGxvYWQgdGhlIGA8c2NyaXB0PmAgcmVxdWlyZSBieSB0aGUgY29tcG9uZW50KS4gSW4gdGhlIGV4YW1wbGUgYmVsb3cgd2UgYXJlIGxvYWRpbmcgdGhlIHN0YW5kYXJkIG1vZGFsIGNvbXBvbmVudCBwcm92aWRlZCBieSBNeXRoaXggVUk6XG4gKiAgICAgYGBgaHRtbFxuICogICAgIDxteXRoaXgtcmVxdWlyZSBzcmM9XCJAY2RuL215dGhpeC11aS1tb2RhbEAke3ttYWpvclZlcnNpb259fS9kaXN0L215dGhpeC11aS1tb2RhbC5odG1sXCI+PC9teXRoaXgtcmVxdWlyZT5cbiAqICAgICBgYGBcbiAqL1xuXG5sZXQgUkVRVUlSRV9IQU5ETEVSUyA9IFtdO1xuXG5mdW5jdGlvbiByZWdpc3RlclJlcXVpcmVIYW5kbGVyKHBhdHRlcm4sIGNhbGxiYWNrKSB7XG4gIFJFUVVJUkVfSEFORExFUlMudW5zaGlmdCh7XG4gICAgcGF0dGVybixcbiAgICBjYWxsYmFjayxcbiAgfSk7XG59XG5cbnJlZ2lzdGVyUmVxdWlyZUhhbmRsZXIoL1xcLmh0bWwkL2ksIGFzeW5jIGZ1bmN0aW9uKHsgdXJsLCBvd25lckRvY3VtZW50LCBmZXRjaE9wdGlvbnMgfSkge1xuICBsZXQge1xuICAgIHJlc3BvbnNlLFxuICAgIGNhY2hlZCxcbiAgfSA9IGF3YWl0IENvbXBvbmVudFV0aWxzLnJlcXVpcmUuY2FsbChcbiAgICB0aGlzLFxuICAgIHVybCxcbiAgICB7XG4gICAgICBtYWdpYzogICAgICAgICAgZmFsc2UsXG4gICAgICBvd25lckRvY3VtZW50OiAgb3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCxcbiAgICAgIGZldGNoT3B0aW9uczogICBmZXRjaE9wdGlvbnMsXG4gICAgfSxcbiAgKTtcblxuICBpZiAoY2FjaGVkKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGxldCBib2R5ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBDb21wb25lbnRVdGlscy5pbXBvcnRJbnRvRG9jdW1lbnRGcm9tU291cmNlLmNhbGwoXG4gICAgdGhpcyxcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyRG9jdW1lbnQubG9jYXRpb24sXG4gICAgdXJsLFxuICAgIGJvZHksXG4gICAge1xuICAgICAgbWFnaWM6ICAgICAgICB0cnVlLFxuICAgICAgbm9kZUhhbmRsZXI6ICAobm9kZSwgeyBpc0hhbmRsZWQgfSkgPT4ge1xuICAgICAgICBpZiAoIWlzSGFuZGxlZCAmJiBub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSlcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgfSxcbiAgICAgIHByZVByb2Nlc3M6ICAgKHsgdGVtcGxhdGUsIGNoaWxkcmVuIH0pID0+IHtcbiAgICAgICAgbGV0IHN0YXJUZW1wbGF0ZSA9IGNoaWxkcmVuLmZpbmQoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgbGV0IGRhdGFGb3IgPSBjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9yJyk7XG4gICAgICAgICAgcmV0dXJuIChJU19URU1QTEFURS50ZXN0KGNoaWxkLnRhZ05hbWUpICYmIFRFTVBMQVRFX1RFTVBMQVRFLnRlc3QoZGF0YUZvcikpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXN0YXJUZW1wbGF0ZSlcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG5cbiAgICAgICAgbGV0IGRhdGFGb3IgPSBzdGFyVGVtcGxhdGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpO1xuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgIGlmIChjaGlsZCA9PT0gc3RhclRlbXBsYXRlKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICBpZiAoSVNfVEVNUExBVEUudGVzdChjaGlsZC50YWdOYW1lKSkgeyAvLyA8dGVtcGxhdGU+XG4gICAgICAgICAgICBsZXQgc3RhckNsb25lID0gc3RhclRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICAgICAgaWYgKGRhdGFGb3IgPT09ICcqfCcpXG4gICAgICAgICAgICAgIGNoaWxkLmNvbnRlbnQuaW5zZXJ0QmVmb3JlKHN0YXJDbG9uZSwgY2hpbGQuY29udGVudC5jaGlsZE5vZGVzWzBdIHx8IG51bGwpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjaGlsZC5jb250ZW50LmFwcGVuZENoaWxkKHN0YXJDbG9uZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhclRlbXBsYXRlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3RhclRlbXBsYXRlKTtcblxuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICB9LFxuICAgIH0sXG4gICk7XG5cbiAgcmV0dXJuIHRydWU7XG59KTtcblxucmVnaXN0ZXJSZXF1aXJlSGFuZGxlcigvXFwuanMkL2ksIGFzeW5jIGZ1bmN0aW9uKHsgdXJsLCBvd25lckRvY3VtZW50IH0pIHtcbiAgbGV0IHJlc3VsdCA9IENvbXBvbmVudFV0aWxzLmluc2VydFNjcmlwdEludG9IZWFkKHVybCwgeyBvd25lckRvY3VtZW50IH0pO1xuICBjb25zb2xlLmxvZyh7IHNjcmlwdEVsZW1lbnQ6IHJlc3VsdCB9KTtcbiAgcmV0dXJuIHRydWU7XG59KTtcblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJUmVxdWlyZSBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgc3RhdGljIHJlZ2lzdGVySGFuZGxlciA9IHJlZ2lzdGVyUmVxdWlyZUhhbmRsZXI7XG5cbiAgLyoqXG4gICAqIE9ic2VydmVkIGF0dHJpYnV0ZXMgaW5jbHVkaW5nIGNhY2hlIG1vZGUgY29udHJvbC5cbiAgICovXG4gIHN0YXRpYyBvYnNlcnZlZEF0dHJpYnV0ZXMgPSBbICdzcmMnLCAnY2FjaGUnIF07XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZmV0Y2ggb3B0aW9ucyBpbmNsdWRpbmcgY2FjaGUgbW9kZS5cbiAgICogVGhlIGBjYWNoZWAgYXR0cmlidXRlIGNvbnRyb2xzIEhUVFAgY2FjaGluZyBiZWhhdmlvcjpcbiAgICogLSAnZGVmYXVsdCc6IEJyb3dzZXIgdXNlcyBIVFRQIGNhY2hlIGhlYWRlcnMgKENhY2hlLUNvbnRyb2wsIEVUYWcsIGV0Yy4pXG4gICAqIC0gJ25vLXN0b3JlJzogQnlwYXNzIGNhY2hlIGNvbXBsZXRlbHlcbiAgICogLSAncmVsb2FkJzogRmV0Y2ggZnJlc2ggYnV0IHVwZGF0ZSBjYWNoZVxuICAgKiAtICduby1jYWNoZSc6IEFsd2F5cyByZXZhbGlkYXRlIHdpdGggc2VydmVyXG4gICAqIC0gJ2ZvcmNlLWNhY2hlJzogVXNlIGNhY2hlIGlmIGF2YWlsYWJsZSwgZXZlbiBpZiBzdGFsZVxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSBGZXRjaCBvcHRpb25zIG9iamVjdC5cbiAgICovXG4gIGdldEZldGNoT3B0aW9ucygpIHtcbiAgICBsZXQgY2FjaGVNb2RlID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NhY2hlJyk7XG5cbiAgICBpZiAoY2FjaGVNb2RlICYmIC9eKGRlZmF1bHR8bm8tc3RvcmV8cmVsb2FkfG5vLWNhY2hlfGZvcmNlLWNhY2hlfG9ubHktaWYtY2FjaGVkKSQvLnRlc3QoY2FjaGVNb2RlKSlcbiAgICAgIHJldHVybiB7IGNhY2hlOiBjYWNoZU1vZGUgfTtcblxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGFzeW5jIG1vdW50ZWQoKSB7XG4gICAgc3VwZXIubW91bnRlZCgpO1xuXG4gICAgbGV0IHNyYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgIGxldCB1cmwgICAgICAgICAgID0gQ29tcG9uZW50VXRpbHMucmVzb2x2ZVVSTC5jYWxsKHRoaXMsIG93bmVyRG9jdW1lbnQubG9jYXRpb24sIHNyYywgeyBtYWdpYzogdHJ1ZSB9KTtcbiAgICAgIGxldCBmZXRjaE9wdGlvbnMgID0gdGhpcy5nZXRGZXRjaE9wdGlvbnMoKTtcblxuICAgICAgZm9yIChsZXQgWyBpbmRleCwgaGFuZGxlciBdIG9mIFJFUVVJUkVfSEFORExFUlMuZW50cmllcygpKSB7XG4gICAgICAgIGxldCB7XG4gICAgICAgICAgcGF0dGVybixcbiAgICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgfSA9IGhhbmRsZXI7XG5cbiAgICAgICAgaWYgKHBhdHRlcm4udGVzdCh1cmwpKSB7XG4gICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IGNhbGxiYWNrLmNhbGwodGhpcywgeyBzcmMsIHVybCwgaW5kZXgsIG93bmVyRG9jdW1lbnQsIGZldGNoT3B0aW9ucyB9KTtcbiAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihgXCJteXRoaXgtcmVxdWlyZVwiOiBGYWlsZWQgdG8gbG9hZCBzcGVjaWZpZWQgcmVzb3VyY2U6ICR7c3JjfWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmZXRjaFNyYygpIHtcbiAgICAvLyBOT09QXG4gIH1cbn1cblxuKGdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSkpLk15dGhpeFVJUmVxdWlyZSA9IE15dGhpeFVJUmVxdWlyZTtcblxuaWYgKHR5cGVvZiBjdXN0b21FbGVtZW50cyAhPT0gJ3VuZGVmaW5lZCcgJiYgIWN1c3RvbUVsZW1lbnRzLmdldCgnbXl0aGl4LXJlcXVpcmUnKSlcbiAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdteXRoaXgtcmVxdWlyZScsIE15dGhpeFVJUmVxdWlyZSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzICovXG5cbmltcG9ydCB7IE15dGhpeFVJQ29tcG9uZW50IH0gZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuLypcbk1hbnkgdGhhbmtzIHRvIFNhZ2VlIENvbndheSBmb3IgdGhlIGZvbGxvd2luZyBDU1Mgc3Bpbm5lcnNcbmh0dHBzOi8vY29kZXBlbi5pby9zYWNvbndheS9wZW4vdllLWXlyeFxuKi9cblxuY29uc3QgU1RZTEVfU0hFRVQgPVxuYFxuOmhvc3Qge1xuICAtLW15dGhpeC1zcGlubmVyLXNpemU6IDFlbTtcbiAgd2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuOmhvc3QoLnNtYWxsKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2l6ZTogY2FsYygxZW0gKiAwLjc1KTtcbn1cbjpob3N0KC5tZWRpdW0pIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zaXplOiBjYWxjKDFlbSAqIDEuNSk7XG59XG46aG9zdCgubGFyZ2UpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zaXplOiBjYWxjKDFlbSAqIDMpO1xufVxuLnNwaW5uZXItaXRlbSxcbi5zcGlubmVyLWl0ZW06OmJlZm9yZSxcbi5zcGlubmVyLWl0ZW06OmFmdGVyIHtcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW0ge1xuICB3aWR0aDogMTElO1xuICBoZWlnaHQ6IDYwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItYXVkaW8tYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4wKSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItYXVkaW8tYW5pbWF0aW9uIHtcbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgwLjI1KTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpIC8gMTAgKiAtMyk7XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgLyAxMCAqIC0xKTtcbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDMpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAvIDEwICogLTIpO1xufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoNCkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yNCwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpIC8gMTAgKiAtMSk7XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCg1KSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3I1LCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgLyAxMCAqIC0zKTtcbn1cbjpob3N0KFtraW5kPVwiY2lyY2xlXCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMC4wNzUpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIHRvcDogY2FsYyg1MCUgLSB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpIC8gMik7XG4gIGxlZnQ6IGNhbGMoNTAlIC0gdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKSAvIDIpO1xuICBib3JkZXI6IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpIHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItbGVmdDogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgc29saWQgdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGJvcmRlci1yaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgc29saWQgdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4wKSBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24ge1xuICB0byB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJjaXJjbGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLW9mLXR5cGUoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZTogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDEuMCk7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGJvcmRlci10b3A6IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpICogMC4wNzUpIHNvbGlkIHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjApIGxpbmVhciBpbmZpbml0ZTtcbn1cbjpob3N0KFtraW5kPVwiY2lyY2xlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1vZi10eXBlKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemU6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAwLjcpO1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBib3JkZXItYm90dG9tOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSBzb2xpZCB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMC44NzUpIGxpbmVhciBpbmZpbml0ZTtcbn1cbjpob3N0KFtraW5kPVwiY2lyY2xlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1vZi10eXBlKDMpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemU6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAwLjQpO1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBib3JkZXItdG9wOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSBzb2xpZCB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMC43NSkgbGluZWFyIGluZmluaXRlO1xufVxuOmhvc3QoW2tpbmQ9XCJwdXp6bGVcIl0pIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDAuMSkpIHJvdGF0ZSg0NWRlZyk7XG59XG46aG9zdChba2luZD1cInB1enpsZVwiXSkgLnNwaW5uZXItaXRlbSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpIC8gMi41KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBib3JkZXI6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAwLjEpIHNvbGlkIHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xufVxuOmhvc3QoW2tpbmQ9XCJwdXp6bGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24xIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogNS4wKSBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24xIHtcbiAgMCUsIDguMzMlLCAxNi42NiUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlLCAwJSk7XG4gIH1cbiAgMjQuOTklLCAzMy4zMiUsIDQxLjY1JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwJSwgMCUpO1xuICB9XG4gIDQ5Ljk4JSwgNTguMzElLCA2Ni42NCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCUsIDEwMCUpO1xuICB9XG4gIDc0Ljk3JSwgODMuMzAlLCA5MS42MyUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlLCAxMDAlKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJwdXp6bGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgdG9wOiAwO1xuICBsZWZ0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24yIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogNS4wKSBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24yIHtcbiAgMCUsIDguMzMlLCA5MS42MyUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlLCAwJSk7XG4gIH1cbiAgMTYuNjYlLCAyNC45OSUsIDMzLjMyJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDEwMCUpO1xuICB9XG4gIDQxLjY1JSwgNDkuOTglLCA1OC4zMSUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAxMDAlKTtcbiAgfVxuICA2Ni42NCUsIDc0Ljk3JSwgODMuMzAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgMCUpO1xuICB9XG59XG46aG9zdChba2luZD1cInB1enpsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMykge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICB0b3A6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGxlZnQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjMgY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiA1LjApIGxpbmVhciBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjMge1xuICAwJSwgODMuMzAlLCA5MS42MyUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApO1xuICB9XG4gIDguMzMlLCAxNi42NiUsIDI0Ljk5JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUsIDApO1xuICB9XG4gIDMzLjMyJSwgNDEuNjUlLCA0OS45OCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAtMTAwJSk7XG4gIH1cbiAgNTguMzElLCA2Ni42NCUsIDc0Ljk3JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLTEwMCUpO1xuICB9XG59XG46aG9zdChba2luZD1cIndhdmVcIl0pIC5zcGlubmVyLWl0ZW0ge1xuICAtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZTogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAvIDQpO1xuICBtaW4td2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIHdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyOiBub25lO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci13YXZlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIGVhc2UtaW4tb3V0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci13YXZlLWFuaW1hdGlvbiB7XG4gIDAlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNzUlKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNzUlKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJ3YXZlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gNiAqIC0xKTtcbn1cbjpob3N0KFtraW5kPVwid2F2ZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMikge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDYgKiAtMik7XG59XG46aG9zdChba2luZD1cIndhdmVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDMpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyA2ICogLTMpO1xufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgd2lkdGg6IDExJTtcbiAgaGVpZ2h0OiA0MCU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLXBpcGUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLXBpcGUtYW5pbWF0aW9uIHtcbiAgMjUlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgyKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKDEpO1xuICB9XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMikge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDEwKTtcbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMykge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDEwICogMik7XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDQpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjQsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyAxMCAqIDMpO1xufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCg1KSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3I1LCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gMTAgKiA0KTtcbn1cbjpob3N0KFtraW5kPVwiZG90XCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IGNhbGMoNTAlIC0gdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgLyAyKTtcbiAgbGVmdDogY2FsYyg1MCUgLSB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAvIDIpO1xuICB3aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItZG90LWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDMuMCkgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLWRvdC1hbmltYXRpb24ge1xuICAwJSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjI1KTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG59XG46aG9zdChba2luZD1cImRvdFwiXSkgLnNwaW5uZXItaXRlbTpudGgtb2YtdHlwZSgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG59XG46aG9zdChba2luZD1cImRvdFwiXSkgLnNwaW5uZXItaXRlbTpudGgtb2YtdHlwZSgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDMuMCkgLyAtMik7XG59XG5gO1xuXG5jb25zdCBLSU5EUyA9IHtcbiAgJ2F1ZGlvJzogIDUsXG4gICdjaXJjbGUnOiAzLFxuICAnZG90JzogICAgMixcbiAgJ3BpcGUnOiAgIDUsXG4gICdwdXp6bGUnOiAzLFxuICAnd2F2ZSc6ICAgMyxcbn07XG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSVNwaW5uZXIgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gIHN0YXRpYyB0YWdOYW1lID0gJ215dGhpeC1zcGlubmVyJztcblxuICBzZXQgYXR0ciRraW5kKFsgbmV3VmFsdWUgXSkge1xuICAgIHRoaXMuaGFuZGxlS2luZEF0dHJpYnV0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gIH1cblxuICBtb3VudGVkKCkge1xuICAgIHN1cGVyLm1vdW50ZWQoKTtcblxuICAgIGlmICghdGhpcy5kb2N1bWVudEluaXRpYWxpemVkKSB7XG4gICAgICAvLyBhcHBlbmQgdGVtcGxhdGVcbiAgICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgdGhpcy4kYnVpbGQoKHsgVEVNUExBVEUgfSkgPT4ge1xuICAgICAgICByZXR1cm4gVEVNUExBVEVcbiAgICAgICAgICAuZGF0YUZvcih0aGlzLnNlbnNpdGl2ZVRhZ05hbWUpXG4gICAgICAgICAgLnByb3AkaW5uZXJIVE1MKGA8c3R5bGU+JHtTVFlMRV9TSEVFVH08L3N0eWxlPmApO1xuICAgICAgfSkuYXBwZW5kVG8ob3duZXJEb2N1bWVudC5ib2R5KTtcblxuICAgICAgbGV0IHRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50VGVtcGxhdGUoKTtcbiAgICAgIHRoaXMuYXBwZW5kVGVtcGxhdGVUb1NoYWRvd0RPTSh0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgbGV0IGtpbmQgPSB0aGlzLmdldEF0dHJpYnV0ZSgna2luZCcpO1xuICAgIGlmICgha2luZCkge1xuICAgICAga2luZCA9ICdwaXBlJztcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdraW5kJywga2luZCk7XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVLaW5kQXR0cmlidXRlQ2hhbmdlKGtpbmQpO1xuICB9XG5cbiAgaGFuZGxlS2luZEF0dHJpYnV0ZUNoYW5nZShfa2luZCkge1xuICAgIGxldCBraW5kICAgICAgICA9ICgnJyArIF9raW5kKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKEtJTkRTLCBraW5kKSkge1xuICAgICAgY29uc29sZS53YXJuKGBcIm15dGhpeC1zcGlubmVyXCIgdW5rbm93biBcImtpbmRcIiBwcm92aWRlZDogXCIke2tpbmR9XCIuIFN1cHBvcnRlZCBcImtpbmRcIiBhdHRyaWJ1dGUgdmFsdWVzIGFyZTogXCJwaXBlXCIsIFwiYXVkaW9cIiwgXCJjaXJjbGVcIiwgXCJwdXp6bGVcIiwgXCJ3YXZlXCIsIGFuZCBcImRvdFwiLmApO1xuICAgICAga2luZCA9ICdwaXBlJztcbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZVNwaW5uZXJDaGlsZHJlbihLSU5EU1traW5kXSk7XG4gIH1cblxuICBidWlsZFNwaW5uZXJDaGlsZHJlbihjb3VudCkge1xuICAgIGxldCBjaGlsZHJlbiAgICAgID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICBsZXQgb3duZXJEb2N1bWVudCA9ICh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc3Bpbm5lci1pdGVtJyk7XG5cbiAgICAgIGNoaWxkcmVuW2ldID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3QoY2hpbGRyZW4pO1xuICB9XG5cbiAgY2hhbmdlU3Bpbm5lckNoaWxkcmVuKGNvdW50KSB7XG4gICAgdGhpcy5zZWxlY3QoJy5zcGlubmVyLWl0ZW0nKS5yZW1vdmUoKTtcbiAgICB0aGlzLmJ1aWxkU3Bpbm5lckNoaWxkcmVuKGNvdW50KS5wcmVwZW5kVG8odGhpcy5zaGFkb3cpO1xuXG4gICAgLy8gQWx3YXlzIGFwcGVuZCBzdHlsZSBhZ2Fpbiwgc29cbiAgICAvLyB0aGF0IGl0IGlzIHRoZSBsYXN0IGNoaWxkLCBhbmRcbiAgICAvLyBkb2Vzbid0IG1lc3Mgd2l0aCBcIm50aC1jaGlsZFwiXG4gICAgLy8gc2VsZWN0b3JzXG4gICAgdGhpcy5zZWxlY3QoJ3N0eWxlJykuYXBwZW5kVG8odGhpcy5zaGFkb3cpO1xuICB9XG59XG5cbk15dGhpeFVJU3Bpbm5lci5yZWdpc3RlcigpO1xuXG4oZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KSkuTXl0aGl4VUlSZXF1aXJlID0gTXl0aGl4VUlTcGlubmVyO1xuIiwiaW1wb3J0IHtcbiAgTVlUSElYX1RZUEUsXG4gIFFVRVJZX0VOR0lORV9UWVBFLFxuICBVTkZJTklTSEVEX0RFRklOSVRJT04sXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyAgICAgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBFbGVtZW50cyAgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbmltcG9ydCB7XG4gIEVsZW1lbnREZWZpbml0aW9uLFxufSBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuY29uc3QgSVNfSU5URUdFUiA9IC9eXFxkKyQvO1xuXG5mdW5jdGlvbiBpc0VsZW1lbnQodmFsdWUpIHtcbiAgaWYgKCF2YWx1ZSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gV2UgaGF2ZSBhbiBFbGVtZW50IG9yIGEgRG9jdW1lbnRcbiAgaWYgKHZhbHVlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSB8fCB2YWx1ZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9OT0RFIHx8IHZhbHVlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1Nsb3R0ZWQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdCgnc2xvdCcpO1xufVxuXG5mdW5jdGlvbiBpc05vdFNsb3R0ZWQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuICFlbGVtZW50LmNsb3Nlc3QoJ3Nsb3QnKTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdENsYXNzTmFtZXMoLi4uYXJncykge1xuICBsZXQgY2xhc3NOYW1lcyA9IFtdLmNvbmNhdCguLi5hcmdzKVxuICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAubWFwKChwYXJ0KSA9PiAoJycgKyBwYXJ0KS5zcGxpdCgvXFxzKy8pKVxuICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIHJldHVybiBjbGFzc05hbWVzO1xufVxuXG5leHBvcnQgY2xhc3MgUXVlcnlFbmdpbmUge1xuICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0oaW5zdGFuY2UpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChpbnN0YW5jZSAmJiBpbnN0YW5jZVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGlzRWxlbWVudCAgICA9IGlzRWxlbWVudDtcbiAgc3RhdGljIGlzU2xvdHRlZCAgICA9IGlzU2xvdHRlZDtcbiAgc3RhdGljIGlzTm90U2xvdHRlZCA9IGlzTm90U2xvdHRlZDtcblxuICBzdGF0aWMgZnJvbSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gbmV3IFF1ZXJ5RW5naW5lKFtdLCB7IHJvb3Q6IChpc0VsZW1lbnQodGhpcykpID8gdGhpcyA6IGRvY3VtZW50LCBjb250ZXh0OiB0aGlzIH0pO1xuXG4gICAgY29uc3QgZ2V0T3B0aW9ucyA9ICgpID0+IHtcbiAgICAgIGxldCBiYXNlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIGlmIChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdChhcmdzW2FyZ0luZGV4XSkpXG4gICAgICAgIGJhc2UgPSBPYmplY3QuYXNzaWduKGJhc2UsIGFyZ3NbYXJnSW5kZXgrK10pO1xuXG4gICAgICBpZiAoYXJnc1thcmdJbmRleF0gaW5zdGFuY2VvZiBRdWVyeUVuZ2luZSlcbiAgICAgICAgYmFzZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgYXJnc1thcmdJbmRleF0uZ2V0T3B0aW9ucygpIHx8IHt9LCBiYXNlKTtcblxuICAgICAgcmV0dXJuIGJhc2U7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFJvb3RFbGVtZW50ID0gKG9wdGlvbnNSb290KSA9PiB7XG4gICAgICBpZiAoaXNFbGVtZW50KG9wdGlvbnNSb290KSlcbiAgICAgICAgcmV0dXJuIG9wdGlvbnNSb290O1xuXG4gICAgICBpZiAoaXNFbGVtZW50KHRoaXMpKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgcmV0dXJuICgodGhpcyAmJiB0aGlzLm93bmVyRG9jdW1lbnQpIHx8IGRvY3VtZW50KTtcbiAgICB9O1xuXG4gICAgbGV0IGFyZ0luZGV4ICA9IDA7XG4gICAgbGV0IG9wdGlvbnMgICA9IGdldE9wdGlvbnMoKTtcbiAgICBsZXQgcm9vdCAgICAgID0gZ2V0Um9vdEVsZW1lbnQob3B0aW9ucy5yb290KTtcbiAgICBsZXQgcXVlcnlFbmdpbmU7XG5cbiAgICBvcHRpb25zLnJvb3QgPSByb290O1xuICAgIG9wdGlvbnMuY29udGV4dCA9IG9wdGlvbnMuY29udGV4dCB8fCB0aGlzO1xuXG4gICAgaWYgKGFyZ3NbYXJnSW5kZXhdIGluc3RhbmNlb2YgUXVlcnlFbmdpbmUpXG4gICAgICByZXR1cm4gbmV3IFF1ZXJ5RW5naW5lKGFyZ3NbYXJnSW5kZXhdLnNsaWNlKCksIG9wdGlvbnMpO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJnc1thcmdJbmRleF0pKSB7XG4gICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShhcmdzW2FyZ0luZGV4ICsgMV0sICc6OkZ1bmN0aW9uJykpXG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBhcmdzWzFdO1xuXG4gICAgICBxdWVyeUVuZ2luZSA9IG5ldyBRdWVyeUVuZ2luZShhcmdzW2FyZ0luZGV4XSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbYXJnSW5kZXhdLCAnOjpTdHJpbmcnKSkge1xuICAgICAgb3B0aW9ucy5zZWxlY3RvciA9IGFyZ3NbYXJnSW5kZXgrK107XG5cbiAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbYXJnSW5kZXhdLCAnOjpGdW5jdGlvbicpKVxuICAgICAgICBvcHRpb25zLmNhbGxiYWNrID0gYXJnc1thcmdJbmRleCsrXTtcblxuICAgICAgcXVlcnlFbmdpbmUgPSBuZXcgUXVlcnlFbmdpbmUocm9vdC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuc2VsZWN0b3IpLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKEJhc2VVdGlscy5pc1R5cGUoYXJnc1thcmdJbmRleF0sICc6OkZ1bmN0aW9uJykpIHtcbiAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBhcmdzW2FyZ0luZGV4KytdO1xuXG4gICAgICBsZXQgcmVzdWx0ID0gb3B0aW9ucy5jYWxsYmFjay5jYWxsKHRoaXMsIEVsZW1lbnRzLkVsZW1lbnRHZW5lcmF0b3IsIG9wdGlvbnMpO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3VsdCkpXG4gICAgICAgIHJlc3VsdCA9IFsgcmVzdWx0IF07XG5cbiAgICAgIHF1ZXJ5RW5naW5lID0gbmV3IFF1ZXJ5RW5naW5lKHJlc3VsdCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuaW52b2tlQ2FsbGJhY2tzICE9PSBmYWxzZSAmJiB0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldHVybiBxdWVyeUVuZ2luZS5tYXAob3B0aW9ucy5jYWxsYmFjayk7XG5cbiAgICByZXR1cm4gcXVlcnlFbmdpbmU7XG4gIH07XG5cbiAgZ2V0RW5naW5lQ2xhc3MoKSB7XG4gICAgcmV0dXJuIFF1ZXJ5RW5naW5lO1xuICB9XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudHMsIF9vcHRpb25zKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIFtNWVRISVhfVFlQRV06IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgUVVFUllfRU5HSU5FX1RZUEUsXG4gICAgICB9LFxuICAgICAgJ19teXRoaXhVSU9wdGlvbnMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAgICAgICAgb3B0aW9ucyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAnX215dGhpeFVJRWxlbWVudHMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiAgICAgICAgdGhpcy5maWx0ZXJBbmRDb25zdHJ1Y3RFbGVtZW50cyhvcHRpb25zLmNvbnRleHQsIGVsZW1lbnRzKSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBsZXQgcm9vdFByb3h5ID0gbmV3IFByb3h5KHRoaXMsIHtcbiAgICAgIGdldDogKHRhcmdldCwgcHJvcE5hbWUpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wTmFtZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wTmFtZV07XG4gICAgICAgICAgZWxzZSBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0Ll9teXRoaXhVSUVsZW1lbnRzKVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5fbXl0aGl4VUlFbGVtZW50c1twcm9wTmFtZV07XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdsZW5ndGgnKVxuICAgICAgICAgIHJldHVybiB0YXJnZXQuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ3Byb3RvdHlwZScpXG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5wcm90b3R5cGU7XG5cbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAnY29uc3RydWN0b3InKVxuICAgICAgICAgIHJldHVybiB0YXJnZXQuY29uc3RydWN0b3I7XG5cbiAgICAgICAgLy8gSW5kZXggbG9va3VwXG4gICAgICAgIGlmIChJU19JTlRFR0VSLnRlc3QocHJvcE5hbWUpKVxuICAgICAgICAgIHJldHVybiB0YXJnZXQuX215dGhpeFVJRWxlbWVudHNbcHJvcE5hbWVdO1xuXG4gICAgICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wTmFtZV07XG5cbiAgICAgICAgLy8gUmVkaXJlY3QgYW55IGFycmF5IG1ldGhvZHM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFwibWFnaWNQcm9wTmFtZVwiIGlzIHdoZW4gdGhlXG4gICAgICAgIC8vIGZ1bmN0aW9uIG5hbWUgYmVnaW5zIHdpdGggXCIkXCIsXG4gICAgICAgIC8vIGkuZS4gXCIkZmlsdGVyXCIsIG9yIFwiJG1hcFwiLiBJZlxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBjYXNlLCB0aGVuIHRoZSByZXR1cm5cbiAgICAgICAgLy8gdmFsdWUgd2lsbCBhbHdheXMgYmUgY29lcmNlZCBpbnRvXG4gICAgICAgIC8vIGEgUXVlcnlFbmdpbmUuIE90aGVyd2lzZSwgaXQgd2lsbFxuICAgICAgICAvLyBvbmx5IGJlIGNvZXJjZWQgaW50byBhIFF1ZXJ5RW5naW5lXG4gICAgICAgIC8vIGlmIEVWRVJZIGVsZW1lbnQgaW4gdGhlIHJlc3VsdCBpc1xuICAgICAgICAvLyBhbiBcImVsZW1lbnR5XCIgdHlwZSB2YWx1ZS5cbiAgICAgICAgbGV0IG1hZ2ljUHJvcE5hbWUgPSAocHJvcE5hbWUuY2hhckF0KDApID09PSAnJCcpID8gcHJvcE5hbWUuc3Vic3RyaW5nKDEpIDogcHJvcE5hbWU7XG4gICAgICAgIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlW21hZ2ljUHJvcE5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyYXkgICA9IHRhcmdldC5fbXl0aGl4VUlFbGVtZW50cztcbiAgICAgICAgICAgIGxldCByZXN1bHQgID0gYXJyYXlbbWFnaWNQcm9wTmFtZV0oLi4uYXJncyk7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkgJiYgKG1hZ2ljUHJvcE5hbWUgIT09IHByb3BOYW1lIHx8IHJlc3VsdC5ldmVyeSgoaXRlbSkgPT4gQmFzZVV0aWxzLmlzVHlwZShpdGVtLCBFbGVtZW50RGVmaW5pdGlvbiwgTm9kZSwgUXVlcnlFbmdpbmUpKSkpIHtcbiAgICAgICAgICAgICAgY29uc3QgRW5naW5lQ2xhc3MgPSB0YXJnZXQuZ2V0RW5naW5lQ2xhc3MoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFbmdpbmVDbGFzcyhyZXN1bHQsIHRhcmdldC5nZXRPcHRpb25zKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcm9vdFByb3h5O1xuICB9XG5cbiAgZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fbXl0aGl4VUlPcHRpb25zO1xuICB9XG5cbiAgZ2V0Q29udGV4dCgpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgIHJldHVybiBvcHRpb25zLmNvbnRleHQ7XG4gIH1cblxuICBnZXRSb290KCkge1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMucm9vdCB8fCBkb2N1bWVudDtcbiAgfVxuXG4gIGdldFVuZGVybHlpbmdBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbXl0aGl4VUlFbGVtZW50cztcbiAgfVxuXG4gIGdldE93bmVyRG9jdW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Um9vdCgpLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIH1cblxuICBmaWx0ZXJBbmRDb25zdHJ1Y3RFbGVtZW50cyhjb250ZXh0LCBlbGVtZW50cykge1xuICAgIGxldCBmaW5hbEVsZW1lbnRzID0gQXJyYXkuZnJvbShlbGVtZW50cykuZmxhdChJbmZpbml0eSkubWFwKChfaXRlbSkgPT4ge1xuICAgICAgaWYgKCFfaXRlbSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQgaXRlbSA9IF9pdGVtO1xuICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBRdWVyeUVuZ2luZSlcbiAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0VW5kZXJseWluZ0FycmF5KCk7XG5cbiAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKGl0ZW0sIE5vZGUpKVxuICAgICAgICByZXR1cm4gaXRlbTtcblxuICAgICAgaWYgKGl0ZW1bVU5GSU5JU0hFRF9ERUZJTklUSU9OXSlcbiAgICAgICAgaXRlbSA9IGl0ZW0oKTtcblxuICAgICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoaXRlbSwgJzo6U3RyaW5nJykpXG4gICAgICAgIGl0ZW0gPSBFbGVtZW50cy5UZXJtKGl0ZW0pO1xuICAgICAgZWxzZSBpZiAoIUJhc2VVdGlscy5pc1R5cGUoaXRlbSwgRWxlbWVudERlZmluaXRpb24pKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGlmICghY29udGV4dClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJjb250ZXh0XCIgb3B0aW9uIGZvciBRdWVyeUVuZ2luZSBpcyByZXF1aXJlZCB3aGVuIGNvbnN0cnVjdGluZyBlbGVtZW50cy4nKTtcblxuICAgICAgcmV0dXJuIGl0ZW0uYnVpbGQodGhpcy5nZXRPd25lckRvY3VtZW50KCksIHtcbiAgICAgICAgc2NvcGU6IFV0aWxzLmNyZWF0ZVNjb3BlKGNvbnRleHQpLFxuICAgICAgfSk7XG4gICAgfSkuZmxhdChJbmZpbml0eSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChmaW5hbEVsZW1lbnRzKSk7XG4gIH1cblxuICBzZWxlY3QoLi4uYXJncykge1xuICAgIGxldCBhcmdJbmRleCAgPSAwO1xuICAgIGxldCBvcHRpb25zICAgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIHRoaXMuZ2V0T3B0aW9ucygpLCAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoYXJnc1thcmdJbmRleF0pKSA/IGFyZ3NbYXJnSW5kZXgrK10gOiB7fSk7XG5cbiAgICBpZiAob3B0aW9ucy5jb250ZXh0ICYmIHR5cGVvZiBvcHRpb25zLmNvbnRleHQuJCA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldHVybiBvcHRpb25zLmNvbnRleHQuJC5jYWxsKG9wdGlvbnMuY29udGV4dCwgb3B0aW9ucywgLi4uYXJncy5zbGljZShhcmdJbmRleCkpO1xuXG4gICAgY29uc3QgRW5naW5lQ2xhc3MgPSB0aGlzLmdldEVuZ2luZUNsYXNzKCk7XG4gICAgcmV0dXJuIEVuZ2luZUNsYXNzLmZyb20uY2FsbChvcHRpb25zLmNvbnRleHQgfHwgdGhpcywgb3B0aW9ucywgLi4uYXJncy5zbGljZShhcmdJbmRleCkpO1xuICB9XG5cbiAgKmVudHJpZXMoKSB7XG4gICAgbGV0IGVsZW1lbnRzID0gdGhpcy5fbXl0aGl4VUlFbGVtZW50cztcblxuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICB5aWVsZChbaSwgZWxlbWVudF0pO1xuICAgIH1cbiAgfVxuXG4gICprZXlzKCkge1xuICAgIGZvciAobGV0IFsga2V5LCBfIF0gb2YgdGhpcy5lbnRyaWVzKCkpXG4gICAgICB5aWVsZCBrZXk7XG4gIH1cblxuICAqdmFsdWVzKCkge1xuICAgIGZvciAobGV0IFsgXywgdmFsdWUgXSBvZiB0aGlzLmVudHJpZXMoKSlcbiAgICAgIHlpZWxkIHZhbHVlO1xuICB9XG5cbiAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xuICAgIHJldHVybiB5aWVsZCAqdGhpcy52YWx1ZXMoKTtcbiAgfVxuXG4gIGZpcnN0KGNvdW50KSB7XG4gICAgaWYgKGNvdW50ID09IG51bGwgfHwgY291bnQgPT09IDAgfHwgT2JqZWN0LmlzKGNvdW50LCBOYU4pIHx8ICFCYXNlVXRpbHMuaXNUeXBlKGNvdW50LCAnOjpOdW1iZXInKSlcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdChbIHRoaXMuX215dGhpeFVJRWxlbWVudHNbMF0gXSk7XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3QodGhpcy5fbXl0aGl4VUlFbGVtZW50cy5zbGljZShNYXRoLmFicyhjb3VudCkpKTtcbiAgfVxuXG4gIGxhc3QoY291bnQpIHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCB8fCBjb3VudCA9PT0gMCB8fCBPYmplY3QuaXMoY291bnQsIE5hTikgfHwgIUJhc2VVdGlscy5pc1R5cGUoY291bnQsICc6Ok51bWJlcicpKVxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KFsgdGhpcy5fbXl0aGl4VUlFbGVtZW50c1t0aGlzLl9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aCAtIDFdIF0pO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KHRoaXMuX215dGhpeFVJRWxlbWVudHMuc2xpY2UoTWF0aC5hYnMoY291bnQpICogLTEpKTtcbiAgfVxuXG4gIGFkZCguLi5lbGVtZW50cykge1xuICAgIGNvbnN0IEVuZ2luZUNsYXNzID0gdGhpcy5nZXRFbmdpbmVDbGFzcygpO1xuICAgIHJldHVybiBuZXcgRW5naW5lQ2xhc3ModGhpcy5zbGljZSgpLmNvbmNhdCguLi5lbGVtZW50cyksIHRoaXMuZ2V0T3B0aW9ucygpKTtcbiAgfVxuXG4gIHN1YnRyYWN0KC4uLmVsZW1lbnRzKSB7XG4gICAgbGV0IHNldCA9IG5ldyBTZXQoZWxlbWVudHMpO1xuXG4gICAgY29uc3QgRW5naW5lQ2xhc3MgPSB0aGlzLmdldEVuZ2luZUNsYXNzKCk7XG4gICAgcmV0dXJuIG5ldyBFbmdpbmVDbGFzcyh0aGlzLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuICFzZXQuaGFzKGl0ZW0pO1xuICAgIH0pLCB0aGlzLmdldE9wdGlvbnMoKSk7XG4gIH1cblxuICBvbihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy52YWx1ZXMoKSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdmFsdWUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9mZihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdGhpcy52YWx1ZXMoKSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdmFsdWUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFwcGVuZFRvKHNlbGVjdG9yT3JFbGVtZW50KSB7XG4gICAgaWYgKCF0aGlzLl9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgbGV0IGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShzZWxlY3Rvck9yRWxlbWVudCwgJzo6U3RyaW5nJykpXG4gICAgICBlbGVtZW50ID0gdGhpcy5nZXRSb290KCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk7XG5cbiAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzKVxuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIH1cblxuICBwcmVwZW5kVG8oc2VsZWN0b3JPckVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBsZXQgZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNlbGVjdG9yT3JFbGVtZW50LCAnOjpTdHJpbmcnKSlcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmdldFJvb3QoKS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTtcblxuICAgIGxldCBmaXJzdENoaWxkID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdIHx8IG51bGw7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5fbXl0aGl4VUlFbGVtZW50cylcbiAgICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBmaXJzdENoaWxkKTtcbiAgfVxuXG4gIGluc2VydEludG8oc2VsZWN0b3JPckVsZW1lbnQsIHJlZmVyZW5jZU5vZGUpIHtcbiAgICBpZiAoIXRoaXMuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBsZXQgZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNlbGVjdG9yT3JFbGVtZW50LCAnOjpTdHJpbmcnKSlcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmdldFJvb3QoKS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTtcblxuICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5nZXRPd25lckRvY3VtZW50KCk7XG4gICAgbGV0IHNvdXJjZSAgICAgICAgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgbGV0IGZyYWdtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzKVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG5cbiAgICAgIHNvdXJjZSA9IFsgZnJhZ21lbnQgXTtcbiAgICB9XG5cbiAgICBlbGVtZW50Lmluc2VydChzb3VyY2VbMF0sIHJlZmVyZW5jZU5vZGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXBsYWNlQ2hpbGRyZW5PZihzZWxlY3Rvck9yRWxlbWVudCkge1xuICAgIGxldCBlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoc2VsZWN0b3JPckVsZW1lbnQsICc6OlN0cmluZycpKVxuICAgICAgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdCgpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG5cbiAgICByZXR1cm4gdGhpcy5hcHBlbmRUbyhlbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMuX215dGhpeFVJRWxlbWVudHMpIHtcbiAgICAgIGlmIChub2RlICYmIG5vZGUucGFyZW50Tm9kZSlcbiAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY2xhc3NMaXN0KG9wZXJhdGlvbiwgLi4uYXJncykge1xuICAgIGxldCBjbGFzc05hbWVzID0gY29sbGVjdENsYXNzTmFtZXMoYXJncyk7XG4gICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzKSB7XG4gICAgICBpZiAobm9kZSAmJiBub2RlLmNsYXNzTGlzdCkge1xuICAgICAgICBpZiAob3BlcmF0aW9uID09PSAndG9nZ2xlJylcbiAgICAgICAgICBjbGFzc05hbWVzLmZvckVhY2goKGNsYXNzTmFtZSkgPT4gbm9kZS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbm9kZS5jbGFzc0xpc3Rbb3BlcmF0aW9uXSguLi5jbGFzc05hbWVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFkZENsYXNzKC4uLmNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QoJ2FkZCcsIC4uLmNsYXNzTmFtZXMpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoLi4uY2xhc3NOYW1lcykge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdCgncmVtb3ZlJywgLi4uY2xhc3NOYW1lcyk7XG4gIH1cblxuICB0b2dnbGVDbGFzcyguLi5jbGFzc05hbWVzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0KCd0b2dnbGUnLCAuLi5jbGFzc05hbWVzKTtcbiAgfVxuXG4gIHNsb3R0ZWQoeWVzTm8pIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgeWVzTm8pID8gaXNTbG90dGVkIDogaXNOb3RTbG90dGVkKTtcbiAgfVxuXG4gIHNsb3Qoc2xvdE5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuc2xvdCA9PT0gc2xvdE5hbWUpXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBpZiAoZWxlbWVudC5jbG9zZXN0KGBzbG90W25hbWU9XCIke3Nsb3ROYW1lLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKX1cIl1gKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuXG4oZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KSkuUXVlcnlFbmdpbmUgPSBRdWVyeUVuZ2luZTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW1hZ2ljLW51bWJlcnMgKi9cblxuLypcbk1hbnkgdGhhbmtzIHRvIEdlcmFpbnQgTHVmZiBmb3IgdGhlIGZvbGxvd2luZ1xuXG5odHRwczovL2dpdGh1Yi5jb20vZ2VyYWludGx1ZmYvc2hhMjU2L1xuKi9cblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogU0hBMjU2XG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBTSEEyNTYgaGFzaGluZyBmdW5jdGlvblxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IGlucHV0XG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IElucHV0IHN0cmluZ1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IFRoZSBTSEEyNTYgaGFzaCBvZiB0aGUgcHJvdmlkZWQgYGlucHV0YC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogVGhpcyBpcyBhIGN1c3RvbSBiYWtlZCBTSEEyNTYgaGFzaGluZyBmdW5jdGlvbiwgbWluaW1pemVkIGZvciBzaXplLlxuICogICAgIEl0IG1heSBiZSBpbmNvbXBsZXRlLCBhbmQgaXQgaXMgc3Ryb25nbHkgcmVjb21tZW5kZWQgdGhhdCB5b3UgKipETyBOT1QqKiB1c2UgdGhpc1xuICogICAgIGZvciBhbnl0aGluZyByZWxhdGVkIHRvIHNlY3VyaXR5LlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogUmVhZCBhbGwgdGhlIG5vdGVzLCBhbmQgdXNlIHRoaXMgbWV0aG9kIHdpdGggY2F1dGlvbi5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgbWV0aG9kIGhhcyBiZWVuIG1vZGlmaWVkIHNsaWdodGx5IGZyb20gdGhlIG9yaWdpbmFsIHRvICpub3QqIGJhaWwgd2hlblxuICogICAgIHVuaWNvZGUgY2hhcmFjdGVycyBhcmUgZGV0ZWN0ZWQuIFRoZXJlIGlzIGEgZGVjZW50IGNoYW5jZSB0aGF0LS1naXZlbiBjZXJ0YWluXG4gKiAgICAgaW5wdXQtLXRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIGludmFsaWQgU0hBMjU2IGhhc2guXCJcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IE15dGhpeCBVSSB1c2VzIHRoaXMgbWV0aG9kIHNpbXBseSB0byBnZW5lcmF0ZSBjb25zaXN0ZW50IElEcy5cbiAqICAgLSB8XG4gKiAgICAgOmhlYXJ0OiBNYW55IHRoYW5rcyB0byB0aGUgYXV0aG9yIFtHZXJhaW50IEx1ZmZdKGh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi9zaGEyNTYvKVxuICogICAgIGZvciB0aGlzIG1ldGhvZCFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFNIQTI1NihfaW5wdXQpIHtcbiAgbGV0IGlucHV0ID0gX2lucHV0O1xuXG4gIGxldCBtYXRoUG93ID0gTWF0aC5wb3c7XG4gIGxldCBtYXhXb3JkID0gbWF0aFBvdygyLCAzMik7XG4gIGxldCBsZW5ndGhQcm9wZXJ0eSA9ICdsZW5ndGgnO1xuICBsZXQgaTsgbGV0IGo7IC8vIFVzZWQgYXMgYSBjb3VudGVyIGFjcm9zcyB0aGUgd2hvbGUgZmlsZVxuICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgbGV0IHdvcmRzID0gW107XG4gIGxldCBhc2NpaUJpdExlbmd0aCA9IGlucHV0W2xlbmd0aFByb3BlcnR5XSAqIDg7XG5cbiAgLy8qIGNhY2hpbmcgcmVzdWx0cyBpcyBvcHRpb25hbCAtIHJlbW92ZS9hZGQgc2xhc2ggZnJvbSBmcm9udCBvZiB0aGlzIGxpbmUgdG8gdG9nZ2xlXG4gIC8vIEluaXRpYWwgaGFzaCB2YWx1ZTogZmlyc3QgMzIgYml0cyBvZiB0aGUgZnJhY3Rpb25hbCBwYXJ0cyBvZiB0aGUgc3F1YXJlIHJvb3RzIG9mIHRoZSBmaXJzdCA4IHByaW1lc1xuICAvLyAod2UgYWN0dWFsbHkgY2FsY3VsYXRlIHRoZSBmaXJzdCA2NCwgYnV0IGV4dHJhIHZhbHVlcyBhcmUganVzdCBpZ25vcmVkKVxuICBsZXQgaGFzaCA9IFNIQTI1Ni5oID0gU0hBMjU2LmggfHwgW107XG4gIC8vIFJvdW5kIGNvbnN0YW50czogZmlyc3QgMzIgYml0cyBvZiB0aGUgZnJhY3Rpb25hbCBwYXJ0cyBvZiB0aGUgY3ViZSByb290cyBvZiB0aGUgZmlyc3QgNjQgcHJpbWVzXG4gIGxldCBrID0gU0hBMjU2LmsgPSBTSEEyNTYuayB8fCBbXTtcbiAgbGV0IHByaW1lQ291bnRlciA9IGtbbGVuZ3RoUHJvcGVydHldO1xuICAvKi9cbiAgICBsZXQgaGFzaCA9IFtdLCBrID0gW107XG4gICAgbGV0IHByaW1lQ291bnRlciA9IDA7XG4gICAgLy8qL1xuXG4gIGxldCBpc0NvbXBvc2l0ZSA9IHt9O1xuICBmb3IgKGxldCBjYW5kaWRhdGUgPSAyOyBwcmltZUNvdW50ZXIgPCA2NDsgY2FuZGlkYXRlKyspIHtcbiAgICBpZiAoIWlzQ29tcG9zaXRlW2NhbmRpZGF0ZV0pIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCAzMTM7IGkgKz0gY2FuZGlkYXRlKVxuICAgICAgICBpc0NvbXBvc2l0ZVtpXSA9IGNhbmRpZGF0ZTtcblxuICAgICAgaGFzaFtwcmltZUNvdW50ZXJdID0gKG1hdGhQb3coY2FuZGlkYXRlLCAwLjUpICogbWF4V29yZCkgfCAwO1xuICAgICAga1twcmltZUNvdW50ZXIrK10gPSAobWF0aFBvdyhjYW5kaWRhdGUsIDEgLyAzKSAqIG1heFdvcmQpIHwgMDtcbiAgICB9XG4gIH1cblxuICBpbnB1dCArPSAnXFx4ODAnOyAvLyBBcHBlbmQgxocnIGJpdCAocGx1cyB6ZXJvIHBhZGRpbmcpXG4gIHdoaWxlIChpbnB1dFtsZW5ndGhQcm9wZXJ0eV0gJSA2NCAtIDU2KVxuICAgIGlucHV0ICs9ICdcXHgwMCc7IC8vIE1vcmUgemVybyBwYWRkaW5nXG5cbiAgZm9yIChpID0gMDsgaSA8IGlucHV0W2xlbmd0aFByb3BlcnR5XTsgaSsrKSB7XG4gICAgaiA9IGlucHV0LmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGogPj4gOClcbiAgICAgIHJldHVybjsgLy8gQVNDSUkgY2hlY2s6IG9ubHkgYWNjZXB0IGNoYXJhY3RlcnMgaW4gcmFuZ2UgMC0yNTVcbiAgICB3b3Jkc1tpID4+IDJdIHw9IGogPDwgKCgzIC0gaSkgJSA0KSAqIDg7XG4gIH1cblxuICB3b3Jkc1t3b3Jkc1tsZW5ndGhQcm9wZXJ0eV1dID0gKChhc2NpaUJpdExlbmd0aCAvIG1heFdvcmQpIHwgMCk7XG4gIHdvcmRzW3dvcmRzW2xlbmd0aFByb3BlcnR5XV0gPSAoYXNjaWlCaXRMZW5ndGgpO1xuXG4gIC8vIHByb2Nlc3MgZWFjaCBjaHVua1xuICBmb3IgKGogPSAwOyBqIDwgd29yZHNbbGVuZ3RoUHJvcGVydHldOykge1xuICAgIGxldCB3ID0gd29yZHMuc2xpY2UoaiwgaiArPSAxNik7IC8vIFRoZSBtZXNzYWdlIGlzIGV4cGFuZGVkIGludG8gNjQgd29yZHMgYXMgcGFydCBvZiB0aGUgaXRlcmF0aW9uXG4gICAgbGV0IG9sZEhhc2ggPSBoYXNoO1xuXG4gICAgLy8gVGhpcyBpcyBub3cgdGhlIHVuZGVmaW5lZHdvcmtpbmcgaGFzaFwiLCBvZnRlbiBsYWJlbGxlZCBhcyB2YXJpYWJsZXMgYS4uLmdcbiAgICAvLyAod2UgaGF2ZSB0byB0cnVuY2F0ZSBhcyB3ZWxsLCBvdGhlcndpc2UgZXh0cmEgZW50cmllcyBhdCB0aGUgZW5kIGFjY3VtdWxhdGVcbiAgICBoYXNoID0gaGFzaC5zbGljZSgwLCA4KTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG4gICAgICAvLyBFeHBhbmQgdGhlIG1lc3NhZ2UgaW50byA2NCB3b3Jkc1xuICAgICAgLy8gVXNlZCBiZWxvdyBpZlxuICAgICAgbGV0IHcxNSA9IHdbaSAtIDE1XTsgbGV0IHcyID0gd1tpIC0gMl07XG5cbiAgICAgIC8vIEl0ZXJhdGVcbiAgICAgIGxldCBhID0gaGFzaFswXTsgbGV0IGUgPSBoYXNoWzRdO1xuICAgICAgbGV0IHRlbXAxID0gaGFzaFs3XVxuICAgICAgICAgICAgICAgICsgKCgoZSA+Pj4gNikgfCAoZSA8PCAyNikpIF4gKChlID4+PiAxMSkgfCAoZSA8PCAyMSkpIF4gKChlID4+PiAyNSkgfCAoZSA8PCA3KSkpIC8vIFMxXG4gICAgICAgICAgICAgICAgKyAoKGUgJiBoYXNoWzVdKSBeICgofmUpICYgaGFzaFs2XSkpIC8vIGNoXG4gICAgICAgICAgICAgICAgKyBrW2ldXG4gICAgICAgICAgICAgICAgLy8gRXhwYW5kIHRoZSBtZXNzYWdlIHNjaGVkdWxlIGlmIG5lZWRlZFxuICAgICAgICAgICAgICAgICsgKHdbaV0gPSAoaSA8IDE2KSA/IHdbaV0gOiAoXG4gICAgICAgICAgICAgICAgICB3W2kgLSAxNl1cbiAgICAgICAgICAgICAgICAgICAgICAgICsgKCgodzE1ID4+PiA3KSB8ICh3MTUgPDwgMjUpKSBeICgodzE1ID4+PiAxOCkgfCAodzE1IDw8IDE0KSkgXiAodzE1ID4+PiAzKSkgLy8gczBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgd1tpIC0gN11cbiAgICAgICAgICAgICAgICAgICAgICAgICsgKCgodzIgPj4+IDE3KSB8ICh3MiA8PCAxNSkpIF4gKCh3MiA+Pj4gMTkpIHwgKHcyIDw8IDEzKSkgXiAodzIgPj4+IDEwKSkgLy8gczFcbiAgICAgICAgICAgICAgICApIHwgMFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAvLyBUaGlzIGlzIG9ubHkgdXNlZCBvbmNlLCBzbyAqY291bGQqIGJlIG1vdmVkIGJlbG93LCBidXQgaXQgb25seSBzYXZlcyA0IGJ5dGVzIGFuZCBtYWtlcyB0aGluZ3MgdW5yZWFkYmxlXG4gICAgICBsZXQgdGVtcDIgPSAoKChhID4+PiAyKSB8IChhIDw8IDMwKSkgXiAoKGEgPj4+IDEzKSB8IChhIDw8IDE5KSkgXiAoKGEgPj4+IDIyKSB8IChhIDw8IDEwKSkpIC8vIFMwXG4gICAgICAgICAgICAgICAgKyAoKGEgJiBoYXNoWzFdKSBeIChhICYgaGFzaFsyXSkgXiAoaGFzaFsxXSAmIGhhc2hbMl0pKTsgLy8gbWFqXG5cbiAgICAgIGhhc2ggPSBbKHRlbXAxICsgdGVtcDIpIHwgMF0uY29uY2F0KGhhc2gpOyAvLyBXZSBkb24ndCBib3RoZXIgdHJpbW1pbmcgb2ZmIHRoZSBleHRyYSBvbmVzLCB0aGV5J3JlIGhhcm1sZXNzIGFzIGxvbmcgYXMgd2UncmUgdHJ1bmNhdGluZyB3aGVuIHdlIGRvIHRoZSBzbGljZSgpXG4gICAgICBoYXNoWzRdID0gKGhhc2hbNF0gKyB0ZW1wMSkgfCAwO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCA4OyBpKyspXG4gICAgICBoYXNoW2ldID0gKGhhc2hbaV0gKyBvbGRIYXNoW2ldKSB8IDA7XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgZm9yIChqID0gMzsgaiArIDE7IGotLSkge1xuICAgICAgbGV0IGIgPSAoaGFzaFtpXSA+PiAoaiAqIDgpKSAmIDI1NTtcbiAgICAgIHJlc3VsdCArPSAoKGIgPCAxNikgPyAwIDogJycpICsgYi50b1N0cmluZygxNik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBTdHlsZVNoZWV0TWFuYWdlciB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgVXRpbGl0eSBmb3IgbWFuYWdpbmcgQ29uc3RydWN0YWJsZSBTdHlsZXNoZWV0cyBhY3Jvc3MgY29tcG9uZW50cy5cbiAqICAgUHJvdmlkZXMgZWZmaWNpZW50IHN0eWxlIHNoYXJpbmcgdGhyb3VnaCB0aGUgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgQVBJLFxuICogICB3aXRoIGF1dG9tYXRpYyBmYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnMuXG4gKlxuICogICBCcm93c2VyIFN1cHBvcnQgKEJhc2VsaW5lIHNpbmNlIE1hcmNoIDIwMjMpOlxuICogICAtIENocm9tZSA3MyssIEZpcmVmb3ggMTAxKywgU2FmYXJpIDE2LjQrLCBFZGdlIDc5K1xuICpcbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgU3R5bGVTaGVldE1hbmFnZXIgfSBmcm9tICdteXRoaXgtdWktY29yZSc7XG4gKlxuICogICAgIC8vIFJlZ2lzdGVyIGEgc2hhcmVkIHN0eWxlc2hlZXRcbiAqICAgICBTdHlsZVNoZWV0TWFuYWdlci5yZWdpc3RlcigndGhlbWUnLCBgXG4gKiAgICAgICA6aG9zdCB7XG4gKiAgICAgICAgIC0tcHJpbWFyeS1jb2xvcjogYmx1ZTtcbiAqICAgICAgICAgLS1zZWNvbmRhcnktY29sb3I6IGdyZWVuO1xuICogICAgICAgfVxuICogICAgIGApO1xuICpcbiAqICAgICAvLyBBZG9wdCBpbiBhIHNoYWRvdyByb290XG4gKiAgICAgU3R5bGVTaGVldE1hbmFnZXIuYWRvcHQodGhpcy5zaGFkb3dSb290LCBbJ3RoZW1lJ10pO1xuICogICAgIGBgYFxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgLy8gSW4gYSBjb21wb25lbnRcbiAqICAgICBjbGFzcyBNeUNvbXBvbmVudCBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAqICAgICAgIHN0YXRpYyBzaGFyZWRTdHlsZXMgPSBbJ3RoZW1lJywgJ3R5cG9ncmFwaHknXTtcbiAqXG4gKiAgICAgICBjcmVhdGVTaGFkb3dET00oKSB7XG4gKiAgICAgICAgIGxldCBzaGFkb3cgPSBzdXBlci5jcmVhdGVTaGFkb3dET00oKTtcbiAqICAgICAgICAgLy8gc2hhcmVkU3R5bGVzIGFyZSBhdXRvbWF0aWNhbGx5IGFkb3B0ZWRcbiAqICAgICAgICAgcmV0dXJuIHNoYWRvdztcbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgICAgYGBgXG4gKi9cblxuLy8gQ2FjaGUgZm9yIGNvbnN0cnVjdGVkIHN0eWxlc2hlZXRzIGJ5IG5hbWVcbmNvbnN0IFNUWUxFU0hFRVRfQ0FDSEUgPSBuZXcgTWFwKCk7XG5cbi8vIENhY2hlIGZvciBzdHlsZXNoZWV0cyBieSBjb250ZW50IGhhc2ggKGZvciBkZWR1cGxpY2F0aW9uKVxuY29uc3QgQ09OVEVOVF9IQVNIX0NBQ0hFID0gbmV3IE1hcCgpO1xuXG4vLyBDaGVjayBpZiBDb25zdHJ1Y3RhYmxlIFN0eWxlc2hlZXRzIGFyZSBzdXBwb3J0ZWRcbmNvbnN0IHN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzID0gKCgpID0+IHtcbiAgdHJ5IHtcbiAgICBuZXcgQ1NTU3R5bGVTaGVldCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSkoKTtcblxuLyoqXG4gKiBTaW1wbGUgaGFzaCBmdW5jdGlvbiBmb3Igc3R5bGVzaGVldCBjb250ZW50IGRlZHVwbGljYXRpb24uXG4gKi9cbmNvbnN0IGhhc2hDb250ZW50ID0gKGNvbnRlbnQpID0+IHtcbiAgbGV0IGhhc2ggPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2hhciA9IGNvbnRlbnQuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBjaGFyO1xuICAgIGhhc2ggPSBoYXNoICYgaGFzaDsgLy8gQ29udmVydCB0byAzMi1iaXQgaW50ZWdlclxuICB9XG4gIHJldHVybiBoYXNoLnRvU3RyaW5nKDE2KTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGlzU3VwcG9ydGVkXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIENoZWNrIGlmIENvbnN0cnVjdGFibGUgU3R5bGVzaGVldHMgYXJlIHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuOyBUcnVlIGlmIHN1cHBvcnRlZC5cbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIENvbnN0cnVjdGFibGUgU3R5bGVzaGVldHMgYXJlIHN1cHBvcnRlZCBpbiB0aGUgY3VycmVudCBicm93c2VyLlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgQ29uc3RydWN0YWJsZSBTdHlsZXNoZWV0cyBhcmUgc3VwcG9ydGVkLlxuICovXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWQgPSAoKSA9PiBzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cztcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogcmVnaXN0ZXJcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgUmVnaXN0ZXIgYSBzdHlsZXNoZWV0IGJ5IG5hbWUgZm9yIGxhdGVyIGFkb3B0aW9uLlxuICogICBJZiB0aGUgc2FtZSBjb250ZW50IGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCB1bmRlciBhIGRpZmZlcmVudCBuYW1lLFxuICogICB0aGUgc2FtZSBDU1NTdHlsZVNoZWV0IGluc3RhbmNlIHdpbGwgYmUgcmV1c2VkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG5hbWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIHVuaXF1ZSBuYW1lIGZvciB0aGlzIHN0eWxlc2hlZXQuXG4gKiAgIC0gbmFtZTogY3NzVGV4dFxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgQ1NTIGNvbnRlbnQgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiAgIC0gbmFtZTogb3B0aW9uc1xuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIE9wdGlvbnMgZm9yIHJlZ2lzdHJhdGlvbi5cbiAqICAgICAgIC0gYHJlcGxhY2VgOiBJZiB0cnVlLCByZXBsYWNlcyBleGlzdGluZyByZWdpc3RyYXRpb24gKGRlZmF1bHQ6IGZhbHNlKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQ1NTU3R5bGVTaGVldCB8IG51bGw7IFRoZSBjb25zdHJ1Y3RlZCBzdHlsZXNoZWV0LCBvciBudWxsIGlmIG5vdCBzdXBwb3J0ZWQuXG4gKlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBTdHlsZVNoZWV0TWFuYWdlci5yZWdpc3RlcigndGhlbWUnLCBgXG4gKiAgICAgICA6aG9zdCB7XG4gKiAgICAgICAgIC0tcHJpbWFyeS1jb2xvcjogIzAwN2JmZjtcbiAqICAgICAgIH1cbiAqICAgICBgKTtcbiAqICAgICBgYGBcbiAqL1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgc3R5bGVzaGVldCBieSBuYW1lIGZvciBsYXRlciBhZG9wdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIHVuaXF1ZSBuYW1lIGZvciB0aGlzIHN0eWxlc2hlZXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzVGV4dCAtIFRoZSBDU1MgY29udGVudCBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBPcHRpb25zIGZvciByZWdpc3RyYXRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnJlcGxhY2U9ZmFsc2VdIC0gSWYgdHJ1ZSwgcmVwbGFjZXMgZXhpc3RpbmcgcmVnaXN0cmF0aW9uLlxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR8bnVsbH0gVGhlIGNvbnN0cnVjdGVkIHN0eWxlc2hlZXQsIG9yIG51bGwgaWYgbm90IHN1cHBvcnRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKG5hbWUsIGNzc1RleHQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoIXN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIENoZWNrIGlmIGFscmVhZHkgcmVnaXN0ZXJlZCAoYW5kIG5vdCByZXBsYWNpbmcpXG4gIGlmIChTVFlMRVNIRUVUX0NBQ0hFLmhhcyhuYW1lKSAmJiAhb3B0aW9ucy5yZXBsYWNlKVxuICAgIHJldHVybiBTVFlMRVNIRUVUX0NBQ0hFLmdldChuYW1lKTtcblxuICAvLyBDaGVjayBmb3IgY29udGVudCBkZWR1cGxpY2F0aW9uXG4gIGxldCBjb250ZW50SGFzaCA9IGhhc2hDb250ZW50KGNzc1RleHQpO1xuICBsZXQgZXhpc3RpbmdTaGVldCA9IENPTlRFTlRfSEFTSF9DQUNIRS5nZXQoY29udGVudEhhc2gpO1xuXG4gIGlmIChleGlzdGluZ1NoZWV0KSB7XG4gICAgU1RZTEVTSEVFVF9DQUNIRS5zZXQobmFtZSwgZXhpc3RpbmdTaGVldCk7XG4gICAgcmV0dXJuIGV4aXN0aW5nU2hlZXQ7XG4gIH1cblxuICAvLyBDcmVhdGUgbmV3IHN0eWxlc2hlZXRcbiAgbGV0IHNoZWV0ID0gbmV3IENTU1N0eWxlU2hlZXQoKTtcbiAgc2hlZXQucmVwbGFjZVN5bmMoY3NzVGV4dCk7XG5cbiAgU1RZTEVTSEVFVF9DQUNIRS5zZXQobmFtZSwgc2hlZXQpO1xuICBDT05URU5UX0hBU0hfQ0FDSEUuc2V0KGNvbnRlbnRIYXNoLCBzaGVldCk7XG5cbiAgcmV0dXJuIHNoZWV0O1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZ2V0XG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIEdldCBhIHJlZ2lzdGVyZWQgc3R5bGVzaGVldCBieSBuYW1lLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG5hbWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIENTU1N0eWxlU2hlZXQgfCB1bmRlZmluZWQ7IFRoZSBzdHlsZXNoZWV0LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5cbi8qKlxuICogR2V0IGEgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0IGJ5IG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR8dW5kZWZpbmVkfSBUaGUgc3R5bGVzaGVldCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldCA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBTVFlMRVNIRUVUX0NBQ0hFLmdldChuYW1lKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGhhc1xuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBDaGVjayBpZiBhIHN0eWxlc2hlZXQgaXMgcmVnaXN0ZXJlZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBuYW1lXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuOyBUcnVlIGlmIHRoZSBzdHlsZXNoZWV0IGlzIHJlZ2lzdGVyZWQuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiBhIHN0eWxlc2hlZXQgaXMgcmVnaXN0ZXJlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3R5bGVzaGVldCBpcyByZWdpc3RlcmVkLlxuICovXG5leHBvcnQgY29uc3QgaGFzID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIFNUWUxFU0hFRVRfQ0FDSEUuaGFzKG5hbWUpO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogdW5yZWdpc3RlclxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBVbnJlZ2lzdGVyIGEgc3R5bGVzaGVldCBieSBuYW1lLlxuICogICBOb3RlOiBUaGlzIGRvZXMgbm90IHJlbW92ZSB0aGUgc3R5bGVzaGVldCBmcm9tIHNoYWRvdyByb290cyB0aGF0IGhhdmUgYWxyZWFkeSBhZG9wdGVkIGl0LlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG5hbWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47IFRydWUgaWYgdGhlIHN0eWxlc2hlZXQgd2FzIHVucmVnaXN0ZXJlZC5cbiAqL1xuXG4vKipcbiAqIFVucmVnaXN0ZXIgYSBzdHlsZXNoZWV0IGJ5IG5hbWUuXG4gKiBOb3RlOiBUaGlzIGRvZXMgbm90IHJlbW92ZSB0aGUgc3R5bGVzaGVldCBmcm9tIHNoYWRvdyByb290cyB0aGF0IGhhdmUgYWxyZWFkeSBhZG9wdGVkIGl0LlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzdHlsZXNoZWV0IHdhcyB1bnJlZ2lzdGVyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCB1bnJlZ2lzdGVyID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIFNUWUxFU0hFRVRfQ0FDSEUuZGVsZXRlKG5hbWUpO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogYWRvcHRcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQWRvcHQgb25lIG9yIG1vcmUgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cyBpbnRvIGEgc2hhZG93IHJvb3Qgb3IgZG9jdW1lbnQuXG4gKiAgIFVzZXMgdGhlIGBhZG9wdGVkU3R5bGVTaGVldHNgIEFQSSB3aGVuIGF2YWlsYWJsZSwgd2l0aCBmYWxsYmFjayB0byBgPHN0eWxlPmAgaW5qZWN0aW9uLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHRhcmdldFxuICogICAgIGRhdGFUeXBlOiBTaGFkb3dSb290IHwgRG9jdW1lbnRcbiAqICAgICBkZXNjOiBUaGUgdGFyZ2V0IHRvIGFkb3B0IHN0eWxlc2hlZXRzIGludG8uXG4gKiAgIC0gbmFtZTogbmFtZXNcbiAqICAgICBkYXRhVHlwZTogQXJyYXk8c3RyaW5nPlxuICogICAgIGRlc2M6IEFycmF5IG9mIHN0eWxlc2hlZXQgbmFtZXMgdG8gYWRvcHQuXG4gKiAgIC0gbmFtZTogb3B0aW9uc1xuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIE9wdGlvbnMgZm9yIGFkb3B0aW9uLlxuICogICAgICAgLSBgcHJlcGVuZGA6IElmIHRydWUsIHN0eWxlc2hlZXRzIGFyZSBhZGRlZCBiZWZvcmUgZXhpc3Rpbmcgb25lcyAoZGVmYXVsdDogZmFsc2UpLlxuICogICAgICAgLSBgZmFsbGJhY2tTdHlsZXNgOiBPYmplY3QgbWFwcGluZyBuYW1lcyB0byBDU1MgdGV4dCBmb3IgZmFsbGJhY2sgaW5qZWN0aW9uLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuOyBUcnVlIGlmIHN0eWxlc2hlZXRzIHdlcmUgYWRvcHRlZCB2aWEgYWRvcHRlZFN0eWxlU2hlZXRzLCBmYWxzZSBpZiBmYWxsYmFjayB3YXMgdXNlZC5cbiAqXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIC8vIEFkb3B0IHJlZ2lzdGVyZWQgc3R5bGVzaGVldHNcbiAqICAgICBTdHlsZVNoZWV0TWFuYWdlci5hZG9wdCh0aGlzLnNoYWRvd1Jvb3QsIFsndGhlbWUnLCAndHlwb2dyYXBoeSddKTtcbiAqXG4gKiAgICAgLy8gV2l0aCBmYWxsYmFjayBmb3Igb2xkZXIgYnJvd3NlcnNcbiAqICAgICBTdHlsZVNoZWV0TWFuYWdlci5hZG9wdCh0aGlzLnNoYWRvd1Jvb3QsIFsndGhlbWUnXSwge1xuICogICAgICAgZmFsbGJhY2tTdHlsZXM6IHtcbiAqICAgICAgICAgJ3RoZW1lJzogJzpob3N0IHsgLS1wcmltYXJ5LWNvbG9yOiBibHVlOyB9J1xuICogICAgICAgfVxuICogICAgIH0pO1xuICogICAgIGBgYFxuICovXG5cbi8qKlxuICogQWRvcHQgb25lIG9yIG1vcmUgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cyBpbnRvIGEgc2hhZG93IHJvb3Qgb3IgZG9jdW1lbnQuXG4gKiBAcGFyYW0ge1NoYWRvd1Jvb3R8RG9jdW1lbnR9IHRhcmdldCAtIFRoZSB0YXJnZXQgdG8gYWRvcHQgc3R5bGVzaGVldHMgaW50by5cbiAqIEBwYXJhbSB7c3RyaW5nW119IG5hbWVzIC0gQXJyYXkgb2Ygc3R5bGVzaGVldCBuYW1lcyB0byBhZG9wdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBPcHRpb25zIGZvciBhZG9wdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucHJlcGVuZD1mYWxzZV0gLSBJZiB0cnVlLCBzdHlsZXNoZWV0cyBhcmUgYWRkZWQgYmVmb3JlIGV4aXN0aW5nIG9uZXMuXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIHN0cmluZz59IFtvcHRpb25zLmZhbGxiYWNrU3R5bGVzXSAtIE9iamVjdCBtYXBwaW5nIG5hbWVzIHRvIENTUyB0ZXh0IGZvciBmYWxsYmFjayBpbmplY3Rpb24uXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBzdHlsZXNoZWV0cyB3ZXJlIGFkb3B0ZWQgdmlhIGFkb3B0ZWRTdHlsZVNoZWV0cywgZmFsc2UgaWYgZmFsbGJhY2sgd2FzIHVzZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBhZG9wdCA9ICh0YXJnZXQsIG5hbWVzLCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKCF0YXJnZXQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGxldCBzaGVldHMgPSBuYW1lcy5tYXAoKG5hbWUpID0+IFNUWUxFU0hFRVRfQ0FDSEUuZ2V0KG5hbWUpKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgLy8gVXNlIGFkb3B0ZWRTdHlsZVNoZWV0cyBpZiBhdmFpbGFibGUgYW5kIGFsbCBzaGVldHMgZXhpc3RcbiAgaWYgKHN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzICYmIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgIT09IHVuZGVmaW5lZCAmJiBzaGVldHMubGVuZ3RoID09PSBuYW1lcy5sZW5ndGgpIHtcbiAgICBsZXQgZXhpc3RpbmdTaGVldHMgPSBBcnJheS5mcm9tKHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMpO1xuXG4gICAgLy8gRmlsdGVyIG91dCBzaGVldHMgdGhhdCBhcmUgYWxyZWFkeSBhZG9wdGVkXG4gICAgbGV0IG5ld1NoZWV0cyA9IHNoZWV0cy5maWx0ZXIoKHNoZWV0KSA9PiAhZXhpc3RpbmdTaGVldHMuaW5jbHVkZXMoc2hlZXQpKTtcblxuICAgIGlmIChuZXdTaGVldHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKG9wdGlvbnMucHJlcGVuZClcbiAgICAgICAgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsgLi4ubmV3U2hlZXRzLCAuLi5leGlzdGluZ1NoZWV0cyBdO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzID0gWyAuLi5leGlzdGluZ1NoZWV0cywgLi4ubmV3U2hlZXRzIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBGYWxsYmFjazogaW5qZWN0IDxzdHlsZT4gZWxlbWVudHNcbiAgaWYgKG9wdGlvbnMuZmFsbGJhY2tTdHlsZXMpIHtcbiAgICBmb3IgKGxldCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICBsZXQgY3NzVGV4dCA9IG9wdGlvbnMuZmFsbGJhY2tTdHlsZXNbbmFtZV07XG5cbiAgICAgIGlmICghY3NzVGV4dClcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIC8vIENoZWNrIGlmIGFscmVhZHkgaW5qZWN0ZWRcbiAgICAgIGxldCBleGlzdGluZ1N0eWxlID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoYHN0eWxlW2RhdGEtc3R5bGVzaGVldC1uYW1lPVwiJHtuYW1lfVwiXWApO1xuICAgICAgaWYgKGV4aXN0aW5nU3R5bGUpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBsZXQgc3R5bGVFbGVtZW50ID0gKHRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1zdHlsZXNoZWV0LW5hbWUnLCBuYW1lKTtcbiAgICAgIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG5cbiAgICAgIGlmIChvcHRpb25zLnByZXBlbmQgJiYgdGFyZ2V0LmZpcnN0Q2hpbGQpXG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCB0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgICBlbHNlIGlmICh0YXJnZXQuYXBwZW5kQ2hpbGQpXG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgICAgZWxzZSBpZiAodGFyZ2V0LmhlYWQpXG4gICAgICAgIHRhcmdldC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogY3JlYXRlRnJvbVRleHRcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQ3JlYXRlIGEgQ1NTU3R5bGVTaGVldCBmcm9tIENTUyB0ZXh0IHdpdGhvdXQgcmVnaXN0ZXJpbmcgaXQuXG4gKiAgIFVzZWZ1bCBmb3IgY29tcG9uZW50LXNwZWNpZmljIHN0eWxlcyB0aGF0IGRvbid0IG5lZWQgdG8gYmUgc2hhcmVkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IGNzc1RleHRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIENTUyBjb250ZW50LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBDU1NTdHlsZVNoZWV0IHwgbnVsbDsgVGhlIGNvbnN0cnVjdGVkIHN0eWxlc2hlZXQsIG9yIG51bGwgaWYgbm90IHN1cHBvcnRlZC5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIENTU1N0eWxlU2hlZXQgZnJvbSBDU1MgdGV4dCB3aXRob3V0IHJlZ2lzdGVyaW5nIGl0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNzc1RleHQgLSBUaGUgQ1NTIGNvbnRlbnQuXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVTaGVldHxudWxsfSBUaGUgY29uc3RydWN0ZWQgc3R5bGVzaGVldCwgb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlRnJvbVRleHQgPSAoY3NzVGV4dCkgPT4ge1xuICBpZiAoIXN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBzaGVldCA9IG5ldyBDU1NTdHlsZVNoZWV0KCk7XG4gIHNoZWV0LnJlcGxhY2VTeW5jKGNzc1RleHQpO1xuICByZXR1cm4gc2hlZXQ7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBhZG9wdEZyb21UZXh0XG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhbmQgaW1tZWRpYXRlbHkgYWRvcHQgYSBzdHlsZXNoZWV0IGZyb20gQ1NTIHRleHQuXG4gKiAgIFVzZWZ1bCBmb3Igb25lLW9mZiBjb21wb25lbnQgc3R5bGVzLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHRhcmdldFxuICogICAgIGRhdGFUeXBlOiBTaGFkb3dSb290IHwgRG9jdW1lbnRcbiAqICAgICBkZXNjOiBUaGUgdGFyZ2V0IHRvIGFkb3B0IGludG8uXG4gKiAgIC0gbmFtZTogY3NzVGV4dFxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgQ1NTIGNvbnRlbnQuXG4gKiAgIC0gbmFtZTogb3B0aW9uc1xuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IE9wdGlvbnMgZm9yIGFkb3B0aW9uIChzZWUgYGFkb3B0YCkuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIENTU1N0eWxlU2hlZXQgfCBIVE1MU3R5bGVFbGVtZW50IHwgbnVsbDsgVGhlIHN0eWxlc2hlZXQgb3Igc3R5bGUgZWxlbWVudCwgb3IgbnVsbCBvbiBmYWlsdXJlLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuZCBpbW1lZGlhdGVseSBhZG9wdCBhIHN0eWxlc2hlZXQgZnJvbSBDU1MgdGV4dC5cbiAqIEBwYXJhbSB7U2hhZG93Um9vdHxEb2N1bWVudH0gdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBhZG9wdCBpbnRvLlxuICogQHBhcmFtIHtzdHJpbmd9IGNzc1RleHQgLSBUaGUgQ1NTIGNvbnRlbnQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gT3B0aW9ucyBmb3IgYWRvcHRpb24gKHNlZSBhZG9wdCkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnByZXBlbmQ9ZmFsc2VdIC0gSWYgdHJ1ZSwgc3R5bGVzaGVldHMgYXJlIGFkZGVkIGJlZm9yZSBleGlzdGluZyBvbmVzLlxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR8SFRNTFN0eWxlRWxlbWVudHxudWxsfSBUaGUgc3R5bGVzaGVldCBvciBzdHlsZSBlbGVtZW50LCBvciBudWxsIG9uIGZhaWx1cmUuXG4gKi9cbmV4cG9ydCBjb25zdCBhZG9wdEZyb21UZXh0ID0gKHRhcmdldCwgY3NzVGV4dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICghdGFyZ2V0KVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmIChzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cyAmJiB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzICE9PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgc2hlZXQgPSBjcmVhdGVGcm9tVGV4dChjc3NUZXh0KTtcblxuICAgIGlmIChzaGVldCkge1xuICAgICAgbGV0IGV4aXN0aW5nU2hlZXRzID0gQXJyYXkuZnJvbSh0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzKTtcblxuICAgICAgaWYgKG9wdGlvbnMucHJlcGVuZClcbiAgICAgICAgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsgc2hlZXQsIC4uLmV4aXN0aW5nU2hlZXRzIF07XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbIC4uLmV4aXN0aW5nU2hlZXRzLCBzaGVldCBdO1xuXG4gICAgICByZXR1cm4gc2hlZXQ7XG4gICAgfVxuICB9XG5cbiAgLy8gRmFsbGJhY2sgdG8gPHN0eWxlPiBlbGVtZW50XG4gIGxldCBzdHlsZUVsZW1lbnQgPSAodGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlRWxlbWVudC50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG5cbiAgaWYgKG9wdGlvbnMucHJlcGVuZCAmJiB0YXJnZXQuZmlyc3RDaGlsZClcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICBlbHNlIGlmICh0YXJnZXQuYXBwZW5kQ2hpbGQpXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gIGVsc2UgaWYgKHRhcmdldC5oZWFkKVxuICAgIHRhcmdldC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cbiAgcmV0dXJuIHN0eWxlRWxlbWVudDtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGNsZWFyXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIENsZWFyIGFsbCByZWdpc3RlcmVkIHN0eWxlc2hlZXRzLlxuICogICBQcmltYXJpbHkgdXNlZnVsIGZvciB0ZXN0aW5nLlxuICovXG5cbi8qKlxuICogQ2xlYXIgYWxsIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMuIFByaW1hcmlseSB1c2VmdWwgZm9yIHRlc3RpbmcuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNsZWFyID0gKCkgPT4ge1xuICBTVFlMRVNIRUVUX0NBQ0hFLmNsZWFyKCk7XG4gIENPTlRFTlRfSEFTSF9DQUNIRS5jbGVhcigpO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZ2V0UmVnaXN0ZXJlZE5hbWVzXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIEdldCB0aGUgbmFtZXMgb2YgYWxsIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIEFycmF5PHN0cmluZz47IEFycmF5IG9mIHJlZ2lzdGVyZWQgc3R5bGVzaGVldCBuYW1lcy5cbiAqL1xuXG4vKipcbiAqIEdldCB0aGUgbmFtZXMgb2YgYWxsIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMuXG4gKiBAcmV0dXJucyB7c3RyaW5nW119IEFycmF5IG9mIHJlZ2lzdGVyZWQgc3R5bGVzaGVldCBuYW1lcy5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlZ2lzdGVyZWROYW1lcyA9ICgpID0+IHtcbiAgcmV0dXJuIEFycmF5LmZyb20oU1RZTEVTSEVFVF9DQUNIRS5rZXlzKCkpO1xufTtcblxuLy8gRXhwb3J0IGFzIG5hbWVzcGFjZS1saWtlIG9iamVjdCBhcyB3ZWxsXG5leHBvcnQgY29uc3QgU3R5bGVTaGVldE1hbmFnZXIgPSB7XG4gIGlzU3VwcG9ydGVkLFxuICByZWdpc3RlcixcbiAgZ2V0LFxuICBoYXMsXG4gIHVucmVnaXN0ZXIsXG4gIGFkb3B0LFxuICBjcmVhdGVGcm9tVGV4dCxcbiAgYWRvcHRGcm9tVGV4dCxcbiAgY2xlYXIsXG4gIGdldFJlZ2lzdGVyZWROYW1lcyxcbn07XG4iLCJpbXBvcnQge1xuICBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUixcbiAgTVlUSElYX1NIQURPV19QQVJFTlQsXG4gIE1ZVEhJWF9UWVBFLFxuICBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSxcbiAgUVVFUllfRU5HSU5FX1RZUEUsXG4gIE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcblxuaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnLi9keW5hbWljLXByb3BlcnR5LmpzJztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IFV0aWxzXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgTWlzYyB1dGlsaXR5IGZ1bmN0aW9ucyBhcmUgZm91bmQgd2l0aGluIHRoaXMgbmFtZXNwYWNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kTWV0aG9kcyhfcHJvdG8sIHNraXBQcm90b3MpIHtcbiAgbGV0IHByb3RvICAgICAgICAgICA9IF9wcm90bztcbiAgbGV0IGFscmVhZHlWaXNpdGVkICA9IG5ldyBTZXQoKTtcblxuICB3aGlsZSAocHJvdG8pIHtcbiAgICBpZiAocHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm90byk7XG4gICAgbGV0IGtleXMgICAgICAgID0gT2JqZWN0LmtleXMoZGVzY3JpcHRvcnMpLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGRlc2NyaXB0b3JzKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJyB8fCBrZXkgPT09ICdwcm90b3R5cGUnKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyhrZXkpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgYWxyZWFkeVZpc2l0ZWQuYWRkKGtleSk7XG5cbiAgICAgIGxldCBkZXNjcmlwdG9yID0gZGVzY3JpcHRvcnNba2V5XTtcblxuICAgICAgLy8gQ2FuIGl0IGJlIGNoYW5nZWQ/XG4gICAgICBpZiAoZGVzY3JpcHRvci5jb25maWd1cmFibGUgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgLy8gSWYgaXMgZ2V0dGVyLCB0aGVuIHNraXBcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ2dldCcpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAnc2V0JykpIHtcbiAgICAgICAgbGV0IG5ld0Rlc2NyaXB0b3IgPSB7IC4uLmRlc2NyaXB0b3IgfTtcbiAgICAgICAgaWYgKG5ld0Rlc2NyaXB0b3IuZ2V0KVxuICAgICAgICAgIG5ld0Rlc2NyaXB0b3IuZ2V0ID0gbmV3RGVzY3JpcHRvci5nZXQuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAobmV3RGVzY3JpcHRvci5zZXQpXG4gICAgICAgICAgbmV3RGVzY3JpcHRvci5zZXQgPSBuZXdEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIG5ld0Rlc2NyaXB0b3IpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgICAgLy8gU2tpcCBwcm90b3R5cGUgb2YgT2JqZWN0XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIE9iamVjdC5wcm90b3R5cGVba2V5XSA9PT0gdmFsdWUpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgeyAuLi5kZXNjcmlwdG9yLCB2YWx1ZTogdmFsdWUuYmluZCh0aGlzKSB9KTtcbiAgICB9XG5cbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgaWYgKHByb3RvID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgYnJlYWs7XG5cbiAgICBpZiAoc2tpcFByb3RvcyAmJiBza2lwUHJvdG9zLmluZGV4T2YocHJvdG8pID49IDApXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVzY3JpcHRvckZyb21Qcm90b3R5cGVDaGFpbihzdGFydFByb3RvLCBkZXNjcmlwdG9yTmFtZSkge1xuICBsZXQgdGhpc1Byb3RvID0gc3RhcnRQcm90bztcbiAgbGV0IGRlc2NyaXB0b3I7XG5cbiAgd2hpbGUgKHRoaXNQcm90byAmJiAhKGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXNQcm90bywgZGVzY3JpcHRvck5hbWUpKSlcbiAgICB0aGlzUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpc1Byb3RvKTtcblxuICByZXR1cm4geyBwcm90b3R5cGU6IHRoaXNQcm90bywgZGVzY3JpcHRvciB9O1xufVxuXG5jb25zdCBNRVRBREFUQV9TVE9SQUdFID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29tcG9uZW50L2NvbnN0YW50cy9tZXRhZGF0YS1zdG9yYWdlJyk7XG5jb25zdCBNRVRBREFUQV9XRUFLTUFQID0gZ2xvYmFsVGhpcy5teXRoaXhVSVtNRVRBREFUQV9TVE9SQUdFXSA9IChnbG9iYWxUaGlzLm15dGhpeFVJW01FVEFEQVRBX1NUT1JBR0VdKSA/IGdsb2JhbFRoaXMubXl0aGl4VUlbTUVUQURBVEFfU1RPUkFHRV0gOiBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgU3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhIG9uIGFueSBnYXJiYWdlLWNvbGxlY3RhYmxlIHJlZmVyZW5jZS5cbiAqXG4gKiAgIFRoaXMgZnVuY3Rpb24gdXNlcyBhbiBpbnRlcm5hbCBXZWFrTWFwIHRvIHN0b3JlIG1ldGFkYXRhIGZvciBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSB2YWx1ZS5cbiAqXG4gKiAgIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHByb3ZpZGVkIHdpbGwgY2hhbmdlIHRoZSBiZWhhdmlvciBvZiB0aGlzIGZ1bmN0aW9uOlxuICogICAxLiBJZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBzdXBwbGllZCAoYSBgdGFyZ2V0YCksIHRoZW4gYSBNYXAgb2YgbWV0YWRhdGEga2V5L3ZhbHVlIHBhaXJzIGlzIHJldHVybmVkLlxuICogICAyLiBJZiBvbmx5IHR3byBhcmd1bWVudHMgYXJlIHN1cHBsaWVkLCB0aGVuIGBtZXRhZGF0YWAgYWN0cyBhcyBhIGdldHRlciwgYW5kIHRoZSB2YWx1ZSBzdG9yZWQgdW5kZXIgdGhlIHNwZWNpZmllZCBga2V5YCBpcyByZXR1cm5lZC5cbiAqICAgMy4gSWYgbW9yZSB0aGFuIHR3byBhcmd1bWVudHMgYXJlIHN1cHBsaWVkLCB0aGVuIGBtZXRhZGF0YWAgYWN0cyBhcyBhIHNldHRlciwgYW5kIGB0YXJnZXRgIGlzIHJldHVybmVkIChmb3IgY29udGludWVkIGNoYWluaW5nKS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB0YXJnZXRcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBpcyB0aGUgdmFsdWUgZm9yIHdoaWNoIG1ldGFkYXRhIGlzIGJlaW5nIHN0b3JlZCBvciByZXRyaWV2ZWQuXG4gKiAgICAgICBUaGlzIGNhbiBiZSBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSB2YWx1ZSAoYW55IHZhbHVlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBXZWFrTWFwKS5cbiAqICAgLSBuYW1lOiBrZXlcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUga2V5IHVzZWQgdG8gc3RvcmUgb3IgZmV0Y2ggdGhlIHNwZWNpZmllZCBtZXRhZGF0YSB2YWx1ZS4gVGhpcyBjYW4gYmUgYW55IHZhbHVlLCBhcyB0aGUgdW5kZXJseWluZ1xuICogICAgICAgc3RvcmFnZSBpcyBhIE1hcC5cbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSB2YWx1ZSB0byBzdG9yZSBvbiB0aGUgYHRhcmdldGAgdW5kZXIgdGhlIHNwZWNpZmllZCBga2V5YC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYW55O1xuICogICAxLiBJZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCAoYSBidWxrIGdldCBvcGVyYXRpb24pLCByZXR1cm4gYSBNYXAgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIHRoZSBzcGVjaWZpZWQgYHRhcmdldGAuXG4gKiAgIDIuIElmIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIChhIGdldCBvcGVyYXRpb24pLCB0aGUgYHRhcmdldGAgbWV0YWRhdGEgdmFsdWUgc3RvcmVkIGZvciB0aGUgc3BlY2lmaWVkIGBrZXlgLlxuICogICAyLiBJZiBtb3JlIHRoYW4gdHdvIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQgKGEgc2V0IG9wZXJhdGlvbiksIHRoZSBwcm92aWRlZCBgdGFyZ2V0YCBpcyByZXR1cm5lZC5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICAvLyBzZXRcbiAqICAgICBVdGlscy5tZXRhZGF0YShteUVsZW1lbnQsICdjdXN0b21DYXB0aW9uJywgJ01ldGFkYXRhIENhcHRpb24hJyk7XG4gKlxuICogICAgIC8vIGdldFxuICogICAgIGNvbnNvbGUubG9nKFV0aWxzLm1ldGFkYXRhKG15RWxlbWVudCwgJ2N1c3RvbUNhcHRpb24nKSk7XG4gKiAgICAgLy8gb3V0cHV0IC0+ICdNZXRhZGF0YSBDYXB0aW9uISdcbiAqXG4gKiAgICAgLy8gZ2V0IGFsbFxuICogICAgIGNvbnNvbGUubG9nKFV0aWxzLm1ldGFkYXRhKG15RWxlbWVudCkpO1xuICogICAgIC8vIG91dHB1dCAtPiBNYXAoMSkgeyAnY3VzdG9tQ2FwdGlvbicgPT4gJ01ldGFkYXRhIENhcHRpb24hJyB9XG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXRhZGF0YSh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgbGV0IGRhdGEgPSBNRVRBREFUQV9XRUFLTUFQLmdldCh0YXJnZXQpO1xuICBpZiAoIWRhdGEpIHtcbiAgICBpZiAoIUJhc2VVdGlscy5pc0NvbGxlY3RhYmxlKHRhcmdldCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBzZXQgbWV0YWRhdGEgb24gcHJvdmlkZWQgb2JqZWN0OiAkeyh0eXBlb2YgdGFyZ2V0ID09PSAnc3ltYm9sJykgPyB0YXJnZXQudG9TdHJpbmcoKSA6IHRhcmdldH1gKTtcblxuICAgIGRhdGEgPSBuZXcgTWFwKCk7XG4gICAgTUVUQURBVEFfV0VBS01BUC5zZXQodGFyZ2V0LCBkYXRhKTtcbiAgfVxuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiBkYXRhO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKVxuICAgIHJldHVybiAoZGF0YSkgPyBkYXRhLmdldChrZXkpIDogdW5kZWZpbmVkO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNvbnN0IFZBTElEX0pTX0lERU5USUZJRVIgPSAvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKiQvO1xuY29uc3QgUkVTRVJWRURfSURFTlRJRklFUiA9IC9eKGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxleHBvcnR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxpZnxpbXBvcnR8aW58aW5zdGFuY2VvZnxuZXd8bnVsbHxyZXR1cm58c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHZhcnx2b2lkfHdoaWxlfHdpdGh8bGV0fHN0YXRpY3x5aWVsZCkkLztcblxuZnVuY3Rpb24gZ2V0Q29udGV4dENhbGxBcmdzKGNvbnRleHQsIC4uLmV4dHJhQ29udGV4dHMpIHtcbiAgbGV0IGNvbnRleHRDYWxsQXJncyA9IEFycmF5LmZyb20oXG4gICAgbmV3IFNldChnZXRBbGxQcm9wZXJ0eU5hbWVzKGNvbnRleHQpLmNvbmNhdChcbiAgICAgIE9iamVjdC5rZXlzKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUgfHwge30pLFxuICAgICAgWyAnYXR0cmlidXRlcycsICdjbGFzc0xpc3QnLCAnJCQnLCAnaTE4bicgXSxcbiAgICAgIC4uLmV4dHJhQ29udGV4dHMubWFwKChleHRyYUNvbnRleHQpID0+IE9iamVjdC5rZXlzKGV4dHJhQ29udGV4dCB8fCB7fSkpLFxuICAgICkpLFxuICApLmZpbHRlcigobmFtZSkgPT4ge1xuICAgIGlmIChSRVNFUlZFRF9JREVOVElGSUVSLnRlc3QobmFtZSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gVkFMSURfSlNfSURFTlRJRklFUi50ZXN0KG5hbWUpO1xuICB9KTtcblxuICByZXR1cm4gYHske2NvbnRleHRDYWxsQXJncy5qb2luKCcsJyl9fWA7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBHZXQgdGhlIHBhcmVudCBOb2RlIG9mIGBlbGVtZW50YC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBlbGVtZW50XG4gKiAgICAgZGF0YVR5cGU6IE5vZGVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgTm9kZSB3aG9zZSBwYXJlbnQgeW91IHdpc2ggdG8gZmluZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogVW5saWtlIFtOb2RlLnBhcmVudE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpLCB0aGlzXG4gKiAgICAgd2lsbCBhbHNvIHNlYXJjaCBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzLlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogKipTZWFyY2hpbmcgYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcyBvbmx5IHdvcmtzIGZvciBNeXRoaXggVUkgY29tcG9uZW50cyEqKlxuICogICAtIHxcbiAqICAgICA6aW5mbzogU2VhcmNoaW5nIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMgaXMgYWNjb21wbGlzaGVkIHZpYSBsZXZlcmFnaW5nIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE7IG9uXG4gKiAgICAgYGVsZW1lbnRgLiBXaGVuIGEgYG51bGxgIHBhcmVudCBpcyBlbmNvdW50ZXJlZCwgYGdldFBhcmVudE5vZGVgIHdpbGwgbG9vayBmb3IgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyBrZXkgQHNlZSBDb25zdGFudHMuTVlUSElYX1NIQURPV19QQVJFTlQ7XG4gKiAgICAgb24gYGVsZW1lbnRgLiBJZiBmb3VuZCwgdGhlIHJlc3VsdCBpcyBjb25zaWRlcmVkIHRoZSBbcGFyZW50IE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpIG9mIGBlbGVtZW50YC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgTm9kZTsgVGhlIHBhcmVudCBub2RlLCBpZiB0aGVyZSBpcyBhbnksIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50KVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmIChlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpXG4gICAgcmV0dXJuIG1ldGFkYXRhKGVsZW1lbnQucGFyZW50Tm9kZSwgTVlUSElYX1NIQURPV19QQVJFTlQpIHx8IG51bGw7XG5cbiAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKVxuICAgIHJldHVybiBtZXRhZGF0YShlbGVtZW50LCBNWVRISVhfU0hBRE9XX1BBUkVOVCkgfHwgbnVsbDtcblxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ3JlYXRlIGEgUHJveHkgdGhhdCBpcyBlc3NlbnRpYWxseSAoZnVuY3Rpb25hbGx5KSBhIG11bHRpLXByb3RvdHlwZSBgb2JqZWN0YCBpbnN0YW5jZS5cbiAqXG4gKiAgIEEgXCJzY29wZVwiIGluIE15dGhpeCBVSSBtaWdodCBiZSBiZXR0ZXIgY2FsbGVkIGEgXCJjb250ZXh0XCIuLi4gaG93ZXZlciwgXCJzY29wZVwiXG4gKiAgIHdhcyBjaG9zZW4gYmVjYXVzZSBpdCAqaXMqIGEgc2NvcGUuLi4gb3IgbWlnaHQgYmUgYmV0dGVyIGRlc2NyaWJlZCBhcyBcIm11bHRpcGxlIHNjb3BlcyBpbiBvbmVcIi5cbiAqICAgVGhpcyBpcyBzcGVjaWZpY2FsbHkgYSBcIkRPTSBzY29wZVwiLCBpbiB0aGF0IHRoaXMgbWV0aG9kIGlzIFwiRE9NIGF3YXJlXCIgYW5kIHdpbGwgdHJhdmVyc2UgdGhlXG4gKiAgIERPTSBsb29raW5nIGZvciB0aGUgcmVxdWVzdGVkIGRhdGEgKGlmIGFueSBvZiB0aGUgc3BlY2lmaWVkIGB0YXJnZXRzYCBpcyBhbiBFbGVtZW50IHRoYXQgaXMpLlxuICpcbiAqICAgVGhlIHdheSB0aGlzIHdvcmtzIGlzIHRoYXQgdGhlIGNhbGxlciB3aWxsIHByb3ZpZGUgYXQgbGVhc3Qgb25lIFwidGFyZ2V0XCIuIFRoZXNlIHRhcmdldHMgYXJlXG4gKiAgIHRoZW1zZWx2ZXMgc2NvcGVzLCBlbGVtZW50cywgb3Igb3RoZXIgZGF0YSBvYmplY3RzLiBXaGVuIHRoZSByZXR1cm5lZCBQcm94eSBpbnN0YW5jZSBpcyBhY2Nlc3NlZCxcbiAqICAgdGhlIHJlcXVlc3RlZCBrZXkgaXMgc2VhcmNoZWQgaW4gYWxsIHByb3ZpZGVkIGB0YXJnZXRzYCwgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBwcm92aWRlZC5cbiAqXG4gKiAgIEFzaWRlIGZyb20gc2VhcmNoaW5nIGFsbCB0YXJnZXRzIGZvciB0aGUgZGVzaXJlZCBrZXksIGl0IHdpbGwgYWxzbyBmYWxsYmFjayB0byBvdGhlciBkYXRhIHNvdXJjZXNcbiAqICAgaXQgc2VhcmNoZXMgaW4gYXMgd2VsbDpcbiAqICAgMS4gSWYgYW55IGdpdmVuIGB0YXJnZXRgIGl0IGlzIHNlYXJjaGluZyBpcyBhbiBFbGVtZW50LCB0aGVuIGl0IHdpbGwgYWxzbyBzZWFyY2hcbiAqICAgICAgZm9yIHRoZSByZXF1ZXN0ZWQga2V5IG9uIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqICAgMi4gSWYgc3RlcCAjMSBoYXMgZmFpbGVkLCB0aGVuIG1vdmUgdG8gdGhlIHBhcmVudCBub2RlIG9mIHRoZSBjdXJyZW50IEVsZW1lbnQgaW5zdGFuY2UsIGFuZFxuICogICAgICByZXBlYXQgdGhlIHByb2Nlc3MsIHN0YXJ0aW5nIGZyb20gc3RlcCAjMS5cbiAqICAgMy4gQWZ0ZXIgc3RlcHMgMS0yIGFyZSByZXBlYXRlZCBmb3IgZXZlcnkgZ2l2ZW4gYHRhcmdldGAgKGFuZCBhbGwgcGFyZW50IG5vZGVzIG9mIHRob3NlIGB0YXJnZXRzYC4uLiBpZiBhbnkpLFxuICogICAgICB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgZmluYWxseSBmYWxsYmFjayB0byBzZWFyY2hpbmcgYGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVgIGZvciB0aGUgcmVxdWVzdGVkIGtleS5cbiAqXG4gKiAgIFdlIGFyZW4ndCBxdWl0ZSBmaW5pc2hlZCB5ZXQgdGhvdWdoLi4uXG4gKlxuICogICBJZiBzdGVwcyAxLTMgYWJvdmUgYWxsIGZhaWwsIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBzdGlsbCBmYWxsYmFjayB0byB0aGUgZmFsbG93aW5nIGhhcmQtY29kZWQga2V5L3ZhbHVlIHBhaXJzOlxuICogICAxLiBBIHJlcXVlc3RlZCBrZXkgb2YgYCdnbG9iYWxTY29wZSdgIChpZiBub3QgZm91bmQgb24gYSB0YXJnZXQpIHdpbGwgcmVzdWx0IGluIGBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlYCBiZWluZyByZXR1cm5lZC5cbiAqICAgMi4gQSByZXF1ZXN0ZWQga2V5IG9mIGAnaTE4bidgIChpZiBub3QgZm91bmQgb24gYSB0YXJnZXQpIHdpbGwgcmVzdWx0IGluIHRoZSBidWlsdC1pbiBgaTE4bmAgbGFuZ3VhZ2UgdGVybSBwcm9jZXNzb3IgYmVpbmcgcmV0dXJuZWQuXG4gKiAgIDMuIEEgcmVxdWVzdGVkIGtleSBvZiBgJ2R5bmFtaWNQcm9wSUQnYCAoaWYgbm90IGZvdW5kIG9uIGEgdGFyZ2V0KSB3aWxsIHJlc3VsdCBpbiB0aGUgYnVpbHQtaW4gYGR5bmFtaWNQcm9wSURgIGR5bmFtaWMgcHJvcGVydHkgcHJvdmlkZWQuIFNlZSBAc2VlIFV0aWxzLmR5bmFtaWNQcm9wSUQ7LlxuICpcbiAqICAgRmluYWxseSwgdGhlIHJldHVybmVkIFByb3h5IHdpbGwgYWxzbyBpbnRlcmNlcHQgYW55IHZhbHVlIFtzZXRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L1Byb3h5L3NldCkgb3BlcmF0aW9uLFxuICogICB0byBzZXQgYSB2YWx1ZSBvbiB0aGUgZmlyc3QgdGFyZ2V0IGZvdW5kLlxuICpcbiAqICAgVGhlIFByb3h5IGFsc28gb3ZlcmxvYWRzIFtvd25LZXlzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9Qcm94eS9vd25LZXlzKSB0byBsaXN0ICoqYWxsKioga2V5cyBhY3Jvc3MgKiphbGwqKiBgdGFyZ2V0c2AuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogLi4udGFyZ2V0c1xuICogICAgIGRhdGFUeXBlczpcbiAqICAgICAgIC0gT2JqZWN0XG4gKiAgICAgICAtIEVsZW1lbnRcbiAqICAgICAgIC0gbm9uLXByaW1pdGl2ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSBgdGFyZ2V0c2AgdG8gYmUgc2VhcmNoZWQsIGluIHRoZSBvcmRlciBwcm92aWRlZC4gVGFyZ2V0cyBhcmUgc2VhcmNoZWQgYm90aCBmb3IgZ2V0IG9wZXJhdGlvbnMsIGFuZCBzZXQgb3BlcmF0aW9ucyAodGhlIGZpcnN0IHRhcmdldCBmb3VuZCB3aWxsIGJlIHRoZSBzZXQgdGFyZ2V0KS5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogTXl0aGl4IFVJIHdpbGwgZGVsaWJlcmF0ZWx5IG5ldmVyIGRpcmVjdGx5IGFjY2VzcyBgZ2xvYmFsVGhpc2AgZnJvbSB0aGUgdGVtcGxhdGUgZW5naW5lIChmb3Igc2VjdXJpdHkgcmVhc29ucykuXG4gKiAgICAgQmVjYXVzZSBvZiB0aGlzLCBNeXRoaXggVUkgYXV0b21hdGljYWxseSBwcm92aWRlcyBpdHMgb3duIGdsb2JhbCBzY29wZSBgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZWAuXG4gKiAgICAgSWYgeW91IHdhbnQgZGF0YSB0byBiZSBcImdsb2JhbGx5XCIgdmlzaWJsZSB0byBNeXRoaXggVUksIHRoZW4geW91IG5lZWQgdG8gYWRkIHlvdXIgZGF0YSB0byB0aGlzIHNwZWNpYWwgZ2xvYmFsIHNjb3BlLlxuICogICAtIHxcbiAqICAgICA6aW5mbzogVGhpcyBtZXRob2QgaXMgY29tcGxleCBiZWNhdXNlIGl0IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgdG8gcHJvdmlkZSBhIFwic2NvcGVcIiB0byB0aGUgTXl0aGl4IFVJIHRlbXBsYXRpbmcgZW5naW5lLlxuICogICAgIFRoZSB0ZW1wbGF0aW5nIGVuZ2luZSBuZWVkcyB0byBiZSBET00gYXdhcmUsIGFuZCBhbHNvIG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvIHNwZWNpYWxpemVkLCBzY29wZWQgZGF0YVxuICogICAgIChpLmUuIHRoZSBgbXl0aGl4LXVpLWZvci1lYWNoYCBjb21wb25lbnQgd2lsbCBwdWJsaXNoIHNjb3BlZCBkYXRhIGZvciBlYWNoIGl0ZXJhdGlvbiwgd2hpY2ggbmVlZHMgdG8gYmUgYm90aFxuICogICAgIERPTS1hd2FyZSwgYW5kIGl0ZXJhdGlvbi1hd2FyZSkuXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBBbnkgcHJvdmlkZWQgYHRhcmdldGAgY2FuIGFsc28gYmUgb25lIG9mIHRoZXNlIFByb3h5IHNjb3BlcyByZXR1cm5lZCBieSB0aGlzIG1ldGhvZC5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IEl0IGNhbiBoZWxwIHRvIHRoaW5rIG9mIHRoZSByZXR1cm5lZCBcInNjb3BlXCIgYXMgYW4gcGxhaW4gT2JqZWN0IHRoYXQgaGFzIGFuIGFycmF5IG9mIHByb3RvdHlwZXMuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIFByb3h5OyBBIHByb3h5IGluc3RhbmNlLCB0aGF0IGlzIHVzZWQgdG8gZ2V0IGFuZCBzZXQga2V5cyBhY3Jvc3MgbXVsdGlwbGUgYHRhcmdldHNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NvcGUoLi4uX3RhcmdldHMpIHtcbiAgY29uc3QgZmluZFByb3BOYW1lU2NvcGUgPSAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCB8fCBPYmplY3QuaXModGFyZ2V0LCBOYU4pKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHByb3BOYW1lIGluIHRhcmdldClcbiAgICAgIHJldHVybiB0YXJnZXQ7XG5cbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSlcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHNlYXJjaFBhcmVudE5vZGVzRm9yS2V5ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICBpZiAoIWN1cnJlbnRFbGVtZW50KVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKHByb3BOYW1lIGluIGN1cnJlbnRFbGVtZW50KVxuICAgICAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcblxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGdldFBhcmVudE5vZGUoY3VycmVudEVsZW1lbnQpO1xuICAgICAgfSB3aGlsZSAoY3VycmVudEVsZW1lbnQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyZW50Tm9kZXNGb3JLZXkodGFyZ2V0KTtcbiAgfTtcblxuICBsZXQgdGFyZ2V0cyAgICAgICAgID0gX3RhcmdldHMuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgZmlyc3RFbGVtZW50ICAgID0gdGFyZ2V0cy5maW5kKCh0YXJnZXQpID0+ICh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgfHwgdGFyZ2V0c1swXTtcbiAgbGV0IGJhc2VDb250ZXh0ICAgICA9IHt9O1xuICBsZXQgZmFsbGJhY2tDb250ZXh0ID0ge1xuICAgIGdsb2JhbFNjb3BlOiAgKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSksXG4gICAgaTE4bjogICAgICAgICAocGF0aCwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gICAgICBsZXQgbGFuZ3VhZ2VQcm92aWRlciA9IHNwZWNpYWxDbG9zZXN0KGZpcnN0RWxlbWVudCwgJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuICAgICAgaWYgKCFsYW5ndWFnZVByb3ZpZGVyKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgICByZXR1cm4gbGFuZ3VhZ2VQcm92aWRlci5pMThuKHBhdGgsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfSxcbiAgICBkeW5hbWljUHJvcElELFxuICB9O1xuXG4gIHRhcmdldHMgPSB0YXJnZXRzLmNvbmNhdChmYWxsYmFja0NvbnRleHQpO1xuICBsZXQgcHJveHkgICA9IG5ldyBQcm94eShiYXNlQ29udGV4dCwge1xuICAgIG93bktleXM6ICgpID0+IHtcbiAgICAgIGxldCBhbGxLZXlzID0gW107XG5cbiAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKVxuICAgICAgICBhbGxLZXlzID0gYWxsS2V5cy5jb25jYXQoZ2V0QWxsUHJvcGVydHlOYW1lcyh0YXJnZXQpKTtcblxuICAgICAgbGV0IGdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSk7XG4gICAgICBpZiAoZ2xvYmFsU2NvcGUpXG4gICAgICAgIGFsbEtleXMgPSBhbGxLZXlzLmNvbmNhdChPYmplY3Qua2V5cyhnbG9iYWxTY29wZSkpO1xuXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFsbEtleXMpKTtcbiAgICB9LFxuICAgIGhhczogKF8sIHByb3BOYW1lKSA9PiB7XG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICBsZXQgc2NvcGUgPSBmaW5kUHJvcE5hbWVTY29wZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSk7XG4gICAgICBpZiAoIWdsb2JhbFNjb3BlKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiAocHJvcE5hbWUgaW4gZ2xvYmFsU2NvcGUpO1xuICAgIH0sXG4gICAgZ2V0OiAoXywgcHJvcE5hbWUpID0+IHtcbiAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICAgIGxldCBzY29wZSA9IGZpbmRQcm9wTmFtZVNjb3BlKHRhcmdldCwgcHJvcE5hbWUpO1xuICAgICAgICBpZiAoIXNjb3BlKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIHJldHVybiBzY29wZVtwcm9wTmFtZV07XG4gICAgICB9XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKCFnbG9iYWxTY29wZSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICByZXR1cm4gZ2xvYmFsU2NvcGVbcHJvcE5hbWVdO1xuICAgIH0sXG4gICAgc2V0OiAoXywgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBkb1NldCA9IChzY29wZSwgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNjb3BlW3Byb3BOYW1lXSwgRHluYW1pY1Byb3BlcnR5KSlcbiAgICAgICAgICBzY29wZVtwcm9wTmFtZV1bRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc2NvcGVbcHJvcE5hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICBsZXQgc2NvcGUgPSBmaW5kUHJvcE5hbWVTY29wZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICByZXR1cm4gZG9TZXQoc2NvcGUsIHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKCFnbG9iYWxTY29wZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gZG9TZXQoZ2xvYmFsU2NvcGUsIHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgZmFsbGJhY2tDb250ZXh0LiQkID0gcHJveHk7XG5cbiAgcmV0dXJuIHByb3h5O1xufVxuXG5jb25zdCBFVkVOVF9BQ1RJT05fSlVTVF9OQU1FID0gL14lP1tcXHcuJF0rJC87XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICAqKk5vdGU6KiogRm9yIGV2ZW50IGJpbmRpbmdzLCBwcmVmZXIgdXNpbmcgdGhlIGBkYXRhLWV2ZW50LW9ue2V2ZW50TmFtZX1gIHBhdHRlcm4gKGUuZy4sIGBkYXRhLWV2ZW50LW9uY2xpY2tgKVxuICogICB3aXRoIGBteXRoaXhFdmVudFdyYXBwZXJgIGluc3RlYWQuIFRoaXMgbGVnYWN5IGZ1bmN0aW9uIGlzIG1haW50YWluZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkuXG4gKlxuICogICBDcmVhdGUgYSBjb250ZXh0LWF3YXJlIGZ1bmN0aW9uLCBvciBcIm1hY3JvXCIsIHRoYXQgY2FuIGJlIGNhbGxlZCBhbmQgdXNlZCBieSB0aGUgdGVtcGxhdGUgZW5naW5lLlxuICpcbiAqICAgSWYgeW91IGFyZSBldmVyIHRyeWluZyB0byBwYXNzIG1ldGhvZHMgb3IgZHluYW1pYyBwcm9wZXJ0aWVzIGFjcm9zcyB0aGUgRE9NLCB0aGVuIHRoaXMgaXMgdGhlIG1ldGhvZCB5b3Ugd2FudCB0byB1c2UsIHRvXG4gKiAgIHByb3Blcmx5IFwicGFyc2VcIiBhbmQgdXNlIHRoZSBhdHRyaWJ1dGUgdmFsdWUgYXMgaW50ZW5kZWQuXG4gKlxuICogICBUaGlzIGlzIHVzZWQgZm9yIGV4YW1wbGUgZm9yIGV2ZW50IGJpbmRpbmdzIHZpYSBsZWdhY3kgYG9ue2V2ZW50TmFtZX1gIGF0dHJpYnV0ZXMuIElmIHlvdSBoYXZlIGZvciBleGFtcGxlIGFuIGBvbmNsaWNrPVwiZG9Tb21ldGhpbmdcImBcbiAqICAgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQsIHRoZW4gdGhpcyB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgY29udGV4dC1hd2FyZSBcIm1hY3JvXCIgZm9yIHRoZSBtZXRob2QgXCJkb1NvbWV0aGluZ1wiLlxuICpcbiAqICAgVGhlIHRlcm0gXCJtYWNyb1wiIGlzIHVzZWQgaGVyZSBiZWNhdXNlIHRoZXJlIGFyZSBzcGVjaWFsIGZvcm1hdHMgXCJ1bmRlcnN0b29kXCIgYnkgdGhlIHRlbXBsYXRlIGVuZ2luZS4gRm9yIGV4YW1wbGUsXG4gKiAgIHByZWZpeGluZyBhbiBhdHRyaWJ1dGUgdmFsdWUgd2l0aCBhIHBlcmNlbnQgc2lnbiwgaS5lLiBgbmFtZT1cIiVnbG9iYWxEeW5hbWljUHJvcE5hbWVcImAgd2lsbCB1c2UgQHNlZSBVdGlscy5keW5hbWljUHJvcElEO1xuICogICB0byBnbG9iYWxseSBmZXRjaCBwcm9wZXJ0eSBvZiB0aGlzIG5hbWUuIFRoaXMgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGR1ZSB0byB0aGUgYXN5bmMgbmF0dXJlIG9mIHRoZSBET00sIHlvdSBtaWdodFxuICogICBiZSByZXF1ZXN0aW5nIGEgZHluYW1pYyBwcm9wZXJ0eSB0aGF0IGhhc24ndCB5ZXQgYmVlbiBsb2FkZWQvZGVmaW5lZC4gVGhpcyBpcyB0aGUgcHVycG9zZSBvZiBAc2VlIFV0aWxzLmR5bmFtaWNQcm9wSUQ7LFxuICogICBhbmQgdGhpcyBzcGVjaWFsaXplZCB0ZW1wbGF0ZSBmb3JtYXQ6IHRvIHByb3ZpZGUgZHluYW1pYyBwcm9wcyBieSBpZCwgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZSB3aGVuIG5lZWRlZC5cbiAqXG4gKiAgIFRoZSB0ZW1wbGF0ZSBlbmdpbmUgYWxzbyB3aWxsIGhhcHBpbHkgYWNjZXB0IHJvZ3VlIG1ldGhvZCBuYW1lcy4gRm9yIGV4YW1wbGUsIGluIGEgTXl0aGl4IFVJIGNvbXBvbmVudCB5b3UgYXJlIGJ1aWxkaW5nLFxuICogICB5b3UgbWlnaHQgaGF2ZSBhbiBlbGVtZW50IGxpa2UgYDxidXR0b24gZGF0YS1ldmVudC1vbmNsaWNrPVwib25CdXR0b25DbGlja1wiPkNsaWNrIE1lITxidXR0b24+YC4gVGhlIHRlbXBsYXRpbmcgZW5naW5lIHdpbGwgZGV0ZWN0IHRoYXRcbiAqICAgdGhpcyBpcyBPTkxZIGFuIGlkZW50aWZpZXIsIGFuZCBzbyB3aWxsIHNlYXJjaCBmb3IgdGhlIHNwZWNpZmllZCBtZXRob2QgaW4gdGhlIGF2YWlsYWJsZSBcInNjb3BlXCIgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOyksXG4gKiAgIHdoaWNoIGluY2x1ZGVzIGB0aGlzYCBpbnN0YW5jZSBvZiB5b3VyIGNvbXBvbmVudCBhcyB0aGUgZmlyc3QgYHRhcmdldGAuIFRoaXMgcGF0dGVybiBpcyBub3QgcmVxdWlyZWQsIGFzIHlvdSBjYW4gY2FsbCB5b3VyXG4gKiAgIGNvbXBvbmVudCBtZXRob2QgZGlyZWN0bHkgeW91cnNlbGYsIGFzIHdpdGggYW55IGF0dHJpYnV0ZSBldmVudCBiaW5kaW5nIGluIHRoZSBET00sIGkuZTogYDxidXR0b24gZGF0YS1ldmVudC1vbmNsaWNrPVwidGhpcy5vbkJ1dHRvbkNsaWNrKGV2ZW50KVwiPkNsaWNrIE1lITxidXR0b24+YC5cbiAqXG4gKiAgIE9uZSBsYXN0IHRoaW5nIHRvIG1lbnRpb24gaXMgdGhhdCB3aGVuIHRoZXNlIFwibWFjcm9cIiBtZXRob2RzIGFyZSBjYWxsZWQgYnkgTXl0aGl4IFVJLCBhbGwgZW51bWVyYWJsZSBrZXlzIG9mIHRoZSBnZW5lcmF0ZWRcbiAqICAgXCJzY29wZVwiIChzZWUgQHNlZSBVdGlscy5jcmVhdGVTY29wZTspIGFyZSBwYXNzZWQgaW50byB0aGUgbWFjcm8gbWV0aG9kIGFzIGFyZ3VtZW50cy4gVGhpcyBtZWFucyB0aGF0IHRoZSBrZXlzL3ZhbHVlcyBvZiBhbGwgc2NvcGUgYHRhcmdldHNgXG4gKiAgIGFyZSBhdmFpbGFibGUgZGlyZWN0bHkgaW4geW91ciBqYXZhc2NyaXB0IHNjb3BlLiBpLmUuIHlvdSBjYW4gZG8gdGhpbmdzIGxpa2UgYG5hbWU9XCJjb21wb25lbnRJbnN0YW5jZVByb3BlcnR5KHRoaXNBdHRyaWJ1dGUxLCBvdGhlckF0dHJpYnV0ZSlcImAgd2l0aG91dCBuZWVkaW5nIHRvIGRvXG4gKiAgIGBuYW1lPVwidGhpcy5jb21wb25lbnRJbnN0YW5jZVByb3BlcnR5KHRoaXMudGhpc0F0dHJpYnV0ZTEsIHRoaXMub3RoZXJBdHRyaWJ1dGUpXCJgLiA6d2FybmluZzogSXQgaXMgaW1wb3J0YW50IHRvIGtlZXAgaW4gbWluZCB0aGF0IGRpcmVjdCByZWZlcmVuY2UgYWNjZXNzIGxpa2UgdGhpcyBpbiBhIG1hY3JvXG4gKiAgIHdpbGwgYnlwYXNzIHRoZSBcInNjb3BlXCIgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykgUHJveHksIGFuZCBzbyBpZiB0aGUgc3BlY2lmaWVkIGtleSBpcyBub3QgZm91bmQgKHBhc3NlZCBpbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgbWFjcm8pLCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duIGJ5IGphdmFzY3JpcHQuXG4gKlxuICogICBJdCBpcyBhYnNvbHV0ZWx5IHBvc3NpYmxlIGZvciB5b3UgdG8gcmVjZWl2ZSBhbmQgc2VuZCBhcmd1bWVudHMgdmlhIHRoZXNlIGdlbmVyYXRlZCBcIm1hY3Jvc1wiLiBgbXl0aGl4LXVpLXNlYXJjaGAgZG9lcyB0aGlzIGZvclxuICogICBleGFtcGxlIHdoZW4gYSBcImZpbHRlclwiIG1ldGhvZCBpcyBwYXNzZWQgdmlhIGFuIGF0dHJpYnV0ZS4gQnkgZGVmYXVsdCBubyBleHRyYSBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIHdoZW4gY2FsbGVkIGRpcmVjdGx5IGJ5IHRoZSB0ZW1wbGF0aW5nIGVuZ2luZS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIEFuIG9iamVjdCB3aXRoIHRoZSBzaGFwZSBgeyBib2R5OiBzdHJpbmc7IHByZWZpeD86IHN0cmluZzsgc2NvcGU6IG9iamVjdDsgfWAuXG4gKlxuICogICAgICAgMS4gYGJvZHlgIGlzIHRoZSBhY3R1YWwgYm9keSBvZiB0aGUgYG5ldyBGdW5jdGlvbmAuXG4gKiAgICAgICAyLiBgc2NvcGVgIGlzIHRoZSBzY29wZSAoYHRoaXNgKSB0aGF0IHlvdSB3YW50IHRvIGJpbmQgdG8gdGhlIHJlc3VsdGluZyBtZXRob2QuXG4gKiAgICAgICAgICBUaGlzIHdvdWxkIGdlbmVyYWxseSBiZSBhIHNjb3BlIGNyZWF0ZWQgYnkgQHNlZSBVdGlscy5jcmVhdGVTY29wZTtcbiAqICAgICAgIDMuIGBwcmVmaXhgIGFuIG9wdGlvbmFsIHByZWZpeCBmb3IgdGhlIGJvZHkgb2YgdGhlIGBuZXcgRnVuY3Rpb25gLiBUaGlzIHByZWZpeCBpcyBhZGRlZFxuICogICAgICAgICAgYmVmb3JlIGFueSBmdW5jdGlvbiBib2R5IGNvZGUgdGhhdCBNeXRoaXggVUkgZ2VuZXJhdGVzLlxuICogICAgICAgICAgU2VlIGhlcmUgQHNvdXJjZVJlZiBfY3JlYXRlVGVtcGxhdGVNYWNyb1ByZWZpeEZvckJpbmRFdmVudFRvRWxlbWVudDsgZm9yIGFuIGV4YW1wbGUgdXNlXG4gKiAgICAgICAgICBvZiBgcHJlZml4YCAobm90aWNlIGhvdyBgYXJndW1lbnRzWzFdYCBpcyB1c2VkIGluc3RlYWQgb2YgYGFyZ3VtZW50c1swXWAsIGFzIGBhcmd1bWVudHNbMF1gIGlzIGFsd2F5cyByZXNlcnZlZFxuICogICAgICAgICAgZm9yIGxvY2FsIHZhcmlhYmxlIG5hbWVzIFwiaW5qZWN0ZWRcIiBmcm9tIHRoZSBjcmVhdGVkIFwic2NvcGVcIikuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IEFzaWRlIGZvciBzb21lIGJlaGluZC10aGUtc2NlbmUgbW9kaWZpY2F0aW9ucyBhbmQgZWFzZS1vZi11c2Ugc2xpY2tuZXNzLCB0aGlzIGVzc2VudGlhbGx5IGp1c3QgY3JlYXRlcyBhIGBuZXcgRnVuY3Rpb25gIGFuZCBiaW5kcyBhIFwic2NvcGVcIiAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KSB0byBpdC5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoZSBwcm92aWRlZCAoYW5kIG9wdGlvbmFsKSBgcHJlZml4YCBjYW4gYmUgdXNlZCBhcyB0aGUgc3RhcnQgb2YgdGhlIG1hY3JvIGBuZXcgRnVuY3Rpb25gIGJvZHkgY29kZS4gaS5lLiBAc2VlIFV0aWxzLmJpbmRFdmVudFRvRWxlbWVudDsgZG9lcyBleGFjdGx5IHRoaXMgdG8gYWxsb3cgZGlyZWN0IHNjb3BlZFxuICogICAgIGFjY2VzcyB0byB0aGUgYGV2ZW50YCBpbnN0YW5jZS4gQHNvdXJjZVJlZiBfY3JlYXRlVGVtcGxhdGVNYWNyb1ByZWZpeEZvckJpbmRFdmVudFRvRWxlbWVudDtcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoZSByZXR1cm4gbWV0aG9kIGlzIGJvdW5kIGJ5IGNhbGxpbmcgYC5iaW5kKHNjb3BlKWAuIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBtb2RpZnkgYHRoaXNgIGF0IHRoZSBjYWxsLXNpdGUuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGZ1bmN0aW9uOyBBIGZ1bmN0aW9uIHRoYXQgaXMgXCJjb250ZXh0IGF3YXJlXCIgYnkgYmVpbmcgYm91bmQgdG8gdGhlIHByb3ZpZGVkIGBzY29wZWAgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZU1hY3JvKHsgcHJlZml4LCBib2R5LCBzY29wZSB9KSB7XG4gIGxldCBmdW5jdGlvbkJvZHkgPSBib2R5O1xuICBpZiAoZnVuY3Rpb25Cb2R5LmNoYXJBdCgwKSA9PT0gJyUnIHx8IEVWRU5UX0FDVElPTl9KVVNUX05BTUUudGVzdChmdW5jdGlvbkJvZHkpKSB7XG4gICAgaWYgKGZ1bmN0aW9uQm9keS5jaGFyQXQoMCkgPT09ICclJykge1xuICAgICAgZnVuY3Rpb25Cb2R5ID0gYCh0aGlzLmR5bmFtaWNQcm9wSUQgfHwgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5keW5hbWljUHJvcElEKSgnJHtmdW5jdGlvbkJvZHkuc3Vic3RyaW5nKDEpLnRyaW0oKS5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9JylgO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jdGlvbkJvZHkgPSBgKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgX19fXyQgPSAke2Z1bmN0aW9uQm9keX07XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2YgX19fXyQgPT09ICdmdW5jdGlvbicpID8gX19fXyQuYXBwbHkodGhpcywgQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpKSA6IF9fX18kO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHtmdW5jdGlvbkJvZHkucmVwbGFjZSgvXlxccyp0aGlzXFwuLywgJycpfS5hcHBseSh0aGlzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICB9KSgpO2A7XG4gICAgfVxuICB9XG5cbiAgbGV0IGNvbnRleHRDYWxsQXJncyA9IGdldENvbnRleHRDYWxsQXJncyhzY29wZSwgeyAnX19tYWNyb1NvdXJjZSc6IG51bGwsICdfX2V4cGFuZGVkTWFjcm9Tb3VyY2UnOiBudWxsIH0pO1xuXG4gIGZ1bmN0aW9uQm9keSA9IGB0cnkgeyAkeyhwcmVmaXgpID8gYCR7cHJlZml4fTtgIDogJyd9cmV0dXJuICR7KGZ1bmN0aW9uQm9keSB8fCAnKHZvaWQgMCknKS5yZXBsYWNlKC9eXFxzKnJldHVyblxccysvLCAnJykudHJpbSgpfTsgfSBjYXRjaCAoZXJyb3IpIHsgY29uc29sZS5lcnJvcihcXGBFcnJvciBpbiBtYWNybyBbXFwke19fbWFjcm9Tb3VyY2V9XTpcXGAsIGVycm9yLCBfX2V4cGFuZGVkTWFjcm9Tb3VyY2UpOyB0aHJvdyBlcnJvcjsgfWA7XG5cbiAgbGV0IGxvY2FsU2NvcGUgPSBPYmplY3QuY3JlYXRlKHNjb3BlKTtcbiAgbG9jYWxTY29wZS5fX21hY3JvU291cmNlID0gYm9keTtcbiAgbG9jYWxTY29wZS5fX2V4cGFuZGVkTWFjcm9Tb3VyY2UgPSBmdW5jdGlvbkJvZHk7XG5cbiAgcmV0dXJuIChuZXcgRnVuY3Rpb24oY29udGV4dENhbGxBcmdzLCBmdW5jdGlvbkJvZHkpKS5iaW5kKHNjb3BlIHx8IHt9LCBzY29wZSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBQYXJzZSBhIHRlbXBsYXRlLCBhbmQgcmV0dXJuIGl0cyBwYXJ0cy4gQSB0ZW1wbGF0ZSBcInBhcnRcIiBpcyBvbmUgb2YgdHdvIHR5cGVzOiBgJ2xpdGVyYWwnYCwgb3IgYCdtYWNybydgLlxuICpcbiAqICAgVGFrZSBmb3IgZXhhbXBsZSB0aGUgZm9sbG93aW5nIHRlbXBsYXRlOiBgJ0hlbGxvIFxcQEBncmVldGluZ0BAISEhJ2AuIFRoaXMgdGVtcGxhdGUgd291bGQgcmVzdWx0IGluIHRocmVlIFwicGFydHNcIiBhZnRlciBwYXJzaW5nOlxuICogICAxLiBgeyB0eXBlOiAnbGl0ZXJhbCcsIHNvdXJjZTogJ0hlbGxvICcsIHN0YXJ0OiAwLCBlbmQ6IDYgfWBcbiAqICAgMi4gYHsgdHlwZTogJ21hY3JvJywgc291cmNlOiAnXFxAQGdyZWV0aW5nQEAnLCBtYWNybzogPGZ1bmN0aW9uPiwgc3RhcnQ6IDYsIGVuZDogMTggfWBcbiAqICAgMy4gYHsgdHlwZTogJ2xpdGVyYWwnLCBzb3VyY2U6ICchISEnLCBzdGFydDogMTgsIGVuZDogMjEgfWBcbiAqXG4gKiAgIENvbmNhdGVuYXRpbmcgYWxsIGBzb3VyY2VgIHByb3BlcnRpZXMgdG9nZXRoZXIgd2lsbCByZXN1bHQgaW4gdGhlIG9yaWdpbmFsIGlucHV0LlxuICogICBDb25jYXRlbmF0aW5nIGFsbCBgc291cmNlYCBwcm9wZXJ0aWVzLCBhbG9uZyB3aXRoIHRoZSByZXN1bHQgb2YgY2FsbGluZyBhbGwgYG1hY3JvYCBmdW5jdGlvbnMsIHdpbGwgcmVzdWx0IGluIHRoZSBvdXRwdXQgKGkuZS4gYHBhcnRbMF0uc291cmNlICsgcGFydFsxXS5tYWNybygpICsgcGFydFsyXS5zb3VyY2VgKS5cbiAqICAgVGhlIGBtYWNyb2AgcHJvcGVydHkgaXMgdGhlIGFjdHVhbCBtYWNybyBmdW5jdGlvbiBmb3IgdGhlIHBhcnNlZCB0ZW1wbGF0ZSBwYXJ0IChpLmUuIGluIG91ciBleGFtcGxlIGAnXFxAQGdyZWV0aW5nQEAnYCkuXG4gKiAgIGBzdGFydGAgYW5kIGBlbmRgIGFyZSB0aGUgb2Zmc2V0cyBmcm9tIHRoZSBvcmlnaW5hbCBgdGV4dGAgd2hlcmUgdGhlIHBhcnQgY2FuIGJlIGZvdW5kLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHRleHRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIHRlbXBsYXRlIHN0cmluZyB0byBwYXJzZS5cbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIE9wdGlvbnMgZm9yIHRoZSBvcGVyYXRpb24uIFRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdCBpcyBgeyBwcmVmaXg/OiBzdHJpbmcsIHNjb3BlOiBvYmplY3QgfWAuXG4gKiAgICAgICBgc2NvcGVgIGRlZmluZXMgdGhlIHNjb3BlIGZvciBtYWNyb3MgY3JlYXRlZCBieSB0aGlzIG1ldGhvZCAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KS5cbiAqICAgICAgIGBwcmVmaXhgIGRlZmluZXMgYSBmdW5jdGlvbiBib2R5IHByZWZpeCB0byB1c2Ugd2hpbGUgY3JlYXRpbmcgbWFjcm9zIChzZWUgQHNlZSBVdGlscy5jcmVhdGVUZW1wbGF0ZU1hY3JvOykuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRvIHNraXAgcGFyc2luZyBhIHNwZWNpZmljIHRlbXBsYXRlIHBhcnQsIHByZWZpeCB3aXRoIGEgYmFja3NsYXNoLCBpLmUuIGBcXFxcXFxcXEBAZ3JlZXRpbmdAQGAuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIEFycmF5PFRlbXBsYXRlUGFydD47ICoqVGVtcGxhdGVQYXJ0Kio6IGB7IHR5cGU6ICdsaXRlcmFsJyB8ICdtYWNybycsIHNvdXJjZTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgbWFjcm8/OiBmdW5jdGlvbiB9YC4gUmV0dXJuIGFsbCBwYXJzZWQgcGFydHMgb2YgdGhlIHRlbXBsYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZVBhcnRzKHRleHQsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCBwYXJ0cyAgICAgICAgID0gW107XG4gIGxldCBjdXJyZW50T2Zmc2V0ID0gMDtcblxuICBjb25zdCBhZGRMaXRlcmFsID0gKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpID0+IHtcbiAgICBsZXQgc291cmNlID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkucmVwbGFjZSgvXFxcXEBAL2csICdAQCcpO1xuICAgIHBhcnRzLnB1c2goeyB0eXBlOiAnbGl0ZXJhbCcsIHNvdXJjZSwgc3RhcnQ6IHN0YXJ0T2Zmc2V0LCBlbmQ6IGVuZE9mZnNldCB9KTtcbiAgfTtcblxuICB0ZXh0LnJlcGxhY2UoLyg/PCFcXFxcKShAQCkoLis/KVxcMS9nLCAobSwgXywgcGFyc2VkVGV4dCwgb2Zmc2V0KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRPZmZzZXQgPCBvZmZzZXQpXG4gICAgICBhZGRMaXRlcmFsKGN1cnJlbnRPZmZzZXQsIG9mZnNldCk7XG5cbiAgICBjdXJyZW50T2Zmc2V0ID0gb2Zmc2V0ICsgbS5sZW5ndGg7XG5cbiAgICBsZXQgbWFjcm8gPSBjcmVhdGVUZW1wbGF0ZU1hY3JvKHsgLi4ub3B0aW9ucywgYm9keTogcGFyc2VkVGV4dCB9KTtcbiAgICBwYXJ0cy5wdXNoKHsgdHlwZTogJ21hY3JvJywgc291cmNlOiBtLCBtYWNybywgc3RhcnQ6IG9mZnNldCwgZW5kOiBjdXJyZW50T2Zmc2V0IH0pO1xuICB9KTtcblxuICBpZiAoY3VycmVudE9mZnNldCA8IHRleHQubGVuZ3RoKVxuICAgIGFkZExpdGVyYWwoY3VycmVudE9mZnNldCwgdGV4dC5sZW5ndGgpO1xuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuY29uc3QgTk9PUCA9IChpdGVtKSA9PiBpdGVtO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29tcGlsZSB0aGUgdGVtcGxhdGUgcGFydHMgdGhhdCB3ZXJlIHBhcnNlZCBieSBAc2VlIFV0aWxzLnBhcnNlVGVtcGxhdGVQYXJ0czsuXG4gKlxuICogICBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHByb3ZpZGUgdGhpcyBtZXRob2QgYW4gYXJyYXkgb2YgQHNlZSBFbGVtZW50cy5FbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLFxuICogICBvciBAc2VlIFF1ZXJ5RW5naW5lLlF1ZXJ5RW5naW5lOyBpbnN0YW5jZXMgKHRoYXQgY29udGFpbiBAc2VlIEVsZW1lbnRzLkVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMpLlxuICogICBJZiBlaXRoZXIgb2YgdGhlc2UgdHlwZXMgYXJlIGZvdW5kIGluIHRoZSBpbnB1dCBhcnJheSAoZXZlbiBvbmUpLCB0aGVuIHRoZSBlbnRpcmUgcmVzdWx0IGlzIHJldHVybmVkXG4gKiAgIGFzIGEgcmF3IGFycmF5LlxuICpcbiAqICAgT3IsIGlmIGFueSBvZiB0aGUgcmVzdWx0aW5nIHBhcnRzIGlzICoqbm90KiogYSBAc2VlIFV0aWxzLnBhcnNlVGVtcGxhdGVQYXJ0cz9jYXB0aW9uPVRlbXBsYXRlUGFydDsgb3IgYSBgc3RyaW5nYCxcbiAqICAgdGhlbiByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSByYXcuXG4gKlxuICogICBPdGhlcndpc2UsIGlmIGFsbCByZXN1bHRpbmcgcGFydHMgYXJlIGEgYHN0cmluZ2AsIHRoZW4gdGhlIHJlc3VsdGluZyBwYXJ0cyBhcmUgam9pbmVkLCBhbmQgYSBgc3RyaW5nYCBpcyByZXR1cm5lZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBwYXJ0c1xuICogICAgIGRhdGFUeXBlczpcbiAqICAgICAgIC0gQXJyYXk8VGVtcGxhdGVQYXJ0PlxuICogICAgICAgLSBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cbiAqICAgICAgIC0gQXJyYXk8UXVlcnlFbmdpbmU+XG4gKiAgICAgICAtIEFycmF5PGFueT5cbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgdGVtcGxhdGUgcGFydHMgdG8gY29tcGlsZSB0b2dldGhlci5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQXJyYXk8YW55PjsgQHR5cGVzIHN0cmluZzsgUmV0dXJuIHRoZSByZXN1bHQgYXMgYSBzdHJpbmcsIG9yIGFuIGFycmF5IG9mIHJhdyB2YWx1ZXMsIG9yIGEgcmF3IHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlRnJvbVBhcnRzKHBhcnRzLCBjYWxsYmFjaykge1xuICBsZXQgcmVzdWx0ID0gcGFydHNcbiAgICAubWFwKChwYXJ0KSA9PiB7XG4gICAgICBpZiAoIXBhcnQpXG4gICAgICAgIHJldHVybiBwYXJ0O1xuXG4gICAgICBpZiAocGFydFtNWVRISVhfVFlQRV0gPT09IEVMRU1FTlRfREVGSU5JVElPTl9UWVBFIHx8IHBhcnRbTVlUSElYX1RZUEVdID09PSBRVUVSWV9FTkdJTkVfVFlQRSlcbiAgICAgICAgcmV0dXJuIHBhcnQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChwYXJ0LnR5cGUgPT09ICdsaXRlcmFsJylcbiAgICAgICAgICByZXR1cm4gcGFydC5zb3VyY2U7XG4gICAgICAgIGVsc2UgaWYgKHBhcnQudHlwZSA9PT0gJ21hY3JvJylcbiAgICAgICAgICByZXR1cm4gcGFydC5tYWNybygpO1xuXG4gICAgICAgIHJldHVybiBwYXJ0O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4gcGFydC5zb3VyY2U7XG4gICAgICB9XG4gICAgfSlcbiAgICAubWFwKGNhbGxiYWNrIHx8IE5PT1ApXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gKGl0ZW0gIT0gbnVsbCAmJiBpdGVtICE9PSAnJykpO1xuXG4gIGlmIChyZXN1bHQuc29tZSgoaXRlbSkgPT4gKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSB8fCBpdGVtW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpKSlcbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIGlmIChyZXN1bHQuc29tZSgoaXRlbSkgPT4gQmFzZVV0aWxzLmlzVHlwZShpdGVtLCAnOjpTdHJpbmcnKSkpXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblxuICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPCAyKSA/IHJlc3VsdFswXSA6IHJlc3VsdDtcbn1cblxuY29uc3QgRk9STUFUX1RFUk1fQUxMT1dBQkxFX05PREVTID0gWyAzLCAyIF07IC8vIFRFWFRfTk9ERSwgQVRUUklCVVRFX05PREVcblxuLyoqXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIEdpdmVuIGEgTm9kZSwgdGFrZSB0aGUgYC5ub2RlVmFsdWVgIG9mIHRoYXQgbm9kZSwgYW5kIGlmIGl0IGlzIGEgdGVtcGxhdGUsXG4gKiAgIHBhcnNlIHRoYXQgdGVtcGxhdGUgdXNpbmcgQHNlZSBVdGlscy5wYXJzZVRlbXBsYXRlUGFydHM7LCBhbmQgdGhlblxuICogICBjb21waWxlIHRoYXQgdGVtcGxhdGUgdXNpbmcgQHNlZSBVdGlscy5jb21waWxlVGVtcGxhdGVGcm9tUGFydHM7LiBUaGVcbiAqICAgcmVzdWx0aW5nIHRlbXBsYXRlIHBhcnRzIGFyZSB0aGVuIHNjYW5uZWQuIElmIGFueSBvZiB0aGUgYG1hY3JvKClgIGNhbGxzXG4gKiAgIHJlc3VsdCBpbiBhIEBzZWUgRHluYW1pY1Byb3BlcnR5P2NhcHRpb249RHluYW1pY1Byb3BlcnR5OywgdGhlbiBzZXQgdXBcbiAqICAgbGlzdGVuZXJzIHZpYSBgYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgLi4uKWAgb24gZWFjaCB0byBsaXN0ZW4gZm9yXG4gKiAgIGNoYW5nZXMgdG8gZHluYW1pYyBwcm9wZXJ0aWVzLiBXaGVuIGEgbGlzdGVuZXIgdXBkYXRlcywgdGhlIHRlbXBsYXRlIHBhcnRzXG4gKiAgIGFyZSByZWNvbXBpbGVkLCBhbmQgdGhlIGAubm9kZVZhbHVlYCBpcyBzZXQgYWdhaW4gd2l0aCB0aGUgbmV3IHJlc3VsdC5cbiAqXG4gKiAgIEluIHNob3J0LCB0aGlzIG1ldGhvZCBmb3JtYXRzIHRoZSB2YWx1ZSBvZiBhIE5vZGUgaWYgdGhlIHZhbHVlIGlzIGEgdGVtcGxhdGUsXG4gKiAgIGFuZCBpbiBkb2luZyBzbyBiaW5kcyB0byBkeW5hbWljIHByb3BlcnRpZXMgZm9yIGZ1dHVyZSB1cGRhdGVzIHRvIHRoaXMgbm9kZS5cbiAqXG4gKiAgIElmIHRoZSBgLm5vZGVWYWx1ZWAgb2YgdGhlIE5vZGUgaXMgZGV0ZWN0ZWQgdG8gKipub3QqKiBiZSBhIHRlbXBsYXRlLCB0aGVuXG4gKiAgIHRoZSByZXN1bHQgaXMgYSBuby1vcGVyYXRpb24sIGFuZCB0aGUgcmF3IHZhbHVlIG9mIHRoZSBOb2RlIGlzIHNpbXBseSByZXR1cm5lZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBub2RlXG4gKiAgICAgZGF0YVR5cGU6IE5vZGVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgTm9kZSB3aG9zZSB2YWx1ZSBzaG91bGQgYmUgZm9ybWF0dGVkLiBUaGlzIG11c3QgYmUgYSBURVhUX05PREUgb3IgYSBBVFRSSUJVVEVfTk9ERS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgcmVzdWx0aW5nIG5vZGUgdmFsdWUuIElmIGEgdGVtcGxhdGUgd2FzIHN1Y2Nlc3NmdWxseSBjb21waWxlZCwgZHluYW1pYyBwcm9wZXJ0aWVzXG4gKiAgIGFyZSBhbHNvIGxpc3RlbmVkIHRvIGZvciBmdXR1cmUgdXBkYXRlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE5vZGVWYWx1ZShub2RlLCBfb3B0aW9ucykge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICYmICgvXihzdHlsZXxzY3JpcHQpJC8pLnRlc3Qobm9kZS5wYXJlbnROb2RlLmxvY2FsTmFtZSkpXG4gICAgcmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG4gIGlmICghbm9kZSB8fCBGT1JNQVRfVEVSTV9BTExPV0FCTEVfTk9ERVMuaW5kZXhPZihub2RlLm5vZGVUeXBlKSA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJmb3JtYXROb2RlVmFsdWVcIiB1bnN1cHBvcnRlZCBub2RlIHR5cGUgcHJvdmlkZWQuIE9ubHkgVEVYVF9OT0RFIGFuZCBBVFRSSUJVVEVfTk9ERSB0eXBlcyBhcmUgc3VwcG9ydGVkLicpO1xuXG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCB0ZXh0ICAgICAgICAgID0gbm9kZS5ub2RlVmFsdWU7XG4gIGxldCB0ZW1wbGF0ZVBhcnRzID0gcGFyc2VUZW1wbGF0ZVBhcnRzKHRleHQsIG9wdGlvbnMpO1xuXG4gIC8vIHRlbXBsYXRlUGFydHMuZm9yRWFjaCgoeyB0eXBlLCBtYWNybyB9KSA9PiB7XG4gIC8vICAgaWYgKHR5cGUgIT09ICdtYWNybycpXG4gIC8vICAgICByZXR1cm47XG5cbiAgLy8gICBsZXQgcmVzdWx0ID0gbWFjcm8oKTtcbiAgLy8gICBpZiAob3B0aW9ucy5iaW5kVG9EeW5hbWljUHJvcGVydGllcyAhPT0gZmFsc2UgJiYgaXNUeXBlKHJlc3VsdCwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAvLyAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsICgpID0+IHtcbiAgLy8gICAgICAgbGV0IHJlc3VsdCA9ICgnJyArIGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzKSk7XG4gIC8vICAgICAgIGlmIChyZXN1bHQgIT09IG5vZGUubm9kZVZhbHVlKVxuICAvLyAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gcmVzdWx0O1xuICAvLyAgICAgfSwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgbGV0IHJlc3VsdCA9IGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzLCAocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdCAmJiBvcHRpb25zLmJpbmRUb0R5bmFtaWNQcm9wZXJ0aWVzICE9PSBmYWxzZSAmJiBCYXNlVXRpbHMuaXNUeXBlKHJlc3VsdCwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICgnJyArIGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzKSk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5vZGUubm9kZVZhbHVlKVxuICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gcmVzdWx0O1xuICAgICAgfSwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xuXG4gIGlmIChyZXN1bHQgPT0gbnVsbClcbiAgICByZXN1bHQgPSAnJztcblxuICByZXR1cm4gKG9wdGlvbnMuZGlzYWxsb3dIVE1MID09PSB0cnVlKSA/ICgnJyArIHJlc3VsdCkgOiByZXN1bHQ7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFID0gLyg/PCFcXFxcKUBALztcbmV4cG9ydCBmdW5jdGlvbiBpc1RlbXBsYXRlKHZhbHVlKSB7XG4gIGlmICghQmFzZVV0aWxzLmlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJykpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBJU19URU1QTEFURS50ZXN0KHZhbHVlKTtcbn1cblxuY29uc3QgSVNfRVZFTlRfTkFNRSAgICAgPSAvXm9uLztcbmNvbnN0IEVWRU5UX05BTUVfQ0FDSEUgID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsRXZlbnROYW1lc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICBsZXQgdGFnTmFtZSA9ICghZWxlbWVudC50YWdOYW1lKSA/IGVsZW1lbnQgOiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgbGV0IGNhY2hlICAgPSBFVkVOVF9OQU1FX0NBQ0hFLmdldCh0YWdOYW1lKTtcbiAgaWYgKGNhY2hlKVxuICAgIHJldHVybiBjYWNoZTtcblxuICBsZXQgZXZlbnROYW1lcyA9IFtdO1xuXG4gIGZvciAobGV0IGtleSBpbiBlbGVtZW50KSB7XG4gICAgaWYgKGtleS5sZW5ndGggPiAyICYmIElTX0VWRU5UX05BTUUudGVzdChrZXkpKVxuICAgICAgZXZlbnROYW1lcy5wdXNoKGtleS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIEVWRU5UX05BTUVfQ0FDSEUuc2V0KHRhZ05hbWUsIGV2ZW50TmFtZXMpO1xuXG4gIHJldHVybiBldmVudE5hbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZEV2ZW50VG9FbGVtZW50KGVsZW1lbnQsIGV2ZW50TmFtZSwgX2NhbGxiYWNrKSB7XG4gIGxldCBvcHRpb25zID0ge307XG4gIGxldCBjYWxsYmFjaztcblxuICBpZiAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoX2NhbGxiYWNrKSkge1xuICAgIGNhbGxiYWNrICA9IF9jYWxsYmFjay5jYWxsYmFjaztcbiAgICBvcHRpb25zICAgPSBfY2FsbGJhY2sub3B0aW9ucyB8fCB7fTtcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayA9IF9jYWxsYmFjaztcbiAgfVxuXG4gIGlmIChCYXNlVXRpbHMuaXNUeXBlKGNhbGxiYWNrLCAnOjpTdHJpbmcnKSlcbiAgICBjYWxsYmFjayA9IGNyZWF0ZVRlbXBsYXRlTWFjcm8oeyBwcmVmaXg6ICdsZXQgZXZlbnQ9YXJndW1lbnRzWzFdJywgYm9keTogY2FsbGJhY2ssIHNjb3BlOiB0aGlzIH0pOyAvLyBAcmVmOl9jcmVhdGVUZW1wbGF0ZU1hY3JvUHJlZml4Rm9yQmluZEV2ZW50VG9FbGVtZW50XG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuXG4gIHJldHVybiB7IGNhbGxiYWNrLCBvcHRpb25zIH07XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE5ldyBFdmVudCBTeXN0ZW0gKGRhdGEtZXZlbnQtb257ZXZlbnROYW1lfSBhdHRyaWJ1dGVzKVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIENoZWNrIGlmIGFuIGVsZW1lbnQgaXMgYSBNeXRoaXhDb21wb25lbnQgb3IgV2ViQ29tcG9uZW50LlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBhIE15dGhpeENvbXBvbmVudCBvciBXZWJDb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIGlzTXl0aGl4T3JXZWJDb21wb25lbnQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQgfHwgZWxlbWVudC5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIENoZWNrIGZvciBNeXRoaXhDb21wb25lbnQgdmlhIE1ZVEhJWF9UWVBFXG4gIHRyeSB7XG4gICAgaWYgKGVsZW1lbnRbTVlUSElYX1RZUEVdID09PSBNWVRISVhfVUlfQ09NUE9ORU5UX1RZUEUpXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIElnbm9yZSBlcnJvcnNcbiAgfVxuXG4gIC8vIENoZWNrIGZvciBjdXN0b20gZWxlbWVudCAoV2ViQ29tcG9uZW50KSB2aWEgaHlwaGVuYXRlZCB0YWcgbmFtZVxuICBsZXQgdGFnTmFtZSA9IGVsZW1lbnQudGFnTmFtZTtcbiAgaWYgKHRhZ05hbWUgJiYgdGFnTmFtZS5pbmNsdWRlcygnLScpKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhcmVudCBlbGVtZW50LCBjcm9zc2luZyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB3aG9zZSBwYXJlbnQgdG8gZmluZC5cbiAqIEByZXR1cm5zIHtFbGVtZW50fG51bGx9IFRoZSBwYXJlbnQgZWxlbWVudCBvciBudWxsIGlmIGF0IGJvdW5kYXJ5LlxuICovXG5mdW5jdGlvbiBnZXRFdmVudFBhcmVudEVsZW1lbnQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gVHJ5IHJlZ3VsYXIgcGFyZW50RWxlbWVudCBmaXJzdFxuICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybiBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgLy8gQ3Jvc3MgU2hhZG93IERPTSBib3VuZGFyeSB2aWEgZ2V0Um9vdE5vZGUoKS5ob3N0XG4gIGxldCByb290ID0gZWxlbWVudC5nZXRSb290Tm9kZSgpO1xuICBpZiAocm9vdCAmJiByb290ICE9PSBlbGVtZW50ICYmIHJvb3QuaG9zdClcbiAgICByZXR1cm4gcm9vdC5ob3N0O1xuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHNjYW5uaW5nIHByb3h5IHRoYXQgbG9va3MgdXAgcHJvcGVydGllcyBieSB0cmF2ZXJzaW5nIHRoZSBET00uXG4gKiBTdGFydHMgZnJvbSB0aGUgYm91bmQgZWxlbWVudCwgc2NhbnMgdXAgdmlhIHBhcmVudEVsZW1lbnQsXG4gKiBjcm9zc2VzIFNoYWRvdyBET00gdmlhIGdldFJvb3ROb2RlKCkuaG9zdCwgYW5kIHN0b3BzIGF0IE15dGhpeENvbXBvbmVudC9XZWJDb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBzdGFydEVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBzdGFydCBzY2FubmluZyBmcm9tLlxuICogQHJldHVybnMge1Byb3h5fSBBIHByb3h5IHRoYXQgcmVzb2x2ZXMgcHJvcGVydHkgbG9va3VwcyB2aWEgRE9NIHRyYXZlcnNhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjYW5uaW5nUHJveHkoc3RhcnRFbGVtZW50KSB7XG4gIGNvbnN0IHNjYW5Gb3JQcm9wZXJ0eSA9IChwcm9wTmFtZSkgPT4ge1xuICAgIGxldCBjdXJyZW50RWxlbWVudCA9IHN0YXJ0RWxlbWVudDtcblxuICAgIHdoaWxlIChjdXJyZW50RWxlbWVudCkge1xuICAgICAgLy8gQ2hlY2sgaWYgcHJvcGVydHkgZXhpc3RzIG9uIHRoaXMgZWxlbWVudFxuICAgICAgaWYgKHByb3BOYW1lIGluIGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGN1cnJlbnRFbGVtZW50W3Byb3BOYW1lXTtcblxuICAgICAgICAvLyBCaW5kIGZ1bmN0aW9ucyB0byB0aGUgZWxlbWVudCB0aGV5IHdlcmUgZm91bmQgb25cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICByZXR1cm4geyBmb3VuZDogdHJ1ZSwgdmFsdWU6IHZhbHVlLmJpbmQoY3VycmVudEVsZW1lbnQpLCBlbGVtZW50OiBjdXJyZW50RWxlbWVudCB9O1xuXG4gICAgICAgIHJldHVybiB7IGZvdW5kOiB0cnVlLCB2YWx1ZSwgZWxlbWVudDogY3VycmVudEVsZW1lbnQgfTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgaWYgd2UndmUgaGl0IGEgTXl0aGl4Q29tcG9uZW50L1dlYkNvbXBvbmVudCBib3VuZGFyeVxuICAgICAgaWYgKGlzTXl0aGl4T3JXZWJDb21wb25lbnQoY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICAgIC8vIFdlIGZvdW5kIHRoZSBib3VuZGFyeSBidXQgcHJvcGVydHkgd2Fzbid0IG9uIGl0IC0gc3RvcCBzZWFyY2hpbmdcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIE1vdmUgdG8gcGFyZW50LCBjcm9zc2luZyBTaGFkb3cgRE9NIGlmIG5lZWRlZFxuICAgICAgY3VycmVudEVsZW1lbnQgPSBnZXRFdmVudFBhcmVudEVsZW1lbnQoY3VycmVudEVsZW1lbnQpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgcGFyZW50IGlzIGEgTXl0aGl4Q29tcG9uZW50IGJvdW5kYXJ5XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgJiYgaXNNeXRoaXhPcldlYkNvbXBvbmVudChjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgICAgLy8gQ2hlY2sgdGhpcyBjb21wb25lbnQgZm9yIHRoZSBwcm9wZXJ0eSBiZWZvcmUgc3RvcHBpbmdcbiAgICAgICAgaWYgKHByb3BOYW1lIGluIGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gY3VycmVudEVsZW1lbnRbcHJvcE5hbWVdO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICByZXR1cm4geyBmb3VuZDogdHJ1ZSwgdmFsdWU6IHZhbHVlLmJpbmQoY3VycmVudEVsZW1lbnQpLCBlbGVtZW50OiBjdXJyZW50RWxlbWVudCB9O1xuXG4gICAgICAgICAgcmV0dXJuIHsgZm91bmQ6IHRydWUsIHZhbHVlLCBlbGVtZW50OiBjdXJyZW50RWxlbWVudCB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIFN0b3AgYXQgdGhpcyBib3VuZGFyeVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geyBmb3VuZDogZmFsc2UgfTtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBzaGFsbG93IHByb3h5IC0gcmV0dXJuIHJlYWwgb2JqZWN0cyBhZnRlciBmaXJzdCBsb29rdXBcbiAgcmV0dXJuIG5ldyBQcm94eSh7fSwge1xuICAgIGhhczogKF8sIHByb3BOYW1lKSA9PiB7XG4gICAgICAvLyBBbGxvdyBnbG9iYWwgYWNjZXNzIHRvIHBhc3MgdGhyb3VnaFxuICAgICAgaWYgKHByb3BOYW1lID09PSAnY29uc29sZScgfHwgcHJvcE5hbWUgPT09ICd3aW5kb3cnIHx8IHByb3BOYW1lID09PSAnZG9jdW1lbnQnIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdnbG9iYWxUaGlzJyB8fCBwcm9wTmFtZSA9PT0gJ01hdGgnIHx8IHByb3BOYW1lID09PSAnSlNPTicgfHxcbiAgICAgICAgICBwcm9wTmFtZSA9PT0gJ0RhdGUnIHx8IHByb3BOYW1lID09PSAnQXJyYXknIHx8IHByb3BOYW1lID09PSAnT2JqZWN0JyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAnU3RyaW5nJyB8fCBwcm9wTmFtZSA9PT0gJ051bWJlcicgfHwgcHJvcE5hbWUgPT09ICdCb29sZWFuJyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAnU3ltYm9sJyB8fCBwcm9wTmFtZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcE5hbWUgPT09ICdudWxsJyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAnSW5maW5pdHknIHx8IHByb3BOYW1lID09PSAnTmFOJyB8fCBwcm9wTmFtZSA9PT0gJ3BhcnNlSW50JyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAncGFyc2VGbG9hdCcgfHwgcHJvcE5hbWUgPT09ICdpc05hTicgfHwgcHJvcE5hbWUgPT09ICdpc0Zpbml0ZScgfHxcbiAgICAgICAgICBwcm9wTmFtZSA9PT0gJ2VuY29kZVVSSScgfHwgcHJvcE5hbWUgPT09ICdkZWNvZGVVUkknIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdlbmNvZGVVUklDb21wb25lbnQnIHx8IHByb3BOYW1lID09PSAnZGVjb2RlVVJJQ29tcG9uZW50Jykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3VsdCA9IHNjYW5Gb3JQcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmZvdW5kO1xuICAgIH0sXG4gICAgZ2V0OiAoXywgcHJvcE5hbWUpID0+IHtcbiAgICAgIC8vIEhhbmRsZSBzcGVjaWFsIGNhc2VzIGZvciBnbG9iYWwgYWNjZXNzXG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdjb25zb2xlJylcbiAgICAgICAgcmV0dXJuIGNvbnNvbGU7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICd3aW5kb3cnKVxuICAgICAgICByZXR1cm4gZ2xvYmFsVGhpcy53aW5kb3c7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdkb2N1bWVudCcpXG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLmRvY3VtZW50O1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnZ2xvYmFsVGhpcycpXG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnTWF0aCcpXG4gICAgICAgIHJldHVybiBNYXRoO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnSlNPTicpXG4gICAgICAgIHJldHVybiBKU09OO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnRGF0ZScpXG4gICAgICAgIHJldHVybiBEYXRlO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnQXJyYXknKVxuICAgICAgICByZXR1cm4gQXJyYXk7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdPYmplY3QnKVxuICAgICAgICByZXR1cm4gT2JqZWN0O1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnU3RyaW5nJylcbiAgICAgICAgcmV0dXJuIFN0cmluZztcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ051bWJlcicpXG4gICAgICAgIHJldHVybiBOdW1iZXI7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdCb29sZWFuJylcbiAgICAgICAgcmV0dXJuIEJvb2xlYW47XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdTeW1ib2wnKVxuICAgICAgICByZXR1cm4gU3ltYm9sO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAncGFyc2VJbnQnKVxuICAgICAgICByZXR1cm4gcGFyc2VJbnQ7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdwYXJzZUZsb2F0JylcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQ7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdpc05hTicpXG4gICAgICAgIHJldHVybiBpc05hTjtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2lzRmluaXRlJylcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnZW5jb2RlVVJJJylcbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSTtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2RlY29kZVVSSScpXG4gICAgICAgIHJldHVybiBkZWNvZGVVUkk7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdlbmNvZGVVUklDb21wb25lbnQnKVxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50O1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnZGVjb2RlVVJJQ29tcG9uZW50JylcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudDtcblxuICAgICAgbGV0IHJlc3VsdCA9IHNjYW5Gb3JQcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICBpZiAocmVzdWx0LmZvdW5kKVxuICAgICAgICByZXR1cm4gcmVzdWx0LnZhbHVlO1xuXG4gICAgICAvLyBSZXR1cm4gdW5kZWZpbmVkIGZvciBub3QgZm91bmQgKGFsbG93cyBnbG9iYWwgZmFsbGJhY2sgaW4gRnVuY3Rpb24pXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0OiAoXywgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gc2NhbkZvclByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIGlmIChyZXN1bHQuZm91bmQgJiYgcmVzdWx0LmVsZW1lbnQpIHtcbiAgICAgICAgcmVzdWx0LmVsZW1lbnRbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBub3QgZm91bmQsIHNldCBvbiB0aGUgc3RhcnQgZWxlbWVudFxuICAgICAgc3RhcnRFbGVtZW50W3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfSk7XG59XG5cbi8vIFBhdHRlcm4gdG8gZGV0ZWN0IHNpbXBsZSBwcm9wZXJ0eSByZWZlcmVuY2VzIChlLmcuLCBcInRoaXMuaGFuZGxlQ2xpY2tcIiwgXCJzdGF0ZS5oYW5kbGVyXCIsIFwiaGFuZGxlQ2xpY2tcIilcbmNvbnN0IFNJTVBMRV9SRUZfUEFUVEVSTiA9IC9eKFxcdytcXC4pKlxcdyskLztcbi8vIFBhdHRlcm4gdG8gZGV0ZWN0IGZ1bmN0aW9uIGNhbGxzIChoYXMgcGFyZW50aGVzZXMpXG5jb25zdCBIQVNfQ0FMTF9QQVRURVJOID0gL1xcKC87XG4vLyBQYXR0ZXJuIHRvIGRldGVjdCBiYXJlIG1ldGhvZCBuYW1lcyAoanVzdCBhbiBpZGVudGlmaWVyIHdpdGggbm8gZG90cyBvciBwYXJlbnMpXG5jb25zdCBCQVJFX01FVEhPRF9QQVRURVJOID0gL15cXHcrJC87XG5cbi8qKlxuICogR2VuZXJpYyBldmVudCB3cmFwcGVyIGZ1bmN0aW9uIGZvciBkYXRhLWV2ZW50LW9ue2V2ZW50TmFtZX0gYXR0cmlidXRlcy5cbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGJvdW5kIHRvIHRoZSBlbGVtZW50IHdpdGggdGhlIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIFRoZSBET00gZXZlbnQgb2JqZWN0LlxuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHQgb2YgdGhlIGV2ZW50IGhhbmRsZXIgZXhwcmVzc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG15dGhpeEV2ZW50V3JhcHBlcihldmVudCkge1xuICAvLyBgdGhpc2AgaXMgdGhlIGVsZW1lbnQgd2l0aCB0aGUgZGF0YS1ldmVudC1vbiogYXR0cmlidXRlXG4gIGNvbnN0IGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XG4gIGNvbnN0IGV4cHJlc3Npb24gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1ldmVudC1vbicgKyBldmVudFR5cGUpO1xuXG4gIGlmICghZXhwcmVzc2lvbilcbiAgICByZXR1cm47XG5cbiAgLy8gQ3JlYXRlIHNjYW5uaW5nIHByb3h5IHN0YXJ0aW5nIGZyb20gdGhpcyBlbGVtZW50XG4gIGNvbnN0IHByb3h5ID0gY3JlYXRlU2Nhbm5pbmdQcm94eSh0aGlzKTtcblxuICAvLyBEZXRlY3QgaWYgdGhpcyBpcyBhIHNpbXBsZSByZWZlcmVuY2UgdnMgYSBjb21wbGV4IGV4cHJlc3Npb25cbiAgY29uc3QgaXNTaW1wbGVSZWYgPSBTSU1QTEVfUkVGX1BBVFRFUk4udGVzdChleHByZXNzaW9uKTtcbiAgY29uc3QgaGFzQ2FsbCA9IEhBU19DQUxMX1BBVFRFUk4udGVzdChleHByZXNzaW9uKTtcbiAgY29uc3QgbmVlZHNJbnZva2UgPSAoaXNTaW1wbGVSZWYgJiYgIWhhc0NhbGwpO1xuXG4gIC8vIE5vcm1hbGl6ZSBiYXJlIG1ldGhvZCBuYW1lcyBieSBwcmVwZW5kaW5nIFwidGhpcy5cIlxuICBjb25zdCBub3JtYWxpemVkRXhwciA9IEJBUkVfTUVUSE9EX1BBVFRFUk4udGVzdChleHByZXNzaW9uKVxuICAgID8gJ3RoaXMuJyArIGV4cHJlc3Npb25cbiAgICA6IGV4cHJlc3Npb247XG5cbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgYSBmdW5jdGlvbiB0aGF0IGV2YWx1YXRlcyB0aGUgZXhwcmVzc2lvbiB3aXRoIHRoZSBwcm94eSBhcyBgdGhpc2BcbiAgICBjb25zdCBmbiA9IG5ldyBGdW5jdGlvbignZXZlbnQnLCBgXG4gICAgICBsZXQgX3Jlc3VsdCA9ICR7bm9ybWFsaXplZEV4cHJ9O1xuICAgICAgaWYgKHR5cGVvZiBfcmVzdWx0ID09PSAnZnVuY3Rpb24nICYmICR7bmVlZHNJbnZva2V9KSB7XG4gICAgICAgIHJldHVybiBfcmVzdWx0LmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHQ7XG4gICAgYCk7XG5cbiAgICByZXR1cm4gZm4uY2FsbChwcm94eSwgZXZlbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoYEV2ZW50IGhhbmRsZXIgZXJyb3IgZm9yIFwiJHtleHByZXNzaW9ufVwiOmAsIHsgZWxlbWVudDogdGhpcywgZXZlbnQsIGVycm9yIH0pO1xuICB9XG59XG5cbi8qKlxuICogQmluZCBhIGRhdGEtZXZlbnQtb257ZXZlbnROYW1lfSBhdHRyaWJ1dGUgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBiaW5kIHRoZSBldmVudCB0by5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWUgLSBUaGUgZXZlbnQgbmFtZSAoZS5nLiwgXCJjbGlja1wiLCBcInN1Ym1pdFwiKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmREYXRhRXZlbnRBdHRyaWJ1dGUoZWxlbWVudCwgZXZlbnROYW1lKSB7XG4gIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIG15dGhpeEV2ZW50V3JhcHBlci5iaW5kKGVsZW1lbnQpKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgYW5kIGJpbmQgYWxsIGRhdGEtZXZlbnQtb24qIGF0dHJpYnV0ZXMgb24gYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBwcm9jZXNzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZEFsbERhdGFFdmVudEF0dHJpYnV0ZXMoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQgfHwgdHlwZW9mIGVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMgIT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuO1xuXG4gIGNvbnN0IERBVEFfRVZFTlRfUFJFRklYID0gJ2RhdGEtZXZlbnQtb24nO1xuICBjb25zdCBhdHRyaWJ1dGVOYW1lcyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcblxuICBmb3IgKGxldCBpID0gMCwgaWwgPSBhdHRyaWJ1dGVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgbGV0IGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGVOYW1lc1tpXS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChhdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoREFUQV9FVkVOVF9QUkVGSVgpKSB7XG4gICAgICBsZXQgZXZlbnROYW1lID0gYXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoREFUQV9FVkVOVF9QUkVGSVgubGVuZ3RoKTtcbiAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgYmluZERhdGFFdmVudEF0dHJpYnV0ZShlbGVtZW50LCBldmVudE5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hQYXRoKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKG9iaiA9PSBudWxsIHx8IE9iamVjdC5pcyhvYmosIE5hTikgfHwgT2JqZWN0LmlzKG9iaiwgSW5maW5pdHkpIHx8IE9iamVjdC5pcyhvYmosIC1JbmZpbml0eSkpXG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICBpZiAoa2V5ID09IG51bGwgfHwgT2JqZWN0LmlzKGtleSwgTmFOKSB8fCBPYmplY3QuaXMoa2V5LCBJbmZpbml0eSkgfHwgT2JqZWN0LmlzKGtleSwgLUluZmluaXR5KSlcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gIGxldCBwYXJ0cyAgICAgICAgID0ga2V5LnNwbGl0KC8oPzwhXFxcXClcXC4vZykuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgY3VycmVudFZhbHVlICA9IG9iajtcblxuICBmb3IgKGxldCBpID0gMCwgaWwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgbGV0IHBhcnQgPSBwYXJ0c1tpXTtcbiAgICBsZXQgbmV4dFZhbHVlID0gY3VycmVudFZhbHVlW3BhcnRdO1xuICAgIGlmIChuZXh0VmFsdWUgPT0gbnVsbClcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgICBjdXJyZW50VmFsdWUgPSBuZXh0VmFsdWU7XG4gIH1cblxuICBpZiAoZ2xvYmFsVGhpcy5Ob2RlICYmIGN1cnJlbnRWYWx1ZSAmJiBjdXJyZW50VmFsdWUgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLk5vZGUgJiYgKGN1cnJlbnRWYWx1ZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgfHwgY3VycmVudFZhbHVlLm5vZGVUeXBlID09PSBOb2RlLkFUVFJJQlVURV9OT0RFKSlcbiAgICByZXR1cm4gY3VycmVudFZhbHVlLm5vZGVWYWx1ZTtcblxuICByZXR1cm4gKGN1cnJlbnRWYWx1ZSA9PSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6IGN1cnJlbnRWYWx1ZTtcbn1cblxuY29uc3QgQ0FDSEVEX1BST1BFUlRZX05BTUVTID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IFNLSVBfUFJPVE9UWVBFUyAgICAgICA9IFtcbiAgZ2xvYmFsVGhpcy5IVE1MRWxlbWVudCxcbiAgZ2xvYmFsVGhpcy5Ob2RlLFxuICBnbG9iYWxUaGlzLkVsZW1lbnQsXG4gIGdsb2JhbFRoaXMuT2JqZWN0LFxuICBnbG9iYWxUaGlzLkFycmF5LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbFByb3BlcnR5TmFtZXMoX29iaikge1xuICBpZiAoIUJhc2VVdGlscy5pc0NvbGxlY3RhYmxlKF9vYmopKVxuICAgIHJldHVybiBbXTtcblxuICBsZXQgY2FjaGVkTmFtZXMgPSBDQUNIRURfUFJPUEVSVFlfTkFNRVMuZ2V0KF9vYmopO1xuICBpZiAoY2FjaGVkTmFtZXMpXG4gICAgcmV0dXJuIGNhY2hlZE5hbWVzO1xuXG4gIGxldCBvYmogICA9IF9vYmo7XG4gIGxldCBuYW1lcyA9IG5ldyBTZXQoKTtcblxuICB3aGlsZSAob2JqKSB7XG4gICAgbGV0IG9iak5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBvYmpOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKVxuICAgICAgbmFtZXMuYWRkKG9iak5hbWVzW2ldKTtcblxuICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIGlmIChvYmogJiYgU0tJUF9QUk9UT1RZUEVTLmluZGV4T2Yob2JqLmNvbnN0cnVjdG9yKSA+PSAwKVxuICAgICAgYnJlYWs7XG4gIH1cblxuICBsZXQgZmluYWxOYW1lcyA9IEFycmF5LmZyb20obmFtZXMpO1xuICBDQUNIRURfUFJPUEVSVFlfTkFNRVMuc2V0KF9vYmosIGZpbmFsTmFtZXMpO1xuXG4gIHJldHVybiBmaW5hbE5hbWVzO1xufVxuXG5jb25zdCBMQU5HX1BST1ZJREVSX0RZTkFNSUNfUFJPUEVSVFlfQ0FDSEUgPSBuZXcgV2Vha01hcCgpO1xuZXhwb3J0IGZ1bmN0aW9uIGdldER5bmFtaWNQcm9wZXJ0eUZvclBhdGgoa2V5UGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIGxldCBpbnN0YW5jZUNhY2hlID0gTEFOR19QUk9WSURFUl9EWU5BTUlDX1BST1BFUlRZX0NBQ0hFLmdldCh0aGlzKTtcbiAgaWYgKCFpbnN0YW5jZUNhY2hlKSB7XG4gICAgaW5zdGFuY2VDYWNoZSA9IG5ldyBNYXAoKTtcbiAgICBMQU5HX1BST1ZJREVSX0RZTkFNSUNfUFJPUEVSVFlfQ0FDSEUuc2V0KHRoaXMsIGluc3RhbmNlQ2FjaGUpO1xuICB9XG5cbiAgbGV0IHByb3BlcnR5ID0gaW5zdGFuY2VDYWNoZS5nZXQoa2V5UGF0aCk7XG4gIGlmICghcHJvcGVydHkpIHtcbiAgICBwcm9wZXJ0eSA9IG5ldyBEeW5hbWljUHJvcGVydHkoZGVmYXVsdFZhbHVlKTtcbiAgICBpbnN0YW5jZUNhY2hlLnNldChrZXlQYXRoLCBwcm9wZXJ0eSk7XG4gIH1cblxuICByZXR1cm4gcHJvcGVydHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGVjaWFsQ2xvc2VzdChub2RlLCBzZWxlY3Rvcikge1xuICBpZiAoIW5vZGUgfHwgIXNlbGVjdG9yKVxuICAgIHJldHVybjtcblxuICBsZXQgY3VycmVudE5vZGUgPSBub2RlO1xuICB3aGlsZSAoY3VycmVudE5vZGUgJiYgKHR5cGVvZiBjdXJyZW50Tm9kZS5tYXRjaGVzICE9PSAnZnVuY3Rpb24nIHx8ICFjdXJyZW50Tm9kZS5tYXRjaGVzKHNlbGVjdG9yKSkpXG4gICAgY3VycmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnROb2RlKTtcblxuICByZXR1cm4gY3VycmVudE5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIG1zIHx8IDApO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZUR5bmFtaWNQcm9wKG5hbWUsIGRlZmF1bHRWYWx1ZSwgc2V0dGVyKSB7XG4gIGxldCBkeW5hbWljUHJvcGVydHkgPSBuZXcgRHluYW1pY1Byb3BlcnR5KGRlZmF1bHRWYWx1ZSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIFtuYW1lXToge1xuICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiAgICAgICAgICAoKSA9PiBkeW5hbWljUHJvcGVydHksXG4gICAgICBzZXQ6ICAgICAgICAgIChuZXdWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHNldHRlciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICBkeW5hbWljUHJvcGVydHlbRHluYW1pY1Byb3BlcnR5LnNldF0oc2V0dGVyKG5ld1ZhbHVlKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBkeW5hbWljUHJvcGVydHlbRHluYW1pY1Byb3BlcnR5LnNldF0obmV3VmFsdWUpO1xuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gZHluYW1pY1Byb3BlcnR5O1xufVxuXG5jb25zdCBEWU5BTUlDX1BST1BfUkVHSVNUUlkgPSBuZXcgTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZHluYW1pY1Byb3BJRChpZCwgc2V0VmFsdWUpIHtcbiAgbGV0IHByb3AgPSBEWU5BTUlDX1BST1BfUkVHSVNUUlkuZ2V0KGlkKTtcbiAgaWYgKHByb3ApIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICBwcm9wW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKHNldFZhbHVlKTtcblxuICAgIHJldHVybiBwcm9wO1xuICB9XG5cbiAgcHJvcCA9IG5ldyBEeW5hbWljUHJvcGVydHkoKGFyZ3VtZW50cy5sZW5ndGggPiAxKSA/IHNldFZhbHVlIDogJycpO1xuICBEWU5BTUlDX1BST1BfUkVHSVNUUlkuc2V0KGlkLCBwcm9wKTtcblxuICByZXR1cm4gcHJvcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdsb2JhbFN0b3JlTmFtZVZhbHVlUGFpckhlbHBlcih0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gIG1ldGFkYXRhKFxuICAgIHRhcmdldCxcbiAgICBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUixcbiAgICBbIG5hbWUsIHZhbHVlIF0sXG4gICk7XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuY29uc3QgUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUyA9IG5ldyBTZXQoWyAnW2RhdGEtdGVtcGxhdGVzLWRpc2FibGVdJywgJ215dGhpeC1mb3ItZWFjaCcgXSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IoKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKFJFR0lTVEVSRURfRElTQUJMRV9URU1QTEFURV9TRUxFQ1RPUlMpLmpvaW4oJywnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyRGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUy5hZGQoc2VsZWN0b3IpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5yZWdpc3RlckRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIFJFR0lTVEVSRURfRElTQUJMRV9URU1QTEFURV9TRUxFQ1RPUlMuZGVsZXRlKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gZ2xvYmFsU3RvcmVIZWxwZXIoZHluYW1pYywgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuO1xuXG4gIGNvbnN0IHNldE9uR2xvYmFsID0gKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRWYWx1ZSA9IGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVbbmFtZV07XG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoY3VycmVudFZhbHVlLCBEeW5hbWljUHJvcGVydHkpKSB7XG4gICAgICBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlW25hbWVdW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKHZhbHVlKTtcbiAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUodmFsdWUsIER5bmFtaWNQcm9wZXJ0eSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUsIHtcbiAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+IHZhbHVlLFxuICAgICAgICAgIHNldDogICAgICAgICAgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZVtEeW5hbWljUHJvcGVydHkuc2V0XShuZXdWYWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIGlmIChkeW5hbWljKSB7XG4gICAgICBsZXQgcHJvcCA9IGR5bmFtaWNQcm9wSUQobmFtZSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlLCB7XG4gICAgICAgIFtuYW1lXToge1xuICAgICAgICAgIGVudW1lcmFibGU6ICAgdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0OiAgICAgICAgICAoKSA9PiBwcm9wLFxuICAgICAgICAgIHNldDogICAgICAgICAgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICBwcm9wW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKG5ld1ZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHByb3BbRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuXG4gICAgICByZXR1cm4gcHJvcDtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBsZXQgbmFtZVZhbHVlUGFpciA9IChCYXNlVXRpbHMuaXNDb2xsZWN0YWJsZShhcmdzWzBdKSkgPyBtZXRhZGF0YShcbiAgICBhcmdzWzBdLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRleHRcbiAgICBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUiwgIC8vIHNwZWNpYWwga2V5XG4gICkgOiBudWxsOyAvLyBAcmVmOl9teXRoaXhOYW1lVmFsdWVQYWlySGVscGVyVXNhZ2VcblxuICBpZiAobmFtZVZhbHVlUGFpcikge1xuICAgIGxldCBbIG5hbWUsIHZhbHVlIF0gPSBuYW1lVmFsdWVQYWlyO1xuICAgIHNldE9uR2xvYmFsKG5hbWUsIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA+IDEgJiYgQmFzZVV0aWxzLmlzVHlwZShhcmdzWzBdLCAnOjpTdHJpbmcnKSkge1xuICAgIGxldCBuYW1lICA9IGFyZ3NbMF07XG4gICAgbGV0IHZhbHVlID0gYXJnc1sxXTtcbiAgICBzZXRPbkdsb2JhbChuYW1lLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IHZhbHVlID0gYXJnc1swXTtcbiAgICBsZXQgbmFtZSAgPSAodHlwZW9mIHRoaXMuZ2V0SWRlbnRpZmllciA9PT0gJ2Z1bmN0aW9uJykgPyB0aGlzLmdldElkZW50aWZpZXIoKSA6ICh0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpKTtcbiAgICBpZiAoIW5hbWUpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wibXl0aGl4VUkuZ2xvYmFsU3RvcmVcIjogXCJuYW1lXCIgaXMgdW5rbm93biwgc28gdW5hYmxlIHRvIHN0b3JlIHZhbHVlJyk7XG5cbiAgICBzZXRPbkdsb2JhbChuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdsb2JhbFN0b3JlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGdsb2JhbFN0b3JlSGVscGVyLmNhbGwodGhpcywgZmFsc2UsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsU3RvcmVEeW5hbWljKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIGdsb2JhbFN0b3JlSGVscGVyLmNhbGwodGhpcywgdHJ1ZSwgYXJncyk7XG59XG5cbmNsYXNzIFN0b3JhZ2VJdGVtIHtcbiAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICB0aGlzLl9jID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl91ID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl92ID0gdmFsdWU7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdjtcbiAgfVxuXG4gIHNldFZhbHVlKHZhbHVlKSB7XG4gICAgdGhpcy5fdSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5fdiA9IHZhbHVlO1xuICB9XG5cbiAgdG9KU09OKCkge1xuICAgIHJldHVybiB7XG4gICAgICAkdHlwZTogICdTdG9yYWdlSXRlbScsXG4gICAgICBfYzogICAgIHRoaXMuX2MsXG4gICAgICBfdTogICAgIHRoaXMuX3UsXG4gICAgICBfdjogICAgIHRoaXMuX3YsXG4gICAgfTtcbiAgfVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcbiAgX3Jldml2ZShkYXRhLCBfYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICBpZiAoIWRhdGEgfHwgQmFzZVV0aWxzLmlzUHJpbWl0aXZlKGRhdGEpKVxuICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICBsZXQgYWxyZWFkeVZpc2l0ZWQgID0gX2FscmVhZHlWaXNpdGVkIHx8IG5ldyBTZXQoKTtcbiAgICBsZXQgdHlwZSAgICAgICAgICAgID0gKGRhdGEgJiYgZGF0YS4kdHlwZSk7XG5cbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUgPT09ICdTdG9yYWdlSXRlbScpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gZGF0YS5fdjtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgU3RvcmFnZUl0ZW0oKSwge1xuICAgICAgICAgIF9jOiBkYXRhLl9jLFxuICAgICAgICAgIF91OiBkYXRhLl91LFxuICAgICAgICAgIF92OiAodmFsdWUgJiYgIUJhc2VVdGlscy5pc1ByaW1pdGl2ZSh2YWx1ZSkpID8gdGhpcy5fcmV2aXZlKHZhbHVlLCBhbHJlYWR5VmlzaXRlZCkgOiB2YWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgWyBrZXksIHZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgIGlmICghdmFsdWUgfHwgQmFzZVV0aWxzLmlzUHJpbWl0aXZlKHZhbHVlKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChhbHJlYWR5VmlzaXRlZC5oYXModmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgYWxyZWFkeVZpc2l0ZWQuYWRkKHZhbHVlKTtcbiAgICAgIGRhdGFba2V5XSA9IHRoaXMuX3Jldml2ZSh2YWx1ZSwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX3JhdyhkYXRhLCBfYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICBpZiAoIWRhdGEgfHwgQmFzZVV0aWxzLmlzUHJpbWl0aXZlKGRhdGEpKVxuICAgICAgcmV0dXJuIGRhdGE7XG5cbiAgICBsZXQgYWxyZWFkeVZpc2l0ZWQgPSBfYWxyZWFkeVZpc2l0ZWQgfHwgbmV3IFNldCgpO1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgU3RvcmFnZUl0ZW0pXG4gICAgICByZXR1cm4gdGhpcy5fcmF3KGRhdGEuZ2V0VmFsdWUoKSwgYWxyZWFkeVZpc2l0ZWQpO1xuXG4gICAgZm9yIChsZXQgWyBrZXksIHZhbHVlIF0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgIGlmICghdmFsdWUgfHwgQmFzZVV0aWxzLmlzUHJpbWl0aXZlKHZhbHVlKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChhbHJlYWR5VmlzaXRlZC5oYXModmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgYWxyZWFkeVZpc2l0ZWQuYWRkKHZhbHVlKTtcbiAgICAgIGRhdGFba2V5XSA9IHRoaXMuX3Jhdyh2YWx1ZSwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgX2dldFBhcnRzRm9yT3BlcmF0aW9uKHR5cGUsIHBhcnRzKSB7XG4gICAgbGV0IHBhdGhQYXJ0cyAgID0gKHR5cGUgPT09ICdzZXQnKSA/IHBhcnRzLnNsaWNlKDAsIC0xKSA6IHBhcnRzLnNsaWNlKCk7XG4gICAgbGV0IHBhdGggICAgICAgID0gcGF0aFBhcnRzLm1hcCgocGFydCkgPT4gKCh0eXBlb2YgcGFydCA9PT0gJ3N5bWJvbCcpID8gcGFydC50b1N0cmluZygpIDogKCcnICsgcGFydCkpLnJlcGxhY2UoL1xcLi9nLCAnXFxcXC4nKSkuam9pbignLicpO1xuICAgIGxldCBwYXJzZWRQYXJ0cyA9IHBhdGguc3BsaXQoLyg/PCFcXFxcKVxcLi9nKTtcbiAgICBsZXQgc3RvcmFnZVR5cGUgPSBwYXJzZWRQYXJ0c1swXTtcbiAgICBsZXQgZGF0YSAgICAgICAgPSAodHlwZSA9PT0gJ3NldCcpID8gcGFydHNbcGFydHMubGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBsb2NhbFN0b3JhZ2UsIG9yIHNlc3Npb25TdG9yYWdlXG4gICAgbGV0IHN0b3JhZ2VFbmdpbmUgPSBnbG9iYWxUaGlzW3N0b3JhZ2VUeXBlXTtcbiAgICBpZiAoIXN0b3JhZ2VFbmdpbmUpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgcm9vdERhdGEgICAgPSB7fTtcbiAgICBsZXQgZW5jb2RlZEJhc2UgPSBzdG9yYWdlRW5naW5lLmdldEl0ZW0oJ215dGhpeC11aScpO1xuICAgIGlmIChlbmNvZGVkQmFzZSlcbiAgICAgIHJvb3REYXRhID0gdGhpcy5fcmV2aXZlKEpTT04ucGFyc2UoZW5jb2RlZEJhc2UpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoUGFydHMsXG4gICAgICBwYXRoLFxuICAgICAgcGFyc2VkUGFydHMsXG4gICAgICBzdG9yYWdlVHlwZSxcbiAgICAgIGRhdGEsXG4gICAgICBzdG9yYWdlRW5naW5lLFxuICAgICAgZW5jb2RlZEJhc2UsXG4gICAgICByb290RGF0YSxcbiAgICB9O1xuICB9XG5cbiAgX2dldE1ldGEodHlwZSwgcGFydHMpIHtcbiAgICBsZXQgb3BlcmF0aW9uID0gdGhpcy5fZ2V0UGFydHNGb3JPcGVyYXRpb24odHlwZSwgcGFydHMpO1xuICAgIGxldCB7XG4gICAgICBwYXJzZWRQYXJ0cyxcbiAgICAgIHJvb3REYXRhLFxuICAgIH0gPSBvcGVyYXRpb247XG5cbiAgICBsZXQgc2NvcGUgICAgICAgID0gcm9vdERhdGE7XG4gICAgbGV0IHBhcmVudFNjb3BlICA9IG51bGw7XG5cbiAgICBmb3IgKGxldCBpID0gMSwgaWwgPSBwYXJzZWRQYXJ0cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2NvcGUgaW5zdGFuY2VvZiBTdG9yYWdlSXRlbSkge1xuICAgICAgICBzY29wZSA9IHNjb3BlLmdldFZhbHVlKCk7XG4gICAgICAgIGlmICghc2NvcGUpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCBwYXJ0ID0gcGFyc2VkUGFydHNbaV07XG4gICAgICBsZXQgc3ViU2NvcGUgPSAoc2NvcGUpID8gc2NvcGVbcGFydF0gOiBzY29wZTtcbiAgICAgIGlmICh0eXBlID09PSAnc2V0JyAmJiAhc3ViU2NvcGUpXG4gICAgICAgIHN1YlNjb3BlID0gc2NvcGVbcGFydF0gPSB7fTtcblxuICAgICAgaWYgKHN1YlNjb3BlID09IG51bGwgfHwgT2JqZWN0LmlzKHN1YlNjb3BlLCBOYU4pIHx8IE9iamVjdC5pcyhzdWJTY29wZSwgLUluZmluaXR5KSB8fCBPYmplY3QuaXMoc3ViU2NvcGUsIEluZmluaXR5KSlcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIHBhcmVudFNjb3BlID0gc2NvcGU7XG4gICAgICBzY29wZSA9IHN1YlNjb3BlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBvcGVyYXRpb24sXG4gICAgICBwYXJlbnRTY29wZSxcbiAgICAgIHNjb3BlLFxuICAgIH07XG4gIH1cblxuICBnZXRNZXRhKC4uLnBhcnRzKSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldE1ldGEoJ2dldCcsIHBhcnRzKTtcbiAgfVxuXG4gIGdldCguLi5wYXJ0cykge1xuICAgIGxldCB7IHNjb3BlIH0gPSB0aGlzLl9nZXRNZXRhKCdnZXQnLCBwYXJ0cyk7XG4gICAgcmV0dXJuIHRoaXMuX3JhdyhzY29wZSk7XG4gIH1cblxuICBzZXQoLi4ucGFydHMpIHtcbiAgICBsZXQge1xuICAgICAgb3BlcmF0aW9uLFxuICAgICAgcGFyZW50U2NvcGUsXG4gICAgICBzY29wZSxcbiAgICB9ID0gdGhpcy5fZ2V0TWV0YSgnc2V0JywgcGFydHMpO1xuXG4gICAgbGV0IHtcbiAgICAgIGRhdGEsXG4gICAgICBwYXJzZWRQYXJ0cyxcbiAgICAgIHBhdGgsXG4gICAgICByb290RGF0YSxcbiAgICAgIHN0b3JhZ2VFbmdpbmUsXG4gICAgfSA9IG9wZXJhdGlvbjtcblxuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIERlbGV0ZVxuICAgICAgaWYgKHBhcmVudFNjb3BlKVxuICAgICAgICBkZWxldGUgcGFyZW50U2NvcGVbcGFyc2VkUGFydHNbcGFyc2VkUGFydHMubGVuZ3RoIC0gMV1dO1xuICAgICAgZWxzZVxuICAgICAgICBkZWxldGUgc2NvcGVbcGFyc2VkUGFydHNbcGFyc2VkUGFydHMubGVuZ3RoIC0gMV1dO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyZW50U2NvcGUpXG4gICAgICAgIHBhcmVudFNjb3BlW3BhcnNlZFBhcnRzW3BhcnNlZFBhcnRzLmxlbmd0aCAtIDFdXSA9IG5ldyBTdG9yYWdlSXRlbShkYXRhKTtcbiAgICAgIGVsc2VcbiAgICAgICAgc2NvcGVbcGFyc2VkUGFydHNbcGFyc2VkUGFydHMubGVuZ3RoIC0gMV1dID0gbmV3IFN0b3JhZ2VJdGVtKGRhdGEpO1xuICAgIH1cblxuICAgIHN0b3JhZ2VFbmdpbmUuc2V0SXRlbSgnbXl0aGl4LXVpJywgSlNPTi5zdHJpbmdpZnkocm9vdERhdGEpKTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlIHx8IHt9KTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgIWdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUudXJsKVxuICBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlLnVybCA9IG5ldyBVUkwoZG9jdW1lbnQubG9jYXRpb24pO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmV4cG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5leHBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuL2Vycm9ycy5qcyc7XG5leHBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0ICogYXMgU3R5bGVTaGVldE1hbmFnZXIgZnJvbSAnLi9zdHlsZXNoZWV0LW1hbmFnZXIuanMnO1xuZXhwb3J0ICogYXMgU3R5bGVTaGVldE1hbmFnZXIgZnJvbSAnLi9zdHlsZXNoZWV0LW1hbmFnZXIuanMnO1xuXG5pbXBvcnQgKiBhcyBDb21wb25lbnRVdGlscyBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5leHBvcnQgKiBhcyBDb21wb25lbnRVdGlscyBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBFbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnLi9keW5hbWljLXByb3BlcnR5LmpzJztcblxuZXhwb3J0ICogZnJvbSAnLi9xdWVyeS1lbmdpbmUuanMnO1xuZXhwb3J0ICogYXMgRWxlbWVudHMgZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbmltcG9ydCB7IE15dGhpeFVJQ29tcG9uZW50IH0gZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcbmV4cG9ydCAqIGZyb20gJy4vbXl0aGl4LXVpLWNvbXBvbmVudC5qcyc7XG5cbmltcG9ydCB7IE15dGhpeFVJUmVxdWlyZSB9IGZyb20gJy4vbXl0aGl4LXVpLXJlcXVpcmUuanMnO1xuXG5pbXBvcnQge1xuICBNeXRoaXhVSUxhbmd1YWdlUGFjayxcbiAgTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyLFxufSBmcm9tICcuL215dGhpeC11aS1sYW5ndWFnZS1wcm92aWRlci5qcyc7XG5cbmltcG9ydCB7IE15dGhpeFVJU3Bpbm5lciB9IGZyb20gJy4vbXl0aGl4LXVpLXNwaW5uZXIuanMnO1xuXG5pbXBvcnQgeyBNeXRoaXhVSUR5bmFtaWNTdHlsZSB9IGZyb20gJy4vbXl0aGl4LXVpLWR5bmFtaWMtc3R5bGUuanMnO1xuXG5leHBvcnQgY29uc3QgTXl0aGl4RWxlbWVudHMgPSB7XG4gIE15dGhpeFVJUmVxdWlyZSxcbiAgTXl0aGl4VUlMYW5ndWFnZVBhY2ssXG4gIE15dGhpeFVJTGFuZ3VhZ2VQcm92aWRlcixcbiAgTXl0aGl4VUlTcGlubmVyLFxuICBNeXRoaXhVSUR5bmFtaWNTdHlsZSxcbn07XG5cbmV4cG9ydCB7XG4gIER5bmFtaWNQcm9wZXJ0eSxcbn07XG5cbmxldCBfbXl0aGl4SXNSZWFkeSA9IGZhbHNlO1xuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZ2xvYmFsVGhpcywge1xuICAnb25teXRoaXhyZWFkeSc6IHtcbiAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6ICAgICAgICAgICgpID0+IHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgc2V0OiAgICAgICAgICAoY2FsbGJhY2spID0+IHtcbiAgICAgIGlmIChfbXl0aGl4SXNSZWFkeSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IGNhbGxiYWNrKG5ldyBFdmVudCgnbXl0aGl4LXJlYWR5JykpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdteXRoaXgtcmVhZHknLCBjYWxsYmFjayk7XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5nbG9iYWxUaGlzLm15dGhpeFVJLkJhc2VVdGlscyA9IEJhc2VVdGlscztcbmdsb2JhbFRoaXMubXl0aGl4VUkuVXRpbHMgPSBVdGlscztcbmdsb2JhbFRoaXMubXl0aGl4VUkuQ29tcG9uZW50VXRpbHMgPSBDb21wb25lbnRVdGlscztcbmdsb2JhbFRoaXMubXl0aGl4VUkuRWxlbWVudHMgPSBFbGVtZW50cztcbmdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUuZ2xvYmFsU3RvcmUgPSBVdGlscy5nbG9iYWxTdG9yZTtcbmdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUuZ2xvYmFsU3RvcmVEeW5hbWljID0gVXRpbHMuZ2xvYmFsU3RvcmVEeW5hbWljO1xuXG5nbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlLmR5bmFtaWNQcm9wSUQgPSBmdW5jdGlvbihpZCkge1xuICByZXR1cm4gVXRpbHMuZHluYW1pY1Byb3BJRChpZCk7XG59O1xuXG5jbGFzcyBNeXRoaXhDb25uZWN0ZWRFdmVudCBleHRlbmRzIEN1c3RvbUV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ215dGhpeC1jb25uZWN0ZWQnKTtcbiAgfVxufVxuXG5jbGFzcyBNeXRoaXhEaXNjb25uZWN0ZWRFdmVudCBleHRlbmRzIEN1c3RvbUV2ZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoJ215dGhpeC1kaXNjb25uZWN0ZWQnKTtcbiAgfVxufVxuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBsZXQgZGlkVmlzaWJpbGl0eU9ic2VydmVycyA9IGZhbHNlO1xuXG4gIGNvbnN0IG9uRG9jdW1lbnRSZWFkeSA9ICgpID0+IHtcbiAgICBpZiAoIWRpZFZpc2liaWxpdHlPYnNlcnZlcnMpIHtcbiAgICAgIGxldCBlbGVtZW50cyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbXl0aGl4LXNyY10nKSk7XG4gICAgICBDb21wb25lbnRVdGlscy52aXNpYmlsaXR5T2JzZXJ2ZXIoKHsgZGlzY29ubmVjdCwgZWxlbWVudCwgd2FzVmlzaWJsZSB9KSA9PiB7XG4gICAgICAgIGlmICh3YXNWaXNpYmxlKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBkaXNjb25uZWN0KCk7XG5cbiAgICAgICAgbGV0IHNyYyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1zcmMnKTtcbiAgICAgICAgaWYgKCFzcmMpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIENvbXBvbmVudFV0aWxzLmxvYWRQYXJ0aWFsSW50b0VsZW1lbnQuY2FsbChlbGVtZW50LCBzcmMpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbXl0aGl4LXJlYWR5Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgeyBlbGVtZW50cyB9KTtcblxuICAgICAgZGlkVmlzaWJpbGl0eU9ic2VydmVycyA9IHRydWU7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdteXRoaXgtcmVhZHknKTtcblxuICAgIGlmIChfbXl0aGl4SXNSZWFkeSlcbiAgICAgIHJldHVybjtcblxuICAgIF9teXRoaXhJc1JlYWR5ID0gdHJ1ZTtcblxuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdteXRoaXgtcmVhZHknKSk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZ2xvYmFsVGhpcywge1xuICAgICckJzoge1xuICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6ICAgICAgICAoLi4uYXJncykgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvciguLi5hcmdzKSxcbiAgICB9LFxuICAgICckJCc6IHtcbiAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6ICAgdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiAgICAgICAgKC4uLmFyZ3MpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoLi4uYXJncyksXG4gICAgfSxcbiAgfSk7XG5cbiAgbGV0IGRvY3VtZW50TXV0YXRpb25PYnNlcnZlciA9IGdsb2JhbFRoaXMubXl0aGl4VUkuZG9jdW1lbnRNdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgIGxldCBkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvclN0ciA9IFV0aWxzLmdldERpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yKCk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0gbXV0YXRpb25zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBtdXRhdGlvbiAgPSBtdXRhdGlvbnNbaV07XG4gICAgICBsZXQgdGFyZ2V0ICAgID0gbXV0YXRpb24udGFyZ2V0O1xuXG4gICAgICBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2F0dHJpYnV0ZXMnKSB7XG4gICAgICAgIGlmIChkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvclN0ciAmJiB0YXJnZXQucGFyZW50Tm9kZSAmJiB0eXBlb2YgdGFyZ2V0LnBhcmVudE5vZGUuY2xvc2VzdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0YXJnZXQucGFyZW50Tm9kZS5jbG9zZXN0KGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyKSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBsZXQgYXR0cmlidXRlTm9kZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGVOb2RlKG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBsZXQgbmV3VmFsdWUgICAgICA9IChhdHRyaWJ1dGVOb2RlKSA/IGF0dHJpYnV0ZU5vZGUubm9kZVZhbHVlIDogbnVsbDtcbiAgICAgICAgbGV0IG9sZFZhbHVlICAgICAgPSBtdXRhdGlvbi5vbGRWYWx1ZTtcblxuICAgICAgICBpZiAob2xkVmFsdWUgPT09IG5ld1ZhbHVlKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBVdGlscy5pc1RlbXBsYXRlKG5ld1ZhbHVlKSlcbiAgICAgICAgICBhdHRyaWJ1dGVOb2RlLm5vZGVWYWx1ZSA9IFV0aWxzLmZvcm1hdE5vZGVWYWx1ZShhdHRyaWJ1dGVOb2RlLCB7IHNjb3BlOiBVdGlscy5jcmVhdGVTY29wZSh0YXJnZXQpLCBkaXNhbGxvd0hUTUw6IHRydWUgfSk7XG5cbiAgICAgICAgbGV0IG9ic2VydmVkQXR0cmlidXRlcyA9IHRhcmdldC5jb25zdHJ1Y3Rvci5vYnNlcnZlZEF0dHJpYnV0ZXM7XG4gICAgICAgIGlmIChvYnNlcnZlZEF0dHJpYnV0ZXMgJiYgb2JzZXJ2ZWRBdHRyaWJ1dGVzLmluZGV4T2YobXV0YXRpb24uYXR0cmlidXRlTmFtZSkgPCAwKSB7XG4gICAgICAgICAgaWYgKHRhcmdldFtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0pXG4gICAgICAgICAgICB0YXJnZXQuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrLmNhbGwodGFyZ2V0LCBtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG11dGF0aW9uLnR5cGUgPT09ICdjaGlsZExpc3QnKSB7XG4gICAgICAgIGxldCBkaXNhYmxlVGVtcGxhdGluZyA9IChkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvclN0ciAmJiB0YXJnZXQgJiYgdHlwZW9mIHRhcmdldC5jbG9zZXN0ID09PSAnZnVuY3Rpb24nICYmIHRhcmdldC5jbG9zZXN0KCdbZGF0YS10ZW1wbGF0ZXMtZGlzYWJsZV0sbXl0aGl4LWZvci1lYWNoJykpO1xuICAgICAgICBsZXQgYWRkZWROb2RlcyAgICAgICAgPSBtdXRhdGlvbi5hZGRlZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgamwgPSBhZGRlZE5vZGVzLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IGFkZGVkTm9kZXNbal07XG4gICAgICAgICAgaWYgKG5vZGVbTXl0aGl4VUlDb21wb25lbnQuaXNNeXRoaXhDb21wb25lbnRdICYmIG5vZGUub25NdXRhdGlvbkFkZGVkLmNhbGwobm9kZSwgbXV0YXRpb24pID09PSBmYWxzZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKCFkaXNhYmxlVGVtcGxhdGluZylcbiAgICAgICAgICAgIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cyhub2RlKTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5kaXNwYXRjaEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBsZXQgY29ubmVjdGVkRXZlbnQgPSBuZXcgTXl0aGl4Q29ubmVjdGVkRXZlbnQoKTtcbiAgICAgICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChjb25uZWN0ZWRFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldFtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0pXG4gICAgICAgICAgICB0YXJnZXQub25NdXRhdGlvbkNoaWxkQWRkZWQobm9kZSwgbXV0YXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlbW92ZWROb2RlcyA9IG11dGF0aW9uLnJlbW92ZWROb2RlcztcbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGpsID0gcmVtb3ZlZE5vZGVzLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBsZXQgbm9kZSA9IHJlbW92ZWROb2Rlc1tqXTtcbiAgICAgICAgICBpZiAobm9kZVtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0gJiYgbm9kZS5vbk11dGF0aW9uUmVtb3ZlZC5jYWxsKG5vZGUsIG11dGF0aW9uKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5kaXNwYXRjaEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBsZXQgZGlzY29ubmVjdGVkRXZlbnQgPSBuZXcgTXl0aGl4RGlzY29ubmVjdGVkRXZlbnQoKTtcbiAgICAgICAgICAgIG5vZGUuZGlzcGF0Y2hFdmVudChkaXNjb25uZWN0ZWRFdmVudCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRhcmdldFtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0pXG4gICAgICAgICAgICB0YXJnZXQub25NdXRhdGlvbkNoaWxkUmVtb3ZlZChub2RlLCBtdXRhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGRvY3VtZW50TXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XG4gICAgc3VidHJlZTogICAgICAgICAgICB0cnVlLFxuICAgIGNoaWxkTGlzdDogICAgICAgICAgdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiAgICAgICAgIHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6ICB0cnVlLFxuICB9KTtcblxuICBFbGVtZW50cy5wcm9jZXNzRWxlbWVudHMoZG9jdW1lbnQuaGVhZCk7XG4gIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cyhkb2N1bWVudC5ib2R5KTtcblxuICBjb25zdCBET0NVTUVOVF9DSEVDS19SRUFEWV9USU1FID0gMjUwO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKVxuICAgICAgb25Eb2N1bWVudFJlYWR5KCk7XG4gICAgZWxzZVxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG9uRG9jdW1lbnRSZWFkeSk7XG4gIH0sIERPQ1VNRU5UX0NIRUNLX1JFQURZX1RJTUUpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25Eb2N1bWVudFJlYWR5KTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==