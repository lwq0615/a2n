
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
export interface Route {
  path: string
  type: Method
  handler: Function,
  params: ParamInfo[]
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
  REQUEST = 'request',
  RESPONSE = 'response'
}