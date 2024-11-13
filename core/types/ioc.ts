import { AspectItem } from './aop'
import { Route } from './control'

// bean多例缓存池对象
export interface BeanCache {
  classMap: Map<BeanClass, BeanInstance>
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
  beforeAspects: AspectItem[] = []
  // 后置切面
  afterAspects: AspectItem[] = []
  // 环绕切面
  aroundAspects: AspectItem[] = []
  // 是否已经完成依赖注入
  injectOver: boolean = false
}

/**
 * bean的构造器类型（Class对象）
 */
export type BeanClass = abstract new (...args: any) => any
/**
 * bean对象实例
 */
export type BeanInstance<T extends BeanClass = BeanClass> = InstanceType<T>

/**
 * @param source bean名称
 * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
 */
export type Service = (source: string | BeanClass) => any

export enum BeanScope {
  // 单例
  SINGLETON = 0,
  // 多例
  PROTOTYPE = 1
}

export type Scope = (scope: BeanScope) => ClassDecorator

export type Config = (name: string) => PropertyDecorator

export interface RunConfig {
  port?: number,
  baseUrl?: string,
  componentScan?: string,
  apiExport?: {
    baseUrl?: string
  }
  [name: string]: any
}

export type Autowired = (Cons: string | BeanClass | Promise<any>, required?: boolean) => PropertyDecorator

export interface getBean {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>>
  <T extends BeanInstance>(name: string): Promise<T>
}

export interface getBeans {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>[]>
  <T extends BeanClass = BeanClass>(flag: ((state: BeanState) => boolean)): Promise<BeanInstance<T>[]>
}

export interface getBeanStateList {
  (): BeanState[]
}