import { Autowired, Bean, BeanScope, Config, PostConstruct, Scope } from 'a2n'
import RoleService from './RoleService'

@Bean
@Scope(BeanScope.PROTOTYPE)
export default class UserServicer {
  @Autowired
  role: RoleService

  @Config('datasource.url')
  url: string = null

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.role)
    // registerCustomerDecorator(Autowired, UserServicer)
  }

  getUser(query: any) {
    return query.name
  }
}
