import { BeanClass, BeanScope, BeanState } from "./types";

export const states = new Map<BeanClass, BeanState>()


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
  state = {
    beanClass: Cons,
    controllMethods: {},
    autowiredTasks: [],
    configTasks: [],
    initOverTasks: [],
    scope: BeanScope.SINGLETON,
    setBeanTask: null,
    beforeAspects: [],
    afterAspects: [],
    aroundAspects: [],
    isAspect: false
  }
  states.set(Cons, state)
  return state
}
