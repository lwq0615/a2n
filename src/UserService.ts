import { Bean, Config, Request, Response } from "@/index";
import { PostConstruct } from "@/ioc/PostConstruct";


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