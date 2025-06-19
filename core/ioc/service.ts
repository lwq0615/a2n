import { setBean } from '@core/ioc/beans'
import { Service } from '@core/types'
import { getState } from './bean-state'

/**
 * 在加载到Service时将其注册到bean容器中
 */
const Bean: Service = (source) => {
  if (typeof source === 'string') {
    return function (Cons: any) {
      const state = getState(Cons)
      state.addClassDecorator(Bean)
      state.setBeanTask = () => setBean(source, Cons)
    } as ClassDecorator
  } else {
    if (!(source instanceof Function)) {
      throw new Error('@Bean参数类型错误')
    }
    const state = getState(source)
    state.addClassDecorator(Bean)
    state.setBeanTask = () => setBean(source)
  }
}

export default Bean
