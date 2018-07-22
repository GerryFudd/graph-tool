const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENVIRONMENT = process.env.NODE_ENV || 'development';
const url = ENVIRONMENT === 'production' ? 'mycoolurl' : 'localhost';
const port = ENVIRONMENT === 'development' ? ':8080' : '';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${url}${port}`,
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // activates HMR

    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    hot: true,
    // activate hot reloading

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`
    historyApiFallback: true,
    
    mode: ENVIRONMENT
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
};
