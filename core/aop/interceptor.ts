import { doErrHandler } from './exception'
import { Interceptor, AroundInterceptor } from '@core/types'
import { getContext } from '@core/control'

let interceptors: Interceptor[] = []
let aroundInterceptor: AroundInterceptor = null

export function setInterceptors(interceptor: Interceptor[], around: AroundInterceptor) {
  interceptors = interceptor
  aroundInterceptor = around
}

export async function doFilter(callback: Function) {
  const ctx = getContext()
  try {
    // 拦截器
    for (const interceptor of interceptors) {
      if (typeof interceptor.doFilter !== 'function') {
        throw new Error('Interceptor 必须实现方法doFilter')
      }
      if (!(await interceptor.doFilter(ctx))) {
        return
      }
    }
    let result = null
    // 环绕拦截器
    if (aroundInterceptor) {
      result = await aroundInterceptor.doFilter(callback, ctx)
    } else {
      result = await callback()
    }
    ctx.response.send(JSON.stringify(result))
  } catch (err) {
    doErrHandler(err, ctx)
  }
}
