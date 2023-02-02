const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const env = process.env.NODE_ENV || 'development'
  console.log(`build as ${env} mode`)
  return {
    mode: env,
    devtool: "source-map",
    entry: {
      background: './src/background/background.ts',
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
      new Dotenv(),
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
