import { getState, states } from "./beanState"
import { BeanScope, BeanClass, BeanInstance, BeanCache } from "./types"

// bean容器, 单例池
const beanMap: Map<BeanClass, BeanInstance> = new Map()
const nameBeanMap: { [name: string]: BeanClass } = {}


/**
 * 通过类型获取该类型和继承自该类型的bean
 */
export function getBeans(Cons: BeanClass): BeanInstance[] {
  return [...beanMap.values()].filter(bean => bean instanceof Cons)
}

export function setBean(source: any | string, Cons?: BeanClass) {
  // 多例模式，不在单例池创建bean
  if (typeof source === 'string') {
    if (source in nameBeanMap) {
      throw new Error("重复的bean名称: " + source)
    }
    nameBeanMap[source] = Cons
    if (getState(Cons).scope === BeanScope.PROTOTYPE) {
      return
    }
    beanMap.set(Cons, new Cons())
  } else {
    if (getState(source).scope === BeanScope.PROTOTYPE) {
      return
    }
    beanMap.set(source, new source())
  }
}

export function getBean(Cons: BeanClass | string, cache?: BeanCache): BeanInstance {
  if (typeof Cons === 'string') {
    return getBean(nameBeanMap[Cons], cache)
  } else {
    if (getState(Cons).scope === BeanScope.SINGLETON) {
      // 单例模式，从单例池查找
      return beanMap.get(Cons)
    } else {
      // 多例模式，每次获取bean的时候创建新的bean
      if (!cache) {
        cache = {
          classMap: new Map<BeanClass, BeanInstance>()
        }
      }
      // 如果缓存池已经存在该类型的bean，从缓存池获取
      let bean: BeanInstance = cache.classMap.get(Cons)
      if(bean) {
        return bean
      }else {
        // 创建新的bean，并存入缓存池
        bean = new Cons
        cache.classMap.set(Cons, bean)
        initBean(bean, cache)
        return bean
      }
    }
  }
}

// bean初始化
const initBean = async (bean: BeanInstance, cache?: BeanCache) => {
  await getState(bean.constructor).autowiredTasks.forEach(async(task: Function) => await task.call(bean, cache))
  getState(bean.constructor).configTasks?.forEach((task: Function) => task.call(bean))
  getState(bean.constructor).initOverTasks?.forEach((methodName: string) => {
    bean[methodName]()
  })
}

// 通知bean容器，所有的bean都已经注册完成
export function initBeanFinish() {
  for (const state of states.values()) {
    state.setBeanTask?.()
  }
  // 开始对单例池的bean进行依赖注入
  [...beanMap.keys()].forEach((Cons: BeanClass) => {
    initBean(getBean(Cons))
  })
}