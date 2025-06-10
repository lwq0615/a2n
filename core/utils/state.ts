import { Aspect } from '@core/aop'
import { Control } from '@core/control'
import { Bean, BeanClass, getState } from '@core/ioc'

// bean是否是切面类
export function isAspect(Cons: BeanClass) {
  const state = getState(Cons)
  return state.hasDecorator(Aspect)
}

// 是否是控制器
export function isControl(Cons: BeanClass) {
  const state = getState(Cons)
  return state.hasDecorator(Control)
}

// 是否是Bean
export function isBean(Cons: BeanClass) {
  const state = getState(Cons)
  return state.hasDecorator(Bean)
}
