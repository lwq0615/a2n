import { Method, Route } from '@/control/types'


function getMapping(path: string, type: Method): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    if(!Cons.handlerMethods[key]){
      Cons.handlerMethods[key] = {} as Route
    }
    // 将当前method注册为handler
    Object.assign(Cons.handlerMethods[key], {
      path: path,
      type: type
    })
  }
}

export function RequestMapping(path: string): MethodDecorator {
  return getMapping(path, Method.ALL)
}

export function Get(path: string): MethodDecorator {
  return getMapping(path, Method.GET)
}

export function Post(path: string): MethodDecorator {
  return getMapping(path, Method.POST)
}

export function Put(path: string): MethodDecorator {
  return getMapping(path, Method.PUT)
}

export function Delete(path: string): MethodDecorator {
  return getMapping(path, Method.DELETE)
}