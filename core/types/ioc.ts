

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

export type getBean = <T extends BeanClass = BeanClass>(Cons: T | string) => Promise<BeanInstance<T>>

export type getBeans = <T extends BeanClass = BeanClass>(Cons: T) => Promise<BeanInstance<T>[]>