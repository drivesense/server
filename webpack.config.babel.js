import {join} from 'path';
import webpack from 'webpack';

export default {
  context: join(__dirname, 'client'),
  entry: {
    app: ['./index.js']
  },
  output: {
    path: join(__dirname, 'dist', 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
    ]
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};