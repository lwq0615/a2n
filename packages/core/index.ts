import Controll from "@/control/Controll";
export { app, start } from "@/express";
export * from '@/control/ParamType';
export * from '@/control/RequestMethod';
import Service from '@/ioc/Service'
import Autowired from "./ioc/Autowired";
export { initBeanFinish, getBean } from "./ioc";
export {
    addInterceptor,
    removeInterceptor,
    setAroundInterceptor,
    removeAroundInterceptor,
    addErrHandler,
    removeErrHandler
} from '@/aop'

export {
    Controll,
    Service,
    Autowired
}
