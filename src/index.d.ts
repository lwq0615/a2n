

declare namespace a2n {

  /**
   * 启动服务器
   */
  function start(port: number, callback: any): undefined

  /**
   * 标记一个类为控制器，控制器下的请求方法会被注册到express
   */
  var Controll: (p: string | object) => undefined

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
  var Request: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将requset对象注入到接口参数
   */
  var Req: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将requset对象注入到接口参数
   */
  var Response: (target: any, methodName?: string, paramIndex?: number) => undefined

  /**
   * 将requset对象注入到接口参数
   */
  var Res: (target: any, methodName?: string, paramIndex?: number) => undefined

}

export = a2n