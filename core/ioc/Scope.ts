import { getState } from './beanState';
import { BeanScope } from '@core/types';



export const Scope = function (scope: BeanScope): ClassDecorator {
  return function (Cons: any) {
    getState(Cons).scope = scope
  }
}