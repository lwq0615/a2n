import { doErrHandler } from './exception'
import { AroundInterceptor, Interceptor, NextFunction } from '@core/types'
import { getContext } from '@core/control'

let interceptors: Interceptor[] = []
let aroundInterceptors: AroundInterceptor[] = []

export function setInterceptors(interceptor: Interceptor[], around: AroundInterceptor[]) {
  interceptors = interceptor?.sort((a, b) => a.index - b.index)
  aroundInterceptors = around?.sort((a, b) => a.index - b.index)
}

export async function doFilter(next: NextFunction) {
  const ctx = getContext()
  try {
    // 拦截器
    for (const interceptor of interceptors) {
      if (!(await interceptor.doFilter(ctx))) {
        return
      }
    }
    for (const aroundInterceptor of aroundInterceptors) {
      const oldNext = next
      next = () => aroundInterceptor.doFilter(oldNext, ctx)
    }
    const result = await next()
    ctx.response.send(JSON.stringify(result))
  } catch (err) {
    void doErrHandler(err, ctx)
  }
}
