import { BeanClass } from ".";
import { Request, Response } from "express";


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
  doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string): boolean {
    return true
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