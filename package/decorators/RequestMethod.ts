import { routes } from '@/decorators/Controll'
import { Method, Route } from '@/core/types'


function getMapping(path: string, type: Method): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    /**
     * 上一个操作routes.methods的method不属于当前正在处理的class
     * 说明上一个操作routes.methods的method的class上没有添加 @Controll 装饰器
     */
    if (routes.controller !== target) {
      // 清除上一个class遗留的methods
      routes.methods = {}
      routes.controller = target
    }
    if(!routes.methods[key]){
      routes.methods[key] = {} as Route
    }
    // 将当前method注册为handler
    Object.assign(routes.methods[key], {
      path: path,
      type: type,
      handler: target[key] as Function,
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