import 'dotenv/config';
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './client-dev.config.babel';

const compiler = webpack(webpackConfig);
const port = process.env.WEBPACK_PORT;
const app = express();

app.use(devMiddleware(compiler, webpackConfig.devServer));
app.use(hotMiddleware(compiler));

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`Webpack development server listening on port ${port}`);
});