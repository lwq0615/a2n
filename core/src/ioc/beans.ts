import { getState, states } from "./beanState"
import { BeanScope, BeanClass, BeanInstance } from "./types"

// bean容器, 单例池
const beanMap: Map<BeanClass, BeanInstance> = new Map()
const nameBeanMap: { [name: string]: BeanInstance } = {}


export function setBean(source: any | string, Cons?: BeanClass) {
  // 多例模式，不在单例池创建bean
  if (getState(Cons || source).scope === BeanScope.PROTOTYPE) {
    return
  }
  if (typeof source === 'string') {
    if (source in nameBeanMap) {
      throw new Error("重复的bean名称: " + source)
    }
    nameBeanMap[source] = new Cons()
    beanMap.set(Cons, new Cons())
  } else {
    beanMap.set(source, new source())
  }
}

export function getBean(Cons: BeanClass | string): any {
  if (typeof Cons === 'string') {
    return nameBeanMap[Cons]
  } else {
    if (getState(Cons).scope === BeanScope.SINGLETON) {
      // 单例模式，从单例池查找
      return beanMap.get(Cons)
    } else {
      // 多例模式，每次获取bean的时候创建新的bean
      const bean = new Cons
      initBean(bean)
      return bean
    }
  }
}


/**
 * 通过类型获取该类型和继承自该类型的bean
 */
export function getBeans(Cons: BeanClass): any[] {
  return [...beanMap.values()].filter(bean => bean instanceof Cons)
}

// bean初始化
const initBean = (bean: BeanInstance) => {
  getState(bean.constructor).autowiredTasks.forEach((task: Function) => task.call(bean))
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