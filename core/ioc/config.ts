import { getConfig } from '@core/config'
import { BeanClass, BeanInstance } from '@core/types'
import { getState } from './bean-state'

const _ = require('lodash')

/**
 * 加载配置文件内容到属性中
 */
export const Config = function (name: string) {
  return function (target: any, fieldName: string) {
    const task = function (this: BeanInstance) {
      this[fieldName] = _.get(getConfig(), name)
    }
    const state = getState(target.constructor as BeanClass)
    state.addFieldDecorator(fieldName, Config)
    state.configTasks.push(task)
  } as PropertyDecorator
}

export default Config
