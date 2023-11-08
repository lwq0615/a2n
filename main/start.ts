import { start } from "@/index"
const path = require('path')
const config = require("../a2n.config")

console.info('scan components in folder ' + path.resolve(process.cwd(), config.componentScan || 'src'));
const requireComponent = require.context('../' + process.env.componentScan, true, /[\.ts?|\.js?]$/)
requireComponent.keys().forEach(filepath => {
  console.info("scan file: " + path.resolve(process.env.componentScan, filepath))
  requireComponent(filepath)
})

start({
  config,
  callback: () => {
    console.info("======================success======================")
    console.info("          server was start in port: " + config.port || 8080)
    console.info("===================================================")
  }
})

if (module.hot) {
  module.hot.accept();
}