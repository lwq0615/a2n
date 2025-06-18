import { Autowired, Control, Get, Param, Query } from 'a2n'
import UserService from './UserService'

@Control('user')
export default class UserControl {
  @Autowired
  service: UserService = null

  @Get('/get/:id')
  get(a: any, @Query query: any, @Param('id') id: number) {
    // console.log(this.service)
    return '123213'
  }

  @Get
  get1(@Query query: any) {
    return 'query23'
  }
}
