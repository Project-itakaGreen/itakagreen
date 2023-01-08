const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './background/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
          from: './images',
          to: '../dist/images',
        },
        {
          from: './manifest.json',
          to: '../dist/manifest.json',
        },
        {
          from: './popup.html',
          to: '../dist/popup.html',
        },
        {
          from: './popup.css',
          to: '../dist/popup.css',
        }
      ],
    })
  ]
};