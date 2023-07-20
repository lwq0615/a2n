import Controll from "@/control/Controll";
export { app, start } from "@/express";
export * from '@/control/ParamType';
export * from '@/control/RequestMethod';
import Service from '@/ioc/Service'
import Autowired from "./ioc/Autowired";
export { initBeanFinish, getBean, getBeans } from "./ioc"; 
export { Interceptor, AroundInterceptor, ErrHandler } from '@/aop/types'


export {
    Controll,
    Service,
    Autowired
}
