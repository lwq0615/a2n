import { BeanScope } from '@core/types'
import { getState } from './beanState'



export const Scope = function(scope: BeanScope): ClassDecorator {
  return function(Cons: any) {
    getState(Cons).scope = scope
    getState(Cons).addClassDecorator(Scope)
  }
}