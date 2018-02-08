const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src', 'demo.js'),
  },

  output: {
    publicPath: '/',
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
  }
}
