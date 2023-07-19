import { setBean } from '@/ioc'



/**
 * 在加载到Service时将其注册到bean容器中
 */
const Service = function (Cons: object) {
  setBean(Cons)
}

export default Service