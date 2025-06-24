import { getState } from '@core/ioc/bean-state'
import { DecoratorInfo, ParamType, RequestParamDecorator } from '@core/types'

/**
 * 注册参数
 */
function regParam(target: any, methodName: string | symbol, paramIndex: number, decoratorInfo: DecoratorInfo) {
  const Cons = target.constructor
  const state = getState(Cons)
  if (!state.methodParams[methodName]) {
    state.methodParams[methodName] = {
      decoratorInfoList: [],
    }
  }
  // 注入参数信息
  state.methodParams[methodName]!.decoratorInfoList[paramIndex] = decoratorInfo
}

/**
 * 获取参数装饰器
 */
function getParamDecorators(type: ParamType, target: object, methodName: string, paramIndex: number) {
  const decoratorInfo: DecoratorInfo = {
    type: type,
  }
  regParam(target, methodName, paramIndex, decoratorInfo)
}

function getParamDecoratorsWithParams(type: ParamType, target: string) {
  const decoratorInfo: DecoratorInfo = {
    type: type,
    data: [target],
  }
  return function (target: any, methodName: string, paramIndex: number) {
    regParam(target, methodName, paramIndex, decoratorInfo)
  } as ParameterDecorator
}

export const Query = function (target: string | object, methodName?: string, paramIndex?: number) {
  if (typeof target === 'string') {
    return getParamDecoratorsWithParams(ParamType.QUERY, target)
  } else if (typeof target === 'object' && methodName) {
    return getParamDecorators(ParamType.QUERY, target, methodName, paramIndex!)
  }
} as RequestParamDecorator

export const Param = function (target: string | object, methodName?: string, paramIndex?: number) {
  if (typeof target === 'string') {
    return getParamDecoratorsWithParams(ParamType.PARAM, target)
  } else if (typeof target === 'object' && methodName) {
    return getParamDecorators(ParamType.PARAM, target, methodName, paramIndex!)
  }
} as RequestParamDecorator

export const Body = function (target: string | object, methodName?: string, paramIndex?: number) {
  if (typeof target === 'string') {
    return getParamDecoratorsWithParams(ParamType.BODY, target)
  } else if (typeof target === 'object' && methodName) {
    return getParamDecorators(ParamType.BODY, target, methodName, paramIndex!)
  }
} as RequestParamDecorator

export const Req: ParameterDecorator = (target, methodName, paramIndex) => {
  regParam(target, methodName, paramIndex, { type: ParamType.REQUEST })
}

export const Res: ParameterDecorator = (target, methodName, paramIndex) => {
  regParam(target, methodName, paramIndex, { type: ParamType.RESPONSE })
}
