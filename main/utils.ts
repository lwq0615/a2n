import { BeanClass } from '@core/types'

export function getLocalIpAddress() {
  try {
    const os = require('os')
    const osType = os.type() // 系统类型
    const netInfo = os.networkInterfaces() // 网络信息
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

/**
 * 判断是否是一个类Class
 */
export function isClass(obj: any): obj is BeanClass {
  if (typeof obj != 'function') return false
  const str = obj.toString()

  // async function or arrow function
  if (obj.prototype === undefined) return false
  // generator function or malformed definition
  if (obj.prototype.constructor !== obj) return false
  // ES6 class
  if (str.slice(0, 5) == 'class') return true
  // has own prototype properties
  if (Object.getOwnPropertyNames(obj.prototype).length >= 2) return true

  return false
}
