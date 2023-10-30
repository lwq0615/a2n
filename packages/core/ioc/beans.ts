

// bean容器
const beanMap: Map<object, any> = new Map()
const nameBeanMap: { [name: string]: any } = {}


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
  [...beanMap.keys()].forEach((Cons: any) => {
    Cons.__autowiredTasks?.forEach((task: Function) => task())
    Cons.__configTasks?.forEach((task: Function) => task())
  })
}