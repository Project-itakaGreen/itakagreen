const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: "source-map",
  entry: {
    background: './src/background/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
          from: './src/images',
          to: './images',
        },
        {
          from: './src/manifest.json',
          to: './manifest.json',
        },
        {
          from: './src/popup.html',
          to: './popup.html',
        },
        {
          from: './src/popup.css',
          to: './popup.css',
        }
      ],
    })
  ]
};