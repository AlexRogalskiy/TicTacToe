"use strict";

/**
 * Module dependencies
 */
const dateFormat = require('dateformat');
const { isString, isObject } = require('./helpers');
const Converter = require('./converter');

const DEFAULT_DATETIME_FORMAT = 'dddd, mmmm dS, yyyy, h:MM:ss TT';

const output = (dateTime, message, ...args) => `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;

const COLORS = {
	white: '#ffffff',
	pink: '#ff00ff',
	yellow: '#ffff00',
	green: '#00ff00',
	blue: '#0000ff',
	black: '#000000',
	red: '#f00000',
};

function getOutputStyle(type) {
	return 'color: ' + (COLORS[type] ? COLORS[type] : COLORS['black']);
};

function getTime(format) {
	format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
	let currentDate = new Date();
	let currentTime = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));
	return require('dateformat')(currentTime, format);
};

function tag(messages, ...args) {
	let result = '';
	for(let i=0; i<args.length; i++) {
		result += messages[i];
		result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
	}
	result += messages[messages.length - 1];
	return result;
};

function rawTag(messages, ...args) {
	let result = '';
	for(let i=0; i<args.length; i++) {
		result += messages.raw[i];
		result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
	}
	result += messages.raw[messages.length - 1];
	return result;
};

const Logger = {
	debug: function(message, ...args) {
		console.log('%c' + output(getTime(), message, args), getOutputStyle('green'));
	},
	
	error: function(message, ...args) {
		console.error('%c' + output(getTime(), message, args), getOutputStyle('red'));
	},
	
	warn: function(message, ...args) {
		console.warn('%c' + output(getTime(), message, args), getOutputStyle('blue'));
	},
	
	info: function(message, ...args) {
		console.info('%c' + output(getTime(), message, args), getOutputStyle('pink'));
	},
	
	group: function(message, ...args) {
		console.group(output(getTime(), message));
		console.log(args);
		console.groupEnd();
	}
};

module.exports = {
	tag,
	rawTag,
	Logger
};