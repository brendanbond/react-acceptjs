/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
  entry: './src/index.tsx',
  target: 'web',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new Dotenv(),
  ],
  devServer: {
    port: process.env.CLIENT_PORT || 3000,
    server: {
      type: process.env.HTTPS ? 'https' : 'http',
      options: process.env.HTTPS
        ? {
            ca: process.env.SSL_CA_FILE || '',
            key: process.env.SSL_KEY_FILE,
            cert: process.env.SSL_CRT_FILE,
          }
        : {},
    },
  },
};
