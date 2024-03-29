import { start, setConfig } from "@/index"
const fs = require('fs')
const path = require('path')
let config = require("../a2n.config")

config = setConfig(config)

const scanPath = path.resolve(process.cwd(), config.componentScan)
if (!fs.existsSync(scanPath)) {
  throw new Error("folder " + scanPath + "not exist!")
}
console.info('scan components in folder ' + scanPath);
const requireComponent = require.context("../" + (process.env.componentScan), true, /[\.ts?|\.js?]$/)
requireComponent.keys().forEach(filepath => {
  console.info("scan file: " + path.resolve(process.env.componentScan, filepath))
  requireComponent(filepath).default.filepath = filepath.substring(1)
})

start({
  callback: () => {
    console.info("======================success======================")
    console.info("          server was start in port: " + config.port || 8080)
    console.info("===================================================")
  }
})

if (module.hot) {
  module.hot.accept();
}