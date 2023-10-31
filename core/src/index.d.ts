import { Express } from 'express-serve-static-core';
import {
  Interceptor,
  AroundInterceptor,
  ErrHandler,
  Service as A2nService,
  Bean as A2nAutowired
} from './index'
import { start as A2nStart } from './express';
import { Controll as A2nControll } from './control/Controll'
import * as RequestMethods from './control/RequestMethod'
import { Request, Response } from 'express';
import * as ParamType from './control/ParamType'
import { Config as A2nConfig } from './ioc/Config';
import * as A2nBean from './ioc/beans'
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
  var start: typeof A2nStart

  /**
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Controll: typeof A2nControll

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Service: typeof A2nService

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Bean: typeof Autowired

  /**
   * 将a2n.config.js配置文件中的值注入属性
   */
  var Config: typeof A2nConfig

  /**
   * 为属性进行依赖注入
   * @param Cons 依赖注入的对象构造器类型
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  var Autowired: typeof A2nAutowired

  /**
   * 将类上的方法注册为接口，参数是接口地址
   */
  var RequestMapping: typeof RequestMethods.RequestMapping
  var Get: typeof RequestMethods.Get
  var Post: typeof RequestMethods.Post
  var Put: typeof RequestMethods.Put
  var Delete: typeof RequestMethods.Delete

  /**
   * 将url上携带的所有参数注入到接口参数
   * 装饰器可以携带一个参数，含义是url上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Query: typeof ParamType.Query

  /**
   * 将post请求携带的报文参数注入到接口参数
   * 装饰器可以携带一个参数，含义是报文上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Body: typeof ParamType.Body

  /**
   * 将requset对象注入到接口参数
   */
  var Req: typeof ParamType.Req

  /**
   * 将requset对象注入到接口参数
   */
  var Res: typeof ParamType.Res

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）或者bean名称
   */
  var getBean: typeof A2nBean.getBean

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）
   */
  var getBeans: typeof A2nBean.getBeans

}

export = a2n