import { ParamInfo, ParamType, Route } from '@/core/types'
import { routes } from './Controll'


/**
 * 注册参数 
 */
function regParam(target: any, methodName: string, paramIndex: number, type: ParamInfo) {
  /**
       * 上一个操作methodParam的param不属于当前正在处理的class
       * 说明上一个操作routes.methodParam的param的method上没有添加 @GET | @POST | @PUT | @DELETE 装饰器
       */
  if (routes.controller !== target) {
    // 清除上一个class遗留的参数
    routes.methods = {}
    routes.controller = target
  }
  if (!routes.methods[methodName]) {
    routes.methods[methodName] = {} as Route
  }
  if (!Array.isArray(routes.methods[methodName].params)) {
    routes.methods[methodName].params = []
  }
  // 注入参数信息
  routes.methods[methodName].params[paramIndex] = type
}


/**
 * 获取参数装饰器
 */
function getParamDecorators(target: any, methodName: string, paramIndex: number, type: ParamType) {
  const paramInfo: ParamInfo = {
    type: type
  }
  if (typeof target === 'string') {
    paramInfo.name = target
    return function(target: any, methodName: string, paramIndex: number){
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

export function Request(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, {type: ParamType.REQUEST})
}

export function Response(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, {type: ParamType.RESPONSE})
}

export function Req(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, {type: ParamType.REQUEST})
}

export function Res(target: any, methodName: string, paramIndex: number) {
  regParam(target, methodName, paramIndex, {type: ParamType.RESPONSE})
}