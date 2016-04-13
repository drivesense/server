import 'dotenv/config';
import webpack from 'webpack';
import _ from 'lodash';
import config from './dev.config.babel';

const port = process.env.WEBPACK_PORT;

export default _.defaultsDeep(config, {
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
      './src/client.js'
    ]
  },
  output: {
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK_ENV: '\'client\''
      }
    })
  ]
});