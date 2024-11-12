import { AppLifecycle } from 'a2n'

export default class Test extends AppLifecycle {
  afterAppStart() {
    console.log('start')
  }
}
