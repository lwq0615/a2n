
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
  REQUEST = 'request',
  RESPONSE = 'response'
}
