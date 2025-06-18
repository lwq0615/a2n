const { getWebConfig } = require('./webpack.base.js')
const path = require('path')
const { getDevConfig } = require('./a2n-config.js')

/**
 * 获取webpack生产环境配置文件
 * @param options 启动参数
 * @param args 启动命令参数
 * @returns webpack配置文件
 */
function webpackBuildConfig(options, args) {
  const a2nConfig = getDevConfig(options?.config)
  return getWebConfig(
    {
      mode: 'production',
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), './' + a2nConfig.componentScan),
        },
      },
    },
    options,
    args,
  )
}

module.exports = {
  webpackBuildConfig,
}
