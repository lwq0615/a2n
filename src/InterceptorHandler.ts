import { Request, Interceptor, Bean, AroundInterceptor, Scope, Aspect, Before, After, Around } from "@/index";


// @Aspect
export default class InterceptorHandler {

  @After(/^[U]/)
  as1p() {
    console.log("after");
    
  }

  @Before(/^[U]/)
  asp() {
    console.log("before");
    
  }

  @Around(/^[U]/)
  asp2(callback: Function) {
    const res = callback()
    return res.name + 'ann'
  }
  

}