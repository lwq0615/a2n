import { Request, Response } from 'express'
import { BeanClass } from '.'

export type AspectHandle = (Cons: BeanClass, name: string) => void
export type AroundAspectHandle = (callback: Function, Cons: BeanClass, name: string) => any

export interface AspectItem {
  reg?: RegExp
  decorator?: Function
  handle: AspectHandle | AroundAspectHandle
}

/**
 * 拦截器
 */
export abstract class Interceptor {
  /**
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的控制器Class
   * @param methodName 请求进入的控制器方法名称
   * @return true：不拦截，false：拦截请求
   */
  abstract doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string): Promise<boolean>
}


/**
 * 环绕拦截器
 * 环绕拦截器最多只能注册一个
 */
export abstract class AroundInterceptor {
  /**
   * @param callback 要执行的控制器方法
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的控制器Class
   * @param methodName 请求进入的控制器方法名称
   * @return 拦截器返回的值会作为请求响应值
   */
  abstract doFilter(callback: Function, req: Request, res: Response, Cons: BeanClass, methodName: string): Promise<any>
}

/**
 * 异常处理器
 */
export abstract class ErrHandler {
  /**
   * @param err 错误对象
   * @param req 请求对象
   * @param res 响应对象
   * @param value 上一个异常处理器传递的响应返回值
   * @return 请求的响应返回值
   */
  abstract handler(err: Error, req: Request, res: Response, value?: any): any
}

/**
 * 切面处理器
 */
export type AspectHandler = (match: RegExp | Function) => MethodDecorator

export abstract class AppLifecycle {
  abstract afterAppStart(): void
}