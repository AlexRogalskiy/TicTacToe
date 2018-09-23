"use strict";

function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
};

/**
 * returns true if value is number, false - otherwise
 */
export function isNumber(value) {
	return (value !== null && (typeof value === 'number' || toType(value) === 'number') && isFinite(value));
};

/**
 * returns true if value is integer number, false - otherwise
 */
export function isIntNumber(value) {
	return (isNumber(value) && ((value % 1) === 0) && Number.isSafeInteger(value));
};

/**
 * returns true if value is positive integer or decimal, false - otherwise
 */
export function isPositiveDecimal(value) {
	return (isNumber(value) && ((!/\D/.test(value)) || (/^\d+\.\d+$/.test(value))));
};

/**
 * returns true if value is alphanumeric ([a-z],[A-Z],[0-9]), false - otherwise
 */
export function isAlphaNumeric(value) {
	return ((isNumber(value) || isString(value)) && (!/^\s*$/.test(value) && !/\W/.test(value)));
};

/**
 * returns true if value is real number, false - otherwise
 */
export function isRealNumber(value) {
	return (isNumber(value) && ((value % 1) !== 0));
};

/**
 * returns true if value is string, false - otherwise
 */
export function isString(value) {
	return (value !== null && (typeof value === 'string' || toType(value) === 'string'));
};

/**
 * returns true if value is array, false - otherwise
 */
export function isArray(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object Array]');
};

/**
 * returns true if value is JSON object, false - otherwise
 */
export function isJSON(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object JSON]');
};

/**
 * returns true if value is object, false - otherwise
 */
export function isObject(value) {
	return (value !== null && Object.prototype.toString.apply(value) === '[object Object]');
};

/**
 * returns true if value is function, false - otherwise
 */
export function isFunction(value) {
	return (value !== null && typeof value === 'function' && value.constructor && value.cal && value.apply);
};

/**
 * returns true if value is boolean, false - otherwise
 */
export function isBoolean(value) {
	return (value !== null && (typeof value === 'boolean' || toType(value) === 'boolean'));
};

/**
 * returns true if value is null or undefined, false - otherwise
 */
export function isNullOrUndefined(value) {
	return (value === null || typeof value === 'undefined');
};

/**
 * returns true if value is DOM element, false - otherwise
 */
export function isDomElement(value) {
	return (value !== null && (value.nodeName || value === document.documentElement || value instanceof Element || value instanceof Node));
};

/**
 * returns true if value is RegExp, false - otherwise
 */
export function isRegExp(value) {
	return (value !== null && toType(value) === 'regexp');
};

/**
 * returns true if value is Iterable, false - otherwise
 */
export function isIterable(value) {
	return (value !== null && typeof value[Symbol.iterator] === "function");
};