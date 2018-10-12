require('@babel/register')({
    presets: [ '@babel/preset-env' ]
})

// Import the entry point of the application.
if(require.main === module) {
	require('./server.js')();
} else {
	module.exports = require('./server.js');
}
