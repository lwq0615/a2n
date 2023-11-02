import { getBean } from '@/ioc/beans'
import { getState } from './beanState'


/**
 * 在加载到Service时将其注册到bean容器中
 */
export const Autowired = function (Cons: any, required: boolean = true) {
  return function (target: any, fieldName: string) {
    const task = () => {
      if (typeof Cons !== 'string' && !(Cons instanceof Function)) {
        throw new Error('@Autowired只接收string类型或者构造器类型参数')
      }
      // 确保该对象有被注册到容器中
      if (getBean(target.constructor)) {
        // 去除容器中的对象，开始进行属性注入
        const bean = getBean(Cons)
        if (!bean && required) {
          throw new Error("属性'" + fieldName + "'注入失败,没有在容器中查找到bean: " + (typeof Cons === 'string' ? Cons : Cons.name))
        }
        if (!bean) {
          return
        }
        getBean(target.constructor)[fieldName] = bean
      }
    }
    getState(target.constructor).autowiredTasks.push(task)
  } as PropertyDecorator
}

export default Autowired
