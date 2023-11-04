import { getState, states } from "./beanState"
import { BeanScope, BeanClass, BeanInstance, BeanCache } from "./types"

// bean容器, 单例池
const beanMap: Map<BeanClass, BeanInstance> = new Map()
const nameBeanMap: { [name: string]: BeanClass } = {}


/**
 * 通过类型获取该类型和继承自该类型的bean
 */
export function getBeans(Cons: BeanClass): Promise<BeanInstance[]> {
  const beans = [...states.keys()].filter(Item => new Item() instanceof Cons).map(Item=> {
    return getBean(Item)
  })
  return Promise.all(beans)
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

export async function getBean(Cons: BeanClass | string, cache?: BeanCache): Promise<BeanInstance> {
  if (typeof Cons === 'string') {
    return await getBean(nameBeanMap[Cons], cache)
  } else {
    const state = getState(Cons)
    if (state.scope === BeanScope.SINGLETON) {
      // 单例模式，从单例池查找
      return beanMap.get(Cons)
    } else {
      // 多例模式，每次获取bean的时候创建新的bean
      // 多例模式的第一个bean，创建缓存池，该bean和依赖的多例bean创建时会存入缓存池，防止循环依赖
      const isStart = !cache
      if (isStart) {
        cache = {
          classMap: new Map<BeanClass, BeanInstance>()
        }
      }
      // 如果缓存池已经存在该类型的bean，从缓存池获取
      let bean: BeanInstance = cache.classMap.get(Cons)
      if (bean) {
        return bean
      } else {
        // 创建新的bean，并存入缓存池
        bean = new Cons
        cache.classMap.set(Cons, bean)
        await injectBean(bean, cache)
        if (isStart) {
          doInitOverTasks([...cache.classMap.values()])
        }
        return bean
      }
    }
  }
}

/**
 * bean依赖注入，配置文件属性注入
 * @param bean 初始化的bean
 * @param cache 缓存池，cache不为空，表示注入的是多例的bean
 */
const injectBean = async (bean: BeanInstance, cache?: BeanCache) => {
  // 依赖注入@Autowired
  for (const task of getState(bean.constructor).autowiredTasks) {
    await task.call(bean, cache)
  }
  // 配置文件注入@Config
  getState(bean.constructor).configTasks?.forEach((task: Function) => task.call(bean))
}

/**
 * 通知bean容器，所有的bean都已经注册完成
 */
export async function initBeanFinish() {
  // 单例池生成bean
  for (const state of states.values()) {
    state.setBeanTask?.()
  }
  // 开始对单例池的bean进行依赖注入
  for (const Cons of beanMap.keys()) {
    await injectBean(await getBean(Cons))
  }
  // 所有bean依赖注入全部完成，执行@PostConstruct
  doInitOverTasks([...beanMap.values()])
}

/**
 * 执行完后才能依赖注入bean的@PostConstruct
 */
function doInitOverTasks(beans: BeanInstance[]) {
  for (const bean of beans) {
    getState(bean.constructor).initOverTasks.forEach(task => {
      task.call(bean)
    })
  }
} 