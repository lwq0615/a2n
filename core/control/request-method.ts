import { getState } from '@core/ioc/bean-state'
import { BeanClass, Method, RequestMapping as RequestMappingType, Route } from '@core/types'

function getDecoratorByType(type: Method) {
  return {
    [Method.ALL]: RequestMapping,
    [Method.GET]: Get,
    [Method.POST]: Post,
    [Method.PUT]: Put,
    [Method.DELETE]: Delete,
  }[type]
}

function regMapping(path: string, type: Method) {
  const regMethod: MethodDecorator = (target, key, descriptor) => {
    const Cons = target.constructor as BeanClass
    const state = getState(Cons)
    state.addFieldDecorator(key as string, getDecoratorByType(type))
    if (!state.controlMethods[key]) {
      state.controlMethods[key] = new Route()
    }
    // 将当前method注册为handler
    Object.assign(state.controlMethods[key], {
      path: path,
      type: type,
    })
  }
  return regMethod
}

function getMethodDecorator(
  target: string | object,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<unknown>,
  type: Method,
) {
  if (typeof target === 'string') {
    return regMapping(target, type) as any
  } else {
    getState(target).addFieldDecorator(propertyKey, getDecoratorByType(type))
    regMapping('', type)(target, propertyKey, descriptor)
  }
}

export const RequestMapping: RequestMappingType = (
  target: string | object,
  propertyKey?: string,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.ALL)
}

export const Get: RequestMappingType = (
  target: string | object,
  propertyKey?: string,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.GET)
}

export const Post: RequestMappingType = (
  target: string | object,
  propertyKey?: string,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.POST)
}

export const Put: RequestMappingType = (
  target: string | object,
  propertyKey?: string,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.PUT)
}

export const Delete: RequestMappingType = (
  target: string | object,
  propertyKey?: string,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(target, propertyKey, descriptor, Method.DELETE)
}
