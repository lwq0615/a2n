import { RunConfig } from '@core/types'
import { getAssignConfig } from '@/main/config/a2nDefaultConfig'


let config = {}

export function setConfig(runConfig: RunConfig): RunConfig {
  // 默认配置
  config = getAssignConfig(runConfig)
  return config
}

export function getConfig(): RunConfig {
  return config
}