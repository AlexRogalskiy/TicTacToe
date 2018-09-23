"use strict";

/**
 * Module dependencies
 */
import dateFormat from 'dateformat';

import { isString, isObject }  from './helpers';
import Serialization from './serialization';

const DEFAULT_DATETIME_FORMAT = "dddd, mmmm dS, yyyy, h:MM:ss TT";

const output = (dateTime, message, ...args) => `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;

function getTime(format) {
	format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
	let currentDate = new Date();
	let currentTime = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));
	return dateFormat(currentTime, format);
};

export function tag(messages, ...args) {
	let result = "";
	for(let i=0; i<args.length; i++) {
		result += messages[i];
		result += isObject(args[i]) ? Serialization.serialize(args[i]) : args[i];
	}
	result += messages[messages.length - 1];
	return result;
};

export function rawTag(messages, ...args) {
	let result = "";
	for(let i=0; i<args.length; i++) {
		result += messages.raw[i];
		result += isObject(args[i]) ? Serialization.serialize(args[i]) : args[i];
	}
	result += messages.raw[messages.length - 1];
	return result;
};

const Logger = {
	debug: function(message, ...args) {
		console.log(output(getTime(), message, args));
	},
	error: function(message, ...args) {
		console.err(output(getTime(), message, args));
	},
	warn: function(message, ...args) {
		console.warn(output(getTime(), message, args));
	},
	info: function(message, ...args) {
		console.info(output(getTime(), message, args));
	},
	group: function(message, ...args) {
		console.group(output(getTime(), message));
		console.log(args);
		console.groupEnd();
	}
};

export default Logger;