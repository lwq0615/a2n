import { Autowired, Bean, BeanScope, Scope } from "@/index";

@Bean('role')
@Scope(BeanScope.PROTOTYPE)
export default class RoleService {

  @Autowired(import("./UserService"))
  user: any = null

}