import { Control, Get, Query, Autowired, Service, PostConstruct, Scope, BeanScope, Post } from '@/index';
import UserService from './UserService';


@Control
export default class UserControl{

  @Autowired(UserService)
  service: UserService = null

  @PostConstruct
  initOver() {
    // console.log(this.service);
  }

  @Get("/get")
  get(a: any, @Query query: any){
    // console.log(a);
    return query
  }

  @Post("/get")
  get1(a: any, @Query query: any){
    // console.log(a);
    return query
  }

}