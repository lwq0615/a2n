import { Method, Route } from '@core/control/types'
import { getState } from '@core/ioc/beanState'
import { RequestMapping as RequestMappingType } from '@core/types'

function regMapping(path: string, type: Method) {
  const regMethod: MethodDecorator = (target, key, descriptor) => {
    const Cons = target.constructor
    if (!getState(Cons).controlMethods[key]) {
      getState(Cons).controlMethods[key] = new Route()
    }
    // 将当前method注册为handler
    Object.assign(getState(Cons).controlMethods[key], {
      path: path,
      type: type,
    })
  }
  return regMethod
}

function getMethodDecorator(target: string | Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<unknown>, type: Method) {
  if (typeof target === 'string') {
    return regMapping(target, type) as any
  } else {
    regMapping('', type)(target, propertyKey, descriptor)
  }
}

export const RequestMapping: RequestMappingType = (target: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<unknown>) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.ALL)
}

export const Get: RequestMappingType = (target: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<unknown>) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.GET)
}


export const Post: RequestMappingType = (target: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<unknown>) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.POST)
}

export const Put: RequestMappingType = (target: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<unknown>) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.PUT)
}

export const Delete: RequestMappingType = (target: string | Object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<unknown>) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.DELETE)
}