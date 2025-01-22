import { AspectItem } from './aop'
import { Route } from './control'

// bean多例缓存池对象
export interface BeanCache {
  classMap: Map<BeanClass, BeanInstance>
}

// bean状态中心
export class BeanState {

  constructor(Cons: BeanClass) {
    if (Cons === Object) {
      throw new Error('错误的参数Object')
    }
    this.beanClass = Cons
  }

  beanClass: BeanClass
  classDecorators: Function[] = []
  methodDecorators: { [name: string | symbol]: Function[] } = {}
  fieldDecorators: { [name: string | symbol]: Function[] } = {}
  addClassDecorator(decorator: Function) {
    this.classDecorators.push(decorator)
  }
  addMethodDecorator(name: string | symbol, decorator: Function) {
    if (!this.methodDecorators[name]) {
      this.methodDecorators[name] = []
    }
    this.methodDecorators[name].push(decorator)
  }
  addFieldDecorator(name: string | symbol, decorator: Function) {
    if (!this.fieldDecorators[name]) {
      this.fieldDecorators[name] = []
    }
    this.fieldDecorators[name].push(decorator)
  }
  /**
   * 判断【类|方法|属性】是否添加了装饰器
   * @param decorator 装饰器
   * @param methodName 可选，方法名称
   * @returns
   */
  hasDecorator(decorator: Function, name?: string | symbol) {
    if (name) {
      return this.methodDecorators[name]?.includes(decorator) || this.fieldDecorators[name]?.includes(decorator)
    }
    return this.classDecorators.includes(decorator)
  }
  setBeanTask: Function
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

export interface GetBean {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>>
  <T extends BeanInstance>(name: string): Promise<T>
}

export interface GetBeans {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>[]>
  <T extends BeanClass = BeanClass>(flag: ((state: BeanState) => boolean)): Promise<BeanInstance<T>[]>
}

export interface GetBeanState {
  (Cons: BeanClass): BeanState | undefined
}

export interface GetBeanStateList {
  (): BeanState[]
}

/**
 * 注册自定义装饰器
 * @param decorator 装饰器函数
 * @param Cons bean类型
 * @param name 方法名称，如果传入则注册为方法装饰器，否则注册为类装饰器
 */
export interface RegisterCustomerDecorator {
  (decorator: Function, Cons: BeanClass, name?: string | symbol): void
}
