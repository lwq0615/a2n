/**
 * 全局异常处理
 */
import { ErrHandler } from "./types"
import { Request, Response } from "express";


let errHandlers: ErrHandler[] = []


export function addErrHandler(handler: ErrHandler) {
  errHandlers.push(handler)
}

export function removeErrHandler(handler: ErrHandler) {
  errHandlers.splice(errHandlers.indexOf(handler), 1)
}

export function doErrHandler(err: Error, req: Request, res: Response) {
  console.error(err)
  let value: any = 'Internal Server Error'
  for (const handler of errHandlers) {
    value = handler(err, req, res, value)
  }
  res.status(500).send(value)
}