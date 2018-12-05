"use strict";

/**
 * Module dependencies
 */
const React = require('react');
const http = require('http');
const rest = require('restler');
const assert = require('chai').assert;
const shallow = require('enzyme').shallow;

const AppView = require('../src/js/views/app.view');

suite('Global API tests', () => {
	
	test('renders without crashing', () => {
		shallow(<AppView />);
	});
	
	test('renders welcome message', () => {
		const wrapper = shallow(<AppView />);
		const welcome = <h2>Welcome to React</h2>;
		// expect(wrapper.contains(welcome)).to.equal(true);
		expect(wrapper.contains(welcome)).toEqual(true);
		//expect(wrapper).toContainReact(welcome)
	});
});