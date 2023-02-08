import { ParamType, Route } from '@/core/types'
import { routes } from './Controll'


function getParamType(target: any, methodName: string, paramIndex: number, type: ParamType) {
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

export function Query(target: any, methodName: string, paramIndex: number) {
  getParamType(target, methodName, paramIndex, ParamType.QUERY)
}

export function Body(target: any, methodName: string, paramIndex: number) {
  getParamType(target, methodName, paramIndex, ParamType.BODY)
}