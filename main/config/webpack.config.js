const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { getAssignConfig } = require('./a2nDefaultConfig');

let config = {}
try {
  config = getAssignConfig(require(path.resolve(process.cwd(), './a2n.config.js')))
} catch (err) {
  console.error('tip: config file "' + path.resolve(process.cwd(), './a2n.config.js') + '" not exist!')
  console.error('tip: use defalut config\n')
  config = getAssignConfig()
}

const baseConfig = {
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /[\.ts?|\.js?]$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, "../start.ts"),
      },
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

function getWebConfig(config) {
  return merge(baseConfig, config)
}

module.exports = {
  getWebConfig
}