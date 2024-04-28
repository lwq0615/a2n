import { RunConfig } from '@core/types'


let config = {}

export function setConfig(runConfig: RunConfig) {
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
  config = Object.assign(defaultConfig, runConfig)
  return config
}

export function getConfig(): RunConfig {
  return config
}