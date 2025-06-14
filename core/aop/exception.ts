/**
 * 全局异常处理
 */
import { ErrHandler } from '@core/types'
import { Request, Response } from 'express'

let errHandlers: ErrHandler[] = []

export function setErrorHandlers(errHandler: ErrHandler[]) {
  errHandlers = errHandler
}

export async function doErrHandler(err: Error, req: Request, res: Response) {
  console.error(err)
  let value: any = 'Internal Server Error'
  res.status(500)
  for (const errHandler of errHandlers) {
    if (typeof errHandler.handler !== 'function') {
      throw new Error('ErrHandler 必须实现方法handler')
    }
    value = await errHandler.handler(err, req, res, value)
  }
  res.send(JSON.stringify(value))
}
