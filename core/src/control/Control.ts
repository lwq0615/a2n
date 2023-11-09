import { getBean, setBean } from '@/ioc'
import { getState } from '@/ioc/beanState'
import { BeanClass, BeanInstance } from '@/types'
import { getFunParameterNames } from '@/utils/function'

const controlMap: Map<BeanClass, BeanInstance> = new Map()

function getControlBean(Cons: BeanClass) {
  if(controlMap.get(Cons)) {
    return controlMap.get(Cons)
  }else {
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
  if (typeof source === 'string') {
    return function (Cons: any) {
      const state = getState(Cons)
      state.isControl = true
      state.controlMapping = source
      state.setBeanTask = () => setBean(Cons)
      Object.keys(state.controlMethods).forEach(methodName => {
        state.controlMethods[methodName].handler = async (...params: any) => (await getControlBean(Cons))?.[methodName](...params)
        state.controlMethods[methodName].paramNames = getFunParameterNames(Cons.prototype[methodName])
      })
    } as undefined
  } else {
    if(!(source instanceof Function)) {
      throw new Error('@Controll只接收string类型或者undefined参数')
    }
    const state = getState(source)
    state.isControl = true
    state.controlMapping = ''
    state.setBeanTask = () => setBean(source)
    Object.keys(state.controlMethods).forEach(methodName => {
      state.controlMethods[methodName].handler = async (...params: any) => (await getControlBean(source))?.[methodName](...params)
      state.controlMethods[methodName].paramNames = getFunParameterNames(source.prototype[methodName])
    })
  }
}

export default Control