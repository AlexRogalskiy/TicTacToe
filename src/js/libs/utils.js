"use strict";

/**
 * Module dependencies
 */
import { isString, isPositive, isArray, isObject, isDate, isNullOrUndefined }  from './helpers';
import { Logger } from './logger';

/**
 * returns message block
 */
export function MessageList(props) {
	const { messages, messageClass, ...rest } = props;
	if (messages && messages.length) {
        let elements = messages.map((item, index) => <li key={index} className={messageClass}>{item}</li>);
		return (
			<ul {...rest}>{elements}</ul>
		);
	}
	return null;
};

/**
 * returns single message block
 */
export function Message(props) {
	const { message, ...rest } = props;
	return (
	    <div {...rest}>
	    	{message}
	    </div>
 	);
};

/**
 *  returns the failed constraints { errors: [] } or true if valid
 *  constraints are a map of supported constraint names and values
 *  validators return true if valid, false otherwise
 */
export function validate(val, constraints) {
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
export function autobind(methodNames) {
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
export function mixin(...mixins) {
	var base = function() {};
	Object.assign(base.prototype, ...mixins);
	return base;
};


function wait (timeout) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, timeout)
	});
};

/**
 *  returns request with retries function
 */
export async function requestWithRetry (url, count) {
	const MAX_RETRIES = isPositive(count) ? count : 10;
	for (let i = 0; i <= MAX_RETRIES; i++) {
		try {
			return await request(url)
		} catch (err) {
			const timeout = Math.pow(2, i);
			Logger.log('Waiting', timeout, 'ms');
			await wait(timeout);
			Logger.log('Retrying', err.message, i);
		}
	}
};

/**
 *  returns execute asynchronously task functions
 */
export async function executeAsyncTask(fn1, fn2, fn3) {
	try {
		const valueA = await fn1();
		const valueB = await fn2(valueA);
		return fn3(valueA, valueB);
	} catch (err) {
		Logger.error(err);
	}
};
