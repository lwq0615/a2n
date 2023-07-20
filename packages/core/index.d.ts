import { Express } from 'express-serve-static-core';
import { StartParam } from './express'
import { Interceptor, AroundInterceptor, ErrHandler } from './index'
import { Request, Response } from 'express';

declare namespace a2n {

  /**
   * 拦截器
   */
  var Interceptor: Interceptor

  /**
   * 环绕拦截器
   */
  var AroundInterceptor: AroundInterceptor

  /**
   * 异常处理器
   */
  var ErrHandler: ErrHandler

  /**
   * express对象，不推荐操作此对象
   */
  var app: Express

  /**
   * 请求对象
   */
  var Request: Request

  /**
   * 响应对象
   */
  var Response: Response

  /**
   * 启动服务器
   */
  function start(config: StartParam): undefined

  /**
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Controll: (p: string | object) => undefined

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Service: (p: object) => undefined

  /**
   * 为属性进行依赖注入
   * @param Cons 依赖注入的对象构造器类型
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  var Autowired: (Cons: any, required?: boolean) => PropertyDecorator

  /**
   * 将类上的方法注册为接口，参数是接口地址
   */
  var Get: (path: string) => MethodDecorator
  var Post: (path: string) => MethodDecorator
  var Put: (path: string) => MethodDecorator
  var Delete: (path: string) => MethodDecorator
  var RequestMapping: (path: string) => MethodDecorator

  /**
   * 将url上携带的所有参数注入到接口参数
   * 装饰器可以携带一个参数，含义是url上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Query: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将post请求携带的报文参数注入到接口参数
   * 装饰器可以携带一个参数，含义是报文上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Body: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将requset对象注入到接口参数
   */
  var Req: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将requset对象注入到接口参数
   */
  var Res: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 所有bean注入容器完成时调用
   */
  var initBeanFinish: Function

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）或者bean名称
   */
  var getBean: (Cons: object | string) => any

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）
   */
  var getBeans: (Cons: object) => []

}

export = a2n