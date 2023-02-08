import { Get, Post } from "./decorators/RequestMethod";
import Controll from "./decorators/Controll";
import { Body, Query } from "./decorators/ParamType";

@Controll
export default class UserController{

  @Get("/get")
  public getUser(){
    return {
      name: 'get'
    }
  }

  @Post("/post")
  public postUser(@Query query:any, @Body body: any){
    return {
      name: 'post'
    }
  }

}
