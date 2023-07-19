import Controll from "@/decorators/Controll";
export { app, start } from "@/express";
export * from '@/decorators/ParamType';
export * from '@/decorators/RequestMethod';
import Service from '@/decorators/Service'
import Autowired from "./decorators/Autowired";
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
