const { merge, cloneDeep } = require('lodash')
const path = require('path')
const fs = require('fs')
const defaultConfig = require('./a2n.default.config')

function getAssignConfig(config) {
  if (!config) {
    return defaultConfig
  }
  return merge(cloneDeep(defaultConfig), config)
}

function getDevConfig(configPath) {
  if (!configPath) {
    return defaultConfig
  }
  const a2nConfigPath = path.resolve(process.cwd(), configPath)
  if (!fs.existsSync(a2nConfigPath)) {
    throw new Error(`a2n config file "${configPath}" not found`)
  }
  return getAssignConfig(require(a2nConfigPath))
}

module.exports = {
  getDevConfig,
}
