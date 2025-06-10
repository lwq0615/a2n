import { Bean } from '@core/ioc'
import { getState } from '@core/ioc/beanState'
import { AspectItem, BeanClass, BeanInstance } from '@core/types'

// 切面类的bean实例，用来执行切面拦截器方法
const aspectBeanMap: Map<BeanClass, BeanInstance> = new Map()
// 各个切面拦截器
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
  beans?.forEach((bean) => {
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
    return function (...params: any) {
      return handle.bind(aspectBeanMap.get(Cons))(...params)
    }
  }
  state.beforeAspects.forEach((aspect) => {
    beforeAspects.push({
      ...aspect,
      handle: getHandle(aspect.handle),
    })
  })
  state.afterAspects.forEach((aspect) => {
    afterAspects.push({
      ...aspect,
      handle: getHandle(aspect.handle),
    })
  })
  state.aroundAspects.forEach((aspect) => {
    aroundAspects.push({
      ...aspect,
      handle: getHandle(aspect.handle),
    })
  })
}

/**
 * @param {RegExp} match 正则表达式，校验[调用的bean的类名.调用的方法名]
 * @param {Function} match 装饰器
 */
export function Before(match: RegExp | Function): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'decorator' : 'reg'
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
 * @param {RegExp} match 正则表达式，校验[调用的bean的类名.调用的方法名]
 * @param {Function} match 装饰器
 */
export function After(match: RegExp | Function): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'decorator' : 'reg'
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
 * @param {RegExp} match 正则表达式，校验[调用的bean的类名.调用的方法名]
 * @param {Function} match 装饰器
 */
export function Around(match: RegExp | Function): MethodDecorator {
  return function (target: any, key: string, descriptor: object) {
    const name = typeof match === 'function' ? 'decorator' : 'reg'
    const Cons = target.constructor
    const state = getState(Cons)
    state.addMethodDecorator(key, Around)
    state.aroundAspects.push({
      [name]: match,
      handle: target[key],
    })
  }
}
