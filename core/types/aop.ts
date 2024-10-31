import { Request, Response } from 'express'
import { BeanClass } from '.'


/**
 * 拦截器
 */
export class Interceptor {
  /**
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的控制器Class
   * @param methodName 请求进入的控制器方法名称
   * @return true：不拦截，false：拦截请求
   */
  async doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string): Promise<boolean> {
    return true
  }
}

/**
 * 环绕拦截器
 * 环绕拦截器最多只能注册一个
 */
export class AroundInterceptor {
  /**
   * @param callback 要执行的控制器方法
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的控制器Class
   * @param methodName 请求进入的控制器方法名称
   * @return 拦截器返回的值会作为请求响应值
   */
  async doFilter(callback: Function, req: Request, res: Response, Cons: BeanClass, methodName: string): Promise<any> {
    return await callback()
  }
}

/**
 * 异常处理器
 */
export class ErrHandler {
  /**
   * @param err 错误对象
   * @param req 请求对象
   * @param res 响应对象
   * @param value 上一个异常处理器传递的响应返回值
   * @return 请求的响应返回值
   */
  handler(err: Error, req: Request, res: Response, value?: any): any {
    return value
  }
}

/**
 * 切面处理器
 */
export type AspectHandler = (reg: RegExp) => MethodDecorator

export class AppLifecycle {
  async afterAppStart() {

  }
}