import { BeanClass } from "@/types";
import { Request, Response } from "express";
import { doErrHandler } from './exception';
import { Interceptor } from "@/types";

let interceptors: Interceptor[] = []

export function setInterceptors(interceptor: Interceptor[]) {
  interceptors = interceptor
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
    let result = await callback()
    res.send(JSON.stringify(result))
  }catch(err) {
    doErrHandler(err, req, res)
  }
}
