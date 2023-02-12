import { Module } from '../src/index'
import Test from './UserController'



@Module({
  controllers: [Test]
})
export default class UserModule{}