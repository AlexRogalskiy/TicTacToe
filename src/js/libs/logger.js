"use strict";

/**
 * Module dependencies
 */
import { dateFormat } from 'dateformat';

const output = (dateTime, message, ...args) => `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;
const DEFAULT_DATETIME_FORMAT = "dddd, mmmm dS, yyyy, h:MM:ss TT";

const Logger = {
	state: {
    	isMounted: false
	},
	debug: function(message, ...args) {
		console.log(output(this.time(), message, args));
	},
	error: function(message, ...args) {
		console.err(output(this.time(), message, args));
	},
	warn: function(message, ...args) {
		console.warn(output(this.time(), message, args));
	},
	info: function(message, ...args) {
		console.info(output(this.time(), message, args));
	},
	group: function(message, ...args) {
		console.group(output(this.time(), message));
		console.log(args);
		console.groupEnd();
	},
	time: function() {
		let currentDate = new Date();
		let currentTime = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));
		return dateFormat(currentTime, DEFAULT_DATETIME_FORMAT);
	}
};

export default Logger;