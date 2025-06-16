import { RunConfig } from '@core/types'
import { cloneDeep, merge } from 'lodash'
import * as defaultConfig from '@/main/config/a2n.default.config'

let config = {}

export function setConfig(runConfig: RunConfig): RunConfig {
  // 默认配置
  config = merge(cloneDeep(defaultConfig), runConfig)
  return config
}

export function getConfig(): RunConfig {
  return config
}
