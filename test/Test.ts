import { Controll, Get, Query } from '../src/index';


@Controll("/")
export default class Test{

  @Get("/get")
  get(@Query('name') query: any){
    console.log(query);
    return query
  }

}