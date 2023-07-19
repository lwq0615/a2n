import Controll from "@/decorators/Controll";
import { app, start } from "@/express";
export * from '@/decorators/ParamType';
export * from '@/decorators/RequestMethod';
export { addInterceptor, removeInterceptor, setAroundInterceptor, removeAroundInterceptor } from '@/aop'

export {
    app,
    start,
    Controll
}
