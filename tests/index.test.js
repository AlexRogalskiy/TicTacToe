"use strict";

/**
 * Module dependencies
 */
//const http = require('http');
const Browser = require('zombie') ;
const assert = require('chai').assert;
//import assert from 'assert';
//import '../lib/index.js';

suite('Main page tests', () => {
	var browser;
		
	setup(() => {
		browser = new Browser();
	});
	
	test('should return 200', (done) => {
		var referrer = 'http://localhost:8080/';
		browser.visit(referrer, () => {
			assert.equal(200, res.statusCode);
			done();
		});
		//http.get('http://127.0.0.1:1337', res => {
		//	assert.equal(200, res.statusCode);
		//	done();
		//});
	});
	
	test('should contain link to contact details', () => {
		assert($('a[href="/contact"').length);
	});
});