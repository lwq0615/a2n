import { getBeans } from "@/ioc";
import { Request, Response } from "express";
import { doErrHandler } from './exception';
import { Interceptor, AroundInterceptor } from "./types";


export async function doFilter(callback: Function, req: Request, res: Response) {
  try {
    // 拦截器
    for (const interceptor of getBeans(Interceptor)) {
      if(typeof interceptor.doFilter !== 'function') {
        throw new Error('Interceptor 必须实现方法doFilter')
      }
      if (!interceptor.doFilter(req, res)) {
        return
      }
    }
    let result = null
    const aroundInterceptor = getBeans(AroundInterceptor)?.[0]
    // 环绕拦截器
    if (aroundInterceptor) {
      result = await aroundInterceptor.doFilter(callback, req, res)
    } else {
      result = await callback()
    }
    res.send(JSON.stringify(result))
  }catch(err) {
    doErrHandler(err, req, res)
  }
}
