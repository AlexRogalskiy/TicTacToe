"use strict";
/**
 * Module dependencies
 */
require('babel-register');
module.exports = require('./config/webpack.development.config.js');

//const Config = require('webpack-config');
//const environment = require('webpack-config');

//environment.setAll({
//  env: () => process.env.NODE_ENV
//});

//module.exports = new Config().extend('config/webpack.[env].config.js');