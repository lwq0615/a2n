

// bean容器
const beanMap: Map<object, any> = new Map()

// bean全部注册完成后执行的任务列表
// 主要目的是依赖注入
export const finishTask: Function[] = []


export function setBean(Cons: any) {
  beanMap.set(Cons, new Cons())
}

export function getBean(Cons: object): any {
  return beanMap.get(Cons)
}

// 通知bean容器，所有的bean都已经注册完成
export function initBeanFinish() {
  // 开始依赖注入
  finishTask.forEach(task => task())
}