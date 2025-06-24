import { AspectItem } from './aop'
import { MethodParams, Route } from './control'

export interface Autowired {
  (Cons: string | Promise<any>): PropertyDecorator
  (target: object, propertyKey: string): void
}

// bean状态中心
export class BeanState {
  constructor(Cons: BeanClass) {
    if (Cons === Object) {
      throw new Error('错误的参数Object')
    }
    this.beanClass = Cons
  }

  filePath: string = ''
  beanClass: BeanClass
  classDecorators: Set<Function> = new Set()
  methodDecorators: { [name: string | symbol]: Set<Function> } = {}
  fieldDecorators: { [name: string | symbol]: Set<Function> } = {}
  // 添加类装饰器
  addClassDecorator(decorator: Function) {
    this.classDecorators.add(decorator)
  }
  // 添加属性装饰器
  addFieldDecorator(name: string | symbol, decorator: Function) {
    if (typeof this.beanClass.prototype[name] === 'function') {
      if (!this.methodDecorators[name]) {
        this.methodDecorators[name] = new Set()
      }
      this.methodDecorators[name].add(decorator)
    } else {
      if (!this.fieldDecorators[name]) {
        this.fieldDecorators[name] = new Set()
      }
      this.fieldDecorators[name].add(decorator)
    }
  }
  /**
   * 判断【类|方法|属性】是否添加了装饰器
   * @param decorator 装饰器
   * @param name 可选，方法or属性名称
   * @returns
   */
  hasDecorator(decorator: Function, name?: string) {
    if (name) {
      return this.methodDecorators[name]?.has(decorator) || this.fieldDecorators[name]?.has(decorator)
    }
    return this.classDecorators.has(decorator)
  }
  setBeanTask?: Function
  // 控制器处理器
  controlMethods: {
    [methodName: string | symbol]: Route | undefined
  } = {}
  // 控制器参数
  methodParams: {
    [methodName: string | symbol]: MethodParams | undefined
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
  // 自定义装饰器的各个逻辑
  customDecorator: {} = {}
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
  // 单例（默认）
  SINGLETON = 0,
  // 多例
  PROTOTYPE = 1,
  // 请求作用域
  REQUEST = 2,
}

export type Scope = (scope: BeanScope) => ClassDecorator

export type Config = (name: string) => PropertyDecorator

export interface RunConfig {
  port?: number
  baseUrl?: string
  componentScan?: string
  apiExport?: {
    baseUrl?: string
  }
  [name: string]: any
}

export interface GetBean {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>>
  <T extends BeanInstance>(name: string): Promise<T>
}

export interface GetBeans {
  <T extends BeanClass = BeanClass>(Cons: T): Promise<BeanInstance<T>[]>
  <T extends BeanClass = BeanClass>(flag: (state: BeanState) => boolean): Promise<BeanInstance<T>[]>
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
 * @param name 方法or属性名称，如果传入则注册为方法or属性装饰器，否则注册为类装饰器
 */
export interface RegisterCustomerDecorator {
  (decorator: Function, Cons: BeanClass | object, name?: string | symbol): void
}
