import { Request, Interceptor, Bean, AroundInterceptor, Scope, BeanScope, Aspect } from "@/index";


@Bean
export default class InterceptorHandler extends Interceptor {

  @Aspect(/^[U]/)
  asp() {
    // console.log("asp");
    
  }
  

}