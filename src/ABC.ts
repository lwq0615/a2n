import { Autowired, Bean, PostConstruct } from 'a2n'

@Bean('rolec')
export default class CCC {

  @Autowired(import('./UserService'))
    user: any = null

  test = 1

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.user)
  }
}
