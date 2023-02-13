import * as a2n from '../src/index'
import config from '../a2n.config'
import UserController from './UserController'


new UserController()

a2n.start({
  config,
  callback(){
    console.log("服务启动成功");
  }
})