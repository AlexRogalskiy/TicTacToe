'use strict';

/**
 * Module dependencies
 */
import { isFunction } from './helpers';

const DEFAULT_INDENT_SPACE = 4;

export default class Converter {
  static serialize(obj: object, callback: func): string {
    callback = isFunction(callback) ? callback : '';
    return JSON.stringify(obj, callback, DEFAULT_INDENT_SPACE);
  }

  static unserialize(obj: object, callback: func): object {
    callback = isFunction(callback) ? callback : '';
    return JSON.parse(obj, callback);
  }
};
