'use strict';

module.exports = {
	mongo: {
		development: {
			connectionString: 'mongodb://localhost/development',
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
			connectionString: 'mongodb://localhost/production',
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