"use strict";

/**
 * Module dependencies
 */
const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const render = require('react-testing-library').render;
const fireEvent = require('react-testing-library').fireEvent;

const Browser = require('zombie') ;
const assert = require('chai').assert;

//const AppView = require('../src/js/views/app.view');

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
	
	test('view renders without crashing', (done) => {
		const div = document.createElement('div');
		//ReactDOM.render(<AppView />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	
	test('counter increments the count', () => {
	  const {container} = render(<Counter />)
	  const button = container.firstChild
	  expect(button.textContent).toBe('0')
	  fireEvent.click(button)
	  expect(button.textContent).toBe('1')
	});

	test('reads and updates localStorage', () => {
	  window.localStorage.setItem('count', 3)
	  const {container, rerender} = render(<Counter />)
	  const button = container.firstChild
	  expect(button.textContent).toBe('3')
	  fireEvent.click(button)
	  expect(button.textContent).toBe('4')
	  rerender(<Counter />)
	  expect(window.localStorage.getItem('count')).toBe('4')
	});
});