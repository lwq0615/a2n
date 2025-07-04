import { getState } from './bean-state'

/**
 * Bean依赖注入完成后执行
 */
export const PostConstruct: MethodDecorator = function (target: any, key: string | symbol, descriptor: object) {
  // 将当前method注册为handler
  const state = getState(target.constructor)
  state.initOverTasks.push(target[key])
  state.addFieldDecorator(key, PostConstruct)
}
