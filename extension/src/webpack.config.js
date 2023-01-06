const path = require('path');

module.exports = {
  entry: {
    background: './background/background.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
};
