
const { start, filepathSymbol, setConfig } = require(process.env.npmName);
import * as chalk from "chalk";
import * as symbol from 'log-symbols'
const fs = require('fs');
const path = require('path');
const config = setConfig(process.env.a2nConfig as any);


const scanPath = path.resolve(process.cwd(), config.componentScan);
if (!fs.existsSync(scanPath)) {
  console.log(symbol.warning, chalk.yellow("warning: componentScan folder " + scanPath + " not exist!\n"))
} else {
  console.log('scan components in folder ' + scanPath);
  const requireComponent = require.context(process.env.cwd + '/' + process.env.componentScan, true, /[\.ts?|\.js?]$/)
  requireComponent.keys().forEach(filepath => {
    console.log("scan file: " + path.resolve(process.env.componentScan, filepath))
    const defaultExport = requireComponent(filepath).default
    if (defaultExport) {
      defaultExport[filepathSymbol] = filepath.substring(1)
    }
  })
}

start({
  callback: () => {
    console.log(chalk.green("======================success======================"))
    console.log("        ", symbol.success, chalk.green("server was start in port: " + config.port))
    console.log(chalk.green("==================================================="))
  }
})

if (module.hot) {
  module.hot.accept();
}