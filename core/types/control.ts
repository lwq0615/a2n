

/**
 * 请求方法
 */
export enum Method{
  ALL = 'use',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}


/**
 * 路由信息
 */
export class Route {
  path: string = null
  type: Method = Method.ALL
  handler: Function = null
  params: ParamInfo[] = []
  paramNames: string[] = []
}


/**
 * 参数信息
 */
export interface ParamInfo{
  type: ParamType,
  name?: string
}


/**
 * 参数类型
 */
export enum ParamType{
  QUERY = 'query',
  BODY = 'body',
  PARAM = 'param',
  REQUEST = 'request',
  RESPONSE = 'response'
}


export interface StartParam {
  callback?: () => void
}

export type Close = (callback?: (err?: Error) => void) => void

export interface Control {
  (path: string): ClassDecorator
  <TFunction extends Function>(target: TFunction): TFunction | void
}

export interface RequestMapping {
  (path: string): MethodDecorator
  <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface RequestParamDecorator {
  (name: string): ParameterDecorator
  (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void
}