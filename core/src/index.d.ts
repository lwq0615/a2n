import * as A2n from './index'
import { Express } from 'express-serve-static-core';
import * as express from "express";


declare namespace a2n {

  /**
   * 拦截器
   * 继承Interceptor并注入到bean可开启拦截器
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
   * 标记类为切面类
   * 类上添加@Aspect，类下的@Before，@After，@Around都会被注册为切面控制器
   */
  var Aspect: typeof A2n.Aspect

  /**
   * 前置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  var Before: typeof A2n.Before

  /**
   * 后置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  var After: typeof A2n.After

  /**
   * 环绕切面控制器，如果匹配了多个环绕控制器，只生效第一个
   * 控制器提供参数 callback: 可调用的代理类原执行方法, Cons: 代理的类, name: 代理类执行的方法名
   */
  var Around: typeof A2n.Around

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
  var start: typeof A2n.start

  /**
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Control: typeof A2n.Control

  /**
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  var Service: typeof A2n.Service

  /**
   * 标记一个类bean对象，该对象将会注册一个实例到bean容器中
   */
  var Bean: typeof Service

  /**
   * 设置bean的创建方式
   */
  var Scope: typeof A2n.Scope

  /**
   * bean的创建方式枚举，单例：SINGLETON，多例：PROTOTYPE
   */
  var BeanScope: typeof A2n.BeanScope

  /**
   * 将a2n.config.js配置文件中的值注入属性
   */
  var Config: typeof A2n.Config

  /**
   * 为属性进行依赖注入
   * @param Cons: BeanClass | string (依赖注入的对象构造器类型 | bean名称)
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  var Autowired: typeof A2n.Autowired

  /**
   * 将类上的方法注册为接口
   * @param path 接口地址
   */
  var RequestMapping: typeof A2n.RequestMapping
  var Get: typeof A2n.Get
  var Post: typeof A2n.Post
  var Put: typeof A2n.Put
  var Delete: typeof A2n.Delete

  /**
   * 当前bean依赖注入完成后执行
   */
  var PostConstruct: typeof A2n.PostConstruct

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

  /**
   * bean的构造器类型（Class对象）
   */
  var BeanClass: typeof A2n.BeanClass

  /**
   * bean对象实例
   */
  var BeanInstance: typeof A2n.BeanInstance

}

export = a2n