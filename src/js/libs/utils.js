"use strict";

/**
 * returns text block with messages
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
 * returns text block with message
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
				return typeof val === 'string' && val.length >= cVal;
			},
			msg: function (val, cVal) {
				return 'minimum ' + cVal + ' characters';
			}
		},
		required: {
			fn: function (val) {
				return typeof val === 'string' ? 
					!/^\s*$/.test(val) : val !== undefined && val !== null;
			},
			msg: function () {
				return 'required field';
			}
		},
		exclusive: {
			fn: function (val, list) {
				if (!(list instanceof Array)) { return false; }
				return list.filter(function (v) { return v === val; }) < 1;
			},
			msg: function (val) {
				return val + ' is already taken';
			}
		}
	};

	if (!constraints || typeof constraints !== 'object') {
		return true;
	}

	for (let constraint in constraints) {
		let validator, currentConstraint;

		if (
			constraints.hasOwnProperty(constraint) && 
			validators.hasOwnProperty(constraint.toLowerCase())
		) {
			validator         = validators[constraint.toLowerCase()];
			currentConstraint = constraints[constraint];

			if (!validator.fn(val, currentConstraint)) {
				errors.push({
					constraint: constraint,
					msg: validator.msg(val, currentConstraint)
				});
			};
		}
	}
	return errors.length > 0 ? {errors: errors} : true;
};