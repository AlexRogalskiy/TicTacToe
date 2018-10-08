"use strict";

/**
 * Module dependencies
 */
const loadtest = require('loadtest');
const expect = require('chai').expect;

suite('Global stress tests', () => {
	test('Index page uptime is limited by 50 sec', (done) => {
		const options = {
			url: 'http://localhost:3000/',
			concurrency: 4,
			maxRequests: 50
		};
		loadtest.loadTest(options, (err, result) => {
			expect(!err);
			expect(result.totalTimeSeconds < 1);
			done();
		});
	});
});