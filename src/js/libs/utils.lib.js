'use strict';

/**
 * Module dependencies
 */
import md5 from 'crypto-js/md5';
 
import { isNullOrUndefined, isString, isArray, isObject, isPositive } from './helpers.lib';
import Logger from './logger.lib';

/**
 * @private
 */
const DEFAULT_COLORS_PRESET = [
  '#e21400',
  '#91580f',
  '#f8a700',
  '#f78b00',
  '#58dc00',
  '#287b00',
  '#a8f07a',
  '#4ae8c4',
  '#3b88eb',
  '#3824aa',
  '#a700ff',
  '#d300e7'
];

/**
 *  returns the failed constraints { errors: [] } or true if valid
 *  constraints are a map of supported constraint names and values
 *  validators return true if valid, false otherwise
 */
const validate = (val: string, constraints: Object<any>): string => {
  var errors = [];
  var validators = {
    minlength: {
      fn: function(val, cVal) {
        return isString(val) && val.length >= cVal;
      },
      msg: function(val, cVal) {
        return 'minimum ' + cVal + ' characters';
      },
    },
    required: {
      fn: function(val) {
        return isString(val) ? !/^\s*$/.test(val) : !isNullOrUndefined(val);
      },
      msg: function() {
        return 'required field';
      },
    },
    exclusive: {
      fn: function(val, list) {
        if (!isArray(list)) {
          return false;
        }
        return (
          list.filter(function(v) {
            return v === val;
          }) < 1
        );
      },
      msg: function(val) {
        return val + ' is already taken';
      },
    },
  };

  if (!constraints || !isObject(constraints)) {
    return true;
  }

  for (let constraint in constraints) {
    let validator, currentConstraint;

    if (
      constraints.hasOwnProperty(constraint) &&
      validators.hasOwnProperty(constraint.toLowerCase())
    ) {
      validator = validators[constraint.toLowerCase()];
      currentConstraint = constraints[constraint];

      if (!validator.fn(val, currentConstraint)) {
        errors.push({
          constraint: constraint,
          msg: validator.msg(val, currentConstraint),
        });
      }
    }
  }
  return errors.length > 0 ? { errors: errors } : true;
};

/**
 * 	executed autobinding on object properties
 */
const autobind = (methodNames: Array<any>): Object<any> => {
  methodNames = isArray(methodNames) ? methodNames : [];
  return {
    componentWillMount: () => {
      methodNames.forEach(name => {
        this[name] = this[name].bind(this);
      });
    },
  };
};

/**
 * 	returns new object enriched with mixins
 */
const mixin = (...mixins: Array<any>): Object<any> => {
  var base = function() {};
  Object.assign(base.prototype, ...mixins);
  return base;
};

/**
 * 	returns object with properties filtered by predicate
 */
const filter = (obj: Object<any>, predicate: func): Object<any> => {
  var result = {},
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * 	returns the color by username
 */
const getColorByUsername = (username: string, colors: Array<any>): any => {
  colors = isArray(colors) ? colors : DEFAULT_COLORS_PRESET;
  var hash = 7;
  for (var i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + (hash << 5) - hash;
  }
  var index = Math.abs(hash % colors.length);
  return colors[index];
};

/**
 * 	returns lexical description of date/time
 */
const toLexicalDate = (date: date): string => {
  date = isNullOrUndefined(date) ? Date.now() : date;
  var diff = (new Date().getTime() - date.getTime()) / 1000;
  var day_diff = Math.floor(diff / 86400);
  return (
    (day_diff == 0 && diff < 60 && 'just now') ||
    (diff < 120 && '1 minute ago') ||
    (diff < 3600 && Math.floor(diff / 60) + ' minutes ago') ||
    (diff < 7200 && '1 hour ago') ||
    (diff < 86400 && Math.floor(diff / 3600) + ' hours ago') ||
    (day_diff == 1 && 'Yesterday') ||
    (day_diff < 7 && day_diff + ' days ago') ||
    Math.ceil(day_diff / 7) + ' weeks ago'
  );
};

/**
 * 	returns lexical representation of memory volume
 */
const lexicalSize = (size: number): string => {
  if (size < 0) return;
  var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var ord = Math.floor(Math.log(size) / Math.log(1024));
  ord = Math.min(Math.max(0, ord), units.length - 1);
  var s = Math.round((size / Math.pow(1024, ord)) * 100) / 100;
  return s + ' ' + units[ord];
};

/**
 * 	returns color representation in RGB format
 */
const colorize = (
  color: string,
  params: Object<any> = { r: 0.299, g: 0.587, b: 0.114 }
): number => {
  color = color.startsWith('#') ? color.substring(1) : color;
  let c = parseInt(color, 16);
  let r = (c & 0xff0000) >> 16;
  let g = (c & 0x00ff00) >> 8;
  let b = c & 0x0000ff;
  return params.r * r + params.g * g + params.b * b;
};

/**
 * 	returns result of promise by timeout
 */
const wait = (timeout: number): Promise => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

/**
 *  returns result of request by retries count
 */
const async requestWithRetry = (url: string, count: number, request: func = Function.prototype): any => {
  const MAX_RETRIES = isPositive(count) ? count : 10;
  for (let i = 0; i <= MAX_RETRIES; i++) {
    try {
      return await request(url);
    } catch (err) {
      const timeout = Math.pow(2, i);
      Logger.debug(`Waiting ${timeout} ms`);
      await wait(timeout);
      Logger.debug(`Retrying with message=$err.message}, count=${i}`);
    }
  }
};

/*let service2 = {
	getProductById: getRequester("getProduct"),
	postCategory: postRequester("getCategory")
};*
/**
 *  returns method get request wrapper
 */
const getRequester = (service: Object<any>, method: string, data: Object<any>: {}): Object<any> => {
	() => service.get(method, data);
};
/**
 *  returns method post request wrapper
 */
const postRequester = (service: Object<any>, method: string, data: Object<any>: {}): Object<any> => {
	() => service.post(method, data);
};

/**
 *  returns result functions executeed asynchronously
 */
const async executeAsync = (
  fn1: func,
  fn2: func,
  fn3: func
): any => {
  try {
    const valueA = await fn1();
    const valueB = await fn2(valueA);
    return fn3(valueA, valueB);
  } catch (err) {
    Logger.error(err);
  }
};

/**
 *  returns gravatar url
 */
const getGravatarUrl = (url: string = 'http://www.gravatar.com/avatar/', name: string): string => {
	let hash = md5(name);
	return `${url}${hash.toString()}`;
};

export {
	validate,
	autobind,
	filter,
	getColorByUsername,
	toLexicalDate,
	lexicalSize,
	colorize,
	requestWithRetry,
	executeAsync,
	getGravatarUrl
};