import { getState } from "@/ioc/beanState"
import { setBean } from "@/ioc"
import { BeanClass, BeanInstance } from "@/ioc/types"

const aspectBeanMap: Map<BeanClass, BeanInstance> = new Map()

export function setAspectBeans(beans: BeanInstance[]) {
  beans?.forEach(bean => {
    aspectBeanMap.set(bean.constructor, bean)
  })
}

export const beforeAspects: Map<RegExp, Function> = new Map()
export const afterAspects: Map<RegExp, Function> = new Map()
export const aroundAspects: Map<RegExp, Function> = new Map()

/**
 * 注册该类下的切面方法
 */
export const Aspect: ClassDecorator = (Cons: any) => {
  const state = getState(Cons)
  state.isAspect = true
  state.setBeanTask = () => setBean(Cons)
  const getHandle = (handle: Function) => {
    return function(...params: any) {
      return handle.bind(aspectBeanMap.get(Cons))(...params)
    }
  }
  state.beforeAspects.forEach(aspect => {
    beforeAspects.set(aspect.reg, getHandle(aspect.handle))
  })
  state.afterAspects.forEach(aspect => {
    afterAspects.set(aspect.reg, getHandle(aspect.handle))
  })
  state.aroundAspects.forEach(aspect => {
    aroundAspects.set(aspect.reg, getHandle(aspect.handle))
  })
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function Before(reg: RegExp): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    getState(Cons).beforeAspects.push({
      reg,
      handle: target[key]
    })
  }
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function After(reg: RegExp): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    getState(Cons).afterAspects.push({
      reg,
      handle: target[key]
    })
  }
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function Around(reg: RegExp): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const Cons = target.constructor
    getState(Cons).aroundAspects.push({
      reg,
      handle: target[key]
    })
  }
}
