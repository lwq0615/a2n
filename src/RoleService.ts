import { ApiExport } from "@/control/ApiExport";
import { Autowired, Bean, BeanScope, Scope, PostConstruct } from "@/index";

@Bean('role')
@ApiExport
@Scope(BeanScope.PROTOTYPE)
export default class RoleService {

  @Autowired(import("./UserService"))
  user: any = null

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.user)
  }

}