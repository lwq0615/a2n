import { BeanClass } from '@core/types'
import { BeanState } from './types'

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

export function getStates() {
  return states
}