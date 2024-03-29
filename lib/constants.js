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
export const MYTHIX_NAME_VALUE_PAIR_HELPER  = Symbol.for('@mythix/mythix-ui/constants/name-value-pair-helper'); // @ref:Constants.MYTHIX_NAME_VALUE_PAIR_HELPER
export const MYTHIX_SHADOW_PARENT           = Symbol.for('@mythix/mythix-ui/constants/shadow-parent'); // @ref:Constants.MYTHIX_SHADOW_PARENT
export const MYTHIX_TYPE                    = Symbol.for('@mythix/mythix-ui/constants/element-definition'); // @ref:Constants.MYTHIX_TYPE
export const MYTHIX_INTERSECTION_OBSERVERS  = Symbol.for('@mythix/mythix-ui/component/constants/intersection-observers'); // @ref:Constants.MYTHIX_INTERSECTION_OBSERVERS
export const MYTHIX_DOCUMENT_INITIALIZED    = Symbol.for('@mythix/mythix-ui/component/constants/document-initialized'); // @ref:Constants.MYTHIX_DOCUMENT_INITIALIZED

// DynamicProperty
export const DYNAMIC_PROPERTY_VALUE         = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/value');
export const DYNAMIC_PROPERTY_IS_SETTING    = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/is-setting');
export const DYNAMIC_PROPERTY_SET           = Symbol.for('@mythix/mythix-ui/dynamic-property/constants/set');

// Types
export const ELEMENT_DEFINITION_TYPE        = Symbol.for('@mythix/mythix-ui/types/MythixUI::ElementDefinition');
export const QUERY_ENGINE_TYPE              = Symbol.for('@mythix/mythix-ui/types/MythixUI::QueryEngine');
export const DYNAMIC_PROPERTY_TYPE          = Symbol.for('@mythix/mythix-ui/types/MythixUI::DynamicProperty'); // @ref:Constants.DYNAMIC_PROPERTY_TYPE
export const MYTHIX_UI_COMPONENT_TYPE       = Symbol.for('@mythix/mythix-ui/types/MythixUI::MythixUIComponent');

// Elements
export const UNFINISHED_DEFINITION    = Symbol.for('@mythix/mythix-ui/constants/unfinished');


