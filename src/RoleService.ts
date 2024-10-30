import { ApiExport, Autowired, Bean, BeanScope, PostConstruct, Scope } from 'a2n';

@Bean('role')
@ApiExport
@Scope(BeanScope.PROTOTYPE)
export default class RoleService {

  @Autowired(import('./UserService'))
    user: any = null

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.user)
  }

}