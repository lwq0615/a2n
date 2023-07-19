import { Controll, Get, Query, Autowired } from '@/index';


@Controll("/")
export default class Test{

  @Autowired(Test, true)
  a:Test = null

  @Get("/get")
  get(@Query('name') query: any){
    return query
  }

}