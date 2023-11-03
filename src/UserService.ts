import { Autowired, Bean, BeanScope, Config, Request, Response, Scope } from "@/index";
import { PostConstruct } from "@/ioc/PostConstruct";

@Bean('user')
@Scope(BeanScope.PROTOTYPE)
export default class UserServicer {

  @Autowired(import("./RoleService"))
  role: any = null

  @Config('datasource.url')
  url: string = null

  @PostConstruct
  init() {
    console.log(this.role)
  }

  getUser() {
    return "liweiqiang"
  }


}