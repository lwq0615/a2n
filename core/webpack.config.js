const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { CoreBuildPlugin } = require('./CoreBuildPlugin.js');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './core/src/index.ts',
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
      '@': path.resolve(__dirname, './src')
    }
  },
  output: {
    filename: 'a2n.core.js',
    path: path.resolve(__dirname, './dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CoreBuildPlugin()
  ]
};