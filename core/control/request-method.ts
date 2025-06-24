import { getState } from '@core/ioc/bean-state'
import { BeanClass, Method, RequestMapping as RequestMappingType } from '@core/types'

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
    state.controlMethods[key] = {
      path: path,
      type: type,
    }
  }
  return regMethod
}

function getMethodDecorator(
  type: Method,
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) {
  if (typeof target === 'string') {
    return regMapping(target, type) as any
  } else {
    getState(target).addFieldDecorator(propertyKey!, getDecoratorByType(type))
    regMapping('', type)(target, propertyKey!, descriptor!)
  }
}

export const RequestMapping: RequestMappingType = (
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(Method.ALL, target, propertyKey, descriptor)
}

export const Get: RequestMappingType = (
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(Method.GET, target, propertyKey, descriptor)
}

export const Post: RequestMappingType = (
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(Method.POST, target, propertyKey, descriptor)
}

export const Put: RequestMappingType = (
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(Method.PUT, target, propertyKey, descriptor)
}

export const Delete: RequestMappingType = (
  target: string | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<unknown>,
) => {
  return getMethodDecorator(Method.DELETE, target, propertyKey, descriptor)
}
