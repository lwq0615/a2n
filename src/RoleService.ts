import { Bean, BeanScope, PostConstruct, Scope } from 'a2n'

@Bean('role')
@Scope(BeanScope.REQUEST)
export default class RoleService {
  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    console.log('role over')
  }
}
