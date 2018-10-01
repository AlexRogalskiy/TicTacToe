'use strict';

/**
 * @private
 */
const invLog2 = 1 / Math.log(2);
const defaultProtocolsExcept = ['127.0.0.1', '0.0.0.0', 'localhost', '::1'];

/**
 * returns native string representation of object
 */
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
}

/**
 * returns true if value is number, false - otherwise
 */
function isNumber(value) {
  return (
    value !== null &&
    (typeof value === 'number' || toType(value) === 'number') &&
    isFinite(value)
  );
}

/**
 * returns true if value is integer number, false - otherwise
 */
function isIntNumber(value) {
  return isNumber(value) && value % 1 === 0 && Number.isSafeInteger(value);
}

/**
 * returns true if value is positive integer or decimal, false - otherwise
 */
function isPositive(value) {
  return isNumber(value) && (!/\D/.test(value) || /^\d+\.\d+$/.test(value));
}

/**
 * returns true if value is alphanumeric ([a-z],[A-Z],[0-9]), false - otherwise
 */
function isAlphaNumeric(value) {
  return (
    (isNumber(value) || isString(value)) &&
    (!/^\s*$/.test(value) && !/\W/.test(value))
  );
}

/**
 * returns true if value is real number, false - otherwise
 */
function isRealNumber(value) {
  return isNumber(value) && value % 1 !== 0;
}

/**
 * returns true if value is string, false - otherwise
 */
function isString(value) {
  return (
    value !== null && (typeof value === 'string' || toType(value) === 'string')
  );
}

/**
 * returns true if value is array, false - otherwise
 */
function isArray(value) {
  return (
    value !== null &&
    Object.prototype.toString.apply(value) === '[object Array]'
  );
}

/**
 * returns true if value is JSON object, false - otherwise
 */
function isJSON(value) {
  return (
    value !== null && Object.prototype.toString.apply(value) === '[object JSON]'
  );
}

/**
 * returns true if value is date, false - otherwise
 */
function isDate(value) {
  return (
    value !== null &&
    Object.prototype.toString.apply(value) === '[object Date]' &&
    isFinite(value)
  );
}

/**
 * returns true if value is object, false - otherwise
 */
function isObject(value) {
  return (
    value !== null &&
    Object.prototype.toString.apply(value) === '[object Object]'
  );
}

/**
 * returns true if value is function, false - otherwise
 */
function isFunction(value) {
  return (
    value !== null &&
    typeof value === 'function' &&
    value.constructor &&
    value.cal &&
    value.apply
  );
}

/**
 * returns true if value is boolean, false - otherwise
 */
function isBoolean(value) {
  return (
    value !== null &&
    (typeof value === 'boolean' || toType(value) === 'boolean')
  );
}

/**
 * returns true if value is null or undefined, false - otherwise
 */
function isNullOrUndefined(value) {
  return value === null || typeof value === 'undefined';
}

/**
 * returns true if value is DOM element, false - otherwise
 */
function isDomElement(value) {
  return (
    value !== null &&
    (value.nodeName ||
      value === document.documentElement ||
      value instanceof Element ||
      value instanceof Node)
  );
}

/**
 * returns true if value is RegExp, false - otherwise
 */
function isRegExp(value) {
  return value !== null && toType(value) === 'regexp';
}

/**
 * returns true if value is Iterable, false - otherwise
 */
function isIterable(value) {
  return value !== null && typeof value[Symbol.iterator] === 'function';
}

/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
function wrapChars(str, tmpl) {
  return str.replace(/\w/g, tmpl || '<span>$&</span>');
}

/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || '<span>$&</span>');
}

/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
function wrapLines(str, tmpl) {
  return str.replace(/.+$/gm, tmpl || '<span>$&</span>');
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

function randomBinary() {
  return Math.round(Math.random());
}

function guidGenerator() {
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
}

function revisedRandId() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);
}

/**
 * 	returns element from array by rebased index
 */
function wrapIndex(index, array) {
  return array[(array.length + Math.round(index)) % array.length];
}

/**
 * 	returns next power of two
 */
function nextPow2(x) {
  return Math.pow(2, Math.ceil(Math.log(x) * invLog2));
}

/**
 * 	changes type of protocol of the current url
 */
function redirect(protocol = 'https', except = defaultProtocolsExcept) {
  const proto = protocol + ':';
  if (
    document.location.protocol !== proto &&
    except.indexOf(document.location.hostname) < 0
  ) {
    document.location.protocol = proto;
  }
}

/**
 *  returns merged object
 */
function mergeRecursive(obj1, obj2) {
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
}

/**
 * 	executes callback for eack key - >value pair
 */
function forEach(obj, callback) {
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        callback(key, obj[key]);
      }
    }
  }
}

/**
 * 	returns true - if object contains property, false - otherwise
 */
function hasProperty(obj, property) {
  let result = false;
  if (obj) {
    for (const key in obj) {
      if ({}.hasOwnProperty.call(obj, key) && property === key) {
        result = true;
        break;
      }
    }
  }
  return result;
}

/**
 * 	returns next element from array
 */
function stepArray(array) {
  const next = Array.prototype.pop.call(array);
  Array.prototype.unshift.call(array, next);
  return next;
}

/**
 * 	returns current date
 */
function currentDate() {
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
}

/**
 * 	returns current time
 */
function currentTime() {
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
}

module.exports = {
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
  currentDate,
  currentTime,
};
