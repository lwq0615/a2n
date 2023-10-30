import { getBean } from '@/ioc/beans'
import { Config } from './types'

let config: Config = null

export function setConfig(config2: Config) {
  config = config2
}

/**
 * 加载配置文件内容到属性中
 */
const Config = function (name: string) {
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
    if (!Array.isArray(target.constructor.__configTasks)) {
      target.constructor.__configTasks = []
    }
    target.constructor.__configTasks.push(task)
  } as PropertyDecorator
}

export default Config
