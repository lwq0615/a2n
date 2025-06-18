import { Aspect, Before } from 'a2n'
import { CustomAspect } from './UserService'

@Aspect
export default class CCC {
  @Before(CustomAspect)
  before() {
    console.log('before')
  }
}
