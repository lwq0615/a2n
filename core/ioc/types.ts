import { Route } from '@core/control/types'
import { BeanClass, BeanInstance, BeanScope } from '@core/types'

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
  get isBean() {
    return Boolean(this.setBeanTask)
  }
  setBeanTask: Function
  isApiExport: boolean = false
  filePath: string
  isControl: boolean = false
  // 控制器处理器
  controlMethods: {
    [methodName: string | symbol]: Route
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
  isAspect: boolean = false
  // 前置切面
  beforeAspects: AspectHandle[] = []
  // 后置切面
  afterAspects: AspectHandle[] = []
  // 环绕切面
  aroundAspects: AspectHandle[] = []
  // 是否已经完成依赖注入
  injectOver: boolean = false
}

// bean多例缓存池对象
export interface BeanCache {
  classMap: Map<BeanClass, BeanInstance>
}