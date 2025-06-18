import { BeanClass } from '@core/types'

const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
const DEFAULT_PARAMS = /=[^,]+/gm
const FAT_ARROWS = /=>.*$/gm

/**
 * 获取方法参数名称列表
 */
export function getFunParameterNames(fn: Function): string[] {
  const code = fn.toString().replace(COMMENTS, '').replace(FAT_ARROWS, '').replace(DEFAULT_PARAMS, '')

  const result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)

  return result === null ? [] : result
}

/**
 * 判断是否是一个函数
 */
export function isFunction(obj: any): obj is Function {
  return Object.prototype.toString.call(obj) === '[object Function]' && !isClass(obj)
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
