

const defaultConfig = {
  "baseUrl": "",
  "componentScan": "src",
  "port": 8080,
  "apiExport": {
    "baseUrl": "/api"
  }
}

function getAssignConfig(config) {
  return Object.assign(defaultConfig, config)
}

module.exports = {
  getAssignConfig
}