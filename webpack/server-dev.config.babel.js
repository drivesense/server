import 'dotenv/config';
import {resolve, join} from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import ExternalsPlugin from 'webpack-externals-plugin';

export default {
  target:  "node",
  context: resolve(__dirname, '..'),
  entry: {
    server: [
      './src/server.js'
    ]
  },
  /*externals: [function filter(context, request, cb) {
    cb(null, Boolean(request.match(/^[@a-z][a-z\/\.\-0-9]*$/i)));
  }],*/
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'isomorphic-style!css?modules&localIdentName=[name]_[local]_[hash:base64:3]!less'},
      {test: /\.css$/, loader: 'isomorphic-style!css?modules&localIdentName=[name]_[local]_[hash:base64:3]'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  }/*,
  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: join(__dirname, '../node_modules')
    })
  ]*/
};