import Controll from "@/decorators/Controll";
import { app, start } from "@/express";
export * from '@/decorators/ParamType';
export * from '@/decorators/RequestMethod';
import Service from '@/decorators/Service'
import Autowired from "./decorators/Autowired";
import { initBeanFinish } from "./ioc";
export {
    addInterceptor,
    removeInterceptor,
    setAroundInterceptor,
    removeAroundInterceptor,
    addErrHandler,
    removeErrHandler
} from '@/aop'

export {
    app,
    start,
    Controll,
    Service,
    Autowired,
    initBeanFinish
}
