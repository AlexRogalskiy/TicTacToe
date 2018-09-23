"use strict";

/**
 * Module dependencies
 */
import { isFunction }  from './helpers';

const DEFAULT_SPACE = 4;

const Serialization = {
	serialize: function(obj, callback) {
		callback = isFunction(callback) ? callback : '';
		return JSON.stringify(obj, callback, DEFAULT_SPACE);
	},
	unserialize: function(obj, callback) {
		callback = isFunction(callback) ? callback : '';
		return JSON.parse(obj, callback);
	}
};

export default Serialization;