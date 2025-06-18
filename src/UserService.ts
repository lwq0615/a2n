import { Bean, Context, getContext, registerCustomDecorator } from 'a2n'

export const CustomAspect: MethodDecorator = (target, name) => {
  registerCustomDecorator(CustomAspect, target, name)
}

@Bean
export default class UserService {
  @CustomAspect
  getUser(query: any) {
    const ctx: Context = getContext()
    return ctx.request.path
  }
}
