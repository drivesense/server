import 'dotenv/config';
import {resolve} from 'path';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));
const port = process.env.WEBPACK_PORT;

export default {
  context: resolve(__dirname, '..'),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr'`,
      './src/client.js'
    ]
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://localhost:${port}/dist/`
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
      {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
    ]
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\'',
        WEBPACK_ENV: '\'client\''
      }
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};