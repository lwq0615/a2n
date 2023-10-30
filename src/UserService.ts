import { Interceptor } from "@/aop/types";
import { Bean } from "@/index";
import { Request, Response } from "express";


@Bean('tstt')
export default class UserServicer{
    
    doFilter(req: Request, res: Response): boolean {
        res.send("fail")
        return false
    }


}