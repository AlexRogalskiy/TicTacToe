"use strict";

/**
 * Module dependencies
 */
import path from 'path';
import express from 'express';
import connect from 'connect';
import fs from 'fs';

//const webpackDevMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');

/*const config = require('./webpack.config')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));
app.use(webpackHotMiddleware(compiler));*/

//import dotenv from 'dotenv';
//require('dotenv').config({ path: '/full/custom/path/to/your/env/vars', encoding: 'base64', silent: true, debug: process.env.DEBUG })
/*const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});*/

// middleware
import cookieParser from 'cookie-parser';
import compression from 'compression';
import expressSession from 'express-session';
import csurf from 'csurf';

// http / error/ socket
import axios from 'axios';
import http from 'http';
//import https from 'https';
import createError from 'http-errors';
import socketIo from 'socket.io';
//import jsonParser from 'socket.io-json-parser';

// mongo
//const mongoose = require('mongoose');
import connectMongo from 'connect-mongo';
const MongoSessionStore = connectMongo(expressSession);

// validators
import strategy from 'react-validatorjs-strategy';

// environments
import _ from './env';

// helpers
import Logger, { tag } from './src/js/libs/logger.lib';
import { normalizePort, isString } from './src/js/libs/helpers.lib';

// routes
import routes from './routes/index.route';
import adminRoutes from './routes/admin.route';
import apiRoutes from './routes/api.route';

// credentials
import credentials from './credentials';
import db from './db';

// server configuration
const PUBLIC_PATH = process.env.PUBLIC_PATH || path.resolve(__dirname, 'public', 'build');
const PUBLIC_PORT = process.env.PUBLIC_PORT || 8080;
const PUBLIC_HOST = process.env.PUBLIC_HOST || 'localhost';

const REMOTE_API_URL = process.env.REMOTE_API_URL || 'https://api.darksky.net/forecast/b5074d1869d29cb7c1904d86d67b0a21/59.5339,30.1551';
const REMOTE_API_FETCH_DELAY = process.env.REMOTE_API_FETCH_DELAY || 10000;

const autoRoutes = (): Object<any> => {
	const autoViews = {};
	const fs = require('fs');
	app.use((req, res, next) => {
		const localPath = req.path.toLowerCase();
		if(autoViews[localPath]) return res.render(autoViews[localPath]);
		if(fs.existsSync(path.resolve(__dirname, 'views', localPath + '.handlebars'))) {
			autoViews[localPath] = localPath.replace(/^\//, '');
			return res.render(autoViews[localPath]);
		}
		next();
	});
};
const shouldCompress = (req: Object<any>, res: Object<any>): boolean => {
	if (req.headers['x-no-compression']) {
		return false;
	}
	return compression.filter(req, res);
};
const initSession = (url: string, interval: number, opts: Object<any>): void => {
	//const connection = await mongoose.connect(url, opts});
	//const connection = mongoose.connect(url, opts);
	
	//const sessionStore = new MongoSessionStore({
	//	url: url,
	//	interval: interval
	//});
	
	//const model = sessionStore.model;
	//model.collection.drop(function (err) { console.log(err); });

	app.use(expressSession({
		//store: new MongooseStore({
		//	collection: 'appSessions',
		//	connection: connection,
		//	expires: 86400,
		//	name: 'AppSession'
		resave: false,
		saveUninitialized: false,
		secret: credentials.cookieSecret,
		//store: sessionStore,
		cookie: { maxAge: credentials.session.maxAge, httpOnly: true, secure: true }
	}));
};
const fetchRemoteURL = (url: string, socket: Object<any>, delay: number): void => {
	Logger.debug(`SERVER: fetch remote API from url=${url} with socket id=${socket.id}`);
	if (interval) {
		clearInterval(interval);
	}
	var interval = setInterval(() => getApiAndEmit(url)(socket), delay);
};
const getApiAndEmit = (url: string): void => {
	return async socket => {
		try {
			const response = await axios.get(url);
			socket.emit('event', `Current temperature in timezone ${response.data.timezone} is ${response.data.currently.temperature} F`);
		} catch (error) {
			Logger.error(`SERVER: error ${error.code}`);
		}
	};
};
const startServer = (): void => {
	server.listen(app.get('port'), () => {
        Logger.debug(`SERVER: running in mode <${app.get('env')}> on host <${app.get('hostname')}>, port <${app.get('port')}>`);
	});
};
const printHelpAndExit = (exitcode: number): void => {
	Logger.debug([
		'Usage: ' + __filename + ' [-p] <file-to-watch>',
		'',
		'Options:',
		'  -h, --help    Show this screen',
		'  -p, --public  Start ngrok proxy to let others connect to this server',
	].join('\n'));
	process.exit(exitcode);
};
const getFileData = (filename: string): Object<any> => {
	return {
		content: fs.readFileSync(filename, 'utf8'),
		modifiedAt: fs.statSync(filename).mtime.getTime(),
	};
};

/*
let filename, allowPublicAccess;
process.argv.slice(2).forEach((arg) => {
	if (arg == '-h' || arg == '--help') {
		printHelpAndExit(0);
	}
	if (arg == '-p' || arg == '--public') {
		allowPublicAccess = true;
	} else {
		filename = arg;
	}
});
if (!filename) {
	printHelpAndExit(1);
}
if (allowPublicAccess) {
	const ngrok = require('ngrok');
	(async function() {
		const url = await ngrok.connect();
	})();
	ngrok.connect({addr: 3030, auth: 'user:pwd', subdomain: 'alex', region: 'eu'}, (err, url) => {
		Logger.debug('Public URL:', url);
	});
}*/
//let fileData = [ getFileData(filename) ];

//const httpsOptions = {
//	key: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem')),
//	cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.crt'))
//};

const app = express();
//routes(app);
//adminRoutes(app);
//apiRoutes(app);
autoRoutes();

app.disable('x-powered-by');
app.engine('html', require('ejs').renderFile);
//app.enable('trust proxy');
app.set('view engine', 'html');
app.set("view options", { layout: false });
app.set('views', path.join(PUBLIC_PATH, 'views'));
app.set('/js', path.join(PUBLIC_PATH, 'js'));
app.set('/css', path.join(PUBLIC_PATH, 'css'));
app.set('/images', path.join(PUBLIC_PATH, 'images'));
app.set('/fonts', path.join(PUBLIC_PATH, 'fonts'));
app.set('port', normalizePort(PUBLIC_PORT));
app.set('hostname', PUBLIC_HOST);
app.use(cookieParser(credentials.cookieSecret));

initSession(db.mongo[app.get('env')].connectionString, db.mongo[app.get('env')].interval, db.mongo[app.get('env')].options);

app.use(csurf({ cookie: true }));
app.use(express.json());
app.use(compression({ filter: shouldCompress }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_PATH));
app.use('/', require('cors')());
//app.use('/', indexRouter);

switch(app.get('env')) {
	case 'development':
		app.set('view cache', false);
		app.use(require('errorhandler')({ dumpExceptions: true, showStack: true }));
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		app.set('view cache', true);
		app.use(require('errorhandler')());
		app.use(require('express-logger')({
			path: path.resolve(__dirname, 'logs/requests.log')
		}));
		break;
}

// sockets configuration
const server = http.createServer(app);
//const server = https.createServer(httpsOptions, app);
const io = socketIo(server, {}); //{ parser: jsonParser }

io.on('connection', (socket) => {
	fetchRemoteURL(REMOTE_API_URL, socket, REMOTE_API_FETCH_DELAY);
	/*socket.emit('filedata', fileData);
	fs.watch(filename, function() {
		var last = fileData[fileData.length-1];
		var current = getFileData(filename);
		if (current.content !== last.content && current.content.length > 0) {
			socket.emit('filedata_changed', current);
			fileData.push(current);
		}
	});*/
	
	socket.on('initialize', (data) => {
		Logger.debug(tag`SERVER: initialize with data=${data} from socket with id=${socket.id}`);
		socket.join(data.board.id);
		socket.emit('start', {
			board: data.board,
			cells: data.cells,
			player: data.player,
			room: data.board.id
		});
	});
	
	socket.on('start', (data) => {
		Logger.debug(tag`SERVER: start with data=${data} from socket with id=${socket.id}`);
		const room = io.nsps['/'].adapter.rooms[data.room];
		if(room && room.length <= 2) {
			socket.join(data.room);
			socket.broadcast.to(data.room).emit('player first', {
				board: data.board,
				cells: data.cells,
				player: data.player,
				room: data.room,
				message: 'Connected ...'
			});
			socket.emit('player second', {
				board: data.board,
				cells: data.cells,
				player: data.player,
				room: data.room,
				message: 'Waiting for the player ...'
			});
		} else {
			socket.emit('reject', {
				player: data.player,
				room: data.room,
				message: 'Request rejected => current room is full!'
			});
		}
	});
	
	socket.on('disconnect', () => {
		Logger.debug(`SERVER: disconnect client from socket with id=${socket.id}`);
		socket.emit("finalize", "The other player has left the game...");
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
		socket.broadcast.to(data.room).emit('reset', {
			room: data.room,
			message: 'Current play has been reset'
		});
	});
	
	socket.on('finalize', (data) => {
		Logger.debug(tag`SERVER: finalize with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('finalize', {
			room: data.room,
			message: 'Gave Over'
		});
		socket.leave(data.room);
	});
	
	socket.on('player first', (data) => {
		Logger.debug(tag`SERVER: player first with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('player first', {
			board: data.board,
			cells: data.cells,
			player: data.player,
			room: data.room,
			message: 'Connected ...'
		});
	});
	
	socket.on('player second', (data) => {
		Logger.debug(tag`SERVER: player second with data=${data} from socket with id=${socket.id}`);
		socket.broadcast.to(data.room).emit('player second', {
			board: data.board,
			cells: data.cells,
			player: data.player,
			room: data.room,
			message: 'Waiting for the player ...'
		});
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

app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
	res.locals._csrfToken = req.csrfToken();
	next();
});

app.use((req, res, next) => {
	const cluster = require('cluster');
	if(cluster.isWorker) {
		 Logger.debug(`SERVER: current instance ${cluster.worker.id} is running in mode <${app.get('env')}> on host <${app.get('hostname')}>, port <${app.get('port')}>`);
	}
	next();
});

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

server.on('error', (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = isString(port) ? 'Pipe ' + port : 'Port ' + port;
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
});
server.on('listening', () => {
	const addr = server.address();
	const bind = isString(addr) ? 'pipe ' + addr : 'port ' + addr.port;
	Logger.debug(`SERVER: listening on ${bind}`);
});

module.exports = startServer;
