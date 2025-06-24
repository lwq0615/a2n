import { Bean, BeanClass, BeanScope, getState } from '@core/ioc'

/**
 * 将bean的各个方法以接口的形式导出
 */
export const ApiExport: ClassDecorator = function (Cons) {
  const state = getState(Cons)
  state.scope = BeanScope.REQUEST
  state.addClassDecorator(ApiExport)
  Bean(Cons as unknown as BeanClass)
}
