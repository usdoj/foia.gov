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

// Serve the CFO single-page app from all subfolders.
app.get('/chief-foia-officers-council/*', (req, res) => {
  res.sendFile(path.join(static_path, 'chief-foia-officers-council.html'));
});

// catch 404 and render the static 404 page
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(static_path, '404.html'));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});


const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
