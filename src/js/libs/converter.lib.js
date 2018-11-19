'use strict';

/**
 * Module dependencies
 */
import { isFunction } from 'app-root/libs/helpers.lib';
import Logger from 'app-root/libs/logger.lib';

const DEFAULT_INDENT_SPACE = 4;

export default class Converter {
  displayName: string = 'Converter';
  
  static serialize(obj: object, callback: func): string {
    callback = isFunction(callback) ? callback : '';
    return JSON.stringify(obj, callback, DEFAULT_INDENT_SPACE);
  }

  static unserialize(obj: object, callback: func): object {
    callback = isFunction(callback) ? callback : '';
    return JSON.parse(obj, callback);
  }
};
