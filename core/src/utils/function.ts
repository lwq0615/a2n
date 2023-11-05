const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const DEFAULT_PARAMS = /=[^,]+/mg;
const FAT_ARROWS = /=>.*$/mg;

export function getFunParameterNames(fn: Function): string[] {
  const code = fn.toString()
    .replace(COMMENTS, '')
    .replace(FAT_ARROWS, '')
    .replace(DEFAULT_PARAMS, '');

  const result = code.slice(code.indexOf('(') + 1, code.indexOf(')'))
    .match(/([^\s,]+)/g);

  return result === null
    ? []
    : result;
}

export function isFunction(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Function]' && !isClass(obj)
}

function isClass(obj: any) {
  if (typeof obj != "function") return false;
  var str = obj.toString();

  // async function or arrow function
  if (obj.prototype === undefined) return false;
  // generator function or malformed definition
  if (obj.prototype.constructor !== obj) return false;
  // ES6 class
  if (str.slice(0, 5) == "class") return true;
  // has own prototype properties
  if (Object.getOwnPropertyNames(obj.prototype).length >= 2) return true;

  return false;
}