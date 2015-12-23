import {join} from 'path';
import webpack from 'webpack';

export default {
  context: join(__dirname, 'client'),
  entry: {
    app: ['./app/app.js']
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};