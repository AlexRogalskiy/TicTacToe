"use strict";

/**
 * Module dependencies
 */
const express = require('express');
// vhosts
const vhost = require('vhost');
// rest
const connectRest = require('connect-rest');
// handlers
const handlers = require('../handlers/api.js');

// api configs
const options = {
	context: '/',
	logger: { file: 'api.log', level: 'debug' },
	apiKeys: [ '849b7648-14b8-4154-9ef2-8d1dc4c2b7e9' ],
	// discover: { path: 'discover', secure: true },
    // proto: { path: 'proto', secure: true },
	domain: require('domain').create()
};

const rest = connectRest.create(options);

const authorize = (req, res, next) => {
	if(req.session.authorized) {
		return next();
	}
	handlers.unAuthorized;
};

async function service( request, content ){
    console.log( 'Received headers:' + JSON.stringify( request.headers ) )
    console.log( 'Received parameters:' + JSON.stringify( request.parameters ) )
    console.log( 'Received JSON object:' + JSON.stringify( content ) )
    return 'ok'
}

module.exports = (app, uri = 'api.*') => {
	app.use(vhost(uri, rest.processRequest()));
	app.use((req, res, next) => {
		options.domain.on('error', err => {
			Logger.debug(`SERVER: intercepted error ${err.stack}`);
			try {
				setTimeout(() => process.exit(1), 5000);
				const worker = require('cluster').worker;
				if(worker) {
					worker.disconnect();
				}
				server.close();
				
				try {
					next(err);
				} catch(err) {
					Logger.debug(`SERVER: cannot intercept error ${err.stack}`);
						res.type('text/plain');
						res.charset = 'utf-8';
						res.status(500);
						res.end('Internal Server Error');
						//createError(500);
				}
			} catch(err) {
				Logger.debug(`SERVER: cannot send error message ${err.stack}`);
			}
		});
		options.domain.add(req);
		options.domain.add(res);
		options.domain.run(next);
	});
	
	rest.assign( '*', [ { path: '/shake', version: '>=2.0.0' }, { path: '/twist', version: '>=2.1.1' } ], service );
	//rest.get('/books/:title/:chapter', asyncFunctionN0 );
	//rest.post( { path: '/make', version: '>=1.0.0' }, asyncFunctionN1 );
	//rest.post( [ '/act', '/do' ], asyncFunctionN2 );
	//rest.post( [ { path: '/shake', version: '>=2.0.0' }, { path: '/twist', version: '>=2.1.1' } ], asyncFunctionN3 );
	rest.get('/attractions', authorize, handlers.getAttractions);
};
