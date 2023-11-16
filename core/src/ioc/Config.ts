import { RunConfig } from '@/types'
import { getState } from './beanState'
const _ = require('lodash');

let config: RunConfig = null

export function setConfig(runConfig: RunConfig) {
  if(!runConfig.baseUrl) {
    runConfig.baseUrl = ''
  }
  if(!runConfig.port) {
    runConfig.port = 8080
  }
  if(!runConfig.componentScan) {
    runConfig.componentScan = 'src'
  }
  config = runConfig
  return config
}

export function getConfig() {
  return config
}

/**
 * 加载配置文件内容到属性中
 */
export const Config = function (name: string) {
  return function (target: any, fieldName: string) {
    const task = function() {
      this[fieldName] = _.get(config, name)
    }
    getState(target.constructor).configTasks.push(task)
  } as PropertyDecorator
}

export default Config
