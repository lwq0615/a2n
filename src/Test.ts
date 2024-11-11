import { AppLifecycle, Bean } from 'a2n'

@Bean
export default class Test extends AppLifecycle {
  async afterAppStart() {
    console.log('start')
  }
}