import { start as listen } from "./express"

const fs = require('fs')


let a2config:any = null
let scan: Function = null

/**
 * 扫描目录下的Controll
 */
function compScan(dirPath: string) {
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
            scan(filePath)
        }
    }

}


/**
 * 开启服务
 */
export default function start(scanFun: (path: string) => any) {
    scan = scanFun
    console.log(process.cwd() + "\\a2n.config.js");
    const { default: config } = scan(process.cwd() + "\\a2n.config.js")
    a2config = config
    let compDirPath = a2config.componentScan || 'src'
    if (!['/', '\\'].includes(compDirPath)) {
        compDirPath = '\\' + compDirPath
    }
    compScan(process.cwd() + compDirPath)
    listen(a2config.port, () => {
        console.log("The service was successfully started on port '"+a2config.port+"'");
    })
}

