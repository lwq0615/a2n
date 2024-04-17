import { RunConfig } from '@core/types'
import { getState } from './beanState'
const _ = require('lodash');

export function getConfig(): RunConfig {
  return process.env.a2nConfig as unknown as RunConfig
}

/**
 * 加载配置文件内容到属性中
 */
export const Config = function (name: string) {
  return function (target: any, fieldName: string) {
    const task = function () {
      this[fieldName] = _.get(getConfig(), name)
    }
    getState(target.constructor).configTasks.push(task)
  } as PropertyDecorator
}

export default Config
