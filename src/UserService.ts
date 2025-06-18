import { Autowired, Bean, Config, Context, getContext, PostConstruct } from 'a2n'
import RoleService from './RoleService'

@Bean
export default class UserService {
  @Autowired
  role: RoleService

  @Config('datasource.url')
  url: string = null

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.role)
    // registerCustomDecorator(Autowired, UserServicer)
  }

  getUser(query: any) {
    const ctx: Context = getContext()
    return ctx.request.path
  }
}
