import 'dotenv/config';
var Express = require('express');
var webpack = require('webpack');

var webpackConfig = require('./dev.config.babel').default;
var compiler = webpack(webpackConfig);

var port = process.env.WEBPACK_PORT;
var serverOptions = {
  contentBase: 'http://localhost:' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

var app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
