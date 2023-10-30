import { Controll, Get, Query, Autowired, Service } from '@/index';
import UserService from './UserService';


@Controll
export default class Test{

  @Autowired(UserService)
  service: UserService = null

  @Get("/get")
  get(@Query('name') query: any){
    console.log(this.service)
    return this.service.getUser()
  }

}