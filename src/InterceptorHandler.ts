import { Request, Interceptor, Bean, BeanClass, Scope, Aspect, Before, After, Around } from "@core/index";


// @Aspect
export default class InterceptorHandler {

  @After(/^[U]/)
  as1p() {
    console.log("after");
    
  }

  @Before(/^[U]/)
  asp(Cons: BeanClass, name: string) {
    console.log("before");
    
  }

  @Around(/^[U]/)
  asp2(callback: Function, Cons: BeanClass, name: string) {
    console.log(Cons)
    console.log(name)
    const res = callback()
    return res.name + 'ann'
  }
  

}