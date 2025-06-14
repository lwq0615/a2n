import { Aspect, Autowired, PostConstruct } from 'a2n'

@Aspect
export default class CCC {
  @Autowired(import('./UserService'))
  user: any = null

  test = 10

  @PostConstruct
  init() {
    // 依赖注入完成后，将会执行@PostConstruct的内容
    // console.log(this.user)
  }

  before() {
    console.log('before')
  }
}
