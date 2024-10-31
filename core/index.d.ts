import { Express } from 'express-serve-static-core'
import * as express from 'express'
import * as types from './types'

declare namespace a2n {

  /**
   * 拦截器
   * 继承Interceptor并注入到bean可开启拦截器
   */
  const Interceptor: typeof types.Interceptor

  /**
   * 环绕拦截器
   */
  const AroundInterceptor: typeof types.AroundInterceptor

  /**
   * 异常处理器
   */
  const ErrHandler: typeof types.ErrHandler

  /**
   * 标记类为切面类
   * 类上添加@Aspect，类下的@Before，@After，@Around都会被注册为切面控制器
   */
  const Aspect: ClassDecorator

  /**
   * 前置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  const Before: types.AspectHandler

  /**
   * 后置切面控制器
   * 控制器提供参数 Cons: 代理的类, name: 代理类执行的方法名
   */
  const After: types.AspectHandler

  /**
   * 环绕切面控制器，如果匹配了多个环绕控制器，只生效第一个
   * 控制器提供参数 callback: 可调用的代理类原执行方法, Cons: 代理的类, name: 代理类执行的方法名
   */
  const Around: types.AspectHandler

  /**
   * express对象，不推荐操作此对象
   */
  const app: Express

  /**
   * 请求对象类型
   */
  type Request = express.Request

  /**
   * 响应对象类型
   */
  type Response = express.Response

  /**
   * 启动服务器
   */
  const close: types.close

  /**
   * @param path 接口路径
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  const Control: types.Control

  /**
   * 将一个类导出为接口，该类的请求方法会被注册到express
   * 建议每个文件最多将一个类标注为ApiExport
   */
  const ApiExport: ClassDecorator

  /**
   * @param source bean名称
   * 标记一个类业务层bean对象，该对象将会注册一个实例到bean容器中
   */
  const Service: types.Service

  /**
   * 标记一个类bean对象，该对象将会注册一个实例到bean容器中
   */
  const Bean: types.Service

  /**
   * 设置bean的创建方式
   */
  const Scope: types.Scope

  /**
   * bean的创建方式枚举，单例：SINGLETON，多例：PROTOTYPE
   */
  const BeanScope: typeof types.BeanScope

  /**
   * 将a2n.config.js配置文件中的值注入属性
   * @param name 配置文件属性名称
   */
  const Config: types.Config

  /**
   * 获取当前程序配置
   */
  const getConfig: () => types.RunConfig

  /**
   * 为属性进行依赖注入
   * @param Cons: BeanClass | string (依赖注入的对象构造器类型 | bean名称)
   * @param required 在容器中没有查询到该类型对象时是否抛出异常
   */
  const Autowired: types.Autowired

  /**
   * 将类上的方法注册为接口
   * @param path 接口地址
   */
  const RequestMapping: types.RequestMapping
  const Get: types.RequestMapping
  const Post: types.RequestMapping
  const Put: types.RequestMapping
  const Delete: types.RequestMapping

  /**
   * 当前bean依赖注入完成后执行
   */
  const PostConstruct: MethodDecorator

  /**
   * 将url上携带的所有参数注入到接口参数
   * 装饰器可以携带一个参数，含义是url上的某个参数名称，会将该参数的值注入到接口参数
   */
  const Query: types.Query

  /**
   * 将post请求携带的报文参数注入到接口参数
   * 装饰器可以携带一个参数，含义是报文上的某个参数名称，会将该参数的值注入到接口参数
   */
  const Body: types.Body

  /**
   * 将requset对象注入到接口参数
   */
  const Req: ParameterDecorator

  /**
   * 将requset对象注入到接口参数
   */
  const Res: ParameterDecorator

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）或者bean名称
   */
  const getBean: types.getBean

  /**
   * 获取容器中的bean
   * @param Cons bean的构造器类型（Class对象）
   */
  const getBeans: types.getBeans

  /**
   * bean的构造器类型（Class对象）
   */
  type BeanClass = types.BeanClass

  /**
   * bean对象实例
   */
  type BeanInstance = types.BeanInstance

}

export = a2n