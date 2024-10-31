const { merge } = require('lodash')

/**
 * 默认的a2n配置
 */
const defaultConfig = {
  // 全局接口前缀
  baseUrl: '',
  // 组件扫描路径，该路径下的js,ts文件将会被容器扫描
  componentScan: 'src',
  // 服务启动端口号
  port: 8080,
  // ApiExport 装饰器配置
  apiExport: {
    // 默认生成接口前缀
    baseUrl: '/api',
  },
  // 隐藏启动时的文件扫描信息
  hideScanFile: true,
  // webpack配置，会与默认webpack配置进行合并
  webpack: {},
}

function getAssignConfig(config) {
  return merge(structuredClone(defaultConfig), config)
}

module.exports = {
  getAssignConfig,
}