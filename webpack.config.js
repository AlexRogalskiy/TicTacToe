"use strict";

/**
 * Module dependencies
 */
require('@babel/register');
const { Config, environment } = require('webpack-config');

environment.setAll({
  env: () => (process.env.NODE_ENV) ? process.env.NODE_ENV.trim() : 'development'
});

module.exports = new Config().extend('config/webpack.[env].config.js');