import { invokeAppLifecycleAfter, invokeAppLifecycleClose } from '@core/aop/app-lifecycle'
import { getConfig } from '@core/config'
import { getState } from '@core/ioc/bean-state'
import { BeanClass, BeanInstance, Close, Context, GetContext, Method, ParamType, StartParam } from '@core/types'
import * as express from 'express'
import { Request, Response } from 'express'
import { Express } from 'express-serve-static-core'
import * as http from 'http'
import { doFilter } from '../aop'
import { initBeanFinish } from '../ioc'
import { AsyncLocalStorage } from 'node:async_hooks'

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

const bodyParser = require('body-parser')
export const app: Express = express()
let server: http.Server = null

/**
 * 解析post请求参数
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const paths: { [path: string]: Method } = {}
/**
 * 将路由注册到express
 */
export const regRoutes = function (Cons: BeanClass) {
  const state = getState(Cons)
  const keyList = Object.keys(state.controlMethods)
  const globalBaseUrl = getConfig().baseUrl
  const baseUrl = state.controlMapping
  keyList.forEach((methodName) => {
    const route = state.controlMethods[methodName]
    // 规范化路由路径
    const pathArr: string[] = (globalBaseUrl + '/' + baseUrl + '/' + route.path)
      .split('/')
      .filter((item: string) => item)
    const realPath = '/' + pathArr.join('/')
    if (realPath in paths && route.type === paths[realPath]) {
      throw new Error("重复的接口: '" + realPath + "'")
    }
    paths[realPath] = route.type
    // 注册路由
    app[route.type](realPath, async (req: Request, res: Response) => {
      const params: any[] = []
      const queryParams = req.query
      const bodyParams = req.body
      const urlParams = req.params
      const ctx: Context = {
        request: req,
        response: res,
        params: urlParams,
        query: queryParams,
        body: bodyParams,
        control: Cons,
        method: methodName,
      }
      const paramMap = {
        [ParamType.QUERY]: queryParams,
        [ParamType.BODY]: bodyParams,
        [ParamType.PARAM]: urlParams,
        [ParamType.REQUEST]: req,
        [ParamType.RESPONSE]: res,
      }
      // 参数注入
      for (const i in route.paramNames) {
        // 通过注解注入的参数
        if (route.params[i]) {
          if (route.params[i].name) {
            params[i] = paramMap[route.params[i].type][route.params[i].name]
          } else {
            params[i] = paramMap[route.params[i].type]
          }
        } else {
          // 参数没有注解，通过参数名称从query获取
          params[i] = queryParams[route.paramNames[i]]
        }
      }
      res.contentType('application/json')
      asyncRequestLocalStorage.run(
        {
          ctx,
          requestScopeBeanMap: new Map(),
        },
        () => {
          // 拦截器
          const next = () => {
            return route.handler(...params)
          }
          doFilter(next)
        },
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
