import { RunConfig } from '@/types'
import { getState } from './beanState'

let config: RunConfig = null

export function setConfig(config2: RunConfig) {
  if(!config2.baseUrl) {
    config2.baseUrl = ''
  }
  if(!config2.port) {
    config2.port = 8080
  }
  if(!config2.componentScan) {
    config2.componentScan = 'src'
  }
  config = config2
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
      this[fieldName] = value
    }
    getState(target.constructor).configTasks.push(task)
  } as PropertyDecorator
}

export default Config
