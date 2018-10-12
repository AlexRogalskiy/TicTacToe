'use strict';

/**
 * Module dependencies
 */
import dateFormat from 'dateformat';

import { isString, isObject } from './helpers';
import Converter from './converter';
import dateLocale from '../resources/i18n/datetime/datetime_EN';

dateFormat.i18n = dateLocale;

const DEFAULT_DATETIME_FORMAT = 'dddd, mmmm dS, yyyy, hh:MM:ss TT';
const DEFAULT_COLORS_PRESET = {
  white: '#ffffff',
  pink: '#ff00ff',
  yellow: '#ffff00',
  green: '#00ff00',
  blue: '#0000ff',
  black: '#000000',
  red: '#f00000',
};

const output = (dateTime, message, ...args) =>
  `Logger => time: ${dateTime}, message: ${message}, args: ${args}`;

const getOutputStyle = type =>
  'color: ' +
  (DEFAULT_COLORS_PRESET[type]
    ? DEFAULT_COLORS_PRESET[type]
    : DEFAULT_COLORS_PRESET['black']);

const getTime = (format, utc = false) => {
  format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
  return dateFormat(Date.now(), format, utc);
};

const getLocalTime = (format, offset = 0, utc = false) => {
  format = isString(format) ? format : DEFAULT_DATETIME_FORMAT;
  let currentDate = new Date();
  let currentTime =
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
  let localCurrentTime = new Date(currentTime + offset * 3600000);
  return dateFormat(localCurrentTime, format, utc);
};

export const tag = (messages, ...args) => {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    result += messages[i];
    result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
  }
  result += messages[messages.length - 1];
  return result;
};

export const rawTag = (messages, ...args) => {
  let result = '';
  for (let i = 0; i < args.length; i++) {
    result += messages.raw[i];
    result += isObject(args[i]) ? Converter.serialize(args[i]) : args[i];
  }
  result += messages.raw[messages.length - 1];
  return result;
};

export default class Logger {
  get displayName() {
    return 'Logger';
  }
  
  static debug(message, ...args) {
    console.log(
      '%c' + output(getTime(), message, args),
      getOutputStyle('green')
    );
  }

  static error(message, ...args) {
    console.error(
      '%c' + output(getTime(), message, args),
      getOutputStyle('red')
    );
  }

  static warn(message, ...args) {
    console.warn(
      '%c' + output(getTime(), message, args),
      getOutputStyle('blue')
    );
  }

  static info(message, ...args) {
    console.info(
      '%c' + output(getTime(), message, args),
      getOutputStyle('pink')
    );
  }

  static group(message, ...args) {
    console.group(output(getTime(), message));
    console.log(args);
    console.groupEnd();
  }
};
