import { getBean } from '@/ioc/beans'
import { Config as ConfigType } from './types'
import { getState } from './beanState'

let config: ConfigType = null

export function setConfig(config2: ConfigType) {
  config = config2
}

/**
 * 加载配置文件内容到属性中
 */
export const Config = function (name: string) {
  return function (target: any, fieldName: string) {
    const task = () => {
      const objPath: string[] = name.split(".")
      let value: any = null
      let config2 = config
      objPath.forEach(key => {
        try {
          value = config2[key]
          config2 = value
        } catch (err) {
          throw new Error("Config: " + name + " 获取失败")
        }
      })
      getBean(target.constructor)[fieldName] = value
    }
    getState(target.constructor).configTasks.push(task)
  } as PropertyDecorator
}

export default Config
