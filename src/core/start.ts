import { listen } from "./express"

const fs = require('fs')


let count = 0
let a2config:any = null

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
            count++
            import(filePath).then(res => {
                if(--count === 0){
                    listen(a2config.port, () => {
                        console.log("The service was successfully started on port '"+a2config.port+"'");
                    })
                }
            })
        }
    }

}



/**
 * 开启服务
 */
export default function start() {
    count = 0
    console.log(process.cwd() + "\\a2n.config.js");
    import(process.cwd() + "\\a2n.config.js").then(({ default: config }) => {
        a2config = config
        let compDirPath = config.componentScan
        if (!['/', '\\'].includes(compDirPath)) {
            compDirPath = '\\' + compDirPath
        }
        compScan(process.cwd() + compDirPath)
    })
}

