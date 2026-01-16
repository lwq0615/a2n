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

// 更精确的版本：只保留函数属性，并将返回值包装为 Promise
type PickAndWrapFunctionsWithPromise<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K] extends (...args: infer Args) => infer Return
    ? Return extends Promise<infer InnerReturn>
      ? (...args: Args) => Promise<InnerReturn> // 已经是 Promise，保持原样
      : (...args: Args) => Promise<Return> // 包装为 Promise
    : never
}

export class ApiExportRequest {
  /**
   * 静态创建方法，返回子类实例
   * @param args 子类构造函数所需参数（可选）
   * @returns 子类实例
   */
  static request<T extends ApiExportRequest>(
    this: new (...args: any[]) => T, // 约束当前类为 T 的构造函数
  ) {
    return {} as PickAndWrapFunctionsWithPromise<T>
  }
}
