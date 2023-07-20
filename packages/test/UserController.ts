import { Controll, Get, Query, Autowired, Service } from '@/index';
import UserService from './UserService';


@Controll
export default class Test{

  @Get("/get")
  get(@Query('name') query: any){
    
    return query
  }

}