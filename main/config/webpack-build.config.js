const { getWebConfig } = require('./webpack.base.js')
const path = require('path')


/**
 * 获取webpack生产环境配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function webpackBuildConfig(options, args) {
  return getWebConfig({
    mode: 'production',
  }, options, args)
}

module.exports = {
  webpackBuildConfig,
}