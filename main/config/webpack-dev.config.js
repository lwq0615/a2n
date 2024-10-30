const { getWebConfig } = require('./webpack.config.js');
const nodeExternals = require('webpack-node-externals');
const { HotModuleReplacementPlugin } = require('webpack')
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const path = require('path');


/**
 * 获取webpack开发环境配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function webpackDevConfig(options, args) {
  return getWebConfig({
    entry: [path.resolve(__dirname, '../start.ts'), 'webpack/hot/poll?1000'],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?1000'],
      }),
    ],
    devtool: 'source-map',
    plugins: [
      new HotModuleReplacementPlugin(),
      new RunScriptWebpackPlugin({
        // 启动的文件
        name: 'a2n.serve.js',
      }),
    ],
  }, options, args)
}

module.exports = {
  webpackDevConfig,
}