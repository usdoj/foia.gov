const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'theme-settings': './js/wizard/components/00-config/theme-settings.yml',
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /theme-settings\.yml$/,
        exclude: /node_modules/,
        use: [path.resolve(__dirname, './js/wizard/lib/configLoader.js')],
        type: 'asset/source',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, './js/wizard/dist'),
  },
};
