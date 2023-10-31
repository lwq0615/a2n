import * as A2n from './index'
import { Express } from 'express-serve-static-core';
import * as express from "express";


declare namespace a2n {

  /**
   * 拦截器
   */
  var Interceptor: typeof A2n.Interceptor

  /**
   * 环绕拦截器
   */
  var AroundInterceptor: typeof A2n.AroundInterceptor

  /**
   * 异常处理器
   */
  var ErrHandler: typeof A2n.ErrHandler

  /**
   * express对象，不推荐操作此对象
   */
  var app: Express

  /**
   * 请求对象
   */
  interface Request extends express.Request { }

  /**
   * 响应对象
   */
  interface Response extends express.Response { }

  /**
   * 启动服务器
   */
  var start: typeof A2n.start

  /**
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Controll: typeof A2n.Controll

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Service: typeof A2n.Service

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Bean: typeof Service

  /**
   * 将a2n.config.js配置文件中的值注入属性
   */
  var Config: typeof A2n.Config

  /**
   * 为属性进行依赖注入
   * @param Cons 依赖注入的对象构造器类型
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  var Autowired: typeof A2n.Autowired

  /**
   * 将类上的方法注册为接口，参数是接口地址
   */
  var RequestMapping: typeof A2n.RequestMapping
  var Get: typeof A2n.Get
  var Post: typeof A2n.Post
  var Put: typeof A2n.Put
  var Delete: typeof A2n.Delete

  /**
   * 将url上携带的所有参数注入到接口参数
   * 装饰器可以携带一个参数，含义是url上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Query: typeof A2n.Query

  /**
   * 将post请求携带的报文参数注入到接口参数
   * 装饰器可以携带一个参数，含义是报文上的某个参数名称，会将该参数的值注入到接口参数
   */
  var Body: typeof A2n.Body

  /**
   * 将requset对象注入到接口参数
   */
  var Req: typeof A2n.Req

  /**
   * 将requset对象注入到接口参数
   */
  var Res: typeof A2n.Res

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）或者bean名称
   */
  var getBean: typeof A2n.getBean

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）
   */
  var getBeans: typeof A2n.getBeans

}

export = a2n