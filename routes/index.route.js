"use strict";

/**
 * Module dependencies
 */
const handlers = require('../handlers/index.handler.js');

module.exports = (app) => {
	app.get('/', handlers.home);
	app.get('/about', handlers.about);
	app.get('/test', handlers.test);
	app.all('*', handlers.all);
};