import * as express from "express";
import { Request, Response } from "express";
import { Route, ParamType } from "@/control/types"
import { doFilter } from "./aop";
import { Express } from 'express-serve-static-core';
import { Config } from "./ioc/types";
import { setConfig } from "./ioc/Config";
import { initBeanFinish } from "./ioc";

const bodyParser = require('body-parser')
const app: Express = express();
const paths: Set<string> = new Set()

/**
 * 解析post请求参数
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



/**
 * 将路由注册到express
 */
export const regRoutes = function (list: Route[], baseUrl: string) {
  list.forEach(route => {
    // 规范化路由路径
    const pathArr: string[] = (baseUrl + route.path).split("/").filter((item: string) => item)
    const size = paths.size
    let realPath = '/' + pathArr.join("/")
    paths.add(realPath)
    if(paths.size === size){
      throw new Error("重复的接口路径'"+realPath+"'")
    }
    // 注册路由
    app[route.type](realPath, async (req: Request, res: Response) => {
      const urlParams = req.query
      const bodyParams = req.body
      const paramMap = {
        [ParamType.QUERY]: urlParams,
        [ParamType.BODY]: bodyParams,
        [ParamType.REQUEST]: req,
        [ParamType.RESPONSE]: res
      }
      const params: any[] = []
      // 参数注入
      if (Array.isArray(route.params)) {
        for (const paramIndex in route.params) {
          if (route.params[paramIndex].name) {
            params[paramIndex] = paramMap[route.params[paramIndex].type][route.params[paramIndex].name];
          } else {
            params[paramIndex] = paramMap[route.params[paramIndex].type];
          }
        }
      }
      res.contentType("application/json")
      // 拦截器
      const callback = () => route.handler(...params)
      doFilter(callback, req, res)
    })
  })
}

export {
  app
}

export interface StartParam {
  config: Config,
  callback?: () => void
}

export function start(startParam: StartParam) {
  setConfig(startParam.config)
  initBeanFinish()
  app.listen(startParam.config.port || 8080, startParam.callback)
}