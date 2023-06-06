import Controll from "./decorators/Controll";
import { app, start } from "./core/express";
export * from './decorators/ParamType';
export * from './decorators/RequestMethod';

export {
    app,
    start,
    Controll
}
