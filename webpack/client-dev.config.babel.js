import 'dotenv/config';
import {resolve} from 'path';
import webpack from 'webpack';

const port = process.env.WEBPACK_PORT;

export default {
  context: resolve(__dirname, '..'),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      './src/client.js'
    ]
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: `http://localhost:${port}/dist/`
  },
  devServer: {
    contentBase: `http://localhost:${port}`,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: `http://localhost:${port}/dist/`,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:3]!less'},
      {test: /\.css$/, loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:3]'},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel']}
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'development\'',
        WEBPACK_ENV: '\'client\''
      }
    })
  ]
};