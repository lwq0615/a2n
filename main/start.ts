import { start } from "@/index"
const path = require('path')
const config = require("../a2n.config")

const requireComponent = require.context('../' + process.env.componentScan, true, /[\.ts?|\.js?]$/)
requireComponent.keys().forEach(filepath => {
  console.log("scan file: " + path.resolve(process.env.componentScan, filepath))
  requireComponent(filepath)
})

start({
  config,
  callback: () => {
    console.log("======================success======================")
    console.log("          server was start in port: " + config.port || 8080)
    console.log("===================================================")
  }
})