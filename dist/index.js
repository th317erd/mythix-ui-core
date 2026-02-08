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
const UNFINISHED_DEFINITION    = Symbol.for('@mythix/mythix-ui/constants/unfinished');




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
    const handleAttribute = (element, attributeName, _attributeValue) => {
      let attributeValue      = _attributeValue;
      let lowerAttributeName  = attributeName.toLowerCase();

      if (eventNames.indexOf(lowerAttributeName) >= 0) {
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

    for (let i = 0, il = attributeNames.length; i < il; i++) {
      let attributeName       = attributeNames[i];
      let lowerAttributeName  = attributeName.toLowerCase();
      let attributeValue      = node.getAttribute(attributeName);

      if (eventNames.indexOf(lowerAttributeName) >= 0) {
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
/* harmony export */   bindEventToElement: () => (/* binding */ bindEventToElement),
/* harmony export */   bindMethods: () => (/* binding */ bindMethods),
/* harmony export */   compileTemplateFromParts: () => (/* binding */ compileTemplateFromParts),
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
 *   Create a context-aware function, or "macro", that can be called and used by the template engine.
 *
 *   If you are ever trying to pass methods or dynamic properties across the DOM, then this is the method you want to use, to
 *   properly "parse" and use the attribute value as intended.
 *
 *   This is used for example for event bindings via attributes. If you have for example an `onclick="doSomething"`
 *   attribute on an element, then this will be used to create a context-aware "macro" for the method "doSomething".
 *
 *   The term "macro" is used here because there are special formats "understood" by the template engine. For example,
 *   prefixing an attribute value with a percent sign, i.e. `name="%globalDynamicPropName"` will use @see Utils.dynamicPropID;
 *   to globally fetch property of this name. This is important, because due to the async nature of the DOM, you might
 *   be requesting a dynamic property that hasn't yet been loaded/defined. This is the purpose of @see Utils.dynamicPropID;,
 *   and this specialized template format: to provide dynamic props by id, that will be available when needed.
 *
 *   The template engine also will happily accept rogue method names. For example, in a Mythix UI component you are building,
 *   you might have an element like `<button onclick="onButtonClick">Click Me!<button>`. The templating engine will detect that
 *   this is ONLY an identifier, and so will search for the specified method in the available "scope" (see @see Utils.createScope;),
 *   which includes `this` instance of your component as the first `target`. This pattern is not required, as you can call your
 *   component method directly yourself, as with any attribute event binding in the DOM, i.e: `<button onclick="this.onButtonClick(event)">Click Me!<button>`.
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSXFDOztBQUVyQyxnREFBZ0Q7O0FBSTlDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVksMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUEsY0FBYyxXQUFXLEVBQUUsMkNBQTJDO0FBQ3RFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDLG1DQUFtQyxhQUFhLDRFQUE0RSxLQUFLO0FBQ2pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7O0FBRTdDO0FBQ0EseUJBQXlCLFdBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLGlDQUFpQyxFQUFFLHNCQUFzQjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLGtCQUFrQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUUseURBQXdCO0FBQzFCLEVBQUUseURBQXdCOztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9ub2RlX21vZHVsZXMvZGVlcG1lcmdlL2Rpc3QvY2pzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2Jhc2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvY29tcG9uZW50LXV0aWxzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9keW5hbWljLXByb3BlcnR5LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2VsZW1lbnRzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktY29tcG9uZW50LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL215dGhpeC11aS1keW5hbWljLXN0eWxlLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL215dGhpeC11aS1sYW5ndWFnZS1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktcmVxdWlyZS5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9xdWVyeS1lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvc2hhMjU2LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL3N0eWxlc2hlZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzTWVyZ2VhYmxlT2JqZWN0ID0gZnVuY3Rpb24gaXNNZXJnZWFibGVPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSlcblx0XHQmJiAhaXNTcGVjaWFsKHZhbHVlKVxufTtcblxuZnVuY3Rpb24gaXNOb25OdWxsT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNTcGVjaWFsKHZhbHVlKSB7XG5cdHZhciBzdHJpbmdWYWx1ZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0cmV0dXJuIHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBSZWdFeHBdJ1xuXHRcdHx8IHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBEYXRlXSdcblx0XHR8fCBpc1JlYWN0RWxlbWVudCh2YWx1ZSlcbn1cblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2I1YWM5NjNmYjc5MWQxMjk4ZTdmMzk2MjM2MzgzYmM5NTVmOTE2YzEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjEtTDI1XG52YXIgY2FuVXNlU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGNhblVzZVN5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcblxuZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVcbn1cblxuZnVuY3Rpb24gZW1wdHlUYXJnZXQodmFsKSB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyBbXSA6IHt9XG59XG5cbmZ1bmN0aW9uIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiAob3B0aW9ucy5jbG9uZSAhPT0gZmFsc2UgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkpXG5cdFx0PyBkZWVwbWVyZ2UoZW1wdHlUYXJnZXQodmFsdWUpLCB2YWx1ZSwgb3B0aW9ucylcblx0XHQ6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRBcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHJldHVybiB0YXJnZXQuY29uY2F0KHNvdXJjZSkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoZWxlbWVudCwgb3B0aW9ucylcblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpIHtcblx0aWYgKCFvcHRpb25zLmN1c3RvbU1lcmdlKSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZVxuXHR9XG5cdHZhciBjdXN0b21NZXJnZSA9IG9wdGlvbnMuY3VzdG9tTWVyZ2Uoa2V5KTtcblx0cmV0dXJuIHR5cGVvZiBjdXN0b21NZXJnZSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbU1lcmdlIDogZGVlcG1lcmdlXG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzXG5cdFx0PyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkuZmlsdGVyKGZ1bmN0aW9uKHN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldCwgc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iLCJpbXBvcnQgeyBTSEEyNTYgfSBmcm9tICcuL3NoYTI1Ni5qcyc7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSk7XG5cbmV4cG9ydCB7XG4gIFNIQTI1Nixcbn07XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBCYXNlVXRpbHNcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIE1pc2MgdXRpbGl0eSBmdW5jdGlvbnMgYW5kIGdsb2JhbCBjb25zdGFudHMgYXJlIGZvdW5kIHdpdGhpbiB0aGlzIG5hbWVzcGFjZS5cbiAqL1xuXG5mdW5jdGlvbiBwYWQoc3RyLCBjb3VudCwgY2hhciA9ICcwJykge1xuICByZXR1cm4gc3RyLnBhZFN0YXJ0KGNvdW50LCBjaGFyKTtcbn1cblxuY29uc3QgSURfQ09VTlRfTEVOR1RIICAgICAgICAgPSAxOTtcbmNvbnN0IElTX0NMQVNTICAgICAgICAgICAgICAgID0gKC9eY2xhc3MgXFxTKyBcXHsvKTtcbmNvbnN0IE5BVElWRV9DTEFTU19UWVBFX05BTUVTID0gW1xuICAnQWdncmVnYXRlRXJyb3InLFxuICAnQXJyYXknLFxuICAnQXJyYXlCdWZmZXInLFxuICAnQmlnSW50JyxcbiAgJ0JpZ0ludDY0QXJyYXknLFxuICAnQmlnVWludDY0QXJyYXknLFxuICAnQm9vbGVhbicsXG4gICdEYXRhVmlldycsXG4gICdEYXRlJyxcbiAgJ0RlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlJyxcbiAgJ0Vycm9yJyxcbiAgJ0V2YWxFcnJvcicsXG4gICdGaW5hbGl6YXRpb25SZWdpc3RyeScsXG4gICdGbG9hdDMyQXJyYXknLFxuICAnRmxvYXQ2NEFycmF5JyxcbiAgJ0Z1bmN0aW9uJyxcbiAgJ0ludDE2QXJyYXknLFxuICAnSW50MzJBcnJheScsXG4gICdJbnQ4QXJyYXknLFxuICAnTWFwJyxcbiAgJ051bWJlcicsXG4gICdPYmplY3QnLFxuICAnUHJveHknLFxuICAnUmFuZ2VFcnJvcicsXG4gICdSZWZlcmVuY2VFcnJvcicsXG4gICdSZWdFeHAnLFxuICAnU2V0JyxcbiAgJ1NoYXJlZEFycmF5QnVmZmVyJyxcbiAgJ1N0cmluZycsXG4gICdTeW1ib2wnLFxuICAnU3ludGF4RXJyb3InLFxuICAnVHlwZUVycm9yJyxcbiAgJ1VpbnQxNkFycmF5JyxcbiAgJ1VpbnQzMkFycmF5JyxcbiAgJ1VpbnQ4QXJyYXknLFxuICAnVWludDhDbGFtcGVkQXJyYXknLFxuICAnVVJJRXJyb3InLFxuICAnV2Vha01hcCcsXG4gICdXZWFrUmVmJyxcbiAgJ1dlYWtTZXQnLFxuXTtcblxuY29uc3QgTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEgPSBOQVRJVkVfQ0xBU1NfVFlQRV9OQU1FUy5tYXAoKHR5cGVOYW1lKSA9PiB7XG4gIHJldHVybiBbIHR5cGVOYW1lLCBnbG9iYWxUaGlzW3R5cGVOYW1lXSBdO1xufSkuZmlsdGVyKChtZXRhKSA9PiBtZXRhWzFdKTtcblxuY29uc3QgSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvaWQtY291bnRlci1jdXJyZW50LXZhbHVlJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tYWdpYy1udW1iZXJzXG5sZXQgaWRDb3VudGVyID0gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChnbG9iYWxUaGlzLm15dGhpeFVJLCBJRF9DT1VOVEVSX0NVUlJFTlRfVkFMVUUpKSA/IGdsb2JhbFRoaXMubXl0aGl4VUlbSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFXSA6IDBuO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIEdlbmVyYXRlIGEgcGFydGlhbGx5IHJhbmRvbSB1bmlxdWUgSUQuIFRoZSBpZCBnZW5lcmF0ZWQgd2lsbCBiZSBhIGBEYXRlLm5vdygpYFxuICogICB2YWx1ZSB3aXRoIGFuIGluY3JlbWVudGluZyBCaWdJbnQgcG9zdGZpeGVkIHRvIGl0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IEEgdW5pcXVlIElELlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZygnSUQ6ICcsIEJhc2VVdGlscy5nZW5lcmF0ZUlEKCkpO1xuICogICAgIC8vIG91dHB1dCAtPiAnSUQxNzA0MTQzMDI3MTc5MDAwMDAwMDAwMDAwMDAwMDAwNydcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSUQoKSB7XG4gIGlkQ291bnRlciArPSBCaWdJbnQoMSk7XG4gIGdsb2JhbFRoaXMubXl0aGl4VUlbSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFXSA9IGlkQ291bnRlcjtcblxuICByZXR1cm4gYElEJHtEYXRlLm5vdygpfSR7cGFkKGlkQ291bnRlci50b1N0cmluZygpLCBJRF9DT1VOVF9MRU5HVEgpfWA7XG59XG5cbmNvbnN0IE9CSkVDVF9JRF9TVE9SQUdFID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29tcG9uZW50L2NvbnN0YW50cy9vYmplY3QtaWQtc3RvcmFnZScpO1xuY29uc3QgT0JKRUNUX0lEX1dFQUtNQVAgPSBnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSA9IChnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSkgPyBnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSA6IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgR2V0IGEgdW5pcXVlIElEIGZvciBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSByZWZlcmVuY2UuXG4gKlxuICogICBVbmlxdWUgSURzIGFyZSBnZW5lcmF0ZWQgdmlhIEBzZWUgQmFzZVV0aWxzLmdlbmVyYXRlSUQ7LlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIGRlc2M6IEFueSBnYXJiYWdlLWNvbGxlY3RhYmxlIHJlZmVyZW5jZS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBBIHVuaXF1ZSBJRCBmb3IgdGhpcyByZWZlcmVuY2UgKGFzIGEgU0hBMjU2IGhhc2gpLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZyhCYXNlVXRpbHMuZ2V0T2JqZWN0SUQoZGl2RWxlbWVudCkpO1xuICogICAgIC8vIG91dHB1dCAtPiAnMTcwNDE0MzAyNzE3OTAwMDAwMDAwMDAwMDAwMDAwMDcnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPYmplY3RJRCh2YWx1ZSkge1xuICBsZXQgaWQgPSBPQkpFQ1RfSURfV0VBS01BUC5nZXQodmFsdWUpO1xuICBpZiAoaWQgPT0gbnVsbCkge1xuICAgIGxldCB0aGlzSUQgPSBnZW5lcmF0ZUlEKCk7XG5cbiAgICBPQkpFQ1RfSURfV0VBS01BUC5zZXQodmFsdWUsIHRoaXNJRCk7XG5cbiAgICByZXR1cm4gdGhpc0lEO1xuICB9XG5cbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhbiB1bnJlc29sdmVkIHNwZWNpYWxpemVkIFByb21pc2UgaW5zdGFuY2UsIHdpdGggdGhlIGludGVudCB0aGF0IGl0IHdpbGwgYmVcbiAqICAgcmVzb2x2ZWQgbGF0ZXIuXG4gKlxuICogICBUaGUgUHJvbWlzZSBpbnN0YW5jZSBpcyBzcGVjaWFsaXplZCBiZWNhdXNlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgaW5qZWN0ZWQgaW50byBpdDpcbiAqICAgMS4gYHJlc29sdmUocmVzdWx0VmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIHRoZSBmaXJzdCBwcm92aWRlZCBhcmd1bWVudFxuICogICAyLiBgcmVqZWN0KGVycm9yVmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZWplY3RzIHRoZSBwcm9taXNlIHdpdGggdGhlIGZpcnN0IHByb3ZpZGVkIGFyZ3VtZW50XG4gKiAgIDMuIGBzdGF0dXMoKWAgLSBXaGVuIGNhbGxlZCwgd2lsbCByZXR1cm4gdGhlIGZ1bGZpbGxtZW50IHN0YXR1cyBvZiB0aGUgcHJvbWlzZSwgYXMgYSBgc3RyaW5nYCwgb25lIG9mOiBgXCJwZW5kaW5nXCIsIFwiZnVsZmlsbGVkXCJgLCBvciBgXCJyZWplY3RlZFwiYFxuICogICA0LiBgaWQ8c3RyaW5nPmAgLSBBIHJhbmRvbWx5IGdlbmVyYXRlZCBJRCBmb3IgdGhpcyBwcm9taXNlXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIFByb21pc2U7IEFuIHVucmVzb2x2ZWQgUHJvbWlzZSB0aGF0IGNhbiBiZSByZXNvbHZlZCBvciByZWplY3RlZCBieSBjYWxsaW5nIGBwcm9taXNlLnJlc29sdmUocmVzdWx0KWAgb3IgYHByb21pc2UucmVqZWN0KGVycm9yKWAgcmVzcGVjdGl2ZWx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVzb2x2YWJsZSgpIHtcbiAgbGV0IHN0YXR1cyA9ICdwZW5kaW5nJztcbiAgbGV0IHJlc29sdmU7XG4gIGxldCByZWplY3Q7XG5cbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICByZXNvbHZlID0gKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAncGVuZGluZycpIHtcbiAgICAgICAgc3RhdHVzID0gJ2Z1bGZpbGxlZCc7XG4gICAgICAgIF9yZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIHJlamVjdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgIHN0YXR1cyA9ICdyZWplY3RlZCc7XG4gICAgICAgIF9yZWplY3QodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwcm9taXNlLCB7XG4gICAgJ3Jlc29sdmUnOiB7XG4gICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogICAgICAgIHJlc29sdmUsXG4gICAgfSxcbiAgICAncmVqZWN0Jzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICByZWplY3QsXG4gICAgfSxcbiAgICAnc3RhdHVzJzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICAoKSA9PiBzdGF0dXMsXG4gICAgfSxcbiAgICAnaWQnOiB7XG4gICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogICAgICAgIGdlbmVyYXRlSUQoKSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBSdW50aW1lIHR5cGUgcmVmbGVjdGlvbiBoZWxwZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgYSBtb3JlIHJvYnVzdCByZXBsYWNlbWVudCBmb3IgdGhlIGB0eXBlb2ZgIG9wZXJhdG9yLlxuICpcbiAqICAgVGhpcyBtZXRob2QgYWx3YXlzIHJldHVybnMgYSBuYW1lIChhcyBhIGBzdHJpbmdgIHR5cGUpIG9mIHRoZSB1bmRlcmx5aW5nIGRhdGF0eXBlLlxuICogICBUaGUgXCJkYXRhdHlwZVwiIGlzIGEgbGl0dGxlIGxvb3NlIGZvciBwcmltaXRpdmUgdHlwZXMuIEZvciBleGFtcGxlLCBhXG4gKiAgIHByaW1pdGl2ZSBgdHlwZW9mIHggPT09ICdudW1iZXInYCB0eXBlIGlzIHJldHVybmVkIGFzIGl0cyBjb3JyZXNwb25kaW5nIE9iamVjdCAoY2xhc3MpIHR5cGUgYCdOdW1iZXInYC4gRm9yIGBib29sZWFuYCBpdCB3aWxsIGluc3RlYWRcbiAqICAgcmV0dXJuIGAnQm9vbGVhbidgLCBhbmQgZm9yIGAnc3RyaW5nJ2AsIGl0IHdpbGwgaW5zdGVhZCByZXR1cm4gYCdTdHJpbmcnYC4gVGhpcyBpcyB0cnVlIG9mIGFsbCB1bmRlcmx5aW5nIHByaW1pdGl2ZSB0eXBlcy5cbiAqXG4gKiAgIEZvciBpbnRlcm5hbCBkYXRhdHlwZXMsIGl0IHdpbGwgcmV0dXJuIHRoZSByZWFsIGNsYXNzIG5hbWUgcHJlZml4ZWQgYnkgdHdvIGNvbG9ucy5cbiAqICAgRm9yIGV4YW1wbGUsIGB0eXBlT2YobmV3IE1hcCgpKWAgd2lsbCByZXR1cm4gYCc6Ok1hcCdgLlxuICpcbiAqICAgTm9uLWludGVybmFsIHR5cGVzIHdpbGwgbm90IGJlIHByZWZpeGVkLCBhbGxvd2luZyBjdXN0b20gdHlwZXMgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIGludGVybmFsIHR5cGVzIHRvIGFsc28gYmUgZGV0ZWN0ZWQuXG4gKiAgIEZvciBleGFtcGxlLCBgY2xhc3MgVGVzdCB7fTsgdHlwZU9mKG5ldyBUZXN0KCkpYCB3aWxsIHJlc3VsdCBpbiB0aGUgbm9uLXByZWZpeGVkIHJlc3VsdCBgJ1Rlc3QnYC5cbiAqXG4gKiAgIEZvciByYXcgYGZ1bmN0aW9uYCB0eXBlcywgYHR5cGVPZmAgd2lsbCBjaGVjayBpZiB0aGV5IGFyZSBhIGNvbnN0cnVjdG9yIG9yIG5vdC4gSWYgYSBjb25zdHJ1Y3RvciBpcyBkZXRlY3RlZCwgdGhlblxuICogICB0aGUgZm9ybWF0IGAnW0NsYXNzICR7bmFtZX1dJ2Agd2lsbCBiZSByZXR1cm5lZCBhcyB0aGUgdHlwZS4gRm9yIGludGVybmFsIHR5cGVzIHRoZSBuYW1lIHdpbGxcbiAqICAgYmUgcHJlZml4ZWQsIGkuZS4gYFtDbGFzcyA6OiR7aW50ZXJuYWxOYW1lfV1gLCBhbmQgZm9yIG5vbi1pbnRlcm5hbCB0eXBlcyB3aWxsIGluc3RlYWQgYmUgbm9uLXByZWZpeGVkLCBpLmUuIGBbQ2xhc3MgJHtuYW1lfV1gIC5cbiAqICAgRm9yIGV4YW1wbGUsIGB0eXBlT2YoTWFwKWAgd2lsbCByZXR1cm4gYCdbQ2xhc3MgOjpNYXBdJ2AsIHdoZXJlYXMgYHR5cGVPZihUZXN0KWAgd2lsbCByZXN1bHQgaW4gYCdbQ2xhc3MgVGVzdF0nYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBUaGUgdmFsdWUgd2hvc2UgdHlwZSB5b3Ugd2lzaCB0byBkaXNjb3Zlci5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgbmFtZSBvZiB0aGUgcHJvdmlkZWQgdHlwZSwgb3IgYW4gZW1wdHkgc3RyaW5nIGAnJ2AgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBubyB0eXBlLlxuICogbm90ZXM6XG4gKiAgIC0gVGhpcyBtZXRob2Qgd2lsbCBsb29rIGZvciBhIFtTeW1ib2wudG9TdHJpbmdUYWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N5bWJvbC90b1N0cmluZ1RhZylcbiAqICAgICBrZXkgb24gdGhlIHZhbHVlIHByb3ZpZGVkLi4uIGFuZCBpZiBmb3VuZCwgd2lsbCB1c2UgaXQgdG8gYXNzaXN0IHdpdGggZmluZGluZyB0aGUgY29ycmVjdCB0eXBlIG5hbWUuXG4gKiAgIC0gSWYgdGhlIGB2YWx1ZWAgcHJvdmlkZWQgaXMgdHlwZS1sZXNzLCBpLmUuIGB1bmRlZmluZWRgLCBgbnVsbGAsIG9yIGBOYU5gLCB0aGVuIGFuIGVtcHR5IHR5cGUgYCcnYCB3aWxsIGJlIHJldHVybmVkLlxuICogICAtIFVzZSB0aGUgYHR5cGVvZmAgb3BlcmF0b3IgaWYgeW91IHdhbnQgdG8gZGV0ZWN0IGlmIGEgdHlwZSBpcyBwcmltaXRpdmUgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHlwZU9mKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IE9iamVjdC5pcyh2YWx1ZSwgTmFOKSlcbiAgICByZXR1cm4gJyc7XG5cbiAgaWYgKE9iamVjdC5pcyh2YWx1ZSwgSW5maW5pdHkpIHx8IE9iamVjdC5pcyh2YWx1ZSwgLUluZmluaXR5KSlcbiAgICByZXR1cm4gJzo6TnVtYmVyJztcblxuICBsZXQgdGhpc1R5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0aGlzVHlwZSA9PT0gJ2JpZ2ludCcpXG4gICAgcmV0dXJuICc6OkJpZ0ludCc7XG5cbiAgaWYgKHRoaXNUeXBlID09PSAnc3ltYm9sJylcbiAgICByZXR1cm4gJzo6U3ltYm9sJztcblxuICBpZiAodGhpc1R5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHRoaXNUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsZXQgbmF0aXZlVHlwZU1ldGEgPSBOQVRJVkVfQ0xBU1NfVFlQRVNfTUVUQS5maW5kKCh0eXBlTWV0YSkgPT4gKHZhbHVlID09PSB0eXBlTWV0YVsxXSkpO1xuICAgICAgaWYgKG5hdGl2ZVR5cGVNZXRhKVxuICAgICAgICByZXR1cm4gYFtDbGFzcyA6OiR7bmF0aXZlVHlwZU1ldGFbMF19XWA7XG5cbiAgICAgIGlmICh2YWx1ZS5wcm90b3R5cGUgJiYgdHlwZW9mIHZhbHVlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiBJU19DTEFTUy50ZXN0KCcnICsgdmFsdWUucHJvdG90eXBlLmNvbnN0cnVjdG9yKSlcbiAgICAgICAgcmV0dXJuIGBbQ2xhc3MgJHt2YWx1ZS5uYW1lfV1gO1xuXG4gICAgICBpZiAodmFsdWUucHJvdG90eXBlICYmIHR5cGVvZiB2YWx1ZS5wcm90b3R5cGVbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUucHJvdG90eXBlW1N5bWJvbC50b1N0cmluZ1RhZ10oKTtcbiAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICByZXR1cm4gYFtDbGFzcyAke3Jlc3VsdH1dYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYDo6JHt0aGlzVHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke3RoaXNUeXBlLnN1YnN0cmluZygxKX1gO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiAnOjpBcnJheSc7XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKVxuICAgIHJldHVybiAnOjpTdHJpbmcnO1xuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcilcbiAgICByZXR1cm4gJzo6TnVtYmVyJztcblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBCb29sZWFuKVxuICAgIHJldHVybiAnOjpCb29sZWFuJztcblxuICBsZXQgbmF0aXZlVHlwZU1ldGEgPSBOQVRJVkVfQ0xBU1NfVFlQRVNfTUVUQS5maW5kKCh0eXBlTWV0YSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKHR5cGVNZXRhWzBdICE9PSAnT2JqZWN0JyAmJiB2YWx1ZSBpbnN0YW5jZW9mIHR5cGVNZXRhWzFdKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgaWYgKG5hdGl2ZVR5cGVNZXRhKVxuICAgIHJldHVybiBgOjoke25hdGl2ZVR5cGVNZXRhWzBdfWA7XG5cbiAgaWYgKHR5cGVvZiBNYXRoICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gTWF0aClcbiAgICByZXR1cm4gJzo6TWF0aCc7XG5cbiAgaWYgKHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gSlNPTilcbiAgICByZXR1cm4gJzo6SlNPTic7XG5cbiAgaWYgKHR5cGVvZiBBdG9taWNzICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gQXRvbWljcylcbiAgICByZXR1cm4gJzo6QXRvbWljcyc7XG5cbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gUmVmbGVjdClcbiAgICByZXR1cm4gJzo6UmVmbGVjdCc7XG5cbiAgaWYgKHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10pXG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddKCkgOiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddO1xuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSlcbiAgICByZXR1cm4gJzo6T2JqZWN0JztcblxuICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fCAnT2JqZWN0Jztcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBSdW50aW1lIHR5cGUgcmVmbGVjdGlvbiBoZWxwZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgYSBtb3JlIHJvYnVzdCByZXBsYWNlbWVudCBmb3IgdGhlIGBpbnN0YW5jZW9mYCBvcGVyYXRvci5cbiAqXG4gKiAgIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGB0cnVlYCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyAqYW55KiBvZiB0aGUgcHJvdmlkZWQgYHR5cGVzYC5cbiAqXG4gKiAgIFRoZSBwcm92aWRlZCBgdHlwZXNgIGNhbiBlYWNoIGVpdGhlciBiZSBhIHJlYWwgcmF3IHR5cGUgKGkuZS4gYFN0cmluZ2AgY2xhc3MpLCBvciB0aGUgbmFtZSBvZiBhIHR5cGUsIGFzIGEgc3RyaW5nLFxuICogICBpLmUuIGAnOjpTdHJpbmcnYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBUaGUgdmFsdWUgd2hvc2UgdHlwZSB5b3Ugd2lzaCB0byBjb21wYXJlLlxuICogICAtIG5hbWU6IC4uLnR5cGVzXG4gKiAgICAgZGF0YVR5cGU6IEFycmF5PGFueT5cbiAqICAgICBkZXNjOiBBbGwgdHlwZXMgeW91IHdpc2ggdG8gY2hlY2sgYWdhaW5zdC4gU3RyaW5nIHZhbHVlcyBjb21wYXJlIHR5cGVzIGJ5IG5hbWUsIGZ1bmN0aW9uIHZhbHVlcyBjb21wYXJlIHR5cGVzIGJ5IGBpbnN0YW5jZW9mYC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdmFsdWVgIG1hdGNoZXMgYW55IG9mIHRoZSBwcm92aWRlZCBgdHlwZXNgLlxuICogICAyLiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMudHlwZU9mOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZSh2YWx1ZSwgLi4udHlwZXMpIHtcbiAgY29uc3QgZ2V0SW50ZXJuYWxUeXBlTmFtZSA9ICh0eXBlKSA9PiB7XG4gICAgbGV0IG5hdGl2ZVR5cGVNZXRhID0gTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEuZmluZCgodHlwZU1ldGEpID0+ICh0eXBlID09PSB0eXBlTWV0YVsxXSkpO1xuICAgIGlmIChuYXRpdmVUeXBlTWV0YSlcbiAgICAgIHJldHVybiBgOjoke25hdGl2ZVR5cGVNZXRhWzBdfWA7XG4gIH07XG5cbiAgbGV0IHZhbHVlVHlwZSA9IHR5cGVPZih2YWx1ZSk7XG4gIGZvciAobGV0IHR5cGUgb2YgdHlwZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVPZih0eXBlLCAnOjpTdHJpbmcnKSAmJiB2YWx1ZVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHR5cGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGV0IGludGVybmFsVHlwZSA9IGdldEludGVybmFsVHlwZU5hbWUodHlwZSk7XG4gICAgICAgIGlmIChpbnRlcm5hbFR5cGUgJiYgaW50ZXJuYWxUeXBlID09PSB2YWx1ZVR5cGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIFZlcmlmeSB0aGF0IHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIGEgYG51bWJlcmAgdHlwZSAob3IgYE51bWJlcmAgaW5zdGFuY2UpLCBhbmQgdGhhdFxuICogICBpdCAqKmlzIG5vdCoqIGBOYU5gLCBgSW5maW5pdHlgLCBvciBgLUluZmluaXR5YC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBgbnVtYmVyYCAob3IgYE51bWJlcmAgaW5zdGFuY2UpIGFuZCBpcyBhbHNvICoqbm90KiogYE5hTmAsIGBJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgLiBpLmUuIGAoaXNOdW1iZXIodmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSlgLlxuICogICAyLiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMudHlwZU9mOy5cbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNUeXBlOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWROdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIChpc1R5cGUodmFsdWUsICc6Ok51bWJlcicpICYmIGlzRmluaXRlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgVmVyaWZ5IHRoYXQgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgYSBcInBsYWluXCIvXCJ2YW5pbGxhXCIgT2JqZWN0IGluc3RhbmNlLlxuICpcbiAqICAgVGhpcyBtZXRob2QgaXMgaW50ZW5kZWQgdG8gaGVscCB0aGUgY2FsbGVyIGRldGVjdCBpZiBhbiBvYmplY3QgaXMgYSBcInJhdyBwbGFpbiBvYmplY3RcIixcbiAqICAgaW5oZXJpdGluZyBmcm9tIGBPYmplY3QucHJvdG90eXBlYCAob3IgYSBgbnVsbGAgcHJvdG90eXBlKS5cbiAqXG4gKiAgIDEuIGBpc1BsYWluT2JqZWN0KHt9KWAgd2lsbCByZXR1cm4gYHRydWVgLlxuICogICAyLiBgaXNQbGFpbk9iamVjdChuZXcgT2JqZWN0KCkpYCB3aWxsIHJldHVybiBgdHJ1ZWAuXG4gKiAgIDMuIGBpc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpYCB3aWxsIHJldHVybiBgdHJ1ZWAuXG4gKiAgIDQuIGBpc1BsYWluT2JqZWN0KG5ldyBDdXN0b21DbGFzcygpKWAgd2lsbCByZXR1cm4gYGZhbHNlYC5cbiAqICAgNS4gQWxsIG90aGVyIGludm9jYXRpb25zIHNob3VsZCByZXR1cm4gYGZhbHNlYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBcInJhd1wiL1wicGxhaW5cIiBPYmplY3QgaW5zdGFuY2UuXG4gKiAgIDIuIE90aGVyd2lzZSwgYGZhbHNlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy50eXBlT2Y7LlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc1R5cGU7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JylcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfHwgdmFsdWUuY29uc3RydWN0b3IgPT0gbnVsbClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRGV0ZWN0IGlmIHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIGEgamF2YXNjcmlwdCBwcmltaXRpdmUgdHlwZS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB0eXBlb2YgdmFsdWVgIGlzIG9uZSBvZjogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBiaWdpbnRgLCBvciBgc3ltYm9sYCxcbiAqICAgICAgKmFuZCBhbHNvKiBgdmFsdWVgIGlzICpub3QqIGBOYU5gLCBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYHVuZGVmaW5lZGAsIG9yIGBudWxsYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChPYmplY3QuaXModmFsdWUsIEluZmluaXR5KSB8fCBPYmplY3QuaXModmFsdWUsIC1JbmZpbml0eSkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJywgJzo6TnVtYmVyJywgJzo6Qm9vbGVhbicsICc6OkJpZ0ludCcpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIERldGVjdCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyBnYXJiYWdlIGNvbGxlY3RhYmxlLlxuICpcbiAqICAgVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjaGVjayBpZiBhbnkgYHZhbHVlYCBpcyBhbGxvd2VkIHRvIGJlIHVzZWQgYXMgYSB3ZWFrIHJlZmVyZW5jZS5cbiAqXG4gKiAgIEVzc2VudGlhbGx5LCB0aGlzIHdpbGwgcmV0dXJuIGBmYWxzZWAgZm9yIGFueSBwcmltaXRpdmUgdHlwZSwgb3IgYG51bGxgLCBgdW5kZWZpbmVkYCwgYE5hTmAsIGBJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgIHZhbHVlcy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB0eXBlb2YgdmFsdWVgIGlzIG9uZSBvZjogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBiaWdpbnRgLCBvciBgc3ltYm9sYCxcbiAqICAgICAgKmFuZCBhbHNvKiBgdmFsdWVgICppcyBub3QqIGBOYU5gLCBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYHVuZGVmaW5lZGAsIG9yIGBudWxsYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbGxlY3RhYmxlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IE9iamVjdC5pcyh2YWx1ZSwgTmFOKSB8fCBPYmplY3QuaXMoSW5maW5pdHkpIHx8IE9iamVjdC5pcygtSW5maW5pdHkpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJylcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJywgJzo6TnVtYmVyJywgJzo6Qm9vbGVhbicsICc6OkJpZ0ludCcpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBEZXRlY3QgaWYgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgXCJlbXB0eVwiIChpcyAqKk4qKnVsbCAqKk8qKnIgKipFKiptcHR5KS5cbiAqXG4gKiAgIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBcImVtcHR5XCIgaWYgYW55IG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBpcyBtZXQ6XG4gKiAgIDEuIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAuXG4gKiAgIDIuIGB2YWx1ZWAgaXMgYG51bGxgLlxuICogICAzLiBgdmFsdWVgIGlzIGAnJ2AgKGFuIGVtcHR5IHN0cmluZykuXG4gKiAgIDQuIGB2YWx1ZWAgaXMgbm90IGFuIGVtcHR5IHN0cmluZywgYnV0IGl0IGNvbnRhaW5zIG5vdGhpbmcgZXhjZXB0IHdoaXRlc3BhY2UgKGBcXHRgLCBgXFxyYCwgYFxcc2AsIG9yIGBcXG5gKS5cbiAqICAgNS4gYHZhbHVlYCBpcyBgTmFOYC5cbiAqICAgNi4gYHZhbHVlLmxlbmd0aGAgaXMgYSBgTnVtYmVyYCBvciBgbnVtYmVyYCB0eXBlLCBhbmQgaXMgZXF1YWwgdG8gYDBgLlxuICogICA3LiBgdmFsdWVgIGlzIGEgQHNlZSBCYXNlVXRpbHMuaXNQbGFpbk9iamVjdD9jYXB0aW9uPXBsYWluK29iamVjdDsgYW5kIGhhcyBubyBpdGVyYWJsZSBrZXlzLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIGRlc2M6IFZhbHVlIHRvIGNoZWNrXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47XG4gKiAgIDEuIFJldHVybiBgdHJ1ZWAgaWYgYW55IG9mIHRoZSBcImVtcHR5XCIgY29uZGl0aW9ucyBhYm92ZSBhcmUgdHJ1ZS5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzTm90Tk9FOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTk9FKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHZhbHVlID09PSAnJylcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoaXNUeXBlKHZhbHVlLCAnOjpTdHJpbmcnKSAmJiAoL15bXFx0XFxzXFxyXFxuXSokLykudGVzdCh2YWx1ZSkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGlzVHlwZSh2YWx1ZS5sZW5ndGgsICc6Ok51bWJlcicpKVxuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAwKTtcblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRGV0ZWN0IGlmIHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzICoqbm90KiogXCJlbXB0eVwiIChpcyBub3QgKipOKip1bGwgKipPKipyICoqRSoqbXB0eSkuXG4gKlxuICogICBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgXCJlbXB0eVwiIGlmIGFueSBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgaXMgbWV0OlxuICogICAxLiBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICogICAyLiBgdmFsdWVgIGlzIGBudWxsYC5cbiAqICAgMy4gYHZhbHVlYCBpcyBgJydgIChhbiBlbXB0eSBzdHJpbmcpLlxuICogICA0LiBgdmFsdWVgIGlzIG5vdCBhbiBlbXB0eSBzdHJpbmcsIGJ1dCBpdCBjb250YWlucyBub3RoaW5nIGV4Y2VwdCB3aGl0ZXNwYWNlIChgXFx0YCwgYFxccmAsIGBcXHNgLCBvciBgXFxuYCkuXG4gKiAgIDUuIGB2YWx1ZWAgaXMgYE5hTmAuXG4gKiAgIDYuIGB2YWx1ZS5sZW5ndGhgIGlzIGEgYE51bWJlcmAgb3IgYG51bWJlcmAgdHlwZSwgYW5kIGlzIGVxdWFsIHRvIGAwYC5cbiAqICAgNy4gYHZhbHVlYCBpcyBhIEBzZWUgQmFzZVV0aWxzLmlzUGxhaW5PYmplY3Q/Y2FwdGlvbj1wbGFpbitvYmplY3Q7IGFuZCBoYXMgbm8gaXRlcmFibGUga2V5cy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYGZhbHNlYCBpZiBhbnkgb2YgdGhlIFwiZW1wdHlcIiBjb25kaXRpb25zIGFib3ZlIGFyZSB0cnVlLlxuICogICAyLiBPdGhlcndpc2UsIGB0cnVlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6aW5mbzogVGhpcyBpcyB0aGUgZXhhY3QgaW52ZXJzZSBvZiBAc2VlIEJhc2VVdGlscy5pc05PRTtcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNOT0U7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOb3ROT0UodmFsdWUpIHtcbiAgcmV0dXJuICFpc05PRSh2YWx1ZSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29udmVydCB0aGUgcHJvdmlkZWQgYHN0cmluZ2AgYHZhbHVlYCBpbnRvIFtjYW1lbENhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0NhbWVsX2Nhc2UpLlxuICpcbiAqICAgVGhlIHByb2Nlc3MgaXMgcm91Z2hseSBhcyBmb2xsb3dzOlxuICogICAxLiBBbnkgbm9uLXdvcmQgY2hhcmFjdGVycyAoW2EtekEtWjAtOV9dKSBhcmUgc3RyaXBwZWQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmcuXG4gKiAgIDIuIEFueSBub24td29yZCBjaGFyYWN0ZXJzIChbYS16QS1aMC05X10pIGFyZSBzdHJpcHBlZCBmcm9tIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbiAqICAgMy4gRWFjaCBcIndvcmRcIiBpcyBjYXBpdGFsaXplZC5cbiAqICAgNC4gVGhlIGZpcnN0IGxldHRlciBpcyBhbHdheXMgbG93ZXItY2FzZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogU3RyaW5nIHRvIGNvbnZlcnQgaW50byBbY2FtZWxDYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNDYW1lbF9jYXNlKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgZm9ybWF0dGVkIHN0cmluZyBpbiBbY2FtZWxDYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNDYW1lbF9jYXNlKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKCctLXRlc3Qtc29tZV92YWx1ZV9AJykpO1xuICogICAgIC8vIG91dHB1dCAtPiAndGVzdFNvbWVWYWx1ZSdcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvXlxcVy8sICcnKVxuICAgIC5yZXBsYWNlKC9bXFxXXSskLywgJycpXG4gICAgLnJlcGxhY2UoLyhbQS1aXSspL2csICctJDEnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1xcVysoLikvZywgKG0sIHApID0+IHtcbiAgICAgIHJldHVybiBwLnRvVXBwZXJDYXNlKCk7XG4gICAgfSlcbiAgICAucmVwbGFjZSgvXiguKSguKikkLywgKG0sIGYsIGwpID0+IGAke2YudG9Mb3dlckNhc2UoKX0ke2x9YCk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29udmVydCB0aGUgcHJvdmlkZWQgYHN0cmluZ2AgYHZhbHVlYCBpbnRvIFtzbmFrZV9jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTbmFrZV9jYXNlKS5cbiAqXG4gKiAgIFRoZSBwcm9jZXNzIGlzIHJvdWdobHkgYXMgZm9sbG93czpcbiAqICAgMS4gQW55IGNhcGl0YWxpemVkIGNoYXJhY3RlciBzZXF1ZW5jZSBpcyBwcmVmaXhlZCBieSBhbiB1bmRlcnNjb3JlLlxuICogICAyLiBNb3JlIHRoYW4gb25lIHNlcXVlbnRpYWwgdW5kZXJzY29yZXMgYXJlIGNvbnZlcnRlZCBpbnRvIGEgc2luZ2xlIHVuZGVyc2NvcmUuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogU3RyaW5nIHRvIGNvbnZlcnQgaW50byBbc25ha2VfY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjU25ha2VfY2FzZSkuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIGZvcm1hdHRlZCBzdHJpbmcgaW4gW3NuYWtlX2Nhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI1NuYWtlX2Nhc2UpLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZyhCYXNlVXRpbHMudG9TbmFrZUNhc2UoJ1RoaXNJc0FTZW50ZW5jZScpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gJ3RoaXNfaXNfYV9zZW50ZW5jZSdcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU25ha2VDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvW0EtWl0rL2csIChtLCBvZmZzZXQpID0+ICgob2Zmc2V0KSA/IGBfJHttLnRvTG93ZXJDYXNlKCl9YCA6IG0udG9Mb3dlckNhc2UoKSkpXG4gICAgLnJlcGxhY2UoL197Mix9L2csICdfJylcbiAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBDb252ZXJ0IHRoZSBwcm92aWRlZCBgc3RyaW5nYCBgdmFsdWVgIGludG8gW2tlYmFiLWNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0tlYmFiX2Nhc2UpLlxuICpcbiAqICAgVGhlIHByb2Nlc3MgaXMgcm91Z2hseSBhcyBmb2xsb3dzOlxuICogICAxLiBBbnkgY2FwaXRhbGl6ZWQgY2hhcmFjdGVyIHNlcXVlbmNlIGlzIHByZWZpeGVkIGJ5IGEgaHlwaGVuLlxuICogICAyLiBNb3JlIHRoYW4gb25lIHNlcXVlbnRpYWwgaHlwaGVucyBhcmUgY29udmVydGVkIGludG8gYSBzaW5nbGUgaHlwaGVuLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFN0cmluZyB0byB0dXJuIGludG8gW2tlYmFiLWNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0tlYmFiX2Nhc2UpLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IFRoZSBmb3JtYXR0ZWQgc3RyaW5nIGluIFtrZWJhYi1jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNLZWJhYl9jYXNlKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLnRvS2ViYWJDYXNlKCdUaGlzSXNBU2VudGVuY2UnKSk7XG4gKiAgICAgLy8gb3V0cHV0IC0+ICd0aGlzLWlzLWEtc2VudGVuY2UnXG4gKiAgICAgYGBgXG4gKi9cblxuY29uc3QgSVNfTEFTVF9DSEFSX1VQUEVSQ0FTRSA9IC9bQS1aXSQvO1xuZXhwb3J0IGZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvW0EtWl1bYS16XSt8W0EtWl17Mix9L2csIChtLCBvZmZzZXQpID0+IHtcbiAgICAgIGlmIChtLmxlbmd0aCA+IDEgJiYgSVNfTEFTVF9DSEFSX1VQUEVSQ0FTRS50ZXN0KG0pKVxuICAgICAgICByZXR1cm4gKGAkeyhvZmZzZXQpID8gJy0nIDogJyd9JHttLnNsaWNlKDAsIC0xKX0tJHttLnNsaWNlKC0xKX1gKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICByZXR1cm4gKChvZmZzZXQpID8gYC0ke20udG9Mb3dlckNhc2UoKX1gIDogbS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9KVxuICAgIC5yZXBsYWNlKC8tezIsfS9nLCAnLScpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRG8gb3VyIGJlc3QgdG8gZW11bGF0ZSBbcHJvY2Vzcy5uZXh0VGlja10oaHR0cHM6Ly9ub2RlanMub3JnL2VuL2d1aWRlcy9ldmVudC1sb29wLXRpbWVycy1hbmQtbmV4dHRpY2svI3Byb2Nlc3NuZXh0dGljaylcbiAqICAgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogICBJbiBvcmRlciB0byB0cnkgYW5kIGVtdWxhdGUgYHByb2Nlc3MubmV4dFRpY2tgLCB0aGlzIGZ1bmN0aW9uIHdpbGwgdXNlIGBnbG9iYWxUaGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBjYWxsYmFjaygpKWAgaWYgYXZhaWxhYmxlLFxuICogICBvdGhlcndpc2UgaXQgd2lsbCBmYWxsYmFjayB0byB1c2luZyBgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYWxsYmFjaylgLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IGNhbGxiYWNrXG4gKiAgICAgZGF0YVR5cGU6IGZ1bmN0aW9uXG4gKiAgICAgZGVzYzogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gY2FsbCBvbiBcIm5leHRUaWNrXCIuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgZnVuY3Rpb24gd2lsbCBwcmVmZXIgYW5kIHVzZSBgcHJvY2Vzcy5uZXh0VGlja2AgaWYgaXQgaXMgYXZhaWxhYmxlIChpLmUuIGlmIHJ1bm5pbmcgb24gTm9kZUpTKS5cbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IFRoaXMgZnVuY3Rpb24gaXMgdW5saWtlbHkgdG8gYWN0dWFsbHkgYmUgdGhlIG5leHQgXCJ0aWNrXCIgb2YgdGhlIHVuZGVybHlpbmdcbiAqICAgICBqYXZhc2NyaXB0IGVuZ2luZS4gVGhpcyBtZXRob2QganVzdCBkb2VzIGl0cyBiZXN0IHRvIGVtdWxhdGUgXCJuZXh0VGlja1wiLiBJbnN0ZWFkIG9mIHRoZVxuICogICAgIGFjdHVhbCBcIm5leHQgdGlja1wiLCB0aGlzIHdpbGwgaW5zdGVhZCBiZSBcImFzIGZhc3QgYXMgcG9zc2libGVcIi5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgZnVuY3Rpb24gZGVsaWJlcmF0ZWx5IGF0dGVtcHRzIHRvIHVzZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBmaXJzdC0tZXZlbiB0aG91Z2ggaXQgbGlrZWx5IGRvZXNuJ3RcbiAqICAgICBoYXZlIHRoZSBmYXN0ZXN0IHR1cm4tYXJvdW5kLXRpbWUtLXRvIHNhdmUgYmF0dGVyeSBwb3dlci4gVGhlIGlkZWEgYmVpbmcgdGhhdCBcInNvbWV0aGluZyBuZWVkcyB0byBiZSBkb25lICpzb29uKlwiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGdsb2JhbFRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSkpLnRoZW4oKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBJU19OVU1CRVIgPSAvXihbLStdPykoXFxkKig/OlxcLlxcZCspPykoZVstK11cXGQrKT8kLztcbmNvbnN0IElTX0JPT0xFQU4gPSAvXih0cnVlfGZhbHNlKSQvO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENvZXJjZSBhIHN0cmluZyB0byBpdHMgbW9zdCBsaWtlbHkgdW5kZXJseWluZyBwcmltaXRpdmUgdHlwZS5cbiAqXG4gKiAgIENvbnZlcnNpb24gaW5wdXQgYW5kIG91dHB1dCB0YWJsZTpcbiAqICAgKiBgJ251bGwnYCBjb252ZXJ0cyB0byBgbnVsbGBcbiAqICAgKiBgJ3VuZGVmaW5lZCdgIGNvbnZlcnRzIHRvIGB1bmRlZmluZWRgXG4gKiAgICogYCdOYU4nYCBjb252ZXJ0cyB0byBgTmFOYFxuICogICAqIGAnSW5maW5pdHknYCBjb252ZXJ0cyB0byBgSW5maW5pdHlgXG4gKiAgICogYCctSW5maW5pdHknYCBjb252ZXJ0cyB0byBgLUluZmluaXR5YFxuICogICAqIGAndHJ1ZSdgIGNvbnZlcnRzIHRvIGB0cnVlYFxuICogICAqIGAnZmFsc2UnYCBjb252ZXJ0cyB0byBgZmFsc2VgXG4gKiAgICogQW55IHBhcnNhYmxlIG51bWVyaWMgc3RyaW5nIHZhbHVlIChpbmNsdWRpbmcgW0Ugbm90YXRpb25dKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NjaWVudGlmaWNfbm90YXRpb24jRV9ub3RhdGlvbikpIGNvbnZlcnRzIHRvIGBudW1iZXJgXG4gKlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFZhbHVlIHRvIGNvbnZlcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2UodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAnbnVsbCcpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGlmICh2YWx1ZSA9PT0gJ05hTicpXG4gICAgcmV0dXJuIE5hTjtcblxuICBpZiAodmFsdWUgPT09ICdJbmZpbml0eScgfHwgdmFsdWUgPT09ICcrSW5maW5pdHknKVxuICAgIHJldHVybiBJbmZpbml0eTtcblxuICBpZiAodmFsdWUgPT09ICctSW5maW5pdHknKVxuICAgIHJldHVybiAtSW5maW5pdHk7XG5cbiAgaWYgKElTX05VTUJFUi50ZXN0KHZhbHVlKSlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG5cbiAgaWYgKElTX0JPT0xFQU4udGVzdCh2YWx1ZSkpXG4gICAgcmV0dXJuICh2YWx1ZSA9PT0gJ3RydWUnKTtcblxuICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQge1xuICBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUyxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgICBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgICAgICAgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBFbGVtZW50cyAgICBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IENvbXBvbmVudFV0aWxzXG4gKiBncm91cE5hbWU6IENvbXBvbmVudFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgQ29tcG9uZW50IGFuZCBmcmFtZXdvcmsgY2xhc3NlcyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgZm91bmQgaGVyZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpZmllcih0YXJnZXQpIHtcbiAgaWYgKCF0YXJnZXQpXG4gICAgcmV0dXJuICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgdGFyZ2V0LmdldElkZW50aWZpZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHRhcmdldC5nZXRJZGVudGlmaWVyLmNhbGwodGFyZ2V0KTtcblxuICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudClcbiAgICByZXR1cm4gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSB8fCB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJykgfHwgQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKHRhcmdldC5sb2NhbE5hbWUpO1xuXG4gIHJldHVybiAndW5kZWZpbmVkJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVVUkwocm9vdExvY2F0aW9uLCBfdXJsaXNoKSB7XG4gIGxldCB1cmxpc2ggPSBfdXJsaXNoO1xuICBpZiAodXJsaXNoIGluc3RhbmNlb2YgVVJMKVxuICAgIHVybGlzaCA9IHVybGlzaC50b1N0cmluZygpO1xuXG4gIGlmICghdXJsaXNoKVxuICAgIHVybGlzaCA9ICcnO1xuXG4gIGlmICghQmFzZVV0aWxzLmlzVHlwZSh1cmxpc2gsICc6OlN0cmluZycpKVxuICAgIHJldHVybjtcblxuICBsZXQgdXJsID0gbmV3IFVSTCh1cmxpc2gsIG5ldyBVUkwocm9vdExvY2F0aW9uKSk7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5teXRoaXhVSS51cmxSZXNvbHZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBmaWxlTmFtZSAgPSAnJztcbiAgICBsZXQgcGF0aCAgICAgID0gJy8nO1xuXG4gICAgdXJsLnBhdGhuYW1lLnJlcGxhY2UoL14oLipcXC8pKFteL10rKSQvLCAobSwgZmlyc3QsIHNlY29uZCkgPT4ge1xuICAgICAgcGF0aCA9IGZpcnN0LnJlcGxhY2UoL1xcLyskLywgJy8nKTtcbiAgICAgIGlmIChwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpICE9PSAnLycpXG4gICAgICAgIHBhdGggPSBgJHtwYXRofS9gO1xuXG4gICAgICBmaWxlTmFtZSA9IHNlY29uZDtcbiAgICAgIHJldHVybiBtO1xuICAgIH0pO1xuXG4gICAgbGV0IG5ld1NyYyA9IGdsb2JhbFRoaXMubXl0aGl4VUkudXJsUmVzb2x2ZXIuY2FsbCh0aGlzLCB7IHNyYzogdXJsaXNoLCB1cmwsIHBhdGgsIGZpbGVOYW1lIH0pO1xuICAgIGlmIChuZXdTcmMgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFwibXl0aGl4LXJlcXVpcmVcIjogTm90IGxvYWRpbmcgXCIke3VybGlzaH1cIiBiZWNhdXNlIHRoZSBnbG9iYWwgXCJteXRoaXhVSS51cmxSZXNvbHZlclwiIHJlcXVlc3RlZCBJIG5vdCBkbyBzby5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobmV3U3JjICYmIChuZXdTcmMudG9TdHJpbmcoKSAhPT0gdXJsLnRvU3RyaW5nKCkgJiYgbmV3U3JjLnRvU3RyaW5nKCkgIT09IHVybGlzaCkpXG4gICAgICB1cmwgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgcm9vdExvY2F0aW9uLCBuZXdTcmMpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuY29uc3QgSVNfVEVNUExBVEUgICAgICAgICA9IC9eKHRlbXBsYXRlKSQvaTtcbmNvbnN0IElTX1NDUklQVCAgICAgICAgICAgPSAvXihzY3JpcHQpJC9pO1xuY29uc3QgSVNfSEVBRF9UQUcgICAgICAgICA9IC9eKHN0eWxlfGxpbmt8bWV0YSkkL2k7XG5jb25zdCBTSE9VTERfSUdOT1JFICAgICAgID0gL14oYmFzZXxub3NjcmlwdHx0aXRsZSkkL2k7XG5jb25zdCBSRVFVSVJFX0NBQ0hFICAgICAgID0gbmV3IE1hcCgpO1xuY29uc3QgUkVTT0xWRV9TUkNfRUxFTUVOVCA9IC9ec2NyaXB0fGxpbmt8c3R5bGV8bXl0aGl4LWxhbmd1YWdlLXBhY2t8bXl0aGl4LXJlcXVpcmUkL2k7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRJbnRvRG9jdW1lbnRGcm9tU291cmNlKG93bmVyRG9jdW1lbnQsIGxvY2F0aW9uLCBfdXJsLCBzb3VyY2VTdHJpbmcsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgPSBfb3B0aW9ucyB8fCB7fTtcbiAgbGV0IHVybCAgICAgICA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBsb2NhdGlvbiwgX3VybCwgb3B0aW9ucy5tYWdpYyk7XG4gIGxldCBmaWxlTmFtZTtcbiAgbGV0IGJhc2VVUkwgICA9IG5ldyBVUkwoYCR7dXJsLm9yaWdpbn0ke3VybC5wYXRobmFtZS5yZXBsYWNlKC9bXi9dKyQvLCAobSkgPT4ge1xuICAgIGZpbGVOYW1lID0gbTtcbiAgICByZXR1cm4gJyc7XG4gIH0pfSR7dXJsLnNlYXJjaH0ke3VybC5oYXNofWApO1xuXG4gIGxldCB0ZW1wbGF0ZSA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgdGVtcGxhdGUuaW5uZXJIVE1MID0gc291cmNlU3RyaW5nO1xuXG4gIGxldCBjaGlsZHJlbiA9IEFycmF5LmZyb20odGVtcGxhdGUuY29udGVudC5jaGlsZHJlbikuc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB4ID0gYS50YWdOYW1lO1xuICAgIGxldCB5ID0gYi50YWdOYW1lO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICAgIGlmICh4ID09IHkpXG4gICAgICByZXR1cm4gMDtcblxuICAgIHJldHVybiAoeCA8IHkpID8gMSA6IC0xO1xuICB9KTtcblxuICBjb25zdCBmaWxlTmFtZVRvRWxlbWVudE5hbWUgPSAoZmlsZU5hbWUpID0+IHtcbiAgICByZXR1cm4gZmlsZU5hbWUudHJpbSgpLnJlcGxhY2UoL1xcLi4qJC8sICcnKS5yZXBsYWNlKC9cXGJbQS1aXXxbXkEtWl1bQS1aXS9nLCAoX20pID0+IHtcbiAgICAgIGxldCBtID0gX20udG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiAobS5sZW5ndGggPCAyKSA/IGAtJHttfWAgOiBgJHttLmNoYXJBdCgwKX0tJHttLmNoYXJBdCgxKX1gO1xuICAgIH0pLnJlcGxhY2UoLy17Mix9L2csICctJykucmVwbGFjZSgvXlteYS16XSovLCAnJykucmVwbGFjZSgvW15hLXpdKiQvLCAnJyk7XG4gIH07XG5cbiAgbGV0IGd1ZXNzZWRFbGVtZW50TmFtZSAgPSBmaWxlTmFtZVRvRWxlbWVudE5hbWUoZmlsZU5hbWUpO1xuICBsZXQgY29udGV4dCAgICAgICAgICAgICA9IHtcbiAgICBndWVzc2VkRWxlbWVudE5hbWUsXG4gICAgY2hpbGRyZW4sXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICB0ZW1wbGF0ZSxcbiAgICB1cmwsXG4gICAgYmFzZVVSTCxcbiAgICBmaWxlTmFtZSxcbiAgfTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMucHJlUHJvY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRlbXBsYXRlID0gY29udGV4dC50ZW1wbGF0ZSA9IG9wdGlvbnMucHJlUHJvY2Vzcy5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICAgIGNoaWxkcmVuID0gQXJyYXkuZnJvbSh0ZW1wbGF0ZS5jb250ZW50LmNoaWxkcmVuKTtcbiAgfVxuXG4gIGxldCBub2RlSGFuZGxlciAgID0gb3B0aW9ucy5ub2RlSGFuZGxlcjtcbiAgbGV0IHRlbXBsYXRlQ291bnQgPSBjaGlsZHJlbi5yZWR1Y2UoKHN1bSwgZWxlbWVudCkgPT4gKChJU19URU1QTEFURS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpID8gKHN1bSArIDEpIDogc3VtKSwgMCk7XG5cbiAgY29udGV4dC50ZW1wbGF0ZUNvdW50ID0gdGVtcGxhdGVDb3VudDtcblxuICBjb25zdCByZXNvbHZlRWxlbWVudFNyY0F0dHJpYnV0ZSA9IChlbGVtZW50LCBiYXNlVVJMKSA9PiB7XG4gICAgLy8gUmVzb2x2ZSBcInNyY1wiIGF0dHJpYnV0ZSwgc2luY2Ugd2UgYXJlXG4gICAgLy8gZ29pbmcgdG8gYmUgbW92aW5nIHRoZSBlbGVtZW50IGFyb3VuZFxuICAgIGxldCBzcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKHNyYykge1xuICAgICAgc3JjID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIGJhc2VVUkwsIHNyYywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIGlmIChvcHRpb25zLm1hZ2ljICYmIFJFU09MVkVfU1JDX0VMRU1FTlQudGVzdChjaGlsZC5sb2NhbE5hbWUpKVxuICAgICAgY2hpbGQgPSByZXNvbHZlRWxlbWVudFNyY0F0dHJpYnV0ZShjaGlsZCwgYmFzZVVSTCk7XG5cbiAgICBpZiAoU0hPVUxEX0lHTk9SRS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKElTX1RFTVBMQVRFLnRlc3QoY2hpbGQudGFnTmFtZSkpIHsgLy8gPHRlbXBsYXRlPlxuICAgICAgaWYgKHRlbXBsYXRlQ291bnQgPT09IDEgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpID09IG51bGwgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZScpID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAke3VybH06IDx0ZW1wbGF0ZT4gaXMgbWlzc2luZyBhIFwiZGF0YS1mb3JcIiBhdHRyaWJ1dGUsIGxpbmtpbmcgaXQgdG8gaXRzIG93bmVyIGNvbXBvbmVudC4gR3Vlc3NpbmcgXCIke2d1ZXNzZWRFbGVtZW50TmFtZX1cIi5gKTtcbiAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWZvcicsIGd1ZXNzZWRFbGVtZW50TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZUhhbmRsZXIgPT09ICdmdW5jdGlvbicgJiYgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZCwgeyAuLi5jb250ZXh0LCBpc1RlbXBsYXRlOiB0cnVlLCBpc0hhbmRsZWQ6IHRydWUgfSkgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgLy8gYXBwZW5kIHRvIGJvZHlcbiAgICAgIGxldCBlbGVtZW50TmFtZSA9IChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9yJykgfHwgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZScpKTtcbiAgICAgIGlmICghb3duZXJEb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZvcj1cIiR7ZWxlbWVudE5hbWV9XCIgaV0sW2RhdGEtbXl0aGl4LWNvbXBvbmVudC1uYW1lPVwiJHtlbGVtZW50TmFtZX1cIiBpXWApKVxuICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH0gZWxzZSBpZiAoSVNfU0NSSVBULnRlc3QoY2hpbGQudGFnTmFtZSkpIHsgLy8gPHNjcmlwdD5cbiAgICAgIGxldCBjaGlsZENsb25lID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KGNoaWxkLnRhZ05hbWUpO1xuICAgICAgZm9yIChsZXQgYXR0cmlidXRlTmFtZSBvZiBjaGlsZC5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnc3JjJylcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjaGlsZENsb25lLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBjaGlsZC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3JjID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgc3JjID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIGJhc2VVUkwsIHNyYywgZmFsc2UpO1xuICAgICAgICBjaGlsZENsb25lLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjLnRvU3RyaW5nKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbW9kdWxlJyk7XG4gICAgICAgIGNoaWxkQ2xvbmUuaW5uZXJIVE1MID0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZUhhbmRsZXIgPT09ICdmdW5jdGlvbicgJiYgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZENsb25lLCB7IC4uLmNvbnRleHQsIGlzU2NyaXB0OiB0cnVlLCBpc0hhbmRsZWQ6IHRydWUgfSkgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgbGV0IHNjcmlwdElEID0gY2hpbGRDbG9uZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICBpZiAoIXNjcmlwdElEKSB7XG4gICAgICAgIHNjcmlwdElEID0gYElEJHtCYXNlVXRpbHMuU0hBMjU2KGAke2d1ZXNzZWRFbGVtZW50TmFtZX06JHtzcmMgfHwgY2hpbGRDbG9uZS5pbm5lckhUTUx9YCl9YDtcbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0SUQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBlbmQgdG8gaGVhZFxuICAgICAgaWYgKCFvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2NyaXB0SUQpKVxuICAgICAgICBvd25lckRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY2hpbGRDbG9uZSk7XG4gICAgfSBlbHNlIGlmIChJU19IRUFEX1RBRy50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDxsaW5rPiAmIDxzdHlsZT5cbiAgICAgIGxldCBpc1N0eWxlID0gKC9ec3R5bGUkL2kpLnRlc3QoY2hpbGQudGFnTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nICYmIG5vZGVIYW5kbGVyLmNhbGwodGhpcywgY2hpbGQsIHsgLi4uY29udGV4dCwgaXNTdHlsZSwgaXNMaW5rOiAhaXNTdHlsZSwgaXNIYW5kbGVkOiB0cnVlIH0pID09PSBmYWxzZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzdHlsZUlEID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgaWYgKCFzdHlsZUlEKSB7XG4gICAgICAgIHN0eWxlSUQgPSBgSUQke0Jhc2VVdGlscy5TSEEyNTYoY2hpbGQub3V0ZXJIVE1MKX1gO1xuICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVJRCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGVuZCB0byBoZWFkXG4gICAgICBpZiAoIW93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtjaGlsZC50YWdOYW1lfSMke3N0eWxlSUR9YCkpXG4gICAgICAgIG93bmVyRG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfSBlbHNlIGlmICgoL15tZXRhJC9pKS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDxtZXRhPlxuICAgICAgaWYgKHR5cGVvZiBub2RlSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZCwgeyAuLi5jb250ZXh0LCBpc01ldGE6IHRydWUsIGlzSGFuZGxlZDogdHJ1ZSB9KTtcblxuICAgICAgLy8gZG8gbm90aGluZyB3aXRoIHRoZXNlIHRhZ3NcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gZWxzZSB7IC8vIEV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgbGV0IGlzSGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoY2hpbGQubG9jYWxOYW1lID09PSAnbXl0aGl4LWxhbmd1YWdlLXBhY2snKSB7XG4gICAgICAgIGxldCBsYW5nUGFja0lEID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICBpZiAoIWxhbmdQYWNrSUQpIHtcbiAgICAgICAgICBsYW5nUGFja0lEID0gYElEJHtCYXNlVXRpbHMuU0hBMjU2KGAke2d1ZXNzZWRFbGVtZW50TmFtZX06JHtjaGlsZC5vdXRlckhUTUx9YCl9YDtcbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2lkJywgbGFuZ1BhY2tJRCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFuZ3VhZ2VQcm92aWRlciA9IHRoaXMuY2xvc2VzdCgnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG4gICAgICAgIGlmICghbGFuZ3VhZ2VQcm92aWRlcilcbiAgICAgICAgICBsYW5ndWFnZVByb3ZpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlUHJvdmlkZXIpIHtcbiAgICAgICAgICBpZiAoIWxhbmd1YWdlUHJvdmlkZXIucXVlcnlTZWxlY3RvcihgbXl0aGl4LWxhbmd1YWdlLXBhY2sjJHtsYW5nUGFja0lEfWApKVxuICAgICAgICAgICAgbGFuZ3VhZ2VQcm92aWRlci5pbnNlcnRCZWZvcmUoY2hpbGQsIGxhbmd1YWdlUHJvdmlkZXIuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgICBpc0hhbmRsZWQgPSB0cnVlO1xuICAgICAgICB9IC8vIGVsc2UgZG8gbm90aGluZy4uLiBsZXQgaXQgYmUgZHVtcGVkIGludG8gdGhlIGRvbSBsYXRlclxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBub2RlSGFuZGxlci5jYWxsKHRoaXMsIGNoaWxkLCB7IC4uLmNvbnRleHQsIGlzSGFuZGxlZCB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMucG9zdFByb2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0ZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGUgPSBvcHRpb25zLnBvc3RQcm9jZXNzLmNhbGwodGhpcywgY29udGV4dCk7XG4gICAgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGRyZW4pO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBDb21wb25lbnRVdGlsc1xuICogZGVzYzogfFxuICogICBMb2FkIGEgcmVzb3VyY2UgZnJvbSBhIFVSTCB3aXRoIGNhY2hpbmcgc3VwcG9ydC5cbiAqXG4gKiAgIEJ5IGRlZmF1bHQsIHVzZXMgYGNhY2hlOiAnZGVmYXVsdCdgIHdoaWNoIHJlc3BlY3RzIEhUVFAgY2FjaGluZyBoZWFkZXJzXG4gKiAgIChDYWNoZS1Db250cm9sLCBFVGFnLCBldGMuKS4gVGhlIGNhY2hlIG1vZGUgY2FuIGJlIG92ZXJyaWRkZW4gdmlhOlxuICogICAtIFVSTCBxdWVyeSBwYXJhbWV0ZXI6IGA/Y2FjaGU9bm8tc3RvcmVgXG4gKiAgIC0gZmV0Y2hPcHRpb25zLmNhY2hlOiBgeyBmZXRjaE9wdGlvbnM6IHsgY2FjaGU6ICduby1jYWNoZScgfSB9YFxuICpcbiAqICAgU3VwcG9ydGVkIGNhY2hlIHZhbHVlczpcbiAqICAgLSAnZGVmYXVsdCc6IEJyb3dzZXIgdXNlcyBIVFRQIGNhY2hlIGhlYWRlcnMgKHJlY29tbWVuZGVkKVxuICogICAtICduby1zdG9yZSc6IEJ5cGFzcyBjYWNoZSBjb21wbGV0ZWx5XG4gKiAgIC0gJ3JlbG9hZCc6IEZldGNoIGZyZXNoIGJ1dCB1cGRhdGUgY2FjaGVcbiAqICAgLSAnbm8tY2FjaGUnOiBBbHdheXMgcmV2YWxpZGF0ZSB3aXRoIHNlcnZlclxuICogICAtICdmb3JjZS1jYWNoZSc6IFVzZSBjYWNoZSBpZiBhdmFpbGFibGUsIGV2ZW4gaWYgc3RhbGVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmUodXJsT3JOYW1lLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgbGV0IHVybCAgICAgICAgICAgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgb3duZXJEb2N1bWVudC5sb2NhdGlvbiwgdXJsT3JOYW1lLCBvcHRpb25zLm1hZ2ljKTtcbiAgbGV0IGNhY2hlS2V5O1xuXG4gIC8vIENoZWNrIGZvciBjYWNoZSBtb2RlIG92ZXJyaWRlIGluIFVSTCBwYXJhbXNcbiAgbGV0IHVybENhY2hlUGFyYW0gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2FjaGUnKTtcbiAgbGV0IHNraXBJbnRlcm5hbENhY2hlID0gKC9eKGZhbHNlfG5vLXN0b3JlfHJlbG9hZHxuby1jYWNoZSkkLykudGVzdCh1cmxDYWNoZVBhcmFtKTtcblxuICBpZiAoIXNraXBJbnRlcm5hbENhY2hlKSB7XG4gICAgaWYgKHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYWNoZVBhcmFtcycpICE9PSAndHJ1ZScpIHtcbiAgICAgIGxldCBjYWNoZUtleVVSTCA9IG5ldyBVUkwoYCR7dXJsLm9yaWdpbn0ke3VybC5wYXRobmFtZX1gKTtcbiAgICAgIGNhY2hlS2V5ID0gY2FjaGVLZXlVUkwudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVLZXkgPSB1cmwudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgY2FjaGVkUmVzcG9uc2UgPSBSRVFVSVJFX0NBQ0hFLmdldChjYWNoZUtleSk7XG4gICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlZFJlc3BvbnNlO1xuICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlLnJlc3BvbnNlICYmIGNhY2hlZFJlc3BvbnNlLnJlc3BvbnNlLm9rKVxuICAgICAgICByZXR1cm4geyB1cmwsIHJlc3BvbnNlOiBjYWNoZWRSZXNwb25zZS5yZXNwb25zZSwgb3duZXJEb2N1bWVudCwgY2FjaGVkOiB0cnVlIH07XG4gICAgfVxuICB9XG5cbiAgLy8gQnVpbGQgZmV0Y2ggb3B0aW9ucyB3aXRoIGNhY2hlIHN1cHBvcnRcbiAgLy8gRGVmYXVsdCB0byAnZGVmYXVsdCcgd2hpY2ggcmVzcGVjdHMgSFRUUCBjYWNoaW5nIGhlYWRlcnMgKENhY2hlLUNvbnRyb2wsIEVUYWcsIGV0Yy4pXG4gIGxldCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgY2FjaGU6ICdkZWZhdWx0JyxcbiAgICAuLi4ob3B0aW9ucy5mZXRjaE9wdGlvbnMgfHwge30pLFxuICB9O1xuXG4gIC8vIFVSTCBwYXJhbWV0ZXIgb3ZlcnJpZGVzIGZldGNoT3B0aW9ucy5jYWNoZVxuICBpZiAodXJsQ2FjaGVQYXJhbSAmJiAvXihkZWZhdWx0fG5vLXN0b3JlfHJlbG9hZHxuby1jYWNoZXxmb3JjZS1jYWNoZXxvbmx5LWlmLWNhY2hlZCkkLy50ZXN0KHVybENhY2hlUGFyYW0pKVxuICAgIGZldGNoT3B0aW9ucy5jYWNoZSA9IHVybENhY2hlUGFyYW07XG5cbiAgbGV0IHByb21pc2UgPSBnbG9iYWxUaGlzLmZldGNoKHVybCwgZmV0Y2hPcHRpb25zKS50aGVuKFxuICAgIGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBpZiAoY2FjaGVLZXkpXG4gICAgICAgICAgUkVRVUlSRV9DQUNIRS5kZWxldGUoY2FjaGVLZXkpO1xuXG4gICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgZXJyb3IudXJsID0gdXJsO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgbGV0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICByZXNwb25zZS50ZXh0ID0gYXN5bmMgKCkgPT4gYm9keTtcbiAgICAgIHJlc3BvbnNlLmpzb24gPSBhc3luYyAoKSA9PiBKU09OLnBhcnNlKGJvZHkpO1xuXG4gICAgICByZXR1cm4geyB1cmwsIHJlc3BvbnNlLCBvd25lckRvY3VtZW50LCBjYWNoZWQ6IGZhbHNlIH07XG4gICAgfSxcbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZyb20gTXl0aGl4IFVJIFwicmVxdWlyZVwiOiAnLCBlcnJvcik7XG5cbiAgICAgIGlmIChjYWNoZUtleSlcbiAgICAgICAgUkVRVUlSRV9DQUNIRS5kZWxldGUoY2FjaGVLZXkpO1xuXG4gICAgICBlcnJvci51cmwgPSB1cmw7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9LFxuICApO1xuXG4gIFJFUVVJUkVfQ0FDSEUuc2V0KGNhY2hlS2V5LCBwcm9taXNlKTtcblxuICByZXR1cm4gYXdhaXQgcHJvbWlzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRQYXJ0aWFsSW50b0VsZW1lbnQoc3JjLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9O1xuXG4gIGxldCB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICB1cmwsXG4gICAgcmVzcG9uc2UsXG4gIH0gPSBhd2FpdCByZXF1aXJlLmNhbGwoXG4gICAgdGhpcyxcbiAgICBzcmMsXG4gICAge1xuICAgICAgb3duZXJEb2N1bWVudDogdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50LFxuICAgIH0sXG4gICk7XG5cbiAgbGV0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIHdoaWxlICh0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jaGlsZE5vZGVzWzBdKTtcblxuICBsZXQgc2NvcGVEYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZm9yIChsZXQgWyBrZXksIHZhbHVlIF0gb2YgdXJsLnNlYXJjaFBhcmFtcy5lbnRyaWVzKCkpXG4gICAgc2NvcGVEYXRhW2tleV0gPSBCYXNlVXRpbHMuY29lcmNlKHZhbHVlKTtcblxuICBpbXBvcnRJbnRvRG9jdW1lbnRGcm9tU291cmNlLmNhbGwoXG4gICAgdGhpcyxcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyRG9jdW1lbnQubG9jYXRpb24sXG4gICAgdXJsLFxuICAgIGJvZHksXG4gICAge1xuICAgICAgbm9kZUhhbmRsZXI6IChub2RlLCB7IGlzSGFuZGxlZCwgaXNUZW1wbGF0ZSB9KSA9PiB7XG4gICAgICAgIGlmICgoaXNUZW1wbGF0ZSB8fCAhaXNIYW5kbGVkKSAmJiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpKSB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cy5jYWxsKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBzY29wZTogVXRpbHMuY3JlYXRlU2NvcGUoc2NvcGVEYXRhLCBvcHRpb25zLnNjb3BlKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaWJpbGl0eU9ic2VydmVyKGNhbGxiYWNrLCBfb3B0aW9ucykge1xuICBjb25zdCBpbnRlcnNlY3Rpb25DYWxsYmFjayA9IChlbnRyaWVzKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0gZW50cmllcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQgZW50cnkgICA9IGVudHJpZXNbaV07XG4gICAgICBsZXQgZWxlbWVudCA9IGVudHJ5LnRhcmdldDtcbiAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBsZXQgZWxlbWVudE9ic2VydmVycyA9IFV0aWxzLm1ldGFkYXRhKGVsZW1lbnQsIE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTKTtcbiAgICAgIGlmICghZWxlbWVudE9ic2VydmVycykge1xuICAgICAgICBlbGVtZW50T2JzZXJ2ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICBVdGlscy5tZXRhZGF0YShlbGVtZW50LCBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUywgZWxlbWVudE9ic2VydmVycyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhID0gZWxlbWVudE9ic2VydmVycy5nZXQob2JzZXJ2ZXIpO1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSB7IHdhc1Zpc2libGU6IGZhbHNlLCByYXRpb1Zpc2libGU6IGVudHJ5LmludGVyc2VjdGlvblJhdGlvIH07XG4gICAgICAgIGVsZW1lbnRPYnNlcnZlcnMuc2V0KG9ic2VydmVyLCBkYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gZGF0YS5yYXRpb1Zpc2libGUpXG4gICAgICAgIGRhdGEucmF0aW9WaXNpYmxlID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW87XG5cbiAgICAgIGRhdGEucHJldmlvdXNWaXNpYmlsaXR5ID0gKGRhdGEudmlzaWJpbGl0eSA9PT0gdW5kZWZpbmVkKSA/IGRhdGEudmlzaWJpbGl0eSA6IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgIGRhdGEudmlzaWJpbGl0eSA9IChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDAuMCk7XG5cbiAgICAgIGNhbGxiYWNrKHsgLi4uZGF0YSwgZW50cnksIGVsZW1lbnQsIGluZGV4OiBpLCBkaXNjb25uZWN0OiAoKSA9PiBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCkgfSk7XG5cbiAgICAgIGlmIChkYXRhLnZpc2liaWxpdHkgJiYgIWRhdGEud2FzVmlzaWJsZSlcbiAgICAgICAgZGF0YS53YXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgcm9vdDogICAgICAgbnVsbCxcbiAgICB0aHJlc2hvbGQ6ICAwLjAsXG4gICAgLi4uKF9vcHRpb25zIHx8IHt9KSxcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGludGVyc2VjdGlvbkNhbGxiYWNrLCBvcHRpb25zKTtcbiAgbGV0IGVsZW1lbnRzICA9IChfb3B0aW9ucyB8fCB7fSkuZWxlbWVudHMgfHwgW107XG5cbiAgZm9yIChsZXQgaSA9IDAsIGlsID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKylcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRzW2ldKTtcblxuICByZXR1cm4gb2JzZXJ2ZXI7XG59XG5cbmNvbnN0IE5PX09CU0VSVkVSID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHdhc1Zpc2libGU6ICAgICAgICAgZmFsc2UsXG4gIHJhdGlvVmlzaWJsZTogICAgICAgMC4wLFxuICB2aXNpYmlsaXR5OiAgICAgICAgIGZhbHNlLFxuICBwcmV2aW91c1Zpc2liaWxpdHk6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaXNpYmlsaXR5TWV0YShlbGVtZW50LCBvYnNlcnZlcikge1xuICBsZXQgZWxlbWVudE9ic2VydmVycyA9IFV0aWxzLm1ldGFkYXRhKGVsZW1lbnQsIE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTKTtcbiAgaWYgKCFlbGVtZW50T2JzZXJ2ZXJzKVxuICAgIHJldHVybiBOT19PQlNFUlZFUjtcblxuICByZXR1cm4gZWxlbWVudE9ic2VydmVycy5nZXQob2JzZXJ2ZXIpIHx8IE5PX09CU0VSVkVSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFyZ2VzdERvY3VtZW50VGFiSW5kZXgob3duZXJEb2N1bWVudCkge1xuICBsZXQgbGFyZ2VzdCA9IC1JbmZpbml0eTtcblxuICBBcnJheS5mcm9tKChvd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJykpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBsZXQgdGFiSW5kZXggPSBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSwgMTApO1xuICAgIGlmICghaXNGaW5pdGUodGFiSW5kZXgpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHRhYkluZGV4ID4gbGFyZ2VzdClcbiAgICAgIGxhcmdlc3QgPSB0YWJJbmRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIChsYXJnZXN0IDwgMCkgPyAwIDogbGFyZ2VzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFNjcmlwdEludG9IZWFkKF91cmwsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCBhdHRyaWJ1dGVzICAgID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgbGV0IHNjcmlwdEVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBsZXQgdXJsICAgICAgICAgICA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmxvY2F0aW9uLCBfdXJsLCB7IG1hZ2ljOiB0cnVlIH0pO1xuXG4gIGZvciAobGV0IFsgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xuICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnc3JjJylcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIG93bmVyRG9jdW1lbnQubG9jYXRpb24sIGF0dHJpYnV0ZVZhbHVlLCB7IG1hZ2ljOiB0cnVlIH0pO1xuXG4gICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgbGV0IHNjcmlwdElEID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gIGlmICghc2NyaXB0SUQpIHtcbiAgICBzY3JpcHRJRCA9IGBJRCR7QmFzZVV0aWxzLlNIQTI1Nih1cmwpfWA7XG4gICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0SUQpO1xuICB9XG5cbiAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXR0cmlidXRlcywgJ3R5cGUnKSlcbiAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdtb2R1bGUnKTtcblxuICAvLyBhcHBlbmQgdG8gaGVhZFxuICBpZiAoIW93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihzY3JpcHRJRCkpXG4gICAgb3duZXJEb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuXG4gIHJldHVybiBzY3JpcHRFbGVtZW50O1xufSIsIi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBDb25zdGFudHNcbiAqIGdyb3VwTmFtZTogQ29uc3RhbnRzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIE1pc2MgZ2xvYmFsIGNvbnN0YW50cyBhcmUgZm91bmQgd2l0aGluIHRoaXMgbmFtZXNwYWNlLlxuICogcHJvcGVydGllczpcbiAqICAgLSBuYW1lOiBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSU1xuICogICAgIGRhdGFUeXBlOiBzeW1ib2xcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGlzIHN5bWJvbCBpcyB1c2VkIGFzIGEgQHNlZSBVdGlscy5tZXRhZGF0YTsga2V5IGFnYWluc3QgZWxlbWVudHMgd2l0aCBhIGBkYXRhLXNyY2AgYXR0cmlidXRlLlxuICogICAgICAgRm9yIGVsZW1lbnRzIHdpdGggdGhpcyBhdHRyaWJ1dGUsIHNldCBhbiBbaW50ZXJzZWN0aW9uIG9ic2VydmVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW50ZXJzZWN0aW9uX09ic2VydmVyX0FQSSkgaXMgc2V0dXAuXG4gKiAgICAgICBXaGVuIHRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgcmVwb3J0cyB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUsIHRoZW4gdGhlIFVSTCBzcGVjaWZpZWQgYnkgYGRhdGEtc3JjYCBpcyBmZXRjaGVkLCBhbmQgZHVtcGVkIGludG9cbiAqICAgICAgIHRoZSBlbGVtZW50IGFzIGl0cyBjaGlsZHJlbi4gVGhpcyBhbGxvd3MgZm9yIGR5bmFtaWMgXCJwYXJ0aWFsc1wiIHRoYXQgYXJlIGxvYWRlZCBhdCBydW4tdGltZS5cbiAqXG4gKiAgICAgICBUaGUgdmFsdWUgc3RvcmVkIGF0IHRoaXMgQHNlZSBVdGlscy5tZXRhZGF0YTsga2V5IGlzIGEgTWFwIG9mIFtpbnRlcnNlY3Rpb24gb2JzZXJ2ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnRlcnNlY3Rpb25PYnNlcnZlcilcbiAqICAgICAgIGluc3RhbmNlcy4gVGhlIGtleXMgb2YgdGhpcyBtYXAgYXJlIHRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXJzIHRoZW1zZWx2ZXMuIFRoZSB2YWx1ZXMgYXJlIHJhdyBvYmplY3RzIHdpdGggdGhlIHNoYXBlXG4gKiAgICAgICBgeyB3YXNWaXNpYmxlOiBib29sZWFuLCByYXRpb1Zpc2libGU6IGZsb2F0LCBwcmV2aW91c1Zpc2liaWxpdHk6IGJvb2xlYW4sIHZpc2liaWxpdHk6IGJvb2xlYW4gfWAuXG4gKiAgIC0gbmFtZTogTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVJcbiAqICAgICBkYXRhVHlwZTogc3ltYm9sXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBpcyB1c2VkIGFzIGEgQHNlZSBVdGlscy5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyBrZXkgYnkgQHNlZSBVdGlscy5nbG9iYWxTdG9yZU5hbWVWYWx1ZVBhaXJIZWxwZXI7XG4gKiAgICAgICB0byBzdG9yZSBrZXkvdmFsdWUgcGFpcnMgZm9yIGEgc2luZ2xlIHZhbHVlLlxuICpcbiAqICAgICAgIE15dGhpeCBVSSBoYXMgZ2xvYmFsIHN0b3JlIGFuZCBmZXRjaCBoZWxwZXJzIGZvciBzZXR0aW5nIGFuZCBmZXRjaGluZyBkeW5hbWljIHByb3BlcnRpZXMuIFRoZXNlXG4gKiAgICAgICBtZXRob2RzIG9ubHkgYWNjZXB0IGEgc2luZ2xlIHZhbHVlIGJ5IGRlc2lnbi4uLiBidXQgc29tZXRpbWVzIGl0IGlzIGRlc2lyZWQgdGhhdCBhIHZhbHVlIGJlIHNldFxuICogICAgICAgd2l0aCBhIHNwZWNpZmljIGtleSBpbnN0ZWFkLiBUaGlzIGBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUmAgcHJvcGVydHkgYXNzaXN0cyB3aXRoIHRoaXMgcHJvY2VzcyxcbiAqICAgICAgIGFsbG93aW5nIGdsb2JhbCBoZWxwZXJzIHRvIHN0aWxsIGZ1bmN0aW9uIHdpdGggYSBzaW5nbGUgdmFsdWUgc2V0LCB3aGlsZSBpbiBzb21lIGNhc2VzIHN0aWxsIHBhc3NpbmdcbiAqICAgICAgIGEga2V5IHRocm91Z2ggdG8gdGhlIHNldHRlci4gQHNvdXJjZVJlZiBfbXl0aGl4TmFtZVZhbHVlUGFpckhlbHBlclVzYWdlO1xuICogICAgIG5vdGVzOlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDp3YXJuaW5nOiBVc2UgYXQgeW91ciBvd24gcmlzay4gVGhpcyBpcyBNeXRoaXggVUkgaW50ZXJuYWwgY29kZSB0aGF0IG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuICogICAtIG5hbWU6IE1ZVEhJWF9TSEFET1dfUEFSRU5UXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdXNlZCBhcyBhIEBzZWUgVXRpbHMubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsga2V5IGJ5IEBzZWUgTXl0aGl4VUlDb21wb25lbnQ7IHRvXG4gKiAgICAgICBzdG9yZSB0aGUgcGFyZW50IG5vZGUgb2YgYSBTaGFkb3cgRE9NLCBzbyB0aGF0IGl0IGNhbiBsYXRlciBiZSB0cmF2ZXJzZWQgYnkgQHNlZSBVdGlscy5nZXRQYXJlbnROb2RlOy5cbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gfFxuICogICAgICAgICA6d2FybmluZzogVXNlIGF0IHlvdXIgb3duIHJpc2suIFRoaXMgaXMgTXl0aGl4IFVJIGludGVybmFsIGNvZGUgdGhhdCBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cbiAqICAgICAgIC0gfFxuICogICAgICAgICA6ZXllOiBAc2VlIFV0aWxzLmdldFBhcmVudE5vZGU7LlxuICogICAtIG5hbWU6IE1ZVEhJWF9UWVBFXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdXNlZCBmb3IgdHlwZSBjaGVja2luZyBieSBgaW5zdGFuY2VvZmAgY2hlY2tzIHRvIGRldGVybWluZSBpZiBhbiBpbnN0YW5jZVxuICogICAgICAgaXMgYSBzcGVjaWZpYyB0eXBlIChldmVuIGFjcm9zcyBqYXZhc2NyaXB0IGNvbnRleHRzIGFuZCBsaWJyYXJ5IHZlcnNpb25zKS4gQHNvdXJjZVJlZiBfbXl0aGl4VHlwZUV4YW1wbGU7XG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNUeXBlOy5cbiAqICAgLSBuYW1lOiBEWU5BTUlDX1BST1BFUlRZX1RZUEVcbiAqICAgICBkYXRhVHlwZTogc3ltYm9sXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVXNlZCBmb3IgcnVudGltZSB0eXBlIHJlZmxlY3Rpb24gYWdhaW5zdCBAc2VlIFV0aWxzLkR5bmFtaWNQcm9wZXJ0eTsuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBEeW5hbWljUHJvcGVydHk7LlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBDb25zdGFudHMuTVlUSElYX1RZUEU7LlxuICovXG5cbi8vIEJhc2VcbmV4cG9ydCBjb25zdCBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUiAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb25zdGFudHMvbmFtZS12YWx1ZS1wYWlyLWhlbHBlcicpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUlxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9TSEFET1dfUEFSRU5UICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbnN0YW50cy9zaGFkb3ctcGFyZW50Jyk7IC8vIEByZWY6Q29uc3RhbnRzLk1ZVEhJWF9TSEFET1dfUEFSRU5UXG5leHBvcnQgY29uc3QgTVlUSElYX1RZUEUgICAgICAgICAgICAgICAgICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29uc3RhbnRzL2VsZW1lbnQtZGVmaW5pdGlvbicpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfVFlQRVxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvaW50ZXJzZWN0aW9uLW9ic2VydmVycycpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSU1xuZXhwb3J0IGNvbnN0IE1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRCAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvZG9jdW1lbnQtaW5pdGlhbGl6ZWQnKTsgLy8gQHJlZjpDb25zdGFudHMuTVlUSElYX0RPQ1VNRU5UX0lOSVRJQUxJWkVEXG5cbi8vIER5bmFtaWNQcm9wZXJ0eVxuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfVkFMVUUgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL3ZhbHVlJyk7XG5leHBvcnQgY29uc3QgRFlOQU1JQ19QUk9QRVJUWV9JU19TRVRUSU5HICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvZHluYW1pYy1wcm9wZXJ0eS9jb25zdGFudHMvaXMtc2V0dGluZycpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfU0VUICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL3NldCcpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfTElTVEVORVJTICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL2xpc3RlbmVycycpO1xuXG4vLyBUeXBlc1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfREVGSU5JVElPTl9UWVBFICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpFbGVtZW50RGVmaW5pdGlvbicpO1xuZXhwb3J0IGNvbnN0IFFVRVJZX0VOR0lORV9UWVBFICAgICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpRdWVyeUVuZ2luZScpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfVFlQRSAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpEeW5hbWljUHJvcGVydHknKTsgLy8gQHJlZjpDb25zdGFudHMuRFlOQU1JQ19QUk9QRVJUWV9UWVBFXG5leHBvcnQgY29uc3QgTVlUSElYX1VJX0NPTVBPTkVOVF9UWVBFICAgICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvdHlwZXMvTXl0aGl4VUk6Ok15dGhpeFVJQ29tcG9uZW50Jyk7XG5cbi8vIEVsZW1lbnRzXG5leHBvcnQgY29uc3QgVU5GSU5JU0hFRF9ERUZJTklUSU9OICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29uc3RhbnRzL3VuZmluaXNoZWQnKTtcblxuXG4iLCJpbXBvcnQge1xuICBEWU5BTUlDX1BST1BFUlRZX1RZUEUsXG4gIERZTkFNSUNfUFJPUEVSVFlfVkFMVUUsXG4gIERZTkFNSUNfUFJPUEVSVFlfSVNfU0VUVElORyxcbiAgRFlOQU1JQ19QUk9QRVJUWV9TRVQsXG4gIERZTkFNSUNfUFJPUEVSVFlfTElTVEVORVJTLFxuICBNWVRISVhfVFlQRSxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcblxuZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KTtcblxuLyoqXG4gKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICogZGVzYzogfFxuICogICBgRHluYW1pY1Byb3BlcnR5YCBpcyBhIHNpbXBsZSB2YWx1ZSBzdG9yYWdlIGNsYXNzIHdyYXBwZWQgaW4gYSBQcm94eS5cbiAqXG4gKiAgICBJdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHN0b3JlIGFueSBkZXNpcmVkIHZhbHVlLiBUaGUgY2F0Y2ggaG93ZXZlciBpcyB0aGF0XG4gKiAgICBhbnkgdmFsdWUgc3RvcmVkIGNhbiBvbmx5IGJlIHNldCB0aHJvdWdoIGl0cyBzcGVjaWFsIGBzZXRgIG1ldGhvZC5cbiAqXG4gKiAgICBUaGlzIHdpbGwgYWxsb3cgYW55IGxpc3RlbmVycyB0byByZWNlaXZlIHRoZSBgJ3VwZGF0ZSdgIGV2ZW50IHdoZW4gYSB2YWx1ZSBpcyBzZXQuXG4gKlxuICogICAgU2luY2UgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2VzIGFyZSBhbHNvIGFsd2F5cyB3cmFwcGVkIGluIGEgUHJveHksIHRoZSB1c2VyIG1heVxuICogICAgXCJkaXJlY3RseVwiIGFjY2VzcyBhdHRyaWJ1dGVzIG9mIHRoZSBzdG9yZWQgdmFsdWUuIEZvciBleGFtcGxlLCBpZiBhIGBEeW5hbWljUHJvcGVydHlgXG4gKiAgICBpcyBzdG9yaW5nIGFuIEFycmF5IGluc3RhbmNlLCB0aGVuIG9uZSB3b3VsZCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgYC5sZW5ndGhgIHByb3BlcnR5XG4gKiAgICBcImRpcmVjdGx5XCIsIGkuZS4gYGR5bmFtaWNQcm9wLmxlbmd0aGAuXG4gKlxuICogICAgYER5bmFtaWNQcm9wZXJ0eWAgaGFzIGEgc3BlY2lhbCBgc2V0YCBtZXRob2QsIHdob3NlIG5hbWUgaXMgYSBgc3ltYm9sYCwgdG8gYXZvaWQgY29uZmxpY3RpbmdcbiAqICAgIG5hbWVzcGFjZXMgd2l0aCB0aGUgdW5kZXJseWluZyBkYXRhdHlwZSAoYW5kIHRoZSB3cmFwcGluZyBQcm94eSkuXG4gKiAgICBUbyBzZXQgYSB2YWx1ZSBvbiBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCBvbmUgbXVzdCBkbyBzbyBhcyBmb2xsb3dzOiBgZHluYW1pY1Byb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKG15TmV3VmFsdWUpYC5cbiAqICAgIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGludGVybmFsIHZhbHVlLCBhbmQgaWYgdGhlIHNldCB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHN0b3JlZCB2YWx1ZSwgdGhlIGAndXBkYXRlJ2AgZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIHRvXG4gKiAgICBhbnkgbGlzdGVuZXJzLlxuICpcbiAqICAgIEFzIGBEeW5hbWljUHJvcGVydHlgIGlzIGFuIFtFdmVudFRhcmdldF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L0V2ZW50VGFyZ2V0KSwgb25lIGNhbiBhdHRhY2hcbiAqICAgIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgYCd1cGRhdGUnYCBldmVudCB0byBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gdGhlIHVuZGVybHlpbmcgdmFsdWUuIFRoZSBgJ3VwZGF0ZSdgIGV2ZW50IGlzIHRoZSBvbmx5IGV2ZW50IHRoYXQgaXNcbiAqICAgIGV2ZXIgdHJpZ2dlcmVkIGJ5IHRoaXMgY2xhc3MuIFRoZSByZWNlaXZlZCBgZXZlbnRgIGluc3RhbmNlIGluIGV2ZW50IGNhbGxiYWNrcyB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxuICogICAgMS4gYHVwZGF0ZUV2ZW50Lm9yaWdpbmF0b3IgPSB0aGlzO2AgLSBgb3JpZ2luYXRvcmAgaXMgdGhlIGluc3RhbmNlIG9mIHRoZSBgRHluYW1pY1Byb3BlcnR5YCB3aGVyZSB0aGUgZXZlbnQgb3JpZ2luYXRlZCBmcm9tLlxuICogICAgMi4gYHVwZGF0ZUV2ZW50Lm9sZFZhbHVlID0gY3VycmVudFZhbHVlO2AgLSBgb2xkVmFsdWVgIGNvbnRhaW5zIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYER5bmFtaWNQcm9wZXJ0eWAgYmVmb3JlIHNldC5cbiAqICAgIDMuIGB1cGRhdGVFdmVudC52YWx1ZSA9IG5ld1ZhbHVlO2AgLSBgdmFsdWVgIGNvbnRhaW5zIHRoZSBjdXJyZW50IHZhbHVlIGJlaW5nIHNldCBvbiB0aGUgYER5bmFtaWNQcm9wZXJ0eWAuXG4gKlxuICogICAgVG8gcmV0cmlldmUgdGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlIG9mIGEgYER5bmFtaWNQcm9wZXJ0eWAsIG9uZSBtYXkgY2FsbCBgdmFsdWVPZigpYDogYGxldCByYXdWYWx1ZSA9IGR5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mKCk7YFxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDp3YXJuaW5nOiBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZXMgd2lsbCBpbnRlcm5hbGx5IHRyYWNrIHdoZW4gYSBgc2V0YCBvcGVyYXRpb24gaXMgdW5kZXJ3YXksIHRvIHByZXZlbnRcbiAqICAgICBjeWNsaWMgc2V0cyBhbmQgbWF4aW11bSBjYWxsIHN0YWNrIGVycm9ycy4gWW91IGFyZSBhbGxvd2VkIHRvIHNldCB0aGUgdmFsdWUgcmVjdXJzaXZlbHksIGhvd2V2ZXIgYHVwZGF0ZWAgZXZlbnRzXG4gKiAgICAgd2lsbCBvbmx5IGJlIGRpc3BhdGNoZWQgZm9yIHRoZSBmaXJzdCBgc2V0YCBjYWxsLiBBbnkgYHNldGAgb3BlcmF0aW9uIHRoYXQgaGFwcGVucyB3aGlsZSBhbm90aGVyIGBzZXRgIG9wZXJhdGlvbiBpc1xuICogICAgIHVuZGVyd2F5IHdpbGwgKipub3QqKiBkaXNwYXRjaCBhbnkgYCd1cGRhdGUnYCBldmVudHMuXG4gKiAgIC0gfFxuICogICAgIGAndXBkYXRlJ2AgZXZlbnRzIHdpbGwgYmUgZGlzcGF0Y2hlZCBpbW1lZGlhdGVseSAqYWZ0ZXIqIHRoZSBpbnRlcm5hbCB1bmRlcmx5aW5nIHN0b3JlZCB2YWx1ZSBpcyB1cGRhdGVkLiBUaG91Z2ggaXQgaXNcbiAqICAgICBwb3NzaWJsZSB0byBgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uYCBpbiBhbiBldmVudCBjYWxsYmFjaywgYXR0ZW1wdGluZyB0byBcInByZXZlbnREZWZhdWx0XCIgb3IgXCJzdG9wUHJvcGFnYXRpb25cIiB3aWxsIGRvIG5vdGhpbmcuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IER5bmFtaWNQcm9wZXJ0eSB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gKlxuICogICAgIGxldCBkeW5hbWljUHJvcGVydHkgPSBuZXcgRHluYW1pY1Byb3BlcnR5KCdpbml0aWFsIHZhbHVlJyk7XG4gKlxuICogICAgIGR5bmFtaWNQcm9wZXJ0eS5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGUnLCAoZXZlbnQpID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKGBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICcke2V2ZW50LnZhbHVlfScsIFByZXZpb3VzIFZhbHVlID0gJyR7ZXZlbnQub2xkVmFsdWV9J2ApO1xuICogICAgICAgY29uc29sZS5sb2coYEN1cnJlbnQgVmFsdWUgPSAnJHtkeW5hbWljUHJvcGVydHkudmFsdWVPZigpfSdgKTtcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgZHluYW1pY1Byb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKCduZXcgdmFsdWUnKTtcbiAqXG4gKiAgICAgLy8gb3V0cHV0IC0+IER5bmFtaWMgUHJvcGVydHkgVXBkYXRlZCEgTmV3IHZhbHVlID0gJ25ldyB2YWx1ZScsIE9sZCBWYWx1ZSA9ICdpbml0aWFsIHZhbHVlJ1xuICogICAgIC8vIG91dHB1dCAtPiBDdXJyZW50IFZhbHVlID0gJ2luaXRpYWwgdmFsdWUnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljUHJvcGVydHkgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkgeyAvLyBAcmVmOl9teXRoaXhUeXBlRXhhbXBsZVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGluc3RhbmNlICYmIGluc3RhbmNlW01ZVEhJWF9UWVBFXSA9PT0gRFlOQU1JQ19QUk9QRVJUWV9UWVBFKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IFByb3BlcnR5XG4gICAqIG5hbWU6IHNldFxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBzdGF0aWM6IHRydWVcbiAgICogZGVzYzogfFxuICAgKiAgIEEgc3BlY2lhbCBgc3ltYm9sYCB1c2VkIHRvIGFjY2VzcyB0aGUgYHNldGAgbWV0aG9kIG9mIGEgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgYGBgamF2YXNjcmlwdFxuICAgKiAgICAgaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAgICpcbiAgICogICAgIGxldCBkeW5hbWljUHJvcGVydHkgPSBuZXcgRHluYW1pY1Byb3BlcnR5KCdpbml0aWFsIHZhbHVlJyk7XG4gICAqXG4gICAqICAgICBkeW5hbWljUHJvcGVydHkuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgKGV2ZW50KSA9PiB7XG4gICAqICAgICAgIGNvbnNvbGUubG9nKGBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICcke2V2ZW50LnZhbHVlfScsIFByZXZpb3VzIFZhbHVlID0gJyR7ZXZlbnQub2xkVmFsdWV9J2ApO1xuICAgKiAgICAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBWYWx1ZSA9ICcke2R5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mKCl9J2ApO1xuICAgKiAgICAgfSk7XG4gICAqXG4gICAqICAgICBkeW5hbWljUHJvcGVydHlbRHluYW1pY1Byb3BlcnR5LnNldF0oJ25ldyB2YWx1ZScpO1xuICAgKlxuICAgKiAgICAgLy8gb3V0cHV0IC0+IER5bmFtaWMgUHJvcGVydHkgVXBkYXRlZCEgTmV3IHZhbHVlID0gJ25ldyB2YWx1ZScsIE9sZCBWYWx1ZSA9ICdpbml0aWFsIHZhbHVlJ1xuICAgKiAgICAgLy8gb3V0cHV0IC0+IEN1cnJlbnQgVmFsdWUgPSAnaW5pdGlhbCB2YWx1ZSdcbiAgICogICAgIGBgYFxuICAgKi9cbiAgc3RhdGljIHNldCA9IERZTkFNSUNfUFJPUEVSVFlfU0VUOyAvLyBAcmVmOkR5bmFtaWNQcm9wZXJ0eS5zZXRcblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogbmFtZTogY29uc3RydWN0b3JcbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBVdGlsc1xuICAgKiBkZXNjOiB8XG4gICAqICAgQ29uc3RydWN0IGEgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IGluaXRpYWxWYWx1ZVxuICAgKiAgICAgZGF0YVR5cGU6IGFueVxuICAgKiAgICAgZGVzYzpcbiAgICogICAgICAgVGhlIGluaXRpYWwgdmFsdWUgdG8gc3RvcmUuXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFRoaXMgd2lsbCByZXR1cm4gYSBQcm94eSBpbnN0YW5jZSB3cmFwcGluZyB0aGUgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UuXG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogWW91IGNhbiBub3Qgc2V0IGEgYER5bmFtaWNQcm9wZXJ0eWAgdG8gYW5vdGhlciBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZS5cbiAgICogICAgIElmIGBpbml0aWFsVmFsdWVgIGlzIGEgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UsIGl0IHdpbGwgdXNlIHRoZSBzdG9yZWQgdmFsdWVcbiAgICogICAgIG9mIHRoYXQgaW5zdGFuY2UgaW5zdGVhZCAoYnkgY2FsbGluZyBAc2VlIER5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mOykuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBEWU5BTUlDX1BST1BFUlRZX1RZUEUsXG4gICAgICB9LFxuICAgICAgW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIChCYXNlVXRpbHMuaXNUeXBlKGluaXRpYWxWYWx1ZSwgRHluYW1pY1Byb3BlcnR5KSkgPyBpbml0aWFsVmFsdWUudmFsdWVPZigpIDogaW5pdGlhbFZhbHVlLFxuICAgICAgfSxcbiAgICAgIFtEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGZhbHNlLFxuICAgICAgfSxcbiAgICAgIFtEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU106IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbmV3IE1hcCgpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGxldCBwcm94eSA9IG5ldyBQcm94eSh0aGlzLCB7XG4gICAgICBnZXQ6ICAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BOYW1lXTtcbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZS5iaW5kKHRhcmdldCkgOiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXVtwcm9wTmFtZV07XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09ICdmdW5jdGlvbicpID8gdmFsdWUuYmluZCh0YXJnZXRbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV0pIDogdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiAgKHRhcmdldCwgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGFyZ2V0W0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdW3Byb3BOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm94eTtcbiAgfVxuXG4gIFtTeW1ib2wudG9QcmltaXRpdmVdKGhpbnQpIHtcbiAgICBpZiAoaGludCA9PT0gJ251bWJlcicpXG4gICAgICByZXR1cm4gK3RoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV07XG4gICAgZWxzZSBpZiAoaGludCA9PT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIGR5bmFtaWMgcHJvcGVydHkgdmFsdWUgdG8gYSBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHZhbHVlID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXTtcbiAgICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZS50b1N0cmluZygpIDogKCcnICsgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIGdyb3VwTmFtZTogRHluYW1pY1Byb3BlcnR5XG4gICAqIHBhcmVudDogRHluYW1pY1Byb3BlcnR5XG4gICAqIGRlc2M6IHxcbiAgICogICBGZXRjaCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlczogYW55OyBUaGUgdW5kZXJsaW5nIHJhdyB2YWx1ZS5cbiAgICovXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgRHluYW1pY1Byb3BlcnR5LlxuICAgKiBAcmV0dXJucyB7Kn0gVGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlLlxuICAgKi9cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBkZXNjOiB8XG4gICAqICAgSW50ZXJuYWwgZmFsbGJhY2sgbWV0aG9kIHRvIG5vdGlmeSBsaXN0ZW5lcnMgZGlyZWN0bHkgd2hlbiBuYXRpdmUgRXZlbnRUYXJnZXRcbiAgICogICBkaXNwYXRjaGluZyBmYWlscyAoZS5nLiwgZHVlIHRvIEV2ZW50IGNsYXNzIG1pc21hdGNoZXMgaW4gTm9kZS5qcy9KU0RPTSBlbnZpcm9ubWVudHMpLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBldmVudFR5cGVcbiAgICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IFRoZSBldmVudCB0eXBlIHRvIGRpc3BhdGNoIChlLmcuLCAndXBkYXRlJykuXG4gICAqICAgLSBuYW1lOiBldmVudERhdGFcbiAgICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAgICogICAgIGRlc2M6IEFuIG9iamVjdCBjb250YWluaW5nIGV2ZW50IGRhdGEgdG8gcGFzcyB0byBoYW5kbGVycy5cbiAgICovXG4gIF9ub3RpZnlMaXN0ZW5lcnMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBsZXQgbGlzdGVuZXJzTWFwID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU107XG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldChldmVudFR5cGUpO1xuXG4gICAgaWYgKCFoYW5kbGVycylcbiAgICAgIHJldHVybjtcblxuICAgIGZvciAobGV0IGhhbmRsZXIgb2YgaGFuZGxlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnREYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGhhbmRsZXJFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEeW5hbWljUHJvcGVydHk6IEVycm9yIGluIGV2ZW50IGhhbmRsZXI6JywgaGFuZGxlckVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIE92ZXJyaWRlIG9mIEV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIgdGhhdCBhbHNvIHRyYWNrcyBoYW5kbGVycyBpbiBhbiBpbnRlcm5hbFxuICAgKiAgIHJlZ2lzdHJ5IGZvciBjcm9zcy1wbGF0Zm9ybSBjb21wYXRpYmlsaXR5IGZhbGxiYWNrLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiB0eXBlXG4gICAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gICAqICAgICBkZXNjOiBUaGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICAgKiAgIC0gbmFtZTogaGFuZGxlclxuICAgKiAgICAgZGF0YVR5cGU6IGZ1bmN0aW9uXG4gICAqICAgICBkZXNjOiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGV2ZW50IGZpcmVzLlxuICAgKiAgIC0gbmFtZTogb3B0aW9uc1xuICAgKiAgICAgZGF0YVR5cGU6IG9iamVjdCB8IGJvb2xlYW5cbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkZXNjOiBPcHRpb25zIHBhc3NlZCB0byB0aGUgbmF0aXZlIGFkZEV2ZW50TGlzdGVuZXIuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHZhbHVlIGNoYW5nZXMuIEFsc28gdHJhY2tzIGhhbmRsZXJzIGluIGFuIGludGVybmFsIHJlZ2lzdHJ5IGZvciBjcm9zcy1wbGF0Zm9ybSBjb21wYXRpYmlsaXR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IgKGUuZy4sICd1cGRhdGUnKS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fGJvb2xlYW59IFtvcHRpb25zXSAtIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBuYXRpdmUgYWRkRXZlbnRMaXN0ZW5lci5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGxpc3RlbmVyc01hcCA9IHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9MSVNURU5FUlNdO1xuICAgIGlmICghbGlzdGVuZXJzTWFwLmhhcyh0eXBlKSlcbiAgICAgIGxpc3RlbmVyc01hcC5zZXQodHlwZSwgW10pO1xuXG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldCh0eXBlKTtcbiAgICBpZiAoIWhhbmRsZXJzLmluY2x1ZGVzKGhhbmRsZXIpKVxuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBkZXNjOiB8XG4gICAqICAgT3ZlcnJpZGUgb2YgRXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciB0aGF0IGFsc28gcmVtb3ZlcyBoYW5kbGVycyBmcm9tIHRoZVxuICAgKiAgIGludGVybmFsIHJlZ2lzdHJ5IHVzZWQgZm9yIGNyb3NzLXBsYXRmb3JtIGNvbXBhdGliaWxpdHkgZmFsbGJhY2suXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IHR5cGVcbiAgICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IFRoZSBldmVudCB0eXBlIHRvIHN0b3AgbGlzdGVuaW5nIGZvci5cbiAgICogICAtIG5hbWU6IGhhbmRsZXJcbiAgICogICAgIGRhdGFUeXBlOiBmdW5jdGlvblxuICAgKiAgICAgZGVzYzogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIGRhdGFUeXBlOiBvYmplY3QgfCBib29sZWFuXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVzYzogT3B0aW9ucyBwYXNzZWQgdG8gdGhlIG5hdGl2ZSByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgKi9cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBBbHNvIHJlbW92ZXMgaGFuZGxlcnMgZnJvbSB0aGUgaW50ZXJuYWwgcmVnaXN0cnkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtPYmplY3R8Ym9vbGVhbn0gW29wdGlvbnNdIC0gT3B0aW9ucyBwYXNzZWQgdG8gdGhlIG5hdGl2ZSByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBsZXQgbGlzdGVuZXJzTWFwID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU107XG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldCh0eXBlKTtcblxuICAgIGlmICghaGFuZGxlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgaGFuZGxlckluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlckluZGV4ICE9PSAtMSlcbiAgICAgIGhhbmRsZXJzLnNwbGljZShoYW5kbGVySW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIG5hbWU6IFwiW0R5bmFtaWNQcm9wZXJ0eS5zZXRdXCJcbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIFNldCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgSWYgdGhlIGN1cnJlbnQgc3RvcmVkIHZhbHVlIGlzIGV4YWN0bHkgdGhlIHNhbWUgYXMgdGhlIHByb3ZpZGVkIGB2YWx1ZWAsXG4gICAqICAgdGhlbiB0aGlzIG1ldGhvZCB3aWxsIHNpbXBseSByZXR1cm4uXG4gICAqXG4gICAqICAgT3RoZXJ3aXNlLCB3aGVuIHRoZSB1bmRlcmx5aW5nIHZhbHVlIGlzIHVwZGF0ZWQsIGB0aGlzLmRpc3BhdGNoRXZlbnRgIHdpbGxcbiAgICogICBiZSBjYWxsZWQgdG8gZGlzcGF0Y2ggYW4gYCd1cGRhdGUnYCBldmVudCB0byBub3RpZnkgYWxsIGxpc3RlbmVycyB0aGF0IHRoZVxuICAgKiAgIHVuZGVybHlpbmcgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbmV3VmFsdWVcbiAgICogICAgIGRhdGFUeXBlOiBhbnlcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIG5ldyB2YWx1ZSB0byBzZXQuIElmIHRoaXMgaXMgaXRzZWxmIGEgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UsIHRoZW5cbiAgICogICAgICAgaXQgd2lsbCBiZSB1bndyYXBwZWQgdG8gaXRzIHVuZGVybHlpbmcgdmFsdWUsIGFuZCB0aGF0IHdpbGwgYmUgdXNlZCBhcyB0aGUgdmFsdWUgaW5zdGVhZC5cbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIEFuIG9iamVjdCB0byBwcm92aWRlZCBvcHRpb25zIGZvciB0aGUgb3BlcmF0aW9uLiBUaGUgc2hhcGUgb2YgdGhpcyBvYmplY3QgaXMgYHsgZGlzcGF0Y2hVcGRhdGVFdmVudDogYm9vbGVhbiB9YC5cbiAgICogICAgICAgSWYgYG9wdGlvbnMuZGlzcGF0Y2hVcGRhdGVFdmVudGAgZXF1YWxzIGBmYWxzZWAsIHRoZW4gbm8gYCd1cGRhdGUnYCBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdG8gbGlzdGVuZXJzLlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBJZiB0aGUgdW5kZXJseWluZyBzdG9yZWQgdmFsdWUgaXMgZXhhY3RseSB0aGUgc2FtZSBhcyB0aGUgdmFsdWUgcHJvdmlkZWQsXG4gICAqICAgICB0aGVuIG5vdGhpbmcgd2lsbCBoYXBwZW4sIGFuZCB0aGUgbWV0aG9kIHdpbGwgc2ltcGx5IHJldHVybi5cbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBUaGUgdW5kZXJseWluZyB2YWx1ZSBpcyB1cGRhdGVkICpiZWZvcmUqIGRpc3BhdGNoaW5nIGV2ZW50cy5cbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBgRHluYW1pY1Byb3BlcnR5YCBwcm90ZWN0cyBhZ2FpbnN0IGN5Y2xpYyBldmVudCBjYWxsYmFja3MuIElmIGFuXG4gICAqICAgICBldmVudCBjYWxsYmFjayBhZ2FpbiBzZXRzIHRoZSB1bmRlcmx5aW5nIGBEeW5hbWljUHJvcGVydHlgIHZhbHVlLCB0aGVuXG4gICAqICAgICB0aGUgdmFsdWUgd2lsbCBiZSBzZXQsIGJ1dCBubyBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgKHRvIHByZXZlbnQgZXZlbnQgbG9vcHMpLlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFlvdSBjYW4gbm90IHNldCBhIGBEeW5hbWljUHJvcGVydHlgIHRvIGFub3RoZXIgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UuXG4gICAqICAgICBJZiB0aGlzIG1ldGhvZCByZWNlaXZlcyBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCBpdCB3aWxsIHVzZSB0aGUgc3RvcmVkIHZhbHVlXG4gICAqICAgICBvZiB0aGF0IGluc3RhbmNlIGluc3RlYWQgKGJ5IGNhbGxpbmcgQHNlZSBEeW5hbWljUHJvcGVydHkudmFsdWVPZjspLlxuICAgKi9cbiAgW0RZTkFNSUNfUFJPUEVSVFlfU0VUXShfbmV3VmFsdWUsIF9vcHRpb25zKSB7XG4gICAgbGV0IG5ld1ZhbHVlID0gX25ld1ZhbHVlO1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKG5ld1ZhbHVlLCBEeW5hbWljUHJvcGVydHkpKVxuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS52YWx1ZU9mKCk7XG5cbiAgICBpZiAodGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXSA9PT0gbmV3VmFsdWUpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAodGhpc1tEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddKSB7XG4gICAgICB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdID0gbmV3VmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfSVNfU0VUVElOR10gPSB0cnVlO1xuXG4gICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdO1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXSA9IG5ld1ZhbHVlO1xuXG4gICAgICBpZiAob3B0aW9ucy5kaXNwYXRjaFVwZGF0ZUV2ZW50ID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQgZXZlbnREYXRhID0ge1xuICAgICAgICBvcmlnaW5hdG9yOiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogICBvbGRWYWx1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgbmV3VmFsdWUsXG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBsZXQgdXBkYXRlRXZlbnQgPSBuZXcgRXZlbnQoJ3VwZGF0ZScpO1xuXG4gICAgICAgIHVwZGF0ZUV2ZW50Lm9yaWdpbmF0b3IgPSB0aGlzO1xuICAgICAgICB1cGRhdGVFdmVudC5vbGRWYWx1ZSA9IG9sZFZhbHVlO1xuICAgICAgICB1cGRhdGVFdmVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh1cGRhdGVFdmVudCk7XG4gICAgICB9IGNhdGNoIChkaXNwYXRjaEVycm9yKSB7XG4gICAgICAgIC8vIEZhbGxiYWNrIGZvciBOb2RlLmpzL0pTRE9NIGVudmlyb25tZW50IHdoZXJlIEV2ZW50IGNsYXNzIG1pc21hdGNoZXNcbiAgICAgICAgLy8gY2FuIGNhdXNlIGRpc3BhdGNoRXZlbnQgdG8gZmFpbC4gVXNlIGludGVybmFsIGxpc3RlbmVyIG5vdGlmaWNhdGlvbi5cbiAgICAgICAgdGhpcy5fbm90aWZ5TGlzdGVuZXJzKCd1cGRhdGUnLCBldmVudERhdGEpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuRHluYW1pY1Byb3BlcnR5ID0gRHluYW1pY1Byb3BlcnR5O1xuIiwiaW1wb3J0IHtcbiAgRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUsXG4gIE1ZVEhJWF9UWVBFLFxuICBRVUVSWV9FTkdJTkVfVFlQRSxcbiAgVU5GSU5JU0hFRF9ERUZJTklUSU9OLFxufSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBEeW5hbWljUHJvcGVydHkgfSBmcm9tICcuL2R5bmFtaWMtcHJvcGVydHkuanMnO1xuXG5jb25zdCBTVUJTVElUVVRFX0NIQVJfQ09ERSA9IDI2O1xuXG4vKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogRWxlbWVudHNcbiAqIGdyb3VwTmFtZTogRWxlbWVudHNcbiAqIGRlc2M6IHxcbiAqICAgYGltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBVdGlsaXR5IGFuZCBlbGVtZW50IGJ1aWxkaW5nIGZ1bmN0aW9ucyBmb3IgdGhlIERPTS5cbiAqL1xuXG5jb25zdCBJU19QUk9QX05BTUUgICAgPSAvXnByb3BcXCQvO1xuY29uc3QgSVNfVEFSR0VUX1BST1AgID0gL15wcm90b3R5cGV8Y29uc3RydWN0b3IkLztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnREZWZpbml0aW9uIHtcbiAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoaW5zdGFuY2UgJiYgaW5zdGFuY2VbTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHRhZ05hbWUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSxcbiAgICAgIH0sXG4gICAgICAndGFnTmFtZSc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0YWdOYW1lLFxuICAgICAgfSxcbiAgICAgICdhdHRyaWJ1dGVzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGF0dHJpYnV0ZXMgfHwge30sXG4gICAgICB9LFxuICAgICAgJ2NoaWxkcmVuJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGNoaWxkcmVuIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHRvU3RyaW5nKF9vcHRpb25zKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcbiAgICBsZXQgdGFnTmFtZSA9IHRoaXMudGFnTmFtZTtcbiAgICBpZiAodGFnTmFtZSA9PT0gJyN0ZXh0JylcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMudmFsdWUucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcblxuICAgIGxldCBhdHRycyA9ICh0YWdOYW1lID09PSAnI2ZyYWdtZW50JykgPyBudWxsIDogKChhdHRyaWJ1dGVzKSA9PiB7XG4gICAgICBsZXQgcGFydHMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgWyBhdHRyaWJ1dGVOYW1lLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGlmIChJU19QUk9QX05BTUUudGVzdChhdHRyaWJ1dGVOYW1lKSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMudG9ET01BdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICBwYXJ0cy5wdXNoKG5hbWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFydHMucHVzaChgJHtuYW1lfT1cIiR7ZW5jb2RlQXR0cmlidXRlVmFsdWUodmFsdWUpfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XG4gICAgfSkodGhpcy5hdHRyaWJ1dGVzKTtcblxuICAgIGxldCBjaGlsZHJlbiA9ICgoY2hpbGRyZW4pID0+IHtcbiAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gKGNoaWxkICE9IG51bGwgJiYgY2hpbGQgIT09IGZhbHNlICYmICFPYmplY3QuaXMoY2hpbGQsIE5hTikpKVxuICAgICAgICAubWFwKChjaGlsZCkgPT4gKChjaGlsZCAmJiB0eXBlb2YgY2hpbGQudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpID8gY2hpbGQudG9TdHJpbmcob3B0aW9ucykgOiAoJycgKyBjaGlsZCkpKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfSkodGhpcy5jaGlsZHJlbik7XG5cbiAgICBpZiAodGFnTmFtZSA9PT0gJyNmcmFnbWVudCcpXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgICAvLyB0aGlzIHdpbGwgbW9yZSBjb21tb25seSBsb29rIGxpa2Ugd3JpdHRlbiBodG1sXG4gICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCBlbGVtZW50VGFnU3RhcnQgPSBgPCR7dGFnTmFtZX0keyhhdHRycykgPyBgICR7YXR0cnN9YCA6ICcnfT5gO1xuICAgIGxldCBlbGVtZW50VGFnRW5kICAgPSBgPC8ke3RhZ05hbWV9PmA7XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdtYXNrSFRNTCcpKSB7XG4gICAgICBsZXQgY2hhckNvZGUgPSAodHlwZW9mIG9wdGlvbnMubWFza0hUTUwgPT09ICdudW1iZXInKSA/IFN0cmluZy5mcm9tQ2hhckNvZGUoU1VCU1RJVFVURV9DSEFSX0NPREUpIDogb3B0aW9ucy5tYXNrSFRNTDtcbiAgICAgIGNvbnN0IHdpcGVCbGFuayA9IChjb250ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoLy4vZywgY2hhckNvZGUpO1xuICAgICAgfTtcblxuICAgICAgZWxlbWVudFRhZ1N0YXJ0ID0gd2lwZUJsYW5rKGVsZW1lbnRUYWdTdGFydCk7XG4gICAgICBlbGVtZW50VGFnRW5kID0gd2lwZUJsYW5rKGVsZW1lbnRUYWdFbmQpO1xuXG4gICAgICBpZiAob3B0aW9ucy5tYXNrQ2hpbGRyZW5QYXR0ZXJuICYmIG9wdGlvbnMubWFza0NoaWxkcmVuUGF0dGVybi50ZXN0KHRhZ05hbWUpKVxuICAgICAgICBjaGlsZHJlbiA9IHdpcGVCbGFuayhjaGlsZHJlbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2VsZW1lbnRUYWdTdGFydH0keyhpc1ZvaWRUYWcodGFnTmFtZSkpID8gJycgOiBgJHtjaGlsZHJlbn0ke2VsZW1lbnRUYWdFbmR9YH1gO1xuICB9XG5cbiAgdG9ET01BdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICctJDEnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgYnVpbGQob3duZXJEb2N1bWVudCwgdGVtcGxhdGVPcHRpb25zKSB7XG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJyNmcmFnbWVudCcpXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC5idWlsZChvd25lckRvY3VtZW50LCB0ZW1wbGF0ZU9wdGlvbnMpKTtcblxuICAgIGxldCBhdHRyaWJ1dGVzICAgID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgIGxldCBuYW1lc3BhY2VVUkkgID0gYXR0cmlidXRlcy5uYW1lc3BhY2VVUkk7XG4gICAgbGV0IG9wdGlvbnM7XG4gICAgbGV0IGVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmlzKVxuICAgICAgb3B0aW9ucyA9IHsgaXM6IHRoaXMuYXR0cmlidXRlcy5pcyB9O1xuXG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJyN0ZXh0JylcbiAgICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGF0dHJpYnV0ZXMudmFsdWUgfHwgJycpLCB0ZW1wbGF0ZU9wdGlvbnMpO1xuXG4gICAgaWYgKG5hbWVzcGFjZVVSSSlcbiAgICAgIGVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHRoaXMudGFnTmFtZSwgb3B0aW9ucyk7XG4gICAgZWxzZSBpZiAoaXNTVkdFbGVtZW50KHRoaXMudGFnTmFtZSkpXG4gICAgICBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGhpcy50YWdOYW1lLCBvcHRpb25zKTtcbiAgICBlbHNlXG4gICAgICBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG5cbiAgICBjb25zdCBldmVudE5hbWVzID0gVXRpbHMuZ2V0QWxsRXZlbnROYW1lc0ZvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgY29uc3QgaGFuZGxlQXR0cmlidXRlID0gKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIF9hdHRyaWJ1dGVWYWx1ZSkgPT4ge1xuICAgICAgbGV0IGF0dHJpYnV0ZVZhbHVlICAgICAgPSBfYXR0cmlidXRlVmFsdWU7XG4gICAgICBsZXQgbG93ZXJBdHRyaWJ1dGVOYW1lICA9IGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgaWYgKGV2ZW50TmFtZXMuaW5kZXhPZihsb3dlckF0dHJpYnV0ZU5hbWUpID49IDApIHtcbiAgICAgICAgVXRpbHMuYmluZEV2ZW50VG9FbGVtZW50LmNhbGwoXG4gICAgICAgICAgVXRpbHMuY3JlYXRlU2NvcGUoZWxlbWVudCwgdGVtcGxhdGVPcHRpb25zLnNjb3BlKSwgLy8gdGhpc1xuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgbG93ZXJBdHRyaWJ1dGVOYW1lLnN1YnN0cmluZygyKSxcbiAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBtb2RpZmllZEF0dHJpYnV0ZU5hbWUgPSB0aGlzLnRvRE9NQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobW9kaWZpZWRBdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIER5bmFtaWMgYmluZGluZ3MgYXJlIG5vdCBhbGxvd2VkIGZvciBwcm9wZXJ0aWVzXG4gICAgY29uc3QgaGFuZGxlUHJvcGVydHkgPSAoZWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKSA9PiB7XG4gICAgICBsZXQgbmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKElTX1BST1BfTkFNRSwgJycpO1xuICAgICAgZWxlbWVudFtuYW1lXSA9IHByb3BlcnR5VmFsdWU7XG4gICAgfTtcblxuICAgIGxldCBhdHRyaWJ1dGVOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVOYW1lICAgPSBhdHRyaWJ1dGVOYW1lc1tpXTtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgPSBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdO1xuXG4gICAgICBpZiAoSVNfUFJPUF9OQU1FLnRlc3QoYXR0cmlidXRlTmFtZSkpXG4gICAgICAgIGhhbmRsZVByb3BlcnR5KGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgaGFuZGxlQXR0cmlidXRlKGVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgICB9XG5cbiAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxldCBjaGlsZCAgICAgICAgID0gY2hpbGRyZW5baV07XG4gICAgICAgIGxldCBjaGlsZEVsZW1lbnQgID0gY2hpbGQuYnVpbGQob3duZXJEb2N1bWVudCwgdGVtcGxhdGVPcHRpb25zKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZEVsZW1lbnQpKVxuICAgICAgICAgIGNoaWxkRWxlbWVudC5mbGF0KEluZmluaXR5KS5mb3JFYWNoKChjaGlsZCkgPT4gZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICBlbGVtZW50LFxuICAgICAge1xuICAgICAgICAuLi50ZW1wbGF0ZU9wdGlvbnMsXG4gICAgICAgIHByb2Nlc3NFdmVudENhbGxiYWNrczogZmFsc2UsXG4gICAgICB9LFxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSVNfSFRNTF9TQUZFX0NIQVJBQ1RFUiA9IC9eW1xcc2EtekEtWjAtOV8tXSQvO1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC8uL2csIChtKSA9PiB7XG4gICAgcmV0dXJuIChJU19IVE1MX1NBRkVfQ0hBUkFDVEVSLnRlc3QobSkpID8gbSA6IGAmIyR7bS5jaGFyQ29kZUF0KDApfTtgO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZUF0dHJpYnV0ZVZhbHVlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9bXCImXS9nLCAobSkgPT4ge1xuICAgIHJldHVybiBgJiMke20uY2hhckNvZGVBdCgwKX07YDtcbiAgfSk7XG59XG5cbmNvbnN0IElTX1ZPSURfVEFHID0gL15hcmVhfGJhc2V8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW18c291cmNlfHRyYWNrfHdiciQvaTtcbmV4cG9ydCBmdW5jdGlvbiBpc1ZvaWRUYWcodGFnTmFtZSkge1xuICByZXR1cm4gSVNfVk9JRF9UQUcudGVzdCh0YWdOYW1lLnNwbGl0KCc6Jykuc2xpY2UoLTEpWzBdKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE5vZGVUeXBlKGl0ZW0pIHtcbiAgaWYgKCFpdGVtKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXRlbSBpbnN0YW5jZW9mIE5vZGUpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoaXRlbVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5VGVtcGxhdGUob3duZXJEb2N1bWVudCwgbmFtZU9ySUQpIHtcbiAgaWYgKG5hbWVPcklEIGluc3RhbmNlb2YgTm9kZSlcbiAgICByZXR1cm4gbmFtZU9ySUQ7XG5cbiAgaWYgKCFvd25lckRvY3VtZW50KVxuICAgIHJldHVybjtcblxuICBsZXQgcmVzdWx0ID0gb3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lT3JJRCk7XG4gIGlmICghcmVzdWx0KVxuICAgIHJlc3VsdCA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgdGVtcGxhdGVbZGF0YS1teXRoaXgtY29tcG9uZW50LW5hbWU9XCIke25hbWVPcklEfVwiIGldLHRlbXBsYXRlW2RhdGEtZm9yPVwiJHtuYW1lT3JJRH1cIiBpXWApO1xuXG4gIGlmICghcmVzdWx0KVxuICAgIHJlc3VsdCA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lT3JJRCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZmlsdGVyTm9kZVRyZWUobm9kZSwgZmlsdGVyRnVuYykge1xuICBpZiAoIWZpbHRlckZ1bmMuY2FsbCh0aGlzLCBub2RlKSlcbiAgICByZXR1cm47XG5cbiAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpO1xuICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgY2hpbGRyZW4pIHtcbiAgICBsZXQgcmVzdWx0ID0gZmlsdGVyTm9kZVRyZWUoY2hpbGROb2RlLCBmaWx0ZXJGdW5jKTtcbiAgICBpZiAocmVzdWx0ID09IG51bGwpXG4gICAgICBub2RlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZU1lcmdlRnJhZ21lbnQob3duZXJEb2N1bWVudCwgbm9kZSkge1xuICBsZXQgZnJhZ21lbnQgID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGxldCBzZWxlY3RvcnMgPSAobm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZnJvbScpIHx8ICcnKS5zcGxpdCgnLCcpLm1hcCgoKHBhcnQpID0+IHBhcnQudHJpbSgpKSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IHNlbGVjdG9ycy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgbGV0IHNlbGVjdG9yICA9IHNlbGVjdG9yc1tpXTtcbiAgICBsZXQgZWxlbWVudCAgID0gcXVlcnlUZW1wbGF0ZShvd25lckRvY3VtZW50LCBzZWxlY3Rvcik7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGxldCBjbG9uZWROb2RlICA9IChJU19URU1QTEFURS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpID8gZWxlbWVudC5jb250ZW50LmNsb25lTm9kZSh0cnVlKSA6IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgbGV0IGZpbHRlciAgICAgID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmlsdGVyJyk7XG4gICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgIGNsb25lZE5vZGUgPSBmaWx0ZXJOb2RlVHJlZS5jYWxsKHRoaXMsIGNsb25lZE5vZGUsIChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICEodHlwZW9mIG5vZGUubWF0Y2hlcyA9PT0gJ2Z1bmN0aW9uJyAmJiBub2RlLm1hdGNoZXMoZmlsdGVyKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChjbG9uZWROb2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFX01FUkdFX0VMRU1FTlQgPSAvXm15dGhpeC1tZXJnZSQvaTtcbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzRWxlbWVudHMoX25vZGUsIF9vcHRpb25zKSB7XG4gIGxldCBub2RlID0gX25vZGU7XG4gIGlmICghbm9kZSlcbiAgICByZXR1cm4gbm9kZTtcblxuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgc2NvcGUgICAgICAgICA9IG9wdGlvbnMuc2NvcGU7XG4gIGlmICghc2NvcGUpIHtcbiAgICBzY29wZSA9IFV0aWxzLmNyZWF0ZVNjb3BlKG5vZGUpO1xuICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMsIHNjb3BlIH07XG4gIH1cblxuICBsZXQgZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IgPSAob3B0aW9ucy5mb3JjZVRlbXBsYXRlRW5naW5lID09PSB0cnVlKSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMuZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3I7XG4gIGxldCBjaGlsZHJlbiAgICAgICAgICAgICAgICAgICAgICA9IEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKTtcblxuICBpZiAob3B0aW9ucy5mb3JjZVRlbXBsYXRlRW5naW5lICE9PSB0cnVlICYmICFkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3Rvcikge1xuICAgIGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yID0gVXRpbHMuZ2V0RGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IoKTtcbiAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCBkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvciB9O1xuICB9XG5cbiAgbGV0IGlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCA9IGZhbHNlO1xuICBpZiAoZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IgJiYgVXRpbHMuc3BlY2lhbENsb3Nlc3Qobm9kZSwgZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IpKVxuICAgIGlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmhlbHBlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCByZXN1bHQgPSBvcHRpb25zLmhlbHBlci5jYWxsKHRoaXMsIHsgc2NvcGUsIG9wdGlvbnMsIG5vZGUsIGNoaWxkcmVuLCBpc1RlbXBsYXRlRW5naW5lRGlzYWJsZWQsIGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yIH0pO1xuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgbm9kZSA9IHJlc3VsdDtcbiAgICBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBzY29wZS5vd25lckRvY3VtZW50IHx8IG5vZGUub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuQVRUUklCVVRFX05PREUpIHtcbiAgICBpZiAoIWlzVGVtcGxhdGVFbmdpbmVEaXNhYmxlZCkge1xuICAgICAgbGV0IHJlc3VsdCA9IFV0aWxzLmZvcm1hdE5vZGVWYWx1ZShub2RlLCBvcHRpb25zKTtcbiAgICAgIGlmICgoQXJyYXkuaXNBcnJheShyZXN1bHQpICYmIHJlc3VsdC5zb21lKGlzVmFsaWROb2RlVHlwZSkpIHx8IGlzVmFsaWROb2RlVHlwZShyZXN1bHQpKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICAgIHJlc3VsdCA9IFsgcmVzdWx0IF07XG5cbiAgICAgICAgbGV0IGZyYWdtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVzdWx0KSB7XG4gICAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSkge1xuICAgICAgICAgICAgbGV0IGVsZW1lbnRzID0gaXRlbS5idWlsZChvd25lckRvY3VtZW50LCB7IHNjb3BlIH0pO1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50cylcbiAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsZW1lbnRzKSlcbiAgICAgICAgICAgICAgZWxlbWVudHMuZmxhdChJbmZpbml0eSkuZm9yRWFjaCgoZWxlbWVudCkgPT4gZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCkpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbGVtZW50cyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpIHtcbiAgICAgICAgICAgIGl0ZW0uYXBwZW5kVG8oZnJhZ21lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgdGV4dE5vZGUgPSBvd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCgnJyArIGl0ZW0pKTtcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnJhZ21lbnQ7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCAhPT0gbm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSAgcmVzdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSkge1xuICAgIGlmIChJU19URU1QTEFURV9NRVJHRV9FTEVNRU5ULnRlc3Qobm9kZS50YWdOYW1lKSkge1xuICAgICAgbGV0IGZyYWdtZW50ID0gY29tcGlsZU1lcmdlRnJhZ21lbnQuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LCBub2RlKTtcbiAgICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbCh0aGlzLCBmcmFnbWVudCwgeyAuLi5vcHRpb25zLCBzY29wZSB9KTtcbiAgICB9XG5cbiAgICBsZXQgZXZlbnROYW1lcyAgICAgID0gVXRpbHMuZ2V0QWxsRXZlbnROYW1lc0ZvckVsZW1lbnQobm9kZSk7XG4gICAgbGV0IGF0dHJpYnV0ZU5hbWVzICA9IG5vZGUuZ2V0QXR0cmlidXRlTmFtZXMoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVOYW1lICAgICAgID0gYXR0cmlidXRlTmFtZXNbaV07XG4gICAgICBsZXQgbG93ZXJBdHRyaWJ1dGVOYW1lICA9IGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgICAgID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cbiAgICAgIGlmIChldmVudE5hbWVzLmluZGV4T2YobG93ZXJBdHRyaWJ1dGVOYW1lKSA+PSAwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnByb2Nlc3NFdmVudENhbGxiYWNrcyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBVdGlscy5iaW5kRXZlbnRUb0VsZW1lbnQuY2FsbChcbiAgICAgICAgICAgIFV0aWxzLmNyZWF0ZVNjb3BlKG5vZGUsIHNjb3BlKSwgLy8gdGhpc1xuICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgIGxvd2VyQXR0cmlidXRlTmFtZS5zdWJzdHJpbmcoMiksXG4gICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoVXRpbHMuaXNUZW1wbGF0ZShhdHRyaWJ1dGVWYWx1ZSkpIHtcbiAgICAgICAgbGV0IGF0dHJpYnV0ZU5vZGUgPSBub2RlLmdldEF0dHJpYnV0ZU5vZGUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOb2RlKVxuICAgICAgICAgIGF0dHJpYnV0ZU5vZGUubm9kZVZhbHVlID0gVXRpbHMuZm9ybWF0Tm9kZVZhbHVlKGF0dHJpYnV0ZU5vZGUsIHsgLi4ub3B0aW9ucywgZGlzYWxsb3dIVE1MOiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLnByb2Nlc3NDaGlsZHJlbiA9PT0gZmFsc2UpXG4gICAgcmV0dXJuIG5vZGU7XG5cbiAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkcmVuKSB7XG4gICAgbGV0IHJlc3VsdCA9IHByb2Nlc3NFbGVtZW50cy5jYWxsKHRoaXMsIGNoaWxkTm9kZSwgb3B0aW9ucyk7XG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIE5vZGUgJiYgcmVzdWx0ICE9PSBjaGlsZE5vZGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5vZGUucmVwbGFjZUNoaWxkKHJlc3VsdCwgY2hpbGROb2RlKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gTk9PUFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBub2RlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2hpbGQocGFyZW50Tm9kZSwgY2hpbGROb2RlKSB7XG4gIGlmICghcGFyZW50Tm9kZSB8fCAhY2hpbGROb2RlKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBmb3IgKGxldCBjaGlsZCBvZiBBcnJheS5mcm9tKHBhcmVudE5vZGUuY2hpbGROb2RlcykpIHtcbiAgICBpZiAoY2hpbGQgPT09IGNoaWxkTm9kZSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGQodGFnTmFtZSwgZGVmYXVsdEF0dHJpYnV0ZXMsIHNjb3BlKSB7XG4gIGlmICghdGFnTmFtZSB8fCAhQmFzZVV0aWxzLmlzVHlwZSh0YWdOYW1lLCAnOjpTdHJpbmcnKSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbiBub3QgY3JlYXRlIGFuIEVsZW1lbnREZWZpbml0aW9uIHdpdGhvdXQgYSBcInRhZ05hbWVcIi4nKTtcblxuICBjb25zdCBmaW5hbGl6ZXIgPSAoLi4uX2NoaWxkcmVuKSA9PiB7XG4gICAgY29uc3Qgd3JhbmdsZUNoaWxkcmVuID0gKGNoaWxkcmVuKSA9PiB7XG4gICAgICByZXR1cm4gY2hpbGRyZW4uZmxhdChJbmZpbml0eSkubWFwKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCcpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHZhbHVlW1VORklOSVNIRURfREVGSU5JVElPTl0pXG4gICAgICAgICAgcmV0dXJuIHZhbHVlKCk7XG5cbiAgICAgICAgaWYgKHZhbHVlW01ZVEhJWF9UWVBFXSA9PT0gRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUpXG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKVxuICAgICAgICAgIHJldHVybiB3cmFuZ2xlQ2hpbGRyZW4odmFsdWUuZ2V0VW5kZXJseWluZ0FycmF5KCkpO1xuXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE5vZGUpXG4gICAgICAgICAgcmV0dXJuIG5vZGVUb0VsZW1lbnREZWZpbml0aW9uKHZhbHVlKTtcblxuICAgICAgICBpZiAoIUJhc2VVdGlscy5pc1R5cGUodmFsdWUsICc6OlN0cmluZycsIER5bmFtaWNQcm9wZXJ0eSkpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50RGVmaW5pdGlvbignI3RleHQnLCB7IHZhbHVlOiAoJycgKyB2YWx1ZSkgfSk7XG4gICAgICB9KS5mbGF0KEluZmluaXR5KS5maWx0ZXIoQm9vbGVhbik7XG4gICAgfTtcblxuICAgIGxldCBjaGlsZHJlbiA9IHdyYW5nbGVDaGlsZHJlbihfY2hpbGRyZW4gfHwgW10pO1xuICAgIHJldHVybiBuZXcgRWxlbWVudERlZmluaXRpb24odGFnTmFtZSwgc2NvcGUsIGNoaWxkcmVuKTtcbiAgfTtcblxuICBsZXQgcm9vdFByb3h5ID0gbmV3IFByb3h5KGZpbmFsaXplciwge1xuICAgIGdldDogKHRhcmdldCwgYXR0cmlidXRlTmFtZSkgPT4ge1xuICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09IFVORklOSVNIRURfREVGSU5JVElPTilcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlTmFtZSA9PT0gJ3N5bWJvbCcgfHwgSVNfVEFSR0VUX1BST1AudGVzdChhdHRyaWJ1dGVOYW1lKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldFthdHRyaWJ1dGVOYW1lXTtcblxuICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICBsZXQgc2NvcGVkUHJveHkgPSBidWlsZCh0YWdOYW1lLCBkZWZhdWx0QXR0cmlidXRlcywgT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBkZWZhdWx0QXR0cmlidXRlcyB8fCB7fSkpO1xuICAgICAgICByZXR1cm4gc2NvcGVkUHJveHlbYXR0cmlidXRlTmFtZV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJveHkoXG4gICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHNjb3BlW2F0dHJpYnV0ZU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHJvb3RQcm94eTtcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGdldDogKHRhcmdldCwgcHJvcE5hbWUpID0+IHtcbiAgICAgICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSBVTkZJTklTSEVEX0RFRklOSVRJT04pXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGF0dHJpYnV0ZU5hbWUgPT09ICdzeW1ib2wnIHx8IElTX1RBUkdFVF9QUk9QLnRlc3QoYXR0cmlidXRlTmFtZSkpXG4gICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbYXR0cmlidXRlTmFtZV07XG5cbiAgICAgICAgICAgIHNjb3BlW2F0dHJpYnV0ZU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiByb290UHJveHlbcHJvcE5hbWVdO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiByb290UHJveHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlVG9FbGVtZW50RGVmaW5pdGlvbihub2RlKSB7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSlcbiAgICByZXR1cm4gbmV3IEVsZW1lbnREZWZpbml0aW9uKCcjdGV4dCcsIHsgdmFsdWU6ICgnJyArIG5vZGUubm9kZVZhbHVlKSB9KTtcblxuICBpZiAobm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5FTEVNRU5UX05PREUgJiYgbm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKVxuICAgIHJldHVybjtcblxuICBsZXQgYXR0cmlidXRlcyA9IHt9O1xuXG4gIGlmICh0eXBlb2Ygbm9kZS5nZXRBdHRyaWJ1dGVOYW1lcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZvciAobGV0IGF0dHJpYnV0ZU5hbWUgb2Ygbm9kZS5nZXRBdHRyaWJ1dGVOYW1lcygpKVxuICAgICAgYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSA9IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xuICB9XG5cbiAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShub2RlLmNoaWxkTm9kZXMpLm1hcChub2RlVG9FbGVtZW50RGVmaW5pdGlvbik7XG4gIHJldHVybiBuZXcgRWxlbWVudERlZmluaXRpb24oKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkgPyAnI2ZyYWdtZW50JyA6IG5vZGUudGFnTmFtZSwgYXR0cmlidXRlcywgY2hpbGRyZW4pO1xufVxuXG5jb25zdCBJU19URU1QTEFURSA9IC9eKHRlbXBsYXRlKSQvaTtcblxuLyoqXG4gICAqIHBhcmVudDogRWxlbWVudHNcbiAgICogZ3JvdXBOYW1lOiBFbGVtZW50c1xuICAgKiBkZXNjOiB8XG4gICAqICAgQWxtb3N0IGxpa2UgYE9iamVjdC5hc3NpZ25gLCBtZXJnZSBhbGwgY29tcG9uZW50IGNoaWxkcmVuIGludG8gYSBzaW5nbGUgbm9kZSAodGhlIGB0YXJnZXRgKS5cbiAgICpcbiAgICogICBUaGlzIGlzIFwidGVtcGxhdGUgaW50ZWxsaWdlbnRcIiwgbWVhbmluZyBmb3IgYDx0ZW1wbGF0ZT5gIGVsZW1lbnRzIHNwZWNpZmljYWxseSwgaXQgd2lsbCBleGVjdXRlXG4gICAqICAgYGNoaWxkcmVuID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkuY2hpbGROb2Rlc2AgdG8gY2xvbmUgYWxsIHRoZSBjaGlsZCBub2RlcywgYW5kIG5vdFxuICAgKiAgIG1vZGlmeSB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuIEl0IGlzIGFsc28gdGVtcGxhdGUgaW50ZWxsaWdlbnQgYnkgdGhlIGZhY3QgdGhhdCBpZiB0aGUgYHRhcmdldGAgaXNcbiAgICogICBhIHRlbXBsYXRlLCBpdCB3aWxsIGFkZCB0aGUgY2hpbGRyZW4gdG8gYGNvbnRlbnRgIHByb3Blcmx5LlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiB0YXJnZXRcbiAgICogICAgIGRhdGFUeXBlczogTm9kZVxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgdGFyZ2V0IE5vZGUgdG8gbWVyZ2UgYWxsIGNoaWxkcmVuIGludG8uIElmIHRoaXMgTm9kZSBpcyBhIGA8dGVtcGxhdGU+YCBOb2RlLCB0aGVuIGl0IHdpbGxcbiAgICogICAgICAgcGxhY2UgYWxsIHRoZSBtZXJnZWQgY2hpbGRyZW4gaW50byBgdGVtcGxhdGUuY29udGVudGAuXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gQW55IHRlbXBsYXRlIE5vZGUgd2lsbCBiZSBjbG9uZWQsIGFuZCBzbyB0aGUgb3JpZ2luYWwgd2lsbCBub3QgYmUgbW9kaWZpZWQuIEFsbCBvdGhlciBub2RlcyBhcmUgKipOT1QqKlxuICAgKiAgICAgY2xvbmVkIGJlZm9yZSB0aGUgbWVyZ2UsIGFuZCBzbyB3aWxsIGJlIHN0cmlwcGVkIG9mIHRoZWlyIGNoaWxkcmVuLlxuICAgKiAgIC0gTWFrZSBjZXJ0YWluIHlvdSBkZWVwIGNsb25lIGFueSBlbGVtZW50IGZpcnN0IChleGNlcHQgdGVtcGxhdGVzKSBpZiB5b3UgZG9uJ3Qgd2FudCB0aGUgcHJvdmlkZWQgZWxlbWVudHNcbiAgICogICAgIHRvIGJlIG1vZGlmaWVkLlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgTm9kZTsgVGhlIHByb3ZpZGVkIGB0YXJnZXRgLCB3aXRoIGFsbCBjaGlsZHJlbiBtZXJnZWQgKGFkZGVkKSBpbnRvIGl0LlxuICAgKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUNoaWxkcmVuKHRhcmdldCwgLi4ub3RoZXJzKSB7XG4gIGlmICghKHRhcmdldCBpbnN0YW5jZW9mIE5vZGUpKVxuICAgIHJldHVybiB0YXJnZXQ7XG5cbiAgbGV0IHRhcmdldElzVGVtcGxhdGUgPSBJU19URU1QTEFURS50ZXN0KHRhcmdldC50YWdOYW1lKTtcbiAgZm9yIChsZXQgb3RoZXIgb2Ygb3RoZXJzKSB7XG4gICAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBOb2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuXG4gICAgbGV0IGNoaWxkTm9kZXMgPSAoSVNfVEVNUExBVEUudGVzdChvdGhlci50YWdOYW1lKSkgPyBvdGhlci5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5jaGlsZE5vZGVzIDogb3RoZXIuY2hpbGROb2RlcztcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBBcnJheS5mcm9tKGNoaWxkTm9kZXMpKSB7XG4gICAgICBsZXQgY29udGVudCA9IChJU19URU1QTEFURS50ZXN0KGNoaWxkLnRhZ05hbWUpKSA/IGNoaWxkLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpIDogY2hpbGQ7XG4gICAgICBpZiAodGFyZ2V0SXNUZW1wbGF0ZSlcbiAgICAgICAgdGFyZ2V0LmNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jb25zdCBJU19TVkdfRUxFTUVOVF9OQU1FID0gL14oYWx0Z2x5cGh8YWx0Z2x5cGhkZWZ8YWx0Z2x5cGhpdGVtfGFuaW1hdGV8YW5pbWF0ZUNvbG9yfGFuaW1hdGVNb3Rpb258YW5pbWF0ZVRyYW5zZm9ybXxhbmltYXRpb258Y2lyY2xlfGNsaXBQYXRofGNvbG9yUHJvZmlsZXxjdXJzb3J8ZGVmc3xkZXNjfGRpc2NhcmR8ZWxsaXBzZXxmZWJsZW5kfGZlY29sb3JtYXRyaXh8ZmVjb21wb25lbnR0cmFuc2ZlcnxmZWNvbXBvc2l0ZXxmZWNvbnZvbHZlbWF0cml4fGZlZGlmZnVzZWxpZ2h0aW5nfGZlZGlzcGxhY2VtZW50bWFwfGZlZGlzdGFudGxpZ2h0fGZlZHJvcHNoYWRvd3xmZWZsb29kfGZlZnVuY2F8ZmVmdW5jYnxmZWZ1bmNnfGZlZnVuY3J8ZmVnYXVzc2lhbmJsdXJ8ZmVpbWFnZXxmZW1lcmdlfGZlbWVyZ2Vub2RlfGZlbW9ycGhvbG9neXxmZW9mZnNldHxmZXBvaW50bGlnaHR8ZmVzcGVjdWxhcmxpZ2h0aW5nfGZlc3BvdGxpZ2h0fGZldGlsZXxmZXR1cmJ1bGVuY2V8ZmlsdGVyfGZvbnR8Zm9udEZhY2V8Zm9udEZhY2VGb3JtYXR8Zm9udEZhY2VOYW1lfGZvbnRGYWNlU3JjfGZvbnRGYWNlVXJpfGZvcmVpZ25PYmplY3R8Z3xnbHlwaHxnbHlwaFJlZnxoYW5kbGVyfGhLZXJufGltYWdlfGxpbmV8bGluZWFyZ3JhZGllbnR8bGlzdGVuZXJ8bWFya2VyfG1hc2t8bWV0YWRhdGF8bWlzc2luZ0dseXBofG1QYXRofHBhdGh8cGF0dGVybnxwb2x5Z29ufHBvbHlsaW5lfHByZWZldGNofHJhZGlhbGdyYWRpZW50fHJlY3R8c2V0fHNvbGlkQ29sb3J8c3RvcHxzdmd8c3dpdGNofHN5bWJvbHx0YnJlYWt8dGV4dHx0ZXh0cGF0aHx0cmVmfHRzcGFufHVua25vd258dXNlfHZpZXd8dktlcm4pJC9pO1xuZXhwb3J0IGZ1bmN0aW9uIGlzU1ZHRWxlbWVudCh0YWdOYW1lKSB7XG4gIHJldHVybiBJU19TVkdfRUxFTUVOVF9OQU1FLnRlc3QodGFnTmFtZSk7XG59XG5cbmV4cG9ydCBjb25zdCBUZXJtID0gKHZhbHVlKSA9PiBuZXcgRWxlbWVudERlZmluaXRpb24oJyN0ZXh0JywgeyB2YWx1ZSB9KTtcbmV4cG9ydCBjb25zdCBFbGVtZW50R2VuZXJhdG9yID0gbmV3IFByb3h5KFxuICB7XG4gICAgVGVybSxcbiAgICAkVEVYVDogVGVybSxcbiAgfSxcbiAge1xuICAgIGdldDogZnVuY3Rpb24odGFyZ2V0LCBwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb3BOYW1lIGluIHRhcmdldClcbiAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wTmFtZV07XG5cbiAgICAgIGlmIChJU19TVkdfRUxFTUVOVF9OQU1FLnRlc3QocHJvcE5hbWUpKSB7XG4gICAgICAgIC8vIFNWRyBlbGVtZW50c1xuICAgICAgICByZXR1cm4gYnVpbGQocHJvcE5hbWUsIHsgbmFtZXNwYWNlVVJJOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnVpbGQocHJvcE5hbWUpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIE5PT1BcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH0sXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogRXJyb3JzXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgRXJyb3JzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBDdXN0b20gZXJyb3IgY2xhc3NlcyBmb3IgTXl0aGl4IFVJIHRoYXQgcHJvdmlkZSBjb250ZXh0dWFsLCBhY3Rpb25hYmxlIGVycm9yIG1lc3NhZ2VzLlxuICovXG5cbi8qKlxuICogdHlwZTogQ2xhc3NcbiAqIG5hbWU6IE15dGhpeEVycm9yXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgQmFzZSBlcnJvciBjbGFzcyBmb3IgYWxsIE15dGhpeCBVSSBlcnJvcnMuIFByb3ZpZGVzIGNvbnNpc3RlbnQgZXJyb3IgZm9ybWF0dGluZ1xuICogICBhbmQgY29udGV4dCBhdHRhY2htZW50IGNhcGFiaWxpdGllcy5cbiAqL1xuXG4vKipcbiAqIEJhc2UgZXJyb3IgY2xhc3MgZm9yIGFsbCBNeXRoaXggVUkgZXJyb3JzLlxuICogQGV4dGVuZHMgRXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIE15dGhpeEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogQ3JlYXRlIGEgTXl0aGl4RXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD17fV0gLSBBZGRpdGlvbmFsIGNvbnRleHQgZm9yIGRlYnVnZ2luZy5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbnRleHQgPSB7fSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMubmFtZSA9ICdNeXRoaXhFcnJvcic7XG4gICAgLyoqIEB0eXBlIHtPYmplY3R9ICovXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBuYW1lOiB0b1N0cmluZ1xuICAgKiBncm91cE5hbWU6IEVycm9yc1xuICAgKiBwYXJlbnQ6IE15dGhpeEVycm9yXG4gICAqIGRlc2M6IHxcbiAgICogICBGb3JtYXQgdGhlIGVycm9yIG1lc3NhZ2Ugd2l0aCBjb250ZXh0IGZvciBkZXZlbG9wZXItZnJpZW5kbHkgb3V0cHV0LlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgc3RyaW5nOyBUaGUgZm9ybWF0dGVkIGVycm9yIG1lc3NhZ2UuXG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcGFydHMgPSBbIGAke3RoaXMubmFtZX06ICR7dGhpcy5tZXNzYWdlfWAgXTtcblxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpLmxlbmd0aCA+IDApXG4gICAgICBwYXJ0cy5wdXNoKGBcXG5Db250ZXh0OiAke0pTT04uc3RyaW5naWZ5KHRoaXMuY29udGV4dCwgbnVsbCwgMil9YCk7XG5cbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH1cbn1cblxuLyoqXG4gKiB0eXBlOiBDbGFzc1xuICogbmFtZTogVGVtcGxhdGVFcnJvclxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEVycm9yIHRocm93biBkdXJpbmcgdGVtcGxhdGUgcGFyc2luZyBvciBjb21waWxhdGlvbi4gSW5jbHVkZXMgdGhlIGZhaWxpbmcgZXhwcmVzc2lvbixcbiAqICAgYXZhaWxhYmxlIHNjb3BlIHZhcmlhYmxlcywgYW5kIHNvdXJjZSBjb250ZXh0IGZvciBkZWJ1Z2dpbmcuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIHRocm93IG5ldyBUZW1wbGF0ZUVycm9yKCdGYWlsZWQgdG8gZXZhbHVhdGUgZXhwcmVzc2lvbicsIHtcbiAqICAgICAgIGV4cHJlc3Npb246ICd1c2VyLm5hbWUnLFxuICogICAgICAgc2NvcGVWYXJpYWJsZXM6IFsnY291bnQnLCAnaXRlbXMnXSxcbiAqICAgICAgIGNvbXBvbmVudFRhZ05hbWU6ICdteS1jb21wb25lbnQnLFxuICogICAgIH0pO1xuICogICAgIGBgYFxuICovXG5cbi8qKlxuICogRXJyb3IgdGhyb3duIGR1cmluZyB0ZW1wbGF0ZSBwYXJzaW5nIG9yIGNvbXBpbGF0aW9uLlxuICogQGV4dGVuZHMgTXl0aGl4RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIFRlbXBsYXRlRXJyb3IgZXh0ZW5kcyBNeXRoaXhFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBUZW1wbGF0ZUVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9e31dIC0gQWRkaXRpb25hbCBjb250ZXh0IGZvciBkZWJ1Z2dpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5leHByZXNzaW9uXSAtIFRoZSBmYWlsaW5nIHRlbXBsYXRlIGV4cHJlc3Npb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IFtjb250ZXh0LnNjb3BlVmFyaWFibGVzXSAtIEF2YWlsYWJsZSBzY29wZSB2YXJpYWJsZXMuXG4gICAqIEBwYXJhbSB7e3N0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyfX0gW2NvbnRleHQucG9zaXRpb25dIC0gUG9zaXRpb24gaW4gc291cmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQuc3VnZ2VzdGlvbl0gLSBBY3Rpb25hYmxlIHN1Z2dlc3Rpb24gZm9yIGZpeGluZyB0aGUgZXJyb3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBjb250ZXh0ID0ge30pIHtcbiAgICBzdXBlcihtZXNzYWdlLCBjb250ZXh0KTtcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLm5hbWUgPSAnVGVtcGxhdGVFcnJvcic7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd8bnVsbH0gKi9cbiAgICB0aGlzLmV4cHJlc3Npb24gPSBjb250ZXh0LmV4cHJlc3Npb24gfHwgbnVsbDtcbiAgICAvKiogQHR5cGUge3N0cmluZ1tdfSAqL1xuICAgIHRoaXMuc2NvcGVWYXJpYWJsZXMgPSBjb250ZXh0LnNjb3BlVmFyaWFibGVzIHx8IFtdO1xuICAgIC8qKiBAdHlwZSB7e3N0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyfXxudWxsfSAqL1xuICAgIHRoaXMucG9zaXRpb24gPSBjb250ZXh0LnBvc2l0aW9uIHx8IG51bGw7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcGFydHMgPSBbIGAke3RoaXMubmFtZX06ICR7dGhpcy5tZXNzYWdlfWAgXTtcblxuICAgIGlmICh0aGlzLmV4cHJlc3Npb24pXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIEV4cHJlc3Npb246IEBAJHt0aGlzLmV4cHJlc3Npb259QEBgKTtcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uKVxuICAgICAgcGFydHMucHVzaChgXFxuICBQb3NpdGlvbjogJHt0aGlzLnBvc2l0aW9uLnN0YXJ0fS0ke3RoaXMucG9zaXRpb24uZW5kfWApO1xuXG4gICAgaWYgKHRoaXMuc2NvcGVWYXJpYWJsZXMubGVuZ3RoID4gMClcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgQXZhaWxhYmxlIHZhcmlhYmxlczogJHt0aGlzLnNjb3BlVmFyaWFibGVzLmpvaW4oJywgJyl9YCk7XG5cbiAgICBpZiAodGhpcy5jb250ZXh0LnN1Z2dlc3Rpb24pXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIFN1Z2dlc3Rpb246ICR7dGhpcy5jb250ZXh0LnN1Z2dlc3Rpb259YCk7XG5cbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH1cbn1cblxuLyoqXG4gKiB0eXBlOiBDbGFzc1xuICogbmFtZTogQ29tcG9uZW50RXJyb3JcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBFcnJvciB0aHJvd24gZHVyaW5nIGNvbXBvbmVudCBsaWZlY3ljbGUgb3BlcmF0aW9ucy4gSW5jbHVkZXMgdGhlIGNvbXBvbmVudCB0YWcgbmFtZSxcbiAqICAgbGlmZWN5Y2xlIHBoYXNlLCBhbmQgdHJ1bmNhdGVkIG91dGVySFRNTCBmb3IgY29udGV4dC5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgdGhyb3cgbmV3IENvbXBvbmVudEVycm9yKCdFcnJvciBpbiBtb3VudGVkKCkgY2FsbGJhY2snLCB7XG4gKiAgICAgICB0YWdOYW1lOiAnbXktY29tcG9uZW50JyxcbiAqICAgICAgIHBoYXNlOiAnbW91bnRlZCcsXG4gKiAgICAgICBvdXRlckhUTUw6ICc8bXktY29tcG9uZW50IGF0dHI9XCJ2YWx1ZVwiPi4uLjwvbXktY29tcG9uZW50PicsXG4gKiAgICAgfSk7XG4gKiAgICAgYGBgXG4gKi9cblxuLyoqXG4gKiBFcnJvciB0aHJvd24gZHVyaW5nIGNvbXBvbmVudCBsaWZlY3ljbGUgb3BlcmF0aW9ucy5cbiAqIEBleHRlbmRzIE15dGhpeEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBDb21wb25lbnRFcnJvciBleHRlbmRzIE15dGhpeEVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIENvbXBvbmVudEVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9e31dIC0gQWRkaXRpb25hbCBjb250ZXh0IGZvciBkZWJ1Z2dpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC50YWdOYW1lXSAtIFRoZSBjb21wb25lbnQncyB0YWcgbmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnBoYXNlXSAtIFRoZSBsaWZlY3ljbGUgcGhhc2UgKCdtb3VudGVkJywgJ3VubW91bnRlZCcsIGV0Yy4pLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQub3V0ZXJIVE1MXSAtIFRoZSBjb21wb25lbnQncyBvdXRlckhUTUwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5zdWdnZXN0aW9uXSAtIEFjdGlvbmFibGUgc3VnZ2VzdGlvbiBmb3IgZml4aW5nIHRoZSBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbnRleHQgPSB7fSkge1xuICAgIHN1cGVyKG1lc3NhZ2UsIGNvbnRleHQpO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMubmFtZSA9ICdDb21wb25lbnRFcnJvcic7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy50YWdOYW1lID0gY29udGV4dC50YWdOYW1lIHx8ICd1bmtub3duJztcbiAgICAvKiogQHR5cGUge3N0cmluZ3xudWxsfSAqL1xuICAgIHRoaXMucGhhc2UgPSBjb250ZXh0LnBoYXNlIHx8IG51bGw7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd8bnVsbH0gKi9cbiAgICB0aGlzLm91dGVySFRNTCA9IGNvbnRleHQub3V0ZXJIVE1MIHx8IG51bGw7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcGFydHMgPSBbIGAke3RoaXMubmFtZX06ICR7dGhpcy5tZXNzYWdlfWAgXTtcblxuICAgIHBhcnRzLnB1c2goYFxcbiAgQ29tcG9uZW50OiA8JHt0aGlzLnRhZ05hbWV9PmApO1xuXG4gICAgaWYgKHRoaXMucGhhc2UpXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIExpZmVjeWNsZSBwaGFzZTogJHt0aGlzLnBoYXNlfWApO1xuXG4gICAgaWYgKHRoaXMub3V0ZXJIVE1MKSB7XG4gICAgICBsZXQgdHJ1bmNhdGVkID0gdGhpcy5vdXRlckhUTUwubGVuZ3RoID4gMjAwXG4gICAgICAgID8gdGhpcy5vdXRlckhUTUwuc3Vic3RyaW5nKDAsIDIwMCkgKyAnLi4uJ1xuICAgICAgICA6IHRoaXMub3V0ZXJIVE1MO1xuICAgICAgcGFydHMucHVzaChgXFxuICBFbGVtZW50OiAke3RydW5jYXRlZH1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb250ZXh0LnN1Z2dlc3Rpb24pXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIFN1Z2dlc3Rpb246ICR7dGhpcy5jb250ZXh0LnN1Z2dlc3Rpb259YCk7XG5cbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH1cbn1cblxuLyoqXG4gKiB0eXBlOiBDbGFzc1xuICogbmFtZTogRHluYW1pY1Byb3BlcnR5RXJyb3JcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBFcnJvciB0aHJvd24gd2hlbiBhY2Nlc3Npbmcgb3IgbW9kaWZ5aW5nIER5bmFtaWNQcm9wZXJ0eSB2YWx1ZXMgaW5jb3JyZWN0bHkuXG4gKi9cblxuLyoqXG4gKiBFcnJvciB0aHJvd24gd2hlbiBhY2Nlc3Npbmcgb3IgbW9kaWZ5aW5nIER5bmFtaWNQcm9wZXJ0eSB2YWx1ZXMgaW5jb3JyZWN0bHkuXG4gKiBAZXh0ZW5kcyBNeXRoaXhFcnJvclxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY1Byb3BlcnR5RXJyb3IgZXh0ZW5kcyBNeXRoaXhFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBEeW5hbWljUHJvcGVydHlFcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXt9XSAtIEFkZGl0aW9uYWwgY29udGV4dCBmb3IgZGVidWdnaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQucHJvcGVydHlQYXRoXSAtIFRoZSBwcm9wZXJ0eSBwYXRoIGJlaW5nIGFjY2Vzc2VkLlxuICAgKiBAcGFyYW0geyp9IFtjb250ZXh0LmN1cnJlbnRWYWx1ZV0gLSBUaGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7Kn0gW2NvbnRleHQuYXR0ZW1wdGVkVmFsdWVdIC0gVGhlIHZhbHVlIHRoYXQgd2FzIGF0dGVtcHRlZCB0byBiZSBzZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5zdWdnZXN0aW9uXSAtIEFjdGlvbmFibGUgc3VnZ2VzdGlvbiBmb3IgZml4aW5nIHRoZSBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbnRleHQgPSB7fSkge1xuICAgIHN1cGVyKG1lc3NhZ2UsIGNvbnRleHQpO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMubmFtZSA9ICdEeW5hbWljUHJvcGVydHlFcnJvcic7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd8bnVsbH0gKi9cbiAgICB0aGlzLnByb3BlcnR5UGF0aCA9IGNvbnRleHQucHJvcGVydHlQYXRoIHx8IG51bGw7XG4gICAgLyoqIEB0eXBlIHsqfSAqL1xuICAgIHRoaXMuY3VycmVudFZhbHVlID0gY29udGV4dC5jdXJyZW50VmFsdWU7XG4gICAgLyoqIEB0eXBlIHsqfSAqL1xuICAgIHRoaXMuYXR0ZW1wdGVkVmFsdWUgPSBjb250ZXh0LmF0dGVtcHRlZFZhbHVlO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHBhcnRzID0gWyBgJHt0aGlzLm5hbWV9OiAke3RoaXMubWVzc2FnZX1gIF07XG5cbiAgICBpZiAodGhpcy5wcm9wZXJ0eVBhdGgpXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIFByb3BlcnR5IHBhdGg6ICR7dGhpcy5wcm9wZXJ0eVBhdGh9YCk7XG5cbiAgICBpZiAodGhpcy5jb250ZXh0LnN1Z2dlc3Rpb24pXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIFN1Z2dlc3Rpb246ICR7dGhpcy5jb250ZXh0LnN1Z2dlc3Rpb259YCk7XG5cbiAgICByZXR1cm4gcGFydHMuam9pbignJyk7XG4gIH1cbn1cblxuLyoqXG4gKiB0eXBlOiBDb25zdGFudFxuICogbmFtZTogTVlUSElYX0RFQlVHXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgRmxhZyB0byBlbmFibGUgdmVyYm9zZSBkZWJ1ZyBsb2dnaW5nLiBTZXQgYGdsb2JhbFRoaXMuTVlUSElYX0RFQlVHID0gdHJ1ZWAgdG8gZW5hYmxlLlxuICovXG5cbi8qKlxuICogQ2hlY2sgaWYgZGVidWcgbW9kZSBpcyBlbmFibGVkLlxuICogU2V0IGBnbG9iYWxUaGlzLk1ZVEhJWF9ERUJVRyA9IHRydWVgIHRvIGVuYWJsZSB2ZXJib3NlIGxvZ2dpbmcuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBkZWJ1ZyBtb2RlIGlzIGVuYWJsZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RlYnVnTW9kZSA9ICgpID0+IHtcbiAgcmV0dXJuIGdsb2JhbFRoaXMuTVlUSElYX0RFQlVHID09PSB0cnVlO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZGVidWdMb2dcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBMb2cgYSBtZXNzYWdlIG9ubHkgd2hlbiBNWVRISVhfREVCVUcgaXMgZW5hYmxlZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBtZXNzYWdlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBtZXNzYWdlIHRvIGxvZy5cbiAqICAgLSBuYW1lOiBkYXRhXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogQWRkaXRpb25hbCBkYXRhIHRvIGluY2x1ZGUgaW4gdGhlIGxvZy5cbiAqL1xuXG4vKipcbiAqIExvZyBhIGRlYnVnIG1lc3NhZ2UgKG9ubHkgd2hlbiBNWVRISVhfREVCVUcgaXMgZW5hYmxlZCkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIGxvZy5cbiAqIEBwYXJhbSB7Kn0gW2RhdGFdIC0gQWRkaXRpb25hbCBkYXRhIHRvIGluY2x1ZGUgaW4gdGhlIGxvZy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3QgZGVidWdMb2cgPSAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICBpZiAoIWlzRGVidWdNb2RlKCkpXG4gICAgcmV0dXJuO1xuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpXG4gICAgY29uc29sZS5kZWJ1ZyhgW015dGhpeFVJIERlYnVnXSAke21lc3NhZ2V9YCwgZGF0YSk7XG4gIGVsc2VcbiAgICBjb25zb2xlLmRlYnVnKGBbTXl0aGl4VUkgRGVidWddICR7bWVzc2FnZX1gKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGRlYnVnV2FyblxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIExvZyBhIHdhcm5pbmcgb25seSB3aGVuIE1ZVEhJWF9ERUJVRyBpcyBlbmFibGVkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG1lc3NhZ2VcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqICAgLSBuYW1lOiBkYXRhXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogQWRkaXRpb25hbCBkYXRhIHRvIGluY2x1ZGUuXG4gKi9cblxuLyoqXG4gKiBMb2cgYSB3YXJuaW5nIG1lc3NhZ2UgKG9ubHkgd2hlbiBNWVRISVhfREVCVUcgaXMgZW5hYmxlZCkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gKiBAcGFyYW0geyp9IFtkYXRhXSAtIEFkZGl0aW9uYWwgZGF0YSB0byBpbmNsdWRlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z1dhcm4gPSAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICBpZiAoIWlzRGVidWdNb2RlKCkpXG4gICAgcmV0dXJuO1xuXG4gIGlmIChkYXRhICE9PSB1bmRlZmluZWQpXG4gICAgY29uc29sZS53YXJuKGBbTXl0aGl4VUkgV2FybmluZ10gJHttZXNzYWdlfWAsIGRhdGEpO1xuICBlbHNlXG4gICAgY29uc29sZS53YXJuKGBbTXl0aGl4VUkgV2FybmluZ10gJHttZXNzYWdlfWApO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZm9ybWF0Q29tcG9uZW50Q29udGV4dFxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhIGNvbnRleHQgb2JqZWN0IGZvciBjb21wb25lbnQgZXJyb3IgcmVwb3J0aW5nLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IGNvbXBvbmVudFxuICogICAgIGRhdGFUeXBlOiBIVE1MRWxlbWVudFxuICogICAgIGRlc2M6IFRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiAgIC0gbmFtZTogcGhhc2VcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIGxpZmVjeWNsZSBwaGFzZSAoZS5nLiwgJ21vdW50ZWQnLCAndW5tb3VudGVkJykuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIG9iamVjdDsgQ29udGV4dCBvYmplY3Qgc3VpdGFibGUgZm9yIENvbXBvbmVudEVycm9yLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgY29udGV4dCBvYmplY3QgZm9yIGNvbXBvbmVudCBlcnJvciByZXBvcnRpbmcuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb21wb25lbnQgLSBUaGUgY29tcG9uZW50IGluc3RhbmNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHBoYXNlIC0gVGhlIGxpZmVjeWNsZSBwaGFzZSAoJ21vdW50ZWQnLCAndW5tb3VudGVkJywgZXRjLikuXG4gKiBAcmV0dXJucyB7e3RhZ05hbWU6IHN0cmluZywgcGhhc2U6IHN0cmluZywgb3V0ZXJIVE1MOiBzdHJpbmd9fSBDb250ZXh0IG9iamVjdCBzdWl0YWJsZSBmb3IgQ29tcG9uZW50RXJyb3IuXG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXRDb21wb25lbnRDb250ZXh0ID0gKGNvbXBvbmVudCwgcGhhc2UpID0+IHtcbiAgbGV0IG91dGVySFRNTCA9ICcnO1xuXG4gIHRyeSB7XG4gICAgb3V0ZXJIVE1MID0gY29tcG9uZW50Lm91dGVySFRNTCB8fCAnJztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBvdXRlckhUTUwgPSBgPCR7Y29tcG9uZW50LnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgfHwgJ3Vua25vd24nfT5gO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0YWdOYW1lOiAgIGNvbXBvbmVudC50YWdOYW1lPy50b0xvd2VyQ2FzZSgpIHx8ICd1bmtub3duJyxcbiAgICBwaGFzZTogICAgIHBoYXNlLFxuICAgIG91dGVySFRNTDogb3V0ZXJIVE1MLFxuICB9O1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZm9ybWF0U2NvcGVWYXJpYWJsZXNcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBFeHRyYWN0IGF2YWlsYWJsZSB2YXJpYWJsZSBuYW1lcyBmcm9tIGEgc2NvcGUgb2JqZWN0IGZvciBlcnJvciBjb250ZXh0LlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHNjb3BlXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIGRlc2M6IFRoZSBzY29wZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQXJyYXk8c3RyaW5nPjsgTGlzdCBvZiB2YXJpYWJsZSBuYW1lcyBhdmFpbGFibGUgaW4gc2NvcGUuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IGF2YWlsYWJsZSB2YXJpYWJsZSBuYW1lcyBmcm9tIGEgc2NvcGUgb2JqZWN0IGZvciBlcnJvciBjb250ZXh0LlxuICogQHBhcmFtIHtPYmplY3R9IHNjb3BlIC0gVGhlIHNjb3BlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ1tdfSBMaXN0IG9mIHZhcmlhYmxlIG5hbWVzIGF2YWlsYWJsZSBpbiBzY29wZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdFNjb3BlVmFyaWFibGVzID0gKHNjb3BlKSA9PiB7XG4gIGlmICghc2NvcGUpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGxldCB2YXJpYWJsZXMgPSBbXTtcblxuICB0cnkge1xuICAgIC8vIEdldCBvd24gcHJvcGVydGllc1xuICAgIHZhcmlhYmxlcyA9IE9iamVjdC5rZXlzKHNjb3BlKTtcblxuICAgIC8vIEFsc28gY2hlY2sgcHJvdG90eXBlIGNoYWluIGZvciBzY29wZSBwcm94aWVzXG4gICAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHNjb3BlKTtcbiAgICB3aGlsZSAocHJvdG8gJiYgcHJvdG8gIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykpIHtcbiAgICAgICAgaWYgKCF2YXJpYWJsZXMuaW5jbHVkZXMoa2V5KSAmJiBrZXkgIT09ICdjb25zdHJ1Y3RvcicpXG4gICAgICAgICAgdmFyaWFibGVzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSWdub3JlIGVycm9ycyBmcm9tIHByb3h5IHRyYXBzXG4gIH1cblxuICByZXR1cm4gdmFyaWFibGVzLmZpbHRlcigodikgPT4gIXYuc3RhcnRzV2l0aCgnXycpKTtcbn07XG4iLCJpbXBvcnQge1xuICBNWVRISVhfVFlQRSxcbiAgTVlUSElYX1VJX0NPTVBPTkVOVF9UWVBFLFxuICBNWVRISVhfRE9DVU1FTlRfSU5JVElBTElaRUQsXG4gIE1ZVEhJWF9TSEFET1dfUEFSRU5ULFxuICBVTkZJTklTSEVEX0RFRklOSVRJT04sXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0ICogYXMgQ29tcG9uZW50VXRpbHMgIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIEJhc2VVdGlscyAgICAgICBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgICAgICAgICAgIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0IHsgUXVlcnlFbmdpbmUgfSAgICAgIGZyb20gJy4vcXVlcnktZW5naW5lLmpzJztcbmltcG9ydCAqIGFzIEVsZW1lbnRzICAgICAgICBmcm9tICcuL2VsZW1lbnRzLmpzJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEVycm9yLFxuICBmb3JtYXRDb21wb25lbnRDb250ZXh0LFxuICBkZWJ1Z0xvZyxcbn0gZnJvbSAnLi9lcnJvcnMuanMnO1xuaW1wb3J0ICogYXMgU3R5bGVTaGVldE1hbmFnZXIgZnJvbSAnLi9zdHlsZXNoZWV0LW1hbmFnZXIuanMnO1xuXG5leHBvcnQgY29uc3QgaXNNeXRoaXhDb21wb25lbnQgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb21wb25lbnQvY29uc3RhbnRzL2lzLW15dGhpeC1jb21wb25lbnQnKTsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudFxuXG5jb25zdCBJU19BVFRSX01FVEhPRF9OQU1FICAgPSAvXmF0dHJcXCQoLiopJC87XG5jb25zdCBSRUdJU1RFUkVEX0NPTVBPTkVOVFMgPSBuZXcgU2V0KCk7XG5cbi8qKipcbiAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAqIGRlc2M6IHxcbiAqICAgVGhpcyB0aGUgYmFzZSBjbGFzcyBvZiBhbGwgTXl0aGl4IFVJIGNvbXBvbmVudHMuIEl0IGluaGVyaXRzXG4gKiAgIGZyb20gSFRNTEVsZW1lbnQsIGFuZCBzbyB3aWxsIGVuZCB1cCBiZWluZyBhIFtXZWIgQ29tcG9uZW50XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX0NvbXBvbmVudHMpLlxuICpcbiAqICAgSXQgaXMgc3Ryb25nbHkgcmVjb21tZW5kZWQgdGhhdCB5b3UgZnVsbHkgcmVhZCB1cCBhbmQgdW5kZXJzdGFuZFxuICogICBbV2ViIENvbXBvbmVudHNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfQ29tcG9uZW50cylcbiAqICAgaWYgeW91IGRvbid0IGFscmVhZHkgZnVsbHkgdW5kZXJzdGFuZCB0aGVtLiBUaGUgY29yZSBvZiBNeXRoaXggVUkgaXMgdGhlXG4gKiAgIFtXZWIgQ29tcG9uZW50XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViX0NvbXBvbmVudHMpIHN0YW5kYXJkLFxuICogICBzbyB5b3UgbWlnaHQgZW5kIHVwIGEgbGl0dGxlIGNvbmZ1c2VkIGlmIHlvdSBkb24ndCBhbHJlYWR5IHVuZGVyc3RhbmQgdGhlIGZvdW5kYXRpb24uXG4gKlxuICogcHJvcGVydGllczpcbiAqICAgLSBjYXB0aW9uOiBcIi4uLiBIVE1MRWxlbWVudCBJbnN0YW5jZSBQcm9wZXJ0aWVzXCJcbiAqICAgICBkZXNjOiBcIkFsbCBbSFRNTEVsZW1lbnQgSW5zdGFuY2UgUHJvcGVydGllc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50I2luc3RhbmNlX3Byb3BlcnRpZXMpIGFyZSBpbmhlcml0ZWQgZnJvbSBbSFRNTEVsZW1lbnRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudClcIlxuICogICAgIGxpbms6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudCNpbnN0YW5jZV9wcm9wZXJ0aWVzXG4gKlxuICogICAtIG5hbWU6IGlzTXl0aGl4Q29tcG9uZW50XG4gKiAgICAgZGF0YVR5cGU6IGJvb2xlYW5cbiAqICAgICBjYXB0aW9uOiBcIltzdGF0aWMgTXl0aGl4VUlDb21wb25lbnQuaXNNeXRoaXhDb21wb25lbnRdXCJcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBJcyBgdHJ1ZWAgZm9yIE15dGhpeCBVSSBjb21wb25lbnRzLlxuICogICAtIG5hbWU6IHNlbnNpdGl2ZVRhZ05hbWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgY2FwdGlvbjogc2Vuc2l0aXZlVGFnTmFtZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFdvcmtzIGlkZW50aWNhbGx5IHRvIFtFbGVtZW50LnRhZ05hbWVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L3RhZ05hbWUpIGZvciBYTUwsIHdoZXJlIGNhc2UgaXMgcHJlc2VydmVkLlxuICogICAgICAgSW4gSFRNTCB0aGlzIHdvcmtzIGxpa2UgW0VsZW1lbnQudGFnTmFtZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvdGFnTmFtZSksIGJ1dCBpbnN0ZWFkIG9mIHRoZSByZXN1bHRcbiAqICAgICAgIGFsd2F5cyBiZWluZyBVUFBFUkNBU0UsIHRoZSB0YWcgbmFtZSB3aWxsIGJlIHJldHVybmVkIHdpdGggdGhlIGNhc2luZyBwcmVzZXJ2ZWQuXG4gKiAgIC0gbmFtZTogdGVtcGxhdGVJRFxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBjYXB0aW9uOiB0ZW1wbGF0ZUlEXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBpcyBhIGNvbnZlbmllbmNlIHByb3BlcnR5IHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2YgYHRoaXMuY29uc3RydWN0b3IuVEVNUExBVEVfSURgXG4gKiAgIC0gbmFtZTogZGVsYXlUaW1lcnNcbiAqICAgICBkYXRhVHlwZTogXCJNYXAmbHQ7c3RyaW5nLCBQcm9taXNlJmd0O1wiXG4gKiAgICAgY2FwdGlvbjogZGVsYXlUaW1lcnNcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBBIE1hcCBpbnN0YW5jZSB0aGF0XG4gKiAgICAgICByZXRhaW5zIGBzZXRUaW1lb3V0YCBpZHMgc28gdGhhdCBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmRlYm91bmNlOyBjYW4gcHJvcGVybHkgZnVuY3Rpb24uIEtleXMgYXJlIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuZGVib3VuY2U7XG4gKiAgICAgICB0aW1lciBpZHMgKG9mIHR5cGUgYHN0cmluZ2ApLiBWYWx1ZXMgYXJlIFByb21pc2UgaW5zdGFuY2VzLlxuICogICAgICAgRWFjaCBwcm9taXNlIGluc3RhbmNlIGFsc28gaGFzIGEgc3BlY2lhbCBrZXkgYHRpbWVySURgIHRoYXQgY29udGFpbnMgYSBgc2V0VGltZW91dGAgaWQgb2YgYSBqYXZhc2NyaXB0IHRpbWVyLlxuICogICAgIG5vdGVzOlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDp3YXJuaW5nOiBVc2UgYXQgeW91ciBvd24gcmlzay4gVGhpcyBpcyBNeXRoaXggVUkgaW50ZXJuYWwgY29kZSB0aGF0IG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgTXl0aGl4VUlDb21wb25lbnQuZGVib3VuY2U7XG4gKiAgIC0gbmFtZTogc2hhZG93XG4gKiAgICAgZGF0YVR5cGU6IFwiW1NoYWRvd1Jvb3RdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9TaGFkb3dSb290KVwiXG4gKiAgICAgY2FwdGlvbjogc2hhZG93XG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIHNoYWRvdyByb290IG9mIHRoaXMgY29tcG9uZW50IChvciBgbnVsbGAgaWYgbm9uZSkuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIFRoaXMgaXMgdGhlIGNhY2hlZCByZXN1bHQgb2YgY2FsbGluZyBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmNyZWF0ZVNoYWRvd0RPTTsgd2hlblxuICogICAgICAgICB0aGUgY29tcG9uZW50IGlzIGZpcnN0IGluaXRpYWxpemVkLlxuICogICAtIG5hbWU6IHRlbXBsYXRlXG4gKiAgICAgZGF0YVR5cGU6IFwiW3RlbXBsYXRlIGVsZW1lbnRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC90ZW1wbGF0ZSlcIlxuICogICAgIGNhcHRpb246IHRlbXBsYXRlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIFt0ZW1wbGF0ZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3RlbXBsYXRlKSBlbGVtZW50IGZvciB0aGlzXG4gKiAgICAgICBjb21wb25lbnQsIG9yIGBudWxsYCBpZiB0aGVyZSBpcyBubyB0ZW1wbGF0ZSBmb3VuZCBmb3IgdGhlIGNvbXBvbmVudC5cbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gVGhpcyBpcyB0aGUgY2FjaGVkIHJlc3VsdCBvZiBjYWxsaW5nIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuZ2V0Q29tcG9uZW50VGVtcGxhdGU7IHdoZW5cbiAqICAgICAgICAgdGhlIGNvbXBvbmVudCBpcyBmaXJzdCBpbml0aWFsaXplZC5cbioqKi9cblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJQ29tcG9uZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBzdGF0aWMgaXNNeXRoaXhDb21wb25lbnQgPSBpc015dGhpeENvbXBvbmVudDtcblxuICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0oaW5zdGFuY2UpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChpbnN0YW5jZSAmJiBpbnN0YW5jZVtNWVRISVhfVFlQRV0gPT09IE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHN0YXRpYyBjb21waWxlU3R5bGVGb3JEb2N1bWVudCA9IGNvbXBpbGVTdHlsZUZvckRvY3VtZW50O1xuICBzdGF0aWMgcmVnaXN0ZXIgPSBmdW5jdGlvbihfbmFtZSwgX0tsYXNzKSB7XG4gICAgbGV0IG5hbWUgPSBfbmFtZSB8fCB0aGlzLnRhZ05hbWUgfHwgQmFzZVV0aWxzLnRvS2ViYWJDYXNlKHRoaXMubmFtZSk7XG5cbiAgICBpZiAoIWN1c3RvbUVsZW1lbnRzLmdldChuYW1lKSkge1xuICAgICAgbGV0IEtsYXNzID0gX0tsYXNzIHx8IHRoaXM7XG5cbiAgICAgIGxldCBvYnNlcnZlZEF0dHJpYnV0ZXMgPSBBcnJheS5mcm9tKFxuICAgICAgICBuZXcgU2V0KFxuICAgICAgICAgIChLbGFzcy5vYnNlcnZlZEF0dHJpYnV0ZXMgfHwgW10pLmNvbmNhdChLbGFzcy5jb21waWxlQXR0cmlidXRlTWV0aG9kcyhLbGFzcykpLFxuICAgICAgICApLFxuICAgICAgKTtcblxuICAgICAgaWYgKG9ic2VydmVkQXR0cmlidXRlcy5sZW5ndGggPiAwKVxuICAgICAgICBLbGFzcy5vYnNlcnZlZEF0dHJpYnV0ZXMgPSBvYnNlcnZlZEF0dHJpYnV0ZXM7XG5cbiAgICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShuYW1lLCBLbGFzcyk7XG5cbiAgICAgIGxldCByZWdpc3RlckV2ZW50ID0gbmV3IEV2ZW50KCdteXRoaXgtY29tcG9uZW50LXJlZ2lzdGVyZWQnKTtcbiAgICAgIHJlZ2lzdGVyRXZlbnQuY29tcG9uZW50TmFtZSA9IG5hbWU7XG4gICAgICByZWdpc3RlckV2ZW50LmNvbXBvbmVudCA9IEtsYXNzO1xuXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyZWdpc3RlckV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBzdGF0aWMgY29tcGlsZUF0dHJpYnV0ZU1ldGhvZHMgPSBmdW5jdGlvbihLbGFzcykge1xuICAgIGNvbnN0IHNldHVwQXR0cmlidXRlSGFuZGxlcnMgPSAoeyBwcm9wZXJ0eU5hbWUsIGF0dHJpYnV0ZU5hbWUsIG9yaWdpbmFsTmFtZSB9KSA9PiB7XG4gICAgICBpZiAoUkVHSVNURVJFRF9DT01QT05FTlRTLmhhcyhLbGFzcykpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgbGV0IHsgZGVzY3JpcHRvciB9ID0gVXRpbHMuZ2V0RGVzY3JpcHRvckZyb21Qcm90b3R5cGVDaGFpbihwcm90bywgb3JpZ2luYWxOYW1lKTtcbiAgICAgIGlmICghZGVzY3JpcHRvcilcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHJlbW92ZSB0aGlzIGZyb21cbiAgICAgIC8vIHRoZSBwcm90b3R5cGUsIGFzIGNoaWxkIGNsYXNzZXMgd2lsbFxuICAgICAgLy8gd2FudCB0byBpbmhlcml0IGF0dHJpYnV0ZSBiZWhhdmlvci5cbiAgICAgIC8vIGRlbGV0ZSBwcm90b3R5cGVbb3JpZ2luYWxOYW1lXTtcblxuICAgICAgLy8gSWYgd2UgaGF2ZSBhIFwidmFsdWVcIiB0aGVuIHRoZSB1c2VyIGRpZCBpdCB3cm9uZy4uLlxuICAgICAgLy8gc28ganVzdCBtYWtlIGl0IHRoZSBcInNldHRlclwiXG4gICAgICBsZXQgc2V0dGVyICAgID0gZGVzY3JpcHRvci5zZXQgfHwgZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIGxldCBnZXR0ZXIgICAgPSBkZXNjcmlwdG9yLmdldDtcbiAgICAgIGxldCBoYXNTZXR0ZXIgPSAodHlwZW9mIHNldHRlciA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICBsZXQgaGFzR2V0dGVyID0gKHR5cGVvZiBnZXR0ZXIgPT09ICdmdW5jdGlvbicpO1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwcm90bywge1xuICAgICAgICBbcHJvcGVydHlOYW1lXToge1xuICAgICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gKGhhc0dldHRlcikgPyBnZXR0ZXIuY2FsbCh0aGlzKSA6IHRoaXMuYXR0cihhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogICAgICAgICAgZnVuY3Rpb24oWyBuZXdWYWx1ZSwgb2xkVmFsdWUgXSkge1xuICAgICAgICAgICAgdGhpcy5hdHRyKGF0dHJpYnV0ZU5hbWUsIG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKGhhc1NldHRlcilcbiAgICAgICAgICAgICAgc2V0dGVyLmNhbGwodGhpcywgWyBuZXdWYWx1ZSwgb2xkVmFsdWUgXSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBsZXQgcHJvdG8gICAgICAgICAgID0gS2xhc3MucHJvdG90eXBlO1xuICAgIGxldCBhdHRyaWJ1dGVOYW1lcyAgPSBVdGlscy5nZXRBbGxQcm9wZXJ0eU5hbWVzKHByb3RvKVxuICAgICAgLmZpbHRlcigobmFtZSkgPT4gSVNfQVRUUl9NRVRIT0RfTkFNRS50ZXN0KG5hbWUpKVxuICAgICAgLm1hcCgob3JpZ2luYWxOYW1lKSA9PiB7XG4gICAgICAgIGxldCBwcm9wZXJ0eU5hbWUgID0gb3JpZ2luYWxOYW1lLm1hdGNoKElTX0FUVFJfTUVUSE9EX05BTUUpWzFdO1xuICAgICAgICBsZXQgYXR0cmlidXRlTmFtZSA9IEJhc2VVdGlscy50b0tlYmFiQ2FzZShwcm9wZXJ0eU5hbWUpO1xuXG4gICAgICAgIHNldHVwQXR0cmlidXRlSGFuZGxlcnMoeyBwcm9wZXJ0eU5hbWUsIGF0dHJpYnV0ZU5hbWUsIG9yaWdpbmFsTmFtZSB9KTtcblxuICAgICAgICByZXR1cm4gYXR0cmlidXRlTmFtZTtcbiAgICAgIH0pO1xuXG4gICAgUkVHSVNURVJFRF9DT01QT05FTlRTLmFkZChLbGFzcyk7XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGF0dHJpYnV0ZU5hbWVzKSk7XG4gIH07XG5cbiAgc2V0IGF0dHIkZGF0YU15dGhpeFNyYyhbIG5ld1ZhbHVlLCBvbGRWYWx1ZSBdKSB7XG4gICAgdGhpcy5hd2FpdEZldGNoU3JjT25WaXNpYmxlKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBDYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFkZGVkIHRvIHRoZSBET00uXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkYXRhVHlwZXM6IE11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBNdXRhdGlvblJlY29yZCBpbnN0YW5jZSB0aGF0IHRoYXQgY2F1c2VkIHRoaXMgbWV0aG9kIHRvIGJlIGNhbGxlZC5cbiAgICovXG4gIG9uTXV0YXRpb25BZGRlZCgpIHt9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQ2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyByZW1vdmVkIGZyb20gdGhlIERPTS5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRhdGFUeXBlczogTXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIE11dGF0aW9uUmVjb3JkIGluc3RhbmNlIHRoYXQgdGhhdCBjYXVzZWQgdGhpcyBtZXRob2QgdG8gYmUgY2FsbGVkLlxuICAgKi9cbiAgb25NdXRhdGlvblJlbW92ZWQoKSB7fVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIENhbGxlZCB3aGVuIGFuIGVsZW1lbnQgaXMgYWRkZWQgYXMgYSBjaGlsZC5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbm9kZVxuICAgKiAgICAgZGF0YVR5cGVzOiBFbGVtZW50XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBjaGlsZCBlbGVtZW50IGJlaW5nIGFkZGVkLlxuICAgKiAgIC0gbmFtZTogbXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRhdGFUeXBlczogTXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIE11dGF0aW9uUmVjb3JkIGluc3RhbmNlIHRoYXQgdGhhdCBjYXVzZWQgdGhpcyBtZXRob2QgdG8gYmUgY2FsbGVkLlxuICAgKi9cbiAgb25NdXRhdGlvbkNoaWxkQWRkZWQoKSB7fVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIENhbGxlZCB3aGVuIGEgY2hpbGQgZWxlbWVudCBpcyByZW1vdmVkLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBub2RlXG4gICAqICAgICBkYXRhVHlwZXM6IEVsZW1lbnRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIGNoaWxkIGVsZW1lbnQgYmVpbmcgcmVtb3ZlZC5cbiAgICogICAtIG5hbWU6IG11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkYXRhVHlwZXM6IE11dGF0aW9uUmVjb3JkXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBNdXRhdGlvblJlY29yZCBpbnN0YW5jZSB0aGF0IHRoYXQgY2F1c2VkIHRoaXMgbWV0aG9kIHRvIGJlIGNhbGxlZC5cbiAgICovXG4gIG9uTXV0YXRpb25DaGlsZFJlbW92ZWQoKSB7fVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBbTVlUSElYX1RZUEVdOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSxcbiAgICAgIH0sXG4gICAgICBbaXNNeXRoaXhDb21wb25lbnRdOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuaXNNeXRoaXhDb21wb25lbnRcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBpc015dGhpeENvbXBvbmVudCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBVdGlscy5iaW5kTWV0aG9kcy5jYWxsKHRoaXMsIHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlIC8qLCBbIEhUTUxFbGVtZW50LnByb3RvdHlwZSBdKi8pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgJ3NlbnNpdGl2ZVRhZ05hbWUnOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuc2Vuc2l0aXZlVGFnTmFtZVxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogICAgICAgICAgKCkgPT4gKCh0aGlzLnByZWZpeCkgPyBgJHt0aGlzLnByZWZpeH06JHt0aGlzLmxvY2FsTmFtZX1gIDogdGhpcy5sb2NhbE5hbWUpLFxuICAgICAgfSxcbiAgICAgICd0ZW1wbGF0ZUlEJzogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LnRlbXBsYXRlSURcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIHRoaXMuY29uc3RydWN0b3IuVEVNUExBVEVfSUQsXG4gICAgICB9LFxuICAgICAgJ2RlbGF5VGltZXJzJzogeyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LmRlbGF5VGltZXJzXG4gICAgICAgIHdyaXRhYmxlOiAgICAgZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBuZXcgTWFwKCksXG4gICAgICB9LFxuICAgICAgJ2RvY3VtZW50SW5pdGlhbGl6ZWQnOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuZG9jdW1lbnRJbml0aWFsaXplZFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogICAgICAgICAgKCkgPT4gVXRpbHMubWV0YWRhdGEodGhpcy5jb25zdHJ1Y3RvciwgTVlUSElYX0RPQ1VNRU5UX0lOSVRJQUxJWkVEKSxcbiAgICAgICAgc2V0OiAgICAgICAgICAodmFsdWUpID0+IHtcbiAgICAgICAgICBVdGlscy5tZXRhZGF0YSh0aGlzLmNvbnN0cnVjdG9yLCBNWVRISVhfRE9DVU1FTlRfSU5JVElBTElaRUQsICEhdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICdzaGFkb3cnOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuc2hhZG93XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIHRoaXMuY3JlYXRlU2hhZG93RE9NKCksXG4gICAgICB9LFxuICAgICAgJ3RlbXBsYXRlJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0aGlzLmdldENvbXBvbmVudFRlbXBsYXRlKCksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQSBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGdldHRpbmcgYW5kIHNldHRpbmcgYXR0cmlidXRlcy4gSWYgb25seSBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWRcbiAgICogICB0byB0aGlzIG1ldGhvZCwgdGhlbiBpdCB3aWxsIGFjdCBhcyBhIGdldHRlciwgZ2V0dGluZyB0aGUgYXR0cmlidXRlIHNwZWNpZmllZCBieSBuYW1lLlxuICAgKlxuICAgKiAgIElmIGhvd2V2ZXIgdHdvIG9yIG1vcmUgYXJndW1lbnRzIGFyZSBwcm92aWRlZCwgdGhlbiB0aGlzIGlzIGFuIGF0dHJpYnV0ZSBzZXR0ZXIuXG4gICAqXG4gICAqICAgSWYgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGB1bmRlZmluZWRgLCBgbnVsbGAsIG9yIGBmYWxzZWAsIHRoZW4gdGhlIGF0dHJpYnV0ZSB3aWxsIGJlXG4gICAqICAgcmVtb3ZlZC5cbiAgICpcbiAgICogICBJZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYHRydWVgLCB0aGVuIHRoZSBhdHRyaWJ1dGUncyB2YWx1ZSB3aWxsIGJlIHNldCB0byBhbiBlbXB0eSBzdHJpbmcgYCcnYC5cbiAgICpcbiAgICogICBBbnkgb3RoZXIgdmFsdWUgaXMgY29udmVydGVkIHRvIGEgc3RyaW5nIGFuZCBzZXQgYXMgdGhlIGF0dHJpYnV0ZSdzIHZhbHVlLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBuYW1lXG4gICAqICAgICBkYXRhVHlwZXM6IHN0cmluZ1xuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgbmFtZSBvZiB0aGUgYXR0cmlidXRlIHRvIG9wZXJhdGUgb24uXG4gICAqICAgLSBuYW1lOiB2YWx1ZVxuICAgKiAgICAgZGF0YVR5cGVzOiBhbnlcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgSWYgYHVuZGVmaW5lZGAsIGBudWxsYCwgb3IgYGZhbHNlYCwgcmVtb3ZlIHRoZSBuYW1lZCBhdHRyaWJ1dGUuXG4gICAqICAgICAgIElmIGB0cnVlYCwgc2V0IHRoZSBuYW1lZCBhdHRyaWJ1dGUncyB2YWx1ZSB0byBhbiBlbXB0eSBzdHJpbmcgYCcnYC5cbiAgICogICAgICAgRm9yIGFueSBvdGhlciB2YWx1ZSwgZmlyc3QgY29udmVydCBpdCBpbnRvIGEgc3RyaW5nLCBhbmQgdGhlbiBzZXQgdGhlIG5hbWVkIGF0dHJpYnV0ZSdzIHZhbHVlIHRvIHRoZSByZXN1bHRpbmcgc3RyaW5nLlxuICAgKiByZXR1cm46IHxcbiAgICogICAxLiBAdHlwZXMgc3RyaW5nOyBJZiBhIHNpbmdsZSBhcmd1bWVudCBpcyBwcm92aWRlZCwgdGhlbiByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBzcGVjaWZpZWQgbmFtZWQgYXR0cmlidXRlLlxuICAgKiAgIDIuIEB0eXBlcyB0aGlzOyBJZiBtb3JlIHRoYW4gb25lIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCB0aGVuIHNldCB0aGUgc3BlY2lmaWVkIGF0dHJpYnV0ZSB0byB0aGUgc3BlY2lmaWVkIHZhbHVlLFxuICAgKiAgICAgIGFuZCByZXR1cm4gYHRoaXNgICh0byBhbGxvdyBmb3IgY2hhaW5pbmcpLlxuICAgKi9cbiAgYXR0cihuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT09IGZhbHNlKVxuICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgKHZhbHVlID09PSB0cnVlKSA/ICcnIDogKCcnICsgdmFsdWUpKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICB9XG5cbiAgaTE4bihwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBsZXQgbGFuZ3VhZ2VQcm92aWRlciA9IFV0aWxzLnNwZWNpYWxDbG9zZXN0KHRoaXMsICdteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXInKTtcbiAgICBpZiAoIWxhbmd1YWdlUHJvdmlkZXIpXG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgcmV0dXJuIGxhbmd1YWdlUHJvdmlkZXIuaTE4bihwYXRoLCBkZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgSW5qZWN0IGEgbmV3IHN0eWxlIHNoZWV0IHZpYSBhIGA8c3R5bGU+YCBlbGVtZW50IGR5bmFtaWNhbGx5IGF0IHJ1bi10aW1lLlxuICAgKlxuICAgKiAgIFRoaXMgbWV0aG9kIGFsbG93cyB0aGUgY2FsbGVyIHRvIGluamVjdCBkeW5hbWljIHN0eWxlcyBhdCBydW4tdGltZS5cbiAgICogICBJdCB3aWxsIG9ubHkgaW5qZWN0IHRoZSBzdHlsZXMgb25jZSwgbm8gbWF0dGVyIGhvdyBtYW55IHRpbWVzIHRoZVxuICAgKiAgIG1ldGhvZCBpcyBjYWxsZWQtLWFzIGxvbmcgYXMgdGhlIHN0eWxlIGNvbnRlbnQgaXRzZWxmIGRvZXNuJ3QgY2hhbmdlLlxuICAgKlxuICAgKiAgIFRoZSBjb250ZW50IGlzIGhhc2hlZCB2aWEgU0hBMjU2LCBhbmQgdGhlIGhhc2ggaXMgdXNlZCBhcyB0aGUgc3R5bGUgc2hlZXQgaWQuIFRoaXNcbiAgICogICBhbGxvd3MgeW91IHRvIGNhbGwgdGhlIG1ldGhvZCBpbnNpZGUgYSBjb21wb25lbnQncyBAc2VlIE15dGhpeFVJQ29tcG9uZW50Lm1vdW50ZWQ7XG4gICAqICAgbWV0aG9kLCB3aXRob3V0IG5lZWRpbmcgdG8gd29ycnkgYWJvdXQgZHVwbGljYXRpbmcgdGhlIHN0eWxlcyBvdmVyIGFuZCBvdmVyIGFnYWluLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBjb250ZW50XG4gICAqICAgICBkYXRhVHlwZXM6IHN0cmluZ1xuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgQ1NTIHN0eWxlc2hlZXQgY29udGVudCB0byBpbmplY3QgaW50byBhIGA8c3R5bGU+YCBlbGVtZW50LiBUaGlzIGNvbnRlbnQgaXNcbiAgICogICAgICAgdXNlZCB0byBnZW5lcmF0ZSBhbiBgaWRgIGZvciB0aGUgYDxzdHlsZT5gIGVsZW1lbnQsIHNvIHRoYXQgaXQgb25seSBnZXRzIGFkZGVkXG4gICAqICAgICAgIHRvIHRoZSBgZG9jdW1lbnRgIG9uY2UuXG4gICAqICAgLSBuYW1lOiBtZWRpYVxuICAgKiAgICAgZGF0YVR5cGVzOiBzdHJpbmdcbiAgICogICAgIGRlZmF1bHQ6IFwiJ3NjcmVlbidcIlxuICAgKiAgICAgb3B0aW9uYWw6IHRydWVcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgV2hhdCB0byBzZXQgdGhlIGBtZWRpYWAgYXR0cmlidXRlIG9mIHRoZSBjcmVhdGVkIGA8c3R5bGU+YCBlbGVtZW50IHRvLiBEZWZhdWx0c1xuICAgKiAgICAgICB0byBgJ3NjcmVlbidgLlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDp3YXJuaW5nOiBJdCBpcyBvZnRlbiBiZXR0ZXIgdG8gc2ltcGx5IGFkZCBhIGA8c3R5bGU+YCBlbGVtZW50IHRvIHlvdXIgY29tcG9uZW50J3MgSFRNTCB0ZW1wbGF0ZS5cbiAgICogICAgIEhvd2V2ZXIsIHNvbWV0aW1lcyB0cnVseSBkeW5hbWljIHN0eWxlcyBhcmUgbmVlZGVkLCB3aGVyZSB0aGUgY29udGVudCB3b24ndCBiZSBrbm93blxuICAgKiAgICAgdW50aWwgcnVudGltZS4gVGhpcyBpcyB0aGUgcHJvcGVyIHVzZSBjYXNlIGZvciB0aGlzIG1ldGhvZC5cbiAgICogICAtIHxcbiAgICogICAgIDp3YXJuaW5nOiBQbGVhc2UgZWR1Y2F0ZWQgeW91cnNlbGYgKHVubGlrZSBwZW9wbGUgd2hvIGxvdmUgUmVhY3QpIGFuZCBkbyBub3Qgb3ZlcnVzZSBkeW5hbWljIG9yIGlubGluZSBzdHlsZXMuXG4gICAqICAgICBXaGlsZSB0aGUgcmVzdWx0IG9mIHRoaXMgbWV0aG9kIGlzIGNlcnRhaW5seSBhIHN0ZXAgYWJvdmUgaW5saW5lIHN0eWxlcywgdGhpcyBtZXRob2QgaGFzXG4gICAqICAgICBbZ3JlYXQgcG90ZW50aWFsIHRvIGNhdXNlIGhhcm1dKGh0dHBzOi8vd29ybGRvZmRldi5pbmZvLzYtcmVhc29ucy13aHkteW91LXNob3VsZG50LXN0eWxlLWlubGluZS8pXG4gICAqICAgICBhbmQgc3ByZWFkIHlvdXIgb3duIGlnbm9yYW5jZSB0byBvdGhlcnMuIFVzZSB3aXRoICoqQ0FSRSoqIVxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgRWxlbWVudDsgVGhlIGA8c3R5bGU+YCBlbGVtZW50IGZvciB0aGUgc3BlY2lmaWVkIHN0eWxlLlxuICAgKiBleGFtcGxlczpcbiAgICogICAtIHxcbiAgICogICAgIGBgYGphdmFzY3JpcHRcbiAgICogICAgIGltcG9ydCB7IE15dGhpeFVJQ29tcG9uZW50IH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAgICpcbiAgICogICAgIGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICAgKiAgICAgICBzdGF0aWMgdGFnTmFtZSA9ICdteS1jb21wb25lbnQnO1xuICAgKlxuICAgKiAgICAgICAvLyAuLi5cbiAgICpcbiAgICogICAgICAgbW91bnRlZCgpIHtcbiAgICogICAgICAgICBsZXQgeyBzaWRlYmFyV2lkdGggfSA9IHRoaXMubG9hZFVzZXJQcmVmZXJlbmNlcygpO1xuICAgKiAgICAgICAgIHRoaXMuaW5qZWN0U3R5bGVTaGVldChgbmF2LnNpZGViYXIgeyB3aWR0aDogJHtzaWRlYmFyV2lkdGh9cHg7IH1gLCAnc2NyZWVuJyk7XG4gICAqICAgICAgIH1cbiAgICogICAgIH1cbiAgICpcbiAgICogICAgIE15Q29tcG9uZW50LnJlZ2lzdGVyKCk7XG4gICAqICAgICBgYGBcbiAgICovXG4gIGluamVjdFN0eWxlU2hlZXQoY29udGVudCwgbWVkaWEgPSAnc2NyZWVuJykge1xuICAgIGxldCBzdHlsZUlEICAgICAgID0gYElEU1RZTEUke0Jhc2VVdGlscy5TSEEyNTYoYCR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfToke2NvbnRlbnR9OiR7bWVkaWF9YCl9YDtcbiAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICBsZXQgc3R5bGVFbGVtZW50ICA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc3R5bGUjJHtzdHlsZUlEfWApO1xuXG4gICAgaWYgKHN0eWxlRWxlbWVudClcbiAgICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG5cbiAgICBzdHlsZUVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1teXRoaXgtZm9yJywgdGhpcy5zZW5zaXRpdmVUYWdOYW1lKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHN0eWxlSUQpO1xuICAgIGlmIChtZWRpYSlcbiAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuXG4gICAgc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG5cbiAgICByZXR1cm4gc3R5bGVFbGVtZW50O1xuICB9XG5cbiAgcHJvY2Vzc0VsZW1lbnRzKG5vZGUsIF9vcHRpb25zKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoIW9wdGlvbnMuc2NvcGUpXG4gICAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCBzY29wZTogdGhpcy4kJCB9O1xuXG4gICAgcmV0dXJuIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cyhub2RlLCBvcHRpb25zKTtcbiAgfVxuXG4gIGdldENoaWxkcmVuQXNGcmFnbWVudChub0VtcHR5UmVzdWx0KSB7XG4gICAgbGV0IGhhc0NvbnRlbnQgICAgPSBmYWxzZTtcbiAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICBsZXQgdGVtcGxhdGUgICAgICA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gICAgaWYgKCF0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgcmV0dXJuIChub0VtcHR5UmVzdWx0KSA/IHVuZGVmaW5lZCA6IHRlbXBsYXRlO1xuXG4gICAgd2hpbGUgKHRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBub2RlID0gdGhpcy5jaGlsZE5vZGVzWzBdO1xuICAgICAgaWYgKCEobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUgJiYgQmFzZVV0aWxzLmlzTk9FKG5vZGUubm9kZVZhbHVlKSkpXG4gICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICB0ZW1wbGF0ZS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICB9XG5cbiAgICBpZiAobm9FbXB0eVJlc3VsdCAmJiAhaGFzQ29udGVudClcbiAgICAgIHJldHVybjtcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIEdldCB0aGUgcGFyZW50IE5vZGUgb2YgdGhpcyBlbGVtZW50LlxuICAgKlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDp3YXJuaW5nOiBVbmxpa2UgW05vZGUucGFyZW50Tm9kZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUvcGFyZW50Tm9kZSksIHRoaXNcbiAgICogICAgIHdpbGwgYWxzbyBzZWFyY2ggYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcy5cbiAgICogICAtIHxcbiAgICogICAgIDp3YXJuaW5nOiAqKlNlYXJjaGluZyBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzIG9ubHkgd29ya3MgZm9yIE15dGhpeCBVSSBjb21wb25lbnRzISoqXG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogU2VhcmNoaW5nIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMgaXMgYWNjb21wbGlzaGVkIHZpYSBsZXZlcmFnaW5nIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE7IGZvclxuICAgKiAgICAgYHRoaXNgIGNvbXBvbmVudC4gV2hlbiBhIGBudWxsYCBwYXJlbnQgaXMgZW5jb3VudGVyZWQsIGBnZXRQYXJlbnROb2RlYCB3aWxsIGxvb2sgZm9yIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsga2V5IEBzZWUgQ29uc3RhbnRzLk1ZVEhJWF9TSEFET1dfUEFSRU5UO1xuICAgKiAgICAgb24gYHRoaXNgLiBJZiBmb3VuZCwgdGhlIHJlc3VsdCBpcyBjb25zaWRlcmVkIHRoZSBbcGFyZW50IE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpIG9mIGB0aGlzYCBjb21wb25lbnQuXG4gICAqICAgLSB8XG4gICAqICAgICA6ZXllOiBUaGlzIGlzIGp1c3QgYSB3cmFwcGVyIGZvciBAc2VlIFV0aWxzLmdldFBhcmVudE5vZGU7LlxuICAgKlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgTm9kZTsgVGhlIHBhcmVudCBub2RlLCBpZiB0aGVyZSBpcyBhbnksIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gICAqL1xuICBnZXRQYXJlbnROb2RlKCkge1xuICAgIHJldHVybiBVdGlscy5nZXRQYXJlbnROb2RlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBbRWxlbWVudC5hdHRhY2hTaGFkb3ddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdylcbiAgICogICB3aXRoIG9uZSBub3RhYmxlIGRpZmZlcmVuY2U6IEl0IHJ1bnMgTXl0aGl4IFVJIGZyYW1ld29yayBzcGVjaWZpYyBjb2RlIGFmdGVyIGEgc2hhZG93IGlzIGF0dGFjaGVkLlxuICAgKlxuICAgKiAgIEN1cnJlbnRseSwgdGhlIG1ldGhvZCBjb21wbGV0ZXMgdGhlIGZvbGxvd2luZyBhY3Rpb25zOlxuICAgKiAgIDEuIENhbGwgYHN1cGVyLmF0dGFjaFNoYWRvdyhvcHRpb25zKWAgdG8gYWN0dWFsbHkgYXR0YWNoIGEgU2hhZG93IERPTVxuICAgKiAgIDIuIEFzc2lnbiBAc2VlIE15dGhpeFVJQ29tcG9uZW50Lm1ldGFkYXRhP2NhcHRpb249bWV0YWRhdGE7IHRvIHRoZSByZXN1bHRpbmcgYHNoYWRvd2AsIHVzaW5nIHRoZSBrZXkgYENvbnN0YW50cy5NWVRISVhfU0hBRE9XX1BBUkVOVGAsIGFuZCB2YWx1ZSBvZiBgdGhpc2AuIEBzb3VyY2VSZWYgX3NoYWRvd01ldGFkYXRhQXNzaWdubWVudDsgVGhpcyBhbGxvd3MgQHNlZSBnZXRQYXJlbnROb2RlOyB0byBsYXRlciBmaW5kIHRoZSBwYXJlbnQgb2YgdGhlIHNoYWRvdy5cbiAgICogICAzLiBgcmV0dXJuIHNoYWRvd2BcbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogb3B0aW9uc1xuICAgKiAgICAgZGF0YVR5cGVzOiBvYmplY3RcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgW29wdGlvbnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdyNvcHRpb25zKSBmb3IgW0VsZW1lbnQuYXR0YWNoU2hhZG93XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cpXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gVGhpcyBpcyBqdXN0IGEgd3JhcHBlciBmb3IgW0VsZW1lbnQuYXR0YWNoU2hhZG93XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cpIHRoYXQgZXhlY3V0ZXNcbiAgICogICAgIGN1c3RvbSBmcmFtZXdvcmsgZnVuY3Rpb25hbGl0eSBhZnRlciB0aGUgYHN1cGVyYCBjYWxsLlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgU2hhZG93Um9vdDsgVGhlIFNoYWRvd1Jvb3QgaW5zdGFuY2UgY3JlYXRlZCBieSBbRWxlbWVudC5hdHRhY2hTaGFkb3ddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdykuXG4gICAqL1xuICBhdHRhY2hTaGFkb3cob3B0aW9ucykge1xuICAgIC8vIENoZWNrIGVudmlyb25tZW50IHN1cHBvcnRcbiAgICBpZiAodHlwZW9mIHN1cGVyLmF0dGFjaFNoYWRvdyAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBzaGFkb3cgPSBzdXBlci5hdHRhY2hTaGFkb3cob3B0aW9ucyk7XG4gICAgVXRpbHMubWV0YWRhdGEoc2hhZG93LCBNWVRISVhfU0hBRE9XX1BBUkVOVCwgdGhpcyk7IC8vIEByZWY6X3NoYWRvd01ldGFkYXRhQXNzaWdubWVudFxuXG4gICAgcmV0dXJuIHNoYWRvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIEEgc3R1YiBmb3IgZGV2ZWxvcGVycyB0byBjb250cm9sIHRoZSBTaGFkb3cgRE9NIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqICAgQnkgZGVmYXVsdCwgdGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgY2FsbCBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmF0dGFjaFNoYWRvdzsgaW4gYFwib3BlblwiYCBgbW9kZWAuXG4gICAqXG4gICAqICAgRGV2ZWxvcGVycyBjYW4gb3ZlcmxvYWQgdGhpcyB0byBkbyBub3RoaW5nIChoYXZlIG5vIFNoYWRvdyBET00gZm9yIGEgc3BlY2lmaWMgY29tcG9uZW50IGZvciBleGFtcGxlKSxcbiAgICogICBvciB0byBkbyBzb21ldGhpbmcgZWxzZSwgc3VjaCBhcyBzcGVjaWZ5IHRoZXkgd291bGQgbGlrZSB0aGVpciBjb21wb25lbnQgdG8gYmUgaW4gYFwiY2xvc2VkXCJgIGBtb2RlYC5cbiAgICpcbiAgICogICBUaGUgcmVzdWx0IG9mIHRoaXMgbWV0aG9kIGlzIGFzc2lnbmVkIHRvIGB0aGlzLnNoYWRvd2AgaW5zaWRlIHRoZSBgY29uc3RydWN0b3JgIG9mIHRoZSBjb21wb25lbnQuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIGRhdGFUeXBlczogb2JqZWN0XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFtvcHRpb25zXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cjb3B0aW9ucykgZm9yIFtFbGVtZW50LmF0dGFjaFNoYWRvd10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93KVxuICAgKiBub3RlczpcbiAgICogICAtIEFsbCB0aGlzIGRvZXMgaXMgY2FsbCBgdGhpcy5hdHRhY2hTaGFkb3dgLiBJdHMgcHVycG9zZSBpcyBmb3IgdGhlIGRldmVsb3BlciB0byBjb250cm9sXG4gICAqICAgICB3aGF0IGhhcHBlbnMgd2l0aCB0aGUgY29tcG9uZW50J3MgU2hhZG93IERPTS5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgQHR5cGVzIFNoYWRvd1Jvb3Q7IFRoZSBTaGFkb3dSb290IGluc3RhbmNlIGNyZWF0ZWQgYnkgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5hdHRhY2hTaGFkb3c7LlxuICAgKi9cbiAgY3JlYXRlU2hhZG93RE9NKG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5jb25zdHJ1Y3Rvci5zaGFkb3cgPT09IGZhbHNlKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBsZXQgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcblxuICAgIC8vIEFkb3B0IHNoYXJlZCBzdHlsZXNoZWV0cyBpZiBkZWZpbmVkIG9uIHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBsZXQgc2hhcmVkU3R5bGVzID0gdGhpcy5jb25zdHJ1Y3Rvci5zaGFyZWRTdHlsZXM7XG4gICAgaWYgKHNoYXJlZFN0eWxlcyAmJiBBcnJheS5pc0FycmF5KHNoYXJlZFN0eWxlcykgJiYgc2hhcmVkU3R5bGVzLmxlbmd0aCA+IDApXG4gICAgICBTdHlsZVNoZWV0TWFuYWdlci5hZG9wdChzaGFkb3csIHNoYXJlZFN0eWxlcyk7XG5cbiAgICByZXR1cm4gc2hhZG93O1xuICB9XG5cbiAgbWVyZ2VDaGlsZHJlbih0YXJnZXQsIC4uLm90aGVycykge1xuICAgIHJldHVybiBFbGVtZW50cy5tZXJnZUNoaWxkcmVuKHRhcmdldCwgLi4ub3RoZXJzKTtcbiAgfVxuXG4gIGdldENvbXBvbmVudFRlbXBsYXRlKG5hbWVPcklEKSB7XG4gICAgaWYgKG5hbWVPcklEIGluc3RhbmNlb2YgTm9kZSlcbiAgICAgIHJldHVybiBuYW1lT3JJRDtcblxuICAgIGlmICghdGhpcy5vd25lckRvY3VtZW50KVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKG5hbWVPcklEKVxuICAgICAgcmV0dXJuIEVsZW1lbnRzLnF1ZXJ5VGVtcGxhdGUodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50LCBuYW1lT3JJRCk7XG5cbiAgICBpZiAodGhpcy50ZW1wbGF0ZUlEKVxuICAgICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnRlbXBsYXRlSUQpO1xuXG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKGB0ZW1wbGF0ZVtkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZT1cIiR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfVwiIGldLHRlbXBsYXRlW2RhdGEtZm9yPVwiJHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9XCIgaV1gKTtcbiAgfVxuXG4gIGFwcGVuZEV4dGVybmFsVG9TaGFkb3dET00oKSB7XG4gICAgaWYgKCF0aGlzLnNoYWRvdylcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBvd25lckRvY3VtZW50ID0gKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCk7XG4gICAgbGV0IGVsZW1lbnRzICAgICAgPSBvd25lckRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYXV0by1tZXJnZV0nKTtcblxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgQXJyYXkuZnJvbShlbGVtZW50cykpIHtcbiAgICAgIGxldCBzZWxlY3RvciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWF1dG8tbWVyZ2UnKTtcbiAgICAgIGlmIChCYXNlVXRpbHMuaXNOT0Uoc2VsZWN0b3IpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKCF0aGlzLm1hdGNoZXMoc2VsZWN0b3IpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQoZWxlbWVudC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGdldFByb2Nlc3NlZFRlbXBsYXRlKF90ZW1wbGF0ZSkge1xuICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMuZ2V0Q29tcG9uZW50VGVtcGxhdGUoX3RlbXBsYXRlKSB8fCB0aGlzLnRlbXBsYXRlO1xuICAgIGlmICghdGVtcGxhdGUpXG4gICAgICByZXR1cm47XG5cbiAgICByZXR1cm4gdGhpcy5wcm9jZXNzRWxlbWVudHMoKHRlbXBsYXRlLmNvbnRlbnQpID8gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgOiB0ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG5cbiAgZ2V0UmF3VGVtcGxhdGUoX3RlbXBsYXRlKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5nZXRDb21wb25lbnRUZW1wbGF0ZShfdGVtcGxhdGUpIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybjtcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfVxuXG4gIGFwcGVuZFRlbXBsYXRlVG8odGFyZ2V0LCBfdGVtcGxhdGUpIHtcbiAgICBpZiAoIXRhcmdldClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBwcm9jZXNzZWRUZW1wbGF0ZSA9IHRoaXMuZ2V0UHJvY2Vzc2VkVGVtcGxhdGUoX3RlbXBsYXRlKTtcbiAgICBpZiAocHJvY2Vzc2VkVGVtcGxhdGUpIHtcbiAgICAgIC8vIGVuc3VyZURvY3VtZW50U3R5bGVzLmNhbGwodGhpcywgdGhpcy5vd25lckRvY3VtZW50LCB0aGlzLnNlbnNpdGl2ZVRhZ05hbWUsIHRlbXBsYXRlKTtcblxuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHByb2Nlc3NlZFRlbXBsYXRlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFwcGVuZFRlbXBsYXRlVG9TaGFkb3dET00oX3RlbXBsYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kVGVtcGxhdGVUbyh0aGlzLnNoYWRvdywgX3RlbXBsYXRlKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZScsIHRoaXMuc2Vuc2l0aXZlVGFnTmFtZSk7XG5cbiAgICB0aGlzLmFwcGVuZFRlbXBsYXRlVG9TaGFkb3dET00oKTtcblxuICAgIHRoaXMucHJvY2Vzc0VsZW1lbnRzKHRoaXMpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGRlYnVnTG9nKGBDYWxsaW5nIG1vdW50ZWQoKSBmb3IgPCR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfT5gKTtcbiAgICAgIHRoaXMubW91bnRlZCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsZXQgY29udGV4dCA9IGZvcm1hdENvbXBvbmVudENvbnRleHQodGhpcywgJ21vdW50ZWQnKTtcbiAgICAgIGxldCBjb21wb25lbnRFcnJvciA9IG5ldyBDb21wb25lbnRFcnJvcihcbiAgICAgICAgYEVycm9yIGluIG1vdW50ZWQoKSBjYWxsYmFjazogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5jb250ZXh0LFxuICAgICAgICAgIG9yaWdpbmFsRXJyb3I6IGVycm9yLFxuICAgICAgICAgIHN1Z2dlc3Rpb246ICAgICdDaGVjayB0aGUgbW91bnRlZCgpIG1ldGhvZCBpbXBsZW1lbnRhdGlvbiBmb3IgZXJyb3JzLicsXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgY29uc29sZS5lcnJvcihjb21wb25lbnRFcnJvci50b1N0cmluZygpKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ09yaWdpbmFsIGVycm9yOicsIGVycm9yKTtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGVuZEV4dGVybmFsVG9TaGFkb3dET00oKTtcblxuICAgIHRoaXMuZG9jdW1lbnRJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBCYXNlVXRpbHMubmV4dFRpY2soKCkgPT4ge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdteXRoaXgtcmVhZHknKTtcbiAgICB9KTtcbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRyeSB7XG4gICAgICBkZWJ1Z0xvZyhgQ2FsbGluZyB1bm1vdW50ZWQoKSBmb3IgPCR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfT5gKTtcbiAgICAgIHRoaXMudW5tb3VudGVkKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gZm9ybWF0Q29tcG9uZW50Q29udGV4dCh0aGlzLCAndW5tb3VudGVkJyk7XG4gICAgICBsZXQgY29tcG9uZW50RXJyb3IgPSBuZXcgQ29tcG9uZW50RXJyb3IoXG4gICAgICAgIGBFcnJvciBpbiB1bm1vdW50ZWQoKSBjYWxsYmFjazogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5jb250ZXh0LFxuICAgICAgICAgIG9yaWdpbmFsRXJyb3I6IGVycm9yLFxuICAgICAgICAgIHN1Z2dlc3Rpb246ICAgICdDaGVjayB0aGUgdW5tb3VudGVkKCkgbWV0aG9kIGltcGxlbWVudGF0aW9uIGZvciBlcnJvcnMuJyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmVycm9yKGNvbXBvbmVudEVycm9yLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc29sZS5lcnJvcignT3JpZ2luYWwgZXJyb3I6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGF3YWl0RmV0Y2hTcmNPblZpc2libGUobmV3U3JjKSB7XG4gICAgaWYgKHRoaXMudmlzaWJpbGl0eU9ic2VydmVyKSB7XG4gICAgICB0aGlzLnZpc2liaWxpdHlPYnNlcnZlci51bm9ic2VydmUodGhpcyk7XG4gICAgICB0aGlzLnZpc2liaWxpdHlPYnNlcnZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCFuZXdTcmMpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgb2JzZXJ2ZXIgPSBDb21wb25lbnRVdGlscy52aXNpYmlsaXR5T2JzZXJ2ZXIoKHsgd2FzVmlzaWJsZSwgZGlzY29ubmVjdCB9KSA9PiB7XG4gICAgICBpZiAoIXdhc1Zpc2libGUpXG4gICAgICAgIHRoaXMuZmV0Y2hTcmModGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbXl0aGl4LXNyYycpKTtcblxuICAgICAgZGlzY29ubmVjdCgpO1xuXG4gICAgICB0aGlzLnZpc2liaWxpdHlPYnNlcnZlciA9IG51bGw7XG4gICAgfSwgeyBlbGVtZW50czogWyB0aGlzIF0gfSk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAndmlzaWJpbGl0eU9ic2VydmVyJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBvYnNlcnZlcixcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soLi4uYXJncykge1xuICAgIGxldCBbXG4gICAgICBhdHRyaWJ1dGVOYW1lLFxuICAgICAgb2xkVmFsdWUsXG4gICAgICBuZXdWYWx1ZSxcbiAgICBdID0gYXJncztcblxuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIC8vIFNlY3VyaXR5OiBlbnN1cmUgdGhpcyBpcyBhY3R1YWxseSBhIGhhbmRsZWQgYXR0cmlidXRlIGNhbGwhXG4gICAgICAvLyBXZSB3b3VsZG4ndCBqdXN0IHdhbnQgdG8gc3RhcnQgc2V0dGluZyBhbnl0aGluZyBvbiB0aGUgaW5zdGFuY2VcbiAgICAgIC8vIHZpYSBhdHRyaWJ1dGVzLi4uIHRoYXQgbWlnaHQgYmUgYmFkLCBpLmU6IDxpbWcgdmFsdWVPZj1cIlwiPlxuXG4gICAgICBsZXQgcHJvcGVydHlOYW1lICAgID0gQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgbGV0IG1hZ2ljTmFtZSAgICAgICA9IGBhdHRyJCR7cHJvcGVydHlOYW1lfWA7XG4gICAgICBsZXQgeyBkZXNjcmlwdG9yIH0gID0gVXRpbHMuZ2V0RGVzY3JpcHRvckZyb21Qcm90b3R5cGVDaGFpbih0aGlzLCBtYWdpY05hbWUpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgLy8gQ2FsbCBzZXR0ZXJcbiAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gWyBuZXdWYWx1ZSwgb2xkVmFsdWUgXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVDaGFuZ2VkKC4uLmFyZ3MpO1xuICB9XG5cbiAgYWRvcHRlZENhbGxiYWNrKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5hZG9wdGVkKC4uLmFyZ3MpO1xuICB9XG5cbiAgbW91bnRlZCgpIHt9XG4gIHVubW91bnRlZCgpIHt9XG4gIGF0dHJpYnV0ZUNoYW5nZWQoKSB7fVxuICBhZG9wdGVkKCkge31cblxuICBnZXQgJCQoKSB7XG4gICAgcmV0dXJuIFV0aWxzLmNyZWF0ZVNjb3BlKHRoaXMpO1xuICB9XG5cbiAgc2VsZWN0KC4uLmFyZ3MpIHtcbiAgICBsZXQgYXJnSW5kZXggICAgPSAwO1xuICAgIGxldCBvcHRpb25zICAgICA9IChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdChhcmdzW2FyZ0luZGV4XSkpID8gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBhcmdzW2FyZ0luZGV4KytdKSA6IHt9O1xuICAgIGxldCBxdWVyeUVuZ2luZSA9IFF1ZXJ5RW5naW5lLmZyb20uY2FsbCh0aGlzLCB7IHJvb3Q6IHRoaXMsIC4uLm9wdGlvbnMsIGludm9rZUNhbGxiYWNrczogZmFsc2UgfSwgLi4uYXJncy5zbGljZShhcmdJbmRleCkpO1xuICAgIGxldCBzaGFkb3dOb2RlcztcblxuICAgIG9wdGlvbnMgPSBxdWVyeUVuZ2luZS5nZXRPcHRpb25zKCk7XG5cbiAgICBpZiAob3B0aW9ucy5zaGFkb3cgIT09IGZhbHNlICYmIG9wdGlvbnMuc2VsZWN0b3IgJiYgb3B0aW9ucy5yb290ID09PSB0aGlzKSB7XG4gICAgICBzaGFkb3dOb2RlcyA9IEFycmF5LmZyb20oXG4gICAgICAgIFF1ZXJ5RW5naW5lLmZyb20uY2FsbChcbiAgICAgICAgICB0aGlzLFxuICAgICAgICAgIHsgcm9vdDogdGhpcy5zaGFkb3cgfSxcbiAgICAgICAgICBvcHRpb25zLnNlbGVjdG9yLFxuICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2ssXG4gICAgICAgICkudmFsdWVzKCksXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzaGFkb3dOb2RlcylcbiAgICAgIHF1ZXJ5RW5naW5lID0gcXVlcnlFbmdpbmUuYWRkKHNoYWRvd05vZGVzKTtcblxuICAgIGlmIChvcHRpb25zLnNsb3R0ZWQgIT09IHRydWUpXG4gICAgICBxdWVyeUVuZ2luZSA9IHF1ZXJ5RW5naW5lLnNsb3R0ZWQoZmFsc2UpO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KHF1ZXJ5RW5naW5lLm1hcChvcHRpb25zLmNhbGxiYWNrKSk7XG5cbiAgICByZXR1cm4gcXVlcnlFbmdpbmU7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBUaGlzIG1ldGhvZCB3aWxsIGR5bmFtaWNhbGx5IGJ1aWxkIGVsZW1lbnRzLCBvciByYXRoZXIsIEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcywgdGhhdFxuICAgKiAgIGRlZmluZSBlbGVtZW50cyB0byBiZSBjcmVhdGVkIGxhdGVyLiBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMgYXJlIGp1c3QgdGhhdCwgYSBzaW1wbGVcbiAgICogICBzdHJ1Y3R1cmUgdGhhdCBkZWZpbmVzIHRoZSBuYW1lLCBhdHRyaWJ1dGVzLCBhbmQgY2hpbGRyZW4gb2YgYW55IGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqICAgV2hlbiB0aGVzZSBhcmUgaW5zZXJ0ZWQgaW50byBhIGRvY3VtZW50LCBlaXRoZXIgdGhyb3VnaCBhIEBzZWUgUXVlcnlFbmdpbmU7LCBvciBkaXJlY3RseSBieVxuICAgKiAgIGNhbGxpbmcgQHNlZSBFbGVtZW50RGVmaW5pdGlvbi5idWlsZDsgYmVmb3JlIGluc2VydCwgdGhleSBhcmUgb25seSBhdCB0aGlzIHBvaW50IGNvbnZlcnRlZFxuICAgKiAgIGludG8gcmVhbCBbRWxlbWVudHNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50KSBhbmQgaW5zZXJ0ZWRcbiAgICogICBpbnRvIHRoZSBzcGVjaWZpZWQgRE9NIChkb2N1bWVudCkgYXQgdGhlIHNwZWNpZmllZCBsb2NhdGlvbi5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogY2FsbGJhY2tcbiAgICogICAgIGRhdGFUeXBlczogZnVuY3Rpb25cbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgQSBjYWxsYmFjayB0aGF0IGlzIGltbWVkaWF0ZWx5IGNhbGxlZCBhbmQgZXhwZWN0ZWQgdG8gcmV0dXJuIEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcy5cbiAgICogICAgICAgVGhlIGNhbGxiYWNrIGlzIGNhbGxlZCB3aXRoIG9ubHkgdHdvIGFyZ3VtZW50cy4gVGhlIGZpcnN0IGFyZ3VtZW50cywgYGVsZW1lbnRzYCwgaXMgYVxuICAgKiAgICAgICBAc2VlIEVsZW1lbnRHZW5lcmF0b3I7IFByb3h5IGluc3RhbmNlLCB0aGF0IHdpbGwgcHJvcGVybHkgZ2VuZXJhdGUgYW55IGVsZW1lbnQgZGVmaW5pdGlvbiByZXF1ZXN0ZWQuXG4gICAqICAgICAgIFRoZSBzZWNvbmQgYXJndW1lbnQsIGBjb250ZXh0YCwgaXMgc2ltcGx5IGFuIGVtcHR5IG9iamVjdCBwcm92aWRlZCB0byB0aGUgY2FsbGJhY2ssIGFsbG93aW5nIHRoZVxuICAgKiAgICAgICBkZXZlbG9wZXIgdG8gc3RvcmUgY29udGV4dHVhbCBiYXNlZCBpbmZvcm1hdGlvbiBmb3IgdGhlIG9wZXJhdGlvbiwgaWYgZGVzaXJlZC5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgKiBAdHlwZXMgRWxlbWVudERlZmluaXRpb247IEEgc2luZ2xlIEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlIGRlZmluaW5nXG4gICAqICAgICB0aGUgRE9NIHRvIGdlbmVyYXRlIHdoZW4gaW5zZXJ0ZWQuIENhbiBiZSBhIGAjZnJhZ21lbnRgIGVsZW1lbnQgZGVmaW5pdGlvbi5cbiAgICogICAqIEB0eXBlcyBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj47IEFuIGFycmF5IG9mIGVsZW1lbnQgZGVmaW5pdGlvbiBpbnN0YW5jZXNcbiAgICogICAgIGRlZmluaW5nIHRoZSBET00gdG8gZ2VuZXJhdGUgd2hlbiBpbnNlcnRlZC5cbiAgICogICAqIEB0eXBlcyBudWxsOyBJZiBub3RoaW5nIGlzIHJldHVybmVkLCB0aGVuIG5vIGVsZW1lbnRzIHdpbGwgYmUgY3JlYXRlZC5cbiAgICogbm90ZXM6XG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogVGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGlzIG1ldGhvZCBhbmQgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC4kYnVpbGQ7IG1ldGhvZCBpc1xuICAgKiAgICAgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMsIHdoZXJlYXMgdGhlXG4gICAqICAgICBAc2VlIE15dGhpeFVJQ29tcG9uZW50LiRidWlsZDsgbWV0aG9kIHdpbGwgcmV0dXJuIGEgQHNlZSBRdWVyeUVuZ2luZTsgaW5zdGFuY2UgY29udGFpbmluZ1xuICAgKiAgICAgYWxsIHRoZSBidWlsdCBAc2VlIEVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgYGBgamF2YXNjcmlwdFxuICAgKiAgICAgaW1wb3J0IHtcbiAgICogICAgICAgTXl0aGl4VUlDb21wb25lbnQsXG4gICAqICAgICAgIFV0aWxzLFxuICAgKiAgICAgfSBmcm9tICdAY2RuL215dGhpeC11aS1jb3JlQDEnOyAvLyBlbnN1cmUgd2UgbG9jayB0aGlzIHRvIHdoYXRldmVyIHZlcnNpb24gaXMgaW1wb3J0YW50IHRvIHVzXG4gICAqXG4gICAqICAgICBleHBvcnQgY2xhc3MgRGVtb05hdkNvbXBvbmVudCBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgICogICAgICAgc3RhdGljIHRhZ05hbWUgPSAnZGVtby1uYXYtY29tcG9uZW50JzsgLy8gYSBcInNvbWV0aGluZy1cIiBwcmVmaXggaXMgcmVxdWlyZWRcbiAgICpcbiAgICogICAgICAgbW91bnRlZCgpIHsgLy8gY2FsbGVkIHdoZW5ldmVyIHRoZSBjb21wb25lbnQgaXMgYWRkZWQgdG8gYW5vdGhlciBlbGVtZW50XG4gICAqICAgICAgICAgbGV0IGxpc3QgPSBbXG4gICAqICAgICAgICAgICAnVGVzdCAxJyxcbiAgICogICAgICAgICAgICdUZXN0IDInLFxuICAgKiAgICAgICAgICAgJ0xvcmVtIElwc3VtJyxcbiAgICogICAgICAgICBdO1xuICAgKlxuICAgKiAgICAgICAgIC8vIER5bmFtaWNhbGx5IGJ1aWxkIGFuZCBhcHBlbmQgc29tZSBlbGVtZW50cyAod2l0aCBhdHRyaWJ1dGVzIGFuZCBldmVudCBiaW5kaW5ncylcbiAgICogICAgICAgICBsZXQgdW5vcmRlcmVkTGlzdEVsZW1lbnQgPSB0aGlzLmJ1aWxkKCh7IE5BViwgVUwsIExJLCAkVEVYVCB9KSA9PiB7IC8vIGFueSBlbGVtZW50IG5hbWUgY2FuIGJlIHJlcXVlc3RlZCBoZXJlIChldmVuIGN1c3RvbSBvbmVzKVxuICAgKiAgICAgICAgICAgcmV0dXJuIFVMLmlkKCdwcmltYXJ5LWxpc3QnKS5jbGFzcygnaW50ZXJhY3RpdmUtbGlzdCcpKFxuICAgKiAgICAgICAgICAgICAvLyAuLi5jaGlsZHJlbiBvZiBVTCBlbGVtZW50XG4gICAqICAgICAgICAgICAgIC4uLmxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgKiAgICAgICAgICAgICAgIHJldHVybiBMSS5jbGFzcygnaXRlbS1uYW1lIGZvY3VzYWJsZScpLmRhdGFJbmRleChpbmRleCkub25DbGljayh0aGlzLm9uSXRlbUNsaWNrKShcbiAgICogICAgICAgICAgICAgICAgIC8vIC4uLmNoaWxkcmVuIG9mIExJIGVsZW1lbnRcbiAgICogICAgICAgICAgICAgICAgICRURVhUKGl0ZW0pLCAgLy8gaW4gdGhpcyBjYXNlLCBhIHNpbmdsZSB0ZXh0IG5vZGVcbiAgICogICAgICAgICAgICAgICApO1xuICAgKiAgICAgICAgICAgICB9KSxcbiAgICogICAgICAgICAgICk7XG4gICAqICAgICAgICAgfSk7XG4gICAqXG4gICAqICAgICAgICAgLy8gQ3JlYXRlIGFuIGFwcGVuZCBlbGVtZW50cyB0byB0aGlzIGVsZW1lbnRcbiAgICogICAgICAgICB0aGlzLmFwcGVuZChcbiAgICogICAgICAgICAgIHVub3JkZXJlZExpc3RFbGVtZW50LmJ1aWxkKFxuICAgKiAgICAgICAgICAgICB0aGlzLm93bmVyRG9jdW1lbnQsXG4gICAqICAgICAgICAgICAgIHsgc2NvcGU6IFV0aWxzLmNyZWF0ZVNjb3BlKHRoaXMpIH0sXG4gICAqICAgICAgICAgICApLFxuICAgKiAgICAgICAgICk7XG4gICAqICAgICAgIH1cbiAgICpcbiAgICogICAgICAgLy8gQWxsIGNsYXNzIG1ldGhvZHMgYXJlIGF1dG9tYXRpY2FsbHkgYm91bmQgdG8gXCJ0aGlzXCIgaW5zaWRlIHRoZSBzdXBlci5jb25zdHJ1Y3RvclxuICAgKiAgICAgICBvbkl0ZW1DbGljayhldmVudCkge1xuICAgKiAgICAgICAgIGNvbnNvbGUubG9nKCdJdGVtIENsaWNrZWQhJywgZXZlbnQudGFyZ2V0KTtcbiAgICogICAgICAgfVxuICAgKiAgICAgfVxuICAgKlxuICAgKiAgICAgRGVtb05hdkNvbXBvbmVudC5yZWdpc3RlcigpO1xuICAgKiAgICAgYGBgXG4gICAqL1xuICBidWlsZChjYWxsYmFjaykge1xuICAgIGxldCByZXN1bHQgPSBbIGNhbGxiYWNrLmNhbGwodGhpcywgRWxlbWVudHMuRWxlbWVudEdlbmVyYXRvciwge30pIF0uZmxhdChJbmZpbml0eSkubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbSAmJiBpdGVtW1VORklOSVNIRURfREVGSU5JVElPTl0pXG4gICAgICAgIHJldHVybiBpdGVtKCk7XG5cbiAgICAgIHJldHVybiBpdGVtO1xuICAgIH0pLmZpbHRlcihCb29sZWFuKTtcblxuICAgIHJldHVybiAocmVzdWx0Lmxlbmd0aCA8IDIpID8gcmVzdWx0WzBdIDogbmV3IEVsZW1lbnRzLkVsZW1lbnREZWZpbml0aW9uKCcjZnJhZ21lbnQnLCB7fSwgcmVzdWx0KTtcbiAgfVxuXG4gICRidWlsZChjYWxsYmFjaykge1xuICAgIHJldHVybiBRdWVyeUVuZ2luZS5mcm9tLmNhbGwodGhpcywgWyB0aGlzLmJ1aWxkKGNhbGxiYWNrKSBdLmZsYXQoSW5maW5pdHkpKTtcbiAgfVxuXG4gIGlzQXR0cmlidXRlVHJ1dGh5KG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKG5hbWUpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gICAgaWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gJ3RydWUnKVxuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRJZGVudGlmaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWQnKSB8fCB0aGlzLmdldEF0dHJpYnV0ZSgnbmFtZScpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnKSB8fCBCYXNlVXRpbHMudG9DYW1lbENhc2UodGhpcy5zZW5zaXRpdmVUYWdOYW1lKTtcbiAgfVxuXG4gIG1ldGFkYXRhKGtleSwgdmFsdWUpIHtcbiAgICByZXR1cm4gVXRpbHMubWV0YWRhdGEodGhpcywga2V5LCB2YWx1ZSk7XG4gIH1cblxuICBkZWZpbmVEeW5hbWljUHJvcChuYW1lLCBkZWZhdWx0VmFsdWUsIHNldHRlciwgX2NvbnRleHQpIHtcbiAgICByZXR1cm4gVXRpbHMuZGVmaW5lRHluYW1pY1Byb3AuY2FsbChfY29udGV4dCB8fCB0aGlzLCBuYW1lLCBkZWZhdWx0VmFsdWUsIHNldHRlcik7XG4gIH1cblxuICBkeW5hbWljRGF0YShvYmopIHtcbiAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgbGV0IGRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQga2V5ICAgPSBrZXlzW2ldO1xuICAgICAgbGV0IHZhbHVlID0gb2JqW2tleV07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgVXRpbHMuZGVmaW5lRHluYW1pY1Byb3AuY2FsbChkYXRhLCBrZXksIHZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIEEgc2VsZi1yZXNldHRpbmcgdGltZW91dC4gVGhpcyBtZXRob2QgZXhwZWN0cyBhbiBgaWRgIGFyZ3VtZW50IChvciB3aWxsIGdlbmVyYXRlIG9uZSBmcm9tIHRoZSBwcm92aWRlZFxuICAgKiAgIGNhbGxiYWNrIG1ldGhvZCBpZiBub3QgcHJvdmlkZWQpLiBJdCB1c2VzIHRoaXMgcHJvdmlkZWQgYGlkYCB0byBjcmVhdGUgYSB0aW1lb3V0LiBUaGlzIHRpbWVvdXQgaGFzIGEgc3BlY2lhbCBmZWF0dXJlXG4gICAqICAgaG93ZXZlciB0aGF0IGRpZmZlcmVudGlhdGVzIGl0IGZyb20gYSBub3JtYWwgYHNldFRpbWVvdXRgIGNhbGw6IGlmIHlvdSBjYWxsIGB0aGlzLmRlYm91bmNlYCBhZ2FpbiB3aXRoIHRoZVxuICAgKiAgIHNhbWUgYGlkYCAqKmJlZm9yZSoqIHRoZSB0aW1lIHJ1bnMgb3V0LCB0aGVuIGl0IHdpbGwgYXV0b21hdGljYWxseSByZXNldCB0aGUgdGltZXIuIEluIHNob3J0LCBvbmx5IHRoZSBsYXN0IGNhbGxcbiAgICogICB0byBgdGhpcy5kZWJvdW5jZWAgKGdpdmVuIHRoZSBzYW1lIGlkKSB3aWxsIHRha2UgZWZmZWN0ICh1bmxlc3MgdGhlIHNwZWNpZmllZCB0aW1lb3V0IGlzIHJlYWNoZWQgYmV0d2VlbiBjYWxscykuXG4gICAqIHJldHVybjogfFxuICAgKiAgIFRoaXMgbWV0aG9kIHJldHVybnMgYSBzcGVjaWFsaXplZCBQcm9taXNlIGluc3RhbmNlLiBUaGUgaW5zdGFuY2UgaXMgc3BlY2lhbGl6ZWQgYmVjYXVzZSB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXNcbiAgICogICBhcmUgaW5qZWN0ZWQgaW50byBpdDpcbiAgICogICAxLiBgcmVzb2x2ZShyZXN1bHRWYWx1ZSlgIC0gV2hlbiBjYWxsZWQsIHJlc29sdmVzIHRoZSBwcm9taXNlIHdpdGggdGhlIGZpcnN0IHByb3ZpZGVkIGFyZ3VtZW50XG4gICAqICAgMi4gYHJlamVjdChlcnJvclZhbHVlKWAgLSBXaGVuIGNhbGxlZCwgcmVqZWN0cyB0aGUgcHJvbWlzZSB3aXRoIHRoZSBmaXJzdCBwcm92aWRlZCBhcmd1bWVudFxuICAgKiAgIDMuIGBzdGF0dXMoKWAgLSBXaGVuIGNhbGxlZCwgd2lsbCByZXR1cm4gdGhlIGZ1bGZpbGxtZW50IHN0YXR1cyBvZiB0aGUgcHJvbWlzZSwgYXMgYSBgc3RyaW5nYCwgb25lIG9mOiBgXCJwZW5kaW5nXCIsIFwiZnVsZmlsbGVkXCJgLCBvciBgXCJyZWplY3RlZFwiYFxuICAgKiAgIDQuIGBpZDxzdHJpbmc+YCAtIEEgcmFuZG9tbHkgZ2VuZXJhdGVkIElEIGZvciB0aGlzIHByb21pc2VcbiAgICpcbiAgICogICBTZWUgQHNlZSBCYXNlVXRpbHMuY3JlYXRlUmVzb2x2YWJsZTtcbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogY2FsbGJhY2tcbiAgICogICAgIGRhdGFUeXBlczogZnVuY3Rpb25cbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gdGhlIHRpbWVvdXQgaGFzIGJlZW4gbWV0LlxuICAgKiAgIC0gbmFtZTogdGltZU1TXG4gICAqICAgICBkYXRhVHlwZXM6IG51bWJlclxuICAgKiAgICAgb3B0aW9uYWw6IHRydWVcbiAgICogICAgIGRlZmF1bHQ6IDBcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgY2FsbGluZyBgY2FsbGJhY2tgLlxuICAgKiAgIC0gbmFtZTogaWRcbiAgICogICAgIGRhdGFUeXBlczogc3RyaW5nXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVmYXVsdDogXCJudWxsXCJcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIGlkZW50aWZpZXIgZm9yIHRoaXMgZGVib3VuY2UgdGltZXIuIElmIG5vdCBwcm92aWRlZCwgdGhlbiBvbmVcbiAgICogICAgICAgd2lsbCBiZSBnZW5lcmF0ZWQgZm9yIHlvdSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgY2FsbGJhY2suXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gVGhvdWdoIG5vdCByZXF1aXJlZCwgaXQgaXMgZmFzdGVyIGFuZCBsZXNzIHByb2JsZW1hdGljIHRvIHByb3ZpZGUgeW91ciBvd24gYGlkYCBhcmd1bWVudFxuICAgKi9cbiAgZGVib3VuY2UoY2FsbGJhY2ssIHRpbWVNUywgX2lkKSB7XG4gICAgdmFyIGlkID0gX2lkO1xuXG4gICAgLy8gSWYgd2UgZG9uJ3QgZ2V0IGFuIGlkIGZyb20gdGhlIHVzZXIsIHRoZW4gZ3Vlc3MgdGhlIGlkIGJ5IHR1cm5pbmcgdGhlIGZ1bmN0aW9uXG4gICAgLy8gaW50byBhIHN0cmluZyAocmF3IHNvdXJjZSkgYW5kIHVzZSB0aGF0IGZvciBhbiBpZCBpbnN0ZWFkXG4gICAgaWYgKGlkID09IG51bGwpIHtcbiAgICAgIGlkID0gKCcnICsgY2FsbGJhY2spO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdHJhbnNwaWxlZCBjb2RlLCB0aGVuIGFuIGFzeW5jIGdlbmVyYXRvciB3aWxsIGJlIHVzZWQgZm9yIGFzeW5jIGZ1bmN0aW9uc1xuICAgICAgLy8gVGhpcyB3cmFwcyB0aGUgcmVhbCBmdW5jdGlvbiwgYW5kIHNvIHdoZW4gY29udmVydGluZyB0aGUgZnVuY3Rpb24gaW50byBhIHN0cmluZ1xuICAgICAgLy8gaXQgd2lsbCBOT1QgYmUgdW5pcXVlIHBlciBjYWxsLXNpdGUuIEZvciB0aGlzIHJlYXNvbiwgaWYgd2UgZGV0ZWN0IHRoaXMgaXNzdWUsXG4gICAgICAvLyB3ZSB3aWxsIGdvIHRoZSBcInNsb3dcIiByb3V0ZSBhbmQgY3JlYXRlIGEgc3RhY2sgdHJhY2UsIGFuZCB1c2UgdGhhdCBmb3IgdGhlIHVuaXF1ZSBpZFxuICAgICAgaWYgKGlkLm1hdGNoKC9hc3luY0dlbmVyYXRvclN0ZXAvKSkge1xuICAgICAgICBpZCA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gICAgICAgIGNvbnNvbGUud2FybignbXl0aGl4LXVpIHdhcm5pbmc6IFwidGhpcy5kZWxheVwiIGNhbGxlZCB3aXRob3V0IGEgc3BlY2lmaWVkIFwiaWRcIiBwYXJhbWV0ZXIuIFRoaXMgd2lsbCByZXN1bHQgaW4gYSBwZXJmb3JtYW5jZSBoaXQuIFBsZWFzZSBzcGVjaWZ5IGFuZCBcImlkXCIgYXJndW1lbnQgZm9yIHlvdXIgY2FsbDogXCJ0aGlzLmRlbGF5KGNhbGxiYWNrLCBtcywgXFwnc29tZS1jdXN0b20tY2FsbC1zaXRlLWlkXFwnKVwiJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkID0gKCcnICsgaWQpO1xuICAgIH1cblxuICAgIGxldCBwcm9taXNlID0gdGhpcy5kZWxheVRpbWVycy5nZXQoaWQpO1xuICAgIGlmIChwcm9taXNlKSB7XG4gICAgICBpZiAocHJvbWlzZS50aW1lcklEKVxuICAgICAgICBjbGVhclRpbWVvdXQocHJvbWlzZS50aW1lcklEKTtcblxuICAgICAgcHJvbWlzZS5yZWplY3QoJ2NhbmNlbGxlZCcpO1xuICAgIH1cblxuICAgIHByb21pc2UgPSBCYXNlVXRpbHMuY3JlYXRlUmVzb2x2YWJsZSgpO1xuICAgIHRoaXMuZGVsYXlUaW1lcnMuc2V0KGlkLCBwcm9taXNlKTtcblxuICAgIC8vIExldCdzIG5vdCBjb21wbGFpbiBhYm91dFxuICAgIC8vIHVuY2F1Z2h0IGVycm9yc1xuICAgIHByb21pc2UuY2F0Y2goKCkgPT4ge30pO1xuXG4gICAgcHJvbWlzZS50aW1lcklEID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2FsbGJhY2soKTtcbiAgICAgICAgcHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBlbmNvdW50ZXJlZCB3aGlsZSBjYWxsaW5nIFwiZGVsYXlcIiBjYWxsYmFjazogJywgZXJyb3IsIGNhbGxiYWNrLnRvU3RyaW5nKCkpO1xuICAgICAgICBwcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgfSwgdGltZU1TIHx8IDApO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBjbGVhckRlYm91bmNlKGlkKSB7XG4gICAgbGV0IHByb21pc2UgPSB0aGlzLmRlbGF5VGltZXJzLmdldChpZCk7XG4gICAgaWYgKCFwcm9taXNlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHByb21pc2UudGltZXJJRClcbiAgICAgIGNsZWFyVGltZW91dChwcm9taXNlLnRpbWVySUQpO1xuXG4gICAgcHJvbWlzZS5yZWplY3QoJ2NhbmNlbGxlZCcpO1xuXG4gICAgdGhpcy5kZWxheVRpbWVycy5kZWxldGUoaWQpO1xuICB9XG5cbiAgY2xhc3NlcyguLi5fYXJncykge1xuICAgIGxldCBhcmdzID0gX2FyZ3MuZmxhdChJbmZpbml0eSkubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShpdGVtLCAnOjpTdHJpbmcnKSlcbiAgICAgICAgcmV0dXJuIGl0ZW0udHJpbSgpO1xuXG4gICAgICBpZiAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoaXRlbSkpIHtcbiAgICAgICAgbGV0IGtleXMgID0gT2JqZWN0LmtleXMoaXRlbSk7XG4gICAgICAgIGxldCBpdGVtcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGtleXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGxldCBrZXkgICA9IGtleXNbaV07XG4gICAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtrZXldO1xuICAgICAgICAgIGlmICghdmFsdWUpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgIGl0ZW1zLnB1c2goa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSkuZmxhdChJbmZpbml0eSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhcmdzKSkuam9pbignICcpO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hTcmMoc3JjVVJMKSB7XG4gICAgaWYgKCFzcmNVUkwpXG4gICAgICByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgQ29tcG9uZW50VXRpbHMubG9hZFBhcnRpYWxJbnRvRWxlbWVudC5jYWxsKHRoaXMsIHNyY1VSTCk7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ215dGhpeC1yZWFkeScpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcIiR7dGhpcy5zZW5zaXRpdmVUYWdOYW1lfVwiOiBGYWlsZWQgdG8gbG9hZCBzcGVjaWZpZWQgcmVzb3VyY2U6ICR7c3JjVVJMfSAocmVzb2x2ZWQgdG86ICR7ZXJyb3IudXJsfSlgLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzICovXG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgQ29tcG9uZW50VXRpbHMgZnJvbSAnLi9jb21wb25lbnQtdXRpbHMuanMnO1xuXG5pbXBvcnQge1xuICBNeXRoaXhVSUNvbXBvbmVudCxcbn0gZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJRHluYW1pY1N0eWxlIGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9ICdteXRoaXgtZHluYW1pYy1zdHlsZSc7XG5cbiAgc2V0IGF0dHIkZGF0YUVuYWJsZWQoWyBuZXdWYWx1ZSBdKSB7XG4gICAgdGhpcy5oYW5kbGVEYXRhRW5hYmxlZEF0dHJpYnV0ZUNoYW5nZShuZXdWYWx1ZSk7XG4gIH1cblxuICBjcmVhdGVTdHlsZU5vZGUoKSB7XG4gICAgbGV0IG93bmVyRG9jdW1lbnQgICA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICBsZXQgaW5pdGlhbENvbnRlbnQgID0gdGhpcy50ZXh0Q29udGVudC50cmltKCk7XG4gICAgbGV0IGhyZWYgICAgICAgICAgICA9IHRoaXMuYXR0cignaHJlZicpO1xuICAgIGxldCBzdHlsZU5vZGUgICAgICAgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBpZiAoQmFzZVV0aWxzLmlzTm90Tk9FKGhyZWYpKSB7XG4gICAgICBDb21wb25lbnRVdGlscy5yZXF1aXJlKGhyZWYsIHsgb3duZXJEb2N1bWVudCB9KS50aGVuKFxuICAgICAgICBhc3luYyAoeyByZXNwb25zZSB9KSA9PiB7XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgc3R5bGVOb2RlLmlubmVySFRNTCA9IGNvbnRlbnQ7XG5cbiAgICAgICAgICB0aGlzLmhhbmRsZURhdGFFbmFibGVkQXR0cmlidXRlQ2hhbmdlKHRoaXMuYXR0cignZGF0YS1lbmFibGVkJykpO1xuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBteXRoaXgtZHluYW1pYy1zdHlsZTogRXJyb3Igd2hpbGUgYXR0ZW1wdGluZyB0byBsb2FkIHN0eWxlIFwiJHtocmVmfVwiOiBgLCB0aGlzLCBlcnJvcik7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoQmFzZVV0aWxzLmlzTm90Tk9FKGluaXRpYWxDb250ZW50KSkge1xuICAgICAgaWYgKCgvPHN0eWxlW14+XSo+L2kpLnRlc3QoaW5pdGlhbENvbnRlbnQpKSB7XG4gICAgICAgIGxldCB0ZW1wRGl2ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBpbml0aWFsQ29udGVudDtcblxuICAgICAgICBsZXQgdGVtcE5vZGUgPSB0ZW1wRGl2LnF1ZXJ5U2VsZWN0b3IoJ3N0eWxlJyk7XG4gICAgICAgIGlmICh0ZW1wTm9kZSlcbiAgICAgICAgICBzdHlsZU5vZGUgPSB0ZW1wTm9kZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHN0eWxlTm9kZS5pbm5lckhUTUwgPSBpbml0aWFsQ29udGVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlTm9kZS5pbm5lckhUTUwgPSBpbml0aWFsQ29udGVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3R5bGVOb2RlO1xuICB9XG5cbiAgbW91bnRlZCgpIHtcbiAgICBzdXBlci5tb3VudGVkKCk7XG5cbiAgICB0aGlzLnN0eWxlTm9kZSA9IHRoaXMuY3JlYXRlU3R5bGVOb2RlKCk7XG5cbiAgICB0aGlzLmhhbmRsZURhdGFFbmFibGVkQXR0cmlidXRlQ2hhbmdlKHRoaXMuYXR0cignZGF0YS1lbmFibGVkJykpO1xuICB9XG5cbiAgaGFuZGxlRGF0YUVuYWJsZWRBdHRyaWJ1dGVDaGFuZ2UoZW5hYmxlZCkge1xuICAgIGlmICghdGhpcy5zdHlsZU5vZGUpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAoQmFzZVV0aWxzLmlzTk9FKHRoaXMuc3R5bGVOb2RlLnRleHRDb250ZW50KSlcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBpc0VuYWJsZWQgPSAoL14odHJ1ZSkkL2kpLnRlc3QoZW5hYmxlZCk7XG4gICAgaWYgKGlzRW5hYmxlZClcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5zdHlsZU5vZGUpO1xuICAgIGVsc2UgaWYgKHRoaXMuY29udGFpbnModGhpcy5zdHlsZU5vZGUpKVxuICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnN0eWxlTm9kZSk7XG4gIH1cbn1cblxuTXl0aGl4VUlEeW5hbWljU3R5bGUucmVnaXN0ZXIoKTtcblxuKGdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSkpLk15dGhpeFVJRHluYW1pY1N0eWxlID0gTXl0aGl4VUlEeW5hbWljU3R5bGU7XG4iLCJpbXBvcnQgZGVlcE1lcmdlIGZyb20gJ2RlZXBtZXJnZSc7XG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgQ29tcG9uZW50VXRpbHMgZnJvbSAnLi9jb21wb25lbnQtdXRpbHMuanMnO1xuXG5pbXBvcnQge1xuICBEeW5hbWljUHJvcGVydHksXG59IGZyb20gJy4vZHluYW1pYy1wcm9wZXJ0eS5qcyc7XG5cbmltcG9ydCB7XG4gIE15dGhpeFVJQ29tcG9uZW50LFxufSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuXG4vKipcbiAqIFJUTCAoUmlnaHQtdG8tTGVmdCkgbGFuZ3VhZ2UgY29kZXMuXG4gKiBJbmNsdWRlcyBBcmFiaWMsIEhlYnJldywgUGVyc2lhbi9GYXJzaSwgVXJkdSwgYW5kIHJlbGF0ZWQgbGFuZ3VhZ2VzLlxuICovXG5jb25zdCBSVExfTEFOR1VBR0VTID0gbmV3IFNldChbXG4gICdhcicsICdhcmMnLCAnYXJ6JywgJ2F6LWFyYWInLCAnYnFpJywgJ2NrYicsICdkdicsICdmYScsICdnbGsnLCAnaGUnLFxuICAna3UtYXJhYicsICdtem4nLCAnbnFvJywgJ3BuYicsICdwcycsICdzZCcsICd1ZycsICd1cicsICd5aScsXG5dKTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIGxhbmd1YWdlIGNvZGUgcmVwcmVzZW50cyBhbiBSVEwgbGFuZ3VhZ2UuXG4gKi9cbmNvbnN0IGlzUlRMTGFuZ3VhZ2UgPSAobGFuZykgPT4ge1xuICBpZiAoIWxhbmcpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGxldCBub3JtYWxpemVkTGFuZyA9IGxhbmcudG9Mb3dlckNhc2UoKTtcblxuICAvLyBDaGVjayBleGFjdCBtYXRjaFxuICBpZiAoUlRMX0xBTkdVQUdFUy5oYXMobm9ybWFsaXplZExhbmcpKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIC8vIENoZWNrIGJhc2UgbGFuZ3VhZ2UgKGUuZy4sICdhci1TQScgLT4gJ2FyJylcbiAgbGV0IGJhc2VMYW5nID0gbm9ybWFsaXplZExhbmcuc3BsaXQoJy0nKVswXTtcbiAgcmV0dXJuIFJUTF9MQU5HVUFHRVMuaGFzKGJhc2VMYW5nKTtcbn07XG5cbi8qKlxuICogRGVmYXVsdCBkYXRlIGZvcm1hdCBwcmVzZXRzLlxuICovXG5jb25zdCBEQVRFX0ZPUk1BVF9QUkVTRVRTID0ge1xuICBzaG9ydDogIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ3Nob3J0JywgZGF5OiAnbnVtZXJpYycgfSxcbiAgbG9uZzogICB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIHdlZWtkYXk6ICdsb25nJyB9LFxuICBtZWRpdW06IHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ3Nob3J0JywgZGF5OiAnbnVtZXJpYycsIHdlZWtkYXk6ICdzaG9ydCcgfSxcbiAgdGltZTogICB7IGhvdXI6ICdudW1lcmljJywgbWludXRlOiAnbnVtZXJpYycgfSxcbiAgZnVsbDogICB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICdsb25nJywgZGF5OiAnbnVtZXJpYycsIHdlZWtkYXk6ICdsb25nJywgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJyB9LFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IG51bWJlciBmb3JtYXQgcHJlc2V0cy5cbiAqL1xuY29uc3QgTlVNQkVSX0ZPUk1BVF9QUkVTRVRTID0ge1xuICBkZWNpbWFsOiAgICB7IHN0eWxlOiAnZGVjaW1hbCcgfSxcbiAgcGVyY2VudDogICAgeyBzdHlsZTogJ3BlcmNlbnQnIH0sXG4gIGNvbXBhY3Q6ICAgIHsgbm90YXRpb246ICdjb21wYWN0JyB9LFxuICBzY2llbnRpZmljOiB7IG5vdGF0aW9uOiAnc2NpZW50aWZpYycgfSxcbn07XG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSUxhbmd1YWdlUGFjayBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSAnbXl0aGl4LWxhbmd1YWdlLXBhY2snO1xuXG4gIGNyZWF0ZVNoYWRvd0RPTSgpIHtcbiAgICAvLyBOT09QXG4gIH1cblxuICBnZXRDb21wb25lbnRUZW1wbGF0ZSgpIHtcbiAgICAvLyBOT09QXG4gIH1cblxuICBzZXQgYXR0ciRkYXRhTXl0aGl4U3JjKFsgdmFsdWUgXSkge1xuICAgIC8vIE5PT1AuLi4gVHJhcCB0aGlzIGJlY2F1c2Ugd2VcbiAgICAvLyBkb24ndCB3YW50IHRvIGxvYWQgYSBwYXJ0aWFsIGhlcmVcbiAgfVxuXG4gIG9uTXV0YXRpb25BZGRlZChtdXRhdGlvbikge1xuICAgIC8vIFdoZW4gYWRkZWQgdG8gdGhlIERPTSwgZW5zdXJlIHRoYXQgd2Ugd2VyZVxuICAgIC8vIGFkZGVkIHRvIHRoZSByb290IG9mIGEgbGFuZ3VhZ2UgcHJvdmlkZXIuLi5cbiAgICAvLyBJZiBub3QsIHRoZW4gbW92ZSBvdXJzZWx2ZXMgdG8gdGhlIHJvb3RcbiAgICAvLyBvZiB0aGUgbGFuZ3VhZ2UgcHJvdmlkZXIuXG4gICAgbGV0IHBhcmVudExhbmd1YWdlUHJvdmlkZXIgPSB0aGlzLmNsb3Nlc3QoJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuICAgIGlmIChwYXJlbnRMYW5ndWFnZVByb3ZpZGVyICYmIHBhcmVudExhbmd1YWdlUHJvdmlkZXIgIT09IG11dGF0aW9uLnRhcmdldClcbiAgICAgIEJhc2VVdGlscy5uZXh0VGljaygoKSA9PiBwYXJlbnRMYW5ndWFnZVByb3ZpZGVyLmluc2VydEJlZm9yZSh0aGlzLCBwYXJlbnRMYW5ndWFnZVByb3ZpZGVyLmZpcnN0Q2hpbGQpKTtcbiAgfVxufVxuXG5jb25zdCBJU19KU09OX0VOQ1RZUEUgICAgICAgICAgICAgICAgID0gL15hcHBsaWNhdGlvblxcL2pzb24vaTtcbmNvbnN0IExBTkdVQUdFX1BBQ0tfSU5TRVJUX0dSQUNFX1RJTUUgPSA1MDtcblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJTGFuZ3VhZ2VQcm92aWRlciBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSAnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJztcblxuICAvKipcbiAgICogT2JzZXJ2ZWQgYXR0cmlidXRlcyBmb3IgcmVhY3RpdmUgdXBkYXRlcy5cbiAgICovXG4gIHN0YXRpYyBvYnNlcnZlZEF0dHJpYnV0ZXMgPSBbICdsYW5nJywgJ2ZhbGxiYWNrJywgJ2F1dG8tZGlyJyBdO1xuXG4gIHNldCBhdHRyJGxhbmcoWyBuZXdWYWx1ZSwgb2xkVmFsdWUgXSkge1xuICAgIHRoaXMubG9hZEFsbExhbmd1YWdlUGFja3NGb3JMYW5ndWFnZShuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgIHRoaXMudXBkYXRlVGV4dERpcmVjdGlvbigpO1xuICB9XG5cbiAgc2V0IGF0dHIkZmFsbGJhY2soWyBfbmV3VmFsdWUsIF9vbGRWYWx1ZSBdKSB7XG4gICAgLy8gRmFsbGJhY2sgY2hhaW4gY2hhbmdlZCwgcmVsb2FkIGxhbmd1YWdlIHBhY2tzXG4gICAgdGhpcy5sb2FkQWxsTGFuZ3VhZ2VQYWNrc0Zvckxhbmd1YWdlKHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpKTtcbiAgfVxuXG4gIHNldCBhdHRyJGF1dG9EaXIoWyBuZXdWYWx1ZSBdKSB7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBudWxsKVxuICAgICAgdGhpcy51cGRhdGVUZXh0RGlyZWN0aW9uKCk7XG4gIH1cblxuICBvbk11dGF0aW9uQ2hpbGRBZGRlZChub2RlKSB7XG4gICAgaWYgKG5vZGUubG9jYWxOYW1lID09PSAnbXl0aGl4LWxhbmd1YWdlLXBhY2snKSB7XG4gICAgICB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgLy8gUmVsb2FkIGxhbmd1YWdlIHBhY2tzIGFmdGVyIGFkZGl0aW9uc1xuICAgICAgICB0aGlzLmxvYWRBbGxMYW5ndWFnZVBhY2tzRm9yTGFuZ3VhZ2UodGhpcy5nZXRDdXJyZW50TG9jYWxlKCkpO1xuICAgICAgfSwgTEFOR1VBR0VfUEFDS19JTlNFUlRfR1JBQ0VfVElNRSwgJ3JlbG9hZExhbmd1YWdlUGFja3MnKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgJ3Rlcm1zJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgfSxcbiAgICAgICdfcGx1cmFsUnVsZXMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG51bGwsXG4gICAgICB9LFxuICAgICAgJ19kYXRlRm9ybWF0dGVycyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbmV3IE1hcCgpLFxuICAgICAgfSxcbiAgICAgICdfbnVtYmVyRm9ybWF0dGVycyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbmV3IE1hcCgpLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZhbGxiYWNrIGxhbmd1YWdlIGNoYWluIGFzIGFuIGFycmF5LlxuICAgKiBSZXR1cm5zIFtjdXJyZW50TGFuZywgLi4uZmFsbGJhY2tzXSBpbiBvcmRlciBvZiBwcmVmZXJlbmNlLlxuICAgKi9cbiAgZ2V0RmFsbGJhY2tDaGFpbigpIHtcbiAgICBsZXQgY3VycmVudExhbmcgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKTtcbiAgICBsZXQgZmFsbGJhY2sgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZmFsbGJhY2snKSB8fCAnJztcbiAgICBsZXQgZmFsbGJhY2tzID0gZmFsbGJhY2suc3BsaXQoJywnKS5tYXAoKGwpID0+IGwudHJpbSgpKS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICAvLyBCdWlsZCBjaGFpbjogY3VycmVudCAtPiBiYXNlIG9mIGN1cnJlbnQgLT4gZXhwbGljaXQgZmFsbGJhY2tzXG4gICAgbGV0IGNoYWluID0gWyBjdXJyZW50TGFuZyBdO1xuXG4gICAgLy8gQWRkIGJhc2UgbGFuZ3VhZ2UgaWYgY3VycmVudCBoYXMgYSByZWdpb24gKGUuZy4sICdlcy1NWCcgLT4gJ2VzJylcbiAgICBpZiAoY3VycmVudExhbmcuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgbGV0IGJhc2VMYW5nID0gY3VycmVudExhbmcuc3BsaXQoJy0nKVswXTtcbiAgICAgIGlmICghY2hhaW4uaW5jbHVkZXMoYmFzZUxhbmcpKVxuICAgICAgICBjaGFpbi5wdXNoKGJhc2VMYW5nKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZXhwbGljaXQgZmFsbGJhY2tzXG4gICAgZm9yIChsZXQgbGFuZyBvZiBmYWxsYmFja3MpIHtcbiAgICAgIGlmICghY2hhaW4uaW5jbHVkZXMobGFuZykpXG4gICAgICAgIGNoYWluLnB1c2gobGFuZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYWluO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSBhIGtleSB3aXRoIG9wdGlvbmFsIGludGVycG9sYXRpb24gYW5kIHBsdXJhbGl6YXRpb24gc3VwcG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIFRoZSB0cmFuc2xhdGlvbiBrZXkgcGF0aC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zIGluY2x1ZGluZyBgY291bnRgIGZvciBwbHVyYWxpemF0aW9uIGFuZCBpbnRlcnBvbGF0aW9uIHZhbHVlcy5cbiAgICogQHBhcmFtIHthbnl9IGRlZmF1bHRWYWx1ZSAtIERlZmF1bHQgdmFsdWUgaWYga2V5IG5vdCBmb3VuZC5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHRyYW5zbGF0ZWQgYW5kIGludGVycG9sYXRlZCBzdHJpbmcuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFNpbXBsZSB0cmFuc2xhdGlvblxuICAgKiBsYW5nLnQoJ2dyZWV0aW5nLmhlbGxvJylcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gV2l0aCBwbHVyYWxpemF0aW9uIChyZXF1aXJlcyBJQ1Utc3R5bGUgcGx1cmFsIGtleXMgaW4gbGFuZ3VhZ2UgcGFjaylcbiAgICogbGFuZy50KCdpdGVtcycsIHsgY291bnQ6IDUgfSlcbiAgICogLy8gTGFuZ3VhZ2UgcGFjazogeyBcIml0ZW1zXCI6IHsgXCJvbmVcIjogXCJ7e2NvdW50fX0gaXRlbVwiLCBcIm90aGVyXCI6IFwie3tjb3VudH19IGl0ZW1zXCIgfSB9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFdpdGggaW50ZXJwb2xhdGlvblxuICAgKiBsYW5nLnQoJ3dlbGNvbWUnLCB7IG5hbWU6ICdKb2huJyB9KVxuICAgKiAvLyBMYW5ndWFnZSBwYWNrOiB7IFwid2VsY29tZVwiOiBcIkhlbGxvLCB7e25hbWV9fSFcIiB9XG4gICAqL1xuICB0KGtleSwgb3B0aW9ucyA9IHt9LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBsZXQgcGF0aCA9IGBnbG9iYWwuaTE4bi4ke2tleX1gO1xuICAgIGxldCByZXN1bHQgPSBVdGlscy5mZXRjaFBhdGgodGhpcy50ZXJtcywgcGF0aCk7XG5cbiAgICAvLyBIYW5kbGUgcGx1cmFsaXphdGlvblxuICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdCA9PT0gJ29iamVjdCcgJiYgJ2NvdW50JyBpbiBvcHRpb25zKSB7XG4gICAgICBsZXQgcGx1cmFsQ2F0ZWdvcnkgPSB0aGlzLmdldFBsdXJhbENhdGVnb3J5KG9wdGlvbnMuY291bnQpO1xuICAgICAgcmVzdWx0ID0gcmVzdWx0W3BsdXJhbENhdGVnb3J5XSB8fCByZXN1bHQub3RoZXIgfHwgcmVzdWx0O1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgcmF3IHZhbHVlIGlmIGl0J3MgYSBEeW5hbWljUHJvcGVydHlcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgRHluYW1pY1Byb3BlcnR5KVxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnZhbHVlT2YoKTtcblxuICAgIC8vIFVzZSBkZWZhdWx0IGlmIG5vIHJlc3VsdFxuICAgIGlmIChyZXN1bHQgPT0gbnVsbClcbiAgICAgIHJlc3VsdCA9IChkZWZhdWx0VmFsdWUgIT0gbnVsbCkgPyBkZWZhdWx0VmFsdWUgOiBrZXk7XG5cbiAgICAvLyBJbnRlcnBvbGF0ZSB2YWx1ZXNcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycgJiYgb3B0aW9ucykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xce1xceyhcXHcrKVxcfVxcfS9nLCAobWF0Y2gsIHZhck5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuICh2YXJOYW1lIGluIG9wdGlvbnMpID8gb3B0aW9uc1t2YXJOYW1lXSA6IG1hdGNoO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIElDVSBwbHVyYWwgY2F0ZWdvcnkgZm9yIGEgY291bnQuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudCAtIFRoZSBjb3VudCB0byBnZXQgdGhlIHBsdXJhbCBjYXRlZ29yeSBmb3IuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IE9uZSBvZjogJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScsICdvdGhlcicuXG4gICAqL1xuICBnZXRQbHVyYWxDYXRlZ29yeShjb3VudCkge1xuICAgIGxldCBsYW5nID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKCk7XG5cbiAgICAvLyBDYWNoZSBQbHVyYWxSdWxlcyBwZXIgbGFuZ3VhZ2VcbiAgICBpZiAoIXRoaXMuX3BsdXJhbFJ1bGVzIHx8IHRoaXMuX3BsdXJhbFJ1bGVzLmxvY2FsZSAhPT0gbGFuZykge1xuICAgICAgdGhpcy5fcGx1cmFsUnVsZXMgPSBuZXcgSW50bC5QbHVyYWxSdWxlcyhsYW5nKTtcbiAgICAgIHRoaXMuX3BsdXJhbFJ1bGVzLmxvY2FsZSA9IGxhbmc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3BsdXJhbFJ1bGVzLnNlbGVjdChjb3VudCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgZGF0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgbG9jYWxlLlxuICAgKlxuICAgKiBAcGFyYW0ge0RhdGV8bnVtYmVyfHN0cmluZ30gZGF0ZSAtIFRoZSBkYXRlIHRvIGZvcm1hdC5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHlsZSAtIEEgcHJlc2V0IG5hbWUgKCdzaG9ydCcsICdsb25nJywgJ21lZGl1bScsICd0aW1lJywgJ2Z1bGwnKSBvciBJbnRsLkRhdGVUaW1lRm9ybWF0IG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgZGF0ZSBzdHJpbmcuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0RGF0ZShuZXcgRGF0ZSgpLCAnbG9uZycpXG4gICAqIC8vIFwiRmVicnVhcnkgNywgMjAyNlwiXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0RGF0ZShkYXRlLCB7IHllYXI6ICdudW1lcmljJywgbW9udGg6ICcyLWRpZ2l0JywgZGF5OiAnMi1kaWdpdCcgfSlcbiAgICovXG4gIGZvcm1hdERhdGUoZGF0ZSwgc3R5bGUgPSAnbWVkaXVtJykge1xuICAgIGxldCBsYW5nID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKCk7XG4gICAgbGV0IG9wdGlvbnMgPSAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykgPyAoREFURV9GT1JNQVRfUFJFU0VUU1tzdHlsZV0gfHwgREFURV9GT1JNQVRfUFJFU0VUUy5tZWRpdW0pIDogc3R5bGU7XG4gICAgbGV0IGNhY2hlS2V5ID0gYCR7bGFuZ30tJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gO1xuXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0dGVycy5oYXMoY2FjaGVLZXkpKVxuICAgICAgdGhpcy5fZGF0ZUZvcm1hdHRlcnMuc2V0KGNhY2hlS2V5LCBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsYW5nLCBvcHRpb25zKSk7XG5cbiAgICBsZXQgZGF0ZVZhbHVlID0gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/IGRhdGUgOiBuZXcgRGF0ZShkYXRlKTtcbiAgICByZXR1cm4gdGhpcy5fZGF0ZUZvcm1hdHRlcnMuZ2V0KGNhY2hlS2V5KS5mb3JtYXQoZGF0ZVZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBkYXRlIHJlbGF0aXZlIHRvIG5vdyAoZS5nLiwgXCIyIGRheXMgYWdvXCIsIFwiaW4gMyBob3Vyc1wiKS5cbiAgICpcbiAgICogQHBhcmFtIHtEYXRlfG51bWJlcnxzdHJpbmd9IGRhdGUgLSBUaGUgZGF0ZSB0byBmb3JtYXQuXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQgb3B0aW9ucy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlbGF0aXZlIHRpbWUgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdFJlbGF0aXZlVGltZShuZXcgRGF0ZShEYXRlLm5vdygpIC0gODY0MDAwMDApKVxuICAgKiAvLyBcIjEgZGF5IGFnb1wiXG4gICAqL1xuICBmb3JtYXRSZWxhdGl2ZVRpbWUoZGF0ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGxhbmcgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKTtcbiAgICBsZXQgZGF0ZVZhbHVlID0gKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSA/IGRhdGUgOiBuZXcgRGF0ZShkYXRlKTtcbiAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBsZXQgZGlmZk1zID0gZGF0ZVZhbHVlLmdldFRpbWUoKSAtIG5vdztcbiAgICBsZXQgZGlmZlNlY29uZHMgPSBNYXRoLnJvdW5kKGRpZmZNcyAvIDEwMDApO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHRoZSBiZXN0IHVuaXRcbiAgICBsZXQgdmFsdWU7XG4gICAgbGV0IHVuaXQ7XG5cbiAgICBjb25zdCBNSU5VVEUgPSA2MDtcbiAgICBjb25zdCBIT1VSID0gMzYwMDtcbiAgICBjb25zdCBEQVkgPSA4NjQwMDtcbiAgICBjb25zdCBXRUVLID0gNjA0ODAwO1xuICAgIGNvbnN0IE1PTlRIID0gMjYyOTgwMDsgLy8gfjMwLjQ0IGRheXNcbiAgICBjb25zdCBZRUFSID0gMzE1NTc2MDA7IC8vIH4zNjUuMjUgZGF5c1xuXG4gICAgbGV0IGFic0RpZmYgPSBNYXRoLmFicyhkaWZmU2Vjb25kcyk7XG5cbiAgICBpZiAoYWJzRGlmZiA8IE1JTlVURSkge1xuICAgICAgdmFsdWUgPSBkaWZmU2Vjb25kcztcbiAgICAgIHVuaXQgPSAnc2Vjb25kJztcbiAgICB9IGVsc2UgaWYgKGFic0RpZmYgPCBIT1VSKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBNSU5VVEUpO1xuICAgICAgdW5pdCA9ICdtaW51dGUnO1xuICAgIH0gZWxzZSBpZiAoYWJzRGlmZiA8IERBWSkge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gSE9VUik7XG4gICAgICB1bml0ID0gJ2hvdXInO1xuICAgIH0gZWxzZSBpZiAoYWJzRGlmZiA8IFdFRUspIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIERBWSk7XG4gICAgICB1bml0ID0gJ2RheSc7XG4gICAgfSBlbHNlIGlmIChhYnNEaWZmIDwgTU9OVEgpIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIFdFRUspO1xuICAgICAgdW5pdCA9ICd3ZWVrJztcbiAgICB9IGVsc2UgaWYgKGFic0RpZmYgPCBZRUFSKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBNT05USCk7XG4gICAgICB1bml0ID0gJ21vbnRoJztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gWUVBUik7XG4gICAgICB1bml0ID0gJ3llYXInO1xuICAgIH1cblxuICAgIGxldCBmb3JtYXR0ZXIgPSBuZXcgSW50bC5SZWxhdGl2ZVRpbWVGb3JtYXQobGFuZywgeyBudW1lcmljOiAnYXV0bycsIC4uLm9wdGlvbnMgfSk7XG4gICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXQodmFsdWUsIHVuaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIG51bWJlciBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgbG9jYWxlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gVGhlIG51bWJlciB0byBmb3JtYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gc3R5bGUgLSBBIHByZXNldCBuYW1lICgnZGVjaW1hbCcsICdwZXJjZW50JywgJ2NvbXBhY3QnLCAnc2NpZW50aWZpYycpIG9yIEludGwuTnVtYmVyRm9ybWF0IG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgbnVtYmVyIHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXROdW1iZXIoMTIzNC41NilcbiAgICogLy8gXCIxLDIzNC41NlwiIChpbiBlbi1VUylcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXROdW1iZXIoMC40MiwgJ3BlcmNlbnQnKVxuICAgKiAvLyBcIjQyJVwiXG4gICAqL1xuICBmb3JtYXROdW1iZXIobnVtYmVyLCBzdHlsZSA9ICdkZWNpbWFsJykge1xuICAgIGxldCBsYW5nID0gdGhpcy5nZXRDdXJyZW50TG9jYWxlKCk7XG4gICAgbGV0IG9wdGlvbnMgPSAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykgPyAoTlVNQkVSX0ZPUk1BVF9QUkVTRVRTW3N0eWxlXSB8fCBOVU1CRVJfRk9STUFUX1BSRVNFVFMuZGVjaW1hbCkgOiBzdHlsZTtcbiAgICBsZXQgY2FjaGVLZXkgPSBgJHtsYW5nfS0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWA7XG5cbiAgICBpZiAoIXRoaXMuX251bWJlckZvcm1hdHRlcnMuaGFzKGNhY2hlS2V5KSlcbiAgICAgIHRoaXMuX251bWJlckZvcm1hdHRlcnMuc2V0KGNhY2hlS2V5LCBuZXcgSW50bC5OdW1iZXJGb3JtYXQobGFuZywgb3B0aW9ucykpO1xuXG4gICAgcmV0dXJuIHRoaXMuX251bWJlckZvcm1hdHRlcnMuZ2V0KGNhY2hlS2V5KS5mb3JtYXQobnVtYmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBjdXJyZW5jeSBhbW91bnQgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IGxvY2FsZS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIFRoZSBhbW91bnQgdG8gZm9ybWF0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gY3VycmVuY3kgLSBUaGUgSVNPIDQyMTcgY3VycmVuY3kgY29kZSAoZS5nLiwgJ1VTRCcsICdFVVInKS5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBBZGRpdGlvbmFsIEludGwuTnVtYmVyRm9ybWF0IG9wdGlvbnMuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgY3VycmVuY3kgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdEN1cnJlbmN5KDk5Ljk5LCAnVVNEJylcbiAgICogLy8gXCIkOTkuOTlcIiAoaW4gZW4tVVMpXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0Q3VycmVuY3koMTIzNC41NiwgJ0VVUicpXG4gICAqIC8vIFwi4oKsMSwyMzQuNTZcIiAoaW4gZW4tVVMpIG9yIFwiMS4yMzQsNTYg4oKsXCIgKGluIGRlLURFKVxuICAgKi9cbiAgZm9ybWF0Q3VycmVuY3koYW1vdW50LCBjdXJyZW5jeSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKGFtb3VudCwge1xuICAgICAgc3R5bGU6ICAgICdjdXJyZW5jeScsXG4gICAgICBjdXJyZW5jeTogY3VycmVuY3ksXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBjdXJyZW50IGxhbmd1YWdlIGlzIFJUTC5cbiAgICpcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgaXMgUlRMLlxuICAgKi9cbiAgaXNSVEwoKSB7XG4gICAgcmV0dXJuIGlzUlRMTGFuZ3VhZ2UodGhpcy5nZXRDdXJyZW50TG9jYWxlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdGV4dCBkaXJlY3Rpb24gYmFzZWQgb24gdGhlIGN1cnJlbnQgbGFuZ3VhZ2UuXG4gICAqIE9ubHkgYXBwbGllcyB3aGVuIGF1dG8tZGlyIGF0dHJpYnV0ZSBpcyBwcmVzZW50LlxuICAgKi9cbiAgdXBkYXRlVGV4dERpcmVjdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaGFzQXR0cmlidXRlKCdhdXRvLWRpcicpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMuaXNSVEwoKSA/ICdydGwnIDogJ2x0cic7XG4gICAgbGV0IHByZXZpb3VzRGlyZWN0aW9uID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RpcicpO1xuXG4gICAgaWYgKHByZXZpb3VzRGlyZWN0aW9uID09PSBkaXJlY3Rpb24pXG4gICAgICByZXR1cm47XG5cbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGlyJywgZGlyZWN0aW9uKTtcblxuICAgIC8vIEFsc28gc2V0IG9uIGRvY3VtZW50IGlmIHRoaXMgaXMgdGhlIHJvb3QgcHJvdmlkZXJcbiAgICBpZiAoIXRoaXMuY2xvc2VzdCgnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyOm5vdCg6c2NvcGUpJykpIHtcbiAgICAgIGxldCBkb2MgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICBkb2MuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlyJywgZGlyZWN0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaCBkaXJlY3Rpb24gY2hhbmdlIGV2ZW50XG4gICAgbGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdkaXJlY3Rpb25jaGFuZ2UnLCB7XG4gICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgZGV0YWlsOiAgeyBkaXJlY3Rpb24sIGxhbmd1YWdlOiB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKSB9LFxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBpMThuKF9wYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgICBsZXQgcGF0aCAgICA9IGBnbG9iYWwuaTE4bi4ke19wYXRofWA7XG4gICAgbGV0IHJlc3VsdCAgPSBVdGlscy5mZXRjaFBhdGgodGhpcy50ZXJtcywgcGF0aCk7XG5cbiAgICBpZiAocmVzdWx0ID09IG51bGwpXG4gICAgICByZXR1cm4gVXRpbHMuZ2V0RHluYW1pY1Byb3BlcnR5Rm9yUGF0aC5jYWxsKHRoaXMsIHBhdGgsIChkZWZhdWx0VmFsdWUgPT0gbnVsbCkgPyAnJyA6IGRlZmF1bHRWYWx1ZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q3VycmVudExvY2FsZSgpIHtcbiAgICAvLyAodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5jaGlsZE5vZGVzWzFdIGlzIHRoZSBgPGh0bWxgPiB0YWcgb2YgdGhlIGRvY3VtZW50XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsYW5nJykgfHwgKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkuY2hpbGROb2Rlc1sxXS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKSB8fCAnZW4nO1xuICB9XG5cbiAgbW91bnRlZCgpIHtcbiAgICBzdXBlci5tb3VudGVkKCk7XG5cbiAgICBpZiAoIXRoaXMuZ2V0QXR0cmlidXRlKCdsYW5nJykpXG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbGFuZycsICh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNoaWxkTm9kZXNbMV0uZ2V0QXR0cmlidXRlKCdsYW5nJykgfHwgJ2VuJyk7XG5cbiAgICAvLyBBcHBseSBpbml0aWFsIHRleHQgZGlyZWN0aW9uIGlmIGF1dG8tZGlyIGlzIGVuYWJsZWRcbiAgICB0aGlzLnVwZGF0ZVRleHREaXJlY3Rpb24oKTtcbiAgfVxuXG4gIGNyZWF0ZVNoYWRvd0RPTSgpIHtcbiAgICAvLyBOT09QXG4gIH1cblxuICBnZXRDb21wb25lbnRUZW1wbGF0ZSgpIHtcbiAgICAvLyBOT09QXG4gIH1cblxuICBnZXRTb3VyY2VzRm9yTGFuZyhsYW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KGBteXRoaXgtbGFuZ3VhZ2UtcGFja1tsYW5nXj1cIiR7bGFuZy5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyl9XCJdYCk7XG4gIH1cblxuICBsb2FkQWxsTGFuZ3VhZ2VQYWNrc0Zvckxhbmd1YWdlKF9sYW5nKSB7XG4gICAgbGV0IGxhbmcgPSBfbGFuZyB8fCAnZW4nO1xuICAgIGxldCBmYWxsYmFja0NoYWluID0gdGhpcy5nZXRGYWxsYmFja0NoYWluKCk7XG4gICAgbGV0IGFsbFNvdXJjZUVsZW1lbnRzID0gW107XG5cbiAgICAvLyBDb2xsZWN0IGxhbmd1YWdlIHBhY2tzIGZyb20gYWxsIGxhbmd1YWdlcyBpbiB0aGUgZmFsbGJhY2sgY2hhaW5cbiAgICBmb3IgKGxldCBmYWxsYmFja0xhbmcgb2YgZmFsbGJhY2tDaGFpbikge1xuICAgICAgbGV0IHNvdXJjZUVsZW1lbnRzID0gdGhpcy5nZXRTb3VyY2VzRm9yTGFuZyhmYWxsYmFja0xhbmcpXG4gICAgICAgIC5maWx0ZXIoKHNvdXJjZUVsZW1lbnQpID0+IEJhc2VVdGlscy5pc05vdE5PRShzb3VyY2VFbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpKTtcblxuICAgICAgZm9yIChsZXQgc291cmNlRWxlbWVudCBvZiBzb3VyY2VFbGVtZW50cykge1xuICAgICAgICBpZiAoIWFsbFNvdXJjZUVsZW1lbnRzLmluY2x1ZGVzKHNvdXJjZUVsZW1lbnQpKVxuICAgICAgICAgIGFsbFNvdXJjZUVsZW1lbnRzLnB1c2goc291cmNlRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFhbGxTb3VyY2VFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2FybihgXCJteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXJcIjogTm8gXCJteXRoaXgtbGFuZ3VhZ2UtcGFja1wiIHRhZyBmb3VuZCBmb3IgbGFuZ3VhZ2VzOiAke2ZhbGxiYWNrQ2hhaW4uam9pbignLCAnKX1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvYWRBbGxMYW5ndWFnZVBhY2tzKGxhbmcsIGFsbFNvdXJjZUVsZW1lbnRzLCBmYWxsYmFja0NoYWluKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRBbGxMYW5ndWFnZVBhY2tzKGxhbmcsIHNvdXJjZUVsZW1lbnRzLCBmYWxsYmFja0NoYWluID0gW10pIHtcbiAgICB0cnkge1xuICAgICAgLy8gTG9hZCBhbGwgbGFuZ3VhZ2UgcGFja3NcbiAgICAgIGxldCBwcm9taXNlcyA9IHNvdXJjZUVsZW1lbnRzLm1hcCgoc291cmNlRWxlbWVudCkgPT4ge1xuICAgICAgICBsZXQgcGFja0xhbmcgPSBzb3VyY2VFbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFuZycpIHx8IGxhbmc7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRMYW5ndWFnZVBhY2socGFja0xhbmcsIHNvdXJjZUVsZW1lbnQpLnRoZW4oKHRlcm1zKSA9PiAoe1xuICAgICAgICAgIGxhbmc6ICBwYWNrTGFuZyxcbiAgICAgICAgICB0ZXJtczogdGVybXMsXG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsU2V0dGxlZChwcm9taXNlcyk7XG5cbiAgICAgIC8vIEdyb3VwIHRlcm1zIGJ5IGxhbmd1YWdlXG4gICAgICBsZXQgdGVybXNCeUxhbmcgPSBuZXcgTWFwKCk7XG4gICAgICBmb3IgKGxldCByZXN1bHQgb2YgcmVzdWx0cykge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyAhPT0gJ2Z1bGZpbGxlZCcgfHwgIXJlc3VsdC52YWx1ZSB8fCAhcmVzdWx0LnZhbHVlLnRlcm1zKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGxldCB7IGxhbmc6IHBhY2tMYW5nLCB0ZXJtcyB9ID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBsZXQgYmFzZUxhbmcgPSBwYWNrTGFuZy5zcGxpdCgnLScpWzBdO1xuXG4gICAgICAgIC8vIFN0b3JlIHVuZGVyIGJvdGggZnVsbCBsYW5nIGFuZCBiYXNlIGxhbmcgZm9yIGZhbGxiYWNrIG1hdGNoaW5nXG4gICAgICAgIGlmICghdGVybXNCeUxhbmcuaGFzKHBhY2tMYW5nKSlcbiAgICAgICAgICB0ZXJtc0J5TGFuZy5zZXQocGFja0xhbmcsIFtdKTtcblxuICAgICAgICB0ZXJtc0J5TGFuZy5nZXQocGFja0xhbmcpLnB1c2godGVybXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBNZXJnZSB0ZXJtcyBpbiBmYWxsYmFjayBvcmRlciAobGFzdCBpbiBjaGFpbiBnZXRzIGxvd2VzdCBwcmlvcml0eSlcbiAgICAgIC8vIFJldmVyc2UgdGhlIGNoYWluIHNvIG1vcmUgc3BlY2lmaWMgbGFuZ3VhZ2VzIG92ZXJyaWRlIGZhbGxiYWNrc1xuICAgICAgbGV0IG1lcmdlZFRlcm1zID0ge307XG4gICAgICBsZXQgcmV2ZXJzZWRDaGFpbiA9IFsgLi4uZmFsbGJhY2tDaGFpbiBdLnJldmVyc2UoKTtcblxuICAgICAgZm9yIChsZXQgZmFsbGJhY2tMYW5nIG9mIHJldmVyc2VkQ2hhaW4pIHtcbiAgICAgICAgbGV0IGxhbmdUZXJtcyA9IHRlcm1zQnlMYW5nLmdldChmYWxsYmFja0xhbmcpIHx8IFtdO1xuXG4gICAgICAgIC8vIEFsc28gY2hlY2sgYmFzZSBsYW5ndWFnZVxuICAgICAgICBpZiAoZmFsbGJhY2tMYW5nLmluY2x1ZGVzKCctJykpIHtcbiAgICAgICAgICBsZXQgYmFzZUxhbmcgPSBmYWxsYmFja0xhbmcuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgICBsZXQgYmFzZVRlcm1zID0gdGVybXNCeUxhbmcuZ2V0KGJhc2VMYW5nKSB8fCBbXTtcbiAgICAgICAgICBsYW5nVGVybXMgPSBbIC4uLmJhc2VUZXJtcywgLi4ubGFuZ1Rlcm1zIF07XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCB0ZXJtcyBvZiBsYW5nVGVybXMpIHtcbiAgICAgICAgICBtZXJnZWRUZXJtcyA9IGRlZXBNZXJnZShtZXJnZWRUZXJtcywgdGVybXMpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjb21waWxlZFRlcm1zID0gdGhpcy5jb21waWxlTGFuZ3VhZ2VUZXJtcyhsYW5nLCBtZXJnZWRUZXJtcyk7XG4gICAgICB0aGlzLnRlcm1zID0gY29tcGlsZWRUZXJtcztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignXCJteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXJcIjogRmFpbGVkIHRvIGxvYWQgbGFuZ3VhZ2UgcGFja3MnLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZExhbmd1YWdlUGFjayhsYW5nLCBzb3VyY2VFbGVtZW50KSB7XG4gICAgbGV0IHNyYyA9IHNvdXJjZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICBpZiAoIXNyYylcbiAgICAgIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgeyByZXNwb25zZSB9ICA9IGF3YWl0IENvbXBvbmVudFV0aWxzLnJlcXVpcmUuY2FsbCh0aGlzLCBzcmMsIHsgb3duZXJEb2N1bWVudDogdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50IH0pO1xuICAgICAgbGV0IHR5cGUgICAgICAgICAgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZW5jdHlwZScpIHx8ICdhcHBsaWNhdGlvbi9qc29uJztcbiAgICAgIGlmIChJU19KU09OX0VOQ1RZUEUudGVzdCh0eXBlKSkge1xuICAgICAgICAvLyBIYW5kbGUgSlNPTlxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3IFR5cGVFcnJvcihgRG9uJ3Qga25vdyBob3cgdG8gbG9hZCBhIGxhbmd1YWdlIHBhY2sgb2YgdHlwZSBcIiR7dHlwZX1cImApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcIm15dGhpeC1sYW5ndWFnZS1wcm92aWRlclwiOiBGYWlsZWQgdG8gbG9hZCBzcGVjaWZpZWQgcmVzb3VyY2U6ICR7c3JjfWAsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBjb21waWxlTGFuZ3VhZ2VUZXJtcyhsYW5nLCB0ZXJtcykge1xuICAgIGNvbnN0IHdhbGtUZXJtcyA9ICh0ZXJtcywgcmF3S2V5UGF0aCkgPT4ge1xuICAgICAgbGV0IGtleXMgICAgICA9IE9iamVjdC5rZXlzKHRlcm1zKTtcbiAgICAgIGxldCB0ZXJtc0NvcHkgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxldCBrZXkgICAgICAgICA9IGtleXNbaV07XG4gICAgICAgIGxldCB2YWx1ZSAgICAgICA9IHRlcm1zW2tleV07XG4gICAgICAgIGxldCBuZXdLZXlQYXRoICA9IHJhd0tleVBhdGguY29uY2F0KGtleSk7XG5cbiAgICAgICAgaWYgKEJhc2VVdGlscy5pc1BsYWluT2JqZWN0KHZhbHVlKSB8fCBBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgIHRlcm1zQ29weVtrZXldID0gd2Fsa1Rlcm1zKHZhbHVlLCBuZXdLZXlQYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgcHJvcGVydHkgPSBVdGlscy5nZXREeW5hbWljUHJvcGVydHlGb3JQYXRoLmNhbGwodGhpcywgbmV3S2V5UGF0aC5qb2luKCcuJyksIHZhbHVlKTtcbiAgICAgICAgICB0ZXJtc0NvcHlba2V5XSA9IHByb3BlcnR5O1xuICAgICAgICAgIHByb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGVybXNDb3B5O1xuICAgIH07XG5cbiAgICByZXR1cm4gd2Fsa1Rlcm1zKHRlcm1zLCBbICdnbG9iYWwnLCAnaTE4bicgXSk7XG4gIH1cbn1cblxuTXl0aGl4VUlMYW5ndWFnZVBhY2sucmVnaXN0ZXIoKTtcbk15dGhpeFVJTGFuZ3VhZ2VQcm92aWRlci5yZWdpc3RlcigpO1xuXG4oZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KSkuTXl0aGl4VUlMYW5ndWFnZVBhY2sgPSBNeXRoaXhVSUxhbmd1YWdlUGFjaztcbmdsb2JhbFRoaXMubXl0aGl4VUkuTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyID0gTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyO1xuIiwiaW1wb3J0ICogYXMgQ29tcG9uZW50VXRpbHMgZnJvbSAnLi9jb21wb25lbnQtdXRpbHMuanMnO1xuaW1wb3J0IHsgTXl0aGl4VUlDb21wb25lbnQgfSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuXG5jb25zdCBJU19URU1QTEFURSAgICAgICA9IC9eKHRlbXBsYXRlKSQvaTtcbmNvbnN0IFRFTVBMQVRFX1RFTVBMQVRFID0gL14oXFwqfFxcfFxcKnxcXCpcXHwpJC87XG5cbi8qKlxuICogdHlwZTogTXl0aGl4RWxlbWVudFxuICogbmFtZTogTXl0aGl4VUlSZXF1aXJlXG4gKiBncm91cE5hbWU6IE15dGhpeEVsZW1lbnRzXG4gKiBkZXNjOiB8XG4gKiAgIGBgYGphdmFzY3JpcHRcbiAqICAgaW1wb3J0IHsgTXl0aGl4RWxlbWVudHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgY29uc3Qge1xuICogICAgIE15dGhpeFVJUmVxdWlyZSxcbiAqICAgfSA9IE15dGhpeEVsZW1lbnRzO1xuICogICBgYGBcbiAqXG4gKiAgIE15dGhpeFVJUmVxdWlyZSBpcyBhbiBFbGVtZW50IHRoYXQgd2lsbCBsb2FkIG90aGVyIHJlc291cmNlcy4gSXQgaXMgaW5zcGlyZWQgYnkgYW5kIG5hbWVkIGFmdGVyIGByZXF1aXJlYCBpbiBOb2RlLiBJdCB3b3JrcyB2ZXJ5IHNpbWlsYXJseSBhcyB3ZWxsLCBzbyBub3QgdG9vIG11Y2ggbmVlZHMgdG8gYmUgZXhwbGFpbmVkIGFib3V0IGl0LlxuICpcbiAqICAgRXhjZXB0IE15dGhpeCBVSSBzdGFuZGFyZCBjb21wb25lbnQgZmlsZSBzdHJ1Y3R1cmUgbWF5YmUuLi4gWWVhaCwgbWF5YmUgd2Ugc2hvdWxkIGRpc2N1c3MgdGhhdC5cbiAqXG4gKiAgIFRoZSBgPG15dGhpeC1yZXF1aXJlIHNyYz1cIi4vY29tcG9uZW50cy93aWRnZXQuaHRtbFwiPmAgdGFnIGFsbG93cyB5b3UgdG8gbG9hZCBvdGhlciByZXNvdXJjZXMgc2ltcGx5IGJ5IHNwZWNpZnlpbmcgYSBwYXRoLiBUaGlzIHBhdGggY2FuIGJlIHJlbGF0aXZlLCBvciBhYnNvbHV0ZS4gVGhlIHBhdGggY2FuIGNvbnRhaW4gcXVlcnkgcGFyYW1ldGVycy5cbiAqXG4gKiAgIFlvdSBtYXkgaGF2ZSBub3RpY2VkIHRoYXQgdGhlIHRhZyBuYW1lIGRvZXNuJ3QgcXVpdGUgbWF0Y2ggdGhlIGNsYXNzIG5hbWUsIGBNeXRoaXhVSVJlcXVpcmVgLCB2cyBgPG15dGhpeC1yZXF1aXJlPmAuIFRoaXMgZGV2aWF0aW9uIHdhcyBjaG9zZW4gYnkgdGhlIE15dGhpeCBkZXZlbG9wbWVudCB0ZWFtIGJlY2F1c2UgTXl0aGl4IGlzIGFuIGVudGlyZSBlY29zeXN0ZW0sIG5vdCBqdXN0IGEgVUkgZnJhbWV3b3JrLiBGb3IgdGhpcyByZWFzb24sIGFuZCBpbiBwYXJ0IHRvIGF2b2lkIGZ1dHVyZSBuYW1pbmcgY29sbGlzaW9ucywgd2UgaGF2ZSBkZWNpZGVkIHRoYXQgaW4gY29kZSwgdGhlIGNsYXNzIG5hbWUgc2hvdWxkIGNvbnRhaW4gdGhlIGBVSWAgcGFydCB0byBkZWxpbWl0IGl0IGZyb20gb3RoZXIgTXl0aGl4IHRlY2hub2xvZ2llcy4gTmV4dCwgd2UgZmVsdCBjb25zdGFudGx5IHR5cGluZyBgPG15dGhpeC11aS1yZXF1aXJlPmAgaW4gSFRNTCwgdnMgdGhlIG5pY2VyIGA8bXl0aGl4LXJlcXVpcmU+YCB3YXMga2luZGEgc2lsbHkuIEJlc2lkZXMsIGluIEhUTUwsIHlvdSBBUkUgaW4gdGhlIFVJIGNvbnRleHQsIHNvIHdoeSByZXBlYXQgb3Vyc2VsdmVzPyBBbnlob3csIHRoaXMgaXMganVzdCBhIGxpdHRsZSBub3RlIHRvIGtlZXAgaW4gbWluZC4gVGhlIEVsZW1lbnQgY2xhc3MgbmFtZXMgZG8gbm90IG1hdGNoIHRoZSBFbGVtZW50IGB0YWdOYW1lYCBmb3IgTXl0aGl4IFVJIHN0YW5kYXJkIGNvbXBvbmVudHMuXG4gKlxuICogICBJZiBgPG15dGhpeC1yZXF1aXJlPmAgaXMgdXNlZCB0byBmZXRjaCBhIEphdmFTY3JpcHQgcmVzb3VyY2UsIHRoZW4gaXQgYmVoYXZlcyBhbG1vc3QgaWRlbnRpY2FsbHkgdG8gYSBgPHNjcmlwdD5gIHRhZy4gSWYgaG93ZXZlciBpdCBpcyBiZWluZyB1c2VkIHRvIGZldGNoIGFub3RoZXIgdHlwZSBvZiBrbm93biByZXNvdXJjZSwgc3VjaCBhcyB0ZXh0L2h0bWwsIHRoZW4gaXQgd2lsbCBiZWhhdmUgZGlmZmVyZW50bHkuXG4gKlxuICogICBXaGVuIGFuIEhUTUwgZmlsZSBpcyBmZXRjaGVkIGJ5IGEgYDxteXRoaXgtcmVxdWlyZT5gIGVsZW1lbnQsIHRoZW4gYW55IGludGVybmFsIGA8c2NyaXB0PmAsIGA8c3R5bGU+YCwgb3Igb3RoZXIgdGFnIHRoYXQgYmVsb25ncyBpbiB0aGUgYDxoZWFkPmAgdGFnIHdpbGwgYmUgcGxhY2VkIGluIHRoZSBgPGhlYWQ+YCB0YWcgb2YgdGhlIGRvY3VtZW50LiBEdXBsaWNhdGUgaW5zZXJ0cyBhcmUgcHJldmVudGVkIGJ5IHVzZSBvZiB0YWcgaWRzLiBJZiBhIHRhZyBpbiB0aGUgYDxoZWFkPmAgb2YgdGhlIGRvY3VtZW50IGFscmVhZHkgaGFzIHRoZSBzYW1lIGlkIGFzIG9uZSBNeXRoaXhVSVJlcXVpcmUgaXMgdHJ5aW5nIHRvIGluc2VydCwgdGhlbiBNeXRoaXhVSVJlcXVpcmUgd2lsbCBhYm9ydCwgYW5kIGl0IHdvbid0IGR1cGxpY2F0ZSBpbnNlcnRpbmcgc2FpZCBlbGVtZW50LlxuICpcbiAqICAgT3RoZXIgZWxlbWVudHMgYXJlIHRyZWF0ZWQgc3BlY2lhbGx5IGFzIHdlbGwgd2hlbiBlbmNvdW50ZXJlZCBpbiB0aGUgbG9hZGVkIEhUTUwgZmlsZS4gQmVsb3cgaXMgYSB0YWJsZSBvZiBzcGVjaWFsIGNhc2VzOlxuICpcbiAqICAgfCBFbGVtZW50cyB8IE5vdGVzIHxcbiAqICAgfC0tLS0tLXwtLS0tLS0tfFxuICogICB8IGA8bGluaz5gLCBgPHN0eWxlPmAsIGA8bWV0YT5gIHwgQXJlIGFwcGVuZGVkIHRvIHRoZSBgPGhlYWQ+YCBvZiB0aGUgZG9jdW1lbnQuIHxcbiAqICAgfCBgPHNjcmlwdD5gIHwgSXMgYXBwZW5kZWQgdG8gdGhlIGA8aGVhZD5gIG9mIHRoZSBkb2N1bWVudCBhZnRlciB0aGUgYHNyY2AgYXR0cmlidXRlIGlzIGZ1bGx5IHJlc29sdmVkLiB8XG4gKiAgIHwgYDx0ZW1wbGF0ZT5gIHwgSXMgYXBwZW5kZWQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgYDxib2R5PmAgb2YgdGhlIGRvY3VtZW50LiB8XG4gKiAgIHwgYDxiYXNlPmAsIGA8bm9zY3JpcHQ+YCwgYDx0aXRsZT5gIHwgQXJlIGRlbGliZXJhdGVseSBkaXNjYXJkZWQuIHxcbiAqICAgfCBBbGwgb3RoZXJzIHwgQXJlIGFwcGVuZGVkIHRvIHRoZSBgPGJvZHk+YCBvZiB0aGUgZG9jdW1lbnQuIHxcbiAqXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IGBnbG9iYWxUaGlzLm15dGhpeFVJLnVybFJlc29sdmVyOiAoY29udGV4dDogeyBzcmM6IHN0cmluZyB8IFVSTCwgdXJsOiBVUkwsIHBhdGg6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyB9KSA9PiBzdHJpbmcgfCBVUkxgIGlzIGEgbWV0aG9kIHRoYXQgY2FuIGJlIGRlZmluZWQgYnkgdGhlIHVzZXIuIFdoZW4gZGVmaW5lZCwgaXQgd2lsbCBiZSBjYWxsZWQgZXZlcnkgdGltZSBAc2VlIENvbXBvbmVudFV0aWxzLnJlc29sdmVVUkw7IGlzIGNhbGxlZC4gYE15dGhpeFVJUmVxdWlyZWAgY2FsbHMgQHNlZSBDb21wb25lbnRVdGlscy5yZXNvbHZlVVJMOyB0byByZXNvbHZlIFVSTHMsIGluY2x1ZGluZyBpbiBzdWIgYDxzY3JpcHQ+YCB0YWcgYHNyY2AgYXR0cmlidXRlcyBsb2FkZWQgZnJvbSByZXNvdXJjZXMuIEl0IGlzIHRoZSBpbnRlbnQgb2YgdGhpcyBtZXRob2QgdGhhdCBpdCB3aWxsIGdsb2JhbGx5IHJlc29sdmUgYWxsIFVSTHMgaW50ZXJuYWwgdG8gdGhlIE15dGhpeCBVSSBmcmFtZXdvcmsuIE9idmlvdXNseSBpdCB3b24ndCByZXNvbHZlIFVSTHMgZGlyZWN0bHkgZnJvbSBzdGF0aWMgYGltcG9ydGAgb3IgZHluYW1pYyBgaW1wb3J0KClgIHN0YXRlbWVudHMgaW4gSmF2YVNjcmlwdC4gVGhvc2UgYXJlIGhhbmRsZWQgYnkgdGhlIFtpbXBvcnRtYXBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9zY3JpcHQvdHlwZS9pbXBvcnRtYXApIHlvdSBzZXR1cCwgcmVtZW1iZXI/LlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIEFub3RoZXIgY29tcG9uZW50IGNhbiBiZSBsb2FkZWQgZHluYW1pY2FsbHktLXVzdWFsbHkgYnkgbG9hZGluZyBpdHMgY29ycmVzcG9uZGluZyBIVE1MIGZpbGUgKHdoaWNoIHdpbGwgZ2VuZXJhbGx5IHRoZW4gbG9hZCB0aGUgYDxzY3JpcHQ+YCByZXF1aXJlIGJ5IHRoZSBjb21wb25lbnQpLiBJbiB0aGUgZXhhbXBsZSBiZWxvdyB3ZSBhcmUgbG9hZGluZyB0aGUgc3RhbmRhcmQgbW9kYWwgY29tcG9uZW50IHByb3ZpZGVkIGJ5IE15dGhpeCBVSTpcbiAqICAgICBgYGBodG1sXG4gKiAgICAgPG15dGhpeC1yZXF1aXJlIHNyYz1cIkBjZG4vbXl0aGl4LXVpLW1vZGFsQCR7e21ham9yVmVyc2lvbn19L2Rpc3QvbXl0aGl4LXVpLW1vZGFsLmh0bWxcIj48L215dGhpeC1yZXF1aXJlPlxuICogICAgIGBgYFxuICovXG5cbmxldCBSRVFVSVJFX0hBTkRMRVJTID0gW107XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVxdWlyZUhhbmRsZXIocGF0dGVybiwgY2FsbGJhY2spIHtcbiAgUkVRVUlSRV9IQU5ETEVSUy51bnNoaWZ0KHtcbiAgICBwYXR0ZXJuLFxuICAgIGNhbGxiYWNrLFxuICB9KTtcbn1cblxucmVnaXN0ZXJSZXF1aXJlSGFuZGxlcigvXFwuaHRtbCQvaSwgYXN5bmMgZnVuY3Rpb24oeyB1cmwsIG93bmVyRG9jdW1lbnQsIGZldGNoT3B0aW9ucyB9KSB7XG4gIGxldCB7XG4gICAgcmVzcG9uc2UsXG4gICAgY2FjaGVkLFxuICB9ID0gYXdhaXQgQ29tcG9uZW50VXRpbHMucmVxdWlyZS5jYWxsKFxuICAgIHRoaXMsXG4gICAgdXJsLFxuICAgIHtcbiAgICAgIG1hZ2ljOiAgICAgICAgICBmYWxzZSxcbiAgICAgIG93bmVyRG9jdW1lbnQ6ICBvd25lckRvY3VtZW50IHx8IGRvY3VtZW50LFxuICAgICAgZmV0Y2hPcHRpb25zOiAgIGZldGNoT3B0aW9ucyxcbiAgICB9LFxuICApO1xuXG4gIGlmIChjYWNoZWQpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgbGV0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIENvbXBvbmVudFV0aWxzLmltcG9ydEludG9Eb2N1bWVudEZyb21Tb3VyY2UuY2FsbChcbiAgICB0aGlzLFxuICAgIG93bmVyRG9jdW1lbnQsXG4gICAgb3duZXJEb2N1bWVudC5sb2NhdGlvbixcbiAgICB1cmwsXG4gICAgYm9keSxcbiAgICB7XG4gICAgICBtYWdpYzogICAgICAgIHRydWUsXG4gICAgICBub2RlSGFuZGxlcjogIChub2RlLCB7IGlzSGFuZGxlZCB9KSA9PiB7XG4gICAgICAgIGlmICghaXNIYW5kbGVkICYmIG5vZGUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKVxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICB9LFxuICAgICAgcHJlUHJvY2VzczogICAoeyB0ZW1wbGF0ZSwgY2hpbGRyZW4gfSkgPT4ge1xuICAgICAgICBsZXQgc3RhclRlbXBsYXRlID0gY2hpbGRyZW4uZmluZCgoY2hpbGQpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YUZvciA9IGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1mb3InKTtcbiAgICAgICAgICByZXR1cm4gKElTX1RFTVBMQVRFLnRlc3QoY2hpbGQudGFnTmFtZSkgJiYgVEVNUExBVEVfVEVNUExBVEUudGVzdChkYXRhRm9yKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghc3RhclRlbXBsYXRlKVxuICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcblxuICAgICAgICBsZXQgZGF0YUZvciA9IHN0YXJUZW1wbGF0ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9yJyk7XG4gICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID09PSBzdGFyVGVtcGxhdGUpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgIGlmIChJU19URU1QTEFURS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDx0ZW1wbGF0ZT5cbiAgICAgICAgICAgIGxldCBzdGFyQ2xvbmUgPSBzdGFyVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBpZiAoZGF0YUZvciA9PT0gJyp8JylcbiAgICAgICAgICAgICAgY2hpbGQuY29udGVudC5pbnNlcnRCZWZvcmUoc3RhckNsb25lLCBjaGlsZC5jb250ZW50LmNoaWxkTm9kZXNbMF0gfHwgbnVsbCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNoaWxkLmNvbnRlbnQuYXBwZW5kQ2hpbGQoc3RhckNsb25lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGFyVGVtcGxhdGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdGFyVGVtcGxhdGUpO1xuXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH0sXG4gICAgfSxcbiAgKTtcblxuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5yZWdpc3RlclJlcXVpcmVIYW5kbGVyKC9cXC5qcyQvaSwgYXN5bmMgZnVuY3Rpb24oeyB1cmwsIG93bmVyRG9jdW1lbnQgfSkge1xuICBsZXQgcmVzdWx0ID0gQ29tcG9uZW50VXRpbHMuaW5zZXJ0U2NyaXB0SW50b0hlYWQodXJsLCB7IG93bmVyRG9jdW1lbnQgfSk7XG4gIGNvbnNvbGUubG9nKHsgc2NyaXB0RWxlbWVudDogcmVzdWx0IH0pO1xuICByZXR1cm4gdHJ1ZTtcbn0pO1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlSZXF1aXJlIGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICBzdGF0aWMgcmVnaXN0ZXJIYW5kbGVyID0gcmVnaXN0ZXJSZXF1aXJlSGFuZGxlcjtcblxuICAvKipcbiAgICogT2JzZXJ2ZWQgYXR0cmlidXRlcyBpbmNsdWRpbmcgY2FjaGUgbW9kZSBjb250cm9sLlxuICAgKi9cbiAgc3RhdGljIG9ic2VydmVkQXR0cmlidXRlcyA9IFsgJ3NyYycsICdjYWNoZScgXTtcblxuICAvKipcbiAgICogR2V0IHRoZSBmZXRjaCBvcHRpb25zIGluY2x1ZGluZyBjYWNoZSBtb2RlLlxuICAgKiBUaGUgYGNhY2hlYCBhdHRyaWJ1dGUgY29udHJvbHMgSFRUUCBjYWNoaW5nIGJlaGF2aW9yOlxuICAgKiAtICdkZWZhdWx0JzogQnJvd3NlciB1c2VzIEhUVFAgY2FjaGUgaGVhZGVycyAoQ2FjaGUtQ29udHJvbCwgRVRhZywgZXRjLilcbiAgICogLSAnbm8tc3RvcmUnOiBCeXBhc3MgY2FjaGUgY29tcGxldGVseVxuICAgKiAtICdyZWxvYWQnOiBGZXRjaCBmcmVzaCBidXQgdXBkYXRlIGNhY2hlXG4gICAqIC0gJ25vLWNhY2hlJzogQWx3YXlzIHJldmFsaWRhdGUgd2l0aCBzZXJ2ZXJcbiAgICogLSAnZm9yY2UtY2FjaGUnOiBVc2UgY2FjaGUgaWYgYXZhaWxhYmxlLCBldmVuIGlmIHN0YWxlXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IEZldGNoIG9wdGlvbnMgb2JqZWN0LlxuICAgKi9cbiAgZ2V0RmV0Y2hPcHRpb25zKCkge1xuICAgIGxldCBjYWNoZU1vZGUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnY2FjaGUnKTtcblxuICAgIGlmIChjYWNoZU1vZGUgJiYgL14oZGVmYXVsdHxuby1zdG9yZXxyZWxvYWR8bm8tY2FjaGV8Zm9yY2UtY2FjaGV8b25seS1pZi1jYWNoZWQpJC8udGVzdChjYWNoZU1vZGUpKVxuICAgICAgcmV0dXJuIHsgY2FjaGU6IGNhY2hlTW9kZSB9O1xuXG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgYXN5bmMgbW91bnRlZCgpIHtcbiAgICBzdXBlci5tb3VudGVkKCk7XG5cbiAgICBsZXQgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgICAgbGV0IHVybCAgICAgICAgICAgPSBDb21wb25lbnRVdGlscy5yZXNvbHZlVVJMLmNhbGwodGhpcywgb3duZXJEb2N1bWVudC5sb2NhdGlvbiwgc3JjLCB7IG1hZ2ljOiB0cnVlIH0pO1xuICAgICAgbGV0IGZldGNoT3B0aW9ucyAgPSB0aGlzLmdldEZldGNoT3B0aW9ucygpO1xuXG4gICAgICBmb3IgKGxldCBbIGluZGV4LCBoYW5kbGVyIF0gb2YgUkVRVUlSRV9IQU5ETEVSUy5lbnRyaWVzKCkpIHtcbiAgICAgICAgbGV0IHtcbiAgICAgICAgICBwYXR0ZXJuLFxuICAgICAgICAgIGNhbGxiYWNrLFxuICAgICAgICB9ID0gaGFuZGxlcjtcblxuICAgICAgICBpZiAocGF0dGVybi50ZXN0KHVybCkpIHtcbiAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgY2FsbGJhY2suY2FsbCh0aGlzLCB7IHNyYywgdXJsLCBpbmRleCwgb3duZXJEb2N1bWVudCwgZmV0Y2hPcHRpb25zIH0pO1xuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBcIm15dGhpeC1yZXF1aXJlXCI6IEZhaWxlZCB0byBsb2FkIHNwZWNpZmllZCByZXNvdXJjZTogJHtzcmN9YCwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZldGNoU3JjKCkge1xuICAgIC8vIE5PT1BcbiAgfVxufVxuXG4oZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KSkuTXl0aGl4VUlSZXF1aXJlID0gTXl0aGl4VUlSZXF1aXJlO1xuXG5pZiAodHlwZW9mIGN1c3RvbUVsZW1lbnRzICE9PSAndW5kZWZpbmVkJyAmJiAhY3VzdG9tRWxlbWVudHMuZ2V0KCdteXRoaXgtcmVxdWlyZScpKVxuICBjdXN0b21FbGVtZW50cy5kZWZpbmUoJ215dGhpeC1yZXF1aXJlJywgTXl0aGl4VUlSZXF1aXJlKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW1hZ2ljLW51bWJlcnMgKi9cblxuaW1wb3J0IHsgTXl0aGl4VUlDb21wb25lbnQgfSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuXG4vKlxuTWFueSB0aGFua3MgdG8gU2FnZWUgQ29ud2F5IGZvciB0aGUgZm9sbG93aW5nIENTUyBzcGlubmVyc1xuaHR0cHM6Ly9jb2RlcGVuLmlvL3NhY29ud2F5L3Blbi92WUtZeXJ4XG4qL1xuXG5jb25zdCBTVFlMRV9TSEVFVCA9XG5gXG46aG9zdCB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2l6ZTogMWVtO1xuICB3aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG46aG9zdCguc21hbGwpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zaXplOiBjYWxjKDFlbSAqIDAuNzUpO1xufVxuOmhvc3QoLm1lZGl1bSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNpemU6IGNhbGMoMWVtICogMS41KTtcbn1cbjpob3N0KC5sYXJnZSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNpemU6IGNhbGMoMWVtICogMyk7XG59XG4uc3Bpbm5lci1pdGVtLFxuLnNwaW5uZXItaXRlbTo6YmVmb3JlLFxuLnNwaW5uZXItaXRlbTo6YWZ0ZXIge1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbSB7XG4gIHdpZHRoOiAxMSU7XG4gIGhlaWdodDogNjAlO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1hdWRpby1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjApIGVhc2UtaW4tb3V0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1hdWRpby1hbmltYXRpb24ge1xuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKDAuMjUpO1xuICB9XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgLyAxMCAqIC0zKTtcbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAvIDEwICogLTEpO1xufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMykge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpIC8gMTAgKiAtMik7XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCg0KSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3I0LCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgLyAxMCAqIC0xKTtcbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDUpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjUsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAvIDEwICogLTMpO1xufVxuOmhvc3QoW2tpbmQ9XCJjaXJjbGVcIl0pIC5zcGlubmVyLWl0ZW0ge1xuICAtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3M6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAwLjA3NSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgdG9wOiBjYWxjKDUwJSAtIHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSkgLyAyKTtcbiAgbGVmdDogY2FsYyg1MCUgLSB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpIC8gMik7XG4gIGJvcmRlcjogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgc29saWQgdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1sZWZ0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSBzb2xpZCB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYm9yZGVyLXJpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSBzb2xpZCB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjApIGxpbmVhciBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiB7XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG46aG9zdChba2luZD1cImNpcmNsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtb2YtdHlwZSgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMS4wKTtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYm9yZGVyLXRvcDogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgKiAwLjA3NSkgc29saWQgdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMCkgbGluZWFyIGluZmluaXRlO1xufVxuOmhvc3QoW2tpbmQ9XCJjaXJjbGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLW9mLXR5cGUoMikge1xuICAtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZTogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDAuNyk7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGJvcmRlci1ib3R0b206IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpIHNvbGlkIHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAwLjg3NSkgbGluZWFyIGluZmluaXRlO1xufVxuOmhvc3QoW2tpbmQ9XCJjaXJjbGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLW9mLXR5cGUoMykge1xuICAtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZTogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDAuNCk7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGJvcmRlci10b3A6IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpIHNvbGlkIHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWNpcmNsZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAwLjc1KSBsaW5lYXIgaW5maW5pdGU7XG59XG46aG9zdChba2luZD1cInB1enpsZVwiXSkge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMC4xKSkgcm90YXRlKDQ1ZGVnKTtcbn1cbjpob3N0KFtraW5kPVwicHV6emxlXCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemU6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgLyAyLjUpO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGJvcmRlcjogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDAuMSkgc29saWQgdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG59XG46aG9zdChba2luZD1cInB1enpsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjEgY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiA1LjApIGxpbmVhciBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjEge1xuICAwJSwgOC4zMyUsIDE2LjY2JSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDAlKTtcbiAgfVxuICAyNC45OSUsIDMzLjMyJSwgNDEuNjUlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwJSk7XG4gIH1cbiAgNDkuOTglLCA1OC4zMSUsIDY2LjY0JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMTAwJSwgMTAwJSk7XG4gIH1cbiAgNzQuOTclLCA4My4zMCUsIDkxLjYzJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDEwMCUpO1xuICB9XG59XG46aG9zdChba2luZD1cInB1enpsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMikge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICB0b3A6IDA7XG4gIGxlZnQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjIgY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiA1LjApIGxpbmVhciBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItcHV6emxlLWFuaW1hdGlvbjIge1xuICAwJSwgOC4zMyUsIDkxLjYzJSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCUsIDAlKTtcbiAgfVxuICAxNi42NiUsIDI0Ljk5JSwgMzMuMzIlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMTAwJSk7XG4gIH1cbiAgNDEuNjUlLCA0OS45OCUsIDU4LjMxJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUsIDEwMCUpO1xuICB9XG4gIDY2LjY0JSwgNzQuOTclLCA4My4zMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAwJSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwicHV6emxlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgzKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIHRvcDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgbGVmdDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMyBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDUuMCkgbGluZWFyIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMyB7XG4gIDAlLCA4My4zMCUsIDkxLjYzJSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgMCk7XG4gIH1cbiAgOC4zMyUsIDE2LjY2JSwgMjQuOTklIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgMCk7XG4gIH1cbiAgMzMuMzIlLCA0MS42NSUsIDQ5Ljk4JSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUsIC0xMDAlKTtcbiAgfVxuICA1OC4zMSUsIDY2LjY0JSwgNzQuOTclIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtMTAwJSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwid2F2ZVwiXSkgLnNwaW5uZXItaXRlbSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpIC8gNCk7XG4gIG1pbi13aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgd2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBib3JkZXI6IG5vbmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLXdhdmUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLXdhdmUtYW5pbWF0aW9uIHtcbiAgMCUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg3NSUpO1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC03NSUpO1xuICB9XG59XG46aG9zdChba2luZD1cIndhdmVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyA2ICogLTEpO1xufVxuOmhvc3QoW2tpbmQ9XCJ3YXZlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gNiAqIC0yKTtcbn1cbjpob3N0KFtraW5kPVwid2F2ZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMykge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMywgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDYgKiAtMyk7XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW0ge1xuICB3aWR0aDogMTElO1xuICBoZWlnaHQ6IDQwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItcGlwZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItcGlwZS1hbmltYXRpb24ge1xuICAyNSUge1xuICAgIHRyYW5zZm9ybTogc2NhbGVZKDIpO1xuICB9XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gMTApO1xufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgzKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gMTAgKiAyKTtcbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoNCkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yNCwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDEwICogMyk7XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDUpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjUsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyAxMCAqIDQpO1xufVxuOmhvc3QoW2tpbmQ9XCJkb3RcIl0pIC5zcGlubmVyLWl0ZW0ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogY2FsYyg1MCUgLSB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAvIDIpO1xuICBsZWZ0OiBjYWxjKDUwJSAtIHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpIC8gMik7XG4gIHdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1kb3QtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMy4wKSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItZG90LWFuaW1hdGlvbiB7XG4gIDAlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuMjUpO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwiZG90XCJdKSAuc3Bpbm5lci1pdGVtOm50aC1vZi10eXBlKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbn1cbjpob3N0KFtraW5kPVwiZG90XCJdKSAuc3Bpbm5lci1pdGVtOm50aC1vZi10eXBlKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMy4wKSAvIC0yKTtcbn1cbmA7XG5cbmNvbnN0IEtJTkRTID0ge1xuICAnYXVkaW8nOiAgNSxcbiAgJ2NpcmNsZSc6IDMsXG4gICdkb3QnOiAgICAyLFxuICAncGlwZSc6ICAgNSxcbiAgJ3B1enpsZSc6IDMsXG4gICd3YXZlJzogICAzLFxufTtcblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJU3Bpbm5lciBleHRlbmRzIE15dGhpeFVJQ29tcG9uZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSAnbXl0aGl4LXNwaW5uZXInO1xuXG4gIHNldCBhdHRyJGtpbmQoWyBuZXdWYWx1ZSBdKSB7XG4gICAgdGhpcy5oYW5kbGVLaW5kQXR0cmlidXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIG1vdW50ZWQoKSB7XG4gICAgc3VwZXIubW91bnRlZCgpO1xuXG4gICAgaWYgKCF0aGlzLmRvY3VtZW50SW5pdGlhbGl6ZWQpIHtcbiAgICAgIC8vIGFwcGVuZCB0ZW1wbGF0ZVxuICAgICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICB0aGlzLiRidWlsZCgoeyBURU1QTEFURSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBURU1QTEFURVxuICAgICAgICAgIC5kYXRhRm9yKHRoaXMuc2Vuc2l0aXZlVGFnTmFtZSlcbiAgICAgICAgICAucHJvcCRpbm5lckhUTUwoYDxzdHlsZT4ke1NUWUxFX1NIRUVUfTwvc3R5bGU+YCk7XG4gICAgICB9KS5hcHBlbmRUbyhvd25lckRvY3VtZW50LmJvZHkpO1xuXG4gICAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlID0gdGhpcy5nZXRDb21wb25lbnRUZW1wbGF0ZSgpO1xuICAgICAgdGhpcy5hcHBlbmRUZW1wbGF0ZVRvU2hhZG93RE9NKHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBsZXQga2luZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdraW5kJyk7XG4gICAgaWYgKCFraW5kKSB7XG4gICAgICBraW5kID0gJ3BpcGUnO1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2tpbmQnLCBraW5kKTtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZUtpbmRBdHRyaWJ1dGVDaGFuZ2Uoa2luZCk7XG4gIH1cblxuICBoYW5kbGVLaW5kQXR0cmlidXRlQ2hhbmdlKF9raW5kKSB7XG4gICAgbGV0IGtpbmQgICAgICAgID0gKCcnICsgX2tpbmQpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoS0lORFMsIGtpbmQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFwibXl0aGl4LXNwaW5uZXJcIiB1bmtub3duIFwia2luZFwiIHByb3ZpZGVkOiBcIiR7a2luZH1cIi4gU3VwcG9ydGVkIFwia2luZFwiIGF0dHJpYnV0ZSB2YWx1ZXMgYXJlOiBcInBpcGVcIiwgXCJhdWRpb1wiLCBcImNpcmNsZVwiLCBcInB1enpsZVwiLCBcIndhdmVcIiwgYW5kIFwiZG90XCIuYCk7XG4gICAgICBraW5kID0gJ3BpcGUnO1xuICAgIH1cblxuICAgIHRoaXMuY2hhbmdlU3Bpbm5lckNoaWxkcmVuKEtJTkRTW2tpbmRdKTtcbiAgfVxuXG4gIGJ1aWxkU3Bpbm5lckNoaWxkcmVuKGNvdW50KSB7XG4gICAgbGV0IGNoaWxkcmVuICAgICAgPSBuZXcgQXJyYXkoY291bnQpO1xuICAgIGxldCBvd25lckRvY3VtZW50ID0gKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGxldCBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdzcGlubmVyLWl0ZW0nKTtcblxuICAgICAgY2hpbGRyZW5baV0gPSBlbGVtZW50O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlbGVjdChjaGlsZHJlbik7XG4gIH1cblxuICBjaGFuZ2VTcGlubmVyQ2hpbGRyZW4oY291bnQpIHtcbiAgICB0aGlzLnNlbGVjdCgnLnNwaW5uZXItaXRlbScpLnJlbW92ZSgpO1xuICAgIHRoaXMuYnVpbGRTcGlubmVyQ2hpbGRyZW4oY291bnQpLnByZXBlbmRUbyh0aGlzLnNoYWRvdyk7XG5cbiAgICAvLyBBbHdheXMgYXBwZW5kIHN0eWxlIGFnYWluLCBzb1xuICAgIC8vIHRoYXQgaXQgaXMgdGhlIGxhc3QgY2hpbGQsIGFuZFxuICAgIC8vIGRvZXNuJ3QgbWVzcyB3aXRoIFwibnRoLWNoaWxkXCJcbiAgICAvLyBzZWxlY3RvcnNcbiAgICB0aGlzLnNlbGVjdCgnc3R5bGUnKS5hcHBlbmRUbyh0aGlzLnNoYWRvdyk7XG4gIH1cbn1cblxuTXl0aGl4VUlTcGlubmVyLnJlZ2lzdGVyKCk7XG5cbihnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pKS5NeXRoaXhVSVJlcXVpcmUgPSBNeXRoaXhVSVNwaW5uZXI7XG4iLCJpbXBvcnQge1xuICBNWVRISVhfVFlQRSxcbiAgUVVFUllfRU5HSU5FX1RZUEUsXG4gIFVORklOSVNIRURfREVGSU5JVElPTixcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIFV0aWxzICAgICBmcm9tICcuL3V0aWxzLmpzJztcbmltcG9ydCAqIGFzIEVsZW1lbnRzICBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuaW1wb3J0IHtcbiAgRWxlbWVudERlZmluaXRpb24sXG59IGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG5jb25zdCBJU19JTlRFR0VSID0gL15cXGQrJC87XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBXZSBoYXZlIGFuIEVsZW1lbnQgb3IgYSBEb2N1bWVudFxuICBpZiAodmFsdWUubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFIHx8IHZhbHVlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX05PREUgfHwgdmFsdWUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzU2xvdHRlZChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudClcbiAgICByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KCdzbG90Jyk7XG59XG5cbmZ1bmN0aW9uIGlzTm90U2xvdHRlZChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudClcbiAgICByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gIWVsZW1lbnQuY2xvc2VzdCgnc2xvdCcpO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0Q2xhc3NOYW1lcyguLi5hcmdzKSB7XG4gIGxldCBjbGFzc05hbWVzID0gW10uY29uY2F0KC4uLmFyZ3MpXG4gICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgIC5tYXAoKHBhcnQpID0+ICgnJyArIHBhcnQpLnNwbGl0KC9cXHMrLykpXG4gICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG5cbiAgcmV0dXJuIGNsYXNzTmFtZXM7XG59XG5cbmV4cG9ydCBjbGFzcyBRdWVyeUVuZ2luZSB7XG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGluc3RhbmNlICYmIGluc3RhbmNlW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgaXNFbGVtZW50ICAgID0gaXNFbGVtZW50O1xuICBzdGF0aWMgaXNTbG90dGVkICAgID0gaXNTbG90dGVkO1xuICBzdGF0aWMgaXNOb3RTbG90dGVkID0gaXNOb3RTbG90dGVkO1xuXG4gIHN0YXRpYyBmcm9tID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiBuZXcgUXVlcnlFbmdpbmUoW10sIHsgcm9vdDogKGlzRWxlbWVudCh0aGlzKSkgPyB0aGlzIDogZG9jdW1lbnQsIGNvbnRleHQ6IHRoaXMgfSk7XG5cbiAgICBjb25zdCBnZXRPcHRpb25zID0gKCkgPT4ge1xuICAgICAgbGV0IGJhc2UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgaWYgKEJhc2VVdGlscy5pc1BsYWluT2JqZWN0KGFyZ3NbYXJnSW5kZXhdKSlcbiAgICAgICAgYmFzZSA9IE9iamVjdC5hc3NpZ24oYmFzZSwgYXJnc1thcmdJbmRleCsrXSk7XG5cbiAgICAgIGlmIChhcmdzW2FyZ0luZGV4XSBpbnN0YW5jZW9mIFF1ZXJ5RW5naW5lKVxuICAgICAgICBiYXNlID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCBhcmdzW2FyZ0luZGV4XS5nZXRPcHRpb25zKCkgfHwge30sIGJhc2UpO1xuXG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9O1xuXG4gICAgY29uc3QgZ2V0Um9vdEVsZW1lbnQgPSAob3B0aW9uc1Jvb3QpID0+IHtcbiAgICAgIGlmIChpc0VsZW1lbnQob3B0aW9uc1Jvb3QpKVxuICAgICAgICByZXR1cm4gb3B0aW9uc1Jvb3Q7XG5cbiAgICAgIGlmIChpc0VsZW1lbnQodGhpcykpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICByZXR1cm4gKCh0aGlzICYmIHRoaXMub3duZXJEb2N1bWVudCkgfHwgZG9jdW1lbnQpO1xuICAgIH07XG5cbiAgICBsZXQgYXJnSW5kZXggID0gMDtcbiAgICBsZXQgb3B0aW9ucyAgID0gZ2V0T3B0aW9ucygpO1xuICAgIGxldCByb290ICAgICAgPSBnZXRSb290RWxlbWVudChvcHRpb25zLnJvb3QpO1xuICAgIGxldCBxdWVyeUVuZ2luZTtcblxuICAgIG9wdGlvbnMucm9vdCA9IHJvb3Q7XG4gICAgb3B0aW9ucy5jb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0IHx8IHRoaXM7XG5cbiAgICBpZiAoYXJnc1thcmdJbmRleF0gaW5zdGFuY2VvZiBRdWVyeUVuZ2luZSlcbiAgICAgIHJldHVybiBuZXcgUXVlcnlFbmdpbmUoYXJnc1thcmdJbmRleF0uc2xpY2UoKSwgb3B0aW9ucyk7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcmdzW2FyZ0luZGV4XSkpIHtcbiAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbYXJnSW5kZXggKyAxXSwgJzo6RnVuY3Rpb24nKSlcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGFyZ3NbMV07XG5cbiAgICAgIHF1ZXJ5RW5naW5lID0gbmV3IFF1ZXJ5RW5naW5lKGFyZ3NbYXJnSW5kZXhdLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKEJhc2VVdGlscy5pc1R5cGUoYXJnc1thcmdJbmRleF0sICc6OlN0cmluZycpKSB7XG4gICAgICBvcHRpb25zLnNlbGVjdG9yID0gYXJnc1thcmdJbmRleCsrXTtcblxuICAgICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoYXJnc1thcmdJbmRleF0sICc6OkZ1bmN0aW9uJykpXG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2sgPSBhcmdzW2FyZ0luZGV4KytdO1xuXG4gICAgICBxdWVyeUVuZ2luZSA9IG5ldyBRdWVyeUVuZ2luZShyb290LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5zZWxlY3RvciksIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoQmFzZVV0aWxzLmlzVHlwZShhcmdzW2FyZ0luZGV4XSwgJzo6RnVuY3Rpb24nKSkge1xuICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGFyZ3NbYXJnSW5kZXgrK107XG5cbiAgICAgIGxldCByZXN1bHQgPSBvcHRpb25zLmNhbGxiYWNrLmNhbGwodGhpcywgRWxlbWVudHMuRWxlbWVudEdlbmVyYXRvciwgb3B0aW9ucyk7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzdWx0KSlcbiAgICAgICAgcmVzdWx0ID0gWyByZXN1bHQgXTtcblxuICAgICAgcXVlcnlFbmdpbmUgPSBuZXcgUXVlcnlFbmdpbmUocmVzdWx0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5pbnZva2VDYWxsYmFja3MgIT09IGZhbHNlICYmIHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuIHF1ZXJ5RW5naW5lLm1hcChvcHRpb25zLmNhbGxiYWNrKTtcblxuICAgIHJldHVybiBxdWVyeUVuZ2luZTtcbiAgfTtcblxuICBnZXRFbmdpbmVDbGFzcygpIHtcbiAgICByZXR1cm4gUXVlcnlFbmdpbmU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50cywgX29wdGlvbnMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBRVUVSWV9FTkdJTkVfVFlQRSxcbiAgICAgIH0sXG4gICAgICAnX215dGhpeFVJT3B0aW9ucyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBvcHRpb25zLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICdfbXl0aGl4VUlFbGVtZW50cyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0aGlzLmZpbHRlckFuZENvbnN0cnVjdEVsZW1lbnRzKG9wdGlvbnMuY29udGV4dCwgZWxlbWVudHMpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGxldCByb290UHJveHkgPSBuZXcgUHJveHkodGhpcywge1xuICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHByb3BOYW1lID09PSAnc3ltYm9sJykge1xuICAgICAgICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXTtcbiAgICAgICAgICBlbHNlIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQuX215dGhpeFVJRWxlbWVudHMpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0Ll9teXRoaXhVSUVsZW1lbnRzW3Byb3BOYW1lXTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2xlbmd0aCcpXG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAncHJvdG90eXBlJylcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LnByb3RvdHlwZTtcblxuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdjb25zdHJ1Y3RvcicpXG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5jb25zdHJ1Y3RvcjtcblxuICAgICAgICAvLyBJbmRleCBsb29rdXBcbiAgICAgICAgaWYgKElTX0lOVEVHRVIudGVzdChwcm9wTmFtZSkpXG4gICAgICAgICAgcmV0dXJuIHRhcmdldC5fbXl0aGl4VUlFbGVtZW50c1twcm9wTmFtZV07XG5cbiAgICAgICAgaWYgKHByb3BOYW1lIGluIHRhcmdldClcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXTtcblxuICAgICAgICAvLyBSZWRpcmVjdCBhbnkgYXJyYXkgbWV0aG9kczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gXCJtYWdpY1Byb3BOYW1lXCIgaXMgd2hlbiB0aGVcbiAgICAgICAgLy8gZnVuY3Rpb24gbmFtZSBiZWdpbnMgd2l0aCBcIiRcIixcbiAgICAgICAgLy8gaS5lLiBcIiRmaWx0ZXJcIiwgb3IgXCIkbWFwXCIuIElmXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGNhc2UsIHRoZW4gdGhlIHJldHVyblxuICAgICAgICAvLyB2YWx1ZSB3aWxsIGFsd2F5cyBiZSBjb2VyY2VkIGludG9cbiAgICAgICAgLy8gYSBRdWVyeUVuZ2luZS4gT3RoZXJ3aXNlLCBpdCB3aWxsXG4gICAgICAgIC8vIG9ubHkgYmUgY29lcmNlZCBpbnRvIGEgUXVlcnlFbmdpbmVcbiAgICAgICAgLy8gaWYgRVZFUlkgZWxlbWVudCBpbiB0aGUgcmVzdWx0IGlzXG4gICAgICAgIC8vIGFuIFwiZWxlbWVudHlcIiB0eXBlIHZhbHVlLlxuICAgICAgICBsZXQgbWFnaWNQcm9wTmFtZSA9IChwcm9wTmFtZS5jaGFyQXQoMCkgPT09ICckJykgPyBwcm9wTmFtZS5zdWJzdHJpbmcoMSkgOiBwcm9wTmFtZTtcbiAgICAgICAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGVbbWFnaWNQcm9wTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJheSAgID0gdGFyZ2V0Ll9teXRoaXhVSUVsZW1lbnRzO1xuICAgICAgICAgICAgbGV0IHJlc3VsdCAgPSBhcnJheVttYWdpY1Byb3BOYW1lXSguLi5hcmdzKTtcblxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzdWx0KSAmJiAobWFnaWNQcm9wTmFtZSAhPT0gcHJvcE5hbWUgfHwgcmVzdWx0LmV2ZXJ5KChpdGVtKSA9PiBCYXNlVXRpbHMuaXNUeXBlKGl0ZW0sIEVsZW1lbnREZWZpbml0aW9uLCBOb2RlLCBRdWVyeUVuZ2luZSkpKSkge1xuICAgICAgICAgICAgICBjb25zdCBFbmdpbmVDbGFzcyA9IHRhcmdldC5nZXRFbmdpbmVDbGFzcygpO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEVuZ2luZUNsYXNzKHJlc3VsdCwgdGFyZ2V0LmdldE9wdGlvbnMoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXRbcHJvcE5hbWVdO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByb290UHJveHk7XG4gIH1cblxuICBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9teXRoaXhVSU9wdGlvbnM7XG4gIH1cblxuICBnZXRDb250ZXh0KCkge1xuICAgIGxldCBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMuY29udGV4dDtcbiAgfVxuXG4gIGdldFJvb3QoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcbiAgICByZXR1cm4gb3B0aW9ucy5yb290IHx8IGRvY3VtZW50O1xuICB9XG5cbiAgZ2V0VW5kZXJseWluZ0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0T3duZXJEb2N1bWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSb290KCkub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgfVxuXG4gIGZpbHRlckFuZENvbnN0cnVjdEVsZW1lbnRzKGNvbnRleHQsIGVsZW1lbnRzKSB7XG4gICAgbGV0IGZpbmFsRWxlbWVudHMgPSBBcnJheS5mcm9tKGVsZW1lbnRzKS5mbGF0KEluZmluaXR5KS5tYXAoKF9pdGVtKSA9PiB7XG4gICAgICBpZiAoIV9pdGVtKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGxldCBpdGVtID0gX2l0ZW07XG4gICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIFF1ZXJ5RW5naW5lKVxuICAgICAgICByZXR1cm4gaXRlbS5nZXRVbmRlcmx5aW5nQXJyYXkoKTtcblxuICAgICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoaXRlbSwgTm9kZSkpXG4gICAgICAgIHJldHVybiBpdGVtO1xuXG4gICAgICBpZiAoaXRlbVtVTkZJTklTSEVEX0RFRklOSVRJT05dKVxuICAgICAgICBpdGVtID0gaXRlbSgpO1xuXG4gICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShpdGVtLCAnOjpTdHJpbmcnKSlcbiAgICAgICAgaXRlbSA9IEVsZW1lbnRzLlRlcm0oaXRlbSk7XG4gICAgICBlbHNlIGlmICghQmFzZVV0aWxzLmlzVHlwZShpdGVtLCBFbGVtZW50RGVmaW5pdGlvbikpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgaWYgKCFjb250ZXh0KVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImNvbnRleHRcIiBvcHRpb24gZm9yIFF1ZXJ5RW5naW5lIGlzIHJlcXVpcmVkIHdoZW4gY29uc3RydWN0aW5nIGVsZW1lbnRzLicpO1xuXG4gICAgICByZXR1cm4gaXRlbS5idWlsZCh0aGlzLmdldE93bmVyRG9jdW1lbnQoKSwge1xuICAgICAgICBzY29wZTogVXRpbHMuY3JlYXRlU2NvcGUoY29udGV4dCksXG4gICAgICB9KTtcbiAgICB9KS5mbGF0KEluZmluaXR5KS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGZpbmFsRWxlbWVudHMpKTtcbiAgfVxuXG4gIHNlbGVjdCguLi5hcmdzKSB7XG4gICAgbGV0IGFyZ0luZGV4ICA9IDA7XG4gICAgbGV0IG9wdGlvbnMgICA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgdGhpcy5nZXRPcHRpb25zKCksIChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdChhcmdzW2FyZ0luZGV4XSkpID8gYXJnc1thcmdJbmRleCsrXSA6IHt9KTtcblxuICAgIGlmIChvcHRpb25zLmNvbnRleHQgJiYgdHlwZW9mIG9wdGlvbnMuY29udGV4dC4kID09PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuIG9wdGlvbnMuY29udGV4dC4kLmNhbGwob3B0aW9ucy5jb250ZXh0LCBvcHRpb25zLCAuLi5hcmdzLnNsaWNlKGFyZ0luZGV4KSk7XG5cbiAgICBjb25zdCBFbmdpbmVDbGFzcyA9IHRoaXMuZ2V0RW5naW5lQ2xhc3MoKTtcbiAgICByZXR1cm4gRW5naW5lQ2xhc3MuZnJvbS5jYWxsKG9wdGlvbnMuY29udGV4dCB8fCB0aGlzLCBvcHRpb25zLCAuLi5hcmdzLnNsaWNlKGFyZ0luZGV4KSk7XG4gIH1cblxuICAqZW50cmllcygpIHtcbiAgICBsZXQgZWxlbWVudHMgPSB0aGlzLl9teXRoaXhVSUVsZW1lbnRzO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIHlpZWxkKFtpLCBlbGVtZW50XSk7XG4gICAgfVxuICB9XG5cbiAgKmtleXMoKSB7XG4gICAgZm9yIChsZXQgWyBrZXksIF8gXSBvZiB0aGlzLmVudHJpZXMoKSlcbiAgICAgIHlpZWxkIGtleTtcbiAgfVxuXG4gICp2YWx1ZXMoKSB7XG4gICAgZm9yIChsZXQgWyBfLCB2YWx1ZSBdIG9mIHRoaXMuZW50cmllcygpKVxuICAgICAgeWllbGQgdmFsdWU7XG4gIH1cblxuICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIHlpZWxkICp0aGlzLnZhbHVlcygpO1xuICB9XG5cbiAgZmlyc3QoY291bnQpIHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCB8fCBjb3VudCA9PT0gMCB8fCBPYmplY3QuaXMoY291bnQsIE5hTikgfHwgIUJhc2VVdGlscy5pc1R5cGUoY291bnQsICc6Ok51bWJlcicpKVxuICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0KFsgdGhpcy5fbXl0aGl4VUlFbGVtZW50c1swXSBdKTtcblxuICAgIHJldHVybiB0aGlzLnNlbGVjdCh0aGlzLl9teXRoaXhVSUVsZW1lbnRzLnNsaWNlKE1hdGguYWJzKGNvdW50KSkpO1xuICB9XG5cbiAgbGFzdChjb3VudCkge1xuICAgIGlmIChjb3VudCA9PSBudWxsIHx8IGNvdW50ID09PSAwIHx8IE9iamVjdC5pcyhjb3VudCwgTmFOKSB8fCAhQmFzZVV0aWxzLmlzVHlwZShjb3VudCwgJzo6TnVtYmVyJykpXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3QoWyB0aGlzLl9teXRoaXhVSUVsZW1lbnRzW3RoaXMuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoIC0gMV0gXSk7XG5cbiAgICByZXR1cm4gdGhpcy5zZWxlY3QodGhpcy5fbXl0aGl4VUlFbGVtZW50cy5zbGljZShNYXRoLmFicyhjb3VudCkgKiAtMSkpO1xuICB9XG5cbiAgYWRkKC4uLmVsZW1lbnRzKSB7XG4gICAgY29uc3QgRW5naW5lQ2xhc3MgPSB0aGlzLmdldEVuZ2luZUNsYXNzKCk7XG4gICAgcmV0dXJuIG5ldyBFbmdpbmVDbGFzcyh0aGlzLnNsaWNlKCkuY29uY2F0KC4uLmVsZW1lbnRzKSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICB9XG5cbiAgc3VidHJhY3QoLi4uZWxlbWVudHMpIHtcbiAgICBsZXQgc2V0ID0gbmV3IFNldChlbGVtZW50cyk7XG5cbiAgICBjb25zdCBFbmdpbmVDbGFzcyA9IHRoaXMuZ2V0RW5naW5lQ2xhc3MoKTtcbiAgICByZXR1cm4gbmV3IEVuZ2luZUNsYXNzKHRoaXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gIXNldC5oYXMoaXRlbSk7XG4gICAgfSksIHRoaXMuZ2V0T3B0aW9ucygpKTtcbiAgfVxuXG4gIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLnZhbHVlcygpKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudCh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB2YWx1ZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB0aGlzLnZhbHVlcygpKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudCh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB2YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYXBwZW5kVG8oc2VsZWN0b3JPckVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuX215dGhpeFVJRWxlbWVudHMubGVuZ3RoKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBsZXQgZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNlbGVjdG9yT3JFbGVtZW50LCAnOjpTdHJpbmcnKSlcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmdldFJvb3QoKS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTtcblxuICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuX215dGhpeFVJRWxlbWVudHMpXG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfVxuXG4gIHByZXBlbmRUbyhzZWxlY3Rvck9yRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGgpXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGxldCBlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoc2VsZWN0b3JPckVsZW1lbnQsICc6OlN0cmluZycpKVxuICAgICAgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdCgpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpO1xuXG4gICAgbGV0IGZpcnN0Q2hpbGQgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF0gfHwgbnVsbDtcbiAgICBmb3IgKGxldCBjaGlsZCBvZiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzKVxuICAgICAgZWxlbWVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIGZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgaW5zZXJ0SW50byhzZWxlY3Rvck9yRWxlbWVudCwgcmVmZXJlbmNlTm9kZSkge1xuICAgIGlmICghdGhpcy5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGgpXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGxldCBlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoc2VsZWN0b3JPckVsZW1lbnQsICc6OlN0cmluZycpKVxuICAgICAgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdCgpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpO1xuXG4gICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLmdldE93bmVyRG9jdW1lbnQoKTtcbiAgICBsZXQgc291cmNlICAgICAgICA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBsZXQgZnJhZ21lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuX215dGhpeFVJRWxlbWVudHMpXG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcblxuICAgICAgc291cmNlID0gWyBmcmFnbWVudCBdO1xuICAgIH1cblxuICAgIGVsZW1lbnQuaW5zZXJ0KHNvdXJjZVswXSwgcmVmZXJlbmNlTm9kZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlcGxhY2VDaGlsZHJlbk9mKHNlbGVjdG9yT3JFbGVtZW50KSB7XG4gICAgbGV0IGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShzZWxlY3Rvck9yRWxlbWVudCwgJzo6U3RyaW5nJykpXG4gICAgICBlbGVtZW50ID0gdGhpcy5nZXRSb290KCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk7XG5cbiAgICB3aGlsZSAoZWxlbWVudC5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcblxuICAgIHJldHVybiB0aGlzLmFwcGVuZFRvKGVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5fbXl0aGl4VUlFbGVtZW50cykge1xuICAgICAgaWYgKG5vZGUgJiYgbm9kZS5wYXJlbnROb2RlKVxuICAgICAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbGFzc0xpc3Qob3BlcmF0aW9uLCAuLi5hcmdzKSB7XG4gICAgbGV0IGNsYXNzTmFtZXMgPSBjb2xsZWN0Q2xhc3NOYW1lcyhhcmdzKTtcbiAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMuX215dGhpeFVJRWxlbWVudHMpIHtcbiAgICAgIGlmIChub2RlICYmIG5vZGUuY2xhc3NMaXN0KSB7XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICd0b2dnbGUnKVxuICAgICAgICAgIGNsYXNzTmFtZXMuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiBub2RlLmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBub2RlLmNsYXNzTGlzdFtvcGVyYXRpb25dKC4uLmNsYXNzTmFtZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkQ2xhc3MoLi4uY2xhc3NOYW1lcykge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdCgnYWRkJywgLi4uY2xhc3NOYW1lcyk7XG4gIH1cblxuICByZW1vdmVDbGFzcyguLi5jbGFzc05hbWVzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0KCdyZW1vdmUnLCAuLi5jbGFzc05hbWVzKTtcbiAgfVxuXG4gIHRvZ2dsZUNsYXNzKC4uLmNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QoJ3RvZ2dsZScsIC4uLmNsYXNzTmFtZXMpO1xuICB9XG5cbiAgc2xvdHRlZCh5ZXNObykge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fCB5ZXNObykgPyBpc1Nsb3R0ZWQgOiBpc05vdFNsb3R0ZWQpO1xuICB9XG5cbiAgc2xvdChzbG90TmFtZSkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5zbG90ID09PSBzbG90TmFtZSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGlmIChlbGVtZW50LmNsb3Nlc3QoYHNsb3RbbmFtZT1cIiR7c2xvdE5hbWUucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpfVwiXWApKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG5cbihnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pKS5RdWVyeUVuZ2luZSA9IFF1ZXJ5RW5naW5lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbWFnaWMtbnVtYmVycyAqL1xuXG4vKlxuTWFueSB0aGFua3MgdG8gR2VyYWludCBMdWZmIGZvciB0aGUgZm9sbG93aW5nXG5cbmh0dHBzOi8vZ2l0aHViLmNvbS9nZXJhaW50bHVmZi9zaGEyNTYvXG4qL1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBTSEEyNTZcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIFNIQTI1NiBoYXNoaW5nIGZ1bmN0aW9uXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogaW5wdXRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogSW5wdXQgc3RyaW5nXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIFNIQTI1NiBoYXNoIG9mIHRoZSBwcm92aWRlZCBgaW5wdXRgLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDp3YXJuaW5nOiBUaGlzIGlzIGEgY3VzdG9tIGJha2VkIFNIQTI1NiBoYXNoaW5nIGZ1bmN0aW9uLCBtaW5pbWl6ZWQgZm9yIHNpemUuXG4gKiAgICAgSXQgbWF5IGJlIGluY29tcGxldGUsIGFuZCBpdCBpcyBzdHJvbmdseSByZWNvbW1lbmRlZCB0aGF0IHlvdSAqKkRPIE5PVCoqIHVzZSB0aGlzXG4gKiAgICAgZm9yIGFueXRoaW5nIHJlbGF0ZWQgdG8gc2VjdXJpdHkuXG4gKiAgIC0gfFxuICogICAgIDp3YXJuaW5nOiBSZWFkIGFsbCB0aGUgbm90ZXMsIGFuZCB1c2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uLlxuICogICAtIHxcbiAqICAgICA6aW5mbzogVGhpcyBtZXRob2QgaGFzIGJlZW4gbW9kaWZpZWQgc2xpZ2h0bHkgZnJvbSB0aGUgb3JpZ2luYWwgdG8gKm5vdCogYmFpbCB3aGVuXG4gKiAgICAgdW5pY29kZSBjaGFyYWN0ZXJzIGFyZSBkZXRlY3RlZC4gVGhlcmUgaXMgYSBkZWNlbnQgY2hhbmNlIHRoYXQtLWdpdmVuIGNlcnRhaW5cbiAqICAgICBpbnB1dC0tdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYW4gaW52YWxpZCBTSEEyNTYgaGFzaC5cIlxuICogICAtIHxcbiAqICAgICA6aW5mbzogTXl0aGl4IFVJIHVzZXMgdGhpcyBtZXRob2Qgc2ltcGx5IHRvIGdlbmVyYXRlIGNvbnNpc3RlbnQgSURzLlxuICogICAtIHxcbiAqICAgICA6aGVhcnQ6IE1hbnkgdGhhbmtzIHRvIHRoZSBhdXRob3IgW0dlcmFpbnQgTHVmZl0oaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL3NoYTI1Ni8pXG4gKiAgICAgZm9yIHRoaXMgbWV0aG9kIVxuICovXG5leHBvcnQgZnVuY3Rpb24gU0hBMjU2KF9pbnB1dCkge1xuICBsZXQgaW5wdXQgPSBfaW5wdXQ7XG5cbiAgbGV0IG1hdGhQb3cgPSBNYXRoLnBvdztcbiAgbGV0IG1heFdvcmQgPSBtYXRoUG93KDIsIDMyKTtcbiAgbGV0IGxlbmd0aFByb3BlcnR5ID0gJ2xlbmd0aCc7XG4gIGxldCBpOyBsZXQgajsgLy8gVXNlZCBhcyBhIGNvdW50ZXIgYWNyb3NzIHRoZSB3aG9sZSBmaWxlXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBsZXQgd29yZHMgPSBbXTtcbiAgbGV0IGFzY2lpQml0TGVuZ3RoID0gaW5wdXRbbGVuZ3RoUHJvcGVydHldICogODtcblxuICAvLyogY2FjaGluZyByZXN1bHRzIGlzIG9wdGlvbmFsIC0gcmVtb3ZlL2FkZCBzbGFzaCBmcm9tIGZyb250IG9mIHRoaXMgbGluZSB0byB0b2dnbGVcbiAgLy8gSW5pdGlhbCBoYXNoIHZhbHVlOiBmaXJzdCAzMiBiaXRzIG9mIHRoZSBmcmFjdGlvbmFsIHBhcnRzIG9mIHRoZSBzcXVhcmUgcm9vdHMgb2YgdGhlIGZpcnN0IDggcHJpbWVzXG4gIC8vICh3ZSBhY3R1YWxseSBjYWxjdWxhdGUgdGhlIGZpcnN0IDY0LCBidXQgZXh0cmEgdmFsdWVzIGFyZSBqdXN0IGlnbm9yZWQpXG4gIGxldCBoYXNoID0gU0hBMjU2LmggPSBTSEEyNTYuaCB8fCBbXTtcbiAgLy8gUm91bmQgY29uc3RhbnRzOiBmaXJzdCAzMiBiaXRzIG9mIHRoZSBmcmFjdGlvbmFsIHBhcnRzIG9mIHRoZSBjdWJlIHJvb3RzIG9mIHRoZSBmaXJzdCA2NCBwcmltZXNcbiAgbGV0IGsgPSBTSEEyNTYuayA9IFNIQTI1Ni5rIHx8IFtdO1xuICBsZXQgcHJpbWVDb3VudGVyID0ga1tsZW5ndGhQcm9wZXJ0eV07XG4gIC8qL1xuICAgIGxldCBoYXNoID0gW10sIGsgPSBbXTtcbiAgICBsZXQgcHJpbWVDb3VudGVyID0gMDtcbiAgICAvLyovXG5cbiAgbGV0IGlzQ29tcG9zaXRlID0ge307XG4gIGZvciAobGV0IGNhbmRpZGF0ZSA9IDI7IHByaW1lQ291bnRlciA8IDY0OyBjYW5kaWRhdGUrKykge1xuICAgIGlmICghaXNDb21wb3NpdGVbY2FuZGlkYXRlXSkge1xuICAgICAgZm9yIChpID0gMDsgaSA8IDMxMzsgaSArPSBjYW5kaWRhdGUpXG4gICAgICAgIGlzQ29tcG9zaXRlW2ldID0gY2FuZGlkYXRlO1xuXG4gICAgICBoYXNoW3ByaW1lQ291bnRlcl0gPSAobWF0aFBvdyhjYW5kaWRhdGUsIDAuNSkgKiBtYXhXb3JkKSB8IDA7XG4gICAgICBrW3ByaW1lQ291bnRlcisrXSA9IChtYXRoUG93KGNhbmRpZGF0ZSwgMSAvIDMpICogbWF4V29yZCkgfCAwO1xuICAgIH1cbiAgfVxuXG4gIGlucHV0ICs9ICdcXHg4MCc7IC8vIEFwcGVuZCDGhycgYml0IChwbHVzIHplcm8gcGFkZGluZylcbiAgd2hpbGUgKGlucHV0W2xlbmd0aFByb3BlcnR5XSAlIDY0IC0gNTYpXG4gICAgaW5wdXQgKz0gJ1xceDAwJzsgLy8gTW9yZSB6ZXJvIHBhZGRpbmdcblxuICBmb3IgKGkgPSAwOyBpIDwgaW5wdXRbbGVuZ3RoUHJvcGVydHldOyBpKyspIHtcbiAgICBqID0gaW5wdXQuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoaiA+PiA4KVxuICAgICAgcmV0dXJuOyAvLyBBU0NJSSBjaGVjazogb25seSBhY2NlcHQgY2hhcmFjdGVycyBpbiByYW5nZSAwLTI1NVxuICAgIHdvcmRzW2kgPj4gMl0gfD0gaiA8PCAoKDMgLSBpKSAlIDQpICogODtcbiAgfVxuXG4gIHdvcmRzW3dvcmRzW2xlbmd0aFByb3BlcnR5XV0gPSAoKGFzY2lpQml0TGVuZ3RoIC8gbWF4V29yZCkgfCAwKTtcbiAgd29yZHNbd29yZHNbbGVuZ3RoUHJvcGVydHldXSA9IChhc2NpaUJpdExlbmd0aCk7XG5cbiAgLy8gcHJvY2VzcyBlYWNoIGNodW5rXG4gIGZvciAoaiA9IDA7IGogPCB3b3Jkc1tsZW5ndGhQcm9wZXJ0eV07KSB7XG4gICAgbGV0IHcgPSB3b3Jkcy5zbGljZShqLCBqICs9IDE2KTsgLy8gVGhlIG1lc3NhZ2UgaXMgZXhwYW5kZWQgaW50byA2NCB3b3JkcyBhcyBwYXJ0IG9mIHRoZSBpdGVyYXRpb25cbiAgICBsZXQgb2xkSGFzaCA9IGhhc2g7XG5cbiAgICAvLyBUaGlzIGlzIG5vdyB0aGUgdW5kZWZpbmVkd29ya2luZyBoYXNoXCIsIG9mdGVuIGxhYmVsbGVkIGFzIHZhcmlhYmxlcyBhLi4uZ1xuICAgIC8vICh3ZSBoYXZlIHRvIHRydW5jYXRlIGFzIHdlbGwsIG90aGVyd2lzZSBleHRyYSBlbnRyaWVzIGF0IHRoZSBlbmQgYWNjdW11bGF0ZVxuICAgIGhhc2ggPSBoYXNoLnNsaWNlKDAsIDgpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IDY0OyBpKyspIHtcbiAgICAgIC8vIEV4cGFuZCB0aGUgbWVzc2FnZSBpbnRvIDY0IHdvcmRzXG4gICAgICAvLyBVc2VkIGJlbG93IGlmXG4gICAgICBsZXQgdzE1ID0gd1tpIC0gMTVdOyBsZXQgdzIgPSB3W2kgLSAyXTtcblxuICAgICAgLy8gSXRlcmF0ZVxuICAgICAgbGV0IGEgPSBoYXNoWzBdOyBsZXQgZSA9IGhhc2hbNF07XG4gICAgICBsZXQgdGVtcDEgPSBoYXNoWzddXG4gICAgICAgICAgICAgICAgKyAoKChlID4+PiA2KSB8IChlIDw8IDI2KSkgXiAoKGUgPj4+IDExKSB8IChlIDw8IDIxKSkgXiAoKGUgPj4+IDI1KSB8IChlIDw8IDcpKSkgLy8gUzFcbiAgICAgICAgICAgICAgICArICgoZSAmIGhhc2hbNV0pIF4gKCh+ZSkgJiBoYXNoWzZdKSkgLy8gY2hcbiAgICAgICAgICAgICAgICArIGtbaV1cbiAgICAgICAgICAgICAgICAvLyBFeHBhbmQgdGhlIG1lc3NhZ2Ugc2NoZWR1bGUgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgKyAod1tpXSA9IChpIDwgMTYpID8gd1tpXSA6IChcbiAgICAgICAgICAgICAgICAgIHdbaSAtIDE2XVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAoKCh3MTUgPj4+IDcpIHwgKHcxNSA8PCAyNSkpIF4gKCh3MTUgPj4+IDE4KSB8ICh3MTUgPDwgMTQpKSBeICh3MTUgPj4+IDMpKSAvLyBzMFxuICAgICAgICAgICAgICAgICAgICAgICAgKyB3W2kgLSA3XVxuICAgICAgICAgICAgICAgICAgICAgICAgKyAoKCh3MiA+Pj4gMTcpIHwgKHcyIDw8IDE1KSkgXiAoKHcyID4+PiAxOSkgfCAodzIgPDwgMTMpKSBeICh3MiA+Pj4gMTApKSAvLyBzMVxuICAgICAgICAgICAgICAgICkgfCAwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgIC8vIFRoaXMgaXMgb25seSB1c2VkIG9uY2UsIHNvICpjb3VsZCogYmUgbW92ZWQgYmVsb3csIGJ1dCBpdCBvbmx5IHNhdmVzIDQgYnl0ZXMgYW5kIG1ha2VzIHRoaW5ncyB1bnJlYWRibGVcbiAgICAgIGxldCB0ZW1wMiA9ICgoKGEgPj4+IDIpIHwgKGEgPDwgMzApKSBeICgoYSA+Pj4gMTMpIHwgKGEgPDwgMTkpKSBeICgoYSA+Pj4gMjIpIHwgKGEgPDwgMTApKSkgLy8gUzBcbiAgICAgICAgICAgICAgICArICgoYSAmIGhhc2hbMV0pIF4gKGEgJiBoYXNoWzJdKSBeIChoYXNoWzFdICYgaGFzaFsyXSkpOyAvLyBtYWpcblxuICAgICAgaGFzaCA9IFsodGVtcDEgKyB0ZW1wMikgfCAwXS5jb25jYXQoaGFzaCk7IC8vIFdlIGRvbid0IGJvdGhlciB0cmltbWluZyBvZmYgdGhlIGV4dHJhIG9uZXMsIHRoZXkncmUgaGFybWxlc3MgYXMgbG9uZyBhcyB3ZSdyZSB0cnVuY2F0aW5nIHdoZW4gd2UgZG8gdGhlIHNsaWNlKClcbiAgICAgIGhhc2hbNF0gPSAoaGFzaFs0XSArIHRlbXAxKSB8IDA7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDg7IGkrKylcbiAgICAgIGhhc2hbaV0gPSAoaGFzaFtpXSArIG9sZEhhc2hbaV0pIHwgMDtcbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBmb3IgKGogPSAzOyBqICsgMTsgai0tKSB7XG4gICAgICBsZXQgYiA9IChoYXNoW2ldID4+IChqICogOCkpICYgMjU1O1xuICAgICAgcmVzdWx0ICs9ICgoYiA8IDE2KSA/IDAgOiAnJykgKyBiLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgYGltcG9ydCB7IFN0eWxlU2hlZXRNYW5hZ2VyIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBVdGlsaXR5IGZvciBtYW5hZ2luZyBDb25zdHJ1Y3RhYmxlIFN0eWxlc2hlZXRzIGFjcm9zcyBjb21wb25lbnRzLlxuICogICBQcm92aWRlcyBlZmZpY2llbnQgc3R5bGUgc2hhcmluZyB0aHJvdWdoIHRoZSBgYWRvcHRlZFN0eWxlU2hlZXRzYCBBUEksXG4gKiAgIHdpdGggYXV0b21hdGljIGZhbGxiYWNrIGZvciBvbGRlciBicm93c2Vycy5cbiAqXG4gKiAgIEJyb3dzZXIgU3VwcG9ydCAoQmFzZWxpbmUgc2luY2UgTWFyY2ggMjAyMyk6XG4gKiAgIC0gQ2hyb21lIDczKywgRmlyZWZveCAxMDErLCBTYWZhcmkgMTYuNCssIEVkZ2UgNzkrXG4gKlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBTdHlsZVNoZWV0TWFuYWdlciB9IGZyb20gJ215dGhpeC11aS1jb3JlJztcbiAqXG4gKiAgICAgLy8gUmVnaXN0ZXIgYSBzaGFyZWQgc3R5bGVzaGVldFxuICogICAgIFN0eWxlU2hlZXRNYW5hZ2VyLnJlZ2lzdGVyKCd0aGVtZScsIGBcbiAqICAgICAgIDpob3N0IHtcbiAqICAgICAgICAgLS1wcmltYXJ5LWNvbG9yOiBibHVlO1xuICogICAgICAgICAtLXNlY29uZGFyeS1jb2xvcjogZ3JlZW47XG4gKiAgICAgICB9XG4gKiAgICAgYCk7XG4gKlxuICogICAgIC8vIEFkb3B0IGluIGEgc2hhZG93IHJvb3RcbiAqICAgICBTdHlsZVNoZWV0TWFuYWdlci5hZG9wdCh0aGlzLnNoYWRvd1Jvb3QsIFsndGhlbWUnXSk7XG4gKiAgICAgYGBgXG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICAvLyBJbiBhIGNvbXBvbmVudFxuICogICAgIGNsYXNzIE15Q29tcG9uZW50IGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICogICAgICAgc3RhdGljIHNoYXJlZFN0eWxlcyA9IFsndGhlbWUnLCAndHlwb2dyYXBoeSddO1xuICpcbiAqICAgICAgIGNyZWF0ZVNoYWRvd0RPTSgpIHtcbiAqICAgICAgICAgbGV0IHNoYWRvdyA9IHN1cGVyLmNyZWF0ZVNoYWRvd0RPTSgpO1xuICogICAgICAgICAvLyBzaGFyZWRTdHlsZXMgYXJlIGF1dG9tYXRpY2FsbHkgYWRvcHRlZFxuICogICAgICAgICByZXR1cm4gc2hhZG93O1xuICogICAgICAgfVxuICogICAgIH1cbiAqICAgICBgYGBcbiAqL1xuXG4vLyBDYWNoZSBmb3IgY29uc3RydWN0ZWQgc3R5bGVzaGVldHMgYnkgbmFtZVxuY29uc3QgU1RZTEVTSEVFVF9DQUNIRSA9IG5ldyBNYXAoKTtcblxuLy8gQ2FjaGUgZm9yIHN0eWxlc2hlZXRzIGJ5IGNvbnRlbnQgaGFzaCAoZm9yIGRlZHVwbGljYXRpb24pXG5jb25zdCBDT05URU5UX0hBU0hfQ0FDSEUgPSBuZXcgTWFwKCk7XG5cbi8vIENoZWNrIGlmIENvbnN0cnVjdGFibGUgU3R5bGVzaGVldHMgYXJlIHN1cHBvcnRlZFxuY29uc3Qgc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMgPSAoKCkgPT4ge1xuICB0cnkge1xuICAgIG5ldyBDU1NTdHlsZVNoZWV0KCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59KSgpO1xuXG4vKipcbiAqIFNpbXBsZSBoYXNoIGZ1bmN0aW9uIGZvciBzdHlsZXNoZWV0IGNvbnRlbnQgZGVkdXBsaWNhdGlvbi5cbiAqL1xuY29uc3QgaGFzaENvbnRlbnQgPSAoY29udGVudCkgPT4ge1xuICBsZXQgaGFzaCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjaGFyID0gY29udGVudC5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNoYXI7XG4gICAgaGFzaCA9IGhhc2ggJiBoYXNoOyAvLyBDb252ZXJ0IHRvIDMyLWJpdCBpbnRlZ2VyXG4gIH1cbiAgcmV0dXJuIGhhc2gudG9TdHJpbmcoMTYpO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogaXNTdXBwb3J0ZWRcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQ2hlY2sgaWYgQ29uc3RydWN0YWJsZSBTdHlsZXNoZWV0cyBhcmUgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47IFRydWUgaWYgc3VwcG9ydGVkLlxuICovXG5cbi8qKlxuICogQ2hlY2sgaWYgQ29uc3RydWN0YWJsZSBTdHlsZXNoZWV0cyBhcmUgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBDb25zdHJ1Y3RhYmxlIFN0eWxlc2hlZXRzIGFyZSBzdXBwb3J0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZCA9ICgpID0+IHN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzO1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiByZWdpc3RlclxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBSZWdpc3RlciBhIHN0eWxlc2hlZXQgYnkgbmFtZSBmb3IgbGF0ZXIgYWRvcHRpb24uXG4gKiAgIElmIHRoZSBzYW1lIGNvbnRlbnQgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIHVuZGVyIGEgZGlmZmVyZW50IG5hbWUsXG4gKiAgIHRoZSBzYW1lIENTU1N0eWxlU2hlZXQgaW5zdGFuY2Ugd2lsbCBiZSByZXVzZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbmFtZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgdW5pcXVlIG5hbWUgZm9yIHRoaXMgc3R5bGVzaGVldC5cbiAqICAgLSBuYW1lOiBjc3NUZXh0XG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBDU1MgY29udGVudCBvZiB0aGUgc3R5bGVzaGVldC5cbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgT3B0aW9ucyBmb3IgcmVnaXN0cmF0aW9uLlxuICogICAgICAgLSBgcmVwbGFjZWA6IElmIHRydWUsIHJlcGxhY2VzIGV4aXN0aW5nIHJlZ2lzdHJhdGlvbiAoZGVmYXVsdDogZmFsc2UpLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBDU1NTdHlsZVNoZWV0IHwgbnVsbDsgVGhlIGNvbnN0cnVjdGVkIHN0eWxlc2hlZXQsIG9yIG51bGwgaWYgbm90IHN1cHBvcnRlZC5cbiAqXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIFN0eWxlU2hlZXRNYW5hZ2VyLnJlZ2lzdGVyKCd0aGVtZScsIGBcbiAqICAgICAgIDpob3N0IHtcbiAqICAgICAgICAgLS1wcmltYXJ5LWNvbG9yOiAjMDA3YmZmO1xuICogICAgICAgfVxuICogICAgIGApO1xuICogICAgIGBgYFxuICovXG5cbi8qKlxuICogUmVnaXN0ZXIgYSBzdHlsZXNoZWV0IGJ5IG5hbWUgZm9yIGxhdGVyIGFkb3B0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgdW5pcXVlIG5hbWUgZm9yIHRoaXMgc3R5bGVzaGVldC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3NUZXh0IC0gVGhlIENTUyBjb250ZW50IG9mIHRoZSBzdHlsZXNoZWV0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIE9wdGlvbnMgZm9yIHJlZ2lzdHJhdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucmVwbGFjZT1mYWxzZV0gLSBJZiB0cnVlLCByZXBsYWNlcyBleGlzdGluZyByZWdpc3RyYXRpb24uXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVTaGVldHxudWxsfSBUaGUgY29uc3RydWN0ZWQgc3R5bGVzaGVldCwgb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxuICovXG5leHBvcnQgY29uc3QgcmVnaXN0ZXIgPSAobmFtZSwgY3NzVGV4dCwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICghc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gQ2hlY2sgaWYgYWxyZWFkeSByZWdpc3RlcmVkIChhbmQgbm90IHJlcGxhY2luZylcbiAgaWYgKFNUWUxFU0hFRVRfQ0FDSEUuaGFzKG5hbWUpICYmICFvcHRpb25zLnJlcGxhY2UpXG4gICAgcmV0dXJuIFNUWUxFU0hFRVRfQ0FDSEUuZ2V0KG5hbWUpO1xuXG4gIC8vIENoZWNrIGZvciBjb250ZW50IGRlZHVwbGljYXRpb25cbiAgbGV0IGNvbnRlbnRIYXNoID0gaGFzaENvbnRlbnQoY3NzVGV4dCk7XG4gIGxldCBleGlzdGluZ1NoZWV0ID0gQ09OVEVOVF9IQVNIX0NBQ0hFLmdldChjb250ZW50SGFzaCk7XG5cbiAgaWYgKGV4aXN0aW5nU2hlZXQpIHtcbiAgICBTVFlMRVNIRUVUX0NBQ0hFLnNldChuYW1lLCBleGlzdGluZ1NoZWV0KTtcbiAgICByZXR1cm4gZXhpc3RpbmdTaGVldDtcbiAgfVxuXG4gIC8vIENyZWF0ZSBuZXcgc3R5bGVzaGVldFxuICBsZXQgc2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpO1xuICBzaGVldC5yZXBsYWNlU3luYyhjc3NUZXh0KTtcblxuICBTVFlMRVNIRUVUX0NBQ0hFLnNldChuYW1lLCBzaGVldCk7XG4gIENPTlRFTlRfSEFTSF9DQUNIRS5zZXQoY29udGVudEhhc2gsIHNoZWV0KTtcblxuICByZXR1cm4gc2hlZXQ7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBnZXRcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgR2V0IGEgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0IGJ5IG5hbWUuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbmFtZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQ1NTU3R5bGVTaGVldCB8IHVuZGVmaW5lZDsgVGhlIHN0eWxlc2hlZXQsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cblxuLyoqXG4gKiBHZXQgYSByZWdpc3RlcmVkIHN0eWxlc2hlZXQgYnkgbmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVTaGVldHx1bmRlZmluZWR9IFRoZSBzdHlsZXNoZWV0LCBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICovXG5leHBvcnQgY29uc3QgZ2V0ID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIFNUWUxFU0hFRVRfQ0FDSEUuZ2V0KG5hbWUpO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogaGFzXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIENoZWNrIGlmIGEgc3R5bGVzaGVldCBpcyByZWdpc3RlcmVkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG5hbWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47IFRydWUgaWYgdGhlIHN0eWxlc2hlZXQgaXMgcmVnaXN0ZXJlZC5cbiAqL1xuXG4vKipcbiAqIENoZWNrIGlmIGEgc3R5bGVzaGVldCBpcyByZWdpc3RlcmVkLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzdHlsZXNoZWV0IGlzIHJlZ2lzdGVyZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBoYXMgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gU1RZTEVTSEVFVF9DQUNIRS5oYXMobmFtZSk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiB1bnJlZ2lzdGVyXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIFVucmVnaXN0ZXIgYSBzdHlsZXNoZWV0IGJ5IG5hbWUuXG4gKiAgIE5vdGU6IFRoaXMgZG9lcyBub3QgcmVtb3ZlIHRoZSBzdHlsZXNoZWV0IGZyb20gc2hhZG93IHJvb3RzIHRoYXQgaGF2ZSBhbHJlYWR5IGFkb3B0ZWQgaXQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbmFtZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjsgVHJ1ZSBpZiB0aGUgc3R5bGVzaGVldCB3YXMgdW5yZWdpc3RlcmVkLlxuICovXG5cbi8qKlxuICogVW5yZWdpc3RlciBhIHN0eWxlc2hlZXQgYnkgbmFtZS5cbiAqIE5vdGU6IFRoaXMgZG9lcyBub3QgcmVtb3ZlIHRoZSBzdHlsZXNoZWV0IGZyb20gc2hhZG93IHJvb3RzIHRoYXQgaGF2ZSBhbHJlYWR5IGFkb3B0ZWQgaXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHN0eWxlc2hlZXQgd2FzIHVucmVnaXN0ZXJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHVucmVnaXN0ZXIgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gU1RZTEVTSEVFVF9DQUNIRS5kZWxldGUobmFtZSk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBhZG9wdFxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBBZG9wdCBvbmUgb3IgbW9yZSByZWdpc3RlcmVkIHN0eWxlc2hlZXRzIGludG8gYSBzaGFkb3cgcm9vdCBvciBkb2N1bWVudC5cbiAqICAgVXNlcyB0aGUgYGFkb3B0ZWRTdHlsZVNoZWV0c2AgQVBJIHdoZW4gYXZhaWxhYmxlLCB3aXRoIGZhbGxiYWNrIHRvIGA8c3R5bGU+YCBpbmplY3Rpb24uXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdGFyZ2V0XG4gKiAgICAgZGF0YVR5cGU6IFNoYWRvd1Jvb3QgfCBEb2N1bWVudFxuICogICAgIGRlc2M6IFRoZSB0YXJnZXQgdG8gYWRvcHQgc3R5bGVzaGVldHMgaW50by5cbiAqICAgLSBuYW1lOiBuYW1lc1xuICogICAgIGRhdGFUeXBlOiBBcnJheTxzdHJpbmc+XG4gKiAgICAgZGVzYzogQXJyYXkgb2Ygc3R5bGVzaGVldCBuYW1lcyB0byBhZG9wdC5cbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgT3B0aW9ucyBmb3IgYWRvcHRpb24uXG4gKiAgICAgICAtIGBwcmVwZW5kYDogSWYgdHJ1ZSwgc3R5bGVzaGVldHMgYXJlIGFkZGVkIGJlZm9yZSBleGlzdGluZyBvbmVzIChkZWZhdWx0OiBmYWxzZSkuXG4gKiAgICAgICAtIGBmYWxsYmFja1N0eWxlc2A6IE9iamVjdCBtYXBwaW5nIG5hbWVzIHRvIENTUyB0ZXh0IGZvciBmYWxsYmFjayBpbmplY3Rpb24uXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47IFRydWUgaWYgc3R5bGVzaGVldHMgd2VyZSBhZG9wdGVkIHZpYSBhZG9wdGVkU3R5bGVTaGVldHMsIGZhbHNlIGlmIGZhbGxiYWNrIHdhcyB1c2VkLlxuICpcbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgLy8gQWRvcHQgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0c1xuICogICAgIFN0eWxlU2hlZXRNYW5hZ2VyLmFkb3B0KHRoaXMuc2hhZG93Um9vdCwgWyd0aGVtZScsICd0eXBvZ3JhcGh5J10pO1xuICpcbiAqICAgICAvLyBXaXRoIGZhbGxiYWNrIGZvciBvbGRlciBicm93c2Vyc1xuICogICAgIFN0eWxlU2hlZXRNYW5hZ2VyLmFkb3B0KHRoaXMuc2hhZG93Um9vdCwgWyd0aGVtZSddLCB7XG4gKiAgICAgICBmYWxsYmFja1N0eWxlczoge1xuICogICAgICAgICAndGhlbWUnOiAnOmhvc3QgeyAtLXByaW1hcnktY29sb3I6IGJsdWU7IH0nXG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKiAgICAgYGBgXG4gKi9cblxuLyoqXG4gKiBBZG9wdCBvbmUgb3IgbW9yZSByZWdpc3RlcmVkIHN0eWxlc2hlZXRzIGludG8gYSBzaGFkb3cgcm9vdCBvciBkb2N1bWVudC5cbiAqIEBwYXJhbSB7U2hhZG93Um9vdHxEb2N1bWVudH0gdGFyZ2V0IC0gVGhlIHRhcmdldCB0byBhZG9wdCBzdHlsZXNoZWV0cyBpbnRvLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gbmFtZXMgLSBBcnJheSBvZiBzdHlsZXNoZWV0IG5hbWVzIHRvIGFkb3B0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIE9wdGlvbnMgZm9yIGFkb3B0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wcmVwZW5kPWZhbHNlXSAtIElmIHRydWUsIHN0eWxlc2hlZXRzIGFyZSBhZGRlZCBiZWZvcmUgZXhpc3Rpbmcgb25lcy5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn0gW29wdGlvbnMuZmFsbGJhY2tTdHlsZXNdIC0gT2JqZWN0IG1hcHBpbmcgbmFtZXMgdG8gQ1NTIHRleHQgZm9yIGZhbGxiYWNrIGluamVjdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHN0eWxlc2hlZXRzIHdlcmUgYWRvcHRlZCB2aWEgYWRvcHRlZFN0eWxlU2hlZXRzLCBmYWxzZSBpZiBmYWxsYmFjayB3YXMgdXNlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGFkb3B0ID0gKHRhcmdldCwgbmFtZXMsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoIXRhcmdldClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgbGV0IHNoZWV0cyA9IG5hbWVzLm1hcCgobmFtZSkgPT4gU1RZTEVTSEVFVF9DQUNIRS5nZXQobmFtZSkpLmZpbHRlcihCb29sZWFuKTtcblxuICAvLyBVc2UgYWRvcHRlZFN0eWxlU2hlZXRzIGlmIGF2YWlsYWJsZSBhbmQgYWxsIHNoZWV0cyBleGlzdFxuICBpZiAoc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMgJiYgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyAhPT0gdW5kZWZpbmVkICYmIHNoZWV0cy5sZW5ndGggPT09IG5hbWVzLmxlbmd0aCkge1xuICAgIGxldCBleGlzdGluZ1NoZWV0cyA9IEFycmF5LmZyb20odGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyk7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHNoZWV0cyB0aGF0IGFyZSBhbHJlYWR5IGFkb3B0ZWRcbiAgICBsZXQgbmV3U2hlZXRzID0gc2hlZXRzLmZpbHRlcigoc2hlZXQpID0+ICFleGlzdGluZ1NoZWV0cy5pbmNsdWRlcyhzaGVldCkpO1xuXG4gICAgaWYgKG5ld1NoZWV0cy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAob3B0aW9ucy5wcmVwZW5kKVxuICAgICAgICB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzID0gWyAuLi5uZXdTaGVldHMsIC4uLmV4aXN0aW5nU2hlZXRzIF07XG4gICAgICBlbHNlXG4gICAgICAgIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbIC4uLmV4aXN0aW5nU2hlZXRzLCAuLi5uZXdTaGVldHMgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrOiBpbmplY3QgPHN0eWxlPiBlbGVtZW50c1xuICBpZiAob3B0aW9ucy5mYWxsYmFja1N0eWxlcykge1xuICAgIGZvciAobGV0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgIGxldCBjc3NUZXh0ID0gb3B0aW9ucy5mYWxsYmFja1N0eWxlc1tuYW1lXTtcblxuICAgICAgaWYgKCFjc3NUZXh0KVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBpbmplY3RlZFxuICAgICAgbGV0IGV4aXN0aW5nU3R5bGUgPSB0YXJnZXQucXVlcnlTZWxlY3Rvcihgc3R5bGVbZGF0YS1zdHlsZXNoZWV0LW5hbWU9XCIke25hbWV9XCJdYCk7XG4gICAgICBpZiAoZXhpc3RpbmdTdHlsZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzdHlsZUVsZW1lbnQgPSAodGFyZ2V0Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXN0eWxlc2hlZXQtbmFtZScsIG5hbWUpO1xuICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3NzVGV4dDtcblxuICAgICAgaWYgKG9wdGlvbnMucHJlcGVuZCAmJiB0YXJnZXQuZmlyc3RDaGlsZClcbiAgICAgICAgdGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgIGVsc2UgaWYgKHRhcmdldC5hcHBlbmRDaGlsZClcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XG4gICAgICBlbHNlIGlmICh0YXJnZXQuaGVhZClcbiAgICAgICAgdGFyZ2V0LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBjcmVhdGVGcm9tVGV4dFxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBDcmVhdGUgYSBDU1NTdHlsZVNoZWV0IGZyb20gQ1NTIHRleHQgd2l0aG91dCByZWdpc3RlcmluZyBpdC5cbiAqICAgVXNlZnVsIGZvciBjb21wb25lbnQtc3BlY2lmaWMgc3R5bGVzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZSBzaGFyZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogY3NzVGV4dFxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgQ1NTIGNvbnRlbnQuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIENTU1N0eWxlU2hlZXQgfCBudWxsOyBUaGUgY29uc3RydWN0ZWQgc3R5bGVzaGVldCwgb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxuICovXG5cbi8qKlxuICogQ3JlYXRlIGEgQ1NTU3R5bGVTaGVldCBmcm9tIENTUyB0ZXh0IHdpdGhvdXQgcmVnaXN0ZXJpbmcgaXQuXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzVGV4dCAtIFRoZSBDU1MgY29udGVudC5cbiAqIEByZXR1cm5zIHtDU1NTdHlsZVNoZWV0fG51bGx9IFRoZSBjb25zdHJ1Y3RlZCBzdHlsZXNoZWV0LCBvciBudWxsIGlmIG5vdCBzdXBwb3J0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVGcm9tVGV4dCA9IChjc3NUZXh0KSA9PiB7XG4gIGlmICghc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgbGV0IHNoZWV0ID0gbmV3IENTU1N0eWxlU2hlZXQoKTtcbiAgc2hlZXQucmVwbGFjZVN5bmMoY3NzVGV4dCk7XG4gIHJldHVybiBzaGVldDtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGFkb3B0RnJvbVRleHRcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQ3JlYXRlIGFuZCBpbW1lZGlhdGVseSBhZG9wdCBhIHN0eWxlc2hlZXQgZnJvbSBDU1MgdGV4dC5cbiAqICAgVXNlZnVsIGZvciBvbmUtb2ZmIGNvbXBvbmVudCBzdHlsZXMuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdGFyZ2V0XG4gKiAgICAgZGF0YVR5cGU6IFNoYWRvd1Jvb3QgfCBEb2N1bWVudFxuICogICAgIGRlc2M6IFRoZSB0YXJnZXQgdG8gYWRvcHQgaW50by5cbiAqICAgLSBuYW1lOiBjc3NUZXh0XG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBDU1MgY29udGVudC5cbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogT3B0aW9ucyBmb3IgYWRvcHRpb24gKHNlZSBgYWRvcHRgKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQ1NTU3R5bGVTaGVldCB8IEhUTUxTdHlsZUVsZW1lbnQgfCBudWxsOyBUaGUgc3R5bGVzaGVldCBvciBzdHlsZSBlbGVtZW50LCBvciBudWxsIG9uIGZhaWx1cmUuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYW5kIGltbWVkaWF0ZWx5IGFkb3B0IGEgc3R5bGVzaGVldCBmcm9tIENTUyB0ZXh0LlxuICogQHBhcmFtIHtTaGFkb3dSb290fERvY3VtZW50fSB0YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIGFkb3B0IGludG8uXG4gKiBAcGFyYW0ge3N0cmluZ30gY3NzVGV4dCAtIFRoZSBDU1MgY29udGVudC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gLSBPcHRpb25zIGZvciBhZG9wdGlvbiAoc2VlIGFkb3B0KS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMucHJlcGVuZD1mYWxzZV0gLSBJZiB0cnVlLCBzdHlsZXNoZWV0cyBhcmUgYWRkZWQgYmVmb3JlIGV4aXN0aW5nIG9uZXMuXG4gKiBAcmV0dXJucyB7Q1NTU3R5bGVTaGVldHxIVE1MU3R5bGVFbGVtZW50fG51bGx9IFRoZSBzdHlsZXNoZWV0IG9yIHN0eWxlIGVsZW1lbnQsIG9yIG51bGwgb24gZmFpbHVyZS5cbiAqL1xuZXhwb3J0IGNvbnN0IGFkb3B0RnJvbVRleHQgPSAodGFyZ2V0LCBjc3NUZXh0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKCF0YXJnZXQpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHN1cHBvcnRzQ29uc3RydWN0YWJsZVN0eWxlc2hlZXRzICYmIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgIT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBzaGVldCA9IGNyZWF0ZUZyb21UZXh0KGNzc1RleHQpO1xuXG4gICAgaWYgKHNoZWV0KSB7XG4gICAgICBsZXQgZXhpc3RpbmdTaGVldHMgPSBBcnJheS5mcm9tKHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMpO1xuXG4gICAgICBpZiAob3B0aW9ucy5wcmVwZW5kKVxuICAgICAgICB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzID0gWyBzaGVldCwgLi4uZXhpc3RpbmdTaGVldHMgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsgLi4uZXhpc3RpbmdTaGVldHMsIHNoZWV0IF07XG5cbiAgICAgIHJldHVybiBzaGVldDtcbiAgICB9XG4gIH1cblxuICAvLyBGYWxsYmFjayB0byA8c3R5bGU+IGVsZW1lbnRcbiAgbGV0IHN0eWxlRWxlbWVudCA9ICh0YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gY3NzVGV4dDtcblxuICBpZiAob3B0aW9ucy5wcmVwZW5kICYmIHRhcmdldC5maXJzdENoaWxkKVxuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCB0YXJnZXQuZmlyc3RDaGlsZCk7XG4gIGVsc2UgaWYgKHRhcmdldC5hcHBlbmRDaGlsZClcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgZWxzZSBpZiAodGFyZ2V0LmhlYWQpXG4gICAgdGFyZ2V0LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICByZXR1cm4gc3R5bGVFbGVtZW50O1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogY2xlYXJcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQ2xlYXIgYWxsIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMuXG4gKiAgIFByaW1hcmlseSB1c2VmdWwgZm9yIHRlc3RpbmcuXG4gKi9cblxuLyoqXG4gKiBDbGVhciBhbGwgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cy4gUHJpbWFyaWx5IHVzZWZ1bCBmb3IgdGVzdGluZy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgY29uc3QgY2xlYXIgPSAoKSA9PiB7XG4gIFNUWUxFU0hFRVRfQ0FDSEUuY2xlYXIoKTtcbiAgQ09OVEVOVF9IQVNIX0NBQ0hFLmNsZWFyKCk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBnZXRSZWdpc3RlcmVkTmFtZXNcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgR2V0IHRoZSBuYW1lcyBvZiBhbGwgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cy5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQXJyYXk8c3RyaW5nPjsgQXJyYXkgb2YgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0IG5hbWVzLlxuICovXG5cbi8qKlxuICogR2V0IHRoZSBuYW1lcyBvZiBhbGwgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cy5cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gQXJyYXkgb2YgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0IG5hbWVzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0UmVnaXN0ZXJlZE5hbWVzID0gKCkgPT4ge1xuICByZXR1cm4gQXJyYXkuZnJvbShTVFlMRVNIRUVUX0NBQ0hFLmtleXMoKSk7XG59O1xuXG4vLyBFeHBvcnQgYXMgbmFtZXNwYWNlLWxpa2Ugb2JqZWN0IGFzIHdlbGxcbmV4cG9ydCBjb25zdCBTdHlsZVNoZWV0TWFuYWdlciA9IHtcbiAgaXNTdXBwb3J0ZWQsXG4gIHJlZ2lzdGVyLFxuICBnZXQsXG4gIGhhcyxcbiAgdW5yZWdpc3RlcixcbiAgYWRvcHQsXG4gIGNyZWF0ZUZyb21UZXh0LFxuICBhZG9wdEZyb21UZXh0LFxuICBjbGVhcixcbiAgZ2V0UmVnaXN0ZXJlZE5hbWVzLFxufTtcbiIsImltcG9ydCB7XG4gIE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSLFxuICBNWVRISVhfU0hBRE9XX1BBUkVOVCxcbiAgTVlUSElYX1RZUEUsXG4gIEVMRU1FTlRfREVGSU5JVElPTl9UWVBFLFxuICBRVUVSWV9FTkdJTkVfVFlQRSxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcblxuaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnLi9keW5hbWljLXByb3BlcnR5LmpzJztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IFV0aWxzXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgTWlzYyB1dGlsaXR5IGZ1bmN0aW9ucyBhcmUgZm91bmQgd2l0aGluIHRoaXMgbmFtZXNwYWNlLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kTWV0aG9kcyhfcHJvdG8sIHNraXBQcm90b3MpIHtcbiAgbGV0IHByb3RvICAgICAgICAgICA9IF9wcm90bztcbiAgbGV0IGFscmVhZHlWaXNpdGVkICA9IG5ldyBTZXQoKTtcblxuICB3aGlsZSAocHJvdG8pIHtcbiAgICBpZiAocHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm90byk7XG4gICAgbGV0IGtleXMgICAgICAgID0gT2JqZWN0LmtleXMoZGVzY3JpcHRvcnMpLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGRlc2NyaXB0b3JzKSk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGtleSA9PT0gJ2NvbnN0cnVjdG9yJyB8fCBrZXkgPT09ICdwcm90b3R5cGUnKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyhrZXkpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgYWxyZWFkeVZpc2l0ZWQuYWRkKGtleSk7XG5cbiAgICAgIGxldCBkZXNjcmlwdG9yID0gZGVzY3JpcHRvcnNba2V5XTtcblxuICAgICAgLy8gQ2FuIGl0IGJlIGNoYW5nZWQ/XG4gICAgICBpZiAoZGVzY3JpcHRvci5jb25maWd1cmFibGUgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgLy8gSWYgaXMgZ2V0dGVyLCB0aGVuIHNraXBcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ2dldCcpIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZXNjcmlwdG9yLCAnc2V0JykpIHtcbiAgICAgICAgbGV0IG5ld0Rlc2NyaXB0b3IgPSB7IC4uLmRlc2NyaXB0b3IgfTtcbiAgICAgICAgaWYgKG5ld0Rlc2NyaXB0b3IuZ2V0KVxuICAgICAgICAgIG5ld0Rlc2NyaXB0b3IuZ2V0ID0gbmV3RGVzY3JpcHRvci5nZXQuYmluZCh0aGlzKTtcblxuICAgICAgICBpZiAobmV3RGVzY3JpcHRvci5zZXQpXG4gICAgICAgICAgbmV3RGVzY3JpcHRvci5zZXQgPSBuZXdEZXNjcmlwdG9yLnNldC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIG5ld0Rlc2NyaXB0b3IpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICAgICAgLy8gU2tpcCBwcm90b3R5cGUgb2YgT2JqZWN0XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIE9iamVjdC5wcm90b3R5cGVba2V5XSA9PT0gdmFsdWUpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwgeyAuLi5kZXNjcmlwdG9yLCB2YWx1ZTogdmFsdWUuYmluZCh0aGlzKSB9KTtcbiAgICB9XG5cbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgaWYgKHByb3RvID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgYnJlYWs7XG5cbiAgICBpZiAoc2tpcFByb3RvcyAmJiBza2lwUHJvdG9zLmluZGV4T2YocHJvdG8pID49IDApXG4gICAgICBicmVhaztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVzY3JpcHRvckZyb21Qcm90b3R5cGVDaGFpbihzdGFydFByb3RvLCBkZXNjcmlwdG9yTmFtZSkge1xuICBsZXQgdGhpc1Byb3RvID0gc3RhcnRQcm90bztcbiAgbGV0IGRlc2NyaXB0b3I7XG5cbiAgd2hpbGUgKHRoaXNQcm90byAmJiAhKGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXNQcm90bywgZGVzY3JpcHRvck5hbWUpKSlcbiAgICB0aGlzUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpc1Byb3RvKTtcblxuICByZXR1cm4geyBwcm90b3R5cGU6IHRoaXNQcm90bywgZGVzY3JpcHRvciB9O1xufVxuXG5jb25zdCBNRVRBREFUQV9TVE9SQUdFID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29tcG9uZW50L2NvbnN0YW50cy9tZXRhZGF0YS1zdG9yYWdlJyk7XG5jb25zdCBNRVRBREFUQV9XRUFLTUFQID0gZ2xvYmFsVGhpcy5teXRoaXhVSVtNRVRBREFUQV9TVE9SQUdFXSA9IChnbG9iYWxUaGlzLm15dGhpeFVJW01FVEFEQVRBX1NUT1JBR0VdKSA/IGdsb2JhbFRoaXMubXl0aGl4VUlbTUVUQURBVEFfU1RPUkFHRV0gOiBuZXcgV2Vha01hcCgpO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgU3RvcmUgYW5kIHJldHJpZXZlIG1ldGFkYXRhIG9uIGFueSBnYXJiYWdlLWNvbGxlY3RhYmxlIHJlZmVyZW5jZS5cbiAqXG4gKiAgIFRoaXMgZnVuY3Rpb24gdXNlcyBhbiBpbnRlcm5hbCBXZWFrTWFwIHRvIHN0b3JlIG1ldGFkYXRhIGZvciBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSB2YWx1ZS5cbiAqXG4gKiAgIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHByb3ZpZGVkIHdpbGwgY2hhbmdlIHRoZSBiZWhhdmlvciBvZiB0aGlzIGZ1bmN0aW9uOlxuICogICAxLiBJZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBzdXBwbGllZCAoYSBgdGFyZ2V0YCksIHRoZW4gYSBNYXAgb2YgbWV0YWRhdGEga2V5L3ZhbHVlIHBhaXJzIGlzIHJldHVybmVkLlxuICogICAyLiBJZiBvbmx5IHR3byBhcmd1bWVudHMgYXJlIHN1cHBsaWVkLCB0aGVuIGBtZXRhZGF0YWAgYWN0cyBhcyBhIGdldHRlciwgYW5kIHRoZSB2YWx1ZSBzdG9yZWQgdW5kZXIgdGhlIHNwZWNpZmllZCBga2V5YCBpcyByZXR1cm5lZC5cbiAqICAgMy4gSWYgbW9yZSB0aGFuIHR3byBhcmd1bWVudHMgYXJlIHN1cHBsaWVkLCB0aGVuIGBtZXRhZGF0YWAgYWN0cyBhcyBhIHNldHRlciwgYW5kIGB0YXJnZXRgIGlzIHJldHVybmVkIChmb3IgY29udGludWVkIGNoYWluaW5nKS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB0YXJnZXRcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBpcyB0aGUgdmFsdWUgZm9yIHdoaWNoIG1ldGFkYXRhIGlzIGJlaW5nIHN0b3JlZCBvciByZXRyaWV2ZWQuXG4gKiAgICAgICBUaGlzIGNhbiBiZSBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSB2YWx1ZSAoYW55IHZhbHVlIHRoYXQgY2FuIGJlIHVzZWQgYXMgYSBrZXkgaW4gYSBXZWFrTWFwKS5cbiAqICAgLSBuYW1lOiBrZXlcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUga2V5IHVzZWQgdG8gc3RvcmUgb3IgZmV0Y2ggdGhlIHNwZWNpZmllZCBtZXRhZGF0YSB2YWx1ZS4gVGhpcyBjYW4gYmUgYW55IHZhbHVlLCBhcyB0aGUgdW5kZXJseWluZ1xuICogICAgICAgc3RvcmFnZSBpcyBhIE1hcC5cbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBvcHRpb25hbDogdHJ1ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSB2YWx1ZSB0byBzdG9yZSBvbiB0aGUgYHRhcmdldGAgdW5kZXIgdGhlIHNwZWNpZmllZCBga2V5YC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYW55O1xuICogICAxLiBJZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZCAoYSBidWxrIGdldCBvcGVyYXRpb24pLCByZXR1cm4gYSBNYXAgY29udGFpbmluZyB0aGUgbWV0YWRhdGEgZm9yIHRoZSBzcGVjaWZpZWQgYHRhcmdldGAuXG4gKiAgIDIuIElmIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIChhIGdldCBvcGVyYXRpb24pLCB0aGUgYHRhcmdldGAgbWV0YWRhdGEgdmFsdWUgc3RvcmVkIGZvciB0aGUgc3BlY2lmaWVkIGBrZXlgLlxuICogICAyLiBJZiBtb3JlIHRoYW4gdHdvIGFyZ3VtZW50cyBhcmUgcHJvdmlkZWQgKGEgc2V0IG9wZXJhdGlvbiksIHRoZSBwcm92aWRlZCBgdGFyZ2V0YCBpcyByZXR1cm5lZC5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICAvLyBzZXRcbiAqICAgICBVdGlscy5tZXRhZGF0YShteUVsZW1lbnQsICdjdXN0b21DYXB0aW9uJywgJ01ldGFkYXRhIENhcHRpb24hJyk7XG4gKlxuICogICAgIC8vIGdldFxuICogICAgIGNvbnNvbGUubG9nKFV0aWxzLm1ldGFkYXRhKG15RWxlbWVudCwgJ2N1c3RvbUNhcHRpb24nKSk7XG4gKiAgICAgLy8gb3V0cHV0IC0+ICdNZXRhZGF0YSBDYXB0aW9uISdcbiAqXG4gKiAgICAgLy8gZ2V0IGFsbFxuICogICAgIGNvbnNvbGUubG9nKFV0aWxzLm1ldGFkYXRhKG15RWxlbWVudCkpO1xuICogICAgIC8vIG91dHB1dCAtPiBNYXAoMSkgeyAnY3VzdG9tQ2FwdGlvbicgPT4gJ01ldGFkYXRhIENhcHRpb24hJyB9XG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXRhZGF0YSh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgbGV0IGRhdGEgPSBNRVRBREFUQV9XRUFLTUFQLmdldCh0YXJnZXQpO1xuICBpZiAoIWRhdGEpIHtcbiAgICBpZiAoIUJhc2VVdGlscy5pc0NvbGxlY3RhYmxlKHRhcmdldCkpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBzZXQgbWV0YWRhdGEgb24gcHJvdmlkZWQgb2JqZWN0OiAkeyh0eXBlb2YgdGFyZ2V0ID09PSAnc3ltYm9sJykgPyB0YXJnZXQudG9TdHJpbmcoKSA6IHRhcmdldH1gKTtcblxuICAgIGRhdGEgPSBuZXcgTWFwKCk7XG4gICAgTUVUQURBVEFfV0VBS01BUC5zZXQodGFyZ2V0LCBkYXRhKTtcbiAgfVxuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgIHJldHVybiBkYXRhO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKVxuICAgIHJldHVybiAoZGF0YSkgPyBkYXRhLmdldChrZXkpIDogdW5kZWZpbmVkO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNvbnN0IFZBTElEX0pTX0lERU5USUZJRVIgPSAvXlthLXpBLVpfJF1bYS16QS1aMC05XyRdKiQvO1xuY29uc3QgUkVTRVJWRURfSURFTlRJRklFUiA9IC9eKGJyZWFrfGNhc2V8Y2F0Y2h8Y2xhc3N8Y29uc3R8Y29udGludWV8ZGVidWdnZXJ8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxleHBvcnR8ZXh0ZW5kc3xmYWxzZXxmaW5hbGx5fGZvcnxmdW5jdGlvbnxpZnxpbXBvcnR8aW58aW5zdGFuY2VvZnxuZXd8bnVsbHxyZXR1cm58c3VwZXJ8c3dpdGNofHRoaXN8dGhyb3d8dHJ1ZXx0cnl8dHlwZW9mfHZhcnx2b2lkfHdoaWxlfHdpdGh8bGV0fHN0YXRpY3x5aWVsZCkkLztcblxuZnVuY3Rpb24gZ2V0Q29udGV4dENhbGxBcmdzKGNvbnRleHQsIC4uLmV4dHJhQ29udGV4dHMpIHtcbiAgbGV0IGNvbnRleHRDYWxsQXJncyA9IEFycmF5LmZyb20oXG4gICAgbmV3IFNldChnZXRBbGxQcm9wZXJ0eU5hbWVzKGNvbnRleHQpLmNvbmNhdChcbiAgICAgIE9iamVjdC5rZXlzKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUgfHwge30pLFxuICAgICAgWyAnYXR0cmlidXRlcycsICdjbGFzc0xpc3QnLCAnJCQnLCAnaTE4bicgXSxcbiAgICAgIC4uLmV4dHJhQ29udGV4dHMubWFwKChleHRyYUNvbnRleHQpID0+IE9iamVjdC5rZXlzKGV4dHJhQ29udGV4dCB8fCB7fSkpLFxuICAgICkpLFxuICApLmZpbHRlcigobmFtZSkgPT4ge1xuICAgIGlmIChSRVNFUlZFRF9JREVOVElGSUVSLnRlc3QobmFtZSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gVkFMSURfSlNfSURFTlRJRklFUi50ZXN0KG5hbWUpO1xuICB9KTtcblxuICByZXR1cm4gYHske2NvbnRleHRDYWxsQXJncy5qb2luKCcsJyl9fWA7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBHZXQgdGhlIHBhcmVudCBOb2RlIG9mIGBlbGVtZW50YC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBlbGVtZW50XG4gKiAgICAgZGF0YVR5cGU6IE5vZGVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgTm9kZSB3aG9zZSBwYXJlbnQgeW91IHdpc2ggdG8gZmluZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogVW5saWtlIFtOb2RlLnBhcmVudE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpLCB0aGlzXG4gKiAgICAgd2lsbCBhbHNvIHNlYXJjaCBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzLlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogKipTZWFyY2hpbmcgYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcyBvbmx5IHdvcmtzIGZvciBNeXRoaXggVUkgY29tcG9uZW50cyEqKlxuICogICAtIHxcbiAqICAgICA6aW5mbzogU2VhcmNoaW5nIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMgaXMgYWNjb21wbGlzaGVkIHZpYSBsZXZlcmFnaW5nIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE7IG9uXG4gKiAgICAgYGVsZW1lbnRgLiBXaGVuIGEgYG51bGxgIHBhcmVudCBpcyBlbmNvdW50ZXJlZCwgYGdldFBhcmVudE5vZGVgIHdpbGwgbG9vayBmb3IgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyBrZXkgQHNlZSBDb25zdGFudHMuTVlUSElYX1NIQURPV19QQVJFTlQ7XG4gKiAgICAgb24gYGVsZW1lbnRgLiBJZiBmb3VuZCwgdGhlIHJlc3VsdCBpcyBjb25zaWRlcmVkIHRoZSBbcGFyZW50IE5vZGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Ob2RlL3BhcmVudE5vZGUpIG9mIGBlbGVtZW50YC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgTm9kZTsgVGhlIHBhcmVudCBub2RlLCBpZiB0aGVyZSBpcyBhbnksIG9yIGBudWxsYCBvdGhlcndpc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnROb2RlKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50KVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmIChlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5wYXJlbnROb2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpXG4gICAgcmV0dXJuIG1ldGFkYXRhKGVsZW1lbnQucGFyZW50Tm9kZSwgTVlUSElYX1NIQURPV19QQVJFTlQpIHx8IG51bGw7XG5cbiAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKVxuICAgIHJldHVybiBtZXRhZGF0YShlbGVtZW50LCBNWVRISVhfU0hBRE9XX1BBUkVOVCkgfHwgbnVsbDtcblxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ3JlYXRlIGEgUHJveHkgdGhhdCBpcyBlc3NlbnRpYWxseSAoZnVuY3Rpb25hbGx5KSBhIG11bHRpLXByb3RvdHlwZSBgb2JqZWN0YCBpbnN0YW5jZS5cbiAqXG4gKiAgIEEgXCJzY29wZVwiIGluIE15dGhpeCBVSSBtaWdodCBiZSBiZXR0ZXIgY2FsbGVkIGEgXCJjb250ZXh0XCIuLi4gaG93ZXZlciwgXCJzY29wZVwiXG4gKiAgIHdhcyBjaG9zZW4gYmVjYXVzZSBpdCAqaXMqIGEgc2NvcGUuLi4gb3IgbWlnaHQgYmUgYmV0dGVyIGRlc2NyaWJlZCBhcyBcIm11bHRpcGxlIHNjb3BlcyBpbiBvbmVcIi5cbiAqICAgVGhpcyBpcyBzcGVjaWZpY2FsbHkgYSBcIkRPTSBzY29wZVwiLCBpbiB0aGF0IHRoaXMgbWV0aG9kIGlzIFwiRE9NIGF3YXJlXCIgYW5kIHdpbGwgdHJhdmVyc2UgdGhlXG4gKiAgIERPTSBsb29raW5nIGZvciB0aGUgcmVxdWVzdGVkIGRhdGEgKGlmIGFueSBvZiB0aGUgc3BlY2lmaWVkIGB0YXJnZXRzYCBpcyBhbiBFbGVtZW50IHRoYXQgaXMpLlxuICpcbiAqICAgVGhlIHdheSB0aGlzIHdvcmtzIGlzIHRoYXQgdGhlIGNhbGxlciB3aWxsIHByb3ZpZGUgYXQgbGVhc3Qgb25lIFwidGFyZ2V0XCIuIFRoZXNlIHRhcmdldHMgYXJlXG4gKiAgIHRoZW1zZWx2ZXMgc2NvcGVzLCBlbGVtZW50cywgb3Igb3RoZXIgZGF0YSBvYmplY3RzLiBXaGVuIHRoZSByZXR1cm5lZCBQcm94eSBpbnN0YW5jZSBpcyBhY2Nlc3NlZCxcbiAqICAgdGhlIHJlcXVlc3RlZCBrZXkgaXMgc2VhcmNoZWQgaW4gYWxsIHByb3ZpZGVkIGB0YXJnZXRzYCwgaW4gdGhlIG9yZGVyIHRoZXkgd2VyZSBwcm92aWRlZC5cbiAqXG4gKiAgIEFzaWRlIGZyb20gc2VhcmNoaW5nIGFsbCB0YXJnZXRzIGZvciB0aGUgZGVzaXJlZCBrZXksIGl0IHdpbGwgYWxzbyBmYWxsYmFjayB0byBvdGhlciBkYXRhIHNvdXJjZXNcbiAqICAgaXQgc2VhcmNoZXMgaW4gYXMgd2VsbDpcbiAqICAgMS4gSWYgYW55IGdpdmVuIGB0YXJnZXRgIGl0IGlzIHNlYXJjaGluZyBpcyBhbiBFbGVtZW50LCB0aGVuIGl0IHdpbGwgYWxzbyBzZWFyY2hcbiAqICAgICAgZm9yIHRoZSByZXF1ZXN0ZWQga2V5IG9uIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAqICAgMi4gSWYgc3RlcCAjMSBoYXMgZmFpbGVkLCB0aGVuIG1vdmUgdG8gdGhlIHBhcmVudCBub2RlIG9mIHRoZSBjdXJyZW50IEVsZW1lbnQgaW5zdGFuY2UsIGFuZFxuICogICAgICByZXBlYXQgdGhlIHByb2Nlc3MsIHN0YXJ0aW5nIGZyb20gc3RlcCAjMS5cbiAqICAgMy4gQWZ0ZXIgc3RlcHMgMS0yIGFyZSByZXBlYXRlZCBmb3IgZXZlcnkgZ2l2ZW4gYHRhcmdldGAgKGFuZCBhbGwgcGFyZW50IG5vZGVzIG9mIHRob3NlIGB0YXJnZXRzYC4uLiBpZiBhbnkpLFxuICogICAgICB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgZmluYWxseSBmYWxsYmFjayB0byBzZWFyY2hpbmcgYGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVgIGZvciB0aGUgcmVxdWVzdGVkIGtleS5cbiAqXG4gKiAgIFdlIGFyZW4ndCBxdWl0ZSBmaW5pc2hlZCB5ZXQgdGhvdWdoLi4uXG4gKlxuICogICBJZiBzdGVwcyAxLTMgYWJvdmUgYWxsIGZhaWwsIHRoZW4gdGhpcyBtZXRob2Qgd2lsbCBzdGlsbCBmYWxsYmFjayB0byB0aGUgZmFsbG93aW5nIGhhcmQtY29kZWQga2V5L3ZhbHVlIHBhaXJzOlxuICogICAxLiBBIHJlcXVlc3RlZCBrZXkgb2YgYCdnbG9iYWxTY29wZSdgIChpZiBub3QgZm91bmQgb24gYSB0YXJnZXQpIHdpbGwgcmVzdWx0IGluIGBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlYCBiZWluZyByZXR1cm5lZC5cbiAqICAgMi4gQSByZXF1ZXN0ZWQga2V5IG9mIGAnaTE4bidgIChpZiBub3QgZm91bmQgb24gYSB0YXJnZXQpIHdpbGwgcmVzdWx0IGluIHRoZSBidWlsdC1pbiBgaTE4bmAgbGFuZ3VhZ2UgdGVybSBwcm9jZXNzb3IgYmVpbmcgcmV0dXJuZWQuXG4gKiAgIDMuIEEgcmVxdWVzdGVkIGtleSBvZiBgJ2R5bmFtaWNQcm9wSUQnYCAoaWYgbm90IGZvdW5kIG9uIGEgdGFyZ2V0KSB3aWxsIHJlc3VsdCBpbiB0aGUgYnVpbHQtaW4gYGR5bmFtaWNQcm9wSURgIGR5bmFtaWMgcHJvcGVydHkgcHJvdmlkZWQuIFNlZSBAc2VlIFV0aWxzLmR5bmFtaWNQcm9wSUQ7LlxuICpcbiAqICAgRmluYWxseSwgdGhlIHJldHVybmVkIFByb3h5IHdpbGwgYWxzbyBpbnRlcmNlcHQgYW55IHZhbHVlIFtzZXRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1Byb3h5L1Byb3h5L3NldCkgb3BlcmF0aW9uLFxuICogICB0byBzZXQgYSB2YWx1ZSBvbiB0aGUgZmlyc3QgdGFyZ2V0IGZvdW5kLlxuICpcbiAqICAgVGhlIFByb3h5IGFsc28gb3ZlcmxvYWRzIFtvd25LZXlzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9Qcm94eS9vd25LZXlzKSB0byBsaXN0ICoqYWxsKioga2V5cyBhY3Jvc3MgKiphbGwqKiBgdGFyZ2V0c2AuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogLi4udGFyZ2V0c1xuICogICAgIGRhdGFUeXBlczpcbiAqICAgICAgIC0gT2JqZWN0XG4gKiAgICAgICAtIEVsZW1lbnRcbiAqICAgICAgIC0gbm9uLXByaW1pdGl2ZVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSBgdGFyZ2V0c2AgdG8gYmUgc2VhcmNoZWQsIGluIHRoZSBvcmRlciBwcm92aWRlZC4gVGFyZ2V0cyBhcmUgc2VhcmNoZWQgYm90aCBmb3IgZ2V0IG9wZXJhdGlvbnMsIGFuZCBzZXQgb3BlcmF0aW9ucyAodGhlIGZpcnN0IHRhcmdldCBmb3VuZCB3aWxsIGJlIHRoZSBzZXQgdGFyZ2V0KS5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6d2FybmluZzogTXl0aGl4IFVJIHdpbGwgZGVsaWJlcmF0ZWx5IG5ldmVyIGRpcmVjdGx5IGFjY2VzcyBgZ2xvYmFsVGhpc2AgZnJvbSB0aGUgdGVtcGxhdGUgZW5naW5lIChmb3Igc2VjdXJpdHkgcmVhc29ucykuXG4gKiAgICAgQmVjYXVzZSBvZiB0aGlzLCBNeXRoaXggVUkgYXV0b21hdGljYWxseSBwcm92aWRlcyBpdHMgb3duIGdsb2JhbCBzY29wZSBgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZWAuXG4gKiAgICAgSWYgeW91IHdhbnQgZGF0YSB0byBiZSBcImdsb2JhbGx5XCIgdmlzaWJsZSB0byBNeXRoaXggVUksIHRoZW4geW91IG5lZWQgdG8gYWRkIHlvdXIgZGF0YSB0byB0aGlzIHNwZWNpYWwgZ2xvYmFsIHNjb3BlLlxuICogICAtIHxcbiAqICAgICA6aW5mbzogVGhpcyBtZXRob2QgaXMgY29tcGxleCBiZWNhdXNlIGl0IGlzIGludGVuZGVkIHRvIGJlIHVzZWQgdG8gcHJvdmlkZSBhIFwic2NvcGVcIiB0byB0aGUgTXl0aGl4IFVJIHRlbXBsYXRpbmcgZW5naW5lLlxuICogICAgIFRoZSB0ZW1wbGF0aW5nIGVuZ2luZSBuZWVkcyB0byBiZSBET00gYXdhcmUsIGFuZCBhbHNvIG5lZWRzIHRvIGhhdmUgYWNjZXNzIHRvIHNwZWNpYWxpemVkLCBzY29wZWQgZGF0YVxuICogICAgIChpLmUuIHRoZSBgbXl0aGl4LXVpLWZvci1lYWNoYCBjb21wb25lbnQgd2lsbCBwdWJsaXNoIHNjb3BlZCBkYXRhIGZvciBlYWNoIGl0ZXJhdGlvbiwgd2hpY2ggbmVlZHMgdG8gYmUgYm90aFxuICogICAgIERPTS1hd2FyZSwgYW5kIGl0ZXJhdGlvbi1hd2FyZSkuXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBBbnkgcHJvdmlkZWQgYHRhcmdldGAgY2FuIGFsc28gYmUgb25lIG9mIHRoZXNlIFByb3h5IHNjb3BlcyByZXR1cm5lZCBieSB0aGlzIG1ldGhvZC5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IEl0IGNhbiBoZWxwIHRvIHRoaW5rIG9mIHRoZSByZXR1cm5lZCBcInNjb3BlXCIgYXMgYW4gcGxhaW4gT2JqZWN0IHRoYXQgaGFzIGFuIGFycmF5IG9mIHByb3RvdHlwZXMuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIFByb3h5OyBBIHByb3h5IGluc3RhbmNlLCB0aGF0IGlzIHVzZWQgdG8gZ2V0IGFuZCBzZXQga2V5cyBhY3Jvc3MgbXVsdGlwbGUgYHRhcmdldHNgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NvcGUoLi4uX3RhcmdldHMpIHtcbiAgY29uc3QgZmluZFByb3BOYW1lU2NvcGUgPSAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgIGlmICh0YXJnZXQgPT0gbnVsbCB8fCBPYmplY3QuaXModGFyZ2V0LCBOYU4pKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHByb3BOYW1lIGluIHRhcmdldClcbiAgICAgIHJldHVybiB0YXJnZXQ7XG5cbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSlcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHNlYXJjaFBhcmVudE5vZGVzRm9yS2V5ID0gKGVsZW1lbnQpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICBpZiAoIWN1cnJlbnRFbGVtZW50KVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIGRvIHtcbiAgICAgICAgaWYgKHByb3BOYW1lIGluIGN1cnJlbnRFbGVtZW50KVxuICAgICAgICAgIHJldHVybiBjdXJyZW50RWxlbWVudDtcblxuICAgICAgICBjdXJyZW50RWxlbWVudCA9IGdldFBhcmVudE5vZGUoY3VycmVudEVsZW1lbnQpO1xuICAgICAgfSB3aGlsZSAoY3VycmVudEVsZW1lbnQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VhcmNoUGFyZW50Tm9kZXNGb3JLZXkodGFyZ2V0KTtcbiAgfTtcblxuICBsZXQgdGFyZ2V0cyAgICAgICAgID0gX3RhcmdldHMuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgZmlyc3RFbGVtZW50ICAgID0gdGFyZ2V0cy5maW5kKCh0YXJnZXQpID0+ICh0YXJnZXQgaW5zdGFuY2VvZiBOb2RlKSkgfHwgdGFyZ2V0c1swXTtcbiAgbGV0IGJhc2VDb250ZXh0ICAgICA9IHt9O1xuICBsZXQgZmFsbGJhY2tDb250ZXh0ID0ge1xuICAgIGdsb2JhbFNjb3BlOiAgKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSksXG4gICAgaTE4bjogICAgICAgICAocGF0aCwgZGVmYXVsdFZhbHVlKSA9PiB7XG4gICAgICBsZXQgbGFuZ3VhZ2VQcm92aWRlciA9IHNwZWNpYWxDbG9zZXN0KGZpcnN0RWxlbWVudCwgJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuICAgICAgaWYgKCFsYW5ndWFnZVByb3ZpZGVyKVxuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gICAgICByZXR1cm4gbGFuZ3VhZ2VQcm92aWRlci5pMThuKHBhdGgsIGRlZmF1bHRWYWx1ZSk7XG4gICAgfSxcbiAgICBkeW5hbWljUHJvcElELFxuICB9O1xuXG4gIHRhcmdldHMgPSB0YXJnZXRzLmNvbmNhdChmYWxsYmFja0NvbnRleHQpO1xuICBsZXQgcHJveHkgICA9IG5ldyBQcm94eShiYXNlQ29udGV4dCwge1xuICAgIG93bktleXM6ICgpID0+IHtcbiAgICAgIGxldCBhbGxLZXlzID0gW107XG5cbiAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKVxuICAgICAgICBhbGxLZXlzID0gYWxsS2V5cy5jb25jYXQoZ2V0QWxsUHJvcGVydHlOYW1lcyh0YXJnZXQpKTtcblxuICAgICAgbGV0IGdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSk7XG4gICAgICBpZiAoZ2xvYmFsU2NvcGUpXG4gICAgICAgIGFsbEtleXMgPSBhbGxLZXlzLmNvbmNhdChPYmplY3Qua2V5cyhnbG9iYWxTY29wZSkpO1xuXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFsbEtleXMpKTtcbiAgICB9LFxuICAgIGhhczogKF8sIHByb3BOYW1lKSA9PiB7XG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICBsZXQgc2NvcGUgPSBmaW5kUHJvcE5hbWVTY29wZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IGdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgJiYgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSk7XG4gICAgICBpZiAoIWdsb2JhbFNjb3BlKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHJldHVybiAocHJvcE5hbWUgaW4gZ2xvYmFsU2NvcGUpO1xuICAgIH0sXG4gICAgZ2V0OiAoXywgcHJvcE5hbWUpID0+IHtcbiAgICAgIGZvciAobGV0IHRhcmdldCBvZiB0YXJnZXRzKSB7XG4gICAgICAgIGxldCBzY29wZSA9IGZpbmRQcm9wTmFtZVNjb3BlKHRhcmdldCwgcHJvcE5hbWUpO1xuICAgICAgICBpZiAoIXNjb3BlKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIHJldHVybiBzY29wZVtwcm9wTmFtZV07XG4gICAgICB9XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKCFnbG9iYWxTY29wZSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICByZXR1cm4gZ2xvYmFsU2NvcGVbcHJvcE5hbWVdO1xuICAgIH0sXG4gICAgc2V0OiAoXywgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBkb1NldCA9IChzY29wZSwgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNjb3BlW3Byb3BOYW1lXSwgRHluYW1pY1Byb3BlcnR5KSlcbiAgICAgICAgICBzY29wZVtwcm9wTmFtZV1bRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc2NvcGVbcHJvcE5hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuXG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICBsZXQgc2NvcGUgPSBmaW5kUHJvcE5hbWVTY29wZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICByZXR1cm4gZG9TZXQoc2NvcGUsIHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKCFnbG9iYWxTY29wZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gZG9TZXQoZ2xvYmFsU2NvcGUsIHByb3BOYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgZmFsbGJhY2tDb250ZXh0LiQkID0gcHJveHk7XG5cbiAgcmV0dXJuIHByb3h5O1xufVxuXG5jb25zdCBFVkVOVF9BQ1RJT05fSlVTVF9OQU1FID0gL14lP1tcXHcuJF0rJC87XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBDcmVhdGUgYSBjb250ZXh0LWF3YXJlIGZ1bmN0aW9uLCBvciBcIm1hY3JvXCIsIHRoYXQgY2FuIGJlIGNhbGxlZCBhbmQgdXNlZCBieSB0aGUgdGVtcGxhdGUgZW5naW5lLlxuICpcbiAqICAgSWYgeW91IGFyZSBldmVyIHRyeWluZyB0byBwYXNzIG1ldGhvZHMgb3IgZHluYW1pYyBwcm9wZXJ0aWVzIGFjcm9zcyB0aGUgRE9NLCB0aGVuIHRoaXMgaXMgdGhlIG1ldGhvZCB5b3Ugd2FudCB0byB1c2UsIHRvXG4gKiAgIHByb3Blcmx5IFwicGFyc2VcIiBhbmQgdXNlIHRoZSBhdHRyaWJ1dGUgdmFsdWUgYXMgaW50ZW5kZWQuXG4gKlxuICogICBUaGlzIGlzIHVzZWQgZm9yIGV4YW1wbGUgZm9yIGV2ZW50IGJpbmRpbmdzIHZpYSBhdHRyaWJ1dGVzLiBJZiB5b3UgaGF2ZSBmb3IgZXhhbXBsZSBhbiBgb25jbGljaz1cImRvU29tZXRoaW5nXCJgXG4gKiAgIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50LCB0aGVuIHRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIGNvbnRleHQtYXdhcmUgXCJtYWNyb1wiIGZvciB0aGUgbWV0aG9kIFwiZG9Tb21ldGhpbmdcIi5cbiAqXG4gKiAgIFRoZSB0ZXJtIFwibWFjcm9cIiBpcyB1c2VkIGhlcmUgYmVjYXVzZSB0aGVyZSBhcmUgc3BlY2lhbCBmb3JtYXRzIFwidW5kZXJzdG9vZFwiIGJ5IHRoZSB0ZW1wbGF0ZSBlbmdpbmUuIEZvciBleGFtcGxlLFxuICogICBwcmVmaXhpbmcgYW4gYXR0cmlidXRlIHZhbHVlIHdpdGggYSBwZXJjZW50IHNpZ24sIGkuZS4gYG5hbWU9XCIlZ2xvYmFsRHluYW1pY1Byb3BOYW1lXCJgIHdpbGwgdXNlIEBzZWUgVXRpbHMuZHluYW1pY1Byb3BJRDtcbiAqICAgdG8gZ2xvYmFsbHkgZmV0Y2ggcHJvcGVydHkgb2YgdGhpcyBuYW1lLiBUaGlzIGlzIGltcG9ydGFudCwgYmVjYXVzZSBkdWUgdG8gdGhlIGFzeW5jIG5hdHVyZSBvZiB0aGUgRE9NLCB5b3UgbWlnaHRcbiAqICAgYmUgcmVxdWVzdGluZyBhIGR5bmFtaWMgcHJvcGVydHkgdGhhdCBoYXNuJ3QgeWV0IGJlZW4gbG9hZGVkL2RlZmluZWQuIFRoaXMgaXMgdGhlIHB1cnBvc2Ugb2YgQHNlZSBVdGlscy5keW5hbWljUHJvcElEOyxcbiAqICAgYW5kIHRoaXMgc3BlY2lhbGl6ZWQgdGVtcGxhdGUgZm9ybWF0OiB0byBwcm92aWRlIGR5bmFtaWMgcHJvcHMgYnkgaWQsIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgd2hlbiBuZWVkZWQuXG4gKlxuICogICBUaGUgdGVtcGxhdGUgZW5naW5lIGFsc28gd2lsbCBoYXBwaWx5IGFjY2VwdCByb2d1ZSBtZXRob2QgbmFtZXMuIEZvciBleGFtcGxlLCBpbiBhIE15dGhpeCBVSSBjb21wb25lbnQgeW91IGFyZSBidWlsZGluZyxcbiAqICAgeW91IG1pZ2h0IGhhdmUgYW4gZWxlbWVudCBsaWtlIGA8YnV0dG9uIG9uY2xpY2s9XCJvbkJ1dHRvbkNsaWNrXCI+Q2xpY2sgTWUhPGJ1dHRvbj5gLiBUaGUgdGVtcGxhdGluZyBlbmdpbmUgd2lsbCBkZXRlY3QgdGhhdFxuICogICB0aGlzIGlzIE9OTFkgYW4gaWRlbnRpZmllciwgYW5kIHNvIHdpbGwgc2VhcmNoIGZvciB0aGUgc3BlY2lmaWVkIG1ldGhvZCBpbiB0aGUgYXZhaWxhYmxlIFwic2NvcGVcIiAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KSxcbiAqICAgd2hpY2ggaW5jbHVkZXMgYHRoaXNgIGluc3RhbmNlIG9mIHlvdXIgY29tcG9uZW50IGFzIHRoZSBmaXJzdCBgdGFyZ2V0YC4gVGhpcyBwYXR0ZXJuIGlzIG5vdCByZXF1aXJlZCwgYXMgeW91IGNhbiBjYWxsIHlvdXJcbiAqICAgY29tcG9uZW50IG1ldGhvZCBkaXJlY3RseSB5b3Vyc2VsZiwgYXMgd2l0aCBhbnkgYXR0cmlidXRlIGV2ZW50IGJpbmRpbmcgaW4gdGhlIERPTSwgaS5lOiBgPGJ1dHRvbiBvbmNsaWNrPVwidGhpcy5vbkJ1dHRvbkNsaWNrKGV2ZW50KVwiPkNsaWNrIE1lITxidXR0b24+YC5cbiAqXG4gKiAgIE9uZSBsYXN0IHRoaW5nIHRvIG1lbnRpb24gaXMgdGhhdCB3aGVuIHRoZXNlIFwibWFjcm9cIiBtZXRob2RzIGFyZSBjYWxsZWQgYnkgTXl0aGl4IFVJLCBhbGwgZW51bWVyYWJsZSBrZXlzIG9mIHRoZSBnZW5lcmF0ZWRcbiAqICAgXCJzY29wZVwiIChzZWUgQHNlZSBVdGlscy5jcmVhdGVTY29wZTspIGFyZSBwYXNzZWQgaW50byB0aGUgbWFjcm8gbWV0aG9kIGFzIGFyZ3VtZW50cy4gVGhpcyBtZWFucyB0aGF0IHRoZSBrZXlzL3ZhbHVlcyBvZiBhbGwgc2NvcGUgYHRhcmdldHNgXG4gKiAgIGFyZSBhdmFpbGFibGUgZGlyZWN0bHkgaW4geW91ciBqYXZhc2NyaXB0IHNjb3BlLiBpLmUuIHlvdSBjYW4gZG8gdGhpbmdzIGxpa2UgYG5hbWU9XCJjb21wb25lbnRJbnN0YW5jZVByb3BlcnR5KHRoaXNBdHRyaWJ1dGUxLCBvdGhlckF0dHJpYnV0ZSlcImAgd2l0aG91dCBuZWVkaW5nIHRvIGRvXG4gKiAgIGBuYW1lPVwidGhpcy5jb21wb25lbnRJbnN0YW5jZVByb3BlcnR5KHRoaXMudGhpc0F0dHJpYnV0ZTEsIHRoaXMub3RoZXJBdHRyaWJ1dGUpXCJgLiA6d2FybmluZzogSXQgaXMgaW1wb3J0YW50IHRvIGtlZXAgaW4gbWluZCB0aGF0IGRpcmVjdCByZWZlcmVuY2UgYWNjZXNzIGxpa2UgdGhpcyBpbiBhIG1hY3JvXG4gKiAgIHdpbGwgYnlwYXNzIHRoZSBcInNjb3BlXCIgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykgUHJveHksIGFuZCBzbyBpZiB0aGUgc3BlY2lmaWVkIGtleSBpcyBub3QgZm91bmQgKHBhc3NlZCBpbiBhcyBhbiBhcmd1bWVudCB0byB0aGUgbWFjcm8pLCB0aGVuIGFuIGVycm9yIHdpbGwgYmUgdGhyb3duIGJ5IGphdmFzY3JpcHQuXG4gKlxuICogICBJdCBpcyBhYnNvbHV0ZWx5IHBvc3NpYmxlIGZvciB5b3UgdG8gcmVjZWl2ZSBhbmQgc2VuZCBhcmd1bWVudHMgdmlhIHRoZXNlIGdlbmVyYXRlZCBcIm1hY3Jvc1wiLiBgbXl0aGl4LXVpLXNlYXJjaGAgZG9lcyB0aGlzIGZvclxuICogICBleGFtcGxlIHdoZW4gYSBcImZpbHRlclwiIG1ldGhvZCBpcyBwYXNzZWQgdmlhIGFuIGF0dHJpYnV0ZS4gQnkgZGVmYXVsdCBubyBleHRyYSBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIHdoZW4gY2FsbGVkIGRpcmVjdGx5IGJ5IHRoZSB0ZW1wbGF0aW5nIGVuZ2luZS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIEFuIG9iamVjdCB3aXRoIHRoZSBzaGFwZSBgeyBib2R5OiBzdHJpbmc7IHByZWZpeD86IHN0cmluZzsgc2NvcGU6IG9iamVjdDsgfWAuXG4gKlxuICogICAgICAgMS4gYGJvZHlgIGlzIHRoZSBhY3R1YWwgYm9keSBvZiB0aGUgYG5ldyBGdW5jdGlvbmAuXG4gKiAgICAgICAyLiBgc2NvcGVgIGlzIHRoZSBzY29wZSAoYHRoaXNgKSB0aGF0IHlvdSB3YW50IHRvIGJpbmQgdG8gdGhlIHJlc3VsdGluZyBtZXRob2QuXG4gKiAgICAgICAgICBUaGlzIHdvdWxkIGdlbmVyYWxseSBiZSBhIHNjb3BlIGNyZWF0ZWQgYnkgQHNlZSBVdGlscy5jcmVhdGVTY29wZTtcbiAqICAgICAgIDMuIGBwcmVmaXhgIGFuIG9wdGlvbmFsIHByZWZpeCBmb3IgdGhlIGJvZHkgb2YgdGhlIGBuZXcgRnVuY3Rpb25gLiBUaGlzIHByZWZpeCBpcyBhZGRlZFxuICogICAgICAgICAgYmVmb3JlIGFueSBmdW5jdGlvbiBib2R5IGNvZGUgdGhhdCBNeXRoaXggVUkgZ2VuZXJhdGVzLlxuICogICAgICAgICAgU2VlIGhlcmUgQHNvdXJjZVJlZiBfY3JlYXRlVGVtcGxhdGVNYWNyb1ByZWZpeEZvckJpbmRFdmVudFRvRWxlbWVudDsgZm9yIGFuIGV4YW1wbGUgdXNlXG4gKiAgICAgICAgICBvZiBgcHJlZml4YCAobm90aWNlIGhvdyBgYXJndW1lbnRzWzFdYCBpcyB1c2VkIGluc3RlYWQgb2YgYGFyZ3VtZW50c1swXWAsIGFzIGBhcmd1bWVudHNbMF1gIGlzIGFsd2F5cyByZXNlcnZlZFxuICogICAgICAgICAgZm9yIGxvY2FsIHZhcmlhYmxlIG5hbWVzIFwiaW5qZWN0ZWRcIiBmcm9tIHRoZSBjcmVhdGVkIFwic2NvcGVcIikuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IEFzaWRlIGZvciBzb21lIGJlaGluZC10aGUtc2NlbmUgbW9kaWZpY2F0aW9ucyBhbmQgZWFzZS1vZi11c2Ugc2xpY2tuZXNzLCB0aGlzIGVzc2VudGlhbGx5IGp1c3QgY3JlYXRlcyBhIGBuZXcgRnVuY3Rpb25gIGFuZCBiaW5kcyBhIFwic2NvcGVcIiAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KSB0byBpdC5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoZSBwcm92aWRlZCAoYW5kIG9wdGlvbmFsKSBgcHJlZml4YCBjYW4gYmUgdXNlZCBhcyB0aGUgc3RhcnQgb2YgdGhlIG1hY3JvIGBuZXcgRnVuY3Rpb25gIGJvZHkgY29kZS4gaS5lLiBAc2VlIFV0aWxzLmJpbmRFdmVudFRvRWxlbWVudDsgZG9lcyBleGFjdGx5IHRoaXMgdG8gYWxsb3cgZGlyZWN0IHNjb3BlZFxuICogICAgIGFjY2VzcyB0byB0aGUgYGV2ZW50YCBpbnN0YW5jZS4gQHNvdXJjZVJlZiBfY3JlYXRlVGVtcGxhdGVNYWNyb1ByZWZpeEZvckJpbmRFdmVudFRvRWxlbWVudDtcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoZSByZXR1cm4gbWV0aG9kIGlzIGJvdW5kIGJ5IGNhbGxpbmcgYC5iaW5kKHNjb3BlKWAuIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBtb2RpZnkgYHRoaXNgIGF0IHRoZSBjYWxsLXNpdGUuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGZ1bmN0aW9uOyBBIGZ1bmN0aW9uIHRoYXQgaXMgXCJjb250ZXh0IGF3YXJlXCIgYnkgYmVpbmcgYm91bmQgdG8gdGhlIHByb3ZpZGVkIGBzY29wZWAgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZU1hY3JvKHsgcHJlZml4LCBib2R5LCBzY29wZSB9KSB7XG4gIGxldCBmdW5jdGlvbkJvZHkgPSBib2R5O1xuICBpZiAoZnVuY3Rpb25Cb2R5LmNoYXJBdCgwKSA9PT0gJyUnIHx8IEVWRU5UX0FDVElPTl9KVVNUX05BTUUudGVzdChmdW5jdGlvbkJvZHkpKSB7XG4gICAgaWYgKGZ1bmN0aW9uQm9keS5jaGFyQXQoMCkgPT09ICclJykge1xuICAgICAgZnVuY3Rpb25Cb2R5ID0gYCh0aGlzLmR5bmFtaWNQcm9wSUQgfHwgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5keW5hbWljUHJvcElEKSgnJHtmdW5jdGlvbkJvZHkuc3Vic3RyaW5nKDEpLnRyaW0oKS5yZXBsYWNlKC8nL2csICdcXFxcXFwnJyl9JylgO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jdGlvbkJvZHkgPSBgKCgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgX19fXyQgPSAke2Z1bmN0aW9uQm9keX07XG4gICAgICAgICAgcmV0dXJuICh0eXBlb2YgX19fXyQgPT09ICdmdW5jdGlvbicpID8gX19fXyQuYXBwbHkodGhpcywgQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpKSA6IF9fX18kO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJHtmdW5jdGlvbkJvZHkucmVwbGFjZSgvXlxccyp0aGlzXFwuLywgJycpfS5hcHBseSh0aGlzLCBBcnJheS5mcm9tKGFyZ3VtZW50cykuc2xpY2UoMSkpO1xuICAgICAgICB9XG4gICAgICB9KSgpO2A7XG4gICAgfVxuICB9XG5cbiAgbGV0IGNvbnRleHRDYWxsQXJncyA9IGdldENvbnRleHRDYWxsQXJncyhzY29wZSwgeyAnX19tYWNyb1NvdXJjZSc6IG51bGwsICdfX2V4cGFuZGVkTWFjcm9Tb3VyY2UnOiBudWxsIH0pO1xuXG4gIGZ1bmN0aW9uQm9keSA9IGB0cnkgeyAkeyhwcmVmaXgpID8gYCR7cHJlZml4fTtgIDogJyd9cmV0dXJuICR7KGZ1bmN0aW9uQm9keSB8fCAnKHZvaWQgMCknKS5yZXBsYWNlKC9eXFxzKnJldHVyblxccysvLCAnJykudHJpbSgpfTsgfSBjYXRjaCAoZXJyb3IpIHsgY29uc29sZS5lcnJvcihcXGBFcnJvciBpbiBtYWNybyBbXFwke19fbWFjcm9Tb3VyY2V9XTpcXGAsIGVycm9yLCBfX2V4cGFuZGVkTWFjcm9Tb3VyY2UpOyB0aHJvdyBlcnJvcjsgfWA7XG5cbiAgbGV0IGxvY2FsU2NvcGUgPSBPYmplY3QuY3JlYXRlKHNjb3BlKTtcbiAgbG9jYWxTY29wZS5fX21hY3JvU291cmNlID0gYm9keTtcbiAgbG9jYWxTY29wZS5fX2V4cGFuZGVkTWFjcm9Tb3VyY2UgPSBmdW5jdGlvbkJvZHk7XG5cbiAgcmV0dXJuIChuZXcgRnVuY3Rpb24oY29udGV4dENhbGxBcmdzLCBmdW5jdGlvbkJvZHkpKS5iaW5kKHNjb3BlIHx8IHt9LCBzY29wZSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBQYXJzZSBhIHRlbXBsYXRlLCBhbmQgcmV0dXJuIGl0cyBwYXJ0cy4gQSB0ZW1wbGF0ZSBcInBhcnRcIiBpcyBvbmUgb2YgdHdvIHR5cGVzOiBgJ2xpdGVyYWwnYCwgb3IgYCdtYWNybydgLlxuICpcbiAqICAgVGFrZSBmb3IgZXhhbXBsZSB0aGUgZm9sbG93aW5nIHRlbXBsYXRlOiBgJ0hlbGxvIFxcQEBncmVldGluZ0BAISEhJ2AuIFRoaXMgdGVtcGxhdGUgd291bGQgcmVzdWx0IGluIHRocmVlIFwicGFydHNcIiBhZnRlciBwYXJzaW5nOlxuICogICAxLiBgeyB0eXBlOiAnbGl0ZXJhbCcsIHNvdXJjZTogJ0hlbGxvICcsIHN0YXJ0OiAwLCBlbmQ6IDYgfWBcbiAqICAgMi4gYHsgdHlwZTogJ21hY3JvJywgc291cmNlOiAnXFxAQGdyZWV0aW5nQEAnLCBtYWNybzogPGZ1bmN0aW9uPiwgc3RhcnQ6IDYsIGVuZDogMTggfWBcbiAqICAgMy4gYHsgdHlwZTogJ2xpdGVyYWwnLCBzb3VyY2U6ICchISEnLCBzdGFydDogMTgsIGVuZDogMjEgfWBcbiAqXG4gKiAgIENvbmNhdGVuYXRpbmcgYWxsIGBzb3VyY2VgIHByb3BlcnRpZXMgdG9nZXRoZXIgd2lsbCByZXN1bHQgaW4gdGhlIG9yaWdpbmFsIGlucHV0LlxuICogICBDb25jYXRlbmF0aW5nIGFsbCBgc291cmNlYCBwcm9wZXJ0aWVzLCBhbG9uZyB3aXRoIHRoZSByZXN1bHQgb2YgY2FsbGluZyBhbGwgYG1hY3JvYCBmdW5jdGlvbnMsIHdpbGwgcmVzdWx0IGluIHRoZSBvdXRwdXQgKGkuZS4gYHBhcnRbMF0uc291cmNlICsgcGFydFsxXS5tYWNybygpICsgcGFydFsyXS5zb3VyY2VgKS5cbiAqICAgVGhlIGBtYWNyb2AgcHJvcGVydHkgaXMgdGhlIGFjdHVhbCBtYWNybyBmdW5jdGlvbiBmb3IgdGhlIHBhcnNlZCB0ZW1wbGF0ZSBwYXJ0IChpLmUuIGluIG91ciBleGFtcGxlIGAnXFxAQGdyZWV0aW5nQEAnYCkuXG4gKiAgIGBzdGFydGAgYW5kIGBlbmRgIGFyZSB0aGUgb2Zmc2V0cyBmcm9tIHRoZSBvcmlnaW5hbCBgdGV4dGAgd2hlcmUgdGhlIHBhcnQgY2FuIGJlIGZvdW5kLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHRleHRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIHRlbXBsYXRlIHN0cmluZyB0byBwYXJzZS5cbiAqICAgLSBuYW1lOiBvcHRpb25zXG4gKiAgICAgZGF0YVR5cGU6IG9iamVjdFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIE9wdGlvbnMgZm9yIHRoZSBvcGVyYXRpb24uIFRoZSBzaGFwZSBvZiB0aGlzIG9iamVjdCBpcyBgeyBwcmVmaXg/OiBzdHJpbmcsIHNjb3BlOiBvYmplY3QgfWAuXG4gKiAgICAgICBgc2NvcGVgIGRlZmluZXMgdGhlIHNjb3BlIGZvciBtYWNyb3MgY3JlYXRlZCBieSB0aGlzIG1ldGhvZCAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KS5cbiAqICAgICAgIGBwcmVmaXhgIGRlZmluZXMgYSBmdW5jdGlvbiBib2R5IHByZWZpeCB0byB1c2Ugd2hpbGUgY3JlYXRpbmcgbWFjcm9zIChzZWUgQHNlZSBVdGlscy5jcmVhdGVUZW1wbGF0ZU1hY3JvOykuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRvIHNraXAgcGFyc2luZyBhIHNwZWNpZmljIHRlbXBsYXRlIHBhcnQsIHByZWZpeCB3aXRoIGEgYmFja3NsYXNoLCBpLmUuIGBcXFxcXFxcXEBAZ3JlZXRpbmdAQGAuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIEFycmF5PFRlbXBsYXRlUGFydD47ICoqVGVtcGxhdGVQYXJ0Kio6IGB7IHR5cGU6ICdsaXRlcmFsJyB8ICdtYWNybycsIHNvdXJjZTogc3RyaW5nLCBzdGFydDogbnVtYmVyLCBlbmQ6IG51bWJlciwgbWFjcm8/OiBmdW5jdGlvbiB9YC4gUmV0dXJuIGFsbCBwYXJzZWQgcGFydHMgb2YgdGhlIHRlbXBsYXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZVBhcnRzKHRleHQsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCBwYXJ0cyAgICAgICAgID0gW107XG4gIGxldCBjdXJyZW50T2Zmc2V0ID0gMDtcblxuICBjb25zdCBhZGRMaXRlcmFsID0gKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpID0+IHtcbiAgICBsZXQgc291cmNlID0gdGV4dC5zdWJzdHJpbmcoc3RhcnRPZmZzZXQsIGVuZE9mZnNldCkucmVwbGFjZSgvXFxcXEBAL2csICdAQCcpO1xuICAgIHBhcnRzLnB1c2goeyB0eXBlOiAnbGl0ZXJhbCcsIHNvdXJjZSwgc3RhcnQ6IHN0YXJ0T2Zmc2V0LCBlbmQ6IGVuZE9mZnNldCB9KTtcbiAgfTtcblxuICB0ZXh0LnJlcGxhY2UoLyg/PCFcXFxcKShAQCkoLis/KVxcMS9nLCAobSwgXywgcGFyc2VkVGV4dCwgb2Zmc2V0KSA9PiB7XG4gICAgaWYgKGN1cnJlbnRPZmZzZXQgPCBvZmZzZXQpXG4gICAgICBhZGRMaXRlcmFsKGN1cnJlbnRPZmZzZXQsIG9mZnNldCk7XG5cbiAgICBjdXJyZW50T2Zmc2V0ID0gb2Zmc2V0ICsgbS5sZW5ndGg7XG5cbiAgICBsZXQgbWFjcm8gPSBjcmVhdGVUZW1wbGF0ZU1hY3JvKHsgLi4ub3B0aW9ucywgYm9keTogcGFyc2VkVGV4dCB9KTtcbiAgICBwYXJ0cy5wdXNoKHsgdHlwZTogJ21hY3JvJywgc291cmNlOiBtLCBtYWNybywgc3RhcnQ6IG9mZnNldCwgZW5kOiBjdXJyZW50T2Zmc2V0IH0pO1xuICB9KTtcblxuICBpZiAoY3VycmVudE9mZnNldCA8IHRleHQubGVuZ3RoKVxuICAgIGFkZExpdGVyYWwoY3VycmVudE9mZnNldCwgdGV4dC5sZW5ndGgpO1xuXG4gIHJldHVybiBwYXJ0cztcbn1cblxuY29uc3QgTk9PUCA9IChpdGVtKSA9PiBpdGVtO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29tcGlsZSB0aGUgdGVtcGxhdGUgcGFydHMgdGhhdCB3ZXJlIHBhcnNlZCBieSBAc2VlIFV0aWxzLnBhcnNlVGVtcGxhdGVQYXJ0czsuXG4gKlxuICogICBJdCBpcyBhbHNvIHBvc3NpYmxlIHRvIHByb3ZpZGUgdGhpcyBtZXRob2QgYW4gYXJyYXkgb2YgQHNlZSBFbGVtZW50cy5FbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLFxuICogICBvciBAc2VlIFF1ZXJ5RW5naW5lLlF1ZXJ5RW5naW5lOyBpbnN0YW5jZXMgKHRoYXQgY29udGFpbiBAc2VlIEVsZW1lbnRzLkVsZW1lbnREZWZpbml0aW9uOyBpbnN0YW5jZXMpLlxuICogICBJZiBlaXRoZXIgb2YgdGhlc2UgdHlwZXMgYXJlIGZvdW5kIGluIHRoZSBpbnB1dCBhcnJheSAoZXZlbiBvbmUpLCB0aGVuIHRoZSBlbnRpcmUgcmVzdWx0IGlzIHJldHVybmVkXG4gKiAgIGFzIGEgcmF3IGFycmF5LlxuICpcbiAqICAgT3IsIGlmIGFueSBvZiB0aGUgcmVzdWx0aW5nIHBhcnRzIGlzICoqbm90KiogYSBAc2VlIFV0aWxzLnBhcnNlVGVtcGxhdGVQYXJ0cz9jYXB0aW9uPVRlbXBsYXRlUGFydDsgb3IgYSBgc3RyaW5nYCxcbiAqICAgdGhlbiByZXR1cm4gdGhlIHJlc3VsdGluZyB2YWx1ZSByYXcuXG4gKlxuICogICBPdGhlcndpc2UsIGlmIGFsbCByZXN1bHRpbmcgcGFydHMgYXJlIGEgYHN0cmluZ2AsIHRoZW4gdGhlIHJlc3VsdGluZyBwYXJ0cyBhcmUgam9pbmVkLCBhbmQgYSBgc3RyaW5nYCBpcyByZXR1cm5lZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBwYXJ0c1xuICogICAgIGRhdGFUeXBlczpcbiAqICAgICAgIC0gQXJyYXk8VGVtcGxhdGVQYXJ0PlxuICogICAgICAgLSBBcnJheTxFbGVtZW50RGVmaW5pdGlvbj5cbiAqICAgICAgIC0gQXJyYXk8UXVlcnlFbmdpbmU+XG4gKiAgICAgICAtIEFycmF5PGFueT5cbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgdGVtcGxhdGUgcGFydHMgdG8gY29tcGlsZSB0b2dldGhlci5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQXJyYXk8YW55PjsgQHR5cGVzIHN0cmluZzsgUmV0dXJuIHRoZSByZXN1bHQgYXMgYSBzdHJpbmcsIG9yIGFuIGFycmF5IG9mIHJhdyB2YWx1ZXMsIG9yIGEgcmF3IHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlRnJvbVBhcnRzKHBhcnRzLCBjYWxsYmFjaykge1xuICBsZXQgcmVzdWx0ID0gcGFydHNcbiAgICAubWFwKChwYXJ0KSA9PiB7XG4gICAgICBpZiAoIXBhcnQpXG4gICAgICAgIHJldHVybiBwYXJ0O1xuXG4gICAgICBpZiAocGFydFtNWVRISVhfVFlQRV0gPT09IEVMRU1FTlRfREVGSU5JVElPTl9UWVBFIHx8IHBhcnRbTVlUSElYX1RZUEVdID09PSBRVUVSWV9FTkdJTkVfVFlQRSlcbiAgICAgICAgcmV0dXJuIHBhcnQ7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChwYXJ0LnR5cGUgPT09ICdsaXRlcmFsJylcbiAgICAgICAgICByZXR1cm4gcGFydC5zb3VyY2U7XG4gICAgICAgIGVsc2UgaWYgKHBhcnQudHlwZSA9PT0gJ21hY3JvJylcbiAgICAgICAgICByZXR1cm4gcGFydC5tYWNybygpO1xuXG4gICAgICAgIHJldHVybiBwYXJ0O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICByZXR1cm4gcGFydC5zb3VyY2U7XG4gICAgICB9XG4gICAgfSlcbiAgICAubWFwKGNhbGxiYWNrIHx8IE5PT1ApXG4gICAgLmZpbHRlcigoaXRlbSkgPT4gKGl0ZW0gIT0gbnVsbCAmJiBpdGVtICE9PSAnJykpO1xuXG4gIGlmIChyZXN1bHQuc29tZSgoaXRlbSkgPT4gKGl0ZW1bTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSB8fCBpdGVtW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpKSlcbiAgICByZXR1cm4gcmVzdWx0O1xuXG4gIGlmIChyZXN1bHQuc29tZSgoaXRlbSkgPT4gQmFzZVV0aWxzLmlzVHlwZShpdGVtLCAnOjpTdHJpbmcnKSkpXG4gICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcblxuICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPCAyKSA/IHJlc3VsdFswXSA6IHJlc3VsdDtcbn1cblxuY29uc3QgRk9STUFUX1RFUk1fQUxMT1dBQkxFX05PREVTID0gWyAzLCAyIF07IC8vIFRFWFRfTk9ERSwgQVRUUklCVVRFX05PREVcblxuLyoqXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIEdpdmVuIGEgTm9kZSwgdGFrZSB0aGUgYC5ub2RlVmFsdWVgIG9mIHRoYXQgbm9kZSwgYW5kIGlmIGl0IGlzIGEgdGVtcGxhdGUsXG4gKiAgIHBhcnNlIHRoYXQgdGVtcGxhdGUgdXNpbmcgQHNlZSBVdGlscy5wYXJzZVRlbXBsYXRlUGFydHM7LCBhbmQgdGhlblxuICogICBjb21waWxlIHRoYXQgdGVtcGxhdGUgdXNpbmcgQHNlZSBVdGlscy5jb21waWxlVGVtcGxhdGVGcm9tUGFydHM7LiBUaGVcbiAqICAgcmVzdWx0aW5nIHRlbXBsYXRlIHBhcnRzIGFyZSB0aGVuIHNjYW5uZWQuIElmIGFueSBvZiB0aGUgYG1hY3JvKClgIGNhbGxzXG4gKiAgIHJlc3VsdCBpbiBhIEBzZWUgRHluYW1pY1Byb3BlcnR5P2NhcHRpb249RHluYW1pY1Byb3BlcnR5OywgdGhlbiBzZXQgdXBcbiAqICAgbGlzdGVuZXJzIHZpYSBgYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgLi4uKWAgb24gZWFjaCB0byBsaXN0ZW4gZm9yXG4gKiAgIGNoYW5nZXMgdG8gZHluYW1pYyBwcm9wZXJ0aWVzLiBXaGVuIGEgbGlzdGVuZXIgdXBkYXRlcywgdGhlIHRlbXBsYXRlIHBhcnRzXG4gKiAgIGFyZSByZWNvbXBpbGVkLCBhbmQgdGhlIGAubm9kZVZhbHVlYCBpcyBzZXQgYWdhaW4gd2l0aCB0aGUgbmV3IHJlc3VsdC5cbiAqXG4gKiAgIEluIHNob3J0LCB0aGlzIG1ldGhvZCBmb3JtYXRzIHRoZSB2YWx1ZSBvZiBhIE5vZGUgaWYgdGhlIHZhbHVlIGlzIGEgdGVtcGxhdGUsXG4gKiAgIGFuZCBpbiBkb2luZyBzbyBiaW5kcyB0byBkeW5hbWljIHByb3BlcnRpZXMgZm9yIGZ1dHVyZSB1cGRhdGVzIHRvIHRoaXMgbm9kZS5cbiAqXG4gKiAgIElmIHRoZSBgLm5vZGVWYWx1ZWAgb2YgdGhlIE5vZGUgaXMgZGV0ZWN0ZWQgdG8gKipub3QqKiBiZSBhIHRlbXBsYXRlLCB0aGVuXG4gKiAgIHRoZSByZXN1bHQgaXMgYSBuby1vcGVyYXRpb24sIGFuZCB0aGUgcmF3IHZhbHVlIG9mIHRoZSBOb2RlIGlzIHNpbXBseSByZXR1cm5lZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBub2RlXG4gKiAgICAgZGF0YVR5cGU6IE5vZGVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgTm9kZSB3aG9zZSB2YWx1ZSBzaG91bGQgYmUgZm9ybWF0dGVkLiBUaGlzIG11c3QgYmUgYSBURVhUX05PREUgb3IgYSBBVFRSSUJVVEVfTk9ERS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgcmVzdWx0aW5nIG5vZGUgdmFsdWUuIElmIGEgdGVtcGxhdGUgd2FzIHN1Y2Nlc3NmdWxseSBjb21waWxlZCwgZHluYW1pYyBwcm9wZXJ0aWVzXG4gKiAgIGFyZSBhbHNvIGxpc3RlbmVkIHRvIGZvciBmdXR1cmUgdXBkYXRlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE5vZGVWYWx1ZShub2RlLCBfb3B0aW9ucykge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICYmICgvXihzdHlsZXxzY3JpcHQpJC8pLnRlc3Qobm9kZS5wYXJlbnROb2RlLmxvY2FsTmFtZSkpXG4gICAgcmV0dXJuIG5vZGUubm9kZVZhbHVlO1xuXG4gIGlmICghbm9kZSB8fCBGT1JNQVRfVEVSTV9BTExPV0FCTEVfTk9ERVMuaW5kZXhPZihub2RlLm5vZGVUeXBlKSA8IDApXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJmb3JtYXROb2RlVmFsdWVcIiB1bnN1cHBvcnRlZCBub2RlIHR5cGUgcHJvdmlkZWQuIE9ubHkgVEVYVF9OT0RFIGFuZCBBVFRSSUJVVEVfTk9ERSB0eXBlcyBhcmUgc3VwcG9ydGVkLicpO1xuXG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCB0ZXh0ICAgICAgICAgID0gbm9kZS5ub2RlVmFsdWU7XG4gIGxldCB0ZW1wbGF0ZVBhcnRzID0gcGFyc2VUZW1wbGF0ZVBhcnRzKHRleHQsIG9wdGlvbnMpO1xuXG4gIC8vIHRlbXBsYXRlUGFydHMuZm9yRWFjaCgoeyB0eXBlLCBtYWNybyB9KSA9PiB7XG4gIC8vICAgaWYgKHR5cGUgIT09ICdtYWNybycpXG4gIC8vICAgICByZXR1cm47XG5cbiAgLy8gICBsZXQgcmVzdWx0ID0gbWFjcm8oKTtcbiAgLy8gICBpZiAob3B0aW9ucy5iaW5kVG9EeW5hbWljUHJvcGVydGllcyAhPT0gZmFsc2UgJiYgaXNUeXBlKHJlc3VsdCwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAvLyAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsICgpID0+IHtcbiAgLy8gICAgICAgbGV0IHJlc3VsdCA9ICgnJyArIGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzKSk7XG4gIC8vICAgICAgIGlmIChyZXN1bHQgIT09IG5vZGUubm9kZVZhbHVlKVxuICAvLyAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gcmVzdWx0O1xuICAvLyAgICAgfSwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAvLyAgIH1cbiAgLy8gfSk7XG5cbiAgbGV0IHJlc3VsdCA9IGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzLCAocmVzdWx0KSA9PiB7XG4gICAgaWYgKHJlc3VsdCAmJiBvcHRpb25zLmJpbmRUb0R5bmFtaWNQcm9wZXJ0aWVzICE9PSBmYWxzZSAmJiBCYXNlVXRpbHMuaXNUeXBlKHJlc3VsdCwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAgICAgcmVzdWx0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9ICgnJyArIGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyh0ZW1wbGF0ZVBhcnRzKSk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IG5vZGUubm9kZVZhbHVlKVxuICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gcmVzdWx0O1xuICAgICAgfSwgeyBjYXB0dXJlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xuXG4gIGlmIChyZXN1bHQgPT0gbnVsbClcbiAgICByZXN1bHQgPSAnJztcblxuICByZXR1cm4gKG9wdGlvbnMuZGlzYWxsb3dIVE1MID09PSB0cnVlKSA/ICgnJyArIHJlc3VsdCkgOiByZXN1bHQ7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFID0gLyg/PCFcXFxcKUBALztcbmV4cG9ydCBmdW5jdGlvbiBpc1RlbXBsYXRlKHZhbHVlKSB7XG4gIGlmICghQmFzZVV0aWxzLmlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJykpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiBJU19URU1QTEFURS50ZXN0KHZhbHVlKTtcbn1cblxuY29uc3QgSVNfRVZFTlRfTkFNRSAgICAgPSAvXm9uLztcbmNvbnN0IEVWRU5UX05BTUVfQ0FDSEUgID0gbmV3IE1hcCgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsRXZlbnROYW1lc0ZvckVsZW1lbnQoZWxlbWVudCkge1xuICBsZXQgdGFnTmFtZSA9ICghZWxlbWVudC50YWdOYW1lKSA/IGVsZW1lbnQgOiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgbGV0IGNhY2hlICAgPSBFVkVOVF9OQU1FX0NBQ0hFLmdldCh0YWdOYW1lKTtcbiAgaWYgKGNhY2hlKVxuICAgIHJldHVybiBjYWNoZTtcblxuICBsZXQgZXZlbnROYW1lcyA9IFtdO1xuXG4gIGZvciAobGV0IGtleSBpbiBlbGVtZW50KSB7XG4gICAgaWYgKGtleS5sZW5ndGggPiAyICYmIElTX0VWRU5UX05BTUUudGVzdChrZXkpKVxuICAgICAgZXZlbnROYW1lcy5wdXNoKGtleS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG4gIEVWRU5UX05BTUVfQ0FDSEUuc2V0KHRhZ05hbWUsIGV2ZW50TmFtZXMpO1xuXG4gIHJldHVybiBldmVudE5hbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZEV2ZW50VG9FbGVtZW50KGVsZW1lbnQsIGV2ZW50TmFtZSwgX2NhbGxiYWNrKSB7XG4gIGxldCBvcHRpb25zID0ge307XG4gIGxldCBjYWxsYmFjaztcblxuICBpZiAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoX2NhbGxiYWNrKSkge1xuICAgIGNhbGxiYWNrICA9IF9jYWxsYmFjay5jYWxsYmFjaztcbiAgICBvcHRpb25zICAgPSBfY2FsbGJhY2sub3B0aW9ucyB8fCB7fTtcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayA9IF9jYWxsYmFjaztcbiAgfVxuXG4gIGlmIChCYXNlVXRpbHMuaXNUeXBlKGNhbGxiYWNrLCAnOjpTdHJpbmcnKSlcbiAgICBjYWxsYmFjayA9IGNyZWF0ZVRlbXBsYXRlTWFjcm8oeyBwcmVmaXg6ICdsZXQgZXZlbnQ9YXJndW1lbnRzWzFdJywgYm9keTogY2FsbGJhY2ssIHNjb3BlOiB0aGlzIH0pOyAvLyBAcmVmOl9jcmVhdGVUZW1wbGF0ZU1hY3JvUHJlZml4Rm9yQmluZEV2ZW50VG9FbGVtZW50XG5cbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIG9wdGlvbnMpO1xuXG4gIHJldHVybiB7IGNhbGxiYWNrLCBvcHRpb25zIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFBhdGgob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAob2JqID09IG51bGwgfHwgT2JqZWN0LmlzKG9iaiwgTmFOKSB8fCBPYmplY3QuaXMob2JqLCBJbmZpbml0eSkgfHwgT2JqZWN0LmlzKG9iaiwgLUluZmluaXR5KSlcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gIGlmIChrZXkgPT0gbnVsbCB8fCBPYmplY3QuaXMoa2V5LCBOYU4pIHx8IE9iamVjdC5pcyhrZXksIEluZmluaXR5KSB8fCBPYmplY3QuaXMoa2V5LCAtSW5maW5pdHkpKVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgbGV0IHBhcnRzICAgICAgICAgPSBrZXkuc3BsaXQoLyg/PCFcXFxcKVxcLi9nKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBjdXJyZW50VmFsdWUgID0gb2JqO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICBsZXQgcGFydCA9IHBhcnRzW2ldO1xuICAgIGxldCBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWVbcGFydF07XG4gICAgaWYgKG5leHRWYWx1ZSA9PSBudWxsKVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgIGN1cnJlbnRWYWx1ZSA9IG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChnbG9iYWxUaGlzLk5vZGUgJiYgY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuTm9kZSAmJiAoY3VycmVudFZhbHVlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCBjdXJyZW50VmFsdWUubm9kZVR5cGUgPT09IE5vZGUuQVRUUklCVVRFX05PREUpKVxuICAgIHJldHVybiBjdXJyZW50VmFsdWUubm9kZVZhbHVlO1xuXG4gIHJldHVybiAoY3VycmVudFZhbHVlID09IG51bGwpID8gZGVmYXVsdFZhbHVlIDogY3VycmVudFZhbHVlO1xufVxuXG5jb25zdCBDQUNIRURfUFJPUEVSVFlfTkFNRVMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgU0tJUF9QUk9UT1RZUEVTICAgICAgID0gW1xuICBnbG9iYWxUaGlzLkhUTUxFbGVtZW50LFxuICBnbG9iYWxUaGlzLk5vZGUsXG4gIGdsb2JhbFRoaXMuRWxlbWVudCxcbiAgZ2xvYmFsVGhpcy5PYmplY3QsXG4gIGdsb2JhbFRoaXMuQXJyYXksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUHJvcGVydHlOYW1lcyhfb2JqKSB7XG4gIGlmICghQmFzZVV0aWxzLmlzQ29sbGVjdGFibGUoX29iaikpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGxldCBjYWNoZWROYW1lcyA9IENBQ0hFRF9QUk9QRVJUWV9OQU1FUy5nZXQoX29iaik7XG4gIGlmIChjYWNoZWROYW1lcylcbiAgICByZXR1cm4gY2FjaGVkTmFtZXM7XG5cbiAgbGV0IG9iaiAgID0gX29iajtcbiAgbGV0IG5hbWVzID0gbmV3IFNldCgpO1xuXG4gIHdoaWxlIChvYmopIHtcbiAgICBsZXQgb2JqTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IG9iak5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspXG4gICAgICBuYW1lcy5hZGQob2JqTmFtZXNbaV0pO1xuXG4gICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgaWYgKG9iaiAmJiBTS0lQX1BST1RPVFlQRVMuaW5kZXhPZihvYmouY29uc3RydWN0b3IpID49IDApXG4gICAgICBicmVhaztcbiAgfVxuXG4gIGxldCBmaW5hbE5hbWVzID0gQXJyYXkuZnJvbShuYW1lcyk7XG4gIENBQ0hFRF9QUk9QRVJUWV9OQU1FUy5zZXQoX29iaiwgZmluYWxOYW1lcyk7XG5cbiAgcmV0dXJuIGZpbmFsTmFtZXM7XG59XG5cbmNvbnN0IExBTkdfUFJPVklERVJfRFlOQU1JQ19QUk9QRVJUWV9DQUNIRSA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0RHluYW1pY1Byb3BlcnR5Rm9yUGF0aChrZXlQYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgbGV0IGluc3RhbmNlQ2FjaGUgPSBMQU5HX1BST1ZJREVSX0RZTkFNSUNfUFJPUEVSVFlfQ0FDSEUuZ2V0KHRoaXMpO1xuICBpZiAoIWluc3RhbmNlQ2FjaGUpIHtcbiAgICBpbnN0YW5jZUNhY2hlID0gbmV3IE1hcCgpO1xuICAgIExBTkdfUFJPVklERVJfRFlOQU1JQ19QUk9QRVJUWV9DQUNIRS5zZXQodGhpcywgaW5zdGFuY2VDYWNoZSk7XG4gIH1cblxuICBsZXQgcHJvcGVydHkgPSBpbnN0YW5jZUNhY2hlLmdldChrZXlQYXRoKTtcbiAgaWYgKCFwcm9wZXJ0eSkge1xuICAgIHByb3BlcnR5ID0gbmV3IER5bmFtaWNQcm9wZXJ0eShkZWZhdWx0VmFsdWUpO1xuICAgIGluc3RhbmNlQ2FjaGUuc2V0KGtleVBhdGgsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHJldHVybiBwcm9wZXJ0eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWNpYWxDbG9zZXN0KG5vZGUsIHNlbGVjdG9yKSB7XG4gIGlmICghbm9kZSB8fCAhc2VsZWN0b3IpXG4gICAgcmV0dXJuO1xuXG4gIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSAmJiAodHlwZW9mIGN1cnJlbnROb2RlLm1hdGNoZXMgIT09ICdmdW5jdGlvbicgfHwgIWN1cnJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSlcbiAgICBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpO1xuXG4gIHJldHVybiBjdXJyZW50Tm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMgfHwgMCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lRHluYW1pY1Byb3AobmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXIpIHtcbiAgbGV0IGR5bmFtaWNQcm9wZXJ0eSA9IG5ldyBEeW5hbWljUHJvcGVydHkoZGVmYXVsdFZhbHVlKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgW25hbWVdOiB7XG4gICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6ICAgICAgICAgICgpID0+IGR5bmFtaWNQcm9wZXJ0eSxcbiAgICAgIHNldDogICAgICAgICAgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGVyID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XShzZXR0ZXIobmV3VmFsdWUpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XShuZXdWYWx1ZSk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiBkeW5hbWljUHJvcGVydHk7XG59XG5cbmNvbnN0IERZTkFNSUNfUFJPUF9SRUdJU1RSWSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljUHJvcElEKGlkLCBzZXRWYWx1ZSkge1xuICBsZXQgcHJvcCA9IERZTkFNSUNfUFJPUF9SRUdJU1RSWS5nZXQoaWQpO1xuICBpZiAocHJvcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgIHByb3BbRHluYW1pY1Byb3BlcnR5LnNldF0oc2V0VmFsdWUpO1xuXG4gICAgcmV0dXJuIHByb3A7XG4gIH1cblxuICBwcm9wID0gbmV3IER5bmFtaWNQcm9wZXJ0eSgoYXJndW1lbnRzLmxlbmd0aCA+IDEpID8gc2V0VmFsdWUgOiAnJyk7XG4gIERZTkFNSUNfUFJPUF9SRUdJU1RSWS5zZXQoaWQsIHByb3ApO1xuXG4gIHJldHVybiBwcm9wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsU3RvcmVOYW1lVmFsdWVQYWlySGVscGVyKHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgbWV0YWRhdGEoXG4gICAgdGFyZ2V0LFxuICAgIE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSLFxuICAgIFsgbmFtZSwgdmFsdWUgXSxcbiAgKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jb25zdCBSRUdJU1RFUkVEX0RJU0FCTEVfVEVNUExBVEVfU0VMRUNUT1JTID0gbmV3IFNldChbICdbZGF0YS10ZW1wbGF0ZXMtZGlzYWJsZV0nLCAnbXl0aGl4LWZvci1lYWNoJyBdKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvcigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUykuam9pbignLCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvcihzZWxlY3Rvcikge1xuICBSRUdJU1RFUkVEX0RJU0FCTEVfVEVNUExBVEVfU0VMRUNUT1JTLmFkZChzZWxlY3Rvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyRGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUy5kZWxldGUoc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBnbG9iYWxTdG9yZUhlbHBlcihkeW5hbWljLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm47XG5cbiAgY29uc3Qgc2V0T25HbG9iYWwgPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICBsZXQgY3VycmVudFZhbHVlID0gZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZVtuYW1lXTtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShjdXJyZW50VmFsdWUsIER5bmFtaWNQcm9wZXJ0eSkpIHtcbiAgICAgIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVbbmFtZV1bRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZSh2YWx1ZSwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSwge1xuICAgICAgICBbbmFtZV06IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogICAgICAgICAgKCkgPT4gdmFsdWUsXG4gICAgICAgICAgc2V0OiAgICAgICAgICAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKG5ld1ZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgIGxldCBwcm9wID0gZHluYW1pY1Byb3BJRChuYW1lKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUsIHtcbiAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+IHByb3AsXG4gICAgICAgICAgc2V0OiAgICAgICAgICAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHByb3BbRHluYW1pY1Byb3BlcnR5LnNldF0obmV3VmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgcHJvcFtEeW5hbWljUHJvcGVydHkuc2V0XSh2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBwcm9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlW25hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGxldCBuYW1lVmFsdWVQYWlyID0gKEJhc2VVdGlscy5pc0NvbGxlY3RhYmxlKGFyZ3NbMF0pKSA/IG1ldGFkYXRhKFxuICAgIGFyZ3NbMF0sICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udGV4dFxuICAgIE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSLCAgLy8gc3BlY2lhbCBrZXlcbiAgKSA6IG51bGw7IC8vIEByZWY6X215dGhpeE5hbWVWYWx1ZVBhaXJIZWxwZXJVc2FnZVxuXG4gIGlmIChuYW1lVmFsdWVQYWlyKSB7XG4gICAgbGV0IFsgbmFtZSwgdmFsdWUgXSA9IG5hbWVWYWx1ZVBhaXI7XG4gICAgc2V0T25HbG9iYWwobmFtZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID4gMSAmJiBCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbMF0sICc6OlN0cmluZycpKSB7XG4gICAgbGV0IG5hbWUgID0gYXJnc1swXTtcbiAgICBsZXQgdmFsdWUgPSBhcmdzWzFdO1xuICAgIHNldE9uR2xvYmFsKG5hbWUsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgdmFsdWUgPSBhcmdzWzBdO1xuICAgIGxldCBuYW1lICA9ICh0eXBlb2YgdGhpcy5nZXRJZGVudGlmaWVyID09PSAnZnVuY3Rpb24nKSA/IHRoaXMuZ2V0SWRlbnRpZmllcigpIDogKHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykpO1xuICAgIGlmICghbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignXCJteXRoaXhVSS5nbG9iYWxTdG9yZVwiOiBcIm5hbWVcIiBpcyB1bmtub3duLCBzbyB1bmFibGUgdG8gc3RvcmUgdmFsdWUnKTtcblxuICAgIHNldE9uR2xvYmFsKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsU3RvcmUoLi4uYXJncykge1xuICByZXR1cm4gZ2xvYmFsU3RvcmVIZWxwZXIuY2FsbCh0aGlzLCBmYWxzZSwgYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnbG9iYWxTdG9yZUR5bmFtaWMoLi4uYXJncykge1xuICByZXR1cm4gZ2xvYmFsU3RvcmVIZWxwZXIuY2FsbCh0aGlzLCB0cnVlLCBhcmdzKTtcbn1cblxuY2xhc3MgU3RvcmFnZUl0ZW0ge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHRoaXMuX2MgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX3UgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX3YgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92O1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl91ID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl92ID0gdmFsdWU7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICR0eXBlOiAgJ1N0b3JhZ2VJdGVtJyxcbiAgICAgIF9jOiAgICAgdGhpcy5fYyxcbiAgICAgIF91OiAgICAgdGhpcy5fdSxcbiAgICAgIF92OiAgICAgdGhpcy5fdixcbiAgICB9O1xuICB9XG59XG5cbmNsYXNzIFN0b3JhZ2Uge1xuICBfcmV2aXZlKGRhdGEsIF9hbHJlYWR5VmlzaXRlZCkge1xuICAgIGlmICghZGF0YSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUoZGF0YSkpXG4gICAgICByZXR1cm4gZGF0YTtcblxuICAgIGxldCBhbHJlYWR5VmlzaXRlZCAgPSBfYWxyZWFkeVZpc2l0ZWQgfHwgbmV3IFNldCgpO1xuICAgIGxldCB0eXBlICAgICAgICAgICAgPSAoZGF0YSAmJiBkYXRhLiR0eXBlKTtcblxuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ1N0b3JhZ2VJdGVtJykge1xuICAgICAgICBsZXQgdmFsdWUgPSBkYXRhLl92O1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBTdG9yYWdlSXRlbSgpLCB7XG4gICAgICAgICAgX2M6IGRhdGEuX2MsXG4gICAgICAgICAgX3U6IGRhdGEuX3UsXG4gICAgICAgICAgX3Y6ICh2YWx1ZSAmJiAhQmFzZVV0aWxzLmlzUHJpbWl0aXZlKHZhbHVlKSkgPyB0aGlzLl9yZXZpdmUodmFsdWUsIGFscmVhZHlWaXNpdGVkKSA6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBbIGtleSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgaWYgKCF2YWx1ZSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhbHJlYWR5VmlzaXRlZC5hZGQodmFsdWUpO1xuICAgICAgZGF0YVtrZXldID0gdGhpcy5fcmV2aXZlKHZhbHVlLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBfcmF3KGRhdGEsIF9hbHJlYWR5VmlzaXRlZCkge1xuICAgIGlmICghZGF0YSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUoZGF0YSkpXG4gICAgICByZXR1cm4gZGF0YTtcblxuICAgIGxldCBhbHJlYWR5VmlzaXRlZCA9IF9hbHJlYWR5VmlzaXRlZCB8fCBuZXcgU2V0KCk7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBTdG9yYWdlSXRlbSlcbiAgICAgIHJldHVybiB0aGlzLl9yYXcoZGF0YS5nZXRWYWx1ZSgpLCBhbHJlYWR5VmlzaXRlZCk7XG5cbiAgICBmb3IgKGxldCBbIGtleSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgaWYgKCF2YWx1ZSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhbHJlYWR5VmlzaXRlZC5hZGQodmFsdWUpO1xuICAgICAgZGF0YVtrZXldID0gdGhpcy5fcmF3KHZhbHVlLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBfZ2V0UGFydHNGb3JPcGVyYXRpb24odHlwZSwgcGFydHMpIHtcbiAgICBsZXQgcGF0aFBhcnRzICAgPSAodHlwZSA9PT0gJ3NldCcpID8gcGFydHMuc2xpY2UoMCwgLTEpIDogcGFydHMuc2xpY2UoKTtcbiAgICBsZXQgcGF0aCAgICAgICAgPSBwYXRoUGFydHMubWFwKChwYXJ0KSA9PiAoKHR5cGVvZiBwYXJ0ID09PSAnc3ltYm9sJykgPyBwYXJ0LnRvU3RyaW5nKCkgOiAoJycgKyBwYXJ0KSkucmVwbGFjZSgvXFwuL2csICdcXFxcLicpKS5qb2luKCcuJyk7XG4gICAgbGV0IHBhcnNlZFBhcnRzID0gcGF0aC5zcGxpdCgvKD88IVxcXFwpXFwuL2cpO1xuICAgIGxldCBzdG9yYWdlVHlwZSA9IHBhcnNlZFBhcnRzWzBdO1xuICAgIGxldCBkYXRhICAgICAgICA9ICh0eXBlID09PSAnc2V0JykgPyBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIGxvY2FsU3RvcmFnZSwgb3Igc2Vzc2lvblN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZUVuZ2luZSA9IGdsb2JhbFRoaXNbc3RvcmFnZVR5cGVdO1xuICAgIGlmICghc3RvcmFnZUVuZ2luZSlcbiAgICAgIHJldHVybjtcblxuICAgIGxldCByb290RGF0YSAgICA9IHt9O1xuICAgIGxldCBlbmNvZGVkQmFzZSA9IHN0b3JhZ2VFbmdpbmUuZ2V0SXRlbSgnbXl0aGl4LXVpJyk7XG4gICAgaWYgKGVuY29kZWRCYXNlKVxuICAgICAgcm9vdERhdGEgPSB0aGlzLl9yZXZpdmUoSlNPTi5wYXJzZShlbmNvZGVkQmFzZSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGhQYXJ0cyxcbiAgICAgIHBhdGgsXG4gICAgICBwYXJzZWRQYXJ0cyxcbiAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIHN0b3JhZ2VFbmdpbmUsXG4gICAgICBlbmNvZGVkQmFzZSxcbiAgICAgIHJvb3REYXRhLFxuICAgIH07XG4gIH1cblxuICBfZ2V0TWV0YSh0eXBlLCBwYXJ0cykge1xuICAgIGxldCBvcGVyYXRpb24gPSB0aGlzLl9nZXRQYXJ0c0Zvck9wZXJhdGlvbih0eXBlLCBwYXJ0cyk7XG4gICAgbGV0IHtcbiAgICAgIHBhcnNlZFBhcnRzLFxuICAgICAgcm9vdERhdGEsXG4gICAgfSA9IG9wZXJhdGlvbjtcblxuICAgIGxldCBzY29wZSAgICAgICAgPSByb290RGF0YTtcbiAgICBsZXQgcGFyZW50U2NvcGUgID0gbnVsbDtcblxuICAgIGZvciAobGV0IGkgPSAxLCBpbCA9IHBhcnNlZFBhcnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChzY29wZSBpbnN0YW5jZW9mIFN0b3JhZ2VJdGVtKSB7XG4gICAgICAgIHNjb3BlID0gc2NvcGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHBhcnQgPSBwYXJzZWRQYXJ0c1tpXTtcbiAgICAgIGxldCBzdWJTY29wZSA9IChzY29wZSkgPyBzY29wZVtwYXJ0XSA6IHNjb3BlO1xuICAgICAgaWYgKHR5cGUgPT09ICdzZXQnICYmICFzdWJTY29wZSlcbiAgICAgICAgc3ViU2NvcGUgPSBzY29wZVtwYXJ0XSA9IHt9O1xuXG4gICAgICBpZiAoc3ViU2NvcGUgPT0gbnVsbCB8fCBPYmplY3QuaXMoc3ViU2NvcGUsIE5hTikgfHwgT2JqZWN0LmlzKHN1YlNjb3BlLCAtSW5maW5pdHkpIHx8IE9iamVjdC5pcyhzdWJTY29wZSwgSW5maW5pdHkpKVxuICAgICAgICBicmVhaztcblxuICAgICAgcGFyZW50U2NvcGUgPSBzY29wZTtcbiAgICAgIHNjb3BlID0gc3ViU2NvcGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZXJhdGlvbixcbiAgICAgIHBhcmVudFNjb3BlLFxuICAgICAgc2NvcGUsXG4gICAgfTtcbiAgfVxuXG4gIGdldE1ldGEoLi4ucGFydHMpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YSgnZ2V0JywgcGFydHMpO1xuICB9XG5cbiAgZ2V0KC4uLnBhcnRzKSB7XG4gICAgbGV0IHsgc2NvcGUgfSA9IHRoaXMuX2dldE1ldGEoJ2dldCcsIHBhcnRzKTtcbiAgICByZXR1cm4gdGhpcy5fcmF3KHNjb3BlKTtcbiAgfVxuXG4gIHNldCguLi5wYXJ0cykge1xuICAgIGxldCB7XG4gICAgICBvcGVyYXRpb24sXG4gICAgICBwYXJlbnRTY29wZSxcbiAgICAgIHNjb3BlLFxuICAgIH0gPSB0aGlzLl9nZXRNZXRhKCdzZXQnLCBwYXJ0cyk7XG5cbiAgICBsZXQge1xuICAgICAgZGF0YSxcbiAgICAgIHBhcnNlZFBhcnRzLFxuICAgICAgcGF0aCxcbiAgICAgIHJvb3REYXRhLFxuICAgICAgc3RvcmFnZUVuZ2luZSxcbiAgICB9ID0gb3BlcmF0aW9uO1xuXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gRGVsZXRlXG4gICAgICBpZiAocGFyZW50U2NvcGUpXG4gICAgICAgIGRlbGV0ZSBwYXJlbnRTY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV07XG4gICAgICBlbHNlXG4gICAgICAgIGRlbGV0ZSBzY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJlbnRTY29wZSlcbiAgICAgICAgcGFyZW50U2NvcGVbcGFyc2VkUGFydHNbcGFyc2VkUGFydHMubGVuZ3RoIC0gMV1dID0gbmV3IFN0b3JhZ2VJdGVtKGRhdGEpO1xuICAgICAgZWxzZVxuICAgICAgICBzY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV0gPSBuZXcgU3RvcmFnZUl0ZW0oZGF0YSk7XG4gICAgfVxuXG4gICAgc3RvcmFnZUVuZ2luZS5zZXRJdGVtKCdteXRoaXgtdWknLCBKU09OLnN0cmluZ2lmeShyb290RGF0YSkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSk7XG5nbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUgfHwge30pO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS51cmwpXG4gIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUudXJsID0gbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbik7XG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuZXhwb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmV4cG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4vZXJyb3JzLmpzJztcbmV4cG9ydCAqIGFzIEVycm9ycyBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL3N0eWxlc2hlZXQtbWFuYWdlci5qcyc7XG5leHBvcnQgKiBhcyBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL3N0eWxlc2hlZXQtbWFuYWdlci5qcyc7XG5cbmltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmV4cG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIEVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG5pbXBvcnQgeyBEeW5hbWljUHJvcGVydHkgfSBmcm9tICcuL2R5bmFtaWMtcHJvcGVydHkuanMnO1xuXG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5LWVuZ2luZS5qcyc7XG5leHBvcnQgKiBhcyBFbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlDb21wb25lbnQgfSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlSZXF1aXJlIH0gZnJvbSAnLi9teXRoaXgtdWktcmVxdWlyZS5qcyc7XG5cbmltcG9ydCB7XG4gIE15dGhpeFVJTGFuZ3VhZ2VQYWNrLFxuICBNeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXIsXG59IGZyb20gJy4vbXl0aGl4LXVpLWxhbmd1YWdlLXByb3ZpZGVyLmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlTcGlubmVyIH0gZnJvbSAnLi9teXRoaXgtdWktc3Bpbm5lci5qcyc7XG5cbmltcG9ydCB7IE15dGhpeFVJRHluYW1pY1N0eWxlIH0gZnJvbSAnLi9teXRoaXgtdWktZHluYW1pYy1zdHlsZS5qcyc7XG5cbmV4cG9ydCBjb25zdCBNeXRoaXhFbGVtZW50cyA9IHtcbiAgTXl0aGl4VUlSZXF1aXJlLFxuICBNeXRoaXhVSUxhbmd1YWdlUGFjayxcbiAgTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyLFxuICBNeXRoaXhVSVNwaW5uZXIsXG4gIE15dGhpeFVJRHluYW1pY1N0eWxlLFxufTtcblxuZXhwb3J0IHtcbiAgRHluYW1pY1Byb3BlcnR5LFxufTtcblxubGV0IF9teXRoaXhJc1JlYWR5ID0gZmFsc2U7XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhnbG9iYWxUaGlzLCB7XG4gICdvbm15dGhpeHJlYWR5Jzoge1xuICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogICAgICAgICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBzZXQ6ICAgICAgICAgIChjYWxsYmFjaykgPT4ge1xuICAgICAgaWYgKF9teXRoaXhJc1JlYWR5KSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gY2FsbGJhY2sobmV3IEV2ZW50KCdteXRoaXgtcmVhZHknKSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ215dGhpeC1yZWFkeScsIGNhbGxiYWNrKTtcbiAgICB9LFxuICB9LFxufSk7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuQmFzZVV0aWxzID0gQmFzZVV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5VdGlscyA9IFV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5Db21wb25lbnRVdGlscyA9IENvbXBvbmVudFV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5FbGVtZW50cyA9IEVsZW1lbnRzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5nbG9iYWxTdG9yZSA9IFV0aWxzLmdsb2JhbFN0b3JlO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5nbG9iYWxTdG9yZUR5bmFtaWMgPSBVdGlscy5nbG9iYWxTdG9yZUR5bmFtaWM7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUuZHluYW1pY1Byb3BJRCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBVdGlscy5keW5hbWljUHJvcElEKGlkKTtcbn07XG5cbmNsYXNzIE15dGhpeENvbm5lY3RlZEV2ZW50IGV4dGVuZHMgQ3VzdG9tRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignbXl0aGl4LWNvbm5lY3RlZCcpO1xuICB9XG59XG5cbmNsYXNzIE15dGhpeERpc2Nvbm5lY3RlZEV2ZW50IGV4dGVuZHMgQ3VzdG9tRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignbXl0aGl4LWRpc2Nvbm5lY3RlZCcpO1xuICB9XG59XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGxldCBkaWRWaXNpYmlsaXR5T2JzZXJ2ZXJzID0gZmFsc2U7XG5cbiAgY29uc3Qgb25Eb2N1bWVudFJlYWR5ID0gKCkgPT4ge1xuICAgIGlmICghZGlkVmlzaWJpbGl0eU9ic2VydmVycykge1xuICAgICAgbGV0IGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1teXRoaXgtc3JjXScpKTtcbiAgICAgIENvbXBvbmVudFV0aWxzLnZpc2liaWxpdHlPYnNlcnZlcigoeyBkaXNjb25uZWN0LCBlbGVtZW50LCB3YXNWaXNpYmxlIH0pID0+IHtcbiAgICAgICAgaWYgKHdhc1Zpc2libGUpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBsZXQgc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbXl0aGl4LXNyYycpO1xuICAgICAgICBpZiAoIXNyYylcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgQ29tcG9uZW50VXRpbHMubG9hZFBhcnRpYWxJbnRvRWxlbWVudC5jYWxsKGVsZW1lbnQsIHNyYykudGhlbigoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdteXRoaXgtcmVhZHknKTtcbiAgICAgICAgfSk7XG4gICAgICB9LCB7IGVsZW1lbnRzIH0pO1xuXG4gICAgICBkaWRWaXNpYmlsaXR5T2JzZXJ2ZXJzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ215dGhpeC1yZWFkeScpO1xuXG4gICAgaWYgKF9teXRoaXhJc1JlYWR5KVxuICAgICAgcmV0dXJuO1xuXG4gICAgX215dGhpeElzUmVhZHkgPSB0cnVlO1xuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ215dGhpeC1yZWFkeScpKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhnbG9iYWxUaGlzLCB7XG4gICAgJyQnOiB7XG4gICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogICAgICAgICguLi5hcmdzKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKC4uLmFyZ3MpLFxuICAgIH0sXG4gICAgJyQkJzoge1xuICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6ICAgICAgICAoLi4uYXJncykgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCguLi5hcmdzKSxcbiAgICB9LFxuICB9KTtcblxuICBsZXQgZG9jdW1lbnRNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsVGhpcy5teXRoaXhVSS5kb2N1bWVudE11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgbGV0IGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyID0gVXRpbHMuZ2V0RGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IoKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBtdXRhdGlvbnMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGV0IG11dGF0aW9uICA9IG11dGF0aW9uc1tpXTtcbiAgICAgIGxldCB0YXJnZXQgICAgPSBtdXRhdGlvbi50YXJnZXQ7XG5cbiAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnYXR0cmlidXRlcycpIHtcbiAgICAgICAgaWYgKGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyICYmIHRhcmdldC5wYXJlbnROb2RlICYmIHR5cGVvZiB0YXJnZXQucGFyZW50Tm9kZS5jbG9zZXN0ID09PSAnZnVuY3Rpb24nICYmIHRhcmdldC5wYXJlbnROb2RlLmNsb3Nlc3QoZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3JTdHIpKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGxldCBhdHRyaWJ1dGVOb2RlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZU5vZGUobXV0YXRpb24uYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZSAgICAgID0gKGF0dHJpYnV0ZU5vZGUpID8gYXR0cmlidXRlTm9kZS5ub2RlVmFsdWUgOiBudWxsO1xuICAgICAgICBsZXQgb2xkVmFsdWUgICAgICA9IG11dGF0aW9uLm9sZFZhbHVlO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIFV0aWxzLmlzVGVtcGxhdGUobmV3VmFsdWUpKVxuICAgICAgICAgIGF0dHJpYnV0ZU5vZGUubm9kZVZhbHVlID0gVXRpbHMuZm9ybWF0Tm9kZVZhbHVlKGF0dHJpYnV0ZU5vZGUsIHsgc2NvcGU6IFV0aWxzLmNyZWF0ZVNjb3BlKHRhcmdldCksIGRpc2FsbG93SFRNTDogdHJ1ZSB9KTtcblxuICAgICAgICBsZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gdGFyZ2V0LmNvbnN0cnVjdG9yLm9ic2VydmVkQXR0cmlidXRlcztcbiAgICAgICAgaWYgKG9ic2VydmVkQXR0cmlidXRlcyAmJiBvYnNlcnZlZEF0dHJpYnV0ZXMuaW5kZXhPZihtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lKSA8IDApIHtcbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbCh0YXJnZXQsIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgbGV0IGRpc2FibGVUZW1wbGF0aW5nID0gKGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyICYmIHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0LmNsb3Nlc3QgPT09ICdmdW5jdGlvbicgJiYgdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRlbXBsYXRlcy1kaXNhYmxlXSxteXRoaXgtZm9yLWVhY2gnKSk7XG4gICAgICAgIGxldCBhZGRlZE5vZGVzICAgICAgICA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IGFkZGVkTm9kZXMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGxldCBub2RlID0gYWRkZWROb2Rlc1tqXTtcbiAgICAgICAgICBpZiAobm9kZVtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0gJiYgbm9kZS5vbk11dGF0aW9uQWRkZWQuY2FsbChub2RlLCBtdXRhdGlvbikgPT09IGZhbHNlKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICBpZiAoIWRpc2FibGVUZW1wbGF0aW5nKVxuICAgICAgICAgICAgRWxlbWVudHMucHJvY2Vzc0VsZW1lbnRzKG5vZGUpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0ZWRFdmVudCA9IG5ldyBNeXRoaXhDb25uZWN0ZWRFdmVudCgpO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGNvbm5lY3RlZEV2ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5vbk11dGF0aW9uQ2hpbGRBZGRlZChub2RlLCBtdXRhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gbXV0YXRpb24ucmVtb3ZlZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgamwgPSByZW1vdmVkTm9kZXMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGxldCBub2RlID0gcmVtb3ZlZE5vZGVzW2pdO1xuICAgICAgICAgIGlmIChub2RlW015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSAmJiBub2RlLm9uTXV0YXRpb25SZW1vdmVkLmNhbGwobm9kZSwgbXV0YXRpb24pID09PSBmYWxzZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkaXNjb25uZWN0ZWRFdmVudCA9IG5ldyBNeXRoaXhEaXNjb25uZWN0ZWRFdmVudCgpO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGRpc2Nvbm5lY3RlZEV2ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5vbk11dGF0aW9uQ2hpbGRSZW1vdmVkKG5vZGUsIG11dGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnRNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcbiAgICBzdWJ0cmVlOiAgICAgICAgICAgIHRydWUsXG4gICAgY2hpbGRMaXN0OiAgICAgICAgICB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6ICAgICAgICAgdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogIHRydWUsXG4gIH0pO1xuXG4gIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cyhkb2N1bWVudC5oZWFkKTtcbiAgRWxlbWVudHMucHJvY2Vzc0VsZW1lbnRzKGRvY3VtZW50LmJvZHkpO1xuXG4gIGNvbnN0IERPQ1VNRU5UX0NIRUNLX1JFQURZX1RJTUUgPSAyNTA7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpXG4gICAgICBvbkRvY3VtZW50UmVhZHkoKTtcbiAgICBlbHNlXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb25Eb2N1bWVudFJlYWR5KTtcbiAgfSwgRE9DVU1FTlRfQ0hFQ0tfUkVBRFlfVElNRSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkRvY3VtZW50UmVhZHkpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9