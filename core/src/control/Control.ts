import { regRoutes } from '@/express'
import { getBean, setBean } from '@/ioc'
import { getState } from '@/ioc/beanState'
import { BeanClass, BeanInstance } from '@/ioc/types'
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
      state.setBeanTask = () => setBean(Cons)
      Object.keys(state.controllMethods).forEach(methodName => {
        state.controllMethods[methodName].handler = async (...params: any) => (await getControlBean(Cons))?.[methodName](...params)
        state.controllMethods[methodName].paramNames = getFunParameterNames(Cons.prototype[methodName])
      })
      regRoutes(Object.values(state.controllMethods), source)
    } as undefined
  } else {
    if(!(source instanceof Function)) {
      throw new Error('@Controll只接收string类型或者undefined参数')
    }
    const state = getState(source)
    state.setBeanTask = () => setBean(source)
    Object.keys(state.controllMethods).forEach(methodName => {
      state.controllMethods[methodName].handler = async (...params: any) => (await getControlBean(source))?.[methodName](...params)
      state.controllMethods[methodName].paramNames = getFunParameterNames(source.prototype[methodName])
    })
    regRoutes(Object.values(state.controllMethods), '')
  }
}

export default Control