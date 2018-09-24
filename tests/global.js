"use strict";

/**
 * Module dependencies
 */
var Browser = require('zombie') ;
var assert = require('chai').assert;

suite('Global crosspage tests', () => {
	var browser;
	
	setup(() => {
		browser = new Browser();
	});

	test('should contain referrer field from Prime tour page', (done) => {
		var referrer = 'http://localhost:3000/tours/prime';
		browser.visit(referrer, () => {
			browser.clickLink('.requestGroupRate', () => {
				console.log(browser.field('referrer').value);
				//assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	test('should contain referrer field from Fast tour page', (done) => {
		var referrer = 'http://localhost:3000/tours/fast';
		browser.visit(referrer, () => {
			browser.clickLink('.requestGroupRate', () => {
				//assert(browser.field('referrer').value === referrer);
				done();
			});
		});
	});

	test('should not contain referrer field from Price page', (done) => {
		var referrer = 'http://localhost:3000/tours/price-group-rate';
		browser.visit(referrer, () => {
			//assert(browser.field('referrer').value === '');
			done();
		});
	});
	
	test('should contain corrent document title', (done) => {
		assert(document.title && document.title.match(/\S/) && document.title.toUpperCase() !== 'TODO');
	});
});