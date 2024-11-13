import { Bean } from '@core/ioc'
import { getState } from '@core/ioc/beanState'
import { AspectItem, BeanClass, BeanInstance } from '@core/types'


const aspectBeanMap: Map<BeanClass, BeanInstance> = new Map()
const beforeAspects: AspectItem[] = []
const afterAspects: AspectItem[] = []
const aroundAspects: AspectItem[] = []

export function getAspects() {
  return {
    beforeAspects,
    afterAspects,
    aroundAspects,
  }
}

export function setAspectBeans(beans: BeanInstance[]) {
  beans?.forEach(bean => {
    aspectBeanMap.set(bean.constructor, bean)
  })
}

/**
 * 注册该类下的切面方法
 */
export const Aspect: ClassDecorator = (Cons: any) => {
  const state = getState(Cons)
  state.addClassDecorator(Aspect)
  Bean(Cons)
  const getHandle = (handle: Function) => {
    return function(...params: any) {
      return handle.bind(aspectBeanMap.get(Cons))(...params)
    }
  }
  state.beforeAspects.forEach(aspect => {
    beforeAspects.push({
      reg: aspect.reg,
      handle: getHandle(aspect.handle),
    })
  })
  state.afterAspects.forEach(aspect => {
    afterAspects.push({
      reg: aspect.reg,
      handle: getHandle(aspect.handle),
    })
  })
  state.aroundAspects.forEach(aspect => {
    aroundAspects.push({
      reg: aspect.reg,
      handle: getHandle(aspect.handle),
    })
  })
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function Before(match: RegExp | Function): MethodDecorator {
  return function(target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'test' : 'reg'
    const Cons = target.constructor
    const state = getState(Cons)
    state.addMethodDecorator(key, Before)
    state.beforeAspects.push({
      [name]: match,
      handle: target[key],
    })
  }
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function After(match: RegExp | Function): MethodDecorator {
  return function(target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'test' : 'reg'
    const Cons = target.constructor
    const state = getState(Cons)
    state.addMethodDecorator(key, After)
    state.afterAspects.push({
      [name]: match,
      handle: target[key],
    })
  }
}

/**
 * @param reg 正则表达式，校验[调用的bean的类名.调用的方法名]
 */
export function Around(match: RegExp | Function): MethodDecorator {
  return function(target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'test' : 'reg'
    const Cons = target.constructor
    const state = getState(Cons)
    state.addMethodDecorator(key, Around)
    state.aroundAspects.push({
      [name]: match,
      handle: target[key],
    })
  }
}

