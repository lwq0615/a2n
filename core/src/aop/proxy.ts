import { BeanInstance } from "@/ioc/types";
import { aspects } from "./Aspect";
import { isFunction } from "@/utils/function";

let isStart = false

export function startProxy() {
  isStart = true
}

export function getProxy(bean: BeanInstance): BeanInstance {
  return new Proxy(bean, {
    get(target, key: string) {
      // 切面编程
      if(isFunction(target[key]) && isStart) {
        const name = target.constructor.name + '.' + key
        for (const reg of aspects.keys()) {
          if(reg.test(name)) {
            aspects.get(reg)()
          }
        }
      }
      return target[key]
    }
  })
}