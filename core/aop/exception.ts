/**
 * 全局异常处理
 */
import { Context, ErrHandler } from '@core/types'

let errHandlers: ErrHandler[] = []

export function setErrorHandlers(errHandler: ErrHandler[]) {
  errHandlers = errHandler?.sort((a, b) => a.index - b.index)
}

export async function doErrHandler(err: Error, ctx: Context) {
  console.error(err)
  let value: any = 'Internal Server Error'
  ctx.response.status(500)
  for (const errHandler of errHandlers) {
    if (typeof errHandler.handler !== 'function') {
      throw new Error('ErrHandler 必须实现方法handler')
    }
    value = await errHandler.handler(err, ctx, value)
  }
  ctx.response.send(JSON.stringify(value))
}
