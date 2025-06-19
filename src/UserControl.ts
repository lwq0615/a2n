import { Autowired, Control, Get, Query } from 'a2n'
import UserService from './UserService'

@Control
export default class UserControl {
  @Autowired
  service: UserService

  @Get
  get1(@Query query: any) {
    this.service.getUser(query)
    // await getBean(RoleService)
    // await getBean(RoleService)
    return 'query23'
  }
}
