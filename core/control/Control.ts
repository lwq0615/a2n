import { getBean, setBean } from '@core/ioc'
import { getState } from '@core/ioc/beanState'
import { BeanClass, BeanInstance } from '@core/types'
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
 * 在加载到Controll时将路由信息进行注册
 */
export const Control = function (source: string | any) {
  const setControll = (Cons: any, baseUrl = '') => {
    const state = getState(Cons)
    state.isControl = true
    state.controlMapping = baseUrl
    if(!state.setBeanTask) {
      state.setBeanTask = () => setBean(Cons)
    }
    Object.keys(state.controlMethods).forEach(methodName => {
      state.controlMethods[methodName].handler = async (...params: any) => (await getControlBean(Cons))?.[methodName](...params)
      state.controlMethods[methodName].paramNames = getFunParameterNames(Cons.prototype[methodName])
    })
  }
  if (typeof source === 'string') {
    return function (Cons: any) {
      setControll(Cons, source)
    } as undefined
  } else {
    if (!(source instanceof Function)) {
      throw new Error('@Controll只接收string类型或者undefined参数')
    }
    setControll(source)
  }
}

export default Control