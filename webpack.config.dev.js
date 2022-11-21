const assert = require('assert');
const path = require('path');
const webpack = require('webpack');
const exec = require('child_process').exec;
const WebpackWatchPlugin = require('webpack-watch-files-plugin').default;

const env = 'development';
assert(['local', 'cloud-gov', 'development', 'staging', 'uat', 'production', 'ddev'].includes(env), `${env} is not an acceptable environment.`);

module.exports = {
  mode: env,
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    // Needed to watch SCSS folders since not importing from JS file will not trigger webpack
    new WebpackWatchPlugin({
      files: [
        'www.foia.gov/_sass/**/*.scss',
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    {
      // Webpack Watch triggers when change is made, and rebuilds the site using Jekyll
      apply: (compiler) => {
        compiler.hooks.watchRun.tap('WatchRun', () => {
          exec('make build.reload', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      },
    },
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
  },
};
