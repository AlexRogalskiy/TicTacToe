"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');

// http / web-sockets
const axios = require('axios');
const http = require('http');
const createError = require('http-errors');
const socketIo = require('socket.io');
//const jsonParser = require('socket.io-json-parser');

// validators
const strategy = require('react-validatorjs-strategy');

// helpers
const { Logger } = require('./src/js/libs/logger');
const { normalizePort, isString } = require('./src/js/libs/helpers');

// routes
const indexRouter = require("./routes/index");

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
const io = socketIo(server, {}); //{ parser: jsonParser }

io.on('connection', onConnect(10000));

function onConnect(delay) {
	let interval;
	return function (socket) {
		Logger.debug(`Connected: new client with id=${socket.id}`);
		if (interval) {
			clearInterval(interval);
		}
		interval = setInterval(() => getApiAndEmit(socket), 10000);
		
		var addedUser = false;
		socket.on('new message', (data) => {
			socket.broadcast.emit('new message', {
				username: socket.username,
				message: data
			});
		});
		socket.on('add user', (username) => {
			if (addedUser) return;
			socket.username = username;
			addedUser = true;
			socket.emit('login', {
				numUsers: ++numUsers
			});
			socket.broadcast.emit('user joined', {
				username: socket.username,
				numUsers: numUsers
			});
		});
		socket.on('typing', () => {
			socket.broadcast.emit('typing', {
				username: socket.username
			});
		});
		socket.on('stop typing', () => {
			socket.broadcast.emit('stop typing', {
				username: socket.username
			});
		});
		
		socket.on('disconnect', () => {
			Logger.debug(`Dicsonnected: client with id=${socket.id}`);
			if (addedUser) {
				socket.broadcast.emit('user left', {
					username: socket.username,
					numUsers: --numUsers
				});
			}
		});
	};
};

const getApiAndEmit = async socket => {
	try {
		const res = await axios.get('https://api.darksky.net/forecast/b5074d1869d29cb7c1904d86d67b0a21/59.5339,30.1551');
		socket.emit('event', `Current temperature in timezone ${res.data.timezone} is ${res.data.currently.temperature}`);
	} catch (error) {
		Logger.error(`Error: ${error.code}`);
	}
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.route('/test').all((req, res) => {
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

server.on('error', onError);
server.on('listening', onListening);

server.listen(app.get('port'), () => {
	Logger.debug(`Server is ruuning on host <${app.get('hostname')}>, port <${app.get('port')}>`);
});
