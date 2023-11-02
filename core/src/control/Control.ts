import { regRoutes } from '@/express'
import { getBean, setBean } from '@/ioc'
import { getState } from '@/ioc/beanState'

/**
 * 在加载到Controll时将路由信息进行注册
 */
export const Control = function (source: string | any) {
  if (typeof source === 'string') {
    return function (Cons: any) {
      setBean(Cons)
      Object.keys(getState(Cons).controllMethods).forEach(methodName => {
        getState(Cons).controllMethods[methodName].handler = (...params: any) => getBean(Cons)?.[methodName](...params)
      })
      regRoutes(Object.values(getState(Cons).controllMethods), source)
    } as undefined
  } else {
    if(!(source instanceof Function)) {
      throw new Error('@Controll只接收string类型或者undefined参数')
    }
    setBean(source)
    Object.keys(getState(source).controllMethods).forEach(methodName => {
      getState(source).controllMethods[methodName].handler = (...params: any) => getBean(source)?.[methodName](...params)
    })
    regRoutes(Object.values(getState(source).controllMethods), '')
  }
}

export default Control