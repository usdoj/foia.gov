/* eslint-disable */

const http = require('http');
const express = require('express');
const path = require('path');

const port = process.env.PORT || '4000';

// Serve static files from the Jekyll build
const static_path = path.resolve(path.join(__dirname), '..', '_site');


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

const app = express();

app.set('port', port);

app.use(express.static(static_path));

// Serve the request single-page app from all endpoints.
app.get('/request/*', (req, res) => {
  res.sendFile(path.join(static_path, 'request', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(err.status || 500);
  res.send(err);
});


const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
