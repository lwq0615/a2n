const { start, setConfig } = require(process.env.npmName as string)
import * as chalk from 'chalk'
import * as symbol from 'log-symbols'
const { getLocalIpAddress } = require('./ip')
const fs = require('fs')
const path = require('path')
const a2nConfig = require(process.env.a2nConfigPath as string)
const config = setConfig(a2nConfig)


if (!config.disabledScanNodeModules) {
  // 扫描node_modules目录下的Bean
  if (!config.hideScanFile) {
    console.info(chalk.blue('scan dependencies beans in node_modules'))
  }
  const requireComponent = require.context(process.env.cwd + '/node_modules', true, /a2n\.inject\.js$/)
  requireComponent.keys().forEach(filepath => {
    if (!config.hideScanFile) {
      console.info('- ' + path.resolve(process.cwd(), 'node_modules', filepath))
    }
    requireComponent(filepath)
  })
}

// 扫描componentScan配置目录下的Bean
const scanPath = path.resolve(process.cwd(), config.componentScan)
if (!fs.existsSync(scanPath)) {
  console.info(symbol.error, chalk.red('warning: componentScan folder ' + scanPath + ' not exist!\n'))
} else {
  if (!config.hideScanFile) {
    console.info(chalk.blue('scan beans in folder: ' + scanPath))
  }
  const requireComponent = require.context(process.env.cwd + '/' + process.env.componentScan, true, /[.ts?|.js?]$/)
  requireComponent.keys().forEach(filepath => {
    if (!config.hideScanFile) {
      console.info('- ' + path.resolve(process.env.componentScan, filepath))
    }
    requireComponent(filepath)
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