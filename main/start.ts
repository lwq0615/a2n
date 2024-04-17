import { start, setConfig } from "@/index"
const fs = require('fs')
const path = require('path')
let config = require(process.env.cwd + "/a2n.config")
config = setConfig(config)

const scanPath = path.resolve(process.cwd(), config.componentScan)
if (!fs.existsSync(scanPath)) {
  throw new Error("folder " + scanPath + "not exist!")
}
console.info('scan components in folder ' + scanPath);
const requireComponent = require.context(process.env.cwd + '/' + (process.env.componentScan || 'src'), true, /[\.ts?|\.js?]$/)
requireComponent.keys().forEach(filepath => {
  console.info("scan file: " + path.resolve((process.env.componentScan || 'src'), filepath))
  requireComponent(filepath).default.filepath = filepath.substring(1)
})

start({
  callback: () => {
    console.info("======================success======================")
    console.info("          server was start in port: " + config.port)
    console.info("===================================================")
  }
})

if (module.hot) {
  module.hot.accept();
}