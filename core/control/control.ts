import { Bean, BeanScope } from '@core/ioc'
import { getState } from '@core/ioc/bean-state'
import { BeanClass, Control as ControlType } from '@core/types'

/**
 * 在加载到Control时将路由信息进行注册
 */
export const Control = function (source: string | BeanClass) {
  const setControl = (Cons: any, baseUrl = '') => {
    const state = getState(Cons)
    state.scope = BeanScope.REQUEST
    state.addClassDecorator(Control)
    state.controlMapping = baseUrl
  }
  if (typeof source === 'string') {
    return function (Cons: any) {
      Bean(source)(Cons)
      setControl(Cons, source)
    }
  } else {
    Bean(source)
    setControl(source)
  }
} as ControlType

export default Control
