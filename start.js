require('@babel/register')({
    presets: [ '@babel/preset-env' ]
});
require('babel-polyfill');

//require('src/js/libs/version.lib')()

// Import the entry point of the application.
if(require.main === module) {
	require('./server.js')();
} else {
	module.exports = require('./server.js');
}
