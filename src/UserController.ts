import { Control, Get, Query, Autowired, Service, PostConstruct, Scope, BeanScope, Post } from '@core/index';
import UserService from './UserService';


@Control
export default class UserControl{

  @Autowired(UserService)
  service: UserService = null

  @Get("/get")
  get(a: any, @Query query: any){
    return "query11"
  }

  @Post("/get")
  get1(@Query query: any){
    // console.log(query);
    console.log("first")
    return "query"
  }

}