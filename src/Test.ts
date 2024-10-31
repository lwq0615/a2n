import { AppLifecycle } from 'a2n'

export default class Test extends AppLifecycle {
  async afterAppStart() {
    console.log('start')
  }
}