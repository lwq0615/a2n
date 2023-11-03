import { Autowired, Bean, BeanScope, Config, Request, Response, Scope } from "@/index";
import { PostConstruct } from "@/ioc/PostConstruct";

@Bean('user')
@Scope(BeanScope.PROTOTYPE)
export default class UserServicer{

    @Autowired(import("./RoleService"))
    role: any = null

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