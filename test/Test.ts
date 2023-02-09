import { Query, Controll, Get } from "@/index";


@Controll
export default class Test{

  @Get("/get")
  public get(@Query('name') query: object){
    console.log(query);
    return query
  }

}