const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack')
const config = require("./a2n.config")

module.exports = {
  mode: 'development',
  target: 'node',
  entry: process.env.buildtype === 'core' ? './packages/core/index.ts' : './main/start.ts',
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
      '@': path.resolve(__dirname, 'packages/core')
    }
  },
  output: {
    filename: process.env.buildtype === 'core' ? 'a2n.bundle.js' : 'a2n.serve.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        componentScan: JSON.stringify(config.componentScan)
      }
    })
  ]
};