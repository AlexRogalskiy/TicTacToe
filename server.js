"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const cookieParser = require('cookie-parser');
const errorhandler = require('errorhandler')
const express = require('express');

// http / error/ socket
const axios = require('axios');
const http = require('http');
const createError = require('http-errors');
const socketIo = require('socket.io');
//const jsonParser = require('socket.io-json-parser');

// validators
const strategy = require('react-validatorjs-strategy');

// helpers
const { Logger, tag } = require('./src/js/libs/logger');
const { normalizePort, isString } = require('./src/js/libs/helpers');

// routes
const indexRouter = require("./routes/index");

// server configuration
const PUBLIC_PATH = path.resolve(__dirname, 'public', 'build');
const PUBLIC_PORT = 8080;
const PUBLIC_HOST = 'localhost';

const REMOTE_API_URL = '';//'https://api.darksky.net/forecast/b5074d1869d29cb7c1904d86d67b0a21/59.5339,30.1551';
const REMOTE_API_FETCH_DELAY = 10000;

const app = express();
app.disable('x-powered-by');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("view options", { layout: false });
app.set('views', path.join(PUBLIC_PATH, 'views'));
app.set('/js', path.join(PUBLIC_PATH, 'js'));
app.set('/css', path.join(PUBLIC_PATH, 'css'));
app.set('/images', path.join(PUBLIC_PATH, 'images'));
app.set('/fonts', path.join(PUBLIC_PATH, 'fonts'));
//app.set('view cache', false);
app.set('port', normalizePort(process.env.PORT || PUBLIC_PORT));
app.set('hostname', (process.env.HOSTNAME || PUBLIC_HOST));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));

app.use('/', indexRouter);

if(process.env.NODE_ENV === 'development') {
     app.use(errorhandler({ dumpExceptions: true, showStack: true }));
     app.set('view cache', false);
}
if(process.env.NODE_ENV === 'production') {
    app.use(errorhandler());
    app.set('view cache', true);
}

// sockets configuration
const server = http.createServer(app);
const io = socketIo(server, {}); //{ parser: jsonParser }

io.on('connection', (socket) => {
	
	socket.on('initialize', (data) => {
		Logger.debug(tag`SERVER: initialize with data=${data} from socket with id=${socket.id}`);
		fetchRemoteApi(REMOTE_API_URL, socket, REMOTE_API_FETCH_DELAY);
		
		socket.join(`Room-${data.board.id}`);
		socket.emit('start', { name: data.player, room: `Room-${data.board.id}` });
		//if (start == 1) {
		//	socket.emit("handshake", p2);
		//	start++;
		//	//board = new game.Board(p1, p2);
		//	socket.emit("go", { "plays": board.getPlays(), "err": "" });
		//} else if (start == 0) {
		//	socket.emit("handshake", p1);
		//	socket.emit("status", "Waiting for the second player...");
		//	start++;
		//}
	});
	
	socket.on('start', (data) => {
		Logger.debug(tag`SERVER: start with data=${data} from socket with id=${socket.id}`);
		const room = io.nsps['/'].adapter.rooms[data.room];
		if(room && room.length == 1) {
			socket.join(data.room);
			socket.broadcast.to(data.room).emit('player first', { });
			socket.emit('player second', { name: data.player, room: data.room })
		} else {
			socket.emit('reject', { message: 'Sorry, The room is full!' });
		}
	});
	
	socket.on('disconnect', () => {
		Logger.debug(`SERVER: disconnect client from socket with id=${socket.id}`);
		//start = 0;
		//socket.emit("win", "The other player left the game...");
	});
	
	socket.on('setcell', (data) => {
		Logger.debug(tag`SERVER: setcell with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('setcell', {
			cells: data.cells,
			cell: data.cell,
			player: data.player,
			room: data.room
		});
	});
	
	socket.on('reset', (data) => {
		Logger.debug(tag`SERVER: reset with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('reset', data);
	});
	
	socket.on('finalize', (data) => {
		Logger.debug(tag`SERVER: finalize with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('finalize', data);
		socket.leave(data.room);
	});
	
		/*var addedUser = false;
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
		});*/
});

function fetchRemoteApi(url, socket, delay) {
	Logger.debug(`SERVER: connected new client with id=${socket.id}`);
	if (interval) {
		clearInterval(interval);
	}
	var interval = setInterval(() => getApiAndEmit(url)(socket), delay);
};

function getApiAndEmit(url) {
	return async socket => {
		try {
			const response = await axios.get(url);
			socket.emit('event', `Current temperature in timezone ${response.data.timezone} is ${response.data.currently.temperature} F`);
		} catch (error) {
			Logger.error(`SERVER: error ${error.code}`);
		}
	};
}

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
			Logger.error(`SERVER: ${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			Logger.error(`SERVER: ${bind} is already in use`);
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
	Logger.debug(`SERVER: listening on ${bind}`);
};

server.on('error', onError);
server.on('listening', onListening);

server.listen(app.get('port'), () => {
	Logger.debug(`SERVER: running on host <${app.get('hostname')}>, port <${app.get('port')}>`);
});
