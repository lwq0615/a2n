


export interface StartParam {
  callback?: () => void
}

export type Close = (callback?: (err?: Error) => void) => void

export type Control = <TFunction extends Function>(path: string | TFunction) => any

export type RequestMapping = <T>(path: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>) => any

export type Query = (target: any, methodName?: string, paramIndex?: number) => any

export type Body = (target: any, methodName?: string, paramIndex?: number) => any