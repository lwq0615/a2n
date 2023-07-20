import { Request, Response } from "express";


/**
 * 拦截器
 */
export class Interceptor {
  /**
   * @param req 请求对象
   * @param res 响应对象
   * @return true：不拦截，false：拦截请求
   */
  doFilter(req: Request, res: Response): boolean {
    res.send('request filter faild')
    return false
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
   * @return 拦截器返回的值会作为请求响应值
   */
  async doFilter(callback: Function, req: Request, res: Response): Promise<any> {
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