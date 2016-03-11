import {} from 'dotenv/config';
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(process.env.NODE_ENV !== 'production')
  .server(rootDir, function () {
    require('./server');
  });