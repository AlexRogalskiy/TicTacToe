'use strict';

/**
 * Module dependencies
 */
import dateFormat from 'dateformat';

import { isString, isObject } from './helpers.lib';
import Converter from './converter.lib';
import dateLocale from '../resources/i18n/datetime/datetime_EN';

dateFormat.i18n = dateLocale;

const DEFAULT_DATETIME_FORMAT = 'dddd, mmmm dS, yyyy, hh:MM:ss TT';
const DEFAULT_COLORS_PRESET = {
  white: 	'#ffffff',
  pink: 	'#ff00ff',
  yellow: 	'#ffff00',
  green: 	'#00ff00',
  blue: 	'#0000ff',
  black: 	'#000000',
  red: 		'#f00000'
};

const output = (dateTime: string, message: string, ...args: Array<any>): string =>
  `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;

const getOutputStyle = (type: string): string =>
  'color: ' +
  (DEFAULT_COLORS_PRESET[type]
    ? DEFAULT_COLORS_PRESET[type]
    : DEFAULT_COLORS_PRESET['black']);

const getTime = (format: string, utc: boolean = false): string => {
  format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
  return dateFormat(Date.now(), format, utc);
};

const getLocalTime = (format: string, offset: number = 0, utc: boolean = false): string => {
  format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
  let currentDate = new Date();
  let currentTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  let localCurrentTime = new Date(currentTime + offset * 3600000);
  return dateFormat(localCurrentTime, format, utc);
};

export const tag = (messages: Array<any>, ...args: Array<any>): string => {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    result += messages[i];
    result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
  }
  result += messages[messages.length - 1];
  return result;
};

export const rawTag = (messages: Array<any>, ...args: Array<any>): string => {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    result += messages.raw[i];
    result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
  }
  result += messages.raw[messages.length - 1];
  return result;
};

export default class Logger {
  displayName: string = 'Logger';
  
  static debug(message: string, ...args: Array<any>): void {
    console.log(
      '%c' + output(getTime(), message, args),
      getOutputStyle('green')
    );
  }

  static error(message: string, ...args: Array<any>): void {
    console.error(
      '%c' + output(getTime(), message, args),
      getOutputStyle('red')
    );
  }

  static warn(message: string, ...args: Array<any>): void {
    console.warn(
      '%c' + output(getTime(), message, args),
      getOutputStyle('blue')
    );
  }

  static info(message: string, ...args: Array<any>): void {
    console.info(
      '%c' + output(getTime(), message, args),
      getOutputStyle('pink')
    );
  }

  static group(message: string, ...args: Array<any>): void {
    console.group(output(getTime(), message));
    console.log(args);
    console.groupEnd();
  }
  
  static dir(message: string, ...args: Array<any>): void {
    console.group(output(getTime(), message));
    console.dir(args);
    console.groupEnd();
  }
};
