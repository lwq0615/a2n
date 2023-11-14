import { BeanClass } from "@/types";
import { Request, Response } from "express";
import { doErrHandler } from './exception';
import { Interceptor, AroundInterceptor } from "@/types";

let interceptors: Interceptor[] = []
let aroundInterceptor: AroundInterceptor = null

export function setInterceptors(interceptor: Interceptor[], around: AroundInterceptor) {
  interceptors = interceptor
  aroundInterceptor = around
}

export async function doFilter(callback: Function, req: Request, res: Response, Cons: BeanClass, methodName: string) {
  try {
    // 拦截器
    for (const interceptor of interceptors) {
      if(typeof interceptor.doFilter !== 'function') {
        throw new Error('Interceptor 必须实现方法doFilter')
      }
      if (!await interceptor.doFilter(req, res, Cons, methodName)) {
        return
      }
    }
    let result = null
    // 环绕拦截器
    if (aroundInterceptor) {
      result = await aroundInterceptor.doFilter(callback, req, res, Cons, methodName)
    } else {
      result = await callback()
    }
    res.send(JSON.stringify(result))
  }catch(err) {
    doErrHandler(err, req, res)
  }
}
