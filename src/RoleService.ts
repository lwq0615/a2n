import { Autowired, Bean, BeanScope, Scope } from "@/index";
import UserServicer from "./UserService";

@Bean('role')
@Scope(BeanScope.PROTOTYPE)
export default class RoleService {

  @Autowired(UserServicer)
  user: UserServicer = null

}