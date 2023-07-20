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
    } as undefined
  } else {
    if(!(source instanceof Function)) {
      throw new Error('@Controll只接收string类型或者undefined参数')
    }
    setBean(source)
    Object.keys(source.handlerMethods).forEach(methodName => {
      source.handlerMethods[methodName].handler = (...params: any) => getBean(source)?.[methodName](...params)
    })
    regRoutes(Object.values(source.handlerMethods), '')
  }
}

export default Controll