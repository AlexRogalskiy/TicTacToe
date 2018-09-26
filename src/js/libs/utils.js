"use strict";

/**
 * Module dependencies
 */
import { isString, isPositive, isArray, isObject, isDate, isNullOrUndefined }  from './helpers';
import { Logger } from './logger';

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
 * returns autobind function
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
 * returns mixin function
 */
export function mixin(...mixins: Array) {
	var base = function() {};
	Object.assign(base.prototype, ...mixins);
	return base;
};

/**
 * returns object filtered by predicate
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
 * returns lexical representation of memory volume
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
 * returns color representation in RGB format
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
 * returns promise result by timeout
 */
function wait(timeout: Number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, timeout)
	});
};

/**
 *  returns request with retries function
 */
export async function requestWithRetry (url: string, count: Number) {
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
 *  returns result of task functions executeed asynchronously
 */
export async function executeAsyncTask(fn1: Function, fn2: Function, fn3: Function) {
	try {
		const valueA = await fn1();
		const valueB = await fn2(valueA);
		return fn3(valueA, valueB);
	} catch (err) {
		Logger.error(err);
	}
};

/**
 *  returns result of objects recursive merging
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
* returns function to execute callback for eack key - >value pair
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
* returns true - if object contains property, false - otherwise
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

