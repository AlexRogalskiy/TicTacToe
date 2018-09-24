"use strict";

/**
 * Module dependencies
 */
const bodyParser = require('body-parser');
//const connect = require('connect');
const express = require('express');
//const io = require('socket.io');
const path = require('path');
const strategy = require('react-validatorjs-strategy');

//const Logger = require('./src/js/libs/logger');
//const tag = require('./src/js/libs/logger');

const PUBLIC_PATH = path.resolve(__dirname, 'public', 'build');
const PUBLIC_PORT = 8080;
const PUBLIC_HOST = 'localhost';

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", { layout: true });
app.set('views', path.join(PUBLIC_PATH, 'views'));
app.set('view cache', false);
app.set('port', (process.env.PORT || PUBLIC_PORT));
app.set('hostname', (process.env.HOSTNAME || PUBLIC_HOST));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get("/users", function(req, res, next) {
	res.send(USERS);
});

app.get("/profile", function(req, res, next) {
	//var schema = strategy.createSchema(...);
    //strategy.validateServer(req.body, schema).then(function () {
    //    // Submit the data
    //})
    //.catch(next);
});

// 400
app.use(function(err, req, res, next) {
	if (err instanceof strategy.Error) {
		res.status(400).json(err.errors);
	} else {
		next(err, req, res);
	}
});

// 404
app.use(function(req, res) {
	res.type('text/html');
	res.status(404);
	res.render('404');
});

// 500
app.use(function(req, res) {
	res.type('text/html');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log(`Server is ruuning on host <${app.get('hostname')}>, port <${app.get('port')}>...`);
});