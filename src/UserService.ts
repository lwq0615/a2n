import { Autowired, Bean, BeanScope, Config, PostConstruct, Scope, getBean } from "@/index";
import Test from "./Test";

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
    console.log(getBean(Test))
    return "liweiqiang"
  }


}