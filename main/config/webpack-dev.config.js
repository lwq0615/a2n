const { getWebConfig } = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');
const { HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const path = require('path');

module.exports = getWebConfig({
  entry: [path.resolve(__dirname, "../start.ts"), 'webpack/hot/poll?1000'],
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
  ],
  plugins: [
    new HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      // 启动的文件
      name: 'a2n.serve.js'
    })
  ]
})