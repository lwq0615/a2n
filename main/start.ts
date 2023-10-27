import { start, initBeanFinish } from "@/index"
const path = require('path')
const config = require("../a2n.config")

const requireComponent = require.context('../' + process.env.componentScan, true, /[\.ts?|\.js?]$/)
requireComponent.keys().forEach(filepath => {
  console.log("scan file: " + path.resolve(__dirname, filepath))
  requireComponent(filepath)
})

initBeanFinish()
start({
  config,
  callback: () => console.log("server was start success in port: " + config.port || 8080)
})