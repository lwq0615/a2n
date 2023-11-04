import { Request, Interceptor, Bean, AroundInterceptor, Scope, BeanScope } from "@/index";


@Bean
export default class InterceptorHandler extends AroundInterceptor {

  doFilter(callback: Function, req: Request) {
    // console.log(req.query)
    return callback()
  }

}