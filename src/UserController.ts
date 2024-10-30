import { Autowired, Control, Get, Post, Query } from '@core/index';
import UserService from './UserService';


@Control
export default class UserControl{

  @Autowired(UserService)
    service: UserService = null

  @Get('/get')
  get(a: any, @Query query: any){
    return 'query121'
  }

  @Post('/get')
  get1(@Query query: any){
    // console.log(query);
    console.log('first')
    return 'query'
  }

}