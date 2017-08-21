const path = require('path');

module.exports = {
  entry: './js/request.jsx',
  output: {
    path: path.resolve(__dirname, 'www.foia.gov/assets/js'),
    filename: 'request.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
