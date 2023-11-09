import { Route } from "@/control/types"
import { BeanClass, BeanInstance, BeanScope } from "@/types"

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
  isControl: Boolean = false
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