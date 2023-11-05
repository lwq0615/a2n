import { BeanInstance } from "@/ioc/types";
import { beforeAspects, afterAspects, aroundAspects } from "./Aspect";
import { isFunction } from "@/utils/function";

let isStart = false

export function startProxy() {
  isStart = true
}

export function getProxy(bean: BeanInstance): BeanInstance {
  return new Proxy(bean, {
    get(target, key: string) {
      if (isStart && isFunction(target[key])) {
        // 切面编程
        return function (...params: any) {
          // 前置
          const name = target.constructor.name + '.' + key
          for (const reg of beforeAspects.keys()) {
            if (reg.test(name)) {
              beforeAspects.get(reg)()
            }
          }
          const aroundReg = [...aroundAspects.keys()].find(reg => reg.test(name))
          const aroundHandle = aroundAspects.get(aroundReg)
          let result: any = void 0
          if(aroundHandle) {
            result = aroundHandle(() => target[key](...params))
          }else {
            result = target[key](...params)
          }
          // 后置
          for (const reg of afterAspects.keys()) {
            if (reg.test(name)) {
              afterAspects.get(reg)()
            }
          }
          return result
        }
      } else {
        return target[key]
      }
    }
  })
}