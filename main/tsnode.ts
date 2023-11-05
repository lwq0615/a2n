import { start as listen } from "@/index"
const config = require("../a2n.config")
const fs = require('fs')
const path = require('path')

/**
 * 扫描目录下的Controll
 */
async function compScan(dirPath: string) {
  const files = fs.readdirSync(dirPath)
  if (!files || !files.length) {
    return
  }
  for (const file of files) {
    const filePath = dirPath + "\\" + file
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      await compScan(filePath)
    } else {
      console.info(`scan file '${filePath}'`);
      await import(filePath)
    }
  }

}


/**
 * 开启服务
 */
async function start() {
  let compDirPath = config.componentScan || 'src'
  console.info('scan components in folder ' + path.resolve(process.cwd(), compDirPath));
  await compScan(path.resolve(process.cwd(), compDirPath))
  listen({
    config,
    callback: () => {
      console.info("======================success======================")
      console.info("          server was start in port: " + config.port || 8080)
      console.info("===================================================")
    }
  })
}

start()
