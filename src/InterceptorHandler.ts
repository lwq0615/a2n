import { Request, Interceptor, Bean, AroundInterceptor } from "../core/dist/a2n.core";


@Bean
export default class InterceptorHandler extends AroundInterceptor {

  doFilter(callback: Function, req: Request) {
    console.log(req.query)
    return callback()
  }

}