import { BeanClass } from "."


export interface RunConfig {
  port?: number,
  componentScan?: string,
  [name: string]: any
}

export interface StartParam {
  config: RunConfig,
  callback?: () => void
}

export type start = (startParam: StartParam) => void

export type close = (callback?: (err?: Error) => void) => void

export type Control = (path: string | BeanClass) => any

export type RequestMapping = (path: string) => MethodDecorator

export type Query = (target: any, methodName?: string, paramIndex?: number) => any

export type Body = (target: any, methodName?: string, paramIndex?: number) => any