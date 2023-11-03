import { Route } from "@/control/types"


// bean实例
export type BeanInstance = {
  constructor: Function,
  [fieldName: string]: any
}

// bean类型
export type BeanClass = {
  new(): BeanInstance
}

export interface Config {
  port?: number,
  componentScan?: string,
  [name: string]: any
}

export enum BeanScope{
  // 单例
  SINGLETON = 0,
  // 多例
  PROTOTYPE = 1
}

export interface BeanState {
  setBeanTask: Function,
  // 控制器处理器
  controllMethods: {
    [methodName: string]: Route
  },
  // 依赖注入任务列表
  autowiredTasks: Function[],
  // 配置文件属性注入任务列表
  configTasks: Function[],
  // 依赖注入完成后执行任务
  initOverTasks: string[],
  // bean创建方式
  scope: BeanScope
}