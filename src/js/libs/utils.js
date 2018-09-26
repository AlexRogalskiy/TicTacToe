"use strict";

/**
 * Module dependencies
 */
import { isString, isPositive, isArray, isObject, isDate, isNullOrUndefined }  from './helpers';
import { Logger } from './logger';

/**
 * @private
 */
const invLog2 = 1/Math.log(2);
const defaultExcept = [ '127.0.0.1', '0.0.0.0', 'localhost', '::1' ];

/**
 *  returns the failed constraints { errors: [] } or true if valid
 *  constraints are a map of supported constraint names and values
 *  validators return true if valid, false otherwise
 */
export function validate(val: string, constraints: Object) {
	var errors = [];
	var validators = {
		minlength: {
			fn: function (val, cVal) {
				return isString(val) && val.length >= cVal;
			},
			msg: function (val, cVal) {
				return 'minimum ' + cVal + ' characters';
			}
		},
		required: {
			fn: function (val) {
				return isString(val) ? !/^\s*$/.test(val) : !isNullOrUndefined(val);
			},
			msg: function () {
				return 'required field';
			}
		},
		exclusive: {
			fn: function (val, list) {
				if (!isArray(list)) { return false; }
				return list.filter(function (v) { return v === val; }) < 1;
			},
			msg: function (val) {
				return val + ' is already taken';
			}
		}
	};

	if (!constraints || !isObject(constraints)) {
		return true;
	}

	for (let constraint in constraints) {
		let validator, currentConstraint;

		if (constraints.hasOwnProperty(constraint) && validators.hasOwnProperty(constraint.toLowerCase())) {
			validator = validators[constraint.toLowerCase()];
			currentConstraint = constraints[constraint];

			if (!validator.fn(val, currentConstraint)) {
				errors.push({
					constraint: constraint,
					msg: validator.msg(val, currentConstraint)
				});
			};
		}
	}
	return errors.length > 0 ? { errors: errors } : true;
};

/**
 * 	executed autobinding on object properties
 */
export function autobind(methodNames: Array) {
	methodNames = isArray(methodNames) ? methodNames : [];
    return {
        componentWillMount: function() {
            methodNames.forEach((name) => {
                this[name] = this[name].bind(this);
            });
        }
    };
};

/**
 * 	returns new object enriched with mixins
 */
export function mixin(...mixins: Array) {
	var base = function() {};
	Object.assign(base.prototype, ...mixins);
	return base;
};

/**
 * 	returns object with properties filtered by predicate
 */
export function filter(obj: Object, predicate: Function) {
    var result = {}, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
            result[key] = obj[key];
        }
    }
    return result;
};

/**
 * 	returns lexical representation of memory volume
 */
export function lexicalSize(size: Number) {
    if(size < 0) return;
    var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var ord = Math.floor(Math.log(size) / Math.log(1024));
    ord = Math.min( Math.max(0, ord), units.length - 1);
    var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
    return s + ' ' + units[ord];
};

/**
 * 	returns color representation in RGB format
 */
export function colorize(color: string, params: Object = {r: 0.299, g: 0.587, b: 0.114}) {
	color = (color.startsWith('#') ? color.substring(1) : color);
	let c = parseInt(color, 16);
    let r = (c & 0xFF0000) >> 16;
    let g = (c & 0x00FF00) >> 8;
    let b = (c & 0x0000FF);
    return (params.r * r + params.g * g + params.b * b);
};

/**
 * 	returns result of promise by timeout
 */
function wait(timeout: Number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, timeout)
	});
};

/**
 *  returns result of request by retries count
 */
export async function requestWithRetry(url: string, count: Number) {
	const MAX_RETRIES = isPositive(count) ? count : 10;
	for (let i = 0; i <= MAX_RETRIES; i++) {
		try {
			return await request(url)
		} catch (err) {
			const timeout = Math.pow(2, i);
			Logger.debug(`Waiting ${timeout} ms`);
			await wait(timeout);
			Logger.debug(`Retrying with message=$err.message}, count=${i}`);
		}
	}
};

/**
 *  returns result functions executeed asynchronously
 */
export async function executeAsync(fn1: Function, fn2: Function, fn3: Function) {
	try {
		const valueA = await fn1();
		const valueB = await fn2(valueA);
		return fn3(valueA, valueB);
	} catch (err) {
		Logger.error(err);
	}
};

/**
 *  returns merged object
 */
export const mergeRecursive = (obj1: Object, obj2: Object) => {
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
export function forEach(obj: Object, callback: Function) {
	if (obj) {
		for (const key in obj) {
			if ({}.hasOwnProperty.call(obj, key)) {
				callback(key, obj[key]);
			}
		}
	}
};

/**
 * 	returns true - if object contains property, false - otherwise
 */
export function hasProperty(obj: Object, property: string) {
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
};

/**
 * 	returns next element from array
 */
export function step(array: Array) {
    const next = Array.prototype.pop.call(array);
    Array.prototype.unshift.call(array, next);
    return next;
}

/**
 * 	returns element from array by rebased index
 */
export const wrapIndex = (index: Number, array: Array) => array[(array.length + Math.round(index)) % array.length];

/**
 * 	returns next power of two
 */
export const nextPow2 = (x: Number) => Math.pow(2, Math.ceil(Math.log(x)*invLog2));

/**
 * 	changes type of protocol of the current url
 */
export const redirect = (protocol = 'https', except = defaultExcept) => {
    const proto = protocol + ':';
    if(document.location.protocol !== proto && except.indexOf(document.location.hostname) < 0) {
        document.location.protocol = proto;
    }
};
