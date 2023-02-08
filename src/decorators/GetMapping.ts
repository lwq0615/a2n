import { routes } from '@/decorators/Controll'


export default function GetMapping(path: string): MethodDecorator{
  return function(target: any, key: string | symbol, descriptor: object){
    /**
     * 上一个操作routes.methods的method不属于当前正在处理的class
     * 说明上一个操作routes.methods的method的class上没有添加'@Controll'装饰器
     */
    if(routes.controller !== target){
      // 清除上一个class遗留的methods
      if(routes.methods.length){
        routes.methods = []
      }
      routes.controller = target
    }
    // 将当前method注册为handler
    routes.methods.push({
      path: path,
      handler: target[key]
    })
  }
}