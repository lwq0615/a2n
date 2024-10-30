import { ParamInfo, ParamType, Route } from '@core/control/types'
import { getState } from '@core/ioc/beanState'


/**
 * 注册参数
 */
function regParam(target: any, methodName: string, paramIndex: number, type: ParamInfo) {
  const Cons = target.constructor
  if (!getState(Cons).controlMethods) {
    getState(Cons).controlMethods = {}
  }
  if (!getState(Cons).controlMethods[methodName]) {
    getState(Cons).controlMethods[methodName] = new Route()
  }
  if (!Array.isArray(getState(Cons).controlMethods[methodName].params)) {
    getState(Cons).controlMethods[methodName].params = []
  }
  // 注入参数信息
  getState(Cons).controlMethods[methodName].params[paramIndex] = type
}


/**
 * 获取参数装饰器
 */
function getParamDecorators(target: any, methodName: string, paramIndex: number, type: ParamType) {
  const paramInfo: ParamInfo = {
    type: type,
  }
  if (typeof target === 'string') {
    paramInfo.name = target
    return function (target: any, methodName: string, paramIndex: number) {
      regParam(target, methodName, paramIndex, paramInfo)
    } as undefined
  } else {
    regParam(target, methodName, paramIndex, paramInfo)
  }
}

export function Query(target: any, methodName?: string, paramIndex?: number) {
  return getParamDecorators(target, methodName, paramIndex, ParamType.QUERY)
}

export function Body(target: any, methodName?: string, paramIndex?: number) {
  return getParamDecorators(target, methodName, paramIndex, ParamType.BODY)
}

export function Req(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, { type: ParamType.REQUEST })
}

export function Res(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, { type: ParamType.RESPONSE })
}