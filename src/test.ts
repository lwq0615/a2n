import GetMapping from "./decorators/GetMapping";
import Controll from "./decorators/Controll";

@Controll
export default class UserController{

  @GetMapping("/getUser")
  public getUser(){
    return {
      name: 'lwq'
    }
  }

  public setUser(){

  }

}