const assert = require('assert');
const path = require('path');

const env = process.env.NODE_ENV || 'local';
assert(['local', 'cloud-gov', 'development', 'staging', 'production'].includes(env), `${env} is not an acceptable environment.`);

module.exports = {
  entry: {
    request: './js/request.jsx',
    uswds: './js/uswds.js',
  },
  output: {
    path: path.resolve(__dirname, 'www.foia.gov/assets/js'),
    filename: '[name].bundle.js',
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
    modules: [path.join(__dirname, 'js'), 'node_modules'],
    alias: {
      settings$: path.join(__dirname, 'js', 'settings', `${env}.js`),
    },
  },
};
