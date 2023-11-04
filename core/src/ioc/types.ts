import { Route } from "@/control/types"


// bean实例
export type BeanInstance = {
  constructor: BeanClass,
  [fieldName: string]: any
}

// bean类型
export interface BeanClass {
  new(): BeanInstance | any
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

// bean状态中心
export interface BeanState {
  beanClass: BeanClass,
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
  initOverTasks: Function[],
  // bean创建方式
  scope: BeanScope
}

// bean多例缓存池对象
export interface BeanCache {
  classMap: Map<BeanClass, BeanInstance>
}