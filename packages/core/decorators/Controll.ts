import { regRoutes } from '@/express'
import { Route } from '@/types'


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
const Controll = function (baseUrl: string | object) {
  if(typeof baseUrl === 'string'){
    return function (obj: any) {
      regRoutes(Object.values(routes.methods), baseUrl)
    } as undefined
  }else{
    regRoutes(Object.values(routes.methods), '')
  }
}

export default Controll