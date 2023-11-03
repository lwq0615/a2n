import { Bean, BeanScope, Config, Request, Response, Scope } from "@/index";
import { PostConstruct } from "@/ioc/PostConstruct";


@Bean('tstt')
@Scope(BeanScope.PROTOTYPE)
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