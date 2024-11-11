import { AroundInterceptor, ErrHandler, Interceptor } from '@core/aop'
import { setAspectBeans } from '@core/aop/Aspect'
import { setErrorHandlers } from '@core/aop/exception'
import { setInterceptors } from '@core/aop/interceptor'
import { getProxy, startProxy } from '@core/aop/proxy'
import { regRoutes } from '@core/control/express'
import { BeanClass, BeanInstance, BeanScope } from '@core/types'
import { isFunction } from '@core/utils/function'
import { getState, getStates } from './beanState'
import { BeanCache, BeanState } from './types'

// bean容器, 单例池
const beanMap: Map<BeanClass, BeanInstance> = new Map()
const nameBeanMap: { [name: string]: BeanClass } = {}


export async function getBean<T extends BeanClass = BeanClass>(Cons: T | string, cache?: BeanCache): Promise<BeanInstance<T>> {
  if (typeof Cons === 'string') {
    return await getBean(nameBeanMap[Cons], cache)
  } else {
    const state = getState(Cons)
    if (!state.isBean) {
      return
    }
    if (state.scope === BeanScope.SINGLETON) {
      // 单例模式，从单例池查找
      const bean: BeanInstance = beanMap.get(Cons)
      // 此时的单例bean有可能是未进行依赖注入的，先进行依赖注入
      await injectBean(bean, cache)
      return bean
    } else {
      // 多例模式，每次获取bean的时候创建新的bean
      // 多例模式的第一个bean，创建缓存池，该bean和依赖的多例bean创建时会存入缓存池，防止循环依赖
      const isStart = !cache
      if (isStart) {
        cache = {
          classMap: new Map<BeanClass, BeanInstance>(),
        }
      }
      // 如果缓存池已经存在该类型的bean，从缓存池获取
      let bean: BeanInstance = cache.classMap.get(Cons)
      if (bean) {
        return bean
      } else {
        // 创建新的bean，并存入缓存池
        bean = getProxy(Reflect.construct(Cons, []))
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
 * 通过类型获取该类型和继承自该类型的bean
 */
export function getBeans<T extends BeanClass>(Cons: T | ((state: BeanState) => boolean)): Promise<BeanInstance<T>[]> {
  if (isFunction(Cons)) {
    const beans = [...getStates().values()].filter(Cons as any).map(state => {
      return getBean(state.beanClass)
    })
    return Promise.all(beans)
  } else {
    const beans = [...getStates().keys()].filter(Item => Reflect.construct(Item, []) instanceof Cons).map(Item => {
      return getBean(Item)
    })
    return Promise.all(beans).then(beans => beans.filter(Boolean))
  }
}

export function setBean(source: any | string, Cons?: BeanClass) {
  // 多例模式，不在单例池创建bean
  if (typeof source === 'string') {
    if (source in nameBeanMap) {
      throw new Error('重复的bean名称: ' + source)
    }
    nameBeanMap[source] = Cons
    if (getState(Cons).scope === BeanScope.PROTOTYPE) {
      return
    }
    beanMap.set(Cons, getProxy(Reflect.construct(Cons, [])))
  } else {
    if (getState(source).scope === BeanScope.PROTOTYPE) {
      return
    }
    beanMap.set(source, getProxy(Reflect.construct(source, [])))
  }
}

/**
 * bean依赖注入，配置文件属性注入
 * @param bean 初始化的bean
 * @param cache 缓存池，cache不为空，表示注入的是多例的bean
 */
const injectBean = async (bean: BeanInstance, cache?: BeanCache) => {
  const state = getState(bean.constructor)
  // 如果是单例bean切已经注入完成，则跳过
  if (state.injectOver && state.scope === BeanScope.SINGLETON) {
    return
  }
  // 依赖注入@Autowired
  for (const task of state.autowiredTasks) {
    await task.call(bean, cache)
  }
  // 配置文件注入@Config
  state.configTasks?.forEach((task: Function) => task.call(bean))
  state.injectOver = true
}

/**
 * 通知bean容器，所有的bean都已经注册完成
 */
export async function initBeanFinish() {
  // 单例池生成bean
  for (const state of getStates().values()) {
    state.setBeanTask?.()
  }
  // 开始对单例池的bean进行依赖注入
  for (const Cons of beanMap.keys()) {
    await injectBean(await getBean(Cons))
  }
  // 所有bean依赖注入全部完成，执行@PostConstruct
  doInitOverTasks([...beanMap.values()])
  // 控制器注册接口路由
  for (const state of getStates().values()) {
    if (state.isControl) {
      regRoutes(state.beanClass)
    }
  }
  // 设置扫描生效的拦截器
  const task1 = Promise.all([getBeans(Interceptor), getBeans(AroundInterceptor)]).then(res => {
    setInterceptors(res[0], res[1]?.[0])
  })
  // 设置扫描生效的异常处理器
  const task2 = getBeans(ErrHandler).then(res => {
    setErrorHandlers(res)
  })
  // 设置扫描生效的切面bean
  const task3 = getBeans((state) => state.isAspect).then(res => {
    setAspectBeans(res)
  })
  // 开启切面
  // 在初始化完成后才开启切面，防止初始化时bean的方法调用触发切面
  return Promise.all([task1, task2, task3]).then(() => {
    startProxy()
  })
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