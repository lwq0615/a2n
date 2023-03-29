import Controll from "./decorators/Controll";
import { app } from "./core/express";
import start from "./core/start";

export * from './decorators/ParamType';
export * from './decorators/RequestMethod';

export {
    app,
    start,
    Controll
}

export default start