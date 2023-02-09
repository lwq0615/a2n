import * as express from "express";
import { Route, ParamType } from '@/core/types'

const bodyParser = require('body-parser')
const app = express();

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
    const pathArr: string[] = [];
    (baseUrl + route.path).split("/").forEach((item: string) => {
      if (item !== '') {
        pathArr.push(item)
      }
    })
    let realPath = '/' + pathArr.join("/")
    // 注册路由
    app[route.type](realPath, async (req: any, res: any) => {
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
      res.send(await route.handler(...params))
    })
  })
}



export function start(port: number, callback: any) {
  app.listen(port, callback)
}