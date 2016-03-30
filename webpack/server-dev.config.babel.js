import 'dotenv/config';
import {resolve} from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

export default {
  target:  "node",
  context: resolve(__dirname, '..'),
  entry: {
    server: [
      './src/server.js'
    ]
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'isomorphic-style!css?modules!less'},
      {test: /\.css$/, loader: 'isomorphic-style!css?modules'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']},
      {test: /\.(png|svg)$/, loader: 'url?limit=10000'}
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  }
};