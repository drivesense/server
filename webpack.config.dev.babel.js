import {resolve} from 'path';
import webpack from 'webpack';

const port = process.env.PORT;

export default {
  context: resolve(__dirname),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr'`,
      './src/client.js'
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://localhost:${port}/dist/`
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
    ]
  },
  resolve: {
    modulesDirectories: ['shared', 'node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })
  ]
};