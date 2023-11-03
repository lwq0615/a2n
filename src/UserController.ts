import { Control, Get, Query, Autowired, Service, PostConstruct } from '@/index';
import UserService from './UserService';


@Control
export default class Test{

  @Autowired(UserService)
  service: UserService = null

  @PostConstruct
  initOver() {
    // console.log(this.service);
  }

  @Get("/get")
  get(@Query('name') query: any){
    // console.log(this.service);
    return this.service.getUser()
  }

}