(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Gallery_Gallery_js"],{

/***/ "./node_modules/@restart/hooks/esm/useCallbackRef.js":
/*!***********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useCallbackRef.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCallbackRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * A convenience hook around `useState` designed to be paired with
 * the component [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) api.
 * Callback refs are useful over `useRef()` when you need to respond to the ref being set
 * instead of lazily accessing it in an effect.
 *
 * ```ts
 * const [element, attachRef] = useCallbackRef<HTMLDivElement>()
 *
 * useEffect(() => {
 *   if (!element) return
 *
 *   const calendar = new FullCalendar.Calendar(element)
 *
 *   return () => {
 *     calendar.destroy()
 *   }
 * }, [element])
 *
 * return <div ref={attachRef} />
 * ```
 *
 * @category refs
 */

function useCallbackRef() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useCommittedRef.js":
/*!************************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useCommittedRef.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
 * value is the one rendered with. Generally only required for Concurrent mode usage
 * where previous work in `render()` may be discarded befor being used.
 *
 * This is safe to access in an event handler.
 *
 * @param value The `Ref` value
 */

function useCommittedRef(value) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    ref.current = value;
  }, [value]);
  return ref;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useCommittedRef);

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useEventCallback.js":
/*!*************************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useEventCallback.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useEventCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _useCommittedRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCommittedRef */ "./node_modules/@restart/hooks/esm/useCommittedRef.js");


function useEventCallback(fn) {
  var ref = (0,_useCommittedRef__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return ref.current && ref.current.apply(ref, arguments);
  }, [ref]);
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useMounted.js":
/*!*******************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useMounted.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useMounted)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * Track whether a component is current mounted. Generally less preferable than
 * properlly canceling effects so they don't run after a component is unmounted,
 * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
 *
 * @returns a function that returns the current isMounted state of the component
 *
 * ```ts
 * const [data, setData] = useState(null)
 * const isMounted = useMounted()
 *
 * useEffect(() => {
 *   fetchdata().then((newData) => {
 *      if (isMounted()) {
 *        setData(newData);
 *      }
 *   })
 * })
 * ```
 */

function useMounted() {
  var mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  var isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(function () {
    return mounted.current;
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      mounted.current = false;
    };
  }, []);
  return isMounted.current;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/usePrevious.js":
/*!********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/usePrevious.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usePrevious)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * Store the last of some value. Tracked via a `Ref` only updating it
 * after the component renders.
 *
 * Helpful if you need to compare a prop value to it's previous value during render.
 *
 * ```ts
 * function Component(props) {
 *   const lastProps = usePrevious(props)
 *
 *   if (lastProps.foo !== props.foo)
 *     resetValueFromProps(props.foo)
 * }
 * ```
 *
 * @param value the value to track
 */

function usePrevious(value) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    ref.current = value;
  });
  return ref.current;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useUpdatedRef.js":
/*!**********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useUpdatedRef.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useUpdatedRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/**
 * Returns a ref that is immediately updated with the new value
 *
 * @param value The Ref value
 * @category refs
 */

function useUpdatedRef(value) {
  var valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  valueRef.current = value;
  return valueRef;
}

/***/ }),

/***/ "./node_modules/@restart/hooks/esm/useWillUnmount.js":
/*!***********************************************************!*\
  !*** ./node_modules/@restart/hooks/esm/useWillUnmount.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useWillUnmount)
/* harmony export */ });
/* harmony import */ var _useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useUpdatedRef */ "./node_modules/@restart/hooks/esm/useUpdatedRef.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


/**
 * Attach a callback that fires when a component unmounts
 *
 * @param fn Handler to run when the component unmounts
 * @category effects
 */

function useWillUnmount(fn) {
  var onUnmount = (0,_useUpdatedRef__WEBPACK_IMPORTED_MODULE_0__["default"])(fn);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    return function () {
      return onUnmount.current();
    };
  }, []);
}

/***/ }),

/***/ "./resources/js/components/Gallery/Gallery.js":
/*!****************************************************!*\
  !*** ./resources/js/components/Gallery/Gallery.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Button.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Modal.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");





var Gallery = function Gallery() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "fileUpload text-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "file"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], {
        variant: "primary",
        children: "Launch demo modal"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
      children: "HEY"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"], {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", {
        children: "Would you like to upload this photo?"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"].Header, {
        closeButton: true,
        children: "Yo"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"].Body, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["default"].Footer, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], {
          variant: "secondary",
          children: "Close"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["default"], {
          variant: "primary",
          children: "Upload!"
        })]
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gallery);

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/dom-helpers/esm/activeElement.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/activeElement.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ activeElement)
/* harmony export */ });
/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");

/**
 * Returns the actively focused element safely.
 *
 * @param doc the document to check
 */

function activeElement(doc) {
  if (doc === void 0) {
    doc = (0,_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])();
  }

  // Support: IE 9 only
  // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
  try {
    var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
    // document.activeElement from an <iframe>

    if (!active || !active.nodeName) return null;
    return active;
  } catch (e) {
    /* ie throws if no active element */
    return doc.body;
  }
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/addClass.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/addClass.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addClass)
/* harmony export */ });
/* harmony import */ var _hasClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hasClass */ "./node_modules/dom-helpers/esm/hasClass.js");

/**
 * Adds a CSS class to a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */

function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!(0,_hasClass__WEBPACK_IMPORTED_MODULE_0__["default"])(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/addEventListener.js":
/*!**********************************************************!*\
  !*** ./node_modules/dom-helpers/esm/addEventListener.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "optionsSupported": () => (/* binding */ optionsSupported),
/* harmony export */   "onceSupported": () => (/* binding */ onceSupported),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* eslint-disable no-return-assign */

var optionsSupported = false;
var onceSupported = false;

try {
  var options = {
    get passive() {
      return optionsSupported = true;
    },

    get once() {
      // eslint-disable-next-line no-multi-assign
      return onceSupported = optionsSupported = true;
    }

  };

  if (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, true);
  }
} catch (e) {
  /* */
}

/**
 * An `addEventListener` ponyfill, supports the `once` option
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function addEventListener(node, eventName, handler, options) {
  if (options && typeof options !== 'boolean' && !onceSupported) {
    var once = options.once,
        capture = options.capture;
    var wrappedHandler = handler;

    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };

      handler.__once = wrappedHandler;
    }

    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }

  node.addEventListener(eventName, handler, options);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addEventListener);

/***/ }),

/***/ "./node_modules/dom-helpers/esm/camelize.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/camelize.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ camelize)
/* harmony export */ });
var rHyphen = /-(.)/g;
function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/canUseDOM.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/esm/canUseDOM.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (!!(typeof window !== 'undefined' && window.document && window.document.createElement));

/***/ }),

/***/ "./node_modules/dom-helpers/esm/contains.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/contains.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* eslint-disable no-bitwise, no-cond-assign */

/**
 * Checks if an element contains another given element.
 * 
 * @param context the context element
 * @param node the element to check
 */
function contains(context, node) {
  // HTML DOM and SVG DOM may have different support levels,
  // so we need to check on context instead of a document root element.
  if (context.contains) return context.contains(node);
  if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/css.js":
/*!*********************************************!*\
  !*** ./node_modules/dom-helpers/esm/css.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getComputedStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle */ "./node_modules/dom-helpers/esm/getComputedStyle.js");
/* harmony import */ var _hyphenateStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hyphenateStyle */ "./node_modules/dom-helpers/esm/hyphenateStyle.js");
/* harmony import */ var _isTransform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isTransform */ "./node_modules/dom-helpers/esm/isTransform.js");




function style(node, property) {
  var css = '';
  var transforms = '';

  if (typeof property === 'string') {
    return node.style.getPropertyValue((0,_hyphenateStyle__WEBPACK_IMPORTED_MODULE_1__["default"])(property)) || (0,_getComputedStyle__WEBPACK_IMPORTED_MODULE_0__["default"])(node).getPropertyValue((0,_hyphenateStyle__WEBPACK_IMPORTED_MODULE_1__["default"])(property));
  }

  Object.keys(property).forEach(function (key) {
    var value = property[key];

    if (!value && value !== 0) {
      node.style.removeProperty((0,_hyphenateStyle__WEBPACK_IMPORTED_MODULE_1__["default"])(key));
    } else if ((0,_isTransform__WEBPACK_IMPORTED_MODULE_2__["default"])(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += (0,_hyphenateStyle__WEBPACK_IMPORTED_MODULE_1__["default"])(key) + ": " + value + ";";
    }
  });

  if (transforms) {
    css += "transform: " + transforms + ";";
  }

  node.style.cssText += ";" + css;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (style);

/***/ }),

/***/ "./node_modules/dom-helpers/esm/getComputedStyle.js":
/*!**********************************************************!*\
  !*** ./node_modules/dom-helpers/esm/getComputedStyle.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _ownerWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ownerWindow */ "./node_modules/dom-helpers/esm/ownerWindow.js");

/**
 * Returns one or all computed style properties of an element.
 * 
 * @param node the element
 * @param psuedoElement the style property
 */

function getComputedStyle(node, psuedoElement) {
  return (0,_ownerWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(node).getComputedStyle(node, psuedoElement);
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/hasClass.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/hasClass.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hasClass)
/* harmony export */ });
/**
 * Checks if a given element has a CSS class.
 * 
 * @param element the element
 * @param className the CSS class name
 */
function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/hyphenate.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/esm/hyphenate.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hyphenate)
/* harmony export */ });
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/hyphenateStyle.js":
/*!********************************************************!*\
  !*** ./node_modules/dom-helpers/esm/hyphenateStyle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ hyphenateStyleName)
/* harmony export */ });
/* harmony import */ var _hyphenate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hyphenate */ "./node_modules/dom-helpers/esm/hyphenate.js");
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return (0,_hyphenate__WEBPACK_IMPORTED_MODULE_0__["default"])(string).replace(msPattern, '-ms-');
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/isDocument.js":
/*!****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/isDocument.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isDocument)
/* harmony export */ });
function isDocument(element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/isTransform.js":
/*!*****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/isTransform.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTransform)
/* harmony export */ });
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/isWindow.js":
/*!**************************************************!*\
  !*** ./node_modules/dom-helpers/esm/isWindow.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isWindow)
/* harmony export */ });
/* harmony import */ var _isDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isDocument */ "./node_modules/dom-helpers/esm/isDocument.js");

function isWindow(node) {
  if ('window' in node && node.window === node) return node;
  if ((0,_isDocument__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) return node.defaultView || false;
  return false;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/listen.js":
/*!************************************************!*\
  !*** ./node_modules/dom-helpers/esm/listen.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _addEventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addEventListener */ "./node_modules/dom-helpers/esm/addEventListener.js");
/* harmony import */ var _removeEventListener__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./removeEventListener */ "./node_modules/dom-helpers/esm/removeEventListener.js");



function listen(node, eventName, handler, options) {
  (0,_addEventListener__WEBPACK_IMPORTED_MODULE_0__["default"])(node, eventName, handler, options);
  return function () {
    (0,_removeEventListener__WEBPACK_IMPORTED_MODULE_1__["default"])(node, eventName, handler, options);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listen);

/***/ }),

/***/ "./node_modules/dom-helpers/esm/ownerDocument.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/ownerDocument.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ownerDocument)
/* harmony export */ });
/**
 * Returns the owner document of a given element.
 * 
 * @param node the element
 */
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/ownerWindow.js":
/*!*****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/ownerWindow.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ownerWindow)
/* harmony export */ });
/* harmony import */ var _ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");

/**
 * Returns the owner window of a given element.
 * 
 * @param node the element
 */

function ownerWindow(node) {
  var doc = (0,_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  return doc && doc.defaultView || window;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/querySelectorAll.js":
/*!**********************************************************!*\
  !*** ./node_modules/dom-helpers/esm/querySelectorAll.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ qsa)
/* harmony export */ });
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
/**
 * Runs `querySelectorAll` on a given element.
 * 
 * @param element the element
 * @param selector the selector
 */

function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/removeClass.js":
/*!*****************************************************!*\
  !*** ./node_modules/dom-helpers/esm/removeClass.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeClass)
/* harmony export */ });
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
}
/**
 * Removes a CSS class from a given element.
 * 
 * @param element the element
 * @param className the CSS class name
 */


function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  }
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/removeEventListener.js":
/*!*************************************************************!*\
  !*** ./node_modules/dom-helpers/esm/removeEventListener.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * A `removeEventListener` ponyfill
 * 
 * @param node the element
 * @param eventName the event name
 * @param handle the handler
 * @param options event options
 */
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== 'boolean' ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);

  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (removeEventListener);

/***/ }),

/***/ "./node_modules/dom-helpers/esm/scrollbarSize.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/scrollbarSize.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ scrollbarSize)
/* harmony export */ });
/* harmony import */ var _canUseDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");

var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (_canUseDOM__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      var scrollDiv = document.createElement('div');
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/transitionEnd.js":
/*!*******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/transitionEnd.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionEnd)
/* harmony export */ });
/* harmony import */ var _css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var _listen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./listen */ "./node_modules/dom-helpers/esm/listen.js");
/* harmony import */ var _triggerEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./triggerEvent */ "./node_modules/dom-helpers/esm/triggerEvent.js");




function parseDuration(node) {
  var str = (0,_css__WEBPACK_IMPORTED_MODULE_0__["default"])(node, 'transitionDuration') || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }

  var called = false;
  var handle = setTimeout(function () {
    if (!called) (0,_triggerEvent__WEBPACK_IMPORTED_MODULE_2__["default"])(element, 'transitionend', true);
  }, duration + padding);
  var remove = (0,_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(element, 'transitionend', function () {
    called = true;
  }, {
    once: true
  });
  return function () {
    clearTimeout(handle);
    remove();
  };
}

function transitionEnd(element, handler, duration, padding) {
  if (duration == null) duration = parseDuration(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = (0,_listen__WEBPACK_IMPORTED_MODULE_1__["default"])(element, 'transitionend', handler);
  return function () {
    removeEmulate();
    remove();
  };
}

/***/ }),

/***/ "./node_modules/dom-helpers/esm/triggerEvent.js":
/*!******************************************************!*\
  !*** ./node_modules/dom-helpers/esm/triggerEvent.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ triggerEvent)
/* harmony export */ });
/**
 * Triggers an event on a given element.
 * 
 * @param node the element
 * @param eventName the event name to trigger
 * @param bubbles whether the event should bubble up
 * @param cancelable whether the event should be cancelable
 */
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }

  if (cancelable === void 0) {
    cancelable = true;
  }

  if (node) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/BootstrapModalManager.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/BootstrapModalManager.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BootstrapModalManager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/querySelectorAll */ "./node_modules/dom-helpers/esm/querySelectorAll.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-overlays/ModalManager */ "./node_modules/react-overlays/esm/ModalManager.js");





var Selector = {
  FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  STICKY_CONTENT: '.sticky-top',
  NAVBAR_TOGGLER: '.navbar-toggler'
};

var BootstrapModalManager = /*#__PURE__*/function (_ModalManager) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BootstrapModalManager, _ModalManager);

  function BootstrapModalManager() {
    return _ModalManager.apply(this, arguments) || this;
  }

  var _proto = BootstrapModalManager.prototype;

  _proto.adjustAndStore = function adjustAndStore(prop, element, adjust) {
    var _css;

    var actual = element.style[prop]; // TODO: DOMStringMap and CSSStyleDeclaration aren't strictly compatible
    // @ts-ignore

    element.dataset[prop] = actual;
    (0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, (_css = {}, _css[prop] = parseFloat((0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, prop)) + adjust + "px", _css));
  };

  _proto.restore = function restore(prop, element) {
    var value = element.dataset[prop];

    if (value !== undefined) {
      var _css2;

      delete element.dataset[prop];
      (0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_1__["default"])(element, (_css2 = {}, _css2[prop] = value, _css2));
    }
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var _this = this;

    _ModalManager.prototype.setContainerStyle.call(this, containerState, container);

    if (!containerState.overflowing) return;
    var size = (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this.adjustAndStore('paddingRight', el, size);
    });
    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this.adjustAndStore('marginRight', el, -size);
    });
    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this.adjustAndStore('marginRight', el, size);
    });
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    var _this2 = this;

    _ModalManager.prototype.removeContainerStyle.call(this, containerState, container);

    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.FIXED_CONTENT).forEach(function (el) {
      return _this2.restore('paddingRight', el);
    });
    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.STICKY_CONTENT).forEach(function (el) {
      return _this2.restore('marginRight', el);
    });
    (0,dom_helpers_querySelectorAll__WEBPACK_IMPORTED_MODULE_2__["default"])(container, Selector.NAVBAR_TOGGLER).forEach(function (el) {
      return _this2.restore('marginRight', el);
    });
  };

  return BootstrapModalManager;
}(react_overlays_ModalManager__WEBPACK_IMPORTED_MODULE_4__["default"]);



/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Button.js":
/*!****************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Button.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _SafeAnchor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeAnchor */ "./node_modules/react-bootstrap/esm/SafeAnchor.js");


var _excluded = ["bsPrefix", "variant", "size", "active", "className", "block", "type", "as"];




var defaultProps = {
  variant: 'primary',
  active: false,
  disabled: false
};
var Button = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      variant = _ref.variant,
      size = _ref.size,
      active = _ref.active,
      className = _ref.className,
      block = _ref.block,
      type = _ref.type,
      as = _ref.as,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  var prefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'btn');
  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, prefix, active && 'active', variant && prefix + "-" + variant, block && prefix + "-block", size && prefix + "-" + size);

  if (props.href) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_SafeAnchor__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      as: as,
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(classes, props.disabled && 'disabled')
    }));
  }

  if (ref) {
    props.ref = ref;
  }

  if (type) {
    props.type = type;
  } else if (!as) {
    props.type = 'button';
  }

  var Component = as || 'button';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    className: classes
  }));
});
Button.displayName = 'Button';
Button.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/CloseButton.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/CloseButton.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);


var _excluded = ["label", "onClick", "className"];



var propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
var defaultProps = {
  label: 'Close'
};
var CloseButton = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(function (_ref, ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      className = _ref.className,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("button", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    type: "button",
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()('close', className),
    onClick: onClick
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("span", {
    className: "sr-only"
  }, label));
});
CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CloseButton);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Fade.js":
/*!**************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Fade.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/esm/Transition.js");
/* harmony import */ var _transitionEndListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transitionEndListener */ "./node_modules/react-bootstrap/esm/transitionEndListener.js");
/* harmony import */ var _triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./triggerBrowserReflow */ "./node_modules/react-bootstrap/esm/triggerBrowserReflow.js");


var _excluded = ["className", "children"];

var _fadeStyles;






var defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles = (_fadeStyles = {}, _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_4__.ENTERING] = 'show', _fadeStyles[react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_4__.ENTERED] = 'show', _fadeStyles);
var Fade = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      children = _ref.children,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  var handleEnter = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(function (node) {
    (0,_triggerBrowserReflow__WEBPACK_IMPORTED_MODULE_5__["default"])(node);
    if (props.onEnter) props.onEnter(node);
  }, [props]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref,
    addEndListener: _transitionEndListener__WEBPACK_IMPORTED_MODULE_6__["default"]
  }, props, {
    onEnter: handleEnter
  }), function (status, innerProps) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.cloneElement(children, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, innerProps, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fade', className, children.props.className, fadeStyles[status])
    }));
  });
});
Fade.defaultProps = defaultProps;
Fade.displayName = 'Fade';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fade);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/Modal.js":
/*!***************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/Modal.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/addEventListener */ "./node_modules/dom-helpers/esm/addEventListener.js");
/* harmony import */ var dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! dom-helpers/removeEventListener */ "./node_modules/dom-helpers/esm/removeEventListener.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var _restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @restart/hooks/useCallbackRef */ "./node_modules/@restart/hooks/esm/useCallbackRef.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @restart/hooks/useWillUnmount */ "./node_modules/@restart/hooks/esm/useWillUnmount.js");
/* harmony import */ var dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! dom-helpers/transitionEnd */ "./node_modules/dom-helpers/esm/transitionEnd.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_overlays_Modal__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-overlays/Modal */ "./node_modules/react-overlays/esm/Modal.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! warning */ "./node_modules/warning/warning.js");
/* harmony import */ var warning__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(warning__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _BootstrapModalManager__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./BootstrapModalManager */ "./node_modules/react-bootstrap/esm/BootstrapModalManager.js");
/* harmony import */ var _Fade__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Fade */ "./node_modules/react-bootstrap/esm/Fade.js");
/* harmony import */ var _ModalBody__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ModalBody */ "./node_modules/react-bootstrap/esm/ModalBody.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/esm/ModalContext.js");
/* harmony import */ var _ModalDialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./ModalDialog */ "./node_modules/react-bootstrap/esm/ModalDialog.js");
/* harmony import */ var _ModalFooter__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./ModalFooter */ "./node_modules/react-bootstrap/esm/ModalFooter.js");
/* harmony import */ var _ModalHeader__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./ModalHeader */ "./node_modules/react-bootstrap/esm/ModalHeader.js");
/* harmony import */ var _ModalTitle__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ModalTitle */ "./node_modules/react-bootstrap/esm/ModalTitle.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");


var _excluded = ["bsPrefix", "className", "style", "dialogClassName", "contentClassName", "children", "dialogAs", "aria-labelledby", "show", "animation", "backdrop", "keyboard", "onEscapeKeyDown", "onShow", "onHide", "container", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "onEntered", "onExit", "onExiting", "onEnter", "onEntering", "onExited", "backdropClassName", "manager"];






















var manager;
var defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: _ModalDialog__WEBPACK_IMPORTED_MODULE_14__["default"]
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement(_Fade__WEBPACK_IMPORTED_MODULE_15__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    timeout: null
  }));
}

function BackdropTransition(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement(_Fade__WEBPACK_IMPORTED_MODULE_15__["default"], (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
    timeout: null
  }));
}
/* eslint-enable no-use-before-define */


var Modal = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      style = _ref.style,
      dialogClassName = _ref.dialogClassName,
      contentClassName = _ref.contentClassName,
      children = _ref.children,
      Dialog = _ref.dialogAs,
      ariaLabelledby = _ref['aria-labelledby'],
      show = _ref.show,
      animation = _ref.animation,
      backdrop = _ref.backdrop,
      keyboard = _ref.keyboard,
      onEscapeKeyDown = _ref.onEscapeKeyDown,
      onShow = _ref.onShow,
      onHide = _ref.onHide,
      container = _ref.container,
      autoFocus = _ref.autoFocus,
      enforceFocus = _ref.enforceFocus,
      restoreFocus = _ref.restoreFocus,
      restoreFocusOptions = _ref.restoreFocusOptions,
      onEntered = _ref.onEntered,
      onExit = _ref.onExit,
      onExiting = _ref.onExiting,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onExited = _ref.onExited,
      backdropClassName = _ref.backdropClassName,
      propsManager = _ref.manager,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_12__.useState)({}),
      modalStyle = _useState[0],
      setStyle = _useState[1];

  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_12__.useState)(false),
      animateStaticModal = _useState2[0],
      setAnimateStaticModal = _useState2[1];

  var waitingForMouseUpRef = (0,react__WEBPACK_IMPORTED_MODULE_12__.useRef)(false);
  var ignoreBackdropClickRef = (0,react__WEBPACK_IMPORTED_MODULE_12__.useRef)(false);
  var removeStaticModalAnimationRef = (0,react__WEBPACK_IMPORTED_MODULE_12__.useRef)(null); // TODO: what's this type

  var _useCallbackRef = (0,_restart_hooks_useCallbackRef__WEBPACK_IMPORTED_MODULE_8__["default"])(),
      modal = _useCallbackRef[0],
      setModalRef = _useCallbackRef[1];

  var handleHide = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_9__["default"])(onHide);
  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_16__.useBootstrapPrefix)(bsPrefix, 'modal');
  (0,react__WEBPACK_IMPORTED_MODULE_12__.useImperativeHandle)(ref, function () {
    return {
      get _modal() {
         true ? warning__WEBPACK_IMPORTED_MODULE_13___default()(false, 'Accessing `_modal` is not supported and will be removed in a future release') : 0;
        return modal;
      }

    };
  }, [modal]);
  var modalContext = (0,react__WEBPACK_IMPORTED_MODULE_12__.useMemo)(function () {
    return {
      onHide: handleHide
    };
  }, [handleHide]);

  function getModalManager() {
    if (propsManager) return propsManager;
    if (!manager) manager = new _BootstrapModalManager__WEBPACK_IMPORTED_MODULE_17__["default"]();
    return manager;
  }

  function updateDialogStyle(node) {
    if (!dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_4__["default"]) return;
    var containerIsOverflowing = getModalManager().isContainerOverflowing(modal);
    var modalIsOverflowing = node.scrollHeight > (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_5__["default"])(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_7__["default"])() : undefined,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_7__["default"])() : undefined
    });
  }

  var handleWindowResize = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_9__["default"])(function () {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  (0,_restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_10__["default"])(function () {
    (0,dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_6__["default"])(window, 'resize', handleWindowResize);

    if (removeStaticModalAnimationRef.current) {
      removeStaticModalAnimationRef.current();
    }
  }); // We prevent the modal from closing during a drag by detecting where the
  // the click originates from. If it starts in the modal and then ends outside
  // don't close.

  var handleDialogMouseDown = function handleDialogMouseDown() {
    waitingForMouseUpRef.current = true;
  };

  var handleMouseUp = function handleMouseUp(e) {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }

    waitingForMouseUpRef.current = false;
  };

  var handleStaticModalAnimation = function handleStaticModalAnimation() {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = (0,dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_11__["default"])(modal.dialog, function () {
      setAnimateStaticModal(false);
    });
  };

  var handleStaticBackdropClick = function handleStaticBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    handleStaticModalAnimation();
  };

  var handleClick = function handleClick(e) {
    if (backdrop === 'static') {
      handleStaticBackdropClick(e);
      return;
    }

    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }

    onHide == null ? void 0 : onHide();
  };

  var handleEscapeKeyDown = function handleEscapeKeyDown(e) {
    if (!keyboard && backdrop === 'static') {
      // Call preventDefault to stop modal from closing in react-overlays,
      // then play our animation.
      e.preventDefault();
      handleStaticModalAnimation();
    } else if (keyboard && onEscapeKeyDown) {
      onEscapeKeyDown(e);
    }
  };

  var handleEnter = function handleEnter(node, isAppearing) {
    if (node) {
      node.style.display = 'block';
      updateDialogStyle(node);
    }

    onEnter == null ? void 0 : onEnter(node, isAppearing);
  };

  var handleExit = function handleExit(node) {
    removeStaticModalAnimationRef.current == null ? void 0 : removeStaticModalAnimationRef.current();
    onExit == null ? void 0 : onExit(node);
  };

  var handleEntering = function handleEntering(node, isAppearing) {
    onEntering == null ? void 0 : onEntering(node, isAppearing); // FIXME: This should work even when animation is disabled.

    (0,dom_helpers_addEventListener__WEBPACK_IMPORTED_MODULE_3__["default"])(window, 'resize', handleWindowResize);
  };

  var handleExited = function handleExited(node) {
    if (node) node.style.display = ''; // RHL removes it sometimes

    onExited == null ? void 0 : onExited(node); // FIXME: This should work even when animation is disabled.

    (0,dom_helpers_removeEventListener__WEBPACK_IMPORTED_MODULE_6__["default"])(window, 'resize', handleWindowResize);
  };

  var renderBackdrop = (0,react__WEBPACK_IMPORTED_MODULE_12__.useCallback)(function (backdropProps) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, backdropProps, {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix + "-backdrop", backdropClassName, !animation && 'show')
    }));
  }, [animation, backdropClassName, bsPrefix]);

  var baseModalStyle = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, style, modalStyle); // Sets `display` always block when `animation` is false


  if (!animation) {
    baseModalStyle.display = 'block';
  }

  var renderDialog = function renderDialog(dialogProps) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
      role: "dialog"
    }, dialogProps, {
      style: baseModalStyle,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix, animateStaticModal && bsPrefix + "-static"),
      onClick: backdrop ? handleClick : undefined,
      onMouseUp: handleMouseUp,
      "aria-labelledby": ariaLabelledby
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement(Dialog, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, {
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName: contentClassName
    }), children));
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement(_ModalContext__WEBPACK_IMPORTED_MODULE_18__["default"].Provider, {
    value: modalContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_12__.createElement(react_overlays_Modal__WEBPACK_IMPORTED_MODULE_19__["default"], {
    show: show,
    ref: setModalRef,
    backdrop: backdrop,
    container: container,
    keyboard: true // Always set true - see handleEscapeKeyDown
    ,
    autoFocus: autoFocus,
    enforceFocus: enforceFocus,
    restoreFocus: restoreFocus,
    restoreFocusOptions: restoreFocusOptions,
    onEscapeKeyDown: handleEscapeKeyDown,
    onShow: onShow,
    onHide: onHide,
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: onEntered,
    onExit: handleExit,
    onExiting: onExiting,
    onExited: handleExited,
    manager: getModalManager(),
    containerClassName: bsPrefix + "-open",
    transition: animation ? DialogTransition : undefined,
    backdropTransition: animation ? BackdropTransition : undefined,
    renderBackdrop: renderBackdrop,
    renderDialog: renderDialog
  }));
});
Modal.displayName = 'Modal';
Modal.defaultProps = defaultProps;
Modal.Body = _ModalBody__WEBPACK_IMPORTED_MODULE_20__["default"];
Modal.Header = _ModalHeader__WEBPACK_IMPORTED_MODULE_21__["default"];
Modal.Title = _ModalTitle__WEBPACK_IMPORTED_MODULE_22__["default"];
Modal.Footer = _ModalFooter__WEBPACK_IMPORTED_MODULE_23__["default"];
Modal.Dialog = _ModalDialog__WEBPACK_IMPORTED_MODULE_14__["default"];
Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalBody.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalBody.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-body'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalContext.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalContext.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var ModalContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide: function onHide() {}
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalContext);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalDialog.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalDialog.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");


var _excluded = ["bsPrefix", "className", "contentClassName", "centered", "size", "children", "scrollable"];



var ModalDialog = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      className = _ref.className,
      contentClassName = _ref.contentClassName,
      centered = _ref.centered,
      size = _ref.size,
      children = _ref.children,
      scrollable = _ref.scrollable,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_4__.useBootstrapPrefix)(bsPrefix, 'modal');
  var dialogClass = bsPrefix + "-dialog";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    ref: ref,
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(dialogClass, className, size && bsPrefix + "-" + size, centered && dialogClass + "-centered", scrollable && dialogClass + "-scrollable")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(bsPrefix + "-content", contentClassName)
  }, children));
});
ModalDialog.displayName = 'ModalDialog';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalDialog);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalFooter.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalFooter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_0__["default"])('modal-footer'));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalHeader.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalHeader.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");
/* harmony import */ var _CloseButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CloseButton */ "./node_modules/react-bootstrap/esm/CloseButton.js");
/* harmony import */ var _ModalContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ModalContext */ "./node_modules/react-bootstrap/esm/ModalContext.js");


var _excluded = ["bsPrefix", "closeLabel", "closeButton", "onHide", "className", "children"];






var defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};
var ModalHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(function (_ref, ref) {
  var bsPrefix = _ref.bsPrefix,
      closeLabel = _ref.closeLabel,
      closeButton = _ref.closeButton,
      onHide = _ref.onHide,
      className = _ref.className,
      children = _ref.children,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  bsPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, 'modal-header');
  var context = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_ModalContext__WEBPACK_IMPORTED_MODULE_6__["default"]);
  var handleClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_4__["default"])(function () {
    if (context) context.onHide();
    if (onHide) onHide();
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, bsPrefix)
  }), children, closeButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_CloseButton__WEBPACK_IMPORTED_MODULE_7__["default"], {
    label: closeLabel,
    onClick: handleClick
  }));
});
ModalHeader.displayName = 'ModalHeader';
ModalHeader.defaultProps = defaultProps;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalHeader);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ModalTitle.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ModalTitle.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createWithBsPrefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createWithBsPrefix */ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js");
/* harmony import */ var _divWithClassName__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./divWithClassName */ "./node_modules/react-bootstrap/esm/divWithClassName.js");


var DivStyledAsH4 = (0,_divWithClassName__WEBPACK_IMPORTED_MODULE_0__["default"])('h4');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_createWithBsPrefix__WEBPACK_IMPORTED_MODULE_1__["default"])('modal-title', {
  Component: DivStyledAsH4
}));

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/SafeAnchor.js":
/*!********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/SafeAnchor.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _createChainedFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createChainedFunction */ "./node_modules/react-bootstrap/esm/createChainedFunction.js");


var _excluded = ["as", "disabled", "onKeyDown"];



function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */


var SafeAnchor = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
      Component = _ref$as === void 0 ? 'a' : _ref$as,
      disabled = _ref.disabled,
      onKeyDown = _ref.onKeyDown,
      props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);

  var handleClick = function handleClick(event) {
    var href = props.href,
        onClick = props.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };

  if (isTrivialHref(props.href)) {
    props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
    // otherwise, the cursor incorrectly styled (except with role='button')

    props.href = props.href || '#';
  }

  if (disabled) {
    props.tabIndex = -1;
    props['aria-disabled'] = true;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ref: ref
  }, props, {
    onClick: handleClick,
    onKeyDown: (0,_createChainedFunction__WEBPACK_IMPORTED_MODULE_3__["default"])(handleKeyDown, onKeyDown)
  }));
});
SafeAnchor.displayName = 'SafeAnchor';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SafeAnchor);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/ThemeProvider.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/ThemeProvider.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useBootstrapPrefix": () => (/* binding */ useBootstrapPrefix),
/* harmony export */   "createBootstrapComponent": () => (/* binding */ createBootstrapComponent),
/* harmony export */   "ThemeConsumer": () => (/* binding */ Consumer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var ThemeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createContext({});
var Consumer = ThemeContext.Consumer,
    Provider = ThemeContext.Provider;

function ThemeProvider(_ref) {
  var prefixes = _ref.prefixes,
      children = _ref.children;
  var copiedPrefixes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, prefixes);
  }, [prefixes]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Provider, {
    value: copiedPrefixes
  }, children);
}

function useBootstrapPrefix(prefix, defaultPrefix) {
  var prefixes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = {
    prefix: opts
  };
  var isClassy = Component.prototype && Component.prototype.isReactComponent; // If it's a functional component make sure we don't break it with a ref

  var _opts = opts,
      prefix = _opts.prefix,
      _opts$forwardRefAs = _opts.forwardRefAs,
      forwardRefAs = _opts$forwardRefAs === void 0 ? isClassy ? 'ref' : 'innerRef' : _opts$forwardRefAs;
  var Wrapped = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (_ref2, ref) {
    var props = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _ref2);

    props[forwardRefAs] = ref;
    var bsPrefix = useBootstrapPrefix(props.bsPrefix, prefix);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(Component, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
      bsPrefix: bsPrefix
    }));
  });
  Wrapped.displayName = "Bootstrap(" + (Component.displayName || Component.name) + ")";
  return Wrapped;
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThemeProvider);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/createChainedFunction.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/createChainedFunction.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
function createChainedFunction() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) return f;
    return function chainedFunction() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // @ts-ignore
      acc.apply(this, args); // @ts-ignore

      f.apply(this, args);
    };
  }, null);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createChainedFunction);

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/createWithBsPrefix.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/createWithBsPrefix.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createWithBsPrefix)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dom_helpers_camelize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/camelize */ "./node_modules/dom-helpers/esm/camelize.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _ThemeProvider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ThemeProvider */ "./node_modules/react-bootstrap/esm/ThemeProvider.js");


var _excluded = ["className", "bsPrefix", "as"];





var pascalCase = function pascalCase(str) {
  return str[0].toUpperCase() + (0,dom_helpers_camelize__WEBPACK_IMPORTED_MODULE_3__["default"])(str).slice(1);
};

// TODO: emstricten & fix the typing here! `createWithBsPrefix<TElementType>...`
function createWithBsPrefix(prefix, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === void 0 ? pascalCase(prefix) : _ref$displayName,
      Component = _ref.Component,
      defaultProps = _ref.defaultProps;

  var BsComponent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.forwardRef(function (_ref2, ref) {
    var className = _ref2.className,
        bsPrefix = _ref2.bsPrefix,
        _ref2$as = _ref2.as,
        Tag = _ref2$as === void 0 ? Component || 'div' : _ref2$as,
        props = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, _excluded);

    var resolvedPrefix = (0,_ThemeProvider__WEBPACK_IMPORTED_MODULE_5__.useBootstrapPrefix)(bsPrefix, prefix);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4__.createElement(Tag, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, resolvedPrefix)
    }, props));
  });
  BsComponent.defaultProps = defaultProps;
  BsComponent.displayName = displayName;
  return BsComponent;
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/divWithClassName.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/divWithClassName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function (className) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.forwardRef(function (p, ref) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, p, {
      ref: ref,
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(p.className, className)
    }));
  });
});

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/transitionEndListener.js":
/*!*******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/transitionEndListener.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ transitionEndListener)
/* harmony export */ });
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/transitionEnd */ "./node_modules/dom-helpers/esm/transitionEnd.js");



function parseDuration(node, property) {
  var str = (0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_0__["default"])(node, property) || '';
  var mult = str.indexOf('ms') === -1 ? 1000 : 1;
  return parseFloat(str) * mult;
}

function transitionEndListener(element, handler) {
  var duration = parseDuration(element, 'transitionDuration');
  var delay = parseDuration(element, 'transitionDelay');
  var remove = (0,dom_helpers_transitionEnd__WEBPACK_IMPORTED_MODULE_1__["default"])(element, function (e) {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}

/***/ }),

/***/ "./node_modules/react-bootstrap/esm/triggerBrowserReflow.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-bootstrap/esm/triggerBrowserReflow.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ triggerBrowserReflow)
/* harmony export */ });
// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
function triggerBrowserReflow(node) {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  node.offsetHeight;
}

/***/ }),

/***/ "./node_modules/react-overlays/esm/Modal.js":
/*!**************************************************!*\
  !*** ./node_modules/react-overlays/esm/Modal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/activeElement */ "./node_modules/dom-helpers/esm/activeElement.js");
/* harmony import */ var dom_helpers_contains__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/contains */ "./node_modules/dom-helpers/esm/contains.js");
/* harmony import */ var dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! dom-helpers/canUseDOM */ "./node_modules/dom-helpers/esm/canUseDOM.js");
/* harmony import */ var dom_helpers_listen__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! dom-helpers/listen */ "./node_modules/dom-helpers/esm/listen.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _restart_hooks_useMounted__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @restart/hooks/useMounted */ "./node_modules/@restart/hooks/esm/useMounted.js");
/* harmony import */ var _restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @restart/hooks/useWillUnmount */ "./node_modules/@restart/hooks/esm/useWillUnmount.js");
/* harmony import */ var _restart_hooks_usePrevious__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @restart/hooks/usePrevious */ "./node_modules/@restart/hooks/esm/usePrevious.js");
/* harmony import */ var _restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @restart/hooks/useEventCallback */ "./node_modules/@restart/hooks/esm/useEventCallback.js");
/* harmony import */ var _ModalManager__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ModalManager */ "./node_modules/react-overlays/esm/ModalManager.js");
/* harmony import */ var _useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./useWaitForDOMRef */ "./node_modules/react-overlays/esm/useWaitForDOMRef.js");



/* eslint-disable @typescript-eslint/no-use-before-define, react/prop-types */













var manager;

function getManager() {
  if (!manager) manager = new _ModalManager__WEBPACK_IMPORTED_MODULE_13__["default"]();
  return manager;
}

function useModalManager(provided) {
  var modalManager = provided || getManager();
  var modal = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)({
    dialog: null,
    backdrop: null
  });
  return Object.assign(modal.current, {
    add: function add(container, className) {
      return modalManager.add(modal.current, container, className);
    },
    remove: function remove() {
      return modalManager.remove(modal.current);
    },
    isTopModal: function isTopModal() {
      return modalManager.isTopModal(modal.current);
    },
    setDialogRef: (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (ref) {
      modal.current.dialog = ref;
    }, []),
    setBackdropRef: (0,react__WEBPACK_IMPORTED_MODULE_7__.useCallback)(function (ref) {
      modal.current.backdrop = ref;
    }, [])
  });
}

var Modal = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_7__.forwardRef)(function (_ref, ref) {
  var _ref$show = _ref.show,
      show = _ref$show === void 0 ? false : _ref$show,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'dialog' : _ref$role,
      className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      _ref$backdrop = _ref.backdrop,
      backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
      _ref$keyboard = _ref.keyboard,
      keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
      onBackdropClick = _ref.onBackdropClick,
      onEscapeKeyDown = _ref.onEscapeKeyDown,
      transition = _ref.transition,
      backdropTransition = _ref.backdropTransition,
      _ref$autoFocus = _ref.autoFocus,
      autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
      _ref$enforceFocus = _ref.enforceFocus,
      enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus,
      _ref$restoreFocus = _ref.restoreFocus,
      restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
      restoreFocusOptions = _ref.restoreFocusOptions,
      renderDialog = _ref.renderDialog,
      _ref$renderBackdrop = _ref.renderBackdrop,
      renderBackdrop = _ref$renderBackdrop === void 0 ? function (props) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", props);
  } : _ref$renderBackdrop,
      providedManager = _ref.manager,
      containerRef = _ref.container,
      containerClassName = _ref.containerClassName,
      onShow = _ref.onShow,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      onExit = _ref.onExit,
      onExited = _ref.onExited,
      onExiting = _ref.onExiting,
      onEnter = _ref.onEnter,
      onEntering = _ref.onEntering,
      onEntered = _ref.onEntered,
      rest = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);

  var container = (0,_useWaitForDOMRef__WEBPACK_IMPORTED_MODULE_14__["default"])(containerRef);
  var modal = useModalManager(providedManager);
  var isMounted = (0,_restart_hooks_useMounted__WEBPACK_IMPORTED_MODULE_9__["default"])();
  var prevShow = (0,_restart_hooks_usePrevious__WEBPACK_IMPORTED_MODULE_11__["default"])(show);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(!show),
      exited = _useState[0],
      setExited = _useState[1];

  var lastFocusRef = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useImperativeHandle)(ref, function () {
    return modal;
  }, [modal]);

  if (dom_helpers_canUseDOM__WEBPACK_IMPORTED_MODULE_4__["default"] && !prevShow && show) {
    lastFocusRef.current = (0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_2__["default"])();
  }

  if (!transition && !show && !exited) {
    setExited(true);
  } else if (show && exited) {
    setExited(false);
  }

  var handleShow = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
    modal.add(container, containerClassName);
    removeKeydownListenerRef.current = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_5__["default"])(document, 'keydown', handleDocumentKeyDown);
    removeFocusListenerRef.current = (0,dom_helpers_listen__WEBPACK_IMPORTED_MODULE_5__["default"])(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
    // and so steals focus from it
    function () {
      return setTimeout(handleEnforceFocus);
    }, true);

    if (onShow) {
      onShow();
    } // autofocus after onShow to not trigger a focus event for previous
    // modals before this one is shown.


    if (autoFocus) {
      var currentActiveElement = (0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_2__["default"])(document);

      if (modal.dialog && currentActiveElement && !(0,dom_helpers_contains__WEBPACK_IMPORTED_MODULE_3__["default"])(modal.dialog, currentActiveElement)) {
        lastFocusRef.current = currentActiveElement;
        modal.dialog.focus();
      }
    }
  });
  var handleHide = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
    modal.remove();
    removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
    removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();

    if (restoreFocus) {
      var _lastFocusRef$current;

      // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
      (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
      lastFocusRef.current = null;
    }
  }); // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120
  // Show logic when:
  //  - show is `true` _and_ `container` has resolved

  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    if (!show || !container) return;
    handleShow();
  }, [show, container,
  /* should never change: */
  handleShow]); // Hide cleanup logic when:
  //  - `exited` switches to true
  //  - component unmounts;

  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(function () {
    if (!exited) return;
    handleHide();
  }, [exited, handleHide]);
  (0,_restart_hooks_useWillUnmount__WEBPACK_IMPORTED_MODULE_10__["default"])(function () {
    handleHide();
  }); // --------------------------------

  var handleEnforceFocus = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
    if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }

    var currentActiveElement = (0,dom_helpers_activeElement__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (modal.dialog && currentActiveElement && !(0,dom_helpers_contains__WEBPACK_IMPORTED_MODULE_3__["default"])(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  });
  var handleBackdropClick = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__["default"])(function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    onBackdropClick == null ? void 0 : onBackdropClick(e);

    if (backdrop === true) {
      onHide();
    }
  });
  var handleDocumentKeyDown = (0,_restart_hooks_useEventCallback__WEBPACK_IMPORTED_MODULE_12__["default"])(function (e) {
    if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
      onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);

      if (!e.defaultPrevented) {
        onHide();
      }
    }
  });
  var removeFocusListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)();
  var removeKeydownListenerRef = (0,react__WEBPACK_IMPORTED_MODULE_7__.useRef)();

  var handleHidden = function handleHidden() {
    setExited(true);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    onExited == null ? void 0 : onExited.apply(void 0, args);
  };

  var Transition = transition;

  if (!container || !(show || Transition && !exited)) {
    return null;
  }

  var dialogProps = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    role: role,
    ref: modal.setDialogRef,
    // apparently only works on the dialog role element
    'aria-modal': role === 'dialog' ? true : undefined
  }, rest, {
    style: style,
    className: className,
    tabIndex: -1
  });

  var dialog = renderDialog ? renderDialog(dialogProps) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement("div", dialogProps, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.cloneElement(children, {
    role: 'document'
  }));

  if (Transition) {
    dialog = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(Transition, {
      appear: true,
      unmountOnExit: true,
      "in": !!show,
      onExit: onExit,
      onExiting: onExiting,
      onExited: handleHidden,
      onEnter: onEnter,
      onEntering: onEntering,
      onEntered: onEntered
    }, dialog);
  }

  var backdropElement = null;

  if (backdrop) {
    var BackdropTransition = backdropTransition;
    backdropElement = renderBackdrop({
      ref: modal.setBackdropRef,
      onClick: handleBackdropClick
    });

    if (BackdropTransition) {
      backdropElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(BackdropTransition, {
        appear: true,
        "in": !!show
      }, backdropElement);
    }
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, /*#__PURE__*/react_dom__WEBPACK_IMPORTED_MODULE_8__.createPortal( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7__.createElement(react__WEBPACK_IMPORTED_MODULE_7__.Fragment, null, backdropElement, dialog), container));
});
var propTypes = {
  /**
   * Set the visibility of the Modal
   */
  show: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
   *
   * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
   * page content can be placed behind a virtual backdrop as well as a visual one.
   */
  container: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any),

  /**
   * A callback fired when the Modal is opening.
   */
  onShow: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A callback fired when either the backdrop is clicked, or the escape key is pressed.
   *
   * The `onHide` callback only signals intent from the Modal,
   * you must actually set the `show` prop to `false` for the Modal to close.
   */
  onHide: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Include a backdrop component.
   */
  backdrop: prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool), prop_types__WEBPACK_IMPORTED_MODULE_6___default().oneOf(['static'])]),

  /**
   * A function that returns the dialog component. Useful for custom
   * rendering. **Note:** the component should make sure to apply the provided ref.
   *
   * ```js static
   * renderDialog={props => <MyDialog {...props} />}
   * ```
   */
  renderDialog: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A function that returns a backdrop component. Useful for custom
   * backdrop rendering.
   *
   * ```js
   *  renderBackdrop={props => <MyBackdrop {...props} />}
   * ```
   */
  renderBackdrop: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A callback fired when the escape key, if specified in `keyboard`, is pressed.
   *
   * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
   */
  onEscapeKeyDown: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A callback fired when the backdrop, if specified, is clicked.
   */
  onBackdropClick: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A css class or set of classes applied to the modal container when the modal is open,
   * and removed when it is closed.
   */
  containerClassName: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the dialog component.
   */
  transition: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component used
   * to control animations for the backdrop components.
   */
  backdropTransition: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().elementType),

  /**
   * When `true` The modal will automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes. This also
   * works correctly with any Modal children that have the `autoFocus` prop.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  autoFocus: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * When `true` The modal will prevent focus from leaving the Modal while open.
   *
   * Generally this should never be set to `false` as it makes the Modal less
   * accessible to assistive technologies, like screen readers.
   */
  enforceFocus: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),

  /**
   * Options passed to focus function when `restoreFocus` is set to `true`
   *
   * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
   */
  restoreFocusOptions: prop_types__WEBPACK_IMPORTED_MODULE_6___default().shape({
    preventScroll: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool)
  }),

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),

  /**
   * A ModalManager instance used to track and manage the state of open
   * Modals. Useful when customizing how modals interact within a container
   */
  manager: prop_types__WEBPACK_IMPORTED_MODULE_6___default().instanceOf(_ModalManager__WEBPACK_IMPORTED_MODULE_13__["default"])
};
Modal.displayName = 'Modal';
Modal.propTypes = propTypes;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Object.assign(Modal, {
  Manager: _ModalManager__WEBPACK_IMPORTED_MODULE_13__["default"]
}));

/***/ }),

/***/ "./node_modules/react-overlays/esm/ModalManager.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-overlays/esm/ModalManager.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var dom_helpers_addClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/addClass */ "./node_modules/dom-helpers/esm/addClass.js");
/* harmony import */ var dom_helpers_removeClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/removeClass */ "./node_modules/dom-helpers/esm/removeClass.js");
/* harmony import */ var dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dom-helpers/css */ "./node_modules/dom-helpers/esm/css.js");
/* harmony import */ var dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dom-helpers/scrollbarSize */ "./node_modules/dom-helpers/esm/scrollbarSize.js");
/* harmony import */ var _isOverflowing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isOverflowing */ "./node_modules/react-overlays/esm/isOverflowing.js");
/* harmony import */ var _manageAriaHidden__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./manageAriaHidden */ "./node_modules/react-overlays/esm/manageAriaHidden.js");







function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }

    return false;
  });
  return idx;
}

/**
 * Proper state management for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */
var ModalManager = /*#__PURE__*/function () {
  function ModalManager(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$hideSiblingNodes = _ref.hideSiblingNodes,
        hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
        _ref$handleContainerO = _ref.handleContainerOverflow,
        handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

    this.hideSiblingNodes = void 0;
    this.handleContainerOverflow = void 0;
    this.modals = void 0;
    this.containers = void 0;
    this.data = void 0;
    this.scrollbarSize = void 0;
    this.hideSiblingNodes = hideSiblingNodes;
    this.handleContainerOverflow = handleContainerOverflow;
    this.modals = [];
    this.containers = [];
    this.data = [];
    this.scrollbarSize = (0,dom_helpers_scrollbarSize__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }

  var _proto = ModalManager.prototype;

  _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
    var data = this.data[this.containerIndexFromModal(modal)];
    return data && data.overflowing;
  };

  _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
    return findIndexOf(this.data, function (d) {
      return d.modals.indexOf(modal) !== -1;
    });
  };

  _proto.setContainerStyle = function setContainerStyle(containerState, container) {
    var style = {
      overflow: 'hidden'
    }; // we are only interested in the actual `style` here
    // because we will override it

    containerState.style = {
      overflow: container.style.overflow,
      paddingRight: container.style.paddingRight
    };

    if (containerState.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style.paddingRight = parseInt((0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__["default"])(container, 'paddingRight') || '0', 10) + this.scrollbarSize + "px";
    }

    (0,dom_helpers_css__WEBPACK_IMPORTED_MODULE_2__["default"])(container, style);
  };

  _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
    Object.assign(container.style, containerState.style);
  };

  _proto.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      (0,_manageAriaHidden__WEBPACK_IMPORTED_MODULE_4__.hideSiblings)(container, modal);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      // right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      overflowing: (0,_isOverflowing__WEBPACK_IMPORTED_MODULE_5__["default"])(container)
    };

    if (this.handleContainerOverflow) {
      this.setContainerStyle(data, container);
    }

    data.classes.forEach(dom_helpers_addClass__WEBPACK_IMPORTED_MODULE_0__["default"].bind(null, container));
    this.containers.push(container);
    this.data.push(data);
    return modalIdx;
  };

  _proto.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = this.containerIndexFromModal(modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];
    data.modals.splice(data.modals.indexOf(modal), 1);
    this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
    // clean up the container

    if (data.modals.length === 0) {
      data.classes.forEach(dom_helpers_removeClass__WEBPACK_IMPORTED_MODULE_1__["default"].bind(null, container));

      if (this.handleContainerOverflow) {
        this.removeContainerStyle(data, container);
      }

      if (this.hideSiblingNodes) {
        (0,_manageAriaHidden__WEBPACK_IMPORTED_MODULE_4__.showSiblings)(container, modal);
      }

      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      // otherwise make sure the next top modal is visible to a SR
      var _data$modals = data.modals[data.modals.length - 1],
          backdrop = _data$modals.backdrop,
          dialog = _data$modals.dialog;
      (0,_manageAriaHidden__WEBPACK_IMPORTED_MODULE_4__.ariaHidden)(false, dialog);
      (0,_manageAriaHidden__WEBPACK_IMPORTED_MODULE_4__.ariaHidden)(false, backdrop);
    }
  };

  _proto.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalManager);

/***/ }),

/***/ "./node_modules/react-overlays/esm/isOverflowing.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-overlays/esm/isOverflowing.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isOverflowing)
/* harmony export */ });
/* harmony import */ var dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/isWindow */ "./node_modules/dom-helpers/esm/isWindow.js");
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");



function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = (0,dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(node) ? (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__["default"])() : (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_1__["default"])(node);
  var win = (0,dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || doc.defaultView;
  return doc.body.clientWidth < win.innerWidth;
}

function isOverflowing(container) {
  var win = (0,dom_helpers_isWindow__WEBPACK_IMPORTED_MODULE_0__["default"])(container);
  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

/***/ }),

/***/ "./node_modules/react-overlays/esm/manageAriaHidden.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-overlays/esm/manageAriaHidden.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ariaHidden": () => (/* binding */ ariaHidden),
/* harmony export */   "hideSiblings": () => (/* binding */ hideSiblings),
/* harmony export */   "showSiblings": () => (/* binding */ showSiblings)
/* harmony export */ });
var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType,
      tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, exclude, cb) {
  [].forEach.call(container.children, function (node) {
    if (exclude.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(hide, node) {
  if (!node) return;

  if (hide) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}
function hideSiblings(container, _ref2) {
  var dialog = _ref2.dialog,
      backdrop = _ref2.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(true, node);
  });
}
function showSiblings(container, _ref3) {
  var dialog = _ref3.dialog,
      backdrop = _ref3.backdrop;
  siblings(container, [dialog, backdrop], function (node) {
    return ariaHidden(false, node);
  });
}

/***/ }),

/***/ "./node_modules/react-overlays/esm/useWaitForDOMRef.js":
/*!*************************************************************!*\
  !*** ./node_modules/react-overlays/esm/useWaitForDOMRef.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resolveContainerRef": () => (/* binding */ resolveContainerRef),
/* harmony export */   "default": () => (/* binding */ useWaitForDOMRef)
/* harmony export */ });
/* harmony import */ var dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-helpers/ownerDocument */ "./node_modules/dom-helpers/esm/ownerDocument.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var resolveContainerRef = function resolveContainerRef(ref) {
  var _ref;

  if (typeof document === 'undefined') return null;
  if (ref == null) return (0,dom_helpers_ownerDocument__WEBPACK_IMPORTED_MODULE_0__["default"])().body;
  if (typeof ref === 'function') ref = ref();
  if (ref && 'current' in ref) ref = ref.current;
  if ((_ref = ref) != null && _ref.nodeType) return ref || null;
  return null;
};
function useWaitForDOMRef(ref, onResolved) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
    return resolveContainerRef(ref);
  }),
      resolvedRef = _useState[0],
      setRef = _useState[1];

  if (!resolvedRef) {
    var earlyRef = resolveContainerRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var nextRef = resolveContainerRef(ref);

    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);
  return resolvedRef;
}

/***/ }),

/***/ "./node_modules/react-transition-group/esm/Transition.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/Transition.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UNMOUNTED": () => (/* binding */ UNMOUNTED),
/* harmony export */   "EXITED": () => (/* binding */ EXITED),
/* harmony export */   "ENTERING": () => (/* binding */ ENTERING),
/* harmony export */   "ENTERED": () => (/* binding */ ENTERED),
/* harmony export */   "EXITING": () => (/* binding */ EXITING),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./node_modules/react-transition-group/esm/config.js");
/* harmony import */ var _utils_PropTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/PropTypes */ "./node_modules/react-transition-group/esm/utils/PropTypes.js");
/* harmony import */ var _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransitionGroupContext */ "./node_modules/react-transition-group/esm/TransitionGroupContext.js");








var UNMOUNTED = 'unmounted';
var EXITED = 'exited';
var ENTERING = 'entering';
var ENTERED = 'entered';
var EXITING = 'exiting';
/**
 * The Transition component lets you describe a transition from one component
 * state to another _over time_ with a simple declarative API. Most commonly
 * it's used to animate the mounting and unmounting of a component, but can also
 * be used to describe in-place transition states as well.
 *
 * ---
 *
 * **Note**: `Transition` is a platform-agnostic base component. If you're using
 * transitions in CSS, you'll probably want to use
 * [`CSSTransition`](https://reactcommunity.org/react-transition-group/css-transition)
 * instead. It inherits all the features of `Transition`, but contains
 * additional features necessary to play nice with CSS transitions (hence the
 * name of the component).
 *
 * ---
 *
 * By default the `Transition` component does not alter the behavior of the
 * component it renders, it only tracks "enter" and "exit" states for the
 * components. It's up to you to give meaning and effect to those states. For
 * example we can add styles to a component when it enters or exits:
 *
 * ```jsx
 * import { Transition } from 'react-transition-group';
 *
 * const duration = 300;
 *
 * const defaultStyle = {
 *   transition: `opacity ${duration}ms ease-in-out`,
 *   opacity: 0,
 * }
 *
 * const transitionStyles = {
 *   entering: { opacity: 1 },
 *   entered:  { opacity: 1 },
 *   exiting:  { opacity: 0 },
 *   exited:  { opacity: 0 },
 * };
 *
 * const Fade = ({ in: inProp }) => (
 *   <Transition in={inProp} timeout={duration}>
 *     {state => (
 *       <div style={{
 *         ...defaultStyle,
 *         ...transitionStyles[state]
 *       }}>
 *         I'm a fade Transition!
 *       </div>
 *     )}
 *   </Transition>
 * );
 * ```
 *
 * There are 4 main states a Transition can be in:
 *  - `'entering'`
 *  - `'entered'`
 *  - `'exiting'`
 *  - `'exited'`
 *
 * Transition state is toggled via the `in` prop. When `true` the component
 * begins the "Enter" stage. During this stage, the component will shift from
 * its current transition state, to `'entering'` for the duration of the
 * transition and then to the `'entered'` stage once it's complete. Let's take
 * the following example (we'll use the
 * [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook):
 *
 * ```jsx
 * function App() {
 *   const [inProp, setInProp] = useState(false);
 *   return (
 *     <div>
 *       <Transition in={inProp} timeout={500}>
 *         {state => (
 *           // ...
 *         )}
 *       </Transition>
 *       <button onClick={() => setInProp(true)}>
 *         Click to Enter
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * When the button is clicked the component will shift to the `'entering'` state
 * and stay there for 500ms (the value of `timeout`) before it finally switches
 * to `'entered'`.
 *
 * When `in` is `false` the same thing happens except the state moves from
 * `'exiting'` to `'exited'`.
 */

var Transition = /*#__PURE__*/function (_React$Component) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Transition, _React$Component);

  function Transition(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context; // In the context of a TransitionGroup all enters are really appears

    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;

    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }

    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;

    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }

    return null;
  } // getSnapshotBeforeUpdate(prevProps) {
  //   let nextStatus = null
  //   if (prevProps !== this.props) {
  //     const { status } = this.state
  //     if (this.props.in) {
  //       if (status !== ENTERING && status !== ENTERED) {
  //         nextStatus = ENTERING
  //       }
  //     } else {
  //       if (status === ENTERING || status === ENTERED) {
  //         nextStatus = EXITING
  //       }
  //     }
  //   }
  //   return { nextStatus }
  // }
  ;

  var _proto = Transition.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;

    if (prevProps !== this.props) {
      var status = this.state.status;

      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }

    this.updateStatus(false, nextStatus);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;

    if (timeout != null && typeof timeout !== 'number') {
      exit = timeout.exit;
      enter = timeout.enter; // TODO: remove fallback for next major

      appear = timeout.appear !== undefined ? timeout.appear : enter;
    }

    return {
      exit: exit,
      enter: enter,
      appear: appear
    };
  };

  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }

    if (nextStatus !== null) {
      // nextStatus will always be ENTERING or EXITING.
      this.cancelNextCallback();

      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };

  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;

    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;

    var _ref2 = this.props.nodeRef ? [appearing] : [react_dom__WEBPACK_IMPORTED_MODULE_4__.findDOMNode(this), appearing],
        maybeNode = _ref2[0],
        maybeAppearing = _ref2[1];

    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter; // no enter animation skip right to ENTERED
    // if we are mounting and running this it means appear _must_ be set

    if (!mounting && !enter || _config__WEBPACK_IMPORTED_MODULE_5__["default"].disabled) {
      this.safeSetState({
        status: ENTERED
      }, function () {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }

    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function () {
      _this2.props.onEntering(maybeNode, maybeAppearing);

      _this2.onTransitionEnd(enterTimeout, function () {
        _this2.safeSetState({
          status: ENTERED
        }, function () {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };

  _proto.performExit = function performExit() {
    var _this3 = this;

    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? undefined : react_dom__WEBPACK_IMPORTED_MODULE_4__.findDOMNode(this); // no exit animation skip right to EXITED

    if (!exit || _config__WEBPACK_IMPORTED_MODULE_5__["default"].disabled) {
      this.safeSetState({
        status: EXITED
      }, function () {
        _this3.props.onExited(maybeNode);
      });
      return;
    }

    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function () {
      _this3.props.onExiting(maybeNode);

      _this3.onTransitionEnd(timeouts.exit, function () {
        _this3.safeSetState({
          status: EXITED
        }, function () {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };

  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  _proto.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };

  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : react_dom__WEBPACK_IMPORTED_MODULE_4__.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;

    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }

    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback],
          maybeNode = _ref3[0],
          maybeNextCallback = _ref3[1];

      this.props.addEndListener(maybeNode, maybeNextCallback);
    }

    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };

  _proto.render = function render() {
    var status = this.state.status;

    if (status === UNMOUNTED) {
      return null;
    }

    var _this$props = this.props,
        children = _this$props.children,
        _in = _this$props.in,
        _mountOnEnter = _this$props.mountOnEnter,
        _unmountOnExit = _this$props.unmountOnExit,
        _appear = _this$props.appear,
        _enter = _this$props.enter,
        _exit = _this$props.exit,
        _timeout = _this$props.timeout,
        _addEndListener = _this$props.addEndListener,
        _onEnter = _this$props.onEnter,
        _onEntering = _this$props.onEntering,
        _onEntered = _this$props.onEntered,
        _onExit = _this$props.onExit,
        _onExiting = _this$props.onExiting,
        _onExited = _this$props.onExited,
        _nodeRef = _this$props.nodeRef,
        childProps = (0,_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);

    return (
      /*#__PURE__*/
      // allows for nested Transitions
      react__WEBPACK_IMPORTED_MODULE_3__.createElement(_TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
        value: null
      }, typeof children === 'function' ? children(status, childProps) : react__WEBPACK_IMPORTED_MODULE_3__.cloneElement(react__WEBPACK_IMPORTED_MODULE_3__.Children.only(children), childProps))
    );
  };

  return Transition;
}(react__WEBPACK_IMPORTED_MODULE_3__.Component);

Transition.contextType = _TransitionGroupContext__WEBPACK_IMPORTED_MODULE_6__["default"];
Transition.propTypes =  true ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    current: typeof Element === 'undefined' ? (prop_types__WEBPACK_IMPORTED_MODULE_2___default().any) : function (propValue, key, componentName, location, propFullName, secret) {
      var value = propValue[key];
      return prop_types__WEBPACK_IMPORTED_MODULE_2___default().instanceOf(value && 'ownerDocument' in value ? value.ownerDocument.defaultView.Element : Element)(propValue, key, componentName, location, propFullName, secret);
    }
  }),

  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_2___default().func.isRequired), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().element.isRequired)]).isRequired,

  /**
   * Show the component; triggers the enter or exit states
   */
  in: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * Enable or disable enter transitions.
   */
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * Enable or disable exit transitions.
   */
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool),

  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function timeout(props) {
    var pt = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_7__.timeoutsShape;
    if (!props.addEndListener) pt = pt.isRequired;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return pt.apply(void 0, [props].concat(args));
  },

  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),

  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
} : 0; // Name the function so it is clearer in the documentation

function noop() {}

Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transition);

/***/ }),

/***/ "./node_modules/react-transition-group/esm/TransitionGroupContext.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/TransitionGroupContext.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (react__WEBPACK_IMPORTED_MODULE_0__.createContext(null));

/***/ }),

/***/ "./node_modules/react-transition-group/esm/config.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-transition-group/esm/config.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  disabled: false
});

/***/ }),

/***/ "./node_modules/react-transition-group/esm/utils/PropTypes.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-transition-group/esm/utils/PropTypes.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "timeoutsShape": () => (/* binding */ timeoutsShape),
/* harmony export */   "classNamesShape": () => (/* binding */ classNamesShape)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var timeoutsShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().number), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number),
  appear: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().number)
}).isRequired]) : 0;
var classNamesShape =  true ? prop_types__WEBPACK_IMPORTED_MODULE_0___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_0___default().string), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  active: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
}), prop_types__WEBPACK_IMPORTED_MODULE_0___default().shape({
  enter: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  enterActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exit: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitDone: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string),
  exitActive: (prop_types__WEBPACK_IMPORTED_MODULE_0___default().string)
})]) : 0;

/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function() {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);
    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }
    var argIndex = 0;
    var message = 'Warning: ' +
      format.replace(/%s/g, function() {
        return args[argIndex++];
      });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  }

  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
          '`warning(condition, format, ...args)` requires a warning ' +
          'message argument'
      );
    }
    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;


/***/ })

}]);