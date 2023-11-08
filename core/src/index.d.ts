import { Express } from 'express-serve-static-core';
import * as express from "express";

interface Config {
  port?: number,
  componentScan?: string,
  [name: string]: any
}
interface StartParam {
  config: Config,
  callback?: () => void
}

declare namespace a2n {

  /**
   * 拦截器
   * 继承Interceptor并注入到bean可开启拦截器
   */
  class Interceptor {
    /**
     * @param req 请求对象
     * @param res 响应对象
     * @param Cons 请求进入的控制器Class
     * @param methodName 请求进入的控制器方法名称
     * @return true：不拦截，false：拦截请求
     */
    doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string): boolean
  }

  /**
   * 环绕拦截器
   */
  class AroundInterceptor {
    /**
     * @param callback 要执行的控制器方法
     * @param req 请求对象
     * @param res 响应对象
     * @param Cons 请求进入的控制器Class
     * @param methodName 请求进入的控制器方法名称
     * @return 拦截器返回的值会作为请求响应值
     */
    doFilter(callback: Function, req: Request, res: Response, Cons: BeanClass, methodName: string): any
  }

  /**
   * 异常处理器
   */
  class ErrHandler {
    /**
     * @param err 错误对象
     * @param req 请求对象
     * @param res 响应对象
     * @param value 上一个异常处理器传递的响应返回值
     * @return 请求的响应返回值
     */
    handler(err: Error, req: Request, res: Response, value?: any): any
  }

  /**
   * 标记类为切面类
   * 类上添加@Aspect，类下的@Before，@After，@Around都会被注册为切面控制器
   */
  var Aspect: ClassDecorator

  /**
   * 前置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  var Before: (reg: RegExp) => MethodDecorator

  /**
   * 后置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  var After: typeof Before

  /**
   * 环绕切面控制器，如果匹配了多个环绕控制器，只生效第一个
   * 控制器提供参数 callback: 可调用的代理类原执行方法, Cons: 代理的类, name: 代理类执行的方法名
   */
  var Around: typeof Before

  /**
   * express对象，不推荐操作此对象
   */
  var app: Express

  /**
   * 请求对象类型
   */
  interface Request extends express.Request { }

  /**
   * 响应对象类型
   */
  interface Response extends express.Response { }

  /**
   * 启动服务器
   */
  var start: (startParam: StartParam) => void

  /**
   * 启动服务器
   */
  var close: (callback?: (err?: Error) => void) => void

  /**
   * @param path 接口路径
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Control: (path: string | BeanClass) => any

  /**
   * @param source bean名称
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Service: (source: string | BeanClass) => any

  /**
   * 标记一个类bean对象，该对象将会注册一个实例到bean容器中
   */
  var Bean: typeof Service

  /**
   * 设置bean的创建方式
   */
  var Scope: (scope: BeanScope) => ClassDecorator

  /**
   * bean的创建方式枚举，单例：SINGLETON，多例：PROTOTYPE
   */
  enum BeanScope{
    // 单例
    SINGLETON = 0,
    // 多例
    PROTOTYPE = 1
  }

  /**
   * 将a2n.config.js配置文件中的值注入属性
   * @param name 配置文件属性名称
   */
  var Config: (name: string) => PropertyDecorator

  /**
   * 为属性进行依赖注入
   * @param Cons: BeanClass | string (依赖注入的对象构造器类型 | bean名称)
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  var Autowired: (Cons: string | BeanClass | Promise<any>, required: boolean) => PropertyDecorator

  /**
   * 将类上的方法注册为接口
   * @param path 接口地址
   */
  var RequestMapping: (path: string) => MethodDecorator
  var Get: typeof RequestMapping
  var Post: typeof RequestMapping
  var Put: typeof RequestMapping
  var Delete: typeof RequestMapping

  /**
   * 当前bean依赖注入完成后执行
   */
  var PostConstruct: MethodDecorator

  /**
   * 将url上携带的所有参数注入到接口参数
   * 装饰器可以携带一个参数，含义是url上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Query: (target: any, methodName?: string, paramIndex?: number) => any

  /**
   * 将post请求携带的报文参数注入到接口参数
   * 装饰器可以携带一个参数，含义是报文上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Body: (target: any, methodName?: string, paramIndex?: number) => any

  /**
   * 将requset对象注入到接口参数
   */
  var Req: ParameterDecorator

  /**
   * 将requset对象注入到接口参数
   */
  var Res: ParameterDecorator

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）或者bean名称
   */
  function getBean<T = BeanInstance>(Cons: BeanClass | string): Promise<T>

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）
   */
  function getBeans<T = BeanInstance>(Cons: BeanClass | string): Promise<T[]>

  /**
   * bean的构造器类型（Class对象）
   */
  interface BeanClass {
    new(): BeanInstance | any
  }

  /**
   * bean对象实例
   */
  type BeanInstance = {
    constructor: BeanClass,
    [fieldName: string]: any
  }

}

export = a2n