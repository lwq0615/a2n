import { regRoutes } from '@/express'
import { Route } from '@/decorators/types'
import { getBean, setBean } from '@/ioc'


/**
 * 存放路由信息
 */
export const routes: { controller: object, methods: { [methodName: string]: Route } } = {
  controller: null,
  methods: {}
}


/**
 * 在加载到Controll时将路由信息进行注册
 */
const Controll = function (source: string | object) {
  if (typeof source === 'string') {
    return function (Cons: any) {
      setBean(Cons)
      Object.keys(routes.methods).forEach(methodName => {
        routes.methods[methodName].handler = (...params: any) => getBean(Cons)?.[methodName](...params)
      })
      regRoutes(Object.values(routes.methods), source)
    } as ClassDecorator
  } else {
    setBean(source)
    Object.keys(routes.methods).forEach(methodName => {
      routes.methods[methodName].handler = (...params: any) => getBean(source)?.[methodName](...params)
    })
    regRoutes(Object.values(routes.methods), '')
  }
}

export default Controll