console.log('--> active file : server.js');
console.log('--- --- --- --- ---');

// Import
const http = require('http');
const app = require('./app');

// Function to transform the port into and integer
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Function to set the port = 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
    default:
        throw error;
    }
};

// Creating the server
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port => ' + port;
    console.log('Listening on : ' + bind);
});

server.listen(port, () => {
    console.log('--- --- --- --- ---');
    console.log('Server is listening on port ' + `${port}`)
    console.log('--- --- --- --- ---');
});