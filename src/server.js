'use strict';

import {} from 'dotenv/config';
import {join} from 'path';
import express from 'express';
import http from 'http';
import compression from 'compression';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';

const development = process.env.NODE_ENV !== 'production';
const apiUrl = 'http://' + process.env.API_HOST + ':' + process.env.API_PORT;
const app = express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: apiUrl,
  ws: true
});

app.use(compression());
// app.use(favicon(join(__dirname, '..', 'static', 'favicon.ico')));
app.use(express.static(join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: apiUrl + '/api'});
});

app.use('/auth', (req, res) => {
  proxy.web(req, res, {target: apiUrl + '/auth'});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: apiUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }

  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  res.send({error: 'proxy_error', reason: error.message}).end();
});

if (!development) {
  // Use webpack reloading here
}

app.use((req, res) => {
  // Use react isomorphic here
});

server.listen(process.env.PORT, () => {
  console.info('----\n==> ✅  Server is running, talking to API server on %s.', apiUrl);
  console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', process.env.PORT);
});