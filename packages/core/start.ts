import { start as listen } from "@/index"
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
      compScan(filePath)
    } else {
      console.log(`scan file '${filePath}'`);
      await import(filePath)
    }
  }

}


/**
 * 开启服务
 */
export default async function start(callback: () => void) {
  let config = {
    port: 8080,
    componentScan: 'src'
  }
  try {
    const { default: a2nConfig } = await import(path.resolve(process.cwd(), "a2n.config.js"))
    console.log('\nfind config file ' + process.cwd() + "\\a2n.config.js\n");
    config = a2nConfig
  } catch (e) {
    console.error('\nCannot find config file ' + path.resolve(process.cwd(), "a2n.config.js, use default config\n"))
  }
  let compDirPath = config.componentScan || 'src'
  console.log('scan components in folder ' + path.resolve(process.cwd(), compDirPath));
  await compScan(path.resolve(process.cwd(), compDirPath))
  listen({
    config,
    callback
  })
}

