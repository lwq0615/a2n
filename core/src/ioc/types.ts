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

export interface AspectHandle {
  reg: RegExp,
  handle: Function
}

// bean状态中心
export class BeanState {

  constructor(Cons: BeanClass) {
    this.beanClass = Cons
  }

  beanClass: BeanClass
  setBeanTask: Function
  // 控制器处理器
  controlMethods: {
    [methodName: string]: Route
  } = {}
  controlMapping: string = ''
  // 依赖注入任务列表
  autowiredTasks: Function[] = []
  // 配置文件属性注入任务列表
  configTasks: Function[] = []
  // 依赖注入完成后执行任务
  initOverTasks: Function[] = []
  // bean创建方式
  scope: BeanScope = BeanScope.SINGLETON
  // bean是否是切面类
  isAspect: Boolean = false
  // 前置切面
  beforeAspects: AspectHandle[] = []
  // 后置切面
  afterAspects: AspectHandle[] = []
  // 环绕切面
  aroundAspects: AspectHandle[] = []
}

// bean多例缓存池对象
export interface BeanCache {
  classMap: Map<BeanClass, BeanInstance>
}