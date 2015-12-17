'use strict';

import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack.config.babel.js';

export default gulp => {
  gulp.task('webpack', cb => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return cb(new gutil.PluginError('webpack', err));
      }

      gutil.log('[webpack]', stats.toString({
        colors: true
      }));

      cb();
    });
  });

  gulp.task('webpack-dev-server', cb => {
    // Start a webpack-dev-server
    const compiler = webpack(webpackConfig);

    new WebpackDevServer(compiler, {
      proxy: {
        '*': 'http://localhost:1337'
      }
    }).listen(8080, 'localhost', err => {
      if (err) {
        return cb(new gutil.PluginError('webpack-dev-server', err));
      }

      gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');

      // keep the server alive or continue?
      // cb();
    });
  });
};