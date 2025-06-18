import { getBean, GetBeanOption } from '@core/ioc/beans'
import { type Autowired as AutowiredType, BeanClass } from '@core/types'
import { getState } from './bean-state'

/**
 * @param fieldName 需要注入的属性名
 * @param injectBean 需要注入的bean标识
 * @returns 注入任务
 */
function getTask(fieldName: string, injectBean?: string | Promise<any> | BeanClass) {
  return function (option?: GetBeanOption) {
    return new Promise((resolve) => {
      const inject = (Cons: BeanClass | string) => {
        // 取出容器中的对象，开始进行属性注入
        getBean(Cons, option).then((bean) => {
          if (!bean) {
            throw new Error(
              "属性'" +
                fieldName +
                "'注入失败,没有在容器中查找到bean: " +
                (typeof Cons === 'string' ? Cons : Cons.name),
            )
          }
          if (!bean) {
            resolve(bean)
            return
          }
          this[fieldName] = bean
          resolve(bean)
        })
      }
      // 循环依赖处理
      if (injectBean instanceof Promise) {
        injectBean.then((res) => {
          inject(res.default)
        })
      } else if (typeof injectBean === 'string' || typeof injectBean === 'function') {
        inject(injectBean)
      } else {
        throw new Error('@Autowired参数类型错误')
      }
    })
  }
}

/**
 * 在加载到Service时将其注册到bean容器中
 */
export const Autowired: AutowiredType = function (Cons: object | string | Promise<any>, propertyKey?: string) {
  if (typeof Cons === 'string' || Cons instanceof Promise) {
    return function (target, key) {
      const task = getTask(key as string, Cons)
      const state = getState(target)
      state.addFieldDecorator(key as string, Autowired)
      state.autowiredTasks.push(task)
    } as PropertyDecorator
  } else {
    const task = getTask(propertyKey, Reflect.getMetadata('design:type', Cons, propertyKey))
    const state = getState(Cons.constructor as BeanClass)
    state.addFieldDecorator(propertyKey, Autowired)
    state.autowiredTasks.push(task)
  }
}

export default Autowired
