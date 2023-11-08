const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const config = require("../../a2n.config")

module.exports = {
  mode: 'development',
  target: 'node',
  entry: ['./main/start.ts', 'webpack/hot/poll?1000'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
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
      '@': path.resolve(process.cwd(), 'core/src')
    }
  },
  output: {
    filename: 'a2n.serve.js',
    path: path.resolve(process.cwd(), 'main/dist'),
    library: 'a2n',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env': {
        componentScan: JSON.stringify(config.componentScan)
      }
    }), 
    new HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      // 启动的文件
      name: 'a2n.serve.js'
    })
  ]
};