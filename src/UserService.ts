import { Autowired, Bean, BeanScope, Config, PostConstruct, Scope } from "@/index";

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