import { regRoutes } from '@/express'
import { getBean, setBean } from '@/ioc'

/**
 * 在加载到Controll时将路由信息进行注册
 */
const Controll = function (source: string | any) {
  if (typeof source === 'string') {
    return function (Cons: any) {
      setBean(Cons)
      Object.keys(Cons.handlerMethods).forEach(methodName => {
        Cons.handlerMethods[methodName].handler = (...params: any) => getBean(Cons)?.[methodName](...params)
      })
      regRoutes(Object.values(Cons.handlerMethods), source)
    } as ClassDecorator
  } else {
    setBean(source)
    Object.keys(source.handlerMethods).forEach(methodName => {
      source.handlerMethods[methodName].handler = (...params: any) => getBean(source)?.[methodName](...params)
    })
    regRoutes(Object.values(source.handlerMethods), '')
  }
}

export default Controll