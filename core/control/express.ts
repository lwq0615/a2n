import { invokeAppLifecycleAfter, invokeAppLifecycleClose } from '@core/aop/app-lifecycle'
import { getConfig } from '@core/config'
import { getState } from '@core/ioc/bean-state'
import { BeanClass, BeanInstance, Close, Context, GetContext, Method, ParamType, StartParam } from '@core/types'
import * as express from 'express'
import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import * as http from 'http'
import { AsyncLocalStorage } from 'node:async_hooks'
import { doFilter } from '../aop'
import { getBean, initBeanFinish } from '../ioc'
import { getFunParameterNames, isFunction } from '@core/utils/function'
import { formatUrl } from '@core/utils/common'

const bodyParser = require('body-parser')

export const asyncRequestLocalStorage = new AsyncLocalStorage<{
  ctx: Context
  requestScopeBeanMap: Map<
    BeanClass,
    {
      instance: BeanInstance
      initOver: boolean
    }
  >
}>()

export const getContext: GetContext = () => {
  return asyncRequestLocalStorage.getStore()?.ctx
}
export const app: Express = express()
let server: http.Server

/**
 * 解析post请求参数
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function requestHandler() {
  const next = async () => {
    const ctx = getContext()!
    const { control: Cons, method: methodName } = ctx
    const state = getState(Cons)
    const params: any[] = []
    const queryParams = ctx.query
    const bodyParams = ctx.body
    const urlParams = ctx.params
    const paramMap = {
      [ParamType.QUERY]: queryParams,
      [ParamType.BODY]: bodyParams,
      [ParamType.PARAM]: urlParams,
      [ParamType.REQUEST]: ctx.request,
      [ParamType.RESPONSE]: ctx.response,
    }
    // 参数注入
    const paramNameList = getFunParameterNames(Reflect.get(Cons.prototype, methodName))
    for (const i in paramNameList) {
      // 通过注解注入的参数
      const decoratorInfo = state.methodParams[methodName]?.decoratorInfoList[i]
      if (decoratorInfo && Object.values(ParamType).includes(decoratorInfo.type)) {
        if (decoratorInfo.data?.[0]) {
          params[i] = paramMap[decoratorInfo.type][decoratorInfo.data?.[0]]
        } else {
          params[i] = paramMap[decoratorInfo.type]
        }
      } else {
        // 参数没有注解，通过参数名称从query获取
        params[i] = queryParams[paramNameList[i]]
      }
    }
    return (await getBean(Cons))?.[methodName](...params)
  }
  // 拦截器
  return doFilter(next)
}

// 检查重复的接口路径
const paths: { [path: string]: Method } = {}
function validateSamePath(path: string, type: Method) {
  if (path in paths && type === paths[path]) {
    throw new Error("重复的接口: '" + path + "'")
  }
  paths[path] = type
}

function createContext(req: Request, res: Response, Cons: BeanClass, methodName: string): Context {
  return {
    request: req,
    response: res,
    params: req.params,
    query: req.query,
    body: req.body,
    control: Cons,
    method: methodName,
  }
}

/**
 * 将路由注册到express
 */
export const regControl = function (Cons: BeanClass) {
  const state = getState(Cons)
  const keyList = Object.keys(state.controlMethods)
  const globalBaseUrl = getConfig().baseUrl
  const baseUrl = state.controlMapping
  keyList.forEach((methodName) => {
    const route = state.controlMethods[methodName]!
    const realPath = formatUrl(globalBaseUrl + '/' + baseUrl + '/' + route.path)
    validateSamePath(realPath, route.type)
    // 注册路由
    app[route.type](realPath, async (req: Request, res: Response) => {
      const ctx = createContext(req, res, Cons, methodName)
      res.contentType('application/json')
      return asyncRequestLocalStorage.run(
        {
          ctx,
          requestScopeBeanMap: new Map(),
        },
        () => requestHandler(),
      )
    })
  })
}

function exportRequestHandler() {
  const next = async () => {
    const { control, method } = getContext()!
    let { body } = getContext()!
    if (!Array.isArray(body)) {
      body = []
    }
    return (await getBean(control))?.[method](...body)
  }
  // 拦截器
  return doFilter(next)
}

export function regApiExport(Cons: BeanClass) {
  const clsFilePath = Reflect.get(Cons, '__filePath')
  const keyList = Object.getOwnPropertyNames(Cons.prototype).filter((name) =>
    isFunction(Reflect.get(Cons.prototype, name)),
  )
  const globalBaseUrl = getConfig().baseUrl
  const apiExportBaseUrl = getConfig().apiExportBaseUrl
  const baseUrl = clsFilePath.slice(0, clsFilePath.lastIndexOf('.'))
  keyList.forEach((methodName) => {
    const realPath = formatUrl(globalBaseUrl + '/' + apiExportBaseUrl + '/' + baseUrl + '/' + methodName)
    validateSamePath(realPath, Method.POST)
    // 注册路由
    app.post(realPath, async (req: Request, res: Response) => {
      const ctx = createContext(req, res, Cons, methodName)
      res.contentType('application/json')
      return asyncRequestLocalStorage.run(
        {
          ctx,
          requestScopeBeanMap: new Map(),
        },
        () => exportRequestHandler(),
      )
    })
  })
}

// 启动服务
export async function start(startParam: StartParam) {
  const config = getConfig()
  await initBeanFinish()
  server = app.listen(config.port, startParam.callback)
  invokeAppLifecycleAfter()
}

function onClose() {
  invokeAppLifecycleClose()
}

// 关闭服务
export const close: Close = (callback) => {
  console.info('Closing service')
  server?.close((...args) => {
    console.info('Service has been shut down')
    callback?.(...args)
    onClose()
  })
}

let firstClose = true
// 监听 SIGINT 信号（Ctrl+C）
process.on('SIGINT', () => {
  if (firstClose) {
    close()
    firstClose = false
  }
})

// 监听 SIGTERM 信号（系统终止）
process.on('SIGTERM', () => {
  if (firstClose) {
    close()
    firstClose = false
  }
})
