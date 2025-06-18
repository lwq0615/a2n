import { AppLifecycle, Bean } from 'a2n'

@Bean
export default class AppLife extends AppLifecycle {
  afterAppClose() {
    console.log('AppLife afterAppClose')
  }
}
