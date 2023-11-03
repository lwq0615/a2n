import { regRoutes } from '@/express'
import { getBean, setBean } from '@/ioc'
import { getState } from '@/ioc/beanState'

/**
 * 在加载到Controll时将路由信息进行注册
 */
export const Control = function (source: string | any) {
  if (typeof source === 'string') {
    return function (Cons: any) {
      const state = getState(Cons)
      state.setBeanTask = () => setBean(Cons)
      Object.keys(state.controllMethods).forEach(methodName => {
        state.controllMethods[methodName].handler = async (...params: any) => (await getBean(Cons))?.[methodName](...params)
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
      state.controllMethods[methodName].handler = async (...params: any) => (await getBean(source))?.[methodName](...params)
    })
    regRoutes(Object.values(state.controllMethods), '')
  }
}

export default Control