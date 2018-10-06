'use strict';

/**
 * Module dependencies
 */
const Mocha = require('mocha');
const mocha = new Mocha({ ui: 'qunit', reporter: 'spec' });

//Add test files
mocha.addFile('./tests/mocha/suite.js');

//Run tests
mocha.run((failures) => {
	process.exit(failures);
});