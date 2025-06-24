import { Request, Response } from 'express'
import { BeanClass } from '.'

/**
 * 请求方法
 */
export enum Method {
  ALL = 'use',
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

/**
 * 路由信息
 */
export interface Route {
  path?: string
  type: Method
}

export interface MethodParams {
  decoratorInfoList: DecoratorInfo[]
}

/**
 * 参数信息
 */
export interface DecoratorInfo {
  type: ParamType
  data?: any[]
}

/**
 * 参数类型
 */
export enum ParamType {
  QUERY = 'query',
  BODY = 'body',
  PARAM = 'param',
  REQUEST = 'request',
  RESPONSE = 'response',
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
  <T>(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface RequestParamDecorator {
  (name: string): ParameterDecorator
  (target: object, propertyKey: string, parameterIndex: number): void
}

export interface Context {
  request: Request
  response: Response
  params: Request['params']
  query: Request['query']
  body: Request['body']
  control: BeanClass
  method: string
}

export type GetContext = () => Context | undefined
