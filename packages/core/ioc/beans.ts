

// bean容器
const beanMap: Map<object, any> = new Map()
const nameBeanMap: { [name: string]: any } = {}

// bean全部注册完成后执行的任务列表
// 主要目的是依赖注入
export const finishTask: Function[] = []


export function setBean(source: any | string, Cons?: any) {
  if (typeof source === 'string') {
    nameBeanMap[source] = new Cons()
    beanMap.set(Cons, new Cons())
  } else {
    beanMap.set(source, new source())
  }
}

export function getBean(Cons: object): any {
  if (typeof Cons === 'string') {
    return nameBeanMap[Cons]
  } else if (Cons instanceof Function) {
    return beanMap.get(Cons)
  } else {
    return null
  }
}

export function getBeans(Cons: Function): any[] {
  return [...beanMap.values()].filter(bean => bean instanceof Cons)
}

// 通知bean容器，所有的bean都已经注册完成
export function initBeanFinish() {
  // 开始依赖注入
  finishTask.forEach(task => task())
}