const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack')
const { getA2nConfig } = require('../a2nConfig');
const config = getA2nConfig(require(process.cwd() + '/a2n.config.js'))

module.exports = {
  mode: 'production',
  target: 'node',
  entry: ['./main/start.ts'],
  module: {
    rules: [
      {
        test: /[\.ts?|\.js?]$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(process.cwd(), 'core')
    }
  },
  output: {
    filename: 'a2n.serve.js',
    path: path.resolve(process.cwd(), 'dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        cwd: JSON.stringify(process.cwd()),
        componentScan: JSON.stringify(config.componentScan),
        a2nConfig: JSON.stringify(config)
      }
    })
  ]
};