

/**
 * bean的构造器类型（Class对象）
 */
export interface BeanClass {
  new(): BeanInstance | any
}

/**
 * bean对象实例
 */
export type BeanInstance = {
  constructor: BeanClass,
  [fieldName: string]: any
}

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

export type Autowired = (Cons: string | BeanClass | Promise<any>, required?: boolean) => PropertyDecorator

export type getBean = <T = BeanInstance>(Cons: BeanClass | string) => Promise<T>

export type getBeans = <T = BeanInstance>(Cons: BeanClass) => Promise<T[]>