const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack')
const config = require(path.resolve(process.cwd(), './a2n.config.js'))

module.exports = {
  mode: 'production',
  target: 'node',
  entry: [path.resolve(__dirname, "../start.ts")],
  module: {
    rules: [
      {
        test: /[\.ts?|\.js?]$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
  },
  output: {
    filename: 'a2n.serve.js',
    path: path.resolve(__dirname, "../../dist"),
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