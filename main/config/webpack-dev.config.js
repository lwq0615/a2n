const { getDevConfig } = require('./getConfig.js')
const { getWebConfig, getDevWebConfig } = require('./webpack.base.js')
const path = require('path')

/**
 * 获取webpack开发环境配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function webpackDevConfig(options, args) {
  const a2nConfig = getDevConfig(options?.config)
  return getWebConfig(
    getDevWebConfig({
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), './' + a2nConfig.componentScan),
        },
      },
    }),
    options,
    args,
  )
}

module.exports = {
  webpackDevConfig,
}
