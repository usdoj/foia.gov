const assert = require('assert');
const path = require('path');
const webpack = require('webpack');

const env = process.env.APP_ENV || 'development';
assert(['local', 'cloud-gov', 'development', 'staging', 'uat', 'production'].includes(env), `${env} is not an acceptable environment.`);

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }),
];

if (isProduction) {
  plugins = plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ]);
}


module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  plugins,
  entry: {
    landing: './js/landing.jsx',
    glossary: './js/glossary.js',
    request: './js/request.jsx',
    uswds: './js/uswds.js',
    contact_download: './js/contact_download.jsx',
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
