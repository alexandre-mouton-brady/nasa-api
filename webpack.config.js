const webpack = require('webpack');
const { resolve } = require('path');

const entry = {
  html: './index.html',
  js: './index.js',
};

module.exports = {
  entry: [
    entry.html,
    entry.js,
  ],

  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  devtool: 'source-map',

  context: resolve(__dirname, 'src'),

  node: {
    fs: 'empty',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]']
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
