const { start, setConfig } = require(process.env.npmName)
import * as chalk from 'chalk'
import * as symbol from 'log-symbols'

const { getLocalIpAddress, isClass } = require('./utils')
const fs = require('fs')
const path = require('path')
const a2nConfig = require(process.env.a2nConfigPath)
const config = setConfig(a2nConfig)

// 扫描componentScan配置目录下的Bean
const scanPath = path.resolve(process.cwd(), config.componentScan)
if (!fs.existsSync(scanPath)) {
  console.info(symbol.error, chalk.red('warning: componentScan folder ' + scanPath + ' not exist!\n'))
} else if (fs.readdirSync(scanPath).length === 0) {
  console.info(symbol.error, chalk.red('warning: componentScan folder ' + scanPath + ' is empty!\n'))
} else {
  if (!config.disabledScanNodeModules) {
    // 扫描node_modules目录下的Bean
    if (!config.hideScanFile) {
      console.info(chalk.blue('scan dependencies beans in node_modules'))
    }
    const requireComponent = require.context(process.env.cwd + '/node_modules', true, /__a2n\.inject\.js$/)
    requireComponent.keys().forEach((filepath) => {
      if (!config.hideScanFile) {
        console.info('- ' + path.resolve(process.cwd(), 'node_modules', filepath))
      }
      requireComponent(filepath)
    })
  }

  if (!config.hideScanFile) {
    console.info(chalk.blue('scan beans in folder: ' + scanPath))
  }
  const requireComponent = require.context(process.env.cwd + '/' + process.env.componentScan, true, /[.ts?|.js?]$/)
  requireComponent.keys().forEach((filepath) => {
    if (!config.hideScanFile) {
      console.info('- ' + path.resolve(process.env.componentScan, filepath))
    }
    const cls = requireComponent(filepath).default
    if (!isClass(cls)) {
      return
    }
    Reflect.set(cls, '__filePath', filepath.substring(1))
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
