import { BeanClass, BeanInstance } from "@/ioc/types";
import { beforeAspects, afterAspects, aroundAspects } from "./Aspect";
import { isFunction } from "@/utils/function";
import { getState } from "@/ioc/beanState";

let isStart = false

export function startProxy() {
  isStart = true
}

// 是否需要代理
export function isNeedProxy(Cons: BeanClass) {
  // 切面类不允许代理，防止切面代理切面导致的死循环
  return !getState(Cons).isAspect
}

export function getProxy(bean: BeanInstance): BeanInstance {
  if(!isNeedProxy(bean.constructor)) {
    return bean
  }
  return new Proxy(bean, {
    get(target, key: string) {
      if (isStart && isFunction(target[key])) {
        // 切面编程
        return function (...params: any) {
          // 前置
          const name = target.constructor.name + '.' + key
          for (const reg of beforeAspects.keys()) {
            if (reg.test(name)) {
              beforeAspects.get(reg)(target.constructor, key)
            }
          }
          // 环绕
          const aroundReg = [...aroundAspects.keys()].find(reg => reg.test(name))
          const aroundHandle = aroundAspects.get(aroundReg)
          let result: any = void 0
          if(aroundHandle) {
            result = aroundHandle(() => target[key](...params), target.constructor, key)
          }else {
            result = target[key](...params)
          }
          // 后置
          for (const reg of afterAspects.keys()) {
            if (reg.test(name)) {
              afterAspects.get(reg)(target.constructor, key)
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