import {join} from 'path';

export default {
  context: join(__dirname, 'client'),
  entry: {
    app: ["./app/app.js"]
  },
  output: {
    path: join(__dirname, 'dist', 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
    ]
  }
};