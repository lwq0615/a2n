export function getLocalIpAddress() {
  try {
    const os = require('os')
    const osType = os.type() //系统类型
    const netInfo = os.networkInterfaces() //网络信息
    let ip = ''
    if (osType === 'Windows_NT') {
      for (const devName in netInfo) {
        const iface = netInfo[devName]
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i]
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            ip = alias.address
          }
        }
      }
    } else if (osType === 'Linux') {
      ip = netInfo.eth0[0].address
    } else if (osType === 'Darwin') {
    // mac操作系统
      ip = netInfo.eth0[0].address
    } else {
    // 其他操作系统
    }
    return 'http://' + ip + ':'
  } catch {
    return ''
  }
}