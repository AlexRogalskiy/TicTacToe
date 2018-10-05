"use strict";

/**
 * Module dependencies
 */
const path = require('path');
const express = require('express');
const cluster = require('cluster');

// helpers
const { Logger, tag } = require('./src/js/libs/logger');

const startWorker = () => {
	const worker = cluster.fork();
	Logger.debug(`SERVER: current instance ${worker.id} is running in mode <${app.get('env')}> on host <${app.get('hostname')}>, port <${app.get('port')}>`);
};

if(cluster.isMaster) {
	require('os').cpus().forEach(() => startWorker());
	
	cluster.on('disconnect', (worker) => Logger.debug(`SERVER: current instance ${worker.id} is disconnected from cluster`):
	cluster.on('exit', (worker, code, signal) =>  {
		Logger.debug(`SERVER: current instance ${worker.id} is exited with code <${code}> (${signal})`):
		startWorker();
	});
} else {
	require('./server.js')();
}