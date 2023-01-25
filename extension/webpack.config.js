const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
  console.log( `build as ${process.env.NODE_ENV} mode`)
  return {
  mode: process.env.NODE_ENV || 'development',
  devtool: "source-map",
  entry: {
    background: './src/background/background.js',
    popup: './src/popup/popup.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: './public',
        to: './',
      },
      ],
    })
  ]
};
}
