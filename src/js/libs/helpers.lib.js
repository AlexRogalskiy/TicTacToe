'use strict';

/**
 * @private
 */
const invLog2 = 1 / Math.log(2);
const DEFAULT_PROTOCOL_EXCEPTION_LIST = ['127.0.0.1', '0.0.0.0', 'localhost', '::1'];


const addCounter = (array: Array<any>): Array<any> => {
	return [...array, 0];
};

/**
 * removes the value from the array by index
 */
const removeValue = (array: Array<any>, index: number): Array<any> => {
	return [
		...array.slice(0, index),
		...array.slice(index + 1)
	];
};

const incrementCounter = (array: Array<any>, index: number): Array<any> => {
	return [
		...array.slice(0, index),
		array[index] + 1,
		...array.slice(index + 1)
	];
};

const isEquivalent = (a: any, b: any): boolean => {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
	
    if (aProps.length != bProps.length) {
        return false;
    }
	
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

/**
 * returns true if value is not null or undefined, false - otherwise
 */
//<If condition={ view } then={ editComponent } else={ saveComponent } />
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;
  
  return condition ? positive : negative;
};

//const isViewConditionFn = (props) => props.mode === 'view';
//const withEditContionalRendering = withEither(isViewConditionFn, EditComponent);
//const EditSaveWithConditionalRendering = withEditContionalRendering(SaveComponent);
const withEither = (conditionalRenderingFn, EitherComponent) => (Component) => (props) =>
  conditionalRenderingFn(props)
    ? <EitherComponent { ...props } />
: <Component { ...props } />;

/**
 * returns true if value is null or undefined, false - otherwise
 */
const isNullOrUndefined = (value: Object<any>): boolean => {
  return (value === null || typeof value === 'undefined');
};

/**
 * returns native string representation of object
 */
const toType = (value: Object<any>): boolean => {
  return {}.toString
    .call(value)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
};

/**
 * returns true if value is number, false - otherwise
 */
const isNumber = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    (typeof value === 'number' || toType(value) === 'number') &&
    isFinite(value)
  );
};

/**
 * returns true if value is integer number, false - otherwise
 */
const isIntNumber = (value: Object<any>): boolean => {
  return isNumber(value) && value % 1 === 0 && Number.isSafeInteger(value);
};

/**
 * returns true if value is positive integer or decimal, false - otherwise
 */
const isPositive = (value: Object<any>): boolean => {
  return isNumber(value) && (!/\D/.test(value) || /^\d+\.\d+$/.test(value));
};

/**
 * returns true if value is alphanumeric ([a-z],[A-Z],[0-9]), false - otherwise
 */
const isAlphaNumeric = (value: Object<any>): boolean => {
  return (
    (isNumber(value) || isString(value)) &&
    (!/^\s*$/.test(value) && !/\W/.test(value))
  );
};

/**
 * returns true if value is real number, false - otherwise
 */
const isRealNumber = (value: Object<any>): boolean => {
  return isNumber(value) && value % 1 !== 0;
};

/**
 * returns true if value is string, false - otherwise
 */
const isString = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) && (typeof value === 'string' || toType(value) === 'string')
  );
};

/**
 * returns true if value is array, false - otherwise
 */
const isArray = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    Object.prototype.toString.apply(value) === '[object Array]'
  );
};

/**
 * returns true if value is JSON object, false - otherwise
 */
const isJSON = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) && Object.prototype.toString.apply(value) === '[object JSON]'
  );
};

/**
 * returns true if value is date, false - otherwise
 */
const isDate = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    Object.prototype.toString.apply(value) === '[object Date]' &&
    isFinite(value)
  );
};

/**
 * returns true if value is object, false - otherwise
 */
const isObject = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    Object.prototype.toString.apply(value) === '[object Object]'
  );
};

/**
 * returns true if value is function, false - otherwise
 */
const isFunction = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    typeof value === 'function' &&
    value.constructor &&
    value.cal &&
    value.apply
  );
};

/**
 * returns true if value is boolean, false - otherwise
 */
const isBoolean = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    (typeof value === 'boolean' || toType(value) === 'boolean')
  );
};

/**
 * returns true if value is DOM element, false - otherwise
 */
const isDomElement = (value: Object<any>): boolean => {
  return (
    !isNullOrUndefined(value) &&
    (value.nodeName ||
      value === document.documentElement ||
      value instanceof Element ||
      value instanceof Node)
  );
};

/**
 * returns true if value is RegExp, false - otherwise
 */
const isRegExp = (value: Object<any>): boolean => {
  return (!isNullOrUndefined(value) && toType(value) === 'regexp');
};

/**
 * returns true if value is Iterable, false - otherwise
 */
const isIterable = (value: Object<any>): boolean => {
  return (!isNullOrUndefined(value) && isFunction(value[Symbol.iterator]));
};

/**
 * returns value1 if not null or undefined, value2 - otherwise
 */
const fallback = (value1: Object<any>, value2: Object<any>): Object<any> => {
	if (isNullOrUndefined(value1)) {
		return value1;
	}
	return value2;
};

const polyfill = (style: Object<any>): Object<any> => {
	let computed = {};
	for (var key in style) {
		var value = style[key];
		switch (key) {
			case 'paddingVertical':
				computed.paddingTop = fallback(style.paddingTop, value);
				computed.paddingBottom = fallback(style.paddingBottom, value);
				break;
			case 'paddingHorizontal':
				computed.paddingLeft = fallback(style.paddingLeft, value);
				computed.paddingRight = fallback(style.paddingRight, value);
				break;
			case 'marginVertical':
				computed.marginTop = fallback(style.marginTop, value);
				computed.marginBottom = fallback(style.marginBottom, value);
				break;
			case 'marginHorizontal':
				computed.marginLeft = fallback(style.marginLeft, value);
				computed.marginRight = fallback(style.marginRight, value);
				break;
			default:
				computed[key] = value;
				break;
		}
	}
	return computed;
};

/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
const wrapChars = (str: string, tmpl: string): string => {
  return str.replace(/\w/g, tmpl || '<span>$&</span>');
};

/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
const wrapWords = (str: string, tmpl: string): string => {
  return str.replace(/\w+/g, tmpl || '<span>$&</span>');
};

/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
const wrapLines = (str: string, tmpl: string): string => {
  return str.replace(/.+$/gm, tmpl || '<span>$&</span>');
};

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (value: string): any => {
  let port = parseInt(value, 10);
  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const randomBinary = (): number => {
  return Math.round(Math.random());
};

const guidGenerator = (): string => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

const revisedRandId = (): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
};

/**
 * 	returns element from array by rebased index
 */
const wrapIndex = (index: number, arr: Array<any>): any => {
  return arr[(arr.length + Math.round(index)) % arr.length];
};

/**
 * 	returns next power of two
 */
const nextPow2 = (value: number): number => {
  return Math.pow(2, Math.ceil(Math.log(value) * invLog2));
};

/**
 * 	changes type of protocol of the current url
 */
const redirect = (protocol: string = 'https', except: Array<string> = DEFAULT_PROTOCOL_EXCEPTION_LIST) => {
  const proto = protocol + ':';
  if (
    document.location.protocol !== proto &&
    except.indexOf(document.location.hostname) < 0
  ) {
    document.location.protocol = proto;
  }
};

/**
 *  returns merged object
 */
function mergeRecursive(obj1: Object<any>, obj2: Object<any>): Object<any> {
  if (obj1 && isNullOrUndefined(obj2)) {
    return obj1;
  }
  const mergedValue = {};
  forEach(obj1, (key, value) => {
    if (isMap(value)) {
      mergedValue[key] = mergeRecursive(value, obj2[key]);
    } else {
      mergedValue[key] = !isNullOrUndefined(obj2[key]) ? obj2[key] : value;
    }
  });
  return mergedValue;
};

/**
 * 	executes callback for eack key - >value pair
 */
const forEach = (obj: Object<any>, callback: func): void => {
    for (const key in fallback(obj, {})) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
  }
};

/**
 * 	returns true - if object contains property, false - otherwise
 */
const hasProperty = (obj: Object<any>, property: string): boolean => {
  let result = false;
    for (const key in fallback(obj, {})) {
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
  }
  return result;
};

/**
 * 	returns next element from array
 */
const stepArray = (arr: Array<any>): any => {
  const next = Array.prototype.pop.call(arr);
  Array.prototype.unshift.call(arr, next);
  return next;
};

/**
 * 	returns current date
 */
const currentDate = (): string => {
  const now = new Date();
  return (
    (now.getDate() < 10 ? '0' : '') +
    now.getDate() +
    '/' +
    (now.getMonth() + 1 < 10 ? '0' : '') +
    (now.getMonth() + 1) +
    '/' +
    now.getFullYear()
  );
};

/**
 * 	returns current time
 */
const currentTime = (): string => {
  const now = new Date();
  return (
    (now.getHours() < 10 ? '0' : '') +
    now.getHours() +
    ':' +
    (now.getMinutes() < 10 ? '0' : '') +
    now.getMinutes() +
    ':' +
    (now.getSeconds() < 10 ? '0' : '') +
    now.getSeconds()
  );
};

/**
 *  // `function() {}` has prototype, but `() => {}` doesn't
 *  // `() => {}` via Babel has prototype too.
 */
const isStateless = (component: Object<any>): boolean => {
    return !(component.prototype && component.prototype.render);
};

const reportError = () => {
	return Promise.resolve({ success: true });
};

/**
 *  return true if touch event enabled, false - otherwise
 */
const isTouchDevice = (): boolean => {
	return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

const generator = (length: number): string => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
    return text;
};

const DateTime = {
	currentDate,
	currentTime
};

export {
	isNumber,
	isIntNumber,
	isPositive,
	isAlphaNumeric,
	isRealNumber,
	isString,
	isArray,
	isJSON,
	isDate,
	isObject,
	isFunction,
	isBoolean,
	isNullOrUndefined,
	isDomElement,
	isRegExp,
	isIterable,
	fallback,
	polyfill,
	wrapChars,
	wrapWords,
	wrapLines,
	normalizePort,
	randomBinary,
	guidGenerator,
	revisedRandId,
	wrapIndex,
	nextPow2,
	redirect,
	mergeRecursive,
	forEach,
	hasProperty,
	stepArray,
	isStateless,
	isTouchDevice,
	generator,
	DateTime
};