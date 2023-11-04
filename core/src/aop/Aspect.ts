import { Interceptor } from "./types"

export const aspects: Map<RegExp, Function> = new Map()

/**
 * 切面编程，在Interceptor类内的方法添加@Aspect注解
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function Aspect(reg: RegExp): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    if(!(new Cons() instanceof Interceptor)) {
      return
    }
    aspects.set(reg, (target as any)[key])
  }
}
