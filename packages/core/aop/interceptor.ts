import { AroundInterceptor, Interceptor } from '@/aop/types'
import { Request, Response } from "express";
import { doErrHandler } from './exception';

/**
 * 数组存储拦截器，数组内拦截器会顺序执行
 */
const interceptors: Interceptor[] = []

/**
 * 环绕拦截器，只允许存在一个环绕拦截器，新的拦截器会覆盖旧的
 * 环绕拦截器会在普通的拦截器之后执行
 */
let aroundInterceptor: AroundInterceptor = null



// 添加拦截器
export function addInterceptor(interceptor: Interceptor) {
  interceptors.push(interceptor)
}

// 注销拦截器
export function removeInterceptor(interceptor: Interceptor) {
  interceptors.splice(interceptors.indexOf(interceptor), 1)
}

export function setAroundInterceptor(interceptor: AroundInterceptor) {
  aroundInterceptor = interceptor
}

export function removeAroundInterceptor() {
  aroundInterceptor = null
}

export async function doFilter(callback: Function, req: Request, res: Response) {
  try {
    // 拦截器
    for (const interceptor of interceptors) {
      if (!interceptor(req, res)) {
        return
      }
    }
    let result = null
    // 环绕拦截器
    if (aroundInterceptor) {
      result = await aroundInterceptor(callback, req, res)
    } else {
      result = await callback()
    }
    res.send(result)
  }catch(err) {
    doErrHandler(err, req, res)
  }
}
