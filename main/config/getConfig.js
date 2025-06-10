const { merge, cloneDeep } = require('lodash')
const path = require('path')
const fs = require('fs')
const defaultConfig = require('./a2n.default.config.js')
const defaultConfigFile = path.resolve(__dirname, './a2n.default.config.js')

function getAssignConfig(config) {
  if (!config) {
    return defaultConfig
  }
  return merge(cloneDeep(defaultConfig), config)
}

function getDevConfig(configPath) {
  if (configPath && !fs.existsSync(path.resolve(process.cwd(), configPath))) {
    throw new Error(`a2n config file "${configPath}" not found`)
  }
  let a2nConfigPath = path.resolve(process.cwd(), configPath || './a2n.config.js')
  if (!fs.existsSync(a2nConfigPath)) {
    a2nConfigPath = defaultConfigFile
  }
  return getAssignConfig(require(a2nConfigPath))
}

module.exports = {
  getAssignConfig,
  getDevConfig,
}
