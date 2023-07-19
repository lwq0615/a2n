import { Request, Response } from "express";


/**
 * 环绕拦截器
 * 环绕拦截器最多只能注册一个
 * @param callback 要执行的控制器方法
 * @param req 请求对象
 * @param res 响应对象
 * @return 拦截器返回的值会作为请求响应值
 */
export type AroundInterceptor = (callback?: Function, req?: Request, res?: Response) => any

/**
 * 拦截器
 * @param req 请求对象
 * @param res 响应对象
 */
export type Interceptor = (req?: Request, res?: Response) => boolean

/**
 * 异常处理器
 */
export type ErrHandler = (err?: Error, req?: Request, res?: Response) => void