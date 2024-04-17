
// 默认配置
const defaultConfig = {
  // 全局接口前缀
  baseUrl: '',
  // 组件扫描路径
  componentScan: 'src',
  // 服务启动端口号
  port: 8080,
  apiExport: {
    baseUrl: '/api'
  }
}

function getA2nConfig(config) {
  return Object.assign(defaultConfig, config)
}

module.exports = {
  getA2nConfig
}