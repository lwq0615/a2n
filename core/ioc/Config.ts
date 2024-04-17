import { RunConfig } from '@/types'
import { getState } from './beanState'
const _ = require('lodash');

let config: RunConfig = null

export function setConfig(runConfig: RunConfig): RunConfig {
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

/**
 * 加载配置文件内容到属性中
 */
export const Config = function (name: string) {
  return function (target: any, fieldName: string) {
    const task = function () {
      this[fieldName] = _.get(config, name)
    }
    getState(target.constructor).configTasks.push(task)
  } as PropertyDecorator
}

export default Config
