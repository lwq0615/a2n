import { BeanScope } from '@core/types'
import { getState } from './bean-state'
import { isAspect, isControl } from '@core/utils/state'

export const Scope = function (scope: BeanScope): ClassDecorator {
  return function (Cons: any) {
    // control和aspect有自己的作用域
    if (!isControl(Cons) && !isAspect(Cons)) {
      getState(Cons).scope = scope
    }
    getState(Cons).addClassDecorator(Scope)
  }
}
