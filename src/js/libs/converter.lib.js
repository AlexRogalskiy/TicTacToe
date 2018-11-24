'use strict';

/**
 * Module dependencies
 */
import { isFunction } from './helpers.lib';
import Logger from './logger.lib';

const DEFAULT_INDENT_SPACE = 4;

export default class Converter {
  displayName: string = 'Converter';
  
  static serialize(obj: Object<any>, callback: func): string {
    callback = isFunction(callback) ? callback : '';
    return JSON.stringify(obj, callback, DEFAULT_INDENT_SPACE);
  }

  static unserialize(obj: Object<any>, callback: func): Object<any> {
    callback = isFunction(callback) ? callback : '';
    return JSON.parse(obj, callback);
  }
};
