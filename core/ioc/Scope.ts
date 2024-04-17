import { getState } from "./beanState";
import { BeanScope } from "@/types";



export const Scope = function (scope: BeanScope): ClassDecorator {
  return function (Cons: any) {
    getState(Cons).scope = scope
  }
}