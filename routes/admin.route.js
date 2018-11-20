"use strict";

/**
 * Module dependencies
 */
const express = require('express');
// vhosts
const vhost = require('vhost');
//handlers 
const handlers = require('../handlers/admin.handler.js');
// admin router
const admin = express.Router();

const authorize = (req, res, next) => {
	if(req.session.authorized) {
		return next();
	}
	handlers.unAuthorized;
};

module.exports = (app, uri = 'admin.*') => {
	app.use(vhost(uri, admin));
	
	admin.get('/', authorize, handlers.home);
};