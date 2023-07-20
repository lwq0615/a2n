import { Interceptor } from "@/aop/types";
import { Service } from "@/index";
import { Request, Response } from "express";


@Service('tstt')
export default class UserServicer{
    
    doFilter(req: Request, res: Response): boolean {
        res.send("fail")
        return false
    }


}