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

    const DATA_EVENT_PREFIX = 'data-event-on';
    const handleAttribute = (element, attributeName, _attributeValue) => {
      let attributeValue      = _attributeValue;
      let lowerAttributeName  = attributeName.toLowerCase();

      // data-event-on* pattern for event binding
      if (lowerAttributeName.startsWith(DATA_EVENT_PREFIX)) {
        let eventName = lowerAttributeName.substring(DATA_EVENT_PREFIX.length);
        if (eventName) {
          let modifiedAttributeName = this.toDOMAttributeName(attributeName);
          element.setAttribute(modifiedAttributeName, attributeValue);
          _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindDataEventAttribute(element, eventName);
        }
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

    let attributeNames  = node.getAttributeNames();
    const DATA_EVENT_PREFIX = 'data-event-on';

    for (let i = 0, il = attributeNames.length; i < il; i++) {
      let attributeName       = attributeNames[i];
      let lowerAttributeName  = attributeName.toLowerCase();
      let attributeValue      = node.getAttribute(attributeName);

      // data-event-on* pattern for event binding
      if (lowerAttributeName.startsWith(DATA_EVENT_PREFIX)) {
        if (options.processEventCallbacks !== false) {
          let eventName = lowerAttributeName.substring(DATA_EVENT_PREFIX.length);
          if (eventName) {
            _utils_js__WEBPACK_IMPORTED_MODULE_2__.bindDataEventAttribute(node, eventName);
          }
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

/**
 * @deprecated Use data-event-on{eventName} attributes with bindDataEventAttribute instead.
 * This function is no longer used internally and will be removed in a future version.
 */
function getAllEventNamesForElement(element) {
  console.warn('getAllEventNamesForElement is deprecated. Use data-event-on{eventName} attributes instead.');

  const IS_EVENT_NAME = /^on/;
  let eventNames = [];

  for (let key in element) {
    if (key.length > 2 && IS_EVENT_NAME.test(key))
      eventNames.push(key.toLowerCase());
  }

  return eventNames;
}

/**
 * @deprecated Use data-event-on{eventName} attributes with bindDataEventAttribute instead.
 * This function is no longer used internally and will be removed in a future version.
 */
function bindEventToElement(element, eventName, _callback) {
  console.warn('bindEventToElement is deprecated. Use data-event-on{eventName} attributes with bindDataEventAttribute instead.');

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFLElBQUk7QUFDTjs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSXFDOztBQUVyQyxnREFBZ0Q7O0FBSTlDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVksMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0M7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUEsY0FBYyxXQUFXLEVBQUUsMkNBQTJDO0FBQ3RFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLDJCQUEyQixLQUFLO0FBQ2hDLG1DQUFtQyxhQUFhLDRFQUE0RSxLQUFLO0FBQ2pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixrQkFBa0I7O0FBRTdDO0FBQ0EseUJBQXlCLFdBQVc7O0FBRXBDO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixPQUFPO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLGlDQUFpQyxFQUFFLHNCQUFzQjtBQUN6RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLGtCQUFrQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLG1DQUFtQztBQUNuQztBQUNPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPLDhCQUE4QixzRUFBaUI7QUFDdEQ7O0FBRUE7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Y2pzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2Jhc2UtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvY29tcG9uZW50LXV0aWxzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9keW5hbWljLXByb3BlcnR5LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2VsZW1lbnRzLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2Vycm9ycy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktY29tcG9uZW50LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL215dGhpeC11aS1keW5hbWljLXN0eWxlLmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL215dGhpeC11aS1sYW5ndWFnZS1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktcmVxdWlyZS5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9teXRoaXgtdWktc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi9xdWVyeS1lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvLi9saWIvc2hhMjU2LmpzIiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL3N0eWxlc2hlZXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS8uL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbXl0aGl4LXVpLWNvcmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9teXRoaXgtdWktY29yZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL215dGhpeC11aS1jb3JlLy4vbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzTWVyZ2VhYmxlT2JqZWN0ID0gZnVuY3Rpb24gaXNNZXJnZWFibGVPYmplY3QodmFsdWUpIHtcblx0cmV0dXJuIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSlcblx0XHQmJiAhaXNTcGVjaWFsKHZhbHVlKVxufTtcblxuZnVuY3Rpb24gaXNOb25OdWxsT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNTcGVjaWFsKHZhbHVlKSB7XG5cdHZhciBzdHJpbmdWYWx1ZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cblx0cmV0dXJuIHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBSZWdFeHBdJ1xuXHRcdHx8IHN0cmluZ1ZhbHVlID09PSAnW29iamVjdCBEYXRlXSdcblx0XHR8fCBpc1JlYWN0RWxlbWVudCh2YWx1ZSlcbn1cblxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iL2I1YWM5NjNmYjc5MWQxMjk4ZTdmMzk2MjM2MzgzYmM5NTVmOTE2YzEvc3JjL2lzb21vcnBoaWMvY2xhc3NpYy9lbGVtZW50L1JlYWN0RWxlbWVudC5qcyNMMjEtTDI1XG52YXIgY2FuVXNlU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGNhblVzZVN5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcblxuZnVuY3Rpb24gaXNSZWFjdEVsZW1lbnQodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVcbn1cblxuZnVuY3Rpb24gZW1wdHlUYXJnZXQodmFsKSB7XG5cdHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyBbXSA6IHt9XG59XG5cbmZ1bmN0aW9uIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHZhbHVlLCBvcHRpb25zKSB7XG5cdHJldHVybiAob3B0aW9ucy5jbG9uZSAhPT0gZmFsc2UgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh2YWx1ZSkpXG5cdFx0PyBkZWVwbWVyZ2UoZW1wdHlUYXJnZXQodmFsdWUpLCB2YWx1ZSwgb3B0aW9ucylcblx0XHQ6IHZhbHVlXG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRBcnJheU1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHJldHVybiB0YXJnZXQuY29uY2F0KHNvdXJjZSkubWFwKGZ1bmN0aW9uKGVsZW1lbnQpIHtcblx0XHRyZXR1cm4gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQoZWxlbWVudCwgb3B0aW9ucylcblx0fSlcbn1cblxuZnVuY3Rpb24gZ2V0TWVyZ2VGdW5jdGlvbihrZXksIG9wdGlvbnMpIHtcblx0aWYgKCFvcHRpb25zLmN1c3RvbU1lcmdlKSB7XG5cdFx0cmV0dXJuIGRlZXBtZXJnZVxuXHR9XG5cdHZhciBjdXN0b21NZXJnZSA9IG9wdGlvbnMuY3VzdG9tTWVyZ2Uoa2V5KTtcblx0cmV0dXJuIHR5cGVvZiBjdXN0b21NZXJnZSA9PT0gJ2Z1bmN0aW9uJyA/IGN1c3RvbU1lcmdlIDogZGVlcG1lcmdlXG59XG5cbmZ1bmN0aW9uIGdldEVudW1lcmFibGVPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSB7XG5cdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzXG5cdFx0PyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkuZmlsdGVyKGZ1bmN0aW9uKHN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHRhcmdldCwgc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iLCJpbXBvcnQgeyBTSEEyNTYgfSBmcm9tICcuL3NoYTI1Ni5qcyc7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSk7XG5cbmV4cG9ydCB7XG4gIFNIQTI1Nixcbn07XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBCYXNlVXRpbHNcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIE1pc2MgdXRpbGl0eSBmdW5jdGlvbnMgYW5kIGdsb2JhbCBjb25zdGFudHMgYXJlIGZvdW5kIHdpdGhpbiB0aGlzIG5hbWVzcGFjZS5cbiAqL1xuXG5mdW5jdGlvbiBwYWQoc3RyLCBjb3VudCwgY2hhciA9ICcwJykge1xuICByZXR1cm4gc3RyLnBhZFN0YXJ0KGNvdW50LCBjaGFyKTtcbn1cblxuY29uc3QgSURfQ09VTlRfTEVOR1RIICAgICAgICAgPSAxOTtcbmNvbnN0IElTX0NMQVNTICAgICAgICAgICAgICAgID0gKC9eY2xhc3MgXFxTKyBcXHsvKTtcbmNvbnN0IE5BVElWRV9DTEFTU19UWVBFX05BTUVTID0gW1xuICAnQWdncmVnYXRlRXJyb3InLFxuICAnQXJyYXknLFxuICAnQXJyYXlCdWZmZXInLFxuICAnQmlnSW50JyxcbiAgJ0JpZ0ludDY0QXJyYXknLFxuICAnQmlnVWludDY0QXJyYXknLFxuICAnQm9vbGVhbicsXG4gICdEYXRhVmlldycsXG4gICdEYXRlJyxcbiAgJ0RlZGljYXRlZFdvcmtlckdsb2JhbFNjb3BlJyxcbiAgJ0Vycm9yJyxcbiAgJ0V2YWxFcnJvcicsXG4gICdGaW5hbGl6YXRpb25SZWdpc3RyeScsXG4gICdGbG9hdDMyQXJyYXknLFxuICAnRmxvYXQ2NEFycmF5JyxcbiAgJ0Z1bmN0aW9uJyxcbiAgJ0ludDE2QXJyYXknLFxuICAnSW50MzJBcnJheScsXG4gICdJbnQ4QXJyYXknLFxuICAnTWFwJyxcbiAgJ051bWJlcicsXG4gICdPYmplY3QnLFxuICAnUHJveHknLFxuICAnUmFuZ2VFcnJvcicsXG4gICdSZWZlcmVuY2VFcnJvcicsXG4gICdSZWdFeHAnLFxuICAnU2V0JyxcbiAgJ1NoYXJlZEFycmF5QnVmZmVyJyxcbiAgJ1N0cmluZycsXG4gICdTeW1ib2wnLFxuICAnU3ludGF4RXJyb3InLFxuICAnVHlwZUVycm9yJyxcbiAgJ1VpbnQxNkFycmF5JyxcbiAgJ1VpbnQzMkFycmF5JyxcbiAgJ1VpbnQ4QXJyYXknLFxuICAnVWludDhDbGFtcGVkQXJyYXknLFxuICAnVVJJRXJyb3InLFxuICAnV2Vha01hcCcsXG4gICdXZWFrUmVmJyxcbiAgJ1dlYWtTZXQnLFxuXTtcblxuY29uc3QgTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEgPSBOQVRJVkVfQ0xBU1NfVFlQRV9OQU1FUy5tYXAoKHR5cGVOYW1lKSA9PiB7XG4gIHJldHVybiBbIHR5cGVOYW1lLCBnbG9iYWxUaGlzW3R5cGVOYW1lXSBdO1xufSkuZmlsdGVyKChtZXRhKSA9PiBtZXRhWzFdKTtcblxuY29uc3QgSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvaWQtY291bnRlci1jdXJyZW50LXZhbHVlJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1tYWdpYy1udW1iZXJzXG5sZXQgaWRDb3VudGVyID0gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChnbG9iYWxUaGlzLm15dGhpeFVJLCBJRF9DT1VOVEVSX0NVUlJFTlRfVkFMVUUpKSA/IGdsb2JhbFRoaXMubXl0aGl4VUlbSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFXSA6IDBuO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIEdlbmVyYXRlIGEgcGFydGlhbGx5IHJhbmRvbSB1bmlxdWUgSUQuIFRoZSBpZCBnZW5lcmF0ZWQgd2lsbCBiZSBhIGBEYXRlLm5vdygpYFxuICogICB2YWx1ZSB3aXRoIGFuIGluY3JlbWVudGluZyBCaWdJbnQgcG9zdGZpeGVkIHRvIGl0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IEEgdW5pcXVlIElELlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZygnSUQ6ICcsIEJhc2VVdGlscy5nZW5lcmF0ZUlEKCkpO1xuICogICAgIC8vIG91dHB1dCAtPiAnSUQxNzA0MTQzMDI3MTc5MDAwMDAwMDAwMDAwMDAwMDAwNydcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSUQoKSB7XG4gIGlkQ291bnRlciArPSBCaWdJbnQoMSk7XG4gIGdsb2JhbFRoaXMubXl0aGl4VUlbSURfQ09VTlRFUl9DVVJSRU5UX1ZBTFVFXSA9IGlkQ291bnRlcjtcblxuICByZXR1cm4gYElEJHtEYXRlLm5vdygpfSR7cGFkKGlkQ291bnRlci50b1N0cmluZygpLCBJRF9DT1VOVF9MRU5HVEgpfWA7XG59XG5cbmNvbnN0IE9CSkVDVF9JRF9TVE9SQUdFID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29tcG9uZW50L2NvbnN0YW50cy9vYmplY3QtaWQtc3RvcmFnZScpO1xuY29uc3QgT0JKRUNUX0lEX1dFQUtNQVAgPSBnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSA9IChnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSkgPyBnbG9iYWxUaGlzLm15dGhpeFVJW09CSkVDVF9JRF9TVE9SQUdFXSA6IG5ldyBXZWFrTWFwKCk7XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgR2V0IGEgdW5pcXVlIElEIGZvciBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSByZWZlcmVuY2UuXG4gKlxuICogICBVbmlxdWUgSURzIGFyZSBnZW5lcmF0ZWQgdmlhIEBzZWUgQmFzZVV0aWxzLmdlbmVyYXRlSUQ7LlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIGRlc2M6IEFueSBnYXJiYWdlLWNvbGxlY3RhYmxlIHJlZmVyZW5jZS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBBIHVuaXF1ZSBJRCBmb3IgdGhpcyByZWZlcmVuY2UgKGFzIGEgU0hBMjU2IGhhc2gpLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZyhCYXNlVXRpbHMuZ2V0T2JqZWN0SUQoZGl2RWxlbWVudCkpO1xuICogICAgIC8vIG91dHB1dCAtPiAnMTcwNDE0MzAyNzE3OTAwMDAwMDAwMDAwMDAwMDAwMDcnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPYmplY3RJRCh2YWx1ZSkge1xuICBsZXQgaWQgPSBPQkpFQ1RfSURfV0VBS01BUC5nZXQodmFsdWUpO1xuICBpZiAoaWQgPT0gbnVsbCkge1xuICAgIGxldCB0aGlzSUQgPSBnZW5lcmF0ZUlEKCk7XG5cbiAgICBPQkpFQ1RfSURfV0VBS01BUC5zZXQodmFsdWUsIHRoaXNJRCk7XG5cbiAgICByZXR1cm4gdGhpc0lEO1xuICB9XG5cbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhbiB1bnJlc29sdmVkIHNwZWNpYWxpemVkIFByb21pc2UgaW5zdGFuY2UsIHdpdGggdGhlIGludGVudCB0aGF0IGl0IHdpbGwgYmVcbiAqICAgcmVzb2x2ZWQgbGF0ZXIuXG4gKlxuICogICBUaGUgUHJvbWlzZSBpbnN0YW5jZSBpcyBzcGVjaWFsaXplZCBiZWNhdXNlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBhcmUgaW5qZWN0ZWQgaW50byBpdDpcbiAqICAgMS4gYHJlc29sdmUocmVzdWx0VmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZXNvbHZlcyB0aGUgcHJvbWlzZSB3aXRoIHRoZSBmaXJzdCBwcm92aWRlZCBhcmd1bWVudFxuICogICAyLiBgcmVqZWN0KGVycm9yVmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZWplY3RzIHRoZSBwcm9taXNlIHdpdGggdGhlIGZpcnN0IHByb3ZpZGVkIGFyZ3VtZW50XG4gKiAgIDMuIGBzdGF0dXMoKWAgLSBXaGVuIGNhbGxlZCwgd2lsbCByZXR1cm4gdGhlIGZ1bGZpbGxtZW50IHN0YXR1cyBvZiB0aGUgcHJvbWlzZSwgYXMgYSBgc3RyaW5nYCwgb25lIG9mOiBgXCJwZW5kaW5nXCIsIFwiZnVsZmlsbGVkXCJgLCBvciBgXCJyZWplY3RlZFwiYFxuICogICA0LiBgaWQ8c3RyaW5nPmAgLSBBIHJhbmRvbWx5IGdlbmVyYXRlZCBJRCBmb3IgdGhpcyBwcm9taXNlXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIFByb21pc2U7IEFuIHVucmVzb2x2ZWQgUHJvbWlzZSB0aGF0IGNhbiBiZSByZXNvbHZlZCBvciByZWplY3RlZCBieSBjYWxsaW5nIGBwcm9taXNlLnJlc29sdmUocmVzdWx0KWAgb3IgYHByb21pc2UucmVqZWN0KGVycm9yKWAgcmVzcGVjdGl2ZWx5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVzb2x2YWJsZSgpIHtcbiAgbGV0IHN0YXR1cyA9ICdwZW5kaW5nJztcbiAgbGV0IHJlc29sdmU7XG4gIGxldCByZWplY3Q7XG5cbiAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIF9yZWplY3QpID0+IHtcbiAgICByZXNvbHZlID0gKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAncGVuZGluZycpIHtcbiAgICAgICAgc3RhdHVzID0gJ2Z1bGZpbGxlZCc7XG4gICAgICAgIF9yZXNvbHZlKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIHJlamVjdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKHN0YXR1cyA9PT0gJ3BlbmRpbmcnKSB7XG4gICAgICAgIHN0YXR1cyA9ICdyZWplY3RlZCc7XG4gICAgICAgIF9yZWplY3QodmFsdWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhwcm9taXNlLCB7XG4gICAgJ3Jlc29sdmUnOiB7XG4gICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogICAgICAgIHJlc29sdmUsXG4gICAgfSxcbiAgICAncmVqZWN0Jzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICByZWplY3QsXG4gICAgfSxcbiAgICAnc3RhdHVzJzoge1xuICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6ICAgICAgICAoKSA9PiBzdGF0dXMsXG4gICAgfSxcbiAgICAnaWQnOiB7XG4gICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogICAgICAgIGdlbmVyYXRlSUQoKSxcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBSdW50aW1lIHR5cGUgcmVmbGVjdGlvbiBoZWxwZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgYSBtb3JlIHJvYnVzdCByZXBsYWNlbWVudCBmb3IgdGhlIGB0eXBlb2ZgIG9wZXJhdG9yLlxuICpcbiAqICAgVGhpcyBtZXRob2QgYWx3YXlzIHJldHVybnMgYSBuYW1lIChhcyBhIGBzdHJpbmdgIHR5cGUpIG9mIHRoZSB1bmRlcmx5aW5nIGRhdGF0eXBlLlxuICogICBUaGUgXCJkYXRhdHlwZVwiIGlzIGEgbGl0dGxlIGxvb3NlIGZvciBwcmltaXRpdmUgdHlwZXMuIEZvciBleGFtcGxlLCBhXG4gKiAgIHByaW1pdGl2ZSBgdHlwZW9mIHggPT09ICdudW1iZXInYCB0eXBlIGlzIHJldHVybmVkIGFzIGl0cyBjb3JyZXNwb25kaW5nIE9iamVjdCAoY2xhc3MpIHR5cGUgYCdOdW1iZXInYC4gRm9yIGBib29sZWFuYCBpdCB3aWxsIGluc3RlYWRcbiAqICAgcmV0dXJuIGAnQm9vbGVhbidgLCBhbmQgZm9yIGAnc3RyaW5nJ2AsIGl0IHdpbGwgaW5zdGVhZCByZXR1cm4gYCdTdHJpbmcnYC4gVGhpcyBpcyB0cnVlIG9mIGFsbCB1bmRlcmx5aW5nIHByaW1pdGl2ZSB0eXBlcy5cbiAqXG4gKiAgIEZvciBpbnRlcm5hbCBkYXRhdHlwZXMsIGl0IHdpbGwgcmV0dXJuIHRoZSByZWFsIGNsYXNzIG5hbWUgcHJlZml4ZWQgYnkgdHdvIGNvbG9ucy5cbiAqICAgRm9yIGV4YW1wbGUsIGB0eXBlT2YobmV3IE1hcCgpKWAgd2lsbCByZXR1cm4gYCc6Ok1hcCdgLlxuICpcbiAqICAgTm9uLWludGVybmFsIHR5cGVzIHdpbGwgbm90IGJlIHByZWZpeGVkLCBhbGxvd2luZyBjdXN0b20gdHlwZXMgd2l0aCB0aGUgc2FtZSBuYW1lIGFzIGludGVybmFsIHR5cGVzIHRvIGFsc28gYmUgZGV0ZWN0ZWQuXG4gKiAgIEZvciBleGFtcGxlLCBgY2xhc3MgVGVzdCB7fTsgdHlwZU9mKG5ldyBUZXN0KCkpYCB3aWxsIHJlc3VsdCBpbiB0aGUgbm9uLXByZWZpeGVkIHJlc3VsdCBgJ1Rlc3QnYC5cbiAqXG4gKiAgIEZvciByYXcgYGZ1bmN0aW9uYCB0eXBlcywgYHR5cGVPZmAgd2lsbCBjaGVjayBpZiB0aGV5IGFyZSBhIGNvbnN0cnVjdG9yIG9yIG5vdC4gSWYgYSBjb25zdHJ1Y3RvciBpcyBkZXRlY3RlZCwgdGhlblxuICogICB0aGUgZm9ybWF0IGAnW0NsYXNzICR7bmFtZX1dJ2Agd2lsbCBiZSByZXR1cm5lZCBhcyB0aGUgdHlwZS4gRm9yIGludGVybmFsIHR5cGVzIHRoZSBuYW1lIHdpbGxcbiAqICAgYmUgcHJlZml4ZWQsIGkuZS4gYFtDbGFzcyA6OiR7aW50ZXJuYWxOYW1lfV1gLCBhbmQgZm9yIG5vbi1pbnRlcm5hbCB0eXBlcyB3aWxsIGluc3RlYWQgYmUgbm9uLXByZWZpeGVkLCBpLmUuIGBbQ2xhc3MgJHtuYW1lfV1gIC5cbiAqICAgRm9yIGV4YW1wbGUsIGB0eXBlT2YoTWFwKWAgd2lsbCByZXR1cm4gYCdbQ2xhc3MgOjpNYXBdJ2AsIHdoZXJlYXMgYHR5cGVPZihUZXN0KWAgd2lsbCByZXN1bHQgaW4gYCdbQ2xhc3MgVGVzdF0nYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBUaGUgdmFsdWUgd2hvc2UgdHlwZSB5b3Ugd2lzaCB0byBkaXNjb3Zlci5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgbmFtZSBvZiB0aGUgcHJvdmlkZWQgdHlwZSwgb3IgYW4gZW1wdHkgc3RyaW5nIGAnJ2AgaWYgdGhlIHByb3ZpZGVkIHZhbHVlIGhhcyBubyB0eXBlLlxuICogbm90ZXM6XG4gKiAgIC0gVGhpcyBtZXRob2Qgd2lsbCBsb29rIGZvciBhIFtTeW1ib2wudG9TdHJpbmdUYWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1N5bWJvbC90b1N0cmluZ1RhZylcbiAqICAgICBrZXkgb24gdGhlIHZhbHVlIHByb3ZpZGVkLi4uIGFuZCBpZiBmb3VuZCwgd2lsbCB1c2UgaXQgdG8gYXNzaXN0IHdpdGggZmluZGluZyB0aGUgY29ycmVjdCB0eXBlIG5hbWUuXG4gKiAgIC0gSWYgdGhlIGB2YWx1ZWAgcHJvdmlkZWQgaXMgdHlwZS1sZXNzLCBpLmUuIGB1bmRlZmluZWRgLCBgbnVsbGAsIG9yIGBOYU5gLCB0aGVuIGFuIGVtcHR5IHR5cGUgYCcnYCB3aWxsIGJlIHJldHVybmVkLlxuICogICAtIFVzZSB0aGUgYHR5cGVvZmAgb3BlcmF0b3IgaWYgeW91IHdhbnQgdG8gZGV0ZWN0IGlmIGEgdHlwZSBpcyBwcmltaXRpdmUgb3Igbm90LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHlwZU9mKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IE9iamVjdC5pcyh2YWx1ZSwgTmFOKSlcbiAgICByZXR1cm4gJyc7XG5cbiAgaWYgKE9iamVjdC5pcyh2YWx1ZSwgSW5maW5pdHkpIHx8IE9iamVjdC5pcyh2YWx1ZSwgLUluZmluaXR5KSlcbiAgICByZXR1cm4gJzo6TnVtYmVyJztcblxuICBsZXQgdGhpc1R5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0aGlzVHlwZSA9PT0gJ2JpZ2ludCcpXG4gICAgcmV0dXJuICc6OkJpZ0ludCc7XG5cbiAgaWYgKHRoaXNUeXBlID09PSAnc3ltYm9sJylcbiAgICByZXR1cm4gJzo6U3ltYm9sJztcblxuICBpZiAodGhpc1R5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHRoaXNUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsZXQgbmF0aXZlVHlwZU1ldGEgPSBOQVRJVkVfQ0xBU1NfVFlQRVNfTUVUQS5maW5kKCh0eXBlTWV0YSkgPT4gKHZhbHVlID09PSB0eXBlTWV0YVsxXSkpO1xuICAgICAgaWYgKG5hdGl2ZVR5cGVNZXRhKVxuICAgICAgICByZXR1cm4gYFtDbGFzcyA6OiR7bmF0aXZlVHlwZU1ldGFbMF19XWA7XG5cbiAgICAgIGlmICh2YWx1ZS5wcm90b3R5cGUgJiYgdHlwZW9mIHZhbHVlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyAmJiBJU19DTEFTUy50ZXN0KCcnICsgdmFsdWUucHJvdG90eXBlLmNvbnN0cnVjdG9yKSlcbiAgICAgICAgcmV0dXJuIGBbQ2xhc3MgJHt2YWx1ZS5uYW1lfV1gO1xuXG4gICAgICBpZiAodmFsdWUucHJvdG90eXBlICYmIHR5cGVvZiB2YWx1ZS5wcm90b3R5cGVbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdmFsdWUucHJvdG90eXBlW1N5bWJvbC50b1N0cmluZ1RhZ10oKTtcbiAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICByZXR1cm4gYFtDbGFzcyAke3Jlc3VsdH1dYDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYDo6JHt0aGlzVHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke3RoaXNUeXBlLnN1YnN0cmluZygxKX1gO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKVxuICAgIHJldHVybiAnOjpBcnJheSc7XG5cbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgU3RyaW5nKVxuICAgIHJldHVybiAnOjpTdHJpbmcnO1xuXG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcilcbiAgICByZXR1cm4gJzo6TnVtYmVyJztcblxuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBCb29sZWFuKVxuICAgIHJldHVybiAnOjpCb29sZWFuJztcblxuICBsZXQgbmF0aXZlVHlwZU1ldGEgPSBOQVRJVkVfQ0xBU1NfVFlQRVNfTUVUQS5maW5kKCh0eXBlTWV0YSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKHR5cGVNZXRhWzBdICE9PSAnT2JqZWN0JyAmJiB2YWx1ZSBpbnN0YW5jZW9mIHR5cGVNZXRhWzFdKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9KTtcbiAgaWYgKG5hdGl2ZVR5cGVNZXRhKVxuICAgIHJldHVybiBgOjoke25hdGl2ZVR5cGVNZXRhWzBdfWA7XG5cbiAgaWYgKHR5cGVvZiBNYXRoICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gTWF0aClcbiAgICByZXR1cm4gJzo6TWF0aCc7XG5cbiAgaWYgKHR5cGVvZiBKU09OICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gSlNPTilcbiAgICByZXR1cm4gJzo6SlNPTic7XG5cbiAgaWYgKHR5cGVvZiBBdG9taWNzICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gQXRvbWljcylcbiAgICByZXR1cm4gJzo6QXRvbWljcyc7XG5cbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA9PT0gUmVmbGVjdClcbiAgICByZXR1cm4gJzo6UmVmbGVjdCc7XG5cbiAgaWYgKHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10pXG4gICAgcmV0dXJuICh0eXBlb2YgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddKCkgOiB2YWx1ZVtTeW1ib2wudG9TdHJpbmdUYWddO1xuXG4gIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSlcbiAgICByZXR1cm4gJzo6T2JqZWN0JztcblxuICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fCAnT2JqZWN0Jztcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBSdW50aW1lIHR5cGUgcmVmbGVjdGlvbiBoZWxwZXIuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmUgYSBtb3JlIHJvYnVzdCByZXBsYWNlbWVudCBmb3IgdGhlIGBpbnN0YW5jZW9mYCBvcGVyYXRvci5cbiAqXG4gKiAgIFRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGB0cnVlYCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyAqYW55KiBvZiB0aGUgcHJvdmlkZWQgYHR5cGVzYC5cbiAqXG4gKiAgIFRoZSBwcm92aWRlZCBgdHlwZXNgIGNhbiBlYWNoIGVpdGhlciBiZSBhIHJlYWwgcmF3IHR5cGUgKGkuZS4gYFN0cmluZ2AgY2xhc3MpLCBvciB0aGUgbmFtZSBvZiBhIHR5cGUsIGFzIGEgc3RyaW5nLFxuICogICBpLmUuIGAnOjpTdHJpbmcnYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBUaGUgdmFsdWUgd2hvc2UgdHlwZSB5b3Ugd2lzaCB0byBjb21wYXJlLlxuICogICAtIG5hbWU6IC4uLnR5cGVzXG4gKiAgICAgZGF0YVR5cGU6IEFycmF5PGFueT5cbiAqICAgICBkZXNjOiBBbGwgdHlwZXMgeW91IHdpc2ggdG8gY2hlY2sgYWdhaW5zdC4gU3RyaW5nIHZhbHVlcyBjb21wYXJlIHR5cGVzIGJ5IG5hbWUsIGZ1bmN0aW9uIHZhbHVlcyBjb21wYXJlIHR5cGVzIGJ5IGBpbnN0YW5jZW9mYC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjtcbiAqICAgMS4gUmV0dXJuIGB0cnVlYCBpZiBgdmFsdWVgIG1hdGNoZXMgYW55IG9mIHRoZSBwcm92aWRlZCBgdHlwZXNgLlxuICogICAyLiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMudHlwZU9mOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHlwZSh2YWx1ZSwgLi4udHlwZXMpIHtcbiAgY29uc3QgZ2V0SW50ZXJuYWxUeXBlTmFtZSA9ICh0eXBlKSA9PiB7XG4gICAgbGV0IG5hdGl2ZVR5cGVNZXRhID0gTkFUSVZFX0NMQVNTX1RZUEVTX01FVEEuZmluZCgodHlwZU1ldGEpID0+ICh0eXBlID09PSB0eXBlTWV0YVsxXSkpO1xuICAgIGlmIChuYXRpdmVUeXBlTWV0YSlcbiAgICAgIHJldHVybiBgOjoke25hdGl2ZVR5cGVNZXRhWzBdfWA7XG4gIH07XG5cbiAgbGV0IHZhbHVlVHlwZSA9IHR5cGVPZih2YWx1ZSk7XG4gIGZvciAobGV0IHR5cGUgb2YgdHlwZXMpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVPZih0eXBlLCAnOjpTdHJpbmcnKSAmJiB2YWx1ZVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIHR5cGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGV0IGludGVybmFsVHlwZSA9IGdldEludGVybmFsVHlwZU5hbWUodHlwZSk7XG4gICAgICAgIGlmIChpbnRlcm5hbFR5cGUgJiYgaW50ZXJuYWxUeXBlID09PSB2YWx1ZVR5cGUpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIFZlcmlmeSB0aGF0IHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIGEgYG51bWJlcmAgdHlwZSAob3IgYE51bWJlcmAgaW5zdGFuY2UpLCBhbmQgdGhhdFxuICogICBpdCAqKmlzIG5vdCoqIGBOYU5gLCBgSW5maW5pdHlgLCBvciBgLUluZmluaXR5YC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBgbnVtYmVyYCAob3IgYE51bWJlcmAgaW5zdGFuY2UpIGFuZCBpcyBhbHNvICoqbm90KiogYE5hTmAsIGBJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgLiBpLmUuIGAoaXNOdW1iZXIodmFsdWUpICYmIGlzRmluaXRlKHZhbHVlKSlgLlxuICogICAyLiBPdGhlcndpc2UsIGBmYWxzZWAgaXMgcmV0dXJuZWQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMudHlwZU9mOy5cbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNUeXBlOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWROdW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIChpc1R5cGUodmFsdWUsICc6Ok51bWJlcicpICYmIGlzRmluaXRlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgVmVyaWZ5IHRoYXQgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgYSBcInBsYWluXCIvXCJ2YW5pbGxhXCIgT2JqZWN0IGluc3RhbmNlLlxuICpcbiAqICAgVGhpcyBtZXRob2QgaXMgaW50ZW5kZWQgdG8gaGVscCB0aGUgY2FsbGVyIGRldGVjdCBpZiBhbiBvYmplY3QgaXMgYSBcInJhdyBwbGFpbiBvYmplY3RcIixcbiAqICAgaW5oZXJpdGluZyBmcm9tIGBPYmplY3QucHJvdG90eXBlYCAob3IgYSBgbnVsbGAgcHJvdG90eXBlKS5cbiAqXG4gKiAgIDEuIGBpc1BsYWluT2JqZWN0KHt9KWAgd2lsbCByZXR1cm4gYHRydWVgLlxuICogICAyLiBgaXNQbGFpbk9iamVjdChuZXcgT2JqZWN0KCkpYCB3aWxsIHJldHVybiBgdHJ1ZWAuXG4gKiAgIDMuIGBpc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpYCB3aWxsIHJldHVybiBgdHJ1ZWAuXG4gKiAgIDQuIGBpc1BsYWluT2JqZWN0KG5ldyBDdXN0b21DbGFzcygpKWAgd2lsbCByZXR1cm4gYGZhbHNlYC5cbiAqICAgNS4gQWxsIG90aGVyIGludm9jYXRpb25zIHNob3VsZCByZXR1cm4gYGZhbHNlYC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBcInJhd1wiL1wicGxhaW5cIiBPYmplY3QgaW5zdGFuY2UuXG4gKiAgIDIuIE90aGVyd2lzZSwgYGZhbHNlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy50eXBlT2Y7LlxuICogICAtIHxcbiAqICAgICA6ZXllOiBAc2VlIEJhc2VVdGlscy5pc1R5cGU7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JylcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfHwgdmFsdWUuY29uc3RydWN0b3IgPT0gbnVsbClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRGV0ZWN0IGlmIHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzIGEgamF2YXNjcmlwdCBwcmltaXRpdmUgdHlwZS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB0eXBlb2YgdmFsdWVgIGlzIG9uZSBvZjogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBiaWdpbnRgLCBvciBgc3ltYm9sYCxcbiAqICAgICAgKmFuZCBhbHNvKiBgdmFsdWVgIGlzICpub3QqIGBOYU5gLCBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYHVuZGVmaW5lZGAsIG9yIGBudWxsYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChPYmplY3QuaXModmFsdWUsIEluZmluaXR5KSB8fCBPYmplY3QuaXModmFsdWUsIC1JbmZpbml0eSkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJywgJzo6TnVtYmVyJywgJzo6Qm9vbGVhbicsICc6OkJpZ0ludCcpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIERldGVjdCBpZiB0aGUgcHJvdmlkZWQgYHZhbHVlYCBpcyBnYXJiYWdlIGNvbGxlY3RhYmxlLlxuICpcbiAqICAgVGhpcyBtZXRob2QgaXMgdXNlZCB0byBjaGVjayBpZiBhbnkgYHZhbHVlYCBpcyBhbGxvd2VkIHRvIGJlIHVzZWQgYXMgYSB3ZWFrIHJlZmVyZW5jZS5cbiAqXG4gKiAgIEVzc2VudGlhbGx5LCB0aGlzIHdpbGwgcmV0dXJuIGBmYWxzZWAgZm9yIGFueSBwcmltaXRpdmUgdHlwZSwgb3IgYG51bGxgLCBgdW5kZWZpbmVkYCwgYE5hTmAsIGBJbmZpbml0eWAsIG9yIGAtSW5maW5pdHlgIHZhbHVlcy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYHRydWVgIGlmIGB0eXBlb2YgdmFsdWVgIGlzIG9uZSBvZjogYHN0cmluZ2AsIGBudW1iZXJgLCBgYm9vbGVhbmAsIGBiaWdpbnRgLCBvciBgc3ltYm9sYCxcbiAqICAgICAgKmFuZCBhbHNvKiBgdmFsdWVgICppcyBub3QqIGBOYU5gLCBgSW5maW5pdHlgLCBgLUluZmluaXR5YCwgYHVuZGVmaW5lZGAsIG9yIGBudWxsYC5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLnR5cGVPZjsuXG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbGxlY3RhYmxlKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IE9iamVjdC5pcyh2YWx1ZSwgTmFOKSB8fCBPYmplY3QuaXMoSW5maW5pdHkpIHx8IE9iamVjdC5pcygtSW5maW5pdHkpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJylcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJywgJzo6TnVtYmVyJywgJzo6Qm9vbGVhbicsICc6OkJpZ0ludCcpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBEZXRlY3QgaWYgdGhlIHByb3ZpZGVkIGB2YWx1ZWAgaXMgXCJlbXB0eVwiIChpcyAqKk4qKnVsbCAqKk8qKnIgKipFKiptcHR5KS5cbiAqXG4gKiAgIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBcImVtcHR5XCIgaWYgYW55IG9mIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBpcyBtZXQ6XG4gKiAgIDEuIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAuXG4gKiAgIDIuIGB2YWx1ZWAgaXMgYG51bGxgLlxuICogICAzLiBgdmFsdWVgIGlzIGAnJ2AgKGFuIGVtcHR5IHN0cmluZykuXG4gKiAgIDQuIGB2YWx1ZWAgaXMgbm90IGFuIGVtcHR5IHN0cmluZywgYnV0IGl0IGNvbnRhaW5zIG5vdGhpbmcgZXhjZXB0IHdoaXRlc3BhY2UgKGBcXHRgLCBgXFxyYCwgYFxcc2AsIG9yIGBcXG5gKS5cbiAqICAgNS4gYHZhbHVlYCBpcyBgTmFOYC5cbiAqICAgNi4gYHZhbHVlLmxlbmd0aGAgaXMgYSBgTnVtYmVyYCBvciBgbnVtYmVyYCB0eXBlLCBhbmQgaXMgZXF1YWwgdG8gYDBgLlxuICogICA3LiBgdmFsdWVgIGlzIGEgQHNlZSBCYXNlVXRpbHMuaXNQbGFpbk9iamVjdD9jYXB0aW9uPXBsYWluK29iamVjdDsgYW5kIGhhcyBubyBpdGVyYWJsZSBrZXlzLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIGRlc2M6IFZhbHVlIHRvIGNoZWNrXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGJvb2xlYW47XG4gKiAgIDEuIFJldHVybiBgdHJ1ZWAgaWYgYW55IG9mIHRoZSBcImVtcHR5XCIgY29uZGl0aW9ucyBhYm92ZSBhcmUgdHJ1ZS5cbiAqICAgMi4gT3RoZXJ3aXNlLCBgZmFsc2VgIGlzIHJldHVybmVkLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzTm90Tk9FOy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTk9FKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChPYmplY3QuaXModmFsdWUsIE5hTikpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKHZhbHVlID09PSAnJylcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBpZiAoaXNUeXBlKHZhbHVlLCAnOjpTdHJpbmcnKSAmJiAoL15bXFx0XFxzXFxyXFxuXSokLykudGVzdCh2YWx1ZSkpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGlzVHlwZSh2YWx1ZS5sZW5ndGgsICc6Ok51bWJlcicpKVxuICAgIHJldHVybiAodmFsdWUubGVuZ3RoID09PSAwKTtcblxuICBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRGV0ZWN0IGlmIHRoZSBwcm92aWRlZCBgdmFsdWVgIGlzICoqbm90KiogXCJlbXB0eVwiIChpcyBub3QgKipOKip1bGwgKipPKipyICoqRSoqbXB0eSkuXG4gKlxuICogICBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgXCJlbXB0eVwiIGlmIGFueSBvZiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgaXMgbWV0OlxuICogICAxLiBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICogICAyLiBgdmFsdWVgIGlzIGBudWxsYC5cbiAqICAgMy4gYHZhbHVlYCBpcyBgJydgIChhbiBlbXB0eSBzdHJpbmcpLlxuICogICA0LiBgdmFsdWVgIGlzIG5vdCBhbiBlbXB0eSBzdHJpbmcsIGJ1dCBpdCBjb250YWlucyBub3RoaW5nIGV4Y2VwdCB3aGl0ZXNwYWNlIChgXFx0YCwgYFxccmAsIGBcXHNgLCBvciBgXFxuYCkuXG4gKiAgIDUuIGB2YWx1ZWAgaXMgYE5hTmAuXG4gKiAgIDYuIGB2YWx1ZS5sZW5ndGhgIGlzIGEgYE51bWJlcmAgb3IgYG51bWJlcmAgdHlwZSwgYW5kIGlzIGVxdWFsIHRvIGAwYC5cbiAqICAgNy4gYHZhbHVlYCBpcyBhIEBzZWUgQmFzZVV0aWxzLmlzUGxhaW5PYmplY3Q/Y2FwdGlvbj1wbGFpbitvYmplY3Q7IGFuZCBoYXMgbm8gaXRlcmFibGUga2V5cy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB2YWx1ZVxuICogICAgIGRhdGFUeXBlOiBhbnlcbiAqICAgICBkZXNjOiBWYWx1ZSB0byBjaGVja1xuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuO1xuICogICAxLiBSZXR1cm4gYGZhbHNlYCBpZiBhbnkgb2YgdGhlIFwiZW1wdHlcIiBjb25kaXRpb25zIGFib3ZlIGFyZSB0cnVlLlxuICogICAyLiBPdGhlcndpc2UsIGB0cnVlYCBpcyByZXR1cm5lZC5cbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6aW5mbzogVGhpcyBpcyB0aGUgZXhhY3QgaW52ZXJzZSBvZiBAc2VlIEJhc2VVdGlscy5pc05PRTtcbiAqICAgLSB8XG4gKiAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNOT0U7LlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNOb3ROT0UodmFsdWUpIHtcbiAgcmV0dXJuICFpc05PRSh2YWx1ZSk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29udmVydCB0aGUgcHJvdmlkZWQgYHN0cmluZ2AgYHZhbHVlYCBpbnRvIFtjYW1lbENhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0NhbWVsX2Nhc2UpLlxuICpcbiAqICAgVGhlIHByb2Nlc3MgaXMgcm91Z2hseSBhcyBmb2xsb3dzOlxuICogICAxLiBBbnkgbm9uLXdvcmQgY2hhcmFjdGVycyAoW2EtekEtWjAtOV9dKSBhcmUgc3RyaXBwZWQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmcuXG4gKiAgIDIuIEFueSBub24td29yZCBjaGFyYWN0ZXJzIChbYS16QS1aMC05X10pIGFyZSBzdHJpcHBlZCBmcm9tIHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbiAqICAgMy4gRWFjaCBcIndvcmRcIiBpcyBjYXBpdGFsaXplZC5cbiAqICAgNC4gVGhlIGZpcnN0IGxldHRlciBpcyBhbHdheXMgbG93ZXItY2FzZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogU3RyaW5nIHRvIGNvbnZlcnQgaW50byBbY2FtZWxDYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNDYW1lbF9jYXNlKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgZm9ybWF0dGVkIHN0cmluZyBpbiBbY2FtZWxDYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNDYW1lbF9jYXNlKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKCctLXRlc3Qtc29tZV92YWx1ZV9AJykpO1xuICogICAgIC8vIG91dHB1dCAtPiAndGVzdFNvbWVWYWx1ZSdcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2FtZWxDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvXlxcVy8sICcnKVxuICAgIC5yZXBsYWNlKC9bXFxXXSskLywgJycpXG4gICAgLnJlcGxhY2UoLyhbQS1aXSspL2csICctJDEnKVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL1xcVysoLikvZywgKG0sIHApID0+IHtcbiAgICAgIHJldHVybiBwLnRvVXBwZXJDYXNlKCk7XG4gICAgfSlcbiAgICAucmVwbGFjZSgvXiguKSguKikkLywgKG0sIGYsIGwpID0+IGAke2YudG9Mb3dlckNhc2UoKX0ke2x9YCk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgQ29udmVydCB0aGUgcHJvdmlkZWQgYHN0cmluZ2AgYHZhbHVlYCBpbnRvIFtzbmFrZV9jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTbmFrZV9jYXNlKS5cbiAqXG4gKiAgIFRoZSBwcm9jZXNzIGlzIHJvdWdobHkgYXMgZm9sbG93czpcbiAqICAgMS4gQW55IGNhcGl0YWxpemVkIGNoYXJhY3RlciBzZXF1ZW5jZSBpcyBwcmVmaXhlZCBieSBhbiB1bmRlcnNjb3JlLlxuICogICAyLiBNb3JlIHRoYW4gb25lIHNlcXVlbnRpYWwgdW5kZXJzY29yZXMgYXJlIGNvbnZlcnRlZCBpbnRvIGEgc2luZ2xlIHVuZGVyc2NvcmUuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogU3RyaW5nIHRvIGNvbnZlcnQgaW50byBbc25ha2VfY2FzZV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGV0dGVyX2Nhc2UjU25ha2VfY2FzZSkuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIGZvcm1hdHRlZCBzdHJpbmcgaW4gW3NuYWtlX2Nhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI1NuYWtlX2Nhc2UpLlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICBpbXBvcnQgeyBCYXNlVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICpcbiAqICAgICBjb25zb2xlLmxvZyhCYXNlVXRpbHMudG9TbmFrZUNhc2UoJ1RoaXNJc0FTZW50ZW5jZScpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gJ3RoaXNfaXNfYV9zZW50ZW5jZSdcbiAqICAgICBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvU25ha2VDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvW0EtWl0rL2csIChtLCBvZmZzZXQpID0+ICgob2Zmc2V0KSA/IGBfJHttLnRvTG93ZXJDYXNlKCl9YCA6IG0udG9Mb3dlckNhc2UoKSkpXG4gICAgLnJlcGxhY2UoL197Mix9L2csICdfJylcbiAgICAudG9Mb3dlckNhc2UoKTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IEJhc2VVdGlsc1xuICogZGVzYzogfFxuICogICBDb252ZXJ0IHRoZSBwcm92aWRlZCBgc3RyaW5nYCBgdmFsdWVgIGludG8gW2tlYmFiLWNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0tlYmFiX2Nhc2UpLlxuICpcbiAqICAgVGhlIHByb2Nlc3MgaXMgcm91Z2hseSBhcyBmb2xsb3dzOlxuICogICAxLiBBbnkgY2FwaXRhbGl6ZWQgY2hhcmFjdGVyIHNlcXVlbmNlIGlzIHByZWZpeGVkIGJ5IGEgaHlwaGVuLlxuICogICAyLiBNb3JlIHRoYW4gb25lIHNlcXVlbnRpYWwgaHlwaGVucyBhcmUgY29udmVydGVkIGludG8gYSBzaW5nbGUgaHlwaGVuLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFN0cmluZyB0byB0dXJuIGludG8gW2tlYmFiLWNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xldHRlcl9jYXNlI0tlYmFiX2Nhc2UpLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBzdHJpbmc7IFRoZSBmb3JtYXR0ZWQgc3RyaW5nIGluIFtrZWJhYi1jYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNLZWJhYl9jYXNlKS5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgaW1wb3J0IHsgQmFzZVV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgY29uc29sZS5sb2coQmFzZVV0aWxzLnRvS2ViYWJDYXNlKCdUaGlzSXNBU2VudGVuY2UnKSk7XG4gKiAgICAgLy8gb3V0cHV0IC0+ICd0aGlzLWlzLWEtc2VudGVuY2UnXG4gKiAgICAgYGBgXG4gKi9cblxuY29uc3QgSVNfTEFTVF9DSEFSX1VQUEVSQ0FTRSA9IC9bQS1aXSQvO1xuZXhwb3J0IGZ1bmN0aW9uIHRvS2ViYWJDYXNlKHZhbHVlKSB7XG4gIHJldHVybiAoJycgKyB2YWx1ZSlcbiAgICAucmVwbGFjZSgvW0EtWl1bYS16XSt8W0EtWl17Mix9L2csIChtLCBvZmZzZXQpID0+IHtcbiAgICAgIGlmIChtLmxlbmd0aCA+IDEgJiYgSVNfTEFTVF9DSEFSX1VQUEVSQ0FTRS50ZXN0KG0pKVxuICAgICAgICByZXR1cm4gKGAkeyhvZmZzZXQpID8gJy0nIDogJyd9JHttLnNsaWNlKDAsIC0xKX0tJHttLnNsaWNlKC0xKX1gKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICByZXR1cm4gKChvZmZzZXQpID8gYC0ke20udG9Mb3dlckNhc2UoKX1gIDogbS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9KVxuICAgIC5yZXBsYWNlKC8tezIsfS9nLCAnLScpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgRG8gb3VyIGJlc3QgdG8gZW11bGF0ZSBbcHJvY2Vzcy5uZXh0VGlja10oaHR0cHM6Ly9ub2RlanMub3JnL2VuL2d1aWRlcy9ldmVudC1sb29wLXRpbWVycy1hbmQtbmV4dHRpY2svI3Byb2Nlc3NuZXh0dGljaylcbiAqICAgaW4gdGhlIGJyb3dzZXIuXG4gKlxuICogICBJbiBvcmRlciB0byB0cnkgYW5kIGVtdWxhdGUgYHByb2Nlc3MubmV4dFRpY2tgLCB0aGlzIGZ1bmN0aW9uIHdpbGwgdXNlIGBnbG9iYWxUaGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBjYWxsYmFjaygpKWAgaWYgYXZhaWxhYmxlLFxuICogICBvdGhlcndpc2UgaXQgd2lsbCBmYWxsYmFjayB0byB1c2luZyBgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYWxsYmFjaylgLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IGNhbGxiYWNrXG4gKiAgICAgZGF0YVR5cGU6IGZ1bmN0aW9uXG4gKiAgICAgZGVzYzogQ2FsbGJhY2sgZnVuY3Rpb24gdG8gY2FsbCBvbiBcIm5leHRUaWNrXCIuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgZnVuY3Rpb24gd2lsbCBwcmVmZXIgYW5kIHVzZSBgcHJvY2Vzcy5uZXh0VGlja2AgaWYgaXQgaXMgYXZhaWxhYmxlIChpLmUuIGlmIHJ1bm5pbmcgb24gTm9kZUpTKS5cbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IFRoaXMgZnVuY3Rpb24gaXMgdW5saWtlbHkgdG8gYWN0dWFsbHkgYmUgdGhlIG5leHQgXCJ0aWNrXCIgb2YgdGhlIHVuZGVybHlpbmdcbiAqICAgICBqYXZhc2NyaXB0IGVuZ2luZS4gVGhpcyBtZXRob2QganVzdCBkb2VzIGl0cyBiZXN0IHRvIGVtdWxhdGUgXCJuZXh0VGlja1wiLiBJbnN0ZWFkIG9mIHRoZVxuICogICAgIGFjdHVhbCBcIm5leHQgdGlja1wiLCB0aGlzIHdpbGwgaW5zdGVhZCBiZSBcImFzIGZhc3QgYXMgcG9zc2libGVcIi5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgZnVuY3Rpb24gZGVsaWJlcmF0ZWx5IGF0dGVtcHRzIHRvIHVzZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lYCBmaXJzdC0tZXZlbiB0aG91Z2ggaXQgbGlrZWx5IGRvZXNuJ3RcbiAqICAgICBoYXZlIHRoZSBmYXN0ZXN0IHR1cm4tYXJvdW5kLXRpbWUtLXRvIHNhdmUgYmF0dGVyeSBwb3dlci4gVGhlIGlkZWEgYmVpbmcgdGhhdCBcInNvbWV0aGluZyBuZWVkcyB0byBiZSBkb25lICpzb29uKlwiLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy5uZXh0VGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWxUaGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGdsb2JhbFRoaXMucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgKG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSkpLnRoZW4oKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfVxufVxuXG5jb25zdCBJU19OVU1CRVIgPSAvXihbLStdPykoXFxkKig/OlxcLlxcZCspPykoZVstK11cXGQrKT8kLztcbmNvbnN0IElTX0JPT0xFQU4gPSAvXih0cnVlfGZhbHNlKSQvO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogQmFzZVV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENvZXJjZSBhIHN0cmluZyB0byBpdHMgbW9zdCBsaWtlbHkgdW5kZXJseWluZyBwcmltaXRpdmUgdHlwZS5cbiAqXG4gKiAgIENvbnZlcnNpb24gaW5wdXQgYW5kIG91dHB1dCB0YWJsZTpcbiAqICAgKiBgJ251bGwnYCBjb252ZXJ0cyB0byBgbnVsbGBcbiAqICAgKiBgJ3VuZGVmaW5lZCdgIGNvbnZlcnRzIHRvIGB1bmRlZmluZWRgXG4gKiAgICogYCdOYU4nYCBjb252ZXJ0cyB0byBgTmFOYFxuICogICAqIGAnSW5maW5pdHknYCBjb252ZXJ0cyB0byBgSW5maW5pdHlgXG4gKiAgICogYCctSW5maW5pdHknYCBjb252ZXJ0cyB0byBgLUluZmluaXR5YFxuICogICAqIGAndHJ1ZSdgIGNvbnZlcnRzIHRvIGB0cnVlYFxuICogICAqIGAnZmFsc2UnYCBjb252ZXJ0cyB0byBgZmFsc2VgXG4gKiAgICogQW55IHBhcnNhYmxlIG51bWVyaWMgc3RyaW5nIHZhbHVlIChpbmNsdWRpbmcgW0Ugbm90YXRpb25dKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1NjaWVudGlmaWNfbm90YXRpb24jRV9ub3RhdGlvbikpIGNvbnZlcnRzIHRvIGBudW1iZXJgXG4gKlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IHZhbHVlXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFZhbHVlIHRvIGNvbnZlcnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb2VyY2UodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09PSAnbnVsbCcpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgaWYgKHZhbHVlID09PSAndW5kZWZpbmVkJylcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGlmICh2YWx1ZSA9PT0gJ05hTicpXG4gICAgcmV0dXJuIE5hTjtcblxuICBpZiAodmFsdWUgPT09ICdJbmZpbml0eScgfHwgdmFsdWUgPT09ICcrSW5maW5pdHknKVxuICAgIHJldHVybiBJbmZpbml0eTtcblxuICBpZiAodmFsdWUgPT09ICctSW5maW5pdHknKVxuICAgIHJldHVybiAtSW5maW5pdHk7XG5cbiAgaWYgKElTX05VTUJFUi50ZXN0KHZhbHVlKSlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbWFnaWMtbnVtYmVyc1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG5cbiAgaWYgKElTX0JPT0xFQU4udGVzdCh2YWx1ZSkpXG4gICAgcmV0dXJuICh2YWx1ZSA9PT0gJ3RydWUnKTtcblxuICByZXR1cm4gdmFsdWU7XG59XG4iLCJpbXBvcnQge1xuICBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUyxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgICBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgICAgICAgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBFbGVtZW50cyAgICBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuLyoqXG4gKiB0eXBlOiBOYW1lc3BhY2VcbiAqIG5hbWU6IENvbXBvbmVudFV0aWxzXG4gKiBncm91cE5hbWU6IENvbXBvbmVudFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBDb21wb25lbnRVdGlscyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7YFxuICpcbiAqICAgQ29tcG9uZW50IGFuZCBmcmFtZXdvcmsgY2xhc3NlcyBhbmQgZnVuY3Rpb25hbGl0eSBhcmUgZm91bmQgaGVyZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SWRlbnRpZmllcih0YXJnZXQpIHtcbiAgaWYgKCF0YXJnZXQpXG4gICAgcmV0dXJuICd1bmRlZmluZWQnO1xuXG4gIGlmICh0eXBlb2YgdGFyZ2V0LmdldElkZW50aWZpZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHRhcmdldC5nZXRJZGVudGlmaWVyLmNhbGwodGFyZ2V0KTtcblxuICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudClcbiAgICByZXR1cm4gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSB8fCB0YXJnZXQuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJykgfHwgQmFzZVV0aWxzLnRvQ2FtZWxDYXNlKHRhcmdldC5sb2NhbE5hbWUpO1xuXG4gIHJldHVybiAndW5kZWZpbmVkJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVVUkwocm9vdExvY2F0aW9uLCBfdXJsaXNoKSB7XG4gIGxldCB1cmxpc2ggPSBfdXJsaXNoO1xuICBpZiAodXJsaXNoIGluc3RhbmNlb2YgVVJMKVxuICAgIHVybGlzaCA9IHVybGlzaC50b1N0cmluZygpO1xuXG4gIGlmICghdXJsaXNoKVxuICAgIHVybGlzaCA9ICcnO1xuXG4gIGlmICghQmFzZVV0aWxzLmlzVHlwZSh1cmxpc2gsICc6OlN0cmluZycpKVxuICAgIHJldHVybjtcblxuICBsZXQgdXJsID0gbmV3IFVSTCh1cmxpc2gsIG5ldyBVUkwocm9vdExvY2F0aW9uKSk7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcy5teXRoaXhVSS51cmxSZXNvbHZlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBmaWxlTmFtZSAgPSAnJztcbiAgICBsZXQgcGF0aCAgICAgID0gJy8nO1xuXG4gICAgdXJsLnBhdGhuYW1lLnJlcGxhY2UoL14oLipcXC8pKFteL10rKSQvLCAobSwgZmlyc3QsIHNlY29uZCkgPT4ge1xuICAgICAgcGF0aCA9IGZpcnN0LnJlcGxhY2UoL1xcLyskLywgJy8nKTtcbiAgICAgIGlmIChwYXRoLmNoYXJBdChwYXRoLmxlbmd0aCAtIDEpICE9PSAnLycpXG4gICAgICAgIHBhdGggPSBgJHtwYXRofS9gO1xuXG4gICAgICBmaWxlTmFtZSA9IHNlY29uZDtcbiAgICAgIHJldHVybiBtO1xuICAgIH0pO1xuXG4gICAgbGV0IG5ld1NyYyA9IGdsb2JhbFRoaXMubXl0aGl4VUkudXJsUmVzb2x2ZXIuY2FsbCh0aGlzLCB7IHNyYzogdXJsaXNoLCB1cmwsIHBhdGgsIGZpbGVOYW1lIH0pO1xuICAgIGlmIChuZXdTcmMgPT09IGZhbHNlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFwibXl0aGl4LXJlcXVpcmVcIjogTm90IGxvYWRpbmcgXCIke3VybGlzaH1cIiBiZWNhdXNlIHRoZSBnbG9iYWwgXCJteXRoaXhVSS51cmxSZXNvbHZlclwiIHJlcXVlc3RlZCBJIG5vdCBkbyBzby5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobmV3U3JjICYmIChuZXdTcmMudG9TdHJpbmcoKSAhPT0gdXJsLnRvU3RyaW5nKCkgJiYgbmV3U3JjLnRvU3RyaW5nKCkgIT09IHVybGlzaCkpXG4gICAgICB1cmwgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgcm9vdExvY2F0aW9uLCBuZXdTcmMpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuY29uc3QgSVNfVEVNUExBVEUgICAgICAgICA9IC9eKHRlbXBsYXRlKSQvaTtcbmNvbnN0IElTX1NDUklQVCAgICAgICAgICAgPSAvXihzY3JpcHQpJC9pO1xuY29uc3QgSVNfSEVBRF9UQUcgICAgICAgICA9IC9eKHN0eWxlfGxpbmt8bWV0YSkkL2k7XG5jb25zdCBTSE9VTERfSUdOT1JFICAgICAgID0gL14oYmFzZXxub3NjcmlwdHx0aXRsZSkkL2k7XG5jb25zdCBSRVFVSVJFX0NBQ0hFICAgICAgID0gbmV3IE1hcCgpO1xuY29uc3QgUkVTT0xWRV9TUkNfRUxFTUVOVCA9IC9ec2NyaXB0fGxpbmt8c3R5bGV8bXl0aGl4LWxhbmd1YWdlLXBhY2t8bXl0aGl4LXJlcXVpcmUkL2k7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBvcnRJbnRvRG9jdW1lbnRGcm9tU291cmNlKG93bmVyRG9jdW1lbnQsIGxvY2F0aW9uLCBfdXJsLCBzb3VyY2VTdHJpbmcsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgPSBfb3B0aW9ucyB8fCB7fTtcbiAgbGV0IHVybCAgICAgICA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBsb2NhdGlvbiwgX3VybCwgb3B0aW9ucy5tYWdpYyk7XG4gIGxldCBmaWxlTmFtZTtcbiAgbGV0IGJhc2VVUkwgICA9IG5ldyBVUkwoYCR7dXJsLm9yaWdpbn0ke3VybC5wYXRobmFtZS5yZXBsYWNlKC9bXi9dKyQvLCAobSkgPT4ge1xuICAgIGZpbGVOYW1lID0gbTtcbiAgICByZXR1cm4gJyc7XG4gIH0pfSR7dXJsLnNlYXJjaH0ke3VybC5oYXNofWApO1xuXG4gIGxldCB0ZW1wbGF0ZSA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgdGVtcGxhdGUuaW5uZXJIVE1MID0gc291cmNlU3RyaW5nO1xuXG4gIGxldCBjaGlsZHJlbiA9IEFycmF5LmZyb20odGVtcGxhdGUuY29udGVudC5jaGlsZHJlbikuc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB4ID0gYS50YWdOYW1lO1xuICAgIGxldCB5ID0gYi50YWdOYW1lO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVxZXFlcVxuICAgIGlmICh4ID09IHkpXG4gICAgICByZXR1cm4gMDtcblxuICAgIHJldHVybiAoeCA8IHkpID8gMSA6IC0xO1xuICB9KTtcblxuICBjb25zdCBmaWxlTmFtZVRvRWxlbWVudE5hbWUgPSAoZmlsZU5hbWUpID0+IHtcbiAgICByZXR1cm4gZmlsZU5hbWUudHJpbSgpLnJlcGxhY2UoL1xcLi4qJC8sICcnKS5yZXBsYWNlKC9cXGJbQS1aXXxbXkEtWl1bQS1aXS9nLCAoX20pID0+IHtcbiAgICAgIGxldCBtID0gX20udG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiAobS5sZW5ndGggPCAyKSA/IGAtJHttfWAgOiBgJHttLmNoYXJBdCgwKX0tJHttLmNoYXJBdCgxKX1gO1xuICAgIH0pLnJlcGxhY2UoLy17Mix9L2csICctJykucmVwbGFjZSgvXlteYS16XSovLCAnJykucmVwbGFjZSgvW15hLXpdKiQvLCAnJyk7XG4gIH07XG5cbiAgbGV0IGd1ZXNzZWRFbGVtZW50TmFtZSAgPSBmaWxlTmFtZVRvRWxlbWVudE5hbWUoZmlsZU5hbWUpO1xuICBsZXQgY29udGV4dCAgICAgICAgICAgICA9IHtcbiAgICBndWVzc2VkRWxlbWVudE5hbWUsXG4gICAgY2hpbGRyZW4sXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICB0ZW1wbGF0ZSxcbiAgICB1cmwsXG4gICAgYmFzZVVSTCxcbiAgICBmaWxlTmFtZSxcbiAgfTtcblxuICBpZiAodHlwZW9mIG9wdGlvbnMucHJlUHJvY2VzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRlbXBsYXRlID0gY29udGV4dC50ZW1wbGF0ZSA9IG9wdGlvbnMucHJlUHJvY2Vzcy5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICAgIGNoaWxkcmVuID0gQXJyYXkuZnJvbSh0ZW1wbGF0ZS5jb250ZW50LmNoaWxkcmVuKTtcbiAgfVxuXG4gIGxldCBub2RlSGFuZGxlciAgID0gb3B0aW9ucy5ub2RlSGFuZGxlcjtcbiAgbGV0IHRlbXBsYXRlQ291bnQgPSBjaGlsZHJlbi5yZWR1Y2UoKHN1bSwgZWxlbWVudCkgPT4gKChJU19URU1QTEFURS50ZXN0KGVsZW1lbnQudGFnTmFtZSkpID8gKHN1bSArIDEpIDogc3VtKSwgMCk7XG5cbiAgY29udGV4dC50ZW1wbGF0ZUNvdW50ID0gdGVtcGxhdGVDb3VudDtcblxuICBjb25zdCByZXNvbHZlRWxlbWVudFNyY0F0dHJpYnV0ZSA9IChlbGVtZW50LCBiYXNlVVJMKSA9PiB7XG4gICAgLy8gUmVzb2x2ZSBcInNyY1wiIGF0dHJpYnV0ZSwgc2luY2Ugd2UgYXJlXG4gICAgLy8gZ29pbmcgdG8gYmUgbW92aW5nIHRoZSBlbGVtZW50IGFyb3VuZFxuICAgIGxldCBzcmMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgaWYgKHNyYykge1xuICAgICAgc3JjID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIGJhc2VVUkwsIHNyYywgZmFsc2UpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYy50b1N0cmluZygpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfTtcblxuICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgIGlmIChvcHRpb25zLm1hZ2ljICYmIFJFU09MVkVfU1JDX0VMRU1FTlQudGVzdChjaGlsZC5sb2NhbE5hbWUpKVxuICAgICAgY2hpbGQgPSByZXNvbHZlRWxlbWVudFNyY0F0dHJpYnV0ZShjaGlsZCwgYmFzZVVSTCk7XG5cbiAgICBpZiAoU0hPVUxEX0lHTk9SRS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKElTX1RFTVBMQVRFLnRlc3QoY2hpbGQudGFnTmFtZSkpIHsgLy8gPHRlbXBsYXRlPlxuICAgICAgaWYgKHRlbXBsYXRlQ291bnQgPT09IDEgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpID09IG51bGwgJiYgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZScpID09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGAke3VybH06IDx0ZW1wbGF0ZT4gaXMgbWlzc2luZyBhIFwiZGF0YS1mb3JcIiBhdHRyaWJ1dGUsIGxpbmtpbmcgaXQgdG8gaXRzIG93bmVyIGNvbXBvbmVudC4gR3Vlc3NpbmcgXCIke2d1ZXNzZWRFbGVtZW50TmFtZX1cIi5gKTtcbiAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWZvcicsIGd1ZXNzZWRFbGVtZW50TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZUhhbmRsZXIgPT09ICdmdW5jdGlvbicgJiYgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZCwgeyAuLi5jb250ZXh0LCBpc1RlbXBsYXRlOiB0cnVlLCBpc0hhbmRsZWQ6IHRydWUgfSkgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgLy8gYXBwZW5kIHRvIGJvZHlcbiAgICAgIGxldCBlbGVtZW50TmFtZSA9IChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZm9yJykgfHwgY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1jb21wb25lbnQtbmFtZScpKTtcbiAgICAgIGlmICghb3duZXJEb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWZvcj1cIiR7ZWxlbWVudE5hbWV9XCIgaV0sW2RhdGEtbXl0aGl4LWNvbXBvbmVudC1uYW1lPVwiJHtlbGVtZW50TmFtZX1cIiBpXWApKVxuICAgICAgICBvd25lckRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH0gZWxzZSBpZiAoSVNfU0NSSVBULnRlc3QoY2hpbGQudGFnTmFtZSkpIHsgLy8gPHNjcmlwdD5cbiAgICAgIGxldCBjaGlsZENsb25lID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KGNoaWxkLnRhZ05hbWUpO1xuICAgICAgZm9yIChsZXQgYXR0cmlidXRlTmFtZSBvZiBjaGlsZC5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnc3JjJylcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBjaGlsZENsb25lLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBjaGlsZC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSkpO1xuICAgICAgfVxuXG4gICAgICBsZXQgc3JjID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgc3JjID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIGJhc2VVUkwsIHNyYywgZmFsc2UpO1xuICAgICAgICBjaGlsZENsb25lLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjLnRvU3RyaW5nKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbW9kdWxlJyk7XG4gICAgICAgIGNoaWxkQ2xvbmUuaW5uZXJIVE1MID0gY2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygbm9kZUhhbmRsZXIgPT09ICdmdW5jdGlvbicgJiYgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZENsb25lLCB7IC4uLmNvbnRleHQsIGlzU2NyaXB0OiB0cnVlLCBpc0hhbmRsZWQ6IHRydWUgfSkgPT09IGZhbHNlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgbGV0IHNjcmlwdElEID0gY2hpbGRDbG9uZS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICBpZiAoIXNjcmlwdElEKSB7XG4gICAgICAgIHNjcmlwdElEID0gYElEJHtCYXNlVXRpbHMuU0hBMjU2KGAke2d1ZXNzZWRFbGVtZW50TmFtZX06JHtzcmMgfHwgY2hpbGRDbG9uZS5pbm5lckhUTUx9YCl9YDtcbiAgICAgICAgY2hpbGRDbG9uZS5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0SUQpO1xuICAgICAgfVxuXG4gICAgICAvLyBhcHBlbmQgdG8gaGVhZFxuICAgICAgaWYgKCFvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2NyaXB0SUQpKVxuICAgICAgICBvd25lckRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoY2hpbGRDbG9uZSk7XG4gICAgfSBlbHNlIGlmIChJU19IRUFEX1RBRy50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDxsaW5rPiAmIDxzdHlsZT5cbiAgICAgIGxldCBpc1N0eWxlID0gKC9ec3R5bGUkL2kpLnRlc3QoY2hpbGQudGFnTmFtZSk7XG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nICYmIG5vZGVIYW5kbGVyLmNhbGwodGhpcywgY2hpbGQsIHsgLi4uY29udGV4dCwgaXNTdHlsZSwgaXNMaW5rOiAhaXNTdHlsZSwgaXNIYW5kbGVkOiB0cnVlIH0pID09PSBmYWxzZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGxldCBzdHlsZUlEID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgaWYgKCFzdHlsZUlEKSB7XG4gICAgICAgIHN0eWxlSUQgPSBgSUQke0Jhc2VVdGlscy5TSEEyNTYoY2hpbGQub3V0ZXJIVE1MKX1gO1xuICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVJRCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFwcGVuZCB0byBoZWFkXG4gICAgICBpZiAoIW93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtjaGlsZC50YWdOYW1lfSMke3N0eWxlSUR9YCkpXG4gICAgICAgIG93bmVyRG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfSBlbHNlIGlmICgoL15tZXRhJC9pKS50ZXN0KGNoaWxkLnRhZ05hbWUpKSB7IC8vIDxtZXRhPlxuICAgICAgaWYgKHR5cGVvZiBub2RlSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgbm9kZUhhbmRsZXIuY2FsbCh0aGlzLCBjaGlsZCwgeyAuLi5jb250ZXh0LCBpc01ldGE6IHRydWUsIGlzSGFuZGxlZDogdHJ1ZSB9KTtcblxuICAgICAgLy8gZG8gbm90aGluZyB3aXRoIHRoZXNlIHRhZ3NcbiAgICAgIGNvbnRpbnVlO1xuICAgIH0gZWxzZSB7IC8vIEV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgbGV0IGlzSGFuZGxlZCA9IGZhbHNlO1xuXG4gICAgICBpZiAoY2hpbGQubG9jYWxOYW1lID09PSAnbXl0aGl4LWxhbmd1YWdlLXBhY2snKSB7XG4gICAgICAgIGxldCBsYW5nUGFja0lEID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICBpZiAoIWxhbmdQYWNrSUQpIHtcbiAgICAgICAgICBsYW5nUGFja0lEID0gYElEJHtCYXNlVXRpbHMuU0hBMjU2KGAke2d1ZXNzZWRFbGVtZW50TmFtZX06JHtjaGlsZC5vdXRlckhUTUx9YCl9YDtcbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoJ2lkJywgbGFuZ1BhY2tJRCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFuZ3VhZ2VQcm92aWRlciA9IHRoaXMuY2xvc2VzdCgnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG4gICAgICAgIGlmICghbGFuZ3VhZ2VQcm92aWRlcilcbiAgICAgICAgICBsYW5ndWFnZVByb3ZpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlUHJvdmlkZXIpIHtcbiAgICAgICAgICBpZiAoIWxhbmd1YWdlUHJvdmlkZXIucXVlcnlTZWxlY3RvcihgbXl0aGl4LWxhbmd1YWdlLXBhY2sjJHtsYW5nUGFja0lEfWApKVxuICAgICAgICAgICAgbGFuZ3VhZ2VQcm92aWRlci5pbnNlcnRCZWZvcmUoY2hpbGQsIGxhbmd1YWdlUHJvdmlkZXIuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgICBpc0hhbmRsZWQgPSB0cnVlO1xuICAgICAgICB9IC8vIGVsc2UgZG8gbm90aGluZy4uLiBsZXQgaXQgYmUgZHVtcGVkIGludG8gdGhlIGRvbSBsYXRlclxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG5vZGVIYW5kbGVyID09PSAnZnVuY3Rpb24nKVxuICAgICAgICBub2RlSGFuZGxlci5jYWxsKHRoaXMsIGNoaWxkLCB7IC4uLmNvbnRleHQsIGlzSGFuZGxlZCB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMucG9zdFByb2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0ZW1wbGF0ZSA9IGNvbnRleHQudGVtcGxhdGUgPSBvcHRpb25zLnBvc3RQcm9jZXNzLmNhbGwodGhpcywgY29udGV4dCk7XG4gICAgY2hpbGRyZW4gPSBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGRyZW4pO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbi8qKlxuICogZ3JvdXBOYW1lOiBDb21wb25lbnRVdGlsc1xuICogZGVzYzogfFxuICogICBMb2FkIGEgcmVzb3VyY2UgZnJvbSBhIFVSTCB3aXRoIGNhY2hpbmcgc3VwcG9ydC5cbiAqXG4gKiAgIEJ5IGRlZmF1bHQsIHVzZXMgYGNhY2hlOiAnZGVmYXVsdCdgIHdoaWNoIHJlc3BlY3RzIEhUVFAgY2FjaGluZyBoZWFkZXJzXG4gKiAgIChDYWNoZS1Db250cm9sLCBFVGFnLCBldGMuKS4gVGhlIGNhY2hlIG1vZGUgY2FuIGJlIG92ZXJyaWRkZW4gdmlhOlxuICogICAtIFVSTCBxdWVyeSBwYXJhbWV0ZXI6IGA/Y2FjaGU9bm8tc3RvcmVgXG4gKiAgIC0gZmV0Y2hPcHRpb25zLmNhY2hlOiBgeyBmZXRjaE9wdGlvbnM6IHsgY2FjaGU6ICduby1jYWNoZScgfSB9YFxuICpcbiAqICAgU3VwcG9ydGVkIGNhY2hlIHZhbHVlczpcbiAqICAgLSAnZGVmYXVsdCc6IEJyb3dzZXIgdXNlcyBIVFRQIGNhY2hlIGhlYWRlcnMgKHJlY29tbWVuZGVkKVxuICogICAtICduby1zdG9yZSc6IEJ5cGFzcyBjYWNoZSBjb21wbGV0ZWx5XG4gKiAgIC0gJ3JlbG9hZCc6IEZldGNoIGZyZXNoIGJ1dCB1cGRhdGUgY2FjaGVcbiAqICAgLSAnbm8tY2FjaGUnOiBBbHdheXMgcmV2YWxpZGF0ZSB3aXRoIHNlcnZlclxuICogICAtICdmb3JjZS1jYWNoZSc6IFVzZSBjYWNoZSBpZiBhdmFpbGFibGUsIGV2ZW4gaWYgc3RhbGVcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmUodXJsT3JOYW1lLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgbGV0IHVybCAgICAgICAgICAgPSByZXNvbHZlVVJMLmNhbGwodGhpcywgb3duZXJEb2N1bWVudC5sb2NhdGlvbiwgdXJsT3JOYW1lLCBvcHRpb25zLm1hZ2ljKTtcbiAgbGV0IGNhY2hlS2V5O1xuXG4gIC8vIENoZWNrIGZvciBjYWNoZSBtb2RlIG92ZXJyaWRlIGluIFVSTCBwYXJhbXNcbiAgbGV0IHVybENhY2hlUGFyYW0gPSB1cmwuc2VhcmNoUGFyYW1zLmdldCgnY2FjaGUnKTtcbiAgbGV0IHNraXBJbnRlcm5hbENhY2hlID0gKC9eKGZhbHNlfG5vLXN0b3JlfHJlbG9hZHxuby1jYWNoZSkkLykudGVzdCh1cmxDYWNoZVBhcmFtKTtcblxuICBpZiAoIXNraXBJbnRlcm5hbENhY2hlKSB7XG4gICAgaWYgKHVybC5zZWFyY2hQYXJhbXMuZ2V0KCdjYWNoZVBhcmFtcycpICE9PSAndHJ1ZScpIHtcbiAgICAgIGxldCBjYWNoZUtleVVSTCA9IG5ldyBVUkwoYCR7dXJsLm9yaWdpbn0ke3VybC5wYXRobmFtZX1gKTtcbiAgICAgIGNhY2hlS2V5ID0gY2FjaGVLZXlVUkwudG9TdHJpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVLZXkgPSB1cmwudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgY2FjaGVkUmVzcG9uc2UgPSBSRVFVSVJFX0NBQ0hFLmdldChjYWNoZUtleSk7XG4gICAgaWYgKGNhY2hlZFJlc3BvbnNlKSB7XG4gICAgICBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlZFJlc3BvbnNlO1xuICAgICAgaWYgKGNhY2hlZFJlc3BvbnNlLnJlc3BvbnNlICYmIGNhY2hlZFJlc3BvbnNlLnJlc3BvbnNlLm9rKVxuICAgICAgICByZXR1cm4geyB1cmwsIHJlc3BvbnNlOiBjYWNoZWRSZXNwb25zZS5yZXNwb25zZSwgb3duZXJEb2N1bWVudCwgY2FjaGVkOiB0cnVlIH07XG4gICAgfVxuICB9XG5cbiAgLy8gQnVpbGQgZmV0Y2ggb3B0aW9ucyB3aXRoIGNhY2hlIHN1cHBvcnRcbiAgLy8gRGVmYXVsdCB0byAnZGVmYXVsdCcgd2hpY2ggcmVzcGVjdHMgSFRUUCBjYWNoaW5nIGhlYWRlcnMgKENhY2hlLUNvbnRyb2wsIEVUYWcsIGV0Yy4pXG4gIGxldCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgY2FjaGU6ICdkZWZhdWx0JyxcbiAgICAuLi4ob3B0aW9ucy5mZXRjaE9wdGlvbnMgfHwge30pLFxuICB9O1xuXG4gIC8vIFVSTCBwYXJhbWV0ZXIgb3ZlcnJpZGVzIGZldGNoT3B0aW9ucy5jYWNoZVxuICBpZiAodXJsQ2FjaGVQYXJhbSAmJiAvXihkZWZhdWx0fG5vLXN0b3JlfHJlbG9hZHxuby1jYWNoZXxmb3JjZS1jYWNoZXxvbmx5LWlmLWNhY2hlZCkkLy50ZXN0KHVybENhY2hlUGFyYW0pKVxuICAgIGZldGNoT3B0aW9ucy5jYWNoZSA9IHVybENhY2hlUGFyYW07XG5cbiAgbGV0IHByb21pc2UgPSBnbG9iYWxUaGlzLmZldGNoKHVybCwgZmV0Y2hPcHRpb25zKS50aGVuKFxuICAgIGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBpZiAoY2FjaGVLZXkpXG4gICAgICAgICAgUkVRVUlSRV9DQUNIRS5kZWxldGUoY2FjaGVLZXkpO1xuXG4gICAgICAgIGxldCBlcnJvciA9IG5ldyBFcnJvcihgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgZXJyb3IudXJsID0gdXJsO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgbGV0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICByZXNwb25zZS50ZXh0ID0gYXN5bmMgKCkgPT4gYm9keTtcbiAgICAgIHJlc3BvbnNlLmpzb24gPSBhc3luYyAoKSA9PiBKU09OLnBhcnNlKGJvZHkpO1xuXG4gICAgICByZXR1cm4geyB1cmwsIHJlc3BvbnNlLCBvd25lckRvY3VtZW50LCBjYWNoZWQ6IGZhbHNlIH07XG4gICAgfSxcbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZyb20gTXl0aGl4IFVJIFwicmVxdWlyZVwiOiAnLCBlcnJvcik7XG5cbiAgICAgIGlmIChjYWNoZUtleSlcbiAgICAgICAgUkVRVUlSRV9DQUNIRS5kZWxldGUoY2FjaGVLZXkpO1xuXG4gICAgICBlcnJvci51cmwgPSB1cmw7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9LFxuICApO1xuXG4gIFJFUVVJUkVfQ0FDSEUuc2V0KGNhY2hlS2V5LCBwcm9taXNlKTtcblxuICByZXR1cm4gYXdhaXQgcHJvbWlzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRQYXJ0aWFsSW50b0VsZW1lbnQoc3JjLCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9O1xuXG4gIGxldCB7XG4gICAgb3duZXJEb2N1bWVudCxcbiAgICB1cmwsXG4gICAgcmVzcG9uc2UsXG4gIH0gPSBhd2FpdCByZXF1aXJlLmNhbGwoXG4gICAgdGhpcyxcbiAgICBzcmMsXG4gICAge1xuICAgICAgb3duZXJEb2N1bWVudDogdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50LFxuICAgIH0sXG4gICk7XG5cbiAgbGV0IGJvZHkgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIHdoaWxlICh0aGlzLmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5jaGlsZE5vZGVzWzBdKTtcblxuICBsZXQgc2NvcGVEYXRhID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgZm9yIChsZXQgWyBrZXksIHZhbHVlIF0gb2YgdXJsLnNlYXJjaFBhcmFtcy5lbnRyaWVzKCkpXG4gICAgc2NvcGVEYXRhW2tleV0gPSBCYXNlVXRpbHMuY29lcmNlKHZhbHVlKTtcblxuICBpbXBvcnRJbnRvRG9jdW1lbnRGcm9tU291cmNlLmNhbGwoXG4gICAgdGhpcyxcbiAgICBvd25lckRvY3VtZW50LFxuICAgIG93bmVyRG9jdW1lbnQubG9jYXRpb24sXG4gICAgdXJsLFxuICAgIGJvZHksXG4gICAge1xuICAgICAgbm9kZUhhbmRsZXI6IChub2RlLCB7IGlzSGFuZGxlZCwgaXNUZW1wbGF0ZSB9KSA9PiB7XG4gICAgICAgIGlmICgoaXNUZW1wbGF0ZSB8fCAhaXNIYW5kbGVkKSAmJiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpKSB7XG4gICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cy5jYWxsKFxuICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBzY29wZTogVXRpbHMuY3JlYXRlU2NvcGUoc2NvcGVEYXRhLCBvcHRpb25zLnNjb3BlKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdmlzaWJpbGl0eU9ic2VydmVyKGNhbGxiYWNrLCBfb3B0aW9ucykge1xuICBjb25zdCBpbnRlcnNlY3Rpb25DYWxsYmFjayA9IChlbnRyaWVzKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0gZW50cmllcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQgZW50cnkgICA9IGVudHJpZXNbaV07XG4gICAgICBsZXQgZWxlbWVudCA9IGVudHJ5LnRhcmdldDtcbiAgICAgIGlmICghZW50cnkuaXNJbnRlcnNlY3RpbmcpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBsZXQgZWxlbWVudE9ic2VydmVycyA9IFV0aWxzLm1ldGFkYXRhKGVsZW1lbnQsIE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTKTtcbiAgICAgIGlmICghZWxlbWVudE9ic2VydmVycykge1xuICAgICAgICBlbGVtZW50T2JzZXJ2ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICBVdGlscy5tZXRhZGF0YShlbGVtZW50LCBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSUywgZWxlbWVudE9ic2VydmVycyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhID0gZWxlbWVudE9ic2VydmVycy5nZXQob2JzZXJ2ZXIpO1xuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSB7IHdhc1Zpc2libGU6IGZhbHNlLCByYXRpb1Zpc2libGU6IGVudHJ5LmludGVyc2VjdGlvblJhdGlvIH07XG4gICAgICAgIGVsZW1lbnRPYnNlcnZlcnMuc2V0KG9ic2VydmVyLCBkYXRhKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVudHJ5LmludGVyc2VjdGlvblJhdGlvID4gZGF0YS5yYXRpb1Zpc2libGUpXG4gICAgICAgIGRhdGEucmF0aW9WaXNpYmxlID0gZW50cnkuaW50ZXJzZWN0aW9uUmF0aW87XG5cbiAgICAgIGRhdGEucHJldmlvdXNWaXNpYmlsaXR5ID0gKGRhdGEudmlzaWJpbGl0eSA9PT0gdW5kZWZpbmVkKSA/IGRhdGEudmlzaWJpbGl0eSA6IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgIGRhdGEudmlzaWJpbGl0eSA9IChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDAuMCk7XG5cbiAgICAgIGNhbGxiYWNrKHsgLi4uZGF0YSwgZW50cnksIGVsZW1lbnQsIGluZGV4OiBpLCBkaXNjb25uZWN0OiAoKSA9PiBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCkgfSk7XG5cbiAgICAgIGlmIChkYXRhLnZpc2liaWxpdHkgJiYgIWRhdGEud2FzVmlzaWJsZSlcbiAgICAgICAgZGF0YS53YXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgcm9vdDogICAgICAgbnVsbCxcbiAgICB0aHJlc2hvbGQ6ICAwLjAsXG4gICAgLi4uKF9vcHRpb25zIHx8IHt9KSxcbiAgfTtcblxuICBsZXQgb2JzZXJ2ZXIgID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGludGVyc2VjdGlvbkNhbGxiYWNrLCBvcHRpb25zKTtcbiAgbGV0IGVsZW1lbnRzICA9IChfb3B0aW9ucyB8fCB7fSkuZWxlbWVudHMgfHwgW107XG5cbiAgZm9yIChsZXQgaSA9IDAsIGlsID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKylcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnRzW2ldKTtcblxuICByZXR1cm4gb2JzZXJ2ZXI7XG59XG5cbmNvbnN0IE5PX09CU0VSVkVSID0gT2JqZWN0LmZyZWV6ZSh7XG4gIHdhc1Zpc2libGU6ICAgICAgICAgZmFsc2UsXG4gIHJhdGlvVmlzaWJsZTogICAgICAgMC4wLFxuICB2aXNpYmlsaXR5OiAgICAgICAgIGZhbHNlLFxuICBwcmV2aW91c1Zpc2liaWxpdHk6IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRWaXNpYmlsaXR5TWV0YShlbGVtZW50LCBvYnNlcnZlcikge1xuICBsZXQgZWxlbWVudE9ic2VydmVycyA9IFV0aWxzLm1ldGFkYXRhKGVsZW1lbnQsIE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTKTtcbiAgaWYgKCFlbGVtZW50T2JzZXJ2ZXJzKVxuICAgIHJldHVybiBOT19PQlNFUlZFUjtcblxuICByZXR1cm4gZWxlbWVudE9ic2VydmVycy5nZXQob2JzZXJ2ZXIpIHx8IE5PX09CU0VSVkVSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFyZ2VzdERvY3VtZW50VGFiSW5kZXgob3duZXJEb2N1bWVudCkge1xuICBsZXQgbGFyZ2VzdCA9IC1JbmZpbml0eTtcblxuICBBcnJheS5mcm9tKChvd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJykpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBsZXQgdGFiSW5kZXggPSBwYXJzZUludChlbGVtZW50LmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSwgMTApO1xuICAgIGlmICghaXNGaW5pdGUodGFiSW5kZXgpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgaWYgKHRhYkluZGV4ID4gbGFyZ2VzdClcbiAgICAgIGxhcmdlc3QgPSB0YWJJbmRleDtcbiAgfSk7XG5cbiAgcmV0dXJuIChsYXJnZXN0IDwgMCkgPyAwIDogbGFyZ2VzdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFNjcmlwdEludG9IZWFkKF91cmwsIF9vcHRpb25zKSB7XG4gIGxldCBvcHRpb25zICAgICAgID0gX29wdGlvbnMgfHwge307XG4gIGxldCBhdHRyaWJ1dGVzICAgID0gb3B0aW9ucy5hdHRyaWJ1dGVzIHx8IHt9O1xuICBsZXQgb3duZXJEb2N1bWVudCA9IG9wdGlvbnMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgbGV0IHNjcmlwdEVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBsZXQgdXJsICAgICAgICAgICA9IHJlc29sdmVVUkwuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmxvY2F0aW9uLCBfdXJsLCB7IG1hZ2ljOiB0cnVlIH0pO1xuXG4gIGZvciAobGV0IFsgYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhhdHRyaWJ1dGVzKSkge1xuICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnc3JjJylcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gcmVzb2x2ZVVSTC5jYWxsKHRoaXMsIG93bmVyRG9jdW1lbnQubG9jYXRpb24sIGF0dHJpYnV0ZVZhbHVlLCB7IG1hZ2ljOiB0cnVlIH0pO1xuXG4gICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICB9XG5cbiAgbGV0IHNjcmlwdElEID0gc2NyaXB0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gIGlmICghc2NyaXB0SUQpIHtcbiAgICBzY3JpcHRJRCA9IGBJRCR7QmFzZVV0aWxzLlNIQTI1Nih1cmwpfWA7XG4gICAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgc2NyaXB0SUQpO1xuICB9XG5cbiAgc2NyaXB0RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHVybCk7XG5cbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXR0cmlidXRlcywgJ3R5cGUnKSlcbiAgICBzY3JpcHRFbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdtb2R1bGUnKTtcblxuICAvLyBhcHBlbmQgdG8gaGVhZFxuICBpZiAoIW93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3RvcihzY3JpcHRJRCkpXG4gICAgb3duZXJEb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdEVsZW1lbnQpO1xuXG4gIHJldHVybiBzY3JpcHRFbGVtZW50O1xufSIsIi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBDb25zdGFudHNcbiAqIGdyb3VwTmFtZTogQ29uc3RhbnRzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIE1pc2MgZ2xvYmFsIGNvbnN0YW50cyBhcmUgZm91bmQgd2l0aGluIHRoaXMgbmFtZXNwYWNlLlxuICogcHJvcGVydGllczpcbiAqICAgLSBuYW1lOiBNWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSU1xuICogICAgIGRhdGFUeXBlOiBzeW1ib2xcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGlzIHN5bWJvbCBpcyB1c2VkIGFzIGEgQHNlZSBVdGlscy5tZXRhZGF0YTsga2V5IGFnYWluc3QgZWxlbWVudHMgd2l0aCBhIGBkYXRhLXNyY2AgYXR0cmlidXRlLlxuICogICAgICAgRm9yIGVsZW1lbnRzIHdpdGggdGhpcyBhdHRyaWJ1dGUsIHNldCBhbiBbaW50ZXJzZWN0aW9uIG9ic2VydmVyXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSW50ZXJzZWN0aW9uX09ic2VydmVyX0FQSSkgaXMgc2V0dXAuXG4gKiAgICAgICBXaGVuIHRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgcmVwb3J0cyB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUsIHRoZW4gdGhlIFVSTCBzcGVjaWZpZWQgYnkgYGRhdGEtc3JjYCBpcyBmZXRjaGVkLCBhbmQgZHVtcGVkIGludG9cbiAqICAgICAgIHRoZSBlbGVtZW50IGFzIGl0cyBjaGlsZHJlbi4gVGhpcyBhbGxvd3MgZm9yIGR5bmFtaWMgXCJwYXJ0aWFsc1wiIHRoYXQgYXJlIGxvYWRlZCBhdCBydW4tdGltZS5cbiAqXG4gKiAgICAgICBUaGUgdmFsdWUgc3RvcmVkIGF0IHRoaXMgQHNlZSBVdGlscy5tZXRhZGF0YTsga2V5IGlzIGEgTWFwIG9mIFtpbnRlcnNlY3Rpb24gb2JzZXJ2ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9JbnRlcnNlY3Rpb25PYnNlcnZlcilcbiAqICAgICAgIGluc3RhbmNlcy4gVGhlIGtleXMgb2YgdGhpcyBtYXAgYXJlIHRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXJzIHRoZW1zZWx2ZXMuIFRoZSB2YWx1ZXMgYXJlIHJhdyBvYmplY3RzIHdpdGggdGhlIHNoYXBlXG4gKiAgICAgICBgeyB3YXNWaXNpYmxlOiBib29sZWFuLCByYXRpb1Zpc2libGU6IGZsb2F0LCBwcmV2aW91c1Zpc2liaWxpdHk6IGJvb2xlYW4sIHZpc2liaWxpdHk6IGJvb2xlYW4gfWAuXG4gKiAgIC0gbmFtZTogTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVJcbiAqICAgICBkYXRhVHlwZTogc3ltYm9sXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhpcyBpcyB1c2VkIGFzIGEgQHNlZSBVdGlscy5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyBrZXkgYnkgQHNlZSBVdGlscy5nbG9iYWxTdG9yZU5hbWVWYWx1ZVBhaXJIZWxwZXI7XG4gKiAgICAgICB0byBzdG9yZSBrZXkvdmFsdWUgcGFpcnMgZm9yIGEgc2luZ2xlIHZhbHVlLlxuICpcbiAqICAgICAgIE15dGhpeCBVSSBoYXMgZ2xvYmFsIHN0b3JlIGFuZCBmZXRjaCBoZWxwZXJzIGZvciBzZXR0aW5nIGFuZCBmZXRjaGluZyBkeW5hbWljIHByb3BlcnRpZXMuIFRoZXNlXG4gKiAgICAgICBtZXRob2RzIG9ubHkgYWNjZXB0IGEgc2luZ2xlIHZhbHVlIGJ5IGRlc2lnbi4uLiBidXQgc29tZXRpbWVzIGl0IGlzIGRlc2lyZWQgdGhhdCBhIHZhbHVlIGJlIHNldFxuICogICAgICAgd2l0aCBhIHNwZWNpZmljIGtleSBpbnN0ZWFkLiBUaGlzIGBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUmAgcHJvcGVydHkgYXNzaXN0cyB3aXRoIHRoaXMgcHJvY2VzcyxcbiAqICAgICAgIGFsbG93aW5nIGdsb2JhbCBoZWxwZXJzIHRvIHN0aWxsIGZ1bmN0aW9uIHdpdGggYSBzaW5nbGUgdmFsdWUgc2V0LCB3aGlsZSBpbiBzb21lIGNhc2VzIHN0aWxsIHBhc3NpbmdcbiAqICAgICAgIGEga2V5IHRocm91Z2ggdG8gdGhlIHNldHRlci4gQHNvdXJjZVJlZiBfbXl0aGl4TmFtZVZhbHVlUGFpckhlbHBlclVzYWdlO1xuICogICAgIG5vdGVzOlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDp3YXJuaW5nOiBVc2UgYXQgeW91ciBvd24gcmlzay4gVGhpcyBpcyBNeXRoaXggVUkgaW50ZXJuYWwgY29kZSB0aGF0IG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuICogICAtIG5hbWU6IE1ZVEhJWF9TSEFET1dfUEFSRU5UXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdXNlZCBhcyBhIEBzZWUgVXRpbHMubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsga2V5IGJ5IEBzZWUgTXl0aGl4VUlDb21wb25lbnQ7IHRvXG4gKiAgICAgICBzdG9yZSB0aGUgcGFyZW50IG5vZGUgb2YgYSBTaGFkb3cgRE9NLCBzbyB0aGF0IGl0IGNhbiBsYXRlciBiZSB0cmF2ZXJzZWQgYnkgQHNlZSBVdGlscy5nZXRQYXJlbnROb2RlOy5cbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gfFxuICogICAgICAgICA6d2FybmluZzogVXNlIGF0IHlvdXIgb3duIHJpc2suIFRoaXMgaXMgTXl0aGl4IFVJIGludGVybmFsIGNvZGUgdGhhdCBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cbiAqICAgICAgIC0gfFxuICogICAgICAgICA6ZXllOiBAc2VlIFV0aWxzLmdldFBhcmVudE5vZGU7LlxuICogICAtIG5hbWU6IE1ZVEhJWF9UWVBFXG4gKiAgICAgZGF0YVR5cGU6IHN5bWJvbFxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdXNlZCBmb3IgdHlwZSBjaGVja2luZyBieSBgaW5zdGFuY2VvZmAgY2hlY2tzIHRvIGRldGVybWluZSBpZiBhbiBpbnN0YW5jZVxuICogICAgICAgaXMgYSBzcGVjaWZpYyB0eXBlIChldmVuIGFjcm9zcyBqYXZhc2NyaXB0IGNvbnRleHRzIGFuZCBsaWJyYXJ5IHZlcnNpb25zKS4gQHNvdXJjZVJlZiBfbXl0aGl4VHlwZUV4YW1wbGU7XG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBCYXNlVXRpbHMuaXNUeXBlOy5cbiAqICAgLSBuYW1lOiBEWU5BTUlDX1BST1BFUlRZX1RZUEVcbiAqICAgICBkYXRhVHlwZTogc3ltYm9sXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVXNlZCBmb3IgcnVudGltZSB0eXBlIHJlZmxlY3Rpb24gYWdhaW5zdCBAc2VlIFV0aWxzLkR5bmFtaWNQcm9wZXJ0eTsuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBEeW5hbWljUHJvcGVydHk7LlxuICogICAgICAgLSB8XG4gKiAgICAgICAgIDpleWU6IEBzZWUgQmFzZVV0aWxzLmlzVHlwZTsuXG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBDb25zdGFudHMuTVlUSElYX1RZUEU7LlxuICovXG5cbi8vIEJhc2VcbmV4cG9ydCBjb25zdCBNWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUiAgPSBTeW1ib2wuZm9yKCdAbXl0aGl4L215dGhpeC11aS9jb25zdGFudHMvbmFtZS12YWx1ZS1wYWlyLWhlbHBlcicpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfTkFNRV9WQUxVRV9QQUlSX0hFTFBFUlxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9TSEFET1dfUEFSRU5UICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbnN0YW50cy9zaGFkb3ctcGFyZW50Jyk7IC8vIEByZWY6Q29uc3RhbnRzLk1ZVEhJWF9TSEFET1dfUEFSRU5UXG5leHBvcnQgY29uc3QgTVlUSElYX1RZUEUgICAgICAgICAgICAgICAgICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29uc3RhbnRzL2VsZW1lbnQtZGVmaW5pdGlvbicpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfVFlQRVxuZXhwb3J0IGNvbnN0IE1ZVEhJWF9JTlRFUlNFQ1RJT05fT0JTRVJWRVJTICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvaW50ZXJzZWN0aW9uLW9ic2VydmVycycpOyAvLyBAcmVmOkNvbnN0YW50cy5NWVRISVhfSU5URVJTRUNUSU9OX09CU0VSVkVSU1xuZXhwb3J0IGNvbnN0IE1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRCAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvZG9jdW1lbnQtaW5pdGlhbGl6ZWQnKTsgLy8gQHJlZjpDb25zdGFudHMuTVlUSElYX0RPQ1VNRU5UX0lOSVRJQUxJWkVEXG5cbi8vIER5bmFtaWNQcm9wZXJ0eVxuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfVkFMVUUgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL3ZhbHVlJyk7XG5leHBvcnQgY29uc3QgRFlOQU1JQ19QUk9QRVJUWV9JU19TRVRUSU5HICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvZHluYW1pYy1wcm9wZXJ0eS9jb25zdGFudHMvaXMtc2V0dGluZycpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfU0VUICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL3NldCcpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfTElTVEVORVJTICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2R5bmFtaWMtcHJvcGVydHkvY29uc3RhbnRzL2xpc3RlbmVycycpO1xuXG4vLyBUeXBlc1xuZXhwb3J0IGNvbnN0IEVMRU1FTlRfREVGSU5JVElPTl9UWVBFICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpFbGVtZW50RGVmaW5pdGlvbicpO1xuZXhwb3J0IGNvbnN0IFFVRVJZX0VOR0lORV9UWVBFICAgICAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpRdWVyeUVuZ2luZScpO1xuZXhwb3J0IGNvbnN0IERZTkFNSUNfUFJPUEVSVFlfVFlQRSAgICAgICAgICA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL3R5cGVzL015dGhpeFVJOjpEeW5hbWljUHJvcGVydHknKTsgLy8gQHJlZjpDb25zdGFudHMuRFlOQU1JQ19QUk9QRVJUWV9UWVBFXG5leHBvcnQgY29uc3QgTVlUSElYX1VJX0NPTVBPTkVOVF9UWVBFICAgICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvdHlwZXMvTXl0aGl4VUk6Ok15dGhpeFVJQ29tcG9uZW50Jyk7XG5cbi8vIEVsZW1lbnRzXG5leHBvcnQgY29uc3QgVU5GSU5JU0hFRF9ERUZJTklUSU9OICAgICAgICAgID0gU3ltYm9sLmZvcignQG15dGhpeC9teXRoaXgtdWkvY29uc3RhbnRzL3VuZmluaXNoZWQnKTtcblxuXG4iLCJpbXBvcnQge1xuICBEWU5BTUlDX1BST1BFUlRZX1RZUEUsXG4gIERZTkFNSUNfUFJPUEVSVFlfVkFMVUUsXG4gIERZTkFNSUNfUFJPUEVSVFlfSVNfU0VUVElORyxcbiAgRFlOQU1JQ19QUk9QRVJUWV9TRVQsXG4gIERZTkFNSUNfUFJPUEVSVFlfTElTVEVORVJTLFxuICBNWVRISVhfVFlQRSxcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBCYXNlVXRpbHMgZnJvbSAnLi9iYXNlLXV0aWxzLmpzJztcblxuZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KTtcblxuLyoqXG4gKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICogZGVzYzogfFxuICogICBgRHluYW1pY1Byb3BlcnR5YCBpcyBhIHNpbXBsZSB2YWx1ZSBzdG9yYWdlIGNsYXNzIHdyYXBwZWQgaW4gYSBQcm94eS5cbiAqXG4gKiAgICBJdCB3aWxsIGFsbG93IHRoZSB1c2VyIHRvIHN0b3JlIGFueSBkZXNpcmVkIHZhbHVlLiBUaGUgY2F0Y2ggaG93ZXZlciBpcyB0aGF0XG4gKiAgICBhbnkgdmFsdWUgc3RvcmVkIGNhbiBvbmx5IGJlIHNldCB0aHJvdWdoIGl0cyBzcGVjaWFsIGBzZXRgIG1ldGhvZC5cbiAqXG4gKiAgICBUaGlzIHdpbGwgYWxsb3cgYW55IGxpc3RlbmVycyB0byByZWNlaXZlIHRoZSBgJ3VwZGF0ZSdgIGV2ZW50IHdoZW4gYSB2YWx1ZSBpcyBzZXQuXG4gKlxuICogICAgU2luY2UgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2VzIGFyZSBhbHNvIGFsd2F5cyB3cmFwcGVkIGluIGEgUHJveHksIHRoZSB1c2VyIG1heVxuICogICAgXCJkaXJlY3RseVwiIGFjY2VzcyBhdHRyaWJ1dGVzIG9mIHRoZSBzdG9yZWQgdmFsdWUuIEZvciBleGFtcGxlLCBpZiBhIGBEeW5hbWljUHJvcGVydHlgXG4gKiAgICBpcyBzdG9yaW5nIGFuIEFycmF5IGluc3RhbmNlLCB0aGVuIG9uZSB3b3VsZCBiZSBhYmxlIHRvIGFjY2VzcyB0aGUgYC5sZW5ndGhgIHByb3BlcnR5XG4gKiAgICBcImRpcmVjdGx5XCIsIGkuZS4gYGR5bmFtaWNQcm9wLmxlbmd0aGAuXG4gKlxuICogICAgYER5bmFtaWNQcm9wZXJ0eWAgaGFzIGEgc3BlY2lhbCBgc2V0YCBtZXRob2QsIHdob3NlIG5hbWUgaXMgYSBgc3ltYm9sYCwgdG8gYXZvaWQgY29uZmxpY3RpbmdcbiAqICAgIG5hbWVzcGFjZXMgd2l0aCB0aGUgdW5kZXJseWluZyBkYXRhdHlwZSAoYW5kIHRoZSB3cmFwcGluZyBQcm94eSkuXG4gKiAgICBUbyBzZXQgYSB2YWx1ZSBvbiBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCBvbmUgbXVzdCBkbyBzbyBhcyBmb2xsb3dzOiBgZHluYW1pY1Byb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKG15TmV3VmFsdWUpYC5cbiAqICAgIFRoaXMgd2lsbCB1cGRhdGUgdGhlIGludGVybmFsIHZhbHVlLCBhbmQgaWYgdGhlIHNldCB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHN0b3JlZCB2YWx1ZSwgdGhlIGAndXBkYXRlJ2AgZXZlbnQgd2lsbCBiZSBkaXNwYXRjaGVkIHRvXG4gKiAgICBhbnkgbGlzdGVuZXJzLlxuICpcbiAqICAgIEFzIGBEeW5hbWljUHJvcGVydHlgIGlzIGFuIFtFdmVudFRhcmdldF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L0V2ZW50VGFyZ2V0KSwgb25lIGNhbiBhdHRhY2hcbiAqICAgIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgYCd1cGRhdGUnYCBldmVudCB0byBsaXN0ZW4gZm9yIHVwZGF0ZXMgdG8gdGhlIHVuZGVybHlpbmcgdmFsdWUuIFRoZSBgJ3VwZGF0ZSdgIGV2ZW50IGlzIHRoZSBvbmx5IGV2ZW50IHRoYXQgaXNcbiAqICAgIGV2ZXIgdHJpZ2dlcmVkIGJ5IHRoaXMgY2xhc3MuIFRoZSByZWNlaXZlZCBgZXZlbnRgIGluc3RhbmNlIGluIGV2ZW50IGNhbGxiYWNrcyB3aWxsIGhhdmUgdGhlIGZvbGxvd2luZyBhdHRyaWJ1dGVzOlxuICogICAgMS4gYHVwZGF0ZUV2ZW50Lm9yaWdpbmF0b3IgPSB0aGlzO2AgLSBgb3JpZ2luYXRvcmAgaXMgdGhlIGluc3RhbmNlIG9mIHRoZSBgRHluYW1pY1Byb3BlcnR5YCB3aGVyZSB0aGUgZXZlbnQgb3JpZ2luYXRlZCBmcm9tLlxuICogICAgMi4gYHVwZGF0ZUV2ZW50Lm9sZFZhbHVlID0gY3VycmVudFZhbHVlO2AgLSBgb2xkVmFsdWVgIGNvbnRhaW5zIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYER5bmFtaWNQcm9wZXJ0eWAgYmVmb3JlIHNldC5cbiAqICAgIDMuIGB1cGRhdGVFdmVudC52YWx1ZSA9IG5ld1ZhbHVlO2AgLSBgdmFsdWVgIGNvbnRhaW5zIHRoZSBjdXJyZW50IHZhbHVlIGJlaW5nIHNldCBvbiB0aGUgYER5bmFtaWNQcm9wZXJ0eWAuXG4gKlxuICogICAgVG8gcmV0cmlldmUgdGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlIG9mIGEgYER5bmFtaWNQcm9wZXJ0eWAsIG9uZSBtYXkgY2FsbCBgdmFsdWVPZigpYDogYGxldCByYXdWYWx1ZSA9IGR5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mKCk7YFxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDp3YXJuaW5nOiBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZXMgd2lsbCBpbnRlcm5hbGx5IHRyYWNrIHdoZW4gYSBgc2V0YCBvcGVyYXRpb24gaXMgdW5kZXJ3YXksIHRvIHByZXZlbnRcbiAqICAgICBjeWNsaWMgc2V0cyBhbmQgbWF4aW11bSBjYWxsIHN0YWNrIGVycm9ycy4gWW91IGFyZSBhbGxvd2VkIHRvIHNldCB0aGUgdmFsdWUgcmVjdXJzaXZlbHksIGhvd2V2ZXIgYHVwZGF0ZWAgZXZlbnRzXG4gKiAgICAgd2lsbCBvbmx5IGJlIGRpc3BhdGNoZWQgZm9yIHRoZSBmaXJzdCBgc2V0YCBjYWxsLiBBbnkgYHNldGAgb3BlcmF0aW9uIHRoYXQgaGFwcGVucyB3aGlsZSBhbm90aGVyIGBzZXRgIG9wZXJhdGlvbiBpc1xuICogICAgIHVuZGVyd2F5IHdpbGwgKipub3QqKiBkaXNwYXRjaCBhbnkgYCd1cGRhdGUnYCBldmVudHMuXG4gKiAgIC0gfFxuICogICAgIGAndXBkYXRlJ2AgZXZlbnRzIHdpbGwgYmUgZGlzcGF0Y2hlZCBpbW1lZGlhdGVseSAqYWZ0ZXIqIHRoZSBpbnRlcm5hbCB1bmRlcmx5aW5nIHN0b3JlZCB2YWx1ZSBpcyB1cGRhdGVkLiBUaG91Z2ggaXQgaXNcbiAqICAgICBwb3NzaWJsZSB0byBgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uYCBpbiBhbiBldmVudCBjYWxsYmFjaywgYXR0ZW1wdGluZyB0byBcInByZXZlbnREZWZhdWx0XCIgb3IgXCJzdG9wUHJvcGFnYXRpb25cIiB3aWxsIGRvIG5vdGhpbmcuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IER5bmFtaWNQcm9wZXJ0eSB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gKlxuICogICAgIGxldCBkeW5hbWljUHJvcGVydHkgPSBuZXcgRHluYW1pY1Byb3BlcnR5KCdpbml0aWFsIHZhbHVlJyk7XG4gKlxuICogICAgIGR5bmFtaWNQcm9wZXJ0eS5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGUnLCAoZXZlbnQpID0+IHtcbiAqICAgICAgIGNvbnNvbGUubG9nKGBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICcke2V2ZW50LnZhbHVlfScsIFByZXZpb3VzIFZhbHVlID0gJyR7ZXZlbnQub2xkVmFsdWV9J2ApO1xuICogICAgICAgY29uc29sZS5sb2coYEN1cnJlbnQgVmFsdWUgPSAnJHtkeW5hbWljUHJvcGVydHkudmFsdWVPZigpfSdgKTtcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgZHluYW1pY1Byb3BlcnR5W0R5bmFtaWNQcm9wZXJ0eS5zZXRdKCduZXcgdmFsdWUnKTtcbiAqXG4gKiAgICAgLy8gb3V0cHV0IC0+IER5bmFtaWMgUHJvcGVydHkgVXBkYXRlZCEgTmV3IHZhbHVlID0gJ25ldyB2YWx1ZScsIE9sZCBWYWx1ZSA9ICdpbml0aWFsIHZhbHVlJ1xuICogICAgIC8vIG91dHB1dCAtPiBDdXJyZW50IFZhbHVlID0gJ2luaXRpYWwgdmFsdWUnXG4gKiAgICAgYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljUHJvcGVydHkgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkgeyAvLyBAcmVmOl9teXRoaXhUeXBlRXhhbXBsZVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGluc3RhbmNlICYmIGluc3RhbmNlW01ZVEhJWF9UWVBFXSA9PT0gRFlOQU1JQ19QUk9QRVJUWV9UWVBFKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IFByb3BlcnR5XG4gICAqIG5hbWU6IHNldFxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBzdGF0aWM6IHRydWVcbiAgICogZGVzYzogfFxuICAgKiAgIEEgc3BlY2lhbCBgc3ltYm9sYCB1c2VkIHRvIGFjY2VzcyB0aGUgYHNldGAgbWV0aG9kIG9mIGEgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgYGBgamF2YXNjcmlwdFxuICAgKiAgICAgaW1wb3J0IHsgRHluYW1pY1Byb3BlcnR5IH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAgICpcbiAgICogICAgIGxldCBkeW5hbWljUHJvcGVydHkgPSBuZXcgRHluYW1pY1Byb3BlcnR5KCdpbml0aWFsIHZhbHVlJyk7XG4gICAqXG4gICAqICAgICBkeW5hbWljUHJvcGVydHkuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgKGV2ZW50KSA9PiB7XG4gICAqICAgICAgIGNvbnNvbGUubG9nKGBEeW5hbWljIFByb3BlcnR5IFVwZGF0ZWQhIE5ldyB2YWx1ZSA9ICcke2V2ZW50LnZhbHVlfScsIFByZXZpb3VzIFZhbHVlID0gJyR7ZXZlbnQub2xkVmFsdWV9J2ApO1xuICAgKiAgICAgICBjb25zb2xlLmxvZyhgQ3VycmVudCBWYWx1ZSA9ICcke2R5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mKCl9J2ApO1xuICAgKiAgICAgfSk7XG4gICAqXG4gICAqICAgICBkeW5hbWljUHJvcGVydHlbRHluYW1pY1Byb3BlcnR5LnNldF0oJ25ldyB2YWx1ZScpO1xuICAgKlxuICAgKiAgICAgLy8gb3V0cHV0IC0+IER5bmFtaWMgUHJvcGVydHkgVXBkYXRlZCEgTmV3IHZhbHVlID0gJ25ldyB2YWx1ZScsIE9sZCBWYWx1ZSA9ICdpbml0aWFsIHZhbHVlJ1xuICAgKiAgICAgLy8gb3V0cHV0IC0+IEN1cnJlbnQgVmFsdWUgPSAnaW5pdGlhbCB2YWx1ZSdcbiAgICogICAgIGBgYFxuICAgKi9cbiAgc3RhdGljIHNldCA9IERZTkFNSUNfUFJPUEVSVFlfU0VUOyAvLyBAcmVmOkR5bmFtaWNQcm9wZXJ0eS5zZXRcblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogbmFtZTogY29uc3RydWN0b3JcbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBVdGlsc1xuICAgKiBkZXNjOiB8XG4gICAqICAgQ29uc3RydWN0IGEgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IGluaXRpYWxWYWx1ZVxuICAgKiAgICAgZGF0YVR5cGU6IGFueVxuICAgKiAgICAgZGVzYzpcbiAgICogICAgICAgVGhlIGluaXRpYWwgdmFsdWUgdG8gc3RvcmUuXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFRoaXMgd2lsbCByZXR1cm4gYSBQcm94eSBpbnN0YW5jZSB3cmFwcGluZyB0aGUgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UuXG4gICAqICAgLSB8XG4gICAqICAgICA6aW5mbzogWW91IGNhbiBub3Qgc2V0IGEgYER5bmFtaWNQcm9wZXJ0eWAgdG8gYW5vdGhlciBgRHluYW1pY1Byb3BlcnR5YCBpbnN0YW5jZS5cbiAgICogICAgIElmIGBpbml0aWFsVmFsdWVgIGlzIGEgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UsIGl0IHdpbGwgdXNlIHRoZSBzdG9yZWQgdmFsdWVcbiAgICogICAgIG9mIHRoYXQgaW5zdGFuY2UgaW5zdGVhZCAoYnkgY2FsbGluZyBAc2VlIER5bmFtaWNQcm9wZXJ0eS52YWx1ZU9mOykuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWUpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBEWU5BTUlDX1BST1BFUlRZX1RZUEUsXG4gICAgICB9LFxuICAgICAgW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIChCYXNlVXRpbHMuaXNUeXBlKGluaXRpYWxWYWx1ZSwgRHluYW1pY1Byb3BlcnR5KSkgPyBpbml0aWFsVmFsdWUudmFsdWVPZigpIDogaW5pdGlhbFZhbHVlLFxuICAgICAgfSxcbiAgICAgIFtEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGZhbHNlLFxuICAgICAgfSxcbiAgICAgIFtEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU106IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbmV3IE1hcCgpLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGxldCBwcm94eSA9IG5ldyBQcm94eSh0aGlzLCB7XG4gICAgICBnZXQ6ICAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KSB7XG4gICAgICAgICAgbGV0IHZhbHVlID0gdGFyZ2V0W3Byb3BOYW1lXTtcbiAgICAgICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZS5iaW5kKHRhcmdldCkgOiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB2YWx1ZSA9IHRhcmdldFtEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXVtwcm9wTmFtZV07XG4gICAgICAgIHJldHVybiAodmFsdWUgPT09ICdmdW5jdGlvbicpID8gdmFsdWUuYmluZCh0YXJnZXRbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV0pIDogdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiAgKHRhcmdldCwgcHJvcE5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdGFyZ2V0W0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdW3Byb3BOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm94eTtcbiAgfVxuXG4gIFtTeW1ib2wudG9QcmltaXRpdmVdKGhpbnQpIHtcbiAgICBpZiAoaGludCA9PT0gJ251bWJlcicpXG4gICAgICByZXR1cm4gK3RoaXNbRFlOQU1JQ19QUk9QRVJUWV9WQUxVRV07XG4gICAgZWxzZSBpZiAoaGludCA9PT0gJ3N0cmluZycpXG4gICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdGhlIGR5bmFtaWMgcHJvcGVydHkgdmFsdWUgdG8gYSBzdHJpbmcuXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZhbHVlLlxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHZhbHVlID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXTtcbiAgICByZXR1cm4gKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykgPyB2YWx1ZS50b1N0cmluZygpIDogKCcnICsgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIGdyb3VwTmFtZTogRHluYW1pY1Byb3BlcnR5XG4gICAqIHBhcmVudDogRHluYW1pY1Byb3BlcnR5XG4gICAqIGRlc2M6IHxcbiAgICogICBGZXRjaCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlczogYW55OyBUaGUgdW5kZXJsaW5nIHJhdyB2YWx1ZS5cbiAgICovXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgRHluYW1pY1Byb3BlcnR5LlxuICAgKiBAcmV0dXJucyB7Kn0gVGhlIHVuZGVybHlpbmcgcmF3IHZhbHVlLlxuICAgKi9cbiAgdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBkZXNjOiB8XG4gICAqICAgSW50ZXJuYWwgZmFsbGJhY2sgbWV0aG9kIHRvIG5vdGlmeSBsaXN0ZW5lcnMgZGlyZWN0bHkgd2hlbiBuYXRpdmUgRXZlbnRUYXJnZXRcbiAgICogICBkaXNwYXRjaGluZyBmYWlscyAoZS5nLiwgZHVlIHRvIEV2ZW50IGNsYXNzIG1pc21hdGNoZXMgaW4gTm9kZS5qcy9KU0RPTSBlbnZpcm9ubWVudHMpLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBldmVudFR5cGVcbiAgICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IFRoZSBldmVudCB0eXBlIHRvIGRpc3BhdGNoIChlLmcuLCAndXBkYXRlJykuXG4gICAqICAgLSBuYW1lOiBldmVudERhdGFcbiAgICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAgICogICAgIGRlc2M6IEFuIG9iamVjdCBjb250YWluaW5nIGV2ZW50IGRhdGEgdG8gcGFzcyB0byBoYW5kbGVycy5cbiAgICovXG4gIF9ub3RpZnlMaXN0ZW5lcnMoZXZlbnRUeXBlLCBldmVudERhdGEpIHtcbiAgICBsZXQgbGlzdGVuZXJzTWFwID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU107XG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldChldmVudFR5cGUpO1xuXG4gICAgaWYgKCFoYW5kbGVycylcbiAgICAgIHJldHVybjtcblxuICAgIGZvciAobGV0IGhhbmRsZXIgb2YgaGFuZGxlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXIoZXZlbnREYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGhhbmRsZXJFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdEeW5hbWljUHJvcGVydHk6IEVycm9yIGluIGV2ZW50IGhhbmRsZXI6JywgaGFuZGxlckVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdHlwZTogRnVuY3Rpb25cbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIE92ZXJyaWRlIG9mIEV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIgdGhhdCBhbHNvIHRyYWNrcyBoYW5kbGVycyBpbiBhbiBpbnRlcm5hbFxuICAgKiAgIHJlZ2lzdHJ5IGZvciBjcm9zcy1wbGF0Zm9ybSBjb21wYXRpYmlsaXR5IGZhbGxiYWNrLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiB0eXBlXG4gICAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gICAqICAgICBkZXNjOiBUaGUgZXZlbnQgdHlwZSB0byBsaXN0ZW4gZm9yLlxuICAgKiAgIC0gbmFtZTogaGFuZGxlclxuICAgKiAgICAgZGF0YVR5cGU6IGZ1bmN0aW9uXG4gICAqICAgICBkZXNjOiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIGV2ZW50IGZpcmVzLlxuICAgKiAgIC0gbmFtZTogb3B0aW9uc1xuICAgKiAgICAgZGF0YVR5cGU6IG9iamVjdCB8IGJvb2xlYW5cbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkZXNjOiBPcHRpb25zIHBhc3NlZCB0byB0aGUgbmF0aXZlIGFkZEV2ZW50TGlzdGVuZXIuXG4gICAqL1xuXG4gIC8qKlxuICAgKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgZm9yIHZhbHVlIGNoYW5nZXMuIEFsc28gdHJhY2tzIGhhbmRsZXJzIGluIGFuIGludGVybmFsIHJlZ2lzdHJ5IGZvciBjcm9zcy1wbGF0Zm9ybSBjb21wYXRpYmlsaXR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3IgKGUuZy4sICd1cGRhdGUnKS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaGFuZGxlciAtIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgZXZlbnQgZmlyZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fGJvb2xlYW59IFtvcHRpb25zXSAtIE9wdGlvbnMgcGFzc2VkIHRvIHRoZSBuYXRpdmUgYWRkRXZlbnRMaXN0ZW5lci5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlci5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgbGV0IGxpc3RlbmVyc01hcCA9IHRoaXNbRFlOQU1JQ19QUk9QRVJUWV9MSVNURU5FUlNdO1xuICAgIGlmICghbGlzdGVuZXJzTWFwLmhhcyh0eXBlKSlcbiAgICAgIGxpc3RlbmVyc01hcC5zZXQodHlwZSwgW10pO1xuXG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldCh0eXBlKTtcbiAgICBpZiAoIWhhbmRsZXJzLmluY2x1ZGVzKGhhbmRsZXIpKVxuICAgICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0eXBlOiBGdW5jdGlvblxuICAgKiBncm91cE5hbWU6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBwYXJlbnQ6IER5bmFtaWNQcm9wZXJ0eVxuICAgKiBkZXNjOiB8XG4gICAqICAgT3ZlcnJpZGUgb2YgRXZlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciB0aGF0IGFsc28gcmVtb3ZlcyBoYW5kbGVycyBmcm9tIHRoZVxuICAgKiAgIGludGVybmFsIHJlZ2lzdHJ5IHVzZWQgZm9yIGNyb3NzLXBsYXRmb3JtIGNvbXBhdGliaWxpdHkgZmFsbGJhY2suXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IHR5cGVcbiAgICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAgICogICAgIGRlc2M6IFRoZSBldmVudCB0eXBlIHRvIHN0b3AgbGlzdGVuaW5nIGZvci5cbiAgICogICAtIG5hbWU6IGhhbmRsZXJcbiAgICogICAgIGRhdGFUeXBlOiBmdW5jdGlvblxuICAgKiAgICAgZGVzYzogVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIGRhdGFUeXBlOiBvYmplY3QgfCBib29sZWFuXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVzYzogT3B0aW9ucyBwYXNzZWQgdG8gdGhlIG5hdGl2ZSByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgKi9cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLiBBbHNvIHJlbW92ZXMgaGFuZGxlcnMgZnJvbSB0aGUgaW50ZXJuYWwgcmVnaXN0cnkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gVGhlIGV2ZW50IHR5cGUgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlbW92ZS5cbiAgICogQHBhcmFtIHtPYmplY3R8Ym9vbGVhbn0gW29wdGlvbnNdIC0gT3B0aW9ucyBwYXNzZWQgdG8gdGhlIG5hdGl2ZSByZW1vdmVFdmVudExpc3RlbmVyLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIHN1cGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XG5cbiAgICBsZXQgbGlzdGVuZXJzTWFwID0gdGhpc1tEWU5BTUlDX1BST1BFUlRZX0xJU1RFTkVSU107XG4gICAgbGV0IGhhbmRsZXJzID0gbGlzdGVuZXJzTWFwLmdldCh0eXBlKTtcblxuICAgIGlmICghaGFuZGxlcnMpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgaGFuZGxlckluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlckluZGV4ICE9PSAtMSlcbiAgICAgIGhhbmRsZXJzLnNwbGljZShoYW5kbGVySW5kZXgsIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIG5hbWU6IFwiW0R5bmFtaWNQcm9wZXJ0eS5zZXRdXCJcbiAgICogZ3JvdXBOYW1lOiBEeW5hbWljUHJvcGVydHlcbiAgICogcGFyZW50OiBEeW5hbWljUHJvcGVydHlcbiAgICogZGVzYzogfFxuICAgKiAgIFNldCB0aGUgdW5kZXJseWluZyByYXcgdmFsdWUgc3RvcmVkIGJ5IHRoaXMgYER5bmFtaWNQcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgSWYgdGhlIGN1cnJlbnQgc3RvcmVkIHZhbHVlIGlzIGV4YWN0bHkgdGhlIHNhbWUgYXMgdGhlIHByb3ZpZGVkIGB2YWx1ZWAsXG4gICAqICAgdGhlbiB0aGlzIG1ldGhvZCB3aWxsIHNpbXBseSByZXR1cm4uXG4gICAqXG4gICAqICAgT3RoZXJ3aXNlLCB3aGVuIHRoZSB1bmRlcmx5aW5nIHZhbHVlIGlzIHVwZGF0ZWQsIGB0aGlzLmRpc3BhdGNoRXZlbnRgIHdpbGxcbiAgICogICBiZSBjYWxsZWQgdG8gZGlzcGF0Y2ggYW4gYCd1cGRhdGUnYCBldmVudCB0byBub3RpZnkgYWxsIGxpc3RlbmVycyB0aGF0IHRoZVxuICAgKiAgIHVuZGVybHlpbmcgdmFsdWUgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbmV3VmFsdWVcbiAgICogICAgIGRhdGFUeXBlOiBhbnlcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIG5ldyB2YWx1ZSB0byBzZXQuIElmIHRoaXMgaXMgaXRzZWxmIGEgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UsIHRoZW5cbiAgICogICAgICAgaXQgd2lsbCBiZSB1bndyYXBwZWQgdG8gaXRzIHVuZGVybHlpbmcgdmFsdWUsIGFuZCB0aGF0IHdpbGwgYmUgdXNlZCBhcyB0aGUgdmFsdWUgaW5zdGVhZC5cbiAgICogICAtIG5hbWU6IG9wdGlvbnNcbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIEFuIG9iamVjdCB0byBwcm92aWRlZCBvcHRpb25zIGZvciB0aGUgb3BlcmF0aW9uLiBUaGUgc2hhcGUgb2YgdGhpcyBvYmplY3QgaXMgYHsgZGlzcGF0Y2hVcGRhdGVFdmVudDogYm9vbGVhbiB9YC5cbiAgICogICAgICAgSWYgYG9wdGlvbnMuZGlzcGF0Y2hVcGRhdGVFdmVudGAgZXF1YWxzIGBmYWxzZWAsIHRoZW4gbm8gYCd1cGRhdGUnYCBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgdG8gbGlzdGVuZXJzLlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBJZiB0aGUgdW5kZXJseWluZyBzdG9yZWQgdmFsdWUgaXMgZXhhY3RseSB0aGUgc2FtZSBhcyB0aGUgdmFsdWUgcHJvdmlkZWQsXG4gICAqICAgICB0aGVuIG5vdGhpbmcgd2lsbCBoYXBwZW4sIGFuZCB0aGUgbWV0aG9kIHdpbGwgc2ltcGx5IHJldHVybi5cbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBUaGUgdW5kZXJseWluZyB2YWx1ZSBpcyB1cGRhdGVkICpiZWZvcmUqIGRpc3BhdGNoaW5nIGV2ZW50cy5cbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBgRHluYW1pY1Byb3BlcnR5YCBwcm90ZWN0cyBhZ2FpbnN0IGN5Y2xpYyBldmVudCBjYWxsYmFja3MuIElmIGFuXG4gICAqICAgICBldmVudCBjYWxsYmFjayBhZ2FpbiBzZXRzIHRoZSB1bmRlcmx5aW5nIGBEeW5hbWljUHJvcGVydHlgIHZhbHVlLCB0aGVuXG4gICAqICAgICB0aGUgdmFsdWUgd2lsbCBiZSBzZXQsIGJ1dCBubyBldmVudCB3aWxsIGJlIGRpc3BhdGNoZWQgKHRvIHByZXZlbnQgZXZlbnQgbG9vcHMpLlxuICAgKiAgIC0gfFxuICAgKiAgICAgOmluZm86IFlvdSBjYW4gbm90IHNldCBhIGBEeW5hbWljUHJvcGVydHlgIHRvIGFub3RoZXIgYER5bmFtaWNQcm9wZXJ0eWAgaW5zdGFuY2UuXG4gICAqICAgICBJZiB0aGlzIG1ldGhvZCByZWNlaXZlcyBhIGBEeW5hbWljUHJvcGVydHlgIGluc3RhbmNlLCBpdCB3aWxsIHVzZSB0aGUgc3RvcmVkIHZhbHVlXG4gICAqICAgICBvZiB0aGF0IGluc3RhbmNlIGluc3RlYWQgKGJ5IGNhbGxpbmcgQHNlZSBEeW5hbWljUHJvcGVydHkudmFsdWVPZjspLlxuICAgKi9cbiAgW0RZTkFNSUNfUFJPUEVSVFlfU0VUXShfbmV3VmFsdWUsIF9vcHRpb25zKSB7XG4gICAgbGV0IG5ld1ZhbHVlID0gX25ld1ZhbHVlO1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKG5ld1ZhbHVlLCBEeW5hbWljUHJvcGVydHkpKVxuICAgICAgbmV3VmFsdWUgPSBuZXdWYWx1ZS52YWx1ZU9mKCk7XG5cbiAgICBpZiAodGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXSA9PT0gbmV3VmFsdWUpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAodGhpc1tEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddKSB7XG4gICAgICB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdID0gbmV3VmFsdWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfSVNfU0VUVElOR10gPSB0cnVlO1xuXG4gICAgICBsZXQgb2xkVmFsdWUgPSB0aGlzW0RZTkFNSUNfUFJPUEVSVFlfVkFMVUVdO1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX1ZBTFVFXSA9IG5ld1ZhbHVlO1xuXG4gICAgICBpZiAob3B0aW9ucy5kaXNwYXRjaFVwZGF0ZUV2ZW50ID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQgZXZlbnREYXRhID0ge1xuICAgICAgICBvcmlnaW5hdG9yOiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogICBvbGRWYWx1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgbmV3VmFsdWUsXG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBsZXQgdXBkYXRlRXZlbnQgPSBuZXcgRXZlbnQoJ3VwZGF0ZScpO1xuXG4gICAgICAgIHVwZGF0ZUV2ZW50Lm9yaWdpbmF0b3IgPSB0aGlzO1xuICAgICAgICB1cGRhdGVFdmVudC5vbGRWYWx1ZSA9IG9sZFZhbHVlO1xuICAgICAgICB1cGRhdGVFdmVudC52YWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh1cGRhdGVFdmVudCk7XG4gICAgICB9IGNhdGNoIChkaXNwYXRjaEVycm9yKSB7XG4gICAgICAgIC8vIEZhbGxiYWNrIGZvciBOb2RlLmpzL0pTRE9NIGVudmlyb25tZW50IHdoZXJlIEV2ZW50IGNsYXNzIG1pc21hdGNoZXNcbiAgICAgICAgLy8gY2FuIGNhdXNlIGRpc3BhdGNoRXZlbnQgdG8gZmFpbC4gVXNlIGludGVybmFsIGxpc3RlbmVyIG5vdGlmaWNhdGlvbi5cbiAgICAgICAgdGhpcy5fbm90aWZ5TGlzdGVuZXJzKCd1cGRhdGUnLCBldmVudERhdGEpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdGhpc1tEWU5BTUlDX1BST1BFUlRZX0lTX1NFVFRJTkddID0gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuRHluYW1pY1Byb3BlcnR5ID0gRHluYW1pY1Byb3BlcnR5O1xuIiwiaW1wb3J0IHtcbiAgRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUsXG4gIE1ZVEhJWF9UWVBFLFxuICBRVUVSWV9FTkdJTkVfVFlQRSxcbiAgVU5GSU5JU0hFRF9ERUZJTklUSU9OLFxufSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBEeW5hbWljUHJvcGVydHkgfSBmcm9tICcuL2R5bmFtaWMtcHJvcGVydHkuanMnO1xuXG5jb25zdCBTVUJTVElUVVRFX0NIQVJfQ09ERSA9IDI2O1xuXG4vKipcbiAqIHR5cGU6IE5hbWVzcGFjZVxuICogbmFtZTogRWxlbWVudHNcbiAqIGdyb3VwTmFtZTogRWxlbWVudHNcbiAqIGRlc2M6IHxcbiAqICAgYGltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztgXG4gKlxuICogICBVdGlsaXR5IGFuZCBlbGVtZW50IGJ1aWxkaW5nIGZ1bmN0aW9ucyBmb3IgdGhlIERPTS5cbiAqL1xuXG5jb25zdCBJU19QUk9QX05BTUUgICAgPSAvXnByb3BcXCQvO1xuY29uc3QgSVNfVEFSR0VUX1BST1AgID0gL15wcm90b3R5cGV8Y29uc3RydWN0b3IkLztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnREZWZpbml0aW9uIHtcbiAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoaW5zdGFuY2UgJiYgaW5zdGFuY2VbTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHRhZ05hbWUsIGF0dHJpYnV0ZXMsIGNoaWxkcmVuKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgW01ZVEhJWF9UWVBFXToge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSxcbiAgICAgIH0sXG4gICAgICAndGFnTmFtZSc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICB0YWdOYW1lLFxuICAgICAgfSxcbiAgICAgICdhdHRyaWJ1dGVzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGF0dHJpYnV0ZXMgfHwge30sXG4gICAgICB9LFxuICAgICAgJ2NoaWxkcmVuJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGNoaWxkcmVuIHx8IFtdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHRvU3RyaW5nKF9vcHRpb25zKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBfb3B0aW9ucyB8fCB7fTtcbiAgICBsZXQgdGFnTmFtZSA9IHRoaXMudGFnTmFtZTtcbiAgICBpZiAodGFnTmFtZSA9PT0gJyN0ZXh0JylcbiAgICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZXMudmFsdWUucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcblxuICAgIGxldCBhdHRycyA9ICh0YWdOYW1lID09PSAnI2ZyYWdtZW50JykgPyBudWxsIDogKChhdHRyaWJ1dGVzKSA9PiB7XG4gICAgICBsZXQgcGFydHMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgWyBhdHRyaWJ1dGVOYW1lLCB2YWx1ZSBdIG9mIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGlmIChJU19QUk9QX05BTUUudGVzdChhdHRyaWJ1dGVOYW1lKSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBsZXQgbmFtZSA9IHRoaXMudG9ET01BdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgICBwYXJ0cy5wdXNoKG5hbWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcGFydHMucHVzaChgJHtuYW1lfT1cIiR7ZW5jb2RlQXR0cmlidXRlVmFsdWUodmFsdWUpfVwiYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXJ0cy5qb2luKCcgJyk7XG4gICAgfSkodGhpcy5hdHRyaWJ1dGVzKTtcblxuICAgIGxldCBjaGlsZHJlbiA9ICgoY2hpbGRyZW4pID0+IHtcbiAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICAuZmlsdGVyKChjaGlsZCkgPT4gKGNoaWxkICE9IG51bGwgJiYgY2hpbGQgIT09IGZhbHNlICYmICFPYmplY3QuaXMoY2hpbGQsIE5hTikpKVxuICAgICAgICAubWFwKChjaGlsZCkgPT4gKChjaGlsZCAmJiB0eXBlb2YgY2hpbGQudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpID8gY2hpbGQudG9TdHJpbmcob3B0aW9ucykgOiAoJycgKyBjaGlsZCkpKVxuICAgICAgICAuam9pbignJyk7XG4gICAgfSkodGhpcy5jaGlsZHJlbik7XG5cbiAgICBpZiAodGFnTmFtZSA9PT0gJyNmcmFnbWVudCcpXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG5cbiAgICAvLyB0aGlzIHdpbGwgbW9yZSBjb21tb25seSBsb29rIGxpa2Ugd3JpdHRlbiBodG1sXG4gICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIGxldCBlbGVtZW50VGFnU3RhcnQgPSBgPCR7dGFnTmFtZX0keyhhdHRycykgPyBgICR7YXR0cnN9YCA6ICcnfT5gO1xuICAgIGxldCBlbGVtZW50VGFnRW5kICAgPSBgPC8ke3RhZ05hbWV9PmA7XG5cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsICdtYXNrSFRNTCcpKSB7XG4gICAgICBsZXQgY2hhckNvZGUgPSAodHlwZW9mIG9wdGlvbnMubWFza0hUTUwgPT09ICdudW1iZXInKSA/IFN0cmluZy5mcm9tQ2hhckNvZGUoU1VCU1RJVFVURV9DSEFSX0NPREUpIDogb3B0aW9ucy5tYXNrSFRNTDtcbiAgICAgIGNvbnN0IHdpcGVCbGFuayA9IChjb250ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBjb250ZW50LnJlcGxhY2UoLy4vZywgY2hhckNvZGUpO1xuICAgICAgfTtcblxuICAgICAgZWxlbWVudFRhZ1N0YXJ0ID0gd2lwZUJsYW5rKGVsZW1lbnRUYWdTdGFydCk7XG4gICAgICBlbGVtZW50VGFnRW5kID0gd2lwZUJsYW5rKGVsZW1lbnRUYWdFbmQpO1xuXG4gICAgICBpZiAob3B0aW9ucy5tYXNrQ2hpbGRyZW5QYXR0ZXJuICYmIG9wdGlvbnMubWFza0NoaWxkcmVuUGF0dGVybi50ZXN0KHRhZ05hbWUpKVxuICAgICAgICBjaGlsZHJlbiA9IHdpcGVCbGFuayhjaGlsZHJlbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2VsZW1lbnRUYWdTdGFydH0keyhpc1ZvaWRUYWcodGFnTmFtZSkpID8gJycgOiBgJHtjaGlsZHJlbn0ke2VsZW1lbnRUYWdFbmR9YH1gO1xuICB9XG5cbiAgdG9ET01BdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZS5yZXBsYWNlKC8oW0EtWl0pL2csICctJDEnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgYnVpbGQob3duZXJEb2N1bWVudCwgdGVtcGxhdGVPcHRpb25zKSB7XG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJyNmcmFnbWVudCcpXG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiBjaGlsZC5idWlsZChvd25lckRvY3VtZW50LCB0ZW1wbGF0ZU9wdGlvbnMpKTtcblxuICAgIGxldCBhdHRyaWJ1dGVzICAgID0gdGhpcy5hdHRyaWJ1dGVzO1xuICAgIGxldCBuYW1lc3BhY2VVUkkgID0gYXR0cmlidXRlcy5uYW1lc3BhY2VVUkk7XG4gICAgbGV0IG9wdGlvbnM7XG4gICAgbGV0IGVsZW1lbnQ7XG5cbiAgICBpZiAodGhpcy5hdHRyaWJ1dGVzLmlzKVxuICAgICAgb3B0aW9ucyA9IHsgaXM6IHRoaXMuYXR0cmlidXRlcy5pcyB9O1xuXG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJyN0ZXh0JylcbiAgICAgIHJldHVybiBwcm9jZXNzRWxlbWVudHMuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGF0dHJpYnV0ZXMudmFsdWUgfHwgJycpLCB0ZW1wbGF0ZU9wdGlvbnMpO1xuXG4gICAgaWYgKG5hbWVzcGFjZVVSSSlcbiAgICAgIGVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIHRoaXMudGFnTmFtZSwgb3B0aW9ucyk7XG4gICAgZWxzZSBpZiAoaXNTVkdFbGVtZW50KHRoaXMudGFnTmFtZSkpXG4gICAgICBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgdGhpcy50YWdOYW1lLCBvcHRpb25zKTtcbiAgICBlbHNlXG4gICAgICBlbGVtZW50ID0gb3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnTmFtZSk7XG5cbiAgICBjb25zdCBEQVRBX0VWRU5UX1BSRUZJWCA9ICdkYXRhLWV2ZW50LW9uJztcbiAgICBjb25zdCBoYW5kbGVBdHRyaWJ1dGUgPSAoZWxlbWVudCwgYXR0cmlidXRlTmFtZSwgX2F0dHJpYnV0ZVZhbHVlKSA9PiB7XG4gICAgICBsZXQgYXR0cmlidXRlVmFsdWUgICAgICA9IF9hdHRyaWJ1dGVWYWx1ZTtcbiAgICAgIGxldCBsb3dlckF0dHJpYnV0ZU5hbWUgID0gYXR0cmlidXRlTmFtZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAvLyBkYXRhLWV2ZW50LW9uKiBwYXR0ZXJuIGZvciBldmVudCBiaW5kaW5nXG4gICAgICBpZiAobG93ZXJBdHRyaWJ1dGVOYW1lLnN0YXJ0c1dpdGgoREFUQV9FVkVOVF9QUkVGSVgpKSB7XG4gICAgICAgIGxldCBldmVudE5hbWUgPSBsb3dlckF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKERBVEFfRVZFTlRfUFJFRklYLmxlbmd0aCk7XG4gICAgICAgIGlmIChldmVudE5hbWUpIHtcbiAgICAgICAgICBsZXQgbW9kaWZpZWRBdHRyaWJ1dGVOYW1lID0gdGhpcy50b0RPTUF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobW9kaWZpZWRBdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICAgICAgVXRpbHMuYmluZERhdGFFdmVudEF0dHJpYnV0ZShlbGVtZW50LCBldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbW9kaWZpZWRBdHRyaWJ1dGVOYW1lID0gdGhpcy50b0RPTUF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG1vZGlmaWVkQXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBEeW5hbWljIGJpbmRpbmdzIGFyZSBub3QgYWxsb3dlZCBmb3IgcHJvcGVydGllc1xuICAgIGNvbnN0IGhhbmRsZVByb3BlcnR5ID0gKGVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSkgPT4ge1xuICAgICAgbGV0IG5hbWUgPSBwcm9wZXJ0eU5hbWUucmVwbGFjZShJU19QUk9QX05BTUUsICcnKTtcbiAgICAgIGVsZW1lbnRbbmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xuICAgIH07XG5cbiAgICBsZXQgYXR0cmlidXRlTmFtZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBhdHRyaWJ1dGVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQgYXR0cmlidXRlTmFtZSAgID0gYXR0cmlidXRlTmFtZXNbaV07XG4gICAgICBsZXQgYXR0cmlidXRlVmFsdWUgID0gYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcblxuICAgICAgaWYgKElTX1BST1BfTkFNRS50ZXN0KGF0dHJpYnV0ZU5hbWUpKVxuICAgICAgICBoYW5kbGVQcm9wZXJ0eShlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGhhbmRsZUF0dHJpYnV0ZShlbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gICAgfVxuXG4gICAgbGV0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsZXQgY2hpbGQgICAgICAgICA9IGNoaWxkcmVuW2ldO1xuICAgICAgICBsZXQgY2hpbGRFbGVtZW50ICA9IGNoaWxkLmJ1aWxkKG93bmVyRG9jdW1lbnQsIHRlbXBsYXRlT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRFbGVtZW50KSlcbiAgICAgICAgICBjaGlsZEVsZW1lbnQuZmxhdChJbmZpbml0eSkuZm9yRWFjaCgoY2hpbGQpID0+IGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGRFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcHJvY2Vzc0VsZW1lbnRzLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgZWxlbWVudCxcbiAgICAgIHtcbiAgICAgICAgLi4udGVtcGxhdGVPcHRpb25zLFxuICAgICAgICBwcm9jZXNzRXZlbnRDYWxsYmFja3M6IGZhbHNlLFxuICAgICAgfSxcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IElTX0hUTUxfU0FGRV9DSEFSQUNURVIgPSAvXltcXHNhLXpBLVowLTlfLV0kLztcbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvLi9nLCAobSkgPT4ge1xuICAgIHJldHVybiAoSVNfSFRNTF9TQUZFX0NIQVJBQ1RFUi50ZXN0KG0pKSA/IG0gOiBgJiMke20uY2hhckNvZGVBdCgwKX07YDtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVBdHRyaWJ1dGVWYWx1ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW1wiJl0vZywgKG0pID0+IHtcbiAgICByZXR1cm4gYCYjJHttLmNoYXJDb2RlQXQoMCl9O2A7XG4gIH0pO1xufVxuXG5jb25zdCBJU19WT0lEX1RBRyA9IC9eYXJlYXxiYXNlfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8bGlua3xtZXRhfHBhcmFtfHNvdXJjZXx0cmFja3x3YnIkL2k7XG5leHBvcnQgZnVuY3Rpb24gaXNWb2lkVGFnKHRhZ05hbWUpIHtcbiAgcmV0dXJuIElTX1ZPSURfVEFHLnRlc3QodGFnTmFtZS5zcGxpdCgnOicpLnNsaWNlKC0xKVswXSk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWROb2RlVHlwZShpdGVtKSB7XG4gIGlmICghaXRlbSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBOb2RlKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmIChpdGVtW01ZVEhJWF9UWVBFXSA9PT0gRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGl0ZW1bTVlUSElYX1RZUEVdID09PSBRVUVSWV9FTkdJTkVfVFlQRSlcbiAgICByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBxdWVyeVRlbXBsYXRlKG93bmVyRG9jdW1lbnQsIG5hbWVPcklEKSB7XG4gIGlmIChuYW1lT3JJRCBpbnN0YW5jZW9mIE5vZGUpXG4gICAgcmV0dXJuIG5hbWVPcklEO1xuXG4gIGlmICghb3duZXJEb2N1bWVudClcbiAgICByZXR1cm47XG5cbiAgbGV0IHJlc3VsdCA9IG93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZU9ySUQpO1xuICBpZiAoIXJlc3VsdClcbiAgICByZXN1bHQgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRlbXBsYXRlW2RhdGEtbXl0aGl4LWNvbXBvbmVudC1uYW1lPVwiJHtuYW1lT3JJRH1cIiBpXSx0ZW1wbGF0ZVtkYXRhLWZvcj1cIiR7bmFtZU9ySUR9XCIgaV1gKTtcblxuICBpZiAoIXJlc3VsdClcbiAgICByZXN1bHQgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IobmFtZU9ySUQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGZpbHRlck5vZGVUcmVlKG5vZGUsIGZpbHRlckZ1bmMpIHtcbiAgaWYgKCFmaWx0ZXJGdW5jLmNhbGwodGhpcywgbm9kZSkpXG4gICAgcmV0dXJuO1xuXG4gIGxldCBjaGlsZHJlbiA9IEFycmF5LmZyb20obm9kZS5jaGlsZE5vZGVzKTtcbiAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkcmVuKSB7XG4gICAgbGV0IHJlc3VsdCA9IGZpbHRlck5vZGVUcmVlKGNoaWxkTm9kZSwgZmlsdGVyRnVuYyk7XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsKVxuICAgICAgbm9kZS5yZW1vdmVDaGlsZChjaGlsZE5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVNZXJnZUZyYWdtZW50KG93bmVyRG9jdW1lbnQsIG5vZGUpIHtcbiAgbGV0IGZyYWdtZW50ICA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBsZXQgc2VsZWN0b3JzID0gKG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZyb20nKSB8fCAnJykuc3BsaXQoJywnKS5tYXAoKChwYXJ0KSA9PiBwYXJ0LnRyaW0oKSkpLmZpbHRlcihCb29sZWFuKTtcblxuICBmb3IgKGxldCBpID0gMCwgaWwgPSBzZWxlY3RvcnMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgIGxldCBzZWxlY3RvciAgPSBzZWxlY3RvcnNbaV07XG4gICAgbGV0IGVsZW1lbnQgICA9IHF1ZXJ5VGVtcGxhdGUob3duZXJEb2N1bWVudCwgc2VsZWN0b3IpO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBsZXQgY2xvbmVkTm9kZSAgPSAoSVNfVEVNUExBVEUudGVzdChlbGVtZW50LnRhZ05hbWUpKSA/IGVsZW1lbnQuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgOiBlbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIGxldCBmaWx0ZXIgICAgICA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWZpbHRlcicpO1xuICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICBjbG9uZWROb2RlID0gZmlsdGVyTm9kZVRyZWUuY2FsbCh0aGlzLCBjbG9uZWROb2RlLCAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiAhKHR5cGVvZiBub2RlLm1hdGNoZXMgPT09ICdmdW5jdGlvbicgJiYgbm9kZS5tYXRjaGVzKGZpbHRlcikpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2xvbmVkTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuXG5jb25zdCBJU19URU1QTEFURV9NRVJHRV9FTEVNRU5UID0gL15teXRoaXgtbWVyZ2UkL2k7XG5leHBvcnQgZnVuY3Rpb24gcHJvY2Vzc0VsZW1lbnRzKF9ub2RlLCBfb3B0aW9ucykge1xuICBsZXQgbm9kZSA9IF9ub2RlO1xuICBpZiAoIW5vZGUpXG4gICAgcmV0dXJuIG5vZGU7XG5cbiAgbGV0IG9wdGlvbnMgICAgICAgPSBfb3B0aW9ucyB8fCB7fTtcbiAgbGV0IHNjb3BlICAgICAgICAgPSBvcHRpb25zLnNjb3BlO1xuICBpZiAoIXNjb3BlKSB7XG4gICAgc2NvcGUgPSBVdGlscy5jcmVhdGVTY29wZShub2RlKTtcbiAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCBzY29wZSB9O1xuICB9XG5cbiAgbGV0IGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yID0gKG9wdGlvbnMuZm9yY2VUZW1wbGF0ZUVuZ2luZSA9PT0gdHJ1ZSkgPyB1bmRlZmluZWQgOiBvcHRpb25zLmRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yO1xuICBsZXQgY2hpbGRyZW4gICAgICAgICAgICAgICAgICAgICAgPSBBcnJheS5mcm9tKG5vZGUuY2hpbGROb2Rlcyk7XG5cbiAgaWYgKG9wdGlvbnMuZm9yY2VUZW1wbGF0ZUVuZ2luZSAhPT0gdHJ1ZSAmJiAhZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IpIHtcbiAgICBkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvciA9IFV0aWxzLmdldERpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yKCk7XG4gICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IgfTtcbiAgfVxuXG4gIGxldCBpc1RlbXBsYXRlRW5naW5lRGlzYWJsZWQgPSBmYWxzZTtcbiAgaWYgKGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yICYmIFV0aWxzLnNwZWNpYWxDbG9zZXN0KG5vZGUsIGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yKSlcbiAgICBpc1RlbXBsYXRlRW5naW5lRGlzYWJsZWQgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWxwZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBsZXQgcmVzdWx0ID0gb3B0aW9ucy5oZWxwZXIuY2FsbCh0aGlzLCB7IHNjb3BlLCBvcHRpb25zLCBub2RlLCBjaGlsZHJlbiwgaXNUZW1wbGF0ZUVuZ2luZURpc2FibGVkLCBkaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvciB9KTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSlcbiAgICAgIG5vZGUgPSByZXN1bHQ7XG4gICAgZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSlcbiAgICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgbGV0IG93bmVyRG9jdW1lbnQgPSBvcHRpb25zLm93bmVyRG9jdW1lbnQgfHwgc2NvcGUub3duZXJEb2N1bWVudCB8fCBub2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBOb2RlLkFUVFJJQlVURV9OT0RFKSB7XG4gICAgaWYgKCFpc1RlbXBsYXRlRW5naW5lRGlzYWJsZWQpIHtcbiAgICAgIGxldCByZXN1bHQgPSBVdGlscy5mb3JtYXROb2RlVmFsdWUobm9kZSwgb3B0aW9ucyk7XG4gICAgICBpZiAoKEFycmF5LmlzQXJyYXkocmVzdWx0KSAmJiByZXN1bHQuc29tZShpc1ZhbGlkTm9kZVR5cGUpKSB8fCBpc1ZhbGlkTm9kZVR5cGUocmVzdWx0KSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzdWx0KSlcbiAgICAgICAgICByZXN1bHQgPSBbIHJlc3VsdCBdO1xuXG4gICAgICAgIGxldCBmcmFnbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHJlc3VsdCkge1xuICAgICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtW01ZVEhJWF9UWVBFXSA9PT0gRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50cyA9IGl0ZW0uYnVpbGQob3duZXJEb2N1bWVudCwgeyBzY29wZSB9KTtcbiAgICAgICAgICAgIGlmICghZWxlbWVudHMpXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShlbGVtZW50cykpXG4gICAgICAgICAgICAgIGVsZW1lbnRzLmZsYXQoSW5maW5pdHkpLmZvckVhY2goKGVsZW1lbnQpID0+IGZyYWdtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudHMpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKSB7XG4gICAgICAgICAgICBpdGVtLmFwcGVuZFRvKGZyYWdtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHRleHROb2RlID0gb3duZXJEb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgoJycgKyBpdGVtKSk7XG4gICAgICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgIT09IG5vZGUubm9kZVZhbHVlKSB7XG4gICAgICAgIG5vZGUubm9kZVZhbHVlID0gIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBOb2RlLkRPQ1VNRU5UX05PREUpIHtcbiAgICBpZiAoSVNfVEVNUExBVEVfTUVSR0VfRUxFTUVOVC50ZXN0KG5vZGUudGFnTmFtZSkpIHtcbiAgICAgIGxldCBmcmFnbWVudCA9IGNvbXBpbGVNZXJnZUZyYWdtZW50LmNhbGwodGhpcywgb3duZXJEb2N1bWVudCwgbm9kZSk7XG4gICAgICByZXR1cm4gcHJvY2Vzc0VsZW1lbnRzLmNhbGwodGhpcywgZnJhZ21lbnQsIHsgLi4ub3B0aW9ucywgc2NvcGUgfSk7XG4gICAgfVxuXG4gICAgbGV0IGF0dHJpYnV0ZU5hbWVzICA9IG5vZGUuZ2V0QXR0cmlidXRlTmFtZXMoKTtcbiAgICBjb25zdCBEQVRBX0VWRU5UX1BSRUZJWCA9ICdkYXRhLWV2ZW50LW9uJztcblxuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBhdHRyaWJ1dGVOYW1lICAgICAgID0gYXR0cmlidXRlTmFtZXNbaV07XG4gICAgICBsZXQgbG93ZXJBdHRyaWJ1dGVOYW1lICA9IGF0dHJpYnV0ZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSAgICAgID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG5cbiAgICAgIC8vIGRhdGEtZXZlbnQtb24qIHBhdHRlcm4gZm9yIGV2ZW50IGJpbmRpbmdcbiAgICAgIGlmIChsb3dlckF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aChEQVRBX0VWRU5UX1BSRUZJWCkpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJvY2Vzc0V2ZW50Q2FsbGJhY2tzICE9PSBmYWxzZSkge1xuICAgICAgICAgIGxldCBldmVudE5hbWUgPSBsb3dlckF0dHJpYnV0ZU5hbWUuc3Vic3RyaW5nKERBVEFfRVZFTlRfUFJFRklYLmxlbmd0aCk7XG4gICAgICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgVXRpbHMuYmluZERhdGFFdmVudEF0dHJpYnV0ZShub2RlLCBldmVudE5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChVdGlscy5pc1RlbXBsYXRlKGF0dHJpYnV0ZVZhbHVlKSkge1xuICAgICAgICBsZXQgYXR0cmlidXRlTm9kZSA9IG5vZGUuZ2V0QXR0cmlidXRlTm9kZShhdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZU5vZGUpXG4gICAgICAgICAgYXR0cmlidXRlTm9kZS5ub2RlVmFsdWUgPSBVdGlscy5mb3JtYXROb2RlVmFsdWUoYXR0cmlidXRlTm9kZSwgeyAuLi5vcHRpb25zLCBkaXNhbGxvd0hUTUw6IHRydWUgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdGlvbnMucHJvY2Vzc0NoaWxkcmVuID09PSBmYWxzZSlcbiAgICByZXR1cm4gbm9kZTtcblxuICBmb3IgKGxldCBjaGlsZE5vZGUgb2YgY2hpbGRyZW4pIHtcbiAgICBsZXQgcmVzdWx0ID0gcHJvY2Vzc0VsZW1lbnRzLmNhbGwodGhpcywgY2hpbGROb2RlLCBvcHRpb25zKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgTm9kZSAmJiByZXN1bHQgIT09IGNoaWxkTm9kZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbm9kZS5yZXBsYWNlQ2hpbGQocmVzdWx0LCBjaGlsZE5vZGUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBOT09QXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDaGlsZChwYXJlbnROb2RlLCBjaGlsZE5vZGUpIHtcbiAgaWYgKCFwYXJlbnROb2RlIHx8ICFjaGlsZE5vZGUpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAobGV0IGNoaWxkIG9mIEFycmF5LmZyb20ocGFyZW50Tm9kZS5jaGlsZE5vZGVzKSkge1xuICAgIGlmIChjaGlsZCA9PT0gY2hpbGROb2RlKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZCh0YWdOYW1lLCBkZWZhdWx0QXR0cmlidXRlcywgc2NvcGUpIHtcbiAgaWYgKCF0YWdOYW1lIHx8ICFCYXNlVXRpbHMuaXNUeXBlKHRhZ05hbWUsICc6OlN0cmluZycpKVxuICAgIHRocm93IG5ldyBFcnJvcignQ2FuIG5vdCBjcmVhdGUgYW4gRWxlbWVudERlZmluaXRpb24gd2l0aG91dCBhIFwidGFnTmFtZVwiLicpO1xuXG4gIGNvbnN0IGZpbmFsaXplciA9ICguLi5fY2hpbGRyZW4pID0+IHtcbiAgICBjb25zdCB3cmFuZ2xlQ2hpbGRyZW4gPSAoY2hpbGRyZW4pID0+IHtcbiAgICAgIHJldHVybiBjaGlsZHJlbi5mbGF0KEluZmluaXR5KS5tYXAoKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IE9iamVjdC5pcyh2YWx1ZSwgTmFOKSlcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJylcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodmFsdWVbVU5GSU5JU0hFRF9ERUZJTklUSU9OXSlcbiAgICAgICAgICByZXR1cm4gdmFsdWUoKTtcblxuICAgICAgICBpZiAodmFsdWVbTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSlcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG5cbiAgICAgICAgaWYgKHZhbHVlW01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpXG4gICAgICAgICAgcmV0dXJuIHdyYW5nbGVDaGlsZHJlbih2YWx1ZS5nZXRVbmRlcmx5aW5nQXJyYXkoKSk7XG5cbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgTm9kZSlcbiAgICAgICAgICByZXR1cm4gbm9kZVRvRWxlbWVudERlZmluaXRpb24odmFsdWUpO1xuXG4gICAgICAgIGlmICghQmFzZVV0aWxzLmlzVHlwZSh2YWx1ZSwgJzo6U3RyaW5nJywgRHluYW1pY1Byb3BlcnR5KSlcbiAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnREZWZpbml0aW9uKCcjdGV4dCcsIHsgdmFsdWU6ICgnJyArIHZhbHVlKSB9KTtcbiAgICAgIH0pLmZsYXQoSW5maW5pdHkpLmZpbHRlcihCb29sZWFuKTtcbiAgICB9O1xuXG4gICAgbGV0IGNoaWxkcmVuID0gd3JhbmdsZUNoaWxkcmVuKF9jaGlsZHJlbiB8fCBbXSk7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50RGVmaW5pdGlvbih0YWdOYW1lLCBzY29wZSwgY2hpbGRyZW4pO1xuICB9O1xuXG4gIGxldCByb290UHJveHkgPSBuZXcgUHJveHkoZmluYWxpemVyLCB7XG4gICAgZ2V0OiAodGFyZ2V0LCBhdHRyaWJ1dGVOYW1lKSA9PiB7XG4gICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gVU5GSU5JU0hFRF9ERUZJTklUSU9OKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgaWYgKHR5cGVvZiBhdHRyaWJ1dGVOYW1lID09PSAnc3ltYm9sJyB8fCBJU19UQVJHRVRfUFJPUC50ZXN0KGF0dHJpYnV0ZU5hbWUpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0W2F0dHJpYnV0ZU5hbWVdO1xuXG4gICAgICBpZiAoIXNjb3BlKSB7XG4gICAgICAgIGxldCBzY29wZWRQcm94eSA9IGJ1aWxkKHRhZ05hbWUsIGRlZmF1bHRBdHRyaWJ1dGVzLCBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIGRlZmF1bHRBdHRyaWJ1dGVzIHx8IHt9KSk7XG4gICAgICAgIHJldHVybiBzY29wZWRQcm94eVthdHRyaWJ1dGVOYW1lXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm94eShcbiAgICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgc2NvcGVbYXR0cmlidXRlTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gcm9vdFByb3h5O1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZ2V0OiAodGFyZ2V0LCBwcm9wTmFtZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGF0dHJpYnV0ZU5hbWUgPT09IFVORklOSVNIRURfREVGSU5JVElPTilcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXR0cmlidXRlTmFtZSA9PT0gJ3N5bWJvbCcgfHwgSVNfVEFSR0VUX1BST1AudGVzdChhdHRyaWJ1dGVOYW1lKSlcbiAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFthdHRyaWJ1dGVOYW1lXTtcblxuICAgICAgICAgICAgc2NvcGVbYXR0cmlidXRlTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHJvb3RQcm94eVtwcm9wTmFtZV07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHJvb3RQcm94eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVUb0VsZW1lbnREZWZpbml0aW9uKG5vZGUpIHtcbiAgaWYgKG5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKVxuICAgIHJldHVybiBuZXcgRWxlbWVudERlZmluaXRpb24oJyN0ZXh0JywgeyB2YWx1ZTogKCcnICsgbm9kZS5ub2RlVmFsdWUpIH0pO1xuXG4gIGlmIChub2RlLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBub2RlLm5vZGVUeXBlICE9PSBOb2RlLkRPQ1VNRU5UX0ZSQUdNRU5UX05PREUpXG4gICAgcmV0dXJuO1xuXG4gIGxldCBhdHRyaWJ1dGVzID0ge307XG5cbiAgaWYgKHR5cGVvZiBub2RlLmdldEF0dHJpYnV0ZU5hbWVzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZm9yIChsZXQgYXR0cmlidXRlTmFtZSBvZiBub2RlLmdldEF0dHJpYnV0ZU5hbWVzKCkpXG4gICAgICBhdHRyaWJ1dGVzW2F0dHJpYnV0ZU5hbWVdID0gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSk7XG4gIH1cblxuICBsZXQgY2hpbGRyZW4gPSBBcnJheS5mcm9tKG5vZGUuY2hpbGROb2RlcykubWFwKG5vZGVUb0VsZW1lbnREZWZpbml0aW9uKTtcbiAgcmV0dXJuIG5ldyBFbGVtZW50RGVmaW5pdGlvbigobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSA/ICcjZnJhZ21lbnQnIDogbm9kZS50YWdOYW1lLCBhdHRyaWJ1dGVzLCBjaGlsZHJlbik7XG59XG5cbmNvbnN0IElTX1RFTVBMQVRFID0gL14odGVtcGxhdGUpJC9pO1xuXG4vKipcbiAgICogcGFyZW50OiBFbGVtZW50c1xuICAgKiBncm91cE5hbWU6IEVsZW1lbnRzXG4gICAqIGRlc2M6IHxcbiAgICogICBBbG1vc3QgbGlrZSBgT2JqZWN0LmFzc2lnbmAsIG1lcmdlIGFsbCBjb21wb25lbnQgY2hpbGRyZW4gaW50byBhIHNpbmdsZSBub2RlICh0aGUgYHRhcmdldGApLlxuICAgKlxuICAgKiAgIFRoaXMgaXMgXCJ0ZW1wbGF0ZSBpbnRlbGxpZ2VudFwiLCBtZWFuaW5nIGZvciBgPHRlbXBsYXRlPmAgZWxlbWVudHMgc3BlY2lmaWNhbGx5LCBpdCB3aWxsIGV4ZWN1dGVcbiAgICogICBgY2hpbGRyZW4gPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKS5jaGlsZE5vZGVzYCB0byBjbG9uZSBhbGwgdGhlIGNoaWxkIG5vZGVzLCBhbmQgbm90XG4gICAqICAgbW9kaWZ5IHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZS4gSXQgaXMgYWxzbyB0ZW1wbGF0ZSBpbnRlbGxpZ2VudCBieSB0aGUgZmFjdCB0aGF0IGlmIHRoZSBgdGFyZ2V0YCBpc1xuICAgKiAgIGEgdGVtcGxhdGUsIGl0IHdpbGwgYWRkIHRoZSBjaGlsZHJlbiB0byBgY29udGVudGAgcHJvcGVybHkuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IHRhcmdldFxuICAgKiAgICAgZGF0YVR5cGVzOiBOb2RlXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSB0YXJnZXQgTm9kZSB0byBtZXJnZSBhbGwgY2hpbGRyZW4gaW50by4gSWYgdGhpcyBOb2RlIGlzIGEgYDx0ZW1wbGF0ZT5gIE5vZGUsIHRoZW4gaXQgd2lsbFxuICAgKiAgICAgICBwbGFjZSBhbGwgdGhlIG1lcmdlZCBjaGlsZHJlbiBpbnRvIGB0ZW1wbGF0ZS5jb250ZW50YC5cbiAgICogbm90ZXM6XG4gICAqICAgLSBBbnkgdGVtcGxhdGUgTm9kZSB3aWxsIGJlIGNsb25lZCwgYW5kIHNvIHRoZSBvcmlnaW5hbCB3aWxsIG5vdCBiZSBtb2RpZmllZC4gQWxsIG90aGVyIG5vZGVzIGFyZSAqKk5PVCoqXG4gICAqICAgICBjbG9uZWQgYmVmb3JlIHRoZSBtZXJnZSwgYW5kIHNvIHdpbGwgYmUgc3RyaXBwZWQgb2YgdGhlaXIgY2hpbGRyZW4uXG4gICAqICAgLSBNYWtlIGNlcnRhaW4geW91IGRlZXAgY2xvbmUgYW55IGVsZW1lbnQgZmlyc3QgKGV4Y2VwdCB0ZW1wbGF0ZXMpIGlmIHlvdSBkb24ndCB3YW50IHRoZSBwcm92aWRlZCBlbGVtZW50c1xuICAgKiAgICAgdG8gYmUgbW9kaWZpZWQuXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBOb2RlOyBUaGUgcHJvdmlkZWQgYHRhcmdldGAsIHdpdGggYWxsIGNoaWxkcmVuIG1lcmdlZCAoYWRkZWQpIGludG8gaXQuXG4gICAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQ2hpbGRyZW4odGFyZ2V0LCAuLi5vdGhlcnMpIHtcbiAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpXG4gICAgcmV0dXJuIHRhcmdldDtcblxuICBsZXQgdGFyZ2V0SXNUZW1wbGF0ZSA9IElTX1RFTVBMQVRFLnRlc3QodGFyZ2V0LnRhZ05hbWUpO1xuICBmb3IgKGxldCBvdGhlciBvZiBvdGhlcnMpIHtcbiAgICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIE5vZGUpKVxuICAgICAgY29udGludWU7XG5cbiAgICBsZXQgY2hpbGROb2RlcyA9IChJU19URU1QTEFURS50ZXN0KG90aGVyLnRhZ05hbWUpKSA/IG90aGVyLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmNoaWxkTm9kZXMgOiBvdGhlci5jaGlsZE5vZGVzO1xuICAgIGZvciAobGV0IGNoaWxkIG9mIEFycmF5LmZyb20oY2hpbGROb2RlcykpIHtcbiAgICAgIGxldCBjb250ZW50ID0gKElTX1RFTVBMQVRFLnRlc3QoY2hpbGQudGFnTmFtZSkpID8gY2hpbGQuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkgOiBjaGlsZDtcbiAgICAgIGlmICh0YXJnZXRJc1RlbXBsYXRlKVxuICAgICAgICB0YXJnZXQuY29udGVudC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNvbnN0IElTX1NWR19FTEVNRU5UX05BTUUgPSAvXihhbHRnbHlwaHxhbHRnbHlwaGRlZnxhbHRnbHlwaGl0ZW18YW5pbWF0ZXxhbmltYXRlQ29sb3J8YW5pbWF0ZU1vdGlvbnxhbmltYXRlVHJhbnNmb3JtfGFuaW1hdGlvbnxjaXJjbGV8Y2xpcFBhdGh8Y29sb3JQcm9maWxlfGN1cnNvcnxkZWZzfGRlc2N8ZGlzY2FyZHxlbGxpcHNlfGZlYmxlbmR8ZmVjb2xvcm1hdHJpeHxmZWNvbXBvbmVudHRyYW5zZmVyfGZlY29tcG9zaXRlfGZlY29udm9sdmVtYXRyaXh8ZmVkaWZmdXNlbGlnaHRpbmd8ZmVkaXNwbGFjZW1lbnRtYXB8ZmVkaXN0YW50bGlnaHR8ZmVkcm9wc2hhZG93fGZlZmxvb2R8ZmVmdW5jYXxmZWZ1bmNifGZlZnVuY2d8ZmVmdW5jcnxmZWdhdXNzaWFuYmx1cnxmZWltYWdlfGZlbWVyZ2V8ZmVtZXJnZW5vZGV8ZmVtb3JwaG9sb2d5fGZlb2Zmc2V0fGZlcG9pbnRsaWdodHxmZXNwZWN1bGFybGlnaHRpbmd8ZmVzcG90bGlnaHR8ZmV0aWxlfGZldHVyYnVsZW5jZXxmaWx0ZXJ8Zm9udHxmb250RmFjZXxmb250RmFjZUZvcm1hdHxmb250RmFjZU5hbWV8Zm9udEZhY2VTcmN8Zm9udEZhY2VVcml8Zm9yZWlnbk9iamVjdHxnfGdseXBofGdseXBoUmVmfGhhbmRsZXJ8aEtlcm58aW1hZ2V8bGluZXxsaW5lYXJncmFkaWVudHxsaXN0ZW5lcnxtYXJrZXJ8bWFza3xtZXRhZGF0YXxtaXNzaW5nR2x5cGh8bVBhdGh8cGF0aHxwYXR0ZXJufHBvbHlnb258cG9seWxpbmV8cHJlZmV0Y2h8cmFkaWFsZ3JhZGllbnR8cmVjdHxzZXR8c29saWRDb2xvcnxzdG9wfHN2Z3xzd2l0Y2h8c3ltYm9sfHRicmVha3x0ZXh0fHRleHRwYXRofHRyZWZ8dHNwYW58dW5rbm93bnx1c2V8dmlld3x2S2VybikkL2k7XG5leHBvcnQgZnVuY3Rpb24gaXNTVkdFbGVtZW50KHRhZ05hbWUpIHtcbiAgcmV0dXJuIElTX1NWR19FTEVNRU5UX05BTUUudGVzdCh0YWdOYW1lKTtcbn1cblxuZXhwb3J0IGNvbnN0IFRlcm0gPSAodmFsdWUpID0+IG5ldyBFbGVtZW50RGVmaW5pdGlvbignI3RleHQnLCB7IHZhbHVlIH0pO1xuZXhwb3J0IGNvbnN0IEVsZW1lbnRHZW5lcmF0b3IgPSBuZXcgUHJveHkoXG4gIHtcbiAgICBUZXJtLFxuICAgICRURVhUOiBUZXJtLFxuICB9LFxuICB7XG4gICAgZ2V0OiBmdW5jdGlvbih0YXJnZXQsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BOYW1lXTtcblxuICAgICAgaWYgKElTX1NWR19FTEVNRU5UX05BTUUudGVzdChwcm9wTmFtZSkpIHtcbiAgICAgICAgLy8gU1ZHIGVsZW1lbnRzXG4gICAgICAgIHJldHVybiBidWlsZChwcm9wTmFtZSwgeyBuYW1lc3BhY2VVUkk6ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWlsZChwcm9wTmFtZSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gTk9PUFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgfSxcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBFcnJvcnNcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIGBpbXBvcnQgeyBFcnJvcnMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIEN1c3RvbSBlcnJvciBjbGFzc2VzIGZvciBNeXRoaXggVUkgdGhhdCBwcm92aWRlIGNvbnRleHR1YWwsIGFjdGlvbmFibGUgZXJyb3IgbWVzc2FnZXMuXG4gKi9cblxuLyoqXG4gKiB0eXBlOiBDbGFzc1xuICogbmFtZTogTXl0aGl4RXJyb3JcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBCYXNlIGVycm9yIGNsYXNzIGZvciBhbGwgTXl0aGl4IFVJIGVycm9ycy4gUHJvdmlkZXMgY29uc2lzdGVudCBlcnJvciBmb3JtYXR0aW5nXG4gKiAgIGFuZCBjb250ZXh0IGF0dGFjaG1lbnQgY2FwYWJpbGl0aWVzLlxuICovXG5cbi8qKlxuICogQmFzZSBlcnJvciBjbGFzcyBmb3IgYWxsIE15dGhpeCBVSSBlcnJvcnMuXG4gKiBAZXh0ZW5kcyBFcnJvclxuICovXG5leHBvcnQgY2xhc3MgTXl0aGl4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBNeXRoaXhFcnJvci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtjb250ZXh0PXt9XSAtIEFkZGl0aW9uYWwgY29udGV4dCBmb3IgZGVidWdnaW5nLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29udGV4dCA9IHt9KSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5uYW1lID0gJ015dGhpeEVycm9yJztcbiAgICAvKiogQHR5cGUge09iamVjdH0gKi9cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIHR5cGU6IEZ1bmN0aW9uXG4gICAqIG5hbWU6IHRvU3RyaW5nXG4gICAqIGdyb3VwTmFtZTogRXJyb3JzXG4gICAqIHBhcmVudDogTXl0aGl4RXJyb3JcbiAgICogZGVzYzogfFxuICAgKiAgIEZvcm1hdCB0aGUgZXJyb3IgbWVzc2FnZSB3aXRoIGNvbnRleHQgZm9yIGRldmVsb3Blci1mcmllbmRseSBvdXRwdXQuXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBzdHJpbmc7IFRoZSBmb3JtYXR0ZWQgZXJyb3IgbWVzc2FnZS5cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBwYXJ0cyA9IFsgYCR7dGhpcy5uYW1lfTogJHt0aGlzLm1lc3NhZ2V9YCBdO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCkubGVuZ3RoID4gMClcbiAgICAgIHBhcnRzLnB1c2goYFxcbkNvbnRleHQ6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy5jb250ZXh0LCBudWxsLCAyKX1gKTtcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbiAgfVxufVxuXG4vKipcbiAqIHR5cGU6IENsYXNzXG4gKiBuYW1lOiBUZW1wbGF0ZUVycm9yXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgRXJyb3IgdGhyb3duIGR1cmluZyB0ZW1wbGF0ZSBwYXJzaW5nIG9yIGNvbXBpbGF0aW9uLiBJbmNsdWRlcyB0aGUgZmFpbGluZyBleHByZXNzaW9uLFxuICogICBhdmFpbGFibGUgc2NvcGUgdmFyaWFibGVzLCBhbmQgc291cmNlIGNvbnRleHQgZm9yIGRlYnVnZ2luZy5cbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgdGhyb3cgbmV3IFRlbXBsYXRlRXJyb3IoJ0ZhaWxlZCB0byBldmFsdWF0ZSBleHByZXNzaW9uJywge1xuICogICAgICAgZXhwcmVzc2lvbjogJ3VzZXIubmFtZScsXG4gKiAgICAgICBzY29wZVZhcmlhYmxlczogWydjb3VudCcsICdpdGVtcyddLFxuICogICAgICAgY29tcG9uZW50VGFnTmFtZTogJ215LWNvbXBvbmVudCcsXG4gKiAgICAgfSk7XG4gKiAgICAgYGBgXG4gKi9cblxuLyoqXG4gKiBFcnJvciB0aHJvd24gZHVyaW5nIHRlbXBsYXRlIHBhcnNpbmcgb3IgY29tcGlsYXRpb24uXG4gKiBAZXh0ZW5kcyBNeXRoaXhFcnJvclxuICovXG5leHBvcnQgY2xhc3MgVGVtcGxhdGVFcnJvciBleHRlbmRzIE15dGhpeEVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIFRlbXBsYXRlRXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD17fV0gLSBBZGRpdGlvbmFsIGNvbnRleHQgZm9yIGRlYnVnZ2luZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LmV4cHJlc3Npb25dIC0gVGhlIGZhaWxpbmcgdGVtcGxhdGUgZXhwcmVzc2lvbi5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gW2NvbnRleHQuc2NvcGVWYXJpYWJsZXNdIC0gQXZhaWxhYmxlIHNjb3BlIHZhcmlhYmxlcy5cbiAgICogQHBhcmFtIHt7c3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJ9fSBbY29udGV4dC5wb3NpdGlvbl0gLSBQb3NpdGlvbiBpbiBzb3VyY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5zdWdnZXN0aW9uXSAtIEFjdGlvbmFibGUgc3VnZ2VzdGlvbiBmb3IgZml4aW5nIHRoZSBlcnJvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGNvbnRleHQgPSB7fSkge1xuICAgIHN1cGVyKG1lc3NhZ2UsIGNvbnRleHQpO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqL1xuICAgIHRoaXMubmFtZSA9ICdUZW1wbGF0ZUVycm9yJztcbiAgICAvKiogQHR5cGUge3N0cmluZ3xudWxsfSAqL1xuICAgIHRoaXMuZXhwcmVzc2lvbiA9IGNvbnRleHQuZXhwcmVzc2lvbiB8fCBudWxsO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gICAgdGhpcy5zY29wZVZhcmlhYmxlcyA9IGNvbnRleHQuc2NvcGVWYXJpYWJsZXMgfHwgW107XG4gICAgLyoqIEB0eXBlIHt7c3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJ9fG51bGx9ICovXG4gICAgdGhpcy5wb3NpdGlvbiA9IGNvbnRleHQucG9zaXRpb24gfHwgbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBwYXJ0cyA9IFsgYCR7dGhpcy5uYW1lfTogJHt0aGlzLm1lc3NhZ2V9YCBdO1xuXG4gICAgaWYgKHRoaXMuZXhwcmVzc2lvbilcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgRXhwcmVzc2lvbjogQEAke3RoaXMuZXhwcmVzc2lvbn1AQGApO1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24pXG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIFBvc2l0aW9uOiAke3RoaXMucG9zaXRpb24uc3RhcnR9LSR7dGhpcy5wb3NpdGlvbi5lbmR9YCk7XG5cbiAgICBpZiAodGhpcy5zY29wZVZhcmlhYmxlcy5sZW5ndGggPiAwKVxuICAgICAgcGFydHMucHVzaChgXFxuICBBdmFpbGFibGUgdmFyaWFibGVzOiAke3RoaXMuc2NvcGVWYXJpYWJsZXMuam9pbignLCAnKX1gKTtcblxuICAgIGlmICh0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbilcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgU3VnZ2VzdGlvbjogJHt0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbn1gKTtcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbiAgfVxufVxuXG4vKipcbiAqIHR5cGU6IENsYXNzXG4gKiBuYW1lOiBDb21wb25lbnRFcnJvclxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEVycm9yIHRocm93biBkdXJpbmcgY29tcG9uZW50IGxpZmVjeWNsZSBvcGVyYXRpb25zLiBJbmNsdWRlcyB0aGUgY29tcG9uZW50IHRhZyBuYW1lLFxuICogICBsaWZlY3ljbGUgcGhhc2UsIGFuZCB0cnVuY2F0ZWQgb3V0ZXJIVE1MIGZvciBjb250ZXh0LlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICB0aHJvdyBuZXcgQ29tcG9uZW50RXJyb3IoJ0Vycm9yIGluIG1vdW50ZWQoKSBjYWxsYmFjaycsIHtcbiAqICAgICAgIHRhZ05hbWU6ICdteS1jb21wb25lbnQnLFxuICogICAgICAgcGhhc2U6ICdtb3VudGVkJyxcbiAqICAgICAgIG91dGVySFRNTDogJzxteS1jb21wb25lbnQgYXR0cj1cInZhbHVlXCI+Li4uPC9teS1jb21wb25lbnQ+JyxcbiAqICAgICB9KTtcbiAqICAgICBgYGBcbiAqL1xuXG4vKipcbiAqIEVycm9yIHRocm93biBkdXJpbmcgY29tcG9uZW50IGxpZmVjeWNsZSBvcGVyYXRpb25zLlxuICogQGV4dGVuZHMgTXl0aGl4RXJyb3JcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEVycm9yIGV4dGVuZHMgTXl0aGl4RXJyb3Ige1xuICAvKipcbiAgICogQ3JlYXRlIGEgQ29tcG9uZW50RXJyb3IuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dD17fV0gLSBBZGRpdGlvbmFsIGNvbnRleHQgZm9yIGRlYnVnZ2luZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnRhZ05hbWVdIC0gVGhlIGNvbXBvbmVudCdzIHRhZyBuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2NvbnRleHQucGhhc2VdIC0gVGhlIGxpZmVjeWNsZSBwaGFzZSAoJ21vdW50ZWQnLCAndW5tb3VudGVkJywgZXRjLikuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5vdXRlckhUTUxdIC0gVGhlIGNvbXBvbmVudCdzIG91dGVySFRNTC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnN1Z2dlc3Rpb25dIC0gQWN0aW9uYWJsZSBzdWdnZXN0aW9uIGZvciBmaXhpbmcgdGhlIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29udGV4dCA9IHt9KSB7XG4gICAgc3VwZXIobWVzc2FnZSwgY29udGV4dCk7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5uYW1lID0gJ0NvbXBvbmVudEVycm9yJztcbiAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICB0aGlzLnRhZ05hbWUgPSBjb250ZXh0LnRhZ05hbWUgfHwgJ3Vua25vd24nO1xuICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bGx9ICovXG4gICAgdGhpcy5waGFzZSA9IGNvbnRleHQucGhhc2UgfHwgbnVsbDtcbiAgICAvKiogQHR5cGUge3N0cmluZ3xudWxsfSAqL1xuICAgIHRoaXMub3V0ZXJIVE1MID0gY29udGV4dC5vdXRlckhUTUwgfHwgbnVsbDtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIGxldCBwYXJ0cyA9IFsgYCR7dGhpcy5uYW1lfTogJHt0aGlzLm1lc3NhZ2V9YCBdO1xuXG4gICAgcGFydHMucHVzaChgXFxuICBDb21wb25lbnQ6IDwke3RoaXMudGFnTmFtZX0+YCk7XG5cbiAgICBpZiAodGhpcy5waGFzZSlcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgTGlmZWN5Y2xlIHBoYXNlOiAke3RoaXMucGhhc2V9YCk7XG5cbiAgICBpZiAodGhpcy5vdXRlckhUTUwpIHtcbiAgICAgIGxldCB0cnVuY2F0ZWQgPSB0aGlzLm91dGVySFRNTC5sZW5ndGggPiAyMDBcbiAgICAgICAgPyB0aGlzLm91dGVySFRNTC5zdWJzdHJpbmcoMCwgMjAwKSArICcuLi4nXG4gICAgICAgIDogdGhpcy5vdXRlckhUTUw7XG4gICAgICBwYXJ0cy5wdXNoKGBcXG4gIEVsZW1lbnQ6ICR7dHJ1bmNhdGVkfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbilcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgU3VnZ2VzdGlvbjogJHt0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbn1gKTtcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbiAgfVxufVxuXG4vKipcbiAqIHR5cGU6IENsYXNzXG4gKiBuYW1lOiBEeW5hbWljUHJvcGVydHlFcnJvclxuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEVycm9yIHRocm93biB3aGVuIGFjY2Vzc2luZyBvciBtb2RpZnlpbmcgRHluYW1pY1Byb3BlcnR5IHZhbHVlcyBpbmNvcnJlY3RseS5cbiAqL1xuXG4vKipcbiAqIEVycm9yIHRocm93biB3aGVuIGFjY2Vzc2luZyBvciBtb2RpZnlpbmcgRHluYW1pY1Byb3BlcnR5IHZhbHVlcyBpbmNvcnJlY3RseS5cbiAqIEBleHRlbmRzIE15dGhpeEVycm9yXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljUHJvcGVydHlFcnJvciBleHRlbmRzIE15dGhpeEVycm9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIER5bmFtaWNQcm9wZXJ0eUVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAtIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHQ9e31dIC0gQWRkaXRpb25hbCBjb250ZXh0IGZvciBkZWJ1Z2dpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbY29udGV4dC5wcm9wZXJ0eVBhdGhdIC0gVGhlIHByb3BlcnR5IHBhdGggYmVpbmcgYWNjZXNzZWQuXG4gICAqIEBwYXJhbSB7Kn0gW2NvbnRleHQuY3VycmVudFZhbHVlXSAtIFRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHsqfSBbY29udGV4dC5hdHRlbXB0ZWRWYWx1ZV0gLSBUaGUgdmFsdWUgdGhhdCB3YXMgYXR0ZW1wdGVkIHRvIGJlIHNldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IFtjb250ZXh0LnN1Z2dlc3Rpb25dIC0gQWN0aW9uYWJsZSBzdWdnZXN0aW9uIGZvciBmaXhpbmcgdGhlIGVycm9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgY29udGV4dCA9IHt9KSB7XG4gICAgc3VwZXIobWVzc2FnZSwgY29udGV4dCk7XG4gICAgLyoqIEB0eXBlIHtzdHJpbmd9ICovXG4gICAgdGhpcy5uYW1lID0gJ0R5bmFtaWNQcm9wZXJ0eUVycm9yJztcbiAgICAvKiogQHR5cGUge3N0cmluZ3xudWxsfSAqL1xuICAgIHRoaXMucHJvcGVydHlQYXRoID0gY29udGV4dC5wcm9wZXJ0eVBhdGggfHwgbnVsbDtcbiAgICAvKiogQHR5cGUgeyp9ICovXG4gICAgdGhpcy5jdXJyZW50VmFsdWUgPSBjb250ZXh0LmN1cnJlbnRWYWx1ZTtcbiAgICAvKiogQHR5cGUgeyp9ICovXG4gICAgdGhpcy5hdHRlbXB0ZWRWYWx1ZSA9IGNvbnRleHQuYXR0ZW1wdGVkVmFsdWU7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcGFydHMgPSBbIGAke3RoaXMubmFtZX06ICR7dGhpcy5tZXNzYWdlfWAgXTtcblxuICAgIGlmICh0aGlzLnByb3BlcnR5UGF0aClcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgUHJvcGVydHkgcGF0aDogJHt0aGlzLnByb3BlcnR5UGF0aH1gKTtcblxuICAgIGlmICh0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbilcbiAgICAgIHBhcnRzLnB1c2goYFxcbiAgU3VnZ2VzdGlvbjogJHt0aGlzLmNvbnRleHQuc3VnZ2VzdGlvbn1gKTtcblxuICAgIHJldHVybiBwYXJ0cy5qb2luKCcnKTtcbiAgfVxufVxuXG4vKipcbiAqIHR5cGU6IENvbnN0YW50XG4gKiBuYW1lOiBNWVRISVhfREVCVUdcbiAqIGdyb3VwTmFtZTogRXJyb3JzXG4gKiBwYXJlbnQ6IEVycm9yc1xuICogZGVzYzogfFxuICogICBGbGFnIHRvIGVuYWJsZSB2ZXJib3NlIGRlYnVnIGxvZ2dpbmcuIFNldCBgZ2xvYmFsVGhpcy5NWVRISVhfREVCVUcgPSB0cnVlYCB0byBlbmFibGUuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiBkZWJ1ZyBtb2RlIGlzIGVuYWJsZWQuXG4gKiBTZXQgYGdsb2JhbFRoaXMuTVlUSElYX0RFQlVHID0gdHJ1ZWAgdG8gZW5hYmxlIHZlcmJvc2UgbG9nZ2luZy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIGRlYnVnIG1vZGUgaXMgZW5hYmxlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzRGVidWdNb2RlID0gKCkgPT4ge1xuICByZXR1cm4gZ2xvYmFsVGhpcy5NWVRISVhfREVCVUcgPT09IHRydWU7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBkZWJ1Z0xvZ1xuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIExvZyBhIG1lc3NhZ2Ugb25seSB3aGVuIE1ZVEhJWF9ERUJVRyBpcyBlbmFibGVkLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IG1lc3NhZ2VcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIG1lc3NhZ2UgdG8gbG9nLlxuICogICAtIG5hbWU6IGRhdGFcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiBBZGRpdGlvbmFsIGRhdGEgdG8gaW5jbHVkZSBpbiB0aGUgbG9nLlxuICovXG5cbi8qKlxuICogTG9nIGEgZGVidWcgbWVzc2FnZSAob25seSB3aGVuIE1ZVEhJWF9ERUJVRyBpcyBlbmFibGVkKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIG1lc3NhZ2UgdG8gbG9nLlxuICogQHBhcmFtIHsqfSBbZGF0YV0gLSBBZGRpdGlvbmFsIGRhdGEgdG8gaW5jbHVkZSBpbiB0aGUgbG9nLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBjb25zdCBkZWJ1Z0xvZyA9IChtZXNzYWdlLCBkYXRhKSA9PiB7XG4gIGlmICghaXNEZWJ1Z01vZGUoKSlcbiAgICByZXR1cm47XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZClcbiAgICBjb25zb2xlLmRlYnVnKGBbTXl0aGl4VUkgRGVidWddICR7bWVzc2FnZX1gLCBkYXRhKTtcbiAgZWxzZVxuICAgIGNvbnNvbGUuZGVidWcoYFtNeXRoaXhVSSBEZWJ1Z10gJHttZXNzYWdlfWApO1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogZGVidWdXYXJuXG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgTG9nIGEgd2FybmluZyBvbmx5IHdoZW4gTVlUSElYX0RFQlVHIGlzIGVuYWJsZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbWVzc2FnZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogICAtIG5hbWU6IGRhdGFcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiBBZGRpdGlvbmFsIGRhdGEgdG8gaW5jbHVkZS5cbiAqL1xuXG4vKipcbiAqIExvZyBhIHdhcm5pbmcgbWVzc2FnZSAob25seSB3aGVuIE1ZVEhJWF9ERUJVRyBpcyBlbmFibGVkKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIC0gVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEBwYXJhbSB7Kn0gW2RhdGFdIC0gQWRkaXRpb25hbCBkYXRhIHRvIGluY2x1ZGUuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuZXhwb3J0IGNvbnN0IGRlYnVnV2FybiA9IChtZXNzYWdlLCBkYXRhKSA9PiB7XG4gIGlmICghaXNEZWJ1Z01vZGUoKSlcbiAgICByZXR1cm47XG5cbiAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZClcbiAgICBjb25zb2xlLndhcm4oYFtNeXRoaXhVSSBXYXJuaW5nXSAke21lc3NhZ2V9YCwgZGF0YSk7XG4gIGVsc2VcbiAgICBjb25zb2xlLndhcm4oYFtNeXRoaXhVSSBXYXJuaW5nXSAke21lc3NhZ2V9YCk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBmb3JtYXRDb21wb25lbnRDb250ZXh0XG4gKiBncm91cE5hbWU6IEVycm9yc1xuICogcGFyZW50OiBFcnJvcnNcbiAqIGRlc2M6IHxcbiAqICAgQ3JlYXRlIGEgY29udGV4dCBvYmplY3QgZm9yIGNvbXBvbmVudCBlcnJvciByZXBvcnRpbmcuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogY29tcG9uZW50XG4gKiAgICAgZGF0YVR5cGU6IEhUTUxFbGVtZW50XG4gKiAgICAgZGVzYzogVGhlIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqICAgLSBuYW1lOiBwaGFzZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgbGlmZWN5Y2xlIHBoYXNlIChlLmcuLCAnbW91bnRlZCcsICd1bm1vdW50ZWQnKS5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgb2JqZWN0OyBDb250ZXh0IG9iamVjdCBzdWl0YWJsZSBmb3IgQ29tcG9uZW50RXJyb3IuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBjb250ZXh0IG9iamVjdCBmb3IgY29tcG9uZW50IGVycm9yIHJlcG9ydGluZy5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbXBvbmVudCAtIFRoZSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGhhc2UgLSBUaGUgbGlmZWN5Y2xlIHBoYXNlICgnbW91bnRlZCcsICd1bm1vdW50ZWQnLCBldGMuKS5cbiAqIEByZXR1cm5zIHt7dGFnTmFtZTogc3RyaW5nLCBwaGFzZTogc3RyaW5nLCBvdXRlckhUTUw6IHN0cmluZ319IENvbnRleHQgb2JqZWN0IHN1aXRhYmxlIGZvciBDb21wb25lbnRFcnJvci5cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdENvbXBvbmVudENvbnRleHQgPSAoY29tcG9uZW50LCBwaGFzZSkgPT4ge1xuICBsZXQgb3V0ZXJIVE1MID0gJyc7XG5cbiAgdHJ5IHtcbiAgICBvdXRlckhUTUwgPSBjb21wb25lbnQub3V0ZXJIVE1MIHx8ICcnO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIG91dGVySFRNTCA9IGA8JHtjb21wb25lbnQudGFnTmFtZT8udG9Mb3dlckNhc2UoKSB8fCAndW5rbm93bid9PmA7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRhZ05hbWU6ICAgY29tcG9uZW50LnRhZ05hbWU/LnRvTG93ZXJDYXNlKCkgfHwgJ3Vua25vd24nLFxuICAgIHBoYXNlOiAgICAgcGhhc2UsXG4gICAgb3V0ZXJIVE1MOiBvdXRlckhUTUwsXG4gIH07XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBmb3JtYXRTY29wZVZhcmlhYmxlc1xuICogZ3JvdXBOYW1lOiBFcnJvcnNcbiAqIHBhcmVudDogRXJyb3JzXG4gKiBkZXNjOiB8XG4gKiAgIEV4dHJhY3QgYXZhaWxhYmxlIHZhcmlhYmxlIG5hbWVzIGZyb20gYSBzY29wZSBvYmplY3QgZm9yIGVycm9yIGNvbnRleHQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogc2NvcGVcbiAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gKiAgICAgZGVzYzogVGhlIHNjb3BlIG9iamVjdCB0byBpbnNwZWN0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBBcnJheTxzdHJpbmc+OyBMaXN0IG9mIHZhcmlhYmxlIG5hbWVzIGF2YWlsYWJsZSBpbiBzY29wZS5cbiAqL1xuXG4vKipcbiAqIEV4dHJhY3QgYXZhaWxhYmxlIHZhcmlhYmxlIG5hbWVzIGZyb20gYSBzY29wZSBvYmplY3QgZm9yIGVycm9yIGNvbnRleHQuXG4gKiBAcGFyYW0ge09iamVjdH0gc2NvcGUgLSBUaGUgc2NvcGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7c3RyaW5nW119IExpc3Qgb2YgdmFyaWFibGUgbmFtZXMgYXZhaWxhYmxlIGluIHNjb3BlLlxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0U2NvcGVWYXJpYWJsZXMgPSAoc2NvcGUpID0+IHtcbiAgaWYgKCFzY29wZSlcbiAgICByZXR1cm4gW107XG5cbiAgbGV0IHZhcmlhYmxlcyA9IFtdO1xuXG4gIHRyeSB7XG4gICAgLy8gR2V0IG93biBwcm9wZXJ0aWVzXG4gICAgdmFyaWFibGVzID0gT2JqZWN0LmtleXMoc2NvcGUpO1xuXG4gICAgLy8gQWxzbyBjaGVjayBwcm90b3R5cGUgY2hhaW4gZm9yIHNjb3BlIHByb3hpZXNcbiAgICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc2NvcGUpO1xuICAgIHdoaWxlIChwcm90byAmJiBwcm90byAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKSkge1xuICAgICAgICBpZiAoIXZhcmlhYmxlcy5pbmNsdWRlcyhrZXkpICYmIGtleSAhPT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICB2YXJpYWJsZXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBJZ25vcmUgZXJyb3JzIGZyb20gcHJveHkgdHJhcHNcbiAgfVxuXG4gIHJldHVybiB2YXJpYWJsZXMuZmlsdGVyKCh2KSA9PiAhdi5zdGFydHNXaXRoKCdfJykpO1xufTtcbiIsImltcG9ydCB7XG4gIE1ZVEhJWF9UWVBFLFxuICBNWVRISVhfVUlfQ09NUE9ORU5UX1RZUEUsXG4gIE1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRCxcbiAgTVlUSElYX1NIQURPV19QQVJFTlQsXG4gIFVORklOSVNIRURfREVGSU5JVElPTixcbn0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuXG5pbXBvcnQgKiBhcyBDb21wb25lbnRVdGlscyAgZnJvbSAnLi9jb21wb25lbnQtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgQmFzZVV0aWxzICAgICAgIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyAgICAgICAgICAgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgeyBRdWVyeUVuZ2luZSB9ICAgICAgZnJvbSAnLi9xdWVyeS1lbmdpbmUuanMnO1xuaW1wb3J0ICogYXMgRWxlbWVudHMgICAgICAgIGZyb20gJy4vZWxlbWVudHMuanMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50RXJyb3IsXG4gIGZvcm1hdENvbXBvbmVudENvbnRleHQsXG4gIGRlYnVnTG9nLFxufSBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL3N0eWxlc2hlZXQtbWFuYWdlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBpc015dGhpeENvbXBvbmVudCA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvaXMtbXl0aGl4LWNvbXBvbmVudCcpOyAvLyBAcmVmOk15dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XG5cbmNvbnN0IElTX0FUVFJfTUVUSE9EX05BTUUgICA9IC9eYXR0clxcJCguKikkLztcbmNvbnN0IFJFR0lTVEVSRURfQ09NUE9ORU5UUyA9IG5ldyBTZXQoKTtcblxuLyoqKlxuICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICogZGVzYzogfFxuICogICBUaGlzIHRoZSBiYXNlIGNsYXNzIG9mIGFsbCBNeXRoaXggVUkgY29tcG9uZW50cy4gSXQgaW5oZXJpdHNcbiAqICAgZnJvbSBIVE1MRWxlbWVudCwgYW5kIHNvIHdpbGwgZW5kIHVwIGJlaW5nIGEgW1dlYiBDb21wb25lbnRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfQ29tcG9uZW50cykuXG4gKlxuICogICBJdCBpcyBzdHJvbmdseSByZWNvbW1lbmRlZCB0aGF0IHlvdSBmdWxseSByZWFkIHVwIGFuZCB1bmRlcnN0YW5kXG4gKiAgIFtXZWIgQ29tcG9uZW50c10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYl9Db21wb25lbnRzKVxuICogICBpZiB5b3UgZG9uJ3QgYWxyZWFkeSBmdWxseSB1bmRlcnN0YW5kIHRoZW0uIFRoZSBjb3JlIG9mIE15dGhpeCBVSSBpcyB0aGVcbiAqICAgW1dlYiBDb21wb25lbnRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJfQ29tcG9uZW50cykgc3RhbmRhcmQsXG4gKiAgIHNvIHlvdSBtaWdodCBlbmQgdXAgYSBsaXR0bGUgY29uZnVzZWQgaWYgeW91IGRvbid0IGFscmVhZHkgdW5kZXJzdGFuZCB0aGUgZm91bmRhdGlvbi5cbiAqXG4gKiBwcm9wZXJ0aWVzOlxuICogICAtIGNhcHRpb246IFwiLi4uIEhUTUxFbGVtZW50IEluc3RhbmNlIFByb3BlcnRpZXNcIlxuICogICAgIGRlc2M6IFwiQWxsIFtIVE1MRWxlbWVudCBJbnN0YW5jZSBQcm9wZXJ0aWVzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQjaW5zdGFuY2VfcHJvcGVydGllcykgYXJlIGluaGVyaXRlZCBmcm9tIFtIVE1MRWxlbWVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50KVwiXG4gKiAgICAgbGluazogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50I2luc3RhbmNlX3Byb3BlcnRpZXNcbiAqXG4gKiAgIC0gbmFtZTogaXNNeXRoaXhDb21wb25lbnRcbiAqICAgICBkYXRhVHlwZTogYm9vbGVhblxuICogICAgIGNhcHRpb246IFwiW3N0YXRpYyBNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF1cIlxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIElzIGB0cnVlYCBmb3IgTXl0aGl4IFVJIGNvbXBvbmVudHMuXG4gKiAgIC0gbmFtZTogc2Vuc2l0aXZlVGFnTmFtZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBjYXB0aW9uOiBzZW5zaXRpdmVUYWdOYW1lXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgV29ya3MgaWRlbnRpY2FsbHkgdG8gW0VsZW1lbnQudGFnTmFtZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvdGFnTmFtZSkgZm9yIFhNTCwgd2hlcmUgY2FzZSBpcyBwcmVzZXJ2ZWQuXG4gKiAgICAgICBJbiBIVE1MIHRoaXMgd29ya3MgbGlrZSBbRWxlbWVudC50YWdOYW1lXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC90YWdOYW1lKSwgYnV0IGluc3RlYWQgb2YgdGhlIHJlc3VsdFxuICogICAgICAgYWx3YXlzIGJlaW5nIFVQUEVSQ0FTRSwgdGhlIHRhZyBuYW1lIHdpbGwgYmUgcmV0dXJuZWQgd2l0aCB0aGUgY2FzaW5nIHByZXNlcnZlZC5cbiAqICAgLSBuYW1lOiB0ZW1wbGF0ZUlEXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGNhcHRpb246IHRlbXBsYXRlSURcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGlzIGlzIGEgY29udmVuaWVuY2UgcHJvcGVydHkgdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZiBgdGhpcy5jb25zdHJ1Y3Rvci5URU1QTEFURV9JRGBcbiAqICAgLSBuYW1lOiBkZWxheVRpbWVyc1xuICogICAgIGRhdGFUeXBlOiBcIk1hcCZsdDtzdHJpbmcsIFByb21pc2UmZ3Q7XCJcbiAqICAgICBjYXB0aW9uOiBkZWxheVRpbWVyc1xuICogICAgIGRlc2M6IHxcbiAqICAgICAgIEEgTWFwIGluc3RhbmNlIHRoYXRcbiAqICAgICAgIHJldGFpbnMgYHNldFRpbWVvdXRgIGlkcyBzbyB0aGF0IEBzZWUgTXl0aGl4VUlDb21wb25lbnQuZGVib3VuY2U7IGNhbiBwcm9wZXJseSBmdW5jdGlvbi4gS2V5cyBhcmUgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5kZWJvdW5jZTtcbiAqICAgICAgIHRpbWVyIGlkcyAob2YgdHlwZSBgc3RyaW5nYCkuIFZhbHVlcyBhcmUgUHJvbWlzZSBpbnN0YW5jZXMuXG4gKiAgICAgICBFYWNoIHByb21pc2UgaW5zdGFuY2UgYWxzbyBoYXMgYSBzcGVjaWFsIGtleSBgdGltZXJJRGAgdGhhdCBjb250YWlucyBhIGBzZXRUaW1lb3V0YCBpZCBvZiBhIGphdmFzY3JpcHQgdGltZXIuXG4gKiAgICAgbm90ZXM6XG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOndhcm5pbmc6IFVzZSBhdCB5b3VyIG93biByaXNrLiBUaGlzIGlzIE15dGhpeCBVSSBpbnRlcm5hbCBjb2RlIHRoYXQgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG4gKiAgICAgICAtIHxcbiAqICAgICAgICAgOmV5ZTogQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5kZWJvdW5jZTtcbiAqICAgLSBuYW1lOiBzaGFkb3dcbiAqICAgICBkYXRhVHlwZTogXCJbU2hhZG93Um9vdF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1NoYWRvd1Jvb3QpXCJcbiAqICAgICBjYXB0aW9uOiBzaGFkb3dcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgc2hhZG93IHJvb3Qgb2YgdGhpcyBjb21wb25lbnQgKG9yIGBudWxsYCBpZiBub25lKS5cbiAqICAgICBub3RlczpcbiAqICAgICAgIC0gVGhpcyBpcyB0aGUgY2FjaGVkIHJlc3VsdCBvZiBjYWxsaW5nIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuY3JlYXRlU2hhZG93RE9NOyB3aGVuXG4gKiAgICAgICAgIHRoZSBjb21wb25lbnQgaXMgZmlyc3QgaW5pdGlhbGl6ZWQuXG4gKiAgIC0gbmFtZTogdGVtcGxhdGVcbiAqICAgICBkYXRhVHlwZTogXCJbdGVtcGxhdGUgZWxlbWVudF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3RlbXBsYXRlKVwiXG4gKiAgICAgY2FwdGlvbjogdGVtcGxhdGVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgW3RlbXBsYXRlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvdGVtcGxhdGUpIGVsZW1lbnQgZm9yIHRoaXNcbiAqICAgICAgIGNvbXBvbmVudCwgb3IgYG51bGxgIGlmIHRoZXJlIGlzIG5vIHRlbXBsYXRlIGZvdW5kIGZvciB0aGUgY29tcG9uZW50LlxuICogICAgIG5vdGVzOlxuICogICAgICAgLSBUaGlzIGlzIHRoZSBjYWNoZWQgcmVzdWx0IG9mIGNhbGxpbmcgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5nZXRDb21wb25lbnRUZW1wbGF0ZTsgd2hlblxuICogICAgICAgICB0aGUgY29tcG9uZW50IGlzIGZpcnN0IGluaXRpYWxpemVkLlxuKioqL1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlDb21wb25lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIHN0YXRpYyBpc015dGhpeENvbXBvbmVudCA9IGlzTXl0aGl4Q29tcG9uZW50O1xuXG4gIHN0YXRpYyBbU3ltYm9sLmhhc0luc3RhbmNlXShpbnN0YW5jZSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGluc3RhbmNlICYmIGluc3RhbmNlW01ZVEhJWF9UWVBFXSA9PT0gTVlUSElYX1VJX0NPTVBPTkVOVF9UWVBFKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhdGljIGNvbXBpbGVTdHlsZUZvckRvY3VtZW50ID0gY29tcGlsZVN0eWxlRm9yRG9jdW1lbnQ7XG4gIHN0YXRpYyByZWdpc3RlciA9IGZ1bmN0aW9uKF9uYW1lLCBfS2xhc3MpIHtcbiAgICBsZXQgbmFtZSA9IF9uYW1lIHx8IHRoaXMudGFnTmFtZSB8fCBCYXNlVXRpbHMudG9LZWJhYkNhc2UodGhpcy5uYW1lKTtcblxuICAgIGlmICghY3VzdG9tRWxlbWVudHMuZ2V0KG5hbWUpKSB7XG4gICAgICBsZXQgS2xhc3MgPSBfS2xhc3MgfHwgdGhpcztcblxuICAgICAgbGV0IG9ic2VydmVkQXR0cmlidXRlcyA9IEFycmF5LmZyb20oXG4gICAgICAgIG5ldyBTZXQoXG4gICAgICAgICAgKEtsYXNzLm9ic2VydmVkQXR0cmlidXRlcyB8fCBbXSkuY29uY2F0KEtsYXNzLmNvbXBpbGVBdHRyaWJ1dGVNZXRob2RzKEtsYXNzKSksXG4gICAgICAgICksXG4gICAgICApO1xuXG4gICAgICBpZiAob2JzZXJ2ZWRBdHRyaWJ1dGVzLmxlbmd0aCA+IDApXG4gICAgICAgIEtsYXNzLm9ic2VydmVkQXR0cmlidXRlcyA9IG9ic2VydmVkQXR0cmlidXRlcztcblxuICAgICAgY3VzdG9tRWxlbWVudHMuZGVmaW5lKG5hbWUsIEtsYXNzKTtcblxuICAgICAgbGV0IHJlZ2lzdGVyRXZlbnQgPSBuZXcgRXZlbnQoJ215dGhpeC1jb21wb25lbnQtcmVnaXN0ZXJlZCcpO1xuICAgICAgcmVnaXN0ZXJFdmVudC5jb21wb25lbnROYW1lID0gbmFtZTtcbiAgICAgIHJlZ2lzdGVyRXZlbnQuY29tcG9uZW50ID0gS2xhc3M7XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKVxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHJlZ2lzdGVyRXZlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHN0YXRpYyBjb21waWxlQXR0cmlidXRlTWV0aG9kcyA9IGZ1bmN0aW9uKEtsYXNzKSB7XG4gICAgY29uc3Qgc2V0dXBBdHRyaWJ1dGVIYW5kbGVycyA9ICh7IHByb3BlcnR5TmFtZSwgYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxOYW1lIH0pID0+IHtcbiAgICAgIGlmIChSRUdJU1RFUkVEX0NPTVBPTkVOVFMuaGFzKEtsYXNzKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBsZXQgeyBkZXNjcmlwdG9yIH0gPSBVdGlscy5nZXREZXNjcmlwdG9yRnJvbVByb3RvdHlwZUNoYWluKHByb3RvLCBvcmlnaW5hbE5hbWUpO1xuICAgICAgaWYgKCFkZXNjcmlwdG9yKVxuICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gcmVtb3ZlIHRoaXMgZnJvbVxuICAgICAgLy8gdGhlIHByb3RvdHlwZSwgYXMgY2hpbGQgY2xhc3NlcyB3aWxsXG4gICAgICAvLyB3YW50IHRvIGluaGVyaXQgYXR0cmlidXRlIGJlaGF2aW9yLlxuICAgICAgLy8gZGVsZXRlIHByb3RvdHlwZVtvcmlnaW5hbE5hbWVdO1xuXG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgXCJ2YWx1ZVwiIHRoZW4gdGhlIHVzZXIgZGlkIGl0IHdyb25nLi4uXG4gICAgICAvLyBzbyBqdXN0IG1ha2UgaXQgdGhlIFwic2V0dGVyXCJcbiAgICAgIGxldCBzZXR0ZXIgICAgPSBkZXNjcmlwdG9yLnNldCB8fCBkZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgbGV0IGdldHRlciAgICA9IGRlc2NyaXB0b3IuZ2V0O1xuICAgICAgbGV0IGhhc1NldHRlciA9ICh0eXBlb2Ygc2V0dGVyID09PSAnZnVuY3Rpb24nKTtcbiAgICAgIGxldCBoYXNHZXR0ZXIgPSAodHlwZW9mIGdldHRlciA9PT0gJ2Z1bmN0aW9uJyk7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHByb3RvLCB7XG4gICAgICAgIFtwcm9wZXJ0eU5hbWVdOiB7XG4gICAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0OiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAoaGFzR2V0dGVyKSA/IGdldHRlci5jYWxsKHRoaXMpIDogdGhpcy5hdHRyKGF0dHJpYnV0ZU5hbWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiAgICAgICAgICBmdW5jdGlvbihbIG5ld1ZhbHVlLCBvbGRWYWx1ZSBdKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHIoYXR0cmlidXRlTmFtZSwgbmV3VmFsdWUpO1xuXG4gICAgICAgICAgICBpZiAoaGFzU2V0dGVyKVxuICAgICAgICAgICAgICBzZXR0ZXIuY2FsbCh0aGlzLCBbIG5ld1ZhbHVlLCBvbGRWYWx1ZSBdKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGxldCBwcm90byAgICAgICAgICAgPSBLbGFzcy5wcm90b3R5cGU7XG4gICAgbGV0IGF0dHJpYnV0ZU5hbWVzICA9IFV0aWxzLmdldEFsbFByb3BlcnR5TmFtZXMocHJvdG8pXG4gICAgICAuZmlsdGVyKChuYW1lKSA9PiBJU19BVFRSX01FVEhPRF9OQU1FLnRlc3QobmFtZSkpXG4gICAgICAubWFwKChvcmlnaW5hbE5hbWUpID0+IHtcbiAgICAgICAgbGV0IHByb3BlcnR5TmFtZSAgPSBvcmlnaW5hbE5hbWUubWF0Y2goSVNfQVRUUl9NRVRIT0RfTkFNRSlbMV07XG4gICAgICAgIGxldCBhdHRyaWJ1dGVOYW1lID0gQmFzZVV0aWxzLnRvS2ViYWJDYXNlKHByb3BlcnR5TmFtZSk7XG5cbiAgICAgICAgc2V0dXBBdHRyaWJ1dGVIYW5kbGVycyh7IHByb3BlcnR5TmFtZSwgYXR0cmlidXRlTmFtZSwgb3JpZ2luYWxOYW1lIH0pO1xuXG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lO1xuICAgICAgfSk7XG5cbiAgICBSRUdJU1RFUkVEX0NPTVBPTkVOVFMuYWRkKEtsYXNzKTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXR0cmlidXRlTmFtZXMpKTtcbiAgfTtcblxuICBzZXQgYXR0ciRkYXRhTXl0aGl4U3JjKFsgbmV3VmFsdWUsIG9sZFZhbHVlIF0pIHtcbiAgICB0aGlzLmF3YWl0RmV0Y2hTcmNPblZpc2libGUobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIENhbGxlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWRkZWQgdG8gdGhlIERPTS5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogbXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRhdGFUeXBlczogTXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIE11dGF0aW9uUmVjb3JkIGluc3RhbmNlIHRoYXQgdGhhdCBjYXVzZWQgdGhpcyBtZXRob2QgdG8gYmUgY2FsbGVkLlxuICAgKi9cbiAgb25NdXRhdGlvbkFkZGVkKCkge31cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBDYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIHJlbW92ZWQgZnJvbSB0aGUgRE9NLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBtdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGF0YVR5cGVzOiBNdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgTXV0YXRpb25SZWNvcmQgaW5zdGFuY2UgdGhhdCB0aGF0IGNhdXNlZCB0aGlzIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gICAqL1xuICBvbk11dGF0aW9uUmVtb3ZlZCgpIHt9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQ2FsbGVkIHdoZW4gYW4gZWxlbWVudCBpcyBhZGRlZCBhcyBhIGNoaWxkLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBub2RlXG4gICAqICAgICBkYXRhVHlwZXM6IEVsZW1lbnRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIGNoaWxkIGVsZW1lbnQgYmVpbmcgYWRkZWQuXG4gICAqICAgLSBuYW1lOiBtdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGF0YVR5cGVzOiBNdXRhdGlvblJlY29yZFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgTXV0YXRpb25SZWNvcmQgaW5zdGFuY2UgdGhhdCB0aGF0IGNhdXNlZCB0aGlzIG1ldGhvZCB0byBiZSBjYWxsZWQuXG4gICAqL1xuICBvbk11dGF0aW9uQ2hpbGRBZGRlZCgpIHt9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQ2FsbGVkIHdoZW4gYSBjaGlsZCBlbGVtZW50IGlzIHJlbW92ZWQuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG5vZGVcbiAgICogICAgIGRhdGFUeXBlczogRWxlbWVudFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgY2hpbGQgZWxlbWVudCBiZWluZyByZW1vdmVkLlxuICAgKiAgIC0gbmFtZTogbXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRhdGFUeXBlczogTXV0YXRpb25SZWNvcmRcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgVGhlIE11dGF0aW9uUmVjb3JkIGluc3RhbmNlIHRoYXQgdGhhdCBjYXVzZWQgdGhpcyBtZXRob2QgdG8gYmUgY2FsbGVkLlxuICAgKi9cbiAgb25NdXRhdGlvbkNoaWxkUmVtb3ZlZCgpIHt9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIFtNWVRISVhfVFlQRV06IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgTVlUSElYX1VJX0NPTVBPTkVOVF9UWVBFLFxuICAgICAgfSxcbiAgICAgIFtpc015dGhpeENvbXBvbmVudF06IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudFxuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIGlzTXl0aGl4Q29tcG9uZW50LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIFV0aWxzLmJpbmRNZXRob2RzLmNhbGwodGhpcywgdGhpcy5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgLyosIFsgSFRNTEVsZW1lbnQucHJvdG90eXBlIF0qLyk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAnc2Vuc2l0aXZlVGFnTmFtZSc6IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5zZW5zaXRpdmVUYWdOYW1lXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAgICAgICAgICAoKSA9PiAoKHRoaXMucHJlZml4KSA/IGAke3RoaXMucHJlZml4fToke3RoaXMubG9jYWxOYW1lfWAgOiB0aGlzLmxvY2FsTmFtZSksXG4gICAgICB9LFxuICAgICAgJ3RlbXBsYXRlSUQnOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQudGVtcGxhdGVJRFxuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5URU1QTEFURV9JRCxcbiAgICAgIH0sXG4gICAgICAnZGVsYXlUaW1lcnMnOiB7IC8vIEByZWY6TXl0aGl4VUlDb21wb25lbnQuZGVsYXlUaW1lcnNcbiAgICAgICAgd3JpdGFibGU6ICAgICBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG5ldyBNYXAoKSxcbiAgICAgIH0sXG4gICAgICAnZG9jdW1lbnRJbml0aWFsaXplZCc6IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5kb2N1bWVudEluaXRpYWxpemVkXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiAgICAgICAgICAoKSA9PiBVdGlscy5tZXRhZGF0YSh0aGlzLmNvbnN0cnVjdG9yLCBNWVRISVhfRE9DVU1FTlRfSU5JVElBTElaRUQpLFxuICAgICAgICBzZXQ6ICAgICAgICAgICh2YWx1ZSkgPT4ge1xuICAgICAgICAgIFV0aWxzLm1ldGFkYXRhKHRoaXMuY29uc3RydWN0b3IsIE1ZVEhJWF9ET0NVTUVOVF9JTklUSUFMSVpFRCwgISF2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgJ3NoYWRvdyc6IHsgLy8gQHJlZjpNeXRoaXhVSUNvbXBvbmVudC5zaGFkb3dcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgdGhpcy5jcmVhdGVTaGFkb3dET00oKSxcbiAgICAgIH0sXG4gICAgICAndGVtcGxhdGUnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50VGVtcGxhdGUoKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBBIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgZ2V0dGluZyBhbmQgc2V0dGluZyBhdHRyaWJ1dGVzLiBJZiBvbmx5IG9uZSBhcmd1bWVudCBpcyBwcm92aWRlZFxuICAgKiAgIHRvIHRoaXMgbWV0aG9kLCB0aGVuIGl0IHdpbGwgYWN0IGFzIGEgZ2V0dGVyLCBnZXR0aW5nIHRoZSBhdHRyaWJ1dGUgc3BlY2lmaWVkIGJ5IG5hbWUuXG4gICAqXG4gICAqICAgSWYgaG93ZXZlciB0d28gb3IgbW9yZSBhcmd1bWVudHMgYXJlIHByb3ZpZGVkLCB0aGVuIHRoaXMgaXMgYW4gYXR0cmlidXRlIHNldHRlci5cbiAgICpcbiAgICogICBJZiB0aGUgcHJvdmlkZWQgdmFsdWUgaXMgYHVuZGVmaW5lZGAsIGBudWxsYCwgb3IgYGZhbHNlYCwgdGhlbiB0aGUgYXR0cmlidXRlIHdpbGwgYmVcbiAgICogICByZW1vdmVkLlxuICAgKlxuICAgKiAgIElmIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBgdHJ1ZWAsIHRoZW4gdGhlIGF0dHJpYnV0ZSdzIHZhbHVlIHdpbGwgYmUgc2V0IHRvIGFuIGVtcHR5IHN0cmluZyBgJydgLlxuICAgKlxuICAgKiAgIEFueSBvdGhlciB2YWx1ZSBpcyBjb252ZXJ0ZWQgdG8gYSBzdHJpbmcgYW5kIHNldCBhcyB0aGUgYXR0cmlidXRlJ3MgdmFsdWUuXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IG5hbWVcbiAgICogICAgIGRhdGFUeXBlczogc3RyaW5nXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgdG8gb3BlcmF0ZSBvbi5cbiAgICogICAtIG5hbWU6IHZhbHVlXG4gICAqICAgICBkYXRhVHlwZXM6IGFueVxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBJZiBgdW5kZWZpbmVkYCwgYG51bGxgLCBvciBgZmFsc2VgLCByZW1vdmUgdGhlIG5hbWVkIGF0dHJpYnV0ZS5cbiAgICogICAgICAgSWYgYHRydWVgLCBzZXQgdGhlIG5hbWVkIGF0dHJpYnV0ZSdzIHZhbHVlIHRvIGFuIGVtcHR5IHN0cmluZyBgJydgLlxuICAgKiAgICAgICBGb3IgYW55IG90aGVyIHZhbHVlLCBmaXJzdCBjb252ZXJ0IGl0IGludG8gYSBzdHJpbmcsIGFuZCB0aGVuIHNldCB0aGUgbmFtZWQgYXR0cmlidXRlJ3MgdmFsdWUgdG8gdGhlIHJlc3VsdGluZyBzdHJpbmcuXG4gICAqIHJldHVybjogfFxuICAgKiAgIDEuIEB0eXBlcyBzdHJpbmc7IElmIGEgc2luZ2xlIGFyZ3VtZW50IGlzIHByb3ZpZGVkLCB0aGVuIHJldHVybiB0aGUgdmFsdWUgb2YgdGhlIHNwZWNpZmllZCBuYW1lZCBhdHRyaWJ1dGUuXG4gICAqICAgMi4gQHR5cGVzIHRoaXM7IElmIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQsIHRoZW4gc2V0IHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlIHRvIHRoZSBzcGVjaWZpZWQgdmFsdWUsXG4gICAqICAgICAgYW5kIHJldHVybiBgdGhpc2AgKHRvIGFsbG93IGZvciBjaGFpbmluZykuXG4gICAqL1xuICBhdHRyKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PT0gZmFsc2UpXG4gICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgZWxzZVxuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCAodmFsdWUgPT09IHRydWUpID8gJycgOiAoJycgKyB2YWx1ZSkpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUobmFtZSk7XG4gIH1cblxuICBpMThuKHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGxldCBsYW5ndWFnZVByb3ZpZGVyID0gVXRpbHMuc3BlY2lhbENsb3Nlc3QodGhpcywgJ215dGhpeC1sYW5ndWFnZS1wcm92aWRlcicpO1xuICAgIGlmICghbGFuZ3VhZ2VQcm92aWRlcilcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgICByZXR1cm4gbGFuZ3VhZ2VQcm92aWRlci5pMThuKHBhdGgsIGRlZmF1bHRWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBJbmplY3QgYSBuZXcgc3R5bGUgc2hlZXQgdmlhIGEgYDxzdHlsZT5gIGVsZW1lbnQgZHluYW1pY2FsbHkgYXQgcnVuLXRpbWUuXG4gICAqXG4gICAqICAgVGhpcyBtZXRob2QgYWxsb3dzIHRoZSBjYWxsZXIgdG8gaW5qZWN0IGR5bmFtaWMgc3R5bGVzIGF0IHJ1bi10aW1lLlxuICAgKiAgIEl0IHdpbGwgb25seSBpbmplY3QgdGhlIHN0eWxlcyBvbmNlLCBubyBtYXR0ZXIgaG93IG1hbnkgdGltZXMgdGhlXG4gICAqICAgbWV0aG9kIGlzIGNhbGxlZC0tYXMgbG9uZyBhcyB0aGUgc3R5bGUgY29udGVudCBpdHNlbGYgZG9lc24ndCBjaGFuZ2UuXG4gICAqXG4gICAqICAgVGhlIGNvbnRlbnQgaXMgaGFzaGVkIHZpYSBTSEEyNTYsIGFuZCB0aGUgaGFzaCBpcyB1c2VkIGFzIHRoZSBzdHlsZSBzaGVldCBpZC4gVGhpc1xuICAgKiAgIGFsbG93cyB5b3UgdG8gY2FsbCB0aGUgbWV0aG9kIGluc2lkZSBhIGNvbXBvbmVudCdzIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubW91bnRlZDtcbiAgICogICBtZXRob2QsIHdpdGhvdXQgbmVlZGluZyB0byB3b3JyeSBhYm91dCBkdXBsaWNhdGluZyB0aGUgc3R5bGVzIG92ZXIgYW5kIG92ZXIgYWdhaW4uXG4gICAqIGFyZ3VtZW50czpcbiAgICogICAtIG5hbWU6IGNvbnRlbnRcbiAgICogICAgIGRhdGFUeXBlczogc3RyaW5nXG4gICAqICAgICBkZXNjOiB8XG4gICAqICAgICAgIFRoZSBDU1Mgc3R5bGVzaGVldCBjb250ZW50IHRvIGluamVjdCBpbnRvIGEgYDxzdHlsZT5gIGVsZW1lbnQuIFRoaXMgY29udGVudCBpc1xuICAgKiAgICAgICB1c2VkIHRvIGdlbmVyYXRlIGFuIGBpZGAgZm9yIHRoZSBgPHN0eWxlPmAgZWxlbWVudCwgc28gdGhhdCBpdCBvbmx5IGdldHMgYWRkZWRcbiAgICogICAgICAgdG8gdGhlIGBkb2N1bWVudGAgb25jZS5cbiAgICogICAtIG5hbWU6IG1lZGlhXG4gICAqICAgICBkYXRhVHlwZXM6IHN0cmluZ1xuICAgKiAgICAgZGVmYXVsdDogXCInc2NyZWVuJ1wiXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBXaGF0IHRvIHNldCB0aGUgYG1lZGlhYCBhdHRyaWJ1dGUgb2YgdGhlIGNyZWF0ZWQgYDxzdHlsZT5gIGVsZW1lbnQgdG8uIERlZmF1bHRzXG4gICAqICAgICAgIHRvIGAnc2NyZWVuJ2AuXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgOndhcm5pbmc6IEl0IGlzIG9mdGVuIGJldHRlciB0byBzaW1wbHkgYWRkIGEgYDxzdHlsZT5gIGVsZW1lbnQgdG8geW91ciBjb21wb25lbnQncyBIVE1MIHRlbXBsYXRlLlxuICAgKiAgICAgSG93ZXZlciwgc29tZXRpbWVzIHRydWx5IGR5bmFtaWMgc3R5bGVzIGFyZSBuZWVkZWQsIHdoZXJlIHRoZSBjb250ZW50IHdvbid0IGJlIGtub3duXG4gICAqICAgICB1bnRpbCBydW50aW1lLiBUaGlzIGlzIHRoZSBwcm9wZXIgdXNlIGNhc2UgZm9yIHRoaXMgbWV0aG9kLlxuICAgKiAgIC0gfFxuICAgKiAgICAgOndhcm5pbmc6IFBsZWFzZSBlZHVjYXRlZCB5b3Vyc2VsZiAodW5saWtlIHBlb3BsZSB3aG8gbG92ZSBSZWFjdCkgYW5kIGRvIG5vdCBvdmVydXNlIGR5bmFtaWMgb3IgaW5saW5lIHN0eWxlcy5cbiAgICogICAgIFdoaWxlIHRoZSByZXN1bHQgb2YgdGhpcyBtZXRob2QgaXMgY2VydGFpbmx5IGEgc3RlcCBhYm92ZSBpbmxpbmUgc3R5bGVzLCB0aGlzIG1ldGhvZCBoYXNcbiAgICogICAgIFtncmVhdCBwb3RlbnRpYWwgdG8gY2F1c2UgaGFybV0oaHR0cHM6Ly93b3JsZG9mZGV2LmluZm8vNi1yZWFzb25zLXdoeS15b3Utc2hvdWxkbnQtc3R5bGUtaW5saW5lLylcbiAgICogICAgIGFuZCBzcHJlYWQgeW91ciBvd24gaWdub3JhbmNlIHRvIG90aGVycy4gVXNlIHdpdGggKipDQVJFKiohXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBFbGVtZW50OyBUaGUgYDxzdHlsZT5gIGVsZW1lbnQgZm9yIHRoZSBzcGVjaWZpZWQgc3R5bGUuXG4gICAqIGV4YW1wbGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgYGBgamF2YXNjcmlwdFxuICAgKiAgICAgaW1wb3J0IHsgTXl0aGl4VUlDb21wb25lbnQgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO1xuICAgKlxuICAgKiAgICAgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gICAqICAgICAgIHN0YXRpYyB0YWdOYW1lID0gJ215LWNvbXBvbmVudCc7XG4gICAqXG4gICAqICAgICAgIC8vIC4uLlxuICAgKlxuICAgKiAgICAgICBtb3VudGVkKCkge1xuICAgKiAgICAgICAgIGxldCB7IHNpZGViYXJXaWR0aCB9ID0gdGhpcy5sb2FkVXNlclByZWZlcmVuY2VzKCk7XG4gICAqICAgICAgICAgdGhpcy5pbmplY3RTdHlsZVNoZWV0KGBuYXYuc2lkZWJhciB7IHdpZHRoOiAke3NpZGViYXJXaWR0aH1weDsgfWAsICdzY3JlZW4nKTtcbiAgICogICAgICAgfVxuICAgKiAgICAgfVxuICAgKlxuICAgKiAgICAgTXlDb21wb25lbnQucmVnaXN0ZXIoKTtcbiAgICogICAgIGBgYFxuICAgKi9cbiAgaW5qZWN0U3R5bGVTaGVldChjb250ZW50LCBtZWRpYSA9ICdzY3JlZW4nKSB7XG4gICAgbGV0IHN0eWxlSUQgICAgICAgPSBgSURTVFlMRSR7QmFzZVV0aWxzLlNIQTI1NihgJHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9OiR7Y29udGVudH06JHttZWRpYX1gKX1gO1xuICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgIGxldCBzdHlsZUVsZW1lbnQgID0gb3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzdHlsZSMke3N0eWxlSUR9YCk7XG5cbiAgICBpZiAoc3R5bGVFbGVtZW50KVxuICAgICAgcmV0dXJuIHN0eWxlRWxlbWVudDtcblxuICAgIHN0eWxlRWxlbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLW15dGhpeC1mb3InLCB0aGlzLnNlbnNpdGl2ZVRhZ05hbWUpO1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgc3R5bGVJRCk7XG4gICAgaWYgKG1lZGlhKVxuICAgICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnbWVkaWEnLCBtZWRpYSk7XG5cbiAgICBzdHlsZUVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgIHJldHVybiBzdHlsZUVsZW1lbnQ7XG4gIH1cblxuICBwcm9jZXNzRWxlbWVudHMobm9kZSwgX29wdGlvbnMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IF9vcHRpb25zIHx8IHt9O1xuICAgIGlmICghb3B0aW9ucy5zY29wZSlcbiAgICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMsIHNjb3BlOiB0aGlzLiQkIH07XG5cbiAgICByZXR1cm4gRWxlbWVudHMucHJvY2Vzc0VsZW1lbnRzKG5vZGUsIG9wdGlvbnMpO1xuICB9XG5cbiAgZ2V0Q2hpbGRyZW5Bc0ZyYWdtZW50KG5vRW1wdHlSZXN1bHQpIHtcbiAgICBsZXQgaGFzQ29udGVudCAgICA9IGZhbHNlO1xuICAgIGxldCBvd25lckRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgIGxldCB0ZW1wbGF0ZSAgICAgID0gb3duZXJEb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgICBpZiAoIXRoaXMuY2hpbGROb2Rlcy5sZW5ndGgpXG4gICAgICByZXR1cm4gKG5vRW1wdHlSZXN1bHQpID8gdW5kZWZpbmVkIDogdGVtcGxhdGU7XG5cbiAgICB3aGlsZSAodGhpcy5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgbGV0IG5vZGUgPSB0aGlzLmNoaWxkTm9kZXNbMF07XG4gICAgICBpZiAoIShub2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBCYXNlVXRpbHMuaXNOT0Uobm9kZS5ub2RlVmFsdWUpKSlcbiAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgIHRlbXBsYXRlLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgIH1cblxuICAgIGlmIChub0VtcHR5UmVzdWx0ICYmICFoYXNDb250ZW50KVxuICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgR2V0IHRoZSBwYXJlbnQgTm9kZSBvZiB0aGlzIGVsZW1lbnQuXG4gICAqXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gfFxuICAgKiAgICAgOndhcm5pbmc6IFVubGlrZSBbTm9kZS5wYXJlbnROb2RlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9wYXJlbnROb2RlKSwgdGhpc1xuICAgKiAgICAgd2lsbCBhbHNvIHNlYXJjaCBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzLlxuICAgKiAgIC0gfFxuICAgKiAgICAgOndhcm5pbmc6ICoqU2VhcmNoaW5nIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMgb25seSB3b3JrcyBmb3IgTXl0aGl4IFVJIGNvbXBvbmVudHMhKipcbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBTZWFyY2hpbmcgYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcyBpcyBhY2NvbXBsaXNoZWQgdmlhIGxldmVyYWdpbmcgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tZXRhZGF0YTsgZm9yXG4gICAqICAgICBgdGhpc2AgY29tcG9uZW50LiBXaGVuIGEgYG51bGxgIHBhcmVudCBpcyBlbmNvdW50ZXJlZCwgYGdldFBhcmVudE5vZGVgIHdpbGwgbG9vayBmb3IgQHNlZSBNeXRoaXhVSUNvbXBvbmVudC5tZXRhZGF0YT9jYXB0aW9uPW1ldGFkYXRhOyBrZXkgQHNlZSBDb25zdGFudHMuTVlUSElYX1NIQURPV19QQVJFTlQ7XG4gICAqICAgICBvbiBgdGhpc2AuIElmIGZvdW5kLCB0aGUgcmVzdWx0IGlzIGNvbnNpZGVyZWQgdGhlIFtwYXJlbnQgTm9kZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL05vZGUvcGFyZW50Tm9kZSkgb2YgYHRoaXNgIGNvbXBvbmVudC5cbiAgICogICAtIHxcbiAgICogICAgIDpleWU6IFRoaXMgaXMganVzdCBhIHdyYXBwZXIgZm9yIEBzZWUgVXRpbHMuZ2V0UGFyZW50Tm9kZTsuXG4gICAqXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBOb2RlOyBUaGUgcGFyZW50IG5vZGUsIGlmIHRoZXJlIGlzIGFueSwgb3IgYG51bGxgIG90aGVyd2lzZS5cbiAgICovXG4gIGdldFBhcmVudE5vZGUoKSB7XG4gICAgcmV0dXJuIFV0aWxzLmdldFBhcmVudE5vZGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogcGFyZW50OiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBncm91cE5hbWU6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGRlc2M6IHxcbiAgICogICBUaGlzIGlzIGEgcmVwbGFjZW1lbnQgZm9yIFtFbGVtZW50LmF0dGFjaFNoYWRvd10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93KVxuICAgKiAgIHdpdGggb25lIG5vdGFibGUgZGlmZmVyZW5jZTogSXQgcnVucyBNeXRoaXggVUkgZnJhbWV3b3JrIHNwZWNpZmljIGNvZGUgYWZ0ZXIgYSBzaGFkb3cgaXMgYXR0YWNoZWQuXG4gICAqXG4gICAqICAgQ3VycmVudGx5LCB0aGUgbWV0aG9kIGNvbXBsZXRlcyB0aGUgZm9sbG93aW5nIGFjdGlvbnM6XG4gICAqICAgMS4gQ2FsbCBgc3VwZXIuYXR0YWNoU2hhZG93KG9wdGlvbnMpYCB0byBhY3R1YWxseSBhdHRhY2ggYSBTaGFkb3cgRE9NXG4gICAqICAgMi4gQXNzaWduIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsgdG8gdGhlIHJlc3VsdGluZyBgc2hhZG93YCwgdXNpbmcgdGhlIGtleSBgQ29uc3RhbnRzLk1ZVEhJWF9TSEFET1dfUEFSRU5UYCwgYW5kIHZhbHVlIG9mIGB0aGlzYC4gQHNvdXJjZVJlZiBfc2hhZG93TWV0YWRhdGFBc3NpZ25tZW50OyBUaGlzIGFsbG93cyBAc2VlIGdldFBhcmVudE5vZGU7IHRvIGxhdGVyIGZpbmQgdGhlIHBhcmVudCBvZiB0aGUgc2hhZG93LlxuICAgKiAgIDMuIGByZXR1cm4gc2hhZG93YFxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBvcHRpb25zXG4gICAqICAgICBkYXRhVHlwZXM6IG9iamVjdFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBbb3B0aW9uc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93I29wdGlvbnMpIGZvciBbRWxlbWVudC5hdHRhY2hTaGFkb3ddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdylcbiAgICogbm90ZXM6XG4gICAqICAgLSBUaGlzIGlzIGp1c3QgYSB3cmFwcGVyIGZvciBbRWxlbWVudC5hdHRhY2hTaGFkb3ddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdykgdGhhdCBleGVjdXRlc1xuICAgKiAgICAgY3VzdG9tIGZyYW1ld29yayBmdW5jdGlvbmFsaXR5IGFmdGVyIHRoZSBgc3VwZXJgIGNhbGwuXG4gICAqIHJldHVybjogfFxuICAgKiAgIEB0eXBlcyBTaGFkb3dSb290OyBUaGUgU2hhZG93Um9vdCBpbnN0YW5jZSBjcmVhdGVkIGJ5IFtFbGVtZW50LmF0dGFjaFNoYWRvd10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQvYXR0YWNoU2hhZG93KS5cbiAgICovXG4gIGF0dGFjaFNoYWRvdyhvcHRpb25zKSB7XG4gICAgLy8gQ2hlY2sgZW52aXJvbm1lbnQgc3VwcG9ydFxuICAgIGlmICh0eXBlb2Ygc3VwZXIuYXR0YWNoU2hhZG93ICE9PSAnZnVuY3Rpb24nKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IHNoYWRvdyA9IHN1cGVyLmF0dGFjaFNoYWRvdyhvcHRpb25zKTtcbiAgICBVdGlscy5tZXRhZGF0YShzaGFkb3csIE1ZVEhJWF9TSEFET1dfUEFSRU5ULCB0aGlzKTsgLy8gQHJlZjpfc2hhZG93TWV0YWRhdGFBc3NpZ25tZW50XG5cbiAgICByZXR1cm4gc2hhZG93O1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQSBzdHViIGZvciBkZXZlbG9wZXJzIHRvIGNvbnRyb2wgdGhlIFNoYWRvdyBET00gb2YgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogICBCeSBkZWZhdWx0LCB0aGlzIG1ldGhvZCB3aWxsIHNpbXBseSBjYWxsIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuYXR0YWNoU2hhZG93OyBpbiBgXCJvcGVuXCJgIGBtb2RlYC5cbiAgICpcbiAgICogICBEZXZlbG9wZXJzIGNhbiBvdmVybG9hZCB0aGlzIHRvIGRvIG5vdGhpbmcgKGhhdmUgbm8gU2hhZG93IERPTSBmb3IgYSBzcGVjaWZpYyBjb21wb25lbnQgZm9yIGV4YW1wbGUpLFxuICAgKiAgIG9yIHRvIGRvIHNvbWV0aGluZyBlbHNlLCBzdWNoIGFzIHNwZWNpZnkgdGhleSB3b3VsZCBsaWtlIHRoZWlyIGNvbXBvbmVudCB0byBiZSBpbiBgXCJjbG9zZWRcImAgYG1vZGVgLlxuICAgKlxuICAgKiAgIFRoZSByZXN1bHQgb2YgdGhpcyBtZXRob2QgaXMgYXNzaWduZWQgdG8gYHRoaXMuc2hhZG93YCBpbnNpZGUgdGhlIGBjb25zdHJ1Y3RvcmAgb2YgdGhlIGNvbXBvbmVudC5cbiAgICogYXJndW1lbnRzOlxuICAgKiAgIC0gbmFtZTogb3B0aW9uc1xuICAgKiAgICAgZGF0YVR5cGVzOiBvYmplY3RcbiAgICogICAgIGRlc2M6IHxcbiAgICogICAgICAgW29wdGlvbnNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9FbGVtZW50L2F0dGFjaFNoYWRvdyNvcHRpb25zKSBmb3IgW0VsZW1lbnQuYXR0YWNoU2hhZG93XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9hdHRhY2hTaGFkb3cpXG4gICAqIG5vdGVzOlxuICAgKiAgIC0gQWxsIHRoaXMgZG9lcyBpcyBjYWxsIGB0aGlzLmF0dGFjaFNoYWRvd2AuIEl0cyBwdXJwb3NlIGlzIGZvciB0aGUgZGV2ZWxvcGVyIHRvIGNvbnRyb2xcbiAgICogICAgIHdoYXQgaGFwcGVucyB3aXRoIHRoZSBjb21wb25lbnQncyBTaGFkb3cgRE9NLlxuICAgKiByZXR1cm46IHxcbiAgICogICBAdHlwZXMgU2hhZG93Um9vdDsgVGhlIFNoYWRvd1Jvb3QgaW5zdGFuY2UgY3JlYXRlZCBieSBAc2VlIE15dGhpeFVJQ29tcG9uZW50LmF0dGFjaFNoYWRvdzsuXG4gICAqL1xuICBjcmVhdGVTaGFkb3dET00ob3B0aW9ucykge1xuICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yLnNoYWRvdyA9PT0gZmFsc2UpXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIGxldCBzaGFkb3cgPSB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJywgLi4uKG9wdGlvbnMgfHwge30pIH0pO1xuXG4gICAgLy8gQWRvcHQgc2hhcmVkIHN0eWxlc2hlZXRzIGlmIGRlZmluZWQgb24gdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGxldCBzaGFyZWRTdHlsZXMgPSB0aGlzLmNvbnN0cnVjdG9yLnNoYXJlZFN0eWxlcztcbiAgICBpZiAoc2hhcmVkU3R5bGVzICYmIEFycmF5LmlzQXJyYXkoc2hhcmVkU3R5bGVzKSAmJiBzaGFyZWRTdHlsZXMubGVuZ3RoID4gMClcbiAgICAgIFN0eWxlU2hlZXRNYW5hZ2VyLmFkb3B0KHNoYWRvdywgc2hhcmVkU3R5bGVzKTtcblxuICAgIHJldHVybiBzaGFkb3c7XG4gIH1cblxuICBtZXJnZUNoaWxkcmVuKHRhcmdldCwgLi4ub3RoZXJzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnRzLm1lcmdlQ2hpbGRyZW4odGFyZ2V0LCAuLi5vdGhlcnMpO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50VGVtcGxhdGUobmFtZU9ySUQpIHtcbiAgICBpZiAobmFtZU9ySUQgaW5zdGFuY2VvZiBOb2RlKVxuICAgICAgcmV0dXJuIG5hbWVPcklEO1xuXG4gICAgaWYgKCF0aGlzLm93bmVyRG9jdW1lbnQpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAobmFtZU9ySUQpXG4gICAgICByZXR1cm4gRWxlbWVudHMucXVlcnlUZW1wbGF0ZSh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQsIG5hbWVPcklEKTtcblxuICAgIGlmICh0aGlzLnRlbXBsYXRlSUQpXG4gICAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGVtcGxhdGVJRCk7XG5cbiAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHRlbXBsYXRlW2RhdGEtbXl0aGl4LWNvbXBvbmVudC1uYW1lPVwiJHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9XCIgaV0sdGVtcGxhdGVbZGF0YS1mb3I9XCIke3RoaXMuc2Vuc2l0aXZlVGFnTmFtZX1cIiBpXWApO1xuICB9XG5cbiAgYXBwZW5kRXh0ZXJuYWxUb1NoYWRvd0RPTSgpIHtcbiAgICBpZiAoIXRoaXMuc2hhZG93KVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IG93bmVyRG9jdW1lbnQgPSAodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KTtcbiAgICBsZXQgZWxlbWVudHMgICAgICA9IG93bmVyRG9jdW1lbnQuaGVhZC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hdXRvLW1lcmdlXScpO1xuXG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBBcnJheS5mcm9tKGVsZW1lbnRzKSkge1xuICAgICAgbGV0IHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0by1tZXJnZScpO1xuICAgICAgaWYgKEJhc2VVdGlscy5pc05PRShzZWxlY3RvcikpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoIXRoaXMubWF0Y2hlcyhzZWxlY3RvcikpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZChlbGVtZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UHJvY2Vzc2VkVGVtcGxhdGUoX3RlbXBsYXRlKSB7XG4gICAgbGV0IHRlbXBsYXRlID0gdGhpcy5nZXRDb21wb25lbnRUZW1wbGF0ZShfdGVtcGxhdGUpIHx8IHRoaXMudGVtcGxhdGU7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybjtcblxuICAgIHJldHVybiB0aGlzLnByb2Nlc3NFbGVtZW50cygodGVtcGxhdGUuY29udGVudCkgPyB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSA6IHRlbXBsYXRlLmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cblxuICBnZXRSYXdUZW1wbGF0ZShfdGVtcGxhdGUpIHtcbiAgICBsZXQgdGVtcGxhdGUgPSB0aGlzLmdldENvbXBvbmVudFRlbXBsYXRlKF90ZW1wbGF0ZSkgfHwgdGhpcy50ZW1wbGF0ZTtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG5cbiAgYXBwZW5kVGVtcGxhdGVUbyh0YXJnZXQsIF90ZW1wbGF0ZSkge1xuICAgIGlmICghdGFyZ2V0KVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHByb2Nlc3NlZFRlbXBsYXRlID0gdGhpcy5nZXRQcm9jZXNzZWRUZW1wbGF0ZShfdGVtcGxhdGUpO1xuICAgIGlmIChwcm9jZXNzZWRUZW1wbGF0ZSkge1xuICAgICAgLy8gZW5zdXJlRG9jdW1lbnRTdHlsZXMuY2FsbCh0aGlzLCB0aGlzLm93bmVyRG9jdW1lbnQsIHRoaXMuc2Vuc2l0aXZlVGFnTmFtZSwgdGVtcGxhdGUpO1xuXG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocHJvY2Vzc2VkVGVtcGxhdGUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYXBwZW5kVGVtcGxhdGVUb1NoYWRvd0RPTShfdGVtcGxhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRUZW1wbGF0ZVRvKHRoaXMuc2hhZG93LCBfdGVtcGxhdGUpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2RhdGEtbXl0aGl4LWNvbXBvbmVudC1uYW1lJywgdGhpcy5zZW5zaXRpdmVUYWdOYW1lKTtcblxuICAgIHRoaXMuYXBwZW5kVGVtcGxhdGVUb1NoYWRvd0RPTSgpO1xuXG4gICAgdGhpcy5wcm9jZXNzRWxlbWVudHModGhpcyk7XG5cbiAgICB0cnkge1xuICAgICAgZGVidWdMb2coYENhbGxpbmcgbW91bnRlZCgpIGZvciA8JHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9PmApO1xuICAgICAgdGhpcy5tb3VudGVkKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxldCBjb250ZXh0ID0gZm9ybWF0Q29tcG9uZW50Q29udGV4dCh0aGlzLCAnbW91bnRlZCcpO1xuICAgICAgbGV0IGNvbXBvbmVudEVycm9yID0gbmV3IENvbXBvbmVudEVycm9yKFxuICAgICAgICBgRXJyb3IgaW4gbW91bnRlZCgpIGNhbGxiYWNrOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAge1xuICAgICAgICAgIC4uLmNvbnRleHQsXG4gICAgICAgICAgb3JpZ2luYWxFcnJvcjogZXJyb3IsXG4gICAgICAgICAgc3VnZ2VzdGlvbjogICAgJ0NoZWNrIHRoZSBtb3VudGVkKCkgbWV0aG9kIGltcGxlbWVudGF0aW9uIGZvciBlcnJvcnMuJyxcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmVycm9yKGNvbXBvbmVudEVycm9yLnRvU3RyaW5nKCkpO1xuICAgICAgY29uc29sZS5lcnJvcignT3JpZ2luYWwgZXJyb3I6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kRXh0ZXJuYWxUb1NoYWRvd0RPTSgpO1xuXG4gICAgdGhpcy5kb2N1bWVudEluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIEJhc2VVdGlscy5uZXh0VGljaygoKSA9PiB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ215dGhpeC1yZWFkeScpO1xuICAgIH0pO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlYnVnTG9nKGBDYWxsaW5nIHVubW91bnRlZCgpIGZvciA8JHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9PmApO1xuICAgICAgdGhpcy51bm1vdW50ZWQoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbGV0IGNvbnRleHQgPSBmb3JtYXRDb21wb25lbnRDb250ZXh0KHRoaXMsICd1bm1vdW50ZWQnKTtcbiAgICAgIGxldCBjb21wb25lbnRFcnJvciA9IG5ldyBDb21wb25lbnRFcnJvcihcbiAgICAgICAgYEVycm9yIGluIHVubW91bnRlZCgpIGNhbGxiYWNrOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAge1xuICAgICAgICAgIC4uLmNvbnRleHQsXG4gICAgICAgICAgb3JpZ2luYWxFcnJvcjogZXJyb3IsXG4gICAgICAgICAgc3VnZ2VzdGlvbjogICAgJ0NoZWNrIHRoZSB1bm1vdW50ZWQoKSBtZXRob2QgaW1wbGVtZW50YXRpb24gZm9yIGVycm9ycy4nLFxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoY29tcG9uZW50RXJyb3IudG9TdHJpbmcoKSk7XG4gICAgICBjb25zb2xlLmVycm9yKCdPcmlnaW5hbCBlcnJvcjonLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXdhaXRGZXRjaFNyY09uVmlzaWJsZShuZXdTcmMpIHtcbiAgICBpZiAodGhpcy52aXNpYmlsaXR5T2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzKTtcbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIW5ld1NyYylcbiAgICAgIHJldHVybjtcblxuICAgIGxldCBvYnNlcnZlciA9IENvbXBvbmVudFV0aWxzLnZpc2liaWxpdHlPYnNlcnZlcigoeyB3YXNWaXNpYmxlLCBkaXNjb25uZWN0IH0pID0+IHtcbiAgICAgIGlmICghd2FzVmlzaWJsZSlcbiAgICAgICAgdGhpcy5mZXRjaFNyYyh0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1teXRoaXgtc3JjJykpO1xuXG4gICAgICBkaXNjb25uZWN0KCk7XG5cbiAgICAgIHRoaXMudmlzaWJpbGl0eU9ic2VydmVyID0gbnVsbDtcbiAgICB9LCB7IGVsZW1lbnRzOiBbIHRoaXMgXSB9KTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICd2aXNpYmlsaXR5T2JzZXJ2ZXInOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG9ic2VydmVyLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayguLi5hcmdzKSB7XG4gICAgbGV0IFtcbiAgICAgIGF0dHJpYnV0ZU5hbWUsXG4gICAgICBvbGRWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlLFxuICAgIF0gPSBhcmdzO1xuXG4gICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgLy8gU2VjdXJpdHk6IGVuc3VyZSB0aGlzIGlzIGFjdHVhbGx5IGEgaGFuZGxlZCBhdHRyaWJ1dGUgY2FsbCFcbiAgICAgIC8vIFdlIHdvdWxkbid0IGp1c3Qgd2FudCB0byBzdGFydCBzZXR0aW5nIGFueXRoaW5nIG9uIHRoZSBpbnN0YW5jZVxuICAgICAgLy8gdmlhIGF0dHJpYnV0ZXMuLi4gdGhhdCBtaWdodCBiZSBiYWQsIGkuZTogPGltZyB2YWx1ZU9mPVwiXCI+XG5cbiAgICAgIGxldCBwcm9wZXJ0eU5hbWUgICAgPSBCYXNlVXRpbHMudG9DYW1lbENhc2UoYXR0cmlidXRlTmFtZSk7XG4gICAgICBsZXQgbWFnaWNOYW1lICAgICAgID0gYGF0dHIkJHtwcm9wZXJ0eU5hbWV9YDtcbiAgICAgIGxldCB7IGRlc2NyaXB0b3IgfSAgPSBVdGlscy5nZXREZXNjcmlwdG9yRnJvbVByb3RvdHlwZUNoYWluKHRoaXMsIG1hZ2ljTmFtZSk7XG4gICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAvLyBDYWxsIHNldHRlclxuICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBbIG5ld1ZhbHVlLCBvbGRWYWx1ZSBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmF0dHJpYnV0ZUNoYW5nZWQoLi4uYXJncyk7XG4gIH1cblxuICBhZG9wdGVkQ2FsbGJhY2soLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLmFkb3B0ZWQoLi4uYXJncyk7XG4gIH1cblxuICBtb3VudGVkKCkge31cbiAgdW5tb3VudGVkKCkge31cbiAgYXR0cmlidXRlQ2hhbmdlZCgpIHt9XG4gIGFkb3B0ZWQoKSB7fVxuXG4gIGdldCAkJCgpIHtcbiAgICByZXR1cm4gVXRpbHMuY3JlYXRlU2NvcGUodGhpcyk7XG4gIH1cblxuICBzZWxlY3QoLi4uYXJncykge1xuICAgIGxldCBhcmdJbmRleCAgICA9IDA7XG4gICAgbGV0IG9wdGlvbnMgICAgID0gKEJhc2VVdGlscy5pc1BsYWluT2JqZWN0KGFyZ3NbYXJnSW5kZXhdKSkgPyBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIGFyZ3NbYXJnSW5kZXgrK10pIDoge307XG4gICAgbGV0IHF1ZXJ5RW5naW5lID0gUXVlcnlFbmdpbmUuZnJvbS5jYWxsKHRoaXMsIHsgcm9vdDogdGhpcywgLi4ub3B0aW9ucywgaW52b2tlQ2FsbGJhY2tzOiBmYWxzZSB9LCAuLi5hcmdzLnNsaWNlKGFyZ0luZGV4KSk7XG4gICAgbGV0IHNoYWRvd05vZGVzO1xuXG4gICAgb3B0aW9ucyA9IHF1ZXJ5RW5naW5lLmdldE9wdGlvbnMoKTtcblxuICAgIGlmIChvcHRpb25zLnNoYWRvdyAhPT0gZmFsc2UgJiYgb3B0aW9ucy5zZWxlY3RvciAmJiBvcHRpb25zLnJvb3QgPT09IHRoaXMpIHtcbiAgICAgIHNoYWRvd05vZGVzID0gQXJyYXkuZnJvbShcbiAgICAgICAgUXVlcnlFbmdpbmUuZnJvbS5jYWxsKFxuICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgeyByb290OiB0aGlzLnNoYWRvdyB9LFxuICAgICAgICAgIG9wdGlvbnMuc2VsZWN0b3IsXG4gICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayxcbiAgICAgICAgKS52YWx1ZXMoKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHNoYWRvd05vZGVzKVxuICAgICAgcXVlcnlFbmdpbmUgPSBxdWVyeUVuZ2luZS5hZGQoc2hhZG93Tm9kZXMpO1xuXG4gICAgaWYgKG9wdGlvbnMuc2xvdHRlZCAhPT0gdHJ1ZSlcbiAgICAgIHF1ZXJ5RW5naW5lID0gcXVlcnlFbmdpbmUuc2xvdHRlZChmYWxzZSk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3QocXVlcnlFbmdpbmUubWFwKG9wdGlvbnMuY2FsbGJhY2spKTtcblxuICAgIHJldHVybiBxdWVyeUVuZ2luZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJlbnQ6IE15dGhpeFVJQ29tcG9uZW50XG4gICAqIGdyb3VwTmFtZTogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZGVzYzogfFxuICAgKiAgIFRoaXMgbWV0aG9kIHdpbGwgZHluYW1pY2FsbHkgYnVpbGQgZWxlbWVudHMsIG9yIHJhdGhlciwgQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLCB0aGF0XG4gICAqICAgZGVmaW5lIGVsZW1lbnRzIHRvIGJlIGNyZWF0ZWQgbGF0ZXIuIEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcyBhcmUganVzdCB0aGF0LCBhIHNpbXBsZVxuICAgKiAgIHN0cnVjdHVyZSB0aGF0IGRlZmluZXMgdGhlIG5hbWUsIGF0dHJpYnV0ZXMsIGFuZCBjaGlsZHJlbiBvZiBhbnkgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogICBXaGVuIHRoZXNlIGFyZSBpbnNlcnRlZCBpbnRvIGEgZG9jdW1lbnQsIGVpdGhlciB0aHJvdWdoIGEgQHNlZSBRdWVyeUVuZ2luZTssIG9yIGRpcmVjdGx5IGJ5XG4gICAqICAgY2FsbGluZyBAc2VlIEVsZW1lbnREZWZpbml0aW9uLmJ1aWxkOyBiZWZvcmUgaW5zZXJ0LCB0aGV5IGFyZSBvbmx5IGF0IHRoaXMgcG9pbnQgY29udmVydGVkXG4gICAqICAgaW50byByZWFsIFtFbGVtZW50c10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0VsZW1lbnQpIGFuZCBpbnNlcnRlZFxuICAgKiAgIGludG8gdGhlIHNwZWNpZmllZCBET00gKGRvY3VtZW50KSBhdCB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBjYWxsYmFja1xuICAgKiAgICAgZGF0YVR5cGVzOiBmdW5jdGlvblxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBBIGNhbGxiYWNrIHRoYXQgaXMgaW1tZWRpYXRlbHkgY2FsbGVkIGFuZCBleHBlY3RlZCB0byByZXR1cm4gQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzLlxuICAgKiAgICAgICBUaGUgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggb25seSB0d28gYXJndW1lbnRzLiBUaGUgZmlyc3QgYXJndW1lbnRzLCBgZWxlbWVudHNgLCBpcyBhXG4gICAqICAgICAgIEBzZWUgRWxlbWVudEdlbmVyYXRvcjsgUHJveHkgaW5zdGFuY2UsIHRoYXQgd2lsbCBwcm9wZXJseSBnZW5lcmF0ZSBhbnkgZWxlbWVudCBkZWZpbml0aW9uIHJlcXVlc3RlZC5cbiAgICogICAgICAgVGhlIHNlY29uZCBhcmd1bWVudCwgYGNvbnRleHRgLCBpcyBzaW1wbHkgYW4gZW1wdHkgb2JqZWN0IHByb3ZpZGVkIHRvIHRoZSBjYWxsYmFjaywgYWxsb3dpbmcgdGhlXG4gICAqICAgICAgIGRldmVsb3BlciB0byBzdG9yZSBjb250ZXh0dWFsIGJhc2VkIGluZm9ybWF0aW9uIGZvciB0aGUgb3BlcmF0aW9uLCBpZiBkZXNpcmVkLlxuICAgKiByZXR1cm46IHxcbiAgICogICAqIEB0eXBlcyBFbGVtZW50RGVmaW5pdGlvbjsgQSBzaW5nbGUgQHNlZSBFbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2UgZGVmaW5pbmdcbiAgICogICAgIHRoZSBET00gdG8gZ2VuZXJhdGUgd2hlbiBpbnNlcnRlZC4gQ2FuIGJlIGEgYCNmcmFnbWVudGAgZWxlbWVudCBkZWZpbml0aW9uLlxuICAgKiAgICogQHR5cGVzIEFycmF5PEVsZW1lbnREZWZpbml0aW9uPjsgQW4gYXJyYXkgb2YgZWxlbWVudCBkZWZpbml0aW9uIGluc3RhbmNlc1xuICAgKiAgICAgZGVmaW5pbmcgdGhlIERPTSB0byBnZW5lcmF0ZSB3aGVuIGluc2VydGVkLlxuICAgKiAgICogQHR5cGVzIG51bGw7IElmIG5vdGhpbmcgaXMgcmV0dXJuZWQsIHRoZW4gbm8gZWxlbWVudHMgd2lsbCBiZSBjcmVhdGVkLlxuICAgKiBub3RlczpcbiAgICogICAtIHxcbiAgICogICAgIDppbmZvOiBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoaXMgbWV0aG9kIGFuZCBAc2VlIE15dGhpeFVJQ29tcG9uZW50LiRidWlsZDsgbWV0aG9kIGlzXG4gICAqICAgICB0aGF0IHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcywgd2hlcmVhcyB0aGVcbiAgICogICAgIEBzZWUgTXl0aGl4VUlDb21wb25lbnQuJGJ1aWxkOyBtZXRob2Qgd2lsbCByZXR1cm4gYSBAc2VlIFF1ZXJ5RW5naW5lOyBpbnN0YW5jZSBjb250YWluaW5nXG4gICAqICAgICBhbGwgdGhlIGJ1aWx0IEBzZWUgRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcy5cbiAgICogZXhhbXBsZXM6XG4gICAqICAgLSB8XG4gICAqICAgICBgYGBqYXZhc2NyaXB0XG4gICAqICAgICBpbXBvcnQge1xuICAgKiAgICAgICBNeXRoaXhVSUNvbXBvbmVudCxcbiAgICogICAgICAgVXRpbHMsXG4gICAqICAgICB9IGZyb20gJ0BjZG4vbXl0aGl4LXVpLWNvcmVAMSc7IC8vIGVuc3VyZSB3ZSBsb2NrIHRoaXMgdG8gd2hhdGV2ZXIgdmVyc2lvbiBpcyBpbXBvcnRhbnQgdG8gdXNcbiAgICpcbiAgICogICAgIGV4cG9ydCBjbGFzcyBEZW1vTmF2Q29tcG9uZW50IGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICAgKiAgICAgICBzdGF0aWMgdGFnTmFtZSA9ICdkZW1vLW5hdi1jb21wb25lbnQnOyAvLyBhIFwic29tZXRoaW5nLVwiIHByZWZpeCBpcyByZXF1aXJlZFxuICAgKlxuICAgKiAgICAgICBtb3VudGVkKCkgeyAvLyBjYWxsZWQgd2hlbmV2ZXIgdGhlIGNvbXBvbmVudCBpcyBhZGRlZCB0byBhbm90aGVyIGVsZW1lbnRcbiAgICogICAgICAgICBsZXQgbGlzdCA9IFtcbiAgICogICAgICAgICAgICdUZXN0IDEnLFxuICAgKiAgICAgICAgICAgJ1Rlc3QgMicsXG4gICAqICAgICAgICAgICAnTG9yZW0gSXBzdW0nLFxuICAgKiAgICAgICAgIF07XG4gICAqXG4gICAqICAgICAgICAgLy8gRHluYW1pY2FsbHkgYnVpbGQgYW5kIGFwcGVuZCBzb21lIGVsZW1lbnRzICh3aXRoIGF0dHJpYnV0ZXMgYW5kIGV2ZW50IGJpbmRpbmdzKVxuICAgKiAgICAgICAgIGxldCB1bm9yZGVyZWRMaXN0RWxlbWVudCA9IHRoaXMuYnVpbGQoKHsgTkFWLCBVTCwgTEksICRURVhUIH0pID0+IHsgLy8gYW55IGVsZW1lbnQgbmFtZSBjYW4gYmUgcmVxdWVzdGVkIGhlcmUgKGV2ZW4gY3VzdG9tIG9uZXMpXG4gICAqICAgICAgICAgICByZXR1cm4gVUwuaWQoJ3ByaW1hcnktbGlzdCcpLmNsYXNzKCdpbnRlcmFjdGl2ZS1saXN0JykoXG4gICAqICAgICAgICAgICAgIC8vIC4uLmNoaWxkcmVuIG9mIFVMIGVsZW1lbnRcbiAgICogICAgICAgICAgICAgLi4ubGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAqICAgICAgICAgICAgICAgcmV0dXJuIExJLmNsYXNzKCdpdGVtLW5hbWUgZm9jdXNhYmxlJykuZGF0YUluZGV4KGluZGV4KS5vbkNsaWNrKHRoaXMub25JdGVtQ2xpY2spKFxuICAgKiAgICAgICAgICAgICAgICAgLy8gLi4uY2hpbGRyZW4gb2YgTEkgZWxlbWVudFxuICAgKiAgICAgICAgICAgICAgICAgJFRFWFQoaXRlbSksICAvLyBpbiB0aGlzIGNhc2UsIGEgc2luZ2xlIHRleHQgbm9kZVxuICAgKiAgICAgICAgICAgICAgICk7XG4gICAqICAgICAgICAgICAgIH0pLFxuICAgKiAgICAgICAgICAgKTtcbiAgICogICAgICAgICB9KTtcbiAgICpcbiAgICogICAgICAgICAvLyBDcmVhdGUgYW4gYXBwZW5kIGVsZW1lbnRzIHRvIHRoaXMgZWxlbWVudFxuICAgKiAgICAgICAgIHRoaXMuYXBwZW5kKFxuICAgKiAgICAgICAgICAgdW5vcmRlcmVkTGlzdEVsZW1lbnQuYnVpbGQoXG4gICAqICAgICAgICAgICAgIHRoaXMub3duZXJEb2N1bWVudCxcbiAgICogICAgICAgICAgICAgeyBzY29wZTogVXRpbHMuY3JlYXRlU2NvcGUodGhpcykgfSxcbiAgICogICAgICAgICAgICksXG4gICAqICAgICAgICAgKTtcbiAgICogICAgICAgfVxuICAgKlxuICAgKiAgICAgICAvLyBBbGwgY2xhc3MgbWV0aG9kcyBhcmUgYXV0b21hdGljYWxseSBib3VuZCB0byBcInRoaXNcIiBpbnNpZGUgdGhlIHN1cGVyLmNvbnN0cnVjdG9yXG4gICAqICAgICAgIG9uSXRlbUNsaWNrKGV2ZW50KSB7XG4gICAqICAgICAgICAgY29uc29sZS5sb2coJ0l0ZW0gQ2xpY2tlZCEnLCBldmVudC50YXJnZXQpO1xuICAgKiAgICAgICB9XG4gICAqICAgICB9XG4gICAqXG4gICAqICAgICBEZW1vTmF2Q29tcG9uZW50LnJlZ2lzdGVyKCk7XG4gICAqICAgICBgYGBcbiAgICovXG4gIGJ1aWxkKGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlc3VsdCA9IFsgY2FsbGJhY2suY2FsbCh0aGlzLCBFbGVtZW50cy5FbGVtZW50R2VuZXJhdG9yLCB7fSkgXS5mbGF0KEluZmluaXR5KS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtICYmIGl0ZW1bVU5GSU5JU0hFRF9ERUZJTklUSU9OXSlcbiAgICAgICAgcmV0dXJuIGl0ZW0oKTtcblxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gICAgcmV0dXJuIChyZXN1bHQubGVuZ3RoIDwgMikgPyByZXN1bHRbMF0gOiBuZXcgRWxlbWVudHMuRWxlbWVudERlZmluaXRpb24oJyNmcmFnbWVudCcsIHt9LCByZXN1bHQpO1xuICB9XG5cbiAgJGJ1aWxkKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIFF1ZXJ5RW5naW5lLmZyb20uY2FsbCh0aGlzLCBbIHRoaXMuYnVpbGQoY2FsbGJhY2spIF0uZmxhdChJbmZpbml0eSkpO1xuICB9XG5cbiAgaXNBdHRyaWJ1dGVUcnV0aHkobmFtZSkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUobmFtZSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgdmFsdWUgPSB0aGlzLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgICBpZiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSAndHJ1ZScpXG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldElkZW50aWZpZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtbmFtZScpIHx8IEJhc2VVdGlscy50b0NhbWVsQ2FzZSh0aGlzLnNlbnNpdGl2ZVRhZ05hbWUpO1xuICB9XG5cbiAgbWV0YWRhdGEoa2V5LCB2YWx1ZSkge1xuICAgIHJldHVybiBVdGlscy5tZXRhZGF0YSh0aGlzLCBrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGRlZmluZUR5bmFtaWNQcm9wKG5hbWUsIGRlZmF1bHRWYWx1ZSwgc2V0dGVyLCBfY29udGV4dCkge1xuICAgIHJldHVybiBVdGlscy5kZWZpbmVEeW5hbWljUHJvcC5jYWxsKF9jb250ZXh0IHx8IHRoaXMsIG5hbWUsIGRlZmF1bHRWYWx1ZSwgc2V0dGVyKTtcbiAgfVxuXG4gIGR5bmFtaWNEYXRhKG9iaikge1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICBsZXQgZGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxldCBrZXkgICA9IGtleXNbaV07XG4gICAgICBsZXQgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBVdGlscy5kZWZpbmVEeW5hbWljUHJvcC5jYWxsKGRhdGEsIGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIHBhcmVudDogTXl0aGl4VUlDb21wb25lbnRcbiAgICogZ3JvdXBOYW1lOiBNeXRoaXhVSUNvbXBvbmVudFxuICAgKiBkZXNjOiB8XG4gICAqICAgQSBzZWxmLXJlc2V0dGluZyB0aW1lb3V0LiBUaGlzIG1ldGhvZCBleHBlY3RzIGFuIGBpZGAgYXJndW1lbnQgKG9yIHdpbGwgZ2VuZXJhdGUgb25lIGZyb20gdGhlIHByb3ZpZGVkXG4gICAqICAgY2FsbGJhY2sgbWV0aG9kIGlmIG5vdCBwcm92aWRlZCkuIEl0IHVzZXMgdGhpcyBwcm92aWRlZCBgaWRgIHRvIGNyZWF0ZSBhIHRpbWVvdXQuIFRoaXMgdGltZW91dCBoYXMgYSBzcGVjaWFsIGZlYXR1cmVcbiAgICogICBob3dldmVyIHRoYXQgZGlmZmVyZW50aWF0ZXMgaXQgZnJvbSBhIG5vcm1hbCBgc2V0VGltZW91dGAgY2FsbDogaWYgeW91IGNhbGwgYHRoaXMuZGVib3VuY2VgIGFnYWluIHdpdGggdGhlXG4gICAqICAgc2FtZSBgaWRgICoqYmVmb3JlKiogdGhlIHRpbWUgcnVucyBvdXQsIHRoZW4gaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHJlc2V0IHRoZSB0aW1lci4gSW4gc2hvcnQsIG9ubHkgdGhlIGxhc3QgY2FsbFxuICAgKiAgIHRvIGB0aGlzLmRlYm91bmNlYCAoZ2l2ZW4gdGhlIHNhbWUgaWQpIHdpbGwgdGFrZSBlZmZlY3QgKHVubGVzcyB0aGUgc3BlY2lmaWVkIHRpbWVvdXQgaXMgcmVhY2hlZCBiZXR3ZWVuIGNhbGxzKS5cbiAgICogcmV0dXJuOiB8XG4gICAqICAgVGhpcyBtZXRob2QgcmV0dXJucyBhIHNwZWNpYWxpemVkIFByb21pc2UgaW5zdGFuY2UuIFRoZSBpbnN0YW5jZSBpcyBzcGVjaWFsaXplZCBiZWNhdXNlIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllc1xuICAgKiAgIGFyZSBpbmplY3RlZCBpbnRvIGl0OlxuICAgKiAgIDEuIGByZXNvbHZlKHJlc3VsdFZhbHVlKWAgLSBXaGVuIGNhbGxlZCwgcmVzb2x2ZXMgdGhlIHByb21pc2Ugd2l0aCB0aGUgZmlyc3QgcHJvdmlkZWQgYXJndW1lbnRcbiAgICogICAyLiBgcmVqZWN0KGVycm9yVmFsdWUpYCAtIFdoZW4gY2FsbGVkLCByZWplY3RzIHRoZSBwcm9taXNlIHdpdGggdGhlIGZpcnN0IHByb3ZpZGVkIGFyZ3VtZW50XG4gICAqICAgMy4gYHN0YXR1cygpYCAtIFdoZW4gY2FsbGVkLCB3aWxsIHJldHVybiB0aGUgZnVsZmlsbG1lbnQgc3RhdHVzIG9mIHRoZSBwcm9taXNlLCBhcyBhIGBzdHJpbmdgLCBvbmUgb2Y6IGBcInBlbmRpbmdcIiwgXCJmdWxmaWxsZWRcImAsIG9yIGBcInJlamVjdGVkXCJgXG4gICAqICAgNC4gYGlkPHN0cmluZz5gIC0gQSByYW5kb21seSBnZW5lcmF0ZWQgSUQgZm9yIHRoaXMgcHJvbWlzZVxuICAgKlxuICAgKiAgIFNlZSBAc2VlIEJhc2VVdGlscy5jcmVhdGVSZXNvbHZhYmxlO1xuICAgKiBhcmd1bWVudHM6XG4gICAqICAgLSBuYW1lOiBjYWxsYmFja1xuICAgKiAgICAgZGF0YVR5cGVzOiBmdW5jdGlvblxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgbWV0aG9kIHRvIGNhbGwgd2hlbiB0aGUgdGltZW91dCBoYXMgYmVlbiBtZXQuXG4gICAqICAgLSBuYW1lOiB0aW1lTVNcbiAgICogICAgIGRhdGFUeXBlczogbnVtYmVyXG4gICAqICAgICBvcHRpb25hbDogdHJ1ZVxuICAgKiAgICAgZGVmYXVsdDogMFxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBjYWxsaW5nIGBjYWxsYmFja2AuXG4gICAqICAgLSBuYW1lOiBpZFxuICAgKiAgICAgZGF0YVR5cGVzOiBzdHJpbmdcbiAgICogICAgIG9wdGlvbmFsOiB0cnVlXG4gICAqICAgICBkZWZhdWx0OiBcIm51bGxcIlxuICAgKiAgICAgZGVzYzogfFxuICAgKiAgICAgICBUaGUgaWRlbnRpZmllciBmb3IgdGhpcyBkZWJvdW5jZSB0aW1lci4gSWYgbm90IHByb3ZpZGVkLCB0aGVuIG9uZVxuICAgKiAgICAgICB3aWxsIGJlIGdlbmVyYXRlZCBmb3IgeW91IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBjYWxsYmFjay5cbiAgICogbm90ZXM6XG4gICAqICAgLSBUaG91Z2ggbm90IHJlcXVpcmVkLCBpdCBpcyBmYXN0ZXIgYW5kIGxlc3MgcHJvYmxlbWF0aWMgdG8gcHJvdmlkZSB5b3VyIG93biBgaWRgIGFyZ3VtZW50XG4gICAqL1xuICBkZWJvdW5jZShjYWxsYmFjaywgdGltZU1TLCBfaWQpIHtcbiAgICB2YXIgaWQgPSBfaWQ7XG5cbiAgICAvLyBJZiB3ZSBkb24ndCBnZXQgYW4gaWQgZnJvbSB0aGUgdXNlciwgdGhlbiBndWVzcyB0aGUgaWQgYnkgdHVybmluZyB0aGUgZnVuY3Rpb25cbiAgICAvLyBpbnRvIGEgc3RyaW5nIChyYXcgc291cmNlKSBhbmQgdXNlIHRoYXQgZm9yIGFuIGlkIGluc3RlYWRcbiAgICBpZiAoaWQgPT0gbnVsbCkge1xuICAgICAgaWQgPSAoJycgKyBjYWxsYmFjayk7XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSB0cmFuc3BpbGVkIGNvZGUsIHRoZW4gYW4gYXN5bmMgZ2VuZXJhdG9yIHdpbGwgYmUgdXNlZCBmb3IgYXN5bmMgZnVuY3Rpb25zXG4gICAgICAvLyBUaGlzIHdyYXBzIHRoZSByZWFsIGZ1bmN0aW9uLCBhbmQgc28gd2hlbiBjb252ZXJ0aW5nIHRoZSBmdW5jdGlvbiBpbnRvIGEgc3RyaW5nXG4gICAgICAvLyBpdCB3aWxsIE5PVCBiZSB1bmlxdWUgcGVyIGNhbGwtc2l0ZS4gRm9yIHRoaXMgcmVhc29uLCBpZiB3ZSBkZXRlY3QgdGhpcyBpc3N1ZSxcbiAgICAgIC8vIHdlIHdpbGwgZ28gdGhlIFwic2xvd1wiIHJvdXRlIGFuZCBjcmVhdGUgYSBzdGFjayB0cmFjZSwgYW5kIHVzZSB0aGF0IGZvciB0aGUgdW5pcXVlIGlkXG4gICAgICBpZiAoaWQubWF0Y2goL2FzeW5jR2VuZXJhdG9yU3RlcC8pKSB7XG4gICAgICAgIGlkID0gKG5ldyBFcnJvcigpKS5zdGFjaztcbiAgICAgICAgY29uc29sZS53YXJuKCdteXRoaXgtdWkgd2FybmluZzogXCJ0aGlzLmRlbGF5XCIgY2FsbGVkIHdpdGhvdXQgYSBzcGVjaWZpZWQgXCJpZFwiIHBhcmFtZXRlci4gVGhpcyB3aWxsIHJlc3VsdCBpbiBhIHBlcmZvcm1hbmNlIGhpdC4gUGxlYXNlIHNwZWNpZnkgYW5kIFwiaWRcIiBhcmd1bWVudCBmb3IgeW91ciBjYWxsOiBcInRoaXMuZGVsYXkoY2FsbGJhY2ssIG1zLCBcXCdzb21lLWN1c3RvbS1jYWxsLXNpdGUtaWRcXCcpXCInKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSAoJycgKyBpZCk7XG4gICAgfVxuXG4gICAgbGV0IHByb21pc2UgPSB0aGlzLmRlbGF5VGltZXJzLmdldChpZCk7XG4gICAgaWYgKHByb21pc2UpIHtcbiAgICAgIGlmIChwcm9taXNlLnRpbWVySUQpXG4gICAgICAgIGNsZWFyVGltZW91dChwcm9taXNlLnRpbWVySUQpO1xuXG4gICAgICBwcm9taXNlLnJlamVjdCgnY2FuY2VsbGVkJyk7XG4gICAgfVxuXG4gICAgcHJvbWlzZSA9IEJhc2VVdGlscy5jcmVhdGVSZXNvbHZhYmxlKCk7XG4gICAgdGhpcy5kZWxheVRpbWVycy5zZXQoaWQsIHByb21pc2UpO1xuXG4gICAgLy8gTGV0J3Mgbm90IGNvbXBsYWluIGFib3V0XG4gICAgLy8gdW5jYXVnaHQgZXJyb3JzXG4gICAgcHJvbWlzZS5jYXRjaCgoKSA9PiB7fSk7XG5cbiAgICBwcm9taXNlLnRpbWVySUQgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjYWxsYmFjaygpO1xuICAgICAgICBwcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGVuY291bnRlcmVkIHdoaWxlIGNhbGxpbmcgXCJkZWxheVwiIGNhbGxiYWNrOiAnLCBlcnJvciwgY2FsbGJhY2sudG9TdHJpbmcoKSk7XG4gICAgICAgIHByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9LCB0aW1lTVMgfHwgMCk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIGNsZWFyRGVib3VuY2UoaWQpIHtcbiAgICBsZXQgcHJvbWlzZSA9IHRoaXMuZGVsYXlUaW1lcnMuZ2V0KGlkKTtcbiAgICBpZiAoIXByb21pc2UpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAocHJvbWlzZS50aW1lcklEKVxuICAgICAgY2xlYXJUaW1lb3V0KHByb21pc2UudGltZXJJRCk7XG5cbiAgICBwcm9taXNlLnJlamVjdCgnY2FuY2VsbGVkJyk7XG5cbiAgICB0aGlzLmRlbGF5VGltZXJzLmRlbGV0ZShpZCk7XG4gIH1cblxuICBjbGFzc2VzKC4uLl9hcmdzKSB7XG4gICAgbGV0IGFyZ3MgPSBfYXJncy5mbGF0KEluZmluaXR5KS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKGl0ZW0sICc6OlN0cmluZycpKVxuICAgICAgICByZXR1cm4gaXRlbS50cmltKCk7XG5cbiAgICAgIGlmIChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdChpdGVtKSkge1xuICAgICAgICBsZXQga2V5cyAgPSBPYmplY3Qua2V5cyhpdGVtKTtcbiAgICAgICAgbGV0IGl0ZW1zID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGtleSAgID0ga2V5c1tpXTtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBpdGVtW2tleV07XG4gICAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaXRlbXMucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KS5mbGF0KEluZmluaXR5KS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGFyZ3MpKS5qb2luKCcgJyk7XG4gIH1cblxuICBhc3luYyBmZXRjaFNyYyhzcmNVUkwpIHtcbiAgICBpZiAoIXNyY1VSTClcbiAgICAgIHJldHVybjtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBDb21wb25lbnRVdGlscy5sb2FkUGFydGlhbEludG9FbGVtZW50LmNhbGwodGhpcywgc3JjVVJMKTtcbiAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbXl0aGl4LXJlYWR5Jyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFwiJHt0aGlzLnNlbnNpdGl2ZVRhZ05hbWV9XCI6IEZhaWxlZCB0byBsb2FkIHNwZWNpZmllZCByZXNvdXJjZTogJHtzcmNVUkx9IChyZXNvbHZlZCB0bzogJHtlcnJvci51cmx9KWAsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLW1hZ2ljLW51bWJlcnMgKi9cblxuaW1wb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb21wb25lbnRVdGlscyBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5cbmltcG9ydCB7XG4gIE15dGhpeFVJQ29tcG9uZW50LFxufSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlEeW5hbWljU3R5bGUgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gIHN0YXRpYyB0YWdOYW1lID0gJ215dGhpeC1keW5hbWljLXN0eWxlJztcblxuICBzZXQgYXR0ciRkYXRhRW5hYmxlZChbIG5ld1ZhbHVlIF0pIHtcbiAgICB0aGlzLmhhbmRsZURhdGFFbmFibGVkQXR0cmlidXRlQ2hhbmdlKG5ld1ZhbHVlKTtcbiAgfVxuXG4gIGNyZWF0ZVN0eWxlTm9kZSgpIHtcbiAgICBsZXQgb3duZXJEb2N1bWVudCAgID0gdGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICAgIGxldCBpbml0aWFsQ29udGVudCAgPSB0aGlzLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICBsZXQgaHJlZiAgICAgICAgICAgID0gdGhpcy5hdHRyKCdocmVmJyk7XG4gICAgbGV0IHN0eWxlTm9kZSAgICAgICA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIGlmIChCYXNlVXRpbHMuaXNOb3ROT0UoaHJlZikpIHtcbiAgICAgIENvbXBvbmVudFV0aWxzLnJlcXVpcmUoaHJlZiwgeyBvd25lckRvY3VtZW50IH0pLnRoZW4oXG4gICAgICAgIGFzeW5jICh7IHJlc3BvbnNlIH0pID0+IHtcbiAgICAgICAgICBsZXQgY29udGVudCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICBzdHlsZU5vZGUuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgICAgICAgIHRoaXMuaGFuZGxlRGF0YUVuYWJsZWRBdHRyaWJ1dGVDaGFuZ2UodGhpcy5hdHRyKCdkYXRhLWVuYWJsZWQnKSk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYG15dGhpeC1keW5hbWljLXN0eWxlOiBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIGxvYWQgc3R5bGUgXCIke2hyZWZ9XCI6IGAsIHRoaXMsIGVycm9yKTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChCYXNlVXRpbHMuaXNOb3ROT0UoaW5pdGlhbENvbnRlbnQpKSB7XG4gICAgICBpZiAoKC88c3R5bGVbXj5dKj4vaSkudGVzdChpbml0aWFsQ29udGVudCkpIHtcbiAgICAgICAgbGV0IHRlbXBEaXYgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IGluaXRpYWxDb250ZW50O1xuXG4gICAgICAgIGxldCB0ZW1wTm9kZSA9IHRlbXBEaXYucXVlcnlTZWxlY3Rvcignc3R5bGUnKTtcbiAgICAgICAgaWYgKHRlbXBOb2RlKVxuICAgICAgICAgIHN0eWxlTm9kZSA9IHRlbXBOb2RlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc3R5bGVOb2RlLmlubmVySFRNTCA9IGluaXRpYWxDb250ZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGVOb2RlLmlubmVySFRNTCA9IGluaXRpYWxDb250ZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdHlsZU5vZGU7XG4gIH1cblxuICBtb3VudGVkKCkge1xuICAgIHN1cGVyLm1vdW50ZWQoKTtcblxuICAgIHRoaXMuc3R5bGVOb2RlID0gdGhpcy5jcmVhdGVTdHlsZU5vZGUoKTtcblxuICAgIHRoaXMuaGFuZGxlRGF0YUVuYWJsZWRBdHRyaWJ1dGVDaGFuZ2UodGhpcy5hdHRyKCdkYXRhLWVuYWJsZWQnKSk7XG4gIH1cblxuICBoYW5kbGVEYXRhRW5hYmxlZEF0dHJpYnV0ZUNoYW5nZShlbmFibGVkKSB7XG4gICAgaWYgKCF0aGlzLnN0eWxlTm9kZSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChCYXNlVXRpbHMuaXNOT0UodGhpcy5zdHlsZU5vZGUudGV4dENvbnRlbnQpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IGlzRW5hYmxlZCA9ICgvXih0cnVlKSQvaSkudGVzdChlbmFibGVkKTtcbiAgICBpZiAoaXNFbmFibGVkKVxuICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnN0eWxlTm9kZSk7XG4gICAgZWxzZSBpZiAodGhpcy5jb250YWlucyh0aGlzLnN0eWxlTm9kZSkpXG4gICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuc3R5bGVOb2RlKTtcbiAgfVxufVxuXG5NeXRoaXhVSUR5bmFtaWNTdHlsZS5yZWdpc3RlcigpO1xuXG4oZ2xvYmFsVGhpcy5teXRoaXhVSSA9IChnbG9iYWxUaGlzLm15dGhpeFVJIHx8IHt9KSkuTXl0aGl4VUlEeW5hbWljU3R5bGUgPSBNeXRoaXhVSUR5bmFtaWNTdHlsZTtcbiIsImltcG9ydCBkZWVwTWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBDb21wb25lbnRVdGlscyBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5cbmltcG9ydCB7XG4gIER5bmFtaWNQcm9wZXJ0eSxcbn0gZnJvbSAnLi9keW5hbWljLXByb3BlcnR5LmpzJztcblxuaW1wb3J0IHtcbiAgTXl0aGl4VUlDb21wb25lbnQsXG59IGZyb20gJy4vbXl0aGl4LXVpLWNvbXBvbmVudC5qcyc7XG5cbi8qKlxuICogUlRMIChSaWdodC10by1MZWZ0KSBsYW5ndWFnZSBjb2Rlcy5cbiAqIEluY2x1ZGVzIEFyYWJpYywgSGVicmV3LCBQZXJzaWFuL0ZhcnNpLCBVcmR1LCBhbmQgcmVsYXRlZCBsYW5ndWFnZXMuXG4gKi9cbmNvbnN0IFJUTF9MQU5HVUFHRVMgPSBuZXcgU2V0KFtcbiAgJ2FyJywgJ2FyYycsICdhcnonLCAnYXotYXJhYicsICdicWknLCAnY2tiJywgJ2R2JywgJ2ZhJywgJ2dsaycsICdoZScsXG4gICdrdS1hcmFiJywgJ216bicsICducW8nLCAncG5iJywgJ3BzJywgJ3NkJywgJ3VnJywgJ3VyJywgJ3lpJyxcbl0pO1xuXG4vKipcbiAqIENoZWNrIGlmIGEgbGFuZ3VhZ2UgY29kZSByZXByZXNlbnRzIGFuIFJUTCBsYW5ndWFnZS5cbiAqL1xuY29uc3QgaXNSVExMYW5ndWFnZSA9IChsYW5nKSA9PiB7XG4gIGlmICghbGFuZylcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgbGV0IG5vcm1hbGl6ZWRMYW5nID0gbGFuZy50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIENoZWNrIGV4YWN0IG1hdGNoXG4gIGlmIChSVExfTEFOR1VBR0VTLmhhcyhub3JtYWxpemVkTGFuZykpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgLy8gQ2hlY2sgYmFzZSBsYW5ndWFnZSAoZS5nLiwgJ2FyLVNBJyAtPiAnYXInKVxuICBsZXQgYmFzZUxhbmcgPSBub3JtYWxpemVkTGFuZy5zcGxpdCgnLScpWzBdO1xuICByZXR1cm4gUlRMX0xBTkdVQUdFUy5oYXMoYmFzZUxhbmcpO1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IGRhdGUgZm9ybWF0IHByZXNldHMuXG4gKi9cbmNvbnN0IERBVEVfRk9STUFUX1BSRVNFVFMgPSB7XG4gIHNob3J0OiAgeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJyB9LFxuICBsb25nOiAgIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJywgd2Vla2RheTogJ2xvbmcnIH0sXG4gIG1lZGl1bTogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnc2hvcnQnLCBkYXk6ICdudW1lcmljJywgd2Vla2RheTogJ3Nob3J0JyB9LFxuICB0aW1lOiAgIHsgaG91cjogJ251bWVyaWMnLCBtaW51dGU6ICdudW1lcmljJyB9LFxuICBmdWxsOiAgIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJ2xvbmcnLCBkYXk6ICdudW1lcmljJywgd2Vla2RheTogJ2xvbmcnLCBob3VyOiAnbnVtZXJpYycsIG1pbnV0ZTogJ251bWVyaWMnIH0sXG59O1xuXG4vKipcbiAqIERlZmF1bHQgbnVtYmVyIGZvcm1hdCBwcmVzZXRzLlxuICovXG5jb25zdCBOVU1CRVJfRk9STUFUX1BSRVNFVFMgPSB7XG4gIGRlY2ltYWw6ICAgIHsgc3R5bGU6ICdkZWNpbWFsJyB9LFxuICBwZXJjZW50OiAgICB7IHN0eWxlOiAncGVyY2VudCcgfSxcbiAgY29tcGFjdDogICAgeyBub3RhdGlvbjogJ2NvbXBhY3QnIH0sXG4gIHNjaWVudGlmaWM6IHsgbm90YXRpb246ICdzY2llbnRpZmljJyB9LFxufTtcblxuZXhwb3J0IGNsYXNzIE15dGhpeFVJTGFuZ3VhZ2VQYWNrIGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9ICdteXRoaXgtbGFuZ3VhZ2UtcGFjayc7XG5cbiAgY3JlYXRlU2hhZG93RE9NKCkge1xuICAgIC8vIE5PT1BcbiAgfVxuXG4gIGdldENvbXBvbmVudFRlbXBsYXRlKCkge1xuICAgIC8vIE5PT1BcbiAgfVxuXG4gIHNldCBhdHRyJGRhdGFNeXRoaXhTcmMoWyB2YWx1ZSBdKSB7XG4gICAgLy8gTk9PUC4uLiBUcmFwIHRoaXMgYmVjYXVzZSB3ZVxuICAgIC8vIGRvbid0IHdhbnQgdG8gbG9hZCBhIHBhcnRpYWwgaGVyZVxuICB9XG5cbiAgb25NdXRhdGlvbkFkZGVkKG11dGF0aW9uKSB7XG4gICAgLy8gV2hlbiBhZGRlZCB0byB0aGUgRE9NLCBlbnN1cmUgdGhhdCB3ZSB3ZXJlXG4gICAgLy8gYWRkZWQgdG8gdGhlIHJvb3Qgb2YgYSBsYW5ndWFnZSBwcm92aWRlci4uLlxuICAgIC8vIElmIG5vdCwgdGhlbiBtb3ZlIG91cnNlbHZlcyB0byB0aGUgcm9vdFxuICAgIC8vIG9mIHRoZSBsYW5ndWFnZSBwcm92aWRlci5cbiAgICBsZXQgcGFyZW50TGFuZ3VhZ2VQcm92aWRlciA9IHRoaXMuY2xvc2VzdCgnbXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyJyk7XG4gICAgaWYgKHBhcmVudExhbmd1YWdlUHJvdmlkZXIgJiYgcGFyZW50TGFuZ3VhZ2VQcm92aWRlciAhPT0gbXV0YXRpb24udGFyZ2V0KVxuICAgICAgQmFzZVV0aWxzLm5leHRUaWNrKCgpID0+IHBhcmVudExhbmd1YWdlUHJvdmlkZXIuaW5zZXJ0QmVmb3JlKHRoaXMsIHBhcmVudExhbmd1YWdlUHJvdmlkZXIuZmlyc3RDaGlsZCkpO1xuICB9XG59XG5cbmNvbnN0IElTX0pTT05fRU5DVFlQRSAgICAgICAgICAgICAgICAgPSAvXmFwcGxpY2F0aW9uXFwvanNvbi9pO1xuY29uc3QgTEFOR1VBR0VfUEFDS19JTlNFUlRfR1JBQ0VfVElNRSA9IDUwO1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyIGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9ICdteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXInO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlZCBhdHRyaWJ1dGVzIGZvciByZWFjdGl2ZSB1cGRhdGVzLlxuICAgKi9cbiAgc3RhdGljIG9ic2VydmVkQXR0cmlidXRlcyA9IFsgJ2xhbmcnLCAnZmFsbGJhY2snLCAnYXV0by1kaXInIF07XG5cbiAgc2V0IGF0dHIkbGFuZyhbIG5ld1ZhbHVlLCBvbGRWYWx1ZSBdKSB7XG4gICAgdGhpcy5sb2FkQWxsTGFuZ3VhZ2VQYWNrc0Zvckxhbmd1YWdlKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgdGhpcy51cGRhdGVUZXh0RGlyZWN0aW9uKCk7XG4gIH1cblxuICBzZXQgYXR0ciRmYWxsYmFjayhbIF9uZXdWYWx1ZSwgX29sZFZhbHVlIF0pIHtcbiAgICAvLyBGYWxsYmFjayBjaGFpbiBjaGFuZ2VkLCByZWxvYWQgbGFuZ3VhZ2UgcGFja3NcbiAgICB0aGlzLmxvYWRBbGxMYW5ndWFnZVBhY2tzRm9yTGFuZ3VhZ2UodGhpcy5nZXRDdXJyZW50TG9jYWxlKCkpO1xuICB9XG5cbiAgc2V0IGF0dHIkYXV0b0RpcihbIG5ld1ZhbHVlIF0pIHtcbiAgICBpZiAobmV3VmFsdWUgIT09IG51bGwpXG4gICAgICB0aGlzLnVwZGF0ZVRleHREaXJlY3Rpb24oKTtcbiAgfVxuXG4gIG9uTXV0YXRpb25DaGlsZEFkZGVkKG5vZGUpIHtcbiAgICBpZiAobm9kZS5sb2NhbE5hbWUgPT09ICdteXRoaXgtbGFuZ3VhZ2UtcGFjaycpIHtcbiAgICAgIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAvLyBSZWxvYWQgbGFuZ3VhZ2UgcGFja3MgYWZ0ZXIgYWRkaXRpb25zXG4gICAgICAgIHRoaXMubG9hZEFsbExhbmd1YWdlUGFja3NGb3JMYW5ndWFnZSh0aGlzLmdldEN1cnJlbnRMb2NhbGUoKSk7XG4gICAgICB9LCBMQU5HVUFHRV9QQUNLX0lOU0VSVF9HUkFDRV9USU1FLCAncmVsb2FkTGFuZ3VhZ2VQYWNrcycpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAndGVybXMnOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICB9LFxuICAgICAgJ19wbHVyYWxSdWxlcyc6IHtcbiAgICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiAgICAgICAgbnVsbCxcbiAgICAgIH0sXG4gICAgICAnX2RhdGVGb3JtYXR0ZXJzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBuZXcgTWFwKCksXG4gICAgICB9LFxuICAgICAgJ19udW1iZXJGb3JtYXR0ZXJzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6ICAgICAgICBuZXcgTWFwKCksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgZmFsbGJhY2sgbGFuZ3VhZ2UgY2hhaW4gYXMgYW4gYXJyYXkuXG4gICAqIFJldHVybnMgW2N1cnJlbnRMYW5nLCAuLi5mYWxsYmFja3NdIGluIG9yZGVyIG9mIHByZWZlcmVuY2UuXG4gICAqL1xuICBnZXRGYWxsYmFja0NoYWluKCkge1xuICAgIGxldCBjdXJyZW50TGFuZyA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpO1xuICAgIGxldCBmYWxsYmFjayA9IHRoaXMuZ2V0QXR0cmlidXRlKCdmYWxsYmFjaycpIHx8ICcnO1xuICAgIGxldCBmYWxsYmFja3MgPSBmYWxsYmFjay5zcGxpdCgnLCcpLm1hcCgobCkgPT4gbC50cmltKCkpLmZpbHRlcihCb29sZWFuKTtcblxuICAgIC8vIEJ1aWxkIGNoYWluOiBjdXJyZW50IC0+IGJhc2Ugb2YgY3VycmVudCAtPiBleHBsaWNpdCBmYWxsYmFja3NcbiAgICBsZXQgY2hhaW4gPSBbIGN1cnJlbnRMYW5nIF07XG5cbiAgICAvLyBBZGQgYmFzZSBsYW5ndWFnZSBpZiBjdXJyZW50IGhhcyBhIHJlZ2lvbiAoZS5nLiwgJ2VzLU1YJyAtPiAnZXMnKVxuICAgIGlmIChjdXJyZW50TGFuZy5pbmNsdWRlcygnLScpKSB7XG4gICAgICBsZXQgYmFzZUxhbmcgPSBjdXJyZW50TGFuZy5zcGxpdCgnLScpWzBdO1xuICAgICAgaWYgKCFjaGFpbi5pbmNsdWRlcyhiYXNlTGFuZykpXG4gICAgICAgIGNoYWluLnB1c2goYmFzZUxhbmcpO1xuICAgIH1cblxuICAgIC8vIEFkZCBleHBsaWNpdCBmYWxsYmFja3NcbiAgICBmb3IgKGxldCBsYW5nIG9mIGZhbGxiYWNrcykge1xuICAgICAgaWYgKCFjaGFpbi5pbmNsdWRlcyhsYW5nKSlcbiAgICAgICAgY2hhaW4ucHVzaChsYW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhaW47XG4gIH1cblxuICAvKipcbiAgICogVHJhbnNsYXRlIGEga2V5IHdpdGggb3B0aW9uYWwgaW50ZXJwb2xhdGlvbiBhbmQgcGx1cmFsaXphdGlvbiBzdXBwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIHRyYW5zbGF0aW9uIGtleSBwYXRoLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgaW5jbHVkaW5nIGBjb3VudGAgZm9yIHBsdXJhbGl6YXRpb24gYW5kIGludGVycG9sYXRpb24gdmFsdWVzLlxuICAgKiBAcGFyYW0ge2FueX0gZGVmYXVsdFZhbHVlIC0gRGVmYXVsdCB2YWx1ZSBpZiBrZXkgbm90IGZvdW5kLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgdHJhbnNsYXRlZCBhbmQgaW50ZXJwb2xhdGVkIHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gU2ltcGxlIHRyYW5zbGF0aW9uXG4gICAqIGxhbmcudCgnZ3JlZXRpbmcuaGVsbG8nKVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBXaXRoIHBsdXJhbGl6YXRpb24gKHJlcXVpcmVzIElDVS1zdHlsZSBwbHVyYWwga2V5cyBpbiBsYW5ndWFnZSBwYWNrKVxuICAgKiBsYW5nLnQoJ2l0ZW1zJywgeyBjb3VudDogNSB9KVxuICAgKiAvLyBMYW5ndWFnZSBwYWNrOiB7IFwiaXRlbXNcIjogeyBcIm9uZVwiOiBcInt7Y291bnR9fSBpdGVtXCIsIFwib3RoZXJcIjogXCJ7e2NvdW50fX0gaXRlbXNcIiB9IH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gV2l0aCBpbnRlcnBvbGF0aW9uXG4gICAqIGxhbmcudCgnd2VsY29tZScsIHsgbmFtZTogJ0pvaG4nIH0pXG4gICAqIC8vIExhbmd1YWdlIHBhY2s6IHsgXCJ3ZWxjb21lXCI6IFwiSGVsbG8sIHt7bmFtZX19IVwiIH1cbiAgICovXG4gIHQoa2V5LCBvcHRpb25zID0ge30sIGRlZmF1bHRWYWx1ZSkge1xuICAgIGxldCBwYXRoID0gYGdsb2JhbC5pMThuLiR7a2V5fWA7XG4gICAgbGV0IHJlc3VsdCA9IFV0aWxzLmZldGNoUGF0aCh0aGlzLnRlcm1zLCBwYXRoKTtcblxuICAgIC8vIEhhbmRsZSBwbHVyYWxpemF0aW9uXG4gICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiAnY291bnQnIGluIG9wdGlvbnMpIHtcbiAgICAgIGxldCBwbHVyYWxDYXRlZ29yeSA9IHRoaXMuZ2V0UGx1cmFsQ2F0ZWdvcnkob3B0aW9ucy5jb3VudCk7XG4gICAgICByZXN1bHQgPSByZXN1bHRbcGx1cmFsQ2F0ZWdvcnldIHx8IHJlc3VsdC5vdGhlciB8fCByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSByYXcgdmFsdWUgaWYgaXQncyBhIER5bmFtaWNQcm9wZXJ0eVxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBEeW5hbWljUHJvcGVydHkpXG4gICAgICByZXN1bHQgPSByZXN1bHQudmFsdWVPZigpO1xuXG4gICAgLy8gVXNlIGRlZmF1bHQgaWYgbm8gcmVzdWx0XG4gICAgaWYgKHJlc3VsdCA9PSBudWxsKVxuICAgICAgcmVzdWx0ID0gKGRlZmF1bHRWYWx1ZSAhPSBudWxsKSA/IGRlZmF1bHRWYWx1ZSA6IGtleTtcblxuICAgIC8vIEludGVycG9sYXRlIHZhbHVlc1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJyAmJiBvcHRpb25zKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgvXFx7XFx7KFxcdyspXFx9XFx9L2csIChtYXRjaCwgdmFyTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gKHZhck5hbWUgaW4gb3B0aW9ucykgPyBvcHRpb25zW3Zhck5hbWVdIDogbWF0Y2g7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgSUNVIHBsdXJhbCBjYXRlZ29yeSBmb3IgYSBjb3VudC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50IC0gVGhlIGNvdW50IHRvIGdldCB0aGUgcGx1cmFsIGNhdGVnb3J5IGZvci5cbiAgICogQHJldHVybnMge3N0cmluZ30gT25lIG9mOiAnemVybycsICdvbmUnLCAndHdvJywgJ2ZldycsICdtYW55JywgJ290aGVyJy5cbiAgICovXG4gIGdldFBsdXJhbENhdGVnb3J5KGNvdW50KSB7XG4gICAgbGV0IGxhbmcgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKTtcblxuICAgIC8vIENhY2hlIFBsdXJhbFJ1bGVzIHBlciBsYW5ndWFnZVxuICAgIGlmICghdGhpcy5fcGx1cmFsUnVsZXMgfHwgdGhpcy5fcGx1cmFsUnVsZXMubG9jYWxlICE9PSBsYW5nKSB7XG4gICAgICB0aGlzLl9wbHVyYWxSdWxlcyA9IG5ldyBJbnRsLlBsdXJhbFJ1bGVzKGxhbmcpO1xuICAgICAgdGhpcy5fcGx1cmFsUnVsZXMubG9jYWxlID0gbGFuZztcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcGx1cmFsUnVsZXMuc2VsZWN0KGNvdW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYSBkYXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBsb2NhbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RGF0ZXxudW1iZXJ8c3RyaW5nfSBkYXRlIC0gVGhlIGRhdGUgdG8gZm9ybWF0LlxuICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHN0eWxlIC0gQSBwcmVzZXQgbmFtZSAoJ3Nob3J0JywgJ2xvbmcnLCAnbWVkaXVtJywgJ3RpbWUnLCAnZnVsbCcpIG9yIEludGwuRGF0ZVRpbWVGb3JtYXQgb3B0aW9ucy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXREYXRlKG5ldyBEYXRlKCksICdsb25nJylcbiAgICogLy8gXCJGZWJydWFyeSA3LCAyMDI2XCJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXREYXRlKGRhdGUsIHsgeWVhcjogJ251bWVyaWMnLCBtb250aDogJzItZGlnaXQnLCBkYXk6ICcyLWRpZ2l0JyB9KVxuICAgKi9cbiAgZm9ybWF0RGF0ZShkYXRlLCBzdHlsZSA9ICdtZWRpdW0nKSB7XG4gICAgbGV0IGxhbmcgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKTtcbiAgICBsZXQgb3B0aW9ucyA9ICh0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSA/IChEQVRFX0ZPUk1BVF9QUkVTRVRTW3N0eWxlXSB8fCBEQVRFX0ZPUk1BVF9QUkVTRVRTLm1lZGl1bSkgOiBzdHlsZTtcbiAgICBsZXQgY2FjaGVLZXkgPSBgJHtsYW5nfS0ke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWA7XG5cbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXR0ZXJzLmhhcyhjYWNoZUtleSkpXG4gICAgICB0aGlzLl9kYXRlRm9ybWF0dGVycy5zZXQoY2FjaGVLZXksIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxhbmcsIG9wdGlvbnMpKTtcblxuICAgIGxldCBkYXRlVmFsdWUgPSAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpID8gZGF0ZSA6IG5ldyBEYXRlKGRhdGUpO1xuICAgIHJldHVybiB0aGlzLl9kYXRlRm9ybWF0dGVycy5nZXQoY2FjaGVLZXkpLmZvcm1hdChkYXRlVmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGRhdGUgcmVsYXRpdmUgdG8gbm93IChlLmcuLCBcIjIgZGF5cyBhZ29cIiwgXCJpbiAzIGhvdXJzXCIpLlxuICAgKlxuICAgKiBAcGFyYW0ge0RhdGV8bnVtYmVyfHN0cmluZ30gZGF0ZSAtIFRoZSBkYXRlIHRvIGZvcm1hdC5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBJbnRsLlJlbGF0aXZlVGltZUZvcm1hdCBvcHRpb25zLlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgcmVsYXRpdmUgdGltZSBzdHJpbmcuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0UmVsYXRpdmVUaW1lKG5ldyBEYXRlKERhdGUubm93KCkgLSA4NjQwMDAwMCkpXG4gICAqIC8vIFwiMSBkYXkgYWdvXCJcbiAgICovXG4gIGZvcm1hdFJlbGF0aXZlVGltZShkYXRlLCBvcHRpb25zID0ge30pIHtcbiAgICBsZXQgbGFuZyA9IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpO1xuICAgIGxldCBkYXRlVmFsdWUgPSAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpID8gZGF0ZSA6IG5ldyBEYXRlKGRhdGUpO1xuICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGxldCBkaWZmTXMgPSBkYXRlVmFsdWUuZ2V0VGltZSgpIC0gbm93O1xuICAgIGxldCBkaWZmU2Vjb25kcyA9IE1hdGgucm91bmQoZGlmZk1zIC8gMTAwMCk7XG5cbiAgICAvLyBEZXRlcm1pbmUgdGhlIGJlc3QgdW5pdFxuICAgIGxldCB2YWx1ZTtcbiAgICBsZXQgdW5pdDtcblxuICAgIGNvbnN0IE1JTlVURSA9IDYwO1xuICAgIGNvbnN0IEhPVVIgPSAzNjAwO1xuICAgIGNvbnN0IERBWSA9IDg2NDAwO1xuICAgIGNvbnN0IFdFRUsgPSA2MDQ4MDA7XG4gICAgY29uc3QgTU9OVEggPSAyNjI5ODAwOyAvLyB+MzAuNDQgZGF5c1xuICAgIGNvbnN0IFlFQVIgPSAzMTU1NzYwMDsgLy8gfjM2NS4yNSBkYXlzXG5cbiAgICBsZXQgYWJzRGlmZiA9IE1hdGguYWJzKGRpZmZTZWNvbmRzKTtcblxuICAgIGlmIChhYnNEaWZmIDwgTUlOVVRFKSB7XG4gICAgICB2YWx1ZSA9IGRpZmZTZWNvbmRzO1xuICAgICAgdW5pdCA9ICdzZWNvbmQnO1xuICAgIH0gZWxzZSBpZiAoYWJzRGlmZiA8IEhPVVIpIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIE1JTlVURSk7XG4gICAgICB1bml0ID0gJ21pbnV0ZSc7XG4gICAgfSBlbHNlIGlmIChhYnNEaWZmIDwgREFZKSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBIT1VSKTtcbiAgICAgIHVuaXQgPSAnaG91cic7XG4gICAgfSBlbHNlIGlmIChhYnNEaWZmIDwgV0VFSykge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gREFZKTtcbiAgICAgIHVuaXQgPSAnZGF5JztcbiAgICB9IGVsc2UgaWYgKGFic0RpZmYgPCBNT05USCkge1xuICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKGRpZmZTZWNvbmRzIC8gV0VFSyk7XG4gICAgICB1bml0ID0gJ3dlZWsnO1xuICAgIH0gZWxzZSBpZiAoYWJzRGlmZiA8IFlFQVIpIHtcbiAgICAgIHZhbHVlID0gTWF0aC5yb3VuZChkaWZmU2Vjb25kcyAvIE1PTlRIKTtcbiAgICAgIHVuaXQgPSAnbW9udGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IE1hdGgucm91bmQoZGlmZlNlY29uZHMgLyBZRUFSKTtcbiAgICAgIHVuaXQgPSAneWVhcic7XG4gICAgfVxuXG4gICAgbGV0IGZvcm1hdHRlciA9IG5ldyBJbnRsLlJlbGF0aXZlVGltZUZvcm1hdChsYW5nLCB7IG51bWVyaWM6ICdhdXRvJywgLi4ub3B0aW9ucyB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSwgdW5pdCk7XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGEgbnVtYmVyIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBsb2NhbGUuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgbnVtYmVyIHRvIGZvcm1hdC5cbiAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBzdHlsZSAtIEEgcHJlc2V0IG5hbWUgKCdkZWNpbWFsJywgJ3BlcmNlbnQnLCAnY29tcGFjdCcsICdzY2llbnRpZmljJykgb3IgSW50bC5OdW1iZXJGb3JtYXQgb3B0aW9ucy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBudW1iZXIgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdE51bWJlcigxMjM0LjU2KVxuICAgKiAvLyBcIjEsMjM0LjU2XCIgKGluIGVuLVVTKVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBsYW5nLmZvcm1hdE51bWJlcigwLjQyLCAncGVyY2VudCcpXG4gICAqIC8vIFwiNDIlXCJcbiAgICovXG4gIGZvcm1hdE51bWJlcihudW1iZXIsIHN0eWxlID0gJ2RlY2ltYWwnKSB7XG4gICAgbGV0IGxhbmcgPSB0aGlzLmdldEN1cnJlbnRMb2NhbGUoKTtcbiAgICBsZXQgb3B0aW9ucyA9ICh0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSA/IChOVU1CRVJfRk9STUFUX1BSRVNFVFNbc3R5bGVdIHx8IE5VTUJFUl9GT1JNQVRfUFJFU0VUUy5kZWNpbWFsKSA6IHN0eWxlO1xuICAgIGxldCBjYWNoZUtleSA9IGAke2xhbmd9LSR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YDtcblxuICAgIGlmICghdGhpcy5fbnVtYmVyRm9ybWF0dGVycy5oYXMoY2FjaGVLZXkpKVxuICAgICAgdGhpcy5fbnVtYmVyRm9ybWF0dGVycy5zZXQoY2FjaGVLZXksIG5ldyBJbnRsLk51bWJlckZvcm1hdChsYW5nLCBvcHRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5fbnVtYmVyRm9ybWF0dGVycy5nZXQoY2FjaGVLZXkpLmZvcm1hdChudW1iZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1hdCBhIGN1cnJlbmN5IGFtb3VudCBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgbG9jYWxlLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gVGhlIGFtb3VudCB0byBmb3JtYXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjdXJyZW5jeSAtIFRoZSBJU08gNDIxNyBjdXJyZW5jeSBjb2RlIChlLmcuLCAnVVNEJywgJ0VVUicpLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIEFkZGl0aW9uYWwgSW50bC5OdW1iZXJGb3JtYXQgb3B0aW9ucy5cbiAgICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCBjdXJyZW5jeSBzdHJpbmcuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGxhbmcuZm9ybWF0Q3VycmVuY3koOTkuOTksICdVU0QnKVxuICAgKiAvLyBcIiQ5OS45OVwiIChpbiBlbi1VUylcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGFuZy5mb3JtYXRDdXJyZW5jeSgxMjM0LjU2LCAnRVVSJylcbiAgICogLy8gXCLigqwxLDIzNC41NlwiIChpbiBlbi1VUykgb3IgXCIxLjIzNCw1NiDigqxcIiAoaW4gZGUtREUpXG4gICAqL1xuICBmb3JtYXRDdXJyZW5jeShhbW91bnQsIGN1cnJlbmN5LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtYXROdW1iZXIoYW1vdW50LCB7XG4gICAgICBzdHlsZTogICAgJ2N1cnJlbmN5JyxcbiAgICAgIGN1cnJlbmN5OiBjdXJyZW5jeSxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgaXMgUlRMLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY3VycmVudCBsYW5ndWFnZSBpcyBSVEwuXG4gICAqL1xuICBpc1JUTCgpIHtcbiAgICByZXR1cm4gaXNSVExMYW5ndWFnZSh0aGlzLmdldEN1cnJlbnRMb2NhbGUoKSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0ZXh0IGRpcmVjdGlvbiBiYXNlZCBvbiB0aGUgY3VycmVudCBsYW5ndWFnZS5cbiAgICogT25seSBhcHBsaWVzIHdoZW4gYXV0by1kaXIgYXR0cmlidXRlIGlzIHByZXNlbnQuXG4gICAqL1xuICB1cGRhdGVUZXh0RGlyZWN0aW9uKCkge1xuICAgIGlmICghdGhpcy5oYXNBdHRyaWJ1dGUoJ2F1dG8tZGlyJykpXG4gICAgICByZXR1cm47XG5cbiAgICBsZXQgZGlyZWN0aW9uID0gdGhpcy5pc1JUTCgpID8gJ3J0bCcgOiAnbHRyJztcbiAgICBsZXQgcHJldmlvdXNEaXJlY3Rpb24gPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGlyJyk7XG5cbiAgICBpZiAocHJldmlvdXNEaXJlY3Rpb24gPT09IGRpcmVjdGlvbilcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdkaXInLCBkaXJlY3Rpb24pO1xuXG4gICAgLy8gQWxzbyBzZXQgb24gZG9jdW1lbnQgaWYgdGhpcyBpcyB0aGUgcm9vdCBwcm92aWRlclxuICAgIGlmICghdGhpcy5jbG9zZXN0KCdteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXI6bm90KDpzY29wZSknKSkge1xuICAgICAgbGV0IGRvYyA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgIGRvYy5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXInLCBkaXJlY3Rpb24pO1xuICAgIH1cblxuICAgIC8vIERpc3BhdGNoIGRpcmVjdGlvbiBjaGFuZ2UgZXZlbnRcbiAgICBsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2RpcmVjdGlvbmNoYW5nZScsIHtcbiAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICBkZXRhaWw6ICB7IGRpcmVjdGlvbiwgbGFuZ3VhZ2U6IHRoaXMuZ2V0Q3VycmVudExvY2FsZSgpIH0sXG4gICAgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGkxOG4oX3BhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICAgIGxldCBwYXRoICAgID0gYGdsb2JhbC5pMThuLiR7X3BhdGh9YDtcbiAgICBsZXQgcmVzdWx0ICA9IFV0aWxzLmZldGNoUGF0aCh0aGlzLnRlcm1zLCBwYXRoKTtcblxuICAgIGlmIChyZXN1bHQgPT0gbnVsbClcbiAgICAgIHJldHVybiBVdGlscy5nZXREeW5hbWljUHJvcGVydHlGb3JQYXRoLmNhbGwodGhpcywgcGF0aCwgKGRlZmF1bHRWYWx1ZSA9PSBudWxsKSA/ICcnIDogZGVmYXVsdFZhbHVlKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRDdXJyZW50TG9jYWxlKCkge1xuICAgIC8vICh0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQpLmNoaWxkTm9kZXNbMV0gaXMgdGhlIGA8aHRtbGA+IHRhZyBvZiB0aGUgZG9jdW1lbnRcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhbmcnKSB8fCAodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5jaGlsZE5vZGVzWzFdLmdldEF0dHJpYnV0ZSgnbGFuZycpIHx8ICdlbic7XG4gIH1cblxuICBtb3VudGVkKCkge1xuICAgIHN1cGVyLm1vdW50ZWQoKTtcblxuICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhbmcnKSlcbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsYW5nJywgKHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkuY2hpbGROb2Rlc1sxXS5nZXRBdHRyaWJ1dGUoJ2xhbmcnKSB8fCAnZW4nKTtcblxuICAgIC8vIEFwcGx5IGluaXRpYWwgdGV4dCBkaXJlY3Rpb24gaWYgYXV0by1kaXIgaXMgZW5hYmxlZFxuICAgIHRoaXMudXBkYXRlVGV4dERpcmVjdGlvbigpO1xuICB9XG5cbiAgY3JlYXRlU2hhZG93RE9NKCkge1xuICAgIC8vIE5PT1BcbiAgfVxuXG4gIGdldENvbXBvbmVudFRlbXBsYXRlKCkge1xuICAgIC8vIE5PT1BcbiAgfVxuXG4gIGdldFNvdXJjZXNGb3JMYW5nKGxhbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3QoYG15dGhpeC1sYW5ndWFnZS1wYWNrW2xhbmdePVwiJHtsYW5nLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKX1cIl1gKTtcbiAgfVxuXG4gIGxvYWRBbGxMYW5ndWFnZVBhY2tzRm9yTGFuZ3VhZ2UoX2xhbmcpIHtcbiAgICBsZXQgbGFuZyA9IF9sYW5nIHx8ICdlbic7XG4gICAgbGV0IGZhbGxiYWNrQ2hhaW4gPSB0aGlzLmdldEZhbGxiYWNrQ2hhaW4oKTtcbiAgICBsZXQgYWxsU291cmNlRWxlbWVudHMgPSBbXTtcblxuICAgIC8vIENvbGxlY3QgbGFuZ3VhZ2UgcGFja3MgZnJvbSBhbGwgbGFuZ3VhZ2VzIGluIHRoZSBmYWxsYmFjayBjaGFpblxuICAgIGZvciAobGV0IGZhbGxiYWNrTGFuZyBvZiBmYWxsYmFja0NoYWluKSB7XG4gICAgICBsZXQgc291cmNlRWxlbWVudHMgPSB0aGlzLmdldFNvdXJjZXNGb3JMYW5nKGZhbGxiYWNrTGFuZylcbiAgICAgICAgLmZpbHRlcigoc291cmNlRWxlbWVudCkgPT4gQmFzZVV0aWxzLmlzTm90Tk9FKHNvdXJjZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSkpO1xuXG4gICAgICBmb3IgKGxldCBzb3VyY2VFbGVtZW50IG9mIHNvdXJjZUVsZW1lbnRzKSB7XG4gICAgICAgIGlmICghYWxsU291cmNlRWxlbWVudHMuaW5jbHVkZXMoc291cmNlRWxlbWVudCkpXG4gICAgICAgICAgYWxsU291cmNlRWxlbWVudHMucHVzaChzb3VyY2VFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWFsbFNvdXJjZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgY29uc29sZS53YXJuKGBcIm15dGhpeC1sYW5ndWFnZS1wcm92aWRlclwiOiBObyBcIm15dGhpeC1sYW5ndWFnZS1wYWNrXCIgdGFnIGZvdW5kIGZvciBsYW5ndWFnZXM6ICR7ZmFsbGJhY2tDaGFpbi5qb2luKCcsICcpfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubG9hZEFsbExhbmd1YWdlUGFja3MobGFuZywgYWxsU291cmNlRWxlbWVudHMsIGZhbGxiYWNrQ2hhaW4pO1xuICB9XG5cbiAgYXN5bmMgbG9hZEFsbExhbmd1YWdlUGFja3MobGFuZywgc291cmNlRWxlbWVudHMsIGZhbGxiYWNrQ2hhaW4gPSBbXSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBMb2FkIGFsbCBsYW5ndWFnZSBwYWNrc1xuICAgICAgbGV0IHByb21pc2VzID0gc291cmNlRWxlbWVudHMubWFwKChzb3VyY2VFbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCBwYWNrTGFuZyA9IHNvdXJjZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsYW5nJykgfHwgbGFuZztcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZExhbmd1YWdlUGFjayhwYWNrTGFuZywgc291cmNlRWxlbWVudCkudGhlbigodGVybXMpID0+ICh7XG4gICAgICAgICAgbGFuZzogIHBhY2tMYW5nLFxuICAgICAgICAgIHRlcm1zOiB0ZXJtcyxcbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGxTZXR0bGVkKHByb21pc2VzKTtcblxuICAgICAgLy8gR3JvdXAgdGVybXMgYnkgbGFuZ3VhZ2VcbiAgICAgIGxldCB0ZXJtc0J5TGFuZyA9IG5ldyBNYXAoKTtcbiAgICAgIGZvciAobGV0IHJlc3VsdCBvZiByZXN1bHRzKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzICE9PSAnZnVsZmlsbGVkJyB8fCAhcmVzdWx0LnZhbHVlIHx8ICFyZXN1bHQudmFsdWUudGVybXMpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgbGV0IHsgbGFuZzogcGFja0xhbmcsIHRlcm1zIH0gPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGxldCBiYXNlTGFuZyA9IHBhY2tMYW5nLnNwbGl0KCctJylbMF07XG5cbiAgICAgICAgLy8gU3RvcmUgdW5kZXIgYm90aCBmdWxsIGxhbmcgYW5kIGJhc2UgbGFuZyBmb3IgZmFsbGJhY2sgbWF0Y2hpbmdcbiAgICAgICAgaWYgKCF0ZXJtc0J5TGFuZy5oYXMocGFja0xhbmcpKVxuICAgICAgICAgIHRlcm1zQnlMYW5nLnNldChwYWNrTGFuZywgW10pO1xuXG4gICAgICAgIHRlcm1zQnlMYW5nLmdldChwYWNrTGFuZykucHVzaCh0ZXJtcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1lcmdlIHRlcm1zIGluIGZhbGxiYWNrIG9yZGVyIChsYXN0IGluIGNoYWluIGdldHMgbG93ZXN0IHByaW9yaXR5KVxuICAgICAgLy8gUmV2ZXJzZSB0aGUgY2hhaW4gc28gbW9yZSBzcGVjaWZpYyBsYW5ndWFnZXMgb3ZlcnJpZGUgZmFsbGJhY2tzXG4gICAgICBsZXQgbWVyZ2VkVGVybXMgPSB7fTtcbiAgICAgIGxldCByZXZlcnNlZENoYWluID0gWyAuLi5mYWxsYmFja0NoYWluIF0ucmV2ZXJzZSgpO1xuXG4gICAgICBmb3IgKGxldCBmYWxsYmFja0xhbmcgb2YgcmV2ZXJzZWRDaGFpbikge1xuICAgICAgICBsZXQgbGFuZ1Rlcm1zID0gdGVybXNCeUxhbmcuZ2V0KGZhbGxiYWNrTGFuZykgfHwgW107XG5cbiAgICAgICAgLy8gQWxzbyBjaGVjayBiYXNlIGxhbmd1YWdlXG4gICAgICAgIGlmIChmYWxsYmFja0xhbmcuaW5jbHVkZXMoJy0nKSkge1xuICAgICAgICAgIGxldCBiYXNlTGFuZyA9IGZhbGxiYWNrTGFuZy5zcGxpdCgnLScpWzBdO1xuICAgICAgICAgIGxldCBiYXNlVGVybXMgPSB0ZXJtc0J5TGFuZy5nZXQoYmFzZUxhbmcpIHx8IFtdO1xuICAgICAgICAgIGxhbmdUZXJtcyA9IFsgLi4uYmFzZVRlcm1zLCAuLi5sYW5nVGVybXMgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHRlcm1zIG9mIGxhbmdUZXJtcykge1xuICAgICAgICAgIG1lcmdlZFRlcm1zID0gZGVlcE1lcmdlKG1lcmdlZFRlcm1zLCB0ZXJtcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGNvbXBpbGVkVGVybXMgPSB0aGlzLmNvbXBpbGVMYW5ndWFnZVRlcm1zKGxhbmcsIG1lcmdlZFRlcm1zKTtcbiAgICAgIHRoaXMudGVybXMgPSBjb21waWxlZFRlcm1zO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdcIm15dGhpeC1sYW5ndWFnZS1wcm92aWRlclwiOiBGYWlsZWQgdG8gbG9hZCBsYW5ndWFnZSBwYWNrcycsIGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkTGFuZ3VhZ2VQYWNrKGxhbmcsIHNvdXJjZUVsZW1lbnQpIHtcbiAgICBsZXQgc3JjID0gc291cmNlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIGlmICghc3JjKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCB7IHJlc3BvbnNlIH0gID0gYXdhaXQgQ29tcG9uZW50VXRpbHMucmVxdWlyZS5jYWxsKHRoaXMsIHNyYywgeyBvd25lckRvY3VtZW50OiB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQgfSk7XG4gICAgICBsZXQgdHlwZSAgICAgICAgICA9IHRoaXMuZ2V0QXR0cmlidXRlKCdlbmN0eXBlJykgfHwgJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgaWYgKElTX0pTT05fRU5DVFlQRS50ZXN0KHR5cGUpKSB7XG4gICAgICAgIC8vIEhhbmRsZSBKU09OXG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXcgVHlwZUVycm9yKGBEb24ndCBrbm93IGhvdyB0byBsb2FkIGEgbGFuZ3VhZ2UgcGFjayBvZiB0eXBlIFwiJHt0eXBlfVwiYCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFwibXl0aGl4LWxhbmd1YWdlLXByb3ZpZGVyXCI6IEZhaWxlZCB0byBsb2FkIHNwZWNpZmllZCByZXNvdXJjZTogJHtzcmN9YCwgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBpbGVMYW5ndWFnZVRlcm1zKGxhbmcsIHRlcm1zKSB7XG4gICAgY29uc3Qgd2Fsa1Rlcm1zID0gKHRlcm1zLCByYXdLZXlQYXRoKSA9PiB7XG4gICAgICBsZXQga2V5cyAgICAgID0gT2JqZWN0LmtleXModGVybXMpO1xuICAgICAgbGV0IHRlcm1zQ29weSA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBrZXlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgbGV0IGtleSAgICAgICAgID0ga2V5c1tpXTtcbiAgICAgICAgbGV0IHZhbHVlICAgICAgID0gdGVybXNba2V5XTtcbiAgICAgICAgbGV0IG5ld0tleVBhdGggID0gcmF3S2V5UGF0aC5jb25jYXQoa2V5KTtcblxuICAgICAgICBpZiAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QodmFsdWUpIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgdGVybXNDb3B5W2tleV0gPSB3YWxrVGVybXModmFsdWUsIG5ld0tleVBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IFV0aWxzLmdldER5bmFtaWNQcm9wZXJ0eUZvclBhdGguY2FsbCh0aGlzLCBuZXdLZXlQYXRoLmpvaW4oJy4nKSwgdmFsdWUpO1xuICAgICAgICAgIHRlcm1zQ29weVtrZXldID0gcHJvcGVydHk7XG4gICAgICAgICAgcHJvcGVydHlbRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0ZXJtc0NvcHk7XG4gICAgfTtcblxuICAgIHJldHVybiB3YWxrVGVybXModGVybXMsIFsgJ2dsb2JhbCcsICdpMThuJyBdKTtcbiAgfVxufVxuXG5NeXRoaXhVSUxhbmd1YWdlUGFjay5yZWdpc3RlcigpO1xuTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyLnJlZ2lzdGVyKCk7XG5cbihnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pKS5NeXRoaXhVSUxhbmd1YWdlUGFjayA9IE15dGhpeFVJTGFuZ3VhZ2VQYWNrO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5NeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXIgPSBNeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXI7XG4iLCJpbXBvcnQgKiBhcyBDb21wb25lbnRVdGlscyBmcm9tICcuL2NvbXBvbmVudC11dGlscy5qcyc7XG5pbXBvcnQgeyBNeXRoaXhVSUNvbXBvbmVudCB9IGZyb20gJy4vbXl0aGl4LXVpLWNvbXBvbmVudC5qcyc7XG5cbmNvbnN0IElTX1RFTVBMQVRFICAgICAgID0gL14odGVtcGxhdGUpJC9pO1xuY29uc3QgVEVNUExBVEVfVEVNUExBVEUgPSAvXihcXCp8XFx8XFwqfFxcKlxcfCkkLztcblxuLyoqXG4gKiB0eXBlOiBNeXRoaXhFbGVtZW50XG4gKiBuYW1lOiBNeXRoaXhVSVJlcXVpcmVcbiAqIGdyb3VwTmFtZTogTXl0aGl4RWxlbWVudHNcbiAqIGRlc2M6IHxcbiAqICAgYGBgamF2YXNjcmlwdFxuICogICBpbXBvcnQgeyBNeXRoaXhFbGVtZW50cyB9IGZyb20gJ215dGhpeC11aS1jb3JlQDEuMCc7XG4gKlxuICogICBjb25zdCB7XG4gKiAgICAgTXl0aGl4VUlSZXF1aXJlLFxuICogICB9ID0gTXl0aGl4RWxlbWVudHM7XG4gKiAgIGBgYFxuICpcbiAqICAgTXl0aGl4VUlSZXF1aXJlIGlzIGFuIEVsZW1lbnQgdGhhdCB3aWxsIGxvYWQgb3RoZXIgcmVzb3VyY2VzLiBJdCBpcyBpbnNwaXJlZCBieSBhbmQgbmFtZWQgYWZ0ZXIgYHJlcXVpcmVgIGluIE5vZGUuIEl0IHdvcmtzIHZlcnkgc2ltaWxhcmx5IGFzIHdlbGwsIHNvIG5vdCB0b28gbXVjaCBuZWVkcyB0byBiZSBleHBsYWluZWQgYWJvdXQgaXQuXG4gKlxuICogICBFeGNlcHQgTXl0aGl4IFVJIHN0YW5kYXJkIGNvbXBvbmVudCBmaWxlIHN0cnVjdHVyZSBtYXliZS4uLiBZZWFoLCBtYXliZSB3ZSBzaG91bGQgZGlzY3VzcyB0aGF0LlxuICpcbiAqICAgVGhlIGA8bXl0aGl4LXJlcXVpcmUgc3JjPVwiLi9jb21wb25lbnRzL3dpZGdldC5odG1sXCI+YCB0YWcgYWxsb3dzIHlvdSB0byBsb2FkIG90aGVyIHJlc291cmNlcyBzaW1wbHkgYnkgc3BlY2lmeWluZyBhIHBhdGguIFRoaXMgcGF0aCBjYW4gYmUgcmVsYXRpdmUsIG9yIGFic29sdXRlLiBUaGUgcGF0aCBjYW4gY29udGFpbiBxdWVyeSBwYXJhbWV0ZXJzLlxuICpcbiAqICAgWW91IG1heSBoYXZlIG5vdGljZWQgdGhhdCB0aGUgdGFnIG5hbWUgZG9lc24ndCBxdWl0ZSBtYXRjaCB0aGUgY2xhc3MgbmFtZSwgYE15dGhpeFVJUmVxdWlyZWAsIHZzIGA8bXl0aGl4LXJlcXVpcmU+YC4gVGhpcyBkZXZpYXRpb24gd2FzIGNob3NlbiBieSB0aGUgTXl0aGl4IGRldmVsb3BtZW50IHRlYW0gYmVjYXVzZSBNeXRoaXggaXMgYW4gZW50aXJlIGVjb3N5c3RlbSwgbm90IGp1c3QgYSBVSSBmcmFtZXdvcmsuIEZvciB0aGlzIHJlYXNvbiwgYW5kIGluIHBhcnQgdG8gYXZvaWQgZnV0dXJlIG5hbWluZyBjb2xsaXNpb25zLCB3ZSBoYXZlIGRlY2lkZWQgdGhhdCBpbiBjb2RlLCB0aGUgY2xhc3MgbmFtZSBzaG91bGQgY29udGFpbiB0aGUgYFVJYCBwYXJ0IHRvIGRlbGltaXQgaXQgZnJvbSBvdGhlciBNeXRoaXggdGVjaG5vbG9naWVzLiBOZXh0LCB3ZSBmZWx0IGNvbnN0YW50bHkgdHlwaW5nIGA8bXl0aGl4LXVpLXJlcXVpcmU+YCBpbiBIVE1MLCB2cyB0aGUgbmljZXIgYDxteXRoaXgtcmVxdWlyZT5gIHdhcyBraW5kYSBzaWxseS4gQmVzaWRlcywgaW4gSFRNTCwgeW91IEFSRSBpbiB0aGUgVUkgY29udGV4dCwgc28gd2h5IHJlcGVhdCBvdXJzZWx2ZXM/IEFueWhvdywgdGhpcyBpcyBqdXN0IGEgbGl0dGxlIG5vdGUgdG8ga2VlcCBpbiBtaW5kLiBUaGUgRWxlbWVudCBjbGFzcyBuYW1lcyBkbyBub3QgbWF0Y2ggdGhlIEVsZW1lbnQgYHRhZ05hbWVgIGZvciBNeXRoaXggVUkgc3RhbmRhcmQgY29tcG9uZW50cy5cbiAqXG4gKiAgIElmIGA8bXl0aGl4LXJlcXVpcmU+YCBpcyB1c2VkIHRvIGZldGNoIGEgSmF2YVNjcmlwdCByZXNvdXJjZSwgdGhlbiBpdCBiZWhhdmVzIGFsbW9zdCBpZGVudGljYWxseSB0byBhIGA8c2NyaXB0PmAgdGFnLiBJZiBob3dldmVyIGl0IGlzIGJlaW5nIHVzZWQgdG8gZmV0Y2ggYW5vdGhlciB0eXBlIG9mIGtub3duIHJlc291cmNlLCBzdWNoIGFzIHRleHQvaHRtbCwgdGhlbiBpdCB3aWxsIGJlaGF2ZSBkaWZmZXJlbnRseS5cbiAqXG4gKiAgIFdoZW4gYW4gSFRNTCBmaWxlIGlzIGZldGNoZWQgYnkgYSBgPG15dGhpeC1yZXF1aXJlPmAgZWxlbWVudCwgdGhlbiBhbnkgaW50ZXJuYWwgYDxzY3JpcHQ+YCwgYDxzdHlsZT5gLCBvciBvdGhlciB0YWcgdGhhdCBiZWxvbmdzIGluIHRoZSBgPGhlYWQ+YCB0YWcgd2lsbCBiZSBwbGFjZWQgaW4gdGhlIGA8aGVhZD5gIHRhZyBvZiB0aGUgZG9jdW1lbnQuIER1cGxpY2F0ZSBpbnNlcnRzIGFyZSBwcmV2ZW50ZWQgYnkgdXNlIG9mIHRhZyBpZHMuIElmIGEgdGFnIGluIHRoZSBgPGhlYWQ+YCBvZiB0aGUgZG9jdW1lbnQgYWxyZWFkeSBoYXMgdGhlIHNhbWUgaWQgYXMgb25lIE15dGhpeFVJUmVxdWlyZSBpcyB0cnlpbmcgdG8gaW5zZXJ0LCB0aGVuIE15dGhpeFVJUmVxdWlyZSB3aWxsIGFib3J0LCBhbmQgaXQgd29uJ3QgZHVwbGljYXRlIGluc2VydGluZyBzYWlkIGVsZW1lbnQuXG4gKlxuICogICBPdGhlciBlbGVtZW50cyBhcmUgdHJlYXRlZCBzcGVjaWFsbHkgYXMgd2VsbCB3aGVuIGVuY291bnRlcmVkIGluIHRoZSBsb2FkZWQgSFRNTCBmaWxlLiBCZWxvdyBpcyBhIHRhYmxlIG9mIHNwZWNpYWwgY2FzZXM6XG4gKlxuICogICB8IEVsZW1lbnRzIHwgTm90ZXMgfFxuICogICB8LS0tLS0tfC0tLS0tLS18XG4gKiAgIHwgYDxsaW5rPmAsIGA8c3R5bGU+YCwgYDxtZXRhPmAgfCBBcmUgYXBwZW5kZWQgdG8gdGhlIGA8aGVhZD5gIG9mIHRoZSBkb2N1bWVudC4gfFxuICogICB8IGA8c2NyaXB0PmAgfCBJcyBhcHBlbmRlZCB0byB0aGUgYDxoZWFkPmAgb2YgdGhlIGRvY3VtZW50IGFmdGVyIHRoZSBgc3JjYCBhdHRyaWJ1dGUgaXMgZnVsbHkgcmVzb2x2ZWQuIHxcbiAqICAgfCBgPHRlbXBsYXRlPmAgfCBJcyBhcHBlbmRlZCB0byB0aGUgYm90dG9tIG9mIHRoZSBgPGJvZHk+YCBvZiB0aGUgZG9jdW1lbnQuIHxcbiAqICAgfCBgPGJhc2U+YCwgYDxub3NjcmlwdD5gLCBgPHRpdGxlPmAgfCBBcmUgZGVsaWJlcmF0ZWx5IGRpc2NhcmRlZC4gfFxuICogICB8IEFsbCBvdGhlcnMgfCBBcmUgYXBwZW5kZWQgdG8gdGhlIGA8Ym9keT5gIG9mIHRoZSBkb2N1bWVudC4gfFxuICpcbiAqIG5vdGVzOlxuICogICAtIHxcbiAqICAgICA6aW5mbzogYGdsb2JhbFRoaXMubXl0aGl4VUkudXJsUmVzb2x2ZXI6IChjb250ZXh0OiB7IHNyYzogc3RyaW5nIHwgVVJMLCB1cmw6IFVSTCwgcGF0aDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nIH0pID0+IHN0cmluZyB8IFVSTGAgaXMgYSBtZXRob2QgdGhhdCBjYW4gYmUgZGVmaW5lZCBieSB0aGUgdXNlci4gV2hlbiBkZWZpbmVkLCBpdCB3aWxsIGJlIGNhbGxlZCBldmVyeSB0aW1lIEBzZWUgQ29tcG9uZW50VXRpbHMucmVzb2x2ZVVSTDsgaXMgY2FsbGVkLiBgTXl0aGl4VUlSZXF1aXJlYCBjYWxscyBAc2VlIENvbXBvbmVudFV0aWxzLnJlc29sdmVVUkw7IHRvIHJlc29sdmUgVVJMcywgaW5jbHVkaW5nIGluIHN1YiBgPHNjcmlwdD5gIHRhZyBgc3JjYCBhdHRyaWJ1dGVzIGxvYWRlZCBmcm9tIHJlc291cmNlcy4gSXQgaXMgdGhlIGludGVudCBvZiB0aGlzIG1ldGhvZCB0aGF0IGl0IHdpbGwgZ2xvYmFsbHkgcmVzb2x2ZSBhbGwgVVJMcyBpbnRlcm5hbCB0byB0aGUgTXl0aGl4IFVJIGZyYW1ld29yay4gT2J2aW91c2x5IGl0IHdvbid0IHJlc29sdmUgVVJMcyBkaXJlY3RseSBmcm9tIHN0YXRpYyBgaW1wb3J0YCBvciBkeW5hbWljIGBpbXBvcnQoKWAgc3RhdGVtZW50cyBpbiBKYXZhU2NyaXB0LiBUaG9zZSBhcmUgaGFuZGxlZCBieSB0aGUgW2ltcG9ydG1hcF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSFRNTC9FbGVtZW50L3NjcmlwdC90eXBlL2ltcG9ydG1hcCkgeW91IHNldHVwLCByZW1lbWJlcj8uXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgQW5vdGhlciBjb21wb25lbnQgY2FuIGJlIGxvYWRlZCBkeW5hbWljYWxseS0tdXN1YWxseSBieSBsb2FkaW5nIGl0cyBjb3JyZXNwb25kaW5nIEhUTUwgZmlsZSAod2hpY2ggd2lsbCBnZW5lcmFsbHkgdGhlbiBsb2FkIHRoZSBgPHNjcmlwdD5gIHJlcXVpcmUgYnkgdGhlIGNvbXBvbmVudCkuIEluIHRoZSBleGFtcGxlIGJlbG93IHdlIGFyZSBsb2FkaW5nIHRoZSBzdGFuZGFyZCBtb2RhbCBjb21wb25lbnQgcHJvdmlkZWQgYnkgTXl0aGl4IFVJOlxuICogICAgIGBgYGh0bWxcbiAqICAgICA8bXl0aGl4LXJlcXVpcmUgc3JjPVwiQGNkbi9teXRoaXgtdWktbW9kYWxAJHt7bWFqb3JWZXJzaW9ufX0vZGlzdC9teXRoaXgtdWktbW9kYWwuaHRtbFwiPjwvbXl0aGl4LXJlcXVpcmU+XG4gKiAgICAgYGBgXG4gKi9cblxubGV0IFJFUVVJUkVfSEFORExFUlMgPSBbXTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJSZXF1aXJlSGFuZGxlcihwYXR0ZXJuLCBjYWxsYmFjaykge1xuICBSRVFVSVJFX0hBTkRMRVJTLnVuc2hpZnQoe1xuICAgIHBhdHRlcm4sXG4gICAgY2FsbGJhY2ssXG4gIH0pO1xufVxuXG5yZWdpc3RlclJlcXVpcmVIYW5kbGVyKC9cXC5odG1sJC9pLCBhc3luYyBmdW5jdGlvbih7IHVybCwgb3duZXJEb2N1bWVudCwgZmV0Y2hPcHRpb25zIH0pIHtcbiAgbGV0IHtcbiAgICByZXNwb25zZSxcbiAgICBjYWNoZWQsXG4gIH0gPSBhd2FpdCBDb21wb25lbnRVdGlscy5yZXF1aXJlLmNhbGwoXG4gICAgdGhpcyxcbiAgICB1cmwsXG4gICAge1xuICAgICAgbWFnaWM6ICAgICAgICAgIGZhbHNlLFxuICAgICAgb3duZXJEb2N1bWVudDogIG93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQsXG4gICAgICBmZXRjaE9wdGlvbnM6ICAgZmV0Y2hPcHRpb25zLFxuICAgIH0sXG4gICk7XG5cbiAgaWYgKGNhY2hlZClcbiAgICByZXR1cm4gdHJ1ZTtcblxuICBsZXQgYm9keSA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgQ29tcG9uZW50VXRpbHMuaW1wb3J0SW50b0RvY3VtZW50RnJvbVNvdXJjZS5jYWxsKFxuICAgIHRoaXMsXG4gICAgb3duZXJEb2N1bWVudCxcbiAgICBvd25lckRvY3VtZW50LmxvY2F0aW9uLFxuICAgIHVybCxcbiAgICBib2R5LFxuICAgIHtcbiAgICAgIG1hZ2ljOiAgICAgICAgdHJ1ZSxcbiAgICAgIG5vZGVIYW5kbGVyOiAgKG5vZGUsIHsgaXNIYW5kbGVkIH0pID0+IHtcbiAgICAgICAgaWYgKCFpc0hhbmRsZWQgJiYgbm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgIH0sXG4gICAgICBwcmVQcm9jZXNzOiAgICh7IHRlbXBsYXRlLCBjaGlsZHJlbiB9KSA9PiB7XG4gICAgICAgIGxldCBzdGFyVGVtcGxhdGUgPSBjaGlsZHJlbi5maW5kKChjaGlsZCkgPT4ge1xuICAgICAgICAgIGxldCBkYXRhRm9yID0gY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWZvcicpO1xuICAgICAgICAgIHJldHVybiAoSVNfVEVNUExBVEUudGVzdChjaGlsZC50YWdOYW1lKSAmJiBURU1QTEFURV9URU1QTEFURS50ZXN0KGRhdGFGb3IpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFzdGFyVGVtcGxhdGUpXG4gICAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuXG4gICAgICAgIGxldCBkYXRhRm9yID0gc3RhclRlbXBsYXRlLmdldEF0dHJpYnV0ZSgnZGF0YS1mb3InKTtcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICBpZiAoY2hpbGQgPT09IHN0YXJUZW1wbGF0ZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKElTX1RFTVBMQVRFLnRlc3QoY2hpbGQudGFnTmFtZSkpIHsgLy8gPHRlbXBsYXRlPlxuICAgICAgICAgICAgbGV0IHN0YXJDbG9uZSA9IHN0YXJUZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgIGlmIChkYXRhRm9yID09PSAnKnwnKVxuICAgICAgICAgICAgICBjaGlsZC5jb250ZW50Lmluc2VydEJlZm9yZShzdGFyQ2xvbmUsIGNoaWxkLmNvbnRlbnQuY2hpbGROb2Rlc1swXSB8fCBudWxsKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY2hpbGQuY29udGVudC5hcHBlbmRDaGlsZChzdGFyQ2xvbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJUZW1wbGF0ZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0YXJUZW1wbGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfSxcbiAgICB9LFxuICApO1xuXG4gIHJldHVybiB0cnVlO1xufSk7XG5cbnJlZ2lzdGVyUmVxdWlyZUhhbmRsZXIoL1xcLmpzJC9pLCBhc3luYyBmdW5jdGlvbih7IHVybCwgb3duZXJEb2N1bWVudCB9KSB7XG4gIGxldCByZXN1bHQgPSBDb21wb25lbnRVdGlscy5pbnNlcnRTY3JpcHRJbnRvSGVhZCh1cmwsIHsgb3duZXJEb2N1bWVudCB9KTtcbiAgY29uc29sZS5sb2coeyBzY3JpcHRFbGVtZW50OiByZXN1bHQgfSk7XG4gIHJldHVybiB0cnVlO1xufSk7XG5cbmV4cG9ydCBjbGFzcyBNeXRoaXhVSVJlcXVpcmUgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gIHN0YXRpYyByZWdpc3RlckhhbmRsZXIgPSByZWdpc3RlclJlcXVpcmVIYW5kbGVyO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZlZCBhdHRyaWJ1dGVzIGluY2x1ZGluZyBjYWNoZSBtb2RlIGNvbnRyb2wuXG4gICAqL1xuICBzdGF0aWMgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gWyAnc3JjJywgJ2NhY2hlJyBdO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGZldGNoIG9wdGlvbnMgaW5jbHVkaW5nIGNhY2hlIG1vZGUuXG4gICAqIFRoZSBgY2FjaGVgIGF0dHJpYnV0ZSBjb250cm9scyBIVFRQIGNhY2hpbmcgYmVoYXZpb3I6XG4gICAqIC0gJ2RlZmF1bHQnOiBCcm93c2VyIHVzZXMgSFRUUCBjYWNoZSBoZWFkZXJzIChDYWNoZS1Db250cm9sLCBFVGFnLCBldGMuKVxuICAgKiAtICduby1zdG9yZSc6IEJ5cGFzcyBjYWNoZSBjb21wbGV0ZWx5XG4gICAqIC0gJ3JlbG9hZCc6IEZldGNoIGZyZXNoIGJ1dCB1cGRhdGUgY2FjaGVcbiAgICogLSAnbm8tY2FjaGUnOiBBbHdheXMgcmV2YWxpZGF0ZSB3aXRoIHNlcnZlclxuICAgKiAtICdmb3JjZS1jYWNoZSc6IFVzZSBjYWNoZSBpZiBhdmFpbGFibGUsIGV2ZW4gaWYgc3RhbGVcbiAgICpcbiAgICogQHJldHVybnMge29iamVjdH0gRmV0Y2ggb3B0aW9ucyBvYmplY3QuXG4gICAqL1xuICBnZXRGZXRjaE9wdGlvbnMoKSB7XG4gICAgbGV0IGNhY2hlTW9kZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdjYWNoZScpO1xuXG4gICAgaWYgKGNhY2hlTW9kZSAmJiAvXihkZWZhdWx0fG5vLXN0b3JlfHJlbG9hZHxuby1jYWNoZXxmb3JjZS1jYWNoZXxvbmx5LWlmLWNhY2hlZCkkLy50ZXN0KGNhY2hlTW9kZSkpXG4gICAgICByZXR1cm4geyBjYWNoZTogY2FjaGVNb2RlIH07XG5cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBhc3luYyBtb3VudGVkKCkge1xuICAgIHN1cGVyLm1vdW50ZWQoKTtcblxuICAgIGxldCBzcmMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IG93bmVyRG9jdW1lbnQgPSB0aGlzLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gICAgICBsZXQgdXJsICAgICAgICAgICA9IENvbXBvbmVudFV0aWxzLnJlc29sdmVVUkwuY2FsbCh0aGlzLCBvd25lckRvY3VtZW50LmxvY2F0aW9uLCBzcmMsIHsgbWFnaWM6IHRydWUgfSk7XG4gICAgICBsZXQgZmV0Y2hPcHRpb25zICA9IHRoaXMuZ2V0RmV0Y2hPcHRpb25zKCk7XG5cbiAgICAgIGZvciAobGV0IFsgaW5kZXgsIGhhbmRsZXIgXSBvZiBSRVFVSVJFX0hBTkRMRVJTLmVudHJpZXMoKSkge1xuICAgICAgICBsZXQge1xuICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgIH0gPSBoYW5kbGVyO1xuXG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3QodXJsKSkge1xuICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBjYWxsYmFjay5jYWxsKHRoaXMsIHsgc3JjLCB1cmwsIGluZGV4LCBvd25lckRvY3VtZW50LCBmZXRjaE9wdGlvbnMgfSk7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFwibXl0aGl4LXJlcXVpcmVcIjogRmFpbGVkIHRvIGxvYWQgc3BlY2lmaWVkIHJlc291cmNlOiAke3NyY31gLCBlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hTcmMoKSB7XG4gICAgLy8gTk9PUFxuICB9XG59XG5cbihnbG9iYWxUaGlzLm15dGhpeFVJID0gKGdsb2JhbFRoaXMubXl0aGl4VUkgfHwge30pKS5NeXRoaXhVSVJlcXVpcmUgPSBNeXRoaXhVSVJlcXVpcmU7XG5cbmlmICh0eXBlb2YgY3VzdG9tRWxlbWVudHMgIT09ICd1bmRlZmluZWQnICYmICFjdXN0b21FbGVtZW50cy5nZXQoJ215dGhpeC1yZXF1aXJlJykpXG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbXl0aGl4LXJlcXVpcmUnLCBNeXRoaXhVSVJlcXVpcmUpO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tbWFnaWMtbnVtYmVycyAqL1xuXG5pbXBvcnQgeyBNeXRoaXhVSUNvbXBvbmVudCB9IGZyb20gJy4vbXl0aGl4LXVpLWNvbXBvbmVudC5qcyc7XG5cbi8qXG5NYW55IHRoYW5rcyB0byBTYWdlZSBDb253YXkgZm9yIHRoZSBmb2xsb3dpbmcgQ1NTIHNwaW5uZXJzXG5odHRwczovL2NvZGVwZW4uaW8vc2Fjb253YXkvcGVuL3ZZS1l5cnhcbiovXG5cbmNvbnN0IFNUWUxFX1NIRUVUID1cbmBcbjpob3N0IHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zaXplOiAxZW07XG4gIHdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbjpob3N0KC5zbWFsbCkge1xuICAtLW15dGhpeC1zcGlubmVyLXNpemU6IGNhbGMoMWVtICogMC43NSk7XG59XG46aG9zdCgubWVkaXVtKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2l6ZTogY2FsYygxZW0gKiAxLjUpO1xufVxuOmhvc3QoLmxhcmdlKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2l6ZTogY2FsYygxZW0gKiAzKTtcbn1cbi5zcGlubmVyLWl0ZW0sXG4uc3Bpbm5lci1pdGVtOjpiZWZvcmUsXG4uc3Bpbm5lci1pdGVtOjphZnRlciB7XG5cdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgd2lkdGg6IDExJTtcbiAgaGVpZ2h0OiA2MCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWF1ZGlvLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMCkgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLWF1ZGlvLWFuaW1hdGlvbiB7XG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMC4yNSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAvIDEwICogLTMpO1xufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMikge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpIC8gMTAgKiAtMSk7XG59XG46aG9zdChba2luZD1cImF1ZGlvXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgzKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgLyAxMCAqIC0yKTtcbn1cbjpob3N0KFtraW5kPVwiYXVkaW9cIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDQpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjQsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAvIDEwICogLTEpO1xufVxuOmhvc3QoW2tpbmQ9XCJhdWRpb1wiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoNSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yNSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpIC8gMTAgKiAtMyk7XG59XG46aG9zdChba2luZD1cImNpcmNsZVwiXSkgLnNwaW5uZXItaXRlbSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzczogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAqIDAuMDc1KTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICB0b3A6IGNhbGMoNTAlIC0gdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKSAvIDIpO1xuICBsZWZ0OiBjYWxjKDUwJSAtIHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSkgLyAyKTtcbiAgYm9yZGVyOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWxlZnQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpIHNvbGlkIHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBib3JkZXItcmlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLWNpcmNsZS10aGlja25lc3MpIHNvbGlkIHZhcigtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3IpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMCkgbGluZWFyIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIHtcbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwiY2lyY2xlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1vZi10eXBlKDEpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemU6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAxLjApO1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBib3JkZXItdG9wOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1jaXJjbGUtdGhpY2tuZXNzKSAqIDAuMDc1KSBzb2xpZCB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjEsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1jaXJjbGUtYW5pbWF0aW9uIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4wKSBsaW5lYXIgaW5maW5pdGU7XG59XG46aG9zdChba2luZD1cImNpcmNsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtb2YtdHlwZSgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMC43KTtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYm9yZGVyLWJvdHRvbTogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgc29saWQgdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDAuODc1KSBsaW5lYXIgaW5maW5pdGU7XG59XG46aG9zdChba2luZD1cImNpcmNsZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtb2YtdHlwZSgzKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMC40KTtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYm9yZGVyLXRvcDogdmFyKC0tbXl0aGl4LXNwaW5uZXItY2lyY2xlLXRoaWNrbmVzcykgc29saWQgdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItY2lyY2xlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDAuNzUpIGxpbmVhciBpbmZpbml0ZTtcbn1cbjpob3N0KFtraW5kPVwicHV6emxlXCJdKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgKiAwLjEpKSByb3RhdGUoNDVkZWcpO1xufVxuOmhvc3QoW2tpbmQ9XCJwdXp6bGVcIl0pIC5zcGlubmVyLWl0ZW0ge1xuICAtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZTogY2FsYyh2YXIoLS1teXRoaXgtc3Bpbm5lci1zaXplKSAvIDIuNSk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLWl0ZW0tc2l6ZSk7XG4gIGhlaWdodDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgYm9yZGVyOiBjYWxjKHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpICogMC4xKSBzb2xpZCB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbn1cbjpob3N0KFtraW5kPVwicHV6emxlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMSBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDUuMCkgbGluZWFyIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMSB7XG4gIDAlLCA4LjMzJSwgMTYuNjYlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMCUpO1xuICB9XG4gIDI0Ljk5JSwgMzMuMzIlLCA0MS42NSUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDEwMCUsIDAlKTtcbiAgfVxuICA0OS45OCUsIDU4LjMxJSwgNjYuNjQlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAxMDAlKTtcbiAgfVxuICA3NC45NyUsIDgzLjMwJSwgOTEuNjMlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMTAwJSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwicHV6emxlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgyKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IyLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIHRvcDogMDtcbiAgbGVmdDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDUuMCkgbGluZWFyIGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1wdXp6bGUtYW5pbWF0aW9uMiB7XG4gIDAlLCA4LjMzJSwgOTEuNjMlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwJSwgMCUpO1xuICB9XG4gIDE2LjY2JSwgMjQuOTklLCAzMy4zMiUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAlLCAxMDAlKTtcbiAgfVxuICA0MS42NSUsIDQ5Ljk4JSwgNTguMzElIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgMTAwJSk7XG4gIH1cbiAgNjYuNjQlLCA3NC45NyUsIDgzLjMwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwMCUsIDAlKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJwdXp6bGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDMpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgdG9wOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBsZWZ0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24zIGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogNS4wKSBsaW5lYXIgaW5maW5pdGU7XG59XG5Aa2V5ZnJhbWVzIG15dGhpeC1zcGlubmVyLXB1enpsZS1hbmltYXRpb24zIHtcbiAgMCUsIDgzLjMwJSwgOTEuNjMlLCAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcbiAgfVxuICA4LjMzJSwgMTYuNjYlLCAyNC45OSUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAwKTtcbiAgfVxuICAzMy4zMiUsIDQxLjY1JSwgNDkuOTglIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMTAwJSwgLTEwMCUpO1xuICB9XG4gIDU4LjMxJSwgNjYuNjQlLCA3NC45NyUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0xMDAlKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJ3YXZlXCJdKSAuc3Bpbm5lci1pdGVtIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemU6IGNhbGModmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgLyA0KTtcbiAgbWluLXdpZHRoOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICB3aWR0aDogdmFyKC0tbXl0aGl4LXNwaW5uZXItaXRlbS1zaXplKTtcbiAgaGVpZ2h0OiB2YXIoLS1teXRoaXgtc3Bpbm5lci1pdGVtLXNpemUpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcik7XG4gIGFuaW1hdGlvbjogbXl0aGl4LXNwaW5uZXItd2F2ZS1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSBlYXNlLWluLW91dCBpbmZpbml0ZTtcbn1cbkBrZXlmcmFtZXMgbXl0aGl4LXNwaW5uZXItd2F2ZS1hbmltYXRpb24ge1xuICAwJSwgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDc1JSk7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTc1JSk7XG4gIH1cbn1cbjpob3N0KFtraW5kPVwid2F2ZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDYgKiAtMSk7XG59XG46aG9zdChba2luZD1cIndhdmVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyA2ICogLTIpO1xufVxuOmhvc3QoW2tpbmQ9XCJ3YXZlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgzKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IzLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gNiAqIC0zKTtcbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbSB7XG4gIHdpZHRoOiAxMSU7XG4gIGhlaWdodDogNDAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYW5pbWF0aW9uOiBteXRoaXgtc3Bpbm5lci1waXBlLWFuaW1hdGlvbiBjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIGVhc2UtaW4tb3V0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1waXBlLWFuaW1hdGlvbiB7XG4gIDI1JSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZVkoMik7XG4gIH1cbiAgNTAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlWSgxKTtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCgxKSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3IxLCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDIpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjIsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyAxMCk7XG59XG46aG9zdChba2luZD1cInBpcGVcIl0pIC5zcGlubmVyLWl0ZW06bnRoLWNoaWxkKDMpIHtcbiAgLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yOiB2YXIoLS10aGVtZS1teXRoaXgtc3Bpbm5lci1jb2xvcjMsIHZhcigtLXRoZW1lLXByaW1hcnktY29sb3IsICMzMzMpKTtcbiAgYW5pbWF0aW9uLWRlbGF5OiBjYWxjKGNhbGModmFyKC0tdGhlbWUtYW5pbWF0aW9uLWR1cmF0aW9uLCAxMDAwbXMpICogMS4xNSkgLyAxMCAqIDIpO1xufVxuOmhvc3QoW2tpbmQ9XCJwaXBlXCJdKSAuc3Bpbm5lci1pdGVtOm50aC1jaGlsZCg0KSB7XG4gIC0tbXl0aGl4LXNwaW5uZXItc2VnbWVudC1jb2xvcjogdmFyKC0tdGhlbWUtbXl0aGl4LXNwaW5uZXItY29sb3I0LCB2YXIoLS10aGVtZS1wcmltYXJ5LWNvbG9yLCAjMzMzKSk7XG4gIGFuaW1hdGlvbi1kZWxheTogY2FsYyhjYWxjKHZhcigtLXRoZW1lLWFuaW1hdGlvbi1kdXJhdGlvbiwgMTAwMG1zKSAqIDEuMTUpIC8gMTAgKiAzKTtcbn1cbjpob3N0KFtraW5kPVwicGlwZVwiXSkgLnNwaW5uZXItaXRlbTpudGgtY2hpbGQoNSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yNSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAxLjE1KSAvIDEwICogNCk7XG59XG46aG9zdChba2luZD1cImRvdFwiXSkgLnNwaW5uZXItaXRlbSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiBjYWxjKDUwJSAtIHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpIC8gMik7XG4gIGxlZnQ6IGNhbGMoNTAlIC0gdmFyKC0tbXl0aGl4LXNwaW5uZXItc2l6ZSkgLyAyKTtcbiAgd2lkdGg6IHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpO1xuICBoZWlnaHQ6IHZhcigtLW15dGhpeC1zcGlubmVyLXNpemUpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1teXRoaXgtc3Bpbm5lci1zZWdtZW50LWNvbG9yKTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBhbmltYXRpb246IG15dGhpeC1zcGlubmVyLWRvdC1hbmltYXRpb24gY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAzLjApIGVhc2UtaW4tb3V0IGluZmluaXRlO1xufVxuQGtleWZyYW1lcyBteXRoaXgtc3Bpbm5lci1kb3QtYW5pbWF0aW9uIHtcbiAgMCUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC4yNSk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxufVxuOmhvc3QoW2tpbmQ9XCJkb3RcIl0pIC5zcGlubmVyLWl0ZW06bnRoLW9mLXR5cGUoMSkge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMSwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xufVxuOmhvc3QoW2tpbmQ9XCJkb3RcIl0pIC5zcGlubmVyLWl0ZW06bnRoLW9mLXR5cGUoMikge1xuICAtLW15dGhpeC1zcGlubmVyLXNlZ21lbnQtY29sb3I6IHZhcigtLXRoZW1lLW15dGhpeC1zcGlubmVyLWNvbG9yMiwgdmFyKC0tdGhlbWUtcHJpbWFyeS1jb2xvciwgIzMzMykpO1xuICBhbmltYXRpb24tZGVsYXk6IGNhbGMoY2FsYyh2YXIoLS10aGVtZS1hbmltYXRpb24tZHVyYXRpb24sIDEwMDBtcykgKiAzLjApIC8gLTIpO1xufVxuYDtcblxuY29uc3QgS0lORFMgPSB7XG4gICdhdWRpbyc6ICA1LFxuICAnY2lyY2xlJzogMyxcbiAgJ2RvdCc6ICAgIDIsXG4gICdwaXBlJzogICA1LFxuICAncHV6emxlJzogMyxcbiAgJ3dhdmUnOiAgIDMsXG59O1xuXG5leHBvcnQgY2xhc3MgTXl0aGl4VUlTcGlubmVyIGV4dGVuZHMgTXl0aGl4VUlDb21wb25lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9ICdteXRoaXgtc3Bpbm5lcic7XG5cbiAgc2V0IGF0dHIka2luZChbIG5ld1ZhbHVlIF0pIHtcbiAgICB0aGlzLmhhbmRsZUtpbmRBdHRyaWJ1dGVDaGFuZ2UobmV3VmFsdWUpO1xuICB9XG5cbiAgbW91bnRlZCgpIHtcbiAgICBzdXBlci5tb3VudGVkKCk7XG5cbiAgICBpZiAoIXRoaXMuZG9jdW1lbnRJbml0aWFsaXplZCkge1xuICAgICAgLy8gYXBwZW5kIHRlbXBsYXRlXG4gICAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgICAgIHRoaXMuJGJ1aWxkKCh7IFRFTVBMQVRFIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIFRFTVBMQVRFXG4gICAgICAgICAgLmRhdGFGb3IodGhpcy5zZW5zaXRpdmVUYWdOYW1lKVxuICAgICAgICAgIC5wcm9wJGlubmVySFRNTChgPHN0eWxlPiR7U1RZTEVfU0hFRVR9PC9zdHlsZT5gKTtcbiAgICAgIH0pLmFwcGVuZFRvKG93bmVyRG9jdW1lbnQuYm9keSk7XG5cbiAgICAgIGxldCB0ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGUgPSB0aGlzLmdldENvbXBvbmVudFRlbXBsYXRlKCk7XG4gICAgICB0aGlzLmFwcGVuZFRlbXBsYXRlVG9TaGFkb3dET00odGVtcGxhdGUpO1xuICAgIH1cblxuICAgIGxldCBraW5kID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2tpbmQnKTtcbiAgICBpZiAoIWtpbmQpIHtcbiAgICAgIGtpbmQgPSAncGlwZSc7XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgna2luZCcsIGtpbmQpO1xuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlS2luZEF0dHJpYnV0ZUNoYW5nZShraW5kKTtcbiAgfVxuXG4gIGhhbmRsZUtpbmRBdHRyaWJ1dGVDaGFuZ2UoX2tpbmQpIHtcbiAgICBsZXQga2luZCAgICAgICAgPSAoJycgKyBfa2luZCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChLSU5EUywga2luZCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgXCJteXRoaXgtc3Bpbm5lclwiIHVua25vd24gXCJraW5kXCIgcHJvdmlkZWQ6IFwiJHtraW5kfVwiLiBTdXBwb3J0ZWQgXCJraW5kXCIgYXR0cmlidXRlIHZhbHVlcyBhcmU6IFwicGlwZVwiLCBcImF1ZGlvXCIsIFwiY2lyY2xlXCIsIFwicHV6emxlXCIsIFwid2F2ZVwiLCBhbmQgXCJkb3RcIi5gKTtcbiAgICAgIGtpbmQgPSAncGlwZSc7XG4gICAgfVxuXG4gICAgdGhpcy5jaGFuZ2VTcGlubmVyQ2hpbGRyZW4oS0lORFNba2luZF0pO1xuICB9XG5cbiAgYnVpbGRTcGlubmVyQ2hpbGRyZW4oY291bnQpIHtcbiAgICBsZXQgY2hpbGRyZW4gICAgICA9IG5ldyBBcnJheShjb3VudCk7XG4gICAgbGV0IG93bmVyRG9jdW1lbnQgPSAodGhpcy5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgbGV0IGVsZW1lbnQgPSBvd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NwaW5uZXItaXRlbScpO1xuXG4gICAgICBjaGlsZHJlbltpXSA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KGNoaWxkcmVuKTtcbiAgfVxuXG4gIGNoYW5nZVNwaW5uZXJDaGlsZHJlbihjb3VudCkge1xuICAgIHRoaXMuc2VsZWN0KCcuc3Bpbm5lci1pdGVtJykucmVtb3ZlKCk7XG4gICAgdGhpcy5idWlsZFNwaW5uZXJDaGlsZHJlbihjb3VudCkucHJlcGVuZFRvKHRoaXMuc2hhZG93KTtcblxuICAgIC8vIEFsd2F5cyBhcHBlbmQgc3R5bGUgYWdhaW4sIHNvXG4gICAgLy8gdGhhdCBpdCBpcyB0aGUgbGFzdCBjaGlsZCwgYW5kXG4gICAgLy8gZG9lc24ndCBtZXNzIHdpdGggXCJudGgtY2hpbGRcIlxuICAgIC8vIHNlbGVjdG9yc1xuICAgIHRoaXMuc2VsZWN0KCdzdHlsZScpLmFwcGVuZFRvKHRoaXMuc2hhZG93KTtcbiAgfVxufVxuXG5NeXRoaXhVSVNwaW5uZXIucmVnaXN0ZXIoKTtcblxuKGdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSkpLk15dGhpeFVJUmVxdWlyZSA9IE15dGhpeFVJU3Bpbm5lcjtcbiIsImltcG9ydCB7XG4gIE1ZVEhJWF9UWVBFLFxuICBRVUVSWV9FTkdJTkVfVFlQRSxcbiAgVU5GSU5JU0hFRF9ERUZJTklUSU9OLFxufSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgVXRpbHMgICAgIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgRWxlbWVudHMgIGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG5pbXBvcnQge1xuICBFbGVtZW50RGVmaW5pdGlvbixcbn0gZnJvbSAnLi9lbGVtZW50cy5qcyc7XG5cbmNvbnN0IElTX0lOVEVHRVIgPSAvXlxcZCskLztcblxuZnVuY3Rpb24gaXNFbGVtZW50KHZhbHVlKSB7XG4gIGlmICghdmFsdWUpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIFdlIGhhdmUgYW4gRWxlbWVudCBvciBhIERvY3VtZW50XG4gIGlmICh2YWx1ZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgfHwgdmFsdWUubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfTk9ERSB8fCB2YWx1ZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNTbG90dGVkKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50KVxuICAgIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBlbGVtZW50LmNsb3Nlc3QoJ3Nsb3QnKTtcbn1cblxuZnVuY3Rpb24gaXNOb3RTbG90dGVkKGVsZW1lbnQpIHtcbiAgaWYgKCFlbGVtZW50KVxuICAgIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAhZWxlbWVudC5jbG9zZXN0KCdzbG90Jyk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RDbGFzc05hbWVzKC4uLmFyZ3MpIHtcbiAgbGV0IGNsYXNzTmFtZXMgPSBbXS5jb25jYXQoLi4uYXJncylcbiAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgLm1hcCgocGFydCkgPT4gKCcnICsgcGFydCkuc3BsaXQoL1xccysvKSlcbiAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgLmZpbHRlcihCb29sZWFuKTtcblxuICByZXR1cm4gY2xhc3NOYW1lcztcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5RW5naW5lIHtcbiAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoaW5zdGFuY2UgJiYgaW5zdGFuY2VbTVlUSElYX1RZUEVdID09PSBRVUVSWV9FTkdJTkVfVFlQRSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc0VsZW1lbnQgICAgPSBpc0VsZW1lbnQ7XG4gIHN0YXRpYyBpc1Nsb3R0ZWQgICAgPSBpc1Nsb3R0ZWQ7XG4gIHN0YXRpYyBpc05vdFNsb3R0ZWQgPSBpc05vdFNsb3R0ZWQ7XG5cbiAgc3RhdGljIGZyb20gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIG5ldyBRdWVyeUVuZ2luZShbXSwgeyByb290OiAoaXNFbGVtZW50KHRoaXMpKSA/IHRoaXMgOiBkb2N1bWVudCwgY29udGV4dDogdGhpcyB9KTtcblxuICAgIGNvbnN0IGdldE9wdGlvbnMgPSAoKSA9PiB7XG4gICAgICBsZXQgYmFzZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICBpZiAoQmFzZVV0aWxzLmlzUGxhaW5PYmplY3QoYXJnc1thcmdJbmRleF0pKVxuICAgICAgICBiYXNlID0gT2JqZWN0LmFzc2lnbihiYXNlLCBhcmdzW2FyZ0luZGV4KytdKTtcblxuICAgICAgaWYgKGFyZ3NbYXJnSW5kZXhdIGluc3RhbmNlb2YgUXVlcnlFbmdpbmUpXG4gICAgICAgIGJhc2UgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUobnVsbCksIGFyZ3NbYXJnSW5kZXhdLmdldE9wdGlvbnMoKSB8fCB7fSwgYmFzZSk7XG5cbiAgICAgIHJldHVybiBiYXNlO1xuICAgIH07XG5cbiAgICBjb25zdCBnZXRSb290RWxlbWVudCA9IChvcHRpb25zUm9vdCkgPT4ge1xuICAgICAgaWYgKGlzRWxlbWVudChvcHRpb25zUm9vdCkpXG4gICAgICAgIHJldHVybiBvcHRpb25zUm9vdDtcblxuICAgICAgaWYgKGlzRWxlbWVudCh0aGlzKSlcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIHJldHVybiAoKHRoaXMgJiYgdGhpcy5vd25lckRvY3VtZW50KSB8fCBkb2N1bWVudCk7XG4gICAgfTtcblxuICAgIGxldCBhcmdJbmRleCAgPSAwO1xuICAgIGxldCBvcHRpb25zICAgPSBnZXRPcHRpb25zKCk7XG4gICAgbGV0IHJvb3QgICAgICA9IGdldFJvb3RFbGVtZW50KG9wdGlvbnMucm9vdCk7XG4gICAgbGV0IHF1ZXJ5RW5naW5lO1xuXG4gICAgb3B0aW9ucy5yb290ID0gcm9vdDtcbiAgICBvcHRpb25zLmNvbnRleHQgPSBvcHRpb25zLmNvbnRleHQgfHwgdGhpcztcblxuICAgIGlmIChhcmdzW2FyZ0luZGV4XSBpbnN0YW5jZW9mIFF1ZXJ5RW5naW5lKVxuICAgICAgcmV0dXJuIG5ldyBRdWVyeUVuZ2luZShhcmdzW2FyZ0luZGV4XS5zbGljZSgpLCBvcHRpb25zKTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGFyZ3NbYXJnSW5kZXhdKSkge1xuICAgICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoYXJnc1thcmdJbmRleCArIDFdLCAnOjpGdW5jdGlvbicpKVxuICAgICAgICBvcHRpb25zLmNhbGxiYWNrID0gYXJnc1sxXTtcblxuICAgICAgcXVlcnlFbmdpbmUgPSBuZXcgUXVlcnlFbmdpbmUoYXJnc1thcmdJbmRleF0sIG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoQmFzZVV0aWxzLmlzVHlwZShhcmdzW2FyZ0luZGV4XSwgJzo6U3RyaW5nJykpIHtcbiAgICAgIG9wdGlvbnMuc2VsZWN0b3IgPSBhcmdzW2FyZ0luZGV4KytdO1xuXG4gICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShhcmdzW2FyZ0luZGV4XSwgJzo6RnVuY3Rpb24nKSlcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjayA9IGFyZ3NbYXJnSW5kZXgrK107XG5cbiAgICAgIHF1ZXJ5RW5naW5lID0gbmV3IFF1ZXJ5RW5naW5lKHJvb3QucXVlcnlTZWxlY3RvckFsbChvcHRpb25zLnNlbGVjdG9yKSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbYXJnSW5kZXhdLCAnOjpGdW5jdGlvbicpKSB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrID0gYXJnc1thcmdJbmRleCsrXTtcblxuICAgICAgbGV0IHJlc3VsdCA9IG9wdGlvbnMuY2FsbGJhY2suY2FsbCh0aGlzLCBFbGVtZW50cy5FbGVtZW50R2VuZXJhdG9yLCBvcHRpb25zKTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShyZXN1bHQpKVxuICAgICAgICByZXN1bHQgPSBbIHJlc3VsdCBdO1xuXG4gICAgICBxdWVyeUVuZ2luZSA9IG5ldyBRdWVyeUVuZ2luZShyZXN1bHQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmludm9rZUNhbGxiYWNrcyAhPT0gZmFsc2UgJiYgdHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gcXVlcnlFbmdpbmUubWFwKG9wdGlvbnMuY2FsbGJhY2spO1xuXG4gICAgcmV0dXJuIHF1ZXJ5RW5naW5lO1xuICB9O1xuXG4gIGdldEVuZ2luZUNsYXNzKCkge1xuICAgIHJldHVybiBRdWVyeUVuZ2luZTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRzLCBfb3B0aW9ucykge1xuICAgIGxldCBvcHRpb25zID0gX29wdGlvbnMgfHwge307XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBbTVlUSElYX1RZUEVdOiB7XG4gICAgICAgIHdyaXRhYmxlOiAgICAgdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogICBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogICAgICAgIFFVRVJZX0VOR0lORV9UWVBFLFxuICAgICAgfSxcbiAgICAgICdfbXl0aGl4VUlPcHRpb25zJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIG9wdGlvbnMsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgJ19teXRoaXhVSUVsZW1lbnRzJzoge1xuICAgICAgICB3cml0YWJsZTogICAgIGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiAgIGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogICAgICAgIHRoaXMuZmlsdGVyQW5kQ29uc3RydWN0RWxlbWVudHMob3B0aW9ucy5jb250ZXh0LCBlbGVtZW50cyksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgbGV0IHJvb3RQcm94eSA9IG5ldyBQcm94eSh0aGlzLCB7XG4gICAgICBnZXQ6ICh0YXJnZXQsIHByb3BOYW1lKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcE5hbWUgPT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgaWYgKHByb3BOYW1lIGluIHRhcmdldClcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcE5hbWVdO1xuICAgICAgICAgIGVsc2UgaWYgKHByb3BOYW1lIGluIHRhcmdldC5fbXl0aGl4VUlFbGVtZW50cylcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuX215dGhpeFVJRWxlbWVudHNbcHJvcE5hbWVdO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BOYW1lID09PSAnbGVuZ3RoJylcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Ll9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aDtcblxuICAgICAgICBpZiAocHJvcE5hbWUgPT09ICdwcm90b3R5cGUnKVxuICAgICAgICAgIHJldHVybiB0YXJnZXQucHJvdG90eXBlO1xuXG4gICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2NvbnN0cnVjdG9yJylcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0LmNvbnN0cnVjdG9yO1xuXG4gICAgICAgIC8vIEluZGV4IGxvb2t1cFxuICAgICAgICBpZiAoSVNfSU5URUdFUi50ZXN0KHByb3BOYW1lKSlcbiAgICAgICAgICByZXR1cm4gdGFyZ2V0Ll9teXRoaXhVSUVsZW1lbnRzW3Byb3BOYW1lXTtcblxuICAgICAgICBpZiAocHJvcE5hbWUgaW4gdGFyZ2V0KVxuICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcE5hbWVdO1xuXG4gICAgICAgIC8vIFJlZGlyZWN0IGFueSBhcnJheSBtZXRob2RzOlxuICAgICAgICAvL1xuICAgICAgICAvLyBcIm1hZ2ljUHJvcE5hbWVcIiBpcyB3aGVuIHRoZVxuICAgICAgICAvLyBmdW5jdGlvbiBuYW1lIGJlZ2lucyB3aXRoIFwiJFwiLFxuICAgICAgICAvLyBpLmUuIFwiJGZpbHRlclwiLCBvciBcIiRtYXBcIi4gSWZcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgY2FzZSwgdGhlbiB0aGUgcmV0dXJuXG4gICAgICAgIC8vIHZhbHVlIHdpbGwgYWx3YXlzIGJlIGNvZXJjZWQgaW50b1xuICAgICAgICAvLyBhIFF1ZXJ5RW5naW5lLiBPdGhlcndpc2UsIGl0IHdpbGxcbiAgICAgICAgLy8gb25seSBiZSBjb2VyY2VkIGludG8gYSBRdWVyeUVuZ2luZVxuICAgICAgICAvLyBpZiBFVkVSWSBlbGVtZW50IGluIHRoZSByZXN1bHQgaXNcbiAgICAgICAgLy8gYW4gXCJlbGVtZW50eVwiIHR5cGUgdmFsdWUuXG4gICAgICAgIGxldCBtYWdpY1Byb3BOYW1lID0gKHByb3BOYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSA/IHByb3BOYW1lLnN1YnN0cmluZygxKSA6IHByb3BOYW1lO1xuICAgICAgICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZVttYWdpY1Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgbGV0IGFycmF5ICAgPSB0YXJnZXQuX215dGhpeFVJRWxlbWVudHM7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ICA9IGFycmF5W21hZ2ljUHJvcE5hbWVdKC4uLmFyZ3MpO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpICYmIChtYWdpY1Byb3BOYW1lICE9PSBwcm9wTmFtZSB8fCByZXN1bHQuZXZlcnkoKGl0ZW0pID0+IEJhc2VVdGlscy5pc1R5cGUoaXRlbSwgRWxlbWVudERlZmluaXRpb24sIE5vZGUsIFF1ZXJ5RW5naW5lKSkpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IEVuZ2luZUNsYXNzID0gdGFyZ2V0LmdldEVuZ2luZUNsYXNzKCk7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgRW5naW5lQ2xhc3MocmVzdWx0LCB0YXJnZXQuZ2V0T3B0aW9ucygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wTmFtZV07XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJvb3RQcm94eTtcbiAgfVxuXG4gIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215dGhpeFVJT3B0aW9ucztcbiAgfVxuXG4gIGdldENvbnRleHQoKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKTtcbiAgICByZXR1cm4gb3B0aW9ucy5jb250ZXh0O1xuICB9XG5cbiAgZ2V0Um9vdCgpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpO1xuICAgIHJldHVybiBvcHRpb25zLnJvb3QgfHwgZG9jdW1lbnQ7XG4gIH1cblxuICBnZXRVbmRlcmx5aW5nQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX215dGhpeFVJRWxlbWVudHM7XG4gIH1cblxuICBnZXRPd25lckRvY3VtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmdldFJvb3QoKS5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuICB9XG5cbiAgZmlsdGVyQW5kQ29uc3RydWN0RWxlbWVudHMoY29udGV4dCwgZWxlbWVudHMpIHtcbiAgICBsZXQgZmluYWxFbGVtZW50cyA9IEFycmF5LmZyb20oZWxlbWVudHMpLmZsYXQoSW5maW5pdHkpLm1hcCgoX2l0ZW0pID0+IHtcbiAgICAgIGlmICghX2l0ZW0pXG4gICAgICAgIHJldHVybjtcblxuICAgICAgbGV0IGl0ZW0gPSBfaXRlbTtcbiAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgUXVlcnlFbmdpbmUpXG4gICAgICAgIHJldHVybiBpdGVtLmdldFVuZGVybHlpbmdBcnJheSgpO1xuXG4gICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShpdGVtLCBOb2RlKSlcbiAgICAgICAgcmV0dXJuIGl0ZW07XG5cbiAgICAgIGlmIChpdGVtW1VORklOSVNIRURfREVGSU5JVElPTl0pXG4gICAgICAgIGl0ZW0gPSBpdGVtKCk7XG5cbiAgICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKGl0ZW0sICc6OlN0cmluZycpKVxuICAgICAgICBpdGVtID0gRWxlbWVudHMuVGVybShpdGVtKTtcbiAgICAgIGVsc2UgaWYgKCFCYXNlVXRpbHMuaXNUeXBlKGl0ZW0sIEVsZW1lbnREZWZpbml0aW9uKSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBpZiAoIWNvbnRleHQpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiY29udGV4dFwiIG9wdGlvbiBmb3IgUXVlcnlFbmdpbmUgaXMgcmVxdWlyZWQgd2hlbiBjb25zdHJ1Y3RpbmcgZWxlbWVudHMuJyk7XG5cbiAgICAgIHJldHVybiBpdGVtLmJ1aWxkKHRoaXMuZ2V0T3duZXJEb2N1bWVudCgpLCB7XG4gICAgICAgIHNjb3BlOiBVdGlscy5jcmVhdGVTY29wZShjb250ZXh0KSxcbiAgICAgIH0pO1xuICAgIH0pLmZsYXQoSW5maW5pdHkpLmZpbHRlcihCb29sZWFuKTtcblxuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoZmluYWxFbGVtZW50cykpO1xuICB9XG5cbiAgc2VsZWN0KC4uLmFyZ3MpIHtcbiAgICBsZXQgYXJnSW5kZXggID0gMDtcbiAgICBsZXQgb3B0aW9ucyAgID0gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKG51bGwpLCB0aGlzLmdldE9wdGlvbnMoKSwgKEJhc2VVdGlscy5pc1BsYWluT2JqZWN0KGFyZ3NbYXJnSW5kZXhdKSkgPyBhcmdzW2FyZ0luZGV4KytdIDoge30pO1xuXG4gICAgaWYgKG9wdGlvbnMuY29udGV4dCAmJiB0eXBlb2Ygb3B0aW9ucy5jb250ZXh0LiQgPT09ICdmdW5jdGlvbicpXG4gICAgICByZXR1cm4gb3B0aW9ucy5jb250ZXh0LiQuY2FsbChvcHRpb25zLmNvbnRleHQsIG9wdGlvbnMsIC4uLmFyZ3Muc2xpY2UoYXJnSW5kZXgpKTtcblxuICAgIGNvbnN0IEVuZ2luZUNsYXNzID0gdGhpcy5nZXRFbmdpbmVDbGFzcygpO1xuICAgIHJldHVybiBFbmdpbmVDbGFzcy5mcm9tLmNhbGwob3B0aW9ucy5jb250ZXh0IHx8IHRoaXMsIG9wdGlvbnMsIC4uLmFyZ3Muc2xpY2UoYXJnSW5kZXgpKTtcbiAgfVxuXG4gICplbnRyaWVzKCkge1xuICAgIGxldCBlbGVtZW50cyA9IHRoaXMuX215dGhpeFVJRWxlbWVudHM7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgICAgeWllbGQoW2ksIGVsZW1lbnRdKTtcbiAgICB9XG4gIH1cblxuICAqa2V5cygpIHtcbiAgICBmb3IgKGxldCBbIGtleSwgXyBdIG9mIHRoaXMuZW50cmllcygpKVxuICAgICAgeWllbGQga2V5O1xuICB9XG5cbiAgKnZhbHVlcygpIHtcbiAgICBmb3IgKGxldCBbIF8sIHZhbHVlIF0gb2YgdGhpcy5lbnRyaWVzKCkpXG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgfVxuXG4gICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICByZXR1cm4geWllbGQgKnRoaXMudmFsdWVzKCk7XG4gIH1cblxuICBmaXJzdChjb3VudCkge1xuICAgIGlmIChjb3VudCA9PSBudWxsIHx8IGNvdW50ID09PSAwIHx8IE9iamVjdC5pcyhjb3VudCwgTmFOKSB8fCAhQmFzZVV0aWxzLmlzVHlwZShjb3VudCwgJzo6TnVtYmVyJykpXG4gICAgICByZXR1cm4gdGhpcy5zZWxlY3QoWyB0aGlzLl9teXRoaXhVSUVsZW1lbnRzWzBdIF0pO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0KHRoaXMuX215dGhpeFVJRWxlbWVudHMuc2xpY2UoTWF0aC5hYnMoY291bnQpKSk7XG4gIH1cblxuICBsYXN0KGNvdW50KSB7XG4gICAgaWYgKGNvdW50ID09IG51bGwgfHwgY291bnQgPT09IDAgfHwgT2JqZWN0LmlzKGNvdW50LCBOYU4pIHx8ICFCYXNlVXRpbHMuaXNUeXBlKGNvdW50LCAnOjpOdW1iZXInKSlcbiAgICAgIHJldHVybiB0aGlzLnNlbGVjdChbIHRoaXMuX215dGhpeFVJRWxlbWVudHNbdGhpcy5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGggLSAxXSBdKTtcblxuICAgIHJldHVybiB0aGlzLnNlbGVjdCh0aGlzLl9teXRoaXhVSUVsZW1lbnRzLnNsaWNlKE1hdGguYWJzKGNvdW50KSAqIC0xKSk7XG4gIH1cblxuICBhZGQoLi4uZWxlbWVudHMpIHtcbiAgICBjb25zdCBFbmdpbmVDbGFzcyA9IHRoaXMuZ2V0RW5naW5lQ2xhc3MoKTtcbiAgICByZXR1cm4gbmV3IEVuZ2luZUNsYXNzKHRoaXMuc2xpY2UoKS5jb25jYXQoLi4uZWxlbWVudHMpLCB0aGlzLmdldE9wdGlvbnMoKSk7XG4gIH1cblxuICBzdWJ0cmFjdCguLi5lbGVtZW50cykge1xuICAgIGxldCBzZXQgPSBuZXcgU2V0KGVsZW1lbnRzKTtcblxuICAgIGNvbnN0IEVuZ2luZUNsYXNzID0gdGhpcy5nZXRFbmdpbmVDbGFzcygpO1xuICAgIHJldHVybiBuZXcgRW5naW5lQ2xhc3ModGhpcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiAhc2V0LmhhcyhpdGVtKTtcbiAgICB9KSwgdGhpcy5nZXRPcHRpb25zKCkpO1xuICB9XG5cbiAgb24oZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMudmFsdWVzKCkpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KHZhbHVlKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvZmYoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGZvciAobGV0IHZhbHVlIG9mIHRoaXMudmFsdWVzKCkpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KHZhbHVlKSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIHZhbHVlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhcHBlbmRUbyhzZWxlY3Rvck9yRWxlbWVudCkge1xuICAgIGlmICghdGhpcy5fbXl0aGl4VUlFbGVtZW50cy5sZW5ndGgpXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGxldCBlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgaWYgKEJhc2VVdGlscy5pc1R5cGUoc2VsZWN0b3JPckVsZW1lbnQsICc6OlN0cmluZycpKVxuICAgICAgZWxlbWVudCA9IHRoaXMuZ2V0Um9vdCgpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JPckVsZW1lbnQpO1xuXG4gICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5fbXl0aGl4VUlFbGVtZW50cylcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICB9XG5cbiAgcHJlcGVuZFRvKHNlbGVjdG9yT3JFbGVtZW50KSB7XG4gICAgaWYgKCF0aGlzLl9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgbGV0IGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShzZWxlY3Rvck9yRWxlbWVudCwgJzo6U3RyaW5nJykpXG4gICAgICBlbGVtZW50ID0gdGhpcy5nZXRSb290KCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk7XG5cbiAgICBsZXQgZmlyc3RDaGlsZCA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXSB8fCBudWxsO1xuICAgIGZvciAobGV0IGNoaWxkIG9mIHRoaXMuX215dGhpeFVJRWxlbWVudHMpXG4gICAgICBlbGVtZW50Lmluc2VydEJlZm9yZShjaGlsZCwgZmlyc3RDaGlsZCk7XG4gIH1cblxuICBpbnNlcnRJbnRvKHNlbGVjdG9yT3JFbGVtZW50LCByZWZlcmVuY2VOb2RlKSB7XG4gICAgaWYgKCF0aGlzLl9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aClcbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgbGV0IGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShzZWxlY3Rvck9yRWxlbWVudCwgJzo6U3RyaW5nJykpXG4gICAgICBlbGVtZW50ID0gdGhpcy5nZXRSb290KCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk7XG5cbiAgICBsZXQgb3duZXJEb2N1bWVudCA9IHRoaXMuZ2V0T3duZXJEb2N1bWVudCgpO1xuICAgIGxldCBzb3VyY2UgICAgICAgID0gdGhpcztcblxuICAgIGlmICh0aGlzLl9teXRoaXhVSUVsZW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxldCBmcmFnbWVudCA9IG93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgZm9yIChsZXQgY2hpbGQgb2YgdGhpcy5fbXl0aGl4VUlFbGVtZW50cylcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuXG4gICAgICBzb3VyY2UgPSBbIGZyYWdtZW50IF07XG4gICAgfVxuXG4gICAgZWxlbWVudC5pbnNlcnQoc291cmNlWzBdLCByZWZlcmVuY2VOb2RlKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVwbGFjZUNoaWxkcmVuT2Yoc2VsZWN0b3JPckVsZW1lbnQpIHtcbiAgICBsZXQgZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIGlmIChCYXNlVXRpbHMuaXNUeXBlKHNlbGVjdG9yT3JFbGVtZW50LCAnOjpTdHJpbmcnKSlcbiAgICAgIGVsZW1lbnQgPSB0aGlzLmdldFJvb3QoKS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yT3JFbGVtZW50KTtcblxuICAgIHdoaWxlIChlbGVtZW50LmNoaWxkTm9kZXMubGVuZ3RoKVxuICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmNoaWxkTm9kZXNbMF0pO1xuXG4gICAgcmV0dXJuIHRoaXMuYXBwZW5kVG8oZWxlbWVudCk7XG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLl9teXRoaXhVSUVsZW1lbnRzKSB7XG4gICAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpXG4gICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsYXNzTGlzdChvcGVyYXRpb24sIC4uLmFyZ3MpIHtcbiAgICBsZXQgY2xhc3NOYW1lcyA9IGNvbGxlY3RDbGFzc05hbWVzKGFyZ3MpO1xuICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5fbXl0aGl4VUlFbGVtZW50cykge1xuICAgICAgaWYgKG5vZGUgJiYgbm9kZS5jbGFzc0xpc3QpIHtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJ3RvZ2dsZScpXG4gICAgICAgICAgY2xhc3NOYW1lcy5mb3JFYWNoKChjbGFzc05hbWUpID0+IG5vZGUuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIG5vZGUuY2xhc3NMaXN0W29wZXJhdGlvbl0oLi4uY2xhc3NOYW1lcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGRDbGFzcyguLi5jbGFzc05hbWVzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0KCdhZGQnLCAuLi5jbGFzc05hbWVzKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKC4uLmNsYXNzTmFtZXMpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc0xpc3QoJ3JlbW92ZScsIC4uLmNsYXNzTmFtZXMpO1xuICB9XG5cbiAgdG9nZ2xlQ2xhc3MoLi4uY2xhc3NOYW1lcykge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdCgndG9nZ2xlJywgLi4uY2xhc3NOYW1lcyk7XG4gIH1cblxuICBzbG90dGVkKHllc05vKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IHllc05vKSA/IGlzU2xvdHRlZCA6IGlzTm90U2xvdHRlZCk7XG4gIH1cblxuICBzbG90KHNsb3ROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50LnNsb3QgPT09IHNsb3ROYW1lKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgaWYgKGVsZW1lbnQuY2xvc2VzdChgc2xvdFtuYW1lPVwiJHtzbG90TmFtZS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyl9XCJdYCkpXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cblxuKGdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSkpLlF1ZXJ5RW5naW5lID0gUXVlcnlFbmdpbmU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1tYWdpYy1udW1iZXJzICovXG5cbi8qXG5NYW55IHRoYW5rcyB0byBHZXJhaW50IEx1ZmYgZm9yIHRoZSBmb2xsb3dpbmdcblxuaHR0cHM6Ly9naXRodWIuY29tL2dlcmFpbnRsdWZmL3NoYTI1Ni9cbiovXG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IFNIQTI1NlxuICogZ3JvdXBOYW1lOiBCYXNlVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgU0hBMjU2IGhhc2hpbmcgZnVuY3Rpb25cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBpbnB1dFxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBJbnB1dCBzdHJpbmdcbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgc3RyaW5nOyBUaGUgU0hBMjU2IGhhc2ggb2YgdGhlIHByb3ZpZGVkIGBpbnB1dGAuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IFRoaXMgaXMgYSBjdXN0b20gYmFrZWQgU0hBMjU2IGhhc2hpbmcgZnVuY3Rpb24sIG1pbmltaXplZCBmb3Igc2l6ZS5cbiAqICAgICBJdCBtYXkgYmUgaW5jb21wbGV0ZSwgYW5kIGl0IGlzIHN0cm9uZ2x5IHJlY29tbWVuZGVkIHRoYXQgeW91ICoqRE8gTk9UKiogdXNlIHRoaXNcbiAqICAgICBmb3IgYW55dGhpbmcgcmVsYXRlZCB0byBzZWN1cml0eS5cbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IFJlYWQgYWxsIHRoZSBub3RlcywgYW5kIHVzZSB0aGlzIG1ldGhvZCB3aXRoIGNhdXRpb24uXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUaGlzIG1ldGhvZCBoYXMgYmVlbiBtb2RpZmllZCBzbGlnaHRseSBmcm9tIHRoZSBvcmlnaW5hbCB0byAqbm90KiBiYWlsIHdoZW5cbiAqICAgICB1bmljb2RlIGNoYXJhY3RlcnMgYXJlIGRldGVjdGVkLiBUaGVyZSBpcyBhIGRlY2VudCBjaGFuY2UgdGhhdC0tZ2l2ZW4gY2VydGFpblxuICogICAgIGlucHV0LS10aGlzIG1ldGhvZCB3aWxsIHJldHVybiBhbiBpbnZhbGlkIFNIQTI1NiBoYXNoLlwiXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBNeXRoaXggVUkgdXNlcyB0aGlzIG1ldGhvZCBzaW1wbHkgdG8gZ2VuZXJhdGUgY29uc2lzdGVudCBJRHMuXG4gKiAgIC0gfFxuICogICAgIDpoZWFydDogTWFueSB0aGFua3MgdG8gdGhlIGF1dGhvciBbR2VyYWludCBMdWZmXShodHRwczovL2dpdGh1Yi5jb20vZ2VyYWludGx1ZmYvc2hhMjU2LylcbiAqICAgICBmb3IgdGhpcyBtZXRob2QhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBTSEEyNTYoX2lucHV0KSB7XG4gIGxldCBpbnB1dCA9IF9pbnB1dDtcblxuICBsZXQgbWF0aFBvdyA9IE1hdGgucG93O1xuICBsZXQgbWF4V29yZCA9IG1hdGhQb3coMiwgMzIpO1xuICBsZXQgbGVuZ3RoUHJvcGVydHkgPSAnbGVuZ3RoJztcbiAgbGV0IGk7IGxldCBqOyAvLyBVc2VkIGFzIGEgY291bnRlciBhY3Jvc3MgdGhlIHdob2xlIGZpbGVcbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIGxldCB3b3JkcyA9IFtdO1xuICBsZXQgYXNjaWlCaXRMZW5ndGggPSBpbnB1dFtsZW5ndGhQcm9wZXJ0eV0gKiA4O1xuXG4gIC8vKiBjYWNoaW5nIHJlc3VsdHMgaXMgb3B0aW9uYWwgLSByZW1vdmUvYWRkIHNsYXNoIGZyb20gZnJvbnQgb2YgdGhpcyBsaW5lIHRvIHRvZ2dsZVxuICAvLyBJbml0aWFsIGhhc2ggdmFsdWU6IGZpcnN0IDMyIGJpdHMgb2YgdGhlIGZyYWN0aW9uYWwgcGFydHMgb2YgdGhlIHNxdWFyZSByb290cyBvZiB0aGUgZmlyc3QgOCBwcmltZXNcbiAgLy8gKHdlIGFjdHVhbGx5IGNhbGN1bGF0ZSB0aGUgZmlyc3QgNjQsIGJ1dCBleHRyYSB2YWx1ZXMgYXJlIGp1c3QgaWdub3JlZClcbiAgbGV0IGhhc2ggPSBTSEEyNTYuaCA9IFNIQTI1Ni5oIHx8IFtdO1xuICAvLyBSb3VuZCBjb25zdGFudHM6IGZpcnN0IDMyIGJpdHMgb2YgdGhlIGZyYWN0aW9uYWwgcGFydHMgb2YgdGhlIGN1YmUgcm9vdHMgb2YgdGhlIGZpcnN0IDY0IHByaW1lc1xuICBsZXQgayA9IFNIQTI1Ni5rID0gU0hBMjU2LmsgfHwgW107XG4gIGxldCBwcmltZUNvdW50ZXIgPSBrW2xlbmd0aFByb3BlcnR5XTtcbiAgLyovXG4gICAgbGV0IGhhc2ggPSBbXSwgayA9IFtdO1xuICAgIGxldCBwcmltZUNvdW50ZXIgPSAwO1xuICAgIC8vKi9cblxuICBsZXQgaXNDb21wb3NpdGUgPSB7fTtcbiAgZm9yIChsZXQgY2FuZGlkYXRlID0gMjsgcHJpbWVDb3VudGVyIDwgNjQ7IGNhbmRpZGF0ZSsrKSB7XG4gICAgaWYgKCFpc0NvbXBvc2l0ZVtjYW5kaWRhdGVdKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgMzEzOyBpICs9IGNhbmRpZGF0ZSlcbiAgICAgICAgaXNDb21wb3NpdGVbaV0gPSBjYW5kaWRhdGU7XG5cbiAgICAgIGhhc2hbcHJpbWVDb3VudGVyXSA9IChtYXRoUG93KGNhbmRpZGF0ZSwgMC41KSAqIG1heFdvcmQpIHwgMDtcbiAgICAgIGtbcHJpbWVDb3VudGVyKytdID0gKG1hdGhQb3coY2FuZGlkYXRlLCAxIC8gMykgKiBtYXhXb3JkKSB8IDA7XG4gICAgfVxuICB9XG5cbiAgaW5wdXQgKz0gJ1xceDgwJzsgLy8gQXBwZW5kIMaHJyBiaXQgKHBsdXMgemVybyBwYWRkaW5nKVxuICB3aGlsZSAoaW5wdXRbbGVuZ3RoUHJvcGVydHldICUgNjQgLSA1NilcbiAgICBpbnB1dCArPSAnXFx4MDAnOyAvLyBNb3JlIHplcm8gcGFkZGluZ1xuXG4gIGZvciAoaSA9IDA7IGkgPCBpbnB1dFtsZW5ndGhQcm9wZXJ0eV07IGkrKykge1xuICAgIGogPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChqID4+IDgpXG4gICAgICByZXR1cm47IC8vIEFTQ0lJIGNoZWNrOiBvbmx5IGFjY2VwdCBjaGFyYWN0ZXJzIGluIHJhbmdlIDAtMjU1XG4gICAgd29yZHNbaSA+PiAyXSB8PSBqIDw8ICgoMyAtIGkpICUgNCkgKiA4O1xuICB9XG5cbiAgd29yZHNbd29yZHNbbGVuZ3RoUHJvcGVydHldXSA9ICgoYXNjaWlCaXRMZW5ndGggLyBtYXhXb3JkKSB8IDApO1xuICB3b3Jkc1t3b3Jkc1tsZW5ndGhQcm9wZXJ0eV1dID0gKGFzY2lpQml0TGVuZ3RoKTtcblxuICAvLyBwcm9jZXNzIGVhY2ggY2h1bmtcbiAgZm9yIChqID0gMDsgaiA8IHdvcmRzW2xlbmd0aFByb3BlcnR5XTspIHtcbiAgICBsZXQgdyA9IHdvcmRzLnNsaWNlKGosIGogKz0gMTYpOyAvLyBUaGUgbWVzc2FnZSBpcyBleHBhbmRlZCBpbnRvIDY0IHdvcmRzIGFzIHBhcnQgb2YgdGhlIGl0ZXJhdGlvblxuICAgIGxldCBvbGRIYXNoID0gaGFzaDtcblxuICAgIC8vIFRoaXMgaXMgbm93IHRoZSB1bmRlZmluZWR3b3JraW5nIGhhc2hcIiwgb2Z0ZW4gbGFiZWxsZWQgYXMgdmFyaWFibGVzIGEuLi5nXG4gICAgLy8gKHdlIGhhdmUgdG8gdHJ1bmNhdGUgYXMgd2VsbCwgb3RoZXJ3aXNlIGV4dHJhIGVudHJpZXMgYXQgdGhlIGVuZCBhY2N1bXVsYXRlXG4gICAgaGFzaCA9IGhhc2guc2xpY2UoMCwgOCk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuICAgICAgLy8gRXhwYW5kIHRoZSBtZXNzYWdlIGludG8gNjQgd29yZHNcbiAgICAgIC8vIFVzZWQgYmVsb3cgaWZcbiAgICAgIGxldCB3MTUgPSB3W2kgLSAxNV07IGxldCB3MiA9IHdbaSAtIDJdO1xuXG4gICAgICAvLyBJdGVyYXRlXG4gICAgICBsZXQgYSA9IGhhc2hbMF07IGxldCBlID0gaGFzaFs0XTtcbiAgICAgIGxldCB0ZW1wMSA9IGhhc2hbN11cbiAgICAgICAgICAgICAgICArICgoKGUgPj4+IDYpIHwgKGUgPDwgMjYpKSBeICgoZSA+Pj4gMTEpIHwgKGUgPDwgMjEpKSBeICgoZSA+Pj4gMjUpIHwgKGUgPDwgNykpKSAvLyBTMVxuICAgICAgICAgICAgICAgICsgKChlICYgaGFzaFs1XSkgXiAoKH5lKSAmIGhhc2hbNl0pKSAvLyBjaFxuICAgICAgICAgICAgICAgICsga1tpXVxuICAgICAgICAgICAgICAgIC8vIEV4cGFuZCB0aGUgbWVzc2FnZSBzY2hlZHVsZSBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICArICh3W2ldID0gKGkgPCAxNikgPyB3W2ldIDogKFxuICAgICAgICAgICAgICAgICAgd1tpIC0gMTZdXG4gICAgICAgICAgICAgICAgICAgICAgICArICgoKHcxNSA+Pj4gNykgfCAodzE1IDw8IDI1KSkgXiAoKHcxNSA+Pj4gMTgpIHwgKHcxNSA8PCAxNCkpIF4gKHcxNSA+Pj4gMykpIC8vIHMwXG4gICAgICAgICAgICAgICAgICAgICAgICArIHdbaSAtIDddXG4gICAgICAgICAgICAgICAgICAgICAgICArICgoKHcyID4+PiAxNykgfCAodzIgPDwgMTUpKSBeICgodzIgPj4+IDE5KSB8ICh3MiA8PCAxMykpIF4gKHcyID4+PiAxMCkpIC8vIHMxXG4gICAgICAgICAgICAgICAgKSB8IDBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgLy8gVGhpcyBpcyBvbmx5IHVzZWQgb25jZSwgc28gKmNvdWxkKiBiZSBtb3ZlZCBiZWxvdywgYnV0IGl0IG9ubHkgc2F2ZXMgNCBieXRlcyBhbmQgbWFrZXMgdGhpbmdzIHVucmVhZGJsZVxuICAgICAgbGV0IHRlbXAyID0gKCgoYSA+Pj4gMikgfCAoYSA8PCAzMCkpIF4gKChhID4+PiAxMykgfCAoYSA8PCAxOSkpIF4gKChhID4+PiAyMikgfCAoYSA8PCAxMCkpKSAvLyBTMFxuICAgICAgICAgICAgICAgICsgKChhICYgaGFzaFsxXSkgXiAoYSAmIGhhc2hbMl0pIF4gKGhhc2hbMV0gJiBoYXNoWzJdKSk7IC8vIG1halxuXG4gICAgICBoYXNoID0gWyh0ZW1wMSArIHRlbXAyKSB8IDBdLmNvbmNhdChoYXNoKTsgLy8gV2UgZG9uJ3QgYm90aGVyIHRyaW1taW5nIG9mZiB0aGUgZXh0cmEgb25lcywgdGhleSdyZSBoYXJtbGVzcyBhcyBsb25nIGFzIHdlJ3JlIHRydW5jYXRpbmcgd2hlbiB3ZSBkbyB0aGUgc2xpY2UoKVxuICAgICAgaGFzaFs0XSA9IChoYXNoWzRdICsgdGVtcDEpIHwgMDtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgODsgaSsrKVxuICAgICAgaGFzaFtpXSA9IChoYXNoW2ldICsgb2xkSGFzaFtpXSkgfCAwO1xuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGZvciAoaiA9IDM7IGogKyAxOyBqLS0pIHtcbiAgICAgIGxldCBiID0gKGhhc2hbaV0gPj4gKGogKiA4KSkgJiAyNTU7XG4gICAgICByZXN1bHQgKz0gKChiIDwgMTYpID8gMCA6ICcnKSArIGIudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgU3R5bGVTaGVldE1hbmFnZXIgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIFV0aWxpdHkgZm9yIG1hbmFnaW5nIENvbnN0cnVjdGFibGUgU3R5bGVzaGVldHMgYWNyb3NzIGNvbXBvbmVudHMuXG4gKiAgIFByb3ZpZGVzIGVmZmljaWVudCBzdHlsZSBzaGFyaW5nIHRocm91Z2ggdGhlIGBhZG9wdGVkU3R5bGVTaGVldHNgIEFQSSxcbiAqICAgd2l0aCBhdXRvbWF0aWMgZmFsbGJhY2sgZm9yIG9sZGVyIGJyb3dzZXJzLlxuICpcbiAqICAgQnJvd3NlciBTdXBwb3J0IChCYXNlbGluZSBzaW5jZSBNYXJjaCAyMDIzKTpcbiAqICAgLSBDaHJvbWUgNzMrLCBGaXJlZm94IDEwMSssIFNhZmFyaSAxNi40KywgRWRnZSA3OStcbiAqXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IFN0eWxlU2hlZXRNYW5hZ2VyIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmUnO1xuICpcbiAqICAgICAvLyBSZWdpc3RlciBhIHNoYXJlZCBzdHlsZXNoZWV0XG4gKiAgICAgU3R5bGVTaGVldE1hbmFnZXIucmVnaXN0ZXIoJ3RoZW1lJywgYFxuICogICAgICAgOmhvc3Qge1xuICogICAgICAgICAtLXByaW1hcnktY29sb3I6IGJsdWU7XG4gKiAgICAgICAgIC0tc2Vjb25kYXJ5LWNvbG9yOiBncmVlbjtcbiAqICAgICAgIH1cbiAqICAgICBgKTtcbiAqXG4gKiAgICAgLy8gQWRvcHQgaW4gYSBzaGFkb3cgcm9vdFxuICogICAgIFN0eWxlU2hlZXRNYW5hZ2VyLmFkb3B0KHRoaXMuc2hhZG93Um9vdCwgWyd0aGVtZSddKTtcbiAqICAgICBgYGBcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIC8vIEluIGEgY29tcG9uZW50XG4gKiAgICAgY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBNeXRoaXhVSUNvbXBvbmVudCB7XG4gKiAgICAgICBzdGF0aWMgc2hhcmVkU3R5bGVzID0gWyd0aGVtZScsICd0eXBvZ3JhcGh5J107XG4gKlxuICogICAgICAgY3JlYXRlU2hhZG93RE9NKCkge1xuICogICAgICAgICBsZXQgc2hhZG93ID0gc3VwZXIuY3JlYXRlU2hhZG93RE9NKCk7XG4gKiAgICAgICAgIC8vIHNoYXJlZFN0eWxlcyBhcmUgYXV0b21hdGljYWxseSBhZG9wdGVkXG4gKiAgICAgICAgIHJldHVybiBzaGFkb3c7XG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogICAgIGBgYFxuICovXG5cbi8vIENhY2hlIGZvciBjb25zdHJ1Y3RlZCBzdHlsZXNoZWV0cyBieSBuYW1lXG5jb25zdCBTVFlMRVNIRUVUX0NBQ0hFID0gbmV3IE1hcCgpO1xuXG4vLyBDYWNoZSBmb3Igc3R5bGVzaGVldHMgYnkgY29udGVudCBoYXNoIChmb3IgZGVkdXBsaWNhdGlvbilcbmNvbnN0IENPTlRFTlRfSEFTSF9DQUNIRSA9IG5ldyBNYXAoKTtcblxuLy8gQ2hlY2sgaWYgQ29uc3RydWN0YWJsZSBTdHlsZXNoZWV0cyBhcmUgc3VwcG9ydGVkXG5jb25zdCBzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cyA9ICgoKSA9PiB7XG4gIHRyeSB7XG4gICAgbmV3IENTU1N0eWxlU2hlZXQoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0pKCk7XG5cbi8qKlxuICogU2ltcGxlIGhhc2ggZnVuY3Rpb24gZm9yIHN0eWxlc2hlZXQgY29udGVudCBkZWR1cGxpY2F0aW9uLlxuICovXG5jb25zdCBoYXNoQ29udGVudCA9IChjb250ZW50KSA9PiB7XG4gIGxldCBoYXNoID0gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoYXIgPSBjb250ZW50LmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hhcjtcbiAgICBoYXNoID0gaGFzaCAmIGhhc2g7IC8vIENvbnZlcnQgdG8gMzItYml0IGludGVnZXJcbiAgfVxuICByZXR1cm4gaGFzaC50b1N0cmluZygxNik7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBpc1N1cHBvcnRlZFxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBDaGVjayBpZiBDb25zdHJ1Y3RhYmxlIFN0eWxlc2hlZXRzIGFyZSBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3Nlci5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjsgVHJ1ZSBpZiBzdXBwb3J0ZWQuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiBDb25zdHJ1Y3RhYmxlIFN0eWxlc2hlZXRzIGFyZSBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3Nlci5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIENvbnN0cnVjdGFibGUgU3R5bGVzaGVldHMgYXJlIHN1cHBvcnRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkID0gKCkgPT4gc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHM7XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IHJlZ2lzdGVyXG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIFJlZ2lzdGVyIGEgc3R5bGVzaGVldCBieSBuYW1lIGZvciBsYXRlciBhZG9wdGlvbi5cbiAqICAgSWYgdGhlIHNhbWUgY29udGVudCBoYXMgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWQgdW5kZXIgYSBkaWZmZXJlbnQgbmFtZSxcbiAqICAgdGhlIHNhbWUgQ1NTU3R5bGVTaGVldCBpbnN0YW5jZSB3aWxsIGJlIHJldXNlZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBuYW1lXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSB1bmlxdWUgbmFtZSBmb3IgdGhpcyBzdHlsZXNoZWV0LlxuICogICAtIG5hbWU6IGNzc1RleHRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIENTUyBjb250ZW50IG9mIHRoZSBzdHlsZXNoZWV0LlxuICogICAtIG5hbWU6IG9wdGlvbnNcbiAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBPcHRpb25zIGZvciByZWdpc3RyYXRpb24uXG4gKiAgICAgICAtIGByZXBsYWNlYDogSWYgdHJ1ZSwgcmVwbGFjZXMgZXhpc3RpbmcgcmVnaXN0cmF0aW9uIChkZWZhdWx0OiBmYWxzZSkuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIENTU1N0eWxlU2hlZXQgfCBudWxsOyBUaGUgY29uc3RydWN0ZWQgc3R5bGVzaGVldCwgb3IgbnVsbCBpZiBub3Qgc3VwcG9ydGVkLlxuICpcbiAqIGV4YW1wbGVzOlxuICogICAtIHxcbiAqICAgICBgYGBqYXZhc2NyaXB0XG4gKiAgICAgU3R5bGVTaGVldE1hbmFnZXIucmVnaXN0ZXIoJ3RoZW1lJywgYFxuICogICAgICAgOmhvc3Qge1xuICogICAgICAgICAtLXByaW1hcnktY29sb3I6ICMwMDdiZmY7XG4gKiAgICAgICB9XG4gKiAgICAgYCk7XG4gKiAgICAgYGBgXG4gKi9cblxuLyoqXG4gKiBSZWdpc3RlciBhIHN0eWxlc2hlZXQgYnkgbmFtZSBmb3IgbGF0ZXIgYWRvcHRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSB1bmlxdWUgbmFtZSBmb3IgdGhpcyBzdHlsZXNoZWV0LlxuICogQHBhcmFtIHtzdHJpbmd9IGNzc1RleHQgLSBUaGUgQ1NTIGNvbnRlbnQgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gT3B0aW9ucyBmb3IgcmVnaXN0cmF0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXBsYWNlPWZhbHNlXSAtIElmIHRydWUsIHJlcGxhY2VzIGV4aXN0aW5nIHJlZ2lzdHJhdGlvbi5cbiAqIEByZXR1cm5zIHtDU1NTdHlsZVNoZWV0fG51bGx9IFRoZSBjb25zdHJ1Y3RlZCBzdHlsZXNoZWV0LCBvciBudWxsIGlmIG5vdCBzdXBwb3J0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCByZWdpc3RlciA9IChuYW1lLCBjc3NUZXh0LCBvcHRpb25zID0ge30pID0+IHtcbiAgaWYgKCFzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cylcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBDaGVjayBpZiBhbHJlYWR5IHJlZ2lzdGVyZWQgKGFuZCBub3QgcmVwbGFjaW5nKVxuICBpZiAoU1RZTEVTSEVFVF9DQUNIRS5oYXMobmFtZSkgJiYgIW9wdGlvbnMucmVwbGFjZSlcbiAgICByZXR1cm4gU1RZTEVTSEVFVF9DQUNIRS5nZXQobmFtZSk7XG5cbiAgLy8gQ2hlY2sgZm9yIGNvbnRlbnQgZGVkdXBsaWNhdGlvblxuICBsZXQgY29udGVudEhhc2ggPSBoYXNoQ29udGVudChjc3NUZXh0KTtcbiAgbGV0IGV4aXN0aW5nU2hlZXQgPSBDT05URU5UX0hBU0hfQ0FDSEUuZ2V0KGNvbnRlbnRIYXNoKTtcblxuICBpZiAoZXhpc3RpbmdTaGVldCkge1xuICAgIFNUWUxFU0hFRVRfQ0FDSEUuc2V0KG5hbWUsIGV4aXN0aW5nU2hlZXQpO1xuICAgIHJldHVybiBleGlzdGluZ1NoZWV0O1xuICB9XG5cbiAgLy8gQ3JlYXRlIG5ldyBzdHlsZXNoZWV0XG4gIGxldCBzaGVldCA9IG5ldyBDU1NTdHlsZVNoZWV0KCk7XG4gIHNoZWV0LnJlcGxhY2VTeW5jKGNzc1RleHQpO1xuXG4gIFNUWUxFU0hFRVRfQ0FDSEUuc2V0KG5hbWUsIHNoZWV0KTtcbiAgQ09OVEVOVF9IQVNIX0NBQ0hFLnNldChjb250ZW50SGFzaCwgc2hlZXQpO1xuXG4gIHJldHVybiBzaGVldDtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGdldFxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBHZXQgYSByZWdpc3RlcmVkIHN0eWxlc2hlZXQgYnkgbmFtZS5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBuYW1lXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBDU1NTdHlsZVNoZWV0IHwgdW5kZWZpbmVkOyBUaGUgc3R5bGVzaGVldCwgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqL1xuXG4vKipcbiAqIEdldCBhIHJlZ2lzdGVyZWQgc3R5bGVzaGVldCBieSBuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIEByZXR1cm5zIHtDU1NTdHlsZVNoZWV0fHVuZGVmaW5lZH0gVGhlIHN0eWxlc2hlZXQsIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmQuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXQgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gU1RZTEVTSEVFVF9DQUNIRS5nZXQobmFtZSk7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBoYXNcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgQ2hlY2sgaWYgYSBzdHlsZXNoZWV0IGlzIHJlZ2lzdGVyZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbmFtZVxuICogICAgIGRhdGFUeXBlOiBzdHJpbmdcbiAqICAgICBkZXNjOiBUaGUgbmFtZSBvZiB0aGUgc3R5bGVzaGVldC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjsgVHJ1ZSBpZiB0aGUgc3R5bGVzaGVldCBpcyByZWdpc3RlcmVkLlxuICovXG5cbi8qKlxuICogQ2hlY2sgaWYgYSBzdHlsZXNoZWV0IGlzIHJlZ2lzdGVyZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHN0eWxlc2hlZXQgaXMgcmVnaXN0ZXJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGhhcyA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBTVFlMRVNIRUVUX0NBQ0hFLmhhcyhuYW1lKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IHVucmVnaXN0ZXJcbiAqIGdyb3VwTmFtZTogU3R5bGVTaGVldE1hbmFnZXJcbiAqIHBhcmVudDogU3R5bGVTaGVldE1hbmFnZXJcbiAqIGRlc2M6IHxcbiAqICAgVW5yZWdpc3RlciBhIHN0eWxlc2hlZXQgYnkgbmFtZS5cbiAqICAgTm90ZTogVGhpcyBkb2VzIG5vdCByZW1vdmUgdGhlIHN0eWxlc2hlZXQgZnJvbSBzaGFkb3cgcm9vdHMgdGhhdCBoYXZlIGFscmVhZHkgYWRvcHRlZCBpdC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBuYW1lXG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBuYW1lIG9mIHRoZSBzdHlsZXNoZWV0LlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBib29sZWFuOyBUcnVlIGlmIHRoZSBzdHlsZXNoZWV0IHdhcyB1bnJlZ2lzdGVyZWQuXG4gKi9cblxuLyoqXG4gKiBVbnJlZ2lzdGVyIGEgc3R5bGVzaGVldCBieSBuYW1lLlxuICogTm90ZTogVGhpcyBkb2VzIG5vdCByZW1vdmUgdGhlIHN0eWxlc2hlZXQgZnJvbSBzaGFkb3cgcm9vdHMgdGhhdCBoYXZlIGFscmVhZHkgYWRvcHRlZCBpdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHN0eWxlc2hlZXQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3R5bGVzaGVldCB3YXMgdW5yZWdpc3RlcmVkLlxuICovXG5leHBvcnQgY29uc3QgdW5yZWdpc3RlciA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBTVFlMRVNIRUVUX0NBQ0hFLmRlbGV0ZShuYW1lKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGFkb3B0XG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIEFkb3B0IG9uZSBvciBtb3JlIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMgaW50byBhIHNoYWRvdyByb290IG9yIGRvY3VtZW50LlxuICogICBVc2VzIHRoZSBgYWRvcHRlZFN0eWxlU2hlZXRzYCBBUEkgd2hlbiBhdmFpbGFibGUsIHdpdGggZmFsbGJhY2sgdG8gYDxzdHlsZT5gIGluamVjdGlvbi5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB0YXJnZXRcbiAqICAgICBkYXRhVHlwZTogU2hhZG93Um9vdCB8IERvY3VtZW50XG4gKiAgICAgZGVzYzogVGhlIHRhcmdldCB0byBhZG9wdCBzdHlsZXNoZWV0cyBpbnRvLlxuICogICAtIG5hbWU6IG5hbWVzXG4gKiAgICAgZGF0YVR5cGU6IEFycmF5PHN0cmluZz5cbiAqICAgICBkZXNjOiBBcnJheSBvZiBzdHlsZXNoZWV0IG5hbWVzIHRvIGFkb3B0LlxuICogICAtIG5hbWU6IG9wdGlvbnNcbiAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBPcHRpb25zIGZvciBhZG9wdGlvbi5cbiAqICAgICAgIC0gYHByZXBlbmRgOiBJZiB0cnVlLCBzdHlsZXNoZWV0cyBhcmUgYWRkZWQgYmVmb3JlIGV4aXN0aW5nIG9uZXMgKGRlZmF1bHQ6IGZhbHNlKS5cbiAqICAgICAgIC0gYGZhbGxiYWNrU3R5bGVzYDogT2JqZWN0IG1hcHBpbmcgbmFtZXMgdG8gQ1NTIHRleHQgZm9yIGZhbGxiYWNrIGluamVjdGlvbi5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgYm9vbGVhbjsgVHJ1ZSBpZiBzdHlsZXNoZWV0cyB3ZXJlIGFkb3B0ZWQgdmlhIGFkb3B0ZWRTdHlsZVNoZWV0cywgZmFsc2UgaWYgZmFsbGJhY2sgd2FzIHVzZWQuXG4gKlxuICogZXhhbXBsZXM6XG4gKiAgIC0gfFxuICogICAgIGBgYGphdmFzY3JpcHRcbiAqICAgICAvLyBBZG9wdCByZWdpc3RlcmVkIHN0eWxlc2hlZXRzXG4gKiAgICAgU3R5bGVTaGVldE1hbmFnZXIuYWRvcHQodGhpcy5zaGFkb3dSb290LCBbJ3RoZW1lJywgJ3R5cG9ncmFwaHknXSk7XG4gKlxuICogICAgIC8vIFdpdGggZmFsbGJhY2sgZm9yIG9sZGVyIGJyb3dzZXJzXG4gKiAgICAgU3R5bGVTaGVldE1hbmFnZXIuYWRvcHQodGhpcy5zaGFkb3dSb290LCBbJ3RoZW1lJ10sIHtcbiAqICAgICAgIGZhbGxiYWNrU3R5bGVzOiB7XG4gKiAgICAgICAgICd0aGVtZSc6ICc6aG9zdCB7IC0tcHJpbWFyeS1jb2xvcjogYmx1ZTsgfSdcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqICAgICBgYGBcbiAqL1xuXG4vKipcbiAqIEFkb3B0IG9uZSBvciBtb3JlIHJlZ2lzdGVyZWQgc3R5bGVzaGVldHMgaW50byBhIHNoYWRvdyByb290IG9yIGRvY3VtZW50LlxuICogQHBhcmFtIHtTaGFkb3dSb290fERvY3VtZW50fSB0YXJnZXQgLSBUaGUgdGFyZ2V0IHRvIGFkb3B0IHN0eWxlc2hlZXRzIGludG8uXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBuYW1lcyAtIEFycmF5IG9mIHN0eWxlc2hlZXQgbmFtZXMgdG8gYWRvcHQuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIC0gT3B0aW9ucyBmb3IgYWRvcHRpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnByZXBlbmQ9ZmFsc2VdIC0gSWYgdHJ1ZSwgc3R5bGVzaGVldHMgYXJlIGFkZGVkIGJlZm9yZSBleGlzdGluZyBvbmVzLlxuICogQHBhcmFtIHtPYmplY3Q8c3RyaW5nLCBzdHJpbmc+fSBbb3B0aW9ucy5mYWxsYmFja1N0eWxlc10gLSBPYmplY3QgbWFwcGluZyBuYW1lcyB0byBDU1MgdGV4dCBmb3IgZmFsbGJhY2sgaW5qZWN0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgc3R5bGVzaGVldHMgd2VyZSBhZG9wdGVkIHZpYSBhZG9wdGVkU3R5bGVTaGVldHMsIGZhbHNlIGlmIGZhbGxiYWNrIHdhcyB1c2VkLlxuICovXG5leHBvcnQgY29uc3QgYWRvcHQgPSAodGFyZ2V0LCBuYW1lcywgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGlmICghdGFyZ2V0KVxuICAgIHJldHVybiBmYWxzZTtcblxuICBsZXQgc2hlZXRzID0gbmFtZXMubWFwKChuYW1lKSA9PiBTVFlMRVNIRUVUX0NBQ0hFLmdldChuYW1lKSkuZmlsdGVyKEJvb2xlYW4pO1xuXG4gIC8vIFVzZSBhZG9wdGVkU3R5bGVTaGVldHMgaWYgYXZhaWxhYmxlIGFuZCBhbGwgc2hlZXRzIGV4aXN0XG4gIGlmIChzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cyAmJiB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzICE9PSB1bmRlZmluZWQgJiYgc2hlZXRzLmxlbmd0aCA9PT0gbmFtZXMubGVuZ3RoKSB7XG4gICAgbGV0IGV4aXN0aW5nU2hlZXRzID0gQXJyYXkuZnJvbSh0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzKTtcblxuICAgIC8vIEZpbHRlciBvdXQgc2hlZXRzIHRoYXQgYXJlIGFscmVhZHkgYWRvcHRlZFxuICAgIGxldCBuZXdTaGVldHMgPSBzaGVldHMuZmlsdGVyKChzaGVldCkgPT4gIWV4aXN0aW5nU2hlZXRzLmluY2x1ZGVzKHNoZWV0KSk7XG5cbiAgICBpZiAobmV3U2hlZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChvcHRpb25zLnByZXBlbmQpXG4gICAgICAgIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbIC4uLm5ld1NoZWV0cywgLi4uZXhpc3RpbmdTaGVldHMgXTtcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IFsgLi4uZXhpc3RpbmdTaGVldHMsIC4uLm5ld1NoZWV0cyBdO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gRmFsbGJhY2s6IGluamVjdCA8c3R5bGU+IGVsZW1lbnRzXG4gIGlmIChvcHRpb25zLmZhbGxiYWNrU3R5bGVzKSB7XG4gICAgZm9yIChsZXQgbmFtZSBvZiBuYW1lcykge1xuICAgICAgbGV0IGNzc1RleHQgPSBvcHRpb25zLmZhbGxiYWNrU3R5bGVzW25hbWVdO1xuXG4gICAgICBpZiAoIWNzc1RleHQpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGluamVjdGVkXG4gICAgICBsZXQgZXhpc3RpbmdTdHlsZSA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKGBzdHlsZVtkYXRhLXN0eWxlc2hlZXQtbmFtZT1cIiR7bmFtZX1cIl1gKTtcbiAgICAgIGlmIChleGlzdGluZ1N0eWxlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgbGV0IHN0eWxlRWxlbWVudCA9ICh0YXJnZXQub3duZXJEb2N1bWVudCB8fCBkb2N1bWVudCkuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3R5bGVzaGVldC1uYW1lJywgbmFtZSk7XG4gICAgICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuXG4gICAgICBpZiAob3B0aW9ucy5wcmVwZW5kICYmIHRhcmdldC5maXJzdENoaWxkKVxuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgICAgZWxzZSBpZiAodGFyZ2V0LmFwcGVuZENoaWxkKVxuICAgICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcbiAgICAgIGVsc2UgaWYgKHRhcmdldC5oZWFkKVxuICAgICAgICB0YXJnZXQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGNyZWF0ZUZyb21UZXh0XG4gKiBncm91cE5hbWU6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBwYXJlbnQ6IFN0eWxlU2hlZXRNYW5hZ2VyXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhIENTU1N0eWxlU2hlZXQgZnJvbSBDU1MgdGV4dCB3aXRob3V0IHJlZ2lzdGVyaW5nIGl0LlxuICogICBVc2VmdWwgZm9yIGNvbXBvbmVudC1zcGVjaWZpYyBzdHlsZXMgdGhhdCBkb24ndCBuZWVkIHRvIGJlIHNoYXJlZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiBjc3NUZXh0XG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IFRoZSBDU1MgY29udGVudC5cbiAqIHJldHVybjogfFxuICogICBAdHlwZXMgQ1NTU3R5bGVTaGVldCB8IG51bGw7IFRoZSBjb25zdHJ1Y3RlZCBzdHlsZXNoZWV0LCBvciBudWxsIGlmIG5vdCBzdXBwb3J0ZWQuXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBDU1NTdHlsZVNoZWV0IGZyb20gQ1NTIHRleHQgd2l0aG91dCByZWdpc3RlcmluZyBpdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3NUZXh0IC0gVGhlIENTUyBjb250ZW50LlxuICogQHJldHVybnMge0NTU1N0eWxlU2hlZXR8bnVsbH0gVGhlIGNvbnN0cnVjdGVkIHN0eWxlc2hlZXQsIG9yIG51bGwgaWYgbm90IHN1cHBvcnRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUZyb21UZXh0ID0gKGNzc1RleHQpID0+IHtcbiAgaWYgKCFzdXBwb3J0c0NvbnN0cnVjdGFibGVTdHlsZXNoZWV0cylcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgc2hlZXQgPSBuZXcgQ1NTU3R5bGVTaGVldCgpO1xuICBzaGVldC5yZXBsYWNlU3luYyhjc3NUZXh0KTtcbiAgcmV0dXJuIHNoZWV0O1xufTtcblxuLyoqXG4gKiB0eXBlOiBGdW5jdGlvblxuICogbmFtZTogYWRvcHRGcm9tVGV4dFxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBDcmVhdGUgYW5kIGltbWVkaWF0ZWx5IGFkb3B0IGEgc3R5bGVzaGVldCBmcm9tIENTUyB0ZXh0LlxuICogICBVc2VmdWwgZm9yIG9uZS1vZmYgY29tcG9uZW50IHN0eWxlcy5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB0YXJnZXRcbiAqICAgICBkYXRhVHlwZTogU2hhZG93Um9vdCB8IERvY3VtZW50XG4gKiAgICAgZGVzYzogVGhlIHRhcmdldCB0byBhZG9wdCBpbnRvLlxuICogICAtIG5hbWU6IGNzc1RleHRcbiAqICAgICBkYXRhVHlwZTogc3RyaW5nXG4gKiAgICAgZGVzYzogVGhlIENTUyBjb250ZW50LlxuICogICAtIG5hbWU6IG9wdGlvbnNcbiAqICAgICBkYXRhVHlwZTogb2JqZWN0XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiBPcHRpb25zIGZvciBhZG9wdGlvbiAoc2VlIGBhZG9wdGApLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBDU1NTdHlsZVNoZWV0IHwgSFRNTFN0eWxlRWxlbWVudCB8IG51bGw7IFRoZSBzdHlsZXNoZWV0IG9yIHN0eWxlIGVsZW1lbnQsIG9yIG51bGwgb24gZmFpbHVyZS5cbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgaW1tZWRpYXRlbHkgYWRvcHQgYSBzdHlsZXNoZWV0IGZyb20gQ1NTIHRleHQuXG4gKiBAcGFyYW0ge1NoYWRvd1Jvb3R8RG9jdW1lbnR9IHRhcmdldCAtIFRoZSB0YXJnZXQgdG8gYWRvcHQgaW50by5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjc3NUZXh0IC0gVGhlIENTUyBjb250ZW50LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSAtIE9wdGlvbnMgZm9yIGFkb3B0aW9uIChzZWUgYWRvcHQpLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5wcmVwZW5kPWZhbHNlXSAtIElmIHRydWUsIHN0eWxlc2hlZXRzIGFyZSBhZGRlZCBiZWZvcmUgZXhpc3Rpbmcgb25lcy5cbiAqIEByZXR1cm5zIHtDU1NTdHlsZVNoZWV0fEhUTUxTdHlsZUVsZW1lbnR8bnVsbH0gVGhlIHN0eWxlc2hlZXQgb3Igc3R5bGUgZWxlbWVudCwgb3IgbnVsbCBvbiBmYWlsdXJlLlxuICovXG5leHBvcnQgY29uc3QgYWRvcHRGcm9tVGV4dCA9ICh0YXJnZXQsIGNzc1RleHQsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBpZiAoIXRhcmdldClcbiAgICByZXR1cm4gbnVsbDtcblxuICBpZiAoc3VwcG9ydHNDb25zdHJ1Y3RhYmxlU3R5bGVzaGVldHMgJiYgdGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IHNoZWV0ID0gY3JlYXRlRnJvbVRleHQoY3NzVGV4dCk7XG5cbiAgICBpZiAoc2hlZXQpIHtcbiAgICAgIGxldCBleGlzdGluZ1NoZWV0cyA9IEFycmF5LmZyb20odGFyZ2V0LmFkb3B0ZWRTdHlsZVNoZWV0cyk7XG5cbiAgICAgIGlmIChvcHRpb25zLnByZXBlbmQpXG4gICAgICAgIHRhcmdldC5hZG9wdGVkU3R5bGVTaGVldHMgPSBbIHNoZWV0LCAuLi5leGlzdGluZ1NoZWV0cyBdO1xuICAgICAgZWxzZVxuICAgICAgICB0YXJnZXQuYWRvcHRlZFN0eWxlU2hlZXRzID0gWyAuLi5leGlzdGluZ1NoZWV0cywgc2hlZXQgXTtcblxuICAgICAgcmV0dXJuIHNoZWV0O1xuICAgIH1cbiAgfVxuXG4gIC8vIEZhbGxiYWNrIHRvIDxzdHlsZT4gZWxlbWVudFxuICBsZXQgc3R5bGVFbGVtZW50ID0gKHRhcmdldC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50KS5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZUVsZW1lbnQudGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuXG4gIGlmIChvcHRpb25zLnByZXBlbmQgJiYgdGFyZ2V0LmZpcnN0Q2hpbGQpXG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgZWxzZSBpZiAodGFyZ2V0LmFwcGVuZENoaWxkKVxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuICBlbHNlIGlmICh0YXJnZXQuaGVhZClcbiAgICB0YXJnZXQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXG4gIHJldHVybiBzdHlsZUVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIHR5cGU6IEZ1bmN0aW9uXG4gKiBuYW1lOiBjbGVhclxuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBDbGVhciBhbGwgcmVnaXN0ZXJlZCBzdHlsZXNoZWV0cy5cbiAqICAgUHJpbWFyaWx5IHVzZWZ1bCBmb3IgdGVzdGluZy5cbiAqL1xuXG4vKipcbiAqIENsZWFyIGFsbCByZWdpc3RlcmVkIHN0eWxlc2hlZXRzLiBQcmltYXJpbHkgdXNlZnVsIGZvciB0ZXN0aW5nLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmV4cG9ydCBjb25zdCBjbGVhciA9ICgpID0+IHtcbiAgU1RZTEVTSEVFVF9DQUNIRS5jbGVhcigpO1xuICBDT05URU5UX0hBU0hfQ0FDSEUuY2xlYXIoKTtcbn07XG5cbi8qKlxuICogdHlwZTogRnVuY3Rpb25cbiAqIG5hbWU6IGdldFJlZ2lzdGVyZWROYW1lc1xuICogZ3JvdXBOYW1lOiBTdHlsZVNoZWV0TWFuYWdlclxuICogcGFyZW50OiBTdHlsZVNoZWV0TWFuYWdlclxuICogZGVzYzogfFxuICogICBHZXQgdGhlIG5hbWVzIG9mIGFsbCByZWdpc3RlcmVkIHN0eWxlc2hlZXRzLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBBcnJheTxzdHJpbmc+OyBBcnJheSBvZiByZWdpc3RlcmVkIHN0eWxlc2hlZXQgbmFtZXMuXG4gKi9cblxuLyoqXG4gKiBHZXQgdGhlIG5hbWVzIG9mIGFsbCByZWdpc3RlcmVkIHN0eWxlc2hlZXRzLlxuICogQHJldHVybnMge3N0cmluZ1tdfSBBcnJheSBvZiByZWdpc3RlcmVkIHN0eWxlc2hlZXQgbmFtZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSZWdpc3RlcmVkTmFtZXMgPSAoKSA9PiB7XG4gIHJldHVybiBBcnJheS5mcm9tKFNUWUxFU0hFRVRfQ0FDSEUua2V5cygpKTtcbn07XG5cbi8vIEV4cG9ydCBhcyBuYW1lc3BhY2UtbGlrZSBvYmplY3QgYXMgd2VsbFxuZXhwb3J0IGNvbnN0IFN0eWxlU2hlZXRNYW5hZ2VyID0ge1xuICBpc1N1cHBvcnRlZCxcbiAgcmVnaXN0ZXIsXG4gIGdldCxcbiAgaGFzLFxuICB1bnJlZ2lzdGVyLFxuICBhZG9wdCxcbiAgY3JlYXRlRnJvbVRleHQsXG4gIGFkb3B0RnJvbVRleHQsXG4gIGNsZWFyLFxuICBnZXRSZWdpc3RlcmVkTmFtZXMsXG59O1xuIiwiaW1wb3J0IHtcbiAgTVlUSElYX05BTUVfVkFMVUVfUEFJUl9IRUxQRVIsXG4gIE1ZVEhJWF9TSEFET1dfUEFSRU5ULFxuICBNWVRISVhfVFlQRSxcbiAgRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUsXG4gIFFVRVJZX0VOR0lORV9UWVBFLFxuICBNWVRISVhfVUlfQ09NUE9ORU5UX1RZUEUsXG59IGZyb20gJy4vY29uc3RhbnRzLmpzJztcblxuaW1wb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5cbmltcG9ydCB7IER5bmFtaWNQcm9wZXJ0eSB9IGZyb20gJy4vZHluYW1pYy1wcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogdHlwZTogTmFtZXNwYWNlXG4gKiBuYW1lOiBVdGlsc1xuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBgaW1wb3J0IHsgVXRpbHMgfSBmcm9tICdteXRoaXgtdWktY29yZUAxLjAnO2BcbiAqXG4gKiAgIE1pc2MgdXRpbGl0eSBmdW5jdGlvbnMgYXJlIGZvdW5kIHdpdGhpbiB0aGlzIG5hbWVzcGFjZS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gYmluZE1ldGhvZHMoX3Byb3RvLCBza2lwUHJvdG9zKSB7XG4gIGxldCBwcm90byAgICAgICAgICAgPSBfcHJvdG87XG4gIGxldCBhbHJlYWR5VmlzaXRlZCAgPSBuZXcgU2V0KCk7XG5cbiAgd2hpbGUgKHByb3RvKSB7XG4gICAgaWYgKHByb3RvID09PSBPYmplY3QucHJvdG90eXBlKVxuICAgICAgcmV0dXJuO1xuXG4gICAgbGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMocHJvdG8pO1xuICAgIGxldCBrZXlzICAgICAgICA9IE9iamVjdC5rZXlzKGRlc2NyaXB0b3JzKS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhkZXNjcmlwdG9ycykpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGlsID0ga2V5cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChrZXkgPT09ICdjb25zdHJ1Y3RvcicgfHwga2V5ID09PSAncHJvdG90eXBlJylcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGlmIChhbHJlYWR5VmlzaXRlZC5oYXMoa2V5KSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIGFscmVhZHlWaXNpdGVkLmFkZChrZXkpO1xuXG4gICAgICBsZXQgZGVzY3JpcHRvciA9IGRlc2NyaXB0b3JzW2tleV07XG5cbiAgICAgIC8vIENhbiBpdCBiZSBjaGFuZ2VkP1xuICAgICAgaWYgKGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID09PSBmYWxzZSlcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIC8vIElmIGlzIGdldHRlciwgdGhlbiBza2lwXG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlc2NyaXB0b3IsICdnZXQnKSB8fCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVzY3JpcHRvciwgJ3NldCcpKSB7XG4gICAgICAgIGxldCBuZXdEZXNjcmlwdG9yID0geyAuLi5kZXNjcmlwdG9yIH07XG4gICAgICAgIGlmIChuZXdEZXNjcmlwdG9yLmdldClcbiAgICAgICAgICBuZXdEZXNjcmlwdG9yLmdldCA9IG5ld0Rlc2NyaXB0b3IuZ2V0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgaWYgKG5ld0Rlc2NyaXB0b3Iuc2V0KVxuICAgICAgICAgIG5ld0Rlc2NyaXB0b3Iuc2V0ID0gbmV3RGVzY3JpcHRvci5zZXQuYmluZCh0aGlzKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCBuZXdEZXNjcmlwdG9yKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAgIC8vIFNraXAgcHJvdG90eXBlIG9mIE9iamVjdFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBPYmplY3QucHJvdG90eXBlW2tleV0gPT09IHZhbHVlKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIHsgLi4uZGVzY3JpcHRvciwgdmFsdWU6IHZhbHVlLmJpbmQodGhpcykgfSk7XG4gICAgfVxuXG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgIGlmIChwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSlcbiAgICAgIGJyZWFrO1xuXG4gICAgaWYgKHNraXBQcm90b3MgJiYgc2tpcFByb3Rvcy5pbmRleE9mKHByb3RvKSA+PSAwKVxuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlc2NyaXB0b3JGcm9tUHJvdG90eXBlQ2hhaW4oc3RhcnRQcm90bywgZGVzY3JpcHRvck5hbWUpIHtcbiAgbGV0IHRoaXNQcm90byA9IHN0YXJ0UHJvdG87XG4gIGxldCBkZXNjcmlwdG9yO1xuXG4gIHdoaWxlICh0aGlzUHJvdG8gJiYgIShkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzUHJvdG8sIGRlc2NyaXB0b3JOYW1lKSkpXG4gICAgdGhpc1Byb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXNQcm90byk7XG5cbiAgcmV0dXJuIHsgcHJvdG90eXBlOiB0aGlzUHJvdG8sIGRlc2NyaXB0b3IgfTtcbn1cblxuY29uc3QgTUVUQURBVEFfU1RPUkFHRSA9IFN5bWJvbC5mb3IoJ0BteXRoaXgvbXl0aGl4LXVpL2NvbXBvbmVudC9jb25zdGFudHMvbWV0YWRhdGEtc3RvcmFnZScpO1xuY29uc3QgTUVUQURBVEFfV0VBS01BUCA9IGdsb2JhbFRoaXMubXl0aGl4VUlbTUVUQURBVEFfU1RPUkFHRV0gPSAoZ2xvYmFsVGhpcy5teXRoaXhVSVtNRVRBREFUQV9TVE9SQUdFXSkgPyBnbG9iYWxUaGlzLm15dGhpeFVJW01FVEFEQVRBX1NUT1JBR0VdIDogbmV3IFdlYWtNYXAoKTtcblxuLyoqXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIFN0b3JlIGFuZCByZXRyaWV2ZSBtZXRhZGF0YSBvbiBhbnkgZ2FyYmFnZS1jb2xsZWN0YWJsZSByZWZlcmVuY2UuXG4gKlxuICogICBUaGlzIGZ1bmN0aW9uIHVzZXMgYW4gaW50ZXJuYWwgV2Vha01hcCB0byBzdG9yZSBtZXRhZGF0YSBmb3IgYW55IGdhcmJhZ2UtY29sbGVjdGFibGUgdmFsdWUuXG4gKlxuICogICBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyBwcm92aWRlZCB3aWxsIGNoYW5nZSB0aGUgYmVoYXZpb3Igb2YgdGhpcyBmdW5jdGlvbjpcbiAqICAgMS4gSWYgb25seSBvbmUgYXJndW1lbnQgaXMgc3VwcGxpZWQgKGEgYHRhcmdldGApLCB0aGVuIGEgTWFwIG9mIG1ldGFkYXRhIGtleS92YWx1ZSBwYWlycyBpcyByZXR1cm5lZC5cbiAqICAgMi4gSWYgb25seSB0d28gYXJndW1lbnRzIGFyZSBzdXBwbGllZCwgdGhlbiBgbWV0YWRhdGFgIGFjdHMgYXMgYSBnZXR0ZXIsIGFuZCB0aGUgdmFsdWUgc3RvcmVkIHVuZGVyIHRoZSBzcGVjaWZpZWQgYGtleWAgaXMgcmV0dXJuZWQuXG4gKiAgIDMuIElmIG1vcmUgdGhhbiB0d28gYXJndW1lbnRzIGFyZSBzdXBwbGllZCwgdGhlbiBgbWV0YWRhdGFgIGFjdHMgYXMgYSBzZXR0ZXIsIGFuZCBgdGFyZ2V0YCBpcyByZXR1cm5lZCAoZm9yIGNvbnRpbnVlZCBjaGFpbmluZykuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogdGFyZ2V0XG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoaXMgaXMgdGhlIHZhbHVlIGZvciB3aGljaCBtZXRhZGF0YSBpcyBiZWluZyBzdG9yZWQgb3IgcmV0cmlldmVkLlxuICogICAgICAgVGhpcyBjYW4gYmUgYW55IGdhcmJhZ2UtY29sbGVjdGFibGUgdmFsdWUgKGFueSB2YWx1ZSB0aGF0IGNhbiBiZSB1c2VkIGFzIGEga2V5IGluIGEgV2Vha01hcCkuXG4gKiAgIC0gbmFtZToga2V5XG4gKiAgICAgZGF0YVR5cGU6IGFueVxuICogICAgIG9wdGlvbmFsOiB0cnVlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIGtleSB1c2VkIHRvIHN0b3JlIG9yIGZldGNoIHRoZSBzcGVjaWZpZWQgbWV0YWRhdGEgdmFsdWUuIFRoaXMgY2FuIGJlIGFueSB2YWx1ZSwgYXMgdGhlIHVuZGVybHlpbmdcbiAqICAgICAgIHN0b3JhZ2UgaXMgYSBNYXAuXG4gKiAgIC0gbmFtZTogdmFsdWVcbiAqICAgICBkYXRhVHlwZTogYW55XG4gKiAgICAgb3B0aW9uYWw6IHRydWVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgdmFsdWUgdG8gc3RvcmUgb24gdGhlIGB0YXJnZXRgIHVuZGVyIHRoZSBzcGVjaWZpZWQgYGtleWAuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIGFueTtcbiAqICAgMS4gSWYgb25seSBvbmUgYXJndW1lbnQgaXMgcHJvdmlkZWQgKGEgYnVsayBnZXQgb3BlcmF0aW9uKSwgcmV0dXJuIGEgTWFwIGNvbnRhaW5pbmcgdGhlIG1ldGFkYXRhIGZvciB0aGUgc3BlY2lmaWVkIGB0YXJnZXRgLlxuICogICAyLiBJZiB0d28gYXJndW1lbnRzIGFyZSBwcm92aWRlZCAoYSBnZXQgb3BlcmF0aW9uKSwgdGhlIGB0YXJnZXRgIG1ldGFkYXRhIHZhbHVlIHN0b3JlZCBmb3IgdGhlIHNwZWNpZmllZCBga2V5YC5cbiAqICAgMi4gSWYgbW9yZSB0aGFuIHR3byBhcmd1bWVudHMgYXJlIHByb3ZpZGVkIChhIHNldCBvcGVyYXRpb24pLCB0aGUgcHJvdmlkZWQgYHRhcmdldGAgaXMgcmV0dXJuZWQuXG4gKiBleGFtcGxlczpcbiAqICAgLSB8XG4gKiAgICAgYGBgamF2YXNjcmlwdFxuICogICAgIGltcG9ydCB7IFV0aWxzIH0gZnJvbSAnbXl0aGl4LXVpLWNvcmVAMS4wJztcbiAqXG4gKiAgICAgLy8gc2V0XG4gKiAgICAgVXRpbHMubWV0YWRhdGEobXlFbGVtZW50LCAnY3VzdG9tQ2FwdGlvbicsICdNZXRhZGF0YSBDYXB0aW9uIScpO1xuICpcbiAqICAgICAvLyBnZXRcbiAqICAgICBjb25zb2xlLmxvZyhVdGlscy5tZXRhZGF0YShteUVsZW1lbnQsICdjdXN0b21DYXB0aW9uJykpO1xuICogICAgIC8vIG91dHB1dCAtPiAnTWV0YWRhdGEgQ2FwdGlvbiEnXG4gKlxuICogICAgIC8vIGdldCBhbGxcbiAqICAgICBjb25zb2xlLmxvZyhVdGlscy5tZXRhZGF0YShteUVsZW1lbnQpKTtcbiAqICAgICAvLyBvdXRwdXQgLT4gTWFwKDEpIHsgJ2N1c3RvbUNhcHRpb24nID0+ICdNZXRhZGF0YSBDYXB0aW9uIScgfVxuICogICAgIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWV0YWRhdGEodGFyZ2V0LCBrZXksIHZhbHVlKSB7XG4gIGxldCBkYXRhID0gTUVUQURBVEFfV0VBS01BUC5nZXQodGFyZ2V0KTtcbiAgaWYgKCFkYXRhKSB7XG4gICAgaWYgKCFCYXNlVXRpbHMuaXNDb2xsZWN0YWJsZSh0YXJnZXQpKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmFibGUgdG8gc2V0IG1ldGFkYXRhIG9uIHByb3ZpZGVkIG9iamVjdDogJHsodHlwZW9mIHRhcmdldCA9PT0gJ3N5bWJvbCcpID8gdGFyZ2V0LnRvU3RyaW5nKCkgOiB0YXJnZXR9YCk7XG5cbiAgICBkYXRhID0gbmV3IE1hcCgpO1xuICAgIE1FVEFEQVRBX1dFQUtNQVAuc2V0KHRhcmdldCwgZGF0YSk7XG4gIH1cblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcbiAgICByZXR1cm4gZGF0YTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMilcbiAgICByZXR1cm4gKGRhdGEpID8gZGF0YS5nZXQoa2V5KSA6IHVuZGVmaW5lZDtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jb25zdCBWQUxJRF9KU19JREVOVElGSUVSID0gL15bYS16QS1aXyRdW2EtekEtWjAtOV8kXSokLztcbmNvbnN0IFJFU0VSVkVEX0lERU5USUZJRVIgPSAvXihicmVha3xjYXNlfGNhdGNofGNsYXNzfGNvbnN0fGNvbnRpbnVlfGRlYnVnZ2VyfGRlZmF1bHR8ZGVsZXRlfGRvfGVsc2V8ZXhwb3J0fGV4dGVuZHN8ZmFsc2V8ZmluYWxseXxmb3J8ZnVuY3Rpb258aWZ8aW1wb3J0fGlufGluc3RhbmNlb2Z8bmV3fG51bGx8cmV0dXJufHN1cGVyfHN3aXRjaHx0aGlzfHRocm93fHRydWV8dHJ5fHR5cGVvZnx2YXJ8dm9pZHx3aGlsZXx3aXRofGxldHxzdGF0aWN8eWllbGQpJC87XG5cbmZ1bmN0aW9uIGdldENvbnRleHRDYWxsQXJncyhjb250ZXh0LCAuLi5leHRyYUNvbnRleHRzKSB7XG4gIGxldCBjb250ZXh0Q2FsbEFyZ3MgPSBBcnJheS5mcm9tKFxuICAgIG5ldyBTZXQoZ2V0QWxsUHJvcGVydHlOYW1lcyhjb250ZXh0KS5jb25jYXQoXG4gICAgICBPYmplY3Qua2V5cyhnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlIHx8IHt9KSxcbiAgICAgIFsgJ2F0dHJpYnV0ZXMnLCAnY2xhc3NMaXN0JywgJyQkJywgJ2kxOG4nIF0sXG4gICAgICAuLi5leHRyYUNvbnRleHRzLm1hcCgoZXh0cmFDb250ZXh0KSA9PiBPYmplY3Qua2V5cyhleHRyYUNvbnRleHQgfHwge30pKSxcbiAgICApKSxcbiAgKS5maWx0ZXIoKG5hbWUpID0+IHtcbiAgICBpZiAoUkVTRVJWRURfSURFTlRJRklFUi50ZXN0KG5hbWUpKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIFZBTElEX0pTX0lERU5USUZJRVIudGVzdChuYW1lKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGB7JHtjb250ZXh0Q2FsbEFyZ3Muam9pbignLCcpfX1gO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgR2V0IHRoZSBwYXJlbnQgTm9kZSBvZiBgZWxlbWVudGAuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogZWxlbWVudFxuICogICAgIGRhdGFUeXBlOiBOb2RlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIE5vZGUgd2hvc2UgcGFyZW50IHlvdSB3aXNoIHRvIGZpbmQuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IFVubGlrZSBbTm9kZS5wYXJlbnROb2RlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9wYXJlbnROb2RlKSwgdGhpc1xuICogICAgIHdpbGwgYWxzbyBzZWFyY2ggYWNyb3NzIFNoYWRvdyBET00gYm91bmRhcmllcy5cbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6ICoqU2VhcmNoaW5nIGFjcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJpZXMgb25seSB3b3JrcyBmb3IgTXl0aGl4IFVJIGNvbXBvbmVudHMhKipcbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFNlYXJjaGluZyBhY3Jvc3MgU2hhZG93IERPTSBib3VuZGFyaWVzIGlzIGFjY29tcGxpc2hlZCB2aWEgbGV2ZXJhZ2luZyBAc2VlIE15dGhpeFVJQ29tcG9uZW50Lm1ldGFkYXRhOyBvblxuICogICAgIGBlbGVtZW50YC4gV2hlbiBhIGBudWxsYCBwYXJlbnQgaXMgZW5jb3VudGVyZWQsIGBnZXRQYXJlbnROb2RlYCB3aWxsIGxvb2sgZm9yIEBzZWUgTXl0aGl4VUlDb21wb25lbnQubWV0YWRhdGE/Y2FwdGlvbj1tZXRhZGF0YTsga2V5IEBzZWUgQ29uc3RhbnRzLk1ZVEhJWF9TSEFET1dfUEFSRU5UO1xuICogICAgIG9uIGBlbGVtZW50YC4gSWYgZm91bmQsIHRoZSByZXN1bHQgaXMgY29uc2lkZXJlZCB0aGUgW3BhcmVudCBOb2RlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9wYXJlbnROb2RlKSBvZiBgZWxlbWVudGAuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIE5vZGU7IFRoZSBwYXJlbnQgbm9kZSwgaWYgdGhlcmUgaXMgYW55LCBvciBgbnVsbGAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudClcbiAgICByZXR1cm4gbnVsbDtcblxuICBpZiAoZWxlbWVudC5wYXJlbnROb2RlICYmIGVsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFKVxuICAgIHJldHVybiBtZXRhZGF0YShlbGVtZW50LnBhcmVudE5vZGUsIE1ZVEhJWF9TSEFET1dfUEFSRU5UKSB8fCBudWxsO1xuXG4gIGlmICghZWxlbWVudC5wYXJlbnROb2RlICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IE5vZGUuRE9DVU1FTlRfRlJBR01FTlRfTk9ERSlcbiAgICByZXR1cm4gbWV0YWRhdGEoZWxlbWVudCwgTVlUSElYX1NIQURPV19QQVJFTlQpIHx8IG51bGw7XG5cbiAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZTtcbn1cblxuLyoqXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENyZWF0ZSBhIFByb3h5IHRoYXQgaXMgZXNzZW50aWFsbHkgKGZ1bmN0aW9uYWxseSkgYSBtdWx0aS1wcm90b3R5cGUgYG9iamVjdGAgaW5zdGFuY2UuXG4gKlxuICogICBBIFwic2NvcGVcIiBpbiBNeXRoaXggVUkgbWlnaHQgYmUgYmV0dGVyIGNhbGxlZCBhIFwiY29udGV4dFwiLi4uIGhvd2V2ZXIsIFwic2NvcGVcIlxuICogICB3YXMgY2hvc2VuIGJlY2F1c2UgaXQgKmlzKiBhIHNjb3BlLi4uIG9yIG1pZ2h0IGJlIGJldHRlciBkZXNjcmliZWQgYXMgXCJtdWx0aXBsZSBzY29wZXMgaW4gb25lXCIuXG4gKiAgIFRoaXMgaXMgc3BlY2lmaWNhbGx5IGEgXCJET00gc2NvcGVcIiwgaW4gdGhhdCB0aGlzIG1ldGhvZCBpcyBcIkRPTSBhd2FyZVwiIGFuZCB3aWxsIHRyYXZlcnNlIHRoZVxuICogICBET00gbG9va2luZyBmb3IgdGhlIHJlcXVlc3RlZCBkYXRhIChpZiBhbnkgb2YgdGhlIHNwZWNpZmllZCBgdGFyZ2V0c2AgaXMgYW4gRWxlbWVudCB0aGF0IGlzKS5cbiAqXG4gKiAgIFRoZSB3YXkgdGhpcyB3b3JrcyBpcyB0aGF0IHRoZSBjYWxsZXIgd2lsbCBwcm92aWRlIGF0IGxlYXN0IG9uZSBcInRhcmdldFwiLiBUaGVzZSB0YXJnZXRzIGFyZVxuICogICB0aGVtc2VsdmVzIHNjb3BlcywgZWxlbWVudHMsIG9yIG90aGVyIGRhdGEgb2JqZWN0cy4gV2hlbiB0aGUgcmV0dXJuZWQgUHJveHkgaW5zdGFuY2UgaXMgYWNjZXNzZWQsXG4gKiAgIHRoZSByZXF1ZXN0ZWQga2V5IGlzIHNlYXJjaGVkIGluIGFsbCBwcm92aWRlZCBgdGFyZ2V0c2AsIGluIHRoZSBvcmRlciB0aGV5IHdlcmUgcHJvdmlkZWQuXG4gKlxuICogICBBc2lkZSBmcm9tIHNlYXJjaGluZyBhbGwgdGFyZ2V0cyBmb3IgdGhlIGRlc2lyZWQga2V5LCBpdCB3aWxsIGFsc28gZmFsbGJhY2sgdG8gb3RoZXIgZGF0YSBzb3VyY2VzXG4gKiAgIGl0IHNlYXJjaGVzIGluIGFzIHdlbGw6XG4gKiAgIDEuIElmIGFueSBnaXZlbiBgdGFyZ2V0YCBpdCBpcyBzZWFyY2hpbmcgaXMgYW4gRWxlbWVudCwgdGhlbiBpdCB3aWxsIGFsc28gc2VhcmNoXG4gKiAgICAgIGZvciB0aGUgcmVxdWVzdGVkIGtleSBvbiB0aGUgZWxlbWVudCBpdHNlbGYuXG4gKiAgIDIuIElmIHN0ZXAgIzEgaGFzIGZhaWxlZCwgdGhlbiBtb3ZlIHRvIHRoZSBwYXJlbnQgbm9kZSBvZiB0aGUgY3VycmVudCBFbGVtZW50IGluc3RhbmNlLCBhbmRcbiAqICAgICAgcmVwZWF0IHRoZSBwcm9jZXNzLCBzdGFydGluZyBmcm9tIHN0ZXAgIzEuXG4gKiAgIDMuIEFmdGVyIHN0ZXBzIDEtMiBhcmUgcmVwZWF0ZWQgZm9yIGV2ZXJ5IGdpdmVuIGB0YXJnZXRgIChhbmQgYWxsIHBhcmVudCBub2RlcyBvZiB0aG9zZSBgdGFyZ2V0c2AuLi4gaWYgYW55KSxcbiAqICAgICAgdGhlbiB0aGlzIG1ldGhvZCB3aWxsIGZpbmFsbHkgZmFsbGJhY2sgdG8gc2VhcmNoaW5nIGBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlYCBmb3IgdGhlIHJlcXVlc3RlZCBrZXkuXG4gKlxuICogICBXZSBhcmVuJ3QgcXVpdGUgZmluaXNoZWQgeWV0IHRob3VnaC4uLlxuICpcbiAqICAgSWYgc3RlcHMgMS0zIGFib3ZlIGFsbCBmYWlsLCB0aGVuIHRoaXMgbWV0aG9kIHdpbGwgc3RpbGwgZmFsbGJhY2sgdG8gdGhlIGZhbGxvd2luZyBoYXJkLWNvZGVkIGtleS92YWx1ZSBwYWlyczpcbiAqICAgMS4gQSByZXF1ZXN0ZWQga2V5IG9mIGAnZ2xvYmFsU2NvcGUnYCAoaWYgbm90IGZvdW5kIG9uIGEgdGFyZ2V0KSB3aWxsIHJlc3VsdCBpbiBgZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZWAgYmVpbmcgcmV0dXJuZWQuXG4gKiAgIDIuIEEgcmVxdWVzdGVkIGtleSBvZiBgJ2kxOG4nYCAoaWYgbm90IGZvdW5kIG9uIGEgdGFyZ2V0KSB3aWxsIHJlc3VsdCBpbiB0aGUgYnVpbHQtaW4gYGkxOG5gIGxhbmd1YWdlIHRlcm0gcHJvY2Vzc29yIGJlaW5nIHJldHVybmVkLlxuICogICAzLiBBIHJlcXVlc3RlZCBrZXkgb2YgYCdkeW5hbWljUHJvcElEJ2AgKGlmIG5vdCBmb3VuZCBvbiBhIHRhcmdldCkgd2lsbCByZXN1bHQgaW4gdGhlIGJ1aWx0LWluIGBkeW5hbWljUHJvcElEYCBkeW5hbWljIHByb3BlcnR5IHByb3ZpZGVkLiBTZWUgQHNlZSBVdGlscy5keW5hbWljUHJvcElEOy5cbiAqXG4gKiAgIEZpbmFsbHksIHRoZSByZXR1cm5lZCBQcm94eSB3aWxsIGFsc28gaW50ZXJjZXB0IGFueSB2YWx1ZSBbc2V0XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9Qcm94eS9Qcm94eS9zZXQpIG9wZXJhdGlvbixcbiAqICAgdG8gc2V0IGEgdmFsdWUgb24gdGhlIGZpcnN0IHRhcmdldCBmb3VuZC5cbiAqXG4gKiAgIFRoZSBQcm94eSBhbHNvIG92ZXJsb2FkcyBbb3duS2V5c10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvUHJveHkvUHJveHkvb3duS2V5cykgdG8gbGlzdCAqKmFsbCoqIGtleXMgYWNyb3NzICoqYWxsKiogYHRhcmdldHNgLlxuICogYXJndW1lbnRzOlxuICogICAtIG5hbWU6IC4uLnRhcmdldHNcbiAqICAgICBkYXRhVHlwZXM6XG4gKiAgICAgICAtIE9iamVjdFxuICogICAgICAgLSBFbGVtZW50XG4gKiAgICAgICAtIG5vbi1wcmltaXRpdmVcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBUaGUgYHRhcmdldHNgIHRvIGJlIHNlYXJjaGVkLCBpbiB0aGUgb3JkZXIgcHJvdmlkZWQuIFRhcmdldHMgYXJlIHNlYXJjaGVkIGJvdGggZm9yIGdldCBvcGVyYXRpb25zLCBhbmQgc2V0IG9wZXJhdGlvbnMgKHRoZSBmaXJzdCB0YXJnZXQgZm91bmQgd2lsbCBiZSB0aGUgc2V0IHRhcmdldCkuXG4gKiBub3RlczpcbiAqICAgLSB8XG4gKiAgICAgOndhcm5pbmc6IE15dGhpeCBVSSB3aWxsIGRlbGliZXJhdGVseSBuZXZlciBkaXJlY3RseSBhY2Nlc3MgYGdsb2JhbFRoaXNgIGZyb20gdGhlIHRlbXBsYXRlIGVuZ2luZSAoZm9yIHNlY3VyaXR5IHJlYXNvbnMpLlxuICogICAgIEJlY2F1c2Ugb2YgdGhpcywgTXl0aGl4IFVJIGF1dG9tYXRpY2FsbHkgcHJvdmlkZXMgaXRzIG93biBnbG9iYWwgc2NvcGUgYGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVgLlxuICogICAgIElmIHlvdSB3YW50IGRhdGEgdG8gYmUgXCJnbG9iYWxseVwiIHZpc2libGUgdG8gTXl0aGl4IFVJLCB0aGVuIHlvdSBuZWVkIHRvIGFkZCB5b3VyIGRhdGEgdG8gdGhpcyBzcGVjaWFsIGdsb2JhbCBzY29wZS5cbiAqICAgLSB8XG4gKiAgICAgOmluZm86IFRoaXMgbWV0aG9kIGlzIGNvbXBsZXggYmVjYXVzZSBpdCBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIHRvIHByb3ZpZGUgYSBcInNjb3BlXCIgdG8gdGhlIE15dGhpeCBVSSB0ZW1wbGF0aW5nIGVuZ2luZS5cbiAqICAgICBUaGUgdGVtcGxhdGluZyBlbmdpbmUgbmVlZHMgdG8gYmUgRE9NIGF3YXJlLCBhbmQgYWxzbyBuZWVkcyB0byBoYXZlIGFjY2VzcyB0byBzcGVjaWFsaXplZCwgc2NvcGVkIGRhdGFcbiAqICAgICAoaS5lLiB0aGUgYG15dGhpeC11aS1mb3ItZWFjaGAgY29tcG9uZW50IHdpbGwgcHVibGlzaCBzY29wZWQgZGF0YSBmb3IgZWFjaCBpdGVyYXRpb24sIHdoaWNoIG5lZWRzIHRvIGJlIGJvdGhcbiAqICAgICBET00tYXdhcmUsIGFuZCBpdGVyYXRpb24tYXdhcmUpLlxuICogICAtIHxcbiAqICAgICA6aW5mbzogQW55IHByb3ZpZGVkIGB0YXJnZXRgIGNhbiBhbHNvIGJlIG9uZSBvZiB0aGVzZSBQcm94eSBzY29wZXMgcmV0dXJuZWQgYnkgdGhpcyBtZXRob2QuXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBJdCBjYW4gaGVscCB0byB0aGluayBvZiB0aGUgcmV0dXJuZWQgXCJzY29wZVwiIGFzIGFuIHBsYWluIE9iamVjdCB0aGF0IGhhcyBhbiBhcnJheSBvZiBwcm90b3R5cGVzLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBQcm94eTsgQSBwcm94eSBpbnN0YW5jZSwgdGhhdCBpcyB1c2VkIHRvIGdldCBhbmQgc2V0IGtleXMgYWNyb3NzIG11bHRpcGxlIGB0YXJnZXRzYC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjb3BlKC4uLl90YXJnZXRzKSB7XG4gIGNvbnN0IGZpbmRQcm9wTmFtZVNjb3BlID0gKHRhcmdldCwgcHJvcE5hbWUpID0+IHtcbiAgICBpZiAodGFyZ2V0ID09IG51bGwgfHwgT2JqZWN0LmlzKHRhcmdldCwgTmFOKSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChwcm9wTmFtZSBpbiB0YXJnZXQpXG4gICAgICByZXR1cm4gdGFyZ2V0O1xuXG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpXG4gICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzZWFyY2hQYXJlbnROb2Rlc0ZvcktleSA9IChlbGVtZW50KSA9PiB7XG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgaWYgKCFjdXJyZW50RWxlbWVudClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICBkbyB7XG4gICAgICAgIGlmIChwcm9wTmFtZSBpbiBjdXJyZW50RWxlbWVudClcbiAgICAgICAgICByZXR1cm4gY3VycmVudEVsZW1lbnQ7XG5cbiAgICAgICAgY3VycmVudEVsZW1lbnQgPSBnZXRQYXJlbnROb2RlKGN1cnJlbnRFbGVtZW50KTtcbiAgICAgIH0gd2hpbGUgKGN1cnJlbnRFbGVtZW50KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlYXJjaFBhcmVudE5vZGVzRm9yS2V5KHRhcmdldCk7XG4gIH07XG5cbiAgbGV0IHRhcmdldHMgICAgICAgICA9IF90YXJnZXRzLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZpcnN0RWxlbWVudCAgICA9IHRhcmdldHMuZmluZCgodGFyZ2V0KSA9PiAodGFyZ2V0IGluc3RhbmNlb2YgTm9kZSkpIHx8IHRhcmdldHNbMF07XG4gIGxldCBiYXNlQ29udGV4dCAgICAgPSB7fTtcbiAgbGV0IGZhbGxiYWNrQ29udGV4dCA9IHtcbiAgICBnbG9iYWxTY29wZTogIChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpLFxuICAgIGkxOG46ICAgICAgICAgKHBhdGgsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICAgICAgbGV0IGxhbmd1YWdlUHJvdmlkZXIgPSBzcGVjaWFsQ2xvc2VzdChmaXJzdEVsZW1lbnQsICdteXRoaXgtbGFuZ3VhZ2UtcHJvdmlkZXInKTtcbiAgICAgIGlmICghbGFuZ3VhZ2VQcm92aWRlcilcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgICAgcmV0dXJuIGxhbmd1YWdlUHJvdmlkZXIuaTE4bihwYXRoLCBkZWZhdWx0VmFsdWUpO1xuICAgIH0sXG4gICAgZHluYW1pY1Byb3BJRCxcbiAgfTtcblxuICB0YXJnZXRzID0gdGFyZ2V0cy5jb25jYXQoZmFsbGJhY2tDb250ZXh0KTtcbiAgbGV0IHByb3h5ICAgPSBuZXcgUHJveHkoYmFzZUNvbnRleHQsIHtcbiAgICBvd25LZXlzOiAoKSA9PiB7XG4gICAgICBsZXQgYWxsS2V5cyA9IFtdO1xuXG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cylcbiAgICAgICAgYWxsS2V5cyA9IGFsbEtleXMuY29uY2F0KGdldEFsbFByb3BlcnR5TmFtZXModGFyZ2V0KSk7XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKGdsb2JhbFNjb3BlKVxuICAgICAgICBhbGxLZXlzID0gYWxsS2V5cy5jb25jYXQoT2JqZWN0LmtleXMoZ2xvYmFsU2NvcGUpKTtcblxuICAgICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhbGxLZXlzKSk7XG4gICAgfSxcbiAgICBoYXM6IChfLCBwcm9wTmFtZSkgPT4ge1xuICAgICAgZm9yIChsZXQgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgICAgbGV0IHNjb3BlID0gZmluZFByb3BOYW1lU2NvcGUodGFyZ2V0LCBwcm9wTmFtZSk7XG4gICAgICAgIGlmICghc2NvcGUpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBnbG9iYWxTY29wZSA9IChnbG9iYWxUaGlzLm15dGhpeFVJICYmIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUpO1xuICAgICAgaWYgKCFnbG9iYWxTY29wZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICByZXR1cm4gKHByb3BOYW1lIGluIGdsb2JhbFNjb3BlKTtcbiAgICB9LFxuICAgIGdldDogKF8sIHByb3BOYW1lKSA9PiB7XG4gICAgICBmb3IgKGxldCB0YXJnZXQgb2YgdGFyZ2V0cykge1xuICAgICAgICBsZXQgc2NvcGUgPSBmaW5kUHJvcE5hbWVTY29wZSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICByZXR1cm4gc2NvcGVbcHJvcE5hbWVdO1xuICAgICAgfVxuXG4gICAgICBsZXQgZ2xvYmFsU2NvcGUgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSAmJiBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlKTtcbiAgICAgIGlmICghZ2xvYmFsU2NvcGUpXG4gICAgICAgIHJldHVybjtcblxuICAgICAgcmV0dXJuIGdsb2JhbFNjb3BlW3Byb3BOYW1lXTtcbiAgICB9LFxuICAgIHNldDogKF8sIHByb3BOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgY29uc3QgZG9TZXQgPSAoc2NvcGUsIHByb3BOYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShzY29wZVtwcm9wTmFtZV0sIER5bmFtaWNQcm9wZXJ0eSkpXG4gICAgICAgICAgc2NvcGVbcHJvcE5hbWVdW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKHZhbHVlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHNjb3BlW3Byb3BOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcblxuICAgICAgZm9yIChsZXQgdGFyZ2V0IG9mIHRhcmdldHMpIHtcbiAgICAgICAgbGV0IHNjb3BlID0gZmluZFByb3BOYW1lU2NvcGUodGFyZ2V0LCBwcm9wTmFtZSk7XG4gICAgICAgIGlmICghc2NvcGUpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgcmV0dXJuIGRvU2V0KHNjb3BlLCBwcm9wTmFtZSwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBsZXQgZ2xvYmFsU2NvcGUgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSAmJiBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlKTtcbiAgICAgIGlmICghZ2xvYmFsU2NvcGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgcmV0dXJuIGRvU2V0KGdsb2JhbFNjb3BlLCBwcm9wTmFtZSwgdmFsdWUpO1xuICAgIH0sXG4gIH0pO1xuXG4gIGZhbGxiYWNrQ29udGV4dC4kJCA9IHByb3h5O1xuXG4gIHJldHVybiBwcm94eTtcbn1cblxuY29uc3QgRVZFTlRfQUNUSU9OX0pVU1RfTkFNRSA9IC9eJT9bXFx3LiRdKyQvO1xuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgKipOb3RlOioqIEZvciBldmVudCBiaW5kaW5ncywgcHJlZmVyIHVzaW5nIHRoZSBgZGF0YS1ldmVudC1vbntldmVudE5hbWV9YCBwYXR0ZXJuIChlLmcuLCBgZGF0YS1ldmVudC1vbmNsaWNrYClcbiAqICAgd2l0aCBgbXl0aGl4RXZlbnRXcmFwcGVyYCBpbnN0ZWFkLiBUaGlzIGxlZ2FjeSBmdW5jdGlvbiBpcyBtYWludGFpbmVkIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5LlxuICpcbiAqICAgQ3JlYXRlIGEgY29udGV4dC1hd2FyZSBmdW5jdGlvbiwgb3IgXCJtYWNyb1wiLCB0aGF0IGNhbiBiZSBjYWxsZWQgYW5kIHVzZWQgYnkgdGhlIHRlbXBsYXRlIGVuZ2luZS5cbiAqXG4gKiAgIElmIHlvdSBhcmUgZXZlciB0cnlpbmcgdG8gcGFzcyBtZXRob2RzIG9yIGR5bmFtaWMgcHJvcGVydGllcyBhY3Jvc3MgdGhlIERPTSwgdGhlbiB0aGlzIGlzIHRoZSBtZXRob2QgeW91IHdhbnQgdG8gdXNlLCB0b1xuICogICBwcm9wZXJseSBcInBhcnNlXCIgYW5kIHVzZSB0aGUgYXR0cmlidXRlIHZhbHVlIGFzIGludGVuZGVkLlxuICpcbiAqICAgVGhpcyBpcyB1c2VkIGZvciBleGFtcGxlIGZvciBldmVudCBiaW5kaW5ncyB2aWEgbGVnYWN5IGBvbntldmVudE5hbWV9YCBhdHRyaWJ1dGVzLiBJZiB5b3UgaGF2ZSBmb3IgZXhhbXBsZSBhbiBgb25jbGljaz1cImRvU29tZXRoaW5nXCJgXG4gKiAgIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50LCB0aGVuIHRoaXMgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIGNvbnRleHQtYXdhcmUgXCJtYWNyb1wiIGZvciB0aGUgbWV0aG9kIFwiZG9Tb21ldGhpbmdcIi5cbiAqXG4gKiAgIFRoZSB0ZXJtIFwibWFjcm9cIiBpcyB1c2VkIGhlcmUgYmVjYXVzZSB0aGVyZSBhcmUgc3BlY2lhbCBmb3JtYXRzIFwidW5kZXJzdG9vZFwiIGJ5IHRoZSB0ZW1wbGF0ZSBlbmdpbmUuIEZvciBleGFtcGxlLFxuICogICBwcmVmaXhpbmcgYW4gYXR0cmlidXRlIHZhbHVlIHdpdGggYSBwZXJjZW50IHNpZ24sIGkuZS4gYG5hbWU9XCIlZ2xvYmFsRHluYW1pY1Byb3BOYW1lXCJgIHdpbGwgdXNlIEBzZWUgVXRpbHMuZHluYW1pY1Byb3BJRDtcbiAqICAgdG8gZ2xvYmFsbHkgZmV0Y2ggcHJvcGVydHkgb2YgdGhpcyBuYW1lLiBUaGlzIGlzIGltcG9ydGFudCwgYmVjYXVzZSBkdWUgdG8gdGhlIGFzeW5jIG5hdHVyZSBvZiB0aGUgRE9NLCB5b3UgbWlnaHRcbiAqICAgYmUgcmVxdWVzdGluZyBhIGR5bmFtaWMgcHJvcGVydHkgdGhhdCBoYXNuJ3QgeWV0IGJlZW4gbG9hZGVkL2RlZmluZWQuIFRoaXMgaXMgdGhlIHB1cnBvc2Ugb2YgQHNlZSBVdGlscy5keW5hbWljUHJvcElEOyxcbiAqICAgYW5kIHRoaXMgc3BlY2lhbGl6ZWQgdGVtcGxhdGUgZm9ybWF0OiB0byBwcm92aWRlIGR5bmFtaWMgcHJvcHMgYnkgaWQsIHRoYXQgd2lsbCBiZSBhdmFpbGFibGUgd2hlbiBuZWVkZWQuXG4gKlxuICogICBUaGUgdGVtcGxhdGUgZW5naW5lIGFsc28gd2lsbCBoYXBwaWx5IGFjY2VwdCByb2d1ZSBtZXRob2QgbmFtZXMuIEZvciBleGFtcGxlLCBpbiBhIE15dGhpeCBVSSBjb21wb25lbnQgeW91IGFyZSBidWlsZGluZyxcbiAqICAgeW91IG1pZ2h0IGhhdmUgYW4gZWxlbWVudCBsaWtlIGA8YnV0dG9uIGRhdGEtZXZlbnQtb25jbGljaz1cIm9uQnV0dG9uQ2xpY2tcIj5DbGljayBNZSE8YnV0dG9uPmAuIFRoZSB0ZW1wbGF0aW5nIGVuZ2luZSB3aWxsIGRldGVjdCB0aGF0XG4gKiAgIHRoaXMgaXMgT05MWSBhbiBpZGVudGlmaWVyLCBhbmQgc28gd2lsbCBzZWFyY2ggZm9yIHRoZSBzcGVjaWZpZWQgbWV0aG9kIGluIHRoZSBhdmFpbGFibGUgXCJzY29wZVwiIChzZWUgQHNlZSBVdGlscy5jcmVhdGVTY29wZTspLFxuICogICB3aGljaCBpbmNsdWRlcyBgdGhpc2AgaW5zdGFuY2Ugb2YgeW91ciBjb21wb25lbnQgYXMgdGhlIGZpcnN0IGB0YXJnZXRgLiBUaGlzIHBhdHRlcm4gaXMgbm90IHJlcXVpcmVkLCBhcyB5b3UgY2FuIGNhbGwgeW91clxuICogICBjb21wb25lbnQgbWV0aG9kIGRpcmVjdGx5IHlvdXJzZWxmLCBhcyB3aXRoIGFueSBhdHRyaWJ1dGUgZXZlbnQgYmluZGluZyBpbiB0aGUgRE9NLCBpLmU6IGA8YnV0dG9uIGRhdGEtZXZlbnQtb25jbGljaz1cInRoaXMub25CdXR0b25DbGljayhldmVudClcIj5DbGljayBNZSE8YnV0dG9uPmAuXG4gKlxuICogICBPbmUgbGFzdCB0aGluZyB0byBtZW50aW9uIGlzIHRoYXQgd2hlbiB0aGVzZSBcIm1hY3JvXCIgbWV0aG9kcyBhcmUgY2FsbGVkIGJ5IE15dGhpeCBVSSwgYWxsIGVudW1lcmFibGUga2V5cyBvZiB0aGUgZ2VuZXJhdGVkXG4gKiAgIFwic2NvcGVcIiAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7KSBhcmUgcGFzc2VkIGludG8gdGhlIG1hY3JvIG1ldGhvZCBhcyBhcmd1bWVudHMuIFRoaXMgbWVhbnMgdGhhdCB0aGUga2V5cy92YWx1ZXMgb2YgYWxsIHNjb3BlIGB0YXJnZXRzYFxuICogICBhcmUgYXZhaWxhYmxlIGRpcmVjdGx5IGluIHlvdXIgamF2YXNjcmlwdCBzY29wZS4gaS5lLiB5b3UgY2FuIGRvIHRoaW5ncyBsaWtlIGBuYW1lPVwiY29tcG9uZW50SW5zdGFuY2VQcm9wZXJ0eSh0aGlzQXR0cmlidXRlMSwgb3RoZXJBdHRyaWJ1dGUpXCJgIHdpdGhvdXQgbmVlZGluZyB0byBkb1xuICogICBgbmFtZT1cInRoaXMuY29tcG9uZW50SW5zdGFuY2VQcm9wZXJ0eSh0aGlzLnRoaXNBdHRyaWJ1dGUxLCB0aGlzLm90aGVyQXR0cmlidXRlKVwiYC4gOndhcm5pbmc6IEl0IGlzIGltcG9ydGFudCB0byBrZWVwIGluIG1pbmQgdGhhdCBkaXJlY3QgcmVmZXJlbmNlIGFjY2VzcyBsaWtlIHRoaXMgaW4gYSBtYWNyb1xuICogICB3aWxsIGJ5cGFzcyB0aGUgXCJzY29wZVwiIChzZWUgQHNlZSBVdGlscy5jcmVhdGVTY29wZTspIFByb3h5LCBhbmQgc28gaWYgdGhlIHNwZWNpZmllZCBrZXkgaXMgbm90IGZvdW5kIChwYXNzZWQgaW4gYXMgYW4gYXJndW1lbnQgdG8gdGhlIG1hY3JvKSwgdGhlbiBhbiBlcnJvciB3aWxsIGJlIHRocm93biBieSBqYXZhc2NyaXB0LlxuICpcbiAqICAgSXQgaXMgYWJzb2x1dGVseSBwb3NzaWJsZSBmb3IgeW91IHRvIHJlY2VpdmUgYW5kIHNlbmQgYXJndW1lbnRzIHZpYSB0aGVzZSBnZW5lcmF0ZWQgXCJtYWNyb3NcIi4gYG15dGhpeC11aS1zZWFyY2hgIGRvZXMgdGhpcyBmb3JcbiAqICAgZXhhbXBsZSB3aGVuIGEgXCJmaWx0ZXJcIiBtZXRob2QgaXMgcGFzc2VkIHZpYSBhbiBhdHRyaWJ1dGUuIEJ5IGRlZmF1bHQgbm8gZXh0cmEgYXJndW1lbnRzIGFyZSBwcm92aWRlZCB3aGVuIGNhbGxlZCBkaXJlY3RseSBieSB0aGUgdGVtcGxhdGluZyBlbmdpbmUuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogb3B0aW9uc1xuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBBbiBvYmplY3Qgd2l0aCB0aGUgc2hhcGUgYHsgYm9keTogc3RyaW5nOyBwcmVmaXg/OiBzdHJpbmc7IHNjb3BlOiBvYmplY3Q7IH1gLlxuICpcbiAqICAgICAgIDEuIGBib2R5YCBpcyB0aGUgYWN0dWFsIGJvZHkgb2YgdGhlIGBuZXcgRnVuY3Rpb25gLlxuICogICAgICAgMi4gYHNjb3BlYCBpcyB0aGUgc2NvcGUgKGB0aGlzYCkgdGhhdCB5b3Ugd2FudCB0byBiaW5kIHRvIHRoZSByZXN1bHRpbmcgbWV0aG9kLlxuICogICAgICAgICAgVGhpcyB3b3VsZCBnZW5lcmFsbHkgYmUgYSBzY29wZSBjcmVhdGVkIGJ5IEBzZWUgVXRpbHMuY3JlYXRlU2NvcGU7XG4gKiAgICAgICAzLiBgcHJlZml4YCBhbiBvcHRpb25hbCBwcmVmaXggZm9yIHRoZSBib2R5IG9mIHRoZSBgbmV3IEZ1bmN0aW9uYC4gVGhpcyBwcmVmaXggaXMgYWRkZWRcbiAqICAgICAgICAgIGJlZm9yZSBhbnkgZnVuY3Rpb24gYm9keSBjb2RlIHRoYXQgTXl0aGl4IFVJIGdlbmVyYXRlcy5cbiAqICAgICAgICAgIFNlZSBoZXJlIEBzb3VyY2VSZWYgX2NyZWF0ZVRlbXBsYXRlTWFjcm9QcmVmaXhGb3JCaW5kRXZlbnRUb0VsZW1lbnQ7IGZvciBhbiBleGFtcGxlIHVzZVxuICogICAgICAgICAgb2YgYHByZWZpeGAgKG5vdGljZSBob3cgYGFyZ3VtZW50c1sxXWAgaXMgdXNlZCBpbnN0ZWFkIG9mIGBhcmd1bWVudHNbMF1gLCBhcyBgYXJndW1lbnRzWzBdYCBpcyBhbHdheXMgcmVzZXJ2ZWRcbiAqICAgICAgICAgIGZvciBsb2NhbCB2YXJpYWJsZSBuYW1lcyBcImluamVjdGVkXCIgZnJvbSB0aGUgY3JlYXRlZCBcInNjb3BlXCIpLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBBc2lkZSBmb3Igc29tZSBiZWhpbmQtdGhlLXNjZW5lIG1vZGlmaWNhdGlvbnMgYW5kIGVhc2Utb2YtdXNlIHNsaWNrbmVzcywgdGhpcyBlc3NlbnRpYWxseSBqdXN0IGNyZWF0ZXMgYSBgbmV3IEZ1bmN0aW9uYCBhbmQgYmluZHMgYSBcInNjb3BlXCIgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykgdG8gaXQuXG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUaGUgcHJvdmlkZWQgKGFuZCBvcHRpb25hbCkgYHByZWZpeGAgY2FuIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IG9mIHRoZSBtYWNybyBgbmV3IEZ1bmN0aW9uYCBib2R5IGNvZGUuIGkuZS4gQHNlZSBVdGlscy5iaW5kRXZlbnRUb0VsZW1lbnQ7IGRvZXMgZXhhY3RseSB0aGlzIHRvIGFsbG93IGRpcmVjdCBzY29wZWRcbiAqICAgICBhY2Nlc3MgdG8gdGhlIGBldmVudGAgaW5zdGFuY2UuIEBzb3VyY2VSZWYgX2NyZWF0ZVRlbXBsYXRlTWFjcm9QcmVmaXhGb3JCaW5kRXZlbnRUb0VsZW1lbnQ7XG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUaGUgcmV0dXJuIG1ldGhvZCBpcyBib3VuZCBieSBjYWxsaW5nIGAuYmluZChzY29wZSlgLiBJdCBpcyBub3QgcG9zc2libGUgdG8gbW9kaWZ5IGB0aGlzYCBhdCB0aGUgY2FsbC1zaXRlLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBmdW5jdGlvbjsgQSBmdW5jdGlvbiB0aGF0IGlzIFwiY29udGV4dCBhd2FyZVwiIGJ5IGJlaW5nIGJvdW5kIHRvIHRoZSBwcm92aWRlZCBgc2NvcGVgIChzZWUgQHNlZSBVdGlscy5jcmVhdGVTY29wZTspLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVtcGxhdGVNYWNybyh7IHByZWZpeCwgYm9keSwgc2NvcGUgfSkge1xuICBsZXQgZnVuY3Rpb25Cb2R5ID0gYm9keTtcbiAgaWYgKGZ1bmN0aW9uQm9keS5jaGFyQXQoMCkgPT09ICclJyB8fCBFVkVOVF9BQ1RJT05fSlVTVF9OQU1FLnRlc3QoZnVuY3Rpb25Cb2R5KSkge1xuICAgIGlmIChmdW5jdGlvbkJvZHkuY2hhckF0KDApID09PSAnJScpIHtcbiAgICAgIGZ1bmN0aW9uQm9keSA9IGAodGhpcy5keW5hbWljUHJvcElEIHx8IGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUuZHluYW1pY1Byb3BJRCkoJyR7ZnVuY3Rpb25Cb2R5LnN1YnN0cmluZygxKS50cmltKCkucmVwbGFjZSgvJy9nLCAnXFxcXFxcJycpfScpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuY3Rpb25Cb2R5ID0gYCgoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IF9fX18kID0gJHtmdW5jdGlvbkJvZHl9O1xuICAgICAgICAgIHJldHVybiAodHlwZW9mIF9fX18kID09PSAnZnVuY3Rpb24nKSA/IF9fX18kLmFwcGx5KHRoaXMsIEFycmF5LmZyb20oYXJndW1lbnRzKS5zbGljZSgxKSkgOiBfX19fJDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLiR7ZnVuY3Rpb25Cb2R5LnJlcGxhY2UoL15cXHMqdGhpc1xcLi8sICcnKX0uYXBwbHkodGhpcywgQXJyYXkuZnJvbShhcmd1bWVudHMpLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgICAgfSkoKTtgO1xuICAgIH1cbiAgfVxuXG4gIGxldCBjb250ZXh0Q2FsbEFyZ3MgPSBnZXRDb250ZXh0Q2FsbEFyZ3Moc2NvcGUsIHsgJ19fbWFjcm9Tb3VyY2UnOiBudWxsLCAnX19leHBhbmRlZE1hY3JvU291cmNlJzogbnVsbCB9KTtcblxuICBmdW5jdGlvbkJvZHkgPSBgdHJ5IHsgJHsocHJlZml4KSA/IGAke3ByZWZpeH07YCA6ICcnfXJldHVybiAkeyhmdW5jdGlvbkJvZHkgfHwgJyh2b2lkIDApJykucmVwbGFjZSgvXlxccypyZXR1cm5cXHMrLywgJycpLnRyaW0oKX07IH0gY2F0Y2ggKGVycm9yKSB7IGNvbnNvbGUuZXJyb3IoXFxgRXJyb3IgaW4gbWFjcm8gW1xcJHtfX21hY3JvU291cmNlfV06XFxgLCBlcnJvciwgX19leHBhbmRlZE1hY3JvU291cmNlKTsgdGhyb3cgZXJyb3I7IH1gO1xuXG4gIGxldCBsb2NhbFNjb3BlID0gT2JqZWN0LmNyZWF0ZShzY29wZSk7XG4gIGxvY2FsU2NvcGUuX19tYWNyb1NvdXJjZSA9IGJvZHk7XG4gIGxvY2FsU2NvcGUuX19leHBhbmRlZE1hY3JvU291cmNlID0gZnVuY3Rpb25Cb2R5O1xuXG4gIHJldHVybiAobmV3IEZ1bmN0aW9uKGNvbnRleHRDYWxsQXJncywgZnVuY3Rpb25Cb2R5KSkuYmluZChzY29wZSB8fCB7fSwgc2NvcGUpO1xufVxuXG4vKipcbiAqIGdyb3VwTmFtZTogVXRpbHNcbiAqIGRlc2M6IHxcbiAqICAgUGFyc2UgYSB0ZW1wbGF0ZSwgYW5kIHJldHVybiBpdHMgcGFydHMuIEEgdGVtcGxhdGUgXCJwYXJ0XCIgaXMgb25lIG9mIHR3byB0eXBlczogYCdsaXRlcmFsJ2AsIG9yIGAnbWFjcm8nYC5cbiAqXG4gKiAgIFRha2UgZm9yIGV4YW1wbGUgdGhlIGZvbGxvd2luZyB0ZW1wbGF0ZTogYCdIZWxsbyBcXEBAZ3JlZXRpbmdAQCEhISdgLiBUaGlzIHRlbXBsYXRlIHdvdWxkIHJlc3VsdCBpbiB0aHJlZSBcInBhcnRzXCIgYWZ0ZXIgcGFyc2luZzpcbiAqICAgMS4gYHsgdHlwZTogJ2xpdGVyYWwnLCBzb3VyY2U6ICdIZWxsbyAnLCBzdGFydDogMCwgZW5kOiA2IH1gXG4gKiAgIDIuIGB7IHR5cGU6ICdtYWNybycsIHNvdXJjZTogJ1xcQEBncmVldGluZ0BAJywgbWFjcm86IDxmdW5jdGlvbj4sIHN0YXJ0OiA2LCBlbmQ6IDE4IH1gXG4gKiAgIDMuIGB7IHR5cGU6ICdsaXRlcmFsJywgc291cmNlOiAnISEhJywgc3RhcnQ6IDE4LCBlbmQ6IDIxIH1gXG4gKlxuICogICBDb25jYXRlbmF0aW5nIGFsbCBgc291cmNlYCBwcm9wZXJ0aWVzIHRvZ2V0aGVyIHdpbGwgcmVzdWx0IGluIHRoZSBvcmlnaW5hbCBpbnB1dC5cbiAqICAgQ29uY2F0ZW5hdGluZyBhbGwgYHNvdXJjZWAgcHJvcGVydGllcywgYWxvbmcgd2l0aCB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgYWxsIGBtYWNyb2AgZnVuY3Rpb25zLCB3aWxsIHJlc3VsdCBpbiB0aGUgb3V0cHV0IChpLmUuIGBwYXJ0WzBdLnNvdXJjZSArIHBhcnRbMV0ubWFjcm8oKSArIHBhcnRbMl0uc291cmNlYCkuXG4gKiAgIFRoZSBgbWFjcm9gIHByb3BlcnR5IGlzIHRoZSBhY3R1YWwgbWFjcm8gZnVuY3Rpb24gZm9yIHRoZSBwYXJzZWQgdGVtcGxhdGUgcGFydCAoaS5lLiBpbiBvdXIgZXhhbXBsZSBgJ1xcQEBncmVldGluZ0BAJ2ApLlxuICogICBgc3RhcnRgIGFuZCBgZW5kYCBhcmUgdGhlIG9mZnNldHMgZnJvbSB0aGUgb3JpZ2luYWwgYHRleHRgIHdoZXJlIHRoZSBwYXJ0IGNhbiBiZSBmb3VuZC5cbiAqIGFyZ3VtZW50czpcbiAqICAgLSBuYW1lOiB0ZXh0XG4gKiAgICAgZGF0YVR5cGU6IHN0cmluZ1xuICogICAgIGRlc2M6IHxcbiAqICAgICAgIFRoZSB0ZW1wbGF0ZSBzdHJpbmcgdG8gcGFyc2UuXG4gKiAgIC0gbmFtZTogb3B0aW9uc1xuICogICAgIGRhdGFUeXBlOiBvYmplY3RcbiAqICAgICBkZXNjOiB8XG4gKiAgICAgICBPcHRpb25zIGZvciB0aGUgb3BlcmF0aW9uLiBUaGUgc2hhcGUgb2YgdGhpcyBvYmplY3QgaXMgYHsgcHJlZml4Pzogc3RyaW5nLCBzY29wZTogb2JqZWN0IH1gLlxuICogICAgICAgYHNjb3BlYCBkZWZpbmVzIHRoZSBzY29wZSBmb3IgbWFjcm9zIGNyZWF0ZWQgYnkgdGhpcyBtZXRob2QgKHNlZSBAc2VlIFV0aWxzLmNyZWF0ZVNjb3BlOykuXG4gKiAgICAgICBgcHJlZml4YCBkZWZpbmVzIGEgZnVuY3Rpb24gYm9keSBwcmVmaXggdG8gdXNlIHdoaWxlIGNyZWF0aW5nIG1hY3JvcyAoc2VlIEBzZWUgVXRpbHMuY3JlYXRlVGVtcGxhdGVNYWNybzspLlxuICogbm90ZXM6XG4gKiAgIC0gfFxuICogICAgIDppbmZvOiBUbyBza2lwIHBhcnNpbmcgYSBzcGVjaWZpYyB0ZW1wbGF0ZSBwYXJ0LCBwcmVmaXggd2l0aCBhIGJhY2tzbGFzaCwgaS5lLiBgXFxcXFxcXFxAQGdyZWV0aW5nQEBgLlxuICogcmV0dXJuOiB8XG4gKiAgIEB0eXBlcyBBcnJheTxUZW1wbGF0ZVBhcnQ+OyAqKlRlbXBsYXRlUGFydCoqOiBgeyB0eXBlOiAnbGl0ZXJhbCcgfCAnbWFjcm8nLCBzb3VyY2U6IHN0cmluZywgc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIG1hY3JvPzogZnVuY3Rpb24gfWAuIFJldHVybiBhbGwgcGFyc2VkIHBhcnRzIG9mIHRoZSB0ZW1wbGF0ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGVQYXJ0cyh0ZXh0LCBfb3B0aW9ucykge1xuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgcGFydHMgICAgICAgICA9IFtdO1xuICBsZXQgY3VycmVudE9mZnNldCA9IDA7XG5cbiAgY29uc3QgYWRkTGl0ZXJhbCA9IChzdGFydE9mZnNldCwgZW5kT2Zmc2V0KSA9PiB7XG4gICAgbGV0IHNvdXJjZSA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0T2Zmc2V0LCBlbmRPZmZzZXQpLnJlcGxhY2UoL1xcXFxAQC9nLCAnQEAnKTtcbiAgICBwYXJ0cy5wdXNoKHsgdHlwZTogJ2xpdGVyYWwnLCBzb3VyY2UsIHN0YXJ0OiBzdGFydE9mZnNldCwgZW5kOiBlbmRPZmZzZXQgfSk7XG4gIH07XG5cbiAgdGV4dC5yZXBsYWNlKC8oPzwhXFxcXCkoQEApKC4rPylcXDEvZywgKG0sIF8sIHBhcnNlZFRleHQsIG9mZnNldCkgPT4ge1xuICAgIGlmIChjdXJyZW50T2Zmc2V0IDwgb2Zmc2V0KVxuICAgICAgYWRkTGl0ZXJhbChjdXJyZW50T2Zmc2V0LCBvZmZzZXQpO1xuXG4gICAgY3VycmVudE9mZnNldCA9IG9mZnNldCArIG0ubGVuZ3RoO1xuXG4gICAgbGV0IG1hY3JvID0gY3JlYXRlVGVtcGxhdGVNYWNybyh7IC4uLm9wdGlvbnMsIGJvZHk6IHBhcnNlZFRleHQgfSk7XG4gICAgcGFydHMucHVzaCh7IHR5cGU6ICdtYWNybycsIHNvdXJjZTogbSwgbWFjcm8sIHN0YXJ0OiBvZmZzZXQsIGVuZDogY3VycmVudE9mZnNldCB9KTtcbiAgfSk7XG5cbiAgaWYgKGN1cnJlbnRPZmZzZXQgPCB0ZXh0Lmxlbmd0aClcbiAgICBhZGRMaXRlcmFsKGN1cnJlbnRPZmZzZXQsIHRleHQubGVuZ3RoKTtcblxuICByZXR1cm4gcGFydHM7XG59XG5cbmNvbnN0IE5PT1AgPSAoaXRlbSkgPT4gaXRlbTtcblxuLyoqXG4gKiBncm91cE5hbWU6IFV0aWxzXG4gKiBkZXNjOiB8XG4gKiAgIENvbXBpbGUgdGhlIHRlbXBsYXRlIHBhcnRzIHRoYXQgd2VyZSBwYXJzZWQgYnkgQHNlZSBVdGlscy5wYXJzZVRlbXBsYXRlUGFydHM7LlxuICpcbiAqICAgSXQgaXMgYWxzbyBwb3NzaWJsZSB0byBwcm92aWRlIHRoaXMgbWV0aG9kIGFuIGFycmF5IG9mIEBzZWUgRWxlbWVudHMuRWxlbWVudERlZmluaXRpb247IGluc3RhbmNlcyxcbiAqICAgb3IgQHNlZSBRdWVyeUVuZ2luZS5RdWVyeUVuZ2luZTsgaW5zdGFuY2VzICh0aGF0IGNvbnRhaW4gQHNlZSBFbGVtZW50cy5FbGVtZW50RGVmaW5pdGlvbjsgaW5zdGFuY2VzKS5cbiAqICAgSWYgZWl0aGVyIG9mIHRoZXNlIHR5cGVzIGFyZSBmb3VuZCBpbiB0aGUgaW5wdXQgYXJyYXkgKGV2ZW4gb25lKSwgdGhlbiB0aGUgZW50aXJlIHJlc3VsdCBpcyByZXR1cm5lZFxuICogICBhcyBhIHJhdyBhcnJheS5cbiAqXG4gKiAgIE9yLCBpZiBhbnkgb2YgdGhlIHJlc3VsdGluZyBwYXJ0cyBpcyAqKm5vdCoqIGEgQHNlZSBVdGlscy5wYXJzZVRlbXBsYXRlUGFydHM/Y2FwdGlvbj1UZW1wbGF0ZVBhcnQ7IG9yIGEgYHN0cmluZ2AsXG4gKiAgIHRoZW4gcmV0dXJuIHRoZSByZXN1bHRpbmcgdmFsdWUgcmF3LlxuICpcbiAqICAgT3RoZXJ3aXNlLCBpZiBhbGwgcmVzdWx0aW5nIHBhcnRzIGFyZSBhIGBzdHJpbmdgLCB0aGVuIHRoZSByZXN1bHRpbmcgcGFydHMgYXJlIGpvaW5lZCwgYW5kIGEgYHN0cmluZ2AgaXMgcmV0dXJuZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogcGFydHNcbiAqICAgICBkYXRhVHlwZXM6XG4gKiAgICAgICAtIEFycmF5PFRlbXBsYXRlUGFydD5cbiAqICAgICAgIC0gQXJyYXk8RWxlbWVudERlZmluaXRpb24+XG4gKiAgICAgICAtIEFycmF5PFF1ZXJ5RW5naW5lPlxuICogICAgICAgLSBBcnJheTxhbnk+XG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIHRlbXBsYXRlIHBhcnRzIHRvIGNvbXBpbGUgdG9nZXRoZXIuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIEFycmF5PGFueT47IEB0eXBlcyBzdHJpbmc7IFJldHVybiB0aGUgcmVzdWx0IGFzIGEgc3RyaW5nLCBvciBhbiBhcnJheSBvZiByYXcgdmFsdWVzLCBvciBhIHJhdyB2YWx1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBpbGVUZW1wbGF0ZUZyb21QYXJ0cyhwYXJ0cywgY2FsbGJhY2spIHtcbiAgbGV0IHJlc3VsdCA9IHBhcnRzXG4gICAgLm1hcCgocGFydCkgPT4ge1xuICAgICAgaWYgKCFwYXJ0KVxuICAgICAgICByZXR1cm4gcGFydDtcblxuICAgICAgaWYgKHBhcnRbTVlUSElYX1RZUEVdID09PSBFTEVNRU5UX0RFRklOSVRJT05fVFlQRSB8fCBwYXJ0W01ZVEhJWF9UWVBFXSA9PT0gUVVFUllfRU5HSU5FX1RZUEUpXG4gICAgICAgIHJldHVybiBwYXJ0O1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAocGFydC50eXBlID09PSAnbGl0ZXJhbCcpXG4gICAgICAgICAgcmV0dXJuIHBhcnQuc291cmNlO1xuICAgICAgICBlbHNlIGlmIChwYXJ0LnR5cGUgPT09ICdtYWNybycpXG4gICAgICAgICAgcmV0dXJuIHBhcnQubWFjcm8oKTtcblxuICAgICAgICByZXR1cm4gcGFydDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgcmV0dXJuIHBhcnQuc291cmNlO1xuICAgICAgfVxuICAgIH0pXG4gICAgLm1hcChjYWxsYmFjayB8fCBOT09QKVxuICAgIC5maWx0ZXIoKGl0ZW0pID0+IChpdGVtICE9IG51bGwgJiYgaXRlbSAhPT0gJycpKTtcblxuICBpZiAocmVzdWx0LnNvbWUoKGl0ZW0pID0+IChpdGVtW01ZVEhJWF9UWVBFXSA9PT0gRUxFTUVOVF9ERUZJTklUSU9OX1RZUEUgfHwgaXRlbVtNWVRISVhfVFlQRV0gPT09IFFVRVJZX0VOR0lORV9UWVBFKSkpXG4gICAgcmV0dXJuIHJlc3VsdDtcblxuICBpZiAocmVzdWx0LnNvbWUoKGl0ZW0pID0+IEJhc2VVdGlscy5pc1R5cGUoaXRlbSwgJzo6U3RyaW5nJykpKVxuICAgIHJldHVybiByZXN1bHQuam9pbignJyk7XG5cbiAgcmV0dXJuIChyZXN1bHQubGVuZ3RoIDwgMikgPyByZXN1bHRbMF0gOiByZXN1bHQ7XG59XG5cbmNvbnN0IEZPUk1BVF9URVJNX0FMTE9XQUJMRV9OT0RFUyA9IFsgMywgMiBdOyAvLyBURVhUX05PREUsIEFUVFJJQlVURV9OT0RFXG5cbi8qKlxuICogZ3JvdXBOYW1lOiBVdGlsc1xuICogZGVzYzogfFxuICogICBHaXZlbiBhIE5vZGUsIHRha2UgdGhlIGAubm9kZVZhbHVlYCBvZiB0aGF0IG5vZGUsIGFuZCBpZiBpdCBpcyBhIHRlbXBsYXRlLFxuICogICBwYXJzZSB0aGF0IHRlbXBsYXRlIHVzaW5nIEBzZWUgVXRpbHMucGFyc2VUZW1wbGF0ZVBhcnRzOywgYW5kIHRoZW5cbiAqICAgY29tcGlsZSB0aGF0IHRlbXBsYXRlIHVzaW5nIEBzZWUgVXRpbHMuY29tcGlsZVRlbXBsYXRlRnJvbVBhcnRzOy4gVGhlXG4gKiAgIHJlc3VsdGluZyB0ZW1wbGF0ZSBwYXJ0cyBhcmUgdGhlbiBzY2FubmVkLiBJZiBhbnkgb2YgdGhlIGBtYWNybygpYCBjYWxsc1xuICogICByZXN1bHQgaW4gYSBAc2VlIER5bmFtaWNQcm9wZXJ0eT9jYXB0aW9uPUR5bmFtaWNQcm9wZXJ0eTssIHRoZW4gc2V0IHVwXG4gKiAgIGxpc3RlbmVycyB2aWEgYGFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZScsIC4uLilgIG9uIGVhY2ggdG8gbGlzdGVuIGZvclxuICogICBjaGFuZ2VzIHRvIGR5bmFtaWMgcHJvcGVydGllcy4gV2hlbiBhIGxpc3RlbmVyIHVwZGF0ZXMsIHRoZSB0ZW1wbGF0ZSBwYXJ0c1xuICogICBhcmUgcmVjb21waWxlZCwgYW5kIHRoZSBgLm5vZGVWYWx1ZWAgaXMgc2V0IGFnYWluIHdpdGggdGhlIG5ldyByZXN1bHQuXG4gKlxuICogICBJbiBzaG9ydCwgdGhpcyBtZXRob2QgZm9ybWF0cyB0aGUgdmFsdWUgb2YgYSBOb2RlIGlmIHRoZSB2YWx1ZSBpcyBhIHRlbXBsYXRlLFxuICogICBhbmQgaW4gZG9pbmcgc28gYmluZHMgdG8gZHluYW1pYyBwcm9wZXJ0aWVzIGZvciBmdXR1cmUgdXBkYXRlcyB0byB0aGlzIG5vZGUuXG4gKlxuICogICBJZiB0aGUgYC5ub2RlVmFsdWVgIG9mIHRoZSBOb2RlIGlzIGRldGVjdGVkIHRvICoqbm90KiogYmUgYSB0ZW1wbGF0ZSwgdGhlblxuICogICB0aGUgcmVzdWx0IGlzIGEgbm8tb3BlcmF0aW9uLCBhbmQgdGhlIHJhdyB2YWx1ZSBvZiB0aGUgTm9kZSBpcyBzaW1wbHkgcmV0dXJuZWQuXG4gKiBhcmd1bWVudHM6XG4gKiAgIC0gbmFtZTogbm9kZVxuICogICAgIGRhdGFUeXBlOiBOb2RlXG4gKiAgICAgZGVzYzogfFxuICogICAgICAgVGhlIE5vZGUgd2hvc2UgdmFsdWUgc2hvdWxkIGJlIGZvcm1hdHRlZC4gVGhpcyBtdXN0IGJlIGEgVEVYVF9OT0RFIG9yIGEgQVRUUklCVVRFX05PREUuXG4gKiByZXR1cm46IHxcbiAqICAgQHR5cGVzIHN0cmluZzsgVGhlIHJlc3VsdGluZyBub2RlIHZhbHVlLiBJZiBhIHRlbXBsYXRlIHdhcyBzdWNjZXNzZnVsbHkgY29tcGlsZWQsIGR5bmFtaWMgcHJvcGVydGllc1xuICogICBhcmUgYWxzbyBsaXN0ZW5lZCB0byBmb3IgZnV0dXJlIHVwZGF0ZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROb2RlVmFsdWUobm9kZSwgX29wdGlvbnMpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAmJiAoL14oc3R5bGV8c2NyaXB0KSQvKS50ZXN0KG5vZGUucGFyZW50Tm9kZS5sb2NhbE5hbWUpKVxuICAgIHJldHVybiBub2RlLm5vZGVWYWx1ZTtcblxuICBpZiAoIW5vZGUgfHwgRk9STUFUX1RFUk1fQUxMT1dBQkxFX05PREVTLmluZGV4T2Yobm9kZS5ub2RlVHlwZSkgPCAwKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZm9ybWF0Tm9kZVZhbHVlXCIgdW5zdXBwb3J0ZWQgbm9kZSB0eXBlIHByb3ZpZGVkLiBPbmx5IFRFWFRfTk9ERSBhbmQgQVRUUklCVVRFX05PREUgdHlwZXMgYXJlIHN1cHBvcnRlZC4nKTtcblxuICBsZXQgb3B0aW9ucyAgICAgICA9IF9vcHRpb25zIHx8IHt9O1xuICBsZXQgdGV4dCAgICAgICAgICA9IG5vZGUubm9kZVZhbHVlO1xuICBsZXQgdGVtcGxhdGVQYXJ0cyA9IHBhcnNlVGVtcGxhdGVQYXJ0cyh0ZXh0LCBvcHRpb25zKTtcblxuICAvLyB0ZW1wbGF0ZVBhcnRzLmZvckVhY2goKHsgdHlwZSwgbWFjcm8gfSkgPT4ge1xuICAvLyAgIGlmICh0eXBlICE9PSAnbWFjcm8nKVxuICAvLyAgICAgcmV0dXJuO1xuXG4gIC8vICAgbGV0IHJlc3VsdCA9IG1hY3JvKCk7XG4gIC8vICAgaWYgKG9wdGlvbnMuYmluZFRvRHluYW1pY1Byb3BlcnRpZXMgIT09IGZhbHNlICYmIGlzVHlwZShyZXN1bHQsIER5bmFtaWNQcm9wZXJ0eSkpIHtcbiAgLy8gICAgIHJlc3VsdC5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGUnLCAoKSA9PiB7XG4gIC8vICAgICAgIGxldCByZXN1bHQgPSAoJycgKyBjb21waWxlVGVtcGxhdGVGcm9tUGFydHModGVtcGxhdGVQYXJ0cykpO1xuICAvLyAgICAgICBpZiAocmVzdWx0ICE9PSBub2RlLm5vZGVWYWx1ZSlcbiAgLy8gICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IHJlc3VsdDtcbiAgLy8gICAgIH0sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgLy8gICB9XG4gIC8vIH0pO1xuXG4gIGxldCByZXN1bHQgPSBjb21waWxlVGVtcGxhdGVGcm9tUGFydHModGVtcGxhdGVQYXJ0cywgKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQgJiYgb3B0aW9ucy5iaW5kVG9EeW5hbWljUHJvcGVydGllcyAhPT0gZmFsc2UgJiYgQmFzZVV0aWxzLmlzVHlwZShyZXN1bHQsIER5bmFtaWNQcm9wZXJ0eSkpIHtcbiAgICAgIHJlc3VsdC5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSAoJycgKyBjb21waWxlVGVtcGxhdGVGcm9tUGFydHModGVtcGxhdGVQYXJ0cykpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSBub2RlLm5vZGVWYWx1ZSlcbiAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IHJlc3VsdDtcbiAgICAgIH0sIHsgY2FwdHVyZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcblxuICBpZiAocmVzdWx0ID09IG51bGwpXG4gICAgcmVzdWx0ID0gJyc7XG5cbiAgcmV0dXJuIChvcHRpb25zLmRpc2FsbG93SFRNTCA9PT0gdHJ1ZSkgPyAoJycgKyByZXN1bHQpIDogcmVzdWx0O1xufVxuXG5jb25zdCBJU19URU1QTEFURSA9IC8oPzwhXFxcXClAQC87XG5leHBvcnQgZnVuY3Rpb24gaXNUZW1wbGF0ZSh2YWx1ZSkge1xuICBpZiAoIUJhc2VVdGlscy5pc1R5cGUodmFsdWUsICc6OlN0cmluZycpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gSVNfVEVNUExBVEUudGVzdCh2YWx1ZSk7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGRhdGEtZXZlbnQtb257ZXZlbnROYW1lfSBhdHRyaWJ1dGVzIHdpdGggYmluZERhdGFFdmVudEF0dHJpYnV0ZSBpbnN0ZWFkLlxuICogVGhpcyBmdW5jdGlvbiBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbEV2ZW50TmFtZXNGb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgY29uc29sZS53YXJuKCdnZXRBbGxFdmVudE5hbWVzRm9yRWxlbWVudCBpcyBkZXByZWNhdGVkLiBVc2UgZGF0YS1ldmVudC1vbntldmVudE5hbWV9IGF0dHJpYnV0ZXMgaW5zdGVhZC4nKTtcblxuICBjb25zdCBJU19FVkVOVF9OQU1FID0gL15vbi87XG4gIGxldCBldmVudE5hbWVzID0gW107XG5cbiAgZm9yIChsZXQga2V5IGluIGVsZW1lbnQpIHtcbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDIgJiYgSVNfRVZFTlRfTkFNRS50ZXN0KGtleSkpXG4gICAgICBldmVudE5hbWVzLnB1c2goa2V5LnRvTG93ZXJDYXNlKCkpO1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TmFtZXM7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIGRhdGEtZXZlbnQtb257ZXZlbnROYW1lfSBhdHRyaWJ1dGVzIHdpdGggYmluZERhdGFFdmVudEF0dHJpYnV0ZSBpbnN0ZWFkLlxuICogVGhpcyBmdW5jdGlvbiBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgdmVyc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmRFdmVudFRvRWxlbWVudChlbGVtZW50LCBldmVudE5hbWUsIF9jYWxsYmFjaykge1xuICBjb25zb2xlLndhcm4oJ2JpbmRFdmVudFRvRWxlbWVudCBpcyBkZXByZWNhdGVkLiBVc2UgZGF0YS1ldmVudC1vbntldmVudE5hbWV9IGF0dHJpYnV0ZXMgd2l0aCBiaW5kRGF0YUV2ZW50QXR0cmlidXRlIGluc3RlYWQuJyk7XG5cbiAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgbGV0IGNhbGxiYWNrO1xuXG4gIGlmIChCYXNlVXRpbHMuaXNQbGFpbk9iamVjdChfY2FsbGJhY2spKSB7XG4gICAgY2FsbGJhY2sgID0gX2NhbGxiYWNrLmNhbGxiYWNrO1xuICAgIG9wdGlvbnMgICA9IF9jYWxsYmFjay5vcHRpb25zIHx8IHt9O1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrID0gX2NhbGxiYWNrO1xuICB9XG5cbiAgaWYgKEJhc2VVdGlscy5pc1R5cGUoY2FsbGJhY2ssICc6OlN0cmluZycpKVxuICAgIGNhbGxiYWNrID0gY3JlYXRlVGVtcGxhdGVNYWNybyh7IHByZWZpeDogJ2xldCBldmVudD1hcmd1bWVudHNbMV0nLCBib2R5OiBjYWxsYmFjaywgc2NvcGU6IHRoaXMgfSk7IC8vIEByZWY6X2NyZWF0ZVRlbXBsYXRlTWFjcm9QcmVmaXhGb3JCaW5kRXZlbnRUb0VsZW1lbnRcblxuICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIHsgY2FsbGJhY2ssIG9wdGlvbnMgfTtcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTmV3IEV2ZW50IFN5c3RlbSAoZGF0YS1ldmVudC1vbntldmVudE5hbWV9IGF0dHJpYnV0ZXMpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gZWxlbWVudCBpcyBhIE15dGhpeENvbXBvbmVudCBvciBXZWJDb21wb25lbnQuXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBlbGVtZW50IGlzIGEgTXl0aGl4Q29tcG9uZW50IG9yIFdlYkNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gaXNNeXRoaXhPcldlYkNvbXBvbmVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCB8fCBlbGVtZW50Lm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gQ2hlY2sgZm9yIE15dGhpeENvbXBvbmVudCB2aWEgTVlUSElYX1RZUEVcbiAgdHJ5IHtcbiAgICBpZiAoZWxlbWVudFtNWVRISVhfVFlQRV0gPT09IE1ZVEhJWF9VSV9DT01QT05FTlRfVFlQRSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gSWdub3JlIGVycm9yc1xuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIGN1c3RvbSBlbGVtZW50IChXZWJDb21wb25lbnQpIHZpYSBoeXBoZW5hdGVkIHRhZyBuYW1lXG4gIGxldCB0YWdOYW1lID0gZWxlbWVudC50YWdOYW1lO1xuICBpZiAodGFnTmFtZSAmJiB0YWdOYW1lLmluY2x1ZGVzKCctJykpXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGFyZW50IGVsZW1lbnQsIGNyb3NzaW5nIFNoYWRvdyBET00gYm91bmRhcmllcy5cbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHdob3NlIHBhcmVudCB0byBmaW5kLlxuICogQHJldHVybnMge0VsZW1lbnR8bnVsbH0gVGhlIHBhcmVudCBlbGVtZW50IG9yIG51bGwgaWYgYXQgYm91bmRhcnkuXG4gKi9cbmZ1bmN0aW9uIGdldEV2ZW50UGFyZW50RWxlbWVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBUcnkgcmVndWxhciBwYXJlbnRFbGVtZW50IGZpcnN0XG4gIGlmIChlbGVtZW50LnBhcmVudEVsZW1lbnQpXG4gICAgcmV0dXJuIGVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAvLyBDcm9zcyBTaGFkb3cgRE9NIGJvdW5kYXJ5IHZpYSBnZXRSb290Tm9kZSgpLmhvc3RcbiAgbGV0IHJvb3QgPSBlbGVtZW50LmdldFJvb3ROb2RlKCk7XG4gIGlmIChyb290ICYmIHJvb3QgIT09IGVsZW1lbnQgJiYgcm9vdC5ob3N0KVxuICAgIHJldHVybiByb290Lmhvc3Q7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgc2Nhbm5pbmcgcHJveHkgdGhhdCBsb29rcyB1cCBwcm9wZXJ0aWVzIGJ5IHRyYXZlcnNpbmcgdGhlIERPTS5cbiAqIFN0YXJ0cyBmcm9tIHRoZSBib3VuZCBlbGVtZW50LCBzY2FucyB1cCB2aWEgcGFyZW50RWxlbWVudCxcbiAqIGNyb3NzZXMgU2hhZG93IERPTSB2aWEgZ2V0Um9vdE5vZGUoKS5ob3N0LCBhbmQgc3RvcHMgYXQgTXl0aGl4Q29tcG9uZW50L1dlYkNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHN0YXJ0RWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIHN0YXJ0IHNjYW5uaW5nIGZyb20uXG4gKiBAcmV0dXJucyB7UHJveHl9IEEgcHJveHkgdGhhdCByZXNvbHZlcyBwcm9wZXJ0eSBsb29rdXBzIHZpYSBET00gdHJhdmVyc2FsLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2Nhbm5pbmdQcm94eShzdGFydEVsZW1lbnQpIHtcbiAgY29uc3Qgc2NhbkZvclByb3BlcnR5ID0gKHByb3BOYW1lKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gc3RhcnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgICAvLyBDaGVjayBpZiBwcm9wZXJ0eSBleGlzdHMgb24gdGhpcyBlbGVtZW50XG4gICAgICBpZiAocHJvcE5hbWUgaW4gY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gY3VycmVudEVsZW1lbnRbcHJvcE5hbWVdO1xuXG4gICAgICAgIC8vIEJpbmQgZnVuY3Rpb25zIHRvIHRoZSBlbGVtZW50IHRoZXkgd2VyZSBmb3VuZCBvblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIHJldHVybiB7IGZvdW5kOiB0cnVlLCB2YWx1ZTogdmFsdWUuYmluZChjdXJyZW50RWxlbWVudCksIGVsZW1lbnQ6IGN1cnJlbnRFbGVtZW50IH07XG5cbiAgICAgICAgcmV0dXJuIHsgZm91bmQ6IHRydWUsIHZhbHVlLCBlbGVtZW50OiBjdXJyZW50RWxlbWVudCB9O1xuICAgICAgfVxuXG4gICAgICAvLyBDaGVjayBpZiB3ZSd2ZSBoaXQgYSBNeXRoaXhDb21wb25lbnQvV2ViQ29tcG9uZW50IGJvdW5kYXJ5XG4gICAgICBpZiAoaXNNeXRoaXhPcldlYkNvbXBvbmVudChjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgICAgLy8gV2UgZm91bmQgdGhlIGJvdW5kYXJ5IGJ1dCBwcm9wZXJ0eSB3YXNuJ3Qgb24gaXQgLSBzdG9wIHNlYXJjaGluZ1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gTW92ZSB0byBwYXJlbnQsIGNyb3NzaW5nIFNoYWRvdyBET00gaWYgbmVlZGVkXG4gICAgICBjdXJyZW50RWxlbWVudCA9IGdldEV2ZW50UGFyZW50RWxlbWVudChjdXJyZW50RWxlbWVudCk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBwYXJlbnQgaXMgYSBNeXRoaXhDb21wb25lbnQgYm91bmRhcnlcbiAgICAgIGlmIChjdXJyZW50RWxlbWVudCAmJiBpc015dGhpeE9yV2ViQ29tcG9uZW50KGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgICAvLyBDaGVjayB0aGlzIGNvbXBvbmVudCBmb3IgdGhlIHByb3BlcnR5IGJlZm9yZSBzdG9wcGluZ1xuICAgICAgICBpZiAocHJvcE5hbWUgaW4gY3VycmVudEVsZW1lbnQpIHtcbiAgICAgICAgICBsZXQgdmFsdWUgPSBjdXJyZW50RWxlbWVudFtwcm9wTmFtZV07XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHJldHVybiB7IGZvdW5kOiB0cnVlLCB2YWx1ZTogdmFsdWUuYmluZChjdXJyZW50RWxlbWVudCksIGVsZW1lbnQ6IGN1cnJlbnRFbGVtZW50IH07XG5cbiAgICAgICAgICByZXR1cm4geyBmb3VuZDogdHJ1ZSwgdmFsdWUsIGVsZW1lbnQ6IGN1cnJlbnRFbGVtZW50IH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gU3RvcCBhdCB0aGlzIGJvdW5kYXJ5XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IGZvdW5kOiBmYWxzZSB9O1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHNoYWxsb3cgcHJveHkgLSByZXR1cm4gcmVhbCBvYmplY3RzIGFmdGVyIGZpcnN0IGxvb2t1cFxuICByZXR1cm4gbmV3IFByb3h5KHt9LCB7XG4gICAgaGFzOiAoXywgcHJvcE5hbWUpID0+IHtcbiAgICAgIC8vIEFsbG93IGdsb2JhbCBhY2Nlc3MgdG8gcGFzcyB0aHJvdWdoXG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdjb25zb2xlJyB8fCBwcm9wTmFtZSA9PT0gJ3dpbmRvdycgfHwgcHJvcE5hbWUgPT09ICdkb2N1bWVudCcgfHxcbiAgICAgICAgICBwcm9wTmFtZSA9PT0gJ2dsb2JhbFRoaXMnIHx8IHByb3BOYW1lID09PSAnTWF0aCcgfHwgcHJvcE5hbWUgPT09ICdKU09OJyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAnRGF0ZScgfHwgcHJvcE5hbWUgPT09ICdBcnJheScgfHwgcHJvcE5hbWUgPT09ICdPYmplY3QnIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdTdHJpbmcnIHx8IHByb3BOYW1lID09PSAnTnVtYmVyJyB8fCBwcm9wTmFtZSA9PT0gJ0Jvb2xlYW4nIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdTeW1ib2wnIHx8IHByb3BOYW1lID09PSAndW5kZWZpbmVkJyB8fCBwcm9wTmFtZSA9PT0gJ251bGwnIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdJbmZpbml0eScgfHwgcHJvcE5hbWUgPT09ICdOYU4nIHx8IHByb3BOYW1lID09PSAncGFyc2VJbnQnIHx8XG4gICAgICAgICAgcHJvcE5hbWUgPT09ICdwYXJzZUZsb2F0JyB8fCBwcm9wTmFtZSA9PT0gJ2lzTmFOJyB8fCBwcm9wTmFtZSA9PT0gJ2lzRmluaXRlJyB8fFxuICAgICAgICAgIHByb3BOYW1lID09PSAnZW5jb2RlVVJJJyB8fCBwcm9wTmFtZSA9PT0gJ2RlY29kZVVSSScgfHxcbiAgICAgICAgICBwcm9wTmFtZSA9PT0gJ2VuY29kZVVSSUNvbXBvbmVudCcgfHwgcHJvcE5hbWUgPT09ICdkZWNvZGVVUklDb21wb25lbnQnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVzdWx0ID0gc2NhbkZvclByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIHJldHVybiByZXN1bHQuZm91bmQ7XG4gICAgfSxcbiAgICBnZXQ6IChfLCBwcm9wTmFtZSkgPT4ge1xuICAgICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZXMgZm9yIGdsb2JhbCBhY2Nlc3NcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2NvbnNvbGUnKVxuICAgICAgICByZXR1cm4gY29uc29sZTtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ3dpbmRvdycpXG4gICAgICAgIHJldHVybiBnbG9iYWxUaGlzLndpbmRvdztcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2RvY3VtZW50JylcbiAgICAgICAgcmV0dXJuIGdsb2JhbFRoaXMuZG9jdW1lbnQ7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdnbG9iYWxUaGlzJylcbiAgICAgICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdNYXRoJylcbiAgICAgICAgcmV0dXJuIE1hdGg7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdKU09OJylcbiAgICAgICAgcmV0dXJuIEpTT047XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdEYXRlJylcbiAgICAgICAgcmV0dXJuIERhdGU7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdBcnJheScpXG4gICAgICAgIHJldHVybiBBcnJheTtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ09iamVjdCcpXG4gICAgICAgIHJldHVybiBPYmplY3Q7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdTdHJpbmcnKVxuICAgICAgICByZXR1cm4gU3RyaW5nO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnTnVtYmVyJylcbiAgICAgICAgcmV0dXJuIE51bWJlcjtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ0Jvb2xlYW4nKVxuICAgICAgICByZXR1cm4gQm9vbGVhbjtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ1N5bWJvbCcpXG4gICAgICAgIHJldHVybiBTeW1ib2w7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdwYXJzZUludCcpXG4gICAgICAgIHJldHVybiBwYXJzZUludDtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ3BhcnNlRmxvYXQnKVxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdDtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2lzTmFOJylcbiAgICAgICAgcmV0dXJuIGlzTmFOO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnaXNGaW5pdGUnKVxuICAgICAgICByZXR1cm4gaXNGaW5pdGU7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdlbmNvZGVVUkknKVxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJO1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnZGVjb2RlVVJJJylcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSTtcbiAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2VuY29kZVVSSUNvbXBvbmVudCcpXG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQ7XG4gICAgICBpZiAocHJvcE5hbWUgPT09ICdkZWNvZGVVUklDb21wb25lbnQnKVxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG4gICAgICBsZXQgcmVzdWx0ID0gc2NhbkZvclByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIGlmIChyZXN1bHQuZm91bmQpXG4gICAgICAgIHJldHVybiByZXN1bHQudmFsdWU7XG5cbiAgICAgIC8vIFJldHVybiB1bmRlZmluZWQgZm9yIG5vdCBmb3VuZCAoYWxsb3dzIGdsb2JhbCBmYWxsYmFjayBpbiBGdW5jdGlvbilcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXQ6IChfLCBwcm9wTmFtZSwgdmFsdWUpID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSBzY2FuRm9yUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgaWYgKHJlc3VsdC5mb3VuZCAmJiByZXN1bHQuZWxlbWVudCkge1xuICAgICAgICByZXN1bHQuZWxlbWVudFtwcm9wTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIG5vdCBmb3VuZCwgc2V0IG9uIHRoZSBzdGFydCBlbGVtZW50XG4gICAgICBzdGFydEVsZW1lbnRbcHJvcE5hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICB9KTtcbn1cblxuLy8gUGF0dGVybiB0byBkZXRlY3Qgc2ltcGxlIHByb3BlcnR5IHJlZmVyZW5jZXMgKGUuZy4sIFwidGhpcy5oYW5kbGVDbGlja1wiLCBcInN0YXRlLmhhbmRsZXJcIiwgXCJoYW5kbGVDbGlja1wiKVxuY29uc3QgU0lNUExFX1JFRl9QQVRURVJOID0gL14oXFx3K1xcLikqXFx3KyQvO1xuLy8gUGF0dGVybiB0byBkZXRlY3QgZnVuY3Rpb24gY2FsbHMgKGhhcyBwYXJlbnRoZXNlcylcbmNvbnN0IEhBU19DQUxMX1BBVFRFUk4gPSAvXFwoLztcbi8vIFBhdHRlcm4gdG8gZGV0ZWN0IGJhcmUgbWV0aG9kIG5hbWVzIChqdXN0IGFuIGlkZW50aWZpZXIgd2l0aCBubyBkb3RzIG9yIHBhcmVucylcbmNvbnN0IEJBUkVfTUVUSE9EX1BBVFRFUk4gPSAvXlxcdyskLztcblxuLyoqXG4gKiBHZW5lcmljIGV2ZW50IHdyYXBwZXIgZnVuY3Rpb24gZm9yIGRhdGEtZXZlbnQtb257ZXZlbnROYW1lfSBhdHRyaWJ1dGVzLlxuICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgYm91bmQgdG8gdGhlIGVsZW1lbnQgd2l0aCB0aGUgYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIERPTSBldmVudCBvYmplY3QuXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdCBvZiB0aGUgZXZlbnQgaGFuZGxlciBleHByZXNzaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbXl0aGl4RXZlbnRXcmFwcGVyKGV2ZW50KSB7XG4gIC8vIGB0aGlzYCBpcyB0aGUgZWxlbWVudCB3aXRoIHRoZSBkYXRhLWV2ZW50LW9uKiBhdHRyaWJ1dGVcbiAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcbiAgY29uc3QgZXhwcmVzc2lvbiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWV2ZW50LW9uJyArIGV2ZW50VHlwZSk7XG5cbiAgaWYgKCFleHByZXNzaW9uKVxuICAgIHJldHVybjtcblxuICAvLyBDcmVhdGUgc2Nhbm5pbmcgcHJveHkgc3RhcnRpbmcgZnJvbSB0aGlzIGVsZW1lbnRcbiAgY29uc3QgcHJveHkgPSBjcmVhdGVTY2FubmluZ1Byb3h5KHRoaXMpO1xuXG4gIC8vIERldGVjdCBpZiB0aGlzIGlzIGEgc2ltcGxlIHJlZmVyZW5jZSB2cyBhIGNvbXBsZXggZXhwcmVzc2lvblxuICBjb25zdCBpc1NpbXBsZVJlZiA9IFNJTVBMRV9SRUZfUEFUVEVSTi50ZXN0KGV4cHJlc3Npb24pO1xuICBjb25zdCBoYXNDYWxsID0gSEFTX0NBTExfUEFUVEVSTi50ZXN0KGV4cHJlc3Npb24pO1xuICBjb25zdCBuZWVkc0ludm9rZSA9IChpc1NpbXBsZVJlZiAmJiAhaGFzQ2FsbCk7XG5cbiAgLy8gTm9ybWFsaXplIGJhcmUgbWV0aG9kIG5hbWVzIGJ5IHByZXBlbmRpbmcgXCJ0aGlzLlwiXG4gIGNvbnN0IG5vcm1hbGl6ZWRFeHByID0gQkFSRV9NRVRIT0RfUEFUVEVSTi50ZXN0KGV4cHJlc3Npb24pXG4gICAgPyAndGhpcy4nICsgZXhwcmVzc2lvblxuICAgIDogZXhwcmVzc2lvbjtcblxuICB0cnkge1xuICAgIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgZXZhbHVhdGVzIHRoZSBleHByZXNzaW9uIHdpdGggdGhlIHByb3h5IGFzIGB0aGlzYFxuICAgIGNvbnN0IGZuID0gbmV3IEZ1bmN0aW9uKCdldmVudCcsIGBcbiAgICAgIGxldCBfcmVzdWx0ID0gJHtub3JtYWxpemVkRXhwcn07XG4gICAgICBpZiAodHlwZW9mIF9yZXN1bHQgPT09ICdmdW5jdGlvbicgJiYgJHtuZWVkc0ludm9rZX0pIHtcbiAgICAgICAgcmV0dXJuIF9yZXN1bHQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdDtcbiAgICBgKTtcblxuICAgIHJldHVybiBmbi5jYWxsKHByb3h5LCBldmVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihgRXZlbnQgaGFuZGxlciBlcnJvciBmb3IgXCIke2V4cHJlc3Npb259XCI6YCwgeyBlbGVtZW50OiB0aGlzLCBldmVudCwgZXJyb3IgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBCaW5kIGEgZGF0YS1ldmVudC1vbntldmVudE5hbWV9IGF0dHJpYnV0ZSB0byBhbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIGJpbmQgdGhlIGV2ZW50IHRvLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZSAtIFRoZSBldmVudCBuYW1lIChlLmcuLCBcImNsaWNrXCIsIFwic3VibWl0XCIpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZERhdGFFdmVudEF0dHJpYnV0ZShlbGVtZW50LCBldmVudE5hbWUpIHtcbiAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgbXl0aGl4RXZlbnRXcmFwcGVyLmJpbmQoZWxlbWVudCkpO1xufVxuXG4vKipcbiAqIERldGVjdCBhbmQgYmluZCBhbGwgZGF0YS1ldmVudC1vbiogYXR0cmlidXRlcyBvbiBhbiBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAtIFRoZSBlbGVtZW50IHRvIHByb2Nlc3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQWxsRGF0YUV2ZW50QXR0cmlidXRlcyhlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCB8fCB0eXBlb2YgZWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcyAhPT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm47XG5cbiAgY29uc3QgREFUQV9FVkVOVF9QUkVGSVggPSAnZGF0YS1ldmVudC1vbic7XG4gIGNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gZWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IGF0dHJpYnV0ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICBsZXQgYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZU5hbWVzW2ldLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGF0dHJpYnV0ZU5hbWUuc3RhcnRzV2l0aChEQVRBX0VWRU5UX1BSRUZJWCkpIHtcbiAgICAgIGxldCBldmVudE5hbWUgPSBhdHRyaWJ1dGVOYW1lLnN1YnN0cmluZyhEQVRBX0VWRU5UX1BSRUZJWC5sZW5ndGgpO1xuICAgICAgaWYgKGV2ZW50TmFtZSkge1xuICAgICAgICBiaW5kRGF0YUV2ZW50QXR0cmlidXRlKGVsZW1lbnQsIGV2ZW50TmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmZXRjaFBhdGgob2JqLCBrZXksIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAob2JqID09IG51bGwgfHwgT2JqZWN0LmlzKG9iaiwgTmFOKSB8fCBPYmplY3QuaXMob2JqLCBJbmZpbml0eSkgfHwgT2JqZWN0LmlzKG9iaiwgLUluZmluaXR5KSlcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuXG4gIGlmIChrZXkgPT0gbnVsbCB8fCBPYmplY3QuaXMoa2V5LCBOYU4pIHx8IE9iamVjdC5pcyhrZXksIEluZmluaXR5KSB8fCBPYmplY3QuaXMoa2V5LCAtSW5maW5pdHkpKVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG5cbiAgbGV0IHBhcnRzICAgICAgICAgPSBrZXkuc3BsaXQoLyg/PCFcXFxcKVxcLi9nKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBjdXJyZW50VmFsdWUgID0gb2JqO1xuXG4gIGZvciAobGV0IGkgPSAwLCBpbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICBsZXQgcGFydCA9IHBhcnRzW2ldO1xuICAgIGxldCBuZXh0VmFsdWUgPSBjdXJyZW50VmFsdWVbcGFydF07XG4gICAgaWYgKG5leHRWYWx1ZSA9PSBudWxsKVxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcblxuICAgIGN1cnJlbnRWYWx1ZSA9IG5leHRWYWx1ZTtcbiAgfVxuXG4gIGlmIChnbG9iYWxUaGlzLk5vZGUgJiYgY3VycmVudFZhbHVlICYmIGN1cnJlbnRWYWx1ZSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuTm9kZSAmJiAoY3VycmVudFZhbHVlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSB8fCBjdXJyZW50VmFsdWUubm9kZVR5cGUgPT09IE5vZGUuQVRUUklCVVRFX05PREUpKVxuICAgIHJldHVybiBjdXJyZW50VmFsdWUubm9kZVZhbHVlO1xuXG4gIHJldHVybiAoY3VycmVudFZhbHVlID09IG51bGwpID8gZGVmYXVsdFZhbHVlIDogY3VycmVudFZhbHVlO1xufVxuXG5jb25zdCBDQUNIRURfUFJPUEVSVFlfTkFNRVMgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgU0tJUF9QUk9UT1RZUEVTICAgICAgID0gW1xuICBnbG9iYWxUaGlzLkhUTUxFbGVtZW50LFxuICBnbG9iYWxUaGlzLk5vZGUsXG4gIGdsb2JhbFRoaXMuRWxlbWVudCxcbiAgZ2xvYmFsVGhpcy5PYmplY3QsXG4gIGdsb2JhbFRoaXMuQXJyYXksXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsUHJvcGVydHlOYW1lcyhfb2JqKSB7XG4gIGlmICghQmFzZVV0aWxzLmlzQ29sbGVjdGFibGUoX29iaikpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGxldCBjYWNoZWROYW1lcyA9IENBQ0hFRF9QUk9QRVJUWV9OQU1FUy5nZXQoX29iaik7XG4gIGlmIChjYWNoZWROYW1lcylcbiAgICByZXR1cm4gY2FjaGVkTmFtZXM7XG5cbiAgbGV0IG9iaiAgID0gX29iajtcbiAgbGV0IG5hbWVzID0gbmV3IFNldCgpO1xuXG4gIHdoaWxlIChvYmopIHtcbiAgICBsZXQgb2JqTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICAgIGZvciAobGV0IGkgPSAwLCBpbCA9IG9iak5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspXG4gICAgICBuYW1lcy5hZGQob2JqTmFtZXNbaV0pO1xuXG4gICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgaWYgKG9iaiAmJiBTS0lQX1BST1RPVFlQRVMuaW5kZXhPZihvYmouY29uc3RydWN0b3IpID49IDApXG4gICAgICBicmVhaztcbiAgfVxuXG4gIGxldCBmaW5hbE5hbWVzID0gQXJyYXkuZnJvbShuYW1lcyk7XG4gIENBQ0hFRF9QUk9QRVJUWV9OQU1FUy5zZXQoX29iaiwgZmluYWxOYW1lcyk7XG5cbiAgcmV0dXJuIGZpbmFsTmFtZXM7XG59XG5cbmNvbnN0IExBTkdfUFJPVklERVJfRFlOQU1JQ19QUk9QRVJUWV9DQUNIRSA9IG5ldyBXZWFrTWFwKCk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0RHluYW1pY1Byb3BlcnR5Rm9yUGF0aChrZXlQYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgbGV0IGluc3RhbmNlQ2FjaGUgPSBMQU5HX1BST1ZJREVSX0RZTkFNSUNfUFJPUEVSVFlfQ0FDSEUuZ2V0KHRoaXMpO1xuICBpZiAoIWluc3RhbmNlQ2FjaGUpIHtcbiAgICBpbnN0YW5jZUNhY2hlID0gbmV3IE1hcCgpO1xuICAgIExBTkdfUFJPVklERVJfRFlOQU1JQ19QUk9QRVJUWV9DQUNIRS5zZXQodGhpcywgaW5zdGFuY2VDYWNoZSk7XG4gIH1cblxuICBsZXQgcHJvcGVydHkgPSBpbnN0YW5jZUNhY2hlLmdldChrZXlQYXRoKTtcbiAgaWYgKCFwcm9wZXJ0eSkge1xuICAgIHByb3BlcnR5ID0gbmV3IER5bmFtaWNQcm9wZXJ0eShkZWZhdWx0VmFsdWUpO1xuICAgIGluc3RhbmNlQ2FjaGUuc2V0KGtleVBhdGgsIHByb3BlcnR5KTtcbiAgfVxuXG4gIHJldHVybiBwcm9wZXJ0eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwZWNpYWxDbG9zZXN0KG5vZGUsIHNlbGVjdG9yKSB7XG4gIGlmICghbm9kZSB8fCAhc2VsZWN0b3IpXG4gICAgcmV0dXJuO1xuXG4gIGxldCBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gIHdoaWxlIChjdXJyZW50Tm9kZSAmJiAodHlwZW9mIGN1cnJlbnROb2RlLm1hdGNoZXMgIT09ICdmdW5jdGlvbicgfHwgIWN1cnJlbnROb2RlLm1hdGNoZXMoc2VsZWN0b3IpKSlcbiAgICBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoY3VycmVudE5vZGUpO1xuXG4gIHJldHVybiBjdXJyZW50Tm9kZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKG1zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMgfHwgMCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lRHluYW1pY1Byb3AobmFtZSwgZGVmYXVsdFZhbHVlLCBzZXR0ZXIpIHtcbiAgbGV0IGR5bmFtaWNQcm9wZXJ0eSA9IG5ldyBEeW5hbWljUHJvcGVydHkoZGVmYXVsdFZhbHVlKTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgW25hbWVdOiB7XG4gICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQ6ICAgICAgICAgICgpID0+IGR5bmFtaWNQcm9wZXJ0eSxcbiAgICAgIHNldDogICAgICAgICAgKG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0dGVyID09PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XShzZXR0ZXIobmV3VmFsdWUpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGR5bmFtaWNQcm9wZXJ0eVtEeW5hbWljUHJvcGVydHkuc2V0XShuZXdWYWx1ZSk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiBkeW5hbWljUHJvcGVydHk7XG59XG5cbmNvbnN0IERZTkFNSUNfUFJPUF9SRUdJU1RSWSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljUHJvcElEKGlkLCBzZXRWYWx1ZSkge1xuICBsZXQgcHJvcCA9IERZTkFNSUNfUFJPUF9SRUdJU1RSWS5nZXQoaWQpO1xuICBpZiAocHJvcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgIHByb3BbRHluYW1pY1Byb3BlcnR5LnNldF0oc2V0VmFsdWUpO1xuXG4gICAgcmV0dXJuIHByb3A7XG4gIH1cblxuICBwcm9wID0gbmV3IER5bmFtaWNQcm9wZXJ0eSgoYXJndW1lbnRzLmxlbmd0aCA+IDEpID8gc2V0VmFsdWUgOiAnJyk7XG4gIERZTkFNSUNfUFJPUF9SRUdJU1RSWS5zZXQoaWQsIHByb3ApO1xuXG4gIHJldHVybiBwcm9wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsU3RvcmVOYW1lVmFsdWVQYWlySGVscGVyKHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgbWV0YWRhdGEoXG4gICAgdGFyZ2V0LFxuICAgIE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSLFxuICAgIFsgbmFtZSwgdmFsdWUgXSxcbiAgKTtcblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jb25zdCBSRUdJU1RFUkVEX0RJU0FCTEVfVEVNUExBVEVfU0VMRUNUT1JTID0gbmV3IFNldChbICdbZGF0YS10ZW1wbGF0ZXMtZGlzYWJsZV0nLCAnbXl0aGl4LWZvci1lYWNoJyBdKTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvcigpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20oUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUykuam9pbignLCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXJEaXNhYmxlVGVtcGxhdGVFbmdpbmVTZWxlY3RvcihzZWxlY3Rvcikge1xuICBSRUdJU1RFUkVEX0RJU0FCTEVfVEVNUExBVEVfU0VMRUNUT1JTLmFkZChzZWxlY3Rvcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyRGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgUkVHSVNURVJFRF9ESVNBQkxFX1RFTVBMQVRFX1NFTEVDVE9SUy5kZWxldGUoc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBnbG9iYWxTdG9yZUhlbHBlcihkeW5hbWljLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm47XG5cbiAgY29uc3Qgc2V0T25HbG9iYWwgPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICBsZXQgY3VycmVudFZhbHVlID0gZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZVtuYW1lXTtcbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZShjdXJyZW50VmFsdWUsIER5bmFtaWNQcm9wZXJ0eSkpIHtcbiAgICAgIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGVbbmFtZV1bRHluYW1pY1Byb3BlcnR5LnNldF0odmFsdWUpO1xuICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoQmFzZVV0aWxzLmlzVHlwZSh2YWx1ZSwgRHluYW1pY1Byb3BlcnR5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZSwge1xuICAgICAgICBbbmFtZV06IHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogICAgICAgICAgKCkgPT4gdmFsdWUsXG4gICAgICAgICAgc2V0OiAgICAgICAgICAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlW0R5bmFtaWNQcm9wZXJ0eS5zZXRdKG5ld1ZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKGR5bmFtaWMpIHtcbiAgICAgIGxldCBwcm9wID0gZHluYW1pY1Byb3BJRChuYW1lKTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUsIHtcbiAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6ICAgICAgICAgICgpID0+IHByb3AsXG4gICAgICAgICAgc2V0OiAgICAgICAgICAobmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgIHByb3BbRHluYW1pY1Byb3BlcnR5LnNldF0obmV3VmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgcHJvcFtEeW5hbWljUHJvcGVydHkuc2V0XSh2YWx1ZSk7XG5cbiAgICAgIHJldHVybiBwcm9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBnbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlW25hbWVdID0gdmFsdWU7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGxldCBuYW1lVmFsdWVQYWlyID0gKEJhc2VVdGlscy5pc0NvbGxlY3RhYmxlKGFyZ3NbMF0pKSA/IG1ldGFkYXRhKFxuICAgIGFyZ3NbMF0sICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udGV4dFxuICAgIE1ZVEhJWF9OQU1FX1ZBTFVFX1BBSVJfSEVMUEVSLCAgLy8gc3BlY2lhbCBrZXlcbiAgKSA6IG51bGw7IC8vIEByZWY6X215dGhpeE5hbWVWYWx1ZVBhaXJIZWxwZXJVc2FnZVxuXG4gIGlmIChuYW1lVmFsdWVQYWlyKSB7XG4gICAgbGV0IFsgbmFtZSwgdmFsdWUgXSA9IG5hbWVWYWx1ZVBhaXI7XG4gICAgc2V0T25HbG9iYWwobmFtZSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID4gMSAmJiBCYXNlVXRpbHMuaXNUeXBlKGFyZ3NbMF0sICc6OlN0cmluZycpKSB7XG4gICAgbGV0IG5hbWUgID0gYXJnc1swXTtcbiAgICBsZXQgdmFsdWUgPSBhcmdzWzFdO1xuICAgIHNldE9uR2xvYmFsKG5hbWUsIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgdmFsdWUgPSBhcmdzWzBdO1xuICAgIGxldCBuYW1lICA9ICh0eXBlb2YgdGhpcy5nZXRJZGVudGlmaWVyID09PSAnZnVuY3Rpb24nKSA/IHRoaXMuZ2V0SWRlbnRpZmllcigpIDogKHRoaXMuZ2V0QXR0cmlidXRlKCdpZCcpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKCduYW1lJykpO1xuICAgIGlmICghbmFtZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcignXCJteXRoaXhVSS5nbG9iYWxTdG9yZVwiOiBcIm5hbWVcIiBpcyB1bmtub3duLCBzbyB1bmFibGUgdG8gc3RvcmUgdmFsdWUnKTtcblxuICAgIHNldE9uR2xvYmFsKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2xvYmFsU3RvcmUoLi4uYXJncykge1xuICByZXR1cm4gZ2xvYmFsU3RvcmVIZWxwZXIuY2FsbCh0aGlzLCBmYWxzZSwgYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnbG9iYWxTdG9yZUR5bmFtaWMoLi4uYXJncykge1xuICByZXR1cm4gZ2xvYmFsU3RvcmVIZWxwZXIuY2FsbCh0aGlzLCB0cnVlLCBhcmdzKTtcbn1cblxuY2xhc3MgU3RvcmFnZUl0ZW0ge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgIHRoaXMuX2MgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX3UgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuX3YgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92O1xuICB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICB0aGlzLl91ID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl92ID0gdmFsdWU7XG4gIH1cblxuICB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICR0eXBlOiAgJ1N0b3JhZ2VJdGVtJyxcbiAgICAgIF9jOiAgICAgdGhpcy5fYyxcbiAgICAgIF91OiAgICAgdGhpcy5fdSxcbiAgICAgIF92OiAgICAgdGhpcy5fdixcbiAgICB9O1xuICB9XG59XG5cbmNsYXNzIFN0b3JhZ2Uge1xuICBfcmV2aXZlKGRhdGEsIF9hbHJlYWR5VmlzaXRlZCkge1xuICAgIGlmICghZGF0YSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUoZGF0YSkpXG4gICAgICByZXR1cm4gZGF0YTtcblxuICAgIGxldCBhbHJlYWR5VmlzaXRlZCAgPSBfYWxyZWFkeVZpc2l0ZWQgfHwgbmV3IFNldCgpO1xuICAgIGxldCB0eXBlICAgICAgICAgICAgPSAoZGF0YSAmJiBkYXRhLiR0eXBlKTtcblxuICAgIGlmICh0eXBlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ1N0b3JhZ2VJdGVtJykge1xuICAgICAgICBsZXQgdmFsdWUgPSBkYXRhLl92O1xuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBTdG9yYWdlSXRlbSgpLCB7XG4gICAgICAgICAgX2M6IGRhdGEuX2MsXG4gICAgICAgICAgX3U6IGRhdGEuX3UsXG4gICAgICAgICAgX3Y6ICh2YWx1ZSAmJiAhQmFzZVV0aWxzLmlzUHJpbWl0aXZlKHZhbHVlKSkgPyB0aGlzLl9yZXZpdmUodmFsdWUsIGFscmVhZHlWaXNpdGVkKSA6IHZhbHVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBbIGtleSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgaWYgKCF2YWx1ZSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhbHJlYWR5VmlzaXRlZC5hZGQodmFsdWUpO1xuICAgICAgZGF0YVtrZXldID0gdGhpcy5fcmV2aXZlKHZhbHVlLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBfcmF3KGRhdGEsIF9hbHJlYWR5VmlzaXRlZCkge1xuICAgIGlmICghZGF0YSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUoZGF0YSkpXG4gICAgICByZXR1cm4gZGF0YTtcblxuICAgIGxldCBhbHJlYWR5VmlzaXRlZCA9IF9hbHJlYWR5VmlzaXRlZCB8fCBuZXcgU2V0KCk7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBTdG9yYWdlSXRlbSlcbiAgICAgIHJldHVybiB0aGlzLl9yYXcoZGF0YS5nZXRWYWx1ZSgpLCBhbHJlYWR5VmlzaXRlZCk7XG5cbiAgICBmb3IgKGxldCBbIGtleSwgdmFsdWUgXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgaWYgKCF2YWx1ZSB8fCBCYXNlVXRpbHMuaXNQcmltaXRpdmUodmFsdWUpKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKGFscmVhZHlWaXNpdGVkLmhhcyh2YWx1ZSkpXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBhbHJlYWR5VmlzaXRlZC5hZGQodmFsdWUpO1xuICAgICAgZGF0YVtrZXldID0gdGhpcy5fcmF3KHZhbHVlLCBhbHJlYWR5VmlzaXRlZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBfZ2V0UGFydHNGb3JPcGVyYXRpb24odHlwZSwgcGFydHMpIHtcbiAgICBsZXQgcGF0aFBhcnRzICAgPSAodHlwZSA9PT0gJ3NldCcpID8gcGFydHMuc2xpY2UoMCwgLTEpIDogcGFydHMuc2xpY2UoKTtcbiAgICBsZXQgcGF0aCAgICAgICAgPSBwYXRoUGFydHMubWFwKChwYXJ0KSA9PiAoKHR5cGVvZiBwYXJ0ID09PSAnc3ltYm9sJykgPyBwYXJ0LnRvU3RyaW5nKCkgOiAoJycgKyBwYXJ0KSkucmVwbGFjZSgvXFwuL2csICdcXFxcLicpKS5qb2luKCcuJyk7XG4gICAgbGV0IHBhcnNlZFBhcnRzID0gcGF0aC5zcGxpdCgvKD88IVxcXFwpXFwuL2cpO1xuICAgIGxldCBzdG9yYWdlVHlwZSA9IHBhcnNlZFBhcnRzWzBdO1xuICAgIGxldCBkYXRhICAgICAgICA9ICh0eXBlID09PSAnc2V0JykgPyBwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIGxvY2FsU3RvcmFnZSwgb3Igc2Vzc2lvblN0b3JhZ2VcbiAgICBsZXQgc3RvcmFnZUVuZ2luZSA9IGdsb2JhbFRoaXNbc3RvcmFnZVR5cGVdO1xuICAgIGlmICghc3RvcmFnZUVuZ2luZSlcbiAgICAgIHJldHVybjtcblxuICAgIGxldCByb290RGF0YSAgICA9IHt9O1xuICAgIGxldCBlbmNvZGVkQmFzZSA9IHN0b3JhZ2VFbmdpbmUuZ2V0SXRlbSgnbXl0aGl4LXVpJyk7XG4gICAgaWYgKGVuY29kZWRCYXNlKVxuICAgICAgcm9vdERhdGEgPSB0aGlzLl9yZXZpdmUoSlNPTi5wYXJzZShlbmNvZGVkQmFzZSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhdGhQYXJ0cyxcbiAgICAgIHBhdGgsXG4gICAgICBwYXJzZWRQYXJ0cyxcbiAgICAgIHN0b3JhZ2VUeXBlLFxuICAgICAgZGF0YSxcbiAgICAgIHN0b3JhZ2VFbmdpbmUsXG4gICAgICBlbmNvZGVkQmFzZSxcbiAgICAgIHJvb3REYXRhLFxuICAgIH07XG4gIH1cblxuICBfZ2V0TWV0YSh0eXBlLCBwYXJ0cykge1xuICAgIGxldCBvcGVyYXRpb24gPSB0aGlzLl9nZXRQYXJ0c0Zvck9wZXJhdGlvbih0eXBlLCBwYXJ0cyk7XG4gICAgbGV0IHtcbiAgICAgIHBhcnNlZFBhcnRzLFxuICAgICAgcm9vdERhdGEsXG4gICAgfSA9IG9wZXJhdGlvbjtcblxuICAgIGxldCBzY29wZSAgICAgICAgPSByb290RGF0YTtcbiAgICBsZXQgcGFyZW50U2NvcGUgID0gbnVsbDtcblxuICAgIGZvciAobGV0IGkgPSAxLCBpbCA9IHBhcnNlZFBhcnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChzY29wZSBpbnN0YW5jZW9mIFN0b3JhZ2VJdGVtKSB7XG4gICAgICAgIHNjb3BlID0gc2NvcGUuZ2V0VmFsdWUoKTtcbiAgICAgICAgaWYgKCFzY29wZSlcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IHBhcnQgPSBwYXJzZWRQYXJ0c1tpXTtcbiAgICAgIGxldCBzdWJTY29wZSA9IChzY29wZSkgPyBzY29wZVtwYXJ0XSA6IHNjb3BlO1xuICAgICAgaWYgKHR5cGUgPT09ICdzZXQnICYmICFzdWJTY29wZSlcbiAgICAgICAgc3ViU2NvcGUgPSBzY29wZVtwYXJ0XSA9IHt9O1xuXG4gICAgICBpZiAoc3ViU2NvcGUgPT0gbnVsbCB8fCBPYmplY3QuaXMoc3ViU2NvcGUsIE5hTikgfHwgT2JqZWN0LmlzKHN1YlNjb3BlLCAtSW5maW5pdHkpIHx8IE9iamVjdC5pcyhzdWJTY29wZSwgSW5maW5pdHkpKVxuICAgICAgICBicmVhaztcblxuICAgICAgcGFyZW50U2NvcGUgPSBzY29wZTtcbiAgICAgIHNjb3BlID0gc3ViU2NvcGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZXJhdGlvbixcbiAgICAgIHBhcmVudFNjb3BlLFxuICAgICAgc2NvcGUsXG4gICAgfTtcbiAgfVxuXG4gIGdldE1ldGEoLi4ucGFydHMpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0TWV0YSgnZ2V0JywgcGFydHMpO1xuICB9XG5cbiAgZ2V0KC4uLnBhcnRzKSB7XG4gICAgbGV0IHsgc2NvcGUgfSA9IHRoaXMuX2dldE1ldGEoJ2dldCcsIHBhcnRzKTtcbiAgICByZXR1cm4gdGhpcy5fcmF3KHNjb3BlKTtcbiAgfVxuXG4gIHNldCguLi5wYXJ0cykge1xuICAgIGxldCB7XG4gICAgICBvcGVyYXRpb24sXG4gICAgICBwYXJlbnRTY29wZSxcbiAgICAgIHNjb3BlLFxuICAgIH0gPSB0aGlzLl9nZXRNZXRhKCdzZXQnLCBwYXJ0cyk7XG5cbiAgICBsZXQge1xuICAgICAgZGF0YSxcbiAgICAgIHBhcnNlZFBhcnRzLFxuICAgICAgcGF0aCxcbiAgICAgIHJvb3REYXRhLFxuICAgICAgc3RvcmFnZUVuZ2luZSxcbiAgICB9ID0gb3BlcmF0aW9uO1xuXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gRGVsZXRlXG4gICAgICBpZiAocGFyZW50U2NvcGUpXG4gICAgICAgIGRlbGV0ZSBwYXJlbnRTY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV07XG4gICAgICBlbHNlXG4gICAgICAgIGRlbGV0ZSBzY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJlbnRTY29wZSlcbiAgICAgICAgcGFyZW50U2NvcGVbcGFyc2VkUGFydHNbcGFyc2VkUGFydHMubGVuZ3RoIC0gMV1dID0gbmV3IFN0b3JhZ2VJdGVtKGRhdGEpO1xuICAgICAgZWxzZVxuICAgICAgICBzY29wZVtwYXJzZWRQYXJ0c1twYXJzZWRQYXJ0cy5sZW5ndGggLSAxXV0gPSBuZXcgU3RvcmFnZUl0ZW0oZGF0YSk7XG4gICAgfVxuXG4gICAgc3RvcmFnZUVuZ2luZS5zZXRJdGVtKCdteXRoaXgtdWknLCBKU09OLnN0cmluZ2lmeShyb290RGF0YSkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImdsb2JhbFRoaXMubXl0aGl4VUkgPSAoZ2xvYmFsVGhpcy5teXRoaXhVSSB8fCB7fSk7XG5nbG9iYWxUaGlzLm15dGhpeFVJLmdsb2JhbFNjb3BlID0gKGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUgfHwge30pO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiAhZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS51cmwpXG4gIGdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUudXJsID0gbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbik7XG5cbmltcG9ydCAqIGFzIEJhc2VVdGlscyBmcm9tICcuL2Jhc2UtdXRpbHMuanMnO1xuZXhwb3J0ICogYXMgQmFzZVV0aWxzIGZyb20gJy4vYmFzZS11dGlscy5qcyc7XG5pbXBvcnQgKiBhcyBVdGlscyBmcm9tICcuL3V0aWxzLmpzJztcbmV4cG9ydCAqIGFzIFV0aWxzIGZyb20gJy4vdXRpbHMuanMnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4vZXJyb3JzLmpzJztcbmV4cG9ydCAqIGFzIEVycm9ycyBmcm9tICcuL2Vycm9ycy5qcyc7XG5pbXBvcnQgKiBhcyBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL3N0eWxlc2hlZXQtbWFuYWdlci5qcyc7XG5leHBvcnQgKiBhcyBTdHlsZVNoZWV0TWFuYWdlciBmcm9tICcuL3N0eWxlc2hlZXQtbWFuYWdlci5qcyc7XG5cbmltcG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmV4cG9ydCAqIGFzIENvbXBvbmVudFV0aWxzIGZyb20gJy4vY29tcG9uZW50LXV0aWxzLmpzJztcbmltcG9ydCAqIGFzIEVsZW1lbnRzIGZyb20gJy4vZWxlbWVudHMuanMnO1xuXG5pbXBvcnQgeyBEeW5hbWljUHJvcGVydHkgfSBmcm9tICcuL2R5bmFtaWMtcHJvcGVydHkuanMnO1xuXG5leHBvcnQgKiBmcm9tICcuL3F1ZXJ5LWVuZ2luZS5qcyc7XG5leHBvcnQgKiBhcyBFbGVtZW50cyBmcm9tICcuL2VsZW1lbnRzLmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlDb21wb25lbnQgfSBmcm9tICcuL215dGhpeC11aS1jb21wb25lbnQuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9teXRoaXgtdWktY29tcG9uZW50LmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlSZXF1aXJlIH0gZnJvbSAnLi9teXRoaXgtdWktcmVxdWlyZS5qcyc7XG5cbmltcG9ydCB7XG4gIE15dGhpeFVJTGFuZ3VhZ2VQYWNrLFxuICBNeXRoaXhVSUxhbmd1YWdlUHJvdmlkZXIsXG59IGZyb20gJy4vbXl0aGl4LXVpLWxhbmd1YWdlLXByb3ZpZGVyLmpzJztcblxuaW1wb3J0IHsgTXl0aGl4VUlTcGlubmVyIH0gZnJvbSAnLi9teXRoaXgtdWktc3Bpbm5lci5qcyc7XG5cbmltcG9ydCB7IE15dGhpeFVJRHluYW1pY1N0eWxlIH0gZnJvbSAnLi9teXRoaXgtdWktZHluYW1pYy1zdHlsZS5qcyc7XG5cbmV4cG9ydCBjb25zdCBNeXRoaXhFbGVtZW50cyA9IHtcbiAgTXl0aGl4VUlSZXF1aXJlLFxuICBNeXRoaXhVSUxhbmd1YWdlUGFjayxcbiAgTXl0aGl4VUlMYW5ndWFnZVByb3ZpZGVyLFxuICBNeXRoaXhVSVNwaW5uZXIsXG4gIE15dGhpeFVJRHluYW1pY1N0eWxlLFxufTtcblxuZXhwb3J0IHtcbiAgRHluYW1pY1Byb3BlcnR5LFxufTtcblxubGV0IF9teXRoaXhJc1JlYWR5ID0gZmFsc2U7XG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhnbG9iYWxUaGlzLCB7XG4gICdvbm15dGhpeHJlYWR5Jzoge1xuICAgIGVudW1lcmFibGU6ICAgZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogICAgICAgICAgKCkgPT4ge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBzZXQ6ICAgICAgICAgIChjYWxsYmFjaykgPT4ge1xuICAgICAgaWYgKF9teXRoaXhJc1JlYWR5KSB7XG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gY2FsbGJhY2sobmV3IEV2ZW50KCdteXRoaXgtcmVhZHknKSkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ215dGhpeC1yZWFkeScsIGNhbGxiYWNrKTtcbiAgICB9LFxuICB9LFxufSk7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuQmFzZVV0aWxzID0gQmFzZVV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5VdGlscyA9IFV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5Db21wb25lbnRVdGlscyA9IENvbXBvbmVudFV0aWxzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5FbGVtZW50cyA9IEVsZW1lbnRzO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5nbG9iYWxTdG9yZSA9IFV0aWxzLmdsb2JhbFN0b3JlO1xuZ2xvYmFsVGhpcy5teXRoaXhVSS5nbG9iYWxTY29wZS5nbG9iYWxTdG9yZUR5bmFtaWMgPSBVdGlscy5nbG9iYWxTdG9yZUR5bmFtaWM7XG5cbmdsb2JhbFRoaXMubXl0aGl4VUkuZ2xvYmFsU2NvcGUuZHluYW1pY1Byb3BJRCA9IGZ1bmN0aW9uKGlkKSB7XG4gIHJldHVybiBVdGlscy5keW5hbWljUHJvcElEKGlkKTtcbn07XG5cbmNsYXNzIE15dGhpeENvbm5lY3RlZEV2ZW50IGV4dGVuZHMgQ3VzdG9tRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignbXl0aGl4LWNvbm5lY3RlZCcpO1xuICB9XG59XG5cbmNsYXNzIE15dGhpeERpc2Nvbm5lY3RlZEV2ZW50IGV4dGVuZHMgQ3VzdG9tRXZlbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcignbXl0aGl4LWRpc2Nvbm5lY3RlZCcpO1xuICB9XG59XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGxldCBkaWRWaXNpYmlsaXR5T2JzZXJ2ZXJzID0gZmFsc2U7XG5cbiAgY29uc3Qgb25Eb2N1bWVudFJlYWR5ID0gKCkgPT4ge1xuICAgIGlmICghZGlkVmlzaWJpbGl0eU9ic2VydmVycykge1xuICAgICAgbGV0IGVsZW1lbnRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1teXRoaXgtc3JjXScpKTtcbiAgICAgIENvbXBvbmVudFV0aWxzLnZpc2liaWxpdHlPYnNlcnZlcigoeyBkaXNjb25uZWN0LCBlbGVtZW50LCB3YXNWaXNpYmxlIH0pID0+IHtcbiAgICAgICAgaWYgKHdhc1Zpc2libGUpXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGRpc2Nvbm5lY3QoKTtcblxuICAgICAgICBsZXQgc3JjID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbXl0aGl4LXNyYycpO1xuICAgICAgICBpZiAoIXNyYylcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgQ29tcG9uZW50VXRpbHMubG9hZFBhcnRpYWxJbnRvRWxlbWVudC5jYWxsKGVsZW1lbnQsIHNyYykudGhlbigoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdteXRoaXgtcmVhZHknKTtcbiAgICAgICAgfSk7XG4gICAgICB9LCB7IGVsZW1lbnRzIH0pO1xuXG4gICAgICBkaWRWaXNpYmlsaXR5T2JzZXJ2ZXJzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ215dGhpeC1yZWFkeScpO1xuXG4gICAgaWYgKF9teXRoaXhJc1JlYWR5KVxuICAgICAgcmV0dXJuO1xuXG4gICAgX215dGhpeElzUmVhZHkgPSB0cnVlO1xuXG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ215dGhpeC1yZWFkeScpKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhnbG9iYWxUaGlzLCB7XG4gICAgJyQnOiB7XG4gICAgICB3cml0YWJsZTogICAgIHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiAgIHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogICAgICAgICguLi5hcmdzKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKC4uLmFyZ3MpLFxuICAgIH0sXG4gICAgJyQkJzoge1xuICAgICAgd3JpdGFibGU6ICAgICB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogICB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6ICAgICAgICAoLi4uYXJncykgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCguLi5hcmdzKSxcbiAgICB9LFxuICB9KTtcblxuICBsZXQgZG9jdW1lbnRNdXRhdGlvbk9ic2VydmVyID0gZ2xvYmFsVGhpcy5teXRoaXhVSS5kb2N1bWVudE11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigobXV0YXRpb25zKSA9PiB7XG4gICAgbGV0IGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyID0gVXRpbHMuZ2V0RGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3IoKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaWwgPSBtdXRhdGlvbnMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGV0IG11dGF0aW9uICA9IG11dGF0aW9uc1tpXTtcbiAgICAgIGxldCB0YXJnZXQgICAgPSBtdXRhdGlvbi50YXJnZXQ7XG5cbiAgICAgIGlmIChtdXRhdGlvbi50eXBlID09PSAnYXR0cmlidXRlcycpIHtcbiAgICAgICAgaWYgKGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyICYmIHRhcmdldC5wYXJlbnROb2RlICYmIHR5cGVvZiB0YXJnZXQucGFyZW50Tm9kZS5jbG9zZXN0ID09PSAnZnVuY3Rpb24nICYmIHRhcmdldC5wYXJlbnROb2RlLmNsb3Nlc3QoZGlzYWJsZVRlbXBsYXRlRW5naW5lU2VsZWN0b3JTdHIpKVxuICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGxldCBhdHRyaWJ1dGVOb2RlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZU5vZGUobXV0YXRpb24uYXR0cmlidXRlTmFtZSk7XG4gICAgICAgIGxldCBuZXdWYWx1ZSAgICAgID0gKGF0dHJpYnV0ZU5vZGUpID8gYXR0cmlidXRlTm9kZS5ub2RlVmFsdWUgOiBudWxsO1xuICAgICAgICBsZXQgb2xkVmFsdWUgICAgICA9IG11dGF0aW9uLm9sZFZhbHVlO1xuXG4gICAgICAgIGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpXG4gICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlICYmIFV0aWxzLmlzVGVtcGxhdGUobmV3VmFsdWUpKVxuICAgICAgICAgIGF0dHJpYnV0ZU5vZGUubm9kZVZhbHVlID0gVXRpbHMuZm9ybWF0Tm9kZVZhbHVlKGF0dHJpYnV0ZU5vZGUsIHsgc2NvcGU6IFV0aWxzLmNyZWF0ZVNjb3BlKHRhcmdldCksIGRpc2FsbG93SFRNTDogdHJ1ZSB9KTtcblxuICAgICAgICBsZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzID0gdGFyZ2V0LmNvbnN0cnVjdG9yLm9ic2VydmVkQXR0cmlidXRlcztcbiAgICAgICAgaWYgKG9ic2VydmVkQXR0cmlidXRlcyAmJiBvYnNlcnZlZEF0dHJpYnV0ZXMuaW5kZXhPZihtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lKSA8IDApIHtcbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2suY2FsbCh0YXJnZXQsIG11dGF0aW9uLmF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobXV0YXRpb24udHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgICAgbGV0IGRpc2FibGVUZW1wbGF0aW5nID0gKGRpc2FibGVUZW1wbGF0ZUVuZ2luZVNlbGVjdG9yU3RyICYmIHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0LmNsb3Nlc3QgPT09ICdmdW5jdGlvbicgJiYgdGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRlbXBsYXRlcy1kaXNhYmxlXSxteXRoaXgtZm9yLWVhY2gnKSk7XG4gICAgICAgIGxldCBhZGRlZE5vZGVzICAgICAgICA9IG11dGF0aW9uLmFkZGVkTm9kZXM7XG4gICAgICAgIGZvciAobGV0IGogPSAwLCBqbCA9IGFkZGVkTm9kZXMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGxldCBub2RlID0gYWRkZWROb2Rlc1tqXTtcbiAgICAgICAgICBpZiAobm9kZVtNeXRoaXhVSUNvbXBvbmVudC5pc015dGhpeENvbXBvbmVudF0gJiYgbm9kZS5vbk11dGF0aW9uQWRkZWQuY2FsbChub2RlLCBtdXRhdGlvbikgPT09IGZhbHNlKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICBpZiAoIWRpc2FibGVUZW1wbGF0aW5nKVxuICAgICAgICAgICAgRWxlbWVudHMucHJvY2Vzc0VsZW1lbnRzKG5vZGUpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBjb25uZWN0ZWRFdmVudCA9IG5ldyBNeXRoaXhDb25uZWN0ZWRFdmVudCgpO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGNvbm5lY3RlZEV2ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5vbk11dGF0aW9uQ2hpbGRBZGRlZChub2RlLCBtdXRhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVtb3ZlZE5vZGVzID0gbXV0YXRpb24ucmVtb3ZlZE5vZGVzO1xuICAgICAgICBmb3IgKGxldCBqID0gMCwgamwgPSByZW1vdmVkTm9kZXMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGxldCBub2RlID0gcmVtb3ZlZE5vZGVzW2pdO1xuICAgICAgICAgIGlmIChub2RlW015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSAmJiBub2RlLm9uTXV0YXRpb25SZW1vdmVkLmNhbGwobm9kZSwgbXV0YXRpb24pID09PSBmYWxzZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLmRpc3BhdGNoRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGxldCBkaXNjb25uZWN0ZWRFdmVudCA9IG5ldyBNeXRoaXhEaXNjb25uZWN0ZWRFdmVudCgpO1xuICAgICAgICAgICAgbm9kZS5kaXNwYXRjaEV2ZW50KGRpc2Nvbm5lY3RlZEV2ZW50KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGFyZ2V0W015dGhpeFVJQ29tcG9uZW50LmlzTXl0aGl4Q29tcG9uZW50XSlcbiAgICAgICAgICAgIHRhcmdldC5vbk11dGF0aW9uQ2hpbGRSZW1vdmVkKG5vZGUsIG11dGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgZG9jdW1lbnRNdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQsIHtcbiAgICBzdWJ0cmVlOiAgICAgICAgICAgIHRydWUsXG4gICAgY2hpbGRMaXN0OiAgICAgICAgICB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6ICAgICAgICAgdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogIHRydWUsXG4gIH0pO1xuXG4gIEVsZW1lbnRzLnByb2Nlc3NFbGVtZW50cyhkb2N1bWVudC5oZWFkKTtcbiAgRWxlbWVudHMucHJvY2Vzc0VsZW1lbnRzKGRvY3VtZW50LmJvZHkpO1xuXG4gIGNvbnN0IERPQ1VNRU5UX0NIRUNLX1JFQURZX1RJTUUgPSAyNTA7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpXG4gICAgICBvbkRvY3VtZW50UmVhZHkoKTtcbiAgICBlbHNlXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgb25Eb2N1bWVudFJlYWR5KTtcbiAgfSwgRE9DVU1FTlRfQ0hFQ0tfUkVBRFlfVElNRSk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbkRvY3VtZW50UmVhZHkpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9