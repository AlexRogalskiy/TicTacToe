'use strict';

/**
 * Module dependencies
 */
const configure = require('enzyme').configure;
const adapter = require('enzyme-adapter-react-16');
require('jest-enzyme');
	
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock

configure({ adapter: new adapter() })