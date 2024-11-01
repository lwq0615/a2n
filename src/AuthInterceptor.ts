import { Bean, BeanClass, Interceptor, Request, Response } from 'a2n'

/**
 * 继承Interceptor类并注入到容器中，该类会被注册为拦截器
 */
@Bean
export default class AuthInterceptor extends Interceptor {

  /**
   * 拦截器校验方法
   * @param req 请求对象
   * @param res 响应对象
   * @param Cons 请求进入的Control类
   * @param methodName 请求进入Control的方法名
   * @returns false：拦截，true：不拦截
   */
  async doFilter(req: Request, res: Response, Cons: BeanClass, methodName: string) {
    return true
  }

}