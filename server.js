const path = require('path');
const connect = require('connect');
const serveStatic = require('serve-static');

const SERVE_DIR = path.resolve(__dirname, 'public');

connect().use(serveStatic(SERVE_DIR)).listen(8080, function () {
    console.log('Server is ruuning on port 8080...');
});