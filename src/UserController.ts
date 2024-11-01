import { Autowired, Control, Get, Param, Post, Query } from 'a2n'
import UserService from './UserService'


@Control('/')
export default class UserControl {

  @Autowired(UserService)
    service: UserService = null

  @Get('/get/:id')
  get(a: any, @Query query: any, @Param('id') id: number) {
    return '123213'
  }

  @Post('/get')
  get1(@Query query: any) {
    // console.log(query);
    console.log('first')
    return 'query'
  }

}