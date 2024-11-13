import { Autowired, Bean, Config, PostConstruct } from 'a2n'
import RoleService from './RoleService'

@Bean
export default class UserServicer {

  @Autowired(RoleService)
    role: any = null

  @Config('datasource.url')
    url: string = null

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    console.log(this.role)
    // registerCustomerDecorator(Autowired, UserServicer)
  }

  getUser(query: any) {
    return query.name
  }


}