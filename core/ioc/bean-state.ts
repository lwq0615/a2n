import { BeanClass, BeanState } from '@core/types'

const states = new Map<BeanClass, BeanState>()

/**
 * 获取状态中心
 * @param Cons bean类型 | bean原型
 * @returns 状态中心
 */
export function getState(Cons: BeanClass | object): BeanState {
  if (typeof Cons === 'object') {
    return getState(Cons.constructor)
  }
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

export function getStateMap() {
  return states
}

export function getBeanStateList() {
  return [...states.values()]
}

/**
 * 注册自定义装饰器
 * @param decorator 装饰器
 * @param Cons 类
 * @param name 属性
 */
export function registerCustomDecorator(decorator: Function, Cons: BeanClass | object, name?: string | symbol) {
  const state = getState(Cons)
  if (name) {
    state.addFieldDecorator(name, decorator)
  } else {
    state.addClassDecorator(decorator)
  }
}
