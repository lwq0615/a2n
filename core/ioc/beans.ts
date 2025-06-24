import { AroundInterceptor, ErrHandler, Interceptor } from '@core/aop'
import { setAspectBeans } from '@core/aop/aspect'
import { setErrorHandlers } from '@core/aop/exception'
import { setInterceptors } from '@core/aop/interceptor'
import { getProxy, startProxy } from '@core/aop/proxy'
import { asyncRequestLocalStorage, regRoutes } from '@core/control/express'
import { BeanClass, BeanInstance, BeanScope, BeanState } from '@core/types'
import { isFunction } from '@core/utils/function'
import { isAspect, isBean, isControl } from '@core/utils/state'
import { getBeanStateList, getState, getStateMap } from './bean-state'

// bean容器, 单例池
const singletonBeanMap: Map<BeanClass, BeanInstance> = new Map()
// 具名bean和bean类型的映射
const nameBeanMap: { [name: string]: BeanClass } = {}

export type GetBeanOption = {
  // 多例bean缓存池
  cache?: Map<BeanClass, BeanInstance>
}

// 创建一个被切面代理的bean，此时bean还未进行依赖注入
function createBean(Cons: BeanClass) {
  return getProxy(Reflect.construct(Cons, []))
}

export async function getBean<T extends BeanClass = BeanClass>(
  Cons: T | string,
  option: GetBeanOption = {},
): Promise<BeanInstance<T> | undefined> {
  if (typeof Cons === 'string') {
    return await getBean(nameBeanMap[Cons], option)
  } else {
    const state = getState(Cons)
    if (!isBean(state.beanClass)) {
      return
    }
    // 创建缓存池，该bean和依赖的bean注入时会存入缓存池，防止循环依赖
    const isStart = !option.cache
    if (!option.cache) {
      option.cache = new Map<BeanClass, BeanInstance>()
    }
    // 如果缓存池已经存在该类型的bean，从缓存池获取
    let bean: BeanInstance = option.cache.get(Cons)
    if (bean) {
      return bean
    }
    // 获取请求上下文的bean载体，拿不到则说明不是通过请求生成bean
    const requestScopeBeanMap = asyncRequestLocalStorage.getStore()?.requestScopeBeanMap
    if (state.scope === BeanScope.SINGLETON) {
      // 单例模式，从单例池查找
      bean = singletonBeanMap.get(Cons)
    } else if (state.scope === BeanScope.REQUEST && requestScopeBeanMap) {
      // 如果是请求作用域，且已经存在于上下文，从上下文获取
      const requestBean = requestScopeBeanMap.get(Cons)
      if (requestBean) {
        return requestBean.instance
      } else {
        bean = createBean(Cons)
        requestScopeBeanMap.set(Cons, {
          instance: bean,
          initOver: false,
        })
      }
    } else {
      // 多例模式，创建新的bean
      bean = createBean(Cons)
      option.cache.set(Cons, bean)
    }
    // 此时的bean有可能是未进行依赖注入的，先进行依赖注入
    // 例如单例1 -> 多例 -> 单例2，单例2则是未注入状态
    await injectBean(bean, option)
    if (isStart) {
      doPostConstruct([...option.cache.values()])
      if (requestScopeBeanMap) {
        // 过滤还未执行PostConstruct的bean
        const requestBeans = [...requestScopeBeanMap.values()].filter((item) => {
          return !item.initOver
        })
        doPostConstruct(requestBeans.map((item) => item.instance))
        requestBeans.forEach((item) => {
          item.initOver = true
        })
      }
    }
    return bean
  }
}

/**
 * 通过类型获取该类型和继承自该类型的bean
 */
export async function getBeans<T extends BeanClass>(
  Cons: T | ((state: BeanState) => boolean),
): Promise<BeanInstance<T>[]> {
  if (isFunction(Cons)) {
    const beans = [...getStateMap().values()].filter(Cons as any).map((state) => {
      return getBean(state.beanClass)
    })
    return Promise.all(beans)
  } else {
    const beans = [...getStateMap().keys()]
      .filter((Item) => Reflect.construct(Item, []) instanceof Cons)
      .map((Item) => {
        return getBean(Item)
      })
    return Promise.all(beans).then((beans) => beans.filter(Boolean))
  }
}

// 单例池生成bean & 注册bean的name和class映射
export function setBean(source: BeanClass | string, Cons?: BeanClass) {
  if (typeof source === 'string' && Cons) {
    if (source in nameBeanMap) {
      throw new Error('重复的bean名称: ' + source)
    }
    nameBeanMap[source] = Cons
    // 非单例模式，不在单例池创建bean
    if (getState(Cons).scope !== BeanScope.SINGLETON) {
      return
    }
    singletonBeanMap.set(Cons, createBean(Cons))
  } else {
    // 非单例模式，不在单例池创建bean
    if (getState(source as BeanClass).scope !== BeanScope.SINGLETON) {
      return
    }
    singletonBeanMap.set(source as BeanClass, createBean(source as BeanClass))
  }
}

/**
 * bean依赖注入，配置文件属性注入
 * @param bean 初始化的bean
 * @param option 获取bean的配置
 */
const injectBean = async (bean: BeanInstance, option?: GetBeanOption) => {
  const state = getState(bean.constructor)
  // 如果是单例bean且已经注入完成，则跳过
  if (state.injectOver && state.scope === BeanScope.SINGLETON) {
    return
  }
  // 依赖注入@Autowired
  for (const task of state.autowiredTasks) {
    await task.call(bean, option)
  }
  // 配置文件注入@Config
  state.configTasks?.forEach((task: Function) => task.call(bean))
  // 所有bean依赖注入全部完成，执行@PostConstruct
  state.injectOver = true
}

/**
 * 通知bean容器，所有的bean都已经注册完成
 */
export async function initBeanFinish() {
  // 单例池生成bean & 注册bean的name和class映射
  for (const state of getBeanStateList()) {
    state.setBeanTask?.()
  }
  // 开始对单例池的bean进行依赖注入
  for (const Cons of singletonBeanMap.keys()) {
    // 在前面的bean注入中可能就依赖了后面的bean，所以在注入前面的bean过程中，后面的bean也可能已经被注入完成了
    if (getState(Cons).injectOver) {
      continue
    }
    await injectBean(await getBean(Cons))
  }
  doPostConstruct([...singletonBeanMap.values()])
  // 控制器注册接口路由
  for (const state of getStateMap().values()) {
    if (isControl(state.beanClass)) {
      regRoutes(state.beanClass)
    }
  }
  // 设置扫描生效的拦截器
  const task1 = Promise.all([getBeans(Interceptor), getBeans(AroundInterceptor)]).then((res) => {
    setInterceptors(res[0], res[1])
  })
  // 设置扫描生效的异常处理器
  const task2 = getBeans(ErrHandler).then((res) => {
    setErrorHandlers(res)
  })
  // 设置扫描生效的切面bean
  const task3 = getBeans((state) => isAspect(state.beanClass)).then((res) => {
    setAspectBeans(res)
  })
  // 开启切面
  // 在初始化完成后才开启切面，防止初始化时bean的方法调用触发切面
  return Promise.all([task1, task2, task3]).then(() => {
    startProxy()
  })
}

/**
 * 执行完成依赖注入bean的@PostConstruct
 */
function doPostConstruct(beans: BeanInstance[]) {
  for (const bean of beans) {
    getState(bean).initOverTasks.forEach((task) => {
      task.call(bean)
    })
  }
}
