import { getState } from './beanState'
import { getConfig } from "@core/config"
const _ = require('lodash');

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
