"use strict";

var DEFAULT_COLORS_PRESET = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
];

/**
 * returns native string representation of object
 */
function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
};

/**
 * returns true if value is number, false - otherwise
 */
function isNumber(value) {
	return (value !== null && (typeof value === 'number' || toType(value) === 'number') && isFinite(value));
};

/**
 * returns true if value is integer number, false - otherwise
 */
function isIntNumber(value) {
	return (isNumber(value) && ((value % 1) === 0) && Number.isSafeInteger(value));
};

/**
 * returns true if value is positive integer or decimal, false - otherwise
 */
function isPositive(value) {
	return (isNumber(value) && ((!/\D/.test(value)) || (/^\d+\.\d+$/.test(value))));
};

/**
 * returns true if value is alphanumeric ([a-z],[A-Z],[0-9]), false - otherwise
 */
function isAlphaNumeric(value) {
	return ((isNumber(value) || isString(value)) && (!/^\s*$/.test(value) && !/\W/.test(value)));
};

/**
 * returns true if value is real number, false - otherwise
 */
function isRealNumber(value) {
	return (isNumber(value) && ((value % 1) !== 0));
};

/**
 * returns true if value is string, false - otherwise
 */
function isString(value) {
	return (value !== null && (typeof value === 'string' || toType(value) === 'string'));
};

/**
 * returns true if value is array, false - otherwise
 */
function isArray(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object Array]');
};

/**
 * returns true if value is JSON object, false - otherwise
 */
function isJSON(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object JSON]');
};

/**
 * returns true if value is date, false - otherwise
 */
function isDate(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object Date]') && isFinite(value);
};

/**
 * returns true if value is object, false - otherwise
 */
function isObject(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object Object]');
};

/**
 * returns true if value is function, false - otherwise
 */
function isFunction(value) {
	return (value !== null && typeof value === 'function' && value.constructor && value.cal && value.apply);
};

/**
 * returns true if value is boolean, false - otherwise
 */
function isBoolean(value) {
	return (value !== null && (typeof value === 'boolean' || toType(value) === 'boolean'));
};

/**
 * returns true if value is null or undefined, false - otherwise
 */
function isNullOrUndefined(value) {
	return (value === null || typeof value === 'undefined');
};

/**
 * returns true if value is DOM element, false - otherwise
 */
function isDomElement(value) {
	return (value !== null && (value.nodeName || value === document.documentElement || value instanceof Element || value instanceof Node));
};

/**
 * returns true if value is RegExp, false - otherwise
 */
function isRegExp(value) {
	return (value !== null && toType(value) === 'regexp');
};

/**
 * returns true if value is Iterable, false - otherwise
 */
function isIterable(value) {
	return (value !== null && typeof value[Symbol.iterator] === "function");
};

/**
 * Wraps a string around each character/letter
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input as splitted by chars/letters
 */
function wrapChars(str, tmpl) {
	return str.replace(/\w/g, tmpl || "<span>$&</span>");
};

/**
 * Wraps a string around each word
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by words
 */
function wrapWords(str, tmpl) {
	return str.replace(/\w+/g, tmpl || "<span>$&</span>");
};

/**
 * Wraps a string around each line
 *
 * @param {string} str The string to transform
 * @param {string} tmpl Template that gets interpolated
 * @returns {string} The given input splitted by lines
 */
function wrapLines(str, tmpl) {
	return str.replace(/.+$/gm, tmpl || "<span>$&</span>");
};

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
};

/**
 * returns the color of a username
 */
function getUsernameColor(username, colors) {
	colors = isArray(colors) ? colors : DEFAULT_COLORS_PRESET;
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
		hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
};

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
	getUsernameColor
};