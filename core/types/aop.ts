import { BeanClass, Context } from '.'

export type AspectHandle = (Cons: BeanClass, name: string) => void
export type AroundAspectHandle = (callback: Function, Cons: BeanClass, name: string) => any

export interface AspectItem {
  reg?: RegExp
  decorator?: Function
  handle: AspectHandle | AroundAspectHandle
}

export type NextFunction = () => Promise<any>

/**
 * 拦截器
 */
export abstract class Interceptor {
  /**
   * 拦截器的处理顺序，值越小越先执行
   */
  index = 0
  /**
   * @param ctx 请求上下文
   * @return true：不拦截，false：拦截请求
   */
  abstract doFilter(ctx: Context): Promise<boolean> | boolean
}

/**
 * 环绕拦截器
 * 环绕拦截器最多只能注册一个
 */
export abstract class AroundInterceptor {
  /**
   * 拦截器的处理顺序，值越小越先执行
   */
  index = 0
  /**
   * @param callback 要执行的控制器方法
   * @param ctx 请求上下文
   * @return 拦截器返回的值会作为请求响应值
   */
  abstract doFilter(callback: NextFunction, ctx: Context): Promise<any>
}

/**
 * 异常处理器
 */
export abstract class ErrHandler {
  /**
   * 错误处理器的处理顺序，值越小越先执行
   */
  index = 0
  /**
   * @param err 错误对象
   * @param ctx 请求上下文
   * @param value 上一个异常处理器传递的响应返回值
   * @return 请求的响应返回值
   */
  abstract handler(err: Error, ctx: Context, value?: any): any
}

/**
 * 切面处理器
 */
export type AspectHandler = (match: RegExp | Function) => MethodDecorator

/**
 * 应用生命周期
 */
export abstract class AppLifecycle {
  // 应用启动后，此时bean已经全部完成注入
  afterAppStart() {}
  // 应用关闭后
  afterAppClose() {}
}
