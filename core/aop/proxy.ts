import { getState } from '@core/ioc/beanState'
import { AroundAspectHandle, AspectHandle, AspectItem, BeanClass, BeanInstance } from '@core/types'
import { isFunction } from '@core/utils/function'
import { isAspect } from '@core/utils/state'
import { getAspects } from './Aspect'

let isStart = false

export function startProxy() {
  isStart = true
}

// 是否需要代理
export function isNeedProxy(Cons: BeanClass) {
  // 切面类不允许代理，防止切面代理切面导致的死循环
  return !isAspect(Cons)
}

function isMatch(aspect: AspectItem, Cons: BeanClass, name: string) {
  if (aspect.reg) {
    return aspect.reg.test(Cons.name + '.' + name)
  } else if (aspect.decorator) {
    const state = getState(Cons)
    return state.hasDecorator(aspect.decorator, name)
  }
  return false
}

export function getProxy(bean: BeanInstance): BeanInstance {
  if (!isNeedProxy(Reflect.getPrototypeOf(bean).constructor as BeanClass)) {
    return bean
  }
  return new Proxy(bean, {
    get(target, key: string) {
      if (!isStart || !isFunction(target[key])) {
        return target[key]
      }
      // 切面编程
      return function (...params: any) {
        const aspects = getAspects()
        const Cons = Reflect.getPrototypeOf(target).constructor as BeanClass
        const before = aspects.beforeAspects.filter((item) => isMatch(item, Cons, key))
        const around = aspects.aroundAspects.filter((item) => isMatch(item, Cons, key))
        const after = aspects.afterAspects.filter((item) => isMatch(item, Cons, key))
        // 前置
        for (const item of before) {
          ;(item.handle as AspectHandle)(Cons, key)
        }
        // 环绕
        let resultGetter = () => target[key](...params)
        for (const item of around) {
          const oldResultGetter = resultGetter
          resultGetter = () => (item.handle as AroundAspectHandle)(oldResultGetter, Cons, key)
        }
        const result = resultGetter()
        // 后置
        for (const item of after) {
          ;(item.handle as AspectHandle)(Cons, key)
        }
        return result
      }
    },
  })
}
