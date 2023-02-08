
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
  params: ParamType[]
}


/**
 * 参数类型
 */
export enum ParamType{
  QUERY = 'query',
  BODY = 'body'
}