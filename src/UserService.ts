import { Interceptor } from "@/index";
import { Bean, Config } from "@/index";
import { Request, Response } from "express";


@Bean('tstt')
export default class UserServicer{

    @Config('datasource.url')
    url: string = null

    
    doFilter(req: Request, res: Response): boolean {
        res.send("fail")
        return false
    }

    getUser() {
        return "liweiqiang"
    }


}