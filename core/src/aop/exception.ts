/**
 * 全局异常处理
 */
import { ErrHandler } from "./types"
import { Request, Response } from "express";
import { getBeans } from "@/ioc";


export function doErrHandler(err: Error, req: Request, res: Response) {
  console.error(err)
  let value: any = 'Internal Server Error'
  res.status(500)
  for (const errHandler of getBeans(ErrHandler)) {
    if(typeof errHandler.handler !== 'function') {
      throw new Error('ErrHandler 必须实现方法handler')
    }
    value = errHandler.handler(err, req, res, value)
  }
  res.send(JSON.stringify(value))
}