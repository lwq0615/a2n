import { Method, Route } from '@core/control/types'
import { getState } from '@core/ioc/beanState'
import { RequestMapping as RequestMappingType } from '@core/types'


function getMapping(path: string, type: Method): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    if (!getState(Cons).controlMethods[key]){
      getState(Cons).controlMethods[key] = new Route()
    }
    // 将当前method注册为handler
    Object.assign(getState(Cons).controlMethods[key], {
      path: path,
      type: type,
    })
  }
}

export const RequestMapping: RequestMappingType = (path) => {
  if (typeof path === 'string') {
    return getMapping(path, Method.ALL)
  } else {
    return getMapping('', Method.ALL)
  }
}

export const Get: RequestMappingType = (path) => {
  if (typeof path === 'string') {
    return getMapping(path, Method.GET)
  } else {
    return getMapping('', Method.GET)
  }
}

export const Post: RequestMappingType = (path) => {
  if (typeof path === 'string') {
    return getMapping(path, Method.POST)
  } else {
    return getMapping('', Method.POST)
  }
}

export const Put: RequestMappingType = (path) => {
  if (typeof path === 'string') {
    return getMapping(path, Method.PUT)
  } else {
    return getMapping('', Method.PUT)
  }
}

export const Delete: RequestMappingType = (path) => {
  if (typeof path === 'string') {
    return getMapping(path, Method.DELETE)
  } else {
    return getMapping('', Method.DELETE)
  }
}