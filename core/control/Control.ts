import { Bean, getBean } from '@core/ioc'
import { getState } from '@core/ioc/beanState'
import { BeanClass, BeanInstance, Control as ControlType } from '@core/types'
import { getFunParameterNames } from '@core/utils/function'

const controlMap: Map<BeanClass, BeanInstance> = new Map()

export function getControlBean(Cons: BeanClass) {
  if (controlMap.get(Cons)) {
    return controlMap.get(Cons)
  } else {
    return getBean(Cons).then(bean => {
      controlMap.set(Cons, bean)
      return bean
    })
  }
}

/**
 * 在加载到Control时将路由信息进行注册
 */
export const Control: ControlType = function (source) {
  const setControl = (Cons: any, baseUrl = '') => {
    const state = getState(Cons)
    state.isControl = true
    state.controlMapping = baseUrl
    Object.keys(state.controlMethods).forEach(methodName => {
      state.controlMethods[methodName].handler = async (...params: any) => (await getControlBean(Cons))?.[methodName](...params)
      state.controlMethods[methodName].paramNames = getFunParameterNames(Cons.prototype[methodName])
    })
  }
  if (typeof source === 'string') {
    return function (Cons: any) {
      Bean(source)(Cons)
      setControl(Cons, source)
    } as ClassDecorator
  } else {
    if (!(source instanceof Function)) {
      throw new Error('@Control只接收string类型或者undefined参数')
    }
    Bean(source)
    setControl(source)
  }
}

export default Control