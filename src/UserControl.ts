import { Autowired, Control, Get, getBean, Param, Query } from 'a2n'
import UserService from './UserService'
import RoleService from '@/src/RoleService'

@Control('user')
export default class UserControl {
  @Autowired
  service: UserService

  @Get('/get/:id')
  get(a: any, @Query query: any, @Param('id') id: number) {
    // console.log(this.service)
    return '123213'
  }

  @Get
  async get1(@Query query: any) {
    this.service.getUser(query)
    await getBean(RoleService)
    await getBean(RoleService)
    return 'query23'
  }
}
