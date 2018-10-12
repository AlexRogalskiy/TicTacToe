'use strict';

/**
 * Module dependencies
 */
import { isFunction } from './helpers';

const DEFAULT_INDENT_SPACE = 4;

export default class Converter {
  static serialize(obj, callback) {
    callback = isFunction(callback) ? callback : '';
    return JSON.stringify(obj, callback, DEFAULT_INDENT_SPACE);
  }

  static unserialize(obj, callback) {
    callback = isFunction(callback) ? callback : '';
    return JSON.parse(obj, callback);
  }
};
