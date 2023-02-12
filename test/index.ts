import * as a2n from '../src/index'
import UserModule from './UserModule'
import config from '../a2n.config'


a2n.start({
  config,
  modules: [UserModule],
  callback(){
    console.log("服务启动成功");
  }
})