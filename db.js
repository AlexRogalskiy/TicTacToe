'use strict';

module.exports = {
	mongo: {
		development: {
			connectionString: process.env.MONGODB_CONNECTION_STR,
			interval: 120000,
			options: {
				server: {
					socketOptions: {
						keepAlive: 1
					}
				},
				useMongoClient: true
			}
		},
		production: {
			connectionString: process.env.MONGODB_CONNECTION_STR,
			interval: 120000,
			options: {
				server: {
					socketOptions: {
						keepAlive: 1
					}
				},
				useMongoClient: true
			}
		}
	}
};