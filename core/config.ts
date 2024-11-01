import { getAssignConfig } from '@/main/config/getConfig'
import { RunConfig } from '@core/types'


let config = {}

export function setConfig(runConfig: RunConfig): RunConfig {
  // 默认配置
  config = getAssignConfig(runConfig)
  return config
}

export function getConfig(): RunConfig {
  return config
}