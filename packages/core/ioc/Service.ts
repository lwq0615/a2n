import { setBean } from '@/ioc'



/**
 * 在加载到Service时将其注册到bean容器中
 */
const Service = function (source: string | any) {
  if (typeof source === 'string') {
    return function (Cons: any) {
      setBean(source, Cons)
    } as undefined
  } else {
    if(!(source instanceof Function)) {
      throw new Error('@Service只接收string类型或者undefined参数')
    }
    setBean(source)
  }
}

export default Service