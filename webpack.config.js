const assert = require('assert');
const path = require('path');
const webpack = require('webpack');

const env = process.env.APP_ENV || 'development';
assert(['local', 'cloud-gov', 'development', 'staging', 'uat', 'production', 'ddev'].includes(env), `${env} is not an acceptable environment.`);

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  entry: {
    landing: './js/landing.jsx',
    glossary: './js/glossary.js',
    request: './js/request.jsx',
    uswds: './js/uswds.js',
    contact_download: './js/contact_download.jsx',
    annual_report_data: './js/annual_report_data.jsx',
    quarterly_report_data: './js/quarterly_report_data.jsx',
    chief_foia_officers_council: './js/chief_foia_officers_council.jsx',
    swagger: './js/swagger.jsx',
    foia_contact_download: './js/foia_contact_download.jsx',
    foia_dataset_download: './js/foia_dataset_download.jsx',
    wizard: './js/wizard/index.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'www.foia.gov/assets/js'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      // Some contributed code needs to be transpiled first.
      {
        include: /(excellentexport.js)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            compact: false,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
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
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
    },
  },
};
