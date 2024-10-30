import * as express from "express";
import { Request, Response } from "express";
import { ParamType, Method } from "@core/control/types"
import { doFilter } from "../aop";
import { Express } from 'express-serve-static-core';
import { BeanClass, StartParam } from "@core/types";
import { getConfig } from "@core/config"
import { initBeanFinish } from "../ioc";
import { getState } from "@core/ioc/beanState";
import * as http from "http";

const bodyParser = require('body-parser')
const app: Express = express();
let server: http.Server = null

/**
 * 解析post请求参数
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const paths: { [path: string]: Method } = {}
/**
 * 将路由注册到express
 */
export const regRoutes = function (Cons: BeanClass) {
  const state = getState(Cons)
  const keyList = Object.keys(state.controlMethods)
  const globalBaseUrl = getConfig().baseUrl
  const baseUrl = state.controlMapping
  keyList.forEach(methodName => {
    const route = state.controlMethods[methodName]
    // 规范化路由路径
    const pathArr: string[] = (globalBaseUrl + "/" + baseUrl + "/" + route.path).split("/").filter((item: string) => item)
    const realPath = '/' + pathArr.join("/")
    if ((realPath in paths) && route.type === paths[realPath]) {
      throw new Error("重复的接口: '" + realPath + "'")
    }
    paths[realPath] = route.type
    // 注册路由
    app[route.type](realPath, async (req: Request, res: Response) => {
      let params: any[] = []
      if(state.isApiExport) {
        params = req.body || []
      }else {
        const urlParams = req.query
        const bodyParams = req.body
        const paramMap = {
          [ParamType.QUERY]: urlParams,
          [ParamType.BODY]: bodyParams,
          [ParamType.REQUEST]: req,
          [ParamType.RESPONSE]: res
        }
        // 参数注入
        for (const i in route.paramNames) {
          // 通过注解注入的参数
          if (route.params[i]) {
            if (route.params[i].name) {
              params[i] = paramMap[route.params[i].type][route.params[i].name];
            } else {
              params[i] = paramMap[route.params[i].type];
            }
          } else {
            // 参数没有注解，通过参数名称从query获取
            params[i] = urlParams[route.paramNames[i]]
          }
        }
      }
      res.contentType("application/json")
      // 拦截器
      const callback = () => {
        if (state.isApiExport) {
          return route.handler(params)
        } else {
          return route.handler(...params)
        }
      }
      doFilter(callback, req, res, Cons, methodName)
    })
  })
}

export {
  app
}

export async function start(startParam: StartParam) {
  const config = getConfig()
  await initBeanFinish()
  server = app.listen(config.port, startParam.callback)

}

export function close(callback?: (err?: Error) => void) {
  server?.close(callback)
}