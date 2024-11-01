const { merge, cloneDeep } = require('lodash')
const defaultConfig = require('./a2n.default.config.js')

function getAssignConfig(config) {
  if (!config) {
    return defaultConfig
  }
  return merge(cloneDeep(defaultConfig), config)
}

module.exports = {
  getAssignConfig,
}