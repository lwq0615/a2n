import { Bean, BeanScope, getBean } from '@core/ioc'
import { getState } from '@core/ioc/bean-state'
import { BeanClass, Control as ControlType } from '@core/types'
import { getFunParameterNames } from '@core/utils/function'

/**
 * 在加载到Control时将路由信息进行注册
 */
export const Control: ControlType = function (source: string | BeanClass) {
  const setControl = (Cons: any, baseUrl = '') => {
    const state = getState(Cons)
    state.scope = BeanScope.REQUEST
    state.addClassDecorator(Control)
    state.controlMapping = baseUrl
    Object.keys(state.controlMethods).forEach((methodName) => {
      state.controlMethods[methodName].handler = async (...params: any) =>
        (await getBean(Cons))?.[methodName](...params)
      state.controlMethods[methodName].paramNames = getFunParameterNames(Cons.prototype[methodName])
    })
  }
  if (typeof source === 'string') {
    return function (Cons: any) {
      Bean(source)(Cons)
      setControl(Cons, source)
    }
  } else {
    if (!(source instanceof Function)) {
      throw new Error('@Control只接收string类型或者undefined参数')
    }
    Bean(source)
    setControl(source)
  }
}

export default Control
