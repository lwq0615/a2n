import { getBean } from '@/ioc/beans'
import { getState } from './beanState'
import { BeanClass } from '@/types'
import { BeanCache } from './types'


/**
 * 在加载到Service时将其注册到bean容器中
 */
export const Autowired = function (Cons: string | BeanClass | Promise<any>, required: boolean = true) {
  return function (target: any, fieldName: string) {
    const task = function (cache?: BeanCache) {
      return new Promise((resolve) => {
        const inject = (Cons: BeanClass | string) => {
          // 取出容器中的对象，开始进行属性注入
          getBean(Cons, cache).then(bean => {
            if (!bean && required) {
              throw new Error("属性'" + fieldName + "'注入失败,没有在容器中查找到bean: " + (typeof Cons === 'string' ? Cons : Cons.name))
            }
            if (!bean) {
              resolve(1)
              return
            }
            this[fieldName] = bean
            resolve(1)
          })
        }
        // 循环依赖处理
        if (Cons instanceof Promise) {
          Cons.then(res => {
            inject(res.default)
          })
        } else if (typeof Cons === 'string' || (Cons instanceof Function)) {
          inject(Cons)
        } else {
          throw new Error('@Autowired只接收string类型或者构造器类型参数')
        }
      })
    }
    getState(target.constructor).autowiredTasks.push(task)
  } as PropertyDecorator
}

export default Autowired
