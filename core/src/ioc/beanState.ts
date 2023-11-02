import { BeanState } from "./types";

const states = new Map<Function, BeanState>()

export function getState(Cons: Function): BeanState {
  if(!Cons) {
    return null
  }
  let state: BeanState = states.get(Cons)
  if(state) {
    return state
  }
  state = {
    controllMethods: {},
    autowiredTasks: [],
    configTasks: [],
    initOverTasks: []
  }
  states.set(Cons, state)
  return state
}
