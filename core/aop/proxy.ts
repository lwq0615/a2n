import { BeanClass, BeanInstance } from '@core/types'
import { getAspects } from './Aspect'
import { isFunction } from '@core/utils/function'
import { getState } from '@core/ioc/beanState'

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
  if (!isNeedProxy(bean.constructor)) {
    return bean
  }
  return new Proxy(bean, {
    get(target, key: string) {
      if (isStart && isFunction(target[key])) {
        // 切面编程
        return function (...params: any) {
          const aspects = getAspects()
          // 前置
          const name = target.constructor.name + '.' + key
          for (const reg of aspects.beforeAspects.keys()) {
            if (reg.test(name)) {
              aspects.beforeAspects.get(reg)(target.constructor, key)
            }
          }
          // 环绕
          const aroundReg = [...aspects.aroundAspects.keys()].find(reg => reg.test(name))
          const aroundHandle = aspects.aroundAspects.get(aroundReg)
          let result: any = void 0
          if (aroundHandle) {
            result = aroundHandle(() => target[key](...params), target.constructor, key)
          } else {
            result = target[key](...params)
          }
          // 后置
          for (const reg of aspects.afterAspects.keys()) {
            if (reg.test(name)) {
              aspects.afterAspects.get(reg)(target.constructor, key)
            }
          }
          return result
        }
      } else {
        return target[key]
      }
    },
  })
}