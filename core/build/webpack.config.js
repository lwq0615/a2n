const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DtsBuildPlugin } = require('./DtsBuildPlugin.js');


module.exports = {
  mode: 'development',
  target: 'node',
  entry: './core/index.ts',
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
      '@core': path.resolve(process.cwd(), './core'),
      '@': path.resolve(__dirname, "./"),
    }
  },
  output: {
    filename: 'a2n.core.js',
    path: path.resolve(process.cwd(), './core/dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DtsBuildPlugin()
  ]
};