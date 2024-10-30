import { getState } from './beanState'

/**
 * Bean依赖注入完成后执行
 */
export const PostConstruct: MethodDecorator = function(target: any, key: string, descriptor: object) {
  const Cons = target.constructor
  // 将当前method注册为handler
  getState(Cons).initOverTasks.push(target[key])
}