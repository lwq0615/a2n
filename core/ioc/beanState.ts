import { BeanClass, BeanInstance, BeanState } from '@core/types'

const states = new Map<BeanClass, BeanState>()


/**
 * 获取状态中心
 * @param Cons bean类型
 * @returns 状态中心
 */
export function getState(Cons: BeanClass): BeanState {
  if (!Cons) {
    return null
  }
  let state: BeanState = states.get(Cons)
  if (state) {
    return state
  }
  state = new BeanState(Cons)
  states.set(Cons, state)
  return state
}

export function getStateByInstance(bean: BeanInstance) {
  return getState(Reflect.getPrototypeOf(bean).constructor as BeanClass)
}

export function getStateMap() {
  return states
}

export function getBeanStateList() {
  return [...states.values()]
}

export function registerCustomerDecorator(decorator: Function, Cons: BeanClass, name?: string) {
  const state = getState(Cons)
  if (name) {
    state.addMethodDecorator(name, decorator)
  } else {
    state.addClassDecorator(decorator)
  }
}