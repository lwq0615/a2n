import { Autowired, Bean, BeanScope, PostConstruct, Scope } from 'a2n'

@Bean('role')
@Scope(BeanScope.PROTOTYPE)
export default class RoleService {

  @Autowired(import('./UserService'))
    user: any = null

  test = 1

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.user)
  }
}
