"use strict";

/**
 * Module dependencies
 */
//const bodyParser = require('body-parser');
//const connect = require('connect');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const createError = require('http-errors');
const strategy = require('react-validatorjs-strategy');

// routes
const indexRouter = require("./routes/index");

const { Logger } = require('./src/js/libs/logger');
const { normalizePort, isString } = require('./src/js/libs/helpers');

// server configuration
const PUBLIC_PATH = path.resolve(__dirname, 'public', 'build');
const PUBLIC_PORT = 8080;
const PUBLIC_HOST = 'localhost';

const app = express();
app.disable('x-powered-by');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", { layout: true });
app.set('views', path.join(PUBLIC_PATH, 'views'));
app.set('view cache', false);
app.set('port', normalizePort(process.env.PORT || PUBLIC_PORT));
app.set('hostname', (process.env.HOSTNAME || PUBLIC_HOST));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));

app.use('/', indexRouter);

// web-socket configuration
const server = http.createServer(app);
const io = socketIo(server);

function onConnection(socket) {
	socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
};
io.on('connection', onConnection);

let interval;
io.on('connection', (socket) => {
	Logger.debug('New client connected');
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 10000);
	socket.on('disconnect', () => {
		Logger.debug('Client disconnected');
	});
});

const getApiAndEmit = async socket => {
	try {
		const res = await axios.get('https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558');
		socket.emit('FromAPI', res.data.currently.temperature);
	} catch (error) {
		Logger.error(`Error: ${error.code}`);
	}
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/users', (req, res, next) => {
	res.send(USERS);
});

app.get("/profile", (req, res, next) => {
	//var schema = strategy.createSchema(...);
    //strategy.validateServer(req.body, schema).then(function () {
    //    // Submit the data
    //})
    //.catch(next);
});

app.route('/echo').all((req, res) => {
		let params = (Object.keys(req.body).length > 0) ? req.body : req.query;
		res.send(params);
	}
);

// 400
app.use((err, req, res, next) => {
	if (err instanceof strategy.Error) {
		res.status(400).json(err.errors);
	} else {
		next(err, req, res);
	}
});

// 404
app.use((req, res) => {
	res.type('text/html');
	res.charset = 'utf-8';
	res.status(404);
	//res.render('404');
	createError(404);
});

// 500
app.use((req, res) => {
	res.type('text/html');
	res.charset = 'utf-8';
	res.status(500);
	//res.render('500');
	createError(500);
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	var bind = isString(port) ? 'Pipe ' + port : 'Port ' + port;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			Logger.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			Logger.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
		  throw error;
	}
};

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	var addr = server.address();
	var bind = isString(addr) ? 'pipe ' + addr : 'port ' + addr.port;
	Logger.debug(`Listening on ${bind}`);
};

server.listen(app.get('port'), () => {
	Logger.debug(`Server is ruuning on host <${app.get('hostname')}>, port <${app.get('port')}>`);
});
