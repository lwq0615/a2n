import { Route } from "@/control/types"

export interface Config {
  port?: number,
  componentScan?: string,
  [name: string]: any
}

export interface BeanState {
  // 控制器处理器
  controllMethods: {
    [methodName: string]: Route
  },
  // 依赖注入任务列表
  autowiredTasks: Function[],
  // 配置文件属性注入任务列表
  configTasks: Function[],
  // 依赖注入完成后执行任务
  initOverTasks: string[]
}