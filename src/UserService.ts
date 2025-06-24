import { Bean, getContext, registerCustomDecorator } from 'a2n'

export const CustomAspect: MethodDecorator = (target, name) => {
  registerCustomDecorator(CustomAspect, target, name)
}

@Bean
export default class UserService {
  @CustomAspect
  getUser(query: any) {
    const ctx = getContext()
    return ctx?.request.path
  }
}
