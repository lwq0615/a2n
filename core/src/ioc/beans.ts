

// bean容器
const beanMap: Map<object, any> = new Map()
const nameBeanMap: { [name: string]: any } = {}


export function setBean(source: any | string, Cons?: any) {
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

export function getBean(Cons: object | string): any {
  if (typeof Cons === 'string') {
    return nameBeanMap[Cons]
  } else {
    return beanMap.get(Cons)
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