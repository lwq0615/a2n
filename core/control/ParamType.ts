import { getState } from '@core/ioc/beanState'
import { ParamInfo, ParamType, RequestParamDecorator, Route } from '@core/types'


/**
 * 注册参数
 */
function regParam(target: any, methodName: string | symbol, paramIndex: number, paramInfo: ParamInfo) {
  const Cons = target.constructor
  const state = getState(Cons)
  if (!state.controlMethods) {
    state.controlMethods = {}
  }
  if (!state.controlMethods[methodName]) {
    state.controlMethods[methodName] = new Route()
  }
  // 注入参数信息
  state.controlMethods[methodName].params[paramIndex] = paramInfo
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
    return function(target: any, methodName: string, paramIndex: number) {
      regParam(target, methodName, paramIndex, paramInfo)
    } as undefined
  } else {
    regParam(target, methodName, paramIndex, paramInfo)
  }
}

export const Query: RequestParamDecorator = (target: string | Object, methodName?: string, paramIndex?: number) => {
  return getParamDecorators(target, methodName, paramIndex, ParamType.QUERY)
}

export const Param: RequestParamDecorator = (target: string | Object, methodName?: string, paramIndex?: number) => {
  return getParamDecorators(target, methodName, paramIndex, ParamType.PARAM)
}

export const Body: RequestParamDecorator = (target: string | Object, methodName?: string, paramIndex?: number) => {
  return getParamDecorators(target, methodName, paramIndex, ParamType.BODY)
}

export const Req: ParameterDecorator = (target, methodName, paramIndex) => {
  regParam(target, methodName, paramIndex, { type: ParamType.REQUEST })
}

export const Res: ParameterDecorator = (target, methodName, paramIndex) => {
  regParam(target, methodName, paramIndex, { type: ParamType.RESPONSE })
}