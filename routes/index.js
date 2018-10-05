"use strict";

/**
 * Module dependencies
 */
const handlers = require('../handlers/index.js');

module.exports = (app) => {
	app.get('/', handlers.home);
	app.get('/about/', handlers.about);
};