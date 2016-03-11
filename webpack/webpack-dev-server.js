import 'dotenv/config';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from './client-dev.config.babel';

const compiler = webpack(webpackConfig);
const port = process.env.WEBPACK_PORT;
const app = express();

app.use(require('webpack-dev-middleware')(compiler, webpackConfig.devServer));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});