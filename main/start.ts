const { start, setConfig, getState, isClass } = require(process.env.npmName)
import * as chalk from 'chalk'
import * as symbol from 'log-symbols'
const { getLocalIpAddress } = require('./ip')
const fs = require('fs')
const path = require('path')
const a2nConfig = require(process.env.a2nConfigPath)
const config = setConfig(a2nConfig)


const scanPath = path.resolve(process.cwd(), config.componentScan)
if (!fs.existsSync(scanPath)) {
  console.info(symbol.error, chalk.red('warning: componentScan folder ' + scanPath + ' not exist!\n'))
} else {
  console.info('scan components in folder ' + scanPath)
  const requireComponent = require.context(process.env.cwd + '/' + process.env.componentScan, true, /[.ts?|.js?]$/)
  requireComponent.keys().forEach(filepath => {
    if (!config.hideScanFile) {
      console.info('scan file: ' + path.resolve(process.env.componentScan, filepath))
    }
    const defaultExport = requireComponent(filepath).default
    if (!defaultExport || !isClass(defaultExport)) {
      return
    }
    getState(defaultExport).filePath = filepath.substring(1)
  })
  start({
    callback: () => {
      const ip = getLocalIpAddress()
      console.info('\n', symbol.success, chalk.green('server was start in port:'), chalk.blue(`${ip}${config.port}`))
    },
  })
}

if (module.hot) {
  module.hot.accept()
}